// Koka generated module: "compat/flags", koka version: 2.4.0
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
import * as $std_os_flags from './std_os_flags.mjs';
import * as $compat_path from './compat_path.mjs';
import * as $compat_env from './compat_env.mjs';
import * as $std_os_env from './std_os_env.mjs';
import * as $compat_array from './compat_array.mjs';
import * as $compat_string from './compat_string.mjs';
 
// externals
 
// type declarations
// type flagKind
export function Flg(set) /* forall<a> (set : (a) -> a) -> flagKind<a> */  {
  return { _tag: 1, set: set };
}
export function Arg(arg) /* forall<a> (arg : string) -> flagKind<a> */  {
  return { _tag: 2, arg: arg };
}
export const End = { _tag: 3 }; // forall<a> flagKind<a>
export function Unknown(arg) /* forall<a> (arg : string) -> flagKind<a> */  {
  return { _tag: 4, arg: arg };
}
export function $Error(msg) /* forall<a> (msg : string) -> flagKind<a> */  {
  return { _tag: 5, msg: msg };
}
// type optionArg
export function Flag($default) /* forall<a> (default : (a, bool) -> a) -> optionArg<a> */  {
  return { _tag: 1, $default: $default };
}
export function Req(parse, help) /* forall<a> (parse : (a, string) -> a, help : string) -> optionArg<a> */  {
  return { _tag: 2, parse: parse, help: help };
}
export function Opt(parse, help) /* forall<a> (parse : (a, maybe<string>) -> a, help : string) -> optionArg<a> */  {
  return { _tag: 3, parse: parse, help: help };
}
// type option
export function Option(shortNames, longNames, arg, help, llongNames) /* forall<a> (shortNames : string, longNames : list<string>, arg : optionArg<a>, help : string, llongNames : list<string>) -> option<a> */  {
  return { shortNames: shortNames, longNames: longNames, arg: arg, help: help, llongNames: llongNames };
}
// type optionOrder
export const Permute = { _tag: 1 }; // forall<a> optionOrder<a>
export const Preorder = { _tag: 2 }; // forall<a> optionOrder<a>
export function Wrap(wrap) /* forall<a> (wrap : (string) -> a) -> optionOrder<a> */  {
  return { _tag: 3, wrap: wrap };
}
// type testOptions
export function TestOptions(verbose, version, name, output, $arguments) /* (verbose : bool, version : bool, name : string, output : string, arguments : list<string>) -> testOptions */  {
  return { verbose: verbose, version: version, name: name, output: output, $arguments: $arguments };
}
 
// declarations
 
 
// Automatically generated. Tests for the `Flg` constructor of the `:flagKind` type.
export function is_flg(flagKind) /* forall<a> (flagKind : flagKind<a>) -> bool */  {
  return (flagKind._tag === 1);
}
 
 
// Automatically generated. Tests for the `Arg` constructor of the `:flagKind` type.
export function is_arg(flagKind) /* forall<a> (flagKind : flagKind<a>) -> bool */  {
  return (flagKind._tag === 2);
}
 
 
// Automatically generated. Tests for the `End` constructor of the `:flagKind` type.
export function is_end(flagKind) /* forall<a> (flagKind : flagKind<a>) -> bool */  {
  return (flagKind._tag === 3);
}
 
 
// Automatically generated. Tests for the `Unknown` constructor of the `:flagKind` type.
export function is_unknown(flagKind) /* forall<a> (flagKind : flagKind<a>) -> bool */  {
  return (flagKind._tag === 4);
}
 
 
// Automatically generated. Tests for the `Error` constructor of the `:flagKind` type.
export function is_error(flagKind) /* forall<a> (flagKind : flagKind<a>) -> bool */  {
  return (flagKind._tag === 5);
}
 
 
// Automatically generated. Tests for the `Flag` constructor of the `:optionArg` type.
export function is_flag(optionArg) /* forall<a> (optionArg : optionArg<a>) -> bool */  {
  return (optionArg._tag === 1);
}
 
 
// Automatically generated. Tests for the `Req` constructor of the `:optionArg` type.
export function is_req(optionArg) /* forall<a> (optionArg : optionArg<a>) -> bool */  {
  return (optionArg._tag === 2);
}
 
 
// Automatically generated. Tests for the `Opt` constructor of the `:optionArg` type.
export function is_opt(optionArg) /* forall<a> (optionArg : optionArg<a>) -> bool */  {
  return (optionArg._tag === 3);
}
 
 
// Automatically generated. Retrieves the `shortNames` constructor field of the `:option` type.
export function shortNames(option) /* forall<a> (option : option<a>) -> string */  {
  return option.shortNames;
}
 
 
// Automatically generated. Retrieves the `longNames` constructor field of the `:option` type.
export function longNames(option) /* forall<a> (option : option<a>) -> list<string> */  {
  return option.longNames;
}
 
 
// Automatically generated. Retrieves the `arg` constructor field of the `:option` type.
export function arg(option) /* forall<a> (option : option<a>) -> optionArg<a> */  {
  return option.arg;
}
 
 
// Automatically generated. Retrieves the `help` constructor field of the `:option` type.
export function help(option) /* forall<a> (option : option<a>) -> string */  {
  return option.help;
}
 
 
// Automatically generated. Retrieves the `llongNames` constructor field of the `:option` type.
export function llongNames(option) /* forall<a> (option : option<a>) -> list<string> */  {
  return option.llongNames;
}
 
