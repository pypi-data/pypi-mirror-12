hackedit-python
===============

A set of plugins that add Python support to `HackEdit`_.

Features:
---------

- ability to run scripts (or the selected text of an editor) and manage
  project run configuration
- `pyqode.python`_ integration:

  - syntax highlighting
  - code completion (based on the `jedi`_ code completion engine)
  - pep8 + pyflakes on the fly analysis
  - smart indentation
  - go to definition
  - call tips
  - documentation viewer
- IPython integration (jupyter not supported yet)
- refactoring (with `rope`_)
- package manager interface
- support for virtualenv and custom intepreters


Requirements
------------

The following packages are needed:

- `hackedit`_
- `docutils`_

The following packages are optional dependencies:

- `ipython`_ (== 3.2.1, jupyter not supported yet)
- `pyzmq`_


The following packages are included in a zip archive:

- `rope`_
- `virtualenv`_


Installation
------------

::

    pip3 install hackedit-python --upgrade

.. _HackEdit: https://github.com/HackEdit/hackedit
.. _docutils: https://pypi.python.org/pypi/docutils
.. _ipython: https://pypi.python.org/pypi/IPython
.. _pyzmq: https://pypi.python.org/pypi/pyzmq
.. _rope: https://pypi.python.org/pypi/rope_py3k
.. _virtualenv: https://pypi.python.org/pypi/virtualenv
.. _pyqode.python: https://github.com/pyQode/pyqode.python
.. _jedi: https://pypi.python.org/pypi/jedi


