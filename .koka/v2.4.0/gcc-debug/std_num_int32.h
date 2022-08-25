#pragma once
#ifndef kk_std_num_int32_H
#define kk_std_num_int32_H
// Koka generated module: "std/num/int32", koka version: 2.4.0, platform: 64-bit
#include <kklib.h>
#include "std_core_types.h"
#include "std_core_hnd.h"
#include "std_core.h"

// type declarations

// value declarations
 
// Take the bitwise _xor_ of two `:int32`s

static inline int32_t kk_std_num_int32__lp__hat__rp_(int32_t x, int32_t y, kk_context_t* _ctx) { /* (x : int32, y : int32) -> int32 */ 
  return (x ^ y);
}

static inline kk_std_core_types__order kk_std_num_int32_compare(int32_t x, int32_t y, kk_context_t* _ctx) { /* (x : int32, y : int32) -> order */ 
  bool _match_1715 = (x < y); /*bool*/;
  if (_match_1715) {
    return kk_std_core_types__new_Lt(_ctx);
  }
  {
    bool _match_1716 = (x > y); /*bool*/;
    if (_match_1716) {
      return kk_std_core_types__new_Gt(_ctx);
    }
    {
      return kk_std_core_types__new_Eq(_ctx);
    }
  }
}
 
// Return the maximum of two integers

static inline int32_t kk_std_num_int32_max(int32_t i, int32_t j, kk_context_t* _ctx) { /* (i : int32, j : int32) -> int32 */ 
  bool _match_1714 = (i >= j); /*bool*/;
  if (_match_1714) {
    return i;
  }
  {
    return j;
  }
}
 
// Return the minimum of two integers

static inline int32_t kk_std_num_int32_min(int32_t i, int32_t j, kk_context_t* _ctx) { /* (i : int32, j : int32) -> int32 */ 
  bool _match_1713 = (i <= j); /*bool*/;
  if (_match_1713) {
    return i;
  }
  {
    return j;
  }
}

kk_string_t kk_std_num_int32_show_hex(int32_t i, kk_std_core_types__optional width, kk_std_core_types__optional use_capitals, kk_std_core_types__optional pre, kk_context_t* _ctx); /* (i : int32, width : optional<int>, use-capitals : optional<bool>, pre : optional<string>) -> string */ 
 
// Convert an `:int32` to an `:int` but interpret the `:int32` as a 32-bit unsigned value.

static inline kk_integer_t kk_std_num_int32_uint(int32_t i, kk_context_t* _ctx) { /* (i : int32) -> int */ 
  bool _match_1712 = 0 > i; /*bool*/;
  if (_match_1712) {
    kk_integer_t y_1565 = kk_integer_from_int(i,kk_context()); /*int*/;
    return kk_integer_add((kk_integer_from_str("4294967296", _ctx)),y_1565,kk_context());
  }
  {
    return kk_integer_from_int(i,kk_context());
  }
}

static inline kk_std_core_types__order kk_std_num_int32_sign(int32_t i, kk_context_t* _ctx) { /* (i : int32) -> order */ 
  bool _match_1710 = 0 < i; /*bool*/;
  if (_match_1710) {
    return kk_std_core_types__new_Gt(_ctx);
  }
  {
    bool _match_1711 = 0 > i; /*bool*/;
    if (_match_1711) {
      return kk_std_core_types__new_Lt(_ctx);
    }
    {
      return kk_std_core_types__new_Eq(_ctx);
    }
  }
}

extern int32_t kk_std_num_int32_one;

extern int32_t kk_std_num_int32_zero;
 
// Convert a boolean to an `:int32`.

static inline int32_t kk_std_num_int32_int32(bool b, kk_context_t* _ctx) { /* (b : bool) -> int32 */ 
  if (b) {
    return kk_std_num_int32_one;
  }
  {
    return kk_std_num_int32_zero;
  }
}

extern int32_t kk_std_num_int32_min_int32;

int32_t kk_std_num_int32__lp__perc__rp_(int32_t x, int32_t y, kk_context_t* _ctx); /* (x : int32, y : int32) -> int32 */ 

int32_t kk_std_num_int32__lp__fs__rp_(int32_t x, int32_t y, kk_context_t* _ctx); /* (x : int32, y : int32) -> int32 */ 
 
// Negate a 32-bit integer

static inline int32_t kk_std_num_int32_negate(int32_t i, kk_context_t* _ctx) { /* (i : int32) -> int32 */ 
  return (int32_t)((uint32_t)((KK_I32(0))) - (uint32_t)i);
}

int32_t kk_std_num_int32_abs(int32_t i, kk_context_t* _ctx); /* (i : int32) -> exn int32 */ 

int32_t kk_std_num_int32_abs0(int32_t i, kk_context_t* _ctx); /* (i : int32) -> int32 */ 

extern int32_t kk_std_num_int32_bits_int32;
 
// Convert an `:int32` to a boolean.

static inline bool kk_std_num_int32_bool(int32_t i, kk_context_t* _ctx) { /* (i : int32) -> bool */ 
  return (i != kk_std_num_int32_zero);
}

int32_t kk_std_num_int32_cdiv(int32_t i, int32_t j, kk_context_t* _ctx); /* (i : int32, j : int32) -> exn int32 */ 

