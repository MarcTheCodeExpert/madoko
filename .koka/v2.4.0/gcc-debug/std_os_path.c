// Koka generated module: "std/os/path", koka version: 2.4.0, platform: 64-bit
#include "std_os_path.h"

kk_std_os_path__path kk_std_os_path__copy(kk_std_os_path__path _this, kk_std_core_types__optional root0, kk_std_core_types__optional parts0, kk_context_t* _ctx) { /* (path, root : optional<string>, parts : optional<list<string>>) -> path */ 
  kk_string_t _x2718;
  if (kk_std_core_types__is_Optional(root0)) {
    kk_box_t _box_x2279 = root0._cons.Optional.value;
    kk_string_t _root_105 = kk_string_unbox(_box_x2279);
    _x2718 = _root_105; /*string*/
  }
  else {
    kk_string_t _x = _this.root;
    kk_string_dup(_x);
    _x2718 = _x; /*string*/
  }
  kk_std_core__list _x2720;
  if (kk_std_core_types__is_Optional(parts0)) {
    kk_box_t _box_x2280 = parts0._cons.Optional.value;
    kk_std_core__list _parts_111 = kk_std_core__list_unbox(_box_x2280, NULL);
    kk_std_os_path__path_drop(_this, _ctx);
    _x2720 = _parts_111; /*list<string>*/
  }
  else {
    kk_std_core__list _x0 = _this.parts;
    kk_std_core__list_dup(_x0);
    kk_std_os_path__path_drop(_this, _ctx);
    _x2720 = _x0; /*list<string>*/
  }
  return kk_std_os_path__new_Path(_x2718, _x2720, _ctx);
}

kk_string_t kk_std_os_path_xapp_path(kk_context_t* _ctx) { /* () -> io string */ 
  return kk_os_app_path(kk_context());
}
 
// Return the base name of a path (stem name + extension)
// `"/foo/bar.txt".path.basename === "bar.txt"`
// `"/foo".path.basename === "foo"`

kk_string_t kk_std_os_path_basename(kk_std_os_path__path p, kk_context_t* _ctx) { /* (p : path) -> string */ 
  {
    kk_std_core__list _x = p.parts;
    kk_std_core__list_dup(_x);
    kk_std_os_path__path_drop(p, _ctx);
    if (kk_std_core__is_Cons(_x)) {
      struct kk_std_core_Cons* _con2722 = kk_std_core__as_Cons(_x);
      kk_box_t _box_x2281 = _con2722->head;
      kk_std_core__list _pat0 = _con2722->tail;
      kk_string_t x = kk_string_unbox(_box_x2281);
      if (kk_likely(kk_std_core__list_is_unique(_x))) {
        kk_std_core__list_drop(_pat0, _ctx);
        kk_std_core__list_free(_x, _ctx);
      }
      else {
        kk_string_dup(x);
        kk_std_core__list_decref(_x, _ctx);
      }
      return x;
    }
    {
      return kk_string_empty();
    }
  }
}
 
// Remove the basename and only keep the root and directory name portion of the path.
// `nobase("foo/bar.ext".path) == "foo")`

kk_std_os_path__path kk_std_os_path_nobase(kk_std_os_path__path p, kk_context_t* _ctx) { /* (p : path) -> path */ 
  kk_string_t _x2725;
  kk_std_core_types__optional _x2726 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x2726)) {
    kk_box_t _box_x2282 = _x2726._cons.Optional.value;
    kk_string_t _root_105 = kk_string_unbox(_box_x2282);
    _x2725 = _root_105; /*string*/
  }
  else {
    kk_string_t _x0 = p.root;
    kk_string_dup(_x0);
    _x2725 = _x0; /*string*/
  }
  kk_std_core__list _x2728;
  {
    kk_std_core__list _x = p.parts;
    kk_std_core__list_dup(_x);
    kk_std_os_path__path_drop(p, _ctx);
    if (kk_std_core__is_Cons(_x)) {
      struct kk_std_core_Cons* _con2729 = kk_std_core__as_Cons(_x);
      kk_box_t _box_x2283 = _con2729->head;
      kk_std_core__list xx = _con2729->tail;
      if (kk_likely(kk_std_core__list_is_unique(_x))) {
        kk_box_drop(_box_x2283, _ctx);
        kk_std_core__list_free(_x, _ctx);
      }
      else {
        kk_std_core__list_dup(xx);
        kk_std_core__list_decref(_x, _ctx);
      }
      _x2728 = xx; /*list<string>*/
    }
    else {
      _x2728 = kk_std_core__new_Nil(_ctx); /*list<string>*/
    }
  }
  return kk_std_os_path__new_Path(_x2725, _x2728, _ctx);
}

kk_std_core_types__tuple2_ kk_std_os_path_split_parts(kk_std_core__list parts0, kk_context_t* _ctx) { /* (parts : list<string>) -> (string, list<string>) */ 
  kk_box_t _x2731;
  kk_string_t _x2732;
  if (kk_std_core__is_Cons(parts0)) {
    struct kk_std_core_Cons* _con2733 = kk_std_core__as_Cons(parts0);
    kk_box_t _box_x2284 = _con2733->head;
    kk_string_t x = kk_string_unbox(_box_x2284);
    kk_string_dup(x);
    _x2732 = x; /*string*/
  }
  else {
    _x2732 = kk_string_empty(); /*string*/
  }
  _x2731 = kk_string_box(_x2732); /*6*/
  kk_box_t _x2736;
  kk_std_core__list _x2737;
  if (kk_std_core__is_Cons(parts0)) {
    struct kk_std_core_Cons* _con2738 = kk_std_core__as_Cons(parts0);
    kk_box_t _box_x2285 = _con2738->head;
    kk_std_core__list xx = _con2738->tail;
    if (kk_likely(kk_std_core__list_is_unique(parts0))) {
      kk_box_drop(_box_x2285, _ctx);
      kk_std_core__list_free(parts0, _ctx);
    }
    else {
      kk_std_core__list_dup(xx);
      kk_std_core__list_decref(parts0, _ctx);
    }
    _x2737 = xx; /*list<string>*/
  }
  else {
    _x2737 = kk_std_core__new_Nil(_ctx); /*list<string>*/
  }
  _x2736 = kk_std_core__list_box(_x2737, _ctx); /*7*/
  return kk_std_core_types__new_dash__lp__comma__rp_(_x2731, _x2736, _ctx);
}

kk_string_t kk_std_os_path_xrealpath(kk_string_t p, kk_context_t* _ctx) { /* (p : string) -> io string */ 
  return kk_os_realpath(p,kk_context());
}
 
// Return the directory part of a path (including the rootname)
// `"/foo/bar.txt".path.dirname === "/foo"`
// `"/foo".path.dirname === "/"`

kk_string_t kk_std_os_path_dirname(kk_std_os_path__path p, kk_context_t* _ctx) { /* (p : path) -> string */ 
  kk_std_core__list xs_2032;
  kk_std_core__list _x2740;
  {
    kk_std_core__list _x0 = p.parts;
    kk_std_core__list_dup(_x0);
    if (kk_std_core__is_Cons(_x0)) {
      struct kk_std_core_Cons* _con2741 = kk_std_core__as_Cons(_x0);
      kk_box_t _box_x2290 = _con2741->head;
      kk_std_core__list xx = _con2741->tail;
      if (kk_likely(kk_std_core__list_is_unique(_x0))) {
        kk_box_drop(_box_x2290, _ctx);
        kk_std_core__list_free(_x0, _ctx);
      }
      else {
        kk_std_core__list_dup(xx);
        kk_std_core__list_decref(_x0, _ctx);
      }
      _x2740 = xx; /*list<string>*/
    }
    else {
      _x2740 = kk_std_core__new_Nil(_ctx); /*list<string>*/
    }
  }
  xs_2032 = kk_std_core__lift17195_reverse(kk_std_core__new_Nil(_ctx), _x2740, _ctx); /*list<string>*/
  kk_string_t _x2743;
  {
    kk_string_t _x = p.root;
    kk_string_dup(_x);
    kk_std_os_path__path_drop(p, _ctx);
    _x2743 = _x; /*string*/
  }
  kk_string_t _x2744;
  if (kk_std_core__is_Nil(xs_2032)) {
    _x2744 = kk_string_empty(); /*string*/
  }
  else {
    struct kk_std_core_Cons* _con2746 = kk_std_core__as_Cons(xs_2032);
    kk_box_t _box_x2291 = _con2746->head;
    kk_std_core__list xx0 = _con2746->tail;
    kk_string_t x = kk_string_unbox(_box_x2291);
    if (kk_likely(kk_std_core__list_is_unique(xs_2032))) {
      kk_std_core__list_free(xs_2032, _ctx);
    }
    else {
      kk_string_dup(x);
      kk_std_core__list_dup(xx0);
      kk_std_core__list_decref(xs_2032, _ctx);
    }
    kk_string_t _x2748;
    kk_define_string_literal(, _s2749, 1, "/")
    _x2748 = kk_string_dup(_s2749); /*string*/
    _x2744 = kk_std_core__lift17188_joinsep(_x2748, xx0, x, _ctx); /*string*/
  }
  return kk_std_core__lp__plus__plus__1_rp_(_x2743, _x2744, _ctx);
}

kk_string_t kk_std_os_path_xhomedir(kk_context_t* _ctx) { /* () -> io string */ 
  return kk_os_home_dir(kk_context());
}
 
// Remove the directory and root and only keep the base name (file name) portion of the path.
// `nodir("foo/bar.ext".path) === "bar.ext"`

kk_std_os_path__path kk_std_os_path_nodir(kk_std_os_path__path p, kk_context_t* _ctx) { /* (p : path) -> path */ 
  kk_std_core__list _b_2293_2292;
  kk_std_core__list _x2751;
  {
    kk_std_core__list _x1 = p.parts;
    kk_std_core__list_dup(_x1);
    _x2751 = _x1; /*list<string>*/
  }
  _b_2293_2292 = kk_std_core_take(_x2751, kk_integer_from_small(1), _ctx); /*list<string>*/
  kk_string_t _x2752 = kk_string_empty(); /*string*/
  kk_std_core__list _x2754;
  kk_std_core_types__optional _match_2684 = kk_std_core_types__new_Optional(kk_std_core__list_box(_b_2293_2292, _ctx), _ctx); /*optional<112>*/;
  if (kk_std_core_types__is_Optional(_match_2684)) {
    kk_box_t _box_x2294 = _match_2684._cons.Optional.value;
    kk_std_core__list _parts_111 = kk_std_core__list_unbox(_box_x2294, NULL);
    kk_std_os_path__path_drop(p, _ctx);
    _x2754 = _parts_111; /*list<string>*/
  }
  else {
    kk_std_core__list _x0 = p.parts;
    kk_std_core__list_dup(_x0);
    kk_std_os_path__path_drop(p, _ctx);
    _x2754 = _x0; /*list<string>*/
  }
  return kk_std_os_path__new_Path(_x2752, _x2754, _ctx);
}
 
// Return the last directory component name (or the empty string).
// `"c:/foo/bar/tst.txt".path.parentname === "bar"

kk_string_t kk_std_os_path_parentname(kk_std_os_path__path p, kk_context_t* _ctx) { /* (p : path) -> string */ 
  {
    kk_std_core__list _x = p.parts;
    kk_std_core__list_dup(_x);
    kk_std_os_path__path_drop(p, _ctx);
    kk_std_core__list _match_2683;
    if (kk_std_core__is_Cons(_x)) {
      struct kk_std_core_Cons* _con2756 = kk_std_core__as_Cons(_x);
      kk_box_t _box_x2295 = _con2756->head;
      kk_std_core__list xx = _con2756->tail;
      if (kk_likely(kk_std_core__list_is_unique(_x))) {
        kk_box_drop(_box_x2295, _ctx);
        kk_std_core__list_free(_x, _ctx);
      }
      else {
        kk_std_core__list_dup(xx);
        kk_std_core__list_decref(_x, _ctx);
      }
      _match_2683 = xx; /*list<string>*/
    }
    else {
      _match_2683 = kk_std_core__new_Nil(_ctx); /*list<string>*/
    }
    if (kk_std_core__is_Cons(_match_2683)) {
      struct kk_std_core_Cons* _con2758 = kk_std_core__as_Cons(_match_2683);
      kk_box_t _box_x2296 = _con2758->head;
      kk_std_core__list _pat0 = _con2758->tail;
      kk_string_t x = kk_string_unbox(_box_x2296);
      if (kk_likely(kk_std_core__list_is_unique(_match_2683))) {
        kk_std_core__list_drop(_pat0, _ctx);
        kk_std_core__list_free(_match_2683, _ctx);
      }
      else {
        kk_string_dup(x);
        kk_std_core__list_decref(_match_2683, _ctx);
      }
      return x;
    }
    {
      return kk_string_empty();
    }
  }
}
 
// Return the OS specific directory separator (`"/"` or `"\\"`)

kk_string_t kk_std_os_path_partsep(kk_context_t* _ctx) { /* () -> ndet string */ 
  return kk_os_dir_sep(kk_context());
}
 
// Return the OS specific path separator (`';'` or `':'`)

kk_string_t kk_std_os_path_pathsep(kk_context_t* _ctx) { /* () -> ndet string */ 
  return kk_os_path_sep(kk_context());
}

kk_string_t kk_std_os_path_xtempdir(kk_context_t* _ctx) { /* () -> io string */ 
  return kk_os_temp_dir(kk_context());
}
 
// Is a path empty?

bool kk_std_os_path_is_empty(kk_std_os_path__path p, kk_context_t* _ctx) { /* (p : path) -> bool */ 
  bool _match_2682;
  kk_string_t _x2761;
  {
    kk_string_t _x = p.root;
    kk_string_dup(_x);
    _x2761 = _x; /*string*/
  }
  kk_string_t _x2762 = kk_string_empty(); /*string*/
  _match_2682 = kk_string_is_eq(_x2761,_x2762,kk_context()); /*bool*/
  if (_match_2682) {
    kk_std_core__list _x0 = p.parts;
    kk_std_core__list_dup(_x0);
    kk_std_os_path__path_drop(p, _ctx);
    if (kk_std_core__is_Nil(_x0)) {
      return true;
    }
    {
      kk_std_core__list_drop(_x0, _ctx);
      return false;
    }
  }
  {
    kk_std_os_path__path_drop(p, _ctx);
    return false;
  }
}
 
// Return the first path if it is not empty, otherwise return the second one.

kk_std_os_path__path kk_std_os_path__lp__bar__bar__rp_(kk_std_os_path__path p1, kk_std_os_path__path p2, kk_context_t* _ctx) { /* (p1 : path, p2 : path) -> path */ 
  bool _match_2681;
  kk_string_t _x2764;
  {
    kk_string_t _x = p1.root;
    kk_string_dup(_x);
    _x2764 = _x; /*string*/
  }
  kk_string_t _x2765 = kk_string_empty(); /*string*/
  _match_2681 = kk_string_is_eq(_x2764,_x2765,kk_context()); /*bool*/
  if (_match_2681) {
    kk_std_core__list _x0 = p1.parts;
    kk_std_core__list_dup(_x0);
    if (kk_std_core__is_Nil(_x0)) {
      kk_std_os_path__path_drop(p1, _ctx);
      return p2;
    }
    {
      kk_std_os_path__path_drop(p2, _ctx);
      kk_std_core__list_drop(_x0, _ctx);
      return p1;
    }
  }
  {
    kk_std_os_path__path_drop(p2, _ctx);
    return p1;
  }
}

