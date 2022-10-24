
module latexFormatter_Part2

import compat/log
import compat
import compat/path
import compat/dict
import compat/string
import compat/regex

import common
import entity
import inline
import options
import attributes
import codeAlign
import storage        // for xnormalize
import texCommon      // for texAccents et al
import cssFormatter
import latexFormatter_Part3
import latexFormatter_Part4

fun getTableEnv( attrs : attrs ) : string {
  if (attrs.hasBoolKey("pretty-breakable") || attrs.hasBoolKey("breakable") || attrs.hasClass("long") /* legacy */)
   then attrs.lookupKey("tex-longtable","longtable")
   else "tabular"
}
^
fun normalize( sandbox: bool, path : string ) : string {
  if (sandbox) then xnormalize(path) else path
}


type line {
  Single
  Double
  NoLine
}

pub fun isDouble(x: line): bool {
  match(x) {
    Double -> True
    _ -> False
  }
}

pub fun isNoLine(x: line): bool {
  match(x) {
    NoLine -> True
    _ -> False
  }
}


pub fun fmtLatexCodeTable( ctx : inlineContext, ct : codeTable, attrs : attrs ) : string {
  val table = attrs.getTableEnv
  val content =
      r"\\begin{mdcodetabular}" + ct.columns.show.braced +  r"\\begin" + table.braced + "{" + list(1,ct.columns).map(fn(_) {"l"}).join("") + r"}\n" + ct.rows.map( fn(row) { row.map(fmtLatexCodeCell).join("&") }).join(r"\\\\\n") +     r"\n\\end" + table.braced + r"\\end{mdcodetabular}%mdk\n"
  texEnv("",content,attrs.addClass("para-block"))
}

pub fun fmtLatexCodeCell( ccell : ccell ) : string {
  val align = if (ccell.center) then "c" else "l"
  if (ccell.span <= 1) then ccell.content else "\\multicolumn{" + ccell.span.show + "}{" + align + "}{" + ccell.content + "}"
}

pub fun fmtLatexTable( ctx : inlineContext, head : list<row>, body : list<row>, colattrs : list<attrs>, attrs : attrs ) : string {
  val rows = head + body
  val td = if (attrs.hasClass("columns")) then "column" else "td"
  val breakable = attrs.hasBoolKey("breakable") || attrs.hasClass("long") /* legacy */
  val table = if (breakable) then "longtable" else "tabular"
  val columns = max(1,rows.map(fn(r:row){ r.cells.length }).maximum)
  val colattrsx = (colattrs + list(colattrs.length,columns).map(fn(i){ attrsNone })).take(columns)
  val colfmts   = colattrsx.map(fn(ca) { fmtColumn(attrs,ca) })
  val defcolwidth  = colattrsx.fmtDefaultColumnWidth
  val tabcolsep    = attrs.lookupKey("tex-tabcolsep","1ex").cssWidth
  val tbody = "\\begin{mdtabular}" + columns.show.braced  + defcolwidth.braced + tabcolsep.braced +
                "%mdk\n\\begin{" + table + "}" +
                "{" + colfmts.join + "}" +
              head.fmtRows("th",colfmts,defcolwidth) + "\n" +
              body.fmtRows(td,colfmts,defcolwidth) +
              "\\end{" + table + "}\\end{mdtabular}\n"
  attrs.cssAttrs(tbody, if (breakable) then [("display","block")] else [])
}

pub fun fmtLatexPolyRow(cells: list<ccell>, col: int) : string {
  match(cells) {
    Nil -> ""
    Cons(cell, rest) -> {
      val rendered = "\\>[C" + col.show + "][l]" + cell.content
      rendered + fmtLatexPolyRow(rest, col + cell.span)
    }
  }
}

pub val fmtRowLineBreak = "\\morecmidrules\n" // \\\\[-\\mdTablelineskip]\n"

pub fun fmtColumn( attrs : attrs, colattr : attrs ) : string {
  match(colattr.hasKey("text-align")) {
    Just(alignment) -> alignment.substr(0,1)
    Nothing -> "l"
  }
}
pub fun fmtDefaultColumnWidth( colattrs : list<attrs> ) : string {
  val fixed = colattrs.concat( fn(ca) {
    if(ca.hasKey("width").bool) then {
      val kvs = dict(ca.keyvals).cssExpandKeys
      ["-" + dimBorderBoxWidth(kvs)]
    }
    else []
  })
  val flexible = colattrs.length - fixed.length
  if (flexible == 0) then "0pt"
    else "\\dimeval{(\\linewidth" + fixed.join + ")/" + flexible.show + "}"
}

