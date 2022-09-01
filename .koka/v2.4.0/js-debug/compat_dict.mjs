// Koka generated module: "compat/dict", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_num_int32 from './std_num_int32.mjs';
import * as $std_text_regex from './std_text_regex.mjs';
 
// externals
/*---------------------------------------------------------------------------
  Copyright 2012 Microsoft Corporation.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/
// make a shallow copy
function $dictCopy(obj) {
    var newobj = {};
    for( var prop in obj) newobj[prop] = obj[prop];
    return newobj;
  }
  
  // get the fields of an object
  function $dictKeys(obj) {
    var props = [];
    for (var prop in obj) {
      if (obj.hasOwnProperty(prop)) props.push(prop);
    } 
    return props;
  }
  
 
// type declarations
// type dict
// type mdict
 
// declarations
 
export function dictCopy(d) /* forall<a> (d : dict<a>) -> dict<a> */  {
  return $dictCopy(d);
}
 
 
// Return the keys in a dictionary
export function keys(d) /* forall<a,h> (d : mdict<h,a>) -> (read<h>) vector<string> */  {
  return $dictKeys(d);
}
 
 
// Return the keys in a
export function keys_1(d) /* forall<a> (d : dict<a>) -> vector<string> */  {
  return $dictKeys(d);
}
 
export function unsafeDictGet(d, key) /* forall<a> (d : dict<a>, key : string) -> a */  {
  return (d)[key];
}
 
export function unsafeDictAdd(d, key, value) /* forall<a> (d : dict<a>, key : string, value : a) -> () */  {
  return (d)[key] = (value);
}
 
export function containsKey(md, s) /* forall<a,h> (md : mdict<h,a>, s : string) -> (read<h>) bool */  {
  return ((md)[s]!==undefined);
}
 
export function containsKey_1(d, key) /* forall<a> (d : dict<a>, key : string) -> bool */  {
  return ((d)[key]!==undefined);
}
 
export function unsafeIndex(md, s) /* forall<a,h> (md : mdict<h,a>, s : string) -> (read<h>) a */  {
  return ((md)[s]);
}
 
export function copy(md) /* forall<h,a> (md : mdict<h,a>) -> <alloc<h>,read<h>> mdict<h,a> */  {
  return $dictCopy(md);
}
 
 
// Freeze a mutable dictionary into a ":dict"
export function freeze(md) /* forall<h,a> (md : mdict<h,a>) -> <alloc<h>,read<h>> dict<a> */  {
  return $dictCopy(md);
}
 
