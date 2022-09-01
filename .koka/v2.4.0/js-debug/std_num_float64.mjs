// Koka generated module: "std/num/float64", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_num_int32 from './std_num_int32.mjs';
import * as $std_text_regex from './std_text_regex.mjs';
import * as $compat_dict from './compat_dict.mjs';
import * as $compat from './compat.mjs';
import * as $compat_log from './compat_log.mjs';
import * as $compat_regex from './compat_regex.mjs';
import * as $common from './common.mjs';
import * as $std_os_env from './std_os_env.mjs';
import * as $std_os_flags from './std_os_flags.mjs';
import * as $compat_path from './compat_path.mjs';
import * as $compat_env from './compat_env.mjs';
import * as $std_num_int64 from './std_num_int64.mjs';
 
// externals
/*---------------------------------------------------------------------------
  Copyright 2017-2021, Microsoft Research, Daan Leijen.
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the LICENSE file at the root of this distribution.
---------------------------------------------------------------------------*/
var _big_endian = undefined;
function _check_big_endian() {
  var arrayBuffer = new ArrayBuffer(2);
  var uint8Array = new Uint8Array(arrayBuffer);
  var uint16array = new Uint16Array(arrayBuffer);
  uint8Array[0] = 0x11;
  uint8Array[1] = 0x22;
  return (uint16array[0] === 0x1122);
}
function _is_big_endian() {
  if (_big_endian===undefined) { _big_endian = _check_big_endian();  }
  return _big_endian;
}
var _buf         = new ArrayBuffer(8);
var _buf_float64 = new Float64Array(_buf);
var _buf_int32   = new Int32Array(_buf);
function _double_to_bits(d) {
  _buf_float64[0] = d;
  var lo;
  var hi;
  if (_is_big_endian()) {
    hi = _buf_int32[0]; lo = _buf_int32[1];
  }
  else {
    lo = _buf_int32[0]; hi = _buf_int32[1];
  }
  return (BigInt(hi) << 32n) + (lo >= 0 ? BigInt(lo) : 0x100000000n + BigInt(lo));
}
function _double_from_bits(i) {
  var hi = Number(i>>32n)|0;
  var lo = Number(i&0xFFFFFFFFn)|0;
  if (_is_big_endian()) {
    _buf_int32[0] = hi; _buf_int32[1] = lo;
  }
  else {
    _buf_int32[0] = lo; _buf_int32[1] = hi;
  }
  return _buf_float64[0];
}
var _splitter    = Math.pow(2,27) + 1;      // 0x1.0000002p+27 // 134217729.0 = 2^27 + 1
var _splitbound  = Math.pow(2,296);         // 0x1.0p996 // 6.696928794914171e+299  = 2^996
var _two28       = Math.pow(2,28);          // 0x1.0p28 // 268435456.0 = 2^28
var _twomin28    = Math.pow(2,-28);         // 0x1.0p-28  // 3.7252902984619140625e-09 = 2^-28
function _split( x ) {
  if (x > _splitbound || x < -_splitbound) {
    var y = x * _twomin28;
    var t = y * _splitter;
    var hi = t - (t - y);
    var lo = y - hi;
    return { hi: hi*_two28, lo: lo*_two28 };
  }
  else {
    var t = x * _splitter;
    var hi = t - (t - x);
    var lo = x - hi;
    return { hi: hi, lo: lo };
  }
}
function _fmadd(x,y,z) {
  var xx = _split(x);
  var yy = (x===y ? xx : _split(y));
  return ((xx.hi*yy.hi + z) + (xx.hi*yy.lo + xx.lo*yy.hi)) + (xx.lo*yy.lo);
}
 
// type declarations
 
// declarations
 
 
// The maximum of the absolute values.
export function abs_max(x, y) /* (x : float64, y : float64) -> float64 */  {
   
  var x0_3956 = Math.abs(x);
   
  var y0_3957 = Math.abs(y);
  return ((x0_3956 >= y0_3957)) ? x0_3956 : y0_3957;
}
 
 
// The maximum of a list of absolute values.
export function abs_max_1(xs) /* (xs : list<float64>) -> float64 */  {
  return $std_core.foldl(xs, 0.0, function(m /* float64 */ , x /* float64 */ ) {
       
      var x0_3958 = Math.abs(x);
      return ((x0_3958 >= m)) ? x0_3958 : m;
    });
}
 
 
// The area hyperbolic cosine of `d`
export function acosh(d) /* (d : float64) -> float64 */  {
  return Math.acosh(d);
}
 
 
// The area hyperbolic sine of `d`
export function asinh(d) /* (d : float64) -> float64 */  {
  return Math.asinh(d);
}
 
 
// The area hyperbolic tangent of `d`
export function atanh(d) /* (d : float64) -> float64 */  {
  return Math.atanh(d);
}
 
 
// Low-level: return the bits of a 64-bit `:float64` as in `:int64`
export function float64_to_bits(d) /* (d : float64) -> int64 */  {
  return _double_to_bits(d);
}
 
 
// Smallest positive normalized float64 value
export var flt_min;
var flt_min = 2.2250738585072014e-308;
 
 
// &pi;
export var pi;
var pi = 3.141592653589793;
 
 
// Extend a `:float32` to a `:float64`
export function float64(f) /* (f : float32) -> float64 */  {
  return (f);
}
 
 
// Low-level: create a `:float64` from the given 64-bit integer.
export function float64_from_bits(i) /* (i : int64) -> float64 */  {
  return _double_from_bits(i);
}
 
export function make_neginf() /* () -> float64 */  {
  return -Infinity;
}
 
export var one_m1022;
var one_m1022 = 2.2250738585072014e-308;
 
export var one_p1023;
var one_p1023 = 8.98846567431158e307;
 
