// Koka generated module: "compat", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $stringcompat from './stringcompat.mjs';
 
// externals
/*---------------------------------------------------------------------------
-- Copyright 2012 Microsoft Corporation.
--
-- This is free software; you can redistribute it and/or modify it under the
-- terms of the Apache License, Version 2.0. A copy of the License can be
-- found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/
var onServer = ($std_core.getHost() === "nodejs");
var md5algo;
var stringToUTF8;
if (onServer) {
  stringToUTF8 = function(s) {
    return new Buffer(s,"utf8");
  }
}
else {
  stringToUTF8 = function( s ) {
    var utf8 = []
    for( var i = 0; i < s.length; i++) {
      var c = s.charCodeAt(i);
      if (c <= 0x7F) {
        utf8.push(c);
      }
      else if (c <= 0x07FF) {
        utf8.push( 0xC0 | (c>>>6) );
        utf8.push( 0x80 | (c & 0x3F) );      
      } 
      else if (c <= 0xFFFF) {
        utf8.push( 0xE0 | (c>>>12) );
        utf8.push( 0x80 | ((c>>>6) & 0x3F) );
        utf8.push( 0x80 | (c & 0x3F) );      
      } 
      else if (c <= 0x1FFFFF) {
        utf8.push( 0xF0 | (c>>>18) );
        utf8.push( 0x80 | ((c>>>12) & 0x3F) );
        utf8.push( 0x80 | ((c>>>6) & 0x3F) );
        utf8.push( 0x80 | (c & 0x3F) );      
      } 
      else if (c <= 0x3FFFFFF) {
        utf8.push( 0xF8 | (c>>>24) );
        utf8.push( 0x80 | ((c>>>18) & 0x3F) );
        utf8.push( 0x80 | ((c>>>12) & 0x3F) );
        utf8.push( 0x80 | ((c>>>6) & 0x3F) );
        utf8.push( 0x80 | (c & 0x3F) );      
      } 
      else {
        utf8.push( 0xFC | (c>>>30) & 0x01 );
        utf8.push( 0x80 | ((c>>>24) & 0x3F) );
        utf8.push( 0x80 | ((c>>>18) & 0x3F) );
        utf8.push( 0x80 | ((c>>>12) & 0x3F) );
        utf8.push( 0x80 | ((c>>>6) & 0x3F) );
        utf8.push( 0x80 | (c & 0x3F) );      
      } 
    }
    return utf8;
  }
}
if (onServer) {
  var crypto = require('crypto');
  md5algo = function(s) {
    return crypto.createHash('md5').update(s,"utf8").digest('hex');
  }
}
else {
  md5algo = (function()
  {
    // bytes to big-endian words
    function bytesToWords( bs ) {
      for (var ws = [], i = 0, b = 0; i < bs.length; i++, b += 8)
        ws[b >>> 5] |= bs[i] << (24 - b % 32);
      return ws;
    }
    // big-endian words to a byte array
    function wordsToBytes(ws) {
      for (var bs = [], b = 0; b < ws.length * 32; b += 8)
        bs.push((ws[b >>> 5] >>> (24 - b % 32)) & 0xFF);
      return bs;
    }
    // bytes to a hex string
    function bytesToHex(bs) {
      for (var hex = [], i = 0; i < bs.length; i++) {
        hex.push((bs[i] >>> 4).toString(16));
        hex.push((bs[i] & 0xF).toString(16));
      }
      return hex.join('');
    }
    // swap endianness of a word array
    function wordsSwapEndian( ws ) {
      for (var i = 0; i < ws.length; i++) {
        ws[i] = ((ws[i] <<  8) | (ws[i] >>> 24)) & 0x00FF00FF |
                ((ws[i] << 24) | (ws[i] >>>  8)) & 0xFF00FF00;
      }
      return ws;
    }
    // helpers
    function digest1(a, b, c, d, x, s, t) {
      var n = a + (b & c | ~b & d) + (x >>> 0) + t;
      return ((n << s) | (n >>> (32 - s))) + b;
    };
    function digest2(a, b, c, d, x, s, t) {
      var n = a + (b & d | c & ~d) + (x >>> 0) + t;
      return ((n << s) | (n >>> (32 - s))) + b;
    };
    function digest3(a, b, c, d, x, s, t) {
      var n = a + (b ^ c ^ d) + (x >>> 0) + t;
      return ((n << s) | (n >>> (32 - s))) + b;
    };
    function digest4(a, b, c, d, x, s, t) {
      var n = a + (c ^ (b | ~d)) + (x >>> 0) + t;
      return ((n << s) | (n >>> (32 - s))) + b;
    };
    
    var md5digest = function(input) 
    {    
      var msg = stringToUTF8(input);
      var m = wordsSwapEndian(bytesToWords(msg)),
          l = msg.length * 8,
          a =  1732584193,
          b = -271733879,
          c = -1732584194,
          d =  271733878;
      m[l >>> 5] |= 0x80 << (l % 32);
      m[(((l + 64) >>> 9) << 4) + 14] = l;
      for (var i = 0; i < m.length; i += 16) 
      {
        var a0 = a, b0 = b, c0 = c, d0 = d;
        a = digest1(a, b, c, d, m[i+ 0],  7, -680876936);
        d = digest1(d, a, b, c, m[i+ 1], 12, -389564586);
        c = digest1(c, d, a, b, m[i+ 2], 17,  606105819);
        b = digest1(b, c, d, a, m[i+ 3], 22, -1044525330);
        a = digest1(a, b, c, d, m[i+ 4],  7, -176418897);
        d = digest1(d, a, b, c, m[i+ 5], 12,  1200080426);
        c = digest1(c, d, a, b, m[i+ 6], 17, -1473231341);
        b = digest1(b, c, d, a, m[i+ 7], 22, -45705983);
        a = digest1(a, b, c, d, m[i+ 8],  7,  1770035416);
        d = digest1(d, a, b, c, m[i+ 9], 12, -1958414417);
        c = digest1(c, d, a, b, m[i+10], 17, -42063);
        b = digest1(b, c, d, a, m[i+11], 22, -1990404162);
        a = digest1(a, b, c, d, m[i+12],  7,  1804603682);
        d = digest1(d, a, b, c, m[i+13], 12, -40341101);
        c = digest1(c, d, a, b, m[i+14], 17, -1502002290);
        b = digest1(b, c, d, a, m[i+15], 22,  1236535329);
        a = digest2(a, b, c, d, m[i+ 1],  5, -165796510);
        d = digest2(d, a, b, c, m[i+ 6],  9, -1069501632);
        c = digest2(c, d, a, b, m[i+11], 14,  643717713);
        b = digest2(b, c, d, a, m[i+ 0], 20, -373897302);
        a = digest2(a, b, c, d, m[i+ 5],  5, -701558691);
        d = digest2(d, a, b, c, m[i+10],  9,  38016083);
        c = digest2(c, d, a, b, m[i+15], 14, -660478335);
        b = digest2(b, c, d, a, m[i+ 4], 20, -405537848);
        a = digest2(a, b, c, d, m[i+ 9],  5,  568446438);
        d = digest2(d, a, b, c, m[i+14],  9, -1019803690);
        c = digest2(c, d, a, b, m[i+ 3], 14, -187363961);
        b = digest2(b, c, d, a, m[i+ 8], 20,  1163531501);
        a = digest2(a, b, c, d, m[i+13],  5, -1444681467);
        d = digest2(d, a, b, c, m[i+ 2],  9, -51403784);
        c = digest2(c, d, a, b, m[i+ 7], 14,  1735328473);
        b = digest2(b, c, d, a, m[i+12], 20, -1926607734);
        a = digest3(a, b, c, d, m[i+ 5],  4, -378558);
        d = digest3(d, a, b, c, m[i+ 8], 11, -2022574463);
        c = digest3(c, d, a, b, m[i+11], 16,  1839030562);
        b = digest3(b, c, d, a, m[i+14], 23, -35309556);
        a = digest3(a, b, c, d, m[i+ 1],  4, -1530992060);
        d = digest3(d, a, b, c, m[i+ 4], 11,  1272893353);
        c = digest3(c, d, a, b, m[i+ 7], 16, -155497632);
        b = digest3(b, c, d, a, m[i+10], 23, -1094730640);
        a = digest3(a, b, c, d, m[i+13],  4,  681279174);
        d = digest3(d, a, b, c, m[i+ 0], 11, -358537222);
        c = digest3(c, d, a, b, m[i+ 3], 16, -722521979);
        b = digest3(b, c, d, a, m[i+ 6], 23,  76029189);
        a = digest3(a, b, c, d, m[i+ 9],  4, -640364487);
        d = digest3(d, a, b, c, m[i+12], 11, -421815835);
        c = digest3(c, d, a, b, m[i+15], 16,  530742520);
        b = digest3(b, c, d, a, m[i+ 2], 23, -995338651);
        a = digest4(a, b, c, d, m[i+ 0],  6, -198630844);
        d = digest4(d, a, b, c, m[i+ 7], 10,  1126891415);
        c = digest4(c, d, a, b, m[i+14], 15, -1416354905);
        b = digest4(b, c, d, a, m[i+ 5], 21, -57434055);
        a = digest4(a, b, c, d, m[i+12],  6,  1700485571);
        d = digest4(d, a, b, c, m[i+ 3], 10, -1894986606);
        c = digest4(c, d, a, b, m[i+10], 15, -1051523);
        b = digest4(b, c, d, a, m[i+ 1], 21, -2054922799);
        a = digest4(a, b, c, d, m[i+ 8],  6,  1873313359);
        d = digest4(d, a, b, c, m[i+15], 10, -30611744);
        c = digest4(c, d, a, b, m[i+ 6], 15, -1560198380);
        b = digest4(b, c, d, a, m[i+13], 21,  1309151649);
        a = digest4(a, b, c, d, m[i+ 4],  6, -145523070);
        d = digest4(d, a, b, c, m[i+11], 10, -1120210379);
        c = digest4(c, d, a, b, m[i+ 2], 15,  718787259);
        b = digest4(b, c, d, a, m[i+ 9], 21, -343485551);
        a = (a + a0) | 0;
        b = (b + b0) | 0;
        c = (c + c0) | 0;
        d = (d + d0) | 0;
      }
      return wordsSwapEndian([a,b,c,d]);
    };
    return function( input ) {
      return bytesToHex(wordsToBytes(md5digest(input)));
    };
  })();
}
function $md5( s ) {
  var res = md5algo(s);
  //console.log("md5(" + s + ") = " + res );
  return res;
}
 
// type declarations
// type date
 
// declarations
 
 
/*
  returns the length of a string
*/
export function length(s) /* (s : string) -> int */  {
  return $std_core.count_1(s);
}
 
 
/*
  from core.kk
*/
export function makeString(n, c) /* (n : int, c : char) -> string */  {
  return Array(n + 1).join(c);
}
 
 
// Catch an exception raised by "error" and handle it.
// Use "onExn" or "onFail" when appropiate.
export function catch__old(action, hndl) /* forall<e,a> (action : () -> <exn|e> a, hndl : (exception) -> e a) -> e a */  {
  return $primcatch(action,hndl);
}
 
 
// Does string `s`  contain the character `c`  ?
export function contains(s, c) /* (s : string, c : char) -> bool */  {
  return ((s).indexOf(c) >= 0);
}
 
 
// Get the day of the month, starting at 1
export function day(d) /* (d : date) -> int */  {
  return d.getDate();
}
 
 
// monadic lift
export function _mlift3788_dropWhile(_y_3737) /* forall<a,e> ((list<a>, list<a>)) -> e list<a> */  {
  return _y_3737.snd;
}
 
