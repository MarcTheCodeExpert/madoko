/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// The grammar and parsing of markdown _blocks_ (i.e. paragraphs, lists, tables, etc.)
module block



import std/data/dict
import common
import attributes

import compat
import stringcompat

import compat/log
import compat/regex
import compat/string
import compat/dict
/* --------------------------------------
 Block elements
---------------------------------------- */

// A block element
pub type block {
  HLine( attrs : attrs = attrsNone)
  Blank( text : string )                       // blank line (only used inside lists)
  Line( text : string, loose : bool = False, attrs : attrs = attrsNone )  // a single line of text (only used inside lists)
  Para( text : string, attrs : attrs = attrsNone )
  Code( text : string, language : string = "", attrs : attrs = attrsNone )
  Quote( content : list<block>, attrs : attrs = attrsNone )
  List( tag : string, content : list<block>, attrs : attrs = attrsNone )
  Item( content : list<block>, attrs : attrs = attrsNone )
  Heading( depth : int, text : string, attrs : attrs = attrsNone )
  Table( header: list<row>, columnAttrs : list<attrs>, cells : list<row>, attrs : attrs = attrsNone )
  DefLink( id : string, link : link )
  DefFootnote( id : string, content : list<block> )
  Empty()
  Div( content : list<block>, attrs : attrs = attrsNone )
  Source( text : string, input : input = Markdown(), parentAttrs : attrs = attrsNone )     // raw content
  Special( name : string, value : string = "", attrs : attrs = attrsNone )  // Special blocks, like [TOC] or [FOOTNOTES]
}

pub fun isLine(x: block): bool {
  match(x) {
    Line -> True
    _ -> False
  }
}

/* --------------------------------------
 Block grammar
---------------------------------------- */

// regular expression for content inside a start HTML tag
val inlineTags  = [ "a","em","strong","small","s","cite","q","dfn","abbr","data","time","code",
                    "var","samp","kbd","sub","sup","i","b","u","mark","ruby","rt","rp","bdi","bdo",
                    "span","br","wbr","ins","del","img" ]
val atag        = r"(?!(?:" + inlineTags.join("|") + r")\b)\w+(?!:/|@)\b"
val comment     = r"!--[\s\S]*?-->"
// added #
pub val tagContent  = r#"(?:""[^""]*""|'[^']*'|[^'"">])*"#
val closedTag   = r"(" + atag + r")[\s\S]+?</\1>"
val soloTag     = r"" + atag + tagContent + ">"
val html        = r"<(?:" + [closedTag,soloTag,comment].join("|") + r") *(?:\n+|\s*$)"

// Attributes: allow escaped newline
// added #
val rattrs      = r#"(?:<!--)?\{:?((?:[^\\'""\}\n]|\\[\s\S]|'(?:[^\\']|\\[\s\S])*'|""(?:[^""\\]|\\[\s\S])*"")*)\}(?:-->)?"# // allow optional colon for maraku compat
val xattrs      = rattrs + " *"
val iattrs      = "(?:" + xattrs + ")?"           // inline: headers and fences
val pattrs      = r"(?: {0,3}" + xattrs + ")?"    // after a paragraph
val battrs      = r"(?:\n {0,3}" + xattrs + ")?"  // after a block element
val lattrs      = r"\n {0,3}" + xattrs + r"\s*$"  // after a list (separate for efficiency)

// Various
val xlinkid     = r"((?:[^\[\]\n]|\[[^\]\n]*\])*)"
val hr          = r"(?:[*_\-](?: *[*_\-]){2,}) *" + iattrs + r"(?:\n+|$)"

val bull        = r"(?:[*+\-]|(?:\d+|[#iIaA])[\.\)])"
val bullrest    = r"(?:[*+\-]|(?:\d+|[#a-zA-Z]|" + lroman + "|" + uroman + r")[\.\)])"
val lroman      = r"(?:x?(?:i(?:v|x|i|ii)?|[vx]i{0,3}))"
val uroman      = r"(?:X?(?:I(?:V|X|I|II)?|[VX]I{0,3}))"

