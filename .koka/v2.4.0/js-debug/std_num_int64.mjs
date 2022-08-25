// Koka generated module: "std/num/int64", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_text_regex from './std_text_regex.mjs';
import * as $v1_std_data_dict from './v1_std_data_dict.mjs';
import * as $compat from './compat.mjs';
import * as $compat_regex from './compat_regex.mjs';
import * as $common from './common.mjs';
import * as $v1_std_log from './v1_std_log.mjs';
import * as $std_os_env from './std_os_env.mjs';
import * as $std_data_dict from './std_data_dict.mjs';
import * as $std_os_flags from './std_os_flags.mjs';
 
// externals
 
// type declarations
 
// declarations
 
 
// Take the bitwise _xor_ of two `:int64`s
export function _lp__hat__rp_(x, y) /* (x : int64, y : int64) -> int64 */  {
  return x ^ y;
}
 
export function compare(x, y) /* (x : int64, y : int64) -> order */  {
  if ((x < y)) {
    return $std_core_types.Lt;
  }
  else {
    return ((x > y)) ? $std_core_types.Gt : $std_core_types.Eq;
  }
}
 
 
// Return the maximum of two integers
export function max(i, j) /* (i : int64, j : int64) -> int64 */  {
  return ((i >= j)) ? i : j;
}
 
 
// Return the minimum of two integers
export function min(i, j) /* (i : int64, j : int64) -> int64 */  {
  return ((i <= j)) ? i : j;
}
 
 
// Show an `:int64` in hexadecimal notation
// The `width`  parameter specifies how wide the hex value is where `'0'`  is used to align.\
// The `use-capitals` parameter (= `True`) determines if captical letters should be used to display the hexadecimal digits.\
// The `pre` (=`"0x"`) is an optional prefix for the number (goes between the sign and the number).
export function show_hex(i, width, use_capitals, pre) /* (i : int64, width : optional<int>, use-capitals : optional<bool>, pre : optional<string>) -> string */  {
  var _x0 = (width !== undefined) ? width : 1;
  var _x1 = (use_capitals !== undefined) ? use_capitals : true;
  var _x2 = (pre !== undefined) ? pre : "0x";
  return $std_core.show_hex($std_core._int_from_int64(i), _x0, _x1, _x2);
}
 
 
// Convert an `:int64` to an `:int` but interpret the `:int64` as a 64-bit unsigned value.
export function uint(i) /* (i : int64) -> int */  {
  if (0n > i) {
     
    var y_1654 = $std_core._int_from_int64(i);
    return $std_core._int_add(($std_core._int_const(18446744073709551616n)),y_1654);
  }
  else {
    return $std_core._int_from_int64(i);
  }
}
 
export function sign(i) /* (i : int64) -> order */  {
  if (0n < i) {
    return $std_core_types.Gt;
  }
  else {
    return (0n > i) ? $std_core_types.Lt : $std_core_types.Eq;
  }
}
 
export var one;
var one = 1n;
 
