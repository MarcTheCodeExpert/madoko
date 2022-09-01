// Koka generated module: "std/num/ddouble", koka version: 2.4.0
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
import * as $std_num_float64 from './std_num_float64.mjs';
import * as $std_num_decimal from './std_num_decimal.mjs';
 
// externals
 
// type declarations
// type ddouble
export function Ddouble(hi, lo) /* (hi : float64, lo : float64) -> ddouble */  {
  return { hi: hi, lo: lo };
}
// type edouble
export function Edouble(num, err) /* (num : float64, err : float64) -> edouble */  {
  return { num: num, err: err };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `hi` constructor field of the `:ddouble` type.
export function hi(ddouble0) /* (ddouble : ddouble) -> float64 */  {
  return ddouble0.hi;
}
 
 
// Automatically generated. Retrieves the `lo` constructor field of the `:ddouble` type.
export function lo(ddouble0) /* (ddouble : ddouble) -> float64 */  {
  return ddouble0.lo;
}
 
export function _copy(_this, hi0, lo0) /* (ddouble, hi : optional<float64>, lo : optional<float64>) -> ddouble */  {
  if (hi0 !== undefined) {
    var _x0 = hi0;
  }
  else {
    var _x0 = _this.hi;
  }
  if (lo0 !== undefined) {
    var _x1 = lo0;
  }
  else {
    var _x1 = _this.lo;
  }
  return Ddouble(_x0, _x1);
}
 
 
// Automatically generated. Retrieves the `num` constructor field of the `:edouble` type.
export function num(edouble) /* (edouble : edouble) -> float64 */  {
  return edouble.num;
}
 
 
// Automatically generated. Retrieves the `err` constructor field of the `:edouble` type.
export function err(edouble) /* (edouble : edouble) -> float64 */  {
  return edouble.err;
}
 
export function _copy_1(_this, num0, err0) /* (edouble, num : optional<float64>, err : optional<float64>) -> edouble */  {
  if (num0 !== undefined) {
    var _x2 = num0;
  }
  else {
    var _x2 = _this.num;
  }
  if (err0 !== undefined) {
    var _x3 = err0;
  }
  else {
    var _x3 = _this.err;
  }
  return Edouble(_x2, _x3);
}
 
export var maxprecise;
var maxprecise = $std_core._int_const(9007199254740991n);
 
 
// Convert a `:ddouble` to a `:float64` (losing precision)
export function float64(x) /* (x : ddouble) -> float64 */  {
  return x.hi;
}
 
export var dd_default_prec;
var dd_default_prec = -31;
 
 
// maximal precision in decimal digits of a `:ddouble`.
export var dd_max_prec;
var dd_max_prec = 31;
 
 
// Decode a `:ddouble` `d` into two doubles `(hi,lo)` such that `d` equals  `hi`+`lo`,
// where `lo` &le; 0.5&middot;ulp(`hi`).
export function decode(d) /* (d : ddouble) -> (float64, float64) */  {
  var _x4 = d.hi;
  var _x5 = d.lo;
  return $std_core_types._Tuple2_(_x4, _x5);
}
 
 
// Compare two `:ddouble` values.
export function compare(x, y) /* (x : ddouble, y : ddouble) -> order */  {
  var _x7 = x.hi;
  var _x8 = y.hi;
  var _x6 = $std_num_float64.compare(_x7, _x8);
  if (_x6 === 2) {
    var _x9 = x.lo;
    var _x10 = y.lo;
    return $std_num_float64.compare(_x9, _x10);
  }
  else {
    return _x6;
  }
}
 
export function _lp__excl__eq__rp_(x, y) /* (x : ddouble, y : ddouble) -> bool */  {
  var _x13 = x.hi;
  var _x14 = y.hi;
  var _x12 = $std_num_float64.compare(_x13, _x14);
  if (_x12 === 2) {
    var _x15 = x.lo;
    var _x16 = y.lo;
    var _x11 = $std_num_float64.compare(_x15, _x16);
  }
  else {
    var _x11 = _x12;
  }
  return $std_core._lp__excl__eq__4_rp_(_x11, $std_core_types.Eq);
}
 
export function _lp__lt__eq__rp_(x, y) /* (x : ddouble, y : ddouble) -> bool */  {
  var _x19 = x.hi;
  var _x20 = y.hi;
  var _x18 = $std_num_float64.compare(_x19, _x20);
  if (_x18 === 2) {
    var _x21 = x.lo;
    var _x22 = y.lo;
    var _x17 = $std_num_float64.compare(_x21, _x22);
  }
  else {
    var _x17 = _x18;
  }
  return $std_core._lp__excl__eq__4_rp_(_x17, $std_core_types.Gt);
}
 
export function _lp__gt__eq__rp_(x, y) /* (x : ddouble, y : ddouble) -> bool */  {
  var _x25 = x.hi;
  var _x26 = y.hi;
  var _x24 = $std_num_float64.compare(_x25, _x26);
  if (_x24 === 2) {
    var _x27 = x.lo;
    var _x28 = y.lo;
    var _x23 = $std_num_float64.compare(_x27, _x28);
  }
  else {
    var _x23 = _x24;
  }
  return $std_core._lp__excl__eq__4_rp_(_x23, $std_core_types.Lt);
}
 
 
// Is this `:ddouble` equal to is-zero
export function is_zero(x) /* (x : ddouble) -> bool */  {
  var _x29 = x.hi;
  return (_x29 === (0.0));
}
 
 
// Is this a finite `:ddouble`? (i.e. not `is-nan` or `is-inf`)
export function is_finite(x) /* (x : ddouble) -> bool */  {
  var _x31 = x.hi;
  var _x30 = isFinite(_x31);
  if (_x30) {
    var _x32 = x.lo;
    return isFinite(_x32);
  }
  else {
    return false;
  }
}
 
 
// Is this `:ddouble` negative?
export function is_neg(x) /* (x : ddouble) -> bool */  {
  var _x33 = x.hi;
  return (_x33 < (0.0));
}
 
export function _lp__eq__eq__rp_(x, y) /* (x : ddouble, y : ddouble) -> bool */  {
  var _x36 = x.hi;
  var _x37 = y.hi;
  var _x35 = $std_num_float64.compare(_x36, _x37);
  if (_x35 === 2) {
    var _x38 = x.lo;
    var _x39 = y.lo;
    var _x34 = $std_num_float64.compare(_x38, _x39);
  }
  else {
    var _x34 = _x35;
  }
  return $std_core._lp__eq__eq__4_rp_(_x34, $std_core_types.Eq);
}
 
 
// Create a `:ddouble` from a `:float64`.
export function ddouble(d) /* (d : float64) -> ddouble */  {
  return Ddouble(d, 0.0);
}
 
export function dquicksum(x, y) /* (x : float64, y : float64) -> ddouble */  {
   
  var b_12694 = isFinite(x);
  if (b_12694) {
     
    var z = (x + y);
     
    var err0 = (y - ((z - x)));
    var _x40 = (isFinite(z)) ? err0 : z;
    return Ddouble(z, _x40);
  }
  else {
    return Ddouble(x, 0.0);
  }
}
 
 
// often called `twoproduct` in literature (see [@shewchuk])
export function prod(x, y) /* (x : float64, y : float64) -> edouble */  {
   
  var z = (x * y);
   
  var err0 = $std_num_float64.fmadd(x, y, (-z));
  return Edouble(z, err0);
}
 
 
// Multiply two `:ddouble`s
export function _lp__star__rp_(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
   
  var _x41 = x.hi;
  var _x42 = y.hi;
  var z = (_x41 * _x42);
   
  var _x43 = x.hi;
  var _x44 = y.hi;
  var err0 = $std_num_float64.fmadd(_x43, _x44, (-z));
   
  var z0 = Edouble(z, err0);
   
  var _x45 = z0.err;
  var _x46 = x.hi;
  var _x47 = y.lo;
  var _x48 = x.lo;
  var _x49 = y.hi;
  var e = (_x45 + ((((_x46 * _x47)) + ((_x48 * _x49)))));
  var _x41 = z0.num;
  return dquicksum(_x41, e);
}
 
 
// As `sum` but with `x.abs >= y.abs`
export function quicksum(x, y) /* (x : float64, y : float64) -> edouble */  {
   
  var z = (x + y);
   
  var err0 = (y - ((z - x)));
  var _x42 = (isFinite(z)) ? err0 : z;
  return Edouble(z, _x42);
}
 
 
// often called `twosum` in literature (see [@shewchuk])
export function sum(x, y) /* (x : float64, y : float64) -> edouble */  {
   
  var z = (x + y);
   
  var diff = (z - x);
   
  var err0 = (((x - ((z - diff)))) + ((y - diff)));
  var _x43 = (isFinite(z)) ? err0 : z;
  return Edouble(z, _x43);
}
 
 
// Add two `:ddouble`s
export function _lp__plus__rp_(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
   
  var _x44 = x.hi;
  var _x45 = y.hi;
  var z1 = sum(_x44, _x45);
   
  var _x46 = x.lo;
  var _x47 = y.lo;
  var lo0 = sum(_x46, _x47);
   
  var _x48 = z1.err;
  var _x49 = lo0.num;
  var e1 = (_x48 + _x49);
   
  var _x50 = z1.num;
  var z = (_x50 + e1);
   
  var _x51 = z1.num;
  var err0 = (e1 - ((z - _x51)));
   
  var _x52 = (isFinite(z)) ? err0 : z;
  var z2 = Edouble(z, _x52);
   
  var _x53 = z2.err;
  var _x54 = lo0.err;
  var e2 = (_x53 + _x54);
  var _x44 = z2.num;
  return dquicksum(_x44, e2);
}
 
 
// Negate a `:ddouble`.
export function _lp__tilde__rp_(x) /* (x : ddouble) -> ddouble */  {
  var _x45 = x.hi;
  var _x46 = x.lo;
  return Ddouble((-_x45), (-_x46));
}
 
 
// Subtract two values.
export function _lp__dash__rp_(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
  var _x47 = y.hi;
  var _x48 = y.lo;
  return _lp__plus__rp_(x, Ddouble((-_x47), (-_x48)));
}
 
 
// Divide two `:ddouble`s
export function _lp__fs__rp_(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
   
  var _x49 = x.hi;
  var _x50 = y.hi;
  var d_12720 = (_x49 / _x50);
   
  var q1 = Ddouble(d_12720, 0.0);
   
  var _x52 = q1.hi;
  var _x51 = isFinite(_x52);
  if (_x51) {
    var _x53 = q1.lo;
    var b_12723 = isFinite(_x53);
  }
  else {
    var b_12723 = false;
  }
  if (b_12723) {
     
    var _x49 = y.hi;
    var b0_12724 = isFinite(_x49);
    if (b0_12724) {
       
      var y0_12727 = _lp__star__rp_(y, q1);
       
      var _x49 = y0_12727.hi;
      var _x50 = y0_12727.lo;
      var r1 = _lp__plus__rp_(x, Ddouble((-_x49), (-_x50)));
       
      var _x51 = r1.hi;
      var _x52 = y.hi;
      var d0_12728 = (_x51 / _x52);
       
      var q2 = Ddouble(d0_12728, 0.0);
       
      var y1_12732 = _lp__star__rp_(y, q2);
       
      var _x53 = y1_12732.hi;
      var _x54 = y1_12732.lo;
      var r2 = _lp__plus__rp_(r1, Ddouble((-_x53), (-_x54)));
       
      var _x55 = r2.hi;
      var _x56 = y.hi;
      var d1_12733 = (_x55 / _x56);
       
      var _x57 = q1.hi;
      var _x58 = q2.hi;
      var q = dquicksum(_x57, _x58);
      return _lp__plus__rp_(q, Ddouble(d1_12733, 0.0));
    }
    else {
      return q1;
    }
  }
  else {
    return q1;
  }
}
 
 
// Return the absolute value.
export function abs(x) /* (x : ddouble) -> ddouble */  {
  var _x50 = x.hi;
  var _x49 = (_x50 < (0.0));
  if (_x49) {
    var _x51 = x.hi;
    var _x52 = x.lo;
    return Ddouble((-_x51), (-_x52));
  }
  else {
    return x;
  }
}
 
 
// Not-A-Number
export var dd_nan;
var dd_nan = Ddouble($std_num_float64.nan, 0.0);
 
export var minprecise;
var minprecise = $std_core._int_negate(($std_core._int_const(9007199254740991n)));
 
export function is_precise(i) /* (i : int) -> bool */  {
  return ($std_core._int_ge(i,minprecise)) ? $std_core._int_le(i,($std_core._int_const(9007199254740991n))) : false;
}
 
export function prodsqr(x) /* (x : float64) -> edouble */  {
   
  var z = (x * x);
   
  var err0 = $std_num_float64.fmadd(x, x, (-z));
  return Edouble(z, err0);
}
 
 
// Multiply `x` with itself.
export function sqr(x) /* (x : ddouble) -> ddouble */  {
   
  var _x53 = x.hi;
  var _x54 = x.hi;
  var z = (_x53 * _x54);
   
  var _x55 = x.hi;
  var _x56 = x.hi;
  var err0 = $std_num_float64.fmadd(_x55, _x56, (-z));
   
  var z0 = Edouble(z, err0);
   
  var _x57 = z0.err;
  var _x58 = x.hi;
  var _x59 = x.lo;
  var _x60 = x.lo;
  var _x61 = x.lo;
  var e = (((_x57 + (((((2.0) * _x58)) * _x59)))) + ((_x60 * _x61)));
  var _x53 = z0.num;
  return dquicksum(_x53, e);
}
 
export function npwr_acc(x, acc, n) /* (x : ddouble, acc : ddouble, n : int) -> ddouble */  { tailcall: while(1)
{
  if ($std_core._int_le(n,0)) {
    return acc;
  }
  else {
     
    var b_16946 = $std_core._int_isodd(n);
    if (b_16946) {
      {
        // tail call
        var _x54 = _lp__star__rp_(x, acc);
        var _x55 = $std_core._int_sub(n,1);
        acc = _x54;
        n = _x55;
        continue tailcall;
      }
    }
    else {
      {
        // tail call
        var _x56 = sqr(x);
        var _x57 = $std_core._int_div(n,2);
        x = _x56;
        n = _x57;
        continue tailcall;
      }
    }
  }
}}
 
 
// One
export var one;
var one = Ddouble(1.0, 0.0);
 
export function npwr(x, n) /* (x : ddouble, n : int) -> ddouble */  {
  if ($std_core._int_eq(n,0)) {
    var _x59 = x.hi;
    var _x58 = (_x59 === (0.0));
    return (_x58) ? dd_nan : one;
  }
  else {
    if ($std_core._int_eq(n,1)) {
      return x;
    }
    else {
      return npwr_acc(x, one, n);
    }
  }
}
 
 
// Return `x` to the power of `n`.
export function powi(x, n) /* (x : ddouble, n : int) -> ddouble */  {
   
  var n0_13269 = $std_core._int_abs(n);
   
  if ($std_core._int_eq(n0_13269,0)) {
    var _x61 = x.hi;
    var _x60 = (_x61 === (0.0));
    var p = (_x60) ? dd_nan : one;
  }
  else {
    if ($std_core._int_eq(n0_13269,1)) {
      var p = x;
    }
    else {
      var p = npwr_acc(x, one, n0_13269);
    }
  }
   
  var x_17067 = $std_core._int_sign(n);
  if (x_17067 === 1) {
    var _x61 = -1;
  }
  else if (x_17067 === 2) {
    var _x61 = 0;
  }
  else {
    var _x61 = 1;
  }
  var _x60 = $std_core._int_eq(_x61,(-1));
  if (_x60) {
    return _lp__fs__rp_(one, p);
  }
  else {
    return p;
  }
}
 
 
// Ten (`10.ddouble`)
export var ten;
var ten = Ddouble(10.0, 0.0);
 
 
// Return 10 to the power of `exp`.
export function powi10(exp0) /* (exp : int) -> ddouble */  {
  return powi(ten, exp0);
}
 
export function mul_exp10(x, exp0) /* (x : ddouble, exp : int) -> ddouble */  {
  if ($std_core._int_iszero(exp0)) {
    return x;
  }
  else {
    return _lp__star__rp_(x, powi(ten, exp0));
  }
}
 
export function small_exp(i, e) /* (i : int, e : int) -> ddouble */  {
   
  var d_12758 = $std_core._int_to_double(i);
   
  var dd = Ddouble(d_12758, 0.0);
  if ($std_core._int_iszero(e)) {
    return dd;
  }
  else {
    if ($std_core._int_iszero(e)) {
      return dd;
    }
    else {
      return _lp__star__rp_(dd, powi(ten, e));
    }
  }
}
 
export function ddouble_int_exp(i, e) /* (i : int, e : int) -> ddouble */  {
  if ($std_core._int_ge(i,minprecise)) {
    if ($std_core._int_le(i,($std_core._int_const(9007199254740991n)))) {
      return small_exp(i, e);
    }
    else {
       
      var p = $std_core.count_digits(i);
       
      var px = $std_core._int_sub(p,14);
      var _x62 = $std_core.cdivmod_exp10(i, px);
       
      var py = $std_core._int_sub(px,14);
      if ($std_core._int_le(py,0)) {
         
        var e0_12765 = $std_core._int_add(px,e);
         
        var d_12768 = $std_core._int_to_double((_x62.fst));
         
        var dd = Ddouble(d_12768, 0.0);
        if ($std_core._int_iszero(e0_12765)) {
          var _x63 = dd;
        }
        else {
          if ($std_core._int_iszero(e0_12765)) {
            var _x63 = dd;
          }
          else {
            var _x63 = _lp__star__rp_(dd, powi(ten, e0_12765));
          }
        }
        return _lp__plus__rp_(_x63, small_exp(_x62.snd, e));
      }
      else {
        var _x64 = $std_core.cdivmod_exp10(_x62.snd, py);
         
        var pz = $std_core._int_sub(py,14);
        if ($std_core._int_le(pz,0)) {
           
          var e1_12772 = $std_core._int_add(px,e);
           
          var d0_12775 = $std_core._int_to_double((_x62.fst));
           
          var dd0 = Ddouble(d0_12775, 0.0);
           
          var e2_12777 = $std_core._int_add(py,e);
           
          var d1_12780 = $std_core._int_to_double((_x64.fst));
           
          var dd1 = Ddouble(d1_12780, 0.0);
           
          var e3_12782 = $std_core._int_add(0,e);
           
          var d2_12785 = $std_core._int_to_double((_x64.snd));
           
          var dd2 = Ddouble(d2_12785, 0.0);
          if ($std_core._int_iszero(e1_12772)) {
            var _x65 = dd0;
          }
          else {
            if ($std_core._int_iszero(e1_12772)) {
              var _x65 = dd0;
            }
            else {
              var _x65 = _lp__star__rp_(dd0, powi(ten, e1_12772));
            }
          }
          if ($std_core._int_iszero(e2_12777)) {
            var _x66 = dd1;
          }
          else {
            if ($std_core._int_iszero(e2_12777)) {
              var _x66 = dd1;
            }
            else {
              var _x66 = _lp__star__rp_(dd1, powi(ten, e2_12777));
            }
          }
          if ($std_core._int_iszero(e3_12782)) {
            var _x67 = dd2;
          }
          else {
            if ($std_core._int_iszero(e3_12782)) {
              var _x67 = dd2;
            }
            else {
              var _x67 = _lp__star__rp_(dd2, powi(ten, e3_12782));
            }
          }
          return _lp__plus__rp_(_x65, _lp__plus__rp_(_x66, _x67));
        }
        else {
           
          var lo0 = $std_core.cdiv_exp10(_x64.snd, pz);
           
          var e4_12787 = $std_core._int_add(px,e);
           
          var d3_12790 = $std_core._int_to_double((_x62.fst));
           
          var dd3 = Ddouble(d3_12790, 0.0);
           
          var e5_12792 = $std_core._int_add(py,e);
           
          var d4_12795 = $std_core._int_to_double((_x64.fst));
           
          var dd4 = Ddouble(d4_12795, 0.0);
           
          var e6_12797 = $std_core._int_add(pz,e);
           
          var d5_12800 = $std_core._int_to_double(lo0);
           
          var dd5 = Ddouble(d5_12800, 0.0);
          if ($std_core._int_iszero(e4_12787)) {
            var _x68 = dd3;
          }
          else {
            if ($std_core._int_iszero(e4_12787)) {
              var _x68 = dd3;
            }
            else {
              var _x68 = _lp__star__rp_(dd3, powi(ten, e4_12787));
            }
          }
          if ($std_core._int_iszero(e5_12792)) {
            var _x69 = dd4;
          }
          else {
            if ($std_core._int_iszero(e5_12792)) {
              var _x69 = dd4;
            }
            else {
              var _x69 = _lp__star__rp_(dd4, powi(ten, e5_12792));
            }
          }
          if ($std_core._int_iszero(e6_12797)) {
            var _x70 = dd5;
          }
          else {
            if ($std_core._int_iszero(e6_12797)) {
              var _x70 = dd5;
            }
            else {
              var _x70 = _lp__star__rp_(dd5, powi(ten, e6_12797));
            }
          }
          return _lp__plus__rp_(_x68, _lp__plus__rp_(_x69, _x70));
        }
      }
    }
  }
  else {
     
    var p0 = $std_core.count_digits(i);
     
    var px0 = $std_core._int_sub(p0,14);
    var _x71 = $std_core.cdivmod_exp10(i, px0);
     
    var py0 = $std_core._int_sub(px0,14);
    if ($std_core._int_le(py0,0)) {
       
      var e0_127650 = $std_core._int_add(px0,e);
       
      var d_127680 = $std_core._int_to_double((_x71.fst));
       
      var dd6 = Ddouble(d_127680, 0.0);
      if ($std_core._int_iszero(e0_127650)) {
        var _x72 = dd6;
      }
      else {
        if ($std_core._int_iszero(e0_127650)) {
          var _x72 = dd6;
        }
        else {
          var _x72 = _lp__star__rp_(dd6, powi(ten, e0_127650));
        }
      }
      return _lp__plus__rp_(_x72, small_exp(_x71.snd, e));
    }
    else {
      var _x73 = $std_core.cdivmod_exp10(_x71.snd, py0);
       
      var pz0 = $std_core._int_sub(py0,14);
      if ($std_core._int_le(pz0,0)) {
         
        var e1_127720 = $std_core._int_add(px0,e);
         
        var d0_127750 = $std_core._int_to_double((_x71.fst));
         
        var dd00 = Ddouble(d0_127750, 0.0);
         
        var e2_127770 = $std_core._int_add(py0,e);
         
        var d1_127800 = $std_core._int_to_double((_x73.fst));
         
        var dd10 = Ddouble(d1_127800, 0.0);
         
        var e3_127820 = $std_core._int_add(0,e);
         
        var d2_127850 = $std_core._int_to_double((_x73.snd));
         
        var dd20 = Ddouble(d2_127850, 0.0);
        if ($std_core._int_iszero(e1_127720)) {
          var _x74 = dd00;
        }
        else {
          if ($std_core._int_iszero(e1_127720)) {
            var _x74 = dd00;
          }
          else {
            var _x74 = _lp__star__rp_(dd00, powi(ten, e1_127720));
          }
        }
        if ($std_core._int_iszero(e2_127770)) {
          var _x75 = dd10;
        }
        else {
          if ($std_core._int_iszero(e2_127770)) {
            var _x75 = dd10;
          }
          else {
            var _x75 = _lp__star__rp_(dd10, powi(ten, e2_127770));
          }
        }
        if ($std_core._int_iszero(e3_127820)) {
          var _x76 = dd20;
        }
        else {
          if ($std_core._int_iszero(e3_127820)) {
            var _x76 = dd20;
          }
          else {
            var _x76 = _lp__star__rp_(dd20, powi(ten, e3_127820));
          }
        }
        return _lp__plus__rp_(_x74, _lp__plus__rp_(_x75, _x76));
      }
      else {
         
        var lo00 = $std_core.cdiv_exp10(_x73.snd, pz0);
         
        var e4_127870 = $std_core._int_add(px0,e);
         
        var d3_127900 = $std_core._int_to_double((_x71.fst));
         
        var dd30 = Ddouble(d3_127900, 0.0);
         
        var e5_127920 = $std_core._int_add(py0,e);
         
        var d4_127950 = $std_core._int_to_double((_x73.fst));
         
        var dd40 = Ddouble(d4_127950, 0.0);
         
        var e6_127970 = $std_core._int_add(pz0,e);
         
        var d5_128000 = $std_core._int_to_double(lo00);
         
        var dd50 = Ddouble(d5_128000, 0.0);
        if ($std_core._int_iszero(e4_127870)) {
          var _x77 = dd30;
        }
        else {
          if ($std_core._int_iszero(e4_127870)) {
            var _x77 = dd30;
          }
          else {
            var _x77 = _lp__star__rp_(dd30, powi(ten, e4_127870));
          }
        }
        if ($std_core._int_iszero(e5_127920)) {
          var _x78 = dd40;
        }
        else {
          if ($std_core._int_iszero(e5_127920)) {
            var _x78 = dd40;
          }
          else {
            var _x78 = _lp__star__rp_(dd40, powi(ten, e5_127920));
          }
        }
        if ($std_core._int_iszero(e6_127970)) {
          var _x79 = dd50;
        }
        else {
          if ($std_core._int_iszero(e6_127970)) {
            var _x79 = dd50;
          }
          else {
            var _x79 = _lp__star__rp_(dd50, powi(ten, e6_127970));
          }
        }
        return _lp__plus__rp_(_x77, _lp__plus__rp_(_x78, _x79));
      }
    }
  }
}
 
 
// Create a `:ddouble` from an `:int`.
// A `:ddouble` can represent integers precisely up to 30 digits.
// If an integer is passed that is out of range an infinity is returned.
export function ddouble_1(i) /* (i : int) -> ddouble */  {
  return ddouble_int_exp(i, 0);
}
 
 
// monadic lift
export function _mlift13469_pddouble_normal(wild__0) /* (wild_0 : char) -> std/text/parse/parse int */  {
  return $std_text_parse.pint();
}
 
 
// monadic lift
export function _mlift13470_pddouble_normal(frac, neg, whole, exp0) /* (frac : string, neg : bool, whole : string, exp0 : int) -> std/text/parse/parse ddouble */  {
   
  var _x80 = (neg) ? "-" : "";
  var _x1_13462 = $std_core._lp__plus__plus__1_rp_(_x80, $std_core._lp__plus__plus__1_rp_(whole, frac));
   
  var w = $std_core.$default($std_core_hnd._open_none2(function(s /* string */ , hex /* optional<bool> */ ) {
        var _x81 = (hex !== undefined) ? hex : false;
        return $std_core.xparse_int((((((s).replace(/^\s\s*/,'')))).replace(/\s+$/,'')), _x81);
      }, _x1_13462), 0);
   
  var y_13455 = $std_core.count_1(frac);
   
  var e = $std_core._int_sub(exp0,y_13455);
  return $std_core_hnd._open_none2(ddouble_int_exp, w, e);
}
 
 
// monadic lift
export function _mlift13471_pddouble_normal(wild__) /* (wild_ : char) -> std/text/parse/parse string */  {
  return $std_text_parse.digits();
}
 
 
// monadic lift
export function _mlift13472_pddouble_normal(neg, whole, _y_13442) /* (neg : bool, whole : string, string) -> std/text/parse/parse ddouble */  {
   
  var frac = $std_core.trim_right_1(_y_13442, "0");
   
  var x_13480 = $std_text_parse._lp__bar__bar__rp_(function() {
       
      var x0_13482 = $std_text_parse.char(0x0065);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift13469_pddouble_normal);
      }
      else {
        return $std_text_parse.pint();
      }
    }, function() {
      return 0;
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(exp0 /* int */ ) {
      return _mlift13470_pddouble_normal(frac, neg, whole, exp0);
    });
  }
  else {
    return _mlift13470_pddouble_normal(frac, neg, whole, x_13480);
  }
}
 
 
// monadic lift
export function _mlift13473_pddouble_normal(neg, whole) /* (neg : bool, whole : string) -> std/text/parse/parse ddouble */  {
   
  var x_13484 = $std_text_parse._lp__bar__bar__rp_(function() {
       
      var x0_13486 = $std_text_parse.char(0x002E);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift13471_pddouble_normal);
      }
      else {
        return $std_text_parse.digits();
      }
    }, function() {
      return "";
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_13442 /* string */ ) {
      return _mlift13472_pddouble_normal(neg, whole, _y_13442);
    });
  }
  else {
    return _mlift13472_pddouble_normal(neg, whole, x_13484);
  }
}
 
 
// monadic lift
export function _mlift13474_pddouble_normal(neg) /* (neg : bool) -> std/text/parse/parse ddouble */  {
   
  var x_13488 = $std_text_parse.digits();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(whole /* string */ ) {
      return _mlift13473_pddouble_normal(neg, whole);
    });
  }
  else {
    return _mlift13473_pddouble_normal(neg, x_13488);
  }
}
 