export function make_posinf() /* () -> float64 */  {
  return Infinity;
}
 
 
// The natural logarithm of 2
export var flt_ln2;
var flt_ln2 = 0.6931471805599453;
 
 
// Round a `:float64` to a `:float32`
export function float32(f) /* (f : float64) -> float32 */  {
  return $std_core._double_to_float(f);
}
 
 
// Return the 'floored' fraction of `d`, always greater or equal to zero.\
// `d.floor + d.ffraction === d`\
// `(-2.4).ffraction === 0.6`
export function ffraction(d) /* (d : float64) -> float64 */  {
  return (d - (Math.floor(d)));
}
 
 
// The [_e_](https://en.wikipedia.org/wiki/E_(mathematical_constant)) constant.
export var flt_e;
var flt_e = 2.718281828459045;
 
 
// Machine epsilon: the difference between 1.0 and the next representable `:float64` value.
export var flt_epsilon;
var flt_epsilon = 2.220446049250313e-16;
 
 
// [Euler's constant](https://en.wikipedia.org/wiki/Euler%E2%80%93Mascheroni_constant)
export var flt_euler;
var flt_euler = 0.5772156649015329;
 
 
// The natural logarithm of 10
export var flt_ln10;
var flt_ln10 = 2.302585092994046;
 
 
// The base-10 logarithm of _e_.
export var flt_log10e;
var flt_log10e = 0.4342944819032518;
 
 
// The base-2 logarithm of _e_.
export var flt_log2e;
var flt_log2e = 1.4426950408889634;
 
 
// Maximum float64 value
export var flt_max;
var flt_max = 1.7976931348623157e308;
 
 
// maximal precision in decimal digits of a `:float64`.
export var flt_max_prec;
var flt_max_prec = 15;
 
 
// &pi;/2
export var flt_pi2;
var flt_pi2 = 1.5707963267948966;
 
 
// 3&pi;/4
export var flt_pi34;
var flt_pi34 = 2.356194490192345;
 
 
// &pi;/4
export var flt_pi4;
var flt_pi4 = 0.7853981633974483;
 
 
// `1.0 / sqrt(2.0)`  (= `sqrt(0.5)`)
export var flt_sqrt12;
var flt_sqrt12 = 0.7071067811865476;
 
 
// The square-root of 2
export var flt_sqrt2;
var flt_sqrt2 = 1.4142135623730951;
 
 
// Smallest positive subnormal value (i.e. [``DBL_TRUE_MIN``](http://en.cppreference.com/w/cpp/types/climits))
export var flt_true_min;
var flt_true_min = 5.0e-324;
 
 
// 2&pi;
export var flt_twopi;
var flt_twopi = 6.283185307179586;
 
 
// fused multiply-add. Computes `(x*y)+z` as if to infinite precision
// with only the final result rounded back to a `:float64`.
export function fmadd(x, y, z) /* (x : float64, y : float64, z : float64) -> float64 */  {
  return _fmadd(x,y,z);
}
 
 
// Return the integral part of a `:float64` `d` .
// If `d >= 0.0` , return the largest integer equal or less to `d` ,
// If `d < 0.0` , return the smallest integer equal or larger to `d` .
export function truncate(d) /* (d : float64) -> float64 */  {
  return ((d >= (0.0))) ? Math.floor(d) : Math.ceil(d);
}
 
 
// Is this a negative zero value?
export function is_negzero(d) /* (d : float64) -> bool */  {
  if ((d === (0.0))) {
    return (((((1.0) / d))) === -Infinity);
  }
  else {
    return false;
  }
}
 
 
// The square of a float64
export function sqr(x) /* (x : float64) -> float64 */  {
  return (x * x);
}
 
 
// Return the sum of a list of floats.
// Uses [Kahan-Babu&scaron;kan-Neumaier summation](https://en.wikipedia.org/wiki/Kahan_summation_algorithm#Further_enhancements)
// to minimize rounding errors. This
// is more precise as Kahan summation and about as fast.\
// `[1.0e3,1.0e97,1.0e3,-1.0e97].sum == 2000.0`\
// A. Neumaier, _Rundungsfehleranalyse einiger Verfahren zur Summation endlicher Summen_.
// Math. Mechanik, 54:39--51, 1974.
export function sum(xs) /* (xs : list<float64>) -> float64 */  {
  return function() {
     
    var loc = { value: (0.0) };
     
    var loc0 = { value: (0.0) };
     
    $std_core.foreach(xs, function(x /* float64 */ ) {
         
        var t = ((((loc).value)) + x);
         
        var _x0 = ((Math.abs((((loc).value)))) >= (Math.abs(x)));
        if (_x0) {
          var c = ((((((loc).value)) - t)) + x);
        }
        else {
          var c = (((x - t)) + (((loc).value)));
        }
         
        ((loc0).value = (((((loc0).value)) + c)));
        return ((loc).value = t);
      });
     
    var res0 = ((((loc).value)) + (((loc0).value)));
     
    var res = $std_core_hnd.prompt_local_var(loc0, res0);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
 
// Is this value equal to negative or positive infinity ?
export function is_inf(d) /* (d : float64) -> bool */  {
  return ((d) === Infinity || (d) === -Infinity);
}
 
 
// Return the logarithm in base `base` of a `:float64` `f`
export function log(f, base) /* (f : float64, base : float64) -> float64 */  {
  return ((Math.log(f)) / (Math.log(base)));
}
 
export function make_nan() /* () -> float64 */  {
  return NaN;
}
 
 
// Return `nan` on failure
export function prim_parse_float64(s) /* (s : string) -> float64 */  {
  return parseFloat(s);
}
 
 
// Return `x` with the sign of `y`.
export function with_sign_of(x, y) /* (x : float64, y : float64) -> float64 */  {
  if ((y < (0.0))) {
    return (-(Math.abs(x)));
  }
  else {
    return Math.abs(x);
  }
}
 
 
// Compare floats using a total ordering on the `:float64`.
// The ordering follows the `totalOrder` predicate as defined in IEEE 754-2008 exactly.
// The values are ordered in following order:
// - negative quiet nan
// - negative signaling nan
// - `neginf`
// - -finite
// - -0.0
// - +0.0
// - finite
// - `posinf`
// - signaling nan
// - quiet nan
//
export function compare(x, y) /* (x : float64, y : float64) -> order */  {
   
  var bx = float64_to_bits(x);
   
  var by = float64_to_bits(y);
   
  var i_3961 = $std_core._int64_sar(bx,63n);
   
  var ix = ($std_core._int64_shr(i_3961,1n)) ^ bx;
   
  var i1_3965 = $std_core._int64_sar(by,63n);
   
  var iy = ($std_core._int64_shr(i1_3965,1n)) ^ by;
  if ((ix < iy)) {
    return $std_core_types.Lt;
  }
  else {
    return ((ix > iy)) ? $std_core_types.Gt : $std_core_types.Eq;
  }
}
 
 
// decode a normalized float64 (i.e. not subnormal)
export function decode_normalized(d, e_adjust) /* (d : float64, e-adjust : optional<int>) -> (int, int) */  {
   
  var i = float64_to_bits(d);
   
  var exp = BigInt.asIntN(64,(($std_core._int64_shr(i,52n)) & 2047n) - 1043n);
   
  var man = BigInt.asIntN(64,(i & 4503599627370495n) + 4503599627370496n);
   
  var x0_3976 = $std_core._int_from_int64(exp);
   
  var x_3974 = $std_core._int_sub(x0_3976,32);
  if (0n > i) {
    var _x0 = BigInt.asIntN(64,0n - man);
  }
  else {
    var _x0 = man;
  }
  var _x1 = (e_adjust !== undefined) ? e_adjust : 0;
  return $std_core_types._Tuple2_($std_core._int_from_int64(_x0), $std_core._int_add(x_3974,_x1));
}
 
 
// Is this a [subnormal](https://en.wikipedia.org/wiki/Denormal_number) value?
// (i.e. `0 < d.abs < flt-min`)
export function is_subnormal(d) /* (d : float64) -> bool */  {
  if ((d !== (0.0))) {
    return ((Math.abs(d)) < (2.2250738585072014e-308));
  }
  else {
    return false;
  }
}
 
 
// Decode a float64 `d` into a tuple `(m,e)` of a mantissa `m` and exponent `e`
// such that `m`&middot;2^`e`^ =  `d` exactly. The mantissa `m` is
// always either 0 or in the range [2^52^, 2^53^). See also `frexp`.
export function decode(d) /* (d : float64) -> (int, int) */  {
  if ((d === (0.0))) {
    return $std_core_types._Tuple2_(0, 0);
  }
  else {
    if ((d !== (0.0))) {
      var _x2 = ((Math.abs(d)) < (2.2250738585072014e-308));
      if (_x2) {
        return decode_normalized((d * (1.8014398509481984e16)), -54);
      }
      else {
        return decode_normalized(d, 0);
      }
    }
    else {
      return decode_normalized(d, 0);
    }
  }
}
 
export var rad2deg;
var rad2deg = ((180.0) / (3.141592653589793));
 
 
// Convert radians to degrees.
export function deg(rad0) /* (rad : float64) -> float64 */  {
  return (rad0 * rad2deg);
}
 
export var deg2rad;
var deg2rad = ((3.141592653589793) / (180.0));
 
 
// Calculate 2&middot;^`e`^ for an integer `e`.
// Uses efficient bit conversion for exponents between  -1022 and 1023 and
// otherwise falls back to the regular `exp2` function converting `e` to a float64.
export function exp2_1(e) /* (e : int) -> float64 */  {
  if ($std_core._int_ge(e,(-1022))) {
    if ($std_core._int_le(e,1023)) {
       
      var i_3979 = $std_core.int64($std_core._int_add(1023,e));
      return float64_from_bits($std_core._int64_shl(i_3979,52n));
    }
    else {
      return Math.pow(2.0,($std_core._int_to_double(e)));
    }
  }
  else {
    return Math.pow(2.0,($std_core._int_to_double(e)));
  }
}
 
export function mul_exp2(x, e) /* (x : float64, e : int) -> float64 */  {
  return (x * (exp2_1(e)));
}
 
 
// Negative infinity
export var neginf;
var neginf = make_neginf();
 
 
// Positive infinity
export var posinf;
var posinf = make_posinf();
 
 
// 'Load exponent': returns `x`&middot;2^`e`^ for a `is-finite` `x` and
// otherwise `x` itself. See also `encode` which loads an integer mantissa.
export function ldexp(x, e) /* (x : float64, e : int) -> float64 */  {
   
  var b_3983 = isFinite(x);
  if (b_3983) {
    if ($std_core._int_ge(e,(-1022))) {
      if ($std_core._int_le(e,1023)) {
        return (x * (exp2_1(e)));
      }
      else {
        if ($std_core._int_le(e,2046)) {
           
          var x1_3986 = (x * (8.98846567431158e307));
           
          var e1_3987 = $std_core._int_sub(e,1023);
          return (x1_3986 * (exp2_1(e1_3987)));
        }
        else {
          if ($std_core._int_le(e,3069)) {
             
            var x3_3990 = (((x * (8.98846567431158e307))) * (8.98846567431158e307));
             
            var e2_3991 = $std_core._int_sub(e,2046);
            return (x3_3990 * (exp2_1(e2_3991)));
          }
          else {
            return ((x < (0.0))) ? neginf : posinf;
          }
        }
      }
    }
    else {
      if ($std_core._int_ge(e,(-2044))) {
         
        var x5_3994 = (x * (2.2250738585072014e-308));
         
        var e3_3995 = $std_core._int_add(e,1022);
        return (x5_3994 * (exp2_1(e3_3995)));
      }
      else {
        if ($std_core._int_ge(e,(-3066))) {
           
          var x7_3998 = (((x * (2.2250738585072014e-308))) * (2.2250738585072014e-308));
           
          var e4_3999 = $std_core._int_add(e,2044);
          return (x7_3998 * (exp2_1(e4_3999)));
        }
        else {
          return ((x < (0.0))) ? (-0.0) : 0.0;
        }
      }
    }
  }
  else {
    return x;
  }
}
 
 
// Create a float64 `d` given a mantissa `man` and exponent `exp`
// such that `man`&middot;2^`exp`^ =  `d` exactly (if it is representable
// by a `:float64`). See also `ldexp`.
export function encode(man, exp) /* (man : int, exp : int) -> float64 */  {
  return ldexp($std_core._int_to_double(man), exp);
}
 
export function exp2m1(x) /* (x : float64) -> float64 */  {
  return Math.expm1((((0.6931471805599453) * x)));
}
 
 
// Short version of `float32` for convenience, e.g. `1.337.f32`. For example:
// ```
// > 1.337.show-hex ++ " != " ++ 1.337.f32.float64.show-hex
// "0x1.5645A1CAC0831p+0 != 0x1.5645A2p+0"
// ```
export function f32(f) /* (f : float64) -> float32 */  {
  return float32(f);
}
 
 
// &pi;
export var flt_pi;
var flt_pi = 3.141592653589793;
 
 
// Return the fractional part of a `:float64` `d`.\
// `d.truncate + d.fraction === d`\
// `(-2.4).fraction === -0.4`
export function fraction(d) /* (d : float64) -> float64 */  {
  var _x3 = ((d >= (0.0))) ? Math.floor(d) : Math.ceil(d);
  return (d - _x3);
}
 
 
// 'Fraction/exponent': return the normalized fraction `f` and exponent `exp`
// for a number `x` such that `x == f`&middot;2^`exp`^.
// The absolute value of the fraction `f` is always in the range [0.5, 1.0), or
// one of `0.0`, `-0.0`, `neginf`, `posinf`, or `nan`.
// See also `decode` which  decodes to an integer mantissa.
export function frexp(x) /* (x : float64) -> (float64, int) */  {
   
  var b_4003 = isFinite(x);
  if (b_4003) {
    if ((x === (0.0))) {
      var _x4 = (((((1.0) / x))) === -Infinity);
      if (_x4) {
        return $std_core_types._Tuple2_(x, 0);
      }
      else {
        var _x5 = decode(x);
        return $std_core_types._Tuple2_((($std_core._int_to_double((_x5.fst))) * (1.1102230246251565e-16)), $std_core._int_add((_x5.snd),53));
      }
    }
    else {
      var _x6 = decode(x);
      return $std_core_types._Tuple2_((($std_core._int_to_double((_x6.fst))) * (1.1102230246251565e-16)), $std_core._int_add((_x6.snd),53));
    }
  }
  else {
    return $std_core_types._Tuple2_(x, 0);
  }
}
 
 
// The hypotenuse of `x` and `y`: `sqrt(x*x + y*y)`.
// Prevents overflow for large numbers.
export function hypot(x, y) /* (x : float64, y : float64) -> float64 */  {
   
  var xx = Math.abs(x);
   
  var yy = Math.abs(y);
   
  var lo = ((xx <= yy)) ? xx : yy;
   
  var hi = ((xx >= yy)) ? xx : yy;
  if ((hi === (0.0))) {
    return 0.0;
  }
  else {
     
    var z = (lo / hi);
    return (hi * (Math.sqrt((((1.0) + ((z * z)))))));
  }
}
 
 
// The square root of the sum of the squares of three floats.
// Prevents overflow for large numbers.
export function hypot_1(x, y, z) /* (x : float64, y : float64, z : float64) -> float64 */  {
   
  var xx = Math.abs(x);
   
  var yy = Math.abs(y);
   
  var zz = Math.abs(z);
   
  var x0_4011 = ((xx >= yy)) ? xx : yy;
   
  var hi = ((x0_4011 >= zz)) ? x0_4011 : zz;
  if ((hi === (0.0))) {
    return 0.0;
  }
  else {
     
    var x4_4017 = (zz / hi);
     
    var x2_4015 = (xx / hi);
     
    var x3_4016 = (yy / hi);
    return (hi * (Math.sqrt(((((((x2_4015 * x2_4015)) + ((x3_4016 * x3_4016)))) + ((x4_4017 * x4_4017)))))));
  }
}
 
 
// The square root of the sum of squares of a list of floats.
// Prevents overflow for large numbers and uses Kahan-Babu&scaron;kan-Neumaier summation
// for precision.
export function hypot_2(xs) /* (xs : list<float64>) -> float64 */  {
   
  var hi = $std_core.foldl(xs, 0.0, function(m /* float64 */ , x /* float64 */ ) {
       
      var x0_3958 = Math.abs(x);
      return ((x0_3958 >= m)) ? x0_3958 : m;
    });
  if ((hi === (0.0))) {
    return 0.0;
  }
  else {
    return (hi * (Math.sqrt((sum($std_core.map_5(xs, function(x0 /* float64 */ ) {
         
        var x0_4018 = (x0 / hi);
        return (x0_4018 * x0_4018);
      }))))));
  }
}
 
 
// Returns `ln(exp(x) + exp(y))`.
// Avoids overlow/underflow errors.
export function lnaddexp(x, y) /* (x : float64, y : float64) -> float64 */  {
  if ((x === y)) {
    return (x + (0.6931471805599453));
  }
  else {
     
    var z = (x - y);
    if ((z > (0.0))) {
      return (x + (Math.log1p((Math.exp(((-z)))))));
    }
    else {
      return (y + (Math.log1p((Math.exp(z)))));
    }
  }
}
 
export function log2p1(x) /* (x : float64) -> float64 */  {
  return ((1.4426950408889634) * (Math.log1p(x)));
}
 
 
// Returns `log2( exp2(x) + exp2(y) )`.
// Avoids overlow/underflow errors.
export function logaddexp2(x, y) /* (x : float64, y : float64) -> float64 */  {
  if ((x === y)) {
    return (x + (1.0));
  }
  else {
     
    var z = (x - y);
    if ((z > (0.0))) {
       
      var x0_4019 = Math.pow(2.0,((-z)));
      return (x + (((1.4426950408889634) * (Math.log1p(x0_4019)))));
    }
    else {
       
      var x1_4020 = Math.pow(2.0,z);
      return (y + (((1.4426950408889634) * (Math.log1p(x1_4020)))));
    }
  }
}
 
 
// Represents a value that is _not a number_ (NaN)
export var nan;
var nan = make_nan();
 
 
// Return if two floats are nearly equal with respect to some `epsilon` (=`8*flt-epsilon`).
// The epsilon is the nearest difference for numbers around 1.0. The routine automatically
// scales the epsilon for larger and smaller numbers, and for subnormal numbers.
export function nearly_eq(x, y, epsilon) /* (x : float64, y : float64, epsilon : optional<float64>) -> bool */  {
   
  var _epsilon_2570 = (epsilon !== undefined) ? epsilon : ((8.0) * (2.220446049250313e-16));
  if ((x === y)) {
    return true;
  }
  else {
     
    var diff = Math.abs(((x - y)));
    if ((x === (0.0))) {
      return ((((2.0) * diff)) < ((_epsilon_2570 * (2.2250738585072014e-308))));
    }
    else {
      if ((y === (0.0))) {
        return ((((2.0) * diff)) < ((_epsilon_2570 * (2.2250738585072014e-308))));
      }
      else {
        if ((diff < (2.2250738585072014e-308))) {
          return ((((2.0) * diff)) < ((_epsilon_2570 * (2.2250738585072014e-308))));
        }
        else {
           
          var sum0 = ((Math.abs(x)) + (Math.abs(y)));
          var _x7 = ((sum0 > (1.7976931348623157e308))) ? 1.7976931348623157e308 : sum0;
          return ((((((2.0) * diff)) / _x7)) < _epsilon_2570);
        }
      }
    }
  }
}
 
 
// Returns the greatest `:float64` less than `x`.
// This behaves exactly as `nextDown` in the IEEE 754-2008 standard.
// The identity `x.next-down == ~next-down(~x)` holds for all `x`. 
// When `x` is finite `x == x.next-down.next-up` also holds.
export function next_down(x) /* (x : float64) -> float64 */  {
  if (isNaN(x)) {
    return x;
  }
  else {
    if (((x) === -Infinity)) {
      return x;
    }
    else {
      if ((x === (0.0))) {
        return (-(5.0e-324));
      }
      else {
         
        var i = float64_to_bits(x);
         
        if (0n > i) {
          var next = BigInt.asIntN(64,i + 1n);
        }
        else {
          var next = BigInt.asIntN(64,i - 1n);
        }
        return float64_from_bits(next);
      }
    }
  }
}
 
 
// Returns the least `:float64` greater than `x`.
// This behaves exactly as `nextUp` in the IEEE 754-2008 standard.
// The identity `x.next-up == ~next-down(~x)` holds for all `x`. 
// When `x` is finite `x == x.next-up.next-down` also holds.
export function next_up(x) /* (x : float64) -> float64 */  {
  if (isNaN(x)) {
    return x;
  }
  else {
    if (((x) === Infinity)) {
      return x;
    }
    else {
      if ((x === (0.0))) {
        return 5.0e-324;
      }
      else {
         
        var i = float64_to_bits(x);
         
        if (0n > i) {
          var next = BigInt.asIntN(64,i - 1n);
        }
        else {
          var next = BigInt.asIntN(64,i + 1n);
        }
        return float64_from_bits(next);
      }
    }
  }
}
 
 
// monadic lift
export function _mlift4090_pdecdouble(wild__0) /* (wild_0 : char) -> std/text/parse/parse int */  {
  return $std_text_parse.pint();
}
 
 
// monadic lift
export function _mlift4091_pdecdouble(cur, exp) /* (cur : sslice, exp : int) -> std/text/parse/parse float64 */  {
   
  var _x1_4085 = $std_core.string_3(cur);
  return $std_core_hnd._open_none1(prim_parse_float64, _x1_4085);
}
 
 
// monadic lift
export function _mlift4092_pdecdouble(wild__) /* (wild_ : char) -> std/text/parse/parse string */  {
  return $std_text_parse.digits0();
}
 
 
// monadic lift
export function _mlift4093_pdecdouble(cur, _y_4054) /* (cur : sslice, string) -> std/text/parse/parse float64 */  {
   
  var frac = $std_core.trim_right_1(_y_4054, "0");
   
  var x_4117 = $std_text_parse._lp__bar__bar__rp_(function() {
       
      var x0_4119 = $std_text_parse.one_of("eE");
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift4090_pdecdouble);
      }
      else {
        return $std_text_parse.pint();
      }
    }, function() {
      return 0;
    });
   
  function next_4118(exp) /* (int) -> std/text/parse/parse float64 */  {
     
    var _x1_4085 = $std_core.string_3(cur);
    return $std_core_hnd._open_none1(prim_parse_float64, _x1_4085);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_4118);
  }
  else {
    return next_4118(x_4117);
  }
}
 
 
// monadic lift
export function _mlift4094_pdecdouble(cur, man) /* (cur : sslice, man : string) -> std/text/parse/parse float64 */  {
   
  var x_4123 = $std_text_parse._lp__bar__bar__rp_(function() {
       
      var x0_4125 = $std_text_parse.char(0x002E);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift4092_pdecdouble);
      }
      else {
        return $std_text_parse.digits0();
      }
    }, function() {
      return "";
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_4054 /* string */ ) {
      return _mlift4093_pdecdouble(cur, _y_4054);
    });
  }
  else {
    return _mlift4093_pdecdouble(cur, x_4123);
  }
}
 
 
// monadic lift
export function _mlift4095_pdecdouble(cur) /* (cur : sslice) -> std/text/parse/parse float64 */  {
   
  var x_4127 = $std_text_parse.digits();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(man /* string */ ) {
      return _mlift4094_pdecdouble(cur, man);
    });
  }
  else {
    return _mlift4094_pdecdouble(cur, x_4127);
  }
}
 
