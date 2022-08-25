// Koka generated module: "std/num/int32", koka version: 2.4.0, platform: 64-bit
#include "std_num_int32.h"
 
// Show an `:int32` in hexadecimal notation
// The `width`  parameter specifies how wide the hex value is where `'0'`  is used to align.
// The `use-capitals` parameter (= `True`) determines if captical letters should be used to display the hexadecimal digits.
// The `pre` (=`"0x"`) is an optional prefix for the number (goes between the sign and the number).

kk_string_t kk_std_num_int32_show_hex(int32_t i, kk_std_core_types__optional width, kk_std_core_types__optional use_capitals, kk_std_core_types__optional pre, kk_context_t* _ctx) { /* (i : int32, width : optional<int>, use-capitals : optional<bool>, pre : optional<string>) -> string */ 
  kk_integer_t _x1717 = kk_integer_from_int(i,kk_context()); /*int*/
  kk_std_core_types__optional _x1718;
  kk_box_t _x1719;
  kk_integer_t _x1720;
  if (kk_std_core_types__is_Optional(width)) {
    kk_box_t _box_x1601 = width._cons.Optional.value;
    kk_integer_t _width_168 = kk_integer_unbox(_box_x1601);
    _x1720 = _width_168; /*int*/
  }
  else {
    _x1720 = kk_integer_from_small(1); /*int*/
  }
  _x1719 = kk_integer_box(_x1720); /*112*/
  _x1718 = kk_std_core_types__new_Optional(_x1719, _ctx); /*optional<112>*/
  kk_std_core_types__optional _x1722;
  kk_box_t _x1723;
  bool _x1724;
  if (kk_std_core_types__is_Optional(use_capitals)) {
    kk_box_t _box_x1603 = use_capitals._cons.Optional.value;
    bool _use_capitals_172 = kk_bool_unbox(_box_x1603);
    _x1724 = _use_capitals_172; /*bool*/
  }
  else {
    _x1724 = true; /*bool*/
  }
  _x1723 = kk_bool_box(_x1724); /*112*/
  _x1722 = kk_std_core_types__new_Optional(_x1723, _ctx); /*optional<112>*/
  kk_std_core_types__optional _x1726;
  kk_box_t _x1727;
  kk_string_t _x1728;
  if (kk_std_core_types__is_Optional(pre)) {
    kk_box_t _box_x1605 = pre._cons.Optional.value;
    kk_string_t _pre_176 = kk_string_unbox(_box_x1605);
    _x1728 = _pre_176; /*string*/
  }
  else {
    kk_define_string_literal(, _s1730, 2, "0x")
    _x1728 = kk_string_dup(_s1730); /*string*/
  }
  _x1727 = kk_string_box(_x1728); /*112*/
  _x1726 = kk_std_core_types__new_Optional(_x1727, _ctx); /*optional<112>*/
  return kk_std_core_show_hex(_x1717, _x1718, _x1722, _x1726, _ctx);
}

int32_t kk_std_num_int32_one;

int32_t kk_std_num_int32_zero;
 
// The minimal integer value before underflow happens

int32_t kk_std_num_int32_min_int32;
 
// Euclidean-0 modulus. See `(/):(x : int32, y : int32) -> int32` division for more information.

int32_t kk_std_num_int32__lp__perc__rp_(int32_t x, int32_t y, kk_context_t* _ctx) { /* (x : int32, y : int32) -> int32 */ 
  bool _match_1703 = (y == ((KK_I32(0)))); /*bool*/;
  if (_match_1703) {
    return x;
  }
  {
    bool _match_1704 = (y == ((KK_I32(-1)))); /*bool*/;
    if (_match_1704) {
      bool _match_1707 = (x == kk_std_num_int32_min_int32); /*bool*/;
      if (_match_1707) {
        return (KK_I32(0));
      }
      {
        int32_t r = (x % y); /*int32*/;
        bool _match_1708 = (r >= ((KK_I32(0)))); /*bool*/;
        if (_match_1708) {
          return r;
        }
        {
          bool _match_1709 = (y > ((KK_I32(0)))); /*bool*/;
          if (_match_1709) {
            return (int32_t)((uint32_t)r + (uint32_t)y);
          }
          {
            return (int32_t)((uint32_t)r - (uint32_t)y);
          }
        }
      }
    }
    {
      int32_t r0 = (x % y); /*int32*/;
      bool _match_1705 = (r0 >= ((KK_I32(0)))); /*bool*/;
      if (_match_1705) {
        return r0;
      }
      {
        bool _match_1706 = (y > ((KK_I32(0)))); /*bool*/;
        if (_match_1706) {
          return (int32_t)((uint32_t)r0 + (uint32_t)y);
        }
        {
          return (int32_t)((uint32_t)r0 - (uint32_t)y);
        }
      }
    }
  }
}
 