export function _copy(_this, shortNames0, longNames0, arg0, help0, llongNames0) /* forall<a> (option<a>, shortNames : optional<string>, longNames : optional<list<string>>, arg : optional<optionArg<a>>, help : optional<string>, llongNames : optional<list<string>>) -> option<a> */  {
  if (shortNames0 !== undefined) {
    var _x0 = shortNames0;
  }
  else {
    var _x0 = _this.shortNames;
  }
  if (longNames0 !== undefined) {
    var _x1 = longNames0;
  }
  else {
    var _x1 = _this.longNames;
  }
  if (arg0 !== undefined) {
    var _x2 = arg0;
  }
  else {
    var _x2 = _this.arg;
  }
  if (help0 !== undefined) {
    var _x3 = help0;
  }
  else {
    var _x3 = _this.help;
  }
  if (llongNames0 !== undefined) {
    var _x4 = llongNames0;
  }
  else {
    var _x4 = _this.llongNames;
  }
  return Option(_x0, _x1, _x2, _x3, _x4);
}
 
 
// Automatically generated. Tests for the `Permute` constructor of the `:optionOrder` type.
export function is_permute(optionOrder) /* forall<a> (optionOrder : optionOrder<a>) -> bool */  {
  return (optionOrder._tag === 1);
}
 
 
// Automatically generated. Tests for the `Preorder` constructor of the `:optionOrder` type.
export function is_preorder(optionOrder) /* forall<a> (optionOrder : optionOrder<a>) -> bool */  {
  return (optionOrder._tag === 2);
}
 
 
// Automatically generated. Tests for the `Wrap` constructor of the `:optionOrder` type.
export function is_wrap(optionOrder) /* forall<a> (optionOrder : optionOrder<a>) -> bool */  {
  return (optionOrder._tag === 3);
}
 
 
// Automatically generated. Retrieves the `verbose` constructor field of the `:testOptions` type.
export function verbose(testOptions0) /* (testOptions : testOptions) -> bool */  {
  return testOptions0.verbose;
}
 
 
// Automatically generated. Retrieves the `version` constructor field of the `:testOptions` type.
export function version(testOptions0) /* (testOptions : testOptions) -> bool */  {
  return testOptions0.version;
}
 
 
// Automatically generated. Retrieves the `name` constructor field of the `:testOptions` type.
export function name(testOptions0) /* (testOptions : testOptions) -> string */  {
  return testOptions0.name;
}
 
 
// Automatically generated. Retrieves the `output` constructor field of the `:testOptions` type.
export function output(testOptions0) /* (testOptions : testOptions) -> string */  {
  return testOptions0.output;
}
 
 
// Automatically generated. Retrieves the `arguments` constructor field of the `:testOptions` type.
export function $arguments(testOptions0) /* (testOptions : testOptions) -> list<string> */  {
  return testOptions0.$arguments;
}
 
export function _copy_1(_this, verbose0, version0, name0, output0, arguments0) /* (testOptions, verbose : optional<bool>, version : optional<bool>, name : optional<string>, output : optional<string>, arguments : optional<list<string>>) -> testOptions */  {
  if (verbose0 !== undefined) {
    var _x5 = verbose0;
  }
  else {
    var _x5 = _this.verbose;
  }
  if (version0 !== undefined) {
    var _x6 = version0;
  }
  else {
    var _x6 = _this.version;
  }
  if (name0 !== undefined) {
    var _x7 = name0;
  }
  else {
    var _x7 = _this.name;
  }
  if (output0 !== undefined) {
    var _x8 = output0;
  }
  else {
    var _x8 = _this.output;
  }
  if (arguments0 !== undefined) {
    var _x9 = arguments0;
  }
  else {
    var _x9 = _this.$arguments;
  }
  return TestOptions(_x5, _x6, _x7, _x8, _x9);
}
 
export function setName(t, name0) /* (t : testOptions, name : string) -> testOptions */  {
  var _x11 = undefined;
  if (_x11 !== undefined) {
    var _x10 = _x11;
  }
  else {
    var _x10 = t.verbose;
  }
  var _x13 = undefined;
  if (_x13 !== undefined) {
    var _x12 = _x13;
  }
  else {
    var _x12 = t.version;
  }
  var _x15 = undefined;
  if (_x15 !== undefined) {
    var _x14 = _x15;
  }
  else {
    var _x14 = t.output;
  }
  var _x17 = undefined;
  if (_x17 !== undefined) {
    var _x16 = _x17;
  }
  else {
    var _x16 = t.$arguments;
  }
  return TestOptions(_x10, _x12, name0, _x14, _x16);
}
 
export function setOutput(t, mbs) /* (t : testOptions, mbs : maybe<string>) -> testOptions */  {
  if (mbs === null) {
    var _x19 = undefined;
    if (_x19 !== undefined) {
      var _x18 = _x19;
    }
    else {
      var _x18 = t.verbose;
    }
    var _x21 = undefined;
    if (_x21 !== undefined) {
      var _x20 = _x21;
    }
    else {
      var _x20 = t.version;
    }
    var _x23 = undefined;
    if (_x23 !== undefined) {
      var _x22 = _x23;
    }
    else {
      var _x22 = t.name;
    }
    var _x25 = undefined;
    if (_x25 !== undefined) {
      var _x24 = _x25;
    }
    else {
      var _x24 = t.$arguments;
    }
    return TestOptions(_x18, _x20, _x22, "stdout", _x24);
  }
  else {
    var _x27 = undefined;
    if (_x27 !== undefined) {
      var _x26 = _x27;
    }
    else {
      var _x26 = t.verbose;
    }
    var _x29 = undefined;
    if (_x29 !== undefined) {
      var _x28 = _x29;
    }
    else {
      var _x28 = t.version;
    }
    var _x31 = undefined;
    if (_x31 !== undefined) {
      var _x30 = _x31;
    }
    else {
      var _x30 = t.name;
    }
    var _x33 = undefined;
    if (_x33 !== undefined) {
      var _x32 = _x33;
    }
    else {
      var _x32 = t.$arguments;
    }
    return TestOptions(_x26, _x28, _x30, mbs.value, _x32);
  }
}
 
export function setVerbose(t, v) /* (t : testOptions, v : bool) -> testOptions */  {
  var _x35 = undefined;
  if (_x35 !== undefined) {
    var _x34 = _x35;
  }
  else {
    var _x34 = t.version;
  }
  var _x37 = undefined;
  if (_x37 !== undefined) {
    var _x36 = _x37;
  }
  else {
    var _x36 = t.name;
  }
  var _x39 = undefined;
  if (_x39 !== undefined) {
    var _x38 = _x39;
  }
  else {
    var _x38 = t.output;
  }
  var _x41 = undefined;
  if (_x41 !== undefined) {
    var _x40 = _x41;
  }
  else {
    var _x40 = t.$arguments;
  }
  return TestOptions(v, _x34, _x36, _x38, _x40);
}
 
