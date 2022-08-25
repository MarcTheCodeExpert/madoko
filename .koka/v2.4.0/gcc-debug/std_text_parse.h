#pragma once
#ifndef kk_std_text_parse_H
#define kk_std_text_parse_H
// Koka generated module: "std/text/parse", koka version: 2.4.0, platform: 64-bit
#include <kklib.h>
#include "std_core_types.h"
#include "std_core_hnd.h"
#include "std_core.h"

// type declarations

// type std/text/parse/.hnd-parse
struct kk_std_text_parse__hnd_parse_s {
  kk_block_t _block;
};
typedef struct kk_std_text_parse__hnd_parse_s* kk_std_text_parse__hnd_parse;
struct kk_std_text_parse__Hnd_parse {
  struct kk_std_text_parse__hnd_parse_s _base;
  kk_std_core_hnd__clause0 fun_current_input;
  kk_std_core_hnd__clause1 ctl_fail;
  kk_std_core_hnd__clause0 ctl_pick;
  kk_std_core_hnd__clause1 fun_satisfy;
};
static inline kk_std_text_parse__hnd_parse kk_std_text_parse__base_Hnd_parse(struct kk_std_text_parse__Hnd_parse* _x) {
  return &_x->_base;
}
static inline kk_std_text_parse__hnd_parse kk_std_text_parse__new_Hnd_parse(kk_reuse_t _at, kk_std_core_hnd__clause0 fun_current_input, kk_std_core_hnd__clause1 ctl_fail, kk_std_core_hnd__clause0 ctl_pick, kk_std_core_hnd__clause1 fun_satisfy, kk_context_t* _ctx) {
  struct kk_std_text_parse__Hnd_parse* _con = kk_block_alloc_at_as(struct kk_std_text_parse__Hnd_parse, _at, 4 /* scan count */, (kk_tag_t)(1), _ctx);
  _con->fun_current_input = fun_current_input;
  _con->ctl_fail = ctl_fail;
  _con->ctl_pick = ctl_pick;
  _con->fun_satisfy = fun_satisfy;
  return kk_std_text_parse__base_Hnd_parse(_con);
}
static inline struct kk_std_text_parse__Hnd_parse* kk_std_text_parse__as_Hnd_parse(kk_std_text_parse__hnd_parse x) {
  return kk_basetype_as_assert(struct kk_std_text_parse__Hnd_parse*, x, (kk_tag_t)(1) /* _tag */);
}
static inline bool kk_std_text_parse__is_Hnd_parse(kk_std_text_parse__hnd_parse x) {
  return (true);
}
static inline kk_std_text_parse__hnd_parse kk_std_text_parse__hnd_parse_dup(kk_std_text_parse__hnd_parse _x) {
  return kk_basetype_dup_as(kk_std_text_parse__hnd_parse, _x);
}
static inline void kk_std_text_parse__hnd_parse_drop(kk_std_text_parse__hnd_parse _x, kk_context_t* _ctx) {
  kk_basetype_drop(_x, _ctx);
}
static inline kk_std_text_parse__hnd_parse kk_std_text_parse__hnd_parse_hole() {
  return (kk_std_text_parse__hnd_parse)(1);
}
static inline bool kk_std_text_parse__hnd_parse_is_unique(kk_std_text_parse__hnd_parse _x) {
  return kk_basetype_is_unique(_x);
}
static inline void kk_std_text_parse__hnd_parse_free(kk_std_text_parse__hnd_parse _x, kk_context_t* _ctx) {
  kk_basetype_free(_x, _ctx);
}
static inline void kk_std_text_parse__hnd_parse_decref(kk_std_text_parse__hnd_parse _x, kk_context_t* _ctx) {
  kk_basetype_decref(_x, _ctx);
}
static inline kk_reuse_t kk_std_text_parse__hnd_parse_dropn_reuse(kk_std_text_parse__hnd_parse _x, kk_ssize_t _scan_fsize, kk_context_t* _ctx) {
  return kk_basetype_dropn_reuse(_x, _scan_fsize, _ctx);
}
static inline void kk_std_text_parse__hnd_parse_dropn(kk_std_text_parse__hnd_parse _x, kk_ssize_t _scan_fsize, kk_context_t* _ctx) {
  kk_basetype_dropn(_x, _scan_fsize, _ctx);
}
static inline kk_reuse_t kk_std_text_parse__hnd_parse_reuse(kk_std_text_parse__hnd_parse _x) {
  return kk_basetype_reuse(_x);
}
static inline kk_box_t kk_std_text_parse__hnd_parse_box(kk_std_text_parse__hnd_parse _x, kk_context_t* _ctx) {
  return kk_basetype_box(_x);
}
static inline kk_std_text_parse__hnd_parse kk_std_text_parse__hnd_parse_unbox(kk_box_t _x, kk_context_t* _ctx) {
  return kk_basetype_unbox_as(kk_std_text_parse__hnd_parse, _x);
}

