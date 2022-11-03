/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// The parsing and formatting of TeX blocks.
//
// The capabilities are fairly limited and mostly geared to be able to
// parse bibtex entries. Accent and special character commands are quite well
// recognized in order to allow author names with correct accent characters.
pub module texParserItems

import compat/dict
import compat/string
import compat/regex
import compat
import compat/path
import common
import entity
import texCommon
import texParserBase
import stringcompat

/* use entity for these commands */
val texEntities = [("LaTeX","LogoLaTeX"),("LaTeXe","LogoLaTeXe"),("BibTeX","LogoBibTeX"),("AmSTeX","LogoAmSTeX"),("TeX","LogoTeX")].dict
val texEntityCmd0 = r"(vfill|qed|eg|etal|ie|" + texEntities.keys.join("|") + ")"


val texFontSizeMap = [("tiny","xx-small"),("scriptsize","x-small"),("footnotesize","small"),
                      ("small","small"),("normalsize","medium"),("large","large"),("Large","x-large"),
                      ("LARGE","xx-large"),("Huge","xx-large")].dict
val texFontSizes   = texFontSizeMap.keys.join("|")

/* sections, sizes, etc */
val texsects = ["part","chapter","section","subsection","subsubsection","paragraph"]
val texsect  = "(" + texsects.join("|") + ")"


/* --------------------------------------
 Latex block funs
---------------------------------------- */
fun texInclude( cap : matched, _context ) {
  val fname = cap.groups[2].unbrace
  if (cap.groups[1]=="input" && fname=="babelbst.tex")
   then ""  // already supported in Madoko but inserted by the custom-bib babel bib styles
   else "\n[INCLUDE=" + cap.groups[2].unbrace + "]\n"
}

fun texMakeTitle( cap : matched, _context ) {
  "\n[TITLE]\n"
}

fun texBibliography( cap : matched, _context ) {
  "\n# References {-}\n[BIB]\n"
}

fun texPageBreak( _cap : matched, _context ) {
  "\n&pagebreak;\n"
}

fun texAppendix( _cap : matched, _context ) {
  "\n# Appendix { @h1='A' }\n"
}

fun texToc( _cap : matched, _context ) {
  "\n[TOC]\n"
}
fun texTof( _cap : matched, _context ) {
  "\n[TOC=tof]\n"
}


fun texFootnote( cap : matched, ctx ) : string {
  val footn = "^fn-" + cap.groups[1].md5.substr(0,3)
  "[" + footn + "]" + cap.groups[2].parse(ctx) + "\n\n[" + footn + "]: \n" + cap.groups[1].parse(ctx).indent4 + "\n\n"
}

fun toIdentifier(s) {
  s.unbrace.replaceAll(rxNonIdChar,"-")
}
val rxNonIdChar = regex(r"[^\w\-]+")

fun texSection( cap : matched, ctx ) : string {
  val n = max(1, texsects.indexOf(fn(s) { s == cap.groups[1] }) - 1);
  val caption = parse( cap.groups[4].unbrace, ctx )
  val attrs = [if (cap.groups[2]=="*") then " -" else "",
               if (cap.groups[5] != "") then " #" + cap.groups[5].toIdentifier else "",
               makeAttr("toc-line", cap.groups[3])
              ].joinAttrs

  string(n,'#') + " " + caption + " " + attrs + "\n"
}

fun texFontSize( cap : matched, ctx ) : string {
  val cssSize = texFontSizeMap[cap.groups[1]].maybe("medium",id)
  "[" + cap.groups[2].parse(ctx) + "]{font-size:" + cssSize + "}"
}

fun texComment( cap : matched, _context )  : string {
  val comment = cap.groups[1]
  val com = if (comment.startsWith("\n")) then "\n<!--" + comment.substr(1) else "<!--" + comment
  if (com.endsWith("\n"))
   then com.substr(0,com.length - 1) + "-->\n"
   else com + "-->"
}

fun texRef( cap : matched, _context ) : string {
   (if (cap.groups[1]=="~") then " " else cap.groups[1]) + "[#" + cap.groups[2].toIdentifier + "]"
}


fun texEnvBegin( cap : matched, _context ) : string {
  val attrs = [if (cap.groups[3].is-empty) then "" else ".fragment"].joinAttrs
  "\n~ Begin " + cap.groups[1].capitalize + " " + attrs + "\n"
}

fun texEnvEnd( cap : matched, _context ) : string {
  "\n~ End " + cap.groups[1].capitalize + "\n"
}

fun texBeginMinipage( cap : matched, _context ) : string {
  val width  = texLength(cap.groups[4])
  val height = texLength(cap.groups[2])
  val attrs = [makeAttr("width",width),
               makeAttr("height",height)].joinAttrs
  "\n~ Begin Minipage " + attrs + "\n"
}

fun texItemPause( cap : matched, ctx ) : string {
  texItemX( "\n\n* {.fragment}", cap.groups[2], ctx )
}

fun texItem( cap : matched, ctx ) : string {
  val bullet = if (cap.groups[1].is-empty) then "\n\n*" else "\n\n* {.fragment}"
  texItemX( bullet, cap.groups[2], ctx )
}

