// Koka generated module: "common", koka version: 2.4.0
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
 
// externals
 
// type declarations
// type formatter
export const FmtHtml = 1; // formatter
export const FmtTex = 2; // formatter
// type input
export const Pre = { _tag: 1 }; // input
export const MathPre = { _tag: 2 }; // input
export const Math = { _tag: 3 }; // input
export const MathDefs = { _tag: 4 }; // input
export const MathPoly = { _tag: 5 }; // input
export const Tex = { _tag: 6 }; // input
export function Raw(only) /* (only : maybe<formatter>) -> input */  {
  return { _tag: 7, only: only };
}
export function Markdown(only) /* (only : maybe<formatter>) -> input */  {
  return { _tag: 8, only: only };
}
// type attrs
export function Attrs(empty, sticky, defaults, text, replacers, notag, tight, input, elem, texelem, htmlelem, name, label, source, lineNo, classes, counters, keyvals) /* (empty : bool, sticky : bool, defaults : bool, text : string, replacers : list<string>, notag : bool, tight : bool, input : input, elem : string, texelem : string, htmlelem : string, name : string, label : string, source : string, lineNo : int, classes : list<string>, counters : list<(string, string)>, keyvals : list<(string, string)>) -> attrs */  {
  return { empty: empty, sticky: sticky, defaults: defaults, text: text, replacers: replacers, notag: notag, tight: tight, input: input, elem: elem, texelem: texelem, htmlelem: htmlelem, name: name, label: label, source: source, lineNo: lineNo, classes: classes, counters: counters, keyvals: keyvals };
}
// type cell
export function Cell(text, cellAttrs) /* (text : string, cellAttrs : attrs) -> cell */  {
  return { text: text, cellAttrs: cellAttrs };
}
// type embedinfo
export function Embedinfo(embedName, embedData) /* (embedName : string, embedData : string) -> embedinfo */  {
  return { embedName: embedName, embedData: embedData };
}
// type rule
export function Rule(name, regex, action) /* forall<a,b> (name : string, regex : compat/regex/regex, action : (cap : compat/regex/matched, ctx : b) -> a) -> rule<a,b> */  {
  return { name: name, regex: regex, action: action };
}
// type label
export function Label(element, labelText, labelCaption, labelAttrs) /* (element : string, labelText : string, labelCaption : string, labelAttrs : attrs) -> label */  {
  return { element: element, labelText: labelText, labelCaption: labelCaption, labelAttrs: labelAttrs };
}
// type lineMap
export const End = null; // lineMap
export function Include(line, start, count, fileName, lineMap, rest) /* (line : int, start : int, count : int, fileName : string, lineMap : lineMap, rest : lineMap) -> lineMap */  {
  return { line: line, start: start, count: count, fileName: fileName, lineMap: lineMap, rest: rest };
}
// type link
export function Link(href, title, linkattrs, linkid) /* (href : string, title : string, linkattrs : attrs, linkid : string) -> link */  {
  return { href: href, title: title, linkattrs: linkattrs, linkid: linkid };
}
// type peano
export function Succ(prev) /* (prev : peano) -> peano */  {
  return { prev: prev };
}
export const Zero = null; // peano
// type row
export function Row(cells, rowAttrs) /* (cells : list<cell>, rowAttrs : attrs) -> row */  {
  return { cells: cells, rowAttrs: rowAttrs };
}
 
// declarations
 
 
// Automatically generated. Tests for the `FmtHtml` constructor of the `:formatter` type.
export function is_fmtHtml(formatter) /* (formatter : formatter) -> bool */  {
  return (formatter === 1);
}
 
 
// Automatically generated. Tests for the `FmtTex` constructor of the `:formatter` type.
export function is_fmtTex(formatter) /* (formatter : formatter) -> bool */  {
  return (formatter === 2);
}
 
 
// Automatically generated. Tests for the `Pre` constructor of the `:input` type.
export function is_pre(input0) /* (input : input) -> bool */  {
  return (input0._tag === 1);
}
 
 
// Automatically generated. Tests for the `MathPre` constructor of the `:input` type.
export function is_mathPre(input0) /* (input : input) -> bool */  {
  return (input0._tag === 2);
}
 
 
// Automatically generated. Tests for the `Math` constructor of the `:input` type.
export function is_math(input0) /* (input : input) -> bool */  {
  return (input0._tag === 3);
}
 
 
// Automatically generated. Tests for the `MathDefs` constructor of the `:input` type.
export function is_mathDefs(input0) /* (input : input) -> bool */  {
  return (input0._tag === 4);
}
 
 
// Automatically generated. Tests for the `MathPoly` constructor of the `:input` type.
export function is_mathPoly(input0) /* (input : input) -> bool */  {
  return (input0._tag === 5);
}
 
 
// Automatically generated. Tests for the `Tex` constructor of the `:input` type.
export function is_tex(input0) /* (input : input) -> bool */  {
  return (input0._tag === 6);
}
 
 
// Automatically generated. Tests for the `Raw` constructor of the `:input` type.
export function is_raw(input0) /* (input : input) -> bool */  {
  return (input0._tag === 7);
}
 
 
// Automatically generated. Tests for the `Markdown` constructor of the `:input` type.
export function is_markdown(input0) /* (input : input) -> bool */  {
  return (input0._tag === 8);
}
 
 
// Automatically generated. Retrieves the `empty` constructor field of the `:attrs` type.
export function empty(attrs) /* (attrs : attrs) -> bool */  {
  return attrs.empty;
}
 
 
// Automatically generated. Retrieves the `sticky` constructor field of the `:attrs` type.
export function sticky(attrs) /* (attrs : attrs) -> bool */  {
  return attrs.sticky;
}
 
 
// Automatically generated. Retrieves the `defaults` constructor field of the `:attrs` type.
export function defaults(attrs) /* (attrs : attrs) -> bool */  {
  return attrs.defaults;
}
 
 
// Automatically generated. Retrieves the `text` constructor field of the `:attrs` type.
export function text(attrs) /* (attrs : attrs) -> string */  {
  return attrs.text;
}
 
 
// Automatically generated. Retrieves the `replacers` constructor field of the `:attrs` type.
export function replacers(attrs) /* (attrs : attrs) -> list<string> */  {
  return attrs.replacers;
}
 
 
// Automatically generated. Retrieves the `notag` constructor field of the `:attrs` type.
export function notag(attrs) /* (attrs : attrs) -> bool */  {
  return attrs.notag;
}
 
 
// Automatically generated. Retrieves the `tight` constructor field of the `:attrs` type.
export function tight(attrs) /* (attrs : attrs) -> bool */  {
  return attrs.tight;
}
 
 
// Automatically generated. Retrieves the `input` constructor field of the `:attrs` type.
export function input(attrs) /* (attrs : attrs) -> input */  {
  return attrs.input;
}
 
 
// Automatically generated. Retrieves the `elem` constructor field of the `:attrs` type.
export function elem(attrs) /* (attrs : attrs) -> string */  {
  return attrs.elem;
}
 
 
// Automatically generated. Retrieves the `texelem` constructor field of the `:attrs` type.
export function texelem(attrs) /* (attrs : attrs) -> string */  {
  return attrs.texelem;
}
 
 
// Automatically generated. Retrieves the `htmlelem` constructor field of the `:attrs` type.
export function htmlelem(attrs) /* (attrs : attrs) -> string */  {
  return attrs.htmlelem;
}
 
 
// Automatically generated. Retrieves the `name` constructor field of the `:attrs` type.
export function name(attrs) /* (attrs : attrs) -> string */  {
  return attrs.name;
}
 
 
// Automatically generated. Retrieves the `label` constructor field of the `:attrs` type.
export function label(attrs) /* (attrs : attrs) -> string */  {
  return attrs.label;
}
 
 
// Automatically generated. Retrieves the `source` constructor field of the `:attrs` type.
export function source(attrs) /* (attrs : attrs) -> string */  {
  return attrs.source;
}
 
 
// Automatically generated. Retrieves the `lineNo` constructor field of the `:attrs` type.
export function lineNo(attrs) /* (attrs : attrs) -> int */  {
  return attrs.lineNo;
}
 
 
// Automatically generated. Retrieves the `classes` constructor field of the `:attrs` type.
export function classes(attrs) /* (attrs : attrs) -> list<string> */  {
  return attrs.classes;
}
 
 
// Automatically generated. Retrieves the `counters` constructor field of the `:attrs` type.
export function counters(attrs) /* (attrs : attrs) -> list<(string, string)> */  {
  return attrs.counters;
}
 
 
// Automatically generated. Retrieves the `keyvals` constructor field of the `:attrs` type.
export function keyvals(attrs) /* (attrs : attrs) -> list<(string, string)> */  {
  return attrs.keyvals;
}
 
