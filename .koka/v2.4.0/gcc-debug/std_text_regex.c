// Koka generated module: "std/text/regex", koka version: 2.4.0, platform: 64-bit
#include "std_text_regex.h"
/*---------------------------------------------------------------------------
  Copyright 2021, Microsoft Research, Daan Leijen.

  This is free software; you can redistribute it and/or modify it under the
  terms of the Apache License, Version 2.0. A copy of the License can be
  found in the LICENSE file at the root of this distribution.
---------------------------------------------------------------------------*/

#pragma clang diagnostic ignored "-Wdisabled-macro-expansion"
#define PCRE2_CODE_UNIT_WIDTH 8
#define PCRE2_STATIC
#include <pcre2.h>

/* -----------------------------------------------------------------------
  Init/Done
------------------------------------------------------------------------*/
#define KK_CUSTOM_INIT  kk_regex_custom_init
#define KK_CUSTOM_DONE  kk_regex_custom_done

static pcre2_general_context* gen_ctx;
static pcre2_compile_context* cmp_ctx;
static pcre2_match_context*   match_ctx; 

static void* kk_pcre2_malloc( PCRE2_SIZE size, void* data ) {
  return kk_malloc( kk_to_ssize_t(size), kk_get_context() );  
}
static void kk_pcre2_free( void* p, void* data ) {
  kk_free(p,kk_get_context());
}

static void kk_regex_custom_init( kk_context_t* ctx ) {
  gen_ctx = pcre2_general_context_create( &kk_pcre2_malloc, &kk_pcre2_free, NULL );
  if (gen_ctx != NULL) {
    match_ctx = pcre2_match_context_create( gen_ctx );
    cmp_ctx = pcre2_compile_context_create( gen_ctx );
    if (cmp_ctx != NULL) {
      pcre2_set_newline( cmp_ctx, PCRE2_NEWLINE_ANYCRLF );
      pcre2_set_bsr( cmp_ctx, PCRE2_BSR_ANYCRLF );
    }
  }
}

static void kk_regex_custom_done( kk_context_t* ctx ) {
  if (cmp_ctx != NULL) {
    pcre2_compile_context_free(cmp_ctx);
    cmp_ctx = NULL;
  }
  if (match_ctx != NULL) {
    pcre2_match_context_free(match_ctx);
    match_ctx = NULL;
  }
  if (gen_ctx != NULL) {
    pcre2_general_context_free(gen_ctx);
    gen_ctx = NULL;
  }
}


/* -----------------------------------------------------------------------
  Compile
------------------------------------------------------------------------*/

static void kk_regex_free( void* pre, kk_block_t* b, kk_context_t* ctx ) {
  kk_unused(ctx);
  pcre2_code* re = (pcre2_code*)pre;
  //kk_info_message( "free regex at %p\n", re );
  if (re != NULL) pcre2_code_free(re);
}

#define KK_REGEX_OPTIONS  (PCRE2_ALT_BSUX | PCRE2_EXTRA_ALT_BSUX | PCRE2_MATCH_UNSET_BACKREF /* javascript compat */ \
                          | PCRE2_NEVER_BACKSLASH_C | PCRE2_NEVER_UCP | PCRE2_UTF /* utf-8 safety */ \
                          )

static kk_box_t kk_regex_create( kk_string_t pat, bool ignore_case, bool multi_line, kk_context_t* ctx ) {
  kk_ssize_t len;
  const uint8_t* cpat = kk_string_buf_borrow( pat, &len );
  PCRE2_SIZE errofs = 0;
  int        errnum = 0;
  uint32_t   options = KK_REGEX_OPTIONS;
  if (ignore_case) options |= PCRE2_CASELESS;
  if (multi_line)  options |= PCRE2_MULTILINE;
  pcre2_code* re = pcre2_compile( cpat, PCRE2_ZERO_TERMINATED, options, &errnum, &errofs, cmp_ctx);
  //kk_info_message( "create regex: err:%i, at %p\n", (re==NULL ? 0 : errnum), re );
  kk_string_drop(pat,ctx);
  return kk_cptr_raw_box( &kk_regex_free, re, ctx );
}


/* -----------------------------------------------------------------------
  Match
------------------------------------------------------------------------*/

/*
static void kk_match_data_free( void* pmd, kk_block_t* b ) {
  kk_info_message( "free match_data\n" );
  pcre2_match_data* md = (pcre2_match_data*)pmd;
  if (md != NULL) pcre2_match_data_free(md);
}
*/

static kk_std_core__list kk_regex_exec_ex( pcre2_code* re, pcre2_match_data* match_data, 
                                           kk_string_t str_borrow, const uint8_t* cstr, kk_ssize_t len, bool allow_empty, 
                                           kk_ssize_t start, kk_ssize_t* mstart, kk_ssize_t* end, int* res, kk_context_t* ctx ) 
{
  // match
  kk_std_core__list hd  = kk_std_core__new_Nil(ctx);
  uint32_t options = 0;
  if (!allow_empty) options |= (PCRE2_NOTEMPTY_ATSTART | PCRE2_ANCHORED);
  int rc = pcre2_match( re, cstr, len, start, options, match_data, match_ctx );
  if (res != NULL) *res = rc;    
  if (rc > 0) {    
    // extract captures
    uint32_t    gcount = pcre2_get_ovector_count(match_data);
    PCRE2_SIZE* groups = pcre2_get_ovector_pointer(match_data);
    for( uint32_t i = gcount; i > 0; ) {
      i--;
      kk_ssize_t sstart = groups[i*2];       // on no-match, sstart and send == -1.
      kk_ssize_t send   = groups[i*2 + 1];
      kk_assert(send >= sstart);
      kk_std_core__sslice sslice = kk_std_core__new_Sslice( kk_string_dup(str_borrow), sstart, send - sstart, ctx ); 
      hd = kk_std_core__new_Cons(kk_reuse_null,kk_std_core__sslice_box(sslice,ctx), hd, ctx);
      if (i == 0) {
        if (mstart != NULL) { *mstart = sstart; }
        if (end    != NULL) { *end = send; }
      }
    }
  }
  return hd;
}


static kk_std_core__list kk_regex_exec( kk_box_t bre, kk_string_t str, kk_ssize_t start, kk_context_t* ctx ) 
{
  // unpack
  pcre2_match_data* match_data = NULL;
  kk_std_core__list res = kk_std_core__new_Nil(ctx);
  pcre2_code* re = (pcre2_code*)kk_cptr_raw_unbox(bre);
  kk_ssize_t len = 0;
  const uint8_t* cstr = NULL;
  if (re == NULL) goto done;    
  match_data = pcre2_match_data_create_from_pattern(re, gen_ctx);
  if (match_data==NULL) goto done;  
  cstr = kk_string_buf_borrow(str, &len );  

  // and match
  res = kk_regex_exec_ex( re, match_data, str, cstr, len, true, start, NULL, NULL, NULL, ctx );

done:  
  if (match_data != NULL) {
    //kk_info_message( "free match data: %p\n", match_data );
    pcre2_match_data_free(match_data);
  }
  kk_string_drop(str,ctx);
  kk_box_drop(bre,ctx);
  return res;
}

static kk_std_core__list kk_regex_exec_all( kk_box_t bre, kk_string_t str, kk_ssize_t start, kk_ssize_t atmost, kk_context_t* ctx ) {
  // unpack
  if (atmost < 0) atmost = KK_SSIZE_MAX;
  pcre2_match_data* match_data = NULL;
  kk_std_core__list res = kk_std_core__new_Nil(ctx);
  pcre2_code* re = (pcre2_code*)kk_cptr_raw_unbox(bre);
  if (re == NULL) goto done;    
  match_data = pcre2_match_data_create_from_pattern(re, gen_ctx);
  if (match_data==NULL) goto done;  
  {
    kk_ssize_t len;
    const uint8_t* cstr = kk_string_buf_borrow(str, &len );  

    // and match
    kk_std_core__list* tail = NULL;
    bool allow_empty = true;
    int rc = 1;    
    kk_ssize_t next = start;
    while( rc > 0 && start < len && atmost > 0) {
      atmost--;
      rc = 0;
      kk_ssize_t mstart = start;
      kk_std_core__list cap = kk_regex_exec_ex( re, match_data, str, cstr, len, allow_empty, start, &mstart, &next, &rc, ctx );
      if (rc > 0) {
        // found a match; 
        // push string up to match, and the actual matched regex
        kk_std_core__sslice pre = kk_std_core__new_Sslice( kk_string_dup(str), start, mstart - start, ctx ); 
        kk_std_core__list   prelist = kk_std_core__new_Cons( kk_reuse_null, kk_std_core__sslice_box(pre,ctx), kk_std_core__new_Nil(ctx), ctx );
        kk_std_core__list   capcons = kk_std_core__new_Cons( kk_reuse_null, kk_std_core__list_box(cap,ctx), kk_std_core__new_Nil(ctx) /*tail*/, ctx );
        kk_std_core__list   cons = kk_std_core__new_Cons( kk_reuse_null, kk_std_core__list_box(prelist,ctx), capcons, ctx );
        if (tail==NULL) res = cons;
                  else *tail = cons;
        tail = &kk_std_core__as_Cons(capcons)->tail;
        allow_empty = (next > start);
        start = next;
      }
      else if (rc <= 0 && !allow_empty) {
        // skip one character and try again
        // todo: handle cr/lf pairs better?
        const uint8_t* p = kk_utf8_next( cstr + start );
        start = (p - cstr);
        allow_empty = true;
        rc = 1;
      }
    }
    
    // push final string part as well and end the list
    kk_std_core__sslice post    = kk_std_core__new_Sslice( kk_string_dup(str), next, len - next, ctx ); 
    kk_std_core__list   postlist= kk_std_core__new_Cons( kk_reuse_null, kk_std_core__sslice_box(post,ctx), kk_std_core__new_Nil(ctx), ctx );
    kk_std_core__list   cons    = kk_std_core__new_Cons( kk_reuse_null, kk_std_core__list_box(postlist,ctx), kk_std_core__new_Nil(ctx), ctx );
    if (tail==NULL) res = cons;
              else *tail = cons;  
  }

done:  
  if (match_data != NULL) {
    //kk_info_message( "free match data: %p\n", match_data );
    pcre2_match_data_free(match_data);
  }
  kk_string_drop(str,ctx);
  kk_box_drop(bre,ctx);
  return res;
}

