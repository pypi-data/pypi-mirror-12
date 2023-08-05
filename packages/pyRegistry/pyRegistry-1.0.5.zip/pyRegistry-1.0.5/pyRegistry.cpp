//
// pyRegistry - a Python 2.X module providing object-oriented registry access
//
// Copyright (C) 2000-2010 Jens B. Jorgensen <jbj1@ultraemail.net>
//
// This program is free software; you can redistribute it and/or
// modify it under the terms of the GNU General Public License
// as published by the Free Software Foundation; either version 2
// of the License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with this program; if not, write to the Free Software
// Foundation, Inc., 59 Temple Place - Suite 330, Boston, MA  02111-1307, USA.
//

// Changes:
//
// 2003-04-10
// Thanks to Tim Evans for the patch so printing a registry object
// does not just print an empty string.

#include "stdafx.h"
#include "pyRegistry.h"

#ifdef _DEBUG
#undef _DEBUG
// I don't have the debugging libraries installed so we need to turn off this
// symbol so Python doesn't try to add the python debug libraries.
#include <Python.h>
#define _DEBUG
#else
#include <Python.h>
#endif


#include <string>
#include <malloc.h>

using namespace std;

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

struct registry {
	PyObject_HEAD
	HKEY hkey;
	bool is_open;
};

PyObject *registry_NEW(HKEY hk);

struct registryIter {
	PyObject_HEAD
	PyObject *registry_obj;
	DWORD idx;
};

PyObject *registryIter_NEW(PyObject *reg_obj);

void registry_dealloc(PyObject *self)
{
	registry *reg = (registry *) self;
	if (reg->is_open)
		RegCloseKey(reg->hkey);
	PyMem_DEL(self);
}

PyObject *registry_getValue(PyObject *self, PyObject *args)
{
	registry *reg = (registry *) self;

	char *value_name;

	if (!PyArg_ParseTuple(args, "s", &value_name))
		return NULL;

	// handle special case of HKEY_PERFORMANCE_DATA since the size of the data may
	// change rapidly and we don't know how big it is
	if (reg->hkey == HKEY_PERFORMANCE_DATA)
	{
		DWORD buf_size = 4096, result;
		char *buf = (char *) realloc(NULL, buf_size);

		while ((result = RegQueryValueEx(reg->hkey, value_name, NULL, NULL, (unsigned char *) buf, &buf_size)) == ERROR_MORE_DATA)
		{
			buf_size += 1024;
			if (!(buf = (char *) realloc(buf, buf_size)))
			{
				PyErr_SetString(PyExc_MemoryError, "not enough memory");
				return NULL;
			}
		}

		PyObject *retval = PyString_FromStringAndSize(buf, buf_size);
		free(buf);
		return retval;
	}

	DWORD val_type, buf_size, result;
	if ((result = RegQueryValueEx(reg->hkey, value_name, NULL, &val_type, NULL, &buf_size)) != ERROR_SUCCESS)
	{
		string errmsg = GetErrorMessage(result);
		PyErr_SetString(PyExc_OSError, errmsg.c_str());
		return NULL;
	}

	switch (val_type)
	{
	case REG_NONE:
		Py_INCREF(Py_None);
		return Py_None;
	case REG_DWORD:
		{
			DWORD dw;
			buf_size = sizeof(dw);
			RegQueryValueEx(reg->hkey, value_name, NULL, &val_type, (unsigned char *) &dw, &buf_size);
			return PyInt_FromLong(dw);
		}
		break;
	case REG_SZ:
	case REG_EXPAND_SZ:
	case REG_BINARY:
		{
			char *buf = 0;
			if (buf_size > 0)
			{
				buf = (char *) _alloca(buf_size);
				RegQueryValueEx(reg->hkey, value_name, NULL, &val_type, (unsigned char *) buf, &buf_size);
				if (val_type != REG_BINARY) buf_size--; // get rid of trailing null
			}
			return PyString_FromStringAndSize(buf, buf_size);
		}
		break;
	case REG_MULTI_SZ:
		{
			// we have to handle the special case of an empty but in this case we don't even
			// have to get the value!
			if (buf_size == 2)
				return PyTuple_New(0);


			char *buf = (char *) _alloca(buf_size);
			RegQueryValueEx(reg->hkey, value_name, NULL, &val_type, (unsigned char *) buf, &buf_size);


			// first we get the number of strings
			int count = 1;
			char *cp;
			for (cp = buf; *cp || *(cp+1); cp++)
			{
				if (!*cp) count++;
			}
			PyObject *list = PyTuple_New(count);

			cp = buf;
			for (int i = 0; i < count; i++)
			{
				PyTuple_SetItem(list, i, PyString_FromString(cp));
				while (*cp) cp++;
				cp++;
			}

			return list;
		}
		break;
	default:
		PyErr_SetString(PyExc_NotImplementedError, "unhandled registry type");
	}

	return NULL;
}