export function _copy(_this, empty0, sticky0, defaults0, text0, replacers0, notag0, tight0, input0, elem0, texelem0, htmlelem0, name0, label0, source0, lineNo0, classes0, counters0, keyvals0) /* (attrs, empty : optional<bool>, sticky : optional<bool>, defaults : optional<bool>, text : optional<string>, replacers : optional<list<string>>, notag : optional<bool>, tight : optional<bool>, input : optional<input>, elem : optional<string>, texelem : optional<string>, htmlelem : optional<string>, name : optional<string>, label : optional<string>, source : optional<string>, lineNo : optional<int>, classes : optional<list<string>>, counters : optional<list<(string, string)>>, keyvals : optional<list<(string, string)>>) -> attrs */  {
  if (empty0 !== undefined) {
    var _x0 = empty0;
  }
  else {
    var _x0 = _this.empty;
  }
  if (sticky0 !== undefined) {
    var _x1 = sticky0;
  }
  else {
    var _x1 = _this.sticky;
  }
  if (defaults0 !== undefined) {
    var _x2 = defaults0;
  }
  else {
    var _x2 = _this.defaults;
  }
  if (text0 !== undefined) {
    var _x3 = text0;
  }
  else {
    var _x3 = _this.text;
  }
  if (replacers0 !== undefined) {
    var _x4 = replacers0;
  }
  else {
    var _x4 = _this.replacers;
  }
  if (notag0 !== undefined) {
    var _x5 = notag0;
  }
  else {
    var _x5 = _this.notag;
  }
  if (tight0 !== undefined) {
    var _x6 = tight0;
  }
  else {
    var _x6 = _this.tight;
  }
  if (input0 !== undefined) {
    var _x7 = input0;
  }
  else {
    var _x7 = _this.input;
  }
  if (elem0 !== undefined) {
    var _x8 = elem0;
  }
  else {
    var _x8 = _this.elem;
  }
  if (texelem0 !== undefined) {
    var _x9 = texelem0;
  }
  else {
    var _x9 = _this.texelem;
  }
  if (htmlelem0 !== undefined) {
    var _x10 = htmlelem0;
  }
  else {
    var _x10 = _this.htmlelem;
  }
  if (name0 !== undefined) {
    var _x11 = name0;
  }
  else {
    var _x11 = _this.name;
  }
  if (label0 !== undefined) {
    var _x12 = label0;
  }
  else {
    var _x12 = _this.label;
  }
  if (source0 !== undefined) {
    var _x13 = source0;
  }
  else {
    var _x13 = _this.source;
  }
  if (lineNo0 !== undefined) {
    var _x14 = lineNo0;
  }
  else {
    var _x14 = _this.lineNo;
  }
  if (classes0 !== undefined) {
    var _x15 = classes0;
  }
  else {
    var _x15 = _this.classes;
  }
  if (counters0 !== undefined) {
    var _x16 = counters0;
  }
  else {
    var _x16 = _this.counters;
  }
  if (keyvals0 !== undefined) {
    var _x17 = keyvals0;
  }
  else {
    var _x17 = _this.keyvals;
  }
  return Attrs(_x0, _x1, _x2, _x3, _x4, _x5, _x6, _x7, _x8, _x9, _x10, _x11, _x12, _x13, _x14, _x15, _x16, _x17);
}
 
 
// Automatically generated. Retrieves the `text` constructor field of the `:cell` type.
export function text_1(cell) /* (cell : cell) -> string */  {
  return cell.text;
}
 
 
// Automatically generated. Retrieves the `cellAttrs` constructor field of the `:cell` type.
export function cellAttrs(cell) /* (cell : cell) -> attrs */  {
  return cell.cellAttrs;
}
 
export function _copy_1(_this, text0, cellAttrs0) /* (cell, text : optional<string>, cellAttrs : optional<attrs>) -> cell */  {
  if (text0 !== undefined) {
    var _x18 = text0;
  }
  else {
    var _x18 = _this.text;
  }
  if (cellAttrs0 !== undefined) {
    var _x19 = cellAttrs0;
  }
  else {
    var _x19 = _this.cellAttrs;
  }
  return Cell(_x18, _x19);
}
 
 
// Automatically generated. Retrieves the `embedName` constructor field of the `:embedinfo` type.
export function embedName(embedinfo) /* (embedinfo : embedinfo) -> string */  {
  return embedinfo.embedName;
}
 
 
// Automatically generated. Retrieves the `embedData` constructor field of the `:embedinfo` type.
export function embedData(embedinfo) /* (embedinfo : embedinfo) -> string */  {
  return embedinfo.embedData;
}
 
export function _copy_2(_this, embedName0, embedData0) /* (embedinfo, embedName : optional<string>, embedData : optional<string>) -> embedinfo */  {
  if (embedName0 !== undefined) {
    var _x20 = embedName0;
  }
  else {
    var _x20 = _this.embedName;
  }
  if (embedData0 !== undefined) {
    var _x21 = embedData0;
  }
  else {
    var _x21 = _this.embedData;
  }
  return Embedinfo(_x20, _x21);
}
 
 
// Automatically generated. Retrieves the `name` constructor field of the `:rule` type.
export function name_1(rule) /* forall<a,b> (rule : rule<a,b>) -> string */  {
  return rule.name;
}
 
 
// Automatically generated. Retrieves the `regex` constructor field of the `:rule` type.
export function regex(rule) /* forall<a,b> (rule : rule<a,b>) -> compat/regex/regex */  {
  return rule.regex;
}
 
 
// Automatically generated. Retrieves the `action` constructor field of the `:rule` type.
export function action(rule) /* forall<a,b> (rule : rule<a,b>) -> ((cap : compat/regex/matched, ctx : b) -> a) */  {
  return rule.action;
}
 
