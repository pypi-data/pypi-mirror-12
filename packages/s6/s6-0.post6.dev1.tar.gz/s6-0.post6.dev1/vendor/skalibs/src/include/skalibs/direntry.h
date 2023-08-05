/* ISC license. */

#ifndef DIRENTRY_H
#define DIRENTRY_H

#include <sys/types.h>
#include <dirent.h>

typedef struct dirent direntry, direntry_t, *direntry_ref, *direntry_t_ref ;

extern int dir_close (DIR *) ;

#endif
