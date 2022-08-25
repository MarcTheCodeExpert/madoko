// Koka generated module: "std/core/types", koka version: 2.4.0
"use strict";
 
// imports
 
// externals
/*---------------------------------------------------------------------------
  Copyright 2012-2021, Microsoft Research, Daan Leijen.
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the LICENSE file at the root of this distribution.
---------------------------------------------------------------------------*/
export function _ctail_nil() {
  return _CTail(undefined,{value:undefined,field:""})
}
export function _ctail_link(acc,res,field) {
  if (acc.res===undefined) {
    return _CTail(res,field);
  }
  else {
    acc.hole.value[acc.hole.field] = res;
    return _CTail(acc.res,field);
  }
}
export function _ctail_resolve(acc,res) {
  if (acc.res===undefined) {
    return res;
  }
  else {
    acc.hole.value[acc.hole.field] = res;
    return acc.res;
  }
}
 
// type declarations
// type ()
export const _Unit_ = 1; // ()
// type (,)
export function _Tuple2_(fst, snd) /* forall<a,b> (fst : a, snd : b) -> (a, b) */  {
  return { fst: fst, snd: snd };
}
// type (,,)
export function _Tuple3_(fst, snd, thd) /* forall<a,b,c> (fst : a, snd : b, thd : c) -> (a, b, c) */  {
  return { fst: fst, snd: snd, thd: thd };
}
// type (,,,)
export function _Tuple4_(fst, snd, thd, field4) /* forall<a,b,c,d> (fst : a, snd : b, thd : c, field4 : d) -> (a, b, c, d) */  {
  return { fst: fst, snd: snd, thd: thd, field4: field4 };
}
// type (,,,,)
export function _lp__comma__comma__comma__comma__rp_(fst, snd, thd, field4, field5) /* forall<a,b,c,d,a1> (fst : a, snd : b, thd : c, field4 : d, field5 : a1) -> (a, b, c, d, a1) */  {
  return { fst: fst, snd: snd, thd: thd, field4: field4, field5: field5 };
}
// type alloc
// type any
// type bool
export const False = false;
export const True = true;
// type box
export function Box(unbox) /* forall<a> (unbox : a) -> box<a> */  {
  return unbox;
}
// type cfield
// type char
// type ctail
export function _CTail(res, hole) /* forall<a> (res : a, hole : cfield<a>) -> ctail<a> */  {
  return { res: res, hole: hole };
}
// type div
// type ediv
// type either
export function Left(left) /* forall<a,b> (left : a) -> either<a,b> */  {
  return { _tag: 1, left: left };
}
export function Right(right) /* forall<a,b> (right : b) -> either<a,b> */  {
  return { _tag: 2, right: right };
}
// type float32
// type float64
// type global
// type handled
// type handled1
// type hbox
export function Hbox(unhbox) /* forall<a> (unhbox : a) -> hbox<a> */  {
  return { unhbox: unhbox };
}
// type hdiv
// type int
// type int16
// type int32
// type int64
// type int8
// type intptr_t
// type local
// type local-var
// type maybe
export const Nothing = null; // forall<a> maybe<a>
export function Just(value) /* forall<a> (value : a) -> maybe<a> */  {
  return { value: value };
}
// type ndet
// type optional
export function Optional(value) /* forall<a> (value : a) -> optional<a> */  {
  return value;
}
export const None = undefined; // forall<a> optional<a>
// type order
export const Lt = 1; // order
export const Eq = 2; // order
export const Gt = 3; // order
// type read
// type ref
// type reuse
// type ssize_t
// type write
// type (<>)
// type (<|>)
// type string
// type vector
// type void
 
// declarations
 
export function _copy(_this) /* (()) -> () */  {
  return _Unit_;
}
 
 
// Automatically generated. Retrieves the `fst` constructor field of the `:(,)` type.
export function fst(_this) /* forall<a,b> ((a, b)) -> a */  {
  return _this.fst;
}
 
 
// Automatically generated. Retrieves the `snd` constructor field of the `:(,)` type.
export function snd(_this) /* forall<a,b> ((a, b)) -> b */  {
  return _this.snd;
}
 
