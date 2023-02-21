/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Common types and operations
module common

import compat/log
import compat/dict
import std/os/path
import compat/regex
import compat
import stringcompat




// Warning messages get logged
pub fun warning( message : string, logname : string = "warning" ) : () {
  log(logname,"  warning: " + message)
}

pub fun logLocation( lineInfo: string, logname : string = "warning" ) : () {
  log(logname,"  location: " + lineInfo)
}

pub type peano {
  Succ(prev:peano)
  Zero
}

pub fun peano(n : int ) : peano {
  var p := Zero
  repeat(n) {
    p := Succ(p)
  }
  p
}

pub val peano10= peano(10)
pub val peanoN = peano(100)

pub fun json(s : string) : string {
  val cs = s.list.map fn(c) {
    if (c=='\n') then "\\n"
    elif (c=='\r') then "\\r"
    elif (c=='\t') then "\\t"
    elif (c=='"') then "\\\""
    elif (c=='\\') then "\\\\"
    elif (c >= ' ' && c <= '~') then c.string
    else "\\u" + c.int.showHex(4)
  }
  return "\"" + cs.join + "\""
}

/* --------------------------------------
  Grammar rules
---------------------------------------- */

// A grammar rule. When "regex" matches, "action" is called with the
// capture groups and the a parser context ":c". The action returns
// results of type ":a" (":block" for the block grammar, and ":string"
// for the inline grammar)

pub struct rule<a :: V,e :: E> (
    name : string,
    regex : regex,
    action: (cap: matched) -> e a 
)

 

pub alias grammar<a :: V,e :: E> = list<rule<a,e>>

// Replace a rule in a grammar by another one, if the rule name is a prefix of the name of the new rule.
pub fun ruleReplace( grammar : grammar<a,e>, pred : bool, rule : rule<a,e> ) : grammar<a,e> {
  if (!pred)
   then grammar
   else grammar.map fn(r) {
     if (rule.name.startsWith(r.name)) then rule else r
   }
}

pub fun ruleRemove( grammar : grammar<a,e>, pred : bool, names : list<string> ) : grammar<a,e> {
  if (!pred) then return grammar
  grammar.filter fn(rule) {
    names.all( fn(nm) { !(rule.name.startsWith(nm)) })
  }
}
// does not get called at allS
/*
// Combine rules into one regular expression.
// For inline expressions, this does not improve the performance much.
pub fun combineRules( rules : list<rule<a,e>> ) : <exn|e> rule<a,e> {
  val (rxs,lactions) = rules.map( fn(rule) { (rule.regex.source, rule.action) }).unzip
  val actions = lactions.vector
  val rx = regexAlt(rxs)
  Rule("<combined>",rx,fn(cap : matched) {
    val i = max(0,cap.groups.alternative)
    actions[i](cap)
    //unsafe-total{ actions[i](cap) }
  })
}
*/

/* --------------------------------------
  Generic rule matcher
---------------------------------------- */

// Generic rule matcher: takes a list of rules and applies the action that matches
// on the given "src". Returns the result of the action and the string following the
// match.
pub fun matchRules( rules : grammar<a,e>, src : string, def : string -> a ) : e (a,int,string)
{
  match(rules) {
    Nil -> {
      //trace("Unable to match any rule!")
      val matched = src.substr(0,1)
      (def(matched), 1, matched) //src.substr(1))
    }
    Cons(rule,rulesNext) -> {
      match (src.find(rule.regex)) {
        Just(cap) -> {
          //if (rule.name[0] != '.') then trace("match: " + rule.name.fill(12) + ": " + cap.matched.show )
          // Uncomment the next line to get a histogram of rule matches
          // ruleInc(rule.name)
          ((rule.action)(cap), cap.next, cap.matched)//src.substr(cap.next))
        }
        Nothing -> {
          //stat("fail-" + rule.name)
          matchRules(unsafe-decreasing(rulesNext),src,def)
        }
      }
    }
  }
}

// This is just for statistics
val ruleHist : mdict<global,int> = unsafe-total{ mdict() }

fun ruleInc( rule : string ) : () {
  unsafe-total {
    match(ruleHist[rule]) {
      Nothing -> ruleHist[rule] := 0
      Just(i) -> ruleHist[rule] := i+1
    }
  }
}

pub fun traceRuleHist() {
  unsafe-total {
    ruleHist.freeze.list.foreach fn(kv) {
      val (rule,i) = kv
      trace( rule.align(20) + ": " + i.show)
    }
  }
}

/* --------------------------------------
 Line maps to track line numbers in include files
---------------------------------------- */

