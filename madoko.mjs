// Koka generated module: "main", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $compat from './compat.mjs';
import * as $compat_regex from './compat_regex.mjs';
import * as $compat_path from './compat_path.mjs';
import * as $compat_dict from './compat_dict.mjs';
import * as $compat_log from './compat_log.mjs';
import * as $common from './common.mjs';
import * as $stringcompat from './stringcompat.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_os_flags from './std_os_flags.mjs';
import * as $compat_env from './compat_env.mjs';
import * as $options from './options.mjs';
import * as $storage from './storage.mjs';
import * as $optionsMeta from './optionsMeta.mjs';
import * as $expression from './expression.mjs';
import * as $metadata from './metadata.mjs';
import * as $entity from './entity.mjs';
import * as $attributes from './attributes.mjs';
import * as $block from './block.mjs';
import * as $compat_array from './compat_array.mjs';
import * as $compat_string from './compat_string.mjs';
import * as $codeAlign from './codeAlign.mjs';
import * as $inline from './inline.mjs';
import * as $texCommon from './texCommon.mjs';
import * as $cssFormatter from './cssFormatter.mjs';
import * as $latexFormatter from './latexFormatter.mjs';
import * as $hilite from './hilite.mjs';
import * as $formatInline from './formatInline.mjs';
import * as $formatBlock from './formatBlock.mjs';
import * as $texParserBase from './texParserBase.mjs';
import * as $texParserItems from './texParserItems.mjs';
import * as $texParser from './texParser.mjs';
import * as $definitions from './definitions.mjs';
import * as $includes from './includes.mjs';
import * as $version from './version.mjs';
import * as $madoko from './madoko.mjs';
import * as $driver from './driver.mjs';
 
// externals
 
// type declarations
 
// declarations
 
 
// monadic lift
export function _mlift2291_markdownFiles(_c_2202, action, opts, outName, _y_2204) /* (string, action : (string, string, string, options/options) -> io (), opts : options/commandOptions, outName : string, either<exception,string>) -> io () */  {
  if (_y_2204._tag === 1) {
    return $std_core.printsln($std_core._lp__plus__plus__1_rp_("error: unable to read: ", _c_2202));
  }
  else {
    return $driver.processContent(_c_2202, outName, _y_2204.right, opts, true, action);
  }
}
 
 
// monadic lift
export function _mlift2292_markdownFiles(_c_2202, action, opts, outName, _c_2203) /* (string, action : (string, string, string, options/options) -> io (), opts : options/commandOptions, outName : string, ()) -> () */  {
   
  var x_2307 = $storage.tryReadTextFile(_c_2202);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2204 /* either<exception,string> */ ) {
      return _mlift2291_markdownFiles(_c_2202, action, opts, outName, _y_2204);
    });
  }
  else {
    return _mlift2291_markdownFiles(_c_2202, action, opts, outName, x_2307);
  }
}
 
 
// monadic lift
export function _mlift2293_markdownFiles(action, opts, _c_2202) /* (action : (string, string, string, options/options) -> io (), opts : options/commandOptions, string) -> () */  {
   
  var outName = $std_core_hnd._open_none2($driver.outputName, _c_2202, opts);
   
  var _x17_2258 = $std_core_hnd._open_none1(function(commandOptions3 /* options/commandOptions */ ) {
      return commandOptions3.options;
    }, opts);
   
  var _x0 = $std_core._int_gt(($std_core_hnd._open_none1(function(options0 /* options/options */ ) {
      return options0.verbose;
    }, _x17_2258)),0);
  if (_x0) {
    var x_2309 = $std_core.printsln($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_("process: ", _c_2202), " -> "), outName));
  }
  else {
    var x_2309 = $std_core_types._Unit_;
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_2203 /* () */ ) {
      return _mlift2292_markdownFiles(_c_2202, action, opts, outName, _c_2203);
    });
  }
  else {
    return _mlift2292_markdownFiles(_c_2202, action, opts, outName, x_2309);
  }
}
 
 
// monadic lift
export function _mlift2294_markdownFiles(xdir) /* (xdir : string) -> io () */  {
  var _x1 = undefined;
  var _x0 = (_x1 !== undefined) ? _x1 : 511;
  return $storage.xmkdirp(xdir, _x0);
}
 
 
// monadic lift
export function _mlift2295_markdownFiles(opts, _y_2197) /* (opts : options/commandOptions, bool) -> io () */  {
  var _x2 = $std_core_hnd._open_none1(function(b /* bool */ ) {
      return (b) ? false : true;
    }, _y_2197);
  if (_x2) {
     
    var dir_2190 = $std_core_hnd._open_none1(function(commandOptions1 /* options/commandOptions */ ) {
        return commandOptions1.outputDir;
      }, opts);
     
    var x_2311 = $storage.checkSandbox(dir_2190);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(_mlift2294_markdownFiles);
    }
    else {
      var _x4 = undefined;
      var _x3 = (_x4 !== undefined) ? _x4 : 511;
      return $storage.xmkdirp(x_2311, _x3);
    }
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
 
// monadic lift
export function _mlift2296_markdownFiles(action, opts, _c_2201) /* (action : (string, string, string, options/options) -> io (), opts : options/commandOptions, ()) -> () */  {
  return $std_core.foreach($std_core_hnd._open_none1(function(commandOptions2 /* options/commandOptions */ ) {
        return commandOptions2.inputs;
      }, opts), function(input0 /* string */ ) {
       
      var _x5 = (($std_core_hnd._open_none1($compat.extname, input0)) === (""));
      if (_x5) {
        var x = $std_core._lp__plus__plus__1_rp_(input0, ".mdk");
      }
      else {
        var x = input0;
      }
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_c_2202 /* string */ ) {
          return _mlift2293_markdownFiles(action, opts, _c_2202);
        });
      }
      else {
        return _mlift2293_markdownFiles(action, opts, x);
      }
    });
}
 
 
// monadic lift
export function _mlift2297_markdownFiles(action, mbopts) /* (action : (string, string, string, options/options) -> io (), mbopts : maybe<options/commandOptions>) -> io () */  {
  if (mbopts === null) {
    return $std_core_types._Unit_;
  }
  else {
     
    var _x5 = (($std_core_hnd._open_none1(function(commandOptions /* options/commandOptions */ ) {
        return commandOptions.outputDir;
      }, mbopts.value)) !== (""));
    if (_x5) {
       
      var x0_2313 = $storage.fexistsSync($std_core_hnd._open_none1(function(commandOptions0 /* options/commandOptions */ ) {
          return commandOptions0.outputDir;
        }, mbopts.value));
      if ($std_core_hnd._yielding()) {
        var x = $std_core_hnd.yield_extend(function(_y_2197 /* bool */ ) {
          return _mlift2295_markdownFiles(mbopts.value, _y_2197);
        });
      }
      else {
        var x = _mlift2295_markdownFiles(mbopts.value, x0_2313);
      }
    }
    else {
      var x = $std_core_types._Unit_;
    }
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_c_2201 /* () */ ) {
        return _mlift2296_markdownFiles(action, mbopts.value, _c_2201);
      });
    }
    else {
      return _mlift2296_markdownFiles(action, mbopts.value, x);
    }
  }
}
 