export var zero;
var zero = 0n;
 
 
// Convert a boolean to an `:int64`.
export function int64_1(b) /* (b : bool) -> int64 */  {
  return (b) ? one : zero;
}
 
 
// Shift an `:int64` `i` to the left by `n % 64` bits.
export function shl(i, shift) /* (i : int64, shift : int) -> int64 */  {
  return $std_core._int64_shl(i,($std_core.int64(shift)));
}
 
 
// Create an `:int64` `i` from the bits of `lo` and `hi` such
// that `i.int = hi.int * 0x1_0000_0000 + lo.uint`.
export function int64_2(lo, hi) /* (lo : int32, hi : int32) -> int64 */  {
   
  var i_1655 = $std_core._int64_from_int32(hi);
  return ($std_core._int64_shl(i_1655,32n)) | ($std_core._int64_from_uint32(lo));
}
 
 
// The maximal integer value before overflow happens
export var max_int64;
var max_int64 = $std_core.int64($std_core._int_const(9223372036854775807n));
 
 
// Convert an `:int` to `:int64` but interpret the `int` as an unsigned 64-bit value.
// `i` is clamped between `0` and `0xFFFF_FFFF_FFFF_FFFF`.\
// `0x7FFF_FFFF_FFFF_FFFF.uint64 == 0x7FFF_FFFF_FFFF_FFFF.int64 == max-int64`\
// `0x8000_0000_0000_0000.uint64 == -0x8000_0000_0000_0000.int64 == min-int64`\
// `0xFFFF_FFFF_FFFF_FFFF.uint64 == -1.int64`\
export function uint64_1(i) /* (i : int) -> int64 */  {
  var _x4 = $std_core._int_gt(i,($std_core._int_from_int64(max_int64)));
  var _x3 = (_x4) ? $std_core._int_sub(i,($std_core._int_const(18446744073709551616n))) : i;
  return $std_core.int64(_x3);
}
 
 
// The minimal integer value before underflow happens
export var min_int64;
var min_int64 = $std_core.int64($std_core._int_const(-9223372036854775808n));
 
 
// Euclidean-0 modulus. See `(/):(x : int64, y : int64) -> int64` division for more information.
export function _lp__perc__rp_(x, y) /* (x : int64, y : int64) -> int64 */  {
  var _x5 = (y === 0n);
  if (_x5) {
    return x;
  }
  else {
    var _x6 = (y === (-1n));
    if (_x6) {
      if ((x === min_int64)) {
        return 0n;
      }
      else {
         
        var r = x % y;
        var _x7 = (r >= 0n);
        if (_x7) {
          return r;
        }
        else {
          var _x8 = (y > 0n);
          return (_x8) ? BigInt.asIntN(64,r + y) : BigInt.asIntN(64,r - y);
        }
      }
    }
    else {
       
      var r0 = x % y;
      var _x9 = (r0 >= 0n);
      if (_x9) {
        return r0;
      }
      else {
        var _x10 = (y > 0n);
        return (_x10) ? BigInt.asIntN(64,r0 + y) : BigInt.asIntN(64,r0 - y);
      }
    }
  }
}
 
 
// Decrement a 64-bit integer.
export function dec(i) /* (i : int64) -> int64 */  {
  return BigInt.asIntN(64,i - 1n);
}
 
 
// Increment a 64-bit integer.
export function inc(i) /* (i : int64) -> int64 */  {
  return BigInt.asIntN(64,i + 1n);
}
 
 
/* 
Euclidean-0 division.
Euclidean division is defined as: For any `D`  and `d`  where `d!=0` , we have:
1. `D == d*(D/d) + (D%d)`
2. `D%d`  is always positive where `0 <= D%d < abs(d)`
Moreover, Euclidean-0 is a total function, for the case where `d==0`  we have
that `D%0 == D`  and `D/0 == 0` . So property (1) still holds, but not property (2).
Useful laws that hold for Euclidean-0 division:
* `D/(-d) == -(D/d)`
* `D%(-d) == D%d`
* `D/(2^n) == sar(D,n)         `  (with `0 <= n <= 31`)
* `D%(2^n) == D & ((2^n) - 1)  `  (with `0 <= n <= 31`)
Note that an interesting edge case is `min-int64 / -1` which equals `min-int64` since in modulo 64-bit
arithmetic `min-int64 == -1 * min-int64 == -1 * (min-int64 / -1) + (min-int64 % -1)` satisfying property (1).
Of course `(min-int64 + 1) / -1` is again positive (namely `max-int64`).
See also _Division and modulus for computer scientists, Daan Leijen, 2001_ 
[pdf](http://research.microsoft.com/pubs/151917/divmodnote.pdf) .
*/
export function _lp__fs__rp_(x, y) /* (x : int64, y : int64) -> int64 */  {
  var _x11 = (y === 0n);
  if (_x11) {
    return 0n;
  }
  else {
    var _x12 = (y === (-1n));
    if (_x12) {
      if ((x === min_int64)) {
        return x;
      }
      else {
         
        var q = x / y;
         
        var r = x % y;
        var _x13 = (r >= 0n);
        if (_x13) {
          return q;
        }
        else {
          var _x14 = (y > 0n);
          if (_x14) {
            return BigInt.asIntN(64,q - 1n);
          }
          else {
            return BigInt.asIntN(64,q + 1n);
          }
        }
      }
    }
    else {
       
      var q0 = x / y;
       
      var r0 = x % y;
      var _x15 = (r0 >= 0n);
      if (_x15) {
        return q0;
      }
      else {
        var _x16 = (y > 0n);
        if (_x16) {
          return BigInt.asIntN(64,q0 - 1n);
        }
        else {
          return BigInt.asIntN(64,q0 + 1n);
        }
      }
    }
  }
}
 
 
// Negate a 64-bit integer
export function negate(i) /* (i : int64) -> int64 */  {
  return BigInt.asIntN(64,0n - i);
}
 
 
// Return the absolute value of an integer.
// Raises an exception if the `:int64` is `min-int64`
// (since the negation of `min-int64` equals itself and is still negative)
export function abs(i) /* (i : int64) -> exn int64 */  {
   
  var _x1_1688 = 0n > i;
  var _x17 = $std_core_hnd._open_none1(function(b /* bool */ ) {
      return (b) ? false : true;
    }, _x1_1688);
  if (_x17) {
    return i;
  }
  else {
    if ((i > min_int64)) {
      return BigInt.asIntN(64,0n - i);
    }
    else {
      return $std_core.$throw("std/num/int64/abs: cannot make min-int64 into a positive int64 without overflow");
    }
  }
}
 
 
// Return the absolute value of an integer.
// Returns 0 if the `:int64` is `min-int64`
// (since the negation of `min-int64` equals itself and is still negative)
export function abs0(i) /* (i : int64) -> int64 */  {
   
  var b_1663 = 0n > i;
  if (b_1663) {
    if ((i > min_int64)) {
      return BigInt.asIntN(64,0n - i);
    }
    else {
      return 0n;
    }
  }
  else {
    return i;
  }
}
 
 
// The number of bits in an `:int64` (always 64)
export var bits_int64;
var bits_int64 = 64n;
 
 
// Convert an `:int64` to a boolean.
export function bool(i) /* (i : int64) -> bool */  {
  return (i !== zero);
}
 
 
// Truncated division (as in C). See also `(/):(x : int64, y : int64) -> int64`.
export function cdiv(i, j) /* (i : int64, j : int64) -> exn int64 */  {
  if (0n === j) {
    return $std_core.$throw("std/num/int64/cdiv: division by zero");
  }
  else {
    var _x18 = (j === (-1n));
    if (_x18) {
      if ((i === min_int64)) {
        return $std_core.$throw("std/num/int64/cdiv: division overflow in cdiv(min-int64, -1.int64)");
      }
      else {
        return i / j;
      }
    }
    else {
      return i / j;
    }
  }
}
 
 
// Truncated modulus (as in C). See also `(%):(x : int64, y : int64) -> int64`.
export function cmod(i, j) /* (i : int64, j : int64) -> exn int64 */  {
  if (0n === j) {
    return $std_core.$throw("std/num/int64/cmod: modulus by zero");
  }
  else {
    var _x19 = (j === (-1n));
    if (_x19) {
      if ((i === min_int64)) {
        return $std_core.$throw("std/num/int64/cmod: modulus overflow in cmod(min-int64, -1.int64)");
      }
      else {
        return i % j;
      }
    }
    else {
      return i % j;
    }
  }
}
 