// type std/text/parse/parse
struct kk_std_text_parse__parse_s {
  kk_block_t _block;
};
typedef struct kk_std_text_parse__parse_s* kk_std_text_parse__parse;
struct kk_std_text_parse_Parse {
  struct kk_std_text_parse__parse_s _base;
  kk_std_text_parse__hnd_parse _field1;
};
static inline kk_std_text_parse__parse kk_std_text_parse__base_Parse(struct kk_std_text_parse_Parse* _x) {
  return &_x->_base;
}
static inline kk_std_text_parse__parse kk_std_text_parse__new_Parse(kk_reuse_t _at, kk_std_text_parse__hnd_parse _field1, kk_context_t* _ctx) {
  struct kk_std_text_parse_Parse* _con = kk_block_alloc_at_as(struct kk_std_text_parse_Parse, _at, 1 /* scan count */, (kk_tag_t)(1), _ctx);
  _con->_field1 = _field1;
  return kk_std_text_parse__base_Parse(_con);
}
static inline struct kk_std_text_parse_Parse* kk_std_text_parse__as_Parse(kk_std_text_parse__parse x) {
  return kk_basetype_as_assert(struct kk_std_text_parse_Parse*, x, (kk_tag_t)(1) /* _tag */);
}
static inline bool kk_std_text_parse__is_Parse(kk_std_text_parse__parse x) {
  return (true);
}
static inline kk_std_text_parse__parse kk_std_text_parse__parse_dup(kk_std_text_parse__parse _x) {
  return kk_basetype_dup_as(kk_std_text_parse__parse, _x);
}
static inline void kk_std_text_parse__parse_drop(kk_std_text_parse__parse _x, kk_context_t* _ctx) {
  kk_basetype_drop(_x, _ctx);
}
static inline kk_std_text_parse__parse kk_std_text_parse__parse_hole() {
  return (kk_std_text_parse__parse)(1);
}
static inline bool kk_std_text_parse__parse_is_unique(kk_std_text_parse__parse _x) {
  return kk_basetype_is_unique(_x);
}
static inline void kk_std_text_parse__parse_free(kk_std_text_parse__parse _x, kk_context_t* _ctx) {
  kk_basetype_free(_x, _ctx);
}
static inline void kk_std_text_parse__parse_decref(kk_std_text_parse__parse _x, kk_context_t* _ctx) {
  kk_basetype_decref(_x, _ctx);
}
static inline kk_reuse_t kk_std_text_parse__parse_dropn_reuse(kk_std_text_parse__parse _x, kk_ssize_t _scan_fsize, kk_context_t* _ctx) {
  return kk_basetype_dropn_reuse(_x, _scan_fsize, _ctx);
}
static inline void kk_std_text_parse__parse_dropn(kk_std_text_parse__parse _x, kk_ssize_t _scan_fsize, kk_context_t* _ctx) {
  kk_basetype_dropn(_x, _scan_fsize, _ctx);
}
static inline kk_reuse_t kk_std_text_parse__parse_reuse(kk_std_text_parse__parse _x) {
  return kk_basetype_reuse(_x);
}
static inline kk_box_t kk_std_text_parse__parse_box(kk_std_text_parse__parse _x, kk_context_t* _ctx) {
  return kk_basetype_box(_x);
}
static inline kk_std_text_parse__parse kk_std_text_parse__parse_unbox(kk_box_t _x, kk_context_t* _ctx) {
  return kk_basetype_unbox_as(kk_std_text_parse__parse, _x);
}

// type std/text/parse/parse-error
struct kk_std_text_parse__parse_error_s {
  kk_block_t _block;
};
typedef struct kk_std_text_parse__parse_error_s* kk_std_text_parse__parse_error;
struct kk_std_text_parse_ParseOk {
  struct kk_std_text_parse__parse_error_s _base;
  kk_box_t result;
  kk_std_core__sslice rest;
};
struct kk_std_text_parse_ParseError {
  struct kk_std_text_parse__parse_error_s _base;
  kk_string_t msg;
  kk_std_core__sslice rest;
};
static inline kk_std_text_parse__parse_error kk_std_text_parse__base_ParseOk(struct kk_std_text_parse_ParseOk* _x) {
  return &_x->_base;
}
static inline kk_std_text_parse__parse_error kk_std_text_parse__new_ParseOk(kk_reuse_t _at, kk_box_t result, kk_std_core__sslice rest, kk_context_t* _ctx) {
  struct kk_std_text_parse_ParseOk* _con = kk_block_alloc_at_as(struct kk_std_text_parse_ParseOk, _at, 2 /* scan count */, (kk_tag_t)(1), _ctx);
  _con->result = result;
  _con->rest = rest;
  return kk_std_text_parse__base_ParseOk(_con);
}
static inline struct kk_std_text_parse_ParseOk* kk_std_text_parse__as_ParseOk(kk_std_text_parse__parse_error x) {
  return kk_basetype_as_assert(struct kk_std_text_parse_ParseOk*, x, (kk_tag_t)(1) /* _tag */);
}
static inline kk_std_text_parse__parse_error kk_std_text_parse__base_ParseError(struct kk_std_text_parse_ParseError* _x) {
  return &_x->_base;
}
static inline kk_std_text_parse__parse_error kk_std_text_parse__new_ParseError(kk_reuse_t _at, kk_string_t msg, kk_std_core__sslice rest, kk_context_t* _ctx) {
  struct kk_std_text_parse_ParseError* _con = kk_block_alloc_at_as(struct kk_std_text_parse_ParseError, _at, 2 /* scan count */, (kk_tag_t)(2), _ctx);
  _con->msg = msg;
  _con->rest = rest;
  return kk_std_text_parse__base_ParseError(_con);
}
static inline struct kk_std_text_parse_ParseError* kk_std_text_parse__as_ParseError(kk_std_text_parse__parse_error x) {
  return kk_basetype_as_assert(struct kk_std_text_parse_ParseError*, x, (kk_tag_t)(2) /* _tag */);
}
static inline bool kk_std_text_parse__is_ParseOk(kk_std_text_parse__parse_error x) {
  return (kk_basetype_has_tag(x, (kk_tag_t)(1)));
}
static inline bool kk_std_text_parse__is_ParseError(kk_std_text_parse__parse_error x) {
  return (kk_basetype_has_tag(x, (kk_tag_t)(2)));
}
static inline kk_std_text_parse__parse_error kk_std_text_parse__parse_error_dup(kk_std_text_parse__parse_error _x) {
  return kk_basetype_dup_as(kk_std_text_parse__parse_error, _x);
}
static inline void kk_std_text_parse__parse_error_drop(kk_std_text_parse__parse_error _x, kk_context_t* _ctx) {
  kk_basetype_drop(_x, _ctx);
}
static inline kk_std_text_parse__parse_error kk_std_text_parse__parse_error_hole() {
  return (kk_std_text_parse__parse_error)(1);
}
static inline bool kk_std_text_parse__parse_error_is_unique(kk_std_text_parse__parse_error _x) {
  return kk_basetype_is_unique(_x);
}
static inline void kk_std_text_parse__parse_error_free(kk_std_text_parse__parse_error _x, kk_context_t* _ctx) {
  kk_basetype_free(_x, _ctx);
}
static inline void kk_std_text_parse__parse_error_decref(kk_std_text_parse__parse_error _x, kk_context_t* _ctx) {
  kk_basetype_decref(_x, _ctx);
}
static inline kk_reuse_t kk_std_text_parse__parse_error_dropn_reuse(kk_std_text_parse__parse_error _x, kk_ssize_t _scan_fsize, kk_context_t* _ctx) {
  return kk_basetype_dropn_reuse(_x, _scan_fsize, _ctx);
}
static inline void kk_std_text_parse__parse_error_dropn(kk_std_text_parse__parse_error _x, kk_ssize_t _scan_fsize, kk_context_t* _ctx) {
  kk_basetype_dropn(_x, _scan_fsize, _ctx);
}
static inline kk_reuse_t kk_std_text_parse__parse_error_reuse(kk_std_text_parse__parse_error _x) {
  return kk_basetype_reuse(_x);
}
static inline kk_box_t kk_std_text_parse__parse_error_box(kk_std_text_parse__parse_error _x, kk_context_t* _ctx) {
  return kk_basetype_box(_x);
}
static inline kk_std_text_parse__parse_error kk_std_text_parse__parse_error_unbox(kk_box_t _x, kk_context_t* _ctx) {
  return kk_basetype_unbox_as(kk_std_text_parse__parse_error, _x);
}

// value declarations
 
// Automatically generated. Retrieves the `rest` constructor field of the `:parse-error` type.

static inline kk_std_core__sslice kk_std_text_parse_rest(kk_std_text_parse__parse_error _this, kk_context_t* _ctx) { /* forall<a> (parse-error<a>) -> sslice */ 
  if (kk_std_text_parse__is_ParseOk(_this)) {
    struct kk_std_text_parse_ParseOk* _con3380 = kk_std_text_parse__as_ParseOk(_this);
    kk_std_core__sslice _x = _con3380->rest;
    return kk_std_core__sslice_dup(_x);
  }
  {
    struct kk_std_text_parse_ParseError* _con3381 = kk_std_text_parse__as_ParseError(_this);
    kk_std_core__sslice _x0 = _con3381->rest;
    return kk_std_core__sslice_dup(_x0);
  }
}
 
// Automatically generated. Tests for the `ParseOk` constructor of the `:parse-error` type.

static inline bool kk_std_text_parse_is_parseOk(kk_std_text_parse__parse_error parse_error, kk_context_t* _ctx) { /* forall<a> (parse-error : parse-error<a>) -> bool */ 
  if (kk_std_text_parse__is_ParseOk(parse_error)) {
    struct kk_std_text_parse_ParseOk* _con3382 = kk_std_text_parse__as_ParseOk(parse_error);
    kk_std_core__sslice _pat1 = _con3382->rest;
    return true;
  }
  {
    return false;
  }
}
 
// Automatically generated. Tests for the `ParseError` constructor of the `:parse-error` type.

static inline bool kk_std_text_parse_is_parseError(kk_std_text_parse__parse_error parse_error, kk_context_t* _ctx) { /* forall<a> (parse-error : parse-error<a>) -> bool */ 
  if (kk_std_text_parse__is_ParseError(parse_error)) {
    struct kk_std_text_parse_ParseError* _con3383 = kk_std_text_parse__as_ParseError(parse_error);
    kk_std_core__sslice _pat1 = _con3383->rest;
    return true;
  }
  {
    return false;
  }
}

extern kk_std_core_hnd__htag kk_std_text_parse__tag_parse;

kk_box_t kk_std_text_parse__handle_parse(int32_t cfc, kk_std_text_parse__hnd_parse hnd, kk_function_t ret, kk_function_t action, kk_context_t* _ctx); /* forall<a,e,b> (cfc : int32, hnd : .hnd-parse<e,b>, ret : (res : a) -> e b, action : () -> <parse|e> a) -> e b */ 
 
// select `current-input` operation out of the `:parse` effect handler

static inline kk_std_core_hnd__clause0 kk_std_text_parse__select_current_input(kk_std_text_parse__hnd_parse hnd, kk_context_t* _ctx) { /* forall<e,a> (hnd : .hnd-parse<e,a>) -> std/core/hnd/clause0<sslice,.hnd-parse,e,a> */ 
  {
    struct kk_std_text_parse__Hnd_parse* _con3387 = kk_std_text_parse__as_Hnd_parse(hnd);
    kk_std_core_hnd__clause0 fun_current_input = _con3387->fun_current_input;
    return kk_std_core_hnd__clause0_dup(fun_current_input);
  }
}
 
