/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Syntax highlighting
module hilite

import compat/regex
import compat/path
import common
import compat
import stringcompat

extern import {
  js monarch "./monarch"
}

// hilite mode. abstract.
pub type hilitemode;

// struct
struct hilite( highlighted : string, finalMode : hilitemode )

// Highlight using highlight.js. Use 'auto' for automatic language detection
extern xhilite( src : string, lang : string, mode : hilitemode ) : hilite {
  js inline "(fun(){ var res = monarch.highlightTextFragment(#3,#1); return Hilite(res.html,res.next); })()"
} 

extern xinitialMode( lang : string) : hilitemode {
  js inline "(fun(){ var res = monarch.getInitialMode(#1); if (!res) throw new Error('unknown language: ' + #1); return res; })()"
}


// Syntax highlight code. 
// If "lang" is the empty string, returns Nothing. 
pub fun hilite( src : string, lang : string ) : maybe<string> 
{
  if (lang=="") return Nothing
  catch( { Just(xhilite(src,lang.toLower,xinitialMode(lang.toLower)).highlighted)  }, fn(exn) { 
           warning("could not highlight: " + exn.compat/show)
           Nothing
         })
}


// Syntax highlight code. 
// If "lang" is the empty string, returns Nothing. 
// Use `auto` for automatic language detection.
pub fun hilitePartial( src : string, lang : string, mbMode : maybe<hilitemode> = Nothing) : maybe<(string,hilitemode)>
{
  if (lang=="") return Nothing
  catch( { 
    val mode = match(mbMode) {
      Nothing -> xinitialMode(lang.toLower)
      Just(m) -> m
    }
    val res = xhilite(src,lang.toLower,mode)
    Just( (res.highlighted,res.finalMode) )
   }, 
   fn(exn) { 
     warning("could not highlight: " + exn.compat/show)
     Nothing
   })
}

extern xxregisterLanguage( name : string, definition : string ) : io () {
  js inline "monarch.register(#2,#1)"
}

pub fun registerLanguage( name : string, definition: string ) : io () {
  catch( { //trace("register: " + name + ": " + fname); 
           xxregisterLanguage(name.toLower,definition) }, 
         fn(exn) { println("error: could not register language: " + name  + "\n" + exn.compat/show /* + "\n" + fulldef */ ) } )
}

extern xcanHilite( name : string ) : bool {
  js inline "(monarch.getLanguage(#1) != null)"
}

pub fun canHilite( name : string ) : bool {
  xcanHilite( name.toLower )
}