PyObject *registry_setValue(PyObject *self, PyObject *args)
{
	registry *reg = (registry *) self;

	char *value_name;
	PyObject *pobj;

	if (!PyArg_ParseTuple(args, "sO", &value_name, &pobj))
		return NULL;

	// how we set the variable depends on what type of data it is
	ssize_t data_size;
	DWORD data_type;
	unsigned char *data;
	bool do_unicode = false;

	if (PyString_Check(pobj))
	{
		data_size = PyString_Size(pobj);
		data = (unsigned char *) PyString_AsString(pobj);
		data_type = REG_SZ;
	}
	else if (PyInt_Check(pobj))
	{
		data = (unsigned char *) &((PyIntObject *) pobj)->ob_ival;
		data_size = sizeof(((PyIntObject *) pobj)->ob_ival);
		data_type = REG_DWORD;
	}
	else if (PyLong_Check(pobj))
	{
		data = (unsigned char *) _alloca(sizeof(unsigned long));
		*((unsigned long *) data) = PyLong_AsUnsignedLong(pobj);
		data_size = sizeof(long);
		data_type = REG_DWORD;
	}
	else if (PyList_Check(pobj))
	{
		// The only way this makes sense is if each item in the list is a 
		// string, so first we'll check them. While we're at it we'll get
		// the string size since we have to tally them up to allocate a
		// chunk of memory to copy them into.
		data_size = 0;
		int i;
		for (i = 0; i < PyList_Size(pobj); i++)
		{
			PyObject *item = PyList_GetItem(pobj, i);
			if (!PyString_Check(item))
			{
				PyErr_SetString(PyExc_ValueError, "list items must all be strings");
				return NULL;
			}
			data_size += PyString_Size(item) + 1;
		}
		data_size++; // for the final null terminator

		if (data_size == 1) // this is acceptable but we have to do things a little differently
		{
			data = (unsigned char *) _alloca(2);
			data[0] = data[1] = '\000';
			data_size = 2;
		}
		else
		{
			data = (unsigned char *) _alloca(data_size);
			int idx = 0;

			for (i = 0; i < PyList_Size(pobj); i++)
			{
				PyObject *item = PyList_GetItem(pobj, i);
				memcpy(&data[idx], PyString_AsString(item), PyString_Size(item));
				idx += PyString_Size(item);
				data[idx++] = '\000';
			}
			data[idx] = '\000';
		}
		data_type = REG_MULTI_SZ;
	}
	else if (PyTuple_Check(pobj))
	{
		// The only way this makes sense is if each item in the tuple is a 
		// string, so first we'll check them. While we're at it we'll get
		// the string size since we have to tally them up to allocate a
		// chunk of memory to copy them into.
		data_size = 0;
		int i;
		for (i = 0; i < PyTuple_Size(pobj); i++)
		{
			PyObject *item = PyTuple_GetItem(pobj, i);
			if (!PyString_Check(item))
			{
				PyErr_SetString(PyExc_ValueError, "tuple items must all be strings");
				return NULL;
			}
			data_size += PyString_Size(item) + 1;
		}
		data_size++; // for the final null terminator

		if (data_size == 1) // this is acceptable but we have to do things a little differently
		{
			data = (unsigned char *) _alloca(2);
			data[0] = data[1] = '\000';
			data_size = 2;
		}
		else
		{
			data = (unsigned char *) _alloca(data_size);
			int idx = 0;

			for (i = 0; i < PyTuple_Size(pobj); i++)
			{
				PyObject *item = PyTuple_GetItem(pobj, i);
				memcpy(&data[idx], PyString_AsString(item), PyString_Size(item));
				idx += PyString_Size(item);
				data[idx++] = '\000';
			}
			data[idx] = '\000';
		}
		data_type = REG_MULTI_SZ;
	}
	else if (PyUnicode_Check(pobj))
	{
		// ugh, we have to xlat the the name too!
		char *old_value_name = value_name;
		int name_len = strlen(value_name) + 1;

		value_name = (char *) _alloca(name_len * sizeof(wchar_t));
		mbstowcs((wchar_t *) value_name, old_value_name, name_len);

		data = (unsigned char *) PyUnicode_AsUnicode(pobj);
		data_size = PyUnicode_GetSize(pobj) * sizeof(wchar_t);
		data_type = REG_SZ;
		do_unicode = true;
	}
	else if (pobj == Py_None)
	{
		data_size = 0;
		data_type = REG_NONE;
	}
	else
	{
		PyErr_SetString(PyExc_TypeError, "can't handle value type");
		return NULL;
	}

	DWORD result;
	if (do_unicode)
		result = RegSetValueExW(reg->hkey, (wchar_t *) value_name, 0, data_type, data, data_size);
	else
		result = RegSetValueEx(reg->hkey, value_name, 0, data_type, data, data_size);

	if (result != ERROR_SUCCESS)
	{
		string errmsg = GetErrorMessage(result);
		PyErr_SetString(PyExc_OSError, errmsg.c_str());
		return NULL;
	}

	Py_INCREF(Py_None);
	return Py_None;
}