export function markdownFiles(args, action) /* (args : string, action : (string, string, string, options/options) -> io ()) -> io () */  {
   
  var x_2315 = $options.parseOptions("1.2.0", args);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(mbopts /* maybe<options/commandOptions> */ ) {
      return _mlift2297_markdownFiles(action, mbopts);
    });
  }
  else {
    if (x_2315 === null) {
      return $std_core_types._Unit_;
    }
    else {
       
      var _x5 = (($std_core_hnd._open_none1(function(commandOptions /* options/commandOptions */ ) {
          return commandOptions.outputDir;
        }, x_2315.value)) !== (""));
      if (_x5) {
         
        var x1_2318 = $storage.fexistsSync($std_core_hnd._open_none1(function(commandOptions0 /* options/commandOptions */ ) {
            return commandOptions0.outputDir;
          }, x_2315.value));
        if ($std_core_hnd._yielding()) {
          var x0 = $std_core_hnd.yield_extend(function(_y_2197 /* bool */ ) {
            return _mlift2295_markdownFiles(x_2315.value, _y_2197);
          });
        }
        else {
          var x0 = _mlift2295_markdownFiles(x_2315.value, x1_2318);
        }
      }
      else {
        var x0 = $std_core_types._Unit_;
      }
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_c_2201 /* () */ ) {
          return _mlift2296_markdownFiles(action, x_2315.value, _c_2201);
        });
      }
      else {
        return $std_core.foreach($std_core_hnd._open_none1(function(commandOptions2 /* options/commandOptions */ ) {
              return commandOptions2.inputs;
            }, x_2315.value), function(input0 /* string */ ) {
             
            var _x5 = (($std_core_hnd._open_none1($compat.extname, input0)) === (""));
            if (_x5) {
              var x2 = $std_core._lp__plus__plus__1_rp_(input0, ".mdk");
            }
            else {
              var x2 = input0;
            }
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_c_2202 /* string */ ) {
                return _mlift2293_markdownFiles(action, x_2315.value, _c_2202);
              });
            }
            else {
              return _mlift2293_markdownFiles(action, x_2315.value, x2);
            }
          });
      }
    }
  }
}
 
export function main() /* () -> io () */  {
  return markdownFiles("", function(html /* string */ , inName /* string */ , outName /* string */ , opts /* options/options */ ) {
      return $std_core_types._Unit_;
    });
}
 
