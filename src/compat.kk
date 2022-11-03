
module compat

import stringcompat

extern include {
  js file "crypto-inline.js"
}
/*---------------------------------------------------------------------------
This module implements functions from the koka version v1
Most of the functions come from lib/core.kk
Those are needed to compile madoko successfully since a lot of functions are not available anymore in the v2 koka library
---------------------------------------------------------------------------*/


/*
  returns the length of a string
*/
pub fun length(s: string): int {
  return s.count;
}

/*
  substring functions operating in csharp and js
  all from core.kk
*/
pub extern substr1 : (s : string, start : int ) -> string { 
  cs inline "((#1).Substring(#2))";
  js inline "((#1).substr(#2 >=1 ? #2 : 1))";
}

pub extern substr : (s : string, start : int ) -> string { 
  cs inline "((#1).Substring(#2))";
  js inline "((#1).substr(#2))";
}

pub extern substr2 : (s : string, start : int, len : int ) -> string {
  cs inline "#1.Substring(#2,#3)";
  js inline "#1.substr(#2, #3)"
}

pub fun substr( s : string, start : int, len : int   )
{
  if (len <= 0) then ""
   else substr2(s,start,len)
}

/*
  to lowercase funtion from core.kk
*/
pub extern toLower : (s : string) -> string { 
  cs inline "(#1).ToLower()"
  js inline "(#1).toLowerCase()" 
}

/*
  startsWith function from core.kk
*/
pub extern startsWith: (s : string, pre : string ) -> bool { 
  cs inline "#1.StartsWith(#2)";
  js inline "#1.substr(0,#2.length) === #2"
}

/*
  endsWith function from core.kk
*/
pub extern endsWith: (s : string, post : string ) -> bool { 
  cs inline "#1.EndsWith(#2)";
  js inline "((#1).indexOf(#2, (#1).length - (#2).length) !== -1)"
}

// Does string `s`  contain the character `c`  ?
pub extern indexOf : (s : string, c : char ) -> int { 
  cs inline "(#1.IndexOf(#2))";
  js inline "((#1).indexOf(#2))";
}

// Does string `s`  contain the character `c`  ?
pub extern lastIndexOf : (s : string, c : char ) -> int { 
  cs inline "(#1.LastIndexOf(#2))";
  js inline "((#1).lastIndexOf(#2))";
}

// Does string `s`  contain the string `sub`  ?
pub extern indexOf : (s : string, sub : string ) -> int { 
  cs inline "(#1.IndexOf(#2))";
  js inline "((#1).indexOf(#2))";
}

// Does string `s`  contain the string `sub`  ?
pub extern lastIndexOf : (s : string, sub : string ) -> int { 
  cs inline "(#1.LastIndexOf(#2))";
  js inline "((#1).lastIndexOf(#2))";
}

/*
  showHex function from core.kk
*/
pub fun showHex( i : int, width : int = 1, useCapitals : bool = True )
{
  val w = if (width < 0) then 0 else width
  val x = if (useCapitals) then "X" else "x"
  gformat(i, x + w.show)
}

/*
  helper function for showHex from core.kk
*/
extern gformat : forall<a> (value:a,format:string) -> string { 
  cs inline "#1.ToString(#2)";
  js inline "$gformat(#1, #2)";
}

/*
  Return the extension (including the `.`)  
  `extname("foo.ext") == ".ext"`, `extname("bla.") == "."`, `extname("bla") == ""` 
  from path.kk
*/
pub extern extname( p : string ) : string {
  cs inline "System.IO.Path.GetExtension(#1)"
  js inline "path.extname(#1)"
}

/*
  Right-align a string to width `width`  using `char`  (default is a space) to fill from the left.
  from core.kk
*/
pub fun align( s : string, width : int, char : char = ' ') : string
{
  val n = s.length
  if (n >= width)
   then s
   else string(width - n, char) + s
}
/*
  Construct a string of `n`  characters `c`  (or the empty string if `n <= 0` )
  from core.kk
*/
pub fun string( n : int, c : char ) : string 
{
  if (n <= 0) then "" else makeString(n,c)
}

