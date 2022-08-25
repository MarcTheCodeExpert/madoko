// Koka generated module: "compat/array", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_text_regex from './std_text_regex.mjs';
import * as $v1_std_data_dict from './v1_std_data_dict.mjs';
import * as $compat from './compat.mjs';
import * as $compat_regex from './compat_regex.mjs';
import * as $common from './common.mjs';
import * as $v1_std_log from './v1_std_log.mjs';
import * as $std_os_env from './std_os_env.mjs';
import * as $std_data_dict from './std_data_dict.mjs';
import * as $std_os_flags from './std_os_flags.mjs';
import * as $std_num_int64 from './std_num_int64.mjs';
import * as $std_num_float64 from './std_num_float64.mjs';
import * as $std_num_decimal from './std_num_decimal.mjs';
import * as $std_num_ddouble from './std_num_ddouble.mjs';
 
// externals
 
// type declarations
// type array
 
// declarations
 
 
// Return the `index` element of an array. Raises an exception for out-of-bounds access.
// effect before : <read<h>,exn|e> with(hdiv<h,a,e>)--> after: <exn,read<h>,div|_e1>
export function _lp__lb__rb__rp_(self, index) /* forall<h,a,e> (self : array<h,a>, index : int) -> <exn,read<h>|e> a */  {
  return (self)[index];
}
 
 
// Assign to element `i`  in an array `a` . May raise an out-of-bounds exception
export function _lp__lb__rb__1_rp_(a, i, assigned) /* forall<h,a> (a : array<h,a>, i : int, assigned : a) -> <write<h>,exn> () */  {
  return (a)[i] = assigned;
}
 
 
// Return the length of an `:array`.
export function length(self) /* forall<h,a> (self : array<h,a>) -> int */  {
  return (self).length;
}
 
export function unsafe_array(n) /* forall<h,a> (n : int) -> array<h,a> */  {
  return Array(n);
}
 
 
// Copy an array
export function clone(self) /* forall<a,h> (self : array<h,a>) -> (read<h>) array<h,a> */  {
  return (self).slice(0);
}
 
 
// used internally to have non-bound-checked access
export function unsafe_idx(self, index) /* forall<h,a,e> (self : array<h,a>, index : int) -> <read<h>|e> a */  {
  return (self)[index];
}
 
 
// Concatenate an array of strings
export function join(a) /* forall<h> (a : array<h,string>) -> (read<h>) string */  {
  return ((a).join(''));
}
 
 
// Concatenate an array of strings with a separator `sep`
export function join_1(v, sep) /* forall<h> (v : array<h,string>, sep : string) -> (read<h>) string */  {
  return (v).join(sep);
}
 
export function unsafe_assign(a, i, x) /* forall<h,a> (a : array<h,a>, i : int, x : a) -> (write<h>) () */  {
  return (a)[i] = x;
}
 