export function setVersion(t, v) /* (t : testOptions, v : bool) -> testOptions */  {
  var _x43 = undefined;
  if (_x43 !== undefined) {
    var _x42 = _x43;
  }
  else {
    var _x42 = t.verbose;
  }
  var _x45 = undefined;
  if (_x45 !== undefined) {
    var _x44 = _x45;
  }
  else {
    var _x44 = t.name;
  }
  var _x47 = undefined;
  if (_x47 !== undefined) {
    var _x46 = _x47;
  }
  else {
    var _x46 = t.output;
  }
  var _x49 = undefined;
  if (_x49 !== undefined) {
    var _x48 = _x49;
  }
  else {
    var _x48 = t.$arguments;
  }
  return TestOptions(_x42, v, _x44, _x46, _x48);
}
 
export function $break(s, c) /* (s : string, c : char) -> (string, string) */  {
   
  var sep_6879 = $std_core.string(c);
   
  var v_17123 = (s).split(sep_6879, 2);
   
  var parts = $std_core.vlist(v_17123);
  if (parts !== null && parts.tail !== null) {
    return $std_core_types._Tuple2_(parts.head, parts.tail.head);
  }
  else {
    return $std_core_types._Tuple2_(s, "");
  }
}
 
export function showLongArg(arg0) /* forall<a> (arg : optionArg<a>) -> string */  {
  if (arg0._tag === 1) {
    return "";
  }
  else if (arg0._tag === 2) {
    return $std_core._lp__plus__plus__1_rp_("=", arg0.help);
  }
  else {
     
    var left0_6883 = $std_core._lp__plus__plus__1_rp_("[=", arg0.help);
    return $std_core._lp__plus__plus__1_rp_(left0_6883, "]");
  }
}
 
export function showShortArg(arg0) /* forall<a> (arg : optionArg<a>) -> string */  {
  if (arg0._tag === 1) {
    return "";
  }
  else if (arg0._tag === 2) {
     
    var left_6887 = $std_core._lp__plus__plus__1_rp_("<", arg0.help);
    return $std_core._lp__plus__plus__1_rp_(left_6887, ">");
  }
  else {
     
    var left1_6891 = $std_core._lp__plus__plus__1_rp_("[", arg0.help);
    return $std_core._lp__plus__plus__1_rp_(left1_6891, "]");
  }
}
 
 
// lifted local: unzip3, iter
export function _lift7151_unzip3(ys, acc1, acc2, acc3) /* forall<a,b,c> (ys : list<(a, b, c)>, acc1 : list<a>, acc2 : list<b>, acc3 : list<c>) -> (list<a>, list<b>, list<c>) */  { tailcall: while(1)
{
  if (ys !== null) {
    {
      // tail call
      var _x50 = $std_core.Cons(ys.head.fst, acc1);
      var _x51 = $std_core.Cons(ys.head.snd, acc2);
      var _x52 = $std_core.Cons(ys.head.thd, acc3);
      ys = ys.tail;
      acc1 = _x50;
      acc2 = _x51;
      acc3 = _x52;
      continue tailcall;
    }
  }
  else {
    return $std_core_types._Tuple3_($std_core._lift17195_reverse($std_core.Nil, acc1), $std_core._lift17195_reverse($std_core.Nil, acc2), $std_core._lift17195_reverse($std_core.Nil, acc3));
  }
}}
 
 
// Unzip a list of triples into three lists
export function unzip3(xs) /* forall<a,b,c> (xs : list<(a, b, c)>) -> (list<a>, list<b>, list<c>) */  {
  return _lift7151_unzip3(xs, $std_core.Nil, $std_core.Nil, $std_core.Nil);
}
 
export function errorNegate(flagname) /* forall<a> (flagname : string) -> flagKind<a> */  {
   
  var left_6898 = $std_core._lp__plus__plus__1_rp_("option \"--", flagname);
  return $Error($std_core._lp__plus__plus__1_rp_(left_6898, "\" cannot be negated"));
}
 
export function errorNoarg(opt) /* forall<a> (opt : string) -> flagKind<a> */  {
   
  var left_6902 = $std_core._lp__plus__plus__1_rp_("option \"", opt);
  return $Error($std_core._lp__plus__plus__1_rp_(left_6902, "\" does not take an argument"));
}
 
export function errorRequired(help0, opt) /* forall<a> (help : string, opt : string) -> flagKind<a> */  {
   
  var left0_6908 = $std_core._lp__plus__plus__1_rp_("option \"", opt);
   
  var left_6906 = $std_core._lp__plus__plus__1_rp_(left0_6908, "\" requires an argument ");
  return $Error($std_core._lp__plus__plus__1_rp_(left_6906, help0));
}
 
export function errorUnknownMessage(opt) /* (opt : string) -> string */  {
   
  var left_6912 = $std_core._lp__plus__plus__1_rp_("unrecognized option \"", opt);
  return $std_core._lp__plus__plus__1_rp_(left_6912, "\"");
}
 