/*
kk_std_core__sslice kk_slice_upto( struct kk_std_core_Sslice slice1, struct kk_std_core_Sslice slice2, kk_context_t* ctx ) {
  kk_ssize_t start = slice1.start;
  kk_ssize_t len   = (slice1.start <= slice2.start ? slice2.start - slice1.start : -1);
  return kk_std_core__new_Sslice(slice1.str, start, len, ctx);
}
*/

kk_std_text_regex__regex kk_std_text_regex__copy(kk_std_text_regex__regex _this, kk_std_core_types__optional obj0, kk_std_core_types__optional src0, kk_context_t* _ctx) { /* (regex, obj : optional<any>, src : optional<string>) -> regex */ 
  kk_box_t _x1237;
  if (kk_std_core_types__is_Optional(obj0)) {
    kk_box_t _box_x1067 = obj0._cons.Optional.value;
    kk_box_t _obj_104 = kk_box_unbox(_box_x1067, NULL);
    _x1237 = _obj_104; /*any*/
  }
  else {
    kk_box_t _x = _this.obj;
    kk_box_dup(_x);
    _x1237 = _x; /*any*/
  }
  kk_string_t _x1239;
  if (kk_std_core_types__is_Optional(src0)) {
    kk_box_t _box_x1068 = src0._cons.Optional.value;
    kk_string_t _src_110 = kk_string_unbox(_box_x1068);
    kk_std_text_regex__regex_drop(_this, _ctx);
    _x1239 = _src_110; /*string*/
  }
  else {
    kk_string_t _x0 = _this.src;
    kk_string_dup(_x0);
    kk_std_text_regex__regex_drop(_this, _ctx);
    _x1239 = _x0; /*string*/
  }
  return kk_std_text_regex__new_Regex(_x1237, _x1239, _ctx);
}
 
// Return the full matched string of a capture group

kk_string_t kk_std_text_regex_captured(kk_std_core__list matched0, kk_context_t* _ctx) { /* (matched : list<sslice>) -> string */ 
  if (kk_std_core__is_Cons(matched0)) {
    struct kk_std_core_Cons* _con1241 = kk_std_core__as_Cons(matched0);
    kk_box_t _box_x1069 = _con1241->head;
    kk_std_core__list _pat3 = _con1241->tail;
    kk_std_core__sslice s = kk_std_core__sslice_unbox(_box_x1069, NULL);
    if (kk_likely(kk_std_core__list_is_unique(matched0))) {
      kk_std_core__list_drop(_pat3, _ctx);
      kk_std_core__sslice_dup(s);
      kk_box_drop(_box_x1069, _ctx);
      kk_std_core__list_free(matched0, _ctx);
    }
    else {
      kk_std_core__sslice_dup(s);
      kk_std_core__list_decref(matched0, _ctx);
    }
    return kk_std_core_string_3(s, _ctx);
  }
  {
    return kk_string_empty();
  }
}

kk_std_core__list kk_std_text_regex_regex_exec(kk_box_t regex0, kk_string_t str, kk_ssize_t start, kk_context_t* _ctx) { /* (regex : any, str : string, start : ssize_t) -> list<sslice> */ 
  return kk_regex_exec(regex0,str,start,kk_context());
}

kk_std_core__list kk_std_text_regex_regex_exec_all(kk_box_t regex0, kk_string_t str, kk_ssize_t start, kk_ssize_t atmost, kk_context_t* _ctx) { /* (regex : any, str : string, start : ssize_t, atmost : ssize_t) -> list<list<sslice>> */ 
  return kk_regex_exec_all(regex0,str,start,atmost,kk_context());
}

kk_box_t kk_std_text_regex_regex_create(kk_string_t source0, bool ignore_case, bool multi_line, kk_context_t* _ctx) { /* (source : string, ignore-case : bool, multi-line : bool) -> any */ 
  return kk_regex_create(source0,ignore_case,multi_line,kk_context());
}
extern kk_box_t kk_std_text_regex_captures_fun1246(kk_function_t _fself, kk_box_t _b_1072, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x1247;
  kk_std_core__list _x1248 = kk_std_core__list_unbox(_b_1072, _ctx); /*list<sslice>*/
  _x1247 = kk_std_text_regex_captured(_x1248, _ctx); /*string*/
  return kk_string_box(_x1247);
}
 
// monadic lift

kk_string_t kk_std_text_regex__mlift1030_concat_replace(kk_std_core__list acc, kk_std_core__list mm, kk_std_core__list pre, kk_function_t repl, kk_string_t _y_1018, kk_context_t* _ctx) { /* forall<e> (acc : list<string>, mm : list<list<sslice>>, pre : list<sslice>, repl : (list<sslice>) -> e string, string) -> e string */ 
  kk_string_t _b_1082_1076;
  if (kk_std_core__is_Cons(pre)) {
    struct kk_std_core_Cons* _con1249 = kk_std_core__as_Cons(pre);
    kk_box_t _box_x1075 = _con1249->head;
    kk_std_core__list _pat3 = _con1249->tail;
    kk_std_core__sslice s = kk_std_core__sslice_unbox(_box_x1075, NULL);
    if (kk_likely(kk_std_core__list_is_unique(pre))) {
      kk_std_core__list_drop(_pat3, _ctx);
      kk_std_core__sslice_dup(s);
      kk_box_drop(_box_x1075, _ctx);
      kk_std_core__list_free(pre, _ctx);
    }
    else {
      kk_std_core__sslice_dup(s);
      kk_std_core__list_decref(pre, _ctx);
    }
    _b_1082_1076 = kk_std_core_string_3(s, _ctx); /*string*/
  }
  else {
    _b_1082_1076 = kk_string_empty(); /*string*/
  }
  kk_std_core__list _x1252;
  kk_std_core__list _x1253 = kk_std_core__new_Cons(kk_reuse_null, kk_string_box(_b_1082_1076), acc, _ctx); /*list<1009>*/
  _x1252 = kk_std_core__new_Cons(kk_reuse_null, kk_string_box(_y_1018), _x1253, _ctx); /*list<1009>*/
  return kk_std_text_regex_concat_replace(mm, repl, _x1252, _ctx);
}


// lift anonymous function
struct kk_std_text_regex_concat_replace_fun1260__t {
  struct kk_function_s _base;
  kk_std_core__list acc0;
  kk_std_core__list mm0;
  kk_std_core__list pre0;
  kk_function_t repl0;
};
static kk_box_t kk_std_text_regex_concat_replace_fun1260(kk_function_t _fself, kk_box_t _b_1087, kk_context_t* _ctx);
static kk_function_t kk_std_text_regex_new_concat_replace_fun1260(kk_std_core__list acc0, kk_std_core__list mm0, kk_std_core__list pre0, kk_function_t repl0, kk_context_t* _ctx) {
  struct kk_std_text_regex_concat_replace_fun1260__t* _self = kk_function_alloc_as(struct kk_std_text_regex_concat_replace_fun1260__t, 5, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_regex_concat_replace_fun1260, kk_context());
  _self->acc0 = acc0;
  _self->mm0 = mm0;
  _self->pre0 = pre0;
  _self->repl0 = repl0;
  return &_self->_base;
}

static kk_box_t kk_std_text_regex_concat_replace_fun1260(kk_function_t _fself, kk_box_t _b_1087, kk_context_t* _ctx) {
  struct kk_std_text_regex_concat_replace_fun1260__t* _self = kk_function_as(struct kk_std_text_regex_concat_replace_fun1260__t*, _fself);
  kk_std_core__list acc0 = _self->acc0; /* list<string> */
  kk_std_core__list mm0 = _self->mm0; /* list<list<sslice>> */
  kk_std_core__list pre0 = _self->pre0; /* list<sslice> */
  kk_function_t repl0 = _self->repl0; /* (list<sslice>) -> 321 string */
  kk_drop_match(_self, {kk_std_core__list_dup(acc0);kk_std_core__list_dup(mm0);kk_std_core__list_dup(pre0);kk_function_dup(repl0);}, {}, _ctx)
  kk_string_t _y_1106_10180 = kk_string_unbox(_b_1087); /*string*/;
  kk_string_t _x1261 = kk_std_text_regex__mlift1030_concat_replace(acc0, mm0, pre0, repl0, _y_1106_10180, _ctx); /*string*/
  return kk_string_box(_x1261);
}

