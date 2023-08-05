Websourcebrowser
================

Introduction
------------

Websourcebrowser_ makes it easy to visually scan trees of source code.
In particular, you can view the directory tree and the source code of
a file side by side, so you can quickly change to a different file.

Some features of Websourcebrowser:

- Platform-independent, any web browser with JavaScript support can
  be used to view the source code.

- Includes a small webserver, so the source code and the browser to
  view it can be on different computers.

- By default, they are on the same computer. :-)

- If Pygments_ is installed on the server side, which may be the local
  computer, source code is automatically highlighted.

- If CherryPy_ is installed, it's used as the server infrastructure.

- Image files supported by the browser are displayed.

- Uncompressed and compressed (gzip, bzip2) tar files are shown as a
  list of the contained directories and files.

- Binary files are displayed as hexdumps.

- Written in portable Python_ .

You can use Websourcebrowser by starting the script
``wsbrowser`` and pointing your web browser to the address
``http://localhost:8000/``. 

Go to the Websourcebrowser_ website to see screenshots.

.. _Websourcebrowser: http://websourcebrowser.sschwarzer.net
.. _Pygments: http://pygments.org
.. _CherryPy: http://cherrypy.org
.. _Python: http://www.python.org

Documentation
-------------

There's not much documentation for Websourcebrowser yet. However, once
you started the program and typed the displayed URL into the address
line of a web browser, the program should be easy to use after
experimenting a bit with it.

To get help for the command line options, invoke the installed program
with the ``help`` option::

    $ wsbrowser --help

where ``$`` is a shell prompt. Probably, the most useful options are
``--root`` and ``--line-numbers``. Ignore patterns given via the
command line option ``--ignore-pattern`` are *added* to those from the
environment variable ``WSB_IGNORE``. (Note that you can't use a
whitespace-separated list with ``--ignore-pattern`` but instead use
the option multiple times.)

There's an environment variable which influences Websourcebrowser.
``WSB_IGNORE`` can contain a whitespace-separated list of wildcards
which are used as ignore patterns. *My* list is usually::

    *.pyc  *.pyo  */.svn  *.svn/*  */.hg  */.hg/*  *.swp

which ignores Python bytecode files, version control files from
Subversion_ and Mercurial_, and Vim_ swap files.

.. _Subversion: http://subversion.tigris.org
.. _Mercurial: http://www.selenic.com/mercurial
.. _Vim: http://www.vim.org

Prerequisites
-------------

Websourcebrowser requires only Python_, version 2.5 or later. It's
recommended though not strictly necessary to also install Pygments_
to get syntax highlighting.

Using Websourcebrowser without installation
-------------------------------------------

Though it's recommended, you don't *have to* install Websourcebrowser.
Instead you can get away with extracting the source archive (see
below) and adding the extracted directory to the ``PYTHONPATH``
environment variable. For example, if the directory is
``/home/me/downloads/websourcebrowser-0.2``, add that to
``PYTHONPATH``.

Installation
------------

You install Websourcebrowser like most Python packages.

- *If you have an older version of Websourcebrowser installed, delete
  it or move it somewhere else, so that it doesn't conflict with the
  new version!*

- Extract the downloaded archive. Under Unix/Linux, you usually do
  this from the shell prompt::

    $ tar xzf websourcebrowser-0.1.tar.gz

- Change to the directory::

    $ cd websourcebrowser-0.1

- Become root::

    $ su -

  The shell prompt changes to ``#``.

- To install Websourcebrowser system-wide, type::
    
    # python setup.py install

  Otherwise, consult the `distutils documentation`_ on how to install
  Python packages into another directory.

.. _`distutils documentation`: http://docs.python.org/inst/alt-install-windows.html

License
-------

Websourcebrowser is Open Source Software, distributed under the
MIT license.

Author
------

The author of Websourcebrowser is Stefan Schwarzer
<sschwarzer@sschwarzer.net> . I'm thankful for feedback! :-)

