/*******************************************************************************
 * Copyright 2013-2015 Aerospike, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 ******************************************************************************/

#include <Python.h>
#include <stdbool.h>

#include <aerospike/aerospike_key.h>
#include <aerospike/as_key.h>
#include <aerospike/as_error.h>

#include "client.h"
#include "conversions.h"
#include "exceptions.h"
#include "key.h"
#include "policy.h"

PyObject * AerospikeClient_Get_Key_Digest_Invoke(
	AerospikeClient * self,
	PyObject * py_ns, PyObject *py_set, PyObject * py_key)
{
	// Python Return Value
	PyObject * py_keydict = NULL;
	PyObject * py_value = NULL;

	// Aerospike Client Arguments
	as_error err;
	as_key key;
	as_digest *digest;

	size_t len;

	// Initialised flags
	bool key_initialised = false;

	if ( !PyString_Check(py_ns) ) {
		PyErr_SetString(PyExc_TypeError, "Namespace should be a string");
		return NULL;
	}
	if ( !PyString_Check(py_set)  && !PyUnicode_Check(py_set) ) {
		PyErr_SetString(PyExc_TypeError, "Set should be a string or unicode");
		return NULL;
	}
	if ( !PyString_Check(py_key)  && !PyUnicode_Check(py_key) && !PyInt_Check(py_key) && !PyLong_Check(py_key) && !PyByteArray_Check(py_key) ) {
		PyErr_SetString(PyExc_TypeError, "Key is invalid");
		return NULL;
	}
	// Initialize error
	as_error_init(&err);

	if (!self || !self->as) {
		as_error_update(&err, AEROSPIKE_ERR_PARAM, "Invalid aerospike object");
		goto CLEANUP;
	}

	if (!self->is_conn_16) {
		as_error_update(&err, AEROSPIKE_ERR_CLUSTER, "No connection to aerospike cluster");
		goto CLEANUP;
	}

	py_keydict = PyDict_New();
	PyDict_SetItemString(py_keydict, "ns", py_ns);
	PyDict_SetItemString(py_keydict, "set", py_set);
	PyDict_SetItemString(py_keydict, "key", py_key);

	// Convert python key object to as_key
	pyobject_to_key(&err, py_keydict, &key);
	if ( err.code != AEROSPIKE_OK ) {
		goto CLEANUP;
	}
	// Key is successfully initialised.
	key_initialised = true;

	// Invoke operation
	digest = as_key_digest(&key);
	if(digest->init) {
		len = sizeof(digest->value);
		PyObject *py_len = PyLong_FromSize_t(len);
		Py_ssize_t py_length =  PyLong_AsSsize_t(py_len);
		py_value = PyByteArray_FromStringAndSize((const char *)digest->value,
				py_length);
		Py_DECREF(py_len);
	} else {
		as_error_update(&err, AEROSPIKE_ERR_CLIENT, "Digest could not be calculated");
		goto CLEANUP;
	}

CLEANUP:
	if (key_initialised == true){
		// Destroy key only if it is initialised.
		as_key_destroy(&key);
	}
	if (py_keydict) {
		Py_DECREF(py_keydict);
	}

	if ( err.code != AEROSPIKE_OK ) {
		PyObject * py_err = NULL;
		error_to_pyobject(&err, &py_err);
		PyObject *exception_type = raise_exception(&err);
		PyErr_SetObject(exception_type, py_err);
		Py_DECREF(py_err);
		return NULL;
	}

	return py_value;
}

PyObject * AerospikeClient_Get_Key_Digest(AerospikeClient * self, PyObject * args, PyObject * kwds)
{
	// Python Function Arguments
	PyObject * py_ns = NULL;
	PyObject * py_set = NULL;
	PyObject * py_key = NULL;

	// Python Function Keyword Arguments
	static char * kwlist[] = {"ns", "set", "key", NULL};

	// Python Function Argument Parsing
	if ( PyArg_ParseTupleAndKeywords(args, kwds, "OOO:get_key_digest", kwlist,
			&py_ns, &py_set, &py_key) == false ) {
		return NULL;
	}

	// Invoke Operation
	return AerospikeClient_Get_Key_Digest_Invoke(self, py_ns, py_set, py_key);
}
