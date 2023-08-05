// pkcs11.cpp : Defines the entry point for the DLL application.
//

#include "stdafx.h"

#ifdef _DEBUG

#undef _DEBUG
#include <Python.h>
#define _DEBUG

#else
#include <Python.h>
#endif

#include <cryptoki.h>
#include "pkcs11.h"

using namespace std;

PyObject *pkcs11_session_NEW(CK_SESSION_HANDLE sh, CK_FUNCTION_LIST_PTR pf, PyObject *po);

// include PKCS11 headers defining the functions

BOOL APIENTRY DllMain( HANDLE hModule, 
                       DWORD  ul_reason_for_call, 
                       LPVOID lpReserved
					 )
{
    switch (ul_reason_for_call)
	{
		case DLL_PROCESS_ATTACH:
		case DLL_THREAD_ATTACH:
		case DLL_THREAD_DETACH:
		case DLL_PROCESS_DETACH:
			break;
    }
    return TRUE;
}

// This convenience function returns the text error for the PKCS11 error number
string GetPKCS11Error(CK_RV errnum)
{
	switch (errnum)
	{
	case CKR_OK:
		return "CKR_OK";
	case CKR_CANCEL:
		return "CKR_CANCEL";
	case CKR_HOST_MEMORY:
		return "CKR_HOST_MEMORY";
	case CKR_SLOT_ID_INVALID:
		return "CKR_SLOT_ID_INVALID";
	case CKR_GENERAL_ERROR:
		return "CKR_GENERAL_ERROR";
	case CKR_FUNCTION_FAILED:
		return "CKR_FUNCTION_FAILED";
	case CKR_ARGUMENTS_BAD:
		return "CKR_ARGUMENTS_BAD";
	case CKR_NO_EVENT:
		return "CKR_NO_EVENT";
	case CKR_NEED_TO_CREATE_THREADS:
		return "CKR_NEED_TO_CREATE_THREADS";
	case CKR_CANT_LOCK:
		return "CKR_CANT_LOCK";
	case CKR_ATTRIBUTE_READ_ONLY:
		return "CKR_ATTRIBUTE_READ_ONLY";
	case CKR_ATTRIBUTE_SENSITIVE:
		return "CKR_ATTRIBUTE_SENSITIVE";
	case CKR_ATTRIBUTE_TYPE_INVALID:
		return "CKR_ATTRIBUTE_TYPE_INVALID";
	case CKR_ATTRIBUTE_VALUE_INVALID:
		return "CKR_ATTRIBUTE_VALUE_INVALID";
	case CKR_DATA_INVALID:
		return "CKR_DATA_INVALID";
	case CKR_DATA_LEN_RANGE:
		return "CKR_DATA_LEN_RANGE";
	case CKR_DEVICE_ERROR:
		return "CKR_DEVICE_ERROR";
	case CKR_DEVICE_MEMORY:
		return "CKR_DEVICE_MEMORY";
	case CKR_DEVICE_REMOVED:
		return "CKR_DEVICE_REMOVED";
	case CKR_ENCRYPTED_DATA_INVALID:
		return "CKR_ENCRYPTED_DATA_INVALID";
	case CKR_ENCRYPTED_DATA_LEN_RANGE:
		return "CKR_ENCRYPTED_DATA_LEN_RANGE";
	case CKR_FUNCTION_CANCELED:
		return "CKR_FUNCTION_CANCELED";
	case CKR_FUNCTION_NOT_PARALLEL:
		return "CKR_FUNCTION_NOT_PARALLEL";
	case CKR_FUNCTION_NOT_SUPPORTED:
		return "CKR_FUNCTION_NOT_SUPPORTED";
	case CKR_KEY_HANDLE_INVALID:
		return "CKR_KEY_HANDLE_INVALID";
	case CKR_KEY_SIZE_RANGE:
		return "CKR_KEY_SIZE_RANGE";
	case CKR_KEY_TYPE_INCONSISTENT:
		return "CKR_KEY_TYPE_INCONSISTENT";
	case CKR_KEY_NOT_NEEDED:
		return "CKR_KEY_NOT_NEEDED";
	case CKR_KEY_CHANGED:
		return "CKR_KEY_CHANGED";
	case CKR_KEY_NEEDED:
		return "CKR_KEY_NEEDED";
	case CKR_KEY_INDIGESTIBLE:
		return "CKR_KEY_INDIGESTIBLE";
	case CKR_KEY_FUNCTION_NOT_PERMITTED:
		return "CKR_KEY_FUNCTION_NOT_PERMITTED";
	case CKR_KEY_NOT_WRAPPABLE:
		return "CKR_KEY_NOT_WRAPPABLE";
	case CKR_KEY_UNEXTRACTABLE:
		return "CKR_KEY_UNEXTRACTABLE";
	case CKR_MECHANISM_INVALID:
		return "CKR_MECHANISM_INVALID";
	case CKR_MECHANISM_PARAM_INVALID:
		return "CKR_MECHANISM_PARAM_INVALID";
	case CKR_OBJECT_HANDLE_INVALID:
		return "CKR_OBJECT_HANDLE_INVALID";
	case CKR_OPERATION_ACTIVE:
		return "CKR_OPERATION_ACTIVE";
	case CKR_OPERATION_NOT_INITIALIZED:
		return "CKR_OPERATION_NOT_INITIALIZED";
	case CKR_PIN_INCORRECT:
		return "CKR_PIN_INCORRECT";
	case CKR_PIN_INVALID:
		return "CKR_PIN_INVALID";
	case CKR_PIN_LEN_RANGE:
		return "CKR_PIN_LEN_RANGE";
	case CKR_PIN_EXPIRED:
		return "CKR_PIN_EXPIRED";
	case CKR_PIN_LOCKED:
		return "CKR_PIN_LOCKED";
	case CKR_SESSION_CLOSED:
		return "CKR_SESSION_CLOSED";
	case CKR_SESSION_COUNT:
		return "CKR_SESSION_COUNT";
	case CKR_SESSION_HANDLE_INVALID:
		return "CKR_SESSION_HANDLE_INVALID";
	case CKR_SESSION_PARALLEL_NOT_SUPPORTED:
		return "CKR_SESSION_PARALLEL_NOT_SUPPORTED";
	case CKR_SESSION_READ_ONLY:
		return "CKR_SESSION_READ_ONLY";
	case CKR_SESSION_EXISTS:
		return "CKR_SESSION_EXISTS";
	case CKR_SESSION_READ_ONLY_EXISTS:
		return "CKR_SESSION_READ_ONLY_EXISTS";
	case CKR_SESSION_READ_WRITE_SO_EXISTS:
		return "CKR_SESSION_READ_WRITE_SO_EXISTS";
	case CKR_SIGNATURE_INVALID:
		return "CKR_SIGNATURE_INVALID";
	case CKR_SIGNATURE_LEN_RANGE:
		return "CKR_SIGNATURE_LEN_RANGE";
	case CKR_TEMPLATE_INCOMPLETE:
		return "CKR_TEMPLATE_INCOMPLETE";
	case CKR_TEMPLATE_INCONSISTENT:
		return "CKR_TEMPLATE_INCONSISTENT";
	case CKR_TOKEN_NOT_PRESENT:
		return "CKR_TOKEN_NOT_PRESENT";
	case CKR_TOKEN_NOT_RECOGNIZED:
		return "CKR_TOKEN_NOT_RECOGNIZED";
	case CKR_TOKEN_WRITE_PROTECTED:
		return "CKR_TOKEN_WRITE_PROTECTED";
	case CKR_UNWRAPPING_KEY_HANDLE_INVALID:
		return "CKR_UNWRAPPING_KEY_HANDLE_INVALID";
	case CKR_UNWRAPPING_KEY_SIZE_RANGE:
		return "CKR_UNWRAPPING_KEY_SIZE_RANGE";
	case CKR_UNWRAPPING_KEY_TYPE_INCONSISTENT:
		return "CKR_UNWRAPPING_KEY_TYPE_INCONSISTENT";
	case CKR_USER_ALREADY_LOGGED_IN:
		return "CKR_USER_ALREADY_LOGGED_IN";
	case CKR_USER_NOT_LOGGED_IN:
		return "CKR_USER_NOT_LOGGED_IN";
	case CKR_USER_PIN_NOT_INITIALIZED:
		return "CKR_USER_PIN_NOT_INITIALIZED";
	case CKR_USER_TYPE_INVALID:
		return "CKR_USER_TYPE_INVALID";
	case CKR_USER_ANOTHER_ALREADY_LOGGED_IN:
		return "CKR_USER_ANOTHER_ALREADY_LOGGED_IN";
	case CKR_USER_TOO_MANY_TYPES:
		return "CKR_USER_TOO_MANY_TYPES";
	case CKR_WRAPPED_KEY_INVALID:
		return "CKR_WRAPPED_KEY_INVALID";
	case CKR_WRAPPED_KEY_LEN_RANGE:
		return "CKR_WRAPPED_KEY_LEN_RANGE";
	case CKR_WRAPPING_KEY_HANDLE_INVALID:
		return "CKR_WRAPPING_KEY_HANDLE_INVALID";
	case CKR_WRAPPING_KEY_SIZE_RANGE:
		return "CKR_WRAPPING_KEY_SIZE_RANGE";
	case CKR_WRAPPING_KEY_TYPE_INCONSISTENT:
		return "CKR_WRAPPING_KEY_TYPE_INCONSISTENT";
	case CKR_RANDOM_SEED_NOT_SUPPORTED:
		return "CKR_RANDOM_SEED_NOT_SUPPORTED";
	case CKR_RANDOM_NO_RNG:
		return "CKR_RANDOM_NO_RNG";
	case CKR_DOMAIN_PARAMS_INVALID:
		return "CKR_DOMAIN_PARAMS_INVALID";
	case CKR_BUFFER_TOO_SMALL:
		return "CKR_BUFFER_TOO_SMALL";
	case CKR_SAVED_STATE_INVALID:
		return "CKR_SAVED_STATE_INVALID";
	case CKR_INFORMATION_SENSITIVE:
		return "CKR_INFORMATION_SENSITIVE";
	case CKR_STATE_UNSAVEABLE:
		return "CKR_STATE_UNSAVEABLE";
	case CKR_CRYPTOKI_NOT_INITIALIZED:
		return "CKR_CRYPTOKI_NOT_INITIALIZED";
	case CKR_CRYPTOKI_ALREADY_INITIALIZED:
		return "CKR_CRYPTOKI_ALREADY_INITIALIZED";
	case CKR_MUTEX_BAD:
		return "CKR_MUTEX_BAD";
	case CKR_MUTEX_NOT_LOCKED:
		return "CKR_MUTEX_NOT_LOCKED";
	case CKR_VENDOR_DEFINED:
		return "CKR_VENDOR_DEFINED";
    default:
        {
            ostringstream os;
            os << "unknown error (" << errnum << ")";
            return os.str();
        }
	}
}

