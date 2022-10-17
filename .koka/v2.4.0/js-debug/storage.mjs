// Koka generated module: "storage", koka version: 2.4.0
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
import * as $std_os_flags from './std_os_flags.mjs';
import * as $compat_path from './compat_path.mjs';
import * as $compat_env from './compat_env.mjs';
import * as $compat_array from './compat_array.mjs';
import * as $std_num_int64 from './std_num_int64.mjs';
import * as $std_num_float64 from './std_num_float64.mjs';
import * as $std_num_decimal from './std_num_decimal.mjs';
import * as $std_num_ddouble from './std_num_ddouble.mjs';
import * as $compat_string from './compat_string.mjs';
import * as $compat_flags from './compat_flags.mjs';
import * as $options from './options.mjs';
 
// externals
/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/
// Provide client/server storage
// This module provides file access operations. On the web client, these
// operations only provide accesss to a global object of files which is
// *not* persistent. This code is mainly to ensure we can share as much
// code as possible between client and server.
var onServer = ($std_core.getHost() === "nodejs");
var $readFileSync;
var $writeFileSync;
var $renameSync;
var $copySync;
var $fexistsSync;
var $relative;
var $mkdirp;
var $cwd;
var $clear;
var $unlinkSync;
var vfs = {};
if (onServer) {
  var fs = require("fs");
  var path = require("path");
  var xmkdirp = require('mkdirp');
  $readFileSync = function(fname,enc) { return fs.readFileSync(fname,(enc && enc !== "buffer") ? {encoding:enc} : null); };
  $writeFileSync = function(fname,enc,data) { return fs.writeFileSync(fname,data,(enc && enc !== "buffer") ? {encoding:enc} : null); };
  $fexistsSync = function(fname) { return (fs.existsSync(fname) != 0);};
  $relative = function(dir,p) { return path.relative(dir,p); };
  $cwd = function() { return process.cwd(); };
  $mkdirp = function(dir,mode) { return xmkdirp.sync(dir,mode); };
  $renameSync = function(oldname,newname) { return fs.renameSync(oldname,newname); };
  $copySync = function(srcname,destname) { 
    var buf = fs.readFileSync(srcname);
    fs.writeFileSync(destname,buf);
  };
  $clear = function() { };
  $unlinkSync = function(fname) { return fs.unlinkSync(fname); }; 
}
else {
  $readFileSync = function(fname,enc) {
    var data = vfs["/" + fname];
    if (data === undefined) throw ("Could not read: " + fname);
    return data;
  }
  $writeFileSync = function(fname,enc,data) {
    vfs["/" + fname] = data;
  }
  $fexistsSync = function(fname) {
    return (vfs["/" + fname] !== undefined);
  }
  $relative = function(dir,p) {
    return p; // TODO: implement this client side.
  }
  $cwd = function() {
    return "."; // ??
  }
  $mkdirp = function(dir,mode) {
    // do nothing
  }
  $renameSync = function(oldname,newname) {
    $copySync(oldname,newname);
    $unlinkSync(oldname);
  }
  $copySync = function(srcname,destname) {
    $writeFileSync( destname, "binary", $readFileSync(oldname) );
  }
  $clear = function() {
    vfs = {};
  }
  $unlinkSync = function(fname) {
    var data = vfs["/" + fname];
    if (data != null) {
      delete vfs["/" + fname];
    }
    return null;
  }
}
 
// type declarations
// type buffer
export function Buffer(obj) /* (obj : any) -> buffer */  {
  return obj;
}
 
// declarations
 
 
// Automatically generated. Retrieves the `obj` constructor field of the `:buffer` type.
export function obj(buffer) /* (buffer : buffer) -> any */  {
  return buffer;
}
 
export function _copy(_this, obj0) /* (buffer, obj : optional<any>) -> buffer */  {
  if (obj0 !== undefined) {
    var _x0 = obj0;
  }
  else {
    var _x0 = _this;
  }
  return _x0;
}
 
export var sandboxed;
var sandboxed = { value: ($std_core_types.Nothing) };
 
export function xlength(obj0) /* (obj : any) -> int */  {
  return obj0.length;
}
 
export var fileChar;
var fileChar = "[^\\\\\\/\\?\\*\\.\\|<>&:\\u0000-\\u001F]";
 
