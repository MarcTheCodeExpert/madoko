/*---------------------------------------------------------------------------
  Copyright 2013-2015 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Provide client/server storage
// This module provides file access operations. On the web client, these
// operations only provide accesss to a global object of files which is
// *not* persistent. This code is mainly to ensure we can share as much
// code as possible between client and server.
//
// It also used to resolve includes. i.e., [INCLUDE=/filename].
//
// We keep this sandboxing to eventually use it for the LSP implementation 
module storage

import std/os/path

import compat
import compat/path
import compat/log
import compat/regex
import stringcompat

extern include {
  js file "storage-inline.js"
}

/*---------------------------------------------------------------------------
  Sandboxing
---------------------------------------------------------------------------*/

val sandboxed : ref<global,maybe<list<string>>> = unsafe-total { ref(Nothing) }

pub fun enforceSandbox( roots : list<string> = [""] ) : io () {
  sandboxed := Just(roots.map(fn(r) { r.normalize.xnormalize }))
}

pub fun checkSandbox( path : string ) : io string {
  match (!sandboxed) {
    Nothing -> path.normalize
    Just(roots) -> {
      val xpath = path.normalize.xnormalize
      if (!(xpath.under(roots))) {
        error("cannot access files outside the sandbox: " + path)
      }
      return xpath
    }
  }
}

fun under( path : string, roots : list<string> ) : bool {
  roots.any fn(root) {
    if (root.is-empty)
     then path.contains(rxRootRelative)
     else path.startsWith(root + "/") && path.substr(root.length+1).contains(rxRootRelative)
  }
}

val fileChar       = r"[^\\\/\?\*\.\|<>&:\u0000-\u001F]"
val rxRootRelative = regex( r"^(?![\\\/]|\w:)(?:" + fileChar + r"|\.(?=[^\.])|[\\\/](?=" + fileChar + r"|\.))+$" )


/*---------------------------------------------------------------------------
  Resolve relative paths and map ".."" references to ".parent" in a sandbox
---------------------------------------------------------------------------*/

pub fun xnormalize( path : string ) : string {
  path.split(rxPathSep).list.foldl([],fn(rroots,dir) {
    if (dir=="" || dir==".") then {
      rroots
    }
    elif (dir=="..") then {
      match(rroots) {
        Cons(root,rest) | root != ".parent" -> rest
        _               -> Cons(".parent",rroots)
      }
    }
    else {
      Cons(dir,rroots)
    }
  }).reverse.join("/")
}

val rxPathSep = regex(r"[\\/]")


pub fun tryCopyTextFileFromTo( fname, srcDir, outDir, required = False ) {
  tryCopyTextFile( combine(srcDir,fname), combine(outDir,fname), required)
}

pub fun tryCopyTextFile( fileName : string, outName : string, required = False ) : io bool {
  match(tryReadTextFile( fileName, required )) {
    Left -> False
    Right(txt) -> tryWriteTextFile(outName,txt)
  }
}



/*---------------------------------------------------------------------------
  File access
---------------------------------------------------------------------------*/

// Try to read a text file; return a default value in case of an error.
pub fun readTextFileDef( fileName : string, def : string, required : bool = False ) : io string {
  match (fileName.tryReadTextFile(required)) {
    Left(_exn) -> def
    Right(content) -> content
  }
}

// Try to a text file synchronously (using UTF8 encoding)
pub fun tryReadTextFile( fileName : string, required : bool = True ) : io either<exception,string>
{
  catch( { Right(readTextFileSync(fileName,required)) }, fn(exn) { Left(exn) })
}


// Search for a file along a list of directories
pub fun searchFileSync( dirs : list<string>, fname : string ) : io maybe<string> {
  val fnames = dirs.map(fn(dir){ combine(dir,fname) })
  fnames.foreachUntil fn(f) {
    if (f.fexistsSync) then Just(f) else Nothing
  }
}

