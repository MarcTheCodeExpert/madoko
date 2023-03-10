/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Process definitions: links, footnotes, labels, and counters
module definitions

import compat/path
import compat/regex
import compat/dict
import compat/log
import compat
import common
import options
import attributes
import block
import inline
import formatBlock   // just the formatContext
import formatInline  // just for rxLink
import texParser
import texCommon

// // Parse source into blocks (see "parseBlocks") and
// // process all definitions (see "parseDefinitions").
pub fun parseBody(
                           lineNo : int,
                           src : string,
                           metadata : metadata,
                           tocDepth : int,
                           secBase : int,
                           secDepth : int) : <div, inlineContext, formatContext> (list<block>) 
{
  
  
  parseDefinitions([Div([],(".madoko; line-adjust:0; line:" ++ lineNo.show).parseAttrs("body",src))],
                   metadata,tocDepth,secBase,secDepth)
}

// Visits all blocks and returns a dictionary of links, labels, footnotes,
// a footnote block, and a table-of-contents block.

pub fun parseDefinitions(
                    
                     blocks : list<block>,
                     metadata : metadata,
                     tocDepth : int = 0,
                     secBase : int = 1,
                     secDepth : int = 6 ) : <div, inlineContext, formatContext> (list<block>)
{
  if (getInlineContext().bench)
    then parseDefinitionsBench(blocks)
    else parseDefinitionsFull(blocks,metadata,tocDepth,secBase,secDepth)
}

// Fast version for benchmarking
fun parseDefinitionsBench(
                     
                     blocks : list<block> ) : <div, inlineContext, formatContext> (list<block>)
{
  val links  = mdict()

  blocks.foreach fn(block) {
    match(block) {
      DefLink(id,link) -> {
        links[id] := link
      }
      _ -> ()
    }
  }
  with setLinksTocAndFoot(links.freeze, Empty, dict())
  /*
  setLinks(links.freeze)
  with setFootnoteBlock(Empty)
  with setTocBlocks(dict())*/
  // fcontext( fcontext.inlineContext.copy( links=links.freeze ), dict(), Empty)
  (blocks)
}


// Full version that does attribute processing
fun parseDefinitionsFull(
                     blocks : list<block>,
                     mdata : metadata,
                     tocDepth : int = 0,
                     secBase : int,
                     secDepth : int ): <div, inlineContext, formatContext> (list<block>)
{
  val counters = mdict()
  val nested   = mdict()
  val labels   = mdict()
  val links    = mdict()
  val footnotes = mdict()
  var footnoteCount := 0
  var footnoteItems := Nil
  var tocs := mdict()
  var footnotesAtEnd := True
  var previousPar := ParNone
  with handler
    fun getParInfo previousPar
    fun setParInfo(prev) previousPar := prev

  // initialize defaults from metadata
  //val mdefaultAttrs = mdict()
  //mdata.initializeDefaults(mdefaultAttrs,counters,nested)
  val defaultAttrs : rules = rulesFromMeta(mdata)

  // process attributes
  fun process( attrs : attrs, block : block ) : <div,st<_h>, inlineContext, formatContext, texContext, parInfoEffect> block {
    val bname = block.blockName

    // merge and set default attributes
    val attrsd  = if (!(attrs.defaults)) then attrs
                  else {
                    val attrsy = defaultAttrs.matchRules(bname,attrs)
                    if (attrsy.name != "" && attrsy.label=="") then attrsy( label = "@"++bname ) else attrsy
                  }

    // stop processing if display=none or not the right backend
    if (!attrsd.shouldRender(getFormatContext().fmt)) return Empty

    //adjust counters
    if (bname!="" && attrs.defaults && !attrs.hasClass("clearnum")) counters.adjustCounter(bname,"",nested)

    attrsd.common/counters.foreach fn(cv) {
      val (counter,value) = cv
      counters.adjustCounter(counter,value,nested)
    }

    // expand counters in label
    val cmdata = getInlineContext().metadata
    val attrsx0 = attrsd.expandCounters(counters,cmdata,nested).expand(cmdata)

    // create a nice caption for headings
    val attrsx  = match (block) {
                    Heading(_,txt) -> {
                      val caption = attrsx0.lookupKey("caption",txt)
                      val ecaption = attrsx0.transformText(caption,dict(),getInlineContext().metadata)
                      val xcaption = ecaption.expandKeys(attrsx0.source,attrsx0,dict(),getInlineContext().metadata)
                      val kvs = [("caption",xcaption)] ++ (if (!attrsx0.hasKey("toc").bool) then [] else [("bookmark",xcaption.unformat)])
                      attrsx0.addKeyvals(kvs)
                    }
                    _ -> attrsx0
                  }


    // set label
    if (attrsx.name != "") then {
      val labelCaption = attrsx.hasKey("caption").maybe("",id)
      labels[attrsx.name] := Label(bname,attrsx.label,labelCaption,attrsx)
      match (attrsx.hasKey("cite-label")) {
        Nothing -> ()
        Just(clabel) -> {
          val clabelx = clabel.expandKeys(attrsx.source,attrsx,dict(),getInlineContext().metadata)
          //val info    = attrsx.lookupKey("cite-info",clabel)
          labels["@" ++ attrsx.name] := Label(bname,clabelx,labelCaption,attrsx)
        }
      }
    }

    // paragraph indentation
    val attrsp = match(block) {
      Para -> match (getParInfo()) {
        ParBlock -> attrsx.addClasses(["noindent","para-continued"])
        ParEnded -> attrsx.addClass("indent")
        ParNone  -> attrsx.addClass("noindent")
      }
      _ -> attrsx
    }

    // render
    val rblock = block.setAttrs(attrsp)


    match (attrsp.hasKey("toc")) {
      Nothing -> ()
      Just(value) -> {
        val entry = match(rblock) {
          Heading(d,txt,xs) -> {
            val dp = match(attrsp.hasKey("toc-depth")) {
              Nothing -> d
              Just(s) -> s.parseInt.maybe(d,id)
            }
            (dp,if (xs.hasKey("toc-line").bool) then xs else xs.addKeyval("toc-line",txt))  // note: txt is processed already
          }
          _ -> {
            val depth = attrsp.lookupKey("toc-depth","1").parseInt.maybe(1,id)
            (depth,attrsp)
          }
        }
        //toc --> commented out
        //tocs[toLower(value)] := Cons(entry, tocs[toLower(value)].maybe([],id)) --> no valid function found for []
        ()
      }
    }

    //return
    rblock
  }

  // process a block
  fun parseDefBlock(  block : block ): <div,st<_h>, inlineContext, formatContext> block {
    unsafe-total {
      val attrs : attrs = match(block) {
        DefLink(id,link) -> {
          links[id] := link
          // defining a relative image link causes it to be retained in the online editor
          if (link.href.relative && link.href.extname.mimeFromExt.startsWith("image/")) {
            log("filesRefer",link.href);
            if (link.href.extname == ".eps") log("filesRefer",link.href.changeExt(".png")) // refer to png too for eps images (so both latex and html will work)
          }
          attrsNone
        }
        DefFootnote(id,content) -> {
          footnoteCount := footnoteCount+1
          
          val ncontent = content.mapBlocks(parseDefBlock)
          
          footnotes[id] := Footnote("&fn-" ++ id ++ ";",
                                    fn(){ formatBlocks(ncontent) }, // removed fn(ictx) and fcontext(inlineContext = ictx)
                                    extractCaption(ncontent))
          footnoteItems := Cons(ncontent,footnoteItems)
          attrsNone
        }
        Para(attrs=xs)  -> xs
        Code(_,lang,xs)  -> {
          if (lang=="") then xs else {
            xs.addKeyval("language",lang).addClass("language-" ++ lang)
          }
        }
        Quote(attrs=xs) -> xs
        List(attrs=xs)  -> xs
        Item(attrs=xs)  -> xs
        HLine(attrs=xs) -> xs
        Table(attrs=xs) -> xs
        Div(attrs=xs)   -> xs
        Heading(_,txt,xs) -> xs.generateHeaderId(txt)
        Special(name) -> {
          if (name == "FOOTNOTES") then footnotesAtEnd := False
          attrsNone
        }
        _ -> attrsNone
      }
     
    

      attrs.process(block )
    }
  }

  fun mapBlock( b : block, f ) {
    [b].mapBlocks(f).take(1)
  }

  val newblocks  = blocks.mapBlocks(parseDefBlock)
  val labelsDict = labels.freeze()
  val tocBlocks  = //if (tocDepth <= 0) then Empty else createToc(headings.reverse)
                    (tocs.list.map fn(entry) {
                       (entry.fst,
                          [createToc(entry.fst, entry.snd.reverse,labelsDict,getInlineContext().metadata,defaultAttrs)]
                            .mapBlocks(parseDefBlock))
                     }).dict
  val footnoteBlock = if (is-nil(footnoteItems)) then Empty
                       else Div(Cons(HLine(), footnoteItems.reverse.concat), Attrs(classes=["footnotes","madoko"]))
  val fblocks       = if (!footnotesAtEnd)
                        then newblocks
                        else match(newblocks) { // ensure it appears inside the 'body'
                                Cons(Div(children,attrs),Nil) ->
                                  [Div(children ++ [Special("FOOTNOTES")], attrs)]
                                _ -> newblocks ++ [Special("FOOTNOTES")]
                             }

  val secblocks = fblocks.sections(secInit(secBase=secBase,secMax=secDepth,secDefaults=fn(a){ defaultAttrs.matchRules("section",a) }))
  

  with setLinksLaFootDefBlock(links.freeze, labelsDict, footnotes.freeze, defaultAttrs, footnoteBlock, tocBlocks)
  /*
  with setTocBlocks(tocBlocks)
  with setFootnoteBlock(footnoteBlock)
  with setDefaults(defaultAttrs)
  with setFootnotes(footnotes.freeze)
  with setLinks(links.freeze)
  with setLabels(labelsDict)*/
  /*
  (secblocks,
   fcontext( fcontext.inlineContext.copy( links=links.freeze, labels=labelsDict,
                                          footnotes=footnotes.freeze, defaults=defaultAttrs ),
              tocBlocks, footnoteBlock )  ) */
  secblocks            
}

struct secinfo(
  level   : int,  // current level; start at 1
  secMax  : int,  // max level for sections
  secBase : int,   // level used is max(base,level)
  secDefaults: attrs -> attrs
)

val secInit = Secinfo(1,6,1,id)
val secNone = Secinfo(1,0,1,id)

type parinfo {
  ParNone
  ParEnded
  ParBlock
}

pub effect parInfoEffect
  fun getParInfo(): parinfo
  fun setParInfo(info: parinfo): ()


// <st<h>,div|e> before para block
fun mapBlocks( blocks : list<block>,
                    action : (block) -> <parInfoEffect|e> block  ) : <parInfoEffect|e> list<block> {

  blocks.map fn(block) {
    val nblock = action(block)

    match(nblock) {
      Para(_,xs)  -> (if (xs.hasClass("para-block")) then setParInfo(ParBlock) else setParInfo(ParEnded))
      Div(_,xs)   | nblock.blockName == "figure" || xs.hasClass("float") -> ()  // leave as is
      Source(input,Raw(Just(FmtHtml))) | input.startsWith("<!--") -> () // ignore comments too
      Div(_,xs)   -> (if (xs.hasClass("para-end")) then setParInfo(ParEnded) elif (xs.hasClass("para-block")) then setParInfo(ParBlock) else setParInfo(ParNone))
      Code(_,_,xs)-> (if (xs.hasClass("para-end")) then setParInfo(ParEnded) elif (xs.hasClass("para-block")) then setParInfo(ParBlock) else setParInfo(ParNone))
      DefFootnote -> ()
      _    -> setParInfo(ParNone)
    }
    match(nblock) {
      Div(content,xs) -> {
        val ncontent = match(content.mapBlocks(action)) {
          Cons(Para(txt,attrs),rest) | xs.tight
            -> Cons(Line(txt,False,attrs),rest)
          other -> other
        }
        Div(ncontent,xs)
      }
      Quote(content,xs)    -> Quote(content.mapBlocks(action),xs)
      List(tag,content,xs) -> List(tag,content.mapBlocks(action),xs)
      Item(content,xs)     -> Item(content.mapBlocks(action),xs)
      //DefFootnote(id,content) -> DefFootnote(id,content.mapBlocks(action))
      _ -> nblock
       }
  } 
  
}

// Sets new attributes for a block, and applies conversion to text
fun setAttrs( block : block, xs : attrs ) : <div, inlineContext, formatContext, texContext> block {
  match(block) {
    HLine(_)            -> HLine(xs)
    Para( text )        -> Para(xs.transformText(text,dict(),getInlineContext().metadata),xs)
    Heading(depth,text) -> Heading(depth,xs.transformText(text,dict(),getInlineContext().metadata),xs)
    Table(h,cattrs,cells) -> Table(h,cattrs,cells,xs)
    List(tag,items)     -> List(tag,items,xs)
    Item(content)       -> transformItem(content,xs)
    Div( content  )     -> transformDiv(content, xs )
    Quote( content )    -> Quote(content, xs)
    Code( text, lang)   -> {
      if (lang=="" && !(xs.input.isPre))
        then transformDiv([Source(text)], xs(source=text,elem="pre"))
        else Code(xs.transformText(text,dict(),getInlineContext().metadata),lang,xs)
    }
    _                   -> block
  }
}

fun shouldRender( attrs : attrs, fmt : formatter ) :bool {
  if (attrs.lookupKey("display","") == "none") then False
  else match (attrs.input) {
    Markdown(Just(mfmt)) -> mfmt == fmt
    Raw(Just(mfmt))      -> mfmt == fmt
    _ -> True
  }
}

fun transformItem( blocks : list<block>, attrs: attrs ) : <div> block {
  match(attrs.hasKey("li-label")) {
    Nothing   -> Item(blocks,attrs)
    Just(txt) -> Item([Line("[" ++ txt ++ "]{.li-label}")]++blocks,attrs)
  }
}

fun transformDiv( blocks : list<block>, attrs : attrs)  : <div, inlineContext, formatContext, texContext> block {
  if (attrs.lookupKey("transform","") == "false") return Div(blocks,attrs)
  match(blocks) {                       // needed for internal divs like definition lists
    Nil              -> ()
    Cons(Source,Nil) -> ()              // but with just one Source we should transform (look above for Code transforms)
    _ -> return Div(blocks,attrs)
  }
  val txt = attrs.transformText(attrs.source,dict(),getInlineContext().metadata)
  match(attrs.input) {
    Tex -> {
      Div(txt.parseTex(attrs.name,"",getInlineContext().verbose >= 3)
        .parseBlocks(attrs.lineNo.incLineNo,getFormatContext().lineMap,getInlineContext().metadata),attrs)
    }
    Markdown -> {
      val adjLineNo = match (attrs.hasKey("line-adjust")) {
        Nothing -> attrs.lineNo.incLineNo
        Just(d) -> attrs.lineNo.incLineNo(d.parseInt().maybe(0,id))
      }
      Div(txt.parseBlocks(adjLineNo,getFormatContext().lineMap,getInlineContext().metadata),attrs)
    }
    MathPoly -> {
      val adjLineNo = match (attrs.hasKey("line-adjust")) {
        Nothing -> attrs.lineNo.incLineNo
        Just(d) -> attrs.lineNo.incLineNo(d.parseInt().maybe(0,id))
      }
      val attrsx = attrs.setLineNo(getFormatContext().lineMap,adjLineNo,overwrite=True)
      // keep the source unchanged
      Div([Source(attrs.source,MathPoly,attrsx)], attrs)
    }
    input -> {
      val adjLineNo = match (attrs.hasKey("line-adjust")) {
        Nothing -> attrs.lineNo.incLineNo
        Just(d) -> attrs.lineNo.incLineNo(d.parseInt().maybe(0,id))
      }
      val attrsx = attrs.setLineNo(getFormatContext().lineMap,adjLineNo,overwrite=True)
      Div([Source(txt,input,attrsx)],attrs)
    }
  }
}

fun incLineNo( lineNo : int, inc : int = 1 ) : int {
  if (lineNo > 0) then lineNo + inc else lineNo
}

fun extractCaption( blocks : list<block> ) : string
{
  match(blocks) {
    Nil -> ""
    Cons(block,rest) -> {
      val post = if (rest.is-nil) then "" else "&nl;..."
      match(block) {
        Heading(_,txt) -> txt ++ post
        Line(txt)  -> txt++post
        Para(txt)  -> txt++post
        Code(txt)  -> txt++post
        Quote(bs)  -> extractCaption(bs)
        List(_,bs) -> extractCaption(bs)
        Item(bs)   -> extractCaption(bs)
        Div(bs)    -> extractCaption(bs)
        _          -> extractCaption(rest)
      }
    }
  }
}

/*--------------------------------------------------------
Divide into sections
--------------------------------------------------------*/

fun sections( blocks : list<block>, secinfo : secinfo ) : div list<block>
{
  if (secinfo.level > secinfo.secMax) return blocks
  match (blocks.findHeading(secinfo)) {
    Nothing -> blocks.sectionMap(secinfo)
    Just((pre,h,post)) -> pre.sectionMap(secinfo) ++ h.sectionSpan(post,secinfo)
  }
}

fun sectionMap( blocks : list<block>, secinfo : secinfo ) : div list<block>
{
  if (secinfo.level > secinfo.secMax) return blocks
  blocks.map fn(block) {
    match(block) {
      Div(content,attrs) -> {
        Div(content.sections(secinfo),attrs)
      }
      _ -> block
    }
  }
}

fun sectionSpan( h : block, blocks : list<block>,  secinfo : secinfo  ) : div list<block>
{
  fun createSection(content)
  {
    val lvl = h.headingLevel(secinfo.level)
    val nsecinfo = secinfo(level=lvl+1)
    val ncontent = content.sections(nsecinfo)
    match(h) {
      Heading(d,txt,attrs) -> {
        val (skvs,hkvs) = attrs.keyvals.partition(fn(kv) { kv.fst.startsWith("data-") })
        val (scls,hcls) = attrs.classes.partition(fn(c) { c.startsWith("section-") })
        val secattrs = ".section" ++ d.show ++
                       "; data-section-depth: " ++ d.show ++
                        (if (attrs.name=="") then "" else "; id:'" ++ attrs.name ++ "'")
        val hattrs = if (attrs.name=="") then attrs else attrs(name="heading-" ++ attrs.name)
        val sattrs = secattrs.parseAttrs("section")
        val divattrs = (secinfo.secDefaults)(sattrs.addClasses(scls).addKeyvals(skvs))
        [Div(Cons(Heading(d,txt,hattrs(classes=hcls,keyvals=hkvs)),ncontent),divattrs)]
      }
      _ -> [h].sectionMap(nsecinfo) ++ ncontent
    }
  }

  match(blocks.findHeading(secinfo)) {
    Nothing -> blocks.createSection()
    Just((pre,hdr,post)) -> pre.createSection() ++ hdr.sectionSpan(post,secinfo)
  }
}

fun findHeading( blocks : list<block>, secinfo : secinfo ) : maybe<(list<block>,block,list<block>)>
{
  val lvl = max(secinfo.level,secinfo.secBase)
  val (pre,post) = blocks.span(fn(b) {
    val d = b.headingLevel(lvl+1, lvl)
    (d > lvl) //  || d < secinfo.secMin
  })
  match(post) {
    Cons(hdr,rest) -> Just((pre,hdr,rest))
    Nil -> Nothing
  }
}


fun headingLevel( block : block, default : int, defaultSection : int = default ) : int {
  match(block) {
    Heading(d,_,attrs)  | !(attrs.hasClass("no-section")) -> d
    Div(_,attrs)        | attrs.hasClass("section") -> {
      match(attrs.hasKey("data-depth")) {
        Just(value) -> value.parseInt.maybe(defaultSection,id)
        Nothing     -> defaultSection
      }
    }
    _  -> default
  }
}

//--------------------------------------------------------
// TOC
//--------------------------------------------------------


// Create a table of contents
fun createToc( tocName : string, headings : list<(int,attrs)>, labels : dict<label>, metadata : dict<string>, defaultAttrs : rules ) : div block
{
  val tocClass = if (tocName.is-empty) then ".toc-contents" else ".toc-" ++ tocName
  val attrsText = ".toc; " ++ tocClass
  val source = headings.tocItems(0,labels,metadata,defaultAttrs).tocList(0,defaultAttrs)
  Div([], attrsText.parseAttrs("toc", source))
      //[headings.tocItems(0,labels,metadata,defaultAttrs).tocList(defaultAttrs)],
       //defaultAttrs.matchRules( "toc", attrsNone(elem="toc").addClasses(["toc",tocClass])) )
}