export var rxPathSep;
var rxPathSep = $compat_regex.regex("[\\\\/]");
 
 
// In the browser, removes all files.
export function clear() /* () -> io () */  {
  return ((function() {
    try {
      return $clear();
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
export function xcopyFile(fnameOld, fnameNew) /* (fnameOld : string, fnameNew : string) -> io () */  {
  return ((function() {
    try {
      return $copySync(fnameOld,fnameNew);
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
export function cwd() /* () -> io string */  {
  return ((function() {
    try {
      return $cwd();
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
export function xfexistsSync(fileName) /* (fileName : string) -> io bool */  {
  return ((function() {
    try {
      return $fexistsSync(fileName);
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
export function xmkdirp(dir, mode) /* (dir : string, mode : optional<int>) -> io () */  {
  var _x1 = (mode !== undefined) ? mode : 511;
  return ((function() {
    try {
      return $mkdirp(dir,_x1);
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
export function xreadBase64FileSync(fileName) /* (fileName : string) -> io string */  {
  return ((function() {
    try {
      return $readFileSync(fileName,'base64');
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
export function xreadFileSync(fileName) /* (fileName : string) -> io any */  {
  return ((function() {
    try {
      return $readFileSync(fileName,'buffer');
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
export function xreadInt1(obj0, ofs) /* (obj : any, ofs : int) -> int */  {
  return obj0.readUInt8(ofs);
}
 
export function xreadInt4(obj0, ofs, bigendian) /* (obj : any, ofs : int, bigendian : optional<bool>) -> int */  {
  var _x2 = (bigendian !== undefined) ? bigendian : true;
  return (_x2 ? obj0.readInt32BE(ofs) : obj0.readInt32LE(ofs));
}
 
export function xreadTextFileSync(fileName) /* (fileName : string) -> io string */  {
  return ((function() {
    try {
      return $readFileSync(fileName,'utf-8');
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
 
// \\ is not possible for some reason --> commented for now
export function relative(from, to) /* (from : string, to : string) -> string */  {
  return $relative(from,to);
}
 
export function xrename(fnameOld, fnameNew) /* (fnameOld : string, fnameNew : string) -> io () */  {
  return ((function() {
    try {
      return $renameSync(fnameOld,fnameNew);
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
export function xtoBase64(obj0) /* (obj : any) -> string */  {
  return obj0.toString('base64');
}
 
export function xwriteTextFileSync(fileName, content) /* (fileName : string, content : string) -> io () */  {
  return ((function() {
    try {
      return $writeFileSync(fileName,'utf-8',content);
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
export function xunlinkSync(fileName) /* (fileName : string) -> io () */  {
  return ((function() {
    try {
      return $unlinkSync(fileName);
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
export function xwriteBase64FileSync(fileName, content) /* (fileName : string, content : string) -> io () */  {
  return ((function() {
    try {
      return $writeFileSync(fileName,'base64',content);
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
export function length(b) /* (b : buffer) -> int */  {
  var _x3 = b;
  return xlength(_x3);
}
 
export var rxRootRelative;
 
var left1_1936 = $std_core._lp__plus__plus__1_rp_("^(?![\\\\\\/]|\\w:)(?:", "[^\\\\\\/\\?\\*\\.\\|<>&:\\u0000-\\u001F]");
 
var left0_1934 = $std_core._lp__plus__plus__1_rp_(left1_1936, "|\\.(?=[^\\.])|[\\\\\\/](?=");
 
var left_1932 = $std_core._lp__plus__plus__1_rp_(left0_1934, "[^\\\\\\/\\?\\*\\.\\|<>&:\\u0000-\\u001F]");
var rxRootRelative = $compat_regex.regex($std_core._lp__plus__plus__1_rp_(left_1932, "|\\.))+$"));
 
export function under(path, roots) /* (path : string, roots : list<string>) -> bool */  {
  return $std_core.any(roots, function(root /* string */ ) {
      if ((root === (""))) {
        return $compat_regex.contains(path, rxRootRelative);
      }
      else {
        var _x4 = $compat.startsWith(path, $std_core._lp__plus__plus__1_rp_(root, "/"));
        if (_x4) {
           
          var x_1943 = $std_core.count_1(root);
          return $compat_regex.contains($compat.substr(path, $std_core._int_add(x_1943,1)), rxRootRelative);
        }
        else {
          return false;
        }
      }
    });
}
 
export function xnormalize(path) /* (path : string) -> string */  {
   
  var v_1949 = $compat_regex.split(path, rxPathSep);
   
  var xs0_1948 = $std_core.foldl($std_core.vlist(v_1949), $std_core.Nil, function(rroots /* list<string> */ , dir /* string */ ) {
      if ((dir === (""))) {
        return rroots;
      }
      else {
        if ((dir === ("."))) {
          return rroots;
        }
        else {
          if ((dir === (".."))) {
            if (rroots !== null) {
              if (((rroots.head) !== (".parent"))){
                return rroots.tail;
              }
            }
            return $std_core.Cons(".parent", rroots);
          }
          else {
            return $std_core.Cons(dir, rroots);
          }
        }
      }
    });
   
  var xs_1946 = $std_core._lift17195_reverse($std_core.Nil, xs0_1948);
  if (xs_1946 === null) {
    return "";
  }
  else {
    return $std_core._lift17188_joinsep("/", xs_1946.tail, xs_1946.head);
  }
}
 
 
// monadic lift
export function _mlift2138_checkSandbox(xpath, _c_1986) /* (xpath : string, ()) -> string */  {
  return xpath;
}
 
 
// monadic lift
export function _mlift2139_checkSandbox(path, roots, _y_1984) /* (path : string, roots : list<string>, string) -> io string */  {
   
  var xpath = $std_core_hnd._open_none1(xnormalize, _y_1984);
   
  var _x10_2090 = $std_core_hnd._open_none2(under, xpath, roots);
   
  var _x5 = $std_core_hnd._open_none1(function(b /* bool */ ) {
      return (b) ? false : true;
    }, _x10_2090);
  if (_x5) {
    var x_2178 = $compat.error($std_core._lp__plus__plus__1_rp_("cannot access files outside the sandbox: ", path));
  }
  else {
    var x_2178 = $std_core_types._Unit_;
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_1986 /* () */ ) {
      return xpath;
    });
  }
  else {
    return xpath;
  }
}
 
 
// monadic lift
export function _mlift2140_checkSandbox(path, _y_1982) /* (path : string, maybe<list<string>>) -> <read<global>,alloc<global>,console,div,exn,fsys,ndet,net,ui,write<global>> string */  {
  if (_y_1982 === null) {
    return $compat_path.normalize(path);
  }
  else {
     
    var x_2182 = $compat_path.normalize(path);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_y_1984 /* string */ ) {
        return _mlift2139_checkSandbox(path, _y_1982.value, _y_1984);
      });
    }
    else {
      return _mlift2139_checkSandbox(path, _y_1982.value, x_2182);
    }
  }
}
 
export function checkSandbox(path) /* (path : string) -> io string */  {
   
  var x_2184 = sandboxed.value;
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_1982 /* maybe<list<string>> */ ) {
      return _mlift2140_checkSandbox(path, _y_1982);
    });
  }
  else {
    if (x_2184 === null) {
      return $compat_path.normalize(path);
    }
    else {
       
      var x0_2187 = $compat_path.normalize(path);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_1984 /* string */ ) {
          return _mlift2139_checkSandbox(path, x_2184.value, _y_1984);
        });
      }
      else {
         
        var xpath = $std_core_hnd._open_none1(xnormalize, x0_2187);
         
        var _x10_2090 = $std_core_hnd._open_none2(under, xpath, x_2184.value);
         
        var _x5 = $std_core_hnd._open_none1(function(b /* bool */ ) {
            return (b) ? false : true;
          }, _x10_2090);
        if (_x5) {
          var x1_2190 = $compat.error($std_core._lp__plus__plus__1_rp_("cannot access files outside the sandbox: ", path));
        }
        else {
          var x1_2190 = $std_core_types._Unit_;
        }
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(_c_1986 /* () */ ) {
            return xpath;
          });
        }
        else {
          return xpath;
        }
      }
    }
  }
}
 
 
// monadic lift
export function _mlift2141_copyFile(xfnameOld, xfnameNew) /* (xfnameOld : string, xfnameNew : string) -> io () */  {
  return xcopyFile(xfnameOld, xfnameNew);
}
 
 
// monadic lift
export function _mlift2142_copyFile(fnameNew, xfnameOld) /* (fnameNew : string, xfnameOld : string) -> io () */  {
   
  var x_2195 = checkSandbox(fnameNew);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(xfnameNew /* string */ ) {
      return xcopyFile(xfnameOld, xfnameNew);
    });
  }
  else {
    return xcopyFile(xfnameOld, x_2195);
  }
}
 
export function copyFile(fnameOld, fnameNew) /* (fnameOld : string, fnameNew : string) -> io () */  {
   
  var x_2199 = checkSandbox(fnameOld);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(xfnameOld /* string */ ) {
      return _mlift2142_copyFile(fnameNew, xfnameOld);
    });
  }
  else {
     
    var x0_2202 = checkSandbox(fnameNew);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(xfnameNew /* string */ ) {
        return xcopyFile(x_2199, xfnameNew);
      });
    }
    else {
      return xcopyFile(x_2199, x0_2202);
    }
  }
}
 
 
// monadic lift
export function _mlift2143_enforceSandbox(_y_1991) /* (string) -> io string */  {
  return $std_core_hnd._open_none1(xnormalize, _y_1991);
}
 
 
// monadic lift
export function _mlift2144_enforceSandbox(_y_1992) /* (list<string>) -> <alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>> () */  {
  return ((sandboxed).value = ($std_core_types.Just(_y_1992)));
}
 
export function enforceSandbox(roots) /* (roots : optional<list<string>>) -> io () */  {
   
  if (roots !== undefined) {
    var _x5 = roots;
  }
  else {
    var _x5 = $std_core.Cons("", $std_core.Nil);
  }
  var x_2207 = $std_core.map_5(_x5, function(r /* string */ ) {
       
      var x0_2210 = $compat_path.normalize(r);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift2143_enforceSandbox);
      }
      else {
        return $std_core_hnd._open_none1(xnormalize, x0_2210);
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2144_enforceSandbox);
  }
  else {
    return ((sandboxed).value = ($std_core_types.Just(x_2207)));
  }
}
 
 
// monadic lift
export function _mlift2145_fexistsSync(xfileName) /* (xfileName : string) -> <alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>,exn> bool */  {
  return $std_core_hnd._open_at1(0, xfexistsSync, xfileName);
}
 
export function fexistsSync(fileName) /* (fileName : string) -> io bool */  {
  return $std_core.$try(function() {
       
      var x_2212 = $std_core_hnd._open_at1(0, checkSandbox, fileName);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift2145_fexistsSync);
      }
      else {
        return $std_core_hnd._open_at1(0, xfexistsSync, x_2212);
      }
    }, function(___wildcard__172__9 /* exception */ ) {
      return false;
    });
}
 
 
// monadic lift
export function _mlift2146_mkdirp(mode, xdir) /* (mode : optional<int>, xdir : string) -> io () */  {
  var _x5 = (mode !== undefined) ? mode : 511;
  return xmkdirp(xdir, _x5);
}
 
export function mkdirp(dir, mode) /* (dir : string, mode : optional<int>) -> io () */  {
   
  var x_2214 = checkSandbox(dir);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(xdir /* string */ ) {
      var _x6 = (mode !== undefined) ? mode : 511;
      return xmkdirp(xdir, _x6);
    });
  }
  else {
    var _x7 = (mode !== undefined) ? mode : 511;
    return xmkdirp(x_2214, _x7);
  }
}
 
 
// monadic lift
export function _mlift2147_readBase64FileSync(xfileName, _c_2000) /* (xfileName : string, ()) -> string */  {
  return xreadBase64FileSync(xfileName);
}
 
 
// monadic lift
export function _mlift2148_readBase64FileSync(fileName, required, xfileName) /* (fileName : string, required : optional<bool>, xfileName : string) -> io string */  {
   
  if (required !== undefined) {
    if (required) {
      var x_2219 = $std_core_hnd._open_none2($compat_log.log, "files", fileName);
    }
    else {
      var x_2219 = $std_core_types._Unit_;
    }
  }
  else {
    var x_2219 = $std_core_hnd._open_none2($compat_log.log, "files", fileName);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_2000 /* () */ ) {
      return xreadBase64FileSync(xfileName);
    });
  }
  else {
    return xreadBase64FileSync(xfileName);
  }
}
 
 
// Read a binary file synchronously (using base64 encoding)
export function readBase64FileSync(fileName, required) /* (fileName : string, required : optional<bool>) -> io string */  {
   
  var x_2223 = checkSandbox(fileName);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(xfileName /* string */ ) {
      return _mlift2148_readBase64FileSync(fileName, required, xfileName);
    });
  }
  else {
     
    if (required !== undefined) {
      if (required) {
        var x0_2226 = $std_core_hnd._open_none2($compat_log.log, "files", fileName);
      }
      else {
        var x0_2226 = $std_core_types._Unit_;
      }
    }
    else {
      var x0_2226 = $std_core_hnd._open_none2($compat_log.log, "files", fileName);
    }
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_c_2000 /* () */ ) {
        return xreadBase64FileSync(x_2223);
      });
    }
    else {
      return xreadBase64FileSync(x_2223);
    }
  }
}
 
 
// monadic lift
export function _mlift2149_tryReadBase64File(xfileName, _c_2004) /* (xfileName : string, ()) -> string */  {
  return xreadBase64FileSync(xfileName);
}
 
 
// monadic lift
export function _mlift2150_tryReadBase64File(fileName0, required0, xfileName) /* (fileName0 : string, required0 : optional<bool>, xfileName : string) -> io string */  {
   
  if (required0 !== undefined) {
    if (required0) {
      var x_2231 = $std_core_hnd._open_none2($compat_log.log, "files", fileName0);
    }
    else {
      var x_2231 = $std_core_types._Unit_;
    }
  }
  else {
    var x_2231 = $std_core_hnd._open_none2($compat_log.log, "files", fileName0);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_2004 /* () */ ) {
      return xreadBase64FileSync(xfileName);
    });
  }
  else {
    return xreadBase64FileSync(xfileName);
  }
}
 
 
// monadic lift
export function _mlift2151_tryReadBase64File(_y_2006) /* (string) -> <alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>,exn> either<exception,string> */  {
  return $std_core_types.Right(_y_2006);
}
 
 
// Try to a binary file synchronously (using base64 encoding)
export function tryReadBase64File(fileName, required) /* (fileName : string, required : optional<bool>) -> io either<exception,string> */  {
  return $std_core.$try(function() {
       
      var _x8 = (required !== undefined) ? required : true;
      var x_2235 = $std_core_hnd._open_at2(0, function(fileName0 /* string */ , required0 /* optional<bool> */ ) {
           
          var x0_2237 = checkSandbox(fileName0);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(xfileName /* string */ ) {
              return _mlift2150_tryReadBase64File(fileName0, required0, xfileName);
            });
          }
          else {
            return _mlift2150_tryReadBase64File(fileName0, required0, x0_2237);
          }
        }, fileName, _x8);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift2151_tryReadBase64File);
      }
      else {
        return $std_core_types.Right(x_2235);
      }
    }, function(exn /* exception */ ) {
      return $std_core_types.Left(exn);
    });
}
 
 
// monadic lift
export function _mlift2152_readBase64FileDef(def, _y_2008) /* (def : string, either<exception,string>) -> io string */  {
  return (_y_2008._tag === 1) ? def : _y_2008.right;
}
 
 
// Try to read a binary file in base64; return a default value in case of an error.
export function readBase64FileDef(fileName, def, required) /* (fileName : string, def : string, required : optional<bool>) -> io string */  {
   
  var _x8 = (required !== undefined) ? required : false;
  var x_2239 = tryReadBase64File(fileName, _x8);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2008 /* either<exception,string> */ ) {
      return (_y_2008._tag === 1) ? def : _y_2008.right;
    });
  }
  else {
    return (x_2239._tag === 1) ? def : x_2239.right;
  }
}
 
 
// monadic lift
export function _mlift2153_readFileSync(_y_2010) /* (any) -> io buffer */  {
  return _y_2010;
}
 
 
// monadic lift
export function _mlift2154_readFileSync(xfileName) /* (xfileName : string) -> io buffer */  {
   
  var x_2244 = xreadFileSync(xfileName);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2153_readFileSync);
  }
  else {
    return x_2244;
  }
}
 
 
// Read a binary file into a buffer
export function readFileSync(fileName) /* (fileName : string) -> io buffer */  {
   
  var x_2246 = checkSandbox(fileName);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2154_readFileSync);
  }
  else {
     
    var x0_2249 = xreadFileSync(x_2246);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(_mlift2153_readFileSync);
    }
    else {
      return x0_2249;
    }
  }
}
 
export function readInt1(b, ofs) /* (b : buffer, ofs : int) -> int */  {
  var _x8 = b;
  return xreadInt1(_x8, ofs);
}
 
export function readInt4(b, ofs, bigendian) /* (b : buffer, ofs : int, bigendian : optional<bool>) -> int */  {
  var _x9 = b;
  var _x10 = (bigendian !== undefined) ? bigendian : true;
  return xreadInt4(_x9, ofs, _x10);
}
 
 
// monadic lift
export function _mlift2155_readTextFileSync(xfileName, _c_2013) /* (xfileName : string, ()) -> string */  {
  return xreadTextFileSync(xfileName);
}
 
 
// monadic lift
export function _mlift2156_readTextFileSync(fileName, required, xfileName) /* (fileName : string, required : optional<bool>, xfileName : string) -> io string */  {
   
  if (required !== undefined) {
    if (required) {
      var x_2252 = $std_core_hnd._open_none2($compat_log.log, "files", fileName);
    }
    else {
      var x_2252 = $std_core_types._Unit_;
    }
  }
  else {
    var x_2252 = $std_core_hnd._open_none2($compat_log.log, "files", fileName);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_2013 /* () */ ) {
      return xreadTextFileSync(xfileName);
    });
  }
  else {
    return xreadTextFileSync(xfileName);
  }
}
 
 
// Read a text file synchronously (using UTF8 encoding)
export function readTextFileSync(fileName, required) /* (fileName : string, required : optional<bool>) -> io string */  {
   
  var x_2256 = checkSandbox(fileName);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(xfileName /* string */ ) {
      return _mlift2156_readTextFileSync(fileName, required, xfileName);
    });
  }
  else {
     
    if (required !== undefined) {
      if (required) {
        var x0_2259 = $std_core_hnd._open_none2($compat_log.log, "files", fileName);
      }
      else {
        var x0_2259 = $std_core_types._Unit_;
      }
    }
    else {
      var x0_2259 = $std_core_hnd._open_none2($compat_log.log, "files", fileName);
    }
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_c_2013 /* () */ ) {
        return xreadTextFileSync(x_2256);
      });
    }
    else {
      return xreadTextFileSync(x_2256);
    }
  }
}
 
 
// monadic lift
export function _mlift2157_tryReadTextFile(xfileName, _c_2017) /* (xfileName : string, ()) -> string */  {
  return xreadTextFileSync(xfileName);
}
 
 
// monadic lift
export function _mlift2158_tryReadTextFile(fileName0, required0, xfileName) /* (fileName0 : string, required0 : optional<bool>, xfileName : string) -> io string */  {
   
  if (required0 !== undefined) {
    if (required0) {
      var x_2264 = $std_core_hnd._open_none2($compat_log.log, "files", fileName0);
    }
    else {
      var x_2264 = $std_core_types._Unit_;
    }
  }
  else {
    var x_2264 = $std_core_hnd._open_none2($compat_log.log, "files", fileName0);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_2017 /* () */ ) {
      return xreadTextFileSync(xfileName);
    });
  }
  else {
    return xreadTextFileSync(xfileName);
  }
}
 
 
// monadic lift
export function _mlift2159_tryReadTextFile(_y_2019) /* (string) -> <alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>,exn> either<exception,string> */  {
  return $std_core_types.Right(_y_2019);
}
 
 
// Try to a text file synchronously (using UTF8 encoding)
export function tryReadTextFile(fileName, required) /* (fileName : string, required : optional<bool>) -> io either<exception,string> */  {
  return $std_core.$try(function() {
       
      var _x11 = (required !== undefined) ? required : true;
      var x_2268 = $std_core_hnd._open_at2(0, function(fileName0 /* string */ , required0 /* optional<bool> */ ) {
           
          var x0_2270 = checkSandbox(fileName0);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(function(xfileName /* string */ ) {
              return _mlift2158_tryReadTextFile(fileName0, required0, xfileName);
            });
          }
          else {
            return _mlift2158_tryReadTextFile(fileName0, required0, x0_2270);
          }
        }, fileName, _x11);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift2159_tryReadTextFile);
      }
      else {
        return $std_core_types.Right(x_2268);
      }
    }, function(exn /* exception */ ) {
      return $std_core_types.Left(exn);
    });
}
 
 
// monadic lift
export function _mlift2160_readTextFileDef(def, _y_2021) /* (def : string, either<exception,string>) -> io string */  {
  return (_y_2021._tag === 1) ? def : _y_2021.right;
}
 
 
// Try to read a text file; return a default value in case of an error.
export function readTextFileDef(fileName, def, required) /* (fileName : string, def : string, required : optional<bool>) -> io string */  {
   
  var _x11 = (required !== undefined) ? required : false;
  var x_2272 = tryReadTextFile(fileName, _x11);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2021 /* either<exception,string> */ ) {
      return (_y_2021._tag === 1) ? def : _y_2021.right;
    });
  }
  else {
    return (x_2272._tag === 1) ? def : x_2272.right;
  }
}
 
 
// Read a text file synchronously (using UTF8 encoding) without sandbox restrictions
export function readTextFileNoSandbox(fileName) /* (fileName : string) -> io string */  {
   
  var x_2277 = $compat_path.normalize(fileName);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(xreadTextFileSync);
  }
  else {
    return xreadTextFileSync(x_2277);
  }
}
 
 
// monadic lift
export function _mlift2161_rename(xfnameOld, xfnameNew) /* (xfnameOld : string, xfnameNew : string) -> io () */  {
  return xrename(xfnameOld, xfnameNew);
}
 
 
// monadic lift
export function _mlift2162_rename(fnameNew, xfnameOld) /* (fnameNew : string, xfnameOld : string) -> io () */  {
   
  var x_2279 = checkSandbox(fnameNew);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(xfnameNew /* string */ ) {
      return xrename(xfnameOld, xfnameNew);
    });
  }
  else {
    return xrename(xfnameOld, x_2279);
  }
}
 