export function showOptions(o) /* (o : testOptions) -> string */  {
   
  var _x53 = o.name;
  var right3_6931 = $std_core.show_3(_x53);
   
  var _x54 = o.output;
  var right4_6934 = $std_core.show_3(_x54);
   
  if (o.$arguments === null) {
    var right5_6937 = "";
  }
  else {
    var right5_6937 = $std_core._lift17188_joinsep(",", o.$arguments.tail, o.$arguments.head);
  }
   
  var _x55 = (o.verbose) ? "True" : "False";
  var _x56 = (o.version) ? "True" : "False";
  var xs_6920 = $std_core.Cons($std_core._lp__plus__plus__1_rp_("verbose=", _x55), $std_core.Cons($std_core._lp__plus__plus__1_rp_("version=", _x56), $std_core.Cons($std_core._lp__plus__plus__1_rp_("name=", right3_6931), $std_core.Cons($std_core._lp__plus__plus__1_rp_("output=", right4_6934), $std_core.Cons($std_core._lp__plus__plus__1_rp_("arguments=", right5_6937), $std_core.Nil)))));
   
  if (xs_6920 === null) {
    var right0_6919 = "";
  }
  else {
    var right0_6919 = $std_core._lift17188_joinsep(";", xs_6920.tail, xs_6920.head);
  }
   
  var left_6916 = $std_core._lp__plus__plus__1_rp_("{", right0_6919);
  return $std_core._lp__plus__plus__1_rp_(left_6916, "}");
}
 
 
// Specifies a single option
// For example: "Option(""h?"",[""help""],Flag(Help),""show help information"")".
export function _create_Option(shortNames0, longNames0, arg0, help0, llongNames0) /* forall<a> (shortNames : string, longNames : list<string>, arg : optionArg<a>, help : string, llongNames : optional<list<string>>) -> option<a> */  {
   
  if (llongNames0 !== undefined) {
    var _llongNames_2510 = llongNames0;
  }
  else {
    var _llongNames_2510 = $std_core.map_5(longNames0, $compat.toLower);
  }
  return Option(shortNames0, longNames0, arg0, help0, _llongNames_2510);
}
 
export var testOptions;
 
var longNames0_6942 = $std_core.Cons("version", $std_core.Nil);
 
var _x53 = undefined;
if (_x53 !== undefined) {
  var _llongNames_2510 = _x53;
}
else {
  var _llongNames_2510 = $std_core.map_5(longNames0_6942, $compat.toLower);
}
 
var longNames1_6947 = $std_core.Cons("verbose", $std_core.Nil);
 
var _x54 = undefined;
if (_x54 !== undefined) {
  var _llongNames_25100 = _x54;
}
else {
  var _llongNames_25100 = $std_core.map_5(longNames1_6947, $compat.toLower);
}
 
var longNames2_6952 = $std_core.Cons("output", $std_core.Nil);
 
var _x55 = undefined;
if (_x55 !== undefined) {
  var _llongNames_25101 = _x55;
}
else {
  var _llongNames_25101 = $std_core.map_5(longNames2_6952, $compat.toLower);
}
 
var longNames3_6957 = $std_core.Cons("name", $std_core.Nil);
 
var _x56 = undefined;
if (_x56 !== undefined) {
  var _llongNames_25102 = _x56;
}
else {
  var _llongNames_25102 = $std_core.map_5(longNames3_6957, $compat.toLower);
}
var testOptions = $std_core.Cons(Option("V?", longNames0_6942, Flag(setVersion), "display version information", _llongNames_2510), $std_core.Cons(Option("v", longNames1_6947, Flag(setVerbose), "verbosely list files", _llongNames_25100), $std_core.Cons(Option("o", longNames2_6952, Opt(setOutput, "FILE"), "use FILE for dump", _llongNames_25101), $std_core.Cons(Option("n", longNames3_6957, Req(setName, "USER"), "only show USER files", _llongNames_25102), $std_core.Nil))));
 
export function _create_TestOptions(verbose0, version0, name0, output0, arguments0) /* (verbose : optional<bool>, version : optional<bool>, name : optional<string>, output : optional<string>, arguments : optional<list<string>>) -> testOptions */  {
  var _x53 = (verbose0 !== undefined) ? verbose0 : false;
  var _x54 = (version0 !== undefined) ? version0 : false;
  var _x55 = (name0 !== undefined) ? name0 : "";
  var _x56 = (output0 !== undefined) ? output0 : "";
  var _x57 = (arguments0 !== undefined) ? arguments0 : $std_core.Nil;
  return TestOptions(_x53, _x54, _x55, _x56, _x57);
}
 
export function showFlag(flag) /* forall<a> (flag : option<a>) -> list<(string, string, string)> */  {
   
  var _x58 = flag.shortNames;
  var xs_6961 = $std_core.map_5($std_core.list_6(_x58), function(c /* char */ ) {
       
      var right0_6967 = $std_core.string(c);
       
      var left_6964 = $std_core._lp__plus__plus__1_rp_("-", right0_6967);
       
      if (flag.arg._tag === 1) {
        var right_6965 = "";
      }
      else if (flag.arg._tag === 2) {
         
        var left_6887 = $std_core._lp__plus__plus__1_rp_("<", flag.arg.help);
        var right_6965 = $std_core._lp__plus__plus__1_rp_(left_6887, ">");
      }
      else {
         
        var left1_6891 = $std_core._lp__plus__plus__1_rp_("[", flag.arg.help);
        var right_6965 = $std_core._lp__plus__plus__1_rp_(left1_6891, "]");
      }
      return $std_core._lp__plus__plus__1_rp_(left_6964, right_6965);
    });
   
  if (xs_6961 === null) {
    var short = "";
  }
  else {
    var short = $std_core._lift17188_joinsep(" ", xs_6961.tail, xs_6961.head);
  }
   
  var _x59 = flag.longNames;
  var xs0_6969 = $std_core.map_5(_x59, function(name0 /* string */ ) {
       
      var left1_6972 = $std_core._lp__plus__plus__1_rp_("--", name0);
       
      if (flag.arg._tag === 1) {
        var right1_6973 = "";
      }
      else if (flag.arg._tag === 2) {
        var right1_6973 = $std_core._lp__plus__plus__1_rp_("=", flag.arg.help);
      }
      else {
         
        var left4_6980 = $std_core._lp__plus__plus__1_rp_("[=", flag.arg.help);
        var right1_6973 = $std_core._lp__plus__plus__1_rp_(left4_6980, "]");
      }
      return $std_core._lp__plus__plus__1_rp_(left1_6972, right1_6973);
    });
   
  if (xs0_6969 === null) {
    var long = "";
  }
  else {
    var long = $std_core._lift17188_joinsep(" ", xs0_6969.tail, xs0_6969.head);
  }
   
  var _x60 = flag.help;
  var v_17126 = ((_x60).split(("\n")));
  var _x58 = $std_core.vlist(v_17126);
  if (_x58 !== null) {
     
    var right6_6987 = $std_core.map_5(_x58.tail, function(s0 /* string */ ) {
        return $std_core_types._Tuple3_("", "", s0);
      });
    return $std_core.append($std_core.Cons($std_core_types._Tuple3_(short, long, _x58.head), $std_core.Nil), right6_6987);
  }
  else {
    return $std_core.Cons($std_core_types._Tuple3_(short, long, ""), $std_core.Nil);
  }
}
 
 
// monadic lift
export function _mlift7158_zipWith3Acc(acc, f, xx, yy, zz, _y_7152) /* forall<e,a,b,c,d> (acc : list<b>, f : (a, c, d) -> e b, xx : list<a>, yy : list<c>, zz : list<d>, b) -> e list<b> */  {
  return zipWith3Acc(f, $std_core.Cons(_y_7152, acc), xx, yy, zz);
}
 
