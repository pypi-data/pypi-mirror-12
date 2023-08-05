// pkcs11.cpp : Defines the entry point for the DLL application.
//

#include "stdafx.h"

#ifdef _DEBUG
# undef _DEBUG
# include <Python.h>
# define _DEBUG
#else
# include <Python.h>
#endif

#include <cryptoki.h>
#include "pkcs11.h"

using namespace std;

// This convenience function returns the text error for the PKCS11 error number
extern string GetPKCS11Error(CK_RV errnum);
extern string GetErrorMessage(DWORD err);

struct pkcs11_session {
	PyObject_HEAD

	// The pkcs11 dll we are using
    CK_SESSION_HANDLE session_handle;
	CK_FUNCTION_LIST_PTR p_functionlist;
    PyObject *pkcs11dll_object;
};

PyObject *pkcs11_session_NEW(CK_SESSION_HANDLE sh, CK_FUNCTION_LIST_PTR pf, PyObject *po);

void pkcs11_session_dealloc(PyObject *self)
{
	pkcs11_session *psess = (pkcs11_session *) self;
	psess->p_functionlist->C_CloseSession(psess->session_handle);
	Py_DECREF(psess->pkcs11dll_object);
	PyMem_DEL(self);
}

PyObject *pkcs11_session_login(PyObject *self, PyObject *args)
{
	pkcs11_session *psess = (pkcs11_session *) self;

    CK_USER_TYPE user_type;
	unsigned char *pin;
    unsigned int pin_len;
	if (!PyArg_ParseTuple(args, "is#", &user_type, &pin, &pin_len))
		return NULL;

	if (!psess->p_functionlist->C_Login)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_Login not supported");
	}

	CK_RV retval;
	if ((retval = psess->p_functionlist->C_Login(psess->session_handle, user_type, pin, pin_len)) != CKR_OK)
	{
		ostringstream os;
		os << "C_Login failed: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

    Py_INCREF(Py_None);
	return Py_None;
}

PyObject *pkcs11_session_findObjects(PyObject *self, PyObject *args)
{
	pkcs11_session *psess = (pkcs11_session *) self;

    // the input should be a list or tuple containing tuples that have
    // an attribute type plus a value
    PyObject *list_obj;
    bool list_obj_is_list = false;
	if (!PyArg_ParseTuple(args, "O", &list_obj))
		return NULL;

    list_obj_is_list = PyList_Check(list_obj);
    if (!list_obj_is_list && !PyTuple_Check(list_obj) && list_obj != Py_None) {
        PyErr_SetString(PyExc_TypeError, "argument must be list or tuple of 2-tuples containing types and values1");
        return NULL;
    }

    CK_ATTRIBUTE *attr_list = 0;
    int attr_list_len = 0;

    if (list_obj != Py_None)
        attr_list_len = list_obj_is_list ? PyList_Size(list_obj) : PyTuple_Size(list_obj);

    if (attr_list_len)
        attr_list = new CK_ATTRIBUTE[attr_list_len];

    for (int i = 0; i < attr_list_len; i++) {
        // each item in the list should be a tuple
        PyObject *list_item = list_obj_is_list ? PyList_GetItem(list_obj, i) : PyTuple_GetItem(list_obj, i);
        if (!PyTuple_Check(list_item) || PyTuple_Size(list_item) != 2) {
            delete [] attr_list;
            PyErr_SetString(PyExc_TypeError, "argument must be list or tuple of 2-tuples containing types and values2");
            return NULL;
        }
        // first item should be an int
        PyObject *list_item_0 = PyTuple_GetItem(list_item, 0);
        if (!PyInt_Check(list_item_0)) {
            delete [] attr_list;
            PyErr_SetString(PyExc_TypeError, "argument must be list or tuple of 2-tuples containing types and values3");
            return NULL;
        }

        attr_list[i].type = (CK_ATTRIBUTE_TYPE) PyInt_AsLong(list_item_0);

        // now set the value
        PyObject *list_item_1 = PyTuple_GetItem(list_item, 1);
        if (PyInt_Check(list_item_1)) {
            attr_list[i].pValue = (CK_VOID_PTR) &(PyInt_AS_LONG(list_item_1));
            attr_list[i].ulValueLen = 4;
        }
        else if (PyString_Check(list_item_1)) {
            attr_list[i].pValue = (CK_VOID_PTR) PyString_AsString(list_item_1);
            attr_list[i].ulValueLen = PyString_Size(list_item_1);
        }
        else {
            delete [] attr_list;
            PyErr_SetString(PyExc_TypeError, "argument must be list or tuple of 2-tuples containing types and values4");
            return NULL;
        }
    }

	if (!psess->p_functionlist->C_FindObjectsInit || !psess->p_functionlist->C_FindObjects || !psess->p_functionlist->C_FindObjectsFinal)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_FindObjectsInit not supported");
	}

	CK_RV retval;
	if ((retval = psess->p_functionlist->C_FindObjectsInit(psess->session_handle, attr_list, attr_list_len)) != CKR_OK)
	{
		ostringstream os;
		os << "C_FindObjectsInit failed: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

    if (attr_list) delete [] attr_list;

    // now we get the objects chunk by chunk
    PyObject *obj_list = PyList_New(0);

    CK_OBJECT_HANDLE h_arr[20];
    CK_ULONG num;
    while ((retval = psess->p_functionlist->C_FindObjects(psess->session_handle, h_arr, 20, &num)) == CKR_OK)
    {
      if (num == 0) break;
      for (CK_ULONG ul = 0; ul < num; ul++)
        PyList_Append(obj_list, PyInt_FromLong(h_arr[ul]));
    }

    psess->p_functionlist->C_FindObjectsFinal(psess->session_handle);

    if (retval != CKR_OK)
	{
		ostringstream os;
		os << "C_FindObjects failed: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
        Py_DECREF(obj_list);
		return NULL;
	}

	return obj_list;
}

