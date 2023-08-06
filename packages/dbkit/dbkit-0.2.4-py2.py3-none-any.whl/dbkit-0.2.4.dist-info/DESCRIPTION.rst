.. image:: https://secure.travis-ci.org/kgaughan/dbkit.png?branch=master
   :target: http://travis-ci.org/kgaughan/dbkit

.. image:: https://pypip.in/v/dbkit/badge.png
   :target: https://pypi.python.org/pypi/dbkit/

**dbkit** is a library that abstracts away at least part of the pain
involved in dealing with `DB-API 2`_ compatible database drivers.

Here's an example::

    from dbkit import connect, query
    from contextlib import closing
    import sqlite3

    with connect(sqlite3, 'counters.db') as ctx, closing(ctx):
        for counter, value in query('SELECT counter, value FROM counters'):
            print "%s: %d" % (counter, value)

Overview
========

*dbkit* is intended to be used in circumstances where it is impractical
or overkill to use an ORM such as `SQLObject`_ or `SQLAlchemy`_, but it
would be useful to at least abstract away some of the pain involved in
dealing with the database.

Features:

- Rather than passing around database connections, statements are executed
  within a database `context`_, thus helping to decouple modules that
  interface with the database from the database itself and its connection
  details.
- Database contexts contain references to the exceptions exposed by the
  database driver, thus decoupling exception handling from the database
  driver.
- Easier to use transaction handling.
- Easier iteration over resultsets.
- Connection pooling. In addition, any code using pooled connections has
  no need to know connection pooling is in place.
- Query logging.

Non-aims:

-  Abstraction of SQL statements. The idea is to get rid of the more
   annoying but necessary boilerplate code involved in dealing with
   `DB-API 2`_ drivers, not to totally abstract away SQL itself.

Installation
============

*dbkit* can be installed with either either pip_ (recommended)::

    $ pip install dbkit

Or with easy_install_::

    $ easy_install dbkit

Development
===========

The repos can be found on `Github <https://github.com/kgaughan/dbkit>`_ while
the documentation can be found on `Read the Docs
<http://dbkit.readthedocs.org/>`_.

.. _DB-API 2: http://www.python.org/dev/peps/pep-0249/
.. _SQLObject: http://sqlobject.org/
.. _SQLAlchemy: http://sqlalchemy.org/
.. _context: http://docs.python.org/library/contextlib.html
.. _pip: http://www.pip-installer.org/
.. _easy_install: http://peak.telecommunity.com/DevCenter/EasyInstall


.. _changelog:

Change history
==============

.. _version-0.2.4:

0.2.4 (2015-11-30)
------------------

* Python 3 support.

.. _version-0.2.3:

0.2.3 (2015-11-26)
------------------

* `Context.cursor()` now always creates a transaction. The lack of this outer
  transaction meant that PostgreSQL would end up with a large number of idle
  transactions that had neither been committed or rolled back.

.. _version-0.2.2:

0.2.2 (2013-04-04)
------------------

* Scrap `unindent_statement()`.
* Derive all dbkit exceptions from `Exception`.
* Clean up connection pinging code.
* Add `make_placeholders()` for generating statement placeholders safely.
* Add `to_dict()` for converting resultsets to dicts mapped off of a
  particular field.

.. _version-0.2.0:

0.2.0 (2012-10-16)
------------------

* Add `last_row_id()`.
* Pools now can have custom mediators.
* Cursors are now tracked.
* Pooled connections are no longer closed prematurely.
* Row factories are now usable outside of context safely.

.. _version-0.1.4:

0.1.4 (2012-10-11)
------------------

* `execute*()` now returns the number of affected rows.
* Add `last_row_count` and `last_row_id` to `Context`.
* Remove `DummyPool` and `ThreadAffinePool`, though the latter may be
  returning.
* Stablise the behaviour of `Pool` when dealing with expired connections.
* Documentation version is now pegged directly to the library.

.. _version-0.1.2:

0.1.2 (2012-09-02)
------------------

* Initial revision with a changelog.

.. vim:set ft=rst:


