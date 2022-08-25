// Koka generated module: "v1/std/data/dict", koka version: 2.4.0
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
  Copyright 2012-2021, Microsoft Research, Daan Leijen.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the LICENSE file at the root of this distribution.
---------------------------------------------------------------------------*/
$std_data_dict = $std_core_types._export( $std_data_dict, {
                    "_dict_assign": _dict_assign,
                 });
                 
// make a shallow copy
function _dict_copy(obj) {
  var newobj = {};
  for( var prop in obj) {
    if (obj.hasOwnProperty(prop)) newobj[prop] = obj[prop];
  }
  return newobj;
}
// get the fields of an object
function _dict_keys(obj) {
  var props = [];
  for (var prop in obj) {
    if (prop[0]==="/") props.push(prop.substr(1));
  } 
  return props;
}
// clear 
function _dict_clear(obj) {
  for (var prop in obj) {
    if (prop[0]==="/") delete obj[prop];
  }
}
function _dict_assign(obj,key,val) {
  if (obj['/'+key] === undefined) obj._count++;
  obj['/'+key] = val;
}
 
// type declarations
// type dict
// type mdict
 
// declarations
 
export function dict_copy(d) /* forall<a> (d : dict<a>) -> dict<a> */  {
  return _dict_copy(d);
}
 
 
// Return the keys in a dictionary
export function keys(d) /* forall<a,h> (d : mdict<h,a>) -> (read<h>) vector<string> */  {
  return _dict_keys(d);
}
 
 
// Return the keys in a
export function keys_1(d) /* forall<a> (d : dict<a>) -> vector<string> */  {
  return _dict_keys(d);
}
 
export function unsafe_dict_get(d, key) /* forall<a> (d : dict<a>, key : string) -> a */  {
  return ((d)['/' + key]);
}
 
export function unsafe_dict_add(d, key, value) /* forall<a> (d : dict<a>, key : string, value : a) -> () */  {
  return _dict_assign(d,key,value);
}
 
export function contains_key(md, s) /* forall<a,h> (md : mdict<h,a>, s : string) -> (read<h>) bool */  {
  return ((md)['/' + s]!==undefined);
}
 
export function contains_key_1(d, key) /* forall<a> (d : dict<a>, key : string) -> bool */  {
  return ((d)['/' + key]!==undefined);
}
 
export function unsafe_index(md, s) /* forall<a,h> (md : mdict<h,a>, s : string) -> (read<h>) a */  {
  return ((md)['/' + s]);
}
 
export function clear(md) /* forall<a,h> (md : mdict<h,a>) -> (write<h>) () */  {
  return _dict_clear(md);
}
 
export function copy(md) /* forall<h,a> (md : mdict<h,a>) -> <alloc<h>,read<h>> mdict<h,a> */  {
  return _dict_copy(md);
}
 
export function count(md) /* forall<a,h> (md : mdict<h,a>) -> int */  {
  return md._count;
}
 
 
// Freeze a mutable dictionary into a `:dict`
export function freeze(md) /* forall<h,a> (md : mdict<h,a>) -> <alloc<h>,read<h>> dict<a> */  {
  return _dict_copy(md);
}
 
 
// Create a mutable string dictionary
export function mdict() /* forall<h,a> () -> (alloc<h>) mdict<h,a> */  {
  return { _count: 0 };
}
 