fun texItemX( bullet : string, caption : string, ctx ) : string {
  bullet + " " + (if (caption=="") then "" else "**" + parse(caption,ctx) + "**")
}

fun texList( cap: matched, ctx ) : string {
  val bullet = if (cap.groups[1]=="itemize") then "*" else "1."
  if (cap.groups[3]=="") then "\n" else {
    val post = if (cap.groups[4].is-empty && cap.groups[5].is-empty) then "" else " {.fragment}"
    "\n\n" + texItemX( bullet + post, cap.groups[6], ctx )
  }
}

fun texEmptyLine( _cap, _context ) : string {
  "\n"
}


fun texMathDisplay( cap : matched, _context ) {
  "\n~ Math\n" + cap.matched.trimx(2).trim + "\n~\n"
}

fun texMathInline( cap : matched, _context ) {
  "$" + cap.matched.trimx(1).replaceAll(rxMathNl," %\n") + "$"
}
val rxMathNl = regex(r"\r?\n")

fun texMathEnv( cap : matched, ctx ) {
  val (content,labelCaption,pre,post) = cap.groups[3].extractLabelCaption(ctx)
  val attrs = labelCaption.joinAttrs
  val envName = if (cap.groups[2]=="*") then "Math" else "Equation"
  "~ " + envName + " " + attrs + "\n" + pre +
  content.trimLines +
  post + "\n~\n"
}

fun texMathSnippet( cap : matched, ctx ) {
  val env = cap.groups[1]
  val lenv =
    if (env=="gather") then "gathered"
    elif (env=="align" || env=="multline" || env=="flalign" || env=="eqnarray") then "aligned"
    else ""
  val (pre,post) = if (lenv.bool) then ("\\begin{" + lenv + "}\n","\n\\end{" + lenv + "}") else ("","")
  val (content,labelCaption,_pre,_post) = cap.groups[4].extractLabelCaption(ctx)
  val attrs = labelCaption.joinAttrs
  val envName = if (lenv.is-empty) then "Snippet" elif (cap.groups[2]=="*") then "Math" else "Equation"
  "~ " + envName + " " + attrs + "\n" + pre +
  content.trimLines +
  post + "\n~\n"
}

fun texTikzEnv( cap : matched, ctx ) {
  "~ Snippet\n\\begin{tikzpicture}" + cap.groups[1] + "\\end{tikzpicture}\n~\n"
}
fun texTikzCmd( cap : matched, ctx ) {
  "$\\tikz[" + cap.groups[1] + "]{" + cap.groups[2] + "}${math-needpdf:true}"
}


fun texListing( cap : matched, ctx ) : string {
  val attrs = if (cap.groups[2]=="") then "" else {
    " { " + cap.groups[2].findAll(rxKeyVal).map( fn(kcap) {
              val key = kcap.groups[1]
              val value = kcap.groups[2]
              if (key=="language") then "language:'" + value + "'"
              elif (key=="caption") then "caption:'" + parse( value.unbrace, ctx ) + "'"
              elif (key=="label") then "#" + value.toIdentifier
              else ""
            }).join(" ") + " }"
  }

  "```" + attrs + "\n" + cap.groups[3].trimNL + " \n```\n"
}
val rxKeyVal = regex(r"\b(\w+)=(\{[^\}]*\}|[^;,\s\}]*)")

fun texListingEnd( _cap, _context ) : string {
  "```\n"
}

fun texCaptioned( cap : matched, ctx ) : string {
  texCaptionedX( cap, if (cap.groups[2].is-empty) then [] else [".wide"], ctx )
}
fun texLabeled( cap : matched, ctx ) : string {
  texCaptionedX( cap, [], ctx )
}
fun texCaptionedX( cap : matched, extraAttrs : list<string>, ctx ) : string {
  val env = if (cap.groups[1]=="table") then "tableFigure" else cap.groups[1]
  texCaptionedXX( env, cap.groups[4], cap.groups[3], extraAttrs, ctx )
}
fun texWrapFigure( cap : matched, ctx ) : string {
  val attrs  = [makeAttr("width", cap.groups[3].texLength),
                makeAttr("lines", cap.groups[1]),
                if (cap.groups[2]=="r" || cap.groups[2]=="R" || cap.groups[2]=="o" || cap.groups[2]=="O")
                 then "float:right; margin-left:1em"
                 else "float:left; margin-right:1em"
               ]
  texCaptionedXX( "figure", cap.groups[4], "", attrs, ctx )
}

fun texCaptionedXX( env :string, body: string, caption:string, extraAttrs : list<string>, ctx ) : string {
  val (content,labelCaption,pre,post) = extractLabelCaption( body, ctx, caption.parse(ctx), "" )
  val attrs = (extraAttrs + labelCaption).joinAttrs
  "\n~ Begin " + env.capitalize + " " + attrs + "\n" + pre + content.trimNL.parse(ctx) + post + "\n~ End " + env.capitalize + "\n"
}

fun extractLabelCaption( content : string, ctx, defCaption = "", defLabel = "" ) : (string,list<string>,string,string) {
  var label := defLabel
  var caption := defCaption
  var pre   := ""
  var post := ""
  val content1 = content.replace( rxCaption, fn(ccap) {
    caption := ccap.groups[1].parse(ctx)
    ""
  }).replace( rxLabel, fn(lcap) {
    label := "#" + lcap.groups[1].toIdentifier
    ""
  }).replace( rxCentering, fn(ccap) {
    pre  := pre + "~ Begin Center\n"
    post := "\n~ End Center" + post
    ""
  })
  (content1, [label,makeAttr("caption",caption)], pre, post )
}