fun tocList( items : string, depth: int, defaultAttrs : rules ) : string {
  if (items.is-empty) then "" else {
    val tildes = string(depth+1,'~') ++ " "
    tildes ++ "Begin TocBlock { .tocblock" ++ (depth+1).show ++ " }\n" ++
      items ++
    tildes ++ "End TocBlock\n"
  }
}

fun tocItems( headings : list<(int,attrs)>, outerDepth : int, labels : dict<label>, metadata : dict<string>, defaultAttrs : rules ) : div string {
  match(headings) {
    Nil -> ""
    Cons(hdr,hdrs) -> {
      val (depth,attrs) = hdr
      if (depth > outerDepth+1) then {
        tocItems(headings,outerDepth+1,labels,metadata,defaultAttrs).tocList(outerDepth,defaultAttrs)
      }
      else {
        val (subs,rest) = hdrs.span( fn(h) { h.fst > depth } )
        val txt = attrs.lookupKey("toc-line","[??]").expandKeys(attrs.source,attrs,labels,metadata)
        val tocline = r"[\/" ++ txt ++ r"\/](#" ++ attrs.name ++ ")"
        val item = "~ Begin TocItem { .tocitem" ++ depth.show ++
                        "; data-toc-target-elem:" ++ attrs.elem ++
                        "; data-toc-target:" ++ attrs.name.show ++
                        "; toctarget:" ++ attrs.name.show ++ // legacy ...
                        "; data-toc-depth:" ++ depth.show ++
                        "; data-toc-line:" ++ txt.show ++ " }\n" ++
                    tocline ++ "\n~ End TocItem\n";
        val subitems = tocItems(subs,depth,labels,metadata,defaultAttrs).tocList(depth,defaultAttrs)
        item ++ subitems ++ tocItems(rest,outerDepth,labels,metadata,defaultAttrs)
      }
    }
  }
}

//--------------------------------------------------------
// counters
//--------------------------------------------------------

// expand counters in label,
fun expandCounters( attrs : attrs, counters : mdict<h,counter>, metadata : dict<string>, nested : mdict<h,list<string>> ) : st<h> attrs {
  val xlab = attrs.label.expandKeys(attrs.source,attrs,dict(),metadata).expandCounter(counters, nested)
  val attrs1 = if (xlab != attrs.label) then attrs(label=xlab) else attrs
  attrs1( keyvals = attrs1.keyvals.map(fn(kv) {
    val (key,value) = kv
    if (key=="start" || key.endsWith("-label")) {
      (key, value.expandKeys(attrs1.source,attrs1,dict(),metadata).expandCounter(counters, nested))
    }
    else kv
  }))
}

// expand the counters in a string
fun expandCounter(lab : string, counters : mdict<h,counter>, nested : mdict<h,list<string>> ) : st<h> string
{
  lab.replaceAll(rxcounter) fn(cap) {
    //trace("expand: " + lab + ": found: " + cap.groups[1] + " = " + counters[cap.groups[1]].string)
    val cname = cap.groups[1].definitionId
    match(counters[cname]) {
      Just(counter) -> counter.show
      Nothing       -> {
        // we create counters on the fly; this is necessary for example when starting a sub-section without a previous section
        val counter = counters.setCounter(cname,Counter(),nested)
        counter.show
      }
    }
  }
}
val rxcounter = regex(r"(?:\\/)?@([\w\-]+)(?:\\/)?")


// adjust a counter
fun adjustCounter(counters : mdict<h,counter>,name : string, value : string, nested : mdict<h,list<string>> ) : st<h> () {
  //trace("increment " + counter + " from " + counters[counter].string + " to " + incrementCounter(counters[counter].string,value))
  counters.setCounter( name, increment(counters[name].maybe(Counter(),id), value), nested )
  counters.resetNestedCounters(name,nested)
}

