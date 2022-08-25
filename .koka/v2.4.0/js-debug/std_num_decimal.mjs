// Koka generated module: "std/num/decimal", koka version: 2.4.0
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
import * as $std_num_int64 from './std_num_int64.mjs';
import * as $std_num_float64 from './std_num_float64.mjs';
 
// externals
 
// type declarations
// type decimal
export function Decimal(num, exp) /* (num : int, exp : int) -> decimal */  {
  return { num: num, exp: exp };
}
// type round
export const Half_even = 1; // round
export const Half_ceiling = 2; // round
export const Half_floor = 3; // round
export const Half_truncate = 4; // round
export const Half_away_from_zero = 5; // round
export const Ceiling = 6; // round
export const Floor = 7; // round
export const Truncate = 8; // round
export const Away_from_zero = 9; // round
 
// declarations
 
 
// Automatically generated. Retrieves the `num` constructor field of the `:decimal` type.
export function num(decimal0) /* (decimal : decimal) -> int */  {
  return decimal0.num;
}
 
 
// Automatically generated. Retrieves the `exp` constructor field of the `:decimal` type.
export function exp(decimal0) /* (decimal : decimal) -> int */  {
  return decimal0.exp;
}
 
export function _copy(_this, num0, exp0) /* (decimal, num : optional<int>, exp : optional<int>) -> decimal */  {
  if (num0 !== undefined) {
    var _x0 = num0;
  }
  else {
    var _x0 = _this.num;
  }
  if (exp0 !== undefined) {
    var _x1 = exp0;
  }
  else {
    var _x1 = _this.exp;
  }
  return Decimal(_x0, _x1);
}
 
 
// Automatically generated. Tests for the `Half-even` constructor of the `:round` type.
export function is_half_even(round0) /* (round : round) -> bool */  {
  return (round0 === 1);
}
 
 
// Automatically generated. Tests for the `Half-ceiling` constructor of the `:round` type.
export function is_half_ceiling(round0) /* (round : round) -> bool */  {
  return (round0 === 2);
}
 
 
// Automatically generated. Tests for the `Half-floor` constructor of the `:round` type.
export function is_half_floor(round0) /* (round : round) -> bool */  {
  return (round0 === 3);
}
 
 
// Automatically generated. Tests for the `Half-truncate` constructor of the `:round` type.
export function is_half_truncate(round0) /* (round : round) -> bool */  {
  return (round0 === 4);
}
 
 
// Automatically generated. Tests for the `Half-away-from-zero` constructor of the `:round` type.
export function is_half_away_from_zero(round0) /* (round : round) -> bool */  {
  return (round0 === 5);
}
 
 
// Automatically generated. Tests for the `Ceiling` constructor of the `:round` type.
export function is_ceiling(round0) /* (round : round) -> bool */  {
  return (round0 === 6);
}
 
 
// Automatically generated. Tests for the `Floor` constructor of the `:round` type.
export function is_floor(round0) /* (round : round) -> bool */  {
  return (round0 === 7);
}
 
 
// Automatically generated. Tests for the `Truncate` constructor of the `:round` type.
export function is_truncate(round0) /* (round : round) -> bool */  {
  return (round0 === 8);
}
 
 
// Automatically generated. Tests for the `Away-from-zero` constructor of the `:round` type.
export function is_away_from_zero(round0) /* (round : round) -> bool */  {
  return (round0 === 9);
}
 
export var maxpd;
var maxpd = 1.0e15;
 
 
// Optimize: Use float64 division when within precision bounds.
export var maxexp;
var maxexp = 308;
 
 
// Is the decimal negative?
export function is_neg(x) /* (x : decimal) -> bool */  {
   
  var _x2 = x.num;
  var x_17067 = $std_core._int_sign(_x2);
  if (x_17067 === 1) {
    var _x2 = -1;
  }
  else if (x_17067 === 2) {
    var _x2 = 0;
  }
  else {
    var _x2 = 1;
  }
  return $std_core._int_eq(_x2,(-1));
}
 
 
// Is this decimal zero?
export function is_zero(x) /* (x : decimal) -> bool */  {
  var _x3 = x.num;
  return $std_core._int_iszero(_x3);
}
 
 
// Is the decimal positive?
export function is_pos(x) /* (x : decimal) -> bool */  {
   
  var _x4 = x.num;
  var x_17015 = $std_core._int_sign(_x4);
  if (x_17015 === 1) {
    var _x4 = -1;
  }
  else if (x_17015 === 2) {
    var _x4 = 0;
  }
  else {
    var _x4 = 1;
  }
  return $std_core._int_eq(_x4,1);
}
 
 
// round exponents to specific intervals (7) to avoid too much rescaling
export function round_exp(exp0) /* (exp : int) -> int */  {
  if ($std_core._int_iszero(exp0)) {
    return 0;
  }
  else {
    return $std_core._int_mul(7,($std_core._int_div(exp0,7)));
  }
}
 
 
// Create a decimal from an integer `i` with an optional
// exponent `exp` (=`0`) such that the result equals `i`&times;10^`exp`^.
export function decimal_exp(i, exp0) /* (i : int, exp : optional<int>) -> decimal */  {
   
  var _x6 = (exp0 !== undefined) ? exp0 : 0;
  var _x5 = $std_core._int_iszero(_x6);
  if (_x5) {
    var x = 0;
  }
  else {
    var _x7 = (exp0 !== undefined) ? exp0 : 0;
    var x = $std_core._int_mul(7,($std_core._int_div(_x7,7)));
  }
   
  var _x8 = (exp0 !== undefined) ? exp0 : 0;
  var diff = $std_core._int_sub(_x8,x);
  if ($std_core._int_iszero(diff)) {
    var _x5 = (exp0 !== undefined) ? exp0 : 0;
    return Decimal(i, _x5);
  }
  else {
    return Decimal($std_core.mul_exp10(i, $std_core._int_abs(diff)), x);
  }
}
 
 
// Ensure a decimal `x` has an exponent such that `x.exp <= e`.
export function expand(x, e) /* (x : decimal, e : int) -> decimal */  {
  var _x7 = x.exp;
  var _x6 = $std_core._int_le(_x7,e);
  if (_x6) {
    return x;
  }
  else {
    var _x8 = x.num;
    var _x9 = x.exp;
    return decimal_exp($std_core.mul_exp10(_x8, $std_core._int_sub(_x9,e)), e);
  }
}
 
 
// Compare decimals.
export function compare(x, y) /* (x : decimal, y : decimal) -> order */  {
   
  var _x11 = x.exp;
  var _x12 = y.exp;
  var _x10 = $std_core._int_le(_x11,_x12);
  if (_x10) {
    var e = x.exp;
  }
  else {
    var e = y.exp;
  }
   
  var xx = expand(x, e);
   
  var yy = expand(y, e);
  var _x10 = xx.num;
  var _x11 = yy.num;
  return $std_core._int_compare(_x10,_x11);
}
 
