// Koka generated module: "std/core", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
 
// externals
/*---------------------------------------------------------------------------
  Copyright 2012-2021, Microsoft Research, Daan Leijen.
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the LICENSE file at the root of this distribution.
---------------------------------------------------------------------------*/
var _host = "unknown"
if (typeof window !== 'undefined' && window.document) {
  _host = "browser";
}
else if (typeof importScripts !== 'undefined') {
  _host = "webworker"
}
else if (typeof process !== undefined) {
  _host = "node"
}
/*------------------------------------------------
  Number formatting
------------------------------------------------*/
function _double_show_special(d) {
  if (isNaN(d)) {
    return "nan"
  }
  else if (d === -Infinity) {
    return "-inf"
  }
  else if (d === Infinity) {
    return "inf"
  }
  else {
    return "nan"
  }
}
function _double_fix_exp(s) {
  // an exponent has at least 2 digits (following the C standard)
  return s.replace(/([eE][\+\-])(\d)$/,function(m,p1,p2){ return (p2==="0" ? "" : p1 + "0" + p2); });
}
function _double_show_exp(d,fractionDigits) {
  var s;
  if (!isFinite(d)) {
    s = _double_show_special(d);
  }
  else if (d===0.0 && Object.is(d,-0.0)) {
    s = "-0";
  }
  else if (fractionDigits < 0) {
    // use at most |fractionDigits|
    s = d.toExponential();
  }
  else {
    // use exactly |fractionDigits|.
    if (fractionDigits > 20) fractionDigits = 20;
    s = d.toExponential(fractionDigits);
  }
  return _double_fix_exp(s);
}
function _double_show_fixed(d, fractionDigits) {
  var dabs = (d < 0.0 ? -d : d);
  if (!isFinite(d)) {
    return _double_show_special(d);
  }
  else if (dabs < 1.0e-15 || dabs > 1.0e+21) {
    return _double_show_exp(d,fractionDigits);
  }
  else if (fractionDigits < 0) {
    // use at most |fractionDigits|
    var s = d.toFixed(-fractionDigits);              // show at full precision
    var cap = /^([\-\+]?\d+)(\.\d+)$/.exec(s);
    if (!cap) return _double_fix_exp(s);
    var frac = cap[2].substr(0,1 - fractionDigits);  // then cut off
    return cap[1] + frac.replace(/(?:\.|([1-9]))0+$/,"$1"); // remove trailing zeros
  }
  else {
    // use exactly fractionDigits
    if (fractionDigits > 20) fractionDigits = 20;
    return _double_fix_exp(d.toFixed(fractionDigits));
  }
}
function _string_repeat(s,n) {
  if (n<=0)  return "";
  if (n===1) return s;
  if (n===2) return s+s;
  var res = "";
  while(n > 0) {
    if (n & 1) res += s;
    n >>>= 1;
    s += s;
  }
  return res;
}
function _trimzeros(s) {
  return s.replace(/\.?0+$/,"");
}
function _gformat(x,format) {
  if (typeof x === "number" && !isFinite(x)) return _double_show_special(x);    
  var hex = /^[xX]([0-9]*)/.exec(format)
  if (hex) {
    var w = parseInt(hex[1]);
    var s = x.toString(16)
    if (format[0] == 'X') s = s.toUpperCase();
    return (s.length<w ? _string_repeat("0",w - s.length) + s : s );
  }
  var exp = /^[eE]([0-9]*)/.exec(format)
  if (exp) {
    var w = parseInt(exp[1]);
    return (w>0 && w<=20 ? x.toExponential(w) : x.toExponential());
  }
  var fix = /^[fF]([0-9]*)/.exec(format)
  if (fix) {
    var w = parseInt(fix[1]);
    return _trimzeros((w > 0 && w <= 20) ? x.toFixed(w) : x.toFixed(20));
  }
  var expfix = /^[gG]([0-9]*)/.exec(format)
  if (expfix) {
    var w = parseInt(expfix[1]);
    return (w>0&&w<=20 ? x.toPrecision(w) : x.toPrecision());
  }
  /* default */
  return x.toString();
}
/*------------------------------------------------
  Exceptions
------------------------------------------------*/
function _exn_capture_stack(exn) {
  /*
  if ("captureStackTrace" in Error) {
    Error.captureStackTrace(exn,_InfoException);  // best on Node.js
  }
  else 
  */
  {
    exn.stack = (new Error()).stack; // in browsers
  }
  if (exn.stack==null) exn.stack = "";
  // strip off leaf functions from the stack trace
  exn.stack = exn.stack.replace(/\n\s*at (exn_exception|exception|(Object\.)?throw_1|Object\.error|exn_error_pattern|Object\.error_pattern|exn_error_range|Object\._vector_at)\b.*/g,"");
}
function exn_stacktrace( exn ) {
  if (exn instanceof Error && typeof exn.stack === "string") {
    return exn.stack;
  }
  else {
    return "";
  }
}
function exn_info( exn ) {
  //console.log("exn_info: " + exn.stack);
  /*
  if (exn instanceof _InfoException && exn.info != null) {
    return exn.info;
  }
  else if (exn instanceof _InfoSystemException && exn.info != null) {
    return exn.info;
  }
  else if (exn instanceof _FinalizeException) {
    return Finalize;
  }
  else if (exn instanceof AssertionError) {
    return Assert;
  }
  else
  */
  if (exn instanceof RangeError) {
    return ExnRange;
  }
  else if (exn instanceof Error && typeof exn.code === "string" ) {
    return ExnSystem(exn.code);
  }
  else {
    return ExnError;
  }
}
function exn_message( exn ) {
  if (exn==null) {
    return "invalid error";
  }
  if (typeof exn.get_message === "function") { // for FinalizeException
    var msg = exn.get_message();
    if (typeof msg === "string") return msg;
  }
  if (typeof exn.message === "string") {
    return exn.message;
  }
  else if (typeof exn === "string") {
    return exn;
  }
  else if (typeof exn.toString === "function") {
    return exn.toString();
  }
  else {
    return "Unknown error";
  };
}
// Throw a JavaScript exception as a Koka exception
export function _throw_exception( exn ) {
  var st  = exn_stacktrace(exn);
  var exc = Exception( exn_message(exn) + (st ? "\n" + st : ""), exn_info(exn) );
  return throw_exn(exc);
}
export function _error_from_exception( exn ) {
  var st  = exn_stacktrace(exn);
  var exc = Exception( exn_message(exn) + (st ? "\n" + st : ""), exn_info(exn) );
  return $Error(exc);
}
export function _unsupported_external( msg ) {
  _throw_exception(msg);
}
/*------------------------------------------------
  list helpers
------------------------------------------------*/
// Create a list with from a vector in constant stack space
export function _vlist(elems,tail) {
  var xs = tail || Nil;
  if (elems!=null && elems.length>0) {
    for(var i = elems.length - 1; i >= 0; i--) {
      var elem = elems[i];
      if (elem !== undefined) xs = Cons(elem,xs);
    }
  }
  return xs;
}
// Create an array from a list with constant stack space
export function _unvlist(list) {
  var elems = [];
  while(list) {
    elems.push(list.head);
    list = list.tail;
  }
  return elems;
}
// Create a vector with a function initializer
export function _vector(n, f) {
  if (n<=0) return [];
  var a = new Array(n);
  for(var i = 0; i < n; i++) {
    a[i] = f(i);
  }
  return a;
}
// Index a vector
export function _vector_at( v, i ) {
  var j = _int_to_number(i);
  var x = v[j];
  if (x === undefined) { exn_error_range(); }
  return x;
}
/*---------------------------------------------------------------------------
  Copyright 2012-2021, Microsoft Research, Daan Leijen.
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the LICENSE file at the root of this distribution.
---------------------------------------------------------------------------*/
/* assign here so inlined primitives are available in system.core itself */
const $std_core = {"_throw_exception": _throw_exception
            , "_error_from_exception": _error_from_exception
            , "_unsupported_external": _unsupported_external
            // primitive operations emitted by the compiler
            , "_int32_multiply": _int32_multiply                      
            , "vlist": _vlist
            , "_vector_at": _vector_at
            // integer operations that will be inlined
            , "_int_string": _int_string
            , "_int_const": _int_const
            , "_int_double": _int_double
            , "_int_clamp8": _int_clamp8
            , "_int_clamp16": _int_clamp16      
            , "_int_clamp32": _int_clamp32
            , "_int_clamp64": _int_clamp64
            , "_int_clamp_byte": _int_clamp_byte
            , "_int_from_int32": _int_from_int32
            , "_int_from_int64": _int_from_int64
            , "_double_to_int32": _double_to_int32
            , "_double_round_even": _double_round_even
            , "_int_to_double": _int_to_double
            , "_int_to_float": _int_to_float
            , "_double_to_float": _double_to_float
            , "_int_iszero": _int_iszero
            , "_int_isodd": _int_isodd
            , "_int_negate": _int_negate
            , "_int_abs": _int_abs
            , "_int_sign": _int_sign
            , "_int_add": _int_add
            , "_int_sub": _int_sub
            , "_int_mul": _int_mul
            , "_int_div": _int_div
            , "_int_mod": _int_mod
            , "_int_divmod": _int_divmod
            , "_int_compare": _int_compare
            , "_int_eq": _int_eq
            , "_int_ne": _int_ne
            , "_int_gt": _int_gt
            , "_int_ge": _int_ge
            , "_int_lt": _int_lt
            , "_int_le": _int_le
            };
/*------------------------------------------------
  32-bit integer operations
--------------------------------------------------*/
export function _int32_multiply(x,y) {
  var xhi = (x >> 16) & 0xFFFF;
  var xlo = x & 0xFFFF;
  var yhi = (y >> 16) & 0xFFFF;
  var ylo = y & 0xFFFF;
  var hi  = ((xhi * ylo) + (xlo * yhi));
  return (((hi << 16) + (xlo * ylo))|0)
}
export function _int32_rotl(x,y) {
  const shift = y & 31;
  return ((x << shift) | (x >>> (32 - shift)));
}
export function _int32_rotr(x,y) {
  const shift = y & 31;
  return ((x >>> shift) | (x << (32 - shift)));
}
const _int65 = 0x10000000000000000n;
export function _int64_shr(x,y) {
  const shift = y & 63n;
  if (shift === 0n) {
    return x;
  }
  else if (x >= 0n) {
    return (x >> shift);
  }
  else {
    const i = (x + _int65) >> shift;  // make positive (in 65 bits) and shift
    return BigInt.asIntN(64, i);
  }
}
export function _int64_sar(x,y) {
  const shift = y & 63n;
  return (x >> shift);  
}
export function _int64_shl(x,y) {
  const shift = y & 63n;
  return BigInt.asIntN(64, x << shift);  
}
export function _int64_rotl(x,y) {
  const shift = y & 63n;
  const lo = _int64_shr(x, 64n - shift);
  return BigInt.asIntN(64, (x << shift) | lo);
}
export function _int64_rotr(x,y) {
  return _int64_rotl(x, 64n - y);
}
export function _int64_from_uint32(x) {
  return (x >= 0 ? BigInt(x) : 0x100000000n + BigInt(x))
}
export function _int64_from_int32(x) {
  return BigInt(x);
}
const _max_uint32 =  0xFFFFFFFFn;
const _max_int32  =  0x7FFFFFFFn;
const _min_int32  = -0x80000000n;
export function _int64_clamp_int32(x) {
  return (x > _max_int32n ? _max_int32n : (x < _min_int32n ? _min_int32n : Number(x))); 
}
export function _int64_clamp_uint32(x) {
  return (x > _max_uint32n ? -1 : (x < 0 ? 0 : (x <= _max_int32n ? Number(x) : Number(x) - 0x100000000)));
}
/*------------------------------------------------
  double arithmetic
------------------------------------------------*/
export var _double_trunc = Math.trunc || function(x){ return x - x%1; };
// Round a double with rounding to even on a tie.
export function _double_round_even(d) {
  const r = Math.round(d); // rounds to +Infinity on a tie
  if (Math.abs(d - r) == 0.5) {
    // exactly in-between, round to the nearest even number
    return 2.0*Math.round(d/2.0);
  }
  else {
    return r;
  }
}
/*------------------------------------------------
  integer arithmetic
------------------------------------------------*/
// We represent integers as a regular number as long as it is within _min_precise and _max_precise.
// Outside that we use Integer objects.
// An Integer is just a wrapper around a BigInt; we use that so we can do faster basic
// operations. For example, for multiplication, we just multiply directly as `x * y`, and then check
// afterwards if it succeeded; if one of `x` or `y` was an `Integer` it will have been 
// cast to `NaN` (or something like `[object Object]1`) and we can fall back to big integer arithmetic.
// This is expensive if big integers dominate but we expect the vast majority of operations to work
// on "small" integers. (Note that we cannot use BigInt directly as `x * y` in such case could lead
// to type error exceptions.)
const _max_precise = 9007199254740991; // 2^53 -1
const _min_precise = -_max_precise;
const _max_int32 =  0x7FFFFFFF;
const _min_int32 = -0x80000000;
const _max_int64 =  0x7FFFFFFFFFFFFFFFn;
const _min_int64 = -0x8000000000000000n;
// is a number small?
function _is_small(x) {
  return (x >= _min_precise && x <= _max_precise);
}
const Integer = (function(){
  function Integer(x) {
    if (x instanceof Integer) {
      this.value = x.value;
    }
    else {
      this.value = BigInt(x);
    }
  }
  Integer.prototype.to_number = function() {
    const x = Number(this.value);
    return (isNaN(x) ? 0 : x);
  }  
  Integer.prototype.toString = function(radix) {
    return this.value.toString(radix);
  }
  Integer.prototype.valueOf = function() {
    return NaN; // important for optimized functions
  }
  return Integer;
})();
export function _int(x) {
  return (_is_small(x) ? Number(x) : new Integer(x));
}
export function _big(x) {
  return (x instanceof Integer ? x.value : BigInt(x));  
}
function _integer_add(x,y) {
  return _int( _big(x) + _big(y) );
}
function _integer_sub(x,y) {
  return _int( _big(x) - _big(y) );
}
function _integer_mul(x,y) {
  return _int( _big(x) * _big(y) );
}
function _integer_pow(x,y) {
  return _int( _big(x) ** _big(y) );
}
function _integer_cdiv(x,y) {
  return _int( _big(x) / _big(y) );
}
function _integer_cmod(x,y) {
  return _int( _big(x) % _big(y) );
}
function _integer_cdivmod(x,y) {
  const i = _big(x);
  const j = _big(y);
  return $std_core_types._Tuple2_( _int(i/j), _int(i%j) );
}
function _integer_div(x,y) {
  const i = _big(x);
  const j = _big(y);
  const q = i / j;
  const r = i % j;
  return _int( r < 0n ? (j > 0n ? q - 1n : q + 1n) : q );    
}
function _integer_mod(x,y) {
  const i = _big(x);
  const j = _big(y);
  const r = i % j;
  return _int( r < 0n ? (j > 0n ? r + j : r - j) : r );    
}
function _integer_divmod(x,y) {
  const i = _big(x);
  const j = _big(y);
  var q = i / j;
  var r = i % j;
  if (r < 0n) {
    if (j > 0n) { q--; r += j; }
           else { q++; r -= j; }
  }
  return $std_core_types._Tuple2_( _int(q), _int(r) );
}
function _integer_neg(x) {
  return _int( 0n - _big(x));
}
function _integer_inc(x) {
  return _int( _big(x) + 1n );
}
function _integer_dec(x) {
  return _int( _big(x) - 1n );
}
function _integer_abs(x) {
  const i = _big(x);
  return _int( i >= 0n ? i : 0n - i );
}
function _integer_compare(x,y) {
  const i = _big(x);
  const j = _big(y);
  return (i === j ? $std_core_types.Eq : (i > j ? $std_core_types.Gt : $std_core_types.Lt));
}
function _integer_lt(x,y) {
  return (_big(x) < _big(y));
}
function _integer_lte(x,y) {
  return (_big(x) <= _big(y));
}
function _integer_gt(x,y) {
  return (_big(x) > _big(y));
}
function _integer_gte(x,y) {
  return (_big(x) >= _big(y));
}
function _integer_eq(x,y) {
  return (_big(x) === _big(y));
}
function _integer_neq(x,y) {
  return (_big(x) !== _big(y));
}
function _integer_mul_pow10(x,n) {
  return _int( _big(x) * (10n ** _big(n)) );
}
function _integer_div_pow10(x,n) {
  return _integer_div( x, _int( 10n ** _big(n) ) );
}
function _integer_cdiv_pow10(x,n) {
  return _integer_cdiv( x, _int( 10n ** _big(n) ) );
}
function _integer_count_pow10(x) {
  const zeros = _big(x).toString().match(/(0+)n$/);
  return (zeros == null || zeros.length <= 1 ? 0 : zeros[1].length);
}
function _integer_count_digits(x) {
  const i = _big(x);
  const s = (i >= 0n ? i : 0n - i).toString();
  return (s.length - 1);
}
function _integer_is_odd(x) {
  const i = _big(x);
  if (_is_small(i)) {
    return ((Number(i) & 1) === 1 );
  }
  else {
    return ((i % 2n) === 1n);
  }
}
/*------------------------------------------------
  int arithmetic
------------------------------------------------*/
export function _int_add(x,y) {
  const z = x + y;
  return (_is_small(z) ? z : _integer_add(x,y));
}
export function _int_sub(x,y) {
  const z = x - y;
  return (_is_small(z) ? z : _integer_sub(x,y));
}
export function _int_mul(x,y) {
  const z = x * y;
  return (_is_small(z) ? z : _integer_mul(x,y));
}
export function _int_iszero(x) {
  return (x instanceof Integer ? x.value === 0n : x===0);
}
export function _int_isodd(x) {
  return (x instanceof Integer ? _integer_is_odd(x) : (x&1)===1);
}
export function _int_negate(x) {
  const z = 0 - x;
  return (_is_small(z) ? z : _integer_neg(x));
}
export function _int_abs(x) {
  return (x instanceof Integer ? _integer_abs(x) : Math.abs(x) );
}
export function _int_cdivmod(x,y) {
  const q = _double_trunc(x / y);
  if (!isNaN(q)) {
    return $std_core_types._Tuple2_(q,(x%y));
  }
  else {
    return _integer_cdivmod(x,y);
  }
}
export function _int_cdiv(x,y) {
  const q = _double_trunc(x / y);
  return (!isNaN(q) ? q : _integer_cdiv(x,y));
}
export function _int_cmod(x,y) {
  const r = (x % y);
  return (!isNaN(r) ? r : _integer_cmod(x,y));
}
export function _int_divmod(x,y) {
  if (_int_iszero(y)) return 0;
  var q = _double_trunc(x / y);
  if (!isNaN(q)) {
    var r = x%y;
    if (r<0) {
      if (y>0) { q--; r += y; }
          else { q++; r -= y; }
    }
    return $std_core_types._Tuple2_(q,r);
  }
  else {
    return _integer_divmod(x,y)
  }
}
export function _int_div(x,y) {
  if (_int_iszero(y)) return 0;
  const q = _double_trunc(x/y);
  if (!isNaN(q)) {
    const r = (x%y);
    return (r<0 ? (y>0 ? q-1 : q+1) : q);
  }
  else return _integer_div(x,y);
}
export function _int_mod(x,y) {
  if (_int_iszero(y)) return 0;
  const r = (x%y);
  if (!isNaN(r)) {
    return (r<0 ? (y>0 ? r+y : r-y) : r);
  }
  else return _integer_mod(x,y);
}
export function _int_compare(x,y) {
  const d = x - y;
  if (!isNaN(d)) {
    return (d>0 ? $std_core_types.Gt : (d<0 ? $std_core_types.Lt : $std_core_types.Eq));
  }
  else {
    return _integer_compare(x,y);
  }
}
export function _int_sign(x) {
  return _int_compare(x,0);
}
export function _int_eq(x,y)   { 
  const d = x - y;
  if (!isNaN(d)) {
    return (d === 0);
  }
  else {
    return _integer_eq(x,y);
  }
}
export function _int_ne(x,y)   { 
  const d = x - y;
  if (!isNaN(d)) {
    return (d !== 0);
  }
  else {
    return _integer_neq(x,y);
  }
}
export function _int_lt(x,y) { 
  const d = x - y;
  if (!isNaN(d)) {
    return (d < 0);
  }
  else {
    return _integer_lt(x,y);
  }
}
export function _int_le(x,y) { 
  const d = x - y;
  if (!isNaN(d)) {
    return (d <= 0);
  }
  else {
    return _integer_lte(x,y);
  }
}
export function _int_gt(x,y) { 
  const d = x - y;
  if (!isNaN(d)) {
    return (d > 0);
  }
  else {
    return _integer_gt(x,y);
  }
}
export function _int_ge(x,y) { 
  const d = x - y;
  if (!isNaN(d)) {
    return (d >= 0);
  }
  else {
    return _integer_gte(x,y);
  }
}
export function _int_pow(i,exp) {
	if (_is_small(i)) {
		var j = Math.pow(i);
		if (_is_small(j)) return j;
	}
	return _integer_pow(i,exp);
}
export function _int_mul_pow10(i,n) {
  const s = _int_sign(n);
  if (s === 0) return i;
  if (s < 0) return _int_cdiv_pow10(i, _int_negate(n) );
  return (_is_small(i) && n <= 14 ? _int_mul(i,Math.pow(10,n)) : _integer_mul_pow10(i,n) );
}
export function _int_cdiv_pow10(i,n) {
  const s = _int_sign(n);
  if (s === 0) return i;
  if (s < 0) return _int_mul_pow10(i, _int_negate(n) );  
  return (_is_small(i) && n <= 14 ? _int_cdiv(i,Math.pow(10,n)) : _integer_cdiv_pow10(i,n) );
}
function _count_pow10( x ) {
  var j = 0;
  while(x!==0) {
    var m = x%10;
    if (m===0) { j++; }
          else break;
    x = x/10;
  }
  return j;
}
export function _int_count_pow10(i) {
  return (_is_small(i) ? _count_pow10(i) : _integer_count_pow10(i) );
}
function _count_digits8( x ) {  // only for -1e8 < x < 1e8
  if (x===0) return 0;
  x = Math.abs(x)
  if (x < 1e4) { // 1 - 4
    if (x < 1e2) return (x < 10 ? 1 : 2);
            else return (x < 1000 ? 3 : 4);
  }
  else { // 5 - 8
    if (x < 1e6) return (x < 1e5 ? 5 : 6);
            else return (x < 1e7 ? 7 : 8);
  }
}
export function _int_count_digits(i) {
  return (i > -1e8 && i < 1e8 ? _count_digits8(i) : _integer_count_digits(i) );
}
// create an int from a string.
export function _int_string(s) {
  if (s.length < 15) return parseInt(s);
                else return _int( BigInt(s) );
}
// create an int from a big int
export function _int_const(i) {
  return _int(i);
}
// create an int from a double.
export function _int_double(x) {
  if (_is_small(x)) return _double_round_even(x);
  if (isFinite(x)) return new Integer(x);
  if (x===Infinity) return _max_int32;
  if (x===-Infinity) return _min_int32;
  return 0;
}
function _int_to_number(x) {
  return (x instanceof Integer ? x.to_number() : x);
}
export function _int_clamp8(x) {
  const v = _int_to_number(x);
  if (v > 127) return 127;
  if (v < -128) return -128;
  return (v|0);
}
export function _int_clamp16(x) {
  const v = _int_to_number(x);
  if (v > 32767) return 32767;
  if (v < -32768) return -32768;
  return (v|0);
}
// Clamp a big integer into a 32 bit integer range.
export function _int_clamp32(x) {
  const v = _int_to_number(x);
  if (v > _max_int32) return _max_int32;
  if (v < _min_int32) return _min_int32;
  return (v|0);
}
export function _int_from_int32(x) {
  return x;
}
export function _int_clamp64(x) {
  if (_is_small(x)) return BigInt(x);
  const v = _big(x);
  if (v > _max_int64) return _max_int64;
  if (v < _min_int64) return _min_int64;
  return v;
}
export function _int_from_int64(x) {
  return _int(x);
}
export function _int_clamp_byte(x) {
  const v = _int_to_number(x);
  if (v > 255) return 255;
  if (v < 0) return 0;
  return (v|0);
}
// Clamp a double into a 32 bit integer range.
export function _double_to_int32(x) {
  if (x > _max_int32) return _max_int32;
  if (x < _min_int32) return _min_int32;
  if (isNaN(x)) return 0;
  return (x|0);
}
export function _int_to_double(x) {
  return (x instanceof Integer ? x.to_number() : x);
}
var _buf_float32 = null;
export function _double_to_float(d) {  
  if (Math.fround) {
    return Math.fround(d);
  }
  else {
    if (_buf_float32 === null) {
      _buf_float32 = new Float32Array(1);
    }
    _buf_float32[0] = d;
    return _buf_float32[0];
  }
}
export function _int_to_float(x) {
  return _double_to_float( _int_to_double(x) );
}
function _int_showhex(x,upper) {
  const s = x.toString(16);
  return (upper ? s.toUpperCase() : s);
}
function _int_parse(s,hex) {
  if (s==="") return $std_core_types.Nothing;
  const cappre  = /^([\-\+])?(0[xX])?(.*)$/.exec(s);
  const sdigits = cappre[3].toLowerCase();
  const sign    = cappre[1] || "";
  if (cappre[2]) hex = true;
  if (hex) {
    const cap = /^[0-9a-f]+$/.exec(sdigits);
    if (!cap) return  $std_core_types.Nothing;
    return $std_core_types.Just( _int_string(sign + "0x" + sdigits) );
  }
  else {
    const rx = /^([0-9]+)(?:\.([0-9]+))?(?:[eE]\+?([0-9]+))?$/;
    const cap = rx.exec(sdigits);
    if (!cap) return $std_core_types.Nothing;
    var sig  = cap[1];
    const frac = cap[2] || "";
    var exp  = (cap[3] ? parseInt(cap[3]) : 0);
    if (frac.length > exp) return $std_core_types.Nothing;
    exp = exp - frac.length;
    sig = sig + frac;
    var x = _int_string(sign + sig);
    if (exp > 0) {
      x = _int_mul_pow10( x, exp );
    }
    return $std_core_types.Just(x);
  }
}
/*---------------------------------------------------------------------------
  Copyright 2012-2021, Microsoft Research, Daan Leijen.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the LICENSE file at the root of this distribution.
---------------------------------------------------------------------------*/
/*-----------------------------------------------------------
  String codepoints
  Ugh, Javascript treats strings as UCS2/UTF-16 vectors.
  We need to explicitly decode/encode to see strings
  as unicode codepoints.
-------------------------------------------------------------*/
function _is_high_surrogate(c) {
  return (c >= 0xD800 && c <= 0xDBFF);
}
function _is_low_surrogate(c) {
  return (c >= 0xDC00 && c <= 0xDFFF);
}
function _from_surrogate(hi,lo) {
  return ((hi - 0xD800) * 0x0400) + (lo - 0xDC00) + 0x10000;
}
function _char_to_string( code ) {
  if (code < 0) {
    return "";
  }
  else if (code <= 0xFFFF) {
    return String.fromCharCode(code);
  }
  else if (code > 0x10FFFF) {
    return String.fromCharCode(0xFFFD);
  }
  else {
    code = code - 0x10000;
    return String.fromCharCode( (code / 0x0400) + 0xD800, (code % 0x0400) + 0xDC00 );
  }
}
function _char_iter( s, from, f ) {
  if (from < 0) from = 0;
  for(var i = from; i < s.length; i++) {
    var i0 = i;
    var c = s.charCodeAt(i);
    if (_is_high_surrogate(c) && i < s.length-1) {
      var lo = s.charCodeAt(i+1);
      if (_is_low_surrogate(lo)) {
        i++;
        c = _from_surrogate(c,lo);
      }
    }
    if (f(c,i0,i+1)) break;
  };
}
function _char_reviter( s, from, f ) {
  for(var i = (from!=null ? from : s.length-1); i >= 0; i--) {
    var i0 = i;
    var c = s.charCodeAt(i);
    if (_is_low_surrogate(c) && i > 0) {
      var hi = s.charCodeAt(i-1);
      if (_is_high_surrogate(hi)) {
        i--;
        c = _from_surrogate(hi,c); 
      }
    }
    if (f(c,i,i0+1)) break;
  }
}
// Convert a string to a list of characters
function _string_to_list( s ) {
  var xs = Nil;
  _char_reviter(s, undefined, function(c,i,next) {
    xs = Cons(c,xs);
  });
  return xs;
}
// Convert a string to a vector of codepoints
function _string_to_chars(s) {
  var xs = [];
  _char_iter(s, 0, function(c,i,inext) { xs.push(c); });
  return xs;
}
function _string_count(s) {
  var count = 0;
  _char_iter(s, 0, function(c,i,inext) { count++; } );
  return count;
}
// Convert a vector of code points back to a string
function _chars_to_string( v ) {
  var s = "";
  for(var i = 0; i < v.length; i++) {
    s += _char_to_string(v[i]);
  };
  return s;
}
// convert list to string
function _list_to_string(list) {
  var s = "";
  while(list) {
    s += _char_to_string(list.head);
    list = list.tail;
  }
  return s;
}
function _slice_to_string(sl) {
  if (sl.start===0 && sl.len===sl.str.length) return sl.str;
  return sl.str.substr(sl.start,sl.len);
}
function _sslice_first( s ) {
  var len;
  if (s.length===0) len = 0;
  else if (_is_high_surrogate(s.charCodeAt(0))) len = 2
  else len = 1;
  return { str: s, start: 0, len: len };
}
function _sslice_last( s ) {
  var len;
  if (s.length===0) len = 0;
  else if (_is_low_surrogate(s.charCodeAt(s.length-1))) len = 2
  else len = 1;
  return { str: s, start: s.length-len, len: len };
}
function _sslice_count(slice) {
  if (slice.len<=0) return 0;
  var count = 0;
  var end = slice.start + slice.len;
  _char_iter(slice.str, slice.start, function(c,i,nexti) { 
    count++; 
    return (nexti >= end);
  });
  return count;
}
// Extend the length of slice
function _sslice_extend( slice, count ) {
  if (count===0) return slice;
  var idx = slice.start + slice.len;
  if (count > 0) {
    _char_iter(slice.str, idx, function(c,i,nexti) {
      count--;
      idx = nexti;
      return (count <= 0);
    });
  }
  else {
    _char_reviter(slice.str, idx-1, function(c,i,nexti) {
      count++;
      idx = i;
      return (count >= 0 || idx <= slice.start);
    });
  }
  return { str: slice.str, start: slice.start, len: (idx > slice.start ? idx - slice.start : 0) };
}
// advance the start position of a slice
function _sslice_advance( slice, count ) {
  if (count===0) return slice;
  var idx = slice.start;
  var end = slice.start + slice.len;  
  var slicecount = _sslice_count(slice); // todo: optimize by caching the character count?
  if (count > 0) {
    var extra = 0;
    _char_iter(slice.str, idx, function(c,i,nexti) {
      extra++;
      idx = nexti;
      return (extra >= count);
    });    
    if (extra < slicecount && idx < end) { // optimize
      return _sslice_extend({ str: slice.str, start: idx, len: end-idx }, extra);
    }
  }
  else {
    var extra = 0;
    _char_reviter(slice.str, idx-1, function(c,i,nexti) {
      extra++;
      idx = i;
      return (extra >= -count);
    });
    if (extra < slicecount && idx < slice.start) {  // optimize
      return _sslice_extend({ str: slice.str, start: idx, len: slice.start-idx }, slicecount - extra);
    }
  }
  return _sslice_extend( { str: slice.str, start: idx, len: 0 }, slicecount );
}
// iterate through a slice
function _sslice_next( slice ) {
  if (slice.len <= 0) return null;
  var c = slice.str.charCodeAt(slice.start);
  var n = 1;
  if (_is_high_surrogate(c) && slice.len > 1) {
    var lo = slice.str.charCodeAt(slice.start+1);
    if (_is_low_surrogate(lo)) {
      c = _from_surrogate(c,lo);
      n = 2;
    }
  }
  return $std_core_types.Just( {fst: c, snd: { str: slice.str, start: slice.start+n, len: slice.len-n }} );
}
// return the common prefix of two strings
function _sslice_common_prefix( s, t, upto ) {
  var i;
  var max = Math.min(s.length,t.length);
  for(i = 0; i < max && upto > 0; i++) {
    var c = s.charCodeAt(i);
    if (c !== t.charCodeAt(i)) break;
    if (!_is_low_surrogate(c)) upto--; // count characters
  }
  return { str: s, start: 0, len: i };
}
/*---------------------------------------------------------------------------
  Copyright 2012-2021, Microsoft Research, Daan Leijen.
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the LICENSE file at the root of this distribution.
---------------------------------------------------------------------------*/
var _trace = function(s) { };
var _trace_any = function(s,x) { _trace("" + s + x); };
var _print = function(s) { _trace(s); };
if (typeof console !== undefined && typeof console.log === "function") {
  _trace = function(s) {
    console.log(s);
  };
}
if (typeof console !== undefined && typeof console.info === "function") {
  _trace_any = function(s,x) {
    console.info(s,x);
  };
}
function _println(msg) {
  _print(msg + "\n");
}
/*------------------------------------------------
  Console for Node
------------------------------------------------*/
if (_host === "node") {
  _print = function(s) {
    process.stdout.write(s);
  };
}
/*------------------------------------------------
  Console for Browser
------------------------------------------------*/
if (_host === "browser") {
  (function(){
    var escapes = {
        '&': '&amp;', // & first!
        '<': '&lt;',
        '>': '&gt;',
        '\'': '&apos;',
        '"': '&quot;',
        '\n': '<br>',
        '\r': '',
    };
    var escapes_regex = new RegExp("[" + Object.keys(escapes).join("") + "]", "g");
    function html_escape(txt) {
      return txt.replace(escapes_regex, function (s) {
        var r = escapes[s];
        return (r ? r : "");
      });
    }
    function get_console() {
      var cons = document.getElementById("koka-console");
      if (cons==null) {
        cons = document.createElement("div");
        cons.id = "koka-console";
        cons.style.fontFamily = "Consolas,Monaco,'Ubuntu Mono','Droid Sans Mono','Source Code Pro',monospace"
        cons.style.fontSize = "12pt";
        cons.style.width = "99%";
        document.body.appendChild(cons);
      }
      if (cons.display == "none") return null;
      return cons;
    }
    var output = null;
    function get_console_out()
    {
      if (output) return output;
      output = document.getElementById("koka-console-out");
      if (!output) {
        var cons = get_console();
        if (!cons) return null;
        output = document.createElement("div");
        output.id = "koka-console-out";
        output.style.fontFamily = "Consolas,Monaco,'Ubuntu Mono','Droid Sans Mono','Source Code Pro',monospace"
        output.style.fontSize = "12pt";
        output.style.width = "99%";
        output.style.height = "30ex";
        output.style.border = "gray solid 1px";
        output.wrap="off";
        output.style.overflow = "auto";
        output.style.whiteSpace = "pre";
        output.style.padding = "2px";
        output.style.margin = "2px";
        output.style.paddingBottom = "4px";
        output.readOnly = true;
        cons.appendChild(output);
      }
      if (!output.print) {
        output.print_html = function(s) {
          output.innerHTML = output.innerHTML + s;
          // try to scroll to the end
          if (output.createTextRange) {
            output.createTextRange().scrollIntoView(false);
          }
          else if (output.scrollTop !== undefined) {
            output.scrollTop = output.scrollHeight;
          }
        };
        output.print = function(s) {
          output.print_html(html_escape(s));
        };
      }
      return output;
    }
    _print = function(s) {
      var out = get_console_out();
      if (out && out.print) {
        out.print(s);
      }
    };
    _print.print_html = function(s) {
      var out = get_console_out();
      if (out && out.print_html) {
        out.print_html(s);
      }
    };
  })();
}
 
// type declarations
 
export var _tag_ExnError;
var _tag_ExnError = "std/core/ExnError";
 
export var _tag_ExnAssert;
var _tag_ExnAssert = "std/core/ExnAssert";
 
export var _tag_ExnTodo;
var _tag_ExnTodo = "std/core/ExnTodo";
 
export var _tag_ExnRange;
var _tag_ExnRange = "std/core/ExnRange";
 
export var _tag_ExnPattern;
var _tag_ExnPattern = "std/core/ExnPattern";
 
export var _tag_ExnSystem;
var _tag_ExnSystem = "std/core/ExnSystem";
 
export var _tag_ExnInternal;
var _tag_ExnInternal = "std/core/ExnInternal";
 
 
// runtime tag for the `:exn` effect
export var _tag_exn;
var _tag_exn = "exn.core";
// type exception-info
export const ExnError = { _tag: _tag_ExnError }; // exception-info
export const ExnAssert = { _tag: _tag_ExnAssert }; // exception-info
export const ExnTodo = { _tag: _tag_ExnTodo }; // exception-info
export const ExnRange = { _tag: _tag_ExnRange }; // exception-info
export function ExnPattern(location, definition) /* (location : string, definition : string) -> exception-info */  {
  return { _tag: _tag_ExnPattern, location: location, definition: definition };
}
export function ExnSystem(errno) /* (errno : int) -> exception-info */  {
  return { _tag: _tag_ExnSystem, errno: errno };
}
export function ExnInternal(name) /* (name : string) -> exception-info */  {
  return { _tag: _tag_ExnInternal, name: name };
}
// type exception
export function Exception(message, info) /* (message : string, info : exception-info) -> exception */  {
  return { message: message, info: info };
}
// type .hnd-exn
export function _Hnd_exn(ctl_throw_exn) /* forall<e,a> (ctl-throw-exn : forall<b> std/core/hnd/clause1<exception,b,.hnd-exn,e,a>) -> .hnd-exn<e,a> */  {
  return { ctl_throw_exn: ctl_throw_exn };
}
// type blocking
// type console
// type delayed
export function Delay(dref) /* forall<e,a> (dref : ref<global,either<() -> e a,a>>) -> delayed<e,a> */  {
  return dref;
}
// type error
export function $Error(exception) /* forall<a> (exception : exception) -> error<a> */  {
  return { _tag: 1, exception: exception };
}
export function Ok(result) /* forall<a> (result : a) -> error<a> */  {
  return { _tag: 2, result: result };
}
// type exn
export function Exn(_field1) /* forall<e,a> (.hnd-exn<e,a>) -> exn */  {
  return { _field1: _field1 };
}
// type fsys
// type global-scope
// type net
// type ui
// type list
export const Nil = null; // forall<a> list<a>
export function Cons(head, tail) /* forall<a> (head : a, tail : list<a>) -> list<a> */  {
  return { head: head, tail: tail };
}
// type nmd
// type null
// type scope
// type sslice
export function Sslice(str, start, len) /* (str : string, start : ssize_t, len : ssize_t) -> sslice */  {
  return { str: str, start: start, len: len };
}
// type stream
export function Next(head, tail) /* forall<a> (head : a, tail : stream<a>) -> stream<a> */  {
  return { head: head, tail: tail };
}
 
// declarations
 
 
// Automatically generated. Tests for the `ExnError` constructor of the `:exception-info` type.
export function is_exnError(exception_info) /* (exception-info : exception-info) -> bool */  {
  return (exception_info._tag === _tag_ExnError);
}
 
 
// Automatically generated. Tests for the `ExnAssert` constructor of the `:exception-info` type.
export function is_exnAssert(exception_info) /* (exception-info : exception-info) -> bool */  {
  return (exception_info._tag === _tag_ExnAssert);
}
 
 
// Automatically generated. Tests for the `ExnTodo` constructor of the `:exception-info` type.
export function is_exnTodo(exception_info) /* (exception-info : exception-info) -> bool */  {
  return (exception_info._tag === _tag_ExnTodo);
}
 
 
// Automatically generated. Tests for the `ExnRange` constructor of the `:exception-info` type.
export function is_exnRange(exception_info) /* (exception-info : exception-info) -> bool */  {
  return (exception_info._tag === _tag_ExnRange);
}
 
 
// Automatically generated. Tests for the `ExnPattern` constructor of the `:exception-info` type.
export function is_exnPattern(exception_info) /* (exception-info : exception-info) -> bool */  {
  return (exception_info._tag === _tag_ExnPattern);
}
 
 
// Automatically generated. Tests for the `ExnSystem` constructor of the `:exception-info` type.
export function is_exnSystem(exception_info) /* (exception-info : exception-info) -> bool */  {
  return (exception_info._tag === _tag_ExnSystem);
}
 
 
// Automatically generated. Tests for the `ExnInternal` constructor of the `:exception-info` type.
export function is_exnInternal(exception_info) /* (exception-info : exception-info) -> bool */  {
  return (exception_info._tag === _tag_ExnInternal);
}
 
 
// Automatically generated. Retrieves the `message` constructor field of the `:exception` type.
export function message(exception) /* (exception : exception) -> string */  {
  return exception.message;
}
 
 
// Automatically generated. Retrieves the `info` constructor field of the `:exception` type.
export function info(exception) /* (exception : exception) -> exception-info */  {
  return exception.info;
}
 
export function _copy(_this, message0, info0) /* (exception, message : optional<string>, info : optional<exception-info>) -> exception */  {
  if (message0 !== undefined) {
    var _x0 = message0;
  }
  else {
    var _x0 = _this.message;
  }
  if (info0 !== undefined) {
    var _x1 = info0;
  }
  else {
    var _x1 = _this.info;
  }
  return Exception(_x0, _x1);
}
 
 
// Automatically generated. Retrieves the `dref` constructor field of the `:delayed` type.
export function dref(delayed) /* forall<e,a> (delayed : delayed<e,a>) -> ref<global,either<() -> e a,a>> */  {
  return delayed;
}
 
export function _copy_1(_this, dref0) /* forall<e,a> (delayed<e,a>, dref : optional<ref<global,either<() -> e a,a>>>) -> delayed<e,a> */  {
  if (dref0 !== undefined) {
    var _x2 = dref0;
  }
  else {
    var _x2 = _this;
  }
  return _x2;
}
 
 
// Automatically generated. Tests for the `Error` constructor of the `:error` type.
export function is_error(error) /* forall<a> (error : error<a>) -> bool */  {
  return (error._tag === 1);
}
 
 
// Automatically generated. Tests for the `Ok` constructor of the `:error` type.
export function is_ok(error) /* forall<a> (error : error<a>) -> bool */  {
  return (error._tag === 2);
}
 
 
// Automatically generated. Tests for the `Nil` constructor of the `:list` type.
export function is_nil(list0) /* forall<a> (list : list<a>) -> bool */  {
  return (list0 === null);
}
 
 
// Automatically generated. Tests for the `Cons` constructor of the `:list` type.
export function is_cons(list0) /* forall<a> (list : list<a>) -> bool */  {
  return (list0 !== null);
}
 
 
// Automatically generated. Retrieves the `str` constructor field of the `:sslice` type.
export function str(sslice) /* (sslice : sslice) -> string */  {
  return sslice.str;
}
 
 
// Automatically generated. Retrieves the `start` constructor field of the `:sslice` type.
export function start(sslice) /* (sslice : sslice) -> ssize_t */  {
  return sslice.start;
}
 
 
// Automatically generated. Retrieves the `len` constructor field of the `:sslice` type.
export function len(sslice) /* (sslice : sslice) -> ssize_t */  {
  return sslice.len;
}
 
export function _copy_2(_this, str0, start0, len0) /* (sslice, str : optional<string>, start : optional<ssize_t>, len : optional<ssize_t>) -> sslice */  {
  if (str0 !== undefined) {
    var _x3 = str0;
  }
  else {
    var _x3 = _this.str;
  }
  if (start0 !== undefined) {
    var _x4 = start0;
  }
  else {
    var _x4 = _this.start;
  }
  if (len0 !== undefined) {
    var _x5 = len0;
  }
  else {
    var _x5 = _this.len;
  }
  return Sslice(_x3, _x4, _x5);
}
 
 
// Automatically generated. Retrieves the `head` constructor field of the `:stream` type.
export function head(stream) /* forall<a> (stream : stream<a>) -> a */  {
  return stream.head;
}
 
 
// Automatically generated. Retrieves the `tail` constructor field of the `:stream` type.
export function tail(stream) /* forall<a> (stream : stream<a>) -> stream<a> */  {
  return stream.tail;
}
 
export function _copy_3(_this, head0, tail0) /* forall<a> (stream<a>, head : optional<a>, tail : optional<stream<a>>) -> stream<a> */  {
  if (head0 !== undefined) {
    var _x6 = head0;
  }
  else {
    var _x6 = _this.head;
  }
  if (tail0 !== undefined) {
    var _x7 = tail0;
  }
  else {
    var _x7 = _this.tail;
  }
  return Next(_x6, _x7);
}
 
 
// select `throw-exn` operation out of the `:exn` effect handler
export function _select_throw_exn(hnd) /* forall<a,e,b> (hnd : .hnd-exn<e,b>) -> std/core/hnd/clause1<exception,a,.hnd-exn,e,b> */  {
  return hnd.ctl_throw_exn;
}
 
 
// handler for the `:exn` effect
export function _handle_exn(cfc, hnd, ret, action) /* forall<a,e,b> (cfc : int32, hnd : .hnd-exn<e,b>, ret : (res : a) -> e b, action : () -> <exn|e> a) -> e b */  {
  return $std_core_hnd._hhandle(_tag_exn, cfc, hnd, ret, action);
}
 
 
// Internal export for the regex module
export function _new_sslice(str0, start0, len0) /* (str : string, start : ssize_t, len : ssize_t) -> sslice */  {
  return Sslice(str0, start0, len0);
}
 
 
// Unsafe: transform any type to a `null` type; used internally by the compiler.
export function _null_any(x) /* forall<a> (x : a) -> null<a> */  {
  return (x==null ? null : x);
}
 
export function int_8(b) /* (b : bool) -> int */  {
  return (b) ? 1 : 0;
}
 
export function int_9(x) /* (x : order) -> int */  {
  if (x === 1) {
    return -1;
  }
  else if (x === 2) {
    return 0;
  }
  else {
    return 1;
  }
}
 
export var redirect;
var redirect = { value: ($std_core_types.Nothing) };
 
 
// Print a string to the console, including a final newline character.
export function xprintsln(s) /* (s : string) -> console () */  {
  return _println(s);
}
 
export function string_compare(x, y) /* (x : string, y : string) -> int */  {
  return (x===y ? 0 : (x > y ? 1 : -1));
}
 
 
// Convert an integer to an `:int32`. The number is _clamped_ to the maximal or minimum `:int32`
// value if it is outside the range of an `:int32`.
export function int32(i) /* (i : int) -> int32 */  {
  return $std_core._int_clamp32(i);
}
 
 
// Convert an integer to an `:ssize_t`. The number is _clamped_ to the maximal or minimum `:ssize_t`
// value if it is outside the range of an `:ssize_t`.
export function ssize__t(i) /* (i : int) -> ssize_t */  {
  return $std_core._int_clamp32(i);
}
 
 
// Convert a character to a string
export function string(c) /* (c : char) -> string */  {
  return _char_to_string(c);
}
 
 
// Convert a vector of characters to a string.
export function string_1(_arg1) /* (vector<char>) -> string */  {
  return _chars_to_string(_arg1);
}
 
 
// Convert a list of characters to a string
export function string_2(cs) /* (cs : list<char>) -> total string */  {
  return _list_to_string(cs);
}
 
 
// O(n). Copy the `slice` argument into a fresh string.
// Takes O(1) time if the slice covers the entire string.
export function string_3(slice0) /* (slice : sslice) -> string */  {
  return _slice_to_string(slice0);
}
 
 
// Convert a `:maybe` string to a string using the empty sting for `Nothing`
export function string_4(ms) /* (ms : maybe<string>) -> string */  {
  return (ms === null) ? "" : ms.value;
}
 
 
// Convert a vector to a list with an optional tail.
export function vlist(v, tail0) /* forall<a> (v : vector<a>, tail : optional<list<a>>) -> list<a> */  {
  var _x8 = (tail0 !== undefined) ? tail0 : Nil;
  return _vlist(v,_x8);
}
 
export function int_show_hex(i, use_capitals) /* (i : int, use-capitals : bool) -> string */  {
  return _int_showhex(i,use_capitals);
}
 
export function repeatz(s, n) /* (s : string, n : ssize_t) -> string */  {
  return _string_repeat(s,n);
}
 
export function show_expx(d, prec) /* (d : float64, prec : int32) -> string */  {
  return _double_show_exp(d,prec);
}
 
export function show_fixedx(d, prec) /* (d : float64, prec : int32) -> string */  {
  return _double_show_fixed(d,prec);
}
 
 
// Print a string to the console
export function xprints(s) /* (s : string) -> console () */  {
  return _print(s);
}
 
 
// Raise an integer `i` to the power of `exp`.
export function pow(i, exp) /* (i : int, exp : int) -> int */  {
  return _int_pow(i,exp);
}
 
 
// O(`count`). Advance the start position of a string slice by `count` characters
// up to the end of the string.
// A negative `count` advances the start position backwards upto the first position
// in a string.
// Maintains the character count of the original slice upto the end of the string.
// For example:
//
// * `"abc".first.advance(1).string == "b"`,
// * `"abc".first.advance(3).string == ""`,
// * `"abc".last.advance(-1).string == "b"`.
//
export function advance(slice0, count) /* (slice : sslice, count : int) -> sslice */  {
  return _sslice_advance(slice0,count);
}
 
 
// Apply a function `f` to a specified argument `x`.
export function apply(f, x) /* forall<a,b,e> (f : (a) -> e b, x : a) -> e b */  {
  return f(x);
}
 
export function unsafe_assert_fail(msg) /* (msg : string) -> () */  {
  return function() { throw new Error("assertion failed: " + msg) }();
}
 
 
// O(`count`). Extend a string slice by `count` characters up to the end of the string.
// A negative `count` shrinks the slice up to the empty slice.
// For example:
//
// * `"abc".first.extend(1).string == "ab"`
// * `"abc".last.extend(-1).string == ""`
//
export function extend(slice0, count) /* (slice : sslice, count : int) -> sslice */  {
  return _sslice_extend(slice0,count);
}
 
export function first1(s) /* (s : string) -> sslice */  {
  return _sslice_first(s);
}
 
 
// Convert a string to upper-case
export function to_upper(s) /* (s : string) -> string */  {
  return (s).toUpperCase();
}
 
export function cdiv_exp10(i, n) /* (i : int, n : int) -> int */  {
  return _int_cdiv_pow10(i,n);
}
 
export function mul_exp10(i, n) /* (i : int, n : int) -> int */  {
  return _int_mul_pow10(i,n);
}
 
 
// Return the common prefix of two strings (upto `upto` characters (default is minimum length of the two strings))
export function common_prefix(s, t, upto) /* (s : string, t : string, upto : optional<int>) -> sslice */  {
  var _x9 = (upto !== undefined) ? upto : -1;
  return _sslice_common_prefix(s,t,_x9);
}
 
 
// lifted local: concat, concat-pre
export function _ctail_lift17183_concat(ys, zss, _acc) /* forall<a> (ys : list<a>, zss : list<list<a>>, ctail<list<a>>) -> list<a> */  { tailcall: while(1)
{
  if (ys !== null) {
     
    var _ctail_17236 = undefined;
     
    var _ctail_17237 = Cons(ys.head, _ctail_17236);
    {
      // tail call
      var _x10 = $std_core_types._ctail_link(_acc,_ctail_17237,({value: _ctail_17237, field: "tail"}));
      ys = ys.tail;
      _acc = _x10;
      continue tailcall;
    }
  }
  else {
    if (zss !== null) {
      {
        // tail call
        ys = zss.head;
        zss = zss.tail;
        continue tailcall;
      }
    }
    else {
      return $std_core_types._ctail_resolve(_acc,Nil);
    }
  }
}}
 
 
// lifted local: concat, concat-pre
export function _lift17183_concat(ys0, zss0) /* forall<a> (ys : list<a>, zss : list<list<a>>) -> list<a> */  {
  return _ctail_lift17183_concat(ys0, zss0, $std_core_types._ctail_nil());
}
 
 
// Concatenate all lists in a list (e.g. flatten the list). (tail-recursive)
export function concat(xss) /* forall<a> (xss : list<list<a>>) -> list<a> */  {
  return _lift17183_concat(Nil, xss);
}
 
 
// The `const` funs returns its first argument and ignores the second.
export function $const(x, y) /* forall<a,b> (x : a, y : b) -> a */  {
  return x;
}
 
 
// Return a 'constant' function that ignores its argument and always returns the same result
export function const_1(default0) /* forall<a,b> (default : a) -> total ((x : b) -> a) */  {
  return function(___wildcard__110__6 /* 2308 */ ) {
    return default0;
  };
}
 
 
// If the slice is not empty,
// return the first character, and a new slice that is advanced by 1.
export function next(slice0) /* (slice : sslice) -> maybe<(char, sslice)> */  {
  return _sslice_next(slice0);
}
 
 
// Return the number of decimal digits of `i`. Return `0` when `i==0`.
export function count_digits(i) /* (i : int) -> int */  {
  return _int_count_digits(i);
}
 
 
// Convert a `:maybe<a>` value to `:a`, using the `nothing` parameter for `Nothing`.
export function $default(m, nothing) /* forall<a> (m : maybe<a>, nothing : a) -> a */  {
  return (m === null) ? nothing : m.value;
}
 
 
// Use default value `def` in case of an error.
export function default_1(t, def) /* forall<a> (t : error<a>, def : a) -> a */  {
  return (t._tag === 1) ? def : t.result;
}
 
 
// Transform an `:error` type to an `:either` value.
export function either(t) /* forall<a> (t : error<a>) -> either<exception,a> */  {
  if (t._tag === 1) {
    return $std_core_types.Left(t.exception);
  }
  else {
    return $std_core_types.Right(t.result);
  }
}
 
export function xends_with(s, post) /* (s : string, post : string) -> bool */  {
  return ((s).indexOf(post, (s).length - (post).length) !== -1);
}
 
 
// monadic lift
export function _mlift17667_op(_acc, f, zz, ys1_17210) /* forall<a,b,e> (ctail<list<b>>, f : (a) -> e list<b>, zz : list<a>, ys1.17210 : list<b>) -> e list<b> */  {
  return _ctail_lift17184_flatmap(f, ys1_17210, zz, _acc);
}
 
 
// monadic lift
export function _mlift17668_op(_accm, f0, zz0, ys1_172100) /* forall<a,b,e> ((list<b>) -> list<b>, f : (a) -> e list<b>, zz : list<a>, ys1.17210 : list<b>) -> e list<b> */  {
  return _ctailm_lift17184_flatmap(f0, ys1_172100, zz0, _accm);
}
 
 
// lifted local: flatmap, flatmap-pre
export function _ctail_lift17184_flatmap(f1, ys, zs, _acc0) /* forall<a,b,e> (f : (a) -> e list<b>, ys : list<b>, zs : list<a>, ctail<list<b>>) -> e list<b> */  { tailcall: while(1)
{
  if (ys !== null) {
     
    var _ctail_17238 = undefined;
     
    var _ctail_17239 = Cons(ys.head, _ctail_17238);
    {
      // tail call
      var _x11 = $std_core_types._ctail_link(_acc0,_ctail_17239,({value: _ctail_17239, field: "tail"}));
      ys = ys.tail;
      _acc0 = _x11;
      continue tailcall;
    }
  }
  else {
    if (zs !== null) {
       
      var x_17742 = f1(zs.head);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(ys1_172101 /* list<2457> */ ) {
          return _mlift17667_op(_acc0, f1, zs.tail, ys1_172101);
        });
      }
      else {
        {
          // tail call
          ys = x_17742;
          zs = zs.tail;
          continue tailcall;
        }
      }
    }
    else {
      return $std_core_types._ctail_resolve(_acc0,Nil);
    }
  }
}}
 
 
// lifted local: flatmap, flatmap-pre
export function _ctailm_lift17184_flatmap(f2, ys0, zs0, _accm0) /* forall<a,b,e> (f : (a) -> e list<b>, ys : list<b>, zs : list<a>, (list<b>) -> list<b>) -> e list<b> */  { tailcall: while(1)
{
  if (ys0 !== null) {
    {
      // tail call
      var _x14 = function(__dot_accm012 /* (list<2457>) -> list<2457> */ , _y013 /* 2457 */ ) {
        return function(_ctail_17241 /* list<2457> */ ) {
          return __dot_accm012(Cons(_y013, _ctail_17241));
        };
      }(_accm0, ys0.head);
      ys0 = ys0.tail;
      _accm0 = _x14;
      continue tailcall;
    }
  }
  else {
    if (zs0 !== null) {
       
      var x0_17745 = f2(zs0.head);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(ys1_172103 /* list<2457> */ ) {
          return _mlift17668_op(_accm0, f2, zs0.tail, ys1_172103);
        });
      }
      else {
        {
          // tail call
          ys0 = x0_17745;
          zs0 = zs0.tail;
          continue tailcall;
        }
      }
    }
    else {
      return _accm0(Nil);
    }
  }
}}
 
 
// lifted local: flatmap, flatmap-pre
export function _lift17184_flatmap(f3, ys1, zs1) /* forall<a,b,e> (f : (a) -> e list<b>, ys : list<b>, zs : list<a>) -> e list<b> */  {
  var _x15 = $std_core_hnd._evv_is_affine();
  if (_x15) {
    return _ctail_lift17184_flatmap(f3, ys1, zs1, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_lift17184_flatmap(f3, ys1, zs1, function(_ctail_17240 /* list<2457> */ ) {
        return _ctail_17240;
      });
  }
}
 
 
// Concatenate the result lists from applying a function to all elements.
export function flatmap(xs, f) /* forall<a,b,e> (xs : list<a>, f : (a) -> e list<b>) -> e list<b> */  {
  return _lift17184_flatmap(f, Nil, xs);
}
 
 
// lifted local: reverse-append, reverse-acc
export function _lift17185_reverse_append(acc, ys) /* forall<a> (acc : list<a>, ys : list<a>) -> list<a> */  { tailcall: while(1)
{
  if (ys !== null) {
    {
      // tail call
      var _x16 = Cons(ys.head, acc);
      acc = _x16;
      ys = ys.tail;
      continue tailcall;
    }
  }
  else {
    return acc;
  }
}}
 
 
// Efficiently reverse a list `xs` and append it to `tl`:
// `reverse-append(xs,tl) == reserve(xs) ++ tl
export function reverse_append(xs, tl) /* forall<a> (xs : list<a>, tl : list<a>) -> list<a> */  {
  return _lift17185_reverse_append(tl, xs);
}
 
 
// monadic lift
export function _mlift17669_force(r, x0) /* forall<a,e> (r : ref<global,either<() -> e a,a>>, x0 : a) -> <st<global>,div|e> a */  {
   
  ((r).value = ($std_core_types.Right(x0)));
  return x0;
}
 
 
// monadic lift
export function _mlift17670_force(r, _y_17346) /* forall<a,e> (r : ref<global,either<() -> e a,a>>, () -> <st<global>,div|e> a) -> <alloc<global>,div,read<global>,write<global>|e> a */  {
   
  var x_17748 = _y_17346();
   
  function next0_17749(x0) /* (2592) -> <st<global>,div|2593> 2592 */  {
     
    ((r).value = ($std_core_types.Right(x0)));
    return x0;
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next0_17749);
  }
  else {
    return next0_17749(x_17748);
  }
}
 
 
// monadic lift
export function _mlift17671_force(r, _y_17344) /* forall<a,e> (r : ref<global,either<() -> e a,a>>, either<() -> e a,a>) -> <read<global>,div,alloc<global>,write<global>|e> a */  {
  if (_y_17344._tag === 2) {
    return _y_17344.right;
  }
  else {
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_17346 /* () -> <st<global>,div|2593> 2592 */ ) {
        return _mlift17670_force(r, _y_17346);
      });
    }
    else {
      return _mlift17670_force(r, _y_17344.left);
    }
  }
}
 
 
// Force a delayed value; the value is computed only on the first
// call to `force` and cached afterwards.
export function force(delayed) /* forall<a,e> (delayed : delayed<e,a>) -> e a */  {
   
  var _x17 = delayed;
  var x_17757 = _x17.value;
   
  function next0_17758(_y_17344) /* (either<() -> 2593 2592,2592>) -> <read<global>,div,alloc<global>,write<global>|2593> 2592 */  {
    var _x18 = delayed;
    return _mlift17671_force(_x18, _y_17344);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next0_17758);
  }
  else {
    return next0_17758(x_17757);
  }
}
 
 
// Generic show: shows the internal representation of an object as a string
// Note: this breaks parametricity so it should not be pub
export function gshow(_arg1) /* forall<a> (a) -> string */  {
  return _arg1.toString();
}
 
 
// Return the host environment: `dotnet`, `browser`, `webworker`, `node`, or `libc`.
export function host() /* () -> ndet string */  {
  return _host;
}
 
 
// clamp an `:int` to fit in an `:int64_t`.
export function int64(i) /* (i : int) -> int64 */  {
  return $std_core._int_clamp64(i);
}
 
 
// The `ignore` function ignores its argument.
export function ignore(x) /* forall<a> (x : a) -> () */  {
  return $std_core_types._Unit_;
}
 
 
// clamp an `:int` to fit in an `:int16`.
export function int16(i) /* (i : int) -> int16 */  {
  return $std_core._int_clamp16(i);
}
 
 
// clamp an `:int` to fit in an `:int8`.
export function int8(i) /* (i : int) -> int8 */  {
  return $std_core._int_clamp8(i);
}
 
 
// lifted local: intersperse, before0
export function _ctail_lift17186_intersperse(sep, ys, _acc) /* forall<a> (sep : a, ys : list<a>, ctail<list<a>>) -> list<a> */  { tailcall: while(1)
{
  if (ys !== null) {
     
    var _ctail_17242 = Cons(ys.head, undefined);
    {
      // tail call
      var _x17 = $std_core_types._ctail_link(_acc,(Cons(sep, _ctail_17242)),({value: _ctail_17242, field: "tail"}));
      ys = ys.tail;
      _acc = _x17;
      continue tailcall;
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc,Nil);
  }
}}
 
 
// lifted local: intersperse, before0
export function _lift17186_intersperse(sep0, ys0) /* forall<a> (sep : a, ys : list<a>) -> list<a> */  {
  return _ctail_lift17186_intersperse(sep0, ys0, $std_core_types._ctail_nil());
}
 
 
// Insert a separator `sep`  between all elements of a list `xs` .
export function intersperse(xs, sep) /* forall<a> (xs : list<a>, sep : a) -> list<a> */  {
  if (xs !== null) {
    return Cons(xs.head, _lift17186_intersperse(sep, xs.tail));
  }
  else {
    return Nil;
  }
}
 
 
// clamp an `:int` to fit in an `:intptr_t`.
export function intptr__t(i) /* (i : int) -> intptr_t */  {
  return $std_core._int_clamp64(i);
}
 
 
// Is this an even integer?
export function is_even(i) /* (i : int) -> bool */  {
   
  var b_16946 = $std_core._int_isodd(i);
  return (b_16946) ? false : true;
}
 
 
// Return the number of ending `0` digits of `i`. Return `0` when `i==0`.
export function is_exp10(i) /* (i : int) -> int */  {
  return _int_count_pow10(i);
}
 
export function last1(s) /* (s : string) -> sslice */  {
  return _sslice_last(s);
}
 
 
// Used by the compiler to wrap main console applications
export function main_console(main) /* forall<a,e> (main : () -> e a) -> e a */  {
  return (main)();
}
 
 
// monadic lift
export function _mlift17672_op(_acc, f, yy, _ctail_17244) /* forall<a,b,e> (ctail<list<b>>, f : (value : a, rest : list<a>) -> e b, yy : list<a>, b) -> e list<b> */  {
   
  var _ctail_17245 = undefined;
   
  var _ctail_17246 = Cons(_ctail_17244, _ctail_17245);
  return _ctail_lift17187_map_peek(f, yy, $std_core_types._ctail_link(_acc,_ctail_17246,({value: _ctail_17246, field: "tail"})));
}
 
 
// monadic lift
export function _mlift17673_op(_accm, f0, yy0, _ctail_17249) /* forall<a,b,e> ((list<b>) -> list<b>, f : (value : a, rest : list<a>) -> e b, yy : list<a>, b) -> e list<b> */  {
  return _ctailm_lift17187_map_peek(f0, yy0, function(_ctail_17248 /* list<2770> */ ) {
      return _accm(Cons(_ctail_17249, _ctail_17248));
    });
}
 
 
// lifted local: map-peek, mappeek
export function _ctail_lift17187_map_peek(f1, ys, _acc0) /* forall<a,b,e> (f : (value : a, rest : list<a>) -> e b, ys : list<a>, ctail<list<b>>) -> e list<b> */  { tailcall: while(1)
{
  if (ys !== null) {
     
    var x_17759 = f1(ys.head, ys.tail);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_ctail_172440 /* 2770 */ ) {
        return _mlift17672_op(_acc0, f1, ys.tail, _ctail_172440);
      });
    }
    else {
       
      var _ctail_172450 = undefined;
       
      var _ctail_172460 = Cons(x_17759, _ctail_172450);
      {
        // tail call
        var _x18 = $std_core_types._ctail_link(_acc0,_ctail_172460,({value: _ctail_172460, field: "tail"}));
        ys = ys.tail;
        _acc0 = _x18;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
}}
 
 
// lifted local: map-peek, mappeek
export function _ctailm_lift17187_map_peek(f2, ys0, _accm0) /* forall<a,b,e> (f : (value : a, rest : list<a>) -> e b, ys : list<a>, (list<b>) -> list<b>) -> e list<b> */  { tailcall: while(1)
{
  if (ys0 !== null) {
     
    var x0_17762 = f2(ys0.head, ys0.tail);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_ctail_172490 /* 2770 */ ) {
        return _mlift17673_op(_accm0, f2, ys0.tail, _ctail_172490);
      });
    }
    else {
      {
        // tail call
        var _x21 = function(__dot_accm019 /* (list<2770>) -> list<2770> */ , _x0_1776220 /* 2770 */ ) {
          return function(_ctail_172480 /* list<2770> */ ) {
            return __dot_accm019(Cons(_x0_1776220, _ctail_172480));
          };
        }(_accm0, x0_17762);
        ys0 = ys0.tail;
        _accm0 = _x21;
        continue tailcall;
      }
    }
  }
  else {
    return _accm0(Nil);
  }
}}
 
 
// lifted local: map-peek, mappeek
export function _lift17187_map_peek(f3, ys1) /* forall<a,b,e> (f : (value : a, rest : list<a>) -> e b, ys : list<a>) -> e list<b> */  {
  var _x22 = $std_core_hnd._evv_is_affine();
  if (_x22) {
    return _ctail_lift17187_map_peek(f3, ys1, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_lift17187_map_peek(f3, ys1, function(_ctail_17247 /* list<2770> */ ) {
        return _ctail_17247;
      });
  }
}
 
 
// Apply a function `f`  to each element of the input list in sequence where `f` takes
// both the current element and the tail list as arguments.
export function map_peek(xs, f) /* forall<a,b,e> (xs : list<a>, f : (value : a, rest : list<a>) -> e b) -> e list<b> */  {
  return _lift17187_map_peek(f, xs);
}
 
export function mbint(m) /* (m : maybe<int>) -> int */  {
  return (m === null) ? 0 : m.value;
}
 
export function negate(i) /* (i : int) -> int */  {
  return $std_core._int_negate(i);
}
 
export var trace_enabled;
var trace_enabled = { value: true };
 
 
// Compose two funs `f` and `g`.
export function o(f, g) /* forall<a,b,c,e> (f : (a) -> e b, g : (c) -> e a) -> ((x : c) -> e b) */  {
  return function(x /* 2808 */ ) {
     
    var x0_17765 = g(x);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(f);
    }
    else {
      return f(x0_17765);
    }
  };
}
 
 
// Set a `hndler` that is always called when the `action` finishes (either normally or with an exception).
export function on_exit(hndler, action) /* forall<a,e> (hndler : () -> e (), action : () -> e a) -> e a */  {
  return $std_core_hnd.finally_prompt(hndler, action());
}
 
 
// monadic lift
export function _mlift17674_once(calc, r, _y_17363) /* forall<_h,_e,a> (calc : () -> a, r : ref<_h,maybe<a>>, maybe<a>) -> <read<_h>,write<_h>,div|_e> a */  {
  if (_y_17363 !== null) {
    return _y_17363.value;
  }
  else {
     
    var x0 = calc();
     
    ((r).value = ($std_core_types.Just(x0)));
    return x0;
  }
}
 
 
// Given a total function to calculate a value `:a`, return
// a total function that only calculates the value once and then
// returns the cached result.
export function once(calc) /* forall<a> (calc : () -> a) -> (() -> a) */  {
   
  var r = { value: ($std_core_types.Nothing) };
  return function() {
     
    var x_17769 = r.value;
     
    function next0_17770(_y_17363) /* (maybe<2933>) -> <read<_2842>,write<_2842>,div|_2925> 2933 */  {
      if (_y_17363 !== null) {
        return _y_17363.value;
      }
      else {
         
        var x00 = calc();
         
        ((r).value = ($std_core_types.Just(x00)));
        return x00;
      }
    }
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(next0_17770);
    }
    else {
      return next0_17770(x_17769);
    }
  };
}
 
export function xparse_int(s, hex) /* (s : string, hex : bool) -> maybe<int> */  {
  return _int_parse(s,hex);
}
 
 
// Internal: used for value effects
// TODO: revisit value effects codegen
export function phantom() /* forall<a> () -> a */  {
  return undefined;
}
 
 
// Returns a singleton list.
export function single(x) /* forall<a> (x : a) -> list<a> */  {
  return Cons(x, Nil);
}
 
 
// Convert a string to lower-case
export function to_lower(s) /* (s : string) -> string */  {
  return (s).toLowerCase();
}
 
export function xtrace(message0) /* (message : string) -> () */  {
  return _trace(message0);
}
 
export function xtrace_any(message0, x) /* forall<a> (message : string, x : a) -> () */  {
  return _trace_any(message0,x);
}
 
 
// clamp an `:int` to fit in an `:int8` but interpret the `:int` as an unsigned 8-bit value,
// and clamp between 0 and 255.
export function uint8(i) /* (i : int) -> int8 */  {
  return $std_core._int_clamp_byte(i);
}
 
export var unique_count;
var unique_count = { value: 0 };
 
 
// _Unsafe_. This function removes the exception effect (`:exn`) from the effect of an action
export function unsafe_no_exn(action) /* forall<a,e> (action : () -> <exn|e> a) -> e a */  {
  return action();
}
 
export function unvlist(xs) /* forall<a> (xs : list<a>) -> vector<a> */  {
  return _unvlist(xs);
}
 
 
// Create a new vector of length `n`  with initial elements given by function `f` .
export function vector_initz(n, f) /* forall<a> (n : ssize_t, f : (ssize_t) -> a) -> vector<a> */  {
  return _vector(n,f);
}
 
export function _lp__excl__eq__4_rp_(x, y) /* (x : order, y : order) -> bool */  {
  if (x === 1) {
    var _x23 = -1;
  }
  else if (x === 2) {
    var _x23 = 0;
  }
  else {
    var _x23 = 1;
  }
  if (y === 1) {
    var _x24 = -1;
  }
  else if (y === 2) {
    var _x24 = 0;
  }
  else {
    var _x24 = 1;
  }
  return $std_core._int_ne(_x23,_x24);
}
 
export function _lp__excl__eq__5_rp_(x, y) /* (x : bool, y : bool) -> bool */  {
  if (x) {
    return (y) ? false : true;
  }
  else {
    return y;
  }
}
 
 
// Add two integers.
export function _lp__plus__4_rp_(x, y) /* (x : int, y : int) -> int */  {
  return $std_core._int_add(x,y);
}
 
 
// Add two character code points
export function _lp__plus__3_rp_(c, d) /* (c : char, d : char) -> total char */  {
   
  var x_16954 = c;
   
  var y_16955 = d;
  return (($std_core._int_add(x_16954,y_16955)));
}
 
 
// Append two lists.
export function _ctail_append(xs, ys, _acc) /* forall<a> (xs : list<a>, ys : list<a>, ctail<list<a>>) -> list<a> */  { tailcall: while(1)
{
  if (xs !== null) {
     
    var _ctail_17250 = undefined;
     
    var _ctail_17251 = Cons(xs.head, _ctail_17250);
    {
      // tail call
      var _x25 = $std_core_types._ctail_link(_acc,_ctail_17251,({value: _ctail_17251, field: "tail"}));
      xs = xs.tail;
      _acc = _x25;
      continue tailcall;
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc,ys);
  }
}}
 
 
// Append two lists.
export function append(xs0, ys0) /* forall<a> (xs : list<a>, ys : list<a>) -> list<a> */  {
  return _ctail_append(xs0, ys0, $std_core_types._ctail_nil());
}
 
 
// Append two lists.
export function _lp__plus__plus__rp_(xs, ys) /* forall<a> (xs : list<a>, ys : list<a>) -> list<a> */  {
  return append(xs, ys);
}
 
 
// Append two strings.
export function _lp__plus__plus__1_rp_(x, y) /* (x : string, y : string) -> string */  {
  return (x + y);
}
 
 
// Substract two integers.
export function _lp__dash__4_rp_(x, y) /* (x : int, y : int) -> int */  {
  return $std_core._int_sub(x,y);
}
 
 
// Substract two character codePoints
export function _lp__dash__3_rp_(c, d) /* (c : char, d : char) -> total char */  {
   
  var x_16956 = c;
   
  var y_16957 = d;
  return (($std_core._int_sub(x_16956,y_16957)));
}
 
export function printsln(s) /* (s : string) -> console () */  {
  var _x26 = redirect.value;
  if (_x26 === null) {
    return xprintsln(s);
  }
  else {
    return _x26.value(_lp__plus__plus__1_rp_(s, "\n"));
  }
}
 
export function _lp__eq__eq__4_rp_(x, y) /* (x : order, y : order) -> bool */  {
  if (x === 1) {
    var _x27 = -1;
  }
  else if (x === 2) {
    var _x27 = 0;
  }
  else {
    var _x27 = 1;
  }
  if (y === 1) {
    var _x28 = -1;
  }
  else if (y === 2) {
    var _x28 = 0;
  }
  else {
    var _x28 = 1;
  }
  return $std_core._int_eq(_x27,_x28);
}
 
export function _lp__eq__eq__5_rp_(x, y) /* (x : bool, y : bool) -> bool */  {
  if (x) {
    return y;
  }
  else {
    return (y) ? false : true;
  }
}
 
export function _lp__lt__5_rp_(x, y) /* (x : order, y : order) -> bool */  {
  if (x === 1) {
    var _x29 = -1;
  }
  else if (x === 2) {
    var _x29 = 0;
  }
  else {
    var _x29 = 1;
  }
  if (y === 1) {
    var _x30 = -1;
  }
  else if (y === 2) {
    var _x30 = 0;
  }
  else {
    var _x30 = 1;
  }
  return $std_core._int_lt(_x29,_x30);
}
 
export function _lp__lt__6_rp_(x, y) /* (x : bool, y : bool) -> bool */  {
  return (x) ? false : y;
}
 
export function order(i) /* (i : int) -> order */  {
  if ($std_core._int_lt(i,0)) {
    return $std_core_types.Lt;
  }
  else {
    return ($std_core._int_gt(i,0)) ? $std_core_types.Gt : $std_core_types.Eq;
  }
}
 
 
// Compare two strings.
// Uses the character codes directly for comparison
export function compare_3(x, y) /* (x : string, y : string) -> order */  {
   
  var i_16964 = string_compare(x, y);
  if ($std_core._int_lt(i_16964,0)) {
    return $std_core_types.Lt;
  }
  else {
    return ($std_core._int_gt(i_16964,0)) ? $std_core_types.Gt : $std_core_types.Eq;
  }
}
 
export function _lp__lt__7_rp_(x, y) /* (x : string, y : string) -> bool */  {
   
  var x0_16965 = compare_3(x, y);
  if (x0_16965 === 1) {
    var _x31 = -1;
  }
  else if (x0_16965 === 2) {
    var _x31 = 0;
  }
  else {
    var _x31 = 1;
  }
  return $std_core._int_eq(_x31,(-1));
}
 
export function _lp__gt__3_rp_(x, y) /* (x : order, y : order) -> bool */  {
  if (x === 1) {
    var _x32 = -1;
  }
  else if (x === 2) {
    var _x32 = 0;
  }
  else {
    var _x32 = 1;
  }
  if (y === 1) {
    var _x33 = -1;
  }
  else if (y === 2) {
    var _x33 = 0;
  }
  else {
    var _x33 = 1;
  }
  return $std_core._int_gt(_x32,_x33);
}
 
export function _lp__gt__4_rp_(x, y) /* (x : bool, y : bool) -> bool */  {
  if (x) {
    return (y) ? false : true;
  }
  else {
    return false;
  }
}
 
export function _lp__gt__5_rp_(x, y) /* (x : string, y : string) -> bool */  {
   
  var x0_16972 = compare_3(x, y);
  if (x0_16972 === 1) {
    var _x34 = -1;
  }
  else if (x0_16972 === 2) {
    var _x34 = 0;
  }
  else {
    var _x34 = 1;
  }
  return $std_core._int_eq(_x34,1);
}
 
export function compare_1(x, y) /* (x : char, y : char) -> order */  {
  if ((x < y)) {
    return $std_core_types.Lt;
  }
  else {
    return ((x > y)) ? $std_core_types.Gt : $std_core_types.Eq;
  }
}
 
export function compare_2(x, y) /* (x : bool, y : bool) -> order */  {
  if (x) {
    if (x) {
      return (y) ? $std_core_types.Eq : $std_core_types.Gt;
    }
    else {
      return $std_core_types.Eq;
    }
  }
  else {
    if (y) {
      return $std_core_types.Lt;
    }
    else {
      if (x) {
        return (y) ? $std_core_types.Eq : $std_core_types.Gt;
      }
      else {
        return $std_core_types.Eq;
      }
    }
  }
}
 
export function _lp__gt__eq__4_rp_(x, y) /* (x : order, y : order) -> bool */  {
  if (x === 1) {
    var _x35 = -1;
  }
  else if (x === 2) {
    var _x35 = 0;
  }
  else {
    var _x35 = 1;
  }
  if (y === 1) {
    var _x36 = -1;
  }
  else if (y === 2) {
    var _x36 = 0;
  }
  else {
    var _x36 = 1;
  }
  return $std_core._int_ge(_x35,_x36);
}
 
export function _lp__gt__eq__5_rp_(x, y) /* (x : bool, y : bool) -> bool */  {
  if (x) {
    return true;
  }
  else {
    return (y) ? false : true;
  }
}
 
export function _lp__gt__eq__6_rp_(x, y) /* (x : string, y : string) -> bool */  {
   
  var x0_16988 = compare_3(x, y);
  if (x0_16988 === 1) {
    var _x37 = -1;
  }
  else if (x0_16988 === 2) {
    var _x37 = 0;
  }
  else {
    var _x37 = 1;
  }
  return $std_core._int_gt(_x37,(-1));
}
 
 
// lifted local: joinsep, join-acc
export function _lift17188_joinsep(sep, ys, acc) /* (sep : string, ys : list<string>, acc : string) -> string */  { tailcall: while(1)
{
  if (ys !== null) {
     
    var acc0_17216 = _lp__plus__plus__1_rp_(acc, _lp__plus__plus__1_rp_(sep, ys.head));
    {
      // tail call
      ys = ys.tail;
      acc = acc0_17216;
      continue tailcall;
    }
  }
  else {
    return acc;
  }
}}
 
 
// Concatenate all strings in a list
export function joinsep(xs, sep) /* (xs : list<string>, sep : string) -> string */  {
  if (xs === null) {
    return "";
  }
  else {
    return _lift17188_joinsep(sep, xs.tail, xs.head);
  }
}
 
 
// lifted local: join.2, join-acc
export function _lift17189_join_2(ys, acc) /* (ys : list<string>, acc : string) -> string */  { tailcall: while(1)
{
  if (ys !== null) {
    {
      // tail call
      var _x38 = _lp__plus__plus__1_rp_(acc, _lp__plus__plus__1_rp_("", ys.head));
      ys = ys.tail;
      acc = _x38;
      continue tailcall;
    }
  }
  else {
    return acc;
  }
}}
 
 
// Concatenate all strings in a list
export function join_2(xs) /* (xs : list<string>) -> string */  {
  if (xs === null) {
    return "";
  }
  else {
    return _lift17189_join_2(xs.tail, xs.head);
  }
}
 
 
// Concatenate all strings in a list using a specific separator
export function join_3(xs, sep) /* (xs : list<string>, sep : string) -> string */  {
  if (xs === null) {
    return "";
  }
  else {
    return _lift17188_joinsep(sep, xs.tail, xs.head);
  }
}
 
export function _lp__lt__eq__5_rp_(x, y) /* (x : order, y : order) -> bool */  {
  if (x === 1) {
    var _x39 = -1;
  }
  else if (x === 2) {
    var _x39 = 0;
  }
  else {
    var _x39 = 1;
  }
  if (y === 1) {
    var _x40 = -1;
  }
  else if (y === 2) {
    var _x40 = 0;
  }
  else {
    var _x40 = 1;
  }
  return $std_core._int_le(_x39,_x40);
}
 
export function _lp__lt__eq__6_rp_(x, y) /* (x : bool, y : bool) -> bool */  {
  if (x) {
    return (y);
  }
  else {
    return true;
  }
}
 
export function _lp__lt__eq__7_rp_(x, y) /* (x : string, y : string) -> bool */  {
   
  var x0_17000 = compare_3(x, y);
  if (x0_17000 === 1) {
    var _x41 = -1;
  }
  else if (x0_17000 === 2) {
    var _x41 = 0;
  }
  else {
    var _x41 = 1;
  }
  return $std_core._int_lt(_x41,1);
}
 
export function inc(i) /* (i : int) -> int */  {
  return $std_core._int_add(i,1);
}
 
export function decr(i) /* (i : int32) -> int32 */  {
  return ((i - 1)|0);
}
 
export function decr_1(i) /* (i : ssize_t) -> ssize_t */  {
  return (i - 1);
}
 
export function incr(i) /* (i : int32) -> int32 */  {
  return ((i + 1)|0);
}
 
export function incr_1(i) /* (i : ssize_t) -> ssize_t */  {
  return (i + 1);
}
 
 
// monadic lift
export function _mlift17675_op(action, end, i, wild__) /* forall<e> (action : (ssize_t) -> e (), end : ssize_t, i : ssize_t, wild_ : ()) -> e () */  {
   
  var i0_17219 = incr_1(i);
  return _lift17190_forz(action, end, i0_17219);
}
 
 
// lifted local: forz, rep
export function _lift17190_forz(action0, end0, i0) /* forall<e> (action : (ssize_t) -> e (), end : ssize_t, i : ssize_t) -> e () */  { tailcall: while(1)
{
  if ((i0 <= end0)) {
     
    var x_17777 = action0(i0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild__0 /* () */ ) {
        return _mlift17675_op(action0, end0, i0, wild__0);
      });
    }
    else {
       
      var i0_172190 = incr_1(i0);
      {
        // tail call
        i0 = i0_172190;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types._Unit_;
  }
}}
 
 
// Executes `action`  for each integer between `start`  upto `end`  (including both `start`  and `end` ).
// If `start > end`  the function returns without any call to `action` .
export function forz(start0, end, action) /* forall<e> (start : ssize_t, end : ssize_t, action : (ssize_t) -> e ()) -> e () */  {
  return _lift17190_forz(action, end, start0);
}
 
export function foreach_indexedz(v, f) /* forall<a,e> (v : vector<a>, f : (ssize_t, a) -> e ()) -> e () */  {
   
  var start0_17780 = 0;
   
  var end_17781 = decr_1(((v).length));
  return _lift17190_forz(function(i /* ssize_t */ ) {
      return f(i, (v)[i]);
    }, end_17781, start0_17780);
}
 
 
// lifted local: length.1, len0
export function _lift17191_length_1(ys, acc) /* forall<a> (ys : list<a>, acc : int) -> int */  { tailcall: while(1)
{
  if (ys !== null) {
    {
      // tail call
      var _x42 = $std_core._int_add(acc,1);
      ys = ys.tail;
      acc = _x42;
      continue tailcall;
    }
  }
  else {
    return acc;
  }
}}
 
 
// Returns the length of a list.
export function length_1(xs) /* forall<a> (xs : list<a>) -> int */  {
  return _lift17191_length_1(xs, 0);
}
 
 
// Return the length of a vector.
export function length_2(v) /* forall<a> (v : vector<a>) -> int */  {
  return $std_core._int_from_int32((((v).length)));
}
 
 
// Returns an integer list of increasing elements from `lo`  to `hi`
// (including both `lo`  and `hi` ).
// If `lo > hi`  the function returns the empty list.
export function _ctail_list(lo, hi, _acc) /* (lo : int, hi : int, ctail<list<int>>) -> total list<int> */  { tailcall: while(1)
{
  if ($std_core._int_le(lo,hi)) {
     
    var _ctail_17252 = undefined;
     
    var _ctail_17253 = Cons(lo, _ctail_17252);
    {
      // tail call
      var _x43 = $std_core._int_add(lo,1);
      var _x44 = $std_core_types._ctail_link(_acc,_ctail_17253,({value: _ctail_17253, field: "tail"}));
      lo = _x43;
      _acc = _x44;
      continue tailcall;
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc,Nil);
  }
}}
 
 
// Returns an integer list of increasing elements from `lo`  to `hi`
// (including both `lo`  and `hi` ).
// If `lo > hi`  the function returns the empty list.
export function list(lo0, hi0) /* (lo : int, hi : int) -> total list<int> */  {
  return _ctail_list(lo0, hi0, $std_core_types._ctail_nil());
}
 
 
// Returns an integer list of increasing elements from `lo`  to `hi` with stride `stride`.
// If `lo > hi`  the function returns the empty list.
export function _ctail_list_1(lo, hi, stride, _acc) /* (lo : int, hi : int, stride : int, ctail<list<int>>) -> total list<int> */  { tailcall: while(1)
{
  if ($std_core._int_le(lo,hi)) {
     
    var _ctail_17254 = undefined;
     
    var _ctail_17255 = Cons(lo, _ctail_17254);
    {
      // tail call
      var _x45 = $std_core._int_add(lo,stride);
      var _x46 = $std_core_types._ctail_link(_acc,_ctail_17255,({value: _ctail_17255, field: "tail"}));
      lo = _x45;
      _acc = _x46;
      continue tailcall;
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc,Nil);
  }
}}
 
 
// Returns an integer list of increasing elements from `lo`  to `hi` with stride `stride`.
// If `lo > hi`  the function returns the empty list.
export function list_1(lo0, hi0, stride0) /* (lo : int, hi : int, stride : int) -> total list<int> */  {
  return _ctail_list_1(lo0, hi0, stride0, $std_core_types._ctail_nil());
}
 
 
// monadic lift
export function _mlift17676_op(_acc, f, hi, lo, _ctail_17256) /* forall<a,e> (ctail<list<a>>, f : (int) -> e a, hi : int, lo : int, a) -> e list<a> */  {
   
  var _ctail_17257 = undefined;
   
  var _ctail_17258 = Cons(_ctail_17256, _ctail_17257);
  return _ctail_list_2($std_core._int_add(lo,1), hi, f, $std_core_types._ctail_link(_acc,_ctail_17258,({value: _ctail_17258, field: "tail"})));
}
 
 
// monadic lift
export function _mlift17677_op(_accm, f0, hi0, lo0, _ctail_17261) /* forall<a,e> ((list<a>) -> list<a>, f : (int) -> e a, hi : int, lo : int, a) -> e list<a> */  {
  return _ctailm_list_2($std_core._int_add(lo0,1), hi0, f0, function(_ctail_17260 /* list<4982> */ ) {
      return _accm(Cons(_ctail_17261, _ctail_17260));
    });
}
 
 
// Applies a function `f` to list of increasing elements from `lo`  to `hi`
// (including both `lo`  and `hi` ).
// If `lo > hi`  the function returns the empty list.
export function _ctail_list_2(lo1, hi1, f1, _acc0) /* forall<a,e> (lo : int, hi : int, f : (int) -> e a, ctail<list<a>>) -> e list<a> */  { tailcall: while(1)
{
  if ($std_core._int_le(lo1,hi1)) {
     
    var x_17783 = f1(lo1);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_ctail_172560 /* 4982 */ ) {
        return _mlift17676_op(_acc0, f1, hi1, lo1, _ctail_172560);
      });
    }
    else {
       
      var _ctail_172570 = undefined;
       
      var _ctail_172580 = Cons(x_17783, _ctail_172570);
      {
        // tail call
        var _x47 = $std_core._int_add(lo1,1);
        var _x48 = $std_core_types._ctail_link(_acc0,_ctail_172580,({value: _ctail_172580, field: "tail"}));
        lo1 = _x47;
        _acc0 = _x48;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
}}
 
 
// Applies a function `f` to list of increasing elements from `lo`  to `hi`
// (including both `lo`  and `hi` ).
// If `lo > hi`  the function returns the empty list.
export function _ctailm_list_2(lo2, hi2, f2, _accm0) /* forall<a,e> (lo : int, hi : int, f : (int) -> e a, (list<a>) -> list<a>) -> e list<a> */  { tailcall: while(1)
{
  if ($std_core._int_le(lo2,hi2)) {
     
    var x0_17786 = f2(lo2);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_ctail_172610 /* 4982 */ ) {
        return _mlift17677_op(_accm0, f2, hi2, lo2, _ctail_172610);
      });
    }
    else {
      {
        // tail call
        var _x51 = $std_core._int_add(lo2,1);
        var _x52 = function(__dot_accm049 /* (list<4982>) -> list<4982> */ , _x0_1778650 /* 4982 */ ) {
          return function(_ctail_172600 /* list<4982> */ ) {
            return __dot_accm049(Cons(_x0_1778650, _ctail_172600));
          };
        }(_accm0, x0_17786);
        lo2 = _x51;
        _accm0 = _x52;
        continue tailcall;
      }
    }
  }
  else {
    return _accm0(Nil);
  }
}}
 
 
// Applies a function `f` to list of increasing elements from `lo`  to `hi`
// (including both `lo`  and `hi` ).
// If `lo > hi`  the function returns the empty list.
export function list_2(lo3, hi3, f3) /* forall<a,e> (lo : int, hi : int, f : (int) -> e a) -> e list<a> */  {
  var _x53 = $std_core_hnd._evv_is_affine();
  if (_x53) {
    return _ctail_list_2(lo3, hi3, f3, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_list_2(lo3, hi3, f3, function(_ctail_17259 /* list<4982> */ ) {
        return _ctail_17259;
      });
  }
}
 
 
// monadic lift
export function _mlift17678_op(_acc, f, hi, lo, stride, _ctail_17262) /* forall<a,e> (ctail<list<a>>, f : (int) -> e a, hi : int, lo : int, stride : int, a) -> e list<a> */  {
   
  var _ctail_17263 = undefined;
   
  var _ctail_17264 = Cons(_ctail_17262, _ctail_17263);
  return _ctail_list_3($std_core._int_add(lo,stride), hi, stride, f, $std_core_types._ctail_link(_acc,_ctail_17264,({value: _ctail_17264, field: "tail"})));
}
 
 
// monadic lift
export function _mlift17679_op(_accm, f0, hi0, lo0, stride0, _ctail_17267) /* forall<a,e> ((list<a>) -> list<a>, f : (int) -> e a, hi : int, lo : int, stride : int, a) -> e list<a> */  {
  return _ctailm_list_3($std_core._int_add(lo0,stride0), hi0, stride0, f0, function(_ctail_17266 /* list<5073> */ ) {
      return _accm(Cons(_ctail_17267, _ctail_17266));
    });
}
 
 
// Returns an integer list of increasing elements from `lo`  to `hi` with stride `stride`.
// If `lo > hi`  the function returns the empty list.
export function _ctail_list_3(lo1, hi1, stride1, f1, _acc0) /* forall<a,e> (lo : int, hi : int, stride : int, f : (int) -> e a, ctail<list<a>>) -> e list<a> */  { tailcall: while(1)
{
  if ($std_core._int_le(lo1,hi1)) {
     
    var x_17789 = f1(lo1);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_ctail_172620 /* 5073 */ ) {
        return _mlift17678_op(_acc0, f1, hi1, lo1, stride1, _ctail_172620);
      });
    }
    else {
       
      var _ctail_172630 = undefined;
       
      var _ctail_172640 = Cons(x_17789, _ctail_172630);
      {
        // tail call
        var _x54 = $std_core._int_add(lo1,stride1);
        var _x55 = $std_core_types._ctail_link(_acc0,_ctail_172640,({value: _ctail_172640, field: "tail"}));
        lo1 = _x54;
        _acc0 = _x55;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
}}
 
 
// Returns an integer list of increasing elements from `lo`  to `hi` with stride `stride`.
// If `lo > hi`  the function returns the empty list.
export function _ctailm_list_3(lo2, hi2, stride2, f2, _accm0) /* forall<a,e> (lo : int, hi : int, stride : int, f : (int) -> e a, (list<a>) -> list<a>) -> e list<a> */  { tailcall: while(1)
{
  if ($std_core._int_le(lo2,hi2)) {
     
    var x0_17792 = f2(lo2);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_ctail_172670 /* 5073 */ ) {
        return _mlift17679_op(_accm0, f2, hi2, lo2, stride2, _ctail_172670);
      });
    }
    else {
      {
        // tail call
        var _x58 = $std_core._int_add(lo2,stride2);
        var _x59 = function(__dot_accm056 /* (list<5073>) -> list<5073> */ , _x0_1779257 /* 5073 */ ) {
          return function(_ctail_172660 /* list<5073> */ ) {
            return __dot_accm056(Cons(_x0_1779257, _ctail_172660));
          };
        }(_accm0, x0_17792);
        lo2 = _x58;
        _accm0 = _x59;
        continue tailcall;
      }
    }
  }
  else {
    return _accm0(Nil);
  }
}}
 
 
// Returns an integer list of increasing elements from `lo`  to `hi` with stride `stride`.
// If `lo > hi`  the function returns the empty list.
export function list_3(lo3, hi3, stride3, f3) /* forall<a,e> (lo : int, hi : int, stride : int, f : (int) -> e a) -> e list<a> */  {
  var _x60 = $std_core_hnd._evv_is_affine();
  if (_x60) {
    return _ctail_list_3(lo3, hi3, stride3, f3, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_list_3(lo3, hi3, stride3, f3, function(_ctail_17265 /* list<5073> */ ) {
        return _ctail_17265;
      });
  }
}
 
 
// monadic lift
export function _mlift17680_op(_acc, f, xx, _ctail_17268) /* forall<a,b,e> (ctail<list<b>>, f : (a) -> e b, xx : list<a>, b) -> e list<b> */  {
   
  var _ctail_17269 = undefined;
   
  var _ctail_17270 = Cons(_ctail_17268, _ctail_17269);
  return _ctail_map_5(xx, f, $std_core_types._ctail_link(_acc,_ctail_17270,({value: _ctail_17270, field: "tail"})));
}
 
 
// monadic lift
export function _mlift17681_op(_accm, f0, xx0, _ctail_17273) /* forall<a,b,e> ((list<b>) -> list<b>, f : (a) -> e b, xx : list<a>, b) -> e list<b> */  {
  return _ctailm_map_5(xx0, f0, function(_ctail_17272 /* list<6195> */ ) {
      return _accm(Cons(_ctail_17273, _ctail_17272));
    });
}
 
 
// Apply a function `f`  to each element of the input list in sequence.
export function _ctail_map_5(xs, f1, _acc0) /* forall<a,b,e> (xs : list<a>, f : (a) -> e b, ctail<list<b>>) -> e list<b> */  { tailcall: while(1)
{
  if (xs !== null) {
     
    var x0_17795 = f1(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_ctail_172680 /* 6195 */ ) {
        return _mlift17680_op(_acc0, f1, xs.tail, _ctail_172680);
      });
    }
    else {
       
      var _ctail_172690 = undefined;
       
      var _ctail_172700 = Cons(x0_17795, _ctail_172690);
      {
        // tail call
        var _x61 = $std_core_types._ctail_link(_acc0,_ctail_172700,({value: _ctail_172700, field: "tail"}));
        xs = xs.tail;
        _acc0 = _x61;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
}}
 
 
// Apply a function `f`  to each element of the input list in sequence.
export function _ctailm_map_5(xs0, f2, _accm0) /* forall<a,b,e> (xs : list<a>, f : (a) -> e b, (list<b>) -> list<b>) -> e list<b> */  { tailcall: while(1)
{
  if (xs0 !== null) {
     
    var x2_17798 = f2(xs0.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_ctail_172730 /* 6195 */ ) {
        return _mlift17681_op(_accm0, f2, xs0.tail, _ctail_172730);
      });
    }
    else {
      {
        // tail call
        var _x64 = function(__dot_accm062 /* (list<6195>) -> list<6195> */ , _x2_1779863 /* 6195 */ ) {
          return function(_ctail_172720 /* list<6195> */ ) {
            return __dot_accm062(Cons(_x2_1779863, _ctail_172720));
          };
        }(_accm0, x2_17798);
        xs0 = xs0.tail;
        _accm0 = _x64;
        continue tailcall;
      }
    }
  }
  else {
    return _accm0(Nil);
  }
}}
 
 
// Apply a function `f`  to each element of the input list in sequence.
export function map_5(xs1, f3) /* forall<a,b,e> (xs : list<a>, f : (a) -> e b) -> e list<b> */  {
  var _x65 = $std_core_hnd._evv_is_affine();
  if (_x65) {
    return _ctail_map_5(xs1, f3, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_map_5(xs1, f3, function(_ctail_17271 /* list<6195> */ ) {
        return _ctail_17271;
      });
  }
}
 
 
// Create a list of characters from `lo`  to `hi`  (inclusive).
export function list_4(lo, hi) /* (lo : char, hi : char) -> total list<char> */  {
  return map_5(list(lo, hi), (function(_x66) {
      return (_x66);
    }));
}
 
 
// Convert a `:maybe` type to a list type.
export function list_5(m) /* forall<a> (m : maybe<a>) -> list<a> */  {
  if (m === null) {
    return Nil;
  }
  else {
    return Cons(m.value, Nil);
  }
}
 
 
// Convert a string to a list of characters
export function list_6(s) /* (s : string) -> total list<char> */  {
  return _string_to_list(s);
}
 
 
// Convert a vector to a list.
export function list_7(v) /* forall<a> (v : vector<a>) -> list<a> */  {
  return vlist(v);
}
 
 
// monadic lift
export function _mlift17682_map(_y_17398) /* forall<a,e> (a) -> e maybe<a> */  {
  return $std_core_types.Just(_y_17398);
}
 
export function map(m, f) /* forall<a,b,e> (m : maybe<a>, f : (a) -> e b) -> e maybe<b> */  {
  if (m === null) {
    return $std_core_types.Nothing;
  }
  else {
     
    var x0_17801 = f(m.value);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_17398 /* 5375 */ ) {
        return $std_core_types.Just(_y_17398);
      });
    }
    else {
      return $std_core_types.Just(x0_17801);
    }
  }
}
 
 
// monadic lift
export function _mlift17683_map_1(_y_17400) /* forall<a,b,e> (b) -> e either<a,b> */  {
  return $std_core_types.Right(_y_17400);
}
 
 
// Map over the `Right` component of an `:either` type.
export function map_1(e, f) /* forall<a,b,c,e> (e : either<a,b>, f : (b) -> e c) -> e either<a,c> */  {
  if (e._tag === 2) {
     
    var x0_17805 = f(e.right);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_17400 /* 5413 */ ) {
        return $std_core_types.Right(_y_17400);
      });
    }
    else {
      return $std_core_types.Right(x0_17805);
    }
  }
  else {
    return $std_core_types.Left(e.left);
  }
}
 
 
// monadic lift
export function _mlift17684_map_2(_y_17402, _y_17403) /* forall<a,e> (a, a) -> e (a, a) */  {
  return $std_core_types._Tuple2_(_y_17402, _y_17403);
}
 
 
// monadic lift
export function _mlift17685_map_2(f, t, _y_17402) /* forall<a,b,e> (f : (a) -> e b, t : (a, a), b) -> e (b, b) */  {
   
  var _x67 = t.snd;
  var x_17809 = f(_x67);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_17403 /* 5558 */ ) {
      return $std_core_types._Tuple2_(_y_17402, _y_17403);
    });
  }
  else {
    return $std_core_types._Tuple2_(_y_17402, x_17809);
  }
}
 
export function map_2(t, f) /* forall<a,b,e> (t : (a, a), f : (a) -> e b) -> e (b, b) */  {
   
  var _x67 = t.fst;
  var x_17814 = f(_x67);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_17402 /* 5558 */ ) {
      return _mlift17685_map_2(f, t, _y_17402);
    });
  }
  else {
     
    var _x67 = t.snd;
    var x0_17818 = f(_x67);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_17403 /* 5558 */ ) {
        return $std_core_types._Tuple2_(x_17814, _y_17403);
      });
    }
    else {
      return $std_core_types._Tuple2_(x_17814, x0_17818);
    }
  }
}
 
 
// monadic lift
export function _mlift17686_map_3(_y_17404, _y_17405, _y_17406) /* forall<a,e> (a, a, a) -> e (a, a, a) */  {
  return $std_core_types._Tuple3_(_y_17404, _y_17405, _y_17406);
}
 
 
// monadic lift
export function _mlift17687_map_3(_y_17404, f, t, _y_17405) /* forall<a,b,e> (b, f : (a) -> e b, t : (a, a, a), b) -> e (b, b, b) */  {
   
  var _x67 = t.thd;
  var x_17824 = f(_x67);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_17406 /* 5776 */ ) {
      return $std_core_types._Tuple3_(_y_17404, _y_17405, _y_17406);
    });
  }
  else {
    return $std_core_types._Tuple3_(_y_17404, _y_17405, x_17824);
  }
}
 
 
// monadic lift
export function _mlift17688_map_3(f, t, _y_17404) /* forall<a,b,e> (f : (a) -> e b, t : (a, a, a), b) -> e (b, b, b) */  {
   
  var _x67 = t.snd;
  var x_17830 = f(_x67);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_17405 /* 5776 */ ) {
      return _mlift17687_map_3(_y_17404, f, t, _y_17405);
    });
  }
  else {
    return _mlift17687_map_3(_y_17404, f, t, x_17830);
  }
}
 
export function map_3(t, f) /* forall<a,b,e> (t : (a, a, a), f : (a) -> e b) -> e (b, b, b) */  {
   
  var _x67 = t.fst;
  var x_17833 = f(_x67);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_17404 /* 5776 */ ) {
      return _mlift17688_map_3(f, t, _y_17404);
    });
  }
  else {
     
    var _x67 = t.snd;
    var x0_17837 = f(_x67);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_17405 /* 5776 */ ) {
        return _mlift17687_map_3(x_17833, f, t, _y_17405);
      });
    }
    else {
       
      var _x67 = t.thd;
      var x1_17841 = f(_x67);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_17406 /* 5776 */ ) {
          return $std_core_types._Tuple3_(x_17833, x0_17837, _y_17406);
        });
      }
      else {
        return $std_core_types._Tuple3_(x_17833, x0_17837, x1_17841);
      }
    }
  }
}
 
 
// monadic lift
export function _mlift17689_map_4(_y_17407, _y_17408, _y_17409, _y_17410) /* forall<a,e> (a, a, a, a) -> e (a, a, a, a) */  {
  return $std_core_types._Tuple4_(_y_17407, _y_17408, _y_17409, _y_17410);
}
 
 
// monadic lift
export function _mlift17690_map_4(_y_17407, _y_17408, f, t, _y_17409) /* forall<a,b,e> (b, b, f : (a) -> e b, t : (a, a, a, a), b) -> e (b, b, b, b) */  {
   
  var _x67 = t.field4;
  var x_17848 = f(_x67);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_17410 /* 6063 */ ) {
      return $std_core_types._Tuple4_(_y_17407, _y_17408, _y_17409, _y_17410);
    });
  }
  else {
    return $std_core_types._Tuple4_(_y_17407, _y_17408, _y_17409, x_17848);
  }
}
 
 
// monadic lift
export function _mlift17691_map_4(_y_17407, f, t, _y_17408) /* forall<a,b,e> (b, f : (a) -> e b, t : (a, a, a, a), b) -> e (b, b, b, b) */  {
   
  var _x67 = t.thd;
  var x_17855 = f(_x67);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_17409 /* 6063 */ ) {
      return _mlift17690_map_4(_y_17407, _y_17408, f, t, _y_17409);
    });
  }
  else {
    return _mlift17690_map_4(_y_17407, _y_17408, f, t, x_17855);
  }
}
 
 
// monadic lift
export function _mlift17692_map_4(f, t, _y_17407) /* forall<a,b,e> (f : (a) -> e b, t : (a, a, a, a), b) -> e (b, b, b, b) */  {
   
  var _x67 = t.snd;
  var x_17858 = f(_x67);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_17408 /* 6063 */ ) {
      return _mlift17691_map_4(_y_17407, f, t, _y_17408);
    });
  }
  else {
    return _mlift17691_map_4(_y_17407, f, t, x_17858);
  }
}
 
export function map_4(t, f) /* forall<a,b,e> (t : (a, a, a, a), f : (a) -> e b) -> e (b, b, b, b) */  {
   
  var _x67 = t.fst;
  var x_17861 = f(_x67);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_17407 /* 6063 */ ) {
      return _mlift17692_map_4(f, t, _y_17407);
    });
  }
  else {
     
    var _x67 = t.snd;
    var x0_17865 = f(_x67);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_17408 /* 6063 */ ) {
        return _mlift17691_map_4(x_17861, f, t, _y_17408);
      });
    }
    else {
       
      var _x67 = t.thd;
      var x1_17869 = f(_x67);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_17409 /* 6063 */ ) {
          return _mlift17690_map_4(x_17861, x0_17865, f, t, _y_17409);
        });
      }
      else {
         
        var _x67 = t.field4;
        var x2_17873 = f(_x67);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_17410 /* 6063 */ ) {
            return $std_core_types._Tuple4_(x_17861, x0_17865, x1_17869, _y_17410);
          });
        }
        else {
          return $std_core_types._Tuple4_(x_17861, x0_17865, x1_17869, x2_17873);
        }
      }
    }
  }
}
 
 
// Apply a function `f` to each character in a string
export function map_6(s, f) /* forall<e> (s : string, f : (char) -> e char) -> e string */  {
   
  var x_17881 = map_5(list_6(s), f);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(string_2);
  }
  else {
    return string_2(x_17881);
  }
}
 
 
// monadic lift
export function _mlift17693_map_7(i, w, _y_17412) /* forall<a,e> (i : ssize_t, w : vector<a>, a) -> e () */  {
  return (w)[i] = _y_17412;
}
 
 
// monadic lift
export function _mlift17694_map_7(w, wild__) /* forall<a,e> (w : vector<a>, wild_ : ()) -> e vector<a> */  {
  return w;
}
 
 
// Apply a total function `f` to each element in a vector `v`
export function map_7(v, f) /* forall<a,b,e> (v : vector<a>, f : (a) -> e b) -> e vector<b> */  {
   
  var w = Array((ssize__t($std_core._int_from_int32((((v).length))))));
   
  var start0_17894 = 0;
   
  var end_17895 = decr_1(((v).length));
   
  var x_17884 = _lift17190_forz(function(i /* ssize_t */ ) {
       
      var x0_18115 = (v)[i];
       
      var x1_17889 = f(x0_18115);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_17412 /* 6580 */ ) {
          return (w)[i] = _y_17412;
        });
      }
      else {
        return (w)[i] = x1_17889;
      }
    }, end_17895, start0_17894);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return w;
    });
  }
  else {
    return w;
  }
}
 
 
// Right-align a string to width `width`  using `fill`  (default is a space) to fill from the left.
export function pad_left(s, width, fill) /* (s : string, width : int, fill : optional<char>) -> string */  {
   
  var w = ssize__t(width);
   
  var n = s.length;
  if ((w <= n)) {
    return s;
  }
  else {
    var _x67 = (fill !== undefined) ? fill : 0x0020;
    return _lp__plus__plus__1_rp_(repeatz(string(_x67), ((w - n)|0)), s);
  }
}
 
 
// Show an `:int` as a hexadecimal value.\
// The `width`  parameter specifies how wide the hex value is where `"0"`  is used to align.\
// The `use-capitals` parameter (= `True`) determines if captical letters should be used to display the hexadecimal digits.\
// The `pre` (=`"0x"`) is an optional prefix for the number (goes between the sign and the number).
export function show_hex(i, width, use_capitals, pre) /* (i : int, width : optional<int>, use-capitals : optional<bool>, pre : optional<string>) -> string */  {
  var _x68 = ($std_core._int_lt(i,0)) ? "-" : "";
  var _x69 = (pre !== undefined) ? pre : "0x";
  var _x70 = (use_capitals !== undefined) ? use_capitals : true;
  var _x71 = (width !== undefined) ? width : 1;
  return _lp__plus__plus__1_rp_(_x68, _lp__plus__plus__1_rp_(_x69, pad_left(int_show_hex($std_core._int_abs(i), _x70), _x71, 0x0030)));
}
 
export function sign_1(d) /* (d : float64) -> order */  {
  if ((d < (0.0))) {
    return $std_core_types.Lt;
  }
  else {
    return ((d > (0.0))) ? $std_core_types.Gt : $std_core_types.Eq;
  }
}
 
 
// Is the integer positive (stricly greater than zero)
export function is_pos_2(i) /* (i : int) -> bool */  {
   
  var x_17015 = $std_core._int_sign(i);
  if (x_17015 === 1) {
    var _x72 = -1;
  }
  else if (x_17015 === 2) {
    var _x72 = 0;
  }
  else {
    var _x72 = 1;
  }
  return $std_core._int_eq(_x72,1);
}
 
 
// Is the value positive?
export function is_pos_3(d) /* (d : float64) -> bool */  {
  return (d > (0.0));
}
 
 
// Is the list empty?
export function is_empty(xs) /* forall<a> (xs : list<a>) -> bool */  {
  return (xs === null);
}
 
 
// Is a slice empty?
export function is_empty_1(slice0) /* (slice : sslice) -> bool */  {
   
  var _x73 = slice0.len;
  var b_17019 = (_x73 > 0);
  return (b_17019) ? false : true;
}
 
 
// Is a string empty?
export function is_empty_2(s) /* (s : string) -> bool */  {
  return (s === (""));
}
 
export function _lp__bar__bar__rp_(m1, m2) /* forall<a> (m1 : maybe<a>, m2 : maybe<a>) -> maybe<a> */  {
  return (m1 === null) ? m2 : m1;
}
 
 
// Choose a non-empty string
export function _lp__bar__bar__1_rp_(x, y) /* (x : string, y : string) -> string */  {
  return ((x === (""))) ? y : x;
}
 
 
// Show a character as a string
export function show_char(c) /* (c : char) -> string */  {
  if ((c < 0x0020)) {
    if ((c === 0x000A)) {
      return "\\n";
    }
    else {
      if ((c === 0x000D)) {
        return "\\r";
      }
      else {
        if ((c === 0x0009)) {
          return "\\t";
        }
        else {
          var _x73 = $std_core._int_le(c,255);
          if (_x73) {
             
            var _arg_7906 = c;
            return _lp__plus__plus__1_rp_("\\x", show_hex(_arg_7906, 2, undefined, ""));
          }
          else {
            var _x74 = $std_core._int_le(c,65535);
            if (_x74) {
               
              var _arg_7994 = c;
              return _lp__plus__plus__1_rp_("\\u", show_hex(_arg_7994, 4, undefined, ""));
            }
            else {
               
              var _arg_8038 = c;
              return _lp__plus__plus__1_rp_("\\U", show_hex(_arg_8038, 6, undefined, ""));
            }
          }
        }
      }
    }
  }
  else {
    if ((c > 0x007E)) {
      if ((c === 0x000A)) {
        return "\\n";
      }
      else {
        if ((c === 0x000D)) {
          return "\\r";
        }
        else {
          if ((c === 0x0009)) {
            return "\\t";
          }
          else {
            var _x75 = $std_core._int_le(c,255);
            if (_x75) {
               
              var _arg_79060 = c;
              return _lp__plus__plus__1_rp_("\\x", show_hex(_arg_79060, 2, undefined, ""));
            }
            else {
              var _x76 = $std_core._int_le(c,65535);
              if (_x76) {
                 
                var _arg_79940 = c;
                return _lp__plus__plus__1_rp_("\\u", show_hex(_arg_79940, 4, undefined, ""));
              }
              else {
                 
                var _arg_80380 = c;
                return _lp__plus__plus__1_rp_("\\U", show_hex(_arg_80380, 6, undefined, ""));
              }
            }
          }
        }
      }
    }
    else {
      if ((c === 0x0027)) {
        return "\\\'";
      }
      else {
        if ((c === 0x0022)) {
          return "\\\"";
        }
        else {
          if ((c === 0x005C)) {
            return "\\\\";
          }
          else {
            return string(c);
          }
        }
      }
    }
  }
}
 
 
// Show a `:float64` in exponential (scientific) notation.
// The optional `precision` (= `-17`) specifies the precision.
// If `>=0` it specifies the number of digits behind the dot (up to `17` max).
// If negative, then at most the absolute value of `precision` digits behind the dot are used.
export function show_exp(d, precision) /* (d : float64, precision : optional<int>) -> string */  {
  var _x77 = (precision !== undefined) ? precision : -17;
  return show_expx(d, int32(_x77));
}
 
 
// Show a `:float64` fixed-point notation.
// The optional `precision` (= `-2`) specifies the maximum precision.
// If `>=0` it specifies the number of digits behind the dot (up to `20` max).
// If negative, then at most the absolute value of `precision` digits behind the dot are used.
// This may still show a number in exponential notation if the it is too small or large,
// in particular, for  a `d` where `d > 1.0e21` or `d < 1.0e-15`, or if
// `precision.abs > 17`, the `show-exp` routine is used.
export function show_fixed(d, precision) /* (d : float64, precision : optional<int>) -> string */  {
   
  var dabs = Math.abs(d);
  if ((dabs < (1.0e-15))) {
    var _x78 = (precision !== undefined) ? precision : -2;
    return show_expx(d, int32(_x78));
  }
  else {
    if ((dabs > (1.0e21))) {
      var _x79 = (precision !== undefined) ? precision : -2;
      return show_expx(d, int32(_x79));
    }
    else {
      var _x80 = (precision !== undefined) ? precision : -2;
      return show_fixedx(d, int32(_x80));
    }
  }
}
 
 
// lifted local: show-list, join-acc
export function _lift17192_show_list(sep, ys, acc) /* (sep : string, ys : list<string>, acc : string) -> string */  { tailcall: while(1)
{
  if (ys !== null) {
     
    var acc0_17221 = _lp__plus__plus__1_rp_(acc, _lp__plus__plus__1_rp_(sep, ys.head));
    {
      // tail call
      ys = ys.tail;
      acc = acc0_17221;
      continue tailcall;
    }
  }
  else {
    return acc;
  }
}}
 
 
// monadic lift
export function _mlift17695_show_list(_y_17414) /* forall<e> (list<string>) -> e string */  {
  if (_y_17414 === null) {
    var _x81 = "";
  }
  else {
    var _x81 = _lift17192_show_list(",", _y_17414.tail, _y_17414.head);
  }
  return _lp__plus__plus__1_rp_("[", _lp__plus__plus__1_rp_(_x81, "]"));
}
 
 
// Convert a list to a string
export function show_list(xs, show_elem) /* forall<a,e> (xs : list<a>, show-elem : (a) -> e string) -> e string */  {
   
  var x_17899 = map_5(xs, show_elem);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_17414 /* list<string> */ ) {
      if (_y_17414 === null) {
        var _x82 = "";
      }
      else {
        var _x82 = _lift17192_show_list(",", _y_17414.tail, _y_17414.head);
      }
      return _lp__plus__plus__1_rp_("[", _lp__plus__plus__1_rp_(_x82, "]"));
    });
  }
  else {
    if (x_17899 === null) {
      var _x83 = "";
    }
    else {
      var _x83 = _lift17192_show_list(",", x_17899.tail, x_17899.head);
    }
    return _lp__plus__plus__1_rp_("[", _lp__plus__plus__1_rp_(_x83, "]"));
  }
}
 
 
// Convert an `:int` to a string
export function show(i) /* (i : int) -> string */  {
  return i.toString();
}
 
 
// Show a `:float64` as a string.
// If `d >= 1.0e-5` and `d < 1.0e+21`, `show-fixed` is used and otherwise `show-exp`.
// Default `precision` is `-17`.
export function show_1(d, precision) /* (d : float64, precision : optional<int>) -> string */  {
   
  var dabs = Math.abs(d);
  if ((dabs >= (1.0e-5))) {
    if ((dabs < (1.0e21))) {
      var _x84 = (precision !== undefined) ? precision : -17;
      return show_fixed(d, _x84);
    }
    else {
      var _x85 = (precision !== undefined) ? precision : -17;
      return show_expx(d, int32(_x85));
    }
  }
  else {
    var _x86 = (precision !== undefined) ? precision : -17;
    return show_expx(d, int32(_x86));
  }
}
 
 
// Show the exception message
export function show_10(exn0) /* (exn : exception) -> string */  {
  return exn0.message;
}
 
 
// Show a `:char` as a character literal
export function show_2(c) /* (c : char) -> string */  {
  return _lp__plus__plus__1_rp_("\'", _lp__plus__plus__1_rp_(show_char(c), "\'"));
}
 
 
// lifted local: show.3, join-acc
export function _lift17193_show_3(ys, acc) /* (ys : list<string>, acc : string) -> string */  { tailcall: while(1)
{
  if (ys !== null) {
    {
      // tail call
      var _x87 = _lp__plus__plus__1_rp_(acc, _lp__plus__plus__1_rp_("", ys.head));
      ys = ys.tail;
      acc = _x87;
      continue tailcall;
    }
  }
  else {
    return acc;
  }
}}
 
 
// Show a string as a string literal
export function show_3(s) /* (s : string) -> string */  {
   
  var xs_17031 = map_5(list_6(s), show_char);
  if (xs_17031 === null) {
    var _x88 = "";
  }
  else {
    var _x88 = _lift17193_show_3(xs_17031.tail, xs_17031.head);
  }
  return _lp__plus__plus__1_rp_("\"", _lp__plus__plus__1_rp_(_x88, "\""));
}
 
 
// Convert a `:bool` to a string
export function show_4(b) /* (b : bool) -> string */  {
  return (b) ? "True" : "False";
}
 
 
// Convert a unit value `()` to a string
export function show_5(u) /* (u : ()) -> string */  {
  return "()";
}
 
 
// Show an `:sslice` as a string literal
export function show_6(s) /* (s : sslice) -> string */  {
  return show_3(string_3(s));
}
 
