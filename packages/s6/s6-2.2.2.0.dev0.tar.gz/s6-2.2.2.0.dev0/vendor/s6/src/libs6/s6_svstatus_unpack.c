/* ISC license. */

#include <sys/types.h>
#include <skalibs/uint16.h>
#include <skalibs/uint64.h>
#include <skalibs/tai.h>
#include <s6/s6-supervise.h>

void s6_svstatus_unpack (char const *pack, s6_svstatus_t *sv)
{
  uint64 pid ;
  uint16 wstat ;
  tain_unpack(pack, &sv->stamp) ;
  tain_unpack(pack + 12, &sv->readystamp) ;
  uint64_unpack_big(pack + 24, &pid) ;
  sv->pid = (pid_t)pid ;
  uint16_unpack_big(pack + 32, &wstat) ;
  sv->wstat = (int)wstat ;
  sv->flagpaused = pack[34] & 1 ;
  sv->flagfinishing = !!(pack[34] & 2) ;
  sv->flagwant = !!(pack[34] & 4) ;
  sv->flagwantup = !!(pack[34] & 8) ;
  sv->flagready = !!(pack[34] & 16) ;
}
