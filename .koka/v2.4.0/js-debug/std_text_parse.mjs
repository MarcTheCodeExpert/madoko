// Koka generated module: "std/text/parse", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
 
// externals
 
// type declarations
 
 
// runtime tag for the `:parse` effect
export var _tag_parse;
var _tag_parse = "parse.parse";
// type .hnd-parse
export function _Hnd_parse(fun_current_input, ctl_fail, ctl_pick, fun_satisfy) /* forall<e,a> (fun-current-input : std/core/hnd/clause0<sslice,.hnd-parse,e,a>, ctl-fail : forall<b> std/core/hnd/clause1<string,b,.hnd-parse,e,a>, ctl-pick : std/core/hnd/clause0<bool,.hnd-parse,e,a>, fun-satisfy : forall<b> std/core/hnd/clause1<(sslice) -> total maybe<(b, sslice)>,maybe<b>,.hnd-parse,e,a>) -> .hnd-parse<e,a> */  {
  return { fun_current_input: fun_current_input, ctl_fail: ctl_fail, ctl_pick: ctl_pick, fun_satisfy: fun_satisfy };
}
// type parse
export function Parse(_field1) /* forall<e,a> (.hnd-parse<e,a>) -> parse */  {
  return { _field1: _field1 };
}
// type parse-error
export function ParseOk(result, rest) /* forall<a> (result : a, rest : sslice) -> parse-error<a> */  {
  return { _tag: 1, result: result, rest: rest };
}
export function ParseError(msg, rest) /* forall<a> (msg : string, rest : sslice) -> parse-error<a> */  {
  return { _tag: 2, msg: msg, rest: rest };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `rest` constructor field of the `:parse-error` type.
export function rest(_this) /* forall<a> (parse-error<a>) -> sslice */  {
  return (_this._tag === 1) ? _this.rest : _this.rest;
}
 
 
// Automatically generated. Tests for the `ParseOk` constructor of the `:parse-error` type.
export function is_parseOk(parse_error) /* forall<a> (parse-error : parse-error<a>) -> bool */  {
  return (parse_error._tag === 1);
}
 
 
// Automatically generated. Tests for the `ParseError` constructor of the `:parse-error` type.
export function is_parseError(parse_error) /* forall<a> (parse-error : parse-error<a>) -> bool */  {
  return (parse_error._tag === 2);
}
 
 
// handler for the `:parse` effect
export function _handle_parse(cfc, hnd, ret, action) /* forall<a,e,b> (cfc : int32, hnd : .hnd-parse<e,b>, ret : (res : a) -> e b, action : () -> <parse|e> a) -> e b */  {
  return $std_core_hnd._hhandle(_tag_parse, cfc, hnd, ret, action);
}
 
 
// select `current-input` operation out of the `:parse` effect handler
export function _select_current_input(hnd) /* forall<e,a> (hnd : .hnd-parse<e,a>) -> std/core/hnd/clause0<sslice,.hnd-parse,e,a> */  {
  return hnd.fun_current_input;
}
 
 
// select `fail` operation out of the `:parse` effect handler
export function _select_fail(hnd) /* forall<a,e,b> (hnd : .hnd-parse<e,b>) -> std/core/hnd/clause1<string,a,.hnd-parse,e,b> */  {
  return hnd.ctl_fail;
}
 
 
// select `pick` operation out of the `:parse` effect handler
export function _select_pick(hnd) /* forall<e,a> (hnd : .hnd-parse<e,a>) -> std/core/hnd/clause0<bool,.hnd-parse,e,a> */  {
  return hnd.ctl_pick;
}
 
 
// select `satisfy` operation out of the `:parse` effect handler
export function _select_satisfy(hnd) /* forall<a,e,b> (hnd : .hnd-parse<e,b>) -> std/core/hnd/clause1<(sslice) -> total maybe<(a, sslice)>,maybe<a>,.hnd-parse,e,b> */  {
  return hnd.fun_satisfy;
}
 
export function either(perr) /* forall<a> (perr : parse-error<a>) -> either<string,a> */  {
  if (perr._tag === 1) {
    return $std_core_types.Right(perr.result);
  }
  else {
    return $std_core_types.Left(perr.msg);
  }
}
 
 
// call `fail` operation of the `:parse` effect
export function fail(msg) /* forall<a> (msg : string) -> parse a */  {
   
  var ev_2428 = $std_core_hnd._evv_at(0);
  var _x0 = _select_fail(ev_2428.hnd);
  return _x0(ev_2428.marker, ev_2428, msg);
}
 
 
// call `satisfy` operation of the `:parse` effect
export function satisfy(pred) /* forall<a> (pred : (sslice) -> total maybe<(a, sslice)>) -> parse maybe<a> */  {
   
  var ev_2431 = $std_core_hnd._evv_at(0);
  var _x1 = _select_satisfy(ev_2431.hnd);
  return _x1(ev_2431.marker, ev_2431, pred);
}
 
 
// monadic lift
export function _mlift2404_satisfy_fail(msg, _y_2315) /* forall<a> (msg : string, maybe<a>) -> parse a */  {
  if (_y_2315 === null) {
     
    var ev_2434 = $std_core_hnd._evv_at(0);
    var _x2 = _select_fail(ev_2434.hnd);
    return _x2(ev_2434.marker, ev_2434, msg);
  }
  else {
    return _y_2315.value;
  }
}
 
export function satisfy_fail(msg, pred) /* forall<a> (msg : string, pred : (sslice) -> maybe<(a, sslice)>) -> parse a */  {
   
  var ev_2440 = $std_core_hnd._evv_at(0);
   
  var _x3 = _select_satisfy(ev_2440.hnd);
  var x_2437 = _x3(ev_2440.marker, ev_2440, pred);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2315 /* maybe<542> */ ) {
      return _mlift2404_satisfy_fail(msg, _y_2315);
    });
  }
  else {
    if (x_2437 === null) {
       
      var ev0_2443 = $std_core_hnd._evv_at(0);
      var _x3 = _select_fail(ev0_2443.hnd);
      return _x3(ev0_2443.marker, ev0_2443, msg);
    }
    else {
      return x_2437.value;
    }
  }
}
 