export function show_7(xs) /* (xs : list<string>) -> string */  {
  return show_list(xs, show_3);
}
 
export function show_8(xs) /* (xs : list<int>) -> string */  {
  return show_list(xs, show);
}
 
export function show_9(xs) /* (xs : list<bool>) -> string */  {
  return show_list(xs, show_4);
}
 
 
// Print a string to the console, including a final newline character.
export function println(s) /* (s : string) -> console () */  {
  return printsln(s);
}
 
 
// Print an integer to the console, including a final newline character.
export function println_1(i) /* (i : int) -> console () */  {
  return printsln(show(i));
}
 
 
// Print a float64 to the console, including a final newline character.
export function println_2(d) /* (d : float64) -> console () */  {
  return printsln(show_1(d));
}
 
 
// Print a boolean to the console, including a final newline character
export function println_3(b) /* (b : bool) -> console () */  {
  var _x89 = (b) ? "True" : "False";
  return printsln(_x89);
}
 
 
// Print a character to the console, including a final newline character.
export function println_4(c) /* (c : char) -> console () */  {
  return printsln(string(c));
}
 
 
// Print a unit value to the console, including a final newline character
export function println_5(u) /* (u : ()) -> console () */  {
  return printsln("()");
}
 
export function prints(s) /* (s : string) -> console () */  {
  var _x90 = redirect.value;
  if (_x90 === null) {
    return xprints(s);
  }
  else {
    return _x90.value(s);
  }
}
 
 
// call `throw-exn` operation of the `:exn` effect
export function throw_exn(exn0) /* forall<a> (exn : exception) -> exn a */  {
   
  var ev_17903 = $std_core_hnd._evv_at(0);
  var _x91 = _select_throw_exn(ev_17903.hnd);
  return _x91(ev_17903.marker, ev_17903, exn0);
}
 
export function _default_exn(action) /* forall<e> (action : () -> <console,exn|e> ()) -> <console|e> () */  {
  return _handle_exn(0, _Hnd_exn(function(m0 /* std/core/hnd/marker<<console|9734>,()> */ , ___wildcard__525__16 /* std/core/hnd/ev<.hnd-exn> */ , x /* exception */ ) {
      return $std_core_hnd.yield_to_final(m0, function(___wildcard__525__45 /* (std/core/hnd/resume-result<9736,()>) -> <console|9734> () */ ) {
           
          prints("uncaught exception: ");
          var _x92 = x.message;
          return printsln(_x92);
        });
    }), function(_x0 /* () */ ) {
      return _x0;
    }, action);
}
 
 
// Get (zero-based) element `n`  of a list. Return a `:maybe` type.
export function _lp__lb__rb__2_rp_(xs, n) /* forall<a> (xs : list<a>, n : int) -> maybe<a> */  { tailcall: while(1)
{
  if (xs !== null) {
    if ($std_core._int_gt(n,0)) {
      {
        // tail call
        var _x93 = $std_core._int_sub(n,1);
        xs = xs.tail;
        n = _x93;
        continue tailcall;
      }
    }
    else {
      if ($std_core._int_eq(n,0)) {
        return $std_core_types.Just(xs.head);
      }
      else {
        return $std_core_types.Nothing;
      }
    }
  }
  else {
    return $std_core_types.Nothing;
  }
}}
 
 
// Raise an integer `i` to the power of `exp`.
export function _lp__hat__1_rp_(i, exp) /* (i : int, exp : int) -> int */  {
  return pow(i, exp);
}
 
 
// O(1). Return the string slice from the end of `slice` argument
// to the end of the string.
export function after(slice0) /* (slice : sslice) -> sslice */  {
  return Sslice(slice0.str, (((slice0.start) + (slice0.len))|0), ((((slice0.str).length) - ((((slice0.start) + (slice0.len))|0)))|0));
}
 
 
// monadic lift
export function _mlift17696_all(predicate, xx, _y_17417) /* forall<a,e> (predicate : (a) -> e bool, xx : list<a>, bool) -> e bool */  {
  if (_y_17417) {
    return all(xx, predicate);
  }
  else {
    return false;
  }
}
 
 
// Do all elements satisfy a predicate ?
export function all(xs, predicate0) /* forall<a,e> (xs : list<a>, predicate : (a) -> e bool) -> e bool */  { tailcall: while(1)
{
  if (xs !== null) {
     
    var x0_17907 = predicate0(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_174170 /* bool */ ) {
        return _mlift17696_all(predicate0, xs.tail, _y_174170);
      });
    }
    else {
      if (x0_17907) {
        {
          // tail call
          xs = xs.tail;
          continue tailcall;
        }
      }
      else {
        return false;
      }
    }
  }
  else {
    return true;
  }
}}
 
 
// monadic lift
export function _mlift17697_any(predicate, xx, _y_17421) /* forall<a,e> (predicate : (a) -> e bool, xx : list<a>, bool) -> e bool */  {
  if (_y_17421) {
    return true;
  }
  else {
    return any(xx, predicate);
  }
}
 
 
// Are there any elements in a list that satisfy a predicate ?
export function any(xs, predicate0) /* forall<a,e> (xs : list<a>, predicate : (a) -> e bool) -> e bool */  { tailcall: while(1)
{
  if (xs !== null) {
     
    var x0_17910 = predicate0(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_174210 /* bool */ ) {
        return _mlift17697_any(predicate0, xs.tail, _y_174210);
      });
    }
    else {
      if (x0_17910) {
        return true;
      }
      else {
        {
          // tail call
          xs = xs.tail;
          continue tailcall;
        }
      }
    }
  }
  else {
    return false;
  }
}}
 
export function assert(message0, condition) /* (message : string, condition : bool) -> () */  {
  if (condition) {
    return $std_core_types._Unit_;
  }
  else {
    return unsafe_assert_fail(message0);
  }
}
 
 
// Return the element at position `index` in vector `v`, or `Nothing` if out of bounds
export function at(v, index) /* forall<a> (v : vector<a>, index : int) -> maybe<a> */  {
   
  var idx = ssize__t(index);
  var _x94 = ((((v).length)) <= idx);
  if (_x94) {
    return $std_core_types.Nothing;
  }
  else {
    return $std_core_types.Just((v)[idx]);
  }
}
 
 
// O(1). Return the string slice from the start of a string up to the
// start of `slice` argument.
export function before(slice0) /* (slice : sslice) -> sslice */  {
  return Sslice(slice0.str, 0, slice0.start);
}
 
 
// Convert an int to a boolean, using `False` for 0 and `True` otherwise.
export function bool(i) /* (i : int) -> bool */  {
  return $std_core._int_ne(i,0);
}
 
 
// Convert a `:maybe` type to a boolean using `False` for `Nothing` and `True` for `Just`.
export function bool_1(m) /* forall<a> (m : maybe<a>) -> bool */  {
  return (m === null) ? false : true;
}
 
 
// Convert a string to a boolean, using `False` for the empty string and `True` otherwise.
export function bool_2(s) /* (s : string) -> bool */  {
  return (s !== (""));
}
 
 
// O(`n`). The first `n` (default = `1`) characters in a string.
export function first(s, n) /* (s : string, n : optional<int>) -> sslice */  {
   
  var slice0 = first1(s);
  var _x96 = (n !== undefined) ? n : 1;
  var _x95 = $std_core._int_eq(_x96,1);
  if (_x95) {
    return slice0;
  }
  else {
    var _x97 = (n !== undefined) ? n : 1;
    return extend(slice0, $std_core._int_sub(_x97,1));
  }
}
 
 
// Convert the first character of a string to uppercase.
export function capitalize(s) /* (s : string) -> string */  {
   
  var slice2 = first1(s);
   
  var _x100 = undefined;
  var _x99 = (_x100 !== undefined) ? _x100 : 1;
  var _x98 = $std_core._int_eq(_x99,1);
  if (_x98) {
    var slice1_17046 = slice2;
  }
  else {
    var _x102 = undefined;
    var _x101 = (_x102 !== undefined) ? _x102 : 1;
    var slice1_17046 = extend(slice2, $std_core._int_sub(_x101,1));
  }
   
  var slice0 = first1(s);
  var _x101 = undefined;
  var _x100 = (_x101 !== undefined) ? _x101 : 1;
  var _x99 = $std_core._int_eq(_x100,1);
  if (_x99) {
    var _x98 = slice0;
  }
  else {
    var _x103 = undefined;
    var _x102 = (_x103 !== undefined) ? _x103 : 1;
    var _x98 = extend(slice0, $std_core._int_sub(_x102,1));
  }
  var _x104 = Sslice(slice1_17046.str, (((slice1_17046.start) + (slice1_17046.len))|0), ((((slice1_17046.str).length) - ((((slice1_17046.start) + (slice1_17046.len))|0)))|0));
  return _lp__plus__plus__1_rp_(to_upper(string_3(_x98)), string_3(_x104));
}
 
 
// Catch any exception raised in `action` and handle it.
// Use `on-exn` or `on-exit` when appropiate.
export function $try(action, hndl) /* forall<a,e> (action : () -> <exn|e> a, hndl : (exception) -> e a) -> e a */  {
  return _handle_exn(0, _Hnd_exn(function(m0 /* std/core/hnd/marker<10309,10308> */ , ___wildcard__525__16 /* std/core/hnd/ev<.hnd-exn> */ , x /* exception */ ) {
      return $std_core_hnd.yield_to_final(m0, function(___wildcard__525__45 /* (std/core/hnd/resume-result<10295,10308>) -> 10309 10308 */ ) {
          return hndl(x);
        });
    }), function(_x /* 10308 */ ) {
      return _x;
    }, action);
}
 
 
// monadic lift
export function _mlift17698_try_1(_y_17426) /* forall<a,e> (a) -> <exn|e> error<a> */  {
  return Ok(_y_17426);
}
 
 
// Transform an exception effect to an  `:error` type.
export function try_1(action) /* forall<a,e> (action : () -> <exn|e> a) -> e error<a> */  {
  return _handle_exn(0, _Hnd_exn(function(m0 /* std/core/hnd/marker<10348,error<10347>> */ , ___wildcard__525__16 /* std/core/hnd/ev<.hnd-exn> */ , x /* exception */ ) {
      return $std_core_hnd.yield_to_final(m0, function(___wildcard__525__45 /* (std/core/hnd/resume-result<10295,error<10347>>) -> 10348 error<10347> */ ) {
          return $Error(x);
        });
    }), function(_x /* error<10347> */ ) {
      return _x;
    }, function() {
       
      var x0_17915 = action();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_17426 /* 10347 */ ) {
          return Ok(_y_17426);
        });
      }
      else {
        return Ok(x0_17915);
      }
    });
}
 
 
// _Deprecated_; use `try` instead. Catch an exception raised by `throw` and handle it.
// Use `on-exn` or `on-exit` when appropiate.
export function $catch(action, hndl) /* forall<a,e> (action : () -> <exn|e> a, hndl : (exception) -> e a) -> e a */  {
  return $try(action, hndl);
}
 
export function cdivmod_exp10(i, n) /* (i : int, n : int) -> (int, int) */  {
  if ($std_core._int_le(n,0)) {
    return $std_core_types._Tuple2_(i, 0);
  }
  else {
     
    var cq = cdiv_exp10(i, n);
     
    var y_17054 = mul_exp10(cq, n);
     
    var cr = $std_core._int_sub(i,y_17054);
    return $std_core_types._Tuple2_(cq, cr);
  }
}
 
 
// Concatenate a list of `:maybe` values
export function _ctail_concat_maybe(xs, _acc) /* forall<a> (xs : list<maybe<a>>, ctail<list<a>>) -> list<a> */  { tailcall: while(1)
{
  if (xs !== null) {
    if (xs.head !== null) {
       
      var _ctail_17274 = undefined;
       
      var _ctail_17275 = Cons(xs.head.value, _ctail_17274);
      {
        // tail call
        var _x105 = $std_core_types._ctail_link(_acc,_ctail_17275,({value: _ctail_17275, field: "tail"}));
        xs = xs.tail;
        _acc = _x105;
        continue tailcall;
      }
    }
    else {
      {
        // tail call
        xs = xs.tail;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc,Nil);
  }
}}
 
 
// Concatenate a list of `:maybe` values
export function concat_maybe(xs0) /* forall<a> (xs : list<maybe<a>>) -> list<a> */  {
  return _ctail_concat_maybe(xs0, $std_core_types._ctail_nil());
}
 
 
// monadic lift
export function _mlift17699_op(action, end, i, _y_17429) /* forall<a,e> (action : (ssize_t) -> e maybe<a>, end : ssize_t, i : ssize_t, maybe<a>) -> e maybe<a> */  {
  if (_y_17429 === null) {
     
    var i0_17224 = incr_1(i);
    return _lift17194_for_whilez(action, end, i0_17224);
  }
  else {
    return $std_core_types.Just(_y_17429.value);
  }
}
 
 
// lifted local: for-whilez, rep
export function _lift17194_for_whilez(action0, end0, i0) /* forall<a,e> (action : (ssize_t) -> e maybe<a>, end : ssize_t, i : ssize_t) -> e maybe<a> */  { tailcall: while(1)
{
  if ((i0 <= end0)) {
     
    var x0_17918 = action0(i0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_174290 /* maybe<10541> */ ) {
        return _mlift17699_op(action0, end0, i0, _y_174290);
      });
    }
    else {
      if (x0_17918 === null) {
         
        var i0_172240 = incr_1(i0);
        {
          // tail call
          i0 = i0_172240;
          continue tailcall;
        }
      }
      else {
        return $std_core_types.Just(x0_17918.value);
      }
    }
  }
  else {
    return $std_core_types.Nothing;
  }
}}
 
 
// Executes `action`  for each integer between `start`  upto `end`  (including both `start`  and `end` ).
// If `start > end`  the function returns without any call to `action` .
// If `action` returns `Just`, the iteration is stopped and the result returned
export function for_whilez(start0, end, action) /* forall<a,e> (start : ssize_t, end : ssize_t, action : (ssize_t) -> e maybe<a>) -> e maybe<a> */  {
  return _lift17194_for_whilez(action, end, start0);
}
 
 
// O(1). The entire string as a slice
export function slice(s) /* (s : string) -> sslice */  {
  return Sslice(s, 0, s.length);
}
 
 
// monadic lift
export function _mlift17700_foreach_while(action, xx, _y_17434) /* forall<a,b,e> (action : (a) -> e maybe<b>, xx : list<a>, maybe<b>) -> e maybe<b> */  {
  if (_y_17434 === null) {
    return foreach_while(xx, action);
  }
  else {
    return _y_17434;
  }
}
 
 
// Invoke `action` for each element of a list while `action` return `Nothing`
export function foreach_while(xs, action0) /* forall<a,b,e> (xs : list<a>, action : (a) -> e maybe<b>) -> e maybe<b> */  { tailcall: while(1)
{
  if (xs === null) {
    return $std_core_types.Nothing;
  }
  else {
     
    var x0_17921 = action0(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_174340 /* maybe<10676> */ ) {
        return _mlift17700_foreach_while(action0, xs.tail, _y_174340);
      });
    }
    else {
      if (x0_17921 === null) {
        {
          // tail call
          xs = xs.tail;
          continue tailcall;
        }
      }
      else {
        return x0_17921;
      }
    }
  }
}}
 
 
// monadic lift
export function _mlift17701_foreach_while_1(action, rest, _y_17438) /* forall<a,e> (action : (c : char) -> e maybe<a>, rest : sslice, maybe<a>) -> e maybe<a> */  {
  if (_y_17438 === null) {
    return foreach_while_1(rest, action);
  }
  else {
    return _y_17438;
  }
}
 
 
// Apply a function for each character in a string slice.
// If `action` returns `Just`, the function returns immediately with that result.
export function foreach_while_1(slice0, action0) /* forall<a,e> (slice : sslice, action : (c : char) -> e maybe<a>) -> e maybe<a> */  { tailcall: while(1)
{
  var _x106 = next(slice0);
  if (_x106 === null) {
    return $std_core_types.Nothing;
  }
  else {
     
    var x_17924 = action0(_x106.value.fst);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_174380 /* maybe<10761> */ ) {
        return _mlift17701_foreach_while_1(action0, _x106.value.snd, _y_174380);
      });
    }
    else {
      if (x_17924 === null) {
        {
          // tail call
          slice0 = _x106.value.snd;
          continue tailcall;
        }
      }
      else {
        return x_17924;
      }
    }
  }
}}
 
 
// Invoke a function for each character in a string.
// If `action` returns `Just`, the function returns immediately with that result.
export function foreach_while_2(s, action) /* forall<a,e> (s : string, action : (c : char) -> e maybe<a>) -> e maybe<a> */  {
  return foreach_while_1(Sslice(s, 0, s.length), action);
}
 
 
// Invoke a function `f` for each element in a vector `v`.
// If `f` returns `Just`, the iteration is stopped early and the result is returned.
export function foreach_while_3(v, f) /* forall<a,b,e> (v : vector<a>, f : (a) -> e maybe<b>) -> e maybe<b> */  {
   
  var start0_17927 = 0;
   
  var end_17928 = decr_1(((v).length));
  return _lift17194_for_whilez(function(i /* ssize_t */ ) {
      return f((v)[i]);
    }, end_17928, start0_17927);
}
 
 
// monadic lift
export function _mlift17702_foreach(action, xx, wild__) /* forall<a,e> (action : (a) -> e (), xx : list<a>, wild_ : ()) -> e () */  {
  return foreach(xx, action);
}
 
 
// Invoke `action` for each element of a list
export function foreach(xs, action0) /* forall<a,e> (xs : list<a>, action : (a) -> e ()) -> e () */  { tailcall: while(1)
{
  if (xs !== null) {
     
    var x0_17930 = action0(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild__0 /* () */ ) {
        return _mlift17702_foreach(action0, xs.tail, wild__0);
      });
    }
    else {
      {
        // tail call
        xs = xs.tail;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types._Unit_;
  }
}}
 
 
// monadic lift
export function _mlift17703_foreach_1(wild__) /* forall<_a,e> (wild_ : ()) -> e maybe<_a> */  {
  return $std_core_types.Nothing;
}
 
 
// monadic lift
export function _mlift17704_foreach_1(wild__0) /* forall<_a,e> (wild_0 : maybe<_a>) -> e () */  {
  return $std_core_types._Unit_;
}
 
 
// Apply a function for each character in a string slice.
export function foreach_1(slice0, action) /* forall<e> (slice : sslice, action : (c : char) -> e ()) -> e () */  {
   
  var x_17933 = foreach_while_1(slice0, function(c /* char */ ) {
       
      var x0_17936 = action(c);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
          return $std_core_types.Nothing;
        });
      }
      else {
        return $std_core_types.Nothing;
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__00 /* maybe<_11100> */ ) {
      return $std_core_types._Unit_;
    });
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
 
// monadic lift
export function _mlift17705_foreach_2(wild__) /* forall<_a,e> (wild_ : ()) -> e maybe<_a> */  {
  return $std_core_types.Nothing;
}
 
 
// monadic lift
export function _mlift17706_foreach_2(wild__0) /* forall<_a,e> (wild_0 : maybe<_a>) -> e () */  {
  return $std_core_types._Unit_;
}
 
 
// Invoke a function for each character in a string
export function foreach_2(s, action) /* forall<e> (s : string, action : (c : char) -> e ()) -> e () */  {
   
  var slice0_17055 = Sslice(s, 0, s.length);
   
  var x_17940 = foreach_while_1(slice0_17055, function(c /* char */ ) {
       
      var x0_17943 = action(c);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
          return $std_core_types.Nothing;
        });
      }
      else {
        return $std_core_types.Nothing;
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__00 /* maybe<_11100> */ ) {
      return $std_core_types._Unit_;
    });
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
 
