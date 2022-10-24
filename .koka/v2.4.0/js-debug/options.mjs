// Koka generated module: "options", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_text_regex from './std_text_regex.mjs';
import * as $compat_dict from './compat_dict.mjs';
import * as $compat from './compat.mjs';
import * as $compat_log from './compat_log.mjs';
import * as $compat_regex from './compat_regex.mjs';
import * as $common from './common.mjs';
import * as $std_os_flags from './std_os_flags.mjs';
import * as $compat_path from './compat_path.mjs';
import * as $compat_env from './compat_env.mjs';
import * as $std_os_env from './std_os_env.mjs';
import * as $compat_array from './compat_array.mjs';
import * as $compat_string from './compat_string.mjs';
import * as $compat_flags from './compat_flags.mjs';
 
// externals
 
// type declarations
// type options
export function Options(version, bench, verbose, verboseMaxLine, pedantic, sanitize, xmp, full, tex, rebuild, sandbox, prelude, title, texHeader, texHeaderx, texDocHeader, texDocHeaderx, texFooter, texSectionNum, bib, packages, packagesx, docClass, citeAll, tocDepth, headingDepth, headingBase, sectionMax, sectionBase, starBold, prettyAlign, logo, highlight, hilitelang, metadata, embedinfos, embedLimit, lineNo, lineNoWeb, copyStyles, lineMap, extractStart, extractEnd) /* (version : string, bench : bool, verbose : int, verboseMaxLine : int, pedantic : bool, sanitize : bool, xmp : bool, full : maybe<bool>, tex : bool, rebuild : bool, sandbox : bool, prelude : string, title : string, texHeader : string, texHeaderx : string, texDocHeader : string, texDocHeaderx : string, texFooter : string, texSectionNum : bool, bib : string, packages : string, packagesx : string, docClass : string, citeAll : bool, tocDepth : int, headingDepth : int, headingBase : int, sectionMax : int, sectionBase : int, starBold : bool, prettyAlign : int, logo : bool, highlight : bool, hilitelang : string, metadata : metadata, embedinfos : compat/dict/dict<common/embedinfo>, embedLimit : int, lineNo : int, lineNoWeb : bool, copyStyles : bool, lineMap : common/lineMap, extractStart : string, extractEnd : string) -> options */  {
  return { version: version, bench: bench, verbose: verbose, verboseMaxLine: verboseMaxLine, pedantic: pedantic, sanitize: sanitize, xmp: xmp, full: full, tex: tex, rebuild: rebuild, sandbox: sandbox, prelude: prelude, title: title, texHeader: texHeader, texHeaderx: texHeaderx, texDocHeader: texDocHeader, texDocHeaderx: texDocHeaderx, texFooter: texFooter, texSectionNum: texSectionNum, bib: bib, packages: packages, packagesx: packagesx, docClass: docClass, citeAll: citeAll, tocDepth: tocDepth, headingDepth: headingDepth, headingBase: headingBase, sectionMax: sectionMax, sectionBase: sectionBase, starBold: starBold, prettyAlign: prettyAlign, logo: logo, highlight: highlight, hilitelang: hilitelang, metadata: metadata, embedinfos: embedinfos, embedLimit: embedLimit, lineNo: lineNo, lineNoWeb: lineNoWeb, copyStyles: copyStyles, lineMap: lineMap, extractStart: extractStart, extractEnd: extractEnd };
}
// type commandOptions
export function CommandOptions(showVersion, convertTex, outputDir, installDir, stylesDir, inputs, options) /* (showVersion : bool, convertTex : bool, outputDir : string, installDir : string, stylesDir : string, inputs : list<string>, options : options) -> commandOptions */  {
  return { showVersion: showVersion, convertTex: convertTex, outputDir: outputDir, installDir: installDir, stylesDir: stylesDir, inputs: inputs, options: options };
}
 
// declarations
 
 
// Automatically generated. Retrieves the `version` constructor field of the `:options` type.
export function version(options0) /* (options : options) -> string */  {
  return options0.version;
}
 
 
// Automatically generated. Retrieves the `bench` constructor field of the `:options` type.
export function bench(options0) /* (options : options) -> bool */  {
  return options0.bench;
}
 
 
// Automatically generated. Retrieves the `verbose` constructor field of the `:options` type.
export function verbose(options0) /* (options : options) -> int */  {
  return options0.verbose;
}
 
 
// Automatically generated. Retrieves the `verboseMaxLine` constructor field of the `:options` type.
export function verboseMaxLine(options0) /* (options : options) -> int */  {
  return options0.verboseMaxLine;
}
 
 
// Automatically generated. Retrieves the `pedantic` constructor field of the `:options` type.
export function pedantic(options0) /* (options : options) -> bool */  {
  return options0.pedantic;
}
 
 
// Automatically generated. Retrieves the `sanitize` constructor field of the `:options` type.
export function sanitize(options0) /* (options : options) -> bool */  {
  return options0.sanitize;
}
 
 
// Automatically generated. Retrieves the `xmp` constructor field of the `:options` type.
export function xmp(options0) /* (options : options) -> bool */  {
  return options0.xmp;
}
 
 
// Automatically generated. Retrieves the `full` constructor field of the `:options` type.
export function full(options0) /* (options : options) -> maybe<bool> */  {
  return options0.full;
}
 
 
// Automatically generated. Retrieves the `tex` constructor field of the `:options` type.
export function tex(options0) /* (options : options) -> bool */  {
  return options0.tex;
}
 
 
// Automatically generated. Retrieves the `rebuild` constructor field of the `:options` type.
export function rebuild(options0) /* (options : options) -> bool */  {
  return options0.rebuild;
}
 
 
// Automatically generated. Retrieves the `sandbox` constructor field of the `:options` type.
export function sandbox(options0) /* (options : options) -> bool */  {
  return options0.sandbox;
}
 
 
// Automatically generated. Retrieves the `prelude` constructor field of the `:options` type.
export function prelude(options0) /* (options : options) -> string */  {
  return options0.prelude;
}
 
 
// Automatically generated. Retrieves the `title` constructor field of the `:options` type.
export function title(options0) /* (options : options) -> string */  {
  return options0.title;
}
 
 
// Automatically generated. Retrieves the `texHeader` constructor field of the `:options` type.
export function texHeader(options0) /* (options : options) -> string */  {
  return options0.texHeader;
}
 
 
// Automatically generated. Retrieves the `texHeaderx` constructor field of the `:options` type.
export function texHeaderx(options0) /* (options : options) -> string */  {
  return options0.texHeaderx;
}
 
 
// Automatically generated. Retrieves the `texDocHeader` constructor field of the `:options` type.
export function texDocHeader(options0) /* (options : options) -> string */  {
  return options0.texDocHeader;
}
 
 
// Automatically generated. Retrieves the `texDocHeaderx` constructor field of the `:options` type.
export function texDocHeaderx(options0) /* (options : options) -> string */  {
  return options0.texDocHeaderx;
}
 
 
// Automatically generated. Retrieves the `texFooter` constructor field of the `:options` type.
export function texFooter(options0) /* (options : options) -> string */  {
  return options0.texFooter;
}
 
 
// Automatically generated. Retrieves the `texSectionNum` constructor field of the `:options` type.
export function texSectionNum(options0) /* (options : options) -> bool */  {
  return options0.texSectionNum;
}
 
 
// Automatically generated. Retrieves the `bib` constructor field of the `:options` type.
export function bib(options0) /* (options : options) -> string */  {
  return options0.bib;
}
 
 
// Automatically generated. Retrieves the `packages` constructor field of the `:options` type.
export function packages(options0) /* (options : options) -> string */  {
  return options0.packages;
}
 
 
// Automatically generated. Retrieves the `packagesx` constructor field of the `:options` type.
export function packagesx(options0) /* (options : options) -> string */  {
  return options0.packagesx;
}
 
 
// Automatically generated. Retrieves the `docClass` constructor field of the `:options` type.
export function docClass(options0) /* (options : options) -> string */  {
  return options0.docClass;
}
 
 
// Automatically generated. Retrieves the `citeAll` constructor field of the `:options` type.
export function citeAll(options0) /* (options : options) -> bool */  {
  return options0.citeAll;
}
 
 
// Automatically generated. Retrieves the `tocDepth` constructor field of the `:options` type.
export function tocDepth(options0) /* (options : options) -> int */  {
  return options0.tocDepth;
}
 
 
// Automatically generated. Retrieves the `headingDepth` constructor field of the `:options` type.
export function headingDepth(options0) /* (options : options) -> int */  {
  return options0.headingDepth;
}
 
 
// Automatically generated. Retrieves the `headingBase` constructor field of the `:options` type.
export function headingBase(options0) /* (options : options) -> int */  {
  return options0.headingBase;
}
 
 
// Automatically generated. Retrieves the `sectionMax` constructor field of the `:options` type.
export function sectionMax(options0) /* (options : options) -> int */  {
  return options0.sectionMax;
}
 
 
// Automatically generated. Retrieves the `sectionBase` constructor field of the `:options` type.
export function sectionBase(options0) /* (options : options) -> int */  {
  return options0.sectionBase;
}
 
 
// Automatically generated. Retrieves the `starBold` constructor field of the `:options` type.
export function starBold(options0) /* (options : options) -> bool */  {
  return options0.starBold;
}
 
 
// Automatically generated. Retrieves the `prettyAlign` constructor field of the `:options` type.
export function prettyAlign(options0) /* (options : options) -> int */  {
  return options0.prettyAlign;
}
 
 
// Automatically generated. Retrieves the `logo` constructor field of the `:options` type.
export function logo(options0) /* (options : options) -> bool */  {
  return options0.logo;
}
 
 
// Automatically generated. Retrieves the `highlight` constructor field of the `:options` type.
export function highlight(options0) /* (options : options) -> bool */  {
  return options0.highlight;
}
 
 
// Automatically generated. Retrieves the `hilitelang` constructor field of the `:options` type.
export function hilitelang(options0) /* (options : options) -> string */  {
  return options0.hilitelang;
}
 
 
// Automatically generated. Retrieves the `metadata` constructor field of the `:options` type.
export function metadata(options0) /* (options : options) -> metadata */  {
  return options0.metadata;
}
 
 
// Automatically generated. Retrieves the `embedinfos` constructor field of the `:options` type.
export function embedinfos(options0) /* (options : options) -> compat/dict/dict<common/embedinfo> */  {
  return options0.embedinfos;
}
 
 
// Automatically generated. Retrieves the `embedLimit` constructor field of the `:options` type.
export function embedLimit(options0) /* (options : options) -> int */  {
  return options0.embedLimit;
}
 
 
// Automatically generated. Retrieves the `lineNo` constructor field of the `:options` type.
export function lineNo(options0) /* (options : options) -> int */  {
  return options0.lineNo;
}
 
 
// Automatically generated. Retrieves the `lineNoWeb` constructor field of the `:options` type.
export function lineNoWeb(options0) /* (options : options) -> bool */  {
  return options0.lineNoWeb;
}
 
 
// Automatically generated. Retrieves the `copyStyles` constructor field of the `:options` type.
export function copyStyles(options0) /* (options : options) -> bool */  {
  return options0.copyStyles;
}
 
 
// Automatically generated. Retrieves the `lineMap` constructor field of the `:options` type.
export function lineMap(options0) /* (options : options) -> common/lineMap */  {
  return options0.lineMap;
}
 
 
// Automatically generated. Retrieves the `extractStart` constructor field of the `:options` type.
export function extractStart(options0) /* (options : options) -> string */  {
  return options0.extractStart;
}
 
 
// Automatically generated. Retrieves the `extractEnd` constructor field of the `:options` type.
export function extractEnd(options0) /* (options : options) -> string */  {
  return options0.extractEnd;
}
 
