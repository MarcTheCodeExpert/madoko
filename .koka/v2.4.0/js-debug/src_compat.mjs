// Koka generated module: "src/compat", koka version: 2.4.0
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
import * as $compat_regex from './compat_regex.mjs';
import * as $common from './common.mjs';
import * as $std_os_env from './std_os_env.mjs';
import * as $std_os_flags from './std_os_flags.mjs';
import * as $compat_path from './compat_path.mjs';
import * as $compat_env from './compat_env.mjs';
import * as $compat_array from './compat_array.mjs';
import * as $compat_string from './compat_string.mjs';
 
// externals
 
// type declarations
 
// declarations
 
 
/*
  Operator "+" --> addition of 2 strings
*/
export function _lp__plus__rp_(left, right) /* (left : string, right : string) -> string */  {
  return $std_core._lp__plus__plus__1_rp_(left, right);
}
 
 
/*
  Operator "+" --> addition of 2 list<string>
*/
export function _lp__plus__1_rp_(left, right) /* forall<a> (left : list<a>, right : list<a>) -> list<a> */  {
  return $std_core.append(left, right);
}
 
 
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
 
 
/*
  endsWith function from core.kk
*/
export function endsWith(s, post) /* (s : string, post : string) -> bool */  {
  return ((s).indexOf(post, (s).length - (post).length) !== -1);
}
 
 
/*
  Return the extension (including the `.`)  
  `extname("foo.ext") == ".ext"`, `extname("bla.") == "."`, `extname("bla") == ""` 
  from path.kk
*/
export function extname(p) /* (p : string) -> string */  {
  return path.extname(p);
}
 
 
/*
  helper function for showHex from core.kk
*/
export function gformat(value, format) /* forall<a> (value : a, format : string) -> string */  {
  return $gformat(value, format);
}
 
 
// Does string `s`  contain the character `c`  ?
export function indexOf(s, c) /* (s : string, c : char) -> int */  {
  return ((s).indexOf(c));
}
 
 
// Does string `s`  contain the string `sub`  ?
export function indexOf_1(s, sub) /* (s : string, sub : string) -> int */  {
  return ((s).indexOf(sub));
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
 
 
/*
  startsWith function from core.kk
*/
export function startsWith(s, pre) /* (s : string, pre : string) -> bool */  {
  return s.substr(0,pre.length) === pre;
}
 
export function substr2(s, start, len) /* (s : string, start : int, len : int) -> string */  {
  return s.substr(start, len);
}
 
 
/*
  substring functions operating in csharp and js
  all from core.kk
*/
export function substr1(s, start) /* (s : string, start : int) -> string */  {
  return ((s).substr(start >=1 ? start : 1));
}
 
 
/*
  to lowercase funtion from core.kk
*/
export function toLower(s) /* (s : string) -> string */  {
  return (s).toLowerCase();
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
     
    var n0_439 = $std_core._int_sub(width,n);
     
    if ($std_core._int_le(n0_439,0)) {
      var left_437 = "";
    }
    else {
      var _x0 = (char !== undefined) ? char : 0x0020;
      var left_437 = makeString(n0_439, _x0);
    }
    return $std_core._lp__plus__plus__1_rp_(left_437, s);
  }
}
 
 
/*
  showHex function from core.kk
*/
export function showHex(i, width, useCapitals) /* (i : int, width : optional<int>, useCapitals : optional<bool>) -> string */  {
   
  var _x1 = (width !== undefined) ? width : 1;
  var _x0 = $std_core._int_lt(_x1,0);
  if (_x0) {
    var w = 0;
  }
  else {
    var w = (width !== undefined) ? width : 1;
  }
   
  var right_444 = $std_core.show(w);
  if (useCapitals !== undefined) {
    var _x0 = (useCapitals) ? "X" : "x";
  }
  else {
    var _x0 = "X";
  }
  return gformat(i, $std_core._lp__plus__plus__1_rp_(_x0, right_444));
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