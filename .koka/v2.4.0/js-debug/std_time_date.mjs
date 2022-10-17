// Koka generated module: "std/time/date", koka version: 2.4.0
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
import * as $compat_array from './compat_array.mjs';
import * as $std_num_int64 from './std_num_int64.mjs';
import * as $std_num_float64 from './std_num_float64.mjs';
import * as $std_num_decimal from './std_num_decimal.mjs';
import * as $std_num_ddouble from './std_num_ddouble.mjs';
import * as $compat_string from './compat_string.mjs';
import * as $compat_flags from './compat_flags.mjs';
import * as $options from './options.mjs';
import * as $storage from './storage.mjs';
import * as $std_data_dict from './std_data_dict.mjs';
 
// externals
 
// type declarations
// type clock
export function Clock(hours, minutes, seconds) /* (hours : int, minutes : int, seconds : std/num/ddouble/ddouble) -> clock */  {
  return { hours: hours, minutes: minutes, seconds: seconds };
}
// type date
export function $Date(year, month, day) /* (year : int, month : int, day : int) -> date */  {
  return { year: year, month: month, day: day };
}
// type weekday
export const Mon = 1; // weekday
export const Tue = 2; // weekday
export const Wed = 3; // weekday
export const Thu = 4; // weekday
export const Fri = 5; // weekday
export const Sat = 6; // weekday
export const Sun = 7; // weekday
 
// declarations
 
 
// Automatically generated. Retrieves the `hours` constructor field of the `:clock` type.
export function hours(clock1) /* (clock : clock) -> int */  {
  return clock1.hours;
}
 
 
// Automatically generated. Retrieves the `minutes` constructor field of the `:clock` type.
export function minutes(clock1) /* (clock : clock) -> int */  {
  return clock1.minutes;
}
 
 
// Automatically generated. Retrieves the `seconds` constructor field of the `:clock` type.
export function seconds(clock1) /* (clock : clock) -> std/num/ddouble/ddouble */  {
  return clock1.seconds;
}
 
export function _copy(_this, hours0, minutes0, seconds0) /* (clock, hours : optional<int>, minutes : optional<int>, seconds : optional<std/num/ddouble/ddouble>) -> clock */  {
  if (hours0 !== undefined) {
    var _x0 = hours0;
  }
  else {
    var _x0 = _this.hours;
  }
  if (minutes0 !== undefined) {
    var _x1 = minutes0;
  }
  else {
    var _x1 = _this.minutes;
  }
  if (seconds0 !== undefined) {
    var _x2 = seconds0;
  }
  else {
    var _x2 = _this.seconds;
  }
  return Clock(_x0, _x1, _x2);
}
 
 
// Automatically generated. Retrieves the `year` constructor field of the `:date` type.
export function year(date) /* (date : date) -> int */  {
  return date.year;
}
 
 
// Automatically generated. Retrieves the `month` constructor field of the `:date` type.
export function month(date) /* (date : date) -> int */  {
  return date.month;
}
 
 
// Automatically generated. Retrieves the `day` constructor field of the `:date` type.
export function day(date) /* (date : date) -> int */  {
  return date.day;
}
 
export function _copy_1(_this, year0, month0, day0) /* (date, year : optional<int>, month : optional<int>, day : optional<int>) -> date */  {
  if (year0 !== undefined) {
    var _x3 = year0;
  }
  else {
    var _x3 = _this.year;
  }
  if (month0 !== undefined) {
    var _x4 = month0;
  }
  else {
    var _x4 = _this.month;
  }
  if (day0 !== undefined) {
    var _x5 = day0;
  }
  else {
    var _x5 = _this.day;
  }
  return $Date(_x3, _x4, _x5);
}
 
 
// Automatically generated. Tests for the `Mon` constructor of the `:weekday` type.
export function is_mon(weekday0) /* (weekday : weekday) -> bool */  {
  return (weekday0 === 1);
}
 
 
// Automatically generated. Tests for the `Tue` constructor of the `:weekday` type.
export function is_tue(weekday0) /* (weekday : weekday) -> bool */  {
  return (weekday0 === 2);
}
 
 
// Automatically generated. Tests for the `Wed` constructor of the `:weekday` type.
export function is_wed(weekday0) /* (weekday : weekday) -> bool */  {
  return (weekday0 === 3);
}
 
 
// Automatically generated. Tests for the `Thu` constructor of the `:weekday` type.
export function is_thu(weekday0) /* (weekday : weekday) -> bool */  {
  return (weekday0 === 4);
}
 
 
// Automatically generated. Tests for the `Fri` constructor of the `:weekday` type.
export function is_fri(weekday0) /* (weekday : weekday) -> bool */  {
  return (weekday0 === 5);
}
 
 
// Automatically generated. Tests for the `Sat` constructor of the `:weekday` type.
export function is_sat(weekday0) /* (weekday : weekday) -> bool */  {
  return (weekday0 === 6);
}
 
 
// Automatically generated. Tests for the `Sun` constructor of the `:weekday` type.
export function is_sun(weekday0) /* (weekday : weekday) -> bool */  {
  return (weekday0 === 7);
}
 
 
// Convert a `:weekday` to an `:int` using the ISO definition which starts at Monday as 1,
// up to Sunday as 7.
export function int(wd) /* (wd : weekday) -> int */  {
  if (wd === 1) {
    return 1;
  }
  else if (wd === 2) {
    return 2;
  }
  else if (wd === 3) {
    return 3;
  }
  else if (wd === 4) {
    return 4;
  }
  else if (wd === 5) {
    return 5;
  }
  else if (wd === 6) {
    return 6;
  }
  else {
    return 7;
  }
}
 
 
// Add two dates field-wise together.
export function _lp__plus__rp_(d1, d2) /* (d1 : date, d2 : date) -> date */  {
  var _x6 = d1.year;
  var _x7 = d2.year;
  var _x8 = d1.month;
  var _x9 = d2.month;
  var _x10 = d1.day;
  var _x11 = d2.day;
  return $Date($std_core._int_add(_x6,_x7), $std_core._int_add(_x8,_x9), $std_core._int_add(_x10,_x11));
}
 
 
// Add two clock together.
export function _lp__plus__1_rp_(c, d) /* (c : clock, d : clock) -> clock */  {
  var _x12 = c.hours;
  var _x13 = d.hours;
  var _x14 = c.minutes;
  var _x15 = d.minutes;
  var _x16 = c.seconds;
  var _x17 = d.seconds;
  return Clock($std_core._int_add(_x12,_x13), $std_core._int_add(_x14,_x15), $std_num_ddouble._lp__plus__rp_(_x16, _x17));
}
 
 
// Convert a weekday number to a `:weekday`(starting at Monday (=1) up to Sunday (=7)).
// Takes the integer `i - 1` modulo 7, so `0` or `14` also become Sunday etc.
export function weekday(i) /* (i : int) -> weekday */  {
   
  var d = $std_core._int_mod(($std_core._int_sub(i,1)),7);
  if ($std_core._int_eq(d,0)) {
    return Mon;
  }
  else {
    if ($std_core._int_eq(d,1)) {
      return Tue;
    }
    else {
      if ($std_core._int_eq(d,2)) {
        return Wed;
      }
      else {
        if ($std_core._int_eq(d,3)) {
          return Thu;
        }
        else {
          if ($std_core._int_eq(d,4)) {
            return Fri;
          }
          else {
            return ($std_core._int_eq(d,5)) ? Sat : Sun;
          }
        }
      }
    }
  }
}
 
 
// Return the `:weekday` that comes `n` days after week day `wd`.
export function _lp__plus__2_rp_(wd, n) /* (wd : weekday, n : int) -> weekday */  {
   
  var x_5622 = int(wd);
  return weekday($std_core._int_add(x_5622,n));
}
 
 
// Return the `:weekday` that comes `n` days before week day `wd`.
export function _lp__dash__rp_(wd, n) /* (wd : weekday, n : int) -> weekday */  {
   
  var x_5624 = int(wd);
  return weekday($std_core._int_sub(x_5624,n));
}
 
 
// Return the difference between two week days:\
// `wd2 == wd1 + (wd2 - wd1)`
export function _lp__dash__1_rp_(wd1, wd2) /* (wd1 : weekday, wd2 : weekday) -> int */  {
   
  var x_5626 = int(wd1);
   
  var y_5627 = int(wd2);
  return $std_core._int_mod(($std_core._int_sub(x_5626,y_5627)),7);
}
 
 
// Compare two dates by fields.
export function compare(d, e) /* (d : date, e : date) -> order */  {
  var _x19 = d.year;
  var _x20 = e.year;
  var _x18 = $std_core._int_compare(_x19,_x20);
  if (_x18 === 2) {
    var _x22 = d.month;
    var _x23 = e.month;
    var _x21 = $std_core._int_compare(_x22,_x23);
    if (_x21 === 2) {
      var _x24 = d.day;
      var _x25 = e.day;
      return $std_core._int_compare(_x24,_x25);
    }
    else {
      return _x21;
    }
  }
  else {
    return _x18;
  }
}
 