// select `fail` operation out of the `:parse` effect handler

static inline kk_std_core_hnd__clause1 kk_std_text_parse__select_fail(kk_std_text_parse__hnd_parse hnd, kk_context_t* _ctx) { /* forall<a,e,b> (hnd : .hnd-parse<e,b>) -> std/core/hnd/clause1<string,a,.hnd-parse,e,b> */ 
  {
    struct kk_std_text_parse__Hnd_parse* _con3388 = kk_std_text_parse__as_Hnd_parse(hnd);
    kk_std_core_hnd__clause1 ctl_fail = _con3388->ctl_fail;
    return kk_std_core_hnd__clause1_dup(ctl_fail);
  }
}
 
// select `pick` operation out of the `:parse` effect handler

static inline kk_std_core_hnd__clause0 kk_std_text_parse__select_pick(kk_std_text_parse__hnd_parse hnd, kk_context_t* _ctx) { /* forall<e,a> (hnd : .hnd-parse<e,a>) -> std/core/hnd/clause0<bool,.hnd-parse,e,a> */ 
  {
    struct kk_std_text_parse__Hnd_parse* _con3389 = kk_std_text_parse__as_Hnd_parse(hnd);
    kk_std_core_hnd__clause0 ctl_pick = _con3389->ctl_pick;
    return kk_std_core_hnd__clause0_dup(ctl_pick);
  }
}
 
// select `satisfy` operation out of the `:parse` effect handler

static inline kk_std_core_hnd__clause1 kk_std_text_parse__select_satisfy(kk_std_text_parse__hnd_parse hnd, kk_context_t* _ctx) { /* forall<a,e,b> (hnd : .hnd-parse<e,b>) -> std/core/hnd/clause1<(sslice) -> total maybe<(a, sslice)>,maybe<a>,.hnd-parse,e,b> */ 
  {
    struct kk_std_text_parse__Hnd_parse* _con3390 = kk_std_text_parse__as_Hnd_parse(hnd);
    kk_std_core_hnd__clause1 fun_satisfy = _con3390->fun_satisfy;
    return kk_std_core_hnd__clause1_dup(fun_satisfy);
  }
}

kk_std_core_types__either kk_std_text_parse_either(kk_std_text_parse__parse_error perr, kk_context_t* _ctx); /* forall<a> (perr : parse-error<a>) -> either<string,a> */ 
 
// call `fail` operation of the `:parse` effect

static inline kk_box_t kk_std_text_parse_fail(kk_string_t msg, kk_context_t* _ctx) { /* forall<a> (msg : string) -> parse a */ 
  kk_std_core_hnd__ev ev_2428;
  kk_ssize_t _x3393 = (KK_IZ(0)); /*ssize_t*/
  ev_2428 = kk_evv_at(_x3393,kk_context()); /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/
  {
    struct kk_std_core_hnd_Ev* _con3394 = kk_std_core_hnd__as_Ev(ev_2428);
    kk_std_core_hnd__marker m0 = _con3394->marker;
    kk_box_t _box_x2600 = _con3394->hnd;
    kk_std_text_parse__hnd_parse h = kk_std_text_parse__hnd_parse_unbox(_box_x2600, NULL);
    kk_std_text_parse__hnd_parse_dup(h);
    kk_std_core_hnd__clause1 _match_3366;
    kk_std_core_hnd__clause1 _brw_3367 = kk_std_text_parse__select_fail(h, _ctx); /*std/core/hnd/clause1<string,394,std/text/parse/.hnd-parse,395,396>*/;
    kk_std_text_parse__hnd_parse_drop(h, _ctx);
    _match_3366 = _brw_3367; /*std/core/hnd/clause1<string,394,std/text/parse/.hnd-parse,395,396>*/
    {
      kk_function_t _fun_unbox_x2604 = _match_3366.clause;
      return kk_function_call(kk_box_t, (kk_function_t, kk_std_core_hnd__marker, kk_std_core_hnd__ev, kk_box_t, kk_context_t*), _fun_unbox_x2604, (_fun_unbox_x2604, m0, ev_2428, kk_string_box(msg), _ctx));
    }
  }
}
 
// call `satisfy` operation of the `:parse` effect


// lift anonymous function
struct kk_std_text_parse_satisfy_fun3400__t {
  struct kk_function_s _base;
  kk_function_t pred;
};
extern kk_box_t kk_std_text_parse_satisfy_fun3400(kk_function_t _fself, kk_box_t _b_2621, kk_context_t* _ctx);
static inline kk_function_t kk_std_text_parse_new_satisfy_fun3400(kk_function_t pred, kk_context_t* _ctx) {
  struct kk_std_text_parse_satisfy_fun3400__t* _self = kk_function_alloc_as(struct kk_std_text_parse_satisfy_fun3400__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_satisfy_fun3400, kk_context());
  _self->pred = pred;
  return &_self->_base;
}