// Read a text file synchronously (using UTF8 encoding) without sandbox restrictions
pub fun readTextFileNoSandbox( fileName : string ) : io string {
  xreadTextFileSync(fileName.normalize)
}

// Read a text file synchronously (using UTF8 encoding)
pub fun readTextFileSync( fileName : string, required : bool = True ) : io string
{
  val xfileName = checkSandbox(fileName)
  if (required) log("files",fileName);
  xreadTextFileSync(xfileName);
}

extern xreadTextFileSync( fileName : string ) : io string
{
  cs inline "System.IO.File.ReadAllText(#1,System.Text.Encoding.UTF8)"
  js inline "$readFileSync(#1,'utf-8')"
}

// Try to write a text file synchronously (using UTF8 encoding).
// Returns "True" if successful.
pub fun tryWriteTextFile( fileName : string, content : string )  : io bool
{
  catch( { writeTextFileSync(fileName,content); True }, fn(_exn) { False } )
}

// Write a text file synchronously (using UTF8 encoding)
pub fun writeTextFileSync( fileName : string, content : string ) : io () {
  val xfileName = checkSandbox(fileName)
  log("filesWrite", fileName);
  xwriteTextFileSync(xfileName, content);
}

extern xwriteTextFileSync( fileName : string, content : string )  : io () {
  cs inline "System.IO.File.WriteAllText(#1,#2,System.Text.Encoding.UTF8)"
  js inline "$writeFileSync(#1,'utf-8',#2)"
}

pub fun fexistsSync( fileName : string ) : io bool {
  catch( {
    val xfileName = checkSandbox(fileName)
    xfexistsSync(xfileName)
  }, fn(_) { False } )
}

extern xfexistsSync( fileName : string ) : io bool {
  cs inline "System.IO.File.Exists(#1)"
  js inline "$fexistsSync(#1)"
}
// \\ is not possible for some reason --> commented for now
pub extern relative( from : string, to : string ) : string {
  //cs inline r"Uri.UnescapeDataString(new Uri(#1 + ""\\"").MakeRelativeUri(new Uri(#2)).ToString());"
  js inline "$relative(#1,#2)"
}

pub extern cwd() : io string {
  cs inline "System.IO.Directory.GetCurrentDirectory()"
  js inline "$cwd()"
}

pub fun mkdirp( dir : string, mode : int = 0x1FF ) : io () {
  val xdir = checkSandbox(dir)
  xmkdirp(xdir,mode)
}

extern xmkdirp( dir : string, mode : int = 0x1FF ) : io () {
  cs inline "System.IO.Directory.CreateDirectory(#1)"
  js inline "$mkdirp(#1,#2)"
}

pub fun rename( fnameOld : string, fnameNew : string ) : io () {
  val xfnameOld = checkSandbox(fnameOld)
  val xfnameNew = checkSandbox(fnameNew)
  xrename(xfnameOld,xfnameNew)
}

extern xrename( fnameOld : string, fnameNew : string ) : io () {
  cs inline "System.IO.File.Move(#1,#2)"
  js inline "$renameSync(#1,#2)"
}

pub fun tryRename( fnameOld : string, fnameNew : string ) : io () {
  ignore( { rename(fnameOld,fnameNew) });
}


pub fun copyFile( fnameOld : string, fnameNew : string ) : io () {
  val xfnameOld = checkSandbox(fnameOld)
  val xfnameNew = checkSandbox(fnameNew)
  xcopyFile(xfnameOld,xfnameNew)
}

extern xcopyFile( fnameOld : string, fnameNew : string ) : io () {
  cs inline "System.IO.File.Copy(#1,#2,true)"
  js inline "$copySync(#1,#2)"
}

// In the browser, removes all files.
pub extern clear() : io () {
  cs inline ""
  js inline "$clear()"
}


// Try to read a binary file in base64; return a default value in case of an error.
pub fun readBase64FileDef( fileName : string, def : string, required : bool = False ) : io string {
  match (fileName.tryReadBase64File(required)) {
    Left(_exn) -> def
    Right(content) -> content
  }
}

