# -*-Mode: indented-text;-*-
# Makefile:    CDMS API makefile
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
# Revision 1.1.1.1  1997/12/09 18:57:40  drach
# Copied from cirrus
#
# Revision 1.1  1997/11/10  19:22:33  drach
# - Added cuvargets to cdunif, cdSlabRead to cdms
#
# Revision 1.2  1997/09/26  21:47:40  drach
# - Added caching of netCDF unlimited dimension
#
# Revision 1.1  1996/09/09  18:22:08  drach
# - Integrated with configuration scripts
# - (CRAY) added ieee2cray conversion
# - GrADS/GRIB I/O works on all platforms now
# - Support for platform-independent gribmap
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
CFLAGS = -I../../include -fPIC $(DEBUG) -Dgrads -I/usr/include
CPPFLAGS =  -Dnetcdf -DBYTESWAP -DpgiFortran -DSTNDALN=1 -DBYTEORDER=0 -DGRADS_CRAY=0
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
OBJS		= cdmsslab.o

all:		$(LIBRARY)

$(LIBRARY):	$(OBJS) FORCE
		ar rv $(LIBRARY) $(OBJS)
		$(RANLIB) $(LIBRARY)

EXTENDOBJS	= cdmyacc.o cdmlex.o cdmsint.o cdmsdset.o cdms.o cdmsatt.o
extendlibrary:	$(EXTENDOBJS)
		ar rv $(LIBRARY) $?
		$(RANLIB) $(LIBRARY)

cdmlex.o:	cdmlex.c cdml.h ../../include/cdmsint.h ../../include/cdms.h
cdms.o:		cdms.c ../../include/cdmsint.h ../../include/cdms.h
cdmsatt.o:	cdmsatt.c ../../include/cdmsint.h ../../include/cdms.h
cdmsdset.o:	cdmsdset.c ../../include/cdmsint.h ../../include/cdms.h
cdmsint.o:	cdmsint.c ../../include/cdmsint.h ../../include/cdms.h
cdmsslab.o:	cdmsslab.c ../../include/cdms.h ../../include/cddrsint.h ../../include/cdunifint.h
cdmyacc.o:	cdmyacc.c ../../include/cdmsint.h ../../include/cdms.h

cdmlex.c: cdml.l
	$(LEX) cdml.l
	sed -f yy-sed lex.yy.c > cdmlex.c
	rm -f lex.yy.c

cdmyacc.c cdml.h: cdml.y
	$(YACC) -vd cdml.y
	sed -f yy-sed y.tab.c > cdmyacc.c
	sed -f yy-sed y.tab.h > cdml.h
	rm -f y.tab.c y.tab.h

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
