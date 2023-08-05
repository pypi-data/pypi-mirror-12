/* ISC license. */

#include <skalibs/uint64.h>
#include <skalibs/tai.h>
#include <skalibs/djbtime.h>
#include "djbtime-internal.h"

int tai_from_utc (tai_t *t, uint64 u)
{
  if (leapsecs_add(&u, 0) < 0) return 0 ;
  return tai_u64(t, u + 10) ;
}
