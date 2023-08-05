#!/usr/bin/env python
# coding=utf-8

import json
import functools
import traceback

from tornado import gen
from tornado.tcpclient import TCPClient
from tornado.ioloop import IOLoop
from tornado.iostream import StreamClosedError

from util import CONNECTION_TYPE_IN_RESPONSE, CONNECTION_TYPE_IN_REQUEST, RESPONSE_ERROR_TAG
from util import BasicConnection, RPCConnectionError, RPCInputError, Storage, RPCMessage
from util import log, message_utils


class _RPCClientConfig(object):
    def __init__(self, host, port, max_clients=5,
                 max_buffer_size=None, max_response_size=None, connect_timeout=0.2):
        self.host = host
        self.port = port
        self.address_str = "{},{}".format(self.host, self.port)
        self.max_clients = max_clients
        self.max_buffer_size = max_buffer_size
        self.max_response_size = max_response_size
        self.connect_timeout = connect_timeout


class SimpleRPCClient(object):

    def __init__(self, host, port, max_clients=5, max_buffer_size=None,
                 max_response_size=None, connect_timeout=0.2):

        self._io_loop = IOLoop.current()
        self.client_config = _RPCClientConfig(
            host=host,
            port=port,
            max_clients=max_clients,
            max_buffer_size=max_buffer_size,
            max_response_size=max_response_size,
            connect_timeout=connect_timeout
        )

        self.tcp_client = TCPClient(io_loop=self._io_loop)

    def fetch(self, item):
        connection = _ClientConnection(
            client=self,
            io_loop=self._io_loop)
        return connection.connect(item)


class _ClientConnection(BasicConnection):
    def __init__(self, client, io_loop=None):
        self.client = client
        self.client_config = client.client_config
        self._io_loop = io_loop or IOLoop.current()

        self.stream = None
        self._connection_timeout_handler = None

        self._header_data = None
        self._body_data = None
        self._message = Storage()

    def add_item(self, item):
        self._client_connection_tubes.append(item)

    def is_avaliable_stream(self):
        return bool(self.stream is not None and not self.stream.closed())

    def set_connection_timeout_handler(self, func):
        self._connection_timeout_handler = func

    def _off_connection_timeout_handler(self):
        if self._connection_timeout_handler is not None:
            self._io_loop.remove_timeout(self._connection_timeout_handler)
            self.set_connection_timeout_handler(None)

    def connect(self, connection_item):
        #: set connection timeout handler
        self.set_connection_timeout_handler(
            self._io_loop.add_timeout(
                deadline=self._io_loop.time() + self.client_config.connect_timeout,
                callback=self._on_connection_timeout
            )
        )

        #: wait tcp_client callback
        # self._io_loop.run_sync(functools.partial(self._on_connection_success, connection_item))
        return self.client.tcp_client.connect(
            host=self.client_config.host, port=self.client_config.port,
            max_buffer_size=self.client_config.max_buffer_size,
            callback=functools.partial(self._on_connection_success_item, connection_item)
        )

    def _on_connection_timeout(self):
        raise RPCConnectionError("Connection Timeout {}".format(self.client_config.address_str))

    @gen.coroutine
    def _on_connection_success(self, connection_item):
        stream = yield self.client.tcp_client.connect(
            host=self.client_config.host, port=self.client_config.port,
            max_buffer_size=self.client_config.max_buffer_size
        )
        yield self._on_connection_success_item(connection_item, stream)

    @gen.coroutine
    def _on_connection_success_item(self, connection_item, stream):
        self._off_connection_timeout_handler()
        log.debug(u"Connection Success {}".format(self.client_config.address_str))

        try:
            self.stream = stream
            self.stream.set_close_callback(self._on_connection_close)
            self.stream.set_nodelay(True)

            #: send message
            self._sending_connection_item(connection_item)

            #: fetch message
            read_status = yield self._read_message(connection_item)
            if read_status:
                connection_item.callback(RPCMessage(
                    CONNECTION_TYPE_IN_RESPONSE, self._message.topic, self._message.body))
            else:
                log.error("Malformed Client Request")

        except Exception as e:
            log.error(e)
            traceback.print_exc()
        finally:
            self.close()

    def _sending_connection_item(self, connection_item):
        self.communicate(connection_item.item)

    @gen.coroutine
    def _read_message(self, connection_item):
        try:

            if not self.is_avaliable_stream():
                log.error("Malformed Client Request stream closed")
                raise gen.Return(False)

            #: read header data
            header_data_future = self.stream.read_until_regex(
                regex=message_utils.header_delimiter,
                max_bytes=connection_item.header_max_bytes
            )

            if connection_item.header_timeout is None:
                self._header_data = yield header_data_future
            else:
                try:
                    self._header_data = yield gen.with_timeout(
                        timeout=self._io_loop.time() + connection_item.header_timeout,
                        future=header_data_future,
                        io_loop=self._io_loop
                    )
                except gen.TimeoutError:
                    log.error("Timeout reading header from {}".format(self.client_config.address_str))
                    raise gen.Return(False)
            #: parse header data
            try:
                header_tube = message_utils.parse_header(
                    CONNECTION_TYPE_IN_RESPONSE, self._header_data)

            except RPCInputError as e:
                log.error(e.error)
                raise gen.Return(False)

            self._message.topic = header_tube.topic

            #: read body data
            body_data_future = self.stream.read_bytes(
                header_tube.body_len + len(message_utils.body_suffix))

            if connection_item.body_timeout is None:
                self._body_data = yield body_data_future
            else:
                try:
                    self._body_data = yield gen.with_timeout(
                        timeout=self._io_loop.time() + connection_item.body_timeout,
                        future=body_data_future,
                        io_loop=self._io_loop
                    )
                except gen.TimeoutError:
                    log.error("Timeout reading body from {}".format(self.client_config.address_str))
                    raise gen.Return(False)

            #: parse body data
            try:
                body_msg = message_utils.parse_body(self._body_data)
            except RPCInputError as e:
                log.error(e.error)
                raise gen.Return(False)

            self._message.body = body_msg

        except StreamClosedError:
            raise gen.Return(False)
        raise gen.Return(True)

    def _on_connection_close(self):
        log.debug("Connection Timeout(close) {}".format(self.client_config.address_str))

    def close(self):
        if self.is_avaliable_stream():
            self.stream.close()
            self.stream = None
            self.client.tcp_client.close()

    def communicate(self, item):
        if self.is_avaliable_stream():
            self.stream.write(message_utils.encrypt(item))


