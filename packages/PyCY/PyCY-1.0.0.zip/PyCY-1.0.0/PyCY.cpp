
#include "Python.h"
#include <windows.h>
#include <sstream>
using namespace std;

static PyObject *ErrorObject;

/* ----------------------------------------------------- */

/* Declarations for objects of type PyCY */

typedef struct {
	PyObject_HEAD
	CY cy;
} cyobject;

staticforward PyTypeObject Cytype;



/* ---------------------------------------------------------------- */

cyobject *newcyobject();

static struct PyMethodDef cy_methods[] = {
    {NULL,		NULL}		/* sentinel */
};

/* ---------- */


static cyobject *
newcyobject()
{
    cyobject *self;
	
    self = PyObject_NEW(cyobject, &Cytype);
    if (self == NULL)
        return NULL;
    ZeroMemory(&self->cy, sizeof(self->cy));
    return self;
}


/* Code to access PyCY objects as numbers */

static PyObject *
cy_add(cyobject *v, cyobject *w)
{
    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = v->cy.int64 + w->cy.int64;
    return (PyObject *) new_cy;
}

static PyObject *
cy_sub(cyobject *v, cyobject *w)
{
    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = v->cy.int64 - w->cy.int64;
    return (PyObject *) new_cy;
}

static PyObject *
cy_mul(cyobject *v, cyobject *w)
{
    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = v->cy.int64 * w->cy.int64;
    return (PyObject *) new_cy;
}

static PyObject *
cy_div(cyobject *x, cyobject *y)
{
    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = x->cy.int64 / y->cy.int64;
    return (PyObject *) new_cy;
}

static PyObject *
cy_mod(cyobject *x, cyobject *y)
{
    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = x->cy.int64 % y->cy.int64;
    return (PyObject *) new_cy;
}

static PyObject *
cy_divmod(cyobject *x, cyobject *y)
{
    PyObject *tp = PyTuple_New(2);

    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = x->cy.int64 / y->cy.int64;

    PyTuple_SET_ITEM(tp, 0, (PyObject *)new_cy);

    new_cy = newcyobject();
    new_cy->cy.int64 = x->cy.int64 % y->cy.int64;

    PyTuple_SET_ITEM(tp, 0, (PyObject *)new_cy);
    return tp;
}

static PyObject *
cy_pow(cyobject *v, cyobject *w, cyobject *z)
{
    /* XXXX */
    return NULL;
}				

static PyObject *
cy_neg(cyobject *v)
{
    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = -v->cy.int64;

    return (PyObject *)new_cy;
}

static PyObject *
cy_pos(cyobject *v)
{
    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = v->cy.int64;
    return (PyObject *)new_cy;
}

static PyObject *
cy_abs(cyobject *v)
{
    cyobject *new_cy = newcyobject();
    if (v->cy.int64 < 0)
        new_cy->cy.int64 = -v->cy.int64;
    else
        new_cy->cy.int64 = v->cy.int64;

    return (PyObject *)new_cy;
}

static int
cy_nonzero(cyobject *v)
{
    if (v->cy.int64 != 0)
        return 1;
    else
        return 0;
}

static PyObject *
cy_invert(cyobject *v)
{
    /* XXXX */
    return NULL;
}

static PyObject *
cy_lshift(cyobject *v, cyobject *w)
{
    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = v->cy.int64 << w->cy.int64;
    return (PyObject *) new_cy;
}

static PyObject *
cy_rshift(cyobject *v, cyobject *w)
{
    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = v->cy.int64 >> w->cy.int64;
    return (PyObject *) new_cy;
}

static PyObject *
cy_and(cyobject *v, cyobject *w)
{
    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = v->cy.int64 & w->cy.int64;
    return (PyObject *) new_cy;
}

static PyObject *
cy_xor(cyobject *v, cyobject *w)
{
    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = v->cy.int64 ^ w->cy.int64;
    return (PyObject *) new_cy;
}