export function _copy_1(_this, fst0, snd0) /* forall<a,b> ((a, b), fst : optional<a>, snd : optional<b>) -> (a, b) */  {
  if (fst0 !== undefined) {
    var _x0 = fst0;
  }
  else {
    var _x0 = _this.fst;
  }
  if (snd0 !== undefined) {
    var _x1 = snd0;
  }
  else {
    var _x1 = _this.snd;
  }
  return _Tuple2_(_x0, _x1);
}
 
 
// Automatically generated. Retrieves the `fst` constructor field of the `:(,,)` type.
export function fst_1(_this) /* forall<a,b,c> ((a, b, c)) -> a */  {
  return _this.fst;
}
 
 
// Automatically generated. Retrieves the `snd` constructor field of the `:(,,)` type.
export function snd_1(_this) /* forall<a,b,c> ((a, b, c)) -> b */  {
  return _this.snd;
}
 
 
// Automatically generated. Retrieves the `thd` constructor field of the `:(,,)` type.
export function thd(_this) /* forall<a,b,c> ((a, b, c)) -> c */  {
  return _this.thd;
}
 
export function _copy_2(_this, fst0, snd0, thd0) /* forall<a,b,c> ((a, b, c), fst : optional<a>, snd : optional<b>, thd : optional<c>) -> (a, b, c) */  {
  if (fst0 !== undefined) {
    var _x2 = fst0;
  }
  else {
    var _x2 = _this.fst;
  }
  if (snd0 !== undefined) {
    var _x3 = snd0;
  }
  else {
    var _x3 = _this.snd;
  }
  if (thd0 !== undefined) {
    var _x4 = thd0;
  }
  else {
    var _x4 = _this.thd;
  }
  return _Tuple3_(_x2, _x3, _x4);
}
 
 
// Automatically generated. Retrieves the `fst` constructor field of the `:(,,,)` type.
export function fst_2(_this) /* forall<a,b,c,d> ((a, b, c, d)) -> a */  {
  return _this.fst;
}
 
 
// Automatically generated. Retrieves the `snd` constructor field of the `:(,,,)` type.
export function snd_2(_this) /* forall<a,b,c,d> ((a, b, c, d)) -> b */  {
  return _this.snd;
}
 
 
// Automatically generated. Retrieves the `thd` constructor field of the `:(,,,)` type.
export function thd_1(_this) /* forall<a,b,c,d> ((a, b, c, d)) -> c */  {
  return _this.thd;
}
 
 
// Automatically generated. Retrieves the `field4` constructor field of the `:(,,,)` type.
export function field4(_this) /* forall<a,b,c,d> ((a, b, c, d)) -> d */  {
  return _this.field4;
}
 
export function _copy_3(_this, fst0, snd0, thd0, field40) /* forall<a,b,c,d> ((a, b, c, d), fst : optional<a>, snd : optional<b>, thd : optional<c>, field4 : optional<d>) -> (a, b, c, d) */  {
  if (fst0 !== undefined) {
    var _x5 = fst0;
  }
  else {
    var _x5 = _this.fst;
  }
  if (snd0 !== undefined) {
    var _x6 = snd0;
  }
  else {
    var _x6 = _this.snd;
  }
  if (thd0 !== undefined) {
    var _x7 = thd0;
  }
  else {
    var _x7 = _this.thd;
  }
  if (field40 !== undefined) {
    var _x8 = field40;
  }
  else {
    var _x8 = _this.field4;
  }
  return _Tuple4_(_x5, _x6, _x7, _x8);
}
 
 
// Automatically generated. Retrieves the `fst` constructor field of the `:(,,,,)` type.
export function fst_3(_this) /* forall<a,b,c,d,a1> ((a, b, c, d, a1)) -> a */  {
  return _this.fst;
}
 
 
// Automatically generated. Retrieves the `snd` constructor field of the `:(,,,,)` type.
export function snd_3(_this) /* forall<a,b,c,d,a1> ((a, b, c, d, a1)) -> b */  {
  return _this.snd;
}
 
 
// Automatically generated. Retrieves the `thd` constructor field of the `:(,,,,)` type.
export function thd_2(_this) /* forall<a,b,c,d,a1> ((a, b, c, d, a1)) -> c */  {
  return _this.thd;
}
 
 
// Automatically generated. Retrieves the `field4` constructor field of the `:(,,,,)` type.
export function field4_1(_this) /* forall<a,b,c,d,a1> ((a, b, c, d, a1)) -> d */  {
  return _this.field4;
}
 
 
// Automatically generated. Retrieves the `field5` constructor field of the `:(,,,,)` type.
export function field5(_this) /* forall<a,b,c,d,a1> ((a, b, c, d, a1)) -> a1 */  {
  return _this.field5;
}
 
