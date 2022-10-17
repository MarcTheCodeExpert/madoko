module includes 

import compat/string
import compat/log
import compat/regex
import compat/path
import compat/dict
import compat
import common
import options
import block    // for lineMap
import storage

struct snippet(
  fileName : string,
  startLine: int,
  content  : string
)
pub val options_out = Options()
val includes  = retMdictIncl()
val snippets  = retMdictSnip()
val outName_out = ""

fun retMdictSnip() {
  unsafe-total{
    val md: mdict<global,snippet> = mdict()
    md
  }
  
}

fun retMdictIncl() {
  unsafe-total{
    val md: mdict<global,string> = mdict()
    md
  }
}

pub fun include( text : string, fast : bool, inName : string, outName : string, dirs : list<string>, options : options, action : (string,lineMap) -> <io|e> a ) : <io|e> a {
  if (fast) then return action(text,End) 

  val includes : mdict<global,string> = mdict()
  val snippets : mdict<global,snippet> = mdict()
  

  val snippetStart = text.find(rxFragStart).maybe(options.extractStart,fn(cap) { cap.groups[1].trim })
  val snippetEnd   = text.find(rxFragEnd).maybe(options.extractEnd,fn(cap) { cap.groups[1].trim })

  val rxSnippetStart = regex(snippetStart, multiline=True, ignoreCase=True)
  val rxSnippetEnd = regex(snippetEnd, multiline=True, ignoreCase=True)
  
  //trace("snippet start: " + rxSnippetStart.source)
  //trace("snippet end: " + rxSnippetEnd.source)
  fun warning( msg, lineNo = 0, fileName = "") {
    options.printErr( "warning: " + 
             (if (fileName != "" || lineNo > 0)
               then fileName + (if (lineNo > 0) then ":" + lineNo.show else "") + ": "
               else "") +
             msg )
  }

  fun saveSnippet( name, fname, lineNo, content) : io () {
    if (snippets[name].is-just) {
      warning( "snippet " + name + " is redefined", lineNo, fname )
    }
    snippets[name] := Snippet(fname, lineNo, content)
  }

  fun extractSnippet( name, content, fname, lineNo, acc = [] ) : io () {
    match(content) {
      Nil -> {
        warning("unclosed snippet: " + name, lineNo, fname )
        saveSnippet(name,fname,lineNo,acc.reverse.join("\n"))
      }
      Cons(line,lines) -> {
        match(line.find(rxSnippetEnd)) {
          Nothing -> match(line.find(rxSnippetStart)) {
            Nothing -> {
              // add line to snippet and continue
              extractSnippet( name, lines, fname, lineNo+1,  Cons(line,acc))
            }
            Just -> {
              // other snippet start, ignore this line
              extractSnippet( name, lines, fname, lineNo+1, Cons("",acc) )
            }
          }
          Just(cap) -> {
            val cname = cap.groups[1].toLower()
            if (name == cname) {
              // end of snippet, done.
              saveSnippet(name,fname,lineNo,acc.reverse.join("\n"))
            }
            else {
              // end of another snippet, ignore it
              extractSnippet( name, lines, fname, lineNo+1, Cons("",acc) )
            }
          }
        }
      }
    }
  }

  fun findSnippets( content : list<string>, fname : string, lineNo : int = 1) : io () {
    match(content) {
      Nil -> ()
      Cons(line,lines) -> {
        //trace("find snippet: " + line)
        match(line.find(rxSnippetStart)) {
          Nothing -> findSnippets( lines, fname, lineNo+1 )
          Just(cap) -> {
            val name = cap.groups[1].toLower()
            extractSnippet( name, lines, fname, lineNo+1 )
            findSnippets( lines, fname, lineNo+1 )
          }
        }
      }
    }
  }

  fun readInclude( fname : string, srcname, lineNo, included : list<string> ) : io (string,string) 
  {
    if (fname=="") then {
      ("","\n")  // happens for snippet only includes
    }
    elif (fname.startsWith("BIB=")) then {
      val auxStem = fname.substr(4)
      val fileName= outName.noext + "-bib" + (if (auxStem=="") then "" else "-" + auxStem) + ".bbl.mdk"      
      val bbl     = match (includes[fileName]) {
                      Just(s) -> s
                      Nothing -> {
                        val s = readTextFileDef( fileName, "", True)  
                        includes[fileName] := s
                        s
                      }
                    }
      val content = ("~ Begin Bibl { id: \"" + auxStem + "\"; bib-id: \"" + auxStem + "\"; bbl-file: \"" + fileName + "\" }\n" + 
                      (if (bbl=="") then "~ Begin Bibliography { .bib-numeric; caption:\"0\"}\n~ End Bibliography\n" 
                                    else bbl) + 
                      "\n~ End Bibl\n")
      (fileName,content)
    }
    else {
      // avoid including recursively
      val searchName = if (fname.extname == "") then fname + ".mdk" else fname;
      val searchDirs = if (inName.basename != searchName) then dirs 
                        else dirs.filter( fn(dir) { dir != inName.dirname });
      // .. and search
      match (trySearchReadTextFile(fname,searchDirs,".mdk")) {
        Nothing -> {
          val fileName = if (extname(fname)=="") then fname + ".mdk" else fname
          log("files", fileName)
          warning("unable to read include: " + fname, lineNo, srcname )
          (fileName,"")
        }
        Just((fileName,content)) -> {          
          if (included.contains(fileName)) then {
            warning("recursive include: " + fileName.show)
            (fileName,"")
          }
          else {
            match(includes[fileName]) {
              Just -> ()
              Nothing -> {
                includes[fileName] := content
                content.lines.findSnippets(fileName) // record snippets only once
              }
            }
            (fileName,content)
          }
        } 
      }
    }
  }

  

  val rxRange = regex(r"^(\d+)(?:--?(\d+))?$")
  val rxSnippetName = regex(r"^(\w+)$")
  fun findRange( incfile: string, incline: string, range : string, content : string, fname : string, lineNo : int ) : io (string,int,string)
  {
    if (range=="") return (incfile, 1,content)
    match(range.find(rxRange)) {
      Nothing -> {
        match(range.find(rxSnippetName)) {
          Nothing -> {
            warning( "invalid include range: " + incline, lineNo, fname )
            (incfile,1,content)
          }
          Just(cap) -> {
            // snippet name
            match(snippets[cap.groups[1].toLower()]) {
              Nothing -> {
                warning( "unknown snippet name: " + cap.groups[1], lineNo, fname )
                (incfile,1,content)
              }
              Just(Snippet(fileName,start,fragment)) -> {
                (fileName,start,fragment)
              }
            }
          }
        }
      }
      Just(cap) -> {
        val start = cap.groups[1].parseInt().maybe(1,id)
        if (start<=0) return (incfile,0,"")
        val end   = max(start - 1,cap.groups[2].parseIntDefault(start + 1000000))
        val fragment = content.lines.drop(start - 1).take((end - start) + 1).join("\n")
        //trace("include: " + start.show + "," + end.show + ":\n" + fragment)
        (incfile,start,fragment)
      }
    }
  }

  

  fun processIncludeLine( fname : string, line : string, included : list<string>, lineMap, lineNo : int, extra : int = 0 ) : io (int,lineMap,string)
  {
    val mbincname = match (line.find(rxInclude)) {
      Just(cap) -> Just((cap.matched,cap.groups.firstMatched(1,3),cap.groups[4]))
      Nothing -> match(line.find(rxBib)) {
        Just(cap) -> Just((cap.matched,"BIB=" + cap.groups.firstMatched(1,3), ""))
        Nothing   -> Nothing 
      }
    }
    match(mbincname) { 
      Nothing -> (line,lineMap,1)
      Just((matched,incname,range)) -> {
        val (fileName0,content) = readInclude(incname,fname,lineNo,included)
        val (fileName,istart,fragment) = fileName0.findRange(matched, range, content, fname, lineNo);
        if (istart<=0) 
          then ("",lineMap,1)
          else {
          val (icontent,lmap,lcount) = fn( txt: string = fragment, fname: string = fileName, included: list<string> = Cons(fileName,included), start: int = istart, prelude: string = "" ) : io (int,lineMap,string)
            if (start<=0) return (0,End,"")
            var lineNo := start - 1
            var lineCount := 0
            var lineMap := End
            val preludeTxt = 
              if (prelude != "") {
                val (icontent,lmap,lcount) = processIncludeLine(fname,"[INCLUDE=\"" + prelude + "\"]",included,lineMap,lineNo,1)
                lineCount := lineCount + lcount 
                lineMap   := lmap
                ((if (options.xmp) then "<xmp>" + icontent + "</xmp>" else icontent) + "\n")
              }
              else ""
              val ls = txt.lines.map fn(line) {
                lineNo := lineNo + 1;
                //lineCount := lineCount + 1;
                val (icontent,lmap,lcount) = processIncludeLine(fname,line,included,lineMap,lineNo)
                lineCount := lineCount + lcount
                lineMap   := lmap
                
                /*
                match (line.find(rxInclude)) {
                  Nothing -> line
                  Just(cap) -> {
                    val incname = cap.groups.firstMatched(1,4)
                    val (fileName0,content) = readInclude(incname,fname,lineNo)
                    val (fileName,istart,fragment)  = fileName0.findRange(cap.matched, cap.groups[5], content, fname, lineNo);
                    if (istart<=0) then "" else {
                      val (lcount,lmap,icontent) = processIncludesRec( fragment, fileName, istart )
                      lineMap := Include(lineNo,istart,lcount,fileName,lmap,lineMap)
                      lineCount := lineCount + lcount - 1
                      //trace("include: " + lineNo.show + ", " + lcount.show + ", " + lineCount.show)
                      icontent
                    }
                  }
                }
                */
                icontent      
              }
          (lineCount, lineMap.reverse, preludeTxt + ls.unlines)
          }
          val lineMapNew = Include(lineNo,istart,lcount+extra,fileName,lmap,lineMap)
          //lineCount := lineCount + lcount - 1
          //trace("include: " + lineNo.show + ", " + lcount.show + ", " + lineCount.show)
          (lcount, lineMapNew, icontent)
          }
          
        }
      }
    }

  fun processIncludes( txt : string, fname : string ) : io (int,lineMap,string)
  {
    val prelude = match(txt.findAll(rxPrelude).list.reverse) { // find last prelude definition
      Cons(cap) -> {
        val value = cap.groups[1]
        val lvalue = value.toLower()
        if (lvalue=="none" || lvalue=="clear" || lvalue=="false") then "" else value
      }
      Nil -> options.prelude
    }
    //processIncludesRec(txt,fname,[fname],1,prelude)
    val (lineCount, lineMap_final, preludeTxt_final) = fn(included: list<string> = [fname], start: int = 1) : io (int,lineMap,string) {
      if (start<=0) return (0,End,"")
      var lineNo := start - 1
      var lineCount := 0
      var lineMap := End
      val preludeTxt = 
        if (prelude != "") {
          val (icontent,lmap,lcount) = processIncludeLine(fname,"[INCLUDE=\"" + prelude + "\"]",included,lineMap,lineNo,1)
          lineCount := lineCount + lcount 
          lineMap   := lmap
          ((if (options.xmp) then "<xmp>" + icontent + "</xmp>" else icontent) + "\n")
        }
        else ""
      val ls = txt.lines.map fn(line) {
        lineNo := lineNo + 1;
        //lineCount := lineCount + 1;
        val (icontent,lmap,lcount) = processIncludeLine(fname,line,included,lineMap,lineNo)
        lineCount := lineCount + lcount
        lineMap   := lmap
        icontent
        /*
        match (line.find(rxInclude)) {
          Nothing -> line
          Just(cap) -> {
            val incname = cap.groups.firstMatched(1,4)
            val (fileName0,content) = readInclude(incname,fname,lineNo)
            val (fileName,istart,fragment)  = fileName0.findRange(cap.matched, cap.groups[5], content, fname, lineNo);
            if (istart<=0) then "" else {
              val (lcount,lmap,icontent) = processIncludesRec( fragment, fileName, istart )
              lineMap := Include(lineNo,istart,lcount,fileName,lmap,lineMap)
              lineCount := lineCount + lcount - 1
              //trace("include: " + lineNo.show + ", " + lcount.show + ", " + lineCount.show)
              icontent
            }
          }
        }
        */
      }

    (lineCount, lineMap.reverse, preludeTxt + ls.unlines)
    }
    (lineCount, lineMap_final, preludeTxt_final)
  
  }
  

  fun processIncludesRec( txt : string, fname : string, included : list<string>, start : int = 1, prelude : string = ""  ) : io (int,lineMap,string)
  {
    if (start<=0) return (0,End,"")
    var lineNo := start - 1
    var lineCount := 0
    var lineMap := End
    val preludeTxt = 
      if (prelude != "") {
        val (icontent,lmap,lcount) = processIncludeLine(fname,"[INCLUDE=\"" + prelude + "\"]",included,lineMap,lineNo,1)
        lineCount := lineCount + lcount 
        lineMap   := lmap
        ((if (options.xmp) then "<xmp>" + icontent + "</xmp>" else icontent) + "\n")
      }
      else ""
    val ls = txt.lines.map fn(line) {
      lineNo := lineNo + 1;
      //lineCount := lineCount + 1;
      val (icontent,lmap,lcount) = processIncludeLine(fname,line,included,lineMap,lineNo)
      lineCount := lineCount + lcount
      lineMap   := lmap
      icontent
      /*
      match (line.find(rxInclude)) {
        Nothing -> line
        Just(cap) -> {
          val incname = cap.groups.firstMatched(1,4)
          val (fileName0,content) = readInclude(incname,fname,lineNo)
          val (fileName,istart,fragment)  = fileName0.findRange(cap.matched, cap.groups[5], content, fname, lineNo);
          if (istart<=0) then "" else {
            val (lcount,lmap,icontent) = processIncludesRec( fragment, fileName, istart )
            lineMap := Include(lineNo,istart,lcount,fileName,lmap,lineMap)
            lineCount := lineCount + lcount - 1
            //trace("include: " + lineNo.show + ", " + lcount.show + ", " + lineCount.show)
            icontent
          }
        }
      }
      */
    }

    (lineCount, lineMap.reverse, preludeTxt + ls.unlines)
  }


  val (_lcount,lmap,content) = processIncludes(text,inName)
  action(content,lmap)
}







