// pkcs11_structs.cpp
// This file contains small objects that represent structs in the PKCS11 standard.

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

// This convenience function returns the text error for the PKCS11 error number
extern string GetPKCS11Error(CK_RV errnum);
extern string GetErrorMessage(DWORD err);

void py_CK_INFO_dealloc(PyObject *self)
{
	py_CK_INFO *pck_info = (py_CK_INFO *) self;
	PyMem_DEL(self);
}

PyMethodDef py_CK_INFO_methods[] = {
  {NULL, NULL}
};

PyObject *py_CK_INFO_getattr(PyObject *self, char *attrname)
{
    PyObject *result = 0;
    py_CK_INFO *pck_info = (py_CK_INFO *) self;

    if (strcmp(attrname, "cryptokiVersion") == 0) {
        result = PyTuple_New(2);
        PyTuple_SET_ITEM(result, 0, PyInt_FromLong(pck_info->ck_info.cryptokiVersion.major));
        PyTuple_SET_ITEM(result, 1, PyInt_FromLong(pck_info->ck_info.cryptokiVersion.minor));
    }
    else if (strcmp(attrname, "manufacturerID") == 0) {
        result = PyString_FromStringAndSize((const char *) pck_info->ck_info.manufacturerID, sizeof(pck_info->ck_info.manufacturerID));
    }
    else if (strcmp(attrname, "flags") == 0) {
        result = PyInt_FromLong((long) pck_info->ck_info.flags);
    }
    else if (strcmp(attrname, "libraryDescription") == 0) {
        result = PyString_FromStringAndSize((const char *) pck_info->ck_info.libraryDescription, sizeof(pck_info->ck_info.libraryDescription));
    }
    else if (strcmp(attrname, "libraryVersion") == 0) {
        result = PyTuple_New(2);
        PyTuple_SET_ITEM(result, 0, PyInt_FromLong(pck_info->ck_info.libraryVersion.major));
        PyTuple_SET_ITEM(result, 1, PyInt_FromLong(pck_info->ck_info.libraryVersion.minor));
    }
    else {
        result = Py_FindMethod(py_CK_INFO_methods, self, attrname);
    }
    return result;
}

int py_CK_INFO_setattr(PyObject *self, char *attrname, PyObject *value)
{
	py_CK_INFO *pck_info = (py_CK_INFO *) self;

    if (strcmp(attrname, "cryptokiVersion") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "manufacturerID") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "flags") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "libraryDescription") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "libraryVersion") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else {
        PyErr_SetString(PyExc_AttributeError, "unknown attribute");
    }

	return -1;
}

int py_CK_INFO_print(PyObject *self, FILE *fp, int i)
{
	py_CK_INFO *pck_info = (py_CK_INFO *) self;
    fprintf(fp, "py_CK_INFO (\n");
    fprintf(fp, "  cryptokiVersion (%d, %d)\n", pck_info->ck_info.cryptokiVersion.major, pck_info->ck_info.cryptokiVersion.minor);
    fputs("  manufacturerID \"", fp);
    fwrite(pck_info->ck_info.manufacturerID, sizeof(pck_info->ck_info.manufacturerID), 1, fp);
    fputs("\"\n", fp);
    fprintf(fp, "  flags 0x%x\n", pck_info->ck_info.flags);
    fputs("  libraryDescription \"", fp);
    fwrite(pck_info->ck_info.libraryDescription, sizeof(pck_info->ck_info.libraryDescription), 1, fp);
    fputs("\"\n", fp);
    fprintf(fp, "  libraryVersion (%d, %d)\n", pck_info->ck_info.libraryVersion.major, pck_info->ck_info.libraryVersion.minor);
    fprintf(fp, ")\n");
    return 0;
}