export function dropWhile(xs, predicate) /* forall<a,e> (xs : list<a>, predicate : (a) -> e bool) -> e list<a> */  {
   
  var x_3798 = $std_core.span(xs, predicate);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_3737 /* (list<366>, list<366>) */ ) {
      return _y_3737.snd;
    });
  }
  else {
    return x_3798.snd;
  }
}
 
 
/*
  endsWith function from core.kk
*/
export function endsWith(s, post) /* (s : string, post : string) -> bool */  {
  return ((s).indexOf(post, (s).length - (post).length) !== -1);
}
 
 
// Raise an exception with a specified message.
export function error(_arg1) /* forall<a> (string) -> exn a */  {
  return $error(_arg1);
}
 
 
// Returns "true" if the integer `i`  is an even number.
export function even(i) /* (i : int) -> bool */  {
  return $std_core._int_eq(($std_core._int_mod(i,2)),0);
}
 
 
/*
  Return the extension (including the `.`)  
  `extname("foo.ext") == ".ext"`, `extname("bla.") == "."`, `extname("bla") == ""` 
  from path.kk
*/
export function extname(p) /* (p : string) -> string */  {
  return path.extname(p);
}
 
export function floor(d) /* (d : float64) -> float64 */  {
  return Math.floor(d);
}
 
 
// Fold a list from the right, i.e. `foldr([1,2],0,(+)) == 1+(2+0)` 
// Note, "foldr" is less efficient than "foldl" as it reverses the list first.
export function foldr(xs, z, f) /* forall<a,b,e> (xs : list<a>, z : b, f : (a, b) -> e b) -> e b */  {
  return $std_core.foldl($std_core.reverse(xs), z, function(x /* 431 */ , y /* 435 */ ) {
      return f(y, x);
    });
}
 
 
/*
  helper function for showHex from core.kk
*/
export function gformat(value, format) /* forall<a> (value : a, format : string) -> string */  {
  return $gformat(value, format);
}
 
