# -*-Mode: indented-text;-*-
# Makefile:    cdunif test makefile
#
# Copyright:   1996, Regents of the University of California
#	       This software may not be distributed to others without
#	       permission of the author.
#
# Author:      Bob Drach, Lawrence Livermore National Laboratory
#              drach@llnl.gov
#
# Version:     $Id$
#
# Revision History:
#
# $Log: Makefile.in,v $
# Revision 1.3  1997/11/10  19:22:43  drach
# - Added cuvargets to cdunif, cdSlabRead to cdms
#
# Revision 1.2  1997/09/26  21:48:00  drach
# - Added HDF
#
# Revision 1.1  1996/09/09  18:23:22  drach
# - Integrated with configuration scripts
# - Added test routines
# - Misc bug fixes
#
#
# Note: Makefile is generated from Makefile.in by top level configure
#

# Install prefix for architecture-independent files
prefix=         /usr/local

# Install prefix for architecture-dependent files
exec_prefix=    ${prefix}

# Expanded directories
BINDIR=$(exec_prefix)/bin
INCLUDEDIR=$(prefix)/include
LIBDIR=$(exec_prefix)/lib
MANDIR=$(prefix)/man
PARMDIR=$(prefix)/lib/lats

CC = cc
CXX = g++
CFLAGS = -I../../../include -fPIC $(DEBUG) -Dgrads
CXXFLAGS = $(CFLAGS)
CXX_LDFLAGS=-lcppunit
CPPFLAGS =  -Dnetcdf -DBYTESWAP -DpgiFortran -DHAVE_PP 
DEBUG = -O
DEFS = -DPACKAGE_NAME=\"\" -DPACKAGE_TARNAME=\"\" -DPACKAGE_VERSION=\"\" -DPACKAGE_STRING=\"\" -DPACKAGE_BUGREPORT=\"\" -DOS_NAME=Linux -DOS_MAJOR=2 -DSTDC_HEADERS=1 -DHAVE_SYS_TYPES_H=1 -DHAVE_SYS_STAT_H=1 -DHAVE_STDLIB_H=1 -DHAVE_STRING_H=1 -DHAVE_MEMORY_H=1 -DHAVE_STRINGS_H=1 -DHAVE_INTTYPES_H=1 -DHAVE_STDINT_H=1 -DHAVE_UNISTD_H=1
FC = gfortran
FFLAGS = -I../../include  -I/usr/include $(DEBUG)
INSTALL = /usr/bin/install -c
INSTALL_PROGRAM = /usr/bin/install -c
LDFLAGS = -L/usr/local/HDF5/lib -L../../../lib -lcdms -L/usr/lib64 -lnetcdf -L/usr/lib64 -lhdf5_hl -lhdf5 -lm -lz   -L/usr/lib64 -lnetcdf -L/usr/lib64 -lhdf5_hl -lhdf5 -lm -lz -lnetcdf -lcurl -lhdf5_hl -lhdf5 -lhdf5_hl -lgrib2c -lz -lpng -ljasper
LDFLAGS = -L../../../lib -lcdms  -L/usr/lib64 -lnetcdf -L/usr/lib64 -lhdf5_hl -lhdf5 -lm -lz   -L/usr/lib64 -lnetcdf -L/usr/lib64 -lhdf5_hl -lhdf5 -lm -lz
OS = linux
RANLIB = ranlib

# Shell to run make subcommands
SHELL = /bin/sh

# Do not change values below this line
#
LIBRARY		= ../../../lib/libcdms.a

all:		cdfile cudump cuget testnc testdrs testpp

test:		testnc testdrs testpp
		@echo "test netCDF"
		@testnc
		@echo "test DRS"
		@testdrs
		@echo "test PP"
		@testpp

.SUFFIXES: .F

.c.o:
	$(CC) $(CPPFLAGS) $(DEFS) $(CFLAGS) -c $<

.cpp.o:
	$(CPP) $(CPPFLAGS) $(DEFS) $(CXXFLAGS) -c $<

.c:
	case $(OS) in \
	     aix) \
		    $(CC) $(CPPFLAGS) $(DEFS) $(CFLAGS) -c $< -o $@.o; \
		    $(FC) $(FFLAGS) $@.o -o $@ $(LDFLAGS) $(LIBS); \
		    rm -f $@.o; \
		    ;; \
	     *) \
		    $(CC) $(CPPFLAGS) $(DEFS) $(CFLAGS) -o $@ $< $(LDFLAGS); \
		    ;; \
	esac

.cpp:
	case $(OS) in \
	     aix) \
		    $(CC) $(CPPFLAGS) $(DEFS) $(CFLAGS) -c $< -o $@.o; \
		    $(FC) $(FFLAGS) $@.o -o $@ $(LDFLAGS) $(LIBS); \
		    rm -f $@.o; \
		    ;; \
	     *) \
		    $(CXX) $(CPPFLAGS) $(DEFS) $(CFLAGS) -o $@ $< $(LDFLAGS) $(CXX_LDFLAGS) ; \
		    ;; \
	esac

.F:
	case $(OS) in \
	     aix) \
		    /usr/ccs/lib/cpp -P $(CPPFLAGS) $(CFLAGS) $(INCLUDES) $(DEFS) $< $@.f; \
		    $(FC) $(FFLAGS) $(LDFLAGS) $(LIBS) $@.f -o $@; \
		    rm -f $@.f; \
		    ;; \
	     *) \
		    $(FC) $(CPPFLAGS) $(INCLUDES) $(DEFS) $(FFLAGS) -o $@ $< $(LDFLAGS) $(LIBS); \
		    ;; \
	esac

clean:
	-rm -f *.o core *.~*~

distclean: clean
	-rm -f cdfile cudump cuget testnc testdrs testslab testpp

