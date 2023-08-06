# -*- coding: utf-8 -*-

# --------------------------------------------------------------------
# The MIT License (MIT)
#
# Copyright (c) 2014 Jonathan Labéjof <jonathan.labejof@gmail.com>
#
# Permission is hereby granted, free of charge, to any person obtaining a copy
# of this software and associated documentation files (the "Software"), to deal
# in the Software without restriction, including without limitation the rights
# to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
# copies of the Software, and to permit persons to whom the Software is
# furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included in
# all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
# IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
# SOFTWARE.
# --------------------------------------------------------------------

"""Module which provides variables and constants in order to ease developments
among several python versions and platforms.
"""

from __future__ import unicode_literals

from sys import version_info, modules
from platform import python_implementation
from inspect import getmodule

__all__ = [
    '__version__',  # lib version
    'PY3', 'PY2', 'PY26', 'PY27',  # python versions
    'PYPY', 'CPYTHON', 'JYTHON', 'IRONPYTHON',  # python runtime types
    'basestring', 'getcallargs', 'OrderedDict',  # python2.7 objects
    'range', 'raw_input', 'xrange', 'cexec',
    'httplib', 'winreg', 'configparser',  # common modules with python2 name
    'copyreg', 'queue', 'socketserver', '_markupbase', 'reprlib', 'builtins'
]

# Store the version here so:
# 1) we don't load dependencies by storing it in __init__.py
# 2) we can import it in setup.py for the same reason
# 3) we can import it into the utils module
# thanks to https://github.com/pycontribs/jira/blob/master/jira/version.py

#: project version
__version__ = '1.1.0'


PY3 = version_info[0] == 3  #: python3.
PY2 = version_info[0] == 2  #: python2.
PY26 = PY2 and version_info[1] == 6  #: python2.6.
PY27 = PY2 and version_info[1] == 7  #: python2.7.
PYPY = python_implementation() == 'PyPy'  #: pypy.
CPYTHON = python_implementation() == 'CPython'  #: cpython.
JYTHON = python_implementation() == 'Jython'  #: jython.
IRONPYTHON = python_implementation() == 'IronPython'  #: IronPython.


def cexec(source, _globals, _locals):
    """Common python2/3 exec function."""

    exec(source, _globals, _locals)


if PY3:  # set references to common object with different names
    # define python3 functions with python2 names
    basestring = str
    range = range
    xrange = range
    raw_input = input

    # import python3 modules with python2 module names
    import http.client as httplib  #: http.client in python3.
    try:
        import winreg  #: winreg in python3.
    except ImportError:
        pass
    import configparser  #: configparser in python3.
    import copyreg  #: copyreg in python3.
    import queue  #: queue in python3.
    import socketserver  #: socketserver in python3.
    import _markupbase  #: _markupbase in python3.
    import reprlib  #: reprlib in python3.
    import builtins  #: builtin module.

    # set exec to cexec in PY3 beceause exec is a builtin function
    setattr(getmodule(cexec), 'cexec', getattr(builtins, 'exec'))

else:
    # define python2 which could be also used in python3 environment
    basestring = str, unicode
    range = xrange
    xrange = xrange
    raw_input = raw_input

    # import python2 modules which could be imported from this module
    import httplib  #: httplib module.
    try:
        import _winreg as winreg
    except ImportError:
        pass
    import ConfigParser as configparser  #: configparser module.
    import copy_reg as copyreg  #: copy reg module.
    import Queue as queue  #: queue module.
    import SocketServer as socketserver  #: socketserver module.
    import markupbase as _markupbase  #: markupbase module.
    import repr as reprlib  #: repr module.
    import __builtin__ as builtins  #: builtin module.

# add functions and types if py26 which exist in py27 and py3.x
if PY26:

    # add definition of ordereddict
    from ordereddict import OrderedDict

    # add functions and classes which come from
    from inspect import getargspec, ismethod
    from sys import getdefaultencoding

    # add definition of getcallargs
    def getcallargs(func, *positional, **named):
        """Get the mapping of arguments to values.

        A dict is returned, with keys the function argument names (including
        the names of the * and ** arguments, if any), and values the respective
        bound values from 'positional' and 'named'.
        """
        args, varargs, varkw, defaults = getargspec(func)
        f_name = func.__name__
        arg2value = {}

        # The following closures are basically because of tuple parameter
        # unpacking.
        assigned_tuple_params = []

        def assign(arg, value):
            if isinstance(arg, str):
                arg2value[arg] = value
            else:
                assigned_tuple_params.append(arg)
                value = iter(value)
                for i, subarg in enumerate(arg):
                    try:
                        subvalue = next(value)
                    except StopIteration:
                        raise ValueError('need more than %d %s to unpack' %
                                         (i, 'values' if i > 1 else 'value'))
                    assign(subarg, subvalue)
                try:
                    next(value)
                except StopIteration:
                    pass
                else:
                    raise ValueError('too many values to unpack')

        def is_assigned(arg):
            if isinstance(arg, str):
                return arg in arg2value
            return arg in assigned_tuple_params

        if ismethod(func) and func.im_self is not None:
            # implicit 'self' (or 'cls' for classmethods) argument
            positional = (func.im_self,) + positional
        num_pos = len(positional)
        num_total = num_pos + len(named)
        num_args = len(args)
        num_defaults = len(defaults) if defaults else 0
        for arg, value in zip(args, positional):
            assign(arg, value)
        if varargs:
            if num_pos > num_args:
                assign(varargs, positional[-(num_pos - num_args):])
            else:
                assign(varargs, ())
        elif 0 < num_args < num_pos:
            raise TypeError('%s() takes %s %d %s (%d given)' % (
                f_name, 'at most' if defaults else 'exactly', num_args,
                'arguments' if num_args > 1 else 'argument', num_total))
        elif num_args == 0 and num_total:
            if varkw:
                if num_pos:
                    # We should use num_pos, but Python also uses num_total:
                    raise TypeError('%s() takes exactly 0 arguments '
                                    '(%d given)' % (f_name, num_total))
            else:
                raise TypeError('%s() takes no arguments (%d given)' %
                                (f_name, num_total))
        for arg in args:
            if isinstance(arg, str) and arg in named:
                if is_assigned(arg):
                    raise TypeError("%s() got multiple values for keyword "
                                    "argument '%s'" % (f_name, arg))
                else:
                    assign(arg, named.pop(arg))
        if defaults:    # fill in any missing values with the defaults
            for arg, value in zip(args[-num_defaults:], defaults):
                if not is_assigned(arg):
                    assign(arg, value)
        if varkw:
            assign(varkw, named)
        elif named:
            unexpected = next(iter(named))
            if isinstance(unexpected, unicode):
                unexpected = unexpected.encode(getdefaultencoding(), 'replace')
            raise TypeError("%s() got an unexpected keyword argument '%s'" %
                            (f_name, unexpected))
        unassigned = num_args - len([arg for arg in args if is_assigned(arg)])
        if unassigned:
            num_required = num_args - num_defaults
            raise TypeError('%s() takes %s %d %s (%d given)' % (
                f_name, 'at least' if defaults else 'exactly', num_required,
                'arguments' if num_required > 1 else 'argument', num_total))
        return arg2value

else:

    # add builtin objects from python2.7+
    from collections import OrderedDict
    from inspect import getcallargs
