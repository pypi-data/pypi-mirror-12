hackedit-cobol
======================

A set of plugins that add COBOL support to `HackEdit`_.

Features:
---------

- `pyqode.cobol`_ editor integration (syntax highlighter, code completion, goto, code folding,...)
- support for OpenCOBOL 1.1 and GnuCOBOL 2.0 compiler (MSVC based compiler are also supported on Windows)
- support for custom parsers + premade setups for DBPRE and EsqlOC
- two builtin workspaces:

  - project mode: specify which files are part of the project and compile them all at once.
  - single file mode: compile the current editor (very similar to OpenCobolIDE)

- support for multiple compiler configuration (you can choose which config is the main one and you can select secondary configuration to be run when you build your project/file).
- tool for computing field offset


In the future, we plan to add the following features:

- GnuCOBOL 2 debugger integration
- Support for standard build tools (makefile, autotools)


Requirements
------------

- `hackedit`_
- `pyqode.cobol`_

.. _HackEdit: http://github.com/ColinDuquesnoy/HackEdit
.. _pyqode.cobol: https://pypi.python.org/pypi/pyqode.cobol


Installation
------------

::

   pip3 install hackedit-cobol --upgrade

The plugin does not provide the GnuCOBOL compiler, you need to install it by yourself:

- on **Windows**, the plugin will try to use the compiler bundled with `OpenCobolIDE`_.
- on **OSX**, you can easily install the compiler by running ``brew install gnu-cobol`` or ``brew install gnu-cobol --devel`` for GnuCOBOL 2.0
- on **GNU/Linux**, you should use your package manager or install from source if it is not available (you will likely find the ``open-cobol`` or ``gnu-cobol`` package)

.. _OpenCobolIDE: https://github.com/OpenCobolIDE/OpenCobolIDE
