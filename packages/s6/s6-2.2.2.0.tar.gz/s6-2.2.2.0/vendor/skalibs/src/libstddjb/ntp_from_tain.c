/* ISC license. */

#include <errno.h>
#include <skalibs/uint64.h>
#include <skalibs/tai.h>
#include <skalibs/djbtime.h>

int ntp_from_tain (uint64 *u, tain_t const *a)
{
  uint64 secs, frac ;
  if (!utc_from_tai(&secs, tain_secp(a))) return 0 ;
  secs += NTP_OFFSET ;
  if (secs < TAI_MAGIC + 2147483648UL) goto ifail ;
  secs -= TAI_MAGIC ;
  if (secs >= ((uint64)3 << 31)) goto ifail ;
  secs &= (secs < ((uint64)1 << 32)) ? 0xFFFFFFFFUL : 0x7FFFFFFFUL ;
  frac = ((uint64)a->nano << 32) / 1000000000UL ;
  *u = (secs << 32) + frac ;
  return 1 ;
 ifail:
  errno = EINVAL ;
  return 0 ;
}
