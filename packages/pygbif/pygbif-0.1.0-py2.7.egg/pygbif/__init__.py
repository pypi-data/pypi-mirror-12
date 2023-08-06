# -*- coding: utf-8 -*-

# pygbif

'''
pygbif library
~~~~~~~~~~~~~~~~~~~~~

pygbif is a Python client for GBIF. Example usage:

>>> # Import entire library
>>> import pygbif
>>> # or import modules as needed
>>> ## occurrences
>>> from pygbif import occurrences
>>> ## species
>>> from pygbif import species
>>> ## registry
>>> from pygbif import registry
>>>
>>> ## use advanced logging
>>> ### setup first
>>> import requests
>>> import logging
>>> import httplib as http_client
>>> http_client.HTTPConnection.debuglevel = 1
>>> logging.basicConfig()
>>> logging.getLogger().setLevel(logging.DEBUG)
>>> requests_log = logging.getLogger("requests.packages.urllib3")
>>> requests_log.setLevel(logging.DEBUG)
>>> requests_log.propagate = True
>>> ### then make request
>>> from pygbif import occurrences
>>> occurrences.search(geometry='POLYGON((30.1 10.1, 10 20, 20 40, 40 40, 30.1 10.1))', limit=20)
'''

from .occurrences import search, get, count
from .species import names
from .registry import datasets, nodes
from .gbifissues import occ_issues_lookup
