/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Defines the ctx for _inline_ elements.
module inline

import compat/dict
import compat/string
import compat/regex

import common
import attributes  // rules
import codeAlign  // codeTable
import hilite  // hilitemode

import compat
import block
import stringcompat

pub alias cells = list<list<(string,attrs)>>

/* --------------------------------------
 The ctx for inline elements
---------------------------------------- */

pub struct formatContextStruct(
  tocBlocks   : dict<list<block>>,
  footnoteBlock : block,
  headingBase: int,
  langPrefix : string,
  pedantic : bool,
  lineMap : lineMap,
  fmt : formatter = FmtHtml
)

pub effect inlineContext
  fun getInlineContext(): inlineContextStruct
  fun setLinks(links: dict<link>): ()
  fun setLabels(labels: dict<label>): ()
  fun setFootnotes(footn: dict<footnote>): ()
  fun setDefaults(defaults: rules): ()

pub effect formatContext
  fun getFormatContext(): formatContextStruct
  fun setTocBlocks(tocBlock: dict<list<block>>): ()
  fun setFootnoteBlock(fnBlock: block): ()


pub rec type inlineContextStruct {
  // The parse ctx for inline elements.
  // Contains a dictionary of all define "links", and the current "grammar".
  // If "sanitize" is "True", all (user) html is supressed or escaped.
  InlineContextStruct( grammar    : grammar<string,<inlineContext>>,
                 links      : dict<link>,
                 labels     : dict<label>,
                 footnotes  : dict<footnote>,
                 defaults   : rules,
                 metadata   : dict<string>,
                 embedinfos : dict<embedinfo>,
                 xsanitize  : bool,
                 bench      : bool,
                 verbose    : int,
                 highlight  : bool,
                 starBold   : bool,
                 sandbox    : bool,
                 prettyAlign : int,

                 xfmtCmd : (cmd:string,body:string,attrs:attrs) -> string,
                 xfmtEscape : (body:string,allowEntity:bool) -> string,
                 xfmtLink: (isImage : bool, link : link, content : string, sandbox: bool ) -> string,
                 xfmtFootnote: (id : string, ftn : footnote ) -> string,
                 xfmtTable: (head : list<row>, body : list<row>, colattrs: list<attrs>, attrs : attrs ) -> string,
                 xfmtEnv : (env : string, txt : string, attrs : attrs ) -> string,
                 xfmtCodePlain : (txt : string, startline : bool ) -> string,
                 // xfmtCodeHilite : (txt : string, startLine: bool ) -> (string),
                 xfmtCodeToken : (classes: list<string>, txt : string, lang : string, attrs : attrs) -> string,
                 xfmtLineInfo : (lineInfo : string ) -> string,
                 xfmtCodeTable : (ct : codeTable, attrs : attrs ) -> string,
                 xfmtMathCmd : (cmd:string,body:string,attrs:attrs) -> string,
                 xfmtMathEnv : (env : string, txt : string, attrs : attrs ) -> string,
                 efmt : formatter
               )
}

pub struct titleinfo (
  title : string,
  subtitle : string,
  authors : list<authorinfo>,
  note : string
)

pub struct authorinfo (
  name : string,
  address : string,
  email : string,
  note : string
)

pub rec type footnote {
  Footnote( footnoteNum : string,
            footnoteContent : () -> <formatContext, inlineContext> string,
            footnoteCaption : string  )
}

pub fun sanitize() : <inlineContext> bool {
  getInlineContext().xsanitize
}

pub fun fmtCmd(cmd : string, txt : string, attrs : attrs = attrsNone ) : <inlineContext> string {
  (getInlineContext().xfmtCmd)(cmd,txt,attrs)
}

pub fun fmtEnv(env : string, txt : string, attrs : attrs = attrsNone ) : <inlineContext> string {
  (getInlineContext().xfmtEnv)(env,txt,attrs)
}

pub fun fmtMathCmd(cmd : string, txt : string, attrs : attrs = attrsNone ) : <inlineContext> string {
  (getInlineContext().xfmtMathCmd)(cmd,txt,attrs)
}

pub fun fmtMathEnv(env : string, txt : string, attrs : attrs = attrsNone ) : <inlineContext> string {
  (getInlineContext().xfmtMathEnv)(env,txt,attrs)
}

pub fun fmtCodePlain(txt : string, startline : bool = True ) : <inlineContext> string {
  (getInlineContext().xfmtCodePlain)(txt,startline)
}

pub fun fmtCodeToken( classes : list<string>, txt : string, lang : string, attrs : attrs ) : <inlineContext> string {
  (getInlineContext().xfmtCodeToken)(classes,txt,lang,attrs)
}

pub fun fmtEscapePre(txt : string ) : <inlineContext> string {
  (getInlineContext().xfmtEscape)(txt,False)
}

pub fun fmtEscape(txt : string ) : <inlineContext> string {
  (getInlineContext().xfmtEscape)(txt,True)
}