export function _lp__excl__eq__rp_(x, y) /* (x : decimal, y : decimal) -> bool */  {
  return $std_core._lp__excl__eq__4_rp_(compare(x, y), $std_core_types.Eq);
}
 
 
// Choose an exponent that minimizes memory usage.
export function reduce(x) /* (x : decimal) -> decimal */  {
   
  var _x12 = x.num;
  var p = $std_core.is_exp10(_x12);
   
  var x_17015 = $std_core._int_sign(p);
   
  if (x_17015 === 1) {
    var _x13 = -1;
  }
  else if (x_17015 === 2) {
    var _x13 = 0;
  }
  else {
    var _x13 = 1;
  }
  var b_4013 = $std_core._int_eq(_x13,1);
  if (b_4013) {
     
    var _x12 = x.exp;
    var expp = $std_core._int_add(_x12,p);
    if ($std_core._int_iszero(expp)) {
      var _x13 = 0;
    }
    else {
      var _x13 = $std_core._int_mul(7,($std_core._int_div(expp,7)));
    }
    var _x14 = x.exp;
    var _x12 = $std_core._int_eq(_x13,_x14);
    if (_x12) {
      return x;
    }
    else {
      var _x15 = x.num;
      return decimal_exp($std_core.cdiv_exp10(_x15, p), expp);
    }
  }
  else {
    return x;
  }
}
 
 
// Multiply two decimals with full precision.
export function _lp__star__rp_(x, y) /* (x : decimal, y : decimal) -> decimal */  {
   
  var _x16 = x.num;
  var _x17 = y.num;
  var _x18 = x.exp;
  var _x19 = y.exp;
  var z = decimal_exp($std_core._int_mul(_x16,_x17), $std_core._int_add(_x18,_x19));
   
  var _x20 = z.exp;
  var x_17067 = $std_core._int_sign(_x20);
  if (x_17067 === 1) {
    var _x17 = -1;
  }
  else if (x_17067 === 2) {
    var _x17 = 0;
  }
  else {
    var _x17 = 1;
  }
  var _x16 = $std_core._int_eq(_x17,(-1));
  if (_x16) {
    return reduce(z);
  }
  else {
    return z;
  }
}
 
 
// Add two decimals.
export function _lp__plus__rp_(x, y) /* (x : decimal, y : decimal) -> decimal */  {
   
  var _x19 = x.exp;
  var _x20 = y.exp;
  var _x18 = $std_core._int_le(_x19,_x20);
  if (_x18) {
    var e = x.exp;
  }
  else {
    var e = y.exp;
  }
   
  var xx = expand(x, e);
   
  var yy = expand(y, e);
  var _x18 = xx.num;
  var _x19 = yy.num;
  return Decimal($std_core._int_add(_x18,_x19), e);
}
 
 
// Negate a decimal.
export function _lp__tilde__rp_(x) /* (x : decimal) -> decimal */  {
  var _x20 = x.num;
  var _x21 = x.exp;
  return Decimal($std_core._int_negate(_x20), _x21);
}
 
 
// Subtract two decimals.
export function _lp__dash__rp_(x, y) /* (x : decimal, y : decimal) -> decimal */  {
   
  var _x22 = y.num;
  var _x23 = y.exp;
  var y0_4202 = Decimal($std_core._int_negate(_x22), _x23);
   
  var _x25 = x.exp;
  var _x26 = y0_4202.exp;
  var _x24 = $std_core._int_le(_x25,_x26);
  if (_x24) {
    var e = x.exp;
  }
  else {
    var e = y0_4202.exp;
  }
   
  var xx = expand(x, e);
   
  var yy = expand(y0_4202, e);
  var _x22 = xx.num;
  var _x23 = yy.num;
  return Decimal($std_core._int_add(_x22,_x23), e);
}
 
 
/* Divide two decimals with a given extra precision `min-prec` (=`15`).
The `min-prec` is the number of extra digits used to calculate inexact
divisions.
Note: the division uses up to `min-prec` precision using `Floor` rounding
for the last digit if the result is  inexact. To round differently, you can
for example divide with larger precision and use `round-to-prec`.
```
> div( decimal(2), decimal(3), 0 )
0
> div( decimal(2), decimal(3), 1 )
0.6
> div( decimal(2), decimal(3) )  // default precision is 15
0.6666666666666666
> div( decimal(2), decimal(3) ).round-to-prec(6)
0.666667
```
.
*/
export function div(x, y, min_prec) /* (x : decimal, y : decimal, min-prec : optional<int>) -> decimal */  {
  var _x25 = x.num;
  var _x24 = $std_core._int_iszero(_x25);
  if (_x24) {
    return Decimal(0, 0);
  }
  else {
    var _x27 = y.num;
    var _x26 = $std_core._int_iszero(_x27);
    if (_x26) {
      return Decimal(0, 0);
    }
    else {
       
      var _x28 = x.exp;
      var _x29 = y.exp;
      var e = $std_core._int_sub(_x28,_x29);
       
      var _x30 = x.num;
      var xdigits = $std_core.count_digits(_x30);
       
      var _x31 = y.num;
      var ydigits = $std_core.count_digits(_x31);
       
      var j_4055 = $std_core._int_sub(ydigits,xdigits);
       
      var x3_4052 = ($std_core._int_ge(0,j_4055)) ? 0 : j_4055;
       
      var _x32 = (min_prec !== undefined) ? min_prec : 15;
      var extra = $std_core._int_add(x3_4052,_x32);
      if ($std_core._int_gt(extra,0)) {
        var _x29 = x.num;
        var _x30 = y.num;
        var _x28 = decimal_exp($std_core._int_div(($std_core.mul_exp10(_x29, extra)),_x30), $std_core._int_sub(e,extra));
      }
      else {
        var _x31 = x.num;
        var _x32 = y.num;
        var _x28 = decimal_exp($std_core._int_div(_x31,_x32), $std_core._int_sub(e,extra));
      }
      return reduce(_x28);
    }
  }
}
 
 
// Divide two decimals using 15 digits of extra precision.
export function _lp__fs__rp_(x, y) /* (x : decimal, y : decimal) -> decimal */  {
  return div(x, y);
}
 
