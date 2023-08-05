
// The following ifdef block is the standard way of creating macros which make exporting 
// from a DLL simpler. All files within this DLL are compiled with the PKCS11_EXPORTS
// symbol defined on the command line. this symbol should not be defined on any project
// that uses this DLL. This way any other project whose source files include this file see 
// PKCS11_API functions as being imported from a DLL, wheras this DLL sees symbols
// defined with this macro as being exported.
#ifdef PKCS11_EXPORTS
#define PKCS11_API __declspec(dllexport)
#else
#define PKCS11_API __declspec(dllimport)
#endif

struct py_CK_INFO {
    PyObject_HEAD
    CK_INFO ck_info;
};
PyObject *py_CK_INFO_NEW(void);

struct py_CK_TOKEN_INFO {
    PyObject_HEAD
    CK_TOKEN_INFO token_info;
};
PyObject *py_CK_TOKEN_INFO_NEW(void);

struct py_CK_SLOT_INFO {
    PyObject_HEAD
    CK_SLOT_INFO slot_info;
};
PyObject *py_CK_SLOT_INFO_NEW(void);
