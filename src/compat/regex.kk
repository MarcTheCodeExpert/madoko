
/* This module supports JavaScriptStyle regular expressions.

   The regular expressions conform to the regular expressions of JavaScript
   as described at <https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions>
*/
module compat/regex

import compat
import std/core/types
import stringcompat

extern include {
  js file "regex-inline.js"
}

// Abstract type of a regular expression object
abstract struct regex( obj: any )

// The result of a regular expression match, where "index" is the index in the
// original source string where the match begins, "next" is the index just after
// this match ("next == index + min(1,matched.length)"), "matched" is the content that
// was matched, and "groups" is a vector that contains the content for each
// capture group (where "groups[0] == matched").
pub struct matched( index :int, next :int, matched :string, groups : groups )

abstract struct groups( grp : any )

extern regexSource( r : any ) : string {
  js inline "#1.regex.source"
}

extern groupsIndex( groups : any, index : int ) : string {
  js inline "((#1)[#2] != null ? (#1)[#2] : '')"
}

extern groupsMatchedOn( groups : any, index : int ) : int {
  js inline "(#1[#2] ? 1 : 0)"  // mmm, doesn't catch empty group match.. but FireFox does not distinguish those :-(
}

// For alternative regular expressions, return the alternative that was matched.
// If this was not an alternative regex, returns "-1"
pub extern alternative( groups : groups ) : int {
  js inline "(#1.alternative!=null ? #1.alternative : -1)"
}

extern regexCreate : (string,int,int) -> any {
  js "$regexCreate"
}

extern regexCreateAlt : (vector<string>,int,int) -> any {
  js "$regexCreateAlt"
}

extern regexExec : (any,string,int) -> maybe<matched> {
  js "$regexExec"
}

extern regexExecAll : (any,string,int) -> vector<matched> {
  js "$regexExecAll"
}

extern regexReplaceFun : forall<e> (any, string, (matched) -> e string, int, int ) -> e string {
  js "$regexReplaceFun"
}

extern regexReplace : (any, string, string, int, int ) -> string {
  js "$regexReplace"
}

extern regexSplit : (any, string, int, int ) -> vector<string> {
  js "$regexSplit"
}


// Return the pattern as a string
pub fun source( r : regex ) : string {
  regexSource(r.obj)
}

// How many groups are captured by this regex?
pub fun groupsCount( r : regex ) : int
{
  r.source.replaceAll(rxNonGroup,"").length;
}
val rxNonGroup = regex(r"[^\\\[(]+|\\[\s\S]?|\(\?|\[(?:[^\\\]]|\\.)*\]")

// Return first group that was matched (or -1 if nothing was matched)
pub fun firstMatchedOn( groups : groups, start : int = 1, end : int = 10 ) : int
{
  match (list(start,end).find(fn(i) { groups.matchedOn(i) })) {
    Nothing -> ~1
    Just(i) -> i
  }
}

// Return the first matched group (or "" if nothing matched) starting at "start"
// and returning at most group "end"
pub fun firstMatched(groups : groups, start : int = 1, end : int = 10 ) : string
{
  val i = groups.firstMatchedOn(start,end)
  if (i >= 0) then groups[i] else ""
}

// Return the string captured by a particular group or the empty string.
pub fun []( groups : groups, index : int ) : string {
  groupsIndex(groups.grp, index)
}

// Returns "True" if a particular capture group actually matched.
// This is used if the group can match, but may capture the empty string.
pub fun matchedOn( groups : groups, index : int ) : bool {
  groupsMatchedOn(groups.grp, index).bool
}

// Create a new regular expression. Takes two optional parameters. Set "ignoreCase" to "True"
// to ignore uppercase/lowercase distinction. If  "multiline" is set to "True", then "^" and "$"
// match also the beginning and end of every line (instead of the entire input).
pub fun regex( regex :string, ignorecase :bool = False, multiline : bool = False ) : regex
{
  Regex(regexCreate(regex,if (ignorecase) then 1 else 0, if (multiline) then 1 else 0));
}

// Create a new _alternative_ regular expression.
// Matches any of the given patterns but the groups are local to each alternative.
// See "alternative" to find out which alternative was matched. Contains an optimization
// where a common prefix of all patterns is lifted out of the alternative to increase efficiency.
// Takes two optional parameters. Set "ignoreCase" to "True"
// to ignore uppercase/lowercase distinction. If  "multiline" is set to "True", then "^" and "$"
// match also the beginning and end of every line (instead of the entire input).
// Note: currently only supported in the javascript backend.
pub fun regexAlt( regexs :list<string>, ignorecase :bool = False, multiline : bool = False ) : regex
{
  Regex(regexCreateAlt(regexs.vector,if (ignorecase) then 1 else 0, if (multiline) then 1 else 0));
}

