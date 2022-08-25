/*---------------------------------------------------------------------------
  Copyright 2012 Microsoft Corporation.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/


/*
Access to the program environment and commmand line arguments.

Print the environment: "env.list.map(fun(p) { p.fst + ""="" + p.snd }).join(""\n"").print"

Note: we view the environment and command line as (total) constants in the
program. i.e. as if the program is only compiled at the point when both the 
environment and command line is supplied. 
*/
module compat/env

import compat/path
import compat/dict

extern getEnvironment() : dict<string>  {
  cs inline "Primitive.DictFromStringCollection(System.Environment.GetEnvironmentVariables())"
  js inline "(typeof process !== 'undefined' ? process.env : {})"
}

// The environment variables for this program
pub val env : dict<string>  = getEnvironment()

// Returns the value of an environment variable "name".
// Returns "default" (= |""|) if the environment variable was not present.
pub fun getEnv( name : string, default : string = "" ) : string
{
  match(env[name]) {
    Nothing -> default
    Just(s) -> s
  }
}

extern getArgv() : vector<string>  {
  cs "System.Environment.GetCommandLineArgs"
  js inline "(typeof process !== 'undefined' ? process.argv : [])"
}

// The unprocessed command line that was used to start this program.
// On ''Node'' the first arguments will often be of the form "[""node"",""interactive.js"",...]".
pub val argv = getArgv().list


// Return the arguments that were passed to program itself.
// Strips off the initial program from the unprocessed command line.
// i.e. If a program started as:
//     > node myprogram.js --flag bla
// The "arguments" list will be "[""--flag"",""bla""]"
pub val arguments 
  = match(argv) {
      Cons(x,xs) | x.stemname == "node" -> xs.drop(1)
      _ -> argv.drop(1)
    }  