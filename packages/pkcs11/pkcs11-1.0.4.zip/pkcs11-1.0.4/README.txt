Python pkcs11 wrapper

This python extension module creates an object-oriented wrapper around PKCS11. That is, this wrapper will open up a pkcs11 module you have that is implemented in a .dll and allow you to call methods.

There isn't any documentation at this point but usage is quite straightforward. I endeavored to maintain similar naming to the real PKCS11 names. I drop the C_ and use a firstLowerCase convention for method names. Some things get wrapped up though like using C_FindObjectsInit. All the Init and then iteration is done inside the library so you just call findObjects passing a list of attributes and it takes care of the rest. For functions which return C structs I return python objects with attributes corresponding to the struct member names. 

All constants defined in PKCS11 are available at the module level. The module supports the following methods:

# The init_str keyword argument can be an initialization string to be passed
# in the pReserved field of the CK_C_INITIALIZE_ARGS structure. If the
# mutex keyword argument is passed and is not None then the pkcs11 module
# will also be passed mutex function pointers. It is known that the pkcs11
# module for CIE smartcards requires this in order to work.

open(pkcs11dll_filename, init_str=None, mutex=None) ==> <pkcs11dll object>

The pkcs11dll object supports the following methods:

getInfo() ==> <CK_INFO object> (just has attributes corresponding to the CK_INFO struct)
getSlotList() ==> (<slot_1_id>, <slot_2_id>, ....)
getSlotInfo(slot_id) ==> <CK_SLOT_INFO object>
getTokenInfo(slot_id) ==> <CK_TOKEN_INFO object>
getMechanismList(slot_id) ==> <CK_MECHANISM object>
getMechanismInfo(slot_id, mech_type) ==> (ulMinKeySize, ulMaxMeySize, flags)
openSession(slot_id) ==> <session object>

The session object supports the following methods:

login(user_type, pin) ==> None
logout() ==> None (this isn't really necessary, session automatically logs out when the object is deleted)
findObjects( ((attr, value), (attr, value),...) ) ==> (obj_id, ...)
getAttributeValue(obj_id, (attr, attr, ...)) ==> (value, value, ...)
setAttributeValue(obj_id, ( (attr, value), ...) ) ==> None
unwrapKey( (mech_type, mech_data), key_handle, wrapped_key_data, ( (attr, val), (attr, val), ...) ) ==> unwrapped_key_handle
encrypt( (mech_type, mech_data), key_handle, plaintext ) ==> ciphertext
sign( (mech_type, mech_data), key_handle, plaintext ) ==> ciphertext
deleteObject( object_handle ) ==> None
As you can see there are many other crypto functions which could be implemented but since my iButton device only unwraps keys and signs data I haven't bothered to put them in. Adding them is fairly straightforward. You can put them into pkcs11_session.cpp.

The struct-type objects:

CK_INFO:
	cryptokiVersion (tuple of 2 ints)
	manufacturerID (string)
	flags (int)
	libraryDescription (string)
	libraryVersion (tuple of 2 ints)

CK_TOKEN_INFO:
	label (string)
	manufacturerID (string)
	model (string)
	serialNumber (string)
	flags (int)
	ulMaxSessionCount (long)
	ulSessionCount (long)
	ulMaxRwSessionCount (long)
	ulRwSessionCount (long)
	ulMaxPinLen (long)
	ulMinPinLen (long)
	ulTotalPublicMemory (long)
	ulFreePublicMemory (long)
	ulTotalPrivateMemory (long)
	ulFreePrivateMemory (long)
	hardwareVersion (tuple of 2 ints)
	firmwareVersion (tuple of 2 ints)
	utcTime (string)

CK_SLOT_INFO:
	slotDescription (string)
	manufacturerID (string)
	flags (int)
	hardwareVersion (tuple of 2 ints)
	firmwareVersion (tuple of 2 ints)

And that's it for now.

December 19, 2003

--
Jens B. Jorgensen
jbj1@ultraemail.net
