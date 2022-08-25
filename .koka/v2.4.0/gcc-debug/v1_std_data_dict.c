// Koka generated module: "v1/std/data/dict", koka version: 2.4.0, platform: 64-bit
#include "v1_std_data_dict.h"

kk_v1_std_data_dict__dict kk_v1_std_data_dict_dict_copy(kk_v1_std_data_dict__dict d, kk_context_t* _ctx) { /* forall<a> (d : dict<a>) -> dict<a> */ 
  return kk_unsupported_external("v1/std/data/dict/.extern-dict-copy");
}
 
// Return the keys in a dictionary

kk_vector_t kk_v1_std_data_dict_keys(kk_v1_std_data_dict__mdict d, kk_context_t* _ctx) { /* forall<a,h> (d : mdict<h,a>) -> (read<h>) vector<string> */ 
  return kk_unsupported_external("v1/std/data/dict/.extern-keys");
}
 
// Return the keys in a

kk_vector_t kk_v1_std_data_dict_keys_1(kk_v1_std_data_dict__dict d, kk_context_t* _ctx) { /* forall<a> (d : dict<a>) -> vector<string> */ 
  return kk_unsupported_external("v1/std/data/dict/.extern-keys.1");
}

kk_box_t kk_v1_std_data_dict_unsafe_dict_get(kk_v1_std_data_dict__dict d, kk_string_t key, kk_context_t* _ctx) { /* forall<a> (d : dict<a>, key : string) -> a */ 
  return kk_unsupported_external("v1/std/data/dict/.extern-unsafe-dict-get");
}

kk_unit_t kk_v1_std_data_dict_unsafe_dict_add(kk_v1_std_data_dict__dict d, kk_string_t key, kk_box_t value, kk_context_t* _ctx) { /* forall<a> (d : dict<a>, key : string, value : a) -> () */ 
  kk_unsupported_external("v1/std/data/dict/.extern-unsafe-dict-add"); return kk_Unit;
}

bool kk_v1_std_data_dict_contains_key(kk_v1_std_data_dict__mdict md, kk_string_t s, kk_context_t* _ctx) { /* forall<a,h> (md : mdict<h,a>, s : string) -> (read<h>) bool */ 
  return kk_unsupported_external("v1/std/data/dict/.extern-contains-key");
}

bool kk_v1_std_data_dict_contains_key_1(kk_v1_std_data_dict__dict d, kk_string_t key, kk_context_t* _ctx) { /* forall<a> (d : dict<a>, key : string) -> bool */ 
  return kk_unsupported_external("v1/std/data/dict/.extern-contains-key.1");
}

kk_box_t kk_v1_std_data_dict_unsafe_index(kk_v1_std_data_dict__mdict md, kk_string_t s, kk_context_t* _ctx) { /* forall<a,h> (md : mdict<h,a>, s : string) -> (read<h>) a */ 
  return kk_unsupported_external("v1/std/data/dict/.extern-unsafe-index");
}

kk_unit_t kk_v1_std_data_dict_clear(kk_v1_std_data_dict__mdict md, kk_context_t* _ctx) { /* forall<a,h> (md : mdict<h,a>) -> (write<h>) () */ 
  kk_unsupported_external("v1/std/data/dict/.extern-clear"); return kk_Unit;
}

kk_v1_std_data_dict__mdict kk_v1_std_data_dict_copy(kk_v1_std_data_dict__mdict md, kk_context_t* _ctx) { /* forall<h,a> (md : mdict<h,a>) -> <alloc<h>,read<h>> mdict<h,a> */ 
  return kk_unsupported_external("v1/std/data/dict/.extern-copy");
}

kk_integer_t kk_v1_std_data_dict_count(kk_v1_std_data_dict__mdict md, kk_context_t* _ctx) { /* forall<a,h> (md : mdict<h,a>) -> int */ 
  return kk_unsupported_external("v1/std/data/dict/.extern-count");
}
 
// Freeze a mutable dictionary into a `:dict`

kk_v1_std_data_dict__dict kk_v1_std_data_dict_freeze(kk_v1_std_data_dict__mdict md, kk_context_t* _ctx) { /* forall<h,a> (md : mdict<h,a>) -> <alloc<h>,read<h>> dict<a> */ 
  return kk_unsupported_external("v1/std/data/dict/.extern-freeze");
}
 
// Create a mutable string dictionary

kk_v1_std_data_dict__mdict kk_v1_std_data_dict_mdict(kk_context_t* _ctx) { /* forall<h,a> () -> (alloc<h>) mdict<h,a> */ 
  return kk_unsupported_external("v1/std/data/dict/.extern-mdict");
}

kk_unit_t kk_v1_std_data_dict_remove(kk_v1_std_data_dict__mdict md, kk_string_t s, kk_context_t* _ctx) { /* forall<a,h> (md : mdict<h,a>, s : string) -> <read<h>,write<h>> () */ 
  kk_unsupported_external("v1/std/data/dict/.extern-remove"); return kk_Unit;
}
 
// Execute action for each key/value pair in a dictionary until
// the action returns `Just`.


// lift anonymous function
struct kk_v1_std_data_dict_foreach_while_fun2645__t {
  struct kk_function_s _base;
  kk_function_t action;
  kk_v1_std_data_dict__dict d;
};
static kk_std_core_types__maybe kk_v1_std_data_dict_foreach_while_fun2645(kk_function_t _fself, kk_box_t _b_2508, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_foreach_while_fun2645(kk_function_t action, kk_v1_std_data_dict__dict d, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_foreach_while_fun2645__t* _self = kk_function_alloc_as(struct kk_v1_std_data_dict_foreach_while_fun2645__t, 3, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict_foreach_while_fun2645, kk_context());
  _self->action = action;
  _self->d = d;
  return &_self->_base;
}

static kk_std_core_types__maybe kk_v1_std_data_dict_foreach_while_fun2645(kk_function_t _fself, kk_box_t _b_2508, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_foreach_while_fun2645__t* _self = kk_function_as(struct kk_v1_std_data_dict_foreach_while_fun2645__t*, _fself);
  kk_function_t action = _self->action; /* (string, 767) -> 769 maybe<768> */
  kk_v1_std_data_dict__dict d = _self->d; /* v1/std/data/dict/dict<767> */
  kk_drop_match(_self, {kk_function_dup(action);kk_v1_std_data_dict__dict_dup(d);}, {}, _ctx)
  kk_string_t _x2646;
  kk_box_t _x2647 = kk_box_dup(_b_2508); /*1001*/
  _x2646 = kk_string_unbox(_x2647); /*string*/
  kk_box_t _x2648;
  kk_string_t _x2649 = kk_string_unbox(_b_2508); /*string*/
  _x2648 = kk_v1_std_data_dict_unsafe_dict_get(d, _x2649, _ctx); /*445*/
  return kk_function_call(kk_std_core_types__maybe, (kk_function_t, kk_string_t, kk_box_t, kk_context_t*), action, (action, _x2646, _x2648, _ctx));
}

kk_std_core_types__maybe kk_v1_std_data_dict_foreach_while(kk_v1_std_data_dict__dict d, kk_function_t action, kk_context_t* _ctx) { /* forall<a,b,e> (d : dict<a>, action : (string, a) -> e maybe<b>) -> e maybe<b> */ 
  kk_vector_t _b_2509_2506;
  kk_v1_std_data_dict__dict _x2644 = kk_v1_std_data_dict__dict_dup(d); /*v1/std/data/dict/dict<767>*/
  _b_2509_2506 = kk_v1_std_data_dict_keys_1(_x2644, _ctx); /*vector<string>*/
  return kk_std_core_foreach_while_3(_b_2509_2506, kk_v1_std_data_dict_new_foreach_while_fun2645(action, d, _ctx), _ctx);
}
 
// Execute action for each key/value pair in a dictionary.


// lift anonymous function
struct kk_v1_std_data_dict_foreach_fun2651__t {
  struct kk_function_s _base;
  kk_function_t action;
  kk_v1_std_data_dict__dict d;
};
static kk_std_core_types__maybe kk_v1_std_data_dict_foreach_fun2651(kk_function_t _fself, kk_box_t _b_2516, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_foreach_fun2651(kk_function_t action, kk_v1_std_data_dict__dict d, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_foreach_fun2651__t* _self = kk_function_alloc_as(struct kk_v1_std_data_dict_foreach_fun2651__t, 3, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict_foreach_fun2651, kk_context());
  _self->action = action;
  _self->d = d;
  return &_self->_base;
}



// lift anonymous function
struct kk_v1_std_data_dict_foreach_fun2656__t {
  struct kk_function_s _base;
};
static kk_box_t kk_v1_std_data_dict_foreach_fun2656(kk_function_t _fself, kk_box_t _b_2513, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_foreach_fun2656(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_v1_std_data_dict_foreach_fun2656, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_v1_std_data_dict_foreach_fun2656(kk_function_t _fself, kk_box_t _b_2513, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_box_drop(_b_2513, _ctx);
  return kk_std_core_types__maybe_box(kk_std_core_types__new_Nothing(_ctx), _ctx);
}
static kk_std_core_types__maybe kk_v1_std_data_dict_foreach_fun2651(kk_function_t _fself, kk_box_t _b_2516, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_foreach_fun2651__t* _self = kk_function_as(struct kk_v1_std_data_dict_foreach_fun2651__t*, _fself);
  kk_function_t action = _self->action; /* (string, 880) -> 881 () */
  kk_v1_std_data_dict__dict d = _self->d; /* v1/std/data/dict/dict<880> */
  kk_drop_match(_self, {kk_function_dup(action);kk_v1_std_data_dict__dict_dup(d);}, {}, _ctx)
  kk_box_t x_2469;
  kk_string_t _x2652;
  kk_box_t _x2653 = kk_box_dup(_b_2516); /*1001*/
  _x2652 = kk_string_unbox(_x2653); /*string*/
  x_2469 = kk_v1_std_data_dict_unsafe_dict_get(d, _x2652, _ctx); /*880*/
  kk_unit_t x0_2487 = kk_Unit;
  kk_string_t _x2654 = kk_string_unbox(_b_2516); /*string*/
  kk_function_call(kk_unit_t, (kk_function_t, kk_string_t, kk_box_t, kk_context_t*), action, (action, _x2654, x_2469, _ctx));
  if (kk_yielding(kk_context())) {
    kk_box_t _x2655 = kk_std_core_hnd_yield_extend(kk_v1_std_data_dict_new_foreach_fun2656(_ctx), _ctx); /*1001*/
    return kk_std_core_types__maybe_unbox(_x2655, _ctx);
  }
  {
    return kk_std_core_types__new_Nothing(_ctx);
  }
}


// lift anonymous function
struct kk_v1_std_data_dict_foreach_fun2658__t {
  struct kk_function_s _base;
};
static kk_box_t kk_v1_std_data_dict_foreach_fun2658(kk_function_t _fself, kk_box_t _b_2523, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_foreach_fun2658(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_v1_std_data_dict_foreach_fun2658, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_v1_std_data_dict_foreach_fun2658(kk_function_t _fself, kk_box_t _b_2523, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_core_types__maybe wild__00_2525 = kk_std_core_types__maybe_unbox(_b_2523, _ctx); /*maybe<_864>*/;
  kk_std_core_types__maybe_drop(wild__00_2525, _ctx);
  return kk_unit_box(kk_Unit);
}

kk_unit_t kk_v1_std_data_dict_foreach(kk_v1_std_data_dict__dict d, kk_function_t action, kk_context_t* _ctx) { /* forall<a,e> (d : dict<a>, action : (string, a) -> e ()) -> e () */ 
  kk_vector_t _b_2517_2514;
  kk_v1_std_data_dict__dict _x2650 = kk_v1_std_data_dict__dict_dup(d); /*v1/std/data/dict/dict<880>*/
  _b_2517_2514 = kk_v1_std_data_dict_keys_1(_x2650, _ctx); /*vector<string>*/
  kk_std_core_types__maybe x_2484 = kk_std_core_foreach_while_3(_b_2517_2514, kk_v1_std_data_dict_new_foreach_fun2651(action, d, _ctx), _ctx); /*maybe<_864>*/;
  kk_std_core_types__maybe_drop(x_2484, _ctx);
  if (kk_yielding(kk_context())) {
    kk_box_t _x2657 = kk_std_core_hnd_yield_extend(kk_v1_std_data_dict_new_foreach_fun2658(_ctx), _ctx); /*1001*/
    kk_unit_unbox(_x2657); return kk_Unit;
  }
  {
    kk_Unit; return kk_Unit;
  }
}
 
// Append two dictionaries.


// lift anonymous function
struct kk_v1_std_data_dict__lp__plus__fun2661__t_rp_ {
  struct kk_function_s _base;
  kk_v1_std_data_dict__dict d2;
  kk_v1_std_data_dict__dict dnew;
};
static kk_std_core_types__maybe kk_v1_std_data_dict__lp__plus__fun2661_rp_(kk_function_t _fself, kk_box_t _b_2528, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_dash__plus__fun2661(kk_v1_std_data_dict__dict d2, kk_v1_std_data_dict__dict dnew, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict__lp__plus__fun2661__t_rp_* _self = kk_function_alloc_as(struct kk_v1_std_data_dict__lp__plus__fun2661__t_rp_, 3, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict__lp__plus__fun2661_rp_, kk_context());
  _self->d2 = d2;
  _self->dnew = dnew;
  return &_self->_base;
}

static kk_std_core_types__maybe kk_v1_std_data_dict__lp__plus__fun2661_rp_(kk_function_t _fself, kk_box_t _b_2528, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict__lp__plus__fun2661__t_rp_* _self = kk_function_as(struct kk_v1_std_data_dict__lp__plus__fun2661__t_rp_*, _fself);
  kk_v1_std_data_dict__dict d2 = _self->d2; /* v1/std/data/dict/dict<943> */
  kk_v1_std_data_dict__dict dnew = _self->dnew; /* v1/std/data/dict/dict<943> */
  kk_drop_match(_self, {kk_v1_std_data_dict__dict_dup(d2);kk_v1_std_data_dict__dict_dup(dnew);}, {}, _ctx)
  kk_box_t x_2471;
  kk_string_t _x2662;
  kk_box_t _x2663 = kk_box_dup(_b_2528); /*1001*/
  _x2662 = kk_string_unbox(_x2663); /*string*/
  x_2471 = kk_v1_std_data_dict_unsafe_dict_get(d2, _x2662, _ctx); /*943*/
  kk_unit_t __ = kk_Unit;
  kk_string_t _x2664 = kk_string_unbox(_b_2528); /*string*/
  kk_v1_std_data_dict_unsafe_dict_add(dnew, _x2664, x_2471, _ctx);
  return kk_std_core_types__new_Nothing(_ctx);
}

kk_v1_std_data_dict__dict kk_v1_std_data_dict__lp__plus__rp_(kk_v1_std_data_dict__dict d1, kk_v1_std_data_dict__dict d2, kk_context_t* _ctx) { /* forall<a> (d1 : dict<a>, d2 : dict<a>) -> dict<a> */ 
  kk_v1_std_data_dict__dict dnew = kk_v1_std_data_dict_dict_copy(d1, _ctx); /*v1/std/data/dict/dict<943>*/;
  kk_vector_t _b_2529_2526;
  kk_v1_std_data_dict__dict _x2659 = kk_v1_std_data_dict__dict_dup(d2); /*v1/std/data/dict/dict<943>*/
  _b_2529_2526 = kk_v1_std_data_dict_keys_1(_x2659, _ctx); /*vector<string>*/
  kk_std_core_types__maybe __0;
  kk_function_t _x2660;
  kk_v1_std_data_dict__dict_dup(dnew);
  _x2660 = kk_v1_std_data_dict_new_dash__plus__fun2661(d2, dnew, _ctx); /*(1001) -> 1003 (forall<a> maybe<a>)*/
  __0 = kk_std_core_foreach_while_3(_b_2529_2526, _x2660, _ctx); /*maybe<_864>*/
  kk_std_core_types__maybe_drop(__0, _ctx);
  return dnew;
}
 
// Index into a string dictionary

kk_std_core_types__maybe kk_v1_std_data_dict__lp__lb__rb__rp_(kk_v1_std_data_dict__mdict md, kk_string_t s, kk_context_t* _ctx) { /* forall<a,h> (md : mdict<h,a>, s : string) -> (read<h>) maybe<a> */ 
  bool _match_2641;
  kk_v1_std_data_dict__mdict _x2665 = kk_v1_std_data_dict__mdict_dup(md); /*v1/std/data/dict/mdict<999,998>*/
  kk_string_t _x2666 = kk_string_dup(s); /*string*/
  _match_2641 = kk_v1_std_data_dict_contains_key(_x2665, _x2666, _ctx); /*bool*/
  if (_match_2641) {
    kk_box_t _x2667 = kk_v1_std_data_dict_unsafe_index(md, s, _ctx); /*549*/
    return kk_std_core_types__new_Just(_x2667, _ctx);
  }
  {
    kk_string_drop(s, _ctx);
    kk_v1_std_data_dict__mdict_drop(md, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}
 
// Assign to a string dictionary

kk_unit_t kk_v1_std_data_dict__lp__lb__rb__1_rp_(kk_v1_std_data_dict__mdict md, kk_string_t s, kk_box_t assigned, kk_context_t* _ctx) { /* forall<a,h> (md : mdict<h,a>, s : string, assigned : a) -> (write<h>) () */ 
  kk_unsupported_external("v1/std/data/dict/.extern-[]"); return kk_Unit;
}
 
// Index into a string dictionary

kk_std_core_types__maybe kk_v1_std_data_dict__lp__lb__rb__2_rp_(kk_v1_std_data_dict__dict d, kk_string_t key, kk_context_t* _ctx) { /* forall<a> (d : dict<a>, key : string) -> maybe<a> */ 
  bool _match_2640;
  kk_v1_std_data_dict__dict _x2668 = kk_v1_std_data_dict__dict_dup(d); /*v1/std/data/dict/dict<1074>*/
  kk_string_t _x2669 = kk_string_dup(key); /*string*/
  _match_2640 = kk_v1_std_data_dict_contains_key_1(_x2668, _x2669, _ctx); /*bool*/
  if (_match_2640) {
    kk_box_t _x2670 = kk_v1_std_data_dict_unsafe_dict_get(d, key, _ctx); /*445*/
    return kk_std_core_types__new_Just(_x2670, _ctx);
  }
  {
    kk_string_drop(key, _ctx);
    kk_v1_std_data_dict__dict_drop(d, _ctx);
    return kk_std_core_types__new_Nothing(_ctx);
  }
}
 
// Create a new empty dictionary

kk_v1_std_data_dict__dict kk_v1_std_data_dict_dict(kk_context_t* _ctx) { /* forall<a> () -> dict<a> */ 
  return kk_unsupported_external("v1/std/data/dict/.extern-dict");
}
 
// Create a new dictionary from a `:list` of key value pairs.


// lift anonymous function
struct kk_v1_std_data_dict_dict_fun2672__t_1 {
  struct kk_function_s _base;
  kk_v1_std_data_dict__dict d;
};
static kk_unit_t kk_v1_std_data_dict_dict_fun2672_1(kk_function_t _fself, kk_box_t _b_2535, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_dict_fun2672_1(kk_v1_std_data_dict__dict d, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_dict_fun2672__t_1* _self = kk_function_alloc_as(struct kk_v1_std_data_dict_dict_fun2672__t_1, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict_dict_fun2672_1, kk_context());
  _self->d = d;
  return &_self->_base;
}

static kk_unit_t kk_v1_std_data_dict_dict_fun2672_1(kk_function_t _fself, kk_box_t _b_2535, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_dict_fun2672__t_1* _self = kk_function_as(struct kk_v1_std_data_dict_dict_fun2672__t_1*, _fself);
  kk_v1_std_data_dict__dict d = _self->d; /* v1/std/data/dict/dict<1187> */
  kk_drop_match(_self, {kk_v1_std_data_dict__dict_dup(d);}, {}, _ctx)
  kk_std_core_types__tuple2_ _match_2639 = kk_std_core_types__tuple2__unbox(_b_2535, _ctx); /*(string, 1187)*/;
  {
    kk_box_t _box_x2532 = _match_2639.fst;
    kk_box_t value = _match_2639.snd;
    kk_string_t key = kk_string_unbox(_box_x2532);
    kk_string_dup(key);
    kk_box_dup(value);
    kk_std_core_types__tuple2__drop(_match_2639, _ctx);
    return kk_v1_std_data_dict_unsafe_dict_add(d, key, value, _ctx);
  }
}

kk_v1_std_data_dict__dict kk_v1_std_data_dict_dict_1(kk_std_core__list elems, kk_context_t* _ctx) { /* forall<a> (elems : list<(string, a)>) -> dict<a> */ 
  kk_v1_std_data_dict__dict d = kk_v1_std_data_dict_dict(_ctx); /*v1/std/data/dict/dict<1187>*/;
  kk_unit_t __ = kk_Unit;
  kk_function_t _x2671;
  kk_v1_std_data_dict__dict_dup(d);
  _x2671 = kk_v1_std_data_dict_new_dict_fun2672_1(d, _ctx); /*(1001) -> 1002 ()*/
  kk_std_core_foreach(elems, _x2671, _ctx);
  return d;
}
 
// Create a new dictionary from a `:vector` of key/value pairs.


// lift anonymous function
struct kk_v1_std_data_dict_dict_fun2675__t_2 {
  struct kk_function_s _base;
  kk_v1_std_data_dict__dict d;
};
static kk_unit_t kk_v1_std_data_dict_dict_fun2675_2(kk_function_t _fself, kk_box_t _b_2542, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_dict_fun2675_2(kk_v1_std_data_dict__dict d, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_dict_fun2675__t_2* _self = kk_function_alloc_as(struct kk_v1_std_data_dict_dict_fun2675__t_2, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict_dict_fun2675_2, kk_context());
  _self->d = d;
  return &_self->_base;
}

static kk_unit_t kk_v1_std_data_dict_dict_fun2675_2(kk_function_t _fself, kk_box_t _b_2542, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_dict_fun2675__t_2* _self = kk_function_as(struct kk_v1_std_data_dict_dict_fun2675__t_2*, _fself);
  kk_v1_std_data_dict__dict d = _self->d; /* v1/std/data/dict/dict<1267> */
  kk_drop_match(_self, {kk_v1_std_data_dict__dict_dup(d);}, {}, _ctx)
  kk_std_core_types__tuple2_ _match_2638 = kk_std_core_types__tuple2__unbox(_b_2542, _ctx); /*(string, 1267)*/;
  {
    kk_box_t _box_x2539 = _match_2638.fst;
    kk_box_t value = _match_2638.snd;
    kk_string_t key = kk_string_unbox(_box_x2539);
    kk_string_dup(key);
    kk_box_dup(value);
    kk_std_core_types__tuple2__drop(_match_2638, _ctx);
    return kk_v1_std_data_dict_unsafe_dict_add(d, key, value, _ctx);
  }
}

kk_v1_std_data_dict__dict kk_v1_std_data_dict_dict_2(kk_vector_t elems, kk_context_t* _ctx) { /* forall<a> (elems : vector<(string, a)>) -> dict<a> */ 
  kk_v1_std_data_dict__dict d = kk_v1_std_data_dict_dict(_ctx); /*v1/std/data/dict/dict<1267>*/;
  kk_unit_t __ = kk_Unit;
  kk_function_t _x2674;
  kk_v1_std_data_dict__dict_dup(d);
  _x2674 = kk_v1_std_data_dict_new_dict_fun2675_2(d, _ctx); /*(1001) -> 1002 ()*/
  kk_std_core_foreach_3(elems, _x2674, _ctx);
  return d;
}
 
// monadic lift


// lift anonymous function
struct kk_v1_std_data_dict__mlift2483_map_fun2678__t {
  struct kk_function_s _base;
  kk_v1_std_data_dict__dict d;
};
static kk_unit_t kk_v1_std_data_dict__mlift2483_map_fun2678(kk_function_t _fself, kk_box_t _b_2553, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict__new_mlift2483_map_fun2678(kk_v1_std_data_dict__dict d, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict__mlift2483_map_fun2678__t* _self = kk_function_alloc_as(struct kk_v1_std_data_dict__mlift2483_map_fun2678__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict__mlift2483_map_fun2678, kk_context());
  _self->d = d;
  return &_self->_base;
}

static kk_unit_t kk_v1_std_data_dict__mlift2483_map_fun2678(kk_function_t _fself, kk_box_t _b_2553, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict__mlift2483_map_fun2678__t* _self = kk_function_as(struct kk_v1_std_data_dict__mlift2483_map_fun2678__t*, _fself);
  kk_v1_std_data_dict__dict d = _self->d; /* v1/std/data/dict/dict<1669> */
  kk_drop_match(_self, {kk_v1_std_data_dict__dict_dup(d);}, {}, _ctx)
  kk_std_core_types__tuple2_ _match_2637 = kk_std_core_types__tuple2__unbox(_b_2553, _ctx); /*(string, 1669)*/;
  {
    kk_box_t _box_x2550 = _match_2637.fst;
    kk_box_t value = _match_2637.snd;
    kk_string_t key = kk_string_unbox(_box_x2550);
    kk_string_dup(key);
    kk_box_dup(value);
    kk_std_core_types__tuple2__drop(_match_2637, _ctx);
    return kk_v1_std_data_dict_unsafe_dict_add(d, key, value, _ctx);
  }
}

kk_v1_std_data_dict__dict kk_v1_std_data_dict__mlift2483_map(kk_vector_t _y_2479, kk_context_t* _ctx) { /* forall<a,e> (vector<(string, a)>) -> e dict<a> */ 
  kk_v1_std_data_dict__dict d = kk_v1_std_data_dict_dict(_ctx); /*v1/std/data/dict/dict<1669>*/;
  kk_unit_t __ = kk_Unit;
  kk_function_t _x2677;
  kk_v1_std_data_dict__dict_dup(d);
  _x2677 = kk_v1_std_data_dict__new_mlift2483_map_fun2678(d, _ctx); /*(1001) -> 1002 ()*/
  kk_std_core_foreach_3(_y_2479, _x2677, _ctx);
  return d;
}
 
// Map a fun over the values in a dictionary.


// lift anonymous function
struct kk_v1_std_data_dict_map_fun2681__t {
  struct kk_function_s _base;
  kk_v1_std_data_dict__dict d;
  kk_function_t f;
};
static kk_box_t kk_v1_std_data_dict_map_fun2681(kk_function_t _fself, kk_box_t _b_2565, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_map_fun2681(kk_v1_std_data_dict__dict d, kk_function_t f, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_map_fun2681__t* _self = kk_function_alloc_as(struct kk_v1_std_data_dict_map_fun2681__t, 3, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict_map_fun2681, kk_context());
  _self->d = d;
  _self->f = f;
  return &_self->_base;
}



// lift anonymous function
struct kk_v1_std_data_dict_map_fun2687__t {
  struct kk_function_s _base;
  kk_string_t k_2573;
};
static kk_box_t kk_v1_std_data_dict_map_fun2687(kk_function_t _fself, kk_box_t _b_2560, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_map_fun2687(kk_string_t k_2573, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_map_fun2687__t* _self = kk_function_alloc_as(struct kk_v1_std_data_dict_map_fun2687__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict_map_fun2687, kk_context());
  _self->k_2573 = k_2573;
  return &_self->_base;
}

static kk_box_t kk_v1_std_data_dict_map_fun2687(kk_function_t _fself, kk_box_t _b_2560, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_map_fun2687__t* _self = kk_function_as(struct kk_v1_std_data_dict_map_fun2687__t*, _fself);
  kk_string_t k_2573 = _self->k_2573; /* string */
  kk_drop_match(_self, {kk_string_dup(k_2573);}, {}, _ctx)
  kk_std_core_types__tuple2_ _x2688 = kk_std_core_types__new_dash__lp__comma__rp_(kk_string_box(k_2573), _b_2560, _ctx); /*(1004, 1005)*/
  return kk_std_core_types__tuple2__box(_x2688, _ctx);
}
static kk_box_t kk_v1_std_data_dict_map_fun2681(kk_function_t _fself, kk_box_t _b_2565, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_map_fun2681__t* _self = kk_function_as(struct kk_v1_std_data_dict_map_fun2681__t*, _fself);
  kk_v1_std_data_dict__dict d = _self->d; /* v1/std/data/dict/dict<1668> */
  kk_function_t f = _self->f; /* (string, 1668) -> 1670 1669 */
  kk_drop_match(_self, {kk_v1_std_data_dict__dict_dup(d);kk_function_dup(f);}, {}, _ctx)
  kk_string_t k_2573 = kk_string_unbox(_b_2565); /*string*/;
  kk_box_t x0_2495;
  kk_string_t _x2682 = kk_string_dup(k_2573); /*string*/
  kk_box_t _x2683;
  kk_string_t _x2684 = kk_string_dup(k_2573); /*string*/
  _x2683 = kk_v1_std_data_dict_unsafe_dict_get(d, _x2684, _ctx); /*445*/
  x0_2495 = kk_function_call(kk_box_t, (kk_function_t, kk_string_t, kk_box_t, kk_context_t*), f, (f, _x2682, _x2683, _ctx)); /*1669*/
  kk_std_core_types__tuple2_ _x2685;
  if (kk_yielding(kk_context())) {
    kk_box_drop(x0_2495, _ctx);
    kk_box_t _x2686 = kk_std_core_hnd_yield_extend(kk_v1_std_data_dict_new_map_fun2687(k_2573, _ctx), _ctx); /*1001*/
    _x2685 = kk_std_core_types__tuple2__unbox(_x2686, _ctx); /*(string, 1669)*/
  }
  else {
    _x2685 = kk_std_core_types__new_dash__lp__comma__rp_(kk_string_box(k_2573), x0_2495, _ctx); /*(string, 1669)*/
  }
  return kk_std_core_types__tuple2__box(_x2685, _ctx);
}


// lift anonymous function
struct kk_v1_std_data_dict_map_fun2690__t {
  struct kk_function_s _base;
};
static kk_box_t kk_v1_std_data_dict_map_fun2690(kk_function_t _fself, kk_box_t _b_2583, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_map_fun2690(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_v1_std_data_dict_map_fun2690, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_v1_std_data_dict_map_fun2692__t {
  struct kk_function_s _base;
  kk_v1_std_data_dict__dict d0;
};
static kk_unit_t kk_v1_std_data_dict_map_fun2692(kk_function_t _fself, kk_box_t _b_2578, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_map_fun2692(kk_v1_std_data_dict__dict d0, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_map_fun2692__t* _self = kk_function_alloc_as(struct kk_v1_std_data_dict_map_fun2692__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict_map_fun2692, kk_context());
  _self->d0 = d0;
  return &_self->_base;
}

static kk_unit_t kk_v1_std_data_dict_map_fun2692(kk_function_t _fself, kk_box_t _b_2578, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_map_fun2692__t* _self = kk_function_as(struct kk_v1_std_data_dict_map_fun2692__t*, _fself);
  kk_v1_std_data_dict__dict d0 = _self->d0; /* v1/std/data/dict/dict<1669> */
  kk_drop_match(_self, {kk_v1_std_data_dict__dict_dup(d0);}, {}, _ctx)
  kk_std_core_types__tuple2_ _match_2635 = kk_std_core_types__tuple2__unbox(_b_2578, _ctx); /*(string, 1669)*/;
  {
    kk_box_t _box_x2575 = _match_2635.fst;
    kk_box_t value = _match_2635.snd;
    kk_string_t key = kk_string_unbox(_box_x2575);
    kk_string_dup(key);
    kk_box_dup(value);
    kk_std_core_types__tuple2__drop(_match_2635, _ctx);
    return kk_v1_std_data_dict_unsafe_dict_add(d0, key, value, _ctx);
  }
}
static kk_box_t kk_v1_std_data_dict_map_fun2690(kk_function_t _fself, kk_box_t _b_2583, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_vector_t _y_2592_2479 = kk_vector_unbox(_b_2583, _ctx); /*vector<(string, 1669)>*/;
  kk_v1_std_data_dict__dict d0 = kk_v1_std_data_dict_dict(_ctx); /*v1/std/data/dict/dict<1669>*/;
  kk_unit_t __ = kk_Unit;
  kk_function_t _x2691;
  kk_v1_std_data_dict__dict_dup(d0);
  _x2691 = kk_v1_std_data_dict_new_map_fun2692(d0, _ctx); /*(1001) -> 1002 ()*/
  kk_std_core_foreach_3(_y_2592_2479, _x2691, _ctx);
  return kk_v1_std_data_dict__dict_box(d0, _ctx);
}


// lift anonymous function
struct kk_v1_std_data_dict_map_fun2695__t {
  struct kk_function_s _base;
  kk_v1_std_data_dict__dict d1;
};
static kk_unit_t kk_v1_std_data_dict_map_fun2695(kk_function_t _fself, kk_box_t _b_2587, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_map_fun2695(kk_v1_std_data_dict__dict d1, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_map_fun2695__t* _self = kk_function_alloc_as(struct kk_v1_std_data_dict_map_fun2695__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict_map_fun2695, kk_context());
  _self->d1 = d1;
  return &_self->_base;
}

static kk_unit_t kk_v1_std_data_dict_map_fun2695(kk_function_t _fself, kk_box_t _b_2587, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_map_fun2695__t* _self = kk_function_as(struct kk_v1_std_data_dict_map_fun2695__t*, _fself);
  kk_v1_std_data_dict__dict d1 = _self->d1; /* v1/std/data/dict/dict<1669> */
  kk_drop_match(_self, {kk_v1_std_data_dict__dict_dup(d1);}, {}, _ctx)
  kk_std_core_types__tuple2_ _match_2634 = kk_std_core_types__tuple2__unbox(_b_2587, _ctx); /*(string, 1669)*/;
  {
    kk_box_t _box_x2584 = _match_2634.fst;
    kk_box_t value0 = _match_2634.snd;
    kk_string_t key0 = kk_string_unbox(_box_x2584);
    kk_string_dup(key0);
    kk_box_dup(value0);
    kk_std_core_types__tuple2__drop(_match_2634, _ctx);
    return kk_v1_std_data_dict_unsafe_dict_add(d1, key0, value0, _ctx);
  }
}

kk_v1_std_data_dict__dict kk_v1_std_data_dict_map(kk_v1_std_data_dict__dict d, kk_function_t f, kk_context_t* _ctx) { /* forall<a,b,e> (d : dict<a>, f : (string, a) -> e b) -> e dict<b> */ 
  kk_vector_t _b_2566_2563;
  kk_v1_std_data_dict__dict _x2680 = kk_v1_std_data_dict__dict_dup(d); /*v1/std/data/dict/dict<1668>*/
  _b_2566_2563 = kk_v1_std_data_dict_keys_1(_x2680, _ctx); /*vector<string>*/
  kk_vector_t x_2492 = kk_std_core_map_7(_b_2566_2563, kk_v1_std_data_dict_new_map_fun2681(d, f, _ctx), _ctx); /*vector<(string, 1669)>*/;
  if (kk_yielding(kk_context())) {
    kk_vector_drop(x_2492, _ctx);
    kk_box_t _x2689 = kk_std_core_hnd_yield_extend(kk_v1_std_data_dict_new_map_fun2690(_ctx), _ctx); /*1001*/
    return kk_v1_std_data_dict__dict_unbox(_x2689, _ctx);
  }
  {
    kk_v1_std_data_dict__dict d1 = kk_v1_std_data_dict_dict(_ctx); /*v1/std/data/dict/dict<1669>*/;
    kk_unit_t __0 = kk_Unit;
    kk_function_t _x2694;
    kk_v1_std_data_dict__dict_dup(d1);
    _x2694 = kk_v1_std_data_dict_new_map_fun2695(d1, _ctx); /*(1001) -> 1002 ()*/
    kk_std_core_foreach_3(x_2492, _x2694, _ctx);
    return d1;
  }
}
 
// Convert a dictionary to a vector of key/value pairs


// lift anonymous function
struct kk_v1_std_data_dict_vector_fun2698__t {
  struct kk_function_s _base;
  kk_v1_std_data_dict__mdict d;
};
static kk_box_t kk_v1_std_data_dict_vector_fun2698(kk_function_t _fself, kk_box_t _b_2597, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_vector_fun2698(kk_v1_std_data_dict__mdict d, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_vector_fun2698__t* _self = kk_function_alloc_as(struct kk_v1_std_data_dict_vector_fun2698__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict_vector_fun2698, kk_context());
  _self->d = d;
  return &_self->_base;
}

static kk_box_t kk_v1_std_data_dict_vector_fun2698(kk_function_t _fself, kk_box_t _b_2597, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_vector_fun2698__t* _self = kk_function_as(struct kk_v1_std_data_dict_vector_fun2698__t*, _fself);
  kk_v1_std_data_dict__mdict d = _self->d; /* v1/std/data/dict/mdict<1918,1917> */
  kk_drop_match(_self, {kk_v1_std_data_dict__mdict_dup(d);}, {}, _ctx)
  kk_string_t key_2602 = kk_string_unbox(_b_2597); /*string*/;
  kk_string_t _b_2600_2593 = kk_string_dup(key_2602); /*string*/;
  kk_box_t _b_2601_2594 = kk_v1_std_data_dict_unsafe_index(d, key_2602, _ctx); /*1917*/;
  kk_std_core_types__tuple2_ _x2699 = kk_std_core_types__new_dash__lp__comma__rp_(kk_string_box(_b_2600_2593), _b_2601_2594, _ctx); /*(1004, 1005)*/
  return kk_std_core_types__tuple2__box(_x2699, _ctx);
}

kk_vector_t kk_v1_std_data_dict_vector(kk_v1_std_data_dict__mdict d, kk_context_t* _ctx) { /* forall<a,h> (d : mdict<h,a>) -> (read<h>) vector<(string, a)> */ 
  kk_vector_t _b_2598_2595;
  kk_v1_std_data_dict__mdict _x2697 = kk_v1_std_data_dict__mdict_dup(d); /*v1/std/data/dict/mdict<1918,1917>*/
  _b_2598_2595 = kk_v1_std_data_dict_keys(_x2697, _ctx); /*vector<string>*/
  return kk_std_core_map_7(_b_2598_2595, kk_v1_std_data_dict_new_vector_fun2698(d, _ctx), _ctx);
}
 
// Convert a dictionary to a vector of key/value pairs


// lift anonymous function
struct kk_v1_std_data_dict_vector_fun2701__t_1 {
  struct kk_function_s _base;
  kk_v1_std_data_dict__dict d;
};
static kk_box_t kk_v1_std_data_dict_vector_fun2701_1(kk_function_t _fself, kk_box_t _b_2607, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_vector_fun2701_1(kk_v1_std_data_dict__dict d, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_vector_fun2701__t_1* _self = kk_function_alloc_as(struct kk_v1_std_data_dict_vector_fun2701__t_1, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict_vector_fun2701_1, kk_context());
  _self->d = d;
  return &_self->_base;
}

static kk_box_t kk_v1_std_data_dict_vector_fun2701_1(kk_function_t _fself, kk_box_t _b_2607, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_vector_fun2701__t_1* _self = kk_function_as(struct kk_v1_std_data_dict_vector_fun2701__t_1*, _fself);
  kk_v1_std_data_dict__dict d = _self->d; /* v1/std/data/dict/dict<2089> */
  kk_drop_match(_self, {kk_v1_std_data_dict__dict_dup(d);}, {}, _ctx)
  kk_string_t key_2612 = kk_string_unbox(_b_2607); /*string*/;
  kk_string_t _b_2610_2603 = kk_string_dup(key_2612); /*string*/;
  kk_box_t _b_2611_2604 = kk_v1_std_data_dict_unsafe_dict_get(d, key_2612, _ctx); /*2089*/;
  kk_std_core_types__tuple2_ _x2702 = kk_std_core_types__new_dash__lp__comma__rp_(kk_string_box(_b_2610_2603), _b_2611_2604, _ctx); /*(1004, 1005)*/
  return kk_std_core_types__tuple2__box(_x2702, _ctx);
}

kk_vector_t kk_v1_std_data_dict_vector_1(kk_v1_std_data_dict__dict d, kk_context_t* _ctx) { /* forall<a> (d : dict<a>) -> vector<(string, a)> */ 
  kk_vector_t _b_2608_2605;
  kk_v1_std_data_dict__dict _x2700 = kk_v1_std_data_dict__dict_dup(d); /*v1/std/data/dict/dict<2089>*/
  _b_2608_2605 = kk_v1_std_data_dict_keys_1(_x2700, _ctx); /*vector<string>*/
  return kk_std_core_map_7(_b_2608_2605, kk_v1_std_data_dict_new_vector_fun2701_1(d, _ctx), _ctx);
}
 
// Convert a dictionary to a list of key/value pairs


// lift anonymous function
struct kk_v1_std_data_dict_list_fun2704__t {
  struct kk_function_s _base;
  kk_v1_std_data_dict__mdict d;
};
static kk_box_t kk_v1_std_data_dict_list_fun2704(kk_function_t _fself, kk_box_t _b_2617, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_list_fun2704(kk_v1_std_data_dict__mdict d, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_list_fun2704__t* _self = kk_function_alloc_as(struct kk_v1_std_data_dict_list_fun2704__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict_list_fun2704, kk_context());
  _self->d = d;
  return &_self->_base;
}

static kk_box_t kk_v1_std_data_dict_list_fun2704(kk_function_t _fself, kk_box_t _b_2617, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_list_fun2704__t* _self = kk_function_as(struct kk_v1_std_data_dict_list_fun2704__t*, _fself);
  kk_v1_std_data_dict__mdict d = _self->d; /* v1/std/data/dict/mdict<2257,2256> */
  kk_drop_match(_self, {kk_v1_std_data_dict__mdict_dup(d);}, {}, _ctx)
  kk_box_t _b_2621_2614;
  kk_string_t _x2705;
  kk_box_t _x2706 = kk_box_dup(_b_2617); /*1001*/
  _x2705 = kk_string_unbox(_x2706); /*string*/
  _b_2621_2614 = kk_v1_std_data_dict_unsafe_index(d, _x2705, _ctx); /*2256*/
  kk_std_core_types__tuple2_ _x2707 = kk_std_core_types__new_dash__lp__comma__rp_(_b_2617, _b_2621_2614, _ctx); /*(1004, 1005)*/
  return kk_std_core_types__tuple2__box(_x2707, _ctx);
}

kk_std_core__list kk_v1_std_data_dict_list(kk_v1_std_data_dict__mdict d, kk_context_t* _ctx) { /* forall<a,h> (d : mdict<h,a>) -> (read<h>) list<(string, a)> */ 
  kk_vector_t _b_2618_2615;
  kk_v1_std_data_dict__mdict _x2703 = kk_v1_std_data_dict__mdict_dup(d); /*v1/std/data/dict/mdict<2257,2256>*/
  _b_2618_2615 = kk_v1_std_data_dict_keys(_x2703, _ctx); /*vector<string>*/
  kk_vector_t v_2464 = kk_std_core_map_7(_b_2618_2615, kk_v1_std_data_dict_new_list_fun2704(d, _ctx), _ctx); /*vector<(string, 2256)>*/;
  return kk_std_core_vlist(v_2464, kk_std_core_types__new_None(_ctx), _ctx);
}
 
// Convert a dictionary to a list of key/value pairs


// lift anonymous function
struct kk_v1_std_data_dict_list_fun2709__t_1 {
  struct kk_function_s _base;
  kk_v1_std_data_dict__dict d;
};
static kk_box_t kk_v1_std_data_dict_list_fun2709_1(kk_function_t _fself, kk_box_t _b_2627, kk_context_t* _ctx);
static kk_function_t kk_v1_std_data_dict_new_list_fun2709_1(kk_v1_std_data_dict__dict d, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_list_fun2709__t_1* _self = kk_function_alloc_as(struct kk_v1_std_data_dict_list_fun2709__t_1, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_v1_std_data_dict_list_fun2709_1, kk_context());
  _self->d = d;
  return &_self->_base;
}

static kk_box_t kk_v1_std_data_dict_list_fun2709_1(kk_function_t _fself, kk_box_t _b_2627, kk_context_t* _ctx) {
  struct kk_v1_std_data_dict_list_fun2709__t_1* _self = kk_function_as(struct kk_v1_std_data_dict_list_fun2709__t_1*, _fself);
  kk_v1_std_data_dict__dict d = _self->d; /* v1/std/data/dict/dict<2387> */
  kk_drop_match(_self, {kk_v1_std_data_dict__dict_dup(d);}, {}, _ctx)
  kk_box_t _b_2631_2624;
  kk_string_t _x2710;
  kk_box_t _x2711 = kk_box_dup(_b_2627); /*1001*/
  _x2710 = kk_string_unbox(_x2711); /*string*/
  _b_2631_2624 = kk_v1_std_data_dict_unsafe_dict_get(d, _x2710, _ctx); /*2387*/
  kk_std_core_types__tuple2_ _x2712 = kk_std_core_types__new_dash__lp__comma__rp_(_b_2627, _b_2631_2624, _ctx); /*(1004, 1005)*/
  return kk_std_core_types__tuple2__box(_x2712, _ctx);
}

kk_std_core__list kk_v1_std_data_dict_list_1(kk_v1_std_data_dict__dict d, kk_context_t* _ctx) { /* forall<a> (d : dict<a>) -> list<(string, a)> */ 
  kk_vector_t _b_2628_2625;
  kk_v1_std_data_dict__dict _x2708 = kk_v1_std_data_dict__dict_dup(d); /*v1/std/data/dict/dict<2387>*/
  _b_2628_2625 = kk_v1_std_data_dict_keys_1(_x2708, _ctx); /*vector<string>*/
  kk_vector_t v_2466 = kk_std_core_map_7(_b_2628_2625, kk_v1_std_data_dict_new_list_fun2709_1(d, _ctx), _ctx); /*vector<(string, 2387)>*/;
  return kk_std_core_vlist(v_2466, kk_std_core_types__new_None(_ctx), _ctx);
}

// initialization
void kk_v1_std_data_dict__init(kk_context_t* _ctx){
  static bool _kk_initialized = false;
  if (_kk_initialized) return;
  _kk_initialized = true;
  kk_std_core_types__init(_ctx);
  kk_std_core_hnd__init(_ctx);
  kk_std_core__init(_ctx);
  #if defined(KK_CUSTOM_INIT)
    KK_CUSTOM_INIT (_ctx);
  #endif
}

// termination
void kk_v1_std_data_dict__done(kk_context_t* _ctx){
  static bool _kk_done = false;
  if (_kk_done) return;
  _kk_done = true;
  #if defined(KK_CUSTOM_DONE)
    KK_CUSTOM_DONE (_ctx);
  #endif
  kk_std_core__done(_ctx);
  kk_std_core_hnd__done(_ctx);
  kk_std_core_types__done(_ctx);
}