export function zipWith3Acc(f0, acc0, xs, ys, zs) /* forall<a,b,c,d,e> ((a, b, c) -> e d, list<d>, list<a>, list<b>, list<c>) -> e list<d> */  { tailcall: while(1)
{
  if (xs === null) {
    return $std_core.reverse(acc0);
  }
  else {
    if (ys === null) {
      return $std_core.reverse(acc0);
    }
    else {
      if (zs !== null) {
         
        var x0_7159 = f0(xs.head, ys.head, zs.head);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_71520 /* 3681 */ ) {
            return _mlift7158_zipWith3Acc(acc0, f0, xs.tail, ys.tail, zs.tail, _y_71520);
          });
        }
        else {
          {
            // tail call
            var _x59 = $std_core.Cons(x0_7159, acc0);
            acc0 = _x59;
            xs = xs.tail;
            ys = ys.tail;
            zs = zs.tail;
            continue tailcall;
          }
        }
      }
      else {
        return $std_core.reverse(acc0);
      }
    }
  }
}}
 
export function zipWith3(f, xs, ys, zs) /* forall<a,b,c,d,e> (f : (a, b, c) -> e d, xs : list<a>, ys : list<b>, zs : list<c>) -> e list<d> */  {
  return zipWith3Acc(f, $std_core.Nil, xs, ys, zs);
}
 
 
// Return a nicely formatted string describing the usage of a command,
// consisting of a "header" followed by the descriptions of the "flags".
export function usageInfo(flags, header) /* forall<a> (flags : list<option<a>>, header : string) -> string */  {
   
  function alignLeft(xs) /* (xs : list<string>) -> list<string> */  {
     
    var xs0_6988 = $std_core.map_5(xs, $compat.length);
     
    if (xs0_6988 === null) {
      var _x60 = undefined;
      var n = (_x60 !== undefined) ? _x60 : 0;
    }
    else {
      var n = $std_core.foldl(xs0_6988.tail, xs0_6988.head, $std_core.max);
    }
    return $std_core.map_5(xs, function(s1 /* string */ ) {
        var _x60 = $std_core._int_ge(($std_core.count_1(s1)),n);
        if (_x60) {
          return s1;
        }
        else {
           
          var y_6996 = $std_core.count_1(s1);
           
          var n0_6993 = $std_core._int_sub(n,y_6996);
           
          if ($std_core._int_le(n0_6993,0)) {
            var right_6992 = "";
          }
          else {
            var right_6992 = $compat.makeString(n0_6993, 0x0020);
          }
          return $std_core._lp__plus__plus__1_rp_(s1, right_6992);
        }
      });
  }
   
  var xss_6998 = $std_core.map_5(flags, showFlag);
   
  var xs0_7162 = $std_core._lift17183_concat($std_core.Nil, xss_6998);
  var _x60 = _lift7151_unzip3(xs0_7162, $std_core.Nil, $std_core.Nil, $std_core.Nil);
   
  var xs1_7000 = alignLeft(_x60.fst);
   
  var ys_7001 = alignLeft(_x60.snd);
   
  var table = zipWith3Acc(function(x1 /* string */ , y0 /* string */ , z /* string */ ) {
       
      var left3_7009 = $std_core._lp__plus__plus__1_rp_(" ", x1);
       
      var left2_7007 = $std_core._lp__plus__plus__1_rp_(left3_7009, "  ");
       
      var left1_7005 = $std_core._lp__plus__plus__1_rp_(left2_7007, y0);
       
      var left0_7003 = $std_core._lp__plus__plus__1_rp_(left1_7005, "  ");
      return $std_core._lp__plus__plus__1_rp_(left0_7003, z);
    }, $std_core.Nil, xs1_7000, ys_7001, _x60.thd);
   
  var left5_7013 = $std_core._lp__plus__plus__1_rp_(header, "\n");
   
  if (table === null) {
    var right5_7014 = "";
  }
  else {
    var right5_7014 = $std_core._lift17203_unlines(table.tail, table.head);
  }
  return $std_core._lp__plus__plus__1_rp_(left5_7013, right5_7014);
}
 
export function errorAmbiguous(applicable, opt) /* forall<a,b> (applicable : list<option<a>>, opt : string) -> flagKind<b> */  {
   
  var left_7018 = $std_core._lp__plus__plus__1_rp_("option \"", opt);
   
  var header = $std_core._lp__plus__plus__1_rp_(left_7018, "\" is ambiguous. It could be one of:");
  return $Error(usageInfo(applicable, header));
}
 
export function errorUnknown(opt) /* forall<a> (opt : string) -> flagKind<a> */  {
   
  var left_7023 = $std_core._lp__plus__plus__1_rp_("unrecognized option \"", opt);
  return $Error($std_core._lp__plus__plus__1_rp_(left_7023, "\""));
}
 
