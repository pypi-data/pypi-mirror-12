API documentation
=================

.. automodule:: bonsai

:class:`LDAPClient`
-------------------
.. autoclass:: LDAPClient
.. automethod:: LDAPClient.connect
.. automethod:: LDAPClient.get_rootDSE

   An example of getting the root DSE:
    
   >>> client = bonsai.LDAPClient()
   >>> client.get_rootDSE()
   {'namingContexts': ['dc=local'], 'supportedControl': ['2.16.840.1.113730.3.4.18', 
   '2.16.840.1.113730.3.4.2', '1.3.6.1.4.1.4203.1.10.1', '1.2.840.113556.1.4.319', 
   '1.2.826.0.1.3344810.2.3', '1.3.6.1.1.13.2', '1.3.6.1.1.13.1', '1.3.6.1.1.12'], 
   'supportedLDAPVersion': ['3'], 'supportedExtension': ['1.3.6.1.4.1.1466.20037',
   '1.3.6.1.4.1.4203.1.11.1', '1.3.6.1.4.1.4203.1.11.3', '1.3.6.1.1.8'], 
   'supportedSASLMechanisms': ['DIGEST-MD5', 'NTLM', 'CRAM-MD5']}

.. automethod:: LDAPClient.set_credentials
    
   >>> from bonsai import LDAPClient
   >>> client = LDAPClient()
   >>> client.set_credentials("SIMPLE", ("cn=user,dc=local", "secret")) 
   >>> client.connect()
   <bonsai.LDAPConnection object at 0x7fadf8976440>
   >>> client.set_credentials("DIGEST-MD5", ("user", "secret", None, None)) 
   >>> client.connect()
   <bonsai.LDAPConnection object at 0x7fadf892d3a0>

.. automethod:: LDAPClient.set_cert_policy
.. automethod:: LDAPClient.set_ca_cert
.. automethod:: LDAPClient.set_ca_cert_dir
.. automethod:: LDAPClient.set_client_cert
.. automethod:: LDAPClient.set_client_key
.. automethod:: LDAPClient.set_async_connection_class

   An example to change the default async cconnection class to a Gevent-based one:

   >>> import bonsai
   >>> from bonsai.gevent import GeventLDAPConnection
   >>> client = bonsai.LDAPClient()
   >>> client.set_async_connection_class(GeventLDAPConnection)
   >>> client.connect(True)
   <bonsai.gevent.geventconnection.GeventLDAPConnection object at 0x7f9b1789c6d8>

.. automethod:: LDAPClient.set_raw_attributes

   An example:
    
   >>> client = bonsai.LDAPClient()
   >>> client.set_raw_attributes(["cn", "sn"])
   >>> conn = client.connect()
   >>> conn.search("cn=jeff,ou=nerdherd,dc=local", 0, attrlist=['cn', 'sn', 'gn'])
   [{'givenName': ['Jeff'], 'sn': [b'Barnes'], 'cn': [b'jeff']}]

.. autoattribute:: LDAPClient.cert_policy
.. autoattribute:: LDAPClient.ca_cert
.. autoattribute:: LDAPClient.ca_cert_dir
.. autoattribute:: LDAPClient.client_cert
.. autoattribute:: LDAPClient.client_key
.. autoattribute:: LDAPClient.credentials
.. autoattribute:: LDAPClient.mechanism
.. autoattribute:: LDAPClient.raw_attributes
.. autoattribute:: LDAPClient.tls
.. autoattribute:: LDAPClient.url


:class:`LDAPConnection`
-----------------------
.. autoclass:: LDAPConnection
.. automethod:: LDAPConnection.add

.. method:: LDAPConnection.close()

   Close LDAP connection.
    
.. automethod:: LDAPConnection.delete

.. automethod:: LDAPConnection.open

