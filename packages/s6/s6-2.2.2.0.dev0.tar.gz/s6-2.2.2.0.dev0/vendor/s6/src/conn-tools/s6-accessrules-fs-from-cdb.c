/* ISC license. */

#include <sys/types.h>
#include <sys/stat.h>
#include <errno.h>
#include <unistd.h>
#include <skalibs/bytestr.h>
#include <skalibs/uint16.h>
#include <skalibs/uint32.h>
#include <skalibs/cdb.h>
#include <skalibs/strerr2.h>
#include <skalibs/djbunix.h>

#define USAGE "s6-accessrules-fs-from-cdb dir cdbfile"

static char const *basedir ;
unsigned int basedirlen ;

static void cleanup ()
{
  int e = errno ;
  rm_rf(basedir) ;
  errno = e ;
}

static int domkdir (char const *s)
{
  return mkdir(s, S_IRWXU | S_IRGRP | S_IXGRP | S_IROTH | S_IXOTH | S_ISGID) < 0 ? (errno == EEXIST) : 1 ;
}

static void mkdirp (char *s)
{
  mode_t m = umask(0) ;
  unsigned int len = str_len(s) ;
  register unsigned int i = basedirlen + 1 ;
  for (; i < len ; i++) if (s[i] == '/')
  {
    s[i] = 0 ;
    if (!domkdir(s)) goto err ;
    s[i] = '/' ;
  }
  if (!domkdir(s)) goto err ;
  umask(m) ;
  return ;

 err:
  cleanup() ;
  strerr_diefu2sys(111, "mkdir ", s) ;
}

static void touchtrunc (char const *file)
{
  register int fd = open_trunc(file) ;
  if (fd < 0) strerr_diefu2sys(111, "open_trunc ", file) ;
  fd_close(fd) ;
}

static int doenv (char const *dir, unsigned int dirlen, char *env, unsigned int envlen)
{
  mode_t m = umask(0) ;
  unsigned int i = 0 ;
  if (!domkdir(dir))
  {
    cleanup() ;
    strerr_diefu2sys(111, "mkdir ", dir) ;
  }
  umask(m) ;
  while (i < envlen)
  {
    unsigned int n = byte_chr(env + i, envlen - i, 0) ;
    if (i + n >= envlen) return 0 ;
    {
      unsigned int p = byte_chr(env + i, n, '=') ;
      char tmp[dirlen + p + 2] ;
      byte_copy(tmp, dirlen, dir) ;
      tmp[dirlen] = '/' ;
      byte_copy(tmp + dirlen + 1, p, env + i) ;
      tmp[dirlen + p + 1] = 0 ;
      if (p < n)
      {
         env[i+n] = '\n' ;
         if (!openwritenclose_unsafe(tmp, env + i + p + 1, n - p))
         {
           cleanup() ;
           strerr_diefu2sys(111, "openwritenclose_unsafe ", tmp) ;
         }
      }
      else touchtrunc(tmp) ;
    }
    i += n + 1 ;
  }
  return 1 ;
}

static int doit (struct cdb *c)
{
  unsigned int klen = cdb_keylen(c) ;
  unsigned int dlen = cdb_datalen(c) ;
  {
    uint16 envlen, execlen ;
    char name[basedirlen + klen + 8] ;
    char data[dlen] ;
    byte_copy(name, basedirlen, basedir) ;
    name[basedirlen] = '/' ;
    if (!dlen || (dlen > 8201)) return (errno = EINVAL, 0) ;
    if ((cdb_read(c, name+basedirlen+1, klen, cdb_keypos(c)) < 0)
     || (cdb_read(c, data, dlen, cdb_datapos(c)) < 0))
    {
      cleanup() ;
      strerr_diefu1sys(111, "cdb_read") ;
    }
    name[basedirlen + klen + 1] = 0 ;
    mkdirp(name) ;
    name[basedirlen + klen + 1] = '/' ;
    if (data[0] == 'A')
    {
      byte_copy(name + basedirlen + klen + 2, 6, "allow") ;
      touchtrunc(name) ;
    }
    else if (data[0] == 'D')
    {
      byte_copy(name + basedirlen + klen + 2, 5, "deny") ;
      touchtrunc(name) ;
    }
    if (dlen < 3) return 1 ;
    uint16_unpack_big(data + 1, &envlen) ;
    if ((envlen > 4096U) || (3U + envlen > dlen)) return (errno = EINVAL, 0) ;
    uint16_unpack_big(data + 3 + envlen, &execlen) ;
    if ((execlen > 4096U) || (5U + envlen + execlen != dlen)) return (errno = EINVAL, 0) ;
    if (envlen)
    {
      byte_copy(name + basedirlen + klen + 2, 4, "env") ;
      if (!doenv(name, basedirlen + klen + 5, data + 3, envlen)) return (errno = EINVAL, 0) ;
    }
    byte_copy(name + basedirlen + klen + 2, 5, "exec") ;
    if (execlen && !openwritenclose_unsafe(name, data + 5 + envlen, execlen))
    {
      cleanup() ;
      strerr_diefu2sys(111, "openwritenclose_unsafe ", name) ;
    }
  }
  return 1 ;
}

int main (int argc, char const *const *argv)
{
  struct cdb c = CDB_ZERO ;
  uint32 kpos ;
  PROG = "s6-accessrules-fs-from-cdb" ;
  if (argc < 3) strerr_dieusage(100, USAGE) ;
  if (cdb_mapfile(&c, argv[2]) < 0) strerr_diefu1sys(111, "cdb_mapfile") ;
  basedir = argv[1] ;
  basedirlen = str_len(argv[1]) ;
  {
    mode_t m = umask(0) ;
    if (mkdir(basedir, S_IRWXU | S_IRGRP | S_IXGRP | S_IROTH | S_IXOTH | S_ISGID) < 0)
      strerr_diefu2sys(111, "mkdir ", basedir) ;
    umask(m) ;
  }
  cdb_traverse_init(&c, &kpos) ;
  for (;;)
  {
    register int r = cdb_nextkey(&c, &kpos) ;
    if (r < 0)
    {
      cleanup() ;
      strerr_diefu1sys(111, "cdb_nextkey") ;
    }
    else if (!r) break ;
    else if (!doit(&c))
    {
      cleanup() ;
      strerr_diefu1sys(111, "handle key") ;
    }
  }
  return 0 ;
}
