#pragma once
#ifndef kk_std_text_regex_H
#define kk_std_text_regex_H
// Koka generated module: "std/text/regex", koka version: 2.4.0, platform: 64-bit
#include <kklib.h>
#include "std_core_types.h"
#include "std_core_hnd.h"
#include "std_core.h"

// type declarations

// value type std/text/regex/regex
struct kk_std_text_regex_Regex {
  kk_box_t obj;
  kk_string_t src;
};
typedef struct kk_std_text_regex_Regex kk_std_text_regex__regex;
static inline kk_std_text_regex__regex kk_std_text_regex__new_Regex(kk_box_t obj, kk_string_t src, kk_context_t* _ctx) {
  kk_std_text_regex__regex _con;
  _con.obj = obj;
  _con.src = src;
  return _con;
}
static inline bool kk_std_text_regex__is_Regex(kk_std_text_regex__regex x) {
  return (true);
}
static inline kk_std_text_regex__regex kk_std_text_regex__regex_dup(kk_std_text_regex__regex _x) {
  kk_box_dup(_x.obj);
  kk_string_dup(_x.src);
  return _x;
}
static inline void kk_std_text_regex__regex_drop(kk_std_text_regex__regex _x, kk_context_t* _ctx) {
  kk_box_drop(_x.obj, _ctx);
  kk_string_drop(_x.src, _ctx);
}
static inline kk_box_t kk_std_text_regex__regex_box(kk_std_text_regex__regex _x, kk_context_t* _ctx) {
  kk_box_t _box;
  kk_valuetype_box(kk_std_text_regex__regex, _box, _x, 2 /* scan count */, _ctx);
  return _box;
}
static inline kk_std_text_regex__regex kk_std_text_regex__regex_unbox(kk_box_t _x, kk_context_t* _ctx) {
  kk_boxed_value_t _p;
  kk_std_text_regex__regex _unbox;
  kk_valuetype_unbox_(kk_std_text_regex__regex, _p, _unbox, _x, _ctx);
  if (_ctx!=NULL && _p!=NULL) {
    if (kk_basetype_is_unique(_p)) { kk_basetype_free(_p,_ctx); } else {
      kk_std_text_regex__regex_dup(_unbox);
      kk_basetype_decref(_p, _ctx);
    }
  }
  return _unbox;
}

// value declarations
 
// Automatically generated. Retrieves the `obj` constructor field of the `:regex` type.

static inline kk_box_t kk_std_text_regex_obj(kk_std_text_regex__regex regex0, kk_context_t* _ctx) { /* (regex : regex) -> any */ 
  {
    kk_box_t _x = regex0.obj;
    return kk_box_dup(_x);
  }
}
 
// Automatically generated. Retrieves the `src` constructor field of the `:regex` type.

static inline kk_string_t kk_std_text_regex_src(kk_std_text_regex__regex regex0, kk_context_t* _ctx) { /* (regex : regex) -> string */ 
  {
    kk_string_t _x = regex0.src;
    return kk_string_dup(_x);
  }
}

kk_std_text_regex__regex kk_std_text_regex__copy(kk_std_text_regex__regex _this, kk_std_core_types__optional obj0, kk_std_core_types__optional src0, kk_context_t* _ctx); /* (regex, obj : optional<any>, src : optional<string>) -> regex */ 

kk_string_t kk_std_text_regex_captured(kk_std_core__list matched0, kk_context_t* _ctx); /* (matched : list<sslice>) -> string */ 

kk_std_core__list kk_std_text_regex_regex_exec(kk_box_t regex0, kk_string_t str, kk_ssize_t start, kk_context_t* _ctx); /* (regex : any, str : string, start : ssize_t) -> list<sslice> */ 

kk_std_core__list kk_std_text_regex_regex_exec_all(kk_box_t regex0, kk_string_t str, kk_ssize_t start, kk_ssize_t atmost, kk_context_t* _ctx); /* (regex : any, str : string, start : ssize_t, atmost : ssize_t) -> list<list<sslice>> */ 

kk_box_t kk_std_text_regex_regex_create(kk_string_t source0, bool ignore_case, bool multi_line, kk_context_t* _ctx); /* (source : string, ignore-case : bool, multi-line : bool) -> any */ 
 
// Return the pattern as a string

static inline kk_string_t kk_std_text_regex_source(kk_std_text_regex__regex r, kk_context_t* _ctx) { /* (r : regex) -> string */ 
  {
    kk_string_t _x = r.src;
    kk_string_dup(_x);
    kk_std_text_regex__regex_drop(r, _ctx);
    return _x;
  }
}
 
// Check if a capture group was matched.

static inline bool kk_std_text_regex_matched(kk_std_core__sslice s, kk_context_t* _ctx) { /* (s : sslice) -> bool */ 
  kk_ssize_t _x1244;
  {
    kk_ssize_t _x = s.start;
    kk_std_core__sslice_drop(s, _ctx);
    _x1244 = _x; /*ssize_t*/
  }
  kk_ssize_t _x1245 = (KK_IZ(0)); /*ssize_t*/
  return (_x1244 >= _x1245);
}
 
// Return the full matched string part for a list of matched capture groups.


// lift anonymous function
struct kk_std_text_regex_captures_fun1246__t {
  struct kk_function_s _base;
};
extern kk_box_t kk_std_text_regex_captures_fun1246(kk_function_t _fself, kk_box_t _b_1072, kk_context_t* _ctx);
static inline kk_function_t kk_std_text_regex_new_captures_fun1246(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_regex_captures_fun1246, _ctx)
  return kk_function_dup(_fself);
}


static inline kk_std_core__list kk_std_text_regex_captures(kk_std_core__list xs, kk_context_t* _ctx) { /* (xs : list<list<sslice>>) -> list<string> */ 
  return kk_std_core_map_5(xs, kk_std_text_regex_new_captures_fun1246(_ctx), _ctx);
}

kk_string_t kk_std_text_regex__mlift1030_concat_replace(kk_std_core__list acc, kk_std_core__list mm, kk_std_core__list pre, kk_function_t repl, kk_string_t _y_1018, kk_context_t* _ctx); /* forall<e> (acc : list<string>, mm : list<list<sslice>>, pre : list<sslice>, repl : (list<sslice>) -> e string, string) -> e string */ 

kk_string_t kk_std_text_regex_concat_replace(kk_std_core__list matches, kk_function_t repl0, kk_std_core__list acc0, kk_context_t* _ctx); /* forall<e> (matches : list<list<sslice>>, repl : (list<sslice>) -> e string, acc : list<string>) -> e string */ 
 
// Find a match for a regular expression.
// See also `find` and `contains`

static inline kk_std_core__list kk_std_text_regex_exec(kk_std_text_regex__regex regex0, kk_string_t s, kk_context_t* _ctx) { /* (regex : regex, s : string) -> list<sslice> */ 
  kk_box_t _x1279;
  {
    kk_box_t _x = regex0.obj;
    kk_box_dup(_x);
    kk_std_text_regex__regex_drop(regex0, _ctx);
    _x1279 = _x; /*any*/
  }
  kk_ssize_t _x1280 = (KK_IZ(0)); /*ssize_t*/
  return kk_std_text_regex_regex_exec(_x1279, s, _x1280, _ctx);
}

bool kk_std_text_regex_contains(kk_string_t s, kk_std_text_regex__regex r, kk_context_t* _ctx); /* (s : string, r : regex) -> bool */ 

kk_std_core__list kk_std_text_regex_exec_all(kk_std_text_regex__regex regex0, kk_string_t s, kk_std_core_types__optional atmost, kk_context_t* _ctx); /* (regex : regex, s : string, atmost : optional<int>) -> list<list<sslice>> */ 

kk_std_core__list kk_std_text_regex__ctail_filter_matches(kk_std_core__list xs, kk_std_core_types__ctail _acc, kk_context_t* _ctx); /* (xs : list<list<sslice>>, ctail<list<list<sslice>>>) -> list<list<sslice>> */ 

kk_std_core__list kk_std_text_regex_filter_matches(kk_std_core__list xs0, kk_context_t* _ctx); /* (xs : list<list<sslice>>) -> list<list<sslice>> */ 

kk_std_core__list kk_std_text_regex__ctail_filter_non_matches(kk_std_core__list xs, kk_std_core_types__ctail _acc, kk_context_t* _ctx); /* (xs : list<list<sslice>>, ctail<list<list<sslice>>>) -> list<list<sslice>> */ 

