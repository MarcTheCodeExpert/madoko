/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Common TeX entities

module texCommon

import compat/dict
import compat/regex
import compat
import common
import stringcompat

pub alias texRule = rule<string,<texContext>>


pub rec type texContextStruct {
  // The parse ctx for latex elements.
  TexContextStruct( grammar   : grammar<string,<texContext>>, 
              bststyle  : string,
              ignoreIt    : bool = True,
              name      : string = "",
              texparse  : (input:string) -> <texContext> string )
}

pub fun tParse(input: string): <texContext> string {
  (getTexContextStruct().texparse)(input)
}

pub effect texContext
  fun getTexContextStruct(): texContextStruct
  /*fun getTexGrammar(): grammar<string, <texContext>>
  fun getBstStyle(): string
  fun isIgnore(): bool
  fun getName(): string
  fun tParse(input: string): string
*/
/*
pub fun concreteTexContext(ctx: texContext, proc: () -> <texContext|e> a): e a {
  with handler 
    fun getTexContexte ctx
    fun getTexGrammar ctx.grammar
    fun getBstStyle ctx.bststyle
    fun isIgnore ctx.ignoreIt
    fun getName ctx.name
    fun tParse(txt) (ctx.texparse)(ctx, txt)
  proc()  
}
*/
pub val texAccents = [
  ("`","grave"),
  ("'","acute"),
  ("^","circ"),
  ("\"","uml"),
  ("~","tilde"),
  ("r","ring"),
  ("c","cedil"),
  ("v","caron"), 
  ("u","breve"),
  ("=","macron"),
  ("k","ogonek"),
  (".","dota"),
  ("d","dotb"), 
  ("H","huml"),
  ("b","barb"),
  ("r","ring"),
  ("t","tie"),
  ("G","dgrave"),
  ("H","dacute"),
].dict

fun texnest(s:string)  { r"(?:" + texval + r"|(?:\{" + s + r"\}))" }
val texcmd   = r"\\[@a-zA-Z]+\b\s*"
val texval   = r"(?:[^\\{}]|" + texcmd + r"|\\.\s*)"
val texarg0  = texval + "*"
val texarg1  = texnest(texarg0) + "*"
val texarg2  = texnest(texarg1) + "*"
val texarg3  = texnest(texarg2) + "*"

pub val texarg   = r"(" + texnest(texarg3) + r")"
pub val texargs  = r"(" + texnest(texarg3) + "*)"

pub val optarg   = r"(?:\[([^\]]*)\]\s*)"
pub val optargs  = optarg + r"*"

// captures most tex commands
pub val rxTexCmd = r"(?:\\(?:begin|end)\b\s*" + optargs + texarg + "|" + texcmd + optargs + ")"

pub val texlen  = r"\-?\d+(?:\.\d+)?(?:pt|mm|cm|in|ex|em|bp|pc|dd|cc|sp|fil{1,3})\b"
pub val texdim  = r"(" + texlen + r")\s*(?:plus\b\s*(" + texlen + r")\s*)?(?:minus\b\s*(" + texlen + r")\s*)?"
