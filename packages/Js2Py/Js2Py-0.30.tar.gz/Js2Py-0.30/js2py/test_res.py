import js2py.pyjs, sys
# Redefine builtin objects... Do you have a better idea?
for m in sys.modules.keys():
	if m.startswith('js2py'):
		del sys.modules[m]
del js2py.pyjs
del js2py
from js2py.pyjs import *
# setting scope
var = Scope( JS_BUILTINS )
set_global_object(var)

# Code follows:
var.registers([])
var.put(u'a', var.get(u'Boolean').create(Js(0.0)))
(var.get(u'String').create(Js(u'2'))==var.get(u'Number')(Js(2.0)))
