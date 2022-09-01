// Koka generated module: "std/os/flags", koka version: 2.4.0
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
import * as $std_os_env from './std_os_env.mjs';
 
// externals
 
// type declarations
// type flag-parser
export function Bool($default) /* forall<a> (default : (a, bool) -> a) -> flag-parser<a> */  {
  return { _tag: 1, $default: $default };
}
export function Req(parse, help) /* forall<a> (parse : (a, string) -> a, help : string) -> flag-parser<a> */  {
  return { _tag: 2, parse: parse, help: help };
}
export function Opt(parse, help) /* forall<a> (parse : (a, maybe<string>) -> a, help : string) -> flag-parser<a> */  {
  return { _tag: 3, parse: parse, help: help };
}
// type flag
export function Flag(short_names, long_names, parser, help) /* forall<a> (short-names : string, long-names : list<string>, parser : flag-parser<a>, help : string) -> flag<a> */  {
  return { short_names: short_names, long_names: long_names, parser: parser, help: help };
}
// type flag-kind
export function Flg(set) /* forall<a> (set : (a) -> a) -> flag-kind<a> */  {
  return { _tag: 1, set: set };
}
export function Arg(arg) /* forall<a> (arg : string) -> flag-kind<a> */  {
  return { _tag: 2, arg: arg };
}
export const End = { _tag: 3 }; // forall<a> flag-kind<a>
export function Unknown(arg) /* forall<a> (arg : string) -> flag-kind<a> */  {
  return { _tag: 4, arg: arg };
}
export function $Error(msg) /* forall<a> (msg : string) -> flag-kind<a> */  {
  return { _tag: 5, msg: msg };
}
// type flag-order
export const Permute = { _tag: 1 }; // forall<a> flag-order<a>
export const Preorder = { _tag: 2 }; // forall<a> flag-order<a>
export function Wrap(wrap) /* forall<a> (wrap : (string) -> a) -> flag-order<a> */  {
  return { _tag: 3, wrap: wrap };
}
// type myflags
export function Myflags(verbose, version, name, output, $arguments) /* (verbose : bool, version : bool, name : string, output : string, arguments : list<string>) -> myflags */  {
  return { verbose: verbose, version: version, name: name, output: output, $arguments: $arguments };
}
 
// declarations
 
 
// Automatically generated. Tests for the `Bool` constructor of the `:flag-parser` type.
export function is_bool(flag_parser) /* forall<a> (flag-parser : flag-parser<a>) -> bool */  {
  return (flag_parser._tag === 1);
}
 
 
// Automatically generated. Tests for the `Req` constructor of the `:flag-parser` type.
export function is_req(flag_parser) /* forall<a> (flag-parser : flag-parser<a>) -> bool */  {
  return (flag_parser._tag === 2);
}
 
 
// Automatically generated. Tests for the `Opt` constructor of the `:flag-parser` type.
export function is_opt(flag_parser) /* forall<a> (flag-parser : flag-parser<a>) -> bool */  {
  return (flag_parser._tag === 3);
}
 
 
// Automatically generated. Retrieves the `short-names` constructor field of the `:flag` type.
export function short_names(flag) /* forall<a> (flag : flag<a>) -> string */  {
  return flag.short_names;
}
 
 
// Automatically generated. Retrieves the `long-names` constructor field of the `:flag` type.
export function long_names(flag) /* forall<a> (flag : flag<a>) -> list<string> */  {
  return flag.long_names;
}
 
 
// Automatically generated. Retrieves the `parser` constructor field of the `:flag` type.
export function parser(flag) /* forall<a> (flag : flag<a>) -> flag-parser<a> */  {
  return flag.parser;
}
 
 
// Automatically generated. Retrieves the `help` constructor field of the `:flag` type.
export function help(flag) /* forall<a> (flag : flag<a>) -> string */  {
  return flag.help;
}
 