export function _copy_4(_this, fst0, snd0, thd0, field40, field50) /* forall<a,b,c,d,a1> ((a, b, c, d, a1), fst : optional<a>, snd : optional<b>, thd : optional<c>, field4 : optional<d>, field5 : optional<a1>) -> (a, b, c, d, a1) */  {
  if (fst0 !== undefined) {
    var _x9 = fst0;
  }
  else {
    var _x9 = _this.fst;
  }
  if (snd0 !== undefined) {
    var _x10 = snd0;
  }
  else {
    var _x10 = _this.snd;
  }
  if (thd0 !== undefined) {
    var _x11 = thd0;
  }
  else {
    var _x11 = _this.thd;
  }
  if (field40 !== undefined) {
    var _x12 = field40;
  }
  else {
    var _x12 = _this.field4;
  }
  if (field50 !== undefined) {
    var _x13 = field50;
  }
  else {
    var _x13 = _this.field5;
  }
  return _lp__comma__comma__comma__comma__rp_(_x9, _x10, _x11, _x12, _x13);
}
 
 
// Automatically generated. Tests for the `False` constructor of the `:bool` type.
export function is_false(bool) /* (bool : bool) -> bool */  {
  return (!bool);
}
 
 
// Automatically generated. Tests for the `True` constructor of the `:bool` type.
export function is_true(bool) /* (bool : bool) -> bool */  {
  return (bool);
}
 
 
// Automatically generated. Retrieves the `unbox` constructor field of the `:box` type.
export function unbox(box) /* forall<a> (box : box<a>) -> a */  {
  return box;
}
 
export function _copy_5(_this, unbox0) /* forall<a> (box<a>, unbox : optional<a>) -> box<a> */  {
  if (unbox0 !== undefined) {
    var _x14 = unbox0;
  }
  else {
    var _x14 = _this;
  }
  return _x14;
}
 
 
// Automatically generated. Retrieves the `res` constructor field of the `:ctail` type.
export function res(ctail) /* forall<a> (ctail : ctail<a>) -> a */  {
  return ctail.res;
}
 
 
// Automatically generated. Retrieves the `hole` constructor field of the `:ctail` type.
export function hole(ctail) /* forall<a> (ctail : ctail<a>) -> cfield<a> */  {
  return ctail.hole;
}
 
 
// Automatically generated. Tests for the `Left` constructor of the `:either` type.
export function is_left(either) /* forall<a,b> (either : either<a,b>) -> bool */  {
  return (either._tag === 1);
}
 
 
// Automatically generated. Tests for the `Right` constructor of the `:either` type.
export function is_right(either) /* forall<a,b> (either : either<a,b>) -> bool */  {
  return (either._tag === 2);
}
 
 
// Automatically generated. Retrieves the `unhbox` constructor field of the `:hbox` type.
export function unhbox(hbox0) /* forall<a> (hbox : hbox<a>) -> a */  {
  return hbox0.unhbox;
}
 
