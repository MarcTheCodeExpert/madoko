// Koka generated module: "std/text/regex", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_num_int32 from './std_num_int32.mjs';
 
// externals
/*---------------------------------------------------------------------------
  Copyright 2012-2021, Microsoft Research, Daan Leijen.
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the LICENSE file at the root of this distribution.
---------------------------------------------------------------------------*/
var $regexCache = {}
function $regexCreate( s, ignoreCase, multiLine )
{
  // we always use "g" flag.
  // to re-use safely, we always need to explicitly set 'lastIndex' on each use!
  var flags = (ignoreCase!==0 ? "i" : "") + (multiLine!==0 ? "m" : "");
  var key = s+flags;
  if ($regexCache[key]) return $regexCache[key];
  var regx = null;
  try {
    regx = new RegExp( s, "gd" + flags );
  }
  catch(exn) {
    if (exn instanceof SyntaxError && exn.message != null && exn.message.includes("Invalid flags")) {
      regx = new RegExp( s, "g" + flags );
    }
    else {
      throw exn;
    }
  }
  var rx = { regex: regx, flags: flags };
  $regexCache[key] = rx;
  return rx
}
// Execute
function $regexExecEx( r,  s, start )
{
  r.regex.lastIndex = start;
  const match = r.regex.exec(s);
  if (!match) {
    return { match: match, slices: $std_core.Nil }; // Matched(-1,0,"",[""]);
  }
  else if (match.indices instanceof Array) {
    const indices = match.indices;
    var res = $std_core.Nil;
    for( var i = indices.length - 1; i >= 0; i--) {
      var rng = indices[i];
      var sslice;
      if (rng == null) {
        sslice = $std_core.invalid;
      }
      else {
        const idx = rng[0];
        const len = rng[1] - idx;
        sslice = $std_core._new_sslice(s,idx,len);
      }
      res = $std_core.Cons( sslice, res);
    }
    return { match: match, slices: res };
  }
  else {
    // older JS, no 'd' flag for indices; emulate by creating slices directly on the match strings
    const next = r.regex.lastIndex;
    var res = $std_core.Nil;
    for( var i = match.length - 1; i > 0; i--) {
      const sub = match[i];
      var sslice;
      if (sub == null) {
        sslice = $std_core.invalid;
      }
      else {
        sslice = $std_core._new_sslice(sub,0,sub.length);
      }      
      res = $std_core.Cons( sslice, res);
    }
    res = $std_core.Cons( $std_core._new_sslice(s,match.index,next - match.index), res);
    return { match: match, slices: res };
  }
}
function $regexExec( r,  s, start )
{
  return $regexExecEx(r,s,start).slices;
}
function $regexExecAll( r,  s, start, atmost )
{
  if (atmost < 0) { atmost = Number.MAX_SAFE_INTEGER; }
  var result = [];
  while (atmost > 0) {
    var res = $regexExecEx(r,s,start);
    if (res.match == null) break;
    var pre = $std_core._new_sslice( s, start, res.match.index - start );
    result.push( $std_core.Cons(pre,$std_core.Nil) ); // singleton pre list
    result.push( res.slices );
    // avoid loop on zero-length match
    atmost--;
    if (r.regex.lastIndex <= start) {
      start++;
    }
    else {
      start = r.regex.lastIndex;
    }
  }
  // and push the post string
  var post = $std_core._new_sslice( s, start, s.length - start );
  result.push( $std_core.Cons(post,$std_core.Nil) ); // singleton post list
  return $std_core._vlist(result,null);
}
/*
function $regexCreateAlt( regexs, ignoreCase, multiLine ) {
  var offsets = [];
  var alts = []
  var current = 1;
  var prefix = $findPrefix(regexs);
  var prefixCount = $countGroups(prefix);
  if (prefix !== "") {
    // TODO: fix prefix that has a halfway capture group
    regexs = regexs.map( function(r) { return r.substr(prefix.length); } );
    current += prefixCount;
  }
  regexs.map( function(regex) {
    offsets.push(current)
    regex = regex.replace(/\\(\d)/g, function(match,digit) {
      var d = parseInt(digit);
      return (d <= prefixCount ? match : ("\\" + (d + current - prefixCount)))
    })
    current += (1 + $countGroups(regex));
    alts.push( "(" + regex + ")" );
  })
  offsets.push(current) // final
  var alt = $regexCreate( prefix + "(?:" + alts.join("|") + ")", ignoreCase, multiLine );
  alt.offsets = offsets;
  return alt;
}
// cache a non-global version too
function $regex_nong( r ) {
  if (r.regexng) return r.regexng;
  r.regexng = new RegExp( r.regex.source, r.flags )
  return r.regexng;
}
function $countGroups( regex ) {  // (string) -> int
  // (?x)(?<!(\\|(?!\\)\(\?))\((?!\?)
  var parens = regex.replace(/[^\\\[(]+|\\[\s\S]?|\(\?|\[(?:[^\\\]]|\\.)*\]/g, "");
  return parens.length
}
function $findPrefix( xs ) { // ([string]) -> string
  if (!xs) return "";
  if (xs.length == 0) return "";
  if (xs.length == 1) return xs[0];
  var prefix = "";
  var minlen = xs[0].length;
  xs.map( function(s) { if (s.length < minlen) minlen = s.length; });
  for( var i = 0; i < minlen; i++) {
    var c = xs[0][i];
    for (var j = 1; j < xs.length; j++ ) {
      if (xs[j][i] !== c) {
        return prefix;
      }
    }
    prefix = prefix + c;
  }
  return prefix;
}
function $regexGroups( r, match ) {
  if (!r.offsets || r.offsets.length <= 1) return match;
  var groups = [match[0]]
  groups.alternative = -1;
  for( var i = 0; i < r.offsets.length-1; i++ ) {
    if (match[r.offsets[i]] != null) {
      groups.alternative = i;
      // first push prefix groups
      var j = 1;
      while( j < r.offsets[0] ) {
        groups.push(match[j]);
        j++;
      }
      // then the groups of the alternative we matched
      var j = r.offsets[i] + 1;
      while( j < r.offsets[i+1] ) {
        groups.push(match[j])
        j++;
      }
      break;
    }
  }
  return groups;
}
function $regexSearch( r, s, start ) {
  var res = $regexExec(r,s,start);
  return res.index;
}
function $regexSplit( r, s, n, start ) {
  r.regex.lastIndex = start;
  return (n <= 0 ? s.split( r.regex ) : s.split( r.regex, n ));
}
function $regexReplaceFun( r,  s, repl, all, start)
{
  var regex = (all === 0 ? $regex_nong(r) : r.regex);
  //if (!s || !regex.test(s)) return s
  regex.lastIndex = start;
  return s.replace( regex, function() {
    if (arguments.length < 3) return ""; // should never happen!
    var index = arguments[arguments.length-2];
    var match = [];
    for(var i = 0; i < arguments.length-2; i++) {
      match[i] = arguments[i];
    }
    var matched = match[0] ? match[0] : ""
    var next = index + matched.length;
    // if (next<=index) next = index+1;
    var groups = (r.offsets ? $regexGroups(r,match) : match);
    var slice = $std_core._new_sslice(s,index,next - index);    
    return repl( Matched( slice, matched, Groups(groups) ) );
  });
}
function $regexReplace( r, s, repl, all, start )
{
  var regex = (all === 0 ? $regex_nong(r) : r.regex);
  //if (!s || !regex.test(s)) return s
  regex.lastIndex = start;
  return s.replace( regex, repl ); // TODO: wrong for alt regex's
}
*/
 