export function rename(fnameOld, fnameNew) /* (fnameOld : string, fnameNew : string) -> io () */  {
   
  var x_2283 = checkSandbox(fnameOld);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(xfnameOld /* string */ ) {
      return _mlift2162_rename(fnameNew, xfnameOld);
    });
  }
  else {
     
    var x0_2286 = checkSandbox(fnameNew);
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(xfnameNew /* string */ ) {
        return xrename(x_2283, xfnameNew);
      });
    }
    else {
      return xrename(x_2283, x0_2286);
    }
  }
}
 
 
// monadic lift
export function _mlift2163_searchFileSync(f, _y_2028) /* (f : string, bool) -> io maybe<string> */  {
  if (_y_2028) {
    return $std_core_types.Just(f);
  }
  else {
    return $std_core_types.Nothing;
  }
}
 
 
// monadic lift
export function _mlift2164_searchFileSync(fnames) /* (fnames : list<string>) -> <alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>> maybe<string> */  {
  return $compat.foreachUntil(fnames, function(f /* string */ ) {
       
      var x_2291 = fexistsSync(f);
       
      function next_2292(_y_2028) /* (bool) -> io maybe<string> */  {
        if (_y_2028) {
          return $std_core_types.Just(f);
        }
        else {
          return $std_core_types.Nothing;
        }
      }
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(next_2292);
      }
      else {
        return next_2292(x_2291);
      }
    });
}
 
 
// Search for a file along a list of directories
export function searchFileSync(dirs, fname) /* (dirs : list<string>, fname : string) -> io maybe<string> */  {
   
  var x_2295 = $std_core.map_5(dirs, function(dir /* string */ ) {
      return $std_core_hnd._open_none2($compat_path.combine, dir, fname);
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2164_searchFileSync);
  }
  else {
    return $compat.foreachUntil(x_2295, function(f /* string */ ) {
         
        var x0_2298 = fexistsSync(f);
         
        var next0_2299 = function(_y_2028 /* bool */ ) {
          if (_y_2028) {
            return $std_core_types.Just(f);
          }
          else {
            return $std_core_types.Nothing;
          }
        };
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(next0_2299);
        }
        else {
          return next0_2299(x0_2298);
        }
      });
  }
}
 
