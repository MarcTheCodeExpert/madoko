/*---------------------------------------------------------------------------
  Copyright 2013 Microsoft Corporation.
 
  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the file "license.txt" at the root of this distribution.
---------------------------------------------------------------------------*/

// Parsing and formatting of html entities (for TeX output)
pub module entity

import common  // warning

import compat
import compat/log
import compat/regex
import stringcompat



struct entity(
  ename : string,
  ecode : int,
  ecmd  : string,
  emath  : bool = False
)

// Convert an html entity to a LaTeX command.
// Takes as input the string between the `&` and `;` of a HTML entity.
pub fun entityToTex( entity : string ) : string 
{
  if (entity.startsWith("#")) {
    val num = if (entity.startsWith("#x") || entity.startsWith("#X")) 
           then "0" + entity.substr(1)
           else entity.substr(1)
    val i = num.parse-int.maybe(~1,id)
    match (entities.find(fn(e) { e.ecode == i })) {
      Nothing -> {
        if (i > 127) warning( "unknown unicode point: &#" + num + ";", "texwarning")
        r"\mdUnicode{" + i.show + "}"
      }
      Just(e) -> e.entityCmd
    }       
  }
  else match(entities.find(fn(e) { e.ename == entity })) {
    Nothing -> {
      warning( "unknown entity: &" + entity + ";", "texwarning")
      r"\mdEntity{" + entity + "}"
    }
    Just(e) -> e.entityCmd
  }
}

// Convert an html entity to a unicode number
pub fun entityToNum( entity : string ) : maybe<int> 
{
  if (entity.startsWith("#")) {
    val num = if (entity.startsWith("#x") || entity.startsWith("#X")) 
           then "0" + entity.substr(1)
           else entity.substr(1)
    num.parse-int
  }
  else match(entities.find(fn(e) { e.ename == entity })) {
    Nothing -> Nothing
    Just(e) -> Just(e.ecode)
  }
}

pub fun entityNameAsNum( name : string ) : maybe<string> 
{
  if (name=="nl") then Just("\n")
  elif (name=="br") then Just("\\\n")
  elif (name=="null") then Just("")
  else match(entities.find(fn(e) { e.ename == name })) {
    Nothing -> Nothing
    Just(e) -> Just("&#" + e.ecode.show + ";")
  }  
}

pub fun entityNameToNum( name : string ) : string
{
  match(name.entityNameAsNum) {
    Just(e) -> e
    Nothing -> {
      warning( "unknown entity name: &" + name + ";")
      r"&" + name + ";"
    }
  }
}

fun entityCmd( entity : entity ) : string {
  val cmd = entity.ecmd
  if (entity.emath) 
   then r"\ensuremath{" + cmd + "}"
  elif (cmd.contains(rxSafeEnd))
   then cmd
   else cmd + "{}"
}
val rxSafeEnd = regex(r"[^A-Za-z@]$")

// Translate a TeX command to an entity (or empty if unknown)
pub fun texCmdToEntity( cmd : string ) : string {
  match (entities.find( fn(e) { e.ecmd == cmd } )) {
    Nothing -> ""
    Just(e) -> "&" + e.ename + ";"
  }
}