export function pddouble_normal() /* () -> std/text/parse/parse ddouble */  {
   
  var x_13490 = $std_text_parse.sign();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift13474_pddouble_normal);
  }
  else {
     
    var x0_13493 = $std_text_parse.digits();
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(whole /* string */ ) {
        return _mlift13473_pddouble_normal(x_13490, whole);
      });
    }
    else {
       
      var x1_13496 = $std_text_parse._lp__bar__bar__rp_(function() {
           
          var x2_13499 = $std_text_parse.char(0x002E);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(_mlift13471_pddouble_normal);
          }
          else {
            return $std_text_parse.digits();
          }
        }, function() {
          return "";
        });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_13442 /* string */ ) {
          return _mlift13472_pddouble_normal(x_13490, x0_13493, _y_13442);
        });
      }
      else {
         
        var frac = $std_core.trim_right_1(x1_13496, "0");
         
        var x3_13501 = $std_text_parse._lp__bar__bar__rp_(function() {
             
            var x4_13504 = $std_text_parse.char(0x0065);
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(_mlift13469_pddouble_normal);
            }
            else {
              return $std_text_parse.pint();
            }
          }, function() {
            return 0;
          });
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(exp0 /* int */ ) {
            return _mlift13470_pddouble_normal(frac, x_13490, x0_13493, exp0);
          });
        }
        else {
           
          var _x80 = (x_13490) ? "-" : "";
          var _x1_13462 = $std_core._lp__plus__plus__1_rp_(_x80, $std_core._lp__plus__plus__1_rp_(x0_13493, frac));
           
          var w = $std_core.$default($std_core_hnd._open_none2(function(s /* string */ , hex /* optional<bool> */ ) {
                var _x81 = (hex !== undefined) ? hex : false;
                return $std_core.xparse_int((((((s).replace(/^\s\s*/,'')))).replace(/\s+$/,'')), _x81);
              }, _x1_13462), 0);
           
          var y_13455 = $std_core.count_1(frac);
           
          var e = $std_core._int_sub(x3_13501,y_13455);
          return $std_core_hnd._open_none2(ddouble_int_exp, w, e);
        }
      }
    }
  }
}
 
 
// monadic lift
export function _mlift13475_pddouble_sum(hi0, lo0) /* (hi0 : float64, lo0 : float64) -> std/text/parse/parse ddouble */  {
  return $std_core_hnd._open_none2(_lp__plus__rp_, Ddouble(hi0, 0.0), Ddouble(lo0, 0.0));
}
 
 
// monadic lift
export function _mlift13476_pddouble_sum(hi0, wild__0) /* (hi0 : float64, wild_0 : string) -> std/text/parse/parse ddouble */  {
   
  var x_13506 = $std_num_float64.pdouble();
   
  function next_13507(lo0) /* (float64) -> std/text/parse/parse ddouble */  {
    return $std_core_hnd._open_none2(_lp__plus__rp_, Ddouble(hi0, 0.0), Ddouble(lo0, 0.0));
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_13507);
  }
  else {
    return next_13507(x_13506);
  }
}
 
 
// monadic lift
export function _mlift13477_pddouble_sum(hi0) /* (hi0 : float64) -> std/text/parse/parse ddouble */  {
   
  var _x1_13466 = isFinite(hi0);
  var _x80 = $std_core_hnd._open_none1(function(b /* bool */ ) {
      return (b) ? false : true;
    }, _x1_13466);
  if (_x80) {
    return Ddouble(hi0, 0.0);
  }
  else {
     
    var x_13510 = $std_text_parse.pstring(" + ");
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild__0 /* string */ ) {
        return _mlift13476_pddouble_sum(hi0, wild__0);
      });
    }
    else {
      return _mlift13476_pddouble_sum(hi0, x_13510);
    }
  }
}
 