export function _copy(_this, version0, bench0, verbose0, verboseMaxLine0, pedantic0, sanitize0, xmp0, full0, tex0, rebuild0, sandbox0, prelude0, title0, texHeader0, texHeaderx0, texDocHeader0, texDocHeaderx0, texFooter0, texSectionNum0, bib0, packages0, packagesx0, docClass0, citeAll0, tocDepth0, headingDepth0, headingBase0, sectionMax0, sectionBase0, starBold0, prettyAlign0, logo0, highlight0, hilitelang0, metadata0, embedinfos0, embedLimit0, lineNo0, lineNoWeb0, copyStyles0, lineMap0, extractStart0, extractEnd0) /* (options, version : optional<string>, bench : optional<bool>, verbose : optional<int>, verboseMaxLine : optional<int>, pedantic : optional<bool>, sanitize : optional<bool>, xmp : optional<bool>, full : optional<maybe<bool>>, tex : optional<bool>, rebuild : optional<bool>, sandbox : optional<bool>, prelude : optional<string>, title : optional<string>, texHeader : optional<string>, texHeaderx : optional<string>, texDocHeader : optional<string>, texDocHeaderx : optional<string>, texFooter : optional<string>, texSectionNum : optional<bool>, bib : optional<string>, packages : optional<string>, packagesx : optional<string>, docClass : optional<string>, citeAll : optional<bool>, tocDepth : optional<int>, headingDepth : optional<int>, headingBase : optional<int>, sectionMax : optional<int>, sectionBase : optional<int>, starBold : optional<bool>, prettyAlign : optional<int>, logo : optional<bool>, highlight : optional<bool>, hilitelang : optional<string>, metadata : optional<metadata>, embedinfos : optional<compat/dict/dict<common/embedinfo>>, embedLimit : optional<int>, lineNo : optional<int>, lineNoWeb : optional<bool>, copyStyles : optional<bool>, lineMap : optional<common/lineMap>, extractStart : optional<string>, extractEnd : optional<string>) -> options */  {
  if (version0 !== undefined) {
    var _x0 = version0;
  }
  else {
    var _x0 = _this.version;
  }
  if (bench0 !== undefined) {
    var _x1 = bench0;
  }
  else {
    var _x1 = _this.bench;
  }
  if (verbose0 !== undefined) {
    var _x2 = verbose0;
  }
  else {
    var _x2 = _this.verbose;
  }
  if (verboseMaxLine0 !== undefined) {
    var _x3 = verboseMaxLine0;
  }
  else {
    var _x3 = _this.verboseMaxLine;
  }
  if (pedantic0 !== undefined) {
    var _x4 = pedantic0;
  }
  else {
    var _x4 = _this.pedantic;
  }
  if (sanitize0 !== undefined) {
    var _x5 = sanitize0;
  }
  else {
    var _x5 = _this.sanitize;
  }
  if (xmp0 !== undefined) {
    var _x6 = xmp0;
  }
  else {
    var _x6 = _this.xmp;
  }
  if (full0 !== undefined) {
    var _x7 = full0;
  }
  else {
    var _x7 = _this.full;
  }
  if (tex0 !== undefined) {
    var _x8 = tex0;
  }
  else {
    var _x8 = _this.tex;
  }
  if (rebuild0 !== undefined) {
    var _x9 = rebuild0;
  }
  else {
    var _x9 = _this.rebuild;
  }
  if (sandbox0 !== undefined) {
    var _x10 = sandbox0;
  }
  else {
    var _x10 = _this.sandbox;
  }
  if (prelude0 !== undefined) {
    var _x11 = prelude0;
  }
  else {
    var _x11 = _this.prelude;
  }
  if (title0 !== undefined) {
    var _x12 = title0;
  }
  else {
    var _x12 = _this.title;
  }
  if (texHeader0 !== undefined) {
    var _x13 = texHeader0;
  }
  else {
    var _x13 = _this.texHeader;
  }
  if (texHeaderx0 !== undefined) {
    var _x14 = texHeaderx0;
  }
  else {
    var _x14 = _this.texHeaderx;
  }
  if (texDocHeader0 !== undefined) {
    var _x15 = texDocHeader0;
  }
  else {
    var _x15 = _this.texDocHeader;
  }
  if (texDocHeaderx0 !== undefined) {
    var _x16 = texDocHeaderx0;
  }
  else {
    var _x16 = _this.texDocHeaderx;
  }
  if (texFooter0 !== undefined) {
    var _x17 = texFooter0;
  }
  else {
    var _x17 = _this.texFooter;
  }
  if (texSectionNum0 !== undefined) {
    var _x18 = texSectionNum0;
  }
  else {
    var _x18 = _this.texSectionNum;
  }
  if (bib0 !== undefined) {
    var _x19 = bib0;
  }
  else {
    var _x19 = _this.bib;
  }
  if (packages0 !== undefined) {
    var _x20 = packages0;
  }
  else {
    var _x20 = _this.packages;
  }
  if (packagesx0 !== undefined) {
    var _x21 = packagesx0;
  }
  else {
    var _x21 = _this.packagesx;
  }
  if (docClass0 !== undefined) {
    var _x22 = docClass0;
  }
  else {
    var _x22 = _this.docClass;
  }
  if (citeAll0 !== undefined) {
    var _x23 = citeAll0;
  }
  else {
    var _x23 = _this.citeAll;
  }
  if (tocDepth0 !== undefined) {
    var _x24 = tocDepth0;
  }
  else {
    var _x24 = _this.tocDepth;
  }
  if (headingDepth0 !== undefined) {
    var _x25 = headingDepth0;
  }
  else {
    var _x25 = _this.headingDepth;
  }
  if (headingBase0 !== undefined) {
    var _x26 = headingBase0;
  }
  else {
    var _x26 = _this.headingBase;
  }
  if (sectionMax0 !== undefined) {
    var _x27 = sectionMax0;
  }
  else {
    var _x27 = _this.sectionMax;
  }
  if (sectionBase0 !== undefined) {
    var _x28 = sectionBase0;
  }
  else {
    var _x28 = _this.sectionBase;
  }
  if (starBold0 !== undefined) {
    var _x29 = starBold0;
  }
  else {
    var _x29 = _this.starBold;
  }
  if (prettyAlign0 !== undefined) {
    var _x30 = prettyAlign0;
  }
  else {
    var _x30 = _this.prettyAlign;
  }
  if (logo0 !== undefined) {
    var _x31 = logo0;
  }
  else {
    var _x31 = _this.logo;
  }
  if (highlight0 !== undefined) {
    var _x32 = highlight0;
  }
  else {
    var _x32 = _this.highlight;
  }
  if (hilitelang0 !== undefined) {
    var _x33 = hilitelang0;
  }
  else {
    var _x33 = _this.hilitelang;
  }
  if (metadata0 !== undefined) {
    var _x34 = metadata0;
  }
  else {
    var _x34 = _this.metadata;
  }
  if (embedinfos0 !== undefined) {
    var _x35 = embedinfos0;
  }
  else {
    var _x35 = _this.embedinfos;
  }
  if (embedLimit0 !== undefined) {
    var _x36 = embedLimit0;
  }
  else {
    var _x36 = _this.embedLimit;
  }
  if (lineNo0 !== undefined) {
    var _x37 = lineNo0;
  }
  else {
    var _x37 = _this.lineNo;
  }
  if (lineNoWeb0 !== undefined) {
    var _x38 = lineNoWeb0;
  }
  else {
    var _x38 = _this.lineNoWeb;
  }
  if (copyStyles0 !== undefined) {
    var _x39 = copyStyles0;
  }
  else {
    var _x39 = _this.copyStyles;
  }
  if (lineMap0 !== undefined) {
    var _x40 = lineMap0;
  }
  else {
    var _x40 = _this.lineMap;
  }
  if (extractStart0 !== undefined) {
    var _x41 = extractStart0;
  }
  else {
    var _x41 = _this.extractStart;
  }
  if (extractEnd0 !== undefined) {
    var _x42 = extractEnd0;
  }
  else {
    var _x42 = _this.extractEnd;
  }
  return Options(_x0, _x1, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14, _x15, _x16, _x17, _x18, _x19, _x20, _x21, _x22, _x23, _x24, _x25, _x26, _x27, _x28, _x29, _x30, _x31, _x32, _x33, _x34, _x35, _x36, _x37, _x38, _x39, _x40, _x41, _x42);
}
 
 
// Automatically generated. Retrieves the `showVersion` constructor field of the `:commandOptions` type.
export function showVersion(commandOptions) /* (commandOptions : commandOptions) -> bool */  {
  return commandOptions.showVersion;
}
 
 
// Automatically generated. Retrieves the `convertTex` constructor field of the `:commandOptions` type.
export function convertTex(commandOptions) /* (commandOptions : commandOptions) -> bool */  {
  return commandOptions.convertTex;
}
 
 
// Automatically generated. Retrieves the `outputDir` constructor field of the `:commandOptions` type.
export function outputDir(commandOptions) /* (commandOptions : commandOptions) -> string */  {
  return commandOptions.outputDir;
}
 
 
// Automatically generated. Retrieves the `installDir` constructor field of the `:commandOptions` type.
export function installDir(commandOptions) /* (commandOptions : commandOptions) -> string */  {
  return commandOptions.installDir;
}
 
 
// Automatically generated. Retrieves the `stylesDir` constructor field of the `:commandOptions` type.
export function stylesDir(commandOptions) /* (commandOptions : commandOptions) -> string */  {
  return commandOptions.stylesDir;
}
 
 
// Automatically generated. Retrieves the `inputs` constructor field of the `:commandOptions` type.
export function inputs(commandOptions) /* (commandOptions : commandOptions) -> list<string> */  {
  return commandOptions.inputs;
}
 
 
// Automatically generated. Retrieves the `options` constructor field of the `:commandOptions` type.
export function options(commandOptions) /* (commandOptions : commandOptions) -> options */  {
  return commandOptions.options;
}
 
export function _copy_1(_this, showVersion0, convertTex0, outputDir0, installDir0, stylesDir0, inputs0, options0) /* (commandOptions, showVersion : optional<bool>, convertTex : optional<bool>, outputDir : optional<string>, installDir : optional<string>, stylesDir : optional<string>, inputs : optional<list<string>>, options : optional<options>) -> commandOptions */  {
  if (showVersion0 !== undefined) {
    var _x43 = showVersion0;
  }
  else {
    var _x43 = _this.showVersion;
  }
  if (convertTex0 !== undefined) {
    var _x44 = convertTex0;
  }
  else {
    var _x44 = _this.convertTex;
  }
  if (outputDir0 !== undefined) {
    var _x45 = outputDir0;
  }
  else {
    var _x45 = _this.outputDir;
  }
  if (installDir0 !== undefined) {
    var _x46 = installDir0;
  }
  else {
    var _x46 = _this.installDir;
  }
  if (stylesDir0 !== undefined) {
    var _x47 = stylesDir0;
  }
  else {
    var _x47 = _this.stylesDir;
  }
  if (inputs0 !== undefined) {
    var _x48 = inputs0;
  }
  else {
    var _x48 = _this.inputs;
  }
  if (options0 !== undefined) {
    var _x49 = options0;
  }
  else {
    var _x49 = _this.options;
  }
  return CommandOptions(_x43, _x44, _x45, _x46, _x47, _x48, _x49);
}
 
