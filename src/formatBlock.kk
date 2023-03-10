/*---------------------------------------------------------------------------
  Copyright 2013-2015 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Format _block_ elements and and their inline elements.
module formatBlock

import compat/string
import compat/regex
import compat/dict
import compat/log


import common
import attributes // mergeDefault
import block
import inline
import formatInline

import compat
import stringcompat


// abstracted Handler for formatContext
pub fun initialFormatContext( lineMap: lineMap,
                                      headingBase : int, pedantic : bool, fmt : formatter, action: () -> <formatContext|e> a): e a  {
  with handler 
    fun getFormatContext FormatContextStruct(dict(),Empty,headingBase,"language-",pedantic, lineMap, fmt)
  action()
}
/*
pub fun setTocBlocks(tocs: dict<list<block>>, action: () -> <formatContext> a): <formatContext> a {
  with handler
    fun getFormatContext() getFormatContext()(tocBlocks = tocs)
  action()
}
pub fun setFootnoteBlock(fnBlock: block, action: () -> <formatContext> a): <formatContext> a {
  with handler
    fun getFormatContext() getFormatContext()(footnoteBlock = fnBlock)
  action()
}*/
/*
fun fmtEnv( ctx : formatContext, env : string, txt : string, attrs : attrs = attrsNone ) : string {
  ctx.inlineContext.fmtEnv(env,txt,attrs)
}

fun fmtCmd( ctx : formatContext, cmd : string, txt : string, attrs : attrs = attrsNone ) : string {
  (ctx.inlineContext.xfmtCmd)(ctx.inlineContext,cmd,txt,attrs)
}

fun fmtText( ctx : formatContext, txt : string ) : string {
  (ctx.inlineContext.xfmtCmd)(ctx.inlineContext,"",txt,attrsNone)
}

fun fmtTable( ctx : formatContext, head : list<row>, body : list<row>, colattrs : list<attrs>, attrs : attrs = attrsNone ) : string {
  (ctx.inlineContext.xfmtTable)(ctx.inlineContext,head,body,colattrs,attrs)
}
*/
fun escapeMath( txt : string, fmt : formatter ) : string {
  txt
}

/* --------------------------------------
  Process inline text in the blocks
---------------------------------------- */


// Format blocks into html and parse and format all inline elements
pub fun formatBlocks(blocks : list<block> ) : <inlineContext, formatContext> string
{ 
  unsafe-no-div{ formatBlocksX(blocks) }

}

pub fun formatBlocksX(blocks : list<block> ) : <div,formatContext, inlineContext> string
{
  formatBlocksAcc(blocks,builder())
}

fun formatBlocksAcc( blocks : list<block>, acc : builder<h> ) : <st<h>,div,formatContext, inlineContext> string
{ 
  val bench = getInlineContext().bench
  match(blocks) {
    Nil -> acc.build
    Cons(block,rest) -> {
      match(block) {
        // inside lists we do not parse paragraphs, but parse per line
        // (because adjacent nested lists otherwise become part of a paragraph)
        // Here we re-discover paragraphs by treating lines that are ended by
        // a blank line as a paragraph again.
        Line(txt,loose,attrs) -> {
          val (lines,rest2) = rest.span(isLine)
          val content = txt + lines.map(lineText).join
          match(rest2) {
            Cons(Blank(_),rest3) -> {
              formatBlocksAcc(rest3,acc.append(formatBlock(Para(content,attrs))))
            }
            _ -> {
              // This is to emulate fully pedantic list mode where we always
              // combine text lines as a paragraph in a loose list
              val newblock = if (loose) then Para(content,attrs) else Line(content,loose,attrs)
              formatBlocksAcc(rest2,acc.append(formatBlock(newblock)))
            }
          }
        }
        // For TeX output, an equation or list environment should be part of a paragraph
        // If a paragraph is followed by a `.para-block` we mark the paragraph as `.para-continue`
        //!(getInlineContext().bench)
        Para(text,attrs) | !bench -> {
          match(rest) {
            Cons(Div(_,attrsd),_) | attrsd.hasClass("para-block") -> {
              formatBlocksAcc(rest,acc.append(formatBlock(Para(text,attrs.addClass("para-continue")))))
            }
            //Cons(List,_) -> {
            //  formatBlocksAcc(ctx,rest,acc.append(formatBlock(ctx,Para(text,attrs.addClass("para-continue")))))
            //}
            _ -> {
              formatBlocksAcc(rest, acc.append(formatBlock(block)))
            }
          }
        }

        // otherwise just proces the block element.
        _ -> formatBlocksAcc(rest, acc.append(formatBlock(block)))
      }
    }
  }
}


