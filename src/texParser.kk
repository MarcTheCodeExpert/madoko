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
module texParser

import compat/dict
import compat/string
import compat/regex
import compat
import compat/path
import common
import entity
import texCommon
import texParserBase
import texParserItems

/* --------------------------------------
  Latex grammar
---------------------------------------- */


/* Use TexRaw for the following commands */
val texRawCmd0 = r"(vfill|balance|leavevmode)"
val texRawCmd1 = r"((?:this)pagestyle)"
val texRawCmd2 = r"(markboth)"

/* keep these commands as is.. */
val texKeep2   = r"newcommand|defcommand|renewcommand|def|edef|gdef|providecommand"

/* ignore the following commands alwyas (and keep last argument) */
val texenv0  = r"(document)"
val texenv1  = r"(thebibliography)"
val texignore0 = r"relax"
val texignore1 = r"protect|date"
val texignore2 = r"scalebox"
val texignore3 = r"multirow|resizebox"

/* ignore the following commands and environments in bibliographies*/
val texcmd1  = r"(begin|end|newlength|setlength|bibfield|BibitemShut)"
val texcmd2  = r"(newcommand|renewcommand|providecommand|bibitemdeclare)"

val texenvcaption = "block|alertblock|exampleblock"

val bibitemBody = r"(?: *\n)*([\s\S]*?)\n(?= *\n|\\bibitem)"

val eol = r"(?:[ \t]*(?:%.*)?\r?\n)?"

