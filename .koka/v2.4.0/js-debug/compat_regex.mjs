// Koka generated module: "compat/regex", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_text_regex from './std_text_regex.mjs';
import * as $compat_dict from './compat_dict.mjs';
import * as $compat from './compat.mjs';
import * as $compat_log from './compat_log.mjs';
 
// externals
/*---------------------------------------------------------------------------
  Copyright 2012 Microsoft Corporation.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/
var $regexCache = {}
function $regexCreate( s, ignoreCase, multiLine ) 
{
  // we always use "g" flag. 
  // to re-use safely, we always need to explicitly set 'lastIndex' on each use!
  var flags = (ignoreCase!==0 ? "i" : "") + (multiLine!==0 ? "m" : "");
  var key = s+flags;
  if ($regexCache[key]) return $regexCache[key];
  var rx = { regex: new RegExp( s, "g" + flags), flags: flags };
  $regexCache[key] = rx;
  return rx
}
// cache a non-global verion too
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
// Execute
function $regexExec( r,  s, start ) 
{
  r.regex.lastIndex = start;
  var match = r.regex.exec(s);
  if (!match) {
    return null; // Matched(-1,0,"",[""]);
  } 
  else {
    var next = r.regex.lastIndex;  
    if (next <= match.index) next = match.index+1;    
    var groups = (r.offsets ? $regexGroups(r,match) : match)
    return $std_core.Just(Matched(match.index, next, match[0] ? match[0] : "", Groups(groups) ));
  }
}  
function $regexExecAll( r,  s, start ) 
{
  r.regex.lastIndex = start;
  var result = [];
  var match;
  while (match = r.regex.exec(s)) {
    if (r.regex.lastIndex <= match.index) r.regex.lastIndex = match.index+1; // avoid loop on zero-length match    
    var groups = (r.offsets ? $regexGroups(r,match) : match);
    result.push( Matched( match.index, r.regex.lastIndex, match[0] ? match[0] : "", Groups(groups) ) );
  }
  return result;
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
    if (next<=index) next = index+1;
    var groups = (r.offsets ? $regexGroups(r,match) : match);
    return repl( Matched( index, next, matched, Groups(groups) ) );      
  });
}
function $regexReplace( r, s, repl, all, start ) 
{
  var regex = (all === 0 ? $regex_nong(r) : r.regex);
  
  //if (!s || !regex.test(s)) return s
  regex.lastIndex = start; 
  return s.replace( regex, repl ); // TODO: wrong for alt regex's
}
 
// type declarations
// type groups
export function Groups(grp) /* (grp : any) -> groups */  {
  return grp;
}
// type matched
export function Matched(index, next, matched, groups) /* (index : int, next : int, matched : string, groups : groups) -> matched */  {
  return { index: index, next: next, matched: matched, groups: groups };
}
// type regex
export function Regex(obj) /* (obj : any) -> regex */  {
  return obj;
}
 
// declarations
 
 
// Automatically generated. Retrieves the `grp` constructor field of the `:groups` type.
export function grp(groups0) /* (groups : groups) -> any */  {
  return groups0;
}
 
export function _copy(_this, grp0) /* (groups, grp : optional<any>) -> groups */  {
  if (grp0 !== undefined) {
    var _x0 = grp0;
  }
  else {
    var _x0 = _this;
  }
  return _x0;
}
 
 
// Automatically generated. Retrieves the `index` constructor field of the `:matched` type.
export function index(matched0) /* (matched : matched) -> int */  {
  return matched0.index;
}
 
 
// Automatically generated. Retrieves the `next` constructor field of the `:matched` type.
export function next(matched0) /* (matched : matched) -> int */  {
  return matched0.next;
}
 
 
// Automatically generated. Retrieves the `matched` constructor field of the `:matched` type.
export function matched(matched0) /* (matched : matched) -> string */  {
  return matched0.matched;
}
 
 
// Automatically generated. Retrieves the `groups` constructor field of the `:matched` type.
export function groups(matched0) /* (matched : matched) -> groups */  {
  return matched0.groups;
}
 