fun lineText( b :  block ) {
  match(b) {
    Line(txt) -> txt
    _         -> ""
  }
}

/* --------------------------------------
   Output a single block element
---------------------------------------- */


pub fun formatBlock(block : block ) : <div, formatContext, inlineContext> string
{ 
  val ped = getFormatContext().pedantic
  match(block) {
    Para(txt,attrs) -> {
      //with concreteInlineContext(ctx.inlineContext)
      
      val content = formatInline(txt, attrs)
      if (attrs.notag)
       then fmtEnv("div", content, attrs) // content
      elif (content.contains(rxblank)) then "" else
       fmtEnv("p", content, attrs)
       //"<p>" + formatInline(ctx.inlineContext,txt) + "</p>"
    }

    Line(txt,_loose,attrs) -> {
      formatInline(txt, attrs)
    }

    Blank -> ""

    Code(txt,_,attrs) -> {
      attrs.logDataLine
      fmtCode( "pre", txt, attrs )
    }

    List(tagname,items,attrs) -> {
      fmtEnv(tagname, formatBlocksX(items), attrs)
    }

    Item(bs,attrs)  -> {
      fmtEnv("li",formatBlocksX(bs), attrs)
    }

    Heading(d,txt,attrs) -> {
      fmtCmd("h" + min(6,max(1, d + getFormatContext().headingBase - 1)).show, formatInline(txt,attrs),
                     attrs.addKeyval("data-heading-depth",d.show))
    }

    HLine(attrs) -> {
      fmtCmd("hr", "", attrs)
    }

    Source(txt,input,parentAttrs) -> {
      val fmt = getFormatContext().fmt
      parentAttrs.logDataLine
      match(input) {
        Pre       -> {
          fmtCode("pre",txt)
        }
        Math      -> {
          fmtMath(True,txt,parentAttrs.deriveMathAttrs)
        }
        MathPre   -> {
          fmtMath(True,txt.mathPreBlock,parentAttrs.deriveMathAttrs)
        }
        MathPoly  -> fmtPoly(txt, parentAttrs)
        MathDefs  -> txt.escapeMath(fmt)
        Markdown  -> formatInline(txt,parentAttrs)
        Raw(monly)-> {
          if (getInlineContext().xsanitize) then ""
          else match(monly) {
            Nothing -> txt + "\n"
            Just(FmtTex) | fmt == FmtTex -> {
              "%mdk-197\n" + txt + "\n"
            }
            Just(f) | f == fmt -> txt + "\n"
            _       -> "\n"
          }
        }
        // these should not happen by now
        Tex  -> fmtEscapePre(txt)
      }
    }

    Quote(bs,attrs) -> {
      fmtEnv("blockquote", formatBlocksX(bs), attrs)
    }

    Table(header,colstyles0,cells,attrs) -> {
      val colstyles = colstyles0.map( fn(colstyle) { matchRules(getInlineContext().defaults,"tc",colstyle) } )
      val thead = formatRows(header,colstyles,attrs,False)
      val tbody = formatRows(cells,colstyles,attrs,True)
      fmtTable(thead,tbody, colstyles, attrs.addClass("madoko"))
    }






    Div(Cons(Source(txt,Pre),Nil),attrs) | ped && attrs.elementName("div") == "pre" -> {
      formatBlock(Code(txt,""))
    }

    Div(content,attrs) | attrs.hasClass("columns") -> {
      val cols = content.map fn(b) {
        match(b) {
          Div(bs,xs) -> {
            if (!(xs.hasClass("column"))) {
              warning( "a 'Columns' block should only contain 'Column' blocks")
            }
            Cell(formatBlocksX(bs), xs)
          }
          _ -> {
            warning( "a 'Columns' block can only contain 'Column' blocks")
            Cell(formatBlock(b), attrsNone)
          }
        }
      }
      fmtTable(Nil,[Row(cols)],cols.map(fn(c){ c.cellAttrs }),attrs)
    }

    Div(content,attrs) -> {
      val txt = formatBlocksX(content)
      val fmt = getFormatContext().fmt
      // trace(txt)
      val rnd = attrs.input
      match (attrs.hasKey("bib-id")) {
        Just(bibid) -> {
          log("aux","%mdk bib: " + bibid
                + (attrs.hasKey("csl-style").maybe("",fn(s) { ", csl-style:" + s.show }))
                + (attrs.hasKey("bib-style").maybe("",fn(s) { ", bib-style:" + s.show }))
                + (attrs.hasKey("locale").maybe("",fn(s) { ", locale:" + s.show }))
             )
        }
        Nothing     -> ()
      }
      if ((attrs.classes.is-nil && attrs.keyvals.is-nil && attrs.name=="") || attrs.notag || rnd.isRaw ||
            (fmt==FmtTex && rnd.isMathDefs))
        then txt
        else fmtEnv("div",txt,attrs.addInputClass)
    }

    Special(name,value,attrs) -> {
      val fmt = getFormatContext().fmt
      val linfo = fmtLineInfo(attrs.hasKey("data-line").mbstring)
      if (name.toLower=="toc") then {
        val blks = getFormatContext().tocBlocks[value.toLower].maybe([],id)
        linfo + formatBlocksX(blks)
      }
      elif (name.toLower=="footnotes" && fmt.isFmtHtml) then linfo + formatBlock(getFormatContext().footnoteBlock)
      else "" // formatBlock(ctx,Para("[" + name + "]\n"))
    }

    DefLink       -> ""
    DefFootnote   -> ""
    Empty         -> ""
  }
}
val rxblank = regex(r"^\s*$")
val rxDashes  = regex(r"^ *(\\/)?---+ *[|+]*$") //regex(r"^( |- |-- )*---+ *[- ]*[|+]*$")
val rxDDashes = regex(r"^ *(\\/)?===+ *[|+]*$")

