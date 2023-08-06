# -*-Mode: indented-text;-*-
# Makefile:    cdunif makefile
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
# Revision 1.4  1997/11/24  17:28:29  drach
# - Added QL package to cdunif
# - Added NdimIntersect function to CDMS
#
# Revision 1.3  1997/11/10  19:22:40  drach
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
ARCH=$(shell uname -m)
ifeq ($(ARCH),x86_64)
   CC = gcc -fPIC -D__x86_64__
else
   CC = cc
endif
ifneq (,)
 CFLAGS = -I../../include -I"/usr/include" -I -I -fPIC $(DEBUG) -Dgrads -I 
else
 CFLAGS = -I../../include -I"/usr/include" -I -I -fPIC $(DEBUG)
endif
CPPFLAGS =  -Dnetcdf -DBYTESWAP -DpgiFortran -DSTNDALN=1 -DBYTEORDER=0 -DGRADS_CRAY=0  -DHAVE_PP 
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
OBJS		= cdunif.o cdunifint.o cdunifgen.o cdunifdrs.o cdunifgrads.o cdunifnc.o cdunifhdf.o cdunifslab.o cdunifstub.o cdunifra.o cdrra.o cdsort.o gamach.o gaio.o gaprnt.o gautil.o gaddes.o galloc.o gabufr.o gabufrtbl.o cdunifql.o 

all:		$(OBJS) FORCE
		ar rv $(LIBRARY) $(OBJS)
		cd cdunifpp; $(MAKE) DEBUG=$(DEBUG)
		$(RANLIB) $(LIBRARY)

cdunif.o:	cdunif.c ../../include/cdunifint.h ../../include/cdunif.h
cdunifint.o:	cdunifint.c ../../include/cdunifint.h ../../include/cdunif.h
cdunifgen.o:	cdunifgen.c ../../include/cdunifint.h ../../include/cdunif.h
cdunifdrs.o:	cdunifdrs.c
cdunifgrads.o:	cdunifgrads.c ../../include/cdmsint.h ../../include/cdms.h ../../include/cdunif.h ../../include/cdunifint.h ../../include/grads.h
cdunifhdf.o:	cdunifhdf.c ../../include/cdunifint.h
cdunifnc.o:	cdunifnc.c ../../include/cdunifint.h
cdunifslab.o:	cdunifslab.c ../../include/cdunifint.h
cdunifstub.o:	cdunifstub.c ../../include/cdunifint.h ../../include/cdunif.h
cdunifra.o:	cdunifra.c ../../include/cdunifint.h ../../include/cdunif.h
cdrra.o:	cdrra.c ../../include/cdunif.h
cdsort.o:	cdsort.c
gamach.o:	gamach.c ../../include/grads.h
gaio.o:         gaio.c ../../include/grads.h
gaprnt.o:	gaprnt.c ../../include/grads.h
gautil.o:	gautil.c ../../include/grads.h
gaddes.o:	gaddes.c ../../include/grads.h
cdunifql.o:	cdunifql.c ../../include/cdmsint_new.h ../../include/cdunifint.h
galloc.o:	galloc.c ../../include/grads.h ../../include/gatypes.h
gabufr.o:	gabufr.c ../../include/grads.h ../../include/gatypes.h
gabufrtbl.o:	gabufrtbl.c ../../include/grads.h ../../include/gatypes.h

ieee2cray.o:	ieee2cray.f
		cft77 -i 64 -a static -Rb ieee2cray.f

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
	cd cdunifpp; $(MAKE) clean

distclean: clean

FORCE:
