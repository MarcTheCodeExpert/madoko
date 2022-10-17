module latexFormatter_Part3

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
import latexFormatter_Part4



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









pub fun cssAttrs( attrs0 : attrs = attrsNone, body : string, defaults = [], elem = "" ) : string {
  val attrs = attrs0.adjustFloatAttrs()
  val kvs = dict(defaults + attrs.keyvals).cssExpandKeys()
  val hidden =
    match(kvs["display"]) {
      Just(disp) -> (disp.cssValue.toLower == "none")
      Nothing    -> False
    }
  if (hidden) return ""

  val isBlock = kvs.cssIsBlock

  body.insertCmd(kvs,"tex-cmd-inner-before")
      .appendCmd(kvs,"tex-cmd-inner-after")
      .applyCmd(kvs,"tex-cmd-inner")
      .applyEnv(kvs,"tex-env-inner",attrs)
      .cssInner(kvs, attrs, isBlock)
      .insertCmd(kvs,"tex-cmd-before")
      .appendCmd(kvs,"tex-cmd-after")
      .applyCmd(kvs,"tex-cmd")
      .applyEnv(kvs,"tex-env",attrs)
      .cssBox(kvs,isBlock)
      .cssOuter(kvs, attrs, isBlock)
      .applyCmd(kvs,"tex-cmd-outer")
      .applyEnv(kvs,"tex-env-outer",attrs)
      .insertCmd(kvs,"tex-cmd-outer-before")
      .appendCmd(kvs,"tex-cmd-outer-after")
      .applyBlock(isBlock && !attrs.hasClass("para-block") && !attrs.hasClass("para-continued"), attrs)
}

pub fun adjustFloatAttrs( attrs : attrs ) : attrs {
  if (attrs.hasClass("float") || attrs.lookupKey("display","").cssValue == "block") {
    val flt = attrs.lookupKey("tex-float",attrs.lookupKey("float","")).cssValue
    if (flt=="left" || flt=="right" || flt=="inside" || flt=="outside") then {
      match (attrs.hasKey("width")) {
        Just(w) -> attrs.removeKeys(["width","tex-env-outer"]).addKeyval("tex-wrap-width",w).addKeyvalIfNotExist("tex-wrap-placement",flt.substr(0,1))
        Nothing -> attrs
      }
    }
    else attrs
  }
  else attrs
}

pub fun applyBlock( body : string, isBlock : bool, attrs : attrs ) : string {
  val lineinfo = match(attrs.hasKey("data-line")) {
    Just(info) -> "\n%mdk-data-line={" + info + "}"
    Nothing    -> ""
  }
  if (isBlock) then lineinfo + "\n" + body.trim + "%mdk-565\n" else body
}

pub fun applyCmd( body : string, kvs : dict<string>, key : string ) : string {
  match(kvs[key]) {
    Nothing -> body
    Just(cmd) -> {
      val post = kvs[key + "-postfix"].maybe("",id)
      if (cmd.startsWith("{"))
        then cmdconnect(cmd.substr(1) + post, body).braced
        else cmd + post + body.braced
    }
  }
}

pub fun insertCmd( body : string, kvs : dict<string>, key : string ) : string {
  match(kvs[key]) {
    Nothing -> body
    Just(cmd) -> {
      val cbody = cmdconnect( (if (cmd.startsWith("{")) then cmd.substr(1) else cmd), body)
      if (cmd.startsWith("{")) then cbody.braced else cbody
    }
  }
}


pub fun appendCmd( body : string, kvs : dict<string>, key : string ) : string {
  match(kvs[key]) {
    Nothing -> body
    Just(cmd) -> {
      body + cmd
    }
  }
}

pub fun applyEnv( body : string, kvs : dict<string>, key : string, attrs : attrs) : string {
  match(kvs[key]) {
    Nothing -> body
    Just(env) -> {
      val post = kvs[key + "-postfix"].maybe("",id)
      match(env.find(rxEnv)) {
       Just(cap) -> {
        body.blockEnv(cap.groups[1] + post,expandKeys(cap.groups[2],"",attrs,dict(),kvs)) /* pass 'kvs' as metadata since it contains expanded keys */
       }
       Nothing   -> body.blockEnv(env + post)
      }
    }
  }
}
pub val rxEnv = regex(r"^(\w+)([\s\S]*)$")

