# -*-Mode: indented-text;-*-
# Makefile:    cddrs makefile
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
# Revision 1.2  1997/09/26  21:46:03  drach
# - Added HDF
#
# Revision 1.1  1996/09/09  18:17:29  drach
# - (cddrs.c) alias 'comments' and 'source', 'title' and 'long_name'
# - (cddrswrap.c) include math.h
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

# Set the compiler flag for the 64-bit Opteron platform
CC = cc
ARCH=$(shell uname -m)
ifeq ($(ARCH),ia64)
   CC = gcc -fPIC -D__ia64
endif
ifeq ($(ARCH),x86_64)
   CC = gcc -fPIC -D__x86_64__
endif
CFLAGS = -I../../include -I/usr/include -I -I -fPIC $(DEBUG) -Dgrads
CPPFLAGS =  -Dnetcdf -DBYTESWAP -DpgiFortran
DEBUG = -O
DEFS = -DPACKAGE_NAME=\"\" -DPACKAGE_TARNAME=\"\" -DPACKAGE_VERSION=\"\" -DPACKAGE_STRING=\"\" -DPACKAGE_BUGREPORT=\"\" -DOS_NAME=Linux -DOS_MAJOR=2 -DSTDC_HEADERS=1 -DHAVE_SYS_TYPES_H=1 -DHAVE_SYS_STAT_H=1 -DHAVE_STDLIB_H=1 -DHAVE_STRING_H=1 -DHAVE_MEMORY_H=1 -DHAVE_STRINGS_H=1 -DHAVE_INTTYPES_H=1 -DHAVE_STDINT_H=1 -DHAVE_UNISTD_H=1
FC = gfortran
FFLAGS = -I../../include  -I/usr/include $(DEBUG)
INSTALL = /usr/bin/install -c
INSTALL_PROGRAM = /usr/bin/install -c
LDFLAGS = -L../../../lib -lcdms -L/usr/lib64 -lnetcdf -L/usr/lib64 -lhdf5_hl -lhdf5 -lm -lz   -L/usr/lib64 -lnetcdf -L/usr/lib64 -lhdf5_hl -lhdf5 -lm -lz
OS = linux
RANLIB = ranlib

# Shell to run make subcommands
SHELL = /bin/sh

# Do not change values below this line
#
LIBRARY		= ../../lib/libcdms.a
OBJS		= cddrs.o

all:		$(OBJS) FORCE
		ar rv $(LIBRARY) $(OBJS)
		$(RANLIB) $(LIBRARY)

cddrs.o:	cddrs.c ../../include/cdunifint.h ../../include/cdunif.h ../../include/cddrsint.h ../../include/cddrs.h
#cddrswrap.o:	cddrswrap.c ../../include/cddrs.h ../../include/cfortran.h


.SUFFIXES: .F

.c.o:
	$(CC) $(CPPFLAGS) $(DEFS) $(CFLAGS) -c $<

.c:
	$(CC) $(CPPFLAGS) $(DEFS) $(CFLAGS) -o $@ $< $(LDFLAGS)

.F:
	case $(OS) in \
	     'aix') \
		    /usr/ccs/lib/cpp -P $(CPPFLAGS) $(CFLAGS) $(INCLUDES) $(DEFS) $< $@.f; \
		    $(FC) $(FFLAGS) $(LDFLAGS) $(LIBS) $@.f -o $@; \
		    rm $@.f; \
		    ;; \
	     *) \
		    $(FC) $(CPPFLAGS) $(INCLUDES) $(DEFS) $(FFLAGS) -o $@ $< $(LDFLAGS) $(LIBS); \
		    ;; \
	esac

clean:
	-rm -f *.o core *.~*~

distclean: clean

FORCE:
