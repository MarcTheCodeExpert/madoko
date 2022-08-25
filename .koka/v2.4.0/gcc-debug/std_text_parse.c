// Koka generated module: "std/text/parse", koka version: 2.4.0, platform: 64-bit
#include "std_text_parse.h"
 
// runtime tag for the `:parse` effect

kk_std_core_hnd__htag kk_std_text_parse__tag_parse;
 
// handler for the `:parse` effect

kk_box_t kk_std_text_parse__handle_parse(int32_t cfc, kk_std_text_parse__hnd_parse hnd, kk_function_t ret, kk_function_t action, kk_context_t* _ctx) { /* forall<a,e,b> (cfc : int32, hnd : .hnd-parse<e,b>, ret : (res : a) -> e b, action : () -> <parse|e> a) -> e b */ 
  kk_std_core_hnd__htag _x3386 = kk_std_core_hnd__htag_dup(kk_std_text_parse__tag_parse); /*std/core/hnd/htag<std/text/parse/.hnd-parse>*/
  return kk_std_core_hnd__hhandle(_x3386, cfc, kk_std_text_parse__hnd_parse_box(hnd, _ctx), ret, action, _ctx);
}

kk_std_core_types__either kk_std_text_parse_either(kk_std_text_parse__parse_error perr, kk_context_t* _ctx) { /* forall<a> (perr : parse-error<a>) -> either<string,a> */ 
  if (kk_std_text_parse__is_ParseOk(perr)) {
    struct kk_std_text_parse_ParseOk* _con3391 = kk_std_text_parse__as_ParseOk(perr);
    kk_box_t x = _con3391->result;
    kk_std_core__sslice _pat0 = _con3391->rest;
    if (kk_likely(kk_std_text_parse__parse_error_is_unique(perr))) {
      kk_std_core__sslice_drop(_pat0, _ctx);
      kk_std_text_parse__parse_error_free(perr, _ctx);
    }
    else {
      kk_box_dup(x);
      kk_std_text_parse__parse_error_decref(perr, _ctx);
    }
    return kk_std_core_types__new_Right(x, _ctx);
  }
  {
    struct kk_std_text_parse_ParseError* _con3392 = kk_std_text_parse__as_ParseError(perr);
    kk_string_t msg = _con3392->msg;
    kk_std_core__sslice _pat5 = _con3392->rest;
    if (kk_likely(kk_std_text_parse__parse_error_is_unique(perr))) {
      kk_std_core__sslice_drop(_pat5, _ctx);
      kk_std_text_parse__parse_error_free(perr, _ctx);
    }
    else {
      kk_string_dup(msg);
      kk_std_text_parse__parse_error_decref(perr, _ctx);
    }
    return kk_std_core_types__new_Left(kk_string_box(msg), _ctx);
  }
}
extern kk_box_t kk_std_text_parse_satisfy_fun3400(kk_function_t _fself, kk_box_t _b_2621, kk_context_t* _ctx) {
  struct kk_std_text_parse_satisfy_fun3400__t* _self = kk_function_as(struct kk_std_text_parse_satisfy_fun3400__t*, _fself);
  kk_function_t pred = _self->pred; /* (sslice) -> total maybe<(516, sslice)> */
  kk_drop_match(_self, {kk_function_dup(pred);}, {}, _ctx)
  kk_std_core_types__maybe _x3401;
  kk_std_core__sslice _x3402 = kk_std_core__sslice_unbox(_b_2621, _ctx); /*sslice*/
  _x3401 = kk_function_call(kk_std_core_types__maybe, (kk_function_t, kk_std_core__sslice, kk_context_t*), pred, (pred, _x3402, _ctx)); /*maybe<(516, sslice)>*/
  return kk_std_core_types__maybe_box(_x3401, _ctx);
}
 
// monadic lift

kk_box_t kk_std_text_parse__mlift2404_satisfy_fail(kk_string_t msg, kk_std_core_types__maybe _y_2315, kk_context_t* _ctx) { /* forall<a> (msg : string, maybe<a>) -> parse a */ 
  if (kk_std_core_types__is_Nothing(_y_2315)) {
    kk_std_core_hnd__ev ev_2434;
    kk_ssize_t _x3403 = (KK_IZ(0)); /*ssize_t*/
    ev_2434 = kk_evv_at(_x3403,kk_context()); /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/
    {
      struct kk_std_core_hnd_Ev* _con3404 = kk_std_core_hnd__as_Ev(ev_2434);
      kk_std_core_hnd__marker m0 = _con3404->marker;
      kk_box_t _box_x2622 = _con3404->hnd;
      kk_std_text_parse__hnd_parse h = kk_std_text_parse__hnd_parse_unbox(_box_x2622, NULL);
      kk_std_text_parse__hnd_parse_dup(h);
      kk_std_core_hnd__clause1 _match_3362;
      kk_std_core_hnd__clause1 _brw_3363 = kk_std_text_parse__select_fail(h, _ctx); /*std/core/hnd/clause1<string,394,std/text/parse/.hnd-parse,395,396>*/;
      kk_std_text_parse__hnd_parse_drop(h, _ctx);
      _match_3362 = _brw_3363; /*std/core/hnd/clause1<string,394,std/text/parse/.hnd-parse,395,396>*/
      {
        kk_function_t _fun_unbox_x2626 = _match_3362.clause;
        return kk_function_call(kk_box_t, (kk_function_t, kk_std_core_hnd__marker, kk_std_core_hnd__ev, kk_box_t, kk_context_t*), _fun_unbox_x2626, (_fun_unbox_x2626, m0, ev_2434, kk_string_box(msg), _ctx));
      }
    }
  }
  {
    kk_box_t x0 = _y_2315._cons.Just.value;
    kk_string_drop(msg, _ctx);
    return x0;
  }
}