val rxCaption = regex(r"\\caption\b" + texarg)
val rxLabel   = regex(r"\\label\b" + texarg)
val rxCentering = regex(r"\\centering\b\s*")

fun texNoIndent( cap : matched, ctx ) : string {
  cap.groups[1].parse(ctx) + "{.noindent}\n\n"
}

fun texVSpacePara( cap : matched, ctx ) : string {
  cap.groups[2].parse(ctx) + "{ margin-top:" + cap.groups[1].texLength.quote + "}\n\n"
}

/* --------------------------------------
 Tables
---------------------------------------- */

fun texTabularX( cap : matched, ctx ) : string {
  texTabularDo( cap.groups[2], cap.groups[3], cap.groups[4], cap.groups[5], cap, ctx )
}

fun texTabular( cap : matched, ctx ) : string {
  texTabularDo( cap.groups[1], "", cap.groups[2], cap.groups[3], cap, ctx )
}

fun texLength( w ) {
  val textwidth = r"(textwidth|linewidth|columnwidth|hsize)"
  w.unbrace.replace(regex(r"0\.(\d\d?)\\" + textwidth + r"\b\s*"),fn(wcap) {
    val n = wcap.groups[1].parseInt().maybe(100,id)
    if (n < 10) then n.show + "0%" else n.show + "%"
  }).replace(regex(r"\\" + textwidth + r"\b\s*"), "100%");
}

fun texTabularDo( pos :string, width: string, spec : string, content : string, cap: matched, ctx ) : string {
  fun toColSpecs( xs : list<matched> ) {
    match(xs) {
      Nil -> [("|","","")]
      Cons(xcap,ys) -> {
        if (xcap.groups[1] == "") {
          // no explicit separator
          [("|",xcap.matched.substr(0,1).toLower, singleAttr("width",xcap.groups[2].texLength))] + toColSpecs(ys)
        }
        else {
          // is separator
          match(ys) {
            Nil -> {
              // final separator
              [("+","","")]
            }
            Cons(ycap,zs) -> {
              [("+",ycap.matched.substr(0,1).toLower, singleAttr("width",ycap.groups[2].texLength))] + toColSpecs(zs)
            }
          }
        }
      }
    }
  }

  fun expand( cells : list<(int,string)>, n : int ) : list<string> {
    val (cs,xs) = cells.unzip
    xs + list(1,n - cs.sum).map(fn(i) { "" })
  }

  fun makeLine( double : bool, columns : int ) : string {
    "|" + list(1,columns).map( fn(i) { if (double) then "===" else "---" } ).join("|") + "|"
  }

  val rxMultiColumn = regex(r"\\multicolumn\b\s*\{(\d+)\}\s*" + texarg + texarg)
  fun renderCell( cell : string ) : (int,string) {
    match(cell.find(rxMultiColumn)) {
      Nothing    -> (1, cell.parse(ctx))
      Just(ccap) -> {
        val n = ccap.groups[1].unbrace.parseInt.maybe(1,id)
        (n, ccap.groups[3].parse(ctx) + string(n - 1,'|') )
      }
    }
  }

  fun renderRow( row : string, columns : int) : string {
    val (line,rest) = match(row.find(rxHline)) {
      Nothing   -> ("",row)
      Just(rcap) -> (makeLine(rcap.groups[1]!="", columns), rcap.groups[3])
    }
    if (rest.trim == "")
     then line
     else line + (if (line=="") then "" else "\n") +
          "| " + rest.split("&").map( renderCell ).expand(columns).join("| ") + "|"
  }

  fun rowSanitize( row : string ) {
    row.replaceAll(rxRowNl," ").replaceAll(rxNoAlign,"")
  }

  fun createColumn( col ) {
    "\n~Begin Column\n" + col.parse(ctx) + "\n~ End Column"
  }
  fun createColumns( _colspecs, row ) {
    val cols = row.split("&")
    "\n~Begin Columns" + cols.map(createColumn).join() + "\n~ End Columns\n"
  }

  // Split into rows
  val rawRows = content.split(rxRowEnd).list.remove(fn(row) { row.trim.is-empty } )
  val rows = rawRows.map( fn(row) { row.rowSanitize } )


  // figure out where to place the table specification/header line
  val (topRows,headerSep,bodyRows) =
    match(rows) {
      Cons(row0,Cons(row1,rest)) -> match(row1.find(rxHline)) {
        Just(hcap) -> ([row0], if (hcap.groups[1].is-empty) then "---" else "===", Cons(hcap.groups[3], rest) )
        Nothing    -> match(row0.find(rxHline)) {
          Just(hcap0) -> ([], if (hcap0.groups[1].is-empty) then "---" else "===", Cons(hcap0.groups[3], Cons(row1,rest)) )
          Nothing     -> ([], "~~~", rows)
        }
      }
      Cons(row0,rest) -> match(row0.find(rxHline)) {
        Just(hcap0) -> ([], if (hcap0.groups[1].is-empty) then "---" else "===", Cons(hcap0.groups[3], rest) )
        Nothing     -> ([], "~~~", rows)
      }
      Nil -> ([],"",[])
    }

  // Create a header line from the tabular specification
  val colspecs = spec.replaceAll(rxNoSpec,"").findAll(rxSpec).list.toColSpecs
  val header   = colspecs.map( fn(cspec) {
    val (sep,kind,attrs) = cspec
    if (kind=="")
     then sep
     else sep + (if (kind=="c" || kind=="l") then ":" else "") + headerSep + attrs + headerSep + (if (kind=="c" || kind=="r") then ":" else "")
  }).join("");
  val colcount = (if (colspecs.length > 1) then colspecs.length - 1 else 1)

  // use 'column' block for single line tabular's with new lines in it
  if (rawRows.length==1 && rawRows.any(fn(row) { row.contains(rxRowNl) }))
   then return createColumns(colspecs,rawRows.take(1).join)

  //trace("|rawrows| = " + rawRows.length.show + "\n[" + rawRows.join(",") + "]\n\n")


  // create attributes
  val attrs = [".textable", makeAttr("width",width.texLength),
              (if (pos=="b") then "vertical-align:bottom"
               elif (pos=="t") then "vertical-align:top"
               else "")].joinAttrs

  // render rows
  fun renderRows( rs ) {
    rs.map( fn(row) { renderRow( row, colcount ) } ).remove(is-empty).join("\n")
  }

  val top  = topRows.renderRows
  val body = bodyRows.renderRows
  "\n" + (if (top.is-empty) then "" else top + "\n") + header + "\n" + body + "\n" + attrs
}