export function pdecdouble() /* () -> std/text/parse/parse float64 */  {
   
  var ev_4132 = $std_core_hnd._evv_at(0);
   
  var _x8 = $std_text_parse._select_current_input(ev_4132.hnd);
  var x_4129 = _x8(ev_4132.marker, ev_4132);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift4095_pdecdouble);
  }
  else {
     
    var x0_4134 = $std_text_parse.digits();
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(man /* string */ ) {
        return _mlift4094_pdecdouble(x_4129, man);
      });
    }
    else {
       
      var x1_4137 = $std_text_parse._lp__bar__bar__rp_(function() {
           
          var x2_4140 = $std_text_parse.char(0x002E);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(_mlift4092_pdecdouble);
          }
          else {
            return $std_text_parse.digits0();
          }
        }, function() {
          return "";
        });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_4054 /* string */ ) {
          return _mlift4093_pdecdouble(x_4129, _y_4054);
        });
      }
      else {
         
        var frac = $std_core.trim_right_1(x1_4137, "0");
         
        var x3_4142 = $std_text_parse._lp__bar__bar__rp_(function() {
             
            var x4_4145 = $std_text_parse.one_of("eE");
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(_mlift4090_pdecdouble);
            }
            else {
              return $std_text_parse.pint();
            }
          }, function() {
            return 0;
          });
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(exp /* int */ ) {
             
            var _x1_4085 = $std_core.string_3(x_4129);
            return $std_core_hnd._open_none1(prim_parse_float64, _x1_4085);
          });
        }
        else {
           
          var _x1_40850 = $std_core.string_3(x_4129);
          return $std_core_hnd._open_none1(prim_parse_float64, _x1_40850);
        }
      }
    }
  }
}
 
 
// monadic lift
export function _mlift4096_phexdouble(wild__2) /* (wild_2 : char) -> std/text/parse/parse int */  {
  return $std_text_parse.pint();
}
 
 
// monadic lift
export function _mlift4097_phexdouble(frac, man, exp) /* (frac : string, man : string, exp : int) -> std/text/parse/parse float64 */  {
   
  var _x1_4086 = $std_core._lp__plus__plus__1_rp_(man, frac);
   
  var m = $std_core.$default($std_core_hnd._open_none2(function(s /* string */ , hex /* optional<bool> */ ) {
        var _x8 = (hex !== undefined) ? hex : false;
        return $std_core.xparse_int((((((s).replace(/^\s\s*/,'')))).replace(/\s+$/,'')), _x8);
      }, _x1_4086, true), 0);
   
  var y_4083 = $std_core._int_mul(4,($std_core.count_1(frac)));
   
  var e = $std_core._int_sub(exp,y_4083);
  return $std_core_hnd._open_none2(function(man0 /* int */ , exp0 /* int */ ) {
      return ldexp($std_core._int_to_double(man0), exp0);
    }, m, e);
}
 
 
// monadic lift
export function _mlift4098_phexdouble(wild__1) /* (wild_1 : char) -> std/text/parse/parse string */  {
  return $std_text_parse.hex_digits();
}
 
 
// monadic lift
export function _mlift4099_phexdouble(man, _y_4063) /* (man : string, string) -> std/text/parse/parse float64 */  {
   
  var frac = $std_core.trim_right_1(_y_4063, "0");
   
  var x_4149 = $std_text_parse._lp__bar__bar__rp_(function() {
       
      var x0_4151 = $std_text_parse.one_of("pP");
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift4096_phexdouble);
      }
      else {
        return $std_text_parse.pint();
      }
    }, function() {
      return 0;
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(exp /* int */ ) {
      return _mlift4097_phexdouble(frac, man, exp);
    });
  }
  else {
    return _mlift4097_phexdouble(frac, man, x_4149);
  }
}
 
 
// monadic lift
export function _mlift4100_phexdouble(man) /* (man : string) -> std/text/parse/parse float64 */  {
   
  var x_4153 = $std_text_parse._lp__bar__bar__rp_(function() {
       
      var x0_4155 = $std_text_parse.char(0x002E);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift4098_phexdouble);
      }
      else {
        return $std_text_parse.hex_digits();
      }
    }, function() {
      return "";
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_4063 /* string */ ) {
      return _mlift4099_phexdouble(man, _y_4063);
    });
  }
  else {
    return _mlift4099_phexdouble(man, x_4153);
  }
}
 
 
// monadic lift
export function _mlift4101_phexdouble(wild__0) /* (wild_0 : char) -> std/text/parse/parse float64 */  {
   
  var x_4157 = $std_text_parse.hex_digits();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift4100_phexdouble);
  }
  else {
    return _mlift4100_phexdouble(x_4157);
  }
}
 
 
// monadic lift
export function _mlift4102_phexdouble(wild__) /* (wild_ : char) -> std/text/parse/parse float64 */  {
   
  var x_4159 = $std_text_parse.one_of("xX");
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift4101_phexdouble);
  }
  else {
    return _mlift4101_phexdouble(x_4159);
  }
}
 