export function cflag(f) /* (f : (commandOptions, bool) -> commandOptions) -> std/os/flags/flag-parser<commandOptions> */  {
  return $std_os_flags.Bool(f);
}
 
 
// monadic lift
export function _mlift6876_check(_c_6701, cmdOptions, _c_6702) /* (string, cmdOptions : commandOptions, string) -> commandOptions */  {
  return $std_core_hnd._open_none0(function() {
    var _x51 = undefined;
    if (_x51 !== undefined) {
      var _x50 = _x51;
    }
    else {
      var _x50 = cmdOptions.showVersion;
    }
    var _x53 = undefined;
    if (_x53 !== undefined) {
      var _x52 = _x53;
    }
    else {
      var _x52 = cmdOptions.convertTex;
    }
    var _x55 = undefined;
    if (_x55 !== undefined) {
      var _x54 = _x55;
    }
    else {
      var _x54 = cmdOptions.outputDir;
    }
    var _x57 = undefined;
    if (_x57 !== undefined) {
      var _x56 = _x57;
    }
    else {
      var _x56 = cmdOptions.inputs;
    }
    var _x59 = undefined;
    if (_x59 !== undefined) {
      var _x58 = _x59;
    }
    else {
      var _x58 = cmdOptions.options;
    }
    return CommandOptions(_x50, _x52, _x54, _c_6701, _c_6702, _x56, _x58);
  });
}
 
 
// monadic lift
export function _mlift6877_check(_y_6700) /* (std/os/path/path) -> io string */  {
  return $std_core_hnd._open_none1($std_os_path.dirname, _y_6700);
}
 
 
// monadic lift
export function _mlift6878_check(cmdOptions, _c_6701) /* (cmdOptions : commandOptions, string) -> commandOptions */  {
   
  var _x60 = (($std_core_hnd._open_none1(function(commandOptions1 /* commandOptions */ ) {
      return commandOptions1.stylesDir;
    }, cmdOptions)) === (""));
  if (_x60) {
    var x = $std_core._lp__plus__plus__1_rp_(_c_6701, "/../styles");
  }
  else {
    var x = $std_core_hnd._open_none1(function(commandOptions2 /* commandOptions */ ) {
        return commandOptions2.stylesDir;
      }, cmdOptions);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_6702 /* string */ ) {
      return _mlift6876_check(_c_6701, cmdOptions, _c_6702);
    });
  }
  else {
    return _mlift6876_check(_c_6701, cmdOptions, x);
  }
}
 
 
// sanitize options
export function check(cmdOptions) /* (cmdOptions : commandOptions) -> io commandOptions */  {
   
  var _x60 = (($std_core_hnd._open_none1(function(commandOptions /* commandOptions */ ) {
      return commandOptions.installDir;
    }, cmdOptions)) === (""));
  if (_x60) {
     
    var x0_6882 = $std_os_path.appdir();
    if ($std_core_hnd._yielding()) {
      var x = $std_core_hnd.yield_extend(_mlift6877_check);
    }
    else {
      var x = $std_core_hnd._open_none1($std_os_path.dirname, x0_6882);
    }
  }
  else {
    var x = $std_core_hnd._open_none1(function(commandOptions0 /* commandOptions */ ) {
        return commandOptions0.installDir;
      }, cmdOptions);
  }
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_c_6701 /* string */ ) {
      return _mlift6878_check(cmdOptions, _c_6701);
    });
  }
  else {
     
    var _x60 = (($std_core_hnd._open_none1(function(commandOptions1 /* commandOptions */ ) {
        return commandOptions1.stylesDir;
      }, cmdOptions)) === (""));
    if (_x60) {
      var x1 = $std_core._lp__plus__plus__1_rp_(x, "/../styles");
    }
    else {
      var x1 = $std_core_hnd._open_none1(function(commandOptions2 /* commandOptions */ ) {
          return commandOptions2.stylesDir;
        }, cmdOptions);
    }
    if ($std_core_hnd._yielding()) {
      return $std_core_hnd.yield_extend(function(_c_6702 /* string */ ) {
        return _mlift6876_check(x, cmdOptions, _c_6702);
      });
    }
    else {
      return $std_core_hnd._open_none0(function() {
        var _x61 = undefined;
        if (_x61 !== undefined) {
          var _x60 = _x61;
        }
        else {
          var _x60 = cmdOptions.showVersion;
        }
        var _x63 = undefined;
        if (_x63 !== undefined) {
          var _x62 = _x63;
        }
        else {
          var _x62 = cmdOptions.convertTex;
        }
        var _x65 = undefined;
        if (_x65 !== undefined) {
          var _x64 = _x65;
        }
        else {
          var _x64 = cmdOptions.outputDir;
        }
        var _x67 = undefined;
        if (_x67 !== undefined) {
          var _x66 = _x67;
        }
        else {
          var _x66 = cmdOptions.inputs;
        }
        var _x69 = undefined;
        if (_x69 !== undefined) {
          var _x68 = _x69;
        }
        else {
          var _x68 = cmdOptions.options;
        }
        return CommandOptions(_x60, _x62, _x64, x, x1, _x66, _x68);
      });
    }
  }
}
 
export function creq(f, help) /* (f : (commandOptions, string) -> commandOptions, help : string) -> std/os/flags/flag-parser<commandOptions> */  {
  return $std_os_flags.Req(f, help);
}
 
export function cutoff(s, n) /* (s : string, n : int) -> string */  {
  if ($std_core._int_le(n,1)) {
    return s;
  }
  else {
     
    var v_17126 = ((s).split(("\n")));
     
    var xs_6409 = $std_core.map_5($std_core.vlist(v_17126), function(line /* string */ ) {
        var _x70 = $std_core._int_ge(($std_core.count_1(line)),n);
        if (_x70) {
           
          var len_6418 = $std_core._int_sub(n,1);
           
          if ($std_core._int_le(len_6418,0)) {
            var left0_6414 = "";
          }
          else {
            var left0_6414 = $compat.substr2(line, 0, len_6418);
          }
           
          var left_6412 = $std_core._lp__plus__plus__1_rp_(left0_6414, "\n");
           
          var right_6413 = $compat.substr(line, $std_core._int_sub(n,1));
          return $std_core._lp__plus__plus__1_rp_(left_6412, right_6413);
        }
        else {
          return line;
        }
      });
    if (xs_6409 === null) {
      return "";
    }
    else {
      return $std_core._lift17203_unlines(xs_6409.tail, xs_6409.head);
    }
  }
}
 
export function oflag(f) /* (f : (options, bool) -> options) -> std/os/flags/flag-parser<commandOptions> */  {
  return $std_os_flags.Bool(function(co /* commandOptions */ , b /* bool */ ) {
     
    var _x70 = co.options;
    var _arg_1518 = f(_x70, b);
    var _x71 = undefined;
    if (_x71 !== undefined) {
      var _x70 = _x71;
    }
    else {
      var _x70 = co.showVersion;
    }
    var _x73 = undefined;
    if (_x73 !== undefined) {
      var _x72 = _x73;
    }
    else {
      var _x72 = co.convertTex;
    }
    var _x75 = undefined;
    if (_x75 !== undefined) {
      var _x74 = _x75;
    }
    else {
      var _x74 = co.outputDir;
    }
    var _x77 = undefined;
    if (_x77 !== undefined) {
      var _x76 = _x77;
    }
    else {
      var _x76 = co.installDir;
    }
    var _x79 = undefined;
    if (_x79 !== undefined) {
      var _x78 = _x79;
    }
    else {
      var _x78 = co.stylesDir;
    }
    var _x81 = undefined;
    if (_x81 !== undefined) {
      var _x80 = _x81;
    }
    else {
      var _x80 = co.inputs;
    }
    if (_arg_1518 !== undefined) {
      var _x82 = _arg_1518;
    }
    else {
      var _x82 = co.options;
    }
    return CommandOptions(_x70, _x72, _x74, _x76, _x78, _x80, _x82);
  });
}
 
export function oreq(f, help) /* (f : (options, string) -> options, help : string) -> std/os/flags/flag-parser<commandOptions> */  {
  return $std_os_flags.Req(function(co /* commandOptions */ , v /* string */ ) {
       
      var _x83 = co.options;
      var _arg_1603 = f(_x83, v);
      var _x84 = undefined;
      if (_x84 !== undefined) {
        var _x83 = _x84;
      }
      else {
        var _x83 = co.showVersion;
      }
      var _x86 = undefined;
      if (_x86 !== undefined) {
        var _x85 = _x86;
      }
      else {
        var _x85 = co.convertTex;
      }
      var _x88 = undefined;
      if (_x88 !== undefined) {
        var _x87 = _x88;
      }
      else {
        var _x87 = co.outputDir;
      }
      var _x90 = undefined;
      if (_x90 !== undefined) {
        var _x89 = _x90;
      }
      else {
        var _x89 = co.installDir;
      }
      var _x92 = undefined;
      if (_x92 !== undefined) {
        var _x91 = _x92;
      }
      else {
        var _x91 = co.stylesDir;
      }
      var _x94 = undefined;
      if (_x94 !== undefined) {
        var _x93 = _x94;
      }
      else {
        var _x93 = co.inputs;
      }
      if (_arg_1603 !== undefined) {
        var _x95 = _arg_1603;
      }
      else {
        var _x95 = co.options;
      }
      return CommandOptions(_x83, _x85, _x87, _x89, _x91, _x93, _x95);
    }, help);
}
 
export function setbench(o, b) /* (o : options, b : bool) -> options */  {
  if (b) {
    return _copy(o, undefined, true, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 0);
  }
  else {
    return _copy(o, undefined, false, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 3);
  }
}
 
export function setMeta(opts0, value) /* (opts0 : options, value : string) -> options */  {
   
  var v_17122 = ((value).split((";")));
   
  var keyvals = $std_core.vlist(v_17122);
  return $std_core.foldl(keyvals, opts0, function(opts /* options */ , keyval /* string */ ) {
       
      var i = $compat.indexOf_1(keyval, ":");
      if ($std_core._int_gt(i,0)) {
         
        if ($std_core._int_le(i,0)) {
          var s0_6427 = "";
        }
        else {
          var s0_6427 = $compat.substr2(keyval, 0, i);
        }
         
        var key = (((((s0_6427).replace(/^\s\s*/,'')))).replace(/\s+$/,''));
         
        var s2_6431 = $compat.substr(keyval, $std_core._int_add(i,1));
         
        var s3 = (((((s2_6431).replace(/^\s\s*/,'')))).replace(/\s+$/,''));
         
        var _x96 = opts.metadata;
        var _arg_2200 = $std_core.append(_x96, $std_core.Cons($std_core_types._Tuple2_(key, s3), $std_core.Nil));
        return _copy(opts, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2200);
      }
      else {
         
        var message_6437 = $std_core._lp__plus__plus__1_rp_("illegal --meta option: ", value);
         
        var _x97 = undefined;
        var _x96 = (_x97 !== undefined) ? _x97 : "warning";
        $compat_log.log(_x96, $std_core._lp__plus__plus__1_rp_("  warning: ", message_6437));
        return opts;
      }
    });
}
 