val rxNoAlign= regex(r"\\noalign\b\s*" + texarg)
val rxHline  = regex(r"^\s*(?:\\(?:hline|firsthline|lasthline|toprule|bottomrule|midrule)\b\s*(\\hline\b\s*)?|\\(?:cline|cmidrule)\b(?:\(\w\))?" + texarg + r"\s*)([\s\S]*)")
val rxRowEnd = regex(r"\\\\(?:\[(?:[^\]\r\n]*)\])?[ \t]*(?:\r?\n)*")
val rxRowNl  = regex(r"\r?\n")
val rxSpec   = regex(r"(\|\|?)|[lcrX]|[pmb]\{([^\}]*)\}")
val rxNoSpec = regex(r"\s|[^pmb](?=\{)" + texarg)


/* --------------------------------------
 Beamer
---------------------------------------- */

fun beamerOptions( opts : string ) : (string,list<string>) {
  var title := ""
  val attrs = opts.findAll(rxKeyVal).list.map( fn(cap) {
    val key = cap.groups[1]
    val value = cap.groups[2]
    if (key=="label") then "#" + value.toIdentifier
    elif (key=="title") then {
      title := value
      ""
    }
    elif (key=="squeeze" || key=="shrink" || key=="plain") {
      ".smaller"
    }
    else ""
  })
  (title,attrs)
}

fun beamerExtract( content : string, ctx ) : (string,string,list<string>,string,string) {
  var label   := ""
  var title   := ""
  var pre := ""
  var post := ""
  val content1 = content.replace( rxFrameTitle, fn(tcap) {
    title := tcap.groups[1]
    ""
  }).replace( rxLabel, fn(lcap) {
    label := "#" + lcap.groups[1].toIdentifier
    ""
  }).replace( rxCentering, fn(ccap) {
    pre  := pre + "~ Begin Center\n"
    post := "\n~ End Center" + post
    ""
  })
  (content1, title, [label], pre, post )
}
val rxFrameTitle = regex(r"\\frametitle\b\s*" + texargg )

fun texFrame( cap : matched, ctx : texContext ) : string {
  texFrameX( cap.groups[2], cap.groups[3], cap.groups[4], cap.groups[5], ctx )
}

fun texFrameCmd( cap : matched, ctx : texContext ) : string {
  texFrameX( cap.groups[2], "", "", cap.groups[3], ctx )
}

fun texFrameX( options : string, argTitle : string, argSubtitle : string, body : string, ctx : texContext ) : string {
  val (title0,attrs0) = options.beamerOptions
  val (content,title1,attrs1,pre,post) = body.beamerExtract(ctx)
  val title = argTitle.unbrace || title1 || title0
  val subtitle = if (argSubtitle.is-empty) then "" else " - " + argSubtitle.unbrace
  val rtitle   = (title + subtitle).parse(ctx)
  val ftitle   = rtitle.trim || r"\/"
  "\n# " + ftitle + " " + (attrs0 + attrs1).joinAttrs + "\n" + pre + content.parse(ctx) + post + "\n"
}

fun texColumn( cap : matched, ctx ) : string {
  val attrs = singleAttr("width", cap.groups[1].texLength )
  "~ Begin Column " + attrs
}

fun texUncover( cap : matched, ctx ) : string {
  "[" + cap.groups[3].parse(ctx) + "]{.fragment}"
}

fun texBeginCaptionBlock( cap : matched, ctx ) : string {
  val attrs = ["." + cap.groups[1],
               if (cap.groups[2].is-empty) then "" else ".fragment",
               makeAttr("caption", cap.groups[3].parse(ctx))
              ].joinAttrs
  "\n~ Begin Captioned " + attrs + "\n"
}