export function _copy(_this, short_names0, long_names0, parser0, help0) /* forall<a> (flag<a>, short-names : optional<string>, long-names : optional<list<string>>, parser : optional<flag-parser<a>>, help : optional<string>) -> flag<a> */  {
  if (short_names0 !== undefined) {
    var _x0 = short_names0;
  }
  else {
    var _x0 = _this.short_names;
  }
  if (long_names0 !== undefined) {
    var _x1 = long_names0;
  }
  else {
    var _x1 = _this.long_names;
  }
  if (parser0 !== undefined) {
    var _x2 = parser0;
  }
  else {
    var _x2 = _this.parser;
  }
  if (help0 !== undefined) {
    var _x3 = help0;
  }
  else {
    var _x3 = _this.help;
  }
  return Flag(_x0, _x1, _x2, _x3);
}
 
 
// Automatically generated. Tests for the `Flg` constructor of the `:flag-kind` type.
export function is_flg(flag_kind) /* forall<a> (flag-kind : flag-kind<a>) -> bool */  {
  return (flag_kind._tag === 1);
}
 
 
// Automatically generated. Tests for the `Arg` constructor of the `:flag-kind` type.
export function is_arg(flag_kind) /* forall<a> (flag-kind : flag-kind<a>) -> bool */  {
  return (flag_kind._tag === 2);
}
 
 
// Automatically generated. Tests for the `End` constructor of the `:flag-kind` type.
export function is_end(flag_kind) /* forall<a> (flag-kind : flag-kind<a>) -> bool */  {
  return (flag_kind._tag === 3);
}
 
 
// Automatically generated. Tests for the `Unknown` constructor of the `:flag-kind` type.
export function is_unknown(flag_kind) /* forall<a> (flag-kind : flag-kind<a>) -> bool */  {
  return (flag_kind._tag === 4);
}
 
 
// Automatically generated. Tests for the `Error` constructor of the `:flag-kind` type.
export function is_error(flag_kind) /* forall<a> (flag-kind : flag-kind<a>) -> bool */  {
  return (flag_kind._tag === 5);
}
 
 
// Automatically generated. Tests for the `Permute` constructor of the `:flag-order` type.
export function is_permute(flag_order) /* forall<a> (flag-order : flag-order<a>) -> bool */  {
  return (flag_order._tag === 1);
}
 
 
// Automatically generated. Tests for the `Preorder` constructor of the `:flag-order` type.
export function is_preorder(flag_order) /* forall<a> (flag-order : flag-order<a>) -> bool */  {
  return (flag_order._tag === 2);
}
 
 
// Automatically generated. Tests for the `Wrap` constructor of the `:flag-order` type.
export function is_wrap(flag_order) /* forall<a> (flag-order : flag-order<a>) -> bool */  {
  return (flag_order._tag === 3);
}
 
 
// Automatically generated. Retrieves the `verbose` constructor field of the `:myflags` type.
export function verbose(myflags0) /* (myflags : myflags) -> bool */  {
  return myflags0.verbose;
}
 
 
// Automatically generated. Retrieves the `version` constructor field of the `:myflags` type.
export function version(myflags0) /* (myflags : myflags) -> bool */  {
  return myflags0.version;
}
 
 
// Automatically generated. Retrieves the `name` constructor field of the `:myflags` type.
export function name(myflags0) /* (myflags : myflags) -> string */  {
  return myflags0.name;
}
 
 
// Automatically generated. Retrieves the `output` constructor field of the `:myflags` type.
export function output(myflags0) /* (myflags : myflags) -> string */  {
  return myflags0.output;
}
 
 
// Automatically generated. Retrieves the `arguments` constructor field of the `:myflags` type.
export function $arguments(myflags0) /* (myflags : myflags) -> list<string> */  {
  return myflags0.$arguments;
}
 
export function _copy_1(_this, verbose0, version0, name0, output0, arguments0) /* (myflags, verbose : optional<bool>, version : optional<bool>, name : optional<string>, output : optional<string>, arguments : optional<list<string>>) -> myflags */  {
  if (verbose0 !== undefined) {
    var _x4 = verbose0;
  }
  else {
    var _x4 = _this.verbose;
  }
  if (version0 !== undefined) {
    var _x5 = version0;
  }
  else {
    var _x5 = _this.version;
  }
  if (name0 !== undefined) {
    var _x6 = name0;
  }
  else {
    var _x6 = _this.name;
  }
  if (output0 !== undefined) {
    var _x7 = output0;
  }
  else {
    var _x7 = _this.output;
  }
  if (arguments0 !== undefined) {
    var _x8 = arguments0;
  }
  else {
    var _x8 = _this.$arguments;
  }
  return Myflags(_x4, _x5, _x6, _x7, _x8);
}
 
export function set_name(t, name0) /* (t : myflags, name : string) -> myflags */  {
  var _x10 = undefined;
  if (_x10 !== undefined) {
    var _x9 = _x10;
  }
  else {
    var _x9 = t.verbose;
  }
  var _x12 = undefined;
  if (_x12 !== undefined) {
    var _x11 = _x12;
  }
  else {
    var _x11 = t.version;
  }
  var _x14 = undefined;
  if (_x14 !== undefined) {
    var _x13 = _x14;
  }
  else {
    var _x13 = t.output;
  }
  var _x16 = undefined;
  if (_x16 !== undefined) {
    var _x15 = _x16;
  }
  else {
    var _x15 = t.$arguments;
  }
  return Myflags(_x9, _x11, name0, _x13, _x15);
}
 
export function set_output(t, mbs) /* (t : myflags, mbs : maybe<string>) -> myflags */  {
  if (mbs === null) {
    var _x18 = undefined;
    if (_x18 !== undefined) {
      var _x17 = _x18;
    }
    else {
      var _x17 = t.verbose;
    }
    var _x20 = undefined;
    if (_x20 !== undefined) {
      var _x19 = _x20;
    }
    else {
      var _x19 = t.version;
    }
    var _x22 = undefined;
    if (_x22 !== undefined) {
      var _x21 = _x22;
    }
    else {
      var _x21 = t.name;
    }
    var _x24 = undefined;
    if (_x24 !== undefined) {
      var _x23 = _x24;
    }
    else {
      var _x23 = t.$arguments;
    }
    return Myflags(_x17, _x19, _x21, "stdout", _x23);
  }
  else {
    var _x26 = undefined;
    if (_x26 !== undefined) {
      var _x25 = _x26;
    }
    else {
      var _x25 = t.verbose;
    }
    var _x28 = undefined;
    if (_x28 !== undefined) {
      var _x27 = _x28;
    }
    else {
      var _x27 = t.version;
    }
    var _x30 = undefined;
    if (_x30 !== undefined) {
      var _x29 = _x30;
    }
    else {
      var _x29 = t.name;
    }
    var _x32 = undefined;
    if (_x32 !== undefined) {
      var _x31 = _x32;
    }
    else {
      var _x31 = t.$arguments;
    }
    return Myflags(_x25, _x27, _x29, mbs.value, _x31);
  }
}
 
