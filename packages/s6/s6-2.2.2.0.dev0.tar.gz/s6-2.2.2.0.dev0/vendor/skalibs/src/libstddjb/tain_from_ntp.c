/* ISC license. */

#include <skalibs/uint64.h>
#include <skalibs/tai.h>
#include <skalibs/djbtime.h>

int tain_from_ntp (tain_t *a, uint64 u)
{
  tai_t secs = { .x = u >> 32 } ;
  if (secs.x <= 0x7FFFFFFFUL) secs.x |= ((uint64)1 << 32) ;
  secs.x += TAI_MAGIC ;
  secs.x -= NTP_OFFSET ;
  if (!tai_from_utc(&secs, secs.x)) return 0 ;
  a->sec = secs ;
  a->nano = ((u & 0xFFFFFFFFUL) * 1000000000) >> 32 ;
  return 1 ;
}