// This convenience function takes a windows error number and returns
// a textual descripion of the error.

string GetErrorMessage(DWORD err)
{
	char *msg = 0;
	int len;
	if ((len = FormatMessage(FORMAT_MESSAGE_ALLOCATE_BUFFER|FORMAT_MESSAGE_FROM_SYSTEM, 0, err, 0, (char *) &msg, 0, 0)) == 0)
	{
		return "FormatMessage failed (not original error)";
	}
	string s(msg, len);
	LocalFree(msg);
	return s;
}

// This object, registry, is the main object of the module and provides
// functions for manipulated the registry. It represents on open 
// registry key.

struct pkcs11dll {
	PyObject_HEAD

	// The pkcs11 dll we are using
	HINSTANCE hi;

	CK_FUNCTION_LIST_PTR p_functionlist;
};

PyObject *pkcs11dll_NEW(HINSTANCE hi, char *init_str);

void pkcs11dll_dealloc(PyObject *self)
{
	pkcs11dll *pdll = (pkcs11dll *) self;
	pdll->p_functionlist->C_Finalize(NULL);
	FreeLibrary(pdll->hi);
	PyMem_DEL(self);
}

PyObject *pkcs11dll_getInfo(PyObject *self, PyObject *args)
{
	pkcs11dll *pdll = (pkcs11dll *) self;
	if (!pdll->p_functionlist->C_GetInfo)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_GetInfo not supported");
	}

	PyObject *result = py_CK_INFO_NEW();
	CK_RV retval;
	if ((retval = pdll->p_functionlist->C_GetInfo(&((py_CK_INFO *) result)->ck_info)) != CKR_OK)
	{
		ostringstream os;
		os << "C_GetInfo failed: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
        Py_DECREF(result);
		return NULL;
	}

	return result;
}

