// Koka generated module: "compat/log", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_num_int32 from './std_num_int32.mjs';
import * as $std_text_regex from './std_text_regex.mjs';
import * as $compat_dict from './compat_dict.mjs';
import * as $compat from './compat.mjs';
 
// externals
 
// type declarations
 
// declarations
 
export var logDict;
var logDict = $compat_dict.mdict();
 
 
// Get the current log. Since this is in the "io" effect, "withLog" is preferred.
export function getLog(logName) /* (logName : string) -> io string */  {
   
  var m_1055 = $std_core_hnd._open_none2($compat_dict._lp__lb__rb__rp_, logDict, logName);
  return (m_1055 === null) ? "" : m_1055.value;
}
 
 
// monadic lift
export function _mlift1078_log(logName, message, _c_1068) /* (logName : string, message : string, string) -> () */  {
  return $compat_dict._lp__lb__rb__1_rp_(logDict, logName, $std_core._lp__plus__plus__1_rp_(_c_1068, $std_core._lp__plus__plus__1_rp_(message, "\n")));
}
 
 
// Total function that logs a message in a certain log "logName".
// Has no observable effect but see "withLog".
export function log(logName, message) /* (logName : string, message : string) -> () */  {
   
  var b_1075 = $compat_dict.containsKey(logDict, "nolog");
  if (b_1075) {
    return $std_core_types._Unit_;
  }
  else {
    var _x0 = $compat_dict.containsKey(logDict, logName);
    if (_x0) {
       
      var m_1059 = $compat_dict._lp__lb__rb__rp_(logDict, logName);
       
      var next_1083 = function(_c_1068 /* string */ ) {
        return $compat_dict._lp__lb__rb__1_rp_(logDict, logName, $std_core._lp__plus__plus__1_rp_(_c_1068, $std_core._lp__plus__plus__1_rp_(message, "\n")));
      };
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(next_1083);
      }
      else {
        var _x1 = (m_1059 === null) ? "" : m_1059.value;
        return next_1083(_x1);
      }
    }
    else {
      return $std_core_types._Unit_;
    }
  }
}
 
 
// Disable logging completely.
export function nolog() /* () -> (st<global>) () */  {
  return $compat_dict._lp__lb__rb__1_rp_(logDict, "nolog", "");
}
 
 
// monadic lift
export function _mlift1079_withLog(_c_1072, x, _c_1073) /* forall<a> (string, x : a, ()) -> (string, a) */  {
  return $std_core_types._Tuple2_(_c_1072, x);
}
 
 
// monadic lift
export function _mlift1080_withLog(logName, oldLog, x, _c_1072) /* forall<a> (logName : string, oldLog : maybe<string>, x : a, string) -> (string, a) */  {
   
  if (oldLog === null) {
    var x0_1088 = $std_core_types._Unit_;
  }
  else {
    var x0_1088 = $compat_dict._lp__lb__rb__1_rp_(logDict, logName, oldLog.value);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_1073 /* () */ ) {
      return $std_core_types._Tuple2_(_c_1072, x);
    });
  }
  else {
    return $std_core_types._Tuple2_(_c_1072, x);
  }
}
 
 
// Encloses a possibly total "action" and returns its result together
// with the contents of a log named "logName". The contents of the log
// are non-deterministically determined. However, in practice, they contain
// any messages that were recorded in the "action" by calls to "log".
// However, if "nolog" was called, the log is always empty.
export function withLog(logName, action) /* forall<a,e> (logName : string, action : () -> <ndet|e> a) -> <ndet|e> (string, a) */  {
   
  var oldLog = $compat_dict._lp__lb__rb__rp_(logDict, logName);
   
  $compat_dict._lp__lb__rb__1_rp_(logDict, logName, "");
   
  var x = action();
   
  var m_1062 = $compat_dict._lp__lb__rb__rp_(logDict, logName);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_1072 /* string */ ) {
      return _mlift1080_withLog(logName, oldLog, x, _c_1072);
    });
  }
  else {
    var _x2 = (m_1062 === null) ? "" : m_1062.value;
    return _mlift1080_withLog(logName, oldLog, x, _x2);
  }
}