/* ISC license. */

#ifndef ALLREADWRITE_H
#define ALLREADWRITE_H

#include <sys/types.h>
#include <sys/uio.h>
#include <skalibs/functypes.h>
#include <skalibs/siovec.h>

extern int sanitize_read (int) ;
extern int unsanitize_read (int) ;

extern unsigned int allreadwrite (iofunc_t_ref, int, char *, unsigned int) ;
extern unsigned int allreadwritev (iovfunc_t_ref, int, siovec_t const *, unsigned int) ;

extern int fd_read (int, char *, unsigned int) ;
extern int fd_write (int, char const *, unsigned int) ;

extern int fd_recv (int, char *, unsigned int, unsigned int) ;
extern int fd_send (int, char const *, unsigned int, unsigned int) ;

extern unsigned int allread (int, char *, unsigned int) ;
extern unsigned int allwrite (int, char const *, unsigned int) ;
extern unsigned int allreadv (int, siovec_t const *, unsigned int) ;
extern unsigned int allwritev (int, siovec_t const *, unsigned int) ;

extern int fd_readv (int, struct iovec const *, unsigned int) ;
extern int fd_readsv (int, siovec_t const *, unsigned int) ;
extern int fd_writev (int, struct iovec const *, unsigned int) ;
extern int fd_writesv (int, siovec_t const *, unsigned int) ;

#endif
