// Koka generated module: "std/os/path", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
 
// externals
/*---------------------------------------------------------------------------
    Copyright 2012-2021, Microsoft Research, Daan Leijen.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the LICENSE file at the root of this distribution.
---------------------------------------------------------------------------*/
var _get_pathsep;
var _get_dirsep;
var _get_realpath;
var _get_homedir;
var _get_tempdir;
function _get_apppath() {
  if (typeof module === "undefined" || module==null) return "";
  var m = module; 
  while(m.parent != null) { m = m.parent; }; 
  return (m.filename != null ? m.filename : "");    
};
if ($std_core.host() === "node") {
  var _fs   = await import("fs");
  var _path = await import("path");
  var _os   = await import("os");
  _get_dirsep  = function() { return _path.sep; };
  _get_pathsep = function() { return _path.delimiter; };
  _get_realpath = function(p) { return _fs.realpathSync(p); };
  _get_homedir  = function() { return _os.homedir(); }
  _get_tempdir  = function() { return _os.tmpdir(); }
}
else {
  // browser?
  _get_dirsep = function() { return "/"; };
  _get_pathsep = function() { return ":"; };
  _get_realpath = function(p) { return p; };
  _get_homedir  = function() { return "."; };
  _get_tempdir  = function() { return "."; };
}
 