.. method:: LDAPConnection.search(base=None, scope=None, filter=None, attrlist=[], timeout=None, sizelimit=0, attrsonly=False)

   :param str base: the base DN of the search.
   :param int scope: the scope of the search.
   :param str filter: string to filter the search in LDAP search filter syntax. 
   :param list attrlist: list of attribute's names to receive only those 
                         attributes from the directory server.
   :param float timeout: time limit in seconds for the search.
   :param int sizelimit: the number of entries to limit the search.
   :param bool attrsonly: if it's set True, search result will contain only 
                          the name of the attributes without their values.
   :return: the search result.
   :rtype: list or iterator.
   
   Perform a search on the directory server. A base DN and a search scope is always necessary to perform a 
   search, but these values - along with the attribute's list and search filter - can also be set with the 
   :class:`LDAPClient` LDAP URL parameter. The parameters, which are passed to the :meth:`LDAPConnection.search`
   method will overrule the previously set ones with the LDAP URL. 
   
   >>> from bonsai import LDAPClient
   >>> client = LDAPClient("ldap://localhost") # without additional parameters
   >>> conn = client.connect()
   >>> conn.search("ou=nerdherd,dc=local", 1, "(cn=ch*)", ["cn", "sn", "gn"])
   [{'sn': ['Bartowski'], 'cn': ['chuck'], 'givenName': ['Chuck']}]
   >>> client = LDAPClient("ldap://localhost/ou=nerdherd,dc=local?cn,sn,gn?one?(cn=ch*)") # with addtional parameters
   >>> conn = client.connect()
   >>> conn.search()
   [{'sn': ['Bartowski'], 'cn': ['chuck'], 'givenName': ['Chuck']}]
   >>> conn.search(filter="(cn=j*)")
   [{'sn': ['Barnes'], 'cn': ['jeff'], 'givenName': ['Jeff']}]
   
   The behavior of the method will change, if a page size is set with the :meth:`LDAPConnection.set_page_size`. In
   this case the method will return an iterator instead of list. 

   >>> client = LDAPClient()
   >>> conn = client.connect()
   >>> conn.set_page_size(4)
   >>> res = conn.search("ou=nerdherd,dc=local", 1, attrlist=["cn", "sn", "gn"])
   >>> res
   <bonsai.LDAPSearchIter object at 0x7f2e5714b190>
   >>> [entry for entry in res]
   [{'sn': ['Bartowski'], 'cn': ['chuck'], 'givenName': ['Chuck']}, {'sn': ['Patel'], 
   'cn': ['lester'], 'givenName': ['Laster']}, {'sn': ['Barnes'], 'cn': ['jeff'], 
   'givenName': ['Jeff']}, {'sn': ['Wu'], 'cn': ['anna'], 'givenName': ['Anna']}, 
   {'sn': ['Agent'], 'cn': ['greta'], 'givenName': ['Greta']}]
   
.. method:: LDAPConnection.set_page_size(page_size)

   :param int page_size: the number of entries on one page.

   :raises ValueError: if the parameter is not an integer, or lesser than 2.

   Set how many entry will be on a page of a search result. Setting the
   page size will affect the search to use LDAP paged results.
   :meth:`LDAPConnection.search` will return an iterator instead of a
   list of entries.

.. automethod:: LDAPConnection.whoami
.. seealso::
    RFC about the LDAP Who am I extended operation `RFC4532`_.
    
.. _RFC4532: https://tools.ietf.org/html/rfc4532


:class:`LDAPDN`
---------------
Class for representing LDAP distinguished names.
 
.. seealso:: 
    
    RFC about **LDAP: String Representation of Distinguished Names** `RFC4514`_.

.. _RFC4514: https://tools.ietf.org/html/rfc4514