// type declarations
// type regex
export function Regex(obj, src) /* (obj : any, src : string) -> regex */  {
  return { obj: obj, src: src };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `obj` constructor field of the `:regex` type.
export function obj(regex0) /* (regex : regex) -> any */  {
  return regex0.obj;
}
 
 
// Automatically generated. Retrieves the `src` constructor field of the `:regex` type.
export function src(regex0) /* (regex : regex) -> string */  {
  return regex0.src;
}
 
export function _copy(_this, obj0, src0) /* (regex, obj : optional<any>, src : optional<string>) -> regex */  {
  if (obj0 !== undefined) {
    var _x0 = obj0;
  }
  else {
    var _x0 = _this.obj;
  }
  if (src0 !== undefined) {
    var _x1 = src0;
  }
  else {
    var _x1 = _this.src;
  }
  return Regex(_x0, _x1);
}
 
 
// Return the full matched string of a capture group
export function captured(matched0) /* (matched : list<sslice>) -> string */  {
  if (matched0 !== null) {
    return $std_core.string_3(matched0.head);
  }
  else {
    return "";
  }
}
 
export function regex_exec(regex0, str, start) /* (regex : any, str : string, start : ssize_t) -> list<sslice> */  {
  return $regexExec(regex0,str,start);
}
 
export function regex_exec_all(regex0, str, start, atmost) /* (regex : any, str : string, start : ssize_t, atmost : ssize_t) -> list<list<sslice>> */  {
  return $regexExecAll(regex0,str,start,atmost);
}
 
export function regex_create(source0, ignore_case, multi_line) /* (source : string, ignore-case : bool, multi-line : bool) -> any */  {
  return $regexCreate(source0,ignore_case,multi_line);
}
 
 
// Return the pattern as a string
export function source(r) /* (r : regex) -> string */  {
  return r.src;
}
 
 
// Check if a capture group was matched.
export function matched(s) /* (s : sslice) -> bool */  {
  var _x2 = s.start;
  return (_x2 >= 0);
}
 
 
// Return the full matched string part for a list of matched capture groups.
export function captures(xs) /* (xs : list<list<sslice>>) -> list<string> */  {
  return $std_core.map_5(xs, captured);
}
 
 
// monadic lift
export function _mlift1030_concat_replace(acc, mm, pre, repl, _y_1018) /* forall<e> (acc : list<string>, mm : list<list<sslice>>, pre : list<sslice>, repl : (list<sslice>) -> e string, string) -> e string */  {
  if (pre !== null) {
    var _x3 = $std_core.string_3(pre.head);
  }
  else {
    var _x3 = "";
  }
  return concat_replace(mm, repl, $std_core.Cons(_y_1018, $std_core.Cons(_x3, acc)));
}
 
export function concat_replace(matches, repl0, acc0) /* forall<e> (matches : list<list<sslice>>, repl : (list<sslice>) -> e string, acc : list<string>) -> e string */  { tailcall: while(1)
{
  if (matches !== null && matches.tail !== null) {
     
    var x_1031 = repl0(matches.tail.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_10180 /* string */ ) {
        return _mlift1030_concat_replace(acc0, matches.tail.tail, matches.head, repl0, _y_10180);
      });
    }
    else {
      {
        // tail call
        if (matches.head !== null) {
          var _x5 = $std_core.string_3(matches.head.head);
        }
        else {
          var _x5 = "";
        }
        var _x4 = $std_core.Cons(x_1031, $std_core.Cons(_x5, acc0));
        matches = matches.tail.tail;
        acc0 = _x4;
        continue tailcall;
      }
    }
  }
  else if (matches !== null && matches.tail === null) {
     
    if (matches.head !== null) {
      var _x6 = $std_core.string_3(matches.head.head);
    }
    else {
      var _x6 = "";
    }
    var xs_1024 = $std_core.Cons(_x6, acc0);
     
    var xs0_17151 = $std_core._lift17200_reverse_join($std_core.Nil, xs_1024);
    if (xs0_17151 === null) {
      return "";
    }
    else {
      return $std_core._lift17201_reverse_join(xs0_17151.tail, xs0_17151.head);
    }
  }
  else {
     
    var xs0_171510 = $std_core._lift17200_reverse_join($std_core.Nil, acc0);
    if (xs0_171510 === null) {
      return "";
    }
    else {
      return $std_core._lift17201_reverse_join(xs0_171510.tail, xs0_171510.head);
    }
  }
}}
 
 
// Find a match for a regular expression.
// See also `find` and `contains`
export function exec(regex0, s) /* (regex : regex, s : string) -> list<sslice> */  {
  var _x6 = regex0.obj;
  return regex_exec(_x6, s, 0);
}
 
 
// Does a regular expression pattern occur in a string `s`?
// (note: called `test` in javascript)
export function contains(s, r) /* (s : string, r : regex) -> bool */  {
   
  var _x7 = r.obj;
  var list0_968 = regex_exec(_x7, s, 0);
  return (list0_968 !== null);
}
 
 
// Match a regular expression `regex` over a string `s`. 
// Matches at most `atmost` times (and matches all by default).
// Returns always an odd number of elements where every even
// element is a match and the odd ones the string parts between the 
// matches. 
// See also `find-all` and `strings`.
export function exec_all(regex0, s, atmost) /* (regex : regex, s : string, atmost : optional<int>) -> list<list<sslice>> */  {
  var _x7 = regex0.obj;
  var _x8 = (atmost !== undefined) ? atmost : -1;
  return regex_exec_all(_x7, s, 0, $std_core.ssize__t(_x8));
}
 
 
// Filter only for the matched parts.
export function _ctail_filter_matches(xs, _acc) /* (xs : list<list<sslice>>, ctail<list<list<sslice>>>) -> list<list<sslice>> */  { tailcall: while(1)
{
  if (xs !== null && xs.tail !== null) {
     
    var _ctail_1014 = undefined;
     
    var _ctail_1015 = $std_core.Cons(xs.tail.head, _ctail_1014);
    {
      // tail call
      var _x9 = $std_core_types._ctail_link(_acc,_ctail_1015,({value: _ctail_1015, field: "tail"}));
      xs = xs.tail.tail;
      _acc = _x9;
      continue tailcall;
    }
  }
  else {
    return $std_core_types._ctail_resolve(_acc,($std_core.Nil));
  }
}}
 
 
// Filter only for the matched parts.
export function filter_matches(xs0) /* (xs : list<list<sslice>>) -> list<list<sslice>> */  {
  return _ctail_filter_matches(xs0, $std_core_types._ctail_nil());
}
 
 
// Filter only for the non-matched parts.
export function _ctail_filter_non_matches(xs, _acc) /* (xs : list<list<sslice>>, ctail<list<list<sslice>>>) -> list<list<sslice>> */  { tailcall: while(1)
{
  if (xs !== null && xs.tail !== null) {
     
    var _ctail_1016 = undefined;
     
    var _ctail_1017 = $std_core.Cons(xs.head, _ctail_1016);
    {
      // tail call
      var _x10 = $std_core_types._ctail_link(_acc,_ctail_1017,({value: _ctail_1017, field: "tail"}));
      xs = xs.tail.tail;
      _acc = _x10;
      continue tailcall;
    }
  }
  else if (xs !== null && xs.tail === null) {
    return $std_core_types._ctail_resolve(_acc,($std_core.Cons(xs.head, $std_core.Nil)));
  }
  else {
    return $std_core_types._ctail_resolve(_acc,($std_core.Nil));
  }
}}
 
 
// Filter only for the non-matched parts.
export function filter_non_matches(xs0) /* (xs : list<list<sslice>>) -> list<list<sslice>> */  {
  return _ctail_filter_non_matches(xs0, $std_core_types._ctail_nil());
}
 
 
// Find a match for a regular expression.
// See also `exec`
export function find(s, r) /* (s : string, r : regex) -> maybe<string> */  {
  var _x12 = r.obj;
  var _x11 = regex_exec(_x12, s, 0);
  if (_x11 !== null) {
    return $std_core_types.Just($std_core.string_3(_x11.head));
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// Find all matches for a regular expression in a string.
export function find_all(s, r, atmost) /* (s : string, r : regex, atmost : optional<int>) -> list<string> */  {
   
  var _x13 = r.obj;
  var _x14 = (atmost !== undefined) ? atmost : -1;
  var xs_976 = filter_matches(regex_exec_all(_x13, s, 0, $std_core.ssize__t(_x14)));
  return $std_core.map_5(xs_976, captured);
}
 
 
// Create a new regular expression. Takes two optional parameters. Set `ignoreCase` to `True`
// to ignore uppercase/lowercase distinction. If  `multiline` is set to `True`, then `^` and `$`
// match also the beginning and end of every line (instead of the entire input).
export function regex(regex0, ignorecase, multiline) /* (regex : string, ignorecase : optional<bool>, multiline : optional<bool>) -> regex */  {
  var _x13 = (ignorecase !== undefined) ? ignorecase : false;
  var _x14 = (multiline !== undefined) ? multiline : false;
  return Regex(regex_create(regex0, _x13, _x14), regex0);
}
 
 
// Replace the all occurrences of `regex` by the result of the replacement fun `repl` in a string `s`.
export function replace_all(s, r, repl, atmost) /* forall<e> (s : string, r : regex, repl : (list<sslice>) -> e string, atmost : optional<int>) -> e string */  {
  var _x15 = r.obj;
  var _x16 = (atmost !== undefined) ? atmost : -1;
  return concat_replace(regex_exec_all(_x15, s, 0, $std_core.ssize__t(_x16)), repl, $std_core.Nil);
}
 
 
// Replace using a replacement string that can contain `$$` for a `$` sign, `$n` for a capture group,
// `$&` for the entire match `==$0`.
export function replace_captures(caps, repl) /* (caps : list<sslice>, repl : string) -> string */  {
   
  var _x18 = undefined;
  var _x17 = (_x18 !== undefined) ? _x18 : false;
  var _x20 = undefined;
  var _x19 = (_x20 !== undefined) ? _x20 : false;
  var r_1035 = Regex(regex_create("\\$(?:(\\d)|(\\&)|(\\$))", _x17, _x19), "\\$(?:(\\d)|(\\&)|(\\$))");
  var _x17 = r_1035.obj;
  var _x19 = undefined;
  var _x18 = (_x19 !== undefined) ? _x19 : -1;
  return concat_replace(regex_exec_all(_x17, repl, 0, $std_core.ssize__t(_x18)), function(cap /* list<sslice> */ ) {
      if (cap !== null && cap.tail !== null && cap.tail.tail !== null && cap.tail.tail.tail !== null && cap.tail.tail.tail.tail === null) {
        var _x21 = cap.tail.tail.tail.head.start;
        var _x20 = (_x21 >= 0);
        if (_x20) {
          return "$";
        }
        else {
           
          var _x23 = cap.tail.tail.head.start;
          var _x22 = (_x23 >= 0);
          if (_x22) {
            var grp = 0;
          }
          else {
            var grp = $std_core.parse_int_default($std_core.string_3(cap.tail.head), 0);
          }
          var _x22 = $std_core._lp__lb__rb__2_rp_(caps, grp);
          if (_x22 === null) {
            return "";
          }
          else {
            return $std_core.string_3(_x22.value);
          }
        }
      }
      else {
        return "$";
      }
    }, $std_core.Nil);
}
 
 
// Replace all occurrences of `regex` with the replacement string `repl` in a string `s`.
// The replacement string can contain `$$` for a `$` sign, `$n` for a capture group,
// `$&` for the entire match `==$0`.
export function replace_all_1(s, regex0, repl, atmost) /* (s : string, regex : regex, repl : string, atmost : optional<int>) -> string */  {
  if (((repl).indexOf(("$")) >= 0)) {
    var _x23 = regex0.obj;
    var _x24 = (atmost !== undefined) ? atmost : -1;
    return concat_replace(regex_exec_all(_x23, s, 0, $std_core.ssize__t(_x24)), function(caps /* list<sslice> */ ) {
        return replace_captures(caps, repl);
      }, $std_core.Nil);
  }
  else {
    var _x25 = regex0.obj;
    var _x26 = (atmost !== undefined) ? atmost : -1;
    return concat_replace(regex_exec_all(_x25, s, 0, $std_core.ssize__t(_x26)), function(___wildcard__158__35 /* list<sslice> */ ) {
        return repl;
      }, $std_core.Nil);
  }
}
 
export var rx_nongroup;
var _x28 = undefined;
var _x27 = (_x28 !== undefined) ? _x28 : false;
var _x30 = undefined;
var _x29 = (_x30 !== undefined) ? _x30 : false;
var rx_nongroup = Regex(regex_create("[^\\\\\\[(]+|\\\\[\\s\\S]?|\\(\\?|\\[(?:[^\\\\\\]]|\\\\.)*\\]", _x27, _x29), "[^\\\\\\[(]+|\\\\[\\s\\S]?|\\(\\?|\\[(?:[^\\\\\\]]|\\\\.)*\\]");
 
 
// How many groups are captured by this regex?
export function groups_count(r) /* (r : regex) -> int */  {
  if (((("")).indexOf(("$")) >= 0)) {
    var _x32 = rx_nongroup.obj;
    var _x33 = r.src;
    var _x35 = undefined;
    var _x34 = (_x35 !== undefined) ? _x35 : -1;
    var _x31 = concat_replace(regex_exec_all(_x32, _x33, 0, $std_core.ssize__t(_x34)), function(caps /* list<sslice> */ ) {
        return replace_captures(caps, "");
      }, $std_core.Nil);
  }
  else {
    var _x36 = rx_nongroup.obj;
    var _x37 = r.src;
    var _x39 = undefined;
    var _x38 = (_x39 !== undefined) ? _x39 : -1;
    var _x31 = concat_replace(regex_exec_all(_x36, _x37, 0, $std_core.ssize__t(_x38)), function(___wildcard__158__35 /* list<sslice> */ ) {
        return "";
      }, $std_core.Nil);
  }
  return $std_core.count_1(_x31);
}
 
 
// Replace the first occurrence of `regex` by the result of the replacement fun `repl` in a string `s`.
export function replace(s, r, repl) /* forall<e> (s : string, r : regex, repl : (list<sslice>) -> e string) -> e string */  {
  var _x40 = r.obj;
  return concat_replace(regex_exec_all(_x40, s, 0, 1), repl, $std_core.Nil);
}
 
 
// Replace the first occurrence of `regex` with a replacement string `repl` in a string `s`.
// The replacement string can contain `$$` for a `$` sign, `$n` for a capture group,
// `$&` for the entire match `==$0`.
export function replace_1(s, regex0, repl) /* (s : string, regex : regex, repl : string) -> string */  {
  if (((repl).indexOf(("$")) >= 0)) {
    var _x41 = regex0.obj;
    return concat_replace(regex_exec_all(_x41, s, 0, 1), function(caps /* list<sslice> */ ) {
        return replace_captures(caps, repl);
      }, $std_core.Nil);
  }
  else {
    var _x42 = regex0.obj;
    return concat_replace(regex_exec_all(_x42, s, 0, 1), function(___wildcard__158__35 /* list<sslice> */ ) {
        return repl;
      }, $std_core.Nil);
  }
}
 
 
// Split a string `s` in at most `atmost` parts using a regular expression `r` as separator.
export function split(s, r, atmost) /* (s : string, r : regex, atmost : optional<int>) -> list<string> */  {
   
  var _x43 = r.obj;
  var _x44 = (atmost !== undefined) ? atmost : -1;
  var xs_1000 = filter_non_matches(regex_exec_all(_x43, s, 0, $std_core.ssize__t(_x44)));
  return $std_core.map_5(xs_1000, captured);
}
 
export function testabc(s) /* (s : string) -> bool */  {
   
  var _x44 = undefined;
  var _x43 = (_x44 !== undefined) ? _x44 : false;
  var _x46 = undefined;
  var _x45 = (_x46 !== undefined) ? _x46 : false;
  var r_1006 = Regex(regex_create("[ab]+c", _x43, _x45), "[ab]+c");
   
  var _x47 = r_1006.obj;
  var list0_1010 = regex_exec(_x47, s, 0);
  return (list0_1010 !== null);
}