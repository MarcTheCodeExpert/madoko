// Koka generated module: "optionsMeta", koka version: 2.4.0
"use strict";
 
// imports
import * as $std_core_types from './std_core_types.mjs';
import * as $std_core_hnd from './std_core_hnd.mjs';
import * as $std_core from './std_core.mjs';
import * as $std_text_parse from './std_text_parse.mjs';
import * as $std_os_path from './std_os_path.mjs';
import * as $std_num_int32 from './std_num_int32.mjs';
import * as $std_text_regex from './std_text_regex.mjs';
import * as $compat_dict from './compat_dict.mjs';
import * as $compat from './compat.mjs';
import * as $compat_log from './compat_log.mjs';
import * as $compat_regex from './compat_regex.mjs';
import * as $common from './common.mjs';
import * as $std_os_env from './std_os_env.mjs';
import * as $std_os_flags from './std_os_flags.mjs';
import * as $compat_path from './compat_path.mjs';
import * as $compat_env from './compat_env.mjs';
import * as $std_num_int64 from './std_num_int64.mjs';
import * as $std_num_float64 from './std_num_float64.mjs';
import * as $std_num_decimal from './std_num_decimal.mjs';
import * as $std_num_ddouble from './std_num_ddouble.mjs';
import * as $compat_array from './compat_array.mjs';
import * as $compat_string from './compat_string.mjs';
import * as $compat_flags from './compat_flags.mjs';
import * as $options from './options.mjs';
import * as $storage from './storage.mjs';
import * as $std_data_dict from './std_data_dict.mjs';
import * as $std_time_date from './std_time_date.mjs';
 
// externals
 
// type declarations
 
// declarations
 
export function appendNL(s, t) /* (s : string, t : string) -> string */  {
  if ((s === (""))) {
    return $std_core._lp__plus__plus__1_rp_(s, t);
  }
  else {
    var _x0 = $compat.endsWith(s, "\n");
    if (_x0) {
      return $std_core._lp__plus__plus__1_rp_(s, t);
    }
    else {
       
      var left1_6736 = $std_core._lp__plus__plus__1_rp_(s, "\n");
      return $std_core._lp__plus__plus__1_rp_(left1_6736, t);
    }
  }
}
 
export function appendValue(xs, x, sep) /* (xs : list<string>, x : string, sep : optional<string>) -> list<string> */  {
  var _x1 = $std_core._lift17195_reverse($std_core.Nil, xs);
  if (_x1 === null) {
    return $std_core.Cons(x, $std_core.Nil);
  }
  else {
    if (((_x1.head) === (""))) {
      return $std_core._lift17195_reverse($std_core.Nil, $std_core.Cons(x, _x1.tail));
    }
    else {
       
      var _x2 = (sep !== undefined) ? sep : "&br;";
      var left_6743 = $std_core._lp__plus__plus__1_rp_(_x1.head, _x2);
       
      var xs2_6742 = $std_core.Cons($std_core._lp__plus__plus__1_rp_(left_6743, x), _x1.tail);
      return $std_core._lift17195_reverse($std_core.Nil, xs2_6742);
    }
  }
}
 
