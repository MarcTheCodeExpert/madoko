// Koka generated module: "std/os/env", koka version: 2.4.0
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
import * as $compat_log from './compat_log.mjs';
import * as $compat_regex from './compat_regex.mjs';
import * as $common from './common.mjs';
 
// externals
 
// type declarations
 
// declarations
 
export function os_get_argv() /* () -> ndet vector<string> */  {
  return (typeof process !== 'undefined' ? process.argv : []);
}
 
export function os_get_env() /* () -> ndet vector<string> */  {
  return (typeof process !== 'undefined' ? (function(){ var env = []; Object.keys(process.env).forEach(function(name){ env.push(name); env.push(process.env[name]); }); return env; })() : []);
}
 
 
// The backend compiler name.
export function get_cc_name() /* () -> ndet string */  {
  return "js";
}
 
 
// The current compiler version.
export function get_compiler_version() /* () -> ndet string */  {
  return "2";
}
 
 
// Return the processor maximum address size in bits (`8*sizeof(void*)`). This is usually
// equal to the `get-cpu-arch-bits` but may be different on segmented architectures.
export function get_cpu_address_bits() /* () -> ndet int */  {
  return 32;
}
 
 
// Return the main processor architecture: x64, x86, arm64, arm, riscv32, riscv64, alpha, ppc64, etc.
export function get_cpu_arch() /* () -> ndet string */  {
  return $std_core.host();
}
 
 
// Return the processor architecture natural machine word size in bits.
//
// Note: Usually this equals the `get-cpu-object-bits` and `get-cpu-address-bits` on modern cpu's 
// but they can differ on segmented architectures.
// For example, on the old x86 FAR-NEAR model, the addresses are 32-bit but the maximum object size is 16-bit.
// Or on the more recent-[x32 ABI](https://en.wikipedia.org/wiki/X32_ABI) 
// the addresses and objects are 32-bits but the architecture has 64-bit registers.
export function get_cpu_arch_bits() /* () -> ndet int */  {
  return 32;
}
 
 
// Return the available CPU's.
// This is the logical core count including hyper-threaded cores.
export function get_cpu_count() /* () -> ndet int */  {
  return 1;
}
 
 
// Is the byte-order little-endian?
// If not, it is big-endian; other byte orders are not supported.
export function get_cpu_is_little_endian() /* () -> ndet bool */  {
  return true;
}
 
 
// Return the processor maximum object size in bits (`8*sizeof(size_t)`). This is usually
// equal to the `get-cpu-arch-bits` but may be different on segmented architectures.
export function get_cpu_object_bits() /* () -> ndet int */  {
  return 32;
}
 
 
// Return the main OS name: windows, linux, macos, unix, posix, ios, tvos, watchos, unknown.
// Sometimes has a _dash_ subsystem, like: unix-\<freebsd,openbsd,dragonfly,bsd\>, and windows-mingw.
export function get_os_name() /* () -> ndet string */  {
  return $std_core.host();
}
 
export var argv;
var argv = $std_core.delay(function() {
   
  var v_373 = os_get_argv();
  return $std_core.vlist(v_373);
});
 
export function _ctail_to_tuples(xs, _acc) /* (xs : list<string>, ctail<env>) -> env */  { tailcall: while(1)
{
  if (xs !== null && xs.tail !== null) {
     
    var _ctail_376 = undefined;
     
    var _ctail_377 = $std_core.Cons($std_core_types._Tuple2_(xs.head, xs.tail.head), _ctail_376);
    {
      // tail call
      var _x0 = $std_core_types._ctail_link(_acc,_ctail_377,({value: _ctail_377, field: "tail"}));
      xs = xs.tail.tail;
      _acc = _x0;
      continue tailcall;
    }
  }
  else if (xs !== null && xs.tail === null) {
    return $std_core_types._ctail_resolve(_acc,($std_core.Cons($std_core_types._Tuple2_(xs.head, ""), $std_core.Nil)));
  }
  else {
    return $std_core_types._ctail_resolve(_acc,($std_core.Nil));
  }
}}
 
export function to_tuples(xs0) /* (xs : list<string>) -> env */  {
  return _ctail_to_tuples(xs0, $std_core_types._ctail_nil());
}
 
export var environ;
var environ = $std_core.delay(function() {
   
  var v_374 = os_get_env();
  return to_tuples($std_core.vlist(v_374));
});
 
 
// The unprocessed command line that was used to start this program.
// On ''Node'' the first arguments will often be of the form `["node","interactive.js",...]`.
export function get_argv() /* () -> ndet list<string> */  {
  return $std_core.force(argv);
}
 
 
// Return the arguments that were passed to program itself.
// Strips off the initial program from the unprocessed command line.
// i.e. If a program started as:
// ````
// > node myprogram.js --flag bla
// ````
// The `arguments` list will be `["--flag","bla"]`
export function get_args() /* () -> ndet list<string> */  {
   
  var is_node = (($std_core.host()) === ("node"));
  var _x1 = $std_core.force(argv);
  if (_x1 !== null) {
    if (is_node) {
       
      var p_375 = $std_os_path.path(_x1.head);
       
      var _x3 = (p_375.parts !== null) ? p_375.parts.head : "";
      var _this_2133 = $std_os_path.split_base(_x3);
      var _x3 = _this_2133.fst;
      var _x2 = (_x3 === ("node"));
    }
    else {
      var _x2 = false;
    }
    if (_x2){
      return $std_core.drop(_x1.tail, 1);
    }
  }
  return $std_core.drop(_x1, 1);
}
 
 
// Get the environment variables for this program
export function get_env() /* () -> ndet env */  {
  return $std_core.force(environ);
}
 
 
// Returns the value of an environment variable `name` (or `Nothing` if not present)
export function get_env_1(name) /* (name : string) -> ndet maybe<string> */  {
  return $std_core.lookup($std_core.force(environ), function(nm /* string */ ) {
      return (nm === name);
    });
}