export function divmod(x, y) /* (x : int64, y : int64) -> (int64, int64) */  {
  if (0n === y) {
    return $std_core_types._Tuple2_(zero, x);
  }
  else {
    var _x20 = (y === (-1n));
    if (_x20) {
      if ((x === min_int64)) {
        return $std_core_types._Tuple2_(x, 0n);
      }
      else {
         
        var q = x / y;
         
        var r = x % y;
        var _x21 = (r >= 0n);
        if (_x21) {
          return $std_core_types._Tuple2_(q, r);
        }
        else {
          var _x22 = (y > 0n);
          if (_x22) {
            return $std_core_types._Tuple2_(BigInt.asIntN(64,q - 1n), BigInt.asIntN(64,r + y));
          }
          else {
            return $std_core_types._Tuple2_(BigInt.asIntN(64,q + 1n), BigInt.asIntN(64,r - y));
          }
        }
      }
    }
    else {
       
      var q0 = x / y;
       
      var r0 = x % y;
      var _x23 = (r0 >= 0n);
      if (_x23) {
        return $std_core_types._Tuple2_(q0, r0);
      }
      else {
        var _x24 = (y > 0n);
        if (_x24) {
          return $std_core_types._Tuple2_(BigInt.asIntN(64,q0 - 1n), BigInt.asIntN(64,r0 + y));
        }
        else {
          return $std_core_types._Tuple2_(BigInt.asIntN(64,q0 + 1n), BigInt.asIntN(64,r0 - y));
        }
      }
    }
  }
}
 
 
// Convert an 64-bit integer to a `:float64`.
export function float64(i) /* (i : int64) -> float64 */  {
  return $std_core._int_to_double(($std_core._int_from_int64(i)));
}
 
 
// monadic lift
export function _mlift1689_fold_int64(end, f, start, x) /* forall<a,e> (end : int64, f : (int64, a) -> e a, start : int64, x : a) -> e a */  {
  return fold_int64(BigInt.asIntN(64,start + 1n), end, x, f);
}
 