export function _copy_3(_this, name0, regex0, action0) /* forall<a,b> (rule<a,b>, name : optional<string>, regex : optional<compat/regex/regex>, action : optional<(cap : compat/regex/matched, ctx : b) -> a>) -> rule<a,b> */  {
  if (name0 !== undefined) {
    var _x22 = name0;
  }
  else {
    var _x22 = _this.name;
  }
  if (regex0 !== undefined) {
    var _x23 = regex0;
  }
  else {
    var _x23 = _this.regex;
  }
  if (action0 !== undefined) {
    var _x24 = action0;
  }
  else {
    var _x24 = _this.action;
  }
  return Rule(_x22, _x23, _x24);
}
 
 
// Automatically generated. Retrieves the `element` constructor field of the `:label` type.
export function element(label0) /* (label : label) -> string */  {
  return label0.element;
}
 
 
// Automatically generated. Retrieves the `labelText` constructor field of the `:label` type.
export function labelText(label0) /* (label : label) -> string */  {
  return label0.labelText;
}
 
 
// Automatically generated. Retrieves the `labelCaption` constructor field of the `:label` type.
export function labelCaption(label0) /* (label : label) -> string */  {
  return label0.labelCaption;
}
 
 
// Automatically generated. Retrieves the `labelAttrs` constructor field of the `:label` type.
export function labelAttrs(label0) /* (label : label) -> attrs */  {
  return label0.labelAttrs;
}
 
export function _copy_4(_this, element0, labelText0, labelCaption0, labelAttrs0) /* (label, element : optional<string>, labelText : optional<string>, labelCaption : optional<string>, labelAttrs : optional<attrs>) -> label */  {
  if (element0 !== undefined) {
    var _x25 = element0;
  }
  else {
    var _x25 = _this.element;
  }
  if (labelText0 !== undefined) {
    var _x26 = labelText0;
  }
  else {
    var _x26 = _this.labelText;
  }
  if (labelCaption0 !== undefined) {
    var _x27 = labelCaption0;
  }
  else {
    var _x27 = _this.labelCaption;
  }
  if (labelAttrs0 !== undefined) {
    var _x28 = labelAttrs0;
  }
  else {
    var _x28 = _this.labelAttrs;
  }
  return Label(_x25, _x26, _x27, _x28);
}
 
 
// Automatically generated. Tests for the `End` constructor of the `:lineMap` type.
export function is_end(lineMap) /* (lineMap : lineMap) -> bool */  {
  return (lineMap === null);
}
 
 
// Automatically generated. Tests for the `Include` constructor of the `:lineMap` type.
export function is_include(lineMap) /* (lineMap : lineMap) -> bool */  {
  return (lineMap !== null);
}
 
 
// Automatically generated. Retrieves the `href` constructor field of the `:link` type.
export function href(link) /* (link : link) -> string */  {
  return link.href;
}
 
 
// Automatically generated. Retrieves the `title` constructor field of the `:link` type.
export function title(link) /* (link : link) -> string */  {
  return link.title;
}
 
 
// Automatically generated. Retrieves the `linkattrs` constructor field of the `:link` type.
export function linkattrs(link) /* (link : link) -> attrs */  {
  return link.linkattrs;
}
 
 
// Automatically generated. Retrieves the `linkid` constructor field of the `:link` type.
export function linkid(link) /* (link : link) -> string */  {
  return link.linkid;
}
 
export function _copy_5(_this, href0, title0, linkattrs0, linkid0) /* (link, href : optional<string>, title : optional<string>, linkattrs : optional<attrs>, linkid : optional<string>) -> link */  {
  if (href0 !== undefined) {
    var _x29 = href0;
  }
  else {
    var _x29 = _this.href;
  }
  if (title0 !== undefined) {
    var _x30 = title0;
  }
  else {
    var _x30 = _this.title;
  }
  if (linkattrs0 !== undefined) {
    var _x31 = linkattrs0;
  }
  else {
    var _x31 = _this.linkattrs;
  }
  if (linkid0 !== undefined) {
    var _x32 = linkid0;
  }
  else {
    var _x32 = _this.linkid;
  }
  return Link(_x29, _x30, _x31, _x32);
}
 
 
// Automatically generated. Tests for the `Succ` constructor of the `:peano` type.
export function is_succ(peano0) /* (peano : peano) -> bool */  {
  return (peano0 !== null);
}
 
 
// Automatically generated. Tests for the `Zero` constructor of the `:peano` type.
export function is_zero(peano0) /* (peano : peano) -> bool */  {
  return (peano0 === null);
}
 
 
// Automatically generated. Retrieves the `cells` constructor field of the `:row` type.
export function cells(row) /* (row : row) -> list<cell> */  {
  return row.cells;
}
 
 
// Automatically generated. Retrieves the `rowAttrs` constructor field of the `:row` type.
export function rowAttrs(row) /* (row : row) -> attrs */  {
  return row.rowAttrs;
}
 
export function _copy_6(_this, cells0, rowAttrs0) /* (row, cells : optional<list<cell>>, rowAttrs : optional<attrs>) -> row */  {
  if (cells0 !== undefined) {
    var _x33 = cells0;
  }
  else {
    var _x33 = _this.cells;
  }
  if (rowAttrs0 !== undefined) {
    var _x34 = rowAttrs0;
  }
  else {
    var _x34 = _this.rowAttrs;
  }
  return Row(_x33, _x34);
}
 
export function isFmtHtml(x) /* (x : formatter) -> bool */  {
  return (x === 1);
}
 
export function isFmtTex(x) /* (x : formatter) -> bool */  {
  return (x === 1) ? false : true;
}
 
export function isMarkdown(x) /* (x : input) -> bool */  {
  return (x._tag === 8);
}
 
export function showFormatter(f) /* (f : formatter) -> string */  {
  return (f === 2) ? "tex" : "html";
}
 
 
// monadic lift
export function _mlift10858_combineRules(cap, ctx, _y_10846) /* forall<_e,a,b> (cap : compat/regex/matched, ctx : b, (cap : compat/regex/matched, ctx : b) -> <exn|_e> a) -> <exn|_e> a */  {
  return _y_10846(cap, ctx);
}
 
 
// Combine rules into one regular expression.
// For inline expressions, this does not improve the performance much.
export function combineRules(rules) /* forall<a,b> (rules : list<rule<a,b>>) -> rule<a,b> */  {
   
  var xs_10578 = $std_core.map_5(rules, function(rule /* rule<1400,1401> */ ) {
      var _x35 = rule.regex;
      return $std_core_types._Tuple2_($compat_regex.regexSource(_x35), function(_x1 /* compat/regex/matched */ , _x2 /* 1401 */ ) {
          var _x36 = rule.action;
          return $std_core_hnd._open_none2(_x36, _x1, _x2);
        });
    });
  var _x35 = $std_core._lift17204_unzip(xs_10578, $std_core.Nil, $std_core.Nil);
   
  var actions = $std_core.unvlist(_x35.snd);
   
  var rx = $compat_regex.regexAlt(_x35.fst);
  return Rule("<combined>", rx, function(cap /* compat/regex/matched */ , ctx /* 1401 */ ) {
       
      var _x36 = cap.groups;
      var j_10584 = $compat_regex.alternative(_x36);
       
      var i0 = ($std_core._int_ge(0,j_10584)) ? 0 : j_10584;
       
      var x_10859 = $std_core_hnd._open_at2($std_core_hnd._evv_index($std_core._tag_exn), (function(_x37, _x38) {
          return $std_core._vector_at(_x37,_x38);
        }), actions, i0);
      if ($std_core_hnd._yielding()) {
        return $std_core_hnd.yield_extend(function(_y_10846 /* (cap : compat/regex/matched, ctx : 1401) -> <exn|_1378> 1400 */ ) {
          return _y_10846(cap, ctx);
        });
      }
      else {
        return x_10859(cap, ctx);
      }
    });
}
 
export var rxspaces;
var rxspaces = $compat_regex.regex("\\s+");
 