kk_string_t kk_std_text_regex_concat_replace(kk_std_core__list matches, kk_function_t repl0, kk_std_core__list acc0, kk_context_t* _ctx) { /* forall<e> (matches : list<list<sslice>>, repl : (list<sslice>) -> e string, acc : list<string>) -> e string */ 
  kk__tailcall: ;
  if (kk_std_core__is_Cons(matches)) {
    struct kk_std_core_Cons* _con1254 = kk_std_core__as_Cons(matches);
    kk_box_t _box_x1084 = _con1254->head;
    kk_std_core__list _pat0 = _con1254->tail;
    if (kk_std_core__is_Cons(_pat0)) {
      struct kk_std_core_Cons* _con1256 = kk_std_core__as_Cons(_pat0);
      kk_std_core__list pre0 = kk_std_core__list_unbox(_box_x1084, NULL);
      kk_box_t _box_x1085 = _con1256->head;
      kk_std_core__list mm0 = _con1256->tail;
      kk_std_core__list m = kk_std_core__list_unbox(_box_x1085, NULL);
      kk_reuse_t _ru_1219 = kk_reuse_null; /*reuse*/;
      kk_reuse_t _ru_1218 = kk_reuse_null; /*reuse*/;
      if (kk_likely(kk_std_core__list_is_unique(matches))) {
        if (kk_likely(kk_std_core__list_is_unique(_pat0))) {
          _ru_1218 = (kk_std_core__list_reuse(_pat0));
        }
        else {
          kk_std_core__list_dup(m);
          kk_std_core__list_dup(mm0);
          kk_std_core__list_decref(_pat0, _ctx);
        }
        _ru_1219 = (kk_std_core__list_reuse(matches));
      }
      else {
        kk_std_core__list_dup(m);
        kk_std_core__list_dup(mm0);
        kk_std_core__list_dup(pre0);
        kk_std_core__list_decref(matches, _ctx);
      }
      kk_string_t x_1031;
      kk_function_t _x1258 = kk_function_dup(repl0); /*(list<sslice>) -> 321 string*/
      x_1031 = kk_function_call(kk_string_t, (kk_function_t, kk_std_core__list, kk_context_t*), _x1258, (_x1258, m, _ctx)); /*string*/
      if (kk_yielding(kk_context())) {
        kk_reuse_drop(_ru_1218,kk_context());
        kk_reuse_drop(_ru_1219,kk_context());
        kk_string_drop(x_1031, _ctx);
        kk_box_t _x1259 = kk_std_core_hnd_yield_extend(kk_std_text_regex_new_concat_replace_fun1260(acc0, mm0, pre0, repl0, _ctx), _ctx); /*1001*/
        return kk_string_unbox(_x1259);
      }
      {
        kk_string_t _b_1104_1089;
        if (kk_std_core__is_Cons(pre0)) {
          struct kk_std_core_Cons* _con1262 = kk_std_core__as_Cons(pre0);
          kk_box_t _box_x1088 = _con1262->head;
          kk_std_core__list _pat30 = _con1262->tail;
          kk_std_core__sslice s0 = kk_std_core__sslice_unbox(_box_x1088, NULL);
          if (kk_likely(kk_std_core__list_is_unique(pre0))) {
            kk_std_core__list_drop(_pat30, _ctx);
            kk_std_core__sslice_dup(s0);
            kk_box_drop(_box_x1088, _ctx);
            kk_std_core__list_free(pre0, _ctx);
          }
          else {
            kk_std_core__sslice_dup(s0);
            kk_std_core__list_decref(pre0, _ctx);
          }
          _b_1104_1089 = kk_std_core_string_3(s0, _ctx); /*string*/
        }
        else {
          _b_1104_1089 = kk_string_empty(); /*string*/
        }
        { // tailcall
          kk_std_core__list _x1265;
          kk_std_core__list _x1266 = kk_std_core__new_Cons(_ru_1219, kk_string_box(_b_1104_1089), acc0, _ctx); /*list<1009>*/
          _x1265 = kk_std_core__new_Cons(_ru_1218, kk_string_box(x_1031), _x1266, _ctx); /*list<1009>*/
          matches = mm0;
          acc0 = _x1265;
          goto kk__tailcall;
        }
      }
    }
  }
  if (kk_std_core__is_Cons(matches)) {
    struct kk_std_core_Cons* _con1267 = kk_std_core__as_Cons(matches);
    kk_box_t _box_x1093 = _con1267->head;
    kk_std_core__list _pat200 = _con1267->tail;
    kk_std_core__list post = kk_std_core__list_unbox(_box_x1093, NULL);
    kk_function_drop(repl0, _ctx);
    kk_reuse_t _ru_1221 = kk_reuse_null; /*reuse*/;
    if (kk_likely(kk_std_core__list_is_unique(matches))) {
      _ru_1221 = (kk_std_core__list_reuse(matches));
    }
    else {
      kk_std_core__list_dup(post);
      kk_std_core__list_decref(matches, _ctx);
    }
    kk_string_t _b_1097_1095;
    if (kk_std_core__is_Cons(post)) {
      struct kk_std_core_Cons* _con1269 = kk_std_core__as_Cons(post);
      kk_box_t _box_x1094 = _con1269->head;
      kk_std_core__list _pat300 = _con1269->tail;
      kk_std_core__sslice s00 = kk_std_core__sslice_unbox(_box_x1094, NULL);
      if (kk_likely(kk_std_core__list_is_unique(post))) {
        kk_std_core__list_drop(_pat300, _ctx);
        kk_std_core__sslice_dup(s00);
        kk_box_drop(_box_x1094, _ctx);
        kk_std_core__list_free(post, _ctx);
      }
      else {
        kk_std_core__sslice_dup(s00);
        kk_std_core__list_decref(post, _ctx);
      }
      _b_1097_1095 = kk_std_core_string_3(s00, _ctx); /*string*/
    }
    else {
      _b_1097_1095 = kk_string_empty(); /*string*/
    }
    kk_std_core__list xs0_17151;
    kk_std_core__list _x1272 = kk_std_core__new_Cons(_ru_1221, kk_string_box(_b_1097_1095), acc0, _ctx); /*list<1009>*/
    xs0_17151 = kk_std_core__lift17200_reverse_join(kk_std_core__new_Nil(_ctx), _x1272, _ctx); /*list<string>*/
    if (kk_std_core__is_Nil(xs0_17151)) {
      return kk_string_empty();
    }
    {
      struct kk_std_core_Cons* _con1274 = kk_std_core__as_Cons(xs0_17151);
      kk_box_t _box_x1099 = _con1274->head;
      kk_std_core__list xx0 = _con1274->tail;
      kk_string_t x0 = kk_string_unbox(_box_x1099);
      if (kk_likely(kk_std_core__list_is_unique(xs0_17151))) {
        kk_std_core__list_free(xs0_17151, _ctx);
      }
      else {
        kk_string_dup(x0);
        kk_std_core__list_dup(xx0);
        kk_std_core__list_decref(xs0_17151, _ctx);
      }
      return kk_std_core__lift17201_reverse_join(xx0, x0, _ctx);
    }
  }
  {
    kk_function_drop(repl0, _ctx);
    kk_std_core__list xs0_171510 = kk_std_core__lift17200_reverse_join(kk_std_core__new_Nil(_ctx), acc0, _ctx); /*list<string>*/;
    if (kk_std_core__is_Nil(xs0_171510)) {
      return kk_string_empty();
    }
    {
      struct kk_std_core_Cons* _con1277 = kk_std_core__as_Cons(xs0_171510);
      kk_box_t _box_x1100 = _con1277->head;
      kk_std_core__list xx00 = _con1277->tail;
      kk_string_t x00 = kk_string_unbox(_box_x1100);
      if (kk_likely(kk_std_core__list_is_unique(xs0_171510))) {
        kk_std_core__list_free(xs0_171510, _ctx);
      }
      else {
        kk_string_dup(x00);
        kk_std_core__list_dup(xx00);
        kk_std_core__list_decref(xs0_171510, _ctx);
      }
      return kk_std_core__lift17201_reverse_join(xx00, x00, _ctx);
    }
  }
}
 
// Does a regular expression pattern occur in a string `s`?
// (note: called `test` in javascript)

bool kk_std_text_regex_contains(kk_string_t s, kk_std_text_regex__regex r, kk_context_t* _ctx) { /* (s : string, r : regex) -> bool */ 
  kk_std_core__list list0_968;
  kk_box_t _x1281;
  {
    kk_box_t _x = r.obj;
    kk_box_dup(_x);
    kk_std_text_regex__regex_drop(r, _ctx);
    _x1281 = _x; /*any*/
  }
  kk_ssize_t _x1282 = (KK_IZ(0)); /*ssize_t*/
  list0_968 = kk_std_text_regex_regex_exec(_x1281, s, _x1282, _ctx); /*list<sslice>*/
  if (kk_std_core__is_Cons(list0_968)) {
    struct kk_std_core_Cons* _con1283 = kk_std_core__as_Cons(list0_968);
    kk_box_t _box_x1107 = _con1283->head;
    kk_std_core__list _pat1 = _con1283->tail;
    if (kk_likely(kk_std_core__list_is_unique(list0_968))) {
      kk_std_core__list_drop(_pat1, _ctx);
      kk_box_drop(_box_x1107, _ctx);
      kk_std_core__list_free(list0_968, _ctx);
    }
    else {
      kk_std_core__list_decref(list0_968, _ctx);
    }
    return true;
  }
  {
    return false;
  }
}
 
// Match a regular expression `regex` over a string `s`.
// Matches at most `atmost` times (and matches all by default).
// Returns always an odd number of elements where every even
// element is a match and the odd ones the string parts between the
// matches.
// See also `find-all` and `strings`.

kk_std_core__list kk_std_text_regex_exec_all(kk_std_text_regex__regex regex0, kk_string_t s, kk_std_core_types__optional atmost, kk_context_t* _ctx) { /* (regex : regex, s : string, atmost : optional<int>) -> list<list<sslice>> */ 
  kk_box_t _x1285;
  {
    kk_box_t _x = regex0.obj;
    kk_box_dup(_x);
    kk_std_text_regex__regex_drop(regex0, _ctx);
    _x1285 = _x; /*any*/
  }
  kk_ssize_t _x1286 = (KK_IZ(0)); /*ssize_t*/
  kk_ssize_t _x1287;
  kk_integer_t _x1288;
  if (kk_std_core_types__is_Optional(atmost)) {
    kk_box_t _box_x1108 = atmost._cons.Optional.value;
    kk_integer_t _atmost_345 = kk_integer_unbox(_box_x1108);
    _x1288 = _atmost_345; /*int*/
  }
  else {
    _x1288 = kk_integer_from_small(-1); /*int*/
  }
  _x1287 = kk_std_core_ssize__t(_x1288, _ctx); /*ssize_t*/
  return kk_std_text_regex_regex_exec_all(_x1285, s, _x1286, _x1287, _ctx);
}
 
