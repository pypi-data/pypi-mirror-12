__future__ import checker
=========================

.. image:: https://secure.travis-ci.org/xZise/flake8-future-import.png?branch=master
   :alt: Build Status
   :target: https://travis-ci.org/xZise/flake8-future-import

.. image:: http://codecov.io/github/xZise/flake8-future-import/coverage.svg?branch=master
   :alt: Coverage Status
   :target: http://codecov.io/github/xZise/flake8-future-import?branch=master

.. image:: https://badge.fury.io/py/flake8-future-import.svg
   :alt: Pypi Entry
   :target: https://pypi.python.org/pypi/flake8-future-import

A script to check for the imported ``__future__`` modules to make it easier to
have a consistent code base.

By default it requires and forbids all imports but it's possible to have
certain imports optional by ignoring both their requiring and forbidding error
code. In the future it's planned to have a “consistency” mode and that the
default is having the import optional or required (not sure on that yet).

This module provides a plugin for ``flake8``, the Python code checker.


Standalone script
-----------------

The checker can be used directly::

  $ python -m flake8-import --ignore FI10,FI11,FI12,FI13,FI15,FI5 some_file.py
  some_file.py:1:1: FI14 __future__ import "unicode_literals" missing

Even though ``flake8`` still uses ``optparse`` this script in standalone mode
is using ``argparse``.


Plugin for Flake8
-----------------

When both ``flake8 2.0`` and ``flake8-future-imports`` are installed, the plugin
is available in ``flake8``::

  $ flake8 --version
  2.0 (pep8: 1.4.2, flake8-future-imports: 0.3.dev0, pyflakes: 0.6.1)

By default the plugin will check for all the future imports but with
``--ignore`` it's possible to define which imports from ``__future__`` are
optional, required or forbidden. It will emit a warning if necessary imports
are missing::

  $ flake8 --ignore FI10,FI11,FI12,FI13,FI15,FI5 some_file.py
  ...
  some_file.py:1:1: FI14 __future__ import "unicode_literals" missing


Parameters
----------

This module adds one parameter:

* ``--require-code``: Doesn't complain on files which only contain comments or
  strings (and by extension docstrings). Corresponds to ``require-code = True``
  in the ``tox.ini``.

The stand alone version also mimics flake8's ignore parameter.


Error codes
-----------

This plugin is using the following error codes:

+------+--------------------------------------------------+
| FI10 | ``__future__`` import "division" missing         |
+------+--------------------------------------------------+
| FI11 | ``__future__`` import "absolute_import" missing  |
+------+--------------------------------------------------+
| FI12 | ``__future__`` import "with_statement" missing   |
+------+--------------------------------------------------+
| FI13 | ``__future__`` import "print_function" missing   |
+------+--------------------------------------------------+
| FI14 | ``__future__`` import "unicode_literals" missing |
+------+--------------------------------------------------+
| FI15 | ``__future__`` import "generator_stop" missing   |
+------+--------------------------------------------------+
+------+--------------------------------------------------+
| FI50 | ``__future__`` import "division" present         |
+------+--------------------------------------------------+
| FI51 | ``__future__`` import "absolute_import" present  |
+------+--------------------------------------------------+
| FI52 | ``__future__`` import "with_statement" present   |
+------+--------------------------------------------------+
| FI53 | ``__future__`` import "print_function" present   |
+------+--------------------------------------------------+
| FI54 | ``__future__`` import "unicode_literals" present |
+------+--------------------------------------------------+
| FI55 | ``__future__`` import "generator_stop" present   |
+------+--------------------------------------------------+

For a sensible usage, for each import either or both error code need to be
ignored as it will otherwise always complain either because it's present or
because it is not. The corresponding other error code can be determined by
adding or substracting 40.

* Ignoring the **lower** one will **forbid** the import
* Ignoring the **higher** one will **require** the import
* Ignoring **both** will make the import **optional**

The plugin is always producing errors about missing and present imports and
``flake8`` actually does ignore then the codes accordingly. So the plugin does
not know that an import is allowed and forbidden at the same time and thus
cannot skip reporting those imports.


Changes
-------

0.3.1 - 2015-09-07
``````````````````
* Support setting ``--require-code`` in the ``tox.ini``

0.3.0 - 2015-09-07
``````````````````
* Using a different error code namespace (FIXX)
* Add error codes returned when an import is present
* Removed ``nested_scopes`` and ``generators`` from the available list
* Skip files which only contains comments and strings

0.2.1 - 2015-08-10
``````````````````
* Fixed the module and URL in setup.py
* Fixed the name in the script itself

0.2 - 2015-08-10
````````````````
* Instead of parameters it's now using error codes to define which futures are
  missing. This is removing the ability to forbid a future for now.

0.1 - 2015-08-08
````````````````
* First release