export function toBase64(b) /* (b : buffer) -> string */  {
  var _x11 = b;
  return xtoBase64(_x11);
}
 
 
// monadic lift
export function _mlift2165_writeTextFileSync(content, fileName, xfileName) /* (content : string, fileName : string, xfileName : string) -> io () */  {
   
  $std_core_hnd._open_none2($compat_log.log, "filesWrite", fileName);
  return xwriteTextFileSync(xfileName, content);
}
 
 
// Write a text file synchronously (using UTF8 encoding)
export function writeTextFileSync(fileName, content) /* (fileName : string, content : string) -> io () */  {
   
  var x_2302 = checkSandbox(fileName);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(xfileName /* string */ ) {
       
      $std_core_hnd._open_none2($compat_log.log, "filesWrite", fileName);
      return xwriteTextFileSync(xfileName, content);
    });
  }
  else {
     
    $std_core_hnd._open_none2($compat_log.log, "filesWrite", fileName);
    return xwriteTextFileSync(x_2302, content);
  }
}
 
 
// monadic lift
export function _mlift2166_tryWriteTextFile(content0, fileName0, xfileName) /* (content0 : string, fileName0 : string, xfileName : string) -> io () */  {
   
  $std_core_hnd._open_none2($compat_log.log, "filesWrite", fileName0);
  return xwriteTextFileSync(xfileName, content0);
}
 
 
// monadic lift
export function _mlift2167_tryWriteTextFile(wild__0) /* (wild_0 : ()) -> <alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>,exn> bool */  {
  return true;
}
 
 
// Try to write a text file synchronously (using UTF8 encoding).
// Returns "True" if successful.
export function tryWriteTextFile(fileName, content) /* (fileName : string, content : string) -> io bool */  {
  return $std_core.$try(function() {
       
      var x_2308 = $std_core_hnd._open_at2(0, function(fileName0 /* string */ , content0 /* string */ ) {
           
          var x0_2310 = checkSandbox(fileName0);
           
          function next0_2311(xfileName) /* (string) -> io () */  {
             
            $std_core_hnd._open_none2($compat_log.log, "filesWrite", fileName0);
            return xwriteTextFileSync(xfileName, content0);
          }
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(next0_2311);
          }
          else {
            return next0_2311(x0_2310);
          }
        }, fileName, content);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift2167_tryWriteTextFile);
      }
      else {
        return true;
      }
    }, function(___wildcard__153__60 /* exception */ ) {
      return false;
    });
}
 
 
// monadic lift
export function _mlift2168_tryCopyTextFile(outName, _y_2036) /* (outName : string, either<exception,string>) -> io bool */  {
  if (_y_2036._tag === 1) {
    return false;
  }
  else {
    return tryWriteTextFile(outName, _y_2036.right);
  }
}
 