export function hours(_arg1) /* (date) -> int */  {
  return _arg1.getHours();
}
 
export function isNothing(x) /* forall<a> (x : maybe<a>) -> bool */  {
  return (x === null);
}
 
 
// Return an ISO 8601 date-time string.
// See <http://en.wikipedia.org/wiki/ISO_8601>
export function isoDateTime(_arg1) /* (date) -> string */  {
  return _arg1.toISOString();
}
 
export function substr2(s, start, len) /* (s : string, start : int, len : int) -> string */  {
  return s.substr(start, len);
}
 
 
// Get the month, starting at 1
export function month(d) /* (d : date) -> int */  {
  return d.getMonth()+1;
}
 
export function show(exn) /* (exn : exception) -> string */  {
  return (exn ? exn.toString() : 'unknown exception');
}
 
 
// Get the year
export function year(d) /* (d : date) -> int */  {
  return d.getFullYear();
}
 
export function minutes(_arg1) /* (date) -> int */  {
  return _arg1.getMinutes();
}
 
export function seconds(_arg1) /* (date) -> int */  {
  return _arg1.getSeconds();
}
 
export function isWhite(c) /* (c : char) -> bool */  {
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
 
 
// Does string `s`  contain the character `c`  ?
export function lastIndexOf(s, c) /* (s : string, c : char) -> int */  {
  return ((s).lastIndexOf(c));
}
 
 
// Does string `s`  contain the string `sub`  ?
export function lastIndexOf_1(s, sub) /* (s : string, sub : string) -> int */  {
  return ((s).lastIndexOf(sub));
}
 
export var maxInt;
var maxInt = 2147483647;
 
export var maxListStack;
var maxListStack = 200;
 
export function mbstring(ms) /* (ms : maybe<string>) -> string */  {
  return (ms === null) ? "" : ms.value;
}
 
 
// Compute an md5 hash of a string.
export function md5(s) /* (s : string) -> string */  {
  return $md5(s);
}
 
export function now() /* () -> ndet date */  {
  return new Date();
}
 
 
// Returns "true" if the integer `i`  is an odd number.
export function odd(i) /* (i : int) -> bool */  {
  return $std_core._int_ne(($std_core._int_mod(i,2)),0);
}
 
 
// Return a default value when an exception is raised
export function onExn(value, action) /* forall<a,e> (value : a, action : () -> <exn|e> a) -> e a */  {
  return $std_core.$try(action, function(___wildcard__199__22 /* exception */ ) {
      return value;
    });
}
 
export var redirect;
var redirect = { value: ($std_core_types.Nothing) };
 
export function replaceAll(s, pattern, repl) /* (s : string, pattern : string, repl : string) -> string */  {
  return (s).replace(new RegExp((pattern).replace(/[\\\$\^*+\-{}?().]/g,'\\$&'),'g'),repl);
}
 
 
/*
  startsWith function from core.kk
*/
export function startsWith(s, pre) /* (s : string, pre : string) -> bool */  {
  return s.substr(0,pre.length) === pre;
}
 
 
/*
  substring functions operating in csharp and js
  all from core.kk
*/
export function substr1(s, start) /* (s : string, start : int) -> string */  {
  return ((s).substr(start >=1 ? start : 1));
}
 
 
// Number of milliseconds since 1 January 1970 00:00:00 UTC.
export function time(_arg1) /* (date) -> int */  {
  return _arg1.getTime();
}
 
 
/*
  to lowercase funtion from core.kk
*/
export function toLower(s) /* (s : string) -> string */  {
  return (s).toLowerCase();
}
 
 
// Trim the starting white space of a string
export function trimLeft(s) /* (s : string) -> string */  {
  return ((s).replace(/^\s\s*/,''));
}
 
 
// Trim the ending white space of a string.
export function trimRight(s) /* (s : string) -> string */  {
  return ((s).replace(/\s+$/,''));
}
 
 
/*
  Construct a string of `n`  characters `c`  (or the empty string if `n <= 0` )
  from core.kk
*/
export function string(n, c) /* (n : int, c : char) -> string */  {
  if ($std_core._int_le(n,0)) {
    return "";
  }
  else {
    return makeString(n, c);
  }
}
 
 
/*
  Right-align a string to width `width`  using `char`  (default is a space) to fill from the left.
  from core.kk
*/
export function align(s, width, char) /* (s : string, width : int, char : optional<char>) -> string */  {
   
  var n = $std_core.count_1(s);
  if ($std_core._int_ge(n,width)) {
    return s;
  }
  else {
     
    var n0_3569 = $std_core._int_sub(width,n);
     
    if ($std_core._int_le(n0_3569,0)) {
      var left_3567 = "";
    }
    else {
      var _x0 = (char !== undefined) ? char : 0x0020;
      var left_3567 = makeString(n0_3569, _x0);
    }
    return $std_core._lp__plus__plus__1_rp_(left_3567, s);
  }
}
 
 
// monadic lift
export function _mlift3789_concat(_y_3742) /* forall<a,e> (list<list<a>>) -> e list<a> */  {
  return $std_core.concat(_y_3742);
}
 
 
// Concatenate the result lists from applying a function to all elements
export function concat(xs, f) /* forall<a,b,e> (xs : list<a>, f : (a) -> e list<b>) -> e list<b> */  {
   
  var x_3804 = $std_core.map_5(xs, f);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_3742 /* list<list<1035>> */ ) {
      return $std_core.concat(_y_3742);
    });
  }
  else {
    return $std_core.concat(x_3804);
  }
}
 