kk_std_core__list kk_std_os_path_push_part(kk_string_t dir, kk_std_core__list dirs, kk_context_t* _ctx) { /* (dir : string, dirs : list<string>) -> list<string> */ 
  bool _match_2678;
  kk_string_t _x2767 = kk_string_dup(dir); /*string*/
  kk_string_t _x2768;
  kk_define_string_literal(, _s2769, 1, ".")
  _x2768 = kk_string_dup(_s2769); /*string*/
  _match_2678 = kk_string_is_eq(_x2767,_x2768,kk_context()); /*bool*/
  if (_match_2678) {
    kk_string_drop(dir, _ctx);
    return dirs;
  }
  {
    bool _match_2679;
    kk_string_t _x2770 = kk_string_dup(dir); /*string*/
    kk_string_t _x2771 = kk_string_empty(); /*string*/
    _match_2679 = kk_string_is_eq(_x2770,_x2771,kk_context()); /*bool*/
    if (_match_2679) {
      kk_string_drop(dir, _ctx);
      return dirs;
    }
    {
      bool _match_2680;
      kk_string_t _x2773 = kk_string_dup(dir); /*string*/
      kk_string_t _x2774;
      kk_define_string_literal(, _s2775, 2, "..")
      _x2774 = kk_string_dup(_s2775); /*string*/
      _match_2680 = kk_string_is_eq(_x2773,_x2774,kk_context()); /*bool*/
      if (_match_2680) {
        if (kk_std_core__is_Cons(dirs)) {
          struct kk_std_core_Cons* _con2776 = kk_std_core__as_Cons(dirs);
          kk_box_t _box_x2297 = _con2776->head;
          kk_string_drop(dir, _ctx);
          if (kk_std_core__is_Cons(dirs)) {
            struct kk_std_core_Cons* _con2778 = kk_std_core__as_Cons(dirs);
            kk_box_t _box_x2298 = _con2778->head;
            kk_std_core__list xx = _con2778->tail;
            if (kk_likely(kk_std_core__list_is_unique(dirs))) {
              kk_box_drop(_box_x2298, _ctx);
              kk_std_core__list_free(dirs, _ctx);
            }
            else {
              kk_std_core__list_dup(xx);
              kk_std_core__list_decref(dirs, _ctx);
            }
            return xx;
          }
          {
            return kk_std_core__new_Nil(_ctx);
          }
        }
        {
          return kk_std_core__new_Cons(kk_reuse_null, kk_string_box(dir), dirs, _ctx);
        }
      }
      {
        return kk_std_core__new_Cons(kk_reuse_null, kk_string_box(dir), dirs, _ctx);
      }
    }
  }
}