static PyObject *
cy_or(cyobject *v, cyobject *w)
{
    cyobject *new_cy = newcyobject();
    new_cy->cy.int64 = v->cy.int64 | w->cy.int64;
    return (PyObject *) new_cy;
}

static int
cy_coerce(PyObject **pv, PyObject **pw)
{
    /* XXXX I haven't a clue... */
    return 1;
}

static PyObject *
cy_int(cyobject *v)
{
    return PyInt_FromLong((long)v->cy.int64);
}

static PyObject *
cy_long(cyobject *v)
{
    return PyLong_FromLongLong(v->cy.int64);
}

static PyObject *
cy_float(cyobject *v)
{
    return PyFloat_FromDouble(((double) v->cy.int64)/10000.0);
}

static PyObject *
cy_oct(cyobject *v)
{
    char cbuf[23];
    _i64toa(v->cy.int64, cbuf, 8);
    return PyString_FromString(cbuf);
}

static PyObject *
cy_hex(cyobject *v)
{
    char cbuf[33];
    _i64toa(v->cy.int64, cbuf, 16);
    return PyString_FromString(cbuf);
}

static PyNumberMethods cy_as_number = {
	(binaryfunc)cy_add,	/*nb_add*/
	(binaryfunc)cy_sub,	/*nb_subtract*/
	(binaryfunc)cy_mul,	/*nb_multiply*/
	(binaryfunc)cy_div,	/*nb_divide*/
	(binaryfunc)cy_mod,	/*nb_remainder*/
	(binaryfunc)cy_divmod,	/*nb_divmod*/
	(ternaryfunc)cy_pow,	/*nb_power*/
	(unaryfunc)cy_neg,	/*nb_negative*/
	(unaryfunc)cy_pos,	/*nb_positive*/
	(unaryfunc)cy_abs,	/*nb_absolute*/
	(inquiry)cy_nonzero,	/*nb_nonzero*/
	(unaryfunc)cy_invert,	/*nb_invert*/
	(binaryfunc)cy_lshift,	/*nb_lshift*/
	(binaryfunc)cy_rshift,	/*nb_rshift*/
	(binaryfunc)cy_and,	/*nb_and*/
	(binaryfunc)cy_xor,	/*nb_xor*/
	(binaryfunc)cy_or,	/*nb_or*/
	(coercion)cy_coerce,	/*nb_coerce*/
	(unaryfunc)cy_int,	/*nb_int*/
	(unaryfunc)cy_long,	/*nb_long*/
	(unaryfunc)cy_float,	/*nb_float*/
	(unaryfunc)cy_oct,	/*nb_oct*/
	(unaryfunc)cy_hex,	/*nb_hex*/
};

/* ------------------------------------------------------- */

static PyObject *
cy_str(cyobject *self)
{
    char cbuf[21];
    _i64toa(self->cy.int64, cbuf, 10);

    // now we have to add in the decimal
    string s;
    char *cp = cbuf;
    int slen = strlen(cbuf);
    if (cbuf[0] == '-') {
        s.append(1, '-');
        slen--;
        cp++;
    }
    
    // ok, now things get complicated. if we're less than 4 then we must pad
    if (slen <= 4) {
        s.append("0.");
        s.append(4 - slen, '0');
        s.append(cp);
    }
    else {
        s.append(cp, slen - 4);
        s.append(1, '.');
        s.append(&cp[slen-4]);
    }

    return PyString_FromString(s.c_str());
}

static int
cy_print(cyobject *self, FILE *fp, int flags)
{
    PyObject *pobj = cy_str(self);
    fwrite(PyString_AsString(pobj), PyString_Size(pobj), 1, fp);
    Py_DECREF(pobj);
    return 0;
}

static PyObject *
cy_getattr(cyobject *self, char *name)
{
    /* XXXX Add your own getattr code here */
    return Py_FindMethod(cy_methods, (PyObject *)self, name);
}

static int
cy_setattr(cyobject *self, char *name, PyObject *v)
{
    /* Set attribute 'name' to value 'v'. v==NULL means delete */
	
    /* XXXX Add your own setattr code here */
    return -1;
}

