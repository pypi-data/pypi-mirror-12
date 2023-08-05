#!/usr/bin/python
# -*- coding: utf-8 -*-

"""zhpy import hook

This is the MIT license:
http://www.opensource.org/licenses/mit-license.php

Copyright (c) 2007~ Fred Lin and contributors. zhpy is a trademark of Fred Lin.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to
deal in the Software without restriction, including without limitation the
rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
sell copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
"""

import __builtin__
try:
    if setup:
        import sys
        sys.stderr.write("reload(zhpy.import_hook) won't work!\n")
except:
    from pyzh import zh_chr
    __trueimport__ = __builtin__.__import__

    def chinese_import(modname, *arg, **kw):
        """chinese import

        convert uri file name back to chinese filename
        """
        __builtin__.__import__ = __trueimport__
        modname = zh_chr(modname).encode("utf8")
        __builtin__.__import__ = chinese_import
        return __trueimport__(modname, *arg, **kw)

    def setup():
        if not getattr(chinese_import, "hooked", False):
            __builtin__.__import__ = chinese_import
            chinese_import.hooked=True

setup()