export function set_verbose(t, v) /* (t : myflags, v : bool) -> myflags */  {
  var _x34 = undefined;
  if (_x34 !== undefined) {
    var _x33 = _x34;
  }
  else {
    var _x33 = t.version;
  }
  var _x36 = undefined;
  if (_x36 !== undefined) {
    var _x35 = _x36;
  }
  else {
    var _x35 = t.name;
  }
  var _x38 = undefined;
  if (_x38 !== undefined) {
    var _x37 = _x38;
  }
  else {
    var _x37 = t.output;
  }
  var _x40 = undefined;
  if (_x40 !== undefined) {
    var _x39 = _x40;
  }
  else {
    var _x39 = t.$arguments;
  }
  return Myflags(v, _x33, _x35, _x37, _x39);
}
 
export function set_version(t, v) /* (t : myflags, v : bool) -> myflags */  {
  var _x42 = undefined;
  if (_x42 !== undefined) {
    var _x41 = _x42;
  }
  else {
    var _x41 = t.verbose;
  }
  var _x44 = undefined;
  if (_x44 !== undefined) {
    var _x43 = _x44;
  }
  else {
    var _x43 = t.name;
  }
  var _x46 = undefined;
  if (_x46 !== undefined) {
    var _x45 = _x46;
  }
  else {
    var _x45 = t.output;
  }
  var _x48 = undefined;
  if (_x48 !== undefined) {
    var _x47 = _x48;
  }
  else {
    var _x47 = t.$arguments;
  }
  return Myflags(_x41, v, _x43, _x45, _x47);
}
 
export function $break(s, c) /* (s : string, c : string) -> (string, string) */  {
   
  var v_17123 = (s).split(c, 2);
   
  var parts = $std_core.vlist(v_17123);
  if (parts !== null && parts.tail !== null) {
    return $std_core_types._Tuple2_(parts.head, parts.tail.head);
  }
  else {
    return $std_core_types._Tuple2_(s, "");
  }
}
 
export function show_long_flag(parser0) /* forall<a> (parser : flag-parser<a>) -> string */  {
  if (parser0._tag === 1) {
    return "";
  }
  else if (parser0._tag === 2) {
    return $std_core._lp__plus__plus__1_rp_("=", parser0.help);
  }
  else {
    return $std_core._lp__plus__plus__1_rp_("[=", $std_core._lp__plus__plus__1_rp_(parser0.help, "]"));
  }
}
 
export function show_short_flag(parser0) /* forall<a> (parser : flag-parser<a>) -> string */  {
  if (parser0._tag === 1) {
    return "";
  }
  else if (parser0._tag === 2) {
    return $std_core._lp__plus__plus__1_rp_("<", $std_core._lp__plus__plus__1_rp_(parser0.help, ">"));
  }
  else {
    return $std_core._lp__plus__plus__1_rp_("[", $std_core._lp__plus__plus__1_rp_(parser0.help, "]"));
  }
}
 
 
// lifted local: unzip3, iter
export function _lift5759_unzip3(ys, acc1, acc2, acc3) /* forall<a,b,c> (ys : list<(a, b, c)>, acc1 : list<a>, acc2 : list<b>, acc3 : list<c>) -> (list<a>, list<b>, list<c>) */  { tailcall: while(1)
{
  if (ys !== null) {
    {
      // tail call
      var _x49 = $std_core.Cons(ys.head.fst, acc1);
      var _x50 = $std_core.Cons(ys.head.snd, acc2);
      var _x51 = $std_core.Cons(ys.head.thd, acc3);
      ys = ys.tail;
      acc1 = _x49;
      acc2 = _x50;
      acc3 = _x51;
      continue tailcall;
    }
  }
  else {
    return $std_core_types._Tuple3_($std_core._lift17195_reverse($std_core.Nil, acc1), $std_core._lift17195_reverse($std_core.Nil, acc2), $std_core._lift17195_reverse($std_core.Nil, acc3));
  }
}}
 
 
// Unzip a list of triples into three lists
export function unzip3(xs) /* forall<a,b,c> (xs : list<(a, b, c)>) -> (list<a>, list<b>, list<c>) */  {
  return _lift5759_unzip3(xs, $std_core.Nil, $std_core.Nil, $std_core.Nil);
}
 
export function error_negate(flagname) /* forall<a> (flagname : string) -> flag-kind<a> */  {
  return $Error($std_core._lp__plus__plus__1_rp_("flag \"--", $std_core._lp__plus__plus__1_rp_(flagname, "\" cannot be negated")));
}
 
export function error_noarg(opt) /* forall<a> (opt : string) -> flag-kind<a> */  {
  return $Error($std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(opt, "\" does not take an argument")));
}
 
export function error_required(help0, opt) /* forall<a> (help : string, opt : string) -> flag-kind<a> */  {
  return $Error($std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(opt, $std_core._lp__plus__plus__1_rp_("\" requires an argument ", help0))));
}
 
export function error_unknown_message(opt) /* (opt : string) -> string */  {
  return $std_core._lp__plus__plus__1_rp_("unrecognized flag \"", $std_core._lp__plus__plus__1_rp_(opt, "\""));
}
 