PyTypeObject py_CK_INFO_Type = {
	PyObject_HEAD_INIT(&PyType_Type)
	0,
	"py_CK_INFO",               /* char *tp_name; */
	sizeof(py_CK_INFO),       /* int tp_basicsize; */
	0,                        /* int tp_itemsize;       /* not used much */
	py_CK_INFO_dealloc,          /* destructor tp_dealloc; */
	py_CK_INFO_print,            /* printfunc  tp_print;   */
	py_CK_INFO_getattr,          /* getattrfunc  tp_getattr; /* __getattr__ */
	py_CK_INFO_setattr,          /* setattrfunc  tp_setattr;  /* __setattr__ */
	0/*py_CK_INFO_compare*/,          /* cmpfunc  tp_compare;  /* __cmp__ */
	0/*py_CK_INFO_repr*/,             /* reprfunc  tp_repr;    /* __repr__ */
	0/*&py_CK_INFO_as_number*/,       /* PyNumberMethods *tp_as_number; */
	0,                        /* PySequenceMethods *tp_as_sequence; */
	0,                        /* PyMappingMethods *tp_as_mapping; */
	0/*py_CK_INFO_hash*/,              /* hashfunc tp_hash;     /* __hash__ */
	0,                        /* ternaryfunc tp_call;  /* __call__ */
	0/*py_CK_INFO_str*/,              /* reprfunc tp_str;      /* __str__ */
};

PyObject *py_CK_INFO_NEW(void)
{
	py_CK_INFO *pck_info = (py_CK_INFO *) PyObject_NEW(py_CK_INFO, &py_CK_INFO_Type);
	return (PyObject *) pck_info;
}

//////////////////////////////////////////////////////////////////////////////////
//
// py_CK_TOKEN_INFO
//
//////////////////////////////////////////////////////////////////////////////////

void py_CK_TOKEN_INFO_dealloc(PyObject *self)
{
	py_CK_TOKEN_INFO *pck_token_info = (py_CK_TOKEN_INFO *) self;
	PyMem_DEL(self);
}

PyMethodDef py_CK_TOKEN_INFO_methods[] = {
  {NULL, NULL}
};

PyObject *py_CK_TOKEN_INFO_getattr(PyObject *self, char *attrname)
{
    PyObject *result = 0;
    py_CK_TOKEN_INFO *pck_token_info = (py_CK_TOKEN_INFO *) self;

    if (strcmp(attrname, "label") == 0) {
        result = PyString_FromStringAndSize((const char *) pck_token_info->token_info.label, sizeof(pck_token_info->token_info.label));
    }
    else if (strcmp(attrname, "manufacturerID") == 0) {
        result = PyString_FromStringAndSize((const char *) pck_token_info->token_info.manufacturerID, sizeof(pck_token_info->token_info.manufacturerID));
    }
    else if (strcmp(attrname, "model") == 0) {
        result = PyString_FromStringAndSize((const char *) pck_token_info->token_info.model, sizeof(pck_token_info->token_info.model));
    }
    else if (strcmp(attrname, "serialNumber") == 0) {
        result = PyString_FromStringAndSize((const char *) pck_token_info->token_info.serialNumber, sizeof(pck_token_info->token_info.serialNumber));
    }
    else if (strcmp(attrname, "flags") == 0) {
        result = PyInt_FromLong(pck_token_info->token_info.flags);
    }
    else if (strcmp(attrname, "ulMaxSessionCount") == 0) {
        result = PyLong_FromLong(pck_token_info->token_info.ulMaxSessionCount);
    }
    else if (strcmp(attrname, "ulSessionCount") == 0) {
        result = PyLong_FromLong(pck_token_info->token_info.ulSessionCount);
    }
    else if (strcmp(attrname, "ulMaxRwSessionCount") == 0) {
        result = PyLong_FromLong(pck_token_info->token_info.ulMaxRwSessionCount);
    }
    else if (strcmp(attrname, "ulRwSessionCount") == 0) {
        result = PyLong_FromLong(pck_token_info->token_info.ulRwSessionCount);
    }
    else if (strcmp(attrname, "ulMaxPinLen") == 0) {
        result = PyLong_FromLong(pck_token_info->token_info.ulMaxPinLen);
    }
    else if (strcmp(attrname, "ulMinPinLen") == 0) {
        result = PyLong_FromLong(pck_token_info->token_info.ulMinPinLen);
    }
    else if (strcmp(attrname, "ulTotalPublicMemory") == 0) {
        result = PyLong_FromLong(pck_token_info->token_info.ulTotalPublicMemory);
    }
    else if (strcmp(attrname, "ulFreePublicMemory") == 0) {
        result = PyLong_FromLong(pck_token_info->token_info.ulFreePublicMemory);
    }
    else if (strcmp(attrname, "ulTotalPrivateMemory") == 0) {
        result = PyLong_FromLong(pck_token_info->token_info.ulTotalPrivateMemory);
    }
    else if (strcmp(attrname, "ulFreePrivateMemory") == 0) {
        result = PyLong_FromLong(pck_token_info->token_info.ulFreePrivateMemory);
    }
    else if (strcmp(attrname, "hardwareVersion") == 0) {
        result = PyTuple_New(2);
        PyTuple_SET_ITEM(result, 0, PyInt_FromLong(pck_token_info->token_info.hardwareVersion.major));
        PyTuple_SET_ITEM(result, 1, PyInt_FromLong(pck_token_info->token_info.hardwareVersion.minor));
    }
    else if (strcmp(attrname, "firmwareVersion") == 0) {
        result = PyTuple_New(2);
        PyTuple_SET_ITEM(result, 0, PyInt_FromLong(pck_token_info->token_info.firmwareVersion.major));
        PyTuple_SET_ITEM(result, 1, PyInt_FromLong(pck_token_info->token_info.firmwareVersion.minor));
    }
    else if (strcmp(attrname, "utcTime") == 0) {
        result = PyString_FromStringAndSize((const char *) pck_token_info->token_info.utcTime, 16);
    }
    else {
        result = Py_FindMethod(py_CK_TOKEN_INFO_methods, self, attrname);
    }
    return result;
}

