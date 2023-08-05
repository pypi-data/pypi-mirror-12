Bonsai
======

This is a module for handling LDAP operations in Python. Uses libldap2 on Unix platforms and WinLDAP 
on Microsoft Windows. LDAP entries are mapped to a special Python case-insensitive dictionary,
tracking the changes of the dictionary to modify the entry on the server easily.

Support only Python 3.3 or newer, and LDAPv3. 

Requirements for building
-------------------------

- python3.3-dev or newer
- libldap2-dev
- libsasl2-dev


Features
--------

* Uses LDAP libraries (OpenLDAP and WinLDAP) written in C for faster processing.
* Simple pythonic design.
* Implements an own dictionary-like object for mapping LDAP entries that makes easier to add and modify them.
* Works with various asynchronous library (like asyncio, gevent).

Example
-------

```python

    import bonsai

    client = bonsai.LDAPClient("ldap://localhost")
    client.set_credentials("SIMPLE", ("cn=admin,dc=local", "secret"))
    conn = client.connect()
    res = conn.search("ou=nerdherd,dc=local", 2, "(cn=chuck)")
    res[0]['givenname'] = "Charles"
    res[0]['sn'] = "Carmichael"
    res[0].modify()

```

Documentation
-------------

Documentation is available [online](http://bonsai.readthedocs.org/en/latest/) with a simple tutorial.

Changelog
---------

Currently, you can read the changelog [here](https://github.com/noirello/bonsai/blob/master/CHANGELOG). 

Contribution
------------

Any contributions and advices are welcome. Please report any issues at the [GitHub page](https://github.com/Noirello/bonsai/issues).