export function update(options, key, xvalue, mdata) /* (options : options/options, key : string, xvalue : string, mdata : options/metadata) -> options/options */  {
   
  var lvalue = $compat.toLower(xvalue);
   
  if ((lvalue === ("none"))) {
    var value = "";
  }
  else {
    if ((lvalue === ("clear"))) {
      var value = "";
    }
    else {
      var value = ((lvalue === ("false"))) ? "" : xvalue;
    }
  }
   
  var _x3 = undefined;
  var _x2 = (_x3 !== undefined) ? _x3 : false;
  var m_6747 = $std_core.xparse_int((((((value).replace(/^\s\s*/,'')))).replace(/\s+$/,'')), _x2);
   
  var onNothing_6748 = $std_core._int_negate(1);
   
  var ivalue = (m_6747 === null) ? onNothing_6748 : m_6747.value;
   
  var bvalue = ((value !== (""))) ? (value !== ("0")) : false;
  if ((key === ("title"))) {
    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
  }
  else {
    if ((key === ("prelude"))) {
      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
    }
    else {
      if ((key === ("package"))) {
         
        if ((value === (""))) {
          var _x2 = "";
        }
        else {
           
          var _x3 = options.packages;
          var left_6752 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
          var _x2 = $std_core._lp__plus__plus__1_rp_(left_6752, value);
        }
        var _arg_1051 = _x2;
        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_1051);
      }
      else {
        if ((key === ("package-"))) {
           
          if ((value === (""))) {
            var _x2 = "";
          }
          else {
             
            var _x3 = options.packagesx;
            var left1_6757 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6757, value);
          }
          var _arg_1315 = _x2;
          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_1315);
        }
        else {
          if ((key === ("toc-depth"))) {
            if ($std_core._int_ge(ivalue,0)) {
              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
            }
            else {
              if ((key === ("heading-depth"))) {
                if ($std_core._int_ge(ivalue,0)) {
                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                }
                else {
                  if ((key === ("heading-base"))) {
                    if ($std_core._int_ge(ivalue,0)) {
                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                    }
                    else {
                      if ((key === ("document-class"))) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                      }
                      else {
                        if ((key === ("doc-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("bib"))) {
                             
                            if ((value !== (""))) {
                              $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                            }
                            else {
                              $std_core_types._Unit_;
                            }
                             
                            if ((value === (""))) {
                              var _x2 = "";
                            }
                            else {
                               
                              var _x3 = options.bib;
                              var left3_6762 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                              var _x2 = $std_core._lp__plus__plus__1_rp_(left3_6762, value);
                            }
                            var _arg_2483 = _x2;
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483);
                          }
                          else {
                            if ((key === ("bibliography"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left5_6767 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left5_6767, value);
                              }
                              var _arg_24830 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24830);
                            }
                            else {
                              if ((key === ("bib-data"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left7_6772 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left7_6772, value);
                                }
                                var _arg_24831 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24831);
                              }
                              else {
                                if ((key === ("tex-header"))) {
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                    var _x4 = options.texHeader;
                                    var _x3 = (_x4 === (""));
                                    if (_x3) {
                                      var _x5 = options.texHeader;
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                    }
                                    else {
                                      var _x7 = options.texHeader;
                                      var _x6 = $compat.endsWith(_x7, "\n");
                                      if (_x6) {
                                        var _x8 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                      }
                                      else {
                                         
                                        var _x9 = options.texHeader;
                                        var left1_6736 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736, value);
                                      }
                                    }
                                  }
                                  var _arg_2695 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2695);
                                }
                                else {
                                  if ((key === ("tex-header-"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeaderx;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeaderx;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeaderx;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeaderx;
                                          var left1_67360 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_67360, value);
                                        }
                                      }
                                    }
                                    var _arg_2914 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2914);
                                  }
                                  else {
                                    if ((key === ("tex-doc-header"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texDocHeader;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texDocHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texDocHeader;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texDocHeader;
                                            var left1_67361 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_67361, value);
                                          }
                                        }
                                      }
                                      var _arg_3133 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3133);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header-"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeaderx;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeaderx;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeaderx;
                                              var left1_67362 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_67362, value);
                                            }
                                          }
                                        }
                                        var _arg_3352 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3352);
                                      }
                                      else {
                                        if ((key === ("tex-footer"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texFooter;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texFooter;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texFooter;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texFooter;
                                                var left1_67363 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_67363, value);
                                              }
                                            }
                                          }
                                          var _arg_3571 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3571);
                                        }
                                        else {
                                          if ((key === ("tex-section-num"))) {
                                             
                                            var _arg_3779 = (value !== (""));
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3779);
                                          }
                                          else {
                                            if ((key === ("fragment-start"))) {
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                            }
                                            else {
                                              if ((key === ("extract-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("fragment-end"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("extract-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("cite-all"))) {
                                                       
                                                      var _arg_4371 = (value !== (""));
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4371);
                                                    }
                                                    else {
                                                      if ((key === ("embed"))) {
                                                         
                                                        if ((value === (""))) {
                                                          var _x2 = 0;
                                                        }
                                                        else {
                                                          var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                        }
                                                        var _arg_4662 = _x2;
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4662);
                                                      }
                                                      else {
                                                        if ((key === ("embed-limit"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_46620 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_46620);
                                                        }
                                                        else {
                                                          if ((key === ("section-depth"))) {
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                          }
                                                          else {
                                                            if ((key === ("section-base"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("highlight"))) {
                                                                 
                                                                var _x2 = ((value === (""))) ? false : true;
                                                                var _arg_5212 = _x2;
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5212);
                                                              }
                                                              else {
                                                                if ((key === ("colorize"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_52120 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_52120);
                                                                }
                                                                else {
                                                                  if ((key === ("highlight-language"))) {
                                                                     
                                                                    if ((value === (""))) {
                                                                      var _x2 = "";
                                                                    }
                                                                    else {
                                                                       
                                                                      var _x3 = options.hilitelang;
                                                                      var left9_6782 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left9_6782, value);
                                                                    }
                                                                    var _arg_5515 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5515);
                                                                  }
                                                                  else {
                                                                    if ((key === ("colorizer"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left11_6787 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left11_6787, value);
                                                                      }
                                                                      var _arg_55150 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_55150);
                                                                    }
                                                                    else {
                                                                      if ((key === ("rebuild"))) {
                                                                         
                                                                        var _arg_5698 = (value !== (""));
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5698);
                                                                      }
                                                                      else {
                                                                        if ((key === ("star-bold"))) {
                                                                           
                                                                          var _arg_5925 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5925);
                                                                        }
                                                                        else {
                                                                          if ((key === ("line-no"))) {
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no-web"))) {
                                                                               
                                                                              var _arg_6293 = (lvalue === ("true"));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_6293);
                                                                            }
                                                                            else {
                                                                              if ((key === ("pretty-align"))) {
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                              }
                                                                              else {
                                                                                if ((key === ("refer"))) {
                                                                                   
                                                                                  $compat_log.log("filesRefer", value);
                                                                                  return options;
                                                                                }
                                                                                else {
                                                                                  if ((key === ("copy-styles"))) {
                                                                                     
                                                                                    var _arg_6673 = (value !== (""));
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_6673);
                                                                                  }
                                                                                  else {
                                                                                    return options;
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  else {
                    if ((key === ("header-base"))) {
                      if ($std_core._int_ge(ivalue,0)) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                      }
                      else {
                        if ((key === ("document-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("doc-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("bib"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left13_6792 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left13_6792, value);
                              }
                              var _arg_24832 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24832);
                            }
                            else {
                              if ((key === ("bibliography"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left15_6797 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left15_6797, value);
                                }
                                var _arg_248300 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248300);
                              }
                              else {
                                if ((key === ("bib-data"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left17_6802 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left17_6802, value);
                                  }
                                  var _arg_248310 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248310);
                                }
                                else {
                                  if ((key === ("tex-header"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeader;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeader;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeader;
                                          var left1_67364 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_67364, value);
                                        }
                                      }
                                    }
                                    var _arg_26950 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_26950);
                                  }
                                  else {
                                    if ((key === ("tex-header-"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeaderx;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeaderx;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeaderx;
                                            var left1_67365 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_67365, value);
                                          }
                                        }
                                      }
                                      var _arg_29140 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_29140);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeader;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeader;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeader;
                                              var left1_67366 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_67366, value);
                                            }
                                          }
                                        }
                                        var _arg_31330 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_31330);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header-"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeaderx;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeaderx;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeaderx;
                                                var left1_67367 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_67367, value);
                                              }
                                            }
                                          }
                                          var _arg_33520 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_33520);
                                        }
                                        else {
                                          if ((key === ("tex-footer"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texFooter;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texFooter;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texFooter;
                                                  var left1_67368 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_67368, value);
                                                }
                                              }
                                            }
                                            var _arg_35710 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_35710);
                                          }
                                          else {
                                            if ((key === ("tex-section-num"))) {
                                               
                                              var _arg_37790 = (value !== (""));
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_37790);
                                            }
                                            else {
                                              if ((key === ("fragment-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("extract-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("fragment-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("extract-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("cite-all"))) {
                                                         
                                                        var _arg_43710 = (value !== (""));
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_43710);
                                                      }
                                                      else {
                                                        if ((key === ("embed"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_46621 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_46621);
                                                        }
                                                        else {
                                                          if ((key === ("embed-limit"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_466200 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466200);
                                                          }
                                                          else {
                                                            if ((key === ("section-depth"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("section-base"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("highlight"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_52121 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_52121);
                                                                }
                                                                else {
                                                                  if ((key === ("colorize"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_521200 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521200);
                                                                  }
                                                                  else {
                                                                    if ((key === ("highlight-language"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left19_6812 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left19_6812, value);
                                                                      }
                                                                      var _arg_55151 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_55151);
                                                                    }
                                                                    else {
                                                                      if ((key === ("colorizer"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left21_6817 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left21_6817, value);
                                                                        }
                                                                        var _arg_551500 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551500);
                                                                      }
                                                                      else {
                                                                        if ((key === ("rebuild"))) {
                                                                           
                                                                          var _arg_56980 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_56980);
                                                                        }
                                                                        else {
                                                                          if ((key === ("star-bold"))) {
                                                                             
                                                                            var _arg_59250 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_59250);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no"))) {
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no-web"))) {
                                                                                 
                                                                                var _arg_62930 = (lvalue === ("true"));
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_62930);
                                                                              }
                                                                              else {
                                                                                if ((key === ("pretty-align"))) {
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("refer"))) {
                                                                                     
                                                                                    $compat_log.log("filesRefer", value);
                                                                                    return options;
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("copy-styles"))) {
                                                                                       
                                                                                      var _arg_66730 = (value !== (""));
                                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_66730);
                                                                                    }
                                                                                    else {
                                                                                      return options;
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    else {
                      if ((key === ("base-header-level"))) {
                        if ($std_core._int_ge(ivalue,0)) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                        }
                        else {
                          if ((key === ("document-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("doc-class"))) {
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                            }
                            else {
                              if ((key === ("bib"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left23_6822 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left23_6822, value);
                                }
                                var _arg_24833 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24833);
                              }
                              else {
                                if ((key === ("bibliography"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left25_6827 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left25_6827, value);
                                  }
                                  var _arg_24834 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24834);
                                }
                                else {
                                  if ((key === ("bib-data"))) {
                                     
                                    if ((value !== (""))) {
                                      $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                    }
                                    else {
                                      $std_core_types._Unit_;
                                    }
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                       
                                      var _x3 = options.bib;
                                      var left27_6832 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left27_6832, value);
                                    }
                                    var _arg_24835 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24835);
                                  }
                                  else {
                                    if ((key === ("tex-header"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeader;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeader;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeader;
                                            var left1_67369 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_67369, value);
                                          }
                                        }
                                      }
                                      var _arg_26951 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_26951);
                                    }
                                    else {
                                      if ((key === ("tex-header-"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texHeaderx;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texHeaderx;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texHeaderx;
                                              var left1_673610 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673610, value);
                                            }
                                          }
                                        }
                                        var _arg_29141 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_29141);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeader;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeader;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeader;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeader;
                                                var left1_673611 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673611, value);
                                              }
                                            }
                                          }
                                          var _arg_31331 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_31331);
                                        }
                                        else {
                                          if ((key === ("tex-doc-header-"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texDocHeaderx;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texDocHeaderx;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texDocHeaderx;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texDocHeaderx;
                                                  var left1_673612 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673612, value);
                                                }
                                              }
                                            }
                                            var _arg_33521 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_33521);
                                          }
                                          else {
                                            if ((key === ("tex-footer"))) {
                                               
                                              if ((value === (""))) {
                                                var _x2 = "";
                                              }
                                              else {
                                                var _x4 = options.texFooter;
                                                var _x3 = (_x4 === (""));
                                                if (_x3) {
                                                  var _x5 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                                }
                                                else {
                                                  var _x7 = options.texFooter;
                                                  var _x6 = $compat.endsWith(_x7, "\n");
                                                  if (_x6) {
                                                    var _x8 = options.texFooter;
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                  }
                                                  else {
                                                     
                                                    var _x9 = options.texFooter;
                                                    var left1_673613 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673613, value);
                                                  }
                                                }
                                              }
                                              var _arg_35711 = _x2;
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_35711);
                                            }
                                            else {
                                              if ((key === ("tex-section-num"))) {
                                                 
                                                var _arg_37791 = (value !== (""));
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_37791);
                                              }
                                              else {
                                                if ((key === ("fragment-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("extract-start"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("fragment-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("extract-end"))) {
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                      }
                                                      else {
                                                        if ((key === ("cite-all"))) {
                                                           
                                                          var _arg_43711 = (value !== (""));
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_43711);
                                                        }
                                                        else {
                                                          if ((key === ("embed"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_46622 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_46622);
                                                          }
                                                          else {
                                                            if ((key === ("embed-limit"))) {
                                                               
                                                              if ((value === (""))) {
                                                                var _x2 = 0;
                                                              }
                                                              else {
                                                                var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                              }
                                                              var _arg_46623 = _x2;
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_46623);
                                                            }
                                                            else {
                                                              if ((key === ("section-depth"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("section-base"))) {
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                }
                                                                else {
                                                                  if ((key === ("highlight"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_52122 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_52122);
                                                                  }
                                                                  else {
                                                                    if ((key === ("colorize"))) {
                                                                       
                                                                      var _x2 = ((value === (""))) ? false : true;
                                                                      var _arg_52123 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_52123);
                                                                    }
                                                                    else {
                                                                      if ((key === ("highlight-language"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left29_6842 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left29_6842, value);
                                                                        }
                                                                        var _arg_55152 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_55152);
                                                                      }
                                                                      else {
                                                                        if ((key === ("colorizer"))) {
                                                                           
                                                                          if ((value === (""))) {
                                                                            var _x2 = "";
                                                                          }
                                                                          else {
                                                                             
                                                                            var _x3 = options.hilitelang;
                                                                            var left31_6847 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left31_6847, value);
                                                                          }
                                                                          var _arg_55153 = _x2;
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_55153);
                                                                        }
                                                                        else {
                                                                          if ((key === ("rebuild"))) {
                                                                             
                                                                            var _arg_56981 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_56981);
                                                                          }
                                                                          else {
                                                                            if ((key === ("star-bold"))) {
                                                                               
                                                                              var _arg_59251 = (value !== (""));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_59251);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no"))) {
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                              }
                                                                              else {
                                                                                if ((key === ("line-no-web"))) {
                                                                                   
                                                                                  var _arg_62931 = (lvalue === ("true"));
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_62931);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("pretty-align"))) {
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("refer"))) {
                                                                                       
                                                                                      $compat_log.log("filesRefer", value);
                                                                                      return options;
                                                                                    }
                                                                                    else {
                                                                                      if ((key === ("copy-styles"))) {
                                                                                         
                                                                                        var _arg_66731 = (value !== (""));
                                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_66731);
                                                                                      }
                                                                                      else {
                                                                                        return options;
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                      else {
                        if ((key === ("document-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("doc-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("bib"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left33_6852 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left33_6852, value);
                              }
                              var _arg_24836 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24836);
                            }
                            else {
                              if ((key === ("bibliography"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left35_6857 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left35_6857, value);
                                }
                                var _arg_248301 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248301);
                              }
                              else {
                                if ((key === ("bib-data"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left37_6862 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left37_6862, value);
                                  }
                                  var _arg_248311 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248311);
                                }
                                else {
                                  if ((key === ("tex-header"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeader;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeader;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeader;
                                          var left1_673614 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673614, value);
                                        }
                                      }
                                    }
                                    var _arg_26952 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_26952);
                                  }
                                  else {
                                    if ((key === ("tex-header-"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeaderx;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeaderx;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeaderx;
                                            var left1_673615 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673615, value);
                                          }
                                        }
                                      }
                                      var _arg_29142 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_29142);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeader;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeader;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeader;
                                              var left1_673616 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673616, value);
                                            }
                                          }
                                        }
                                        var _arg_31332 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_31332);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header-"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeaderx;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeaderx;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeaderx;
                                                var left1_673617 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673617, value);
                                              }
                                            }
                                          }
                                          var _arg_33522 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_33522);
                                        }
                                        else {
                                          if ((key === ("tex-footer"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texFooter;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texFooter;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texFooter;
                                                  var left1_673618 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673618, value);
                                                }
                                              }
                                            }
                                            var _arg_35712 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_35712);
                                          }
                                          else {
                                            if ((key === ("tex-section-num"))) {
                                               
                                              var _arg_37792 = (value !== (""));
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_37792);
                                            }
                                            else {
                                              if ((key === ("fragment-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("extract-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("fragment-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("extract-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("cite-all"))) {
                                                         
                                                        var _arg_43712 = (value !== (""));
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_43712);
                                                      }
                                                      else {
                                                        if ((key === ("embed"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_46624 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_46624);
                                                        }
                                                        else {
                                                          if ((key === ("embed-limit"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_466201 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466201);
                                                          }
                                                          else {
                                                            if ((key === ("section-depth"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("section-base"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("highlight"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_52124 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_52124);
                                                                }
                                                                else {
                                                                  if ((key === ("colorize"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_521201 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521201);
                                                                  }
                                                                  else {
                                                                    if ((key === ("highlight-language"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left39_6872 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left39_6872, value);
                                                                      }
                                                                      var _arg_55154 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_55154);
                                                                    }
                                                                    else {
                                                                      if ((key === ("colorizer"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left41_6877 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left41_6877, value);
                                                                        }
                                                                        var _arg_551501 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551501);
                                                                      }
                                                                      else {
                                                                        if ((key === ("rebuild"))) {
                                                                           
                                                                          var _arg_56982 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_56982);
                                                                        }
                                                                        else {
                                                                          if ((key === ("star-bold"))) {
                                                                             
                                                                            var _arg_59252 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_59252);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no"))) {
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no-web"))) {
                                                                                 
                                                                                var _arg_62932 = (lvalue === ("true"));
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_62932);
                                                                              }
                                                                              else {
                                                                                if ((key === ("pretty-align"))) {
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("refer"))) {
                                                                                     
                                                                                    $compat_log.log("filesRefer", value);
                                                                                    return options;
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("copy-styles"))) {
                                                                                       
                                                                                      var _arg_66732 = (value !== (""));
                                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_66732);
                                                                                    }
                                                                                    else {
                                                                                      return options;
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              else {
                if ((key === ("header-depth"))) {
                  if ($std_core._int_ge(ivalue,0)) {
                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                  }
                  else {
                    if ((key === ("heading-base"))) {
                      if ($std_core._int_ge(ivalue,0)) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                      }
                      else {
                        if ((key === ("document-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("doc-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("bib"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left43_6882 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left43_6882, value);
                              }
                              var _arg_24837 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24837);
                            }
                            else {
                              if ((key === ("bibliography"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left45_6887 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left45_6887, value);
                                }
                                var _arg_248302 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248302);
                              }
                              else {
                                if ((key === ("bib-data"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left47_6892 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left47_6892, value);
                                  }
                                  var _arg_248312 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248312);
                                }
                                else {
                                  if ((key === ("tex-header"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeader;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeader;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeader;
                                          var left1_673619 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673619, value);
                                        }
                                      }
                                    }
                                    var _arg_26953 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_26953);
                                  }
                                  else {
                                    if ((key === ("tex-header-"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeaderx;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeaderx;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeaderx;
                                            var left1_673620 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673620, value);
                                          }
                                        }
                                      }
                                      var _arg_29143 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_29143);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeader;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeader;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeader;
                                              var left1_673621 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673621, value);
                                            }
                                          }
                                        }
                                        var _arg_31333 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_31333);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header-"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeaderx;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeaderx;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeaderx;
                                                var left1_673622 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673622, value);
                                              }
                                            }
                                          }
                                          var _arg_33523 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_33523);
                                        }
                                        else {
                                          if ((key === ("tex-footer"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texFooter;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texFooter;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texFooter;
                                                  var left1_673623 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673623, value);
                                                }
                                              }
                                            }
                                            var _arg_35713 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_35713);
                                          }
                                          else {
                                            if ((key === ("tex-section-num"))) {
                                               
                                              var _arg_37793 = (value !== (""));
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_37793);
                                            }
                                            else {
                                              if ((key === ("fragment-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("extract-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("fragment-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("extract-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("cite-all"))) {
                                                         
                                                        var _arg_43713 = (value !== (""));
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_43713);
                                                      }
                                                      else {
                                                        if ((key === ("embed"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_46625 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_46625);
                                                        }
                                                        else {
                                                          if ((key === ("embed-limit"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_466202 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466202);
                                                          }
                                                          else {
                                                            if ((key === ("section-depth"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("section-base"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("highlight"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_52125 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_52125);
                                                                }
                                                                else {
                                                                  if ((key === ("colorize"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_521202 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521202);
                                                                  }
                                                                  else {
                                                                    if ((key === ("highlight-language"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left49_6902 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left49_6902, value);
                                                                      }
                                                                      var _arg_55155 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_55155);
                                                                    }
                                                                    else {
                                                                      if ((key === ("colorizer"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left51_6907 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left51_6907, value);
                                                                        }
                                                                        var _arg_551502 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551502);
                                                                      }
                                                                      else {
                                                                        if ((key === ("rebuild"))) {
                                                                           
                                                                          var _arg_56983 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_56983);
                                                                        }
                                                                        else {
                                                                          if ((key === ("star-bold"))) {
                                                                             
                                                                            var _arg_59253 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_59253);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no"))) {
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no-web"))) {
                                                                                 
                                                                                var _arg_62933 = (lvalue === ("true"));
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_62933);
                                                                              }
                                                                              else {
                                                                                if ((key === ("pretty-align"))) {
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("refer"))) {
                                                                                     
                                                                                    $compat_log.log("filesRefer", value);
                                                                                    return options;
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("copy-styles"))) {
                                                                                       
                                                                                      var _arg_66733 = (value !== (""));
                                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_66733);
                                                                                    }
                                                                                    else {
                                                                                      return options;
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    else {
                      if ((key === ("header-base"))) {
                        if ($std_core._int_ge(ivalue,0)) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                        }
                        else {
                          if ((key === ("document-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("doc-class"))) {
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                            }
                            else {
                              if ((key === ("bib"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left53_6912 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left53_6912, value);
                                }
                                var _arg_24838 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24838);
                              }
                              else {
                                if ((key === ("bibliography"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left55_6917 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left55_6917, value);
                                  }
                                  var _arg_248303 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248303);
                                }
                                else {
                                  if ((key === ("bib-data"))) {
                                     
                                    if ((value !== (""))) {
                                      $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                    }
                                    else {
                                      $std_core_types._Unit_;
                                    }
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                       
                                      var _x3 = options.bib;
                                      var left57_6922 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left57_6922, value);
                                    }
                                    var _arg_248313 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248313);
                                  }
                                  else {
                                    if ((key === ("tex-header"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeader;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeader;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeader;
                                            var left1_673624 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673624, value);
                                          }
                                        }
                                      }
                                      var _arg_26954 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_26954);
                                    }
                                    else {
                                      if ((key === ("tex-header-"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texHeaderx;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texHeaderx;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texHeaderx;
                                              var left1_673625 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673625, value);
                                            }
                                          }
                                        }
                                        var _arg_29144 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_29144);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeader;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeader;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeader;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeader;
                                                var left1_673626 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673626, value);
                                              }
                                            }
                                          }
                                          var _arg_31334 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_31334);
                                        }
                                        else {
                                          if ((key === ("tex-doc-header-"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texDocHeaderx;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texDocHeaderx;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texDocHeaderx;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texDocHeaderx;
                                                  var left1_673627 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673627, value);
                                                }
                                              }
                                            }
                                            var _arg_33524 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_33524);
                                          }
                                          else {
                                            if ((key === ("tex-footer"))) {
                                               
                                              if ((value === (""))) {
                                                var _x2 = "";
                                              }
                                              else {
                                                var _x4 = options.texFooter;
                                                var _x3 = (_x4 === (""));
                                                if (_x3) {
                                                  var _x5 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                                }
                                                else {
                                                  var _x7 = options.texFooter;
                                                  var _x6 = $compat.endsWith(_x7, "\n");
                                                  if (_x6) {
                                                    var _x8 = options.texFooter;
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                  }
                                                  else {
                                                     
                                                    var _x9 = options.texFooter;
                                                    var left1_673628 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673628, value);
                                                  }
                                                }
                                              }
                                              var _arg_35714 = _x2;
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_35714);
                                            }
                                            else {
                                              if ((key === ("tex-section-num"))) {
                                                 
                                                var _arg_37794 = (value !== (""));
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_37794);
                                              }
                                              else {
                                                if ((key === ("fragment-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("extract-start"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("fragment-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("extract-end"))) {
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                      }
                                                      else {
                                                        if ((key === ("cite-all"))) {
                                                           
                                                          var _arg_43714 = (value !== (""));
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_43714);
                                                        }
                                                        else {
                                                          if ((key === ("embed"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_46626 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_46626);
                                                          }
                                                          else {
                                                            if ((key === ("embed-limit"))) {
                                                               
                                                              if ((value === (""))) {
                                                                var _x2 = 0;
                                                              }
                                                              else {
                                                                var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                              }
                                                              var _arg_466203 = _x2;
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466203);
                                                            }
                                                            else {
                                                              if ((key === ("section-depth"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("section-base"))) {
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                }
                                                                else {
                                                                  if ((key === ("highlight"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_52126 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_52126);
                                                                  }
                                                                  else {
                                                                    if ((key === ("colorize"))) {
                                                                       
                                                                      var _x2 = ((value === (""))) ? false : true;
                                                                      var _arg_521203 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521203);
                                                                    }
                                                                    else {
                                                                      if ((key === ("highlight-language"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left59_6932 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left59_6932, value);
                                                                        }
                                                                        var _arg_55156 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_55156);
                                                                      }
                                                                      else {
                                                                        if ((key === ("colorizer"))) {
                                                                           
                                                                          if ((value === (""))) {
                                                                            var _x2 = "";
                                                                          }
                                                                          else {
                                                                             
                                                                            var _x3 = options.hilitelang;
                                                                            var left61_6937 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left61_6937, value);
                                                                          }
                                                                          var _arg_551503 = _x2;
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551503);
                                                                        }
                                                                        else {
                                                                          if ((key === ("rebuild"))) {
                                                                             
                                                                            var _arg_56984 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_56984);
                                                                          }
                                                                          else {
                                                                            if ((key === ("star-bold"))) {
                                                                               
                                                                              var _arg_59254 = (value !== (""));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_59254);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no"))) {
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                              }
                                                                              else {
                                                                                if ((key === ("line-no-web"))) {
                                                                                   
                                                                                  var _arg_62934 = (lvalue === ("true"));
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_62934);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("pretty-align"))) {
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("refer"))) {
                                                                                       
                                                                                      $compat_log.log("filesRefer", value);
                                                                                      return options;
                                                                                    }
                                                                                    else {
                                                                                      if ((key === ("copy-styles"))) {
                                                                                         
                                                                                        var _arg_66734 = (value !== (""));
                                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_66734);
                                                                                      }
                                                                                      else {
                                                                                        return options;
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                      else {
                        if ((key === ("base-header-level"))) {
                          if ($std_core._int_ge(ivalue,0)) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                          }
                          else {
                            if ((key === ("document-class"))) {
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                            }
                            else {
                              if ((key === ("doc-class"))) {
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                              }
                              else {
                                if ((key === ("bib"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left63_6942 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left63_6942, value);
                                  }
                                  var _arg_24839 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24839);
                                }
                                else {
                                  if ((key === ("bibliography"))) {
                                     
                                    if ((value !== (""))) {
                                      $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                    }
                                    else {
                                      $std_core_types._Unit_;
                                    }
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                       
                                      var _x3 = options.bib;
                                      var left65_6947 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left65_6947, value);
                                    }
                                    var _arg_248314 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248314);
                                  }
                                  else {
                                    if ((key === ("bib-data"))) {
                                       
                                      if ((value !== (""))) {
                                        $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                      }
                                      else {
                                        $std_core_types._Unit_;
                                      }
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                         
                                        var _x3 = options.bib;
                                        var left67_6952 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left67_6952, value);
                                      }
                                      var _arg_248315 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248315);
                                    }
                                    else {
                                      if ((key === ("tex-header"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texHeader;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texHeader;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texHeader;
                                              var left1_673629 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673629, value);
                                            }
                                          }
                                        }
                                        var _arg_26955 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_26955);
                                      }
                                      else {
                                        if ((key === ("tex-header-"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texHeaderx;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texHeaderx;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texHeaderx;
                                                var left1_673630 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673630, value);
                                              }
                                            }
                                          }
                                          var _arg_29145 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_29145);
                                        }
                                        else {
                                          if ((key === ("tex-doc-header"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texDocHeader;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texDocHeader;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texDocHeader;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texDocHeader;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texDocHeader;
                                                  var left1_673631 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673631, value);
                                                }
                                              }
                                            }
                                            var _arg_31335 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_31335);
                                          }
                                          else {
                                            if ((key === ("tex-doc-header-"))) {
                                               
                                              if ((value === (""))) {
                                                var _x2 = "";
                                              }
                                              else {
                                                var _x4 = options.texDocHeaderx;
                                                var _x3 = (_x4 === (""));
                                                if (_x3) {
                                                  var _x5 = options.texDocHeaderx;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                                }
                                                else {
                                                  var _x7 = options.texDocHeaderx;
                                                  var _x6 = $compat.endsWith(_x7, "\n");
                                                  if (_x6) {
                                                    var _x8 = options.texDocHeaderx;
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                  }
                                                  else {
                                                     
                                                    var _x9 = options.texDocHeaderx;
                                                    var left1_673632 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673632, value);
                                                  }
                                                }
                                              }
                                              var _arg_33525 = _x2;
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_33525);
                                            }
                                            else {
                                              if ((key === ("tex-footer"))) {
                                                 
                                                if ((value === (""))) {
                                                  var _x2 = "";
                                                }
                                                else {
                                                  var _x4 = options.texFooter;
                                                  var _x3 = (_x4 === (""));
                                                  if (_x3) {
                                                    var _x5 = options.texFooter;
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                                  }
                                                  else {
                                                    var _x7 = options.texFooter;
                                                    var _x6 = $compat.endsWith(_x7, "\n");
                                                    if (_x6) {
                                                      var _x8 = options.texFooter;
                                                      var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                    }
                                                    else {
                                                       
                                                      var _x9 = options.texFooter;
                                                      var left1_673633 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673633, value);
                                                    }
                                                  }
                                                }
                                                var _arg_35715 = _x2;
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_35715);
                                              }
                                              else {
                                                if ((key === ("tex-section-num"))) {
                                                   
                                                  var _arg_37795 = (value !== (""));
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_37795);
                                                }
                                                else {
                                                  if ((key === ("fragment-start"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("extract-start"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("fragment-end"))) {
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                      }
                                                      else {
                                                        if ((key === ("extract-end"))) {
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                        }
                                                        else {
                                                          if ((key === ("cite-all"))) {
                                                             
                                                            var _arg_43715 = (value !== (""));
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_43715);
                                                          }
                                                          else {
                                                            if ((key === ("embed"))) {
                                                               
                                                              if ((value === (""))) {
                                                                var _x2 = 0;
                                                              }
                                                              else {
                                                                var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                              }
                                                              var _arg_46627 = _x2;
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_46627);
                                                            }
                                                            else {
                                                              if ((key === ("embed-limit"))) {
                                                                 
                                                                if ((value === (""))) {
                                                                  var _x2 = 0;
                                                                }
                                                                else {
                                                                  var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                                }
                                                                var _arg_46628 = _x2;
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_46628);
                                                              }
                                                              else {
                                                                if ((key === ("section-depth"))) {
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                }
                                                                else {
                                                                  if ((key === ("section-base"))) {
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                  }
                                                                  else {
                                                                    if ((key === ("highlight"))) {
                                                                       
                                                                      var _x2 = ((value === (""))) ? false : true;
                                                                      var _arg_52127 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_52127);
                                                                    }
                                                                    else {
                                                                      if ((key === ("colorize"))) {
                                                                         
                                                                        var _x2 = ((value === (""))) ? false : true;
                                                                        var _arg_52128 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_52128);
                                                                      }
                                                                      else {
                                                                        if ((key === ("highlight-language"))) {
                                                                           
                                                                          if ((value === (""))) {
                                                                            var _x2 = "";
                                                                          }
                                                                          else {
                                                                             
                                                                            var _x3 = options.hilitelang;
                                                                            var left69_6962 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left69_6962, value);
                                                                          }
                                                                          var _arg_55157 = _x2;
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_55157);
                                                                        }
                                                                        else {
                                                                          if ((key === ("colorizer"))) {
                                                                             
                                                                            if ((value === (""))) {
                                                                              var _x2 = "";
                                                                            }
                                                                            else {
                                                                               
                                                                              var _x3 = options.hilitelang;
                                                                              var left71_6967 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left71_6967, value);
                                                                            }
                                                                            var _arg_55158 = _x2;
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_55158);
                                                                          }
                                                                          else {
                                                                            if ((key === ("rebuild"))) {
                                                                               
                                                                              var _arg_56985 = (value !== (""));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_56985);
                                                                            }
                                                                            else {
                                                                              if ((key === ("star-bold"))) {
                                                                                 
                                                                                var _arg_59255 = (value !== (""));
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_59255);
                                                                              }
                                                                              else {
                                                                                if ((key === ("line-no"))) {
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("line-no-web"))) {
                                                                                     
                                                                                    var _arg_62935 = (lvalue === ("true"));
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_62935);
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("pretty-align"))) {
                                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                    }
                                                                                    else {
                                                                                      if ((key === ("refer"))) {
                                                                                         
                                                                                        $compat_log.log("filesRefer", value);
                                                                                        return options;
                                                                                      }
                                                                                      else {
                                                                                        if ((key === ("copy-styles"))) {
                                                                                           
                                                                                          var _arg_66735 = (value !== (""));
                                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_66735);
                                                                                        }
                                                                                        else {
                                                                                          return options;
                                                                                        }
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                        else {
                          if ((key === ("document-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("doc-class"))) {
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                            }
                            else {
                              if ((key === ("bib"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left73_6972 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left73_6972, value);
                                }
                                var _arg_248316 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248316);
                              }
                              else {
                                if ((key === ("bibliography"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left75_6977 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left75_6977, value);
                                  }
                                  var _arg_248304 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248304);
                                }
                                else {
                                  if ((key === ("bib-data"))) {
                                     
                                    if ((value !== (""))) {
                                      $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                    }
                                    else {
                                      $std_core_types._Unit_;
                                    }
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                       
                                      var _x3 = options.bib;
                                      var left77_6982 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left77_6982, value);
                                    }
                                    var _arg_248317 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248317);
                                  }
                                  else {
                                    if ((key === ("tex-header"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeader;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeader;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeader;
                                            var left1_673634 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673634, value);
                                          }
                                        }
                                      }
                                      var _arg_26956 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_26956);
                                    }
                                    else {
                                      if ((key === ("tex-header-"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texHeaderx;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texHeaderx;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texHeaderx;
                                              var left1_673635 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673635, value);
                                            }
                                          }
                                        }
                                        var _arg_29146 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_29146);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeader;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeader;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeader;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeader;
                                                var left1_673636 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673636, value);
                                              }
                                            }
                                          }
                                          var _arg_31336 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_31336);
                                        }
                                        else {
                                          if ((key === ("tex-doc-header-"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texDocHeaderx;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texDocHeaderx;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texDocHeaderx;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texDocHeaderx;
                                                  var left1_673637 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673637, value);
                                                }
                                              }
                                            }
                                            var _arg_33526 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_33526);
                                          }
                                          else {
                                            if ((key === ("tex-footer"))) {
                                               
                                              if ((value === (""))) {
                                                var _x2 = "";
                                              }
                                              else {
                                                var _x4 = options.texFooter;
                                                var _x3 = (_x4 === (""));
                                                if (_x3) {
                                                  var _x5 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                                }
                                                else {
                                                  var _x7 = options.texFooter;
                                                  var _x6 = $compat.endsWith(_x7, "\n");
                                                  if (_x6) {
                                                    var _x8 = options.texFooter;
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                  }
                                                  else {
                                                     
                                                    var _x9 = options.texFooter;
                                                    var left1_673638 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673638, value);
                                                  }
                                                }
                                              }
                                              var _arg_35716 = _x2;
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_35716);
                                            }
                                            else {
                                              if ((key === ("tex-section-num"))) {
                                                 
                                                var _arg_37796 = (value !== (""));
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_37796);
                                              }
                                              else {
                                                if ((key === ("fragment-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("extract-start"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("fragment-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("extract-end"))) {
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                      }
                                                      else {
                                                        if ((key === ("cite-all"))) {
                                                           
                                                          var _arg_43716 = (value !== (""));
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_43716);
                                                        }
                                                        else {
                                                          if ((key === ("embed"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_46629 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_46629);
                                                          }
                                                          else {
                                                            if ((key === ("embed-limit"))) {
                                                               
                                                              if ((value === (""))) {
                                                                var _x2 = 0;
                                                              }
                                                              else {
                                                                var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                              }
                                                              var _arg_466204 = _x2;
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466204);
                                                            }
                                                            else {
                                                              if ((key === ("section-depth"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("section-base"))) {
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                }
                                                                else {
                                                                  if ((key === ("highlight"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_52129 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_52129);
                                                                  }
                                                                  else {
                                                                    if ((key === ("colorize"))) {
                                                                       
                                                                      var _x2 = ((value === (""))) ? false : true;
                                                                      var _arg_521204 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521204);
                                                                    }
                                                                    else {
                                                                      if ((key === ("highlight-language"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left79_6992 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left79_6992, value);
                                                                        }
                                                                        var _arg_55159 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_55159);
                                                                      }
                                                                      else {
                                                                        if ((key === ("colorizer"))) {
                                                                           
                                                                          if ((value === (""))) {
                                                                            var _x2 = "";
                                                                          }
                                                                          else {
                                                                             
                                                                            var _x3 = options.hilitelang;
                                                                            var left81_6997 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left81_6997, value);
                                                                          }
                                                                          var _arg_551504 = _x2;
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551504);
                                                                        }
                                                                        else {
                                                                          if ((key === ("rebuild"))) {
                                                                             
                                                                            var _arg_56986 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_56986);
                                                                          }
                                                                          else {
                                                                            if ((key === ("star-bold"))) {
                                                                               
                                                                              var _arg_59256 = (value !== (""));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_59256);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no"))) {
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                              }
                                                                              else {
                                                                                if ((key === ("line-no-web"))) {
                                                                                   
                                                                                  var _arg_62936 = (lvalue === ("true"));
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_62936);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("pretty-align"))) {
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("refer"))) {
                                                                                       
                                                                                      $compat_log.log("filesRefer", value);
                                                                                      return options;
                                                                                    }
                                                                                    else {
                                                                                      if ((key === ("copy-styles"))) {
                                                                                         
                                                                                        var _arg_66736 = (value !== (""));
                                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_66736);
                                                                                      }
                                                                                      else {
                                                                                        return options;
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                else {
                  if ((key === ("heading-base"))) {
                    if ($std_core._int_ge(ivalue,0)) {
                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                    }
                    else {
                      if ((key === ("document-class"))) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                      }
                      else {
                        if ((key === ("doc-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("bib"))) {
                             
                            if ((value !== (""))) {
                              $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                            }
                            else {
                              $std_core_types._Unit_;
                            }
                             
                            if ((value === (""))) {
                              var _x2 = "";
                            }
                            else {
                               
                              var _x3 = options.bib;
                              var left83_7002 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                              var _x2 = $std_core._lp__plus__plus__1_rp_(left83_7002, value);
                            }
                            var _arg_248318 = _x2;
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248318);
                          }
                          else {
                            if ((key === ("bibliography"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left85_7007 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left85_7007, value);
                              }
                              var _arg_248305 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248305);
                            }
                            else {
                              if ((key === ("bib-data"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left87_7012 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left87_7012, value);
                                }
                                var _arg_248319 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248319);
                              }
                              else {
                                if ((key === ("tex-header"))) {
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                    var _x4 = options.texHeader;
                                    var _x3 = (_x4 === (""));
                                    if (_x3) {
                                      var _x5 = options.texHeader;
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                    }
                                    else {
                                      var _x7 = options.texHeader;
                                      var _x6 = $compat.endsWith(_x7, "\n");
                                      if (_x6) {
                                        var _x8 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                      }
                                      else {
                                         
                                        var _x9 = options.texHeader;
                                        var left1_673639 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673639, value);
                                      }
                                    }
                                  }
                                  var _arg_26957 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_26957);
                                }
                                else {
                                  if ((key === ("tex-header-"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeaderx;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeaderx;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeaderx;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeaderx;
                                          var left1_673640 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673640, value);
                                        }
                                      }
                                    }
                                    var _arg_29147 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_29147);
                                  }
                                  else {
                                    if ((key === ("tex-doc-header"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texDocHeader;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texDocHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texDocHeader;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texDocHeader;
                                            var left1_673641 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673641, value);
                                          }
                                        }
                                      }
                                      var _arg_31337 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_31337);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header-"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeaderx;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeaderx;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeaderx;
                                              var left1_673642 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673642, value);
                                            }
                                          }
                                        }
                                        var _arg_33527 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_33527);
                                      }
                                      else {
                                        if ((key === ("tex-footer"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texFooter;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texFooter;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texFooter;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texFooter;
                                                var left1_673643 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673643, value);
                                              }
                                            }
                                          }
                                          var _arg_35717 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_35717);
                                        }
                                        else {
                                          if ((key === ("tex-section-num"))) {
                                             
                                            var _arg_37797 = (value !== (""));
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_37797);
                                          }
                                          else {
                                            if ((key === ("fragment-start"))) {
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                            }
                                            else {
                                              if ((key === ("extract-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("fragment-end"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("extract-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("cite-all"))) {
                                                       
                                                      var _arg_43717 = (value !== (""));
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_43717);
                                                    }
                                                    else {
                                                      if ((key === ("embed"))) {
                                                         
                                                        if ((value === (""))) {
                                                          var _x2 = 0;
                                                        }
                                                        else {
                                                          var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                        }
                                                        var _arg_466210 = _x2;
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466210);
                                                      }
                                                      else {
                                                        if ((key === ("embed-limit"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_466205 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466205);
                                                        }
                                                        else {
                                                          if ((key === ("section-depth"))) {
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                          }
                                                          else {
                                                            if ((key === ("section-base"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("highlight"))) {
                                                                 
                                                                var _x2 = ((value === (""))) ? false : true;
                                                                var _arg_521210 = _x2;
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521210);
                                                              }
                                                              else {
                                                                if ((key === ("colorize"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_521205 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521205);
                                                                }
                                                                else {
                                                                  if ((key === ("highlight-language"))) {
                                                                     
                                                                    if ((value === (""))) {
                                                                      var _x2 = "";
                                                                    }
                                                                    else {
                                                                       
                                                                      var _x3 = options.hilitelang;
                                                                      var left89_7022 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left89_7022, value);
                                                                    }
                                                                    var _arg_551510 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551510);
                                                                  }
                                                                  else {
                                                                    if ((key === ("colorizer"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left91_7027 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left91_7027, value);
                                                                      }
                                                                      var _arg_551505 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551505);
                                                                    }
                                                                    else {
                                                                      if ((key === ("rebuild"))) {
                                                                         
                                                                        var _arg_56987 = (value !== (""));
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_56987);
                                                                      }
                                                                      else {
                                                                        if ((key === ("star-bold"))) {
                                                                           
                                                                          var _arg_59257 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_59257);
                                                                        }
                                                                        else {
                                                                          if ((key === ("line-no"))) {
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no-web"))) {
                                                                               
                                                                              var _arg_62937 = (lvalue === ("true"));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_62937);
                                                                            }
                                                                            else {
                                                                              if ((key === ("pretty-align"))) {
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                              }
                                                                              else {
                                                                                if ((key === ("refer"))) {
                                                                                   
                                                                                  $compat_log.log("filesRefer", value);
                                                                                  return options;
                                                                                }
                                                                                else {
                                                                                  if ((key === ("copy-styles"))) {
                                                                                     
                                                                                    var _arg_66737 = (value !== (""));
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_66737);
                                                                                  }
                                                                                  else {
                                                                                    return options;
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  else {
                    if ((key === ("header-base"))) {
                      if ($std_core._int_ge(ivalue,0)) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                      }
                      else {
                        if ((key === ("document-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("doc-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("bib"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left93_7032 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left93_7032, value);
                              }
                              var _arg_248320 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248320);
                            }
                            else {
                              if ((key === ("bibliography"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left95_7037 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left95_7037, value);
                                }
                                var _arg_248306 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248306);
                              }
                              else {
                                if ((key === ("bib-data"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left97_7042 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left97_7042, value);
                                  }
                                  var _arg_2483110 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483110);
                                }
                                else {
                                  if ((key === ("tex-header"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeader;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeader;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeader;
                                          var left1_673644 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673644, value);
                                        }
                                      }
                                    }
                                    var _arg_26958 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_26958);
                                  }
                                  else {
                                    if ((key === ("tex-header-"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeaderx;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeaderx;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeaderx;
                                            var left1_673645 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673645, value);
                                          }
                                        }
                                      }
                                      var _arg_29148 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_29148);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeader;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeader;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeader;
                                              var left1_673646 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673646, value);
                                            }
                                          }
                                        }
                                        var _arg_31338 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_31338);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header-"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeaderx;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeaderx;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeaderx;
                                                var left1_673647 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673647, value);
                                              }
                                            }
                                          }
                                          var _arg_33528 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_33528);
                                        }
                                        else {
                                          if ((key === ("tex-footer"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texFooter;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texFooter;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texFooter;
                                                  var left1_673648 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673648, value);
                                                }
                                              }
                                            }
                                            var _arg_35718 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_35718);
                                          }
                                          else {
                                            if ((key === ("tex-section-num"))) {
                                               
                                              var _arg_37798 = (value !== (""));
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_37798);
                                            }
                                            else {
                                              if ((key === ("fragment-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("extract-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("fragment-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("extract-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("cite-all"))) {
                                                         
                                                        var _arg_43718 = (value !== (""));
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_43718);
                                                      }
                                                      else {
                                                        if ((key === ("embed"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_466211 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466211);
                                                        }
                                                        else {
                                                          if ((key === ("embed-limit"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_466206 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466206);
                                                          }
                                                          else {
                                                            if ((key === ("section-depth"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("section-base"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("highlight"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_521211 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521211);
                                                                }
                                                                else {
                                                                  if ((key === ("colorize"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_521206 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521206);
                                                                  }
                                                                  else {
                                                                    if ((key === ("highlight-language"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left99_7052 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left99_7052, value);
                                                                      }
                                                                      var _arg_551511 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551511);
                                                                    }
                                                                    else {
                                                                      if ((key === ("colorizer"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left101_7057 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left101_7057, value);
                                                                        }
                                                                        var _arg_551506 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551506);
                                                                      }
                                                                      else {
                                                                        if ((key === ("rebuild"))) {
                                                                           
                                                                          var _arg_56988 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_56988);
                                                                        }
                                                                        else {
                                                                          if ((key === ("star-bold"))) {
                                                                             
                                                                            var _arg_59258 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_59258);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no"))) {
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no-web"))) {
                                                                                 
                                                                                var _arg_62938 = (lvalue === ("true"));
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_62938);
                                                                              }
                                                                              else {
                                                                                if ((key === ("pretty-align"))) {
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("refer"))) {
                                                                                     
                                                                                    $compat_log.log("filesRefer", value);
                                                                                    return options;
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("copy-styles"))) {
                                                                                       
                                                                                      var _arg_66738 = (value !== (""));
                                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_66738);
                                                                                    }
                                                                                    else {
                                                                                      return options;
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    else {
                      if ((key === ("base-header-level"))) {
                        if ($std_core._int_ge(ivalue,0)) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                        }
                        else {
                          if ((key === ("document-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("doc-class"))) {
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                            }
                            else {
                              if ((key === ("bib"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left103_7062 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left103_7062, value);
                                }
                                var _arg_248321 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248321);
                              }
                              else {
                                if ((key === ("bibliography"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left105_7067 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left105_7067, value);
                                  }
                                  var _arg_248307 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248307);
                                }
                                else {
                                  if ((key === ("bib-data"))) {
                                     
                                    if ((value !== (""))) {
                                      $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                    }
                                    else {
                                      $std_core_types._Unit_;
                                    }
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                       
                                      var _x3 = options.bib;
                                      var left107_7072 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left107_7072, value);
                                    }
                                    var _arg_2483111 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483111);
                                  }
                                  else {
                                    if ((key === ("tex-header"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeader;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeader;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeader;
                                            var left1_673649 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673649, value);
                                          }
                                        }
                                      }
                                      var _arg_26959 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_26959);
                                    }
                                    else {
                                      if ((key === ("tex-header-"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texHeaderx;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texHeaderx;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texHeaderx;
                                              var left1_673650 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673650, value);
                                            }
                                          }
                                        }
                                        var _arg_29149 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_29149);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeader;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeader;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeader;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeader;
                                                var left1_673651 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673651, value);
                                              }
                                            }
                                          }
                                          var _arg_31339 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_31339);
                                        }
                                        else {
                                          if ((key === ("tex-doc-header-"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texDocHeaderx;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texDocHeaderx;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texDocHeaderx;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texDocHeaderx;
                                                  var left1_673652 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673652, value);
                                                }
                                              }
                                            }
                                            var _arg_33529 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_33529);
                                          }
                                          else {
                                            if ((key === ("tex-footer"))) {
                                               
                                              if ((value === (""))) {
                                                var _x2 = "";
                                              }
                                              else {
                                                var _x4 = options.texFooter;
                                                var _x3 = (_x4 === (""));
                                                if (_x3) {
                                                  var _x5 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                                }
                                                else {
                                                  var _x7 = options.texFooter;
                                                  var _x6 = $compat.endsWith(_x7, "\n");
                                                  if (_x6) {
                                                    var _x8 = options.texFooter;
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                  }
                                                  else {
                                                     
                                                    var _x9 = options.texFooter;
                                                    var left1_673653 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673653, value);
                                                  }
                                                }
                                              }
                                              var _arg_35719 = _x2;
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_35719);
                                            }
                                            else {
                                              if ((key === ("tex-section-num"))) {
                                                 
                                                var _arg_37799 = (value !== (""));
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_37799);
                                              }
                                              else {
                                                if ((key === ("fragment-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("extract-start"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("fragment-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("extract-end"))) {
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                      }
                                                      else {
                                                        if ((key === ("cite-all"))) {
                                                           
                                                          var _arg_43719 = (value !== (""));
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_43719);
                                                        }
                                                        else {
                                                          if ((key === ("embed"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_466212 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466212);
                                                          }
                                                          else {
                                                            if ((key === ("embed-limit"))) {
                                                               
                                                              if ((value === (""))) {
                                                                var _x2 = 0;
                                                              }
                                                              else {
                                                                var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                              }
                                                              var _arg_466207 = _x2;
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466207);
                                                            }
                                                            else {
                                                              if ((key === ("section-depth"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("section-base"))) {
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                }
                                                                else {
                                                                  if ((key === ("highlight"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_521212 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521212);
                                                                  }
                                                                  else {
                                                                    if ((key === ("colorize"))) {
                                                                       
                                                                      var _x2 = ((value === (""))) ? false : true;
                                                                      var _arg_521207 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521207);
                                                                    }
                                                                    else {
                                                                      if ((key === ("highlight-language"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left109_7082 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left109_7082, value);
                                                                        }
                                                                        var _arg_551512 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551512);
                                                                      }
                                                                      else {
                                                                        if ((key === ("colorizer"))) {
                                                                           
                                                                          if ((value === (""))) {
                                                                            var _x2 = "";
                                                                          }
                                                                          else {
                                                                             
                                                                            var _x3 = options.hilitelang;
                                                                            var left111_7087 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left111_7087, value);
                                                                          }
                                                                          var _arg_551507 = _x2;
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551507);
                                                                        }
                                                                        else {
                                                                          if ((key === ("rebuild"))) {
                                                                             
                                                                            var _arg_56989 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_56989);
                                                                          }
                                                                          else {
                                                                            if ((key === ("star-bold"))) {
                                                                               
                                                                              var _arg_59259 = (value !== (""));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_59259);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no"))) {
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                              }
                                                                              else {
                                                                                if ((key === ("line-no-web"))) {
                                                                                   
                                                                                  var _arg_62939 = (lvalue === ("true"));
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_62939);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("pretty-align"))) {
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("refer"))) {
                                                                                       
                                                                                      $compat_log.log("filesRefer", value);
                                                                                      return options;
                                                                                    }
                                                                                    else {
                                                                                      if ((key === ("copy-styles"))) {
                                                                                         
                                                                                        var _arg_66739 = (value !== (""));
                                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_66739);
                                                                                      }
                                                                                      else {
                                                                                        return options;
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                      else {
                        if ((key === ("document-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("doc-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("bib"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left113_7092 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left113_7092, value);
                              }
                              var _arg_248322 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248322);
                            }
                            else {
                              if ((key === ("bibliography"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left115_7097 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left115_7097, value);
                                }
                                var _arg_2483000 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483000);
                              }
                              else {
                                if ((key === ("bib-data"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left117_7102 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left117_7102, value);
                                  }
                                  var _arg_2483100 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483100);
                                }
                                else {
                                  if ((key === ("tex-header"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeader;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeader;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeader;
                                          var left1_673654 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673654, value);
                                        }
                                      }
                                    }
                                    var _arg_269500 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_269500);
                                  }
                                  else {
                                    if ((key === ("tex-header-"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeaderx;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeaderx;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeaderx;
                                            var left1_673655 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673655, value);
                                          }
                                        }
                                      }
                                      var _arg_291400 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_291400);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeader;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeader;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeader;
                                              var left1_673656 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673656, value);
                                            }
                                          }
                                        }
                                        var _arg_313300 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_313300);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header-"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeaderx;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeaderx;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeaderx;
                                                var left1_673657 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673657, value);
                                              }
                                            }
                                          }
                                          var _arg_335200 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_335200);
                                        }
                                        else {
                                          if ((key === ("tex-footer"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texFooter;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texFooter;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texFooter;
                                                  var left1_673658 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673658, value);
                                                }
                                              }
                                            }
                                            var _arg_357100 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_357100);
                                          }
                                          else {
                                            if ((key === ("tex-section-num"))) {
                                               
                                              var _arg_377900 = (value !== (""));
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_377900);
                                            }
                                            else {
                                              if ((key === ("fragment-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("extract-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("fragment-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("extract-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("cite-all"))) {
                                                         
                                                        var _arg_437100 = (value !== (""));
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_437100);
                                                      }
                                                      else {
                                                        if ((key === ("embed"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_466213 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466213);
                                                        }
                                                        else {
                                                          if ((key === ("embed-limit"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_4662000 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4662000);
                                                          }
                                                          else {
                                                            if ((key === ("section-depth"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("section-base"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("highlight"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_521213 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521213);
                                                                }
                                                                else {
                                                                  if ((key === ("colorize"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_5212000 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5212000);
                                                                  }
                                                                  else {
                                                                    if ((key === ("highlight-language"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left119_7112 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left119_7112, value);
                                                                      }
                                                                      var _arg_551513 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551513);
                                                                    }
                                                                    else {
                                                                      if ((key === ("colorizer"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left121_7117 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left121_7117, value);
                                                                        }
                                                                        var _arg_5515000 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5515000);
                                                                      }
                                                                      else {
                                                                        if ((key === ("rebuild"))) {
                                                                           
                                                                          var _arg_569800 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_569800);
                                                                        }
                                                                        else {
                                                                          if ((key === ("star-bold"))) {
                                                                             
                                                                            var _arg_592500 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_592500);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no"))) {
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no-web"))) {
                                                                                 
                                                                                var _arg_629300 = (lvalue === ("true"));
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_629300);
                                                                              }
                                                                              else {
                                                                                if ((key === ("pretty-align"))) {
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("refer"))) {
                                                                                     
                                                                                    $compat_log.log("filesRefer", value);
                                                                                    return options;
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("copy-styles"))) {
                                                                                       
                                                                                      var _arg_667300 = (value !== (""));
                                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_667300);
                                                                                    }
                                                                                    else {
                                                                                      return options;
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          else {
            if ((key === ("heading-depth"))) {
              if ($std_core._int_ge(ivalue,0)) {
                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
              }
              else {
                if ((key === ("heading-base"))) {
                  if ($std_core._int_ge(ivalue,0)) {
                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                  }
                  else {
                    if ((key === ("document-class"))) {
                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                    }
                    else {
                      if ((key === ("doc-class"))) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                      }
                      else {
                        if ((key === ("bib"))) {
                           
                          if ((value !== (""))) {
                            $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                          }
                          else {
                            $std_core_types._Unit_;
                          }
                           
                          if ((value === (""))) {
                            var _x2 = "";
                          }
                          else {
                             
                            var _x3 = options.bib;
                            var left123_7122 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                            var _x2 = $std_core._lp__plus__plus__1_rp_(left123_7122, value);
                          }
                          var _arg_248323 = _x2;
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248323);
                        }
                        else {
                          if ((key === ("bibliography"))) {
                             
                            if ((value !== (""))) {
                              $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                            }
                            else {
                              $std_core_types._Unit_;
                            }
                             
                            if ((value === (""))) {
                              var _x2 = "";
                            }
                            else {
                               
                              var _x3 = options.bib;
                              var left125_7127 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                              var _x2 = $std_core._lp__plus__plus__1_rp_(left125_7127, value);
                            }
                            var _arg_248308 = _x2;
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248308);
                          }
                          else {
                            if ((key === ("bib-data"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left127_7132 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left127_7132, value);
                              }
                              var _arg_2483112 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483112);
                            }
                            else {
                              if ((key === ("tex-header"))) {
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                  var _x4 = options.texHeader;
                                  var _x3 = (_x4 === (""));
                                  if (_x3) {
                                    var _x5 = options.texHeader;
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                  }
                                  else {
                                    var _x7 = options.texHeader;
                                    var _x6 = $compat.endsWith(_x7, "\n");
                                    if (_x6) {
                                      var _x8 = options.texHeader;
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                    }
                                    else {
                                       
                                      var _x9 = options.texHeader;
                                      var left1_673659 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673659, value);
                                    }
                                  }
                                }
                                var _arg_269510 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_269510);
                              }
                              else {
                                if ((key === ("tex-header-"))) {
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                    var _x4 = options.texHeaderx;
                                    var _x3 = (_x4 === (""));
                                    if (_x3) {
                                      var _x5 = options.texHeaderx;
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                    }
                                    else {
                                      var _x7 = options.texHeaderx;
                                      var _x6 = $compat.endsWith(_x7, "\n");
                                      if (_x6) {
                                        var _x8 = options.texHeaderx;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                      }
                                      else {
                                         
                                        var _x9 = options.texHeaderx;
                                        var left1_673660 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673660, value);
                                      }
                                    }
                                  }
                                  var _arg_291410 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_291410);
                                }
                                else {
                                  if ((key === ("tex-doc-header"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texDocHeader;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texDocHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texDocHeader;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texDocHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texDocHeader;
                                          var left1_673661 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673661, value);
                                        }
                                      }
                                    }
                                    var _arg_313310 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_313310);
                                  }
                                  else {
                                    if ((key === ("tex-doc-header-"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texDocHeaderx;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texDocHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texDocHeaderx;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texDocHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texDocHeaderx;
                                            var left1_673662 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673662, value);
                                          }
                                        }
                                      }
                                      var _arg_335210 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_335210);
                                    }
                                    else {
                                      if ((key === ("tex-footer"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texFooter;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texFooter;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texFooter;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texFooter;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texFooter;
                                              var left1_673663 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673663, value);
                                            }
                                          }
                                        }
                                        var _arg_357110 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_357110);
                                      }
                                      else {
                                        if ((key === ("tex-section-num"))) {
                                           
                                          var _arg_377910 = (value !== (""));
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_377910);
                                        }
                                        else {
                                          if ((key === ("fragment-start"))) {
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                          }
                                          else {
                                            if ((key === ("extract-start"))) {
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                            }
                                            else {
                                              if ((key === ("fragment-end"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("extract-end"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("cite-all"))) {
                                                     
                                                    var _arg_437110 = (value !== (""));
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_437110);
                                                  }
                                                  else {
                                                    if ((key === ("embed"))) {
                                                       
                                                      if ((value === (""))) {
                                                        var _x2 = 0;
                                                      }
                                                      else {
                                                        var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                      }
                                                      var _arg_466214 = _x2;
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466214);
                                                    }
                                                    else {
                                                      if ((key === ("embed-limit"))) {
                                                         
                                                        if ((value === (""))) {
                                                          var _x2 = 0;
                                                        }
                                                        else {
                                                          var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                        }
                                                        var _arg_466208 = _x2;
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466208);
                                                      }
                                                      else {
                                                        if ((key === ("section-depth"))) {
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                        }
                                                        else {
                                                          if ((key === ("section-base"))) {
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                          }
                                                          else {
                                                            if ((key === ("highlight"))) {
                                                               
                                                              var _x2 = ((value === (""))) ? false : true;
                                                              var _arg_521214 = _x2;
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521214);
                                                            }
                                                            else {
                                                              if ((key === ("colorize"))) {
                                                                 
                                                                var _x2 = ((value === (""))) ? false : true;
                                                                var _arg_521208 = _x2;
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521208);
                                                              }
                                                              else {
                                                                if ((key === ("highlight-language"))) {
                                                                   
                                                                  if ((value === (""))) {
                                                                    var _x2 = "";
                                                                  }
                                                                  else {
                                                                     
                                                                    var _x3 = options.hilitelang;
                                                                    var left129_7142 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left129_7142, value);
                                                                  }
                                                                  var _arg_551514 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551514);
                                                                }
                                                                else {
                                                                  if ((key === ("colorizer"))) {
                                                                     
                                                                    if ((value === (""))) {
                                                                      var _x2 = "";
                                                                    }
                                                                    else {
                                                                       
                                                                      var _x3 = options.hilitelang;
                                                                      var left131_7147 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left131_7147, value);
                                                                    }
                                                                    var _arg_551508 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551508);
                                                                  }
                                                                  else {
                                                                    if ((key === ("rebuild"))) {
                                                                       
                                                                      var _arg_569810 = (value !== (""));
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_569810);
                                                                    }
                                                                    else {
                                                                      if ((key === ("star-bold"))) {
                                                                         
                                                                        var _arg_592510 = (value !== (""));
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_592510);
                                                                      }
                                                                      else {
                                                                        if ((key === ("line-no"))) {
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                        }
                                                                        else {
                                                                          if ((key === ("line-no-web"))) {
                                                                             
                                                                            var _arg_629310 = (lvalue === ("true"));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_629310);
                                                                          }
                                                                          else {
                                                                            if ((key === ("pretty-align"))) {
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                            }
                                                                            else {
                                                                              if ((key === ("refer"))) {
                                                                                 
                                                                                $compat_log.log("filesRefer", value);
                                                                                return options;
                                                                              }
                                                                              else {
                                                                                if ((key === ("copy-styles"))) {
                                                                                   
                                                                                  var _arg_667310 = (value !== (""));
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_667310);
                                                                                }
                                                                                else {
                                                                                  return options;
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                else {
                  if ((key === ("header-base"))) {
                    if ($std_core._int_ge(ivalue,0)) {
                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                    }
                    else {
                      if ((key === ("document-class"))) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                      }
                      else {
                        if ((key === ("doc-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("bib"))) {
                             
                            if ((value !== (""))) {
                              $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                            }
                            else {
                              $std_core_types._Unit_;
                            }
                             
                            if ((value === (""))) {
                              var _x2 = "";
                            }
                            else {
                               
                              var _x3 = options.bib;
                              var left133_7152 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                              var _x2 = $std_core._lp__plus__plus__1_rp_(left133_7152, value);
                            }
                            var _arg_248324 = _x2;
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248324);
                          }
                          else {
                            if ((key === ("bibliography"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left135_7157 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left135_7157, value);
                              }
                              var _arg_2483001 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483001);
                            }
                            else {
                              if ((key === ("bib-data"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left137_7162 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left137_7162, value);
                                }
                                var _arg_2483101 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483101);
                              }
                              else {
                                if ((key === ("tex-header"))) {
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                    var _x4 = options.texHeader;
                                    var _x3 = (_x4 === (""));
                                    if (_x3) {
                                      var _x5 = options.texHeader;
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                    }
                                    else {
                                      var _x7 = options.texHeader;
                                      var _x6 = $compat.endsWith(_x7, "\n");
                                      if (_x6) {
                                        var _x8 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                      }
                                      else {
                                         
                                        var _x9 = options.texHeader;
                                        var left1_673664 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673664, value);
                                      }
                                    }
                                  }
                                  var _arg_269501 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_269501);
                                }
                                else {
                                  if ((key === ("tex-header-"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeaderx;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeaderx;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeaderx;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeaderx;
                                          var left1_673665 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673665, value);
                                        }
                                      }
                                    }
                                    var _arg_291401 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_291401);
                                  }
                                  else {
                                    if ((key === ("tex-doc-header"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texDocHeader;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texDocHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texDocHeader;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texDocHeader;
                                            var left1_673666 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673666, value);
                                          }
                                        }
                                      }
                                      var _arg_313301 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_313301);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header-"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeaderx;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeaderx;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeaderx;
                                              var left1_673667 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673667, value);
                                            }
                                          }
                                        }
                                        var _arg_335201 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_335201);
                                      }
                                      else {
                                        if ((key === ("tex-footer"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texFooter;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texFooter;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texFooter;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texFooter;
                                                var left1_673668 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673668, value);
                                              }
                                            }
                                          }
                                          var _arg_357101 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_357101);
                                        }
                                        else {
                                          if ((key === ("tex-section-num"))) {
                                             
                                            var _arg_377901 = (value !== (""));
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_377901);
                                          }
                                          else {
                                            if ((key === ("fragment-start"))) {
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                            }
                                            else {
                                              if ((key === ("extract-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("fragment-end"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("extract-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("cite-all"))) {
                                                       
                                                      var _arg_437101 = (value !== (""));
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_437101);
                                                    }
                                                    else {
                                                      if ((key === ("embed"))) {
                                                         
                                                        if ((value === (""))) {
                                                          var _x2 = 0;
                                                        }
                                                        else {
                                                          var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                        }
                                                        var _arg_466215 = _x2;
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466215);
                                                      }
                                                      else {
                                                        if ((key === ("embed-limit"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_4662001 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4662001);
                                                        }
                                                        else {
                                                          if ((key === ("section-depth"))) {
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                          }
                                                          else {
                                                            if ((key === ("section-base"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("highlight"))) {
                                                                 
                                                                var _x2 = ((value === (""))) ? false : true;
                                                                var _arg_521215 = _x2;
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521215);
                                                              }
                                                              else {
                                                                if ((key === ("colorize"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_5212001 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5212001);
                                                                }
                                                                else {
                                                                  if ((key === ("highlight-language"))) {
                                                                     
                                                                    if ((value === (""))) {
                                                                      var _x2 = "";
                                                                    }
                                                                    else {
                                                                       
                                                                      var _x3 = options.hilitelang;
                                                                      var left139_7172 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left139_7172, value);
                                                                    }
                                                                    var _arg_551515 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551515);
                                                                  }
                                                                  else {
                                                                    if ((key === ("colorizer"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left141_7177 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left141_7177, value);
                                                                      }
                                                                      var _arg_5515001 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5515001);
                                                                    }
                                                                    else {
                                                                      if ((key === ("rebuild"))) {
                                                                         
                                                                        var _arg_569801 = (value !== (""));
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_569801);
                                                                      }
                                                                      else {
                                                                        if ((key === ("star-bold"))) {
                                                                           
                                                                          var _arg_592501 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_592501);
                                                                        }
                                                                        else {
                                                                          if ((key === ("line-no"))) {
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no-web"))) {
                                                                               
                                                                              var _arg_629301 = (lvalue === ("true"));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_629301);
                                                                            }
                                                                            else {
                                                                              if ((key === ("pretty-align"))) {
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                              }
                                                                              else {
                                                                                if ((key === ("refer"))) {
                                                                                   
                                                                                  $compat_log.log("filesRefer", value);
                                                                                  return options;
                                                                                }
                                                                                else {
                                                                                  if ((key === ("copy-styles"))) {
                                                                                     
                                                                                    var _arg_667301 = (value !== (""));
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_667301);
                                                                                  }
                                                                                  else {
                                                                                    return options;
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  else {
                    if ((key === ("base-header-level"))) {
                      if ($std_core._int_ge(ivalue,0)) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                      }
                      else {
                        if ((key === ("document-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("doc-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("bib"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left143_7182 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left143_7182, value);
                              }
                              var _arg_248330 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248330);
                            }
                            else {
                              if ((key === ("bibliography"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left145_7187 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left145_7187, value);
                                }
                                var _arg_2483010 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483010);
                              }
                              else {
                                if ((key === ("bib-data"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left147_7192 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left147_7192, value);
                                  }
                                  var _arg_2483113 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483113);
                                }
                                else {
                                  if ((key === ("tex-header"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeader;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeader;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeader;
                                          var left1_673669 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673669, value);
                                        }
                                      }
                                    }
                                    var _arg_269511 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_269511);
                                  }
                                  else {
                                    if ((key === ("tex-header-"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeaderx;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeaderx;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeaderx;
                                            var left1_673670 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673670, value);
                                          }
                                        }
                                      }
                                      var _arg_291411 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_291411);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeader;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeader;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeader;
                                              var left1_673671 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673671, value);
                                            }
                                          }
                                        }
                                        var _arg_313311 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_313311);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header-"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeaderx;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeaderx;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeaderx;
                                                var left1_673672 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673672, value);
                                              }
                                            }
                                          }
                                          var _arg_335211 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_335211);
                                        }
                                        else {
                                          if ((key === ("tex-footer"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texFooter;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texFooter;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texFooter;
                                                  var left1_673673 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673673, value);
                                                }
                                              }
                                            }
                                            var _arg_357111 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_357111);
                                          }
                                          else {
                                            if ((key === ("tex-section-num"))) {
                                               
                                              var _arg_377911 = (value !== (""));
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_377911);
                                            }
                                            else {
                                              if ((key === ("fragment-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("extract-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("fragment-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("extract-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("cite-all"))) {
                                                         
                                                        var _arg_437111 = (value !== (""));
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_437111);
                                                      }
                                                      else {
                                                        if ((key === ("embed"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_466220 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466220);
                                                        }
                                                        else {
                                                          if ((key === ("embed-limit"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_4662010 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4662010);
                                                          }
                                                          else {
                                                            if ((key === ("section-depth"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("section-base"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("highlight"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_521220 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521220);
                                                                }
                                                                else {
                                                                  if ((key === ("colorize"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_5212010 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5212010);
                                                                  }
                                                                  else {
                                                                    if ((key === ("highlight-language"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left149_7202 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left149_7202, value);
                                                                      }
                                                                      var _arg_551520 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551520);
                                                                    }
                                                                    else {
                                                                      if ((key === ("colorizer"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left151_7207 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left151_7207, value);
                                                                        }
                                                                        var _arg_5515010 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5515010);
                                                                      }
                                                                      else {
                                                                        if ((key === ("rebuild"))) {
                                                                           
                                                                          var _arg_569811 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_569811);
                                                                        }
                                                                        else {
                                                                          if ((key === ("star-bold"))) {
                                                                             
                                                                            var _arg_592511 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_592511);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no"))) {
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no-web"))) {
                                                                                 
                                                                                var _arg_629311 = (lvalue === ("true"));
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_629311);
                                                                              }
                                                                              else {
                                                                                if ((key === ("pretty-align"))) {
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("refer"))) {
                                                                                     
                                                                                    $compat_log.log("filesRefer", value);
                                                                                    return options;
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("copy-styles"))) {
                                                                                       
                                                                                      var _arg_667311 = (value !== (""));
                                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_667311);
                                                                                    }
                                                                                    else {
                                                                                      return options;
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    else {
                      if ((key === ("document-class"))) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                      }
                      else {
                        if ((key === ("doc-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("bib"))) {
                             
                            if ((value !== (""))) {
                              $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                            }
                            else {
                              $std_core_types._Unit_;
                            }
                             
                            if ((value === (""))) {
                              var _x2 = "";
                            }
                            else {
                               
                              var _x3 = options.bib;
                              var left153_7212 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                              var _x2 = $std_core._lp__plus__plus__1_rp_(left153_7212, value);
                            }
                            var _arg_2483200 = _x2;
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483200);
                          }
                          else {
                            if ((key === ("bibliography"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left155_7217 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left155_7217, value);
                              }
                              var _arg_24830000 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24830000);
                            }
                            else {
                              if ((key === ("bib-data"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left157_7222 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left157_7222, value);
                                }
                                var _arg_24831000 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24831000);
                              }
                              else {
                                if ((key === ("tex-header"))) {
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                    var _x4 = options.texHeader;
                                    var _x3 = (_x4 === (""));
                                    if (_x3) {
                                      var _x5 = options.texHeader;
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                    }
                                    else {
                                      var _x7 = options.texHeader;
                                      var _x6 = $compat.endsWith(_x7, "\n");
                                      if (_x6) {
                                        var _x8 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                      }
                                      else {
                                         
                                        var _x9 = options.texHeader;
                                        var left1_673674 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673674, value);
                                      }
                                    }
                                  }
                                  var _arg_2695000 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2695000);
                                }
                                else {
                                  if ((key === ("tex-header-"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeaderx;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeaderx;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeaderx;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeaderx;
                                          var left1_673675 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673675, value);
                                        }
                                      }
                                    }
                                    var _arg_2914000 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2914000);
                                  }
                                  else {
                                    if ((key === ("tex-doc-header"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texDocHeader;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texDocHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texDocHeader;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texDocHeader;
                                            var left1_673676 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673676, value);
                                          }
                                        }
                                      }
                                      var _arg_3133000 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3133000);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header-"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeaderx;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeaderx;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeaderx;
                                              var left1_673677 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673677, value);
                                            }
                                          }
                                        }
                                        var _arg_3352000 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3352000);
                                      }
                                      else {
                                        if ((key === ("tex-footer"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texFooter;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texFooter;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texFooter;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texFooter;
                                                var left1_673678 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673678, value);
                                              }
                                            }
                                          }
                                          var _arg_3571000 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3571000);
                                        }
                                        else {
                                          if ((key === ("tex-section-num"))) {
                                             
                                            var _arg_3779000 = (value !== (""));
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3779000);
                                          }
                                          else {
                                            if ((key === ("fragment-start"))) {
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                            }
                                            else {
                                              if ((key === ("extract-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("fragment-end"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("extract-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("cite-all"))) {
                                                       
                                                      var _arg_4371000 = (value !== (""));
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4371000);
                                                    }
                                                    else {
                                                      if ((key === ("embed"))) {
                                                         
                                                        if ((value === (""))) {
                                                          var _x2 = 0;
                                                        }
                                                        else {
                                                          var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                        }
                                                        var _arg_4662100 = _x2;
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4662100);
                                                      }
                                                      else {
                                                        if ((key === ("embed-limit"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_46620000 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_46620000);
                                                        }
                                                        else {
                                                          if ((key === ("section-depth"))) {
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                          }
                                                          else {
                                                            if ((key === ("section-base"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("highlight"))) {
                                                                 
                                                                var _x2 = ((value === (""))) ? false : true;
                                                                var _arg_5212100 = _x2;
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5212100);
                                                              }
                                                              else {
                                                                if ((key === ("colorize"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_52120000 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_52120000);
                                                                }
                                                                else {
                                                                  if ((key === ("highlight-language"))) {
                                                                     
                                                                    if ((value === (""))) {
                                                                      var _x2 = "";
                                                                    }
                                                                    else {
                                                                       
                                                                      var _x3 = options.hilitelang;
                                                                      var left159_7232 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left159_7232, value);
                                                                    }
                                                                    var _arg_5515100 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5515100);
                                                                  }
                                                                  else {
                                                                    if ((key === ("colorizer"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left161_7237 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left161_7237, value);
                                                                      }
                                                                      var _arg_55150000 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_55150000);
                                                                    }
                                                                    else {
                                                                      if ((key === ("rebuild"))) {
                                                                         
                                                                        var _arg_5698000 = (value !== (""));
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5698000);
                                                                      }
                                                                      else {
                                                                        if ((key === ("star-bold"))) {
                                                                           
                                                                          var _arg_5925000 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5925000);
                                                                        }
                                                                        else {
                                                                          if ((key === ("line-no"))) {
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no-web"))) {
                                                                               
                                                                              var _arg_6293000 = (lvalue === ("true"));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_6293000);
                                                                            }
                                                                            else {
                                                                              if ((key === ("pretty-align"))) {
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                              }
                                                                              else {
                                                                                if ((key === ("refer"))) {
                                                                                   
                                                                                  $compat_log.log("filesRefer", value);
                                                                                  return options;
                                                                                }
                                                                                else {
                                                                                  if ((key === ("copy-styles"))) {
                                                                                     
                                                                                    var _arg_6673000 = (value !== (""));
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_6673000);
                                                                                  }
                                                                                  else {
                                                                                    return options;
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
            else {
              if ((key === ("header-depth"))) {
                if ($std_core._int_ge(ivalue,0)) {
                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                }
                else {
                  if ((key === ("heading-base"))) {
                    if ($std_core._int_ge(ivalue,0)) {
                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                    }
                    else {
                      if ((key === ("document-class"))) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                      }
                      else {
                        if ((key === ("doc-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("bib"))) {
                             
                            if ((value !== (""))) {
                              $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                            }
                            else {
                              $std_core_types._Unit_;
                            }
                             
                            if ((value === (""))) {
                              var _x2 = "";
                            }
                            else {
                               
                              var _x3 = options.bib;
                              var left163_7242 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                              var _x2 = $std_core._lp__plus__plus__1_rp_(left163_7242, value);
                            }
                            var _arg_248325 = _x2;
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248325);
                          }
                          else {
                            if ((key === ("bibliography"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left165_7247 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left165_7247, value);
                              }
                              var _arg_248309 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248309);
                            }
                            else {
                              if ((key === ("bib-data"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left167_7252 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left167_7252, value);
                                }
                                var _arg_2483114 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483114);
                              }
                              else {
                                if ((key === ("tex-header"))) {
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                    var _x4 = options.texHeader;
                                    var _x3 = (_x4 === (""));
                                    if (_x3) {
                                      var _x5 = options.texHeader;
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                    }
                                    else {
                                      var _x7 = options.texHeader;
                                      var _x6 = $compat.endsWith(_x7, "\n");
                                      if (_x6) {
                                        var _x8 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                      }
                                      else {
                                         
                                        var _x9 = options.texHeader;
                                        var left1_673679 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673679, value);
                                      }
                                    }
                                  }
                                  var _arg_269512 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_269512);
                                }
                                else {
                                  if ((key === ("tex-header-"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeaderx;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeaderx;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeaderx;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeaderx;
                                          var left1_673680 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673680, value);
                                        }
                                      }
                                    }
                                    var _arg_291412 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_291412);
                                  }
                                  else {
                                    if ((key === ("tex-doc-header"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texDocHeader;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texDocHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texDocHeader;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texDocHeader;
                                            var left1_673681 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673681, value);
                                          }
                                        }
                                      }
                                      var _arg_313312 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_313312);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header-"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeaderx;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeaderx;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeaderx;
                                              var left1_673682 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673682, value);
                                            }
                                          }
                                        }
                                        var _arg_335212 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_335212);
                                      }
                                      else {
                                        if ((key === ("tex-footer"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texFooter;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texFooter;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texFooter;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texFooter;
                                                var left1_673683 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673683, value);
                                              }
                                            }
                                          }
                                          var _arg_357112 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_357112);
                                        }
                                        else {
                                          if ((key === ("tex-section-num"))) {
                                             
                                            var _arg_377912 = (value !== (""));
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_377912);
                                          }
                                          else {
                                            if ((key === ("fragment-start"))) {
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                            }
                                            else {
                                              if ((key === ("extract-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("fragment-end"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("extract-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("cite-all"))) {
                                                       
                                                      var _arg_437112 = (value !== (""));
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_437112);
                                                    }
                                                    else {
                                                      if ((key === ("embed"))) {
                                                         
                                                        if ((value === (""))) {
                                                          var _x2 = 0;
                                                        }
                                                        else {
                                                          var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                        }
                                                        var _arg_466216 = _x2;
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466216);
                                                      }
                                                      else {
                                                        if ((key === ("embed-limit"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_466209 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466209);
                                                        }
                                                        else {
                                                          if ((key === ("section-depth"))) {
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                          }
                                                          else {
                                                            if ((key === ("section-base"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("highlight"))) {
                                                                 
                                                                var _x2 = ((value === (""))) ? false : true;
                                                                var _arg_521216 = _x2;
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521216);
                                                              }
                                                              else {
                                                                if ((key === ("colorize"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_521209 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521209);
                                                                }
                                                                else {
                                                                  if ((key === ("highlight-language"))) {
                                                                     
                                                                    if ((value === (""))) {
                                                                      var _x2 = "";
                                                                    }
                                                                    else {
                                                                       
                                                                      var _x3 = options.hilitelang;
                                                                      var left169_7262 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left169_7262, value);
                                                                    }
                                                                    var _arg_551516 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551516);
                                                                  }
                                                                  else {
                                                                    if ((key === ("colorizer"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left171_7267 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left171_7267, value);
                                                                      }
                                                                      var _arg_551509 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551509);
                                                                    }
                                                                    else {
                                                                      if ((key === ("rebuild"))) {
                                                                         
                                                                        var _arg_569812 = (value !== (""));
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_569812);
                                                                      }
                                                                      else {
                                                                        if ((key === ("star-bold"))) {
                                                                           
                                                                          var _arg_592512 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_592512);
                                                                        }
                                                                        else {
                                                                          if ((key === ("line-no"))) {
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no-web"))) {
                                                                               
                                                                              var _arg_629312 = (lvalue === ("true"));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_629312);
                                                                            }
                                                                            else {
                                                                              if ((key === ("pretty-align"))) {
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                              }
                                                                              else {
                                                                                if ((key === ("refer"))) {
                                                                                   
                                                                                  $compat_log.log("filesRefer", value);
                                                                                  return options;
                                                                                }
                                                                                else {
                                                                                  if ((key === ("copy-styles"))) {
                                                                                     
                                                                                    var _arg_667312 = (value !== (""));
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_667312);
                                                                                  }
                                                                                  else {
                                                                                    return options;
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  else {
                    if ((key === ("header-base"))) {
                      if ($std_core._int_ge(ivalue,0)) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                      }
                      else {
                        if ((key === ("document-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("doc-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("bib"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left173_7272 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left173_7272, value);
                              }
                              var _arg_248326 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248326);
                            }
                            else {
                              if ((key === ("bibliography"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left175_7277 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left175_7277, value);
                                }
                                var _arg_2483011 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483011);
                              }
                              else {
                                if ((key === ("bib-data"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left177_7282 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left177_7282, value);
                                  }
                                  var _arg_2483115 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483115);
                                }
                                else {
                                  if ((key === ("tex-header"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeader;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeader;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeader;
                                          var left1_673684 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673684, value);
                                        }
                                      }
                                    }
                                    var _arg_269513 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_269513);
                                  }
                                  else {
                                    if ((key === ("tex-header-"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeaderx;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeaderx;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeaderx;
                                            var left1_673685 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673685, value);
                                          }
                                        }
                                      }
                                      var _arg_291413 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_291413);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeader;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeader;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeader;
                                              var left1_673686 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673686, value);
                                            }
                                          }
                                        }
                                        var _arg_313313 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_313313);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header-"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeaderx;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeaderx;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeaderx;
                                                var left1_673687 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673687, value);
                                              }
                                            }
                                          }
                                          var _arg_335213 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_335213);
                                        }
                                        else {
                                          if ((key === ("tex-footer"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texFooter;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texFooter;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texFooter;
                                                  var left1_673688 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673688, value);
                                                }
                                              }
                                            }
                                            var _arg_357113 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_357113);
                                          }
                                          else {
                                            if ((key === ("tex-section-num"))) {
                                               
                                              var _arg_377913 = (value !== (""));
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_377913);
                                            }
                                            else {
                                              if ((key === ("fragment-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("extract-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("fragment-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("extract-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("cite-all"))) {
                                                         
                                                        var _arg_437113 = (value !== (""));
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_437113);
                                                      }
                                                      else {
                                                        if ((key === ("embed"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_466217 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466217);
                                                        }
                                                        else {
                                                          if ((key === ("embed-limit"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_4662011 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4662011);
                                                          }
                                                          else {
                                                            if ((key === ("section-depth"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("section-base"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("highlight"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_521217 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521217);
                                                                }
                                                                else {
                                                                  if ((key === ("colorize"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_5212011 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5212011);
                                                                  }
                                                                  else {
                                                                    if ((key === ("highlight-language"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left179_7292 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left179_7292, value);
                                                                      }
                                                                      var _arg_551517 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551517);
                                                                    }
                                                                    else {
                                                                      if ((key === ("colorizer"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left181_7297 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left181_7297, value);
                                                                        }
                                                                        var _arg_5515011 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5515011);
                                                                      }
                                                                      else {
                                                                        if ((key === ("rebuild"))) {
                                                                           
                                                                          var _arg_569813 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_569813);
                                                                        }
                                                                        else {
                                                                          if ((key === ("star-bold"))) {
                                                                             
                                                                            var _arg_592513 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_592513);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no"))) {
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no-web"))) {
                                                                                 
                                                                                var _arg_629313 = (lvalue === ("true"));
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_629313);
                                                                              }
                                                                              else {
                                                                                if ((key === ("pretty-align"))) {
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("refer"))) {
                                                                                     
                                                                                    $compat_log.log("filesRefer", value);
                                                                                    return options;
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("copy-styles"))) {
                                                                                       
                                                                                      var _arg_667313 = (value !== (""));
                                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_667313);
                                                                                    }
                                                                                    else {
                                                                                      return options;
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    else {
                      if ((key === ("base-header-level"))) {
                        if ($std_core._int_ge(ivalue,0)) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                        }
                        else {
                          if ((key === ("document-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("doc-class"))) {
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                            }
                            else {
                              if ((key === ("bib"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left183_7302 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left183_7302, value);
                                }
                                var _arg_248327 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248327);
                              }
                              else {
                                if ((key === ("bibliography"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left185_7307 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left185_7307, value);
                                  }
                                  var _arg_2483012 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483012);
                                }
                                else {
                                  if ((key === ("bib-data"))) {
                                     
                                    if ((value !== (""))) {
                                      $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                    }
                                    else {
                                      $std_core_types._Unit_;
                                    }
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                       
                                      var _x3 = options.bib;
                                      var left187_7312 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left187_7312, value);
                                    }
                                    var _arg_2483116 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483116);
                                  }
                                  else {
                                    if ((key === ("tex-header"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeader;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeader;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeader;
                                            var left1_673689 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673689, value);
                                          }
                                        }
                                      }
                                      var _arg_269514 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_269514);
                                    }
                                    else {
                                      if ((key === ("tex-header-"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texHeaderx;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texHeaderx;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texHeaderx;
                                              var left1_673690 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673690, value);
                                            }
                                          }
                                        }
                                        var _arg_291414 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_291414);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeader;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeader;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeader;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeader;
                                                var left1_673691 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673691, value);
                                              }
                                            }
                                          }
                                          var _arg_313314 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_313314);
                                        }
                                        else {
                                          if ((key === ("tex-doc-header-"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texDocHeaderx;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texDocHeaderx;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texDocHeaderx;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texDocHeaderx;
                                                  var left1_673692 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673692, value);
                                                }
                                              }
                                            }
                                            var _arg_335214 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_335214);
                                          }
                                          else {
                                            if ((key === ("tex-footer"))) {
                                               
                                              if ((value === (""))) {
                                                var _x2 = "";
                                              }
                                              else {
                                                var _x4 = options.texFooter;
                                                var _x3 = (_x4 === (""));
                                                if (_x3) {
                                                  var _x5 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                                }
                                                else {
                                                  var _x7 = options.texFooter;
                                                  var _x6 = $compat.endsWith(_x7, "\n");
                                                  if (_x6) {
                                                    var _x8 = options.texFooter;
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                  }
                                                  else {
                                                     
                                                    var _x9 = options.texFooter;
                                                    var left1_673693 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673693, value);
                                                  }
                                                }
                                              }
                                              var _arg_357114 = _x2;
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_357114);
                                            }
                                            else {
                                              if ((key === ("tex-section-num"))) {
                                                 
                                                var _arg_377914 = (value !== (""));
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_377914);
                                              }
                                              else {
                                                if ((key === ("fragment-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("extract-start"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("fragment-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("extract-end"))) {
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                      }
                                                      else {
                                                        if ((key === ("cite-all"))) {
                                                           
                                                          var _arg_437114 = (value !== (""));
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_437114);
                                                        }
                                                        else {
                                                          if ((key === ("embed"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_466218 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466218);
                                                          }
                                                          else {
                                                            if ((key === ("embed-limit"))) {
                                                               
                                                              if ((value === (""))) {
                                                                var _x2 = 0;
                                                              }
                                                              else {
                                                                var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                              }
                                                              var _arg_4662012 = _x2;
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4662012);
                                                            }
                                                            else {
                                                              if ((key === ("section-depth"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("section-base"))) {
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                }
                                                                else {
                                                                  if ((key === ("highlight"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_521218 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521218);
                                                                  }
                                                                  else {
                                                                    if ((key === ("colorize"))) {
                                                                       
                                                                      var _x2 = ((value === (""))) ? false : true;
                                                                      var _arg_5212012 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5212012);
                                                                    }
                                                                    else {
                                                                      if ((key === ("highlight-language"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left189_7322 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left189_7322, value);
                                                                        }
                                                                        var _arg_551518 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551518);
                                                                      }
                                                                      else {
                                                                        if ((key === ("colorizer"))) {
                                                                           
                                                                          if ((value === (""))) {
                                                                            var _x2 = "";
                                                                          }
                                                                          else {
                                                                             
                                                                            var _x3 = options.hilitelang;
                                                                            var left191_7327 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left191_7327, value);
                                                                          }
                                                                          var _arg_5515012 = _x2;
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5515012);
                                                                        }
                                                                        else {
                                                                          if ((key === ("rebuild"))) {
                                                                             
                                                                            var _arg_569814 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_569814);
                                                                          }
                                                                          else {
                                                                            if ((key === ("star-bold"))) {
                                                                               
                                                                              var _arg_592514 = (value !== (""));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_592514);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no"))) {
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                              }
                                                                              else {
                                                                                if ((key === ("line-no-web"))) {
                                                                                   
                                                                                  var _arg_629314 = (lvalue === ("true"));
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_629314);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("pretty-align"))) {
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("refer"))) {
                                                                                       
                                                                                      $compat_log.log("filesRefer", value);
                                                                                      return options;
                                                                                    }
                                                                                    else {
                                                                                      if ((key === ("copy-styles"))) {
                                                                                         
                                                                                        var _arg_667314 = (value !== (""));
                                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_667314);
                                                                                      }
                                                                                      else {
                                                                                        return options;
                                                                                      }
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                      else {
                        if ((key === ("document-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("doc-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("bib"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left193_7332 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left193_7332, value);
                              }
                              var _arg_248328 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248328);
                            }
                            else {
                              if ((key === ("bibliography"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left195_7337 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left195_7337, value);
                                }
                                var _arg_2483002 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483002);
                              }
                              else {
                                if ((key === ("bib-data"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left197_7342 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left197_7342, value);
                                  }
                                  var _arg_2483102 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483102);
                                }
                                else {
                                  if ((key === ("tex-header"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeader;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeader;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeader;
                                          var left1_673694 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673694, value);
                                        }
                                      }
                                    }
                                    var _arg_269502 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_269502);
                                  }
                                  else {
                                    if ((key === ("tex-header-"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeaderx;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeaderx;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeaderx;
                                            var left1_673695 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673695, value);
                                          }
                                        }
                                      }
                                      var _arg_291402 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_291402);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeader;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeader;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeader;
                                              var left1_673696 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673696, value);
                                            }
                                          }
                                        }
                                        var _arg_313302 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_313302);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header-"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeaderx;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeaderx;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeaderx;
                                                var left1_673697 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673697, value);
                                              }
                                            }
                                          }
                                          var _arg_335202 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_335202);
                                        }
                                        else {
                                          if ((key === ("tex-footer"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texFooter;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texFooter;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texFooter;
                                                  var left1_673698 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673698, value);
                                                }
                                              }
                                            }
                                            var _arg_357102 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_357102);
                                          }
                                          else {
                                            if ((key === ("tex-section-num"))) {
                                               
                                              var _arg_377902 = (value !== (""));
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_377902);
                                            }
                                            else {
                                              if ((key === ("fragment-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("extract-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("fragment-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("extract-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("cite-all"))) {
                                                         
                                                        var _arg_437102 = (value !== (""));
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_437102);
                                                      }
                                                      else {
                                                        if ((key === ("embed"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_466219 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466219);
                                                        }
                                                        else {
                                                          if ((key === ("embed-limit"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_4662002 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4662002);
                                                          }
                                                          else {
                                                            if ((key === ("section-depth"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("section-base"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("highlight"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_521219 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521219);
                                                                }
                                                                else {
                                                                  if ((key === ("colorize"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_5212002 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5212002);
                                                                  }
                                                                  else {
                                                                    if ((key === ("highlight-language"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left199_7352 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left199_7352, value);
                                                                      }
                                                                      var _arg_551519 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551519);
                                                                    }
                                                                    else {
                                                                      if ((key === ("colorizer"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left201_7357 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left201_7357, value);
                                                                        }
                                                                        var _arg_5515002 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5515002);
                                                                      }
                                                                      else {
                                                                        if ((key === ("rebuild"))) {
                                                                           
                                                                          var _arg_569802 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_569802);
                                                                        }
                                                                        else {
                                                                          if ((key === ("star-bold"))) {
                                                                             
                                                                            var _arg_592502 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_592502);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no"))) {
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no-web"))) {
                                                                                 
                                                                                var _arg_629302 = (lvalue === ("true"));
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_629302);
                                                                              }
                                                                              else {
                                                                                if ((key === ("pretty-align"))) {
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("refer"))) {
                                                                                     
                                                                                    $compat_log.log("filesRefer", value);
                                                                                    return options;
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("copy-styles"))) {
                                                                                       
                                                                                      var _arg_667302 = (value !== (""));
                                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_667302);
                                                                                    }
                                                                                    else {
                                                                                      return options;
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
              else {
                if ((key === ("heading-base"))) {
                  if ($std_core._int_ge(ivalue,0)) {
                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                  }
                  else {
                    if ((key === ("document-class"))) {
                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                    }
                    else {
                      if ((key === ("doc-class"))) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                      }
                      else {
                        if ((key === ("bib"))) {
                           
                          if ((value !== (""))) {
                            $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                          }
                          else {
                            $std_core_types._Unit_;
                          }
                           
                          if ((value === (""))) {
                            var _x2 = "";
                          }
                          else {
                             
                            var _x3 = options.bib;
                            var left203_7362 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                            var _x2 = $std_core._lp__plus__plus__1_rp_(left203_7362, value);
                          }
                          var _arg_248331 = _x2;
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248331);
                        }
                        else {
                          if ((key === ("bibliography"))) {
                             
                            if ((value !== (""))) {
                              $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                            }
                            else {
                              $std_core_types._Unit_;
                            }
                             
                            if ((value === (""))) {
                              var _x2 = "";
                            }
                            else {
                               
                              var _x3 = options.bib;
                              var left205_7367 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                              var _x2 = $std_core._lp__plus__plus__1_rp_(left205_7367, value);
                            }
                            var _arg_2483013 = _x2;
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483013);
                          }
                          else {
                            if ((key === ("bib-data"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left207_7372 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left207_7372, value);
                              }
                              var _arg_2483117 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483117);
                            }
                            else {
                              if ((key === ("tex-header"))) {
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                  var _x4 = options.texHeader;
                                  var _x3 = (_x4 === (""));
                                  if (_x3) {
                                    var _x5 = options.texHeader;
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                  }
                                  else {
                                    var _x7 = options.texHeader;
                                    var _x6 = $compat.endsWith(_x7, "\n");
                                    if (_x6) {
                                      var _x8 = options.texHeader;
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                    }
                                    else {
                                       
                                      var _x9 = options.texHeader;
                                      var left1_673699 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left1_673699, value);
                                    }
                                  }
                                }
                                var _arg_269515 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_269515);
                              }
                              else {
                                if ((key === ("tex-header-"))) {
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                    var _x4 = options.texHeaderx;
                                    var _x3 = (_x4 === (""));
                                    if (_x3) {
                                      var _x5 = options.texHeaderx;
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                    }
                                    else {
                                      var _x7 = options.texHeaderx;
                                      var _x6 = $compat.endsWith(_x7, "\n");
                                      if (_x6) {
                                        var _x8 = options.texHeaderx;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                      }
                                      else {
                                         
                                        var _x9 = options.texHeaderx;
                                        var left1_6736100 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736100, value);
                                      }
                                    }
                                  }
                                  var _arg_291415 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_291415);
                                }
                                else {
                                  if ((key === ("tex-doc-header"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texDocHeader;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texDocHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texDocHeader;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texDocHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texDocHeader;
                                          var left1_6736101 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736101, value);
                                        }
                                      }
                                    }
                                    var _arg_313315 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_313315);
                                  }
                                  else {
                                    if ((key === ("tex-doc-header-"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texDocHeaderx;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texDocHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texDocHeaderx;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texDocHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texDocHeaderx;
                                            var left1_6736102 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736102, value);
                                          }
                                        }
                                      }
                                      var _arg_335215 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_335215);
                                    }
                                    else {
                                      if ((key === ("tex-footer"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texFooter;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texFooter;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texFooter;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texFooter;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texFooter;
                                              var left1_6736103 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736103, value);
                                            }
                                          }
                                        }
                                        var _arg_357115 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_357115);
                                      }
                                      else {
                                        if ((key === ("tex-section-num"))) {
                                           
                                          var _arg_377915 = (value !== (""));
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_377915);
                                        }
                                        else {
                                          if ((key === ("fragment-start"))) {
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                          }
                                          else {
                                            if ((key === ("extract-start"))) {
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                            }
                                            else {
                                              if ((key === ("fragment-end"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("extract-end"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("cite-all"))) {
                                                     
                                                    var _arg_437115 = (value !== (""));
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_437115);
                                                  }
                                                  else {
                                                    if ((key === ("embed"))) {
                                                       
                                                      if ((value === (""))) {
                                                        var _x2 = 0;
                                                      }
                                                      else {
                                                        var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                      }
                                                      var _arg_466221 = _x2;
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466221);
                                                    }
                                                    else {
                                                      if ((key === ("embed-limit"))) {
                                                         
                                                        if ((value === (""))) {
                                                          var _x2 = 0;
                                                        }
                                                        else {
                                                          var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                        }
                                                        var _arg_4662013 = _x2;
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4662013);
                                                      }
                                                      else {
                                                        if ((key === ("section-depth"))) {
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                        }
                                                        else {
                                                          if ((key === ("section-base"))) {
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                          }
                                                          else {
                                                            if ((key === ("highlight"))) {
                                                               
                                                              var _x2 = ((value === (""))) ? false : true;
                                                              var _arg_521221 = _x2;
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521221);
                                                            }
                                                            else {
                                                              if ((key === ("colorize"))) {
                                                                 
                                                                var _x2 = ((value === (""))) ? false : true;
                                                                var _arg_5212013 = _x2;
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5212013);
                                                              }
                                                              else {
                                                                if ((key === ("highlight-language"))) {
                                                                   
                                                                  if ((value === (""))) {
                                                                    var _x2 = "";
                                                                  }
                                                                  else {
                                                                     
                                                                    var _x3 = options.hilitelang;
                                                                    var left209_7382 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left209_7382, value);
                                                                  }
                                                                  var _arg_551521 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551521);
                                                                }
                                                                else {
                                                                  if ((key === ("colorizer"))) {
                                                                     
                                                                    if ((value === (""))) {
                                                                      var _x2 = "";
                                                                    }
                                                                    else {
                                                                       
                                                                      var _x3 = options.hilitelang;
                                                                      var left211_7387 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left211_7387, value);
                                                                    }
                                                                    var _arg_5515013 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5515013);
                                                                  }
                                                                  else {
                                                                    if ((key === ("rebuild"))) {
                                                                       
                                                                      var _arg_569815 = (value !== (""));
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_569815);
                                                                    }
                                                                    else {
                                                                      if ((key === ("star-bold"))) {
                                                                         
                                                                        var _arg_592515 = (value !== (""));
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_592515);
                                                                      }
                                                                      else {
                                                                        if ((key === ("line-no"))) {
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                        }
                                                                        else {
                                                                          if ((key === ("line-no-web"))) {
                                                                             
                                                                            var _arg_629315 = (lvalue === ("true"));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_629315);
                                                                          }
                                                                          else {
                                                                            if ((key === ("pretty-align"))) {
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                            }
                                                                            else {
                                                                              if ((key === ("refer"))) {
                                                                                 
                                                                                $compat_log.log("filesRefer", value);
                                                                                return options;
                                                                              }
                                                                              else {
                                                                                if ((key === ("copy-styles"))) {
                                                                                   
                                                                                  var _arg_667315 = (value !== (""));
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_667315);
                                                                                }
                                                                                else {
                                                                                  return options;
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
                else {
                  if ((key === ("header-base"))) {
                    if ($std_core._int_ge(ivalue,0)) {
                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                    }
                    else {
                      if ((key === ("document-class"))) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                      }
                      else {
                        if ((key === ("doc-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("bib"))) {
                             
                            if ((value !== (""))) {
                              $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                            }
                            else {
                              $std_core_types._Unit_;
                            }
                             
                            if ((value === (""))) {
                              var _x2 = "";
                            }
                            else {
                               
                              var _x3 = options.bib;
                              var left213_7392 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                              var _x2 = $std_core._lp__plus__plus__1_rp_(left213_7392, value);
                            }
                            var _arg_248332 = _x2;
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248332);
                          }
                          else {
                            if ((key === ("bibliography"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left215_7397 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left215_7397, value);
                              }
                              var _arg_2483014 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483014);
                            }
                            else {
                              if ((key === ("bib-data"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left217_7402 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left217_7402, value);
                                }
                                var _arg_2483118 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483118);
                              }
                              else {
                                if ((key === ("tex-header"))) {
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                    var _x4 = options.texHeader;
                                    var _x3 = (_x4 === (""));
                                    if (_x3) {
                                      var _x5 = options.texHeader;
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                    }
                                    else {
                                      var _x7 = options.texHeader;
                                      var _x6 = $compat.endsWith(_x7, "\n");
                                      if (_x6) {
                                        var _x8 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                      }
                                      else {
                                         
                                        var _x9 = options.texHeader;
                                        var left1_6736104 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736104, value);
                                      }
                                    }
                                  }
                                  var _arg_269516 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_269516);
                                }
                                else {
                                  if ((key === ("tex-header-"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeaderx;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeaderx;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeaderx;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeaderx;
                                          var left1_6736105 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736105, value);
                                        }
                                      }
                                    }
                                    var _arg_291416 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_291416);
                                  }
                                  else {
                                    if ((key === ("tex-doc-header"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texDocHeader;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texDocHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texDocHeader;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texDocHeader;
                                            var left1_6736106 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736106, value);
                                          }
                                        }
                                      }
                                      var _arg_313316 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_313316);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header-"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeaderx;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeaderx;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeaderx;
                                              var left1_6736107 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736107, value);
                                            }
                                          }
                                        }
                                        var _arg_335216 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_335216);
                                      }
                                      else {
                                        if ((key === ("tex-footer"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texFooter;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texFooter;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texFooter;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texFooter;
                                                var left1_6736108 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736108, value);
                                              }
                                            }
                                          }
                                          var _arg_357116 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_357116);
                                        }
                                        else {
                                          if ((key === ("tex-section-num"))) {
                                             
                                            var _arg_377916 = (value !== (""));
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_377916);
                                          }
                                          else {
                                            if ((key === ("fragment-start"))) {
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                            }
                                            else {
                                              if ((key === ("extract-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("fragment-end"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("extract-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("cite-all"))) {
                                                       
                                                      var _arg_437116 = (value !== (""));
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_437116);
                                                    }
                                                    else {
                                                      if ((key === ("embed"))) {
                                                         
                                                        if ((value === (""))) {
                                                          var _x2 = 0;
                                                        }
                                                        else {
                                                          var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                        }
                                                        var _arg_466222 = _x2;
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466222);
                                                      }
                                                      else {
                                                        if ((key === ("embed-limit"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_4662014 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4662014);
                                                        }
                                                        else {
                                                          if ((key === ("section-depth"))) {
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                          }
                                                          else {
                                                            if ((key === ("section-base"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("highlight"))) {
                                                                 
                                                                var _x2 = ((value === (""))) ? false : true;
                                                                var _arg_521222 = _x2;
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521222);
                                                              }
                                                              else {
                                                                if ((key === ("colorize"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_5212014 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5212014);
                                                                }
                                                                else {
                                                                  if ((key === ("highlight-language"))) {
                                                                     
                                                                    if ((value === (""))) {
                                                                      var _x2 = "";
                                                                    }
                                                                    else {
                                                                       
                                                                      var _x3 = options.hilitelang;
                                                                      var left219_7412 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left219_7412, value);
                                                                    }
                                                                    var _arg_551522 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551522);
                                                                  }
                                                                  else {
                                                                    if ((key === ("colorizer"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left221_7417 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left221_7417, value);
                                                                      }
                                                                      var _arg_5515014 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5515014);
                                                                    }
                                                                    else {
                                                                      if ((key === ("rebuild"))) {
                                                                         
                                                                        var _arg_569816 = (value !== (""));
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_569816);
                                                                      }
                                                                      else {
                                                                        if ((key === ("star-bold"))) {
                                                                           
                                                                          var _arg_592516 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_592516);
                                                                        }
                                                                        else {
                                                                          if ((key === ("line-no"))) {
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no-web"))) {
                                                                               
                                                                              var _arg_629316 = (lvalue === ("true"));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_629316);
                                                                            }
                                                                            else {
                                                                              if ((key === ("pretty-align"))) {
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                              }
                                                                              else {
                                                                                if ((key === ("refer"))) {
                                                                                   
                                                                                  $compat_log.log("filesRefer", value);
                                                                                  return options;
                                                                                }
                                                                                else {
                                                                                  if ((key === ("copy-styles"))) {
                                                                                     
                                                                                    var _arg_667316 = (value !== (""));
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_667316);
                                                                                  }
                                                                                  else {
                                                                                    return options;
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                  else {
                    if ((key === ("base-header-level"))) {
                      if ($std_core._int_ge(ivalue,0)) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                      }
                      else {
                        if ((key === ("document-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("doc-class"))) {
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                          }
                          else {
                            if ((key === ("bib"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left223_7422 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left223_7422, value);
                              }
                              var _arg_248333 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_248333);
                            }
                            else {
                              if ((key === ("bibliography"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left225_7427 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left225_7427, value);
                                }
                                var _arg_2483015 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483015);
                              }
                              else {
                                if ((key === ("bib-data"))) {
                                   
                                  if ((value !== (""))) {
                                    $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                  }
                                  else {
                                    $std_core_types._Unit_;
                                  }
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                     
                                    var _x3 = options.bib;
                                    var left227_7432 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                    var _x2 = $std_core._lp__plus__plus__1_rp_(left227_7432, value);
                                  }
                                  var _arg_2483119 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483119);
                                }
                                else {
                                  if ((key === ("tex-header"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeader;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeader;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeader;
                                          var left1_6736109 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736109, value);
                                        }
                                      }
                                    }
                                    var _arg_269517 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_269517);
                                  }
                                  else {
                                    if ((key === ("tex-header-"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texHeaderx;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texHeaderx;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texHeaderx;
                                            var left1_6736110 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736110, value);
                                          }
                                        }
                                      }
                                      var _arg_291417 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_291417);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeader;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeader;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeader;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeader;
                                              var left1_6736111 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736111, value);
                                            }
                                          }
                                        }
                                        var _arg_313317 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_313317);
                                      }
                                      else {
                                        if ((key === ("tex-doc-header-"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texDocHeaderx;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texDocHeaderx;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texDocHeaderx;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texDocHeaderx;
                                                var left1_6736112 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736112, value);
                                              }
                                            }
                                          }
                                          var _arg_335217 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_335217);
                                        }
                                        else {
                                          if ((key === ("tex-footer"))) {
                                             
                                            if ((value === (""))) {
                                              var _x2 = "";
                                            }
                                            else {
                                              var _x4 = options.texFooter;
                                              var _x3 = (_x4 === (""));
                                              if (_x3) {
                                                var _x5 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                              }
                                              else {
                                                var _x7 = options.texFooter;
                                                var _x6 = $compat.endsWith(_x7, "\n");
                                                if (_x6) {
                                                  var _x8 = options.texFooter;
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                                }
                                                else {
                                                   
                                                  var _x9 = options.texFooter;
                                                  var left1_6736113 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736113, value);
                                                }
                                              }
                                            }
                                            var _arg_357117 = _x2;
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_357117);
                                          }
                                          else {
                                            if ((key === ("tex-section-num"))) {
                                               
                                              var _arg_377917 = (value !== (""));
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_377917);
                                            }
                                            else {
                                              if ((key === ("fragment-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("extract-start"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("fragment-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("extract-end"))) {
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                    }
                                                    else {
                                                      if ((key === ("cite-all"))) {
                                                         
                                                        var _arg_437117 = (value !== (""));
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_437117);
                                                      }
                                                      else {
                                                        if ((key === ("embed"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_466223 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_466223);
                                                        }
                                                        else {
                                                          if ((key === ("embed-limit"))) {
                                                             
                                                            if ((value === (""))) {
                                                              var _x2 = 0;
                                                            }
                                                            else {
                                                              var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                            }
                                                            var _arg_4662015 = _x2;
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4662015);
                                                          }
                                                          else {
                                                            if ((key === ("section-depth"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("section-base"))) {
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                              }
                                                              else {
                                                                if ((key === ("highlight"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_521223 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_521223);
                                                                }
                                                                else {
                                                                  if ((key === ("colorize"))) {
                                                                     
                                                                    var _x2 = ((value === (""))) ? false : true;
                                                                    var _arg_5212015 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5212015);
                                                                  }
                                                                  else {
                                                                    if ((key === ("highlight-language"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left229_7442 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left229_7442, value);
                                                                      }
                                                                      var _arg_551523 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_551523);
                                                                    }
                                                                    else {
                                                                      if ((key === ("colorizer"))) {
                                                                         
                                                                        if ((value === (""))) {
                                                                          var _x2 = "";
                                                                        }
                                                                        else {
                                                                           
                                                                          var _x3 = options.hilitelang;
                                                                          var left231_7447 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left231_7447, value);
                                                                        }
                                                                        var _arg_5515015 = _x2;
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5515015);
                                                                      }
                                                                      else {
                                                                        if ((key === ("rebuild"))) {
                                                                           
                                                                          var _arg_569817 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_569817);
                                                                        }
                                                                        else {
                                                                          if ((key === ("star-bold"))) {
                                                                             
                                                                            var _arg_592517 = (value !== (""));
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_592517);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no"))) {
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                            }
                                                                            else {
                                                                              if ((key === ("line-no-web"))) {
                                                                                 
                                                                                var _arg_629317 = (lvalue === ("true"));
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_629317);
                                                                              }
                                                                              else {
                                                                                if ((key === ("pretty-align"))) {
                                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                                }
                                                                                else {
                                                                                  if ((key === ("refer"))) {
                                                                                     
                                                                                    $compat_log.log("filesRefer", value);
                                                                                    return options;
                                                                                  }
                                                                                  else {
                                                                                    if ((key === ("copy-styles"))) {
                                                                                       
                                                                                      var _arg_667317 = (value !== (""));
                                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_667317);
                                                                                    }
                                                                                    else {
                                                                                      return options;
                                                                                    }
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                    else {
                      if ((key === ("document-class"))) {
                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                      }
                      else {
                        if ((key === ("doc-class"))) {
                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, value);
                        }
                        else {
                          if ((key === ("bib"))) {
                             
                            if ((value !== (""))) {
                              $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                            }
                            else {
                              $std_core_types._Unit_;
                            }
                             
                            if ((value === (""))) {
                              var _x2 = "";
                            }
                            else {
                               
                              var _x3 = options.bib;
                              var left233_7452 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                              var _x2 = $std_core._lp__plus__plus__1_rp_(left233_7452, value);
                            }
                            var _arg_2483201 = _x2;
                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2483201);
                          }
                          else {
                            if ((key === ("bibliography"))) {
                               
                              if ((value !== (""))) {
                                $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                              }
                              else {
                                $std_core_types._Unit_;
                              }
                               
                              if ((value === (""))) {
                                var _x2 = "";
                              }
                              else {
                                 
                                var _x3 = options.bib;
                                var left235_7457 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                var _x2 = $std_core._lp__plus__plus__1_rp_(left235_7457, value);
                              }
                              var _arg_24830001 = _x2;
                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24830001);
                            }
                            else {
                              if ((key === ("bib-data"))) {
                                 
                                if ((value !== (""))) {
                                  $compat_log.log("files", $compat_path.changeExt(value, ".bib"));
                                }
                                else {
                                  $std_core_types._Unit_;
                                }
                                 
                                if ((value === (""))) {
                                  var _x2 = "";
                                }
                                else {
                                   
                                  var _x3 = options.bib;
                                  var left237_7462 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                  var _x2 = $std_core._lp__plus__plus__1_rp_(left237_7462, value);
                                }
                                var _arg_24831001 = _x2;
                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_24831001);
                              }
                              else {
                                if ((key === ("tex-header"))) {
                                   
                                  if ((value === (""))) {
                                    var _x2 = "";
                                  }
                                  else {
                                    var _x4 = options.texHeader;
                                    var _x3 = (_x4 === (""));
                                    if (_x3) {
                                      var _x5 = options.texHeader;
                                      var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                    }
                                    else {
                                      var _x7 = options.texHeader;
                                      var _x6 = $compat.endsWith(_x7, "\n");
                                      if (_x6) {
                                        var _x8 = options.texHeader;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                      }
                                      else {
                                         
                                        var _x9 = options.texHeader;
                                        var left1_6736114 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736114, value);
                                      }
                                    }
                                  }
                                  var _arg_2695001 = _x2;
                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2695001);
                                }
                                else {
                                  if ((key === ("tex-header-"))) {
                                     
                                    if ((value === (""))) {
                                      var _x2 = "";
                                    }
                                    else {
                                      var _x4 = options.texHeaderx;
                                      var _x3 = (_x4 === (""));
                                      if (_x3) {
                                        var _x5 = options.texHeaderx;
                                        var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                      }
                                      else {
                                        var _x7 = options.texHeaderx;
                                        var _x6 = $compat.endsWith(_x7, "\n");
                                        if (_x6) {
                                          var _x8 = options.texHeaderx;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                        }
                                        else {
                                           
                                          var _x9 = options.texHeaderx;
                                          var left1_6736115 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736115, value);
                                        }
                                      }
                                    }
                                    var _arg_2914001 = _x2;
                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_2914001);
                                  }
                                  else {
                                    if ((key === ("tex-doc-header"))) {
                                       
                                      if ((value === (""))) {
                                        var _x2 = "";
                                      }
                                      else {
                                        var _x4 = options.texDocHeader;
                                        var _x3 = (_x4 === (""));
                                        if (_x3) {
                                          var _x5 = options.texDocHeader;
                                          var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                        }
                                        else {
                                          var _x7 = options.texDocHeader;
                                          var _x6 = $compat.endsWith(_x7, "\n");
                                          if (_x6) {
                                            var _x8 = options.texDocHeader;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                          }
                                          else {
                                             
                                            var _x9 = options.texDocHeader;
                                            var left1_6736116 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736116, value);
                                          }
                                        }
                                      }
                                      var _arg_3133001 = _x2;
                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3133001);
                                    }
                                    else {
                                      if ((key === ("tex-doc-header-"))) {
                                         
                                        if ((value === (""))) {
                                          var _x2 = "";
                                        }
                                        else {
                                          var _x4 = options.texDocHeaderx;
                                          var _x3 = (_x4 === (""));
                                          if (_x3) {
                                            var _x5 = options.texDocHeaderx;
                                            var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                          }
                                          else {
                                            var _x7 = options.texDocHeaderx;
                                            var _x6 = $compat.endsWith(_x7, "\n");
                                            if (_x6) {
                                              var _x8 = options.texDocHeaderx;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                            }
                                            else {
                                               
                                              var _x9 = options.texDocHeaderx;
                                              var left1_6736117 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736117, value);
                                            }
                                          }
                                        }
                                        var _arg_3352001 = _x2;
                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3352001);
                                      }
                                      else {
                                        if ((key === ("tex-footer"))) {
                                           
                                          if ((value === (""))) {
                                            var _x2 = "";
                                          }
                                          else {
                                            var _x4 = options.texFooter;
                                            var _x3 = (_x4 === (""));
                                            if (_x3) {
                                              var _x5 = options.texFooter;
                                              var _x2 = $std_core._lp__plus__plus__1_rp_(_x5, value);
                                            }
                                            else {
                                              var _x7 = options.texFooter;
                                              var _x6 = $compat.endsWith(_x7, "\n");
                                              if (_x6) {
                                                var _x8 = options.texFooter;
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(_x8, value);
                                              }
                                              else {
                                                 
                                                var _x9 = options.texFooter;
                                                var left1_6736118 = $std_core._lp__plus__plus__1_rp_(_x9, "\n");
                                                var _x2 = $std_core._lp__plus__plus__1_rp_(left1_6736118, value);
                                              }
                                            }
                                          }
                                          var _arg_3571001 = _x2;
                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3571001);
                                        }
                                        else {
                                          if ((key === ("tex-section-num"))) {
                                             
                                            var _arg_3779001 = (value !== (""));
                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_3779001);
                                          }
                                          else {
                                            if ((key === ("fragment-start"))) {
                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                            }
                                            else {
                                              if ((key === ("extract-start"))) {
                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                              }
                                              else {
                                                if ((key === ("fragment-end"))) {
                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                }
                                                else {
                                                  if ((key === ("extract-end"))) {
                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, xvalue);
                                                  }
                                                  else {
                                                    if ((key === ("cite-all"))) {
                                                       
                                                      var _arg_4371001 = (value !== (""));
                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4371001);
                                                    }
                                                    else {
                                                      if ((key === ("embed"))) {
                                                         
                                                        if ((value === (""))) {
                                                          var _x2 = 0;
                                                        }
                                                        else {
                                                          var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                        }
                                                        var _arg_4662101 = _x2;
                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_4662101);
                                                      }
                                                      else {
                                                        if ((key === ("embed-limit"))) {
                                                           
                                                          if ((value === (""))) {
                                                            var _x2 = 0;
                                                          }
                                                          else {
                                                            var _x2 = ((value === ("true"))) ? 1024 : $std_core._int_mul(ivalue,1024);
                                                          }
                                                          var _arg_46620001 = _x2;
                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_46620001);
                                                        }
                                                        else {
                                                          if ((key === ("section-depth"))) {
                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                          }
                                                          else {
                                                            if ((key === ("section-base"))) {
                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                            }
                                                            else {
                                                              if ((key === ("highlight"))) {
                                                                 
                                                                var _x2 = ((value === (""))) ? false : true;
                                                                var _arg_5212101 = _x2;
                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5212101);
                                                              }
                                                              else {
                                                                if ((key === ("colorize"))) {
                                                                   
                                                                  var _x2 = ((value === (""))) ? false : true;
                                                                  var _arg_52120001 = _x2;
                                                                  return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_52120001);
                                                                }
                                                                else {
                                                                  if ((key === ("highlight-language"))) {
                                                                     
                                                                    if ((value === (""))) {
                                                                      var _x2 = "";
                                                                    }
                                                                    else {
                                                                       
                                                                      var _x3 = options.hilitelang;
                                                                      var left239_7472 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                      var _x2 = $std_core._lp__plus__plus__1_rp_(left239_7472, value);
                                                                    }
                                                                    var _arg_5515101 = _x2;
                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5515101);
                                                                  }
                                                                  else {
                                                                    if ((key === ("colorizer"))) {
                                                                       
                                                                      if ((value === (""))) {
                                                                        var _x2 = "";
                                                                      }
                                                                      else {
                                                                         
                                                                        var _x3 = options.hilitelang;
                                                                        var left241_7477 = $std_core._lp__plus__plus__1_rp_(_x3, ";");
                                                                        var _x2 = $std_core._lp__plus__plus__1_rp_(left241_7477, value);
                                                                      }
                                                                      var _arg_55150001 = _x2;
                                                                      return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_55150001);
                                                                    }
                                                                    else {
                                                                      if ((key === ("rebuild"))) {
                                                                         
                                                                        var _arg_5698001 = (value !== (""));
                                                                        return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5698001);
                                                                      }
                                                                      else {
                                                                        if ((key === ("star-bold"))) {
                                                                           
                                                                          var _arg_5925001 = (value !== (""));
                                                                          return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_5925001);
                                                                        }
                                                                        else {
                                                                          if ((key === ("line-no"))) {
                                                                            return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                          }
                                                                          else {
                                                                            if ((key === ("line-no-web"))) {
                                                                               
                                                                              var _arg_6293001 = (lvalue === ("true"));
                                                                              return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_6293001);
                                                                            }
                                                                            else {
                                                                              if ((key === ("pretty-align"))) {
                                                                                return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, ivalue);
                                                                              }
                                                                              else {
                                                                                if ((key === ("refer"))) {
                                                                                   
                                                                                  $compat_log.log("filesRefer", value);
                                                                                  return options;
                                                                                }
                                                                                else {
                                                                                  if ((key === ("copy-styles"))) {
                                                                                     
                                                                                    var _arg_6673001 = (value !== (""));
                                                                                    return $options._copy(options, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, _arg_6673001);
                                                                                  }
                                                                                  else {
                                                                                    return options;
                                                                                  }
                                                                                }
                                                                              }
                                                                            }
                                                                          }
                                                                        }
                                                                      }
                                                                    }
                                                                  }
                                                                }
                                                              }
                                                            }
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                }
                                              }
                                            }
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
 
export function fromMeta(opts, mdata) /* (opts : options/options, mdata : options/metadata) -> options/options */  {
  return $std_core.foldl(mdata, opts, function(options /* options/options */ , kv /* (string, string) */ ) {
      return update(options, kv.fst, kv.snd, mdata);
    });
}