class RPCClientItem(object):

    def __init__(self, item, callback, header_max_bytes=None, header_timeout=None,
                 body_max_bytes=None, body_timeout=None, waiting_timeout=0.2):
        assert callback is not None

        self.item = item
        self.callback = callback
        self.header_max_bytes = header_max_bytes or 1 * 1024  # 1K
        self.header_timeout = header_timeout or 10  # 10s
        self.body_max_bytes = body_max_bytes or 10 * 1024 * 1024  # 10M
        self.body_timeout = body_timeout


class RPCClientHandler(object):
    def __init__(self, client):
        self._client = client

    def service_name(self, service_name):
        return _RPCClientServiceHandler(self._client, service_name)


class _RPCClientServiceHandler(object):
    def __init__(self, client, service_name):
        self._client = client
        self._service_name = service_name

    @gen.coroutine
    def ___handler_request(self, func_name, **kwargs):
        topic_name = "{}.{}".format(self._service_name, func_name)
        body = ""
        if kwargs:
            body = json.dumps(kwargs)

        log.debug("{}({})".format(topic_name, body))
        request_message = RPCMessage(CONNECTION_TYPE_IN_REQUEST, topic_name, body)

        def _f(_message):
            log.debug("Request Message {}".format(_message.__dict__))

            status = _message.topic
            content = _message.body
            if status == RESPONSE_ERROR_TAG:
                raise gen.Return(content)

            if not content:
                raise gen.Return(content)

            v = content
            try:
                v = Storage(json.loads(content))
            except:
                v = content
            raise gen.Return(v)

        yield self._client.fetch(RPCClientItem(request_message, _f))

    def __getattr__(self, func):
        try:
            return self.__dict__[func]
        except KeyError:
            return functools.partial(self.___handler_request, func)