static inline kk_std_core_types__maybe kk_std_text_parse_satisfy(kk_function_t pred, kk_context_t* _ctx) { /* forall<a> (pred : (sslice) -> total maybe<(a, sslice)>) -> parse maybe<a> */ 
  kk_std_core_hnd__ev ev_2431;
  kk_ssize_t _x3396 = (KK_IZ(0)); /*ssize_t*/
  ev_2431 = kk_evv_at(_x3396,kk_context()); /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/
  kk_box_t _x3397;
  {
    struct kk_std_core_hnd_Ev* _con3398 = kk_std_core_hnd__as_Ev(ev_2431);
    kk_std_core_hnd__marker m0 = _con3398->marker;
    kk_box_t _box_x2608 = _con3398->hnd;
    kk_std_text_parse__hnd_parse h = kk_std_text_parse__hnd_parse_unbox(_box_x2608, NULL);
    kk_std_text_parse__hnd_parse_dup(h);
    kk_std_core_hnd__clause1 _match_3364;
    kk_std_core_hnd__clause1 _brw_3365 = kk_std_text_parse__select_satisfy(h, _ctx); /*std/core/hnd/clause1<(sslice) -> total maybe<(433, sslice)>,maybe<433>,std/text/parse/.hnd-parse,434,435>*/;
    kk_std_text_parse__hnd_parse_drop(h, _ctx);
    _match_3364 = _brw_3365; /*std/core/hnd/clause1<(sslice) -> total maybe<(433, sslice)>,maybe<433>,std/text/parse/.hnd-parse,434,435>*/
    {
      kk_function_t _fun_unbox_x2615 = _match_3364.clause;
      _x3397 = kk_function_call(kk_box_t, (kk_function_t, kk_std_core_hnd__marker, kk_std_core_hnd__ev, kk_box_t, kk_context_t*), _fun_unbox_x2615, (_fun_unbox_x2615, m0, ev_2431, kk_function_box(kk_std_text_parse_new_satisfy_fun3400(pred, _ctx)), _ctx)); /*52*/
    }
  }
  return kk_std_core_types__maybe_unbox(_x3397, _ctx);
}

kk_box_t kk_std_text_parse__mlift2404_satisfy_fail(kk_string_t msg, kk_std_core_types__maybe _y_2315, kk_context_t* _ctx); /* forall<a> (msg : string, maybe<a>) -> parse a */ 

kk_box_t kk_std_text_parse_satisfy_fail(kk_string_t msg, kk_function_t pred, kk_context_t* _ctx); /* forall<a> (msg : string, pred : (sslice) -> maybe<(a, sslice)>) -> parse a */ 

kk_char_t kk_std_text_parse_char_is(kk_string_t msg, kk_function_t pred, kk_context_t* _ctx); /* (msg : string, pred : (char) -> bool) -> parse char */ 

kk_char_t kk_std_text_parse_alpha(kk_context_t* _ctx); /* () -> parse char */ 

kk_char_t kk_std_text_parse_alpha_num(kk_context_t* _ctx); /* () -> parse char */ 

kk_char_t kk_std_text_parse_char(kk_char_t c, kk_context_t* _ctx); /* (c : char) -> parse char */ 

kk_std_core_types__tuple2_ kk_std_text_parse_next_while0(kk_std_core__sslice slice, kk_function_t pred, kk_std_core__list acc, kk_context_t* _ctx); /* (slice : sslice, pred : (char) -> bool, acc : list<char>) -> (list<char>, sslice) */ 

kk_std_core__list kk_std_text_parse_chars_are(kk_string_t msg, kk_function_t pred, kk_context_t* _ctx); /* (msg : string, pred : (char) -> bool) -> parse list<char> */ 
 
// call `pick` operation of the `:parse` effect

static inline bool kk_std_text_parse_pick(kk_context_t* _ctx) { /* () -> parse bool */ 
  kk_std_core_hnd__ev ev_2446;
  kk_ssize_t _x3471 = (KK_IZ(0)); /*ssize_t*/
  ev_2446 = kk_evv_at(_x3471,kk_context()); /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/
  kk_box_t _x3472;
  {
    struct kk_std_core_hnd_Ev* _con3473 = kk_std_core_hnd__as_Ev(ev_2446);
    kk_std_core_hnd__marker m0 = _con3473->marker;
    kk_box_t _box_x2733 = _con3473->hnd;
    kk_std_text_parse__hnd_parse h = kk_std_text_parse__hnd_parse_unbox(_box_x2733, NULL);
    kk_std_text_parse__hnd_parse_dup(h);
    kk_std_core_hnd__clause0 _match_3349;
    kk_std_core_hnd__clause0 _brw_3350 = kk_std_text_parse__select_pick(h, _ctx); /*std/core/hnd/clause0<bool,std/text/parse/.hnd-parse,412,413>*/;
    kk_std_text_parse__hnd_parse_drop(h, _ctx);
    _match_3349 = _brw_3350; /*std/core/hnd/clause0<bool,std/text/parse/.hnd-parse,412,413>*/
    {
      kk_function_t _fun_unbox_x2736 = _match_3349.clause;
      _x3472 = kk_function_call(kk_box_t, (kk_function_t, kk_std_core_hnd__marker, kk_std_core_hnd__ev, kk_context_t*), _fun_unbox_x2736, (_fun_unbox_x2736, m0, ev_2446, _ctx)); /*37*/
    }
  }
  return kk_bool_unbox(_x3472);
}

kk_box_t kk_std_text_parse__mlift2405_choose(kk_function_t p0, kk_std_core__list pp, bool _y_2327, kk_context_t* _ctx); /* forall<a,e> (p0 : parser<e,a>, pp : list<parser<e,a>>, bool) -> <parse|e> a */ 

kk_box_t kk_std_text_parse_choose(kk_std_core__list ps, kk_context_t* _ctx); /* forall<a,e> (ps : list<parser<e,a>>) -> <parse|e> a */ 

kk_std_core__list kk_std_text_parse__mlift2406_count_acc(kk_std_core__list acc, kk_integer_t n, kk_function_t p, kk_box_t x, kk_context_t* _ctx); /* forall<a,e> (acc : list<a>, n : int, p : parser<e,a>, x : a) -> <parse|e> list<a> */ 

