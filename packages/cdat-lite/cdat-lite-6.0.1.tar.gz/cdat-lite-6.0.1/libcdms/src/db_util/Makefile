# -*-Mode: indented-text;-*-
# Makefile:    db_util makefile
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
# Revision 1.2  1997/10/24  18:23:57  drach
# - Cache netCDF unlimited dimensions
# - Consistent with GrADS src170
#
# Revision 1.1  1996/09/09  18:28:31  drach
# - Cleaned up minor compilation warnings
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
CFLAGS = -I../../include -fPIC $(DEBUG) -Dgrads
CPPFLAGS =  -Dnetcdf -DBYTESWAP -DpgiFortran
DEBUG = -O
DEFS = -DPACKAGE_NAME=\"\" -DPACKAGE_TARNAME=\"\" -DPACKAGE_VERSION=\"\" -DPACKAGE_STRING=\"\" -DPACKAGE_BUGREPORT=\"\" -DOS_NAME=Linux -DOS_MAJOR=2 -DSTDC_HEADERS=1 -DHAVE_SYS_TYPES_H=1 -DHAVE_SYS_STAT_H=1 -DHAVE_STDLIB_H=1 -DHAVE_STRING_H=1 -DHAVE_MEMORY_H=1 -DHAVE_STRINGS_H=1 -DHAVE_INTTYPES_H=1 -DHAVE_STDINT_H=1 -DHAVE_UNISTD_H=1
FC = gfortran
FFLAGS = -I../../include  -I/usr/include $(DEBUG)
INSTALL = /usr/bin/install -c
INSTALL_PROGRAM = /usr/bin/install -c
LDFLAGS = -L../../../lib -lcdms -L/usr/lib64 -lnetcdf -L/usr/lib64 -lhdf5_hl -lhdf5 -lm -lz  -L/usr/lib64 -lnetcdf -L/usr/lib64 -lhdf5_hl -lhdf5 -lm -lz
OS = linux
RANLIB = ranlib

# Shell to run make subcommands
SHELL = /bin/sh

# Do not change values below this line
#
LIBRARY		= ../../lib/libcdms.a
OBJS		= cdTimeConv.o timeConv.o timeArith.o reg_trfm.o cdRegTrfm.o \
		  cdUtil.o

all:		$(OBJS) FORCE
		ar rv $(LIBRARY) $(OBJS)
		$(RANLIB) $(LIBRARY)

cdTimeConv.o:	cdTimeConv.c ../../include/cdmsint.h ../../include/cdms.h ../../include/cdunif.h
fcdTimeConv.o:	fcdTimeConv.c ../../include/cdmsint.h ../../include/cdms.h ../../include/cdunif.h ../../include/cfortran.h
timeConv.o:	timeConv.c ../../include/cdmsint.h ../../include/cdms.h ../../include/cdunif.h
timeArith.o:	timeArith.c ../../include/cdmsint.h ../../include/cdms.h ../../include/cdunif.h
reg_trfm.o:	reg_trfm.c ../../include/isdb.h	../../include/gaussLats.h
cdRegTrfm.o:	cdRegTrfm.c ../../include/cdmsint.h ../../include/cdms.h ../../include/cdunif.h ../../include/isdb.h

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
