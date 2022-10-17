module latexFormatter_Part4

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

pub fun blockEnv( body : string, env : string, args : string = "" ) {
  "\\begin{" + env + "}" + args + "%mdk\n" + body + "%mdk\n\\end{" + env + "}"
}

pub fun trimEnv( body : string, env : string, args : string = "" ) {
  body.trim.blockEnv(env,args)
}



pub fun cssInlineMargin( body0 : string, kvs : dict<string>, margin : string ) : string {
  val body1 = body0.onKey(kvs,margin + "-left", fn(width,body) {
                "\\hspace*" + cssWidth(width).braced + body
              })
              .onKey(kvs,margin + "-right", fn(width,body) {
                body + "\\hspace*" + cssWidth(width).braced
              })
  val body2 = if (kvs.cssIsInlineBlock) {
                body1.onKeys(kvs,[margin + "-top", margin + "-bottom"],fn(body) {
                        "\\md" + margin + "tb" +
                          cssHeight(kvs.find(margin + "-top")).braced +
                          cssHeight(kvs.find(margin + "-bottom")).braced +
                          body.braced
                })
              }
              else body1
  body2.onKey(kvs, "float", fn(value,body) {
    if (value=="left") then "\\mdfloatleft" + body.braced
    elif (value=="right") then "\\mdfloatright" + body.braced
    elif (value=="center") then "\\mdfloatcenter" + body.braced
    else body
  })
}

pub fun padding( body : string, kvs : dict<string> ) : string {
  val ptop = kvs.find("padding-top").cssWidth
  val pbottom = kvs.find("padding-bottom").cssWidth
  val pleft = kvs.find("padding-left").cssWidth
  val pright = kvs.find("padding-right").cssWidth
  if (ptop==pbottom && pbottom==pleft && pleft==pright)
   then body.trimEnv("mdbpadding", ptop.braced )
   else body.trimEnv("mdbpaddingx", [ptop,pright,pbottom,pleft].map(braced).join )
}

pub fun margins( body : string, kvs : dict<string> ) : string {
  val mtop = kvs.find("margin-top").cssWidth  // top/bottom in margins are calculated with respect to width!
  val mbottom = kvs.find("margin-bottom").cssWidth
  val (mleft,mright) = kvs.marginLR
  if (mtop==mbottom && mbottom==mleft && mleft==mright)
   then body.trimEnv("mdbmargin", mtop.braced )
  elif (mleft.is-empty && mright.is-empty)
   then body.trimEnv("mdbmargintb", [mtop,mbottom].map(braced).join )
   else body.trimEnv("mdbmarginx", [mtop,mright,mbottom,mleft].map(braced).join )
}

pub fun marginLR( kvs : dict<string>, pre = "margin") : (string,string) {
  val width  = if (pre=="margin") then kvs.dimBorderBoxWidth else kvs.find("width","").cssWidth
  val left  = kvs.find(pre + "-left").cssWidth("auto")
  val mright = kvs.find(pre + "-right").cssWidth("auto")
  val right  = if (width.bool && left.is-empty && mright.is-empty) then "auto" else mright

  if (left=="auto") {
    if (right=="auto") {
      val auto = dimAuto(width)
      (auto,auto)
    }
    else (dimAuto(width,right),right)
  }
  elif (right=="auto") {
    (left,dimAuto(width,left))
  }
  else {
    (left,right)
  }
}

// -----------------------------------------------------------------------------
// Dimensions
// -----------------------------------------------------------------------------

pub fun dimAuto( w : string, other : string = "" ) : string {
  if (w.is-empty) then "" else "\\dimauto" + w.braced + other.braced
}

pub fun dimMarginBoxWidth( kvs : dict<string>, widthName = "width"  ) {
  val width = kvs.dimBorderBoxWidth(widthName)
  if (width.is-empty) return ""

  val extra = [kvs.find("margin-left"),kvs.find("margin-right")
              ].filter(bool).map( fn(wd) { wd.cssWidth })
  if (extra.is-nil)
   then width
   else "\\dimeval" + ([width] + extra).join("+").braced
}