pub fun fmtRows( rows : list<row>, td : string, colfmts : list<string>, defcolwidth : string ) : string {
  var lastIsLine := False
  val xrows = rows.map fn(row) {
    val lineRow = row.cells.map(fn(cell) {
                    if (cell.cellAttrs.hasClass("cell-line")) then Single
                    elif (cell.cellAttrs.hasClass("cell-double-line")) then Double
                    else NoLine
                  } )
    if (!(lineRow.all(isNoLine))) then {
      val res = (if (lastIsLine) then fmtRowLineBreak else "") + fmtLine(lineRow,row)
      lastIsLine := True
      res
    }
    else {
      val res = (if (lastIsLine) then "\n" else "") + fmtRow(td,row,colfmts,defcolwidth)
      lastIsLine := False
      res
    }
  }
  xrows.join() + (if (lastIsLine) then "\n" else "")
}


pub fun fmtLine( lines : list<line>, row : row ) : string
{
  fun width( cattrs : attrs ) {
    match(cattrs.hasKey("rule-width")) {
      Just(wd) -> "[" + wd.cssWidth + "]"
      Nothing  -> ""
    }
  }

  val line2 = if (!(lines.any(isDouble))) then "" else {
    fmtRowLineBreak +
     zipWithIndexed(row.cells,lines,fn(i,cell,line) {
      val attrs = cell.cellAttrs
      if (!(line.isDouble)) then ""
       else "\\cmidrule" + width(attrs) + "{" + (i+1).show + "-" + (i+ attrs.lookupKey("column-span","1").parseInt.maybe(1,id)).show + "}"
     }).join
  }

  val line1 = if (!(lines.any(isNoLine)) && line2=="") then "\\midrule" + width(row.rowAttrs) else {
    zipWithIndexed(row.cells,lines,fn(i,cell,line) {
      val attrs = cell.cellAttrs
      if (line.isNoLine) then ""
       else "\\cmidrule" + width(attrs) + "{" + (i+1).show + "-" + (i+ attrs.lookupKey("column-span","1").parseInt.maybe(1,id)).show + "}"
     }).join
  }
  line1 + line2

}



pub fun fmtRow( td : string, row : row, colfmts : list<string>, defcolwidth : string ) : string {
  /*
  rcolor = match (row.rowAttrs.hasKey("background-color")) {
             Nothing   -> ""
             Just(clr) -> "\\rowcolor" + fmtColorArg(clr)
           }
  rcolor + */
  compat/zipWith(row.cells,colfmts, fn(cell,colfmt) { fmtCell(td, cell.text_.trim,cell.cellAttrs,colfmt,defcolwidth) }).join("&")
    + "\\\\\n"
}



pub fun fmtCell( elem : string, body : string, attrs : attrs, colfmt : string, defcolwidth : string ) : string {
  if (elem=="column" || attrs.lookupKey("display","") == "block")
   then fmtCellBlock(elem,body,attrs,colfmt,defcolwidth)
   else fmtCellInline(elem,body,attrs,colfmt)
}

pub fun fmtCellBlock( elem : string, body : string, attrs : attrs, colfmt : string, defcolwidth : string ) : string {
  if (attrs.hasKey("width").bool)
    then texEnv(elem,body,attrs)
    else texEnv(elem,body,attrs.addKeyval("width","available"))
}

pub fun fmtCellInline( elem : string, body : string, attrs : attrs, colfmt : string ) : string {
  val colspan = attrs.lookupKey("column-span","1")
  val align   = match(attrs.hasKey("text-align")) {
                  Just(alignment) -> alignment.substr(0,1)
                  Nothing -> if (elem=="th") then "c" else "l"
                }
  val bcolor  = match (attrs.hasKey("background-color")) {
                  Nothing   -> ""
                  Just(clr) -> "{\\mdcellcolor" + cssColorArg(clr) + "}"
                }
  val fmt     = (if (attrs.hasClass("cell-border-left")) then "|" else "") + align +
                (if (attrs.hasClass("cell-border-right")) then "|" else "")

  val attrsx  = attrs( classes = attrs.classes.filter(fn(c){ c != "cell-border-left" && c != "cell-border-right" && !(c.startsWith("align-"))}),
                       keyvals = attrs.keyvals.filter(fn(kv){ kv.fst != "column-span" && kv.fst != "background-color" && kv.fst != "text-align"}))

  val content = if (elem=="column")
                 then texEnv(elem,body,attrsx)
                 else texCmd(elem,body,attrsx.addKeyval("display","inline"))

  if (colspan=="1" && fmt==colfmt) then bcolor + content
   else "\\multicolumn{" + colspan + "}{" + fmt + "}{" + bcolor + content + "}"
}





pub fun texList( tag : string, body : string, attrs : attrs ) : string {
  val args = cssListArgs( attrs )
  val env  = (if (attrs.hasKey("list-style-type").bool) then "enumerate" else attrs.lookupKey("tex-env","enumerate")) + args
  attrs.addKeyval("tex-env",env).cssAttrs(body,[("display","block")],"")
}


pub fun texAttrsX( attrs : attrs ) : string {
  ""
}

/* --------------------------------------
  Command and env
---------------------------------------- */

pub fun texCmd( cmd : string, body : string, attrs : attrs = attrsNone, pre : string = "md" ) : string {
  // val cmdName = if (attrs.texelem != "") then attrs.texelem else (pre + cmd.normalizeCmd.capitalize)
  // "\\" + cmdName + attrs.texAttrsX + "{" + body + "}"
  attrs.cssAttrs(body,[("display","inline")],cmd)
}