export function _copy_1(_this, index0, next0, matched0, groups0) /* (matched, index : optional<int>, next : optional<int>, matched : optional<string>, groups : optional<groups>) -> matched */  {
  if (index0 !== undefined) {
    var _x1 = index0;
  }
  else {
    var _x1 = _this.index;
  }
  if (next0 !== undefined) {
    var _x2 = next0;
  }
  else {
    var _x2 = _this.next;
  }
  if (matched0 !== undefined) {
    var _x3 = matched0;
  }
  else {
    var _x3 = _this.matched;
  }
  if (groups0 !== undefined) {
    var _x4 = groups0;
  }
  else {
    var _x4 = _this.groups;
  }
  return Matched(_x1, _x2, _x3, _x4);
}
 
 
// Automatically generated. Retrieves the `obj` constructor field of the `:regex` type.
export function obj(regex0) /* (regex : regex) -> any */  {
  return regex0;
}
 
export function _copy_2(_this, obj0) /* (regex, obj : optional<any>) -> regex */  {
  if (obj0 !== undefined) {
    var _x5 = obj0;
  }
  else {
    var _x5 = _this;
  }
  return _x5;
}
 
export function groupsIndex(groups0, index0) /* (groups : any, index : int) -> string */  {
  return ((groups0)[index0] != null ? (groups0)[index0] : '');
}
 
 
// For alternative regular expressions, return the alternative that was matched.
// If this was not an alternative regex, returns "-1"
export function alternative(groups0) /* (groups : groups) -> int */  {
  return (groups0.alternative!=null ? groups0.alternative : -1);
}
 
export function regexExec(_arg1, _arg2, _arg3) /* (any, string, int) -> maybe<matched> */  {
  return $regexExec(_arg1,_arg2,_arg3);
}
 
export function regexExecAll(_arg1, _arg2, _arg3) /* (any, string, int) -> vector<matched> */  {
  return $regexExecAll(_arg1,_arg2,_arg3);
}
 
export function groupsMatchedOn(groups0, index0) /* (groups : any, index : int) -> int */  {
  return (groups0[index0] ? 1 : 0);
}
 
export function regexReplace(_arg1, _arg2, _arg3, _arg4, _arg5) /* (any, string, string, int, int) -> string */  {
  return $regexReplace(_arg1,_arg2,_arg3,_arg4,_arg5);
}
 
export function regexReplaceFun(_arg1, _arg2, _arg3, _arg4, _arg5) /* forall<e> (any, string, (matched) -> e string, int, int) -> e string */  {
  return $regexReplaceFun(_arg1,_arg2,_arg3,_arg4,_arg5);
}
 
export function regexCreate(_arg1, _arg2, _arg3) /* (string, int, int) -> any */  {
  return $regexCreate(_arg1,_arg2,_arg3);
}
 
export function regexSource(r) /* (r : any) -> string */  {
  return r.regex.source;
}
 
export function regexCreateAlt(_arg1, _arg2, _arg3) /* (vector<string>, int, int) -> any */  {
  return $regexCreateAlt(_arg1,_arg2,_arg3);
}
 
export function regexSplit(_arg1, _arg2, _arg3, _arg4) /* (any, string, int, int) -> vector<string> */  {
  return $regexSplit(_arg1,_arg2,_arg3,_arg4);
}
 
 
// Return the string captured by a particular group or the empty string.
export function _lp__lb__rb__rp_(groups0, index0) /* (groups : groups, index : int) -> string */  {
  var _x6 = groups0;
  return groupsIndex(_x6, index0);
}
 
 
// Find a match for a regular expression starting at start position "start" (by default "0").
// See also "contains"
// (note: this fun is called |exec| in JavaScript).
export function find(s, regex0, start) /* (s : string, regex : regex, start : optional<int>) -> maybe<matched> */  {
  var _x7 = regex0;
  var _x10 = (start !== undefined) ? start : 0;
  var _x9 = $std_core._int_ge(_x10,0);
  if (_x9) {
    var _x8 = (start !== undefined) ? start : 0;
  }
  else {
    var _x8 = 0;
  }
  return regexExec(_x7, s, _x8);
}
 
 
// Does a regular expression pattern occur in a string "s"?
// (note: called `test` in javascript)
export function contains(s, r, start) /* (s : string, r : regex, start : optional<int>) -> bool */  {
   
  var _x11 = r;
  var _x14 = (start !== undefined) ? start : 0;
  var _x13 = $std_core._int_ge(_x14,0);
  if (_x13) {
    var _x12 = (start !== undefined) ? start : 0;
  }
  else {
    var _x12 = 0;
  }
  var m_1916 = regexExec(_x11, s, _x12);
  return (m_1916 === null) ? false : true;
}
 
 
// Find all matches for a regular expression in a string.
export function findAll(s, regex0, start) /* (s : string, regex : regex, start : optional<int>) -> vector<matched> */  {
  var _x12 = (start !== undefined) ? start : 0;
  var _x11 = $std_core._int_gt(_x12,($std_core.count_1(s)));
  if (_x11) {
    return [];
  }
  else {
    var _x13 = regex0;
    var _x16 = (start !== undefined) ? start : 0;
    var _x15 = $std_core._int_ge(_x16,0);
    if (_x15) {
      var _x14 = (start !== undefined) ? start : 0;
    }
    else {
      var _x14 = 0;
    }
    return regexExecAll(_x13, s, _x14);
  }
}
 
 
// Returns "True" if a particular capture group actually matched.
// This is used if the group can match, but may capture the empty string.
export function matchedOn(groups0, index0) /* (groups : groups, index : int) -> bool */  {
   
  var _x17 = groups0;
  var i_1927 = groupsMatchedOn(_x17, index0);
  return $std_core._int_ne(i_1927,0);
}
 
 
// Return first group that was matched (or -1 if nothing was matched)
export function firstMatchedOn(groups0, start, end) /* (groups : groups, start : optional<int>, end : optional<int>) -> int */  {
  var _x18 = (start !== undefined) ? start : 1;
  var _x19 = (end !== undefined) ? end : 10;
  var _x17 = $std_core.find($std_core.list(_x18, _x19), function(i /* int */ ) {
       
      var _x20 = groups0;
      var i0_1931 = groupsMatchedOn(_x20, i);
      return $std_core._int_ne(i0_1931,0);
    });
  return (_x17 === null) ? $std_core._int_negate(1) : _x17.value;
}
 
 
// Return the first matched group (or "" if nothing matched) starting at "start"
// and returning at most group "end"
export function firstMatched(groups0, start, end) /* (groups : groups, start : optional<int>, end : optional<int>) -> string */  {
   
  var _x21 = (start !== undefined) ? start : 1;
  var _x22 = (end !== undefined) ? end : 10;
  var _x20 = $std_core.find($std_core.list(_x21, _x22), function(i /* int */ ) {
       
      var _x23 = groups0;
      var i0_1931 = groupsMatchedOn(_x23, i);
      return $std_core._int_ne(i0_1931,0);
    });
  var i0 = (_x20 === null) ? $std_core._int_negate(1) : _x20.value;
  if ($std_core._int_ge(i0,0)) {
    var _x20 = groups0;
    return groupsIndex(_x20, i0);
  }
  else {
    return "";
  }
}
 
export function replaceEx(s, regex0, repl, all, start) /* forall<e> (s : string, regex : regex, repl : (matched : matched) -> e string, all : optional<bool>, start : optional<int>) -> e string */  {
  var _x22 = (start !== undefined) ? start : 0;
  var _x21 = $std_core._int_gt(_x22,($std_core.count_1(s)));
  if (_x21) {
    return s;
  }
  else {
    var _x23 = regex0;
    if (all !== undefined) {
      var _x24 = (all) ? 1 : 0;
    }
    else {
      var _x24 = 0;
    }
    var _x27 = (start !== undefined) ? start : 0;
    var _x26 = $std_core._int_ge(_x27,0);
    if (_x26) {
      var _x25 = (start !== undefined) ? start : 0;
    }
    else {
      var _x25 = 0;
    }
    return regexReplaceFun(_x23, s, repl, _x24, _x25);
  }
}
 
export function replaceEx_1(s, regex0, repl, all, start) /* (s : string, regex : regex, repl : string, all : optional<bool>, start : optional<int>) -> string */  {
  var _x29 = (start !== undefined) ? start : 0;
  var _x28 = $std_core._int_gt(_x29,($std_core.count_1(s)));
  if (_x28) {
    return s;
  }
  else {
    var _x30 = regex0;
    if (all !== undefined) {
      var _x31 = (all) ? 1 : 0;
    }
    else {
      var _x31 = 0;
    }
    var _x34 = (start !== undefined) ? start : 0;
    var _x33 = $std_core._int_ge(_x34,0);
    if (_x33) {
      var _x32 = (start !== undefined) ? start : 0;
    }
    else {
      var _x32 = 0;
    }
    return regexReplace(_x30, s, repl, _x31, _x32);
  }
}
 
 
// Replace the all occurrences of "regex" by the result of the replacement fun "repl" in a string "s".
export function replaceAll(s, regex0, repl, start) /* forall<e> (s : string, regex : regex, repl : (matched : matched) -> e string, start : optional<int>) -> e string */  {
  var _x35 = (start !== undefined) ? start : 0;
  return replaceEx(s, regex0, repl, true, _x35);
}
 
 
// Replace all ocurrences of "regex" by the result of a replacement string "repl" in a string "s".
export function replaceAll_1(s, regex0, repl, start) /* (s : string, regex : regex, repl : string, start : optional<int>) -> string */  {
  var _x36 = (start !== undefined) ? start : 0;
  return replaceEx_1(s, regex0, repl, true, _x36);
}
 
 
// Create a new regular expression. Takes two optional parameters. Set "ignoreCase" to "True"
// to ignore uppercase/lowercase distinction. If  "multiline" is set to "True", then "^" and "$"
// match also the beginning and end of every line (instead of the entire input).
export function regex(regex0, ignorecase, multiline) /* (regex : string, ignorecase : optional<bool>, multiline : optional<bool>) -> regex */  {
  if (ignorecase !== undefined) {
    var _x37 = (ignorecase) ? 1 : 0;
  }
  else {
    var _x37 = 0;
  }
  if (multiline !== undefined) {
    var _x38 = (multiline) ? 1 : 0;
  }
  else {
    var _x38 = 0;
  }
  return regexCreate(regex0, _x37, _x38);
}
 