export function show_flags(o) /* (o : myflags) -> string */  {
   
  var _x52 = (o.verbose) ? "True" : "False";
  var _x53 = (o.version) ? "True" : "False";
  var _x54 = o.name;
  var _x55 = o.output;
  if (o.$arguments === null) {
    var _x56 = "";
  }
  else {
    var _x56 = $std_core._lift17188_joinsep(",", o.$arguments.tail, o.$arguments.head);
  }
  var xs_5620 = $std_core.Cons($std_core._lp__plus__plus__1_rp_("verbose=", _x52), $std_core.Cons($std_core._lp__plus__plus__1_rp_("version=", _x53), $std_core.Cons($std_core._lp__plus__plus__1_rp_("name=", $std_core.show_3(_x54)), $std_core.Cons($std_core._lp__plus__plus__1_rp_("output=", $std_core.show_3(_x55)), $std_core.Cons($std_core._lp__plus__plus__1_rp_("arguments=", _x56), $std_core.Nil)))));
  if (xs_5620 === null) {
    var _x52 = "";
  }
  else {
    var _x52 = $std_core._lift17188_joinsep(";", xs_5620.tail, xs_5620.head);
  }
  return $std_core._lp__plus__plus__1_rp_("{", $std_core._lp__plus__plus__1_rp_(_x52, "}"));
}
 
export var myflags;
var myflags = $std_core.Cons(Flag("V?", $std_core.Cons("version", $std_core.Nil), Bool(set_version), "display version information"), $std_core.Cons(Flag("v", $std_core.Cons("verbose", $std_core.Nil), Bool(set_verbose), "verbosely list files"), $std_core.Cons(Flag("o", $std_core.Cons("output", $std_core.Nil), Opt(set_output, "FILE"), "use FILE for dump"), $std_core.Cons(Flag("n", $std_core.Cons("name", $std_core.Nil), Req(set_name, "USER"), "only show USER files"), $std_core.Nil))));
 
export function _create_Myflags(verbose0, version0, name0, output0, arguments0) /* (verbose : optional<bool>, version : optional<bool>, name : optional<string>, output : optional<string>, arguments : optional<list<string>>) -> myflags */  {
  var _x53 = (verbose0 !== undefined) ? verbose0 : false;
  var _x54 = (version0 !== undefined) ? version0 : false;
  var _x55 = (name0 !== undefined) ? name0 : "";
  var _x56 = (output0 !== undefined) ? output0 : "";
  var _x57 = (arguments0 !== undefined) ? arguments0 : $std_core.Nil;
  return Myflags(_x53, _x54, _x55, _x56, _x57);
}
 