export function _hmain() /* () -> <st<global>,console,div,fsys,ndet,net,ui> () */  {
  return $std_core._default_exn(function() {
    return markdownFiles("", function(html /* string */ , inName /* string */ , outName /* string */ , opts /* options/options */ ) {
        return $std_core_types._Unit_;
      });
  });
}
 
 
// monadic lift
export function _mlift2298_test(_y_2218, targetStrip, _y_2219) /* forall<h> (int, targetStrip : string, int) -> <local<h>,alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>> () */  {
   
  var _x28_2289 = $std_core._int_add(_y_2219,20);
   
  $std_core.trace($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_("expected: ", $std_core_hnd._open_none3(function(s4 /* string */ , start3 /* int */ , len1 /* int */ ) {
              if ($std_core._int_le(len1,0)) {
                return "";
              }
              else {
                return $compat.substr2(s4, start3, len1);
              }
            }, targetStrip, _y_2218, 20)), " "), $std_core_hnd._open_none3(function(s5 /* string */ , start4 /* int */ , len2 /* int */ ) {
          if ($std_core._int_le(len2,0)) {
            return "";
          }
          else {
            return $compat.substr2(s5, start4, len2);
          }
        }, targetStrip, _x28_2289, 40)), "..."));
  return $std_core.trace("***");
}
 
 
// monadic lift
export function _mlift2299_test(i, targetStrip, _y_2218) /* forall<h> (i : local-var<h,int>, targetStrip : string, int) -> <local<h>,alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>> () */  {
   
  var x_2320 = ((i).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2219 /* int */ ) {
      return _mlift2298_test(_y_2218, targetStrip, _y_2219);
    });
  }
  else {
    return _mlift2298_test(_y_2218, targetStrip, x_2320);
  }
}
 
 
// monadic lift
export function _mlift2300_test(_y_2216, i, outStrip, targetStrip, _y_2217) /* forall<h> (int, i : local-var<h,int>, outStrip : string, targetStrip : string, int) -> <local<h>,alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>> () */  {
   
  var _x26_2283 = $std_core._int_add(_y_2217,20);
   
  $std_core.trace($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_("inferred: ", $std_core_hnd._open_none3(function(s2 /* string */ , start1 /* int */ , len /* int */ ) {
              if ($std_core._int_le(len,0)) {
                return "";
              }
              else {
                return $compat.substr2(s2, start1, len);
              }
            }, outStrip, _y_2216, 20)), " "), $std_core_hnd._open_none3(function(s3 /* string */ , start2 /* int */ , len0 /* int */ ) {
          if ($std_core._int_le(len0,0)) {
            return "";
          }
          else {
            return $compat.substr2(s3, start2, len0);
          }
        }, outStrip, _x26_2283, 40)), " ..."));
   
  var x_2322 = ((i).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2218 /* int */ ) {
      return _mlift2299_test(i, targetStrip, _y_2218);
    });
  }
  else {
    return _mlift2299_test(i, targetStrip, x_2322);
  }
}
 
 
// monadic lift
export function _mlift2301_test(i, outStrip, targetStrip, _y_2216) /* forall<h> (i : local-var<h,int>, outStrip : string, targetStrip : string, int) -> <local<h>,alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>> () */  {
   
  var x_2324 = ((i).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2217 /* int */ ) {
      return _mlift2300_test(_y_2216, i, outStrip, targetStrip, _y_2217);
    });
  }
  else {
    return _mlift2300_test(_y_2216, i, outStrip, targetStrip, x_2324);
  }
}
 
 
// monadic lift
export function _mlift2302_test(i, outStrip, targetStrip, wild__1) /* forall<h> (i : local-var<h,int>, outStrip : string, targetStrip : string, wild_1 : ()) -> <local<h>,alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>> () */  {
   
  var x_2326 = ((i).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2216 /* int */ ) {
      return _mlift2301_test(i, outStrip, targetStrip, _y_2216);
    });
  }
  else {
    return _mlift2301_test(i, outStrip, targetStrip, x_2326);
  }
}
 
 
// monadic lift
export function _mlift2303_test(i, outStrip, targetStrip, _y_2214) /* forall<h> (i : local-var<h,int>, outStrip : string, targetStrip : string, int) -> <local<h>,alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>> () */  {
   
  var _x24_2278 = $std_core._int_sub(_y_2214,20);
   
  var x_2328 = ((i).value = ($std_core_hnd._open_none2(function(i0 /* int */ , j /* int */ ) {
      return ($std_core._int_ge(i0,j)) ? i0 : j;
    }, 0, _x24_2278)));
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(wild__1 /* () */ ) {
      return _mlift2302_test(i, outStrip, targetStrip, wild__1);
    });
  }
  else {
    return _mlift2302_test(i, outStrip, targetStrip, x_2328);
  }
}
 
 
// monadic lift
export function _mlift2304_test(i, outStrip, targetStrip, _y_2213) /* forall<h> (i : local-var<h,int>, outStrip : string, targetStrip : string, int) -> <local<h>,alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>> () */  {
   
  $std_core.trace($std_core._lp__plus__plus__1_rp_("position: ", $std_core.show(_y_2213)));
   
  var x_2330 = ((i).value);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2214 /* int */ ) {
      return _mlift2303_test(i, outStrip, targetStrip, _y_2214);
    });
  }
  else {
    return _mlift2303_test(i, outStrip, targetStrip, x_2330);
  }
}
 
 
// monadic lift
export function _mlift2305_test(outText, _y_2212) /* (outText : string, either<exception,string>) -> io () */  {
   
  var _x20_2264 = $std_core_hnd._open_none3($compat_regex.regex, "\\s");
   
  var outStrip = $std_core_hnd._open_none4(function(s0 /* string */ , regex0 /* compat/regex/regex */ , repl /* string */ , start /* optional<int> */ ) {
      var _x5 = (start !== undefined) ? start : 0;
      return $compat_regex.replaceEx_1(s0, regex0, repl, true, _x5);
    }, outText, _x20_2264, "");
   
  var _x22_2271 = $std_core_hnd._open_none3($compat_regex.regex, "\\s");
   
  var _x7 = (_y_2212._tag === 1) ? "" : _y_2212.right;
  var targetStrip = $std_core_hnd._open_none4(function(s1 /* string */ , regex00 /* compat/regex/regex */ , repl0 /* string */ , start0 /* optional<int> */ ) {
      var _x6 = (start0 !== undefined) ? start0 : 0;
      return $compat_regex.replaceEx_1(s1, regex00, repl0, true, _x6);
    }, _x7, _x22_2271, "");
  if ((outStrip !== targetStrip)) {
    return function() {
       
      $std_core.trace("\n*** test failed ***");
       
      var loc = { value: 0 };
       
      var x_2334 = ((loc).value);
       
      if ($std_core_hnd._yielding()) {
        var res = $std_core_hnd.yield_extend(function(_y_2213 /* int */ ) {
          return _mlift2304_test(loc, outStrip, targetStrip, _y_2213);
        });
      }
      else {
        var res = _mlift2304_test(loc, outStrip, targetStrip, x_2334);
      }
      return $std_core_hnd.prompt_local_var(loc, res);
    }();
  }
  else {
    return $std_core.trace("*** test success (modulo whitespace)");
  }
}
 
 
// monadic lift
export function _mlift2306_test(moreargs, _c_2211) /* (moreargs : optional<string>, string) -> () */  {
   
  var input = $std_core._lp__plus__plus__1_rp_(_c_2211, ".text");
   
  var target = $std_core._lp__plus__plus__1_rp_(_c_2211, ".html");
  var _x5 = (moreargs !== undefined) ? moreargs : "";
  return markdownFiles($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_("-v --tex --installdir=src --odir=", "test/out"), " "), _x5), " "), input), function(outText /* string */ , ___wildcard__36__16 /* string */ , output /* string */ , ___wildcard__36__30 /* options/options */ ) {
       
      var _x7 = undefined;
      var _x6 = (_x7 !== undefined) ? _x7 : false;
      var x_2336 = $storage.tryReadTextFile(target, _x6);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_2212 /* either<exception,string> */ ) {
          return _mlift2305_test(outText, _y_2212);
        });
      }
      else {
        return _mlift2305_test(outText, x_2336);
      }
    });
}
 
