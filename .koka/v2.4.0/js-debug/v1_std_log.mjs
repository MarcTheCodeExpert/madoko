// Koka generated module: "v1/std/log", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_text_regex from './std_text_regex.mjs';
import * as $v1_std_data_dict from './v1_std_data_dict.mjs';
 
// externals
 
// type declarations
 
// declarations
 
export var log_dict;
var log_dict = $v1_std_data_dict.mdict();
 
 
// Get the current log. Since this is in the `io` effect, `with-log` is preferred.
export function get_log(log_name) /* (log-name : string) -> io string */  {
  return $std_core.maybe_1($std_core_hnd._open_none2($v1_std_data_dict._lp__lb__rb__rp_, log_dict, log_name), "");
}
 
 
// Total fun that logs a message in a certain log `log-name`.
// Has no observable effect but see `withLog`.
export function log(log_name, message) /* (log-name : string, message : string) -> () */  {
   
  var b_960 = $v1_std_data_dict.contains_key(log_dict, "nolog");
  if (b_960) {
    return $std_core_types._Unit_;
  }
  else {
    var _x0 = $v1_std_data_dict.contains_key(log_dict, log_name);
    if (_x0) {
      return $v1_std_data_dict._lp__lb__rb__1_rp_(log_dict, log_name, $std_core._lp__plus__plus__1_rp_($std_core.maybe_1($v1_std_data_dict._lp__lb__rb__rp_(log_dict, log_name), ""), $std_core._lp__plus__plus__1_rp_(message, "\n")));
    }
    else {
      return $std_core_types._Unit_;
    }
  }
}
 
 
// Log an error (to log `"error"`). This should be used in particular
// to log errors in pure functions that are otherwise ignored.
export function log_error(message) /* (message : string) -> () */  {
  return log("error", message);
}
 
 
// Log a warning (to log `"warning"`). This should be used in particular
// to log warnings in pure functions that are otherwise ignored.
export function log_warning(message) /* (message : string) -> () */  {
  return log("warning", message);
}
 
 
// Disable logging completely.
export function nolog() /* () -> (st<global>) () */  {
  return $v1_std_data_dict._lp__lb__rb__1_rp_(log_dict, "nolog", "");
}
 
 
// monadic lift
export function _mlift963_with_log(l, x, _c_958) /* forall<a> (l : string, x : a, ()) -> (string, a) */  {
  return $std_core_types._Tuple2_(l, x);
}
 
 
// Encloses a possibly total `action` and returns its result together
// with the contents of a log named `log-name`. The contents of the log
// are non-deterministically determined. However, in practice, they contain
// any messages that were recorded in the `action` by calls to `log`.
// However, if `nolog` was called, the log is always empty.
export function with_log(log_name, action) /* forall<a,e> (log-name : string, action : () -> <ndet|e> a) -> <ndet|e> (string, a) */  {
   
  var old_log = $v1_std_data_dict._lp__lb__rb__rp_(log_dict, log_name);
   
  $v1_std_data_dict._lp__lb__rb__1_rp_(log_dict, log_name, "");
   
  var x = action();
   
  var l = $std_core.maybe_1($v1_std_data_dict._lp__lb__rb__rp_(log_dict, log_name), "");
   
  if (old_log === null) {
    var x0_966 = $std_core_types._Unit_;
  }
  else {
    var x0_966 = $v1_std_data_dict._lp__lb__rb__1_rp_(log_dict, log_name, old_log.value);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_958 /* () */ ) {
      return $std_core_types._Tuple2_(l, x);
    });
  }
  else {
    return $std_core_types._Tuple2_(l, x);
  }
}