PyObject *pkcs11_session_logout(PyObject *self, PyObject *args)
{
	pkcs11_session *psess = (pkcs11_session *) self;

	if (!PyArg_ParseTuple(args, ""))
		return NULL;

	if (!psess->p_functionlist->C_Logout)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_Logout not supported");
	}

	CK_RV retval;
	if ((retval = psess->p_functionlist->C_Logout(psess->session_handle)) != CKR_OK)
	{
		ostringstream os;
		os << "C_Logout failed (" << retval << ")";
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

    Py_INCREF(Py_None);
	return Py_None;
}

PyObject *pkcs11_session_getAttributeValue(PyObject *self, PyObject *args)
{
	pkcs11_session *psess = (pkcs11_session *) self;

    CK_OBJECT_HANDLE h;
    PyObject *list_obj;
	if (!PyArg_ParseTuple(args, "iO", &h, &list_obj))
		return NULL;

	if (!psess->p_functionlist->C_GetAttributeValue)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_GetAttributeValue not supported");
	}

    bool list_obj_is_list = PyList_Check(list_obj);
    if (!list_obj_is_list && !PyTuple_Check(list_obj)) {
        PyErr_SetString(PyExc_TypeError, "argument must be list or tuple of attribute types");
        return NULL;
    }

    int attr_list_len = list_obj_is_list ? PyList_Size(list_obj) : PyTuple_Size(list_obj);

    if (attr_list_len <= 0) {
        PyErr_SetString(PyExc_TypeError, "argument must be non-empty list or tuple of attribute types");
        return NULL;
    }

    CK_ATTRIBUTE *attr_list = new CK_ATTRIBUTE[attr_list_len];

    for (int i = 0; i < attr_list_len; i++) {
        // each item in the list should be an int
        PyObject *list_item = list_obj_is_list ? PyList_GetItem(list_obj, i) : PyTuple_GetItem(list_obj, i);
        if (!PyInt_Check(list_item)) {
            delete [] attr_list;
            PyErr_SetString(PyExc_TypeError, "argument must be list of intenger attribute types");
            return NULL;
        }

        attr_list[i].type = (CK_ATTRIBUTE_TYPE) PyInt_AsLong(list_item);
        attr_list[i].pValue = NULL_PTR;
        attr_list[i].ulValueLen = 0;
    }

    // first get the size
	CK_RV retval;
	if ((retval = psess->p_functionlist->C_GetAttributeValue(psess->session_handle, h, attr_list, attr_list_len)) != CKR_OK)
	{
		ostringstream os;
		os << "C_GetAttributeValue failed: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
        delete [] attr_list;
		return NULL;
	}

    for (i = 0; i < attr_list_len; i++)
        attr_list[i].pValue = new unsigned char[attr_list[i].ulValueLen];

	if ((retval = psess->p_functionlist->C_GetAttributeValue(psess->session_handle, h, attr_list, attr_list_len)) != CKR_OK)
	{
		ostringstream os;
		os << "C_GetAttributeValue failed: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
        delete [] attr_list;
		return NULL;
	}

    PyObject *val = PyTuple_New(attr_list_len);
    for (i = 0; i < attr_list_len; i++) {
        if (attr_list[i].ulValueLen == -1) {
            Py_INCREF(Py_None);
            PyTuple_SetItem(val, i, Py_None);
        }
        else
            PyTuple_SetItem(val, i, PyString_FromStringAndSize((char *) attr_list[i].pValue, attr_list[i].ulValueLen));
        delete [] attr_list[i].pValue;
    }

	return val;
}