export function pddouble_sum() /* () -> std/text/parse/parse ddouble */  {
   
  var x_13512 = $std_num_float64.pdouble();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift13477_pddouble_sum);
  }
  else {
     
    var _x1_13466 = isFinite(x_13512);
    var _x81 = $std_core_hnd._open_none1(function(b /* bool */ ) {
        return (b) ? false : true;
      }, _x1_13466);
    if (_x81) {
      return Ddouble(x_13512, 0.0);
    }
    else {
       
      var x0_13515 = $std_text_parse.pstring(" + ");
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(wild__0 /* string */ ) {
          return _mlift13476_pddouble_sum(x_13512, wild__0);
        });
      }
      else {
         
        var x1_13518 = $std_num_float64.pdouble();
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(lo0 /* float64 */ ) {
            return $std_core_hnd._open_none2(_lp__plus__rp_, Ddouble(x_13512, 0.0), Ddouble(lo0, 0.0));
          });
        }
        else {
          return $std_core_hnd._open_none2(_lp__plus__rp_, Ddouble(x_13512, 0.0), Ddouble(x1_13518, 0.0));
        }
      }
    }
  }
}
 
export function pddouble() /* () -> std/text/parse/parse ddouble */  {
  return $std_text_parse._lp__bar__bar__rp_(pddouble_sum, pddouble_normal);
}
 
 
// monadic lift
export function _mlift13478_parse_ddouble(x, wild__) /* (x : ddouble, wild_ : ()) -> std/text/parse/parse ddouble */  {
  return x;
}
 
 
// monadic lift
export function _mlift13479_parse_ddouble(x) /* (x : ddouble) -> std/text/parse/parse ddouble */  {
   
  var x0_13523 = $std_text_parse.eof();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return x;
    });
  }
  else {
    return x;
  }
}
 