val endlist     = hr + r"|\n(?! )(?!\1" + bull + r" )"
val alist       = r"( *)(" + bull + r") ([\s\S]+?)(?=\n(?:" + endlist + r")|$)\n?"
val endpara     = r" *(?:<" + atag + r"|```|~+|>.|#{1,6} |\[" + xlinkid + r"\]:|"
                            + hr + r"|.+?\n *(?:===|---)" + ")"

val notbspecialx= r"(?:[^ \[\*\-_\+\d><#`~\niIaA]|[iIaA](?!\.))" // not special block start sequence
val notbspecial = r"(?:[^ \[\*\-_\+\d><#`~\niIaA]|[iIaA](?!\.))" // not special block start sequence

// deflist
val defitem     = r"(?:(?:\* (.*))|((?:" + notbspecial + r").*))\n\n?"
val defstart    = r"(?:[:]| {1,2}[~:])"
val defdef      = r"(?:.*(?:\n|$)(?:(?:    .*)?(?:\n|$))*)"
val defdefs     = r"(?:" + defstart + defdef + ")+"
val deflist     = r"^(?:" + defitem + defdefs + ")+" + pattrs

// Tables
val rxtableHeader = r"((?:(?:\| *|\+)[-=][-=+| ]*\n *)?(?:\| *[^-=~: ].+\n *)*)"
val rxtableSep    = r"((?:\| *|\+)[-=~:](?:[-=~+| :]|" + xattrs + ")*)\n"
val rxtableBody   = r"((?: *(?:\||\+[-=]).*(?:\n|$))+)"

// The main block grammar

