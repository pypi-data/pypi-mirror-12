# This file is part of parallel-ssh.

# Copyright (C) 2015- Panos Kittenis

# This library is free software; you can redistribute it and/or
# modify it under the terms of the GNU Lesser General Public
# License as published by the Free Software Foundation, version 2.1.

# This library is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# Lesser General Public License for more details.

# You should have received a copy of the GNU Lesser General Public
# License along with this library; if not, write to the Free Software
# Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301  USA


"""Exceptions raised by parallel-ssh classes."""


class UnknownHostException(Exception):
    """Raised when a host is unknown (dns failure)"""
    pass


class ConnectionErrorException(Exception):
    """Raised on error connecting (connection refused/timed out)"""
    pass


class AuthenticationException(Exception):
    """Raised on authentication error (user/password/ssh key error)"""
    pass


class SSHException(Exception):
    """Raised on SSHException error - error authenticating with SSH server"""
    pass
