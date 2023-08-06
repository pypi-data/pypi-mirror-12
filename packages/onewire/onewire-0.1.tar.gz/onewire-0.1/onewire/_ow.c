#include <Python.h>
#include <owcapi.h>


static PyObject *init(PyObject *self, PyObject *args) {
    char *device;

    if (!PyArg_ParseTuple(args, "s", &device))
        return NULL;

    return Py_BuildValue("i", OW_init(device));
};

static PyObject *get(PyObject *self, PyObject *args) {
    char *path;
    char *buffer;
    size_t buffer_length = 0;

    if (!PyArg_ParseTuple(args, "s", &path))
        return NULL;

    OW_get(path, &buffer, &buffer_length);
    PyObject *reval = Py_BuildValue("s", buffer);

    free(buffer);
    return reval;
};

static PyObject *finish(PyObject *self, PyObject *args) {
    OW_finish();
    Py_RETURN_NONE;
};

static PyMethodDef _ow_methods[] = {
    {"init", init, METH_VARARGS, "Initialize 1-wire."},
    {"get", get, METH_VARARGS, "Get data from 1-wire."},
    {"finish", finish, METH_VARARGS, "Clenup the library."},
    {NULL, NULL, 0, NULL}
};

#if PY_MAJOR_VERSION >= 3

static struct PyModuleDef moduledef = {
        PyModuleDef_HEAD_INIT,
        "_ow",
        NULL,
        0,
        _ow_methods,
        NULL,
        NULL,
        NULL,
        NULL
};

PyObject * PyInit__ow(void)

#else

void init_ow(void)
#endif

{

#if PY_MAJOR_VERSION >= 3
    PyObject *module = PyModule_Create(&moduledef);
#else
    Py_InitModule("_ow", _ow_methods);
#endif

#if PY_MAJOR_VERSION >= 3
    return module;
#endif

    // Py_InitModule("_ow", _ow_methods);
}

// #endif
