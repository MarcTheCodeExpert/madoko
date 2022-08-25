/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Align code blocks
module codeAlign

import v1/std/log
import std/text/regex
import std/data/dict
import common
import attributes


pub struct codeTable(
  columns: int,
  rows: list<crow>
)

pub alias crow = list<ccell>;

pub struct ccell(
  span: int,
  center: bool,
  content: string 
)

pub fun foldCodeTable( ct : codeTable, st : a, f : (string,a) -> (string,a) ) : codeTable {
  fun foldRow( row, st0 ) {
    match(row) {
      Nil -> (Nil,st0)
      Cons(c,cs) -> {
        val (txt,st1) = f(c.content,st0)
        val (cs1,st2) = foldRow(cs,st1)
        (Cons(c(content=txt),cs1), st2)
      }
    }
  }
  fun foldRows( rows, st0 ) {
    match(rows) {
      Nil -> (Nil,st0)
      Cons(r,rs) -> {
        val (r1,st1) = foldRow(r,st0)
        val (rs1,st2) = foldRows(rs,st1)
        (Cons(r1,rs1), st2)
      }
    }
  }
  ct( rows = foldRows(ct.rows,st ).fst )
}

pub fun map( ct : codeTable,  f : (string,int) -> string ) : codeTable {
  ct( rows = ct.rows.map( fn(row) { row.mapIndexed( fn(idx,ccell) { ccell(content = f(ccell.content,idx)) }) }) )
}

pub fun show( ct : codeTable ) : string {
  "\\begin{tabular}{" + string(ct.columns,'l') + "}\n" +
   ct.rows.map( fn(row) { row.map(show).join(" & ") }).join("\\\\\n") +
     "\n\\end{tabular}"
}

fun show( ccell : ccell ) : string {
  val align = if (ccell.center) then "c|" else "l|"
  "\\mc{" + ccell.span.show + "}{" + align + "}{" + ccell.content.replaceAll(" ","~") + "}"
}


pub fun codeAlign( txt : string, sep : int = 2 ) : codeTable
{
  val rxSep = regex( @" {" + sep.show + ",}" )
  val ls    = txt.replaceAll("<br>","\n").lines.list
  //trace(ls.join("\n"))
  val colss = ls.map fn(line){ findAlignColumns(line,rxSep) }
  val acols = colss.merge 
  //trace("\nalign cols: " + acols.map(show).join(","))
  val rows  = zipWith(ls,colss) fn(line,cols){ makeRow(acols,line,cols,sep) }
  // trace("\nrows:\n" + rows.map(fn(row) { row.map(show).join(",") }).join("\n"))

  CodeTable( acols.length + 1, rows )
}


pub fun findAlignColumns( line : string, rxSep : regex) : list<int>
{
  val n = line.length
  line.findAll(rxSep).list.map(fn(cap) {
    if (cap.index + cap.matched.length >= n)
     then Nothing
     else Just(rawColumn( line, cap.index + cap.matched.length ))
  }).concatMaybe
}

fun rawColumn( line : string, col : int ) : int {
  // get column number disregarding html elements from colorization
  val raw = line.substr(0,col).replaceAll(rxTags,tagsSpaces)
  raw.length
}

fun htmlColumn( s: string, col : int ) : int {
  val caps = s.findAll(rxTags).list
  htmlCol( caps, col, 0 )
}

fun htmlCol( caps : list<matched>, col : int, extra : int ) {
  match( caps ) {
    Nil -> col + extra
    Cons(cap,rest) -> {
      if (cap.index < col + extra || (cap.index == col + extra && cap.matched.startsWith("</")))
       then htmlCol( rest, col, extra + cap.tagsLength )
       else col + extra
    }
  }
}

fun tagsSpaces( cap : matched ) : string {
  if (cap.matched.startsWith("<ESCAPED")) then string( cap.groups[1].parseInt.maybe(1,id), '.' )
  elif (cap.matched.startsWith("&")) then "."
  else ""
}