pub type lineMap  {
  End
  Include(
    line: int,        // line of the [INCLUDE]
    start: int,       // start line of included fragment
    count: int,       // number of lines in the included text
    fileName: string, // include file name
    lineMap: lineMap, // lineMap of the included file
    rest: lineMap
  )
}

pub fun reverse( lineMap : lineMap ) : lineMap {
  reverseAcc( lineMap, End)
}

fun reverseAcc( lineMap : lineMap, acc : lineMap ) : lineMap {
  match(lineMap) {
    End -> acc
    Include(line,start,count,fileName,lmap,rest)
      -> reverseAcc( unsafe-decreasing(rest), Include(line,start,count,fileName,lmap,acc) )
  }
}

pub fun translateLine( lineInfos: lineMap, lineNo : int ) : string {
  match(lineInfos) {
    End -> lineNo.show
    Include(line,start,span,fileName,include,rest) -> {
      if (lineNo < line)
       then lineNo.show
      elif (lineNo >= line + span)
       then translateLine( rest, lineNo - (span - 1))
       else line.show + ";" + fileName + ":" + translateLine(include,(lineNo - line) + start)
    }
  }
}

/* --------------------------------------
 Links
---------------------------------------- */
// A url link.
pub struct link( href : string, title : string = "", linkattrs : attrs = attrsNone, linkid : string = "" )

// A definition identifier is always lower case and sequences of spaces are replaced by a single space.
// Used for links for example.
pub fun definitionId( s : string ) : string {
  s.replaceAll(rxspaces," ").toLower
}
val rxspaces = regex(r"\s+")

pub fun newLink( href : string, title : string = "", linkattrs : attrs = attrsNone, linkid : string = "", bench : bool ) : link {
  Link(href,title,
       if (!bench && href.startsWith("#"))
        then linkattrs.addClass("localref")
        else linkattrs,
       linkid)
}


// Info for files to embed. Used in a browser
pub struct embedinfo (
  embedName : string,
  embedData : string  // data-url or text content
)


/* --------------------------------------
 Expand list style patterns
---------------------------------------- */
pub fun expandChoices( s : string ) : list<string> {
  match (s.find(rxChoicePattern)) {
    Just(cap) -> {
      val pre = s.substr(0,cap.index)
      val post = s.substr(cap.next)
      cap.groups[1].split(",").map fn(part) { pre + part + post }
    }
    Nothing -> [s]
  }
}
val rxChoicePattern = regex(r"\[(\w+(?:,\w+)*)\]")

// Picks path that first matches one of the given (lower-case) extensions, or the last one if none matched.
pub fun pickExtension( exts : list<string>, paths : list<string> ) : string {
  match(paths) {
    Nil -> ""
    Cons(path,Nil) -> path
    Cons(path,rest) -> {
      val pathext = path.extname.toLower
      match (exts.find(fn(ext) { pathext == ext })) {
        Just -> path
        Nothing -> exts.pickExtension(rest)
      }
    }
  }
}

/* --------------------------------------
 Attributes
---------------------------------------- */
pub type formatter {
  FmtHtml
  FmtTex
}

pub fun (==)( x : formatter, y : formatter ) : bool {
  match(x) {
    FmtHtml -> y.isFmtHtml
    FmtTex  -> y.isFmtTex
  }
}


pub fun isFmtHtml(x: formatter): bool {
  match(x) {
    FmtHtml -> True
    FmtTex  -> False
  }
}

pub fun isFmtTex(x: formatter): bool {
  match(x) {
    FmtHtml -> False
    FmtTex  -> True
  }
}

pub type input {
  Pre         // preformatted
  MathPre     // TeX math, preformatted
  Math        // TeX math
  MathDefs    // TeX math definitions
  MathPoly    // Column aligned tex math
  Tex         // TeX code that should be parsed (i.e for the bibliography)
  Raw( only: maybe<formatter> = Nothing ) // Raw content for some backend (or all)
  Markdown( only: maybe<formatter> = Nothing )  // Markdown -- perhaps only for some backend
}


pub fun isPre(x: input): bool {
  match(x) {
    Pre -> True
    _ -> False
  }
}

pub fun isMathDefs(x: input): bool {
  match(x) {
    MathDefs -> True
    _ -> False
  }
}

pub fun isRaw(x: input): bool {
  match(x) {
    Raw -> True
    _ -> False
  }
}

pub fun isMarkdown(x: input): bool {
  match(x) {
    Markdown -> True
    _ -> False
  }
}

