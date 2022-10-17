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
module texParserBase

import compat/dict
import compat/string
import compat/regex
import compat
import compat/path
import common
import entity
import texCommon

/* --------------------------------------
 The ctx for latex elements
---------------------------------------- */
pub alias texRule = rule<string,texContext>

pub rec type texContext {
  // The parse ctx for latex elements.
  TexContext( grammar   : grammar<string,texContext>, 
              bststyle  : string,
              ignore    : bool = True,
              name      : string = "",
              texparse  : (ctx:texContext, input:string) -> <div> string )
}


pub fun parse( txt : string, ctx : texContext ) : <div> string
{
  (ctx.texparse)(ctx,txt)
}


pub val special = r"\\{}~*_\[\]#\$`%\n\-";

pub val texargg = r"(?:\{" + texargs + r"\})"

pub val overlay = r"(?:<([^>\n]*)>)"

/* don't include these as packages */
pub val stdPackages = ["iftex","etoolbox","xkeyval","xcolor","mdframed","graphicx","tablefootnote",
                   "css","array","longtable","enumitem","booktabs","hyperref","pdfcomment","wrapfig","madoko",
                   "amsmath","amsfonts","amssymb","stmaryrd","textcomp","pifont",
                   // the following should really not be included as they clash with the standard ones
                   "inputenc","fontenc","ae","aecompl","enumerate",
                   // the next ones are just superfluous
                   "color",
                  ].join(";")

pub fun unbrace(s : string ) : string {
  if (s.startsWith("{") &&  (s.indexOf("}") == s.length - 1))
   then s.substr(1,s.length - 2) else s
}


pub fun quote( s : string ) : string {
  val hasdquot = s.contains("\"")
  val hassquot = s.contains("\'")
  if (s.contains("\"")) then {
    if (s.contains("\'"))
     then "\"" + s.replaceAll("\"","&quot;") + "\""
     else "'" + s + "'"
  }
  else "\"" + s + "\""
}

pub fun indent4( txt : string ) : string {
  txt.split("\n").map(fn(s) { "    " + s }).join("\n")
}


pub val rxNl = regex(r"\r?\n")

pub fun makeAttr( key : string, value : string ) {
  if (value=="")
   then ""
   else key + ":" + value.replaceAll(rxNl,"&nl;").quote
}

pub fun joinAttrs( keyvals : list<string> ) {
  val kvs = keyvals.remove(is-empty).join(" ; ")
  if (kvs=="") then "" else "{ " + kvs + " }"
}

pub fun singleAttr( key : string, value : string ) : string {
  [makeAttr(key,value)].joinAttrs
}

pub fun trimx( s : string, n : int ) : string {
  s.substr(n,s.length - (2*n))
}

pub fun trimNL( s : string ) : string {
  s.replaceAll(rxNL0,"")
}

val rxNL0 = regex(r"^[ \t]*\r?\n|\r?\n$")


/* --------------------------------------
 Latex document
---------------------------------------- */

struct mRule(
  regex: regex,
  keys  : list<string>,
  values: (cap:matched, ctx: texContext ) -> <div> list<string>,
  replacer: (cap:matched) -> string
)


val metadataGrammar = [
  MRule(regex(r"% *\\"), [], metaNone, metaAddSpace ),
  MRule(regex(r"\\usepackage\b\s*" + optarg + r"?\s*" + texarg), ["Package"], metaOptionValue, metaEmpty ),
  MRule(regex(r"\\title\b\s*" + texargg), ["Title"], metaTexValue, metaEmpty ),
  MRule(regex(r"\\subtitle\b\s*" + texargg), ["Sub Title"], metaTexValue, metaEmpty ),
  MRule(regex(r"\\date\b\s*" + texargg), ["Title Note"], metaTexValue, metaEmpty ),
  MRule(regex(r"\\bibliographystyle\b\s*" + texargg), ["Bib Style"], metaValueBibStyle, metaEmpty ),
  MRule(regex(r"\\bibliography\b\s*" + texargg), ["Bibliography"], metaValueBib, metaKeep ),
  MRule(regex(r"\\authorinfo\b\s*" + texargg + r"\s*" + texargg + r"\s*" + texargg), ["Author","Address","Email"], metaTexValue3, metaEmpty ),
  MRule(regex(r"\\(?:IEEEauthorblockN)\b\s*" + texargg), ["Author"], metaTexValue, metaEmpty ),
  MRule(regex(r"\\(?:IEEEauthorblockA)\b\s*" + texargg), ["Address"], metaTexValue, metaEmpty ),
  MRule(regex(r"\\(?:author)\b\s*" + texargg), ["Author"], metaTexValue, metaEmpty ),
  MRule(regex(r"\\(?:address)\b\s*" + texargg), ["Address"], metaTexValue, metaEmpty ),
  MRule(regex(r"\\email\b\s*" + texargg), ["Email"], metaTexValue, metaEmpty ),
  MRule(regex(r"\\(?:institute|affiliation|affaddr)\b\s*" + texargg), ["Affiliation"], metaTexValue, metaEmpty ),
  MRule(regex(r"\\authorrunning\b\s*" + texargg), ["Author Running"], metaTexValue, metaEmpty ),
  MRule(regex(r"\\titlerunning\b\s*" + texargg), ["Title Running"], metaTexValue, metaEmpty ),
]


