import sys
is_pypy = hasattr(sys, 'pypy_translation_info')

from pypytools.unroll import unroll
from pypytools.codegen import Code
from pypytools.jitview import JitView
from pypytools.util import clonefunc