export function parseLong(s, flags) /* forall<a> (s : string, flags : list<option<a>>) -> total flagKind<a> */  {
   
  var sep_7030 = $std_core.string(0x003D);
   
  var v_17123 = (s).split(sep_7030, 2);
   
  var parts = $std_core.vlist(v_17123);
  if (parts !== null && parts.tail !== null) {
     
    var opt = $std_core._lp__plus__plus__1_rp_("--", s);
     
    var flagname = $compat.toLower(parts.head);
     
    var _x61 = $compat.startsWith(flagname, "no-");
    if (_x61) {
      var _x62 = $std_core._int_gt(($std_core.count_1(flagname)),3);
      if (_x62) {
        var baseflagname = $compat.substr(flagname, 3);
      }
      else {
        var baseflagname = "";
      }
    }
    else {
      var baseflagname = "";
    }
     
    var lnames = $compat.concat(flags, function(flag /* option<5496> */ ) {
        return flag.llongNames;
      });
     
    var exacts = $std_core.filter(flags, function(flag0 /* option<5496> */ ) {
        var _x63 = flag0.llongNames;
        return $std_core.any(_x63, function(name0 /* string */ ) {
            return ((name0 === flagname)) ? true : (name0 === baseflagname);
          });
      });
     
    var prefixes = $std_core.filter(flags, function(flag1 /* option<5496> */ ) {
        var _x64 = flag1.llongNames;
        return $std_core.any(_x64, function(name00 /* string */ ) {
            var _x65 = $compat.startsWith(name00, flagname);
            if (_x65) {
              return true;
            }
            else {
              if ((baseflagname !== (""))) {
                return $compat.startsWith(name00, baseflagname);
              }
              else {
                return false;
              }
            }
          });
      });
    var _x61 = (exacts === null) ? prefixes : exacts;
    if (_x61 === null) {
       
      var left_7023 = $std_core._lp__plus__plus__1_rp_("unrecognized option \"", opt);
      return $Error($std_core._lp__plus__plus__1_rp_(left_7023, "\""));
    }
    else if (_x61 !== null && _x61.tail !== null) {
       
      var left_7018 = $std_core._lp__plus__plus__1_rp_("option \"", opt);
       
      var header = $std_core._lp__plus__plus__1_rp_(left_7018, "\" is ambiguous. It could be one of:");
      var _x62 = (exacts === null) ? prefixes : exacts;
      return $Error(usageInfo(_x62, header));
    }
    else {
      if (_x61.head.arg._tag === 1) {
        if (((parts.tail.head) === (""))) {
          return Flg(function(o /* 5496 */ ) {
            return _x61.head.arg.$default(o, (baseflagname === ("")));
          });
        }
        else {
          var _x63 = (($compat.toLower(parts.tail.head)) === ("true"));
          if (_x63) {
            return Flg(function(o0 /* 5496 */ ) {
              return _x61.head.arg.$default(o0, true);
            });
          }
          else {
            var _x64 = (($compat.toLower(parts.tail.head)) === ("false"));
            if (_x64) {
              return Flg(function(o1 /* 5496 */ ) {
                return _x61.head.arg.$default(o1, false);
              });
            }
            else {
               
              var left_6902 = $std_core._lp__plus__plus__1_rp_("option \"", opt);
              return $Error($std_core._lp__plus__plus__1_rp_(left_6902, "\" does not take an argument"));
            }
          }
        }
      }
      else if (_x61.head.arg._tag === 2) {
        if ((baseflagname !== (""))) {
           
          var left_6898 = $std_core._lp__plus__plus__1_rp_("option \"--", baseflagname);
          return $Error($std_core._lp__plus__plus__1_rp_(left_6898, "\" cannot be negated"));
        }
        else {
          var _x65 = $std_core._int_gt(($std_core.count_1(parts.tail.head)),0);
          if (_x65) {
            return Flg(function(o2 /* 5496 */ ) {
              return _x61.head.arg.parse(o2, parts.tail.head);
            });
          }
          else {
             
            var left0_6908 = $std_core._lp__plus__plus__1_rp_("option \"", opt);
             
            var left_6906 = $std_core._lp__plus__plus__1_rp_(left0_6908, "\" requires an argument ");
            return $Error($std_core._lp__plus__plus__1_rp_(left_6906, _x61.head.arg.help));
          }
        }
      }
      else {
        if ((baseflagname !== (""))) {
           
          var left_68980 = $std_core._lp__plus__plus__1_rp_("option \"--", baseflagname);
          return $Error($std_core._lp__plus__plus__1_rp_(left_68980, "\" cannot be negated"));
        }
        else {
          var _x66 = $std_core._int_gt(($std_core.count_1(parts.tail.head)),0);
          if (_x66) {
            return Flg(function(o3 /* 5496 */ ) {
              return _x61.head.arg.parse(o3, $std_core_types.Just(parts.tail.head));
            });
          }
          else {
            return Flg(function(o4 /* 5496 */ ) {
              return _x61.head.arg.parse(o4, $std_core_types.Nothing);
            });
          }
        }
      }
    }
  }
  else {
     
    var opt4 = $std_core._lp__plus__plus__1_rp_("--", s);
     
    var flagname2 = $compat.toLower(s);
     
    var _x67 = $compat.startsWith(flagname2, "no-");
    if (_x67) {
      var _x68 = $std_core._int_gt(($std_core.count_1(flagname2)),3);
      if (_x68) {
        var baseflagname0 = $compat.substr(flagname2, 3);
      }
      else {
        var baseflagname0 = "";
      }
    }
    else {
      var baseflagname0 = "";
    }
     
    var lnames0 = $compat.concat(flags, function(flag2 /* option<5496> */ ) {
        return flag2.llongNames;
      });
     
    var exacts0 = $std_core.filter(flags, function(flag00 /* option<5496> */ ) {
        var _x69 = flag00.llongNames;
        return $std_core.any(_x69, function(name01 /* string */ ) {
            return ((name01 === flagname2)) ? true : (name01 === baseflagname0);
          });
      });
     
    var prefixes0 = $std_core.filter(flags, function(flag10 /* option<5496> */ ) {
        var _x70 = flag10.llongNames;
        return $std_core.any(_x70, function(name000 /* string */ ) {
            var _x71 = $compat.startsWith(name000, flagname2);
            if (_x71) {
              return true;
            }
            else {
              if ((baseflagname0 !== (""))) {
                return $compat.startsWith(name000, baseflagname0);
              }
              else {
                return false;
              }
            }
          });
      });
    var _x67 = (exacts0 === null) ? prefixes0 : exacts0;
    if (_x67 === null) {
       
      var left_70230 = $std_core._lp__plus__plus__1_rp_("unrecognized option \"", opt4);
      return $Error($std_core._lp__plus__plus__1_rp_(left_70230, "\""));
    }
    else if (_x67 !== null && _x67.tail !== null) {
       
      var left_70180 = $std_core._lp__plus__plus__1_rp_("option \"", opt4);
       
      var header0 = $std_core._lp__plus__plus__1_rp_(left_70180, "\" is ambiguous. It could be one of:");
      var _x68 = (exacts0 === null) ? prefixes0 : exacts0;
      return $Error(usageInfo(_x68, header0));
    }
    else {
      if (_x67.head.arg._tag === 1) {
        if ((("") === (""))) {
          return Flg(function(o5 /* 5496 */ ) {
            return _x67.head.arg.$default(o5, (baseflagname0 === ("")));
          });
        }
        else {
          var _x69 = (($compat.toLower("")) === ("true"));
          if (_x69) {
            return Flg(function(o00 /* 5496 */ ) {
              return _x67.head.arg.$default(o00, true);
            });
          }
          else {
            var _x70 = (($compat.toLower("")) === ("false"));
            if (_x70) {
              return Flg(function(o10 /* 5496 */ ) {
                return _x67.head.arg.$default(o10, false);
              });
            }
            else {
               
              var left_69020 = $std_core._lp__plus__plus__1_rp_("option \"", opt4);
              return $Error($std_core._lp__plus__plus__1_rp_(left_69020, "\" does not take an argument"));
            }
          }
        }
      }
      else if (_x67.head.arg._tag === 2) {
        if ((baseflagname0 !== (""))) {
           
          var left_68981 = $std_core._lp__plus__plus__1_rp_("option \"--", baseflagname0);
          return $Error($std_core._lp__plus__plus__1_rp_(left_68981, "\" cannot be negated"));
        }
        else {
          var _x71 = $std_core._int_gt(($std_core.count_1("")),0);
          if (_x71) {
            return Flg(function(o20 /* 5496 */ ) {
              return _x67.head.arg.parse(o20, "");
            });
          }
          else {
             
            var left0_69080 = $std_core._lp__plus__plus__1_rp_("option \"", opt4);
             
            var left_69060 = $std_core._lp__plus__plus__1_rp_(left0_69080, "\" requires an argument ");
            return $Error($std_core._lp__plus__plus__1_rp_(left_69060, _x67.head.arg.help));
          }
        }
      }
      else {
        if ((baseflagname0 !== (""))) {
           
          var left_68982 = $std_core._lp__plus__plus__1_rp_("option \"--", baseflagname0);
          return $Error($std_core._lp__plus__plus__1_rp_(left_68982, "\" cannot be negated"));
        }
        else {
          var _x72 = $std_core._int_gt(($std_core.count_1("")),0);
          if (_x72) {
            return Flg(function(o30 /* 5496 */ ) {
              return _x67.head.arg.parse(o30, $std_core_types.Just(""));
            });
          }
          else {
            return Flg(function(o40 /* 5496 */ ) {
              return _x67.head.arg.parse(o40, $std_core_types.Nothing);
            });
          }
        }
      }
    }
  }
}
 