val blockGrammar : grammar<block, <blockContext>> = [

  Rule("lheading",   regex(r"^(?!    )([^ \n].*?)" + iattrs + r"\n *(===+|---+) *(?:\n+|$)"), blockHeadingLine ),
  Rule("deflist",    regex(deflist), blockDefList ),
  Rule("parax",      regex(r"^(" + notbspecial + r"[^|\n]*?(?:\n|$)(?:(?!" + endpara + r").+(?:\n|$))*)\n*"), blockPara ),

  Rule("code",       regex(r"^(    (?:.|\n+    )*)\n*"), blockCode ),
  Rule("html",       regex(r"^ *" + html), blockHtml ),
  // added #
  Rule("deflink",    regex(r"^ *\[(?!\^)" + xlinkid + r#"\]: *<?((?:[^\\\s>]|\\(?:.|\n *))+)>?(?: +[""(]((?:[^\n\\]|\\(?:.|\n *))+)["")])?(?: |\\\n *)*"# +iattrs+ r"(\n+|$)"), blockDefLink ),
  Rule("deffootnote",regex(r"^ *\[\^" + xlinkid + r"\]: *(?:\n {4})?(.*(?:\n+ {4}.*)*)(?:\n+|$)"), blockDefFootnote),
  Rule("hline",      regex(r"^ *" + hr), blockHLine ),

  Rule("list",       regex(r"^" + alist), blockList ),  // before heading due to #.
  Rule("heading",    regex(r"^ *(#{1,6})(0?) *(.+?) *#* *" + iattrs + r"(?:\n+|$)"), blockHeading ),
  Rule("blockquote", regex(r"^((?: *>.+(?:\n[^{\n]+)*\n*)+)" + battrs + "(?:\n+|$)"), blockQuote ),
  Rule("fenced",     regex(r"^ *(```+) *(?:([^{}\s]+) *)?" + iattrs + r"\n([\s\S]+?)\n *\1 *(?:\n+|$)"), blockFencedCode ),

  Rule("table",      regex(r"^ *" + rxtableHeader + rxtableSep + rxtableBody + pattrs + r"\n*"), blockTable ),
  Rule("nptable",    regex(r"^ *(\S[^|\n]*?\|.*?)\n *([-=~:]+ *\|[-=~| :]*)\n((?:.*\|.*(?:\n|$))*)" + pattrs + r"\n*"), blockNpTable ),

  Rule("divnamed",   regex(r"^ *(~+) *[Bb]egin +([\w\d\-]*) *" + iattrs + r"(?=\n)([\s\S]*?)\n *\1 *[Ee]nd +\2 *(?:\n+|$)"), blockDiv ),
  Rule("div",        regex(r"^ *(~+) *([\w\d\-]*) *" + iattrs + r"(?=\n)([\s\S]*?)\n *\1 *(?:\n+|$)"), blockDiv ),

  Rule("special",    regex(r"^ *\[ *(TOC|FOOTNOTES|TITLE)(?: *= *([\w-]*))? *\] *\n*"), blockSpecial ),
  Rule("para",       regex(r"^(.+(?:\n|$)(?:(?!" + endpara + r").+(?:\n|$))*)\n*"), blockPara ),
  Rule("blank",      regex(r"^\n+"), blockBlank ),
  ruleLine,
]

val ruleLine = Rule("para-line",  regex(r"^.+(\n|$)"), blockLine)
val ruleLineX= Rule("parax-line", regex(r"^" + notbspecial + r".*(\n|$)"), blockLine)

// add fn --> val can not have effects
fun parseGrammar(): grammar<block, <blockContext>> {blockGrammar.ruleReplace( True, ruleLineX ).ruleReplace( True, ruleLine  )}

val blockListGrammar = parseGrammar()


/* --------------------------------------
 Block element funs
---------------------------------------- */
fun blockSpecial( cap : matched) : <blockContext> block {
  fun joinnl( lines : list<string> ) : string {
    lines.map(fn(line) { line + "\n" }).join
  }
  fun mkblock( name, content : list<string>, lineno = getLineNo() ) : <blockContext> list<string> {
    if (content.is-nil) then [] else ["~ Begin " + name + " { line-adjust:0; line:" + lineno.show + " }"] + content + ["~ End " + name]
  }
  
  fun entry(name, className = name) {
    //val ctxe = getCurrBlockContext() ctxe.metadata[name]
    match(getBlockMetaDataEntry(name)) {
      Just(value) | value.trim != ""
        -> mkblock(className, ["&" + name + ";"])
      _ -> []
    }
  }
  // ctx.metadata[name]
  fun readInt(name,default = 0) {
    match(getBlockMetaDataEntry(name)) {
      Just(value) -> value.trim.parse-int-default(default)
      Nothing     -> default
    }
  }
  fun group( xs : list<a>, n : int = 3, acc : list<a> = xs ) : list<list<a>> {
    match(xs) {
      Nil -> Nil
      Cons(_,xx) -> { // just for termination proof
        match( acc ) {
          Nil -> Nil
          _   -> Cons( acc.take(n), group(xx, n, acc.drop(n) ) )
        }
      }
    }
  }
  fun author( idx : int ) : <blockContext> list<string> {
    mkblock("Author",
      [entry("author" + idx.show, "AuthorName"),
       entry("affiliation" + idx.show, "AuthorAddress"),
       entry("address" + idx.show, "AuthorAddress"),
       entry("author-note" + idx.show, "AuthorNote"),
       entry("email" + idx.show, "AuthorEmail")].concat)
  }
  fun authorRow( idxs : list<int> ) : <blockContext> list<string> {
    mkblock("AuthorRow", idxs.concat(author))
  }
  if (cap.groups[1].toLower == "title") {
    val authorCount = readInt("author-count")
    val titleBlock = [
        mkblock("TitleHeader", entry("title","Title")  + entry("subtitle","Subtitle") + entry("sub-title","Subtitle") + entry("title-note","TitleNote") ),
        mkblock("Authors", list(1,authorCount).group(readInt("author-columns",3)).concat(authorRow) ),
        entry("title-footer","TitleFooter")
      ].concat.join("\n")
    Div( [], "line-adjust:0".parseAttrs("titleblock",source=titleBlock))
  }
  else {
    Special(cap.groups[1],cap.groups[2])
  }
}

fun blockPara( cap : matched) : _ block {
  val full = cap.groups[1]
  val (txt,attrTxt) = match(full.find(rxPattrs)) {
    Nothing   -> (full,"")
    Just(pcap) -> (full.substr(0,pcap.index),pcap.groups[1])
  }
  Para(txt, attrTxt.parseAttrs("P",txt) )
}
val rxPattrs = regex(r"\n {0,3}" + xattrs + r"\s*$")

fun blockDefLink( cap : matched) : <blockContext> block {
  val id = cap.groups[1].definitionId
  
  DefLink(id, newLink(cap.groups[2].joinLines, cap.groups[3].joinLines, cap.groups[4].parseAttrs, id,  isBlockBench()))
}

fun blockLine( cap : matched) : <blockContext> block {
  
  Line(cap.matched, isBlockLoose() )
}

fun blockBlank( cap : matched) : _ block {
  Blank(cap.matched)
}

fun blockHLine( cap : matched) : _ block {
  HLine(cap.groups[1].parseAttrs)
}

fun blockHtml( cap : matched) : <blockContext>  block  {
  Source(cap.matched,Raw(Just(FmtHtml)),attrsNone)
}

fun blockHeading( cap : matched) : <blockContext> block  {
  makeHeading(if (cap.groups[2]=="0") then 0 else cap.groups[1].length,cap.groups[3],cap.groups[4])
}

fun blockHeadingLine( cap : matched) : <blockContext> block {
  makeHeading( (if (cap.groups[3].substr(0,1) == "=") then 1 else 2), cap.groups[1], cap.groups[2] )
}

fun makeHeading(depth:int, source:string, attrStr : string) {
  val elem   = "H" + depth.show
  Heading(depth, source, attrStr.parseAttrs(elem,source))
}

fun blockCode( cap : matched) : <blockContext> block  {
  val source = cap.groups[1].replaceAll(rxindent4,"")
  
  Code(source, "",
          if (!(isBlockPedantic() || isBlockBench() )) then attrsNone.addClass("pre-indented") else attrsNone)
}

fun blockFencedCode( cap : matched) : <blockContext> block{
  val attrs = cap.groups[3].parseAttrs
  
  Code(cap.groups[4], cap.groups[2],
        if (!(isBlockPedantic() || isBlockBench() ))
          then attrs.addClasses(["pre-fenced","pre-fenced" + cap.groups[1].length.show])
          else attrs)
}

// removed ctx from parseBlocks
fun blockQuote( cap : matched) : <blockContext> block {
  val text = cap.groups[1].replaceAll(rxquotePrefix,"")
  //mtrace("---")
  
  val content = parseBlocks(text)
  //mtrace("--- end quote")
  Quote(content,cap.groups[2].parseAttrs)
}
val rxquotePrefix = regex(r"^ *> ?",multiline=True)

fun blockDiv( cap : matched) : <blockContext> block {
  val cname = cap.groups[2].definitionId
  log("customs","{ \"name\":" + cname.json  + ", \"display\":" + cap.groups[2].json + "}");
  val attrs = cap.groups[3].parseAttrs(cname,source=cap.groups[4].substr(1))
  Div( [], attrs )
}
// removed ctx
fun blockDefFootnote( cap : matched) : <blockContext> block {
  val id  = cap.groups[1].definitionId
  val txt = "~ Begin Footnote { id='fn-" + id + "' }\n" +
               cap.groups[2].replaceAll(rxindent4,"") + "\n" +
            "~ End Footnote"
  
  DefFootnote(id, parseBlocks(txt))
}

// --------------------------------
// Definition Lists
// rremoved ctx from parseBlocks
fun blockDefList( cap : matched) : <blockContext> block {
  fun parseItem( extraAttrs : string, icap : matched, line : int) : <blockContext> list<block> {
    //trace("item:\n" + icap.matched)
    val item = icap.groups[4].replaceAll(rxindent4,"")
    val attrs = icap.groups[3].parseAttrs("dd",source=item)
    val term  = if (icap.groups[1]=="") then icap.groups[2] else icap.groups[1]
    val dterm = if (term=="") then [] else {
                  val attrsd = parseAttrs(extraAttrs,"dt",source=term)
                  [Div([Line(term)],attrsd)]
                }
    // setting flag to use blockListgrammar                
    val ddesc = Div(parseBlocks(item,line, True),
                          if (line <= 0) then attrs else attrs.setLineNo(getBlockLineMap(),line))
    [ddesc] + dterm
  }
  
  blockListX( cap.matched.trim,  "dl", ".dl", rxDefItem, parseItem )
}
val rxDefItem = regex( r"^(?:" + defitem + r")?" + defstart + "(?:" + iattrs + r")? *(" + defdef + ")" )

// --------------------------------
// Lists
// removed ctx from parseBlocks
fun blockList( cap : matched) : <blockContext> block {
  val tag  = if (cap.groups[2].length > 1) then "ol" else "ul"

  fun parseItem( extraAttrs : string, icap : matched, line : int) : <blockContext> list<block> {
    val item = icap.groups[4].replaceAll(if (isBlockPedantic())
                                           then rxindent4
                                           else rxindent(icap.groups[1].length) ,"")
                                           
    val attrs = (extraAttrs + " ; " + icap.groups[3]).parseAttrs("li", item)
    // setting flag to use blockListgrammar 
    [Item(parseBlocks(item,line, True),
           if (line <= 0) then attrs else attrs.setLineNo(getBlockLineMap(),line))]
  }

  val bull = cap.groups[2].substr(0,1)
  val attrs0  = if (bull=="*")   then ".list-star"
                 elif (bull=="+") then ".list-plus"
                 elif (bull=="-") then ".list-dash"
                 elif (bull=="i") then "list-style-type:lower-roman"
                 elif (bull=="I") then "list-style-type:upper-roman"
                 elif (bull=="a") then "list-style-type:lower-alpha"
                 elif (bull=="A") then "list-style-type:upper-alpha"
                 else ""
  val attrs1 = if (cap.groups[2].endsWith(")")) then attrs0 + " ; .list-sep-paren"
               elif (cap.groups[2].endsWith(")")) then attrs0 + " ; .list-sep-dot"
               else attrs0
  
  blockListX( cap.matched, tag, "." + tag + " ; " + attrs1, rxitem, parseItem )
}
val rxitem      = regex(r"^(( *)(?:" + bullrest + r") +)(?:" + iattrs + r")?(.*(?:\n(?!\2" + bullrest + r" ).*)*\n?)",multiline=True);

// removed ctx: blockContext
fun blockListX( text : string, 
                     tag : string, attrsInit : string, rxParseItem : regex, parseItem : (string,matched,int) -> <blockContext> list<block> ) : <blockContext> block
{
  val loose = text.contains(blankline)
  // we should merge any text blocks into a paragraph for a loose list
  // in sane mode, we only make text blocks paragraphs if they are followed by a blank line
  //setBlockGrammar(parseGrammar())
  //listGrammar()
  with setLoose(loose)
  /*val icontext = ctx(grammar = ctx.listGrammar,// context.grammar.filter( fn(r) { !(r.name.startsWith("paragraph")) }),
                         loose = loose) // if (ctx.sane) then False else loose)*/


  val (txt,attrsTxt) = match(text.find(rxlattrs)) {
    Just(acap) -> (text.substr(0,text.length - acap.matched.length), attrsInit + " " + acap.groups[1])
    Nothing    -> (text,attrsInit)
  }
  val attrs0 = attrsTxt.parseAttrs(tag).addClasses( [if (loose) then "loose" else "compact"] )
  val attrs = match (txt.find(rxFirstNum)) {
                Nothing    -> attrs0
                Just(icap) -> {
                  val num = icap.groups[1].parse-int.maybe(1,id)
                  if (num==1) then attrs0
                   else attrs0.addKeyval("start",icap.groups[1])
                }
              }

  val extraAttrs = attrs.classes.map( fn(cls) { "." + cls + "-li" } ).join(" ")

  fun parseItems( src : string, line : int, acc : list<block> = Nil ): <blockContext> list<block> {
    match (src.find(rxParseItem)) {
      Nothing    -> acc.reverse
      Just(icap) -> {
        val newline = if (line <= 0) then line else line + icap.matched.count("\n")
        parseItems( unsafe-decreasing(src.substr1(icap.next)), newline, parseItem(extraAttrs,icap,line) + acc)
      }
    }
  }

  // if loose then add a blank at the end of the last item so it has a Blank
  val items = parseItems( txt + (if (loose) then "\n\n" else ""), getLineNo() )
  // need to reset blockGrammer to original state without parseGrammar
  //setBlockGrammar(blockGrammar)
  List(tag,items,attrs)
}

val rxlattrs    = regex(lattrs)
val blankline   = regex(r"\n\n(?!\s*$)")
val rxindent4   = regex(r"^    ",multiline=True)
val rxFirstNum  = regex(r"^ *(\d+)\.")

fun rxindent(i : int ) : regex {
  if (i==4) then rxindent4x
  elif (i==5) then rxindent5x
  elif (i==2) then rxindent2x
  elif (i==3) then rxindent3x
  else regex(r"^ {1," + i.show + "}",multiline=True)
}
val rxindent2x  = regex(r"^  ?",multiline=True)
val rxindent3x  = regex(r"^ {1,3}",multiline=True)
val rxindent4x  = regex(r"^ {1,4}",multiline=True)
val rxindent5x  = regex(r"^ {1,5}",multiline=True)


// --------------------------------
// Tables

fun blockNpTable( cap : matched) : _ block {
  
  val header = cap.groups[1].npcolumns(0)
  val cols   = cap.groups[2].npcolumns(1).cells.map(fn(c) { c.text_.columnStyle } )
  val cells  = cap.groups[3].rows.map-indexed( fn(i,row) { npcolumns(row,i+2) } )
  Table([header],cols,cells,cap.groups[4].parseAttrs)
}

fun blockTable( cap : matched) : _ block {
  
  val headers = if (cap.groups[1]=="") then [] else cap.groups[1].rows.map-indexed( fn(i,row) { columns(row,i) } )
  val cols    = cap.groups[2].columnStyles
  val ofs     = headers.length + 1;
  val cells   = cap.groups[4].rows.map-indexed( fn(i,row) { columns(row,i+ofs) })
  // create a horizontal line after the headers?
  val txts    = cols.map(source)
  val hline   = if (txts.all(fn(txt){txt==""})) then [] else [Row(txts.map(fn(t){ Cell(t) }))]
  Table(headers,cols,hline+cells,cap.groups[5].parseAttrs)
}

//removed ctx
fun npcolumns( row : string,  ofs : int ) : <blockContext> row {
  ("|" + row + "|").columns(ofs)
}

fun rows( body : string ) : list<string> {
  body.trimRight.split("\n")
}

//removed ctx in parameter 
// Split a row into cells, keeping final separators ("|" or "+") at the end of each cell.
fun columns( row : string, ofs: int ) : <blockContext> row {
  // Note: we allow "+" to separate for dashed lines. So we carefully split on "+" too
  // as long as such "+" is followed by dashes or double-dash.
  //val ctx = getCurrBlockContext()
  val cells = row.findAll(rxCell).list.map( fn(cap) { Cell(cap.groups[1]) })
  val attrs = row.find(rxRowAttr).maybe(attrsNone, fn(cap) { cap.groups[1].parseAttrs("tr")  })
  val lineNo = getLineNo()
  Row(cells, if(lineNo > 0) then attrs.setLineNo(getBlockLineMap(), lineNo + ofs) else attrs)
}

val rxCellCodeInline = r"(?:``(?:[^`]|`(?!`))*``|`(?:[^`]|``)*`)"
// here we dropped the not-pipe. In consequence, you cannot write a table row
// like
//   | 400$ | 500$ |
// anymore!
val rxCellTexInline1 = r"(?:\$(?!\{)(?:(?:[^\\\$]|\\[\s\S])+)\$)"
val rxCellTexInline2 = r"(?:\$\{(?:(?:[^\\\$]|\\[\s\S])+)\$)"
val rxCellContent = r"(?:\\.|"+ rxCellTexInline1 + r"|" + rxCellTexInline2 + r"|" + rxCellCodeInline + r"|[^\\|+]|\+ *(?![-=]))"
val rxCell = regex(r"(?:^ *(?:\||\+(?=[-=])))?(" + rxCellContent + r"+(?:[|]+|[+]+(?= *[-=])|$))")
val rxRowAttr = regex(r"[\+\|]" + xattrs + "$")

// split the separator row in cells, and include the separators for determining the column style
fun columnStyles( row : string ) : list<attrs> {
  row.findAll(regex(r"[|+][^|+]+(?:[|+] *$)?")).list
    .map(fn(cap) { cap.matched }).map(columnStyle)
}

fun columnStyle( style : string ) : attrs {
  match(style.find(regex(r"^([|+])? *(:)?([ ~=-]*)(?:" + xattrs + ")?([ ~=-]*)(:)? *(?:([|+]) *)?$"))) {
    Nothing    -> attrsNone // should not happen?
    Just(ccap) -> {
      val align = if (ccap.groups.matchedOn(2))
                   then (if (ccap.groups.matchedOn(6)) then " ; text-align:center" else " ; text-align:left")
                   else (if (ccap.groups.matchedOn(6)) then " ; text-align:right" else "")
      val borders = (if (ccap.groups[1]!="+") then "" else " ; .cell-border-left") +
                    (if (ccap.groups[7]!="+") then "" else " ; .cell-border-right")
      val c = (ccap.groups[3] + ccap.groups[5]).trim.substr(0,1)
      val content = if (c=="=") then "===" elif (c=="-") then "---" else ""
      (ccap.groups[4] + align + borders).parseAttrs("col",content)
    }
  }
}



/* --------------------------------------
  Parse a text into blocks
---------------------------------------- */

pub effect blockGram
  fun getBlockGrammar() : grammar<block, <blockGram, blockBench, blockLineMap, blockLineNo, blockLoose, blockPendatic, blockMetadata>>
  fun getBlockListGrammar(): grammar<block, <blockGram, blockBench, blockLineMap, blockLineNo, blockLoose, blockPendatic, blockMetadata>>
  

pub effect blockMetadata
  fun getBlockMetaData(): dict<string>
  fun getBlockMetaDataEntry(name: string): maybe<string>

pub effect blockBench
  fun isBlockBench(): bool

pub effect blockPendatic
  fun isBlockPedantic(): bool

pub effect blockLoose
  fun isBlockLoose(): bool 

pub effect blockLineNo
  fun getLineNo(): int

pub effect blockLineMap
  fun getBlockLineMap(): lineMap

fun setLoose(lo: bool, action: () -> <blockContext> a): <blockContext> a {
  with handler
    fun isBlockLoose lo
  action()  
}  


fun setLine(li: int, action: () -> <blockContext> a): <blockContext> a {
  with handler
    fun getLineNo li
  action()  
}  


pub alias blockContext = <blockGram, blockBench, blockLineMap, blockLineNo, blockLoose, blockPendatic, blockMetadata>


pub fun parseBlocks( src : string, lineNo : int, lineMap : lineMap,
                             mdata : dict<string>,
                             bench : bool = False,
                             pedantic : bool = False
                             )  : list<block>
{ 
  with handler
    fun getBlockGrammar blockGrammar
    fun getBlockListGrammar blockListGrammar
  with handler
    fun getBlockMetaData mdata
    fun getBlockMetaDataEntry(name: string) mdata[name]
  with handler  
    fun isBlockBench() bench
  with handler  
    fun isBlockPedantic() pedantic
  with handler  
    fun isBlockLoose() False
  with handler  
    fun getLineNo lineNo
  with handler  
    fun getBlockLineMap lineMap
  
  parseBlocks(src)

}

// Parse text into blocks
// removed ctx
fun parseBlocks(src : string, line : int = 0, isList: bool = False ) : <blockContext> list<block>
{
  val bs = if (line > 0)
            then parseBlocksAccLine(Nil, line, src, isList )
           elif (getLineNo() > 0)
            then parseBlocksAccLine(Nil, getLineNo(), src, isList)
            else parseBlocksAcc(Nil, src, isList)
  bs.reverse
}

// removed ctx: blockContext from parameters
fun parseBlocksAcc( acc : list<block>, src : string, isList: bool) : <blockContext> list<block>
{
  if (src=="") return acc;
  val (block,next,_) = matchRules(if(isList) then getBlockListGrammar() else getBlockGrammar(),src,raw_)
  
  parseBlocksAcc(Cons(block,acc), unsafe-decreasing(src.substr1(next)), isList )
}

// removed ctx: blockContext from parameters
fun parseBlocksAccLine(acc : list<block>, line : int, src : string, isList: bool ) : <blockContext> list<block>
{
  if (src=="") return acc;
  //val ctx = getBlockContexte()
  with setLine(line)
  val (block,next,matched) = matchRules(if(isList) then getBlockListGrammar() else getBlockGrammar(),src,raw_)
  
  
  val lines  = matched.count("\n")

  // Adjust start and end line and exclude preceding and trailing empty lines
  val start = line + matched.linesMatching(rxPreWhite)
  val end   = line + lines - matched.linesMatching(rxPostWhite)
  val lineMap = getBlockLineMap() // get line map from Blcok Context effect
  val block2 = block.adjustAttrs( fn(attrs:attrs) {
    //attrs.setLineNo(ctx.lineMap, start).setRange(ctx.lineMap, start, end)
    attrs.setLineNo(lineMap, start).setRange(lineMap, start, end)
  })
  parseBlocksAccLine(Cons(block2,acc), line + lines, unsafe-decreasing(src.substr1(next)), isList )
}

val rxPreWhite = regex(r"^\s+")
val rxPostWhite = regex(r"\s+$")
fun linesMatching(s : string, r : regex): int {
  match(s.find(r)) {
    Nothing   -> 0
    Just(cap) -> cap.regex/matched.count("\n")
  }
}

fun raw_( s : string ) : block {
  Line(s)
}

pub fun setRange( attrs: attrs, lineMap: lineMap, start: int, end: int) : attrs {
  // TODO annotating the element in an attribute to later parse it back seems wrong.
  // also the file on both should be the same!
  attrs.addKeyval("data-line-start", translateLine(lineMap, start)).addKeyval("data-line-end", translateLine(lineMap, end))
}

pub fun setLineNo( attrs: attrs, lineMap: lineMap, lineNo : int, overwrite : bool = False ) : attrs {
  val srcline = translateLine(lineMap,lineNo)
  val attrs1  = if (!overwrite && attrs.hasKey("data-line").bool) then attrs else attrs.setLineNo(lineNo,srcline)
  if(!attrs1.input.isMarkdown || attrs1.hasClass("pre-fenced")) {
    val firstline = translateLine(lineMap,lineNo+1)
    attrs1.addKeyval("data-line-first",firstline)
  }
  else attrs1
}


fun adjustAttrs( b : block, adjust : (attrs : attrs) -> attrs ) : block
{
  match(b) {
    HLine( attrs ) -> HLine(adjust(attrs))
    Line( text,loose, attrs) -> Line(text,loose,adjust(attrs))
    Para( text, attrs ) -> Para(text,adjust(attrs))
    Code( text, language, attrs) -> Code( text, language, adjust(attrs))
    Quote( content, attrs) -> Quote( content, adjust(attrs))
    List( tag, content, attrs) -> List( tag, content, adjust(attrs))
    Item( content, attrs) -> Item( content, adjust(attrs))
    Heading( depth, text, attrs) -> Heading( depth, text, adjust(attrs))
    Table( header, columnAttrs, cells, attrs) -> Table( header, columnAttrs, cells, adjust(attrs))
    Div( content, attrs) -> Div( content, adjust(attrs))
    Source( text, input, attrs) -> Source( text, input, adjust(attrs))
    Special( name, value, attrs) ->  Special(name,value, adjust(attrs))// Special blocks, like [TOC] or [FOOTNOTES]
    _ -> b
  }
}