export function _lp__lt__rp_(x, y) /* (x : decimal, y : decimal) -> bool */  {
  return $std_core._lp__eq__eq__4_rp_(compare(x, y), $std_core_types.Lt);
}
 
export function _lp__lt__eq__rp_(x, y) /* (x : decimal, y : decimal) -> bool */  {
  return $std_core._lp__excl__eq__4_rp_(compare(x, y), $std_core_types.Gt);
}
 
export function _lp__eq__eq__rp_(x, y) /* (x : decimal, y : decimal) -> bool */  {
  return $std_core._lp__eq__eq__4_rp_(compare(x, y), $std_core_types.Eq);
}
 
export function _lp__gt__rp_(x, y) /* (x : decimal, y : decimal) -> bool */  {
  return $std_core._lp__eq__eq__4_rp_(compare(x, y), $std_core_types.Gt);
}
 
export function _lp__gt__eq__rp_(x, y) /* (x : decimal, y : decimal) -> bool */  {
  return $std_core._lp__excl__eq__4_rp_(compare(x, y), $std_core_types.Lt);
}
 
 
// The absolute value of a decimal
export function abs(x) /* (x : decimal) -> decimal */  {
   
  var _x33 = x.num;
  var x_17067 = $std_core._int_sign(_x33);
  if (x_17067 === 1) {
    var _x34 = -1;
  }
  else if (x_17067 === 2) {
    var _x34 = 0;
  }
  else {
    var _x34 = 1;
  }
  var _x33 = $std_core._int_eq(_x34,(-1));
  if (_x33) {
    var _x35 = x.num;
    var _x36 = x.exp;
    return Decimal($std_core._int_negate(_x35), _x36);
  }
  else {
    return x;
  }
}
 
 
// Create a decimal from an integer `i` with an optional
// exponent `exp` (=`0`) such that the result equals `i`&times;10^`exp`^.
export function decimal(i, exp0) /* (i : int, exp : optional<int>) -> decimal */  {
  var _x37 = (exp0 !== undefined) ? exp0 : 0;
  return decimal_exp(i, _x37);
}
 
 
// Decimal to the power of `n`
export function pow(x, n) /* (x : decimal, n : int) -> decimal */  {
   
  var m = $std_core._int_abs(n);
   
  var _x38 = x.num;
  var _x39 = x.exp;
  var y = decimal_exp($std_core.pow(_x38, m), $std_core._int_mul(_x39,m));
   
  var x_17067 = $std_core._int_sign(n);
  if (x_17067 === 1) {
    var _x39 = -1;
  }
  else if (x_17067 === 2) {
    var _x39 = 0;
  }
  else {
    var _x39 = 1;
  }
  var _x38 = $std_core._int_eq(_x39,(-1));
  if (_x38) {
    var _x41 = undefined;
    var _x40 = (_x41 !== undefined) ? _x41 : 0;
    return div(decimal_exp(1, _x40), y, $std_core._int_add(3,m));
  }
  else {
    return y;
  }
}
 
 
/* Create a decimal from a `:float64` with a specified maximal precision (=`-1`).
Use a negative maximal precision to create a decimal that precisely represents the `:float64`.
Note: creating a `:decimal` from a `:float64` may lose precision and give surprising results as many decimal
fractions cannot be represented precisely by a `:float64`.
Also, `decimal(i,exp)` is more efficient and better when when exact representations
are required. For example:
```
> decimal(1.1)
1.100000000000000088817841970012523233890533447265625
> decimal(1.1,17)
1.10000000000000008
> decimal(11,-1)
1.1
```
.
*/
export function decimal_1(d, max_prec) /* (d : float64, max-prec : optional<int>) -> decimal */  {
  var _x42 = $std_num_float64.decode(d);
  if ($std_core._int_ge((_x42.snd),0)) {
     
    var i_4078 = $std_core._int_mul((_x42.fst),($std_core.pow(2, _x42.snd)));
    var _x44 = undefined;
    var _x43 = (_x44 !== undefined) ? _x44 : 0;
    return decimal_exp(i_4078, _x43);
  }
  else {
     
    var _x46 = (max_prec !== undefined) ? max_prec : -1;
    var _x45 = $std_core._int_lt(_x46,0);
    if (_x45) {
      var prec = $std_core._int_negate((_x42.snd));
    }
    else {
       
      var j_4083 = $std_core._int_negate((_x42.snd));
      var _x48 = (max_prec !== undefined) ? max_prec : -1;
      var _x47 = $std_core._int_le(_x48,j_4083);
      if (_x47) {
        var prec = (max_prec !== undefined) ? max_prec : -1;
      }
      else {
        var prec = j_4083;
      }
    }
    var _x46 = undefined;
    var _x45 = (_x46 !== undefined) ? _x46 : 0;
    var _x48 = undefined;
    var _x47 = (_x48 !== undefined) ? _x48 : 0;
    return div(decimal_exp(_x42.fst, _x45), pow(decimal_exp(2, _x47), $std_core._int_negate((_x42.snd))), prec);
  }
}
 
 
// The maximum of `x` and `y`
export function max(x, y) /* (x : decimal, y : decimal) -> decimal */  {
  var _x49 = $std_core._lp__excl__eq__4_rp_(compare(x, y), $std_core_types.Lt);
  return (_x49) ? x : y;
}
 
 
// The minimum of `x` and `y`.
export function min(x, y) /* (x : decimal, y : decimal) -> decimal */  {
  var _x50 = $std_core._lp__excl__eq__4_rp_(compare(x, y), $std_core_types.Gt);
  return (_x50) ? x : y;
}
 
 
// Increment a decimal
export function inc(x) /* (x : decimal) -> decimal */  {
  var _x51 = x.num;
  var _x52 = x.exp;
  return Decimal($std_core._int_add(_x51,1), _x52);
}
 
 
// Is this an even decimal?
export function is_even(x) /* (x : decimal) -> bool */  {
   
  var _x53 = x.num;
  var b_16946 = $std_core._int_isodd(_x53);
  return (b_16946) ? false : true;
}
 
 
// Round the decimal-point number `x` to
// to a specified number of digits behind the dot `prec` (=`0`) with an optional
// rounding mode `rnd` (=`Half-even`). The precision can be negative.\
// `decimal(1,485).round-to-prec(2).show == "1.48"` \
// `decimal(112,49).round-to-prec(-1).show == "110"`
export function round_to_prec(x, prec, rnd) /* (x : decimal, prec : optional<int>, rnd : optional<round>) -> total decimal */  {
  var _x54 = x.exp;
  var _x55 = (prec !== undefined) ? prec : 0;
  var _x53 = $std_core._int_ge(_x54,($std_core._int_negate(_x55)));
  if (_x53) {
    return x;
  }
  else {
     
    var cx = reduce(x);
     
    var _x56 = cx.exp;
    var x0_4098 = $std_core._int_negate(_x56);
     
    var _x57 = (prec !== undefined) ? prec : 0;
    var p = $std_core._int_sub(x0_4098,_x57);
     
    var x_17015 = $std_core._int_sign(p);
     
    if (x_17015 === 1) {
      var _x58 = -1;
    }
    else if (x_17015 === 2) {
      var _x58 = 0;
    }
    else {
      var _x58 = 1;
    }
    var b_4101 = $std_core._int_eq(_x58,1);
    if (b_4101) {
      var _x57 = cx.num;
      var _x56 = $std_core.divmod_exp10(_x57, p);
       
      var round_half = function(keep_on_eq /* bool */ ) {
         
        var half = $std_core._int_div(($std_core.mul_exp10(1, p)),2);
        var _x58 = $std_core._int_compare((_x56.snd),half);
        if (_x58 === 2) {
          return (keep_on_eq) ? _x56.fst : $std_core._int_add((_x56.fst),1);
        }
        else if (_x58 === 3) {
          return $std_core._int_add((_x56.fst),1);
        }
        else {
          return _x56.fst;
        }
      };
       
      if ($std_core._int_iszero((_x56.snd))) {
        var q1 = _x56.fst;
      }
      else {
        if (rnd !== undefined) {
          if (rnd === 1) {
             
            var b_16946 = $std_core._int_isodd((_x56.fst));
            var _x59 = (b_16946) ? false : true;
            var q1 = round_half(_x59);
          }
          else if (rnd === 3) {
            var q1 = round_half(true);
          }
          else if (rnd === 2) {
            var q1 = round_half(false);
          }
          else if (rnd === 4) {
             
            var x_170150 = $std_core._int_sign((_x56.fst));
            if (x_170150 === 1) {
              var _x60 = -1;
            }
            else if (x_170150 === 2) {
              var _x60 = 0;
            }
            else {
              var _x60 = 1;
            }
            var q1 = round_half($std_core._int_eq(_x60,1));
          }
          else if (rnd === 5) {
             
            var x_17067 = $std_core._int_sign((_x56.fst));
            if (x_17067 === 1) {
              var _x61 = -1;
            }
            else if (x_17067 === 2) {
              var _x61 = 0;
            }
            else {
              var _x61 = 1;
            }
            var q1 = round_half($std_core._int_eq(_x61,(-1)));
          }
          else if (rnd === 7) {
            var q1 = _x56.fst;
          }
          else if (rnd === 6) {
            var q1 = $std_core._int_add((_x56.fst),1);
          }
          else if (rnd === 8) {
             
            var x_170670 = $std_core._int_sign((_x56.fst));
             
            if (x_170670 === 1) {
              var _x62 = -1;
            }
            else if (x_170670 === 2) {
              var _x62 = 0;
            }
            else {
              var _x62 = 1;
            }
            var b0_4111 = $std_core._int_eq(_x62,(-1));
            var q1 = (b0_4111) ? $std_core._int_add((_x56.fst),1) : _x56.fst;
          }
          else {
             
            var x_170151 = $std_core._int_sign((_x56.fst));
             
            if (x_170151 === 1) {
              var _x62 = -1;
            }
            else if (x_170151 === 2) {
              var _x62 = 0;
            }
            else {
              var _x62 = 1;
            }
            var b1_4114 = $std_core._int_eq(_x62,1);
            var q1 = (b1_4114) ? $std_core._int_add((_x56.fst),1) : _x56.fst;
          }
        }
        else {
           
          var b_169460 = $std_core._int_isodd((_x56.fst));
          var _x62 = (b_169460) ? false : true;
          var q1 = round_half(_x62);
        }
      }
      var _x58 = (prec !== undefined) ? prec : 0;
      return decimal_exp(q1, $std_core._int_negate(_x58));
    }
    else {
      return cx;
    }
  }
}
 
 
// Round a `:decimal` number to a whole number with an optional rounding mode (=`Half-even`).
export function round(x, rnd) /* (x : decimal, rnd : optional<round>) -> decimal */  {
  var _x59 = (rnd !== undefined) ? rnd : Half_even;
  return round_to_prec(x, 0, _x59);
}
 
 
// Round a `:decimal` to the smallest integer that is not less than `x`.
export function ceiling(x) /* (x : decimal) -> decimal */  {
  return round_to_prec(x, 0, Ceiling);
}
 
 
// Decrement a decimal
export function dec(x) /* (x : decimal) -> decimal */  {
  var _x60 = x.num;
  var _x61 = x.exp;
  return Decimal($std_core._int_sub(_x60,1), _x61);
}
 
 
// The exponent of a decimal if displayed in scientific notation.\
// `11.2e-1.decimal.exponent == 0`
export function exponent(d) /* (d : decimal) -> int */  {
   
  var _x62 = d.num;
  var x0_4125 = $std_core.count_digits(_x62);
   
  var _x63 = d.exp;
  var x_4123 = $std_core._int_add(x0_4125,_x63);
  return $std_core._int_sub(x_4123,1);
}
 
 
// Round a `:decimal` using to the largest integer that is not larger than `x`.
export function floor(x) /* (x : decimal) -> decimal */  {
  return round_to_prec(x, 0, Floor);
}
 
 
// The decimal zero.
export var zero;
var zero = Decimal(0, 0);
 
 
// Return the 'floored' fraction, always in the range [`0`,`1.0`).
// `x.floor + x.ffraction == x`
export function ffraction(x) /* (x : decimal) -> decimal */  {
   
  var _x62 = x.exp;
  var x_17067 = $std_core._int_sign(_x62);
   
  if (x_17067 === 1) {
    var _x63 = -1;
  }
  else if (x_17067 === 2) {
    var _x63 = 0;
  }
  else {
    var _x63 = 1;
  }
  var b_4131 = $std_core._int_eq(_x63,(-1));
  if (b_4131) {
     
    var y_4135 = round_to_prec(x, 0, Floor);
     
    var _x62 = y_4135.num;
    var _x63 = y_4135.exp;
    var y_4206 = Decimal($std_core._int_negate(_x62), _x63);
     
    var _x65 = x.exp;
    var _x66 = y_4206.exp;
    var _x64 = $std_core._int_le(_x65,_x66);
    if (_x64) {
      var e = x.exp;
    }
    else {
      var e = y_4206.exp;
    }
     
    var xx = expand(x, e);
     
    var yy = expand(y_4206, e);
    var _x62 = xx.num;
    var _x63 = yy.num;
    return Decimal($std_core._int_add(_x62,_x63), e);
  }
  else {
    return zero;
  }
}
 
 
// Convert a decimal to a `:float64`. This may lose precision.
export function float64(x) /* (x : decimal) -> float64 */  {
   
  var _x64 = x.exp;
  var x_17067 = $std_core._int_sign(_x64);
   
  if (x_17067 === 1) {
    var _x65 = -1;
  }
  else if (x_17067 === 2) {
    var _x65 = 0;
  }
  else {
    var _x65 = 1;
  }
  var b_4139 = $std_core._int_eq(_x65,(-1));
  if (b_4139) {
    var _x65 = x.num;
    var _x66 = x.exp;
    var _x64 = $std_core.divmod_exp10(_x65, $std_core._int_negate(_x66));
    var _x67 = x.exp;
    return (($std_core._int_to_double((_x64.fst))) + ((($std_core._int_to_double((_x64.snd))) * (Math.pow(10.0,($std_core._int_to_double(_x67)))))));
  }
  else {
    var _x68 = x.num;
    var _x69 = x.exp;
    return (($std_core._int_to_double(_x68)) * (Math.pow((10.0),($std_core._int_to_double(_x69)))));
  }
}
 
 
// Truncate a `:decimal` to an integer by rounding towards zero.
export function truncate(x) /* (x : decimal) -> decimal */  {
  return round_to_prec(x, 0, Truncate);
}
 
 
// Return the 'truncated' fraction, always in the range (`-1.0`,`1.0`).
// `x.truncate + x.fraction == x`
export function fraction(x) /* (x : decimal) -> decimal */  {
   
  var _x70 = x.exp;
  var x_17067 = $std_core._int_sign(_x70);
   
  if (x_17067 === 1) {
    var _x71 = -1;
  }
  else if (x_17067 === 2) {
    var _x71 = 0;
  }
  else {
    var _x71 = 1;
  }
  var b_4149 = $std_core._int_eq(_x71,(-1));
  if (b_4149) {
     
    var y_4153 = round_to_prec(x, 0, Truncate);
     
    var _x70 = y_4153.num;
    var _x71 = y_4153.exp;
    var y_4209 = Decimal($std_core._int_negate(_x70), _x71);
     
    var _x73 = x.exp;
    var _x74 = y_4209.exp;
    var _x72 = $std_core._int_le(_x73,_x74);
    if (_x72) {
      var e = x.exp;
    }
    else {
      var e = y_4209.exp;
    }
     
    var xx = expand(x, e);
     
    var yy = expand(y_4209, e);
    var _x70 = xx.num;
    var _x71 = yy.num;
    return Decimal($std_core._int_add(_x70,_x71), e);
  }
  else {
    return zero;
  }
}
 
 
// Round a `:decimal` number to an integer an optional rounding mode `rnd` (=`Half-even`).
export function int(x, rnd) /* (x : decimal, rnd : optional<round>) -> int */  {
   
  var _x72 = (rnd !== undefined) ? rnd : Half_even;
  var y = round_to_prec(x, 0, _x72);
   
  var _x73 = y.exp;
  var x_17015 = $std_core._int_sign(_x73);
  if (x_17015 === 1) {
    var _x73 = -1;
  }
  else if (x_17015 === 2) {
    var _x73 = 0;
  }
  else {
    var _x73 = 1;
  }
  var _x72 = $std_core._int_eq(_x73,1);
  if (_x72) {
    var _x74 = y.num;
    var _x75 = y.exp;
    return $std_core.mul_exp10(_x74, _x75);
  }
  else {
    return y.num;
  }
}
 
 
// Is this an odd decimal?
export function is_odd(x) /* (x : decimal) -> bool */  {
  var _x76 = x.num;
  return $std_core._int_isodd(_x76);
}
 