PyObject *registry_getValueNames(PyObject *self, PyObject *args)
{
	registry *reg = (registry *) self;

	// First we'll query the key to find out how many values there are.
	// That way we can allocate a tuple of the exact size we need. We'll
	// also get the longest value name so we can just allocate once.
	DWORD result;
	DWORD values, namelen;
	if ((result = RegQueryInfoKey(reg->hkey, NULL, NULL, NULL, NULL, NULL, NULL, &values, &namelen, NULL, NULL, NULL)) != ERROR_SUCCESS)
	{
		string errmsg = "Error querying key info: ";
		errmsg.append(GetErrorMessage(result));
		PyErr_SetString(PyExc_OSError, errmsg.c_str());
		return NULL;
	}
	namelen++; // add room for terminating NULL

	// create the tuple to hold our result
	PyObject *tuple = PyTuple_New(values);
	char *buf = (char *) _alloca(namelen);

	for (DWORD i = 0; i < values; i++)
	{
		DWORD sz = namelen;
		if ((result = RegEnumValue(reg->hkey, i, buf, &sz, NULL, NULL, NULL, NULL)) != ERROR_SUCCESS)
		{
			string errmsg = "Error getting value name: ";
			errmsg.append(GetErrorMessage(result));
			PyErr_SetString(PyExc_OSError, errmsg.c_str());
			Py_DECREF(tuple);
			return NULL;
		}
		PyTuple_SET_ITEM(tuple, i, PyString_FromStringAndSize(buf, sz));
	}

	return tuple;
}

PyObject *registry_deleteValue(PyObject *self, PyObject *args)
{
	registry *reg = (registry *) self;

	char *value_name;

	if (!PyArg_ParseTuple(args, "s", &value_name))
		return NULL;

	DWORD result;
	if ((result = RegDeleteValue(reg->hkey, value_name)) != ERROR_SUCCESS)
	{
		string errmsg = GetErrorMessage(result);
		PyErr_SetString(PyExc_OSError, errmsg.c_str());
		return NULL;
	}

	Py_INCREF(Py_None);
	return Py_None;
}

PyObject *registry_getKeyNames(PyObject *self, PyObject *args)
{
	registry *reg = (registry *) self;

	// First we'll query the key to find out how many subkeys there are.
	// That way we can allocate a tuple of the exact size we need. We'll
	// also get the longest key name so we can just allocate once.
	DWORD result;
	DWORD subkeys, subkeylen;
	if ((result = RegQueryInfoKey(reg->hkey, NULL, NULL, NULL, &subkeys, &subkeylen, NULL, NULL, NULL, NULL, NULL, NULL)) != ERROR_SUCCESS)
	{
		string errmsg = "Error querying key info: ";
		errmsg.append(GetErrorMessage(result));
		PyErr_SetString(PyExc_OSError, errmsg.c_str());
		return NULL;
	}
	subkeylen++; // add room for terminating NULL

	// create the tuple to hold our result
	PyObject *tuple = PyTuple_New(subkeys);
	char *buf = (char *) _alloca(subkeylen);

	for (DWORD i = 0; i < subkeys; i++)
	{
		DWORD sz = subkeylen;
		if ((result = RegEnumKeyEx(reg->hkey, i, buf, &sz, NULL, NULL, NULL, NULL)) != ERROR_SUCCESS)
		{
			string errmsg = "Error getting subkey name: ";
			errmsg.append(GetErrorMessage(result));
			PyErr_SetString(PyExc_OSError, errmsg.c_str());
			Py_DECREF(tuple);
			return NULL;
		}
		PyTuple_SET_ITEM(tuple, i, PyString_FromStringAndSize(buf, sz));
	}

	return tuple;
}

