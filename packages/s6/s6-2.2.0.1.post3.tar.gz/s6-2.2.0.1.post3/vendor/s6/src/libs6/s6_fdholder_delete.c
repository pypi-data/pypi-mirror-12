 /* ISC license. */

#include <errno.h>
#include <skalibs/allreadwrite.h>
#include <skalibs/error.h>
#include <skalibs/tai.h>
#include <skalibs/unixmessage.h>
#include <s6/s6-fdholder.h>

int s6_fdholder_delete (s6_fdholder_t *a, char const *id, tain_t const *deadline, tain_t *stamp)
{
  unixmessage_t m ;
  if (!s6_fdholder_delete_async(a, id)) return 0 ;
  if (!unixmessage_sender_timed_flush(&a->connection.out, deadline, stamp)) return 0 ;
  if (sanitize_read(unixmessage_timed_receive(&a->connection.in, &m, deadline, stamp)) < 0) return 0 ;
  if (m.len != 1 || m.nfds)
  {
    unixmessage_drop(&m) ;
    return (errno = EPROTO, 0) ;
  }
  return m.s[0] ? (errno = m.s[0], 0) : 1 ;
}