kk_std_core__list kk_std_text_parse_count_acc(kk_integer_t n0, kk_std_core__list acc0, kk_function_t p0, kk_context_t* _ctx); /* forall<a,e> (n : int, acc : list<a>, p : parser<e,a>) -> <parse|e> list<a> */ 

static inline kk_std_core__list kk_std_text_parse_count(kk_integer_t n, kk_function_t p, kk_context_t* _ctx) { /* forall<a,e> (n : int, p : parser<e,a>) -> <parse|e> list<a> */ 
  return kk_std_text_parse_count_acc(n, kk_std_core__new_Nil(_ctx), p, _ctx);
}
 
// call `current-input` operation of the `:parse` effect

static inline kk_std_core__sslice kk_std_text_parse_current_input(kk_context_t* _ctx) { /* () -> parse sslice */ 
  kk_std_core_hnd__ev ev_2456;
  kk_ssize_t _x3500 = (KK_IZ(0)); /*ssize_t*/
  ev_2456 = kk_evv_at(_x3500,kk_context()); /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/
  kk_box_t _x3501;
  {
    struct kk_std_core_hnd_Ev* _con3502 = kk_std_core_hnd__as_Ev(ev_2456);
    kk_std_core_hnd__marker m0 = _con3502->marker;
    kk_box_t _box_x2770 = _con3502->hnd;
    kk_std_text_parse__hnd_parse h = kk_std_text_parse__hnd_parse_unbox(_box_x2770, NULL);
    kk_std_text_parse__hnd_parse_dup(h);
    kk_std_core_hnd__clause0 _match_3342;
    kk_std_core_hnd__clause0 _brw_3343 = kk_std_text_parse__select_current_input(h, _ctx); /*std/core/hnd/clause0<sslice,std/text/parse/.hnd-parse,373,374>*/;
    kk_std_text_parse__hnd_parse_drop(h, _ctx);
    _match_3342 = _brw_3343; /*std/core/hnd/clause0<sslice,std/text/parse/.hnd-parse,373,374>*/
    {
      kk_function_t _fun_unbox_x2773 = _match_3342.clause;
      _x3501 = kk_function_call(kk_box_t, (kk_function_t, kk_std_core_hnd__marker, kk_std_core_hnd__ev, kk_context_t*), _fun_unbox_x2773, (_fun_unbox_x2773, m0, ev_2456, _ctx)); /*37*/
    }
  }
  return kk_std_core__sslice_unbox(_x3501, _ctx);
}

kk_integer_t kk_std_text_parse__mlift2407_digit(kk_char_t c00, kk_context_t* _ctx); /* (c00 : char) -> parse int */ 

kk_integer_t kk_std_text_parse_digit(kk_context_t* _ctx); /* () -> parse int */ 

kk_string_t kk_std_text_parse_digits(kk_context_t* _ctx); /* () -> parse string */ 
 
// monadic lift

static inline kk_box_t kk_std_text_parse__mlift2408_op(kk_function_t p1, kk_function_t p2, bool _y_2340, kk_context_t* _ctx) { /* forall<a,e> (p1 : parser<e,a>, p2 : parser<e,a>, bool) -> <parse|e> a */ 
  if (_y_2340) {
    kk_function_drop(p2, _ctx);
    return kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), p1, (p1, _ctx));
  }
  {
    kk_function_drop(p1, _ctx);
    return kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), p2, (p2, _ctx));
  }
}

kk_box_t kk_std_text_parse__lp__bar__bar__rp_(kk_function_t p1, kk_function_t p2, kk_context_t* _ctx); /* forall<a,e> (p1 : parser<e,a>, p2 : parser<e,a>) -> <parse|e> a */ 


// lift anonymous function
struct kk_std_text_parse_optional_fun3551__t {
  struct kk_function_s _base;
  kk_box_t kkloc_default;
};
extern kk_box_t kk_std_text_parse_optional_fun3551(kk_function_t _fself, kk_context_t* _ctx);
static inline kk_function_t kk_std_text_parse_new_optional_fun3551(kk_box_t kkloc_default, kk_context_t* _ctx) {
  struct kk_std_text_parse_optional_fun3551__t* _self = kk_function_alloc_as(struct kk_std_text_parse_optional_fun3551__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_optional_fun3551, kk_context());
  _self->kkloc_default = kkloc_default;
  return &_self->_base;
}


static inline kk_box_t kk_std_text_parse_optional(kk_box_t kkloc_default, kk_function_t p, kk_context_t* _ctx) { /* forall<a,e> (default : a, p : parser<e,a>) -> <parse|e> a */ 
  return kk_std_text_parse__lp__bar__bar__rp_(p, kk_std_text_parse_new_optional_fun3551(kkloc_default, _ctx), _ctx);
}

kk_string_t kk_std_text_parse_digits0(kk_context_t* _ctx); /* () -> parse string */ 

kk_unit_t kk_std_text_parse__mlift2409_eof(kk_std_core_types__maybe _y_2347, kk_context_t* _ctx); /* (maybe<()>) -> parse () */ 

kk_unit_t kk_std_text_parse_eof(kk_context_t* _ctx); /* () -> parse () */ 

kk_string_t kk_std_text_parse_hex_digits(kk_context_t* _ctx); /* () -> parse string */ 

kk_std_core__list kk_std_text_parse__mlift2410_many_acc(kk_std_core__list acc, kk_function_t p, kk_box_t x, kk_context_t* _ctx); /* forall<a,e> (acc : list<a>, p : parser<e,a>, x : a) -> <parse|e> list<a> */ 

