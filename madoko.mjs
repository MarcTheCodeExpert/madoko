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
import * as $hilite from './hilite.mjs';
import * as $includes from './includes.mjs';
import * as $codeAlign from './codeAlign.mjs';
import * as $inline from './inline.mjs';
import * as $texCommon from './texCommon.mjs';
import * as $cssFormatter from './cssFormatter.mjs';
import * as $latexFormatter from './latexFormatter.mjs';
import * as $formatInline from './formatInline.mjs';
import * as $compat_array from './compat_array.mjs';
import * as $compat_string from './compat_string.mjs';
import * as $formatBlock from './formatBlock.mjs';
import * as $texParserBase from './texParserBase.mjs';
import * as $texParserItems from './texParserItems.mjs';
import * as $texParser from './texParser.mjs';
import * as $definitions from './definitions.mjs';
import * as $version from './version.mjs';
import * as $madoko from './madoko.mjs';
import * as $driver from './driver.mjs';
 
// externals
 
// type declarations
 
// declarations
 
 
// monadic lift
export function _mlift546_markdownFiles(_c_518, opts, outName, _y_520) /* (string, opts : options/commandOptions, outName : string, either<exception,string>) -> io () */  {
  if (_y_520._tag === 1) {
    return $std_core.printsln($std_core._lp__plus__plus__1_rp_("error: unable to read: ", _c_518));
  }
  else {
    return $driver.processContent(_c_518, outName, _y_520.right, opts, true);
  }
}
 
 
// monadic lift
export function _mlift547_markdownFiles(_c_518, opts, outName, _c_519) /* (string, opts : options/commandOptions, outName : string, ()) -> () */  {
   
  var x_555 = $storage.tryReadTextFile(_c_518);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_520 /* either<exception,string> */ ) {
      return _mlift546_markdownFiles(_c_518, opts, outName, _y_520);
    });
  }
  else {
    return _mlift546_markdownFiles(_c_518, opts, outName, x_555);
  }
}
 
 
// monadic lift
export function _mlift548_markdownFiles(opts, _c_518) /* (opts : options/commandOptions, string) -> () */  {
   
  var outName = $std_core_hnd._open_none2($driver.outputName, _c_518, opts);
   
  var _x17_544 = $std_core_hnd._open_none1(function(commandOptions3 /* options/commandOptions */ ) {
      return commandOptions3.options;
    }, opts);
   
  var _x0 = $std_core._int_gt(($std_core_hnd._open_none1(function(options0 /* options/options */ ) {
      return options0.verbose;
    }, _x17_544)),0);
  if (_x0) {
    var x_557 = $std_core.printsln($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_("process: ", _c_518), " -> "), outName));
  }
  else {
    var x_557 = $std_core_types._Unit_;
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_519 /* () */ ) {
      return _mlift547_markdownFiles(_c_518, opts, outName, _c_519);
    });
  }
  else {
    return _mlift547_markdownFiles(_c_518, opts, outName, x_557);
  }
}
 
 
// monadic lift
export function _mlift549_markdownFiles(xdir) /* (xdir : string) -> io () */  {
  var _x1 = undefined;
  var _x0 = (_x1 !== undefined) ? _x1 : 511;
  return $storage.xmkdirp(xdir, _x0);
}
 
 
// monadic lift
export function _mlift550_markdownFiles(opts, _y_513) /* (opts : options/commandOptions, bool) -> io () */  {
  var _x2 = $std_core_hnd._open_none1(function(b /* bool */ ) {
      return (b) ? false : true;
    }, _y_513);
  if (_x2) {
     
    var dir_510 = $std_core_hnd._open_none1(function(commandOptions1 /* options/commandOptions */ ) {
        return commandOptions1.outputDir;
      }, opts);
     
    var x_559 = $storage.checkSandbox(dir_510);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(_mlift549_markdownFiles);
    }
    else {
      var _x4 = undefined;
      var _x3 = (_x4 !== undefined) ? _x4 : 511;
      return $storage.xmkdirp(x_559, _x3);
    }
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
 
// monadic lift
export function _mlift551_markdownFiles(opts, _c_517) /* (opts : options/commandOptions, ()) -> () */  {
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
        return $std_core_hnd.yield_extend(function(_c_518 /* string */ ) {
          return _mlift548_markdownFiles(opts, _c_518);
        });
      }
      else {
        return _mlift548_markdownFiles(opts, x);
      }
    });
}
 
 
// monadic lift
export function _mlift552_markdownFiles(mbopts) /* (mbopts : maybe<options/commandOptions>) -> io () */  {
  if (mbopts === null) {
    return $std_core_types._Unit_;
  }
  else {
     
    var _x5 = (($std_core_hnd._open_none1(function(commandOptions /* options/commandOptions */ ) {
        return commandOptions.outputDir;
      }, mbopts.value)) !== (""));
    if (_x5) {
       
      var x0_561 = $storage.fexistsSync($std_core_hnd._open_none1(function(commandOptions0 /* options/commandOptions */ ) {
          return commandOptions0.outputDir;
        }, mbopts.value));
      if ($std_core_hnd._yielding()) {
        var x = $std_core_hnd.yield_extend(function(_y_513 /* bool */ ) {
          return _mlift550_markdownFiles(mbopts.value, _y_513);
        });
      }
      else {
        var x = _mlift550_markdownFiles(mbopts.value, x0_561);
      }
    }
    else {
      var x = $std_core_types._Unit_;
    }
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_c_517 /* () */ ) {
        return _mlift551_markdownFiles(mbopts.value, _c_517);
      });
    }
    else {
      return _mlift551_markdownFiles(mbopts.value, x);
    }
  }
}
 
 
/*
pub fun test( s : string = "code_blocks", moreargs = "" ) {
  //main("test/code_blocks.text")
  val root = if (s.contains(path/sep)) then combine("test",s) else combine(["test","new",s])
  val input  = root + ".text"
  val outputDir = "test/out"
  val target = root + ".html"
  markdownFiles("-v --tex --installdir=src --odir=" + outputDir + " " + moreargs + " " + input, 
    fn(outText,_input,output,_options) {
      //trace("-----\n" + outText + "\n-----")
      val targetText = target.readTextFileDef("")
      val outStrip = outText.replaceAll(regex(r"\s"),"")
      // .replaceAll(regex(@"class=""indent"""),"")                  
      val targetStrip = targetText.replaceAll(regex(r"\s"),"")
      if (outStrip != targetStrip) {
        trace("\n*** test failed ***")
        //trace(targetText + "\n***")
        var i := 0;
        //while { outStrip[i] == targetStrip[i] } { i := i+1 }
        trace("position: " + i.show)
        val preN = 20
        i := max(0, i - preN)
        trace("inferred: " + outStrip.substr(i,preN) + " " + outStrip.substr(i+preN,40) + " ...")
        trace("expected: " + targetStrip.substr(i,preN) + " " + targetStrip.substr(i+preN,40) + "...")
        trace("***")
      }
      else {
        trace("*** test success (modulo whitespace)")
      }
  })
}
*/
export function markdownFiles(args) /* (args : string) -> io () */  {
   
  var x_563 = $options.parseOptions("1.2.0", args);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift552_markdownFiles);
  }
  else {
    if (x_563 === null) {
      return $std_core_types._Unit_;
    }
    else {
       
      var _x5 = (($std_core_hnd._open_none1(function(commandOptions /* options/commandOptions */ ) {
          return commandOptions.outputDir;
        }, x_563.value)) !== (""));
      if (_x5) {
         
        var x1_566 = $storage.fexistsSync($std_core_hnd._open_none1(function(commandOptions0 /* options/commandOptions */ ) {
            return commandOptions0.outputDir;
          }, x_563.value));
        if ($std_core_hnd._yielding()) {
          var x0 = $std_core_hnd.yield_extend(function(_y_513 /* bool */ ) {
            return _mlift550_markdownFiles(x_563.value, _y_513);
          });
        }
        else {
          var x0 = _mlift550_markdownFiles(x_563.value, x1_566);
        }
      }
      else {
        var x0 = $std_core_types._Unit_;
      }
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_c_517 /* () */ ) {
          return _mlift551_markdownFiles(x_563.value, _c_517);
        });
      }
      else {
        return $std_core.foreach($std_core_hnd._open_none1(function(commandOptions2 /* options/commandOptions */ ) {
              return commandOptions2.inputs;
            }, x_563.value), function(input0 /* string */ ) {
             
            var _x5 = (($std_core_hnd._open_none1($compat.extname, input0)) === (""));
            if (_x5) {
              var x2 = $std_core._lp__plus__plus__1_rp_(input0, ".mdk");
            }
            else {
              var x2 = input0;
            }
            if ($std_core_hnd._yielding()) {
              return $std_core_hnd.yield_extend(function(_c_518 /* string */ ) {
                return _mlift548_markdownFiles(x_563.value, _c_518);
              });
            }
            else {
              return _mlift548_markdownFiles(x_563.value, x2);
            }
          });
      }
    }
  }
}
 
 
// monadic lift
export function _mlift553_main(wild__) /* (wild_ : ()) -> io () */  {
  return $std_core_types._Unit_;
}
 
export function main() /* () -> io () */  {
   
  var x_568 = markdownFiles("");
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift553_main);
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
 
// monadic lift
export function _mlift554_op(wild__) /* (wild_ : ()) -> io () */  {
  return $std_core_types._Unit_;
}
 
export function _hmain() /* () -> <st<global>,console,div,fsys,ndet,net,ui> () */  {
  return $std_core._default_exn(function() {
     
    var x_571 = markdownFiles("");
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(_mlift554_op);
    }
    else {
      return $std_core_types._Unit_;
    }
  });
}
 
// main entry:
_hmain($std_core.id);