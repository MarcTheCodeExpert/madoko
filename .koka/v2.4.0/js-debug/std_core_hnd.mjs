// Koka generated module: "std/core/hnd", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
 
// externals
/*---------------------------------------------------------------------------
  Copyright 2020-2021, Microsoft Research, Daan Leijen.
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the LICENSE file at the root of this distribution.
---------------------------------------------------------------------------*/
//var $std_core_hnd._evv_ofs = 0;
//var _evv     = [];
//var _yield   = null; // { marker: 0, clause: null, conts: [], conts_count: 0, final: bool };
var $marker_unique = 1;  // must be > 0
function _assert(cond,msg) {
  if (!cond) console.error(msg);
}
// for internal references
const $std_core_hnd = { "_evv_get"    : _evv_get,
                  "_evv_set"    : _evv_set,
                  "_evv_at"     : _evv_at,
                  "_evv_swap"   : _evv_swap,
                  "_evv_swap_create0"   : _evv_swap_create0,
                  "_evv_swap_create1"   : _evv_swap_create1,
                  "_yielding"   : _yielding,
                  "_yielding_non_final": _yielding_non_final,     
                  "_evv_cfc"    : _evv_cfc,
                  "_yield_to"   : _yield_to,
                  "_yield_final": _yield_final,
                };
var _evv = [];
var _yield = null;
export function _evv_get() {
  return _evv;
}
export function _evv_at(i) {
  return _evv[i];
}
export function _evv_set(evv) {
  _evv = evv;
}
export function _evv_swap(evv) {
  const evv0 = _evv;
  _evv = evv;
  return evv0;
}
const _evv_empty = [];
export function _evv_swap_create0() {
  const evv = _evv;
  if (evv.length!==0) {
    _evv = _evv_empty;
  }
  return evv;
}
export function _evv_swap_create1( i ) {
  const evv = _evv;
  if (evv.length !== 1) { 
    const ev = evv[i];
    _evv = [ev]; 
    _evv._cfc = ev.cfc;
  }
  return evv;
}
export function _yielding() {
  return (_yield !== null);
}
export function _yielding_non_final() {
  return (_yield !== null && !_yield.final);
}
//--------------------------------------------------
// evidence: { evv: [forall h. ev<h>], ofs : int }
//--------------------------------------------------
function ev_none() {
  return Ev(null,0,null,-1,[]);
}
function _cfc_lub(x,y) {
  _assert(x!=null && y!=null);
  if (x < 0) return y;
  if (x + y === 1) return 2;
  if (x > y) return x;
  return y;
}
function _evv_get_cfc( evv ) {
  const cfc = evv._cfc;
  return (cfc==null ? -1 : cfc);
}
export function _evv_cfc() {
  return _evv_get_cfc(_evv);
}
function _evv_insert(evv,ev) {
  // update ev
  if (ev.marker===0) return; // marker zero is ev-none
  ev.hevv = evv;
  const cfc = _cfc_lub(_evv_get_cfc(evv), ev.cfc);
  if (ev.marker < 0) { // negative marker is used for named evidence; this means this evidence should not be inserted into the evidence vector
    evv._cfc = cfc;  // control flow context
    return; // a negative (named) marker is not in the evidence vector
  }
  // insert in the vector
  const n    = evv.length;
  const evv2 = new Array(n+1);  
  evv2._cfc = cfc;
  ev.cfc = cfc; // update in-place
  var i;
  for(i = 0; i < n; i++) {
    const ev2 = evv[i];
    if (ev.htag <= ev2.htag) break;
    evv2[i] = ev2;
  }
  evv2[i] = ev;
  for(; i < n; i++) {
    evv2[i+1] = evv[i];
  }
  return evv2;
}
function _evv_delete(evv,i,behind) {
  // delete from the vector
  if (behind) i++;
  const n = evv.length;
  const evv2 = new Array(n-1);
  if (evv._cfc != null) { evv2._cfc = evv._cfc; }
  if (n==1) return evv2;  // empty
  // copy without i
  var j;
  for(j = 0; j < i; j++) {
    evv2[j] = evv[j];
  }
  for(; j < n-1; j++) {
    evv2[j] = evv[j + 1];
  }
  // update cfc?
  if (evv[i].cfc >= _evv_get_cfc(evv)) {
    var cfc = evv2[0].cfc;
    for(j = 1; j < n-1; j++) {
      cfc = _cfc_lub(evv2[j].cfc, cfc);
    }
    evv2._cfc = cfc;
  }
  return evv2;
}
function _evv_swap_delete(i,behind) {
  const w0 = _evv;
  _evv = _evv_delete(w0,i,behind);
  return w0;
}
function __evv_lookup(tag) {
  const evv = _evv;
  for(var i = 0; i < evv.length; i++) {
    if (tag === evv[i].htag) return evv[i];
  }
  console.error("cannot find " + tag + " in " + _evv_show(evv));
  return null;
}
// Find insertion/deletion point for an effect label
function __evv_index(tag) {
  const evv = _evv;
  const n = evv.length
  for(var i = 0; i < n; i++) {
    if (tag <= evv[i].htag) return i;  // string compare
  }
  return n;
}
function _evv_show(evv) {
  evv.sort(function(ev1,ev2){ return (ev1.marker - ev2.marker); });
  var out = "";
  for( var i = 0; i < evv.length; i++) {
    const evvi = evv[i].hevv;
    out += ((i==0 ? "{ " : "  ") + evv[i].htag.padEnd(8," ") + ": marker " + evv[i].marker + ", under <" +
             evvi.map(function(ev){ return ev.marker.toString(); }).join(",") + ">" + (i==evv.length-1 ? "}" : "") + "\n");
  }
  return out;
}
function _yield_show() {
  if (_yielding()) {
    return "yielding to " + _yield.marker + ", final: " + _yield.final;
  }
  else {
    return "pure"
  }
}
function _evv_expect(m,expected) {
  if ((_yield===null || _yield.marker === m) && (_evv !== expected.evv)) {
    console.error("expected evidence: \n" + _evv_show(expected) + "\nbut found:\n" + _evv_show(_evv));
  }
}
function _guard(evv) {
  if (_evv !== evv) {
    if (_evv.length == evv.length) {
      var equal = true;
      for(var i = 0; i < evv.length; i++) {
        if (_evv[i].marker != evv[i].marker) {
          equal = false;
          break;
        }
      }
      if (equal) return;
    }
    console.error("trying to resume outside the (handler) scope of the original handler. \n captured under:\n" + _evv_show(evv) + "\n but resumed under:\n" + _evv_show(_evv));
    throw "trying to resume outside the (handler) scope of the original handler";
  }
}
function _throw_resume_final(f) {
  throw "trying to resume an unresumable resumption (from finalization)";
}
function _evv_create( evv, indices ) {
  const n = indices.length;
  const evv2 = new Array(n);
  if (evv._cfc != null) { evv2._cfc = evv._cfc; }
  for(var i = 0; i < n; i++) {
    evv2[i] = evv[indices[i]];
  }
  return evv2;
}
function _evv_swap_create(indices) {
  const evv = _evv;
  _evv = _evv_create(evv,indices);
  return evv;
}
//--------------------------------------------------
// Yielding
//--------------------------------------------------
function _kcompose( to, conts ) {
  return function(x) {
    var acc = x;
    for(var i = 0; i < to; i++) {
      acc = conts[i](acc);
      if (_yielding()) {
        //return ((function(i){ return _yield_extend(_kcompose(i+1,to,conts)); })(i));
        while(++i < to) {
          _yield_extend(conts[i]);
        }
        return; // undefined
      }
    }
    return acc;
  }
}
function _yield_extend(next) {
  _assert(_yielding(), "yield extension while not yielding!");
  if (_yield.final) return;
  _yield.conts[_yield.conts_count++] = next;  // index is ~80% faster as push
}
function _yield_cont(f) {
  _assert(_yielding(), "yield extension while not yielding!");
  if (_yield.final) return;
  const cont   = _kcompose(_yield.conts_count,_yield.conts);
  _yield.conts = new Array(8);
  _yield.conts_count = 1;
  _yield.conts[0] = function(x){ return f(cont,x); };
}
function _yield_prompt(m) {
  if (_yield === null) {
    return Pure;
  }
  else if (_yield.marker !== m) {
    return (_yield.final ? YieldingFinal : Yielding);
  }
  else { // _yield.marker === m
    const cont   = (_yield.final ? _throw_resume_final : _kcompose(_yield.conts_count,_yield.conts));
    const clause = _yield.clause;
    _yield = null;
    return Yield(clause,cont);
  }
}
export function _yield_final(m,clause) {
  _assert(!_yielding(),"yielding final while yielding!");
  _yield = { marker: m, clause: clause, conts: null, conts_count: 0, final: true };
}
export function _yield_to(m,clause) {
  _assert(!_yielding(),"yielding while yielding!");
  _yield = { marker: m, clause: clause, conts: new Array(8), conts_count: 0, final: false };
}
function _yield_capture() {
  _assert(_yielding(),"can only capture a yield when yielding!");
  const yld = _yield;
  _yield = null;
  return yld;
}
function _reyield( yld ) {
  _assert(!_yielding(),"can only reyield a yield when not yielding!");
  _yield = yld;
}
 
