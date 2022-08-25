#pragma once
#ifndef kk_v1_std_data_dict_H
#define kk_v1_std_data_dict_H
// Koka generated module: "v1/std/data/dict", koka version: 2.4.0, platform: 64-bit
#include <kklib.h>
#include "std_core_types.h"
#include "std_core_hnd.h"
#include "std_core.h"

// type declarations

// type v1/std/data/dict/dict
struct kk_v1_std_data_dict__dict_s {
  kk_block_t _block;
};
typedef kk_datatype_t kk_v1_std_data_dict__dict;
static inline kk_v1_std_data_dict__dict kk_v1_std_data_dict__dict_dup(kk_v1_std_data_dict__dict _x) {
  return kk_datatype_dup(_x);
}
static inline void kk_v1_std_data_dict__dict_drop(kk_v1_std_data_dict__dict _x, kk_context_t* _ctx) {
  kk_datatype_drop(_x, _ctx);
}
static inline kk_v1_std_data_dict__dict kk_v1_std_data_dict__dict_hole() {
  return kk_datatype_from_tag((kk_tag_t)0);
}
static inline bool kk_v1_std_data_dict__dict_is_unique(kk_v1_std_data_dict__dict _x) {
  return kk_datatype_is_unique(_x);
}
static inline void kk_v1_std_data_dict__dict_free(kk_v1_std_data_dict__dict _x, kk_context_t* _ctx) {
  kk_datatype_free(_x, _ctx);
}
static inline void kk_v1_std_data_dict__dict_decref(kk_v1_std_data_dict__dict _x, kk_context_t* _ctx) {
  kk_datatype_decref(_x, _ctx);
}
static inline kk_reuse_t kk_v1_std_data_dict__dict_dropn_reuse(kk_v1_std_data_dict__dict _x, kk_ssize_t _scan_fsize, kk_context_t* _ctx) {
  return kk_datatype_dropn_reuse(_x, _scan_fsize, _ctx);
}
static inline void kk_v1_std_data_dict__dict_dropn(kk_v1_std_data_dict__dict _x, kk_ssize_t _scan_fsize, kk_context_t* _ctx) {
  kk_datatype_dropn(_x, _scan_fsize, _ctx);
}
static inline kk_reuse_t kk_v1_std_data_dict__dict_reuse(kk_v1_std_data_dict__dict _x) {
  return kk_datatype_reuse(_x);
}
static inline kk_box_t kk_v1_std_data_dict__dict_box(kk_v1_std_data_dict__dict _x, kk_context_t* _ctx) {
  return kk_datatype_box(_x);
}
static inline kk_v1_std_data_dict__dict kk_v1_std_data_dict__dict_unbox(kk_box_t _x, kk_context_t* _ctx) {
  return kk_datatype_unbox(_x);
}

// type v1/std/data/dict/mdict
struct kk_v1_std_data_dict__mdict_s {
  kk_block_t _block;
};
typedef kk_datatype_t kk_v1_std_data_dict__mdict;
static inline kk_v1_std_data_dict__mdict kk_v1_std_data_dict__mdict_dup(kk_v1_std_data_dict__mdict _x) {
  return kk_datatype_dup(_x);
}
static inline void kk_v1_std_data_dict__mdict_drop(kk_v1_std_data_dict__mdict _x, kk_context_t* _ctx) {
  kk_datatype_drop(_x, _ctx);
}
static inline kk_v1_std_data_dict__mdict kk_v1_std_data_dict__mdict_hole() {
  return kk_datatype_from_tag((kk_tag_t)0);
}
static inline bool kk_v1_std_data_dict__mdict_is_unique(kk_v1_std_data_dict__mdict _x) {
  return kk_datatype_is_unique(_x);
}
static inline void kk_v1_std_data_dict__mdict_free(kk_v1_std_data_dict__mdict _x, kk_context_t* _ctx) {
  kk_datatype_free(_x, _ctx);
}
static inline void kk_v1_std_data_dict__mdict_decref(kk_v1_std_data_dict__mdict _x, kk_context_t* _ctx) {
  kk_datatype_decref(_x, _ctx);
}
static inline kk_reuse_t kk_v1_std_data_dict__mdict_dropn_reuse(kk_v1_std_data_dict__mdict _x, kk_ssize_t _scan_fsize, kk_context_t* _ctx) {
  return kk_datatype_dropn_reuse(_x, _scan_fsize, _ctx);
}
static inline void kk_v1_std_data_dict__mdict_dropn(kk_v1_std_data_dict__mdict _x, kk_ssize_t _scan_fsize, kk_context_t* _ctx) {
  kk_datatype_dropn(_x, _scan_fsize, _ctx);
}
static inline kk_reuse_t kk_v1_std_data_dict__mdict_reuse(kk_v1_std_data_dict__mdict _x) {
  return kk_datatype_reuse(_x);
}
static inline kk_box_t kk_v1_std_data_dict__mdict_box(kk_v1_std_data_dict__mdict _x, kk_context_t* _ctx) {
  return kk_datatype_box(_x);
}
static inline kk_v1_std_data_dict__mdict kk_v1_std_data_dict__mdict_unbox(kk_box_t _x, kk_context_t* _ctx) {
  return kk_datatype_unbox(_x);
}

