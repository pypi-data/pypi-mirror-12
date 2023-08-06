import sys
from time import time

from tornado.tcpclient import TCPClient
from tornado.iostream import StreamClosedError
from tornado import gen

from distributed import Nanny, Center, rpc
from distributed.utils import ignoring
from distributed.utils_test import loop


def test_nanny(loop):
    c = Center('127.0.0.1', 8026)
    n = Nanny('127.0.0.1', 8027, 8028, '127.0.0.1', 8026, ncores=2)
    c.listen(c.port)

    @gen.coroutine
    def f():
        nn = rpc(ip=n.ip, port=n.port)
        yield n._start()
        assert n.process.is_alive()
        assert c.ncores[n.worker_address] == 2
        assert c.nannies[n.worker_address] > 8000

        yield nn.kill()
        assert n.worker_address not in c.ncores
        assert n.worker_address not in c.nannies
        assert not n.process

        yield nn.kill()
        assert n.worker_address not in c.ncores
        assert n.worker_address not in c.nannies
        assert not n.process

        yield nn.instantiate()
        assert n.process.is_alive()
        assert c.ncores[n.worker_address] == 2
        assert c.nannies[n.worker_address] > 8000

        yield nn.terminate()
        assert not n.process

        if n.process:
            n.process.terminate()

        yield n._close()
        c.stop()

    loop.run_sync(f)


def test_nanny_process_failure(loop):
    c = Center('127.0.0.1', 8036)
    n = Nanny('127.0.0.1', 8037, 8038, '127.0.0.1', 8036, ncores=2)
    c.listen(c.port)

    @gen.coroutine
    def f():
        nn = rpc(ip=n.ip, port=n.port)
        yield n._start()

        ww = rpc(ip=n.ip, port=n.worker_port)
        yield ww.update_data(data={'x': 1, 'y': 2})
        with ignoring(StreamClosedError):
            yield ww.compute(function=sys.exit, args=(0,), key='z')

        start = time()
        while n.process.is_alive():  # wait while process dies
            yield gen.sleep(0.01)
            assert time() - start < 2

        start = time()
        while not n.process.is_alive():  # wait while process comes back
            yield gen.sleep(0.01)
            assert time() - start < 2

        start = time()
        while n.worker_address not in c.ncores:
            yield gen.sleep(0.01)
            assert time() - start < 2

        yield n._close()
        c.stop()

    loop.run_sync(f)