export function parse_ddouble(s) /* (s : string) -> maybe<ddouble> */  {
   
  var s0_12808 = $std_core.to_lower((((((s).replace(/^\s\s*/,'')))).replace(/\s+$/,'')));
   
  var input_12806 = $std_core.Sslice(s0_12808, 0, s0_12808.length);
   
  var perr_12805 = $std_text_parse.parse(input_12806, function() {
       
      var x_13527 = $std_text_parse._lp__bar__bar__rp_(pddouble_sum, pddouble_normal);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift13479_parse_ddouble);
      }
      else {
        return _mlift13479_parse_ddouble(x_13527);
      }
    });
  if (perr_12805._tag === 1) {
    return $std_core_types.Just(perr_12805.result);
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// Parse a floating point number with up to 31 digits precision.
// Return `dd-nan` if the string is an invalid number.
export function ddouble_2(s) /* (s : string) -> ddouble */  {
   
  var m_12810 = parse_ddouble(s);
  return (m_12810 === null) ? dd_nan : m_12810.value;
}
 
 
// Decrement by one.
export function dec(x) /* (x : ddouble) -> ddouble */  {
  var _x82 = one.hi;
  var _x83 = one.lo;
  return _lp__plus__rp_(x, Ddouble((-_x82), (-_x83)));
}
 
 
// Zero constant
export var zero;
var zero = Ddouble(0.0, 0.0);
 
 
// Return the sum of a list of doubles.
// Uses [Kahan-Babu&scaron;kan-Neumaier summation](https://en.wikipedia.org/wiki/Kahan_summation_algorithm#Further_enhancements)
// to minimize rounding errors. This
// is more precise as Kahan summation and about as fast.\
// `[1.0e3,1.0e97,1.0e3,-1.0e97].sum == 2000.0`\
// A. Neumaier, _Rundungsfehleranalyse einiger Verfahren zur Summation endlicher Summen_.
// Math. Mechanik, 54:39--51, 1974.
export function sum_1(xs) /* (xs : list<ddouble>) -> ddouble */  {
  return function() {
     
    var loc = { value: zero };
     
    var loc0 = { value: zero };
     
    $std_core.foreach(xs, function(x /* ddouble */ ) {
         
        var t = _lp__plus__rp_(((loc).value), x);
         
        var x1_12818 = ((loc).value);
         
        var _x85 = x1_12818.hi;
        var _x84 = (_x85 < (0.0));
        if (_x84) {
          var _x86 = x1_12818.hi;
          var _x87 = x1_12818.lo;
          var x0_12816 = Ddouble((-_x86), (-_x87));
        }
        else {
          var x0_12816 = x1_12818;
        }
         
        var y_12817 = abs(x);
         
        var _x91 = x0_12816.hi;
        var _x92 = y_12817.hi;
        var _x90 = $std_num_float64.compare(_x91, _x92);
        if (_x90 === 2) {
          var _x93 = x0_12816.lo;
          var _x94 = y_12817.lo;
          var _x89 = $std_num_float64.compare(_x93, _x94);
        }
        else {
          var _x89 = _x90;
        }
        var _x88 = $std_core._lp__excl__eq__4_rp_(_x89, $std_core_types.Lt);
        if (_x88) {
           
          var x3_12822 = ((loc).value);
          var _x95 = t.hi;
          var _x96 = t.lo;
          var c = _lp__plus__rp_(_lp__plus__rp_(x3_12822, Ddouble((-_x95), (-_x96))), x);
        }
        else {
          var _x97 = t.hi;
          var _x98 = t.lo;
          var c = _lp__plus__rp_(_lp__plus__rp_(x, Ddouble((-_x97), (-_x98))), ((loc).value));
        }
         
        ((loc0).value = (_lp__plus__rp_(((loc0).value), c)));
        return ((loc).value = t);
      });
     
    var res0 = _lp__plus__rp_(((loc).value), ((loc0).value));
     
    var res = $std_core_hnd.prompt_local_var(loc0, res0);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
 
// Is this `:ddouble` positive?
export function is_pos(x) /* (x : ddouble) -> bool */  {
  var _x84 = x.hi;
  return (_x84 > (0.0));
}
 
 
// Round a `:ddouble` to the nearest integer, rounding to the nearest even number in case of a tie.
export function round(x) /* (x : ddouble) -> ddouble */  {
   
  var _x85 = x.hi;
  var r = $std_core._double_round_even(_x85);
   
  var _x86 = x.hi;
  var diff = (r - _x86);
  if ((diff === (0.0))) {
    var _x85 = x.lo;
    return dquicksum(r, $std_core._double_round_even(_x85));
  }
  else {
     
    if ((diff === (0.5))) {
      var _x87 = x.lo;
      var _x86 = (_x87 < (0.0));
      if (_x86) {
        var d_12831 = (r - (1.0));
      }
      else {
        if ((diff === ((-0.5)))) {
          var _x89 = x.lo;
          var _x88 = (_x89 > (0.0));
          var d_12831 = (_x88) ? (r + (1.0)) : r;
        }
        else {
          var d_12831 = r;
        }
      }
    }
    else {
      if ((diff === ((-0.5)))) {
        var _x91 = x.lo;
        var _x90 = (_x91 > (0.0));
        var d_12831 = (_x90) ? (r + (1.0)) : r;
      }
      else {
        var d_12831 = r;
      }
    }
    return Ddouble(d_12831, 0.0);
  }
}
 
 
// Remainder of two `:ddouble`s
export function _lp__perc__rp_(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
   
  var n = round(_lp__fs__rp_(x, y));
   
  var y0_12839 = _lp__star__rp_(n, y);
  var _x86 = y0_12839.hi;
  var _x87 = y0_12839.lo;
  return _lp__plus__rp_(x, Ddouble((-_x86), (-_x87)));
}
 
export function _lp__lt__rp_(x, y) /* (x : ddouble, y : ddouble) -> bool */  {
  var _x90 = x.hi;
  var _x91 = y.hi;
  var _x89 = $std_num_float64.compare(_x90, _x91);
  if (_x89 === 2) {
    var _x92 = x.lo;
    var _x93 = y.lo;
    var _x88 = $std_num_float64.compare(_x92, _x93);
  }
  else {
    var _x88 = _x89;
  }
  return $std_core._lp__eq__eq__4_rp_(_x88, $std_core_types.Lt);
}
 
export function _lp__gt__rp_(x, y) /* (x : ddouble, y : ddouble) -> bool */  {
  var _x96 = x.hi;
  var _x97 = y.hi;
  var _x95 = $std_num_float64.compare(_x96, _x97);
  if (_x95 === 2) {
    var _x98 = x.lo;
    var _x99 = y.lo;
    var _x94 = $std_num_float64.compare(_x98, _x99);
  }
  else {
    var _x94 = _x95;
  }
  return $std_core._lp__eq__eq__4_rp_(_x94, $std_core_types.Gt);
}
 
 
// The maximum of `x` and `y`
export function max(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
  var _x103 = x.hi;
  var _x104 = y.hi;
  var _x102 = $std_num_float64.compare(_x103, _x104);
  if (_x102 === 2) {
    var _x105 = x.lo;
    var _x106 = y.lo;
    var _x101 = $std_num_float64.compare(_x105, _x106);
  }
  else {
    var _x101 = _x102;
  }
  var _x100 = $std_core._lp__excl__eq__4_rp_(_x101, $std_core_types.Lt);
  return (_x100) ? x : y;
}
 
 
// The maximum of the absolute values.
export function abs_max(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
   
  var x0_12842 = abs(x);
   
  var y0_12843 = abs(y);
  var _x110 = x0_12842.hi;
  var _x111 = y0_12843.hi;
  var _x109 = $std_num_float64.compare(_x110, _x111);
  if (_x109 === 2) {
    var _x112 = x0_12842.lo;
    var _x113 = y0_12843.lo;
    var _x108 = $std_num_float64.compare(_x112, _x113);
  }
  else {
    var _x108 = _x109;
  }
  var _x107 = $std_core._lp__excl__eq__4_rp_(_x108, $std_core_types.Lt);
  return (_x107) ? x0_12842 : y0_12843;
}
 
 
// The maximum of a list of absolute values.
export function abs_max_1(xs) /* (xs : list<ddouble>) -> ddouble */  {
  return $std_core.foldr(xs, zero, function(x /* ddouble */ , m /* ddouble */ ) {
       
      var x0_12846 = abs(x);
      var _x117 = x0_12846.hi;
      var _x118 = m.hi;
      var _x116 = $std_num_float64.compare(_x117, _x118);
      if (_x116 === 2) {
        var _x119 = x0_12846.lo;
        var _x120 = m.lo;
        var _x115 = $std_num_float64.compare(_x119, _x120);
      }
      else {
        var _x115 = _x116;
      }
      var _x114 = $std_core._lp__excl__eq__4_rp_(_x115, $std_core_types.Lt);
      return (_x114) ? x0_12846 : m;
    });
}
 
 
// &pi;
export var dd_pi;
var dd_pi = Ddouble(3.141592653589793, 1.2246467991473532e-16);
 
 
// &pi;/2
export var dd_pi2;
var dd_pi2 = Ddouble(1.5707963267948966, 6.123233995736766e-17);
 
 
// 3&pi;/4
export var dd_pi34;
var dd_pi34 = Ddouble(2.356194490192345, 9.18485099360515e-17);
 
 
// &pi;/4
export var dd_pi4;
var dd_pi4 = Ddouble(0.7853981633974483, 3.061616997868383e-17);
 
export var ch_factors;
var ch_factors = $std_core.Cons(Ddouble(1.6056491947130062e-10, 6.1925234565562596e-27), $std_core.Cons(Ddouble((-2.50521080522083e-8), (-3.659819502286579e-25)), $std_core.Cons(Ddouble(2.755731922396444e-6, (-2.0315661398415507e-22)), $std_core.Cons(Ddouble((-1.984126984126984e-4), 6.857728908107508e-21), $std_core.Cons(Ddouble(8.333333333333333e-3, 1.1563735775184918e-19), $std_core.Cons(Ddouble((-0.16666666666666666), (-9.251858532166303e-18)), $std_core.Cons(Ddouble(1.0, (-6.023956771240347e-31)), $std_core.Nil)))))));
 
 
// 2&pi;
export var dd_twopi;
var dd_twopi = Ddouble(6.283185307179586, 2.4492935982947064e-16);
 
 
// Convert a `:ddouble` to a `:decimal` up to a given precision `prec` (= `-1`).
// A negative precision converts precisely. Returns 0 for non-finite `:ddouble`'s.
export function decimal(x, prec) /* (x : ddouble, prec : optional<int>) -> std/num/decimal/decimal */  {
   
  var _x122 = x.hi;
  var _x121 = isFinite(_x122);
  if (_x121) {
    var _x123 = x.lo;
    var b_12850 = isFinite(_x123);
  }
  else {
    var b_12850 = false;
  }
  if (b_12850) {
    var _x121 = x.hi;
    var _x122 = (prec !== undefined) ? prec : -1;
    var _x123 = x.lo;
    var _x124 = (prec !== undefined) ? prec : -1;
    return $std_num_decimal._lp__plus__rp_($std_num_decimal.decimal_1(_x121, _x122), $std_num_decimal.decimal_1(_x123, _x124));
  }
  else {
    var _x126 = undefined;
    var _x125 = (_x126 !== undefined) ? _x126 : 0;
    return $std_num_decimal.decimal_exp(0, _x125);
  }
}
 
 
// Convert a `:ddouble` to the nearest integer (rounding to the nearest even number in case of a tie)
export function int(x, nonfin) /* (x : ddouble, nonfin : optional<int>) -> int */  {
   
  var _x128 = x.hi;
  var _x127 = isFinite(_x128);
  if (_x127) {
    var _x129 = x.lo;
    var b_12855 = isFinite(_x129);
  }
  else {
    var b_12855 = false;
  }
  if (b_12855) {
    return $std_num_decimal.int(decimal(round(x)));
  }
  else {
    return (nonfin !== undefined) ? nonfin : 0;
  }
}
 
export var sin16_table;
var sin16_table = $std_core.unvlist($std_core.Cons(zero, $std_core.Cons(Ddouble(0.19509032201612828, (-7.991079068461731e-18)), $std_core.Cons(Ddouble(0.3826834323650898, (-1.0050772696461588e-17)), $std_core.Cons(Ddouble(0.5555702330196022, 4.709410940561677e-17), $std_core.Cons(Ddouble(0.7071067811865476, (-4.833646656726456e-17)), $std_core.Cons(Ddouble(0.8314696123025452, 1.40738569847281e-18), $std_core.Cons(Ddouble(0.9238795325112867, 1.7645047084336683e-17), $std_core.Cons(Ddouble(0.9807852804032304, 1.8546939997825015e-17), $std_core.Cons(one, $std_core.Nil))))))))));
 
 
// Return sin(i*pi/16) for 0 <= i <= 8
export function sin16(i) /* (i : int) -> ddouble */  {
   
  var m_12857 = $std_core.at(sin16_table, i);
  return (m_12857 === null) ? dd_nan : m_12857.value;
}
 
export function dsum(x, y) /* (x : float64, y : float64) -> ddouble */  {
   
  var z = (x + y);
   
  var diff = (z - x);
   
  var err0 = (((x - ((z - diff)))) + ((y - diff)));
  var _x127 = (isFinite(z)) ? err0 : z;
  return Ddouble(z, _x127);
}
 
 
// The square root of a non-negative `:ddouble` `x`.
// For negative `x`, `dd-nan` is returned.
export function sqrt(x) /* (x : ddouble) -> ddouble */  {
  var _x129 = x.hi;
  var _x128 = (_x129 === (0.0));
  if (_x128) {
    return zero;
  }
  else {
    var _x131 = x.hi;
    var _x130 = (_x131 < (0.0));
    if (_x130) {
      return dd_nan;
    }
    else {
       
      var _x132 = x.hi;
      var a = ((1.0) / (Math.sqrt(_x132)));
       
      var _x133 = x.hi;
      var t1 = (_x133 * a);
       
      var y_12869 = sqr(Ddouble(t1, 0.0));
       
      var _x134 = y_12869.hi;
      var _x135 = y_12869.lo;
      var ddouble4_12867 = _lp__plus__rp_(x, Ddouble((-_x134), (-_x135)));
       
      var _x136 = ddouble4_12867.hi;
      var t2 = (((_x136 * a)) * (0.5));
      return dsum(t1, t2);
    }
  }
}
 
 
// Calculate sine and cosine on an angle in radians.
export function sincos(rad) /* (rad : ddouble) -> (ddouble, ddouble) */  {
  var _x133 = rad.hi;
  var _x132 = ((Math.abs(_x133)) < (1.0e-11));
  if (_x132) {
     
    var y_12873 = _lp__fs__rp_(sqr(rad), ddouble_int_exp(3, 0));
     
    var _x134 = y_12873.hi;
    var _x135 = y_12873.lo;
    var s = _lp__star__rp_(rad, _lp__plus__rp_(one, Ddouble((-_x134), (-_x135))));
     
    var y0_12876 = sqr(s);
     
    var _x136 = y0_12876.hi;
    var _x137 = y0_12876.lo;
    var c = sqrt(_lp__plus__rp_(one, Ddouble((-_x136), (-_x137))));
    return $std_core_types._Tuple2_(s, c);
  }
  else {
     
    var x1 = _lp__fs__rp_(rad, dd_twopi);
     
    var y1_12878 = round(x1);
     
    var _x134 = y1_12878.hi;
    var _x135 = y1_12878.lo;
    var x3 = _lp__plus__rp_(x1, Ddouble((-_x134), (-_x135)));
     
    var x32 = _lp__plus__rp_(x3, x3);
     
    var x34 = _lp__plus__rp_(x32, x32);
     
    var _x137 = x34.hi;
    var _x136 = isFinite(_x137);
    if (_x136) {
      var _x138 = x34.lo;
      var b_12881 = isFinite(_x138);
    }
    else {
      var b_12881 = false;
    }
     
    if (b_12881) {
      var a = $std_num_decimal.int(decimal(round(x34)));
    }
    else {
      var _x139 = undefined;
      var a = (_x139 !== undefined) ? _x139 : 0;
    }
     
    var y2_12886 = ddouble_int_exp(a, 0);
     
    var _x140 = y2_12886.hi;
    var _x141 = y2_12886.lo;
    var x5_12882 = _lp__star__rp_(ddouble_int_exp(8, 0), _lp__plus__rp_(x34, Ddouble((-_x140), (-_x141))));
     
    var _x143 = x5_12882.hi;
    var _x142 = isFinite(_x143);
    if (_x142) {
      var _x144 = x5_12882.lo;
      var b0_12888 = isFinite(_x144);
    }
    else {
      var b0_12888 = false;
    }
     
    if (b0_12888) {
      var b1 = $std_num_decimal.int(decimal(round(x5_12882)));
    }
    else {
      var _x145 = undefined;
      var b1 = (_x145 !== undefined) ? _x145 : 0;
    }
     
    var x8_12892 = $std_core._int_mul(8,a);
     
    var i2_12891 = $std_core._int_add(x8_12892,b1);
     
    var y3_12890 = _lp__fs__rp_(ddouble_int_exp(i2_12891, 0), ddouble_int_exp(16, 0));
     
    var _x146 = y3_12890.hi;
    var _x147 = y3_12890.lo;
    var s0 = _lp__star__rp_(dd_pi, _lp__plus__rp_(x32, Ddouble((-_x146), (-_x147))));
     
    var s2 = sqr(s0);
     
    var sins = _lp__star__rp_(s0, $std_core.foldl(ch_factors, zero, function(acc /* ddouble */ , f /* ddouble */ ) {
          return _lp__plus__rp_(f, _lp__star__rp_(acc, s2));
        }));
     
    var y5_12896 = sqr(sins);
     
    var _x148 = y5_12896.hi;
    var _x149 = y5_12896.lo;
    var coss = sqrt(_lp__plus__rp_(one, Ddouble((-_x148), (-_x149))));
     
    if ($std_core._int_ge(b1,0)) {
       
      var m_12898 = $std_core.at(sin16_table, b1);
      var sinb = (m_12898 === null) ? dd_nan : m_12898.value;
    }
    else {
       
      var i5_12901 = $std_core._int_negate(b1);
       
      var m0_12902 = $std_core.at(sin16_table, i5_12901);
      var _x151 = (m0_12902 === null) ? dd_nan : m0_12902.value;
      var _x150 = _x151.hi;
      var _x153 = (m0_12902 === null) ? dd_nan : m0_12902.value;
      var _x152 = _x153.lo;
      var sinb = Ddouble((-_x150), (-_x152));
    }
     
    var y6_12908 = $std_core._int_abs(b1);
     
    var i6_12906 = $std_core._int_sub(8,y6_12908);
     
    var m1_12909 = $std_core.at(sin16_table, i6_12906);
    if ($std_core._int_eq(a,0)) {
       
      var _x134 = (m1_12909 === null) ? dd_nan : m1_12909.value;
      var x15_12911 = _lp__star__rp_(coss, _x134);
       
      var y7_12912 = _lp__star__rp_(sins, sinb);
      var _x134 = (m1_12909 === null) ? dd_nan : m1_12909.value;
      var _x135 = y7_12912.hi;
      var _x136 = y7_12912.lo;
      return $std_core_types._Tuple2_(_lp__plus__rp_(_lp__star__rp_(sins, _x134), _lp__star__rp_(coss, sinb)), _lp__plus__rp_(x15_12911, Ddouble((-_x135), (-_x136))));
    }
    else {
      if ($std_core._int_eq(a,1)) {
         
        var _x137 = (m1_12909 === null) ? dd_nan : m1_12909.value;
        var x16_12913 = _lp__star__rp_(coss, _x137);
         
        var y8_12914 = _lp__star__rp_(sins, sinb);
         
        var _x138 = coss.hi;
        var _x139 = coss.lo;
        var x17_12915 = _lp__star__rp_(Ddouble((-_x138), (-_x139)), sinb);
         
        var _x140 = (m1_12909 === null) ? dd_nan : m1_12909.value;
        var y9_12916 = _lp__star__rp_(sins, _x140);
        var _x137 = y8_12914.hi;
        var _x138 = y8_12914.lo;
        var _x139 = y9_12916.hi;
        var _x140 = y9_12916.lo;
        return $std_core_types._Tuple2_(_lp__plus__rp_(x16_12913, Ddouble((-_x137), (-_x138))), _lp__plus__rp_(x17_12915, Ddouble((-_x139), (-_x140))));
      }
      else {
        if ($std_core._int_eq(a,(-1))) {
           
          var x18_12917 = _lp__star__rp_(sins, sinb);
           
          var _x141 = (m1_12909 === null) ? dd_nan : m1_12909.value;
          var y10_12918 = _lp__star__rp_(coss, _x141);
          var _x141 = y10_12918.hi;
          var _x142 = y10_12918.lo;
          var _x143 = (m1_12909 === null) ? dd_nan : m1_12909.value;
          return $std_core_types._Tuple2_(_lp__plus__rp_(x18_12917, Ddouble((-_x141), (-_x142))), _lp__plus__rp_(_lp__star__rp_(coss, sinb), _lp__star__rp_(sins, _x143)));
        }
        else {
           
          var _x144 = sins.hi;
          var _x145 = sins.lo;
          var _x146 = (m1_12909 === null) ? dd_nan : m1_12909.value;
          var x19_12919 = _lp__star__rp_(Ddouble((-_x144), (-_x145)), _x146);
           
          var y11_12920 = _lp__star__rp_(coss, sinb);
           
          var x20_12921 = _lp__star__rp_(sins, sinb);
           
          var _x147 = (m1_12909 === null) ? dd_nan : m1_12909.value;
          var y12_12922 = _lp__star__rp_(coss, _x147);
          var _x144 = y11_12920.hi;
          var _x145 = y11_12920.lo;
          var _x146 = y12_12922.hi;
          var _x147 = y12_12922.lo;
          return $std_core_types._Tuple2_(_lp__plus__rp_(x19_12919, Ddouble((-_x144), (-_x145))), _lp__plus__rp_(x20_12921, Ddouble((-_x146), (-_x147))));
        }
      }
    }
  }
}
 
 
// Return `x` with the sign of `y`.
export function with_sign_of(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
  var _x149 = y.hi;
  var _x148 = (_x149 < (0.0));
  if (_x148) {
     
    var x1_12926 = abs(x);
    var _x150 = x1_12926.hi;
    var _x151 = x1_12926.lo;
    return Ddouble((-_x150), (-_x151));
  }
  else {
    return abs(x);
  }
}
 
 
// The arc-tangent of a point (`x`,`y`). Returns the angle with respect to the x-axis in radians between -&pi; and &pi;.
export function atan2(y, x) /* (y : ddouble, x : ddouble) -> ddouble */  {
  var _x153 = x.hi;
  var _x152 = (_x153 === (0.0));
  if (_x152) {
    var _x155 = y.hi;
    var _x154 = (_x155 === (0.0));
    if (_x154) {
      return zero;
    }
    else {
      return with_sign_of(dd_pi2, y);
    }
  }
  else {
    var _x157 = y.hi;
    var _x156 = (_x157 === (0.0));
    if (_x156) {
      var _x159 = x.hi;
      var _x158 = (_x159 > (0.0));
      return (_x158) ? zero : dd_pi;
    }
    else {
      var _x163 = x.hi;
      var _x164 = y.hi;
      var _x162 = $std_num_float64.compare(_x163, _x164);
      if (_x162 === 2) {
        var _x165 = x.lo;
        var _x166 = y.lo;
        var _x161 = $std_num_float64.compare(_x165, _x166);
      }
      else {
        var _x161 = _x162;
      }
      var _x160 = $std_core._lp__eq__eq__4_rp_(_x161, $std_core_types.Eq);
      if (_x160) {
        var _x168 = y.hi;
        var _x167 = (_x168 > (0.0));
        if (_x167) {
          return dd_pi4;
        }
        else {
          var _x169 = dd_pi34.hi;
          var _x170 = dd_pi34.lo;
          return Ddouble((-_x169), (-_x170));
        }
      }
      else {
         
        var _x171 = y.hi;
        var _x172 = y.lo;
        var y1_12947 = Ddouble((-_x171), (-_x172));
        var _x174 = x.hi;
        var _x175 = y1_12947.hi;
        var _x173 = $std_num_float64.compare(_x174, _x175);
        if (_x173 === 2) {
          var _x176 = x.lo;
          var _x177 = y1_12947.lo;
          var _x172 = $std_num_float64.compare(_x176, _x177);
        }
        else {
          var _x172 = _x173;
        }
        var _x171 = $std_core._lp__eq__eq__4_rp_(_x172, $std_core_types.Eq);
        if (_x171) {
          var _x179 = y.hi;
          var _x178 = (_x179 > (0.0));
          if (_x178) {
            return dd_pi34;
          }
          else {
            var _x180 = dd_pi4.hi;
            var _x181 = dd_pi4.lo;
            return Ddouble((-_x180), (-_x181));
          }
        }
        else {
           
          var r = sqrt(_lp__plus__rp_(sqr(x), sqr(y)));
           
          var xr = _lp__fs__rp_(x, r);
           
          var yr = _lp__fs__rp_(y, r);
           
          var _x182 = y.hi;
          var _x183 = x.hi;
          var d5_12951 = Math.atan2(_x182,_x183);
           
          var z = Ddouble(d5_12951, 0.0);
          var _x182 = sincos(z);
           
          var ddouble9_12957 = abs(yr);
          var _x184 = xr.hi;
          var _x185 = ddouble9_12957.hi;
          var _x183 = ((Math.abs(_x184)) > _x185);
          if (_x183) {
            var _x186 = _x182.fst.hi;
            var _x187 = _x182.fst.lo;
            return _lp__plus__rp_(z, _lp__fs__rp_(_lp__plus__rp_(yr, Ddouble((-_x186), (-_x187))), _x182.snd));
          }
          else {
             
            var _x188 = _x182.snd.hi;
            var _x189 = _x182.snd.lo;
            var y3_12961 = _lp__fs__rp_(_lp__plus__rp_(xr, Ddouble((-_x188), (-_x189))), _x182.fst);
            var _x188 = y3_12961.hi;
            var _x189 = y3_12961.lo;
            return _lp__plus__rp_(z, Ddouble((-_x188), (-_x189)));
          }
        }
      }
    }
  }
}
 
 
// The arc-cosine of `x`. Returns the angle in radians.
export function acos(x) /* (x : ddouble) -> ddouble */  {
   
  var a = abs(x);
  var _x193 = a.hi;
  var _x194 = one.hi;
  var _x192 = $std_num_float64.compare(_x193, _x194);
  if (_x192 === 2) {
    var _x195 = a.lo;
    var _x196 = one.lo;
    var _x191 = $std_num_float64.compare(_x195, _x196);
  }
  else {
    var _x191 = _x192;
  }
  var _x190 = $std_core._lp__eq__eq__4_rp_(_x191, $std_core_types.Gt);
  if (_x190) {
    return dd_nan;
  }
  else {
    var _x200 = a.hi;
    var _x201 = one.hi;
    var _x199 = $std_num_float64.compare(_x200, _x201);
    if (_x199 === 2) {
      var _x202 = a.lo;
      var _x203 = one.lo;
      var _x198 = $std_num_float64.compare(_x202, _x203);
    }
    else {
      var _x198 = _x199;
    }
    var _x197 = $std_core._lp__eq__eq__4_rp_(_x198, $std_core_types.Eq);
    if (_x197) {
      var _x205 = x.hi;
      var _x204 = (_x205 > (0.0));
      return (_x204) ? zero : dd_pi;
    }
    else {
       
      var y1_12972 = sqr(x);
      var _x206 = y1_12972.hi;
      var _x207 = y1_12972.lo;
      return atan2(sqrt(_lp__plus__rp_(one, Ddouble((-_x206), (-_x207)))), x);
    }
  }
}
 
 
// The _e_ constant.
export var dd_e;
var dd_e = Ddouble(2.718281828459045, 1.4456468917292502e-16);
 
 
// Negative infinity
export var dd_neginf;
var dd_neginf = Ddouble($std_num_float64.neginf, 0.0);
 
 
// The 'machine epsilon': this is not well-defined for a `:ddouble` in general since
// the difference between 1.0 and the next representable `:ddouble` value is `dd-true-min`.
// Instead, we take the square of `flt-epsilon`, i.e. 2^-104^.
export var dd_epsilon;
var dd_epsilon = Ddouble(4.930380657631324e-32, 0.0);
 
 
// The natural logarithm of 2
export var dd_ln2;
var dd_ln2 = Ddouble(0.6931471805599453, 2.3190468138462996e-17);
 
 
// Positive infinity
export var dd_posinf;
var dd_posinf = Ddouble($std_num_float64.posinf, 0.0);
 
export function exp_approx(p, t, r, eps, fs, s) /* (p : ddouble, t : ddouble, r : ddouble, eps : float64, fs : list<ddouble>, s : optional<ddouble>) -> ddouble */  { tailcall: while(1)
{
  if (fs === null) {
    var _x208 = (s !== undefined) ? s : zero;
    return _lp__plus__rp_(_x208, t);
  }
  else {
     
    var _x209 = (s !== undefined) ? s : zero;
    var s1 = _lp__plus__rp_(_x209, t);
     
    var p1 = _lp__star__rp_(p, r);
     
    var t1 = _lp__star__rp_(p1, fs.head);
    var _x210 = t1.hi;
    var _x209 = ((Math.abs(_x210)) <= eps);
    if (_x209) {
      var _x211 = (s !== undefined) ? s : zero;
      return _lp__plus__rp_(_x211, t);
    }
    else {
      {
        // tail call
        var _x212 = s1;
        p = p1;
        t = t1;
        fs = fs.tail;
        s = _x212;
        continue tailcall;
      }
    }
  }
}}
 
export var exp_factors;
var exp_factors = $std_core.Cons(Ddouble(0.16666666666666666, 9.25185853854297e-18), $std_core.Cons(Ddouble(4.1666666666666664e-2, 2.3129646346357427e-18), $std_core.Cons(Ddouble(8.333333333333333e-3, 1.1564823173178714e-19), $std_core.Cons(Ddouble(1.388888888888889e-3, (-5.300543954373577e-20)), $std_core.Cons(Ddouble(1.984126984126984e-4, 1.7209558293420705e-22), $std_core.Cons(Ddouble(2.48015873015873e-5, 2.1511947866775882e-23), $std_core.Nil))))));
 
 
// Round to negative infinity.
export function floor(x) /* (x : ddouble) -> ddouble */  {
   
  var _x213 = x.hi;
  var r = Math.floor(_x213);
  var _x214 = x.hi;
  var _x213 = (r === _x214);
  if (_x213) {
    var _x215 = x.lo;
    return dquicksum(r, Math.floor(_x215));
  }
  else {
    return Ddouble(r, 0.0);
  }
}
 
 
// Multiply `x` by a `:float64` `p` where `p` must be a power of 2.
export function mul_pwr2(x, p) /* (x : ddouble, p : float64) -> ddouble */  {
  var _x216 = x.hi;
  var _x217 = x.lo;
  return Ddouble((_x216 * p), (_x217 * p));
}
 
export function half(x) /* (x : ddouble) -> ddouble */  {
  var _x218 = x.hi;
  var _x219 = x.lo;
  return Ddouble((_x218 * (0.5)), (_x219 * (0.5)));
}
 
 
// 'Load exponent': returns `x`&middot;2^`exp`^.
export function ldexp(x, exp0) /* (x : ddouble, exp : int) -> ddouble */  {
  var _x220 = x.hi;
  var _x221 = x.lo;
  return Ddouble($std_num_float64.ldexp(_x220, exp0), $std_num_float64.ldexp(_x221, exp0));
}
 
export function twice(x) /* (x : ddouble) -> ddouble */  {
  var _x222 = x.hi;
  var _x223 = x.lo;
  return Ddouble((_x222 * (2.0)), (_x223 * (2.0)));
}
 
 
// Return _e_ (`dd-e`) to the power of `x`.
export function exp(x) /* (x : ddouble) -> ddouble */  {
   
  var inv_k = ((1.0) / (512.0));
  var _x225 = x.hi;
  var _x224 = (_x225 <= ((-709.0)));
  if (_x224) {
    return zero;
  }
  else {
    var _x227 = x.hi;
    var _x226 = (_x227 >= (709.0));
    if (_x226) {
      return dd_posinf;
    }
    else {
      var _x229 = x.hi;
      var _x228 = (_x229 === (0.0));
      if (_x228) {
        return one;
      }
      else {
        var _x233 = x.hi;
        var _x234 = one.hi;
        var _x232 = $std_num_float64.compare(_x233, _x234);
        if (_x232 === 2) {
          var _x235 = x.lo;
          var _x236 = one.lo;
          var _x231 = $std_num_float64.compare(_x235, _x236);
        }
        else {
          var _x231 = _x232;
        }
        var _x230 = $std_core._lp__eq__eq__4_rp_(_x231, $std_core_types.Eq);
        if (_x230) {
          return dd_e;
        }
        else {
          return function() {
             
            var _x237 = x.hi;
            var _x238 = dd_ln2.hi;
            var m = $std_core._int_double((Math.floor(((((_x237 / _x238)) + (0.5))))));
             
            var y0_13003 = _lp__star__rp_(ddouble_int_exp(m, 0), dd_ln2);
             
            var _x239 = y0_13003.hi;
            var _x240 = y0_13003.lo;
            var x2_13000 = _lp__plus__rp_(x, Ddouble((-_x239), (-_x240)));
             
            var _x241 = x2_13000.hi;
            var _x242 = x2_13000.lo;
            var r = Ddouble((_x241 * inv_k), (_x242 * inv_k));
             
            var p0 = sqr(r);
             
            var _x243 = p0.hi;
            var _x244 = p0.lo;
            var t = _lp__plus__rp_(r, Ddouble((_x243 * (0.5)), (_x244 * (0.5))));
             
            var _x245 = dd_epsilon.hi;
            var init_13533 = exp_approx(p0, t, r, (inv_k * _x245), exp_factors);
             
            var loc = { value: init_13533 };
             
            $std_core.repeat_1(9, function() {
                 
                var x4_13008 = ((loc).value);
                var _x246 = x4_13008.hi;
                var _x247 = x4_13008.lo;
                return ((loc).value = (_lp__plus__rp_(Ddouble((_x246 * (2.0)), (_x247 * (2.0))), sqr(((loc).value)))));
              });
             
            ((loc).value = (_lp__plus__rp_(((loc).value), one)));
             
            var x6_13013 = ((loc).value);
             
            var _x248 = x6_13013.hi;
            var _x249 = x6_13013.lo;
            var res = Ddouble($std_num_float64.ldexp(_x248, m), $std_num_float64.ldexp(_x249, m));
            return $std_core_hnd.prompt_local_var(loc, res);
          }();
        }
      }
    }
  }
}
 
 
// Does `x` equal positive infinity?
export function is_posinf(x) /* (x : ddouble) -> bool */  {
  var _x237 = x.hi;
  return ((_x237) === Infinity);
}
 
 
// The natural logarithm (in base _e_) of `x`.
export function ln(x) /* (x : ddouble) -> ddouble */  {
  var _x241 = x.hi;
  var _x242 = zero.hi;
  var _x240 = $std_num_float64.compare(_x241, _x242);
  if (_x240 === 2) {
    var _x243 = x.lo;
    var _x244 = zero.lo;
    var _x239 = $std_num_float64.compare(_x243, _x244);
  }
  else {
    var _x239 = _x240;
  }
  var _x238 = $std_core._lp__excl__eq__4_rp_(_x239, $std_core_types.Gt);
  if (_x238) {
    var _x248 = x.hi;
    var _x249 = zero.hi;
    var _x247 = $std_num_float64.compare(_x248, _x249);
    if (_x247 === 2) {
      var _x250 = x.lo;
      var _x251 = zero.lo;
      var _x246 = $std_num_float64.compare(_x250, _x251);
    }
    else {
      var _x246 = _x247;
    }
    var _x245 = $std_core._lp__eq__eq__4_rp_(_x246, $std_core_types.Eq);
    return (_x245) ? dd_neginf : dd_nan;
  }
  else {
    var _x255 = x.hi;
    var _x256 = one.hi;
    var _x254 = $std_num_float64.compare(_x255, _x256);
    if (_x254 === 2) {
      var _x257 = x.lo;
      var _x258 = one.lo;
      var _x253 = $std_num_float64.compare(_x257, _x258);
    }
    else {
      var _x253 = _x254;
    }
    var _x252 = $std_core._lp__eq__eq__4_rp_(_x253, $std_core_types.Eq);
    if (_x252) {
      return zero;
    }
    else {
      var _x262 = x.hi;
      var _x263 = dd_e.hi;
      var _x261 = $std_num_float64.compare(_x262, _x263);
      if (_x261 === 2) {
        var _x264 = x.lo;
        var _x265 = dd_e.lo;
        var _x260 = $std_num_float64.compare(_x264, _x265);
      }
      else {
        var _x260 = _x261;
      }
      var _x259 = $std_core._lp__eq__eq__4_rp_(_x260, $std_core_types.Eq);
      if (_x259) {
        return one;
      }
      else {
        var _x267 = x.hi;
        var _x266 = ((_x267) === Infinity);
        if (_x266) {
          return x;
        }
        else {
           
          var _x268 = x.hi;
          var d_13028 = Math.log(_x268);
           
          var a0 = Ddouble(d_13028, 0.0);
           
          var _x269 = a0.hi;
          var _x270 = a0.lo;
          var x5_13030 = _lp__star__rp_(x, exp(Ddouble((-_x269), (-_x270))));
          var _x268 = one.hi;
          var _x269 = one.lo;
          return _lp__plus__rp_(a0, _lp__plus__rp_(x5_13030, Ddouble((-_x268), (-_x269))));
        }
      }
    }
  }
}
 
 
// The area hyperbolic cosine of `x`.
export function acosh(x) /* (x : ddouble) -> ddouble */  {
  var _x273 = x.hi;
  var _x274 = one.hi;
  var _x272 = $std_num_float64.compare(_x273, _x274);
  if (_x272 === 2) {
    var _x275 = x.lo;
    var _x276 = one.lo;
    var _x271 = $std_num_float64.compare(_x275, _x276);
  }
  else {
    var _x271 = _x272;
  }
  var _x270 = $std_core._lp__eq__eq__4_rp_(_x271, $std_core_types.Lt);
  if (_x270) {
    return dd_nan;
  }
  else {
     
    var x1_13034 = sqr(x);
    var _x277 = one.hi;
    var _x278 = one.lo;
    return ln(_lp__plus__rp_(x, sqrt(_lp__plus__rp_(x1_13034, Ddouble((-_x277), (-_x278))))));
  }
}
 
 
// The arc-sine of `x`. Returns the angle in radians.
export function asin(x) /* (x : ddouble) -> ddouble */  {
   
  var a = abs(x);
  var _x282 = a.hi;
  var _x283 = one.hi;
  var _x281 = $std_num_float64.compare(_x282, _x283);
  if (_x281 === 2) {
    var _x284 = a.lo;
    var _x285 = one.lo;
    var _x280 = $std_num_float64.compare(_x284, _x285);
  }
  else {
    var _x280 = _x281;
  }
  var _x279 = $std_core._lp__eq__eq__4_rp_(_x280, $std_core_types.Gt);
  if (_x279) {
    return dd_nan;
  }
  else {
    var _x289 = a.hi;
    var _x290 = one.hi;
    var _x288 = $std_num_float64.compare(_x289, _x290);
    if (_x288 === 2) {
      var _x291 = a.lo;
      var _x292 = one.lo;
      var _x287 = $std_num_float64.compare(_x291, _x292);
    }
    else {
      var _x287 = _x288;
    }
    var _x286 = $std_core._lp__eq__eq__4_rp_(_x287, $std_core_types.Eq);
    if (_x286) {
      return with_sign_of(dd_pi2, x);
    }
    else {
       
      var y1_13041 = sqr(x);
      var _x293 = y1_13041.hi;
      var _x294 = y1_13041.lo;
      return atan2(x, sqrt(_lp__plus__rp_(one, Ddouble((-_x293), (-_x294)))));
    }
  }
}
 
 
// The area hyperbolic sine of `x`.
export function asinh(x) /* (x : ddouble) -> ddouble */  {
  return ln(_lp__plus__rp_(x, sqrt(_lp__plus__rp_(sqr(x), one))));
}
 
 
// The arc-tangent of `x`. Returns the angle in radians.
export function atan(x) /* (x : ddouble) -> ddouble */  {
  return atan2(x, one);
}
 
 
// The area hyperbolic tangent of `x`.
export function atanh(x) /* (x : ddouble) -> ddouble */  {
   
  var x0_13042 = abs(x);
  var _x298 = x0_13042.hi;
  var _x299 = one.hi;
  var _x297 = $std_num_float64.compare(_x298, _x299);
  if (_x297 === 2) {
    var _x300 = x0_13042.lo;
    var _x301 = one.lo;
    var _x296 = $std_num_float64.compare(_x300, _x301);
  }
  else {
    var _x296 = _x297;
  }
  var _x295 = $std_core._lp__eq__eq__4_rp_(_x296, $std_core_types.Gt);
  if (_x295) {
    return dd_nan;
  }
  else {
     
    var _x302 = x.hi;
    var _x303 = x.lo;
    var x1_13044 = ln(_lp__fs__rp_(_lp__plus__rp_(one, x), _lp__plus__rp_(one, Ddouble((-_x302), (-_x303)))));
    var _x302 = x1_13044.hi;
    var _x303 = x1_13044.lo;
    return Ddouble((_x302 * (0.5)), (_x303 * (0.5)));
  }
}
 
 
// Round to positive infinity.
export function ceiling(x) /* (x : ddouble) -> ddouble */  {
   
  var _x304 = x.hi;
  var r = Math.ceil(_x304);
  var _x305 = x.hi;
  var _x304 = (r === _x305);
  if (_x304) {
    var _x306 = x.lo;
    return dquicksum(r, Math.ceil(_x306));
  }
  else {
    return Ddouble(r, 0.0);
  }
}
 
 
// The cosine function of a given angle in radians.
export function cos(rad) /* (rad : ddouble) -> ddouble */  {
   
  var _this_13054 = sincos(rad);
  return _this_13054.snd;
}
 
 
// The hyperbolic sine of `x`.
export function sinh(x) /* (x : ddouble) -> ddouble */  {
  var _x308 = x.hi;
  var _x307 = (_x308 === (0.0));
  if (_x307) {
    return zero;
  }
  else {
     
    var x1_13058 = abs(x);
    var _x310 = x1_13058.hi;
    var _x309 = (_x310 > (5.0e-2));
    if (_x309) {
       
      var ex = exp(x);
       
      var _x312 = ex.hi;
      var _x311 = isFinite(_x312);
      if (_x311) {
        var _x313 = ex.lo;
        var b_13060 = isFinite(_x313);
      }
      else {
        var b_13060 = false;
      }
      if (b_13060) {
         
        var y_13063 = _lp__fs__rp_(one, ex);
         
        var _x311 = y_13063.hi;
        var _x312 = y_13063.lo;
        var x2_13061 = _lp__plus__rp_(ex, Ddouble((-_x311), (-_x312)));
        var _x311 = x2_13061.hi;
        var _x312 = x2_13061.lo;
        return Ddouble((_x311 * (0.5)), (_x312 * (0.5)));
      }
      else {
        return ex;
      }
    }
    else {
       
      var x20 = sqr(x);
      return _lp__star__rp_(x, _lp__plus__rp_(one, _lp__star__rp_(_lp__fs__rp_(x20, ddouble_int_exp(6, 0)), _lp__plus__rp_(one, _lp__star__rp_(_lp__fs__rp_(x20, ddouble_int_exp(20, 0)), _lp__plus__rp_(one, _lp__fs__rp_(x20, ddouble_int_exp(42, 0))))))));
    }
  }
}
 
 
// The hyperbolic cosine of `x`.
export function cosh(x) /* (x : ddouble) -> ddouble */  {
  var _x314 = x.hi;
  var _x313 = (_x314 === (0.0));
  if (_x313) {
    return one;
  }
  else {
     
    var x1_13074 = abs(x);
    var _x316 = x1_13074.hi;
    var _x315 = (_x316 > (5.0e-2));
    if (_x315) {
       
      var ex = exp(x);
       
      var _x318 = ex.hi;
      var _x317 = isFinite(_x318);
      if (_x317) {
        var _x319 = ex.lo;
        var b_13076 = isFinite(_x319);
      }
      else {
        var b_13076 = false;
      }
      if (b_13076) {
         
        var x2_13077 = _lp__plus__rp_(ex, _lp__fs__rp_(one, ex));
        var _x317 = x2_13077.hi;
        var _x318 = x2_13077.lo;
        return Ddouble((_x317 * (0.5)), (_x318 * (0.5)));
      }
      else {
        return ex;
      }
    }
    else {
       
      var s = sinh(x);
      return sqrt(_lp__plus__rp_(one, sqr(s)));
    }
  }
}
 
 
// 8*dd-epsilon
export var dd_epsilon8;
var dd_epsilon8 = Ddouble(3.944304526105059e-31, 0.0);
 
 
// [Euler's constant](https://en.wikipedia.org/wiki/Euler%E2%80%93Mascheroni_constant)
export var dd_euler;
var dd_euler = Ddouble(0.5772156649015329, (-4.942915152430645e-18));
 
 
// The natural logarithm of 10
export var dd_ln10;
var dd_ln10 = Ddouble(2.302585092994046, (-2.1707562233822494e-16));
 
 
// The base-10 logarithm of _e_.
export var dd_log10e;
var dd_log10e = Ddouble(0.4342944819032518, 1.098319650216765e-17);
 
 
// The base-2 logarithm of _e_.
export var dd_log2e;
var dd_log2e = Ddouble(1.4426950408889634, 2.035527374093103e-17);
 
 
// The maximum representable `:ddouble`
export var dd_max;
var dd_max = Ddouble(1.7976931348623157e308, 9.979201547673598e291);
 
 
// The smallest positive `:ddouble` that is still normalized
export var dd_min;
var dd_min = Ddouble(2.2250738585072014e-308, 0.0);
 
 
// &pi;/16
export var dd_pi16;
var dd_pi16 = Ddouble(3.141592653589793, 1.2246467991473532e-16);
 
 
// `1.0 / sqrt(2.0)`
export var dd_sqrt12;
var dd_sqrt12 = Ddouble(0.7071067811865476, (-4.833646656726457e-17));
 
 
// The square-root of 2
export var dd_sqrt2;
var dd_sqrt2 = Ddouble(1.4142135623730951, (-9.667293313452913e-17));
 
 
// The smallest positive `:ddouble`  (which is subnormal).
export var dd_true_min;
var dd_true_min = Ddouble(5.0e-324, 0.0);
 
 
// Create a `:ddouble` `x` such that `x` equals `d`&middot;10^`e`^.
export function ddouble_exp(d, e) /* (d : float64, e : int) -> ddouble */  {
   
  var x_13082 = Ddouble(d, 0.0);
  if ($std_core._int_iszero(e)) {
    return x_13082;
  }
  else {
    return _lp__star__rp_(x_13082, powi(ten, e));
  }
}
 
 
// Create a `:ddouble` `x` such that `x` equals `i`&middot;10^`e`^.
export function ddouble_exp_1(i, exp0) /* (i : int, exp : int) -> ddouble */  {
   
  var x_13086 = ddouble_int_exp(i, 0);
  if ($std_core._int_iszero(exp0)) {
    return x_13086;
  }
  else {
    return _lp__star__rp_(x_13086, powi(ten, exp0));
  }
}
 
 
// Division and remainder of two `:ddouble`s
export function divrem(x, y) /* (x : ddouble, y : ddouble) -> (ddouble, ddouble) */  {
   
  var n = round(_lp__fs__rp_(x, y));
   
  var y0_13091 = _lp__star__rp_(n, y);
  var _x319 = y0_13091.hi;
  var _x320 = y0_13091.lo;
  return $std_core_types._Tuple2_(n, _lp__plus__rp_(x, Ddouble((-_x319), (-_x320))));
}
 
 
// Encode a `:ddouble` `d` from two doubles `(hi,lo)` such that `d` equals  `hi`+`lo`.
export function encode(hi0, lo0) /* (hi : float64, lo : float64) -> ddouble */  {
  return _lp__plus__rp_(Ddouble(hi0, 0.0), Ddouble(lo0, 0.0));
}
 
 
// `x` to the power of `y` both as `:ddouble`
export function pow(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
  return exp(_lp__star__rp_(y, ln(x)));
}
 
 
// Return 10 to the power of `exp`.
export function exp10(exp0) /* (exp : ddouble) -> ddouble */  {
  return exp(_lp__star__rp_(exp0, ln(ten)));
}
 
export var two;
var two = Ddouble(2.0, 0.0);
 
 
// Return 2 to the power of `exp`.
export function exp2(exp0) /* (exp : ddouble) -> ddouble */  {
  return exp(_lp__star__rp_(exp0, ln(two)));
}
 
 
// Return `exp(x - 1.0)`.
// Avoids rounding errors for values of `x` very close to `1.0`.
export function expm1(x) /* (x : ddouble) -> ddouble */  {
  var _x322 = x.hi;
  var _x321 = ((_x322) === Infinity);
  if (_x321) {
    return x;
  }
  else {
     
    var y = exp(x);
    var _x326 = y.hi;
    var _x327 = one.hi;
    var _x325 = $std_num_float64.compare(_x326, _x327);
    if (_x325 === 2) {
      var _x328 = y.lo;
      var _x329 = one.lo;
      var _x324 = $std_num_float64.compare(_x328, _x329);
    }
    else {
      var _x324 = _x325;
    }
    var _x323 = $std_core._lp__eq__eq__4_rp_(_x324, $std_core_types.Eq);
    if (_x323) {
      return x;
    }
    else {
       
      var _x330 = one.hi;
      var _x331 = one.lo;
      var ym = _lp__plus__rp_(y, Ddouble((-_x330), (-_x331)));
       
      var _x332 = one.hi;
      var _x333 = one.lo;
      var y2_13106 = Ddouble((-_x332), (-_x333));
      var _x333 = ym.hi;
      var _x334 = y2_13106.hi;
      var _x332 = $std_num_float64.compare(_x333, _x334);
      if (_x332 === 2) {
        var _x335 = ym.lo;
        var _x336 = y2_13106.lo;
        var _x331 = $std_num_float64.compare(_x335, _x336);
      }
      else {
        var _x331 = _x332;
      }
      var _x330 = $std_core._lp__eq__eq__4_rp_(_x331, $std_core_types.Eq);
      if (_x330) {
        var _x337 = one.hi;
        var _x338 = one.lo;
        return Ddouble((-_x337), (-_x338));
      }
      else {
        return _lp__star__rp_(ym, _lp__fs__rp_(x, ln(y)));
      }
    }
  }
}
 
export function exp2m1(x) /* (x : ddouble) -> ddouble */  {
  return expm1(_lp__star__rp_(dd_ln2, x));
}
 
 
// The _floored_ fraction of `x`. This is always positive, such that `x.floor + x.ffraction == x`.
export function ffraction(x) /* (x : ddouble) -> ddouble */  {
   
  var y_13108 = floor(x);
  var _x339 = y_13108.hi;
  var _x340 = y_13108.lo;
  return _lp__plus__rp_(x, Ddouble((-_x339), (-_x340)));
}
 
 
// Round towards zero.
export function truncate(x) /* (x : ddouble) -> ddouble */  {
  var _x342 = x.hi;
  var _x341 = (_x342 < (0.0));
  if (_x341) {
    return ceiling(x);
  }
  else {
    return floor(x);
  }
}
 
 
// The fraction of `x` such that `x.truncate + x.fraction == x`.
export function fraction(x) /* (x : ddouble) -> ddouble */  {
   
  var _x344 = x.hi;
  var _x343 = (_x344 < (0.0));
  if (_x343) {
    var y_13113 = ceiling(x);
  }
  else {
    var y_13113 = floor(x);
  }
  var _x343 = y_13113.hi;
  var _x344 = y_13113.lo;
  return _lp__plus__rp_(x, Ddouble((-_x343), (-_x344)));
}
 
 
// The minimum of `x` and `y`.
export function min(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
  var _x348 = x.hi;
  var _x349 = y.hi;
  var _x347 = $std_num_float64.compare(_x348, _x349);
  if (_x347 === 2) {
    var _x350 = x.lo;
    var _x351 = y.lo;
    var _x346 = $std_num_float64.compare(_x350, _x351);
  }
  else {
    var _x346 = _x347;
  }
  var _x345 = $std_core._lp__excl__eq__4_rp_(_x346, $std_core_types.Gt);
  return (_x345) ? x : y;
}
 
 
// The hypotenuse of `x` and `y`: `sqrt(x*x + y*y)`.
// Prevents overflow for large numbers.
export function hypot(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
   
  var xx = abs(x);
   
  var yy = abs(y);
   
  var _x355 = xx.hi;
  var _x356 = yy.hi;
  var _x354 = $std_num_float64.compare(_x355, _x356);
  if (_x354 === 2) {
    var _x357 = xx.lo;
    var _x358 = yy.lo;
    var _x353 = $std_num_float64.compare(_x357, _x358);
  }
  else {
    var _x353 = _x354;
  }
  var _x352 = $std_core._lp__excl__eq__4_rp_(_x353, $std_core_types.Gt);
  var lo0 = (_x352) ? xx : yy;
   
  var _x362 = xx.hi;
  var _x363 = yy.hi;
  var _x361 = $std_num_float64.compare(_x362, _x363);
  if (_x361 === 2) {
    var _x364 = xx.lo;
    var _x365 = yy.lo;
    var _x360 = $std_num_float64.compare(_x364, _x365);
  }
  else {
    var _x360 = _x361;
  }
  var _x359 = $std_core._lp__excl__eq__4_rp_(_x360, $std_core_types.Lt);
  var hi0 = (_x359) ? xx : yy;
  var _x353 = hi0.hi;
  var _x352 = (_x353 === (0.0));
  if (_x352) {
    return zero;
  }
  else {
     
    var z = _lp__fs__rp_(lo0, hi0);
    return _lp__star__rp_(hi0, sqrt(_lp__plus__rp_(one, _lp__star__rp_(z, z))));
  }
}
 
 
// The square root of the sum of the squares of three doubles.
// Prevents overflow for large numbers.
export function hypot_1(x, y, z) /* (x : ddouble, y : ddouble, z : ddouble) -> ddouble */  {
   
  var xx = abs(x);
   
  var yy = abs(y);
   
  var zz = abs(z);
   
  var _x357 = xx.hi;
  var _x358 = yy.hi;
  var _x356 = $std_num_float64.compare(_x357, _x358);
  if (_x356 === 2) {
    var _x359 = xx.lo;
    var _x360 = yy.lo;
    var _x355 = $std_num_float64.compare(_x359, _x360);
  }
  else {
    var _x355 = _x356;
  }
  var _x354 = $std_core._lp__excl__eq__4_rp_(_x355, $std_core_types.Lt);
  var x0_13127 = (_x354) ? xx : yy;
   
  var _x364 = x0_13127.hi;
  var _x365 = zz.hi;
  var _x363 = $std_num_float64.compare(_x364, _x365);
  if (_x363 === 2) {
    var _x366 = x0_13127.lo;
    var _x367 = zz.lo;
    var _x362 = $std_num_float64.compare(_x366, _x367);
  }
  else {
    var _x362 = _x363;
  }
  var _x361 = $std_core._lp__excl__eq__4_rp_(_x362, $std_core_types.Lt);
  var hi0 = (_x361) ? x0_13127 : zz;
  var _x355 = hi0.hi;
  var _x354 = (_x355 === (0.0));
  if (_x354) {
    return zero;
  }
  else {
    return _lp__star__rp_(hi0, sqrt(_lp__plus__rp_(_lp__plus__rp_(sqr(_lp__fs__rp_(xx, hi0)), sqr(_lp__fs__rp_(yy, hi0))), sqr(_lp__fs__rp_(zz, hi0)))));
  }
}
 
 
// The square root of the sum of squares of a list of doubles.
// Prevents overflow for large numbers and uses Kahan-Babu&scaron;kan-Neumaier summation
// for precision.
export function hypot_2(xs) /* (xs : list<ddouble>) -> ddouble */  {
   
  var hi0 = abs_max_1(xs);
  var _x357 = hi0.hi;
  var _x356 = (_x357 === (0.0));
  if (_x356) {
    return zero;
  }
  else {
    return _lp__star__rp_(hi0, sqrt(sum_1($std_core.map_5(xs, function(x0 /* ddouble */ ) {
          return sqr(_lp__fs__rp_(x0, hi0));
        }))));
  }
}
 
 
// Increment by one.
export function inc(x) /* (x : ddouble) -> ddouble */  {
  return _lp__plus__rp_(x, one);
}
 
 
// Is this an infinite value.
export function is_inf(x) /* (x : ddouble) -> bool */  {
  var _x358 = x.hi;
  return $std_num_float64.is_inf(_x358);
}
 
 
// Is this `:ddouble` not-a-number?
export function is_nan(x) /* (x : ddouble) -> bool */  {
  var _x360 = x.hi;
  var _x359 = isNaN(_x360);
  if (_x359) {
    return true;
  }
  else {
    var _x361 = x.lo;
    return isNaN(_x361);
  }
}
 
 
// Does `x` equal negative infinity?
export function is_neginf(x) /* (x : ddouble) -> bool */  {
  var _x362 = x.hi;
  return ((_x362) === -Infinity);
}
 
 
// Return the sign of the `:ddouble`.
export function is_sign(x) /* (x : ddouble) -> order */  {
  var _x364 = x.hi;
  var _x363 = (_x364 === (0.0));
  if (_x363) {
    return $std_core_types.Eq;
  }
  else {
    var _x366 = x.hi;
    var _x365 = (_x366 < (0.0));
    return (_x365) ? $std_core_types.Lt : $std_core_types.Gt;
  }
}
 
 
// Return `ln(1.0 + x)`.
// Avoids potential imprecision for small `x` where adding `1.0` explicitly
// may lead to rounding errors.
export function ln1p(x) /* (x : ddouble) -> ddouble */  {
  var _x368 = x.hi;
  var _x367 = ((_x368) === Infinity);
  if (_x367) {
    return x;
  }
  else {
     
    var y = _lp__plus__rp_(one, x);
     
    var _x369 = one.hi;
    var _x370 = one.lo;
    var z = _lp__plus__rp_(y, Ddouble((-_x369), (-_x370)));
    var _x370 = z.hi;
    var _x369 = (_x370 === (0.0));
    if (_x369) {
      return x;
    }
    else {
      return _lp__star__rp_(ln(y), _lp__fs__rp_(x, z));
    }
  }
}
 
 
// Returns `ln(exp(x) + exp(y))`.
// Avoids overlow/underflow errors.
export function lnaddexp(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
  var _x374 = x.hi;
  var _x375 = y.hi;
  var _x373 = $std_num_float64.compare(_x374, _x375);
  if (_x373 === 2) {
    var _x376 = x.lo;
    var _x377 = y.lo;
    var _x372 = $std_num_float64.compare(_x376, _x377);
  }
  else {
    var _x372 = _x373;
  }
  var _x371 = $std_core._lp__eq__eq__4_rp_(_x372, $std_core_types.Eq);
  if (_x371) {
    return _lp__plus__rp_(x, dd_ln2);
  }
  else {
     
    var _x378 = y.hi;
    var _x379 = y.lo;
    var z = _lp__plus__rp_(x, Ddouble((-_x378), (-_x379)));
    var _x379 = z.hi;
    var _x378 = (_x379 > (0.0));
    if (_x378) {
      var _x380 = z.hi;
      var _x381 = z.lo;
      return _lp__plus__rp_(x, ln1p(exp(Ddouble((-_x380), (-_x381)))));
    }
    else {
      return _lp__plus__rp_(y, ln1p(exp(z)));
    }
  }
}
 
 
// Return the logarithm in some base `b` of a `:ddouble` `x`
export function log(x, base) /* (x : ddouble, base : ddouble) -> ddouble */  {
  return _lp__fs__rp_(ln(x), ln(base));
}
 
 
// The logarithm in base 10 of `x`.
export function log10(x) /* (x : ddouble) -> ddouble */  {
  return _lp__fs__rp_(ln(x), dd_ln10);
}
 
 
// The logarithm in base 2 of `x`.
export function log2(x) /* (x : ddouble) -> ddouble */  {
  return _lp__fs__rp_(ln(x), dd_ln2);
}
 
export function log2p1(x) /* (x : ddouble) -> ddouble */  {
  return _lp__star__rp_(dd_log2e, ln1p(x));
}
 
 
// Returns `log2( exp2(x) + exp2(y) )`.
// Avoids overlow/underflow errors.
export function logaddexp2(x, y) /* (x : ddouble, y : ddouble) -> ddouble */  {
  var _x385 = x.hi;
  var _x386 = y.hi;
  var _x384 = $std_num_float64.compare(_x385, _x386);
  if (_x384 === 2) {
    var _x387 = x.lo;
    var _x388 = y.lo;
    var _x383 = $std_num_float64.compare(_x387, _x388);
  }
  else {
    var _x383 = _x384;
  }
  var _x382 = $std_core._lp__eq__eq__4_rp_(_x383, $std_core_types.Eq);
  if (_x382) {
    return _lp__plus__rp_(x, one);
  }
  else {
     
    var _x389 = y.hi;
    var _x390 = y.lo;
    var z = _lp__plus__rp_(x, Ddouble((-_x389), (-_x390)));
    var _x390 = z.hi;
    var _x389 = (_x390 > (0.0));
    if (_x389) {
       
      var _x391 = z.hi;
      var _x392 = z.lo;
      var exp0_13169 = Ddouble((-_x391), (-_x392));
       
      var x3_13168 = exp(_lp__star__rp_(exp0_13169, ln(two)));
      return _lp__plus__rp_(x, _lp__star__rp_(dd_log2e, ln1p(x3_13168)));
    }
    else {
       
      var x5_13172 = exp(_lp__star__rp_(z, ln(two)));
      return _lp__plus__rp_(y, _lp__star__rp_(dd_log2e, ln1p(x5_13172)));
    }
  }
}
 
 
// Return if two `:ddouble`s are nearly equal with respect to some `epsilon` (=`8*dd-epsilon`).
// The epsilon is the nearest difference for numbers around 1.0. The routine automatically
// scales the epsilon for larger and smaller numbers, and for numbers close to zero.
export function nearly_eq(x, y, epsilon) /* (x : ddouble, y : ddouble, epsilon : optional<ddouble>) -> bool */  {
  var _x394 = x.hi;
  var _x395 = y.hi;
  var _x393 = $std_num_float64.compare(_x394, _x395);
  if (_x393 === 2) {
    var _x396 = x.lo;
    var _x397 = y.lo;
    var _x392 = $std_num_float64.compare(_x396, _x397);
  }
  else {
    var _x392 = _x393;
  }
  var _x391 = $std_core._lp__eq__eq__4_rp_(_x392, $std_core_types.Eq);
  if (_x391) {
    return true;
  }
  else {
     
    var _x398 = y.hi;
    var _x399 = y.lo;
    var x1_13178 = _lp__plus__rp_(x, Ddouble((-_x398), (-_x399)));
     
    var _x401 = x1_13178.hi;
    var _x400 = (_x401 < (0.0));
    if (_x400) {
      var _x402 = x1_13178.hi;
      var _x403 = x1_13178.lo;
      var diff = Ddouble((-_x402), (-_x403));
    }
    else {
      var diff = x1_13178;
    }
    var _x399 = x.hi;
    var _x398 = (_x399 === (0.0));
    if (_x398) {
       
      var x5_13187 = _lp__star__rp_(two, diff);
       
      var _x400 = (epsilon !== undefined) ? epsilon : dd_epsilon8;
      var y2_13188 = _lp__star__rp_(_x400, dd_min);
      var _x402 = x5_13187.hi;
      var _x403 = y2_13188.hi;
      var _x401 = $std_num_float64.compare(_x402, _x403);
      if (_x401 === 2) {
        var _x404 = x5_13187.lo;
        var _x405 = y2_13188.lo;
        var _x400 = $std_num_float64.compare(_x404, _x405);
      }
      else {
        var _x400 = _x401;
      }
      return $std_core._lp__eq__eq__4_rp_(_x400, $std_core_types.Lt);
    }
    else {
      var _x407 = y.hi;
      var _x406 = (_x407 === (0.0));
      if (_x406) {
         
        var x7_13192 = _lp__star__rp_(two, diff);
         
        var _x408 = (epsilon !== undefined) ? epsilon : dd_epsilon8;
        var y3_13193 = _lp__star__rp_(_x408, dd_min);
        var _x410 = x7_13192.hi;
        var _x411 = y3_13193.hi;
        var _x409 = $std_num_float64.compare(_x410, _x411);
        if (_x409 === 2) {
          var _x412 = x7_13192.lo;
          var _x413 = y3_13193.lo;
          var _x408 = $std_num_float64.compare(_x412, _x413);
        }
        else {
          var _x408 = _x409;
        }
        return $std_core._lp__eq__eq__4_rp_(_x408, $std_core_types.Lt);
      }
      else {
        var _x417 = diff.hi;
        var _x418 = dd_min.hi;
        var _x416 = $std_num_float64.compare(_x417, _x418);
        if (_x416 === 2) {
          var _x419 = diff.lo;
          var _x420 = dd_min.lo;
          var _x415 = $std_num_float64.compare(_x419, _x420);
        }
        else {
          var _x415 = _x416;
        }
        var _x414 = $std_core._lp__eq__eq__4_rp_(_x415, $std_core_types.Lt);
        if (_x414) {
           
          var x9_13196 = _lp__star__rp_(two, diff);
           
          var _x421 = (epsilon !== undefined) ? epsilon : dd_epsilon8;
          var y5_13197 = _lp__star__rp_(_x421, dd_min);
          var _x423 = x9_13196.hi;
          var _x424 = y5_13197.hi;
          var _x422 = $std_num_float64.compare(_x423, _x424);
          if (_x422 === 2) {
            var _x425 = x9_13196.lo;
            var _x426 = y5_13197.lo;
            var _x421 = $std_num_float64.compare(_x425, _x426);
          }
          else {
            var _x421 = _x422;
          }
          return $std_core._lp__eq__eq__4_rp_(_x421, $std_core_types.Lt);
        }
        else {
           
          var sum0 = _lp__plus__rp_(abs(x), abs(y));
           
          var _x431 = sum0.hi;
          var _x432 = dd_max.hi;
          var _x430 = $std_num_float64.compare(_x431, _x432);
          if (_x430 === 2) {
            var _x433 = sum0.lo;
            var _x434 = dd_max.lo;
            var _x429 = $std_num_float64.compare(_x433, _x434);
          }
          else {
            var _x429 = _x430;
          }
          var _x428 = $std_core._lp__eq__eq__4_rp_(_x429, $std_core_types.Gt);
          var _x427 = (_x428) ? dd_max : sum0;
          var x10_13198 = _lp__fs__rp_(_lp__star__rp_(two, diff), _x427);
          var _x429 = x10_13198.hi;
          var _x431 = (epsilon !== undefined) ? epsilon : dd_epsilon8;
          var _x430 = _x431.hi;
          var _x428 = $std_num_float64.compare(_x429, _x430);
          if (_x428 === 2) {
            var _x432 = x10_13198.lo;
            var _x434 = (epsilon !== undefined) ? epsilon : dd_epsilon8;
            var _x433 = _x434.lo;
            var _x427 = $std_num_float64.compare(_x432, _x433);
          }
          else {
            var _x427 = _x428;
          }
          return $std_core._lp__eq__eq__4_rp_(_x427, $std_core_types.Lt);
        }
      }
    }
  }
}
 
 
// The `n`-th root of a `:ddouble` number `x`.
// `n` must be positive, and if `n` is even, then
// `x` must not be negative.
export function nroot(x, n) /* (x : ddouble, n : int) -> ddouble */  {
  if ($std_core._int_eq(n,2)) {
    return sqrt(x);
  }
  else {
    if ($std_core._int_eq(n,1)) {
      return x;
    }
    else {
      if ($std_core._int_le(n,0)) {
        return dd_nan;
      }
      else {
         
        var b_16946 = $std_core._int_isodd(n);
        if (b_16946) {
          var _x436 = x.hi;
          var _x435 = (_x436 === (0.0));
          if (_x435) {
            return zero;
          }
          else {
             
            var r0 = abs(x);
             
            var _x437 = r0.hi;
            var d4_13219 = Math.exp(((((-(Math.log(_x437)))) / ($std_core._int_to_double(n)))));
             
            var a00 = Ddouble(d4_13219, 0.0);
             
            var y0_13222 = _lp__star__rp_(r0, powi(a00, n));
             
            var _x438 = y0_13222.hi;
            var _x439 = y0_13222.lo;
            var a10 = _lp__plus__rp_(a00, _lp__fs__rp_(_lp__star__rp_(a00, _lp__plus__rp_(one, Ddouble((-_x438), (-_x439)))), ddouble_int_exp(n, 0)));
            var _x439 = x.hi;
            var _x438 = (_x439 < (0.0));
            if (_x438) {
              var _x440 = one.hi;
              var _x441 = one.lo;
              var _x437 = Ddouble((-_x440), (-_x441));
            }
            else {
              var _x437 = one;
            }
            return _lp__fs__rp_(_x437, a10);
          }
        }
        else {
          var _x443 = x.hi;
          var _x442 = (_x443 < (0.0));
          if (_x442) {
            return dd_nan;
          }
          else {
            var _x445 = x.hi;
            var _x444 = (_x445 === (0.0));
            if (_x444) {
              return zero;
            }
            else {
               
              var r = abs(x);
               
              var _x446 = r.hi;
              var d1_13209 = Math.exp(((((-(Math.log(_x446)))) / ($std_core._int_to_double(n)))));
               
              var a0 = Ddouble(d1_13209, 0.0);
               
              var y_13212 = _lp__star__rp_(r, powi(a0, n));
               
              var _x447 = y_13212.hi;
              var _x448 = y_13212.lo;
              var a1 = _lp__plus__rp_(a0, _lp__fs__rp_(_lp__star__rp_(a0, _lp__plus__rp_(one, Ddouble((-_x447), (-_x448)))), ddouble_int_exp(n, 0)));
              var _x448 = x.hi;
              var _x447 = (_x448 < (0.0));
              if (_x447) {
                var _x449 = one.hi;
                var _x450 = one.lo;
                var _x446 = Ddouble((-_x449), (-_x450));
              }
              else {
                var _x446 = one;
              }
              return _lp__fs__rp_(_x446, a1);
            }
          }
        }
      }
    }
  }
}
 
export var one_half;
var one_half = Ddouble(0.5, 0.0);
 
 
// Round a `:ddouble` to a specified precision.
// Uses `round` if the precision is smaller or equal to zero.
export function round_to_prec(x, prec) /* (x : ddouble, prec : int) -> ddouble */  {
  if ($std_core._int_le(prec,0)) {
    return round(x);
  }
  else {
    if ($std_core._int_gt(prec,31)) {
      return x;
    }
    else {
       
      var p = powi(ten, prec);
      return _lp__fs__rp_(round(_lp__star__rp_(x, p)), p);
    }
  }
}
 
 
// Show a `:ddouble` `x` with a given precision `prec` (=`-31`).
// The precision specifies the  number of digits after the dot (in either scientific of fixed-point notation).
// If the precision is negative, _at most_ `prec` digits are displayed, while for a positive
// precision, exactly `prec` digits behind the dot are displayed.
// This uses `show-fixed` when the exponent of `x` in scientific notation is larger than -5
// and smaller than the precision (or 15 in case of a negative precision), otherwise it uses `show-exp`.
export function show(x, prec) /* (x : ddouble, prec : optional<int>) -> string */  {
   
  var _x452 = x.hi;
  var _x451 = isFinite(_x452);
  if (_x451) {
    var _x453 = x.lo;
    var b_13228 = isFinite(_x453);
  }
  else {
    var b_13228 = false;
  }
  if (b_13228) {
    var _x451 = (prec !== undefined) ? prec : -31;
    return $std_num_decimal.show(decimal(x), _x451);
  }
  else {
    var _x452 = x.hi;
    return $std_core.show_1(_x452);
  }
}
 
 
/* Show a ddouble `x` with a given precision `prec` (=`-31`) in scientific notation.
The precision specifies the  number of digits after the dot, i.e.
the number of significant digits is `prec+1`.
If the precision is negative, _at most_ `prec` digits are displayed, and if
it is positive exactly `prec` digits are used.
```
> 1.1.ddouble.show-exp
"1.1000000000000000888178419700125"
> 1.1.ddouble.show-exp(-100)
"1.100000000000000088817841970012523233890533447265625"
> 1.1.ddouble.show-exp(5)
"1.10000"
> 1.1.ddouble.show-exp(-5)
"1.1"
```
.
*/
export function show_exp(x, prec) /* (x : ddouble, prec : optional<int>) -> string */  {
   
  var _x454 = x.hi;
  var _x453 = isFinite(_x454);
  if (_x453) {
    var _x455 = x.lo;
    var b_13230 = isFinite(_x455);
  }
  else {
    var b_13230 = false;
  }
  if (b_13230) {
    var _x453 = (prec !== undefined) ? prec : -31;
    return $std_num_decimal.show_exp(decimal(x), _x453);
  }
  else {
    var _x454 = x.hi;
    return $std_core.show_1(_x454);
  }
}
 
 
/* Show a ddouble `x` with a given precision `prec` (=`-31`) in fixed-point notation.
The precision specifies the  number of digits after the dot.
If the precision is negative, _at most_  `prec` digits after the dot are displayed,
while for a positive precision, exactly `prec` digits are used.
```
> 0.1.ddouble.show-fixed
"0.1000000000000000055511151231258"
> 0.1.ddouble.show-fixed(-100)
"0.1000000000000000055511151231257827021181583404541015625"
> 0.1.ddouble.show-fixed(5)
"0.10000"
> 0.1.ddouble.show-fixed(-5)
"0.1"
```
.
*/
export function show_fixed(x, prec) /* (x : ddouble, prec : optional<int>) -> string */  {
   
  var _x456 = x.hi;
  var _x455 = isFinite(_x456);
  if (_x455) {
    var _x457 = x.lo;
    var b_13232 = isFinite(_x457);
  }
  else {
    var b_13232 = false;
  }
  if (b_13232) {
    var _x455 = (prec !== undefined) ? prec : -31;
    return $std_num_decimal.show_fixed(decimal(x), _x455);
  }
  else {
    var _x456 = x.hi;
    return $std_core.show_1(_x456);
  }
}
 
 
/* Show a `:ddouble` `x` precisely as the sum of two `:float64`s
in [hexadecimal notation](https://books.google.com/books?id=FgMsCwAAQBAJ&pg=PA41).
Use this if you need to guarantee that you can parse back `:ddouble`s exactly,
i.e. `x == x.show-hex.ddouble`.
```
> 0.1.ddouble.show-hex
"0x1.999999999999Ap-4 + 0x0.0p+0"
> "0.1".ddouble.show-hex
"0x1.999999999999Ap-4 + -0x1.999999999999Ap-58"
> dd-pi.show-hex
"0x1.921FB54442D18p+1 + 0x1.1A62633145C07p-53"
> dd-max.show-hex
"0x1.FFFFFFFFFFFFFp+1023 + 0x1.FFFFFFFFFFFFFp+969"
```
.
*/
export function show_hex(x, width, use_capitals, pre) /* (x : ddouble, width : optional<int>, use-capitals : optional<bool>, pre : optional<string>) -> string */  {
   
  var _x458 = x.hi;
  var _x457 = isFinite(_x458);
  if (_x457) {
    var _x459 = x.lo;
    var b_13234 = isFinite(_x459);
  }
  else {
    var b_13234 = false;
  }
  if (b_13234) {
    var _x457 = x.hi;
    var _x458 = (width !== undefined) ? width : 1;
    var _x459 = (use_capitals !== undefined) ? use_capitals : true;
    var _x460 = (pre !== undefined) ? pre : "0x";
    var _x461 = x.lo;
    var _x462 = (width !== undefined) ? width : 1;
    var _x463 = (use_capitals !== undefined) ? use_capitals : true;
    var _x464 = (pre !== undefined) ? pre : "0x";
    return $std_core._lp__plus__plus__1_rp_($std_num_float64.show_hex(_x457, _x458, _x459, _x460), $std_core._lp__plus__plus__1_rp_(" + ", $std_num_float64.show_hex(_x461, _x462, _x463, _x464)));
  }
  else {
    var _x465 = x.hi;
    return $std_core.show_1(_x465);
  }
}
 
 
// Show a `:ddouble` as the sum of  `:float64`s with an optional precision.
// Note: use `show-hex` for reliable round-trip parsing.
export function show_sum(x, prec) /* (x : ddouble, prec : optional<int>) -> string */  {
   
  var _x467 = x.hi;
  var _x466 = isFinite(_x467);
  if (_x466) {
    var _x468 = x.lo;
    var b_13238 = isFinite(_x468);
  }
  else {
    var b_13238 = false;
  }
  if (b_13238) {
    var _x466 = x.hi;
    var _x467 = (prec !== undefined) ? prec : -17;
    var _x468 = x.lo;
    var _x469 = (prec !== undefined) ? prec : -17;
    return $std_core._lp__plus__plus__1_rp_($std_core.show_1(_x466, _x467), $std_core._lp__plus__plus__1_rp_(" + ", $std_core.show_1(_x468, _x469)));
  }
  else {
    var _x470 = x.hi;
    return $std_core.show_1(_x470);
  }
}
 
 
// The sine function of a given angle in radians.
export function sin(rad) /* (rad : ddouble) -> ddouble */  {
   
  var _this_13242 = sincos(rad);
  return _this_13242.fst;
}
 
 
// The tangent of a given angle in radians.
export function tan(rad) /* (rad : ddouble) -> ddouble */  {
  var _x471 = sincos(rad);
  return _lp__fs__rp_(_x471.fst, _x471.snd);
}
 
 
// The hyperbolic tangent of `x`.
export function tanh(x) /* (x : ddouble) -> ddouble */  {
  var _x473 = x.hi;
  var _x472 = (_x473 === (0.0));
  if (_x472) {
    return zero;
  }
  else {
     
    var x1_13246 = abs(x);
    var _x475 = x1_13246.hi;
    var _x474 = (_x475 > (5.0e-2));
    if (_x474) {
       
      var ex = exp(x);
       
      var iex = _lp__fs__rp_(one, ex);
      var _x477 = ex.hi;
      var _x476 = (_x477 === (0.0));
      if (_x476) {
        var _x478 = one.hi;
        var _x479 = one.lo;
        return Ddouble((-_x478), (-_x479));
      }
      else {
        var _x481 = ex.hi;
        var _x480 = ((_x481) === Infinity);
        if (_x480) {
          return one;
        }
        else {
          var _x482 = iex.hi;
          var _x483 = iex.lo;
          return _lp__fs__rp_(_lp__plus__rp_(ex, Ddouble((-_x482), (-_x483))), _lp__plus__rp_(ex, iex));
        }
      }
    }
    else {
       
      var s = sinh(x);
       
      var c = sqrt(_lp__plus__rp_(one, sqr(s)));
      return _lp__fs__rp_(s, c);
    }
  }
}
 
 
// Return if two `:ddouble`s are nearly equal with respect to an `epsilon` of `10*dd-epsilon`.
// See also `nearly-eq` which takes an explicit `epsilon`.
export function _lp__tilde__eq__rp_(x, y) /* (x : ddouble, y : ddouble) -> bool */  {
  return nearly_eq(x, y);
}