int32_t kk_std_num_int32_cmod(int32_t i, int32_t j, kk_context_t* _ctx); /* (i : int32, j : int32) -> exn int32 */ 
 
// Decrement a 32-bit integer.

static inline int32_t kk_std_num_int32_dec(int32_t i, kk_context_t* _ctx) { /* (i : int32) -> int32 */ 
  return (int32_t)((uint32_t)i - (uint32_t)((KK_I32(1))));
}
 
// Increment a 32-bit integer.

static inline int32_t kk_std_num_int32_inc(int32_t i, kk_context_t* _ctx) { /* (i : int32) -> int32 */ 
  return (int32_t)((uint32_t)i + (uint32_t)((KK_I32(1))));
}

kk_std_core_types__tuple2_ kk_std_num_int32_divmod(int32_t x, int32_t y, kk_context_t* _ctx); /* (x : int32, y : int32) -> (int32, int32) */ 

kk_box_t kk_std_num_int32__mlift1596_fold_int32(int32_t end, kk_function_t f, int32_t start, kk_box_t x, kk_context_t* _ctx); /* forall<a,e> (end : int32, f : (int32, a) -> e a, start : int32, x : a) -> e a */ 

kk_box_t kk_std_num_int32_fold_int32(int32_t start0, int32_t end0, kk_box_t init, kk_function_t f0, kk_context_t* _ctx); /* forall<a,e> (start : int32, end : int32, init : a, f : (int32, a) -> e a) -> e a */ 
 
// Returns `true` if the integer `i`  is an even number.

static inline bool kk_std_num_int32_is_even(int32_t i, kk_context_t* _ctx) { /* (i : int32) -> bool */ 
  int32_t _x1753 = (i & ((KK_I32(1)))); /*int32*/
  return (_x1753 == ((KK_I32(0))));
}
 
// Returns `true` if the integer `i`  is an odd number.

static inline bool kk_std_num_int32_is_odd(int32_t i, kk_context_t* _ctx) { /* (i : int32) -> bool */ 
  int32_t _x1754 = (i & ((KK_I32(1)))); /*int32*/
  return (_x1754 == ((KK_I32(1))));
}

extern int32_t kk_std_num_int32_max_int32;
 
// Bitwise rotate an `:int32` `n % 32` bits to the left.

static inline int32_t kk_std_num_int32_rotl(int32_t i, kk_integer_t shift, kk_context_t* _ctx) { /* (i : int32, shift : int) -> int32 */ 
  return (int32_t)kk_bits_rotl32(i,(kk_std_core_int32(shift, _ctx)));
}
 
// Bitwise rotate an `:int32` `n % 32` bits to the right.

static inline int32_t kk_std_num_int32_rotr(int32_t i, kk_integer_t shift, kk_context_t* _ctx) { /* (i : int32, shift : int) -> int32 */ 
  return (int32_t)kk_bits_rotr32(i,(kk_std_core_int32(shift, _ctx)));
}
 
// Arithmetic shift an `:int32` to the right by `n % 32` bits. Shifts in the sign bit from the left.

static inline int32_t kk_std_num_int32_sar(int32_t i, kk_integer_t shift, kk_context_t* _ctx) { /* (i : int32, shift : int) -> int32 */ 
  return kk_sar32(i,(kk_std_core_int32(shift, _ctx)));
}
 
// Shift an `:int32` `i` to the left by `n & 31` bits.

static inline int32_t kk_std_num_int32_shl(int32_t i, kk_integer_t shift, kk_context_t* _ctx) { /* (i : int32, shift : int) -> int32 */ 
  return kk_shl32(i,(kk_std_core_int32(shift, _ctx)));
}
 
// Convert an `:int32` to a string

static inline kk_string_t kk_std_num_int32_show(int32_t i, kk_context_t* _ctx) { /* (i : int32) -> string */ 
  kk_integer_t _x1755 = kk_integer_from_int(i,kk_context()); /*int*/
  return kk_std_core_show(_x1755, _ctx);
}

kk_string_t kk_std_num_int32_show_hex32(int32_t i, kk_std_core_types__optional width, kk_std_core_types__optional use_capitals, kk_std_core_types__optional pre, kk_context_t* _ctx); /* (i : int32, width : optional<int>, use-capitals : optional<bool>, pre : optional<string>) -> string */ 
 
// Logical shift an `:int32` to the right by `n % 32` bits. Shift in zeros from the left.

static inline int32_t kk_std_num_int32_shr(int32_t i, kk_integer_t shift, kk_context_t* _ctx) { /* (i : int32, shift : int) -> int32 */ 
  return (int32_t)kk_shr32(i,(kk_std_core_int32(shift, _ctx)));
}

int32_t kk_std_num_int32_uint32(kk_integer_t i, kk_context_t* _ctx); /* (i : int) -> int32 */ 
 
// Negate an 32-bit integer

static inline int32_t kk_std_num_int32__lp__tilde__rp_(int32_t i, kk_context_t* _ctx) { /* (i : int32) -> total int32 */ 
  return (int32_t)((uint32_t)((KK_I32(0))) - (uint32_t)i);
}

void kk_std_num_int32__init(kk_context_t* _ctx);


void kk_std_num_int32__done(kk_context_t* _ctx);

#endif // header