export var rxNonGroup;
var _x40 = undefined;
if (_x40 !== undefined) {
  var _x39 = (_x40) ? 1 : 0;
}
else {
  var _x39 = 0;
}
var _x42 = undefined;
if (_x42 !== undefined) {
  var _x41 = (_x42) ? 1 : 0;
}
else {
  var _x41 = 0;
}
var rxNonGroup = regexCreate("[^\\\\\\[(]+|\\\\[\\s\\S]?|\\(\\?|\\[(?:[^\\\\\\]]|\\\\.)*\\]", _x39, _x41);
 
 
// Return the pattern as a string
export function source(r) /* (r : regex) -> string */  {
  var _x43 = r;
  return regexSource(_x43);
}
 
 
// How many groups are captured by this regex?
export function groupsCount(r) /* (r : regex) -> int */  {
   
  var _x44 = r;
  var s0_1945 = regexSource(_x44);
   
  var _x46 = undefined;
  var _x45 = (_x46 !== undefined) ? _x46 : 0;
  var s_1944 = replaceEx_1(s0_1945, rxNonGroup, "", true, _x45);
  return $std_core.count_1(s_1944);
}
 
 
// Create a new _alternative_ regular expression. 
// Matches any of the given patterns but the groups are local to each alternative.
// See "alternative" to find out which alternative was matched. Contains an optimization
// where a common prefix of all patterns is lifted out of the alternative to increase efficiency.
// Takes two optional parameters. Set "ignoreCase" to "True"
// to ignore uppercase/lowercase distinction. If  "multiline" is set to "True", then "^" and "$"
// match also the beginning and end of every line (instead of the entire input).  
// Note: currently only supported in the javascript backend.
export function regexAlt(regexs, ignorecase, multiline) /* (regexs : list<string>, ignorecase : optional<bool>, multiline : optional<bool>) -> regex */  {
  if (ignorecase !== undefined) {
    var _x44 = (ignorecase) ? 1 : 0;
  }
  else {
    var _x44 = 0;
  }
  if (multiline !== undefined) {
    var _x45 = (multiline) ? 1 : 0;
  }
  else {
    var _x45 = 0;
  }
  return regexCreateAlt($std_core.unvlist(regexs), _x44, _x45);
}
 
 
// Replace the first occurrence of "regex" by the result of the replacement fun "repl" in a string "s".
export function replace(s, regex0, repl, start) /* forall<e> (s : string, regex : regex, repl : (matched : matched) -> e string, start : optional<int>) -> e string */  {
  var _x46 = (start !== undefined) ? start : 0;
  return replaceEx(s, regex0, repl, false, _x46);
}
 
 
// Replace the first occurrence of "regex" by the result a replacement string "repl" in a string "s".
// The replacement string can contain `$$` for a `$` sign, `$n` for a capture group,
// `$&` for the entire match (`==$0`).
export function replace_1(s, regex0, repl, start) /* (s : string, regex : regex, repl : string, start : optional<int>) -> string */  {
  var _x47 = (start !== undefined) ? start : 0;
  return replaceEx_1(s, regex0, repl, false, _x47);
}
 
 
// Split a string "s" in at most "n" parts using a regular expression "r" as separator.
export function split(s, r, n, start) /* (s : string, r : regex, n : optional<int>, start : optional<int>) -> vector<string> */  {
  var _x49 = (n !== undefined) ? n : 2147483647;
  var _x48 = $std_core._int_le(_x49,0);
  if (_x48) {
    return [];
  }
  else {
    var _x51 = (start !== undefined) ? start : 0;
    var _x50 = $std_core._int_gt(_x51,($std_core.count_1(s)));
    if (_x50) {
      return $std_core.vector_initz(1, function(___wildcard__1854__30 /* ssize_t */ ) {
          return s;
        });
    }
    else {
      var _x52 = r;
      var _x55 = (n !== undefined) ? n : 2147483647;
      var _x54 = $std_core._int_eq(_x55,2147483647);
      if (_x54) {
        var _x53 = 0;
      }
      else {
        var _x53 = (n !== undefined) ? n : 2147483647;
      }
      var _x58 = (start !== undefined) ? start : 0;
      var _x57 = $std_core._int_ge(_x58,0);
      if (_x57) {
        var _x56 = (start !== undefined) ? start : 0;
      }
      else {
        var _x56 = 0;
      }
      return regexSplit(_x52, s, _x53, _x56);
    }
  }
}
 