export function isNull(x) /* forall<a> (x : a) -> bool */  {
  return (x == null);
}
 
 
// Create a mutable string dictionary
export function mdict() /* forall<h,a> () -> (alloc<h>) mdict<h,a> */  {
  return {};
}
 
 
// Execute action for each key/value pair in a dictionary.
export function foreach(d, action) /* forall<a,e> (d : dict<a>, action : (string, a) -> e ()) -> e () */  {
  return $std_core.foreach_3(keys_1(d), function(k /* string */ ) {
      return action(k, unsafeDictGet(d, k));
    });
}
 
 
// Append two dictionaries.
export function _lp__plus__rp_(d1, d2) /* forall<a> (d1 : dict<a>, d2 : dict<a>) -> dict<a> */  {
   
  var dnew = dictCopy(d1);
   
  $std_core.foreach_3(keys_1(d2), function(k /* string */ ) {
       
      var value_2252 = unsafeDictGet(d2, k);
      return unsafeDictAdd(dnew, k, value_2252);
    });
  return dnew;
}
 
 
// Index into a string dictionary
export function _lp__lb__rb__rp_(md, s) /* forall<a,h> (md : mdict<h,a>, s : string) -> (read<h>) maybe<a> */  {
  var _x0 = containsKey(md, s);
  if (_x0) {
    return $std_core_types.Just(unsafeIndex(md, s));
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// Assign to a string dictionary
export function _lp__lb__rb__1_rp_(md, s, assigned) /* forall<a,h> (md : mdict<h,a>, s : string, assigned : a) -> (write<h>) () */  {
  return (md)[s] = assigned;
}
 
 
// Index into a string dictionary
export function _lp__lb__rb__2_rp_(d, key) /* forall<a> (d : dict<a>, key : string) -> maybe<a> */  {
  var _x1 = containsKey_1(d, key);
  if (_x1) {
    return $std_core_types.Just(unsafeDictGet(d, key));
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// Create a new empty dictionary
export function dict() /* forall<a> () -> dict<a> */  {
  return {};
}
 
 
// Create a new dictionary from a ":list" of key value pairs.
export function dict_1(elems) /* forall<a> (elems : list<(string, a)>) -> dict<a> */  {
   
  var d = dict();
   
  $std_core.foreach(elems, function(elem /* (string, 974) */ ) {
      return unsafeDictAdd(d, elem.fst, elem.snd);
    });
  return d;
}
 
 
// Create a new dictionary from a ":vector" of key/value pairs.
export function dict_2(elems) /* forall<a> (elems : vector<(string, a)>) -> dict<a> */  {
   
  var d = dict();
   
  $std_core.foreach_3(elems, function(elem /* (string, 1054) */ ) {
      return unsafeDictAdd(d, elem.fst, elem.snd);
    });
  return d;
}
 
 
// monadic lift
export function _mlift2257_map(k, _y_2255) /* forall<a,e> (k : string, a) -> e (string, a) */  {
  return $std_core_types._Tuple2_(k, _y_2255);
}
 
 
// monadic lift
export function _mlift2258_map(_y_2256) /* forall<a,e> (vector<(string, a)>) -> e dict<a> */  {
   
  var d = dict();
   
  $std_core.foreach_3(_y_2256, function(elem /* (string, 1456) */ ) {
      return unsafeDictAdd(d, elem.fst, elem.snd);
    });
  return d;
}
 
 
// Map a function over the values in a dictionary.
export function map(d, f) /* forall<a,b,e> (d : dict<a>, f : (string, a) -> e b) -> e dict<b> */  {
   
  var x_2260 = $std_core.map_7(keys_1(d), function(k /* string */ ) {
       
      var x0_2263 = f(k, unsafeDictGet(d, k));
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_2255 /* 1456 */ ) {
          return $std_core_types._Tuple2_(k, _y_2255);
        });
      }
      else {
        return $std_core_types._Tuple2_(k, x0_2263);
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2256 /* vector<(string, 1456)> */ ) {
       
      var d0 = dict();
       
      $std_core.foreach_3(_y_2256, function(elem /* (string, 1456) */ ) {
          return unsafeDictAdd(d0, elem.fst, elem.snd);
        });
      return d0;
    });
  }
  else {
     
    var d1 = dict();
     
    $std_core.foreach_3(x_2260, function(elem0 /* (string, 1456) */ ) {
        return unsafeDictAdd(d1, elem0.fst, elem0.snd);
      });
    return d1;
  }
}
 
 
// Convert a dictionary to a vector of key/value pairs
export function vector(d) /* forall<a,h> (d : mdict<h,a>) -> (read<h>) vector<(string, a)> */  {
  return $std_core.map_7(keys(d), function(key /* string */ ) {
      return $std_core_types._Tuple2_(key, unsafeIndex(d, key));
    });
}
 
 
// Convert a dictionary to a vector of key/value pairs
export function vector_1(d) /* forall<a> (d : dict<a>) -> vector<(string, a)> */  {
  return $std_core.map_7(keys_1(d), function(key /* string */ ) {
      return $std_core_types._Tuple2_(key, unsafeDictGet(d, key));
    });
}
 
 
// Convert a dictionary to a list of key/value pairs
export function list(d) /* forall<a,h> (d : mdict<h,a>) -> (read<h>) list<(string, a)> */  {
   
  var v_2247 = $std_core.map_7(keys(d), function(key /* string */ ) {
      return $std_core_types._Tuple2_(key, unsafeIndex(d, key));
    });
  return $std_core.vlist(v_2247);
}
 
 
// Convert a dictionary to a list of key/value pairs
export function list_1(d) /* forall<a> (d : dict<a>) -> list<(string, a)> */  {
   
  var v_2249 = $std_core.map_7(keys_1(d), function(key /* string */ ) {
      return $std_core_types._Tuple2_(key, unsafeDictGet(d, key));
    });
  return $std_core.vlist(v_2249);
}