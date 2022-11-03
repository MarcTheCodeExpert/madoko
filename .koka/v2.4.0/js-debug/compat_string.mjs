// Koka generated module: "compat/string", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $compat from './compat.mjs';
import * as $stringcompat from './stringcompat.mjs';
import * as $compat_regex from './compat_regex.mjs';
import * as $compat_path from './compat_path.mjs';
import * as $compat_dict from './compat_dict.mjs';
import * as $compat_log from './compat_log.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $common from './common.mjs';
import * as $std_os_env from './std_os_env.mjs';
import * as $std_os_flags from './std_os_flags.mjs';
import * as $std_text_regex from './std_text_regex.mjs';
import * as $compat_env from './compat_env.mjs';
import * as $std_num_int64 from './std_num_int64.mjs';
import * as $std_num_float64 from './std_num_float64.mjs';
import * as $std_num_decimal from './std_num_decimal.mjs';
import * as $std_num_ddouble from './std_num_ddouble.mjs';
import * as $compat_array from './compat_array.mjs';
 
// externals
 
// type declarations
// type builder
 
// declarations
 
export function unitAppend(b, s) /* forall<h> (b : builder<h>, s : string) -> (write<h>) () */  {
  return ((b).value += (s));
}
 
 
// O(n). Read the current string from a string builder.
export function build(b) /* forall<h> (b : builder<h>) -> (read<h>) string */  {
  return (b).value;
}
 
 
// Create a string builder
export function builder() /* forall<h> () -> (alloc<h>) builder<h> */  {
  return { value: '' };
}
 
 
// Indent all lines a string `s` by `n`. `fill` is used for indentation, by default `" "`.
export function indent(s, n, fill) /* (s : string, n : optional<int>, fill : optional<string>) -> string */  {
  var _x1 = (n !== undefined) ? n : 2;
  var _x0 = $std_core._int_le(_x1,0);
  if (_x0) {
    return s;
  }
  else {
     
    var _x2 = (fill !== undefined) ? fill : " ";
    var _x3 = (n !== undefined) ? n : 2;
    var pre = $std_core.repeatz(_x2, $std_core.ssize__t(_x3));
     
    var v_17126 = ((s).split(("\n")));
     
    var xs_1182 = $std_core.map_5($std_core.vlist(v_17126), function(line /* string */ ) {
        return $std_core._lp__plus__plus__1_rp_(pre, line);
      });
    if (xs_1182 === null) {
      return "";
    }
    else {
      return $std_core._lift17203_unlines(xs_1182.tail, xs_1182.head);
    }
  }
}
 
 
// monadic lift
export function _mlift1225_jaro_match(_y_1199, _y_1200) /* forall<_h,h1> (int, int) -> <local<h1>,exn,read<_h>,write<_h>,alloc<_h>> (int, int) */  {
  return $std_core_types._Tuple2_(_y_1199, _y_1200);
}
 
 
// monadic lift
export function _mlift1226_jaro_match(transposes, _y_1199) /* forall<_h,h1> (transposes : local-var<h1,int>, int) -> <local<h1>,exn,read<_h>,write<_h>,alloc<_h>> (int, int) */  {
   
  var x_1239 = ((transposes).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_1200 /* int */ ) {
      return $std_core_types._Tuple2_(_y_1199, _y_1200);
    });
  }
  else {
    return $std_core_types._Tuple2_(_y_1199, x_1239);
  }
}
 
 
// monadic lift
export function _mlift1227_jaro_match(wild__2) /* forall<_h,h1> (wild_2 : ()) -> <local<h1>,exn,write<_h>,read<_h>,alloc<_h>> maybe<()> */  {
  return $std_core_types.Just($std_core_types._Unit_);
}
 
 
// monadic lift
export function _mlift1228_jaro_match(transposes, _y_1191) /* forall<_h,h1> (transposes : local-var<h1,int>, int) -> <local<h1>,exn,write<_h>,read<_h>,alloc<_h>> () */  {
  return ((transposes).value = ($std_core._int_add(_y_1191,1)));
}
 
 
// monadic lift
export function _mlift1229_jaro_match(j1, lastmatch, _c_1193) /* forall<_h,h1> (j1 : int, lastmatch : local-var<h1,int>, ()) -> maybe<()> */  {
   
  var x_1243 = ((lastmatch).value = j1);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__2 /* () */ ) {
      return $std_core_types.Just($std_core_types._Unit_);
    });
  }
  else {
    return $std_core_types.Just($std_core_types._Unit_);
  }
}
 
 
// monadic lift
export function _mlift1230_jaro_match(j1, lastmatch, transposes, _y_1190) /* forall<_h,h1> (j1 : int, lastmatch : local-var<h1,int>, transposes : local-var<h1,int>, int) -> <local<h1>,exn,write<_h>,read<_h>,alloc<_h>> maybe<()> */  {
   
  if ($std_core._int_gt(_y_1190,j1)) {
     
    var x0_1248 = ((transposes).value);
     
    var next0_1249 = function(_y_1191 /* int */ ) {
      return ((transposes).value = ($std_core._int_add(_y_1191,1)));
    };
    if ($std_core_hnd._yielding()) {
      var x_1246 = $std_core_hnd.yield_extend(next0_1249);
    }
    else {
      var x_1246 = next0_1249(x0_1248);
    }
  }
  else {
    var x_1246 = $std_core_types._Unit_;
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_1193 /* () */ ) {
      return _mlift1229_jaro_match(j1, lastmatch, _c_1193);
    });
  }
  else {
    return _mlift1229_jaro_match(j1, lastmatch, x_1246);
  }
}
 
 
// monadic lift
export function _mlift1231_jaro_match(j1, lastmatch, transposes, wild__0) /* forall<_h,h1> (j1 : int, lastmatch : local-var<h1,int>, transposes : local-var<h1,int>, wild_0 : ()) -> <local<h1>,exn,write<_h>,read<_h>,alloc<_h>> maybe<()> */  {
   
  var x_1252 = ((lastmatch).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_1190 /* int */ ) {
      return _mlift1230_jaro_match(j1, lastmatch, transposes, _y_1190);
    });
  }
  else {
    return _mlift1230_jaro_match(j1, lastmatch, transposes, x_1252);
  }
}
 
 
// monadic lift
export function _mlift1232_jaro_match(j1, lastmatch, matches, transposes, _y_1188) /* forall<_h,h1> (j1 : int, lastmatch : local-var<h1,int>, matches : local-var<h1,int>, transposes : local-var<h1,int>, int) -> <local<h1>,exn,write<_h>,read<_h>,alloc<_h>> maybe<()> */  {
   
  var x_1254 = ((matches).value = ($std_core._int_add(_y_1188,1)));
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__0 /* () */ ) {
      return _mlift1231_jaro_match(j1, lastmatch, transposes, wild__0);
    });
  }
  else {
    return _mlift1231_jaro_match(j1, lastmatch, transposes, x_1254);
  }
}
 
 
// monadic lift
export function _mlift1233_jaro_match(j1, lastmatch, matches, transposes, wild__) /* forall<_h,h1> (j1 : int, lastmatch : local-var<h1,int>, matches : local-var<h1,int>, transposes : local-var<h1,int>, wild_ : ()) -> <write<_h>,exn> maybe<()> */  {
   
  var x_1256 = ((matches).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_1188 /* int */ ) {
      return _mlift1232_jaro_match(j1, lastmatch, matches, transposes, _y_1188);
    });
  }
  else {
    return _mlift1232_jaro_match(j1, lastmatch, matches, transposes, x_1256);
  }
}
 
 
// monadic lift
export function _mlift1234_jaro_match(j1, lastmatch, matched, matches, transposes, _y_1186) /* forall<_h,h1> (j1 : int, lastmatch : local-var<h1,int>, matched : compat/array/array<_h,bool>, matches : local-var<h1,int>, transposes : local-var<h1,int>, bool) -> <exn,read<_h>,local<h1>,write<_h>,alloc<_h>> maybe<()> */  {
  if (_y_1186) {
    return $std_core_types.Nothing;
  }
  else {
     
    var x_1258 = $compat_array._lp__lb__rb__1_rp_(matched, j1, true);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
        return _mlift1233_jaro_match(j1, lastmatch, matches, transposes, wild__);
      });
    }
    else {
      return _mlift1233_jaro_match(j1, lastmatch, matches, transposes, x_1258);
    }
  }
}
 
 
// monadic lift
export function _mlift1235_jaro_match(c, j1, lastmatch, matched, matches, transposes, _y_1185) /* forall<_h,h1> (c : char, j1 : int, lastmatch : local-var<h1,int>, matched : compat/array/array<_h,bool>, matches : local-var<h1,int>, transposes : local-var<h1,int>, char) -> exn maybe<()> */  {
  if ((_y_1185 !== c)) {
    return $std_core_types.Nothing;
  }
  else {
     
    var x_1260 = $compat_array._lp__lb__rb__rp_(matched, j1);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_1186 /* bool */ ) {
        return _mlift1234_jaro_match(j1, lastmatch, matched, matches, transposes, _y_1186);
      });
    }
    else {
      return _mlift1234_jaro_match(j1, lastmatch, matched, matches, transposes, x_1260);
    }
  }
}
 
 
// monadic lift
export function _mlift1236_jaro_match(wild__3) /* forall<_h,h1> (wild_3 : maybe<()>) -> <exn,local<h1>,read<_h>,write<_h>,alloc<_h>> () */  {
  return $std_core_types._Unit_;
}
 
 
// monadic lift
export function _mlift1237_jaro_match(matches, transposes, wild__4) /* forall<_h,h1> (matches : local-var<h1,int>, transposes : local-var<h1,int>, wild_4 : ()) -> <exn,local<h1>,read<_h>,write<_h>,alloc<_h>> (int, int) */  {
   
  var x_1262 = ((matches).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_1199 /* int */ ) {
      return _mlift1226_jaro_match(transposes, _y_1199);
    });
  }
  else {
    return _mlift1226_jaro_match(transposes, x_1262);
  }
}
 
