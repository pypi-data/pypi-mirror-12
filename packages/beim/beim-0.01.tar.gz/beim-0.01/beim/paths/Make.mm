
PROJECT = distutils_adpt/paths
PACKAGE = paths


# directory structure

BUILD_DIRS = \

RECURSE_DIRS = $(BUILD_DIRS)

#--------------------------------------------------------------------------
#
all: export
	BLD_ACTION="all" $(MM) recurse

distclean::
	BLD_ACTION="distclean" $(MM) recurse

clean::
	BLD_ACTION="clean" $(MM) recurse

tidy::
	BLD_ACTION="tidy" $(MM) recurse

export::
	BLD_ACTION="export" $(MM) recurse

#--------------------------------------------------------------------------
#
# export

EXPORT_PYTHON_MODULES = \
	__init__.py \
        ARCS_AlphaRelease.py \
        ATLAS.py \
        BLAS.py \
        CaltechBuildProcedureConfig.py \
        Cctbx.py \
        DefaultPathsFactories.py \
        envUtils.py \
        FromEnvVariables.py \
        FromInfectUtils.py \
        G2C.py \
        HDF5_CPP.py \
        HDF5.py \
        IDL.py \
        Journal.py \
        LAPACK.py \
        LIBF77.py \
        LIBI77.py \
        Matlab.py \
        Mcstas.py \
        McStasWrapper.py \
        PackagePaths.py \
        Paths.py \
        PathsFinder.py \
        Python.py \
        search.py \
        Simulation.py \
        SingletonByName.py \
        StdVector.py \
        X11.py \
        shutils.py \
        utils.py \

EXPORT_BINS = \


export:: export-python-modules export-binaries

# version
# $Id: Make.mm 186 2007-04-04 22:01:30Z linjiao $