export function getDocName(opts) /* (opts : options) -> string */  {
  var _x97 = opts.metadata;
  var _x96 = $std_core.find(_x97, function(kv /* (string, string) */ ) {
      var _x98 = kv.fst;
      return (_x98 === ("docname"));
    });
  if (_x96 !== null) {
    var _x99 = _x96.value.snd;
    return $std_core._lp__plus__plus__1_rp_(_x99, ": ");
  }
  else {
    return "";
  }
}
 
 
// The options
export function _create_Options(version0, bench0, verbose0, verboseMaxLine0, pedantic0, sanitize0, xmp0, full0, tex0, rebuild0, sandbox0, prelude0, title0, texHeader0, texHeaderx0, texDocHeader0, texDocHeaderx0, texFooter0, texSectionNum0, bib0, packages0, packagesx0, docClass0, citeAll0, tocDepth0, headingDepth0, headingBase0, sectionMax0, sectionBase0, starBold0, prettyAlign0, logo0, highlight0, hilitelang0, metadata0, embedinfos0, embedLimit0, lineNo0, lineNoWeb0, copyStyles0, lineMap0, extractStart0, extractEnd0) /* (version : optional<string>, bench : optional<bool>, verbose : optional<int>, verboseMaxLine : optional<int>, pedantic : optional<bool>, sanitize : optional<bool>, xmp : optional<bool>, full : optional<maybe<bool>>, tex : optional<bool>, rebuild : optional<bool>, sandbox : optional<bool>, prelude : optional<string>, title : optional<string>, texHeader : optional<string>, texHeaderx : optional<string>, texDocHeader : optional<string>, texDocHeaderx : optional<string>, texFooter : optional<string>, texSectionNum : optional<bool>, bib : optional<string>, packages : optional<string>, packagesx : optional<string>, docClass : optional<string>, citeAll : optional<bool>, tocDepth : optional<int>, headingDepth : optional<int>, headingBase : optional<int>, sectionMax : optional<int>, sectionBase : optional<int>, starBold : optional<bool>, prettyAlign : optional<int>, logo : optional<bool>, highlight : optional<bool>, hilitelang : optional<string>, metadata : optional<metadata>, embedinfos : optional<compat/dict/dict<common/embedinfo>>, embedLimit : optional<int>, lineNo : optional<int>, lineNoWeb : optional<bool>, copyStyles : optional<bool>, lineMap : optional<common/lineMap>, extractStart : optional<string>, extractEnd : optional<string>) -> options */  {
   
  if (embedinfos0 !== undefined) {
    var _embedinfos_2714 = embedinfos0;
  }
  else {
    var _embedinfos_2714 = $compat_dict.dict();
  }
   
  var _embedLimit_2726 = (embedLimit0 !== undefined) ? embedLimit0 : $std_core._int_mul(512,1024);
  var _x100 = (version0 !== undefined) ? version0 : "";
  var _x101 = (bench0 !== undefined) ? bench0 : false;
  var _x102 = (verbose0 !== undefined) ? verbose0 : 0;
  var _x103 = (verboseMaxLine0 !== undefined) ? verboseMaxLine0 : 78;
  var _x104 = (pedantic0 !== undefined) ? pedantic0 : false;
  var _x105 = (sanitize0 !== undefined) ? sanitize0 : false;
  var _x106 = (xmp0 !== undefined) ? xmp0 : false;
  var _x107 = (full0 !== undefined) ? full0 : $std_core_types.Nothing;
  var _x108 = (tex0 !== undefined) ? tex0 : true;
  var _x109 = (rebuild0 !== undefined) ? rebuild0 : false;
  var _x110 = (sandbox0 !== undefined) ? sandbox0 : false;
  var _x111 = (prelude0 !== undefined) ? prelude0 : "prelude";
  var _x112 = (title0 !== undefined) ? title0 : "";
  var _x113 = (texHeader0 !== undefined) ? texHeader0 : "";
  var _x114 = (texHeaderx0 !== undefined) ? texHeaderx0 : "";
  var _x115 = (texDocHeader0 !== undefined) ? texDocHeader0 : "";
  var _x116 = (texDocHeaderx0 !== undefined) ? texDocHeaderx0 : "";
  var _x117 = (texFooter0 !== undefined) ? texFooter0 : "";
  var _x118 = (texSectionNum0 !== undefined) ? texSectionNum0 : true;
  var _x119 = (bib0 !== undefined) ? bib0 : "";
  var _x120 = (packages0 !== undefined) ? packages0 : "";
  var _x121 = (packagesx0 !== undefined) ? packagesx0 : "";
  var _x122 = (docClass0 !== undefined) ? docClass0 : "";
  var _x123 = (citeAll0 !== undefined) ? citeAll0 : false;
  var _x124 = (tocDepth0 !== undefined) ? tocDepth0 : 3;
  var _x125 = (headingDepth0 !== undefined) ? headingDepth0 : 3;
  var _x126 = (headingBase0 !== undefined) ? headingBase0 : 2;
  var _x127 = (sectionMax0 !== undefined) ? sectionMax0 : 0;
  var _x128 = (sectionBase0 !== undefined) ? sectionBase0 : 1;
  var _x129 = (starBold0 !== undefined) ? starBold0 : false;
  var _x130 = (prettyAlign0 !== undefined) ? prettyAlign0 : 2;
  var _x131 = (logo0 !== undefined) ? logo0 : false;
  var _x132 = (highlight0 !== undefined) ? highlight0 : true;
  var _x133 = (hilitelang0 !== undefined) ? hilitelang0 : "";
  var _x134 = (metadata0 !== undefined) ? metadata0 : $std_core.Nil;
  var _x135 = (lineNo0 !== undefined) ? lineNo0 : 1;
  var _x136 = (lineNoWeb0 !== undefined) ? lineNoWeb0 : false;
  var _x137 = (copyStyles0 !== undefined) ? copyStyles0 : true;
  var _x138 = (lineMap0 !== undefined) ? lineMap0 : $common.End;
  var _x139 = (extractStart0 !== undefined) ? extractStart0 : "^(?:\\/\\/|--|[#%]|[<]!--|\\(\\*) *BEGIN *: *(\\w+) *(?:--[>]|\\*\\))?$";
  var _x140 = (extractEnd0 !== undefined) ? extractEnd0 : "^(?:\\/\\/|--|[#%]|[<]!--|\\(\\*) *END *(?:[:] *(\\w+) *)?(?:--[>]|\\*\\))?$";
  return Options(_x100, _x101, _x102, _x103, _x104, _x105, _x106, _x107, _x108, _x109, _x110, _x111, _x112, _x113, _x114, _x115, _x116, _x117, _x118, _x119, _x120, _x121, _x122, _x123, _x124, _x125, _x126, _x127, _x128, _x129, _x130, _x131, _x132, _x133, _x134, _embedinfos_2714, _embedLimit_2726, _x135, _x136, _x137, _x138, _x139, _x140);
}
 
export function _create_CommandOptions(showVersion0, convertTex0, outputDir0, installDir0, stylesDir0, inputs0, options0) /* (showVersion : optional<bool>, convertTex : optional<bool>, outputDir : optional<string>, installDir : optional<string>, stylesDir : optional<string>, inputs : optional<list<string>>, options : optional<options>) -> commandOptions */  {
   
  if (options0 !== undefined) {
    var _options_2913 = options0;
  }
  else {
     
    var _x141 = undefined;
    if (_x141 !== undefined) {
      var _embedinfos_2714 = _x141;
    }
    else {
      var _embedinfos_2714 = $compat_dict.dict();
    }
     
    var _x142 = undefined;
    var _embedLimit_2726 = (_x142 !== undefined) ? _x142 : $std_core._int_mul(512,1024);
    var _x142 = undefined;
    var _x141 = (_x142 !== undefined) ? _x142 : "";
    var _x144 = undefined;
    var _x143 = (_x144 !== undefined) ? _x144 : false;
    var _x146 = undefined;
    var _x145 = (_x146 !== undefined) ? _x146 : 0;
    var _x148 = undefined;
    var _x147 = (_x148 !== undefined) ? _x148 : 78;
    var _x150 = undefined;
    var _x149 = (_x150 !== undefined) ? _x150 : false;
    var _x152 = undefined;
    var _x151 = (_x152 !== undefined) ? _x152 : false;
    var _x154 = undefined;
    var _x153 = (_x154 !== undefined) ? _x154 : false;
    var _x156 = undefined;
    var _x155 = (_x156 !== undefined) ? _x156 : $std_core_types.Nothing;
    var _x158 = undefined;
    var _x157 = (_x158 !== undefined) ? _x158 : true;
    var _x160 = undefined;
    var _x159 = (_x160 !== undefined) ? _x160 : false;
    var _x162 = undefined;
    var _x161 = (_x162 !== undefined) ? _x162 : false;
    var _x164 = undefined;
    var _x163 = (_x164 !== undefined) ? _x164 : "prelude";
    var _x166 = undefined;
    var _x165 = (_x166 !== undefined) ? _x166 : "";
    var _x168 = undefined;
    var _x167 = (_x168 !== undefined) ? _x168 : "";
    var _x170 = undefined;
    var _x169 = (_x170 !== undefined) ? _x170 : "";
    var _x172 = undefined;
    var _x171 = (_x172 !== undefined) ? _x172 : "";
    var _x174 = undefined;
    var _x173 = (_x174 !== undefined) ? _x174 : "";
    var _x176 = undefined;
    var _x175 = (_x176 !== undefined) ? _x176 : "";
    var _x178 = undefined;
    var _x177 = (_x178 !== undefined) ? _x178 : true;
    var _x180 = undefined;
    var _x179 = (_x180 !== undefined) ? _x180 : "";
    var _x182 = undefined;
    var _x181 = (_x182 !== undefined) ? _x182 : "";
    var _x184 = undefined;
    var _x183 = (_x184 !== undefined) ? _x184 : "";
    var _x186 = undefined;
    var _x185 = (_x186 !== undefined) ? _x186 : "";
    var _x188 = undefined;
    var _x187 = (_x188 !== undefined) ? _x188 : false;
    var _x190 = undefined;
    var _x189 = (_x190 !== undefined) ? _x190 : 3;
    var _x192 = undefined;
    var _x191 = (_x192 !== undefined) ? _x192 : 3;
    var _x194 = undefined;
    var _x193 = (_x194 !== undefined) ? _x194 : 2;
    var _x196 = undefined;
    var _x195 = (_x196 !== undefined) ? _x196 : 0;
    var _x198 = undefined;
    var _x197 = (_x198 !== undefined) ? _x198 : 1;
    var _x200 = undefined;
    var _x199 = (_x200 !== undefined) ? _x200 : false;
    var _x202 = undefined;
    var _x201 = (_x202 !== undefined) ? _x202 : 2;
    var _x204 = undefined;
    var _x203 = (_x204 !== undefined) ? _x204 : false;
    var _x206 = undefined;
    var _x205 = (_x206 !== undefined) ? _x206 : true;
    var _x208 = undefined;
    var _x207 = (_x208 !== undefined) ? _x208 : "";
    var _x210 = undefined;
    var _x209 = (_x210 !== undefined) ? _x210 : $std_core.Nil;
    var _x212 = undefined;
    var _x211 = (_x212 !== undefined) ? _x212 : 1;
    var _x214 = undefined;
    var _x213 = (_x214 !== undefined) ? _x214 : false;
    var _x216 = undefined;
    var _x215 = (_x216 !== undefined) ? _x216 : true;
    var _x218 = undefined;
    var _x217 = (_x218 !== undefined) ? _x218 : $common.End;
    var _x220 = undefined;
    var _x219 = (_x220 !== undefined) ? _x220 : "^(?:\\/\\/|--|[#%]|[<]!--|\\(\\*) *BEGIN *: *(\\w+) *(?:--[>]|\\*\\))?$";
    var _x222 = undefined;
    var _x221 = (_x222 !== undefined) ? _x222 : "^(?:\\/\\/|--|[#%]|[<]!--|\\(\\*) *END *(?:[:] *(\\w+) *)?(?:--[>]|\\*\\))?$";
    var _options_2913 = Options(_x141, _x143, _x145, _x147, _x149, _x151, _x153, _x155, _x157, _x159, _x161, _x163, _x165, _x167, _x169, _x171, _x173, _x175, _x177, _x179, _x181, _x183, _x185, _x187, _x189, _x191, _x193, _x195, _x197, _x199, _x201, _x203, _x205, _x207, _x209, _embedinfos_2714, _embedLimit_2726, _x211, _x213, _x215, _x217, _x219, _x221);
  }
  var _x141 = (showVersion0 !== undefined) ? showVersion0 : false;
  var _x142 = (convertTex0 !== undefined) ? convertTex0 : false;
  var _x143 = (outputDir0 !== undefined) ? outputDir0 : "out";
  var _x144 = (installDir0 !== undefined) ? installDir0 : "";
  var _x145 = (stylesDir0 !== undefined) ? stylesDir0 : "";
  var _x146 = (inputs0 !== undefined) ? inputs0 : $std_core.Nil;
  return CommandOptions(_x141, _x142, _x143, _x144, _x145, _x146, _options_2913);
}
 