export function phexdouble() /* () -> std/text/parse/parse float64 */  {
   
  var x_4161 = $std_text_parse.char(0x0030);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift4102_phexdouble);
  }
  else {
     
    var x0_4164 = $std_text_parse.one_of("xX");
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(_mlift4101_phexdouble);
    }
    else {
       
      var x1_4167 = $std_text_parse.hex_digits();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift4100_phexdouble);
      }
      else {
         
        var x2_4170 = $std_text_parse._lp__bar__bar__rp_(function() {
             
            var x3_4173 = $std_text_parse.char(0x002E);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(_mlift4098_phexdouble);
            }
            else {
              return $std_text_parse.hex_digits();
            }
          }, function() {
            return "";
          });
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_4063 /* string */ ) {
            return _mlift4099_phexdouble(x1_4167, _y_4063);
          });
        }
        else {
           
          var frac = $std_core.trim_right_1(x2_4170, "0");
           
          var x4_4175 = $std_text_parse._lp__bar__bar__rp_(function() {
               
              var x5_4178 = $std_text_parse.one_of("pP");
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(_mlift4096_phexdouble);
              }
              else {
                return $std_text_parse.pint();
              }
            }, function() {
              return 0;
            });
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(exp /* int */ ) {
              return _mlift4097_phexdouble(frac, x1_4167, exp);
            });
          }
          else {
             
            var _x1_4086 = $std_core._lp__plus__plus__1_rp_(x1_4167, frac);
             
            var m = $std_core.$default($std_core_hnd._open_none2(function(s /* string */ , hex /* optional<bool> */ ) {
                  var _x8 = (hex !== undefined) ? hex : false;
                  return $std_core.xparse_int((((((s).replace(/^\s\s*/,'')))).replace(/\s+$/,'')), _x8);
                }, _x1_4086, true), 0);
             
            var y_4083 = $std_core._int_mul(4,($std_core.count_1(frac)));
             
            var e = $std_core._int_sub(x4_4175,y_4083);
            return $std_core_hnd._open_none2(function(man0 /* int */ , exp00 /* int */ ) {
                return ldexp($std_core._int_to_double(man0), exp00);
              }, m, e);
          }
        }
      }
    }
  }
}
 
 
// monadic lift
export function _mlift4103_pspecial(wild__) /* (wild_ : string) -> std/text/parse/parse float64 */  {
  return nan;
}
 
 
// monadic lift
export function _mlift4104_pspecial(wild__0) /* (wild_0 : string) -> std/text/parse/parse float64 */  {
  return posinf;
}
 
 
// monadic lift
export function _mlift4105_pspecial(wild__1) /* (wild_1 : string) -> std/text/parse/parse float64 */  {
  return posinf;
}
 