export var maxprecise;
var maxprecise = $std_core._int_double((1.0e15));
 
export var minprecise;
var minprecise = $std_core._int_negate(maxprecise);
 
export function is_precise(i) /* (i : int) -> bool */  {
  return ($std_core._int_gt(i,minprecise)) ? $std_core._int_lt(i,maxprecise) : false;
}
 
 
// The sign of a decimal number.
export function sign(x) /* (x : decimal) -> order */  {
  var _x77 = x.num;
  return $std_core._int_sign(_x77);
}
 
 
// monadic lift
export function _mlift4236_pdecimal(wild__0) /* (wild_0 : char) -> std/text/parse/parse int */  {
  return $std_text_parse.pint();
}
 
 
// monadic lift
export function _mlift4237_pdecimal(frac, neg, whole, exp0) /* (frac : string, neg : bool, whole : string, exp0 : int) -> std/text/parse/parse decimal */  {
   
  var _x1_4233 = $std_core.parse_int_default($std_core._lp__plus__plus__1_rp_(whole, frac), 0);
   
  var y_4231 = $std_core.count_1(frac);
   
  var _x2_4234 = $std_core._int_sub(exp0,y_4231);
   
  var i = $std_core_hnd._open_none2(decimal_exp, _x1_4233, _x2_4234);
  if (neg) {
    return $std_core_hnd._open_none1(function(x0 /* decimal */ ) {
        var _x78 = x0.num;
        var _x79 = x0.exp;
        return Decimal($std_core._int_negate(_x78), _x79);
      }, i);
  }
  else {
    return i;
  }
}
 
 
// monadic lift
export function _mlift4238_pdecimal(wild__) /* (wild_ : char) -> std/text/parse/parse string */  {
  return $std_text_parse.digits();
}
 
 
// monadic lift
export function _mlift4239_pdecimal(neg, whole, frac) /* (neg : bool, whole : string, frac : string) -> std/text/parse/parse decimal */  {
   
  var x_4244 = $std_text_parse._lp__bar__bar__rp_(function() {
       
      var x0_4246 = $std_text_parse.one_of("eE");
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift4236_pdecimal);
      }
      else {
        return $std_text_parse.pint();
      }
    }, function() {
      return 0;
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(exp0 /* int */ ) {
      return _mlift4237_pdecimal(frac, neg, whole, exp0);
    });
  }
  else {
    return _mlift4237_pdecimal(frac, neg, whole, x_4244);
  }
}
 
 
// monadic lift
export function _mlift4240_pdecimal(neg, whole) /* (neg : bool, whole : string) -> std/text/parse/parse decimal */  {
   
  var x_4248 = $std_text_parse._lp__bar__bar__rp_(function() {
       
      var x0_4250 = $std_text_parse.char(0x002E);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift4238_pdecimal);
      }
      else {
        return $std_text_parse.digits();
      }
    }, function() {
      return "";
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(frac /* string */ ) {
      return _mlift4239_pdecimal(neg, whole, frac);
    });
  }
  else {
    return _mlift4239_pdecimal(neg, whole, x_4248);
  }
}
 
 
// monadic lift
export function _mlift4241_pdecimal(neg) /* (neg : bool) -> std/text/parse/parse decimal */  {
   
  var x_4252 = $std_text_parse.digits();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(whole /* string */ ) {
      return _mlift4240_pdecimal(neg, whole);
    });
  }
  else {
    return _mlift4240_pdecimal(neg, x_4252);
  }
}
 