kk_std_core__list kk_std_os_path_push_parts(kk_std_core__list parts0, kk_std_core__list dirs, kk_context_t* _ctx) { /* (parts : list<string>, dirs : list<string>) -> list<string> */ 
  kk__tailcall: ;
  if (kk_std_core__is_Cons(parts0)) {
    struct kk_std_core_Cons* _con2780 = kk_std_core__as_Cons(parts0);
    kk_box_t _box_x2307 = _con2780->head;
    kk_std_core__list rest = _con2780->tail;
    kk_string_t part = kk_string_unbox(_box_x2307);
    if (kk_likely(kk_std_core__list_is_unique(parts0))) {
      kk_std_core__list_free(parts0, _ctx);
    }
    else {
      kk_string_dup(part);
      kk_std_core__list_dup(rest);
      kk_std_core__list_decref(parts0, _ctx);
    }
    { // tailcall
      kk_std_core__list _x2782 = kk_std_os_path_push_part(part, dirs, _ctx); /*list<string>*/
      parts0 = rest;
      dirs = _x2782;
      goto kk__tailcall;
    }
  }
  {
    return dirs;
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_os_path__mlift2209_proot_fun2784__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2209_proot_fun2784(kk_function_t _fself, kk_box_t _b_2309, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2209_proot_fun2784(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2209_proot_fun2784, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2209_proot_fun2784(kk_function_t _fself, kk_box_t _b_2309, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_unit_t _x2785 = kk_Unit;
  kk_char_t _x2786 = kk_char_unbox(_b_2309, _ctx); /*char*/
  kk_std_os_path__mlift2208_proot(_x2786, _ctx);
  return kk_unit_box(_x2785);
}

kk_unit_t kk_std_os_path__mlift2209_proot(kk_char_t wild__, kk_context_t* _ctx) { /* (wild_ : char) -> std/text/parse/parse () */ 
  kk_char_t x_2221 = kk_std_text_parse_char(':', _ctx); /*char*/;
  if (kk_yielding(kk_context())) {
    kk_box_t _x2783 = kk_std_core_hnd_yield_extend(kk_std_os_path__new_mlift2209_proot_fun2784(_ctx), _ctx); /*3926*/
    kk_unit_unbox(_x2783); return kk_Unit;
  }
  {
    kk_Unit; return kk_Unit;
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_os_path__mlift2211_proot_fun2787__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2211_proot_fun2787(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2211_proot_fun2787(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2211_proot_fun2787, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2211_proot_fun2787(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_char_t _x2788;
  kk_string_t _x2789;
  kk_define_string_literal(, _s2790, 1, "/")
  _x2789 = kk_string_dup(_s2790); /*string*/
  _x2788 = kk_std_text_parse_none_of(_x2789, _ctx); /*char*/
  return kk_char_box(_x2788, _ctx);
}


// lift anonymous function
struct kk_std_os_path__mlift2211_proot_fun2792__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2211_proot_fun2792(kk_function_t _fself, kk_box_t _b_2316, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2211_proot_fun2792(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2211_proot_fun2792, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2211_proot_fun2792(kk_function_t _fself, kk_box_t _b_2316, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_unit_t _x2793 = kk_Unit;
  kk_std_core__list _x2794 = kk_std_core__list_unbox(_b_2316, _ctx); /*list<char>*/
  kk_std_os_path__mlift2210_proot(_x2794, _ctx);
  return kk_unit_box(_x2793);
}

kk_unit_t kk_std_os_path__mlift2211_proot(kk_char_t _y_2163, kk_context_t* _ctx) { /* (char) -> std/text/parse/parse () */ 
  kk_std_core__list x_2223 = kk_std_text_parse_many_acc(kk_std_os_path__new_mlift2211_proot_fun2787(_ctx), kk_std_core__new_Nil(_ctx), _ctx); /*list<char>*/;
  kk_std_core__list_drop(x_2223, _ctx);
  if (kk_yielding(kk_context())) {
    kk_box_t _x2791 = kk_std_core_hnd_yield_extend(kk_std_os_path__new_mlift2211_proot_fun2792(_ctx), _ctx); /*3926*/
    kk_unit_unbox(_x2791); return kk_Unit;
  }
  {
    kk_Unit; return kk_Unit;
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_os_path__mlift2212_proot_fun2798__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2212_proot_fun2798(kk_function_t _fself, kk_box_t _b_2319, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2212_proot_fun2798(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2212_proot_fun2798, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2212_proot_fun2798(kk_function_t _fself, kk_box_t _b_2319, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_unit_t _x2799 = kk_Unit;
  kk_char_t _x2800 = kk_char_unbox(_b_2319, _ctx); /*char*/
  kk_std_os_path__mlift2211_proot(_x2800, _ctx);
  return kk_unit_box(_x2799);
}

kk_unit_t kk_std_os_path__mlift2212_proot(kk_char_t wild__1, kk_context_t* _ctx) { /* (wild_1 : char) -> std/text/parse/parse () */ 
  kk_char_t x_2225;
  kk_string_t _x2795;
  kk_define_string_literal(, _s2796, 1, "/")
  _x2795 = kk_string_dup(_s2796); /*string*/
  x_2225 = kk_std_text_parse_none_of(_x2795, _ctx); /*char*/
  if (kk_yielding(kk_context())) {
    kk_box_t _x2797 = kk_std_core_hnd_yield_extend(kk_std_os_path__new_mlift2212_proot_fun2798(_ctx), _ctx); /*3926*/
    kk_unit_unbox(_x2797); return kk_Unit;
  }
  {
    kk_std_os_path__mlift2211_proot(x_2225, _ctx); return kk_Unit;
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_os_path__mlift2213_proot_fun2802__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2213_proot_fun2802(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2213_proot_fun2802(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2213_proot_fun2802, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_os_path__mlift2213_proot_fun2805__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2213_proot_fun2805(kk_function_t _fself, kk_box_t _b_2322, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2213_proot_fun2805(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2213_proot_fun2805, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2213_proot_fun2805(kk_function_t _fself, kk_box_t _b_2322, kk_context_t* _ctx) {
  kk_unused(_fself);
  bool _x2806;
  kk_char_t _x2807 = kk_char_unbox(_b_2322, _ctx); /*char*/
  _x2806 = kk_std_os_path__mlift2206_proot(_x2807, _ctx); /*bool*/
  return kk_bool_box(_x2806);
}
static kk_box_t kk_std_os_path__mlift2213_proot_fun2802(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_char_t x_2227 = kk_std_text_parse_char('/', _ctx); /*char*/;
  bool _x2803;
  if (kk_yielding(kk_context())) {
    kk_box_t _x2804 = kk_std_core_hnd_yield_extend(kk_std_os_path__new_mlift2213_proot_fun2805(_ctx), _ctx); /*3926*/
    _x2803 = kk_bool_unbox(_x2804); /*bool*/
  }
  else {
    _x2803 = false; /*bool*/
  }
  return kk_bool_box(_x2803);
}


// lift anonymous function
struct kk_std_os_path__mlift2213_proot_fun2808__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2213_proot_fun2808(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2213_proot_fun2808(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2213_proot_fun2808, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_os_path__mlift2213_proot_fun2811__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2213_proot_fun2811(kk_function_t _fself, kk_box_t _b_2324, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2213_proot_fun2811(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2213_proot_fun2811, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2213_proot_fun2811(kk_function_t _fself, kk_box_t _b_2324, kk_context_t* _ctx) {
  kk_unused(_fself);
  bool _x2812;
  kk_unit_t _x2813 = kk_Unit;
  kk_unit_unbox(_b_2324);
  _x2812 = kk_std_os_path__mlift2207_proot(_x2813, _ctx); /*bool*/
  return kk_bool_box(_x2812);
}
static kk_box_t kk_std_os_path__mlift2213_proot_fun2808(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_unit_t x0_2229 = kk_Unit;
  kk_std_text_parse_eof(_ctx);
  bool _x2809;
  if (kk_yielding(kk_context())) {
    kk_box_t _x2810 = kk_std_core_hnd_yield_extend(kk_std_os_path__new_mlift2213_proot_fun2811(_ctx), _ctx); /*3926*/
    _x2809 = kk_bool_unbox(_x2810); /*bool*/
  }
  else {
    _x2809 = true; /*bool*/
  }
  return kk_bool_box(_x2809);
}

bool kk_std_os_path__mlift2213_proot(kk_unit_t wild__3, kk_context_t* _ctx) { /* (wild_3 : ()) -> std/text/parse/parse bool */ 
  kk_box_t _x2801 = kk_std_text_parse__lp__bar__bar__rp_(kk_std_os_path__new_mlift2213_proot_fun2802(_ctx), kk_std_os_path__new_mlift2213_proot_fun2808(_ctx), _ctx); /*944*/
  return kk_bool_unbox(_x2801);
}


// lift anonymous function
struct kk_std_os_path_proot_fun2815__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_proot_fun2815(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_proot_fun2815(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_proot_fun2815, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_os_path_proot_fun2818__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_proot_fun2818(kk_function_t _fself, kk_box_t _b_2332, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_proot_fun2818(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_proot_fun2818, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_proot_fun2818(kk_function_t _fself, kk_box_t _b_2332, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_unit_t _x2819 = kk_Unit;
  kk_char_t _x2820 = kk_char_unbox(_b_2332, _ctx); /*char*/
  kk_std_os_path__mlift2209_proot(_x2820, _ctx);
  return kk_unit_box(_x2819);
}
static kk_box_t kk_std_os_path_proot_fun2815(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_char_t x0_2234 = kk_std_text_parse_alpha(_ctx); /*char*/;
  kk_unit_t _x2816 = kk_Unit;
  if (kk_yielding(kk_context())) {
    kk_box_t _x2817 = kk_std_core_hnd_yield_extend(kk_std_os_path_new_proot_fun2818(_ctx), _ctx); /*3926*/
    kk_unit_unbox(_x2817);
  }
  else {
    kk_std_os_path__mlift2209_proot(x0_2234, _ctx);
  }
  return kk_unit_box(_x2816);
}


// lift anonymous function
struct kk_std_os_path_proot_fun2821__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_proot_fun2821(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_proot_fun2821(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_proot_fun2821, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_os_path_proot_fun2824__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_proot_fun2824(kk_function_t _fself, kk_box_t _b_2334, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_proot_fun2824(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_proot_fun2824, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_proot_fun2824(kk_function_t _fself, kk_box_t _b_2334, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_unit_t _x2825 = kk_Unit;
  kk_char_t _x2826 = kk_char_unbox(_b_2334, _ctx); /*char*/
  kk_std_os_path__mlift2212_proot(_x2826, _ctx);
  return kk_unit_box(_x2825);
}
static kk_box_t kk_std_os_path_proot_fun2821(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_char_t x1_2236 = kk_std_text_parse_char('/', _ctx); /*char*/;
  kk_unit_t _x2822 = kk_Unit;
  if (kk_yielding(kk_context())) {
    kk_box_t _x2823 = kk_std_core_hnd_yield_extend(kk_std_os_path_new_proot_fun2824(_ctx), _ctx); /*3926*/
    kk_unit_unbox(_x2823);
  }
  else {
    kk_std_os_path__mlift2212_proot(x1_2236, _ctx);
  }
  return kk_unit_box(_x2822);
}


// lift anonymous function
struct kk_std_os_path_proot_fun2828__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_proot_fun2828(kk_function_t _fself, kk_box_t _b_2342, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_proot_fun2828(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_proot_fun2828, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_proot_fun2828(kk_function_t _fself, kk_box_t _b_2342, kk_context_t* _ctx) {
  kk_unused(_fself);
  bool _x2829;
  kk_unit_t _x2830 = kk_Unit;
  kk_unit_unbox(_b_2342);
  _x2829 = kk_std_os_path__mlift2213_proot(_x2830, _ctx); /*bool*/
  return kk_bool_box(_x2829);
}


// lift anonymous function
struct kk_std_os_path_proot_fun2831__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_proot_fun2831(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_proot_fun2831(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_proot_fun2831, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_os_path_proot_fun2834__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_proot_fun2834(kk_function_t _fself, kk_box_t _b_2344, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_proot_fun2834(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_proot_fun2834, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_proot_fun2834(kk_function_t _fself, kk_box_t _b_2344, kk_context_t* _ctx) {
  kk_unused(_fself);
  bool _x2835;
  kk_char_t _x2836 = kk_char_unbox(_b_2344, _ctx); /*char*/
  _x2835 = kk_std_os_path__mlift2206_proot(_x2836, _ctx); /*bool*/
  return kk_bool_box(_x2835);
}
static kk_box_t kk_std_os_path_proot_fun2831(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_char_t x2_2238 = kk_std_text_parse_char('/', _ctx); /*char*/;
  bool _x2832;
  if (kk_yielding(kk_context())) {
    kk_box_t _x2833 = kk_std_core_hnd_yield_extend(kk_std_os_path_new_proot_fun2834(_ctx), _ctx); /*3926*/
    _x2832 = kk_bool_unbox(_x2833); /*bool*/
  }
  else {
    _x2832 = false; /*bool*/
  }
  return kk_bool_box(_x2832);
}


// lift anonymous function
struct kk_std_os_path_proot_fun2837__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_proot_fun2837(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_proot_fun2837(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_proot_fun2837, _ctx)
  return kk_function_dup(_fself);
}



// lift anonymous function
struct kk_std_os_path_proot_fun2840__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_proot_fun2840(kk_function_t _fself, kk_box_t _b_2346, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_proot_fun2840(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_proot_fun2840, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_proot_fun2840(kk_function_t _fself, kk_box_t _b_2346, kk_context_t* _ctx) {
  kk_unused(_fself);
  bool _x2841;
  kk_unit_t _x2842 = kk_Unit;
  kk_unit_unbox(_b_2346);
  _x2841 = kk_std_os_path__mlift2207_proot(_x2842, _ctx); /*bool*/
  return kk_bool_box(_x2841);
}
static kk_box_t kk_std_os_path_proot_fun2837(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_unit_t x3_2240 = kk_Unit;
  kk_std_text_parse_eof(_ctx);
  bool _x2838;
  if (kk_yielding(kk_context())) {
    kk_box_t _x2839 = kk_std_core_hnd_yield_extend(kk_std_os_path_new_proot_fun2840(_ctx), _ctx); /*3926*/
    _x2838 = kk_bool_unbox(_x2839); /*bool*/
  }
  else {
    _x2838 = true; /*bool*/
  }
  return kk_bool_box(_x2838);
}

bool kk_std_os_path_proot(kk_context_t* _ctx) { /* () -> std/text/parse/parse bool */ 
  kk_unit_t x_2231 = kk_Unit;
  kk_box_t _x2814 = kk_std_text_parse__lp__bar__bar__rp_(kk_std_os_path_new_proot_fun2815(_ctx), kk_std_os_path_new_proot_fun2821(_ctx), _ctx); /*944*/
  kk_unit_unbox(_x2814);
  kk_box_t _x2827;
  if (kk_yielding(kk_context())) {
    _x2827 = kk_std_core_hnd_yield_extend(kk_std_os_path_new_proot_fun2828(_ctx), _ctx); /*3926*/
  }
  else {
    _x2827 = kk_std_text_parse__lp__bar__bar__rp_(kk_std_os_path_new_proot_fun2831(_ctx), kk_std_os_path_new_proot_fun2837(_ctx), _ctx); /*3926*/
  }
  return kk_bool_unbox(_x2827);
}
 
// Convert a `:path` to a normalized `:string` path.
// If this results in an empty string, the current directory path `"."` is returned.
// `"c:/foo/test.txt".path.string -> "c:/foo/test.txt"`
// `"c:\\foo\\test.txt".path.string -> "c:/foo/test.txt"`
// `"/foo//./bar/../test.txt".path.string -> "/foo/test.txt"`

kk_string_t kk_std_os_path_string(kk_std_os_path__path p, kk_context_t* _ctx) { /* (p : path) -> string */ 
  kk_std_core__list xs_2058;
  kk_std_core__list _x2843;
  {
    kk_std_core__list _x0 = p.parts;
    kk_std_core__list_dup(_x0);
    _x2843 = _x0; /*list<string>*/
  }
  xs_2058 = kk_std_core__lift17195_reverse(kk_std_core__new_Nil(_ctx), _x2843, _ctx); /*list<string>*/
  kk_string_t s;
  kk_string_t _x2844;
  {
    kk_string_t _x = p.root;
    kk_string_dup(_x);
    kk_std_os_path__path_drop(p, _ctx);
    _x2844 = _x; /*string*/
  }
  kk_string_t _x2845;
  if (kk_std_core__is_Nil(xs_2058)) {
    _x2845 = kk_string_empty(); /*string*/
  }
  else {
    struct kk_std_core_Cons* _con2847 = kk_std_core__as_Cons(xs_2058);
    kk_box_t _box_x2354 = _con2847->head;
    kk_std_core__list xx = _con2847->tail;
    kk_string_t x = kk_string_unbox(_box_x2354);
    if (kk_likely(kk_std_core__list_is_unique(xs_2058))) {
      kk_std_core__list_free(xs_2058, _ctx);
    }
    else {
      kk_string_dup(x);
      kk_std_core__list_dup(xx);
      kk_std_core__list_decref(xs_2058, _ctx);
    }
    kk_string_t _x2849;
    kk_define_string_literal(, _s2850, 1, "/")
    _x2849 = kk_string_dup(_s2850); /*string*/
    _x2845 = kk_std_core__lift17188_joinsep(_x2849, xx, x, _ctx); /*string*/
  }
  s = kk_std_core__lp__plus__plus__1_rp_(_x2844, _x2845, _ctx); /*string*/
  bool _match_2667;
  kk_string_t _x2851 = kk_string_dup(s); /*string*/
  kk_string_t _x2852 = kk_string_empty(); /*string*/
  _match_2667 = kk_string_is_eq(_x2851,_x2852,kk_context()); /*bool*/
  if (_match_2667) {
    kk_string_drop(s, _ctx);
    kk_define_string_literal(, _s2854, 1, ".")
    return kk_string_dup(_s2854);
  }
  {
    return s;
  }
}
 
// Create a normalized `:path` from a path string.


// lift anonymous function
struct kk_std_os_path_path_fun2875__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_path_fun2875(kk_function_t _fself, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_path_fun2875(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_path_fun2875, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_path_fun2875(kk_function_t _fself, kk_context_t* _ctx) {
  kk_unused(_fself);
  bool _x2876 = kk_std_os_path_proot(_ctx); /*bool*/
  return kk_bool_box(_x2876);
}

kk_std_os_path__path kk_std_os_path_path(kk_string_t s, kk_context_t* _ctx) { /* (s : string) -> path */ 
  bool _match_2663;
  kk_string_t _x2865 = kk_string_dup(s); /*string*/
  kk_string_t _x2866 = kk_string_empty(); /*string*/
  _match_2663 = kk_string_is_eq(_x2865,_x2866,kk_context()); /*bool*/
  if (_match_2663) {
    kk_string_drop(s, _ctx);
    kk_string_t _x2868 = kk_string_empty(); /*string*/
    return kk_std_os_path__new_Path(_x2868, kk_std_core__new_Nil(_ctx), _ctx);
  }
  {
    kk_string_t t;
    kk_string_t _x2870;
    kk_define_string_literal(, _s2871, 1, "\\")
    _x2870 = kk_string_dup(_s2871); /*string*/
    kk_string_t _x2872;
    kk_define_string_literal(, _s2873, 1, "/")
    _x2872 = kk_string_dup(_s2873); /*string*/
    t = kk_string_replace_all(s,_x2870,_x2872,kk_context()); /*string*/
    kk_std_core_types__maybe _match_2664;
    kk_string_t _x2874 = kk_string_dup(t); /*string*/
    _match_2664 = kk_std_text_parse_starts_with(_x2874, kk_std_os_path_new_path_fun2875(_ctx), _ctx); /*maybe<(2200, sslice)>*/
    if (kk_std_core_types__is_Nothing(_match_2664)) {
      kk_vector_t v_17122;
      kk_string_t _x2877;
      kk_define_string_literal(, _s2878, 1, "/")
      _x2877 = kk_string_dup(_s2878); /*string*/
      v_17122 = kk_string_splitv(t,_x2877,kk_context()); /*vector<string>*/
      kk_std_core__list parts0;
      kk_std_core__list _x2879 = kk_std_core_vlist(v_17122, kk_std_core_types__new_None(_ctx), _ctx); /*list<2142>*/
      kk_std_core__list _x2880;
      kk_std_core_types__optional _x2881 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
      if (kk_std_core_types__is_Optional(_x2881)) {
        kk_box_t _box_x2360 = _x2881._cons.Optional.value;
        kk_std_core__list _dirs_1011 = kk_std_core__list_unbox(_box_x2360, NULL);
        _x2880 = _dirs_1011; /*list<string>*/
      }
      else {
        _x2880 = kk_std_core__new_Nil(_ctx); /*list<string>*/
      }
      parts0 = kk_std_os_path_push_parts(_x2879, _x2880, _ctx); /*list<string>*/
      kk_string_t _x2883 = kk_string_empty(); /*string*/
      return kk_std_os_path__new_Path(_x2883, parts0, _ctx);
    }
    {
      kk_box_t _box_x2361 = _match_2664._cons.Just.value;
      kk_std_core_types__tuple2_ _pat3 = kk_std_core_types__tuple2__unbox(_box_x2361, NULL);
      kk_box_t _box_x2362 = _pat3.fst;
      kk_box_t _box_x2363 = _pat3.snd;
      bool eof = kk_bool_unbox(_box_x2362);
      kk_std_core__sslice rest = kk_std_core__sslice_unbox(_box_x2363, NULL);
      kk_string_drop(t, _ctx);
      kk_std_core__sslice_dup(rest);
      kk_std_core_types__maybe_drop(_match_2664, _ctx);
      kk_string_t root1_2071;
      kk_string_t _x2888;
      kk_std_core__sslice _x2889;
      {
        kk_string_t s5 = rest.str;
        kk_ssize_t start0 = rest.start;
        kk_string_dup(s5);
        kk_ssize_t _x2890 = (KK_IZ(0)); /*ssize_t*/
        _x2889 = kk_std_core__new_Sslice(s5, _x2890, start0, _ctx); /*sslice*/
      }
      _x2888 = kk_std_core_string_3(_x2889, _ctx); /*string*/
      kk_string_t _x2891;
      if (eof) {
        kk_define_string_literal(, _s2892, 1, "/")
        _x2891 = kk_string_dup(_s2892); /*string*/
      }
      else {
        _x2891 = kk_string_empty(); /*string*/
      }
      root1_2071 = kk_std_core__lp__plus__plus__1_rp_(_x2888, _x2891, _ctx); /*string*/
      kk_string_t s3_2072 = kk_std_core_string_3(rest, _ctx); /*string*/;
      kk_vector_t v_171220;
      kk_string_t _x2894;
      kk_define_string_literal(, _s2895, 1, "/")
      _x2894 = kk_string_dup(_s2895); /*string*/
      v_171220 = kk_string_splitv(s3_2072,_x2894,kk_context()); /*vector<string>*/
      kk_std_core__list parts1;
      kk_std_core__list _x2896 = kk_std_core_vlist(v_171220, kk_std_core_types__new_None(_ctx), _ctx); /*list<2142>*/
      kk_std_core__list _x2897;
      kk_std_core_types__optional _x2898 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
      if (kk_std_core_types__is_Optional(_x2898)) {
        kk_box_t _box_x2364 = _x2898._cons.Optional.value;
        kk_std_core__list _dirs_10110 = kk_std_core__list_unbox(_box_x2364, NULL);
        _x2897 = _dirs_10110; /*list<string>*/
      }
      else {
        _x2897 = kk_std_core__new_Nil(_ctx); /*list<string>*/
      }
      parts1 = kk_std_os_path_push_parts(_x2896, _x2897, _ctx); /*list<string>*/
      return kk_std_os_path__new_Path(root1_2071, parts1, _ctx);
    }
  }
}
 
// Add two paths together using left-associative operator `(/)`.
// Keeps the root of `p1` and discards the root name of `p2`.
// `"/a/" / "b/foo.txt"          === "/a/b/foo.txt"`
// `"/a/foo.txt" / "/b/bar.txt"  === "/a/foo.txt/b/bar.txt"`
// `"c:/foo" / "d:/bar"          === "c:/foo/bar"`

kk_std_os_path__path kk_std_os_path__lp__fs__rp_(kk_std_os_path__path p1, kk_std_os_path__path p2, kk_context_t* _ctx) { /* (p1 : path, p2 : path) -> path */ 
  kk_std_core__list _b_2368_2367;
  kk_std_core__list _x2900;
  kk_std_core__list _x2901;
  {
    kk_std_core__list _x0 = p2.parts;
    kk_std_core__list_dup(_x0);
    kk_std_os_path__path_drop(p2, _ctx);
    _x2901 = _x0; /*list<string>*/
  }
  _x2900 = kk_std_core__lift17195_reverse(kk_std_core__new_Nil(_ctx), _x2901, _ctx); /*list<2485>*/
  kk_std_core__list _x2902;
  {
    kk_std_core__list _x1 = p1.parts;
    kk_std_core__list_dup(_x1);
    _x2902 = _x1; /*list<string>*/
  }
  _b_2368_2367 = kk_std_os_path_push_parts(_x2900, _x2902, _ctx); /*list<string>*/
  kk_string_t _x2903;
  {
    kk_string_t _x = p1.root;
    kk_string_dup(_x);
    kk_std_os_path__path_drop(p1, _ctx);
    _x2903 = _x; /*string*/
  }
  kk_std_core__list _x2904;
  kk_std_core_types__optional _match_2662 = kk_std_core_types__new_Optional(kk_std_core__list_box(_b_2368_2367, _ctx), _ctx); /*optional<112>*/;
  if (kk_std_core_types__is_Optional(_match_2662)) {
    kk_box_t _box_x2369 = _match_2662._cons.Optional.value;
    kk_std_core__list _parts_876 = kk_std_core__list_unbox(_box_x2369, NULL);
    _x2904 = _parts_876; /*list<string>*/
  }
  else {
    _x2904 = kk_std_core__new_Nil(_ctx); /*list<string>*/
  }
  return kk_std_os_path__new_Path(_x2903, _x2904, _ctx);
}
 
// Convenience function that adds a string path.

kk_std_os_path__path kk_std_os_path__lp__fs__1_rp_(kk_std_os_path__path p1, kk_string_t p2, kk_context_t* _ctx) { /* (p1 : path, p2 : string) -> path */ 
  kk_std_os_path__path p20_2144 = kk_std_os_path_path(p2, _ctx); /*std/os/path/path*/;
  kk_std_core__list _b_2371_2370;
  kk_std_core__list _x2906;
  kk_std_core__list _x2907;
  {
    kk_std_core__list _x0 = p20_2144.parts;
    kk_std_core__list_dup(_x0);
    kk_std_os_path__path_drop(p20_2144, _ctx);
    _x2907 = _x0; /*list<string>*/
  }
  _x2906 = kk_std_core__lift17195_reverse(kk_std_core__new_Nil(_ctx), _x2907, _ctx); /*list<2485>*/
  kk_std_core__list _x2908;
  {
    kk_std_core__list _x1 = p1.parts;
    kk_std_core__list_dup(_x1);
    _x2908 = _x1; /*list<string>*/
  }
  _b_2371_2370 = kk_std_os_path_push_parts(_x2906, _x2908, _ctx); /*list<string>*/
  kk_string_t _x2909;
  {
    kk_string_t _x = p1.root;
    kk_string_dup(_x);
    kk_std_os_path__path_drop(p1, _ctx);
    _x2909 = _x; /*string*/
  }
  kk_std_core__list _x2910;
  kk_std_core_types__optional _match_2661 = kk_std_core_types__new_Optional(kk_std_core__list_box(_b_2371_2370, _ctx), _ctx); /*optional<112>*/;
  if (kk_std_core_types__is_Optional(_match_2661)) {
    kk_box_t _box_x2372 = _match_2661._cons.Optional.value;
    kk_std_core__list _parts_876 = kk_std_core__list_unbox(_box_x2372, NULL);
    _x2910 = _parts_876; /*list<string>*/
  }
  else {
    _x2910 = kk_std_core__new_Nil(_ctx); /*list<string>*/
  }
  return kk_std_os_path__new_Path(_x2909, _x2910, _ctx);
}
 
// Convenience function that adds two strings into a path.

kk_std_os_path__path kk_std_os_path__lp__fs__2_rp_(kk_string_t p1, kk_string_t p2, kk_context_t* _ctx) { /* (p1 : string, p2 : string) -> path */ 
  kk_std_os_path__path p10_2145 = kk_std_os_path_path(p1, _ctx); /*std/os/path/path*/;
  kk_std_os_path__path p20_2146 = kk_std_os_path_path(p2, _ctx); /*std/os/path/path*/;
  kk_std_core__list _b_2374_2373;
  kk_std_core__list _x2912;
  kk_std_core__list _x2913;
  {
    kk_std_core__list _x0 = p20_2146.parts;
    kk_std_core__list_dup(_x0);
    kk_std_os_path__path_drop(p20_2146, _ctx);
    _x2913 = _x0; /*list<string>*/
  }
  _x2912 = kk_std_core__lift17195_reverse(kk_std_core__new_Nil(_ctx), _x2913, _ctx); /*list<2485>*/
  kk_std_core__list _x2914;
  {
    kk_std_core__list _x1 = p10_2145.parts;
    kk_std_core__list_dup(_x1);
    _x2914 = _x1; /*list<string>*/
  }
  _b_2374_2373 = kk_std_os_path_push_parts(_x2912, _x2914, _ctx); /*list<string>*/
  kk_string_t _x2915;
  {
    kk_string_t _x = p10_2145.root;
    kk_string_dup(_x);
    kk_std_os_path__path_drop(p10_2145, _ctx);
    _x2915 = _x; /*string*/
  }
  kk_std_core__list _x2916;
  kk_std_core_types__optional _match_2660 = kk_std_core_types__new_Optional(kk_std_core__list_box(_b_2374_2373, _ctx), _ctx); /*optional<112>*/;
  if (kk_std_core_types__is_Optional(_match_2660)) {
    kk_box_t _box_x2375 = _match_2660._cons.Optional.value;
    kk_std_core__list _parts_876 = kk_std_core__list_unbox(_box_x2375, NULL);
    _x2916 = _parts_876; /*list<string>*/
  }
  else {
    _x2916 = kk_std_core__new_Nil(_ctx); /*list<string>*/
  }
  return kk_std_os_path__new_Path(_x2915, _x2916, _ctx);
}
 
// monadic lift


// lift anonymous function
struct kk_std_os_path__mlift2214_app_path_fun2919__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2214_app_path_fun2919(kk_function_t _fself, kk_box_t _b_2378, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2214_app_path_fun2919(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2214_app_path_fun2919, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2214_app_path_fun2919(kk_function_t _fself, kk_box_t _b_2378, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x2920;
  kk_string_t _x2921 = kk_string_unbox(_b_2378); /*string*/
  _x2920 = kk_std_os_path_path(_x2921, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x2920, _ctx);
}

kk_std_os_path__path kk_std_os_path__mlift2214_app_path(kk_string_t _y_2171, kk_context_t* _ctx) { /* (string) -> io path */ 
  kk_box_t _x2918 = kk_std_core_hnd__open_none1(kk_std_os_path__new_mlift2214_app_path_fun2919(_ctx), kk_string_box(_y_2171), _ctx); /*3357*/
  return kk_std_os_path__path_unbox(_x2918, _ctx);
}
 
// Return the path to the currently executing application.


// lift anonymous function
struct kk_std_os_path_app_path_fun2923__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_app_path_fun2923(kk_function_t _fself, kk_box_t _b_2382, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_app_path_fun2923(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_app_path_fun2923, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_app_path_fun2923(kk_function_t _fself, kk_box_t _b_2382, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x2924;
  kk_string_t _x2925 = kk_string_unbox(_b_2382); /*string*/
  _x2924 = kk_std_os_path__mlift2214_app_path(_x2925, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x2924, _ctx);
}


// lift anonymous function
struct kk_std_os_path_app_path_fun2926__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_app_path_fun2926(kk_function_t _fself, kk_box_t _b_2385, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_app_path_fun2926(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_app_path_fun2926, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_app_path_fun2926(kk_function_t _fself, kk_box_t _b_2385, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x2927;
  kk_string_t _x2928 = kk_string_unbox(_b_2385); /*string*/
  _x2927 = kk_std_os_path_path(_x2928, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x2927, _ctx);
}

kk_std_os_path__path kk_std_os_path_app_path(kk_context_t* _ctx) { /* () -> io path */ 
  kk_string_t x_2242 = kk_std_os_path_xapp_path(_ctx); /*string*/;
  kk_box_t _x2922;
  if (kk_yielding(kk_context())) {
    kk_string_drop(x_2242, _ctx);
    _x2922 = kk_std_core_hnd_yield_extend(kk_std_os_path_new_app_path_fun2923(_ctx), _ctx); /*3926*/
  }
  else {
    _x2922 = kk_std_core_hnd__open_none1(kk_std_os_path_new_app_path_fun2926(_ctx), kk_string_box(x_2242), _ctx); /*3926*/
  }
  return kk_std_os_path__path_unbox(_x2922, _ctx);
}
 
// monadic lift


// lift anonymous function
struct kk_std_os_path__mlift2215_appdir_fun2930__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2215_appdir_fun2930(kk_function_t _fself, kk_box_t _b_2391, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2215_appdir_fun2930(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2215_appdir_fun2930, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2215_appdir_fun2930(kk_function_t _fself, kk_box_t _b_2391, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x2931;
  kk_string_t _x2932 = kk_string_unbox(_b_2391); /*string*/
  _x2931 = kk_std_os_path_path(_x2932, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x2931, _ctx);
}


// lift anonymous function
struct kk_std_os_path__mlift2215_appdir_fun2934__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2215_appdir_fun2934(kk_function_t _fself, kk_box_t _b_2398, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2215_appdir_fun2934(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2215_appdir_fun2934, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2215_appdir_fun2934(kk_function_t _fself, kk_box_t _b_2398, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x2935;
  kk_string_t _x2936;
  kk_std_core_types__optional _x2937 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x2937)) {
    kk_box_t _box_x2394 = _x2937._cons.Optional.value;
    kk_string_t _root_105 = kk_string_unbox(_box_x2394);
    _x2936 = _root_105; /*string*/
  }
  else {
    kk_std_os_path__path _match_2658;
    kk_box_t _x2939 = kk_box_dup(_b_2398); /*3356*/
    _match_2658 = kk_std_os_path__path_unbox(_x2939, _ctx); /*std/os/path/path*/
    {
      kk_string_t _x00 = _match_2658.root;
      kk_string_dup(_x00);
      kk_std_os_path__path_drop(_match_2658, _ctx);
      _x2936 = _x00; /*string*/
    }
  }
  kk_std_core__list _x2940;
  kk_std_os_path__path _match_2656 = kk_std_os_path__path_unbox(_b_2398, _ctx); /*std/os/path/path*/;
  {
    kk_std_core__list _x = _match_2656.parts;
    kk_std_core__list_dup(_x);
    kk_std_os_path__path_drop(_match_2656, _ctx);
    if (kk_std_core__is_Cons(_x)) {
      struct kk_std_core_Cons* _con2941 = kk_std_core__as_Cons(_x);
      kk_box_t _box_x2395 = _con2941->head;
      kk_std_core__list xx = _con2941->tail;
      if (kk_likely(kk_std_core__list_is_unique(_x))) {
        kk_box_drop(_box_x2395, _ctx);
        kk_std_core__list_free(_x, _ctx);
      }
      else {
        kk_std_core__list_dup(xx);
        kk_std_core__list_decref(_x, _ctx);
      }
      _x2940 = xx; /*list<string>*/
    }
    else {
      _x2940 = kk_std_core__new_Nil(_ctx); /*list<string>*/
    }
  }
  _x2935 = kk_std_os_path__new_Path(_x2936, _x2940, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x2935, _ctx);
}


// lift anonymous function
struct kk_std_os_path__mlift2215_appdir_fun2943__t {
  struct kk_function_s _base;
};
static kk_string_t kk_std_os_path__mlift2215_appdir_fun2943(kk_function_t _fself, kk_std_os_path__path p00, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2215_appdir_fun2943(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2215_appdir_fun2943, _ctx)
  return kk_function_dup(_fself);
}

static kk_string_t kk_std_os_path__mlift2215_appdir_fun2943(kk_function_t _fself, kk_std_os_path__path p00, kk_context_t* _ctx) {
  kk_unused(_fself);
  {
    kk_std_core__list _x12 = p00.parts;
    kk_std_core__list_dup(_x12);
    kk_std_os_path__path_drop(p00, _ctx);
    if (kk_std_core__is_Cons(_x12)) {
      struct kk_std_core_Cons* _con2944 = kk_std_core__as_Cons(_x12);
      kk_box_t _box_x2402 = _con2944->head;
      kk_std_core__list _pat03 = _con2944->tail;
      kk_string_t x = kk_string_unbox(_box_x2402);
      if (kk_likely(kk_std_core__list_is_unique(_x12))) {
        kk_std_core__list_drop(_pat03, _ctx);
        kk_std_core__list_free(_x12, _ctx);
      }
      else {
        kk_string_dup(x);
        kk_std_core__list_decref(_x12, _ctx);
      }
      return x;
    }
    {
      return kk_string_empty();
    }
  }
}


// lift anonymous function
struct kk_std_os_path__mlift2215_appdir_fun2949__t {
  struct kk_function_s _base;
  kk_function_t _b_2420_2403;
};
static kk_box_t kk_std_os_path__mlift2215_appdir_fun2949(kk_function_t _fself, kk_box_t _b_2405, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2215_appdir_fun2949(kk_function_t _b_2420_2403, kk_context_t* _ctx) {
  struct kk_std_os_path__mlift2215_appdir_fun2949__t* _self = kk_function_alloc_as(struct kk_std_os_path__mlift2215_appdir_fun2949__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_os_path__mlift2215_appdir_fun2949, kk_context());
  _self->_b_2420_2403 = _b_2420_2403;
  return &_self->_base;
}

static kk_box_t kk_std_os_path__mlift2215_appdir_fun2949(kk_function_t _fself, kk_box_t _b_2405, kk_context_t* _ctx) {
  struct kk_std_os_path__mlift2215_appdir_fun2949__t* _self = kk_function_as(struct kk_std_os_path__mlift2215_appdir_fun2949__t*, _fself);
  kk_function_t _b_2420_2403 = _self->_b_2420_2403; /* (p00 : std/os/path/path) -> string */
  kk_drop_match(_self, {kk_function_dup(_b_2420_2403);}, {}, _ctx)
  kk_string_t _x2950;
  kk_std_os_path__path _x2951 = kk_std_os_path__path_unbox(_b_2405, _ctx); /*std/os/path/path*/
  _x2950 = kk_function_call(kk_string_t, (kk_function_t, kk_std_os_path__path, kk_context_t*), _b_2420_2403, (_b_2420_2403, _x2951, _ctx)); /*string*/
  return kk_string_box(_x2950);
}


// lift anonymous function
struct kk_std_os_path__mlift2215_appdir_fun2955__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2215_appdir_fun2955(kk_function_t _fself, kk_box_t _b_2410, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2215_appdir_fun2955(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2215_appdir_fun2955, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2215_appdir_fun2955(kk_function_t _fself, kk_box_t _b_2410, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path p1_2428 = kk_std_os_path__path_unbox(_b_2410, _ctx); /*std/os/path/path*/;
  kk_std_os_path__path _x2956;
  kk_string_t _x2957;
  kk_std_core_types__optional _x2958 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x2958)) {
    kk_box_t _box_x2406 = _x2958._cons.Optional.value;
    kk_string_t _root_1050 = kk_string_unbox(_box_x2406);
    _x2957 = _root_1050; /*string*/
  }
  else {
    kk_string_t _x000 = p1_2428.root;
    kk_string_dup(_x000);
    _x2957 = _x000; /*string*/
  }
  kk_std_core__list _x2960;
  {
    kk_std_core__list _x2 = p1_2428.parts;
    kk_std_core__list_dup(_x2);
    kk_std_os_path__path_drop(p1_2428, _ctx);
    if (kk_std_core__is_Cons(_x2)) {
      struct kk_std_core_Cons* _con2961 = kk_std_core__as_Cons(_x2);
      kk_box_t _box_x2407 = _con2961->head;
      kk_std_core__list xx0 = _con2961->tail;
      if (kk_likely(kk_std_core__list_is_unique(_x2))) {
        kk_box_drop(_box_x2407, _ctx);
        kk_std_core__list_free(_x2, _ctx);
      }
      else {
        kk_std_core__list_dup(xx0);
        kk_std_core__list_decref(_x2, _ctx);
      }
      _x2960 = xx0; /*list<string>*/
    }
    else {
      _x2960 = kk_std_core__new_Nil(_ctx); /*list<string>*/
    }
  }
  _x2956 = kk_std_os_path__new_Path(_x2957, _x2960, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x2956, _ctx);
}


// lift anonymous function
struct kk_std_os_path__mlift2215_appdir_fun2963__t {
  struct kk_function_s _base;
};
static kk_string_t kk_std_os_path__mlift2215_appdir_fun2963(kk_function_t _fself, kk_std_os_path__path p10, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2215_appdir_fun2963(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2215_appdir_fun2963, _ctx)
  return kk_function_dup(_fself);
}

static kk_string_t kk_std_os_path__mlift2215_appdir_fun2963(kk_function_t _fself, kk_std_os_path__path p10, kk_context_t* _ctx) {
  kk_unused(_fself);
  {
    kk_std_core__list _x010 = p10.parts;
    kk_std_core__list_dup(_x010);
    kk_std_os_path__path_drop(p10, _ctx);
    if (kk_std_core__is_Cons(_x010)) {
      struct kk_std_core_Cons* _con2964 = kk_std_core__as_Cons(_x010);
      kk_box_t _box_x2411 = _con2964->head;
      kk_std_core__list _pat021 = _con2964->tail;
      kk_string_t x0 = kk_string_unbox(_box_x2411);
      if (kk_likely(kk_std_core__list_is_unique(_x010))) {
        kk_std_core__list_drop(_pat021, _ctx);
        kk_std_core__list_free(_x010, _ctx);
      }
      else {
        kk_string_dup(x0);
        kk_std_core__list_decref(_x010, _ctx);
      }
      return x0;
    }
    {
      return kk_string_empty();
    }
  }
}


// lift anonymous function
struct kk_std_os_path__mlift2215_appdir_fun2969__t {
  struct kk_function_s _base;
  kk_function_t _b_2424_2412;
};
static kk_box_t kk_std_os_path__mlift2215_appdir_fun2969(kk_function_t _fself, kk_box_t _b_2414, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2215_appdir_fun2969(kk_function_t _b_2424_2412, kk_context_t* _ctx) {
  struct kk_std_os_path__mlift2215_appdir_fun2969__t* _self = kk_function_alloc_as(struct kk_std_os_path__mlift2215_appdir_fun2969__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_os_path__mlift2215_appdir_fun2969, kk_context());
  _self->_b_2424_2412 = _b_2424_2412;
  return &_self->_base;
}

static kk_box_t kk_std_os_path__mlift2215_appdir_fun2969(kk_function_t _fself, kk_box_t _b_2414, kk_context_t* _ctx) {
  struct kk_std_os_path__mlift2215_appdir_fun2969__t* _self = kk_function_as(struct kk_std_os_path__mlift2215_appdir_fun2969__t*, _fself);
  kk_function_t _b_2424_2412 = _self->_b_2424_2412; /* (p10 : std/os/path/path) -> string */
  kk_drop_match(_self, {kk_function_dup(_b_2424_2412);}, {}, _ctx)
  kk_string_t _x2970;
  kk_std_os_path__path _x2971 = kk_std_os_path__path_unbox(_b_2414, _ctx); /*std/os/path/path*/
  _x2970 = kk_function_call(kk_string_t, (kk_function_t, kk_std_os_path__path, kk_context_t*), _b_2424_2412, (_b_2424_2412, _x2971, _ctx)); /*string*/
  return kk_string_box(_x2970);
}


// lift anonymous function
struct kk_std_os_path__mlift2215_appdir_fun2975__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2215_appdir_fun2975(kk_function_t _fself, kk_box_t _b_2419, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2215_appdir_fun2975(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2215_appdir_fun2975, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2215_appdir_fun2975(kk_function_t _fself, kk_box_t _b_2419, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path p2_2429 = kk_std_os_path__path_unbox(_b_2419, _ctx); /*std/os/path/path*/;
  kk_std_os_path__path _x2976;
  kk_string_t _x2977;
  kk_std_core_types__optional _x2978 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x2978)) {
    kk_box_t _box_x2415 = _x2978._cons.Optional.value;
    kk_string_t _root_1051 = kk_string_unbox(_box_x2415);
    _x2977 = _root_1051; /*string*/
  }
  else {
    kk_string_t _x020 = p2_2429.root;
    kk_string_dup(_x020);
    _x2977 = _x020; /*string*/
  }
  kk_std_core__list _x2980;
  {
    kk_std_core__list _x3 = p2_2429.parts;
    kk_std_core__list_dup(_x3);
    kk_std_os_path__path_drop(p2_2429, _ctx);
    if (kk_std_core__is_Cons(_x3)) {
      struct kk_std_core_Cons* _con2981 = kk_std_core__as_Cons(_x3);
      kk_box_t _box_x2416 = _con2981->head;
      kk_std_core__list xx1 = _con2981->tail;
      if (kk_likely(kk_std_core__list_is_unique(_x3))) {
        kk_box_drop(_box_x2416, _ctx);
        kk_std_core__list_free(_x3, _ctx);
      }
      else {
        kk_std_core__list_dup(xx1);
        kk_std_core__list_decref(_x3, _ctx);
      }
      _x2980 = xx1; /*list<string>*/
    }
    else {
      _x2980 = kk_std_core__new_Nil(_ctx); /*list<string>*/
    }
  }
  _x2976 = kk_std_os_path__new_Path(_x2977, _x2980, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x2976, _ctx);
}

kk_std_os_path__path kk_std_os_path__mlift2215_appdir(kk_string_t _y_2172, kk_context_t* _ctx) { /* (string) -> io path */ 
  kk_std_os_path__path _x1_2194;
  kk_box_t _x2929 = kk_std_core_hnd__open_none1(kk_std_os_path__new_mlift2215_appdir_fun2930(_ctx), kk_string_box(_y_2172), _ctx); /*3357*/
  _x1_2194 = kk_std_os_path__path_unbox(_x2929, _ctx); /*std/os/path/path*/
  kk_std_os_path__path p0;
  kk_box_t _x2933 = kk_std_core_hnd__open_none1(kk_std_os_path__new_mlift2215_appdir_fun2934(_ctx), kk_std_os_path__path_box(_x1_2194, _ctx), _ctx); /*3357*/
  p0 = kk_std_os_path__path_unbox(_x2933, _ctx); /*std/os/path/path*/
  kk_function_t _b_2420_2403 = kk_std_os_path__new_mlift2215_appdir_fun2943(_ctx); /*(p00 : std/os/path/path) -> string*/;
  kk_std_os_path__path _b_2421_2404 = kk_std_os_path__path_dup(p0); /*std/os/path/path*/;
  bool _match_2652;
  kk_string_t _x2947;
  kk_box_t _x2948 = kk_std_core_hnd__open_none1(kk_std_os_path__new_mlift2215_appdir_fun2949(_b_2420_2403, _ctx), kk_std_os_path__path_box(_b_2421_2404, _ctx), _ctx); /*3357*/
  _x2947 = kk_string_unbox(_x2948); /*string*/
  kk_string_t _x2952;
  kk_define_string_literal(, _s2953, 3, "bin")
  _x2952 = kk_string_dup(_s2953); /*string*/
  _match_2652 = kk_string_is_eq(_x2947,_x2952,kk_context()); /*bool*/
  if (_match_2652) {
    kk_box_t _x2954 = kk_std_core_hnd__open_none1(kk_std_os_path__new_mlift2215_appdir_fun2955(_ctx), kk_std_os_path__path_box(p0, _ctx), _ctx); /*3357*/
    return kk_std_os_path__path_unbox(_x2954, _ctx);
  }
  {
    kk_function_t _b_2424_2412 = kk_std_os_path__new_mlift2215_appdir_fun2963(_ctx); /*(p10 : std/os/path/path) -> string*/;
    kk_std_os_path__path _b_2425_2413 = kk_std_os_path__path_dup(p0); /*std/os/path/path*/;
    bool _match_2653;
    kk_string_t _x2967;
    kk_box_t _x2968 = kk_std_core_hnd__open_none1(kk_std_os_path__new_mlift2215_appdir_fun2969(_b_2424_2412, _ctx), kk_std_os_path__path_box(_b_2425_2413, _ctx), _ctx); /*3357*/
    _x2967 = kk_string_unbox(_x2968); /*string*/
    kk_string_t _x2972;
    kk_define_string_literal(, _s2973, 3, "exe")
    _x2972 = kk_string_dup(_s2973); /*string*/
    _match_2653 = kk_string_is_eq(_x2967,_x2972,kk_context()); /*bool*/
    if (_match_2653) {
      kk_box_t _x2974 = kk_std_core_hnd__open_none1(kk_std_os_path__new_mlift2215_appdir_fun2975(_ctx), kk_std_os_path__path_box(p0, _ctx), _ctx); /*3357*/
      return kk_std_os_path__path_unbox(_x2974, _ctx);
    }
    {
      return p0;
    }
  }
}
 
// Return the base directory that contains the currently running application.
// First tries `app-path().nobase`; if that ends in the ``bin`` or ``exe`` directory it
// returns the parent of that directory.


// lift anonymous function
struct kk_std_os_path_appdir_fun2984__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_appdir_fun2984(kk_function_t _fself, kk_box_t _b_2431, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_appdir_fun2984(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_appdir_fun2984, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_appdir_fun2984(kk_function_t _fself, kk_box_t _b_2431, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x2985;
  kk_string_t _x2986 = kk_string_unbox(_b_2431); /*string*/
  _x2985 = kk_std_os_path__mlift2215_appdir(_x2986, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x2985, _ctx);
}


// lift anonymous function
struct kk_std_os_path_appdir_fun2988__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_appdir_fun2988(kk_function_t _fself, kk_box_t _b_2434, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_appdir_fun2988(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_appdir_fun2988, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_appdir_fun2988(kk_function_t _fself, kk_box_t _b_2434, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x2989;
  kk_string_t _x2990 = kk_string_unbox(_b_2434); /*string*/
  _x2989 = kk_std_os_path_path(_x2990, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x2989, _ctx);
}


// lift anonymous function
struct kk_std_os_path_appdir_fun2992__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_appdir_fun2992(kk_function_t _fself, kk_box_t _b_2441, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_appdir_fun2992(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_appdir_fun2992, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_appdir_fun2992(kk_function_t _fself, kk_box_t _b_2441, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x2993;
  kk_string_t _x2994;
  kk_std_core_types__optional _x2995 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x2995)) {
    kk_box_t _box_x2437 = _x2995._cons.Optional.value;
    kk_string_t _root_105 = kk_string_unbox(_box_x2437);
    _x2994 = _root_105; /*string*/
  }
  else {
    kk_std_os_path__path _match_2651;
    kk_box_t _x2997 = kk_box_dup(_b_2441); /*3356*/
    _match_2651 = kk_std_os_path__path_unbox(_x2997, _ctx); /*std/os/path/path*/
    {
      kk_string_t _x00 = _match_2651.root;
      kk_string_dup(_x00);
      kk_std_os_path__path_drop(_match_2651, _ctx);
      _x2994 = _x00; /*string*/
    }
  }
  kk_std_core__list _x2998;
  kk_std_os_path__path _match_2649 = kk_std_os_path__path_unbox(_b_2441, _ctx); /*std/os/path/path*/;
  {
    kk_std_core__list _x = _match_2649.parts;
    kk_std_core__list_dup(_x);
    kk_std_os_path__path_drop(_match_2649, _ctx);
    if (kk_std_core__is_Cons(_x)) {
      struct kk_std_core_Cons* _con2999 = kk_std_core__as_Cons(_x);
      kk_box_t _box_x2438 = _con2999->head;
      kk_std_core__list xx = _con2999->tail;
      if (kk_likely(kk_std_core__list_is_unique(_x))) {
        kk_box_drop(_box_x2438, _ctx);
        kk_std_core__list_free(_x, _ctx);
      }
      else {
        kk_std_core__list_dup(xx);
        kk_std_core__list_decref(_x, _ctx);
      }
      _x2998 = xx; /*list<string>*/
    }
    else {
      _x2998 = kk_std_core__new_Nil(_ctx); /*list<string>*/
    }
  }
  _x2993 = kk_std_os_path__new_Path(_x2994, _x2998, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x2993, _ctx);
}


// lift anonymous function
struct kk_std_os_path_appdir_fun3001__t {
  struct kk_function_s _base;
};
static kk_string_t kk_std_os_path_appdir_fun3001(kk_function_t _fself, kk_std_os_path__path p00, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_appdir_fun3001(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_appdir_fun3001, _ctx)
  return kk_function_dup(_fself);
}

static kk_string_t kk_std_os_path_appdir_fun3001(kk_function_t _fself, kk_std_os_path__path p00, kk_context_t* _ctx) {
  kk_unused(_fself);
  {
    kk_std_core__list _x12 = p00.parts;
    kk_std_core__list_dup(_x12);
    kk_std_os_path__path_drop(p00, _ctx);
    if (kk_std_core__is_Cons(_x12)) {
      struct kk_std_core_Cons* _con3002 = kk_std_core__as_Cons(_x12);
      kk_box_t _box_x2445 = _con3002->head;
      kk_std_core__list _pat030 = _con3002->tail;
      kk_string_t x0 = kk_string_unbox(_box_x2445);
      if (kk_likely(kk_std_core__list_is_unique(_x12))) {
        kk_std_core__list_drop(_pat030, _ctx);
        kk_std_core__list_free(_x12, _ctx);
      }
      else {
        kk_string_dup(x0);
        kk_std_core__list_decref(_x12, _ctx);
      }
      return x0;
    }
    {
      return kk_string_empty();
    }
  }
}


// lift anonymous function
struct kk_std_os_path_appdir_fun3007__t {
  struct kk_function_s _base;
  kk_function_t _b_2464_2446;
};
static kk_box_t kk_std_os_path_appdir_fun3007(kk_function_t _fself, kk_box_t _b_2448, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_appdir_fun3007(kk_function_t _b_2464_2446, kk_context_t* _ctx) {
  struct kk_std_os_path_appdir_fun3007__t* _self = kk_function_alloc_as(struct kk_std_os_path_appdir_fun3007__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_os_path_appdir_fun3007, kk_context());
  _self->_b_2464_2446 = _b_2464_2446;
  return &_self->_base;
}

static kk_box_t kk_std_os_path_appdir_fun3007(kk_function_t _fself, kk_box_t _b_2448, kk_context_t* _ctx) {
  struct kk_std_os_path_appdir_fun3007__t* _self = kk_function_as(struct kk_std_os_path_appdir_fun3007__t*, _fself);
  kk_function_t _b_2464_2446 = _self->_b_2464_2446; /* (p00 : std/os/path/path) -> string */
  kk_drop_match(_self, {kk_function_dup(_b_2464_2446);}, {}, _ctx)
  kk_string_t _x3008;
  kk_std_os_path__path _x3009 = kk_std_os_path__path_unbox(_b_2448, _ctx); /*std/os/path/path*/
  _x3008 = kk_function_call(kk_string_t, (kk_function_t, kk_std_os_path__path, kk_context_t*), _b_2464_2446, (_b_2464_2446, _x3009, _ctx)); /*string*/
  return kk_string_box(_x3008);
}


// lift anonymous function
struct kk_std_os_path_appdir_fun3013__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_appdir_fun3013(kk_function_t _fself, kk_box_t _b_2453, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_appdir_fun3013(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_appdir_fun3013, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_appdir_fun3013(kk_function_t _fself, kk_box_t _b_2453, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path p1_2472 = kk_std_os_path__path_unbox(_b_2453, _ctx); /*std/os/path/path*/;
  kk_std_os_path__path _x3014;
  kk_string_t _x3015;
  kk_std_core_types__optional _x3016 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x3016)) {
    kk_box_t _box_x2449 = _x3016._cons.Optional.value;
    kk_string_t _root_1050 = kk_string_unbox(_box_x2449);
    _x3015 = _root_1050; /*string*/
  }
  else {
    kk_string_t _x000 = p1_2472.root;
    kk_string_dup(_x000);
    _x3015 = _x000; /*string*/
  }
  kk_std_core__list _x3018;
  {
    kk_std_core__list _x2 = p1_2472.parts;
    kk_std_core__list_dup(_x2);
    kk_std_os_path__path_drop(p1_2472, _ctx);
    if (kk_std_core__is_Cons(_x2)) {
      struct kk_std_core_Cons* _con3019 = kk_std_core__as_Cons(_x2);
      kk_box_t _box_x2450 = _con3019->head;
      kk_std_core__list xx0 = _con3019->tail;
      if (kk_likely(kk_std_core__list_is_unique(_x2))) {
        kk_box_drop(_box_x2450, _ctx);
        kk_std_core__list_free(_x2, _ctx);
      }
      else {
        kk_std_core__list_dup(xx0);
        kk_std_core__list_decref(_x2, _ctx);
      }
      _x3018 = xx0; /*list<string>*/
    }
    else {
      _x3018 = kk_std_core__new_Nil(_ctx); /*list<string>*/
    }
  }
  _x3014 = kk_std_os_path__new_Path(_x3015, _x3018, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3014, _ctx);
}


// lift anonymous function
struct kk_std_os_path_appdir_fun3021__t {
  struct kk_function_s _base;
};
static kk_string_t kk_std_os_path_appdir_fun3021(kk_function_t _fself, kk_std_os_path__path p10, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_appdir_fun3021(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_appdir_fun3021, _ctx)
  return kk_function_dup(_fself);
}

static kk_string_t kk_std_os_path_appdir_fun3021(kk_function_t _fself, kk_std_os_path__path p10, kk_context_t* _ctx) {
  kk_unused(_fself);
  {
    kk_std_core__list _x010 = p10.parts;
    kk_std_core__list_dup(_x010);
    kk_std_os_path__path_drop(p10, _ctx);
    if (kk_std_core__is_Cons(_x010)) {
      struct kk_std_core_Cons* _con3022 = kk_std_core__as_Cons(_x010);
      kk_box_t _box_x2454 = _con3022->head;
      kk_std_core__list _pat021 = _con3022->tail;
      kk_string_t x00 = kk_string_unbox(_box_x2454);
      if (kk_likely(kk_std_core__list_is_unique(_x010))) {
        kk_std_core__list_drop(_pat021, _ctx);
        kk_std_core__list_free(_x010, _ctx);
      }
      else {
        kk_string_dup(x00);
        kk_std_core__list_decref(_x010, _ctx);
      }
      return x00;
    }
    {
      return kk_string_empty();
    }
  }
}


// lift anonymous function
struct kk_std_os_path_appdir_fun3027__t {
  struct kk_function_s _base;
  kk_function_t _b_2468_2455;
};
static kk_box_t kk_std_os_path_appdir_fun3027(kk_function_t _fself, kk_box_t _b_2457, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_appdir_fun3027(kk_function_t _b_2468_2455, kk_context_t* _ctx) {
  struct kk_std_os_path_appdir_fun3027__t* _self = kk_function_alloc_as(struct kk_std_os_path_appdir_fun3027__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_os_path_appdir_fun3027, kk_context());
  _self->_b_2468_2455 = _b_2468_2455;
  return &_self->_base;
}

static kk_box_t kk_std_os_path_appdir_fun3027(kk_function_t _fself, kk_box_t _b_2457, kk_context_t* _ctx) {
  struct kk_std_os_path_appdir_fun3027__t* _self = kk_function_as(struct kk_std_os_path_appdir_fun3027__t*, _fself);
  kk_function_t _b_2468_2455 = _self->_b_2468_2455; /* (p10 : std/os/path/path) -> string */
  kk_drop_match(_self, {kk_function_dup(_b_2468_2455);}, {}, _ctx)
  kk_string_t _x3028;
  kk_std_os_path__path _x3029 = kk_std_os_path__path_unbox(_b_2457, _ctx); /*std/os/path/path*/
  _x3028 = kk_function_call(kk_string_t, (kk_function_t, kk_std_os_path__path, kk_context_t*), _b_2468_2455, (_b_2468_2455, _x3029, _ctx)); /*string*/
  return kk_string_box(_x3028);
}


// lift anonymous function
struct kk_std_os_path_appdir_fun3033__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_appdir_fun3033(kk_function_t _fself, kk_box_t _b_2462, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_appdir_fun3033(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_appdir_fun3033, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_appdir_fun3033(kk_function_t _fself, kk_box_t _b_2462, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path p2_2473 = kk_std_os_path__path_unbox(_b_2462, _ctx); /*std/os/path/path*/;
  kk_std_os_path__path _x3034;
  kk_string_t _x3035;
  kk_std_core_types__optional _x3036 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x3036)) {
    kk_box_t _box_x2458 = _x3036._cons.Optional.value;
    kk_string_t _root_1051 = kk_string_unbox(_box_x2458);
    _x3035 = _root_1051; /*string*/
  }
  else {
    kk_string_t _x020 = p2_2473.root;
    kk_string_dup(_x020);
    _x3035 = _x020; /*string*/
  }
  kk_std_core__list _x3038;
  {
    kk_std_core__list _x3 = p2_2473.parts;
    kk_std_core__list_dup(_x3);
    kk_std_os_path__path_drop(p2_2473, _ctx);
    if (kk_std_core__is_Cons(_x3)) {
      struct kk_std_core_Cons* _con3039 = kk_std_core__as_Cons(_x3);
      kk_box_t _box_x2459 = _con3039->head;
      kk_std_core__list xx1 = _con3039->tail;
      if (kk_likely(kk_std_core__list_is_unique(_x3))) {
        kk_box_drop(_box_x2459, _ctx);
        kk_std_core__list_free(_x3, _ctx);
      }
      else {
        kk_std_core__list_dup(xx1);
        kk_std_core__list_decref(_x3, _ctx);
      }
      _x3038 = xx1; /*list<string>*/
    }
    else {
      _x3038 = kk_std_core__new_Nil(_ctx); /*list<string>*/
    }
  }
  _x3034 = kk_std_os_path__new_Path(_x3035, _x3038, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3034, _ctx);
}

kk_std_os_path__path kk_std_os_path_appdir(kk_context_t* _ctx) { /* () -> io path */ 
  kk_string_t x_2245 = kk_std_os_path_xapp_path(_ctx); /*string*/;
  if (kk_yielding(kk_context())) {
    kk_string_drop(x_2245, _ctx);
    kk_box_t _x2983 = kk_std_core_hnd_yield_extend(kk_std_os_path_new_appdir_fun2984(_ctx), _ctx); /*3926*/
    return kk_std_os_path__path_unbox(_x2983, _ctx);
  }
  {
    kk_std_os_path__path _x1_2194;
    kk_box_t _x2987 = kk_std_core_hnd__open_none1(kk_std_os_path_new_appdir_fun2988(_ctx), kk_string_box(x_2245), _ctx); /*3357*/
    _x1_2194 = kk_std_os_path__path_unbox(_x2987, _ctx); /*std/os/path/path*/
    kk_std_os_path__path p0;
    kk_box_t _x2991 = kk_std_core_hnd__open_none1(kk_std_os_path_new_appdir_fun2992(_ctx), kk_std_os_path__path_box(_x1_2194, _ctx), _ctx); /*3357*/
    p0 = kk_std_os_path__path_unbox(_x2991, _ctx); /*std/os/path/path*/
    kk_function_t _b_2464_2446 = kk_std_os_path_new_appdir_fun3001(_ctx); /*(p00 : std/os/path/path) -> string*/;
    kk_std_os_path__path _b_2465_2447 = kk_std_os_path__path_dup(p0); /*std/os/path/path*/;
    bool _match_2645;
    kk_string_t _x3005;
    kk_box_t _x3006 = kk_std_core_hnd__open_none1(kk_std_os_path_new_appdir_fun3007(_b_2464_2446, _ctx), kk_std_os_path__path_box(_b_2465_2447, _ctx), _ctx); /*3357*/
    _x3005 = kk_string_unbox(_x3006); /*string*/
    kk_string_t _x3010;
    kk_define_string_literal(, _s3011, 3, "bin")
    _x3010 = kk_string_dup(_s3011); /*string*/
    _match_2645 = kk_string_is_eq(_x3005,_x3010,kk_context()); /*bool*/
    if (_match_2645) {
      kk_box_t _x3012 = kk_std_core_hnd__open_none1(kk_std_os_path_new_appdir_fun3013(_ctx), kk_std_os_path__path_box(p0, _ctx), _ctx); /*3357*/
      return kk_std_os_path__path_unbox(_x3012, _ctx);
    }
    {
      kk_function_t _b_2468_2455 = kk_std_os_path_new_appdir_fun3021(_ctx); /*(p10 : std/os/path/path) -> string*/;
      kk_std_os_path__path _b_2469_2456 = kk_std_os_path__path_dup(p0); /*std/os/path/path*/;
      bool _match_2646;
      kk_string_t _x3025;
      kk_box_t _x3026 = kk_std_core_hnd__open_none1(kk_std_os_path_new_appdir_fun3027(_b_2468_2455, _ctx), kk_std_os_path__path_box(_b_2469_2456, _ctx), _ctx); /*3357*/
      _x3025 = kk_string_unbox(_x3026); /*string*/
      kk_string_t _x3030;
      kk_define_string_literal(, _s3031, 3, "exe")
      _x3030 = kk_string_dup(_s3031); /*string*/
      _match_2646 = kk_string_is_eq(_x3025,_x3030,kk_context()); /*bool*/
      if (_match_2646) {
        kk_box_t _x3032 = kk_std_core_hnd__open_none1(kk_std_os_path_new_appdir_fun3033(_ctx), kk_std_os_path__path_box(p0, _ctx), _ctx); /*3357*/
        return kk_std_os_path__path_unbox(_x3032, _ctx);
      }
      {
        return p0;
      }
    }
  }
}
 
// Change the base name of a path

kk_std_os_path__path kk_std_os_path_change_base(kk_std_os_path__path p, kk_string_t basename0, kk_context_t* _ctx) { /* (p : path, basename : string) -> path */ 
  kk_std_os_path__path q;
  kk_string_t _x3041;
  kk_std_core_types__optional _x3042 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x3042)) {
    kk_box_t _box_x2474 = _x3042._cons.Optional.value;
    kk_string_t _root_105 = kk_string_unbox(_box_x2474);
    _x3041 = _root_105; /*string*/
  }
  else {
    kk_string_t _x0 = p.root;
    kk_string_dup(_x0);
    _x3041 = _x0; /*string*/
  }
  kk_std_core__list _x3044;
  {
    kk_std_core__list _x = p.parts;
    kk_std_core__list_dup(_x);
    kk_std_os_path__path_drop(p, _ctx);
    if (kk_std_core__is_Cons(_x)) {
      struct kk_std_core_Cons* _con3045 = kk_std_core__as_Cons(_x);
      kk_box_t _box_x2475 = _con3045->head;
      kk_std_core__list xx = _con3045->tail;
      if (kk_likely(kk_std_core__list_is_unique(_x))) {
        kk_box_drop(_box_x2475, _ctx);
        kk_std_core__list_free(_x, _ctx);
      }
      else {
        kk_std_core__list_dup(xx);
        kk_std_core__list_decref(_x, _ctx);
      }
      _x3044 = xx; /*list<string>*/
    }
    else {
      _x3044 = kk_std_core__new_Nil(_ctx); /*list<string>*/
    }
  }
  q = kk_std_os_path__new_Path(_x3041, _x3044, _ctx); /*std/os/path/path*/
  kk_vector_t v_17122;
  kk_string_t _x3047;
  kk_define_string_literal(, _s3048, 1, "/")
  _x3047 = kk_string_dup(_s3048); /*string*/
  v_17122 = kk_string_splitv(basename0,_x3047,kk_context()); /*vector<string>*/
  kk_std_core__list parts0;
  kk_std_core__list _x3049 = kk_std_core_vlist(v_17122, kk_std_core_types__new_None(_ctx), _ctx); /*list<2142>*/
  kk_std_core__list _x3050;
  {
    kk_std_core__list _x00 = q.parts;
    kk_std_core__list_dup(_x00);
    _x3050 = _x00; /*list<string>*/
  }
  parts0 = kk_std_os_path_push_parts(_x3049, _x3050, _ctx); /*list<string>*/
  kk_string_t _x3051;
  {
    kk_string_t _x1 = q.root;
    kk_string_dup(_x1);
    kk_std_os_path__path_drop(q, _ctx);
    _x3051 = _x1; /*string*/
  }
  return kk_std_os_path__new_Path(_x3051, parts0, _ctx);
}

kk_std_core_types__tuple2_ kk_std_os_path_split_base(kk_string_t basename0, kk_context_t* _ctx) { /* (basename : string) -> (string, string) */ 
  kk_std_core_types__maybe _match_2642;
  kk_string_t _x3052 = kk_string_dup(basename0); /*string*/
  kk_string_t _x3053;
  kk_define_string_literal(, _s3054, 1, ".")
  _x3053 = kk_string_dup(_s3054); /*string*/
  _match_2642 = kk_std_core_find_last(_x3052, _x3053, _ctx); /*maybe<sslice>*/
  if (kk_std_core_types__is_Just(_match_2642)) {
    kk_box_t _box_x2476 = _match_2642._cons.Just.value;
    kk_std_core__sslice slice = kk_std_core__sslice_unbox(_box_x2476, NULL);
    kk_string_drop(basename0, _ctx);
    kk_std_core__sslice_dup(slice);
    kk_std_core_types__maybe_drop(_match_2642, _ctx);
    kk_string_t _b_2481_2477;
    kk_std_core__sslice _x3056;
    {
      kk_string_t s = slice.str;
      kk_ssize_t start0 = slice.start;
      kk_string_dup(s);
      kk_ssize_t _x3057 = (KK_IZ(0)); /*ssize_t*/
      _x3056 = kk_std_core__new_Sslice(s, _x3057, start0, _ctx); /*sslice*/
    }
    _b_2481_2477 = kk_std_core_string_3(_x3056, _ctx); /*string*/
    kk_string_t _b_2482_2478;
    kk_std_core__sslice _x3058 = kk_std_core_after(slice, _ctx); /*sslice*/
    _b_2482_2478 = kk_std_core_string_3(_x3058, _ctx); /*string*/
    return kk_std_core_types__new_dash__lp__comma__rp_(kk_string_box(_b_2481_2477), kk_string_box(_b_2482_2478), _ctx);
  }
  {
    kk_box_t _x3059;
    kk_string_t _x3060 = kk_string_empty(); /*string*/
    _x3059 = kk_string_box(_x3060); /*7*/
    return kk_std_core_types__new_dash__lp__comma__rp_(kk_string_box(basename0), _x3059, _ctx);
  }
}
 
// Change the extension of a path.
// Only adds a dot if the extname does not already start with a dot.

kk_std_os_path__path kk_std_os_path_change_ext(kk_std_os_path__path p, kk_string_t extname0, kk_context_t* _ctx) { /* (p : path, extname : string) -> path */ 
  kk_std_core_types__tuple2_ _match_2641;
  kk_string_t _x3062;
  {
    kk_std_core__list _x = p.parts;
    kk_std_core__list_dup(_x);
    if (kk_std_core__is_Cons(_x)) {
      struct kk_std_core_Cons* _con3063 = kk_std_core__as_Cons(_x);
      kk_box_t _box_x2485 = _con3063->head;
      kk_std_core__list _pat0 = _con3063->tail;
      kk_string_t x = kk_string_unbox(_box_x2485);
      if (kk_likely(kk_std_core__list_is_unique(_x))) {
        kk_std_core__list_drop(_pat0, _ctx);
        kk_std_core__list_free(_x, _ctx);
      }
      else {
        kk_string_dup(x);
        kk_std_core__list_decref(_x, _ctx);
      }
      _x3062 = x; /*string*/
    }
    else {
      _x3062 = kk_string_empty(); /*string*/
    }
  }
  _match_2641 = kk_std_os_path_split_base(_x3062, _ctx); /*(string, string)*/
  {
    kk_box_t _box_x2486 = _match_2641.fst;
    kk_box_t _box_x2487 = _match_2641.snd;
    kk_string_t stemname0 = kk_string_unbox(_box_x2486);
    kk_string_dup(stemname0);
    kk_std_core_types__tuple2__drop(_match_2641, _ctx);
    kk_std_core_types__maybe m_2102;
    kk_string_t _x3068 = kk_string_dup(extname0); /*string*/
    kk_string_t _x3069;
    kk_define_string_literal(, _s3070, 1, ".")
    _x3069 = kk_string_dup(_s3070); /*string*/
    m_2102 = kk_std_core_starts_with(_x3068, _x3069, _ctx); /*maybe<sslice>*/
    kk_string_t newext;
    if (kk_std_core_types__is_Nothing(m_2102)) {
      kk_string_t _x3071;
      kk_define_string_literal(, _s3072, 1, ".")
      _x3071 = kk_string_dup(_s3072); /*string*/
      newext = kk_std_core__lp__plus__plus__1_rp_(_x3071, extname0, _ctx); /*string*/
    }
    else {
      kk_std_core_types__maybe_drop(m_2102, _ctx);
      newext = extname0; /*string*/
    }
    kk_string_t s_2104 = kk_std_core__lp__plus__plus__1_rp_(stemname0, newext, _ctx); /*string*/;
    kk_vector_t v_17122;
    kk_string_t _x3073;
    kk_define_string_literal(, _s3074, 1, "/")
    _x3073 = kk_string_dup(_s3074); /*string*/
    v_17122 = kk_string_splitv(s_2104,_x3073,kk_context()); /*vector<string>*/
    kk_std_core__list parts1;
    kk_std_core__list _x3075 = kk_std_core_vlist(v_17122, kk_std_core_types__new_None(_ctx), _ctx); /*list<2142>*/
    kk_std_core__list _x3076;
    {
      kk_std_core__list _x0 = p.parts;
      kk_std_core__list_dup(_x0);
      if (kk_std_core__is_Cons(_x0)) {
        struct kk_std_core_Cons* _con3077 = kk_std_core__as_Cons(_x0);
        kk_box_t _box_x2488 = _con3077->head;
        kk_std_core__list xx = _con3077->tail;
        if (kk_likely(kk_std_core__list_is_unique(_x0))) {
          kk_box_drop(_box_x2488, _ctx);
          kk_std_core__list_free(_x0, _ctx);
        }
        else {
          kk_std_core__list_dup(xx);
          kk_std_core__list_decref(_x0, _ctx);
        }
        _x3076 = xx; /*list<string>*/
      }
      else {
        _x3076 = kk_std_core__new_Nil(_ctx); /*list<string>*/
      }
    }
    parts1 = kk_std_os_path_push_parts(_x3075, _x3076, _ctx); /*list<string>*/
    kk_string_t _x3079;
    {
      kk_string_t _x00 = p.root;
      kk_string_dup(_x00);
      kk_std_os_path__path_drop(p, _ctx);
      _x3079 = _x00; /*string*/
    }
    return kk_std_os_path__new_Path(_x3079, parts1, _ctx);
  }
}
 
// Return the extension of path (without the preceding dot (`'.'`))
// `"/foo/bar.svg.txt".path.extname === "txt"`

kk_string_t kk_std_os_path_extname(kk_std_os_path__path p, kk_context_t* _ctx) { /* (p : path) -> string */ 
  kk_std_core_types__tuple2_ _this_2109;
  kk_string_t _x3080;
  {
    kk_std_core__list _x0 = p.parts;
    kk_std_core__list_dup(_x0);
    kk_std_os_path__path_drop(p, _ctx);
    if (kk_std_core__is_Cons(_x0)) {
      struct kk_std_core_Cons* _con3081 = kk_std_core__as_Cons(_x0);
      kk_box_t _box_x2489 = _con3081->head;
      kk_std_core__list _pat00 = _con3081->tail;
      kk_string_t x = kk_string_unbox(_box_x2489);
      if (kk_likely(kk_std_core__list_is_unique(_x0))) {
        kk_std_core__list_drop(_pat00, _ctx);
        kk_std_core__list_free(_x0, _ctx);
      }
      else {
        kk_string_dup(x);
        kk_std_core__list_decref(_x0, _ctx);
      }
      _x3080 = x; /*string*/
    }
    else {
      _x3080 = kk_string_empty(); /*string*/
    }
  }
  _this_2109 = kk_std_os_path_split_base(_x3080, _ctx); /*(string, string)*/
  {
    kk_box_t _box_x2490 = _this_2109.fst;
    kk_box_t _box_x2491 = _this_2109.snd;
    kk_string_t _x = kk_string_unbox(_box_x2491);
    kk_string_dup(_x);
    kk_std_core_types__tuple2__drop(_this_2109, _ctx);
    return _x;
  }
}
 
// Change the stem name of a path

kk_std_os_path__path kk_std_os_path_change_stem(kk_std_os_path__path p, kk_string_t stemname0, kk_context_t* _ctx) { /* (p : path, stemname : string) -> path */ 
  kk_std_core_types__tuple2_ _this_2109;
  kk_string_t _x3086;
  {
    kk_std_core__list _x0 = p.parts;
    kk_std_core__list_dup(_x0);
    if (kk_std_core__is_Cons(_x0)) {
      struct kk_std_core_Cons* _con3087 = kk_std_core__as_Cons(_x0);
      kk_box_t _box_x2492 = _con3087->head;
      kk_std_core__list _pat00 = _con3087->tail;
      kk_string_t x = kk_string_unbox(_box_x2492);
      if (kk_likely(kk_std_core__list_is_unique(_x0))) {
        kk_std_core__list_drop(_pat00, _ctx);
        kk_std_core__list_free(_x0, _ctx);
      }
      else {
        kk_string_dup(x);
        kk_std_core__list_decref(_x0, _ctx);
      }
      _x3086 = x; /*string*/
    }
    else {
      _x3086 = kk_string_empty(); /*string*/
    }
  }
  _this_2109 = kk_std_os_path_split_base(_x3086, _ctx); /*(string, string)*/
  kk_string_t basename0_2249;
  kk_string_t _x3090;
  bool _match_2640;
  kk_string_t _x3091;
  {
    kk_box_t _box_x2493 = _this_2109.fst;
    kk_box_t _box_x2494 = _this_2109.snd;
    kk_string_t _x2 = kk_string_unbox(_box_x2494);
    kk_string_dup(_x2);
    _x3091 = _x2; /*string*/
  }
  kk_string_t _x3094 = kk_string_empty(); /*string*/
  _match_2640 = kk_string_is_eq(_x3091,_x3094,kk_context()); /*bool*/
  if (_match_2640) {
    kk_std_core_types__tuple2__drop(_this_2109, _ctx);
    _x3090 = kk_string_empty(); /*string*/
  }
  else {
    kk_string_t _x3097;
    kk_define_string_literal(, _s3098, 1, ".")
    _x3097 = kk_string_dup(_s3098); /*string*/
    kk_string_t _x3099;
    {
      kk_box_t _box_x2495 = _this_2109.fst;
      kk_box_t _box_x2496 = _this_2109.snd;
      kk_string_t _x10 = kk_string_unbox(_box_x2496);
      kk_string_dup(_x10);
      kk_std_core_types__tuple2__drop(_this_2109, _ctx);
      _x3099 = _x10; /*string*/
    }
    _x3090 = kk_std_core__lp__plus__plus__1_rp_(_x3097, _x3099, _ctx); /*string*/
  }
  basename0_2249 = kk_std_core__lp__plus__plus__1_rp_(stemname0, _x3090, _ctx); /*string*/
  kk_std_os_path__path q;
  kk_string_t _x3102;
  kk_std_core_types__optional _x3103 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
  if (kk_std_core_types__is_Optional(_x3103)) {
    kk_box_t _box_x2497 = _x3103._cons.Optional.value;
    kk_string_t _root_105 = kk_string_unbox(_box_x2497);
    _x3102 = _root_105; /*string*/
  }
  else {
    kk_string_t _x00 = p.root;
    kk_string_dup(_x00);
    _x3102 = _x00; /*string*/
  }
  kk_std_core__list _x3105;
  {
    kk_std_core__list _x = p.parts;
    kk_std_core__list_dup(_x);
    kk_std_os_path__path_drop(p, _ctx);
    if (kk_std_core__is_Cons(_x)) {
      struct kk_std_core_Cons* _con3106 = kk_std_core__as_Cons(_x);
      kk_box_t _box_x2498 = _con3106->head;
      kk_std_core__list xx = _con3106->tail;
      if (kk_likely(kk_std_core__list_is_unique(_x))) {
        kk_box_drop(_box_x2498, _ctx);
        kk_std_core__list_free(_x, _ctx);
      }
      else {
        kk_std_core__list_dup(xx);
        kk_std_core__list_decref(_x, _ctx);
      }
      _x3105 = xx; /*list<string>*/
    }
    else {
      _x3105 = kk_std_core__new_Nil(_ctx); /*list<string>*/
    }
  }
  q = kk_std_os_path__new_Path(_x3102, _x3105, _ctx); /*std/os/path/path*/
  kk_vector_t v_17122;
  kk_string_t _x3108;
  kk_define_string_literal(, _s3109, 1, "/")
  _x3108 = kk_string_dup(_s3109); /*string*/
  v_17122 = kk_string_splitv(basename0_2249,_x3108,kk_context()); /*vector<string>*/
  kk_std_core__list parts0;
  kk_std_core__list _x3110 = kk_std_core_vlist(v_17122, kk_std_core_types__new_None(_ctx), _ctx); /*list<2142>*/
  kk_std_core__list _x3111;
  {
    kk_std_core__list _x000 = q.parts;
    kk_std_core__list_dup(_x000);
    _x3111 = _x000; /*list<string>*/
  }
  parts0 = kk_std_os_path_push_parts(_x3110, _x3111, _ctx); /*list<string>*/
  kk_string_t _x3112;
  {
    kk_string_t _x1 = q.root;
    kk_string_dup(_x1);
    kk_std_os_path__path_drop(q, _ctx);
    _x3112 = _x1; /*string*/
  }
  return kk_std_os_path__new_Path(_x3112, parts0, _ctx);
}
 
// Combine multiple paths using `(/)`.


// lift anonymous function
struct kk_std_os_path_combine_fun3123__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_combine_fun3123(kk_function_t _fself, kk_box_t _b_2505, kk_box_t _b_2506, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_combine_fun3123(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_combine_fun3123, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_combine_fun3123(kk_function_t _fself, kk_box_t _b_2505, kk_box_t _b_2506, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3124;
  kk_std_os_path__path _x3125 = kk_std_os_path__path_unbox(_b_2505, _ctx); /*std/os/path/path*/
  kk_std_os_path__path _x3126 = kk_std_os_path__path_unbox(_b_2506, _ctx); /*std/os/path/path*/
  _x3124 = kk_std_os_path__lp__fs__rp_(_x3125, _x3126, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3124, _ctx);
}

kk_std_os_path__path kk_std_os_path_combine(kk_std_core__list ps, kk_context_t* _ctx) { /* (ps : list<path>) -> path */ 
  if (kk_std_core__is_Nil(ps)) {
    kk_string_t _x3113;
    kk_std_core_types__optional _x3114 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
    if (kk_std_core_types__is_Optional(_x3114)) {
      kk_box_t _box_x2499 = _x3114._cons.Optional.value;
      kk_string_t _root_871 = kk_string_unbox(_box_x2499);
      _x3113 = _root_871; /*string*/
    }
    else {
      _x3113 = kk_string_empty(); /*string*/
    }
    kk_std_core__list _x3117;
    kk_std_core_types__optional _x3118 = kk_std_core_types__new_None(_ctx); /*forall<a> optional<a>*/
    if (kk_std_core_types__is_Optional(_x3118)) {
      kk_box_t _box_x2500 = _x3118._cons.Optional.value;
      kk_std_core__list _parts_876 = kk_std_core__list_unbox(_box_x2500, NULL);
      _x3117 = _parts_876; /*list<string>*/
    }
    else {
      _x3117 = kk_std_core__new_Nil(_ctx); /*list<string>*/
    }
    return kk_std_os_path__new_Path(_x3113, _x3117, _ctx);
  }
  {
    struct kk_std_core_Cons* _con3120 = kk_std_core__as_Cons(ps);
    kk_box_t _box_x2501 = _con3120->head;
    kk_std_core__list pp = _con3120->tail;
    kk_std_os_path__path p = kk_std_os_path__path_unbox(_box_x2501, NULL);
    if (kk_likely(kk_std_core__list_is_unique(ps))) {
      kk_std_os_path__path_dup(p);
      kk_box_drop(_box_x2501, _ctx);
      kk_std_core__list_free(ps, _ctx);
    }
    else {
      kk_std_os_path__path_dup(p);
      kk_std_core__list_dup(pp);
      kk_std_core__list_decref(ps, _ctx);
    }
    kk_box_t _x3122 = kk_std_core_foldl(pp, kk_std_os_path__path_box(p, _ctx), kk_std_os_path_new_combine_fun3123(_ctx), _ctx); /*12365*/
    return kk_std_os_path__path_unbox(_x3122, _ctx);
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_os_path__mlift2216_realpath_fun3128__t_1 {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2216_realpath_fun3128_1(kk_function_t _fself, kk_box_t _b_2512, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2216_realpath_fun3128_1(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2216_realpath_fun3128_1, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2216_realpath_fun3128_1(kk_function_t _fself, kk_box_t _b_2512, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3129;
  kk_string_t _x3130 = kk_string_unbox(_b_2512); /*string*/
  _x3129 = kk_std_os_path_path(_x3130, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3129, _ctx);
}

kk_std_os_path__path kk_std_os_path__mlift2216_realpath_1(kk_string_t _y_2175, kk_context_t* _ctx) { /* (string) -> io path */ 
  kk_box_t _x3127 = kk_std_core_hnd__open_none1(kk_std_os_path__new_mlift2216_realpath_fun3128_1(_ctx), kk_string_box(_y_2175), _ctx); /*3357*/
  return kk_std_os_path__path_unbox(_x3127, _ctx);
}
 
// Convert a path to the absolute path on the file system.
// The overload on a plain string is necessary as it allows
// for unnormalized paths with `".."` parts. For example
// `"/foo/symlink/../test.txt"` may resolve to `"/bar/test.txt"` if
// ``symlink`` is a symbolic link to a sub directory of `"/bar"`.


// lift anonymous function
struct kk_std_os_path_realpath_fun3132__t_1 {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_realpath_fun3132_1(kk_function_t _fself, kk_box_t _b_2516, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_realpath_fun3132_1(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_realpath_fun3132_1, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_realpath_fun3132_1(kk_function_t _fself, kk_box_t _b_2516, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3133;
  kk_string_t _x3134 = kk_string_unbox(_b_2516); /*string*/
  _x3133 = kk_std_os_path__mlift2216_realpath_1(_x3134, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3133, _ctx);
}


// lift anonymous function
struct kk_std_os_path_realpath_fun3135__t_1 {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_realpath_fun3135_1(kk_function_t _fself, kk_box_t _b_2519, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_realpath_fun3135_1(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_realpath_fun3135_1, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_realpath_fun3135_1(kk_function_t _fself, kk_box_t _b_2519, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3136;
  kk_string_t _x3137 = kk_string_unbox(_b_2519); /*string*/
  _x3136 = kk_std_os_path_path(_x3137, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3136, _ctx);
}

kk_std_os_path__path kk_std_os_path_realpath_1(kk_string_t s, kk_context_t* _ctx) { /* (s : string) -> io path */ 
  kk_string_t x_2250 = kk_std_os_path_xrealpath(s, _ctx); /*string*/;
  kk_box_t _x3131;
  if (kk_yielding(kk_context())) {
    kk_string_drop(x_2250, _ctx);
    _x3131 = kk_std_core_hnd_yield_extend(kk_std_os_path_new_realpath_fun3132_1(_ctx), _ctx); /*3926*/
  }
  else {
    _x3131 = kk_std_core_hnd__open_none1(kk_std_os_path_new_realpath_fun3135_1(_ctx), kk_string_box(x_2250), _ctx); /*3926*/
  }
  return kk_std_os_path__path_unbox(_x3131, _ctx);
}
 
// monadic lift


// lift anonymous function
struct kk_std_os_path__mlift2217_realpath_fun3139__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2217_realpath_fun3139(kk_function_t _fself, kk_box_t _b_2525, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2217_realpath_fun3139(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2217_realpath_fun3139, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2217_realpath_fun3139(kk_function_t _fself, kk_box_t _b_2525, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3140;
  kk_string_t _x3141 = kk_string_unbox(_b_2525); /*string*/
  _x3140 = kk_std_os_path_path(_x3141, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3140, _ctx);
}

kk_std_os_path__path kk_std_os_path__mlift2217_realpath(kk_string_t _y_2176, kk_context_t* _ctx) { /* (string) -> io path */ 
  kk_box_t _x3138 = kk_std_core_hnd__open_none1(kk_std_os_path__new_mlift2217_realpath_fun3139(_ctx), kk_string_box(_y_2176), _ctx); /*3357*/
  return kk_std_os_path__path_unbox(_x3138, _ctx);
}
 
// Convert a path to the absolute path on the file system.
// The path is not required to exist on disk. However, if it
// exists any permissions and symbolic links are resolved fully.
// `".".realpath` (to get the current working directory)
// `"/foo".realpath` (to resolve the full root, like `"c:/foo"` on windows)


// lift anonymous function
struct kk_std_os_path_realpath_fun3143__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_realpath_fun3143(kk_function_t _fself, kk_box_t _b_2530, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_realpath_fun3143(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_realpath_fun3143, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_realpath_fun3143(kk_function_t _fself, kk_box_t _b_2530, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_string_t _x3144;
  kk_std_os_path__path _x3145 = kk_std_os_path__path_unbox(_b_2530, _ctx); /*std/os/path/path*/
  _x3144 = kk_std_os_path_string(_x3145, _ctx); /*string*/
  return kk_string_box(_x3144);
}


// lift anonymous function
struct kk_std_os_path_realpath_fun3147__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_realpath_fun3147(kk_function_t _fself, kk_box_t _b_2534, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_realpath_fun3147(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_realpath_fun3147, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_realpath_fun3147(kk_function_t _fself, kk_box_t _b_2534, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3148;
  kk_string_t _x3149 = kk_string_unbox(_b_2534); /*string*/
  _x3148 = kk_std_os_path__mlift2217_realpath(_x3149, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3148, _ctx);
}


// lift anonymous function
struct kk_std_os_path_realpath_fun3150__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_realpath_fun3150(kk_function_t _fself, kk_box_t _b_2537, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_realpath_fun3150(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_realpath_fun3150, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_realpath_fun3150(kk_function_t _fself, kk_box_t _b_2537, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3151;
  kk_string_t _x3152 = kk_string_unbox(_b_2537); /*string*/
  _x3151 = kk_std_os_path_path(_x3152, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3151, _ctx);
}

kk_std_os_path__path kk_std_os_path_realpath(kk_std_os_path__path p, kk_context_t* _ctx) { /* (p : path) -> io path */ 
  kk_string_t s_2117;
  kk_box_t _x3142 = kk_std_core_hnd__open_none1(kk_std_os_path_new_realpath_fun3143(_ctx), kk_std_os_path__path_box(p, _ctx), _ctx); /*3357*/
  s_2117 = kk_string_unbox(_x3142); /*string*/
  kk_string_t x_2253 = kk_std_os_path_xrealpath(s_2117, _ctx); /*string*/;
  kk_box_t _x3146;
  if (kk_yielding(kk_context())) {
    kk_string_drop(x_2253, _ctx);
    _x3146 = kk_std_core_hnd_yield_extend(kk_std_os_path_new_realpath_fun3147(_ctx), _ctx); /*3926*/
  }
  else {
    _x3146 = kk_std_core_hnd__open_none1(kk_std_os_path_new_realpath_fun3150(_ctx), kk_string_box(x_2253), _ctx); /*3926*/
  }
  return kk_std_os_path__path_unbox(_x3146, _ctx);
}
 
// monadic lift


// lift anonymous function
struct kk_std_os_path__mlift2218_cwd_fun3154__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2218_cwd_fun3154(kk_function_t _fself, kk_box_t _b_2543, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2218_cwd_fun3154(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2218_cwd_fun3154, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2218_cwd_fun3154(kk_function_t _fself, kk_box_t _b_2543, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3155;
  kk_string_t _x3156 = kk_string_unbox(_b_2543); /*string*/
  _x3155 = kk_std_os_path_path(_x3156, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3155, _ctx);
}

kk_std_os_path__path kk_std_os_path__mlift2218_cwd(kk_string_t _y_2177, kk_context_t* _ctx) { /* (string) -> io path */ 
  kk_box_t _x3153 = kk_std_core_hnd__open_none1(kk_std_os_path__new_mlift2218_cwd_fun3154(_ctx), kk_string_box(_y_2177), _ctx); /*3357*/
  return kk_std_os_path__path_unbox(_x3153, _ctx);
}
 
// Returns the current working directory.
// Equal to `".".realpath`.


// lift anonymous function
struct kk_std_os_path_cwd_fun3160__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_cwd_fun3160(kk_function_t _fself, kk_box_t _b_2547, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_cwd_fun3160(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_cwd_fun3160, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_cwd_fun3160(kk_function_t _fself, kk_box_t _b_2547, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3161;
  kk_string_t _x3162 = kk_string_unbox(_b_2547); /*string*/
  _x3161 = kk_std_os_path__mlift2218_cwd(_x3162, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3161, _ctx);
}


// lift anonymous function
struct kk_std_os_path_cwd_fun3163__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_cwd_fun3163(kk_function_t _fself, kk_box_t _b_2550, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_cwd_fun3163(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_cwd_fun3163, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_cwd_fun3163(kk_function_t _fself, kk_box_t _b_2550, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3164;
  kk_string_t _x3165 = kk_string_unbox(_b_2550); /*string*/
  _x3164 = kk_std_os_path_path(_x3165, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3164, _ctx);
}

kk_std_os_path__path kk_std_os_path_cwd(kk_context_t* _ctx) { /* () -> io path */ 
  kk_string_t x_2256;
  kk_string_t _x3157;
  kk_define_string_literal(, _s3158, 1, ".")
  _x3157 = kk_string_dup(_s3158); /*string*/
  x_2256 = kk_std_os_path_xrealpath(_x3157, _ctx); /*string*/
  kk_box_t _x3159;
  if (kk_yielding(kk_context())) {
    kk_string_drop(x_2256, _ctx);
    _x3159 = kk_std_core_hnd_yield_extend(kk_std_os_path_new_cwd_fun3160(_ctx), _ctx); /*3926*/
  }
  else {
    _x3159 = kk_std_core_hnd__open_none1(kk_std_os_path_new_cwd_fun3163(_ctx), kk_string_box(x_2256), _ctx); /*3926*/
  }
  return kk_std_os_path__path_unbox(_x3159, _ctx);
}
 
// If a path has no extension, set it to the provided one.

kk_std_os_path__path kk_std_os_path_default_ext(kk_std_os_path__path p, kk_string_t newext, kk_context_t* _ctx) { /* (p : path, newext : string) -> path */ 
  kk_std_core_types__tuple2_ _this_2109;
  kk_string_t _x3166;
  {
    kk_std_core__list _x0 = p.parts;
    kk_std_core__list_dup(_x0);
    if (kk_std_core__is_Cons(_x0)) {
      struct kk_std_core_Cons* _con3167 = kk_std_core__as_Cons(_x0);
      kk_box_t _box_x2554 = _con3167->head;
      kk_std_core__list _pat00 = _con3167->tail;
      kk_string_t x = kk_string_unbox(_box_x2554);
      if (kk_likely(kk_std_core__list_is_unique(_x0))) {
        kk_std_core__list_drop(_pat00, _ctx);
        kk_std_core__list_free(_x0, _ctx);
      }
      else {
        kk_string_dup(x);
        kk_std_core__list_decref(_x0, _ctx);
      }
      _x3166 = x; /*string*/
    }
    else {
      _x3166 = kk_string_empty(); /*string*/
    }
  }
  _this_2109 = kk_std_os_path_split_base(_x3166, _ctx); /*(string, string)*/
  bool _match_2633;
  kk_string_t _x3170;
  {
    kk_box_t _box_x2555 = _this_2109.fst;
    kk_box_t _box_x2556 = _this_2109.snd;
    kk_string_t _x = kk_string_unbox(_box_x2556);
    kk_string_dup(_x);
    kk_std_core_types__tuple2__drop(_this_2109, _ctx);
    _x3170 = _x; /*string*/
  }
  kk_string_t _x3173 = kk_string_empty(); /*string*/
  _match_2633 = kk_string_is_eq(_x3170,_x3173,kk_context()); /*bool*/
  if (_match_2633) {
    return kk_std_os_path_change_ext(p, newext, _ctx);
  }
  {
    kk_string_drop(newext, _ctx);
    return p;
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_os_path__mlift2219_homedir_fun3176__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2219_homedir_fun3176(kk_function_t _fself, kk_box_t _b_2559, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2219_homedir_fun3176(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2219_homedir_fun3176, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2219_homedir_fun3176(kk_function_t _fself, kk_box_t _b_2559, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3177;
  kk_string_t _x3178 = kk_string_unbox(_b_2559); /*string*/
  _x3177 = kk_std_os_path_path(_x3178, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3177, _ctx);
}

kk_std_os_path__path kk_std_os_path__mlift2219_homedir(kk_string_t _y_2178, kk_context_t* _ctx) { /* (string) -> io path */ 
  kk_box_t _x3175 = kk_std_core_hnd__open_none1(kk_std_os_path__new_mlift2219_homedir_fun3176(_ctx), kk_string_box(_y_2178), _ctx); /*3357*/
  return kk_std_os_path__path_unbox(_x3175, _ctx);
}
 
// Return the home directory of the current user.


// lift anonymous function
struct kk_std_os_path_homedir_fun3180__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_homedir_fun3180(kk_function_t _fself, kk_box_t _b_2563, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_homedir_fun3180(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_homedir_fun3180, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_homedir_fun3180(kk_function_t _fself, kk_box_t _b_2563, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3181;
  kk_string_t _x3182 = kk_string_unbox(_b_2563); /*string*/
  _x3181 = kk_std_os_path__mlift2219_homedir(_x3182, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3181, _ctx);
}


// lift anonymous function
struct kk_std_os_path_homedir_fun3183__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_homedir_fun3183(kk_function_t _fself, kk_box_t _b_2566, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_homedir_fun3183(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_homedir_fun3183, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_homedir_fun3183(kk_function_t _fself, kk_box_t _b_2566, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3184;
  kk_string_t _x3185 = kk_string_unbox(_b_2566); /*string*/
  _x3184 = kk_std_os_path_path(_x3185, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3184, _ctx);
}

kk_std_os_path__path kk_std_os_path_homedir(kk_context_t* _ctx) { /* () -> io path */ 
  kk_string_t x_2259 = kk_std_os_path_xhomedir(_ctx); /*string*/;
  kk_box_t _x3179;
  if (kk_yielding(kk_context())) {
    kk_string_drop(x_2259, _ctx);
    _x3179 = kk_std_core_hnd_yield_extend(kk_std_os_path_new_homedir_fun3180(_ctx), _ctx); /*3926*/
  }
  else {
    _x3179 = kk_std_core_hnd__open_none1(kk_std_os_path_new_homedir_fun3183(_ctx), kk_string_box(x_2259), _ctx); /*3926*/
  }
  return kk_std_os_path__path_unbox(_x3179, _ctx);
}


// lift anonymous function
struct kk_std_os_path__ctail_paths_collect_fun3205__t {
  struct kk_function_s _base;
};
static kk_std_core_types__maybe kk_std_os_path__ctail_paths_collect_fun3205(kk_function_t _fself, kk_char_t _b_2572, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_ctail_paths_collect_fun3205(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__ctail_paths_collect_fun3205, _ctx)
  return kk_function_dup(_fself);
}

static kk_std_core_types__maybe kk_std_os_path__ctail_paths_collect_fun3205(kk_function_t _fself, kk_char_t _b_2572, kk_context_t* _ctx) {
  kk_unused(_fself);
  return kk_std_core_types__new_Just(kk_char_box(_b_2572, _ctx), _ctx);
}

kk_std_core__list kk_std_os_path__ctail_paths_collect(kk_std_core__list ps, kk_std_core_types__ctail _acc, kk_context_t* _ctx) { /* (ps : list<string>, ctail<list<path>>) -> list<path> */ 
  kk__tailcall: ;
  if (kk_std_core__is_Cons(ps)) {
    struct kk_std_core_Cons* _con3194 = kk_std_core__as_Cons(ps);
    kk_box_t _box_x2570 = _con3194->head;
    kk_std_core__list _pat0 = _con3194->tail;
    if (kk_std_core__is_Cons(_pat0)) {
      struct kk_std_core_Cons* _con3196 = kk_std_core__as_Cons(_pat0);
      kk_string_t root0 = kk_string_unbox(_box_x2570);
      kk_box_t _box_x2571 = _con3196->head;
      kk_std_core__list rest = _con3196->tail;
      kk_string_t part = kk_string_unbox(_box_x2571);
      bool _match_2628;
      kk_integer_t _brw_2630;
      kk_string_t _x3198 = kk_string_dup(root0); /*string*/
      _brw_2630 = kk_std_core_count_1(_x3198, _ctx); /*int*/
      bool _brw_2631 = kk_integer_eq_borrow(_brw_2630,(kk_integer_from_small(1)),kk_context()); /*bool*/;
      kk_integer_drop(_brw_2630, _ctx);
      _match_2628 = _brw_2631; /*bool*/
      bool _x3199;
      if (_match_2628) {
        kk_std_core_types__maybe m_2126;
        kk_std_core__sslice _x3200;
        kk_string_t _x3201 = kk_string_dup(root0); /*string*/
        kk_ssize_t _x3202 = (KK_IZ(0)); /*ssize_t*/
        kk_ssize_t _x3203;
        kk_string_t _x3204 = kk_string_dup(root0); /*string*/
        _x3203 = kk_string_len(_x3204,kk_context()); /*ssize_t*/
        _x3200 = kk_std_core__new_Sslice(_x3201, _x3202, _x3203, _ctx); /*sslice*/
        m_2126 = kk_std_core_foreach_while_1(_x3200, kk_std_os_path__new_ctail_paths_collect_fun3205(_ctx), _ctx); /*maybe<char>*/
        bool _match_2629;
        kk_char_t _x3206;
        if (kk_std_core_types__is_Nothing(m_2126)) {
          _x3206 = ' '; /*char*/
        }
        else {
          kk_box_t _box_x2573 = m_2126._cons.Just.value;
          kk_char_t x = kk_char_unbox(_box_x2573, NULL);
          _x3206 = x; /*char*/
        }
        _match_2629 = kk_std_core_is_alpha(_x3206, _ctx); /*bool*/
        if (_match_2629) {
          bool b_2129;
          kk_string_t _x3208 = kk_string_dup(part); /*string*/
          kk_string_t _x3209 = kk_string_empty(); /*string*/
          b_2129 = kk_string_is_eq(_x3208,_x3209,kk_context()); /*bool*/
          if (b_2129) {
            _x3199 = false; /*bool*/
          }
          else {
            kk_string_t _x3211;
            kk_define_string_literal(, _s3212, 2, "/\\")
            _x3211 = kk_string_dup(_s3212); /*string*/
            kk_string_t _x3213;
            kk_string_t _x3214 = kk_string_dup(part); /*string*/
            _x3213 = kk_std_core_head_3(_x3214, _ctx); /*string*/
            _x3199 = kk_string_contains(_x3211,_x3213,kk_context()); /*bool*/
          }
        }
        else {
          _x3199 = false; /*bool*/
        }
      }
      else {
        _x3199 = false; /*bool*/
      }
      if (_x3199) {
        kk_reuse_t _ru_2715 = kk_reuse_null; /*reuse*/;
        if (kk_likely(kk_std_core__list_is_unique(ps))) {
          if (kk_likely(kk_std_core__list_is_unique(_pat0))) {
            kk_std_core__list_free(_pat0, _ctx);
          }
          else {
            kk_string_dup(part);
            kk_std_core__list_dup(rest);
            kk_std_core__list_decref(_pat0, _ctx);
          }
          _ru_2715 = (kk_std_core__list_reuse(ps));
        }
        else {
          kk_string_dup(part);
          kk_std_core__list_dup(rest);
          kk_string_dup(root0);
          kk_std_core__list_decref(ps, _ctx);
        }
        kk_std_os_path__path _ctail_2150;
        kk_string_t _x3215;
        kk_string_t _x3216;
        kk_string_t _x3217;
        kk_define_string_literal(, _s3218, 1, ":")
        _x3217 = kk_string_dup(_s3218); /*string*/
        _x3216 = kk_std_core__lp__plus__plus__1_rp_(_x3217, part, _ctx); /*string*/
        _x3215 = kk_std_core__lp__plus__plus__1_rp_(root0, _x3216, _ctx); /*string*/
        _ctail_2150 = kk_std_os_path_path(_x3215, _ctx); /*std/os/path/path*/
        kk_std_core__list _ctail_2151 = kk_std_core__list_hole(); /*list<std/os/path/path>*/;
        kk_std_core__list _ctail_2152 = kk_std_core__new_Cons(_ru_2715, kk_std_os_path__path_box(_ctail_2150, _ctx), _ctail_2151, _ctx); /*list<std/os/path/path>*/;
        kk_box_t* _b_2599_2583 = (kk_box_t*)((&kk_std_core__as_Cons(_ctail_2152)->tail)); /*cfield<list<std/os/path/path>>*/;
        { // tailcall
          kk_std_core_types__ctail _x3219 = kk_ctail_link(_acc,(kk_std_core__list_box(_ctail_2152, _ctx)),_b_2599_2583); /*ctail<0>*/
          ps = rest;
          _acc = _x3219;
          goto kk__tailcall;
        }
      }
    }
  }
  if (kk_std_core__is_Cons(ps)) {
    struct kk_std_core_Cons* _con3220 = kk_std_core__as_Cons(ps);
    kk_box_t _box_x2584 = _con3220->head;
    kk_std_core__list rest0 = _con3220->tail;
    kk_string_t part0 = kk_string_unbox(_box_x2584);
    kk_reuse_t _ru_2716 = kk_reuse_null; /*reuse*/;
    if (kk_likely(kk_std_core__list_is_unique(ps))) {
      _ru_2716 = (kk_std_core__list_reuse(ps));
    }
    else {
      kk_string_dup(part0);
      kk_std_core__list_dup(rest0);
      kk_std_core__list_decref(ps, _ctx);
    }
    kk_std_os_path__path _ctail_2153 = kk_std_os_path_path(part0, _ctx); /*std/os/path/path*/;
    kk_std_core__list _ctail_2154 = kk_std_core__list_hole(); /*list<std/os/path/path>*/;
    kk_std_core__list _ctail_2155 = kk_std_core__new_Cons(_ru_2716, kk_std_os_path__path_box(_ctail_2153, _ctx), _ctail_2154, _ctx); /*list<std/os/path/path>*/;
    kk_box_t* _b_2605_2594 = (kk_box_t*)((&kk_std_core__as_Cons(_ctail_2155)->tail)); /*cfield<list<std/os/path/path>>*/;
    { // tailcall
      kk_std_core_types__ctail _x3222 = kk_ctail_link(_acc,(kk_std_core__list_box(_ctail_2155, _ctx)),_b_2605_2594); /*ctail<0>*/
      ps = rest0;
      _acc = _x3222;
      goto kk__tailcall;
    }
  }
  {
    kk_box_t _x3223 = kk_ctail_resolve(_acc,(kk_std_core__list_box(kk_std_core__new_Nil(_ctx), _ctx))); /*-1*/
    return kk_std_core__list_unbox(_x3223, _ctx);
  }
}

kk_std_core__list kk_std_os_path_paths_collect(kk_std_core__list ps0, kk_context_t* _ctx) { /* (ps : list<string>) -> list<path> */ 
  kk_std_core_types__ctail _x3224 = kk_ctail_nil(); /*ctail<0>*/
  return kk_std_os_path__ctail_paths_collect(ps0, _x3224, _ctx);
}
 
// Return the stem name of path.
// `"/foo/bar.svg.txt".path.extname === "foo.svg"`

kk_string_t kk_std_os_path_stemname(kk_std_os_path__path p, kk_context_t* _ctx) { /* (p : path) -> string */ 
  kk_std_core_types__tuple2_ _this_2133;
  kk_string_t _x3233;
  {
    kk_std_core__list _x0 = p.parts;
    kk_std_core__list_dup(_x0);
    kk_std_os_path__path_drop(p, _ctx);
    if (kk_std_core__is_Cons(_x0)) {
      struct kk_std_core_Cons* _con3234 = kk_std_core__as_Cons(_x0);
      kk_box_t _box_x2611 = _con3234->head;
      kk_std_core__list _pat00 = _con3234->tail;
      kk_string_t x = kk_string_unbox(_box_x2611);
      if (kk_likely(kk_std_core__list_is_unique(_x0))) {
        kk_std_core__list_drop(_pat00, _ctx);
        kk_std_core__list_free(_x0, _ctx);
      }
      else {
        kk_string_dup(x);
        kk_std_core__list_decref(_x0, _ctx);
      }
      _x3233 = x; /*string*/
    }
    else {
      _x3233 = kk_string_empty(); /*string*/
    }
  }
  _this_2133 = kk_std_os_path_split_base(_x3233, _ctx); /*(string, string)*/
  {
    kk_box_t _box_x2612 = _this_2133.fst;
    kk_box_t _box_x2613 = _this_2133.snd;
    kk_string_t _x = kk_string_unbox(_box_x2612);
    kk_string_dup(_x);
    kk_std_core_types__tuple2__drop(_this_2133, _ctx);
    return _x;
  }
}
 
// monadic lift


// lift anonymous function
struct kk_std_os_path__mlift2220_tempdir_fun3240__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path__mlift2220_tempdir_fun3240(kk_function_t _fself, kk_box_t _b_2616, kk_context_t* _ctx);
static kk_function_t kk_std_os_path__new_mlift2220_tempdir_fun3240(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path__mlift2220_tempdir_fun3240, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path__mlift2220_tempdir_fun3240(kk_function_t _fself, kk_box_t _b_2616, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3241;
  kk_string_t _x3242 = kk_string_unbox(_b_2616); /*string*/
  _x3241 = kk_std_os_path_path(_x3242, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3241, _ctx);
}

kk_std_os_path__path kk_std_os_path__mlift2220_tempdir(kk_string_t _y_2179, kk_context_t* _ctx) { /* (string) -> io path */ 
  kk_box_t _x3239 = kk_std_core_hnd__open_none1(kk_std_os_path__new_mlift2220_tempdir_fun3240(_ctx), kk_string_box(_y_2179), _ctx); /*3357*/
  return kk_std_os_path__path_unbox(_x3239, _ctx);
}
 
// Return the temporary directory for the current user.


// lift anonymous function
struct kk_std_os_path_tempdir_fun3244__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_tempdir_fun3244(kk_function_t _fself, kk_box_t _b_2620, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_tempdir_fun3244(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_tempdir_fun3244, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_tempdir_fun3244(kk_function_t _fself, kk_box_t _b_2620, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3245;
  kk_string_t _x3246 = kk_string_unbox(_b_2620); /*string*/
  _x3245 = kk_std_os_path__mlift2220_tempdir(_x3246, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3245, _ctx);
}


// lift anonymous function
struct kk_std_os_path_tempdir_fun3247__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_os_path_tempdir_fun3247(kk_function_t _fself, kk_box_t _b_2623, kk_context_t* _ctx);
static kk_function_t kk_std_os_path_new_tempdir_fun3247(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_os_path_tempdir_fun3247, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_os_path_tempdir_fun3247(kk_function_t _fself, kk_box_t _b_2623, kk_context_t* _ctx) {
  kk_unused(_fself);
  kk_std_os_path__path _x3248;
  kk_string_t _x3249 = kk_string_unbox(_b_2623); /*string*/
  _x3248 = kk_std_os_path_path(_x3249, _ctx); /*std/os/path/path*/
  return kk_std_os_path__path_box(_x3248, _ctx);
}

kk_std_os_path__path kk_std_os_path_tempdir(kk_context_t* _ctx) { /* () -> io path */ 
  kk_string_t x_2262 = kk_std_os_path_xtempdir(_ctx); /*string*/;
  kk_box_t _x3243;
  if (kk_yielding(kk_context())) {
    kk_string_drop(x_2262, _ctx);
    _x3243 = kk_std_core_hnd_yield_extend(kk_std_os_path_new_tempdir_fun3244(_ctx), _ctx); /*3926*/
  }
  else {
    _x3243 = kk_std_core_hnd__open_none1(kk_std_os_path_new_tempdir_fun3247(_ctx), kk_string_box(x_2262), _ctx); /*3926*/
  }
  return kk_std_os_path__path_unbox(_x3243, _ctx);
}

// initialization
void kk_std_os_path__init(kk_context_t* _ctx){
  static bool _kk_initialized = false;
  if (_kk_initialized) return;
  _kk_initialized = true;
  kk_std_core_types__init(_ctx);
  kk_std_core_hnd__init(_ctx);
  kk_std_core__init(_ctx);
  kk_std_text_parse__init(_ctx);
  #if defined(KK_CUSTOM_INIT)
    KK_CUSTOM_INIT (_ctx);
  #endif
}

// termination
void kk_std_os_path__done(kk_context_t* _ctx){
  static bool _kk_done = false;
  if (_kk_done) return;
  _kk_done = true;
  #if defined(KK_CUSTOM_DONE)
    KK_CUSTOM_DONE (_ctx);
  #endif
  kk_std_text_parse__done(_ctx);
  kk_std_core__done(_ctx);
  kk_std_core_hnd__done(_ctx);
  kk_std_core_types__done(_ctx);
}