PyObject *registry_getSubKeys(PyObject *self, PyObject *args)
{
    PyErr_Warn(PyExc_DeprecationWarning, "registry.getSubKeys is deprecated in favor of the new name registry.getKeyNames and will go away in a future version");
    return registry_getKeyNames(self, args);
}

PyObject *registry_open(PyObject *self, PyObject *args)
{
	registry *reg = (registry *) self;

	char *subkey;
	if (!PyArg_ParseTuple(args, "s", &subkey))
		return NULL;
		
	DWORD result;
	HKEY hk;
	if ((result = RegOpenKeyEx(reg->hkey, subkey, 0, KEY_ALL_ACCESS, &hk)) != ERROR_SUCCESS)
	{
		string errmsg = GetErrorMessage(result);
		PyErr_SetString(PyExc_OSError, errmsg.c_str());
		return NULL;
	}

	return registry_NEW(hk);
}

PyObject *registry_deleteKey(PyObject *self, PyObject *args)
{
	registry *reg = (registry *) self;

	char *subkey;
	if (!PyArg_ParseTuple(args, "s", &subkey))
		return NULL;
		
	DWORD result;
	if ((result = RegDeleteKey(reg->hkey, subkey)) != ERROR_SUCCESS)
	{
		string errmsg = GetErrorMessage(result);
		PyErr_SetString(PyExc_OSError, errmsg.c_str());
		return NULL;
	}

	Py_INCREF(Py_None);
	return Py_None;
}

PyObject *registry_createKey(PyObject *self, PyObject *args)
{
	registry *reg = (registry *) self;

	char *subkey;
	if (!PyArg_ParseTuple(args, "s", &subkey))
		return NULL;
		
	DWORD result;
	HKEY hk;
	if ((result = RegCreateKeyEx(reg->hkey, subkey, 0, NULL, REG_OPTION_NON_VOLATILE, KEY_ALL_ACCESS, NULL, &hk, NULL)) != ERROR_SUCCESS)
	{
		string errmsg = GetErrorMessage(result);
		PyErr_SetString(PyExc_OSError, errmsg.c_str());
		return NULL;
	}

	return registry_NEW(hk);
}

PyObject *registry_close(PyObject *self, PyObject *args)
{
	registry *reg = (registry *) self;
	if (reg->is_open)
	{
		RegCloseKey(reg->hkey);
		reg->is_open = false;
	}
	Py_INCREF(Py_None);
	return Py_None;
}

PyMethodDef registry_methods[] = {
	{"getValue", registry_getValue, METH_VARARGS},
	{"setValue", registry_setValue, METH_VARARGS},
	{"getValueNames", registry_getValueNames, METH_VARARGS},
	{"deleteValue", registry_deleteValue, METH_VARARGS},
	{"getKeyNames", registry_getKeyNames, METH_VARARGS},
	{"getSubKeys", registry_getSubKeys, METH_VARARGS},
	{"open", registry_open, METH_VARARGS},
	{"close", registry_close, METH_VARARGS},
	{"deleteKey", registry_deleteKey, METH_VARARGS},
	{"createKey", registry_createKey, METH_VARARGS},
	{NULL, NULL}
};

PyObject *registry_getattr(PyObject *self, char *attrname)
{
  PyObject *result = 0;
  registry *reg = (registry *) self;

  if (strcmp(attrname, "hkey") == 0) {
    result = PyInt_FromLong((long) reg->hkey);
  }
  else {
    result = Py_FindMethod(registry_methods, self, attrname);
  }
  return result;
}

int registry_setattr(PyObject *self, char *attrname, PyObject *value)
{
	registry *reg = (registry *) self;

	if (!strcmp(attrname, "hkey"))
	{
		if (!PyInt_Check(value))
		{
			PyErr_SetString(PyExc_TypeError, "hkey must be an int");
			return -1;
		}

		if (reg->is_open)
			RegCloseKey(reg->hkey);

		reg->hkey = (HKEY) PyInt_AsLong(value);
		return 0;
	}

	PyErr_SetString(PyExc_AttributeError, "unknown attribute");
	return -1;
}

