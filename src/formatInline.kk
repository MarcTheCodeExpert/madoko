/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// The parsing and formatting of _inline_ elements (i.e. emphasis, links, etc.)
module formatInline


import std/os/path  // extname
import common
import attributes
import inline
import latexFormatter
import entity
import hilite // inlineMode
import codeAlign

import compat
import compat/dict
import compat/regex
import compat/string
import compat/log


/* --------------------------------------
  Inline grammar
---------------------------------------- */
alias inlineRule = rule<string,inlineContext>

val normal       = r#"(?:[^`*_\\~&<>\^#\$""'\[!\-\. \+@]| (?! \n| *[\[\-\+!@])|-(?![@\-])|\+(?!@)|\.(?!\.\.)|!(?![@\[]))"#
val normalbench  = r#"(?:[^""'`*_\\~&<>\^#\$\[!]| (?! \n))"#

//val attrs    = @"\{:?((?:[^\}\n]|\\\})*)\}"
val attrs      = r#"\{:?((?:[^\\'""\}\n]|\\[.\n]|'[^']*'|""[^""]*"")*)\}"#  // allow optional colon for maraku compat

val linkhref = r#"\s*<?([^\s>)]*)>?(?:\s+['""](.*?)['""])?\s*"#
val xlinkid   = r"((?:[^\[\]\n]|\[[^\]\n]*\])*)"
val linktxt  = r"\[(?!\^)((?:\[(?:[^\[\]]|\[(?:[^\[\]]|\[[^\]]*\])*\])*\]|\\.|[^\\\]]|\](?=[^\[{]*\]))*)\]"
val linkreg  = linktxt + r"((?:\(" + linkhref + r"\)|\s*\[" + xlinkid + r"\])?(?:" + attrs + r")?)"

pub val rxLink = regex(linkreg)