export function pdecimal() /* () -> std/text/parse/parse decimal */  {
   
  var x_4254 = $std_text_parse.sign();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift4241_pdecimal);
  }
  else {
     
    var x0_4257 = $std_text_parse.digits();
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(whole /* string */ ) {
        return _mlift4240_pdecimal(x_4254, whole);
      });
    }
    else {
       
      var x1_4260 = $std_text_parse._lp__bar__bar__rp_(function() {
           
          var x2_4263 = $std_text_parse.char(0x002E);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(_mlift4238_pdecimal);
          }
          else {
            return $std_text_parse.digits();
          }
        }, function() {
          return "";
        });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(frac /* string */ ) {
          return _mlift4239_pdecimal(x_4254, x0_4257, frac);
        });
      }
      else {
         
        var x3_4265 = $std_text_parse._lp__bar__bar__rp_(function() {
             
            var x4_4268 = $std_text_parse.one_of("eE");
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(_mlift4236_pdecimal);
            }
            else {
              return $std_text_parse.pint();
            }
          }, function() {
            return 0;
          });
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(exp0 /* int */ ) {
            return _mlift4237_pdecimal(x1_4260, x_4254, x0_4257, exp0);
          });
        }
        else {
           
          var _x1_4233 = $std_core.parse_int_default($std_core._lp__plus__plus__1_rp_(x0_4257, x1_4260), 0);
           
          var y_4231 = $std_core.count_1(x1_4260);
           
          var _x2_4234 = $std_core._int_sub(x3_4265,y_4231);
           
          var i = $std_core_hnd._open_none2(decimal_exp, _x1_4233, _x2_4234);
          if (x_4254) {
            return $std_core_hnd._open_none1(function(x00 /* decimal */ ) {
                var _x80 = x00.num;
                var _x81 = x00.exp;
                return Decimal($std_core._int_negate(_x80), _x81);
              }, i);
          }
          else {
            return i;
          }
        }
      }
    }
  }
}
 
 
// monadic lift
export function _mlift4242_parse_decimal(x, wild) /* (x : decimal, wild : ()) -> std/text/parse/parse decimal */  {
  return x;
}
 
 
// monadic lift
export function _mlift4243_parse_decimal(x) /* (x : decimal) -> std/text/parse/parse decimal */  {
   
  var x0_4270 = $std_text_parse.eof();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild /* () */ ) {
      return x;
    });
  }
  else {
    return x;
  }
}
 
 
// Parse a `:decimal` number.
export function parse_decimal(s) /* (s : string) -> maybe<decimal> */  {
   
  var s0_4175 = (((((s).replace(/^\s\s*/,'')))).replace(/\s+$/,''));
   
  var input_4173 = $std_core.Sslice(s0_4175, 0, s0_4175.length);
   
  var perr_4172 = $std_text_parse.parse(input_4173, function() {
       
      var x_4274 = pdecimal();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift4243_parse_decimal);
      }
      else {
        return _mlift4243_parse_decimal(x_4274);
      }
    });
  if (perr_4172._tag === 1) {
    return $std_core_types.Just(perr_4172.result);
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
export function show_frac(frac, prec) /* (frac : string, prec : int) -> string */  {
   
  var frac_trim = $std_core.trim_right_1(frac, "0");
   
  if ($std_core._int_ge(prec,0)) {
    var frac_full = $std_core.pad_right(frac_trim, prec, 0x0030);
  }
  else {
    var frac_full = frac_trim;
  }
  if ((frac_full === (""))) {
    return "";
  }
  else {
    return $std_core._lp__plus__plus__1_rp_(".", frac_full);
  }
}
 
 
/* Show a decimal `d` with a given precision `prec` (=`-1000`) in scientific notation.
The precision specifies the  number of digits after the dot, i.e.
the number of significant digits is `prec+1`.
If the precision is negative, _at most_ `prec` digits are displayed, and if
it is positive exactly `prec` digits are used.
```
> decimal(1,-1).show-exp
"1e-1"
> 1.1.decimal.show-exp
"1.100000000000000088817841970012523233890533447265625"
> 1.1.decimal.show-exp(-20)
"1.10000000000000008882"
> 0.125.decimal.show-exp(-20)
"1.25e-1"
> 0.125.decimal.show-exp(20)
"1.25000000000000000000e-1"
```
.
*/
export function show_exp(d, prec) /* (d : decimal, prec : optional<int>) -> string */  {
   
  var _x82 = (prec !== undefined) ? prec : -1000;
  var x_4178 = $std_core._int_abs(_x82);
   
  var _x83 = d.num;
  var x0_4125 = $std_core.count_digits(_x83);
   
  var _x84 = d.exp;
  var x_4123 = $std_core._int_add(x0_4125,_x84);
   
  var y_4179 = $std_core._int_sub(x_4123,1);
   
  var x0 = round_to_prec(d, $std_core._int_sub(x_4178,y_4179));
   
  var _x85 = x0.num;
  var s = $std_core.show($std_core._int_abs(_x85));
   
  var digits = $std_core.count_1(s);
   
  var _x86 = x0.exp;
  var x1_4181 = $std_core._int_add(_x86,digits);
   
  var exp0 = $std_core._int_sub(x1_4181,1);
   
  var _x87 = x0.num;
  var x_17067 = $std_core._int_sign(_x87);
   
  if (x_17067 === 1) {
    var _x89 = -1;
  }
  else if (x_17067 === 2) {
    var _x89 = 0;
  }
  else {
    var _x89 = 1;
  }
  var _x88 = $std_core._int_eq(_x89,(-1));
  var sign0 = (_x88) ? "-" : "";
   
  if ($std_core._int_eq(exp0,0)) {
    var exponent0 = "";
  }
  else {
     
    var x_17015 = $std_core._int_sign(exp0);
    if (x_17015 === 1) {
      var _x92 = -1;
    }
    else if (x_17015 === 2) {
      var _x92 = 0;
    }
    else {
      var _x92 = 1;
    }
    var _x91 = $std_core._int_eq(_x92,1);
    var _x90 = (_x91) ? "+" : "";
    var exponent0 = $std_core._lp__plus__plus__1_rp_("e", $std_core._lp__plus__plus__1_rp_(_x90, $std_core.show(exp0)));
  }
   
  var frac_4212 = $std_core.tail_2(s);
   
  var frac_trim = $std_core.trim_right_1(frac_4212, "0");
   
  var _x94 = (prec !== undefined) ? prec : -1000;
  var _x93 = $std_core._int_ge(_x94,0);
  if (_x93) {
    var _x95 = (prec !== undefined) ? prec : -1000;
    var frac_full = $std_core.pad_right(frac_trim, _x95, 0x0030);
  }
  else {
    var frac_full = frac_trim;
  }
  if ((frac_full === (""))) {
    var _x82 = "";
  }
  else {
    var _x82 = $std_core._lp__plus__plus__1_rp_(".", frac_full);
  }
  return $std_core._lp__plus__plus__1_rp_(sign0, $std_core._lp__plus__plus__1_rp_($std_core.head_3(s), $std_core._lp__plus__plus__1_rp_(_x82, exponent0)));
}
 
 
/* Show a decimal `d` with a given precision `prec` (=`-1000`) in fixed-point notation.
The precision specifies the  number of digits after the dot.
If the precision is negative, _at most_  `prec` digits after the dot are displayed,
while for a positive precision, exactly `prec` digits are used.
```
> decimal(1,-1).show-fixed
"0.1"
> 0.1.decimal.show-fixed
"0.1000000000000000055511151231257827021181583404541015625"
> 0.1.decimal.show-fixed(20)
"0.1000000000000000555"
> 0.1.decimal.show-fixed(-20)
"0.1000000000000000555"
> decimal(1,-1).show-fixed(20)
"0.1000000000000000000"
```
.
*/
export function show_fixed(d, prec) /* (d : decimal, prec : optional<int>) -> string */  {
   
  var _x83 = (prec !== undefined) ? prec : -1000;
  var x = round_to_prec(d, $std_core._int_abs(_x83));
  var _x84 = x.exp;
  var _x83 = $std_core._int_ge(_x84,0);
  if (_x83) {
     
    var _x86 = (prec !== undefined) ? prec : -1000;
    var _x85 = $std_core._int_le(_x86,0);
    if (_x85) {
      var frac = "";
    }
    else {
      var _x87 = (prec !== undefined) ? prec : -1000;
      var frac = $std_core._lp__plus__plus__1_rp_(".", $std_core.repeatz("0", $std_core.ssize__t(_x87)));
    }
    var _x85 = x.num;
    var _x86 = x.exp;
    return $std_core._lp__plus__plus__1_rp_($std_core.show(_x85), $std_core._lp__plus__plus__1_rp_($std_core.repeatz("0", $std_core.ssize__t(_x86)), frac));
  }
  else {
     
    var _x87 = x.exp;
    var digits = $std_core._int_negate(_x87);
     
    var _x88 = x.num;
    var x_17067 = $std_core._int_sign(_x88);
     
    if (x_17067 === 1) {
      var _x90 = -1;
    }
    else if (x_17067 === 2) {
      var _x90 = 0;
    }
    else {
      var _x90 = 1;
    }
    var _x89 = $std_core._int_eq(_x90,(-1));
    var sign0 = (_x89) ? "-" : "";
     
    var _x91 = x.num;
    var i = $std_core._int_abs(_x91);
     
    var man = $std_core.cdiv_exp10(i, digits);
     
    var y_4197 = $std_core.mul_exp10(man, digits);
     
    var frac0 = $std_core._int_sub(i,y_4197);
     
    var frac1_4215 = $std_core.pad_left($std_core.show(frac0), digits, 0x0030);
     
    var frac_trim = $std_core.trim_right_1(frac1_4215, "0");
     
    var _x93 = (prec !== undefined) ? prec : -1000;
    var _x92 = $std_core._int_ge(_x93,0);
    if (_x92) {
      var _x94 = (prec !== undefined) ? prec : -1000;
      var frac_full = $std_core.pad_right(frac_trim, _x94, 0x0030);
    }
    else {
      var frac_full = frac_trim;
    }
    if ((frac_full === (""))) {
      var _x87 = "";
    }
    else {
      var _x87 = $std_core._lp__plus__plus__1_rp_(".", frac_full);
    }
    return $std_core._lp__plus__plus__1_rp_(sign0, $std_core._lp__plus__plus__1_rp_($std_core.show(man), _x87));
  }
}
 
 
// Show a decimal `d` with a given precision `prec` (=`-1000`).
// The precision specifies the  number of digits after the dot (in either scientific of fixed-point notation).
// If the precision is negative, _at most_ `prec` digits are displayed, while for a positive
// precision, exactly `prec` digits behind the dot are displayed.
// This uses `show-fixed` when the exponent of `d` in scientific notation is larger than -5
// and smaller than the precision (or 15 in case of a negative precision), otherwise it uses `show-exp`.
export function show(d, prec) /* (d : decimal, prec : optional<int>) -> string */  {
   
  var _x88 = d.num;
  var x0_4125 = $std_core.count_digits(_x88);
   
  var _x89 = d.exp;
  var x_4123 = $std_core._int_add(x0_4125,_x89);
   
  var exp0 = $std_core._int_sub(x_4123,1);
  if ($std_core._int_gt(exp0,(-5))) {
     
    var _x88 = (prec !== undefined) ? prec : -1000;
    var x_17067 = $std_core._int_sign(_x88);
    if (x_17067 === 1) {
      var _x91 = -1;
    }
    else if (x_17067 === 2) {
      var _x91 = 0;
    }
    else {
      var _x91 = 1;
    }
    var _x90 = $std_core._int_eq(_x91,(-1));
    if (_x90) {
      var _x89 = 15;
    }
    else {
      var _x89 = (prec !== undefined) ? prec : -1000;
    }
    var _x88 = $std_core._int_lt(exp0,_x89);
    if (_x88) {
      var _x92 = (prec !== undefined) ? prec : -1000;
      return show_fixed(d, _x92);
    }
    else {
      var _x93 = (prec !== undefined) ? prec : -1000;
      return show_exp(d, _x93);
    }
  }
  else {
    var _x94 = (prec !== undefined) ? prec : -1000;
    return show_exp(d, _x94);
  }
}
 
 
// Show a decimal `d` using its internal representation.
export function show_raw(d) /* (d : decimal) -> string */  {
  var _x95 = d.num;
  var _x96 = d.exp;
  return $std_core._lp__plus__plus__1_rp_($std_core.show(_x95), $std_core._lp__plus__plus__1_rp_("e", $std_core.show(_x96)));
}
 
 
// Take the sum of a list of decimal numbers (0 for the empty list).
export function sum(ds) /* (ds : list<decimal>) -> decimal */  {
  return $std_core.foldr(ds, zero, _lp__plus__rp_);
}