Example for working with LDAPDN objects.

    >>> import bonsai
    >>> dn = bonsai.LDAPDN("cn=testuser,dc=local")
    >>> dn
    <LDAPDN cn=testuser,dc=local>
    >>> dn.rdns # Get RDNs in tuple format.
    ((('cn', 'testuser'),), (('dc', 'local'),))
    >>> str(dn) # Convert to string.
    'cn=testuser,dc=local'
    >>> dn[1] # Get the second RDN.
    'dc=local'
    >>> dn[0] # Get the first RDN.
    'cn=testuser'
    >>> dn[1] = "ou=nerdherd,dc=local" # Change the second RDN.
    >>> dn
    <LDAPDN cn=testuser,ou=nerdherd,dc=local>
    >>> other_dn = bonsai.LDAPDN("cn=testuser,ou=nerdherd,dc=local")
    >>> dn == other_dn
    True
    >>> dn[1:3] # Get the second and third RDN.
    'ou=nerdherd,dc=local'
    >>> dn[1:3] = 'ou=buymore,dc=local' # Change them.
    >>> dn
    <LDAPDN cn=testuser,ou=buymore,dc=local>

.. autoclass:: LDAPDN
.. automethod:: LDAPDN.__getitem__
.. automethod:: LDAPDN.__setitem__
.. automethod:: LDAPDN.__eq__
.. automethod:: LDAPDN.__str__
.. autoattribute:: LDAPDN.rdns

:class:`LDAPEntry`
------------------
.. class:: LDAPEntry(dn[, conn])
.. attribute:: LDAPEntry.connection

    The LDAPConnection object of the entry. Needs to be set for any LDAP operations.

.. attribute:: LDAPEntry.dn

    The distinguished name of the entry.
    
    >>> from bonsai import LDAPEntry
    >>> anna = LDAPEntry('cn=anna,ou=nerdherd,dc=local')
    >>> anna.dn
    <LDAPDN cn=anna,ou=nerdherd,dc=local>
    >>> str(anna.dn)
    'cn=anna,ou=nerdherd,dc=local' 

.. automethod:: LDAPEntry.delete
.. automethod:: LDAPEntry.modify
.. automethod:: LDAPEntry.rename
.. automethod:: LDAPEntry.update

:class:`LDAPURL`
----------------
.. seealso:: 
    
    RFC about **LDAP: Uniform Resource Locator** `RFC4516`_.

.. _RFC4516: http://tools.ietf.org/html/rfc4516

.. autoclass:: LDAPURL

    An example of a valid LDAP URL with port number, base DN, list of 
    attributes and search filter:
    
    >>> from bonsai import LDAPURL
    >>> url = LDAPURL("ldap://localhost:789/ou=nerdherd,dc=local?cn,sn,gn?sub?(cn=c*)")
    >>> url
    <LDAPURL ldap://localhost:789/ou=nerdherd,dc=local?cn,sn,gn?sub?(cn=c*)>
    >>> url.basedn
    <LDAPDN ou=nerdherd,dc=local>
    >>> url.attributes
    ['cn', 'sn', 'gn']

.. automethod:: LDAPURL.get_address

   >>> import bonsai
   >>> url = bonsai.LDAPURL("ldaps://example.com/cn=test,dc=local??sub")
   >>> url
   <LDAPURL ldaps://example.com:636/cn=test,dc=local??sub>
   >>> url.get_address()
   'ldaps://example.com:636'

.. automethod:: LDAPURL.__str__
.. autoattribute:: LDAPURL.attributes
.. autoattribute:: LDAPURL.basedn
.. autoattribute:: LDAPURL.host
.. autoattribute:: LDAPURL.port
.. autoattribute:: LDAPURL.filter
.. autoattribute:: LDAPURL.scope
.. autoattribute:: LDAPURL.scope_num
.. autoattribute:: LDAPURL.scheme

Errors
------
.. autoclass:: bonsai.LDAPError
.. autoclass:: bonsai.AlreadyExists
.. autoclass:: bonsai.AuthenticationError
.. autoclass:: bonsai.AuthMethodNotSupported
.. autoclass:: bonsai.ConnectionError
.. autoclass:: bonsai.ClosedConnection
.. autoclass:: bonsai.InsufficientAccess
.. autoclass:: bonsai.InvalidDN
.. autoclass:: bonsai.InvalidMessageID
.. autoclass:: bonsai.ObjectClassViolation
.. autoclass:: bonsai.TimeoutError