export function char_is(msg, pred) /* (msg : string, pred : (char) -> bool) -> parse char */  {
  return satisfy_fail(msg, function(slice /* sslice */ ) {
      var _x4 = $std_core.next(slice);
      if (_x4 !== null) {
        if (pred(_x4.value.fst)){
          return $std_core_types.Just($std_core_types._Tuple2_(_x4.value.fst, _x4.value.snd));
        }
      }
      return $std_core_types.Nothing;
    });
}
 
export function alpha() /* () -> parse char */  {
  return satisfy_fail("alpha", function(slice /* sslice */ ) {
      var _x5 = $std_core.next(slice);
      if (_x5 !== null) {
        if ($std_core.is_alpha(_x5.value.fst)){
          return $std_core_types.Just($std_core_types._Tuple2_(_x5.value.fst, _x5.value.snd));
        }
      }
      return $std_core_types.Nothing;
    });
}
 
export function alpha_num() /* () -> parse char */  {
  return satisfy_fail("alpha-num", function(slice /* sslice */ ) {
      var _x6 = $std_core.next(slice);
      if (_x6 !== null) {
        if ($std_core.is_alpha_num(_x6.value.fst)){
          return $std_core_types.Just($std_core_types._Tuple2_(_x6.value.fst, _x6.value.snd));
        }
      }
      return $std_core_types.Nothing;
    });
}
 
export function char(c) /* (c : char) -> parse char */  {
   
  var msg_2252 = $std_core._lp__plus__plus__1_rp_("\'", $std_core._lp__plus__plus__1_rp_($std_core.show_char(c), "\'"));
  return satisfy_fail(msg_2252, function(slice /* sslice */ ) {
      var _x7 = $std_core.next(slice);
      if (_x7 !== null) {
        if ((c === (_x7.value.fst))){
          return $std_core_types.Just($std_core_types._Tuple2_(_x7.value.fst, _x7.value.snd));
        }
      }
      return $std_core_types.Nothing;
    });
}
 
export function next_while0(slice, pred, acc) /* (slice : sslice, pred : (char) -> bool, acc : list<char>) -> (list<char>, sslice) */  { tailcall: while(1)
{
  var _x8 = $std_core.next(slice);
  if (_x8 !== null) {
    if (pred(_x8.value.fst)){
      {
        // tail call
        var _x9 = $std_core.Cons(_x8.value.fst, acc);
        slice = _x8.value.snd;
        acc = _x9;
        continue tailcall;
      }
    }
  }
  return $std_core_types._Tuple2_($std_core._lift17195_reverse($std_core.Nil, acc), slice);
}}
 
