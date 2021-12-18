/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Defines the context for _inline_ elements.
module inline

import std/dict
import std/string
import std/regex
import std/log
import common
import attributes  // rules
import codeAlign  // codeTable
import hilite  // hilitemode

public alias cells = list<list<(string,attrs)>>

/* --------------------------------------
 The context for inline elements
---------------------------------------- */
public rectype inlineContext {
  // The parse context for inline elements.
  // Contains a dictionary of all define "links", and the current "grammar".
  // If "sanitize" is "True", all (user) html is supressed or escaped.
  InlineContext( grammar    : grammar<string,inlineContext>,
                 links      : dict<link>,
                 labels     : dict<label>,
                 footnotes  : dict<footnote>,
                 defaults   : rules,

                 /* all of the following never change! */
                 metadata   : dict<string>,
                 embedinfos : dict<embedinfo>,
                 verbose    : int,
                 highlight  : bool,
                 starBold   : bool,
                 prettyAlign : int
               )
}

public rectype footnote {
  Footnote( footnoteNum : string,
            footnoteContent : (inlineContext) -> string,
            footnoteCaption : string  )
}

// Copy an ":inlineContext"
public function copy( self : inlineContext,
                      grammar : grammar<string,inlineContext> = self.grammar,
                      links : dict<link> = self.links,
                      labels : dict<label> = self.labels,
                      footnotes : dict<footnote> = self.footnotes,
                      defaults: rules = self.defaults) : inlineContext
{
  InlineContext( grammar, links, labels, footnotes, defaults,

                 self.metadata, self.embedinfos,
                 self.verbose, self.highlight, self.starBold, self.prettyAlign)
}


/* --------------------------------------
  Parse inline text elements
---------------------------------------- */

public function logDataLine( attrs ) : () {
  match(attrs.hasKey("data-line")) {
    Nothing     -> ()
    Just(line)  -> logLocation(line)
  }
}

// Parse _inline_ markdown elements and return formatted html
public function formatInline( context : inlineContext, txt : string, attrs : attrs = attrsNone ) : string
{
  formatInlineAcc(context,builder(), txt)
}

public function parseLineInfo( lineInfo : string ) : (string,int) {
  match (lineInfo.find(rxDataLine)) {
    Nothing   -> ("",0)
    Just(cap) -> (cap.groups[1],cap.groups[2].parseIntDefault(0))
  }
}
val rxDataLine = regex( @"^(.*:)?(\d+)$")

function formatInlineAcc( context : inlineContext, acc : builder<h>, txt : string) : st<h> string
{
  if (txt=="") return acc.build
  val (s,next,_) = matchRules(context.grammar,context,txt,id)
  formatInlineAcc(context, acc.append(s), txt.substr1(next))
}



function mathPreX( txt : string ) : string
{
  val ignorearg = @"(?:mbox|begin|end|(?:text|math|varmath)(?:kw|id|rm|sf|tt|up|it|sl|sc|bf|md|lf|normal|bb|cal|scr|bbm|bbmss|bbmtt|ds|frak|swab|goth)?)"
  txt.replaceAll(regex(@"(\\" + ignorearg + @"{(?:[^\\}]|\\.)*}|\\[a-zA-Z@]+ *|\\[^a-z@])|^( +)|( +)|(\n)",multiline=True), fun(cap) {
        val n = cap.matched.length
        if (cap.groups.matchedOn(2)) then @"\mdmathindent{" + n.show + "}"
        elif (cap.groups.matchedOn(3)) then string(n,'~') // @"\mdMathspace{" + cap.matched.length.show + "}"
        elif (cap.groups.matchedOn(4)) then "\\\\\n" // \\mdMathbr{}\n"
        else cap.matched
      })
     .replaceAll(regex(@"(\\" + ignorearg + @"{(?:[^\\}]|\\.)*}|\\[a-z@]+(?![a-z@]))|#([a-z][a-z\d]*(?![a-z\d]))|([a-z][a-z\d]*(?![a-z\d]))|@([a-z][a-z\d]*(?![a-z\d]))", ignoreCase=True), fun(cap) {
        val grp = cap.groups.firstMatchedOn
        if (grp==2) then cap.groups[2]
        elif (grp < 2) then cap.matched
        else {
          val cmd = if (cap.groups.matchedOn(4)) then "mathkw" else "mathid"
          val captxt = cap.groups[grp]
          val (stem,digits) = match(captxt.find(regex(@"^([^\d]*(?:\d+[^\d]+)*)(\d*)$"))) {
                                Just(ccap) -> (ccap.groups[1],ccap.groups[2])
                                Nothing    -> (captxt,"")
                              }
          "\\" + cmd + "{" + stem + "}" + (if (digits=="") then "" else "_{" + digits + "}")
        }
      })
}

public function mathPre( txt : string ) : string {
  "\\mathpre{" + txt.mathPreX + "}"
}

public function mathPreBlock( txt : string) : string
{
  val pre = mathPreX(txt)
  "\\begin{mdmathpre}%mdk\n" + pre + "\n\\end{mdmathpre}%mdk\n"
}