/*
  from core.kk
*/
extern makeString : (n : int, c : char ) -> string { 
  cs inline "new String(#2,#1)";
  js inline "Array(#1 + 1).join(#2)";
}



// Fold a list from the right, i.e. `foldr([1,2],0,(+)) == 1+(2+0)` 
// Note, "foldr" is less efficient than "foldl" as it reverses the list first. 
pub fun foldr(xs,z,f)
{
  xs.reverse.foldl(z,fn(x,y){f(y,x)}) 
}




// Concatenate the result lists from applying a function to all elements
pub fun concat( xs: list<a>, f : a -> e list<b> ) : e list<b>
{
  xs.map(f).concat()
}

// Does string `s`  contain the character `c`  ?
pub extern contains : (s : string, c : char ) -> bool { 
  cs inline "(#1.IndexOf(#2) >= 0)";
  js inline "((#1).indexOf(#2) >= 0)";
}


// Raise an exception with a specified message.
pub extern error : forall<a> string -> exn a { 
    cs "Primitive.Error";
    js "$error"
}


// Invoke "action" for each element of a list while "action" return "Nothing"
pub fun foreachUntil( xs : list<a>, action : (a) -> e maybe<b> ) : e maybe<b>
{
  match(xs) {
    Nil        -> Nothing
    Cons(x,xx) -> { 
      match(action(x)) {
        Nothing -> xx.foreachUntil(action) 
        res    -> res
      }
    }
  }
}
// Return a default value when an exception is raised
pub fun onExn( value : a , action : () -> <exn|e> a ) : e a {
  catch( action, fun(_) { value })
}

// Catch an exception raised by "error" and handle it.
// Use "onExn" or "onFail" when appropiate.
pub extern catch_old : forall<e,a> ( action : () -> <exn|e> a, hndl: exception -> e a) -> e a {
  cs inline "Primitive.Catch<##2>(#1,#2)"
  js "$primcatch"
}

pub extern show( exn : exception ) : string {
  cs inline "#1.ToString()"
  js inline "(#1 ? #1.toString() : 'unknown exception')"
}

// Trim whitespace on the left and right side of a string
// pub fun trim( s : string ) : string {
//   s.trimLeft.trimRight
// }

// Trim the starting white space of a string 
pub extern trimLeft( s : string ) : string {
  cs inline "(#1).TrimStart()"
  js inline "((#1).replace(/^\\s\\s*/,''))"
}

// Trim the ending white space of a string.
pub extern trimRight( s : string ) : string {
  cs inline "(#1).TrimEnd()"
  js inline "((#1).replace(/\\s+$/,''))"
}

pub extern replaceAll( s : string, pattern : string, repl : string ) : string { 
  cs inline "(#1).Replace(#2,#3)";
  js inline r"(#1).replace(new RegExp((#2).replace(/[\\\$\^*+\-{}?().]/g,'\\$&'),'g'),#3)";  
}

pub fun parseInt( s : string, hex : bool = False) : maybe<int> {
  val base = if (hex) then 16 else 10
  match(s.list.dropWhile(isWhite)) {
    Nil -> Just(0)
    Cons(c,cc) | c=='-' -> {
      match(parsePosInt(cc,base)) {
        Nothing -> Nothing
        Just(i) -> Just(0-i)
      }
    }
    cs -> parsePosInt(cs,base)     
  }
}

pub fun parseIntDefault( s : string, default : int = 0, hex : bool = False ) : int {
  if (s.is-empty) then default else {
    match( s.parseInt(hex) ) {
      Nothing -> default
      Just(i) -> i
    }
  }
}

fun parsePosInt( s : list<char>, base : int = 10 ) : maybe<int> {
  match(s) {
    Cons(c1,Cons(c2,cs)) | c1=='0' && (c2=='x' || c2=='X')
      -> parseDigits(cs,16)
    _ -> parseDigits(s,base)
  }
}