export var optionsDesc;
var optionsDesc = $std_core.vlist([$std_os_flags.Flag("", $std_core.Cons("version", $std_core.Nil), $std_os_flags.Bool(function(co /* commandOptions */ , v /* bool */ ) {
        var _x148 = undefined;
        if (_x148 !== undefined) {
          var _x147 = _x148;
        }
        else {
          var _x147 = co.convertTex;
        }
        var _x150 = undefined;
        if (_x150 !== undefined) {
          var _x149 = _x150;
        }
        else {
          var _x149 = co.outputDir;
        }
        var _x152 = undefined;
        if (_x152 !== undefined) {
          var _x151 = _x152;
        }
        else {
          var _x151 = co.installDir;
        }
        var _x154 = undefined;
        if (_x154 !== undefined) {
          var _x153 = _x154;
        }
        else {
          var _x153 = co.stylesDir;
        }
        var _x156 = undefined;
        if (_x156 !== undefined) {
          var _x155 = _x156;
        }
        else {
          var _x155 = co.inputs;
        }
        var _x158 = undefined;
        if (_x158 !== undefined) {
          var _x157 = _x158;
        }
        else {
          var _x157 = co.options;
        }
        return CommandOptions(v, _x147, _x149, _x151, _x153, _x155, _x157);
      }), "Display version information"), $std_os_flags.Flag("v", $std_core.Cons("verbose", $std_core.Nil), $std_os_flags.Bool(function(co0 /* commandOptions */ , b /* bool */ ) {
         
        if (b) {
          var _x160 = co0.options.verbose;
          var _x159 = $std_core._int_add(_x160,1);
        }
        else {
          var _x159 = 0;
        }
        var _arg_5050 = _x159;
         
        var _x161 = co0.options;
        var _arg_1518 = _copy(_x161, undefined, undefined, _arg_5050);
        var _x160 = undefined;
        if (_x160 !== undefined) {
          var _x159 = _x160;
        }
        else {
          var _x159 = co0.showVersion;
        }
        var _x162 = undefined;
        if (_x162 !== undefined) {
          var _x161 = _x162;
        }
        else {
          var _x161 = co0.convertTex;
        }
        var _x164 = undefined;
        if (_x164 !== undefined) {
          var _x163 = _x164;
        }
        else {
          var _x163 = co0.outputDir;
        }
        var _x166 = undefined;
        if (_x166 !== undefined) {
          var _x165 = _x166;
        }
        else {
          var _x165 = co0.installDir;
        }
        var _x168 = undefined;
        if (_x168 !== undefined) {
          var _x167 = _x168;
        }
        else {
          var _x167 = co0.stylesDir;
        }
        var _x170 = undefined;
        if (_x170 !== undefined) {
          var _x169 = _x170;
        }
        else {
          var _x169 = co0.inputs;
        }
        if (_arg_1518 !== undefined) {
          var _x171 = _arg_1518;
        }
        else {
          var _x171 = co0.options;
        }
        return CommandOptions(_x159, _x161, _x163, _x165, _x167, _x169, _x171);
      }), "Be more verbose"), $std_os_flags.Flag("", $std_core.Cons("odir", $std_core.Nil), $std_os_flags.Req(function(co00 /* commandOptions */ , s /* string */ ) {
          var _x173 = undefined;
          if (_x173 !== undefined) {
            var _x172 = _x173;
          }
          else {
            var _x172 = co00.showVersion;
          }
          var _x175 = undefined;
          if (_x175 !== undefined) {
            var _x174 = _x175;
          }
          else {
            var _x174 = co00.convertTex;
          }
          var _x177 = undefined;
          if (_x177 !== undefined) {
            var _x176 = _x177;
          }
          else {
            var _x176 = co00.installDir;
          }
          var _x179 = undefined;
          if (_x179 !== undefined) {
            var _x178 = _x179;
          }
          else {
            var _x178 = co00.stylesDir;
          }
          var _x181 = undefined;
          if (_x181 !== undefined) {
            var _x180 = _x181;
          }
          else {
            var _x180 = co00.inputs;
          }
          var _x183 = undefined;
          if (_x183 !== undefined) {
            var _x182 = _x183;
          }
          else {
            var _x182 = co00.options;
          }
          return CommandOptions(_x172, _x174, s, _x176, _x178, _x180, _x182);
        }, "DIR"), "Write output files to the specified directory"), $std_os_flags.Flag("", $std_core.Cons("xmp", $std_core.Nil), $std_os_flags.Bool(function(co1 /* commandOptions */ , b0 /* bool */ ) {
         
        var _x184 = co1.options;
        var _arg_15180 = _copy(_x184, undefined, undefined, undefined, undefined, undefined, undefined, b0);
        var _x185 = undefined;
        if (_x185 !== undefined) {
          var _x184 = _x185;
        }
        else {
          var _x184 = co1.showVersion;
        }
        var _x187 = undefined;
        if (_x187 !== undefined) {
          var _x186 = _x187;
        }
        else {
          var _x186 = co1.convertTex;
        }
        var _x189 = undefined;
        if (_x189 !== undefined) {
          var _x188 = _x189;
        }
        else {
          var _x188 = co1.outputDir;
        }
        var _x191 = undefined;
        if (_x191 !== undefined) {
          var _x190 = _x191;
        }
        else {
          var _x190 = co1.installDir;
        }
        var _x193 = undefined;
        if (_x193 !== undefined) {
          var _x192 = _x193;
        }
        else {
          var _x192 = co1.stylesDir;
        }
        var _x195 = undefined;
        if (_x195 !== undefined) {
          var _x194 = _x195;
        }
        else {
          var _x194 = co1.inputs;
        }
        if (_arg_15180 !== undefined) {
          var _x196 = _arg_15180;
        }
        else {
          var _x196 = co1.options;
        }
        return CommandOptions(_x184, _x186, _x188, _x190, _x192, _x194, _x196);
      }), "Only process markdown between <xmp> tags"), $std_os_flags.Flag("", $std_core.Cons("tex", $std_core.Nil), $std_os_flags.Bool(function(co2 /* commandOptions */ , b1 /* bool */ ) {
         
        var _x197 = co2.options;
        var _arg_15181 = _copy(_x197, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, b1);
        var _x198 = undefined;
        if (_x198 !== undefined) {
          var _x197 = _x198;
        }
        else {
          var _x197 = co2.showVersion;
        }
        var _x200 = undefined;
        if (_x200 !== undefined) {
          var _x199 = _x200;
        }
        else {
          var _x199 = co2.convertTex;
        }
        var _x202 = undefined;
        if (_x202 !== undefined) {
          var _x201 = _x202;
        }
        else {
          var _x201 = co2.outputDir;
        }
        var _x204 = undefined;
        if (_x204 !== undefined) {
          var _x203 = _x204;
        }
        else {
          var _x203 = co2.installDir;
        }
        var _x206 = undefined;
        if (_x206 !== undefined) {
          var _x205 = _x206;
        }
        else {
          var _x205 = co2.stylesDir;
        }
        var _x208 = undefined;
        if (_x208 !== undefined) {
          var _x207 = _x208;
        }
        else {
          var _x207 = co2.inputs;
        }
        if (_arg_15181 !== undefined) {
          var _x209 = _arg_15181;
        }
        else {
          var _x209 = co2.options;
        }
        return CommandOptions(_x197, _x199, _x201, _x203, _x205, _x207, _x209);
      }), "Generate a LaTeX file"), $std_os_flags.Flag("f", $std_core.Cons("fragment", $std_core.Nil), $std_os_flags.Bool(function(co3 /* commandOptions */ , b2 /* bool */ ) {
         
        var _x210 = co3.options;
        var _x211 = (b2) ? false : true;
        var _arg_15182 = _copy(_x210, undefined, undefined, undefined, undefined, undefined, undefined, undefined, $std_core_types.Just(_x211));
        var _x211 = undefined;
        if (_x211 !== undefined) {
          var _x210 = _x211;
        }
        else {
          var _x210 = co3.showVersion;
        }
        var _x213 = undefined;
        if (_x213 !== undefined) {
          var _x212 = _x213;
        }
        else {
          var _x212 = co3.convertTex;
        }
        var _x215 = undefined;
        if (_x215 !== undefined) {
          var _x214 = _x215;
        }
        else {
          var _x214 = co3.outputDir;
        }
        var _x217 = undefined;
        if (_x217 !== undefined) {
          var _x216 = _x217;
        }
        else {
          var _x216 = co3.installDir;
        }
        var _x219 = undefined;
        if (_x219 !== undefined) {
          var _x218 = _x219;
        }
        else {
          var _x218 = co3.stylesDir;
        }
        var _x221 = undefined;
        if (_x221 !== undefined) {
          var _x220 = _x221;
        }
        else {
          var _x220 = co3.inputs;
        }
        if (_arg_15182 !== undefined) {
          var _x222 = _arg_15182;
        }
        else {
          var _x222 = co3.options;
        }
        return CommandOptions(_x210, _x212, _x214, _x216, _x218, _x220, _x222);
      }), "Generate a fragment instead of a full document"), $std_os_flags.Flag("", $std_core.Cons("sanitize", $std_core.Nil), $std_os_flags.Bool(function(co4 /* commandOptions */ , b4 /* bool */ ) {
         
        var _x223 = co4.options;
        var _arg_15183 = _copy(_x223, undefined, undefined, undefined, undefined, undefined, b4);
        var _x224 = undefined;
        if (_x224 !== undefined) {
          var _x223 = _x224;
        }
        else {
          var _x223 = co4.showVersion;
        }
        var _x226 = undefined;
        if (_x226 !== undefined) {
          var _x225 = _x226;
        }
        else {
          var _x225 = co4.convertTex;
        }
        var _x228 = undefined;
        if (_x228 !== undefined) {
          var _x227 = _x228;
        }
        else {
          var _x227 = co4.outputDir;
        }
        var _x230 = undefined;
        if (_x230 !== undefined) {
          var _x229 = _x230;
        }
        else {
          var _x229 = co4.installDir;
        }
        var _x232 = undefined;
        if (_x232 !== undefined) {
          var _x231 = _x232;
        }
        else {
          var _x231 = co4.stylesDir;
        }
        var _x234 = undefined;
        if (_x234 !== undefined) {
          var _x233 = _x234;
        }
        else {
          var _x233 = co4.inputs;
        }
        if (_arg_15183 !== undefined) {
          var _x235 = _arg_15183;
        }
        else {
          var _x235 = co4.options;
        }
        return CommandOptions(_x223, _x225, _x227, _x229, _x231, _x233, _x235);
      }), "Always escape or suppress user defined html"), $std_os_flags.Flag("", $std_core.Cons("sandbox", $std_core.Nil), $std_os_flags.Bool(function(co5 /* commandOptions */ , b5 /* bool */ ) {
         
        var _x236 = co5.options;
        var _arg_15184 = _copy(_x236, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, b5);
        var _x237 = undefined;
        if (_x237 !== undefined) {
          var _x236 = _x237;
        }
        else {
          var _x236 = co5.showVersion;
        }
        var _x239 = undefined;
        if (_x239 !== undefined) {
          var _x238 = _x239;
        }
        else {
          var _x238 = co5.convertTex;
        }
        var _x241 = undefined;
        if (_x241 !== undefined) {
          var _x240 = _x241;
        }
        else {
          var _x240 = co5.outputDir;
        }
        var _x243 = undefined;
        if (_x243 !== undefined) {
          var _x242 = _x243;
        }
        else {
          var _x242 = co5.installDir;
        }
        var _x245 = undefined;
        if (_x245 !== undefined) {
          var _x244 = _x245;
        }
        else {
          var _x244 = co5.stylesDir;
        }
        var _x247 = undefined;
        if (_x247 !== undefined) {
          var _x246 = _x247;
        }
        else {
          var _x246 = co5.inputs;
        }
        if (_arg_15184 !== undefined) {
          var _x248 = _arg_15184;
        }
        else {
          var _x248 = co5.options;
        }
        return CommandOptions(_x236, _x238, _x240, _x242, _x244, _x246, _x248);
      }), "Run in a sandbox for secure server execution"), $std_os_flags.Flag("", $std_core.Cons("pedantic", $std_core.Nil), $std_os_flags.Bool(function(co6 /* commandOptions */ , b6 /* bool */ ) {
         
        var _x249 = co6.options;
        var _arg_15185 = _copy(_x249, undefined, undefined, undefined, undefined, b6);
        var _x250 = undefined;
        if (_x250 !== undefined) {
          var _x249 = _x250;
        }
        else {
          var _x249 = co6.showVersion;
        }
        var _x252 = undefined;
        if (_x252 !== undefined) {
          var _x251 = _x252;
        }
        else {
          var _x251 = co6.convertTex;
        }
        var _x254 = undefined;
        if (_x254 !== undefined) {
          var _x253 = _x254;
        }
        else {
          var _x253 = co6.outputDir;
        }
        var _x256 = undefined;
        if (_x256 !== undefined) {
          var _x255 = _x256;
        }
        else {
          var _x255 = co6.installDir;
        }
        var _x258 = undefined;
        if (_x258 !== undefined) {
          var _x257 = _x258;
        }
        else {
          var _x257 = co6.stylesDir;
        }
        var _x260 = undefined;
        if (_x260 !== undefined) {
          var _x259 = _x260;
        }
        else {
          var _x259 = co6.inputs;
        }
        if (_arg_15185 !== undefined) {
          var _x261 = _arg_15185;
        }
        else {
          var _x261 = co6.options;
        }
        return CommandOptions(_x249, _x251, _x253, _x255, _x257, _x259, _x261);
      }), "Pedantic mode"), $std_os_flags.Flag("", $std_core.Cons("bench", $std_core.Nil), oflag(setbench), "For benchmarking: turn off numbering, etc."), $std_os_flags.Flag("", $std_core.Cons("installdir", $std_core.Nil), $std_os_flags.Req(function(co10 /* commandOptions */ , s0 /* string */ ) {
          var _x263 = undefined;
          if (_x263 !== undefined) {
            var _x262 = _x263;
          }
          else {
            var _x262 = co10.showVersion;
          }
          var _x265 = undefined;
          if (_x265 !== undefined) {
            var _x264 = _x265;
          }
          else {
            var _x264 = co10.convertTex;
          }
          var _x267 = undefined;
          if (_x267 !== undefined) {
            var _x266 = _x267;
          }
          else {
            var _x266 = co10.outputDir;
          }
          var _x269 = undefined;
          if (_x269 !== undefined) {
            var _x268 = _x269;
          }
          else {
            var _x268 = co10.stylesDir;
          }
          var _x271 = undefined;
          if (_x271 !== undefined) {
            var _x270 = _x271;
          }
          else {
            var _x270 = co10.inputs;
          }
          var _x273 = undefined;
          if (_x273 !== undefined) {
            var _x272 = _x273;
          }
          else {
            var _x272 = co10.options;
          }
          return CommandOptions(_x262, _x264, _x266, s0, _x268, _x270, _x272);
        }, "DIR"), "Set installation directory explicitly"), $std_os_flags.Flag("", $std_core.Cons("stylesdir", $std_core.Nil), $std_os_flags.Req(function(co20 /* commandOptions */ , s1 /* string */ ) {
          var _x275 = undefined;
          if (_x275 !== undefined) {
            var _x274 = _x275;
          }
          else {
            var _x274 = co20.showVersion;
          }
          var _x277 = undefined;
          if (_x277 !== undefined) {
            var _x276 = _x277;
          }
          else {
            var _x276 = co20.convertTex;
          }
          var _x279 = undefined;
          if (_x279 !== undefined) {
            var _x278 = _x279;
          }
          else {
            var _x278 = co20.outputDir;
          }
          var _x281 = undefined;
          if (_x281 !== undefined) {
            var _x280 = _x281;
          }
          else {
            var _x280 = co20.installDir;
          }
          var _x283 = undefined;
          if (_x283 !== undefined) {
            var _x282 = _x283;
          }
          else {
            var _x282 = co20.inputs;
          }
          var _x285 = undefined;
          if (_x285 !== undefined) {
            var _x284 = _x285;
          }
          else {
            var _x284 = co20.options;
          }
          return CommandOptions(_x274, _x276, _x278, _x280, s1, _x282, _x284);
        }, "DIR"), "Set the directory of the styles explicitly (defaults to <installDir>/styles)"), $std_os_flags.Flag("r", $std_core.Cons("rebuild", $std_core.Nil), $std_os_flags.Bool(function(co7 /* commandOptions */ , b7 /* bool */ ) {
         
        var _x286 = co7.options;
        var _arg_15186 = _copy(_x286, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, b7);
        var _x287 = undefined;
        if (_x287 !== undefined) {
          var _x286 = _x287;
        }
        else {
          var _x286 = co7.showVersion;
        }
        var _x289 = undefined;
        if (_x289 !== undefined) {
          var _x288 = _x289;
        }
        else {
          var _x288 = co7.convertTex;
        }
        var _x291 = undefined;
        if (_x291 !== undefined) {
          var _x290 = _x291;
        }
        else {
          var _x290 = co7.outputDir;
        }
        var _x293 = undefined;
        if (_x293 !== undefined) {
          var _x292 = _x293;
        }
        else {
          var _x292 = co7.installDir;
        }
        var _x295 = undefined;
        if (_x295 !== undefined) {
          var _x294 = _x295;
        }
        else {
          var _x294 = co7.stylesDir;
        }
        var _x297 = undefined;
        if (_x297 !== undefined) {
          var _x296 = _x297;
        }
        else {
          var _x296 = co7.inputs;
        }
        if (_arg_15186 !== undefined) {
          var _x298 = _arg_15186;
        }
        else {
          var _x298 = co7.options;
        }
        return CommandOptions(_x286, _x288, _x290, _x292, _x294, _x296, _x298);
      }), "Force rebuild bibliography, math, etc."), $std_os_flags.Flag("", $std_core.Cons("prelude", $std_core.Nil), $std_os_flags.Req(function(co8 /* commandOptions */ , v8 /* string */ ) {
           
          var _x299 = co8.options;
          var _arg_1603 = _copy(_x299, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, v8);
          var _x300 = undefined;
          if (_x300 !== undefined) {
            var _x299 = _x300;
          }
          else {
            var _x299 = co8.showVersion;
          }
          var _x302 = undefined;
          if (_x302 !== undefined) {
            var _x301 = _x302;
          }
          else {
            var _x301 = co8.convertTex;
          }
          var _x304 = undefined;
          if (_x304 !== undefined) {
            var _x303 = _x304;
          }
          else {
            var _x303 = co8.outputDir;
          }
          var _x306 = undefined;
          if (_x306 !== undefined) {
            var _x305 = _x306;
          }
          else {
            var _x305 = co8.installDir;
          }
          var _x308 = undefined;
          if (_x308 !== undefined) {
            var _x307 = _x308;
          }
          else {
            var _x307 = co8.stylesDir;
          }
          var _x310 = undefined;
          if (_x310 !== undefined) {
            var _x309 = _x310;
          }
          else {
            var _x309 = co8.inputs;
          }
          if (_arg_1603 !== undefined) {
            var _x311 = _arg_1603;
          }
          else {
            var _x311 = co8.options;
          }
          return CommandOptions(_x299, _x301, _x303, _x305, _x307, _x309, _x311);
        }, "FILE"), "Include <FILE> at start of the document"), $std_os_flags.Flag("", $std_core.Cons("verbose-max", $std_core.Nil), $std_os_flags.Req(function(co9 /* commandOptions */ , v9 /* string */ ) {
           
          var _arg_3171 = $std_core.parse_int_default(v9, 78);
           
          var _x312 = co9.options;
          var _arg_16030 = _copy(_x312, undefined, undefined, undefined, _arg_3171);
          var _x313 = undefined;
          if (_x313 !== undefined) {
            var _x312 = _x313;
          }
          else {
            var _x312 = co9.showVersion;
          }
          var _x315 = undefined;
          if (_x315 !== undefined) {
            var _x314 = _x315;
          }
          else {
            var _x314 = co9.convertTex;
          }
          var _x317 = undefined;
          if (_x317 !== undefined) {
            var _x316 = _x317;
          }
          else {
            var _x316 = co9.outputDir;
          }
          var _x319 = undefined;
          if (_x319 !== undefined) {
            var _x318 = _x319;
          }
          else {
            var _x318 = co9.installDir;
          }
          var _x321 = undefined;
          if (_x321 !== undefined) {
            var _x320 = _x321;
          }
          else {
            var _x320 = co9.stylesDir;
          }
          var _x323 = undefined;
          if (_x323 !== undefined) {
            var _x322 = _x323;
          }
          else {
            var _x322 = co9.inputs;
          }
          if (_arg_16030 !== undefined) {
            var _x324 = _arg_16030;
          }
          else {
            var _x324 = co9.options;
          }
          return CommandOptions(_x312, _x314, _x316, _x318, _x320, _x322, _x324);
        }, "LEN"), "Maximum line length for messages"), $std_os_flags.Flag("m", $std_core.Cons("meta", $std_core.Nil), $std_os_flags.Req(function(co11 /* commandOptions */ , v10 /* string */ ) {
           
          var _x325 = co11.options;
          var _arg_16031 = setMeta(_x325, v10);
          var _x326 = undefined;
          if (_x326 !== undefined) {
            var _x325 = _x326;
          }
          else {
            var _x325 = co11.showVersion;
          }
          var _x328 = undefined;
          if (_x328 !== undefined) {
            var _x327 = _x328;
          }
          else {
            var _x327 = co11.convertTex;
          }
          var _x330 = undefined;
          if (_x330 !== undefined) {
            var _x329 = _x330;
          }
          else {
            var _x329 = co11.outputDir;
          }
          var _x332 = undefined;
          if (_x332 !== undefined) {
            var _x331 = _x332;
          }
          else {
            var _x331 = co11.installDir;
          }
          var _x334 = undefined;
          if (_x334 !== undefined) {
            var _x333 = _x334;
          }
          else {
            var _x333 = co11.stylesDir;
          }
          var _x336 = undefined;
          if (_x336 !== undefined) {
            var _x335 = _x336;
          }
          else {
            var _x335 = co11.inputs;
          }
          if (_arg_16031 !== undefined) {
            var _x337 = _arg_16031;
          }
          else {
            var _x337 = co11.options;
          }
          return CommandOptions(_x325, _x327, _x329, _x331, _x333, _x335, _x337);
        }, "key:val"), "Semi-colon separated list of metadata values")], $std_core.Nil);
 