export function _lp__eq__eq__rp_(i, j) /* (i : date, j : date) -> bool */  {
  return $std_core._lp__eq__eq__4_rp_(compare(i, j), $std_core_types.Eq);
}
 
 
// Return the total seconds of a `:clock` assuming 60 seconds per
// minute and 60 minutes per hour.
export function total_seconds(c) /* (c : clock) -> std/num/ddouble/ddouble */  {
   
  var _x26 = c.hours;
  var x_5635 = $std_core._int_mul(_x26,60);
   
  var _x27 = c.minutes;
  var i_5634 = $std_core._int_mul(($std_core._int_add(x_5635,_x27)),60);
  var _x26 = c.seconds;
  return $std_num_ddouble._lp__plus__rp_($std_num_ddouble.ddouble_int_exp(i_5634, 0), _x26);
}
 
 
// Compare two clocks as by their total seconds.
export function compare_1(c, d) /* (c : clock, d : clock) -> order */  {
   
  var x_5640 = total_seconds(c);
   
  var y_5641 = total_seconds(d);
  var _x28 = x_5640.hi;
  var _x29 = y_5641.hi;
  var _x27 = $std_num_float64.compare(_x28, _x29);
  if (_x27 === 2) {
    var _x30 = x_5640.lo;
    var _x31 = y_5641.lo;
    return $std_num_float64.compare(_x30, _x31);
  }
  else {
    return _x27;
  }
}
 
export function _lp__eq__eq__1_rp_(i, j) /* (i : clock, j : clock) -> bool */  {
  return $std_core._lp__eq__eq__4_rp_(compare_1(i, j), $std_core_types.Eq);
}
 
 
// Compare weekdays.
export function compare_2(wd1, wd2) /* (wd1 : weekday, wd2 : weekday) -> order */  {
  return $std_core._int_compare((int(wd1)),(int(wd2)));
}
 
export function _lp__eq__eq__2_rp_(i, j) /* (i : weekday, j : weekday) -> bool */  {
  return $std_core._lp__eq__eq__4_rp_($std_core._int_compare((int(i)),(int(j))), $std_core_types.Eq);
}
 
 
// Create a clock from a seconds as an `:int` with an optional fraction.
// Normalizes the clock with seconds and minutes under 60 but
// adds the fraction as is to the final seconds, so that might
// be `>= 60` if the fraction `>= 1.0`;
export function clock_2(seconds0, frac) /* (seconds : int, frac : optional<std/num/ddouble/ddouble>) -> clock */  {
  var _x32 = $std_core._int_divmod(seconds0,60);
  var _x33 = $std_core._int_divmod((_x32.fst),60);
  var _x34 = (frac !== undefined) ? frac : $std_num_ddouble.zero;
  return Clock(_x33.fst, _x33.snd, $std_num_ddouble._lp__plus__rp_($std_num_ddouble.ddouble_int_exp(_x32.snd, 0), _x34));
}
 
 
// Create a clock from seconds; normalizes the clock with seconds and minutes under 60.
export function clock(seconds0) /* (seconds : std/num/ddouble/ddouble) -> clock */  {
   
  var seconds1_5645 = $std_num_ddouble.int($std_num_ddouble.floor(seconds0));
   
  var frac_5646 = $std_num_ddouble.ffraction(seconds0);
  var _x35 = $std_core._int_divmod(seconds1_5645,60);
  var _x36 = $std_core._int_divmod((_x35.fst),60);
  var _x37 = (frac_5646 !== undefined) ? frac_5646 : $std_num_ddouble.zero;
  return Clock(_x36.fst, _x36.snd, $std_num_ddouble._lp__plus__rp_($std_num_ddouble.ddouble_int_exp(_x35.snd, 0), _x37));
}
 
 
// Create a clock from a seconds as an `:int` with an optional fraction.
// Normalizes the clock with seconds and minutes under 60 but
// adds the fraction as is to the final seconds, so that might
// be `>= 60` if the fraction `>= 1.0`;
export function clock_1(seconds0, frac) /* (seconds : int, frac : float64) -> clock */  {
  var _x38 = $std_core._int_divmod(seconds0,60);
  var _x39 = $std_core._int_divmod((_x38.fst),60);
  return Clock(_x39.fst, _x39.snd, $std_num_ddouble._lp__plus__rp_($std_num_ddouble.ddouble_int_exp(_x38.snd, 0), $std_num_ddouble.Ddouble(frac, 0.0)));
}
 