export var rxChoicePattern;
var rxChoicePattern = $compat_regex.regex("\\[(\\w+(?:,\\w+)*)\\]");
 
 
// Normalize an identifier: just keep letters, digits, underscores, colons, stars, and dashes,
// replace whitespace, colons, and stars by a dash, and convert to lower case.
export function normalizeId(txt) /* (txt : string) -> string */  {
   
  var regex00_10592 = $compat_regex.regex("[^\\w\\-_:\\*\\s]+");
   
  var _x37 = undefined;
  var _x36 = (_x37 !== undefined) ? _x37 : 0;
  var s_10587 = $compat_regex.replaceEx_1(txt, regex00_10592, "", true, _x36);
   
  var regex0_10588 = $compat_regex.regex("\\s+|[:\\*]");
  var _x37 = undefined;
  var _x36 = (_x37 !== undefined) ? _x37 : 0;
  return $compat.toLower($compat_regex.replaceEx_1(s_10587, regex0_10588, "-", true, _x36));
}
 
export var rxamp;
var rxamp = $compat_regex.regex("&");
 
export var rxapos;
var rxapos = $compat_regex.regex("\'");
 
export var rxgt;
var rxgt = $compat_regex.regex(">");
 
 
// regex(r"""|[&<>]") <-- compilation error - "" Problem
export var rxhtml;
var rxhtml = $compat_regex.regex("[&<>\"]");
 
export var rxlt;
var rxlt = $compat_regex.regex("<");
 
export var rxnoEntityAmp;
var rxnoEntityAmp = $compat_regex.regex("&(?!#?\\\\w+;)");
 
export var rxquot;
var rxquot = $compat_regex.regex("\"");
 
export var rxLineBreak;
var rxLineBreak = $compat_regex.regex("\\\\\\n\\r?[ \\t]*");
 
export function logLocation(lineInfo, logname) /* (lineInfo : string, logname : optional<string>) -> () */  {
  var _x38 = (logname !== undefined) ? logname : "warning";
  return $compat_log.log(_x38, $std_core._lp__plus__plus__1_rp_("  location: ", lineInfo));
}
 
export var mimes;
 
var d = $compat_dict.dict();
 
var _null_ = $std_core.foreach($std_core.vlist([$std_core_types._Tuple2_("", "text/plain"), $std_core_types._Tuple2_("mdk", "text/plain"), $std_core_types._Tuple2_("md", "text/plain"), $std_core_types._Tuple2_("mkdn", "text/plain"), $std_core_types._Tuple2_("markdown", "text/plain"), $std_core_types._Tuple2_("txt", "text/plain"), $std_core_types._Tuple2_("css", "text/css"), $std_core_types._Tuple2_("html", "text/html"), $std_core_types._Tuple2_("htm", "text/html"), $std_core_types._Tuple2_("js", "text/javascript"), $std_core_types._Tuple2_("tex", "text/tex"), $std_core_types._Tuple2_("sty", "text/latex"), $std_core_types._Tuple2_("cls", "text/latex"), $std_core_types._Tuple2_("bib", "text/plain"), $std_core_types._Tuple2_("bbl", "text/plain"), $std_core_types._Tuple2_("bst", "text/plain"), $std_core_types._Tuple2_("aux", "text/plain"), $std_core_types._Tuple2_("png", "image/png"), $std_core_types._Tuple2_("jpg", "image/jpg"), $std_core_types._Tuple2_("jpeg", "image/jpg"), $std_core_types._Tuple2_("gif", "image/gif"), $std_core_types._Tuple2_("svg", "image/svg+xml"), $std_core_types._Tuple2_("eps", "image/eps"), $std_core_types._Tuple2_("pdf", "application/pdf")], $std_core.Nil), function(elem0 /* (string, string) */ ) {
    return $compat_dict.unsafeDictAdd(d, elem0.fst, elem0.snd);
  });
var mimes = d;
 
export function peano(n) /* (n : int) -> peano */  {
  return function() {
     
    var loc = { value: Zero };
     
    $std_core.repeat_1(n, function() {
        return ((loc).value = (Succ(((loc).value))));
      });
     
    var res = ((loc).value);
    return $std_core_hnd.prompt_local_var(loc, res);
  }();
}
 
export var rxProtocol;
var rxProtocol = $compat_regex.regex("^(\\\\w+:|//)");
 
export function removeKeys(attrs, keys) /* (attrs : attrs, keys : list<string>) -> attrs */  {
   
  var _x39 = attrs.keyvals;
  var _arg_2538 = $std_core.filter(_x39, function(kv /* (string, string) */ ) {
      return $std_core.all(keys, function(key /* string */ ) {
          var _x40 = kv.fst;
          return (_x40 !== key);
        });
    });
  return _copy(attrs, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2538);
}
 
 
// This is just for statistics
export var ruleHist;
var ruleHist = $compat_dict.mdict();
 
export function ruleRemove(grammar, pred, names) /* forall<a,b> (grammar : grammar<a,b>, pred : bool, names : list<string>) -> grammar<a,b> */  {
  if (pred) {
    return $std_core.filter(grammar, function(rule /* rule<2658,2659> */ ) {
        return $std_core.all(names, function(nm /* string */ ) {
             
            var _x39 = rule.name;
            var b0_10603 = $compat.startsWith(_x39, nm);
            return (b0_10603) ? false : true;
          });
      });
  }
  else {
    return grammar;
  }
}
 
 
// Replace a rule in a grammar by another one, if the rule name is a prefix of the name of the new rule.
export function ruleReplace(grammar, pred, rule) /* forall<a,b> (grammar : grammar<a,b>, pred : bool, rule : rule<a,b>) -> grammar<a,b> */  {
  if (pred) {
    return $std_core.map_5(grammar, function(r /* rule<2856,2857> */ ) {
        var _x40 = rule.name;
        var _x41 = r.name;
        var _x39 = $compat.startsWith(_x40, _x41);
        return (_x39) ? rule : r;
      });
  }
  else {
    return grammar;
  }
}
 
export var rxTrimLines;
var rxTrimLines = $compat_regex.regex("^([ \\t\\r]*\\n)+|([ \\t\\r]*\\n)+$");
 
export function show(attrs) /* (attrs : attrs) -> string */  {
   
  var _x42 = attrs.text;
  var left_10608 = $std_core._lp__plus__plus__1_rp_("{", _x42);
  return $std_core._lp__plus__plus__1_rp_(left_10608, "}");
}
 
 
// Split semi-colon seperated paths into parts
export function splitPaths(paths) /* (paths : string) -> list<string> */  {
   
  var v_17122 = ((paths).split((";")));
  return $std_core.filter($std_core.vlist(v_17122), function(s0 /* string */ ) {
      return (s0 !== (""));
    });
}
 
export function unquote(s) /* (s : string) -> string */  {
  var _x42 = $compat.startsWith(s, "\'");
  if (_x42) {
    var _x43 = $compat.endsWith(s, "\'");
    if (_x43) {
       
      var x_10618 = $std_core.count_1(s);
       
      var len_10617 = $std_core._int_sub(x_10618,2);
      if ($std_core._int_le(len_10617,0)) {
        return "";
      }
      else {
        return $compat.substr2(s, 1, len_10617);
      }
    }
    else {
      var _x44 = $compat.startsWith(s, "\"");
      if (_x44) {
        var _x45 = $compat.endsWith(s, "\"");
        if (_x45) {
           
          var x0_10624 = $std_core.count_1(s);
           
          var len0_10623 = $std_core._int_sub(x0_10624,2);
          if ($std_core._int_le(len0_10623,0)) {
            return "";
          }
          else {
            return $compat.substr2(s, 1, len0_10623);
          }
        }
        else {
          return s;
        }
      }
      else {
        return s;
      }
    }
  }
  else {
    var _x46 = $compat.startsWith(s, "\"");
    if (_x46) {
      var _x47 = $compat.endsWith(s, "\"");
      if (_x47) {
         
        var x1_10630 = $std_core.count_1(s);
         
        var len1_10629 = $std_core._int_sub(x1_10630,2);
        if ($std_core._int_le(len1_10629,0)) {
          return "";
        }
        else {
          return $compat.substr2(s, 1, len1_10629);
        }
      }
      else {
        return s;
      }
    }
    else {
      return s;
    }
  }
}
 
 
// Warning messages get logged
export function warning(message, logname) /* (message : string, logname : optional<string>) -> () */  {
  var _x48 = (logname !== undefined) ? logname : "warning";
  return $compat_log.log(_x48, $std_core._lp__plus__plus__1_rp_("  warning: ", message));
}
 