/*
Euclidean-0 division.
Euclidean division is defined as: For any `D`  and `d`  where `d!=0` , we have:
1. `D == d*(D/d) + (D%d)`
2. `D%d`  is always positive where `0 <= D%d < abs(d)`
Moreover, Euclidean-0 is a total function, for the case where `d==0`  we have
that `D%0 == D`  and `D/0 == 0` . So property (1) still holds, but not property (2).
Useful laws that hold for Euclidean-0 division:
* `D/(-d) == -(D/d)`
* `D%(-d) == D%d`
* `D/(2^n) == sar(D,n)         `  (with `0 <= n <= 31`)
* `D%(2^n) == D & ((2^n) - 1)  `  (with `0 <= n <= 31`)
Note that an interesting edge case is `min-int32 / -1` which equals `min-int32` since in modulo 32-bit
arithmetic `min-int32 == -1 * min-int32 == -1 * (min-int32 / -1) + (min-int32 % -1)` satisfying property (1).
Of course `(min-int32 + 1) / -1` is again positive (namely `max-int32`).
See also _Division and modulus for computer scientists, Daan Leijen, 2001_
[pdf](http://research.microsoft.com/pubs/151917/divmodnote.pdf) .
*/

int32_t kk_std_num_int32__lp__fs__rp_(int32_t x, int32_t y, kk_context_t* _ctx) { /* (x : int32, y : int32) -> int32 */ 
  bool _match_1696 = (y == ((KK_I32(0)))); /*bool*/;
  if (_match_1696) {
    return (KK_I32(0));
  }
  {
    bool _match_1697 = (y == ((KK_I32(-1)))); /*bool*/;
    if (_match_1697) {
      bool _match_1700 = (x == kk_std_num_int32_min_int32); /*bool*/;
      if (_match_1700) {
        return x;
      }
      {
        int32_t q = (x / y); /*int32*/;
        int32_t r = (x % y); /*int32*/;
        bool _match_1701 = (r >= ((KK_I32(0)))); /*bool*/;
        if (_match_1701) {
          return q;
        }
        {
          bool _match_1702 = (y > ((KK_I32(0)))); /*bool*/;
          if (_match_1702) {
            return (int32_t)((uint32_t)q - (uint32_t)((KK_I32(1))));
          }
          {
            return (int32_t)((uint32_t)q + (uint32_t)((KK_I32(1))));
          }
        }
      }
    }
    {
      int32_t q0 = (x / y); /*int32*/;
      int32_t r0 = (x % y); /*int32*/;
      bool _match_1698 = (r0 >= ((KK_I32(0)))); /*bool*/;
      if (_match_1698) {
        return q0;
      }
      {
        bool _match_1699 = (y > ((KK_I32(0)))); /*bool*/;
        if (_match_1699) {
          return (int32_t)((uint32_t)q0 - (uint32_t)((KK_I32(1))));
        }
        {
          return (int32_t)((uint32_t)q0 + (uint32_t)((KK_I32(1))));
        }
      }
    }
  }
}
 
// Return the absolute value of an integer.
// Raises an exception if the `:int32` is `min-int32`
// (since the negation of `min-int32` equals itself and is still negative)


// lift anonymous function
struct kk_std_num_int32_abs_fun1732__t {
  struct kk_function_s _base;
};
static kk_box_t kk_std_num_int32_abs_fun1732(kk_function_t _fself, kk_box_t _b_1612, kk_context_t* _ctx);
static kk_function_t kk_std_num_int32_new_abs_fun1732(kk_context_t* _ctx) {
  kk_define_static_function(_fself, kk_std_num_int32_abs_fun1732, _ctx)
  return kk_function_dup(_fself);
}

static kk_box_t kk_std_num_int32_abs_fun1732(kk_function_t _fself, kk_box_t _b_1612, kk_context_t* _ctx) {
  kk_unused(_fself);
  bool _x1733;
  bool b_1619 = kk_bool_unbox(_b_1612); /*bool*/;
  if (b_1619) {
    _x1733 = false; /*bool*/
  }
  else {
    _x1733 = true; /*bool*/
  }
  return kk_bool_box(_x1733);
}