export function clock_3(seconds0, leap) /* (seconds : std/num/ddouble/ddouble, leap : int) -> clock */  {
   
  var seconds1_5652 = $std_num_ddouble.int($std_num_ddouble.floor(seconds0));
   
  var frac_5653 = $std_num_ddouble._lp__plus__rp_($std_num_ddouble.ffraction(seconds0), $std_num_ddouble.ddouble_int_exp(leap, 0));
  var _x40 = $std_core._int_divmod(seconds1_5652,60);
  var _x41 = $std_core._int_divmod((_x40.fst),60);
  var _x42 = (frac_5653 !== undefined) ? frac_5653 : $std_num_ddouble.zero;
  return Clock(_x41.fst, _x41.snd, $std_num_ddouble._lp__plus__rp_($std_num_ddouble.ddouble_int_exp(_x40.snd, 0), _x42));
}
 
export function _lp__excl__eq__rp_(i, j) /* (i : date, j : date) -> bool */  {
  return $std_core._lp__excl__eq__4_rp_(compare(i, j), $std_core_types.Eq);
}
 
export function _lp__excl__eq__1_rp_(i, j) /* (i : clock, j : clock) -> bool */  {
  return $std_core._lp__excl__eq__4_rp_(compare_1(i, j), $std_core_types.Eq);
}
 
export function _lp__excl__eq__2_rp_(i, j) /* (i : weekday, j : weekday) -> bool */  {
  return $std_core._lp__excl__eq__4_rp_($std_core._int_compare((int(i)),(int(j))), $std_core_types.Eq);
}
 
export function _lp__lt__rp_(i, j) /* (i : date, j : date) -> bool */  {
  return $std_core._lp__eq__eq__4_rp_(compare(i, j), $std_core_types.Lt);
}
 
export function _lp__lt__1_rp_(i, j) /* (i : clock, j : clock) -> bool */  {
  return $std_core._lp__eq__eq__4_rp_(compare_1(i, j), $std_core_types.Lt);
}
 
export function _lp__lt__2_rp_(i, j) /* (i : weekday, j : weekday) -> bool */  {
  return $std_core._lp__eq__eq__4_rp_($std_core._int_compare((int(i)),(int(j))), $std_core_types.Lt);
}
 
export function _lp__lt__eq__rp_(i, j) /* (i : date, j : date) -> bool */  {
  return $std_core._lp__excl__eq__4_rp_(compare(i, j), $std_core_types.Gt);
}
 
export function _lp__lt__eq__1_rp_(i, j) /* (i : clock, j : clock) -> bool */  {
  return $std_core._lp__excl__eq__4_rp_(compare_1(i, j), $std_core_types.Gt);
}
 
export function _lp__lt__eq__2_rp_(i, j) /* (i : weekday, j : weekday) -> bool */  {
  return $std_core._lp__excl__eq__4_rp_($std_core._int_compare((int(i)),(int(j))), $std_core_types.Gt);
}
 
export function _lp__gt__rp_(i, j) /* (i : date, j : date) -> bool */  {
  return $std_core._lp__eq__eq__4_rp_(compare(i, j), $std_core_types.Gt);
}
 