// Filter only for the matched parts.

kk_std_core__list kk_std_text_regex__ctail_filter_matches(kk_std_core__list xs, kk_std_core_types__ctail _acc, kk_context_t* _ctx) { /* (xs : list<list<sslice>>, ctail<list<list<sslice>>>) -> list<list<sslice>> */ 
  kk__tailcall: ;
  if (kk_std_core__is_Cons(xs)) {
    struct kk_std_core_Cons* _con1290 = kk_std_core__as_Cons(xs);
    kk_box_t _box_x1109 = _con1290->head;
    kk_std_core__list _pat1 = _con1290->tail;
    if (kk_std_core__is_Cons(_pat1)) {
      struct kk_std_core_Cons* _con1292 = kk_std_core__as_Cons(_pat1);
      kk_box_t _box_x1110 = _con1292->head;
      kk_std_core__list mm = _con1292->tail;
      kk_std_core__list m = kk_std_core__list_unbox(_box_x1110, NULL);
      kk_reuse_t _ru_1227 = kk_reuse_null; /*reuse*/;
      if (kk_likely(kk_std_core__list_is_unique(xs))) {
        if (kk_likely(kk_std_core__list_is_unique(_pat1))) {
          kk_std_core__list_free(_pat1, _ctx);
        }
        else {
          kk_std_core__list_dup(m);
          kk_std_core__list_dup(mm);
          kk_std_core__list_decref(_pat1, _ctx);
        }
        kk_box_drop(_box_x1109, _ctx);
        _ru_1227 = (kk_std_core__list_reuse(xs));
      }
      else {
        kk_std_core__list_dup(m);
        kk_std_core__list_dup(mm);
        kk_std_core__list_decref(xs, _ctx);
      }
      kk_std_core__list _ctail_1014 = kk_std_core__list_hole(); /*list<list<sslice>>*/;
      kk_std_core__list _ctail_1015 = kk_std_core__new_Cons(_ru_1227, kk_std_core__list_box(m, _ctx), _ctail_1014, _ctx); /*list<list<sslice>>*/;
      kk_box_t* _b_1125_1120 = (kk_box_t*)((&kk_std_core__as_Cons(_ctail_1015)->tail)); /*cfield<list<list<sslice>>>*/;
      { // tailcall
        kk_std_core_types__ctail _x1294 = kk_ctail_link(_acc,(kk_std_core__list_box(_ctail_1015, _ctx)),_b_1125_1120); /*ctail<0>*/
        xs = mm;
        _acc = _x1294;
        goto kk__tailcall;
      }
    }
  }
  {
    kk_std_core__list_drop(xs, _ctx);
    kk_box_t _x1295 = kk_ctail_resolve(_acc,(kk_std_core__list_box(kk_std_core__new_Nil(_ctx), _ctx))); /*-1*/
    return kk_std_core__list_unbox(_x1295, _ctx);
  }
}
 
// Filter only for the matched parts.

kk_std_core__list kk_std_text_regex_filter_matches(kk_std_core__list xs0, kk_context_t* _ctx) { /* (xs : list<list<sslice>>) -> list<list<sslice>> */ 
  kk_std_core_types__ctail _x1296 = kk_ctail_nil(); /*ctail<0>*/
  return kk_std_text_regex__ctail_filter_matches(xs0, _x1296, _ctx);
}
 
// Filter only for the non-matched parts.

kk_std_core__list kk_std_text_regex__ctail_filter_non_matches(kk_std_core__list xs, kk_std_core_types__ctail _acc, kk_context_t* _ctx) { /* (xs : list<list<sslice>>, ctail<list<list<sslice>>>) -> list<list<sslice>> */ 
  kk__tailcall: ;
  if (kk_std_core__is_Cons(xs)) {
    struct kk_std_core_Cons* _con1297 = kk_std_core__as_Cons(xs);
    kk_box_t _box_x1131 = _con1297->head;
    kk_std_core__list _pat0 = _con1297->tail;
    if (kk_std_core__is_Cons(_pat0)) {
      struct kk_std_core_Cons* _con1299 = kk_std_core__as_Cons(_pat0);
      kk_std_core__list s = kk_std_core__list_unbox(_box_x1131, NULL);
      kk_box_t _box_x1132 = _con1299->head;
      kk_std_core__list xx = _con1299->tail;
      kk_reuse_t _ru_1229 = kk_reuse_null; /*reuse*/;
      if (kk_likely(kk_std_core__list_is_unique(xs))) {
        if (kk_likely(kk_std_core__list_is_unique(_pat0))) {
          kk_box_drop(_box_x1132, _ctx);
          kk_std_core__list_free(_pat0, _ctx);
        }
        else {
          kk_std_core__list_dup(xx);
          kk_std_core__list_decref(_pat0, _ctx);
        }
        _ru_1229 = (kk_std_core__list_reuse(xs));
      }
      else {
        kk_std_core__list_dup(s);
        kk_std_core__list_dup(xx);
        kk_std_core__list_decref(xs, _ctx);
      }
      kk_std_core__list _ctail_1016 = kk_std_core__list_hole(); /*list<list<sslice>>*/;
      kk_std_core__list _ctail_1017 = kk_std_core__new_Cons(_ru_1229, kk_std_core__list_box(s, _ctx), _ctail_1016, _ctx); /*list<list<sslice>>*/;
      kk_box_t* _b_1152_1142 = (kk_box_t*)((&kk_std_core__as_Cons(_ctail_1017)->tail)); /*cfield<list<list<sslice>>>*/;
      { // tailcall
        kk_std_core_types__ctail _x1301 = kk_ctail_link(_acc,(kk_std_core__list_box(_ctail_1017, _ctx)),_b_1152_1142); /*ctail<0>*/
        xs = xx;
        _acc = _x1301;
        goto kk__tailcall;
      }
    }
  }
  if (kk_std_core__is_Cons(xs)) {
    struct kk_std_core_Cons* _con1302 = kk_std_core__as_Cons(xs);
    kk_box_t _box_x1143 = _con1302->head;
    kk_std_core__list _pat3 = _con1302->tail;
    kk_std_core__list s0 = kk_std_core__list_unbox(_box_x1143, NULL);
    kk_reuse_t _ru_1230 = kk_reuse_null; /*reuse*/;
    if (kk_likely(kk_std_core__list_is_unique(xs))) {
      _ru_1230 = (kk_std_core__list_reuse(xs));
    }
    else {
      kk_std_core__list_dup(s0);
      kk_std_core__list_decref(xs, _ctx);
    }
    kk_box_t _x1304;
    kk_box_t _x1305;
    kk_std_core__list _x1306 = kk_std_core__new_Cons(_ru_1230, kk_std_core__list_box(s0, _ctx), kk_std_core__new_Nil(_ctx), _ctx); /*list<1009>*/
    _x1305 = kk_std_core__list_box(_x1306, _ctx); /*-1*/
    _x1304 = kk_ctail_resolve(_acc,_x1305); /*-1*/
    return kk_std_core__list_unbox(_x1304, _ctx);
  }
  {
    kk_box_t _x1307 = kk_ctail_resolve(_acc,(kk_std_core__list_box(kk_std_core__new_Nil(_ctx), _ctx))); /*-1*/
    return kk_std_core__list_unbox(_x1307, _ctx);
  }
}
 
// Filter only for the non-matched parts.

kk_std_core__list kk_std_text_regex_filter_non_matches(kk_std_core__list xs0, kk_context_t* _ctx) { /* (xs : list<list<sslice>>) -> list<list<sslice>> */ 
  kk_std_core_types__ctail _x1308 = kk_ctail_nil(); /*ctail<0>*/
  return kk_std_text_regex__ctail_filter_non_matches(xs0, _x1308, _ctx);
}
 
// Find a match for a regular expression.
// See also `exec`

kk_std_core_types__maybe kk_std_text_regex_find(kk_string_t s, kk_std_text_regex__regex r, kk_context_t* _ctx) { /* (s : string, r : regex) -> maybe<string> */ 
  kk_std_core__list _match_1214;
  kk_box_t _x1309;
  {
    kk_box_t _x = r.obj;
    kk_box_dup(_x);
    kk_std_text_regex__regex_drop(r, _ctx);
    _x1309 = _x; /*any*/
  }
  kk_ssize_t _x1310 = (KK_IZ(0)); /*ssize_t*/
  _match_1214 = kk_std_text_regex_regex_exec(_x1309, s, _x1310, _ctx); /*list<sslice>*/
  if (kk_std_core__is_Cons(_match_1214)) {
    struct kk_std_core_Cons* _con1311 = kk_std_core__as_Cons(_match_1214);
    kk_box_t _box_x1162 = _con1311->head;
    kk_std_core__list _pat3 = _con1311->tail;
    kk_std_core__sslice m = kk_std_core__sslice_unbox(_box_x1162, NULL);
    if (kk_likely(kk_std_core__list_is_unique(_match_1214))) {
      kk_std_core__list_drop(_pat3, _ctx);
      kk_std_core__sslice_dup(m);
      kk_box_drop(_box_x1162, _ctx);
      kk_std_core__list_free(_match_1214, _ctx);
    }
    else {
      kk_std_core__sslice_dup(m);
      kk_std_core__list_decref(_match_1214, _ctx);
    }
    kk_string_t _b_1164_1163 = kk_std_core_string_3(m, _ctx); /*string*/;
    return kk_std_core_types__new_Just(kk_string_box(_b_1164_1163), _ctx);
  }
  {
    return kk_std_core_types__new_Nothing(_ctx);
  }
}
 