export function _create_Markdown(only) /* (only : optional<maybe<formatter>>) -> input */  {
  var _x49 = (only !== undefined) ? only : $std_core_types.Nothing;
  return Markdown(_x49);
}
 
 
// Attributes
export function _create_Attrs(empty0, sticky0, defaults0, text0, replacers0, notag0, tight0, input0, elem0, texelem0, htmlelem0, name0, label0, source0, lineNo0, classes0, counters0, keyvals0) /* (empty : optional<bool>, sticky : optional<bool>, defaults : optional<bool>, text : optional<string>, replacers : optional<list<string>>, notag : optional<bool>, tight : optional<bool>, input : optional<input>, elem : optional<string>, texelem : optional<string>, htmlelem : optional<string>, name : optional<string>, label : optional<string>, source : optional<string>, lineNo : optional<int>, classes : optional<list<string>>, counters : optional<list<(string, string)>>, keyvals : optional<list<(string, string)>>) -> attrs */  {
  var _x50 = (empty0 !== undefined) ? empty0 : false;
  var _x51 = (sticky0 !== undefined) ? sticky0 : false;
  var _x52 = (defaults0 !== undefined) ? defaults0 : true;
  var _x53 = (text0 !== undefined) ? text0 : "";
  var _x54 = (replacers0 !== undefined) ? replacers0 : $std_core.Nil;
  var _x55 = (notag0 !== undefined) ? notag0 : false;
  var _x56 = (tight0 !== undefined) ? tight0 : false;
  if (input0 !== undefined) {
    var _x57 = input0;
  }
  else {
    var _x59 = undefined;
    var _x58 = (_x59 !== undefined) ? _x59 : $std_core_types.Nothing;
    var _x57 = Markdown(_x58);
  }
  var _x60 = (elem0 !== undefined) ? elem0 : "";
  var _x61 = (texelem0 !== undefined) ? texelem0 : "";
  var _x62 = (htmlelem0 !== undefined) ? htmlelem0 : "";
  var _x63 = (name0 !== undefined) ? name0 : "";
  var _x64 = (label0 !== undefined) ? label0 : "";
  var _x65 = (source0 !== undefined) ? source0 : "";
  var _x66 = (lineNo0 !== undefined) ? lineNo0 : 0;
  var _x67 = (classes0 !== undefined) ? classes0 : $std_core.Nil;
  var _x68 = (counters0 !== undefined) ? counters0 : $std_core.Nil;
  var _x69 = (keyvals0 !== undefined) ? keyvals0 : $std_core.Nil;
  return Attrs(_x50, _x51, _x52, _x53, _x54, _x55, _x56, _x57, _x60, _x61, _x62, _x63, _x64, _x65, _x66, _x67, _x68, _x69);
}
 
export var attrsNone;
var _x71 = undefined;
var _x70 = (_x71 !== undefined) ? _x71 : false;
var _x73 = undefined;
var _x72 = (_x73 !== undefined) ? _x73 : true;
var _x75 = undefined;
var _x74 = (_x75 !== undefined) ? _x75 : "";
var _x77 = undefined;
var _x76 = (_x77 !== undefined) ? _x77 : $std_core.Nil;
var _x79 = undefined;
var _x78 = (_x79 !== undefined) ? _x79 : false;
var _x81 = undefined;
var _x80 = (_x81 !== undefined) ? _x81 : false;
var _x83 = undefined;
if (_x83 !== undefined) {
  var _x82 = _x83;
}
else {
  var _x85 = undefined;
  var _x84 = (_x85 !== undefined) ? _x85 : $std_core_types.Nothing;
  var _x82 = Markdown(_x84);
}
var _x87 = undefined;
var _x86 = (_x87 !== undefined) ? _x87 : "";
var _x89 = undefined;
var _x88 = (_x89 !== undefined) ? _x89 : "";
var _x91 = undefined;
var _x90 = (_x91 !== undefined) ? _x91 : "";
var _x93 = undefined;
var _x92 = (_x93 !== undefined) ? _x93 : "";
var _x95 = undefined;
var _x94 = (_x95 !== undefined) ? _x95 : "";
var _x97 = undefined;
var _x96 = (_x97 !== undefined) ? _x97 : "";
var _x99 = undefined;
var _x98 = (_x99 !== undefined) ? _x99 : 0;
var _x101 = undefined;
var _x100 = (_x101 !== undefined) ? _x101 : $std_core.Nil;
var _x103 = undefined;
var _x102 = (_x103 !== undefined) ? _x103 : $std_core.Nil;
var _x105 = undefined;
var _x104 = (_x105 !== undefined) ? _x105 : $std_core.Nil;
var attrsNone = Attrs(true, _x70, _x72, _x74, _x76, _x78, _x80, _x82, _x86, _x88, _x90, _x92, _x94, _x96, _x98, _x100, _x102, _x104);
 
export function _create_Cell(text0, cellAttrs0) /* (text : string, cellAttrs : optional<attrs>) -> cell */  {
  var _x106 = (cellAttrs0 !== undefined) ? cellAttrs0 : attrsNone;
  return Cell(text0, _x106);
}
 
 
// A label is created for every element with an id.
export function _create_Label(element0, labelText0, labelCaption0, labelAttrs0) /* (element : string, labelText : string, labelCaption : string, labelAttrs : optional<attrs>) -> label */  {
  var _x107 = (labelAttrs0 !== undefined) ? labelAttrs0 : attrsNone;
  return Label(element0, labelText0, labelCaption0, _x107);
}
 
 
// A url link.
export function _create_Link(href0, title0, linkattrs0, linkid0) /* (href : string, title : optional<string>, linkattrs : optional<attrs>, linkid : optional<string>) -> link */  {
  var _x108 = (title0 !== undefined) ? title0 : "";
  var _x109 = (linkattrs0 !== undefined) ? linkattrs0 : attrsNone;
  var _x110 = (linkid0 !== undefined) ? linkid0 : "";
  return Link(href0, _x108, _x109, _x110);
}
 
export function _create_Raw(only) /* (only : optional<maybe<formatter>>) -> input */  {
  var _x111 = (only !== undefined) ? only : $std_core_types.Nothing;
  return Raw(_x111);
}
 
export function _create_Row(cells0, rowAttrs0) /* (cells : list<cell>, rowAttrs : optional<attrs>) -> row */  {
  var _x112 = (rowAttrs0 !== undefined) ? rowAttrs0 : attrsNone;
  return Row(cells0, _x112);
}
 
export function _lp__eq__eq__rp_(x, y) /* (x : formatter, y : formatter) -> bool */  {
  if (x === 1) {
    return (y === 1);
  }
  else {
    return (y === 1) ? false : true;
  }
}
 
export function contains(xs, s) /* (xs : list<string>, s : string) -> bool */  {
   
  var m_10657 = $std_core.find(xs, function(x /* string */ ) {
      return (x === s);
    });
  return (m_10657 === null) ? false : true;
}
 