int py_CK_TOKEN_INFO_setattr(PyObject *self, char *attrname, PyObject *value)
{
	py_CK_TOKEN_INFO *pck_token_info = (py_CK_TOKEN_INFO *) self;

    if (strcmp(attrname, "label") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "manufacturerID") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "model") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "serialNumber") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "flags") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "ulMaxSessionCount") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "ulSessionCount") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "ulMaxRwSessionCount") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "ulRwSessionCount") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "ulMaxPinLen") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "ulMinPinLen") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "ulTotalPublicMemory") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "ulFreePublicMemory") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "ulTotalPrivateMemory") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "ulFreePrivateMemory") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "hardwareVersion") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "firmwareVersion") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "utcTime") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else {
        PyErr_SetString(PyExc_AttributeError, "unknown attribute");
    }

	return -1;
}

int py_CK_TOKEN_INFO_print(PyObject *self, FILE *fp, int i)
{
	py_CK_TOKEN_INFO *pck_token_info = (py_CK_TOKEN_INFO *) self;
    fprintf(fp, "py_CK_TOKEN_INFO (\n");
    fputs("  label \"", fp);
    fwrite(pck_token_info->token_info.label, sizeof(pck_token_info->token_info.label), 1, fp);
    fputs("\"\n", fp);
    fputs("  manufacturerID \"", fp);
    fwrite(pck_token_info->token_info.manufacturerID, sizeof(pck_token_info->token_info.manufacturerID), 1, fp);
    fputs("\"\n", fp);
    fputs("  model \"", fp);
    fwrite(pck_token_info->token_info.model, sizeof(pck_token_info->token_info.model), 1, fp);
    fputs("\"\n", fp);
    fputs("  serialNumber \"", fp);
    fwrite(pck_token_info->token_info.serialNumber, sizeof(pck_token_info->token_info.serialNumber), 1, fp);
    fputs("\"\n", fp);
    fprintf(fp, "  flags %d\n", pck_token_info->token_info.flags);
    fprintf(fp, "  ulMaxSessionCount %u\n", pck_token_info->token_info.ulMaxSessionCount);
    fprintf(fp, "  ulSessionCount %u\n", pck_token_info->token_info.ulSessionCount);
    fprintf(fp, "  ulMaxRwSessionCount %u\n", pck_token_info->token_info.ulMaxRwSessionCount);
    fprintf(fp, "  ulRwSessionCount %u\n", pck_token_info->token_info.ulRwSessionCount);
    fprintf(fp, "  ulMaxPinLen %u\n", pck_token_info->token_info.ulMaxPinLen);
    fprintf(fp, "  ulMinPinLen %u\n", pck_token_info->token_info.ulMinPinLen);
    fprintf(fp, "  ulTotalPublicMemory %u\n", pck_token_info->token_info.ulTotalPublicMemory);
    fprintf(fp, "  ulFreePublicMemory %u\n", pck_token_info->token_info.ulFreePublicMemory);
    fprintf(fp, "  ulTotalPrivateMemory %u\n", pck_token_info->token_info.ulTotalPrivateMemory);
    fprintf(fp, "  ulFreePrivateMemory %u\n", pck_token_info->token_info.ulFreePrivateMemory);
    fprintf(fp, "  hardwareVersion (%d, %d)\n", pck_token_info->token_info.hardwareVersion.major, pck_token_info->token_info.hardwareVersion.minor);
    fprintf(fp, "  firmwareVersion (%d, %d)\n", pck_token_info->token_info.firmwareVersion.major, pck_token_info->token_info.firmwareVersion.minor);
    fputs("  utcTime \"", fp);
    fwrite(pck_token_info->token_info.utcTime, sizeof(pck_token_info->token_info.utcTime), 1, fp);
    fputs("\"\n", fp);
    fprintf(fp, ")\n");

    return 0;
}