export function test(s, moreargs) /* (s : optional<string>, moreargs : optional<string>) -> io () */  {
   
  var _x7 = (s !== undefined) ? s : "code_blocks";
  var _x6 = ((_x7).indexOf(($compat_path.sep)) >= 0);
  if (_x6) {
    var _x8 = (s !== undefined) ? s : "code_blocks";
    var x_2338 = $std_core_hnd._open_none2($compat_path.combine, "test", _x8);
  }
  else {
    var _x9 = (s !== undefined) ? s : "code_blocks";
    var x_2338 = $std_core_hnd._open_none1(function(paths /* list<string> */ ) {
        if (paths === null) {
          return "";
        }
        else {
          return $std_core.foldl(paths.tail, paths.head, $compat_path.combine);
        }
      }, $std_core.Cons("test", $std_core.Cons("new", $std_core.Cons(_x9, $std_core.Nil))));
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_2211 /* string */ ) {
      return _mlift2306_test(moreargs, _c_2211);
    });
  }
  else {
     
    var input = $std_core._lp__plus__plus__1_rp_(x_2338, ".text");
     
    var target = $std_core._lp__plus__plus__1_rp_(x_2338, ".html");
    var _x6 = (moreargs !== undefined) ? moreargs : "";
    return markdownFiles($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_("-v --tex --installdir=src --odir=", "test/out"), " "), _x6), " "), input), function(outText /* string */ , ___wildcard__36__16 /* string */ , output /* string */ , ___wildcard__36__30 /* options/options */ ) {
         
        var _x8 = undefined;
        var _x7 = (_x8 !== undefined) ? _x8 : false;
        var x0_2341 = $storage.tryReadTextFile(target, _x7);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_y_2212 /* either<exception,string> */ ) {
            return _mlift2305_test(outText, _y_2212);
          });
        }
        else {
          return _mlift2305_test(outText, x0_2341);
        }
      });
  }
}
 
// main entry:
_hmain($std_core.id);