export function quote(s) /* (s : string) -> string */  {
  if (((s).indexOf(("\"")) >= 0)) {
     
    var left_10658 = $std_core._lp__plus__plus__1_rp_("\'", s);
    return $std_core._lp__plus__plus__1_rp_(left_10658, "\'");
  }
  else {
     
    var left1_10662 = $std_core._lp__plus__plus__1_rp_("\"", s);
    return $std_core._lp__plus__plus__1_rp_(left1_10662, "\"");
  }
}
 
export function addClass(attrs, cname) /* (attrs : attrs, cname : string) -> attrs */  {
  if ((cname === (""))) {
    return attrs;
  }
  else {
    var _x114 = attrs.classes;
    var _x113 = $std_core.any(_x114, function(nm /* string */ ) {
        return (nm === cname);
      });
    if (_x113) {
      return attrs;
    }
    else {
       
      var _x115 = attrs.classes;
      var _arg_3817 = $std_core.append(_x115, $std_core.Cons(cname, $std_core.Nil));
       
      var _x116 = attrs.text;
      var left0_10670 = $std_core._lp__plus__plus__1_rp_(_x116, " ; class: ");
       
      var right0_10671 = quote(cname);
       
      var _arg_3805 = $std_core._lp__plus__plus__1_rp_(left0_10670, right0_10671);
      return _copy(attrs, false, undefined, undefined, _arg_3805, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3817);
    }
  }
}
 
export function addClasses(attrs, classes0) /* (attrs : attrs, classes : list<string>) -> attrs */  {
  return $std_core.foldl(classes0, attrs, addClass);
}
 
export function showInput(r) /* (r : input) -> string */  {
  if (r._tag === 1) {
    return "pre";
  }
  else if (r._tag === 2) {
    return "mathpre";
  }
  else if (r._tag === 3) {
    return "math";
  }
  else if (r._tag === 4) {
    return "mathdefs";
  }
  else if (r._tag === 5) {
    return "mathpoly";
  }
  else if (r._tag === 6) {
    return "tex";
  }
  else if (r._tag === 7) {
     
    if (r.only === null) {
      var _x115 = "";
    }
    else {
      var _x115 = (r.only.value === 2) ? "tex" : "html";
    }
    var left_10675 = $std_core._lp__plus__plus__1_rp_("raw(", _x115);
    return $std_core._lp__plus__plus__1_rp_(left_10675, ")");
  }
  else {
    return "markdown";
  }
}
 
export function addInputClass(attrs) /* (attrs : attrs) -> attrs */  {
  if (attrs.input._tag === 8) {
    return attrs;
  }
  else {
     
    var _x115 = attrs.input;
    var right_10685 = showInput(_x115);
    return addClass(attrs, $std_core._lp__plus__plus__1_rp_("input-", right_10685));
  }
}
 
export function addKeyval(attrs, key, value) /* (attrs : attrs, key : string, value : string) -> attrs */  {
   
  var _x115 = attrs.keyvals;
  var left_10687 = $std_core.filter(_x115, function(kv /* (string, string) */ ) {
      var _x116 = kv.fst;
      return (_x116 !== key);
    });
   
  var _arg_4871 = $std_core.append(left_10687, $std_core.Cons($std_core_types._Tuple2_(key, value), $std_core.Nil));
   
  var _x117 = attrs.text;
  var left2_10695 = $std_core._lp__plus__plus__1_rp_(_x117, " ; ");
   
  var left1_10693 = $std_core._lp__plus__plus__1_rp_(left2_10695, key);
   
  var left0_10691 = $std_core._lp__plus__plus__1_rp_(left1_10693, ": ");
   
  var right0_10692 = quote(value);
   
  var _arg_4857 = $std_core._lp__plus__plus__1_rp_(left0_10691, right0_10692);
  return _copy(attrs, false, undefined, undefined, _arg_4857, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4871);
}
 
export function addKeyvalIfNotEmpty(attrs, key, value) /* (attrs : attrs, key : string, value : string) -> attrs */  {
  if ((value === (""))) {
    return attrs;
  }
  else {
    if ((key === (""))) {
      return attrs;
    }
    else {
      return addKeyval(attrs, key, value);
    }
  }
}
 
export function hasKey(attrs, key) /* (attrs : attrs, key : string) -> maybe<string> */  {
   
  var _x115 = attrs.keyvals;
  var m_10700 = $std_core.find(_x115, function(kv /* (string, string) */ ) {
      var _x116 = kv.fst;
      return (_x116 === key);
    });
  if (m_10700 === null) {
    return $std_core_types.Nothing;
  }
  else {
    var _x115 = m_10700.value.snd;
    return $std_core_types.Just(_x115);
  }
}
 
export function addKeyvalIfNotExist(attrs, key, value) /* (attrs : attrs, key : string, value : string) -> attrs */  {
   
  var _x116 = attrs.keyvals;
  var m_10700 = $std_core.find(_x116, function(kv /* (string, string) */ ) {
      var _x117 = kv.fst;
      return (_x117 === key);
    });
  if (m_10700 === null) {
    var _x116 = $std_core_types.Nothing;
    if (_x116 === null) {
      return addKeyval(attrs, key, value);
    }
    else {
      return attrs;
    }
  }
  else {
    return attrs;
  }
}
 
export function addKeyvals(attrs, kvs) /* (attrs : attrs, kvs : list<(string, string)>) -> attrs */  {
  return $std_core.foldl(kvs, attrs, function(acc /* attrs */ , kv /* (string, string) */ ) {
      var _x117 = kv.fst;
      var _x118 = kv.snd;
      return addKeyval(acc, _x117, _x118);
    });
}
 
 
// A definition identifier is always lower case and sequences of spaces are replaced by a single space.
// Used for links for example.
export function definitionId(s) /* (s : string) -> string */  {
  var _x120 = undefined;
  var _x119 = (_x120 !== undefined) ? _x120 : 0;
  return $compat.toLower($compat_regex.replaceEx_1(s, rxspaces, " ", true, _x119));
}
 
export function elementName(attrs, def) /* (attrs : attrs, def : string) -> string */  {
  var _x122 = attrs.elem;
  var _x121 = (_x122 === (""));
  if (_x121) {
    return def;
  }
  else {
    return attrs.elem;
  }
}
 
 
/* --------------------------------------
 Expand list style patterns
---------------------------------------- */
export function expandChoices(s) /* (s : string) -> list<string> */  {
  var _x123 = $compat_regex.find(s, rxChoicePattern);
  if (_x123 !== null) {
     
    var _x125 = _x123.value.index;
    var _x124 = $std_core._int_le(_x125,0);
    if (_x124) {
      var pre = "";
    }
    else {
      var _x126 = _x123.value.index;
      var pre = $compat.substr2(s, 0, _x126);
    }
     
    var _x127 = _x123.value.next;
    var post = $compat.substr(s, _x127);
     
    var _x128 = _x123.value.groups;
    var s1_10720 = $compat_regex.groupsIndex(_x128, 1);
     
    var v_17122 = ((s1_10720).split((",")));
    return $std_core.map_5($std_core.vlist(v_17122), function(part /* string */ ) {
         
        var left_10725 = $std_core._lp__plus__plus__1_rp_(pre, part);
        return $std_core._lp__plus__plus__1_rp_(left_10725, post);
      });
  }
  else {
    return $std_core.Cons(s, $std_core.Nil);
  }
}
 
 
// Generate a fresh id if it is not specified
export function generateHeaderId(attrs, heading, pre) /* (attrs : attrs, heading : string, pre : optional<string>) -> attrs */  {
  var _x125 = attrs.name;
  var _x124 = (_x125 !== (""));
  if (_x124) {
    return attrs;
  }
  else {
     
    var newid = normalizeId(heading);
     
    if ((newid === (""))) {
      var newname = "section";
    }
    else {
      var _x126 = (pre !== undefined) ? pre : "sec-";
      var newname = $std_core._lp__plus__plus__1_rp_(_x126, newid);
    }
     
    var _x127 = attrs.text;
    var left0_10732 = $std_core._lp__plus__plus__1_rp_(_x127, " ; id:");
     
    var right0_10733 = quote(newname);
     
    var _arg_6054 = $std_core._lp__plus__plus__1_rp_(left0_10732, right0_10733);
    return _copy(attrs, false, undefined, undefined, _arg_6054, undefined, undefined, undefined, undefined, undefined, undefined, undefined, newname);
  }
}
 