fun deriveMathAttrs( parentAttrs : attrs ) {
  attrsNone.addClasses( parentAttrs.classes.filter(fn(c) { c.startsWith("snippet") || c.startsWith("math") } ) )
           .addKeyvals( parentAttrs.keyvals.filter( fn(kv) {
                          val key = kv.fst
                          key.startsWith("color") || key.startsWith("font-") || key.startsWith("snippet-") || key.startsWith("math-") || key.startsWith("data-line-")
                        }))
}



fun formatRows( rows : list<row>,
                      colstyles : list<attrs>,
                      attrs : attrs, isBody : bool ) : <formatContext, inlineContext> list<row>
{
  if (rows.is-nil) then return Nil

  fun filterKeyvals( keyvals : list<(string,string)>, prefixes : list<string> ) : list<(string,string)> {
      keyvals.filter-map fn(kv) {
        val (key,value) = kv
        match (prefixes.reverse.find(fn(pre) { key.startsWith(pre) })) {
          Just(pre) -> {
            val skey = key.substr(pre.length)
            if (skey.find(rxSubSelect).is-just) then Nothing else Just((skey,value))
          }
          Nothing -> Nothing
        }
      }
  }

  fun defaultCellKeyvals( colNum : int, rowstyle : attrs, isLast : bool ) : list<(string,string)> {
    val mod  = if (colNum.even) then "even-" else "odd-"
    val elem = if (isBody) then "td-" else "th-"
    val idx  = colNum.show + "-"
    val prefixes = ["cell-","col-","col-" + mod, "col-" + idx,
                    elem, elem + mod, elem+idx] +
                    (if (isLast) then ["col-last-",elem + "last-"] else [])
    val allkvs  = attrs.keyvals + rowstyle.keyvals
    val kvs = allkvs.filterKeyvals(prefixes)
    kvs
  }

  fun formatRow( colNum : int, row : list<cell>, cols : list<attrs>, rowstyle : attrs ) : <inlineContext> list<cell> {
    
    match(row) {
      Cons(cell,rs) -> {
        match(cols) {
          Cons(colstyle,cs) -> {
            // merge with row style
            val colstyle0 = rowstyle.mergeDefault(colstyle)

            // span multiple columns?
            val (txt1,colspan) = match(cell.text_.find(rxbars)) {
              Nothing   -> (cell.text_,1)
              Just(cap) -> (cell.text_.substr(0,cap.index), cap.matched.length)
            }
            // combine borders in case of a multi-column
            val (colstyle1,cs1) = if (colspan<=1) then (colstyle0,cs)
                                    else {
                                      val colstylex = colstyle0.addKeyval("column-span",colspan.show)
                                      val colstyley = if (isBody) then colstylex
                                                        else colstylex.addKeyval("text-align",rowstyle.hasKey("text-align").maybe("center",id))
                                      match(cs.drop(colspan - 2)) {
                                        Cons(colstylez,csx)
                                            -> (colstyley.addClasses(colstylez.classes.filter(noalign))
                                                        .addKeyval("column-span",colspan.show),
                                                csx )
                                        Nil -> (colstyley.addKeyval("column-span",colspan.show),Nil)
                                      }
                                    }
            // horizontal line?
            val (colstyle2,txt2,elemName) = if (txt1.contains(rxDashes))
                                    then (colstyle1.addClass("cell-line"), "","tl")
                                    elif (txt1.contains(rxDDashes))
                                    then (colstyle1.addClass("cell-double-line"), "","tl")
                                    else (colstyle1,txt1,if (isBody) then "td" else "th")

            val isLast = rs.is-nil
            val extraClasses = [if (colNum.even) then "col-even" else "col-odd"] +
                                (if (isLast) then ["col-last"] else []) +
                                (if (colNum==1) then ["col-first"] else [])

            val colstyle3 = colstyle2.addClasses(extraClasses)
                                      .addKeyval("data-col",colNum.show)
            val colstyle4 = colstyle3.addKeyvals(defaultCellKeyvals(colNum,rowstyle,isLast))
            val colstyle5 = matchRules(getInlineContext().defaults,elemName, colstyle4)
            val elem = Cell(formatInline(txt2,colstyle5), colstyle5)
            Cons(elem, formatRow( colNum+colspan, rs, cs1, rowstyle))
          }
          _ -> Nil
        }
      }
      _ -> Nil
    }
  }


  fun addRowKey( target : string, key : string, test : bool ) : list<(string,string)> {
      if (!test) then [] else {
        match(attrs.hasKey(key)) {
          Nothing -> []
          Just(value) -> [(target,value)]
        }
      }
  }

  fun filterKeyvals( keyvals : list<(string,string)>, prefixes : list<string> ) : list<(string,string)> {
      keyvals.filterMap fn(kv) {
        val (key,value) = kv
        match (prefixes.reverse.find(fn(pre) { key.startsWith(pre) })) {
          Just(pre) -> {
            val skey = key.substr(pre.length)
            if (skey.find(rxSubSelect).is-just) then Nothing else Just((skey,value))
          }
          Nothing -> Nothing
        }
      }
  }

  fun defaultKeyvals( hasLine :  bool, rowNum : int, isLast : bool ) : list<(string,string)> {
      val mod = if (rowNum.even && rowNum != 0) then "even-" else "odd-"
      val row = if (isBody) then "tbody-tr-" else "thead-tr-"
      val idx = rowNum.show + "-"
      val prefixes = ["tr-","tr-" + mod,"tr-" + idx,
                      row, row + mod, row + idx ] +
                    (if (isLast) then ["tr-last-",row + "last-"] else [])
      val kvs = attrs.keyvals.filterKeyvals(prefixes)
      if (hasLine)
      then kvs.filter(fn(kv){kv.fst.startsWith("background-color") || kv.fst.startsWith("rule") })
      else kvs
  }

  fun containsDashes( row : row ) : bool {
    row.cells.any( fn(cell) { cell.text_.contains(rxDashes) || cell.text_.contains(rxDDashes) })
  }

  var rowNum := 0
  var rowCount := 0
  val firstHasLine = rows.take(1).all(containsDashes)
  val lastHasLine  = rows.reverse.take(1).all(containsDashes)
  val defaults = getInlineContext().defaults
  rows.map fn(row) {
    rowCount := rowCount+1
    val hasLine = row.containsDashes
    val isLast  = !hasLine && (rowCount == rows.length - (if (lastHasLine) then 1 else 0))
    if (!hasLine) then rowNum := rowNum+1

    val extraClasses = [if (isBody) then "tbody" else "thead",
                        if (rowNum.even) then "tr-even" else "tr-odd"] +
                       (if (isLast) then ["tr-last"] else []) +
                       (if (rowNum==1) then ["tr-first"] else [])
    val rowstyle0 = defaults.matchRules("tr",
                      row.rowAttrs.addClasses(extraClasses).addKeyval("data-row",rowNum.show))
    val rowstyle = rowstyle0.addKeyvals(
        addRowKey("rule-width", "rule-top-width", !isBody && rowNum==0 ) +
        addRowKey("rule-width", "rule-mid-width", isBody && rowNum==0 ) +
        addRowKey("rule-width", "rule-bottom-width", isBody && hasLine && rowCount == rows.length ) +
        addRowKey("rule-width", "rule-width", True ) +
        addRowKey("padding-top", "rule-top-sep", !isBody && firstHasLine && rowNum==1 && !hasLine ) +
        addRowKey("padding-top", "rule-mid-sep", isBody && rowNum==1 && !hasLine) +
        addRowKey("padding-bottom", "rule-mid-sep", !isBody && isLast ) +
        addRowKey("padding-bottom", "rule-bottom-sep", isBody && isLast )
      )
      .addKeyvals( defaultKeyvals(hasLine,rowNum,isLast) )
    Row(formatRow(1,row.cells,colstyles,rowstyle),rowstyle)
  }
}
val rxbars = regex(r"[|+]+$")
val rxSubSelect = regex(r"^(even|odd|last|\d+)\-")

fun noalign( s : string ) : bool { !(s.startsWith("align-")) }
