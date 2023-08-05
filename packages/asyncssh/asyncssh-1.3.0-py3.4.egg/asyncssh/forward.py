# Copyright (c) 2013-2015 by Ron Frederick <ronf@timeheart.net>.
# All rights reserved.
#
# This program and the accompanying materials are made available under
# the terms of the Eclipse Public License v1.0 which accompanies this
# distribution and is available at:
#
#     http://www.eclipse.org/legal/epl-v10.html
#
# Contributors:
#     Ron Frederick - initial implementation, API, and documentation

"""SSH port forwarding handlers"""

import asyncio

from .misc import DisconnectError
from .session import SSHTCPSession


class SSHPortForwarder(SSHTCPSession):
    """SSH port forwarding connection handler"""

    def __init__(self, conn, loop, peer=None):
        self._conn = conn
        self._loop = loop
        self._peer = peer
        self._transport = None
        self._eof_received = False

        if peer:
            peer.set_peer(self)

    def set_peer(self, peer):
        """Set the peer forwarder to exchange data with"""

        self._peer = peer

    def clear_peer(self):
        """Clear the peer forwarder"""

        self._peer = None

    def set_transport(self, transport):
        """Set the transport to forward to/from"""

        self._transport = transport

    def clear_transport(self):
        """Close and clear the transport"""

        if self._transport:
            self._transport.close()
            self._transport = None

    def write(self, data):
        """Write data to the transport"""

        self._transport.write(data)

    def write_eof(self):
        """Write end of file to the transport"""

        self._transport.write_eof()

    def was_eof_received(self):
        """Return whether end of file has been received or not"""

        return self._eof_received

    def pause_reading(self):
        """Pause reading from the transport"""

        self._transport.pause_reading()

    def resume_reading(self):
        """Resume reading on the transport"""

        self._transport.resume_reading()

    def connection_made(self, transport):
        """Handle a newly opened connection"""

        self.set_transport(transport)

    def connection_lost(self, exc):
        """Handle an incoming connection close"""

        self.clear_transport()

        if self._peer:
            self._peer.clear_transport()
            self._peer.clear_peer()
            self.clear_peer()

    def data_received(self, data, datatype=None):
        """Handle incoming data from the transport"""

        self._peer.write(data)

    def eof_received(self):
        """Handle an incoming end of file from the transport"""

        self._eof_received = True
        self._peer.write_eof()
        return not self._peer.was_eof_received()

    def pause_writing(self):
        """Pause writing by asking peer to pause reading"""

        self._peer.pause_reading()

    def resume_writing(self):
        """Resume writing by asking peer to resume reading"""

        self._peer.resume_reading()


class SSHLocalPortForwarder(SSHPortForwarder):
    """SSH local port forwarding connection handler"""

    def __init__(self, conn, loop, coro, dest_host, dest_port):
        super().__init__(conn, loop)
        self._coro = coro
        self._dest_host = dest_host
        self._dest_port = dest_port

    @asyncio.coroutine
    def _forward(self):
        """Set up a port forwarding for a local port"""

        def session_factory():
            """Return an SSH port forwarder"""

            return SSHPortForwarder(self._conn, self._loop, self._peer)

        orig_host, orig_port = self._transport.get_extra_info('peername')[:2]

        try:
            _, self._peer = \
                yield from self._coro(session_factory, self._dest_host,
                                      self._dest_port, orig_host, orig_port)
            self._peer.set_peer(self)
            self.resume_reading()
        except DisconnectError:
            self.clear_transport()

    def connection_made(self, transport):
        """Handle a newly opened connection"""

        super().connection_made(transport)
        transport.pause_reading()
        asyncio.async(self._forward(), loop=self._loop)


class SSHRemotePortForwarder(SSHPortForwarder):
    """SSH remote port forwarding connection handler"""

    def __init__(self, conn, loop, peer):
        super().__init__(conn, loop, peer)
        self.pause_writing()

    def connection_made(self, transport):
        """Handle a newly opened connection"""

        super().connection_made(transport)
        self.resume_writing()
