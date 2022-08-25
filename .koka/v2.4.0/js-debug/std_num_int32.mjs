// Koka generated module: "std/num/int32", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
 
// externals
 
// type declarations
 
// declarations
 
 
// Take the bitwise _xor_ of two `:int32`s
export function _lp__hat__rp_(x, y) /* (x : int32, y : int32) -> int32 */  {
  return (x ^ y);
}
 
export function compare(x, y) /* (x : int32, y : int32) -> order */  {
  if ((x < y)) {
    return $std_core_types.Lt;
  }
  else {
    return ((x > y)) ? $std_core_types.Gt : $std_core_types.Eq;
  }
}
 
 
// Return the maximum of two integers
export function max(i, j) /* (i : int32, j : int32) -> int32 */  {
  return ((i >= j)) ? i : j;
}
 
 
// Return the minimum of two integers
export function min(i, j) /* (i : int32, j : int32) -> int32 */  {
  return ((i <= j)) ? i : j;
}
 
 
// Show an `:int32` in hexadecimal notation
// The `width`  parameter specifies how wide the hex value is where `'0'`  is used to align.\
// The `use-capitals` parameter (= `True`) determines if captical letters should be used to display the hexadecimal digits.\
// The `pre` (=`"0x"`) is an optional prefix for the number (goes between the sign and the number).
export function show_hex(i, width, use_capitals, pre) /* (i : int32, width : optional<int>, use-capitals : optional<bool>, pre : optional<string>) -> string */  {
  var _x0 = (width !== undefined) ? width : 1;
  var _x1 = (use_capitals !== undefined) ? use_capitals : true;
  var _x2 = (pre !== undefined) ? pre : "0x";
  return $std_core.show_hex($std_core._int_from_int32(i), _x0, _x1, _x2);
}
 
 
// Convert an `:int32` to an `:int` but interpret the `:int32` as a 32-bit unsigned value.
export function uint(i) /* (i : int32) -> int */  {
  if (0 > i) {
     
    var y_1565 = $std_core._int_from_int32(i);
    return $std_core._int_add(4294967296,y_1565);
  }
  else {
    return $std_core._int_from_int32(i);
  }
}
 
export function sign(i) /* (i : int32) -> order */  {
  if (0 < i) {
    return $std_core_types.Gt;
  }
  else {
    return (0 > i) ? $std_core_types.Lt : $std_core_types.Eq;
  }
}
 
export var one;
var one = 1;
 
