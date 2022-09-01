// Koka generated module: "compat/path", koka version: 2.4.0
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
 
// externals
/*---------------------------------------------------------------------------
    Copyright 2012 Microsoft Corporation.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/
var onserver = ($std_core.getHost() === "nodejs");
var path;
if (onserver) {
  path = require("path");
}
else {
  path = {
    sep: "/",
    delimiter: ";",
    basename: $basename,
    dirname: $dirname,
    extname: $extname,
    normalize: $normalize,    
  };
}
function $basename(s) {
  if (!s) return "";
  var i = s.lastIndexOf("/");
  return (i < 0 ? s : s.substr(i+1));
}
function $dirname(s) {
  if (!s) return "";
  var i = s.lastIndexOf("/");
  return (i <= 0 ? "" : s.substr(0,i));
}
function $extname(s) {
  s = $basename(s);
  if (!s) return "";
  var i = s.lastIndexOf(".");
  return (i < 0 ? "" : s.substr(i));      
}
function $normalize(s) { 
  var ps = s.split(/[\\\/]/); // TODO: improve on the browser?
  var path = [];
  for(var i = 0; i < ps.length; i++) {
    if (ps[i] === ".." && path.length > 0) {
      path.pop();
    }
    else if (ps[i] !== ".") {
      path.push(ps[i]);
    }
  }
  return path.join("/");
}    
 
// type declarations
 
// declarations
 
export function pathsep() /* () -> string */  {
  return path.sep;
}
 
export function xdirname(p) /* (p : string) -> string */  {
  return path.dirname(p);
}
 
 
// Return the extension (including the `.`)  
// `extname("foo.ext") == ".ext"`, `extname("bla.") == "."`, `extname("bla") == ""`
export function extname__old(p) /* (p : string) -> string */  {
  return path.extname(p);
}
 
 
// Return the base name (file name) portion of the path.
// `basename("foo/bar.ext") == "bar.ext"`
export function basename(p) /* (p : string) -> string */  {
  return path.basename(p);
}
 
export function pathdelim() /* () -> string */  {
  return path.delimiter;
}
 
 
// Return the full normalized path
export function normalize(p) /* (p : string) -> io string */  {
  return ((function() {
    try {
      return path.normalize(p);
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
export function programPath() /* () -> io string */  {
  return ((function() {
    try {
      return ((function(){ var m = module; if (m==null) return ''; while(m.parent) { m = m.parent; }; return (m.filename ? m.filename : ''); })());
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
 
// Platform specific directory separator (`/` or `\`)
export var sep;
var sep = pathsep();
 
 
// Join arguments using the platform specific directory separator  
// Note: unlike NodeJS the resulting path is not yet normalized
export function combine(path1, path2) /* (path1 : string, path2 : string) -> string */  {
   
  var _x0 = $compat.startsWith(path2, sep);
  if (_x0) {
    var p2 = $compat.substr(path2, 1);
  }
  else {
    var p2 = path2;
  }
   
  var _x1 = $compat.endsWith(path1, sep);
  if (_x1) {
     
    var x_521 = $std_core.count_1(path1);
     
    var len_520 = $std_core._int_sub(x_521,1);
    if ($std_core._int_le(len_520,0)) {
      var p1 = "";
    }
    else {
      var p1 = $compat.substr2(path1, 0, len_520);
    }
  }
  else {
    var p1 = path1;
  }
  if ((p1 === (""))) {
    return p2;
  }
  else {
     
    var left_524 = $std_core._lp__plus__plus__1_rp_(p1, sep);
    return $std_core._lp__plus__plus__1_rp_(left_524, p2);
  }
}
 
 
// Join a list of paths
export function combine_1(paths) /* (paths : list<string>) -> string */  {
  if (paths === null) {
    return "";
  }
  else {
    return $std_core.foldl(paths.tail, paths.head, combine);
  }
}
 
 
// Return the directory name portion of the path (excluding the directory separator).
// Return an empty string if no directory part exists in the path.  
// `dirname("foo/bar.ext") == "foo")`
export function dirname(p) /* (p : string) -> string */  {
   
  var d = xdirname(p);
  if ((d === ("."))) {
     
    var b_528 = $compat.startsWith(p, ".");
    return (b_528) ? d : "";
  }
  else {
    return d;
  }
}
 
 
// Remove the extension from a path
export function noext(path) /* (path : string) -> string */  {
   
  var ext = extname__old(path);
  if ((ext === (""))) {
    return path;
  }
  else {
     
    var x_532 = $std_core.count_1(path);
     
    var y_533 = $std_core.count_1(ext);
     
    var len_531 = $std_core._int_sub(x_532,y_533);
    if ($std_core._int_le(len_531,0)) {
      return "";
    }
    else {
      return $compat.substr2(path, 0, len_531);
    }
  }
}
 
 
// Return the stem name portion of the path, i.e. without directory or extension.
// `stemname("foo/bar.ext") == "bar"`
export function stemname(p) /* (p : string) -> string */  {
  return noext(basename(p));
}
 
 
// Append to the stem name of a path
export function appendStem(path, extra) /* (path : string, extra : string) -> string */  {
   
  var left0_538 = noext(basename(path));
   
  var left_536 = $std_core._lp__plus__plus__1_rp_(left0_538, extra);
   
  var right_537 = extname__old(path);
  return combine(dirname(path), $std_core._lp__plus__plus__1_rp_(left_536, right_537));
}
 
 
// Change the extension of a path
export function changeExt(path, ext) /* (path : string, ext : string) -> string */  {
   
  var left0_543 = noext(path);
   
  var _x0 = $compat.startsWith(ext, ".");
  var right0_544 = (_x0) ? "" : ".";
   
  var left_541 = $std_core._lp__plus__plus__1_rp_(left0_543, right0_544);
  return $std_core._lp__plus__plus__1_rp_(left_541, ext);
}
 
 
// If a path has no extension, set it to the provided one.
export function defaultExt(fname, ext) /* (fname : string, ext : string) -> string */  {
  var _x0 = ((extname__old(fname)) === (""));
  if (_x0) {
    return changeExt(fname, ext);
  }
  else {
    return fname;
  }
}
 
 
// Platform specific path delimiter when specifying a list o paths (`:` or `;`)
export var delimiter;
var delimiter = pathdelim();