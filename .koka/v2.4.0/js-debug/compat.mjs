// Koka generated module: "compat", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_text_regex from './std_text_regex.mjs';
import * as $compat_dict from './compat_dict.mjs';
 
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
 
 
// Does string `s`  contain the character `c`  ?
export function contains(s, c) /* (s : string, c : char) -> bool */  {
  return ((s).indexOf(c) >= 0);
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
 
 
/*
  Return the extension (including the `.`)  
  `extname("foo.ext") == ".ext"`, `extname("bla.") == "."`, `extname("bla") == ""` 
  from path.kk
*/
export function extname(p) /* (p : string) -> string */  {
  return path.extname(p);
}
 
 
// Fold a list from the right, i.e. `foldr([1,2],0,(+)) == 1+(2+0)` 
// Note, "foldr" is less efficient than "foldl" as it reverses the list first.
export function foldr(xs, z, f) /* forall<a,b,e> (xs : list<a>, z : b, f : (a, b) -> e b) -> e b */  {
  return $std_core.foldl($std_core.reverse(xs), z, function(x /* 192 */ , y /* 196 */ ) {
      return f(y, x);
    });
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
 
 
// Return a default value when an exception is raised
export function onExn(value, action) /* forall<a,e> (value : a, action : () -> <exn|e> a) -> e a */  {
  return $std_core.$try(action, function(___wildcard__209__22 /* exception */ ) {
      return value;
    });
}
 
 
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
     
    var n0_715 = $std_core._int_sub(width,n);
     
    if ($std_core._int_le(n0_715,0)) {
      var left_713 = "";
    }
    else {
      var _x0 = (char !== undefined) ? char : 0x0020;
      var left_713 = makeString(n0_715, _x0);
    }
    return $std_core._lp__plus__plus__1_rp_(left_713, s);
  }
}
 
 
// monadic lift
export function _mlift730_concat(_y_725) /* forall<a,e> (list<list<a>>) -> e list<a> */  {
  return $std_core.concat(_y_725);
}
 
 
// Concatenate the result lists from applying a function to all elements
export function concat(xs, f) /* forall<a,b,e> (xs : list<a>, f : (a) -> e list<b>) -> e list<b> */  {
   
  var x_732 = $std_core.map_5(xs, f);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_725 /* list<list<559>> */ ) {
      return $std_core.concat(_y_725);
    });
  }
  else {
    return $std_core.concat(x_732);
  }
}
 
 
// monadic lift
export function _mlift731_foreachUntil(action, xx, _y_726) /* forall<a,b,e> (action : (a) -> e maybe<b>, xx : list<a>, maybe<b>) -> e maybe<b> */  {
  if (_y_726 === null) {
    return foreachUntil(xx, action);
  }
  else {
    return _y_726;
  }
}
 
 
// Invoke "action" for each element of a list while "action" return "Nothing"
export function foreachUntil(xs, action0) /* forall<a,b,e> (xs : list<a>, action : (a) -> e maybe<b>) -> e maybe<b> */  { tailcall: while(1)
{
  if (xs === null) {
    return $std_core_types.Nothing;
  }
  else {
     
    var x0_736 = action0(xs.head);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_7260 /* maybe<608> */ ) {
        return _mlift731_foreachUntil(action0, xs.tail, _y_7260);
      });
    }
    else {
      if (x0_736 === null) {
        {
          // tail call
          xs = xs.tail;
          continue tailcall;
        }
      }
      else {
        return x0_736;
      }
    }
  }
}}
 
 
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
   
  var right_720 = $std_core.show(w);
  if (useCapitals !== undefined) {
    var _x0 = (useCapitals) ? "X" : "x";
  }
  else {
    var _x0 = "X";
  }
  return gformat(i, $std_core._lp__plus__plus__1_rp_(_x0, right_720));
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