fun inlineCoreGrammar( fmt : formatter ) : <div> grammar<string,inlineContext> {
  val inGrammer = [
  Rule("itext",     regex(r"^" + normal + "+"), inlineNormal ),

  Rule("iquotes",   regex(r#"^(?:'(?!\s|s\b|re\b)((?:[^\\'`\$\[<]|\\.|'[a-zA-Z])*)'(?![a-zA-Z])|""((?:[^\\""`\$\[<]|\\.)*)"")"#), inlineQuotes ),
  Rule("icode",     regex(r"^(`+)((?:[^`]|(?!\1)`)*)\1(?:" + attrs + ")?"), inlineCode ),
  Rule("ilink",     regex(r"^([\n ]*)" + linkreg), inlineLink ),
  Rule("iemph*",    regex(r"^(\*)((?:[^\\*]|\\.)+)\*"), inlineEmph),

  Rule("iimg",      regex(r"^()!" + linkreg), inlineImg ),
  Rule("ifootnote", regex(r"^\[\^" + xlinkid + r"\]"), inlineFootnote ),
  Rule("iguil",     regex(r"^<<((?:[^\\>]|>(?!>)|\\.)*)>>"), inlineQuotes ),
  Rule("iautolink", regex(r"^<([^/\s>][^\s>]*?(@|:/)[^\s>]+?)>(?:" + attrs + ")?"), inlineAutoLink ),
  Rule("istrong_",  regex(r"^(__)((?:[^\\]|\\.)+?)__(?!_)"), inlineStrong),
  Rule("istrong*",  regex(r"^(\*\*)((?:[^\\]|\\.)+?)\*\*(?!\*)"), inlineStrong),
  Rule("iemph_",    regex(r"^\b(_)((?:[^\\_]|\\.)+)_\b"), inlineEmph),
  Rule("idel",      regex(r"^~~(?=\S)([\s\S]*?\S)~~"), inlineDel ),
  Rule("isub",      regex(r"^~((?:[^~\\\n\r]|\\.)+)~"), inlineSub ),
  Rule("isup",      regex(r"^\^((?:[^\^\\\n\r]|\\.)+)\^"), inlineSup ),
  Rule("itagcode",  regex(r#"^(<code\b(?:""[^""]*""|'[^']*'|[^'"">])*?>)([\s\S]*?)(</code>)"#), inlineTagCode ),
  Rule("itag",      regex(r#"^<(?:!--[\s\S]*?-->|/?\w+\b(?:""[^""]*""|'[^']*'|[^'"">])*?>)"#), inlineTag ),
  Rule("ientity",   regex(r"^&(#?[\w\-:]*);"), inlineEntity ),
  //Rule("ilabel",    regex(r"^(#[a-zA-Z][\w\-:]*);?"), inlineLabel ),

  Rule("idashes",   regex(r"^--(-)?"), inlineDashes ),
  Rule("ielipsis",  regex(r"^\.\.\."), inlineDots ),

  Rule("texinline", regex(r"^\$(?!\$)((?:[^\\\$]|\\[\s\S])+)\$(?:" + attrs + ")?"), inlineMath ),
  Rule("texblock1", regex(r"^\$\$( *\n(?:[^\\\$]|\\[\s\S]|\$[^\$])*)\$\$"), inlineMathBlock ),
  Rule("texblock2", regex(r"^\\\[( *\n(?:[^\\]|\\[^\]])*)\\\]"), inlineMathBlock ),

  Rule("textcite",  regex(r"^([\n ]*)(([\-+!]?)@" + rxCitename + ")"), inlineCite ),

  Rule("ibr",       regex(r"^  \n(?!\s*$)"), inlineBreak ),
  Rule("iescape",   regex(r"^\\([^a-zA-Z0-9])"), inlineEscape ),

  Rule("other",     regex(r"^[\s\S]"), inlineOther )]
  inGrammer
}

fun benchGrammar(): <div> grammar<string,inlineContext> {
  inlineCoreGrammar(FmtHtml).stripFancyRules
}


fun stripFancyRules( g : grammar<string,inlineContext> ) : <div> grammar<string,inlineContext> {
  g.ruleReplace(True, Rule("itext", regex("^" + normalbench + "+"), inlineNormal ))
   .ruleReplace(True, Rule("iquotes", regex(r#"^[""']"#), inlineQuot ))
   .ruleRemove(True,["idashes","ielipsis","tex","iguil","textcite"])
}

pub fun inlineGrammar( fmt : formatter, bench : bool = False ) {
  if (bench) then benchGrammar() else inlineCoreGrammar(fmt)
}


/* --------------------------------------
 Inline grammar funs
---------------------------------------- */

fun inlineBreak( cap : matched, ctx ) {
  ctx.fmtCmd("br","")
}

fun inlineEntity( cap : matched, ctx : inlineContext ) : <div> string {
  val key = cap.groups[1]
  if (key.startsWith("#")) // character code
   then ctx.fmtText(cap.matched)
   else {
    val txt = expandKeyName(key,ctx.labels,ctx.metadata)
    if (txt==cap.matched)             // prevent obvious infinite loop
     then ctx.fmtText(txt)
     else ctx.formatInline(txt)   // format the expansion
  }
}

fun inlineNormal( cap : matched, ctx : inlineContext ) : <div> string {
  ctx.fmtText(cap.matched)
}

fun inlineMath( cap : matched, ctx : inlineContext ) : <div>string {
  val attrs = cap.groups[2].parseAttrs("math-inline");
  ctx.fmtSpan( cap.groups[1], attrs ); // can be taken over by the user
}


fun inlineMathBlock( cap : matched, ctx : inlineContext ) : <div> string {
  val attrsd = ctx.defaults.matchRules("math-display",attrsNone)
  ctx.fmtMath(True,cap.groups[1],attrsd)
}

pub fun fmtMath( ctx : inlineContext, isDisplay : bool, txt0 : string, attrs : attrs = attrsNone) : <div> string {
  val (kind,left,right,rightx) =
    if (attrs.hasClass("snippet"))
     then (if (isDisplay) then "Display" else "Inline","","","")
    elif (isDisplay)
     then ("Display","\\[" + (if (attrs.name.is-empty) then "" else "\\label{" + attrs.name + "}"),"\n\\]","%mdk-136\n")  // add newline because of comments in latex (and we do use trimLines on the content)
     else ("Inline","$","$","")
  val lkind  = kind.toLower
  val class  = "math-" + lkind
  val attrsd = ctx.applyDefaults("span",attrs.addClass(class))

  // This is very dangerous! Trimming lines from potentially generated code
  // might result in
  //   foo%mdk\n -> foo%mdk
  // TODO not sure what it means to NOT trim lines here
  val txt    = txt0.trimLines
  if (kind=="Inline")
    then ctx.fmtMathCmd("span", left+txt+right+rightx, attrsd)
    else ctx.fmtMathEnv("div",  left+txt+right+rightx, attrsd)
}

fun logMathLocation(digest: string, attrs: attrs) {
  val start = attrs.lookupKey("data-line-start", "")
  val end   = attrs.lookupKey("data-line-end", "")
  if (start == "" || end == "") 
    {
      return ()
    } else {
      log("math-locations", start + "," + end + "," + digest)
    }
     
}

fun escapeMath( txt : string, fmt : formatter ) : string {
  txt
}


fun inlineQuot( cap : matched, ctx ) : <div> string {
  ctx.formatInline(if (cap.matched=="\"") then "&quot;" else "&apos;")
}

fun inlineStrong( cap : matched, ctx ) : <div> string {
  val tag = if (ctx.starBold && cap.matched.startsWith("_")) then "em" else "strong"
  val class = tag + (if (cap.matched.startsWith("*")) then "-star" else "-low") + cap.groups[1].length.show
  val attrs = ctx.defaults.matchRules( tag, attrsNone.addClass(class) )
  ctx.fmtCmd(tag, formatInline(ctx,cap.groups[2]), attrs)
}

fun inlineEmph( cap : matched, ctx ) : <div> string {
  val tag = if (ctx.starBold && cap.matched.startsWith("*")) then "strong" else "em"
  val class = tag + (if (cap.matched.startsWith("*")) then "-star" else "-low") + cap.groups[1].length.show
  val attrs = ctx.defaults.matchRules( tag, attrsNone.addClass(class) )
  ctx.fmtCmd(tag, formatInline(ctx,cap.groups[2]), attrs )
}

fun inlineSup( cap : matched, ctx ) : <div> string {
  ctx.fmtCmd("sup", formatInline(ctx,cap.groups[1]), ctx.defaults.matchRules("sup",attrsNone))
}

fun inlineSub( cap : matched, ctx ) : <div> string {
  ctx.fmtCmd("sub", formatInline(ctx,cap.groups[1]), ctx.defaults.matchRules("sub",attrsNone))
}

fun inlineDel( cap : matched, ctx ) : <div> string {
  ctx.fmtCmd("del", formatInline(ctx,cap.groups[1]), ctx.defaults.matchRules("del",attrsNone))
}

fun inlineTag( cap : matched, ctx : inlineContext ) : <div> string {
  inlineTagX(cap.matched,ctx)
}

fun inlineTagX( tag : string, ctx : inlineContext ) : <div> string {
  if (ctx.sanitize || !(ctx.fmt.isFmtHtml))
   then "\\mdline{inlineTagX}"
   else tag
}

fun inlineTagCode( cap : matched, ctx : inlineContext ) : <div> string {
  // TODO: we do not process fully inside <code> for now; remove this later
  // when koka documentation generates markdown instead of html.
  val ictx = ctx.copy(grammar = ctx.grammar.stripFancyRules)
  inlineTagX(cap.groups[1],ctx) +
   ictx.formatInline(cap.groups[2]) +
   inlineTagX(cap.groups[3],ctx)
}

fun inlineCode( cap : matched, ctx ) : <div> string {
  val txt0 = cap.groups[2]
  val txt1 = if (txt0.startsWith(" `")) then txt0.substr(1) else txt0
  val txt  = if (txt0.endsWith("` ")) then txt1.substr(0,txt1.length - 1) else txt1
  val attrs = if (cap.groups.matchedOn(3))
               then cap.groups[3].parseAttrs("code") else attrsNone
  if (ctx.bench)
   then ctx.fmtCode( "",txt,attrs)
   else ctx.fmtSpan( txt,  // can be overridden by the user
          attrs.addClasses(["code","code" + cap.groups[1].length.show]))
}

pub fun fmtCode( ctx : inlineContext, env0 : string, txt : string, attrs0 : attrs = attrsNone ) : <div> string {
  val env = if (env0=="") then "code" else env0
  //trace("code: " + env + ": " + attrs0.show)
  val lang   = attrs0.hasKey("language").maybe("",id)
  val attrs1 = if (lang=="") then attrs0 else attrs0.addClasses(["language-" + lang, "lang-"+lang, lang])
  val attrs  = ctx.formatDefaults(attrs1,env)
  //trace("code: " + env + ": " + attrs2.show)

  val cattrs = match(attrs.hasKey("data-line-first")) {
                 Nothing -> attrsNone
                 Just(v) -> attrsNone.addKeyval("data-line",v)
                }
  val cattrsTable  = if (attrs.hasBoolKey("pretty-breakable"))
                 then cattrs.addKeyvals([("pretty-breakable","true"),("tex-longtable",attrs.lookupKey("tex-longtable","longtable"))])
                 else cattrs

  val pretty = attrs.hasClass("pretty")
  val plain0 = (lang=="" || !(ctx.highlight) || attrs.hasClass("plain") || attrs.hasClass("prettyprint"))
  val plain = if (plain0) then plain0 else {
    if (canHilite(lang)) then False else {
      warning("unknown language: " + lang)
      True
    }
  }


  fun colorize( code : string, mode : maybe<hilitemode> ) : (string,maybe<hilitemode>) {
    if (plain)
     then (code, mode)
     else match(code.hilitePartial(lang,mode)) {
            Nothing         -> (code,mode)
            Just((hl,next)) -> (hl,Just(next))
          }
  }

  fun colorToken( classes : list<string>, content : string ) : <div> string {
    if (plain || classes.is-nil) then content else {
      val pclasses = if (!pretty) then classes else Cons("ptoken",classes.filter(fn(cname) { cname!="token" } ))
      val tokAttrs = ctx.formatDefaults( attrsNone(elem="span").addClasses(pclasses) )
      ctx.fmtCodeToken(pclasses,content,lang,tokAttrs)
    }
  }

  fun colorCode( content : string, startline : bool ) : <div> string {
    content.replaceAll("<br>","\n").replaceAll(rxEndSpaces," ").replaceAll( rxTokens, fn(cap) {
      val nl = (pretty && ((cap.index==0 && startline) || (content.substr(cap.index - 1,1) == "\n")))
      if (cap.groups[2].bool) {  // token span
        val classes = cap.groups[2].split(" ")
        colorToken( classes, ctx.fmtCodePlain( cap.groups[3].htmlUnescape, nl ) )
      }
      elif (cap.groups[4].bool) { // unknown tag
        ""
      }
      else { // literal
        ctx.fmtCodePlain( cap.matched.htmlUnescape, nl )
      }
    });
  }

  fun codeEscape( code : string ) : <div> string {

    unsafe-total{ctx.fmtCodeEscaped(txt,colorize,colorToken,attrs).fst}   // possibly tokenize with colors, and process escapes
  }

  fun codeUnescape( ecode : string, col : int ) : <div> string {
    fmtCodeUnescape( ecode, fn(s,startLine) {
      if (plain) then ctx.fmtCodePlain(s) else colorCode(s, startLine /* col==0 */)
    })
  }


  val pattrs0 = if (plain) then attrs else attrs.addClass("colorized")
  val pattrs = ctx.formatDefaults(pattrs0)
  val content
    = if (pretty && env != "code" ) then {
        val ct = codeAlign(codeEscape(txt),ctx.prettyAlign).map( codeUnescape )
        ctx.fmtCodeTable(ct,cattrsTable)
      }
      else codeUnescape(codeEscape(txt), 0) // todo: optimize the escape/unescape path?


  if (env=="code")
   then ctx.fmtCmd("code", content, pattrs.mergeDefault(cattrs))
   else ctx.fmtEnv(env, ctx.fmtCmd("precode", content, cattrs), pattrs)
}

val rxEndSpaces = regex(r"  +$",multiline=True)
val rxTokens = regex( r"([^<>]+)|" + rxToken + "|(<([^>]*)>)|(.)", ignoreCase=True)
val rxToken  = r#"(?:<span\s+.*?\bclass=['""]?([^""']+)['""]?[^>]*>([\s\S]*?)</span>)"#

fun htmlUnescape( s : string ) : string {
  s.replaceAll( rxEntity, fn(cap) {
    match(entityToNum(cap.groups[1])) {
      Nothing -> cap.matched;
      Just(i) -> string(1,i.char)
    }
  })
}
val rxEntity = regex( r"&(#[xX]\d+|\w+);" )

fun fmtCodeUnescape( txt : string, fmt : (string,bool) -> <div> string ) : <div> string {
  fun unspan(caps : list<matched>, i : int ) {
    match(caps) {
      Nil -> txt.substr(i).fmt(i==0)
      Cons(cap,rest) -> {
        txt.substr(i,cap.index - i).fmt(i==0) + cap.groups[1] + unspan(rest, cap.next)
      }
    }
  }
  val caps = txt.findAll(rxEscaped).list
  unspan(caps,0)
}
val rxEscaped = regex(r"<ESCAPED\b[^>]*>([\s\S]*?)</ESCAPED>")

fun fmtCodeEscaped( ctx : inlineContext, txt : string, format : (string,maybe<a>) -> (string,maybe<a>),
                         formatToken : (list<string>,string) -> <div> string,
                         attrs : attrs = attrsNone, st : maybe<a> = Nothing ) : <div|_e> (string,maybe<a>) {
  if (attrs.hasClass("noescape")) return format(txt,st)

  fun codeEscape( src : string, st0 : maybe<_a> ) : <div|_e> (string,maybe<_a>) {
    match( src.find(rxCodeEscaped)) {
      Nothing   -> format(src,st0)
      Just(cap) -> {
        val (fmt1,st1) = format(src.substr(0,cap.index),st0)
        val subcode    = cap.groups[2].replaceAll(regex(r"\\([^\w])"), "$1")
        val width      = if (cap.groups.matchedOn(1)) then cap.groups[1].parseInt.maybe(1,id)
                         elif (cap.groups.matchedOn(2)) then subcode.length
                         else 1
        val (fmt2,st2) = format(subcode,st1) // for colorization, use the provided substitution
        val classes2   = match(fmt2.find(rxClass)) {
                           Just(ccap) -> (ccap.groups[1] + ccap.groups[2] + ccap.groups[3]).split(" ")
                           Nothing    -> []
                         }

        val innerEsc   = ctx.fmtCmd("span", ctx.formatInline(cap.groups[3]),
                           ctx.formatDefaults(attrsNone.addClass( "code-escaped" )))
        val escaped    = formatToken(classes2,innerEsc).replaceAll("%mdk-356\n","{}")
        val fmt3       = "<ESCAPED width=" + width.show + ">" + escaped + "</ESCAPED>"

        val (fmt4,st3) = codeEscape(src.substr1(cap.next),st2)
        (fmt1 + fmt3 + fmt4, st3)
      }
    }
  }

  codeEscape(txt,st)
}
//val rxCodeEscaped = regex(r"\\\((?:(\d+):)?((?:[^\\\r\n]|\\\n|\\[^\)])*)\\\)")
val rxCodeEscaped = regex(r"\\\((?:(\d+):)?(?:((?:[^\\\|]|\\[^\)])*)\|)?((?:[^\\\r\n]|\\\n|\\[^\)])*)\\\)")
val rxClass       = regex(r#"^<span\s+class=(?:""([^""]*)""|'([^']*)'|([^\s\&<>]+))\s*>"#,ignoreCase=True)

fun escapeTexPre( txt : string ) : string {
  txt.replaceAll(regex(r"\$"),r"$\text{\tt\textdollar}$")
     .replaceAll(regex(r"\|"),r"$\text{\tt\textbar}$")
}

fun inlineDashes( cap : matched, ctx ) : <div> string {
  ctx.formatInline(if (cap.groups[1] != "") then "&mdash;" else "&ndash;")
}


fun inlineQuotes( cap : matched, ctx : inlineContext ) : <div> string {
  val quote = cap.matched.substr(0,1)
  if (quote == "'")
   then ctx.formatInline("&lsquo;" + cap.groups[1] + "&rsquo;")
  elif (quote=="<")
   then ctx.formatInline("&laquo;" + cap.groups[1] + "&raquo;")
   else ctx.formatInline("&ldquo;" + cap.groups[2] + "&rdquo;")
}

fun inlineDots( cap : matched, ctx ) : <div> string {
  ctx.formatInline("&hellip;")
}

fun inlineOther( cap : matched, ctx ) : string {
  //trace("other: " + cap.matched)
  ctx.fmtEscape(cap.matched)
}

fun inlineEscape( cap : matched, ctx : inlineContext ) : <div> string {
  val txt = cap.groups[1]
  if (txt==" ") then ctx.formatInline("&nbsp;")
  elif (txt=="\n") then inlineBreak(cap,ctx)
  elif (txt=="/") then ""
  elif (ctx.sanitize) then ctx.fmtEscape(txt)
  else ctx.fmtText(txt)
}

fun hypenateUrl( url : string ) : string {
  url.replaceAll(rxPostHyphen,"$1&#8203;").replaceAll("%","&#8203;%")
}
val rxPostHyphen = regex(r"([\-\._/\?#\[\]@!$&'\(\)\*\+,;=]+)")


fun inlineAutoLink( cap : matched, ctx : inlineContext ) : <div> string {
  val attrs  = if (cap.groups.matchedOn(3)) then ctx.formatAttrs(cap.groups[3].parseAttrs) else attrsNone
  val attrsd = ctx.defaults.matchRules( "a", attrs.addClass("texturl"))
  if (cap.groups[2] == "@") {
    val text = cap.groups[1].replace(regex(r"^mailto:"),"")
    val url  = "mailto:" + text
    ctx.fmtLink(False,newLink(url,linkattrs=attrsd,bench=ctx.bench),ctx.fmtEscape(text.hypenateUrl))
  }
  else {
    ctx.fmtLink(False,newLink(cap.groups[1],linkattrs=attrsd,bench=ctx.bench),ctx.fmtEscape(cap.groups[1].hypenateUrl))
  }
}

fun inlineLink( cap : matched, ctx : inlineContext ) : <div> string {
  inlineLinkEx(False,cap,ctx)
}

fun inlineImg( cap : matched, ctx : inlineContext ) : <div> string {
  inlineLinkEx(True,cap,ctx)
}

fun inlineLinkEx( isImage : bool, cap : matched, ctx : inlineContext ) : <div> string {
  // cap.groups = 1:optional spaces, 2:txt, 3:everything after it,
  //               AND 4:href, 5:href-title, OR 6: linkid, AND 7:span attributes
  val attrs  = if (cap.groups.matchedOn(7)) then ctx.formatAttrs(cap.groups[7].parseAttrs) else attrsNone
  //val attrs   = ctx.applyDefaults(if (isImage) then "img" else "a", attrs0)

  val nbsp = if (cap.groups[1] != "" && cap.groups[1].list.all(fn(c){c==' '}))
              then ctx.fmtText("&nbsp;") else cap.groups[1]
  if (cap.groups.matchedOn(4)) {
    // direct url link:  [text](url title){attrs}
    val attrsd = ctx.defaults.matchRules( if (isImage) then "img" else "a", attrs)
    nbsp + ctx.fmtLink(isImage, newLink(cap.groups[4],cap.groups[5],attrsd,bench=ctx.bench),
                                 ctx.formatInline(cap.groups[2]))
  }
  elif (ctx.bench || cap.groups.matchedOn(6)) {
    // [text][ref]{attrs}
    inlineLinkRef(isImage, cap.groups[1], nbsp, cap.groups[2], cap.groups[3], cap.groups[6], attrs, ctx )
  }
  else {
    // [text]{attrs}
    inlineLinkNoRef(isImage, cap.groups[1], nbsp, cap.groups[2], cap.groups[3], attrs, ctx)
  }
}

struct cite(
  name    : string,
  pre     : string,
  post    : string,
  modifier: string,
  number  : string,
  year    : string,
  authors : string,
  ordinal : int
)

fun inlineLinkNoRef( isImage:bool, spaces : string, nbsp : string, txt : string, after : string, attrs : attrs, ctx : inlineContext ) : <div> string
{
  // TODO do not look up citation in ctx.labels[lab] (since we don't use BIB)!
  val citationss
            = if (ctx.bench || !(txt.contains("@"))) then Nil
                else txt.splitExclude(rxCiteSep,rxCiteSepExclude).map(fn(elem) {
                        match (elem.find(rxCitation)) {
                          Nothing -> []
                          Just(cap) -> {
                            log("aux",r"\citation{" + cap.groups[3] + "}")
                            val lab = ("@" + cap.groups[3])
                            [Cite(lab.substr(1), cap.groups[1], cap.groups[4], cap.groups[2], "NUMBER", "YEAR", "AUTHORS", 0)]
                          }
                        }
                      })

  //trace("citations: " + citationss.concat.join("-"))
  if (citationss.is-cons && citationss.all(is-cons)) {
    // Citations link: set defaults as "citations" block
    val attrsc = attrs.addKeyval("target-element","bibitem")
    val attrsd = ctx.defaults.matchRules("citations",attrsc)
    ctx.fmtCite(nbsp,citationss.concat,attrsd)
  }
  else {
    inlineLinkRef( isImage, spaces, nbsp, txt, after, "", attrs, ctx )
  }
}
val rxCiteSep         = regex(r"\s*[;]\s*")
val rxCiteSepExclude  = regex(r"[^\\;\s]|\\.")
val rxCitation        = regex(r"^((?:[^\w\\@+!-]|[+!-](?!@)|\\.|\w(?![+!-]?@))*)(?:([+!-]?)@" + rxCitename + r")([\s\S]*)$")
val rxCitename        = r"(\w(?:[\w]|[:\-\.]\w)*)"

fun inlineCite( cap : matched, ctx : inlineContext ) : <div> string {
  log("aux",r"\citation{" + cap.groups[4] + "}")
  ctx.formatInline(cap.groups[1] + "[" + cap.groups[2] + "]{.textual" +
    (if (cap.groups[3]=="-") then " .free" else "") + "}")
}

fun inlineLinkRef( isImage : bool, spaces : string, nbsp : string, txt : string, after : string, ref : string,
                          attrs : attrs, ctx : inlineContext ) : <div> string
{
  val id = if (ref != "") then ref.definitionId else txt.definitionId
  val elemName = if (isImage) then "img" else "a"
  match(ctx.links[id]) {
    Just(link) -> {
      val attrsd = ctx.defaults.matchRules(elemName,attrs)
      val xlink = if (attrsd.empty) then link else link( linkattrs = attrsd.mergeDefault(link.linkattrs) )
      nbsp + ctx.fmtLink(isImage, xlink, ctx.formatInline(txt))
    }
    Nothing -> {
      // Link not found! Try if it is a label
      val labelId = if (id.startsWith("#")) then id.substr(1) else ""
      match(ctx.labels[labelId]) {
        Just(lab) -> {
          // Label reference
          val attrsd = ctx.defaults.matchRules(elemName,attrs)
          val lattrs = attrsd.addKeyval("target-element",lab.element)
          val llink  = newLink(id,ctx.formatInline(lab.labelCaption),lattrs,bench=ctx.bench)
          nbsp + ctx.fmtLink(isImage,llink,ctx.formatInline(
                                 if (ref=="") then "&" + labelId + ";" else txt))
        }
        Nothing -> {
          if (ref != "") then {
            warning( "missing link definition: " + ref)
            spaces + ctx.formatInline(txt) + "[??]"
          }
          elif (!(attrs.empty)) {
            // Span element
            // TODO if we replace the mdline with a newline, this will be stripped somehow.
            // CONJECTURE: trim is invoked in the result, removing the newline, but keeping the %...
            // BUT WHY?
            //
            // Also alternatively removing %mdk-565 doesn't help since then there might be
            // to many newlines (for instance in effekt-standalone/Theorem4.4).
            spaces + ctx.fmtSpan(txt,attrs) + "\\mdline{inlineLinkRef}"
          }
          else {
            // warn for missing labels or links
            if (txt.contains(rxCanBeRef)) {
              if (txt.startsWith("#")) {
                warning( "reference to missing id: " + txt)
              }
              elif (ctx.labels[id].is-just) {
                warning( "possibly forgot '#' to reference id: " + txt)
              }
              else {
                warning( "possibly missing link definition or id: " + txt)
              }
            }

            // just brackets
            spaces + "[" + formatInline(ctx,txt) + "]" + formatInline(ctx,after)
          }
        }
      }
    }
  }
}

val rxCanBeRef = regex(r"^#?[A-Za-z_][\w-]*$")

// get and format default attributes
fun formatDefaults( ctx : inlineContext, attrs : attrs, elemName : string = "" ) : <div> attrs {
  if (!(attrs.defaults)) return attrs

  val sname = if (elemName != "") then elemName
              elif (attrs.elem != "") then attrs.elem
              else match (attrs.classes) {
                Cons(cname,_) -> cname
                _             -> "span"
              } //attrs.elementName("span")
  val attrsx  = ctx.defaults.matchRules(sname,attrs)
  ctx.formatAttrs(attrsx)
}

// Format a span element
fun fmtSpan( ctx : inlineContext, txt0 : string, attrs : attrs ) : <div> string {
  val sname   = if (attrs.elem != "") then attrs.elem
                else match (attrs.classes) {
                  Cons(cname,_) -> cname
                  _             -> "span"
                } //attrs.elementName("span")
  val attrsx  = ctx.defaults.matchRules(sname,attrs)
  val attrsd  = ctx.formatAttrs(attrsx)

  // this runs the replacers
  val txt = attrsd.transformText(txt0,ctx.labels,ctx.metadata)
  match(attrsd.input) {
    Pre      -> ctx.fmtCode("", txt, attrsd) // todo: use sname as env name?
    Math     -> ctx.fmtMath(False,txt.mathUnline,attrsd)
    MathPre  -> ctx.fmtMath(False,txt.mathUnline.mathPre,attrsd)
    Raw(monly) -> {
      if (ctx.sanitize) then ""
       else match(monly) {
        Nothing -> ctx.fmtCmd("span", txt, attrsd )
        Just(f) | f == ctx.fmt -> ctx.fmtCmd("span", txt, attrsd )
        _       -> ""
       }
    }
    Markdown(Just(f)) | !(f == ctx.fmt) -> ""
    Markdown | attrsd.notag -> ctx.formatInline(txt)
    // MathDefs, Tex, Markdown
    _  -> ctx.fmtCmd("span", ctx.formatInline(txt), attrsd )
  }
}

pub fun fmtPoly( ctx : inlineContext, txt0 : string, attrs : attrs = attrsNone) : <div> string {
  // add newline because of comments in latex (and we do use trimLines on the content)
  val (kind,left,right,rightx) = ("Display","\\[" + (if (attrs.name.is-empty) then "" else "\\label{" + attrs.name + "}"),"\n\\]","%mdk-614\n")

  // idea: have special math mode where we
  // 1) compute the alignment
  // 2) generate polytable code and insert linebreaks etc.
  // 3) then run the replacements on the generated code

  // do some alignment computations:
  val aligned = codeAlign(txt0)
  // trace(aligned.show)

  // generate layout
  val txt1 = fmtLatexPolyTable(ctx, aligned, attrs)

  // perform replacements
  val txt = attrs.transformText(txt1, ctx.labels, ctx.metadata)

  val lkind  = kind.toLower
  val class  = "math-" + lkind
  val attrsd = ctx.applyDefaults("span",attrs.addClass(class))

  if (kind=="Inline")
    then ctx.fmtMathCmd("span", left+txt+right+rightx, attrsd)
    else ctx.fmtMathEnv("div",  left+txt+right+rightx, attrsd)
}

fun mathUnline( txt : string ) {
  txt.replaceAll(rxCont,"$1")  // allow line breaks in inline-math
}
val rxCont = regex(r"(\\%)|(?:%.*)?\n[ \t]*")

// Format a citation link
fun fmtCite(ctx : inlineContext, nbsp: string, citations : list<cite>, attrs : attrs ) : string
{
  val isTextual = (attrs.hasClass("textual"))

  fun year(cite: cite) { cite.modifier.contains("-") }
  fun authors(cite: cite) { cite.modifier.contains("!") }
  fun allauthors(cite: cite) { cite.modifier.contains("+") }

  // @Goo93	 Goossens et al. (1993)	Textual style
  // +@Goo93	 Goossens, Mittelbach, and Samarin (1993)	Long – all authors
  // -@Goo93	 1993	Short – just year
  // !@Goo93	 Goossens et al.	Just authors
  if (isTextual) {
    val res = match(citations) {
      Cons(cite, _) -> {
        if (cite.year) {
          "\\citeyear{" + cite.name + "}"
        } elif (cite.authors) {
          "\\citeauthor{" + cite.name + "}"
        } elif (cite.allauthors) {
          "\\citet*{" + cite.name + "}"
        } else {
          "\\citet{" + cite.name + "}"
        }
      }
      Nil -> {
        warning( "Should not happen")
        ""
      }
    }
    nbsp + res

  // [@Goo93]	 (Goossens et al., 1993)	Natural
  // [+@Goo93]	 (Goossens, Mittelbach, and Samarin, 1993)	Long – all authors
  // [-@Goo93]	 (1993)	Short – just year
  } else {
    val cites = citations.map(fn(cite){ cite.name }).join(", ")
    // TODO also support other cite styles
    nbsp + "\\citep{" + cites + "}"
  }
}

// Format attributes
fun formatAttrs( ctx : inlineContext, attrs : attrs ) : <div> attrs {
  attrs( label = ctx.formatInline(attrs.label) ).expand(ctx.metadata )
}

// Apply defaults
fun applyDefaults( ctx : inlineContext, sname : string, attrs : attrs ) : <div> attrs {
  ctx.defaults.matchRules(sname,attrs)
}

fun inlineFootnote( cap : matched, ctx : inlineContext ) : <div> string {
  val id = cap.groups[1].definitionId
  match( ctx.footnotes[id] ) {
    Just(footn:footnote) -> ctx.fmtFootnote(id,footn(footnoteNum = ctx.formatInline(footn.footnoteNum),
                                                   footnoteCaption = ctx.formatInline(footn.footnoteCaption)))
    Nothing -> {
      warning( "missing footnote definition: " + cap.groups[1])
      ctx.fmtText("[^" + formatInline(ctx,cap.groups[1]) + "]") // leave as plain text?
    }
  }
}

fun isort( xs : list<a>, gt : (a,a) -> bool ) : list<a> {
  match(xs) {
    Cons(x,xx) -> insert(x,xx.isort(gt),gt)
    Nil -> Nil
  }
}

fun insert( x : a, xs : list<a>, gt : (a,a) -> bool ) : list<a> {
  match(xs) {
    Cons(y,yy) -> if (gt(x,y)) then Cons(y,insert(x,yy,gt)) else Cons(x,xs)
    Nil -> [x]
  }
}