export function tryCopyTextFile(fileName, outName, required) /* (fileName : string, outName : string, required : optional<bool>) -> io bool */  {
   
  var _x12 = (required !== undefined) ? required : false;
  var x_2315 = tryReadTextFile(fileName, _x12);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2036 /* either<exception,string> */ ) {
      if (_y_2036._tag === 1) {
        return false;
      }
      else {
        return tryWriteTextFile(outName, _y_2036.right);
      }
    });
  }
  else {
    if (x_2315._tag === 1) {
      return false;
    }
    else {
      return tryWriteTextFile(outName, x_2315.right);
    }
  }
}
 
 
// monadic lift
export function _mlift2169_tryCopyTextFileFromTo(outName_1962, _y_2039) /* (outName.1962 : string, either<exception,string>) -> io bool */  {
  if (_y_2039._tag === 1) {
    return false;
  }
  else {
    return tryWriteTextFile(outName_1962, _y_2039.right);
  }
}
 
export function tryCopyTextFileFromTo(fname, srcDir, outDir, required) /* (fname : string, srcDir : string, outDir : string, required : optional<bool>) -> io bool */  {
   
  var fileName_1961 = $std_core_hnd._open_none2($compat_path.combine, srcDir, fname);
   
  var outName_1962 = $std_core_hnd._open_none2($compat_path.combine, outDir, fname);
   
  var _x12 = (required !== undefined) ? required : false;
  var x_2320 = tryReadTextFile(fileName_1961, _x12);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_2039 /* either<exception,string> */ ) {
      if (_y_2039._tag === 1) {
        return false;
      }
      else {
        return tryWriteTextFile(outName_1962, _y_2039.right);
      }
    });
  }
  else {
    if (x_2320._tag === 1) {
      return false;
    }
    else {
      return tryWriteTextFile(outName_1962, x_2320.right);
    }
  }
}
 
 
// monadic lift
export function _mlift2170_tryReadFileSync(_y_2043) /* (any) -> io buffer */  {
  return _y_2043;
}
 
 
// monadic lift
export function _mlift2171_tryReadFileSync(xfileName) /* (xfileName : string) -> io buffer */  {
   
  var x_2325 = xreadFileSync(xfileName);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2170_tryReadFileSync);
  }
  else {
    return x_2325;
  }
}
 
 
// monadic lift
export function _mlift2172_tryReadFileSync(_y_2044) /* (buffer) -> <alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>,exn> maybe<buffer> */  {
  return $std_core_types.Just(_y_2044);
}
 
 
// try to ead a binary file into a buffer
export function tryReadFileSync(fileName) /* (fileName : string) -> io maybe<buffer> */  {
  return $std_core.$try(function() {
       
      var x_2327 = $std_core_hnd._open_at1(0, function(fileName0 /* string */ ) {
           
          var x0_2329 = checkSandbox(fileName0);
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(_mlift2171_tryReadFileSync);
          }
          else {
            return _mlift2171_tryReadFileSync(x0_2329);
          }
        }, fileName);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift2172_tryReadFileSync);
      }
      else {
        return $std_core_types.Just(x_2327);
      }
    }, function(___wildcard__210__22 /* exception */ ) {
      return $std_core_types.Nothing;
    });
}
 
 
// monadic lift
export function _mlift2173_tryRename(xfnameOld, xfnameNew) /* (xfnameOld : string, xfnameNew : string) -> io () */  {
  return xrename(xfnameOld, xfnameNew);
}
 
 
// monadic lift
export function _mlift2174_tryRename(fnameNew0, xfnameOld) /* (fnameNew0 : string, xfnameOld : string) -> io () */  {
   
  var x_2331 = checkSandbox(fnameNew0);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(xfnameNew /* string */ ) {
      return xrename(xfnameOld, xfnameNew);
    });
  }
  else {
    return xrename(xfnameOld, x_2331);
  }
}
 
