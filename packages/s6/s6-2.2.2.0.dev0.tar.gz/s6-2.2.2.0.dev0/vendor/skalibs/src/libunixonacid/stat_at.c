/* ISC license. */

#include <skalibs/sysdeps.h>

#ifdef SKALIBS_HASOPENAT

#ifndef _ATFILE_SOURCE
#define _ATFILE_SOURCE
#endif

#include <skalibs/nonposix.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <skalibs/unix-transactional.h>

int stat_at (int dirfd, char const *file, struct stat *st)
{
  return fstatat(dirfd, file, st, 0) ;
}

int lstat_at (int dirfd, char const *file, struct stat *st)
{
  return fstatat(dirfd, file, st, AT_SYMLINK_NOFOLLOW) ;
}

#else

 /* OpenBSD plz. lstat() is POSIX. */
#include <skalibs/nonposix.h>

#include <sys/types.h>
#include <sys/stat.h>
#include <fcntl.h>
#include <errno.h>
#include <skalibs/djbunix.h>
#include <skalibs/unix-transactional.h>

static int fstat_at (int dirfd, char const *file, struct stat *st, int (*dostat)(char const *, struct stat *))
{
  int r ;
  int fdhere = open_read(".") ;
  if (fdhere < 0) return -1 ;
  if (fd_chdir(dirfd) < 0)
  {
    register int e = errno ;
    fd_close(fdhere) ;
    errno = e ;
    return -1 ;
  }
  r = (*dostat)(file, st) ;
  if (r < 0)
  {
    register int e = errno ;
    fd_chdir(fdhere) ;
    fd_close(fdhere) ;
    errno = e ;
    return -1 ;
  }
  if (fd_chdir(fdhere) < 0)
  {
    register int e = errno ;
    fd_close(fdhere) ;
    errno = e ;
    return -1 ;
  }
  return r ;
}

int stat_at (int dirfd, char const *file, struct stat *st)
{
  return fstat_at(dirfd, file, st, &stat) ;
}

int lstat_at (int dirfd, char const *file, struct stat *st)
{
  return fstat_at(dirfd, file, st, &lstat) ;
}

#endif