export function chars_are(msg, pred) /* (msg : string, pred : (char) -> bool) -> parse list<char> */  {
  return satisfy_fail(msg, function(slice /* sslice */ ) {
      var _x10 = next_while0(slice, pred, $std_core.Nil);
      if (_x10.fst === null) {
        return $std_core_types.Nothing;
      }
      else {
        return $std_core_types.Just($std_core_types._Tuple2_(_x10.fst, _x10.snd));
      }
    });
}
 
 
// call `pick` operation of the `:parse` effect
export function pick() /* () -> parse bool */  {
   
  var ev_2446 = $std_core_hnd._evv_at(0);
  var _x11 = _select_pick(ev_2446.hnd);
  return _x11(ev_2446.marker, ev_2446);
}
 
 
// monadic lift
export function _mlift2405_choose(p0, pp, _y_2327) /* forall<a,e> (p0 : parser<e,a>, pp : list<parser<e,a>>, bool) -> <parse|e> a */  {
  if (_y_2327) {
    return p0();
  }
  else {
    return choose(pp);
  }
}
 
export function choose(ps) /* forall<a,e> (ps : list<parser<e,a>>) -> <parse|e> a */  { tailcall: while(1)
{
  if (ps === null) {
    return $std_core_hnd._open_at1($std_core_hnd._evv_index(_tag_parse), fail, "no further alternatives");
  }
  else if (ps !== null && ps.tail === null) {
    return ps.head();
  }
  else {
     
    var x_2448 = $std_core_hnd._open_at0($std_core_hnd._evv_index(_tag_parse), function() {
         
        var ev_2451 = $std_core_hnd._evv_at(0);
        var _x12 = _select_pick(ev_2451.hnd);
        return _x12(ev_2451.marker, ev_2451);
      });
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_23270 /* bool */ ) {
        return _mlift2405_choose(ps.head, ps.tail, _y_23270);
      });
    }
    else {
      if (x_2448) {
        return ps.head();
      }
      else {
        {
          // tail call
          ps = ps.tail;
          continue tailcall;
        }
      }
    }
  }
}}
 
 
// monadic lift
export function _mlift2406_count_acc(acc, n, p, x) /* forall<a,e> (acc : list<a>, n : int, p : parser<e,a>, x : a) -> <parse|e> list<a> */  {
  return count_acc($std_core._int_sub(n,1), $std_core.Cons(x, acc), p);
}
 
export function count_acc(n0, acc0, p0) /* forall<a,e> (n : int, acc : list<a>, p : parser<e,a>) -> <parse|e> list<a> */  { tailcall: while(1)
{
  if ($std_core._int_le(n0,0)) {
    return $std_core.reverse(acc0);
  }
  else {
     
    var x0_2453 = p0();
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(x1 /* 820 */ ) {
        return _mlift2406_count_acc(acc0, n0, p0, x1);
      });
    }
    else {
      {
        // tail call
        var _x12 = $std_core._int_sub(n0,1);
        var _x13 = $std_core.Cons(x0_2453, acc0);
        n0 = _x12;
        acc0 = _x13;
        continue tailcall;
      }
    }
  }
}}
 
export function count(n, p) /* forall<a,e> (n : int, p : parser<e,a>) -> <parse|e> list<a> */  {
  return count_acc(n, $std_core.Nil, p);
}
 
 
// call `current-input` operation of the `:parse` effect
export function current_input() /* () -> parse sslice */  {
   
  var ev_2456 = $std_core_hnd._evv_at(0);
  var _x14 = _select_current_input(ev_2456.hnd);
  return _x14(ev_2456.marker, ev_2456);
}
 
 
// monadic lift
export function _mlift2407_digit(c00) /* (c00 : char) -> parse int */  {
  return ($std_core_hnd._open_none2(function(c1 /* char */ , d /* char */ ) {
       
      var x_16956 = c1;
       
      var y_16957 = d;
      return (($std_core._int_sub(x_16956,y_16957)));
    }, c00, 0x0030));
}
 
export function digit() /* () -> parse int */  {
   
  var x_2458 = satisfy_fail("digit", function(slice /* sslice */ ) {
      var _x15 = $std_core.next(slice);
      if (_x15 !== null) {
        var _x16 = (((_x15.value.fst) >= 0x0030)) ? ((_x15.value.fst) <= 0x0039) : false;
        if (_x16){
          return $std_core_types.Just($std_core_types._Tuple2_(_x15.value.fst, _x15.value.snd));
        }
      }
      return $std_core_types.Nothing;
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2407_digit);
  }
  else {
    return ($std_core_hnd._open_none2(function(c1 /* char */ , d /* char */ ) {
         
        var x_16956 = c1;
         
        var y_16957 = d;
        return (($std_core._int_sub(x_16956,y_16957)));
      }, x_2458, 0x0030));
  }
}
 