export function _lp__gt__1_rp_(i, j) /* (i : clock, j : clock) -> bool */  {
  return $std_core._lp__eq__eq__4_rp_(compare_1(i, j), $std_core_types.Gt);
}
 
export function _lp__gt__2_rp_(i, j) /* (i : weekday, j : weekday) -> bool */  {
  return $std_core._lp__eq__eq__4_rp_($std_core._int_compare((int(i)),(int(j))), $std_core_types.Gt);
}
 
export function _lp__gt__eq__rp_(i, j) /* (i : date, j : date) -> bool */  {
  return $std_core._lp__excl__eq__4_rp_(compare(i, j), $std_core_types.Lt);
}
 
export function _lp__gt__eq__1_rp_(i, j) /* (i : clock, j : clock) -> bool */  {
  return $std_core._lp__excl__eq__4_rp_(compare_1(i, j), $std_core_types.Lt);
}
 
export function _lp__gt__eq__2_rp_(i, j) /* (i : weekday, j : weekday) -> bool */  {
  return $std_core._lp__excl__eq__4_rp_($std_core._int_compare((int(i)),(int(j))), $std_core_types.Lt);
}
 
 
// The zero clock
export var clock0;
var clock0 = Clock(0, 0, $std_num_ddouble.zero);
 
 
// Return the ISO calendar date of Easter in a given year (Algorithm by [J.M. Oudin](http://aa.usno.navy.mil/faq/docs/easter.php)).
export function easter(year0) /* (year : int) -> date */  {
   
  var c = $std_core._int_div(year0,100);
   
  var y_5667 = $std_core._int_mul(19,($std_core._int_div(year0,19)));
   
  var n = $std_core._int_sub(year0,y_5667);
   
  var k = $std_core._int_div(($std_core._int_sub(c,17)),25);
   
  var y4_5677 = $std_core._int_div(c,4);
   
  var x3_5674 = $std_core._int_sub(c,y4_5677);
   
  var y3_5675 = $std_core._int_div(($std_core._int_sub(c,k)),3);
   
  var x2_5672 = $std_core._int_sub(x3_5674,y3_5675);
   
  var y2_5673 = $std_core._int_mul(19,n);
   
  var x1_5670 = $std_core._int_add(x2_5672,y2_5673);
   
  var i0 = $std_core._int_add(x1_5670,15);
   
  var y6_5681 = $std_core._int_mul(30,($std_core._int_div(i0,30)));
   
  var i1 = $std_core._int_sub(i0,y6_5681);
   
  var y8_5685 = $std_core._int_mul(($std_core._int_mul(($std_core._int_div(i1,28)),($std_core._int_div(29,($std_core._int_add(i1,1)))))),($std_core._int_div(($std_core._int_sub(21,n)),11)));
   
  var y7_5683 = $std_core._int_mul(($std_core._int_div(i1,28)),($std_core._int_sub(1,y8_5685)));
   
  var i = $std_core._int_sub(i1,y7_5683);
   
  var y15_5699 = $std_core._int_div(year0,4);
   
  var x14_5696 = $std_core._int_add(year0,y15_5699);
   
  var x13_5694 = $std_core._int_add(x14_5696,i);
   
  var x12_5692 = $std_core._int_add(x13_5694,2);
   
  var x11_5690 = $std_core._int_sub(x12_5692,c);
   
  var y11_5691 = $std_core._int_div(c,4);
   
  var j0 = $std_core._int_add(x11_5690,y11_5691);
   
  var y16_5701 = $std_core._int_mul(7,($std_core._int_div(j0,7)));
   
  var j = $std_core._int_sub(j0,y16_5701);
   
  var l = $std_core._int_sub(i,j);
   
  var y18_5705 = $std_core._int_div(($std_core._int_add(l,40)),44);
   
  var m = $std_core._int_add(3,y18_5705);
   
  var x20_5708 = $std_core._int_add(l,28);
   
  var y20_5709 = $std_core._int_mul(31,($std_core._int_div(m,4)));
   
  var d = $std_core._int_sub(x20_5708,y20_5709);
  return $Date(year0, m, d);
}
 
 
// Is this a zero clock?
export function is_zero(c) /* (c : clock) -> bool */  {
  var _x44 = c.hours;
  var _x43 = $std_core._int_iszero(_x44);
  if (_x43) {
    var _x46 = c.minutes;
    var _x45 = $std_core._int_iszero(_x46);
    if (_x45) {
      var _x47 = c.seconds.hi;
      return (_x47 === (0.0));
    }
    else {
      return false;
    }
  }
  else {
    return false;
  }
}
 
 
// Return the fraction of the seconds as milli-seconds (10^-3^).
export function milli_seconds(c) /* (c : clock) -> int */  {
   
  var _x48 = c.seconds;
  var x_5717 = $std_num_ddouble.fraction(_x48);
   
  var _x49 = x_5717.hi;
  var d_5716 = (_x49 * (1000.0));
  var _x48 = ((d_5716 >= (0.0))) ? Math.floor(d_5716) : Math.ceil(d_5716);
  return $std_core._int_double(_x48);
}
 
 
// Return the fraction of seconds as nano-seconds ((10^-9^).
export function nano_seconds(c) /* (c : clock) -> int */  {
   
  var _x49 = c.seconds;
  var x_5720 = $std_num_ddouble.fraction(_x49);
   
  var _x50 = x_5720.hi;
  var d_5719 = (_x50 * (1.0e9));
  var _x49 = ((d_5719 >= (0.0))) ? Math.floor(d_5719) : Math.ceil(d_5719);
  return $std_core._int_double(_x49);
}
 
 
// Round a clock time to a certain number of digits precision (of the fraction of seconds) (default `9`, nano seconds).
export function round_to_prec(c, prec) /* (c : clock, prec : optional<int>) -> clock */  {
  var _x50 = c.hours;
  var _x51 = c.minutes;
  var _x52 = c.seconds;
  var _x53 = (prec !== undefined) ? prec : 9;
  return Clock(_x50, _x51, $std_num_ddouble.round_to_prec(_x52, _x53));
}
 
 
// Show seconds
export function show_seconds(secs, max_prec, secs_width, unit) /* (secs : std/num/ddouble/ddouble, max-prec : optional<int>, secs-width : optional<int>, unit : optional<string>) -> string */  {
   
  var _x54 = (max_prec !== undefined) ? max_prec : 9;
  var s = $std_num_ddouble.show_fixed(secs, $std_core._int_negate(($std_core._int_abs(_x54))));
  var _x54 = $std_core.find_1(s, ".");
  if (_x54 === null) {
    var _x55 = (secs_width !== undefined) ? secs_width : 1;
    return $std_core.pad_left(s, _x55, 0x0030);
  }
  else {
     
    var f = $std_core.string_3($std_core.after(_x54.value));
     
    var x_5725 = $std_core.count_1(f);
     
    var len3 = $std_core._int_mul(($std_core._int_div(($std_core._int_add(x_5725,2)),3)),3);
    var _x56 = $std_core.Sslice(_x54.value.str, 0, _x54.value.start);
    var _x57 = (secs_width !== undefined) ? secs_width : 1;
    var _x58 = (unit !== undefined) ? unit : "";
    return $std_core._lp__plus__plus__1_rp_($std_core.pad_left($std_core.string_3(_x56), _x57, 0x0030), $std_core._lp__plus__plus__1_rp_(".", $std_core._lp__plus__plus__1_rp_($std_core.pad_right(f, len3, 0x0030), _x58)));
  }
}
 
 
// pad with zeros
export function show0(i, width) /* (i : int, width : optional<int>) -> string */  {
  var _x59 = (width !== undefined) ? width : 2;
  return $std_core.pad_left($std_core.show(i), _x59, 0x0030);
}
 
 
// Show a year in ISO format (using 5+ digits and explicit sign for years < 0 or years > 9999)).
export function show_year(year0) /* (year : int) -> string */  {
  if ($std_core._int_gt(year0,9999)) {
     
    var i_5728 = $std_core._int_abs(year0);
    return $std_core._lp__plus__plus__1_rp_("+", $std_core.pad_left($std_core.show(i_5728), 5, 0x0030));
  }
  else {
     
    var x_17067 = $std_core._int_sign(year0);
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
       
      var i1_5731 = $std_core._int_abs(year0);
      return $std_core._lp__plus__plus__1_rp_("-", $std_core.pad_left($std_core.show(i1_5731), 5, 0x0030));
    }
    else {
       
      var i2_5733 = $std_core._int_abs(year0);
      return $std_core._lp__plus__plus__1_rp_("", $std_core.pad_left($std_core.show(i2_5733), 4, 0x0030));
    }
  }
}
 
 
// Show a date in ISO format. `Date(2000,1,1).show == "2000-01-01"`.
// Takes an optional `month-prefix` (=`""`) that is used by the ISO week
// and month calendar to add a `"W"` or `"M"` prefix respectively.
export function show(d, month_prefix) /* (d : date, month-prefix : optional<string>) -> string */  {
   
  var _x63 = (month_prefix !== undefined) ? month_prefix : "";
  var _x62 = (_x63 === ("W"));
  var day_width = (_x62) ? 1 : 2;
  var _x62 = d.year;
  var _x63 = (month_prefix !== undefined) ? month_prefix : "";
  var _x64 = d.month;
  var _x66 = undefined;
  var _x65 = (_x66 !== undefined) ? _x66 : 2;
  var _x67 = d.day;
  return $std_core._lp__plus__plus__1_rp_(show_year(_x62), $std_core._lp__plus__plus__1_rp_("-", $std_core._lp__plus__plus__1_rp_(_x63, $std_core._lp__plus__plus__1_rp_($std_core.pad_left($std_core.show(_x64), _x65, 0x0030), $std_core._lp__plus__plus__1_rp_("-", $std_core.pad_left($std_core.show(_x67), day_width, 0x0030))))));
}
 
 
// Show a clock in ISO format up to an optional maximum precision (=`9`).\
// `Clock(23,30,fixed(1.123)).show == "23:30:01.123"`\
// `Clock(23,30,fixed(1.123)).show(0) == "23:30:01"`
export function show_1(c, prec) /* (c : clock, prec : optional<int>) -> string */  {
  var _x68 = c.hours;
  var _x70 = undefined;
  var _x69 = (_x70 !== undefined) ? _x70 : 2;
  var _x71 = c.minutes;
  var _x73 = undefined;
  var _x72 = (_x73 !== undefined) ? _x73 : 2;
  var _x74 = c.seconds;
  var _x75 = (prec !== undefined) ? prec : 9;
  return $std_core._lp__plus__plus__1_rp_($std_core.pad_left($std_core.show(_x68), _x69, 0x0030), $std_core._lp__plus__plus__1_rp_(":", $std_core._lp__plus__plus__1_rp_($std_core.pad_left($std_core.show(_x71), _x72, 0x0030), $std_core._lp__plus__plus__1_rp_(":", show_seconds(_x74, _x75, 2)))));
}
 
 
// Show a `:weekday` as an English string (`Sun.show == "Sunday"`).
export function show_2(wd) /* (wd : weekday) -> string */  {
  if (wd === 1) {
    return "Monday";
  }
  else if (wd === 2) {
    return "Tuesday";
  }
  else if (wd === 3) {
    return "Wednesday";
  }
  else if (wd === 4) {
    return "Thursday";
  }
  else if (wd === 5) {
    return "Friday";
  }
  else if (wd === 6) {
    return "Saturday";
  }
  else {
    return "Sunday";
  }
}
 
 
// Show a `:weekday` as a 3 letter English string (`Sun.show-short == "Sun"`)
export function show_short(wd) /* (wd : weekday) -> string */  {
  return $std_core.string_3($std_core.first(show_2(wd), 3));
}
 
 
// Create an ISO weekdate where the "month" is the ISO week number.
export function weekdate(year0, month0, weekday0) /* (year : int, month : int, weekday : weekday) -> date */  {
  return $Date(year0, month0, int(weekday0));
}
 
 
// Return the whole seconds part of a `:clock`.
export function whole_seconds(c) /* (c : clock) -> int */  {
  var _x78 = c.seconds.hi;
  var _x77 = (_x78 < (0.0));
  if (_x77) {
    var _x79 = c.seconds;
    var _x76 = $std_num_ddouble.ceiling(_x79);
  }
  else {
    var _x80 = c.seconds;
    var _x76 = $std_num_ddouble.floor(_x80);
  }
  return $std_num_ddouble.int(_x76);
}