fun tagsLength( cap : matched ) : int {
  cap.matched.length - cap.tagsSpaces.length
}

val rxHtmlTags = @"</?\w+\b[^>]*>";
val rxTags = regex(@"<ESCAPED\s*(?:width=(\d*)\s*)?>[\s\S]*?</ESCAPED>|" + rxHtmlTags + @"|&(?:\w+|#[xX]?[\da-fA-F]+);")

fun merge( alignss : list<list<int>> ) : list<int>
{
  fun insert(xs : list<int>, y : int) : list<int> {
    match(xs) {
      Nil -> [y]
      Cons(x,xx) -> {
        if (x < y) then Cons(x,insert(xx,y))
        elif (x == y) then xs
        else Cons(y,xs)
      }
    }
  }
  alignss.concat().foldl([],insert)
}

fun makeRow( acols : list<int>, line : string, lineCols : list<int>, sep : int ) : list<ccell>
{
  val parts1 = splitColumns( line, 0, lineCols )
  /*
  trace("makeRow: " + acols.map(show).join(",") + ": " + lineCols.map(show).join(",") + "\n" +
         " line:\n" + line + "\n" +
         " parts:\n  " + 
           parts1.map(fn(p) { p.fst.show + ": " + p.snd }).join("\n  "))
  */
  val rxEndSpaces = regex( string(sep,' ') + "$")
  alignParts( acols, parts1, rxEndSpaces  )
}

pub fun isWhite( s : string ) : bool {
  s.replaceAll(rxWhite,"") == ""
}
val rxWhite = regex(rxHtmlTags + @"|\s+")

fun alignParts( acols : list<int>, parts : list<(int,string)>, rxEndSpaces : regex ) : list<ccell> {
  match( parts ) {
    Nil -> Nil
    Cons((col,text),rest) -> {
      val nextcol = getColumn(col,text,rest)
      val (spanCols,afterCols) = acols.getSpan(nextcol)
      val span = spanCols.length+1
      val ccells = if (text.isWhite) 
       then {
         val pre = string(col,' ')
         val ws = splitColumns( pre, col, spanCols )         
         ws.map( fn(_) { Ccell(1,False, " ") }) 
       }
       else {
         val stext = text.replace(rxEndSpaces," ")
         [Ccell(span,False,stext)]  
       }
      
      ccells + alignParts(afterCols, rest, rxEndSpaces)
    }
  }
}



fun getColumn( col:int, text : string, parts : list<(int,string)> ) : int {
  match(parts) {
    Nil -> 999 // col + text.replaceAll(rxTags,"").length
    Cons((c,_),_) -> c
  }
}

fun getIndentColumn( acols : list<int>, col : int, prev : int = 0 ) : int {
  match(acols) {
    Nil -> 0
    Cons(acol,rest) -> {
      if (acol == col) then 0  // no indentation necessary since it aligns
      elif (acol > col) then prev
      else getIndentColumn( rest, col, acol )
    }
  }
}

fun getSpan( acols : list<int>, col : int, acc : list<int> = [] ) : (list<int>,list<int>) {
  match(acols) {
    Nil -> (acc.reverse,Nil)
    Cons(acol,rest) -> {
      if (acol >= col) then (acc.reverse,rest) else getSpan( rest, col, Cons(acol,acc) )
    }
  }
}

fun splitColumns( line : string, col : int, lineCols : list<int> ) : list<(int,string)> {
  match(lineCols) {
    Nil -> [(col,line.subPart(col))]
    Cons(next,rest) -> {
      Cons( (col,line.subPart(col, next - col)), splitColumns( line, next, rest ) )
    }
  }
}

fun subPart( line : string, col : int, len : int = line.length ) : string {
  val col0 = htmlColumn(line,col)
  val col1 = htmlColumn(line,col + len)
  line.substr( col0, (col1 - col0) )
}

