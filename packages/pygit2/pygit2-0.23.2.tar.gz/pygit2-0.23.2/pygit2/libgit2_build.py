# -*- coding: utf-8 -*-
#
# Copyright 2010-2014 The pygit2 contributors
#
# This file is free software; you can redistribute it and/or modify
# it under the terms of the GNU General Public License, version 2,
# as published by the Free Software Foundation.
#
# In addition to the permissions in the GNU General Public License,
# the authors give you unlimited permission to link the compiled
# version of this file into combinations with other programs,
# and to distribute those combinations without any restriction
# coming from the use of this file.  (The General Public License
# restrictions do apply in other respects; for example, they cover
# modification of the file, and distribution when not linked into
# a combined executable.)
#
# This file is distributed in the hope that it will be useful, but
# WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the GNU
# General Public License for more details.
#
# You should have received a copy of the GNU General Public License
# along with this program; see the file COPYING.  If not, write to
# the Free Software Foundation, 51 Franklin Street, Fifth Floor,
# Boston, MA 02110-1301, USA.

"""
This is an special module, it provides stuff used by setup.py and by
pygit2 at run-time.
"""

# Import from the Standard Library
import codecs
import os
from os import getenv
from os.path import abspath, dirname
import sys


#
# The version number of pygit2
#
__version__ = '0.23.2'


#
# Utility functions to get the paths required for bulding extensions
#
def _get_libgit2_path():
    # LIBGIT2 environment variable takes precedence
    libgit2_path = getenv("LIBGIT2")
    if libgit2_path is not None:
        return libgit2_path

    # Default
    if os.name == 'nt':
        return '%s\libgit2' % getenv("ProgramFiles")
    return '/usr/local'


def get_libgit2_paths():
    libgit2_path = _get_libgit2_path()
    return (
        os.path.join(libgit2_path, 'bin'),
        os.path.join(libgit2_path, 'include'),
        getenv('LIBGIT2_LIB', os.path.join(libgit2_path, 'lib')),
    )


import cffi

ffi = cffi.FFI()

# Load C definitions
if getattr(sys, 'frozen', False):
    dir_path = getattr(sys, '_MEIPASS', None)
    if dir_path is None:
        dir_path = dirname(abspath(sys.executable))
else:
    dir_path = dirname(abspath(__file__))

decl_path = os.path.join(dir_path, 'decl.h')
with codecs.open(decl_path, 'r', 'utf-8') as header:
    C_HEADER_SRC = header.read()

libgit2_bin, libgit2_include, libgit2_lib = get_libgit2_paths()

C_KEYWORDS = dict(libraries=['git2'],
                  library_dirs=[libgit2_lib],
                  include_dirs=[libgit2_include])

# The modulename
# Simplified version of what cffi does: remove kwargs and vengine
preamble = "#include <git2.h>"

set_source = getattr(ffi, 'set_source', None)
if set_source is not None:
    set_source("pygit2._libgit2", preamble, **C_KEYWORDS)

ffi.cdef(C_HEADER_SRC)

if __name__ == '__main__':
    ffi.compile()