// pub fun blockEnv( body : string, env : string, args : string = "" ) {
//   "\\begin{" + env + "}" + args + "%mdk\n" + body + "%mdk\n\\end{" + env + "}"
// }

// pub fun trimEnv( body : string, env : string, args : string = "" ) {
//   body.trim.blockEnv(env,args)
// }

pub fun braceCmd( body : string, cmd : string ) : string {
  "{" + cmd.cmdconnect(body.unbrace) + "}"
}

pub fun unbrace( s : string ) : string {
  if (s.startsWith("{") && s.endsWith("}")) then {
    if (s.indexOf("}") < s.length - 1)
      then s // prevent unbracing: {\cmd}gkkgk{\test}
      else s.substr(1,s.length - 2)
  }
  elif (s.contains(rxCommentEnd)) then s + "\n"
  else s
}

pub val rxCommentEnd = regex(r"(?:^|[^\\])%.*$")

pub fun cmdconnect( cmd : string, s : string ) : string {
  if (cmd.is-empty || s.is-empty || cmd.endsWith("}")) then cmd + s
  elif (s.contains(rxCmdOk)) then cmd + s
  elif (s.contains(rxCmdSpace)) then cmd + "{}" + s
  else cmd + " " + s
}
pub val rxCmdOk = regex(r"^[^a-zA-Z0-9\s]")
pub val rxCmdSpace = regex(r"^\s")


pub fun trimEnvCmd( body : string, name : string, args : string, isBlock : bool ) {
  if (isBlock)
    then body.trimEnv( "mdb" + name, args)
    else "\\md" + name + args + body.braced
}


pub fun cssInner( body0 : string, kvs : dict<string>, attrs : attrs, isBlock : bool ) : string {
  body0
    .onKey(kvs,"color", fn(value,body) {
      body.braceCmd("\\mdcolor" + value.cssColor.braced)
    })
    .cssFont(kvs)
    .cssText(kvs,attrs,isBlock)
    .onKey(kvs,"tex-label-inner-before", fn(value,body) {
      "\\label" + value.braced + "%mdk\n" + body
    })
}

pub fun cssOuter( body0 : string, kvs : dict<string>, attrs : attrs, isBlock : bool ) : string {
  val body1 = if (kvs["tex-label-inner-before"].is-just) then body0 else
    match(kvs["tex-label-before"]) {
      Just(lab) -> "\\label" + lab.braced + "%mdk\n" + body0
      _ -> match(kvs["tex-label"]) {
        Just(lab) | lab.bool -> body0 + "\\label" + lab.braced + "%mdk\n"
        _ -> if (attrs.name.is-empty) then body0 else body0 + "\\label" + attrs.name.braced + "%mdk\n"
      }
    }
  val body2 = if (isBlock) then {
      val body1x = body1
        .onKeys(kvs,["margin-left","margin-right","margin-top","margin-bottom"], fn(b) {
          b.margins(kvs)
        })
      if (!kvs.containsKey("tex-wrap-width")) then body1x else {
        val width = kvs.dimMarginBoxWidth("tex-wrap-width")
        val wrapfig = kvs.find("tex-wrap-env","wrapfigure")
        val wraplines = kvs.find("tex-wrap-lines","")
        val wrapplace = kvs.find("tex-wrap-placement","o")
        val args = (if (wraplines.bool) then "[" + wraplines + "]" else "") + wrapplace.braced + width.braced
        body1x.blockEnv(wrapfig,args)
      }
    }
    else {
      body1.cssInlineMargin(kvs,"margin")
    }
  body2.onKey(kvs, "page-break-before", fn(value,b) {
    cmdconnect(cssPagebreak(value),b)
  })
  .onKey(kvs, "page-break-after", fn(value,b) {
    b + cssPagebreak(value)
  })
}

