/*
 * Convenience functions for fastnumbers.
 *
 * Author: Seth M. Morton, Aug. 2, 2014
 */

#include <Python.h>
#include "convenience.h"

/* Used to determine if a float is so large it lost precision. */
const double maxsize = 9007199254740992;  /* 2^53 */

/* 
 * Convert a string to a character array.
 * If unsuccessful, raise a TypeError.
 * A return value of NULL means an error occurred.
 */
void convert_string(PyObject *input, char **str, Py_UCS4 *uni) {
    PyObject *temp_bytes = NULL;
    PyObject *stripped = NULL;
    Py_ssize_t s_len;
    char *s;
    *str = NULL;
    *uni = NULL_UNI;
    /* Try Bytes (Python2 str). */
    if (PyBytes_Check(input)) {
        PyBytes_AsStringAndSize(input, &s, &s_len);
        *str = malloc((size_t)s_len + 1);
        strcpy(*str, s);
    /* Try Unicode. */
    } else if (PyUnicode_Check(input)) {
        /* Now convert this unicode object to a char* as ASCII, if possible. */
        temp_bytes = PyUnicode_AsEncodedString(input, "ascii", "strict");
        if (temp_bytes != NULL) {
            PyBytes_AsStringAndSize(temp_bytes, &s, &s_len);
            *str = malloc((size_t)s_len + 1);
            strcpy(*str, s);
            Py_DECREF(temp_bytes);
        }
        /* If char* didn't work, try a single Py_UCS4 character. */
        /* If at any point it is found that the input is not valid Unicode */
        /* or more than one character, simply return a space. */
        /* Strip whitespace from input first if not of length 1. */
        else {
#if PY_MAJOR_VERSION == 3 && PY_MINOR_VERSION >= 3
            if (PyUnicode_READY(input)) {
                *uni = (Py_UCS4) ' ';
            } else {
                if (PyUnicode_GET_LENGTH(input) == 1) {
                    *uni = PyUnicode_READ_CHAR(input, 0);
                } else {
                    stripped = PyObject_CallMethod(input, "strip", NULL);
                    *uni = PyUnicode_GET_LENGTH(stripped) == 1 ?
                           PyUnicode_READ_CHAR(stripped, 0) :
                           (Py_UCS4) ' ';
                    Py_DECREF(stripped);
                }
            }
#else
            if (PySequence_Length(input) == 1) {
                *uni = (Py_UCS4) PyUnicode_AS_UNICODE(input)[0];
            } else {
                stripped = PyObject_CallMethod(input, "strip", NULL);
                *uni = PySequence_Length(stripped) == 1 ?
                       (Py_UCS4) PyUnicode_AS_UNICODE(stripped)[0] :
                       (Py_UCS4) ' ';
                Py_DECREF(stripped);
            }
#endif
            PyErr_Clear();
        }
    /* If none of the above, not a string type. */
    } else {
        PyErr_Format(PyExc_TypeError,
                     "expected str, float, or int argument, got %.200s",
                     input->ob_type->tp_name);
    }
}

/* Case-insensitive string match used for nan and inf detection; t should be
   lower-case.  Returns 1 for a successful match, 0 otherwise.
   Taken from the Python pystrtod.c source code. */
bool case_insensitive_match(const char *s, const char *t)
{
    while(*t && Py_TOLOWER(*s) == *t) {
        s++;
        t++;
    }
    return *t ? 0 : 1;
}

/* Handle errors. Return the appropriate return value for the error situation. */
PyObject * handle_error(PyObject *input,
                        PyObject *default_value,
                        const bool raise_on_invalid,
                        const bool bad_inf,
                        const bool bad_nan,
                        const char* str,
                        const Py_UCS4 uni)
{
    /* If an error should be raised, raise the proper error. */
    if (raise_on_invalid) {
        if (bad_inf) {
            PyErr_SetString(PyExc_OverflowError,
                            "cannot convert Infinity to integer");
        }
        else if (bad_nan) {
            PyErr_SetString(PyExc_ValueError,
                            "cannot convert NaN to integer");
        }
        else if (str != NULL) {
            PyErr_Format(PyExc_ValueError,
                         "could not convert string to float or int: '%s'",
                         str);
        }
        else {
            PyErr_Format(PyExc_ValueError,
                         "could not convert string to float or int: '%c'",
                         uni);
        }
        return NULL;
    }

    /* If a default value is given, return that. */
    else if (default_value != NULL) {
        return default_value;
    }

    /* Otherwise, return the input as given. */
    else {
        return input;
    }
}

#if PY_MAJOR_VERSION == 2
/* Convert a PyString to a PyFloat, possibly removing trailing 'L' because */
/* of a long literal. Should only be used on Python 2. */
/* Assume input has been checked for legality prior to use. */
PyObject * convert_PyString_to_PyFloat_possible_long_literal(PyObject *s)
{
    PyObject *result = NULL, *stripped1 = NULL, *stripped2 = NULL;
    result = PyFloat_FromString(s, NULL);
    if (result == NULL) {
        PyErr_Clear();
        stripped1 = PyObject_CallMethod(s, "rstrip", NULL);
        stripped2 = PyObject_CallMethod(stripped1, "rstrip", "s", "lL");
        result = PyFloat_FromString(stripped2, NULL);
        Py_DECREF(stripped1);
        Py_DECREF(stripped2);
    }
    return result;
}
#endif
