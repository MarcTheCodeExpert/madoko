/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// The ":options" type and parsing of the command line
module options


import compat/log
import std/os/env
import compat/dict
import std/os/flags
import std/text/regex
import std/os/path
import compat/path
import compat/env
import compat/string
import compat/regex
import compat/flags
import compat
import common

// Metadata is just a string to string map.
pub alias metadata = list<(string,string)>

// The options
pub struct options(
  version  : string = "",  // Initialized to the program version
  bench    : bool = False, // turn off more expensive features for benchmarking
  verbose  : int  = 0,      // be more verbose
  verboseMaxLine : int = 78, // format lines to be no longer than 78 characters
  pedantic : bool = False, // more pedantic list style mode
  sanitize : bool = False, // never output user defined html and attributes
  xmp      : bool = False, // only process markdown between xmp tags
  full     : maybe<bool> = Nothing, // generate a full html/latex file instead of a snippet
  tex      : bool = True,   // generate latex file
  rebuild  : bool = False,  // always rebuild bibtex, math etc.
  sandbox  : bool = False,  // run in a sandbox: only allow reading/writing from a subdirectory
  prelude  : string = "prelude", // standard prelude definitions

  title    : string = "",  // html title
  texHeader: string= "",   // literal tex header
  texHeaderx: string= "",  // literal tex header in non-math mode only
  texDocHeader: string= "",   // literal tex header after begin{document}
  texDocHeaderx: string= "",  // literal tex header after begin{document} in non-math mode only
  texFooter: string= "",   // literal tex footer
  texSectionNum: bool = True, // use tex section numbering

  bib      : string = "",  // bibliography definition files (.bib)

  packages : string = "",  // link to latex packages (.sty)
  packagesx: string = "",        // packages in non-math mode only
  docClass : string = "",        // latex document class (.cls)

  citeAll       : bool = False,
  tocDepth      : int  = 3, // max. depth for inclusion in the table of contents
  headingDepth  : int  = 3, // default depth where headings are numbered
  headingBase   : int  = 2, // heading level for #
  sectionMax    : int  = 0, // maximal depth for adding sections (0 = disable)
  sectionBase   : int  = 1, // starting section level.
  starBold      : bool = False, // use * for bold?
  prettyAlign   : int  = 2, // default alignment spaces for .pretty mode
  logo          : bool = False, // generate a logo at the end of the document

  highlight     : bool = True,
  hilitelang    : string = "",        // semi-colon separated list

  metadata      : metadata = [],
  embedinfos    : dict<embedinfo> = dict(),   // embed data, used in a browser
  embedLimit    : int = 512*1024,             // limit for embedding data (javascript, css, etc.)
  lineNo        : int = 1,                  // emit line no's. Use 0 to suppress.
  lineNoWeb     : bool = False,             // emit line no info in html pages.
  copyStyles    : bool = True,              // copy standard style files
  lineMap       : lineMap = End,            // keep track of line numbers in include files
  extractStart  : string = r"^(?:\/\/|--|[#%]|[<]!--|\(\*) *BEGIN *: *(\w+) *(?:--[>]|\*\))?$",
  extractEnd    : string = r"^(?:\/\/|--|[#%]|[<]!--|\(\*) *END *(?:[:] *(\w+) *)?(?:--[>]|\*\))?$"
);


pub struct commandOptions(
  showVersion : bool = False,
  convertTex  : bool = False,
  outputDir   : string = "out",
  installDir  : string = "",
  stylesDir   : string = "",
  inputs      : list<string> = [],
  options     : options = Options()
);

fun creq( f : (commandOptions,string) -> commandOptions, help : string ) : flag-parser<commandOptions>
{
  Req(f,help)
}

fun cflag( f : (commandOptions,bool) -> commandOptions ) : flag-parser<commandOptions>
{
  Bool(f)
}

fun oflag( f : (options,bool) -> options ) : flag-parser<commandOptions>
{
  Bool(fn(co:commandOptions,b:bool) { co(options = f(co.options,b)) })
}

fun oreq( f : (options,string) -> options, help : string ) : flag-parser<commandOptions>
{
  Req(fn(co:commandOptions,v:string) { co(options = f(co.options,v)) },help)
}

fun setbench( o : options, b : bool ) {
  if (b) {
    o(tocDepth=0,bench=True)
  }
  else {
    o(tocDepth=3,bench=False)
  }
}