pub fun dimBorderBoxWidth( kvs : dict<string>, widthName = "width"  ) {
  val width = kvs.dimContentWidth(widthName)
  if (width.is-empty) return ""

  val extra = [kvs.find("border-left-width"),kvs.find("padding-left"),
               kvs.find("border-right-width"),kvs.find("padding-right")
              ].filter(bool).map( fn(wd) { wd.cssWidth })
  if (extra.is-nil)
   then width
   else "\\dimeval" + ([width] + extra).join("+").braced
}

pub fun dimContentWidth( kvs : dict<string>, widthName = "width" ) {
  val w0   = kvs.find(widthName)
  val maxw = kvs.find("max-width")
  val minw = kvs.find("min-width")

  val w = if (!w0.is-empty) then w0
          elif (!maxw.is-empty) maxw
          else minw
  if (w.is-empty) return ""

  val width0 = if (maxw.is-empty) then w.cssWidth else "\\dimmin" + w.cssWidth.braced + maxw.cssWidth.braced
  val width  = if (minw.is-empty) then width0 else "\\dimmax" + width0.braced + minw.cssWidth.braced
  width
}

pub fun dimContentHeight( kvs : dict<string> ) {
  val h0   = kvs.find("height")
  val maxh = kvs.find("max-height")
  val minh = kvs.find("min-height")

  val h = if (!h0.is-empty) then h0
          elif (!maxh.is-empty) maxh
          else minh
  if (h.is-empty) return ""

  val height0 = if (maxh.is-empty) then h.cssHeight else "\\dimmin" + h.cssHeight.braced + maxh.cssHeight.braced
  val height  = if (minh.is-empty) then height0 else "\\dimmax" + height0.braced + minh.cssHeight.braced
  height
}
// -----------------------------------------------------------------------------
// Border-box
// -----------------------------------------------------------------------------

pub fun cssBox( body : string, kvs : dict<string>, isBlock : bool ) : string {
  val breakable = kvs.find("breakable").bool || kvs.find("long").bool
  val fboxkeys  = ["border-top-style","border-bottom-style","border-left-style","border-right-style",
                   "vertical-align", "height-align", "baseline",
                   "background-color","height","width"]
  if (breakable || kvs.containsAny(fboxkeys)) {
    // use longfbox
    val attrs = [kvs.cssTRBL("padding","",cssWidthX),
                 kvs.cssTRBL("border","-width",cssWidthX),
                 kvs.cssTRBL("border","-color",cssColor),
                 kvs.cssTRBL("border","-style",cssValue),
                 // kvs.cssTRBL("border","-radius",cssWidthX), // TODO: parse double radius
                 kvs.cssRadius("border-radius"),
                 kvs.cssRadius("border-top-left-radius"),
                 kvs.cssRadius("border-top-right-radius"),
                 kvs.cssRadius("border-bottom-left-radius"),
                 kvs.cssRadius("border-bottom-right-radius"),
                 kvs.cssVerticalAlign,
                 kvs.cssAttr("height-align",cssValue,["top","middle","bottom"]),
                 kvs.cssAttr("text-align",cssValue,["default","left","center","right","justify"]),
                 kvs.cssAttr("baseline",cssValue,["bottom","middle","top"]),
                 kvs.cssAttr("background-color",cssColor),
                 kvs.cssAttr("background-clip",cssValue,["border-box","padding-box","content-box"]),
                 kvs.cssAttr("height",cssHeightX),
                 kvs.cssAttr("width",cssWidthX),
                 kvs.cssAttr("breakable",cssBool),
                ].concat
    val args = attrs.join(",").braced
    if (isBlock)
     then body.trimEnv("mdblock",args)
     else "\\mdinline" + args + body.braced
  }
  else {
    // use specific environments
    body
      .onKey(kvs,"text-align", fn(value,b) {
        if (!isBlock) then b else {
          blockEnv( b,
            if (value=="left") then "mdflushleft"
            elif (value=="right") then "mdflushright"
            elif (value=="center") then "mdcenter"
            else "mdjustify")
        }
      })
      .onKeys(kvs,["padding-left","padding-right","padding-top","padding-bottom"], fn(b) {
        if (isBlock) then b.padding(kvs) else b.cssInlineMargin(kvs,"padding")
      })
  }
}