kk_std_core__list kk_std_text_parse_many_acc(kk_function_t p0, kk_std_core__list acc0, kk_context_t* _ctx); /* forall<a,e> (p : parser<e,a>, acc : list<a>) -> <parse|e> list<a> */ 

static inline kk_std_core__list kk_std_text_parse_many(kk_function_t p, kk_context_t* _ctx) { /* forall<a,e> (p : parser<e,a>) -> <parse|e> list<a> */ 
  return kk_std_text_parse_many_acc(p, kk_std_core__new_Nil(_ctx), _ctx);
}
 
// monadic lift

static inline kk_std_core__list kk_std_text_parse__mlift2411_many1(kk_box_t _y_2355, kk_std_core__list _y_2356, kk_context_t* _ctx) { /* forall<a,e> (a, list<a>) -> <parse|e> list<a> */ 
  return kk_std_core__new_Cons(kk_reuse_null, _y_2355, _y_2356, _ctx);
}

kk_std_core__list kk_std_text_parse__mlift2412_many1(kk_function_t p, kk_box_t _y_2355, kk_context_t* _ctx); /* forall<a,e> (p : parser<e,a>, a) -> <parse|e> list<a> */ 

kk_std_core__list kk_std_text_parse_many1(kk_function_t p, kk_context_t* _ctx); /* forall<a,e> (p : parser<e,a>) -> <parse|e> list<a> */ 

kk_std_core_types__maybe kk_std_text_parse_maybe(kk_std_text_parse__parse_error perr, kk_context_t* _ctx); /* forall<a> (perr : parse-error<a>) -> maybe<a> */ 

kk_std_core_types__maybe kk_std_text_parse_next_match(kk_std_core__sslice slice, kk_std_core__list cs, kk_context_t* _ctx); /* (slice : sslice, cs : list<char>) -> maybe<sslice> */ 

kk_char_t kk_std_text_parse_no_digit(kk_context_t* _ctx); /* () -> parse char */ 

kk_char_t kk_std_text_parse_none_of(kk_string_t chars, kk_context_t* _ctx); /* (chars : string) -> parse char */ 

kk_string_t kk_std_text_parse_none_of_many1(kk_string_t chars, kk_context_t* _ctx); /* (chars : string) -> parse string */ 

kk_char_t kk_std_text_parse_one_of(kk_string_t chars, kk_context_t* _ctx); /* (chars : string) -> parse char */ 


// lift anonymous function
struct kk_std_text_parse_one_of_or_fun3697__t {
  struct kk_function_s _base;
  kk_string_t chars;
};
extern kk_box_t kk_std_text_parse_one_of_or_fun3697(kk_function_t _fself, kk_context_t* _ctx);
static inline kk_function_t kk_std_text_parse_new_one_of_or_fun3697(kk_string_t chars, kk_context_t* _ctx) {
  struct kk_std_text_parse_one_of_or_fun3697__t* _self = kk_function_alloc_as(struct kk_std_text_parse_one_of_or_fun3697__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_one_of_or_fun3697, kk_context());
  _self->chars = chars;
  return &_self->_base;
}



// lift anonymous function
struct kk_std_text_parse_one_of_or_fun3699__t {
  struct kk_function_s _base;
  kk_char_t kkloc_default;
};
extern kk_box_t kk_std_text_parse_one_of_or_fun3699(kk_function_t _fself, kk_context_t* _ctx);
static inline kk_function_t kk_std_text_parse_new_one_of_or_fun3699(kk_char_t kkloc_default, kk_context_t* _ctx) {
  struct kk_std_text_parse_one_of_or_fun3699__t* _self = kk_function_alloc_as(struct kk_std_text_parse_one_of_or_fun3699__t, 1, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_one_of_or_fun3699, kk_context());
  _self->kkloc_default = kkloc_default;
  return &_self->_base;
}


static inline kk_char_t kk_std_text_parse_one_of_or(kk_string_t chars, kk_char_t kkloc_default, kk_context_t* _ctx) { /* (chars : string, default : char) -> parse char */ 
  kk_box_t _x3696 = kk_std_text_parse__lp__bar__bar__rp_(kk_std_text_parse_new_one_of_or_fun3697(chars, _ctx), kk_std_text_parse_new_one_of_or_fun3699(kkloc_default, _ctx), _ctx); /*944*/
  return kk_char_unbox(_x3696, _ctx);
}
 
// monadic lift

static inline kk_std_text_parse__parse_error kk_std_text_parse__mlift2413_parse(kk_string_t msg, kk_std_core__sslice _y_2364, kk_context_t* _ctx) { /* forall<h,a,e> (msg : string, sslice) -> <local<h>|e> parse-error<a> */ 
  return kk_std_text_parse__new_ParseError(kk_reuse_null, msg, _y_2364, _ctx);
}

kk_std_text_parse__parse_error kk_std_text_parse__mlift2414_parse(kk_std_text_parse__parse_error err1, kk_std_text_parse__parse_error _y_2368, kk_context_t* _ctx); /* forall<h,a,e> (err1 : parse-error<a>, parse-error<a>) -> <local<h>|e> parse-error<a> */ 

kk_std_text_parse__parse_error kk_std_text_parse__mlift2415_parse(kk_std_text_parse__parse_error err1, kk_function_t resume, kk_unit_t wild__, kk_context_t* _ctx); /* forall<h,a,e> (err1 : parse-error<a>, resume : (bool) -> <local<h>|e> parse-error<a>, wild_ : ()) -> <local<h>|e> parse-error<a> */ 