export function fullUsageInfo() /* () -> string */  {
   
  var left_6525 = $std_os_flags.usage(optionsDesc, "usage:\n madoko [options] files\n\noptions:");
  return $std_core._lp__plus__plus__1_rp_(left_6525, "\n\nPrefix a flag with \'no-\' to negate it. For example \'--no-logo\'.");
}
 
export function indent(opts, s, maxLine) /* (opts : options, s : string, maxLine : optional<int>) -> string */  {
   
  var _x338 = (maxLine !== undefined) ? maxLine : 78;
  var s0_6528 = cutoff(s, _x338);
   
  var v_17126 = ((s0_6528).split(("\n")));
   
  var xs_6527 = $std_core.map_5($std_core.vlist(v_17126), function(line /* string */ ) {
      return $std_core._lp__plus__plus__1_rp_("  ", line);
    });
  if (xs_6527 === null) {
    return "";
  }
  else {
    return $std_core._lift17203_unlines(xs_6527.tail, xs_6527.head);
  }
}
 
 
// monadic lift
export function _mlift6879_parseOptionList(_y_6704) /* (commandOptions) -> io maybe<commandOptions> */  {
  return $std_core_types.Just(_y_6704);
}
 
 
// monadic lift
export function _mlift6880_parseOptionList(cmdargs, version0, _y_6703) /* (cmdargs : list<string>, version0 : string, commandOptions) -> <alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>> maybe<commandOptions> */  {
  var _x338 = $std_core_hnd._open_none4($std_os_flags.parse, _y_6703, optionsDesc, cmdargs);
   
  var _x111_6801 = $std_core.is_nil(_x338.thd);
  var _x339 = $std_core_hnd._open_none1(function(b /* bool */ ) {
      return (b) ? false : true;
    }, _x111_6801);
  if (_x339) {
     
    $std_core.printsln($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core_hnd._open_none2(function(xs /* list<string> */ , sep /* string */ ) {
            if (xs === null) {
              return "";
            }
            else {
              return $std_core._lift17188_joinsep(sep, xs.tail, xs.head);
            }
          }, _x338.thd, "\n"), "\n"), $std_core_hnd._open_none0(function() {
         
        var left1_6531 = $std_os_flags.usage(optionsDesc, "usage:\n madoko [options] files\n\noptions:");
        return $std_core._lp__plus__plus__1_rp_(left1_6531, "\n\nPrefix a flag with \'no-\' to negate it. For example \'--no-logo\'.");
      })));
    return $std_core_types.Nothing;
  }
  else {
    var _x340 = $std_core_hnd._open_none1(function(commandOptions /* commandOptions */ ) {
        return commandOptions.showVersion;
      }, _x338.fst);
    if (_x340) {
       
      $std_core.printsln($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_("Madoko, version ", version0), "."));
      return $std_core_types.Nothing;
    }
    else {
      var _x341 = $std_core.is_nil(_x338.snd);
      if (_x341) {
         
        $std_core.printsln($std_core_hnd._open_none0(function() {
           
          var left4_6533 = $std_os_flags.usage(optionsDesc, "usage:\n madoko [options] files\n\noptions:");
          return $std_core._lp__plus__plus__1_rp_(left4_6533, "\n\nPrefix a flag with \'no-\' to negate it. For example \'--no-logo\'.");
        }));
        return $std_core_types.Nothing;
      }
      else {
         
        var x0_6884 = check($std_core_hnd._open_none0(function() {
          var _x343 = undefined;
          if (_x343 !== undefined) {
            var _x342 = _x343;
          }
          else {
            var _x342 = _x338.fst.showVersion;
          }
          var _x345 = undefined;
          if (_x345 !== undefined) {
            var _x344 = _x345;
          }
          else {
            var _x344 = _x338.fst.convertTex;
          }
          var _x347 = undefined;
          if (_x347 !== undefined) {
            var _x346 = _x347;
          }
          else {
            var _x346 = _x338.fst.outputDir;
          }
          var _x349 = undefined;
          if (_x349 !== undefined) {
            var _x348 = _x349;
          }
          else {
            var _x348 = _x338.fst.installDir;
          }
          var _x351 = undefined;
          if (_x351 !== undefined) {
            var _x350 = _x351;
          }
          else {
            var _x350 = _x338.fst.stylesDir;
          }
          var _x353 = undefined;
          if (_x353 !== undefined) {
            var _x352 = _x353;
          }
          else {
            var _x352 = _x338.fst.options;
          }
          return CommandOptions(_x342, _x344, _x346, _x348, _x350, _x338.snd, _x352);
        }));
        if ($std_core_hnd._yielding()) {
          return $std_core_hnd.yield_extend(_mlift6879_parseOptionList);
        }
        else {
          return $std_core_types.Just(x0_6884);
        }
      }
    }
  }
}
 