export function fill(s, width, char) /* (s : string, width : int, char : optional<char>) -> string */  {
   
  var n = $std_core.count_1(s);
  if ($std_core._int_ge(n,width)) {
    return s;
  }
  else {
     
    var n0_3576 = $std_core._int_sub(width,n);
     
    if ($std_core._int_le(n0_3576,0)) {
      var right_3575 = "";
    }
    else {
      var _x0 = (char !== undefined) ? char : 0x0020;
      var right_3575 = makeString(n0_3576, _x0);
    }
    return $std_core._lp__plus__plus__1_rp_(s, right_3575);
  }
}
 
 
// monadic lift
export function _mlift3790_op(_acc, pred, xx, _y_3743) /* forall<a,b,e> (ctail<list<b>>, pred : (a) -> e maybe<b>, xx : list<a>, maybe<b>) -> e list<b> */  {
  if (_y_3743 === null) {
    return _ctail_filterMap(xx, pred, _acc);
  }
  else {
     
    var _ctail_3726 = undefined;
     
    var _ctail_3727 = $std_core.Cons(_y_3743.value, _ctail_3726);
    return _ctail_filterMap(xx, pred, $std_core_types._ctail_link(_acc,_ctail_3727,({value: _ctail_3727, field: "tail"})));
  }
}
 
 
// monadic lift
export function _mlift3791_op(_accm, pred0, xx0, _y_3748) /* forall<a,b,e> ((list<b>) -> list<b>, pred : (a) -> e maybe<b>, xx : list<a>, maybe<b>) -> e list<b> */  {
  if (_y_3748 === null) {
    return _ctailm_filterMap(xx0, pred0, _accm);
  }
  else {
    return _ctailm_filterMap(xx0, pred0, function(_ctail_3729 /* list<1165> */ ) {
        return _accm($std_core.Cons(_y_3748.value, _ctail_3729));
      });
  }
}
 
export function _ctail_filterMap(xs, pred1, _acc0) /* forall<a,b,e> (xs : list<a>, pred : (a) -> e maybe<b>, ctail<list<b>>) -> e list<b> */  { tailcall: while(1)
{
  if (xs === null) {
    return $std_core_types._ctail_resolve(_acc0,($std_core.Nil));
  }
  else {
     
    var x0_3808 = pred1(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_37430 /* maybe<1165> */ ) {
        return _mlift3790_op(_acc0, pred1, xs.tail, _y_37430);
      });
    }
    else {
      if (x0_3808 === null) {
        {
          // tail call
          xs = xs.tail;
          continue tailcall;
        }
      }
      else {
         
        var _ctail_37260 = undefined;
         
        var _ctail_37270 = $std_core.Cons(x0_3808.value, _ctail_37260);
        {
          // tail call
          var _x0 = $std_core_types._ctail_link(_acc0,_ctail_37270,({value: _ctail_37270, field: "tail"}));
          xs = xs.tail;
          _acc0 = _x0;
          continue tailcall;
        }
      }
    }
  }
}}
 
export function _ctailm_filterMap(xs0, pred2, _accm0) /* forall<a,b,e> (xs : list<a>, pred : (a) -> e maybe<b>, (list<b>) -> list<b>) -> e list<b> */  { tailcall: while(1)
{
  if (xs0 === null) {
    return _accm0($std_core.Nil);
  }
  else {
     
    var x2_3811 = pred2(xs0.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_37480 /* maybe<1165> */ ) {
        return _mlift3791_op(_accm0, pred2, xs0.tail, _y_37480);
      });
    }
    else {
      if (x2_3811 === null) {
        {
          // tail call
          xs0 = xs0.tail;
          continue tailcall;
        }
      }
      else {
        {
          // tail call
          var _x3 = function(__dot_accm01 /* (list<1165>) -> list<1165> */ , _y22 /* 1165 */ ) {
            return function(_ctail_37290 /* list<1165> */ ) {
              return __dot_accm01($std_core.Cons(_y22, _ctail_37290));
            };
          }(_accm0, x2_3811.value);
          xs0 = xs0.tail;
          _accm0 = _x3;
          continue tailcall;
        }
      }
    }
  }
}}
 
export function filterMap(xs1, pred3) /* forall<a,b,e> (xs : list<a>, pred : (a) -> e maybe<b>) -> e list<b> */  {
  var _x4 = $std_core_hnd._evv_is_affine();
  if (_x4) {
    return _ctail_filterMap(xs1, pred3, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_filterMap(xs1, pred3, function(_ctail_3728 /* list<1165> */ ) {
        return _ctail_3728;
      });
  }
}
 
 
// monadic lift
export function _mlift3792_foreachUntil(action, xx, _y_3756) /* forall<a,b,e> (action : (a) -> e maybe<b>, xx : list<a>, maybe<b>) -> e maybe<b> */  {
  if (_y_3756 === null) {
    return foreachUntil(xx, action);
  }
  else {
    return _y_3756;
  }
}
 
 
// Invoke "action" for each element of a list while "action" return "Nothing"
export function foreachUntil(xs, action0) /* forall<a,b,e> (xs : list<a>, action : (a) -> e maybe<b>) -> e maybe<b> */  { tailcall: while(1)
{
  if (xs === null) {
    return $std_core_types.Nothing;
  }
  else {
     
    var x0_3814 = action0(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_37560 /* maybe<1200> */ ) {
        return _mlift3792_foreachUntil(action0, xs.tail, _y_37560);
      });
    }
    else {
      if (x0_3814 === null) {
        {
          // tail call
          xs = xs.tail;
          continue tailcall;
        }
      }
      else {
        return x0_3814;
      }
    }
  }
}}
 
export function indexOfAcc(xs, pred, idx) /* forall<a> (xs : list<a>, pred : (a) -> bool, idx : int) -> int */  { tailcall: while(1)
{
  if (xs === null) {
    return $std_core._int_sub(0,1);
  }
  else {
    var _x5 = pred(xs.head);
    if (_x5) {
      return idx;
    }
    else {
      {
        // tail call
        var _x6 = $std_core._int_add(idx,1);
        xs = xs.tail;
        idx = _x6;
        continue tailcall;
      }
    }
  }
}}
 
 
// Does string `s`  contain the character `c`  ?
export function indexOf(s, c) /* (s : string, c : char) -> int */  {
  return ((s).indexOf(c));
}
 
 
// Does string `s`  contain the string `sub`  ?
export function indexOf_1(s, sub) /* (s : string, sub : string) -> int */  {
  return ((s).indexOf(sub));
}
 
 
// Returns the index of the first element where "pred" holds, or "-1" if no such element exists.
export function indexOf_2(xs, pred) /* forall<a> (xs : list<a>, pred : (a) -> bool) -> int */  {
  return indexOfAcc(xs, pred, 0);
}
 
export function substr(s, start) /* (s : string, start : int) -> string */  {
  return ((s).substr(start));
}
 
export function substr_1(s, start, len) /* (s : string, start : int, len : int) -> string */  {
  if ($std_core._int_le(len,0)) {
    return "";
  }
  else {
    return substr2(s, start, len);
  }
}
 
 
// Return the date portion of an ISO date/time string.
export function isoDate(d) /* (d : date) -> string */  {
   
  var s = isoDateTime(d);
   
  var i = indexOf_1(s, "T");
  if ($std_core._int_ge(i,0)) {
    if ($std_core._int_le(i,0)) {
      return "";
    }
    else {
      return substr2(s, 0, i);
    }
  }
  else {
    return s;
  }
}
 
