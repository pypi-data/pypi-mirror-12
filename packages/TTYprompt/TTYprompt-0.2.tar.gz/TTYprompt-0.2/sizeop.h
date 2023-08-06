/* Copyright 2013-2015, Mansour Moufid <mansourmoufid@gmail.com>
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

#if !defined(SIZEOP_H)
#define SIZEOP_H

#include <assert.h>
#include <stddef.h>
#include <stdint.h>

size_t size_nextpow2(const size_t);
int size_gcd(size_t *, const size_t, const size_t);
int size_lcm(size_t *, const size_t, const size_t);

/*@ ensures \result <= x && \result <= y;
    ensures \result == x || \result == y;
    assigns \nothing;
 */
static inline size_t
size_min(const size_t x, const size_t y)
{
    return (x < y) ? x : y;
}

/*@ ensures \result >= x && \result >= y;
    ensures \result == x || \result == y;
    assigns \nothing;
 */
static inline size_t
size_max(const size_t x, const size_t y)
{
    return (x > y) ? x : y;
}

/*
 * Return non-zero if the argument is a power of two.
 */
static inline int
size_ispow2(const size_t x)
{
    return (x > 0 && (x & (x - 1)) == 0);
}

/*
 * Return non-zero if and only if the sum of the arguments is exact.
 */
/*@ ensures ((0 <= x + y <= SIZE_MAX) && \result != 0) ||
            ((x + y > SIZE_MAX) && \result == 0);
    assigns \nothing;
 */
static inline int
size_add_check(const size_t x, const size_t y)
{
    return (x <= SIZE_MAX - y);
}

/*
 * Return non-zero if and only if the difference of the arguments is exact.
 */
/*@ ensures ((0 <= x - y <= SIZE_MAX) && \result != 0) ||
            ((x - y < 0) && \result == 0);
    assigns \nothing;
 */
static inline int
size_sub_check(const size_t x, const size_t y)
{
    return (x >= y);
}

#define SQRT_SIZE_MAX (((size_t) SIZE_MAX) >> (sizeof(size_t) * 8 / 2))

/*
 * Return non-zero if and only if the product of the arguments is exact.
 */
/*@ ensures ((0 <= x * y <= SIZE_MAX) && \result != 0) ||
            ((x * y > SIZE_MAX) && \result == 0);
    assigns \nothing;
 */
static inline int
size_mul_check(const size_t x, const size_t y)
{
    return ((x <= SQRT_SIZE_MAX && y <= SQRT_SIZE_MAX) ||
            y == 0 || x <= SIZE_MAX / y);
}

/*
 * Return non-zero if and only if the quotient of the arguments is exact.
 */
/*@ ensures ((y > 0 && 0 <= x / y <= SIZE_MAX) && \result != 0) ||
            ((y == 0) && \result == 0);
    assigns \nothing;
 */
static inline int
size_div_check(const size_t x, const size_t y)
{
    (void) x;
    return (y != 0);
}

/*@ requires \valid(z);
    behavior success:
        assumes x + y <= SIZE_MAX;
        assigns *z;
        ensures *z == x + y && \result == 0;
    behavior failure:
        assumes x + y > SIZE_MAX;
        assigns \nothing;
        ensures \result != 0;
    complete behaviors success, failure;
    disjoint behaviors success, failure;
 */
static inline int
size_add(size_t *z, const size_t x, const size_t y)
{
    assert(z != NULL);
    if (size_add_check(x, y) != 0) {
        /*@ assert 0 <= x + y <= SIZE_MAX; */
        *z = x + y;
        return 0;
    }
    return 1;
}

/*@ requires \valid(z);
    behavior success:
        assumes 0 <= x - y;
        assigns *z;
        ensures *z == x - y && \result == 0;
    behavior failure:
        assumes x - y < 0;
        assigns \nothing;
        ensures \result != 0;
    complete behaviors success, failure;
    disjoint behaviors success, failure;
 */
static inline int
size_sub(size_t *z, const size_t x, const size_t y)
{
    assert(z != NULL);
    if (size_sub_check(x, y) != 0) {
        /*@ assert 0 <= x - y <= SIZE_MAX; */
        *z = x - y;
        return 0;
    }
    return 1;
}

/*@ requires \valid(z);
    behavior success:
        assumes x * y <= SIZE_MAX;
        assigns *z;
        ensures *z == x * y && \result == 0;
    behavior failure:
        assumes x * y > SIZE_MAX;
        assigns \nothing;
        ensures \result != 0;
    complete behaviors success, failure;
    disjoint behaviors success, failure;
 */
static inline int
size_mul(size_t *z, const size_t x, const size_t y)
{
    assert(z != NULL);
    if (size_mul_check(x, y) != 0) {
        /*@ assert 0 <= x * y <= SIZE_MAX; */
        *z = x * y;
        return 0;
    }
    return 1;
}

/*@ requires \valid(z);
    behavior success:
        assumes y != 0;
        assigns *z;
        ensures *z == x / y && \result == 0;
    behavior failure:
        assumes y == 0;
        assigns \nothing;
        ensures \result != 0;
    complete behaviors success, failure;
    disjoint behaviors success, failure;
 */
static inline int
size_div(size_t *z, const size_t x, const size_t y)
{
    assert(z != NULL);
    if (size_div_check(x, y) != 0) {
        /*@ assert y > 0 && 0 <= x / y <= SIZE_MAX; */
        *z = x / y;
        return 0;
    }
    return 1;
}

#endif