PyObject *registry_repr(PyObject *self)
{
      const char *state;
      registry *reg = (registry *) self;

      if (reg->is_open) {
              state = "open";
      } else {
              state = "closed";
      }
      return PyString_FromFormat("<%s registry object at %p>", state, reg);
}

void registryIter_dealloc(PyObject *self)
{
	registryIter *reg_iter = (registryIter *) self;
    Py_DECREF(reg_iter->registry_obj);
	PyMem_DEL(self);
}

// for convenience we use this function which will iteratively try to
// call RegEnumKeyEx repeatedly as necessary to get a buffer big enough
// to hold the whole name
DWORD reg_enum_key(HKEY hk, DWORD idx, string &s)
{
    DWORD err;
    DWORD sz = 256;
    FILETIME last_write;
    s.resize(sz);
    while ((err = RegEnumKeyEx(hk, idx, &s[0], &sz, 0, NULL, NULL, &last_write)) == ERROR_MORE_DATA) {
        s.resize(sz);
    }
    if (err == ERROR_SUCCESS) {
        s.resize(sz); // get rid of null
    }
    return err;
}

PyObject *registryIter_iternext(PyObject *self)
{
	registryIter *reg_iter = (registryIter *) self;
    // make sure that the user has not closed our object in the mean time
    registry *reg = (registry *) reg_iter->registry_obj;
    if (!reg->is_open) {
        PyErr_SetString(PyExc_RuntimeError, "registry object is closed, cannot iterate");
        return NULL;
    }
    string subkey_name;
    DWORD result;
    switch (result = reg_enum_key(reg->hkey, reg_iter->idx, subkey_name)) {
    case ERROR_SUCCESS:
        reg_iter->idx++;
        return PyString_FromStringAndSize(subkey_name.data(), subkey_name.size());
    case ERROR_NO_MORE_ITEMS:
        return NULL;
            
    default:
        string errmsg = GetErrorMessage(result);
        PyErr_SetString(PyExc_OSError, errmsg.c_str());
        return NULL;
    }
    // not reached
    return NULL;
}

PyTypeObject registry_Type = {
	PyObject_HEAD_INIT(&PyType_Type)
	0,
	"registry",               /* char *tp_name; */
	sizeof(registry),       /* int tp_basicsize; */
	0,                        /* int tp_itemsize;       /* not used much */
	registry_dealloc,          /* destructor tp_dealloc; */
	0,            /* printfunc  tp_print;   */
	registry_getattr,          /* getattrfunc  tp_getattr; /* __getattr__ */
	registry_setattr,          /* setattrfunc  tp_setattr;  /* __setattr__ */
	0/*registry_compare*/,          /* cmpfunc  tp_compare;  /* __cmp__ */
	registry_repr,             /* reprfunc  tp_repr;    /* __repr__ */
	0/*&registry_as_number*/,       /* PyNumberMethods *tp_as_number; */
	0,                        /* PySequenceMethods *tp_as_sequence; */
	0,                        /* PyMappingMethods *tp_as_mapping; */
	0/*registry_hash*/,              /* hashfunc tp_hash;     /* __hash__ */
	0,                        /* ternaryfunc tp_call;  /* __call__ */
	0/*registry_str*/,              /* reprfunc tp_str;      /* __str__ */
    0/*getattrofunc tp_getattro*/,
    0/*setattrofunc tp_setattro*/,
    0/*PyBufferProcs *tp_as_buffer*/,
    /* Flags to define presence of optional/expanded features */
    Py_TPFLAGS_DEFAULT|Py_TPFLAGS_HAVE_ITER/*long tp_flags;*/,
    "registry Object", /*char *tp_doc Documentation string */
    0/*traverseproc tp_traverse*/,
    0/*inquiry tp_clear*/,
    0/*richcmpfunc tp_richcompare*/,
    0/*long tp_weaklistoffset*/,
    registryIter_NEW/*getiterfunc tp_iter*/,
};

