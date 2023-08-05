/* ISC license. */

#include <errno.h>
#include <skalibs/cbuffer.h>

int cbuffer_init (cbuffer_t *b, char *s, unsigned int len)
{
  if (len < 2) return (errno = EINVAL, 0) ;
  b->x = s ;
  b->a = len ;
  b->p = b->n = 0 ;
  return 1 ;
}