PyObject *pkcs11_session_setAttributeValue(PyObject *self, PyObject *args)
{
	pkcs11_session *psess = (pkcs11_session *) self;

    CK_OBJECT_HANDLE h;
    PyObject *list_obj;
	if (!PyArg_ParseTuple(args, "iO", &h, &list_obj))
		return NULL;

    bool list_obj_is_list = false;

    list_obj_is_list = PyList_Check(list_obj);
    if (!list_obj_is_list && !PyTuple_Check(list_obj)) {
        PyErr_SetString(PyExc_TypeError, "argument must be list or tuple of 2-tuples containing types and values1");
        return NULL;
    }

    CK_ATTRIBUTE *attr_list = 0;
    int attr_list_len = 0;

    attr_list_len = list_obj_is_list ? PyList_Size(list_obj) : PyTuple_Size(list_obj);

    if (attr_list_len == 0) {
        PyErr_SetString(PyExc_TypeError, "argument must be non-empty list or tuple of attribute type/value pairs");
        return NULL;
    }

    attr_list = new CK_ATTRIBUTE[attr_list_len];

    for (int i = 0; i < attr_list_len; i++) {
        // each item in the list should be a tuple
        PyObject *list_item = list_obj_is_list ? PyList_GetItem(list_obj, i) : PyTuple_GetItem(list_obj, i);
        if (!PyTuple_Check(list_item) || PyTuple_Size(list_item) != 2) {
            delete [] attr_list;
            PyErr_SetString(PyExc_TypeError, "argument must be list or tuple of 2-tuples containing types and values");
            return NULL;
        }

        // first item should be an int
        PyObject *list_item_0 = PyTuple_GetItem(list_item, 0);
        if (!PyInt_Check(list_item_0)) {
            delete [] attr_list;
            PyErr_SetString(PyExc_TypeError, "argument must be list or tuple of 2-tuples containing types and values");
            return NULL;
        }

        attr_list[i].type = (CK_ATTRIBUTE_TYPE) PyInt_AsLong(list_item_0);

        // now set the value
        PyObject *list_item_1 = PyTuple_GetItem(list_item, 1);
        if (PyInt_Check(list_item_1)) {
            attr_list[i].pValue = (CK_VOID_PTR) &(PyInt_AS_LONG(list_item_1));
            attr_list[i].ulValueLen = 4;
        }
        else if (PyString_Check(list_item_1)) {
            attr_list[i].pValue = (CK_VOID_PTR) PyString_AsString(list_item_1);
            attr_list[i].ulValueLen = PyString_Size(list_item_1);
        }
        else {
            delete [] attr_list;
            PyErr_SetString(PyExc_TypeError, "argument must be list or tuple of 2-tuples containing types and values4");
            return NULL;
        }
    }

	if (!psess->p_functionlist->C_SetAttributeValue)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_SetAttributeValue not supported");
        delete [] attr_list;
        return NULL;
	}

	CK_RV retval;
	if ((retval = psess->p_functionlist->C_SetAttributeValue(psess->session_handle, h, attr_list, attr_list_len)) != CKR_OK)
	{
		ostringstream os;
		os << "C_SetAttributeValue failed: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

    Py_INCREF(Py_None);
	return Py_None;
}

