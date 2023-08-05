/* ISC license. */

#ifndef GENSETDYN_H
#define GENSETDYN_H

#include <skalibs/stralloc.h>
#include <skalibs/genalloc.h>
#include <skalibs/functypes.h>

typedef struct gensetdyn_s gensetdyn, *gensetdyn_ref ;
struct gensetdyn_s
{
  stralloc storage ;
  genalloc freelist ; /* array of unsigned int */
  unsigned int esize ;
  unsigned int base ;
  unsigned int fracnum ;
  unsigned int fracden ;
} ;

#define GENSETDYN_ZERO { .storage = STRALLOC_ZERO, .freelist = GENALLOC_ZERO, .esize = 1, .base = 0, .fracnum = 0, .fracden = 1 }
extern gensetdyn const gensetdyn_zero ;

#define GENSETDYN_INIT(type, b, num, den) { .storage = STRALLOC_ZERO, .freelist = GENALLOC_ZERO, .esize = sizeof(type), .base = (b), .fracnum = (num), .fracden = (den) }
extern void gensetdyn_init (gensetdyn *, unsigned int, unsigned int, unsigned int, unsigned int) ;

#define gensetdyn_n(g) ((g)->storage.len - genalloc_len(unsigned int, &(g)->freelist))
extern int gensetdyn_ready (gensetdyn *, unsigned int) ;
#define gensetdyn_readyplus(x, n) gensetdyn_ready(x, gensetdyn_n(x) + (n))
extern void gensetdyn_free (gensetdyn *) ;

extern int gensetdyn_new (gensetdyn *, unsigned int *) ;
extern int gensetdyn_delete (gensetdyn *, unsigned int) ;

#define gensetdyn_p(g, i) ((g)->storage.s + (i) * (g)->esize)
#define GENSETDYN_P(type, g, i) ((type *)gensetdyn_p(g, i))

extern unsigned int gensetdyn_iter_nocancel (gensetdyn *, unsigned int, iterfunc_t_ref, void *) ;
#define gensetdyn_iter(g, f, stuff) gensetdyn_iter_nocancel(g, gensetdyn_n(g), f, stuff)
extern int gensetdyn_iter_withcancel (gensetdyn *, iterfunc_t_ref, iterfunc_t_ref, void *) ;

#endif
