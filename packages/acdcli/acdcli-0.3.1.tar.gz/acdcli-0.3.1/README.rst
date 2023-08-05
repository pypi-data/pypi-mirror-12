|Donate| |Gitter| |PyVersion| |Status| |License| |Build| |PyPiVersion|

acd\_cli
========

**acd\_cli** provides a command line interface to Amazon Cloud Drive and allows mounting your
cloud drive using FUSE for read and write access. It is currently in beta stage.

Node Cache Features
-------------------

- caching of local node metadata in an SQLite database
- addressing of remote nodes via a pathname (e.g. ``/Photos/kitten.jpg``)
- file search

CLI Features
------------

- tree or flat listing of files and folders
- simultaneous uploads/downloads, retry on error
- basic plugin support

File Operations
~~~~~~~~~~~~~~~

- upload/download of single files and directories
- streamed upload/download
- folder creation
- trashing/restoring
- moving/renaming nodes

Documentation
-------------

The full documentation is available at `<https://acd-cli.readthedocs.org>`_.

Quick Start
-----------

Have a look at the `known issues`_, then follow the `setup guide <docs/setup.rst>`_ and
`authorize <docs/authorization.rst>`_. You may then use the program as described in the
`usage guide <docs/usage.rst>`_.

CLI Usage Example
-----------------

In this example, a two-level folder hierarchy is created in an empty cloud drive.
Then, a relative local path ``local/spam`` is uploaded recursively using two connections.
::

    $ acd_cli sync
      Syncing...
      Done.

    $ acd_cli ls /
      [PHwiEv53QOKoGFGqYNl8pw] [A] /

    $ acd_cli mkdir /egg/
    $ acd_cli mkdir /egg/bacon/

    $ acd_cli upload -x 2 local/spam/ /egg/bacon/
      [################################]   100.0% of  100MiB  12/12  654.4KB/s

    $ acd_cli tree
      /
          egg/
              bacon/
                  spam/
                      sausage
                      spam
      [...]


The standard node listing format includes the node ID, the first letter of its status
and its full path. Possible statuses are "AVAILABLE" and "TRASH".

Known Issues
------------

It is not possible to upload files using Python 3.2.3, 3.3.0 and 3.3.1 due to a bug in
the http.client module.

If you encounter Unicode problems, check that your locale is set correctly or use the ``--utf``
argument to force the script to use UTF-8 output encoding.
Windows users may try to execute the provided reg file (assets/win_codepage.reg),
tested with Windows 8.1, to set the command line interface encoding to cp65001.

API Restrictions
~~~~~~~~~~~~~~~~

- the current upload file size limit is 50GiB
- uploads of large files >10 GiB may be successful, yet a timeout error is displayed
  (please check the upload by syncing manually)
- storage of node names is case-preserving, but not case-sensitive
  (this should not concern Apple users)
- it is not possible to share or delete files

Contribute
----------

Have a look at the `contributing guidelines <CONTRIBUTING.rst>`_.

Recent Changes
--------------

0.3.1
~~~~~

* general improvements for FUSE
* FUSE write support added
* added automatic logging
* sphinx documentation added

0.3.0
~~~~~

* FUSE read support added

0.2.2
~~~~~

* sync speed-up
* node listing format changed
* optional node listing coloring added (for Linux or via LS_COLORS)
* re-added possibility for local OAuth

0.2.1
~~~~~

* curl dependency removed
* added job queue, simultaneous transfers
* retry on error

0.2.0
~~~~~
* setuptools support
* workaround for download of files larger than 10 GiB
* automatic resuming of downloads


.. |Donate| image:: https://img.shields.io/badge/paypal-donate-blue.svg
   :alt: Donate via PayPal
   :target: https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=V4V4HVSAH4VW8

.. |Gitter| image:: https://img.shields.io/badge/GITTER-join%20chat-brightgreen.svg
   :alt: Join the Gitter chat
   :target: https://gitter.im/yadayada/acd_cli

.. |PyPiVersion| image:: https://img.shields.io/pypi/v/acdcli.svg
   :alt: PyPi
   :target: https://pypi.python.org/pypi/acdcli

.. |PyVersion| image:: https://img.shields.io/badge/python-3.2+-blue.svg
   :alt:

.. |Status| image:: https://img.shields.io/badge/status-beta-yellow.svg
   :alt:

.. |License| image:: https://img.shields.io/badge/license-GPLv2+-blue.svg
   :alt:

.. |Build| image:: https://img.shields.io/travis/yadayada/acd_cli.svg
   :alt:
   :target: https://travis-ci.org/yadayada/acd_cli
