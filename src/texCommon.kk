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


pub effect texContext
  //fun getTexContexte(): texContext
  fun getTexGrammar(): grammar<string, <texContext>>
  fun getBstStyle(): string
  fun isIgnore(): bool
  fun getName(): string
  fun tParse(input: string): string

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