export function pspecial() /* () -> std/text/parse/parse float64 */  {
  return $std_text_parse.choose($std_core.Cons(function() {
       
      var x_4180 = $std_text_parse.pstring("nan");
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift4103_pspecial);
      }
      else {
        return nan;
      }
    }, $std_core.Cons(function() {
         
        var x0_4182 = $std_text_parse.pstring("infinity");
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(_mlift4104_pspecial);
        }
        else {
          return posinf;
        }
      }, $std_core.Cons(function() {
           
          var x1_4184 = $std_text_parse.pstring("inf");
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(_mlift4105_pspecial);
          }
          else {
            return posinf;
          }
        }, $std_core.Nil))));
}
 
 
// monadic lift
export function _mlift4106_pdouble(wild__) /* (wild_ : string) -> std/text/parse/parse float64 */  {
  return nan;
}
 
 
// monadic lift
export function _mlift4107_pdouble(wild__0) /* (wild_0 : string) -> std/text/parse/parse float64 */  {
  return posinf;
}
 
 
// monadic lift
export function _mlift4108_pdouble(wild__1) /* (wild_1 : string) -> std/text/parse/parse float64 */  {
  return posinf;
}
 
 
// monadic lift
export function _mlift4109_pdouble(neg, d) /* (neg : bool, d : float64) -> std/text/parse/parse float64 */  {
  return (neg) ? (-d) : d;
}
 
 
// monadic lift
export function _mlift4110_pdouble(neg) /* (neg : bool) -> std/text/parse/parse float64 */  {
   
  var x_4186 = $std_text_parse.choose($std_core.Cons(phexdouble, $std_core.Cons(pdecdouble, $std_core.Cons(function() {
          return $std_text_parse.choose($std_core.Cons(function() {
               
              var x0_4188 = $std_text_parse.pstring("nan");
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(_mlift4106_pdouble);
              }
              else {
                return nan;
              }
            }, $std_core.Cons(function() {
                 
                var x1_4190 = $std_text_parse.pstring("infinity");
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift4107_pdouble);
                }
                else {
                  return posinf;
                }
              }, $std_core.Cons(function() {
                   
                  var x2_4192 = $std_text_parse.pstring("inf");
                  if ($std_core_hnd._yielding()) {
                    return $std_core_hnd.yield_extend(_mlift4108_pdouble);
                  }
                  else {
                    return posinf;
                  }
                }, $std_core.Nil))));
        }, $std_core.Cons(function() {
            return 0.0;
          }, $std_core.Nil)))));
   
  function next_4187(d) /* (float64) -> std/text/parse/parse float64 */  {
    return (neg) ? (-d) : d;
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_4187);
  }
  else {
    return next_4187(x_4186);
  }
}
 