export var zero;
var zero = 0;
 
 
// Convert a boolean to an `:int32`.
export function int32(b) /* (b : bool) -> int32 */  {
  return (b) ? one : zero;
}
 
 
// The minimal integer value before underflow happens
export var min_int32;
var min_int32 = -2147483648;
 
 
// Euclidean-0 modulus. See `(/):(x : int32, y : int32) -> int32` division for more information.
export function _lp__perc__rp_(x, y) /* (x : int32, y : int32) -> int32 */  {
  var _x3 = (y === 0);
  if (_x3) {
    return x;
  }
  else {
    var _x4 = (y === (-1));
    if (_x4) {
      if ((x === min_int32)) {
        return 0;
      }
      else {
         
        var r = ((x % y)|0);
        var _x5 = (r >= 0);
        if (_x5) {
          return r;
        }
        else {
          var _x6 = (y > 0);
          return (_x6) ? ((r + y)|0) : ((r - y)|0);
        }
      }
    }
    else {
       
      var r0 = ((x % y)|0);
      var _x7 = (r0 >= 0);
      if (_x7) {
        return r0;
      }
      else {
        var _x8 = (y > 0);
        return (_x8) ? ((r0 + y)|0) : ((r0 - y)|0);
      }
    }
  }
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
Note that an interesting edge case is `min-int32 / -1` which equals `min-int32` since in modulo 32-bit
arithmetic `min-int32 == -1 * min-int32 == -1 * (min-int32 / -1) + (min-int32 % -1)` satisfying property (1).
Of course `(min-int32 + 1) / -1` is again positive (namely `max-int32`).
See also _Division and modulus for computer scientists, Daan Leijen, 2001_ 
[pdf](http://research.microsoft.com/pubs/151917/divmodnote.pdf) .
*/
export function _lp__fs__rp_(x, y) /* (x : int32, y : int32) -> int32 */  {
  var _x9 = (y === 0);
  if (_x9) {
    return 0;
  }
  else {
    var _x10 = (y === (-1));
    if (_x10) {
      if ((x === min_int32)) {
        return x;
      }
      else {
         
        var q = ((x/y)|0);
         
        var r = ((x % y)|0);
        var _x11 = (r >= 0);
        if (_x11) {
          return q;
        }
        else {
          var _x12 = (y > 0);
          if (_x12) {
            return ((q - 1)|0);
          }
          else {
            return ((q + 1)|0);
          }
        }
      }
    }
    else {
       
      var q0 = ((x/y)|0);
       
      var r0 = ((x % y)|0);
      var _x13 = (r0 >= 0);
      if (_x13) {
        return q0;
      }
      else {
        var _x14 = (y > 0);
        if (_x14) {
          return ((q0 - 1)|0);
        }
        else {
          return ((q0 + 1)|0);
        }
      }
    }
  }
}
 
 
// Negate a 32-bit integer
export function negate(i) /* (i : int32) -> int32 */  {
  return ((0 - i)|0);
}
 
 
// Return the absolute value of an integer.
// Raises an exception if the `:int32` is `min-int32`
// (since the negation of `min-int32` equals itself and is still negative)
export function abs(i) /* (i : int32) -> exn int32 */  {
   
  var _x1_1595 = 0 > i;
  var _x15 = $std_core_hnd._open_none1(function(b /* bool */ ) {
      return (b) ? false : true;
    }, _x1_1595);
  if (_x15) {
    return i;
  }
  else {
    if ((i > min_int32)) {
      return ((0 - i)|0);
    }
    else {
      return $std_core.$throw("std/num/int32/abs: cannot make min-int32 into a positive int32 without overflow");
    }
  }
}
 
 
// Return the absolute value of an integer.
// Returns 0 if the `:int32` is `min-int32`
// (since the negation of `min-int32` equals itself and is still negative)
export function abs0(i) /* (i : int32) -> int32 */  {
   
  var b_1566 = 0 > i;
  if (b_1566) {
    if ((i > min_int32)) {
      return ((0 - i)|0);
    }
    else {
      return 0;
    }
  }
  else {
    return i;
  }
}
 
 
// The number of bits in an `:int32` (always 32)
export var bits_int32;
var bits_int32 = 32;
 
 
// Convert an `:int32` to a boolean.
export function bool(i) /* (i : int32) -> bool */  {
  return (i !== zero);
}
 
 
// Truncated division (as in C). See also `(/):(x : int32, y : int32) -> int32`.
export function cdiv(i, j) /* (i : int32, j : int32) -> exn int32 */  {
  if (0 === j) {
    return $std_core.$throw("std/num/int32/cdiv: modulus by zero");
  }
  else {
    var _x16 = (j === (-1));
    if (_x16) {
      if ((i === min_int32)) {
        return $std_core.$throw("std/num/int32/cdiv: modulus overflow in cdiv(min-int32, -1.int32)");
      }
      else {
        return ((i/j)|0);
      }
    }
    else {
      return ((i/j)|0);
    }
  }
}
 
 
// Truncated modulus (as in C). See also `(%):(x : int32, y : int32) -> int32`.
export function cmod(i, j) /* (i : int32, j : int32) -> exn int32 */  {
  if (0 === j) {
    return $std_core.$throw("std/num/int32/cmod: modulus by zero");
  }
  else {
    var _x17 = (j === (-1));
    if (_x17) {
      if ((i === min_int32)) {
        return $std_core.$throw("std/num/int32/cmod: modulus overflow in cmod(min-int32, -1.int32)");
      }
      else {
        return ((i % j)|0);
      }
    }
    else {
      return ((i % j)|0);
    }
  }
}
 
 
// Decrement a 32-bit integer.
export function dec(i) /* (i : int32) -> int32 */  {
  return ((i - 1)|0);
}
 
 
// Increment a 32-bit integer.
export function inc(i) /* (i : int32) -> int32 */  {
  return ((i + 1)|0);
}
 
export function divmod(x, y) /* (x : int32, y : int32) -> (int32, int32) */  {
  if (0 === y) {
    return $std_core_types._Tuple2_(zero, x);
  }
  else {
    var _x18 = (y === (-1));
    if (_x18) {
      if ((x === min_int32)) {
        return $std_core_types._Tuple2_(x, 0);
      }
      else {
         
        var q = ((x/y)|0);
         
        var r = ((x % y)|0);
         
        var b_1568 = 0 > r;
        if (b_1568) {
          if (0 < y) {
            return $std_core_types._Tuple2_(((q - 1)|0), ((r + y)|0));
          }
          else {
            return $std_core_types._Tuple2_(((q + 1)|0), ((r - y)|0));
          }
        }
        else {
          return $std_core_types._Tuple2_(q, r);
        }
      }
    }
    else {
       
      var q0 = ((x/y)|0);
       
      var r0 = ((x % y)|0);
       
      var b0_1571 = 0 > r0;
      if (b0_1571) {
        if (0 < y) {
          return $std_core_types._Tuple2_(((q0 - 1)|0), ((r0 + y)|0));
        }
        else {
          return $std_core_types._Tuple2_(((q0 + 1)|0), ((r0 - y)|0));
        }
      }
      else {
        return $std_core_types._Tuple2_(q0, r0);
      }
    }
  }
}
 
 
// monadic lift
export function _mlift1596_fold_int32(end, f, start, x) /* forall<a,e> (end : int32, f : (int32, a) -> e a, start : int32, x : a) -> e a */  {
  return fold_int32(((start + 1)|0), end, x, f);
}
 
export function fold_int32(start0, end0, init, f0) /* forall<a,e> (start : int32, end : int32, init : a, f : (int32, a) -> e a) -> e a */  { tailcall: while(1)
{
  if ((start0 >= end0)) {
    return init;
  }
  else {
     
    var x0_1597 = f0(start0, init);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(x1 /* 1229 */ ) {
        return _mlift1596_fold_int32(end0, f0, start0, x1);
      });
    }
    else {
      {
        // tail call
        var _x19 = ((start0 + 1)|0);
        start0 = _x19;
        init = x0_1597;
        continue tailcall;
      }
    }
  }
}}
 
 
// Returns `true` if the integer `i`  is an even number.
export function is_even(i) /* (i : int32) -> bool */  {
  return (((i & 1)) === 0);
}
 
 
// Returns `true` if the integer `i`  is an odd number.
export function is_odd(i) /* (i : int32) -> bool */  {
  return (((i & 1)) === 1);
}
 
 
// The maximal integer value before overflow happens
export var max_int32;
var max_int32 = 2147483647;
 
 
// Bitwise rotate an `:int32` `n % 32` bits to the left.
export function rotl(i, shift) /* (i : int32, shift : int) -> int32 */  {
  return $std_core._int32_rotl(i,($std_core.int32(shift)));
}
 
 
// Bitwise rotate an `:int32` `n % 32` bits to the right.
export function rotr(i, shift) /* (i : int32, shift : int) -> int32 */  {
  return $std_core._int32_rotr(i,($std_core.int32(shift)));
}
 
 
// Arithmetic shift an `:int32` to the right by `n % 32` bits. Shifts in the sign bit from the left.
export function sar(i, shift) /* (i : int32, shift : int) -> int32 */  {
  return i >> ($std_core.int32(shift));
}
 
 
// Shift an `:int32` `i` to the left by `n & 31` bits.
export function shl(i, shift) /* (i : int32, shift : int) -> int32 */  {
  return i << ($std_core.int32(shift));
}
 
 
// Convert an `:int32` to a string
export function show(i) /* (i : int32) -> string */  {
  return $std_core.show($std_core._int_from_int32(i));
}
 
 
// Show an `:int32` in hexadecimal notation interpreted as an unsigned 32-bit value.
// The `width`  parameter specifies how wide the hex value is where `'0'`  is used to align.\
// The `use-capitals` parameter (= `True`) determines if captical letters should be used to display the hexadecimal digits.\
// The `pre` (=`"0x"`) is an optional prefix for the number.
export function show_hex32(i, width, use_capitals, pre) /* (i : int32, width : optional<int>, use-capitals : optional<bool>, pre : optional<string>) -> string */  {
  var _x20 = (width !== undefined) ? width : 8;
  var _x21 = (use_capitals !== undefined) ? use_capitals : true;
  var _x22 = (pre !== undefined) ? pre : "0x";
  return $std_core.show_hex(uint(i), _x20, _x21, _x22);
}
 
 
// Logical shift an `:int32` to the right by `n % 32` bits. Shift in zeros from the left.
export function shr(i, shift) /* (i : int32, shift : int) -> int32 */  {
  return i >>> ($std_core.int32(shift));
}
 
 
// Convert an `:int` to `:int32` but interpret the `int` as an unsigned 32-bit value.
// `i` is clamped between `0` and `0xFFFFFFFF`.\
// `0x7FFF_FFFF.uint32 == 0x7FFF_FFFF.int32 == max-int32`\
// `0x8000_0000.uint32 == -0x8000_0000.int32 == min-int32`\
// `0xFFFF_FFFF.uint32 == -1.int32`\
export function uint32(i) /* (i : int) -> int32 */  {
  var _x24 = $std_core._int_gt(i,($std_core._int_from_int32(max_int32)));
  var _x23 = (_x24) ? $std_core._int_sub(i,4294967296) : i;
  return $std_core.int32(_x23);
}
 
 
// Negate an 32-bit integer
export function _lp__tilde__rp_(i) /* (i : int32) -> total int32 */  {
  return ((0 - i)|0);
}