int32_t kk_std_num_int32_abs(int32_t i, kk_context_t* _ctx) { /* (i : int32) -> exn int32 */ 
  bool _x1_1595 = 0 > i; /*bool*/;
  bool _match_1694;
  kk_box_t _x1731 = kk_std_core_hnd__open_none1(kk_std_num_int32_new_abs_fun1732(_ctx), kk_bool_box(_x1_1595), _ctx); /*3357*/
  _match_1694 = kk_bool_unbox(_x1731); /*bool*/
  if (_match_1694) {
    return i;
  }
  {
    bool _match_1695 = (i > kk_std_num_int32_min_int32); /*bool*/;
    if (_match_1695) {
      return (int32_t)((uint32_t)((KK_I32(0))) - (uint32_t)i);
    }
    {
      kk_box_t _x1734;
      kk_string_t _x1735;
      kk_define_string_literal(, _s1736, 79, "std/num/int32/abs: cannot make min-int32 into a positive int32 without overflow")
      _x1735 = kk_string_dup(_s1736); /*string*/
      _x1734 = kk_std_core_throw(_x1735, kk_std_core_types__new_None(_ctx), _ctx); /*11728*/
      return kk_int32_unbox(_x1734, _ctx);
    }
  }
}
 
// Return the absolute value of an integer.
// Returns 0 if the `:int32` is `min-int32`
// (since the negation of `min-int32` equals itself and is still negative)

int32_t kk_std_num_int32_abs0(int32_t i, kk_context_t* _ctx) { /* (i : int32) -> int32 */ 
  bool b_1566 = 0 > i; /*bool*/;
  if (b_1566) {
    bool _match_1693 = (i > kk_std_num_int32_min_int32); /*bool*/;
    if (_match_1693) {
      return (int32_t)((uint32_t)((KK_I32(0))) - (uint32_t)i);
    }
    {
      return (KK_I32(0));
    }
  }
  {
    return i;
  }
}
 
// The number of bits in an `:int32` (always 32)

int32_t kk_std_num_int32_bits_int32;
 
// Truncated division (as in C). See also `(/):(x : int32, y : int32) -> int32`.

int32_t kk_std_num_int32_cdiv(int32_t i, int32_t j, kk_context_t* _ctx) { /* (i : int32, j : int32) -> exn int32 */ 
  bool _match_1690 = 0 == j; /*bool*/;
  if (_match_1690) {
    kk_box_t _x1737;
    kk_string_t _x1738;
    kk_define_string_literal(, _s1739, 35, "std/num/int32/cdiv: modulus by zero")
    _x1738 = kk_string_dup(_s1739); /*string*/
    _x1737 = kk_std_core_throw(_x1738, kk_std_core_types__new_None(_ctx), _ctx); /*11728*/
    return kk_int32_unbox(_x1737, _ctx);
  }
  {
    bool _match_1691 = (j == ((KK_I32(-1)))); /*bool*/;
    if (_match_1691) {
      bool _match_1692 = (i == kk_std_num_int32_min_int32); /*bool*/;
      if (_match_1692) {
        kk_box_t _x1740;
        kk_string_t _x1741;
        kk_define_string_literal(, _s1742, 65, "std/num/int32/cdiv: modulus overflow in cdiv(min-int32, -1.int32)")
        _x1741 = kk_string_dup(_s1742); /*string*/
        _x1740 = kk_std_core_throw(_x1741, kk_std_core_types__new_None(_ctx), _ctx); /*11728*/
        return kk_int32_unbox(_x1740, _ctx);
      }
      {
        return (i / j);
      }
    }
    {
      return (i / j);
    }
  }
}
 
// Truncated modulus (as in C). See also `(%):(x : int32, y : int32) -> int32`.