PyObject *pkcs11dll_getSlotList(PyObject *self, PyObject *args)
{
	pkcs11dll *pdll = (pkcs11dll *) self;
	if (!pdll->p_functionlist->C_GetSlotList)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_GetSlotList not supported");
	}

	int i;
	if (!PyArg_ParseTuple(args, "i", &i))
	{
		return NULL;
	}

	CK_ULONG list_len;
	CK_RV retval;
	if ((retval = pdll->p_functionlist->C_GetSlotList((CK_BBOOL) i != 0 ? TRUE : FALSE, NULL, &list_len)) != CKR_OK)
	{
		ostringstream os;
		os << "C_GetSlotList error (" << retval << ")";
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

	CK_SLOT_ID *ids;
	ids = new CK_SLOT_ID[list_len];

	if ((retval = pdll->p_functionlist->C_GetSlotList((CK_BBOOL) i != 0 ? TRUE : FALSE, ids, &list_len)) != CKR_OK)
	{
		ostringstream os;
		os << "C_GetSlotList error (" << retval << ")";
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}


	PyObject *slot_tuple = PyTuple_New(list_len);
	for (int j = 0; j < list_len; j++)
	{
		PyTuple_SET_ITEM(slot_tuple, j, PyInt_FromLong(ids[j]));
	}
	delete [] ids;

	return slot_tuple;
}