export function parseOptionList(version0, cmdargs) /* (version : string, cmdargs : list<string>) -> io maybe<commandOptions> */  {
   
  var _arg_5626 = $std_core_hnd._open_none0(function() {
     
    var _x342 = undefined;
    if (_x342 !== undefined) {
      var _embedinfos_2714 = _x342;
    }
    else {
      var _embedinfos_2714 = $compat_dict.dict();
    }
     
    var _x343 = undefined;
    var _embedLimit_2726 = (_x343 !== undefined) ? _x343 : $std_core._int_mul(512,1024);
    var _x343 = undefined;
    var _x342 = (_x343 !== undefined) ? _x343 : false;
    var _x345 = undefined;
    var _x344 = (_x345 !== undefined) ? _x345 : 0;
    var _x347 = undefined;
    var _x346 = (_x347 !== undefined) ? _x347 : 78;
    var _x349 = undefined;
    var _x348 = (_x349 !== undefined) ? _x349 : false;
    var _x351 = undefined;
    var _x350 = (_x351 !== undefined) ? _x351 : false;
    var _x353 = undefined;
    var _x352 = (_x353 !== undefined) ? _x353 : false;
    var _x355 = undefined;
    var _x354 = (_x355 !== undefined) ? _x355 : $std_core_types.Nothing;
    var _x357 = undefined;
    var _x356 = (_x357 !== undefined) ? _x357 : true;
    var _x359 = undefined;
    var _x358 = (_x359 !== undefined) ? _x359 : false;
    var _x361 = undefined;
    var _x360 = (_x361 !== undefined) ? _x361 : false;
    var _x363 = undefined;
    var _x362 = (_x363 !== undefined) ? _x363 : "prelude";
    var _x365 = undefined;
    var _x364 = (_x365 !== undefined) ? _x365 : "";
    var _x367 = undefined;
    var _x366 = (_x367 !== undefined) ? _x367 : "";
    var _x369 = undefined;
    var _x368 = (_x369 !== undefined) ? _x369 : "";
    var _x371 = undefined;
    var _x370 = (_x371 !== undefined) ? _x371 : "";
    var _x373 = undefined;
    var _x372 = (_x373 !== undefined) ? _x373 : "";
    var _x375 = undefined;
    var _x374 = (_x375 !== undefined) ? _x375 : "";
    var _x377 = undefined;
    var _x376 = (_x377 !== undefined) ? _x377 : true;
    var _x379 = undefined;
    var _x378 = (_x379 !== undefined) ? _x379 : "";
    var _x381 = undefined;
    var _x380 = (_x381 !== undefined) ? _x381 : "";
    var _x383 = undefined;
    var _x382 = (_x383 !== undefined) ? _x383 : "";
    var _x385 = undefined;
    var _x384 = (_x385 !== undefined) ? _x385 : "";
    var _x387 = undefined;
    var _x386 = (_x387 !== undefined) ? _x387 : false;
    var _x389 = undefined;
    var _x388 = (_x389 !== undefined) ? _x389 : 3;
    var _x391 = undefined;
    var _x390 = (_x391 !== undefined) ? _x391 : 3;
    var _x393 = undefined;
    var _x392 = (_x393 !== undefined) ? _x393 : 2;
    var _x395 = undefined;
    var _x394 = (_x395 !== undefined) ? _x395 : 0;
    var _x397 = undefined;
    var _x396 = (_x397 !== undefined) ? _x397 : 1;
    var _x399 = undefined;
    var _x398 = (_x399 !== undefined) ? _x399 : false;
    var _x401 = undefined;
    var _x400 = (_x401 !== undefined) ? _x401 : 2;
    var _x403 = undefined;
    var _x402 = (_x403 !== undefined) ? _x403 : false;
    var _x405 = undefined;
    var _x404 = (_x405 !== undefined) ? _x405 : true;
    var _x407 = undefined;
    var _x406 = (_x407 !== undefined) ? _x407 : "";
    var _x409 = undefined;
    var _x408 = (_x409 !== undefined) ? _x409 : $std_core.Nil;
    var _x411 = undefined;
    var _x410 = (_x411 !== undefined) ? _x411 : 1;
    var _x413 = undefined;
    var _x412 = (_x413 !== undefined) ? _x413 : false;
    var _x415 = undefined;
    var _x414 = (_x415 !== undefined) ? _x415 : true;
    var _x417 = undefined;
    var _x416 = (_x417 !== undefined) ? _x417 : $common.End;
    var _x419 = undefined;
    var _x418 = (_x419 !== undefined) ? _x419 : "^(?:\\/\\/|--|[#%]|[<]!--|\\(\\*) *BEGIN *: *(\\w+) *(?:--[>]|\\*\\))?$";
    var _x421 = undefined;
    var _x420 = (_x421 !== undefined) ? _x421 : "^(?:\\/\\/|--|[#%]|[<]!--|\\(\\*) *END *(?:[:] *(\\w+) *)?(?:--[>]|\\*\\))?$";
    return Options(version0, _x342, _x344, _x346, _x348, _x350, _x352, _x354, _x356, _x358, _x360, _x362, _x364, _x366, _x368, _x370, _x372, _x374, _x376, _x378, _x380, _x382, _x384, _x386, _x388, _x390, _x392, _x394, _x396, _x398, _x400, _x402, _x404, _x406, _x408, _embedinfos_2714, _embedLimit_2726, _x410, _x412, _x414, _x416, _x418, _x420);
  });
   
  var x_6886 = $std_core_hnd._open_none0(function() {
     
    if (_arg_5626 !== undefined) {
      var _options_2913 = _arg_5626;
    }
    else {
       
      var _x422 = undefined;
      if (_x422 !== undefined) {
        var _embedinfos_27140 = _x422;
      }
      else {
        var _embedinfos_27140 = $compat_dict.dict();
      }
       
      var _x423 = undefined;
      var _embedLimit_27260 = (_x423 !== undefined) ? _x423 : $std_core._int_mul(512,1024);
      var _x423 = undefined;
      var _x422 = (_x423 !== undefined) ? _x423 : "";
      var _x425 = undefined;
      var _x424 = (_x425 !== undefined) ? _x425 : false;
      var _x427 = undefined;
      var _x426 = (_x427 !== undefined) ? _x427 : 0;
      var _x429 = undefined;
      var _x428 = (_x429 !== undefined) ? _x429 : 78;
      var _x431 = undefined;
      var _x430 = (_x431 !== undefined) ? _x431 : false;
      var _x433 = undefined;
      var _x432 = (_x433 !== undefined) ? _x433 : false;
      var _x435 = undefined;
      var _x434 = (_x435 !== undefined) ? _x435 : false;
      var _x437 = undefined;
      var _x436 = (_x437 !== undefined) ? _x437 : $std_core_types.Nothing;
      var _x439 = undefined;
      var _x438 = (_x439 !== undefined) ? _x439 : true;
      var _x441 = undefined;
      var _x440 = (_x441 !== undefined) ? _x441 : false;
      var _x443 = undefined;
      var _x442 = (_x443 !== undefined) ? _x443 : false;
      var _x445 = undefined;
      var _x444 = (_x445 !== undefined) ? _x445 : "prelude";
      var _x447 = undefined;
      var _x446 = (_x447 !== undefined) ? _x447 : "";
      var _x449 = undefined;
      var _x448 = (_x449 !== undefined) ? _x449 : "";
      var _x451 = undefined;
      var _x450 = (_x451 !== undefined) ? _x451 : "";
      var _x453 = undefined;
      var _x452 = (_x453 !== undefined) ? _x453 : "";
      var _x455 = undefined;
      var _x454 = (_x455 !== undefined) ? _x455 : "";
      var _x457 = undefined;
      var _x456 = (_x457 !== undefined) ? _x457 : "";
      var _x459 = undefined;
      var _x458 = (_x459 !== undefined) ? _x459 : true;
      var _x461 = undefined;
      var _x460 = (_x461 !== undefined) ? _x461 : "";
      var _x463 = undefined;
      var _x462 = (_x463 !== undefined) ? _x463 : "";
      var _x465 = undefined;
      var _x464 = (_x465 !== undefined) ? _x465 : "";
      var _x467 = undefined;
      var _x466 = (_x467 !== undefined) ? _x467 : "";
      var _x469 = undefined;
      var _x468 = (_x469 !== undefined) ? _x469 : false;
      var _x471 = undefined;
      var _x470 = (_x471 !== undefined) ? _x471 : 3;
      var _x473 = undefined;
      var _x472 = (_x473 !== undefined) ? _x473 : 3;
      var _x475 = undefined;
      var _x474 = (_x475 !== undefined) ? _x475 : 2;
      var _x477 = undefined;
      var _x476 = (_x477 !== undefined) ? _x477 : 0;
      var _x479 = undefined;
      var _x478 = (_x479 !== undefined) ? _x479 : 1;
      var _x481 = undefined;
      var _x480 = (_x481 !== undefined) ? _x481 : false;
      var _x483 = undefined;
      var _x482 = (_x483 !== undefined) ? _x483 : 2;
      var _x485 = undefined;
      var _x484 = (_x485 !== undefined) ? _x485 : false;
      var _x487 = undefined;
      var _x486 = (_x487 !== undefined) ? _x487 : true;
      var _x489 = undefined;
      var _x488 = (_x489 !== undefined) ? _x489 : "";
      var _x491 = undefined;
      var _x490 = (_x491 !== undefined) ? _x491 : $std_core.Nil;
      var _x493 = undefined;
      var _x492 = (_x493 !== undefined) ? _x493 : 1;
      var _x495 = undefined;
      var _x494 = (_x495 !== undefined) ? _x495 : false;
      var _x497 = undefined;
      var _x496 = (_x497 !== undefined) ? _x497 : true;
      var _x499 = undefined;
      var _x498 = (_x499 !== undefined) ? _x499 : $common.End;
      var _x501 = undefined;
      var _x500 = (_x501 !== undefined) ? _x501 : "^(?:\\/\\/|--|[#%]|[<]!--|\\(\\*) *BEGIN *: *(\\w+) *(?:--[>]|\\*\\))?$";
      var _x503 = undefined;
      var _x502 = (_x503 !== undefined) ? _x503 : "^(?:\\/\\/|--|[#%]|[<]!--|\\(\\*) *END *(?:[:] *(\\w+) *)?(?:--[>]|\\*\\))?$";
      var _options_2913 = Options(_x422, _x424, _x426, _x428, _x430, _x432, _x434, _x436, _x438, _x440, _x442, _x444, _x446, _x448, _x450, _x452, _x454, _x456, _x458, _x460, _x462, _x464, _x466, _x468, _x470, _x472, _x474, _x476, _x478, _x480, _x482, _x484, _x486, _x488, _x490, _embedinfos_27140, _embedLimit_27260, _x492, _x494, _x496, _x498, _x500, _x502);
    }
    var _x423 = undefined;
    var _x422 = (_x423 !== undefined) ? _x423 : false;
    var _x425 = undefined;
    var _x424 = (_x425 !== undefined) ? _x425 : false;
    var _x427 = undefined;
    var _x426 = (_x427 !== undefined) ? _x427 : "out";
    var _x429 = undefined;
    var _x428 = (_x429 !== undefined) ? _x429 : "";
    var _x431 = undefined;
    var _x430 = (_x431 !== undefined) ? _x431 : "";
    var _x433 = undefined;
    var _x432 = (_x433 !== undefined) ? _x433 : $std_core.Nil;
    return CommandOptions(_x422, _x424, _x426, _x428, _x430, _x432, _options_2913);
  });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_6703 /* commandOptions */ ) {
      return _mlift6880_parseOptionList(cmdargs, version0, _y_6703);
    });
  }
  else {
    var _x342 = $std_core_hnd._open_none4($std_os_flags.parse, x_6886, optionsDesc, cmdargs);
     
    var _x111_6801 = $std_core.is_nil(_x342.thd);
    var _x343 = $std_core_hnd._open_none1(function(b /* bool */ ) {
        return (b) ? false : true;
      }, _x111_6801);
    if (_x343) {
       
      $std_core.printsln($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($std_core_hnd._open_none2(function(xs /* list<string> */ , sep /* string */ ) {
              if (xs === null) {
                return "";
              }
              else {
                return $std_core._lift17188_joinsep(sep, xs.tail, xs.head);
              }
            }, _x342.thd, "\n"), "\n"), $std_core_hnd._open_none0(function() {
           
          var left1_6531 = $std_os_flags.usage(optionsDesc, "usage:\n madoko [options] files\n\noptions:");
          return $std_core._lp__plus__plus__1_rp_(left1_6531, "\n\nPrefix a flag with \'no-\' to negate it. For example \'--no-logo\'.");
        })));
      return $std_core_types.Nothing;
    }
    else {
      var _x344 = $std_core_hnd._open_none1(function(commandOptions /* commandOptions */ ) {
          return commandOptions.showVersion;
        }, _x342.fst);
      if (_x344) {
         
        $std_core.printsln($std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_("Madoko, version ", version0), "."));
        return $std_core_types.Nothing;
      }
      else {
        var _x345 = $std_core.is_nil(_x342.snd);
        if (_x345) {
           
          $std_core.printsln($std_core_hnd._open_none0(function() {
             
            var left4_6533 = $std_os_flags.usage(optionsDesc, "usage:\n madoko [options] files\n\noptions:");
            return $std_core._lp__plus__plus__1_rp_(left4_6533, "\n\nPrefix a flag with \'no-\' to negate it. For example \'--no-logo\'.");
          }));
          return $std_core_types.Nothing;
        }
        else {
           
          var x1_6896 = check($std_core_hnd._open_none0(function() {
            var _x347 = undefined;
            if (_x347 !== undefined) {
              var _x346 = _x347;
            }
            else {
              var _x346 = _x342.fst.showVersion;
            }
            var _x349 = undefined;
            if (_x349 !== undefined) {
              var _x348 = _x349;
            }
            else {
              var _x348 = _x342.fst.convertTex;
            }
            var _x351 = undefined;
            if (_x351 !== undefined) {
              var _x350 = _x351;
            }
            else {
              var _x350 = _x342.fst.outputDir;
            }
            var _x353 = undefined;
            if (_x353 !== undefined) {
              var _x352 = _x353;
            }
            else {
              var _x352 = _x342.fst.installDir;
            }
            var _x355 = undefined;
            if (_x355 !== undefined) {
              var _x354 = _x355;
            }
            else {
              var _x354 = _x342.fst.stylesDir;
            }
            var _x357 = undefined;
            if (_x357 !== undefined) {
              var _x356 = _x357;
            }
            else {
              var _x356 = _x342.fst.options;
            }
            return CommandOptions(_x346, _x348, _x350, _x352, _x354, _x342.snd, _x356);
          }));
          if ($std_core_hnd._yielding()) {
            return $std_core_hnd.yield_extend(_mlift6879_parseOptionList);
          }
          else {
            return $std_core_types.Just(x1_6896);
          }
        }
      }
    }
  }
}
 
 
// monadic lift
export function _mlift6881_parseOptions(version0, _y_6709) /* (version0 : string, list<string>) -> <alloc<global>,console,div,exn,fsys,ndet,net,read<global>,ui,write<global>> maybe<commandOptions> */  {
  return parseOptionList(version0, $std_core_hnd._open_none2($compat._lp__plus__1_rp_, $compat_env.$arguments, _y_6709));
}
 
 
// Parse the options from the command line given some extra arguments (default `""`).
export function parseOptions(version0, extra) /* (version : string, extra : optional<string>) -> io maybe<commandOptions> */  {
   
  var _x346 = (extra !== undefined) ? extra : "";
  var x_6899 = $std_core.filter($std_core_hnd._open_none2(function(s /* string */ , sep /* string */ ) {
         
        var v_17122 = ((s).split(sep));
        return $std_core.vlist(v_17122);
      }, _x346, " "), function(s0 /* string */ ) {
      return (s0 !== (""));
    });
  if ($std_core_hnd._yielding()) {
    return $std_core_hnd.yield_extend(function(_y_6709 /* list<string> */ ) {
      return parseOptionList(version0, $std_core_hnd._open_none2($compat._lp__plus__1_rp_, $compat_env.$arguments, _y_6709));
    });
  }
  else {
    return parseOptionList(version0, $std_core_hnd._open_none2($compat._lp__plus__1_rp_, $compat_env.$arguments, x_6899));
  }
}
 