int32_t kk_std_num_int32_cmod(int32_t i, int32_t j, kk_context_t* _ctx) { /* (i : int32, j : int32) -> exn int32 */ 
  bool _match_1687 = 0 == j; /*bool*/;
  if (_match_1687) {
    kk_box_t _x1743;
    kk_string_t _x1744;
    kk_define_string_literal(, _s1745, 35, "std/num/int32/cmod: modulus by zero")
    _x1744 = kk_string_dup(_s1745); /*string*/
    _x1743 = kk_std_core_throw(_x1744, kk_std_core_types__new_None(_ctx), _ctx); /*11728*/
    return kk_int32_unbox(_x1743, _ctx);
  }
  {
    bool _match_1688 = (j == ((KK_I32(-1)))); /*bool*/;
    if (_match_1688) {
      bool _match_1689 = (i == kk_std_num_int32_min_int32); /*bool*/;
      if (_match_1689) {
        kk_box_t _x1746;
        kk_string_t _x1747;
        kk_define_string_literal(, _s1748, 65, "std/num/int32/cmod: modulus overflow in cmod(min-int32, -1.int32)")
        _x1747 = kk_string_dup(_s1748); /*string*/
        _x1746 = kk_std_core_throw(_x1747, kk_std_core_types__new_None(_ctx), _ctx); /*11728*/
        return kk_int32_unbox(_x1746, _ctx);
      }
      {
        return (i % j);
      }
    }
    {
      return (i % j);
    }
  }
}

kk_std_core_types__tuple2_ kk_std_num_int32_divmod(int32_t x, int32_t y, kk_context_t* _ctx) { /* (x : int32, y : int32) -> (int32, int32) */ 
  bool _match_1682 = 0 == y; /*bool*/;
  if (_match_1682) {
    return kk_std_core_types__new_dash__lp__comma__rp_(kk_int32_box(kk_std_num_int32_zero, _ctx), kk_int32_box(x, _ctx), _ctx);
  }
  {
    bool _match_1683 = (y == ((KK_I32(-1)))); /*bool*/;
    if (_match_1683) {
      bool _match_1685 = (x == kk_std_num_int32_min_int32); /*bool*/;
      if (_match_1685) {
        int32_t _b_1655_1639 = (KK_I32(0)); /*int32*/;
        return kk_std_core_types__new_dash__lp__comma__rp_(kk_int32_box(x, _ctx), kk_int32_box(_b_1655_1639, _ctx), _ctx);
      }
      {
        int32_t q = (x / y); /*int32*/;
        int32_t r = (x % y); /*int32*/;
        bool b_1568 = 0 > r; /*bool*/;
        if (b_1568) {
          bool _match_1686 = 0 < y; /*bool*/;
          if (_match_1686) {
            int32_t _b_1656_1640 = (int32_t)((uint32_t)q - (uint32_t)((KK_I32(1)))); /*int32*/;
            int32_t _b_1657_1641 = (int32_t)((uint32_t)r + (uint32_t)y); /*int32*/;
            return kk_std_core_types__new_dash__lp__comma__rp_(kk_int32_box(_b_1656_1640, _ctx), kk_int32_box(_b_1657_1641, _ctx), _ctx);
          }
          {
            int32_t _b_1658_1642 = (int32_t)((uint32_t)q + (uint32_t)((KK_I32(1)))); /*int32*/;
            int32_t _b_1659_1643 = (int32_t)((uint32_t)r - (uint32_t)y); /*int32*/;
            return kk_std_core_types__new_dash__lp__comma__rp_(kk_int32_box(_b_1658_1642, _ctx), kk_int32_box(_b_1659_1643, _ctx), _ctx);
          }
        }
        {
          return kk_std_core_types__new_dash__lp__comma__rp_(kk_int32_box(q, _ctx), kk_int32_box(r, _ctx), _ctx);
        }
      }
    }
    {
      int32_t q0 = (x / y); /*int32*/;
      int32_t r0 = (x % y); /*int32*/;
      bool b0_1571 = 0 > r0; /*bool*/;
      if (b0_1571) {
        bool _match_1684 = 0 < y; /*bool*/;
        if (_match_1684) {
          int32_t _b_1662_1646 = (int32_t)((uint32_t)q0 - (uint32_t)((KK_I32(1)))); /*int32*/;
          int32_t _b_1663_1647 = (int32_t)((uint32_t)r0 + (uint32_t)y); /*int32*/;
          return kk_std_core_types__new_dash__lp__comma__rp_(kk_int32_box(_b_1662_1646, _ctx), kk_int32_box(_b_1663_1647, _ctx), _ctx);
        }
        {
          int32_t _b_1664_1648 = (int32_t)((uint32_t)q0 + (uint32_t)((KK_I32(1)))); /*int32*/;
          int32_t _b_1665_1649 = (int32_t)((uint32_t)r0 - (uint32_t)y); /*int32*/;
          return kk_std_core_types__new_dash__lp__comma__rp_(kk_int32_box(_b_1664_1648, _ctx), kk_int32_box(_b_1665_1649, _ctx), _ctx);
        }
      }
      {
        return kk_std_core_types__new_dash__lp__comma__rp_(kk_int32_box(q0, _ctx), kk_int32_box(r0, _ctx), _ctx);
      }
    }
  }
}
 
