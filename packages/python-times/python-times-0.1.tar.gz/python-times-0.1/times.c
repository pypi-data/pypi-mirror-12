/* Get the real, user and system time used by your Python programs from your 
 * Python code. 
 *
 * This file implements a new type called Times to pick up the real, user
 * and system time used for a while by one Python program. This type is a 
 * Python implementation of the bash command called time to be used by the
 * programmer to check those times wherever of code he want.
 *
 * Once the Times is instantiated it picks up the current values of the clock
 * system using the times syscall, to ask for the time spent from when it was
 * instatiated we can use the times method publised by the Times type.
 *
 * As exampe:
 *
 * >>> import time
 * >>> from times import Times
 * >>> t = Times()
 * >>> time.sleep(1)
 * >>> print "Real {0}s, User {1}s, Sys {2}s".format(*t.times())
 * Real 1.0s, User 0.0s, Sys 0.0s
 *
 * The output is the real, user and system time.
 *
 * ----------------------------------------------------------------------------
 * Copyright (c) 2015 Pau Freixes <pfreixes_at_gmail_dot_com>.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms are permitted
 * provided that the above copyright notice and this paragraph are
 * duplicated in all such forms and that any documentation,
 * advertising materials, and other materials related to such
 * distribution and use acknowledge that the software was developed
 * by the Pau Freixes. The name of the Pau Freixes may not be 
 * used to endorse or promote products derived from this software 
 * without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED ``AS IS'' AND WITHOUT ANY EXPRESS OR
 * IMPLIED WARRANTIES, INCLUDING, WITHOUT LIMITATION, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.
 * Copyright (c) 2015, Pau Freixes <pfreixes at gmail dot com>
 * All rights reserved.
 */
#include <Python.h>

#include <sys/times.h>
#include <stdio.h>

#ifndef HZ
# include <sys/param.h>
#endif
#if !defined(HZ) && defined(CLOCKS_PER_SEC)
# define HZ CLOCKS_PER_SEC
#endif
#if !defined(HZ) && defined(CLK_TCK)
# define HZ CLK_TCK
#endif
#ifndef HZ
# define HZ 60
#endif

typedef struct {
    PyObject_HEAD
    clock_t clocks_start;
    struct tms start;
}Times;


static int Times_init(Times *self, PyObject *args, PyObject *kwds)
{
    // get the current clock counter and the user and sytem clocks
    self->clocks_start = times(&self->start);
    return 0;
}

static PyObject * Times_times(Times* self)
{
    clock_t clocks_end;
    struct tms elapsed;
    double rtime, utime, stime;

    // get the current clock counter and the user and sytem clocks
    clocks_end = times(&elapsed);

    // get the amount of times used
    rtime = ((double) (clocks_end - self->clocks_start)) / HZ;
    utime = ((double) (elapsed.tms_utime - self->start.tms_utime)) / HZ;
    stime = ((double) (elapsed.tms_stime - self->start.tms_stime)) / HZ;

    // convert to Python objects
    return PyTuple_Pack(3, PyFloat_FromDouble(rtime), PyFloat_FromDouble(utime), PyFloat_FromDouble(stime));
}

static PyMethodDef Times_methods[] = {
    {"times", (PyCFunction)Times_times, METH_NOARGS,
     "Return the real, user and sys time"
    },
    {NULL}  /* Sentinel */
};


static PyTypeObject Times_TimesType = {
    PyObject_HEAD_INIT(NULL)
    0,                         /*ob_size*/
    "times.Times",             /*tp_name*/
    sizeof(Times), /*tp_basicsize*/
    0,                         /*tp_itemsize*/
    0,                         /*tp_dealloc*/
    0,                         /*tp_print*/
    0,                         /*tp_getattr*/
    0,                         /*tp_setattr*/
    0,                         /*tp_compare*/
    0,                         /*tp_repr*/
    0,                         /*tp_as_number*/
    0,                         /*tp_as_sequence*/
    0,                         /*tp_as_mapping*/
    0,                         /*tp_hash */
    0,                         /*tp_call*/
    0,                         /*tp_str*/
    0,                         /*tp_getattro*/
    0,                         /*tp_setattro*/
    0,                         /*tp_as_buffer*/
    Py_TPFLAGS_DEFAULT,        /*tp_flags*/
    "Times objects",           /* tp_doc */
    0,		               /* tp_traverse */
    0,		               /* tp_clear */
    0,		               /* tp_richcompare */
    0,		               /* tp_weaklistoffset */
    0,		               /* tp_iter */
    0,		               /* tp_iternext */
    Times_methods,             /* tp_methods */
    0,                         /* tp_members */
    0,                         /* tp_getset */
    0,                         /* tp_base */
    0,                         /* tp_dict */
    0,                         /* tp_descr_get */
    0,                         /* tp_descr_set */
    0,                         /* tp_dictoffset */
    (initproc)Times_init,      /* tp_init */
    0,                         /* tp_alloc */
};

#ifndef PyMODINIT_FUNC	/* declarations for DLL import/export */
#define PyMODINIT_FUNC void
#endif
PyMODINIT_FUNC
inittimes(void) 
{
    PyObject* m;

    Times_TimesType.tp_new = PyType_GenericNew;
    if (PyType_Ready(&Times_TimesType) < 0)
        return;

    m = Py_InitModule3("times", Times_methods,
                       "Pick up the real, user and system time spend by your python program");

    Py_INCREF(&Times_TimesType);
    PyModule_AddObject(m, "Times", (PyObject *)&Times_TimesType);
}
