/* ISC license. */

#include <sys/types.h>
#include <fcntl.h>
#include <skalibs/djbunix.h>

int ndelay_on (int fd)
{
  register int got = fcntl(fd, F_GETFL) ;
  return (got == -1) ? -1 : fcntl(fd, F_SETFL, got | O_NONBLOCK) ;
}
