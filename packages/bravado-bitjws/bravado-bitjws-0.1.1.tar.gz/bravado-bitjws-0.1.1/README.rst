bravado-bitjws |Build Status| |Coverage Status| |Gitter|
========================================================

Bravado-bitjws is an add on for
`Bravado <https://github.com/Yelp/bravado>`__ that allows
`bitjws <https://github.com/g-p-g/bitjws>`__ authentication.

Installation
------------

At the moment, installing from source is the only supported method.

``python setup.py install``

Usage
-----

Bravado-bitjws is used just like Bravado. The primary difference users
need to be aware of is the management of bitjws keys.

Create a client with existing keys
''''''''''''''''''''''''''''''''''

.. code:: Python

    # Your bitjws private key in WIF
    privkey = "KweY4PozGhtkGPMvvD7vk7nLiN6211XZ2QGxLBMginAQW7MBbgp8"

    # the URL of the swagger spec
    url = "http://0.0.0.0:8002/static/swagger.json"

    # initialize your client
    client = BitJWSSwaggerClient.from_url(url, privkey=privkey)

If no key is provided to BitJWSSwaggerClient, one will be generated.
However the private key originated, it is important to store private key
somewhere secure.

Known Limitations
-----------------

Currently there is no management of server keys. This means that
Bravado-bitjws checks the signature of server responses, but trusts all
keys. It is up to the Bravado-bitjws user to match the server's key
against a trusted list.

.. |Build Status| image:: https://travis-ci.org/deginner/bravado-bitjws.svg?branch=master
   :target: https://travis-ci.org/deginner/bravado-bitjws
.. |Coverage Status| image:: https://coveralls.io/repos/deginner/bravado-bitjws/badge.svg?branch=master&service=github
   :target: https://coveralls.io/github/deginner/bravado-bitjws?branch=master
.. |Gitter| image:: https://badges.gitter.im/Join%20Chat.svg
   :target: https://gitter.im/deginner/bitjws?utm_source=share-link&utm_medium=link&utm_campaign=share-link