export function show_flag(flag) /* forall<a> (flag : flag<a>) -> list<(string, string, string)> */  {
   
  var _x58 = flag.short_names;
  var xs_5631 = $std_core.map_5($std_core.list_6(_x58), function(c /* char */ ) {
      if (flag.parser._tag === 1) {
        var _x59 = "";
      }
      else if (flag.parser._tag === 2) {
        var _x59 = $std_core._lp__plus__plus__1_rp_("<", $std_core._lp__plus__plus__1_rp_(flag.parser.help, ">"));
      }
      else {
        var _x59 = $std_core._lp__plus__plus__1_rp_("[", $std_core._lp__plus__plus__1_rp_(flag.parser.help, "]"));
      }
      return $std_core._lp__plus__plus__1_rp_("-", $std_core._lp__plus__plus__1_rp_($std_core.string(c), _x59));
    });
   
  if (xs_5631 === null) {
    var short = "";
  }
  else {
    var short = $std_core._lift17188_joinsep(" ", xs_5631.tail, xs_5631.head);
  }
   
  var _x60 = flag.long_names;
  var xs0_5636 = $std_core.map_5(_x60, function(name0 /* string */ ) {
      if (flag.parser._tag === 1) {
        var _x61 = "";
      }
      else if (flag.parser._tag === 2) {
        var _x61 = $std_core._lp__plus__plus__1_rp_("=", flag.parser.help);
      }
      else {
        var _x61 = $std_core._lp__plus__plus__1_rp_("[=", $std_core._lp__plus__plus__1_rp_(flag.parser.help, "]"));
      }
      return $std_core._lp__plus__plus__1_rp_("--", $std_core._lp__plus__plus__1_rp_(name0, _x61));
    });
   
  if (xs0_5636 === null) {
    var long = "";
  }
  else {
    var long = $std_core._lift17188_joinsep(" ", xs0_5636.tail, xs0_5636.head);
  }
   
  var _x62 = flag.help;
  var v_17126 = ((_x62).split(("\n")));
  var _x58 = $std_core.vlist(v_17126);
  if (_x58 !== null) {
     
    var ys_5644 = $std_core.map_5(_x58.tail, function(s0 /* string */ ) {
        return $std_core_types._Tuple3_("", "", s0);
      });
    return $std_core.append($std_core.Cons($std_core_types._Tuple3_(short, long, _x58.head), $std_core.Nil), ys_5644);
  }
  else {
    return $std_core.Cons($std_core_types._Tuple3_(short, long, ""), $std_core.Nil);
  }
}
 
 
// monadic lift
export function _mlift5766_zipWith3Acc(acc, f, xx, yy, zz, _y_5760) /* forall<e,a,b,c,d> (acc : list<b>, f : (a, c, d) -> e b, xx : list<a>, yy : list<c>, zz : list<d>, b) -> e list<b> */  {
  return zipWith3Acc(f, $std_core.Cons(_y_5760, acc), xx, yy, zz);
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
         
        var x0_5767 = f0(xs.head, ys.head, zs.head);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_57600 /* 3032 */ ) {
            return _mlift5766_zipWith3Acc(acc0, f0, xs.tail, ys.tail, zs.tail, _y_57600);
          });
        }
        else {
          {
            // tail call
            var _x59 = $std_core.Cons(x0_5767, acc0);
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
// consisting of a `header` followed by the descriptions of the `flags`.
// The default header is ``"usage:\n program [flags] arguments\n\nflags:"``.
export function usage(flags, header) /* forall<a> (flags : list<flag<a>>, header : optional<string>) -> string */  {
   
  function align_left(xs) /* (xs : list<string>) -> list<string> */  {
     
    var xs0_5645 = $std_core.map_5(xs, $std_core.count_1);
     
    if (xs0_5645 === null) {
      var _x60 = undefined;
      var n = (_x60 !== undefined) ? _x60 : 0;
    }
    else {
      var n = $std_core.foldl(xs0_5645.tail, xs0_5645.head, $std_core.max);
    }
    return $std_core.map_5(xs, function(s0 /* string */ ) {
        return $std_core.pad_right(s0, n);
      });
  }
   
  var xss_5647 = $std_core.map_5(flags, show_flag);
   
  var xs0_5770 = $std_core._lift17183_concat($std_core.Nil, xss_5647);
  var _x60 = _lift5759_unzip3(xs0_5770, $std_core.Nil, $std_core.Nil, $std_core.Nil);
   
  var xs1_5649 = align_left(_x60.fst);
   
  var ys_5650 = align_left(_x60.snd);
   
  var table = zipWith3Acc(function(x0 /* string */ , y /* string */ , z /* string */ ) {
      return $std_core._lp__plus__plus__1_rp_(" ", $std_core._lp__plus__plus__1_rp_(x0, $std_core._lp__plus__plus__1_rp_("  ", $std_core._lp__plus__plus__1_rp_(y, $std_core._lp__plus__plus__1_rp_("  ", z)))));
    }, $std_core.Nil, xs1_5649, ys_5650, _x60.thd);
  var _x61 = (header !== undefined) ? header : "usage:\n program [flags] arguments\n\nflags:";
  if (table === null) {
    var _x62 = "";
  }
  else {
    var _x62 = $std_core._lift17203_unlines(table.tail, table.head);
  }
  return $std_core._lp__plus__plus__1_rp_(_x61, $std_core._lp__plus__plus__1_rp_("\n", _x62));
}
 
export function error_ambiguous(applicable, opt) /* forall<a,b> (applicable : list<flag<a>>, opt : string) -> flag-kind<b> */  {
   
  var header = $std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(opt, "\" is ambiguous. It could be one of:"));
  return $Error(usage(applicable, header));
}
 
export function error_unknown(opt) /* forall<a> (opt : string) -> flag-kind<a> */  {
  return $Error($std_core._lp__plus__plus__1_rp_("unrecognized flag \"", $std_core._lp__plus__plus__1_rp_(opt, "\"")));
}
 
export function parse_long(s, flags) /* forall<a> (s : string, flags : list<flag<a>>) -> total flag-kind<a> */  {
   
  var v_17123 = (s).split(("="), 2);
   
  var parts = $std_core.vlist(v_17123);
  if (parts !== null && parts.tail !== null) {
     
    var optstr = $std_core._lp__plus__plus__1_rp_("--", s);
     
    var flagname = $std_core.to_lower(parts.head);
    var _x63 = $std_core.starts_with(flagname, "no-");
    if (_x63 !== null) {
       
      var baseflagname = $std_core.string_3(_x63.value);
       
      var exacts = $std_core.filter(flags, function(opt /* flag<4489> */ ) {
          var _x64 = opt.long_names;
          return $std_core.any($std_core.map_5(_x64, $std_core.to_lower), function(name0 /* string */ ) {
              return ((name0 === flagname)) ? true : (name0 === baseflagname);
            });
        });
       
      var prefixes = $std_core.filter(flags, function(opt0 /* flag<4489> */ ) {
          var _x65 = opt0.long_names;
          return $std_core.any($std_core.map_5(_x65, $std_core.to_lower), function(name00 /* string */ ) {
               
              var m_5661 = $std_core.starts_with(name00, flagname);
              if (m_5661 === null) {
                 
                var m0_5662 = $std_core.starts_with(name00, baseflagname);
                return (m0_5662 === null) ? false : true;
              }
              else {
                return true;
              }
            });
        });
      var _x64 = (exacts === null) ? prefixes : exacts;
      if (_x64 === null) {
        return $Error($std_core._lp__plus__plus__1_rp_("unrecognized flag \"", $std_core._lp__plus__plus__1_rp_(optstr, "\"")));
      }
      else if (_x64 !== null && _x64.tail !== null) {
         
        var header = $std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(optstr, "\" is ambiguous. It could be one of:"));
        var _x65 = (exacts === null) ? prefixes : exacts;
        return $Error(usage(_x65, header));
      }
      else {
        if (_x64.head.parser._tag === 1) {
          if (((parts.tail.head) === (""))) {
            return Flg(function(o /* 4489 */ ) {
              return _x64.head.parser.$default(o, false);
            });
          }
          else {
            var _x66 = (($std_core.to_lower(parts.tail.head)) === ("true"));
            if (_x66) {
              return Flg(function(o0 /* 4489 */ ) {
                return _x64.head.parser.$default(o0, true);
              });
            }
            else {
              var _x67 = (($std_core.to_lower(parts.tail.head)) === ("false"));
              if (_x67) {
                return Flg(function(o1 /* 4489 */ ) {
                  return _x64.head.parser.$default(o1, false);
                });
              }
              else {
                return $Error($std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(optstr, "\" does not take an argument")));
              }
            }
          }
        }
        else if (_x64.head.parser._tag === 2) {
          return $Error($std_core._lp__plus__plus__1_rp_("flag \"--", $std_core._lp__plus__plus__1_rp_(baseflagname, "\" cannot be negated")));
        }
        else {
          return $Error($std_core._lp__plus__plus__1_rp_("flag \"--", $std_core._lp__plus__plus__1_rp_(baseflagname, "\" cannot be negated")));
        }
      }
    }
    else {
       
      var exacts0 = $std_core.filter(flags, function(opt4 /* flag<4489> */ ) {
          var _x68 = opt4.long_names;
          return $std_core.any($std_core.map_5(_x68, $std_core.to_lower), function(name1 /* string */ ) {
              return ((name1 === flagname)) ? true : (name1 === flagname);
            });
        });
       
      var prefixes0 = $std_core.filter(flags, function(opt00 /* flag<4489> */ ) {
          var _x69 = opt00.long_names;
          return $std_core.any($std_core.map_5(_x69, $std_core.to_lower), function(name01 /* string */ ) {
               
              var m1_5673 = $std_core.starts_with(name01, flagname);
              if (m1_5673 === null) {
                 
                var m2_5674 = $std_core.starts_with(name01, flagname);
                return (m2_5674 === null) ? false : true;
              }
              else {
                return true;
              }
            });
        });
      var _x68 = (exacts0 === null) ? prefixes0 : exacts0;
      if (_x68 === null) {
        return $Error($std_core._lp__plus__plus__1_rp_("unrecognized flag \"", $std_core._lp__plus__plus__1_rp_(optstr, "\"")));
      }
      else if (_x68 !== null && _x68.tail !== null) {
         
        var header0 = $std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(optstr, "\" is ambiguous. It could be one of:"));
        var _x69 = (exacts0 === null) ? prefixes0 : exacts0;
        return $Error(usage(_x69, header0));
      }
      else {
        if (_x68.head.parser._tag === 1) {
          if (((parts.tail.head) === (""))) {
            return Flg(function(o2 /* 4489 */ ) {
              return _x68.head.parser.$default(o2, true);
            });
          }
          else {
            var _x70 = (($std_core.to_lower(parts.tail.head)) === ("true"));
            if (_x70) {
              return Flg(function(o00 /* 4489 */ ) {
                return _x68.head.parser.$default(o00, true);
              });
            }
            else {
              var _x71 = (($std_core.to_lower(parts.tail.head)) === ("false"));
              if (_x71) {
                return Flg(function(o10 /* 4489 */ ) {
                  return _x68.head.parser.$default(o10, false);
                });
              }
              else {
                return $Error($std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(optstr, "\" does not take an argument")));
              }
            }
          }
        }
        else if (_x68.head.parser._tag === 2) {
          if (((parts.tail.head) !== (""))) {
            return Flg(function(o20 /* 4489 */ ) {
              return _x68.head.parser.parse(o20, parts.tail.head);
            });
          }
          else {
            return $Error($std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(optstr, $std_core._lp__plus__plus__1_rp_("\" requires an argument ", _x68.head.parser.help))));
          }
        }
        else {
          if (((parts.tail.head) !== (""))) {
            return Flg(function(o3 /* 4489 */ ) {
              return _x68.head.parser.parse(o3, $std_core_types.Just(parts.tail.head));
            });
          }
          else {
            return Flg(function(o4 /* 4489 */ ) {
              return _x68.head.parser.parse(o4, $std_core_types.Nothing);
            });
          }
        }
      }
    }
  }
  else {
     
    var optstr0 = $std_core._lp__plus__plus__1_rp_("--", s);
     
    var flagname0 = $std_core.to_lower(s);
    var _x72 = $std_core.starts_with(flagname0, "no-");
    if (_x72 !== null) {
       
      var baseflagname0 = $std_core.string_3(_x72.value);
       
      var exacts1 = $std_core.filter(flags, function(opt10 /* flag<4489> */ ) {
          var _x73 = opt10.long_names;
          return $std_core.any($std_core.map_5(_x73, $std_core.to_lower), function(name02 /* string */ ) {
              return ((name02 === flagname0)) ? true : (name02 === baseflagname0);
            });
        });
       
      var prefixes1 = $std_core.filter(flags, function(opt01 /* flag<4489> */ ) {
          var _x74 = opt01.long_names;
          return $std_core.any($std_core.map_5(_x74, $std_core.to_lower), function(name000 /* string */ ) {
               
              var m_56610 = $std_core.starts_with(name000, flagname0);
              if (m_56610 === null) {
                 
                var m0_56620 = $std_core.starts_with(name000, baseflagname0);
                return (m0_56620 === null) ? false : true;
              }
              else {
                return true;
              }
            });
        });
      var _x73 = (exacts1 === null) ? prefixes1 : exacts1;
      if (_x73 === null) {
        return $Error($std_core._lp__plus__plus__1_rp_("unrecognized flag \"", $std_core._lp__plus__plus__1_rp_(optstr0, "\"")));
      }
      else if (_x73 !== null && _x73.tail !== null) {
         
        var header1 = $std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(optstr0, "\" is ambiguous. It could be one of:"));
        var _x74 = (exacts1 === null) ? prefixes1 : exacts1;
        return $Error(usage(_x74, header1));
      }
      else {
        if (_x73.head.parser._tag === 1) {
          if ((("") === (""))) {
            return Flg(function(o5 /* 4489 */ ) {
              return _x73.head.parser.$default(o5, false);
            });
          }
          else {
            var _x75 = (($std_core.to_lower("")) === ("true"));
            if (_x75) {
              return Flg(function(o01 /* 4489 */ ) {
                return _x73.head.parser.$default(o01, true);
              });
            }
            else {
              var _x76 = (($std_core.to_lower("")) === ("false"));
              if (_x76) {
                return Flg(function(o11 /* 4489 */ ) {
                  return _x73.head.parser.$default(o11, false);
                });
              }
              else {
                return $Error($std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(optstr0, "\" does not take an argument")));
              }
            }
          }
        }
        else if (_x73.head.parser._tag === 2) {
          return $Error($std_core._lp__plus__plus__1_rp_("flag \"--", $std_core._lp__plus__plus__1_rp_(baseflagname0, "\" cannot be negated")));
        }
        else {
          return $Error($std_core._lp__plus__plus__1_rp_("flag \"--", $std_core._lp__plus__plus__1_rp_(baseflagname0, "\" cannot be negated")));
        }
      }
    }
    else {
       
      var exacts00 = $std_core.filter(flags, function(opt40 /* flag<4489> */ ) {
          var _x77 = opt40.long_names;
          return $std_core.any($std_core.map_5(_x77, $std_core.to_lower), function(name10 /* string */ ) {
              return ((name10 === flagname0)) ? true : (name10 === flagname0);
            });
        });
       
      var prefixes00 = $std_core.filter(flags, function(opt000 /* flag<4489> */ ) {
          var _x78 = opt000.long_names;
          return $std_core.any($std_core.map_5(_x78, $std_core.to_lower), function(name010 /* string */ ) {
               
              var m1_56730 = $std_core.starts_with(name010, flagname0);
              if (m1_56730 === null) {
                 
                var m2_56740 = $std_core.starts_with(name010, flagname0);
                return (m2_56740 === null) ? false : true;
              }
              else {
                return true;
              }
            });
        });
      var _x77 = (exacts00 === null) ? prefixes00 : exacts00;
      if (_x77 === null) {
        return $Error($std_core._lp__plus__plus__1_rp_("unrecognized flag \"", $std_core._lp__plus__plus__1_rp_(optstr0, "\"")));
      }
      else if (_x77 !== null && _x77.tail !== null) {
         
        var header2 = $std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(optstr0, "\" is ambiguous. It could be one of:"));
        var _x78 = (exacts00 === null) ? prefixes00 : exacts00;
        return $Error(usage(_x78, header2));
      }
      else {
        if (_x77.head.parser._tag === 1) {
          if ((("") === (""))) {
            return Flg(function(o21 /* 4489 */ ) {
              return _x77.head.parser.$default(o21, true);
            });
          }
          else {
            var _x79 = (($std_core.to_lower("")) === ("true"));
            if (_x79) {
              return Flg(function(o000 /* 4489 */ ) {
                return _x77.head.parser.$default(o000, true);
              });
            }
            else {
              var _x80 = (($std_core.to_lower("")) === ("false"));
              if (_x80) {
                return Flg(function(o100 /* 4489 */ ) {
                  return _x77.head.parser.$default(o100, false);
                });
              }
              else {
                return $Error($std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(optstr0, "\" does not take an argument")));
              }
            }
          }
        }
        else if (_x77.head.parser._tag === 2) {
          if ((("") !== (""))) {
            return Flg(function(o200 /* 4489 */ ) {
              return _x77.head.parser.parse(o200, "");
            });
          }
          else {
            return $Error($std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(optstr0, $std_core._lp__plus__plus__1_rp_("\" requires an argument ", _x77.head.parser.help))));
          }
        }
        else {
          if ((("") !== (""))) {
            return Flg(function(o30 /* 4489 */ ) {
              return _x77.head.parser.parse(o30, $std_core_types.Just(""));
            });
          }
          else {
            return Flg(function(o40 /* 4489 */ ) {
              return _x77.head.parser.parse(o40, $std_core_types.Nothing);
            });
          }
        }
      }
    }
  }
}
 
