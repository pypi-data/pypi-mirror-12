# -*- coding: utf-8 -*-
# vim: ai ts=4 sts=4 et sw=4
# spamc - Python spamassassin spamc client library
# Copyright (C) 2015  Andrew Colin Kissa <andrew@topdog.za.net>
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as published
# by the Free Software Foundation, either version 3 of the License, or
# (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <http://www.gnu.org/licenses/>.
"""
spamc: Python spamassassin spamc client library
exceptions
"""


class SpamCError(Exception):
    """SpamCError Exceptions"""
    def __init__(self, message):
        """Init"""
        super(SpamCError, self).__init__(message)


class SpamCTimeOutError(SpamCError):
    """Timeout Exceptions"""
    pass


class SpamCBrokenSockError(SpamCError):
    """Broken socket Exceptions"""
    pass


class SpamCConnError(SpamCError):
    """Connection Pool Exceptions"""
    pass


class SpamCResponseError(SpamCError):
    """Invalid Response Exceptions"""
    pass