PyTypeObject py_CK_TOKEN_INFO_Type = {
	PyObject_HEAD_INIT(&PyType_Type)
	0,
	"py_CK_TOKEN_INFO",               /* char *tp_name; */
	sizeof(py_CK_TOKEN_INFO),       /* int tp_basicsize; */
	0,                        /* int tp_itemsize;       /* not used much */
	py_CK_TOKEN_INFO_dealloc,          /* destructor tp_dealloc; */
	py_CK_TOKEN_INFO_print,            /* printfunc  tp_print;   */
	py_CK_TOKEN_INFO_getattr,          /* getattrfunc  tp_getattr; /* __getattr__ */
	py_CK_TOKEN_INFO_setattr,          /* setattrfunc  tp_setattr;  /* __setattr__ */
	0/*py_CK_TOKEN_INFO_compare*/,          /* cmpfunc  tp_compare;  /* __cmp__ */
	0/*py_CK_TOKEN_INFO_repr*/,             /* reprfunc  tp_repr;    /* __repr__ */
	0/*&py_CK_TOKEN_INFO_as_number*/,       /* PyNumberMethods *tp_as_number; */
	0,                        /* PySequenceMethods *tp_as_sequence; */
	0,                        /* PyMappingMethods *tp_as_mapping; */
	0/*py_CK_TOKEN_INFO_hash*/,              /* hashfunc tp_hash;     /* __hash__ */
	0,                        /* ternaryfunc tp_call;  /* __call__ */
	0/*py_CK_TOKEN_INFO_str*/,              /* reprfunc tp_str;      /* __str__ */
};

PyObject *py_CK_TOKEN_INFO_NEW(void)
{
	py_CK_TOKEN_INFO *pck_token_info = (py_CK_TOKEN_INFO *) PyObject_NEW(py_CK_TOKEN_INFO, &py_CK_TOKEN_INFO_Type);
	return (PyObject *) pck_token_info;
}

//////////////////////////////////////////////////////////////////////////////////
//
// py_CK_SLOT_INFO
//
//////////////////////////////////////////////////////////////////////////////////

void py_CK_SLOT_INFO_dealloc(PyObject *self)
{
	py_CK_SLOT_INFO *pck_info = (py_CK_SLOT_INFO *) self;
	PyMem_DEL(self);
}

PyMethodDef py_CK_SLOT_INFO_methods[] = {
  {NULL, NULL}
};

PyObject *py_CK_SLOT_INFO_getattr(PyObject *self, char *attrname)
{
    PyObject *result = 0;
    py_CK_SLOT_INFO *pck_slot_info = (py_CK_SLOT_INFO *) self;

    if (strcmp(attrname, "slotDescription") == 0) {
        result = PyString_FromStringAndSize((const char *) pck_slot_info->slot_info.slotDescription, sizeof(pck_slot_info->slot_info.slotDescription));
    }
    else if (strcmp(attrname, "manufacturerID") == 0) {
        result = PyString_FromStringAndSize((const char *) pck_slot_info->slot_info.manufacturerID, sizeof(pck_slot_info->slot_info.manufacturerID));
    }
    else if (strcmp(attrname, "flags") == 0) {
        result = PyInt_FromLong(pck_slot_info->slot_info.flags);
    }
    else if (strcmp(attrname, "hardwareVersion") == 0) {
        result = PyTuple_New(2);
        PyTuple_SET_ITEM(result, 0, PyInt_FromLong(pck_slot_info->slot_info.hardwareVersion.major));
        PyTuple_SET_ITEM(result, 1, PyInt_FromLong(pck_slot_info->slot_info.hardwareVersion.minor));
    }
    else if (strcmp(attrname, "firmwareVersion") == 0) {
        result = PyTuple_New(2);
        PyTuple_SET_ITEM(result, 0, PyInt_FromLong(pck_slot_info->slot_info.firmwareVersion.major));
        PyTuple_SET_ITEM(result, 1, PyInt_FromLong(pck_slot_info->slot_info.firmwareVersion.minor));
    }
    else {
        result = Py_FindMethod(py_CK_SLOT_INFO_methods, self, attrname);
    }
    return result;
}