pub fun cssPagebreak( value : string ) {
  val key = cssValue(value).toLower
  val cmd = match(key.parseInt) {
    Just(penalty) -> "\\penalty" + penalty.show.braced
    Nothing -> {
      if (key=="always") then "\\newpage"
      elif (key=="avoid") then "\\nobreak"
      elif (key=="left" || key=="verso") then "\\cleartoleftpage"
      elif (key=="right" || key=="recto") then "\\cleardoublepage"
      elif (key=="auto") then "\\goodbreak"
      elif (key=="clear") then "\\clearpage"
      else {
        warning("unknown page-break value: " + value.show)
        ""
      }
    }
  }
  if (cmd.is-empty) then "" else (cmd + "%mdk-720\n")
}

// -----------------------------------------------------------------------------
// Text
// -----------------------------------------------------------------------------

pub fun cssText( body : string, kvs : dict<string>, attrs :attrs, isBlock : bool ) : string {
  if (isBlock) then {
    body
      .onClasses( attrs, ["para-continued","para-block","noindent"], fn(b) {
        cmdconnect("\\noindent",b)
      })
      .onKey( kvs, "text-indent", fn(value,b) {
        cmdconnect( (if (attrs.hasClass("noindent")) then "" else "\\noindent") +
                    (if (value==""||value=="0"||value=="0em") then "" else "\\hspace*" + value.cssWidth.braced)
                  , b )
      })
      .onKey( kvs, "line-height", fn(value,b) {
        b.braceCmd( "\\mdlineheight" + value.cssFontLength.braced )
      })
  }
  else body
}

// // -----------------------------------------------------------------------------
// // Images
// // -----------------------------------------------------------------------------

pub fun cssImageArgs( attrs : attrs ) : (attrs,string) {
  val kvs = attrs.keyvals.dict
  val w   = dimContentWidth(kvs)
  val h   = dimContentHeight(kvs)
  val args0 = "keepaspectratio=true" +
                (if (w.is-empty) then "" else ",width=" + w) +
                (if (h.is-empty) then "" else ",height=" + h)

  val args = args0.onKey( kvs, "zoom", fn(value,b) {
      b + ",scale=" + cssPercentage(value)
    })
    .onKey( kvs, "transform-scale", fn(value,b) {
      b + ",scale=" + cssPercentage(value)
    })
    .onKey( kvs, "transform-rotate", fn(value,b) {
      b + ",angle=" + cssValue(value)
    })
  val attrsx = attrs.removeKeys(["width","height","zoom","transform-rotate","transform-scale"])
  (attrsx,args)
}

// -----------------------------------------------------------------------------
// Lists
// -----------------------------------------------------------------------------

pub fun cssListArgs( attrs : attrs ) : string {
  val kvs = attrs.keyvals.dict
  val args =
    (if (attrs.hasClass("compact")) then "noitemsep,topsep=\\mdcompacttopsep" else "")
    .onKey( kvs, "start", fn(value,b) {
      b + ",start=" + cssValue(value)
    })
    .onKey( kvs, "list-style-type", fn(value0,b) {
      val value = value0.cssValue
      val tag   = if (value=="lower-roman") then "\\roman*"
                  elif (value=="upper-roman") then "\\Roman*"
                  elif (value=="lower-alpha" || value=="lower-latin") then "\\alph*"
                  elif (value=="upper-alpha" || value=="upper-latin") then "\\Alph*"
                  elif (value=="decimal") then "\\arabic*"
                  elif (value=="disc") then "\\textbullet"
                  elif (value=="circle") then "$\\circ$"
                  elif (value=="square") then "$\\blacksquare$"
                  elif (value=="dash") then "{--}"
                  elif (value=="none") then ""
                  else "\\arabic*"
      val fmt = match(kvs["list-format"]) {
                  Nothing -> if (tag.endsWith("*")) then "#1" + (if (attrs.hasClass("list-sep-paren")) then ")" else ".") else "#1"
                  Just(f) -> f
                }
      val label = fmt.replaceAll("#1",tag)
      b + ",label=" + label
    })
  if (args.is-empty) then "" else "[" + args + "]"
}