// increment or set a count to a value
fun increment(counter :counter, xvalue : string) : counter {
  val v = xvalue.toLower
  if (v=="++" || v=="") then counter(value=counter.value + 1)
  elif (v=="--") then counter(value=counter.value - 1)
  else match(v.parseInt) {
    Just(i) -> counter(value=i)
    Nothing -> setcounterstyle(counter,xvalue,v)
  }
}

fun setcounterstyle( counter : counter, xvalue : string, v : string ) : counter
{
  if (v=="upper-alpha" || v=="upper-case" || v=="upper-latin") then counter(counter.value,Uppercase)
  elif (v=="lower-alpha" || v=="lower-case" || v=="lower-latin") then counter(counter.value,Lowercase)
  elif (v=="decimal" || v=="arabic") then counter(counter.value,Arabic())
  elif (v=="decimal0" || v=="arabic0") then counter(counter.value,Arabic0)
  elif (v=="decimal-leading-zero" || v=="arabic-leading-zero") then counter(counter.value,Arabic(2))
  elif (v=="lower-roman") then counter(counter.value,LowerRoman)
  elif (v=="upper-roman") then counter(counter.value,UpperRoman)
  elif (v=="lower-greek") then counter(counter.value,UnicodeBase(945,969))
  elif (v=="upper-greek") then counter(counter.value,UnicodeBase(913,937))
  elif (v=="cjk-decimal") then counter(counter.value,Decimal(cjkDecimals))
  elif (v=="cjk-decimal0") then counter(counter.value,Decimal0(cjkDecimals))
  elif (v=="symbolic") then counter(counter.value,EntityList(symbolDecimal))
  elif (v=="circled-decimal") then counter(counter.value,UnicodeBase(9312,9321))
  elif (v=="disc") then counter(counter.value,Entity("&bull;"))
  elif (v=="circle") then counter(counter.value,Entity("&circ;"))
  elif (v=="square") then counter(counter.value,Entity("&bbox;"))
  elif (v=="dash" || v=="-") then counter(counter.value,Entity("&ndash;"))
  elif (v=="none") then counter(counter.value,Entity(""))
  elif (v.contains(rxUnicodeBase)) then {
    match(v.find(rxUnicodeBase)) {
      Nothing   -> counter(counter.value,Arabic())
      Just(cap) -> {
        val start = cap.groups[1].parseInt.maybe(49,id)
        val end   = cap.groups[2].parseInt.maybe(0,id)
        counter(counter.value,UnicodeBase(start,if (end < start) then start+9 else end))
      }
    }
  }
  elif (v.contains(rxEntityList)) then {
    match(v.find(rxEntityList)) {
      Nothing   -> counter(counter.value,Arabic())
      Just(cap) -> {
        val items = cap.groups[1].split(regex(r" *, *")).list
        counter(counter.value,EntityList(items))
      }
    }
  }
  else match(xvalue.list) {
    Cons(d,Nil) | d >= 'a' && d <= 'z' -> Counter((d -'a').int+1,Lowercase)
    Cons(d,Nil) | d >= 'A' && d <= 'Z' -> Counter((d -'A').int+1,Uppercase)
    _ -> {
      warning( "unrecognized counter value: " ++ xvalue)
      counter
    }
  }
}

val rxUnicodeBase = regex(r"^unicode-base\((\d+)(?: *, *(\d+))?\)$")
val rxEntityList = regex(r"^entity-list\(([^\s,\)]+(?: *, *[^\s,\)]+)*)\)")

// reset lower counters (ie. for h1-h2, reset h1-h2-h3, h1-h2-h3-h4, ...)
fun resetNestedCounters(counters : mdict<h,counter>, counter : string, nested : mdict<h,list<string>> ) : st<h> ()
{
  match(nested[counter]) {
    Nothing -> ()
    Just(cnts) -> {
      cnts.foreach fn(cnt) {
        match(counters[cnt]) {
          Nothing -> ()
          Just(c) -> counters[cnt] := c(value=0)
        }
      }
    }
  }
}

fun setCounter( counters : mdict<h,counter>, name : string, counter : counter, nested : mdict<h,list<string>> ) : st<h> counter
{
  if (counters[name].isNothing) {
    nested.initializeCounter( name )
  }
  counters[name] := counter;
  counter
}

