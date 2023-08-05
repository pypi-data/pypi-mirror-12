import sys

try:
    str_type = basestring
    str_is_unicode = False
except NameError:
    str_type = str
    str_is_unicode = True

try:
    unichr = unichr
except NameError:
    unichr = chr

if str_is_unicode:
    def native_str(s, errors=None):
        return s
else:
    def native_str(s, errors=None):
        return s.encode(errors=errors)

if sys.version_info < (3, 0):
    PY3 = False
else:
    PY3 = True
