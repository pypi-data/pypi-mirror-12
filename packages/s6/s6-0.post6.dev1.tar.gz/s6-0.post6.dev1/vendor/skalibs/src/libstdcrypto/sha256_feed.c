/* ISC license. */

#include <skalibs/uint32.h>
#include <skalibs/bytestr.h>
#include <skalibs/sha256.h>
#include "sha256-internal.h"

void sha256_feed (SHA256Schedule *ctx, unsigned char inb)
{
  register uint32 tmp ;
  ctx->in[ctx->b>>2] <<= 8 ;
  ctx->in[ctx->b>>2] |= T8(inb) ;
  if (++ctx->b >= 64)
  {
    register unsigned int i = 0 ;
    sha256_transform(ctx->buf, ctx->in) ;
    ctx->b = 0 ;
    for (; i < 16 ; i++) ctx->in[i] = 0 ;
  }
  tmp = ctx->bits[0] ;
  ctx->bits[0] += 8 ;
  if (tmp > ctx->bits[0]) ctx->bits[1]++ ;
}
