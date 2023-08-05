/* ISC license. */

#include <skalibs/tai.h>
#include <skalibs/djbtime.h>

int localtmn_from_tain (localtmn_t *l, tain_t const *a, int tz)
{
  struct tm t ;
  if (!localtm_from_tai(&t, tain_secp(a), tz)) return 0 ;
  l->tm = t ;
  l->nano = a->nano ;
  return 1 ;
}
