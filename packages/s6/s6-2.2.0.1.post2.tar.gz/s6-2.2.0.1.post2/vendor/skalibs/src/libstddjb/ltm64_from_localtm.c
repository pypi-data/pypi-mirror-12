/* ISC license. */

#include <sys/types.h>
#include <errno.h>
#include <time.h>
#include <skalibs/tai.h>
#include <skalibs/uint64.h>
#include <skalibs/djbtime.h>

int ltm64_from_localtm (uint64 *uu, struct tm const *l)
{
  struct tm ll = *l ;
  time_t u = mktime(&ll) ;
  if (u == (time_t)-1) return (errno = EINVAL, 0) ;
  *uu = TAI_MAGIC + u ;
  return 1 ;
}