// value declarations

kk_v1_std_data_dict__dict kk_v1_std_data_dict_dict_copy(kk_v1_std_data_dict__dict d, kk_context_t* _ctx); /* forall<a> (d : dict<a>) -> dict<a> */ 

kk_vector_t kk_v1_std_data_dict_keys(kk_v1_std_data_dict__mdict d, kk_context_t* _ctx); /* forall<a,h> (d : mdict<h,a>) -> (read<h>) vector<string> */ 

kk_vector_t kk_v1_std_data_dict_keys_1(kk_v1_std_data_dict__dict d, kk_context_t* _ctx); /* forall<a> (d : dict<a>) -> vector<string> */ 

kk_box_t kk_v1_std_data_dict_unsafe_dict_get(kk_v1_std_data_dict__dict d, kk_string_t key, kk_context_t* _ctx); /* forall<a> (d : dict<a>, key : string) -> a */ 

kk_unit_t kk_v1_std_data_dict_unsafe_dict_add(kk_v1_std_data_dict__dict d, kk_string_t key, kk_box_t value, kk_context_t* _ctx); /* forall<a> (d : dict<a>, key : string, value : a) -> () */ 

bool kk_v1_std_data_dict_contains_key(kk_v1_std_data_dict__mdict md, kk_string_t s, kk_context_t* _ctx); /* forall<a,h> (md : mdict<h,a>, s : string) -> (read<h>) bool */ 

bool kk_v1_std_data_dict_contains_key_1(kk_v1_std_data_dict__dict d, kk_string_t key, kk_context_t* _ctx); /* forall<a> (d : dict<a>, key : string) -> bool */ 

kk_box_t kk_v1_std_data_dict_unsafe_index(kk_v1_std_data_dict__mdict md, kk_string_t s, kk_context_t* _ctx); /* forall<a,h> (md : mdict<h,a>, s : string) -> (read<h>) a */ 

kk_unit_t kk_v1_std_data_dict_clear(kk_v1_std_data_dict__mdict md, kk_context_t* _ctx); /* forall<a,h> (md : mdict<h,a>) -> (write<h>) () */ 

kk_v1_std_data_dict__mdict kk_v1_std_data_dict_copy(kk_v1_std_data_dict__mdict md, kk_context_t* _ctx); /* forall<h,a> (md : mdict<h,a>) -> <alloc<h>,read<h>> mdict<h,a> */ 

kk_integer_t kk_v1_std_data_dict_count(kk_v1_std_data_dict__mdict md, kk_context_t* _ctx); /* forall<a,h> (md : mdict<h,a>) -> int */ 

kk_v1_std_data_dict__dict kk_v1_std_data_dict_freeze(kk_v1_std_data_dict__mdict md, kk_context_t* _ctx); /* forall<h,a> (md : mdict<h,a>) -> <alloc<h>,read<h>> dict<a> */ 

kk_v1_std_data_dict__mdict kk_v1_std_data_dict_mdict(kk_context_t* _ctx); /* forall<h,a> () -> (alloc<h>) mdict<h,a> */ 

kk_unit_t kk_v1_std_data_dict_remove(kk_v1_std_data_dict__mdict md, kk_string_t s, kk_context_t* _ctx); /* forall<a,h> (md : mdict<h,a>, s : string) -> <read<h>,write<h>> () */ 

kk_std_core_types__maybe kk_v1_std_data_dict_foreach_while(kk_v1_std_data_dict__dict d, kk_function_t action, kk_context_t* _ctx); /* forall<a,b,e> (d : dict<a>, action : (string, a) -> e maybe<b>) -> e maybe<b> */ 
 
// monadic lift

static inline kk_std_core_types__maybe kk_v1_std_data_dict__mlift2480_foreach(kk_unit_t wild__, kk_context_t* _ctx) { /* forall<_a,e> (wild_ : ()) -> e maybe<_a> */ 
  return kk_std_core_types__new_Nothing(_ctx);
}
 