pub fun cssVerticalAlign( kvs : dict<string> ) : list<string> {
 match(kvs["vertical-align"]) {
    Nothing -> []
    Just(value) -> {
      if (value.cssIsLength)
       then ["raise=" + value.cssWidth]
       else ["vertical-align=" + value.cssValue]
    }
  }
}

pub fun cssTRBL( kvs : dict<string>, pre : string, post : string, show : string -> string ) : list<string>
{
  val (top,topv) = kvs.cssAttrX(pre + "-top" + post, show)
  val (right,rightv) = kvs.cssAttrX(pre + "-right" + post, show)
  val (bottom,bottomv) = kvs.cssAttrX(pre + "-bottom" + post, show)
  val (left,leftv) = kvs.cssAttrX(pre + "-left" + post, show)

  if (topv==rightv && rightv==bottomv && bottomv==leftv)
   then (if (top.is-nil) then [] else [pre + post + "=" + topv])
   else [top,right,bottom,left].concat
}

pub fun cssHeightX( value : string ) : string {
  cssHeight(value)
}

pub fun cssWidthX( value : string ) : string {
  cssWidth(value)
}

pub fun cssRadius( kvs : dict<string>, key : string ) : list<string> {
  match(kvs[key]) {
    Nothing -> []
    Just(value) -> {
      match(value.cssSplitValues) {
        [v] -> [key + "=" + v.cssWidth]
        [h,v] -> [key + "={" + h.cssWidth + "," + v.cssWidth + "}"]
        _ -> {
          warning("illegal CSS radius: " + key + ":'" + value)
          []
        }
      }
    }
  }
}

pub fun cssAttr( kvs : dict<string>, key : string, show : string -> string, allowed : list<string> = [], cssKey : string = key ) : list<string> {
  match(kvs[key]) {
    Nothing -> []
    Just(value) -> {
      if (allowed.is-cons && !allowed.any(fn(v) { v==value })) then {
        warning("illegal CSS value: " + key + ":'" + value + "'\n  expecting one of: " + allowed.join(","))
        []
      }
      else {
        [cssKey + "=" + value.show]
      }
    }
  }
}

pub fun cssAttrX( kvs : dict<string>, key : string, show : string -> string ) : (list<string>,string) {
  match(kvs[key]) {
    Nothing -> ([],"")
    Just(value) -> {
      val svalue = value.show
      ([key + "=" + svalue], svalue)
    }
  }
}

// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------

pub fun onKey( body : string, kvs : dict<string>, key : string, action ) : string {
  match(kvs[key]) {
    Nothing -> body
    Just(value) -> if (value.is-empty) then body else action(value,body)
  }
}


pub fun onClasses( body : string, attrs : attrs, classes : list<string>, action ) : string {
  if (classes.any(fn(c) { attrs.hasClass(c)})) then action(body) else body
}

pub fun onKeys( body : string, kvs : dict<string>, keys : list<string>, action ) : string {
  if (kvs.containsAny(keys)) then action(body) else body
}

pub fun texArgs( xs : list<string> ) { xs.map(braced).join}


pub fun containsAny( d : dict<a>, keys : list<string> ) : bool {
  keys.any( fn(key) { d.containsKey(key) })
}

pub fun find( d : dict<string>, key : string, default = "" ) : string {
  d[key].maybe(default,id)
}

pub fun nosuppressKey( kv : (string,string) ) : bool {
  val key = kv.fst
  (key != "source" && !(key.startsWith("html-") || key.startsWith("css-")))
}