export function digits() /* () -> parse string */  {
   
  var x_2461 = satisfy_fail("digit", function(slice /* sslice */ ) {
      var _x15 = next_while0(slice, $std_core.is_digit, $std_core.Nil);
      if (_x15.fst === null) {
        return $std_core_types.Nothing;
      }
      else {
        return $std_core_types.Just($std_core_types._Tuple2_(_x15.fst, _x15.snd));
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend($std_core.string_2);
  }
  else {
    return $std_core.string_2(x_2461);
  }
}
 
 
// monadic lift
export function _mlift2408_op(p1, p2, _y_2340) /* forall<a,e> (p1 : parser<e,a>, p2 : parser<e,a>, bool) -> <parse|e> a */  {
  if (_y_2340) {
    return p1();
  }
  else {
    return p2();
  }
}
 
export function _lp__bar__bar__rp_(p1, p2) /* forall<a,e> (p1 : parser<e,a>, p2 : parser<e,a>) -> <parse|e> a */  {
   
  var x_2463 = $std_core_hnd._open_at0($std_core_hnd._evv_index(_tag_parse), function() {
       
      var ev_2466 = $std_core_hnd._evv_at(0);
      var _x15 = _select_pick(ev_2466.hnd);
      return _x15(ev_2466.marker, ev_2466);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2340 /* bool */ ) {
      if (_y_2340) {
        return p1();
      }
      else {
        return p2();
      }
    });
  }
  else {
    if (x_2463) {
      return p1();
    }
    else {
      return p2();
    }
  }
}
 
export function optional($default, p) /* forall<a,e> (default : a, p : parser<e,a>) -> <parse|e> a */  {
  return _lp__bar__bar__rp_(p, function() {
      return $default;
    });
}
 
export function digits0() /* () -> parse string */  {
  return _lp__bar__bar__rp_(function() {
       
      var x_2471 = satisfy_fail("digit", function(slice /* sslice */ ) {
          var _x15 = next_while0(slice, $std_core.is_digit, $std_core.Nil);
          if (_x15.fst === null) {
            return $std_core_types.Nothing;
          }
          else {
            return $std_core_types.Just($std_core_types._Tuple2_(_x15.fst, _x15.snd));
          }
        });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend($std_core.string_2);
      }
      else {
        return $std_core.string_2(x_2471);
      }
    }, function() {
      return "0";
    });
}
 
 
// monadic lift
export function _mlift2409_eof(_y_2347) /* (maybe<()>) -> parse () */  {
  if (_y_2347 === null) {
     
    var ev_2473 = $std_core_hnd._evv_at(0);
    var _x15 = _select_fail(ev_2473.hnd);
    return _x15(ev_2473.marker, ev_2473, "expecting end-of-input");
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
export function eof() /* () -> parse () */  {
   
  var ev_2479 = $std_core_hnd._evv_at(0);
   
  var _x16 = _select_satisfy(ev_2479.hnd);
  var x_2476 = _x16(ev_2479.marker, ev_2479, function(s /* sslice */ ) {
       
      var _x17 = s.len;
      var b_17019 = (_x17 > 0);
      if (b_17019) {
        return $std_core_types.Nothing;
      }
      else {
        return $std_core_types.Just($std_core_types._Tuple2_($std_core_types._Unit_, s));
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2409_eof);
  }
  else {
    if (x_2476 === null) {
       
      var ev0_2482 = $std_core_hnd._evv_at(0);
      var _x16 = _select_fail(ev0_2482.hnd);
      return _x16(ev0_2482.marker, ev0_2482, "expecting end-of-input");
    }
    else {
      return $std_core_types._Unit_;
    }
  }
}
 
export function hex_digits() /* () -> parse string */  {
   
  var x_2485 = satisfy_fail("digit", function(slice /* sslice */ ) {
      var _x17 = next_while0(slice, $std_core.is_hex_digit, $std_core.Nil);
      if (_x17.fst === null) {
        return $std_core_types.Nothing;
      }
      else {
        return $std_core_types.Just($std_core_types._Tuple2_(_x17.fst, _x17.snd));
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend($std_core.string_2);
  }
  else {
    return $std_core.string_2(x_2485);
  }
}
 
 
// monadic lift
export function _mlift2410_many_acc(acc, p, x) /* forall<a,e> (acc : list<a>, p : parser<e,a>, x : a) -> <parse|e> list<a> */  {
  return many_acc(p, $std_core.Cons(x, acc));
}
 
export function many_acc(p0, acc0) /* forall<a,e> (p : parser<e,a>, acc : list<a>) -> <parse|e> list<a> */  {
  return _lp__bar__bar__rp_(function() {
       
      var x0_2487 = p0();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(x1 /* 1147 */ ) {
          return _mlift2410_many_acc(acc0, p0, x1);
        });
      }
      else {
        return _mlift2410_many_acc(acc0, p0, x0_2487);
      }
    }, function() {
      return $std_core.reverse(acc0);
    });
}
 
export function many(p) /* forall<a,e> (p : parser<e,a>) -> <parse|e> list<a> */  {
  return many_acc(p, $std_core.Nil);
}
 
 
// monadic lift
export function _mlift2411_many1(_y_2355, _y_2356) /* forall<a,e> (a, list<a>) -> <parse|e> list<a> */  {
  return $std_core.Cons(_y_2355, _y_2356);
}
 
 
// monadic lift
export function _mlift2412_many1(p, _y_2355) /* forall<a,e> (p : parser<e,a>, a) -> <parse|e> list<a> */  {
   
  var x_2489 = many_acc(p, $std_core.Nil);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2356 /* list<1184> */ ) {
      return $std_core.Cons(_y_2355, _y_2356);
    });
  }
  else {
    return $std_core.Cons(_y_2355, x_2489);
  }
}
 
