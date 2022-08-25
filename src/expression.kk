/*---------------------------------------------------------------------------
  Copyright 2013-2015 Microsoft Corporation.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// The parsing and evaluation of expressions
module expression

import std/data/dict

import common

import compat
import compat/log
import compat/regex
import compat/dict
import compat/string


infixl 5 (<*), (*>), (<*>)
infixl 6 ($>), (<$>)

// --------------------------------------------------------------
// Evaluate expressions
// --------------------------------------------------------------

pub type expr  {
  UnOp( op : string, expr : expr)
  BinOp( op: string, left : expr, right : expr )
  If( cond : expr, ethen : expr, eelse : expr )
  Const( c : constant )
  Var( v : string, display : string )
}

pub type constant {  
  Int( i :int )
  Bool( b : bool )
  String( s : string )
  Regex( r : regex )
  Null() // non-existent 'else'
}



pub fun evaluate( expr : string, eval : expr -> <exn|e> a, default : a ) : e a {
  //trace("evaluate: '" + expr + "'")
  val mbres = unsafe-total( fn() { parseExpr(expr) } )
  match(mbres) {
    Just(res) | res.snd.trim.is-empty -> {
      catch( fn() { eval(res.fst) }, fn(exn) { 
        warning(exn.show)
        default
      })
    }
    _ -> {
      warning("invalid expression: '" + expr + "'")
      default
    }
  }
}

pub fun parseAttrSelectors( pat : string ) : list<expr> {
  val mbres = unsafe-total( fn() { many(parseAttrSelector())(pat) } )
  match(mbres) {
    Just(res) | res.snd.trim.is-empty -> res.fst
    _ -> {
      warning("invalid attribute selector: '" + pat + "'")
      []
    }
  }
}

pub fun evalExpr( expr : expr, lookup : (string,string) -> <exn|e> constant ) : <exn|e> constant {
  match(expr) {
    Const(c) -> c
    Var(v,d) -> lookup(v,d)
    UnOp(op,arg) -> {
      if (op=="not" || op=="!") Bool( !(evalExpr(arg, lookup).bool) )
      elif (op=="regexp" || op=="regexpi") Regex( regex(evalExpr(arg,lookup).string, ignoreCase=(op=="regexpi")) )
      elif (op=="lower") String( evalExpr(arg,lookup).string.to-lower )
      elif (op=="upper") String( evalExpr(arg,lookup).string.to-upper )
      else error("invalid operator: " + op)
    }
    BinOp(op,arg1,arg2) -> {
      val x1 = evalExpr(arg1,lookup)
      val x2 = evalExpr(arg2,lookup)
      if (op=="and"  || op=="&&") Bool( x1.bool && x2.bool )
      elif (op=="or" || op=="||") Bool( x1.bool || x2.bool )
      elif (op==":"  || op=="==" || op=="=") Bool( binop(x1,x2,op,fn(x,y) { x==y },fn(x,y) { x==y },fn(x,y) { x==y }) )
      elif (op=="!=") Bool( binop(x1,x2,op,fn(x,y) { x!=y },fn(x,y) { x!=y },fn(x,y) { x!=y }) )
      elif (op==">")  Bool( binop(x1.cint,x2.cint,op, fn(x,y) { x>y }, serr,berr) )
      elif (op==">=") Bool( binop(x1.cint,x2.cint,op,fn(x,y) { x>=y },serr,berr) )
      elif (op=="<")  Bool( binop(x1.cint,x2.cint,op, fn(x,y) { x<y }, serr,berr) )
      elif (op=="<=") Bool( binop(x1.cint,x2.cint,op,fn(x,y) { x<=y },serr,berr) )
      elif (op=="~=") Bool( binop(x1,x2,op,ierr,matchWord,berr) )
      elif (op=="|=") Bool( binop(x1,x2,op,ierr,matchSubcode,berr) )
      elif (op=="^=") Bool( binop(x1,x2,op,ierr,startsWith,berr) )
      elif (op=="$=") Bool( binop(x1,x2,op,ierr,endsWith,berr) )
      elif (op=="*=") Bool( binop(x1,x2,op,ierr,contains,berr) )
      elif (op=="~~") {
        match(x2) {
          Regex(r) -> Bool( x1.string.contains(r) )
          _        -> error("first argument of '~~' must be a regular expression")
        }
      }
      else error("invalid operator: " + op)
    }
    If(cond,ethen,eelse) -> {
      if (evalExpr(cond,lookup).bool)
        then evalExpr(ethen,lookup)
        else evalExpr(eelse,lookup)
    }
  }
}

fun matchWord( s1 : string, s2 : string ) {
  s2.split(rxSpaces).list.any( fn(w) { s1 == w } )
}
val rxSpaces = regex(r"\s+")

fun matchSubcode( s1 : string, s2 : string ) {
  (s1 == s2) || (s1.startsWith(s2 + "-"))
}

fun ierr( i1 : int, i2 : int ) : exn a { error("cannot compare integers") }
fun serr( s1 : string, s2 : string ) : exn a { error("cannot compare strings") }
fun berr( b1 : bool, b2 : bool ) : exn a { error("cannot compare booleans") }

fun binop( c1 : constant, c2: constant, op : string, iop : (int,int) -> exn a, sop : (string,string) -> exn a, bop : (bool,bool) -> exn a) : exn a {
  val msg = "comparing values of different types (" + op + ") on (" + c1.show + ") and (" + c2.show + ")"
  match(c1) {
    Int(i1) -> match(c2.cint) {
      Int(i2) -> iop(i1,i2)      
      _       -> error(msg)
    }
    String(s1) -> match(c2) {
      String(s2) -> sop(s1,s2)
      Int(i2)    -> match(c1.cint) {
        Int(i1) -> iop(i1,i2)
        _       -> error(msg)
      }
      _          -> error(msg)
    }
    Bool(b1) -> match(c2) {
      Bool(b2) -> bop(b1,b2)
      _        -> error(msg)
    }
    _ -> error(msg)
  }
}


pub fun bool( c : constant ) : exn bool {
  match(c) {
    Bool(b)   -> b
    Int(i)    | i==0 || i==1 -> (i==1)
    String(s) -> {
      val t = s.trim.toLower
      if (t=="true" || t=="1") then True
      elif (t=="false" || t=="0") then False
      else error("cannot use string a boolean condition: " + s.show)
    }
    Regex(r)  -> error("cannot use regular expression as a boolean condition: /" + r.source + "/")
    Null      -> error("cannot use none expression as a boolean condition")
  }
}

pub fun string( c : constant ) : string {
  match(c) {
    Bool(b)   -> if (b) then "True" else ""
    Int(i)    -> i.show
    String(s) -> s
    Regex(r)  -> r.source
    Null      -> ""
  }
}

pub fun cint( c : constant ) : constant {
  match(c) {
    String(s) -> match(s.trim.parse-int) {
      Just(i) -> Int(i)
      _       -> c
    }
    _ -> c
  }
}

pub fun show( expr : expr, outer : bool = True ) : string {
  fun parens(s) {
    if (outer) then s else "(" + s + ")"
  }
  match(expr) {
    Const(c)  -> c.show
    Var(_,d)  -> d
    If(c,t,e) -> parens("@if " + c.show + " @then " + t.show + " @else " + e.show)
    UnOp(op,e)-> op + "(" + e.show + ")"
    BinOp(op,e1,e2) -> parens(e1.show(False) + " " + op + " " + e2.show(False))
  }
}

pub fun show( c : constant ) : string {
  match(c) {
    Bool(b)   -> b.show
    Int(i)    -> i.show
    String(s) -> s.show
    Regex(r)  -> "/" + r.source + "/"
    Null      -> "none"
  }
}

// --------------------------------------------------------------
// Parse pattern for attribute selectors
// --------------------------------------------------------------

fun parseAttrSelector() : parser<expr> {
  (string(r"\[") *> (fn(s) { parseExpr(s) }) <*> optional(string(r"i\b"),"") <* string(r"\]"))
  .map2( fn(expr,i) {
    if (i!="i") then expr else {
      match(expr) {
        BinOp(op,arg1,arg2) -> BinOp(op, UnOp("lower",arg1), UnOp("lower",arg2)  )
        _ -> expr
      }
    }
  })
}

// --------------------------------------------------------------
// Parse Expressions
// --------------------------------------------------------------

// value definition is recursive.
// recursive group: [expression/parseAtom,expression/parseIf,expression/parseExpr,expression/parseBinary,expression/parseUnary] 

val parseExpr = unsafe-total{parseIf()}

fun parseIf() : div parser<expr> {
  ( string(r"@if\b") *> parseBinary() <* string("@then") <*> parseAtom() <*> 
      ( (string(r"@else") *> parseAtom()) || succeed(Const(Null)) ) )
    .map( fn(res) { If(res.fst.fst, res.fst.snd, res.snd) })
  ||
  parseBinary()
}

// added + in line 247 col 82
fun parseBinary() : div parser<expr> {
  parseUnary() <$ 
  ( (string(r"(and\b|or\b|(~~|:|==|!=|>=|<=|>|<|&&|\|\||[~\^\|\$\*]?=)(?=[\s\w/" + "']))" ) <*> (fn(s) { parseExpr(s) }))
      .map2( fn(op,arg2) { return fn(arg1) { BinOp(op,arg1,arg2) }} )
   || succeed( id )
  )
}

fun parseUnary() : div parser<expr> {
  (string(r"(!|not\b|regexp\b|lower\b|upper\b)") <*> parseAtom()).map2( fn(f,e) { UnOp(f,e) } ) ||
  parseAtom()
}

fun parseAtom() : div parser<expr> {
  parseModes || parseConst || parseVar || parseRegex ||
  (string(r"\(") *> (fn(s) { parseExpr(s) }) <* string(r"\)"))
}

val parseConst : parser<expr> =
   (parseBool || parseCInt || parseString).map(fn(c) { Const(c) })

val parseVar : parser<expr> =
  string(r"[\w\-]+").map( fn(s) { Var(s.normalizeId, s) } ) ||
  satisfy(r"&([\w\-]+);").map( fn(cap) { Var(cap.groups[1].normalizeId, cap.groups[1])} )

val parseCInt : parser<constant> = 
  string(r"\d+").map(fn(s) { Int(parse-int(s).maybe(0,id)) } )

val parseBool : parser<constant> = 
  string(r"true\b").map(fn(s) { Bool(True) } ) 
  ||  string(r"false\b").map(fn(s) { Bool(False) } )

// added + in line 279 col 37,48,65 
val parseString : parser<constant> = 
  string(r"'(?:[^\\']|\\[.\n])*'|" + "(?:[^\\" + "]|\\[.\n])*" + "").map(fn(s) { String(s.unquote) } )

val parseRegex : parser<expr> = 
  satisfy(r"/((?:[^\\/\n]|\\.)*)/(i)?").map(fn(cap) { UnOp("regexp" + cap.groups[2], Const(String(cap.groups[1]))) })

val parseModes : parser<expr> =
  (parseMode <*> many(parseMode)).map2 fn(x,xs) {
    xs.foldl(x,fn(a,b) { BinOp("and",a,b) } )
  }


val parseMode : parser<expr> =
  satisfy(r"@(no)?([\w\-]*)").map fn(cap) {
    val v = Var(cap.groups[2].normalizeId, cap.groups[2])
    if (cap.groups[1].is-empty) then v else UnOp("not",v)
  }

// --------------------------------------------------------------
// Parsers
// --------------------------------------------------------------

alias parser<a> = string -> div maybe<(a,string)>

fun map( p : parser<a>, f : a -> b ) : parser<b> {
  return fn(s) { 
    match(p(s)) {
      Nothing -> Nothing
      Just(x) -> Just((f(x.fst),x.snd))
    }
  }
}

fun map2( p : parser<(a,b)>, f : (a,b) -> c ) : e parser<c> {
  p.map( fn(x) { f(x.fst, x.snd)}) 
}


fun (<$)( p1 : parser<a>, p2: parser<a -> b> ) : parser<b> {
  (p1 <*> p2).map2( fn(x,f) { f(x) } )
}

fun (*>)( p1 : parser<a>, p2: parser<b> ) : parser<b> {
  (p1 <*> p2).map( fn(x) { x.snd } )
}

fun (<*)( p1 : parser<a>, p2: parser<b> ) : parser<a> {
  (p1 <*> p2).map( fn(x) { x.fst } )
}

fun ($>)( f : a -> b, p : parser<a> ) : parser<b>  {
  (succeed(f) <$> p)
}

fun (<$>)( p1 : parser<a -> b>, p2 : parser<a> ) : parser<b>  {
  (p1 <*> p2).map( fn(x) { (x.fst)(x.snd) })
}

fun optional( p : parser<a>, def : a ) : parser<a> {
  p || succeed(def)
}

fun (<*>)( p1 : parser<a>, p2 : parser<b> ) : parser<(a,b)> {
  return fn(s) {
    match(p1(s)) {
      Nothing -> Nothing
      Just(x) -> match(p2(x.snd)) {
        Nothing -> Nothing
        Just(y) -> Just(((x.fst,y.fst),y.snd))
      }
    }
  }
}

fun (||)( p1 : parser<a>, p2 : parser<a> ) : parser<a> {
  return fn(s) {
    match(p1(s)) {
      Nothing -> p2(s)
      res     -> res
    }
  }
}

fun many1( p : parser<a>) : parser<list<a>> {
  (p <*> many(p)).map2( fn(x,xs) { Cons(x,xs) } )
}

fun many( p : parser<a> ) : parser<list<a>> {
  return fn(s) { unsafe-total(fn() { manyx(p,s) }) }
}

fun manyx( p : parser<a>, s : string ) : div maybe<(list<a>,string)> {
  match(p(s)) {
    Nothing -> Just(([],s))
    Just(resx) -> {
      val (x,restx) = resx
      if (restx.length>=s.length) // prevent infinite recursion
       then Nothing
       else match(manyx(p,restx)) {
              Nothing    -> Nothing
              Just(resy) -> Just((Cons(x,resy.fst),resy.snd))
            }
    }
  }
}

fun string( r: string ) : parser<string> {
  satisfy("(" + r + ")").map( fn(cap) { cap.groups[1] })
}

fun satisfy( r: string ) : parser<matched> {
  return fn(s) {
    match(s.find(regex(r"^\s*" + r, ignoreCase=True))) {
      Just(cap) -> {
        //trace("satisfy: " + cap.matched)
        Just((cap,s.substr1(cap.next)))
      }
      Nothing -> {
        //trace("satisfy fail: /" + r + "/ on: " + s.substr(0,8)) 
        Nothing
      }
    }
  }
}

fun succeed( x : a ) : parser<a> {
  return fn(s) { Just((x,s)) }
}
