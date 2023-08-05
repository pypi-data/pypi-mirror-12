#ifndef LDAPCONNECTION_H_
#define LDAPCONNECTION_H_

#include <Python.h>
#include "structmember.h"

#include "ldap-xplat.h"

typedef struct {
	PyObject_HEAD
	PyObject *client;
	PyObject *pending_ops;
	LDAP *ld;
	int page_size;
	char closed;
	char async;
	LDAPSortKey **sort_list;
	SOCKET csock;
	PyObject *socketpair;
} LDAPConnection;

extern PyTypeObject LDAPConnectionType;

int LDAPConnection_IsClosed(LDAPConnection *self);
int LDAPConnection_DelEntryStringDN(LDAPConnection *self, char *dnstr);
int LDAPConnection_Searching(LDAPConnection *self, PyObject *iterator);

#endif /* LDAPCONNECTION_H_ */