fun dropWhile( xs : list<a>, predicate : a -> e bool ) : e list<a>
{
  xs.span(predicate).snd
}

fun isWhite( c : char )     : bool { (c == ' ' || c == '\t' || c == '\n' || c == '\r')}


/**
 crypto.kk in v1
*/


// Compute an md5 hash of a string.
pub extern md5( s : string ) : string {
  js "$md5"
}

pub fun fill( s : string, width : int, char : char = ' ') : string
{
  val n = s.length
  if (n >= width)
   then s
   else s + string(width - n, char)
}

pub fun zipWithIter( f, i, xs, ys )
{
  // recurse for the first "maxListStack" elements over the stack (to avoid extra heap allocation)
  if (i > maxListStack) then zipWithAcc( f, i, Nil, xs, ys )
  else {
    match(xs) {
      Nil -> Nil
      Cons(x,xx) ->
        match(ys) {
          Nil -> Nil
          Cons(y,yy) -> Cons( f(i,x,y), zipWithIter(f,i+1,xx,yy))
        }
    }
  }
}

// Zip two lists together by pairing the corresponding elements.
// The returned list is only as long as the smallest input list.
pub fun zip( xs : list<a>, ys : list<b> ) : list<(a,b)>
{
  zipWithIndexed( xs, ys, fun(i,x,y) { (x,y) } )
}

// Zip two lists together by apply a pub fun "f" to all corresponding elements.
// The returned list is only as long as the smallest input list.
pub fun zipWith( xs : list<a>, ys :list<b>, f : (a,b) -> e c ) : e list<c>
{
  zipWithIndexed(xs,ys,fun(i,x,y) { f(x,y) })
}

// Zip two lists together by apply a pub fun "f" to all corresponding elements
// and their index in the list.
// The returned list is only as long as the smallest input list.
pub fun zipWithIndexed( xs : list<a>, ys :list<b>, f : (int,a,b) -> e c ) : e list<c>
{
  zipWithIter(f,0,xs,ys)
}

val maxListStack = 200


fun zipWithAcc( f, i, acc, xs, ys )
{
  match(xs) {
    Nil -> reverse(acc)
    Cons(x,xx) ->
      match(ys) {
        Nil -> reverse(acc)
        Cons(y,yy) -> zipWithAcc(f, i+1, Cons( f(i,x,y), acc), xx, yy)
      }
  }
}

// Returns "true" if the integer `i`  is an odd number.
pub fun odd( i ) {
  return (i % 2 != 0);
}

// Returns "true" if the integer `i`  is an even number.
pub fun even( i ) {
  return (i % 2 == 0);
}

pub fun filterMap( xs : list<a>, pred : a -> e maybe<b> ) : e list<b>
{
  match(xs) {
    Nil -> Nil
    Cons(x,xx) -> match(pred(x)) {
      Nothing -> xx.filterMap(pred)
      Just(y) -> Cons(y,xx.filterMap(pred))
    }
  }
}

pub fun mbstring( ms : maybe<string> ) : string {
  match(ms) {
    Nothing -> ""
    Just(s) -> s
  }
}



// Parse digits in a "base" between 2 and 36 (default 10) given an initial value "acc" (default 0)
// Returns "acc" on the empty string, and "Nothing" if an invalid digit is encountered.
fun parseDigits( cs : list<char>, base : int = 10, acc : int = 0 ) : maybe<int> {
  match(cs) {
    Nil -> Just(acc)
    Cons(c,cc) -> {
      val d = if (c >= '0' && c <= (if (base >= 10) then '9' else ('0' + (base - 1).char))) then {
                (c - '0').int
              }
              elif (base > 10 && base <= 36 && c >= 'a' && c <= ('a' + (base - 11).char)) then { 
                (c - 'a').int + 10
              }
              elif (base > 10 && base <= 36 && c >= 'A' && c <= ('A' + (base - 11).char)) then { 
                (c - 'A').int + 10
              }
              else return Nothing   
      parseDigits(cc, base, base*acc + d)
    }
  }
}