// type declarations
// type path
export function Path(root, parts) /* (root : string, parts : list<string>) -> path */  {
  return { root: root, parts: parts };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `root` constructor field of the `:path` type.
export function root(path0) /* (path : path) -> string */  {
  return path0.root;
}
 
 
// Automatically generated. Retrieves the `parts` constructor field of the `:path` type.
export function parts(path0) /* (path : path) -> list<string> */  {
  return path0.parts;
}
 
export function _copy(_this, root0, parts0) /* (path, root : optional<string>, parts : optional<list<string>>) -> path */  {
  if (root0 !== undefined) {
    var _x0 = root0;
  }
  else {
    var _x0 = _this.root;
  }
  if (parts0 !== undefined) {
    var _x1 = parts0;
  }
  else {
    var _x1 = _this.parts;
  }
  return Path(_x0, _x1);
}
 
export function xapp_path() /* () -> io string */  {
  return ((function() {
    try {
      return _get_apppath();
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
 
// Return the base name of a path (stem name + extension)\
// `"/foo/bar.txt".path.basename === "bar.txt"` \
// `"/foo".path.basename === "foo"`
export function basename(p) /* (p : path) -> string */  {
  return (p.parts !== null) ? p.parts.head : "";
}
 
 
// Remove the basename and only keep the root and directory name portion of the path.\
// `nobase("foo/bar.ext".path) == "foo")`
export function nobase(p) /* (p : path) -> path */  {
  var _x3 = undefined;
  if (_x3 !== undefined) {
    var _x2 = _x3;
  }
  else {
    var _x2 = p.root;
  }
  var _x4 = (p.parts !== null) ? p.parts.tail : $std_core.Nil;
  return Path(_x2, _x4);
}
 
export function split_parts(parts0) /* (parts : list<string>) -> (string, list<string>) */  {
  var _x5 = (parts0 !== null) ? parts0.head : "";
  var _x6 = (parts0 !== null) ? parts0.tail : $std_core.Nil;
  return $std_core_types._Tuple2_(_x5, _x6);
}
 
export function xrealpath(p) /* (p : string) -> io string */  {
  return ((function() {
    try {
      return _get_realpath(p);
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
 
// Return the directory part of a path (including the rootname)
// `"/foo/bar.txt".path.dirname === "/foo"` \
// `"/foo".path.dirname === "/"`
export function dirname(p) /* (p : path) -> string */  {
   
  var _x7 = (p.parts !== null) ? p.parts.tail : $std_core.Nil;
  var xs_2032 = $std_core._lift17195_reverse($std_core.Nil, _x7);
  var _x7 = p.root;
  if (xs_2032 === null) {
    var _x8 = "";
  }
  else {
    var _x8 = $std_core._lift17188_joinsep("/", xs_2032.tail, xs_2032.head);
  }
  return $std_core._lp__plus__plus__1_rp_(_x7, _x8);
}
 
 
// Return a list of all directory components (excluding the root but including the basename).\
// `"/foo/bar/test.txt".path.dirparts === ["foo","bar","test.txt"]`
export function dirparts(p) /* (p : path) -> list<string> */  {
  var _x9 = p.parts;
  return $std_core._lift17195_reverse($std_core.Nil, _x9);
}
 
export function xhomedir() /* () -> io string */  {
  return ((function() {
    try {
      return _get_homedir();
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
 
// Remove the directory and root and only keep the base name (file name) portion of the path.\
// `nodir("foo/bar.ext".path) === "bar.ext"`
export function nodir(p) /* (p : path) -> path */  {
   
  var _x10 = p.parts;
  var parts0_2041 = $std_core.take(_x10, 1);
  if (parts0_2041 !== undefined) {
    var _x10 = parts0_2041;
  }
  else {
    var _x10 = p.parts;
  }
  return Path("", _x10);
}
 
 
// Return the last directory component name (or the empty string).\
// `"c:/foo/bar/tst.txt".path.parentname === "bar"
export function parentname(p) /* (p : path) -> string */  {
  var _x11 = (p.parts !== null) ? p.parts.tail : $std_core.Nil;
  return (_x11 !== null) ? _x11.head : "";
}
 
 
// Return the OS specific directory separator (`"/"` or `"\\"`)
export function partsep() /* () -> ndet string */  {
  return _get_partsep();
}
 
 
// Return the OS specific path separator (`';'` or `':'`)
export function pathsep() /* () -> ndet string */  {
  return _get_pathsep();
}
 
 
// Return the root name of path.
// `"c:\\foo".path.rootname === "c:/"`\
// `"/foo".path.rootname === "/"`
export function rootname(p) /* (p : path) -> string */  {
  return p.root;
}
 
export function xtempdir() /* () -> io string */  {
  return ((function() {
    try {
      return _get_tempdir();
    }
    catch(_err){ return $std_core._throw_exception(_err); }
  })());
}
 
 
// Is a path empty?
export function is_empty(p) /* (p : path) -> bool */  {
  var _x13 = p.root;
  var _x12 = (_x13 === (""));
  if (_x12) {
    return (p.parts === null);
  }
  else {
    return false;
  }
}
 
 
// Return the first path if it is not empty, otherwise return the second one.
export function _lp__bar__bar__rp_(p1, p2) /* (p1 : path, p2 : path) -> path */  {
  var _x15 = p1.root;
  var _x14 = (_x15 === (""));
  if (_x14) {
    return (p1.parts === null) ? p2 : p1;
  }
  else {
    return p1;
  }
}
 
export function push_part(dir, dirs) /* (dir : string, dirs : list<string>) -> list<string> */  {
  if ((dir === ("."))) {
    return dirs;
  }
  else {
    if ((dir === (""))) {
      return dirs;
    }
    else {
      if ((dir === (".."))) {
        if (dirs !== null) {
          return (dirs !== null) ? dirs.tail : $std_core.Nil;
        }
        else {
          return $std_core.Cons(dir, dirs);
        }
      }
      else {
        return $std_core.Cons(dir, dirs);
      }
    }
  }
}
 
export function push_parts(parts0, dirs) /* (parts : list<string>, dirs : list<string>) -> list<string> */  { tailcall: while(1)
{
  if (parts0 !== null) {
    {
      // tail call
      var _x16 = push_part(parts0.head, dirs);
      parts0 = parts0.tail;
      dirs = _x16;
      continue tailcall;
    }
  }
  else {
    return dirs;
  }
}}
 
 
// monadic lift
export function _mlift2206_proot(wild__4) /* (wild_4 : char) -> std/text/parse/parse bool */  {
  return false;
}
 
 
// monadic lift
export function _mlift2207_proot(wild__5) /* (wild_5 : ()) -> std/text/parse/parse bool */  {
  return true;
}
 
 
// monadic lift
export function _mlift2208_proot(wild__0) /* (wild_0 : char) -> std/text/parse/parse () */  {
  return $std_core_types._Unit_;
}
 
 
// monadic lift
export function _mlift2209_proot(wild__) /* (wild_ : char) -> std/text/parse/parse () */  {
   
  var x_2221 = $std_text_parse.char(0x003A);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2208_proot);
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
 
// monadic lift
export function _mlift2210_proot(_y_2165) /* (list<char>) -> std/text/parse/parse () */  {
  return $std_core_types._Unit_;
}
 
 
// monadic lift
export function _mlift2211_proot(_y_2163) /* (char) -> std/text/parse/parse () */  {
   
  var x_2223 = $std_text_parse.many_acc(function() {
      return $std_text_parse.none_of("/");
    }, $std_core.Nil);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2210_proot);
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
 
// monadic lift
export function _mlift2212_proot(wild__1) /* (wild_1 : char) -> std/text/parse/parse () */  {
   
  var x_2225 = $std_text_parse.none_of("/");
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2211_proot);
  }
  else {
    return _mlift2211_proot(x_2225);
  }
}
 
 
// monadic lift
export function _mlift2213_proot(wild__3) /* (wild_3 : ()) -> std/text/parse/parse bool */  {
  return $std_text_parse._lp__bar__bar__rp_(function() {
       
      var x_2227 = $std_text_parse.char(0x002F);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift2206_proot);
      }
      else {
        return false;
      }
    }, function() {
       
      var x0_2229 = $std_text_parse.eof();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift2207_proot);
      }
      else {
        return true;
      }
    });
}
 
export function proot() /* () -> std/text/parse/parse bool */  {
   
  var x_2231 = $std_text_parse._lp__bar__bar__rp_(function() {
       
      var x0_2234 = $std_text_parse.alpha();
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift2209_proot);
      }
      else {
        return _mlift2209_proot(x0_2234);
      }
    }, function() {
       
      var x1_2236 = $std_text_parse.char(0x002F);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(_mlift2212_proot);
      }
      else {
        return _mlift2212_proot(x1_2236);
      }
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2213_proot);
  }
  else {
    return $std_text_parse._lp__bar__bar__rp_(function() {
         
        var x2_2238 = $std_text_parse.char(0x002F);
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(_mlift2206_proot);
        }
        else {
          return false;
        }
      }, function() {
         
        var x3_2240 = $std_text_parse.eof();
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(_mlift2207_proot);
        }
        else {
          return true;
        }
      });
  }
}
 
 
// Convert a `:path` to a normalized `:string` path.\
// If this results in an empty string, the current directory path `"."` is returned.
// `"c:/foo/test.txt".path.string -> "c:/foo/test.txt"`\
// `"c:\\foo\\test.txt".path.string -> "c:/foo/test.txt"`\
// `"/foo//./bar/../test.txt".path.string -> "/foo/test.txt"`
export function string(p) /* (p : path) -> string */  {
   
  var _x17 = p.parts;
  var xs_2058 = $std_core._lift17195_reverse($std_core.Nil, _x17);
   
  var _x18 = p.root;
  if (xs_2058 === null) {
    var _x19 = "";
  }
  else {
    var _x19 = $std_core._lift17188_joinsep("/", xs_2058.tail, xs_2058.head);
  }
  var s = $std_core._lp__plus__plus__1_rp_(_x18, _x19);
  return ((s === (""))) ? "." : s;
}
 
 
// A `:path` represents a file system path.\
export function _create_Path(root0, parts0) /* (root : optional<string>, parts : optional<list<string>>) -> path */  {
  var _x17 = (root0 !== undefined) ? root0 : "";
  var _x18 = (parts0 !== undefined) ? parts0 : $std_core.Nil;
  return Path(_x17, _x18);
}
 
export function path_parts(root0, s, dirs) /* (root : string, s : string, dirs : optional<list<string>>) -> path */  {
   
  var v_17122 = ((s).split(("/")));
   
  var _x19 = (dirs !== undefined) ? dirs : $std_core.Nil;
  var parts0 = push_parts($std_core.vlist(v_17122), _x19);
  return Path(root0, parts0);
}
 
 
// Create a normalized `:path` from a path string.
export function path(s) /* (s : string) -> path */  {
  if ((s === (""))) {
    return Path("", $std_core.Nil);
  }
  else {
     
    var t = (s).replace(new RegExp((("\\")).replace(/[\\\$\^*+\-{}?().]/g,'\\$&'),'g'),("/"));
    var _x19 = $std_text_parse.starts_with(t, proot);
    if (_x19 === null) {
       
      var v_17122 = ((t).split(("/")));
       
      var _x21 = undefined;
      var _x20 = (_x21 !== undefined) ? _x21 : $std_core.Nil;
      var parts0 = push_parts($std_core.vlist(v_17122), _x20);
      return Path("", parts0);
    }
    else {
       
      var _x20 = $std_core.Sslice(_x19.value.snd.str, 0, _x19.value.snd.start);
      var _x21 = (_x19.value.fst) ? "/" : "";
      var root1_2071 = $std_core._lp__plus__plus__1_rp_($std_core.string_3(_x20), _x21);
       
      var s3_2072 = $std_core.string_3(_x19.value.snd);
       
      var v_171220 = ((s3_2072).split(("/")));
       
      var _x23 = undefined;
      var _x22 = (_x23 !== undefined) ? _x23 : $std_core.Nil;
      var parts1 = push_parts($std_core.vlist(v_171220), _x22);
      return Path(root1_2071, parts1);
    }
  }
}
 
 
// Add two paths together using left-associative operator `(/)`. \
// Keeps the root of `p1` and discards the root name of `p2`.\
// `"/a/" / "b/foo.txt"          === "/a/b/foo.txt"`\
// `"/a/foo.txt" / "/b/bar.txt"  === "/a/foo.txt/b/bar.txt"`\
// `"c:/foo" / "d:/bar"          === "c:/foo/bar"`
export function _lp__fs__rp_(p1, p2) /* (p1 : path, p2 : path) -> path */  {
   
  var _x20 = p2.parts;
  var _x21 = p1.parts;
  var parts0_2078 = push_parts($std_core._lift17195_reverse($std_core.Nil, _x20), _x21);
  var _x20 = p1.root;
  var _x21 = (parts0_2078 !== undefined) ? parts0_2078 : $std_core.Nil;
  return Path(_x20, _x21);
}
 
 
// Convenience function that adds a string path.
export function _lp__fs__1_rp_(p1, p2) /* (p1 : path, p2 : string) -> path */  {
   
  var p20_2144 = path(p2);
   
  var _x22 = p20_2144.parts;
  var _x23 = p1.parts;
  var parts0_2078 = push_parts($std_core._lift17195_reverse($std_core.Nil, _x22), _x23);
  var _x22 = p1.root;
  var _x23 = (parts0_2078 !== undefined) ? parts0_2078 : $std_core.Nil;
  return Path(_x22, _x23);
}
 
 
// Convenience function that adds two strings into a path.
export function _lp__fs__2_rp_(p1, p2) /* (p1 : string, p2 : string) -> path */  {
   
  var p10_2145 = path(p1);
   
  var p20_2146 = path(p2);
   
  var _x24 = p20_2146.parts;
  var _x25 = p10_2145.parts;
  var parts0_2078 = push_parts($std_core._lift17195_reverse($std_core.Nil, _x24), _x25);
  var _x24 = p10_2145.root;
  var _x25 = (parts0_2078 !== undefined) ? parts0_2078 : $std_core.Nil;
  return Path(_x24, _x25);
}
 
 
// monadic lift
export function _mlift2214_app_path(_y_2171) /* (string) -> io path */  {
  return $std_core_hnd._open_none1(path, _y_2171);
}
 
 
// Return the path to the currently executing application.
export function app_path() /* () -> io path */  {
   
  var x_2242 = xapp_path();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2214_app_path);
  }
  else {
    return $std_core_hnd._open_none1(path, x_2242);
  }
}
 
 
// monadic lift
export function _mlift2215_appdir(_y_2172) /* (string) -> io path */  {
   
  var _x1_2194 = $std_core_hnd._open_none1(path, _y_2172);
   
  var p0 = $std_core_hnd._open_none1(function(p /* path */ ) {
      var _x27 = undefined;
      if (_x27 !== undefined) {
        var _x26 = _x27;
      }
      else {
        var _x26 = p.root;
      }
      var _x28 = (p.parts !== null) ? p.parts.tail : $std_core.Nil;
      return Path(_x26, _x28);
    }, _x1_2194);
  var _x26 = (($std_core_hnd._open_none1(function(p00 /* path */ ) {
      return (p00.parts !== null) ? p00.parts.head : "";
    }, p0)) === ("bin"));
  if (_x26) {
    return $std_core_hnd._open_none1(function(p1 /* path */ ) {
        var _x28 = undefined;
        if (_x28 !== undefined) {
          var _x27 = _x28;
        }
        else {
          var _x27 = p1.root;
        }
        var _x29 = (p1.parts !== null) ? p1.parts.tail : $std_core.Nil;
        return Path(_x27, _x29);
      }, p0);
  }
  else {
    var _x30 = (($std_core_hnd._open_none1(function(p10 /* path */ ) {
        return (p10.parts !== null) ? p10.parts.head : "";
      }, p0)) === ("exe"));
    if (_x30) {
      return $std_core_hnd._open_none1(function(p2 /* path */ ) {
          var _x32 = undefined;
          if (_x32 !== undefined) {
            var _x31 = _x32;
          }
          else {
            var _x31 = p2.root;
          }
          var _x33 = (p2.parts !== null) ? p2.parts.tail : $std_core.Nil;
          return Path(_x31, _x33);
        }, p0);
    }
    else {
      return p0;
    }
  }
}
 
 
// Return the base directory that contains the currently running application.
// First tries `app-path().nobase`; if that ends in the ``bin`` or ``exe`` directory it
// returns the parent of that directory.
export function appdir() /* () -> io path */  {
   
  var x_2245 = xapp_path();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2215_appdir);
  }
  else {
     
    var _x1_2194 = $std_core_hnd._open_none1(path, x_2245);
     
    var p0 = $std_core_hnd._open_none1(function(p /* path */ ) {
        var _x35 = undefined;
        if (_x35 !== undefined) {
          var _x34 = _x35;
        }
        else {
          var _x34 = p.root;
        }
        var _x36 = (p.parts !== null) ? p.parts.tail : $std_core.Nil;
        return Path(_x34, _x36);
      }, _x1_2194);
    var _x34 = (($std_core_hnd._open_none1(function(p00 /* path */ ) {
        return (p00.parts !== null) ? p00.parts.head : "";
      }, p0)) === ("bin"));
    if (_x34) {
      return $std_core_hnd._open_none1(function(p1 /* path */ ) {
          var _x36 = undefined;
          if (_x36 !== undefined) {
            var _x35 = _x36;
          }
          else {
            var _x35 = p1.root;
          }
          var _x37 = (p1.parts !== null) ? p1.parts.tail : $std_core.Nil;
          return Path(_x35, _x37);
        }, p0);
    }
    else {
      var _x38 = (($std_core_hnd._open_none1(function(p10 /* path */ ) {
          return (p10.parts !== null) ? p10.parts.head : "";
        }, p0)) === ("exe"));
      if (_x38) {
        return $std_core_hnd._open_none1(function(p2 /* path */ ) {
            var _x40 = undefined;
            if (_x40 !== undefined) {
              var _x39 = _x40;
            }
            else {
              var _x39 = p2.root;
            }
            var _x41 = (p2.parts !== null) ? p2.parts.tail : $std_core.Nil;
            return Path(_x39, _x41);
          }, p0);
      }
      else {
        return p0;
      }
    }
  }
}
 
 
// Change the base name of a path
export function change_base(p, basename0) /* (p : path, basename : string) -> path */  {
   
  var _x43 = undefined;
  if (_x43 !== undefined) {
    var _x42 = _x43;
  }
  else {
    var _x42 = p.root;
  }
  var _x44 = (p.parts !== null) ? p.parts.tail : $std_core.Nil;
  var q = Path(_x42, _x44);
   
  var v_17122 = ((basename0).split(("/")));
   
  var _x45 = q.parts;
  var parts0 = push_parts($std_core.vlist(v_17122), _x45);
  var _x42 = q.root;
  return Path(_x42, parts0);
}
 
export function split_base(basename0) /* (basename : string) -> (string, string) */  {
  var _x43 = $std_core.find_last(basename0, ".");
  if (_x43 !== null) {
    var _x44 = $std_core.Sslice(_x43.value.str, 0, _x43.value.start);
    return $std_core_types._Tuple2_($std_core.string_3(_x44), $std_core.string_3($std_core.after(_x43.value)));
  }
  else {
    return $std_core_types._Tuple2_(basename0, "");
  }
}
 
 
// Change the extension of a path.
// Only adds a dot if the extname does not already start with a dot.
export function change_ext(p, extname0) /* (p : path, extname : string) -> path */  {
  var _x46 = (p.parts !== null) ? p.parts.head : "";
  var _x45 = split_base(_x46);
   
  var m_2102 = $std_core.starts_with(extname0, ".");
   
  if (m_2102 === null) {
    var newext = $std_core._lp__plus__plus__1_rp_(".", extname0);
  }
  else {
    var newext = extname0;
  }
   
  var s_2104 = $std_core._lp__plus__plus__1_rp_(_x45.fst, newext);
   
  var v_17122 = ((s_2104).split(("/")));
   
  var _x47 = (p.parts !== null) ? p.parts.tail : $std_core.Nil;
  var parts1 = push_parts($std_core.vlist(v_17122), _x47);
  var _x47 = p.root;
  return Path(_x47, parts1);
}
 
 
// Return the extension of path (without the preceding dot (`'.'`))\
// `"/foo/bar.svg.txt".path.extname === "txt"`
export function extname(p) /* (p : path) -> string */  {
   
  var _x48 = (p.parts !== null) ? p.parts.head : "";
  var _this_2109 = split_base(_x48);
  return _this_2109.snd;
}
 
 
// Change the stem name of a path
export function change_stem(p, stemname0) /* (p : path, stemname : string) -> path */  {
   
  var _x48 = (p.parts !== null) ? p.parts.head : "";
  var _this_2109 = split_base(_x48);
   
  var _x51 = _this_2109.snd;
  var _x50 = (_x51 === (""));
  if (_x50) {
    var _x49 = "";
  }
  else {
    var _x52 = _this_2109.snd;
    var _x49 = $std_core._lp__plus__plus__1_rp_(".", _x52);
  }
  var basename0_2249 = $std_core._lp__plus__plus__1_rp_(stemname0, _x49);
   
  var _x54 = undefined;
  if (_x54 !== undefined) {
    var _x53 = _x54;
  }
  else {
    var _x53 = p.root;
  }
  var _x55 = (p.parts !== null) ? p.parts.tail : $std_core.Nil;
  var q = Path(_x53, _x55);
   
  var v_17122 = ((basename0_2249).split(("/")));
   
  var _x56 = q.parts;
  var parts0 = push_parts($std_core.vlist(v_17122), _x56);
  var _x48 = q.root;
  return Path(_x48, parts0);
}
 
 
// Combine multiple paths using `(/)`.
export function combine(ps) /* (ps : list<path>) -> path */  {
  if (ps === null) {
    var _x50 = undefined;
    var _x49 = (_x50 !== undefined) ? _x50 : "";
    var _x52 = undefined;
    var _x51 = (_x52 !== undefined) ? _x52 : $std_core.Nil;
    return Path(_x49, _x51);
  }
  else {
    return $std_core.foldl(ps.tail, ps.head, _lp__fs__rp_);
  }
}
 
 
// monadic lift
export function _mlift2216_realpath_1(_y_2175) /* (string) -> io path */  {
  return $std_core_hnd._open_none1(path, _y_2175);
}
 
 
// Convert a path to the absolute path on the file system.\
// The overload on a plain string is necessary as it allows
// for unnormalized paths with `".."` parts. For example
// `"/foo/symlink/../test.txt"` may resolve to `"/bar/test.txt"` if
// ``symlink`` is a symbolic link to a sub directory of `"/bar"`.
export function realpath_1(s) /* (s : string) -> io path */  {
   
  var x_2250 = xrealpath(s);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2216_realpath_1);
  }
  else {
    return $std_core_hnd._open_none1(path, x_2250);
  }
}
 
 
// monadic lift
export function _mlift2217_realpath(_y_2176) /* (string) -> io path */  {
  return $std_core_hnd._open_none1(path, _y_2176);
}
 
 
// Convert a path to the absolute path on the file system.
// The path is not required to exist on disk. However, if it
// exists any permissions and symbolic links are resolved fully.\
// `".".realpath` (to get the current working directory)\
// `"/foo".realpath` (to resolve the full root, like `"c:/foo"` on windows)
export function realpath(p) /* (p : path) -> io path */  {
   
  var s_2117 = $std_core_hnd._open_none1(string, p);
   
  var x_2253 = xrealpath(s_2117);
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2217_realpath);
  }
  else {
    return $std_core_hnd._open_none1(path, x_2253);
  }
}
 
 
// monadic lift
export function _mlift2218_cwd(_y_2177) /* (string) -> io path */  {
  return $std_core_hnd._open_none1(path, _y_2177);
}
 
 
// Returns the current working directory.\
// Equal to `".".realpath`.
export function cwd() /* () -> io path */  {
   
  var x_2256 = xrealpath(".");
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2218_cwd);
  }
  else {
    return $std_core_hnd._open_none1(path, x_2256);
  }
}
 
 
// If a path has no extension, set it to the provided one.
export function default_ext(p, newext) /* (p : path, newext : string) -> path */  {
   
  var _x53 = (p.parts !== null) ? p.parts.head : "";
  var _this_2109 = split_base(_x53);
  var _x54 = _this_2109.snd;
  var _x53 = (_x54 === (""));
  if (_x53) {
    return change_ext(p, newext);
  }
  else {
    return p;
  }
}
 
 
// monadic lift
export function _mlift2219_homedir(_y_2178) /* (string) -> io path */  {
  return $std_core_hnd._open_none1(path, _y_2178);
}
 
 
// Return the home directory of the current user.
export function homedir() /* () -> io path */  {
   
  var x_2259 = xhomedir();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2219_homedir);
  }
  else {
    return $std_core_hnd._open_none1(path, x_2259);
  }
}
 
 
// Is a path relative?
export function is_relative(p) /* (p : path) -> bool */  {
  var _x55 = p.root;
  return (_x55 === (""));
}
 
 
// Is a path absolute?
export function is_absolute(p) /* (p : path) -> bool */  {
   
  var _x56 = p.root;
  var b_2122 = (_x56 === (""));
  return (b_2122) ? false : true;
}
 
 
// Remove the extension from a path.
export function noext(p) /* (p : path) -> path */  {
  return change_ext(p, "");
}
 