// monadic lift

kk_box_t kk_std_num_int32__mlift1596_fold_int32(int32_t end, kk_function_t f, int32_t start, kk_box_t x, kk_context_t* _ctx) { /* forall<a,e> (end : int32, f : (int32, a) -> e a, start : int32, x : a) -> e a */ 
  int32_t _x1749 = (int32_t)((uint32_t)start + (uint32_t)((KK_I32(1)))); /*int32*/
  return kk_std_num_int32_fold_int32(_x1749, end, x, f, _ctx);
}


// lift anonymous function
struct kk_std_num_int32_fold_int32_fun1751__t {
  struct kk_function_s _base;
  kk_function_t f0;
  int32_t end0;
  int32_t start0;
};
static kk_box_t kk_std_num_int32_fold_int32_fun1751(kk_function_t _fself, kk_box_t x1, kk_context_t* _ctx);
static kk_function_t kk_std_num_int32_new_fold_int32_fun1751(kk_function_t f0, int32_t end0, int32_t start0, kk_context_t* _ctx) {
  struct kk_std_num_int32_fold_int32_fun1751__t* _self = kk_function_alloc_as(struct kk_std_num_int32_fold_int32_fun1751__t, 2, _ctx);
  _self->_base.fun = kk_cfun_ptr_box(&kk_std_num_int32_fold_int32_fun1751, kk_context());
  _self->f0 = f0;
  _self->end0 = end0;
  _self->start0 = start0;
  return &_self->_base;
}

static kk_box_t kk_std_num_int32_fold_int32_fun1751(kk_function_t _fself, kk_box_t x1, kk_context_t* _ctx) {
  struct kk_std_num_int32_fold_int32_fun1751__t* _self = kk_function_as(struct kk_std_num_int32_fold_int32_fun1751__t*, _fself);
  kk_function_t f0 = _self->f0; /* (int32, 1229) -> 1230 1229 */
  int32_t end0 = _self->end0; /* int32 */
  int32_t start0 = _self->start0; /* int32 */
  kk_drop_match(_self, {kk_function_dup(f0);;;}, {}, _ctx)
  return kk_std_num_int32__mlift1596_fold_int32(end0, f0, start0, x1, _ctx);
}

kk_box_t kk_std_num_int32_fold_int32(int32_t start0, int32_t end0, kk_box_t init, kk_function_t f0, kk_context_t* _ctx) { /* forall<a,e> (start : int32, end : int32, init : a, f : (int32, a) -> e a) -> e a */ 
  kk__tailcall: ;
  bool _match_1680 = (start0 >= end0); /*bool*/;
  if (_match_1680) {
    kk_function_drop(f0, _ctx);
    return init;
  }
  {
    kk_box_t x0_1597;
    kk_function_t _x1750 = kk_function_dup(f0); /*(int32, 1229) -> 1230 1229*/
    x0_1597 = kk_function_call(kk_box_t, (kk_function_t, int32_t, kk_box_t, kk_context_t*), _x1750, (_x1750, start0, init, _ctx)); /*1229*/
    if (kk_yielding(kk_context())) {
      kk_box_drop(x0_1597, _ctx);
      return kk_std_core_hnd_yield_extend(kk_std_num_int32_new_fold_int32_fun1751(f0, end0, start0, _ctx), _ctx);
    }
    { // tailcall
      int32_t _x1752 = (int32_t)((uint32_t)start0 + (uint32_t)((KK_I32(1)))); /*int32*/
      start0 = _x1752;
      init = x0_1597;
      goto kk__tailcall;
    }
  }
}
 
// The maximal integer value before overflow happens

int32_t kk_std_num_int32_max_int32;
 
// Show an `:int32` in hexadecimal notation interpreted as an unsigned 32-bit value.
// The `width`  parameter specifies how wide the hex value is where `'0'`  is used to align.
// The `use-capitals` parameter (= `True`) determines if captical letters should be used to display the hexadecimal digits.
// The `pre` (=`"0x"`) is an optional prefix for the number.