void cy_dealloc(PyObject *self)
{
    PyMem_DEL(self);
}

static char Cytype__doc__[] = 
""
;

static PyTypeObject Cytype = {
    PyObject_HEAD_INIT(&PyType_Type)
    0,				/*ob_size*/
    "PyCY",			/*tp_name*/
    sizeof(cyobject),		/*tp_basicsize*/
    0,				/*tp_itemsize*/
    /* methods */
    cy_dealloc,	/*tp_dealloc*/
    (printfunc)cy_print,		/*tp_print*/
    (getattrfunc)cy_getattr,	/*tp_getattr*/
    (setattrfunc)cy_setattr,	/*tp_setattr*/
    (cmpfunc)0,		/*tp_compare*/
    (reprfunc)0,		/*tp_repr*/
    &cy_as_number,			/*tp_as_number*/
    0,		/*tp_as_sequence*/
    0,		/*tp_as_mapping*/
    (hashfunc)0,		/*tp_hash*/
    (ternaryfunc)0,		/*tp_call*/
    (reprfunc)cy_str,		/*tp_str*/

	/* Space for future expansion */
    0L,0L,0L,/*Py_TPFLAGS_CHECKTYPES*/0L,
    Cytype__doc__ /* Documentation string */
};

/* End of code for PyCY objects */
/* -------------------------------------------------------- */

PyObject *
pycy_PyCY(PyObject *self, PyObject *args)
{
    PyObject *pobj;

    if (!PyArg_ParseTuple(args, "O", &pobj))
        return NULL;

    cyobject *new_cy;
   
    /* ok, what type is the input? */
    if (PyTuple_Check(pobj)) {
        // length better be 2
        if (PyTuple_Size(pobj) != 2 ||
            !PyInt_Check(PyTuple_GetItem(pobj, 0)) || !PyInt_Check(PyTuple_GetItem(pobj, 1))) {
            PyErr_SetString(PyExc_TypeError, "tuple must be (int, int)");
            return NULL;
        }
            
        new_cy = newcyobject();

        // copy the int values right in
        long i = PyInt_AsLong(PyTuple_GetItem(pobj, 0));
        CopyMemory(&((int *) &new_cy->cy.int64)[1], &i, sizeof(long));

        i = PyInt_AsLong(PyTuple_GetItem(pobj, 1));
        CopyMemory(&new_cy->cy.int64, &i, sizeof(long));
    }
    else if (PyInt_Check(pobj)) {
        new_cy = newcyobject();
        new_cy->cy.int64 = PyInt_AsLong(pobj);
        new_cy->cy.int64 *= 10000;
    }
    else if (PyFloat_Check(pobj)) {
        new_cy = newcyobject();
        new_cy->cy.int64 = PyFloat_AsDouble(pobj) * 10000.0;
    }
    else {
        PyErr_SetString(PyExc_TypeError, "can't create PyCY from this type");
        return NULL;
    }
    return (PyObject *) new_cy;
}

/* List of methods defined in the module */

static struct PyMethodDef PyCY_methods[] = {
    {"PyCY", pycy_PyCY, METH_VARARGS, "creates a new PyCY object"},
    {NULL,	 (PyCFunction)NULL, 0, NULL}		/* sentinel */
};


/* Initialization function for the module (*must* be called initPyCY) */

static char PyCY_module_documentation[] = 
"Handles VT_CY (currency) values"
;

void
initPyCY()
{
	PyObject *m, *d;

	/* Create the module and add the functions */
	m = Py_InitModule4("PyCY", PyCY_methods,
		PyCY_module_documentation,
		(PyObject*)NULL,PYTHON_API_VERSION);

	/* Add some symbolic constants to the module */
	d = PyModule_GetDict(m);
	ErrorObject = PyString_FromString("PyCY.error");
	PyDict_SetItemString(d, "error", ErrorObject);

	/* XXXX Add constants here */
	
	/* Check for errors */
	if (PyErr_Occurred())
		Py_FatalError("can't initialize module PyCY");
}

