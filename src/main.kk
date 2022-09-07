/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Main Madoko command line interface
module main

import std/path
import std/regex
import common
import options
import storage
import driver
import version

public function main() : io () {
  markdownFiles("") fun(out,inName,outName,opts) { () }
}

public function markdownFiles(args : string, action : (string,string,string,options) -> io ()) : io () {
  match (parseOptions(version, args)) {
    Nothing -> ()
    Just(opts) -> {
      if (opts.outputDir != "" && !(fexistsSync(opts.outputDir))) {
        mkdirp(opts.outputDir)
      }

      opts.inputs.foreach fun(input0) {
        val inName  = if (input0.extname=="") then input0 + ".mdk" else input0
        val outName = outputName(inName, opts)
        if (opts.options.verbose > 0) println("process: " + inName + " -> " + outName )
        match (inName.tryReadTextFile()) {
          Left -> println("error: unable to read: " + inName )
          Right(content) -> {
            val (out, processedOpts) = processContent(inName, outName, content, opts, True);
            action(out, inName, outName, processedOpts)
          }
        }
      }
    }
  }
}