fun texEndCaptionBlock( cap : matched, ctx ) : string {
  "\n~ End Captioned\n"
}

/* --------------------------------------
 Latex grammar funs
---------------------------------------- */

fun texNormal( cap : matched, _context ) : string {
  cap.matched
}

fun texIndent( cap : matched, _context ) : string {
  "\n   "
}

fun texChar( cap : matched, _context ) : string {
  val ent = texCmdToEntity(cap.matched)
  if (ent=="") then cap.matched.substr(1) else ent
}

fun texDash( cap: matched, _context) : string {
  if (cap.matched.length == 2)
   then "&ndash;" else "&mdash;"
}

fun texOther( cap : matched, _context ) : string {
  val char = cap.matched
  if (char == "~") then r"\ "
  elif (char=="*") then r"\*"
  elif (char=="_") then r"\_"
  elif (char=="[") then r"\["
  elif (char=="]") then r"\]"
  elif (char=="#") then r"\#"
  elif (char=="`") then r"\`"
  elif (char=="``") then "\""
  else char
}


fun texAccent( cap : matched, _context ) : string {
  val accent = cap.groups[1]
  val letter = cap.groups[2].replaceAll(rxNonLetter,"")
  match (texAccents[cap.groups[1]]) {
    Just(name) -> "&" + letter + name + ";"
    Nothing -> letter
  }
}
val rxNonLetter = regex(r"[^\w]+");

fun texRule( cap : matched, _context ) : string {
  val widthHeight = [makeAttr("width",texLength(cap.groups[2])),
                     makeAttr("height",texLength(cap.groups[3]))]
  if (cap.groups[1] != "") then {
    "[ ]" + (["background-color:black",makeAttr("vertical-align",texLength(cap.groups[1]))] + widthHeight).joinAttrs
  }
  else {
    "\n------------ " + widthHeight.joinAttrs + "\n"
  }
}

fun texLineBreak( cap : matched, _context ) : string {
  (if (cap.groups[1] != "") then "[ ]{margin-bottom:'" + texLength(cap.groups[1]) + "'}" else "") + "&br;"
}

fun texGenericCommand( cap : matched, ctx : texContext ) : string {
  val entity = texCmdToEntity(cap.groups[1])
  if (ctx.texParserBase/ignore) {
    if (cap.groups[2]!="") then "" else entity
  }
  elif (entity.is-empty) then cap.matched else entity
}

fun texGroup( cap : matched, ctx : texContext ) : string {
  val body = parse( cap.groups[1], ctx )
  if (ctx.texParserBase/ignore || body=="") then body else "{" + body + "}"
}

fun texCommandClass( cap : matched, ctx : texContext ) : string {
  "[]{." + cap.groups[1] + "}"
}

fun texAttribute( cap : matched, ctx : texContext ) : string {
  "[]{" + cap.groups[1] + "=\"" + cap.groups[2] + "\"}"
}

fun texAlwaysIgnore( cap : matched, ctx : texContext ) : string {
  ""
}

fun texAlwaysIgnore3( cap : matched, ctx : texContext ) : string {
  cap.groups[3].parse(ctx)
}
fun texAlwaysIgnore4( cap : matched, ctx : texContext ) : string {
  cap.groups[4].parse(ctx)
}
fun texAlwaysIgnore5( cap : matched, ctx : texContext ) : string {
  cap.groups[5].parse(ctx)
}

fun texIgnore( cap : matched, ctx : texContext ) : string {
  if (ctx.texParserBase/ignore) then "" else cap.matched
}

fun texKeep( cap : matched, ctx : texContext ) : string {
  if (ctx.texParserBase/ignore) then "" else cap.matched
}


fun texEntityCmd( cap : matched, _context ) : string {
  val entity = match( texEntities[cap.groups[1]] ) {
    Nothing -> cap.groups[1]
    Just(v) -> v
  }
  "&" + entity + ";"
}


fun texRaw( cap : matched, _context ) : string {
  "\n~ TexRaw\n" + cap.matched + "\n~\n"
}

fun texVSpace( cap : matched, _context ) : string {
  "\n~ Empty { height:'" + texLength(cap.groups[1]) + "' }\n\n~\n"
}

fun texHSpace( cap : matched, _context ) : string {
  "[]{width:'" + texLength(cap.groups[1]) + r"'}"
}

fun texVSkip( cap : matched, _context ) : string {
  "\n~ Empty { height:'" + texLength(cap.groups[1]) + "' }\n\n~\n"
}

fun texHSkip( cap : matched, _context ) : string {
  "[]{width:'" + texLength(cap.groups[1]) + r"'}"
}

fun texSkip( cap : matched, _context ) : string {
  val height = if (cap.groups[1]=="big") then "12pt" elif (cap.groups[1]=="med") then "6pt" else "3pt"
  "\n~ Empty { height:'" + height + "' }\n\n~\n"
}

fun texAlign( s : string ) : string {
  if (s=="l") then "left"
  elif (s=="r") then "right"
  elif (s=="s") then "justify"
  elif (s=="c") then "center"
  elif (s=="") then ""
  else "left"
}

