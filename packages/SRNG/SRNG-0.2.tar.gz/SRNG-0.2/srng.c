/* Copyright 2015, Mansour Moufid <mansourmoufid@gmail.com>
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

#include <assert.h>
#include <stddef.h>
#include <stdint.h>

#include "srng.h"

static const uint64_t C0 = 6148914691236517223ULL;
static const uint64_t C1 = 4294967291ULL;

void
srng_srand(struct srng_state *state, uint64_t seed)
{
    uint64_t s0, s1;
    assert(state != NULL);
    s0 = C0 ^ seed;
    s0 = C1 * s0;
    s1 = C1 * s0;
    state->s0 = s0;
    state->s1 = s1;
}

uint64_t
srng_rand(struct srng_state *state)
{
    uint64_t s0, s1;
    assert(state != NULL);
    s0 = state->s1;
    s1 = state->s0;
    s1 ^= s1 << 23;
    state->s0 = s0;
    state->s1 = s1 ^ s0 ^ (s1 >> 17) ^ (s0 >> 26);
    return state->s1 + s0;
}

float
srng_randf(struct srng_state *state)
{
    uint64_t r;
    union {
        uint32_t i;
        float f;
    } u;
    r = srng_rand(state);
    u.i = (uint32_t) r;
    u.i &= 0x007fffff;
    u.i |= 0x3f800000;
    u.f -= 1.f;
    return u.f;
}
