|Code Health|

--------------

Mouse Record
==============

**A cheap, modular, behavior recording program**

.. figure:: Mouserecord_logo.jpg
   :alt: Mouserecord\_logo.jpg


Purpose
=======

The program's is designed to record rodent behavior at specific
intervals of time, based on the initiation of a trigger event (e.g., the
press of a lever).

Installation
============

Installation requires setuptools_; install
using the following command (may require ``sudo``):

::

    python setup.py install

Testing
=======

Test the program using the following command:

::

    python setup.py test

Documentation
=============

Documentation can be built from source on any platform easily. Just run the
following command.

::

    python setup.py build_sphinx

This will generate HTML documentation, which can be open using this file
``build/sphinx/html/index.html`` in the current directory.

For more build options, simply run the following command.

::

    python setup.py build_sphinx --help

Other build targets can be specified using the ``-b`` or ``--builder`` option.
Beyond the standard options that Sphinx provides, we add the `pdf` option.

Cleaning
========

To clean up the directory after building, one can use the ``clean`` option.
This will eliminate all intermediates build products. The syntax is shown
below.

::

    python setup.py clean

If this is not sufficient, and one wishes to eliminate the final products this
can be done with the flag ``-a`` or ``--all``. This adjustment to the syntax is
shown below.

::

    python setup.py clean --all

Usage
=====

Picture Usage
-------------

Execution of the program consists of the program name and a single
argument, the directory in which the picture is to be saved into.
If a directory is not specified, the current directory will be
assumed.

::

    mouse-picture ~/Destkop

Preview Usage
-------------

Execution of the program consists of the program name and a single
argument: the time desired length of the camera preview (in seconds).
If the time is not specified, this will default to 15 seconds.
Additionally, the user can exit at any time by entering ``Ctrl + c``

::

    mouse-preview 60

Record Usage
--------------

Execution of the program consists of the program name and respectve
arguments: time to record before trigger event (in seconds), time to
record after (in seconds), and directory of the file to be saved into.
If a directory is not specified, the current directory will be
assumed. An example is shown below:

::

    sudo mouse-record 2 2 /home/pi/Desktop

Also, as mentioned before, the program will end when a ``Ctrl + c`` is
entered into the terminal.

.. _setuptools: https://pypi.python.org/pypi/setuptools

.. |Code Health| image:: https://landscape.io/github/DudLab/mouse_record/master/landscape.svg?style=flat
   :target: https://landscape.io/github/DudLab/mouse_record/master