pub fun texCmdX( cmd : string, body : string, attrs : attrs = attrsNone, extra : list<(string,string)> = []) : string {
  // val cmdName = if (attrs.texelem != "") then attrs.texelem else (pre + cmd.normalizeCmd.capitalize)
  // "\\" + cmdName + attrs.texAttrsX + "{" + body + "}"
  attrs.cssAttrs(body,[("display","inline"),("tex-cmd",cmd)] + extra)
}


pub fun texEnv( env : string, body : string, attrs : attrs = attrsNone ) : string {
  texEnvPlain(env,body,attrs)
}

pub fun texEnvPlain( env : string, body : string, attrs : attrs ) : string {
  //val envName = (if (attrs.texelem != "") then attrs.texelem else ("md" + env.normalizeCmd.capitalize))
  val envCmd = // "\\begin{" + envName + "}" + attrs.texAttrsX + "%mdk\n" +
               attrs.cssAttrs(body,[("display","block")],env) // + "%mdk\n" +
               // "\\end{" + envName + "}%mdk\n"
  envCmd
  /*
  match(attrs.hasKey("float")) {
    Nothing   -> envCmd
    Just(flt) -> "\\mdfloatbox{" + flt + "}{" + attrs.lookupKey("lines","") + "}{" + envCmd + "}"
  }
  */
}

pub fun texClassName( attrs : attrs, def : string ) : (string,attrs) {
  val name = attrs.elementName(def)
  (name.normalizeCmd.capitalize,attrs(classes=attrs.classes.filter(fn(c){ c != name })))
}

pub fun normalizeCmd( cmd : string ) {
  cmd.replaceAll(rxCmdSpecial,"").replaceAll(rxDigits) fn(cap) {
    list(1,cap.matched.parseInt.maybe(0,id)).map(fn(i) { "x" }).join
  }
}
pub val rxDigits = regex(r"\d+")
pub val rxCmdSpecial = regex(r"[^a-zA-Z0-9]")



/* --------------------------------------
  Full header
---------------------------------------- */
pub fun fmtLatexFull(body : string, options : options, metadata : dict<string>) : string {
  fmtLatexFullX(body,options,metadata)
}

pub fun fmtLatexMathFull(body : string, options : options) : string {
  fmtLatexFullX(body,options,dict())
}

pub fun fmtLatexFullX(body : string, options : options, metadata1 : dict<string>) : string
{
  val metadata0 = [("heading-base",options.headingBase.show),
                   ("tex-section-num", options.texSectionNum.show.toLower),
                   ("bib-label", "true"),
                   ("font-spec", "true")].dict
  val metadata = metadata0 + metadata1

  fun expand(s) { s.expandKeys(metadata) }
  fun norm(p)   { normalize(options.sandbox,p) }

  val pkgs = (options.packages.expand + options.packagesx.expand).splitPaths
  val doc0 = if (options.docClass != "") then options.docClass.norm
             elif (options.headingBase >= 2) then "article" else "book"
  val doc  = doc0.expand

  [fmtOptArg(r"\documentclass", doc, norm, ext = ".cls"),
   "% generated by Madoko, version " + options.version,
   "%mdk-data-line={1}",
   pkgs.map(fn(pkg) {
      match (pkg.find(rxTexFile)) {
        Just -> {
          log("files", changeExt(pkg,".tex") );
          r"\input{" + pkg.norm + "}"
        }
        Nothing -> fmtOptArg(r"\usepackage",pkg,norm)
      }
    }).join("\n"),
   options.texHeader.expand,
   options.texHeaderx.expand,
   r"\begin{document}",
   options.texDocHeader.expand,
   options.texDocHeaderx.expand,
   body,
   options.texFooter.expand,
   r"\end{document}",""
   ].join("\n")
}

pub val rxTexFile = regex(r"^[^\n\r\[\]]+?\.tex$",ignoreCase=True)

pub fun fmtOptArg( pre:string, pkg : string, norm : string -> string,  ext : string = ".sty" ) : string
{
  pre + (match(pkg.find(rxPkgOpt)) {
    Just(cap) -> {
      val pname = cap.groups[2]
      if (pname.extname!="" || pname.dirname!="") {
        log("files", changeExt(pname,ext) );
      }
      (if (cap.groups[1] != "") then "[" + cap.groups[1] + "]" else "") +
        "{" + (if (ext==".cls" || ext==".sty") then pname.noext else pname).norm + "}"
    }
    Nothing  -> {
      val pname = pkg.trim
      if (pname.extname!="" || pname.dirname!="") {
        log("files", changeExt(pname,ext) )
      }
      "{" + (if (ext==".cls" || ext==".sty") then pname.noext else pname).norm + "}"
    }
  })
}


pub val rxPkgOpt = regex(r"^\s*(?:\[(.*?)\]\s*)?{?([^\*]+)\s*(?:\*\s*)?(?:}\s*)?$")