export function hasClass(attrs, className) /* (attrs : attrs, className : string) -> bool */  {
   
  var _x126 = attrs.classes;
  var m_10737 = $std_core.find(_x126, function(cname /* string */ ) {
      return (cname === className);
    });
  return (m_10737 === null) ? false : true;
}
 
export function hasBoolKey(attrs, key) /* (attrs : attrs, key : string) -> bool */  {
   
  var _x126 = attrs.keyvals;
  var m_10700 = $std_core.find(_x126, function(kv /* (string, string) */ ) {
      var _x127 = kv.fst;
      return (_x127 === key);
    });
   
  if (m_10700 === null) {
    var _x129 = $std_core_types.Nothing;
    var _x128 = (_x129 === null) ? "" : _x129.value;
  }
  else {
    var _x128 = m_10700.value.snd;
  }
  var value = $compat.toLower(_x128);
   
  var _x130 = attrs.classes;
  var m_10737 = $std_core.find(_x130, function(cname /* string */ ) {
      return (cname === key);
    });
  if (m_10737 === null) {
    return ((value === ("true"))) ? true : (value === ("1"));
  }
  else {
    return true;
  }
}
 
export function htmlEscape(s, allowEntity) /* (s : string, allowEntity : optional<bool>) -> string */  {
  var _x126 = $compat_regex.contains(s, rxhtml);
  if (_x126) {
     
    if (allowEntity !== undefined) {
      var _x127 = (allowEntity) ? rxnoEntityAmp : rxamp;
    }
    else {
      var _x127 = rxamp;
    }
    var _x129 = undefined;
    var _x128 = (_x129 !== undefined) ? _x129 : 0;
    var s3_10754 = $compat_regex.replaceEx_1(s, _x127, "&amp;", true, _x128);
     
    var _x131 = undefined;
    var _x130 = (_x131 !== undefined) ? _x131 : 0;
    var s2_10750 = $compat_regex.replaceEx_1(s3_10754, rxlt, "&lt;", true, _x130);
     
    var _x133 = undefined;
    var _x132 = (_x133 !== undefined) ? _x133 : 0;
    var s1_10746 = $compat_regex.replaceEx_1(s2_10750, rxgt, "&gt;", true, _x132);
     
    var _x135 = undefined;
    var _x134 = (_x135 !== undefined) ? _x135 : 0;
    var s0_10742 = $compat_regex.replaceEx_1(s1_10746, rxquot, "&quot;", true, _x134);
    var _x128 = undefined;
    var _x127 = (_x128 !== undefined) ? _x128 : 0;
    return $compat_regex.replaceEx_1(s0_10742, rxapos, "&#39;", true, _x127);
  }
  else {
    return s;
  }
}
 
 
// Join lines that were broken using `\` followed by a newline.
export function joinLines(s) /* (s : string) -> string */  {
  var _x130 = undefined;
  var _x129 = (_x130 !== undefined) ? _x130 : 0;
  return $compat_regex.replaceEx_1(s, rxLineBreak, "", true, _x129);
}
 
export function json(s) /* (s : string) -> string */  {
   
  var cs = $std_core.map_5($std_core.list_6(s), function(c /* char */ ) {
      if ((c === 0x000A)) {
        return "\\n";
      }
      else {
        if ((c === 0x000D)) {
          return "\\r";
        }
        else {
          if ((c === 0x0009)) {
            return "\\t";
          }
          else {
            if ((c === 0x0022)) {
              return "\\\"";
            }
            else {
              if ((c === 0x005C)) {
                return "\\\\";
              }
              else {
                if ((c >= 0x0020)) {
                  if ((c <= 0x007E)) {
                    return $std_core.string(c);
                  }
                  else {
                     
                    var right_10767 = $compat.showHex(c, 4);
                    return $std_core._lp__plus__plus__1_rp_("\\u", right_10767);
                  }
                }
                else {
                   
                  var right0_10769 = $compat.showHex(c, 4);
                  return $std_core._lp__plus__plus__1_rp_("\\u", right0_10769);
                }
              }
            }
          }
        }
      }
    });
   
  if (cs === null) {
    var right2_10773 = "";
  }
  else {
    var right2_10773 = $std_core._lift17189_join_2(cs.tail, cs.head);
  }
   
  var left1_10770 = $std_core._lp__plus__plus__1_rp_("\"", right2_10773);
  return $std_core._lp__plus__plus__1_rp_(left1_10770, "\"");
}
 
export function lookupKey(attrs, key, def) /* (attrs : attrs, key : string, def : string) -> string */  {
   
  var _x131 = attrs.keyvals;
  var m_10700 = $std_core.find(_x131, function(kv /* (string, string) */ ) {
      var _x132 = kv.fst;
      return (_x132 === key);
    });
  if (m_10700 === null) {
    var _x131 = $std_core_types.Nothing;
    return (_x131 === null) ? def : _x131.value;
  }
  else {
    return m_10700.value.snd;
  }
}
 
 
// Generic rule matcher: takes a list of rules and applies the action that matches
// on the given "src". Returns the result of the action and the string following the
// match.
export function matchRules(rules, ctx, src, def) /* forall<a,b> (rules : grammar<a,b>, ctx : b, src : string, def : (string) -> a) -> (a, int, string) */  { tailcall: while(1)
{
  if (rules === null) {
     
    if ($std_core._int_le(1,0)) {
      var matched = "";
    }
    else {
      var matched = $compat.substr2(src, 0, 1);
    }
    return $std_core_types._Tuple3_(def(matched), 1, matched);
  }
  else {
    var _x133 = rules.head.regex;
    var _x132 = $compat_regex.find(src, _x133);
    if (_x132 !== null) {
      var _x134 = rules.head.action(_x132.value, ctx);
      var _x135 = _x132.value.next;
      var _x136 = _x132.value.matched;
      return $std_core_types._Tuple3_(_x134, _x135, _x136);
    }
    else {
      {
        // tail call
        rules = rules.tail;
        continue tailcall;
      }
    }
  }
}}
 
 
// added effect <string>
export function mimeFromExt(fname) /* (fname : string) -> string */  {
   
  var ext = $compat.toLower($compat.substr($compat.extname(fname), 1));
  var _x137 = $compat_dict.containsKey_1(mimes, ext);
  if (_x137) {
    return $compat_dict.unsafeDictGet(mimes, ext);
  }
  else {
    var _x138 = $std_core_types.Nothing;
    return (_x138 !== null) ? _x138.value : "";
  }
}
 