// Invoke a function `f` for each element in a vector `v`
export function foreach_3(v, f) /* forall<a,e> (v : vector<a>, f : (a) -> e ()) -> e () */  {
   
  var start0_17949 = 0;
   
  var end_17950 = decr_1(((v).length));
  return _lift17190_forz(function(i /* ssize_t */ ) {
       
      var x_18129 = (v)[i];
      return f(x_18129);
    }, end_17950, start0_17949);
}
 
 
// O(n). Return the number of characters in a string.
export function count_1(s) /* (s : string) -> int */  {
  return _string_count(s);
}
 
 
// O(n). Return the number of characters in a string slice
export function count_2(slice0) /* (slice : sslice) -> int */  {
  return _sslice_count(slice0);
}
 
 
// Count the number of times a predicate is true for each character in a string
export function count_3(s, pred) /* (s : string, pred : (char) -> bool) -> int */  {
  return function() {
     
    var loc = { value: 0 };
     
    var slice0_17062 = Sslice(s, 0, s.length);
     
    foreach_while_1(slice0_17062, function(c /* char */ ) {
         
        var _x107 = pred(c);
        if (_x107) {
           
          var x_17060 = ((loc).value);
          ((loc).value = ($std_core._int_add(x_17060,1)));
        }
        else {
          $std_core_types._Unit_;
        }
        return $std_core_types.Nothing;
      });
     
    var res = ((loc).value);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
export function dec(i) /* (i : int) -> int */  {
  return $std_core._int_sub(i,1);
}
 
 
// Create a new `:delayed` value.
export function delay(action) /* forall<a,e> (action : () -> e a) -> delayed<e,a> */  {
  return { value: ($std_core_types.Left(action)) };
}
 
 
// Calculate `10^exp`
export function exp10(exp) /* (exp : int) -> int */  {
  return mul_exp10(1, exp);
}
 
 
// Is the integer negative (stricly smaller than zero)
export function is_neg_2(i) /* (i : int) -> bool */  {
   
  var x_17067 = $std_core._int_sign(i);
  if (x_17067 === 1) {
    var _x107 = -1;
  }
  else if (x_17067 === 2) {
    var _x107 = 0;
  }
  else {
    var _x107 = 1;
  }
  return $std_core._int_eq(_x107,(-1));
}
 
 
// Is the value negative?
export function is_neg_3(d) /* (d : float64) -> bool */  {
  return (d < (0.0));
}
 
export function divmod_exp10(i, n) /* (i : int, n : int) -> (int, int) */  {
  var _x108 = cdivmod_exp10(i, n);
   
  var x_17067 = $std_core._int_sign((_x108.snd));
   
  if (x_17067 === 1) {
    var _x109 = -1;
  }
  else if (x_17067 === 2) {
    var _x109 = 0;
  }
  else {
    var _x109 = 1;
  }
  var b_17071 = $std_core._int_eq(_x109,(-1));
  if (b_17071) {
     
    var y0_17076 = mul_exp10(1, n);
    return $std_core_types._Tuple2_($std_core._int_sub((_x108.fst),1), $std_core._int_add((_x108.snd),y0_17076));
  }
  else {
    return $std_core_types._Tuple2_(_x108.fst, _x108.snd);
  }
}
 
 
// Drop the first `n` elements of a list (or fewer if the list is shorter than `n`)
export function drop(xs, n) /* forall<a> (xs : list<a>, n : int) -> list<a> */  { tailcall: while(1)
{
  if (xs !== null) {
    if ($std_core._int_gt(n,0)){
      {
        // tail call
        var _x109 = $std_core._int_sub(n,1);
        xs = xs.tail;
        n = _x109;
        continue tailcall;
      }
    }
  }
  return xs;
}}
 
 
// monadic lift
export function _mlift17707_drop_while(predicate, xs, xx, _y_17454) /* forall<a,e> (predicate : (a) -> e bool, xs : list<a>, xx : list<a>, bool) -> e list<a> */  {
  if (_y_17454) {
    return drop_while(xx, predicate);
  }
  else {
    return xs;
  }
}
 
 
// Drop all initial elements that satisfy `predicate`
export function drop_while(xs0, predicate0) /* forall<a,e> (xs : list<a>, predicate : (a) -> e bool) -> e list<a> */  { tailcall: while(1)
{
  if (xs0 !== null) {
     
    var x0_17954 = predicate0(xs0.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_174540 /* bool */ ) {
        return _mlift17707_drop_while(predicate0, xs0, xs0.tail, _y_174540);
      });
    }
    else {
      if (x0_17954) {
        {
          // tail call
          xs0 = xs0.tail;
          continue tailcall;
        }
      }
      else {
        return xs0;
      }
    }
  }
  else {
    return Nil;
  }
}}
 
 
// An empty slice
export var empty;
var empty = Sslice("", 0, 0);
 
 
// Does string `s`  end with `post`?
// If so, returns a slice of `s` from the start up to the `post` string at the end.
export function ends_with(s, post) /* (s : string, post : string) -> maybe<sslice> */  {
  var _x110 = xends_with(s, post);
  if (_x110) {
    return $std_core_types.Just(Sslice(s, 0, (((s.length) - (post.length))|0)));
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// Throw an exception with a specified message.
export function $throw(message0, info0) /* forall<a> (message : string, info : optional<exception-info>) -> exn a */  {
   
  var ev_17957 = $std_core_hnd._evv_at(0);
  var _x111 = _select_throw_exn(ev_17957.hnd);
  var _x112 = (info0 !== undefined) ? info0 : ExnError;
  return _x111(ev_17957.marker, ev_17957, Exception(message0, _x112));
}
 
 
// monadic lift
export function _mlift17708_error_pattern(definition, location, _c_17459) /* forall<a> (definition : string, location : string, string) -> a */  {
   
  var message0_17081 = _lp__plus__plus__1_rp_(location, _lp__plus__plus__1_rp_(_c_17459, ": pattern match failure"));
   
  var ev_17960 = $std_core_hnd._evv_at(0);
  var _x113 = _select_throw_exn(ev_17960.hnd);
  return _x113(ev_17960.marker, ev_17960, Exception(message0_17081, ExnPattern(location, definition)));
}
 
 
// Raise a pattern match exception. This is function is used internally by the
// compiler to generate error messages on pattern match failures.
export function error_pattern(location, definition) /* forall<a> (location : string, definition : string) -> exn a */  {
   
  if ((definition === (""))) {
    var x_17963 = "";
  }
  else {
    var x_17963 = _lp__plus__plus__1_rp_(": ", definition);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_17459 /* string */ ) {
      return _mlift17708_error_pattern(definition, location, _c_17459);
    });
  }
  else {
     
    var message0_17081 = _lp__plus__plus__1_rp_(location, _lp__plus__plus__1_rp_(x_17963, ": pattern match failure"));
     
    var ev_17966 = $std_core_hnd._evv_at(0);
    var _x114 = _select_throw_exn(ev_17966.hnd);
    return _x114(ev_17966.marker, ev_17966, Exception(message0_17081, ExnPattern(location, definition)));
  }
}
 
 
// Transform an `:error` type back to an `exn` effect.
export function untry(err) /* forall<a> (err : error<a>) -> exn a */  {
  if (err._tag === 1) {
     
    var ev_17969 = $std_core_hnd._evv_at(0);
    var _x115 = _select_throw_exn(ev_17969.hnd);
    return _x115(ev_17969.marker, ev_17969, err.exception);
  }
  else {
    return err.result;
  }
}
 
 
// Transform an `:error` type back to an `exn` effect.
export function exn(err) /* forall<a> (err : error<a>) -> exn a */  {
  return untry(err);
}
 
 
// Calculate `2^exp`.
export function exp2(exp) /* (exp : int) -> int */  {
  return pow(2, exp);
}
 
 
// monadic lift
export function _mlift17709_op(_acc, pred, x, xx, _y_17464) /* forall<a,e> (ctail<list<a>>, pred : (a) -> e bool, x : a, xx : list<a>, bool) -> e list<a> */  {
  if (_y_17464) {
     
    var _ctail_17276 = undefined;
     
    var _ctail_17277 = Cons(x, _ctail_17276);
    return _ctail_filter(xx, pred, $std_core_types._ctail_link(_acc,_ctail_17277,({value: _ctail_17277, field: "tail"})));
  }
  else {
    return _ctail_filter(xx, pred, _acc);
  }
}
 
 
// monadic lift
export function _mlift17710_op(_accm, pred0, x0, xx0, _y_17469) /* forall<a,e> ((list<a>) -> list<a>, pred : (a) -> e bool, x : a, xx : list<a>, bool) -> e list<a> */  {
  if (_y_17469) {
    return _ctailm_filter(xx0, pred0, function(_ctail_17279 /* list<11895> */ ) {
        return _accm(Cons(x0, _ctail_17279));
      });
  }
  else {
    return _ctailm_filter(xx0, pred0, _accm);
  }
}
 
 
// Retain only those elements of a list that satisfy the given predicate `pred`.
// For example: `filter([1,2,3],odd?) == [1,3]`
export function _ctail_filter(xs, pred1, _acc0) /* forall<a,e> (xs : list<a>, pred : (a) -> e bool, ctail<list<a>>) -> e list<a> */  { tailcall: while(1)
{
  if (xs !== null) {
     
    var x2_17972 = pred1(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_174640 /* bool */ ) {
        return _mlift17709_op(_acc0, pred1, xs.head, xs.tail, _y_174640);
      });
    }
    else {
      if (x2_17972) {
         
        var _ctail_172760 = undefined;
         
        var _ctail_172770 = Cons(xs.head, _ctail_172760);
        {
          // tail call
          var _x116 = $std_core_types._ctail_link(_acc0,_ctail_172770,({value: _ctail_172770, field: "tail"}));
          xs = xs.tail;
          _acc0 = _x116;
          continue tailcall;
        }
      }
      else {
        {
          // tail call
          xs = xs.tail;
          continue tailcall;
        }
      }
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
}}
 
 
// Retain only those elements of a list that satisfy the given predicate `pred`.
// For example: `filter([1,2,3],odd?) == [1,3]`
export function _ctailm_filter(xs0, pred2, _accm0) /* forall<a,e> (xs : list<a>, pred : (a) -> e bool, (list<a>) -> list<a>) -> e list<a> */  { tailcall: while(1)
{
  if (xs0 !== null) {
     
    var x4_17975 = pred2(xs0.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_174690 /* bool */ ) {
        return _mlift17710_op(_accm0, pred2, xs0.head, xs0.tail, _y_174690);
      });
    }
    else {
      if (x4_17975) {
        {
          // tail call
          var _x119 = function(__dot_accm0117 /* (list<11895>) -> list<11895> */ , _x3118 /* 11895 */ ) {
            return function(_ctail_172790 /* list<11895> */ ) {
              return __dot_accm0117(Cons(_x3118, _ctail_172790));
            };
          }(_accm0, xs0.head);
          xs0 = xs0.tail;
          _accm0 = _x119;
          continue tailcall;
        }
      }
      else {
        {
          // tail call
          xs0 = xs0.tail;
          continue tailcall;
        }
      }
    }
  }
  else {
    return _accm0(Nil);
  }
}}
 
 
// Retain only those elements of a list that satisfy the given predicate `pred`.
// For example: `filter([1,2,3],odd?) == [1,3]`
export function filter(xs1, pred3) /* forall<a,e> (xs : list<a>, pred : (a) -> e bool) -> e list<a> */  {
  var _x120 = $std_core_hnd._evv_is_affine();
  if (_x120) {
    return _ctail_filter(xs1, pred3, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_filter(xs1, pred3, function(_ctail_17278 /* list<11895> */ ) {
        return _ctail_17278;
      });
  }
}
 
 
// monadic lift
export function _mlift17711_op(_acc, pred, xx, _y_17477) /* forall<a,b,e> (ctail<list<b>>, pred : (a) -> e maybe<b>, xx : list<a>, maybe<b>) -> e list<b> */  {
  if (_y_17477 === null) {
    return _ctail_filter_map(xx, pred, _acc);
  }
  else {
     
    var _ctail_17280 = undefined;
     
    var _ctail_17281 = Cons(_y_17477.value, _ctail_17280);
    return _ctail_filter_map(xx, pred, $std_core_types._ctail_link(_acc,_ctail_17281,({value: _ctail_17281, field: "tail"})));
  }
}
 
 
// monadic lift
export function _mlift17712_op(_accm, pred0, xx0, _y_17482) /* forall<a,b,e> ((list<b>) -> list<b>, pred : (a) -> e maybe<b>, xx : list<a>, maybe<b>) -> e list<b> */  {
  if (_y_17482 === null) {
    return _ctailm_filter_map(xx0, pred0, _accm);
  }
  else {
    return _ctailm_filter_map(xx0, pred0, function(_ctail_17283 /* list<11941> */ ) {
        return _accm(Cons(_y_17482.value, _ctail_17283));
      });
  }
}
 
 
// Retain only those elements of a list that satisfy the given predicate `pred`.
// For example: `filterMap([1,2,3],fn(i) { if i.odd? then Nothing else Just(i*i) }) == [4]`
export function _ctail_filter_map(xs, pred1, _acc0) /* forall<a,b,e> (xs : list<a>, pred : (a) -> e maybe<b>, ctail<list<b>>) -> e list<b> */  { tailcall: while(1)
{
  if (xs === null) {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
  else {
     
    var x0_17978 = pred1(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_174770 /* maybe<11941> */ ) {
        return _mlift17711_op(_acc0, pred1, xs.tail, _y_174770);
      });
    }
    else {
      if (x0_17978 === null) {
        {
          // tail call
          xs = xs.tail;
          continue tailcall;
        }
      }
      else {
         
        var _ctail_172800 = undefined;
         
        var _ctail_172810 = Cons(x0_17978.value, _ctail_172800);
        {
          // tail call
          var _x121 = $std_core_types._ctail_link(_acc0,_ctail_172810,({value: _ctail_172810, field: "tail"}));
          xs = xs.tail;
          _acc0 = _x121;
          continue tailcall;
        }
      }
    }
  }
}}
 
 
// Retain only those elements of a list that satisfy the given predicate `pred`.
// For example: `filterMap([1,2,3],fn(i) { if i.odd? then Nothing else Just(i*i) }) == [4]`
export function _ctailm_filter_map(xs0, pred2, _accm0) /* forall<a,b,e> (xs : list<a>, pred : (a) -> e maybe<b>, (list<b>) -> list<b>) -> e list<b> */  { tailcall: while(1)
{
  if (xs0 === null) {
    return _accm0(Nil);
  }
  else {
     
    var x2_17981 = pred2(xs0.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_174820 /* maybe<11941> */ ) {
        return _mlift17712_op(_accm0, pred2, xs0.tail, _y_174820);
      });
    }
    else {
      if (x2_17981 === null) {
        {
          // tail call
          xs0 = xs0.tail;
          continue tailcall;
        }
      }
      else {
        {
          // tail call
          var _x124 = function(__dot_accm0122 /* (list<11941>) -> list<11941> */ , _y2123 /* 11941 */ ) {
            return function(_ctail_172830 /* list<11941> */ ) {
              return __dot_accm0122(Cons(_y2123, _ctail_172830));
            };
          }(_accm0, x2_17981.value);
          xs0 = xs0.tail;
          _accm0 = _x124;
          continue tailcall;
        }
      }
    }
  }
}}
 
 
// Retain only those elements of a list that satisfy the given predicate `pred`.
// For example: `filterMap([1,2,3],fn(i) { if i.odd? then Nothing else Just(i*i) }) == [4]`
export function filter_map(xs1, pred3) /* forall<a,b,e> (xs : list<a>, pred : (a) -> e maybe<b>) -> e list<b> */  {
  var _x125 = $std_core_hnd._evv_is_affine();
  if (_x125) {
    return _ctail_filter_map(xs1, pred3, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_filter_map(xs1, pred3, function(_ctail_17282 /* list<11941> */ ) {
        return _ctail_17282;
      });
  }
}
 
export function is_zero_1(i) /* (i : ssize_t) -> bool */  {
  return (i === 0);
}
 
 
// Is the value zero?
export function is_zero_2(d) /* (d : float64) -> bool */  {
  return (d === (0.0));
}
 
 
// Find the first element satisfying some predicate
export function find(xs, pred) /* forall<a> (xs : list<a>, pred : (a) -> bool) -> maybe<a> */  {
  return foreach_while(xs, function(x /* 12039 */ ) {
      var _x126 = pred(x);
      if (_x126) {
        return $std_core_types.Just(x);
      }
      else {
        return $std_core_types.Nothing;
      }
    });
}
 
 
// O(n). If it occurs, return the position of substring `sub` in `s`, tupled with
// the position just following the substring `sub`.
export function find_1(s, sub) /* (s : string, sub : string) -> maybe<sslice> */  {
   
  var i = ((s).indexOf(sub) + 1);
  var _x127 = is_zero_1(i);
  if (_x127) {
    return $std_core_types.Nothing;
  }
  else {
    return $std_core_types.Just(Sslice(s, decr_1(i), sub.length));
  }
}
 
 
// Return the last index of substring `sub` in `s` if it occurs.
export function find_last(s, sub) /* (s : string, sub : string) -> maybe<sslice> */  {
   
  var i = ((s).lastIndexOf(sub) + 1);
  var _x128 = is_zero_1(i);
  if (_x128) {
    return $std_core_types.Nothing;
  }
  else {
    return $std_core_types.Just(Sslice(s, decr_1(i), sub.length));
  }
}
 
 
// Find the first element satisfying some predicate and return it.
export function find_maybe(xs, pred) /* forall<a,b> (xs : list<a>, pred : (a) -> maybe<b>) -> maybe<b> */  {
  return foreach_while(xs, pred);
}
 
 
// monadic lift
export function _mlift17713_op(_acc, f, xx, _y_17490) /* forall<a,b,e> (ctail<list<b>>, f : (a) -> e maybe<b>, xx : list<a>, maybe<b>) -> e list<b> */  {
  if (_y_17490 !== null) {
     
    var _ctail_17284 = undefined;
     
    var _ctail_17285 = Cons(_y_17490.value, _ctail_17284);
    return _ctail_flatmap_maybe(xx, f, $std_core_types._ctail_link(_acc,_ctail_17285,({value: _ctail_17285, field: "tail"})));
  }
  else {
    return _ctail_flatmap_maybe(xx, f, _acc);
  }
}
 
 
// monadic lift
export function _mlift17714_op(_accm, f0, xx0, _y_17495) /* forall<a,b,e> ((list<b>) -> list<b>, f : (a) -> e maybe<b>, xx : list<a>, maybe<b>) -> e list<b> */  {
  if (_y_17495 !== null) {
    return _ctailm_flatmap_maybe(xx0, f0, function(_ctail_17287 /* list<12245> */ ) {
        return _accm(Cons(_y_17495.value, _ctail_17287));
      });
  }
  else {
    return _ctailm_flatmap_maybe(xx0, f0, _accm);
  }
}
 
 
// Concatenate the `Just` result elements from applying a function to all elements.
export function _ctail_flatmap_maybe(xs, f1, _acc0) /* forall<a,b,e> (xs : list<a>, f : (a) -> e maybe<b>, ctail<list<b>>) -> e list<b> */  { tailcall: while(1)
{
  if (xs !== null) {
     
    var x0_17984 = f1(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_174900 /* maybe<12245> */ ) {
        return _mlift17713_op(_acc0, f1, xs.tail, _y_174900);
      });
    }
    else {
      if (x0_17984 !== null) {
         
        var _ctail_172840 = undefined;
         
        var _ctail_172850 = Cons(x0_17984.value, _ctail_172840);
        {
          // tail call
          var _x129 = $std_core_types._ctail_link(_acc0,_ctail_172850,({value: _ctail_172850, field: "tail"}));
          xs = xs.tail;
          _acc0 = _x129;
          continue tailcall;
        }
      }
      else {
        {
          // tail call
          xs = xs.tail;
          continue tailcall;
        }
      }
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
}}
 
 
// Concatenate the `Just` result elements from applying a function to all elements.
export function _ctailm_flatmap_maybe(xs0, f2, _accm0) /* forall<a,b,e> (xs : list<a>, f : (a) -> e maybe<b>, (list<b>) -> list<b>) -> e list<b> */  { tailcall: while(1)
{
  if (xs0 !== null) {
     
    var x2_17987 = f2(xs0.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_174950 /* maybe<12245> */ ) {
        return _mlift17714_op(_accm0, f2, xs0.tail, _y_174950);
      });
    }
    else {
      if (x2_17987 !== null) {
        {
          // tail call
          var _x132 = function(__dot_accm0130 /* (list<12245>) -> list<12245> */ , _y2131 /* 12245 */ ) {
            return function(_ctail_172870 /* list<12245> */ ) {
              return __dot_accm0130(Cons(_y2131, _ctail_172870));
            };
          }(_accm0, x2_17987.value);
          xs0 = xs0.tail;
          _accm0 = _x132;
          continue tailcall;
        }
      }
      else {
        {
          // tail call
          xs0 = xs0.tail;
          continue tailcall;
        }
      }
    }
  }
  else {
    return _accm0(Nil);
  }
}}
 
 
// Concatenate the `Just` result elements from applying a function to all elements.
export function flatmap_maybe(xs1, f3) /* forall<a,b,e> (xs : list<a>, f : (a) -> e maybe<b>) -> e list<b> */  {
  var _x133 = $std_core_hnd._evv_is_affine();
  if (_x133) {
    return _ctail_flatmap_maybe(xs1, f3, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_flatmap_maybe(xs1, f3, function(_ctail_17286 /* list<12245> */ ) {
        return _ctail_17286;
      });
  }
}
 
 
// monadic lift
export function _mlift17715_fold_int(end, f, start0, x) /* forall<a,e> (end : int, f : (int, a) -> e a, start0 : int, x : a) -> e a */  {
  return fold_int($std_core._int_add(start0,1), end, x, f);
}
 
 
// fold over the integers between [`start`,`end`] (inclusive).
export function fold_int(start00, end0, init0, f0) /* forall<a,e> (start : int, end : int, init : a, f : (int, a) -> e a) -> e a */  { tailcall: while(1)
{
  if ($std_core._int_ge(start00,end0)) {
    return init0;
  }
  else {
     
    var x0_17990 = f0(start00, init0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(x1 /* 12305 */ ) {
        return _mlift17715_fold_int(end0, f0, start00, x1);
      });
    }
    else {
      {
        // tail call
        var _x134 = $std_core._int_add(start00,1);
        start00 = _x134;
        init0 = x0_17990;
        continue tailcall;
      }
    }
  }
}}
 
 
// fold over the integers between [0,`upto`)  (not including `upto`).
export function fold_int_1(upto, init0, f) /* forall<a,e> (upto : int, init : a, f : (int, a) -> e a) -> e a */  {
  return fold_int(0, $std_core._int_sub(upto,1), init0, f);
}
 
 
// monadic lift
export function _mlift17716_foldl(f, xx, _y_17507) /* forall<a,e,b> (f : (a, b) -> e a, xx : list<b>, a) -> e a */  {
  return foldl(xx, _y_17507, f);
}
 
 
// Fold a list from the left, i.e. `foldl([1,2],0,(+)) == (0+1)+2`
// Since `foldl` is tail recursive, it is preferred over `foldr` when using an associative function `f`
export function foldl(xs, z, f0) /* forall<a,b,e> (list<a>, b, (b, a) -> e b) -> e b */  { tailcall: while(1)
{
  if (xs !== null) {
     
    var x0_17993 = f0(z, xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_175070 /* 12365 */ ) {
        return _mlift17716_foldl(f0, xs.tail, _y_175070);
      });
    }
    else {
      {
        // tail call
        xs = xs.tail;
        z = x0_17993;
        continue tailcall;
      }
    }
  }
  else {
    return z;
  }
}}
 
export function foldl1(xs, f) /* forall<a,e> (xs : list<a>, f : (a, a) -> <exn|e> a) -> <exn|e> a */  {
  if (xs !== null) {
    return foldl(xs.tail, xs.head, f);
  }
  else {
    return $std_core_hnd._open_at2($std_core_hnd._evv_index(_tag_exn), $throw, "unexpected Nil in std/core/foldl1");
  }
}
 
 
// lifted local: reverse, reverse-acc
export function _lift17195_reverse(acc, ys) /* forall<a> (acc : list<a>, ys : list<a>) -> list<a> */  { tailcall: while(1)
{
  if (ys !== null) {
    {
      // tail call
      var _x135 = Cons(ys.head, acc);
      acc = _x135;
      ys = ys.tail;
      continue tailcall;
    }
  }
  else {
    return acc;
  }
}}
 
 
// Reverse a list.
export function reverse(xs) /* forall<a> (xs : list<a>) -> list<a> */  {
  return _lift17195_reverse(Nil, xs);
}
 
 
// Fold a list from the right, i.e. `foldr([1,2],0,(+)) == 1+(2+0)`
// Note, `foldr` is less efficient than `foldl` as it reverses the list first.
export function foldr(xs, z, f) /* forall<a,b,e> (xs : list<a>, z : b, f : (a, b) -> e b) -> e b */  {
  return foldl(_lift17195_reverse(Nil, xs), z, function(x /* 12439 */ , y /* 12443 */ ) {
      return f(y, x);
    });
}
 
export function foldr1(xs, f) /* forall<a,e> (xs : list<a>, f : (a, a) -> <exn|e> a) -> <exn|e> a */  {
   
  var xs0_17091 = _lift17195_reverse(Nil, xs);
  if (xs0_17091 !== null) {
    return foldl(xs0_17091.tail, xs0_17091.head, f);
  }
  else {
    return $std_core_hnd._open_at2($std_core_hnd._evv_index(_tag_exn), $throw, "unexpected Nil in std/core/foldl1");
  }
}
 
 
// monadic lift
export function _mlift17717_op(action, end, i, wild__) /* forall<e> (action : (int) -> e (), end : int, i : int, wild_ : ()) -> e () */  {
   
  var i0_17225 = $std_core._int_add(i,1);
  return _lift17196_for(action, end, i0_17225);
}
 
 
// lifted local: for, rep
export function _lift17196_for(action0, end0, i0) /* forall<e> (action : (int) -> e (), end : int, i : int) -> e () */  { tailcall: while(1)
{
  if ($std_core._int_le(i0,end0)) {
     
    var x_17998 = action0(i0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild__0 /* () */ ) {
        return _mlift17717_op(action0, end0, i0, wild__0);
      });
    }
    else {
       
      var i0_172250 = $std_core._int_add(i0,1);
      {
        // tail call
        i0 = i0_172250;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types._Unit_;
  }
}}
 
 
// Executes `action`  for each integer between `start`  upto `end`  (including both `start`  and `end` ).
// If `start > end`  the function returns without any call to `action` .
export function $for(start0, end, action) /* forall<e> (start : int, end : int, action : (int) -> e ()) -> e () */  {
  return _lift17196_for(action, end, start0);
}
 
 
// monadic lift
export function _mlift17718_op(action, end, i, _y_17522) /* forall<a,e> (action : (int) -> e maybe<a>, end : int, i : int, maybe<a>) -> e maybe<a> */  {
  if (_y_17522 === null) {
     
    var i0_17226 = $std_core._int_add(i,1);
    return _lift17197_for_while(action, end, i0_17226);
  }
  else {
    return $std_core_types.Just(_y_17522.value);
  }
}
 
 
// lifted local: for-while, rep
export function _lift17197_for_while(action0, end0, i0) /* forall<a,e> (action : (int) -> e maybe<a>, end : int, i : int) -> e maybe<a> */  { tailcall: while(1)
{
  if ($std_core._int_le(i0,end0)) {
     
    var x_18001 = action0(i0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_175220 /* maybe<12564> */ ) {
        return _mlift17718_op(action0, end0, i0, _y_175220);
      });
    }
    else {
      if (x_18001 === null) {
         
        var i0_172260 = $std_core._int_add(i0,1);
        {
          // tail call
          i0 = i0_172260;
          continue tailcall;
        }
      }
      else {
        return $std_core_types.Just(x_18001.value);
      }
    }
  }
  else {
    return $std_core_types.Nothing;
  }
}}
 
 
// Executes `action`  for each integer between `start`  upto `end`  (including both `start`  and `end` ).
// If `start > end`  the function returns without any call to `action` .
// If `action` returns `Just`, the iteration is stopped and the result returned
export function for_while(start0, end, action) /* forall<a,e> (start : int, end : int, action : (int) -> e maybe<a>) -> e maybe<a> */  {
  return _lift17197_for_while(action, end, start0);
}
 
 
// monadic lift
export function _mlift17719_foreach_indexed(i, _y_17530) /* forall<h,e> (i : local-var<h,int>, int) -> <local<h>|e> () */  {
  return ((i).value = ($std_core._int_add(_y_17530,1)));
}
 
 
// monadic lift
export function _mlift17720_foreach_indexed(i, wild__) /* forall<h,e> (i : local-var<h,int>, wild_ : ()) -> <local<h>|e> () */  {
   
  var x_18004 = ((i).value);
   
  function next0_18005(_y_17530) /* (int) -> <local<12669>|12676> () */  {
    return ((i).value = ($std_core._int_add(_y_17530,1)));
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next0_18005);
  }
  else {
    return next0_18005(x_18004);
  }
}
 
 
// monadic lift
export function _mlift17721_foreach_indexed(action, i, x, j) /* forall<h,a,e> (action : (int, a) -> e (), i : local-var<h,int>, x : a, j : int) -> <local<h>|e> () */  {
   
  var x0_18008 = action(j, x);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return _mlift17720_foreach_indexed(i, wild__);
    });
  }
  else {
    return _mlift17720_foreach_indexed(i, x0_18008);
  }
}
 
 
// Invoke `action` for each element of a list, passing also the position of the element.
export function foreach_indexed(xs, action) /* forall<a,e> (xs : list<a>, action : (int, a) -> e ()) -> e () */  {
  return function() {
     
    var loc = { value: 0 };
     
    var res = foreach(xs, function(x /* 12675 */ ) {
         
        var x0_18013 = ((loc).value);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(j /* int */ ) {
            return _mlift17721_foreach_indexed(action, loc, x, j);
          });
        }
        else {
          return _mlift17721_foreach_indexed(action, loc, x, x0_18013);
        }
      });
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
 
