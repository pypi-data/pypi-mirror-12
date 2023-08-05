__version__ = '0.8.7'

"""
*******
ACD API
*******

Node JSON Format
================

This is the usual node JSON format for a file::
    {
           'contentProperties': {'contentType': 'text/plain',
                                 'extension': 'txt',
                                 'md5': 'd41d8cd98f00b204e9800998ecf8427e',
                                 'size': 0,
                                 'version': 1},
           'createdBy': '<security-profile-nm>-<user>',
           'createdDate': '2015-01-01T00:00:00.00Z',
           'description': '',
           'eTagResponse': 'AbCdEfGhI01',
           'id': 'AbCdEfGhIjKlMnOpQr0123',
           'isShared': False,
           'kind': 'FILE',
           'labels': [],
           'modifiedDate': '2015-01-01T00:00:00.000Z',
           'name': 'empty.txt',
           'parents': ['0123AbCdEfGhIjKlMnOpQr'],
           'restricted': False,
           'status': 'AVAILABLE',
           'version': 1
    }

The ``modifiedDate`` and ``version`` keys get updated each time the content or metadata is updated.
``contentProperties['version']`` gets updated on overwrite.

A folder's JSON looks similar, but it lacks the ``contentProperties`` dictionary.

CAUTION: ACD allows hard links for folders!

"""
