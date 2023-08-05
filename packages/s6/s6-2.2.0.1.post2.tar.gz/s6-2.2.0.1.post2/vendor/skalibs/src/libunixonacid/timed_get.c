/* ISC license. */

#include <errno.h>
#include <skalibs/allreadwrite.h>
#include <skalibs/functypes.h>
#include <skalibs/tai.h>
#include <skalibs/iopause.h>
#include <skalibs/unix-timed.h>

int timed_get (void *b, initfunc_t *getfd, initfunc_t *get, tain_t const *deadline, tain_t *stamp)
{
  iopause_fd x = { .fd = (*getfd)(b), .events = IOPAUSE_READ, .revents = 0 } ;
  register int r = (*get)(b) ;
  while (!r)
  {
    r = iopause_stamp(&x, 1, deadline, stamp) ;
    if (!r) return (errno = ETIMEDOUT, -1) ;
    else if (r > 0 && x.revents & (IOPAUSE_READ | IOPAUSE_EXCEPT)) r = (*get)(b) ;
  }
  return unsanitize_read(r) ;
}