// monadic lift

static inline kk_unit_t kk_v1_std_data_dict__mlift2481_foreach(kk_std_core_types__maybe wild__0, kk_context_t* _ctx) { /* forall<_a,e> (wild_0 : maybe<_a>) -> e () */ 
  kk_std_core_types__maybe_drop(wild__0, _ctx);
  kk_Unit; return kk_Unit;
}

kk_unit_t kk_v1_std_data_dict_foreach(kk_v1_std_data_dict__dict d, kk_function_t action, kk_context_t* _ctx); /* forall<a,e> (d : dict<a>, action : (string, a) -> e ()) -> e () */ 

kk_v1_std_data_dict__dict kk_v1_std_data_dict__lp__plus__rp_(kk_v1_std_data_dict__dict d1, kk_v1_std_data_dict__dict d2, kk_context_t* _ctx); /* forall<a> (d1 : dict<a>, d2 : dict<a>) -> dict<a> */ 

kk_std_core_types__maybe kk_v1_std_data_dict__lp__lb__rb__rp_(kk_v1_std_data_dict__mdict md, kk_string_t s, kk_context_t* _ctx); /* forall<a,h> (md : mdict<h,a>, s : string) -> (read<h>) maybe<a> */ 

kk_unit_t kk_v1_std_data_dict__lp__lb__rb__1_rp_(kk_v1_std_data_dict__mdict md, kk_string_t s, kk_box_t assigned, kk_context_t* _ctx); /* forall<a,h> (md : mdict<h,a>, s : string, assigned : a) -> (write<h>) () */ 

kk_std_core_types__maybe kk_v1_std_data_dict__lp__lb__rb__2_rp_(kk_v1_std_data_dict__dict d, kk_string_t key, kk_context_t* _ctx); /* forall<a> (d : dict<a>, key : string) -> maybe<a> */ 

kk_v1_std_data_dict__dict kk_v1_std_data_dict_dict(kk_context_t* _ctx); /* forall<a> () -> dict<a> */ 

kk_v1_std_data_dict__dict kk_v1_std_data_dict_dict_1(kk_std_core__list elems, kk_context_t* _ctx); /* forall<a> (elems : list<(string, a)>) -> dict<a> */ 

kk_v1_std_data_dict__dict kk_v1_std_data_dict_dict_2(kk_vector_t elems, kk_context_t* _ctx); /* forall<a> (elems : vector<(string, a)>) -> dict<a> */ 
 
// monadic lift

static inline kk_std_core_types__tuple2_ kk_v1_std_data_dict__mlift2482_map(kk_string_t k, kk_box_t _y_2478, kk_context_t* _ctx) { /* forall<a,e> (k : string, a) -> e (string, a) */ 
  return kk_std_core_types__new_dash__lp__comma__rp_(kk_string_box(k), _y_2478, _ctx);
}

kk_v1_std_data_dict__dict kk_v1_std_data_dict__mlift2483_map(kk_vector_t _y_2479, kk_context_t* _ctx); /* forall<a,e> (vector<(string, a)>) -> e dict<a> */ 

kk_v1_std_data_dict__dict kk_v1_std_data_dict_map(kk_v1_std_data_dict__dict d, kk_function_t f, kk_context_t* _ctx); /* forall<a,b,e> (d : dict<a>, f : (string, a) -> e b) -> e dict<b> */ 

kk_vector_t kk_v1_std_data_dict_vector(kk_v1_std_data_dict__mdict d, kk_context_t* _ctx); /* forall<a,h> (d : mdict<h,a>) -> (read<h>) vector<(string, a)> */ 

kk_vector_t kk_v1_std_data_dict_vector_1(kk_v1_std_data_dict__dict d, kk_context_t* _ctx); /* forall<a> (d : dict<a>) -> vector<(string, a)> */ 

kk_std_core__list kk_v1_std_data_dict_list(kk_v1_std_data_dict__mdict d, kk_context_t* _ctx); /* forall<a,h> (d : mdict<h,a>) -> (read<h>) list<(string, a)> */ 

kk_std_core__list kk_v1_std_data_dict_list_1(kk_v1_std_data_dict__dict d, kk_context_t* _ctx); /* forall<a> (d : dict<a>) -> list<(string, a)> */ 

void kk_v1_std_data_dict__init(kk_context_t* _ctx);


void kk_v1_std_data_dict__done(kk_context_t* _ctx);

#endif // header