// Find all matches for a regular expression in a string.


// lift anonymous function
struct kk_std_text_regex_find_all_fun1319__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_regex_find_all_fun1319(kk_function_t _fself, kk_box_t _b_1168, kk_context_t* _ctx);
static kk_function_t kk_std_text_regex_new_find_all_fun1319(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_regex_find_all_fun1319, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_regex_find_all_fun1319(kk_function_t _fself, kk_box_t _b_1168, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x1320;
  kk_std_core__list _x1321 = kk_std_core__list_unbox(_b_1168, _ctx); /*list<sslice>*/
  _x1320 = kk_std_text_regex_captured(_x1321, _ctx); /*string*/
  return kk_string_box(_x1320);
}

kk_std_core__list kk_std_text_regex_find_all(kk_string_t s, kk_std_text_regex__regex r, kk_std_core_types__optional atmost, kk_context_t* _ctx) { /* (s : string, r : regex, atmost : optional<int>) -> list<string> */ 
  kk_std_core__list xs_976;
  kk_std_core__list _x1313;
  kk_box_t _x1314;
  {
    kk_box_t _x = r.obj;
    kk_box_dup(_x);
    kk_std_text_regex__regex_drop(r, _ctx);
    _x1314 = _x; /*any*/
  }
  kk_ssize_t _x1315 = (KK_IZ(0)); /*ssize_t*/
  kk_ssize_t _x1316;
  kk_integer_t _x1317;
  if (kk_std_core_types__is_Optional(atmost)) {
    kk_box_t _box_x1165 = atmost._cons.Optional.value;
    kk_integer_t _atmost_437 = kk_integer_unbox(_box_x1165);
    _x1317 = _atmost_437; /*int*/
  }
  else {
    _x1317 = kk_integer_from_small(-1); /*int*/
  }
  _x1316 = kk_std_core_ssize__t(_x1317, _ctx); /*ssize_t*/
  _x1313 = kk_std_text_regex_regex_exec_all(_x1314, s, _x1315, _x1316, _ctx); /*list<list<sslice>>*/
  xs_976 = kk_std_text_regex_filter_matches(_x1313, _ctx); /*list<list<sslice>>*/
  return kk_std_core_map_5(xs_976, kk_std_text_regex_new_find_all_fun1319(_ctx), _ctx);
}
 
// Replace the all occurrences of `regex` by the result of the replacement fun `repl` in a string `s`.

kk_string_t kk_std_text_regex_replace_all(kk_string_t s, kk_std_text_regex__regex r, kk_function_t repl, kk_std_core_types__optional atmost, kk_context_t* _ctx) { /* forall<e> (s : string, r : regex, repl : (list<sslice>) -> e string, atmost : optional<int>) -> e string */ 
  kk_std_core__list _x1328;
  kk_box_t _x1329;
  {
    kk_box_t _x = r.obj;
    kk_box_dup(_x);
    kk_std_text_regex__regex_drop(r, _ctx);
    _x1329 = _x; /*any*/
  }
  kk_ssize_t _x1330 = (KK_IZ(0)); /*ssize_t*/
  kk_ssize_t _x1331;
  kk_integer_t _x1332;
  if (kk_std_core_types__is_Optional(atmost)) {
    kk_box_t _box_x1173 = atmost._cons.Optional.value;
    kk_integer_t _atmost_475 = kk_integer_unbox(_box_x1173);
    _x1332 = _atmost_475; /*int*/
  }
  else {
    _x1332 = kk_integer_from_small(-1); /*int*/
  }
  _x1331 = kk_std_core_ssize__t(_x1332, _ctx); /*ssize_t*/
  _x1328 = kk_std_text_regex_regex_exec_all(_x1329, s, _x1330, _x1331, _ctx); /*list<list<sslice>>*/
  return kk_std_text_regex_concat_replace(_x1328, repl, kk_std_core__new_Nil(_ctx), _ctx);
}
 
// Replace using a replacement string that can contain `$$` for a `$` sign, `$n` for a capture group,
// `$&` for the entire match `==$0`.


// lift anonymous function
struct kk_std_text_regex_replace_captures_fun1352__t {
  struct kk_function_s _base;
  kk_std_core__list caps;
};
static kk_string_t kk_std_text_regex_replace_captures_fun1352(kk_function_t _fself, kk_std_core__list cap, kk_context_t* _ctx);
static kk_function_t kk_std_text_regex_new_replace_captures_fun1352(kk_std_core__list caps, kk_context_t* _ctx) {
  struct kk_std_text_regex_replace_captures_fun1352__t* _self = kk_function_alloc_as(struct kk_std_text_regex_replace_captures_fun1352__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_regex_replace_captures_fun1352, kk_context());
  _self->caps = caps;
  return &_self->_base;
}

static kk_string_t kk_std_text_regex_replace_captures_fun1352(kk_function_t _fself, kk_std_core__list cap, kk_context_t* _ctx) {
  struct kk_std_text_regex_replace_captures_fun1352__t* _self = kk_function_as(struct kk_std_text_regex_replace_captures_fun1352__t*, _fself);
  kk_std_core__list caps = _self->caps; /* list<sslice> */
  kk_drop_match(_self, {kk_std_core__list_dup(caps);}, {}, _ctx)
  if (kk_std_core__is_Cons(cap)) {
    struct kk_std_core_Cons* _con1353 = kk_std_core__as_Cons(cap);
    kk_box_t _box_x1177 = _con1353->head;
    kk_std_core__list _pat4 = _con1353->tail;
    if (kk_std_core__is_Cons(_pat4)) {
      struct kk_std_core_Cons* _con1355 = kk_std_core__as_Cons(_pat4);
      kk_std_core__sslice _pat000 = kk_std_core__sslice_unbox(_box_x1177, NULL);
      kk_box_t _box_x1178 = _con1355->head;
      kk_std_core__list _pat8 = _con1355->tail;
      if (kk_std_core__is_Cons(_pat8)) {
        struct kk_std_core_Cons* _con1357 = kk_std_core__as_Cons(_pat8);
        kk_std_core__sslice digit = kk_std_core__sslice_unbox(_box_x1178, NULL);
        kk_box_t _box_x1179 = _con1357->head;
        kk_std_core__list _pat12 = _con1357->tail;
        if (kk_std_core__is_Cons(_pat12)) {
          struct kk_std_core_Cons* _con1359 = kk_std_core__as_Cons(_pat12);
          kk_std_core__sslice amp = kk_std_core__sslice_unbox(_box_x1179, NULL);
          kk_box_t _box_x1180 = _con1359->head;
          kk_std_core__list _pat16 = _con1359->tail;
          if (kk_std_core__is_Nil(_pat16)) {
            kk_std_core__sslice dollar = kk_std_core__sslice_unbox(_box_x1180, NULL);
            if (kk_likely(kk_std_core__list_is_unique(cap))) {
              if (kk_likely(kk_std_core__list_is_unique(_pat4))) {
                if (kk_likely(kk_std_core__list_is_unique(_pat8))) {
                  if (kk_likely(kk_std_core__list_is_unique(_pat12))) {
                    kk_std_core__sslice_dup(dollar);
                    kk_box_drop(_box_x1180, _ctx);
                    kk_std_core__list_free(_pat12, _ctx);
                  }
                  else {
                    kk_std_core__sslice_dup(dollar);
                    kk_std_core__list_decref(_pat12, _ctx);
                  }
                  kk_std_core__sslice_dup(amp);
                  kk_box_drop(_box_x1179, _ctx);
                  kk_std_core__list_free(_pat8, _ctx);
                }
                else {
                  kk_std_core__sslice_dup(amp);
                  kk_std_core__sslice_dup(dollar);
                  kk_std_core__list_decref(_pat8, _ctx);
                }
                kk_std_core__sslice_dup(digit);
                kk_box_drop(_box_x1178, _ctx);
                kk_std_core__list_free(_pat4, _ctx);
              }
              else {
                kk_std_core__sslice_dup(amp);
                kk_std_core__sslice_dup(digit);
                kk_std_core__sslice_dup(dollar);
                kk_std_core__list_decref(_pat4, _ctx);
              }
              kk_box_drop(_box_x1177, _ctx);
              kk_std_core__list_free(cap, _ctx);
            }
            else {
              kk_std_core__sslice_dup(amp);
              kk_std_core__sslice_dup(digit);
              kk_std_core__sslice_dup(dollar);
              kk_std_core__list_decref(cap, _ctx);
            }
            bool _match_1208;
            kk_ssize_t _x1361;
            {
              kk_ssize_t _x0 = dollar.start;
              kk_std_core__sslice_drop(dollar, _ctx);
              _x1361 = _x0; /*ssize_t*/
            }
            kk_ssize_t _x1362 = (KK_IZ(0)); /*ssize_t*/
            _match_1208 = (_x1361 >= _x1362); /*bool*/
            if (_match_1208) {
              kk_std_core__sslice_drop(digit, _ctx);
              kk_std_core__list_drop(caps, _ctx);
              kk_std_core__sslice_drop(amp, _ctx);
              kk_define_string_literal(, _s1363, 1, "$")
              return kk_string_dup(_s1363);
            }
            {
              kk_integer_t grp;
              bool _match_1210;
              kk_ssize_t _x1364;
              {
                kk_ssize_t _x00 = amp.start;
                kk_std_core__sslice_drop(amp, _ctx);
                _x1364 = _x00; /*ssize_t*/
              }
              kk_ssize_t _x1365 = (KK_IZ(0)); /*ssize_t*/
              _match_1210 = (_x1364 >= _x1365); /*bool*/
              if (_match_1210) {
                kk_std_core__sslice_drop(digit, _ctx);
                grp = kk_integer_from_small(0); /*int*/
              }
              else {
                kk_string_t _x1366 = kk_std_core_string_3(digit, _ctx); /*string*/
                kk_std_core_types__optional _x1367 = kk_std_core_types__new_Optional(kk_integer_box(kk_integer_from_small(0)), _ctx); /*optional<1035>*/
                grp = kk_std_core_parse_int_default(_x1366, _x1367, kk_std_core_types__new_None(_ctx), _ctx); /*int*/
              }
              kk_std_core_types__maybe _match_1209 = kk_std_core__lp__lb__rb__2_rp_(caps, grp, _ctx); /*maybe<1001>*/;
              if (kk_std_core_types__is_Nothing(_match_1209)) {
                return kk_string_empty();
              }
              {
                kk_box_t _box_x1183 = _match_1209._cons.Just.value;
                kk_std_core__sslice s0 = kk_std_core__sslice_unbox(_box_x1183, NULL);
                kk_std_core__sslice_dup(s0);
                kk_std_core_types__maybe_drop(_match_1209, _ctx);
                return kk_std_core_string_3(s0, _ctx);
              }
            }
          }
        }
      }
    }
  }
  {
    kk_std_core__list_drop(caps, _ctx);
    kk_std_core__list_drop(cap, _ctx);
    kk_define_string_literal(, _s1370, 1, "$")
    return kk_string_dup(_s1370);
  }
}

kk_string_t kk_std_text_regex_replace_captures(kk_std_core__list caps, kk_string_t repl, kk_context_t* _ctx) { /* (caps : list<sslice>, repl : string) -> string */ 
  kk_std_text_regex__regex r_1035;
  kk_box_t _x1334;
  kk_string_t _x1335;
  kk_define_string_literal(, _s1336, 20, "\\$(\?:(\\d)|(\\&)|(\\$))")
  _x1335 = kk_string_dup(_s1336); /*string*/
  bool _x1337;
  kk_std_core_types__optional _x1338 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x1338)) {
    kk_box_t _box_x1174 = _x1338._cons.Optional.value;
    bool _ignorecase_455 = kk_bool_unbox(_box_x1174);
    _x1337 = _ignorecase_455; /*bool*/
  }
  else {
    _x1337 = false; /*bool*/
  }
  bool _x1340;
  kk_std_core_types__optional _x1341 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x1341)) {
    kk_box_t _box_x1175 = _x1341._cons.Optional.value;
    bool _multiline_459 = kk_bool_unbox(_box_x1175);
    _x1340 = _multiline_459; /*bool*/
  }
  else {
    _x1340 = false; /*bool*/
  }
  _x1334 = kk_std_text_regex_regex_create(_x1335, _x1337, _x1340, _ctx); /*any*/
  kk_string_t _x1343;
  kk_define_string_literal(, _s1344, 20, "\\$(\?:(\\d)|(\\&)|(\\$))")
  _x1343 = kk_string_dup(_s1344); /*string*/
  r_1035 = kk_std_text_regex__new_Regex(_x1334, _x1343, _ctx); /*std/text/regex/regex*/
  kk_std_core__list _x1345;
  kk_box_t _x1346;
  {
    kk_box_t _x = r_1035.obj;
    kk_box_dup(_x);
    kk_std_text_regex__regex_drop(r_1035, _ctx);
    _x1346 = _x; /*any*/
  }
  kk_ssize_t _x1347 = (KK_IZ(0)); /*ssize_t*/
  kk_ssize_t _x1348;
  kk_integer_t _x1349;
  kk_std_core_types__optional _x1350 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x1350)) {
    kk_box_t _box_x1176 = _x1350._cons.Optional.value;
    kk_integer_t _atmost_475 = kk_integer_unbox(_box_x1176);
    _x1349 = _atmost_475; /*int*/
  }
  else {
    _x1349 = kk_integer_from_small(-1); /*int*/
  }
  _x1348 = kk_std_core_ssize__t(_x1349, _ctx); /*ssize_t*/
  _x1345 = kk_std_text_regex_regex_exec_all(_x1346, repl, _x1347, _x1348, _ctx); /*list<list<sslice>>*/
  return kk_std_text_regex_concat_replace(_x1345, kk_std_text_regex_new_replace_captures_fun1352(caps, _ctx), kk_std_core__new_Nil(_ctx), _ctx);
}
 