PyObject *pkcs11dll_getSlotInfo(PyObject *self, PyObject *args)
{
	pkcs11dll *pdll = (pkcs11dll *) self;
	if (!pdll->p_functionlist->C_GetSlotInfo)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_GetSlotInfo not supported");
	}

	CK_ULONG slot_id;
	if (!PyArg_ParseTuple(args, "i", &slot_id))
	{
		return NULL;
	}

	CK_RV retval;
	PyObject *result = py_CK_SLOT_INFO_NEW();
	if ((retval = pdll->p_functionlist->C_GetSlotInfo(slot_id, &((py_CK_SLOT_INFO *) result)->slot_info)) != CKR_OK)
	{
		ostringstream os;
		os << "C_GetSlotInfo error (" << retval << ")";
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
        Py_DECREF(result);
		return NULL;
	}

	return result;
}

/*
 * Before I wrote the new getSlotInfo which returns a proper Python
 * object I returned a tuple with all the info.
 */
PyObject *pkcs11dll_getSlotInfoOLD(PyObject *self, PyObject *args)
{
	pkcs11dll *pdll = (pkcs11dll *) self;
	if (!pdll->p_functionlist->C_GetSlotInfo)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_GetSlotInfo not supported");
	}

	CK_ULONG slot_id;
	if (!PyArg_ParseTuple(args, "i", &slot_id))
	{
		return NULL;
	}

	CK_RV retval;
	CK_SLOT_INFO slot_info;
	if ((retval = pdll->p_functionlist->C_GetSlotInfo(slot_id, &slot_info)) != CKR_OK)
	{
		ostringstream os;
		os << "C_GetSlotInfo error (" << retval << ")";
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

	PyObject *slot_info_tuple = PyTuple_New(5);

	PyTuple_SET_ITEM(slot_info_tuple, 0, PyString_FromStringAndSize((const char *) slot_info.slotDescription, 64));
	PyTuple_SET_ITEM(slot_info_tuple, 1, PyString_FromStringAndSize((const char *) slot_info.manufacturerID, 32));
	PyTuple_SET_ITEM(slot_info_tuple, 2, PyInt_FromLong(slot_info.flags));

	PyObject *hardware_version_tuple = PyTuple_New(2);
	PyTuple_SET_ITEM(hardware_version_tuple, 0, PyInt_FromLong(slot_info.hardwareVersion.major));
	PyTuple_SET_ITEM(hardware_version_tuple, 1, PyInt_FromLong(slot_info.hardwareVersion.minor));
	PyTuple_SET_ITEM(slot_info_tuple, 3, hardware_version_tuple);

	PyObject *firmware_version_tuple = PyTuple_New(2);
	PyTuple_SET_ITEM(firmware_version_tuple, 0, PyInt_FromLong(slot_info.firmwareVersion.major));
	PyTuple_SET_ITEM(firmware_version_tuple, 1, PyInt_FromLong(slot_info.firmwareVersion.minor));
	PyTuple_SET_ITEM(slot_info_tuple, 4, firmware_version_tuple);

	return slot_info_tuple;
}

