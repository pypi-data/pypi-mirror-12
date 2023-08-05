# -*- coding: utf-8 -*-
#
# This file is part of Invenio.
# Copyright (C) 2013, 2015 CERN.
#
# Invenio is free software; you can redistribute it and/or
# modify it under the terms of the GNU General Public License as
# published by the Free Software Foundation; either version 2 of the
# License, or (at your option) any later version.
#
# Invenio is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with Invenio; if not, write to the Free Software Foundation, Inc.,
# 59 Temple Place, Suite 330, Boston, MA 02111-1307, USA.

"""Unit tests for the memoise facility."""

from invenio_testing import InvenioTestCase


def fib(n):
    """Return Fibonacci number for 'n'."""
    out = 1
    if n >= 2:
        out = fib(n-2) + fib(n-1)
    return out


class MemoiseTest(InvenioTestCase):

    """Unit test cases for Memoise."""

    def test_memoise_fib(self):
        """memoiseutil - test fib() memoisation."""
        from invenio_utils.memoise import Memoise
        fib_memoised = Memoise(fib)
        self.assertEqual(fib(17), fib_memoised(17))