// Replace all occurrences of `regex` with the replacement string `repl` in a string `s`.
// The replacement string can contain `$$` for a `$` sign, `$n` for a capture group,
// `$&` for the entire match `==$0`.


// lift anonymous function
struct kk_std_text_regex_replace_all_fun1380__t_1 {
  struct kk_function_s _base;
  kk_string_t repl;
};
static kk_string_t kk_std_text_regex_replace_all_fun1380_1(kk_function_t _fself, kk_std_core__list caps, kk_context_t* _ctx);
static kk_function_t kk_std_text_regex_new_replace_all_fun1380_1(kk_string_t repl, kk_context_t* _ctx) {
  struct kk_std_text_regex_replace_all_fun1380__t_1* _self = kk_function_alloc_as(struct kk_std_text_regex_replace_all_fun1380__t_1, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_regex_replace_all_fun1380_1, kk_context());
  _self->repl = repl;
  return &_self->_base;
}

static kk_string_t kk_std_text_regex_replace_all_fun1380_1(kk_function_t _fself, kk_std_core__list caps, kk_context_t* _ctx) {
  struct kk_std_text_regex_replace_all_fun1380__t_1* _self = kk_function_as(struct kk_std_text_regex_replace_all_fun1380__t_1*, _fself);
  kk_string_t repl = _self->repl; /* string */
  kk_drop_match(_self, {kk_string_dup(repl);}, {}, _ctx)
  return kk_std_text_regex_replace_captures(caps, repl, _ctx);
}


// lift anonymous function
struct kk_std_text_regex_replace_all_fun1387__t_1 {
  struct kk_function_s _base;
  kk_string_t repl;
};
static kk_string_t kk_std_text_regex_replace_all_fun1387_1(kk_function_t _fself, kk_std_core__list ___wildcard__158__35, kk_context_t* _ctx);
static kk_function_t kk_std_text_regex_new_replace_all_fun1387_1(kk_string_t repl, kk_context_t* _ctx) {
  struct kk_std_text_regex_replace_all_fun1387__t_1* _self = kk_function_alloc_as(struct kk_std_text_regex_replace_all_fun1387__t_1, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_regex_replace_all_fun1387_1, kk_context());
  _self->repl = repl;
  return &_self->_base;
}

static kk_string_t kk_std_text_regex_replace_all_fun1387_1(kk_function_t _fself, kk_std_core__list ___wildcard__158__35, kk_context_t* _ctx) {
  struct kk_std_text_regex_replace_all_fun1387__t_1* _self = kk_function_as(struct kk_std_text_regex_replace_all_fun1387__t_1*, _fself);
  kk_string_t repl = _self->repl; /* string */
  kk_drop_match(_self, {kk_string_dup(repl);}, {}, _ctx)
  kk_std_core__list_drop(___wildcard__158__35, _ctx);
  return repl;
}

kk_string_t kk_std_text_regex_replace_all_1(kk_string_t s, kk_std_text_regex__regex regex0, kk_string_t repl, kk_std_core_types__optional atmost, kk_context_t* _ctx) { /* (s : string, regex : regex, repl : string, atmost : optional<int>) -> string */ 
  bool _match_1207;
  kk_string_t _x1371 = kk_string_dup(repl); /*string*/
  kk_string_t _x1372;
  kk_define_string_literal(, _s1373, 1, "$")
  _x1372 = kk_string_dup(_s1373); /*string*/
  _match_1207 = kk_string_contains(_x1371,_x1372,kk_context()); /*bool*/
  if (_match_1207) {
    kk_std_core__list _x1374;
    kk_box_t _x1375;
    {
      kk_box_t _x = regex0.obj;
      kk_box_dup(_x);
      kk_std_text_regex__regex_drop(regex0, _ctx);
      _x1375 = _x; /*any*/
    }
    kk_ssize_t _x1376 = (KK_IZ(0)); /*ssize_t*/
    kk_ssize_t _x1377;
    kk_integer_t _x1378;
    if (kk_std_core_types__is_Optional(atmost)) {
      kk_box_t _box_x1184 = atmost._cons.Optional.value;
      kk_integer_t _atmost_496 = kk_integer_unbox(_box_x1184);
      _x1378 = _atmost_496; /*int*/
    }
    else {
      _x1378 = kk_integer_from_small(-1); /*int*/
    }
    _x1377 = kk_std_core_ssize__t(_x1378, _ctx); /*ssize_t*/
    _x1374 = kk_std_text_regex_regex_exec_all(_x1375, s, _x1376, _x1377, _ctx); /*list<list<sslice>>*/
    return kk_std_text_regex_concat_replace(_x1374, kk_std_text_regex_new_replace_all_fun1380_1(repl, _ctx), kk_std_core__new_Nil(_ctx), _ctx);
  }
  {
    kk_std_core__list _x1381;
    kk_box_t _x1382;
    {
      kk_box_t _x0 = regex0.obj;
      kk_box_dup(_x0);
      kk_std_text_regex__regex_drop(regex0, _ctx);
      _x1382 = _x0; /*any*/
    }
    kk_ssize_t _x1383 = (KK_IZ(0)); /*ssize_t*/
    kk_ssize_t _x1384;
    kk_integer_t _x1385;
    if (kk_std_core_types__is_Optional(atmost)) {
      kk_box_t _box_x1185 = atmost._cons.Optional.value;
      kk_integer_t _atmost_4960 = kk_integer_unbox(_box_x1185);
      _x1385 = _atmost_4960; /*int*/
    }
    else {
      _x1385 = kk_integer_from_small(-1); /*int*/
    }
    _x1384 = kk_std_core_ssize__t(_x1385, _ctx); /*ssize_t*/
    _x1381 = kk_std_text_regex_regex_exec_all(_x1382, s, _x1383, _x1384, _ctx); /*list<list<sslice>>*/
    return kk_std_text_regex_concat_replace(_x1381, kk_std_text_regex_new_replace_all_fun1387_1(repl, _ctx), kk_std_core__new_Nil(_ctx), _ctx);
  }
}

