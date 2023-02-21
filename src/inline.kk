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


pub effect inlineGrammar
  fun getGrammar(): grammar<string, <inlineGrammar, inlineLinks, inlineLabels, inlineFoot, inlineDefaults, inlineMetaData, inlineEmbededInfo, inlineSanitize, inlineBench, inlineVerbose, inlineHighlight, inlineStarbold, inlineSandbox, inlinePrettyAlign, inlineFunctions>>//<inlineGrammar, inlineLinks, inlineLabels, inlineFoot, inlineDefaults, inlineMetaData, inlineEmbededInfo, inlineSanitize, inlineBench, inlineVerbose, inlineHighlight, inlineStarbold, inlineSandbox, inlinePrettyAlign, inlineFunctions>> //,inlineContext

pub effect inlineLinks  
  fun getLinks(): dict<link>
  fun setLinks(links: dict<link>): ()

pub effect inlineLabels
  fun getLabels(): dict<label>
  fun setLabels(labels: dict<label>): ()

pub effect inlineFoot
  fun getFootnotes(): dict<footnote>
  fun setFootnotes(footn: dict<footnote>): ()

pub effect inlineDefaults
  fun getDefaults()   : rules
  fun setDefaults(defaults: rules): ()

pub effect inlineMetaData
  fun getInlineMetadata()   : dict<string>

pub effect inlineEmbededInfo
  fun getEmbedinfos() : dict<embedinfo>

pub effect inlineSanitize
  fun isSanitize(): bool

pub effect inlineBench
  fun isBench(): bool

pub effect inlineVerbose
  fun getVerbose(): int

pub effect inlineHighlight
  fun isHighlight(): bool

pub effect inlineStarbold  
  fun isStarBold(): bool

pub effect inlineSandbox  
  fun isSandbox(): bool

pub effect inlinePrettyAlign  
  fun getPrettyAlign(): int

pub effect inlineFunctions  
  fun exfmtCmd(cmd:string,body:string,attrs:attrs): string
  fun exfmtText(txt: string): string
  fun exfmtEscape(body:string) : string
  fun exfmtEscapePre(body: string): string
  fun exfmtLink(isImage : bool, link : link, content : string ): string
  fun exfmtFootnote(id : string, ftn : footnote): string
  fun exfmtTable(head : list<row>, body : list<row>, colattrs: list<attrs>, attrs : attrs ): string
  fun exfmtEnv( env : string, txt : string, attrs : attrs ) : string
  fun exfmtCodePlain(txt : string, startline : bool ): string             // xfmtCodeHilite : (ctx : inlineContext, txt : string, startLine: bool ) -> (string),
  fun exfmtCodeToken(classes: list<string>, txt : string, lang : string, attrs : attrs) : string
  fun exfmtLineInfo(lineInfo : string ) : string
  fun exfmtCodeTable(ct : codeTable, attrs : attrs) : string
  fun exfmtMathCmd(cmd:string,body:string,attrs:attrs) : string
  fun exfmtMathEnv( env : string, txt : string, attrs : attrs ) : string
  fun efmt() : formatter  

pub alias inlineContext =  <inlineGrammar, inlineLinks, inlineLabels, inlineFoot, inlineDefaults, inlineMetaData, inlineEmbededInfo, inlineSanitize, inlineBench, inlineVerbose, inlineHighlight, inlineStarbold, inlineSandbox, inlinePrettyAlign, inlineFunctions> 

pub effect tocBlock
  fun getTocBlocks(): dict<list<block>>
  fun setTocBlocks(tocBlock: dict<list<block>>): ()

pub effect footnoteBlock  
  fun getFootNoteBlock(): block
  fun setFootnoteBlock(fnBlock: block): ()

pub effect languagePrefix  
  fun getLangPrefix(): string

pub effect headingBase
  fun getHeadingBase(): int

pub effect blockPedantic  
  fun isPedantic(): bool

pub effect fblockLineMap  
  fun getLineMap(): lineMap

pub effect blockFormatter  
  fun getFormatter(): formatter

pub alias formatContext = <tocBlock, footnoteBlock, languagePrefix, headingBase, blockPedantic, fblockLineMap, blockFormatter>

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
            footnoteContent : () -> <formatContext , inlineGrammar, inlineLinks, inlineLabels, inlineFoot, inlineDefaults, inlineMetaData, inlineEmbededInfo, inlineSanitize, inlineBench, inlineVerbose, inlineHighlight, inlineStarbold, inlineSandbox, inlinePrettyAlign, inlineFunctions> string,
            footnoteCaption : string  )
}

pub fun sanitize() : <inlineContext> bool {
  isSanitize()
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

fun formatInlineAcc(acc : string , txt : string) : <inlineContext> string
{
  if (txt=="") then return acc
  val (s,next,_) = matchRules(getGrammar(), txt, id)
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