pub fun parseFixed( s : string ) : maybe<float64> {
  match(s.split(".",2)) {
    Cons(pre,Cons(post,Nil)) -> {
      match(pre.parseInt) {
        Nothing -> Nothing
        Just(d) -> match(post.parseInt) {
          Nothing -> Nothing
          Just(f) -> {
            if (f < 0) then Nothing
            elif (f == 0) then Just(d.float64)
            else Just( d.float64 + (10.0^(post.length.float64) / f.float64) )
          }
        }
      }
    }
    _ -> match(s.parseInt) {
      Nothing -> Nothing
      Just(i) -> Just(i.float64)
    }
  }
}

pub fun parseFixedDefault( s : string, default : float64 = 0.0 ) : float64 {
  match(s.parseFixed) {
    Nothing -> default
    Just(d) -> d
  }
}

pub extern floor : (d: float64) -> float64 {
  cs "Math.Floor"
  js "Math.floor"
}


fun indexOfAcc( xs : list<a>, pred : a -> bool, idx : int ) : int
{
  match(xs) {
    Nil -> 0 - 1
    Cons(x,xx) -> if (pred(x)) then idx else indexOfAcc(xx,pred,idx+1)
  }
}

// Returns the index of the first element where "pred" holds, or "-1" if no such element exists.
pub fun indexOf( xs : list<a>, pred : a -> bool ) : int
{
  indexOfAcc( xs, pred, 0 )
}

pub fun isNothing(x: maybe<a>): bool {
  match(x) {
    Nothing -> True
    _ -> False
  }

}

val redirect : ref<global,maybe<(string) -> console ()>> = unsafe-total { ref(Nothing) }

pub fun printRedirect( print : (msg : string) -> console () ) : io ()
{
  redirect := Just(print);
}


// IMPORT from date.kk

type date

pub extern now : () -> ndet date { 
  js inline "new Date()" 
}

pub extern hours : (date) -> int { 
  js inline "#1.getHours()" 
}

pub extern minutes : (date) -> int { 
  js inline "#1.getMinutes()" 
}

pub extern seconds : (date) -> int { 
  js inline "#1.getSeconds()" 
}

// Number of milliseconds since 1 January 1970 00:00:00 UTC.
pub extern time : (date) -> int { 
  js inline "#1.getTime()" 
}


// Return an ISO 8601 date-time string.
// See <http://en.wikipedia.org/wiki/ISO_8601>
pub extern isoDateTime : (date) -> string {
  js inline "#1.toISOString()"
}

// Return the date portion of an ISO date/time string.
pub fun isoDate(d : date) : string {
  val s = d.isoDateTime
  val i = s.indexOf("T")
  if (i >= 0) then s.substr(0,i) else s
}

// Return the time portion of an ISO date/time string.
pub fun isoTime(d : date) : string {
  val s = d.isoDateTime
  val i = s.indexOf("T")
  if (i >= 0) then s.substr(i) else s
}

// Get the year
pub extern year( d : date ) : int {
  js inline "#1.getFullYear()"
}

// Get the month, starting at 1
pub extern month( d : date ) : int {
  js inline "#1.getMonth()+1"
}

// Get the day of the month, starting at 1
pub extern day( d : date ) : int {
  js inline "#1.getDate()"
}

// return the ISO date in local time
pub fun isoLocalDate( d : date ) : string {
  d.year.show + "-" + d.month.show2 + "-" + d.day.show2
}

// return the ISO time in local time
pub fun isoLocalTime( d : date ) : string {
  d.hours.show2 + ":" + d.minutes.show2 + ":" + d.seconds.show2
}

pub fun show2( i : int ) : string {
  i.show.align(2,'0')
} 


pub val maxInt = 0x7FFFFFFF
