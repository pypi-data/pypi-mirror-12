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

#include <aerospike/as_arraylist.h>
#include <aerospike/as_error.h>

#include "client.h"
#include "conversions.h"
#include "exceptions.h"
#include "geo.h"
#include "policy.h"
PyObject * AerospikeGeospatial_DoLoads(PyObject *py_geodata, as_error *err)
{
        PyObject* sysmodules = PyImport_GetModuleDict();
		PyObject* json_module = NULL;
		if (PyMapping_HasKeyString(sysmodules, "json")) {
		    json_module = PyMapping_GetItemString(sysmodules, "json");
	    } else {
			json_module = PyImport_ImportModule("json");
		}

		PyObject* initresult = NULL;
		if (!json_module) {
		    /* insert error handling here! and exit this function */
			as_error_update(err, AEROSPIKE_ERR_CLIENT, "Unable to load json module");
		} else {
            PyObject *py_funcname = PyString_FromString("loads");
            Py_INCREF(json_module);
            initresult = PyObject_CallMethodObjArgs(json_module, py_funcname, py_geodata, NULL);
            Py_DECREF(json_module);
            Py_DECREF(py_funcname);
        }
        return initresult;
}
PyObject * AerospikeGeospatial_Loads(AerospikeGeospatial * self, PyObject * args, PyObject * kwds)
{

	// Python function arguments
	PyObject * py_geodata = NULL;
	// Python function keyword arguments
	static char * kwlist[] = {"geodata", NULL};

	if ( PyArg_ParseTupleAndKeywords(args, kwds, "O:loads", kwlist, &py_geodata) == false ){
		return NULL;
	}

	// Aerospike error object
	as_error err;
	// Initialize error object
	as_error_init(&err);

	if (!self) {
		as_error_update(&err, AEROSPIKE_ERR_PARAM, "Invalid geospatial data");
		goto CLEANUP;
	}

    PyObject* initresult = NULL;
    if (PyString_Check(py_geodata))
    {  
        initresult = AerospikeGeospatial_DoLoads(py_geodata, &err);
        if(!initresult) {
			as_error_update(&err, AEROSPIKE_ERR_CLIENT, "String is not GeoJSON serializable");
			goto CLEANUP;
        } else {
            store_geodata(self, &err, initresult);
        }
    } else {
		as_error_update(&err, AEROSPIKE_ERR_PARAM, "Argument should be a GeoJSON string");
		goto CLEANUP;
    }

CLEANUP:

	// If an error occurred, tell Python.
	if ( err.code != AEROSPIKE_OK ) {
		PyObject * py_err = NULL;
		error_to_pyobject(&err, &py_err);
		PyObject *exception_type = raise_exception(&err);
		PyErr_SetObject(exception_type, py_err);
		Py_DECREF(py_err);
		return NULL;
	}

	return PyLong_FromLong(0);
}

