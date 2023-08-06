/* Copyright 2014, 2015, Mansour Moufid <mansourmoufid@gmail.com>
 *
 * Permission to use, copy, modify, and/or distribute this software for any
 * purpose with or without fee is hereby granted, provided that the above
 * copyright notice and this permission notice appear in all copies.
 *
 * THIS SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES
 * WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF
 * MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR
 * ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES
 * WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN
 * ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF
 * OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 */

#if !defined(_POSIX_C_SOURCE)
#define _POSIX_C_SOURCE 200112L
#endif

#include <assert.h>
#include <errno.h>
#include <limits.h>
#include <stddef.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <sys/types.h>
#include <unistd.h>

#include "getline.h"
#include "sizeop.h"

#if !defined(MAX_INPUT)
#define MAX_INPUT 255
#endif

/*@ requires \valid((char *) buf);
    requires nbyte <= SSIZE_MAX;
    behavior success:
        assigns *((char *)buf + (0 .. nbyte - 1)) \from fd, nbyte;
        ensures 0 <= \result <= nbyte;
    behavior failure:
        ensures \result < 0;
        assigns \nothing;
    complete behaviors success, failure;
    disjoint behaviors success, failure;
 */
ssize_t read(int fd, void *buf, size_t nbyte);

/*@ requires \valid(out) && \valid(size);
    assigns *out, *size \from fd;
    assigns errno;
 */
int
getline(const int fd, char **out, size_t *size)
{
    int eol;
    ssize_t i;
    size_t j, n;
    char *p;
    char read_buffer[MAX_INPUT];

    if (fd < 0 || out == NULL || size == NULL) {
        goto error0;
    }

    n = 0;
    eol = 0;
    /*@ loop assigns i, j, n, errno;
     */
    do {
        errno = 0;
        i = read(fd, read_buffer, sizeof(read_buffer));
        if (i < 0) {
            if (errno == EAGAIN) {
                (void) sleep(1);
                continue;
            }
            goto error1;
        }
        if (i == 0) {
            /* EOF */
            break;
        }
        /*@ assert i > 0; */

        /*@ loop invariant i;
            loop invariant j >= 0;
            loop assigns j, eol;
         */
        for (j = 0; j < (size_t) i; j++) {
            if (read_buffer[j] == '\n') {
                eol = 1;
                j++;
                break;
            }
        }

        if (size_add(&n, n, j) != 0) {
            goto error2;
        }
        if (size_add_check(n, 1) == 0) {
            goto error2;
        }

        if (n + 1 > *size) {
            p = realloc(*out, n + 1);
            if (p == NULL) {
                goto error3;
            }
            *out = p;
        }

        memcpy(*out + n - j, read_buffer, j);
        *(*out + n) = '\0';
    } while (eol == 0);

    *size = n;

    return 0;

error3:
    ;
error2:
    ;
error1:
    if (*out != NULL) {
        free(*out);
        *out = NULL;
    }
    *size = 0;
error0:
    ;
    return 1;
}
