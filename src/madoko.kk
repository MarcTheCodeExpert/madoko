/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Parse Madoko markdown text.
module madoko

import std/data/dict
import std/text/regex
import std/os/path

import compat
import compat/dict
import compat/regex
import compat/path

//import backports
//import version

import common           // for label, lineMap, and attrs
import options
import metadata         // for parseMeta
import block            // just for the type block
import formatBlock      // just for formatContext
import inline           // for parseLineInfo
import formatInline
import definitions
import entity           // logEntities
import latexFormatter
import attributes       // expandKeys
import includes


/* --------------------------------------
  Types that are part of the public API
---------------------------------------- */

// TODO also migrate to range
pub struct position (path: string, line: int)

// Line information is 1-based and inclusive.
pub struct range (path: string, from: int, to: int)

pub struct referenceInfo (
  id: string,
  element: string,
  caption: string,
  position: null<position>
)

pub struct documentInfo (
  labels: vector<referenceInfo>,
  blocks: vector<blockInfo>,
  // just for debugging purposes we also include the original formatContext
  ctx : formatContext,
  log: string
)

// the type of block nodes we export to js / typescript
pub struct blockInfo (
  // the block kind
  kind: string,
  // the element id, empty if not present
  id: string,
  // the tag name, empty if not present
  name: string,
  // the child nodes
  content: vector<blockInfo>,
  // the text content
  text: string,
  // the classes
  classes: vector<string>,
  // attributes of the block node (like "caption")
  attributes: dict<string>,
  // TODO also include position and range information.
  position: null<range>
)

/* --------------------------------------
  Main library entry point
---------------------------------------- */

// Takes source markdown input and returns formatted html
pub fun markdown( src : string,
                          options : options = initialOptions0,
                          fmt : formatter = FmtTex
                        ) : pure (string,options,list<block>,formatContext)
{
  if (options.xmp) then markdownXmp(src,options,fmt) else markdownNormal(src,options,fmt)
}

/* --------------------------------------
  Alternative entry point used by LSP server implementation
---------------------------------------- */

// Runs the frontend to parse and analyze the document but does not
// generate an html or tex document.
//
// Resolves includes and also processes those files.
//
// TODO Currently the logs are very sparse... Did I omit too much of the
// processing to catch errors?
pub fun analyze(
  inputName : string, content : string, resolveIncludes: bool, continue : (documentInfo) -> io ()
) : io () {
  printRedirect( fn(s) { log("stdout", s) });

  val options = Options(
    version=version/version,
    lineNoWeb=True,
    embedLimit=0,
    verbose=1,
    full=Just(False),
    copyStyles=False)

  content.include(!resolveIncludes, inputName, "out/test.mdk", [inputName.dirname], options) fn(includedContent, lmap) {

    withLog("stdout") {
      // TODO speed up again, by adding option to not run `formatBlocks`
      //      AT ALL for the presentation compiler.
      val (_,_,blocks, ctx) = markdown(includedContent, options(lineMap=lmap))
      val stdout = getLog("stdout")
      val labeledElems = ctx.inlineContext.labels.list().map(labelInfo)
      val res = DocumentInfo(vector(labeledElems), blocks.toBlockInfos(inputName), ctx, stdout)
      continue(res)
    }
  }
  ()
}


// Process only markdown between <xmp> tags
fun markdownXmp( src : string, options : options = initialOptions0, fmt : formatter = FmtTex ) : pure (string,options,list<block>,formatContext)
{
  val commented = "~begin htmlraw\n" + src.replaceAll(rxxmp,"\n~end htmlraw\n$2\n~begin htmlraw\n") + "\n~end htmlraw"
  markdownNormal(commented, options, fmt)
}
val rxxmp = regex(r"(<xmp\b" + tagContent + r">)([\s\S]*?)</xmp>")

pub fun normalizeSource( src : string ) : string {
  val srcnl = if (src.contains('\r')) then src.replaceAll(regex(r"\r\n?"),"\n") else src
  srcnl.replaceAll(regex(r"\t"), "    ")
}

// Takes source markdown input and returns formatted html
fun markdownNormal( src0 : string, options0 : options = initialOptions0, fmt : formatter = FmtTex ) : pure (string,options,list<block>,formatContext)
{
  // first normalize the input: all tabs to 4 spaces.
  val (options1,src) = parseMeta(options0,fmt,src0.normalizeSource)
  val options = options1(metadata = options1.metadata.completeAuthorKeys)
  val xfull = options.full.maybe(True,id)
  val logo  = if (xfull && options.logo) then "\n\n~Begin LogoMadoko\n&LogoMadoko;\n~End LogoMadoko\n" else "\n"

  if (options.verbose>=4) then {
    trace("metadata: " + fmt.showFormatter)
    options.metadata.foreach fn(md) {
      trace("  " + md.fst + ": " + md.snd.cutoff(80))
    }
    trace("parse blocks")
  }
  //val blocks = parseBlocks(src,options.citestyle,options.bench,options.pedantic )

  if (options.citeAll) then log("aux",r"\citation{*}")

  // parse definitions
  val icontext  = inlineContext(fmt,options.metadata.dict,
                                    options.embedinfos,
                                    options.sanitize,options.bench,options.verbose,
                                    options.highlight,options.starBold,options.sandbox,options.prettyAlign)

  val (fblocks,fcontext)
    = parseBody(initialFormatContext(icontext,options.lineMap,
                                      options.headingBase,options.pedantic,fmt),
                options.lineNo,
                src + logo,
                options.metadata, options.tocDepth,
                options.sectionBase,options.sectionMax)

  // parse inline elements
  if (options.verbose>=3) then trace("parse inline")
  val body = formatBlocks(fcontext,fblocks)
  if (options.verbose>=3) then trace("generate output")


  // generate full html/tex if needed
  val res = if (xfull)
             then fmtLatexFull(body,options,fcontext.inlineContext.metadata)
             else body

  // emit file references if necessary
  if (!xfull || !(fmt.isFmtTex))  then fmtLatexFull("",options,fcontext.inlineContext.metadata) else ""

  if (options.verbose>=3) then trace("done")
  (res,options,fblocks,fcontext)
}

// Export initial options for JavaScript usage
pub val initialOptions0 = initialOptions();

pub fun initialOptions() {
  return Options();
}

pub fun traceRuleHist() {
  common/traceRuleHist()
}

fun logMetadata( mdata : metadata ) {
  mdata.foreach fn(kv) {
    val (key,value) = kv;
    if (!key.startsWith("~") && !key.startsWith(".") && !key.startsWith("#")) {
      log("entities", "{\"name\":" + key.json + ",\"value\":" + value.json + "}")
    }
  }
}


// Create an ":inlineContext"
pub fun inlineContext( fmt : formatter,
                               metadata : dict<string>,
                               embedinfos : dict<embedinfo>,
                               sanitize : bool = False,
                               bench: bool = False,
                               verbose : int = 0,
                               highlight : bool = True,
                               starBold : bool = False,
                               sandbox: bool = False,
                               prettyAlign : int = 2 ) : inlineContext
{
  val isTex2  = match(metadata["tex2"]) {
                  Just(value) -> value.toLower == "true"
                  _ -> False
                }

  InlineContext( inlineGrammar(fmt,bench), dict(), dict(), dict(),
                 emptyRules,
                 metadata, embedinfos,
                 sanitize, bench, verbose, highlight, starBold, sandbox, prettyAlign,
                 fmtLatexCmd,
                 fmtLatexEscape,
                 fmtLatexLink,
                 fmtLatexFootnote,
                 fmtLatexTable,
                 fmtLatexEnv,
                 fmtLatexCodePlain,
                 fmtLatexCodeToken,
                 fmtLatexLineInfo,
                 fmtLatexCodeTable,
                 fmtLatexMathCmd, // math cmd
                 fmtLatexMathEnv, // math env
                 fmt
               )
}


/* --------------------------------------
  Conversions between internal and external datatypes
---------------------------------------- */