export function print(opts, msg, level) /* (opts : options, msg : string, level : optional<int>) -> console () */  {
  var _x347 = opts.verbose;
  var _x348 = (level !== undefined) ? level : 1;
  var _x346 = $std_core._int_ge(_x347,_x348);
  if (_x346) {
     
    var _x350 = opts.metadata;
    var _x349 = $std_core.find(_x350, function(kv /* (string, string) */ ) {
        var _x351 = kv.fst;
        return (_x351 === ("docname"));
      });
    if (_x349 !== null) {
      var _x352 = _x349.value.snd;
      var left_6537 = $std_core._lp__plus__plus__1_rp_(_x352, ": ");
    }
    else {
      var left_6537 = "";
    }
     
    var s_6695 = $std_core._lp__plus__plus__1_rp_(left_6537, msg);
     
    var _x353 = opts.verboseMaxLine;
    var s0_6528 = cutoff(s_6695, _x353);
     
    var v_17126 = ((s0_6528).split(("\n")));
     
    var xs_6527 = $std_core.map_5($std_core.vlist(v_17126), function(line /* string */ ) {
        return $std_core._lp__plus__plus__1_rp_("  ", line);
      });
     
    if (xs_6527 === null) {
      var s_6536 = "";
    }
    else {
      var s_6536 = $std_core._lift17203_unlines(xs_6527.tail, xs_6527.head);
    }
    return $std_core.printsln(s_6536);
  }
  else {
    return $std_core_types._Unit_;
  }
}
 
export function printErr(opts, msg, level) /* (opts : options, msg : string, level : optional<int>) -> console () */  {
  var _x350 = opts.verbose;
  var _x351 = (level !== undefined) ? level : 0;
  var _x349 = $std_core._int_ge(_x350,_x351);
  if (_x349) {
     
    var _x352 = opts.verboseMaxLine;
    var s0_6528 = cutoff(msg, _x352);
     
    var v_17126 = ((s0_6528).split(("\n")));
     
    var xs_6527 = $std_core.map_5($std_core.vlist(v_17126), function(line /* string */ ) {
        return $std_core._lp__plus__plus__1_rp_("  ", line);
      });
     
    if (xs_6527 === null) {
      var s_6541 = "";
    }
    else {
      var s_6541 = $std_core._lift17203_unlines(xs_6527.tail, xs_6527.head);
    }
    return $std_core.printsln(s_6541);
  }
  else {
    return $std_core_types._Unit_;
  }
}