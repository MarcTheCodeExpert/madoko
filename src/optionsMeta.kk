/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Options from metadata
module optionsMeta

import std/log
import std/path
import std/string
import common
import options

public function fromMeta( opts : options, mdata : metadata ) : options {
  mdata.foldl(opts) fun(options : options, kv : (string,string)) {
    val (key,xvalue) = kv
    options.update( key, xvalue, mdata )
  }
}

function update( options : options, key : string, xvalue : string, mdata : metadata ) : options {
  val lvalue = xvalue.toLower
  val value  = if (lvalue=="none" || lvalue=="clear" || lvalue=="false") then "" else xvalue
  val ivalue = value.parseInt.maybe(~1,id)
  val bvalue = (value!="" && value!="0")

  if   (key=="title")  options(title=value)
  elif (key=="prelude") options(prelude=value)
  elif (key=="package") options(packages=if (value=="") then "" else options.packages + ";" + value)
  elif (key=="package-")  options(packagesx=if (value=="") then "" else options.packagesx + ";" + value)
  elif (key=="toc-depth" && ivalue >= 0) options(tocDepth = ivalue)
  elif ((key=="heading-depth" || key=="header-depth") && ivalue >= 0) options(headingDepth = ivalue)
  elif ((key=="heading-base" || key=="header-base" || key=="base-header-level") && ivalue >= 0) options(headingBase = ivalue)
  elif (key=="document-class" || key=="doc-class") options(docClass=value)
  elif (key=="bib" || key=="bibliography" || key=="bib-data") {
    if (value!="") log("files", value.changeExt(".bib"))
    options(bib=if (value=="") then "" else options.bib + ";" + value);
  }
  elif (key=="tex-header") options(texHeader =if(value=="") then "" else options.texHeader.appendNL(value))
  elif (key=="tex-header-") options(texHeaderx =if(value=="") then "" else options.texHeaderx.appendNL(value))
  elif (key=="tex-doc-header") options(texDocHeader =if(value=="") then "" else options.texDocHeader.appendNL(value))
  elif (key=="tex-doc-header-") options(texDocHeaderx =if(value=="") then "" else options.texDocHeaderx.appendNL(value))
  elif (key=="tex-footer") options(texFooter =if(value=="") then "" else options.texFooter.appendNL(value))
  elif (key=="tex-section-num") options(texSectionNum=(value!=""))
  elif (key=="fragment-start" || key=="extract-start") options(extractStart=xvalue)
  elif (key=="fragment-end" || key=="extract-end") options(extractEnd=xvalue)
  elif (key=="cite-all") options(citeAll=(value!=""))
  elif (key=="embed" || key=="embed-limit") options(embedLimit=if (value=="") then 0 elif (value=="true") then 1024 else (ivalue*1024))
  elif (key=="section-depth") options(sectionMax=ivalue)
  elif (key=="section-base") options(sectionBase=ivalue)
  elif (key=="highlight" || key=="colorize") options(highlight=if (value=="") then False else True)
  elif (key=="highlight-language" || key=="colorizer") options(hilitelang=if (value=="") then "" else options.hilitelang + ";" + value)
  elif (key=="rebuild") options(rebuild=(value != ""))
  elif (key=="star-bold") options(starBold=(value!=""))
  elif (key=="line-no") options(lineNo=ivalue)
  elif (key=="line-no-web") options(lineNoWeb = (lvalue=="true"))
  elif (key=="pretty-align") options(prettyAlign=ivalue)
  elif (key=="refer") { log("filesRefer",value); options }
  elif (key=="copy-styles") options(copyStyles=(value!=""))
  else {
    options
  }
}


function appendNL(s : string, t : string ) : string {
  if (s == "" || s.endsWith("\n")) then s + t else s + "\n" + t
}


function appendValue( xs : list<string>, x : string, sep : string = "&br;" ) : list<string> {
  match(xs.reverse) {
    Nil -> [x]
    Cons(y,yy) -> if (y=="") then Cons(x,yy).reverse else Cons(y + sep + x,yy).reverse
  }
}