export function fold_int64(start0, end0, init, f0) /* forall<a,e> (start : int64, end : int64, init : a, f : (int64, a) -> e a) -> e a */  { tailcall: while(1)
{
  if ((start0 >= end0)) {
    return init;
  }
  else {
     
    var x0_1690 = f0(start0, init);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(x1 /* 1428 */ ) {
        return _mlift1689_fold_int64(end0, f0, start0, x1);
      });
    }
    else {
      {
        // tail call
        var _x25 = BigInt.asIntN(64,start0 + 1n);
        start0 = _x25;
        init = x0_1690;
        continue tailcall;
      }
    }
  }
}}
 
 
// Returns `true` if the integer `i`  is an even number.
export function is_even(i) /* (i : int64) -> bool */  {
  return ((i & one) === zero);
}
 
 
// Returns `true` if the integer `i`  is an odd number.
export function is_odd(i) /* (i : int64) -> bool */  {
  return ((i & one) === one);
}
 
 
// Bitwise rotate an `:int64` `n % 64` bits to the left.
export function rotl(i, shift) /* (i : int64, shift : int) -> int64 */  {
  return $std_core._int64_rotl(i,($std_core.int64(shift)));
}
 
 
// Bitwise rotate an `:int64` `n % 64` bits to the right.
export function rotr(i, shift) /* (i : int64, shift : int) -> int64 */  {
  return $std_core._int64_rotr(i,($std_core.int64(shift)));
}
 
 
// Arithmetic shift an `:int64` to the right by `n % 64` bits. Shift in the sign bit from the left.
export function sar(i, shift) /* (i : int64, shift : int) -> int64 */  {
  return $std_core._int64_sar(i,($std_core.int64(shift)));
}
 
 
// Convert an `:int64` to a string
export function show(i) /* (i : int64) -> string */  {
  return $std_core.show($std_core._int_from_int64(i));
}
 
 
// Show an `:int64` in hexadecimal notation interpreted as an unsigned 64-bit value.
// The `width`  parameter specifies how wide the hex value is where `'0'`  is used to align.\
// The `use-capitals` parameter (= `True`) determines if captical letters should be used to display the hexadecimal digits.\
// The `pre` (=`"0x"`) is an optional prefix for the number.
export function show_hex64(i, width, use_capitals, pre) /* (i : int64, width : optional<int>, use-capitals : optional<bool>, pre : optional<string>) -> string */  {
  var _x26 = (width !== undefined) ? width : 16;
  var _x27 = (use_capitals !== undefined) ? use_capitals : true;
  var _x28 = (pre !== undefined) ? pre : "0x";
  return $std_core.show_hex(uint(i), _x26, _x27, _x28);
}
 
 
// Logical shift an `:int64` to the right by `n % 64` bits. Shift in zeros from the left.
export function shr(i, shift) /* (i : int64, shift : int) -> int64 */  {
  return $std_core._int64_shr(i,($std_core.int64(shift)));
}
 
 
// Negate an 64-bit integer
export function _lp__tilde__rp_(i) /* (i : int64) -> total int64 */  {
  return BigInt.asIntN(64,0n - i);
}