// type declarations
// type evv
// type htag
export function Htag(tagname) /* forall<a> (tagname : string) -> htag<a> */  {
  return tagname;
}
// type marker
export function Marker(m) /* forall<e,a> (m : int32) -> marker<e,a> */  {
  return m;
}
// type ev
export function Ev(htag, marker, hnd, cfc, hevv) /* forall<a,e,b> (htag : htag<a>, marker : marker<e,b>, hnd : a<e,b>, cfc : cfc, hevv : evv<e>) -> ev<a> */  {
  return { htag: htag, marker: marker, hnd: hnd, cfc: cfc, hevv: hevv };
}
// type clause0
export function Clause0(clause) /* forall<a,b,e,c> (clause : (marker<e,c>, ev<b>) -> e a) -> clause0<a,b,e,c> */  {
  return clause;
}
// type clause1
export function Clause1(clause) /* forall<a,b,c,e,d> (clause : (marker<e,d>, ev<c>, a) -> e b) -> clause1<a,b,c,e,d> */  {
  return clause;
}
// type clause2
export function Clause2(clause) /* forall<a,b,c,d,e,a1> (clause : (marker<e,a1>, ev<d>, a, b) -> e c) -> clause2<a,b,c,d,e,a1> */  {
  return clause;
}
// type resume-result
export function Deep(result) /* forall<a,b> (result : a) -> resume-result<a,b> */  {
  return { _tag: 1, result: result };
}
export function Shallow(result) /* forall<a,b> (result : a) -> resume-result<a,b> */  {
  return { _tag: 2, result: result };
}
export function Finalize(result) /* forall<a,b> (result : b) -> resume-result<a,b> */  {
  return { _tag: 3, result: result };
}
// type resume-context
export function Resume_context(k) /* forall<a,e,e1,b> (k : (resume-result<a,b>) -> e b) -> resume-context<a,e,e1,b> */  {
  return k;
}
// type yield-info
// type yld
export const Pure = { _tag: 1 }; // forall<e,a,b> yld<e,a,b>
export const YieldingFinal = { _tag: 2 }; // forall<e,a,b> yld<e,a,b>
export const Yielding = { _tag: 3 }; // forall<e,a,b> yld<e,a,b>
export function Yield(clause, cont) /* forall<e,a,b,c> (clause : ((resume-result<c,b>) -> e b) -> e b, cont : (() -> c) -> e a) -> yld<e,a,b> */  {
  return { _tag: 4, clause: clause, cont: cont };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `tagname` constructor field of the `:htag` type.
export function tagname(htag0) /* forall<a> (htag : htag<a>) -> string */  {
  return htag0;
}
 
export function _copy(_this, tagname0) /* forall<a> (htag<a>, tagname : optional<string>) -> htag<a> */  {
  if (tagname0 !== undefined) {
    var _x0 = tagname0;
  }
  else {
    var _x0 = _this;
  }
  return _x0;
}
 
 
// Automatically generated. Retrieves the `m` constructor field of the `:marker` type.
export function m(marker) /* forall<e,a> (marker : marker<e,a>) -> int32 */  {
  return marker;
}
 
export function _copy_1(_this, m0) /* forall<e,a> (marker<e,a>, m : optional<int32>) -> marker<e,a> */  {
  if (m0 !== undefined) {
    var _x1 = m0;
  }
  else {
    var _x1 = _this;
  }
  return _x1;
}
 
 
// Automatically generated. Retrieves the `htag` constructor field of the `:ev` type.
export function htag(ev) /* forall<a> (ev : ev<a>) -> htag<a> */  {
  return ev.htag;
}
 
 
// Automatically generated. Retrieves the `cfc` constructor field of the `:ev` type.
export function cfc(ev) /* forall<a> (ev : ev<a>) -> cfc */  {
  return ev.cfc;
}
 
export function _copy_2(_this, htag0, marker, hnd, cfc0, hevv) /* forall<a,e,b> (ev<a>, htag : optional<htag<a>>, marker : marker<e,b>, hnd : a<e,b>, cfc : optional<cfc>, hevv : evv<e>) -> ev<a> */  {
  if (htag0 !== undefined) {
    var _x2 = htag0;
  }
  else {
    var _x2 = _this.htag;
  }
  if (cfc0 !== undefined) {
    var _x3 = cfc0;
  }
  else {
    var _x3 = _this.cfc;
  }
  return Ev(_x2, marker, hnd, _x3, hevv);
}
 
 
// Automatically generated. Retrieves the `clause` constructor field of the `:clause0` type.
export function clause(clause0) /* forall<a,b,e,c> (clause0 : clause0<a,b,e,c>) -> ((marker<e,c>, ev<b>) -> e a) */  {
  return clause0;
}
 
export function _copy_3(_this, clause0) /* forall<a,b,e,c> (clause0<a,b,e,c>, clause : optional<(marker<e,c>, ev<b>) -> e a>) -> clause0<a,b,e,c> */  {
  if (clause0 !== undefined) {
    var _x4 = clause0;
  }
  else {
    var _x4 = _this;
  }
  return _x4;
}
 
 
// Automatically generated. Retrieves the `clause` constructor field of the `:clause1` type.
export function clause_1(clause1) /* forall<a,b,c,e,d> (clause1 : clause1<a,b,c,e,d>) -> ((marker<e,d>, ev<c>, a) -> e b) */  {
  return clause1;
}
 
export function _copy_4(_this, clause0) /* forall<a,b,c,e,d> (clause1<a,b,c,e,d>, clause : optional<(marker<e,d>, ev<c>, a) -> e b>) -> clause1<a,b,c,e,d> */  {
  if (clause0 !== undefined) {
    var _x5 = clause0;
  }
  else {
    var _x5 = _this;
  }
  return _x5;
}
 
 
// Automatically generated. Retrieves the `clause` constructor field of the `:clause2` type.
export function clause_2(clause2) /* forall<a,b,c,d,e,a1> (clause2 : clause2<a,b,c,d,e,a1>) -> ((marker<e,a1>, ev<d>, a, b) -> e c) */  {
  return clause2;
}
 
export function _copy_5(_this, clause0) /* forall<a,b,c,d,e,a1> (clause2<a,b,c,d,e,a1>, clause : optional<(marker<e,a1>, ev<d>, a, b) -> e c>) -> clause2<a,b,c,d,e,a1> */  {
  if (clause0 !== undefined) {
    var _x6 = clause0;
  }
  else {
    var _x6 = _this;
  }
  return _x6;
}
 
 
// Automatically generated. Tests for the `Deep` constructor of the `:resume-result` type.
export function is_deep(resume_result) /* forall<a,b> (resume-result : resume-result<a,b>) -> bool */  {
  return (resume_result._tag === 1);
}
 
 
// Automatically generated. Tests for the `Shallow` constructor of the `:resume-result` type.
export function is_shallow(resume_result) /* forall<a,b> (resume-result : resume-result<a,b>) -> bool */  {
  return (resume_result._tag === 2);
}
 
 
// Automatically generated. Tests for the `Finalize` constructor of the `:resume-result` type.
export function is_finalize(resume_result) /* forall<a,b> (resume-result : resume-result<a,b>) -> bool */  {
  return (resume_result._tag === 3);
}
 
 
// Automatically generated. Retrieves the `k` constructor field of the `:resume-context` type.
export function k(_this) /* forall<a,e,e1,b> (resume-context<a,e,e1,b>) -> ((resume-result<a,b>) -> e b) */  {
  return _this;
}
 
export function _copy_6(_this, k0) /* forall<a,e,e1,b> (resume-context<a,e,e1,b>, k : optional<(resume-result<a,b>) -> e b>) -> resume-context<a,e,e1,b> */  {
  if (k0 !== undefined) {
    var _x7 = k0;
  }
  else {
    var _x7 = _this;
  }
  return _x7;
}
 
 
// Automatically generated. Tests for the `Pure` constructor of the `:yld` type.
export function is_pure(yld) /* forall<a,b,e> (yld : yld<e,a,b>) -> bool */  {
  return (yld._tag === 1);
}
 
 
// Automatically generated. Tests for the `YieldingFinal` constructor of the `:yld` type.
export function is_yieldingFinal(yld) /* forall<a,b,e> (yld : yld<e,a,b>) -> bool */  {
  return (yld._tag === 2);
}
 
 
// Automatically generated. Tests for the `Yielding` constructor of the `:yld` type.
export function is_yielding(yld) /* forall<a,b,e> (yld : yld<e,a,b>) -> bool */  {
  return (yld._tag === 3);
}
 
 
// Automatically generated. Tests for the `Yield` constructor of the `:yld` type.
export function is_yield(yld) /* forall<a,b,e> (yld : yld<e,a,b>) -> bool */  {
  return (yld._tag === 4);
}
 
 
// (dynamically) find evidence insertion/deletion index in the evidence vector
export function _evv_index(htag0) /* forall<e,a> (htag : htag<a>) -> e ev-index */  {
  return __evv_index(htag0);
}
 
export function _evv_is_affine() /* () -> bool */  {
  return $std_core_hnd._evv_cfc()<=2;
}
 
export function _evv_lookup(htag0) /* forall<a> (htag : htag<a>) -> ev<a> */  {
  return __evv_lookup(htag0);
}
 
 
// mask for builtin effects without a handler or evidence
export function _mask_builtin(action) /* forall<a,e,e1> (action : () -> e a) -> e1 a */  {
  return action();
}
 
export function _new_htag(tag) /* forall<a> (tag : string) -> htag<a> */  {
  return tag;
}
 
export function _open_none0(f) /* forall<a,e,e1> (f : () -> e a) -> e1 a */  {
   
  var w = $std_core_hnd._evv_swap_create0();
   
  var x = f();
   
  var keep = $std_core_hnd._evv_set(w);
  return x;
}
 
export function _open_none1(f, x1) /* forall<a,b,e,e1> (f : (a) -> e b, x1 : a) -> e1 b */  {
   
  var w = $std_core_hnd._evv_swap_create0();
   
  var x = f(x1);
   
  var keep = $std_core_hnd._evv_set(w);
  return x;
}
 
export function _open_none2(f, x1, x2) /* forall<a,b,c,e,e1> (f : (a, b) -> e c, x1 : a, x2 : b) -> e1 c */  {
   
  var w = $std_core_hnd._evv_swap_create0();
   
  var x = f(x1, x2);
   
  var keep = $std_core_hnd._evv_set(w);
  return x;
}
 
export function _open_none3(f, x1, x2, x3) /* forall<a,b,c,d,e,e1> (f : (a, b, c) -> e d, x1 : a, x2 : b, x3 : c) -> e1 d */  {
   
  var w = $std_core_hnd._evv_swap_create0();
   
  var x = f(x1, x2, x3);
   
  var keep = $std_core_hnd._evv_set(w);
  return x;
}
 
export function _open_none4(f, x1, x2, x3, x4) /* forall<a,b,c,d,a1,e,e1> (f : (a, b, c, d) -> e a1, x1 : a, x2 : b, x3 : c, x4 : d) -> e1 a1 */  {
   
  var w = $std_core_hnd._evv_swap_create0();
   
  var x = f(x1, x2, x3, x4);
   
  var keep = $std_core_hnd._evv_set(w);
  return x;
}
 
 
//inline extern cast-hnd( h : h<e1,r> ) : e h<e,r> { inline "#1"//inline extern cast-marker( m : marker<e1,r> ) : e marker<e,r> { inline "#1"
export function _perform0(ev, op) /* forall<a,e,b> (ev : ev<b>, op : forall<e1,c> (b<e1,c>) -> clause0<a,b,e1,c>) -> e a */  {
  var _x8 = op(ev.hnd);
  return _x8(ev.marker, ev);
}
 
export function _perform1(ev, op, x) /* forall<a,b,e,c> (ev : ev<c>, op : forall<e1,d> (c<e1,d>) -> clause1<a,b,c,e1,d>, x : a) -> e b */  {
  var _x9 = op(ev.hnd);
  return _x9(ev.marker, ev, x);
}
 
export function _perform2(evx, op, x, y) /* forall<a,b,c,e,d> (evx : ev<d>, op : forall<e1,a1> (d<e1,a1>) -> clause2<a,b,c,d,e1,a1>, x : a, y : b) -> e c */  {
  var _x10 = op(evx.hnd);
  return _x10(evx.marker, evx, x, y);
}
 
export function evv_get() /* forall<e> () -> e evv<e> */  {
  return $std_core_hnd._evv_get();
}
 
export function evv_insert(evv, ev) /* forall<e,e1,a> (evv : evv<e>, ev : ev<a>) -> e evv<e1> */  {
  return _evv_insert(evv,ev);
}
 
export function fresh_marker_int() /* () -> int32 */  {
  return $marker_unique++;
}
 
export function evv_eq(evv0, evv1) /* forall<e> (evv0 : evv<e>, evv1 : evv<e>) -> bool */  {
  return (evv0) === (evv1);
}
 
export function guard(w) /* forall<e> (w : evv<e>) -> e () */  {
  return _guard(w);
}
 
export function yield_extend(next) /* forall<a,b,e> (next : (a) -> e b) -> e b */  {
  return _yield_extend(next);
}
 
export function yield_cont(f) /* forall<a,e,b> (f : forall<c> ((c) -> e a, c) -> e b) -> e b */  {
  return _yield_cont(f);
}
 
export function yield_prompt(m0) /* forall<a,e,b> (m : marker<e,b>) -> yld<e,a,b> */  {
  return _yield_prompt(m0);
}
 
export function yield_to_final(m0, clause0) /* forall<a,e,e1,b> (m : marker<e1,b>, clause : ((resume-result<a,b>) -> e1 b) -> e1 b) -> e a */  {
  return $std_core_hnd._yield_final(m0,clause0);
}
 
export function evv_swap_delete(i, behind) /* forall<e,e1> (i : ev-index, behind : bool) -> e1 evv<e> */  {
  return _evv_swap_delete(i,behind);
}
 
export function fresh_marker_named_int() /* () -> int32 */  {
  return -($marker_unique++);
}
 
export function evv_swap_create(indices) /* forall<e> (indices : vector<ev-index>) -> e evv<e> */  {
  return _evv_swap_create(indices);
}
 
 
// For interal use
export function xperform1(ev, op, x) /* forall<a,b,e,c> (ev : ev<c>, op : forall<e1,d> (c<e1,d>) -> clause1<a,b,c,e1,d>, x : a) -> e b */  {
  var _x11 = op(ev.hnd);
  return _x11(ev.marker, ev, x);
}
 
export function yield_to_prim(m0, clause0) /* forall<a,e,e1,b> (m : marker<e1,b>, clause : ((resume-result<a,b>) -> e1 b) -> e1 b) -> e (() -> a) */  {
  return $std_core_hnd._yield_to(m0,clause0);
}
 
export function clause_tail_noyield0(op) /* forall<e,a,b,c> (op : () -> e b) -> clause0<b,c,e,a> */  {
  return function(___wildcard__565__14 /* marker<4172,4173> */ , ___wildcard__565__17 /* ev<4175> */ ) {
    return op();
  };
}
 
export function clause_tail_noyield1(op) /* forall<e,a,b,c,d> (op : (b) -> e c) -> clause1<b,c,d,e,a> */  {
  return function(___wildcard__522__14 /* marker<4203,4204> */ , ___wildcard__522__17 /* ev<4207> */ , x /* 4205 */ ) {
    return op(x);
  };
}
 
export function clause_tail_noyield2(op) /* forall<e,a,b,c,d,a1> (op : (b, c) -> e d) -> clause2<b,c,d,a1,e,a> */  {
  return function(___wildcard__607__14 /* marker<4240,4241> */ , ___wildcard__607__17 /* ev<4245> */ , x1 /* 4242 */ , x2 /* 4243 */ ) {
    return op(x1, x2);
  };
}
 
export function evv_swap_with(ev) /* forall<a,e> (ev : ev<a>) -> evv<e> */  {
  return $std_core_hnd._evv_swap((ev.hevv));
}
 
export function clause_value(v) /* forall<a,e,b,c> (v : a) -> clause0<a,b,e,c> */  {
  return function(___wildcard__568__14 /* marker<4293,4295> */ , ___wildcard__568__17 /* ev<4294> */ ) {
    return v;
  };
}
 
export function evv_show(evv) /* forall<e> (evv : evv<e>) -> string */  {
  return _evv_show(evv);
}
 
export function unsafe_reyield(yld) /* forall<a,e> (yld : yield-info) -> e a */  {
  return _reyield(yld);
}
 
export function yield_capture() /* forall<e> () -> e yield-info */  {
  return _yield_capture();
}
 
export function get(ref) /* forall<a,h> (ref : ref<h,a>) -> <read<h>,div> a */  {
  return ref.value;
}
 
export function hidden_htag(tag) /* forall<a> (tag : string) -> htag<a> */  {
  return tag;
}
 
export function resume(r, x) /* forall<a,e,e1,b> (r : resume-context<a,e,e1,b>, x : a) -> e b */  {
  return k(r)(Deep(x));
}
 
export function resume_final() /* forall<a> () -> a */  {
  return _throw_resume_final();
}
 
export function resume_shallow(r, x) /* forall<a,e,e1,b> (r : resume-context<a,e,e1,b>, x : a) -> e1 b */  {
  return k(r)(Shallow(x));
}
 
export function fresh_marker() /* forall<e,a> () -> marker<e,a> */  {
  return fresh_marker_int();
}
 
export function yield_bind(x, next) /* forall<a,b,e> (x : a, next : (a) -> e b) -> e b */  {
  if ($std_core_hnd._yielding()) {
    return yield_extend(next);
  }
  else {
    return next(x);
  }
}
 
export function prompt(w0, w1, ev, m0, ret, result) /* forall<a,e,b,c> (w0 : evv<e>, w1 : evv<e>, ev : ev<b>, m : marker<e,c>, ret : (a) -> e c, result : a) -> e c */  {
   
  guard(w1);
   
  $std_core_hnd._evv_set(w0);
  var _x12 = yield_prompt(m0);
  if (_x12._tag === 1) {
    return ret(result);
  }
  else if (_x12._tag === 2) {
    return undefined;
  }
  else if (_x12._tag === 3) {
    return yield_cont(function(cont /* (4626) -> 4763 4762 */ , res /* 4626 */ ) {
       
      var w0_sq_ = evv_get();
       
      var _x13 = evv_eq(w0, w0_sq_);
      if (_x13) {
        var w1_sq_ = w1;
      }
      else {
        var w1_sq_ = evv_insert(w0_sq_, ev);
      }
       
      $std_core_hnd._evv_set(w1_sq_);
      return prompt(w0_sq_, w1_sq_, ev, m0, ret, cont(res));
    });
  }
  else {
    return _x12.clause(function(r /* resume-result<4628,4765> */ ) {
      if (r._tag === 1) {
         
        var w00_sq_ = evv_get();
         
        var _x13 = evv_eq(w0, w00_sq_);
        if (_x13) {
          var w10_sq_ = w1;
        }
        else {
          var w10_sq_ = evv_insert(w00_sq_, ev);
        }
         
        $std_core_hnd._evv_set(w10_sq_);
        return prompt(w00_sq_, w10_sq_, ev, m0, ret, _x12.cont(function() {
            return r.result;
          }));
      }
      else if (r._tag === 2) {
         
        var x1_10832 = _x12.cont(function() {
          return r.result;
        });
        if ($std_core_hnd._yielding()) {
          return yield_extend(ret);
        }
        else {
          return ret(x1_10832);
        }
      }
      else {
         
        var w01_sq_ = evv_get();
         
        var _x13 = evv_eq(w0, w01_sq_);
        if (_x13) {
          var w11_sq_ = w1;
        }
        else {
          var w11_sq_ = evv_insert(w01_sq_, ev);
        }
         
        $std_core_hnd._evv_set(w11_sq_);
        return prompt(w01_sq_, w11_sq_, ev, m0, ret, _x12.cont(function() {
            return yield_to_final(m0, function(___wildcard__302__84 /* (resume-result<4628,4765>) -> 4763 4765 */ ) {
                return r.result;
              });
          }));
      }
    });
  }
}
 
export function _hhandle(tag, cfc0, h, ret, action) /* forall<a,e,e1,b,c> (tag : htag<b>, cfc : cfc, h : b<e,c>, ret : (a) -> e c, action : () -> e1 a) -> e c */  {
   
  var w0 = evv_get();
   
  var m0 = fresh_marker_int();
   
  var ev = Ev(tag, m0, h, cfc0, w0);
   
  var w1 = evv_insert(w0, ev);
   
  $std_core_hnd._evv_set(w1);
  return prompt(w0, w1, ev, m0, ret, action());
}
 
export function mask_at1(i, behind, action, x) /* forall<a,b,e,e1> (i : ev-index, behind : bool, action : (a) -> e b, x : a) -> e1 b */  {
   
  var w0 = evv_swap_delete(i, behind);
   
  var y = action(x);
   
  $std_core_hnd._evv_set(w0);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (4959) -> 4977 4975 */ , res /* 4959 */ ) {
      return mask_at1(i, behind, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function _mask_at(i, behind, action) /* forall<a,e,e1> (i : ev-index, behind : bool, action : () -> e a) -> e1 a */  {
   
  var w0 = evv_swap_delete(i, behind);
   
  var x = action();
   
  $std_core_hnd._evv_set(w0);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (5057) -> 5072 5070 */ , res /* 5057 */ ) {
      return mask_at1(i, behind, cont, res);
    });
  }
  else {
    return x;
  }
}
 