fun metaEmpty( cap : matched ) : string {
  " "
}

fun metaKeep( cap : matched ) : string {
  cap.matched
}

fun metaAddSpace( cap : matched ) : string {
  cap.matched + " "
}

fun metaNone( _cap : matched, _context ) : list<string> {
  []
}


fun metaValue( cap : matched, _context ) : list<string> {
  [cap.groups[1].unbrace]
}

fun metaValueBibStyle( cap : matched, _context ) : list<string> {
  val style = cap.groups[1].unbrace.trim
  [(if (style=="plain") then "plainnat" else style)]
}

fun metaValueBib( cap : matched, _context ) : list<string> {
  val bibs = cap.groups[1].unbrace.trim.split(",")
  [bibs.join(";")]
}



fun metaTexValue( cap : matched, ctx ) : <div> list<string> {
  [cap.groups[1].parse(ctx)]
}

fun metaTexValue3( cap : matched, ctx ) : <div> list<string> {
  list(1,3).map(fn(i) { cap.groups[i].parse(ctx) })
}

fun metaOptionValue( cap : matched, _context ) : list<string> {
  val pkg = cap.groups[2].unbrace.trim
  if (stdPackages.contains(pkg)) then return []
  [(if (cap.groups[1].is-empty) then "" else "[" + cap.groups[1] + "]") + cap.groups[2].unbrace.trim]
}


fun texMeta( key, value ) {
  val rvalue = value.unbrace.replaceAll(rxMetaNL, "\n    ").trim
  if (rvalue=="")
   then ""
   else key.unbrace.fill(12) + ": " + rvalue
}
val rxMetaNL = regex(r"\r?\n(?:[ ]{1,4}|\t)?")

fun removeSections( txt : string ) : string {
  txt.replaceAll(rxSection,"")
}
val rxSection = regex(r"\\(sub)?section\b\*?\s*" + optarg + r"?" + texarg + r"\s*")

pub fun texDocClass( cap : matched, ctx : texContext ) : <div> string {
  val docClass = cap.groups[2].unbrace.trim
  val comment  = [ "<!-- LaTeX conversion",
                   "  Drag&Drop further .tex/.bib/.cls/.sty/.bst or image files in the editor window",
                   "  Conversion reference at: http://research.microsoft.com/en-us/um/people/daan/madoko/doc/reference.html#texconv",
                   "-->"
                 ].join("\n")
  val mdata0 = if (docClass=="beamer")
                then ["[INCLUDE=presentation]","Reveal Theme: sky"]
                else compat/zipWith(["Doc Class"], metaOptionValue(cap,ctx), texMeta)
  val (mdata1,content0) = extractMeta( cap.groups[3], ctx, mdata0 )
  val mdata2 = mdata1 + [if (docClass == "book") then "" else "Heading Base: 2","Logo        : True"]
  val content = if (docClass=="beamer") then content0.removeSections else content0
  val (body,mdata) = match(content.find(rxDocument)) {
    Nothing    -> (content.parse(ctx), mdata2)
    Just(ccap) -> {
      val header = ccap.groups[1].trim
      val hdata = if (header.is-empty) then []
                   else [["TeX Header  :\n    % Latex definitions. If you get errors in math- or PDF generation:",
                          "    % * Move commands that are not used in math under 'Tex Header*' metadata",
                          "    % * Move commands specific to math in a '~ MathDefs' block",
                          "    ",
                          header.trim.indent4].join("\n")] //
                       //"\n<!-- LaTeX definitions; use ~ MathDefs for commands needed for mathematics -->" +
                       //"\n~ TexRaw\n" + header + "\n~\n\n"
      (ccap.groups[2].parse(ctx), [comment] + mdata2 + hdata)
    }
  }
  mdata.join("\n") + "\n\n" + body
}
val rxDocument = regex(r"^([\s\S]*?)\n *\\begin{document}([\s\S]*?)\n *\\end{document}" )

fun extractMeta( text0 : string, ctx, mdata0 : list<string> ) : <div> (list<string>,string) {
  var mdata := mdata0
  val content = metadataGrammar.foldl( text0, fn(text,mrule) {
    text.replaceAll(mrule.regex, fn(cap) {
      val metas = compat/zipWith(mrule.keys,(mrule.values)(cap,ctx),texMeta)
      mdata := mdata + metas
      (mrule.replacer)(cap)
    })
  })
  (mdata, content)
}