export function jaro_match(v, w, lim) /* (v : vector<char>, w : vector<char>, lim : int) -> (int, int) */  {
  return $std_core.try_default($std_core_types._Tuple2_(0, 0), function() {
      return function() {
         
        var _x1_1219 = $std_core.length_2(w);
         
        var matched = $std_core_hnd._open_none2($compat_array.array, _x1_1219, false);
         
        var loc = { value: 0 };
         
        var loc0 = { value: 0 };
         
        var loc1 = { value: 0 };
         
        var x_1270 = $std_core.foreach_indexed_1(v, function(i /* int */ , c /* char */ ) {
             
            var _x20_1222 = $std_core._int_sub(i,lim);
             
            var start = $std_core_hnd._open_none2(function(i0 /* int */ , j /* int */ ) {
                return ($std_core._int_ge(i0,j)) ? i0 : j;
              }, 0, _x20_1222);
             
            var x0_1211 = $std_core.length_2(w);
             
            var _x11_1223 = $std_core._int_sub(x0_1211,1);
             
            var _x21_1224 = $std_core._int_add(i,lim);
             
            var end = $std_core_hnd._open_none2(function(i1 /* int */ , j0 /* int */ ) {
                return ($std_core._int_le(i1,j0)) ? i1 : j0;
              }, _x11_1223, _x21_1224);
             
            var x0_1272 = $std_core.for_while(start, end, function(j1 /* int */ ) {
                 
                var x1_1274 = $std_core._vector_at(w,j1);
                if ($std_core_hnd._yielding()) {
                  return $std_core_hnd.yield_extend(function(_y_1185 /* char */ ) {
                    return _mlift1235_jaro_match(c, j1, loc1, matched, loc0, loc, _y_1185);
                  });
                }
                else {
                  return _mlift1235_jaro_match(c, j1, loc1, matched, loc0, loc, x1_1274);
                }
              });
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(wild__3 /* maybe<()> */ ) {
                return $std_core_types._Unit_;
              });
            }
            else {
              return $std_core_types._Unit_;
            }
          });
         
        if ($std_core_hnd._yielding()) {
          var res1 = $std_core_hnd.yield_extend(function(wild__4 /* () */ ) {
            return _mlift1237_jaro_match(loc0, loc, wild__4);
          });
        }
        else {
          var res1 = _mlift1237_jaro_match(loc0, loc, x_1270);
        }
         
        var res0 = $std_core_hnd.prompt_local_var(loc1, res1);
         
        var res = $std_core_hnd.prompt_local_var(loc0, res0);
        return $std_core_hnd.prompt_local_var(loc, res);
      }();
    });
}
 
export function unitPrepend(b, s) /* forall<h> (b : builder<h>, s : string) -> (write<h>) () */  {
  return ((b).value = (s) + (b).value);
}
 
 
// O(1). Append to a string builder
export function append(b, s) /* forall<h> (b : builder<h>, s : string) -> (write<h>) builder<h> */  {
   
  unitAppend(b, s);
  return b;
}
 
 
// O(1). Prepend a string in front of a string builder
export function prepend(b, s) /* forall<h> (b : builder<h>, s : string) -> (write<h>) builder<h> */  {
   
  unitPrepend(b, s);
  return b;
}
 
 
// monadic lift
export function _mlift1238_with_builder(b, wild__) /* forall<_h,e> (b : builder<_h>, wild_ : ()) -> <st<_h>|e> string */  {
  return build(b);
}
 
 
// Do `action` with a given `:builder` and return the `:string` that was built.
export function with_builder(action) /* forall<e> (action : forall<h> (b : builder<h>) -> <st<h>|e> ()) -> e string */  {
   
  var b = builder();
   
  var x_1277 = action(b);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__ /* () */ ) {
      return build(b);
    });
  }
  else {
    return build(b);
  }
}