// Invoke a function `f` for each element in a vector `v`
export function foreach_indexed_1(v, f) /* forall<a,e> (v : vector<a>, f : (int, a) -> e ()) -> e () */  {
   
  var start0_18017 = 0;
   
  var end_18018 = decr_1(((v).length));
  return _lift17190_forz(function(i /* ssize_t */ ) {
       
      var x_18143 = (v)[i];
      return f($std_core._int_from_int32(i), x_18143);
    }, end_18018, start0_18017);
}
 
 
// Print a string to the console.
export function print(s) /* (s : string) -> console () */  {
  return prints(s);
}
 
 
// Print an integer to the console.
export function print_1(i) /* (i : int) -> console () */  {
  return prints(show(i));
}
 
 
// Print a float64 to the console.
export function print_2(d) /* (d : float64) -> console () */  {
  return prints(show_1(d));
}
 
 
// Print a boolean to the console
export function print_3(b) /* (b : bool) -> console () */  {
  var _x136 = (b) ? "True" : "False";
  return prints(_x136);
}
 
 
// Print a character to the console.
export function print_4(c) /* (c : char) -> console () */  {
  return prints(string(c));
}
 
 
// Print a unit value to the console
export function print_5(u) /* (u : ()) -> console () */  {
  return prints("()");
}
 
 
// Generic print routine: prints the internal representation as a string to the console,
// including a final newline character.
// Note: this breaks parametricity so it should not be pub
export function gprint(x) /* forall<a> (x : a) -> console () */  {
   
  var s_17100 = gshow(x);
  return prints(s_17100);
}
 
 
// Generic print routine: prints the internal representation as a string to the console, including a final newline character.
// Note: this breaks parametricity so it should not be pub
export function gprintln(x) /* forall<a> (x : a) -> console () */  {
   
  var s_17101 = gshow(x);
  return printsln(s_17101);
}
 
 
// Return the head of list if the list is not empty.
export function head_1(xs) /* forall<a> (xs : list<a>) -> maybe<a> */  {
  if (xs !== null) {
    return $std_core_types.Just(xs.head);
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// Return the head of list if the list is not empty, or use `default` otherwise
export function head_2(xs, default0) /* forall<a> (xs : list<a>, default : a) -> a */  {
  return (xs !== null) ? xs.head : default0;
}
 
 
// Return the first character of a string as a string (or the empty string)
export function head_3(s) /* (s : string) -> string */  {
   
  var slice0 = first1(s);
  var _x140 = undefined;
  var _x139 = (_x140 !== undefined) ? _x140 : 1;
  var _x138 = $std_core._int_eq(_x139,1);
  if (_x138) {
    var _x137 = slice0;
  }
  else {
    var _x142 = undefined;
    var _x141 = (_x142 !== undefined) ? _x142 : 1;
    var _x137 = extend(slice0, $std_core._int_sub(_x141,1));
  }
  return string_3(_x137);
}
 
 
// Return the first character of a string (or `Nothing` for the empty string).
export function head_char(s) /* (s : string) -> maybe<char> */  {
  return foreach_while_1(Sslice(s, 0, s.length), $std_core_types.Just);
}
 
 
// Convenient shorthand to `int32`, e.g. `1234.i32`
export function i32(i) /* (i : int) -> int32 */  {
  return int32(i);
}
 
 
// Convenient shorthand to `int64`, e.g. `1234.i64`
export function i64(i) /* (i : int) -> int64 */  {
  return int64(i);
}
 
export function index_of_acc(xs, pred, idx) /* forall<a> (xs : list<a>, pred : (a) -> bool, idx : int) -> int */  { tailcall: while(1)
{
  if (xs !== null) {
    var _x143 = pred(xs.head);
    if (_x143) {
      return idx;
    }
    else {
      {
        // tail call
        var _x144 = $std_core._int_add(idx,1);
        xs = xs.tail;
        idx = _x144;
        continue tailcall;
      }
    }
  }
  else {
    return -1;
  }
}}
 
 
// Returns the index of the first element where `pred` holds, or `-1` if no such element exists.
export function index_of(xs, pred) /* forall<a> (xs : list<a>, pred : (a) -> bool) -> int */  {
  return index_of_acc(xs, pred, 0);
}
 
 
// Return the list without its last element.
// Return an empty list for an empty list.
export function _ctail_init(xs, _acc) /* forall<a> (xs : list<a>, ctail<list<a>>) -> list<a> */  { tailcall: while(1)
{
  if (xs !== null && xs.tail !== null) {
     
    var _ctail_17288 = undefined;
     
    var _ctail_17289 = Cons(xs.head, _ctail_17288);
    {
      // tail call
      var _x145 = $std_core_types._ctail_link(_acc,_ctail_17289,({value: _ctail_17289, field: "tail"}));
      xs = xs.tail;
      _acc = _x145;
      continue tailcall;
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc,Nil);
  }
}}
 
 
// Return the list without its last element.
// Return an empty list for an empty list.
export function init(xs0) /* forall<a> (xs : list<a>) -> list<a> */  {
  return _ctail_init(xs0, $std_core_types._ctail_nil());
}
 
 
// An invalid slice
export var invalid;
var invalid = Sslice("", -1, 0);
 
 
// Is the character a lower-case ASCII character ?
export function is_lower(c) /* (c : char) -> bool */  {
  return ((c >= 0x0061)) ? (c <= 0x007A) : false;
}
 
 
// Is the character an upper-case ASCII character ?
export function is_upper(c) /* (c : char) -> bool */  {
  return ((c >= 0x0041)) ? (c <= 0x005A) : false;
}
 
 
// Is the character an ASCII letter is-
export function is_alpha(c) /* (c : char) -> bool */  {
  if ((c >= 0x0061)) {
    if ((c <= 0x007A)) {
      return true;
    }
    else {
      return ((c >= 0x0041)) ? (c <= 0x005A) : false;
    }
  }
  else {
    return ((c >= 0x0041)) ? (c <= 0x005A) : false;
  }
}
 
 
// Is the character an ASCII digit ?
export function is_digit(c) /* (c : char) -> bool */  {
  return ((c >= 0x0030)) ? (c <= 0x0039) : false;
}
 
 
// Is the character ASCII letter or digit?
export function is_alpha_num(c) /* (c : char) -> bool */  {
  var _x146 = is_alpha(c);
  if (_x146) {
    return true;
  }
  else {
    return ((c >= 0x0030)) ? (c <= 0x0039) : false;
  }
}
 
 
// Is the character an ASCII character, e.g. `c <= '\x7F'`  ?
export function is_ascii(c) /* (c : char) -> bool */  {
  return (c <= 0x007F);
}
 
 
// Is the character an ASCII control character, e.g. `c < ' '`  ?
export function is_control(c) /* (c : char) -> bool */  {
  return (c < 0x0020);
}
 
 
// Is the character an ASCII hexa-decimal digit ?
export function is_hex_digit(c) /* (c : char) -> bool */  {
  if ((c >= 0x0030)) {
    if ((c <= 0x0039)) {
      return true;
    }
    else {
      if ((c >= 0x0061)) {
        if ((c <= 0x0066)) {
          return true;
        }
        else {
          return ((c >= 0x0041)) ? (c <= 0x0046) : false;
        }
      }
      else {
        return ((c >= 0x0041)) ? (c <= 0x0046) : false;
      }
    }
  }
  else {
    if ((c >= 0x0061)) {
      if ((c <= 0x0066)) {
        return true;
      }
      else {
        return ((c >= 0x0041)) ? (c <= 0x0046) : false;
      }
    }
    else {
      return ((c >= 0x0041)) ? (c <= 0x0046) : false;
    }
  }
}
 
 
// Is a slice not empty?
export function is_notempty(slice0) /* (slice : sslice) -> bool */  {
  var _x147 = slice0.len;
  return (_x147 > 0);
}
 
 
// Is a string not empty?
export function is_notempty_1(s) /* (s : string) -> bool */  {
  return (s !== (""));
}
 
 
// Is a slice invalid?
export function is_valid(slice0) /* (slice : sslice) -> bool */  {
  var _x148 = slice0.start;
  return (_x148 >= 0);
}
 
 
// Tests if a character is an element of `" \t\n\r"`
export function is_white(c) /* (c : char) -> bool */  {
  if ((c === 0x0020)) {
    return true;
  }
  else {
    if ((c === 0x0009)) {
      return true;
    }
    else {
      return ((c === 0x000A)) ? true : (c === 0x000D);
    }
  }
}
 
 
// Append `end` to each string in the list `xs` and join them all together.\
// `join-end([],end) === ""`\
// `join-end(["a","b"],"/") === "a/b/"`
export function join_end(xs, end) /* (xs : list<string>, end : string) -> string */  {
  if (xs === null) {
    return "";
  }
  else {
    if (xs === null) {
      var _x149 = "";
    }
    else {
      var _x149 = _lift17188_joinsep(end, xs.tail, xs.head);
    }
    return _lp__plus__plus__1_rp_(_x149, end);
  }
}
 
 
// Return the last element of a list (or `Nothing` for the empty list)
export function last(xs) /* forall<a> (xs : list<a>) -> maybe<a> */  { tailcall: while(1)
{
  if (xs !== null && xs.tail === null) {
    return $std_core_types.Just(xs.head);
  }
  else if (xs !== null) {
    {
      // tail call
      xs = xs.tail;
      continue tailcall;
    }
  }
  else {
    return $std_core_types.Nothing;
  }
}}
 
 
// Return the last element of a list (or `default` for the empty list)
export function last_1(xs, default0) /* forall<a> (xs : list<a>, default : a) -> a */  { tailcall: while(1)
{
  if (xs !== null && xs.tail === null) {
    return xs.head;
  }
  else if (xs !== null) {
    {
      // tail call
      xs = xs.tail;
      continue tailcall;
    }
  }
  else {
    return default0;
  }
}}
 
 
// O(`n`). The last `n` (default = `1`) characters in a string
export function last_2(s, n) /* (s : string, n : optional<int>) -> sslice */  {
   
  var slice0 = last1(s);
  var _x151 = (n !== undefined) ? n : 1;
  var _x150 = $std_core._int_eq(_x151,1);
  if (_x150) {
    return slice0;
  }
  else {
    var _x152 = (n !== undefined) ? n : 1;
    var _x153 = (n !== undefined) ? n : 1;
    return extend(advance(slice0, $std_core._int_sub(1,_x152)), $std_core._int_sub(_x153,1));
  }
}
 
 
// Take the first `n` elements of a list (or fewer if the list is shorter than `n`)
export function _ctail_take(xs, n, _acc) /* forall<a> (xs : list<a>, n : int, ctail<list<a>>) -> list<a> */  { tailcall: while(1)
{
  if (xs !== null) {
    if ($std_core._int_gt(n,0)){
       
      var _ctail_17290 = undefined;
       
      var _ctail_17291 = Cons(xs.head, _ctail_17290);
      {
        // tail call
        var _x154 = $std_core._int_sub(n,1);
        var _x155 = $std_core_types._ctail_link(_acc,_ctail_17291,({value: _ctail_17291, field: "tail"}));
        xs = xs.tail;
        n = _x154;
        _acc = _x155;
        continue tailcall;
      }
    }
  }
  return $std_core_types._ctail_resolve(_acc,Nil);
}}
 
 
// Take the first `n` elements of a list (or fewer if the list is shorter than `n`)
export function take(xs0, n0) /* forall<a> (xs : list<a>, n : int) -> list<a> */  {
  return _ctail_take(xs0, n0, $std_core_types._ctail_nil());
}
 
 
// split a list at position `n`
export function split(xs, n) /* forall<a> (xs : list<a>, n : int) -> (list<a>, list<a>) */  {
  return $std_core_types._Tuple2_(take(xs, n), drop(xs, n));
}
 
 
// Split a string into parts that were delimited by `sep`. The delimeters are not included in the results.
// For example: `split("1,,2",",") == ["1","","2]`
export function split_1(s, sep) /* (s : string, sep : string) -> list<string> */  {
   
  var v_17122 = ((s).split(sep));
  return vlist(v_17122);
}
 
 
// Split a string into at most `n` parts that were delimited by a string `sep`. The delimeters are not included in the results (except for possibly the final part).
// For example: `split("1,2,3",",",2) == ["1","2,3"]`
export function split_2(s, sep, n) /* (s : string, sep : string, n : int) -> list<string> */  {
   
  var v_17123 = (s).split(sep, (ssize__t(n)));
  return vlist(v_17123);
}
 
 
// Split a string into a list of lines
export function lines(s) /* (s : string) -> list<string> */  {
   
  var v_17126 = ((s).split(("\n")));
  return vlist(v_17126);
}
 
 
// Lookup the first element satisfying some predicate
export function lookup(xs, pred) /* forall<a,b> (xs : list<(a, b)>, pred : (a) -> bool) -> maybe<b> */  {
  return foreach_while(xs, function(kv /* (14189, 14190) */ ) {
      var _x157 = kv.fst;
      var _x156 = pred(_x157);
      if (_x156) {
        var _x158 = kv.snd;
        return $std_core_types.Just(_x158);
      }
      else {
        return $std_core_types.Nothing;
      }
    });
}
 
 
// monadic lift
export function _mlift17722_op(_acc, f, i0_17228, yy, _ctail_17292) /* forall<a,b,e> (ctail<list<b>>, f : (idx : int, value : a) -> e b, i0.17228 : int, yy : list<a>, b) -> e list<b> */  {
   
  var _ctail_17293 = undefined;
   
  var _ctail_17294 = Cons(_ctail_17292, _ctail_17293);
  return _ctail_lift17198_map_indexed(f, yy, i0_17228, $std_core_types._ctail_link(_acc,_ctail_17294,({value: _ctail_17294, field: "tail"})));
}
 
 
// monadic lift
export function _mlift17723_op(_accm, f0, i0_172280, yy0, _ctail_17297) /* forall<a,b,e> ((list<b>) -> list<b>, f : (idx : int, value : a) -> e b, i0.17228 : int, yy : list<a>, b) -> e list<b> */  {
  return _ctailm_lift17198_map_indexed(f0, yy0, i0_172280, function(_ctail_17296 /* list<14245> */ ) {
      return _accm(Cons(_ctail_17297, _ctail_17296));
    });
}
 
 
// lifted local: map-indexed, map-idx
export function _ctail_lift17198_map_indexed(f1, ys, i, _acc0) /* forall<a,b,e> (f : (idx : int, value : a) -> e b, ys : list<a>, i : int, ctail<list<b>>) -> e list<b> */  { tailcall: while(1)
{
  if (ys !== null) {
     
    var i0_172281 = $std_core._int_add(i,1);
     
    var x_18022 = f1(i, ys.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_ctail_172920 /* 14245 */ ) {
        return _mlift17722_op(_acc0, f1, i0_172281, ys.tail, _ctail_172920);
      });
    }
    else {
       
      var _ctail_172930 = undefined;
       
      var _ctail_172940 = Cons(x_18022, _ctail_172930);
      {
        // tail call
        var _x159 = $std_core_types._ctail_link(_acc0,_ctail_172940,({value: _ctail_172940, field: "tail"}));
        ys = ys.tail;
        i = i0_172281;
        _acc0 = _x159;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
}}
 
 
// lifted local: map-indexed, map-idx
export function _ctailm_lift17198_map_indexed(f2, ys0, i0, _accm0) /* forall<a,b,e> (f : (idx : int, value : a) -> e b, ys : list<a>, i : int, (list<b>) -> list<b>) -> e list<b> */  { tailcall: while(1)
{
  if (ys0 !== null) {
     
    var i0_172282 = $std_core._int_add(i0,1);
     
    var x0_18025 = f2(i0, ys0.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_ctail_172970 /* 14245 */ ) {
        return _mlift17723_op(_accm0, f2, i0_172282, ys0.tail, _ctail_172970);
      });
    }
    else {
      {
        // tail call
        var _x162 = function(__dot_accm0160 /* (list<14245>) -> list<14245> */ , _x0_18025161 /* 14245 */ ) {
          return function(_ctail_172960 /* list<14245> */ ) {
            return __dot_accm0160(Cons(_x0_18025161, _ctail_172960));
          };
        }(_accm0, x0_18025);
        ys0 = ys0.tail;
        i0 = i0_172282;
        _accm0 = _x162;
        continue tailcall;
      }
    }
  }
  else {
    return _accm0(Nil);
  }
}}
 
 
// lifted local: map-indexed, map-idx
export function _lift17198_map_indexed(f3, ys1, i1) /* forall<a,b,e> (f : (idx : int, value : a) -> e b, ys : list<a>, i : int) -> e list<b> */  {
  var _x163 = $std_core_hnd._evv_is_affine();
  if (_x163) {
    return _ctail_lift17198_map_indexed(f3, ys1, i1, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_lift17198_map_indexed(f3, ys1, i1, function(_ctail_17295 /* list<14245> */ ) {
        return _ctail_17295;
      });
  }
}
 
 
// Apply a function `f`  to each element of the input list in sequence where takes
// both the index of the current element and the element itself as arguments.
export function map_indexed(xs, f) /* forall<a,b,e> (xs : list<a>, f : (idx : int, value : a) -> e b) -> e list<b> */  {
  return _lift17198_map_indexed(f, xs, 0);
}
 
 
// monadic lift
export function _mlift17724_op(_acc, f, i0_17230, yy, _ctail_17298) /* forall<a,b,e> (ctail<list<b>>, f : (idx : int, value : a, rest : list<a>) -> e b, i0.17230 : int, yy : list<a>, b) -> e list<b> */  {
   
  var _ctail_17299 = undefined;
   
  var _ctail_17300 = Cons(_ctail_17298, _ctail_17299);
  return _ctail_lift17199_map_indexed_peek(f, yy, i0_17230, $std_core_types._ctail_link(_acc,_ctail_17300,({value: _ctail_17300, field: "tail"})));
}
 
 
// monadic lift
export function _mlift17725_op(_accm, f0, i0_172300, yy0, _ctail_17303) /* forall<a,b,e> ((list<b>) -> list<b>, f : (idx : int, value : a, rest : list<a>) -> e b, i0.17230 : int, yy : list<a>, b) -> e list<b> */  {
  return _ctailm_lift17199_map_indexed_peek(f0, yy0, i0_172300, function(_ctail_17302 /* list<14302> */ ) {
      return _accm(Cons(_ctail_17303, _ctail_17302));
    });
}
 
 
// lifted local: map-indexed-peek, mapidx
export function _ctail_lift17199_map_indexed_peek(f1, ys, i, _acc0) /* forall<a,b,e> (f : (idx : int, value : a, rest : list<a>) -> e b, ys : list<a>, i : int, ctail<list<b>>) -> e list<b> */  { tailcall: while(1)
{
  if (ys !== null) {
     
    var i0_172301 = $std_core._int_add(i,1);
     
    var x_18028 = f1(i, ys.head, ys.tail);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_ctail_172980 /* 14302 */ ) {
        return _mlift17724_op(_acc0, f1, i0_172301, ys.tail, _ctail_172980);
      });
    }
    else {
       
      var _ctail_172990 = undefined;
       
      var _ctail_173000 = Cons(x_18028, _ctail_172990);
      {
        // tail call
        var _x164 = $std_core_types._ctail_link(_acc0,_ctail_173000,({value: _ctail_173000, field: "tail"}));
        ys = ys.tail;
        i = i0_172301;
        _acc0 = _x164;
        continue tailcall;
      }
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
}}
 
 
// lifted local: map-indexed-peek, mapidx
export function _ctailm_lift17199_map_indexed_peek(f2, ys0, i0, _accm0) /* forall<a,b,e> (f : (idx : int, value : a, rest : list<a>) -> e b, ys : list<a>, i : int, (list<b>) -> list<b>) -> e list<b> */  { tailcall: while(1)
{
  if (ys0 !== null) {
     
    var i0_172302 = $std_core._int_add(i0,1);
     
    var x0_18031 = f2(i0, ys0.head, ys0.tail);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_ctail_173030 /* 14302 */ ) {
        return _mlift17725_op(_accm0, f2, i0_172302, ys0.tail, _ctail_173030);
      });
    }
    else {
      {
        // tail call
        var _x167 = function(__dot_accm0165 /* (list<14302>) -> list<14302> */ , _x0_18031166 /* 14302 */ ) {
          return function(_ctail_173020 /* list<14302> */ ) {
            return __dot_accm0165(Cons(_x0_18031166, _ctail_173020));
          };
        }(_accm0, x0_18031);
        ys0 = ys0.tail;
        i0 = i0_172302;
        _accm0 = _x167;
        continue tailcall;
      }
    }
  }
  else {
    return _accm0(Nil);
  }
}}
 
 
// lifted local: map-indexed-peek, mapidx
export function _lift17199_map_indexed_peek(f3, ys1, i1) /* forall<a,b,e> (f : (idx : int, value : a, rest : list<a>) -> e b, ys : list<a>, i : int) -> e list<b> */  {
  var _x168 = $std_core_hnd._evv_is_affine();
  if (_x168) {
    return _ctail_lift17199_map_indexed_peek(f3, ys1, i1, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_lift17199_map_indexed_peek(f3, ys1, i1, function(_ctail_17301 /* list<14302> */ ) {
        return _ctail_17301;
      });
  }
}
 
 
// Apply a function `f`  to each element of the input list in sequence where takes
// both the index of the current element, the element itself, and the tail list as arguments.
export function map_indexed_peek(xs, f) /* forall<a,b,e> (xs : list<a>, f : (idx : int, value : a, rest : list<a>) -> e b) -> e list<b> */  {
  return _lift17199_map_indexed_peek(f, xs, 0);
}
 
 
// monadic lift
export function _mlift17726_op(_acc, action, xx, _y_17557) /* forall<a,b,e> (ctail<list<b>>, action : (a) -> e maybe<b>, xx : list<a>, maybe<b>) -> e list<b> */  {
  if (_y_17557 !== null) {
     
    var _ctail_17304 = undefined;
     
    var _ctail_17305 = Cons(_y_17557.value, _ctail_17304);
    return _ctail_map_while(xx, action, $std_core_types._ctail_link(_acc,_ctail_17305,({value: _ctail_17305, field: "tail"})));
  }
  else {
    return $std_core_types._ctail_resolve(_acc,Nil);
  }
}
 
 
// monadic lift
export function _mlift17727_op(_accm, action0, xx0, _y_17561) /* forall<a,b,e> ((list<b>) -> list<b>, action : (a) -> e maybe<b>, xx : list<a>, maybe<b>) -> e list<b> */  {
  if (_y_17561 !== null) {
    return _ctailm_map_while(xx0, action0, function(_ctail_17307 /* list<14344> */ ) {
        return _accm(Cons(_y_17561.value, _ctail_17307));
      });
  }
  else {
    return _accm(Nil);
  }
}
 
 
// Invoke `action` on each element of a list while `action` returns `Just`
export function _ctail_map_while(xs, action1, _acc0) /* forall<a,b,e> (xs : list<a>, action : (a) -> e maybe<b>, ctail<list<b>>) -> e list<b> */  { tailcall: while(1)
{
  if (xs === null) {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
  else {
     
    var x0_18034 = action1(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_175570 /* maybe<14344> */ ) {
        return _mlift17726_op(_acc0, action1, xs.tail, _y_175570);
      });
    }
    else {
      if (x0_18034 !== null) {
         
        var _ctail_173040 = undefined;
         
        var _ctail_173050 = Cons(x0_18034.value, _ctail_173040);
        {
          // tail call
          var _x169 = $std_core_types._ctail_link(_acc0,_ctail_173050,({value: _ctail_173050, field: "tail"}));
          xs = xs.tail;
          _acc0 = _x169;
          continue tailcall;
        }
      }
      else {
        return $std_core_types._ctail_resolve(_acc0,Nil);
      }
    }
  }
}}
 
 
// Invoke `action` on each element of a list while `action` returns `Just`
export function _ctailm_map_while(xs0, action2, _accm0) /* forall<a,b,e> (xs : list<a>, action : (a) -> e maybe<b>, (list<b>) -> list<b>) -> e list<b> */  { tailcall: while(1)
{
  if (xs0 === null) {
    return _accm0(Nil);
  }
  else {
     
    var x2_18037 = action2(xs0.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_175610 /* maybe<14344> */ ) {
        return _mlift17727_op(_accm0, action2, xs0.tail, _y_175610);
      });
    }
    else {
      if (x2_18037 !== null) {
        {
          // tail call
          var _x172 = function(__dot_accm0170 /* (list<14344>) -> list<14344> */ , _y2171 /* 14344 */ ) {
            return function(_ctail_173070 /* list<14344> */ ) {
              return __dot_accm0170(Cons(_y2171, _ctail_173070));
            };
          }(_accm0, x2_18037.value);
          xs0 = xs0.tail;
          _accm0 = _x172;
          continue tailcall;
        }
      }
      else {
        return _accm0(Nil);
      }
    }
  }
}}
 
 
// Invoke `action` on each element of a list while `action` returns `Just`
export function map_while(xs1, action3) /* forall<a,b,e> (xs : list<a>, action : (a) -> e maybe<b>) -> e list<b> */  {
  var _x173 = $std_core_hnd._evv_is_affine();
  if (_x173) {
    return _ctail_map_while(xs1, action3, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_map_while(xs1, action3, function(_ctail_17306 /* list<14344> */ ) {
        return _ctail_17306;
      });
  }
}
 
 
// Return the maximum of two integers
export function max(i, j) /* (i : int, j : int) -> int */  {
  return ($std_core._int_ge(i,j)) ? i : j;
}
 
 
// Returns the largest of two floats
export function max_1(x, y) /* (x : float64, y : float64) -> float64 */  {
  return ((x >= y)) ? x : y;
}
 
 
// Returns the largest element of a list of integers (or `default` (=`0`) for the empty list)
export function maximum(xs, default0) /* (xs : list<int>, default : optional<int>) -> int */  {
  if (xs === null) {
    return (default0 !== undefined) ? default0 : 0;
  }
  else {
    return foldl(xs.tail, xs.head, max);
  }
}
 
 
// Returns the largest element of a list of floats (or `0` for the empty list)
export function maximum_1(xs) /* (xs : list<float64>) -> float64 */  {
  if (xs === null) {
    return 0.0;
  }
  else {
    return foldl(xs.tail, xs.head, max_1);
  }
}
 
 
// Match a `:maybe` value and either return a default value on `Nothing` or apply a function to the value on `Just`
export function maybe(m, onNothing, onJust) /* forall<a,b,e> (m : maybe<a>, onNothing : b, onJust : (a) -> e b) -> e b */  {
  if (m === null) {
    return onNothing;
  }
  else {
    return onJust(m.value);
  }
}
 
 
// Convert a `:maybe<a>` value to `:a`, using the `nothing` parameter for `Nothing`.
// This is an alias for `default`.
export function maybe_1(m, nothing) /* forall<a> (m : maybe<a>, nothing : a) -> a */  {
  return (m === null) ? nothing : m.value;
}
 
 
// Convert a `:either` to a `:maybe` type discarding the value of the `Left` constructor
// and using `Just` for the `Right` constructor.
export function maybe_2(e) /* forall<a,b> (e : either<a,b>) -> maybe<b> */  {
  if (e._tag === 1) {
    return $std_core_types.Nothing;
  }
  else {
    return $std_core_types.Just(e.right);
  }
}
 
 
// Convert a list to a `:maybe` type, using `Nothing` for an empty list, and otherwise `Just` on the head element.
// Note: this is just `head`.
export function maybe_3(xs) /* forall<a> (xs : list<a>) -> maybe<a> */  {
  if (xs === null) {
    return $std_core_types.Nothing;
  }
  else {
    return $std_core_types.Just(xs.head);
  }
}
 
 
// Transform a boolean to a maybe type, using `Nothing` for `False`
export function maybe_4(b) /* (b : bool) -> maybe<()> */  {
  if (b) {
    return $std_core_types.Just($std_core_types._Unit_);
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// Transform an integer to a maybe type, using `Nothing` for `0`
export function maybe_5(i) /* (i : int) -> maybe<int> */  {
  if ($std_core._int_eq(i,0)) {
    return $std_core_types.Nothing;
  }
  else {
    return $std_core_types.Just(i);
  }
}
 
 
// Transform a string to a maybe type, using `Nothing` for an empty string
export function maybe_6(s) /* (s : string) -> maybe<string> */  {
  if ((s === (""))) {
    return $std_core_types.Nothing;
  }
  else {
    return $std_core_types.Just(s);
  }
}
 
 
// Transform an `:error` type to a `:maybe` value.
export function maybe_7(t) /* forall<a> (t : error<a>) -> maybe<a> */  {
  if (t._tag === 1) {
    return $std_core_types.Nothing;
  }
  else {
    return $std_core_types.Just(t.result);
  }
}
 
 
// Transform a `:null` type to a `:maybe` type. Note that it is not
// always the case that `id(x) == maybe(null(x))` (e.g. when `x = Just(Nothing)`).
export function maybe_8(n) /* forall<a> (n : null<a>) -> maybe<a> */  {
  return (n==null ? $std_core_types.Nothing : $std_core_types.Just(n));
}
 
 
// Return the minimum of two integers
export function min(i, j) /* (i : int, j : int) -> int */  {
  return ($std_core._int_le(i,j)) ? i : j;
}
 
 
// Returns the smallest of two floats
export function min_1(x, y) /* (x : float64, y : float64) -> float64 */  {
  return ((x <= y)) ? x : y;
}
 
 
// Returns the smallest element of a list of integers (or `default` (=`0`) for the empty list)
export function minimum(xs, default0) /* (xs : list<int>, default : optional<int>) -> int */  {
  if (xs === null) {
    return (default0 !== undefined) ? default0 : 0;
  }
  else {
    return foldl(xs.tail, xs.head, min);
  }
}
 
 
// Returns the smallest element of a list of floats (or `0` for the empty list)
export function minimum_1(xs) /* (xs : list<float64>) -> float64 */  {
  if (xs === null) {
    return 0.0;
  }
  else {
    return foldl(xs.tail, xs.head, min_1);
  }
}
 
 
// Disable tracing completely.
export function notrace() /* () -> (st<global>) () */  {
  return ((trace_enabled).value = false);
}
 
 
// Transform a `:maybe` type to a `:null` type (using `null` for `Nothing`).
export function $null(x) /* forall<a> (x : maybe<a>) -> null<a> */  {
  return (x==null ? null : x.value);
}
 
 
// Cast a integer that is zero to a null
export function null_1(i) /* (i : int) -> null<int> */  {
  if ($std_core._int_eq(i,0)) {
    var _x174 = $std_core_types.Nothing;
  }
  else {
    var _x174 = $std_core_types.Just(i);
  }
  return $null(_x174);
}
 
 
// Cast an empty string a null
export function null_2(s) /* (s : string) -> null<string> */  {
  if ((s === (""))) {
    var _x175 = $std_core_types.Nothing;
  }
  else {
    var _x175 = $std_core_types.Just(s);
  }
  return $null(_x175);
}
 
 
// Cast a boolean `False` to null
export function null_3(b) /* (b : bool) -> null<()> */  {
  if (b) {
    var _x176 = $std_core_types.Just($std_core_types._Unit_);
  }
  else {
    var _x176 = $std_core_types.Nothing;
  }
  return $null(_x176);
}
 
 
// Left-align a string to width `width`  using `fill`  (default is a space) to fill on the right.
export function pad_right(s, width, fill) /* (s : string, width : int, fill : optional<char>) -> string */  {
   
  var w = ssize__t(width);
   
  var n = s.length;
  if ((w <= n)) {
    return s;
  }
  else {
    var _x177 = (fill !== undefined) ? fill : 0x0020;
    return _lp__plus__plus__1_rp_(s, repeatz(string(_x177), ((w - n)|0)));
  }
}
 
 
// Is `pre`  a prefix of `s`? If so, returns a slice
// of `s` following `pre` up to the end of `s`.
export function starts_with(s, pre) /* (s : string, pre : string) -> maybe<sslice> */  {
  if ((s.substr(0,pre.length) === pre)) {
    return $std_core_types.Just(Sslice(s, pre.length, (((s.length) - (pre.length))|0)));
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// Trim off a substring `sub` while `s` starts with that string.
export function trim_left_1(s, sub) /* (s : string, sub : string) -> string */  { tailcall: while(1)
{
  if ((sub === (""))) {
    return s;
  }
  else {
    var _x178 = starts_with(s, sub);
    if (_x178 !== null) {
      {
        // tail call
        var _x179 = string_3(_x178.value);
        s = _x179;
        continue tailcall;
      }
    }
    else {
      return s;
    }
  }
}}
 
 
// Trim off a substring `sub` while `s` ends with that string.
export function trim_right_1(s, sub) /* (s : string, sub : string) -> string */  { tailcall: while(1)
{
  if ((sub === (""))) {
    return s;
  }
  else {
    var _x180 = ends_with(s, sub);
    if (_x180 !== null) {
      {
        // tail call
        var _x181 = string_3(_x180.value);
        s = _x181;
        continue tailcall;
      }
    }
    else {
      return s;
    }
  }
}}
 
 
// Trim whitespace on the left and right side of a string
export function trim(s) /* (s : string) -> string */  {
  return (((((s).replace(/^\s\s*/,'')))).replace(/\s+$/,''));
}
 
 
// Parse an integer after trimming whitespace.
// If an illegal digit character is encountered `Nothing` is returned.
// An empty string will result in `Just(0)`.
// A string can start with a `-` sign for negative numbers,
// and with `0x` or `0X` for hexadecimal numbers (in which case the `hex` parameter is ignored).
export function parse_int(s, hex) /* (s : string, hex : optional<bool>) -> maybe<int> */  {
  var _x182 = (hex !== undefined) ? hex : false;
  return xparse_int((((((s).replace(/^\s\s*/,'')))).replace(/\s+$/,'')), _x182);
}
 
 
// Parse an integer using `parseInt`. If an illegal digit character is encountered the
// `default` value is returned. An empty string will also result in `default`.
export function parse_int_default(s, default0, hex) /* (s : string, default : optional<int>, hex : optional<bool>) -> int */  {
  if ((s === (""))) {
    return (default0 !== undefined) ? default0 : 0;
  }
  else {
     
    var _x183 = (hex !== undefined) ? hex : false;
    var m_17140 = xparse_int((((((s).replace(/^\s\s*/,'')))).replace(/\s+$/,'')), _x183);
    if (m_17140 === null) {
      return (default0 !== undefined) ? default0 : 0;
    }
    else {
      return m_17140.value;
    }
  }
}
 
 
// monadic lift
export function _mlift17728_partition_acc(acc1, acc2, pred, x, xx, _y_17570) /* forall<a,e> (acc1 : list<a>, acc2 : list<a>, pred : (a) -> e bool, x : a, xx : list<a>, bool) -> e (list<a>, list<a>) */  {
  if (_y_17570) {
    return partition_acc(xx, pred, Cons(x, acc1), acc2);
  }
  else {
    return partition_acc(xx, pred, acc1, Cons(x, acc2));
  }
}
 
export function partition_acc(xs, pred0, acc10, acc20) /* forall<a,e> (xs : list<a>, pred : (a) -> e bool, acc1 : list<a>, acc2 : list<a>) -> e (list<a>, list<a>) */  { tailcall: while(1)
{
  if (xs === null) {
    return $std_core_types._Tuple2_(_lift17195_reverse(Nil, acc10), _lift17195_reverse(Nil, acc20));
  }
  else {
     
    var x1_18042 = pred0(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_175700 /* bool */ ) {
        return _mlift17728_partition_acc(acc10, acc20, pred0, xs.head, xs.tail, _y_175700);
      });
    }
    else {
      if (x1_18042) {
        {
          // tail call
          var _x183 = Cons(xs.head, acc10);
          xs = xs.tail;
          acc10 = _x183;
          continue tailcall;
        }
      }
      else {
        {
          // tail call
          var _x184 = Cons(xs.head, acc20);
          xs = xs.tail;
          acc20 = _x184;
          continue tailcall;
        }
      }
    }
  }
}}
 
 
// Partition a list in two lists where the first list contains
// those elements that satisfy the given predicate `pred`.
// For example: `partition([1,2,3],odd?) == ([1,3],[2])`
export function partition(xs, pred) /* forall<a,e> (xs : list<a>, pred : (a) -> e bool) -> e (list<a>, list<a>) */  {
  return partition_acc(xs, pred, Nil, Nil);
}
 
 
// redirect `print` and `println` calls to a specified function.
export function print_redirect(print0) /* (print : (msg : string) -> console ()) -> io () */  {
  return ((redirect).value = ($std_core_types.Just(print0)));
}
 
 
// Remove those elements of a list that satisfy the given predicate `pred`.
// For example: `remove([1,2,3],odd?) == [2]`
export function remove(xs, pred) /* forall<a> (xs : list<a>, pred : (a) -> bool) -> list<a> */  {
  return filter(xs, function(x /* 15747 */ ) {
       
      var b_17147 = pred(x);
      return (b_17147) ? false : true;
    });
}
 
 
// Repeat a string `n` times
export function repeat(s, n) /* (s : string, n : int) -> string */  {
  return repeatz(s, ssize__t(n));
}
 
 
// The `repeat` fun executes `action`  `n`  times.
export function repeat_1(n, action) /* forall<e> (n : int, action : () -> e ()) -> e () */  {
  return _lift17196_for(function(i /* int */ ) {
      return action();
    }, n, 1);
}
 
 
// Create a list of `n`  repeated elementes `x`
export function _ctail_replicate(x, n, _acc) /* forall<a> (x : a, n : int, ctail<list<a>>) -> list<a> */  { tailcall: while(1)
{
  if ($std_core._int_gt(n,0)) {
     
    var _ctail_17308 = undefined;
     
    var _ctail_17309 = Cons(x, _ctail_17308);
    {
      // tail call
      var _x185 = $std_core._int_sub(n,1);
      var _x186 = $std_core_types._ctail_link(_acc,_ctail_17309,({value: _ctail_17309, field: "tail"}));
      n = _x185;
      _acc = _x186;
      continue tailcall;
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc,Nil);
  }
}}
 
 
// Create a list of `n`  repeated elementes `x`
export function replicate(x0, n0) /* forall<a> (x : a, n : int) -> list<a> */  {
  return _ctail_replicate(x0, n0, $std_core_types._ctail_nil());
}
 
 
// lifted local: reverse-join, reverse-acc
export function _lift17200_reverse_join(acc, ys) /* forall<a> (acc : list<a>, ys : list<a>) -> list<a> */  { tailcall: while(1)
{
  if (ys !== null) {
    {
      // tail call
      var _x187 = Cons(ys.head, acc);
      acc = _x187;
      ys = ys.tail;
      continue tailcall;
    }
  }
  else {
    return acc;
  }
}}
 
 
// lifted local: reverse-join, join-acc
export function _lift17201_reverse_join(ys0, acc0) /* (ys0 : list<string>, acc0 : string) -> string */  { tailcall: while(1)
{
  if (ys0 !== null) {
    {
      // tail call
      var _x188 = _lp__plus__plus__1_rp_(acc0, _lp__plus__plus__1_rp_("", ys0.head));
      ys0 = ys0.tail;
      acc0 = _x188;
      continue tailcall;
    }
  }
  else {
    return acc0;
  }
}}
 
 
// Concatenate all strings in a list in reverse order
export function reverse_join(xs) /* (xs : list<string>) -> string */  {
   
  var xs0_17151 = _lift17200_reverse_join(Nil, xs);
  if (xs0_17151 === null) {
    return "";
  }
  else {
    return _lift17201_reverse_join(xs0_17151.tail, xs0_17151.head);
  }
}
 
export function show_tuple(x, showfst, showsnd) /* forall<a,b> (x : (a, b), showfst : (a) -> string, showsnd : (b) -> string) -> string */  {
  var _x189 = x.fst;
  var _x190 = x.snd;
  return _lp__plus__plus__1_rp_("(", _lp__plus__plus__1_rp_(showfst(_x189), _lp__plus__plus__1_rp_(",", _lp__plus__plus__1_rp_(showsnd(_x190), ")"))));
}
 
 
// monadic lift
export function _mlift17729_op(acc, predicate, y, ys, yy, _y_17578) /* forall<a,e> (acc : list<a>, predicate : (a) -> e bool, y : a, ys : list<a>, yy : list<a>, bool) -> e (list<a>, list<a>) */  {
  if (_y_17578) {
    return _lift17202_span(predicate, yy, Cons(y, acc));
  }
  else {
    return $std_core_types._Tuple2_(_lift17195_reverse(Nil, acc), ys);
  }
}
 
 
// lifted local: span, span-acc
// todo: implement TRMC with multiple results to avoid the reverse
export function _lift17202_span(predicate0, ys0, acc0) /* forall<a,e> (predicate : (a) -> e bool, ys : list<a>, acc : list<a>) -> e (list<a>, list<a>) */  { tailcall: while(1)
{
  if (ys0 !== null) {
     
    var x_18049 = predicate0(ys0.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_175780 /* bool */ ) {
        return _mlift17729_op(acc0, predicate0, ys0.head, ys0, ys0.tail, _y_175780);
      });
    }
    else {
      if (x_18049) {
        {
          // tail call
          var _x191 = Cons(ys0.head, acc0);
          ys0 = ys0.tail;
          acc0 = _x191;
          continue tailcall;
        }
      }
      else {
        return $std_core_types._Tuple2_(_lift17195_reverse(Nil, acc0), ys0);
      }
    }
  }
  else {
    return $std_core_types._Tuple2_(_lift17195_reverse(Nil, acc0), ys0);
  }
}}
 
export function span(xs, predicate) /* forall<a,e> (xs : list<a>, predicate : (a) -> e bool) -> e (list<a>, list<a>) */  {
  return _lift17202_span(predicate, xs, Nil);
}
 
 
// Return the sum of a list of integers
export function sum(xs) /* (xs : list<int>) -> int */  {
  return foldl(xs, 0, _lp__plus__4_rp_);
}
 
 
// Return the tail of list. Returns the empty list if `xs` is empty.
export function tail_1(xs) /* forall<a> (xs : list<a>) -> list<a> */  {
  return (xs !== null) ? xs.tail : Nil;
}
 
 
// Return the tail of a string (or the empty string)
export function tail_2(s) /* (s : string) -> string */  {
   
  var slice1 = first1(s);
   
  var _x194 = undefined;
  var _x193 = (_x194 !== undefined) ? _x194 : 1;
  var _x192 = $std_core._int_eq(_x193,1);
  if (_x192) {
    var slice0_17155 = slice1;
  }
  else {
    var _x196 = undefined;
    var _x195 = (_x196 !== undefined) ? _x196 : 1;
    var slice0_17155 = extend(slice1, $std_core._int_sub(_x195,1));
  }
  var _x192 = Sslice(slice0_17155.str, (((slice0_17155.start) + (slice0_17155.len))|0), ((((slice0_17155.str).length) - ((((slice0_17155.start) + (slice0_17155.len))|0)))|0));
  return string_3(_x192);
}
 
 
// monadic lift
export function _mlift17730_op(_acc, predicate, x, xx, _y_17583) /* forall<a,e> (ctail<list<a>>, predicate : (a) -> e bool, x : a, xx : list<a>, bool) -> e list<a> */  {
  if (_y_17583) {
     
    var _ctail_17310 = undefined;
     
    var _ctail_17311 = Cons(x, _ctail_17310);
    return _ctail_take_while(xx, predicate, $std_core_types._ctail_link(_acc,_ctail_17311,({value: _ctail_17311, field: "tail"})));
  }
  else {
    return $std_core_types._ctail_resolve(_acc,Nil);
  }
}
 
 
// monadic lift
export function _mlift17731_op(_accm, predicate0, x0, xx0, _y_17587) /* forall<a,e> ((list<a>) -> list<a>, predicate : (a) -> e bool, x : a, xx : list<a>, bool) -> e list<a> */  {
  if (_y_17587) {
    return _ctailm_take_while(xx0, predicate0, function(_ctail_17313 /* list<16299> */ ) {
        return _accm(Cons(x0, _ctail_17313));
      });
  }
  else {
    return _accm(Nil);
  }
}
 
 
// Keep only those initial elements that satisfy `predicate`
export function _ctail_take_while(xs, predicate1, _acc0) /* forall<a,e> (xs : list<a>, predicate : (a) -> e bool, ctail<list<a>>) -> e list<a> */  { tailcall: while(1)
{
  if (xs !== null) {
     
    var x2_18054 = predicate1(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_175830 /* bool */ ) {
        return _mlift17730_op(_acc0, predicate1, xs.head, xs.tail, _y_175830);
      });
    }
    else {
      if (x2_18054) {
         
        var _ctail_173100 = undefined;
         
        var _ctail_173110 = Cons(xs.head, _ctail_173100);
        {
          // tail call
          var _x193 = $std_core_types._ctail_link(_acc0,_ctail_173110,({value: _ctail_173110, field: "tail"}));
          xs = xs.tail;
          _acc0 = _x193;
          continue tailcall;
        }
      }
      else {
        return $std_core_types._ctail_resolve(_acc0,Nil);
      }
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
}}
 
 
// Keep only those initial elements that satisfy `predicate`
export function _ctailm_take_while(xs0, predicate2, _accm0) /* forall<a,e> (xs : list<a>, predicate : (a) -> e bool, (list<a>) -> list<a>) -> e list<a> */  { tailcall: while(1)
{
  if (xs0 !== null) {
     
    var x4_18057 = predicate2(xs0.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_175870 /* bool */ ) {
        return _mlift17731_op(_accm0, predicate2, xs0.head, xs0.tail, _y_175870);
      });
    }
    else {
      if (x4_18057) {
        {
          // tail call
          var _x196 = function(__dot_accm0194 /* (list<16299>) -> list<16299> */ , _x3195 /* 16299 */ ) {
            return function(_ctail_173130 /* list<16299> */ ) {
              return __dot_accm0194(Cons(_x3195, _ctail_173130));
            };
          }(_accm0, xs0.head);
          xs0 = xs0.tail;
          _accm0 = _x196;
          continue tailcall;
        }
      }
      else {
        return _accm0(Nil);
      }
    }
  }
  else {
    return _accm0(Nil);
  }
}}
 
 
// Keep only those initial elements that satisfy `predicate`
export function take_while(xs1, predicate3) /* forall<a,e> (xs : list<a>, predicate : (a) -> e bool) -> e list<a> */  {
  var _x197 = $std_core_hnd._evv_is_affine();
  if (_x197) {
    return _ctail_take_while(xs1, predicate3, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_take_while(xs1, predicate3, function(_ctail_17312 /* list<16299> */ ) {
        return _ctail_17312;
      });
  }
}
 
 
// monadic lift
export function _mlift17732_trace(message0, _y_17594) /* forall<_e> (message0 : string, bool) -> <read<global>|_e> () */  {
  if (_y_17594) {
    return xtrace(message0);
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
 
// Trace a message used for debug purposes.
// The behaviour is system dependent. On a browser and node it uses
// `console.log`  by default.
// Disabled if `notrace` is called.
export function trace(message0) /* (message : string) -> () */  {
   
  var x_18060 = trace_enabled.value;
   
  function next0_18061(_y_17594) /* (bool) -> <read<global>|_16333> () */  {
    if (_y_17594) {
      return xtrace(message0);
    }
    else {
      return $std_core_types._Unit_;
    }
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next0_18061);
  }
  else {
    return next0_18061(x_18060);
  }
}
 
 
// monadic lift
export function _mlift17733_trace_any(message0, x, _y_17596) /* forall<_e,a> (message0 : string, x : a, bool) -> <read<global>|_e> () */  {
  if (_y_17596) {
    return xtrace_any(message0, x);
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
export function trace_any(message0, x) /* forall<a> (message : string, x : a) -> () */  {
   
  var x0_18064 = trace_enabled.value;
   
  function next0_18065(_y_17596) /* (bool) -> <read<global>|_16385> () */  {
    if (_y_17596) {
      return xtrace_any(message0, x);
    }
    else {
      return $std_core_types._Unit_;
    }
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next0_18065);
  }
  else {
    return next0_18065(x0_18064);
  }
}
 
 
// Truncate a string to `count` characters.
export function truncate(s, count) /* (s : string, count : int) -> string */  {
   
  var slice0 = first1(s);
  var _x201 = undefined;
  var _x200 = (_x201 !== undefined) ? _x201 : 1;
  var _x199 = $std_core._int_eq(_x200,1);
  if (_x199) {
    var _x198 = slice0;
  }
  else {
    var _x203 = undefined;
    var _x202 = (_x203 !== undefined) ? _x203 : 1;
    var _x198 = extend(slice0, $std_core._int_sub(_x202,1));
  }
  return string_3(extend(_x198, $std_core._int_sub(count,1)));
}
 
 
// Return a default value when an exception is raised
export function try_default(value, action) /* forall<a,e> (value : a, action : () -> <exn|e> a) -> e a */  {
  return _handle_exn(0, _Hnd_exn(function(m0 /* std/core/hnd/marker<16485,16484> */ , ___wildcard__525__16 /* std/core/hnd/ev<.hnd-exn> */ , x /* exception */ ) {
      return $std_core_hnd.yield_to_final(m0, function(___wildcard__525__45 /* (std/core/hnd/resume-result<10295,16484>) -> 16485 16484 */ ) {
          return value;
        });
    }), function(_x /* 16484 */ ) {
      return _x;
    }, action);
}
 
 
// monadic lift
export function _mlift17734_unique(u) /* forall<_e> (u : int) -> <read<global>,write<global>|_e> int */  {
   
  ((unique_count).value = ($std_core._int_add(u,1)));
  return u;
}
 
 
// Returns a unique integer (modulo 32-bits).
export function unique() /* () -> ndet int */  {
   
  var x_18070 = unique_count.value;
   
  function next0_18071(u) /* (int) -> <read<global>,write<global>|_16545> int */  {
     
    ((unique_count).value = ($std_core._int_add(u,1)));
    return u;
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next0_18071);
  }
  else {
    return next0_18071(x_18070);
  }
}
 
 
// Get the value of the `Just` constructor or raise an exception
export function unjust(m) /* forall<a> (m : maybe<a>) -> exn a */  {
  if (m !== null) {
    return m.value;
  }
  else {
     
    var ev_18073 = $std_core_hnd._evv_at(0);
    var _x204 = _select_throw_exn(ev_18073.hnd);
    var _x206 = undefined;
    var _x205 = (_x206 !== undefined) ? _x206 : ExnError;
    return _x204(ev_18073.marker, ev_18073, Exception("unexpected Nothing in std/core/unjust", _x205));
  }
}
 
 
// lifted local: unlines, join-acc
export function _lift17203_unlines(ys, acc) /* (ys : list<string>, acc : string) -> string */  { tailcall: while(1)
{
  if (ys !== null) {
    {
      // tail call
      var _x207 = _lp__plus__plus__1_rp_(acc, _lp__plus__plus__1_rp_("\n", ys.head));
      ys = ys.tail;
      acc = _x207;
      continue tailcall;
    }
  }
  else {
    return acc;
  }
}}
 
 
// Join a list of strings with newlines
export function unlines(xs) /* (xs : list<string>) -> string */  {
  if (xs === null) {
    return "";
  }
  else {
    return _lift17203_unlines(xs.tail, xs.head);
  }
}
 
 
// lifted local: .lift17204-unzip, unzip, reverse-acc
export function _lift17205_unzip(acc, ys0) /* forall<a> (acc : list<a>, ys0 : list<a>) -> list<a> */  { tailcall: while(1)
{
  if (ys0 !== null) {
    {
      // tail call
      var _x208 = Cons(ys0.head, acc);
      acc = _x208;
      ys0 = ys0.tail;
      continue tailcall;
    }
  }
  else {
    return acc;
  }
}}
 
 
// lifted local: .lift17204-unzip, unzip, reverse-acc0
export function _lift17206_unzip(acc0, ys1) /* forall<a> (acc0 : list<a>, ys1 : list<a>) -> list<a> */  { tailcall: while(1)
{
  if (ys1 !== null) {
    {
      // tail call
      var _x209 = Cons(ys1.head, acc0);
      acc0 = _x209;
      ys1 = ys1.tail;
      continue tailcall;
    }
  }
  else {
    return acc0;
  }
}}
 
 
// lifted local: unzip, iter
// todo: implement TRMC for multiple results
export function _lift17204_unzip(ys, acc1, acc2) /* forall<a,b> (ys : list<(a, b)>, acc1 : list<a>, acc2 : list<b>) -> (list<a>, list<b>) */  { tailcall: while(1)
{
  if (ys !== null) {
    {
      // tail call
      var _x210 = Cons(ys.head.fst, acc1);
      var _x211 = Cons(ys.head.snd, acc2);
      ys = ys.tail;
      acc1 = _x210;
      acc2 = _x211;
      continue tailcall;
    }
  }
  else {
    return $std_core_types._Tuple2_(_lift17205_unzip(Nil, acc1), _lift17206_unzip(Nil, acc2));
  }
}}
 
 
// Unzip a list of pairs into two lists
export function unzip(xs) /* forall<a,b> (xs : list<(a, b)>) -> (list<a>, list<b>) */  {
  return _lift17204_unzip(xs, Nil, Nil);
}
 
 
// Convert a string to a vector of characters.
export function vector_1(s) /* (s : string) -> vector<char> */  {
  return _string_to_chars(s);
}
 
 
// Create a new vector of length `n`  with initial elements `default` .
export function vector_2(n, default0) /* forall<a> (n : int, default : a) -> vector<a> */  {
  return vector_initz(ssize__t(n), function(___wildcard__1854__30 /* ssize_t */ ) {
      return default0;
    });
}
 
 
// Convert a list to a vector.
export function vector_3(xs) /* forall<a> (xs : list<a>) -> vector<a> */  {
  return unvlist(xs);
}
 
 
// Create a new vector of length `n`  with initial elements given by function `f` .
export function vector_init(n, f) /* forall<a> (n : int, f : (int) -> a) -> vector<a> */  {
  return vector_initz(ssize__t(n), function(i /* ssize_t */ ) {
      return f($std_core._int_from_int32(i));
    });
}
 
 
// monadic lift
export function _mlift17735_while(action, predicate, wild__) /* forall<e> (action : () -> <div|e> (), predicate : () -> <div|e> bool, wild_ : ()) -> <div|e> () */  {
  return $while(predicate, action);
}
 
 
// monadic lift
export function _mlift17736_while(action0, predicate0, _y_17602) /* forall<e> (action : () -> <div|e> (), predicate : () -> <div|e> bool, bool) -> <div|e> () */  {
  if (_y_17602) {
     
    var x_18076 = action0();
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild__0 /* () */ ) {
        return _mlift17735_while(action0, predicate0, wild__0);
      });
    }
    else {
      return _mlift17735_while(action0, predicate0, x_18076);
    }
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
 
// The `while` fun executes `action`  as long as `pred`  is `true`.
export function $while(predicate1, action1) /* forall<e> (predicate : () -> <div|e> bool, action : () -> <div|e> ()) -> <div|e> () */  { tailcall: while(1)
{
   
  var x0_18078 = predicate1();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_176020 /* bool */ ) {
      return _mlift17736_while(action1, predicate1, _y_176020);
    });
  }
  else {
    if (x0_18078) {
       
      var x1_18081 = action1();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(wild__1 /* () */ ) {
          return _mlift17735_while(action1, predicate1, wild__1);
        });
      }
      else {
        {
          // tail call
          continue tailcall;
        }
      }
    }
    else {
      return $std_core_types._Unit_;
    }
  }
}}
 
 
// Zip two lists together by pairing the corresponding elements.
// The returned list is only as long as the smallest input list.
export function _ctail_zip(xs, ys, _acc) /* forall<a,b> (xs : list<a>, ys : list<b>, ctail<list<(a, b)>>) -> list<(a, b)> */  { tailcall: while(1)
{
  if (xs !== null) {
    if (ys !== null) {
       
      var _ctail_17314 = undefined;
       
      var _ctail_17315 = Cons($std_core_types._Tuple2_(xs.head, ys.head), _ctail_17314);
      {
        // tail call
        var _x212 = $std_core_types._ctail_link(_acc,_ctail_17315,({value: _ctail_17315, field: "tail"}));
        xs = xs.tail;
        ys = ys.tail;
        _acc = _x212;
        continue tailcall;
      }
    }
    else {
      return $std_core_types._ctail_resolve(_acc,Nil);
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc,Nil);
  }
}}
 
 
// Zip two lists together by pairing the corresponding elements.
// The returned list is only as long as the smallest input list.
export function zip(xs0, ys0) /* forall<a,b> (xs : list<a>, ys : list<b>) -> list<(a, b)> */  {
  return _ctail_zip(xs0, ys0, $std_core_types._ctail_nil());
}
 
 
// monadic lift
export function _mlift17737_op(_acc, f, xx, yy, _ctail_17316) /* forall<a,b,c,e> (ctail<list<c>>, f : (a, b) -> e c, xx : list<a>, yy : list<b>, c) -> e list<c> */  {
   
  var _ctail_17317 = undefined;
   
  var _ctail_17318 = Cons(_ctail_17316, _ctail_17317);
  return _ctail_zipwith(xx, yy, f, $std_core_types._ctail_link(_acc,_ctail_17318,({value: _ctail_17318, field: "tail"})));
}
 
 
// monadic lift
export function _mlift17738_op(_accm, f0, xx0, yy0, _ctail_17321) /* forall<a,b,c,e> ((list<c>) -> list<c>, f : (a, b) -> e c, xx : list<a>, yy : list<b>, c) -> e list<c> */  {
  return _ctailm_zipwith(xx0, yy0, f0, function(_ctail_17320 /* list<16859> */ ) {
      return _accm(Cons(_ctail_17321, _ctail_17320));
    });
}
 
 
// Zip two lists together by apply a function `f` to all corresponding elements.
// The returned list is only as long as the smallest input list.
export function _ctail_zipwith(xs, ys, f1, _acc0) /* forall<a,b,c,e> (xs : list<a>, ys : list<b>, f : (a, b) -> e c, ctail<list<c>>) -> e list<c> */  { tailcall: while(1)
{
  if (xs !== null) {
    if (ys !== null) {
       
      var x0_18084 = f1(xs.head, ys.head);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_ctail_173160 /* 16859 */ ) {
          return _mlift17737_op(_acc0, f1, xs.tail, ys.tail, _ctail_173160);
        });
      }
      else {
         
        var _ctail_173170 = undefined;
         
        var _ctail_173180 = Cons(x0_18084, _ctail_173170);
        {
          // tail call
          var _x213 = $std_core_types._ctail_link(_acc0,_ctail_173180,({value: _ctail_173180, field: "tail"}));
          xs = xs.tail;
          ys = ys.tail;
          _acc0 = _x213;
          continue tailcall;
        }
      }
    }
    else {
      return $std_core_types._ctail_resolve(_acc0,Nil);
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
}}
 
 
// Zip two lists together by apply a function `f` to all corresponding elements.
// The returned list is only as long as the smallest input list.
export function _ctailm_zipwith(xs0, ys0, f2, _accm0) /* forall<a,b,c,e> (xs : list<a>, ys : list<b>, f : (a, b) -> e c, (list<c>) -> list<c>) -> e list<c> */  { tailcall: while(1)
{
  if (xs0 !== null) {
    if (ys0 !== null) {
       
      var x2_18087 = f2(xs0.head, ys0.head);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_ctail_173210 /* 16859 */ ) {
          return _mlift17738_op(_accm0, f2, xs0.tail, ys0.tail, _ctail_173210);
        });
      }
      else {
        {
          // tail call
          var _x216 = function(__dot_accm0214 /* (list<16859>) -> list<16859> */ , _x2_18087215 /* 16859 */ ) {
            return function(_ctail_173200 /* list<16859> */ ) {
              return __dot_accm0214(Cons(_x2_18087215, _ctail_173200));
            };
          }(_accm0, x2_18087);
          xs0 = xs0.tail;
          ys0 = ys0.tail;
          _accm0 = _x216;
          continue tailcall;
        }
      }
    }
    else {
      return _accm0(Nil);
    }
  }
  else {
    return _accm0(Nil);
  }
}}
 
 
// Zip two lists together by apply a function `f` to all corresponding elements.
// The returned list is only as long as the smallest input list.
export function zipwith(xs1, ys1, f3) /* forall<a,b,c,e> (xs : list<a>, ys : list<b>, f : (a, b) -> e c) -> e list<c> */  {
  var _x217 = $std_core_hnd._evv_is_affine();
  if (_x217) {
    return _ctail_zipwith(xs1, ys1, f3, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_zipwith(xs1, ys1, f3, function(_ctail_17319 /* list<16859> */ ) {
        return _ctail_17319;
      });
  }
}
 
 
// monadic lift
export function _mlift17739_op(_acc, f, i0_17233, xx, yy, _ctail_17322) /* forall<a,b,c,e> (ctail<list<c>>, f : (int, a, b) -> e c, i0.17233 : int, xx : list<a>, yy : list<b>, c) -> e list<c> */  {
   
  var _ctail_17323 = undefined;
   
  var _ctail_17324 = Cons(_ctail_17322, _ctail_17323);
  return _ctail_lift17207_zipwith_indexed(f, i0_17233, xx, yy, $std_core_types._ctail_link(_acc,_ctail_17324,({value: _ctail_17324, field: "tail"})));
}
 
 
// monadic lift
export function _mlift17740_op(_accm, f0, i0_172330, xx0, yy0, _ctail_17327) /* forall<a,b,c,e> ((list<c>) -> list<c>, f : (int, a, b) -> e c, i0.17233 : int, xx : list<a>, yy : list<b>, c) -> e list<c> */  {
  return _ctailm_lift17207_zipwith_indexed(f0, i0_172330, xx0, yy0, function(_ctail_17326 /* list<16933> */ ) {
      return _accm(Cons(_ctail_17327, _ctail_17326));
    });
}
 
 
// lifted local: zipwith-indexed, zipwith-iter
export function _ctail_lift17207_zipwith_indexed(f1, i, xs, ys, _acc0) /* forall<a,b,c,e> (f : (int, a, b) -> e c, i : int, xs : list<a>, ys : list<b>, ctail<list<c>>) -> e list<c> */  { tailcall: while(1)
{
  if (xs !== null) {
    if (ys !== null) {
       
      var i0_172331 = $std_core._int_add(i,1);
       
      var x0_18090 = f1(i, xs.head, ys.head);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_ctail_173220 /* 16933 */ ) {
          return _mlift17739_op(_acc0, f1, i0_172331, xs.tail, ys.tail, _ctail_173220);
        });
      }
      else {
         
        var _ctail_173230 = undefined;
         
        var _ctail_173240 = Cons(x0_18090, _ctail_173230);
        {
          // tail call
          var _x218 = $std_core_types._ctail_link(_acc0,_ctail_173240,({value: _ctail_173240, field: "tail"}));
          i = i0_172331;
          xs = xs.tail;
          ys = ys.tail;
          _acc0 = _x218;
          continue tailcall;
        }
      }
    }
    else {
      return $std_core_types._ctail_resolve(_acc0,Nil);
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc0,Nil);
  }
}}
 
 
// lifted local: zipwith-indexed, zipwith-iter
export function _ctailm_lift17207_zipwith_indexed(f2, i0, xs0, ys0, _accm0) /* forall<a,b,c,e> (f : (int, a, b) -> e c, i : int, xs : list<a>, ys : list<b>, (list<c>) -> list<c>) -> e list<c> */  { tailcall: while(1)
{
  if (xs0 !== null) {
    if (ys0 !== null) {
       
      var i0_172332 = $std_core._int_add(i0,1);
       
      var x2_18093 = f2(i0, xs0.head, ys0.head);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_ctail_173270 /* 16933 */ ) {
          return _mlift17740_op(_accm0, f2, i0_172332, xs0.tail, ys0.tail, _ctail_173270);
        });
      }
      else {
        {
          // tail call
          var _x221 = function(__dot_accm0219 /* (list<16933>) -> list<16933> */ , _x2_18093220 /* 16933 */ ) {
            return function(_ctail_173260 /* list<16933> */ ) {
              return __dot_accm0219(Cons(_x2_18093220, _ctail_173260));
            };
          }(_accm0, x2_18093);
          i0 = i0_172332;
          xs0 = xs0.tail;
          ys0 = ys0.tail;
          _accm0 = _x221;
          continue tailcall;
        }
      }
    }
    else {
      return _accm0(Nil);
    }
  }
  else {
    return _accm0(Nil);
  }
}}
 
 
// lifted local: zipwith-indexed, zipwith-iter
export function _lift17207_zipwith_indexed(f3, i1, xs1, ys1) /* forall<a,b,c,e> (f : (int, a, b) -> e c, i : int, xs : list<a>, ys : list<b>) -> e list<c> */  {
  var _x222 = $std_core_hnd._evv_is_affine();
  if (_x222) {
    return _ctail_lift17207_zipwith_indexed(f3, i1, xs1, ys1, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_lift17207_zipwith_indexed(f3, i1, xs1, ys1, function(_ctail_17325 /* list<16933> */ ) {
        return _ctail_17325;
      });
  }
}
 
 
// Zip two lists together by apply a function `f` to all corresponding elements
// and their index in the list.
// The returned list is only as long as the smallest input list.
export function zipwith_indexed(xs0, ys0, f) /* forall<a,b,c,e> (xs0 : list<a>, ys0 : list<b>, f : (int, a, b) -> e c) -> e list<c> */  {
  return _lift17207_zipwith_indexed(f, 0, xs0, ys0);
}