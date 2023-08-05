A simple pastbin built on TurboGears and Pygments.

General Information
-------------------

SpammCan is yet another pastbin web application. It distinguishes itself from
its competitors by the following features:

* Has syntax highlighting support for over 100 languages thanks to the use of
  Pygments_.

* Is easy to install thanks to setuptools_.

* Uses large, random GUIDs for paste entries in its URLs instead of sequential
  paste numbers to discourage spammers.

  Also detects and rejects spamming attempts with the help of a SpamBayes_
  filter.

* Is built on TurboGears_ 1.1, Genshi_, and SQLAlchemy_.

* Uses a SQLite database by default, but can use any database system supported
  by SQLAlchemy and TurboGears.


Getting the Code
----------------

You can run your own SpammCan server! For more information, downloads, and
source code, visit the project home page at

    http://chrisarndt.de/projects/spammcan

You can also install SpammCan via its Python Package Index (aka Cheeseshop_)
entry_::

    $ [sudo] easy_install SpammCan

Finally, if you want the latest development code for SpammCan, you can check it
out from the Subversion repository::

    $ svn co svn://chrisarndt.de/projects/SpammCan/trunk SpammCan


Copyright & License
-------------------

SpammCan is brought to you and copyrighted by **Christopher Arndt**. The
software is released under the `MIT License`_::

    The MIT License

    Copyright (c) 2008 Christopher Arndt

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to
    deal in the Software without restriction, including without limitation the
    rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
    sell copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in
    all copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
    FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
    IN THE SOFTWARE.

**Share & enjoy!**


Zope Public License
~~~~~~~~~~~~~~~~~~~

The included ``rest.py`` module is copyrighted (c) 2002 by the Zope Corporation
and contributors and used under the `Zope Public License 2.1`_::

    Zope Public License (ZPL) Version 2.1

    A copyright notice accompanies this license document that identifies the
    copyright holders.

    This license has been certified as open source. It has also been designated
    as GPL compatible by the Free Software Foundation (FSF).

    Redistribution and use in source and binary forms, with or without
    modification, are permitted provided that the following conditions are met:

       1. Redistributions in source code must retain the accompanying copyright
          notice, this list of conditions, and the following disclaimer.
       2. Redistributions in binary form must reproduce the accompanying
          copyright notice, this list of conditions, and the following
          disclaimer in the documentation and/or other materials provided with
          the distribution.
       3. Names of the copyright holders must not be used to endorse or promote
          products derived from this software without prior written permission
          from the copyright holders.
       4. The right to distribute this software or to use it for any purpose
          does not give you the right to use Servicemarks (sm) or Trademarks
          (tm) of the copyright holders. Use of them is covered by separate
          agreement with the copyright holders.
       5. If any files are modified, you must cause the modified files to carry
          prominent notices stating that you changed the files and the date of
          any change.

    Disclaimer

    THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS ``AS IS'' AND ANY
    EXPRESSED OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
    WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
    DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDERS BE LIABLE FOR ANY
    DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
    (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
    SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
    CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT
    LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
    OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH
    DAMAGE.

.. _cheeseshop: http://pypi.python.org/
.. _entry: http://pypi.python.org/pypi/SpammCan
.. _pygments: http://pygments.pocoo.org/
.. _turbogears: http://www.turbogears.org/
.. _setuptools: http://pypi.python.org/pypi/setuptools
.. _spambayes: http://spambayes.sourceforge.net/
.. _genshi: http://genshi.edgewall.org/
.. _sqlalchemy: http://sqlalchemy.org/
.. _mit license: http://www.opensource.org/licenses/mit-license.php
.. _zope public license 2.1: http://www.zope.org/Resources/ZPL
