/*
 * ldap-xplat.h
 *
 *  Created on: 12 Jun 2015
 *      Author: noirello
 */

#ifndef PYLDAP_LDAP_XPLAT_H_
#define PYLDAP_LDAP_XPLAT_H_

#include <Python.h>


#if defined(WIN32) || defined(_WIN32) || defined(__WIN32__)
//MS Windows

#include <WinSock2.h>

#include "wldap-utf8.h"

#define XTHREAD HANDLE

#else
//Unix
#include <ldap.h>
#include <lber.h>
#include <sasl/sasl.h>
#include <sys/time.h>
#include <pthread.h>
#include <sys/socket.h>

#define SOCKET int
#define XTHREAD pthread_t

int sasl_interact(LDAP *ld, unsigned flags, void *defaults, void *in);
char *_ldap_get_opt_errormsg(LDAP *ld);
#endif

typedef struct ldap_conndata_s {
	char *binddn;
	char *mech;
	char *realm;
	char *authcid;
	char *passwd;
	char *authzid;
#if defined(WIN32) || defined(_WIN32) || defined(__WIN32__)
	/* For the Windows's thread. */
	LDAP *ld;
	HANDLE thread;
	SOCKET sock;
#else
	char **resps;
	int nresps;
	const char *rmech;
#endif
} ldap_conndata_t;

typedef struct ldap_thread_data_s {
	LDAP *ld;
	char *url;
	int tls;
	int cert_policy;
	char *ca_cert_dir;
	char *ca_cert;
	char *client_cert;
	char *client_key;
	int retval;
	SOCKET sock;
#if defined(WIN32) || defined(_WIN32) || defined(__WIN32__)
#else
	/* For the POSIX's thread. */
	pthread_mutex_t *mux;
	int flag;
#endif
} ldapInitThreadData;

typedef struct ldap_timeout_thread_data_s {
	XTHREAD thread;
	struct timeval *timeout;
} ldapTimeoutThreadData;

int _ldap_finish_init_thread(char async, XTHREAD thread, int *timeout, void *misc, LDAP **ld);
int _ldap_bind(LDAP *ld, ldap_conndata_t *info, LDAPMessage *result, int *msgid);

XTHREAD create_init_thread(void *param, int *error);
ldapInitThreadData *get_init_thread_data(PyObject *client, SOCKET sock);
void *create_conn_info(char *mech, SOCKET sock, PyObject *creds);
void dealloc_conn_info(ldap_conndata_t* info);

#endif /* PYLDAP_LDAP_XPLAT_H_ */