export function newLink(href0, title0, linkattrs0, linkid0, bench) /* (href : string, title : optional<string>, linkattrs : optional<attrs>, linkid : optional<string>, bench : bool) -> link */  {
   
  if (bench) {
    var _x139 = (linkattrs0 !== undefined) ? linkattrs0 : attrsNone;
  }
  else {
    var _x140 = $compat.startsWith(href0, "#");
    if (_x140) {
      var _x141 = (linkattrs0 !== undefined) ? linkattrs0 : attrsNone;
      var _x139 = addClass(_x141, "localref");
    }
    else {
      var _x139 = (linkattrs0 !== undefined) ? linkattrs0 : attrsNone;
    }
  }
  var linkattrs1_10789 = _x139;
  var _x139 = (title0 !== undefined) ? title0 : "";
  var _x140 = (linkattrs1_10789 !== undefined) ? linkattrs1_10789 : attrsNone;
  var _x141 = (linkid0 !== undefined) ? linkid0 : "";
  return Link(href0, _x139, _x140, _x141);
}
 
export var peano10;
var peano10 = function() {
   
  var loc = { value: Zero };
   
  $std_core.repeat_1(10, function() {
      return ((loc).value = (Succ(((loc).value))));
    });
   
  var res = ((loc).value);
  return $std_core_hnd.prompt_local_var(loc, res);
}();
 
export var peanoN;
var peanoN = function() {
   
  var loc = { value: Zero };
   
  $std_core.repeat_1(100, function() {
      return ((loc).value = (Succ(((loc).value))));
    });
   
  var res = ((loc).value);
  return $std_core_hnd.prompt_local_var(loc, res);
}();
 
 
// Picks path that first matches one of the given (lower-case) extensions, or the last one if none matched.
export function pickExtension(exts, paths) /* (exts : list<string>, paths : list<string>) -> string */  { tailcall: while(1)
{
  if (paths === null) {
    return "";
  }
  else if (paths !== null && paths.tail === null) {
    return paths.head;
  }
  else {
     
    var pathext = $compat.toLower($compat.extname(paths.head));
    var _x142 = $std_core.find(exts, function(ext /* string */ ) {
        return (pathext === ext);
      });
    if (_x142 !== null) {
      return paths.head;
    }
    else {
      {
        // tail call
        paths = paths.tail;
        continue tailcall;
      }
    }
  }
}}
 
export function relative(path) /* (path : string) -> bool */  {
   
  var b_10792 = $compat_regex.contains(path, rxProtocol);
  return (b_10792) ? false : true;
}
 
export function reverseAcc(lineMap, acc) /* (lineMap : lineMap, acc : lineMap) -> lineMap */  { tailcall: while(1)
{
  if (lineMap === null) {
    return acc;
  }
  else {
    {
      // tail call
      var _x143 = Include(lineMap.line, lineMap.start, lineMap.count, lineMap.fileName, lineMap.lineMap, acc);
      lineMap = lineMap.rest;
      acc = _x143;
      continue tailcall;
    }
  }
}}
 
export function reverse(lineMap) /* (lineMap : lineMap) -> lineMap */  {
  return reverseAcc(lineMap, End);
}
 
export function ruleInc(rule) /* (rule : string) -> () */  {
  var _x144 = $compat_dict._lp__lb__rb__rp_(ruleHist, rule);
  if (_x144 === null) {
    return $compat_dict._lp__lb__rb__1_rp_(ruleHist, rule, 0);
  }
  else {
    return $compat_dict._lp__lb__rb__1_rp_(ruleHist, rule, $std_core._int_add((_x144.value),1));
  }
}
 
export function setLineNo(attrs, line, dataline) /* (attrs : attrs, line : int, dataline : string) -> attrs */  {
   
  var _x145 = attrs.text;
  var left_10794 = $std_core._lp__plus__plus__1_rp_(_x145, " ; line:");
   
  var right_10795 = $std_core.show(line);
   
  var _arg_8410 = $std_core._lp__plus__plus__1_rp_(left_10794, right_10795);
  return addKeyval(_copy(attrs, false, undefined, undefined, _arg_8410, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, line), "data-line", dataline);
}
 
export function traceRuleHist() /* () -> () */  {
  return $std_core.foreach($compat_dict.list_1($compat_dict.freeze(ruleHist)), function(kv /* (string, int) */ ) {
      var _x145 = $std_core._lp__plus__plus__1_rp_($std_core._lp__plus__plus__1_rp_($compat.align(kv.fst, 20), ": "), $std_core.show(kv.snd));
      return $std_core.trace(_x145);
    });
}
 
export function translateLine(lineInfos, lineNo0) /* (lineInfos : lineMap, lineNo : int) -> string */  { tailcall: while(1)
{
  if (lineInfos === null) {
    return $std_core.show(lineNo0);
  }
  else {
    if ($std_core._int_lt(lineNo0,(lineInfos.line))) {
      return $std_core.show(lineNo0);
    }
    else {
      var _x146 = $std_core._int_ge(lineNo0,($std_core._int_add((lineInfos.line),(lineInfos.count))));
      if (_x146) {
         
        var y0_10803 = $std_core._int_sub((lineInfos.count),1);
        {
          // tail call
          var _x147 = $std_core._int_sub(lineNo0,y0_10803);
          lineInfos = lineInfos.rest;
          lineNo0 = _x147;
          continue tailcall;
        }
      }
      else {
         
        var left2_10812 = $std_core.show(lineInfos.line);
         
        var left1_10810 = $std_core._lp__plus__plus__1_rp_(left2_10812, ";");
         
        var left0_10808 = $std_core._lp__plus__plus__1_rp_(left1_10810, lineInfos.fileName);
         
        var left_10806 = $std_core._lp__plus__plus__1_rp_(left0_10808, ":");
         
        var x2_10814 = $std_core._int_sub(lineNo0,(lineInfos.line));
         
        var right_10807 = translateLine(lineInfos.lineMap, $std_core._int_add(x2_10814,(lineInfos.start)));
        return $std_core._lp__plus__plus__1_rp_(left_10806, right_10807);
      }
    }
  }
}}
 
export function trimLines(s) /* (s : string) -> string */  {
  var _x149 = undefined;
  var _x148 = (_x149 !== undefined) ? _x149 : 0;
  return $compat_regex.replaceEx_1(s, rxTrimLines, "", true, _x148);
}
 
export function unindent(txt) /* (txt : string) -> string */  {
   
  var v_17126 = ((txt).split(("\n")));
   
  var lines = $std_core.vlist(v_17126);
   
  var xs_10823 = $std_core.map_5($std_core.filter(lines, function(s0 /* string */ ) {
         
        var b_10825 = $compat_regex.contains(s0, $compat_regex.regex("^\\\\s*$"));
        return (b_10825) ? false : true;
      }), function(s00 /* string */ ) {
      var _x150 = $compat_regex.find(s00, $compat_regex.regex("^\\\\s*"));
      if (_x150 === null) {
        return 0;
      }
      else {
        var _x151 = _x150.value.matched;
        return $std_core.count_1(_x151);
      }
    });
   
  if (xs_10823 === null) {
    var _x152 = undefined;
    var cindent = (_x152 !== undefined) ? _x152 : 0;
  }
  else {
    var cindent = $std_core.foldl(xs_10823.tail, xs_10823.head, $std_core.min);
  }
  if ($std_core._int_le(cindent,0)) {
    return txt;
  }
  else {
     
    var xs0_10828 = $std_core.map_5(lines, function(s10 /* string */ ) {
        return $compat.substr(s10, cindent);
      });
    if (xs0_10828 === null) {
      return "";
    }
    else {
      return $std_core._lift17188_joinsep("\n", xs0_10828.tail, xs0_10828.head);
    }
  }
}