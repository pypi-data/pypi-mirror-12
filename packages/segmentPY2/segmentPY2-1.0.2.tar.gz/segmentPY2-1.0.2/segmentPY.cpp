#include <Python.h>
#include <sys/time.h>
#include <stdio.h>
#include <unistd.h>

#include "WordSplitter.h"

static CWordSplit *pwordSplit = NULL;
static PyObject* segmentPY_getSplit(PyObject *self, PyObject *args)
{
    char * line;
    int range;
    if (!PyArg_ParseTuple(args, "s",&line))
    {
        return NULL;
    }
    char pSplit[MEMLEN];
    char pPhrase[MEMLEN];
    char pBasic[MEMLEN];
    pwordSplit->funSplitString( line, pSplit, pBasic, pPhrase, false, false );
    return Py_BuildValue("s", pSplit);

}
static PyObject* segmentPY_getPhrase(PyObject *self, PyObject *args)
{
    char * line;
    int range;
    if (!PyArg_ParseTuple(args, "s",&line))
    {
        return NULL;
    }
    char pSplit[MEMLEN];
    char pPhrase[MEMLEN];
    char pBasic[MEMLEN];
    pwordSplit->funSplitString( line, pSplit, pBasic, pPhrase, false, false );
    return Py_BuildValue("s", pPhrase);
 
}
static PyObject* segmentPY_getBasicPhrase(PyObject *self, PyObject *args)
{
    char * line;
    int range;
    if (!PyArg_ParseTuple(args, "s",&line))
    {
        return NULL;
    }
    char pSplit[MEMLEN];
    char pPhrase[MEMLEN];
    char pBasic[MEMLEN];
    pwordSplit->funSplitString( line, pSplit, pBasic, pPhrase, false, false );
    // template using pSplit
    snprintf(pSplit, MEMLEN, "%s %s", pBasic, pPhrase);
    return Py_BuildValue("s", pSplit);
 
}
static PyObject* segmentPY_getBasic(PyObject *self, PyObject *args)
{
    char * line;
    int range;
    if (!PyArg_ParseTuple(args, "s",&line))
    {
        return NULL;
    }
    char pSplit[MEMLEN];
    char pPhrase[MEMLEN];
    char pBasic[MEMLEN];
    pwordSplit->funSplitString( line, pSplit, pBasic, pPhrase, false, false );
    return Py_BuildValue("s", pBasic);
}
static PyObject* segmentPY_init(PyObject *self, PyObject *args)
{
    char* dictPath;
    if (!PyArg_ParseTuple(args, "s",&dictPath))
        return NULL;
    if(pwordSplit==NULL)
    {
        WordSplitter::initial(dictPath);
	    pwordSplit=WordSplitter::getInstance().get();
    }
    return Py_BuildValue("s", "");
}




static PyMethodDef segmentPY_methods[] = {
    {"getBasic", segmentPY_getBasic, 1},
    {"getSplit", segmentPY_getSplit, 1},
    {"getPhrase", segmentPY_getPhrase, 1},
    {"getBasicPhrase", segmentPY_getBasicPhrase, 1},
    {"init", segmentPY_init, 1},
    {NULL, NULL}
};


PyMODINIT_FUNC initsegmentPY2(void)
{
    PyObject *m;
    m = Py_InitModule("segmentPY2", segmentPY_methods);
}