export function _ctail_paths_collect(ps, _acc) /* (ps : list<string>, ctail<list<path>>) -> list<path> */  { tailcall: while(1)
{
  if (ps !== null && ps.tail !== null) {
    var _x57 = $std_core._int_eq(($std_core.count_1(ps.head)),1);
    if (_x57) {
       
      var m_2126 = $std_core.foreach_while_1($std_core.Sslice(ps.head, 0, (ps.head).length), $std_core_types.Just);
      var _x59 = (m_2126 === null) ? 0x0020 : m_2126.value;
      var _x58 = $std_core.is_alpha(_x59);
      if (_x58) {
         
        var b_2129 = ((ps.tail.head) === (""));
        if (b_2129) {
          var _x56 = false;
        }
        else {
          var _x56 = ((("/\\")).indexOf(($std_core.head_3(ps.tail.head))) >= 0);
        }
      }
      else {
        var _x56 = false;
      }
    }
    else {
      var _x56 = false;
    }
    if (_x56){
       
      var _ctail_2150 = path($std_core._lp__plus__plus__1_rp_(ps.head, $std_core._lp__plus__plus__1_rp_(":", ps.tail.head)));
       
      var _ctail_2151 = undefined;
       
      var _ctail_2152 = $std_core.Cons(_ctail_2150, _ctail_2151);
      {
        // tail call
        var _x60 = $std_core_types._ctail_link(_acc,_ctail_2152,({value: _ctail_2152, field: "tail"}));
        ps = ps.tail.tail;
        _acc = _x60;
        continue tailcall;
      }
    }
  }
  if (ps !== null) {
     
    var _ctail_2153 = path(ps.head);
     
    var _ctail_2154 = undefined;
     
    var _ctail_2155 = $std_core.Cons(_ctail_2153, _ctail_2154);
    {
      // tail call
      var _x61 = $std_core_types._ctail_link(_acc,_ctail_2155,({value: _ctail_2155, field: "tail"}));
      ps = ps.tail;
      _acc = _x61;
      continue tailcall;
    }
  }
  return $std_core_types._ctail_resolve(_acc,($std_core.Nil));
}}
 