pub fun showInput( r : input ) {
  match(r) {
    Pre -> "pre"
    MathPre -> "mathpre"
    Math -> "math"
    MathDefs -> "mathdefs"
    MathPoly -> "mathpoly"
    Tex -> "tex"
    Raw(monly) -> "raw(" + (monly.maybe("",showFormatter)) + ")"
    Markdown -> "markdown"
  }
}

pub fun showFormatter( f : formatter ) {
  match(f) {
    FmtTex -> "tex"
    FmtHtml -> "html"
  }
}

// A label is created for every element with an id.
pub struct label( element : string, labelText : string, labelCaption : string, labelAttrs : attrs = attrsNone )

pub fun show( attrs : attrs ) : string {
  "{" + attrs.text + "}"
}

// Attributes
pub struct attrs  (
  empty   : bool = False,
  sticky  : bool = False,
  defaults: bool = True,
  text    : string = "",            // original attribute text

  replacers : list<string> = [],    // replacers
  notag   : bool = False,           // suppress output of tag
  tight   : bool = False,           // suppress first paragraph
  input   : input = Markdown(),       // how to input the content

  elem    : string = "",            // element name
  texelem : string = "",            // element name used for TeX command or environment
  htmlelem : string = "",           // element name used for HTML tag
  name    : string = "",            // id, without "#" prefix
  label   : string = "",            // label: "1.2"
  source  : string = "",            // the original source (only set for certain elements)
  lineNo  : int = 0,                // starting lineno of the element
  classes : list<string> = [],            // class, without "." prefix
  counters: list<(string,string)> = [],   // counters, without "@" prefix
  keyvals : list<(string,string)> = []    // key=value pairs
)


pub struct row( cells : list<cell>, rowAttrs : attrs = attrsNone )
pub struct cell( text_ : string, cellAttrs : attrs = attrsNone )

pub fun addClasses( attrs : attrs, classes : list<string> ) : attrs {
  classes.foldl(attrs,fn(acc,c) { acc.addClass(c) })
}

pub fun addClass( attrs: attrs, cname : string ) : attrs {
  if (cname=="") then return attrs
  if (attrs.classes.any( fn(nm) { nm == cname } ))
   then attrs
   else attrs(classes=attrs.classes + [cname], text=attrs.text+" ; class: " + cname.quote, empty=False)
}

pub fun addInputClass( attrs : attrs ) : attrs {
  if (attrs.input.isMarkdown) then attrs else attrs.addClass("input-" + attrs.input.showInput)
}

pub fun addKeyvalIfNotEmpty( attrs : attrs, key : string, value : string ) : attrs {
  if (value==""||key=="") then attrs else attrs.addKeyval(key,value)
}

pub fun addKeyvalIfNotExist( attrs : attrs, key : string, value : string ) : attrs {
  if (attrs.hasKey(key).bool) then attrs else attrs.addKeyval(key,value)
}

pub fun addKeyvals( attrs : attrs, kvs : list<(string,string)> ) : attrs {
  kvs.foldl(attrs,fn(acc,kv) { acc.addKeyval(kv.fst,kv.snd) })
}

pub fun addKeyval( attrs : attrs, key : string, value : string ) : attrs {
  attrs(keyvals=attrs.keyvals.filter(fn(kv){ kv.fst != key }) + [(key,value)],
        text=attrs.text+" ; "+key+": "+value.quote, empty=False)
}

pub fun removeKeys( attrs : attrs, keys : list<string> ) : attrs {
  attrs(keyvals=attrs.keyvals.filter(fn(kv){ keys.all( fun(key) { kv.fst != key } ) }))
}

pub fun setLineNo( attrs : attrs, line : int, dataline: string ) : attrs {
  attrs(empty=False,lineNo=line, text=attrs.text + " ; line:" + line.show ).addKeyval("data-line",dataline)
}

fun quote( s : string ) : string {
  if (s.contains("\"")) then "'" + s + "'" else "\"" + s + "\""
}

pub fun lookupKey( attrs : attrs, key : string, def : string ) : string {
  attrs.hasKey(key).maybe(def,id)
}

pub fun hasKey( attrs : attrs, key : string ) : maybe<string> {
  attrs.keyvals.find( fn(kv) { kv.fst == key }).maybe(Nothing,fn(kv){ Just(kv.snd) })
}

pub fun hasBoolKey( attrs : attrs, key : string ) : bool {
  val value = attrs.hasKey(key).maybe("",id).toLower
  (attrs.hasClass(key) || value=="true" || value=="1")
}