kk_string_t kk_std_num_int32_show_hex32(int32_t i, kk_std_core_types__optional width, kk_std_core_types__optional use_capitals, kk_std_core_types__optional pre, kk_context_t* _ctx) { /* (i : int32, width : optional<int>, use-capitals : optional<bool>, pre : optional<string>) -> string */ 
  kk_integer_t _x1756 = kk_std_num_int32_uint(i, _ctx); /*int*/
  kk_std_core_types__optional _x1757;
  kk_box_t _x1758;
  kk_integer_t _x1759;
  if (kk_std_core_types__is_Optional(width)) {
    kk_box_t _box_x1668 = width._cons.Optional.value;
    kk_integer_t _width_1428 = kk_integer_unbox(_box_x1668);
    _x1759 = _width_1428; /*int*/
  }
  else {
    _x1759 = kk_integer_from_small(8); /*int*/
  }
  _x1758 = kk_integer_box(_x1759); /*112*/
  _x1757 = kk_std_core_types__new_Optional(_x1758, _ctx); /*optional<112>*/
  kk_std_core_types__optional _x1761;
  kk_box_t _x1762;
  bool _x1763;
  if (kk_std_core_types__is_Optional(use_capitals)) {
    kk_box_t _box_x1670 = use_capitals._cons.Optional.value;
    bool _use_capitals_1432 = kk_bool_unbox(_box_x1670);
    _x1763 = _use_capitals_1432; /*bool*/
  }
  else {
    _x1763 = true; /*bool*/
  }
  _x1762 = kk_bool_box(_x1763); /*112*/
  _x1761 = kk_std_core_types__new_Optional(_x1762, _ctx); /*optional<112>*/
  kk_std_core_types__optional _x1765;
  kk_box_t _x1766;
  kk_string_t _x1767;
  if (kk_std_core_types__is_Optional(pre)) {
    kk_box_t _box_x1672 = pre._cons.Optional.value;
    kk_string_t _pre_1436 = kk_string_unbox(_box_x1672);
    _x1767 = _pre_1436; /*string*/
  }
  else {
    kk_define_string_literal(, _s1769, 2, "0x")
    _x1767 = kk_string_dup(_s1769); /*string*/
  }
  _x1766 = kk_string_box(_x1767); /*112*/
  _x1765 = kk_std_core_types__new_Optional(_x1766, _ctx); /*optional<112>*/
  return kk_std_core_show_hex(_x1756, _x1757, _x1761, _x1765, _ctx);
}
 
// Convert an `:int` to `:int32` but interpret the `int` as an unsigned 32-bit value.
// `i` is clamped between `0` and `0xFFFFFFFF`.
// `0x7FFF_FFFF.uint32 == 0x7FFF_FFFF.int32 == max-int32`
// `0x8000_0000.uint32 == -0x8000_0000.int32 == min-int32`
// `0xFFFF_FFFF.uint32 == -1.int32`

int32_t kk_std_num_int32_uint32(kk_integer_t i, kk_context_t* _ctx) { /* (i : int) -> int32 */ 
  kk_integer_t _x1770;
  bool _match_1677;
  kk_integer_t _brw_1678 = kk_integer_from_int(kk_std_num_int32_max_int32,kk_context()); /*int*/;
  bool _brw_1679 = kk_integer_gt_borrow(i,_brw_1678,kk_context()); /*bool*/;
  kk_integer_drop(_brw_1678, _ctx);
  _match_1677 = _brw_1679; /*bool*/
  if (_match_1677) {
    _x1770 = kk_integer_sub(i,(kk_integer_from_str("4294967296", _ctx)),kk_context()); /*int*/
  }
  else {
    _x1770 = i; /*int*/
  }
  return kk_std_core_int32(_x1770, _ctx);
}

// initialization
void kk_std_num_int32__init(kk_context_t* _ctx){
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
    kk_std_num_int32_one = (KK_I32(1)); /*int32*/
  }
  {
    kk_std_num_int32_zero = (KK_I32(0)); /*int32*/
  }
  {
    kk_std_num_int32_min_int32 = (INT32_MIN); /*int32*/
  }
  {
    kk_std_num_int32_bits_int32 = (KK_I32(32)); /*int32*/
  }
  {
    kk_std_num_int32_max_int32 = (KK_I32(2147483647)); /*int32*/
  }
}

// termination
void kk_std_num_int32__done(kk_context_t* _ctx){
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
