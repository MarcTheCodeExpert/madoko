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

pub alias cells = list<list<(string,attrs)>>

/* --------------------------------------
 The ctx for inline elements
---------------------------------------- */
pub rec type inlineContext {
  // The parse ctx for inline elements.
  // Contains a dictionary of all define "links", and the current "grammar".
  // If "sanitize" is "True", all (user) html is supressed or escaped.
  InlineContext( grammar    : grammar<string,inlineContext>,
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

                 xfmtCmd : (ctx:inlineContext,cmd:string,body:string,attrs:attrs) -> string,
                 xfmtEscape : (ctx:inlineContext,body:string,allowEntity:bool) -> string,
                 xfmtLink: (ctx:inlineContext,isImage : bool, link : link, content : string ) -> string,
                 xfmtFootnote: (ctx : inlineContext, id : string, ftn : footnote ) -> string,
                 xfmtTable: (ctx : inlineContext, head : list<row>, body : list<row>, colattrs: list<attrs>, attrs : attrs ) -> string,
                 xfmtEnv : (ctx : inlineContext, env : string, txt : string, attrs : attrs ) -> string,
                 xfmtCodePlain : (ctx : inlineContext, txt : string, startline : bool ) -> string,
                 // xfmtCodeHilite : (ctx : inlineContext, txt : string, startLine: bool ) -> (string),
                 xfmtCodeToken : (ctx : inlineContext, classes: list<string>, txt : string, lang : string, attrs : attrs) -> string,
                 xfmtLineInfo : (ctx : inlineContext, lineInfo : string ) -> string,
                 xfmtCodeTable : (ctx : inlineContext, ct : codeTable, attrs : attrs ) -> string,
                 xfmtMathCmd : (ctx:inlineContext,cmd:string,body:string,attrs:attrs) -> string,
                 xfmtMathEnv : (ctx : inlineContext, env : string, txt : string, attrs : attrs ) -> string,
                 fmt : formatter
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
            footnoteContent : (inlineContext) -> string,
            footnoteCaption : string  )
}

pub fun fmtCmd( ctx : inlineContext, cmd : string, txt : string, attrs : attrs = attrsNone ) : string {
  (ctx.xfmtCmd)(ctx,cmd,txt,attrs)
}

pub fun fmtEnv( ctx : inlineContext, env : string, txt : string, attrs : attrs = attrsNone ) : string {
  (ctx.xfmtEnv)(ctx,env,txt,attrs)
}

pub fun fmtMathCmd( ctx : inlineContext, cmd : string, txt : string, attrs : attrs = attrsNone ) : string {
  (ctx.xfmtMathCmd)(ctx,cmd,txt,attrs)
}

pub fun fmtMathEnv( ctx : inlineContext, env : string, txt : string, attrs : attrs = attrsNone ) : string {
  (ctx.xfmtMathEnv)(ctx,env,txt,attrs)
}

pub fun fmtCodePlain( ctx : inlineContext, txt : string, startline : bool = True ) : string {
  (ctx.xfmtCodePlain)(ctx,txt,startline)
}

pub fun fmtCodeToken( ctx: inlineContext, classes : list<string>, txt : string, lang : string, attrs : attrs ) : string {
  (ctx.xfmtCodeToken)(ctx,classes,txt,lang,attrs)
}

pub fun fmtEscapePre( ctx : inlineContext, txt : string ) : string {
  (ctx.xfmtEscape)(ctx,txt,False)
}

pub fun fmtEscape( ctx : inlineContext, txt : string ) : string {
  (ctx.xfmtEscape)(ctx,txt,True)
}

pub fun fmtText( ctx : inlineContext, txt : string ) : string {
  (ctx.xfmtCmd)(ctx,"",txt,attrsNone)
}

pub fun fmtLink( ctx : inlineContext, isImage : bool, link : link, content : string) : string {
  (ctx.xfmtLink)(ctx,isImage,link,content)
}

pub fun fmtFootnote(ctx : inlineContext, id : string, ftn : footnote ) : string {
  (ctx.xfmtFootnote)(ctx,id,ftn)
}

pub fun fmtLineInfo(ctx : inlineContext, lineInfo : string ) : string {
  (ctx.xfmtLineInfo)(ctx,lineInfo)
}

pub fun fmtCodeTable(ctx : inlineContext, ct : codeTable, attrs : attrs = attrsNone ) : string {
  (ctx.xfmtCodeTable)(ctx,ct,attrs)
}

// Copy an ":inlineContext"
pub fun copy( self : inlineContext,
                       grammar : grammar<string,inlineContext> = self.grammar,
                       links : dict<link> = self.links,
                       labels : dict<label> = self.labels,
                       footnotes : dict<footnote> = self.footnotes,
                       defaults: rules = self.defaults,
                       metadata: dict<string> = self.metadata,
                       embedinfos : dict<embedinfo> = self.embedinfos,
                       sanitize : bool = self.sanitize,
                       bench : bool = self.bench,
                       verbose : int = self.verbose,
                       highlight : bool = self.highlight,
                       starBold : bool = self.starBold,
                       sandbox: bool = self.sandbox,
                       prettyAlign : int = self.prettyAlign,
                       xfmtCmd = self.xfmtCmd,
                       xfmtEscape = self.xfmtEscape,
                       xfmtLink = self.xfmtLink,
                       xfmtFootnote = self.xfmtFootnote,
                       xfmtTable = self.xfmtTable,
                       xfmtEnv = self.xfmtEnv,
                       xfmtCodePlain = self.xfmtCodePlain,
                       //xfmtCodeHilite = self.xfmtCodeHilite,
                       xfmtCodeToken = self.xfmtCodeToken,
                       xfmtLineInfo = self.xfmtLineInfo,
                       xfmtCodeTable = self.xfmtCodeTable,
                       xfmtMathCmd = self.xfmtMathCmd,
                       xfmtMathEnv = self.xfmtMathEnv,
                       fmt : formatter = self.fmt  ) : inlineContext
{
  InlineContext( grammar,links,labels,footnotes,defaults,metadata,embedinfos,
                 sanitize,bench,verbose,highlight,starBold,sandbox,prettyAlign,
                 xfmtCmd,xfmtEscape,xfmtLink,xfmtFootnote,xfmtTable,
                 xfmtEnv, xfmtCodePlain, /* xfmtCodeHilite, */
                 xfmtCodeToken, xfmtLineInfo, xfmtCodeTable,
                 xfmtMathCmd, xfmtMathEnv,
                 fmt )
}

pub fun sanitize( ctx : inlineContext ) : bool {
  ctx.xsanitize
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
pub fun formatInline( ctx : inlineContext, txt : string, attrs : attrs = attrsNone ) : <div> string
{
  formatInlineAcc(ctx,builder(), txt)
}

pub fun parseLineInfo( lineInfo : string ) : (string,int) {
  match (lineInfo.find(rxDataLine)) {
    Nothing   -> ("",0)
    Just(cap) -> (cap.groups[1],cap.groups[2].parseIntDefault(0))
  }
}
val rxDataLine = regex( r"^(.*:)?(\d+)$")

// changed effect st<_h> --> <div,alloc<_h>, read<_h>,write<_h>|e>
fun formatInlineAcc( ctx : inlineContext, acc : builder<h>, txt : string) : <div,st<h>> string
{
  unsafe-total (fn() {
    if (txt=="") return acc.build
    val (s,next,_) = matchRules(ctx.grammar,ctx,txt,id)
    formatInlineAcc(ctx, acc.append(s), txt.substr1(next))
    }
  )
}



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