PyObject *pkcs11dll_getTokenInfo(PyObject *self, PyObject *args)
{
	pkcs11dll *pdll = (pkcs11dll *) self;
	if (!pdll->p_functionlist->C_GetTokenInfo)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_GetTokenInfo not supported");
	}

	CK_ULONG slot_id;
	if (!PyArg_ParseTuple(args, "i", &slot_id))
	{
		return NULL;
	}

	CK_RV retval;
    PyObject *result = py_CK_TOKEN_INFO_NEW();
	if ((retval = pdll->p_functionlist->C_GetTokenInfo(slot_id, &((py_CK_TOKEN_INFO *) result)->token_info)) != CKR_OK)
	{
		ostringstream os;
		os << "C_GetTokenInfo error: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
        Py_DECREF(result);
		return NULL;
	}
    return result;
}

PyObject *pkcs11dll_getMechanismList(PyObject *self, PyObject *args)
{
	pkcs11dll *pdll = (pkcs11dll *) self;
	if (!pdll->p_functionlist->C_GetMechanismList)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_GetMechanismList not supported");
	}

	CK_SLOT_ID slot_id;
	if (!PyArg_ParseTuple(args, "i", &slot_id))
	{
		return NULL;
	}

	CK_ULONG list_len;
	CK_RV retval;
	if ((retval = pdll->p_functionlist->C_GetMechanismList(slot_id, NULL, &list_len)) != CKR_OK)
	{
		ostringstream os;
		os << "C_GetMechanismList error: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

	CK_MECHANISM_TYPE *mech_types;
	mech_types = new CK_MECHANISM_TYPE[list_len];

	if ((retval = pdll->p_functionlist->C_GetMechanismList(slot_id, mech_types, &list_len)) != CKR_OK)
	{
		ostringstream os;
		os << "C_GetMechanismList error: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

	PyObject *slot_tuple = PyTuple_New(list_len);
	for (int j = 0; j < list_len; j++)
	{
		PyTuple_SET_ITEM(slot_tuple, j, PyInt_FromLong(mech_types[j]));
	}
	delete [] mech_types;

	return slot_tuple;
}

PyObject *pkcs11dll_getMechanismInfo(PyObject *self, PyObject *args)
{
	pkcs11dll *pdll = (pkcs11dll *) self;
	if (!pdll->p_functionlist->C_GetMechanismList)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_GetMechanismInfo not supported");
	}

	CK_SLOT_ID slot_id;
    CK_MECHANISM_TYPE mech_type;
	if (!PyArg_ParseTuple(args, "ii", &slot_id, &mech_type))
	{
		return NULL;
	}

	CK_MECHANISM_INFO mech_info;
	CK_RV retval;
	if ((retval = pdll->p_functionlist->C_GetMechanismInfo(slot_id, mech_type, &mech_info)) != CKR_OK)
	{
		ostringstream os;
		os << "C_GetMechanismInfo error: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

	PyObject *mech_info_tuple = PyTuple_New(3);
	PyTuple_SET_ITEM(mech_info_tuple, 0, PyLong_FromUnsignedLong(mech_info.ulMinKeySize));
	PyTuple_SET_ITEM(mech_info_tuple, 1, PyLong_FromUnsignedLong(mech_info.ulMaxKeySize));
	PyTuple_SET_ITEM(mech_info_tuple, 2, PyInt_FromLong(mech_info.flags));

	return mech_info_tuple;
}

PyObject *pkcs11dll_openSession(PyObject *self, PyObject *args)
{
	pkcs11dll *pdll = (pkcs11dll *) self;
	if (!pdll->p_functionlist->C_OpenSession)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_OpenSession not supported");
	}

	CK_SLOT_ID slot_id;
    CK_FLAGS flags;
	if (!PyArg_ParseTuple(args, "ii", &slot_id, &flags))
	{
		return NULL;
	}

	CK_RV retval;
    CK_SESSION_HANDLE session_handle;
	if ((retval = pdll->p_functionlist->C_OpenSession(slot_id, flags|CKF_SERIAL_SESSION, NULL_PTR, NULL_PTR, &session_handle)) != CKR_OK)
	{
		ostringstream os;
		os << "C_OpenSession error: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

    return pkcs11_session_NEW(session_handle, pdll->p_functionlist, self);
}

PyMethodDef pkcs11dll_methods[] = {
	{"getInfo", pkcs11dll_getInfo, METH_VARARGS},
	{"getSlotList", pkcs11dll_getSlotList, METH_VARARGS},
	{"getSlotInfo", pkcs11dll_getSlotInfo, METH_VARARGS},
	{"getTokenInfo", pkcs11dll_getTokenInfo, METH_VARARGS},
    {"getMechanismList", pkcs11dll_getMechanismList, METH_VARARGS},
    {"getMechanismInfo", pkcs11dll_getMechanismInfo, METH_VARARGS},
    {"openSession", pkcs11dll_openSession, METH_VARARGS},
	{NULL, NULL}
};

PyObject *pkcs11dll_getattr(PyObject *self, char *attrname)
{
  PyObject *result = 0;
  pkcs11dll *pdll = (pkcs11dll *) self;

  if (strcmp(attrname, "hi") == 0) {
    result = PyInt_FromLong((long) pdll->hi);
  }
  else {
    result = Py_FindMethod(pkcs11dll_methods, self, attrname);
  }
  return result;
}

int pkcs11dll_setattr(PyObject *self, char *attrname, PyObject *value)
{
	pkcs11dll *pdll = (pkcs11dll *) self;

	if (!strcmp(attrname, "hi"))
	{
		if (!PyInt_Check(value))
		{
			PyErr_SetString(PyExc_TypeError, "hi must be an int");
			return -1;
		}

		if (pdll->hi)
			FreeLibrary(pdll->hi);

		pdll->hi = (HINSTANCE) PyInt_AsLong(value);
		return 0;
	}

	PyErr_SetString(PyExc_AttributeError, "unknown attribute");
	return -1;
}


int pkcs11dll_print(PyObject *self, FILE *fp, int i)
{
  return 0;
}

PyTypeObject pkcs11dll_Type = {
	PyObject_HEAD_INIT(&PyType_Type)
	0,
	"pkcs11dll",               /* char *tp_name; */
	sizeof(pkcs11dll),       /* int tp_basicsize; */
	0,                        /* int tp_itemsize;       /* not used much */
	pkcs11dll_dealloc,          /* destructor tp_dealloc; */
	pkcs11dll_print,            /* printfunc  tp_print;   */
	pkcs11dll_getattr,          /* getattrfunc  tp_getattr; /* __getattr__ */
	pkcs11dll_setattr,          /* setattrfunc  tp_setattr;  /* __setattr__ */
	0/*pkcs11dll_compare*/,          /* cmpfunc  tp_compare;  /* __cmp__ */
	0/*pkcs11dll_repr*/,             /* reprfunc  tp_repr;    /* __repr__ */
	0/*&pkcs11dll_as_number*/,       /* PyNumberMethods *tp_as_number; */
	0,                        /* PySequenceMethods *tp_as_sequence; */
	0,                        /* PyMappingMethods *tp_as_mapping; */
	0/*pkcs11dll_hash*/,              /* hashfunc tp_hash;     /* __hash__ */
	0,                        /* ternaryfunc tp_call;  /* __call__ */
	0/*pkcs11dll_str*/,              /* reprfunc tp_str;      /* __str__ */
};

/* These functions are used by the pkcs11 module to synchronize access */
static CK_RV pkcs11_create_mutex(void **pp_mutex)
{
    //fprintf(stderr, "creating mutex\n"); // FIXME: remove
    *pp_mutex = (void *) CreateMutex(NULL, FALSE, NULL);
    if (!*pp_mutex) {
        return CKR_HOST_MEMORY;
    }
    return CKR_OK;
}

static CK_RV pkcs11_destroy_mutex(void *p_mutex)
{
    //fprintf(stderr, "destroying mutex\n"); // FIXME: remove
    CloseHandle((HANDLE) p_mutex);
    return CKR_OK;
}

static CK_RV pkcs11_lock_mutex(void *p_mutex)
{
    //fprintf(stderr, "locking mutex\n"); // FIXME: remove
    WaitForSingleObject((HANDLE) p_mutex, INFINITE);
    return CKR_OK;
}

static CK_RV pkcs11_unlock_mutex(void *p_mutex)
{
    //fprintf(stderr, "unlocking mutex\n"); // FIXME: remove
    ReleaseMutex((HANDLE) p_mutex);
    return CKR_OK;
}

PyObject *pkcs11dll_NEW(HINSTANCE hi, char *init_str, bool use_mutex)
{

	pkcs11dll *pdll = (pkcs11dll *) PyObject_NEW(pkcs11dll, &pkcs11dll_Type);
	if (pdll) {
		pdll->hi = hi;
	}
	else
		return (PyObject *) pdll;


	// first we need to get the function list 
	CK_C_GetFunctionList c_getfunctionlist;
	c_getfunctionlist = (CK_C_GetFunctionList) GetProcAddress(pdll->hi, "C_GetFunctionList");
	if (!c_getfunctionlist) {
		PyErr_SetString(PyExc_SystemError, "failed to load C_GetFunctionList pointer");
		return NULL;
	}

	CK_RV retval;

	// now load the function pointers
	if ((retval = c_getfunctionlist(&pdll->p_functionlist)) ) {
		ostringstream os;
		os << "C_GetFunctionList failed (" << retval << ")";
		string s = os.str();
		PyErr_SetString(PyExc_SystemError, s.c_str());
		return NULL;
	}

	// and now actually initialize the library
    CK_C_INITIALIZE_ARGS init_args, *init_argsp = NULL_PTR;
    memset(&init_args, 0, sizeof(init_args));
    if (use_mutex) {
        init_args.CreateMutex = pkcs11_create_mutex;
        init_args.DestroyMutex = pkcs11_destroy_mutex;
        init_args.LockMutex = pkcs11_lock_mutex;
        init_args.UnlockMutex = pkcs11_unlock_mutex;
        init_args.flags = CKF_LIBRARY_CANT_CREATE_OS_THREADS|CKF_OS_LOCKING_OK;
        init_args.pReserved = NULL_PTR;
        init_argsp = &init_args;
    }

    // the following is an example of a string that gets passed to the
    // mozilla softokn3.dll
    //init_args.pReserved = "configdir='C:/Documents and Settings/jbj1/Application Data/Mozilla/Profiles/default/csl30ups.slt' certPrefix='' keyPrefix='' secmod='secmod.db' flags=  manufacturerID='Mozilla.org' libraryDescription='PSM Internal Crypto Services' cryptoTokenDescription='Generic Crypto Services' dbTokenDescription='Software Security Device' cryptoSlotDescription='PSM Internal Cryptographic Services' dbSlotDescription='PSM Private Keys' FIPSSlotDescription='PSM Internal FIPS-140-1 Cryptographic Services' FIPSTokenDescription='PSM FIPS-140-1 User Private Key Services' minPS=0";

    // if the user passed a non-null init_str then this means we'll
    // be setting up the init_args struct and setting the pReserved value
    // to this string. This is used by the mozilla softoken so that's why
    // I've added it here. It should look like the above.
    if (init_str) {
        init_args.pReserved = init_str;
        init_argsp = &init_args;
    }
    
	if ((retval = pdll->p_functionlist->C_Initialize(init_argsp)) != CKR_OK)
	{
		ostringstream os;
		os << "C_Initialize failed: " << GetPKCS11Error(retval);
		string s = os.str();
		PyErr_SetString(PyExc_SystemError, s.c_str());
		return NULL;
	}

	return (PyObject *) pdll;
}

PyObject *pkcs11_open(PyObject *self, PyObject *args, PyObject *kwargs)
{
	char *pkcs11dll_filename_s;
    char *pkcs11dll_init_arg_str = 0;
    static char *kwargs_names[] = { "dll_name", "init_str", "mutex", NULL };
    PyObject *mutex_obj = 0;

	if (!PyArg_ParseTupleAndKeywords(args, kwargs, "s|sO", kwargs_names, &pkcs11dll_filename_s, &pkcs11dll_init_arg_str, &mutex_obj))
		return NULL;

	// open up the DLL
	HINSTANCE hi = LoadLibrary(pkcs11dll_filename_s);
	if (!hi)
	{
		DWORD err = GetLastError();
		string err_s = GetErrorMessage(err);
		PyErr_SetString(PyExc_SystemError, err_s.c_str());
		return NULL;
	}

    // as long as the mutex keyword arg is not None then we take that as
    // true
    bool use_mutex = false;
    if (mutex_obj && mutex_obj != Py_None) {
        //fprintf(stderr, "using MUTEXES!\n"); //FIXME: remove
        use_mutex = true;
    }

	return pkcs11dll_NEW(hi, pkcs11dll_init_arg_str, use_mutex);
}

PyMethodDef pkcs11_methods[] = {
	{"open", (PyCFunction)pkcs11_open, METH_VARARGS|METH_KEYWORDS, "open(pkcs11dll_filename, [init string]) opens a pkcs11 DLL file"},
	{NULL, NULL}
};

extern "C" PKCS11_API void initpkcs11()
{
	PyObject *module = Py_InitModule("pkcs11", pkcs11_methods);
#include "constants.cpp"
}

//
// Local Variables:
// tab-width: 4
// End:
//