PyTypeObject registryIter_Type = {
	PyObject_HEAD_INIT(&PyType_Type)
	0,
	"registryIter",               /* char *tp_name; */
	sizeof(registryIter),       /* int tp_basicsize; */
	0,                        /* int tp_itemsize;       /* not used much */
	registryIter_dealloc,          /* destructor tp_dealloc; */
	0,            /* printfunc  tp_print;   */
	0,          /* getattrfunc  tp_getattr; /* __getattr__ */
	0,          /* setattrfunc  tp_setattr;  /* __setattr__ */
	0/*registryIter_compare*/,          /* cmpfunc  tp_compare;  /* __cmp__ */
	0,             /* reprfunc  tp_repr;    /* __repr__ */
	0/*&registryIter_as_number*/,       /* PyNumberMethods *tp_as_number; */
	0,                        /* PySequenceMethods *tp_as_sequence; */
	0,                        /* PyMappingMethods *tp_as_mapping; */
	0/*registryIter_hash*/,              /* hashfunc tp_hash;     /* __hash__ */
	0,                        /* ternaryfunc tp_call;  /* __call__ */
	0/*registryIter_str*/,              /* reprfunc tp_str;      /* __str__ */
    0/*getattrofunc tp_getattro*/,
    0/*setattrofunc tp_setattro*/,
    0/*PyBufferProcs *tp_as_buffer*/,
    /* Flags to define presence of optional/expanded features */
    Py_TPFLAGS_DEFAULT/*long tp_flags;*/,
    "registryIter Object", /*char *tp_doc Documentation string */
    0/*traverseproc tp_traverse*/,
    0/*inquiry tp_clear*/,
    0/*richcmpfunc tp_richcompare*/,
    0/*long tp_weaklistoffset*/,
    0/*getiterfunc tp_iter*/,
    registryIter_iternext/*iternextfunc tp_iternext*/,
};

PyObject *registry_NEW(HKEY hk)
{
	registry *reg = (registry *) PyObject_NEW(registry, &registry_Type);
	if (reg) {
		reg->hkey = hk;
		reg->is_open = true;
	}
	return (PyObject *) reg;
}

// returns a new iterator object. iterate over keys only for now
PyObject *registryIter_NEW(PyObject *reg_obj)
{
	registryIter *regiter = (registryIter *) PyObject_NEW(registryIter, &registryIter_Type);
	if (regiter) {
        if (!((registry *)reg_obj)->is_open) {
            PyErr_SetString(PyExc_RuntimeError, "registry object is closed, cannot iterate");
            return NULL;
        }
        regiter->registry_obj = reg_obj;
        Py_INCREF(reg_obj);
		regiter->idx = 0;
	}
	return (PyObject *) regiter;
}

PyObject *pyRegistry_open(PyObject *self, PyObject *args)
{
	char *key_s;

	if (!PyArg_ParseTuple(args, "s", &key_s))
		return NULL;

	// check for the path-separator character to find the first (or only) part
	// of the key
	string key(key_s);

	string::size_type idx = key.find_first_of('\\');
	string comp = key.substr(0, idx);

	HKEY hk;
	if (comp == "HKEY_LOCAL_MACHINE" || comp == "HKLM")
		hk = HKEY_LOCAL_MACHINE;
	else if (comp == "HKEY_CURRENT_USER" || comp == "HKCU")
		hk = HKEY_CURRENT_USER;
	else if (comp == "HKEY_CLASSES_ROOT" || comp == "HKCR")
		hk = HKEY_CLASSES_ROOT;
	else if (comp == "HKEY_USERS" || comp == "HKU")
		hk = HKEY_USERS;
	else if (comp == "HKEY_CURRENT_CONFIG" || comp == "HKCC")
		hk = HKEY_CURRENT_CONFIG;
	else if (comp == "HKEY_PERFORMANCE_DATA" || comp == "HKPD")
		hk = HKEY_PERFORMANCE_DATA;
	else
	{
		PyErr_SetString(PyExc_ValueError, "first part of key must HKEY_LOCAL_MACHINE, HKEY_CURRENT_USER, etc.");
		return NULL;
	}
	
	if (idx == string::npos)
		return registry_NEW(hk);

	string path = key.substr(idx+1);
	DWORD result;
	if ((result = RegOpenKeyEx(hk, path.c_str(), 0, KEY_ALL_ACCESS, &hk)) != ERROR_SUCCESS)
	{
		string errmsg = GetErrorMessage(result);
		PyErr_SetString(PyExc_OSError, errmsg.c_str());
		return NULL;
	}

	return registry_NEW(hk);
}

PyMethodDef pyRegistry_methods[] = {
	{"open", pyRegistry_open, METH_VARARGS, "open(key) returns the registry object for the keypath key"},
	{NULL, NULL}
};

extern "C" PYREGISTRY_API void initpyRegistry()
{
	Py_InitModule("pyRegistry", pyRegistry_methods);
}

