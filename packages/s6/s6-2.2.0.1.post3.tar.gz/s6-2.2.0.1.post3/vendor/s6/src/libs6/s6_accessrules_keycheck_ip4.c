/* ISC license. */

#include <skalibs/uint32.h>
#include <skalibs/uint.h>
#include <skalibs/fmtscan.h>
#include <s6/accessrules.h>

s6_accessrules_result_t s6_accessrules_keycheck_ip4 (void const *key, void *data, s6_accessrules_params_t *params, s6_accessrules_backend_func_t_ref check1)
{
  char fmt[IP4_FMT + UINT_FMT + 6] = "ip4/" ;
  uint32 ip ;
  unsigned int i = 0 ;
  uint32_unpack_big((char const *)key, &ip) ;
  for (; i <= 32 ; i++)
  {
    register s6_accessrules_result_t r ;
    register unsigned int len = 4 + ip4_fmtu32(fmt+4, (i == 32) ? 0 : ip & ~((1U << i) - 1)) ;
    fmt[len++] = '_' ;
    len += uint_fmt(fmt + len, 32 - i) ;
    r = (*check1)(fmt, len, data, params) ;
    if (r != S6_ACCESSRULES_NOTFOUND) return r ;
  }
  return S6_ACCESSRULES_NOTFOUND ;
}
