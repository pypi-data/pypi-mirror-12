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
#include <fcntl.h>
#include <limits.h>
#include <stddef.h>
#include <stdio.h>
#include <string.h>
#include <sys/types.h>
#include <sys/stat.h>
#include <termios.h>
#include <unistd.h>

#include "getline.h"
#include "ttyprompt.h"

static volatile int prompting = 0;

/*@ assigns \result \from fd, str, len;
    assigns prompting;
 */
static int
print_prompt(const int fd, const char *str, const size_t len)
{
    assert(fd >= 0);
    assert(str != NULL);
    assert(prompting == 0);
    if (len == 0) {
        return 0;
    }
    if (len > (size_t) SSIZE_MAX) {
        goto error;
    }
    if (write(fd, str, len) != (ssize_t) len) {
        goto error;
    }
    prompting = 1;
    return 0;
error:
    return 1;
}

/*@ assigns \result \from fd;
    assigns prompting;
 */
static int
terminate_prompt(const int fd)
{
    assert(fd >= 0);
    assert(prompting != 0);
    if (write(fd, "\n", 1) != 1) {
        goto error;
    }
    prompting = 0;
    return 0;
error:
    return 1;
}

static int tty_fd = -1;

/*@ requires \valid(out) && \valid(size);
    requires valid_string(prompt);
    assigns prompting, tty_fd, *out, *size;
    assigns errno;
 */
int
ttyprompt(const char *prompt, char **out, size_t *size)
{
    char tty_name[L_ctermid + 1];
    size_t i;

    if (out == NULL || size == NULL) {
        goto error0;
    }

    if (tty_fd == -1) {
        (void) ctermid(tty_name);
        if ((tty_fd = open(tty_name, O_RDWR)) < 0) {
            goto error1;
        }
    }

    if (tcflush(tty_fd, TCIOFLUSH) != 0) {
        goto error2;
    }
    if (prompt != NULL) {
        if (print_prompt(tty_fd, prompt, strlen(prompt)) != 0) {
            goto error2;
        }
    }

    if (getline(tty_fd, out, size) != 0) {
        goto error3;
    }

    if (prompt != NULL && *size == 0) {
        if (prompting != 0) {
            if (terminate_prompt(tty_fd) != 0) {
                goto error2;
            }
            prompting = 0;
        }
    }

    if (close(tty_fd) != 0) {
        goto error0;
    }
    tty_fd = -1;

    for (i = 0; i < *size; i++) {
        if ((*out)[i] == '\n') {
            (*out)[i] = '\0';
            *size = i;
            break;
        }
    }

    return 0;

error3:
    if (prompt != NULL) {
        if (prompting != 0) {
            (void) terminate_prompt(tty_fd);
            prompting = 0;
        }
    }
error2:
    (void) close(tty_fd);
    tty_fd = -1;
error1:
    ;
error0:
    return 1;
}
