/* ISC license. */

/* MT-unsafe */

#include <skalibs/uint64.h>
#include <skalibs/tai.h>
#include "djbtime-internal.h"

unsigned int const leapsecs_table_len = 26 ;
static uint64 const leapsecs_table_[26] =
{
  TAI_MAGIC + 78796809,
  TAI_MAGIC + 94694410,
  TAI_MAGIC + 126230411,
  TAI_MAGIC + 157766412,
  TAI_MAGIC + 189302413,
  TAI_MAGIC + 220924814,
  TAI_MAGIC + 252460815,
  TAI_MAGIC + 283996816,
  TAI_MAGIC + 315532817,
  TAI_MAGIC + 362793618,
  TAI_MAGIC + 394329619,
  TAI_MAGIC + 425865620,
  TAI_MAGIC + 489024021,
  TAI_MAGIC + 567993622,
  TAI_MAGIC + 631152023,
  TAI_MAGIC + 662688024,
  TAI_MAGIC + 709948825,
  TAI_MAGIC + 741484826,
  TAI_MAGIC + 773020827,
  TAI_MAGIC + 820454428,
  TAI_MAGIC + 867715229,
  TAI_MAGIC + 915148830,
  TAI_MAGIC + 1136073631,
  TAI_MAGIC + 1230768032,
  TAI_MAGIC + 1341100833,
  TAI_MAGIC + 1435708834
} ;
uint64 const *const leapsecs_table = leapsecs_table_ ;
