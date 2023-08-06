OSSLicenses
===========

A command line tool to view OSS licenses. Uses `github3.py`_ licenses API to retrieve from GitHub.

Example Usage:
--------------

Listing available license
~~~~~~~~~~~~~~~~~~~~~~~~~

.. code::

        $ osslicenses list

          Name                                     Key
        ---------------------------------------  ------------
        Apache License 2.0                       apache-2.0
        Artistic License 2.0                     artistic-2.0
        BSD 2-clause "Simplified" License        bsd-2-clause
        BSD 3-clause "New" or "Revised" License  bsd-3-clause
        Creative Commons Zero v1.0 Universal     cc0-1.0
        Eclipse Public License 1.0               epl-1.0
        GNU Affero General Public License v3.0   agpl-3.0
        GNU General Public License v2.0          gpl-2.0
        GNU General Public License v3.0          gpl-3.0
        GNU Lesser General Public License v2.1   lgpl-2.1
        GNU Lesser General Public License v3.0   lgpl-3.0
        ISC License                              isc
        MIT License                              mit
        Mozilla Public License 2.0               mpl-2.0
        The Unlicense                            unlicense

Getting a specific license
~~~~~~~~~~~~~~~~~~~~~~~~~~

.. code::

        $ osslicenses get mit

        The MIT License (MIT)

        Copyright (c) [year] [fullname]

        Permission is hereby granted, free of charge, to any person obtaining a copy
        of this software and associated documentation files (the "Software"), to deal
        in the Software without restriction, including without limitation the rights
        to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
        copies of the Software, and to permit persons to whom the Software is
        furnished to do so, subject to the following conditions:

        The above copyright notice and this permission notice shall be included in all
        copies or substantial portions of the Software.

        THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
        IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
        FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
        AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
        LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
        OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
        SOFTWARE.

        (oss-licenses)Matts-MacBook-Air:osslicenses mattchung$ 

.. _github3.py : https://github.com/sigmavirus24/github3.py
