/* ISC license. */

#include <skalibs/uint.h>
#include <skalibs/bytestr.h>
#include <skalibs/env.h>
#include <skalibs/strerr2.h>
#include <skalibs/sgetopt.h>
#include <skalibs/tai.h>
#include <s6/s6-fdholder.h>

#define USAGE "s6-fdholder-setdumpc [ -t timeout ]"
#define dieusage() strerr_dieusage(100, USAGE)

int main (int argc, char const *const *argv, char const *const *envp)
{
  s6_fdholder_t a = S6_FDHOLDER_ZERO ;
  tain_t deadline ;
  unsigned int dumplen ;
  char const *x ;
  PROG = "s6-fdholder-setdumpc" ;
  {
    unsigned int t = 0 ;
    subgetopt_t l = SUBGETOPT_ZERO ;
    for (;;)
    {
      register int opt = subgetopt_r(argc, argv, "t:", &l) ;
      if (opt == -1) break ;
      switch (opt)
      {
        case 't' : if (!uint0_scan(l.arg, &t)) dieusage() ; break ;
        default : dieusage() ;
      }
    }
    argc -= l.ind ; argv += l.ind ;
    if (t) tain_from_millisecs(&deadline, t) ;
    else deadline = tain_infinite_relative ;
  }

  s6_fdholder_init(&a, 6) ;
  x = env_get2(envp, "S6_FD#") ;
  if (!x) strerr_dienotset(100, "S6_FD#") ;
  if (!uint0_scan(x, &dumplen)) strerr_dieinvalid(100, "S6_FD#") ;
  if (dumplen)
  {
    unsigned int i = 0 ;
    s6_fdholder_fd_t dump[dumplen] ;
    char s[11 + UINT_FMT] ;
    tain_now_g() ;
    tain_add_g(&deadline, &deadline) ;
    for (; i < dumplen ; i++)
    {
      unsigned int fd, len ;
      byte_copy(s, 6, "S6_FD_") ;
      s[6 + uint_fmt(s+6, i)] = 0 ;
      x = env_get2(envp, s) ;
      if (!x) strerr_dienotset(100, s) ;
      if (!uint0_scan(x, &fd)) strerr_dieinvalid(100, s) ;
      dump[i].fd = fd ;
      byte_copy(s, 8, "S6_FDID_") ;
      s[8 + uint_fmt(s+8, i)] = 0 ;
      x = env_get2(envp, s) ;
      if (!x) strerr_dienotset(100, s) ;
      len = str_len(x) ;
      if (!len || len > S6_FDHOLDER_ID_SIZE) strerr_dieinvalid(100, s) ;
      byte_copy(dump[i].id, len+1, x) ;
      byte_copy(s, 11, "S6_FDLIMIT_") ;
      s[11 + uint_fmt(s+11, i)] = 0 ;
      x = env_get2(envp, s) ;
      if (!x) tain_add_g(&dump[i].limit, &tain_infinite_relative) ;
      else if (!timestamp_scan(x, &dump[i].limit)) strerr_dieinvalid(100, s) ;
    }
    if (!s6_fdholder_setdump_g(&a, dump, dumplen, &deadline))
      strerr_diefu1sys(1, "set dump") ;
  }
  return 0 ;
}