// -----------------------------------------------------------------------------
// Fonts
// -----------------------------------------------------------------------------

pub fun cssFont( body : string, kvs : dict<string> ) : string {
  body
    .onKey( kvs,"font-weight", fn(value,b) {
      val cmd = if (value=="bold") then "\\bfseries"
                elif (value=="bolder") then "\\bfseries"
                elif (value=="lighter") then "\\lfseries"
                elif (value=="normal") then "\\mdseries"
                else match (value.parseInt) {
                  Just(i) -> if (i < 400) then "\\lfseries"
                             elif (i > 500) then "\\bfseries"
                             else "\\mdseries"
                  Nothing -> ""
                }
      b.braceCmd(cmd)
    })
    .onKey( kvs,"font-size", fn(value,b) {
      val cmd = if (value=="larger") then "\\mdfontsize{\\dimfont{1.2}}"
                elif (value=="smaller") then "\\mdfontsize{\\dimfont{0.8}}"
                elif (value=="xx-small") then "\\tiny"
                elif (value=="x-small") then "\\scriptsize"
                elif (value=="small") then "\\small"
                elif (value=="medium") then "\\normalsize"
                elif (value=="large") then "\\large"
                elif (value=="x-large") then "\\Large"
                elif (value=="xx-large") then "\\LARGE"
                else {
                  "\\mdfontsize" + value.cssFontLength.braced
                }
      b.braceCmd(cmd)
    })
    .onKey( kvs,"font-style", fn(value,b) {
      val cmd = if (value=="italic") then "\\itshape"
                elif (value=="oblique") then "\\slshape"
                elif (value=="normal") then "\\upshape"
                else { warning("illegal font-style value: " + value); "\\upshape" }
      b.braceCmd(cmd)
    })
    .onKey( kvs,"font-variant", fn(value,b) {
      val cmd = if (value=="small-caps") then "\\scshape"
                elif (value=="all-small-caps") then "\\scshape"
                elif (value=="petite-caps") then "\\scshape"
                elif (value=="all-petite-caps") then "\\scshape"
                elif (value=="normal") then "\\upshape"
                else ""
      b.braceCmd(cmd)
    })
    .onKey( kvs,"font-family", fn(value,b) {
      val fonts = value.cssSplitList.filter(bool)
      val (tfonts,xfonts) = fonts.filter(fn(f) { !f.startsWith("html-") }).partition( fn(f) { f.startsWith("tex-") })
      val families = (tfonts + xfonts).map( fn(fam) {
          val spec = if (fam=="serif") then "!rmfamily"
                      elif (fam=="sans-serif") then "!sffamily"
                      elif (fam=="monospace") then "!ttfamily"
                      elif (fam=="cursive") then "!cursive"
                      elif (fam=="fantasy") then "!fantasy"
                      else {
                        if (fam.startsWith("tex-family-")) then {
                          match( fam.find( regex(r"^tex-family[-/](?:([A-Z]\w\w?)[-/])?([\w\-]+)(?:/(l|m|b|bx|sb|c))?(?:/(n|it|sl|bf|sc))?(?:[@/](\d+\.\d+))?$"))) {
                            Just(cap) ->
                              "@" + [cap.groups[1],cap.groups[2],cap.groups[3],cap.groups[4],cap.groups[5]].join("/")
                            Nothing ->
                              fam.substr(11)
                          }
                        }
                        elif (fam.startsWith("tex-cmd-"))
                          then "!" + fam.substr(8)
                          else (if (fam.startsWith("tex-")) then fam.substr(4) else fam)
                      }
          if (spec.contains(',')) then spec.braced else spec
        })
      val cmd = match (families) {
        Cons(spec,Nil) | spec.startsWith("!") -> "\\" + spec.substr(1)
        _ -> "\\mdfontfamily" + families.join(",").braced
      }
      b.braceCmd(cmd)
    })
}