class ListOrTuple
{
private:
    ListOrTuple(); // does not exist
    PyObject *obj;
    bool is_tuple;

public:
    ListOrTuple(PyObject *p)
    {
        obj = p;
        is_tuple = PyTuple_Check(obj);
        if (!is_tuple) {
            if (PyList_Check(obj))
                is_tuple = false;
            else
                obj = 0;
        }
    }

    // This will check to make sure the type is List or Tuple and will
    // return true if all is good, false otherwise.
    bool checkType(void) const
    {
        return obj ? true : false;
    }

    int size(void) const
    {
        return is_tuple ? PyTuple_Size(obj) : PyList_Size(obj);
    }

    PyObject *operator[](int i)
    {
        return is_tuple ? PyTuple_GetItem(obj, i) : PyList_GetItem(obj, i);
    }
};

PyObject *pkcs11_session_unwrap_key(PyObject *self, PyObject *args)
{
	pkcs11_session *psess = (pkcs11_session *) self;

    CK_OBJECT_HANDLE unwrapping_key_h;
    PyObject *mechanism_list_obj;
    char *wrapped_key;
    int wrapped_key_len;
    PyObject *attr_list_obj;
    /* params are:
     * (CKM_MECHANISM_TYPE, <mechanism data>), <unwrapping key handle>, <wrapped key>, ((attr, val), ...)
     */
	if (!PyArg_ParseTuple(args, "Ois#O", &mechanism_list_obj, &unwrapping_key_h, &wrapped_key, &wrapped_key_len, &attr_list_obj))
		return NULL;

    /* handle the mechanism param first */
    ListOrTuple mechanism_seq(mechanism_list_obj);
    if (!mechanism_seq.checkType() || mechanism_seq.size() != 2) {
        PyErr_SetString(PyExc_TypeError, "mechanism argument must be list or tuple of length 2");
        return NULL;
    }
    if (!PyInt_Check(mechanism_seq[0])) {
        PyErr_SetString(PyExc_TypeError, "mechanism[0] (mechanism type) must be an int");
        return NULL;
    }
    if (!PyString_Check(mechanism_seq[1]) && mechanism_seq[1] != Py_None) {
        PyErr_SetString(PyExc_TypeError, "mechanism[1] (mechanism data) must be string or None");
        return NULL;
    }

    CK_MECHANISM ck_mechanism;
    ck_mechanism.mechanism = PyInt_AsLong(mechanism_seq[0]);
    if (mechanism_seq[1] == Py_None) {
        ck_mechanism.pParameter = 0;
        ck_mechanism.ulParameterLen = 0;
    }
    else {
        PyString_AsStringAndSize(mechanism_seq[1], (char **) &ck_mechanism.pParameter, (int *) &ck_mechanism.ulParameterLen);
    }

    // check out the attr_value list
    ListOrTuple attrval_seq(attr_list_obj);
    if (!attrval_seq.checkType()) {
        PyErr_SetString(PyExc_TypeError, "attribute/value list argument must be list or tuple of 2-tuples containing types and values");
        return NULL;
    }

    int attr_list_len = attrval_seq.size();
    CK_ATTRIBUTE *attr_list = new CK_ATTRIBUTE[attr_list_len];

    for (int i = 0; i < attr_list_len; i++) {
        // each item in the list should be a tuple
        PyObject *list_item = attrval_seq[i];
        if (!PyTuple_Check(list_item) || PyTuple_Size(list_item) != 2) {
            delete [] attr_list;
            PyErr_SetString(PyExc_TypeError, "attribute/value list argument must be list or tuple of 2-tuples containing types and values");
            return NULL;
        }

        // first item should be an int
        PyObject *list_item_0 = PyTuple_GetItem(list_item, 0);
        if (!PyInt_Check(list_item_0)) {
            delete [] attr_list;
            PyErr_SetString(PyExc_TypeError, "argument must be list or tuple of 2-tuples containing types and values");
            return NULL;
        }

        attr_list[i].type = (CK_ATTRIBUTE_TYPE) PyInt_AsLong(list_item_0);

        // now set the value
        PyObject *list_item_1 = PyTuple_GetItem(list_item, 1);
        if (PyInt_Check(list_item_1)) {
            attr_list[i].pValue = (CK_VOID_PTR) &(PyInt_AS_LONG(list_item_1)); // this is bad to reference the value directly but I didn't want to new an int
            attr_list[i].ulValueLen = 4;
        }
        else if (PyString_Check(list_item_1)) {
            attr_list[i].pValue = (CK_VOID_PTR) PyString_AsString(list_item_1);
            attr_list[i].ulValueLen = PyString_Size(list_item_1);
        }
        else {
            delete [] attr_list;
            PyErr_SetString(PyExc_TypeError, "argument must be list or tuple of 2-tuples containing types and values4");
            return NULL;
        }
    }

	if (!psess->p_functionlist->C_UnwrapKey)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_UnwrapKey not supported");
        delete [] attr_list;
        return NULL;
	}

	CK_RV retval;
    CK_OBJECT_HANDLE new_key_handle;
	if ((retval = psess->p_functionlist->C_UnwrapKey(psess->session_handle, &ck_mechanism, unwrapping_key_h, (unsigned char *) wrapped_key, wrapped_key_len, attr_list, attr_list_len, &new_key_handle)) != CKR_OK)
	{
		ostringstream os;
		os << "C_UnwrapKey failed: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

    delete [] attr_list;
	return PyInt_FromLong(new_key_handle);
}

