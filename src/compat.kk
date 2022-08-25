
module compat

/*---------------------------------------------------------------------------
This module implements functions from the koka version v1
Most of the functions come from lib/core.kk
Those are needed to compile madoko successfully since a lot of functions are not available anymore in the v2 koka library
---------------------------------------------------------------------------*/

/*
  Operator "+" --> addition of 2 strings
*/
pub fun (+) (left: string, right: string): string {
  return left ++ right
}

/*
  Operator "+" --> addition of 2 list<string>
*/
pub fun (+) (left: list<a>, right: list<a>): list<a> {
  return left ++ right
}

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




pub val maxInt = 0x7FFFFFFF