val optionsDesc : list<flag<commandOptions>>
  = [ Flag( "",  ["version"], cflag(fn(co,v) { co(showVersion = v) }),   "Display version information" ),
      Flag( "v", ["verbose"], oflag(fn(o,v) { o(verbose = if (v) then o.verbose + 1 else 0) }),     "Be more verbose"),
      Flag( "",  ["odir"],    creq(fn(co,s) { co(outputDir=s) },"DIR"), "Write output files to the specified directory" ),
      Flag( "",  ["xmp"],     oflag(fn(o,v) { o(xmp = v) }),       "Only process markdown between <xmp> tags"),
      Flag( "",  ["tex"],     oflag(fn(o,v) { o(tex = v) }),       "Generate a LaTeX file"),

      Flag( "f", ["fragment"], oflag(fn(o,v) { o(full=Just(!v)) }), "Generate a fragment instead of a full document"),
      Flag( "",  ["sanitize"], oflag(fn(o,v) { o(sanitize = v) }), "Always escape or suppress user defined html"),
      Flag( "" , ["sandbox"],  oflag(fn(o,v) { o(sandbox=v) }),    "Run in a sandbox for secure server execution"),
      Flag( "",  ["pedantic"], oflag(fn(o,v) { o(pedantic = v) }), "Pedantic mode"),
      Flag( "",  ["bench"],    oflag(setbench),                     "For benchmarking: turn off numbering, etc."),
      Flag( "",  ["installdir"], creq(fn(co,s) { co(installDir=s) },"DIR"), "Set installation directory explicitly"),
      Flag( "",  ["stylesdir"], creq(fn(co,s) { co(stylesDir=s) },"DIR"), "Set the directory of the styles explicitly (defaults to <installDir>/styles)"),
      Flag( "r", ["rebuild"],  oflag(fn(o,v) { o(rebuild=v) }),    "Force rebuild bibliography, math, etc."),
      Flag( "",  ["prelude"],  oreq(fn(o,s) { o(prelude=s) }, "FILE"), "Include <FILE> at start of the document"),
      Flag( "",  ["verbose-max"], oreq(fn(o,s) { o(verboseMaxLine=parse-int-default(s,78)) }, "LEN"), "Maximum line length for messages" ),
      Flag( "m", ["meta"],     oreq(setMeta, "key:val"), "Semi-colon separated list of metadata values")
    ]

fun setMeta( opts0 : options, value : string ) : options {
  val keyvals = value.split(";")
  keyvals.foldl(opts0) fn(opts : options,keyval) {
    val i = keyval.indexOf(":")
    if (i > 0) {
      val key = keyval.substr(0,i).trim
      val s   = keyval.substr(i+1).trim
      opts(metadata = opts.metadata + [(key,s)] )
    }
    else {
      warning("illegal --meta option: " + value)
      opts
    }
  }
}

// Parse the options from the command line given some extra arguments (default `""`).
pub fun parseOptions( version : string, extra : string = "") : io maybe<commandOptions>
{
  parseOptionList(version, compat/env/arguments + extra.split(" ").filter(fn(s) { s != "" }))
}

pub fun parseOptionList( version : string, cmdargs  : list<string> ) : io maybe<commandOptions>
{
  // testOptions.usageInfo( header ).println
  val (options,args,errs) = parse( CommandOptions(options = Options(version=version)), optionsDesc, cmdargs )

  if (!(errs.is-nil)) {
    println( errs.join("\n") + "\n" + fullUsageInfo() )
    Nothing
  }
  elif (options.showVersion) {
    println( "Madoko, version " + version + ".")
    Nothing
  }
  elif (args.is-nil) {
    fullUsageInfo().println
    Nothing
  }
  else {
    Just(options(inputs = args).check())
  }
}

fun fullUsageInfo() {
  val header = "usage:\n madoko [options] files\n\noptions:"
  optionsDesc.usage(header) + "\n\nPrefix a flag with 'no-' to negate it. For example '--no-logo'."
}

// sanitize options
fun check( cmdOptions : commandOptions ) : io commandOptions
{
  val installDirectory = if (cmdOptions.installDir=="") then appdir().dirname else cmdOptions.installDir
  val stylesDirectory = if (cmdOptions.stylesDir=="") then installDirectory + "/../styles" else cmdOptions.stylesDir
  cmdOptions(installDir=installDirectory, stylesDir=stylesDirectory)
}


pub fun getDocName( opts : options ) : string {
  match(opts.metadata.find(fn(kv) { kv.fst == "docname" })) {
    Just(kv) -> kv.snd + ": "
    Nothing  -> ""
  }
}

fun cutoff( s : string, n : int ) : string {
  if (n<=1) return s
  s.lines.map(fn(line) {
    if (line.length >= n) then line.substr(0,n - 1) + "\n" + line.substr(n - 1) else line
  }).unlines
}

pub fun indent( opts : options, s : string, maxLine : int = 78 ) : string {
  s.cutoff(maxLine).lines.map(fn(line) { "  " + line }).unlines
}

pub fun print( opts :options, msg : string, level : int = 1  ) {
  if (opts.verbose >= level) println(opts.indent(opts.getDocName + msg,opts.verboseMaxLine))
}

pub fun printErr( opts :options, msg : string, level : int = 0  ) {
  if (opts.verbose >= level) println(opts.indent(msg,opts.verboseMaxLine))
}