// Try to a binary file synchronously (using base64 encoding)
pub fun tryReadBase64File( fileName : string, required : bool = True ) : io either<exception,string>
{
  catch( { Right(readBase64FileSync(fileName,required)) }, fn(exn) { Left(exn) })
}

// Read a binary file synchronously (using base64 encoding)
pub fun readBase64FileSync( fileName : string, required : bool = True ) : io string
{
  val xfileName = checkSandbox(fileName)
  if (required) log("files",fileName)
  xreadBase64FileSync(xfileName)
}

extern xreadBase64FileSync( fileName : string ) : io string
{
  cs inline "Convert.ToBase64String(System.IO.File.ReadAllBytes(#1))"
  js inline "$readFileSync(#1,'base64')"
}

// Try to write a binary file synchronously (using base64 encoding).
// Returns "True" if successful.
pub fun tryWriteBase64File( fileName : string, content : string )  : io bool
{
  catch( { writeBase64FileSync(fileName,content); True }, fn(_exn) { False } )
}

// Write a binary file synchronously (using base64 encoding)
pub fun writeBase64FileSync( fileName : string, content : string ) : io () {
  val xfileName = checkSandbox(fileName)
  log("filesWrite", fileName);
  xwriteBase64FileSync(xfileName, content);
}

extern xwriteBase64FileSync( fileName : string, content : string ) : io ()
{
  cs inline "System.IO.File.WriteAllBytes(#1,Convert.FromBase64String(#2))"
  js inline "$writeFileSync(#1,'base64',#2)"
}

// A binary buffer
abstract struct buffer( obj : any )

pub fun length( b : buffer ) : int {
  xlength(b.obj)
}

extern xlength( obj : any ) : int {
  cs inline "((byte[])(#1)).Length"
  js inline "#1.length"
}

pub fun toBase64( b : buffer ) : string {
  xtoBase64( b.obj )
}

extern xtoBase64( obj : any ) : string {
  cs inline "Convert.ToBase64String((byte[])(#1))"
  js inline "#1.toString('base64')"
}

pub fun readInt1( b : buffer, ofs : int ) : int {
  xreadInt1( b.obj, ofs )
}

extern xreadInt1( obj : any, ofs : int ) : int {
  cs inline "((byte[])(#1))[#2]"
  js inline "#1.readUInt8(#2)"
}

pub fun readInt4( b : buffer, ofs : int, bigendian : bool = True ) : int {
  xreadInt4( b.obj, ofs, bigendian )
}

extern xreadInt4( obj : any, ofs : int, bigendian : bool = True ) : int {
  cs inline "BitReader.readInt32( (byte[])(#1), #2, #3 )"
  js inline "(#3 ? #1.readInt32BE(#2) : #1.readInt32LE(#2))"
}

// try to ead a binary file into a buffer
pub fun tryReadFileSync( fileName : string ) : io maybe<buffer> {
  onExn( Nothing, { Just(readFileSync(fileName)) } )
}

// Read a binary file into a buffer
pub fun readFileSync( fileName: string ) : io buffer {
  val xfileName = checkSandbox( fileName )
  Buffer( xreadFileSync( xfileName ) )
}

extern xreadFileSync( fileName : string ) : io any
{
  cs inline "System.IO.File.ReadAllBytes(#1)"
  js inline "$readFileSync(#1,'buffer')"
}

// Delete a file
pub fun tryUnlinkSync( fname : string ) : io ()
{
  ignore( { fname.unlinkSync } )
}

pub fun unlinkSync( fileName : string ) : io () {
  val xfileName = checkSandbox(fileName)
  xunlinkSync( xfileName )
}

extern xunlinkSync( fileName : string ) : io ()
{
  cs inline "System.IO.File.Delete(#1)"
  js inline "$unlinkSync(#1)"
}