fun texVAlign( s : string ) : string {
  if (s=="c") then "middle"
  elif (s=="t") then "top"
  elif (s=="b") then "bottom"
  elif (s=="") then ""
  else "baseline"
}

fun texMBox( cap : matched, ctx ) : string {
  val attrs = [makeAttr("width", texLength(cap.groups[2])),
               makeAttr("text-align", texAlign(cap.groups[2])),
               if (cap.groups[1].startsWith("f")) then ".framed" else ""].joinAttrs
  val content = cap.groups[4].parse(ctx)
  if (attrs=="") then content else ("[" + content + "]" + attrs)
}

fun texParBox( cap : matched, ctx ) : string {
  val attrs = [makeAttr("width", texLength(cap.groups[5])),
               makeAttr("text-align", texAlign(cap.groups[2])),
               makeAttr("height", texLength(cap.groups[3])),
               makeAttr("vertical-align", texVAlign(cap.groups[4])),
              ].joinAttrs
  "\n~ Parbox " + attrs + "\n" + cap.groups[4].parse(ctx).trimNL + "\n~\n"
}

fun texRaiseBox( cap : matched, ctx ) : string {
  val attrs = [makeAttr("height", texLength(cap.groups[3])),
               makeAttr("vertical-align", texLength(cap.groups[2])),
              ].joinAttrs
  "[" + cap.groups[4].parse(ctx) + "]" + attrs
}


fun texImage( cap : matched, ctx ) : string {
  val kvs0 = cap.groups[2].findAll(rxKeyVal).list.map( fn(kcap) {
              val key = kcap.groups[1]
              val value = kcap.groups[2].unbrace
              if (key=="width") then "width:\"" + texLength(value) + "\""
              elif (key=="height") then "height:\"" + texLength(value) + "\""
              elif (key=="scale") then "transform:\"scale(" + value + ")\""
              elif (key=="angle") then "transform:\"rotate(" + value + "deg)\""
              else ""
             })
  val kvs1 = if (cap.groups[1].is-empty) then [] else [".fragment"]
  val fname = cap.groups[3].unbrace
  val imgname = if (fname.extname=="") then fname + ".eps" else fname
  val imgkey  = imgname.stemname.replaceAll(regex(r"[^\w\-]+"),"")
  "![" + imgkey + "]" + cap.groups[4].parse(ctx) + "\n\n[" + imgkey + "]: "
    + imgname + " \"image title\" { " + (kvs0 + kvs1).join(" ; ") + " }\n"
}


fun texInst( cap : matched, ctx : texContext ) : string {
  val txt = cap.groups[1].unbrace.parse(ctx)
  if (txt=="") then "" else "^" + txt.replaceAll(" ","\\ ") + "^"
}

fun texAcks( cap : matched, ctx : texContext ) : string {
  "\n# Acknowledgements { - }\n\n"
}

fun texToday( cap : matched, ctx : texContext ) : string {
  "&date;"
}

fun texFilename( cap : matched, ctx : texContext ) : string {
  "&filename;"
}

fun texClassCmd( cap : matched, ctx : texContext ) : string {
  "[" + cap.groups[2].parse(ctx) + "]{." + cap.groups[1].toIdentifier + "}"
}


fun parseColor( c : string ) : string {
  val n = c.parseIntDefault(0)
  if (n < 0 || n > 255)
   then "00"
   else n.showHex(2)
}

fun parseFloatColor( c : string ) : string {
  val n = c.parseFixedDefault()
  if (n < 0.0 || n > 1.0)
   then "00"
   else catch({(n * 255.0).floor.int.showHex(2)},fn(_exn) { "00" })
}

fun parseColors(r,g,b) : string {
  "#" + parseColor(r) + parseColor(g) + parseColor(b)
}

fun parseFloatColors(r,g,b) : string {
  "#" + parseFloatColor(r) + parseFloatColor(g) + parseFloatColor(b)
}


fun extractColorX( model : string, value : string ) : string {
  if (model=="") then {
    return value.toIdentifier
  }
  val (r,g,b) = match(value.split(",")) {
    Cons(x,Nil) -> (x,x,x)
    Cons(x,Cons(y,Cons(z,Nil))) -> (x,y,z)
    _ -> ("","","")
  }

  if (model=="gray") {
    parseFloatColors(r,r,r)
  }
  elif (model=="rgb") {
    parseFloatColors(r,g,b)
  }
  elif (model=="RGB") {
    parseColors(r,g,b)
  }
  elif (model=="HTML") {
    "#" + r + g + b
  }
  else "black"
}

fun extractColor( model : string, value : string  ) : list<string> {
  [makeAttr("color",extractColorX(model,value))]
}

fun texTextColor( cap : matched, ctx ) : string {
  val attrs = extractColor(  cap.groups[1], cap.groups[2] )
  "[" + cap.groups[3].parse(ctx) + "]" + attrs.joinAttrs
}

fun texColorBox( cap : matched, ctx ) : string {
  val attrs = [makeAttr("background-color", extractColorX(  cap.groups[2], cap.groups[3] )),
               if (cap.groups[1].is-empty) then "" else ".framed"]
  "[" + cap.groups[3].parse(ctx) + "]" + attrs.joinAttrs
}