pub fun fmtText(txt : string ) : <inlineContext> string {
  (getInlineContext().xfmtCmd)("",txt,attrsNone)
}

pub fun fmtLink(isImage : bool, link : link, content : string, sandbox: bool) : <inlineContext> string {
  (getInlineContext().xfmtLink)(isImage,link,content, sandbox)
}

pub fun fmtFootnote(id : string, ftn : footnote ) : <inlineContext> string {
  (getInlineContext().xfmtFootnote)(id,ftn)
}

pub fun fmtLineInfo(lineInfo : string ) : <inlineContext> string {
  (getInlineContext().xfmtLineInfo)(lineInfo)
}

pub fun fmtCodeTable(ct : codeTable, attrs : attrs = attrsNone ) : <inlineContext> string {
  (getInlineContext().xfmtCodeTable)(ct,attrs)
}

pub fun fmtTable( head : list<row>, body : list<row>, colattrs : list<attrs>, attrs : attrs = attrsNone ) : <inlineContext> string {
  (getInlineContext().xfmtTable)(head,body,colattrs,attrs)
}


/* --------------------------------------
  Parse inline text elements
---------------------------------------- */

pub fun logDataLine( attrs ) : () {
  match(attrs.hasKey("data-line")) {
    Nothing     -> ()
    Just(line)  -> logLocation(line)
  }
}

// Parse _inline_ markdown elements and return formatted html
// removed ctx: inlineContext
pub fun formatInline( txt : string, attrs : attrs = attrsNone ) : <inlineContext> string
{
    formatInlineAcc("", txt)
}

// changed acc: builder<h> to simple string addition since there is no builder in current koka anymore
/*
  fun formatInlineAcc(acc : builder<h> , txt : string) : <inlineContext> string
{
  if (txt=="") then return acc.build
  val (s,next,_) = matchRules(getGrammar(), txt, id)
  formatInlineAcc(acc.append(s), unsafe-decreasing(txt.substr1(next)))
}
*/
fun formatInlineAcc(acc : string , txt : string) : <inlineContext> string
{
  if (txt=="") then return acc
  val (s,next,_) = matchRules(getInlineContext().grammar, txt, id)
  formatInlineAcc(acc ++ s, unsafe-decreasing(txt.substr1(next)))
}

pub fun parseLineInfo( lineInfo : string ) : (string,int) {
  match (lineInfo.find(rxDataLine)) {
    Nothing   -> ("",0)
    Just(cap) -> (cap.groups[1],cap.groups[2].parseIntDefault(0))
  }
}
val rxDataLine = regex( r"^(.*:)?(\d+)$")




pub fun mathPreX( txt : string ) : string
{
  val ignorearg = r"(?:mbox|begin|end|(?:text|math|varmath)(?:kw|id|rm|sf|tt|up|it|sl|sc|bf|md|lf|normal|bb|cal|scr|bbm|bbmss|bbmtt|ds|frak|swab|goth)?)"
  txt.replaceAll(regex(r"(\\" + ignorearg + r"{(?:[^\\}]|\\.)*}|\\[a-zA-Z@]+ *|\\[^a-z@])|^( +)|( +)|(\n)",multiline=True), fn(cap) {
        val n = cap.matched.length
        if (cap.groups.matchedOn(2)) then r"\mdmathindent{" + n.show + "}"
        elif (cap.groups.matchedOn(3)) then string(n,'~') // @"\mdMathspace{" + cap.matched.length.show + "}"
        elif (cap.groups.matchedOn(4)) then "\\\\\n" // \\mdMathbr{}\n"
        else cap.matched
      })
     .replaceAll(regex(r"(\\" + ignorearg + r"{(?:[^\\}]|\\.)*}|\\[a-z@]+(?![a-z@]))|#([a-z][a-z\d]*(?![a-z\d]))|([a-z][a-z\d]*(?![a-z\d]))|@([a-z][a-z\d]*(?![a-z\d]))", ignoreCase=True), fn(cap) {
        val grp = cap.groups.firstMatchedOn
        if (grp==2) then cap.groups[2]
        elif (grp < 2) then cap.matched
        else {
          val cmd = if (cap.groups.matchedOn(4)) then "mathkw" else "mathid"
          val captxt = cap.groups[grp]
          val (stem,digits) = match(captxt.find(regex(r"^([^\d]*(?:\d+[^\d]+)*)(\d*)$"))) {
                                Just(ccap) -> (ccap.groups[1],ccap.groups[2])
                                Nothing    -> (captxt,"")
                              }
          "\\" + cmd + "{" + stem + "}" + (if (digits=="") then "" else "_{" + digits + "}")
        }
      })
}

pub fun mathPre( txt : string ) : string {
  "\\mathpre{" + txt.mathPreX + "}"
}

pub fun mathPreBlock( txt : string) : string
{
  val pre = mathPreX(txt)
  "\\begin{mdmathpre}%mdk\n" + pre + "\n\\end{mdmathpre}%mdk\n"
}