pub fun hasClass( attrs : attrs, className : string ) : bool {
  attrs.classes.find( fn(cname) { cname==className }).bool
}


// Generate a fresh id if it is not specified
pub fun generateHeaderId( attrs : attrs, heading : string, pre : string = "sec-") : attrs {
  val attrs1 = if (attrs.name!="") then attrs else {
    val newid = heading.normalizeId
    val newname = if (newid=="") then "section" else pre + newid
    attrs(text=attrs.text + " ; id:" + newname.quote, name = newname, empty=False)
  }
  attrs1
}


// Normalize an identifier: just keep letters, digits, underscores, colons, stars, and dashes,
// replace whitespace, colons, and stars by a dash, and convert to lower case.
pub fun normalizeId( txt : string ) : string {
  txt.replaceAll(regex(r"[^\w\-_:\*\s]+"),"")
     .replaceAll(regex(r"\s+|[:\*]"),"-")
     .toLower
}

pub fun elementName( attrs : attrs, def : string ) : string {
  if (attrs.elem=="") then def else attrs.elem
}

pub val attrsNone = Attrs(empty=True)


// Split semi-colon seperated paths into parts
pub fun splitPaths( paths : string ) : list<string> {
  paths.split(";").filter(fn(s){ s != ""})
}

// Join lines that were broken using `\` followed by a newline.
pub fun joinLines( s : string ) : string {
  s.replaceAll(rxLineBreak,"")
}
val rxLineBreak = regex(r"\\\n\r?[ \t]*")



val mimes = dict([
  ("","text/plain"),
  ("mdk","text/plain"),
  ("md","text/plain"),
  ("mkdn","text/plain"),
  ("markdown","text/plain"),
  ("txt","text/plain"),
  ("css","text/css"),
  ("html","text/html"),
  ("htm","text/html"),
  ("js","text/javascript"),

  ("tex","text/tex"),
  ("sty","text/latex"),
  ("cls","text/latex"),
  ("bib","text/plain"),
  ("bbl","text/plain"),
  ("bst","text/plain"),
  ("aux","text/plain"),

  ("png","image/png"),
  ("jpg","image/jpg"),
  ("jpeg","image/jpg"),
  ("gif","image/gif"),
  ("svg","image/svg+xml"),
  ("eps","image/eps"),

  ("pdf","application/pdf"),
]);

// added effect <string>
pub fun mimeFromExt( fname : string ) : string {
  val ext = extname(fname).substr(1).toLower;
  match(mimes[ext]) {
    Just(mime) -> mime
    Nothing    -> ""
  }
}

pub fun relative( path : string ) : bool {
  !(path.contains(rxProtocol));
}
val rxProtocol = regex(r"^(\\w+:|//)");



pub fun htmlEscape( s : string, allowEntity : bool = False ) {
  if (s.contains(rxhtml))
   then s.replaceAll( if (allowEntity) then rxnoEntityAmp else rxamp,"&amp;")
         .replaceAll(rxlt,"&lt;").replaceAll(rxgt,"&gt;")
         .replaceAll(rxquot,"&quot;").replaceAll(rxapos,"&#39;")
   else s
}
val rxnoEntityAmp = regex(r"&(?!#?\\w+;)")
val rxamp = regex(r"&")
val rxgt = regex(r">")
val rxlt = regex(r"<")
val rxquot = regex("\"")
val rxapos = regex("'")
// regex(r"""|[&<>]") <-- compilation error - "" Problem
val rxhtml = regex("[&<>\"]")


pub fun unquote( s : string ) : string {
  if (s.startsWith("'") && s.endsWith("'")) then s.substr(1,s.length - 2)
  elif (s.startsWith("\"") && s.endsWith("\"")) then s.substr(1,s.length - 2)
  else s
}

pub fun unindent( txt : string ) : string {
  val lines = txt.lines
  val cindent = lines.filter(fn(s) { !s.contains(regex(r"^\\s*$")) })
                     .map(fn(s) {
                       match(s.find(regex(r"^\\s*"))) {
                        Nothing   -> 0
                        Just(cap) -> cap.matched.length
                      }}).minimum
  if (cindent <= 0)
   then txt
   else lines.map( fun(s) { s.substr(cindent) }).join("\n")
}


pub fun contains( xs : list<string>, s : string ) : bool {
  xs.find( fun(x) { x == s }).bool
}


pub fun trimLines( s : string ) : string {
  s.replaceAll(rxTrimLines,"")
}
val rxTrimLines = regex(r"^([ \t\r]*\n)+|([ \t\r]*\n)+$")