// lift anonymous function
struct kk_std_text_parse_satisfy_fail_fun3410__t {
  struct kk_function_s _base;
  kk_function_t pred;
};
static kk_box_t kk_std_text_parse_satisfy_fail_fun3410(kk_function_t _fself, kk_box_t _b_2643, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_satisfy_fail_fun3410(kk_function_t pred, kk_context_t* _ctx) {
  struct kk_std_text_parse_satisfy_fail_fun3410__t* _self = kk_function_alloc_as(struct kk_std_text_parse_satisfy_fail_fun3410__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_satisfy_fail_fun3410, kk_context());
  _self->pred = pred;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_satisfy_fail_fun3410(kk_function_t _fself, kk_box_t _b_2643, kk_context_t* _ctx) {
  struct kk_std_text_parse_satisfy_fail_fun3410__t* _self = kk_function_as(struct kk_std_text_parse_satisfy_fail_fun3410__t*, _fself);
  kk_function_t pred = _self->pred; /* (sslice) -> maybe<(542, sslice)> */
  kk_drop_match(_self, {kk_function_dup(pred);}, {}, _ctx)
  kk_std_core_types__maybe _x3411;
  kk_std_core__sslice _x3412 = kk_std_core__sslice_unbox(_b_2643, _ctx); /*sslice*/
  _x3411 = kk_function_call(kk_std_core_types__maybe, (kk_function_t, kk_std_core__sslice, kk_context_t*), pred, (pred, _x3412, _ctx)); /*maybe<(542, sslice)>*/
  return kk_std_core_types__maybe_box(_x3411, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_satisfy_fail_fun3413__t {
  struct kk_function_s _base;
  kk_string_t msg;
};
static kk_box_t kk_std_text_parse_satisfy_fail_fun3413(kk_function_t _fself, kk_box_t _b_2645, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_satisfy_fail_fun3413(kk_string_t msg, kk_context_t* _ctx) {
  struct kk_std_text_parse_satisfy_fail_fun3413__t* _self = kk_function_alloc_as(struct kk_std_text_parse_satisfy_fail_fun3413__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_satisfy_fail_fun3413, kk_context());
  _self->msg = msg;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_satisfy_fail_fun3413(kk_function_t _fself, kk_box_t _b_2645, kk_context_t* _ctx) {
  struct kk_std_text_parse_satisfy_fail_fun3413__t* _self = kk_function_as(struct kk_std_text_parse_satisfy_fail_fun3413__t*, _fself);
  kk_string_t msg = _self->msg; /* string */
  kk_drop_match(_self, {kk_string_dup(msg);}, {}, _ctx)
  kk_std_core_types__maybe _x3414 = kk_std_core_types__maybe_unbox(_b_2645, _ctx); /*maybe<542>*/
  return kk_std_text_parse__mlift2404_satisfy_fail(msg, _x3414, _ctx);
}

kk_box_t kk_std_text_parse_satisfy_fail(kk_string_t msg, kk_function_t pred, kk_context_t* _ctx) { /* forall<a> (msg : string, pred : (sslice) -> maybe<(a, sslice)>) -> parse a */ 
  kk_std_core_hnd__ev ev_2440;
  kk_ssize_t _x3406 = (KK_IZ(0)); /*ssize_t*/
  ev_2440 = kk_evv_at(_x3406,kk_context()); /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/
  kk_std_core_types__maybe x_2437;
  kk_box_t _x3407;
  {
    struct kk_std_core_hnd_Ev* _con3408 = kk_std_core_hnd__as_Ev(ev_2440);
    kk_std_core_hnd__marker m0 = _con3408->marker;
    kk_box_t _box_x2630 = _con3408->hnd;
    kk_std_text_parse__hnd_parse h = kk_std_text_parse__hnd_parse_unbox(_box_x2630, NULL);
    kk_std_text_parse__hnd_parse_dup(h);
    kk_std_core_hnd__clause1 _match_3360;
    kk_std_core_hnd__clause1 _brw_3361 = kk_std_text_parse__select_satisfy(h, _ctx); /*std/core/hnd/clause1<(sslice) -> total maybe<(433, sslice)>,maybe<433>,std/text/parse/.hnd-parse,434,435>*/;
    kk_std_text_parse__hnd_parse_drop(h, _ctx);
    _match_3360 = _brw_3361; /*std/core/hnd/clause1<(sslice) -> total maybe<(433, sslice)>,maybe<433>,std/text/parse/.hnd-parse,434,435>*/
    {
      kk_function_t _fun_unbox_x2637 = _match_3360.clause;
      _x3407 = kk_function_call(kk_box_t, (kk_function_t, kk_std_core_hnd__marker, kk_std_core_hnd__ev, kk_box_t, kk_context_t*), _fun_unbox_x2637, (_fun_unbox_x2637, m0, ev_2440, kk_function_box(kk_std_text_parse_new_satisfy_fail_fun3410(pred, _ctx)), _ctx)); /*52*/
    }
  }
  x_2437 = kk_std_core_types__maybe_unbox(_x3407, _ctx); /*maybe<542>*/
  if (kk_yielding(kk_context())) {
    kk_std_core_types__maybe_drop(x_2437, _ctx);
    return kk_std_core_hnd_yield_extend(kk_std_text_parse_new_satisfy_fail_fun3413(msg, _ctx), _ctx);
  }
  if (kk_std_core_types__is_Nothing(x_2437)) {
    kk_std_core_hnd__ev ev0_2443;
    kk_ssize_t _x3415 = (KK_IZ(0)); /*ssize_t*/
    ev0_2443 = kk_evv_at(_x3415,kk_context()); /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/
    {
      struct kk_std_core_hnd_Ev* _con3416 = kk_std_core_hnd__as_Ev(ev0_2443);
      kk_std_core_hnd__marker m00 = _con3416->marker;
      kk_box_t _box_x2646 = _con3416->hnd;
      kk_std_text_parse__hnd_parse h0 = kk_std_text_parse__hnd_parse_unbox(_box_x2646, NULL);
      kk_std_text_parse__hnd_parse_dup(h0);
      kk_std_core_hnd__clause1 _match_3358;
      kk_std_core_hnd__clause1 _brw_3359 = kk_std_text_parse__select_fail(h0, _ctx); /*std/core/hnd/clause1<string,394,std/text/parse/.hnd-parse,395,396>*/;
      kk_std_text_parse__hnd_parse_drop(h0, _ctx);
      _match_3358 = _brw_3359; /*std/core/hnd/clause1<string,394,std/text/parse/.hnd-parse,395,396>*/
      {
        kk_function_t _fun_unbox_x2650 = _match_3358.clause;
        return kk_function_call(kk_box_t, (kk_function_t, kk_std_core_hnd__marker, kk_std_core_hnd__ev, kk_box_t, kk_context_t*), _fun_unbox_x2650, (_fun_unbox_x2650, m00, ev0_2443, kk_string_box(msg), _ctx));
      }
    }
  }
  {
    kk_box_t x2 = x_2437._cons.Just.value;
    kk_string_drop(msg, _ctx);
    return x2;
  }
}


// lift anonymous function
struct kk_std_text_parse_char_is_fun3419__t {
  struct kk_function_s _base;
  kk_function_t pred;
};
static kk_std_core_types__maybe kk_std_text_parse_char_is_fun3419(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_char_is_fun3419(kk_function_t pred, kk_context_t* _ctx) {
  struct kk_std_text_parse_char_is_fun3419__t* _self = kk_function_alloc_as(struct kk_std_text_parse_char_is_fun3419__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_char_is_fun3419, kk_context());
  _self->pred = pred;
  return &_self->_base;
}

static kk_std_core_types__maybe kk_std_text_parse_char_is_fun3419(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  struct kk_std_text_parse_char_is_fun3419__t* _self = kk_function_as(struct kk_std_text_parse_char_is_fun3419__t*, _fself);
  kk_function_t pred = _self->pred; /* (char) -> bool */
  kk_drop_match(_self, {kk_function_dup(pred);}, {}, _ctx)
  kk_std_core_types__maybe _match_3356 = kk_std_core_next(slice, _ctx); /*maybe<(char, sslice)>*/;
  if (kk_std_core_types__is_Just(_match_3356)) {
    kk_box_t _box_x2656 = _match_3356._cons.Just.value;
    kk_std_core_types__tuple2_ _pat0 = kk_std_core_types__tuple2__unbox(_box_x2656, NULL);
    if (kk_std_core_types__is_dash__lp__comma__rp_(_pat0)) {
      kk_box_t _box_x2657 = _pat0.fst;
      kk_box_t _box_x2658 = _pat0.snd;
      kk_char_t c = kk_char_unbox(_box_x2657, NULL);
      kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2658, NULL);
      kk_function_t _x3423 = kk_function_dup(pred); /*(char) -> bool*/
      if (kk_function_call(bool, (kk_function_t, kk_char_t, kk_context_t*), _x3423, (_x3423, c, _ctx))) {
        kk_function_drop(pred, _ctx);
        kk_std_core__sslice_dup(rest0);
        kk_std_core_types__maybe_drop(_match_3356, _ctx);
        kk_box_t _x3424;
        kk_std_core_types__tuple2_ _x3425 = kk_std_core_types__new_dash__lp__comma__rp_(kk_char_box(c, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
        _x3424 = kk_std_core_types__tuple2__box(_x3425, _ctx); /*107*/
        return kk_std_core_types__new_Just(_x3424, _ctx);
      }
    }
  }
  {
    kk_function_drop(pred, _ctx);
    kk_std_core_types__maybe_drop(_match_3356, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}

kk_char_t kk_std_text_parse_char_is(kk_string_t msg, kk_function_t pred, kk_context_t* _ctx) { /* (msg : string, pred : (char) -> bool) -> parse char */ 
  kk_box_t _x3418 = kk_std_text_parse_satisfy_fail(msg, kk_std_text_parse_new_char_is_fun3419(pred, _ctx), _ctx); /*542*/
  return kk_char_unbox(_x3418, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_alpha_fun3429__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_alpha_fun3429(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_alpha_fun3429(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_alpha_fun3429, _ctx)
  return kk_function_dup(_fself);
}

static kk_std_core_types__maybe kk_std_text_parse_alpha_fun3429(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__maybe _match_3355 = kk_std_core_next(slice, _ctx); /*maybe<(char, sslice)>*/;
  if (kk_std_core_types__is_Just(_match_3355)) {
    kk_box_t _box_x2669 = _match_3355._cons.Just.value;
    kk_std_core_types__tuple2_ _pat0 = kk_std_core_types__tuple2__unbox(_box_x2669, NULL);
    if (kk_std_core_types__is_dash__lp__comma__rp_(_pat0)) {
      kk_box_t _box_x2670 = _pat0.fst;
      kk_box_t _box_x2671 = _pat0.snd;
      kk_char_t c = kk_char_unbox(_box_x2670, NULL);
      kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2671, NULL);
      if (kk_std_core_is_alpha(c, _ctx)) {
        kk_std_core__sslice_dup(rest0);
        kk_std_core_types__maybe_drop(_match_3355, _ctx);
        kk_box_t _x3433;
        kk_std_core_types__tuple2_ _x3434 = kk_std_core_types__new_dash__lp__comma__rp_(kk_char_box(c, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
        _x3433 = kk_std_core_types__tuple2__box(_x3434, _ctx); /*107*/
        return kk_std_core_types__new_Just(_x3433, _ctx);
      }
    }
  }
  {
    kk_std_core_types__maybe_drop(_match_3355, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}

kk_char_t kk_std_text_parse_alpha(kk_context_t* _ctx) { /* () -> parse char */ 
  kk_box_t _x3426;
  kk_string_t _x3427;
  kk_define_string_literal(, _s3428, 5, "alpha")
  _x3427 = kk_string_dup(_s3428); /*string*/
  _x3426 = kk_std_text_parse_satisfy_fail(_x3427, kk_std_text_parse_new_alpha_fun3429(_ctx), _ctx); /*542*/
  return kk_char_unbox(_x3426, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_alpha_num_fun3438__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_alpha_num_fun3438(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_alpha_num_fun3438(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_alpha_num_fun3438, _ctx)
  return kk_function_dup(_fself);
}

static kk_std_core_types__maybe kk_std_text_parse_alpha_num_fun3438(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__maybe _match_3354 = kk_std_core_next(slice, _ctx); /*maybe<(char, sslice)>*/;
  if (kk_std_core_types__is_Just(_match_3354)) {
    kk_box_t _box_x2682 = _match_3354._cons.Just.value;
    kk_std_core_types__tuple2_ _pat0 = kk_std_core_types__tuple2__unbox(_box_x2682, NULL);
    if (kk_std_core_types__is_dash__lp__comma__rp_(_pat0)) {
      kk_box_t _box_x2683 = _pat0.fst;
      kk_box_t _box_x2684 = _pat0.snd;
      kk_char_t c = kk_char_unbox(_box_x2683, NULL);
      kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2684, NULL);
      if (kk_std_core_is_alpha_num(c, _ctx)) {
        kk_std_core__sslice_dup(rest0);
        kk_std_core_types__maybe_drop(_match_3354, _ctx);
        kk_box_t _x3442;
        kk_std_core_types__tuple2_ _x3443 = kk_std_core_types__new_dash__lp__comma__rp_(kk_char_box(c, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
        _x3442 = kk_std_core_types__tuple2__box(_x3443, _ctx); /*107*/
        return kk_std_core_types__new_Just(_x3442, _ctx);
      }
    }
  }
  {
    kk_std_core_types__maybe_drop(_match_3354, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}

kk_char_t kk_std_text_parse_alpha_num(kk_context_t* _ctx) { /* () -> parse char */ 
  kk_box_t _x3435;
  kk_string_t _x3436;
  kk_define_string_literal(, _s3437, 9, "alpha-num")
  _x3436 = kk_string_dup(_s3437); /*string*/
  _x3435 = kk_std_text_parse_satisfy_fail(_x3436, kk_std_text_parse_new_alpha_num_fun3438(_ctx), _ctx); /*542*/
  return kk_char_unbox(_x3435, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_char_fun3451__t {
  struct kk_function_s _base;
  kk_char_t c;
};
static kk_std_core_types__maybe kk_std_text_parse_char_fun3451(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_char_fun3451(kk_char_t c, kk_context_t* _ctx) {
  struct kk_std_text_parse_char_fun3451__t* _self = kk_function_alloc_as(struct kk_std_text_parse_char_fun3451__t, 1, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_char_fun3451, kk_context());
  _self->c = c;
  return &_self->_base;
}

static kk_std_core_types__maybe kk_std_text_parse_char_fun3451(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  struct kk_std_text_parse_char_fun3451__t* _self = kk_function_as(struct kk_std_text_parse_char_fun3451__t*, _fself);
  kk_char_t c = _self->c; /* char */
  kk_drop_match(_self, {;}, {}, _ctx)
  kk_std_core_types__maybe _match_3353 = kk_std_core_next(slice, _ctx); /*maybe<(char, sslice)>*/;
  if (kk_std_core_types__is_Just(_match_3353)) {
    kk_box_t _box_x2695 = _match_3353._cons.Just.value;
    kk_std_core_types__tuple2_ _pat0 = kk_std_core_types__tuple2__unbox(_box_x2695, NULL);
    if (kk_std_core_types__is_dash__lp__comma__rp_(_pat0)) {
      kk_box_t _box_x2696 = _pat0.fst;
      kk_box_t _box_x2697 = _pat0.snd;
      kk_char_t c0 = kk_char_unbox(_box_x2696, NULL);
      kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2697, NULL);
      if (c == c0) {
        kk_std_core__sslice_dup(rest0);
        kk_std_core_types__maybe_drop(_match_3353, _ctx);
        kk_box_t _x3455;
        kk_std_core_types__tuple2_ _x3456 = kk_std_core_types__new_dash__lp__comma__rp_(kk_char_box(c0, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
        _x3455 = kk_std_core_types__tuple2__box(_x3456, _ctx); /*107*/
        return kk_std_core_types__new_Just(_x3455, _ctx);
      }
    }
  }
  {
    kk_std_core_types__maybe_drop(_match_3353, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}

kk_char_t kk_std_text_parse_char(kk_char_t c, kk_context_t* _ctx) { /* (c : char) -> parse char */ 
  kk_string_t msg_2252;
  kk_string_t _x3444;
  kk_define_string_literal(, _s3445, 1, "\'")
  _x3444 = kk_string_dup(_s3445); /*string*/
  kk_string_t _x3446;
  kk_string_t _x3447 = kk_std_core_show_char(c, _ctx); /*string*/
  kk_string_t _x3448;
  kk_define_string_literal(, _s3449, 1, "\'")
  _x3448 = kk_string_dup(_s3449); /*string*/
  _x3446 = kk_std_core__lp__plus__plus__1_rp_(_x3447, _x3448, _ctx); /*string*/
  msg_2252 = kk_std_core__lp__plus__plus__1_rp_(_x3444, _x3446, _ctx); /*string*/
  kk_box_t _x3450 = kk_std_text_parse_satisfy_fail(msg_2252, kk_std_text_parse_new_char_fun3451(c, _ctx), _ctx); /*542*/
  return kk_char_unbox(_x3450, _ctx);
}

kk_std_core_types__tuple2_ kk_std_text_parse_next_while0(kk_std_core__sslice slice, kk_function_t pred, kk_std_core__list acc, kk_context_t* _ctx) { /* (slice : sslice, pred : (char) -> bool, acc : list<char>) -> (list<char>, sslice) */ 
  kk__tailcall: ;
  kk_std_core_types__maybe _match_3352;
  kk_std_core__sslice _x3457 = kk_std_core__sslice_dup(slice); /*sslice*/
  _match_3352 = kk_std_core_next(_x3457, _ctx); /*maybe<(char, sslice)>*/
  if (kk_std_core_types__is_Just(_match_3352)) {
    kk_box_t _box_x2708 = _match_3352._cons.Just.value;
    kk_std_core_types__tuple2_ _pat0 = kk_std_core_types__tuple2__unbox(_box_x2708, NULL);
    if (kk_std_core_types__is_dash__lp__comma__rp_(_pat0)) {
      kk_box_t _box_x2709 = _pat0.fst;
      kk_box_t _box_x2710 = _pat0.snd;
      kk_char_t c = kk_char_unbox(_box_x2709, NULL);
      kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2710, NULL);
      kk_function_t _x3461 = kk_function_dup(pred); /*(char) -> bool*/
      if (kk_function_call(bool, (kk_function_t, kk_char_t, kk_context_t*), _x3461, (_x3461, c, _ctx))) {
        kk_std_core__sslice_drop(slice, _ctx);
        kk_std_core__sslice_dup(rest0);
        kk_std_core_types__maybe_drop(_match_3352, _ctx);
        { // tailcall
          kk_std_core__list _x3462 = kk_std_core__new_Cons(kk_reuse_null, kk_char_box(c, _ctx), acc, _ctx); /*list<61>*/
          slice = rest0;
          acc = _x3462;
          goto kk__tailcall;
        }
      }
    }
  }
  {
    kk_function_drop(pred, _ctx);
    kk_std_core_types__maybe_drop(_match_3352, _ctx);
    kk_std_core__list _b_2717_2713 = kk_std_core__lift17195_reverse(kk_std_core__new_Nil(_ctx), acc, _ctx); /*list<char>*/;
    return kk_std_core_types__new_dash__lp__comma__rp_(kk_std_core__list_box(_b_2717_2713, _ctx), kk_std_core__sslice_box(slice, _ctx), _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_chars_are_fun3464__t {
  struct kk_function_s _base;
  kk_function_t pred;
};
static kk_std_core_types__maybe kk_std_text_parse_chars_are_fun3464(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_chars_are_fun3464(kk_function_t pred, kk_context_t* _ctx) {
  struct kk_std_text_parse_chars_are_fun3464__t* _self = kk_function_alloc_as(struct kk_std_text_parse_chars_are_fun3464__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_chars_are_fun3464, kk_context());
  _self->pred = pred;
  return &_self->_base;
}

static kk_std_core_types__maybe kk_std_text_parse_chars_are_fun3464(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  struct kk_std_text_parse_chars_are_fun3464__t* _self = kk_function_as(struct kk_std_text_parse_chars_are_fun3464__t*, _fself);
  kk_function_t pred = _self->pred; /* (char) -> bool */
  kk_drop_match(_self, {kk_function_dup(pred);}, {}, _ctx)
  kk_std_core_types__tuple2_ _match_3351 = kk_std_text_parse_next_while0(slice, pred, kk_std_core__new_Nil(_ctx), _ctx); /*(list<char>, sslice)*/;
  {
    kk_box_t _box_x2719 = _match_3351.fst;
    kk_box_t _box_x2720 = _match_3351.snd;
    kk_std_core__list _pat0 = kk_std_core__list_unbox(_box_x2719, NULL);
    kk_std_core__sslice _pat1 = kk_std_core__sslice_unbox(_box_x2720, NULL);
    if (kk_std_core__is_Nil(_pat0)) {
      kk_std_core_types__tuple2__drop(_match_3351, _ctx);
      return kk_std_core_types__new_Nothing(_ctx);
    }
  }
  {
    kk_box_t _box_x2721 = _match_3351.fst;
    kk_box_t _box_x2722 = _match_3351.snd;
    kk_std_core__list xs = kk_std_core__list_unbox(_box_x2721, NULL);
    kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2722, NULL);
    kk_std_core__sslice_dup(rest0);
    kk_std_core__list_dup(xs);
    kk_std_core_types__tuple2__drop(_match_3351, _ctx);
    kk_box_t _x3469;
    kk_std_core_types__tuple2_ _x3470 = kk_std_core_types__new_dash__lp__comma__rp_(kk_std_core__list_box(xs, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
    _x3469 = kk_std_core_types__tuple2__box(_x3470, _ctx); /*107*/
    return kk_std_core_types__new_Just(_x3469, _ctx);
  }
}

kk_std_core__list kk_std_text_parse_chars_are(kk_string_t msg, kk_function_t pred, kk_context_t* _ctx) { /* (msg : string, pred : (char) -> bool) -> parse list<char> */ 
  kk_box_t _x3463 = kk_std_text_parse_satisfy_fail(msg, kk_std_text_parse_new_chars_are_fun3464(pred, _ctx), _ctx); /*542*/
  return kk_std_core__list_unbox(_x3463, _ctx);
}
 
// monadic lift

kk_box_t kk_std_text_parse__mlift2405_choose(kk_function_t p0, kk_std_core__list pp, bool _y_2327, kk_context_t* _ctx) { /* forall<a,e> (p0 : parser<e,a>, pp : list<parser<e,a>>, bool) -> <parse|e> a */ 
  if (_y_2327) {
    kk_std_core__list_drop(pp, _ctx);
    return kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), p0, (p0, _ctx));
  }
  {
    kk_function_drop(p0, _ctx);
    return kk_std_text_parse_choose(pp, _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_choose_fun3476__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_choose_fun3476(kk_function_t _fself, kk_box_t _b_2742, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_choose_fun3476(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_choose_fun3476, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_choose_fun3476(kk_function_t _fself, kk_box_t _b_2742, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x3477 = kk_string_unbox(_b_2742); /*string*/
  return kk_std_text_parse_fail(_x3477, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_choose_fun3486__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_choose_fun3486(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_choose_fun3486(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_choose_fun3486, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_choose_fun3486(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_hnd__ev ev_2451;
  kk_ssize_t _x3487 = (KK_IZ(0)); /*ssize_t*/
  ev_2451 = kk_evv_at(_x3487,kk_context()); /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/
  {
    struct kk_std_core_hnd_Ev* _con3488 = kk_std_core_hnd__as_Ev(ev_2451);
    kk_std_core_hnd__marker m0 = _con3488->marker;
    kk_box_t _box_x2749 = _con3488->hnd;
    kk_std_text_parse__hnd_parse h = kk_std_text_parse__hnd_parse_unbox(_box_x2749, NULL);
    kk_std_text_parse__hnd_parse_dup(h);
    kk_std_core_hnd__clause0 _match_3347;
    kk_std_core_hnd__clause0 _brw_3348 = kk_std_text_parse__select_pick(h, _ctx); /*std/core/hnd/clause0<bool,std/text/parse/.hnd-parse,412,413>*/;
    kk_std_text_parse__hnd_parse_drop(h, _ctx);
    _match_3347 = _brw_3348; /*std/core/hnd/clause0<bool,std/text/parse/.hnd-parse,412,413>*/
    {
      kk_function_t _fun_unbox_x2752 = _match_3347.clause;
      return kk_function_call(kk_box_t, (kk_function_t, kk_std_core_hnd__marker, kk_std_core_hnd__ev, kk_context_t*), _fun_unbox_x2752, (_fun_unbox_x2752, m0, ev_2451, _ctx));
    }
  }
}


// lift anonymous function
struct kk_std_text_parse_choose_fun3490__t {
  struct kk_function_s _base;
  kk_function_t p00;
  kk_std_core__list pp0;
};
static kk_box_t kk_std_text_parse_choose_fun3490(kk_function_t _fself, kk_box_t _b_2760, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_choose_fun3490(kk_function_t p00, kk_std_core__list pp0, kk_context_t* _ctx) {
  struct kk_std_text_parse_choose_fun3490__t* _self = kk_function_alloc_as(struct kk_std_text_parse_choose_fun3490__t, 3, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_choose_fun3490, kk_context());
  _self->p00 = p00;
  _self->pp0 = pp0;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_choose_fun3490(kk_function_t _fself, kk_box_t _b_2760, kk_context_t* _ctx) {
  struct kk_std_text_parse_choose_fun3490__t* _self = kk_function_as(struct kk_std_text_parse_choose_fun3490__t*, _fself);
  kk_function_t p00 = _self->p00; /* std/text/parse/parser<766,765> */
  kk_std_core__list pp0 = _self->pp0; /* list<std/text/parse/parser<766,765>> */
  kk_drop_match(_self, {kk_function_dup(p00);kk_std_core__list_dup(pp0);}, {}, _ctx)
  bool _x3491 = kk_bool_unbox(_b_2760); /*bool*/
  return kk_std_text_parse__mlift2405_choose(p00, pp0, _x3491, _ctx);
}

kk_box_t kk_std_text_parse_choose(kk_std_core__list ps, kk_context_t* _ctx) { /* forall<a,e> (ps : list<parser<e,a>>) -> <parse|e> a */ 
  kk__tailcall: ;
  if (kk_std_core__is_Nil(ps)) {
    kk_ssize_t _b_2761_2739;
    kk_std_core_hnd__htag _x3475 = kk_std_core_hnd__htag_dup(kk_std_text_parse__tag_parse); /*std/core/hnd/htag<std/text/parse/.hnd-parse>*/
    _b_2761_2739 = kk_std_core_hnd__evv_index(_x3475, _ctx); /*std/core/hnd/ev-index*/
    kk_box_t _x3478;
    kk_string_t _x3479;
    kk_define_string_literal(, _s3480, 23, "no further alternatives")
    _x3479 = kk_string_dup(_s3480); /*string*/
    _x3478 = kk_string_box(_x3479); /*5494*/
    return kk_std_core_hnd__open_at1(_b_2761_2739, kk_std_text_parse_new_choose_fun3476(_ctx), _x3478, _ctx);
  }
  {
    struct kk_std_core_Cons* _con3481 = kk_std_core__as_Cons(ps);
    kk_box_t _fun_unbox_x2744 = _con3481->head;
    kk_std_core__list _pat1 = _con3481->tail;
    if (kk_std_core__is_Nil(_pat1)) {
      if (kk_likely(kk_std_core__list_is_unique(ps))) {
        kk_std_core__list_free(ps, _ctx);
      }
      else {
        kk_box_dup(_fun_unbox_x2744);
        kk_std_core__list_decref(ps, _ctx);
      }
      kk_function_t _x3482 = kk_function_unbox(_fun_unbox_x2744); /*() -> <std/text/parse/parse|766> 2745*/
      return kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), _x3482, (_x3482, _ctx));
    }
  }
  {
    struct kk_std_core_Cons* _con3483 = kk_std_core__as_Cons(ps);
    kk_box_t _fun_unbox_x2747 = _con3483->head;
    kk_std_core__list pp0 = _con3483->tail;
    if (kk_likely(kk_std_core__list_is_unique(ps))) {
      kk_std_core__list_free(ps, _ctx);
    }
    else {
      kk_box_dup(_fun_unbox_x2747);
      kk_std_core__list_dup(pp0);
      kk_std_core__list_decref(ps, _ctx);
    }
    kk_function_t p00 = kk_function_unbox(_fun_unbox_x2747); /*std/text/parse/parser<766,765>*/;
    kk_ssize_t _b_2757_2755;
    kk_std_core_hnd__htag _x3484 = kk_std_core_hnd__htag_dup(kk_std_text_parse__tag_parse); /*std/core/hnd/htag<std/text/parse/.hnd-parse>*/
    _b_2757_2755 = kk_std_core_hnd__evv_index(_x3484, _ctx); /*std/core/hnd/ev-index*/
    bool x_2448;
    kk_box_t _x3485 = kk_std_core_hnd__open_at0(_b_2757_2755, kk_std_text_parse_new_choose_fun3486(_ctx), _ctx); /*5388*/
    x_2448 = kk_bool_unbox(_x3485); /*bool*/
    if (kk_yielding(kk_context())) {
      return kk_std_core_hnd_yield_extend(kk_std_text_parse_new_choose_fun3490(p00, pp0, _ctx), _ctx);
    }
    if (x_2448) {
      kk_std_core__list_drop(pp0, _ctx);
      return kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), p00, (p00, _ctx));
    }
    {
      kk_function_drop(p00, _ctx);
      { // tailcall
        ps = pp0;
        goto kk__tailcall;
      }
    }
  }
}
 
// monadic lift

kk_std_core__list kk_std_text_parse__mlift2406_count_acc(kk_std_core__list acc, kk_integer_t n, kk_function_t p, kk_box_t x, kk_context_t* _ctx) { /* forall<a,e> (acc : list<a>, n : int, p : parser<e,a>, x : a) -> <parse|e> list<a> */ 
  kk_integer_t _x3492 = kk_integer_add_small_const(n, -1, _ctx); /*int*/
  kk_std_core__list _x3493 = kk_std_core__new_Cons(kk_reuse_null, x, acc, _ctx); /*list<61>*/
  return kk_std_text_parse_count_acc(_x3492, _x3493, p, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_count_acc_fun3496__t {
  struct kk_function_s _base;
  kk_std_core__list acc0;
  kk_integer_t n0;
  kk_function_t p0;
};
static kk_box_t kk_std_text_parse_count_acc_fun3496(kk_function_t _fself, kk_box_t _b_2767, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_count_acc_fun3496(kk_std_core__list acc0, kk_integer_t n0, kk_function_t p0, kk_context_t* _ctx) {
  struct kk_std_text_parse_count_acc_fun3496__t* _self = kk_function_alloc_as(struct kk_std_text_parse_count_acc_fun3496__t, 4, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_count_acc_fun3496, kk_context());
  _self->acc0 = acc0;
  _self->n0 = n0;
  _self->p0 = p0;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_count_acc_fun3496(kk_function_t _fself, kk_box_t _b_2767, kk_context_t* _ctx) {
  struct kk_std_text_parse_count_acc_fun3496__t* _self = kk_function_as(struct kk_std_text_parse_count_acc_fun3496__t*, _fself);
  kk_std_core__list acc0 = _self->acc0; /* list<820> */
  kk_integer_t n0 = _self->n0; /* int */
  kk_function_t p0 = _self->p0; /* std/text/parse/parser<821,820> */
  kk_drop_match(_self, {kk_std_core__list_dup(acc0);kk_integer_dup(n0);kk_function_dup(p0);}, {}, _ctx)
  kk_box_t x1_2769 = _b_2767; /*820*/;
  kk_std_core__list _x3497 = kk_std_text_parse__mlift2406_count_acc(acc0, n0, p0, x1_2769, _ctx); /*list<820>*/
  return kk_std_core__list_box(_x3497, _ctx);
}

kk_std_core__list kk_std_text_parse_count_acc(kk_integer_t n0, kk_std_core__list acc0, kk_function_t p0, kk_context_t* _ctx) { /* forall<a,e> (n : int, acc : list<a>, p : parser<e,a>) -> <parse|e> list<a> */ 
  kk__tailcall: ;
  bool _match_3344 = kk_integer_lte_borrow(n0,(kk_integer_from_small(0)),kk_context()); /*bool*/;
  if (_match_3344) {
    kk_function_drop(p0, _ctx);
    kk_integer_drop(n0, _ctx);
    return kk_std_core_reverse(acc0, _ctx);
  }
  {
    kk_box_t x0_2453;
    kk_function_t _x3494 = kk_function_dup(p0); /*std/text/parse/parser<821,820>*/
    x0_2453 = kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), _x3494, (_x3494, _ctx)); /*820*/
    if (kk_yielding(kk_context())) {
      kk_box_drop(x0_2453, _ctx);
      kk_box_t _x3495 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_count_acc_fun3496(acc0, n0, p0, _ctx), _ctx); /*3926*/
      return kk_std_core__list_unbox(_x3495, _ctx);
    }
    { // tailcall
      kk_integer_t _x3498 = kk_integer_add_small_const(n0, -1, _ctx); /*int*/
      kk_std_core__list _x3499 = kk_std_core__new_Cons(kk_reuse_null, x0_2453, acc0, _ctx); /*list<61>*/
      n0 = _x3498;
      acc0 = _x3499;
      goto kk__tailcall;
    }
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_text_parse__mlift2407_digit_fun3506__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse__mlift2407_digit_fun3506(kk_function_t _fself, kk_box_t _b_2779, kk_box_t _b_2780, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse__new_mlift2407_digit_fun3506(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse__mlift2407_digit_fun3506, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse__mlift2407_digit_fun3506(kk_function_t _fself, kk_box_t _b_2779, kk_box_t _b_2780, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_char_t _x3507;
  kk_char_t c1_2784 = kk_char_unbox(_b_2779, _ctx); /*char*/;
  kk_char_t d_2785 = kk_char_unbox(_b_2780, _ctx); /*char*/;
  kk_integer_t x_16956 = kk_integer_from_int(c1_2784,kk_context()); /*int*/;
  kk_integer_t y_16957 = kk_integer_from_int(d_2785,kk_context()); /*int*/;
  kk_integer_t _x3508 = kk_integer_sub(x_16956,y_16957,kk_context()); /*int*/
  _x3507 = kk_integer_clamp32(_x3508,kk_context()); /*char*/
  return kk_char_box(_x3507, _ctx);
}

kk_integer_t kk_std_text_parse__mlift2407_digit(kk_char_t c00, kk_context_t* _ctx) { /* (c00 : char) -> parse int */ 
  kk_char_t _x3504;
  kk_box_t _x3505 = kk_std_core_hnd__open_none2(kk_std_text_parse__new_mlift2407_digit_fun3506(_ctx), kk_char_box(c00, _ctx), kk_char_box('0', _ctx), _ctx); /*3449*/
  _x3504 = kk_char_unbox(_x3505, _ctx); /*char*/
  return kk_integer_from_int(_x3504,kk_context());
}


// lift anonymous function
struct kk_std_text_parse_digit_fun3512__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_digit_fun3512(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_digit_fun3512(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_digit_fun3512, _ctx)
  return kk_function_dup(_fself);
}

static kk_std_core_types__maybe kk_std_text_parse_digit_fun3512(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__maybe _match_3340 = kk_std_core_next(slice, _ctx); /*maybe<(char, sslice)>*/;
  if (kk_std_core_types__is_Just(_match_3340)) {
    kk_box_t _box_x2786 = _match_3340._cons.Just.value;
    kk_std_core_types__tuple2_ _pat00 = kk_std_core_types__tuple2__unbox(_box_x2786, NULL);
    if (kk_std_core_types__is_dash__lp__comma__rp_(_pat00)) {
      kk_box_t _box_x2787 = _pat00.fst;
      kk_box_t _box_x2788 = _pat00.snd;
      kk_char_t c = kk_char_unbox(_box_x2787, NULL);
      kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2788, NULL);
      bool _match_3341 = (c >= ('0')); /*bool*/;
      bool _x3516;
      if (_match_3341) {
        _x3516 = (c <= ('9')); /*bool*/
      }
      else {
        _x3516 = false; /*bool*/
      }
      if (_x3516) {
        kk_std_core__sslice_dup(rest0);
        kk_std_core_types__maybe_drop(_match_3340, _ctx);
        kk_box_t _x3517;
        kk_std_core_types__tuple2_ _x3518 = kk_std_core_types__new_dash__lp__comma__rp_(kk_char_box(c, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
        _x3517 = kk_std_core_types__tuple2__box(_x3518, _ctx); /*107*/
        return kk_std_core_types__new_Just(_x3517, _ctx);
      }
    }
  }
  {
    kk_std_core_types__maybe_drop(_match_3340, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_digit_fun3520__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_digit_fun3520(kk_function_t _fself, kk_box_t _b_2800, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_digit_fun3520(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_digit_fun3520, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_digit_fun3520(kk_function_t _fself, kk_box_t _b_2800, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_integer_t _x3521;
  kk_char_t _x3522 = kk_char_unbox(_b_2800, _ctx); /*char*/
  _x3521 = kk_std_text_parse__mlift2407_digit(_x3522, _ctx); /*int*/
  return kk_integer_box(_x3521);
}


// lift anonymous function
struct kk_std_text_parse_digit_fun3525__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_digit_fun3525(kk_function_t _fself, kk_box_t _b_2804, kk_box_t _b_2805, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_digit_fun3525(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_digit_fun3525, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_digit_fun3525(kk_function_t _fself, kk_box_t _b_2804, kk_box_t _b_2805, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_char_t _x3526;
  kk_char_t c1_2810 = kk_char_unbox(_b_2804, _ctx); /*char*/;
  kk_char_t d_2811 = kk_char_unbox(_b_2805, _ctx); /*char*/;
  kk_integer_t x_16956 = kk_integer_from_int(c1_2810,kk_context()); /*int*/;
  kk_integer_t y_16957 = kk_integer_from_int(d_2811,kk_context()); /*int*/;
  kk_integer_t _x3527 = kk_integer_sub(x_16956,y_16957,kk_context()); /*int*/
  _x3526 = kk_integer_clamp32(_x3527,kk_context()); /*char*/
  return kk_char_box(_x3526, _ctx);
}

kk_integer_t kk_std_text_parse_digit(kk_context_t* _ctx) { /* () -> parse int */ 
  kk_char_t x_2458;
  kk_box_t _x3509;
  kk_string_t _x3510;
  kk_define_string_literal(, _s3511, 5, "digit")
  _x3510 = kk_string_dup(_s3511); /*string*/
  _x3509 = kk_std_text_parse_satisfy_fail(_x3510, kk_std_text_parse_new_digit_fun3512(_ctx), _ctx); /*542*/
  x_2458 = kk_char_unbox(_x3509, _ctx); /*char*/
  if (kk_yielding(kk_context())) {
    kk_box_t _x3519 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_digit_fun3520(_ctx), _ctx); /*3926*/
    return kk_integer_unbox(_x3519);
  }
  {
    kk_char_t _x3523;
    kk_box_t _x3524 = kk_std_core_hnd__open_none2(kk_std_text_parse_new_digit_fun3525(_ctx), kk_char_box(x_2458, _ctx), kk_char_box('0', _ctx), _ctx); /*3449*/
    _x3523 = kk_char_unbox(_x3524, _ctx); /*char*/
    return kk_integer_from_int(_x3523,kk_context());
  }
}


// lift anonymous function
struct kk_std_text_parse_digits_fun3531__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_digits_fun3531(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_digits_fun3531(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_digits_fun3531, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_text_parse_digits_fun3533__t {
  struct kk_function_s _base;
};
static bool kk_std_text_parse_digits_fun3533(kk_function_t _fself, kk_char_t _x13532, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_digits_fun3533(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_digits_fun3533, _ctx)
  return kk_function_dup(_fself);
}

static bool kk_std_text_parse_digits_fun3533(kk_function_t _fself, kk_char_t _x13532, kk_context_t* _ctx) {
  kk_unused(_fself);
  return kk_std_core_is_digit(_x13532, _ctx);
}
static kk_std_core_types__maybe kk_std_text_parse_digits_fun3531(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__tuple2_ _match_3338 = kk_std_text_parse_next_while0(slice, kk_std_text_parse_new_digits_fun3533(_ctx), kk_std_core__new_Nil(_ctx), _ctx); /*(list<char>, sslice)*/;
  {
    kk_box_t _box_x2812 = _match_3338.fst;
    kk_box_t _box_x2813 = _match_3338.snd;
    kk_std_core__list _pat00 = kk_std_core__list_unbox(_box_x2812, NULL);
    kk_std_core__sslice _pat10 = kk_std_core__sslice_unbox(_box_x2813, NULL);
    if (kk_std_core__is_Nil(_pat00)) {
      kk_std_core_types__tuple2__drop(_match_3338, _ctx);
      return kk_std_core_types__new_Nothing(_ctx);
    }
  }
  {
    kk_box_t _box_x2814 = _match_3338.fst;
    kk_box_t _box_x2815 = _match_3338.snd;
    kk_std_core__list xs = kk_std_core__list_unbox(_box_x2814, NULL);
    kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2815, NULL);
    kk_std_core__sslice_dup(rest0);
    kk_std_core__list_dup(xs);
    kk_std_core_types__tuple2__drop(_match_3338, _ctx);
    kk_box_t _x3538;
    kk_std_core_types__tuple2_ _x3539 = kk_std_core_types__new_dash__lp__comma__rp_(kk_std_core__list_box(xs, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
    _x3538 = kk_std_core_types__tuple2__box(_x3539, _ctx); /*107*/
    return kk_std_core_types__new_Just(_x3538, _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_digits_fun3541__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_digits_fun3541(kk_function_t _fself, kk_box_t _b_2827, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_digits_fun3541(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_digits_fun3541, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_digits_fun3541(kk_function_t _fself, kk_box_t _b_2827, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x3542;
  kk_std_core__list _x3543 = kk_std_core__list_unbox(_b_2827, _ctx); /*list<char>*/
  _x3542 = kk_std_core_string_2(_x3543, _ctx); /*string*/
  return kk_string_box(_x3542);
}

kk_string_t kk_std_text_parse_digits(kk_context_t* _ctx) { /* () -> parse string */ 
  kk_std_core__list x_2461;
  kk_box_t _x3528;
  kk_string_t _x3529;
  kk_define_string_literal(, _s3530, 5, "digit")
  _x3529 = kk_string_dup(_s3530); /*string*/
  _x3528 = kk_std_text_parse_satisfy_fail(_x3529, kk_std_text_parse_new_digits_fun3531(_ctx), _ctx); /*542*/
  x_2461 = kk_std_core__list_unbox(_x3528, _ctx); /*list<char>*/
  if (kk_yielding(kk_context())) {
    kk_std_core__list_drop(x_2461, _ctx);
    kk_box_t _x3540 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_digits_fun3541(_ctx), _ctx); /*3926*/
    return kk_string_unbox(_x3540);
  }
  {
    return kk_std_core_string_2(x_2461, _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse__lp__bar__bar__fun3546__t_rp_ {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse__lp__bar__bar__fun3546_rp_(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_dash__bar__bar__fun3546(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse__lp__bar__bar__fun3546_rp_, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse__lp__bar__bar__fun3546_rp_(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_hnd__ev ev_2466;
  kk_ssize_t _x3547 = (KK_IZ(0)); /*ssize_t*/
  ev_2466 = kk_evv_at(_x3547,kk_context()); /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/
  {
    struct kk_std_core_hnd_Ev* _con3548 = kk_std_core_hnd__as_Ev(ev_2466);
    kk_std_core_hnd__marker m0 = _con3548->marker;
    kk_box_t _box_x2829 = _con3548->hnd;
    kk_std_text_parse__hnd_parse h = kk_std_text_parse__hnd_parse_unbox(_box_x2829, NULL);
    kk_std_text_parse__hnd_parse_dup(h);
    kk_std_core_hnd__clause0 _match_3335;
    kk_std_core_hnd__clause0 _brw_3336 = kk_std_text_parse__select_pick(h, _ctx); /*std/core/hnd/clause0<bool,std/text/parse/.hnd-parse,412,413>*/;
    kk_std_text_parse__hnd_parse_drop(h, _ctx);
    _match_3335 = _brw_3336; /*std/core/hnd/clause0<bool,std/text/parse/.hnd-parse,412,413>*/
    {
      kk_function_t _fun_unbox_x2832 = _match_3335.clause;
      return kk_function_call(kk_box_t, (kk_function_t, kk_std_core_hnd__marker, kk_std_core_hnd__ev, kk_context_t*), _fun_unbox_x2832, (_fun_unbox_x2832, m0, ev_2466, _ctx));
    }
  }
}


// lift anonymous function
struct kk_std_text_parse__lp__bar__bar__fun3550__t_rp_ {
  struct kk_function_s _base;
  kk_function_t p1;
  kk_function_t p2;
};
static kk_box_t kk_std_text_parse__lp__bar__bar__fun3550_rp_(kk_function_t _fself, kk_box_t _b_2840, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_dash__bar__bar__fun3550(kk_function_t p1, kk_function_t p2, kk_context_t* _ctx) {
  struct kk_std_text_parse__lp__bar__bar__fun3550__t_rp_* _self = kk_function_alloc_as(struct kk_std_text_parse__lp__bar__bar__fun3550__t_rp_, 3, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse__lp__bar__bar__fun3550_rp_, kk_context());
  _self->p1 = p1;
  _self->p2 = p2;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse__lp__bar__bar__fun3550_rp_(kk_function_t _fself, kk_box_t _b_2840, kk_context_t* _ctx) {
  struct kk_std_text_parse__lp__bar__bar__fun3550__t_rp_* _self = kk_function_as(struct kk_std_text_parse__lp__bar__bar__fun3550__t_rp_*, _fself);
  kk_function_t p1 = _self->p1; /* std/text/parse/parser<945,944> */
  kk_function_t p2 = _self->p2; /* std/text/parse/parser<945,944> */
  kk_drop_match(_self, {kk_function_dup(p1);kk_function_dup(p2);}, {}, _ctx)
  bool _match_3334 = kk_bool_unbox(_b_2840); /*bool*/;
  if (_match_3334) {
    kk_function_drop(p2, _ctx);
    return kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), p1, (p1, _ctx));
  }
  {
    kk_function_drop(p1, _ctx);
    return kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), p2, (p2, _ctx));
  }
}

kk_box_t kk_std_text_parse__lp__bar__bar__rp_(kk_function_t p1, kk_function_t p2, kk_context_t* _ctx) { /* forall<a,e> (p1 : parser<e,a>, p2 : parser<e,a>) -> <parse|e> a */ 
  kk_ssize_t _b_2837_2835;
  kk_std_core_hnd__htag _x3544 = kk_std_core_hnd__htag_dup(kk_std_text_parse__tag_parse); /*std/core/hnd/htag<std/text/parse/.hnd-parse>*/
  _b_2837_2835 = kk_std_core_hnd__evv_index(_x3544, _ctx); /*std/core/hnd/ev-index*/
  bool x_2463;
  kk_box_t _x3545 = kk_std_core_hnd__open_at0(_b_2837_2835, kk_std_text_parse_new_dash__bar__bar__fun3546(_ctx), _ctx); /*5388*/
  x_2463 = kk_bool_unbox(_x3545); /*bool*/
  if (kk_yielding(kk_context())) {
    return kk_std_core_hnd_yield_extend(kk_std_text_parse_new_dash__bar__bar__fun3550(p1, p2, _ctx), _ctx);
  }
  if (x_2463) {
    kk_function_drop(p2, _ctx);
    return kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), p1, (p1, _ctx));
  }
  {
    kk_function_drop(p1, _ctx);
    return kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), p2, (p2, _ctx));
  }
}
extern kk_box_t kk_std_text_parse_optional_fun3551(kk_function_t _fself, kk_context_t* _ctx) {
  struct kk_std_text_parse_optional_fun3551__t* _self = kk_function_as(struct kk_std_text_parse_optional_fun3551__t*, _fself);
  kk_box_t kkloc_default = _self->kkloc_default; /* 986 */
  kk_drop_match(_self, {kk_box_dup(kkloc_default);}, {}, _ctx)
  return kkloc_default;
}


// lift anonymous function
struct kk_std_text_parse_digits0_fun3553__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_digits0_fun3553(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_digits0_fun3553(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_digits0_fun3553, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_text_parse_digits0_fun3557__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_digits0_fun3557(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_digits0_fun3557(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_digits0_fun3557, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_text_parse_digits0_fun3559__t {
  struct kk_function_s _base;
};
static bool kk_std_text_parse_digits0_fun3559(kk_function_t _fself, kk_char_t _x13558, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_digits0_fun3559(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_digits0_fun3559, _ctx)
  return kk_function_dup(_fself);
}

static bool kk_std_text_parse_digits0_fun3559(kk_function_t _fself, kk_char_t _x13558, kk_context_t* _ctx) {
  kk_unused(_fself);
  return kk_std_core_is_digit(_x13558, _ctx);
}
static kk_std_core_types__maybe kk_std_text_parse_digits0_fun3557(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__tuple2_ _match_3332 = kk_std_text_parse_next_while0(slice, kk_std_text_parse_new_digits0_fun3559(_ctx), kk_std_core__new_Nil(_ctx), _ctx); /*(list<char>, sslice)*/;
  {
    kk_box_t _box_x2843 = _match_3332.fst;
    kk_box_t _box_x2844 = _match_3332.snd;
    kk_std_core__list _pat00 = kk_std_core__list_unbox(_box_x2843, NULL);
    kk_std_core__sslice _pat10 = kk_std_core__sslice_unbox(_box_x2844, NULL);
    if (kk_std_core__is_Nil(_pat00)) {
      kk_std_core_types__tuple2__drop(_match_3332, _ctx);
      return kk_std_core_types__new_Nothing(_ctx);
    }
  }
  {
    kk_box_t _box_x2845 = _match_3332.fst;
    kk_box_t _box_x2846 = _match_3332.snd;
    kk_std_core__list xs = kk_std_core__list_unbox(_box_x2845, NULL);
    kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2846, NULL);
    kk_std_core__sslice_dup(rest0);
    kk_std_core__list_dup(xs);
    kk_std_core_types__tuple2__drop(_match_3332, _ctx);
    kk_box_t _x3564;
    kk_std_core_types__tuple2_ _x3565 = kk_std_core_types__new_dash__lp__comma__rp_(kk_std_core__list_box(xs, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
    _x3564 = kk_std_core_types__tuple2__box(_x3565, _ctx); /*107*/
    return kk_std_core_types__new_Just(_x3564, _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_digits0_fun3568__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_digits0_fun3568(kk_function_t _fself, kk_box_t _b_2858, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_digits0_fun3568(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_digits0_fun3568, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_digits0_fun3568(kk_function_t _fself, kk_box_t _b_2858, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x3569;
  kk_std_core__list _x3570 = kk_std_core__list_unbox(_b_2858, _ctx); /*list<char>*/
  _x3569 = kk_std_core_string_2(_x3570, _ctx); /*string*/
  return kk_string_box(_x3569);
}
static kk_box_t kk_std_text_parse_digits0_fun3553(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core__list x_2471;
  kk_box_t _x3554;
  kk_string_t _x3555;
  kk_define_string_literal(, _s3556, 5, "digit")
  _x3555 = kk_string_dup(_s3556); /*string*/
  _x3554 = kk_std_text_parse_satisfy_fail(_x3555, kk_std_text_parse_new_digits0_fun3557(_ctx), _ctx); /*542*/
  x_2471 = kk_std_core__list_unbox(_x3554, _ctx); /*list<char>*/
  kk_string_t _x3566;
  if (kk_yielding(kk_context())) {
    kk_std_core__list_drop(x_2471, _ctx);
    kk_box_t _x3567 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_digits0_fun3568(_ctx), _ctx); /*3926*/
    _x3566 = kk_string_unbox(_x3567); /*string*/
  }
  else {
    _x3566 = kk_std_core_string_2(x_2471, _ctx); /*string*/
  }
  return kk_string_box(_x3566);
}


// lift anonymous function
struct kk_std_text_parse_digits0_fun3571__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_digits0_fun3571(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_digits0_fun3571(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_digits0_fun3571, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_digits0_fun3571(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x3572;
  kk_define_string_literal(, _s3573, 1, "0")
  _x3572 = kk_string_dup(_s3573); /*string*/
  return kk_string_box(_x3572);
}

kk_string_t kk_std_text_parse_digits0(kk_context_t* _ctx) { /* () -> parse string */ 
  kk_box_t _x3552 = kk_std_text_parse__lp__bar__bar__rp_(kk_std_text_parse_new_digits0_fun3553(_ctx), kk_std_text_parse_new_digits0_fun3571(_ctx), _ctx); /*944*/
  return kk_string_unbox(_x3552);
}
 
// monadic lift

kk_unit_t kk_std_text_parse__mlift2409_eof(kk_std_core_types__maybe _y_2347, kk_context_t* _ctx) { /* (maybe<()>) -> parse () */ 
  if (kk_std_core_types__is_Nothing(_y_2347)) {
    kk_std_core_hnd__ev ev_2473;
    kk_ssize_t _x3574 = (KK_IZ(0)); /*ssize_t*/
    ev_2473 = kk_evv_at(_x3574,kk_context()); /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/
    kk_box_t _x3575;
    {
      struct kk_std_core_hnd_Ev* _con3576 = kk_std_core_hnd__as_Ev(ev_2473);
      kk_std_core_hnd__marker m0 = _con3576->marker;
      kk_box_t _box_x2864 = _con3576->hnd;
      kk_std_text_parse__hnd_parse h = kk_std_text_parse__hnd_parse_unbox(_box_x2864, NULL);
      kk_std_text_parse__hnd_parse_dup(h);
      kk_std_core_hnd__clause1 _match_3329;
      kk_std_core_hnd__clause1 _brw_3330 = kk_std_text_parse__select_fail(h, _ctx); /*std/core/hnd/clause1<string,394,std/text/parse/.hnd-parse,395,396>*/;
      kk_std_text_parse__hnd_parse_drop(h, _ctx);
      _match_3329 = _brw_3330; /*std/core/hnd/clause1<string,394,std/text/parse/.hnd-parse,395,396>*/
      {
        kk_function_t _fun_unbox_x2868 = _match_3329.clause;
        kk_box_t _x3578;
        kk_string_t _x3579;
        kk_define_string_literal(, _s3580, 22, "expecting end-of-input")
        _x3579 = kk_string_dup(_s3580); /*string*/
        _x3578 = kk_string_box(_x3579); /*51*/
        _x3575 = kk_function_call(kk_box_t, (kk_function_t, kk_std_core_hnd__marker, kk_std_core_hnd__ev, kk_box_t, kk_context_t*), _fun_unbox_x2868, (_fun_unbox_x2868, m0, ev_2473, _x3578, _ctx)); /*52*/
      }
    }
    kk_unit_unbox(_x3575); return kk_Unit;
  }
  {
    kk_box_t _box_x2872 = _y_2347._cons.Just.value;
    kk_unit_t _pat30 = kk_unit_unbox(_box_x2872);
    kk_std_core_types__maybe_drop(_y_2347, _ctx);
    kk_Unit; return kk_Unit;
  }
}


// lift anonymous function
struct kk_std_text_parse_eof_fun3586__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_eof_fun3586(kk_function_t _fself, kk_box_t _b_2886, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_eof_fun3586(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_eof_fun3586, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_eof_fun3586(kk_function_t _fself, kk_box_t _b_2886, kk_context_t* _ctx) {
  kk_unused(_fself);
  bool b_17019;
  kk_ssize_t _x3587;
  kk_std_core__sslice _match_3327;
  kk_box_t _x3588 = kk_box_dup(_b_2886); /*2884*/
  _match_3327 = kk_std_core__sslice_unbox(_x3588, _ctx); /*sslice*/
  {
    kk_ssize_t _x = _match_3327.len;
    kk_std_core__sslice_drop(_match_3327, _ctx);
    _x3587 = _x; /*ssize_t*/
  }
  b_17019 = (_x3587 > 0); /*bool*/
  kk_std_core_types__maybe _x3589;
  if (b_17019) {
    kk_box_drop(_b_2886, _ctx);
    _x3589 = kk_std_core_types__new_Nothing(_ctx); /*forall<a> maybe<a>*/
  }
  else {
    kk_box_t _x3590;
    kk_std_core_types__tuple2_ _x3591 = kk_std_core_types__new_dash__lp__comma__rp_(kk_unit_box(kk_Unit), _b_2886, _ctx); /*(6, 7)*/
    _x3590 = kk_std_core_types__tuple2__box(_x3591, _ctx); /*107*/
    _x3589 = kk_std_core_types__new_Just(_x3590, _ctx); /*forall<a> maybe<a>*/
  }
  return kk_std_core_types__maybe_box(_x3589, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_eof_fun3593__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_eof_fun3593(kk_function_t _fself, kk_box_t _b_2895, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_eof_fun3593(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_eof_fun3593, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_eof_fun3593(kk_function_t _fself, kk_box_t _b_2895, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_unit_t _x3594 = kk_Unit;
  kk_std_core_types__maybe _x3595 = kk_std_core_types__maybe_unbox(_b_2895, _ctx); /*maybe<()>*/
  kk_std_text_parse__mlift2409_eof(_x3595, _ctx);
  return kk_unit_box(_x3594);
}

kk_unit_t kk_std_text_parse_eof(kk_context_t* _ctx) { /* () -> parse () */ 
  kk_std_core_hnd__ev ev_2479;
  kk_ssize_t _x3582 = (KK_IZ(0)); /*ssize_t*/
  ev_2479 = kk_evv_at(_x3582,kk_context()); /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/
  kk_std_core_types__maybe x_2476;
  kk_box_t _x3583;
  {
    struct kk_std_core_hnd_Ev* _con3584 = kk_std_core_hnd__as_Ev(ev_2479);
    kk_std_core_hnd__marker m0 = _con3584->marker;
    kk_box_t _box_x2873 = _con3584->hnd;
    kk_std_text_parse__hnd_parse h = kk_std_text_parse__hnd_parse_unbox(_box_x2873, NULL);
    kk_std_text_parse__hnd_parse_dup(h);
    kk_std_core_hnd__clause1 _match_3326;
    kk_std_core_hnd__clause1 _brw_3328 = kk_std_text_parse__select_satisfy(h, _ctx); /*std/core/hnd/clause1<(sslice) -> total maybe<(433, sslice)>,maybe<433>,std/text/parse/.hnd-parse,434,435>*/;
    kk_std_text_parse__hnd_parse_drop(h, _ctx);
    _match_3326 = _brw_3328; /*std/core/hnd/clause1<(sslice) -> total maybe<(433, sslice)>,maybe<433>,std/text/parse/.hnd-parse,434,435>*/
    {
      kk_function_t _fun_unbox_x2880 = _match_3326.clause;
      _x3583 = kk_function_call(kk_box_t, (kk_function_t, kk_std_core_hnd__marker, kk_std_core_hnd__ev, kk_box_t, kk_context_t*), _fun_unbox_x2880, (_fun_unbox_x2880, m0, ev_2479, kk_function_box(kk_std_text_parse_new_eof_fun3586(_ctx)), _ctx)); /*52*/
    }
  }
  x_2476 = kk_std_core_types__maybe_unbox(_x3583, _ctx); /*maybe<()>*/
  if (kk_yielding(kk_context())) {
    kk_std_core_types__maybe_drop(x_2476, _ctx);
    kk_box_t _x3592 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_eof_fun3593(_ctx), _ctx); /*3926*/
    kk_unit_unbox(_x3592); return kk_Unit;
  }
  if (kk_std_core_types__is_Nothing(x_2476)) {
    kk_std_core_hnd__ev ev0_2482;
    kk_ssize_t _x3596 = (KK_IZ(0)); /*ssize_t*/
    ev0_2482 = kk_evv_at(_x3596,kk_context()); /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/
    kk_box_t _x3597;
    {
      struct kk_std_core_hnd_Ev* _con3598 = kk_std_core_hnd__as_Ev(ev0_2482);
      kk_std_core_hnd__marker m00 = _con3598->marker;
      kk_box_t _box_x2896 = _con3598->hnd;
      kk_std_text_parse__hnd_parse h0 = kk_std_text_parse__hnd_parse_unbox(_box_x2896, NULL);
      kk_std_text_parse__hnd_parse_dup(h0);
      kk_std_core_hnd__clause1 _match_3324;
      kk_std_core_hnd__clause1 _brw_3325 = kk_std_text_parse__select_fail(h0, _ctx); /*std/core/hnd/clause1<string,394,std/text/parse/.hnd-parse,395,396>*/;
      kk_std_text_parse__hnd_parse_drop(h0, _ctx);
      _match_3324 = _brw_3325; /*std/core/hnd/clause1<string,394,std/text/parse/.hnd-parse,395,396>*/
      {
        kk_function_t _fun_unbox_x2900 = _match_3324.clause;
        kk_box_t _x3600;
        kk_string_t _x3601;
        kk_define_string_literal(, _s3602, 22, "expecting end-of-input")
        _x3601 = kk_string_dup(_s3602); /*string*/
        _x3600 = kk_string_box(_x3601); /*51*/
        _x3597 = kk_function_call(kk_box_t, (kk_function_t, kk_std_core_hnd__marker, kk_std_core_hnd__ev, kk_box_t, kk_context_t*), _fun_unbox_x2900, (_fun_unbox_x2900, m00, ev0_2482, _x3600, _ctx)); /*52*/
      }
    }
    kk_unit_unbox(_x3597); return kk_Unit;
  }
  {
    kk_box_t _box_x2904 = x_2476._cons.Just.value;
    kk_unit_t _pat31 = kk_unit_unbox(_box_x2904);
    kk_std_core_types__maybe_drop(x_2476, _ctx);
    kk_Unit; return kk_Unit;
  }
}


// lift anonymous function
struct kk_std_text_parse_hex_digits_fun3607__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_hex_digits_fun3607(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_hex_digits_fun3607(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_hex_digits_fun3607, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_text_parse_hex_digits_fun3609__t {
  struct kk_function_s _base;
};
static bool kk_std_text_parse_hex_digits_fun3609(kk_function_t _fself, kk_char_t _x13608, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_hex_digits_fun3609(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_hex_digits_fun3609, _ctx)
  return kk_function_dup(_fself);
}

static bool kk_std_text_parse_hex_digits_fun3609(kk_function_t _fself, kk_char_t _x13608, kk_context_t* _ctx) {
  kk_unused(_fself);
  return kk_std_core_is_hex_digit(_x13608, _ctx);
}
static kk_std_core_types__maybe kk_std_text_parse_hex_digits_fun3607(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__tuple2_ _match_3322 = kk_std_text_parse_next_while0(slice, kk_std_text_parse_new_hex_digits_fun3609(_ctx), kk_std_core__new_Nil(_ctx), _ctx); /*(list<char>, sslice)*/;
  {
    kk_box_t _box_x2906 = _match_3322.fst;
    kk_box_t _box_x2907 = _match_3322.snd;
    kk_std_core__list _pat00 = kk_std_core__list_unbox(_box_x2906, NULL);
    kk_std_core__sslice _pat10 = kk_std_core__sslice_unbox(_box_x2907, NULL);
    if (kk_std_core__is_Nil(_pat00)) {
      kk_std_core_types__tuple2__drop(_match_3322, _ctx);
      return kk_std_core_types__new_Nothing(_ctx);
    }
  }
  {
    kk_box_t _box_x2908 = _match_3322.fst;
    kk_box_t _box_x2909 = _match_3322.snd;
    kk_std_core__list xs = kk_std_core__list_unbox(_box_x2908, NULL);
    kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2909, NULL);
    kk_std_core__sslice_dup(rest0);
    kk_std_core__list_dup(xs);
    kk_std_core_types__tuple2__drop(_match_3322, _ctx);
    kk_box_t _x3614;
    kk_std_core_types__tuple2_ _x3615 = kk_std_core_types__new_dash__lp__comma__rp_(kk_std_core__list_box(xs, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
    _x3614 = kk_std_core_types__tuple2__box(_x3615, _ctx); /*107*/
    return kk_std_core_types__new_Just(_x3614, _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_hex_digits_fun3617__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_hex_digits_fun3617(kk_function_t _fself, kk_box_t _b_2921, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_hex_digits_fun3617(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_hex_digits_fun3617, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_hex_digits_fun3617(kk_function_t _fself, kk_box_t _b_2921, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x3618;
  kk_std_core__list _x3619 = kk_std_core__list_unbox(_b_2921, _ctx); /*list<char>*/
  _x3618 = kk_std_core_string_2(_x3619, _ctx); /*string*/
  return kk_string_box(_x3618);
}

kk_string_t kk_std_text_parse_hex_digits(kk_context_t* _ctx) { /* () -> parse string */ 
  kk_std_core__list x_2485;
  kk_box_t _x3604;
  kk_string_t _x3605;
  kk_define_string_literal(, _s3606, 5, "digit")
  _x3605 = kk_string_dup(_s3606); /*string*/
  _x3604 = kk_std_text_parse_satisfy_fail(_x3605, kk_std_text_parse_new_hex_digits_fun3607(_ctx), _ctx); /*542*/
  x_2485 = kk_std_core__list_unbox(_x3604, _ctx); /*list<char>*/
  if (kk_yielding(kk_context())) {
    kk_std_core__list_drop(x_2485, _ctx);
    kk_box_t _x3616 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_hex_digits_fun3617(_ctx), _ctx); /*3926*/
    return kk_string_unbox(_x3616);
  }
  {
    return kk_std_core_string_2(x_2485, _ctx);
  }
}
 
// monadic lift

kk_std_core__list kk_std_text_parse__mlift2410_many_acc(kk_std_core__list acc, kk_function_t p, kk_box_t x, kk_context_t* _ctx) { /* forall<a,e> (acc : list<a>, p : parser<e,a>, x : a) -> <parse|e> list<a> */ 
  kk_std_core__list _x3620 = kk_std_core__new_Cons(kk_reuse_null, x, acc, _ctx); /*list<61>*/
  return kk_std_text_parse_many_acc(p, _x3620, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_many_acc_fun3623__t {
  struct kk_function_s _base;
  kk_std_core__list acc0;
  kk_function_t p0;
};
static kk_box_t kk_std_text_parse_many_acc_fun3623(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_many_acc_fun3623(kk_std_core__list acc0, kk_function_t p0, kk_context_t* _ctx) {
  struct kk_std_text_parse_many_acc_fun3623__t* _self = kk_function_alloc_as(struct kk_std_text_parse_many_acc_fun3623__t, 3, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_many_acc_fun3623, kk_context());
  _self->acc0 = acc0;
  _self->p0 = p0;
  return &_self->_base;
}



// lift anonymous function
struct kk_std_text_parse_many_acc_fun3627__t {
  struct kk_function_s _base;
  kk_std_core__list acc0;
  kk_function_t p0;
};
static kk_box_t kk_std_text_parse_many_acc_fun3627(kk_function_t _fself, kk_box_t _b_2924, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_many_acc_fun3627(kk_std_core__list acc0, kk_function_t p0, kk_context_t* _ctx) {
  struct kk_std_text_parse_many_acc_fun3627__t* _self = kk_function_alloc_as(struct kk_std_text_parse_many_acc_fun3627__t, 3, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_many_acc_fun3627, kk_context());
  _self->acc0 = acc0;
  _self->p0 = p0;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_many_acc_fun3627(kk_function_t _fself, kk_box_t _b_2924, kk_context_t* _ctx) {
  struct kk_std_text_parse_many_acc_fun3627__t* _self = kk_function_as(struct kk_std_text_parse_many_acc_fun3627__t*, _fself);
  kk_std_core__list acc0 = _self->acc0; /* list<1147> */
  kk_function_t p0 = _self->p0; /* std/text/parse/parser<1148,1147> */
  kk_drop_match(_self, {kk_std_core__list_dup(acc0);kk_function_dup(p0);}, {}, _ctx)
  kk_box_t x1_2930 = _b_2924; /*1147*/;
  kk_std_core__list _x3628 = kk_std_text_parse__mlift2410_many_acc(acc0, p0, x1_2930, _ctx); /*list<1147>*/
  return kk_std_core__list_box(_x3628, _ctx);
}
static kk_box_t kk_std_text_parse_many_acc_fun3623(kk_function_t _fself, kk_context_t* _ctx) {
  struct kk_std_text_parse_many_acc_fun3623__t* _self = kk_function_as(struct kk_std_text_parse_many_acc_fun3623__t*, _fself);
  kk_std_core__list acc0 = _self->acc0; /* list<1147> */
  kk_function_t p0 = _self->p0; /* std/text/parse/parser<1148,1147> */
  kk_drop_match(_self, {kk_std_core__list_dup(acc0);kk_function_dup(p0);}, {}, _ctx)
  kk_box_t x0_2487;
  kk_function_t _x3624 = kk_function_dup(p0); /*std/text/parse/parser<1148,1147>*/
  x0_2487 = kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), _x3624, (_x3624, _ctx)); /*1147*/
  kk_std_core__list _x3625;
  if (kk_yielding(kk_context())) {
    kk_box_drop(x0_2487, _ctx);
    kk_box_t _x3626 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_many_acc_fun3627(acc0, p0, _ctx), _ctx); /*3926*/
    _x3625 = kk_std_core__list_unbox(_x3626, _ctx); /*list<1147>*/
  }
  else {
    _x3625 = kk_std_text_parse__mlift2410_many_acc(acc0, p0, x0_2487, _ctx); /*list<1147>*/
  }
  return kk_std_core__list_box(_x3625, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_many_acc_fun3629__t {
  struct kk_function_s _base;
  kk_std_core__list acc0;
};
static kk_box_t kk_std_text_parse_many_acc_fun3629(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_many_acc_fun3629(kk_std_core__list acc0, kk_context_t* _ctx) {
  struct kk_std_text_parse_many_acc_fun3629__t* _self = kk_function_alloc_as(struct kk_std_text_parse_many_acc_fun3629__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_many_acc_fun3629, kk_context());
  _self->acc0 = acc0;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_many_acc_fun3629(kk_function_t _fself, kk_context_t* _ctx) {
  struct kk_std_text_parse_many_acc_fun3629__t* _self = kk_function_as(struct kk_std_text_parse_many_acc_fun3629__t*, _fself);
  kk_std_core__list acc0 = _self->acc0; /* list<1147> */
  kk_drop_match(_self, {kk_std_core__list_dup(acc0);}, {}, _ctx)
  kk_std_core__list _x3630 = kk_std_core_reverse(acc0, _ctx); /*list<12437>*/
  return kk_std_core__list_box(_x3630, _ctx);
}

kk_std_core__list kk_std_text_parse_many_acc(kk_function_t p0, kk_std_core__list acc0, kk_context_t* _ctx) { /* forall<a,e> (p : parser<e,a>, acc : list<a>) -> <parse|e> list<a> */ 
  kk_box_t _x3621;
  kk_function_t _x3622;
  kk_std_core__list_dup(acc0);
  _x3622 = kk_std_text_parse_new_many_acc_fun3623(acc0, p0, _ctx); /*() -> <std/text/parse/parse|945> 944*/
  _x3621 = kk_std_text_parse__lp__bar__bar__rp_(_x3622, kk_std_text_parse_new_many_acc_fun3629(acc0, _ctx), _ctx); /*944*/
  return kk_std_core__list_unbox(_x3621, _ctx);
}
 
// monadic lift


// lift anonymous function
struct kk_std_text_parse__mlift2412_many1_fun3632__t {
  struct kk_function_s _base;
  kk_box_t _y_2355;
};
static kk_box_t kk_std_text_parse__mlift2412_many1_fun3632(kk_function_t _fself, kk_box_t _b_2932, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse__new_mlift2412_many1_fun3632(kk_box_t _y_2355, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2412_many1_fun3632__t* _self = kk_function_alloc_as(struct kk_std_text_parse__mlift2412_many1_fun3632__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse__mlift2412_many1_fun3632, kk_context());
  _self->_y_2355 = _y_2355;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse__mlift2412_many1_fun3632(kk_function_t _fself, kk_box_t _b_2932, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2412_many1_fun3632__t* _self = kk_function_as(struct kk_std_text_parse__mlift2412_many1_fun3632__t*, _fself);
  kk_box_t _y_2355 = _self->_y_2355; /* 1184 */
  kk_drop_match(_self, {kk_box_dup(_y_2355);}, {}, _ctx)
  kk_std_core__list _y_2934_2356 = kk_std_core__list_unbox(_b_2932, _ctx); /*list<1184>*/;
  kk_std_core__list _x3633 = kk_std_core__new_Cons(kk_reuse_null, _y_2355, _y_2934_2356, _ctx); /*list<61>*/
  return kk_std_core__list_box(_x3633, _ctx);
}

kk_std_core__list kk_std_text_parse__mlift2412_many1(kk_function_t p, kk_box_t _y_2355, kk_context_t* _ctx) { /* forall<a,e> (p : parser<e,a>, a) -> <parse|e> list<a> */ 
  kk_std_core__list x_2489 = kk_std_text_parse_many_acc(p, kk_std_core__new_Nil(_ctx), _ctx); /*list<1184>*/;
  if (kk_yielding(kk_context())) {
    kk_std_core__list_drop(x_2489, _ctx);
    kk_box_t _x3631 = kk_std_core_hnd_yield_extend(kk_std_text_parse__new_mlift2412_many1_fun3632(_y_2355, _ctx), _ctx); /*3926*/
    return kk_std_core__list_unbox(_x3631, _ctx);
  }
  {
    return kk_std_core__new_Cons(kk_reuse_null, _y_2355, x_2489, _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_many1_fun3636__t {
  struct kk_function_s _base;
  kk_function_t p;
};
static kk_box_t kk_std_text_parse_many1_fun3636(kk_function_t _fself, kk_box_t _b_2936, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_many1_fun3636(kk_function_t p, kk_context_t* _ctx) {
  struct kk_std_text_parse_many1_fun3636__t* _self = kk_function_alloc_as(struct kk_std_text_parse_many1_fun3636__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_many1_fun3636, kk_context());
  _self->p = p;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_many1_fun3636(kk_function_t _fself, kk_box_t _b_2936, kk_context_t* _ctx) {
  struct kk_std_text_parse_many1_fun3636__t* _self = kk_function_as(struct kk_std_text_parse_many1_fun3636__t*, _fself);
  kk_function_t p = _self->p; /* std/text/parse/parser<1185,1184> */
  kk_drop_match(_self, {kk_function_dup(p);}, {}, _ctx)
  kk_box_t _y_2941_2355 = _b_2936; /*1184*/;
  kk_std_core__list _x3637 = kk_std_text_parse__mlift2412_many1(p, _y_2941_2355, _ctx); /*list<1184>*/
  return kk_std_core__list_box(_x3637, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_many1_fun3639__t {
  struct kk_function_s _base;
  kk_box_t x_2493;
};
static kk_box_t kk_std_text_parse_many1_fun3639(kk_function_t _fself, kk_box_t _b_2938, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_many1_fun3639(kk_box_t x_2493, kk_context_t* _ctx) {
  struct kk_std_text_parse_many1_fun3639__t* _self = kk_function_alloc_as(struct kk_std_text_parse_many1_fun3639__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_many1_fun3639, kk_context());
  _self->x_2493 = x_2493;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_many1_fun3639(kk_function_t _fself, kk_box_t _b_2938, kk_context_t* _ctx) {
  struct kk_std_text_parse_many1_fun3639__t* _self = kk_function_as(struct kk_std_text_parse_many1_fun3639__t*, _fself);
  kk_box_t x_2493 = _self->x_2493; /* 1184 */
  kk_drop_match(_self, {kk_box_dup(x_2493);}, {}, _ctx)
  kk_std_core__list _y_2942_2356 = kk_std_core__list_unbox(_b_2938, _ctx); /*list<1184>*/;
  kk_std_core__list _x3640 = kk_std_core__new_Cons(kk_reuse_null, x_2493, _y_2942_2356, _ctx); /*list<61>*/
  return kk_std_core__list_box(_x3640, _ctx);
}

kk_std_core__list kk_std_text_parse_many1(kk_function_t p, kk_context_t* _ctx) { /* forall<a,e> (p : parser<e,a>) -> <parse|e> list<a> */ 
  kk_box_t x_2493;
  kk_function_t _x3634 = kk_function_dup(p); /*std/text/parse/parser<1185,1184>*/
  x_2493 = kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), _x3634, (_x3634, _ctx)); /*1184*/
  if (kk_yielding(kk_context())) {
    kk_box_drop(x_2493, _ctx);
    kk_box_t _x3635 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_many1_fun3636(p, _ctx), _ctx); /*3926*/
    return kk_std_core__list_unbox(_x3635, _ctx);
  }
  {
    kk_std_core__list x0_2496 = kk_std_text_parse_many_acc(p, kk_std_core__new_Nil(_ctx), _ctx); /*list<1184>*/;
    if (kk_yielding(kk_context())) {
      kk_std_core__list_drop(x0_2496, _ctx);
      kk_box_t _x3638 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_many1_fun3639(x_2493, _ctx), _ctx); /*3926*/
      return kk_std_core__list_unbox(_x3638, _ctx);
    }
    {
      return kk_std_core__new_Cons(kk_reuse_null, x_2493, x0_2496, _ctx);
    }
  }
}

kk_std_core_types__maybe kk_std_text_parse_maybe(kk_std_text_parse__parse_error perr, kk_context_t* _ctx) { /* forall<a> (perr : parse-error<a>) -> maybe<a> */ 
  if (kk_std_text_parse__is_ParseOk(perr)) {
    struct kk_std_text_parse_ParseOk* _con3641 = kk_std_text_parse__as_ParseOk(perr);
    kk_box_t x0 = _con3641->result;
    kk_std_core__sslice _pat00 = _con3641->rest;
    if (kk_likely(kk_std_text_parse__parse_error_is_unique(perr))) {
      kk_std_core__sslice_drop(_pat00, _ctx);
      kk_std_text_parse__parse_error_free(perr, _ctx);
    }
    else {
      kk_box_dup(x0);
      kk_std_text_parse__parse_error_decref(perr, _ctx);
    }
    return kk_std_core_types__new_Just(x0, _ctx);
  }
  {
    struct kk_std_text_parse_ParseError* _con3642 = kk_std_text_parse__as_ParseError(perr);
    kk_string_t msg = _con3642->msg;
    kk_std_core__sslice _pat5 = _con3642->rest;
    if (kk_likely(kk_std_text_parse__parse_error_is_unique(perr))) {
      kk_string_drop(msg, _ctx);
      kk_std_core__sslice_drop(_pat5, _ctx);
      kk_std_text_parse__parse_error_free(perr, _ctx);
    }
    else {
      kk_std_text_parse__parse_error_decref(perr, _ctx);
    }
    return kk_std_core_types__new_Nothing(_ctx);
  }
}

kk_std_core_types__maybe kk_std_text_parse_next_match(kk_std_core__sslice slice, kk_std_core__list cs, kk_context_t* _ctx) { /* (slice : sslice, cs : list<char>) -> maybe<sslice> */ 
  kk__tailcall: ;
  if (kk_std_core__is_Nil(cs)) {
    return kk_std_core_types__new_Just(kk_std_core__sslice_box(slice, _ctx), _ctx);
  }
  {
    struct kk_std_core_Cons* _con3643 = kk_std_core__as_Cons(cs);
    kk_box_t _box_x2944 = _con3643->head;
    kk_std_core__list cc = _con3643->tail;
    kk_char_t c = kk_char_unbox(_box_x2944, NULL);
    if (kk_likely(kk_std_core__list_is_unique(cs))) {
      kk_std_core__list_free(cs, _ctx);
    }
    else {
      kk_std_core__list_dup(cc);
      kk_std_core__list_decref(cs, _ctx);
    }
    kk_std_core_types__maybe _match_3316 = kk_std_core_next(slice, _ctx); /*maybe<(char, sslice)>*/;
    if (kk_std_core_types__is_Just(_match_3316)) {
      kk_box_t _box_x2945 = _match_3316._cons.Just.value;
      kk_std_core_types__tuple2_ _pat2 = kk_std_core_types__tuple2__unbox(_box_x2945, NULL);
      if (kk_std_core_types__is_dash__lp__comma__rp_(_pat2)) {
        kk_box_t _box_x2946 = _pat2.fst;
        kk_box_t _box_x2947 = _pat2.snd;
        kk_char_t d = kk_char_unbox(_box_x2946, NULL);
        kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2947, NULL);
        if (c == d) {
          kk_std_core__sslice_dup(rest0);
          kk_std_core_types__maybe_drop(_match_3316, _ctx);
          { // tailcall
            slice = rest0;
            cs = cc;
            goto kk__tailcall;
          }
        }
      }
    }
    {
      kk_std_core__list_drop(cc, _ctx);
      kk_std_core_types__maybe_drop(_match_3316, _ctx);
      return kk_std_core_types__new_Nothing(_ctx);
    }
  }
}


// lift anonymous function
struct kk_std_text_parse_no_digit_fun3651__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_no_digit_fun3651(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_no_digit_fun3651(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_no_digit_fun3651, _ctx)
  return kk_function_dup(_fself);
}

static kk_std_core_types__maybe kk_std_text_parse_no_digit_fun3651(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__maybe _match_3314 = kk_std_core_next(slice, _ctx); /*maybe<(char, sslice)>*/;
  if (kk_std_core_types__is_Just(_match_3314)) {
    kk_box_t _box_x2949 = _match_3314._cons.Just.value;
    kk_std_core_types__tuple2_ _pat0 = kk_std_core_types__tuple2__unbox(_box_x2949, NULL);
    if (kk_std_core_types__is_dash__lp__comma__rp_(_pat0)) {
      kk_box_t _box_x2950 = _pat0.fst;
      kk_box_t _box_x2951 = _pat0.snd;
      kk_char_t c = kk_char_unbox(_box_x2950, NULL);
      kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2951, NULL);
      bool b_2273;
      bool _match_3315 = (c >= ('0')); /*bool*/;
      if (_match_3315) {
        b_2273 = (c <= ('9')); /*bool*/
      }
      else {
        b_2273 = false; /*bool*/
      }
      bool _x3655;
      if (b_2273) {
        _x3655 = false; /*bool*/
      }
      else {
        _x3655 = true; /*bool*/
      }
      if (_x3655) {
        kk_std_core__sslice_dup(rest0);
        kk_std_core_types__maybe_drop(_match_3314, _ctx);
        kk_box_t _x3656;
        kk_std_core_types__tuple2_ _x3657 = kk_std_core_types__new_dash__lp__comma__rp_(kk_char_box(c, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
        _x3656 = kk_std_core_types__tuple2__box(_x3657, _ctx); /*107*/
        return kk_std_core_types__new_Just(_x3656, _ctx);
      }
    }
  }
  {
    kk_std_core_types__maybe_drop(_match_3314, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}

kk_char_t kk_std_text_parse_no_digit(kk_context_t* _ctx) { /* () -> parse char */ 
  kk_box_t _x3648;
  kk_string_t _x3649;
  kk_define_string_literal(, _s3650, 11, "not a digit")
  _x3649 = kk_string_dup(_s3650); /*string*/
  _x3648 = kk_std_text_parse_satisfy_fail(_x3649, kk_std_text_parse_new_no_digit_fun3651(_ctx), _ctx); /*542*/
  return kk_char_unbox(_x3648, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_none_of_fun3661__t {
  struct kk_function_s _base;
  kk_string_t chars;
};
static kk_std_core_types__maybe kk_std_text_parse_none_of_fun3661(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_none_of_fun3661(kk_string_t chars, kk_context_t* _ctx) {
  struct kk_std_text_parse_none_of_fun3661__t* _self = kk_function_alloc_as(struct kk_std_text_parse_none_of_fun3661__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_none_of_fun3661, kk_context());
  _self->chars = chars;
  return &_self->_base;
}

static kk_std_core_types__maybe kk_std_text_parse_none_of_fun3661(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  struct kk_std_text_parse_none_of_fun3661__t* _self = kk_function_as(struct kk_std_text_parse_none_of_fun3661__t*, _fself);
  kk_string_t chars = _self->chars; /* string */
  kk_drop_match(_self, {kk_string_dup(chars);}, {}, _ctx)
  kk_std_core_types__maybe _match_3313 = kk_std_core_next(slice, _ctx); /*maybe<(char, sslice)>*/;
  if (kk_std_core_types__is_Just(_match_3313)) {
    kk_box_t _box_x2962 = _match_3313._cons.Just.value;
    kk_std_core_types__tuple2_ _pat0 = kk_std_core_types__tuple2__unbox(_box_x2962, NULL);
    if (kk_std_core_types__is_dash__lp__comma__rp_(_pat0)) {
      kk_box_t _box_x2963 = _pat0.fst;
      kk_box_t _box_x2964 = _pat0.snd;
      kk_char_t c = kk_char_unbox(_box_x2963, NULL);
      kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2964, NULL);
      bool b_2277;
      kk_string_t _x3665 = kk_string_dup(chars); /*string*/
      kk_string_t _x3666 = kk_std_core_string(c, _ctx); /*string*/
      b_2277 = kk_string_contains(_x3665,_x3666,kk_context()); /*bool*/
      bool _x3667;
      if (b_2277) {
        _x3667 = false; /*bool*/
      }
      else {
        _x3667 = true; /*bool*/
      }
      if (_x3667) {
        kk_string_drop(chars, _ctx);
        kk_std_core__sslice_dup(rest0);
        kk_std_core_types__maybe_drop(_match_3313, _ctx);
        kk_box_t _x3668;
        kk_std_core_types__tuple2_ _x3669 = kk_std_core_types__new_dash__lp__comma__rp_(kk_char_box(c, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
        _x3668 = kk_std_core_types__tuple2__box(_x3669, _ctx); /*107*/
        return kk_std_core_types__new_Just(_x3668, _ctx);
      }
    }
  }
  {
    kk_string_drop(chars, _ctx);
    kk_std_core_types__maybe_drop(_match_3313, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}

kk_char_t kk_std_text_parse_none_of(kk_string_t chars, kk_context_t* _ctx) { /* (chars : string) -> parse char */ 
  kk_box_t _x3658;
  kk_string_t _x3659 = kk_string_empty(); /*string*/
  _x3658 = kk_std_text_parse_satisfy_fail(_x3659, kk_std_text_parse_new_none_of_fun3661(chars, _ctx), _ctx); /*542*/
  return kk_char_unbox(_x3658, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_none_of_many1_fun3673__t {
  struct kk_function_s _base;
  kk_string_t chars;
};
static kk_std_core_types__maybe kk_std_text_parse_none_of_many1_fun3673(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_none_of_many1_fun3673(kk_string_t chars, kk_context_t* _ctx) {
  struct kk_std_text_parse_none_of_many1_fun3673__t* _self = kk_function_alloc_as(struct kk_std_text_parse_none_of_many1_fun3673__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_none_of_many1_fun3673, kk_context());
  _self->chars = chars;
  return &_self->_base;
}



// lift anonymous function
struct kk_std_text_parse_none_of_many1_fun3674__t {
  struct kk_function_s _base;
  kk_string_t chars;
};
static bool kk_std_text_parse_none_of_many1_fun3674(kk_function_t _fself, kk_char_t c, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_none_of_many1_fun3674(kk_string_t chars, kk_context_t* _ctx) {
  struct kk_std_text_parse_none_of_many1_fun3674__t* _self = kk_function_alloc_as(struct kk_std_text_parse_none_of_many1_fun3674__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_none_of_many1_fun3674, kk_context());
  _self->chars = chars;
  return &_self->_base;
}

static bool kk_std_text_parse_none_of_many1_fun3674(kk_function_t _fself, kk_char_t c, kk_context_t* _ctx) {
  struct kk_std_text_parse_none_of_many1_fun3674__t* _self = kk_function_as(struct kk_std_text_parse_none_of_many1_fun3674__t*, _fself);
  kk_string_t chars = _self->chars; /* string */
  kk_drop_match(_self, {kk_string_dup(chars);}, {}, _ctx)
  bool b_2280;
  kk_string_t _x3675 = kk_std_core_string(c, _ctx); /*string*/
  b_2280 = kk_string_contains(chars,_x3675,kk_context()); /*bool*/
  if (b_2280) {
    return false;
  }
  {
    return true;
  }
}
static kk_std_core_types__maybe kk_std_text_parse_none_of_many1_fun3673(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  struct kk_std_text_parse_none_of_many1_fun3673__t* _self = kk_function_as(struct kk_std_text_parse_none_of_many1_fun3673__t*, _fself);
  kk_string_t chars = _self->chars; /* string */
  kk_drop_match(_self, {kk_string_dup(chars);}, {}, _ctx)
  kk_std_core_types__tuple2_ _match_3312 = kk_std_text_parse_next_while0(slice, kk_std_text_parse_new_none_of_many1_fun3674(chars, _ctx), kk_std_core__new_Nil(_ctx), _ctx); /*(list<char>, sslice)*/;
  {
    kk_box_t _box_x2975 = _match_3312.fst;
    kk_box_t _box_x2976 = _match_3312.snd;
    kk_std_core__list _pat01 = kk_std_core__list_unbox(_box_x2975, NULL);
    kk_std_core__sslice _pat10 = kk_std_core__sslice_unbox(_box_x2976, NULL);
    if (kk_std_core__is_Nil(_pat01)) {
      kk_std_core_types__tuple2__drop(_match_3312, _ctx);
      return kk_std_core_types__new_Nothing(_ctx);
    }
  }
  {
    kk_box_t _box_x2977 = _match_3312.fst;
    kk_box_t _box_x2978 = _match_3312.snd;
    kk_std_core__list xs = kk_std_core__list_unbox(_box_x2977, NULL);
    kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2978, NULL);
    kk_std_core__sslice_dup(rest0);
    kk_std_core__list_dup(xs);
    kk_std_core_types__tuple2__drop(_match_3312, _ctx);
    kk_box_t _x3680;
    kk_std_core_types__tuple2_ _x3681 = kk_std_core_types__new_dash__lp__comma__rp_(kk_std_core__list_box(xs, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
    _x3680 = kk_std_core_types__tuple2__box(_x3681, _ctx); /*107*/
    return kk_std_core_types__new_Just(_x3680, _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_none_of_many1_fun3683__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_none_of_many1_fun3683(kk_function_t _fself, kk_box_t _b_2990, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_none_of_many1_fun3683(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_none_of_many1_fun3683, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_none_of_many1_fun3683(kk_function_t _fself, kk_box_t _b_2990, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x3684;
  kk_std_core__list _x3685 = kk_std_core__list_unbox(_b_2990, _ctx); /*list<char>*/
  _x3684 = kk_std_core_string_2(_x3685, _ctx); /*string*/
  return kk_string_box(_x3684);
}

kk_string_t kk_std_text_parse_none_of_many1(kk_string_t chars, kk_context_t* _ctx) { /* (chars : string) -> parse string */ 
  kk_std_core__list x_2501;
  kk_box_t _x3670;
  kk_string_t _x3671 = kk_string_empty(); /*string*/
  _x3670 = kk_std_text_parse_satisfy_fail(_x3671, kk_std_text_parse_new_none_of_many1_fun3673(chars, _ctx), _ctx); /*542*/
  x_2501 = kk_std_core__list_unbox(_x3670, _ctx); /*list<char>*/
  if (kk_yielding(kk_context())) {
    kk_std_core__list_drop(x_2501, _ctx);
    kk_box_t _x3682 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_none_of_many1_fun3683(_ctx), _ctx); /*3926*/
    return kk_string_unbox(_x3682);
  }
  {
    return kk_std_core_string_2(x_2501, _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_one_of_fun3688__t {
  struct kk_function_s _base;
  kk_string_t chars;
};
static kk_std_core_types__maybe kk_std_text_parse_one_of_fun3688(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_one_of_fun3688(kk_string_t chars, kk_context_t* _ctx) {
  struct kk_std_text_parse_one_of_fun3688__t* _self = kk_function_alloc_as(struct kk_std_text_parse_one_of_fun3688__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_one_of_fun3688, kk_context());
  _self->chars = chars;
  return &_self->_base;
}

static kk_std_core_types__maybe kk_std_text_parse_one_of_fun3688(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  struct kk_std_text_parse_one_of_fun3688__t* _self = kk_function_as(struct kk_std_text_parse_one_of_fun3688__t*, _fself);
  kk_string_t chars = _self->chars; /* string */
  kk_drop_match(_self, {kk_string_dup(chars);}, {}, _ctx)
  kk_std_core_types__maybe _match_3310 = kk_std_core_next(slice, _ctx); /*maybe<(char, sslice)>*/;
  if (kk_std_core_types__is_Just(_match_3310)) {
    kk_box_t _box_x2992 = _match_3310._cons.Just.value;
    kk_std_core_types__tuple2_ _pat0 = kk_std_core_types__tuple2__unbox(_box_x2992, NULL);
    if (kk_std_core_types__is_dash__lp__comma__rp_(_pat0)) {
      kk_box_t _box_x2993 = _pat0.fst;
      kk_box_t _box_x2994 = _pat0.snd;
      kk_char_t c = kk_char_unbox(_box_x2993, NULL);
      kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x2994, NULL);
      kk_string_t _x3692 = kk_string_dup(chars); /*string*/
      kk_string_t _x3693 = kk_std_core_string(c, _ctx); /*string*/
      if (kk_string_contains(_x3692,_x3693,kk_context())) {
        kk_string_drop(chars, _ctx);
        kk_std_core__sslice_dup(rest0);
        kk_std_core_types__maybe_drop(_match_3310, _ctx);
        kk_box_t _x3694;
        kk_std_core_types__tuple2_ _x3695 = kk_std_core_types__new_dash__lp__comma__rp_(kk_char_box(c, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
        _x3694 = kk_std_core_types__tuple2__box(_x3695, _ctx); /*107*/
        return kk_std_core_types__new_Just(_x3694, _ctx);
      }
    }
  }
  {
    kk_string_drop(chars, _ctx);
    kk_std_core_types__maybe_drop(_match_3310, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}

kk_char_t kk_std_text_parse_one_of(kk_string_t chars, kk_context_t* _ctx) { /* (chars : string) -> parse char */ 
  kk_box_t _x3686;
  kk_string_t _x3687 = kk_string_dup(chars); /*string*/
  _x3686 = kk_std_text_parse_satisfy_fail(_x3687, kk_std_text_parse_new_one_of_fun3688(chars, _ctx), _ctx); /*542*/
  return kk_char_unbox(_x3686, _ctx);
}
extern kk_box_t kk_std_text_parse_one_of_or_fun3697(kk_function_t _fself, kk_context_t* _ctx) {
  struct kk_std_text_parse_one_of_or_fun3697__t* _self = kk_function_as(struct kk_std_text_parse_one_of_or_fun3697__t*, _fself);
  kk_string_t chars = _self->chars; /* string */
  kk_drop_match(_self, {kk_string_dup(chars);}, {}, _ctx)
  kk_char_t _x3698 = kk_std_text_parse_one_of(chars, _ctx); /*char*/
  return kk_char_box(_x3698, _ctx);
}
extern kk_box_t kk_std_text_parse_one_of_or_fun3699(kk_function_t _fself, kk_context_t* _ctx) {
  struct kk_std_text_parse_one_of_or_fun3699__t* _self = kk_function_as(struct kk_std_text_parse_one_of_or_fun3699__t*, _fself);
  kk_char_t kkloc_default = _self->kkloc_default; /* char */
  kk_drop_match(_self, {;}, {}, _ctx)
  return kk_char_box(kkloc_default, _ctx);
}
 
// monadic lift

kk_std_text_parse__parse_error kk_std_text_parse__mlift2414_parse(kk_std_text_parse__parse_error err1, kk_std_text_parse__parse_error _y_2368, kk_context_t* _ctx) { /* forall<h,a,e> (err1 : parse-error<a>, parse-error<a>) -> <local<h>|e> parse-error<a> */ 
  if (kk_std_text_parse__is_ParseOk(_y_2368)) {
    struct kk_std_text_parse_ParseOk* _con3700 = kk_std_text_parse__as_ParseOk(_y_2368);
    kk_box_t x2 = _con3700->result;
    kk_std_core__sslice rest2 = _con3700->rest;
    kk_std_text_parse__parse_error_drop(err1, _ctx);
    kk_reuse_t _ru_3375 = kk_reuse_null; /*reuse*/;
    if (kk_likely(kk_std_text_parse__parse_error_is_unique(_y_2368))) {
      _ru_3375 = (kk_std_text_parse__parse_error_reuse(_y_2368));
    }
    else {
      kk_std_core__sslice_dup(rest2);
      kk_box_dup(x2);
      kk_std_text_parse__parse_error_decref(_y_2368, _ctx);
    }
    return kk_std_text_parse__new_ParseOk(_ru_3375, x2, rest2, _ctx);
  }
  {
    kk_std_text_parse__parse_error_drop(_y_2368, _ctx);
    return err1;
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_text_parse__mlift2415_parse_fun3702__t {
  struct kk_function_s _base;
  kk_std_text_parse__parse_error err1;
};
static kk_box_t kk_std_text_parse__mlift2415_parse_fun3702(kk_function_t _fself, kk_box_t _b_3010, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse__new_mlift2415_parse_fun3702(kk_std_text_parse__parse_error err1, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2415_parse_fun3702__t* _self = kk_function_alloc_as(struct kk_std_text_parse__mlift2415_parse_fun3702__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse__mlift2415_parse_fun3702, kk_context());
  _self->err1 = err1;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse__mlift2415_parse_fun3702(kk_function_t _fself, kk_box_t _b_3010, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2415_parse_fun3702__t* _self = kk_function_as(struct kk_std_text_parse__mlift2415_parse_fun3702__t*, _fself);
  kk_std_text_parse__parse_error err1 = _self->err1; /* std/text/parse/parse-error<2020> */
  kk_drop_match(_self, {kk_std_text_parse__parse_error_dup(err1);}, {}, _ctx)
  kk_std_text_parse__parse_error _x3703;
  kk_std_text_parse__parse_error _y_3012_2368 = kk_std_text_parse__parse_error_unbox(_b_3010, _ctx); /*std/text/parse/parse-error<2020>*/;
  if (kk_std_text_parse__is_ParseOk(_y_3012_2368)) {
    struct kk_std_text_parse_ParseOk* _con3704 = kk_std_text_parse__as_ParseOk(_y_3012_2368);
    kk_box_t x2 = _con3704->result;
    kk_std_core__sslice rest2 = _con3704->rest;
    kk_std_text_parse__parse_error_drop(err1, _ctx);
    kk_reuse_t _ru_3376 = kk_reuse_null; /*reuse*/;
    if (kk_likely(kk_std_text_parse__parse_error_is_unique(_y_3012_2368))) {
      _ru_3376 = (kk_std_text_parse__parse_error_reuse(_y_3012_2368));
    }
    else {
      kk_std_core__sslice_dup(rest2);
      kk_box_dup(x2);
      kk_std_text_parse__parse_error_decref(_y_3012_2368, _ctx);
    }
    _x3703 = kk_std_text_parse__new_ParseOk(_ru_3376, x2, rest2, _ctx); /*std/text/parse/parse-error<39>*/
  }
  else {
    kk_std_text_parse__parse_error_drop(_y_3012_2368, _ctx);
    _x3703 = err1; /*std/text/parse/parse-error<39>*/
  }
  return kk_std_text_parse__parse_error_box(_x3703, _ctx);
}

kk_std_text_parse__parse_error kk_std_text_parse__mlift2415_parse(kk_std_text_parse__parse_error err1, kk_function_t resume, kk_unit_t wild__, kk_context_t* _ctx) { /* forall<h,a,e> (err1 : parse-error<a>, resume : (bool) -> <local<h>|e> parse-error<a>, wild_ : ()) -> <local<h>|e> parse-error<a> */ 
  kk_std_text_parse__parse_error x_2503 = kk_function_call(kk_std_text_parse__parse_error, (kk_function_t, bool, kk_context_t*), resume, (resume, false, _ctx)); /*std/text/parse/parse-error<2020>*/;
  if (kk_yielding(kk_context())) {
    kk_std_text_parse__parse_error_drop(x_2503, _ctx);
    kk_box_t _x3701 = kk_std_core_hnd_yield_extend(kk_std_text_parse__new_mlift2415_parse_fun3702(err1, _ctx), _ctx); /*3926*/
    return kk_std_text_parse__parse_error_unbox(_x3701, _ctx);
  }
  {
    kk_std_text_parse__parse_error _y_3013_2368 = x_2503; /*std/text/parse/parse-error<2020>*/;
    if (kk_std_text_parse__is_ParseOk(_y_3013_2368)) {
      struct kk_std_text_parse_ParseOk* _con3705 = kk_std_text_parse__as_ParseOk(_y_3013_2368);
      kk_box_t x2 = _con3705->result;
      kk_std_core__sslice rest2 = _con3705->rest;
      kk_std_text_parse__parse_error_drop(err1, _ctx);
      kk_reuse_t _ru_3377 = kk_reuse_null; /*reuse*/;
      if (kk_likely(kk_std_text_parse__parse_error_is_unique(_y_3013_2368))) {
        _ru_3377 = (kk_std_text_parse__parse_error_reuse(_y_3013_2368));
      }
      else {
        kk_std_core__sslice_dup(rest2);
        kk_box_dup(x2);
        kk_std_text_parse__parse_error_decref(_y_3013_2368, _ctx);
      }
      return kk_std_text_parse__new_ParseOk(_ru_3377, x2, rest2, _ctx);
    }
    {
      kk_std_text_parse__parse_error_drop(_y_3013_2368, _ctx);
      return err1;
    }
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_text_parse__mlift2416_parse_fun3708__t {
  struct kk_function_s _base;
  kk_std_text_parse__parse_error _y_2366;
  kk_function_t resume;
};
static kk_box_t kk_std_text_parse__mlift2416_parse_fun3708(kk_function_t _fself, kk_box_t _b_3019, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse__new_mlift2416_parse_fun3708(kk_std_text_parse__parse_error _y_2366, kk_function_t resume, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2416_parse_fun3708__t* _self = kk_function_alloc_as(struct kk_std_text_parse__mlift2416_parse_fun3708__t, 3, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse__mlift2416_parse_fun3708, kk_context());
  _self->_y_2366 = _y_2366;
  _self->resume = resume;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse__mlift2416_parse_fun3708(kk_function_t _fself, kk_box_t _b_3019, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2416_parse_fun3708__t* _self = kk_function_as(struct kk_std_text_parse__mlift2416_parse_fun3708__t*, _fself);
  kk_std_text_parse__parse_error _y_2366 = _self->_y_2366; /* std/text/parse/parse-error<2020> */
  kk_function_t resume = _self->resume; /* (bool) -> <local<2014>|2021> std/text/parse/parse-error<2020> */
  kk_drop_match(_self, {kk_std_text_parse__parse_error_dup(_y_2366);kk_function_dup(resume);}, {}, _ctx)
  kk_unit_t wild___3021 = kk_Unit;
  kk_unit_unbox(_b_3019);
  kk_std_text_parse__parse_error _x3709 = kk_std_text_parse__mlift2415_parse(_y_2366, resume, wild___3021, _ctx); /*std/text/parse/parse-error<2020>*/
  return kk_std_text_parse__parse_error_box(_x3709, _ctx);
}

kk_std_text_parse__parse_error kk_std_text_parse__mlift2416_parse(kk_ref_t input, kk_function_t resume, kk_std_core__sslice save, kk_std_text_parse__parse_error _y_2366, kk_context_t* _ctx) { /* forall<h,a,e> (input : local-var<h,sslice>, resume : (bool) -> <local<h>|e> parse-error<a>, save : sslice, parse-error<a>) -> <local<h>|e> parse-error<a> */ 
  if (kk_std_text_parse__is_ParseOk(_y_2366)) {
    struct kk_std_text_parse_ParseOk* _con3706 = kk_std_text_parse__as_ParseOk(_y_2366);
    kk_box_t x1 = _con3706->result;
    kk_std_core__sslice rest1 = _con3706->rest;
    kk_std_core__sslice_drop(save, _ctx);
    kk_function_drop(resume, _ctx);
    kk_ref_drop(input, _ctx);
    kk_reuse_t _ru_3378 = kk_reuse_null; /*reuse*/;
    if (kk_likely(kk_std_text_parse__parse_error_is_unique(_y_2366))) {
      _ru_3378 = (kk_std_text_parse__parse_error_reuse(_y_2366));
    }
    else {
      kk_std_core__sslice_dup(rest1);
      kk_box_dup(x1);
      kk_std_text_parse__parse_error_decref(_y_2366, _ctx);
    }
    return kk_std_text_parse__new_ParseOk(_ru_3378, x1, rest1, _ctx);
  }
  {
    kk_unit_t x_2507 = kk_Unit;
    kk_unit_t _brw_3308 = kk_Unit;
    kk_ref_set_borrow(input,(kk_std_core__sslice_box(save, _ctx)),kk_context());
    kk_ref_drop(input, _ctx);
    _brw_3308;
    if (kk_yielding(kk_context())) {
      kk_box_t _x3707 = kk_std_core_hnd_yield_extend(kk_std_text_parse__new_mlift2416_parse_fun3708(_y_2366, resume, _ctx), _ctx); /*3926*/
      return kk_std_text_parse__parse_error_unbox(_x3707, _ctx);
    }
    {
      return kk_std_text_parse__mlift2415_parse(_y_2366, resume, x_2507, _ctx);
    }
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_text_parse__mlift2417_parse_fun3712__t {
  struct kk_function_s _base;
  kk_ref_t input;
  kk_function_t resume;
  kk_std_core__sslice save;
};
static kk_box_t kk_std_text_parse__mlift2417_parse_fun3712(kk_function_t _fself, kk_box_t _b_3023, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse__new_mlift2417_parse_fun3712(kk_ref_t input, kk_function_t resume, kk_std_core__sslice save, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2417_parse_fun3712__t* _self = kk_function_alloc_as(struct kk_std_text_parse__mlift2417_parse_fun3712__t, 4, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse__mlift2417_parse_fun3712, kk_context());
  _self->input = input;
  _self->resume = resume;
  _self->save = save;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse__mlift2417_parse_fun3712(kk_function_t _fself, kk_box_t _b_3023, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2417_parse_fun3712__t* _self = kk_function_as(struct kk_std_text_parse__mlift2417_parse_fun3712__t*, _fself);
  kk_ref_t input = _self->input; /* local-var<2014,sslice> */
  kk_function_t resume = _self->resume; /* (bool) -> <local<2014>|2021> std/text/parse/parse-error<2020> */
  kk_std_core__sslice save = _self->save; /* sslice */
  kk_drop_match(_self, {kk_ref_dup(input);kk_function_dup(resume);kk_std_core__sslice_dup(save);}, {}, _ctx)
  kk_std_text_parse__parse_error _y_3025_2366 = kk_std_text_parse__parse_error_unbox(_b_3023, _ctx); /*std/text/parse/parse-error<2020>*/;
  kk_std_text_parse__parse_error _x3713 = kk_std_text_parse__mlift2416_parse(input, resume, save, _y_3025_2366, _ctx); /*std/text/parse/parse-error<2020>*/
  return kk_std_text_parse__parse_error_box(_x3713, _ctx);
}

kk_std_text_parse__parse_error kk_std_text_parse__mlift2417_parse(kk_ref_t input, kk_function_t resume, kk_std_core__sslice save, kk_context_t* _ctx) { /* forall<h,a,e> (input : local-var<h,sslice>, resume : (bool) -> <local<h>|e> parse-error<a>, save : sslice) -> <local<h>|e> parse-error<a> */ 
  kk_std_text_parse__parse_error x_2509;
  kk_function_t _x3710 = kk_function_dup(resume); /*(bool) -> <local<2014>|2021> std/text/parse/parse-error<2020>*/
  x_2509 = kk_function_call(kk_std_text_parse__parse_error, (kk_function_t, bool, kk_context_t*), _x3710, (_x3710, true, _ctx)); /*std/text/parse/parse-error<2020>*/
  if (kk_yielding(kk_context())) {
    kk_std_text_parse__parse_error_drop(x_2509, _ctx);
    kk_box_t _x3711 = kk_std_core_hnd_yield_extend(kk_std_text_parse__new_mlift2417_parse_fun3712(input, resume, save, _ctx), _ctx); /*3926*/
    return kk_std_text_parse__parse_error_unbox(_x3711, _ctx);
  }
  {
    return kk_std_text_parse__mlift2416_parse(input, resume, save, x_2509, _ctx);
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_text_parse__mlift2419_parse_fun3717__t {
  struct kk_function_s _base;
  kk_box_t x;
};
static kk_box_t kk_std_text_parse__mlift2419_parse_fun3717(kk_function_t _fself, kk_box_t _b_3033, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse__new_mlift2419_parse_fun3717(kk_box_t x, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2419_parse_fun3717__t* _self = kk_function_alloc_as(struct kk_std_text_parse__mlift2419_parse_fun3717__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse__mlift2419_parse_fun3717, kk_context());
  _self->x = x;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse__mlift2419_parse_fun3717(kk_function_t _fself, kk_box_t _b_3033, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2419_parse_fun3717__t* _self = kk_function_as(struct kk_std_text_parse__mlift2419_parse_fun3717__t*, _fself);
  kk_box_t x = _self->x; /* 1983 */
  kk_drop_match(_self, {kk_box_dup(x);}, {}, _ctx)
  kk_unit_t wild__0_3035 = kk_Unit;
  kk_unit_unbox(_b_3033);
  kk_std_core_types__maybe _x3718 = kk_std_core_types__new_Just(x, _ctx); /*maybe<107>*/
  return kk_std_core_types__maybe_box(_x3718, _ctx);
}

kk_std_core_types__maybe kk_std_text_parse__mlift2419_parse(kk_ref_t input, kk_function_t pred, kk_std_core__sslice inp, kk_context_t* _ctx) { /* forall<a,h,e> (input : local-var<h,sslice>, pred : (sslice) -> total maybe<(a, sslice)>, inp : sslice) -> <local<h>|e> maybe<a> */ 
  kk_std_core_types__maybe _match_3303 = kk_function_call(kk_std_core_types__maybe, (kk_function_t, kk_std_core__sslice, kk_context_t*), pred, (pred, inp, _ctx)); /*maybe<(1983, sslice)>*/;
  if (kk_std_core_types__is_Just(_match_3303)) {
    kk_box_t _box_x3026 = _match_3303._cons.Just.value;
    kk_std_core_types__tuple2_ _pat9 = kk_std_core_types__tuple2__unbox(_box_x3026, NULL);
    kk_box_t x = _pat9.fst;
    kk_box_t _box_x3027 = _pat9.snd;
    kk_std_core__sslice cap = kk_std_core__sslice_unbox(_box_x3027, NULL);
    kk_std_core__sslice_dup(cap);
    kk_box_dup(x);
    kk_std_core_types__maybe_drop(_match_3303, _ctx);
    kk_unit_t x0_2511 = kk_Unit;
    kk_unit_t _brw_3305 = kk_Unit;
    kk_ref_set_borrow(input,(kk_std_core__sslice_box(cap, _ctx)),kk_context());
    kk_ref_drop(input, _ctx);
    _brw_3305;
    if (kk_yielding(kk_context())) {
      kk_box_t _x3716 = kk_std_core_hnd_yield_extend(kk_std_text_parse__new_mlift2419_parse_fun3717(x, _ctx), _ctx); /*3926*/
      return kk_std_core_types__maybe_unbox(_x3716, _ctx);
    }
    {
      return kk_std_core_types__new_Just(x, _ctx);
    }
  }
  {
    kk_ref_drop(input, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_parse_fun3723__t {
  struct kk_function_s _base;
  kk_ref_t loc;
};
static kk_box_t kk_std_text_parse_parse_fun3723(kk_function_t _fself, kk_std_core_hnd__marker _b_3040, kk_std_core_hnd__ev _b_3041, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3723(kk_ref_t loc, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3723__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3723__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3723, kk_context());
  _self->loc = loc;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_parse_fun3723(kk_function_t _fself, kk_std_core_hnd__marker _b_3040, kk_std_core_hnd__ev _b_3041, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3723__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3723__t*, _fself);
  kk_ref_t loc = _self->loc; /* local-var<2014,sslice> */
  kk_drop_match(_self, {kk_ref_dup(loc);}, {}, _ctx)
  kk_std_core_hnd__marker ___wildcard__565__14_3126 = _b_3040; /*std/core/hnd/marker<<local<2014>|2021>,std/text/parse/parse-error<2020>>*/;
  kk_std_core_hnd__ev ___wildcard__565__17_3127 = _b_3041; /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/;
  kk_std_core_hnd__ev_dropn(___wildcard__565__17_3127, (KK_I32(3)), _ctx);
  return kk_ref_get(loc,kk_context());
}


// lift anonymous function
struct kk_std_text_parse_parse_fun3726__t {
  struct kk_function_s _base;
  kk_ref_t loc;
};
static kk_box_t kk_std_text_parse_parse_fun3726(kk_function_t _fself, kk_std_core_hnd__marker _b_3051, kk_std_core_hnd__ev _b_3052, kk_box_t _b_3053, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3726(kk_ref_t loc, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3726__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3726__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3726, kk_context());
  _self->loc = loc;
  return &_self->_base;
}



// lift anonymous function
struct kk_std_text_parse_parse_fun3727__t {
  struct kk_function_s _base;
  kk_box_t _b_3053;
  kk_ref_t loc;
};
static kk_box_t kk_std_text_parse_parse_fun3727(kk_function_t _fself, kk_function_t _b_3048, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3727(kk_box_t _b_3053, kk_ref_t loc, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3727__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3727__t, 3, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3727, kk_context());
  _self->_b_3053 = _b_3053;
  _self->loc = loc;
  return &_self->_base;
}



// lift anonymous function
struct kk_std_text_parse_parse_fun3731__t {
  struct kk_function_s _base;
  kk_box_t _b_3053;
};
static kk_box_t kk_std_text_parse_parse_fun3731(kk_function_t _fself, kk_box_t _b_3045, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3731(kk_box_t _b_3053, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3731__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3731__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3731, kk_context());
  _self->_b_3053 = _b_3053;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_parse_fun3731(kk_function_t _fself, kk_box_t _b_3045, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3731__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3731__t*, _fself);
  kk_box_t _b_3053 = _self->_b_3053; /* 51 */
  kk_drop_match(_self, {kk_box_dup(_b_3053);}, {}, _ctx)
  kk_std_text_parse__parse_error _x3732;
  kk_string_t _x3733 = kk_string_unbox(_b_3053); /*string*/
  kk_std_core__sslice _x3734 = kk_std_core__sslice_unbox(_b_3045, _ctx); /*sslice*/
  _x3732 = kk_std_text_parse__new_ParseError(kk_reuse_null, _x3733, _x3734, _ctx); /*std/text/parse/parse-error<39>*/
  return kk_std_text_parse__parse_error_box(_x3732, _ctx);
}
static kk_box_t kk_std_text_parse_parse_fun3727(kk_function_t _fself, kk_function_t _b_3048, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3727__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3727__t*, _fself);
  kk_box_t _b_3053 = _self->_b_3053; /* 51 */
  kk_ref_t loc = _self->loc; /* local-var<2014,sslice> */
  kk_drop_match(_self, {kk_box_dup(_b_3053);kk_ref_dup(loc);}, {}, _ctx)
  kk_function_drop(_b_3048, _ctx);
  kk_std_core__sslice x0_2519;
  kk_box_t _x3728 = kk_ref_get(loc,kk_context()); /*260*/
  x0_2519 = kk_std_core__sslice_unbox(_x3728, _ctx); /*sslice*/
  kk_std_text_parse__parse_error _x3729;
  if (kk_yielding(kk_context())) {
    kk_std_core__sslice_drop(x0_2519, _ctx);
    kk_box_t _x3730 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_parse_fun3731(_b_3053, _ctx), _ctx); /*3926*/
    _x3729 = kk_std_text_parse__parse_error_unbox(_x3730, _ctx); /*std/text/parse/parse-error<2020>*/
  }
  else {
    kk_string_t _x3735 = kk_string_unbox(_b_3053); /*string*/
    _x3729 = kk_std_text_parse__new_ParseError(kk_reuse_null, _x3735, x0_2519, _ctx); /*std/text/parse/parse-error<2020>*/
  }
  return kk_std_text_parse__parse_error_box(_x3729, _ctx);
}
static kk_box_t kk_std_text_parse_parse_fun3726(kk_function_t _fself, kk_std_core_hnd__marker _b_3051, kk_std_core_hnd__ev _b_3052, kk_box_t _b_3053, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3726__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3726__t*, _fself);
  kk_ref_t loc = _self->loc; /* local-var<2014,sslice> */
  kk_drop_match(_self, {kk_ref_dup(loc);}, {}, _ctx)
  kk_std_core_hnd__ev_dropn(_b_3052, (KK_I32(3)), _ctx);
  return kk_std_core_hnd_yield_to_final(_b_3051, kk_std_text_parse_new_parse_fun3727(_b_3053, loc, _ctx), _ctx);
}


// lift anonymous function
struct kk_std_text_parse_parse_fun3738__t {
  struct kk_function_s _base;
  kk_ref_t loc;
};
static kk_box_t kk_std_text_parse_parse_fun3738(kk_function_t _fself, kk_std_core_hnd__marker _b_3070, kk_std_core_hnd__ev _b_3071, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3738(kk_ref_t loc, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3738__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3738__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3738, kk_context());
  _self->loc = loc;
  return &_self->_base;
}



// lift anonymous function
struct kk_std_text_parse_parse_fun3739__t {
  struct kk_function_s _base;
  kk_ref_t loc;
};
static kk_box_t kk_std_text_parse_parse_fun3739(kk_function_t _fself, kk_function_t _b_3067, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3739(kk_ref_t loc, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3739__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3739__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3739, kk_context());
  _self->loc = loc;
  return &_self->_base;
}



// lift anonymous function
struct kk_std_text_parse_parse_fun3740__t {
  struct kk_function_s _base;
  kk_ref_t loc;
};
static kk_box_t kk_std_text_parse_parse_fun3740(kk_function_t _fself, kk_box_t _b_3061, kk_function_t _b_3062, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3740(kk_ref_t loc, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3740__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3740__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3740, kk_context());
  _self->loc = loc;
  return &_self->_base;
}



// lift anonymous function
struct kk_std_text_parse_parse_fun3741__t {
  struct kk_function_s _base;
  kk_function_t _b_3062;
};
static kk_std_text_parse__parse_error kk_std_text_parse_parse_fun3741(kk_function_t _fself, bool _b_3063, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3741(kk_function_t _b_3062, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3741__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3741__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3741, kk_context());
  _self->_b_3062 = _b_3062;
  return &_self->_base;
}

static kk_std_text_parse__parse_error kk_std_text_parse_parse_fun3741(kk_function_t _fself, bool _b_3063, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3741__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3741__t*, _fself);
  kk_function_t _b_3062 = _self->_b_3062; /* (7088) -> 7089 7090 */
  kk_drop_match(_self, {kk_function_dup(_b_3062);}, {}, _ctx)
  kk_box_t _x3742 = kk_function_call(kk_box_t, (kk_function_t, kk_box_t, kk_context_t*), _b_3062, (_b_3062, kk_bool_box(_b_3063), _ctx)); /*7090*/
  return kk_std_text_parse__parse_error_unbox(_x3742, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_parse_fun3747__t {
  struct kk_function_s _base;
  kk_ref_t loc;
  kk_function_t r_3122;
};
static kk_box_t kk_std_text_parse_parse_fun3747(kk_function_t _fself, kk_box_t _b_3057, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3747(kk_ref_t loc, kk_function_t r_3122, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3747__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3747__t, 3, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3747, kk_context());
  _self->loc = loc;
  _self->r_3122 = r_3122;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_parse_fun3747(kk_function_t _fself, kk_box_t _b_3057, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3747__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3747__t*, _fself);
  kk_ref_t loc = _self->loc; /* local-var<2014,sslice> */
  kk_function_t r_3122 = _self->r_3122; /* (bool) -> <local<2014>|2021> std/text/parse/parse-error<2020> */
  kk_drop_match(_self, {kk_ref_dup(loc);kk_function_dup(r_3122);}, {}, _ctx)
  kk_std_text_parse__parse_error _x3748;
  kk_std_core__sslice _x3749 = kk_std_core__sslice_unbox(_b_3057, _ctx); /*sslice*/
  _x3748 = kk_std_text_parse__mlift2417_parse(loc, r_3122, _x3749, _ctx); /*std/text/parse/parse-error<2020>*/
  return kk_std_text_parse__parse_error_box(_x3748, _ctx);
}
static kk_box_t kk_std_text_parse_parse_fun3740(kk_function_t _fself, kk_box_t _b_3061, kk_function_t _b_3062, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3740__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3740__t*, _fself);
  kk_ref_t loc = _self->loc; /* local-var<2014,sslice> */
  kk_drop_match(_self, {kk_ref_dup(loc);}, {}, _ctx)
  kk_box_drop(_b_3061, _ctx);
  kk_function_t r_3122 = kk_std_text_parse_new_parse_fun3741(_b_3062, _ctx); /*(bool) -> <local<2014>|2021> std/text/parse/parse-error<2020>*/;
  kk_std_core__sslice x1_2524;
  kk_box_t _x3743;
  kk_ref_t _x3744 = kk_ref_dup(loc); /*local-var<2014,sslice>*/
  _x3743 = kk_ref_get(_x3744,kk_context()); /*260*/
  x1_2524 = kk_std_core__sslice_unbox(_x3743, _ctx); /*sslice*/
  kk_std_text_parse__parse_error _x3745;
  if (kk_yielding(kk_context())) {
    kk_std_core__sslice_drop(x1_2524, _ctx);
    kk_box_t _x3746 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_parse_fun3747(loc, r_3122, _ctx), _ctx); /*3926*/
    _x3745 = kk_std_text_parse__parse_error_unbox(_x3746, _ctx); /*std/text/parse/parse-error<2020>*/
  }
  else {
    _x3745 = kk_std_text_parse__mlift2417_parse(loc, r_3122, x1_2524, _ctx); /*std/text/parse/parse-error<2020>*/
  }
  return kk_std_text_parse__parse_error_box(_x3745, _ctx);
}
static kk_box_t kk_std_text_parse_parse_fun3739(kk_function_t _fself, kk_function_t _b_3067, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3739__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3739__t*, _fself);
  kk_ref_t loc = _self->loc; /* local-var<2014,sslice> */
  kk_drop_match(_self, {kk_ref_dup(loc);}, {}, _ctx)
  return kk_std_core_hnd_protect(kk_unit_box(kk_Unit), kk_std_text_parse_new_parse_fun3740(loc, _ctx), _b_3067, _ctx);
}
static kk_box_t kk_std_text_parse_parse_fun3738(kk_function_t _fself, kk_std_core_hnd__marker _b_3070, kk_std_core_hnd__ev _b_3071, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3738__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3738__t*, _fself);
  kk_ref_t loc = _self->loc; /* local-var<2014,sslice> */
  kk_drop_match(_self, {kk_ref_dup(loc);}, {}, _ctx)
  kk_std_core_hnd__marker m00_3131 = _b_3070; /*std/core/hnd/marker<<local<2014>|2021>,std/text/parse/parse-error<2020>>*/;
  kk_std_core_hnd__ev ___wildcard__558__16_3132 = _b_3071; /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/;
  kk_std_core_hnd__ev_dropn(___wildcard__558__16_3132, (KK_I32(3)), _ctx);
  return kk_std_core_hnd_yield_to(m00_3131, kk_std_text_parse_new_parse_fun3739(loc, _ctx), _ctx);
}


// lift anonymous function
struct kk_std_text_parse_parse_fun3752__t {
  struct kk_function_s _base;
  kk_ref_t loc;
};
static kk_box_t kk_std_text_parse_parse_fun3752(kk_function_t _fself, kk_std_core_hnd__marker _b_3077, kk_std_core_hnd__ev _b_3078, kk_box_t _b_3079, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3752(kk_ref_t loc, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3752__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3752__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3752, kk_context());
  _self->loc = loc;
  return &_self->_base;
}



// lift anonymous function
struct kk_std_text_parse_parse_fun3753__t {
  struct kk_function_s _base;
  kk_box_t _b_3079;
};
static kk_std_core_types__maybe kk_std_text_parse_parse_fun3753(kk_function_t _fself, kk_std_core__sslice _b_3082, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3753(kk_box_t _b_3079, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3753__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3753__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3753, kk_context());
  _self->_b_3079 = _b_3079;
  return &_self->_base;
}

static kk_std_core_types__maybe kk_std_text_parse_parse_fun3753(kk_function_t _fself, kk_std_core__sslice _b_3082, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3753__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3753__t*, _fself);
  kk_box_t _b_3079 = _self->_b_3079; /* 51 */
  kk_drop_match(_self, {kk_box_dup(_b_3079);}, {}, _ctx)
  kk_box_t _x3754;
  kk_function_t _x3755 = kk_function_unbox(_b_3079); /*(3080) -> total 3081*/
  _x3754 = kk_function_call(kk_box_t, (kk_function_t, kk_box_t, kk_context_t*), _x3755, (_x3755, kk_std_core__sslice_box(_b_3082, _ctx), _ctx)); /*3081*/
  return kk_std_core_types__maybe_unbox(_x3754, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_parse_fun3760__t {
  struct kk_function_s _base;
  kk_ref_t loc;
  kk_function_t x2_3135;
};
static kk_box_t kk_std_text_parse_parse_fun3760(kk_function_t _fself, kk_box_t _b_3075, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3760(kk_ref_t loc, kk_function_t x2_3135, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3760__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3760__t, 3, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3760, kk_context());
  _self->loc = loc;
  _self->x2_3135 = x2_3135;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_parse_fun3760(kk_function_t _fself, kk_box_t _b_3075, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3760__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3760__t*, _fself);
  kk_ref_t loc = _self->loc; /* local-var<2014,sslice> */
  kk_function_t x2_3135 = _self->x2_3135; /* (sslice) -> total maybe<(1983, sslice)> */
  kk_drop_match(_self, {kk_ref_dup(loc);kk_function_dup(x2_3135);}, {}, _ctx)
  kk_std_core_types__maybe _x3761;
  kk_std_core__sslice _x3762 = kk_std_core__sslice_unbox(_b_3075, _ctx); /*sslice*/
  _x3761 = kk_std_text_parse__mlift2419_parse(loc, x2_3135, _x3762, _ctx); /*maybe<1983>*/
  return kk_std_core_types__maybe_box(_x3761, _ctx);
}
static kk_box_t kk_std_text_parse_parse_fun3752(kk_function_t _fself, kk_std_core_hnd__marker _b_3077, kk_std_core_hnd__ev _b_3078, kk_box_t _b_3079, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3752__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3752__t*, _fself);
  kk_ref_t loc = _self->loc; /* local-var<2014,sslice> */
  kk_drop_match(_self, {kk_ref_dup(loc);}, {}, _ctx)
  kk_std_core_hnd__marker ___wildcard__522__14_3133 = _b_3077; /*std/core/hnd/marker<<local<2014>|2021>,std/text/parse/parse-error<2020>>*/;
  kk_std_core_hnd__ev ___wildcard__522__17_3134 = _b_3078; /*std/core/hnd/ev<std/text/parse/.hnd-parse>*/;
  kk_std_core_hnd__ev_dropn(___wildcard__522__17_3134, (KK_I32(3)), _ctx);
  kk_function_t x2_3135 = kk_std_text_parse_new_parse_fun3753(_b_3079, _ctx); /*(sslice) -> total maybe<(1983, sslice)>*/;
  kk_std_core__sslice x3_2527;
  kk_box_t _x3756;
  kk_ref_t _x3757 = kk_ref_dup(loc); /*local-var<2014,sslice>*/
  _x3756 = kk_ref_get(_x3757,kk_context()); /*260*/
  x3_2527 = kk_std_core__sslice_unbox(_x3756, _ctx); /*sslice*/
  kk_std_core_types__maybe _x3758;
  if (kk_yielding(kk_context())) {
    kk_std_core__sslice_drop(x3_2527, _ctx);
    kk_box_t _x3759 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_parse_fun3760(loc, x2_3135, _ctx), _ctx); /*3926*/
    _x3758 = kk_std_core_types__maybe_unbox(_x3759, _ctx); /*maybe<1983>*/
  }
  else {
    _x3758 = kk_std_text_parse__mlift2419_parse(loc, x2_3135, x3_2527, _ctx); /*maybe<1983>*/
  }
  return kk_std_core_types__maybe_box(_x3758, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_parse_fun3764__t {
  struct kk_function_s _base;
  kk_ref_t loc;
};
static kk_box_t kk_std_text_parse_parse_fun3764(kk_function_t _fself, kk_box_t _b_3091, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3764(kk_ref_t loc, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3764__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3764__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3764, kk_context());
  _self->loc = loc;
  return &_self->_base;
}



// lift anonymous function
struct kk_std_text_parse_parse_fun3768__t {
  struct kk_function_s _base;
  kk_box_t _b_3091;
};
static kk_box_t kk_std_text_parse_parse_fun3768(kk_function_t _fself, kk_box_t _b_3086, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_fun3768(kk_box_t _b_3091, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3768__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_fun3768__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_fun3768, kk_context());
  _self->_b_3091 = _b_3091;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_parse_fun3768(kk_function_t _fself, kk_box_t _b_3086, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3768__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3768__t*, _fself);
  kk_box_t _b_3091 = _self->_b_3091; /* 355 */
  kk_drop_match(_self, {kk_box_dup(_b_3091);}, {}, _ctx)
  kk_std_text_parse__parse_error _x3769;
  kk_std_core__sslice _x3770 = kk_std_core__sslice_unbox(_b_3086, _ctx); /*sslice*/
  _x3769 = kk_std_text_parse__new_ParseOk(kk_reuse_null, _b_3091, _x3770, _ctx); /*std/text/parse/parse-error<39>*/
  return kk_std_text_parse__parse_error_box(_x3769, _ctx);
}
static kk_box_t kk_std_text_parse_parse_fun3764(kk_function_t _fself, kk_box_t _b_3091, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_fun3764__t* _self = kk_function_as(struct kk_std_text_parse_parse_fun3764__t*, _fself);
  kk_ref_t loc = _self->loc; /* local-var<2014,sslice> */
  kk_drop_match(_self, {kk_ref_dup(loc);}, {}, _ctx)
  kk_std_core__sslice x4_2529;
  kk_box_t _x3765 = kk_ref_get(loc,kk_context()); /*260*/
  x4_2529 = kk_std_core__sslice_unbox(_x3765, _ctx); /*sslice*/
  kk_std_text_parse__parse_error _x3766;
  if (kk_yielding(kk_context())) {
    kk_std_core__sslice_drop(x4_2529, _ctx);
    kk_box_t _x3767 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_parse_fun3768(_b_3091, _ctx), _ctx); /*3926*/
    _x3766 = kk_std_text_parse__parse_error_unbox(_x3767, _ctx); /*std/text/parse/parse-error<2020>*/
  }
  else {
    _x3766 = kk_std_text_parse__new_ParseOk(kk_reuse_null, _b_3091, x4_2529, _ctx); /*std/text/parse/parse-error<2020>*/
  }
  return kk_std_text_parse__parse_error_box(_x3766, _ctx);
}

kk_std_text_parse__parse_error kk_std_text_parse_parse(kk_std_core__sslice input0, kk_function_t p, kk_context_t* _ctx) { /* forall<a,e> (input0 : sslice, p : () -> <parse|e> a) -> e parse-error<a> */ 
  kk_ref_t loc = kk_ref_alloc((kk_std_core__sslice_box(input0, _ctx)),kk_context()); /*local-var<2014,sslice>*/;
  int32_t _b_3092_3087 = (KK_I32(3)); /*int32*/;
  kk_std_text_parse__parse_error res;
  kk_box_t _x3719;
  kk_std_text_parse__hnd_parse _x3720;
  kk_std_core_hnd__clause0 _x3721;
  kk_function_t _x3722;
  kk_ref_dup(loc);
  _x3722 = kk_std_text_parse_new_parse_fun3723(loc, _ctx); /*(std/core/hnd/marker<39,40>, std/core/hnd/ev<38>) -> 39 260*/
  _x3721 = kk_std_core_hnd__new_Clause0(_x3722, _ctx); /*std/core/hnd/clause0<37,38,39,40>*/
  kk_std_core_hnd__clause1 _x3724;
  kk_function_t _x3725;
  kk_ref_dup(loc);
  _x3725 = kk_std_text_parse_new_parse_fun3726(loc, _ctx); /*(std/core/hnd/marker<54,55>, std/core/hnd/ev<53>, 51) -> 54 3990*/
  _x3724 = kk_std_core_hnd__new_Clause1(_x3725, _ctx); /*std/core/hnd/clause1<51,52,53,54,55>*/
  kk_std_core_hnd__clause0 _x3736;
  kk_function_t _x3737;
  kk_ref_dup(loc);
  _x3737 = kk_std_text_parse_new_parse_fun3738(loc, _ctx); /*(std/core/hnd/marker<39,40>, std/core/hnd/ev<38>) -> 39 6489*/
  _x3736 = kk_std_core_hnd__new_Clause0(_x3737, _ctx); /*std/core/hnd/clause0<37,38,39,40>*/
  kk_std_core_hnd__clause1 _x3750;
  kk_function_t _x3751;
  kk_ref_dup(loc);
  _x3751 = kk_std_text_parse_new_parse_fun3752(loc, _ctx); /*(std/core/hnd/marker<54,55>, std/core/hnd/ev<53>, 51) -> 54 52*/
  _x3750 = kk_std_core_hnd__new_Clause1(_x3751, _ctx); /*std/core/hnd/clause1<51,52,53,54,55>*/
  _x3720 = kk_std_text_parse__new_Hnd_parse(kk_reuse_null, _x3721, _x3724, _x3736, _x3750, _ctx); /*std/text/parse/.hnd-parse<27,28>*/
  kk_function_t _x3763;
  kk_ref_dup(loc);
  _x3763 = kk_std_text_parse_new_parse_fun3764(loc, _ctx); /*(355) -> 356 357*/
  _x3719 = kk_std_text_parse__handle_parse(_b_3092_3087, _x3720, _x3763, p, _ctx); /*357*/
  res = kk_std_text_parse__parse_error_unbox(_x3719, _ctx); /*std/text/parse/parse-error<2020>*/
  kk_box_t _x3771 = kk_std_core_hnd_prompt_local_var(loc, kk_std_text_parse__parse_error_box(res, _ctx), _ctx); /*10459*/
  return kk_std_text_parse__parse_error_unbox(_x3771, _ctx);
}
 
// monadic lift


// lift anonymous function
struct kk_std_text_parse__mlift2422_parse_eof_fun3774__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse__mlift2422_parse_eof_fun3774(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse__new_mlift2422_parse_eof_fun3774(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse__mlift2422_parse_eof_fun3774, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse__mlift2422_parse_eof_fun3774(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_unit_t _x3775 = kk_Unit;
  kk_std_text_parse_eof(_ctx);
  return kk_unit_box(_x3775);
}


// lift anonymous function
struct kk_std_text_parse__mlift2422_parse_eof_fun3776__t {
  struct kk_function_s _base;
  kk_box_t x;
};
static kk_box_t kk_std_text_parse__mlift2422_parse_eof_fun3776(kk_function_t _fself, kk_box_t _b_3141, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse__new_mlift2422_parse_eof_fun3776(kk_box_t x, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2422_parse_eof_fun3776__t* _self = kk_function_alloc_as(struct kk_std_text_parse__mlift2422_parse_eof_fun3776__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse__mlift2422_parse_eof_fun3776, kk_context());
  _self->x = x;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse__mlift2422_parse_eof_fun3776(kk_function_t _fself, kk_box_t _b_3141, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2422_parse_eof_fun3776__t* _self = kk_function_as(struct kk_std_text_parse__mlift2422_parse_eof_fun3776__t*, _fself);
  kk_box_t x = _self->x; /* 2045 */
  kk_drop_match(_self, {kk_box_dup(x);}, {}, _ctx)
  kk_box_drop(_b_3141, _ctx);
  return x;
}

kk_box_t kk_std_text_parse__mlift2422_parse_eof(kk_box_t x, kk_context_t* _ctx) { /* forall<a,e> (x : a) -> <parse|e> a */ 
  kk_ssize_t _b_3138_3136;
  kk_std_core_hnd__htag _x3772 = kk_std_core_hnd__htag_dup(kk_std_text_parse__tag_parse); /*std/core/hnd/htag<std/text/parse/.hnd-parse>*/
  _b_3138_3136 = kk_std_core_hnd__evv_index(_x3772, _ctx); /*std/core/hnd/ev-index*/
  kk_unit_t x0_2534 = kk_Unit;
  kk_box_t _x3773 = kk_std_core_hnd__open_at0(_b_3138_3136, kk_std_text_parse__new_mlift2422_parse_eof_fun3774(_ctx), _ctx); /*5388*/
  kk_unit_unbox(_x3773);
  if (kk_yielding(kk_context())) {
    return kk_std_core_hnd_yield_extend(kk_std_text_parse__new_mlift2422_parse_eof_fun3776(x, _ctx), _ctx);
  }
  {
    return x;
  }
}


// lift anonymous function
struct kk_std_text_parse_parse_eof_fun3777__t {
  struct kk_function_s _base;
  kk_function_t p;
};
static kk_box_t kk_std_text_parse_parse_eof_fun3777(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_eof_fun3777(kk_function_t p, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_eof_fun3777__t* _self = kk_function_alloc_as(struct kk_std_text_parse_parse_eof_fun3777__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_parse_eof_fun3777, kk_context());
  _self->p = p;
  return &_self->_base;
}



// lift anonymous function
struct kk_std_text_parse_parse_eof_fun3779__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_parse_eof_fun3779(kk_function_t _fself, kk_box_t _x13778, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_parse_eof_fun3779(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_parse_eof_fun3779, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_parse_eof_fun3779(kk_function_t _fself, kk_box_t _x13778, kk_context_t* _ctx) {
  kk_unused(_fself);
  return kk_std_text_parse__mlift2422_parse_eof(_x13778, _ctx);
}
static kk_box_t kk_std_text_parse_parse_eof_fun3777(kk_function_t _fself, kk_context_t* _ctx) {
  struct kk_std_text_parse_parse_eof_fun3777__t* _self = kk_function_as(struct kk_std_text_parse_parse_eof_fun3777__t*, _fself);
  kk_function_t p = _self->p; /* () -> <std/text/parse/parse|2046> 2045 */
  kk_drop_match(_self, {kk_function_dup(p);}, {}, _ctx)
  kk_box_t x_2538 = kk_function_call(kk_box_t, (kk_function_t, kk_context_t*), p, (p, _ctx)); /*2045*/;
  if (kk_yielding(kk_context())) {
    kk_box_drop(x_2538, _ctx);
    return kk_std_core_hnd_yield_extend(kk_std_text_parse_new_parse_eof_fun3779(_ctx), _ctx);
  }
  {
    return kk_std_text_parse__mlift2422_parse_eof(x_2538, _ctx);
  }
}

kk_std_text_parse__parse_error kk_std_text_parse_parse_eof(kk_std_core__sslice input, kk_function_t p, kk_context_t* _ctx) { /* forall<a,e> (input : sslice, p : () -> <parse|e> a) -> e parse-error<a> */ 
  return kk_std_text_parse_parse(input, kk_std_text_parse_new_parse_eof_fun3777(p, _ctx), _ctx);
}


// lift anonymous function
struct kk_std_text_parse_pnat_fun3785__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_pnat_fun3785(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_pnat_fun3785(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_pnat_fun3785, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_text_parse_pnat_fun3787__t {
  struct kk_function_s _base;
};
static bool kk_std_text_parse_pnat_fun3787(kk_function_t _fself, kk_char_t _x13786, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_pnat_fun3787(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_pnat_fun3787, _ctx)
  return kk_function_dup(_fself);
}

static bool kk_std_text_parse_pnat_fun3787(kk_function_t _fself, kk_char_t _x13786, kk_context_t* _ctx) {
  kk_unused(_fself);
  return kk_std_core_is_digit(_x13786, _ctx);
}
static kk_std_core_types__maybe kk_std_text_parse_pnat_fun3785(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__tuple2_ _match_3296 = kk_std_text_parse_next_while0(slice, kk_std_text_parse_new_pnat_fun3787(_ctx), kk_std_core__new_Nil(_ctx), _ctx); /*(list<char>, sslice)*/;
  {
    kk_box_t _box_x3146 = _match_3296.fst;
    kk_box_t _box_x3147 = _match_3296.snd;
    kk_std_core__list _pat00 = kk_std_core__list_unbox(_box_x3146, NULL);
    kk_std_core__sslice _pat10 = kk_std_core__sslice_unbox(_box_x3147, NULL);
    if (kk_std_core__is_Nil(_pat00)) {
      kk_std_core_types__tuple2__drop(_match_3296, _ctx);
      return kk_std_core_types__new_Nothing(_ctx);
    }
  }
  {
    kk_box_t _box_x3148 = _match_3296.fst;
    kk_box_t _box_x3149 = _match_3296.snd;
    kk_std_core__list xs = kk_std_core__list_unbox(_box_x3148, NULL);
    kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x3149, NULL);
    kk_std_core__sslice_dup(rest0);
    kk_std_core__list_dup(xs);
    kk_std_core_types__tuple2__drop(_match_3296, _ctx);
    kk_box_t _x3792;
    kk_std_core_types__tuple2_ _x3793 = kk_std_core_types__new_dash__lp__comma__rp_(kk_std_core__list_box(xs, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
    _x3792 = kk_std_core_types__tuple2__box(_x3793, _ctx); /*107*/
    return kk_std_core_types__new_Just(_x3792, _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_pnat_fun3795__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_pnat_fun3795(kk_function_t _fself, kk_box_t _b_3161, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_pnat_fun3795(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_pnat_fun3795, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_pnat_fun3795(kk_function_t _fself, kk_box_t _b_3161, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_integer_t _x3796;
  kk_std_core__list _x3797 = kk_std_core__list_unbox(_b_3161, _ctx); /*list<char>*/
  _x3796 = kk_std_text_parse__mlift2423_pnat(_x3797, _ctx); /*int*/
  return kk_integer_box(_x3796);
}

kk_integer_t kk_std_text_parse_pnat(kk_context_t* _ctx) { /* () -> parse int */ 
  kk_std_core__list x_2540;
  kk_box_t _x3782;
  kk_string_t _x3783;
  kk_define_string_literal(, _s3784, 5, "digit")
  _x3783 = kk_string_dup(_s3784); /*string*/
  _x3782 = kk_std_text_parse_satisfy_fail(_x3783, kk_std_text_parse_new_pnat_fun3785(_ctx), _ctx); /*542*/
  x_2540 = kk_std_core__list_unbox(_x3782, _ctx); /*list<char>*/
  if (kk_yielding(kk_context())) {
    kk_std_core__list_drop(x_2540, _ctx);
    kk_box_t _x3794 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_pnat_fun3795(_ctx), _ctx); /*3926*/
    return kk_integer_unbox(_x3794);
  }
  {
    kk_string_t _x3798 = kk_std_core_string_2(x_2540, _ctx); /*string*/
    kk_std_core_types__optional _x3799 = kk_std_core_types__new_Optional(kk_integer_box(kk_integer_from_small(0)), _ctx); /*optional<112>*/
    return kk_std_core_parse_int_default(_x3798, _x3799, kk_std_core_types__new_None(_ctx), _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_sign_fun3801__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_sign_fun3801(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_sign_fun3801(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_sign_fun3801, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_text_parse_sign_fun3804__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_sign_fun3804(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_sign_fun3804(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_sign_fun3804, _ctx)
  return kk_function_dup(_fself);
}

static kk_std_core_types__maybe kk_std_text_parse_sign_fun3804(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__maybe _match_3294 = kk_std_core_next(slice, _ctx); /*maybe<(char, sslice)>*/;
  if (kk_std_core_types__is_Just(_match_3294)) {
    kk_box_t _box_x3165 = _match_3294._cons.Just.value;
    kk_std_core_types__tuple2_ _pat00 = kk_std_core_types__tuple2__unbox(_box_x3165, NULL);
    if (kk_std_core_types__is_dash__lp__comma__rp_(_pat00)) {
      kk_box_t _box_x3166 = _pat00.fst;
      kk_box_t _box_x3167 = _pat00.snd;
      kk_char_t c = kk_char_unbox(_box_x3166, NULL);
      kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x3167, NULL);
      kk_string_t _x3808;
      kk_define_string_literal(, _s3809, 2, "+-")
      _x3808 = kk_string_dup(_s3809); /*string*/
      kk_string_t _x3810 = kk_std_core_string(c, _ctx); /*string*/
      if (kk_string_contains(_x3808,_x3810,kk_context())) {
        kk_std_core__sslice_dup(rest0);
        kk_std_core_types__maybe_drop(_match_3294, _ctx);
        kk_box_t _x3811;
        kk_std_core_types__tuple2_ _x3812 = kk_std_core_types__new_dash__lp__comma__rp_(kk_char_box(c, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
        _x3811 = kk_std_core_types__tuple2__box(_x3812, _ctx); /*107*/
        return kk_std_core_types__new_Just(_x3811, _ctx);
      }
    }
  }
  {
    kk_std_core_types__maybe_drop(_match_3294, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}
static kk_box_t kk_std_text_parse_sign_fun3801(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x3802;
  kk_define_string_literal(, _s3803, 2, "+-")
  _x3802 = kk_string_dup(_s3803); /*string*/
  return kk_std_text_parse_satisfy_fail(_x3802, kk_std_text_parse_new_sign_fun3804(_ctx), _ctx);
}


// lift anonymous function
struct kk_std_text_parse_sign_fun3813__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_sign_fun3813(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_sign_fun3813(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_sign_fun3813, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_sign_fun3813(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  return kk_char_box('+', _ctx);
}


// lift anonymous function
struct kk_std_text_parse_sign_fun3815__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_sign_fun3815(kk_function_t _fself, kk_box_t _b_3183, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_sign_fun3815(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_sign_fun3815, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_sign_fun3815(kk_function_t _fself, kk_box_t _b_3183, kk_context_t* _ctx) {
  kk_unused(_fself);
  bool _x3816;
  kk_char_t _x3817 = kk_char_unbox(_b_3183, _ctx); /*char*/
  _x3816 = kk_std_text_parse__mlift2424_sign(_x3817, _ctx); /*bool*/
  return kk_bool_box(_x3816);
}

bool kk_std_text_parse_sign(kk_context_t* _ctx) { /* () -> parse bool */ 
  kk_char_t x_2543;
  kk_box_t _x3800 = kk_std_text_parse__lp__bar__bar__rp_(kk_std_text_parse_new_sign_fun3801(_ctx), kk_std_text_parse_new_sign_fun3813(_ctx), _ctx); /*944*/
  x_2543 = kk_char_unbox(_x3800, _ctx); /*char*/
  if (kk_yielding(kk_context())) {
    kk_box_t _x3814 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_sign_fun3815(_ctx), _ctx); /*3926*/
    return kk_bool_unbox(_x3814);
  }
  {
    return (x_2543 == ('-'));
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_text_parse__mlift2426_pint_fun3819__t {
  struct kk_function_s _base;
  bool neg;
};
static kk_box_t kk_std_text_parse__mlift2426_pint_fun3819(kk_function_t _fself, kk_box_t _b_3186, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse__new_mlift2426_pint_fun3819(bool neg, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2426_pint_fun3819__t* _self = kk_function_alloc_as(struct kk_std_text_parse__mlift2426_pint_fun3819__t, 1, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse__mlift2426_pint_fun3819, kk_context());
  _self->neg = neg;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse__mlift2426_pint_fun3819(kk_function_t _fself, kk_box_t _b_3186, kk_context_t* _ctx) {
  struct kk_std_text_parse__mlift2426_pint_fun3819__t* _self = kk_function_as(struct kk_std_text_parse__mlift2426_pint_fun3819__t*, _fself);
  bool neg = _self->neg; /* bool */
  kk_drop_match(_self, {;}, {}, _ctx)
  kk_integer_t _x3820;
  kk_integer_t i_3188 = kk_integer_unbox(_b_3186); /*int*/;
  if (neg) {
    _x3820 = kk_integer_neg(i_3188,kk_context()); /*int*/
  }
  else {
    _x3820 = i_3188; /*int*/
  }
  return kk_integer_box(_x3820);
}

kk_integer_t kk_std_text_parse__mlift2426_pint(kk_char_t c0, kk_context_t* _ctx) { /* (c0 : char) -> parse int */ 
  bool neg = (c0 == ('-')); /*bool*/;
  kk_integer_t x_2546 = kk_std_text_parse_pnat(_ctx); /*int*/;
  if (kk_yielding(kk_context())) {
    kk_integer_drop(x_2546, _ctx);
    kk_box_t _x3818 = kk_std_core_hnd_yield_extend(kk_std_text_parse__new_mlift2426_pint_fun3819(neg, _ctx), _ctx); /*3926*/
    return kk_integer_unbox(_x3818);
  }
  {
    kk_integer_t i_3189 = x_2546; /*int*/;
    if (neg) {
      return kk_integer_neg(i_3189,kk_context());
    }
    {
      return i_3189;
    }
  }
}


// lift anonymous function
struct kk_std_text_parse_pint_fun3822__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_pint_fun3822(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_pint_fun3822(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_pint_fun3822, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_text_parse_pint_fun3825__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_pint_fun3825(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_pint_fun3825(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_pint_fun3825, _ctx)
  return kk_function_dup(_fself);
}

static kk_std_core_types__maybe kk_std_text_parse_pint_fun3825(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__maybe _match_3291 = kk_std_core_next(slice, _ctx); /*maybe<(char, sslice)>*/;
  if (kk_std_core_types__is_Just(_match_3291)) {
    kk_box_t _box_x3190 = _match_3291._cons.Just.value;
    kk_std_core_types__tuple2_ _pat00 = kk_std_core_types__tuple2__unbox(_box_x3190, NULL);
    if (kk_std_core_types__is_dash__lp__comma__rp_(_pat00)) {
      kk_box_t _box_x3191 = _pat00.fst;
      kk_box_t _box_x3192 = _pat00.snd;
      kk_char_t c = kk_char_unbox(_box_x3191, NULL);
      kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x3192, NULL);
      kk_string_t _x3829;
      kk_define_string_literal(, _s3830, 2, "+-")
      _x3829 = kk_string_dup(_s3830); /*string*/
      kk_string_t _x3831 = kk_std_core_string(c, _ctx); /*string*/
      if (kk_string_contains(_x3829,_x3831,kk_context())) {
        kk_std_core__sslice_dup(rest0);
        kk_std_core_types__maybe_drop(_match_3291, _ctx);
        kk_box_t _x3832;
        kk_std_core_types__tuple2_ _x3833 = kk_std_core_types__new_dash__lp__comma__rp_(kk_char_box(c, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
        _x3832 = kk_std_core_types__tuple2__box(_x3833, _ctx); /*107*/
        return kk_std_core_types__new_Just(_x3832, _ctx);
      }
    }
  }
  {
    kk_std_core_types__maybe_drop(_match_3291, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}
static kk_box_t kk_std_text_parse_pint_fun3822(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x3823;
  kk_define_string_literal(, _s3824, 2, "+-")
  _x3823 = kk_string_dup(_s3824); /*string*/
  return kk_std_text_parse_satisfy_fail(_x3823, kk_std_text_parse_new_pint_fun3825(_ctx), _ctx);
}


// lift anonymous function
struct kk_std_text_parse_pint_fun3834__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_pint_fun3834(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_pint_fun3834(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_pint_fun3834, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_pint_fun3834(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  return kk_char_box('+', _ctx);
}


// lift anonymous function
struct kk_std_text_parse_pint_fun3836__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_pint_fun3836(kk_function_t _fself, kk_box_t _b_3208, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_pint_fun3836(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_pint_fun3836, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_pint_fun3836(kk_function_t _fself, kk_box_t _b_3208, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_integer_t _x3837;
  kk_char_t _x3838 = kk_char_unbox(_b_3208, _ctx); /*char*/
  _x3837 = kk_std_text_parse__mlift2426_pint(_x3838, _ctx); /*int*/
  return kk_integer_box(_x3837);
}


// lift anonymous function
struct kk_std_text_parse_pint_fun3840__t {
  struct kk_function_s _base;
  bool neg;
};
static kk_box_t kk_std_text_parse_pint_fun3840(kk_function_t _fself, kk_box_t _b_3210, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_pint_fun3840(bool neg, kk_context_t* _ctx) {
  struct kk_std_text_parse_pint_fun3840__t* _self = kk_function_alloc_as(struct kk_std_text_parse_pint_fun3840__t, 1, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_pint_fun3840, kk_context());
  _self->neg = neg;
  return &_self->_base;
}

static kk_box_t kk_std_text_parse_pint_fun3840(kk_function_t _fself, kk_box_t _b_3210, kk_context_t* _ctx) {
  struct kk_std_text_parse_pint_fun3840__t* _self = kk_function_as(struct kk_std_text_parse_pint_fun3840__t*, _fself);
  bool neg = _self->neg; /* bool */
  kk_drop_match(_self, {;}, {}, _ctx)
  kk_integer_t i_3213 = kk_integer_unbox(_b_3210); /*int*/;
  kk_integer_t _x3841;
  if (neg) {
    _x3841 = kk_integer_neg(i_3213,kk_context()); /*int*/
  }
  else {
    _x3841 = i_3213; /*int*/
  }
  return kk_integer_box(_x3841);
}

kk_integer_t kk_std_text_parse_pint(kk_context_t* _ctx) { /* () -> parse int */ 
  kk_char_t x_2550;
  kk_box_t _x3821 = kk_std_text_parse__lp__bar__bar__rp_(kk_std_text_parse_new_pint_fun3822(_ctx), kk_std_text_parse_new_pint_fun3834(_ctx), _ctx); /*944*/
  x_2550 = kk_char_unbox(_x3821, _ctx); /*char*/
  if (kk_yielding(kk_context())) {
    kk_box_t _x3835 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_pint_fun3836(_ctx), _ctx); /*3926*/
    return kk_integer_unbox(_x3835);
  }
  {
    bool neg = (x_2550 == ('-')); /*bool*/;
    kk_integer_t x0_2553 = kk_std_text_parse_pnat(_ctx); /*int*/;
    if (kk_yielding(kk_context())) {
      kk_integer_drop(x0_2553, _ctx);
      kk_box_t _x3839 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_pint_fun3840(neg, _ctx), _ctx); /*3926*/
      return kk_integer_unbox(_x3839);
    }
    if (neg) {
      return kk_integer_neg(x0_2553,kk_context());
    }
    {
      return x0_2553;
    }
  }
}


// lift anonymous function
struct kk_std_text_parse_pstring_fun3844__t {
  struct kk_function_s _base;
  kk_string_t s;
};
static kk_std_core_types__maybe kk_std_text_parse_pstring_fun3844(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_pstring_fun3844(kk_string_t s, kk_context_t* _ctx) {
  struct kk_std_text_parse_pstring_fun3844__t* _self = kk_function_alloc_as(struct kk_std_text_parse_pstring_fun3844__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_text_parse_pstring_fun3844, kk_context());
  _self->s = s;
  return &_self->_base;
}

static kk_std_core_types__maybe kk_std_text_parse_pstring_fun3844(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  struct kk_std_text_parse_pstring_fun3844__t* _self = kk_function_as(struct kk_std_text_parse_pstring_fun3844__t*, _fself);
  kk_string_t s = _self->s; /* string */
  kk_drop_match(_self, {kk_string_dup(s);}, {}, _ctx)
  kk_std_core_types__maybe _match_3288;
  kk_std_core__list _x3845;
  kk_string_t _x3846 = kk_string_dup(s); /*string*/
  _x3845 = kk_std_core_list_6(_x3846, _ctx); /*list<char>*/
  _match_3288 = kk_std_text_parse_next_match(slice, _x3845, _ctx); /*maybe<sslice>*/
  if (kk_std_core_types__is_Just(_match_3288)) {
    kk_box_t _box_x3214 = _match_3288._cons.Just.value;
    kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x3214, NULL);
    kk_std_core__sslice_dup(rest0);
    kk_std_core_types__maybe_drop(_match_3288, _ctx);
    kk_box_t _x3848;
    kk_std_core_types__tuple2_ _x3849 = kk_std_core_types__new_dash__lp__comma__rp_(kk_string_box(s), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
    _x3848 = kk_std_core_types__tuple2__box(_x3849, _ctx); /*107*/
    return kk_std_core_types__new_Just(_x3848, _ctx);
  }
  {
    kk_string_drop(s, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}

kk_string_t kk_std_text_parse_pstring(kk_string_t s, kk_context_t* _ctx) { /* (s : string) -> parse string */ 
  kk_box_t _x3842;
  kk_string_t _x3843 = kk_string_dup(s); /*string*/
  _x3842 = kk_std_text_parse_satisfy_fail(_x3843, kk_std_text_parse_new_pstring_fun3844(s, _ctx), _ctx); /*542*/
  return kk_string_unbox(_x3842);
}

kk_std_core_types__maybe kk_std_text_parse_starts_with(kk_string_t s, kk_function_t p, kk_context_t* _ctx) { /* forall<a> (s : string, p : () -> parse a) -> maybe<(a, sslice)> */ 
  kk_std_text_parse__parse_error _match_3287;
  kk_std_core__sslice _x3850;
  kk_string_t _x3851 = kk_string_dup(s); /*string*/
  kk_ssize_t _x3852 = (KK_IZ(0)); /*ssize_t*/
  kk_ssize_t _x3853 = kk_string_len(s,kk_context()); /*ssize_t*/
  _x3850 = kk_std_core__new_Sslice(_x3851, _x3852, _x3853, _ctx); /*sslice*/
  _match_3287 = kk_std_text_parse_parse(_x3850, p, _ctx); /*std/text/parse/parse-error<2020>*/
  if (kk_std_text_parse__is_ParseOk(_match_3287)) {
    struct kk_std_text_parse_ParseOk* _con3854 = kk_std_text_parse__as_ParseOk(_match_3287);
    kk_box_t x = _con3854->result;
    kk_std_core__sslice rest0 = _con3854->rest;
    if (kk_likely(kk_std_text_parse__parse_error_is_unique(_match_3287))) {
      kk_std_text_parse__parse_error_free(_match_3287, _ctx);
    }
    else {
      kk_std_core__sslice_dup(rest0);
      kk_box_dup(x);
      kk_std_text_parse__parse_error_decref(_match_3287, _ctx);
    }
    kk_box_t _x3855;
    kk_std_core_types__tuple2_ _x3856 = kk_std_core_types__new_dash__lp__comma__rp_(x, kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
    _x3855 = kk_std_core_types__tuple2__box(_x3856, _ctx); /*107*/
    return kk_std_core_types__new_Just(_x3855, _ctx);
  }
  {
    kk_std_text_parse__parse_error_drop(_match_3287, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_white_fun3860__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_white_fun3860(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_white_fun3860(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_white_fun3860, _ctx)
  return kk_function_dup(_fself);
}

static kk_std_core_types__maybe kk_std_text_parse_white_fun3860(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__maybe _match_3286 = kk_std_core_next(slice, _ctx); /*maybe<(char, sslice)>*/;
  if (kk_std_core_types__is_Just(_match_3286)) {
    kk_box_t _box_x3231 = _match_3286._cons.Just.value;
    kk_std_core_types__tuple2_ _pat0 = kk_std_core_types__tuple2__unbox(_box_x3231, NULL);
    if (kk_std_core_types__is_dash__lp__comma__rp_(_pat0)) {
      kk_box_t _box_x3232 = _pat0.fst;
      kk_box_t _box_x3233 = _pat0.snd;
      kk_char_t c = kk_char_unbox(_box_x3232, NULL);
      kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x3233, NULL);
      if (kk_std_core_is_white(c, _ctx)) {
        kk_std_core__sslice_dup(rest0);
        kk_std_core_types__maybe_drop(_match_3286, _ctx);
        kk_box_t _x3864;
        kk_std_core_types__tuple2_ _x3865 = kk_std_core_types__new_dash__lp__comma__rp_(kk_char_box(c, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
        _x3864 = kk_std_core_types__tuple2__box(_x3865, _ctx); /*107*/
        return kk_std_core_types__new_Just(_x3864, _ctx);
      }
    }
  }
  {
    kk_std_core_types__maybe_drop(_match_3286, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}

kk_char_t kk_std_text_parse_white(kk_context_t* _ctx) { /* () -> parse char */ 
  kk_box_t _x3857;
  kk_string_t _x3858 = kk_string_empty(); /*string*/
  _x3857 = kk_std_text_parse_satisfy_fail(_x3858, kk_std_text_parse_new_white_fun3860(_ctx), _ctx); /*542*/
  return kk_char_unbox(_x3857, _ctx);
}


// lift anonymous function
struct kk_std_text_parse_whitespace_fun3869__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_whitespace_fun3869(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_whitespace_fun3869(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_whitespace_fun3869, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_text_parse_whitespace_fun3871__t {
  struct kk_function_s _base;
};
static bool kk_std_text_parse_whitespace_fun3871(kk_function_t _fself, kk_char_t _x13870, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_whitespace_fun3871(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_whitespace_fun3871, _ctx)
  return kk_function_dup(_fself);
}

static bool kk_std_text_parse_whitespace_fun3871(kk_function_t _fself, kk_char_t _x13870, kk_context_t* _ctx) {
  kk_unused(_fself);
  return kk_std_core_is_white(_x13870, _ctx);
}
static kk_std_core_types__maybe kk_std_text_parse_whitespace_fun3869(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__tuple2_ _match_3285 = kk_std_text_parse_next_while0(slice, kk_std_text_parse_new_whitespace_fun3871(_ctx), kk_std_core__new_Nil(_ctx), _ctx); /*(list<char>, sslice)*/;
  {
    kk_box_t _box_x3244 = _match_3285.fst;
    kk_box_t _box_x3245 = _match_3285.snd;
    kk_std_core__list _pat00 = kk_std_core__list_unbox(_box_x3244, NULL);
    kk_std_core__sslice _pat10 = kk_std_core__sslice_unbox(_box_x3245, NULL);
    if (kk_std_core__is_Nil(_pat00)) {
      kk_std_core_types__tuple2__drop(_match_3285, _ctx);
      return kk_std_core_types__new_Nothing(_ctx);
    }
  }
  {
    kk_box_t _box_x3246 = _match_3285.fst;
    kk_box_t _box_x3247 = _match_3285.snd;
    kk_std_core__list xs = kk_std_core__list_unbox(_box_x3246, NULL);
    kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x3247, NULL);
    kk_std_core__sslice_dup(rest0);
    kk_std_core__list_dup(xs);
    kk_std_core_types__tuple2__drop(_match_3285, _ctx);
    kk_box_t _x3876;
    kk_std_core_types__tuple2_ _x3877 = kk_std_core_types__new_dash__lp__comma__rp_(kk_std_core__list_box(xs, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
    _x3876 = kk_std_core_types__tuple2__box(_x3877, _ctx); /*107*/
    return kk_std_core_types__new_Just(_x3876, _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_whitespace_fun3879__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_whitespace_fun3879(kk_function_t _fself, kk_box_t _b_3259, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_whitespace_fun3879(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_whitespace_fun3879, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_whitespace_fun3879(kk_function_t _fself, kk_box_t _b_3259, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x3880;
  kk_std_core__list _x3881 = kk_std_core__list_unbox(_b_3259, _ctx); /*list<char>*/
  _x3880 = kk_std_core_string_2(_x3881, _ctx); /*string*/
  return kk_string_box(_x3880);
}

kk_string_t kk_std_text_parse_whitespace(kk_context_t* _ctx) { /* () -> parse string */ 
  kk_std_core__list x_2558;
  kk_box_t _x3866;
  kk_string_t _x3867 = kk_string_empty(); /*string*/
  _x3866 = kk_std_text_parse_satisfy_fail(_x3867, kk_std_text_parse_new_whitespace_fun3869(_ctx), _ctx); /*542*/
  x_2558 = kk_std_core__list_unbox(_x3866, _ctx); /*list<char>*/
  if (kk_yielding(kk_context())) {
    kk_std_core__list_drop(x_2558, _ctx);
    kk_box_t _x3878 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_whitespace_fun3879(_ctx), _ctx); /*3926*/
    return kk_string_unbox(_x3878);
  }
  {
    return kk_std_core_string_2(x_2558, _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_whitespace0_fun3883__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_whitespace0_fun3883(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_whitespace0_fun3883(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_whitespace0_fun3883, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_text_parse_whitespace0_fun3887__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_text_parse_whitespace0_fun3887(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_whitespace0_fun3887(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_whitespace0_fun3887, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_text_parse_whitespace0_fun3889__t {
  struct kk_function_s _base;
};
static bool kk_std_text_parse_whitespace0_fun3889(kk_function_t _fself, kk_char_t _x13888, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_whitespace0_fun3889(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_whitespace0_fun3889, _ctx)
  return kk_function_dup(_fself);
}

static bool kk_std_text_parse_whitespace0_fun3889(kk_function_t _fself, kk_char_t _x13888, kk_context_t* _ctx) {
  kk_unused(_fself);
  return kk_std_core_is_white(_x13888, _ctx);
}
static kk_std_core_types__maybe kk_std_text_parse_whitespace0_fun3887(kk_function_t _fself, kk_std_core__sslice slice, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__tuple2_ _match_3283 = kk_std_text_parse_next_while0(slice, kk_std_text_parse_new_whitespace0_fun3889(_ctx), kk_std_core__new_Nil(_ctx), _ctx); /*(list<char>, sslice)*/;
  {
    kk_box_t _box_x3261 = _match_3283.fst;
    kk_box_t _box_x3262 = _match_3283.snd;
    kk_std_core__list _pat00 = kk_std_core__list_unbox(_box_x3261, NULL);
    kk_std_core__sslice _pat10 = kk_std_core__sslice_unbox(_box_x3262, NULL);
    if (kk_std_core__is_Nil(_pat00)) {
      kk_std_core_types__tuple2__drop(_match_3283, _ctx);
      return kk_std_core_types__new_Nothing(_ctx);
    }
  }
  {
    kk_box_t _box_x3263 = _match_3283.fst;
    kk_box_t _box_x3264 = _match_3283.snd;
    kk_std_core__list xs = kk_std_core__list_unbox(_box_x3263, NULL);
    kk_std_core__sslice rest0 = kk_std_core__sslice_unbox(_box_x3264, NULL);
    kk_std_core__sslice_dup(rest0);
    kk_std_core__list_dup(xs);
    kk_std_core_types__tuple2__drop(_match_3283, _ctx);
    kk_box_t _x3894;
    kk_std_core_types__tuple2_ _x3895 = kk_std_core_types__new_dash__lp__comma__rp_(kk_std_core__list_box(xs, _ctx), kk_std_core__sslice_box(rest0, _ctx), _ctx); /*(6, 7)*/
    _x3894 = kk_std_core_types__tuple2__box(_x3895, _ctx); /*107*/
    return kk_std_core_types__new_Just(_x3894, _ctx);
  }
}


// lift anonymous function
struct kk_std_text_parse_whitespace0_fun3898__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_whitespace0_fun3898(kk_function_t _fself, kk_box_t _b_3276, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_whitespace0_fun3898(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_whitespace0_fun3898, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_whitespace0_fun3898(kk_function_t _fself, kk_box_t _b_3276, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x3899;
  kk_std_core__list _x3900 = kk_std_core__list_unbox(_b_3276, _ctx); /*list<char>*/
  _x3899 = kk_std_core_string_2(_x3900, _ctx); /*string*/
  return kk_string_box(_x3899);
}
static kk_box_t kk_std_text_parse_whitespace0_fun3883(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core__list x_2560;
  kk_box_t _x3884;
  kk_string_t _x3885 = kk_string_empty(); /*string*/
  _x3884 = kk_std_text_parse_satisfy_fail(_x3885, kk_std_text_parse_new_whitespace0_fun3887(_ctx), _ctx); /*542*/
  x_2560 = kk_std_core__list_unbox(_x3884, _ctx); /*list<char>*/
  kk_string_t _x3896;
  if (kk_yielding(kk_context())) {
    kk_std_core__list_drop(x_2560, _ctx);
    kk_box_t _x3897 = kk_std_core_hnd_yield_extend(kk_std_text_parse_new_whitespace0_fun3898(_ctx), _ctx); /*3926*/
    _x3896 = kk_string_unbox(_x3897); /*string*/
  }
  else {
    _x3896 = kk_std_core_string_2(x_2560, _ctx); /*string*/
  }
  return kk_string_box(_x3896);
}


// lift anonymous function
struct kk_std_text_parse_whitespace0_fun3901__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_text_parse_whitespace0_fun3901(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_text_parse_new_whitespace0_fun3901(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_text_parse_whitespace0_fun3901, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_text_parse_whitespace0_fun3901(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x3902 = kk_string_empty(); /*string*/
  return kk_string_box(_x3902);
}

kk_string_t kk_std_text_parse_whitespace0(kk_context_t* _ctx) { /* () -> parse string */ 
  kk_box_t _x3882 = kk_std_text_parse__lp__bar__bar__rp_(kk_std_text_parse_new_whitespace0_fun3883(_ctx), kk_std_text_parse_new_whitespace0_fun3901(_ctx), _ctx); /*944*/
  return kk_string_unbox(_x3882);
}

// initialization
void kk_std_text_parse__init(kk_context_t* _ctx){
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
    kk_string_t _x3384;
    kk_define_string_literal(, _s3385, 11, "parse.parse")
    _x3384 = kk_string_dup(_s3385); /*string*/
    kk_std_text_parse__tag_parse = kk_std_core_hnd__new_Htag(_x3384, _ctx); /*std/core/hnd/htag<std/text/parse/.hnd-parse>*/
  }
}

// termination
void kk_std_text_parse__done(kk_context_t* _ctx){
  static bool _kk_done = false;
  if (_kk_done) return;
  _kk_done = true;
  #if defined(KK_CUSTOM_DONE)
    KK_CUSTOM_DONE (_ctx);
  #endif
  kk_std_core_hnd__htag_drop(kk_std_text_parse__tag_parse, _ctx);
  kk_std_core__done(_ctx);
  kk_std_core_hnd__done(_ctx);
  kk_std_core_types__done(_ctx);
}