kk_std_core__list kk_std_text_regex_filter_non_matches(kk_std_core__list xs0, kk_context_t* _ctx); /* (xs : list<list<sslice>>) -> list<list<sslice>> */ 

kk_std_core_types__maybe kk_std_text_regex_find(kk_string_t s, kk_std_text_regex__regex r, kk_context_t* _ctx); /* (s : string, r : regex) -> maybe<string> */ 

kk_std_core__list kk_std_text_regex_find_all(kk_string_t s, kk_std_text_regex__regex r, kk_std_core_types__optional atmost, kk_context_t* _ctx); /* (s : string, r : regex, atmost : optional<int>) -> list<string> */ 
 
// Create a new regular expression. Takes two optional parameters. Set `ignoreCase` to `True`
// to ignore uppercase/lowercase distinction. If  `multiline` is set to `True`, then `^` and `$`
// match also the beginning and end of every line (instead of the entire input).

static inline kk_std_text_regex__regex kk_std_text_regex_regex(kk_string_t regex0, kk_std_core_types__optional ignorecase, kk_std_core_types__optional multiline, kk_context_t* _ctx) { /* (regex : string, ignorecase : optional<bool>, multiline : optional<bool>) -> regex */ 
  kk_box_t _x1322;
  kk_string_t _x1323 = kk_string_dup(regex0); /*string*/
  bool _x1324;
  if (kk_std_core_types__is_Optional(ignorecase)) {
    kk_box_t _box_x1171 = ignorecase._cons.Optional.value;
    bool _ignorecase_455 = kk_bool_unbox(_box_x1171);
    _x1324 = _ignorecase_455; /*bool*/
  }
  else {
    _x1324 = false; /*bool*/
  }
  bool _x1326;
  if (kk_std_core_types__is_Optional(multiline)) {
    kk_box_t _box_x1172 = multiline._cons.Optional.value;
    bool _multiline_459 = kk_bool_unbox(_box_x1172);
    _x1326 = _multiline_459; /*bool*/
  }
  else {
    _x1326 = false; /*bool*/
  }
  _x1322 = kk_std_text_regex_regex_create(_x1323, _x1324, _x1326, _ctx); /*any*/
  return kk_std_text_regex__new_Regex(_x1322, regex0, _ctx);
}

kk_string_t kk_std_text_regex_replace_all(kk_string_t s, kk_std_text_regex__regex r, kk_function_t repl, kk_std_core_types__optional atmost, kk_context_t* _ctx); /* forall<e> (s : string, r : regex, repl : (list<sslice>) -> e string, atmost : optional<int>) -> e string */ 

kk_string_t kk_std_text_regex_replace_captures(kk_std_core__list caps, kk_string_t repl, kk_context_t* _ctx); /* (caps : list<sslice>, repl : string) -> string */ 

kk_string_t kk_std_text_regex_replace_all_1(kk_string_t s, kk_std_text_regex__regex regex0, kk_string_t repl, kk_std_core_types__optional atmost, kk_context_t* _ctx); /* (s : string, regex : regex, repl : string, atmost : optional<int>) -> string */ 

extern kk_std_text_regex__regex kk_std_text_regex_rx_nongroup;

kk_integer_t kk_std_text_regex_groups_count(kk_std_text_regex__regex r, kk_context_t* _ctx); /* (r : regex) -> int */ 

kk_string_t kk_std_text_regex_replace(kk_string_t s, kk_std_text_regex__regex r, kk_function_t repl, kk_context_t* _ctx); /* forall<e> (s : string, r : regex, repl : (list<sslice>) -> e string) -> e string */ 

kk_string_t kk_std_text_regex_replace_1(kk_string_t s, kk_std_text_regex__regex regex0, kk_string_t repl, kk_context_t* _ctx); /* (s : string, regex : regex, repl : string) -> string */ 

kk_std_core__list kk_std_text_regex_split(kk_string_t s, kk_std_text_regex__regex r, kk_std_core_types__optional atmost, kk_context_t* _ctx); /* (s : string, r : regex, atmost : optional<int>) -> list<string> */ 

bool kk_std_text_regex_testabc(kk_string_t s, kk_context_t* _ctx); /* (s : string) -> bool */ 

void kk_std_text_regex__init(kk_context_t* _ctx);


void kk_std_text_regex__done(kk_context_t* _ctx);

#endif // header