export function show2(i) /* (i : int) -> string */  {
  return align($std_core.show(i), 2, 0x0030);
}
 
 
// return the ISO date in local time
export function isoLocalDate(d) /* (d : date) -> string */  {
   
  var left2_3593 = $std_core.show(year(d));
   
  var left1_3591 = $std_core._lp__plus__plus__1_rp_(left2_3593, "-");
   
  var i_3595 = month(d);
   
  var right1_3592 = align($std_core.show(i_3595), 2, 0x0030);
   
  var left0_3589 = $std_core._lp__plus__plus__1_rp_(left1_3591, right1_3592);
   
  var left_3587 = $std_core._lp__plus__plus__1_rp_(left0_3589, "-");
   
  var i0_3596 = day(d);
   
  var right_3588 = align($std_core.show(i0_3596), 2, 0x0030);
  return $std_core._lp__plus__plus__1_rp_(left_3587, right_3588);
}
 
 
// return the ISO time in local time
export function isoLocalTime(d) /* (d : date) -> string */  {
   
  var i_3605 = hours(d);
   
  var left2_3603 = align($std_core.show(i_3605), 2, 0x0030);
   
  var left1_3601 = $std_core._lp__plus__plus__1_rp_(left2_3603, ":");
   
  var i0_3606 = minutes(d);
   
  var right1_3602 = align($std_core.show(i0_3606), 2, 0x0030);
   
  var left0_3599 = $std_core._lp__plus__plus__1_rp_(left1_3601, right1_3602);
   
  var left_3597 = $std_core._lp__plus__plus__1_rp_(left0_3599, ":");
   
  var i1_3607 = seconds(d);
   
  var right_3598 = align($std_core.show(i1_3607), 2, 0x0030);
  return $std_core._lp__plus__plus__1_rp_(left_3597, right_3598);
}
 
 
// Return the time portion of an ISO date/time string.
export function isoTime(d) /* (d : date) -> string */  {
   
  var s = isoDateTime(d);
   
  var i = indexOf_1(s, "T");
  if ($std_core._int_ge(i,0)) {
    return substr(s, i);
  }
  else {
    return s;
  }
}
 
 
// Parse digits in a "base" between 2 and 36 (default 10) given an initial value "acc" (default 0)
// Returns "acc" on the empty string, and "Nothing" if an invalid digit is encountered.
export function parseDigits(cs, base, acc) /* (cs : list<char>, base : optional<int>, acc : optional<int>) -> maybe<int> */  {
   
  var _base_2298 = (base !== undefined) ? base : 10;
  if (cs === null) {
    var _x7 = (acc !== undefined) ? acc : 0;
    return $std_core_types.Just(_x7);
  }
  else {
     
    var _cont_3559 = function(_x_3560 /* int */ ) {
       
      var _x8 = (acc !== undefined) ? acc : 0;
      var x_3608 = $std_core._int_mul(_base_2298,_x8);
      return parseDigits(cs.tail, _base_2298, $std_core._int_add(x_3608,_x_3560));
    };
    if (((cs.head) >= 0x0030)) {
      if ($std_core._int_ge(_base_2298,10)) {
        var _x9 = 0x0039;
      }
      else {
         
        var d_3611 = (($std_core._int_sub(_base_2298,1)));
         
        var x_16954 = 0x0030;
         
        var y_16955 = d_3611;
        var _x9 = (($std_core._int_add(x_16954,y_16955)));
      }
      var _x8 = ((cs.head) <= _x9);
      if (_x8) {
         
        var x_16956 = (cs.head);
         
        var y_16957 = 0x0030;
        return _cont_3559(((($std_core._int_sub(x_16956,y_16957)))));
      }
      else {
        if ($std_core._int_gt(_base_2298,10)) {
          if ($std_core._int_le(_base_2298,36)) {
            if (((cs.head) >= 0x0061)) {
               
              var d1_3617 = (($std_core._int_sub(_base_2298,11)));
               
              var x_169540 = 0x0061;
               
              var y_169550 = d1_3617;
              var _x10 = ((cs.head) <= ((($std_core._int_add(x_169540,y_169550)))));
              if (_x10) {
                 
                var x_169560 = (cs.head);
                 
                var y_169570 = 0x0061;
                 
                var x2_3620 = ((($std_core._int_sub(x_169560,y_169570))));
                 
                var _x_3715_3558 = $std_core._int_add(x2_3620,10);
                return _cont_3559(_x_3715_3558);
              }
              else {
                if ($std_core._int_gt(_base_2298,10)) {
                  if ($std_core._int_le(_base_2298,36)) {
                    if (((cs.head) >= 0x0041)) {
                       
                      var d3_3625 = (($std_core._int_sub(_base_2298,11)));
                       
                      var x_169541 = 0x0041;
                       
                      var y_169551 = d3_3625;
                      var _x11 = ((cs.head) <= ((($std_core._int_add(x_169541,y_169551)))));
                      if (_x11) {
                         
                        var x_169561 = (cs.head);
                         
                        var y_169571 = 0x0041;
                         
                        var x4_3628 = ((($std_core._int_sub(x_169561,y_169571))));
                         
                        var _x_3716_3558 = $std_core._int_add(x4_3628,10);
                        return _cont_3559(_x_3716_3558);
                      }
                      else {
                        return $std_core_types.Nothing;
                      }
                    }
                    else {
                      return $std_core_types.Nothing;
                    }
                  }
                  else {
                    return $std_core_types.Nothing;
                  }
                }
                else {
                  return $std_core_types.Nothing;
                }
              }
            }
            else {
              if ($std_core._int_gt(_base_2298,10)) {
                if ($std_core._int_le(_base_2298,36)) {
                  if (((cs.head) >= 0x0041)) {
                     
                    var d5_3633 = (($std_core._int_sub(_base_2298,11)));
                     
                    var x_169542 = 0x0041;
                     
                    var y_169552 = d5_3633;
                    var _x12 = ((cs.head) <= ((($std_core._int_add(x_169542,y_169552)))));
                    if (_x12) {
                       
                      var x_169562 = (cs.head);
                       
                      var y_169572 = 0x0041;
                       
                      var x6_3636 = ((($std_core._int_sub(x_169562,y_169572))));
                       
                      var _x_3717_3558 = $std_core._int_add(x6_3636,10);
                      return _cont_3559(_x_3717_3558);
                    }
                    else {
                      return $std_core_types.Nothing;
                    }
                  }
                  else {
                    return $std_core_types.Nothing;
                  }
                }
                else {
                  return $std_core_types.Nothing;
                }
              }
              else {
                return $std_core_types.Nothing;
              }
            }
          }
          else {
            if ($std_core._int_gt(_base_2298,10)) {
              if ($std_core._int_le(_base_2298,36)) {
                if (((cs.head) >= 0x0041)) {
                   
                  var d7_3641 = (($std_core._int_sub(_base_2298,11)));
                   
                  var x_169543 = 0x0041;
                   
                  var y_169553 = d7_3641;
                  var _x13 = ((cs.head) <= ((($std_core._int_add(x_169543,y_169553)))));
                  if (_x13) {
                     
                    var x_169563 = (cs.head);
                     
                    var y_169573 = 0x0041;
                     
                    var x8_3644 = ((($std_core._int_sub(x_169563,y_169573))));
                     
                    var _x_3718_3558 = $std_core._int_add(x8_3644,10);
                    return _cont_3559(_x_3718_3558);
                  }
                  else {
                    return $std_core_types.Nothing;
                  }
                }
                else {
                  return $std_core_types.Nothing;
                }
              }
              else {
                return $std_core_types.Nothing;
              }
            }
            else {
              return $std_core_types.Nothing;
            }
          }
        }
        else {
          if ($std_core._int_gt(_base_2298,10)) {
            if ($std_core._int_le(_base_2298,36)) {
              if (((cs.head) >= 0x0041)) {
                 
                var d9_3649 = (($std_core._int_sub(_base_2298,11)));
                 
                var x_169544 = 0x0041;
                 
                var y_169554 = d9_3649;
                var _x14 = ((cs.head) <= ((($std_core._int_add(x_169544,y_169554)))));
                if (_x14) {
                   
                  var x_169564 = (cs.head);
                   
                  var y_169574 = 0x0041;
                   
                  var x10_3652 = ((($std_core._int_sub(x_169564,y_169574))));
                   
                  var _x_3719_3558 = $std_core._int_add(x10_3652,10);
                  return _cont_3559(_x_3719_3558);
                }
                else {
                  return $std_core_types.Nothing;
                }
              }
              else {
                return $std_core_types.Nothing;
              }
            }
            else {
              return $std_core_types.Nothing;
            }
          }
          else {
            return $std_core_types.Nothing;
          }
        }
      }
    }
    else {
      if ($std_core._int_gt(_base_2298,10)) {
        if ($std_core._int_le(_base_2298,36)) {
          if (((cs.head) >= 0x0061)) {
             
            var d11_3657 = (($std_core._int_sub(_base_2298,11)));
             
            var x_169545 = 0x0061;
             
            var y_169555 = d11_3657;
            var _x15 = ((cs.head) <= ((($std_core._int_add(x_169545,y_169555)))));
            if (_x15) {
               
              var x_169565 = (cs.head);
               
              var y_169575 = 0x0061;
               
              var x12_3660 = ((($std_core._int_sub(x_169565,y_169575))));
               
              var _x_3720_35580 = $std_core._int_add(x12_3660,10);
              return _cont_3559(_x_3720_35580);
            }
            else {
              if ($std_core._int_gt(_base_2298,10)) {
                if ($std_core._int_le(_base_2298,36)) {
                  if (((cs.head) >= 0x0041)) {
                     
                    var d13_3665 = (($std_core._int_sub(_base_2298,11)));
                     
                    var x_169546 = 0x0041;
                     
                    var y_169556 = d13_3665;
                    var _x16 = ((cs.head) <= ((($std_core._int_add(x_169546,y_169556)))));
                    if (_x16) {
                       
                      var x_169566 = (cs.head);
                       
                      var y_169576 = 0x0041;
                       
                      var x14_3668 = ((($std_core._int_sub(x_169566,y_169576))));
                       
                      var _x_3721_35580 = $std_core._int_add(x14_3668,10);
                      return _cont_3559(_x_3721_35580);
                    }
                    else {
                      return $std_core_types.Nothing;
                    }
                  }
                  else {
                    return $std_core_types.Nothing;
                  }
                }
                else {
                  return $std_core_types.Nothing;
                }
              }
              else {
                return $std_core_types.Nothing;
              }
            }
          }
          else {
            if ($std_core._int_gt(_base_2298,10)) {
              if ($std_core._int_le(_base_2298,36)) {
                if (((cs.head) >= 0x0041)) {
                   
                  var d15_3673 = (($std_core._int_sub(_base_2298,11)));
                   
                  var x_169547 = 0x0041;
                   
                  var y_169557 = d15_3673;
                  var _x17 = ((cs.head) <= ((($std_core._int_add(x_169547,y_169557)))));
                  if (_x17) {
                     
                    var x_169567 = (cs.head);
                     
                    var y_169577 = 0x0041;
                     
                    var x16_3676 = ((($std_core._int_sub(x_169567,y_169577))));
                     
                    var _x_3722_35580 = $std_core._int_add(x16_3676,10);
                    return _cont_3559(_x_3722_35580);
                  }
                  else {
                    return $std_core_types.Nothing;
                  }
                }
                else {
                  return $std_core_types.Nothing;
                }
              }
              else {
                return $std_core_types.Nothing;
              }
            }
            else {
              return $std_core_types.Nothing;
            }
          }
        }
        else {
          if ($std_core._int_gt(_base_2298,10)) {
            if ($std_core._int_le(_base_2298,36)) {
              if (((cs.head) >= 0x0041)) {
                 
                var d17_3681 = (($std_core._int_sub(_base_2298,11)));
                 
                var x_169548 = 0x0041;
                 
                var y_169558 = d17_3681;
                var _x18 = ((cs.head) <= ((($std_core._int_add(x_169548,y_169558)))));
                if (_x18) {
                   
                  var x_169568 = (cs.head);
                   
                  var y_169578 = 0x0041;
                   
                  var x18_3684 = ((($std_core._int_sub(x_169568,y_169578))));
                   
                  var _x_3723_35580 = $std_core._int_add(x18_3684,10);
                  return _cont_3559(_x_3723_35580);
                }
                else {
                  return $std_core_types.Nothing;
                }
              }
              else {
                return $std_core_types.Nothing;
              }
            }
            else {
              return $std_core_types.Nothing;
            }
          }
          else {
            return $std_core_types.Nothing;
          }
        }
      }
      else {
        if ($std_core._int_gt(_base_2298,10)) {
          if ($std_core._int_le(_base_2298,36)) {
            if (((cs.head) >= 0x0041)) {
               
              var d19_3689 = (($std_core._int_sub(_base_2298,11)));
               
              var x_169549 = 0x0041;
               
              var y_169559 = d19_3689;
              var _x19 = ((cs.head) <= ((($std_core._int_add(x_169549,y_169559)))));
              if (_x19) {
                 
                var x_169569 = (cs.head);
                 
                var y_169579 = 0x0041;
                 
                var x20_3692 = ((($std_core._int_sub(x_169569,y_169579))));
                 
                var _x_3724_35580 = $std_core._int_add(x20_3692,10);
                return _cont_3559(_x_3724_35580);
              }
              else {
                return $std_core_types.Nothing;
              }
            }
            else {
              return $std_core_types.Nothing;
            }
          }
          else {
            return $std_core_types.Nothing;
          }
        }
        else {
          return $std_core_types.Nothing;
        }
      }
    }
  }
}
 