PyObject *pkcs11_session_encrypt(PyObject *self, PyObject *args)
{
	pkcs11_session *psess = (pkcs11_session *) self;

    CK_OBJECT_HANDLE encrypting_key_h;
    PyObject *mechanism_list_obj;
    unsigned char *clear_text;
    unsigned int clear_text_len;
    /* params are:
     * (CKM_MECHANISM_TYPE, <mechanism data>), <encrypting key handle>, <data to encrypt>
     */
	if (!PyArg_ParseTuple(args, "Ois#", &mechanism_list_obj, &encrypting_key_h, &clear_text, &clear_text_len))
		return NULL;

    /* handle the mechanism param first */
    ListOrTuple mechanism_seq(mechanism_list_obj);
    if (!mechanism_seq.checkType() || mechanism_seq.size() != 2) {
        PyErr_SetString(PyExc_TypeError, "mechanism argument must be list or tuple of length 2");
        return NULL;
    }
    if (!PyInt_Check(mechanism_seq[0])) {
        PyErr_SetString(PyExc_TypeError, "mechanism[0] (mechanism type) must be an int");
        return NULL;
    }
    if (!PyString_Check(mechanism_seq[1]) && mechanism_seq[1] != Py_None) {
        PyErr_SetString(PyExc_TypeError, "mechanism[1] (mechanism data) must be string or None");
        return NULL;
    }

    CK_MECHANISM ck_mechanism;
    ck_mechanism.mechanism = PyInt_AsLong(mechanism_seq[0]);
    if (mechanism_seq[1] == Py_None) {
        ck_mechanism.pParameter = 0;
        ck_mechanism.ulParameterLen = 0;
    }
    else {
        PyString_AsStringAndSize(mechanism_seq[1], (char **) &ck_mechanism.pParameter, (int *) &ck_mechanism.ulParameterLen);
    }

	if (!psess->p_functionlist->C_EncryptInit || !psess->p_functionlist->C_EncryptInit)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_Encrypt not supported");
        return NULL;
	}

    // first we must call EncryptInit
    
	CK_RV retval;
	if ((retval = psess->p_functionlist->C_EncryptInit(psess->session_handle, &ck_mechanism, encrypting_key_h)) != CKR_OK)
	{
		ostringstream os;
		os << "C_EncryptInit failed: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

    // that went alright so now we can encrypt our data. we'll make the buffer
    // we encrypt into twice as large as the cleartext
    unsigned long cipher_text_len = clear_text_len * 2;
    unsigned char *cipher_text = new unsigned char[cipher_text_len];

    while (true) {
        if ((retval = psess->p_functionlist->C_Encrypt(psess->session_handle, clear_text, clear_text_len, cipher_text, &cipher_text_len)) != CKR_OK) {
            if (retval == CKR_BUFFER_TOO_SMALL) {
                delete [] cipher_text;
                cipher_text_len += clear_text_len;
                cipher_text = new unsigned char[cipher_text_len];
                continue;
            }
            delete [] cipher_text;
            ostringstream os;
            os << "C_Encrypt failed: " << GetPKCS11Error(retval);
            PyErr_SetString(PyExc_SystemError, os.str().c_str());
            return NULL;
        }
        break;
    }

	PyObject *ret_obj = PyString_FromStringAndSize((const char *) cipher_text, cipher_text_len);
    delete [] cipher_text;
    return ret_obj;
}