export function fresh_marker_named() /* forall<e,a> () -> marker<e,a> */  {
  return fresh_marker_named_int();
}
 
export function _named_handle(tag, cfc0, h, ret, action) /* forall<a,e,e1,b,c> (tag : htag<b>, cfc : cfc, h : b<e,c>, ret : (a) -> e c, action : (ev<b>) -> e1 a) -> e c */  {
   
  var m0 = fresh_marker_named_int();
   
  var w0 = evv_get();
   
  var ev = Ev(tag, m0, h, cfc0, w0);
  return prompt(w0, w0, ev, m0, ret, action(ev));
}
 
export function open_at1(i, f, x) /* forall<a,b,e,e1> (i : ev-index, f : (a) -> e b, x : a) -> e1 b */  {
   
  var w = $std_core_hnd._evv_swap_create1(i);
   
  var y = f(x);
   
  $std_core_hnd._evv_set(w);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (5280) -> 5298 5296 */ , res /* 5280 */ ) {
      return open_at1(i, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function _open_at0(i, f) /* forall<a,e,e1> (i : ev-index, f : () -> e a) -> e1 a */  {
   
  var w = $std_core_hnd._evv_swap_create1(i);
   
  var y = f();
   
  $std_core_hnd._evv_set(w);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (5375) -> 5390 5388 */ , res /* 5375 */ ) {
      return open_at1(i, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function _open_at1(i, f, x) /* forall<a,b,e,e1> (i : ev-index, f : (a) -> e b, x : a) -> e1 b */  {
   
  var w = $std_core_hnd._evv_swap_create1(i);
   
  var y = f(x);
   
  $std_core_hnd._evv_set(w);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (5479) -> 5497 5495 */ , res /* 5479 */ ) {
      return open_at1(i, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function _open_at2(i, f, x1, x2) /* forall<a,b,c,e,e1> (i : ev-index, f : (a, b) -> e c, x1 : a, x2 : b) -> e1 c */  {
   
  var w = $std_core_hnd._evv_swap_create1(i);
   
  var y = f(x1, x2);
   
  $std_core_hnd._evv_set(w);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (5598) -> 5619 5617 */ , res /* 5598 */ ) {
      return open_at1(i, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function _open_at3(i, f, x1, x2, x3) /* forall<a,b,c,d,e,e1> (i : ev-index, f : (a, b, c) -> e d, x1 : a, x2 : b, x3 : c) -> e1 d */  {
   
  var w = $std_core_hnd._evv_swap_create1(i);
   
  var y = f(x1, x2, x3);
   
  $std_core_hnd._evv_set(w);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (5669) -> 5693 5691 */ , res /* 5669 */ ) {
      return open_at1(i, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function _open_at4(i, f, x1, x2, x3, x4) /* forall<a,b,c,d,a1,e,e1> (i : ev-index, f : (a, b, c, d) -> e a1, x1 : a, x2 : b, x3 : c, x4 : d) -> e1 a1 */  {
   
  var w = $std_core_hnd._evv_swap_create1(i);
   
  var y = f(x1, x2, x3, x4);
   
  $std_core_hnd._evv_set(w);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (5746) -> 5773 5771 */ , res /* 5746 */ ) {
      return open_at1(i, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function open1(indices, f, x) /* forall<a,b,e,e1> (indices : vector<ev-index>, f : (a) -> e b, x : a) -> e1 b */  {
   
  var w = evv_swap_create(indices);
   
  var y = f(x);
   
  $std_core_hnd._evv_set(w);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (5865) -> 5883 5881 */ , res /* 5865 */ ) {
      return open1(indices, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function _open0(indices, f) /* forall<a,e,e1> (indices : vector<ev-index>, f : () -> e a) -> e1 a */  {
   
  var w = evv_swap_create(indices);
   
  var y = f();
   
  $std_core_hnd._evv_set(w);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (5960) -> 5975 5973 */ , res /* 5960 */ ) {
      return open1(indices, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function _open1(indices, f, x) /* forall<a,b,e,e1> (indices : vector<ev-index>, f : (a) -> e b, x : a) -> e1 b */  {
   
  var w = evv_swap_create(indices);
   
  var y = f(x);
   
  $std_core_hnd._evv_set(w);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (6064) -> 6082 6080 */ , res /* 6064 */ ) {
      return open1(indices, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function _open2(indices, f, x1, x2) /* forall<a,b,c,e,e1> (indices : vector<ev-index>, f : (a, b) -> e c, x1 : a, x2 : b) -> e1 c */  {
   
  var w = evv_swap_create(indices);
   
  var y = f(x1, x2);
   
  $std_core_hnd._evv_set(w);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (6183) -> 6204 6202 */ , res /* 6183 */ ) {
      return open1(indices, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function _open3(indices, f, x1, x2, x3) /* forall<a,b,c,d,e,e1> (indices : vector<ev-index>, f : (a, b, c) -> e d, x1 : a, x2 : b, x3 : c) -> e1 d */  {
   
  var w = evv_swap_create(indices);
   
  var y = f(x1, x2, x3);
   
  $std_core_hnd._evv_set(w);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (6254) -> 6278 6276 */ , res /* 6254 */ ) {
      return open1(indices, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function _open4(indices, f, x1, x2, x3, x4) /* forall<a,b,c,d,a1,e,e1> (indices : vector<ev-index>, f : (a, b, c, d) -> e a1, x1 : a, x2 : b, x3 : c, x4 : d) -> e1 a1 */  {
   
  var w = evv_swap_create(indices);
   
  var y = f(x1, x2, x3, x4);
   
  $std_core_hnd._evv_set(w);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (6331) -> 6358 6356 */ , res /* 6331 */ ) {
      return open1(indices, cont, res);
    });
  }
  else {
    return y;
  }
}
 
export function _perform3(ev, op, x1, x2, x3) /* forall<a,b,c,d,e,a1> (ev : ev<a1>, op : forall<e1,b1> (a1<e1,b1>) -> clause1<(a, b, c),d,a1,e1,b1>, x1 : a, x2 : b, x3 : c) -> e d */  {
  var _x13 = op(ev.hnd);
  return _x13(ev.marker, ev, $std_core_types._Tuple3_(x1, x2, x3));
}
 
export function _perform4(ev, op, x1, x2, x3, x4) /* forall<a,b,c,d,a1,e,b1> (ev : ev<b1>, op : forall<e1,c1> (b1<e1,c1>) -> clause1<(a, b, c, d),a1,b1,e1,c1>, x1 : a, x2 : b, x3 : c, x4 : d) -> e a1 */  {
  var _x14 = op(ev.hnd);
  return _x14(ev.marker, ev, $std_core_types._Tuple4_(x1, x2, x3, x4));
}
 
export function yield_to(m0, clause0) /* forall<a,e,b> (m : marker<e,b>, clause : ((resume-result<a,b>) -> e b) -> e b) -> e a */  {
   
  var g = yield_to_prim(m0, clause0);
  return yield_extend(function(f /* () -> 6490 6489 */ ) {
    return f();
  });
}
 
export function clause_control_raw0(op) /* forall<a,e,e1,b,c> (op : (resume-context<a,e,e1,c>) -> e c) -> clause0<a,b,e,c> */  {
  return function(m0 /* marker<6531,6534> */ , ___wildcard__550__16 /* ev<6533> */ ) {
    return yield_to(m0, function(k0 /* (resume-result<6530,6534>) -> 6531 6534 */ ) {
        return op(k0);
      });
  };
}
 
export function clause_control_raw1(op) /* forall<a,b,e,e1,c,d> (op : (x : a, r : resume-context<b,e,e1,d>) -> e d) -> clause1<a,b,c,e,d> */  {
  return function(m0 /* marker<6580,6583> */ , ___wildcard__487__16 /* ev<6582> */ , x /* 6578 */ ) {
    return yield_to(m0, function(k0 /* (resume-result<6579,6583>) -> 6580 6583 */ ) {
        return op(x, k0);
      });
  };
}
 
export function clause_control_raw2(op) /* forall<a,b,c,e,e1,d,a1> (op : (x1 : a, x2 : b, r : resume-context<c,e,e1,a1>) -> e a1) -> clause2<a,b,c,d,e,a1> */  {
  return function(m0 /* marker<6635,6638> */ , ___wildcard__601__16 /* ev<6637> */ , x1 /* 6632 */ , x2 /* 6633 */ ) {
    return yield_to(m0, function(k0 /* (resume-result<6634,6638>) -> 6635 6638 */ ) {
        return op(x1, x2, k0);
      });
  };
}
 
export function clause_control_raw3(op) /* forall<a,b,c,d,e,e1,a1,b1> (op : (x1 : a, x2 : b, x3 : c, r : resume-context<d,e,e1,b1>) -> e b1) -> clause1<(a, b, c),d,a1,e,b1> */  {
  return function(m0 /* marker<6877,6880> */ , ___wildcard__487__16 /* ev<6879> */ , x /* (6873, 6874, 6875) */ ) {
    return yield_to(m0, function(k0 /* (resume-result<6876,6880>) -> 6877 6880 */ ) {
        return op($std_core_types.fst_1(x), $std_core_types.snd_1(x), $std_core_types.thd(x), k0);
      });
  };
}
 
export function finalize(r, x) /* forall<a,e,e1,b> (r : resume-context<a,e,e1,b>, x : b) -> e b */  {
  return k(r)(Finalize(x));
}
 
export function protect_check(resumed, k0, res) /* forall<a,e,b> (resumed : ref<global,bool>, k : (resume-result<a,b>) -> e b, res : b) -> e b */  {
   
  var did_resume = resumed.value;
  if (did_resume) {
    return res;
  }
  else {
    return k0(Finalize(res));
  }
}
 
export function protect(x, clause0, k0) /* forall<a,b,e,c> (x : a, clause : (x : a, k : (b) -> e c) -> e c, k : (resume-result<b,c>) -> e c) -> e c */  {
   
  var resumed = { value: false };
   
  var res = clause0(x, function(ret /* 7088 */ ) {
       
      ((resumed).value = true);
      return k0(Deep(ret));
    });
  if ($std_core_hnd._yielding()) {
    return yield_extend(function(xres /* 7090 */ ) {
      return protect_check(resumed, k0, xres);
    });
  }
  else {
    return protect_check(resumed, k0, res);
  }
}
 
export function protect_1(x1, x2, clause0, k0) /* forall<a,b,c,e,d> (x1 : a, x2 : b, clause : (x : a, x : b, k : (c) -> e d) -> e d, k : (resume-result<c,d>) -> e d) -> e d */  {
   
  var resumed = { value: false };
   
  var res = clause0(x1, x2, function(ret /* 7181 */ ) {
       
      ((resumed).value = true);
      return k0(Deep(ret));
    });
  if ($std_core_hnd._yielding()) {
    return yield_extend(function(xres /* 7183 */ ) {
      return protect_check(resumed, k0, xres);
    });
  }
  else {
    return protect_check(resumed, k0, res);
  }
}
 
export function clause_control0(op) /* forall<a,e,b,c> (op : ((a) -> e c) -> e c) -> clause0<a,b,e,c> */  {
  return function(m0 /* marker<7285,7287> */ , ___wildcard__558__16 /* ev<7286> */ ) {
    return yield_to(m0, function(k0 /* (resume-result<7284,7287>) -> 7285 7287 */ ) {
        return protect($std_core_types._Unit_, function(___wildcard__558__55 /* () */ , r /* (7284) -> 7285 7287 */ ) {
            return op(r);
          }, k0);
      });
  };
}
 
export function clause_control1(clause0) /* forall<a,b,e,c,d> (clause : (x : a, k : (b) -> e d) -> e d) -> clause1<a,b,c,e,d> */  {
  return function(m0 /* marker<7359,7361> */ , ___wildcard__516__16 /* ev<7360> */ , x /* 7357 */ ) {
    return yield_to(m0, function(k0 /* (resume-result<7358,7361>) -> 7359 7361 */ ) {
        return protect(x, clause0, k0);
      });
  };
}
 
export function clause_control2(clause0) /* forall<a,b,c,e,d,a1> (clause : (x1 : a, x2 : b, k : (c) -> e a1) -> e a1) -> clause2<a,b,c,d,e,a1> */  {
  return function(m0 /* marker<7443,7445> */ , ___wildcard__597__16 /* ev<7444> */ , x1 /* 7440 */ , x2 /* 7441 */ ) {
    return yield_to(m0, function(k0 /* (resume-result<7442,7445>) -> 7443 7445 */ ) {
        return protect_1(x1, x2, clause0, k0);
      });
  };
}
 
export function clause_control3(op) /* forall<a,b,c,d,e,a1,b1> (op : (x1 : a, x2 : b, x3 : c, k : (d) -> e b1) -> e b1) -> clause1<(a, b, c),d,a1,e,b1> */  {
  return function(m0 /* marker<7680,7682> */ , ___wildcard__516__16 /* ev<7681> */ , x /* (7676, 7677, 7678) */ ) {
    return yield_to(m0, function(k0 /* (resume-result<7679,7682>) -> 7680 7682 */ ) {
        return protect(x, function(x0 /* (7676, 7677, 7678) */ , k1 /* (7679) -> 7680 7682 */ ) {
            return op($std_core_types.fst_1(x0), $std_core_types.snd_1(x0), $std_core_types.thd(x0), k1);
          }, k0);
      });
  };
}
 
export function clause_control4(op) /* forall<a,b,c,d,a1,e,b1,c1> (op : (x1 : a, x2 : b, x3 : c, x4 : d, k : (a1) -> e c1) -> e c1) -> clause1<(a, b, c, d),a1,b1,e,c1> */  {
  return function(m0 /* marker<7988,7990> */ , ___wildcard__516__16 /* ev<7989> */ , x /* (7983, 7984, 7985, 7986) */ ) {
    return yield_to(m0, function(k0 /* (resume-result<7987,7990>) -> 7988 7990 */ ) {
        return protect(x, function(x0 /* (7983, 7984, 7985, 7986) */ , k1 /* (7987) -> 7988 7990 */ ) {
            return op($std_core_types.fst_2(x0), $std_core_types.snd_2(x0), $std_core_types.thd_1(x0), $std_core_types.field4(x0), k1);
          }, k0);
      });
  };
}
 
export function clause_never0(op) /* forall<a,e,b,c> (op : () -> e c) -> clause0<a,b,e,c> */  {
  return function(m0 /* marker<8021,8023> */ , ___wildcard__571__16 /* ev<8022> */ ) {
    return yield_to_final(m0, function(___wildcard__571__43 /* (resume-result<8020,8023>) -> 8021 8023 */ ) {
        return op();
      });
  };
}
 
export function clause_never1(op) /* forall<a,b,e,c,d> (op : (a) -> e d) -> clause1<a,b,c,e,d> */  {
  return function(m0 /* marker<8060,8062> */ , ___wildcard__525__16 /* ev<8061> */ , x /* 8058 */ ) {
    return yield_to_final(m0, function(___wildcard__525__45 /* (resume-result<8059,8062>) -> 8060 8062 */ ) {
        return op(x);
      });
  };
}
 
export function clause_never2(op) /* forall<a,b,c,e,d,a1> (op : (a, b) -> e a1) -> clause2<a,b,c,d,e,a1> */  {
  return function(m0 /* marker<8105,8107> */ , ___wildcard__615__16 /* ev<8106> */ , x1 /* 8102 */ , x2 /* 8103 */ ) {
    return yield_to_final(m0, function(___wildcard__615__49 /* (resume-result<8104,8107>) -> 8105 8107 */ ) {
        return op(x1, x2);
      });
  };
}
 
export function clause_never3(op) /* forall<a,b,c,d,e,a1,b1> (op : (a, b, c) -> e b1) -> clause1<(a, b, c),d,a1,e,b1> */  {
  return function(m0 /* marker<8341,8343> */ , ___wildcard__525__16 /* ev<8342> */ , x /* (8337, 8338, 8339) */ ) {
    return yield_to_final(m0, function(___wildcard__525__45 /* (resume-result<8340,8343>) -> 8341 8343 */ ) {
        return op($std_core_types.fst_1(x), $std_core_types.snd_1(x), $std_core_types.thd(x));
      });
  };
}
 
export function clause_never4(op) /* forall<a,b,c,d,a1,e,b1,c1> (op : (a, b, c, d) -> e c1) -> clause1<(a, b, c, d),a1,b1,e,c1> */  {
  return function(m0 /* marker<8648,8650> */ , ___wildcard__525__16 /* ev<8649> */ , x /* (8643, 8644, 8645, 8646) */ ) {
    return yield_to_final(m0, function(___wildcard__525__45 /* (resume-result<8647,8650>) -> 8648 8650 */ ) {
        return op($std_core_types.fst_2(x), $std_core_types.snd_2(x), $std_core_types.thd_1(x), $std_core_types.field4(x));
      });
  };
}
 
export function clause_tail_noyield3(op) /* forall<a,b,c,d,e,a1,b1> (op : (a, b, c) -> e d) -> clause1<(a, b, c),d,a1,e,b1> */  {
  return function(___wildcard__522__14 /* marker<8884,8886> */ , ___wildcard__522__17 /* ev<8885> */ , x /* (8880, 8881, 8882) */ ) {
    return op($std_core_types.fst_1(x), $std_core_types.snd_1(x), $std_core_types.thd(x));
  };
}
 
export function clause_tail_noyield4(op) /* forall<a,b,c,d,a1,e,b1,c1> (op : (a, b, c, d) -> e a1) -> clause1<(a, b, c, d),a1,b1,e,c1> */  {
  return function(___wildcard__522__14 /* marker<9191,9193> */ , ___wildcard__522__17 /* ev<9192> */ , x /* (9186, 9187, 9188, 9189) */ ) {
    return op($std_core_types.fst_2(x), $std_core_types.snd_2(x), $std_core_types.thd_1(x), $std_core_types.field4(x));
  };
}
 
 
// extra under1x to make under1 inlineable
export function under1x(ev, op, x) /* forall<a,b,e,c> (ev : ev<c>, op : (a) -> e b, x : a) -> e b */  {
   
  var w0 = evv_swap_with(ev);
   
  var y = op(x);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (9232) -> 9253 9252 */ , res /* 9232 */ ) {
      return under1x(ev, cont, res);
    });
  }
  else {
     
    $std_core_hnd._evv_set(w0);
    return y;
  }
}
 
export function under1(ev, op, x) /* forall<a,b,e,c> (ev : ev<c>, op : (a) -> e b, x : a) -> e b */  {
   
  var w0 = evv_swap_with(ev);
   
  var y = op(x);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (9293) -> 9314 9313 */ , res /* 9293 */ ) {
      return under1x(ev, cont, res);
    });
  }
  else {
     
    $std_core_hnd._evv_set(w0);
    return y;
  }
}
 
export function under0(ev, op) /* forall<a,e,b> (ev : ev<b>, op : () -> e a) -> e a */  {
   
  var w0 = evv_swap_with(ev);
   
  var y = op();
   
  $std_core_hnd._evv_set(w0);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (9353) -> 9367 9366 */ , res /* 9353 */ ) {
       
      var w00 = evv_swap_with(ev);
       
      var y0 = cont(res);
      if ($std_core_hnd._yielding()) {
        return yield_cont(function(cont0 /* (9293) -> 9367 9366 */ , res0 /* 9293 */ ) {
          return under1x(ev, cont0, res0);
        });
      }
      else {
         
        $std_core_hnd._evv_set(w00);
        return y0;
      }
    });
  }
  else {
    return y;
  }
}
 
export function clause_tail0(op) /* forall<e,a,b,c> (op : () -> e b) -> clause0<b,c,e,a> */  {
  return function(___wildcard__562__14 /* marker<9396,9397> */ , ev /* ev<9399> */ ) {
     
    var w0 = evv_swap_with(ev);
     
    var y = op();
     
    $std_core_hnd._evv_set(w0);
    if ($std_core_hnd._yielding()) {
      return yield_cont(function(cont /* (9353) -> 9396 9398 */ , res /* 9353 */ ) {
         
        var w00 = evv_swap_with(ev);
         
        var y0 = cont(res);
        if ($std_core_hnd._yielding()) {
          return yield_cont(function(cont0 /* (9293) -> 9396 9398 */ , res0 /* 9293 */ ) {
            return under1x(ev, cont0, res0);
          });
        }
        else {
           
          $std_core_hnd._evv_set(w00);
          return y0;
        }
      });
    }
    else {
      return y;
    }
  };
}
 
export function clause_tail1(op) /* forall<e,a,b,c,d> (op : (b) -> e c) -> clause1<b,c,d,e,a> */  {
  return function(___wildcard__519__14 /* marker<9433,9434> */ , ev /* ev<9437> */ , x /* 9435 */ ) {
     
    var w0 = evv_swap_with(ev);
     
    var y = op(x);
    if ($std_core_hnd._yielding()) {
      return yield_cont(function(cont /* (9293) -> 9433 9436 */ , res /* 9293 */ ) {
        return under1x(ev, cont, res);
      });
    }
    else {
       
      $std_core_hnd._evv_set(w0);
      return y;
    }
  };
}
 
export function under2(ev, op, x1, x2) /* forall<a,b,c,e,d> (ev : ev<d>, op : (a, b) -> e c, x1 : a, x2 : b) -> e c */  {
   
  var w0 = evv_swap_with(ev);
   
  var z = op(x1, x2);
   
  $std_core_hnd._evv_set(w0);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (9479) -> 9499 9498 */ , res /* 9479 */ ) {
       
      var w00 = evv_swap_with(ev);
       
      var y = cont(res);
      if ($std_core_hnd._yielding()) {
        return yield_cont(function(cont0 /* (9293) -> 9499 9498 */ , res0 /* 9293 */ ) {
          return under1x(ev, cont0, res0);
        });
      }
      else {
         
        $std_core_hnd._evv_set(w00);
        return y;
      }
    });
  }
  else {
    return z;
  }
}
 
export function clause_tail2(op) /* forall<e,a,b,c,d,a1> (op : (b, c) -> e d) -> clause2<b,c,d,a1,e,a> */  {
  return function(m0 /* marker<9540,9541> */ , ev /* ev<9545> */ , x1 /* 9542 */ , x2 /* 9543 */ ) {
    return under2(ev, op, x1, x2);
  };
}
 
export function clause_tail3(op) /* forall<a,b,c,d,e,a1,b1> (op : (a, b, c) -> e d) -> clause1<(a, b, c),d,a1,e,b1> */  {
  return function(___wildcard__522__14 /* marker<9779,9781> */ , ___wildcard__522__17 /* ev<9780> */ , x /* (9775, 9776, 9777) */ ) {
    return op($std_core_types.fst_1(x), $std_core_types.snd_1(x), $std_core_types.thd(x));
  };
}
 
export function clause_tail4(op) /* forall<a,b,c,d,a1,e,b1,c1> (op : (a, b, c, d) -> e a1) -> clause1<(a, b, c, d),a1,b1,e,c1> */  {
  return function(___wildcard__522__14 /* marker<10086,10088> */ , ___wildcard__522__17 /* ev<10087> */ , x /* (10081, 10082, 10083, 10084) */ ) {
    return op($std_core_types.fst_2(x), $std_core_types.snd_2(x), $std_core_types.thd_1(x), $std_core_types.field4(x));
  };
}
 
export function finally_prompt(fin, res) /* forall<a,e> (fin : () -> e (), res : a) -> e a */  {
   
  var b = $std_core_hnd._yielding();
  if (b) {
    if ($std_core_hnd._yielding_non_final()) {
      return yield_cont(function(cont /* (10142) -> 10178 10177 */ , x /* 10142 */ ) {
        return finally_prompt(fin, cont(x));
      });
    }
    else {
       
      var yld = yield_capture();
       
      fin();
      if ($std_core_hnd._yielding()) {
        return yield_extend(function(___wildcard__380__43 /* _10153 */ ) {
          return unsafe_reyield(yld);
        });
      }
      else {
        return unsafe_reyield(yld);
      }
    }
  }
  else {
     
    fin();
    return res;
  }
}
 
export function $finally(fin, action) /* forall<a,e> (fin : () -> e (), action : () -> e a) -> e a */  {
  return finally_prompt(fin, action());
}
 
export function initially_prompt(init, res) /* forall<a,e> (init : (int) -> e (), res : a) -> e a */  {
  if ($std_core_hnd._yielding_non_final()) {
     
    var count = { value: 0 };
    return yield_cont(function(cont /* (10322) -> 10332 10331 */ , x /* 10322 */ ) {
       
      var cnt = count.value;
       
      ((count).value = ((cnt + 1)));
      if ((cnt == 0)) {
        return initially_prompt(init, cont(x));
      }
      else {
         
        var r = init(cnt);
        if ($std_core_hnd._yielding()) {
          return yield_extend(function(___wildcard__420__47 /* _10290 */ ) {
            return initially_prompt(init, cont(x));
          });
        }
        else {
          return initially_prompt(init, cont(x));
        }
      }
    });
  }
  else {
    return res;
  }
}
 
export function initially(init, action) /* forall<a,e> (init : (int) -> e (), action : () -> e a) -> e a */  {
   
  init(0);
  if ($std_core_hnd._yielding()) {
    return yield_extend(function(___wildcard__409__40 /* () */ ) {
      return initially_prompt(init, action());
    });
  }
  else {
    return initially_prompt(init, action());
  }
}
 
export function prompt_local_var(loc, res) /* forall<a,b,h> (loc : local-var<h,a>, res : b) -> <div,local<h>> b */  {
   
  var b_10863 = $std_core_hnd._yielding();
  if (b_10863) {
     
    var v = ((loc).value);
    return yield_cont(function(cont /* (10442) -> <div,local<10461>> 10459 */ , x /* 10442 */ ) {
       
      ((loc).value = v);
      return prompt_local_var(loc, cont(x));
    });
  }
  else {
    return res;
  }
}
 
export function local_var(init, action) /* forall<a,b,e,h> (init : a, action : (l : local-var<h,a>) -> <local<h>|e> b) -> <local<h>|e> b */  {
   
  var loc = { value: init };
   
  var res = action(loc);
  return prompt_local_var(loc, res);
}
 
export function try_finalize_prompt(res) /* forall<a,e> (res : a) -> e either<yield-info,a> */  {
  if ($std_core_hnd._yielding_non_final()) {
    return yield_cont(function(cont /* (10584) -> 10635 10634 */ , x /* 10584 */ ) {
      return try_finalize_prompt(cont(x));
    });
  }
  else {
     
    var b = $std_core_hnd._yielding();
    if (b) {
      return $std_core_types.Left(yield_capture());
    }
    else {
      return $std_core_types.Right(res);
    }
  }
}
 
export function under3(ev, op, x1, x2, x3) /* forall<a,b,c,d,e,a1> (ev : ev<a1>, op : (a, b, c) -> e d, x1 : a, x2 : b, x3 : c) -> e d */  {
   
  var w0 = evv_swap_with(ev);
   
  var z = op(x1, x2, x3);
   
  $std_core_hnd._evv_set(w0);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (10679) -> 10702 10701 */ , res /* 10679 */ ) {
       
      var w00 = evv_swap_with(ev);
       
      var y = cont(res);
      if ($std_core_hnd._yielding()) {
        return yield_cont(function(cont0 /* (9293) -> 10702 10701 */ , res0 /* 9293 */ ) {
          return under1x(ev, cont0, res0);
        });
      }
      else {
         
        $std_core_hnd._evv_set(w00);
        return y;
      }
    });
  }
  else {
    return z;
  }
}
 
export function under4(ev, op, x1, x2, x3, x4) /* forall<a,b,c,d,a1,e,b1> (ev : ev<b1>, op : (a, b, c, d) -> e a1, x1 : a, x2 : b, x3 : c, x4 : d) -> e a1 */  {
   
  var w0 = evv_swap_with(ev);
   
  var z = op(x1, x2, x3, x4);
   
  $std_core_hnd._evv_set(w0);
  if ($std_core_hnd._yielding()) {
    return yield_cont(function(cont /* (10749) -> 10775 10774 */ , res /* 10749 */ ) {
       
      var w00 = evv_swap_with(ev);
       
      var y = cont(res);
      if ($std_core_hnd._yielding()) {
        return yield_cont(function(cont0 /* (9293) -> 10775 10774 */ , res0 /* 9293 */ ) {
          return under1x(ev, cont0, res0);
        });
      }
      else {
         
        $std_core_hnd._evv_set(w00);
        return y;
      }
    });
  }
  else {
    return z;
  }
}
 
export function unsafe_try_finalize(action) /* forall<a,e> (action : () -> e a) -> e either<yield-info,a> */  {
  return try_finalize_prompt(action());
}
 
export function yield_bind2(x, extend, next) /* forall<a,b,e> (x : a, extend : (a) -> e b, next : (a) -> e b) -> e b */  {
  if ($std_core_hnd._yielding()) {
    return yield_extend(extend);
  }
  else {
    return next(x);
  }
}