export function many1(p) /* forall<a,e> (p : parser<e,a>) -> <parse|e> list<a> */  {
   
  var x_2493 = p();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2355 /* 1184 */ ) {
      return _mlift2412_many1(p, _y_2355);
    });
  }
  else {
     
    var x0_2496 = many_acc(p, $std_core.Nil);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_2356 /* list<1184> */ ) {
        return $std_core.Cons(x_2493, _y_2356);
      });
    }
    else {
      return $std_core.Cons(x_2493, x0_2496);
    }
  }
}
 
export function maybe(perr) /* forall<a> (perr : parse-error<a>) -> maybe<a> */  {
  if (perr._tag === 1) {
    return $std_core_types.Just(perr.result);
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
export function next_match(slice, cs) /* (slice : sslice, cs : list<char>) -> maybe<sslice> */  { tailcall: while(1)
{
  if (cs === null) {
    return $std_core_types.Just(slice);
  }
  else {
    var _x17 = $std_core.next(slice);
    if (_x17 !== null) {
      if (((cs.head) === (_x17.value.fst))){
        {
          // tail call
          slice = _x17.value.snd;
          cs = cs.tail;
          continue tailcall;
        }
      }
    }
    return $std_core_types.Nothing;
  }
}}
 
export function no_digit() /* () -> parse char */  {
  return satisfy_fail("not a digit", function(slice /* sslice */ ) {
      var _x18 = $std_core.next(slice);
      if (_x18 !== null) {
         
        var b_2273 = (((_x18.value.fst) >= 0x0030)) ? ((_x18.value.fst) <= 0x0039) : false;
        var _x19 = (b_2273) ? false : true;
        if (_x19){
          return $std_core_types.Just($std_core_types._Tuple2_(_x18.value.fst, _x18.value.snd));
        }
      }
      return $std_core_types.Nothing;
    });
}
 
export function none_of(chars) /* (chars : string) -> parse char */  {
  return satisfy_fail("", function(slice /* sslice */ ) {
      var _x20 = $std_core.next(slice);
      if (_x20 !== null) {
         
        var b_2277 = ((chars).indexOf(($std_core.string(_x20.value.fst))) >= 0);
        var _x21 = (b_2277) ? false : true;
        if (_x21){
          return $std_core_types.Just($std_core_types._Tuple2_(_x20.value.fst, _x20.value.snd));
        }
      }
      return $std_core_types.Nothing;
    });
}
 
export function none_of_many1(chars) /* (chars : string) -> parse string */  {
   
  var x_2501 = satisfy_fail("", function(slice /* sslice */ ) {
      var _x22 = next_while0(slice, function(c /* char */ ) {
           
          var b_2280 = ((chars).indexOf(($std_core.string(c))) >= 0);
          return (b_2280) ? false : true;
        }, $std_core.Nil);
      if (_x22.fst === null) {
        return $std_core_types.Nothing;
      }
      else {
        return $std_core_types.Just($std_core_types._Tuple2_(_x22.fst, _x22.snd));
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend($std_core.string_2);
  }
  else {
    return $std_core.string_2(x_2501);
  }
}
 
export function one_of(chars) /* (chars : string) -> parse char */  {
  return satisfy_fail(chars, function(slice /* sslice */ ) {
      var _x22 = $std_core.next(slice);
      if (_x22 !== null) {
        if (((chars).indexOf(($std_core.string(_x22.value.fst))) >= 0)){
          return $std_core_types.Just($std_core_types._Tuple2_(_x22.value.fst, _x22.value.snd));
        }
      }
      return $std_core_types.Nothing;
    });
}
 
export function one_of_or(chars, $default) /* (chars : string, default : char) -> parse char */  {
  return _lp__bar__bar__rp_(function() {
      return one_of(chars);
    }, function() {
      return $default;
    });
}
 
 
// monadic lift
export function _mlift2413_parse(msg, _y_2364) /* forall<h,a,e> (msg : string, sslice) -> <local<h>|e> parse-error<a> */  {
  return ParseError(msg, _y_2364);
}
 
 
// monadic lift
export function _mlift2414_parse(err1, _y_2368) /* forall<h,a,e> (err1 : parse-error<a>, parse-error<a>) -> <local<h>|e> parse-error<a> */  {
  if (_y_2368._tag === 1) {
    return ParseOk(_y_2368.result, _y_2368.rest);
  }
  else {
    return err1;
  }
}
 
 
// monadic lift
export function _mlift2415_parse(err1, resume, wild__) /* forall<h,a,e> (err1 : parse-error<a>, resume : (bool) -> <local<h>|e> parse-error<a>, wild_ : ()) -> <local<h>|e> parse-error<a> */  {
   
  var x_2503 = resume(false);
   
  function next_2504(_y_2368) /* (parse-error<2020>) -> <local<2014>|2021> parse-error<2020> */  {
    if (_y_2368._tag === 1) {
      return ParseOk(_y_2368.result, _y_2368.rest);
    }
    else {
      return err1;
    }
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_2504);
  }
  else {
    return next_2504(x_2503);
  }
}
 
 
// monadic lift
export function _mlift2416_parse(input, resume, save, _y_2366) /* forall<h,a,e> (input : local-var<h,sslice>, resume : (bool) -> <local<h>|e> parse-error<a>, save : sslice, parse-error<a>) -> <local<h>|e> parse-error<a> */  {
  if (_y_2366._tag === 1) {
    return ParseOk(_y_2366.result, _y_2366.rest);
  }
  else {
     
    var x_2507 = ((input).value = save);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
        return _mlift2415_parse(_y_2366, resume, wild__);
      });
    }
    else {
      return _mlift2415_parse(_y_2366, resume, x_2507);
    }
  }
}
 
 
// monadic lift
export function _mlift2417_parse(input, resume, save) /* forall<h,a,e> (input : local-var<h,sslice>, resume : (bool) -> <local<h>|e> parse-error<a>, save : sslice) -> <local<h>|e> parse-error<a> */  {
   
  var x_2509 = resume(true);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2366 /* parse-error<2020> */ ) {
      return _mlift2416_parse(input, resume, save, _y_2366);
    });
  }
  else {
    return _mlift2416_parse(input, resume, save, x_2509);
  }
}
 
 
// monadic lift
export function _mlift2418_parse(x, wild__0) /* forall<a,h,e> (x : a, wild_0 : ()) -> <local<h>|e> maybe<a> */  {
  return $std_core_types.Just(x);
}
 
 
// monadic lift
export function _mlift2419_parse(input, pred, inp) /* forall<a,h,e> (input : local-var<h,sslice>, pred : (sslice) -> total maybe<(a, sslice)>, inp : sslice) -> <local<h>|e> maybe<a> */  {
  var _x23 = pred(inp);
  if (_x23 !== null) {
     
    var x0_2511 = ((input).value = (_x23.value.snd));
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild__0 /* () */ ) {
        return $std_core_types.Just(_x23.value.fst);
      });
    }
    else {
      return $std_core_types.Just(_x23.value.fst);
    }
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// monadic lift
export function _mlift2420_parse(x0, _y_2373) /* forall<h,a,e> (x0 : a, sslice) -> <local<h>|e> parse-error<a> */  {
  return ParseOk(x0, _y_2373);
}
 