PyObject *pkcs11_session_sign(PyObject *self, PyObject *args)
{
	pkcs11_session *psess = (pkcs11_session *) self;

    CK_OBJECT_HANDLE signing_key_h;
    PyObject *mechanism_list_obj;
    unsigned char *clear_text;
    unsigned int clear_text_len;
    /* params are:
     * (CKM_MECHANISM_TYPE, <mechanism data>), <signing key handle>, <data to sign>
     */
	if (!PyArg_ParseTuple(args, "Ois#", &mechanism_list_obj, &signing_key_h, &clear_text, &clear_text_len))
		return NULL;

    /* handle the mechanism param first */
    ListOrTuple mechanism_seq(mechanism_list_obj);
    if (!mechanism_seq.checkType() || mechanism_seq.size() != 2) {
        PyErr_SetString(PyExc_TypeError, "mechanism argument must be list or tuple of length 2");
        return NULL;
    }
    if (!PyInt_Check(mechanism_seq[0])) {
        PyErr_SetString(PyExc_TypeError, "mechanism[0] (mechanism type) must be an int");
        return NULL;
    }
    if (!PyString_Check(mechanism_seq[1]) && mechanism_seq[1] != Py_None) {
        PyErr_SetString(PyExc_TypeError, "mechanism[1] (mechanism data) must be string or None");
        return NULL;
    }

    CK_MECHANISM ck_mechanism;
    ck_mechanism.mechanism = PyInt_AsLong(mechanism_seq[0]);
    if (mechanism_seq[1] == Py_None) {
        ck_mechanism.pParameter = 0;
        ck_mechanism.ulParameterLen = 0;
    }
    else {
        PyString_AsStringAndSize(mechanism_seq[1], (char **) &ck_mechanism.pParameter, (int *) &ck_mechanism.ulParameterLen);
    }

	if (!psess->p_functionlist->C_SignInit || !psess->p_functionlist->C_SignInit)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_Sign not supported");
        return NULL;
	}

    // first we must call SignInit
    
	CK_RV retval;
	if ((retval = psess->p_functionlist->C_SignInit(psess->session_handle, &ck_mechanism, signing_key_h)) != CKR_OK)
	{
		ostringstream os;
		os << "C_SignInit failed: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

    // that went alright so now we can sign our data. we'll make the buffer
    // we sign into twice as large as the cleartext
    unsigned long cipher_text_len = 1024;
    unsigned char *cipher_text = new unsigned char[cipher_text_len];

    while (true) {
        if ((retval = psess->p_functionlist->C_Sign(psess->session_handle, clear_text, clear_text_len, cipher_text, &cipher_text_len)) != CKR_OK) {
            if (retval == CKR_BUFFER_TOO_SMALL) {
                delete [] cipher_text;
                cipher_text_len += 1024;
                cipher_text = new unsigned char[cipher_text_len];
                continue;
            }
            delete [] cipher_text;
            ostringstream os;
            os << "C_Sign failed: " << GetPKCS11Error(retval);
            PyErr_SetString(PyExc_SystemError, os.str().c_str());
            return NULL;
        }
        break;
    }

	PyObject *ret_obj = PyString_FromStringAndSize((const char *) cipher_text, cipher_text_len);
    delete [] cipher_text;
    return ret_obj;
}

PyObject *pkcs11_session_destroy_object(PyObject *self, PyObject *args)
{
	pkcs11_session *psess = (pkcs11_session *) self;

    CK_OBJECT_HANDLE obj_h;
    /* params are:
     * (<object handle>)
     */
	if (!PyArg_ParseTuple(args, "i", &obj_h))
		return NULL;

	if (!psess->p_functionlist->C_DestroyObject)
	{
		PyErr_SetString(PyExc_NotImplementedError, "C_DestroyObject not supported");
        return NULL;
	}

	CK_RV retval;
	if ((retval = psess->p_functionlist->C_DestroyObject(psess->session_handle, obj_h)) != CKR_OK)
	{
		ostringstream os;
		os << "C_DestroyObject failed: " << GetPKCS11Error(retval);
		PyErr_SetString(PyExc_SystemError, os.str().c_str());
		return NULL;
	}

    Py_INCREF(Py_None);
	return Py_None;
}