export function remove(md, s) /* forall<a,h> (md : mdict<h,a>, s : string) -> <read<h>,write<h>> () */  {
  return delete md['/'+s];
}
 
 
// Execute action for each key/value pair in a dictionary until
// the action returns `Just`.
export function foreach_while(d, action) /* forall<a,b,e> (d : dict<a>, action : (string, a) -> e maybe<b>) -> e maybe<b> */  {
  return $std_core.foreach_while_3(keys_1(d), function(k /* string */ ) {
      return action(k, unsafe_dict_get(d, k));
    });
}
 
 
// monadic lift
export function _mlift2480_foreach(wild__) /* forall<_a,e> (wild_ : ()) -> e maybe<_a> */  {
  return $std_core_types.Nothing;
}
 
 
// monadic lift
export function _mlift2481_foreach(wild__0) /* forall<_a,e> (wild_0 : maybe<_a>) -> e () */  {
  return $std_core_types._Unit_;
}
 
 
// Execute action for each key/value pair in a dictionary.
export function foreach(d, action) /* forall<a,e> (d : dict<a>, action : (string, a) -> e ()) -> e () */  {
   
  var x_2484 = $std_core.foreach_while_3(keys_1(d), function(k /* string */ ) {
       
      var x_2469 = unsafe_dict_get(d, k);
       
      var x0_2487 = action(k, x_2469);
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
    return $std_core_hnd.yield_extend(function(wild__00 /* maybe<_864> */ ) {
      return $std_core_types._Unit_;
    });
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
 
// Append two dictionaries.
export function _lp__plus__rp_(d1, d2) /* forall<a> (d1 : dict<a>, d2 : dict<a>) -> dict<a> */  {
   
  var dnew = dict_copy(d1);
   
  $std_core.foreach_while_3(keys_1(d2), function(k /* string */ ) {
       
      var x_2471 = unsafe_dict_get(d2, k);
       
      unsafe_dict_add(dnew, k, x_2471);
      return $std_core_types.Nothing;
    });
  return dnew;
}
 
 
// Index into a string dictionary
export function _lp__lb__rb__rp_(md, s) /* forall<a,h> (md : mdict<h,a>, s : string) -> (read<h>) maybe<a> */  {
  var _x0 = contains_key(md, s);
  if (_x0) {
    return $std_core_types.Just(unsafe_index(md, s));
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// Assign to a string dictionary
export function _lp__lb__rb__1_rp_(md, s, assigned) /* forall<a,h> (md : mdict<h,a>, s : string, assigned : a) -> (write<h>) () */  {
  return $std_data_dict._dict_assign(md,s,assigned);
}
 
 
// Index into a string dictionary
export function _lp__lb__rb__2_rp_(d, key) /* forall<a> (d : dict<a>, key : string) -> maybe<a> */  {
  var _x1 = contains_key_1(d, key);
  if (_x1) {
    return $std_core_types.Just(unsafe_dict_get(d, key));
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// Create a new empty dictionary
export function dict() /* forall<a> () -> dict<a> */  {
  return { _count: 0 };
}
 
 
// Create a new dictionary from a `:list` of key value pairs.
export function dict_1(elems) /* forall<a> (elems : list<(string, a)>) -> dict<a> */  {
   
  var d = dict();
   
  $std_core.foreach(elems, function(elem /* (string, 1187) */ ) {
      return unsafe_dict_add(d, elem.fst, elem.snd);
    });
  return d;
}
 
 
// Create a new dictionary from a `:vector` of key/value pairs.
export function dict_2(elems) /* forall<a> (elems : vector<(string, a)>) -> dict<a> */  {
   
  var d = dict();
   
  $std_core.foreach_3(elems, function(elem /* (string, 1267) */ ) {
      return unsafe_dict_add(d, elem.fst, elem.snd);
    });
  return d;
}
 
 
// monadic lift
export function _mlift2482_map(k, _y_2478) /* forall<a,e> (k : string, a) -> e (string, a) */  {
  return $std_core_types._Tuple2_(k, _y_2478);
}
 
 
// monadic lift
export function _mlift2483_map(_y_2479) /* forall<a,e> (vector<(string, a)>) -> e dict<a> */  {
   
  var d = dict();
   
  $std_core.foreach_3(_y_2479, function(elem /* (string, 1669) */ ) {
      return unsafe_dict_add(d, elem.fst, elem.snd);
    });
  return d;
}
 
 
// Map a fun over the values in a dictionary.
export function map(d, f) /* forall<a,b,e> (d : dict<a>, f : (string, a) -> e b) -> e dict<b> */  {
   
  var x_2492 = $std_core.map_7(keys_1(d), function(k /* string */ ) {
       
      var x0_2495 = f(k, unsafe_dict_get(d, k));
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_2478 /* 1669 */ ) {
          return $std_core_types._Tuple2_(k, _y_2478);
        });
      }
      else {
        return $std_core_types._Tuple2_(k, x0_2495);
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2479 /* vector<(string, 1669)> */ ) {
       
      var d0 = dict();
       
      $std_core.foreach_3(_y_2479, function(elem /* (string, 1669) */ ) {
          return unsafe_dict_add(d0, elem.fst, elem.snd);
        });
      return d0;
    });
  }
  else {
     
    var d1 = dict();
     
    $std_core.foreach_3(x_2492, function(elem0 /* (string, 1669) */ ) {
        return unsafe_dict_add(d1, elem0.fst, elem0.snd);
      });
    return d1;
  }
}
 
 
// Convert a dictionary to a vector of key/value pairs
export function vector(d) /* forall<a,h> (d : mdict<h,a>) -> (read<h>) vector<(string, a)> */  {
  return $std_core.map_7(keys(d), function(key /* string */ ) {
      return $std_core_types._Tuple2_(key, unsafe_index(d, key));
    });
}
 
 
// Convert a dictionary to a vector of key/value pairs
export function vector_1(d) /* forall<a> (d : dict<a>) -> vector<(string, a)> */  {
  return $std_core.map_7(keys_1(d), function(key /* string */ ) {
      return $std_core_types._Tuple2_(key, unsafe_dict_get(d, key));
    });
}
 
 
// Convert a dictionary to a list of key/value pairs
export function list(d) /* forall<a,h> (d : mdict<h,a>) -> (read<h>) list<(string, a)> */  {
   
  var v_2464 = $std_core.map_7(keys(d), function(key /* string */ ) {
      return $std_core_types._Tuple2_(key, unsafe_index(d, key));
    });
  return $std_core.vlist(v_2464);
}
 
 
// Convert a dictionary to a list of key/value pairs
export function list_1(d) /* forall<a> (d : dict<a>) -> list<(string, a)> */  {
   
  var v_2466 = $std_core.map_7(keys_1(d), function(key /* string */ ) {
      return $std_core_types._Tuple2_(key, unsafe_dict_get(d, key));
    });
  return $std_core.vlist(v_2466);
}