kk_std_text_regex__regex kk_std_text_regex_rx_nongroup;
 
// How many groups are captured by this regex?


// lift anonymous function
struct kk_std_text_regex_groups_count_fun1413__t {
  struct kk_function_s _base;
};
static kk_string_t kk_std_text_regex_groups_count_fun1413(kk_function_t _fself, kk_std_core__list caps, kk_context_t* _ctx);
static kk_function_t kk_std_text_regex_new_groups_count_fun1413(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_regex_groups_count_fun1413, _ctx)
  return kk_function_dup(_fself);
}

static kk_string_t kk_std_text_regex_groups_count_fun1413(kk_function_t _fself, kk_std_core__list caps, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x1414 = kk_string_empty(); /*string*/
  return kk_std_text_regex_replace_captures(caps, _x1414, _ctx);
}


// lift anonymous function
struct kk_std_text_regex_groups_count_fun1425__t {
  struct kk_function_s _base;
};
static kk_string_t kk_std_text_regex_groups_count_fun1425(kk_function_t _fself, kk_std_core__list ___wildcard__158__35, kk_context_t* _ctx);
static kk_function_t kk_std_text_regex_new_groups_count_fun1425(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_regex_groups_count_fun1425, _ctx)
  return kk_function_dup(_fself);
}

static kk_string_t kk_std_text_regex_groups_count_fun1425(kk_function_t _fself, kk_std_core__list ___wildcard__158__35, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core__list_drop(___wildcard__158__35, _ctx);
  return kk_string_empty();
}

kk_integer_t kk_std_text_regex_groups_count(kk_std_text_regex__regex r, kk_context_t* _ctx) { /* (r : regex) -> int */ 
  kk_string_t _x1399;
  bool _match_1202;
  kk_string_t _x1400 = kk_string_empty(); /*string*/
  kk_string_t _x1402;
  kk_define_string_literal(, _s1403, 1, "$")
  _x1402 = kk_string_dup(_s1403); /*string*/
  _match_1202 = kk_string_contains(_x1400,_x1402,kk_context()); /*bool*/
  if (_match_1202) {
    kk_std_core__list _x1404;
    kk_box_t _x1405;
    kk_std_text_regex__regex _x1406 = kk_std_text_regex_rx_nongroup; /*std/text/regex/regex*/
    {
      kk_box_t _x = _x1406.obj;
      _x1405 = kk_box_dup(_x); /*any*/
    }
    kk_string_t _x1407;
    {
      kk_string_t _x0 = r.src;
      kk_string_dup(_x0);
      kk_std_text_regex__regex_drop(r, _ctx);
      _x1407 = _x0; /*string*/
    }
    kk_ssize_t _x1408 = (KK_IZ(0)); /*ssize_t*/
    kk_ssize_t _x1409;
    kk_integer_t _x1410;
    kk_std_core_types__optional _x1411 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
    if (kk_std_core_types__is_Optional(_x1411)) {
      kk_box_t _box_x1188 = _x1411._cons.Optional.value;
      kk_integer_t _atmost_496 = kk_integer_unbox(_box_x1188);
      _x1410 = _atmost_496; /*int*/
    }
    else {
      _x1410 = kk_integer_from_small(-1); /*int*/
    }
    _x1409 = kk_std_core_ssize__t(_x1410, _ctx); /*ssize_t*/
    _x1404 = kk_std_text_regex_regex_exec_all(_x1405, _x1407, _x1408, _x1409, _ctx); /*list<list<sslice>>*/
    _x1399 = kk_std_text_regex_concat_replace(_x1404, kk_std_text_regex_new_groups_count_fun1413(_ctx), kk_std_core__new_Nil(_ctx), _ctx); /*string*/
  }
  else {
    kk_std_core__list _x1416;
    kk_box_t _x1417;
    kk_std_text_regex__regex _x1418 = kk_std_text_regex_rx_nongroup; /*std/text/regex/regex*/
    {
      kk_box_t _x1 = _x1418.obj;
      _x1417 = kk_box_dup(_x1); /*any*/
    }
    kk_string_t _x1419;
    {
      kk_string_t _x00 = r.src;
      kk_string_dup(_x00);
      kk_std_text_regex__regex_drop(r, _ctx);
      _x1419 = _x00; /*string*/
    }
    kk_ssize_t _x1420 = (KK_IZ(0)); /*ssize_t*/
    kk_ssize_t _x1421;
    kk_integer_t _x1422;
    kk_std_core_types__optional _x1423 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
    if (kk_std_core_types__is_Optional(_x1423)) {
      kk_box_t _box_x1189 = _x1423._cons.Optional.value;
      kk_integer_t _atmost_4960 = kk_integer_unbox(_box_x1189);
      _x1422 = _atmost_4960; /*int*/
    }
    else {
      _x1422 = kk_integer_from_small(-1); /*int*/
    }
    _x1421 = kk_std_core_ssize__t(_x1422, _ctx); /*ssize_t*/
    _x1416 = kk_std_text_regex_regex_exec_all(_x1417, _x1419, _x1420, _x1421, _ctx); /*list<list<sslice>>*/
    _x1399 = kk_std_text_regex_concat_replace(_x1416, kk_std_text_regex_new_groups_count_fun1425(_ctx), kk_std_core__new_Nil(_ctx), _ctx); /*string*/
  }
  return kk_std_core_count_1(_x1399, _ctx);
}
 
// Replace the first occurrence of `regex` by the result of the replacement fun `repl` in a string `s`.

kk_string_t kk_std_text_regex_replace(kk_string_t s, kk_std_text_regex__regex r, kk_function_t repl, kk_context_t* _ctx) { /* forall<e> (s : string, r : regex, repl : (list<sslice>) -> e string) -> e string */ 
  kk_std_core__list _x1427;
  kk_box_t _x1428;
  {
    kk_box_t _x = r.obj;
    kk_box_dup(_x);
    kk_std_text_regex__regex_drop(r, _ctx);
    _x1428 = _x; /*any*/
  }
  kk_ssize_t _x1429 = (KK_IZ(0)); /*ssize_t*/
  kk_ssize_t _x1430 = (KK_IZ(1)); /*ssize_t*/
  _x1427 = kk_std_text_regex_regex_exec_all(_x1428, s, _x1429, _x1430, _ctx); /*list<list<sslice>>*/
  return kk_std_text_regex_concat_replace(_x1427, repl, kk_std_core__new_Nil(_ctx), _ctx);
}
 
// Replace the first occurrence of `regex` with a replacement string `repl` in a string `s`.
// The replacement string can contain `$$` for a `$` sign, `$n` for a capture group,
// `$&` for the entire match `==$0`.


// lift anonymous function
struct kk_std_text_regex_replace_fun1438__t_1 {
  struct kk_function_s _base;
  kk_string_t repl;
};
static kk_string_t kk_std_text_regex_replace_fun1438_1(kk_function_t _fself, kk_std_core__list caps, kk_context_t* _ctx);
static kk_function_t kk_std_text_regex_new_replace_fun1438_1(kk_string_t repl, kk_context_t* _ctx) {
  struct kk_std_text_regex_replace_fun1438__t_1* _self = kk_function_alloc_as(struct kk_std_text_regex_replace_fun1438__t_1, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_regex_replace_fun1438_1, kk_context());
  _self->repl = repl;
  return &_self->_base;
}

static kk_string_t kk_std_text_regex_replace_fun1438_1(kk_function_t _fself, kk_std_core__list caps, kk_context_t* _ctx) {
  struct kk_std_text_regex_replace_fun1438__t_1* _self = kk_function_as(struct kk_std_text_regex_replace_fun1438__t_1*, _fself);
  kk_string_t repl = _self->repl; /* string */
  kk_drop_match(_self, {kk_string_dup(repl);}, {}, _ctx)
  return kk_std_text_regex_replace_captures(caps, repl, _ctx);
}


// lift anonymous function
struct kk_std_text_regex_replace_fun1443__t_1 {
  struct kk_function_s _base;
  kk_string_t repl;
};
static kk_string_t kk_std_text_regex_replace_fun1443_1(kk_function_t _fself, kk_std_core__list ___wildcard__158__35, kk_context_t* _ctx);
static kk_function_t kk_std_text_regex_new_replace_fun1443_1(kk_string_t repl, kk_context_t* _ctx) {
  struct kk_std_text_regex_replace_fun1443__t_1* _self = kk_function_alloc_as(struct kk_std_text_regex_replace_fun1443__t_1, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_regex_replace_fun1443_1, kk_context());
  _self->repl = repl;
  return &_self->_base;
}

static kk_string_t kk_std_text_regex_replace_fun1443_1(kk_function_t _fself, kk_std_core__list ___wildcard__158__35, kk_context_t* _ctx) {
  struct kk_std_text_regex_replace_fun1443__t_1* _self = kk_function_as(struct kk_std_text_regex_replace_fun1443__t_1*, _fself);
  kk_string_t repl = _self->repl; /* string */
  kk_drop_match(_self, {kk_string_dup(repl);}, {}, _ctx)
  kk_std_core__list_drop(___wildcard__158__35, _ctx);
  return repl;
}