export function parse(input0, p) /* forall<a,e> (input0 : sslice, p : () -> <parse|e> a) -> e parse-error<a> */  {
  return function() {
     
    var loc = { value: input0 };
     
    var res = _handle_parse(3, _Hnd_parse(function(___wildcard__565__14 /* std/core/hnd/marker<<local<2014>|2021>,parse-error<2020>> */ , ___wildcard__565__17 /* std/core/hnd/ev<.hnd-parse> */ ) {
          return ((loc).value);
        }, function(m0 /* std/core/hnd/marker<<local<2014>|2021>,parse-error<2020>> */ , ___wildcard__525__16 /* std/core/hnd/ev<.hnd-parse> */ , x /* string */ ) {
          return $std_core_hnd.yield_to_final(m0, function(___wildcard__525__45 /* (std/core/hnd/resume-result<1874,parse-error<2020>>) -> <local<2014>|2021> parse-error<2020> */ ) {
               
              var x0_2519 = ((loc).value);
              if ($std_core_hnd._yielding()) {
                return $std_core_hnd.yield_extend(function(_y_2364 /* sslice */ ) {
                  return ParseError(x, _y_2364);
                });
              }
              else {
                return ParseError(x, x0_2519);
              }
            });
        }, function(m00 /* std/core/hnd/marker<<local<2014>|2021>,parse-error<2020>> */ , ___wildcard__558__16 /* std/core/hnd/ev<.hnd-parse> */ ) {
          return $std_core_hnd.yield_to(m00, function(k0 /* (std/core/hnd/resume-result<bool,parse-error<2020>>) -> <local<2014>|2021> parse-error<2020> */ ) {
              return $std_core_hnd.protect($std_core_types._Unit_, function(___wildcard__558__55 /* () */ , r /* (bool) -> <local<2014>|2021> parse-error<2020> */ ) {
                   
                  var x1_2524 = ((loc).value);
                  if ($std_core_hnd._yielding()) {
                    return $std_core_hnd.yield_extend(function(save /* sslice */ ) {
                      return _mlift2417_parse(loc, r, save);
                    });
                  }
                  else {
                    return _mlift2417_parse(loc, r, x1_2524);
                  }
                }, k0);
            });
        }, function(___wildcard__522__14 /* std/core/hnd/marker<<local<2014>|2021>,parse-error<2020>> */ , ___wildcard__522__17 /* std/core/hnd/ev<.hnd-parse> */ , x2 /* (sslice) -> total maybe<(1983, sslice)> */ ) {
           
          var x3_2527 = ((loc).value);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(inp /* sslice */ ) {
              return _mlift2419_parse(loc, x2, inp);
            });
          }
          else {
            return _mlift2419_parse(loc, x2, x3_2527);
          }
        }), function(x00 /* 2020 */ ) {
         
        var x4_2529 = ((loc).value);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_2373 /* sslice */ ) {
            return ParseOk(x00, _y_2373);
          });
        }
        else {
          return ParseOk(x00, x4_2529);
        }
      }, p);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
 