export function parse_shorts(s, flags) /* forall<a> (s : string, flags : list<flag<a>>) -> list<flag-kind<a>> */  {
  return function() {
     
    var loc = { value: false };
     
    var fs = $std_core.map_indexed($std_core.list_6(s), function(i /* int */ , c /* char */ ) {
        var _x81 = ((loc).value);
        if (_x81) {
          return $std_core_types.Nothing;
        }
        else {
           
          var optstr = $std_core._lp__plus__plus__1_rp_("-", $std_core.string(c));
           
          var applicable = $std_core.filter(flags, function(opt /* flag<4856> */ ) {
              var _x82 = opt.short_names;
              return ((_x82).indexOf(($std_core.string(c))) >= 0);
            });
          if (applicable === null) {
            return $std_core_types.Just($Error($std_core._lp__plus__plus__1_rp_("unrecognized flag \"", $std_core._lp__plus__plus__1_rp_(optstr, "\""))));
          }
          else if (applicable !== null && applicable.tail !== null) {
            return $std_core_types.Just(error_ambiguous(applicable, optstr));
          }
          else {
            if (applicable.head.parser._tag === 1) {
              return $std_core_types.Just(Flg(function(o /* 4856 */ ) {
                return applicable.head.parser.$default(o, true);
              }));
            }
            else if (applicable.head.parser._tag === 2) {
               
              var arg = $std_core.string_3($std_core.after($std_core.advance($std_core.first(s), i)));
              if ((arg !== (""))) {
                 
                ((loc).value = true);
                return $std_core_types.Just(Flg(function(o0 /* 4856 */ ) {
                  return applicable.head.parser.parse(o0, arg);
                }));
              }
              else {
                return $std_core_types.Just($Error($std_core._lp__plus__plus__1_rp_("flag \"", $std_core._lp__plus__plus__1_rp_(optstr, $std_core._lp__plus__plus__1_rp_("\" requires an argument ", applicable.head.parser.help)))));
              }
            }
            else {
               
              var arg0 = $std_core.string_3($std_core.after($std_core.advance($std_core.first(s), i)));
              if ((arg0 !== (""))) {
                 
                ((loc).value = true);
                return $std_core_types.Just(Flg(function(o1 /* 4856 */ ) {
                  return applicable.head.parser.parse(o1, $std_core_types.Just(arg0));
                }));
              }
              else {
                return $std_core_types.Just(Flg(function(o2 /* 4856 */ ) {
                  return applicable.head.parser.parse(o2, $std_core_types.Nothing);
                }));
              }
            }
          }
        }
      });
     
    var res = $std_core.flatmap(fs, $std_core.list_5);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
export function process_next(arg, flags) /* forall<a> (arg : string, flags : list<flag<a>>) -> list<flag-kind<a>> */  {
  var _x81 = $std_core.starts_with(arg, "--");
  if (_x81 !== null) {
     
    var _x82 = _x81.value.len;
    var b_17019 = (_x82 > 0);
    if (b_17019) {
      return $std_core.Cons(parse_long($std_core.string_3(_x81.value), flags), $std_core.Nil);
    }
    else {
      return $std_core.Cons(End, $std_core.Nil);
    }
  }
  else {
    var _x82 = $std_core.starts_with(arg, "-");
    if (_x82 !== null) {
       
      var _x83 = _x82.value.len;
      var b_170190 = (_x83 > 0);
      var _x83 = (b_170190);
      if (_x83){
        return parse_shorts($std_core.string_3(_x82.value), flags);
      }
    }
    return $std_core.Cons(Arg(arg), $std_core.Nil);
  }
}
 
 
// Parse the command line arguments `args` (see `std/env/get-args`)
// according to the flag descriptions `flags`. Takes an flagal argument
// `ordering` (=`Permute`) that specifies how optare handled that follow non-flag arguments.
// Returns three lists: the list of parsed flags,
// a list of non-flag arguments, and a list of potential error messages.
export function parse(initial, flags, args, ordering) /* forall<a> (initial : a, flags : list<flag<a>>, args : list<string>, ordering : optional<flag-order<a>>) -> total (a, list<string>, list<string>) */  {
  return function() {
     
    var loc = { value: false };
     
    var opts0 = $std_core.map_5(args, function(arg /* string */ ) {
         
        var _x84 = ((loc).value);
        if (_x84) {
          var opts = $std_core.Cons(Arg(arg), $std_core.Nil);
        }
        else {
          var opts = process_next(arg, flags);
        }
         
        $std_core.foreach(opts, function(opt /* flag-kind<5309> */ ) {
            if (opt._tag === 3) {
              return ((loc).value = true);
            }
            if (opt._tag === 2) {
              var _x86 = (ordering !== undefined) ? ordering : Permute;
              var _x85 = (_x86._tag === 2);
              if (_x85){
                return ((loc).value = true);
              }
            }
            return $std_core_types._Unit_;
          });
        return opts;
      });
     
    var res = $std_core.foldl($std_core._lift17183_concat($std_core.Nil, opts0), $std_core_types._Tuple3_(initial, $std_core.Nil, $std_core.Nil), function(acc /* (5309, list<string>, list<string>) */ , opt0 /* flag-kind<5309> */ ) {
        if (opt0._tag === 1) {
          return $std_core_types._Tuple3_(opt0.set(acc.fst), acc.snd, acc.thd);
        }
        else if (opt0._tag === 4) {
          return $std_core_types._Tuple3_(acc.fst, acc.snd, $std_core.Cons($std_core._lp__plus__plus__1_rp_("unrecognized flag \"", $std_core._lp__plus__plus__1_rp_(opt0.arg, "\"")), acc.thd));
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
  var _x86 = undefined;
  var _x85 = (_x86 !== undefined) ? _x86 : false;
  var _x88 = undefined;
  var _x87 = (_x88 !== undefined) ? _x88 : false;
  var _x90 = undefined;
  var _x89 = (_x90 !== undefined) ? _x90 : "";
  var _x92 = undefined;
  var _x91 = (_x92 !== undefined) ? _x92 : "";
  var _x94 = undefined;
  var _x93 = (_x94 !== undefined) ? _x94 : $std_core.Nil;
  var _x84 = parse(Myflags(_x85, _x87, _x89, _x91, _x93), myflags, cmdargs);
  if (_x84.thd === null) {
     
    $std_core.printsln("\nsuccess!");
     
    var s0_5708 = $std_core._lp__plus__plus__1_rp_("flags: ", show_flags(_x84.fst));
     
    $std_core.printsln(s0_5708);
     
    if (_x84.snd === null) {
      var _x95 = "";
    }
    else {
      var _x95 = $std_core._lift17188_joinsep(" ", _x84.snd.tail, _x84.snd.head);
    }
    var s1_5709 = $std_core._lp__plus__plus__1_rp_("arguments: ", _x95);
     
    $std_core.printsln(s1_5709);
    if (_x84.fst.version) {
       
      var s2_5713 = usage(myflags, "usage:\n program [options] files\n\noptions:");
      return $std_core.printsln(s2_5713);
    }
    else {
      return $std_core_types._Unit_;
    }
  }
  else {
     
    if (_x84.thd === null) {
      var _x95 = "";
    }
    else {
      var _x95 = $std_core._lift17188_joinsep("\n", _x84.thd.tail, _x84.thd.head);
    }
    var s3_5714 = $std_core._lp__plus__plus__1_rp_(_x95, $std_core._lp__plus__plus__1_rp_("\n", usage(myflags, "usage:\n program [options] files\n\noptions:")));
    return $std_core.printsln(s3_5714);
  }
}