kk_string_t kk_std_text_regex_replace_1(kk_string_t s, kk_std_text_regex__regex regex0, kk_string_t repl, kk_context_t* _ctx) { /* (s : string, regex : regex, repl : string) -> string */ 
  bool _match_1201;
  kk_string_t _x1431 = kk_string_dup(repl); /*string*/
  kk_string_t _x1432;
  kk_define_string_literal(, _s1433, 1, "$")
  _x1432 = kk_string_dup(_s1433); /*string*/
  _match_1201 = kk_string_contains(_x1431,_x1432,kk_context()); /*bool*/
  if (_match_1201) {
    kk_std_core__list _x1434;
    kk_box_t _x1435;
    {
      kk_box_t _x = regex0.obj;
      kk_box_dup(_x);
      kk_std_text_regex__regex_drop(regex0, _ctx);
      _x1435 = _x; /*any*/
    }
    kk_ssize_t _x1436 = (KK_IZ(0)); /*ssize_t*/
    kk_ssize_t _x1437 = (KK_IZ(1)); /*ssize_t*/
    _x1434 = kk_std_text_regex_regex_exec_all(_x1435, s, _x1436, _x1437, _ctx); /*list<list<sslice>>*/
    return kk_std_text_regex_concat_replace(_x1434, kk_std_text_regex_new_replace_fun1438_1(repl, _ctx), kk_std_core__new_Nil(_ctx), _ctx);
  }
  {
    kk_std_core__list _x1439;
    kk_box_t _x1440;
    {
      kk_box_t _x0 = regex0.obj;
      kk_box_dup(_x0);
      kk_std_text_regex__regex_drop(regex0, _ctx);
      _x1440 = _x0; /*any*/
    }
    kk_ssize_t _x1441 = (KK_IZ(0)); /*ssize_t*/
    kk_ssize_t _x1442 = (KK_IZ(1)); /*ssize_t*/
    _x1439 = kk_std_text_regex_regex_exec_all(_x1440, s, _x1441, _x1442, _ctx); /*list<list<sslice>>*/
    return kk_std_text_regex_concat_replace(_x1439, kk_std_text_regex_new_replace_fun1443_1(repl, _ctx), kk_std_core__new_Nil(_ctx), _ctx);
  }
}
 
// Split a string `s` in at most `atmost` parts using a regular expression `r` as separator.


// lift anonymous function
struct kk_std_text_regex_split_fun1450__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_regex_split_fun1450(kk_function_t _fself, kk_box_t _b_1193, kk_context_t* _ctx);
static kk_function_t kk_std_text_regex_new_split_fun1450(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_regex_split_fun1450, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_regex_split_fun1450(kk_function_t _fself, kk_box_t _b_1193, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x1451;
  kk_std_core__list _x1452 = kk_std_core__list_unbox(_b_1193, _ctx); /*list<sslice>*/
  _x1451 = kk_std_text_regex_captured(_x1452, _ctx); /*string*/
  return kk_string_box(_x1451);
}

kk_std_core__list kk_std_text_regex_split(kk_string_t s, kk_std_text_regex__regex r, kk_std_core_types__optional atmost, kk_context_t* _ctx) { /* (s : string, r : regex, atmost : optional<int>) -> list<string> */ 
  kk_std_core__list xs_1000;
  kk_std_core__list _x1444;
  kk_box_t _x1445;
  {
    kk_box_t _x = r.obj;
    kk_box_dup(_x);
    kk_std_text_regex__regex_drop(r, _ctx);
    _x1445 = _x; /*any*/
  }
  kk_ssize_t _x1446 = (KK_IZ(0)); /*ssize_t*/
  kk_ssize_t _x1447;
  kk_integer_t _x1448;
  if (kk_std_core_types__is_Optional(atmost)) {
    kk_box_t _box_x1190 = atmost._cons.Optional.value;
    kk_integer_t _atmost_922 = kk_integer_unbox(_box_x1190);
    _x1448 = _atmost_922; /*int*/
  }
  else {
    _x1448 = kk_integer_from_small(-1); /*int*/
  }
  _x1447 = kk_std_core_ssize__t(_x1448, _ctx); /*ssize_t*/
  _x1444 = kk_std_text_regex_regex_exec_all(_x1445, s, _x1446, _x1447, _ctx); /*list<list<sslice>>*/
  xs_1000 = kk_std_text_regex_filter_non_matches(_x1444, _ctx); /*list<list<sslice>>*/
  return kk_std_core_map_5(xs_1000, kk_std_text_regex_new_split_fun1450(_ctx), _ctx);
}

bool kk_std_text_regex_testabc(kk_string_t s, kk_context_t* _ctx) { /* (s : string) -> bool */ 
  kk_std_text_regex__regex r_1006;
  kk_box_t _x1453;
  kk_string_t _x1454;
  kk_define_string_literal(, _s1455, 6, "[ab]+c")
  _x1454 = kk_string_dup(_s1455); /*string*/
  bool _x1456;
  kk_std_core_types__optional _x1457 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x1457)) {
    kk_box_t _box_x1196 = _x1457._cons.Optional.value;
    bool _ignorecase_455 = kk_bool_unbox(_box_x1196);
    _x1456 = _ignorecase_455; /*bool*/
  }
  else {
    _x1456 = false; /*bool*/
  }
  bool _x1459;
  kk_std_core_types__optional _x1460 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x1460)) {
    kk_box_t _box_x1197 = _x1460._cons.Optional.value;
    bool _multiline_459 = kk_bool_unbox(_box_x1197);
    _x1459 = _multiline_459; /*bool*/
  }
  else {
    _x1459 = false; /*bool*/
  }
  _x1453 = kk_std_text_regex_regex_create(_x1454, _x1456, _x1459, _ctx); /*any*/
  kk_string_t _x1462;
  kk_define_string_literal(, _s1463, 6, "[ab]+c")
  _x1462 = kk_string_dup(_s1463); /*string*/
  r_1006 = kk_std_text_regex__new_Regex(_x1453, _x1462, _ctx); /*std/text/regex/regex*/
  kk_std_core__list list0_1010;
  kk_box_t _x1464;
  {
    kk_box_t _x = r_1006.obj;
    kk_box_dup(_x);
    kk_std_text_regex__regex_drop(r_1006, _ctx);
    _x1464 = _x; /*any*/
  }
  kk_ssize_t _x1465 = (KK_IZ(0)); /*ssize_t*/
  list0_1010 = kk_std_text_regex_regex_exec(_x1464, s, _x1465, _ctx); /*list<sslice>*/
  if (kk_std_core__is_Cons(list0_1010)) {
    struct kk_std_core_Cons* _con1466 = kk_std_core__as_Cons(list0_1010);
    kk_box_t _box_x1198 = _con1466->head;
    kk_std_core__list _pat1 = _con1466->tail;
    if (kk_likely(kk_std_core__list_is_unique(list0_1010))) {
      kk_std_core__list_drop(_pat1, _ctx);
      kk_box_drop(_box_x1198, _ctx);
      kk_std_core__list_free(list0_1010, _ctx);
    }
    else {
      kk_std_core__list_decref(list0_1010, _ctx);
    }
    return true;
  }
  {
    return false;
  }
}

// initialization
void kk_std_text_regex__init(kk_context_t* _ctx){
  static bool _kk_initialized = false;
  if (_kk_initialized) return;
  _kk_initialized = true;
  kk_std_core_types__init(_ctx);
  kk_std_core_hnd__init(_ctx);
  kk_std_core__init(_ctx);
  #if defined(KK_CUSTOM_INIT)
    KK_CUSTOM_INIT (_ctx);
  #endif
  {
    kk_box_t _x1388;
    kk_string_t _x1389;
    kk_define_string_literal(, _s1390, 45, "[^\\\\\\[(]+|\\\\[\\s\\S]\?|\\(\\\?|\\[(\?:[^\\\\\\]]|\\\\.)*\\]")
    _x1389 = kk_string_dup(_s1390); /*string*/
    bool _x1391;
    kk_std_core_types__optional _x1392 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
    if (kk_std_core_types__is_Optional(_x1392)) {
      kk_box_t _box_x1186 = _x1392._cons.Optional.value;
      bool _ignorecase_455 = kk_bool_unbox(_box_x1186);
      _x1391 = _ignorecase_455; /*bool*/
    }
    else {
      _x1391 = false; /*bool*/
    }
    bool _x1394;
    kk_std_core_types__optional _x1395 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
    if (kk_std_core_types__is_Optional(_x1395)) {
      kk_box_t _box_x1187 = _x1395._cons.Optional.value;
      bool _multiline_459 = kk_bool_unbox(_box_x1187);
      _x1394 = _multiline_459; /*bool*/
    }
    else {
      _x1394 = false; /*bool*/
    }
    _x1388 = kk_std_text_regex_regex_create(_x1389, _x1391, _x1394, _ctx); /*any*/
    kk_string_t _x1397;
    kk_define_string_literal(, _s1398, 45, "[^\\\\\\[(]+|\\\\[\\s\\S]\?|\\(\\\?|\\[(\?:[^\\\\\\]]|\\\\.)*\\]")
    _x1397 = kk_string_dup(_s1398); /*string*/
    kk_std_text_regex_rx_nongroup = kk_std_text_regex__new_Regex(_x1388, _x1397, _ctx); /*std/text/regex/regex*/
  }
}

// termination
void kk_std_text_regex__done(kk_context_t* _ctx){
  static bool _kk_done = false;
  if (_kk_done) return;
  _kk_done = true;
  #if defined(KK_CUSTOM_DONE)
    KK_CUSTOM_DONE (_ctx);
  #endif
  kk_std_text_regex__regex_drop(kk_std_text_regex_rx_nongroup, _ctx);
  kk_std_core__done(_ctx);
  kk_std_core_hnd__done(_ctx);
  kk_std_core_types__done(_ctx);
}