export function paths_collect(ps0) /* (ps : list<string>) -> list<path> */  {
  return _ctail_paths_collect(ps0, $std_core_types._ctail_nil());
}
 
 
// Parse a list of paths seperated by colon (`':'`) or semi-colon (`';'`)
//
// Colon separated paths can be ambiguous with Windows style root names (`c:\\`)
// In particular, a single letter path followed by an absolute path, e.g. ``c:/foo:/bar`` is
// parsed as ``c:/foo`` and ``/bar``.
export function paths(s) /* (s : string) -> list<path> */  {
   
  var s0_2131 = (s).replace(new RegExp(((";")).replace(/[\\\$\^*+\-{}?().]/g,'\\$&'),'g'),(":"));
   
  var v_17122 = ((s0_2131).split((":")));
  return paths_collect($std_core.vlist(v_17122));
}
 
 
// Show a path as a string.
export function show(p) /* (p : path) -> string */  {
  return $std_core.show_3(string(p));
}
 
 
// Return the stem name of path.\
// `"/foo/bar.svg.txt".path.extname === "foo.svg"`
export function stemname(p) /* (p : path) -> string */  {
   
  var _x62 = (p.parts !== null) ? p.parts.head : "";
  var _this_2133 = split_base(_x62);
  return _this_2133.fst;
}
 
 
// monadic lift
export function _mlift2220_tempdir(_y_2179) /* (string) -> io path */  {
  return $std_core_hnd._open_none1(path, _y_2179);
}
 
 
// Return the temporary directory for the current user.
export function tempdir() /* () -> io path */  {
   
  var x_2262 = xtempdir();
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(_mlift2220_tempdir);
  }
  else {
    return $std_core_hnd._open_none1(path, x_2262);
  }
}