export function _copy_6(_this, unhbox0) /* forall<a> (hbox<a>, unhbox : optional<a>) -> hbox<a> */  {
  if (unhbox0 !== undefined) {
    var _x15 = unhbox0;
  }
  else {
    var _x15 = _this.unhbox;
  }
  return Hbox(_x15);
}
 
 
// Automatically generated. Tests for the `Nothing` constructor of the `:maybe` type.
export function is_nothing(maybe) /* forall<a> (maybe : maybe<a>) -> bool */  {
  return (maybe === null);
}
 
 
// Automatically generated. Tests for the `Just` constructor of the `:maybe` type.
export function is_just(maybe) /* forall<a> (maybe : maybe<a>) -> bool */  {
  return (maybe !== null);
}
 
 
// Automatically generated. Tests for the `Optional` constructor of the `:optional` type.
export function is_optional(optional) /* forall<a> (optional : optional<a>) -> bool */  {
  return (optional !== undefined);
}
 
 
// Automatically generated. Tests for the `None` constructor of the `:optional` type.
export function is_none(optional) /* forall<a> (optional : optional<a>) -> bool */  {
  return (optional === undefined);
}
 
 
// Automatically generated. Tests for the `Lt` constructor of the `:order` type.
export function is_lt(order) /* (order : order) -> bool */  {
  return (order === 1);
}
 
 
// Automatically generated. Tests for the `Eq` constructor of the `:order` type.
export function is_eq(order) /* (order : order) -> bool */  {
  return (order === 2);
}
 
 
// Automatically generated. Tests for the `Gt` constructor of the `:order` type.
export function is_gt(order) /* (order : order) -> bool */  {
  return (order === 3);
}
 
 
// _Internal_: generated by type inference and later refined into one of the `open` variants in `std/core/hnd`.
export function _open(x) /* forall<e,e1,a,b> (x : a) -> e1 b */  {
  return x;
}
 
 
// Logical negation
export function _lp__excl__1_rp_(b) /* (b : bool) -> bool */  {
  return (b) ? false : true;
}
 
 
// Logical conjuction
export function _lp__amp__amp__rp_(x, y) /* (x : bool, y : bool) -> bool */  {
  return (x) ? y : false;
}
 
 
// The identity function returns its argument unchanged
export function id(x) /* forall<a> (x : a) -> a */  {
  return x;
}
 
export function keep(x) /* forall<a> (x : a) -> a */  {
  return x;
}
 
 
// _Internal_: if local mutation is unobservable, the `:local` effect can be erased by using the `local-scope` function.
// See also: _State in Haskell, by Simon Peyton Jones and John Launchbury_.
export function local_scope(action) /* forall<a,e> (action : forall<h> () -> <local<h>|e> a) -> e a */  {
  return action();
}
 
export function no_reuse() /* () -> reuse */  {
  return null;
}
 
 
// Logical negation
export function not(b) /* (b : bool) -> bool */  {
  return (b) ? false : true;
}
 
 
// If a heap effect is unobservable, the heap effect can be erased by using the `run` fun.
// See also: _State in Haskell, by Simon Peyton Jones and John Launchbury_.
export function run(action) /* forall<e,a> (action : forall<h> () -> <alloc<h>,read<h>,write<h>|e> a) -> e a */  {
  return ((action)());
}
 
 
// _Unsafe_. This function pretends the give action is terminating
export function unsafe_no_div(action) /* forall<a,e> (action : () -> <div|e> a) -> e a */  {
  return action();
}
 
 
// _Unsafe_. This function pretends the give action was deterministic
export function unsafe_no_ndet(action) /* forall<a,e> (action : () -> <ndet|e> a) -> e a */  {
  return action();
}
 
 
// _Unsafe_. This function calls a function and pretends it did not have any effect at all.
export function unsafe_total(action) /* forall<a,e> (action : () -> e a) -> a */  {
  return action();
}
 
 
// Logical disjunction
export function _lp__bar__bar__rp_(x, y) /* (x : bool, y : bool) -> bool */  {
  return (x) ? true : y;
}
 
export function hbox(x) /* forall<a> (x : a) -> hbox<a> */  {
  return Hbox(x);
}