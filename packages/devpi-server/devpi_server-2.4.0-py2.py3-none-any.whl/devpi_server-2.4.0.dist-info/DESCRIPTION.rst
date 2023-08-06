devpi-server: consistent pypi.python.org cache, github-style internal indexes
=============================================================================

* `issue tracker <https://bitbucket.org/hpk42/devpi/issues>`_, `repo
  <https://bitbucket.org/hpk42/devpi>`_

* IRC: #devpi on freenode, `mailing list
  <https://groups.google.com/d/forum/devpi-dev>`_ 

* compatibility: {win,unix}-py{26,27,34}

consistent robust pypi-cache
----------------------------------------

You can point ``pip or easy_install`` to the ``root/pypi/+simple/``
index, serving as a self-updating transparent cache for pypi-hosted
**and** external packages.  Cache-invalidation uses the latest and
greatest PyPI protocols.  The cache index continues to serve when
offline and will resume cache-updates once network is available.

github-style indexes
---------------------------------

Each user can have multiple indexes and upload packages and docs via
standard ``setup.py`` invocations.  Users, indexes (and soon projects
and releases) are manipulaed through a RESTful HTTP API.

index inheritance
--------------------------

Each index can be configured to merge in other indexes so that it serves
both its uploads and all releases from other index(es).  For example, an
index using ``root/pypi`` as a parent is a good place to test out a
release candidate before you push it to PyPI.

good defaults and easy deployment
---------------------------------------

Get started easily and create a permanent devpi-server deployment
including pre-configured templates for ``nginx`` and cron. 

separate tool for Packaging/Testing activities
-------------------------------------------------------

The complimentary `devpi-client <http://pypi.python.org/devpi-client>`_ tool
helps to manage users, indexes, logins and typical setup.py-based upload and
installation workflows.

See http://doc.devpi.net for getting started and documentation.



Changelog
=========

2.4.0 (2015-11-11)
------------------

- NOTE: devpi-server-2.4 is compatible to data from devpi-server-2.3 but
  not the other way round.  Once you run devpi-server-2.4 you can not go
  back. It's always a good idea to make a backup before trying a new version :)

- NOTE: if you use "--logger-cfg" with .yaml files you will need to
  install pyyaml yourself as devpi-server-2.4 dropped it as a direct
  dependency as it does not install for win32/python3.5 and is 
  not needed for devpi-server operations except for logging configuration.
  Specifying a *.json file always works.

- add timeout to replica requests

- fix issue275: improve error message when a serverdir exists but has no
  version

- improve testing mechanics and name normalization related to storing doczips

- refine keyfs to provide lazy deep readonly-views for
  dict/set/list/tuple types by default.  This introduces safety because
  users (including plugins) of keyfs-values can only write/modify a value
  by explicitly getting it with readonly=False (thereby deep copying it)
  and setting it with the transaction.  It also allows to avoid unnecessary
  copy-operations when just reading values.

- fix issue283: pypi cache didn't work for replicas.

- performance improvements for simple pages with lots of releases.
  this also changed the db layout of the caching from pypi.python.org mirrors
  but will seamlessly work on older data, see NOTE at top.

- add "--profile-requests=NUM" option which turns on per-request
  profiling and will print out after NUM requests are executed
  and then restart profiling.

- fix tests for pypy. We officially support pypy now.


2.3.1 (2015-09-14)
------------------

- fix issue272: require devpi-common >= 2.0.6

- recognize newly registered PyPI projects, now that we don't watch the
  PyPI changelog anymore


2.3.0 (2015-09-10)
------------------

- switched to semantic versioning. Only major revisions will ever require an
  export/import cycle.

- fix issue260: Log identical upload message on level "info"

- Log upload trigger message on level "warn"

- The PyPI changelog isn't watched for changes anymore.
  Instead we cache release data for 30 minutes, this can be adjusted with the
  ``--mirror-cache-expiry`` option.

- fix issue251: Require and validate the "X-DEVPI-SERIAL" from master in
  replica thread

- fix issue258: fix FileReplicationError representation for proper logging

- fix issue256: if a project removes all releases from pypi or the project is
  deleted on pypi, we get a 404 back. In that case we now return an empty list
  of releases instead of returning an UpstreamError.

- Change nginx template to serve HEAD in addition to GET requests of files
  directly instead of proxying to devpi-server

- make keyfs cache size configurable via "--keyfs-cache-size" option and
  increase the default size to improve performance for installations with many
  writes


2.2.2 (2015-07-09)
------------------

- make replica thread more robust by catching more exceptions

- Remove duplicates in plugin version info

- track timestamps for event processing and replication and expose in /+status

- implement devpiweb_get_status_info hook for devpi-web >= 2.4.0 status messages

- UPGRADE NOTE: if devpi-web is installed, you have to request
  ``application/json`` for ``/+status``, or you might get a html page.

- address issue246: refuse uploading release files if they do not
  contain the version that was transferred with the metadata of
  the upload request.

- fix issue248: prevent change of index type after creation


2.2.1 (2015-05-20)
------------------

- fix issue237: fix wrong initial replica setup which would prevent
  initialization.  Thanks Stephan Erb.