kk_std_text_parse__parse_error kk_std_text_parse__mlift2416_parse(kk_ref_t input, kk_function_t resume, kk_std_core__sslice save, kk_std_text_parse__parse_error _y_2366, kk_context_t* _ctx); /* forall<h,a,e> (input : local-var<h,sslice>, resume : (bool) -> <local<h>|e> parse-error<a>, save : sslice, parse-error<a>) -> <local<h>|e> parse-error<a> */ 

kk_std_text_parse__parse_error kk_std_text_parse__mlift2417_parse(kk_ref_t input, kk_function_t resume, kk_std_core__sslice save, kk_context_t* _ctx); /* forall<h,a,e> (input : local-var<h,sslice>, resume : (bool) -> <local<h>|e> parse-error<a>, save : sslice) -> <local<h>|e> parse-error<a> */ 
 
// monadic lift

static inline kk_std_core_types__maybe kk_std_text_parse__mlift2418_parse(kk_box_t x, kk_unit_t wild__0, kk_context_t* _ctx) { /* forall<a,h,e> (x : a, wild_0 : ()) -> <local<h>|e> maybe<a> */ 
  return kk_std_core_types__new_Just(x, _ctx);
}

kk_std_core_types__maybe kk_std_text_parse__mlift2419_parse(kk_ref_t input, kk_function_t pred, kk_std_core__sslice inp, kk_context_t* _ctx); /* forall<a,h,e> (input : local-var<h,sslice>, pred : (sslice) -> total maybe<(a, sslice)>, inp : sslice) -> <local<h>|e> maybe<a> */ 
 
// monadic lift

static inline kk_std_text_parse__parse_error kk_std_text_parse__mlift2420_parse(kk_box_t x0, kk_std_core__sslice _y_2373, kk_context_t* _ctx) { /* forall<h,a,e> (x0 : a, sslice) -> <local<h>|e> parse-error<a> */ 
  return kk_std_text_parse__new_ParseOk(kk_reuse_null, x0, _y_2373, _ctx);
}

kk_std_text_parse__parse_error kk_std_text_parse_parse(kk_std_core__sslice input0, kk_function_t p, kk_context_t* _ctx); /* forall<a,e> (input0 : sslice, p : () -> <parse|e> a) -> e parse-error<a> */ 
 
// monadic lift

static inline kk_box_t kk_std_text_parse__mlift2421_parse_eof(kk_box_t x, kk_unit_t wild__, kk_context_t* _ctx) { /* forall<a,e> (x : a, wild_ : ()) -> <parse|e> a */ 
  return x;
}

kk_box_t kk_std_text_parse__mlift2422_parse_eof(kk_box_t x, kk_context_t* _ctx); /* forall<a,e> (x : a) -> <parse|e> a */ 

kk_std_text_parse__parse_error kk_std_text_parse_parse_eof(kk_std_core__sslice input, kk_function_t p, kk_context_t* _ctx); /* forall<a,e> (input : sslice, p : () -> <parse|e> a) -> e parse-error<a> */ 
 
// monadic lift

static inline kk_integer_t kk_std_text_parse__mlift2423_pnat(kk_std_core__list _y_2381, kk_context_t* _ctx) { /* (list<char>) -> parse int */ 
  kk_string_t _x3780 = kk_std_core_string_2(_y_2381, _ctx); /*string*/
  kk_std_core_types__optional _x3781 = kk_std_core_types__new_Optional(kk_integer_box(kk_integer_from_small(0)), _ctx); /*optional<112>*/
  return kk_std_core_parse_int_default(_x3780, _x3781, kk_std_core_types__new_None(_ctx), _ctx);
}

kk_integer_t kk_std_text_parse_pnat(kk_context_t* _ctx); /* () -> parse int */ 
 
// monadic lift

static inline bool kk_std_text_parse__mlift2424_sign(kk_char_t c0, kk_context_t* _ctx) { /* (c0 : char) -> parse bool */ 
  return (c0 == ('-'));
}

bool kk_std_text_parse_sign(kk_context_t* _ctx); /* () -> parse bool */ 
 
// monadic lift

static inline kk_integer_t kk_std_text_parse__mlift2425_pint(bool neg, kk_integer_t i, kk_context_t* _ctx) { /* (neg : bool, i : int) -> parse int */ 
  if (neg) {
    return kk_integer_neg(i,kk_context());
  }
  {
    return i;
  }
}

kk_integer_t kk_std_text_parse__mlift2426_pint(kk_char_t c0, kk_context_t* _ctx); /* (c0 : char) -> parse int */ 

kk_integer_t kk_std_text_parse_pint(kk_context_t* _ctx); /* () -> parse int */ 

kk_string_t kk_std_text_parse_pstring(kk_string_t s, kk_context_t* _ctx); /* (s : string) -> parse string */ 

kk_std_core_types__maybe kk_std_text_parse_starts_with(kk_string_t s, kk_function_t p, kk_context_t* _ctx); /* forall<a> (s : string, p : () -> parse a) -> maybe<(a, sslice)> */ 

kk_char_t kk_std_text_parse_white(kk_context_t* _ctx); /* () -> parse char */ 

kk_string_t kk_std_text_parse_whitespace(kk_context_t* _ctx); /* () -> parse string */ 

kk_string_t kk_std_text_parse_whitespace0(kk_context_t* _ctx); /* () -> parse string */ 

void kk_std_text_parse__init(kk_context_t* _ctx);


void kk_std_text_parse__done(kk_context_t* _ctx);

#endif // header