// monadic lift
export function _mlift2421_parse_eof(x, wild__) /* forall<a,e> (x : a, wild_ : ()) -> <parse|e> a */  {
  return x;
}
 
 
// monadic lift
export function _mlift2422_parse_eof(x) /* forall<a,e> (x : a) -> <parse|e> a */  {
   
  var x0_2534 = $std_core_hnd._open_at0($std_core_hnd._evv_index(_tag_parse), eof);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return x;
    });
  }
  else {
    return x;
  }
}
 
export function parse_eof(input, p) /* forall<a,e> (input : sslice, p : () -> <parse|e> a) -> e parse-error<a> */  {
  return parse(input, function() {
       
      var x_2538 = p();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(x0 /* 2045 */ ) {
          return _mlift2422_parse_eof(x0);
        });
      }
      else {
        return _mlift2422_parse_eof(x_2538);
      }
    });
}
 
 
// monadic lift
export function _mlift2423_pnat(_y_2381) /* (list<char>) -> parse int */  {
  return $std_core.parse_int_default($std_core.string_2(_y_2381), 0);
}
 
export function pnat() /* () -> parse int */  {
   
  var x_2540 = satisfy_fail("digit", function(slice /* sslice */ ) {
      var _x24 = next_while0(slice, $std_core.is_digit, $std_core.Nil);
      if (_x24.fst === null) {
        return $std_core_types.Nothing;
      }
      else {
        return $std_core_types.Just($std_core_types._Tuple2_(_x24.fst, _x24.snd));
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2423_pnat);
  }
  else {
    return $std_core.parse_int_default($std_core.string_2(x_2540), 0);
  }
}
 
 
// monadic lift
export function _mlift2424_sign(c0) /* (c0 : char) -> parse bool */  {
  return (c0 === 0x002D);
}
 
export function sign() /* () -> parse bool */  {
   
  var x_2543 = _lp__bar__bar__rp_(function() {
      return satisfy_fail("+-", function(slice /* sslice */ ) {
          var _x24 = $std_core.next(slice);
          if (_x24 !== null) {
            if (((("+-")).indexOf(($std_core.string(_x24.value.fst))) >= 0)){
              return $std_core_types.Just($std_core_types._Tuple2_(_x24.value.fst, _x24.value.snd));
            }
          }
          return $std_core_types.Nothing;
        });
    }, function() {
      return 0x002B;
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2424_sign);
  }
  else {
    return (x_2543 === 0x002D);
  }
}
 
 
// monadic lift
export function _mlift2425_pint(neg, i) /* (neg : bool, i : int) -> parse int */  {
  return (neg) ? $std_core._int_negate(i) : i;
}
 
 
// monadic lift
export function _mlift2426_pint(c0) /* (c0 : char) -> parse int */  {
   
  var neg = (c0 === 0x002D);
   
  var x_2546 = pnat();
   
  function next_2547(i) /* (int) -> parse int */  {
    return (neg) ? $std_core._int_negate(i) : i;
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(next_2547);
  }
  else {
    return next_2547(x_2546);
  }
}
 
export function pint() /* () -> parse int */  {
   
  var x_2550 = _lp__bar__bar__rp_(function() {
      return satisfy_fail("+-", function(slice /* sslice */ ) {
          var _x24 = $std_core.next(slice);
          if (_x24 !== null) {
            if (((("+-")).indexOf(($std_core.string(_x24.value.fst))) >= 0)){
              return $std_core_types.Just($std_core_types._Tuple2_(_x24.value.fst, _x24.value.snd));
            }
          }
          return $std_core_types.Nothing;
        });
    }, function() {
      return 0x002B;
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2426_pint);
  }
  else {
     
    var neg = (x_2550 === 0x002D);
     
    var x0_2553 = pnat();
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(i /* int */ ) {
        return (neg) ? $std_core._int_negate(i) : i;
      });
    }
    else {
      return (neg) ? $std_core._int_negate(x0_2553) : x0_2553;
    }
  }
}
 