export function tryRename(fnameOld, fnameNew) /* (fnameOld : string, fnameNew : string) -> io () */  {
  return $std_core.ignore(function() {
    return $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core._tag_exn), function(fnameOld0 /* string */ , fnameNew0 /* string */ ) {
         
        var x_2335 = checkSandbox(fnameOld0);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(function(xfnameOld /* string */ ) {
            return _mlift2174_tryRename(fnameNew0, xfnameOld);
          });
        }
        else {
          return _mlift2174_tryRename(fnameNew0, x_2335);
        }
      }, fnameOld, fnameNew);
  });
}
 
export function unlinkSync(fileName) /* (fileName : string) -> io () */  {
   
  var x_2337 = checkSandbox(fileName);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(xunlinkSync);
  }
  else {
    return xunlinkSync(x_2337);
  }
}
 
 
// Delete a file
export function tryUnlinkSync(fname) /* (fname : string) -> io () */  {
  return $std_core.ignore(function() {
    return $std_core_hnd._open_at1($std_core_hnd._evv_index($std_core._tag_exn), function(fileName /* string */ ) {
         
        var x_2339 = checkSandbox(fileName);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(xunlinkSync);
        }
        else {
          return xunlinkSync(x_2339);
        }
      }, fname);
  });
}
 
 
// monadic lift
export function _mlift2175_writeBase64FileSync(content, fileName, xfileName) /* (content : string, fileName : string, xfileName : string) -> io () */  {
   
  $std_core_hnd._open_none2($compat_log.log, "filesWrite", fileName);
  return xwriteBase64FileSync(xfileName, content);
}
 
 
// Write a binary file synchronously (using base64 encoding)
export function writeBase64FileSync(fileName, content) /* (fileName : string, content : string) -> io () */  {
   
  var x_2341 = checkSandbox(fileName);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(xfileName /* string */ ) {
       
      $std_core_hnd._open_none2($compat_log.log, "filesWrite", fileName);
      return xwriteBase64FileSync(xfileName, content);
    });
  }
  else {
     
    $std_core_hnd._open_none2($compat_log.log, "filesWrite", fileName);
    return xwriteBase64FileSync(x_2341, content);
  }
}
 
 
// monadic lift
export function _mlift2176_tryWriteBase64File(content0, fileName0, xfileName) /* (content0 : string, fileName0 : string, xfileName : string) -> io () */  {
   
  $std_core_hnd._open_none2($compat_log.log, "filesWrite", fileName0);
  return xwriteBase64FileSync(xfileName, content0);
}
 
 
// monadic lift
export function _mlift2177_tryWriteBase64File(wild__0) /* (wild_0 : ()) -> <alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>,exn> bool */  {
  return true;
}
 
 
// Try to write a binary file synchronously (using base64 encoding).
// Returns "True" if successful.
export function tryWriteBase64File(fileName, content) /* (fileName : string, content : string) -> io bool */  {
  return $std_core.$try(function() {
       
      var x_2347 = $std_core_hnd._open_at2(0, function(fileName0 /* string */ , content0 /* string */ ) {
           
          var x0_2349 = checkSandbox(fileName0);
           
          function next0_2350(xfileName) /* (string) -> io () */  {
             
            $std_core_hnd._open_none2($compat_log.log, "filesWrite", fileName0);
            return xwriteBase64FileSync(xfileName, content0);
          }
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(next0_2350);
          }
          else {
            return next0_2350(x0_2349);
          }
        }, fileName, content);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift2177_tryWriteBase64File);
      }
      else {
        return true;
      }
    }, function(___wildcard__266__62 /* exception */ ) {
      return false;
    });
}