// Find a match for a regular expression starting at start position "start" (by default "0").
// See also "contains"
// (note: this fun is called |exec| in JavaScript).
pub fun find( s :string,  regex :regex, start :int = 0 ) : maybe<matched>
{
  //if (start >= s.length) return Nothing
  regexExec(regex.obj,s,max(start,0))
  //return (if (matched.index < 0) then Nothing else Just(matched))
}

// Find all matches for a regular expression in a string.
pub fun findAll( s :string,  regex :regex, start :int = 0 ) : vector<matched>
{
  if (start > s.length) return vector()
  return regexExecAll(regex.obj,s,max(start,0))
}

fun replaceEx( s :string, regex :regex, repl :(matched :matched) -> e string, all :bool = False, start :int = 0) : e string
{
  if (start > s.length) return s
  return regexReplaceFun(regex.obj, s, repl, if (all) then 1 else 0, max(start,0));
}

fun replaceEx( s :string, regex :regex, repl :string, all :bool = False, start :int = 0) : string
{
  if (start > s.length) return s
  return regexReplace(regex.obj, s, repl, if (all) then 1 else 0, max(start,0));
}

// Split a string "s" in at most "n" parts using a regular expression "r" as separator.
pub fun split( s :string, r :regex, n :int = maxInt, start : int = 0 ) : vector<string>
{
  if (n<=0) return vector();
  if (start>s.length) return vector(1,s);
  return regexSplit( r.obj, s, if (n==maxInt) then 0 else n, max(start,0) );
}

// Replace the first occurrence of "regex" by the result of the replacement fun "repl" in a string "s".
pub fun replace( s : string, regex: regex, repl : (matched :matched) -> e string, start : int = 0) : e string {
  replaceEx( s, regex, repl, all = False, start = start )
}

// Replace the all occurrences of "regex" by the result of the replacement fun "repl" in a string "s".
pub fun replaceAll( s : string, regex: regex, repl : (matched :matched) -> e string, start : int = 0) : e string {
  replaceEx( s, regex, repl, all = True, start = start )
}

// Replace the first occurrence of "regex" by the result a replacement string "repl" in a string "s".
// The replacement string can contain `$$` for a `$` sign, `$n` for a capture group,
// `$&` for the entire match (`==$0`).
pub fun replace( s : string, regex: regex, repl :string, start : int = 0) : string {
  replaceEx( s, regex, repl, all = False, start = start )
}

// Replace all ocurrences of "regex" by the result of a replacement string "repl" in a string "s".
pub fun replaceAll( s : string, regex: regex, repl :string, start : int = 0) : string {
  replaceEx( s, regex, repl, all = True, start = start )
}

// Does a regular expression pattern occur in a string "s"?
// (note: called `test` in javascript)
pub fun contains( s :string, r :regex, start :int = 0 ) : bool
{
  return s.find(r,start).bool
}


// Split a string "s" over separator "sep" where "sep" does not occur in
// _tokens_ matching "exclude".
// For example: `splitExclude("comma,'sep,arated',values", regex(","),regex("'[^']*'|[^',]"))`
pub fun splitExclude( s : string, sep : regex, exclude : regex ) : list<string>
{
  if (s=="") then [] else {
    val splitr = regex( r"^(?:((?:" + exclude.source + ")+)|(" + sep.source + "))")
    s.splitExcludeX(splitr,"")
  }
}

fun splitExcludeX( s : string, splitr : regex, acc : string ) : list<string>
{

    if (s=="") return [acc]
    match( s.find(splitr) ) {
      Nothing -> splitExcludeX(unsafe-decreasing(s.substr1(1)), splitr, acc + s.substr(0,1)) // todo: improve efficiency?
      Just(cap) -> {
        if (cap.groups.matchedOn(1)) {
          splitExcludeX(unsafe-decreasing(s.substr1(cap.next)), splitr, acc + s.substr(0,cap.next))
        }
        else {
          Cons(acc, splitExcludeX(unsafe-decreasing(s.substr1(cap.next)), splitr, "")) // todo: make tail recursive
        }
      }
    }
}