export function pstring(s) /* (s : string) -> parse string */  {
  return satisfy_fail(s, function(slice /* sslice */ ) {
      var _x24 = next_match(slice, $std_core.list_6(s));
      if (_x24 !== null) {
        return $std_core_types.Just($std_core_types._Tuple2_(s, _x24.value));
      }
      else {
        return $std_core_types.Nothing;
      }
    });
}
 
export function starts_with(s, p) /* forall<a> (s : string, p : () -> parse a) -> maybe<(a, sslice)> */  {
  var _x25 = parse($std_core.Sslice(s, 0, s.length), p);
  if (_x25._tag === 1) {
    return $std_core_types.Just($std_core_types._Tuple2_(_x25.result, _x25.rest));
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
export function white() /* () -> parse char */  {
  return satisfy_fail("", function(slice /* sslice */ ) {
      var _x26 = $std_core.next(slice);
      if (_x26 !== null) {
        if ($std_core.is_white(_x26.value.fst)){
          return $std_core_types.Just($std_core_types._Tuple2_(_x26.value.fst, _x26.value.snd));
        }
      }
      return $std_core_types.Nothing;
    });
}
 
export function whitespace() /* () -> parse string */  {
   
  var x_2558 = satisfy_fail("", function(slice /* sslice */ ) {
      var _x27 = next_while0(slice, $std_core.is_white, $std_core.Nil);
      if (_x27.fst === null) {
        return $std_core_types.Nothing;
      }
      else {
        return $std_core_types.Just($std_core_types._Tuple2_(_x27.fst, _x27.snd));
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend($std_core.string_2);
  }
  else {
    return $std_core.string_2(x_2558);
  }
}
 
export function whitespace0() /* () -> parse string */  {
  return _lp__bar__bar__rp_(function() {
       
      var x_2560 = satisfy_fail("", function(slice /* sslice */ ) {
          var _x27 = next_while0(slice, $std_core.is_white, $std_core.Nil);
          if (_x27.fst === null) {
            return $std_core_types.Nothing;
          }
          else {
            return $std_core_types.Just($std_core_types._Tuple2_(_x27.fst, _x27.snd));
          }
        });
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend($std_core.string_2);
      }
      else {
        return $std_core.string_2(x_2560);
      }
    }, function() {
      return "";
    });
}