export function unsafe_freeze(self) /* forall<h,a> (self : array<h,a>) -> (read<h>) vector<a> */  {
  return (self);
}
 
 
// Create a new array of length `n`  with initial elements `a` .
export function array(n, $default) /* forall<h,a> (n : int, default : a) -> array<h,a> */  {
  return Array(n);
}
 
 
// Convert a vector to an array (by making a copy)
export function array_1(v) /* forall<h,a> (v : vector<a>) -> array<h,a> */  {
  return (v).slice();
}
 
 
// monadic lift
export function _mlift1196_array_2(a, wild__) /* forall<_e,a,h> (a : array<h,a>, wild_ : ()) -> <exn,write<h>|_e> array<h,a> */  {
  return a;
}
 
 
// Convert a list to an array.
export function array_2(xs) /* forall<a,h> (xs : list<a>) -> array<h,a> */  {
   
  var n = $std_core.length_1(xs);
   
  var a = $std_core_hnd._open_none1(unsafe_array, n);
   
  var x_1201 = $std_core.foreach_indexed(xs, function(i /* int */ , x0 /* 737 */ ) {
      return $std_core_hnd._open_at3($std_core_hnd._evv_index($std_core._tag_exn), _lp__lb__rb__1_rp_, a, i, x0);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return a;
    });
  }
  else {
    return a;
  }
}
 
 
// Invoke a function `f` for each element in a an array `a`.   
// Note: this can diverge by storing self referential functions in the array
export function foreach(a, f) /* forall<a,e,h> (a : array<h,a>, f : (a) -> <read<h>,div|e> ()) -> <read<h>,div|e> () */  {
   
  var x_1179 = length(a);
  return $std_core.$for(0, $std_core._int_sub(x_1179,1), function(i /* int */ ) {
       
      var x_1205 = unsafe_idx(a, i);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(f);
      }
      else {
        return f(x_1205);
      }
    });
}
 
 
// monadic lift
export function _mlift1197_op(a, acc, i0_1159, _y_1169) /* forall<a,h> (a : array<h,a>, acc : list<a>, i0.1159 : int, a) -> <exn,read<h>,div> list<a> */  {
  return _lift1158_list(a, i0_1159, $std_core.Cons(_y_1169, acc));
}
 
 
// lifted local: list, build
export function _lift1158_list(a0, i, acc0) /* forall<a,h> (a : array<h,a>, i : int, acc : list<a>) -> <exn,read<h>,div> list<a> */  { tailcall: while(1)
{
  if ($std_core._int_ge(i,0)) {
     
    var i0_11590 = $std_core._int_sub(i,1);
     
    var x_1207 = _lp__lb__rb__rp_(a0, i);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_11690 /* 1024 */ ) {
        return _mlift1197_op(a0, acc0, i0_11590, _y_11690);
      });
    }
    else {
      {
        // tail call
        var _x0 = $std_core.Cons(x_1207, acc0);
        i = i0_11590;
        acc0 = _x0;
        continue tailcall;
      }
    }
  }
  else {
    return acc0;
  }
}}
 
 
// Convert an array to a list
export function list(a) /* forall<a,h> (a : array<h,a>) -> (read<h>) list<a> */  {
   
  var len = $std_core_hnd._open_none1(length, a);
   
  var _x10_1194 = $std_core._int_sub(len,1);
  return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core._tag_exn), function(i /* int */ , acc /* list<1024> */ ) {
      return _lift1158_list(a, i, acc);
    }, _x10_1194, $std_core.Nil);
}
 
 
// monadic lift
export function _mlift1198_map(a, i, _y_1175) /* forall<a,e,h> (a : array<h,a>, i : int, a) -> <st<h>,div|e> () */  {
  return unsafe_assign(a, i, _y_1175);
}
 
 
// monadic lift
export function _mlift1199_map(a, f, i, _y_1174) /* forall<a,e,h> (a : array<h,a>, f : (a) -> <st<h>,div|e> a, i : int, a) -> <read<h>,alloc<h>,div,write<h>|e> () */  {
   
  var x_1210 = f(_y_1174);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_1175 /* 1132 */ ) {
      return unsafe_assign(a, i, _y_1175);
    });
  }
  else {
    return unsafe_assign(a, i, x_1210);
  }
}
 
 
// monadic lift
export function _mlift1200_map(a, wild__) /* forall<a,e,h> (a : array<h,a>, wild_ : ()) -> <alloc<h>,div,read<h>,write<h>|e> array<h,a> */  {
  return a;
}
 
 
// Destructively apply function `f`  to each element in an array `a`.   
// Note: this can diverge by storing self referential functions in the array
export function map(a, f) /* forall<a,e,h> (a : array<h,a>, f : (a) -> <st<h>,div|e> a) -> <st<h>,div|e> array<h,a> */  {
   
  var x_1187 = length(a);
   
  var x_1215 = $std_core.$for(0, $std_core._int_sub(x_1187,1), function(i /* int */ ) {
       
      var x0_1218 = unsafe_idx(a, i);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_1174 /* 1132 */ ) {
          return _mlift1199_map(a, f, i, _y_1174);
        });
      }
      else {
        return _mlift1199_map(a, f, i, x0_1218);
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return a;
    });
  }
  else {
    return a;
  }
}
 
 
// Convert an array to a vector (to guarantee safety, a copy is made)
export function vector(self) /* forall<a,h> (self : array<h,a>) -> (read<h>) vector<a> */  {
  return unsafe_freeze(clone(self));
}