int py_CK_SLOT_INFO_setattr(PyObject *self, char *attrname, PyObject *value)
{
	py_CK_SLOT_INFO *pck_slot_info = (py_CK_SLOT_INFO *) self;

    if (strcmp(attrname, "slotDescription") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "manufacturerID") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "flags") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "hardwareVersion") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else if (strcmp(attrname, "firmwareVersion") == 0) {
        PyErr_SetString(PyExc_AttributeError, "attribute is readonly");
    }
    else {
        PyErr_SetString(PyExc_AttributeError, "unknown attribute");
    }

	return -1;
}

int py_CK_SLOT_INFO_print(PyObject *self, FILE *fp, int i)
{
	py_CK_SLOT_INFO *pck_slot_info = (py_CK_SLOT_INFO *) self;
    fprintf(fp, "py_CK_SLOT_INFO (\n");
    fputs("  slotDescription \"", fp);
    fwrite(pck_slot_info->slot_info.slotDescription, sizeof(pck_slot_info->slot_info.slotDescription), 1, fp);
    fputs("\"\n", fp);
    fputs("  manufacturerID \"", fp);
    fwrite(pck_slot_info->slot_info.manufacturerID, sizeof(pck_slot_info->slot_info.manufacturerID), 1, fp);
    fputs("\"\n", fp);
    fprintf(fp, "  flags 0x%x\n", pck_slot_info->slot_info.flags);
    fprintf(fp, "  hardwareVersion (%d, %d)\n", pck_slot_info->slot_info.hardwareVersion.major, pck_slot_info->slot_info.hardwareVersion.minor);
    fprintf(fp, "  firmwareVersion (%d, %d)\n", pck_slot_info->slot_info.firmwareVersion.major, pck_slot_info->slot_info.firmwareVersion.minor);
    fprintf(fp, ")\n");
    return 0;
}

PyTypeObject py_CK_SLOT_INFO_Type = {
	PyObject_HEAD_INIT(&PyType_Type)
	0,
	"py_CK_SLOT_INFO",               /* char *tp_name; */
	sizeof(py_CK_SLOT_INFO),       /* int tp_basicsize; */
	0,                        /* int tp_itemsize;       /* not used much */
	py_CK_SLOT_INFO_dealloc,          /* destructor tp_dealloc; */
	py_CK_SLOT_INFO_print,            /* printfunc  tp_print;   */
	py_CK_SLOT_INFO_getattr,          /* getattrfunc  tp_getattr; /* __getattr__ */
	py_CK_SLOT_INFO_setattr,          /* setattrfunc  tp_setattr;  /* __setattr__ */
	0/*py_CK_SLOT_INFO_compare*/,          /* cmpfunc  tp_compare;  /* __cmp__ */
	0/*py_CK_SLOT_INFO_repr*/,             /* reprfunc  tp_repr;    /* __repr__ */
	0/*&py_CK_SLOT_INFO_as_number*/,       /* PyNumberMethods *tp_as_number; */
	0,                        /* PySequenceMethods *tp_as_sequence; */
	0,                        /* PyMappingMethods *tp_as_mapping; */
	0/*py_CK_SLOT_INFO_hash*/,              /* hashfunc tp_hash;     /* __hash__ */
	0,                        /* ternaryfunc tp_call;  /* __call__ */
	0/*py_CK_SLOT_INFO_str*/,              /* reprfunc tp_str;      /* __str__ */
};

PyObject *py_CK_SLOT_INFO_NEW(void)
{
	py_CK_SLOT_INFO *pck_slot_info = (py_CK_SLOT_INFO *) PyObject_NEW(py_CK_SLOT_INFO, &py_CK_SLOT_INFO_Type);
	return (PyObject *) pck_slot_info;
}



//
// Local Variables:
// tab-width: 4
// c-basic-offset: 4
// End:
//