fun texEmph( cap : matched, ctx : texContext ) : string {
  val txt = cap.groups[1]
  val end = if (cap.groups[2] != "") then cap.groups[2] else "\\/"
  if (txt=="") then "" else "_" + txt.parse(ctx) + "_" + end
}

fun texSlanted( cap : matched, ctx : texContext ) : string {
  val txt = cap.groups[1]
  if (txt=="") then "" else "[" + txt.parse(ctx) + "]{font-style:oblique}"
}

fun texSmallcaps( cap : matched, ctx : texContext ) : string {
  val txt = cap.groups[1]
  if (txt=="") then "" else "[" + txt.parse(ctx) + "]{font-variant:small-caps}"
}

fun texUpright( cap : matched, ctx : texContext ) : string {
  val txt = cap.groups[1]
  if (txt=="") then "" else "[" + txt.parse(ctx) + "]{font-style:normal}"
}

fun texRoman( cap : matched, ctx : texContext ) : string {
  val txt = cap.groups[1]
  if (txt=="") then "" else "[" + txt.parse(ctx) + "]{font-family:serif}"
}

fun texSans( cap : matched, ctx : texContext ) : string {
  val txt = cap.groups[1]
  if (txt=="") then "" else "[" + txt.parse(ctx) + "]{font-family:sans-serif}"
}


fun texStrong( cap : matched, ctx : texContext ) : string {
  val txt = cap.groups[1]
  val end = if (cap.groups[2] != "") then cap.groups[2] else "\\/"
  if (txt=="") then "" else "**" + txt.parse(ctx) + "**" + end
}

fun texCode( cap : matched, ctx : texContext ) : string {
  val txt = cap.groups[2]
  if (txt=="") then "" else "`" + txt + "`"
}

fun texMonospace( cap : matched, ctx : texContext ) : string {
  val txt = cap.groups[1]
  if (txt=="") then "" else "[" + txt.parse(ctx) + "]{font-family:monospace}"
}


fun texUrl( cap : matched, ctx : texContext ) : string {
  val txt = cap.groups[1].unbrace
  val url = txt.urlEncode
  if (txt=="") then ""
  elif (txt==url) then "<" + txt + ">"
  else ("[" + txt + "](" + txt.urlEncode + ")")
}

fun texUrlPrefix( cap : matched, ctx : texContext ) : string {
  "Available at "
}


fun texDoi( cap : matched, ctx : texContext ) : string {
  val txt = cap.groups[1].unbrace
  val path = match(txt.find( regex(r"^https?://(?:dx\.)?doi\.org/(.*)$"))) {
    Just(capx) -> capx.groups[1]
    Nothing    -> txt
  }
  if (txt=="") then "" else ("[doi:[" + path + "](https://doi.org/" + urlEncode(path) + ")]{.doi}")
}

fun urlEncode(txt) : string {
  txt.replaceAll(rxUrlReserved, fn(cap) {
    cap.matched.list.map( fn(c) { "%" + c.int.showHex(2) } ).join
  })
}

