// Koka generated module: "compat/env", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_text_regex from './std_text_regex.mjs';
import * as $compat_dict from './compat_dict.mjs';
import * as $compat_log from './compat_log.mjs';
import * as $compat from './compat.mjs';
import * as $compat_regex from './compat_regex.mjs';
import * as $common from './common.mjs';
import * as $std_os_flags from './std_os_flags.mjs';
import * as $compat_path from './compat_path.mjs';
 
// externals
 
// type declarations
 
// declarations
 
export function getArgv() /* () -> vector<string> */  {
  return (typeof process !== 'undefined' ? process.argv : []);
}
 
export function getEnvironment() /* () -> compat/dict/dict<string> */  {
  return (typeof process !== 'undefined' ? process.env : {});
}
 
 
// The unprocessed command line that was used to start this program.
// On ''Node'' the first arguments will often be of the form "[""node"",""interactive.js"",...]".
export var argv;
 
var v_181 = getArgv();
var argv = $std_core.vlist(v_181);
 
 
// Return the arguments that were passed to program itself.
// Strips off the initial program from the unprocessed command line.
// i.e. If a program started as:
//     > node myprogram.js --flag bla
// The "arguments" list will be "[""--flag"",""bla""]"
export var $arguments;
match: {
  if (argv !== null) {
    if ((($compat_path.noext($compat_path.basename(argv.head))) === ("node"))){
      var $arguments = $std_core.drop(argv.tail, 1);
      break match;
    }
  }
  var $arguments = $std_core.drop(argv, 1);
}
 
 
// The environment variables for this program
export var env;
var env = getEnvironment();
 
 
// Returns the value of an environment variable "name".
// Returns "default" (= |""|) if the environment variable was not present.
export function getEnv(name, $default) /* (name : string, default : optional<string>) -> string */  {
  var _x0 = $compat_dict.containsKey_1(env, name);
  if (_x0) {
    return $compat_dict.unsafeDictGet(env, name);
  }
  else {
    var _x1 = $std_core_types.Nothing;
    if (_x1 === null) {
      return ($default !== undefined) ? $default : "";
    }
    else {
      return _x1.value;
    }
  }
}