// added #
pub fun logEntities() {
  log("entities", r#"{""name"": ""nl"", ""value"":""&nl;"", ""code"":10}"# )
  log("entities", r#"{""name"": ""br"", ""value"":""&br;""}"#)
  log("entities", r#"{""name"": ""null"", ""value"":""&null;""}"# )
  log("entities", r#"{""name"": ""&"", ""value"":""&&;"", ""code"":38}"# )
  entities.foreach fn(ent) {
    log("entities", "{\"name\":" + ent.ename.json + ",\"value\":" + ("&" + ent.ename + ";").json + ",\"code\":" + ent.ecode.show + "}" );
  }
}

// The entity table
val entities : list<entity> = [
  // named entities 

  // added # in 125, 126, 184,186,194,198,205,212,220, 227, 231, 238, 244, 247
  Entity("quot", 34, r#""""#, False),
  Entity("dquot", 34, r#""""#, False),  // legacy, use 'quot'
  Entity("hash", 35, r"\#", False),
  Entity("dollar", 36, r"\$", False),
  Entity("perc", 37, r"\%", False),
  Entity("amp", 38, r"\&", False),
  Entity("apos", 39, "'", False),  
  Entity("lpar", 40, "(", False),  
  Entity("rpar", 41, ")", False),  
  Entity("ast", 42, "*", False),  
  Entity("plus", 43, "+", False),  
  Entity("fslash", 47, "/", False),  
  Entity("lt", 60, r"\textless", False),
  Entity("gt", 62, r"\textgreater", False),
  Entity("bslash", 92,   r"\textbackslash", False),
  Entity("backslash", 92,   r"\textbackslash", False),
  Entity("caret", 94,   r"\textasciicircum", False),
  Entity("underscore", 95,   r"\_", False),
  Entity("grave", 96,   r"{`}", False),
  Entity("lcurly", 123,  r"\{", False),
  Entity("bar", 124,  r"\textbar", False),
  Entity("rcurly", 125,  r"\}", False),
  Entity("tilde", 126,  r"\textasciitilde", False),

  Entity("nbsp", 160, r"~", False),
  Entity("iexcl", 161, r"\textexclamdown", False),
  Entity("cent", 162, r"\textcent", False),
  Entity("pound", 163, r"\pounds", False),
  Entity("curren", 164, r"\textcurrency", False),
  Entity("yen", 165, r"\textyen", False),
  Entity("brvbar", 166, r"\textbrokenbar", False),
  Entity("sect", 167, r"\S", False),
  Entity("uml", 168, r"\textasciidieresis", False),
  Entity("copy", 169, r"\copyright", False),
  Entity("ordf", 170, r"\textordfeminine", False),
  Entity("laquo", 171, r"\guillemotleft", False),
  Entity("not", 172, r"\textlnot", False),
  Entity("shy", 173, r"\-", False),
  Entity("reg", 174, r"\circledR", False),
  Entity("macr", 175, r"\textasciimacron", False),
  Entity("deg", 176, r"\textdegree", False),
  Entity("plusmn", 177, r"\textpm", False),
  Entity("sup2", 178, r"\texttwosuperior", False),
  Entity("sup3", 179, r"\textthreesuperior", False),
  Entity("acute", 180, r"\textasciiacute", False),
  Entity("micro", 181, r"\textmu", False),
  Entity("para", 182, r"\P", False),
  Entity("middot", 183, r"\textperiodcentered", False),
  Entity("cedil", 184, r"\c{}", False),
  Entity("sup1", 185, r"\textonesuperior", False),
  Entity("ordm", 186, r"\textordmasculine", False),
  Entity("raquo", 187, r"\guillemotright", False),
  Entity("frac14", 188, r"\textonequarter", False),
  Entity("frac12", 189, r"\textonehalf", False),
  Entity("frac34", 190, r"\textthreequarters", False),
  Entity("iquest", 191, r"\textquestiondown", False),
  Entity("Agrave", 192, r"\`{A}", False), // accent
  Entity("Aacute", 193, r"\'{A}", False), // accent
  // added # in 184,186,194,198,205
  Entity("Acirc", 194,  r#"\^{A}"#, False), // accent
  Entity("Atilde", 195, r"\~{A}", False), // accent
  Entity("Auml", 196,   r#"\""{A}"#, False), // accent
  Entity("Aring", 197,  r"\r{A}", False), // accent
  Entity("AElig", 198, r"\AE", False),
  Entity("Ccedil", 199, r"\c{C}", False), // accent
  Entity("Egrave", 200, r"\`{E}", False), // accent
  Entity("Eacute", 201, r"\'{E}", False), // accent
  Entity("Ecirc", 202, r"\^{E}", False), // accent
  Entity("Euml", 203, r#"\""{E}"#, False), // accent
  Entity("Igrave", 204, r"\`{I}", False), // accent
  Entity("Iacute", 205, r"\'{I}", False), // accent
  Entity("Icirc", 206, r"\c{I}", False), // accent
  Entity("Iuml", 207, r#"\""{I}"#, False), // accent
  Entity("ETH", 208, r"\DH", False),
  Entity("Ntilde", 209, r"\~{N}", False), // accent
  Entity("Ograve", 210, r"\`{O}", False), // accent
  Entity("Oacute", 211, r"\'{O}", False), // accent
  Entity("Ocirc", 212, r"\^{O}", False), // accent
  Entity("Otilde", 213, r"\~{O}", False), // accent
  Entity("Ouml", 214, r#"\""{O}"#, False), // accent
  Entity("times", 215, r"\times", True),
  Entity("Oslash", 216, r"\O", False),
  Entity("Ugrave", 217, r"\`{U}", False), // accent
  Entity("Uacute", 218, r"\'{U}", False), // accent
  Entity("Ucirc", 219, r"\^{U}", False), // accent
  // added # in 212,220, 227, 231, 238, 244, 247
  Entity("Uuml", 220, r#"\""{U}"#, False), // accent
  Entity("Yacute", 221, r"\'{Y}", False), // accent
  Entity("THORN", 222, r"\TH", False),
  Entity("szlig", 223, r"\ss", False),
  Entity("agrave", 224, r"\`{a}", False), // accent
  Entity("aacute", 225, r"\'{a}", False), // accent
  Entity("acirc", 226, r"\^{a}", False), // accent
  Entity("atilde", 227, r"\~{a}", False), // accent
  Entity("auml", 228, r#"\""{a}"#, False), // accent
  Entity("aring", 229, r"\r{a}", False), // accent
  Entity("aelig", 230, r"\ae", False),
  Entity("ccedil", 231, r"\c{c}", False), // accent
  Entity("egrave", 232, r"\`{e}", False), // accent
  Entity("eacute", 233, r"\'{e}", False), // accent
  Entity("ecirc", 234, r"\^{e}", False), // accent
  Entity("euml", 235, r#"\""{e}"#, False), // accent
  Entity("igrave", 236, r"\`{\i}", False), // accent
  Entity("iacute", 237, r"\'{\i}", False), // accent
  Entity("icirc", 238, r"\^{\i}", False), // accent
  Entity("iuml", 239, r#"\""{\i}"#, False), // accent
  Entity("eth", 240, r"\dh", False),
  Entity("ntilde", 241, r"\~{n}", False), // accent
  Entity("ograve", 242, r"\`{o}", False), // accent
  Entity("oacute", 243, r"\'{o}", False), // accent
  Entity("ocirc", 244, r"\^{o}", False), // accent
  Entity("otilde", 245, r"\~{o}", False), // accent
  Entity("ouml", 246, r#"\""{o}"#, False), // accent
  Entity("divide", 247, r"\div", True),
  Entity("oslash", 248, r"\o", False),
  Entity("ugrave", 249, r"\`{u}", False), // accent
  Entity("uacute", 250, r"\'{u}", False), // accent
  Entity("ucirc", 251, r"\^{u}", False), // accent
  Entity("uuml", 252, r#"\""{u}"#, False), // accent
  Entity("yacute", 253, r"\'{y}", False), // accent
  Entity("thorn", 254, r"\th", False),
  Entity("yuml", 255, r#"\""{y}"#, False), // accent
  
  /* extended latin */
  Entity("Amacron", 256, r"\={A}", False),
  Entity("amacron", 257, r"\={a}", False),
  Entity("Abreve", 258, r"\u{A}", False),
  Entity("abreve", 259, r"\u{a}", False),
  Entity("Aogonek", 260, r"\k{A}", False),
  Entity("aogonek", 261, r"\k{a}", False),
  Entity("Cacute", 262, r"\'{C}", False),  
  Entity("cacute", 263, r"\'{c}", False),
  Entity("Ccirc", 264, r"\^{C}", False),
  Entity("ccirc", 265, r"\^{c}", False),
  Entity("Cdota", 266, r"\.{C}", False),
  Entity("cdota", 267, r"\.{c}", False),
  Entity("Ccaron", 268, r"\v{C}", False), 
  Entity("ccaron", 269, r"\v{c}", False), 
  Entity("Dcaron", 270, r"\v{D}", False), 
  Entity("dcaron", 271, r"\v{d}", False), 
  Entity("Dstroke", 272, r"\DH", False),  // todo
  Entity("dstroke", 273, r"\dh", False),  // todo
  Entity("Emacron", 274, r"\={E}", False),
  Entity("emacron", 275, r"\={e}", False),
  Entity("Ebreve", 276, r"\u{E}", False),
  Entity("ebreve", 277, r"\u{e}", False),
  Entity("Edota", 278, r"\.{E}", False),
  Entity("edota", 279, r"\.{e}", False),
  Entity("Eogonek", 280, r"\k{E}", False),
  Entity("eogonek", 281, r"\k{e}", False),
  Entity("Ecaron", 282, r"\v{E}", False),   
  Entity("ecaron", 283, r"\v{e}", False), 
  Entity("Gcirc", 284, r"\^{G}", False),
  Entity("gcirc", 285, r"\^{g}", False),
  Entity("Gbreve", 286, r"\u{G}", False),
  Entity("gbreve", 287, r"\u{g}", False),
  Entity("Gdota", 288, r"\.{G}", False),
  Entity("gdota", 289, r"\.{g}", False),
  Entity("Gcedil", 290, r"\c{G}", False),
  Entity("gcedil", 291, r"\c{g}", False),
  Entity("Hcirc", 292, r"\^{H}", False),
  Entity("hcirc", 293, r"\^{h}", False),
  Entity("Hstroke", 294, r"{H}", False),  // todo
  Entity("hstroke", 295, r"{h}", False),  // todo
  Entity("Itilde", 296, r"\~{I}", False),
  Entity("itilde", 297, r"\~{\i}", False),
  Entity("Imacron", 298, r"\={I}", False),
  Entity("imacron", 299, r"\={\i}", False),
  Entity("Ibreve", 300, r"\u{I}", False),
  Entity("ibreve", 301, r"\u{i}", False),
  Entity("Iogonek", 302, r"\k{I}", False),
  Entity("iogonek", 303, r"\k{\i}", False),
  Entity("Idota", 304, r"\.{I}", False),
  Entity("idotless", 305, r"\i", False),
  Entity("IJ", 306, r"IJ", False),
  Entity("ij", 307, r"ij", False),
  Entity("Jcirc", 308, r"\^{J}", False),
  Entity("jcirc", 309, r"\^{j}", False),
  Entity("Kcedil", 310, r"\c{K}", False),
  Entity("kcedil", 311, r"\c{k}", False),
  Entity("Lacute", 313, r"\'{L}", False),  
  Entity("lacute", 314, r"\'{l}", False),
  Entity("Lcedil", 315, r"\c{L}", False),
  Entity("lcedil", 316, r"\c{l}", False),
  Entity("Lcaron", 317, r"\v{L}", False),   
  Entity("lcaron", 318, r"\v{l}", False), 
  // Entity("Ldotm", 319, r"\mdDotm{L}", False),   
  // Entity("ldotm", 320, r"\mdDotm{l}", False), 

  Entity("Lstroke", 321, r"\L", False),  
  Entity("lstroke", 322, r"\l", False),  

  Entity("Nacute", 323, r"\'{N}", False),  
  Entity("nacute", 324, r"\'{n}", False),
  Entity("Ncedil", 325, r"\c{N}", False),
  Entity("ncedil", 326, r"\c{n}", False),
  Entity("Ncaron", 327, r"\v{N}", False),   
  Entity("ncaron", 328, r"\v{n}", False), 

  Entity("napos", 329, r"{'n}", False),  
  Entity("Neng", 330, r"\NG", False),
  Entity("neng", 331, r"\ng", False),
  
  Entity("Omacron", 332, r"\={O}", False),
  Entity("omacron", 333, r"\={o}", False),
  Entity("Obreve", 334, r"\u{O}", False),
  Entity("obreve", 335, r"\u{o}", False),
  Entity("Odacute", 336, r"\H{O}", False),
  Entity("odacute", 337, r"\H{o}", False),
  
  Entity("OElig", 338, r"\OE", False),
  Entity("oelig", 339, r"\oe", False),

  Entity("Racute", 340, r"\'{R}", False),  
  Entity("racute", 341, r"\'{r}", False),
  Entity("Rcedil", 342, r"\c{R}", False),
  Entity("rcedil", 343, r"\c{r}", False),
  Entity("Rcaron", 344, r"\v{R}", False),   
  Entity("rcaron", 345, r"\v{r}", False), 

  Entity("Sacute", 346, r"\'{S}", False),  
  Entity("sacute", 347, r"\'{s}", False),
  Entity("Scirc", 348, r"\^{S}", False),
  Entity("scirc", 349, r"\^{s}", False),
  Entity("Scedil", 350, r"\c{S}", False),
  Entity("scedil", 351, r"\c{s}", False),

  Entity("Scaron", 352, r"\u{S}", False), // accent
  Entity("scaron", 353, r"\u{s}", False), // accent

  Entity("Tcedil", 354, r"\c{T}", False),
  Entity("tcedil", 355, r"\c{t}", False),
  Entity("Tcaron", 356, r"\v{T}", False),   
  Entity("tcaron", 357, r"\v{t}", False), 
  Entity("Tstroke", 358, r"\mdUnicode{358}", False),  
  Entity("tstroke", 359, r"\mdUnicode{359}", False),  
  Entity("Utilde", 360, r"\~{U}", False),
  Entity("utilde", 361, r"\~{u}", False),
  Entity("Umacron", 362, r"\={U}", False),
  Entity("umacron", 363, r"\={u}", False),
  Entity("Ubreve", 364, r"\u{U}", False),
  Entity("ubreve", 365, r"\u{u}", False),
  Entity("Uring", 366, r"\r{U}", False),
  Entity("uring", 367, r"\r{u}", False),
  Entity("Udacute", 368, r"\H{U}", False),
  Entity("udacute", 369, r"\H{u}", False),
  Entity("Uogonek", 370, r"\k{U}", False),
  Entity("uogonek", 371, r"\k{u}", False),
  Entity("Wcirc", 372, r"\^{W}", False),
  Entity("wcirc", 373, r"\^{w}", False),
  Entity("Ycirc", 374, r"\^{Y}", False),
  Entity("ycirc", 375, r"\^{y}", False),

  // added # in 380
  Entity("Yuml", 376, r#"\""{Y}"#, False), // accent

  Entity("Zacute", 377, r"\'{Z}", False),  
  Entity("zacute", 378, r"\'{z}", False),
  Entity("Zdota", 379, r"\.{Z}", False),
  Entity("zdota", 380, r"\.{z}", False),
  Entity("Zcaron", 381, r"\v{Z}", False),
  Entity("zcaron", 382, r"\v{z}", False),
  Entity("slong", 383, r"\mdUnicode{383}", False),

  Entity("fnof", 402, r"\textit{f}", False),
  Entity("circ", 710, r"\textasciicircum", False),
  Entity("tilde", 732, r"\textasciitilde", False),
  Entity("lowline", 818, r"\mdlowline", False),
  Entity("Alpha", 913, r"A", False ),
  Entity("Beta", 914, r"B", False ),
  Entity("Gamma", 915, r"\Gamma", True ),
  Entity("Delta", 916, r"\Delta", True ),
  Entity("Epsilon", 917, r"E", False),
  Entity("Zeta", 918, r"Z", False),
  Entity("Eta", 919, r"H", False),
  Entity("Theta", 920, r"\Theta", True),
  Entity("Iota", 921, r"I", False),
  Entity("Kappa", 922, r"K", False),
  Entity("Lambda", 923, r"\Lambda", True),
  Entity("Mu", 924, r"M", False),
  Entity("Nu", 925, r"N", False),
  Entity("Xi", 926, r"\Xi", True),
  Entity("Omicron", 927, r"O", False),
  Entity("Pi", 928, r"\Pi", True),
  Entity("Rho", 929, r"P", False),
  Entity("Sigma", 931, r"\Sigma", True),
  Entity("Tau", 932, r"T", False),
  Entity("Upsilon", 933, r"\Upsilon", True),
  Entity("Phi", 934, r"\Phi", True),
  Entity("Chi", 935, r"X", False),
  Entity("Psi", 936, r"\Psi", True),
  Entity("Omega", 937, r"\Omega", True),
  Entity("alpha", 945, r"\alpha", True),
  Entity("beta", 946, r"\beta", True),
  Entity("gamma", 947, r"\gamma", True),
  Entity("delta", 948, r"\delta", True),
  Entity("epsilon", 949, r"\epsilon", True),
  Entity("zeta", 950, r"\zeta", True),
  Entity("eta", 951, r"\eta", True),
  Entity("theta", 952, r"\theta", True),
  Entity("iota", 953, r"\iota", True),
  Entity("kappa", 954, r"\kappa", True),
  Entity("lambda", 955, r"\lambda", True),
  Entity("mu", 956, r"\mu", True),
  Entity("nu", 957, r"\nu", True),
  Entity("xi", 958, r"\xi", True),
  Entity("omicron", 959, r"o", True),
  Entity("pi", 960, r"\pi", True),
  Entity("rho", 961, r"\rho", True),
  Entity("sigmaf", 962, r"\varsigma", True),
  Entity("sigma", 963, r"\sigma", True),
  Entity("tau", 964, r"\tau", True),
  Entity("upsilon", 965, r"\upsilon", True),
  Entity("phi", 966, r"\varphi", True),
  Entity("chi", 967, r"\chi", True),
  Entity("psi", 968, r"\psi", True),
  Entity("omega", 969, r"\omega", True),
  Entity("thetasym", 977, r"\vartheta", True),
  Entity("upsih", 978, r"\Upsilon", True ),
  Entity("phisym", 981, r"\phi", True),
  Entity("piv", 982, r"\varpi", True ),
  Entity("ensp", 8194, r"\hspace*{0.5em}", False),
  Entity("emsp", 8195, r"\hspace*{1em}", False),
  Entity("quad", 8195, r"\quad", False),
  Entity("thicksp", 8196, r"\;", True ),
  Entity("medsp", 8197, r"\:", True ),
  Entity("thinsp", 8201, r"\,", True ),
  Entity("zwsp", 8203, r"\hspace{0pt}", False ),
  Entity("strut", 8203, r"\strut", False ),
  Entity("pagebreak", 12, r"\newpage", False), //use form feed character
  Entity("zwnj", 8204, r"{}", False),
  Entity("zwj", 8205, "", False),
  Entity("lrm", 8206, "", False),
  Entity("rlm", 8207, "", False),
  Entity("nbdash", 8209, r"\nbdash", False),
  Entity("ndash", 8211, r"\textendash", False),
  Entity("mdash", 8212, r"\textemdash", False),
  Entity("lsquo", 8216, r"\textquoteleft", False),
  Entity("rsquo", 8217, r"\textquoteright", False),
  Entity("sbquo", 8218, r"\quotesinglbase", False),
  Entity("ldquo", 8220, r"\textquotedblleft", False),
  Entity("rdquo", 8221, r"\textquotedblright", False),
  Entity("bdquo", 8222, r"\quotedblbase", False),
  Entity("dagger", 8224, r"\dag", True ),
  Entity("Dagger", 8225, r"\ddag", True ),
  Entity("bull", 8226, r"\textbullet", False),
  Entity("hellip", 8230, r"\dots", False),
  Entity("permil", 8240, r"\textperthousand", False),
  Entity("prime", 8242, r"\prime", True),
  Entity("Prime", 8243, r"\prime\prime", True),
  Entity("lsaquo", 8249, r"\guilsinglleft", False),
  Entity("rsaquo", 8250, r"\guilsinglright", False),
  Entity("oline", 8254, "-", False), //TODO
  Entity("frasl", 8260, r"\textfraction", False),
  Entity("euro", 8364, r"\texteuro", False),
  Entity("image", 8465, r"\Im", True ),
  Entity("weierp", 8472, r"\wp", True ),
  Entity("real", 8476, r"\Re", True ),
  Entity("CC", 8450, r"\mathbb{C}", True ),
  Entity("NN", 8469, r"\mathbb{N}", True ),
  Entity("PP", 8473, r"\mathbb{P}", True ),
  Entity("QQ", 8474, r"\mathbb{Q}", True ),
  Entity("RR", 8477, r"\mathbb{R}", True ),
  Entity("ZZ", 8484, r"\mathbb{Z}", True ),
  Entity("trade", 8482, r"\texttrademark", False),
  Entity("alefsym", 8501, r"\aleph", True),
  Entity("larr", 8592, r"\leftarrow", True),
  Entity("uarr", 8593, r"\uparrow", True),
  Entity("rarr", 8594, r"\rightarrow", True),
  Entity("darr", 8595, r"\downarrow", True),
  Entity("harr", 8596, r"\leftrightarrow", True),
  Entity("crarr", 8629, r"\hookleftarrow", True),
  Entity("lArr", 8656, r"\Leftarrow", True),
  Entity("uArr", 8657, r"\Uparrow", True),
  Entity("rArr", 8658, r"\Rightarrow", True),
  Entity("dArr", 8659, r"\Downarrow", True),
  Entity("hArr", 8660, r"\Leftrightarrow", True),
  Entity("forall", 8704, r"\forall", True),
  Entity("part", 8706, r"\partial", True),
  Entity("exist", 8707, r"\exists", True),
  Entity("empty", 8709, r"\varnothing", True),
  Entity("nabla", 8711, r"\nabla", True),
  Entity("isin", 8712, r"\in", True),
  Entity("notin", 8713, r"\notin", True),
  Entity("ni", 8715, r"\ni", True),
  Entity("prod", 8719, r"\prod", True),
  Entity("sum", 8721, r"\sum", True),
  Entity("minus", 8722, r"{-}", True),
  Entity("lowast", 8727, r"\ast", True),
  Entity("radic", 8730, r"\surd", True),
  Entity("prop", 8733, r"\propto", True),
  Entity("infin", 8734, r"\infty", True),
  Entity("ang", 8736, r"\angle", True),
  Entity("and", 8743, r"\wedge", True),
  Entity("or", 8744, r"\vee", True),
  Entity("cap", 8745, r"\cap", True),
  Entity("cup", 8746, r"\cup", True),
  Entity("int", 8747, r"\intop", True),
  Entity("there4", 8756, r"\therefore", True),
  Entity("sim", 8764, r"\sim", True),
  Entity("cong", 8773, r"\cong", True),
  Entity("asymp", 8776, r"\approx", True),
  Entity("ne", 8800, r"\neq", True),
  Entity("equiv", 8801, r"\equiv", True),
  Entity("le", 8804, r"\leq", True),
  Entity("ge", 8805, r"\geq", True),
  Entity("sub", 8834, r"\subset", True),
  Entity("sup", 8835, r"\supset", True),
  Entity("nsub", 8836, r"\subsetneq", True),
    Entity("sube", 8838, r"\subseteq", True),
  Entity("supe", 8839, r"\supseteq", True),
  Entity("oplus", 8853, r"\oplus", True),
  Entity("otimes", 8855, r"\otimes", True),
  Entity("perp", 8869, r"\bot", True),
  Entity("sdot", 8901, r"\cdot", True),
  Entity("vellip", 8942, r"\vdots", True),
  Entity("lceil", 8968, r"\lceil", True),
  Entity("rceil", 8969, r"\rceil", True),
  Entity("lfloor", 8970, r"\lfloor", True),
  Entity("rfloor", 8971, r"\rfloor", True),
  Entity("lang", 9001, r"\langle", True),
  Entity("rang", 9002, r"\rangle", True),
  Entity("loz", 9674, r"\lozenge", True),
  Entity("spades", 9824, r"\spadesuit", True),
  Entity("clubs", 9827, r"\clubsuit", True),
  Entity("hearts", 9829, r"\heartsuit", True),
  Entity("diams", 9830, r"\diamondsuit", True),

  // unnamed entities
  Entity("hooklarr", 8617, r"\hookleftarrow", True ),  
  Entity("bbox", 8718, r"\blacksquare", True ),  
  Entity("box", 9633, r"\Box", True ),
  Entity("ballotbox", 9744, r"\Box", True ),
  Entity("ballotc", 9745, r"\mdUnicode{9745}", False ),
  Entity("ballotx", 9746, r"\mdUnicode{9746}", False ),
  Entity("checkmark", 10003, r"\ding{51}", False ),
  Entity("bcheckmark", 10004, r"\ding{52}", False ),   
  Entity("xmark", 10007, r"\ding{55}", False ),
  Entity("bxmark", 10008, r"\ding{56}", False ),   
  Entity("mglass", 128270, r"\mdUnicode{128270}", False ),

  // circled numbers
  Entity("circled1", 9312, r"\ding{192}", False),
  Entity("circled2", 9313, r"\ding{193}", False),
  Entity("circled3", 9314, r"\ding{194}", False),
  Entity("circled4", 9315, r"\ding{195}", False),
  Entity("circled5", 9316, r"\ding{196}", False),
  Entity("circled6", 9317, r"\ding{197}", False),
  Entity("circled7", 9318, r"\ding{198}", False),
  Entity("circled8", 9319, r"\ding{199}", False),
  Entity("circled9", 9320, r"\ding{200}", False),
  Entity("circled10", 9321, r"\ding{201}", False),
]