export function parsePosInt(s, base) /* (s : list<char>, base : optional<int>) -> maybe<int> */  {
  if (s !== null && s.tail !== null) {
    if (((s.head) === 0x0030)) {
      var _x20 = (((s.tail.head) === 0x0078)) ? true : ((s.tail.head) === 0x0058);
    }
    else {
      var _x20 = false;
    }
    if (_x20){
      return parseDigits(s.tail.tail, 16);
    }
  }
  var _x21 = (base !== undefined) ? base : 10;
  return parseDigits(s, _x21);
}
 
export function parseInt(s, hex) /* (s : string, hex : optional<bool>) -> maybe<int> */  {
   
  var xs_3696 = $std_core.list_6(s);
   
  var _this_3725 = $std_core.span(xs_3696, isWhite);
  if (_this_3725.snd === null) {
    return $std_core_types.Just(0);
  }
  if (_this_3725.snd !== null) {
    if (((_this_3725.snd.head) === 0x002D)){
      if (hex !== undefined) {
        var _x23 = (hex) ? 16 : 10;
      }
      else {
        var _x23 = 10;
      }
      var _x22 = parsePosInt(_this_3725.snd.tail, _x23);
      if (_x22 === null) {
        return $std_core_types.Nothing;
      }
      else {
        return $std_core_types.Just($std_core._int_sub(0,(_x22.value)));
      }
    }
  }
  if (hex !== undefined) {
    var _x24 = (hex) ? 16 : 10;
  }
  else {
    var _x24 = 10;
  }
  return parsePosInt(_this_3725.snd, _x24);
}
 