fun range(attr: attrs, inputName: string): maybe<range> {
  match (attr.hasKey("data-line-start")) {
    Just(start) -> catch({
      val end = attr.lookupKey("data-line-end", start)
      val (path, startLine) = start.extractPosition(inputName)
      val (_, endLine) = end.extractPosition(inputName)
      Just(Range(path, startLine, endLine))
    }, fn(exn) { Nothing })
    Nothing -> Nothing
  }
}

fun extractPosition(locationString: string, inputName: string): exn (string, int) {
  val locs = (inputName + ":" + locationString).split(";").list
  val last = locs.last.split(":")
  (last[0], last[1].parseInt.unJust)
}

// we need the inputName to normalize position information
fun toBlockInfos(bs: list<block>, inputName: string): div vector<blockInfo> {
  vector(bs.map(fn(b){ b.toBlockInfo(inputName) }).concatMaybe)
}

// TODO also include range information in extracted block structure
fun toBlockInfo(b: block, inputName: string): div maybe<blockInfo> {
  match(b) {
    HLine( attrs ) ->
      Just(BlockInfo("hline", attrs.name, attrs.elem, vector(), "", vector(attrs.classes), dict(attrs.keyvals), attrs.range(inputName).null))
    Para( text, attrs ) ->
      Just(BlockInfo("para", attrs.name, attrs.elem, vector(), text, vector(attrs.classes), dict(attrs.keyvals), attrs.range(inputName).null))
    Code( text, _, attrs) ->
      Just(BlockInfo("code", attrs.name, attrs.elem, vector(), text, vector(attrs.classes), dict(attrs.keyvals), attrs.range(inputName).null))
    Quote( content, attrs) ->
      Just(BlockInfo("quote", attrs.name, attrs.elem, content.toBlockInfos(inputName), "", vector(attrs.classes), dict(attrs.keyvals), attrs.range(inputName).null))
    List( _, content, attrs) ->
      Just(BlockInfo("list", attrs.name, attrs.elem, content.toBlockInfos(inputName), "", vector(attrs.classes), dict(attrs.keyvals), attrs.range(inputName).null))
    Item( content, attrs) ->
      Just(BlockInfo("item", attrs.name, attrs.elem, content.toBlockInfos(inputName), "", vector(attrs.classes), dict(attrs.keyvals), attrs.range(inputName).null))
    Heading( _, text, attrs) ->
      Just(BlockInfo("heading", attrs.name, attrs.elem, vector(), text, vector(attrs.classes), dict(attrs.keyvals), attrs.range(inputName).null))
    // currently table cells are ignored
    Table( _, _, _, attrs) ->
      Just(BlockInfo("table", attrs.name, attrs.elem, vector(), "", vector(attrs.classes), dict(attrs.keyvals), attrs.range(inputName).null))
    Div( content, attrs) ->
      Just(BlockInfo("div", attrs.name, attrs.elem, content.toBlockInfos(inputName), "", vector(attrs.classes), dict(attrs.keyvals), attrs.range(inputName).null))
    Source( text, _, attrs) ->
      Just(BlockInfo("source", attrs.name, attrs.elem, vector(), text, vector(attrs.classes), dict(attrs.keyvals), attrs.range(inputName).null))
    _ -> Nothing
  }
}


fun labelInfo(elem: (string, label)): referenceInfo {
  val (id, label) = elem
  ReferenceInfo(id, label.element, label.labelCaption, null(label.labelPosition))
}

// TODO change to labelRange
fun labelPosition(label : label) : maybe<position> {
  match(label.labelAttrs.hasKey("data-line")) { 
    Just(info) -> {
      val (path, lineno) = parseLineInfo(info)
      Just(Position(path.lastPathSegment, lineno))
    }
    Nothing    -> Nothing
  }
}

pub fun lastPathSegment( lineInfo : string ) : string {
  match (lineInfo.find(rxLastPath)) {
    Nothing   -> lineInfo
    Just(cap) -> cap.groups[1]
  }
}
val rxLastPath = regex( r";([^:;]+):$")
