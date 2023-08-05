.. -*- mode: rst -*-

====================================
Mercurial Extension Utils
====================================

This module contains group of reusable functions, which I found useful
while writing Mercurial extensions.

For Mercurial users
===========================

This module is of no direct use to you, but some extensions you may
wish to use (for example `dynamic_username`_ or `path_pattern`_) need
it to work.

In normal cases it should be installed automatically by commands like
``pip install mercurial_dynamic_username``, without requiring your
attention.

If something went wrong, or you install those extensions manually,
install this module using one of the following methods:

1. ::

    pip install mercurial_extension_utils

2. Clone (or download) this repository and::

    python setup.py install

3. Download file ``mercurial_extension_utils.py`` from this repository
   and save it anywhere in Python search path.

For Mercurial extensions developers
====================================

Contained functions are mostly tiny utilities related to configuration
processing or location matching. They either extend Mercurial APIs a
bit (like function to iterate config items which match regexp), or
support tasks which aren't strictly Mercurial related, but happen
repeatably during extension writing (like matching repository root
against set of paths defined in configuration).

See docstrings for details.

History
==================================================

See `HISTORY.txt`_

Development, bug reports, enhancement suggestions
===================================================

Development is tracked on BitBucket, see 
http://bitbucket.org/Mekk/mercurial-extension_utils/

Use BitBucket issue tracker for bug reports and enhancement
suggestions.

.. _Mercurial: http://mercurial.selenic.com
.. _dynamic_username: http://bitbucket.org/Mekk/mercurial-dynamic_username/
.. _path_pattern: http://bitbucket.org/Mekk/mercurial-path_pattern/
.. _HISTORY.txt: http://bitbucket.org/Mekk/mercurial-extension_utils/src/tip/HISTORY.txt