/* main grammar */
val texGrammar : grammar<string,texContext> = [
  Rule("texnormal",   regex(r"^(?:[^" + special + "])+"), texNormal ),
  Rule("texspaces",   regex(r"^\n {4,}"), texIndent ),

  /* Documents */
  Rule("texdocclass", regex(r"^\\documentclass\b\s*" + optarg + r"?\s*" + texarg + r"([\s\S]*)"), texDocClass ),

  /* Block elements */
  Rule("texsection",  regex(r"^\\" + texsect + r"\b(\*)?\s*" + optarg + "?" + texarg + r"(?:\s*\\label\b" + texarg + r")?" ), texSection ),

  Rule("texcomment1", regex(r"^\\begin{comment}([\s\S]*?)\\end{comment}"), texComment ),
  Rule("texcomment2", regex(r"^(\n *%.*\n(?: *%.*\n)*)"), texComment),
  Rule("texlcomment", regex(r"^(%.*)"), texComment),
  Rule("texfigure",   regex(r"^\\begin{(figure|table)(\*)?}" + optarg + r"?([\s\S]*?)\\end{\1\*?}"), texCaptioned ),
  Rule("texwfigure",  regex(r"^\\begin{wrapfigure}" + optarg + texarg + texarg + r"?([\s\S]*?)\\end{wrapfigure}"), texWrapFigure ),
  Rule("texlabeled",  regex(r"^\\begin{(definition|lemma|theorem|proposition|corollary|proof|example|thm|dfn)(\*)?}" + optarg + r"?([\s\S]*?)\\end{\1\*?}"), texLabeled ),
  Rule("textabularx", regex(r"^\\begin\{(tabular[xy\*])\}\s*" + optarg + r"?\s*" + texarg + r"\s*" + texarg + r"([\s\S]*?)\\end\{\1\}"), texTabularX ),
  Rule("textabular",  regex(r"^\\begin{tabular}\s*" + optarg + r"?\s*" + texarg + r"([\s\S]*?)\\end{tabular}"), texTabular ),

  Rule("texitemp",    regex(r"^(?:[ \t]*\r?\n)*\\pause\b\s*" + optarg + r"?\s*" + r"\\item\b\s*" + overlay + "?" + optarg + r"?\s*"), texItemPause ),
  Rule("texitem",     regex(r"^(?:[ \t]*\r?\n)*\\item\b\s*" + overlay + "?" + optarg + r"?\s*"), texItem ),
  Rule("texlist",     regex(r"^\\begin\{(itemize|enumerate)\}\s*" + optarg + r"?\s*((\\pause\b\s*)?\\item\b\s*" + overlay + "?" + optarg + r"?\s*)?"), texList ),
  Rule("texendlist",  regex(r"^\\end\{(itemize|enumerate)\}\s*"), texEmptyLine ),

  Rule("texlisting",  regex(r"^\\begin\{(lstlisting|verbatim|code|alltt)\}\s*" + optarg + r"?([\s\S]*?)\\end\{\1\}\s*"), texListing ),

  Rule("texnoindent", regex(r"^\\noindent\b([\s\S]*?\n) *\n"), texNoIndent ),
  Rule("texvspacex",  regex(r"^\\vspace\b\*?\s*" + texarg + r"(?=(?:\s|%.*)*[^\\\{\s])([\s\S]*?\n) *(?=\n|\\(?:end|item|begin|noindent)\b)"), texVSpacePara ),

  Rule("texminipage", regex(r"^\\begin{minipage}\s*" + optarg + "?" + optarg + "?" + optarg + "?" + texarg ), texBeginMinipage ),
  Rule("texvspace",   regex(r"^\\vspace\b\*?\s*" + texarg), texVSpace ),
  Rule("texhspace",   regex(r"^\\hspace\b\*?\s*" + texarg), texHSpace ),
  Rule("texskip",     regex(r"^\\(?:big|med|small)skip\b\s*" + texarg), texSkip ),
  Rule("texmbox",     regex(r"^\\(m|make|f|frame)box\b\s*" + optarg + "?" + optarg + "?" + texargg ), texMBox ),
  Rule("texparbox",   regex(r"^\\(par)box\b\s*" + optarg + "?" + optarg + "?" + optarg + "?" + texargg + texargg), texParBox ),
  Rule("texraisebox", regex(r"^\\(raise)box\b\s*" + texargg + optarg + "?" + optarg + "?" + texargg ), texRaiseBox ),
  Rule("texvskip",    regex(r"^\\vskip\b\s*" + texdim), texVSkip ),
  Rule("texhskip",    regex(r"^\\hskip\b\s*" + texdim), texHSkip ),

  /* beamer */
  Rule("texframe",    regex(r"^\\begin{(?:frame|slide)}\s*" + overlay + "?" + optarg + "?" + texargg + r"?\s*" + texargg + "?" + r"([\s\S]*?)\\end{frame}"), texFrame ),
  Rule("texframeCmd", regex(r"^\\frame\b\s*" + overlay + "?" + optarg + "?" + texargg), texFrameCmd ),
  Rule("texcolumn",   regex(r"^\\begin{column}\s*" + texargg), texColumn ),
  Rule("texonly",     regex(r"^\\(uncover|only|visible)\b\s*" + overlay + "?" + texargg), texUncover ),
  Rule("texbcblock",  regex(r"^\\begin{(" + texenvcaption + r")}\s*" + overlay + "?" + texargg), texBeginCaptionBlock ),
  Rule("texecblock",  regex(r"^\\end{(" + texenvcaption + r")}"), texEndCaptionBlock ),

  /* Specials */
  Rule("texinclude",  regex(r"^\\(include(?:only)?|input)\b\s*" + texarg + eol), texInclude ),
  Rule("textitle",    regex(r"^\\(?:maketitle|titlepage)\b" + eol), texMakeTitle ),
  Rule("texbib",      regex(r"^\\bibliography\b\s*" + texarg), texBibliography ),

  Rule("texclear",    regex(r"^\\(pagebreak|newpage|clearpage)\b\s*"), texPageBreak ),
  Rule("texappendix", regex(r"^\\appendix\b\s*"), texAppendix ),
  Rule("textoc",      regex(r"^\\tableofcontents\b\s*"), texToc ),
  Rule("textof",      regex(r"^\\tableoffigures\b\s*"), texTof ),
  Rule("texfootnote", regex(r"^\\footnote\b\s*" + texargg + r"([\s\S]*?)\n[ \t\r]*\n"), texFootnote),
  Rule("teximg",      regex(r"^\\includegraphics\b\s*" + overlay + "?" + optarg + "?" + texargg + r"([\s\S]*?)(?:\n[ \t\r]*\n|$)"), texImage ),
  Rule("texacks",     regex(r"^\\acks\b\s*"), texAcks ),
  Rule("textoday",    regex(r"^\\today\b\s*"), texToday ),
  Rule("texfname",    regex(r"^\\currfilename\b\s*"), texFilename ),

  /* Common inline elements */
  Rule("texref",      regex(r"^(~)?\\ref\b" + texargg), texRef ),
  Rule("texverb",     regex(r"^\\(?:verb|lstinline)\*?([!\+%\|\.\^#r])(.*?)\1"), texCode ),

  Rule("texmath1",    regex(r"^(?:\$(?:[^\\\$]|\\.)+\$|\\\((?:[^\\]|\\[^\)])*\\\))"), texMathInline ),
  Rule("texmath2",    regex(r"^(?:\$\$(?:[^\\\$]|\\.|\$(?!\$))*\$\$|\\\[(?:[^\\]|\\[^\]])*\\\])"), texMathDisplay ),
  Rule("texmathenv1",  regex(r"^\\begin\{(equation|displaymath)(\*)?\}([\s\S]*?)\\end{\1\2}"), texMathEnv ),
  Rule("texmathenv2",  regex(r"^\\begin\{(gather|align|alignat|multline|eqnarray|flalign)(\*)?\}" + texarg + r"?([\s\S]*?)\\end{\1\2}"), texMathSnippet ),
  Rule("textikz1",     regex(r"^\\begin\{tikzpicture\}([\s\S]*?)\\end{tikzpicture}"), texTikzEnv ),
  Rule("textikz2",     regex(r"^\\tikz\b\s*" + optarg + r"?\s*" + texarg), texTikzCmd ),

  Rule("biblio",      regex(r"^\\begin\{thebibliography\}\s*(?:\{([^}]+)\})?(?: *\n)*([\s\S]*?)\\end{thebibliography}"), texTheBibliography ),
  Rule("bibitemcite1", regex(r"^\\bibitem\[(?:\\protect *)?\\citename" + texarg + r"(\d+)\]" + texarg + bibitemBody), texBibitemCiteName),
  Rule("bibitemcite2", regex(r"^\\bibitem\[(?:\\protect *)?\\astroncite" + texarg + texarg + r"\]" + texarg + bibitemBody), texBibitemCiteApa),
  Rule("bibitemcite3", regex(r"^\\bibitem\[(?:\\protect *)?\\citeauthoryear" + texarg + texarg + texarg + r"?\](?:%.*\s*)?" + texarg + bibitemBody), texBibitemCiteAuthorYear),
  Rule("bibitem",     regex(r"^\\bibitem\b\s*" + optarg + "?" + texarg + bibitemBody), texBibitem ),
  Rule("harvarditem", regex(r"^\\harvarditem\b\s*" + optarg + "?" + texarg + texarg + texarg + r"(?: *\n)*([\s\S]*?)\n *\n"), texHarvarditem ),

  Rule("newblock",    regex(r"^\\(newblock|nobreak)\b"), texCommandClass ),
  Rule("citeay",      regex(r"^\\citeauthoryear\b" + texarg + texarg + texarg), texCiteAuthorYear ),
  Rule("url",         regex(r"^\\(?:url|email)\b" + texarg), texUrl ),
  Rule("penalty",     regex(r"^\\(penalty)(?![a-zA-Z])\s*(-?\d+|" + texarg + ")"), texAttribute ),
  Rule("doi",         regex(r"^\\doi\b" + texarg), texDoi ),
  Rule("urlprefix",   regex(r"^\\urlprefix\b"), texUrlPrefix ),
  Rule("cite",        regex(r"^\\(short)?[Cc]ite(?:(author)|(year(?:par)?)|(al)?([pt]|A?N?P?)?(\*)?)\b" + optarg + "?" + optarg + "?" + texarg), texCite),
  Rule("bibinfo",     regex(r"^\\bibinfo\b\s*" + texarg + r"\s*" + texarg), texBibinfo ),
  Rule("bblname",     regex(r"^\\bbl([a-z]+)\b\s*"), texBblName ), // for custom-bib international bst styles
  Rule("showISSN",    regex(r"^\\show(ISSN|LCCN|CODEN|DOI|ISBN(?:[a-z]*)?|note|articletitle)\b\s*" + texarg), texBibinfo ),
  Rule("showDOI",     regex(r"^\\urldef\\tempurl" + eol + r"\\url" + eol + texarg + eol + r"\\showDOI\{\\tempurl\}"), texDoi ),

  Rule("texsl",       regex(r"^\{\\(?:text)?sl\b" + texargs + r"\}"), texSlanted ),
  Rule("texsl2",      regex(r"^\\{\\slshape\b\s*" + texargs + r"\}"), texSlanted ),
  Rule("texsc",       regex(r"^\\textsc\b\s*" + texarg), texSmallcaps ),
  Rule("texsc2",      regex(r"^\{\\sc(?:shape)?\b\s*" + texargs + r"\}"), texSmallcaps ),
  Rule("texit",       regex(r"^\\(?:textit|emph)\b\s*" + texarg), texEmph ),
  Rule("texit2",      regex(r"^\{\\(?:itshape|em|it)\b\s*" + texargs + r"\}(\s)?"), texEmph ),
  Rule("texbf",       regex(r"^\\textbf\b\s*" + texarg), texStrong ),
  Rule("texbf2",      regex(r"^\{\\bfseries\b\s*" + texargs + r"\}(\s)?"), texStrong ),
  Rule("texcode",     regex(r"^\\(code|verb|lstinline)\b\s*" + texarg), texCode ),
  Rule("textt1",      regex(r"^\\texttt\b\s*" + texarg), texMonospace ),
  Rule("textt2",      regex(r"^\{\\tt(?:family)?\b\s*" + texargs + r"\}"), texMonospace ),
  Rule("texup",       regex(r"^\\textup\b" + texargs + r"\}"), texUpright ),
  Rule("texup2",      regex(r"^\\{\\upshape\b\s*" + texargs + r"\}"), texUpright ),
  Rule("texrm1",      regex(r"^\\textrm\b\s*" + texarg), texRoman ),
  Rule("texrm2",      regex(r"^\{\\rmfamily\b\s*" + texargs + r"\}"), texRoman ),
  Rule("texsf1",      regex(r"^\\textsf\b\s*" + texarg), texSans ),
  Rule("texsf2",      regex(r"^\{\\sffamily\b\s*" + texargs + r"\}"), texSans ),
  Rule("texquote",    regex(r"^\\enquote\b\s*" + texarg), texDquot ),
  Rule("texccmd",     regex(r"^\\(alert)\b\s*" + texarg), texClassCmd ),
  Rule("texeol",      regex(r"^\\\\" + optarg + "?"), texLineBreak ),
  Rule("texcolor1",   regex(r"^\\(?:text|cell)color\b\s*" + optarg + "?" + texargg + texargg), texTextColor ),
  Rule("texcolor2",   regex(r"^\{\s*\\color\b\s*" + optarg + "?" + texargg + texargs + r"\}"), texTextColor ),
  Rule("texcolor3",   regex(r"^\\(f)?colorbox\b\s*" + optarg + "?" + texargg + texargg), texColorBox ),

  Rule("texinst",     regex(r"^\\(?:inst|IEEEauthorrefmark|etalchar)\b\s*" + texarg), texInst ),


  Rule("texsize",     regex(r"^\{\\(" + texFontSizes + r")\b\s*" + texargs + r"\}"), texFontSize ),
  Rule("texaccent",   regex(r#"^\\([`'^""~]|[vrc]\b)\s*"# + texarg), texAccent ),
  Rule("texdash",     regex(r"^---?"), texDash ),

  // Rule("texchar",     regex(r"^\\(" + rxtexchar + r")\b"), texChar ),
  Rule("texitcmd",    regex(r"^\\/"), texIgnore ),

  Rule("texdquot",    regex(r"^``((?:[^'\\\n]|\\.|'(?!'))*)''"), texDquot ),
  Rule("texsquot",    regex(r"^`((?:[^'\\\n]|\\.)*)'"), texSquot ),
  Rule("texdquot1",   regex(r"^``"), texOther ),

  Rule("texrule",     regex(r"^\\rule\b\s*" + optarg + "?" + texarg + texarg ), texRule ),

  /* environments */
  Rule("texenv0",     regex(r"^\\begin\{" + texenv0 + r"\}\s*" + optargs), texAlwaysIgnore ),
  Rule("texenv1",     regex(r"^\\begin\{" + texenv1 + r"\}\s*" + optargs + texarg), texAlwaysIgnore ),
  Rule("texenvx",     regex(r"^\\end\{(?:" + texenv0 + "|" + texenv1 + r")\}\s*"), texAlwaysIgnore ),

  Rule("texkeep2",    regex(r"^\\(" + texKeep2 + r")\b\*?\s*" + optargs + texarg + optargs + texarg), texKeep ),

  Rule("texignore3",  regex(r"^\\(" + texignore3 + r")\b\s*" + optargs + texargg + texargg + texargg), texAlwaysIgnore5 ),
  Rule("texignore2",  regex(r"^\\(" + texignore2 + r")\b\s*" + optargs + texargg + texargg), texAlwaysIgnore4 ),
  Rule("texignore1",  regex(r"^\\(" + texignore1 + r")\b\s*" + optargs + texarg), texAlwaysIgnore3 ),
  Rule("texignore0",  regex(r"^\\(" + texignore0 + r")\b\s*" + optargs), texAlwaysIgnore ),

  Rule("texenvbegin", regex(r"^\\begin\{([a-zA-Zr]+)(\*)?\}\s*" + overlay + "?" + optarg + r"?\s*"), texEnvBegin),
  Rule("texenvend",   regex(r"^\\end\{([a-zA-Zr]+)\*?\}\s*"), texEnvEnd),


  /* Catch all's */
  Rule("texifx",      regex(r"^\\ifx\b[\s\S]*?\\fi\b"), texIgnore ), // some bib styles generate this (acm-reference-format.bst)
  Rule("texcsname",   regex(r"^\\csname\b[\s\S]*?\\endcsname\b"), texIgnore),

  Rule("texentity",   regex(r"^\\" + texEntityCmd0 + r"\b\s*"), texEntityCmd ),

  Rule("texraw0",     regex(r"^\\" + texRawCmd0 + r"\b\s*" + optargs), texRaw ),
  Rule("texraw1",     regex(r"^\\" + texRawCmd1 + r"\b\s*" + optargs + texarg), texRaw ),
  Rule("texraw2",     regex(r"^\\" + texRawCmd2 + r"\b\s*" + optargs + texarg + texarg), texRaw ),

  Rule("texgroup",    regex(r"^\{" + texargs + r"\}" ), texGroup ),
  Rule("texcmd2",     regex(r"^\\(" + texcmd2 + r")\b\s*" + optargs + texarg + optargs + texarg), texIgnore ),
  Rule("texcmd1",     regex(r"^\\(" + texcmd1 + r")\b\s*" + optargs + texarg), texIgnore ),
  Rule("texcmd",      regex(r"^(\\[a-zA-Z@]+)\b\s*(" + optargs + ")"), texGenericCommand ),

  Rule("texchar",     regex(r"^\\[^a-zA-Z]"), texChar ),

  Rule("texother",    regex(r"^[\s\S]"), texOther ),
]

/* --------------------------------------
  Parse TeX  elements
---------------------------------------- */


// Parse TeX elements and return Markdown
pub fun parseTex( txt : string, id: string = "", bststyle: string = "", verbose : bool = False, ignore : bool = True  ) : <div> string
{
  val normTxt = txt.replaceAll(regex(r"\r\n?"),"\n").replaceAll(regex(r"\t"),"   ")
  val md = contextParse(TexContext(texGrammar,bststyle,ignore,id,contextParse), normTxt)
  if (verbose) then trace( "TeX to Markdown:\n" + md )
  md
}

fun contextParse( ctx : texContext, txt : string ) : <div> string {
  if (txt=="") then "" else {
    parseTexAcc(ctx,builder(), txt.unbrace)
  }
}

fun parseTexAcc( ctx : texContext, acc : builder<h>, txt : string ) : <div,st<h>> string
{
  if (txt=="") return acc.build
  val (s,next,_) = matchRules(ctx.grammar,ctx,txt,id)
  parseTexAcc(ctx, acc.append(s), txt.substr1(next))
}