fun initializeCounter( nested : mdict<h,list<string>>, name : string ) : st<h> ()
{
  val prefixes = name.split("-").init
  prefixes.foreach-indexed fn(i,_) {
    val pre = prefixes.take(i+1).join("-")
    nested[pre] := Cons(name, nested[pre].maybe([],id))
    //trace("nested: " + pre + ": " + nested[pre].maybe([],id).join(","))
  }
}



//--------------------------------------------------------
// counter type
//--------------------------------------------------------

// The display format of a counter
type format {
  Arabic0     // start at 0
  Arabic( width : int = 0 )
  Decimal0( digits : list<int> )
  Decimal( digits : list<int> )
  Lowercase
  Uppercase
  LowerRoman
  UpperRoman
  EntityList( items : list<string> )
  UnicodeBase( start : int, end : int )
  Entity( item : string )
}

struct counter( value :int = 0, format :format = Arabic()  )

fun show( counter : counter ) : string {
  match(counter.format) {
    Arabic(width)  -> counter.value.show.align(width,'0')
    Lowercase  -> counter.value.showUnicodeBase('a'.int, 'z'.int, showAsChar)
    Uppercase  -> counter.value.showUnicodeBase('A'.int, 'Z'.int, showAsChar)
    LowerRoman -> counter.value.showRoman.toLower
    UpperRoman -> counter.value.showRoman
    Arabic0    -> (counter.value - 1).show
    Decimal(digits)  -> counter.value.showDigits(digits)
    Decimal0(digits) -> (counter.value - 1).showDigits(digits)
    EntityList(l)    -> counter.value.showFromList(l)
    UnicodeBase(b,e) -> counter.value.showUnicodeBase(b,e)
    Entity(item)     -> item
    // _ -> counter.value.show
  }
}

val cjkDecimals = [0x3007,0x4E00,0x4E8C,0x4E09,0x56DB,0x4E94,0x516D,0x4E03,0x516B,0x4E5D,0x5341]

val symbolDecimal = ["&ast;","&dagger;","&Dagger;","&sect;","&para;"]


fun showEntity( i : int ) : string {
  if (i >= 32 && i <= 127)
   then string(1,i.char)
   else "&#" ++ i.show ++ ";"
}

fun showAsChar( i : int ) : string {
  string(1,i.char)
}

fun showDigits( i : int, digits : list<int> ) : string {
  val s = i.show
  s.list.map( fn(c) {
    val d = (c - '0').int
    match( digits.drop(d) ) {
      Cons(code) -> showEntity(code)
      _          -> string(1,c)
    }
  }).join
}

fun showUnicodeBase( value : int, start : int, end : int = start + 9, showCode : (int) -> string = showEntity ) : string {
  if (value <= 0) return "?"
  val base = (end - start) + 1
  val code = (start + ((value - 1) % base))
  val entity = showEntity(code)
  replicate(entity, ((value - 1) / base) + 1).join()
}

fun showFromList( value : int, items : list<string> ) : string {
  if (value <= 0) return "?"
  val base = items.length
  val item = match(items.drop( (value - 1) % base )) {
    Cons(s) -> s
    Nil     -> "?"
  }
  replicate(item, ((value - 1) / base) + 1).join()
}

fun showRoman( value : int ) {
  val huns = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"]
  val tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"]
  val ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"]

  if (value==0) then "0"
  else (if (value < 0) then "-" else "") ++
       huns[(value%1000)/100].mbstring ++
       tens[(value%100)/10].mbstring ++
       ones[(value%10)].mbstring
}


//--------------------------------------------------------
// Unformat
//--------------------------------------------------------

fun unformat( s : string ) : string {
  s.replaceAll(rxLink, fn(cap) { cap.groups[1].replaceAll(rxLink,"$1") } ).trim
}

//--------------------------------------------------------
// Block names
//--------------------------------------------------------
fun blockName(block : block) : string
{
  match(block) {
    Para  -> "p"
    Code  -> "pre"
    Quote -> "blockquote"
    List(tag) -> tag
    Item  -> "li"
    HLine -> "hr"
    Table -> "table"
    Heading(depth=d) -> "h" ++ d.show
    Div(attrs=xs) -> xs.elementName("div")
    _     -> ""
  }
}