export function parseShorts(s, flags) /* forall<a> (s : string, flags : list<option<a>>) -> list<flagKind<a>> */  {
  return function() {
     
    var loc = { value: false };
     
    var fs = $std_core.map_indexed($std_core.list_6(s), function(i /* int */ , c /* char */ ) {
        var _x73 = ((loc).value);
        if (_x73) {
          return $std_core_types.Nothing;
        }
        else {
           
          var right_7044 = $std_core.string(c);
           
          var opt = $std_core._lp__plus__plus__1_rp_("-", right_7044);
           
          var applicable = $std_core.filter(flags, function(flag /* option<6033> */ ) {
              var _x74 = flag.shortNames;
              return $compat.contains(_x74, c);
            });
          if (applicable === null) {
             
            var left_7023 = $std_core._lp__plus__plus__1_rp_("unrecognized option \"", opt);
            return $std_core_types.Just($Error($std_core._lp__plus__plus__1_rp_(left_7023, "\"")));
          }
          else if (applicable !== null && applicable.tail !== null) {
             
            var left_7018 = $std_core._lp__plus__plus__1_rp_("option \"", opt);
             
            var header = $std_core._lp__plus__plus__1_rp_(left_7018, "\" is ambiguous. It could be one of:");
            return $std_core_types.Just($Error(usageInfo(applicable, header)));
          }
          else {
            if (applicable.head.arg._tag === 1) {
              return $std_core_types.Just(Flg(function(o /* 6033 */ ) {
                return applicable.head.arg.$default(o, true);
              }));
            }
            else if (applicable.head.arg._tag === 2) {
               
              var arg0 = $compat.substr(s, $std_core._int_add(i,1));
              var _x74 = $std_core._int_gt(($std_core.count_1(arg0)),0);
              if (_x74) {
                 
                ((loc).value = true);
                return $std_core_types.Just(Flg(function(o0 /* 6033 */ ) {
                  return applicable.head.arg.parse(o0, arg0);
                }));
              }
              else {
                 
                var left0_6908 = $std_core._lp__plus__plus__1_rp_("option \"", opt);
                 
                var left_6906 = $std_core._lp__plus__plus__1_rp_(left0_6908, "\" requires an argument ");
                return $std_core_types.Just($Error($std_core._lp__plus__plus__1_rp_(left_6906, applicable.head.arg.help)));
              }
            }
            else {
               
              var arg00 = $compat.substr(s, $std_core._int_add(i,1));
              var _x75 = $std_core._int_gt(($std_core.count_1(arg00)),0);
              if (_x75) {
                 
                ((loc).value = true);
                return $std_core_types.Just(Flg(function(o1 /* 6033 */ ) {
                  return applicable.head.arg.parse(o1, $std_core_types.Just(arg00));
                }));
              }
              else {
                return $std_core_types.Just(Flg(function(o2 /* 6033 */ ) {
                  return applicable.head.arg.parse(o2, $std_core_types.Nothing);
                }));
              }
            }
          }
        }
      });
     
    var xss_7053 = $std_core.map_5(fs, $std_core.list_5);
     
    var res = $std_core._lift17183_concat($std_core.Nil, xss_7053);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
export function processNext(arg0, flags) /* forall<a> (arg : string, flags : list<option<a>>) -> list<flagKind<a>> */  {
  if ((("--") === arg0)) {
    return $std_core.Cons(End, $std_core.Nil);
  }
  else {
    var _x73 = $compat.startsWith(arg0, "--");
    if (_x73) {
      return $std_core.Cons(parseLong($compat.substr(arg0, 2), flags), $std_core.Nil);
    }
    else {
      var _x74 = $compat.startsWith(arg0, "-");
      if (_x74) {
        var _x75 = $std_core._int_ge(($std_core.count_1(arg0)),2);
        if (_x75) {
          return parseShorts($compat.substr(arg0, 1), flags);
        }
        else {
          return $std_core.Cons(Arg(arg0), $std_core.Nil);
        }
      }
      else {
        return $std_core.Cons(Arg(arg0), $std_core.Nil);
      }
    }
  }
}
 
 
// Parse the command line arguments "args" (see "std/env/argv")
// according to the flag descriptions "flags". Takes an optional argument
// "ordering" that specifies how flags are handled that follow nonFlag arguments.
// The default ordering is "Permute". Returns three lists: the list of parsed options,
// a list of nonOption arguments, and a list of potential error messages.
export function parse(initial, flags, args, ordering) /* forall<a> (initial : a, flags : list<option<a>>, args : list<string>, ordering : optional<optionOrder<a>>) -> total (a, list<string>, list<string>) */  {
  return function() {
     
    var loc = { value: false };
     
    var opts0 = $std_core.map_5(args, function(arg0 /* string */ ) {
         
        var _x76 = ((loc).value);
        if (_x76) {
          var opts = $std_core.Cons(Arg(arg0), $std_core.Nil);
        }
        else {
          var opts = processNext(arg0, flags);
        }
         
        $std_core.foreach(opts, function(opt /* flagKind<6492> */ ) {
            if (opt._tag === 3) {
              return ((loc).value = true);
            }
            if (opt._tag === 2) {
              var _x78 = (ordering !== undefined) ? ordering : Permute;
              var _x77 = (_x78._tag === 2);
              if (_x77){
                return ((loc).value = true);
              }
            }
            return $std_core_types._Unit_;
          });
        return opts;
      });
     
    var res = $std_core.foldl($std_core._lift17183_concat($std_core.Nil, opts0), $std_core_types._Tuple3_(initial, $std_core.Nil, $std_core.Nil), function(acc /* (6492, list<string>, list<string>) */ , opt0 /* flagKind<6492> */ ) {
        if (opt0._tag === 1) {
          return $std_core_types._Tuple3_(opt0.set(acc.fst), acc.snd, acc.thd);
        }
        else if (opt0._tag === 4) {
           
          var left_7059 = $std_core._lp__plus__plus__1_rp_("unrecognized option \"", opt0.arg);
          return $std_core_types._Tuple3_(acc.fst, acc.snd, $std_core.Cons($std_core._lp__plus__plus__1_rp_(left_7059, "\""), acc.thd));
        }
        else if (opt0._tag === 5) {
          return $std_core_types._Tuple3_(acc.fst, acc.snd, $std_core.Cons(opt0.msg, acc.thd));
        }
        else if (opt0._tag === 2) {
          return $std_core_types._Tuple3_(acc.fst, $std_core.Cons(opt0.arg, acc.snd), acc.thd);
        }
        else {
          return $std_core_types._Tuple3_(acc.fst, acc.snd, acc.thd);
        }
      });
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
export function test(cmdargs) /* (cmdargs : list<string>) -> console () */  {
  var _x78 = undefined;
  var _x77 = (_x78 !== undefined) ? _x78 : false;
  var _x80 = undefined;
  var _x79 = (_x80 !== undefined) ? _x80 : false;
  var _x82 = undefined;
  var _x81 = (_x82 !== undefined) ? _x82 : "";
  var _x84 = undefined;
  var _x83 = (_x84 !== undefined) ? _x84 : "";
  var _x86 = undefined;
  var _x85 = (_x86 !== undefined) ? _x86 : $std_core.Nil;
  var _x76 = parse(TestOptions(_x77, _x79, _x81, _x83, _x85), testOptions, cmdargs);
  if (_x76.thd === null) {
     
    $std_core.printsln("\nsuccess!");
     
    var right_7072 = showOptions(_x76.fst);
     
    var s0_7070 = $std_core._lp__plus__plus__1_rp_("options: ", right_7072);
     
    $std_core.printsln(s0_7070);
     
    if (_x76.snd === null) {
      var right0_7075 = "";
    }
    else {
      var right0_7075 = $std_core._lift17188_joinsep(" ", _x76.snd.tail, _x76.snd.head);
    }
     
    var s1_7073 = $std_core._lp__plus__plus__1_rp_("arguments: ", right0_7075);
     
    $std_core.printsln(s1_7073);
    if (_x76.fst.version) {
       
      var s2_7079 = usageInfo(testOptions, "usage:\n program [options] files\n\noptions:");
      return $std_core.printsln(s2_7079);
    }
    else {
      return $std_core_types._Unit_;
    }
  }
  else {
     
    if (_x76.thd === null) {
      var left2_7083 = "";
    }
    else {
      var left2_7083 = $std_core._lift17188_joinsep("\n", _x76.thd.tail, _x76.thd.head);
    }
     
    var left1_7081 = $std_core._lp__plus__plus__1_rp_(left2_7083, "\n");
     
    var right1_7082 = usageInfo(testOptions, "usage:\n program [options] files\n\noptions:");
     
    var s3_7080 = $std_core._lp__plus__plus__1_rp_(left1_7081, right1_7082);
    return $std_core.printsln(s3_7080);
  }
}