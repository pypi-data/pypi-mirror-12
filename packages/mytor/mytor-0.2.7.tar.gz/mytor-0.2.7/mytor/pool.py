# encoding: utf-8

''' MySQL asynchronous client pool. '''

import time
import logging
from collections import deque
from tornado.concurrent import Future
from tornado.ioloop import IOLoop
from .client import Client


class ConnectionPoolClosedError(Exception):
    pass


class ConnectionNotFoundError(Exception):
    pass


class ConnectionNotUsedError(Exception):
    pass


class ConnectionUsedError(Exception):
    pass


class Connection(Client):
    def __init__(self, pool, *args, **kwargs):
        self._pool = pool
        self.idle_time = time.time()
        self.used_time = time.time()
        super(Connection, self).__init__(*args, **kwargs)

    def close(self, remote_close=False):
        if remote_close:
            return self.do_close()
        return self._pool.release_connection(self)

    def __enter__(self):
        return self

    def __exit__(self, *exc_info):
        del exc_info
        self.close()

    def do_close(self):
        return super(Connection, self).close()


class ConnectionPool(object):
    def __init__(self, *args, **kwargs):
        self._max_connections = kwargs.pop("max_connections", 1)
        self._idle_seconds = kwargs.pop("idle_seconds", 0)
        self._args = args
        self._kwargs = kwargs
        self._connections = deque(maxlen=self._max_connections)
        self._used_connections = {}
        self._connections_count = 0
        self._wait_connections = deque()
        self._closed = False
        self._close_future = None
        self._check_idle_callback = False
        self._check_close_callback = False
        self._io_loop = kwargs.pop('io_loop', None)
        if self._io_loop is None:
            self._io_loop = IOLoop.current()

    @property
    def closed(self):
        return self._closed

    def init_connection(self, callback):

        def on_connected(connection_future):
            if connection_future._exc_info is None:
                connection = connection_future._result
                callback(True, connection)
            else:
                callback(False, connection_future._exc_info)

        connection = Connection(self, *self._args, **self._kwargs)
        connection.set_close_callback(self.connection_close_callback)

        self._connections_count += 1
        self._used_connections[id(connection)] = connection

        connection_future = connection.connect()
        self._io_loop.add_future(connection_future, on_connected)

        if self._idle_seconds > 0 and not self._check_idle_callback:
            self._io_loop.add_timeout(time.time() + self._idle_seconds, self.check_idle_connections)
            self._check_idle_callback = True

    def get_connection(self):
        if self._closed:
            raise ConnectionPoolClosedError()

        future = Future()
        while self._connections:
            connection = self._connections.pop()
            self._used_connections[id(connection)] = connection
            connection.used_time = time.time()
            if connection.open:
                future.set_result(connection)
                return future

        if self._connections_count < self._max_connections:
            def on_connect(succed, result):
                if succed:
                    future.set_result(result)
                else:
                    future.set_exc_info(result)

            self.init_connection(on_connect)
        else:
            self._wait_connections.append(future)
        return future

    Connection = get_connection
    connect = get_connection

    def release_connection(self, connection):
        if self._closed:
            return connection.do_close()

        if not connection.open:
            future = Future()
            future.set_result(None)
            return future

        if self._wait_connections:
            wait_future = self._wait_connections.popleft()
            connection.used_time = time.time()
            self._io_loop.add_callback(wait_future.set_result, connection)

            while self._wait_connections and self._connections:
                connection = self._connections.pop()
                self._used_connections[id(connection)] = connection
                connection.used_time = time.time()
                if connection.open:
                    wait_future = self._wait_connections.popleft()
                    self._io_loop.add_callback(wait_future.set_result, connection)
        else:
            try:
                del self._used_connections[id(connection)]
                self._connections.append(connection)
                connection.idle_time = time.time()
            except KeyError:
                if connection not in self._connections:
                    connection.do_close()
                    raise ConnectionNotFoundError()
                else:
                    raise ConnectionNotUsedError()

        future = Future()
        future.set_result(None)
        return future

    def close_connection(self, connection):
        try:
            self._connections.remove(connection)
            self._used_connections[id(connection)] = connection
            return connection.do_close()
        except ValueError:
            raise ConnectionUsedError()

    def check_close_callback(self):
        self._check_close_callback = False
        for connection in list(self._connections):
            if connection.open:
                connection._handle_read()

    def connection_close_callback(self, connection):
        try:
            del self._used_connections[id(connection)]
            self._connections_count -= 1
        except KeyError:
            try:
                self._connections.remove(connection)
                self._connections_count -= 1
            except ValueError:
                logging.warning("Close unknown Connection %s", connection)
        if self._close_future and not self._used_connections and not self._connections:
            self._close_future.set_result(None)
            self._close_future = None

        if not self._check_close_callback:
            self.check_close_callback()
            self._check_close_callback = True

    def close(self):
        if self._closed:
            raise ConnectionPoolClosedError()

        self._closed = True
        self._close_future = Future()

        while len(self._wait_connections):
            future = self._wait_connections.popleft()
            self._io_loop.add_callback(future.set_exception, ConnectionPoolClosedError())

        while len(self._connections):
            connection = self._connections.popleft()
            self._used_connections[id(connection)] = connection
            connection.do_close()
        return self._close_future

    def check_idle_connections(self):
        next_check_time = time.time() + self._idle_seconds
        for connection in tuple(self._connections):
            if time.time() - connection.idle_time > self._idle_seconds:
                self.close_connection(connection)
            elif connection.idle_time + self._idle_seconds < next_check_time:
                next_check_time = connection.idle_time + self._idle_seconds

        if not self._closed and self._connections or self._used_connections:
            self._io_loop.add_timeout(next_check_time, self.check_idle_connections)
        else:
            self._check_idle_callback = False