val rxInclude = regex(r#"^ {0,3}\[(?:INCLUDE *(?:= *(?:""([^""\n]+)""|'([^'\n]+)'|([^\s:=\]]+)) *)?(?:[:] *([\w\-]+))?)\] *(?=\n|$)"#,multiline=True)
val rxBib     = regex(r#"^ {0,3}\[BIB *(?:= *(?:""([^""\n]+)""|'([^'\n]+)'|([^\s:=\]]+)) *)?\] *(?=\n|$)"#,multiline=True)
val rxPrelude = regex(r"^ {0,3}[Pp]relude[ \t]*:[ \t]*(\S*)[ \t\r]*(\n|$)",multiline=True)

val rxFragStart = regex(r"^Fragment *Start *: *(.+)$", ignoreCase=True, multiline=True)
val rxFragEnd   = regex(r"^Fragment *End *: *(.+)$", ignoreCase=True, multiline=True)

pub fun searchReadTextFileDef( fname : string, def : string, dirs : list<string>, ext : string = "", required : bool = True ) : io string {
  match(trySearchReadTextFile(fname,dirs,ext,required)) {
    Nothing -> def
    Just((_,content)) -> content
  } 
}

pub fun trySearchReadTextFile( fname : string, dirs : list<string>, ext : string = "", required : bool = True  ) : io maybe<(string,string)> {
  fun nothing() {
    if (required) log("files",fname.defaultExt(ext));
    Nothing
  }
  match(searchFileSync(dirs,fname)) {
    Nothing -> {
      if (ext=="" || fname.extname != "") then nothing() else {
        match (searchFileSync(dirs,fname.changeExt(ext))) {
          Nothing -> nothing()
          Just(fullname) -> tryReadTextFile(fullname,required).maybe.maybe(Nothing,fn(txt){ Just((fullname,txt)) })
        }
      }
    } 
    Just(fullname) -> tryReadTextFile(fullname,required).maybe.maybe(Nothing,fn(txt){ Just((fullname,txt)) })
  }
}
