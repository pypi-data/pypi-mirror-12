import logging
import uuid
from concurrent.futures import Future
import functools
import threading
try:
    # we prefer to use bundles asyncio version, otherwise fallback to trollius
    import asyncio
except ImportError:
    import trollius as asyncio
    from trollius import From

class NotEnoughData(Exception):
    pass

class Buffer(object):

    """
    alternative to io.BytesIO making debug easier
    and added a few conveniance methods
    """

    def __init__(self, data):
        self.logger = logging.getLogger(__name__)
        self.data = data

    def __str__(self):
        return "Buffer(size:{}, data:{})".format(len(self.data), self.data)
    __repr__ = __str__

    def __len__(self):
        return len(self.data)

    def read(self, size):
        """
        read and pop number of bytes for buffer
        """
        if size > len(self.data):
            raise Exception("No enough data left in buffer, request for {}, we have {}".format(size, self))
        #self.logger.debug("Request for %s bytes, from %s", size, self)
        data = self.data[:size]
        self.data = self.data[size:]
        #self.logger.debug("Returning: %s ", data)
        return data

    def copy(self, size=None):
        """
        return a copy, optionnaly only copy 'size' bytes
        """
        if size is None:
            return Buffer(self.data)
        else:
            return Buffer(self.data[:size])

    def test_read(self, size):
        """
        read 'size' bytes from buffer, without removing them from buffer
        """
        if size > len(self.data):
            raise Exception("No enough data left in buffer, request for {}, we have {}".format(size, self))
        return self.data[:size]

class SocketClosedException(Exception):
    pass

class SocketWrapper(object):
    """
    wrapper to make it possible to have same api for 
    normal sockets, socket from asyncio, StringIO, etc....
    """
    def __init__(self, sock):
        self.socket = sock

    def read(self, size):
        """
        Receive up to size bytes from socket
        """
        data = b''
        while size > 0:
            chunk = self.socket.recv(size)
            if not chunk:
                raise SocketClosedException("Server socket has closed")
            data += chunk
            size -= len(chunk)
        return data

    def write(self, data):
        self.socket.sendall(data)



def create_nonce():
    return uuid.uuid4().bytes + uuid.uuid4().bytes  # seems we need at least 32 bytes not 16 as python gives us...




class ThreadLoop(threading.Thread):
    """
    run an asyncio loop in a thread
    """

    def __init__(self):
        threading.Thread.__init__(self)
        self.logger = logging.getLogger(__name__)
        self.loop = None
        self._cond = threading.Condition()

    def start(self):
        with self._cond:
            threading.Thread.start(self)
            self._cond.wait()

    def run(self):
        self.logger.debug("Starting subscription thread")
        self.loop = asyncio.new_event_loop()
        asyncio.set_event_loop(self.loop)
        with self._cond:
            self._cond.notify_all()
        self.loop.run_forever()
        self.logger.debug("subscription thread ended")

    def create_server(self, proto, hostname, port):
        return self.loop.create_server(proto, hostname, port)

    def stop(self):
        """
        stop subscription loop, thus the subscription thread
        """
        self.loop.call_soon_threadsafe(self.loop.stop)

    def call_soon(self, callback):
        self.loop.call_soon_threadsafe(callback)

    def call_later(self, delay, callback):
        """
        threadsafe call_later from asyncio
        """
        p = functools.partial(self.loop.call_later, delay, callback)
        self.loop.call_soon_threadsafe(p)

    def _create_task(self, future, coro, cb=None):
        #task = self.loop.create_task(coro)
        task = asyncio.async(coro, loop=self.loop) 
        if cb:
            task.add_done_callback(cb)
        future.set_result(task)

    def create_task(self, coro, cb=None):
        """
        threadsafe create_task from asyncio
        """
        future = Future()
        p = functools.partial(self._create_task, future, coro, cb)
        self.loop.call_soon_threadsafe(p)
        return future.result()

    def run_coro_and_wait(self, coro):
        cond = threading.Condition()
        def cb(_):
            with cond:
                cond.notify_all()
        with cond:
            task = self.create_task(coro, cb)
            cond.wait()
        return task.result()

    def _run_until_complete(self, future, coro):
        task = self.loop.run_until_complete(coro)
        future.set_result(task)

    def run_until_complete(self, coro):
        """
        threadsafe run_until_completed from asyncio
        """
        future = Future()
        p = functools.partial(self._run_until_complete, future, coro)
        self.loop.call_soon_threadsafe(p)
        return future.result()



