/* ISC license. */

#include <skalibs/tai.h>
#include <skalibs/djbtime.h>

int sysclock_from_localtmn (tain_t *a, localtmn_t const *l)
{
  if (!sysclock_from_localtm(&a->sec.x, &l->tm)) return 0 ;
  a->nano = l->nano ;
  return 1 ;
}