export function _ctail_splitExcludeX(s, splitr, acc, _acc) /* (s : string, splitr : regex, acc : string, ctail<list<string>>) -> div list<string> */  { tailcall: while(1)
{
  if ((s === (""))) {
    return $std_core_types._ctail_resolve(_acc,($std_core.Cons(acc, $std_core.Nil)));
  }
  else {
    var _x60 = splitr;
    var _x64 = undefined;
    var _x63 = (_x64 !== undefined) ? _x64 : 0;
    var _x62 = $std_core._int_ge(_x63,0);
    if (_x62) {
      var _x65 = undefined;
      var _x61 = (_x65 !== undefined) ? _x65 : 0;
    }
    else {
      var _x61 = 0;
    }
    var _x59 = regexExec(_x60, s, _x61);
    if (_x59 === null) {
       
      if ($std_core._int_le(1,0)) {
        var right_1965 = "";
      }
      else {
        var right_1965 = $compat.substr2(s, 0, 1);
      }
      {
        // tail call
        var _x66 = $compat.substr1(s, 1);
        var _x67 = $std_core._lp__plus__plus__1_rp_(acc, right_1965);
        s = _x66;
        acc = _x67;
        continue tailcall;
      }
    }
    else {
       
      var _x68 = _x59.value.groups;
      var i0_1972 = groupsMatchedOn(_x68, 1);
      if ($std_core._int_ne(i0_1972,0)) {
         
        var _x69 = _x59.value.next;
        var _x68 = $std_core._int_le(_x69,0);
        if (_x68) {
          var right0_1976 = "";
        }
        else {
          var _x70 = _x59.value.next;
          var right0_1976 = $compat.substr2(s, 0, _x70);
        }
        {
          // tail call
          var _x69 = _x59.value.next;
          var _x68 = $compat.substr1(s, _x69);
          var _x70 = $std_core._lp__plus__plus__1_rp_(acc, right0_1976);
          s = _x68;
          acc = _x70;
          continue tailcall;
        }
      }
      else {
         
        var _ctail_2000 = undefined;
         
        var _ctail_2001 = $std_core.Cons(acc, _ctail_2000);
        {
          // tail call
          var _x72 = _x59.value.next;
          var _x71 = $compat.substr1(s, _x72);
          var _x73 = "";
          var _x74 = $std_core_types._ctail_link(_acc,_ctail_2001,({value: _ctail_2001, field: "tail"}));
          s = _x71;
          acc = _x73;
          _acc = _x74;
          continue tailcall;
        }
      }
    }
  }
}}
 
export function splitExcludeX(s0, splitr0, acc0) /* (s : string, splitr : regex, acc : string) -> div list<string> */  {
  return _ctail_splitExcludeX(s0, splitr0, acc0, $std_core_types._ctail_nil());
}
 
 
// Split a string "s" over separator "sep" where "sep" does not occur in 
// _tokens_ matching "exclude".
// For example: `splitExclude("comma,'sep,arated',values", regex(","),regex("'[^']*'|[^',]"))`
export function splitExclude(s, sep, exclude) /* (s : string, sep : regex, exclude : regex) -> div list<string> */  {
  if ((s === (""))) {
    return $std_core.Nil;
  }
  else {
     
    var _x75 = exclude;
    var right2_1992 = regexSource(_x75);
     
    var left1_1989 = $std_core._lp__plus__plus__1_rp_("^(?:((?:", right2_1992);
     
    var left0_1987 = $std_core._lp__plus__plus__1_rp_(left1_1989, ")+)|(");
     
    var _x76 = sep;
    var right0_1988 = regexSource(_x76);
     
    var left_1985 = $std_core._lp__plus__plus__1_rp_(left0_1987, right0_1988);
     
    var regex0_1982 = $std_core._lp__plus__plus__1_rp_(left_1985, "))");
     
    var _x78 = undefined;
    if (_x78 !== undefined) {
      var _x77 = (_x78) ? 1 : 0;
    }
    else {
      var _x77 = 0;
    }
    var _x80 = undefined;
    if (_x80 !== undefined) {
      var _x79 = (_x80) ? 1 : 0;
    }
    else {
      var _x79 = 0;
    }
    var splitr = regexCreate(regex0_1982, _x77, _x79);
    return splitExcludeX(s, splitr, "");
  }
}