export function parseFixed(s) /* (s : string) -> maybe<float64> */  {
   
  var v_17123 = (s).split(("."), 2);
  var _x25 = $std_core.vlist(v_17123);
  if (_x25 !== null && _x25.tail !== null && _x25.tail.tail === null) {
    var _x26 = parseInt(_x25.head);
    if (_x26 === null) {
      return $std_core_types.Nothing;
    }
    else {
      var _x27 = parseInt(_x25.tail.head);
      if (_x27 === null) {
        return $std_core_types.Nothing;
      }
      else {
        if ($std_core._int_lt((_x27.value),0)) {
          return $std_core_types.Nothing;
        }
        else {
          if ($std_core._int_eq((_x27.value),0)) {
            return $std_core_types.Just($std_core._int_to_double((_x26.value)));
          }
          else {
            return $std_core_types.Just((($std_core._int_to_double((_x26.value))) + (((Math.pow((10.0),($std_core._int_to_double(($std_core.count_1(_x25.tail.head)))))) / ($std_core._int_to_double((_x27.value)))))));
          }
        }
      }
    }
  }
  else {
    var _x28 = parseInt(s);
    if (_x28 === null) {
      return $std_core_types.Nothing;
    }
    else {
      return $std_core_types.Just($std_core._int_to_double((_x28.value)));
    }
  }
}
 
export function parseFixedDefault(s, $default) /* (s : string, default : optional<float64>) -> float64 */  {
  var _x29 = parseFixed(s);
  if (_x29 === null) {
    return ($default !== undefined) ? $default : 0.0;
  }
  else {
    return _x29.value;
  }
}
 
export function parseIntDefault(s, $default, hex) /* (s : string, default : optional<int>, hex : optional<bool>) -> int */  {
  if ((s === (""))) {
    return ($default !== undefined) ? $default : 0;
  }
  else {
    var _x31 = (hex !== undefined) ? hex : false;
    var _x30 = parseInt(s, _x31);
    if (_x30 === null) {
      return ($default !== undefined) ? $default : 0;
    }
    else {
      return _x30.value;
    }
  }
}
 
export function printRedirect(print) /* (print : (msg : string) -> console ()) -> io () */  {
  return ((redirect).value = ($std_core_types.Just(print)));
}
 
 
/*
  showHex function from core.kk
*/
export function showHex(i, width, useCapitals) /* (i : int, width : optional<int>, useCapitals : optional<bool>) -> string */  {
   
  var _x33 = (width !== undefined) ? width : 1;
  var _x32 = $std_core._int_lt(_x33,0);
  if (_x32) {
    var w = 0;
  }
  else {
    var w = (width !== undefined) ? width : 1;
  }
   
  var right_3706 = $std_core.show(w);
  if (useCapitals !== undefined) {
    var _x32 = (useCapitals) ? "X" : "x";
  }
  else {
    var _x32 = "X";
  }
  return gformat(i, $std_core._lp__plus__plus__1_rp_(_x32, right_3706));
}
 
 
// monadic lift
export function _mlift3793_zipWithAcc(acc, f, i, xx, yy, _y_3760) /* forall<e,a,b,c> (acc : list<b>, f : (int, a, c) -> e b, i : int, xx : list<a>, yy : list<c>, b) -> e list<b> */  {
  return zipWithAcc(f, $std_core._int_add(i,1), $std_core.Cons(_y_3760, acc), xx, yy);
}
 