val rxUrlReserved = regex(r#"[\s>)\'\""(<\[\]]"#)

fun texBibinfo( cap : matched, ctx : texContext ) : string {
  "[" + cap.groups[2].parse(ctx) + "]{ .bibinfo; field:\"" + cap.groups[1].unbrace.toLower + "\"}"
}

fun texBblName( cap : matched, ctx : texContext ) : string {
  "&name-" + cap.groups[1] + ";"
}

fun texDquot( cap : matched, ctx : texContext ) : string {
  texQuot("\"",cap,ctx)
}
fun texSquot( cap : matched, ctx : texContext ) : string {
  texQuot("'",cap,ctx)
}
fun texQuot( quot : string, cap : matched, ctx : texContext ) : string {
  quot + cap.groups[1].parse(ctx) + quot
}

fun texTheBibliography( cap : matched, ctx : texContext ) : string {
  "~ Begin Bibliography { " +
    " ; caption:" + cap.groups[1].unbrace.quote +
    (if (ctx.bststyle.bool) then " ; data-style:" + ctx.bststyle.quote else "") +
    " }\n" + (cap.groups[2] + "\n\n").parse(ctx) +
    "\n~ End Bibliography\n"
}

fun texCiteAuthorYear( cap : matched, ctx : texContext ) : string {
  (cap.groups[2] + "," + cap.groups[3] + "," + cap.groups[1]).parse(ctx).replaceAll(rxNl," ")
}

fun texCite( cap : matched, ctx : texContext ) : string {
  // handles various natbib and chicago style citations
  // groups: 1: short? 2: author? 3: year|yearpar?, 4: al?,  5: p or t?, or A?N?P?
  //         6: *?, 7: optarg1, 8: optarg2, 9: citations
  val citations = cap.groups[9].unbrace.split(rxCiteSep)
  val modifier  = if (cap.groups[6]=="*") then "+"
                  elif (cap.groups[2]=="author" || cap.groups[5].contains("A")) then "!"
                  elif (cap.groups[3].startsWith("year") || cap.groups[1]=="short") then "-"
                  else ""
  fun bracket(s) {
    if (cap.groups[3]=="year" || cap.groups[2]=="author" ||
         cap.groups[5] == "t" || cap.groups[5].contains("N"))
     then s else "[" + s + "]"
  }
  val classes = if (cap.groups[4]=="al"||cap.groups[5]=="NP") then "{.free}" else ""

  val (pre,post)
    = if (cap.groups[8]!="") then (cap.groups[7] + " ", "," + cap.groups[8])
       elif (cap.groups[7] != "") then ("","," + cap.groups[7])
       else ("","")

  bracket( pre +  citations.list.map(fn(c){ modifier + "r" + c }).join(";") + post) + classes
}
val rxCiteSep = regex(r", *")

fun texHarvarditem( cap : matched, ctx : texContext ) : string {
  val key  = cap.groups[4]
  val year = "(" + cap.groups[3] + ")"
  val lab  = if (cap.groups[1]!="")
              then cap.groups[1] + year + cap.groups[2]
              else cap.groups[2] + year
  val content = cap.groups[5]
  ctx.makeBibitem(key,lab,content)
}

fun texBibitemCiteApa( cap : matched, ctx : texContext ) : string {
  val authors = cap.groups[1].unbrace
  val year = cap.groups[2].unbrace
  val labx  = authors + "(" + year + ")"
  ctx.makeBibitem( cap.groups[3], labx, cap.groups[4] )
}

fun texBibitemCiteName( cap : matched, ctx : texContext ) : string {
  val authors = cap.groups[1].unbrace.replace(regex(r",\s*$"),"")
  val year = cap.groups[2].unbrace
  val labx  = authors + "(" + year + ")"
  ctx.makeBibitem( cap.groups[3], labx, cap.groups[4] )
}

fun texBibitemCiteAuthorYear( cap : matched, ctx : texContext ) : string {
  val authorsLong = cap.groups[1].unbrace.replaceAll(rxSpaces," ")
  val authorsShort= cap.groups[2].unbrace.replaceAll(rxSpaces," ")
  val year = cap.groups[3].unbrace
  val labx  = authorsLong + "(" + year + ")" + authorsShort
  ctx.makeBibitem( cap.groups[4], labx, cap.groups[5] )
}

fun texBibitem( cap : matched, ctx : texContext ) : string {
  ctx.makeBibitem( cap.groups[2], cap.groups[1], cap.groups[3] )
}

fun makeBibitem( ctx : texContext, keyx : string, labx : string, content : string ) : string {
  val key = (if (ctx.name.is-empty) then "" else ctx.name + ":") + keyx.unbrace
  val lab = labx.unbrace.parse(ctx)
  val md  = content.parse(ctx)
  val (authors,title) = match(md.find(rxAuthorTitle)) {
              Just(cap) -> (cap.groups[1],cap.groups[2])
              Nothing   -> ("",md)
            }
  val caption = (authors + "\n" + title).replaceAll(rxNewblock,"&nl;").replaceAll("\n"," ").replaceAll(rxSpaces," ").trim
                /*
                .replaceAll("\n"," ").replaceAll("'","&apos;").replaceAll("\\","&bslash;")
                .replaceAll(rxSpaces," ").trim
                */

  val search  = (title + "+" + authors).replaceAll(rxNonSearch," ").replaceAll(rxSpaces,"+")

  val attrs0  = match(lab.find(rxAuthorYear)) {
                  Nothing -> if (lab=="") then [] else [
                    makeAttr("cite-label", lab),
                    makeAttr("tex-bibitem-label", "[" + labx.unbrace + "]")
                  ]
                  Just(cap) -> [
                    makeAttr("cite-year", cap.groups[2]),
                    makeAttr("cite-authors", cap.groups[1]),
                    makeAttr("cite-authors-long", cap.groups[3])
                  ]
                }

  val attrs1  = [makeAttr("id", key.definitionId),
                 // makeAttr("cite-info", lab ),
                 makeAttr("tex-cite-label", labx.unbrace ),
                 //if (lab!="") then makeAttr("tex-bibitem-label", "[" + labx.unbrace + "]") else "",
                 //makeAttr("label", label),
                 makeAttr("caption", caption),
                 makeAttr("searchterm", search ),
                 makeAttr("spellcheck","false")]

  val attrs = (attrs0 + attrs1).joinAttrs

  "~ Begin Bibitem " + attrs + "\n" +
   md +
   "\n~ End Bibitem\n"
}

val rxAuthorYear = regex(r"((?:[^&\\\()]|\\.|\\mbox\{\.\}|&#?\w+;|[\\&])*)(?:[,;](?: |&nbsp;|\\ )*\(?|(?: |&nbsp;|\\ )*\()(\d\d\d\d[\w\-]*)?\)?(?: *[,;] *)?([\s\S]*)$")

val rxNewblock = regex(r"\[\s*\]\{\s*\.newblock\s*\}\s*")
val rxSpaces = regex(r"\s+")
val rxNonSearch = regex(r"(&#?\w+;|\]\{[^\}]*\}|[^\w\+\-])+|\b(?:\d\w+|[\w\+\-]{1,3}\b)")

val rxAuthorTitle = regex(r"^\s*(.*?(?:\n?\[\]\{\.newblock\}\s*))(.*?)(?:\n?\[\]\{\.newblock\})")
