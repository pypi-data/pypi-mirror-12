.. -*- mode: rst; coding: utf-8 -*-

==========
mekk.fics
==========

``mekk.fics`` is a Python access library for FICS (freechess.org).
It can be used to write FICS bots and clients in Python.

Status
======

The code works but is not finished.

Core functionality (handling FICS connections, command management etc)
works and is rather stable (it was extracted from WatchBot code and
only slightly modified).

Parsing routines (converting various FICS notifications and replies
to commands) are implemented only for some commands and notifications.
New parsers are mostly added on demand, whenever some new command or
information turns out to be useful.

Main APIs should be stable, data structures can be modified from time to time.

Examples and documentation
==========================

In case you are not familiar with FICS programming, take a look
at the articles published at
  http://blog.mekk.waw.pl/series/how_to_write_fics_bot/index.html
which introduce to the topic. 

For mekk.fics, there are a few examples in the
`sample` subdirectory: 
  https://bitbucket.org/Mekk/mekk.fics/src/tip/sample

All important classes and methods have docstrings.

Development
===========

The code is tracked using Mercurial. Repository can be found on
http://bitbucket.org/Mekk/mekk.fics

Use the same place to report bugs, suggest improvements and offer
patches.

License
=======

mekk.fics is dual-licensed under Artistic License 2.0 and Mozilla Public
License 1.1. The complete license texts can be found in Artistic-2.0.txt
and MPL-1.1.txt.