export function zipWithAcc(f0, i0, acc0, xs, ys) /* forall<a,b,c,e> ((int, a, b) -> e c, int, list<c>, list<a>, list<b>) -> e list<c> */  { tailcall: while(1)
{
  if (xs === null) {
    return $std_core.reverse(acc0);
  }
  else {
    if (ys === null) {
      return $std_core.reverse(acc0);
    }
    else {
       
      var x0_3817 = f0(i0, xs.head, ys.head);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_37600 /* 3332 */ ) {
          return _mlift3793_zipWithAcc(acc0, f0, i0, xs.tail, ys.tail, _y_37600);
        });
      }
      else {
        {
          // tail call
          var _x33 = $std_core._int_add(i0,1);
          var _x34 = $std_core.Cons(x0_3817, acc0);
          i0 = _x33;
          acc0 = _x34;
          xs = xs.tail;
          ys = ys.tail;
          continue tailcall;
        }
      }
    }
  }
}}
 
 
// monadic lift
export function _mlift3794_op(_acc, _y_3764) /* forall<e,a> (ctail<list<a>>, list<a>) -> e list<a> */  {
  return $std_core_types._ctail_resolve(_acc,_y_3764);
}
 
 
// monadic lift
export function _mlift3795_op(_acc0, f, i, xx, yy, _ctail_3730) /* forall<e,a,b,c> (ctail<list<c>>, f : (int, a, b) -> e c, i : int, xx : list<a>, yy : list<b>, c) -> e list<c> */  {
   
  var _ctail_3731 = undefined;
   
  var _ctail_3732 = $std_core.Cons(_ctail_3730, _ctail_3731);
  return _ctail_zipWithIter(f, $std_core._int_add(i,1), xx, yy, $std_core_types._ctail_link(_acc0,_ctail_3732,({value: _ctail_3732, field: "tail"})));
}
 
 
// monadic lift
export function _mlift3796_op(_accm, f0, i0, xx0, yy0, _ctail_3735) /* forall<e,a,b,c> ((list<c>) -> list<c>, f : (int, a, b) -> e c, i : int, xx : list<a>, yy : list<b>, c) -> e list<c> */  {
  return _ctailm_zipWithIter(f0, $std_core._int_add(i0,1), xx0, yy0, function(_ctail_3734 /* list<3417> */ ) {
      return _accm($std_core.Cons(_ctail_3735, _ctail_3734));
    });
}
 
export function _ctail_zipWithIter(f1, i1, xs, ys, _acc1) /* forall<a,b,c,e> ((int, a, b) -> e c, int, list<a>, list<b>, ctail<list<c>>) -> e list<c> */  { tailcall: while(1)
{
  if ($std_core._int_gt(i1,200)) {
     
    var x_3820 = zipWithAcc(f1, i1, $std_core.Nil, xs, ys);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_37640 /* list<3417> */ ) {
        return _mlift3794_op(_acc1, _y_37640);
      });
    }
    else {
      return $std_core_types._ctail_resolve(_acc1,x_3820);
    }
  }
  else {
    if (xs === null) {
      return $std_core_types._ctail_resolve(_acc1,($std_core.Nil));
    }
    else {
      if (ys === null) {
        return $std_core_types._ctail_resolve(_acc1,($std_core.Nil));
      }
      else {
         
        var x1_3823 = f1(i1, xs.head, ys.head);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_ctail_37300 /* 3417 */ ) {
            return _mlift3795_op(_acc1, f1, i1, xs.tail, ys.tail, _ctail_37300);
          });
        }
        else {
           
          var _ctail_37310 = undefined;
           
          var _ctail_37320 = $std_core.Cons(x1_3823, _ctail_37310);
          {
            // tail call
            var _x35 = $std_core._int_add(i1,1);
            var _x36 = $std_core_types._ctail_link(_acc1,_ctail_37320,({value: _ctail_37320, field: "tail"}));
            i1 = _x35;
            xs = xs.tail;
            ys = ys.tail;
            _acc1 = _x36;
            continue tailcall;
          }
        }
      }
    }
  }
}}
 
export function _ctailm_zipWithIter(f2, i2, xs0, ys0, _accm0) /* forall<a,b,c,e> ((int, a, b) -> e c, int, list<a>, list<b>, (list<c>) -> list<c>) -> e list<c> */  { tailcall: while(1)
{
  if ($std_core._int_gt(i2,200)) {
     
    var x2_3826 = zipWithAcc(f2, i2, $std_core.Nil, xs0, ys0);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(_accm0);
    }
    else {
      return _accm0(x2_3826);
    }
  }
  else {
    if (xs0 === null) {
      return _accm0($std_core.Nil);
    }
    else {
      if (ys0 === null) {
        return _accm0($std_core.Nil);
      }
      else {
         
        var x4_3828 = f2(i2, xs0.head, ys0.head);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_ctail_37350 /* 3417 */ ) {
            return _mlift3796_op(_accm0, f2, i2, xs0.tail, ys0.tail, _ctail_37350);
          });
        }
        else {
          {
            // tail call
            var _x39 = $std_core._int_add(i2,1);
            var _x40 = function(__dot_accm037 /* (list<3417>) -> list<3417> */ , _x4_382838 /* 3417 */ ) {
              return function(_ctail_37340 /* list<3417> */ ) {
                return __dot_accm037($std_core.Cons(_x4_382838, _ctail_37340));
              };
            }(_accm0, x4_3828);
            i2 = _x39;
            xs0 = xs0.tail;
            ys0 = ys0.tail;
            _accm0 = _x40;
            continue tailcall;
          }
        }
      }
    }
  }
}}
 
export function zipWithIter(f3, i3, xs1, ys1) /* forall<a,b,c,e> ((int, a, b) -> e c, int, list<a>, list<b>) -> e list<c> */  {
  var _x41 = $std_core_hnd._evv_is_affine();
  if (_x41) {
    return _ctail_zipWithIter(f3, i3, xs1, ys1, $std_core_types._ctail_nil());
  }
  else {
    return _ctailm_zipWithIter(f3, i3, xs1, ys1, function(_ctail_3733 /* list<3417> */ ) {
        return _ctail_3733;
      });
  }
}
 
 
// Zip two lists together by apply a pub fun "f" to all corresponding elements
// and their index in the list.
// The returned list is only as long as the smallest input list.
export function zipWithIndexed(xs, ys, f) /* forall<a,b,c,e> (xs : list<a>, ys : list<b>, f : (int, a, b) -> e c) -> e list<c> */  {
  return zipWithIter(f, 0, xs, ys);
}
 
 
// Zip two lists together by pairing the corresponding elements.
// The returned list is only as long as the smallest input list.
export function zip(xs, ys) /* forall<a,b> (xs : list<a>, ys : list<b>) -> list<(a, b)> */  {
  return zipWithIter(function(i /* int */ , x /* 3527 */ , y /* 3528 */ ) {
      return $std_core_types._Tuple2_(x, y);
    }, 0, xs, ys);
}
 
 
// Zip two lists together by apply a pub fun "f" to all corresponding elements.
// The returned list is only as long as the smallest input list.
export function zipWith(xs, ys, f) /* forall<a,b,c,e> (xs : list<a>, ys : list<b>, f : (a, b) -> e c) -> e list<c> */  {
  return zipWithIter(function(i /* int */ , x /* 3553 */ , y /* 3554 */ ) {
      return f(x, y);
    }, 0, xs, ys);
}