export function pdouble() /* () -> std/text/parse/parse float64 */  {
   
  var x_4196 = $std_text_parse.sign();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift4110_pdouble);
  }
  else {
     
    var x0_4199 = $std_text_parse.choose($std_core.Cons(phexdouble, $std_core.Cons(pdecdouble, $std_core.Cons(function() {
            return $std_text_parse.choose($std_core.Cons(function() {
                 
                var x1_4202 = $std_text_parse.pstring("nan");
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(_mlift4106_pdouble);
                }
                else {
                  return nan;
                }
              }, $std_core.Cons(function() {
                   
                  var x2_4204 = $std_text_parse.pstring("infinity");
                  if ($std_core_hnd._yielding()) {
                    return $std_core_hnd.yield_extend(_mlift4107_pdouble);
                  }
                  else {
                    return posinf;
                  }
                }, $std_core.Cons(function() {
                     
                    var x3_4206 = $std_text_parse.pstring("inf");
                    if ($std_core_hnd._yielding()) {
                      return $std_core_hnd.yield_extend(_mlift4108_pdouble);
                    }
                    else {
                      return posinf;
                    }
                  }, $std_core.Nil))));
          }, $std_core.Cons(function() {
              return 0.0;
            }, $std_core.Nil)))));
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(d /* float64 */ ) {
        return (x_4196) ? (-d) : d;
      });
    }
    else {
      return (x_4196) ? (-x0_4199) : x0_4199;
    }
  }
}
 
 
// monadic lift
export function _mlift4111_parse_float64(x, wild__) /* (x : float64, wild_ : ()) -> std/text/parse/parse float64 */  {
  return x;
}
 
 
// monadic lift
export function _mlift4112_parse_float64(x) /* (x : float64) -> std/text/parse/parse float64 */  {
   
  var x0_4210 = $std_text_parse.eof();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return x;
    });
  }
  else {
    return x;
  }
}
 
 
// Parse a float64 number. Can be "NaN", "Inf(inity)" (case-insensitive),
// a fix-point number (`1.2`) or in scientific notation (`-2.3e-5`).
// Also allows floats in [hexadecimal notation](https://books.google.com/books?id=FgMsCwAAQBAJ&pg=PA41) (`0xA.Fp-10`) that can
// be represented precisely (and are the preferred _round trip_ format).
export function parse_float64(s) /* (s : string) -> maybe<float64> */  {
   
  var s0_4038 = $std_core.to_lower((((((s).replace(/^\s\s*/,'')))).replace(/\s+$/,'')));
   
  var input_4036 = $std_core.Sslice(s0_4038, 0, s0_4038.length);
   
  var perr_4035 = $std_text_parse.parse(input_4036, function() {
       
      var x_4214 = pdouble();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift4112_parse_float64);
      }
      else {
        return _mlift4112_parse_float64(x_4214);
      }
    });
  if (perr_4035._tag === 1) {
    return $std_core_types.Just(perr_4035.result);
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// Convert degrees to radians.
export function rad(deg0) /* (deg : float64) -> float64 */  {
  return (deg0 * deg2rad);
}
 
 
// Round a float64 to a specified precision. Rounds to the  even number in case of a tie.\
// `123.456.round-to-prec(2) == 123.46`\
// `123.456.round-to-prec(-1) == 120.0`\
export function round_to_prec(d, prec) /* (d : float64, prec : int) -> float64 */  {
  if ($std_core._int_le(prec,0)) {
    return $std_core._double_round_even(d);
  }
  else {
     
    var p = Math.pow(10.0,($std_core._int_to_double(prec)));
    return (($std_core._double_round_even(((d * p)))) / p);
  }
}
 
 
/* Show a float64 in [hexadecimal notation](https://books.google.com/books?id=FgMsCwAAQBAJ&pg=PA41).
An advantage of this format is that it precisely represents the `:float64` and can
reliably (and efficiently) be parsed back, i.e. `d.show-hex.parse-float64 == Just(d)`.
The significant is the _hexadecimal_ fraction while the
exponent after the `p` is the _decimal_ power of 2.
 For example, ``0xA.Fp-10`` = (10 + 15/16)&middot;2^-10^  (not 2^-16^!) = 0.01068115234375.
 Equivalently, ``0xA.Fp-10 == 0x5.78p-9 == 0x2.BCp-8 == 0x1.5Ep-7``.
```
> flt-min.show-hex
"0x1.0p-1022"
> 0.1.show-hex
"0x1.999999999999Ap-4"
> flt-max.show-hex
"0x1.FFFFFFFFFFFFFp+1023"
> -0.0.show-hex
"-0x0.0p+0"
> nan.show-hex
"NaN"
> 0.01068115234375.show-hex
"0x1.5Ep-7"
```
.
*/
export function show_hex(d, width, use_capitals, pre) /* (d : float64, width : optional<int>, use-capitals : optional<bool>, pre : optional<string>) -> string */  {
   
  var b_4040 = isFinite(d);
  if (b_4040) {
    var _x8 = decode(d);
     
    var _x9 = (use_capitals !== undefined) ? use_capitals : true;
    var man = $std_core.show_hex($std_core._int_abs((_x8.fst)), 1, _x9, "");
     
    var x0_4043 = $std_core.count_1(man);
     
    var y_4042 = $std_core._int_mul(4,($std_core._int_sub(x0_4043,1)));
     
    var exp0 = $std_core._int_add((_x8.snd),y_4042);
     
    var _x10 = ($std_core._int_ge(exp0,0)) ? "+" : "";
    var exp = $std_core._lp__plus__plus__1_rp_(_x10, $std_core.show(exp0));
     
    var _x13 = (width !== undefined) ? width : 1;
    var _x12 = $std_core._int_ge(1,_x13);
    if (_x12) {
      var _x11 = 1;
    }
    else {
      var _x11 = (width !== undefined) ? width : 1;
    }
    var frac = $std_core.pad_right($std_core.trim_right_1($std_core.tail_2(man), "0"), _x11, 0x0030);
     
    if ((d < (0.0))) {
      var sign = "-";
    }
    else {
      if ((d === (0.0))) {
        var _x14 = (((((1.0) / d))) === -Infinity);
        var sign = (_x14) ? "-" : "";
      }
      else {
        var sign = "";
      }
    }
    var _x9 = (pre !== undefined) ? pre : "0x";
    return $std_core._lp__plus__plus__1_rp_(sign, $std_core._lp__plus__plus__1_rp_(_x9, $std_core._lp__plus__plus__1_rp_($std_core.head_3(man), $std_core._lp__plus__plus__1_rp_(".", $std_core._lp__plus__plus__1_rp_(frac, $std_core._lp__plus__plus__1_rp_("p", exp))))));
  }
  else {
    return $std_core.show_1(d);
  }
}
 
 
// Return if two floats are nearly equal with respect to an `epsilon` of `8*flt-epsilon`.
// See also `nearly-eq` which takes an explicit `epsilon`.
export function _lp__tilde__eq__rp_(x, y) /* (x : float64, y : float64) -> bool */  {
  return nearly_eq(x, y);
}