PyMethodDef pkcs11_session_methods[] = {
  {"login", pkcs11_session_login, METH_VARARGS},
  {"logout", pkcs11_session_logout, METH_VARARGS},
  {"findObjects", pkcs11_session_findObjects, METH_VARARGS},
  {"getAttributeValue", pkcs11_session_getAttributeValue, METH_VARARGS},
  {"setAttributeValue", pkcs11_session_setAttributeValue, METH_VARARGS},
  {"unwrapKey", pkcs11_session_unwrap_key, METH_VARARGS},
  {"encrypt", pkcs11_session_encrypt, METH_VARARGS},
  {"sign", pkcs11_session_sign, METH_VARARGS},
  {"destroyObject", pkcs11_session_destroy_object, METH_VARARGS},
  {NULL, NULL}
};

PyObject *pkcs11_session_getattr(PyObject *self, char *attrname)
{
    PyObject *result = 0;
    pkcs11_session *psess = (pkcs11_session *) self;

    if (strcmp(attrname, "sh") == 0) {
        result = PyInt_FromLong((long) psess->session_handle);
    }
    else {
        result = Py_FindMethod(pkcs11_session_methods, self, attrname);
    }
    return result;
}

int pkcs11_session_setattr(PyObject *self, char *attrname, PyObject *value)
{
	pkcs11_session *psess = (pkcs11_session *) self;

	if (!strcmp(attrname, "hi"))
	{
		if (!PyInt_Check(value))
		{
			PyErr_SetString(PyExc_TypeError, "hi must be an int");
			return -1;
		}

		/*if (psess->hi)
			FreeLibrary(psess->hi);

        psess->hi = (HINSTANCE) PyInt_AsLong(value);*/
		return 0;
	}

	PyErr_SetString(PyExc_AttributeError, "unknown attribute");
	return -1;
}


int pkcs11_session_print(PyObject *self, FILE *fp, int i)
{
  return 0;
}

PyTypeObject pkcs11_session_Type = {
	PyObject_HEAD_INIT(&PyType_Type)
	0,
	"pkcs11_session",               /* char *tp_name; */
	sizeof(pkcs11_session),       /* int tp_basicsize; */
	0,                        /* int tp_itemsize;       /* not used much */
	pkcs11_session_dealloc,          /* destructor tp_dealloc; */
	pkcs11_session_print,            /* printfunc  tp_print;   */
	pkcs11_session_getattr,          /* getattrfunc  tp_getattr; /* __getattr__ */
	pkcs11_session_setattr,          /* setattrfunc  tp_setattr;  /* __setattr__ */
	0/*pkcs11_session_compare*/,          /* cmpfunc  tp_compare;  /* __cmp__ */
	0/*pkcs11_session_repr*/,             /* reprfunc  tp_repr;    /* __repr__ */
	0/*&pkcs11_session_as_number*/,       /* PyNumberMethods *tp_as_number; */
	0,                        /* PySequenceMethods *tp_as_sequence; */
	0,                        /* PyMappingMethods *tp_as_mapping; */
	0/*pkcs11_session_hash*/,              /* hashfunc tp_hash;     /* __hash__ */
	0,                        /* ternaryfunc tp_call;  /* __call__ */
	0/*pkcs11_session_str*/,              /* reprfunc tp_str;      /* __str__ */
};

PyObject *pkcs11_session_NEW(CK_SESSION_HANDLE sh, CK_FUNCTION_LIST_PTR pf, PyObject *po)
{
	pkcs11_session *psess = (pkcs11_session *) PyObject_NEW(pkcs11_session, &pkcs11_session_Type);
	if (psess) {
		psess->session_handle = sh;
        psess->p_functionlist = pf;
        psess->pkcs11dll_object = po;
        Py_INCREF(po);
	}
	return (PyObject *) psess;
}

//
// Local Variables:
// tab-width: 4
// c-basic-offset: 4
// End:
//
