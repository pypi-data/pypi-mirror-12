ascribe SPOOL API Python Wrapper
================================

.. image:: https://travis-ci.org/ascribe/ascribe-api-wrapper.svg
    :target: https://travis-ci.org/ascribe/ascribe-api-wrapper
.. image:: https://codecov.io/github/ascribe/ascribe-api-wrapper/coverage.svg?branch=master
    :target: https://codecov.io/github/ascribe/ascribe-api-wrapper?branch=master

`ascribe ownership REST API <http://docs.ascribe.apiary.io>`_ Python wrapper.


Installation
------------

.. code-block:: python

    pip install ascribe


Example: Registering a Piece
----------------------------

.. code-block:: python
    
    >>> from ascribe import AscribeWrapper
    >>> ascribe_wrapper = AscribeWrapper('your-token')
    >>> piece = {
        'file_url': 'https://s3.eu-central-1.amazonaws.com/bucket/img.jpg',
        'artist_name': 'mystery',
        'title': 'universe',
    }
    >>> ascribe_wrapper.create_piece(piece)
    {'piece': {
        'artist_name': 'mystery',
        'bitcoin_id': 'bitcoin-id',
        'date_created': '2015-01-01',
        'datetime_registered': '2015-11-28T20:42:19.917896Z',
        'license_type': {
            'code': 'default',
            'name': 'All rights reserved',
            'organization': 'ascribe',
            'url': 'https://www.ascribe.io/faq/#legals'
        },
        'title': 'universe',
        'user_registered': 'mystery'
        ...
        ...
    }}


Documentation
-------------

https://ascribe.readthedocs.org
