import collections
import threading
import os

from Queue import Queue

import vanilla

from vanilla import message

from vanilla.exception import Closed


class Pipe(object):
    class Sender(object):
        def __init__(self, q, w):
            self.q = q
            self.w = w

        def send(self, item, timeout=-1):
            self.q.append(item)
            os.write(self.w, chr(1))

    def __new__(cls, hub):
        r, w = os.pipe()
        q = collections.deque()

        sender = Pipe.Sender(q, w)

        r = hub.io.fd_in(r)

        @r.pipe
        def recver(r, out):
            for s in r:
                for ch in s:
                    ch = ord(ch)
                    if not ch:
                        break
                    out.send(q.popleft())
            r.close()
            out.close()

        return message.Pair(sender, recver)


class Wrap(object):
    def __init__(self, pool, target):
        self.pool = pool
        self.target = target

    def __call__(self, *a, **kw):
        return self.pool.call(self.target, *a, **kw)

    def __getattr__(self, name):
        return Wrap(self.pool, getattr(self.target, name))


class Pool(object):
    def __init__(self, hub, size):
        self.hub = hub
        self.size = size

        self.parent = hub.thread.pipe().consume(
            lambda (sender, item): sender.send(item))

        self.requests = Queue()
        self.closed = False
        self.threads = 0

        for i in xrange(size):
            t = threading.Thread(target=self.runner)
            t.daemon = True
            t.start()
            self.threads += 1

    def wrap(self, target):
        return Wrap(self, target)

    def runner(self):
        while True:
            item = self.requests.get()
            if type(item) == Closed:
                self.threads -= 1
                if self.threads <= 0:
                    # TODO: fix up shutdown
                    self.parent.close()
                return

            sender, f, a, kw = item
            self.parent.send((sender, f(*a, **kw)))
            self.requests.task_done()

    def call(self, f, *a, **kw):
        if self.closed:
            raise Closed
        sender, recver = self.hub.pipe()
        self.requests.put((sender, f, a, kw))
        return recver

    def close(self):
        self.closed = True
        for i in xrange(self.size):
            # tell thread pool to stop when they have finished the last request
            self.requests.put(Closed())


class __plugin__(object):
    def __init__(self, hub):
        self.hub = hub

    def pipe(self):
        return Pipe(self.hub)

    def call(self, f, *a):
        def bootstrap(sender, f, a):
            sender.send(f(*a))

        sender, recver = self.hub.thread.pipe()
        self.t = threading.Thread(target=bootstrap, args=(sender, f, a))
        self.t.start()
        return recver

    def pool(self, size):
        return Pool(self.hub, size)

    def spawn(self, f, *a):
        def bootstrap(parent, f, a):
            h = vanilla.Hub()
            child = h.thread.pipe()
            h.parent = message.Pair(parent.sender, child.recver)
            h.parent.send(child.sender)
            f(h, *a)
            # TODO: handle shutdown

        parent = self.hub.thread.pipe()
        t = threading.Thread(target=bootstrap, args=(parent, f, a))
        t.daemon = True
        t.start()
        return message.Pair(parent.recver.recv(), parent.recver)
