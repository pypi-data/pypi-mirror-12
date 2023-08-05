/* ISC license. */

#include <skalibs/uint16.h>
#include <skalibs/uint64.h>
#include <skalibs/tai.h>
#include <s6/s6-supervise.h>

void s6_svstatus_pack (char *pack, s6_svstatus_t const *sv)
{
  tain_pack(pack, &sv->stamp) ;
  tain_pack(pack + 12, &sv->readystamp) ;
  uint64_pack_big(pack + 24, (uint64)sv->pid) ;
  uint16_pack_big(pack + 32, (uint16)sv->wstat) ;
  pack[34] =
    sv->flagpaused |
    (sv->flagfinishing << 1) |
    (sv->flagwant << 2) |
    (sv->flagwantup << 3) |
    (sv->flagready << 4) ;
}
