/* ISC license. */

#include <errno.h>
#include <skalibs/uint16.h>
#include <skalibs/error.h>
#include <skalibs/tai.h>
#include <skalibs/socket.h>

int socket_deadlineconnstamp6 (int s, char const *ip, uint16 port, tain_t const *deadline, tain_t *stamp)
{
  if (socket_connect6(s, ip, port) >= 0) return 1 ;
  if (!error_isagain(errno) && !error_isalready(errno)) return 0 ;
  return socket_waitconn(s, deadline, stamp) ;
}
