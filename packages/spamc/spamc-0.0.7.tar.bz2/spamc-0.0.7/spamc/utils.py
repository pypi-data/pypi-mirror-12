# -*- coding: utf-8 -*-
# vim: ai ts=4 sts=4 et sw=4
"""utilities"""
import errno
import select
import socket
import platform

from importlib import import_module


def load_backend(backend_name):
    """ load pool backend."""
    try:
        if len(backend_name.split(".")) > 1:
            mod = import_module(backend_name)
        else:
            mod = import_module("spamc.backend_%s" % backend_name)
        return mod
    except ImportError:
        error_msg = "%s isn't a spamc backend" % backend_name
        raise ImportError(error_msg)


def can_use_kqueue():
    """Check for kqueue support"""
    if not hasattr(select, "kqueue"):
        return False

    if platform.system() == 'Darwin' and platform.mac_ver()[0] < '10.7':
        return False

    return True


# pylint: disable=R0911,R0912
def is_connected(skt):
    """Check if socket is connected"""
    try:
        fno = skt.fileno()
    except socket.error as err:
        if err[0] == errno.EBADF:
            return False
        raise

    try:
        if hasattr(select, "epoll"):
            # pylint: disable=no-member
            epoller = select.epoll()
            epoller.register(fno, select.EPOLLOUT | select.EPOLLIN)
            events = epoller.poll(0)
            for fdd, evt in events:
                if fno == fdd and \
                        (evt & select.EPOLLOUT or evt & select.EPOLLIN):
                    epoller.unregister(fno)
                    return True
            epoller.unregister(fno)
        elif hasattr(select, "poll"):
            # pylint: disable=no-member
            poller = select.poll()
            poller.register(fno, select.POLLOUT | select.POLLIN)
            events = poller.poll(0)
            for fdd, evt in events:
                if fno == fdd and \
                        (evt & select.POLLOUT or evt & select.POLLIN):
                    poller.unregister(fno)
                    return True
            poller.unregister(fno)
        elif can_use_kqueue():
            kqq = select.kqueue()
            events = [
                select.kevent(fno, select.KQ_FILTER_READ, select.KQ_EV_ADD),
                select.kevent(fno, select.KQ_FILTER_WRITE, select.KQ_EV_ADD)
            ]
            kqq.control(events, 0)
            kevents = kqq.control(None, 4, 0)
            for evt in kevents:
                if evt.ident == fno:
                    if evt.flags & select.KQ_EV_ERROR:
                        return False
                    else:
                        return True
            # delete
            events = [
                select.kevent(fno, select.KQ_FILTER_READ, select.KQ_EV_DELETE),
                select.kevent(fno, select.KQ_FILTER_WRITE, select.KQ_EV_DELETE)
            ]
            kqq.control(events, 0)
            kqq.close()
            return True
        else:
            rst, _, _ = select.select([fno], [], [], 0)
            if not rst:
                return True
    except IOError:
        pass
    except (ValueError, select.error,):
        pass
    return False
