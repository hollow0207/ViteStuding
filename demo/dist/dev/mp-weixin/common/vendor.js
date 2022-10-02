"use strict";
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key2, val] of props) {
    target[key2] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i2 = 0; i2 < list.length; i2++) {
    map[list[i2]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
function normalizeStyle(value) {
  if (isArray(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key2 in normalized) {
          res[key2] = normalized[key2];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key2, val2]) => {
        entries[`${key2} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray(val) && !isPlainObject(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key2) => onRE.test(key2);
const isModelListener = (key2) => key2.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key2) => hasOwnProperty$1.call(val, key2);
const isArray = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key2) => isString(key2) && key2 !== "NaN" && key2[0] !== "-" && "" + parseInt(key2, 10) === key2;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj2, key2, value) => {
  Object.defineProperty(obj2, key2, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
const LINEFEED = "\n";
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LOAD = "onLoad";
const ON_READY = "onReady";
const ON_UNLOAD = "onUnload";
const ON_INIT = "onInit";
const ON_SAVE_EXIT_STATE = "onSaveExitState";
const ON_RESIZE = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i2 = 0; i2 < fns.length; i2++) {
    ret = fns[i2](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
function getValueByDataPath(obj2, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts2 = path.split(".");
  let key2 = parts2[0];
  if (!obj2) {
    obj2 = {};
  }
  if (parts2.length === 1) {
    return obj2[key2];
  }
  return getValueByDataPath(obj2[key2], parts2.slice(1).join("."));
}
function sortObject(obj2) {
  let sortObj = {};
  if (isPlainObject(obj2)) {
    Object.keys(obj2).sort().forEach((key2) => {
      const _key = key2;
      sortObj[_key] = obj2[_key];
    });
  }
  return !Object.keys(sortObj) ? obj2 : sortObj;
}
const encode = encodeURIComponent;
function stringifyQuery(obj2, encodeStr = encode) {
  const res = obj2 ? Object.keys(obj2).map((key2) => {
    let val = obj2[key2];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key2) + "=" + encodeStr(val);
  }).filter((x2) => x2.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const PAGE_HOOKS = [
  ON_INIT,
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW,
  ON_HIDE,
  ON_LAUNCH,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION,
  ON_INIT,
  ON_LOAD,
  ON_READY,
  ON_UNLOAD,
  ON_RESIZE,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES,
  ON_SHARE_APP_MESSAGE,
  ON_SAVE_EXIT_STATE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
const E$1 = function() {
};
E$1.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self2 = this;
    function listener() {
      self2.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i2 = 0;
    var len = evtArr.length;
    for (i2; i2 < len; i2++) {
      evtArr[i2].fn.apply(evtArr[i2].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i2 = 0, len = evts.length; i2 < len; i2++) {
        if (evts[i2].fn !== callback && evts[i2].fn._ !== callback)
          liveEvents.push(evts[i2]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1$1 = E$1;
const isObject = (val) => val !== null && typeof val === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile$1(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format.length) {
    let char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      const isClosed = char === endDelimiter;
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile$1(tokens, values) {
  const compiled = [];
  let index2 = 0;
  const mode = Array.isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index2 < tokens.length) {
    const token = tokens[index2];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        } else {
          {
            console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
          }
        }
        break;
      case "unknown":
        {
          console.warn(`Detect 'unknown' type of token!`);
        }
        break;
    }
    index2++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key2) => hasOwnProperty.call(val, key2);
const defaultFormatter = new BaseFormatter();
function include(str, parts2) {
  return !!parts2.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts2) {
  return parts2.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale, fallbackLocale, messages, watcher, formater }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index2 = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index2, 1);
    };
  }
  add(locale, message, override = true) {
    const curMessages = this.messages[locale];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key2) => {
          if (!hasOwn(curMessages, key2)) {
            curMessages[key2] = message[key2];
          }
        });
      }
    } else {
      this.messages[locale] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key2, locale, values) {
    let message = this.message;
    if (typeof locale === "string") {
      locale = normalizeLocale(locale, this.messages);
      locale && (message = this.messages[locale]);
    } else {
      values = locale;
    }
    if (!hasOwn(message, key2)) {
      console.warn(`Cannot translate the value of keypath ${key2}. Use the value of keypath as default.`);
      return key2;
    }
    return this.formater.interpolate(message[key2], values).join("");
  }
}
function watchAppLocale(appVm, i18n) {
  if (appVm.$watchLocale) {
    appVm.$watchLocale((newLocale) => {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(() => appVm.$locale, (newLocale) => {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof index !== "undefined" && index.getLocale) {
    return index.getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
  if (typeof locale !== "string") {
    [locale, messages] = [
      messages,
      locale
    ];
  }
  if (typeof locale !== "string") {
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== "string") {
    fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n = new I18n({
    locale,
    fallbackLocale,
    messages,
    watcher
  });
  let t2 = (key2, values) => {
    if (typeof getApp !== "function") {
      t2 = function(key3, values2) {
        return i18n.t(key3, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t2 = function(key3, values2) {
        const appVm = getApp().$vm;
        if (appVm) {
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key3, values2);
      };
    }
    return t2(key2, values);
  };
  return {
    i18n,
    f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t(key2, values) {
      return t2(key2, values);
    },
    add(locale2, message, override = true) {
      return i18n.add(locale2, message, override);
    },
    watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale() {
      return i18n.getLocale();
    },
    setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key2 in protocol) {
    const errMsg = validateProp$1(key2, data[key2], protocol[key2], !hasOwn$1(data, key2));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i2 = 0; i2 < len; i2++) {
    const opts = protocol[i2];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i2) {
      data[opts.name] = args[i2];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types2 = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types2.length && !isValid; i2++) {
      const { valid, expectedType } = assertType$1(value, types2[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$2(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$2(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
let invokeCallbackId = 1;
const invokeCallbacks = {};
function addInvokeCallback(id, name, callback, keepAlive = false) {
  invokeCallbacks[id] = {
    name,
    keepAlive,
    callback
  };
  return id;
}
function invokeCallback(id, res, extras) {
  if (typeof id === "number") {
    const opts = invokeCallbacks[id];
    if (opts) {
      if (!opts.keepAlive) {
        delete invokeCallbacks[id];
      }
      return opts.callback(res, extras);
    }
  }
  return res;
}
const API_SUCCESS = "success";
const API_FAIL = "fail";
const API_COMPLETE = "complete";
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
function normalizeErrMsg$1(errMsg, name) {
  if (!errMsg || errMsg.indexOf(":fail") === -1) {
    return name + ":ok";
  }
  return name + errMsg.substring(errMsg.indexOf(":fail"));
}
function createAsyncApiCallback(name, args = {}, { beforeAll, beforeSuccess } = {}) {
  if (!isPlainObject(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction(success);
  const hasFail = isFunction(fail);
  const hasComplete = isFunction(complete);
  const callbackId = invokeCallbackId++;
  addInvokeCallback(callbackId, name, (res) => {
    res = res || {};
    res.errMsg = normalizeErrMsg$1(res.errMsg, name);
    isFunction(beforeAll) && beforeAll(res);
    if (res.errMsg === name + ":ok") {
      isFunction(beforeSuccess) && beforeSuccess(res, args);
      hasSuccess && success(res);
    } else {
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  return callbackId;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook) {
  return function(data) {
    return hook(data) || data;
  };
}
function queue$1(hooks, data) {
  let promise = false;
  for (let i2 = 0; i2 < hooks.length; i2++) {
    const hook = hooks[i2];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      const res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options2 = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray(hooks)) {
      return;
    }
    const oldCallback = options2[name];
    options2[name] = function callbackInterceptor(res) {
      queue$1(hooks, res).then((res2) => {
        return isFunction(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options2;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options2, params2) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options2);
      return res.then((options3) => {
        return api(wrapperOptions(interceptor, options3), ...params2);
      });
    } else {
      return api(wrapperOptions(interceptor, options2), ...params2);
    }
  }
  return api(options2, ...params2);
}
function hasCallback(args) {
  if (isPlainObject(args) && [API_SUCCESS, API_FAIL, API_COMPLETE].find((cb) => isFunction(args[cb]))) {
    return true;
  }
  return false;
}
function handlePromise(promise) {
  return promise;
}
function promisify$1(name, fn) {
  return (args = {}, ...rest) => {
    if (hasCallback(args)) {
      return wrapperReturnValue(name, invokeApi(name, fn, args, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, fn, extend(args, { success: resolve2, fail: reject }), rest);
    })));
  };
}
function formatApiArgs(args, options2) {
  const params2 = args[0];
  if (!options2 || !isPlainObject(options2.formatArgs) && isPlainObject(params2)) {
    return;
  }
  const formatArgs = options2.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i2 = 0; i2 < keys.length; i2++) {
    const name = keys[i2];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params2);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn$1(params2, name)) {
        params2[name] = formatterOrDefaultValue;
      }
    }
  }
}
function invokeSuccess(id, name, res) {
  return invokeCallback(id, extend(res || {}, { errMsg: name + ":ok" }));
}
function invokeFail(id, name, errMsg, errRes) {
  return invokeCallback(id, extend({ errMsg: name + ":fail" + (errMsg ? " " + errMsg : "") }, errRes));
}
function beforeInvokeApi(name, args, protocol, options2) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options2 && options2.beforeInvoke) {
    const errMsg2 = options2.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options2);
  if (errMsg) {
    return errMsg;
  }
}
function normalizeErrMsg(errMsg) {
  if (!errMsg || isString(errMsg)) {
    return errMsg;
  }
  if (errMsg.stack) {
    console.error(errMsg.message + LINEFEED + errMsg.stack);
    return errMsg.message;
  }
  return errMsg;
}
function wrapperTaskApi(name, fn, protocol, options2) {
  return (args) => {
    const id = createAsyncApiCallback(name, args, options2);
    const errMsg = beforeInvokeApi(name, [args], protocol, options2);
    if (errMsg) {
      return invokeFail(id, name, errMsg);
    }
    return fn(args, {
      resolve: (res) => invokeSuccess(id, name, res),
      reject: (errMsg2, errRes) => invokeFail(id, name, normalizeErrMsg(errMsg2), errRes)
    });
  };
}
function wrapperSyncApi(name, fn, protocol, options2) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options2);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function wrapperAsyncApi(name, fn, protocol, options2) {
  return wrapperTaskApi(name, fn, protocol, options2);
}
function defineSyncApi(name, fn, protocol, options2) {
  return wrapperSyncApi(name, fn, protocol, options2);
}
function defineAsyncApi(name, fn, protocol, options2) {
  return promisify$1(name, wrapperAsyncApi(name, fn, protocol, options2));
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray(hooks) && isFunction(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i2 = 0; i2 < hooks.length; i2++) {
    if (res.indexOf(hooks[i2]) === -1) {
      res.push(hooks[i2]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (isString(method) && isPlainObject(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (isString(method)) {
    if (isPlainObject(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!isArray(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid;
let cidErrMsg;
let enabled;
function normalizePushMessage(message) {
  try {
    return JSON.parse(message);
  } catch (e2) {
  }
  return message;
}
function invokePushCallback(args) {
  if (args.type === "enabled") {
    enabled = true;
  } else if (args.type === "clientId") {
    cid = args.cid;
    cidErrMsg = args.errMsg;
    invokeGetPushCidCallbacks(cid, args.errMsg);
  } else if (args.type === "pushMsg") {
    const message = {
      type: "receive",
      data: normalizePushMessage(args.message)
    };
    for (let i2 = 0; i2 < onPushMessageCallbacks.length; i2++) {
      const callback = onPushMessageCallbacks[i2];
      callback(message);
      if (message.stopped) {
        break;
      }
    }
  } else if (args.type === "click") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({
        type: "click",
        data: normalizePushMessage(args.message)
      });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2, errMsg) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2, errMsg);
  });
  getPushCidCallbacks.length = 0;
}
const API_GET_PUSH_CLIENT_ID = "getPushClientId";
const getPushClientId = defineAsyncApi(API_GET_PUSH_CLIENT_ID, (_2, { resolve: resolve2, reject }) => {
  Promise.resolve().then(() => {
    if (typeof enabled === "undefined") {
      enabled = false;
      cid = "";
      cidErrMsg = "unipush is not enabled";
    }
    getPushCidCallbacks.push((cid2, errMsg) => {
      if (cid2) {
        resolve2({ cid: cid2 });
      } else {
        reject(errMsg);
      }
    });
    if (typeof cid !== "undefined") {
      invokeGetPushCidCallbacks(cid, cidErrMsg);
    }
  });
});
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|requireGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getDeviceInfo|getAppBaseInfo|getWindowInfo|getSystemSetting|getAppAuthorizeSetting/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction(api)) {
    return api;
  }
  return function promiseApi(options2 = {}, ...rest) {
    if (isFunction(options2.success) || isFunction(options2.fail) || isFunction(options2.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options2, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options2, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key2 in fromArgs) {
        if (hasOwn$1(argsOption, key2)) {
          let keyOption = argsOption[key2];
          if (isFunction(keyOption)) {
            keyOption = keyOption(fromArgs[key2], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ${methodName} \u6682\u4E0D\u652F\u6301 ${key2}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key2];
          } else if (isPlainObject(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key2] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key2) !== -1) {
          const callback = fromArgs[key2];
          if (isFunction(callback)) {
            toArgs[key2] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn$1(toArgs, key2)) {
            toArgs[key2] = fromArgs[key2];
          }
        }
      }
      return toArgs;
    } else if (isFunction(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn$1(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options2 = protocol;
      if (isFunction(protocol)) {
        options2 = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options2.args, options2.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options2.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options2.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN;
};
const setLocale = (locale) => {
  const app = getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushClientId,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key2) {
      if (hasOwn$1(target, key2)) {
        return target[key2];
      }
      if (hasOwn$1(api, key2)) {
        return promisify(key2, api[key2]);
      }
      if (hasOwn$1(baseApis, key2)) {
        return promisify(key2, baseApis[key2]);
      }
      return promisify(key2, wrapper(key2, wx[key2]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:\u670D\u52A1[" + service + "]\u4E0D\u5B58\u5728"
      };
      isFunction(fail) && fail(res);
    }
    isFunction(complete) && complete(res);
  };
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_2, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.screenHeight - safeArea.bottom
    };
  }
}
function populateParameters(fromRes, toRes) {
  const { brand = "", model = "", system = "", language = "", theme, version: version2, platform, fontSizeSetting, SDKVersion, pixelRatio, deviceOrientation } = fromRes;
  let osName = "";
  let osVersion = "";
  {
    osName = system.split(" ")[0] || "";
    osVersion = system.split(" ")[1] || "";
  }
  let hostVersion = version2;
  let deviceType = getGetDeviceType(fromRes, model);
  let deviceBrand = getDeviceBrand(brand);
  let _hostName = getHostName(fromRes);
  let _deviceOrientation = deviceOrientation;
  let _devicePixelRatio = pixelRatio;
  let _SDKVersion = SDKVersion;
  const hostLanguage = language.replace(/_/g, "-");
  const parameters = {
    appId: "",
    appName: "",
    appVersion: "1.0.0",
    appVersionCode: "100",
    appLanguage: getAppLanguage(hostLanguage),
    uniCompileVersion: "3.5.3",
    uniRuntimeVersion: "3.5.3",
    uniPlatform: {}.UNI_SUB_PLATFORM || "mp-weixin",
    deviceBrand,
    deviceModel: model,
    deviceType,
    devicePixelRatio: _devicePixelRatio,
    deviceOrientation: _deviceOrientation,
    osName: osName.toLocaleLowerCase(),
    osVersion,
    hostTheme: theme,
    hostVersion,
    hostLanguage,
    hostName: _hostName,
    hostSDKVersion: _SDKVersion,
    hostFontSizeSetting: fontSizeSetting,
    windowTop: 0,
    windowBottom: 0,
    osLanguage: void 0,
    osTheme: void 0,
    ua: void 0,
    hostPackageName: void 0,
    browserName: void 0,
    browserVersion: void 0
  };
  extend(toRes, parameters);
}
function getGetDeviceType(fromRes, model) {
  let deviceType = fromRes.deviceType || "phone";
  {
    const deviceTypeMaps = {
      ipad: "pad",
      windows: "pc",
      mac: "pc"
    };
    const deviceTypeMapsKeys = Object.keys(deviceTypeMaps);
    const _model = model.toLocaleLowerCase();
    for (let index2 = 0; index2 < deviceTypeMapsKeys.length; index2++) {
      const _m = deviceTypeMapsKeys[index2];
      if (_model.indexOf(_m) !== -1) {
        deviceType = deviceTypeMaps[_m];
        break;
      }
    }
  }
  return deviceType;
}
function getDeviceBrand(brand) {
  let deviceBrand = brand;
  if (deviceBrand) {
    deviceBrand = deviceBrand.toLocaleLowerCase();
  }
  return deviceBrand;
}
function getAppLanguage(defaultLanguage) {
  return getLocale ? getLocale() : defaultLanguage;
}
function getHostName(fromRes) {
  const _platform = "WeChat";
  let _hostName = fromRes.hostName || _platform;
  {
    if (fromRes.environment) {
      _hostName = fromRes.environment;
    } else if (fromRes.host && fromRes.host.env) {
      _hostName = fromRes.host.env;
    }
  }
  return _hostName;
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
    populateParameters(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const showActionSheet = {
  args(fromArgs, toArgs) {
    toArgs.alertText = fromArgs.title;
  }
};
const getDeviceInfo = {
  returnValue: (fromRes, toRes) => {
    const { brand, model } = fromRes;
    let deviceType = getGetDeviceType(fromRes, model);
    let deviceBrand = getDeviceBrand(brand);
    useDeviceId()(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      deviceType,
      deviceBrand,
      deviceModel: model
    }));
  }
};
const getAppBaseInfo = {
  returnValue: (fromRes, toRes) => {
    const { version: version2, language, SDKVersion, theme } = fromRes;
    let _hostName = getHostName(fromRes);
    let hostLanguage = language.replace(/_/g, "-");
    toRes = sortObject(extend(toRes, {
      hostVersion: version2,
      hostLanguage,
      hostName: _hostName,
      hostSDKVersion: SDKVersion,
      hostTheme: theme,
      appId: "",
      appName: "",
      appVersion: "1.0.0",
      appVersionCode: "100",
      appLanguage: getAppLanguage(hostLanguage)
    }));
  }
};
const getWindowInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    toRes = sortObject(extend(toRes, {
      windowTop: 0,
      windowBottom: 0
    }));
  }
};
const getAppAuthorizeSetting = {
  returnValue: function(fromRes, toRes) {
    const { locationReducedAccuracy } = fromRes;
    toRes.locationAccuracy = "unsupported";
    if (locationReducedAccuracy === true) {
      toRes.locationAccuracy = "reduced";
    } else if (locationReducedAccuracy === false) {
      toRes.locationAccuracy = "full";
    }
  }
};
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getProvider,
  createSelectorQuery
});
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync,
  showActionSheet,
  getDeviceInfo,
  getAppBaseInfo,
  getWindowInfo,
  getAppAuthorizeSetting
});
var index = initUni(shims, protocols);
function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    } else {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i2 = 0; i2 < deps.length; i2++) {
      const dep = deps[i2];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key2) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key2);
    if (!dep) {
      depsMap.set(key2, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key: key2 };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({ effect: activeEffect }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key2, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key2 === "length" && isArray(target)) {
    depsMap.forEach((dep, key3) => {
      if (key3 === "length" || key3 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key2 !== void 0) {
      deps.push(depsMap.get(key2));
    }
    switch (type) {
      case "add":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key2)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key: key2, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray(dep) ? dep : [...dep];
  for (const effect of effects) {
    if (effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
  for (const effect of effects) {
    if (!effect.computed) {
      triggerEffect(effect, debuggerEventExtraInfo);
    }
  }
}
function triggerEffect(effect, debuggerEventExtraInfo) {
  if (effect !== activeEffect || effect.allowRecurse) {
    if (effect.onTrigger) {
      effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
    }
    if (effect.scheduler) {
      effect.scheduler();
    } else {
      effect.run();
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key2) => key2 !== "arguments" && key2 !== "caller").map((key2) => Symbol[key2]).filter(isSymbol)
);
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key2) => {
    instrumentations[key2] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key2](...args);
      if (res === -1 || res === false) {
        return arr[key2](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key2) => {
    instrumentations[key2] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key2].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key2, receiver) {
    if (key2 === "__v_isReactive") {
      return !isReadonly2;
    } else if (key2 === "__v_isReadonly") {
      return isReadonly2;
    } else if (key2 === "__v_isShallow") {
      return shallow;
    } else if (key2 === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray(target);
    if (!isReadonly2 && targetIsArray && hasOwn$1(arrayInstrumentations, key2)) {
      return Reflect.get(arrayInstrumentations, key2, receiver);
    }
    const res = Reflect.get(target, key2, receiver);
    if (isSymbol(key2) ? builtInSymbols.has(key2) : isNonTrackableKeys(key2)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key2);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key2) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key2, value, receiver) {
    let oldValue = target[key2];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray(target) && isIntegerKey(key2) ? Number(key2) < target.length : hasOwn$1(target, key2);
    const result = Reflect.set(target, key2, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key2, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key2, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key2) {
  const hadKey = hasOwn$1(target, key2);
  const oldValue = target[key2];
  const result = Reflect.deleteProperty(target, key2);
  if (result && hadKey) {
    trigger(target, "delete", key2, void 0, oldValue);
  }
  return result;
}
function has(target, key2) {
  const result = Reflect.has(target, key2);
  if (!isSymbol(key2) || !builtInSymbols.has(key2)) {
    track(target, "has", key2);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set: set$1,
  deleteProperty,
  has,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key2) {
    {
      warn(`Set operation on key "${String(key2)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key2) {
    {
      warn(`Delete operation on key "${String(key2)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get$1(target, key2, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key2);
  if (!isReadonly2) {
    if (key2 !== rawKey) {
      track(rawTarget, "get", key2);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key2)) {
    return wrap(target.get(key2));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key2);
  }
}
function has$1(key2, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key2);
  if (!isReadonly2) {
    if (key2 !== rawKey) {
      track(rawTarget, "has", key2);
    }
    track(rawTarget, "has", rawKey);
  }
  return key2 === rawKey ? target.has(key2) : target.has(key2) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1$1(key2, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key2);
  if (!hadKey) {
    key2 = toRaw(key2);
    hadKey = has2.call(target, key2);
  } else {
    checkIdentityKeys(target, has2, key2);
  }
  const oldValue = get2.call(target, key2);
  target.set(key2, value);
  if (!hadKey) {
    trigger(target, "add", key2, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key2, value, oldValue);
  }
  return this;
}
function deleteEntry(key2) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key2);
  if (!hadKey) {
    key2 = toRaw(key2);
    hadKey = has2.call(target, key2);
  } else {
    checkIdentityKeys(target, has2, key2);
  }
  const oldValue = get2 ? get2.call(target, key2) : void 0;
  const result = target.delete(key2);
  if (hadKey) {
    trigger(target, "delete", key2, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key2) => {
      return callback.call(thisArg, wrap(value), wrap(key2), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key2 = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key2}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key2) {
      return get$1(this, key2);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key2) {
      return get$1(this, key2, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key2) {
      return get$1(this, key2, true);
    },
    get size() {
      return size(this, true);
    },
    has(key2) {
      return has$1.call(this, key2, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key2) {
      return get$1(this, key2, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key2) {
      return has$1.call(this, key2, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key2, receiver) => {
    if (key2 === "__v_isReactive") {
      return !isReadonly2;
    } else if (key2 === "__v_isReadonly") {
      return isReadonly2;
    } else if (key2 === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn$1(instrumentations, key2) && key2 in target ? instrumentations : target, key2, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key2) {
  const rawKey = toRaw(key2);
  if (rawKey !== key2 && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key2, receiver) => unref(Reflect.get(target, key2, receiver)),
  set: (target, key2, value, receiver) => {
    const oldValue = target[key2];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key2, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  if (!isProxy(object)) {
    console.warn(`toRefs() expects a reactive object but received a plain one.`);
  }
  const ret = isArray(object) ? new Array(object.length) : {};
  for (const key2 in object) {
    ret[key2] = toRef(object, key2);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
}
function toRef(object, key2, defaultValue) {
  const val = object[key2];
  return isRef(val) ? val : new ObjectRefImpl(object, key2, defaultValue);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key2) => {
    res.push(...formatProp(key2, props[key2]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key2, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key2}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key2}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key2, toRaw(value.value), true);
    return raw ? value : [`${key2}=Ref<`, value, `>`];
  } else if (isFunction(value)) {
    return [`${key2}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key2}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function hasQueueJob(job) {
  return queue.indexOf(job) > -1;
}
function invalidateJob(job) {
  const i2 = queue.indexOf(job);
  if (i2 > flushIndex) {
    queue.splice(i2, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index2) {
  if (!isArray(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
        continue;
      }
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  flushPreFlushCbs();
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a2, b2) => getId(a2) - getId(b2));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  flushPreFlushCbs(seen);
  queue.sort((a2, b2) => getId(a2) - getId(b2));
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn$1(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
function emit(event, ...args) {
}
function devtoolsComponentEmit(component, event, params2) {
  emit("component:emit", component.appContext.app, component, event, params2);
}
function emit$1(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => a2.trim());
    }
    if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray(raw)) {
    raw.forEach((key2) => normalized[key2] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options2, key2) {
  if (!options2 || !isOn(key2)) {
    return false;
  }
  key2 = key2.slice(2).replace(/Once$/, "");
  return hasOwn$1(options2, key2[0].toLowerCase() + key2.slice(1)) || hasOwn$1(options2, hyphenate(key2)) || hasOwn$1(options2, key2);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key2, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key2] = value;
    if (currentInstance.type.mpType === "app") {
      currentInstance.appContext.app.provide(key2, value);
    }
  }
}
function inject(key2, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key2 in provides) {
      return provides[key2];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key2)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options2) {
  if (!isFunction(cb)) {
    warn$1(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options2);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$1(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s2) => isReactive(s2) || isShallow(s2));
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse(s2);
      } else if (isFunction(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options2) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options2 = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options2);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse(value, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse(value.value, seen);
  } else if (isArray(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse(value[i2], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse(v2, seen);
    });
  } else if (isPlainObject(value)) {
    for (const key2 in value) {
      traverse(value[key2], seen);
    }
  }
  return value;
}
function defineComponent(options2) {
  return isFunction(options2) ? { setup: options2, name: options2.name } : options2;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn$1(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook$1 = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook$1("bm");
const onMounted = createHook$1("m");
const onBeforeUpdate = createHook$1("bu");
const onUpdated = createHook$1("u");
const onBeforeUnmount = createHook$1("bum");
const onUnmounted = createHook$1("um");
const onServerPrefetch = createHook$1("sp");
const onRenderTriggered = createHook$1("rtg");
const onRenderTracked = createHook$1("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component2, false);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = resolve(instance[type] || Component2[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
  $: (i2) => i2,
  $el: (i2) => i2.__$el || (i2.__$el = {}),
  $data: (i2) => i2.data,
  $props: (i2) => shallowReadonly(i2.props),
  $attrs: (i2) => shallowReadonly(i2.attrs),
  $slots: (i2) => shallowReadonly(i2.slots),
  $refs: (i2) => shallowReadonly(i2.refs),
  $parent: (i2) => getPublicInstance(i2.parent),
  $root: (i2) => getPublicInstance(i2.root),
  $emit: (i2) => i2.emit,
  $options: (i2) => resolveMergedOptions(i2),
  $forceUpdate: (i2) => i2.f || (i2.f = () => queueJob(i2.update)),
  $watch: (i2) => instanceWatch.bind(i2)
});
const isReservedPrefix = (key2) => key2 === "_" || key2 === "$";
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key2) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key2 === "__isVue") {
      return true;
    }
    if (setupState !== EMPTY_OBJ && setupState.__isScriptSetup && hasOwn$1(setupState, key2)) {
      return setupState[key2];
    }
    let normalizedProps;
    if (key2[0] !== "$") {
      const n2 = accessCache[key2];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key2];
          case 2:
            return data[key2];
          case 4:
            return ctx[key2];
          case 3:
            return props[key2];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key2)) {
        accessCache[key2] = 1;
        return setupState[key2];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key2)) {
        accessCache[key2] = 2;
        return data[key2];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key2)) {
        accessCache[key2] = 3;
        return props[key2];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key2)) {
        accessCache[key2] = 4;
        return ctx[key2];
      } else if (shouldCacheAccess) {
        accessCache[key2] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key2];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key2 === "$attrs") {
        track(instance, "get", key2);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key2])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key2)) {
      accessCache[key2] = 4;
      return ctx[key2];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key2)) {
      {
        return globalProperties[key2];
      }
    } else if (currentRenderingInstance && (!isString(key2) || key2.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && isReservedPrefix(key2[0]) && hasOwn$1(data, key2)) {
        warn$1(`Property ${JSON.stringify(key2)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$1(`Property ${JSON.stringify(key2)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key2, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key2)) {
      setupState[key2] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key2)) {
      data[key2] = value;
      return true;
    } else if (hasOwn$1(instance.props, key2)) {
      warn$1(`Attempting to mutate prop "${key2}". Props are readonly.`, instance);
      return false;
    }
    if (key2[0] === "$" && key2.slice(1) in instance) {
      warn$1(`Attempting to mutate public property "${key2}". Properties starting with $ are reserved and readonly.`, instance);
      return false;
    } else {
      if (key2 in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key2, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key2] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key2) {
    let normalizedProps;
    return !!accessCache[key2] || data !== EMPTY_OBJ && hasOwn$1(data, key2) || setupState !== EMPTY_OBJ && hasOwn$1(setupState, key2) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key2) || hasOwn$1(ctx, key2) || hasOwn$1(publicPropertiesMap, key2) || hasOwn$1(appContext.config.globalProperties, key2);
  },
  defineProperty(target, key2, descriptor) {
    if (descriptor.get != null) {
      target._.accessCache[key2] = 0;
    } else if (hasOwn$1(descriptor, "value")) {
      this.set(target, key2, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key2, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key2) => {
    Object.defineProperty(target, key2, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key2](instance),
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key2) => {
      Object.defineProperty(ctx, key2, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key2],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key2) => {
    if (!setupState.__isScriptSetup) {
      if (isReservedPrefix(key2[0])) {
        warn$1(`setup() return property ${JSON.stringify(key2)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key2, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key2],
        set: NOOP
      });
    }
  });
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key2) => {
    if (cache[key2]) {
      warn$1(`${type} property "${key2}" is already defined in ${cache[key2]}.`);
    } else {
      cache[key2] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options2 = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options2.beforeCreate) {
    callHook$1(options2.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options2;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key2 in propsOptions) {
        checkDuplicateProperties("Props", key2);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key2 in methods) {
      const methodHandler = methods[key2];
      if (isFunction(methodHandler)) {
        {
          Object.defineProperty(ctx, key2, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key2);
        }
      } else {
        warn$1(`Method "${key2}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction(dataOptions)) {
      warn$1(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$1(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key2 in data) {
          checkDuplicateProperties("Data", key2);
          if (!isReservedPrefix(key2[0])) {
            Object.defineProperty(ctx, key2, {
              configurable: true,
              enumerable: true,
              get: () => data[key2],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key2 in computedOptions) {
      const opt = computedOptions[key2];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key2}" has no getter.`);
      }
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(`Write operation failed: computed property "${key2}" is readonly.`);
      };
      const c2 = computed$1({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key2, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
      {
        checkDuplicateProperties("Computed", key2);
      }
    }
  }
  if (watchOptions) {
    for (const key2 in watchOptions) {
      createWatcher(watchOptions[key2], ctx, publicThis, key2);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key2) => {
        provide(key2, provides[key2]);
      });
    }
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key2) => {
        Object.defineProperty(exposed, key2, {
          get: () => publicThis[key2],
          set: (val) => publicThis[key2] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options2, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key2 in injectOptions) {
    const opt = injectOptions[key2];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key2, opt.default, true);
      } else {
        injected = inject(opt.from || key2);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key2, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v2) => injected.value = v2
        });
      } else {
        {
          warn$1(`injected property "${key2}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key2] = injected;
      }
    } else {
      ctx[key2] = injected;
    }
    {
      checkDuplicateProperties("Inject", key2);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key2) {
  const getter = key2.includes(".") ? createPathGetter(publicThis, key2) : () => publicThis[key2];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key2));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key2}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m2) => mergeOptions(resolved, m2, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m2) => mergeOptions(to, m2, strats, true));
  }
  for (const key2 in from) {
    if (asMixin && key2 === "expose") {
      warn$1(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key2] || strats && strats[key2];
      to[key2] = strat ? strat(to[key2], from[key2]) : from[key2];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction(to) ? to.call(this, this) : to, isFunction(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key2 in from) {
    merged[key2] = mergeAsArray$1(to[key2], from[key2]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key2 in instance.propsOptions[0]) {
    if (!(key2 in props)) {
      props[key2] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options2] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (!(instance.type.__hmrId || instance.parent && instance.parent.type.__hmrId) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key2 = propsToUpdate[i2];
        if (isEmitListener(instance.emitsOptions, key2)) {
          continue;
        }
        const value = rawProps[key2];
        if (options2) {
          if (hasOwn$1(attrs, key2)) {
            if (value !== attrs[key2]) {
              attrs[key2] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key2);
            props[camelizedKey] = resolvePropValue(options2, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key2]) {
            attrs[key2] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key2 in rawCurrentProps) {
      if (!rawProps || !hasOwn$1(rawProps, key2) && ((kebabKey = hyphenate(key2)) === key2 || !hasOwn$1(rawProps, kebabKey))) {
        if (options2) {
          if (rawPrevProps && (rawPrevProps[key2] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key2] = resolvePropValue(options2, rawCurrentProps, key2, void 0, instance, true);
          }
        } else {
          delete props[key2];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key2 in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key2) && true) {
          delete attrs[key2];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options2, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key2 in rawProps) {
      if (isReservedProp(key2)) {
        continue;
      }
      const value = rawProps[key2];
      let camelKey;
      if (options2 && hasOwn$1(options2, camelKey = camelize(key2))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key2)) {
        if (!(key2 in attrs) || value !== attrs[key2]) {
          attrs[key2] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key2 = needCastKeys[i2];
      props[key2] = resolvePropValue(options2, rawCurrentProps, key2, castValues[key2], instance, !hasOwn$1(castValues, key2));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options2, props, key2, value, instance, isAbsent) {
  const opt = options2[key2];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key2 in propsDefaults) {
          value = propsDefaults[key2];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key2] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key2))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString(raw[i2])) {
        warn$1(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key2 in raw) {
      const normalizedKey = camelize(key2);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key2];
        const prop = normalized[normalizedKey] = isArray(opt) || isFunction(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key2) {
  if (key2[0] !== "$") {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key2}" is a reserved property.`);
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a2, b2) {
  return getType(a2) === getType(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options2 = instance.propsOptions[0];
  for (const key2 in options2) {
    let opt = options2[key2];
    if (opt == null)
      continue;
    validateProp(key2, resolvedValues[key2], opt, !hasOwn$1(rawProps, key2) && !hasOwn$1(rawProps, hyphenate(key2)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types2 = isArray(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types2.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value, types2[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = Object.assign({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn$1(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options2) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options2);
        } else if (isFunction(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options2);
        } else {
          warn$1(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive) {
        {
          validateDirectiveName(name);
        }
        if (!directive) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive;
        return app;
      },
      mount() {
      },
      unmount() {
      },
      provide(key2, value) {
        if (key2 in context.provides) {
          warn$1(`App already provides property with key "${String(key2)}". It will be overwritten with the new value.`);
        }
        context.provides[key2] = value;
        return app;
      }
    };
    return app;
  };
}
const queuePostRenderEffect = queuePostFlushCb;
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile;
const isRuntimeOnly = () => !compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(`Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(
    instance.attrs,
    {
      get(target, key2) {
        track(instance, "get", "$attrs");
        return target[key2];
      },
      set() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      },
      deleteProperty() {
        warn$1(`setupContext.attrs is readonly.`);
        return false;
      }
    }
  );
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (instance.exposed) {
      warn$1(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key2) {
        if (key2 in target) {
          return target[key2];
        }
        return instance.proxy[key2];
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2, includeInferred = true) {
  return isFunction(Component2) ? Component2.displayName || Component2.name : Component2.name || includeInferred && Component2.__name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key2 in registry) {
        if (registry[key2] === Component2) {
          return key2;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed$1 = (getterOrOptions, debugOptions) => {
  return computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.37";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key2 in pre) {
      const currentValue = current[key2];
      if (currentValue === void 0) {
        current[key2] = null;
      } else {
        syncKeys(currentValue, pre[key2]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key2 in current) {
        const currentValue = unwrapper(current[key2]);
        const preValue = pre[key2];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key2, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key2, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key2, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key2 + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key2, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key2 + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k2, v2) {
  result[k2] = v2;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    if ({}.VUE_APP_DEBUG) {
      const mpInstance = ctx.$scope;
      console.log("[" + +new Date() + "][" + (mpInstance.is || mpInstance.route) + "][" + instance.uid + "]:flushCallbacks[" + callbacks.length + "]");
    }
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i2 = 0; i2 < copies.length; i2++) {
      copies[i2]();
    }
  }
}
function nextTick$1(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    if ({}.VUE_APP_DEBUG) {
      const mpInstance = ctx.$scope;
      console.log("[" + +new Date() + "][" + (mpInstance.is || mpInstance.route) + "][" + instance.uid + "]:nextVueTick");
    }
    return nextTick(fn && fn.bind(instance.proxy));
  }
  if ({}.VUE_APP_DEBUG) {
    const mpInstance = ctx.$scope;
    console.log("[" + +new Date() + "][" + (mpInstance.is || mpInstance.route) + "][" + instance.uid + "]:nextMPTick");
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(fn.bind(instance.proxy), instance, 14);
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i2 = 0; i2 < len; i2++) {
        copy[i2] = clone(src[i2], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn$1(src, name)) {
          copy[name] = clone(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy$1(src) {
  return clone(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key2) => {
    ret[key2] = data[key2];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy$1(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs(void 0, instance.update);
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick$1(this.$, fn);
  };
}
function onApplyOptions(options2, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options2, instance, publicThis);
  const computedOptions = options2.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const check = $mpPlatform === "mp-baidu" || $mpPlatform === "mp-toutiao";
  const doSetByRefs = (refs) => {
    const mpComponents = $scope.selectAllComponents(".r").concat($scope.selectAllComponents(".r-i-f"));
    return refs.filter((templateRef) => {
      const refValue = findComponentPublicInstance(mpComponents, templateRef.i);
      if (check && refValue === null) {
        return true;
      }
      setTemplateRef(templateRef, refValue, setupState);
      return false;
    });
  };
  const doSet = () => {
    const refs = doSetByRefs($templateRefs);
    if (refs.length && instance.proxy && instance.proxy.$scope) {
      instance.proxy.$scope.setData({ r1: 1 }, () => {
        doSetByRefs(refs);
      });
    }
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick$1(instance, doSet);
  }
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    return getExposeProxy(vm.$) || vm;
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn$1(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect$1 = queuePostFlushCb;
function mountComponent(initialVNode, options2) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options2.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options2.mpType === "app") {
    instance.render = NOOP;
  }
  if (options2.onBeforeSetup) {
    options2.onBeforeSetup(instance, options2);
  }
  {
    pushWarningContext(initialVNode);
  }
  setupComponent(instance);
  {
    if (options2.parentComponent && instance.proxy) {
      options2.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key2 in attrs) {
    if (key2 === "class" || key2 === "style" || isOn(key2)) {
      (res || (res = {}))[key2] = attrs[key2];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, propsOptions: [propsOptions], slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } }, inheritAttrs } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      fallthroughAttrs(inheritAttrs, props, propsOptions, attrs);
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      fallthroughAttrs(inheritAttrs, props, propsOptions, Component2.props ? attrs : getFunctionalFallthrough(attrs));
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(props, null);
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
function fallthroughAttrs(inheritAttrs, props, propsOptions, fallthroughAttrs2) {
  if (props && fallthroughAttrs2 && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs2).filter((key2) => key2 !== "class" && key2 !== "style");
    if (!keys.length) {
      return;
    }
    if (propsOptions && keys.some(isModelListener)) {
      keys.forEach((key2) => {
        if (!isModelListener(key2) || !(key2.slice(9) in propsOptions)) {
          props[key2] = fallthroughAttrs2[key2];
        }
      });
    } else {
      keys.forEach((key2) => props[key2] = fallthroughAttrs2[key2]);
    }
  }
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs(void 0, instance.update);
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = isString(index2) ? `${path}.${index2}` : `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      patch(instance, renderComponentRoot(instance));
    } else {
      const { bu, u: u2 } = instance;
      toggleRecurse(instance, false);
      updateComponentPreRender(instance);
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      patch(instance, renderComponentRoot(instance));
      if (u2) {
        queuePostRenderEffect$1(u2);
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(
    componentUpdateFn,
    () => queueJob(instance.update),
    instance.scope
  );
  const update = instance.update = effect.run.bind(effect);
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect$1(um);
  }
  queuePostRenderEffect$1(() => {
    instance.isUnmounted = true;
  });
}
const oldCreateApp = createAppAPI();
function createVueApp(rootComponent, rootProps = null) {
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options2) {
    return mountComponent(createVNode(initialVNode), options2);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    app._instance = instance.$;
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn$1(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options2, instance, publicThis) {
  const mpType = options2.mpType || publicThis.$mpType;
  if (!mpType) {
    return;
  }
  Object.keys(options2).forEach((name) => {
    if (name.indexOf("on") === 0) {
      const hooks = options2[name];
      if (isArray(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options2, instance, publicThis) {
  initHooks$1(options2, instance, publicThis);
}
function set(target, key2, val) {
  return target[key2] = val;
}
function createErrorHandler(app) {
  return function errorHandler(err, instance, _info) {
    if (!instance) {
      throw err;
    }
    const appInstance = app._instance;
    if (!appInstance || !appInstance.proxy) {
      throw err;
    }
    {
      appInstance.proxy.$callHook(ON_ERROR, err);
    }
  };
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i2 = 0;
    for (; i2 < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i2++)) << 18 | b64.indexOf(str.charAt(i2++)) << 12 | (r1 = b64.indexOf(str.charAt(i2++))) << 6 | (r2 = b64.indexOf(str.charAt(i2++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  if (isFunction(app._component.onError)) {
    appConfig.errorHandler = createErrorHandler(app);
  }
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = {}.UNI_MP_PLUGIN ? "createPluginApp" : {}.UNI_SUBPACKAGE ? "createSubpackageApp" : "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key2) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key2 !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString(key2) || typeof key2 === "number") ? "_" + key2 : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    const eventTarget = e2.target;
    const eventSync = eventTarget ? eventTarget.dataset ? eventTarget.dataset.eventsync === "true" : false : false;
    if (bubbles.includes(e2.type) && !eventSync) {
      setTimeout(invoke);
    } else {
      const res = invoke();
      if (e2.type === "input" && (isArray(res) || isPromise(res))) {
        return;
      }
      return res;
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn$1(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn$1(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject(event.detail) && hasOwn$1(event.detail, "checked") && !hasOwn$1(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l2 = source.length; i2 < l2; i2++) {
      ret[i2] = renderItem(source[i2], i2, i2);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn$1(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem(i2 + 1, i2, i2);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, i2));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
        const key2 = keys[i2];
        ret[i2] = renderItem(source[key2], key2, i2);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringify(normalizeStyle(value));
}
function stringify(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key2 in styles) {
    ret += `${key2.startsWith(`--`) ? key2 : hyphenate(key2)}:${styles[key2]};`;
  }
  return ret;
}
const o$1 = (value, key2) => vOn(value, key2);
const f$1 = (source, renderItem) => vFor(source, renderItem);
const s$1 = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const n$1 = (value) => normalizeClass(value);
const t$1 = (val) => toDisplayString(val);
const p$1 = (props) => renderProps(props);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const eventChannels = {};
const eventChannelStack = [];
function getEventChannel(id) {
  if (id) {
    const eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options2) {
  const ctx = instance.ctx;
  ctx.mpType = options2.mpType;
  ctx.$mpType = options2.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options2.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray(options2.slots) && options2.slots.length) {
    options2.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options2.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options2) {
  initBaseInstance(instance, options2);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock2) => {
    if (hasOwn$1(mpInstance, mock2)) {
      instance[mock2] = ctx[mock2] = mpInstance[mock2];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  } else if (name === "onLoad" && args && args.__id__) {
    this.__eventChannel__ = getEventChannel(args.__id__);
    delete args.__id__;
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (name.indexOf("on") === 0 && isFunction(vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn$1(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn$1(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options2) {
      this.$vm = instance;
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options2);
    }
  };
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = getApp({
      allowDefault: true
    });
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn$1(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn$1(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
    if ({}.UNI_SUBPACKAGE) {
      (wx.$subpackages || (wx.$subpackages = {}))[{}.UNI_SUBPACKAGE] = {
        $vm: vm
      };
    }
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    appOptions.onLaunch(args);
  }
  if (isFunction(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
}
function initLocale(appVm) {
  const locale = ref(normalizeLocale(wx.getSystemInfoSync().language) || LOCALE_EN);
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v2) {
      locale.value = v2;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn$1(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    const childVm = $children[i2];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    parentVm = findVmByVueId($children[i2], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  "eO",
  "uR",
  "uRIF",
  "uI",
  "uT",
  "uP",
  "uS"
];
function initDefaultProps(isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  return properties;
}
function initVirtualHostProps(options2) {
  const properties = {};
  {
    if (options2 && options2.virtualHost) {
      properties.virtualHostStyle = {
        type: null,
        value: ""
      };
      properties.virtualHostClass = {
        type: null,
        value: ""
      };
    }
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps(), initVirtualHostProps(mpComponentOptions.options));
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray(rawProps)) {
    rawProps.forEach((key2) => {
      properties[key2] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject(rawProps)) {
    Object.keys(rawProps).forEach((key2) => {
      const opts = rawProps[key2];
      if (isPlainObject(opts)) {
        let value = opts.default;
        if (isFunction(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key2] = {
          type: opts.type,
          value
        };
      } else {
        properties[key2] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initData(_2) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    if (hasQueueJob(instance.update)) {
      invalidateJob(instance.update);
    }
    {
      instance.update();
    }
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key2 = nextKeys[i2];
    if (nextProps[key2] !== prevProps[key2]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray(vueProps)) {
          vueProps.push("name");
          vueProps.push("value");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options2 = {
    multipleSlots: true,
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (vueOptions.options) {
    extend(options2, vueOptions.options);
  }
  const mpComponentOptions = {
    options: options2,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  if (parse2) {
    parse2(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function getAppVm() {
  if ({}.UNI_MP_PLUGIN) {
    return wx.$vm;
  }
  if ({}.UNI_SUBPACKAGE) {
    return wx.$subpackages[{}.UNI_SUBPACKAGE].$vm;
  }
  return getApp().$vm;
}
function $createComponent(initialVNode, options2) {
  if (!$createComponentFn) {
    $createComponentFn = getAppVm().$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options2);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getApp().$vm.$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  {
    initUnknownHooks(methods, vueOptions);
  }
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse2 && parse2(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
    if ({}.UNI_MP_PLUGIN) {
      wx.$vm = vm;
    }
  };
}
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
}
function initMiniProgramHook(name, options2, isComponent) {
  const oldHook = options2[name];
  if (!oldHook) {
    options2[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options2[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options2) {
  initMiniProgramHook(ON_LOAD, options2);
  return MPPage(options2);
};
Component = function(options2) {
  initMiniProgramHook("created", options2);
  const isVueComponent = options2.properties && options2.properties.uP;
  if (!isVueComponent) {
    initProps(options2);
    initPropsObserver(options2);
  }
  return MPComponent(options2);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      let properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      let propsData = properties;
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(propsData, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options2) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options2);
        }
      });
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  mocks,
  isPage,
  initRelation,
  handleLink,
  initLifetimes
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
{
  wx.createApp = global.createApp = createApp;
  wx.createPage = createPage;
  wx.createComponent = createComponent;
  wx.createPluginApp = global.createPluginApp = createPluginApp;
  wx.createSubpackageApp = global.createSubpackageApp = createSubpackageApp;
}
const createHook = (lifecycle) => (hook, target = getCurrentInstance()) => {
  !isInSSRComponentSetup && injectHook(lifecycle, hook, target);
};
const onShow = /* @__PURE__ */ createHook(ON_SHOW);
const onHide = /* @__PURE__ */ createHook(ON_HIDE);
const onLaunch = /* @__PURE__ */ createHook(ON_LAUNCH);
const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
var mock = { exports: {} };
(function(module, exports) {
  (function webpackUniversalModuleDefinition(root, factory) {
    module.exports = factory();
  })(commonjsGlobal, function() {
    return function(modules) {
      var installedModules = {};
      function __webpack_require__2(moduleId) {
        if (installedModules[moduleId])
          return installedModules[moduleId].exports;
        var module2 = installedModules[moduleId] = {
          exports: {},
          id: moduleId,
          loaded: false
        };
        modules[moduleId].call(module2.exports, module2, module2.exports, __webpack_require__2);
        module2.loaded = true;
        return module2.exports;
      }
      __webpack_require__2.m = modules;
      __webpack_require__2.c = installedModules;
      __webpack_require__2.p = "";
      return __webpack_require__2(0);
    }([
      function(module2, exports2, __webpack_require__2) {
        var Handler2 = __webpack_require__2(1);
        var Util2 = __webpack_require__2(3);
        var Random2 = __webpack_require__2(5);
        var RE2 = __webpack_require__2(20);
        var toJSONSchema = __webpack_require__2(23);
        var valid = __webpack_require__2(25);
        var XHR;
        if (typeof window !== "undefined")
          XHR = __webpack_require__2(27);
        /*!
            Mock - 模拟请求 & 模拟数据
            https://github.com/nuysoft/Mock
            墨智 mozhi.gyy@taobao.com nuysoft@gmail.com
        */
        var Mock2 = {
          Handler: Handler2,
          Random: Random2,
          Util: Util2,
          XHR,
          RE: RE2,
          toJSONSchema,
          valid,
          heredoc: Util2.heredoc,
          setup: function(settings) {
            return XHR.setup(settings);
          },
          _mocked: {}
        };
        Mock2.version = "1.0.1-beta3";
        if (XHR)
          XHR.Mock = Mock2;
        Mock2.mock = function(rurl, rtype, template) {
          if (arguments.length === 1) {
            return Handler2.gen(rurl);
          }
          if (arguments.length === 2) {
            template = rtype;
            rtype = void 0;
          }
          if (XHR)
            window.XMLHttpRequest = XHR;
          Mock2._mocked[rurl + (rtype || "")] = {
            rurl,
            rtype,
            template
          };
          return Mock2;
        };
        module2.exports = Mock2;
      },
      function(module, exports, __webpack_require__) {
        var Constant = __webpack_require__(2);
        var Util = __webpack_require__(3);
        var Parser = __webpack_require__(4);
        var Random = __webpack_require__(5);
        var RE = __webpack_require__(20);
        var Handler = {
          extend: Util.extend
        };
        Handler.gen = function(template, name, context) {
          name = name == void 0 ? "" : name + "";
          context = context || {};
          context = {
            path: context.path || [Constant.GUID],
            templatePath: context.templatePath || [Constant.GUID++],
            currentContext: context.currentContext,
            templateCurrentContext: context.templateCurrentContext || template,
            root: context.root || context.currentContext,
            templateRoot: context.templateRoot || context.templateCurrentContext || template
          };
          var rule = Parser.parse(name);
          var type = Util.type(template);
          var data;
          if (Handler[type]) {
            data = Handler[type]({
              type,
              template,
              name,
              parsedName: name ? name.replace(Constant.RE_KEY, "$1") : name,
              rule,
              context
            });
            if (!context.root)
              context.root = data;
            return data;
          }
          return template;
        };
        Handler.extend({
          array: function(options2) {
            var result = [], i2, ii;
            if (options2.template.length === 0)
              return result;
            if (!options2.rule.parameters) {
              for (i2 = 0; i2 < options2.template.length; i2++) {
                options2.context.path.push(i2);
                options2.context.templatePath.push(i2);
                result.push(
                  Handler.gen(options2.template[i2], i2, {
                    path: options2.context.path,
                    templatePath: options2.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options2.template,
                    root: options2.context.root || result,
                    templateRoot: options2.context.templateRoot || options2.template
                  })
                );
                options2.context.path.pop();
                options2.context.templatePath.pop();
              }
            } else {
              if (options2.rule.min === 1 && options2.rule.max === void 0) {
                options2.context.path.push(options2.name);
                options2.context.templatePath.push(options2.name);
                result = Random.pick(
                  Handler.gen(options2.template, void 0, {
                    path: options2.context.path,
                    templatePath: options2.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options2.template,
                    root: options2.context.root || result,
                    templateRoot: options2.context.templateRoot || options2.template
                  })
                );
                options2.context.path.pop();
                options2.context.templatePath.pop();
              } else {
                if (options2.rule.parameters[2]) {
                  options2.template.__order_index = options2.template.__order_index || 0;
                  options2.context.path.push(options2.name);
                  options2.context.templatePath.push(options2.name);
                  result = Handler.gen(options2.template, void 0, {
                    path: options2.context.path,
                    templatePath: options2.context.templatePath,
                    currentContext: result,
                    templateCurrentContext: options2.template,
                    root: options2.context.root || result,
                    templateRoot: options2.context.templateRoot || options2.template
                  })[options2.template.__order_index % options2.template.length];
                  options2.template.__order_index += +options2.rule.parameters[2];
                  options2.context.path.pop();
                  options2.context.templatePath.pop();
                } else {
                  for (i2 = 0; i2 < options2.rule.count; i2++) {
                    for (ii = 0; ii < options2.template.length; ii++) {
                      options2.context.path.push(result.length);
                      options2.context.templatePath.push(ii);
                      result.push(
                        Handler.gen(options2.template[ii], result.length, {
                          path: options2.context.path,
                          templatePath: options2.context.templatePath,
                          currentContext: result,
                          templateCurrentContext: options2.template,
                          root: options2.context.root || result,
                          templateRoot: options2.context.templateRoot || options2.template
                        })
                      );
                      options2.context.path.pop();
                      options2.context.templatePath.pop();
                    }
                  }
                }
              }
            }
            return result;
          },
          object: function(options2) {
            var result = {}, keys, fnKeys, key2, parsedKey, inc, i2;
            if (options2.rule.min != void 0) {
              keys = Util.keys(options2.template);
              keys = Random.shuffle(keys);
              keys = keys.slice(0, options2.rule.count);
              for (i2 = 0; i2 < keys.length; i2++) {
                key2 = keys[i2];
                parsedKey = key2.replace(Constant.RE_KEY, "$1");
                options2.context.path.push(parsedKey);
                options2.context.templatePath.push(key2);
                result[parsedKey] = Handler.gen(options2.template[key2], key2, {
                  path: options2.context.path,
                  templatePath: options2.context.templatePath,
                  currentContext: result,
                  templateCurrentContext: options2.template,
                  root: options2.context.root || result,
                  templateRoot: options2.context.templateRoot || options2.template
                });
                options2.context.path.pop();
                options2.context.templatePath.pop();
              }
            } else {
              keys = [];
              fnKeys = [];
              for (key2 in options2.template) {
                (typeof options2.template[key2] === "function" ? fnKeys : keys).push(key2);
              }
              keys = keys.concat(fnKeys);
              for (i2 = 0; i2 < keys.length; i2++) {
                key2 = keys[i2];
                parsedKey = key2.replace(Constant.RE_KEY, "$1");
                options2.context.path.push(parsedKey);
                options2.context.templatePath.push(key2);
                result[parsedKey] = Handler.gen(options2.template[key2], key2, {
                  path: options2.context.path,
                  templatePath: options2.context.templatePath,
                  currentContext: result,
                  templateCurrentContext: options2.template,
                  root: options2.context.root || result,
                  templateRoot: options2.context.templateRoot || options2.template
                });
                options2.context.path.pop();
                options2.context.templatePath.pop();
                inc = key2.match(Constant.RE_KEY);
                if (inc && inc[2] && Util.type(options2.template[key2]) === "number") {
                  options2.template[key2] += parseInt(inc[2], 10);
                }
              }
            }
            return result;
          },
          number: function(options2) {
            var result, parts2;
            if (options2.rule.decimal) {
              options2.template += "";
              parts2 = options2.template.split(".");
              parts2[0] = options2.rule.range ? options2.rule.count : parts2[0];
              parts2[1] = (parts2[1] || "").slice(0, options2.rule.dcount);
              while (parts2[1].length < options2.rule.dcount) {
                parts2[1] += parts2[1].length < options2.rule.dcount - 1 ? Random.character("number") : Random.character("123456789");
              }
              result = parseFloat(parts2.join("."), 10);
            } else {
              result = options2.rule.range && !options2.rule.parameters[2] ? options2.rule.count : options2.template;
            }
            return result;
          },
          boolean: function(options2) {
            var result;
            result = options2.rule.parameters ? Random.bool(options2.rule.min, options2.rule.max, options2.template) : options2.template;
            return result;
          },
          string: function(options2) {
            var result = "", i2, placeholders, ph, phed;
            if (options2.template.length) {
              if (options2.rule.count == void 0) {
                result += options2.template;
              }
              for (i2 = 0; i2 < options2.rule.count; i2++) {
                result += options2.template;
              }
              placeholders = result.match(Constant.RE_PLACEHOLDER) || [];
              for (i2 = 0; i2 < placeholders.length; i2++) {
                ph = placeholders[i2];
                if (/^\\/.test(ph)) {
                  placeholders.splice(i2--, 1);
                  continue;
                }
                phed = Handler.placeholder(ph, options2.context.currentContext, options2.context.templateCurrentContext, options2);
                if (placeholders.length === 1 && ph === result && typeof phed !== typeof result) {
                  result = phed;
                  break;
                }
                result = result.replace(ph, phed);
              }
            } else {
              result = options2.rule.range ? Random.string(options2.rule.count) : options2.template;
            }
            return result;
          },
          "function": function(options2) {
            return options2.template.call(options2.context.currentContext, options2);
          },
          "regexp": function(options2) {
            var source = "";
            if (options2.rule.count == void 0) {
              source += options2.template.source;
            }
            for (var i2 = 0; i2 < options2.rule.count; i2++) {
              source += options2.template.source;
            }
            return RE.Handler.gen(
              RE.Parser.parse(
                source
              )
            );
          }
        });
        Handler.extend({
          _all: function() {
            var re2 = {};
            for (var key2 in Random)
              re2[key2.toLowerCase()] = key2;
            return re2;
          },
          placeholder: function(placeholder, obj, templateContext, options) {
            Constant.RE_PLACEHOLDER.exec("");
            var parts = Constant.RE_PLACEHOLDER.exec(placeholder), key = parts && parts[1], lkey = key && key.toLowerCase(), okey = this._all()[lkey], params = parts && parts[2] || "";
            var pathParts = this.splitPathToArray(key);
            try {
              params = eval("(function(){ return [].splice.call(arguments, 0 ) })(" + params + ")");
            } catch (error) {
              params = parts[2].split(/,\s*/);
            }
            if (obj && key in obj)
              return obj[key];
            if (key.charAt(0) === "/" || pathParts.length > 1)
              return this.getValueByKeyPath(key, options);
            if (templateContext && typeof templateContext === "object" && key in templateContext && placeholder !== templateContext[key]) {
              templateContext[key] = Handler.gen(templateContext[key], key, {
                currentContext: obj,
                templateCurrentContext: templateContext
              });
              return templateContext[key];
            }
            if (!(key in Random) && !(lkey in Random) && !(okey in Random))
              return placeholder;
            for (var i = 0; i < params.length; i++) {
              Constant.RE_PLACEHOLDER.exec("");
              if (Constant.RE_PLACEHOLDER.test(params[i])) {
                params[i] = Handler.placeholder(params[i], obj, templateContext, options);
              }
            }
            var handle = Random[key] || Random[lkey] || Random[okey];
            switch (Util.type(handle)) {
              case "array":
                return Random.pick(handle);
              case "function":
                handle.options = options;
                var re = handle.apply(Random, params);
                if (re === void 0)
                  re = "";
                delete handle.options;
                return re;
            }
          },
          getValueByKeyPath: function(key2, options2) {
            var originalKey = key2;
            var keyPathParts = this.splitPathToArray(key2);
            var absolutePathParts = [];
            if (key2.charAt(0) === "/") {
              absolutePathParts = [options2.context.path[0]].concat(
                this.normalizePath(keyPathParts)
              );
            } else {
              if (keyPathParts.length > 1) {
                absolutePathParts = options2.context.path.slice(0);
                absolutePathParts.pop();
                absolutePathParts = this.normalizePath(
                  absolutePathParts.concat(keyPathParts)
                );
              }
            }
            try {
              key2 = keyPathParts[keyPathParts.length - 1];
              var currentContext = options2.context.root;
              var templateCurrentContext = options2.context.templateRoot;
              for (var i2 = 1; i2 < absolutePathParts.length - 1; i2++) {
                currentContext = currentContext[absolutePathParts[i2]];
                templateCurrentContext = templateCurrentContext[absolutePathParts[i2]];
              }
              if (currentContext && key2 in currentContext)
                return currentContext[key2];
              if (templateCurrentContext && typeof templateCurrentContext === "object" && key2 in templateCurrentContext && originalKey !== templateCurrentContext[key2]) {
                templateCurrentContext[key2] = Handler.gen(templateCurrentContext[key2], key2, {
                  currentContext,
                  templateCurrentContext
                });
                return templateCurrentContext[key2];
              }
            } catch (err) {
            }
            return "@" + keyPathParts.join("/");
          },
          normalizePath: function(pathParts2) {
            var newPathParts = [];
            for (var i2 = 0; i2 < pathParts2.length; i2++) {
              switch (pathParts2[i2]) {
                case "..":
                  newPathParts.pop();
                  break;
                case ".":
                  break;
                default:
                  newPathParts.push(pathParts2[i2]);
              }
            }
            return newPathParts;
          },
          splitPathToArray: function(path) {
            var parts2 = path.split(/\/+/);
            if (!parts2[parts2.length - 1])
              parts2 = parts2.slice(0, -1);
            if (!parts2[0])
              parts2 = parts2.slice(1);
            return parts2;
          }
        });
        module.exports = Handler;
      },
      function(module2, exports2) {
        module2.exports = {
          GUID: 1,
          RE_KEY: /(.+)\|(?:\+(\d+)|([\+\-]?\d+-?[\+\-]?\d*)?(?:\.(\d+-?\d*))?)/,
          RE_RANGE: /([\+\-]?\d+)-?([\+\-]?\d+)?/,
          RE_PLACEHOLDER: /\\*@([^@#%&()\?\s]+)(?:\((.*?)\))?/g
        };
      },
      function(module2, exports2) {
        var Util2 = {};
        Util2.extend = function extend2() {
          var target = arguments[0] || {}, i2 = 1, length = arguments.length, options2, name, src, copy, clone2;
          if (length === 1) {
            target = this;
            i2 = 0;
          }
          for (; i2 < length; i2++) {
            options2 = arguments[i2];
            if (!options2)
              continue;
            for (name in options2) {
              src = target[name];
              copy = options2[name];
              if (target === copy)
                continue;
              if (copy === void 0)
                continue;
              if (Util2.isArray(copy) || Util2.isObject(copy)) {
                if (Util2.isArray(copy))
                  clone2 = src && Util2.isArray(src) ? src : [];
                if (Util2.isObject(copy))
                  clone2 = src && Util2.isObject(src) ? src : {};
                target[name] = Util2.extend(clone2, copy);
              } else {
                target[name] = copy;
              }
            }
          }
          return target;
        };
        Util2.each = function each(obj2, iterator, context) {
          var i2, key2;
          if (this.type(obj2) === "number") {
            for (i2 = 0; i2 < obj2; i2++) {
              iterator(i2, i2);
            }
          } else if (obj2.length === +obj2.length) {
            for (i2 = 0; i2 < obj2.length; i2++) {
              if (iterator.call(context, obj2[i2], i2, obj2) === false)
                break;
            }
          } else {
            for (key2 in obj2) {
              if (iterator.call(context, obj2[key2], key2, obj2) === false)
                break;
            }
          }
        };
        Util2.type = function type(obj2) {
          return obj2 === null || obj2 === void 0 ? String(obj2) : Object.prototype.toString.call(obj2).match(/\[object (\w+)\]/)[1].toLowerCase();
        };
        Util2.each("String Object Array RegExp Function".split(" "), function(value) {
          Util2["is" + value] = function(obj2) {
            return Util2.type(obj2) === value.toLowerCase();
          };
        });
        Util2.isObjectOrArray = function(value) {
          return Util2.isObject(value) || Util2.isArray(value);
        };
        Util2.isNumeric = function(value) {
          return !isNaN(parseFloat(value)) && isFinite(value);
        };
        Util2.keys = function(obj2) {
          var keys = [];
          for (var key2 in obj2) {
            if (obj2.hasOwnProperty(key2))
              keys.push(key2);
          }
          return keys;
        };
        Util2.values = function(obj2) {
          var values = [];
          for (var key2 in obj2) {
            if (obj2.hasOwnProperty(key2))
              values.push(obj2[key2]);
          }
          return values;
        };
        Util2.heredoc = function heredoc(fn) {
          return fn.toString().replace(/^[^\/]+\/\*!?/, "").replace(/\*\/[^\/]+$/, "").replace(/^[\s\xA0]+/, "").replace(/[\s\xA0]+$/, "");
        };
        Util2.noop = function() {
        };
        module2.exports = Util2;
      },
      function(module2, exports2, __webpack_require__2) {
        var Constant2 = __webpack_require__2(2);
        var Random2 = __webpack_require__2(5);
        module2.exports = {
          parse: function(name) {
            name = name == void 0 ? "" : name + "";
            var parameters = (name || "").match(Constant2.RE_KEY);
            var range = parameters && parameters[3] && parameters[3].match(Constant2.RE_RANGE);
            var min = range && range[1] && parseInt(range[1], 10);
            var max = range && range[2] && parseInt(range[2], 10);
            var count = range ? !range[2] ? parseInt(range[1], 10) : Random2.integer(min, max) : void 0;
            var decimal = parameters && parameters[4] && parameters[4].match(Constant2.RE_RANGE);
            var dmin = decimal && decimal[1] && parseInt(decimal[1], 10);
            var dmax = decimal && decimal[2] && parseInt(decimal[2], 10);
            var dcount = decimal ? !decimal[2] && parseInt(decimal[1], 10) || Random2.integer(dmin, dmax) : void 0;
            var result = {
              parameters,
              range,
              min,
              max,
              count,
              decimal,
              dmin,
              dmax,
              dcount
            };
            for (var r2 in result) {
              if (result[r2] != void 0)
                return result;
            }
            return {};
          }
        };
      },
      function(module2, exports2, __webpack_require__2) {
        var Util2 = __webpack_require__2(3);
        var Random2 = {
          extend: Util2.extend
        };
        Random2.extend(__webpack_require__2(6));
        Random2.extend(__webpack_require__2(7));
        Random2.extend(__webpack_require__2(8));
        Random2.extend(__webpack_require__2(10));
        Random2.extend(__webpack_require__2(13));
        Random2.extend(__webpack_require__2(15));
        Random2.extend(__webpack_require__2(16));
        Random2.extend(__webpack_require__2(17));
        Random2.extend(__webpack_require__2(14));
        Random2.extend(__webpack_require__2(19));
        module2.exports = Random2;
      },
      function(module2, exports2) {
        module2.exports = {
          boolean: function(min, max, cur) {
            if (cur !== void 0) {
              min = typeof min !== "undefined" && !isNaN(min) ? parseInt(min, 10) : 1;
              max = typeof max !== "undefined" && !isNaN(max) ? parseInt(max, 10) : 1;
              return Math.random() > 1 / (min + max) * min ? !cur : cur;
            }
            return Math.random() >= 0.5;
          },
          bool: function(min, max, cur) {
            return this.boolean(min, max, cur);
          },
          natural: function(min, max) {
            min = typeof min !== "undefined" ? parseInt(min, 10) : 0;
            max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
            return Math.round(Math.random() * (max - min)) + min;
          },
          integer: function(min, max) {
            min = typeof min !== "undefined" ? parseInt(min, 10) : -9007199254740992;
            max = typeof max !== "undefined" ? parseInt(max, 10) : 9007199254740992;
            return Math.round(Math.random() * (max - min)) + min;
          },
          int: function(min, max) {
            return this.integer(min, max);
          },
          float: function(min, max, dmin, dmax) {
            dmin = dmin === void 0 ? 0 : dmin;
            dmin = Math.max(Math.min(dmin, 17), 0);
            dmax = dmax === void 0 ? 17 : dmax;
            dmax = Math.max(Math.min(dmax, 17), 0);
            var ret = this.integer(min, max) + ".";
            for (var i2 = 0, dcount = this.natural(dmin, dmax); i2 < dcount; i2++) {
              ret += i2 < dcount - 1 ? this.character("number") : this.character("123456789");
            }
            return parseFloat(ret, 10);
          },
          character: function(pool) {
            var pools = {
              lower: "abcdefghijklmnopqrstuvwxyz",
              upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
              number: "0123456789",
              symbol: "!@#$%^&*()[]"
            };
            pools.alpha = pools.lower + pools.upper;
            pools["undefined"] = pools.lower + pools.upper + pools.number + pools.symbol;
            pool = pools[("" + pool).toLowerCase()] || pool;
            return pool.charAt(this.natural(0, pool.length - 1));
          },
          char: function(pool) {
            return this.character(pool);
          },
          string: function(pool, min, max) {
            var len;
            switch (arguments.length) {
              case 0:
                len = this.natural(3, 7);
                break;
              case 1:
                len = pool;
                pool = void 0;
                break;
              case 2:
                if (typeof arguments[0] === "string") {
                  len = min;
                } else {
                  len = this.natural(pool, min);
                  pool = void 0;
                }
                break;
              case 3:
                len = this.natural(min, max);
                break;
            }
            var text = "";
            for (var i2 = 0; i2 < len; i2++) {
              text += this.character(pool);
            }
            return text;
          },
          str: function() {
            return this.string.apply(this, arguments);
          },
          range: function(start, stop, step) {
            if (arguments.length <= 1) {
              stop = start || 0;
              start = 0;
            }
            step = arguments[2] || 1;
            start = +start;
            stop = +stop;
            step = +step;
            var len = Math.max(Math.ceil((stop - start) / step), 0);
            var idx = 0;
            var range = new Array(len);
            while (idx < len) {
              range[idx++] = start;
              start += step;
            }
            return range;
          }
        };
      },
      function(module2, exports2) {
        var patternLetters = {
          yyyy: "getFullYear",
          yy: function(date) {
            return ("" + date.getFullYear()).slice(2);
          },
          y: "yy",
          MM: function(date) {
            var m2 = date.getMonth() + 1;
            return m2 < 10 ? "0" + m2 : m2;
          },
          M: function(date) {
            return date.getMonth() + 1;
          },
          dd: function(date) {
            var d2 = date.getDate();
            return d2 < 10 ? "0" + d2 : d2;
          },
          d: "getDate",
          HH: function(date) {
            var h2 = date.getHours();
            return h2 < 10 ? "0" + h2 : h2;
          },
          H: "getHours",
          hh: function(date) {
            var h2 = date.getHours() % 12;
            return h2 < 10 ? "0" + h2 : h2;
          },
          h: function(date) {
            return date.getHours() % 12;
          },
          mm: function(date) {
            var m2 = date.getMinutes();
            return m2 < 10 ? "0" + m2 : m2;
          },
          m: "getMinutes",
          ss: function(date) {
            var s2 = date.getSeconds();
            return s2 < 10 ? "0" + s2 : s2;
          },
          s: "getSeconds",
          SS: function(date) {
            var ms = date.getMilliseconds();
            return ms < 10 && "00" + ms || ms < 100 && "0" + ms || ms;
          },
          S: "getMilliseconds",
          A: function(date) {
            return date.getHours() < 12 ? "AM" : "PM";
          },
          a: function(date) {
            return date.getHours() < 12 ? "am" : "pm";
          },
          T: "getTime"
        };
        module2.exports = {
          _patternLetters: patternLetters,
          _rformat: new RegExp(function() {
            var re2 = [];
            for (var i2 in patternLetters)
              re2.push(i2);
            return "(" + re2.join("|") + ")";
          }(), "g"),
          _formatDate: function(date, format) {
            return format.replace(this._rformat, function creatNewSubString($0, flag) {
              return typeof patternLetters[flag] === "function" ? patternLetters[flag](date) : patternLetters[flag] in patternLetters ? creatNewSubString($0, patternLetters[flag]) : date[patternLetters[flag]]();
            });
          },
          _randomDate: function(min, max) {
            min = min === void 0 ? new Date(0) : min;
            max = max === void 0 ? new Date() : max;
            return new Date(Math.random() * (max.getTime() - min.getTime()));
          },
          date: function(format) {
            format = format || "yyyy-MM-dd";
            return this._formatDate(this._randomDate(), format);
          },
          time: function(format) {
            format = format || "HH:mm:ss";
            return this._formatDate(this._randomDate(), format);
          },
          datetime: function(format) {
            format = format || "yyyy-MM-dd HH:mm:ss";
            return this._formatDate(this._randomDate(), format);
          },
          now: function(unit, format) {
            if (arguments.length === 1) {
              if (!/year|month|day|hour|minute|second|week/.test(unit)) {
                format = unit;
                unit = "";
              }
            }
            unit = (unit || "").toLowerCase();
            format = format || "yyyy-MM-dd HH:mm:ss";
            var date = new Date();
            switch (unit) {
              case "year":
                date.setMonth(0);
              case "month":
                date.setDate(1);
              case "week":
              case "day":
                date.setHours(0);
              case "hour":
                date.setMinutes(0);
              case "minute":
                date.setSeconds(0);
              case "second":
                date.setMilliseconds(0);
            }
            switch (unit) {
              case "week":
                date.setDate(date.getDate() - date.getDay());
            }
            return this._formatDate(date, format);
          }
        };
      },
      function(module2, exports2, __webpack_require__2) {
        (function(module3) {
          module3.exports = {
            _adSize: [
              "300x250",
              "250x250",
              "240x400",
              "336x280",
              "180x150",
              "720x300",
              "468x60",
              "234x60",
              "88x31",
              "120x90",
              "120x60",
              "120x240",
              "125x125",
              "728x90",
              "160x600",
              "120x600",
              "300x600"
            ],
            _screenSize: [
              "320x200",
              "320x240",
              "640x480",
              "800x480",
              "800x480",
              "1024x600",
              "1024x768",
              "1280x800",
              "1440x900",
              "1920x1200",
              "2560x1600"
            ],
            _videoSize: ["720x480", "768x576", "1280x720", "1920x1080"],
            image: function(size2, background, foreground, format, text) {
              if (arguments.length === 4) {
                text = format;
                format = void 0;
              }
              if (arguments.length === 3) {
                text = foreground;
                foreground = void 0;
              }
              if (!size2)
                size2 = this.pick(this._adSize);
              if (background && ~background.indexOf("#"))
                background = background.slice(1);
              if (foreground && ~foreground.indexOf("#"))
                foreground = foreground.slice(1);
              return "http://dummyimage.com/" + size2 + (background ? "/" + background : "") + (foreground ? "/" + foreground : "") + (format ? "." + format : "") + (text ? "&text=" + text : "");
            },
            img: function() {
              return this.image.apply(this, arguments);
            },
            _brandColors: {
              "4ormat": "#fb0a2a",
              "500px": "#02adea",
              "About.me (blue)": "#00405d",
              "About.me (yellow)": "#ffcc33",
              "Addvocate": "#ff6138",
              "Adobe": "#ff0000",
              "Aim": "#fcd20b",
              "Amazon": "#e47911",
              "Android": "#a4c639",
              "Angie's List": "#7fbb00",
              "AOL": "#0060a3",
              "Atlassian": "#003366",
              "Behance": "#053eff",
              "Big Cartel": "#97b538",
              "bitly": "#ee6123",
              "Blogger": "#fc4f08",
              "Boeing": "#0039a6",
              "Booking.com": "#003580",
              "Carbonmade": "#613854",
              "Cheddar": "#ff7243",
              "Code School": "#3d4944",
              "Delicious": "#205cc0",
              "Dell": "#3287c1",
              "Designmoo": "#e54a4f",
              "Deviantart": "#4e6252",
              "Designer News": "#2d72da",
              "Devour": "#fd0001",
              "DEWALT": "#febd17",
              "Disqus (blue)": "#59a3fc",
              "Disqus (orange)": "#db7132",
              "Dribbble": "#ea4c89",
              "Dropbox": "#3d9ae8",
              "Drupal": "#0c76ab",
              "Dunked": "#2a323a",
              "eBay": "#89c507",
              "Ember": "#f05e1b",
              "Engadget": "#00bdf6",
              "Envato": "#528036",
              "Etsy": "#eb6d20",
              "Evernote": "#5ba525",
              "Fab.com": "#dd0017",
              "Facebook": "#3b5998",
              "Firefox": "#e66000",
              "Flickr (blue)": "#0063dc",
              "Flickr (pink)": "#ff0084",
              "Forrst": "#5b9a68",
              "Foursquare": "#25a0ca",
              "Garmin": "#007cc3",
              "GetGlue": "#2d75a2",
              "Gimmebar": "#f70078",
              "GitHub": "#171515",
              "Google Blue": "#0140ca",
              "Google Green": "#16a61e",
              "Google Red": "#dd1812",
              "Google Yellow": "#fcca03",
              "Google+": "#dd4b39",
              "Grooveshark": "#f77f00",
              "Groupon": "#82b548",
              "Hacker News": "#ff6600",
              "HelloWallet": "#0085ca",
              "Heroku (light)": "#c7c5e6",
              "Heroku (dark)": "#6567a5",
              "HootSuite": "#003366",
              "Houzz": "#73ba37",
              "HTML5": "#ec6231",
              "IKEA": "#ffcc33",
              "IMDb": "#f3ce13",
              "Instagram": "#3f729b",
              "Intel": "#0071c5",
              "Intuit": "#365ebf",
              "Kickstarter": "#76cc1e",
              "kippt": "#e03500",
              "Kodery": "#00af81",
              "LastFM": "#c3000d",
              "LinkedIn": "#0e76a8",
              "Livestream": "#cf0005",
              "Lumo": "#576396",
              "Mixpanel": "#a086d3",
              "Meetup": "#e51937",
              "Nokia": "#183693",
              "NVIDIA": "#76b900",
              "Opera": "#cc0f16",
              "Path": "#e41f11",
              "PayPal (dark)": "#1e477a",
              "PayPal (light)": "#3b7bbf",
              "Pinboard": "#0000e6",
              "Pinterest": "#c8232c",
              "PlayStation": "#665cbe",
              "Pocket": "#ee4056",
              "Prezi": "#318bff",
              "Pusha": "#0f71b4",
              "Quora": "#a82400",
              "QUOTE.fm": "#66ceff",
              "Rdio": "#008fd5",
              "Readability": "#9c0000",
              "Red Hat": "#cc0000",
              "Resource": "#7eb400",
              "Rockpack": "#0ba6ab",
              "Roon": "#62b0d9",
              "RSS": "#ee802f",
              "Salesforce": "#1798c1",
              "Samsung": "#0c4da2",
              "Shopify": "#96bf48",
              "Skype": "#00aff0",
              "Snagajob": "#f47a20",
              "Softonic": "#008ace",
              "SoundCloud": "#ff7700",
              "Space Box": "#f86960",
              "Spotify": "#81b71a",
              "Sprint": "#fee100",
              "Squarespace": "#121212",
              "StackOverflow": "#ef8236",
              "Staples": "#cc0000",
              "Status Chart": "#d7584f",
              "Stripe": "#008cdd",
              "StudyBlue": "#00afe1",
              "StumbleUpon": "#f74425",
              "T-Mobile": "#ea0a8e",
              "Technorati": "#40a800",
              "The Next Web": "#ef4423",
              "Treehouse": "#5cb868",
              "Trulia": "#5eab1f",
              "Tumblr": "#34526f",
              "Twitch.tv": "#6441a5",
              "Twitter": "#00acee",
              "TYPO3": "#ff8700",
              "Ubuntu": "#dd4814",
              "Ustream": "#3388ff",
              "Verizon": "#ef1d1d",
              "Vimeo": "#86c9ef",
              "Vine": "#00a478",
              "Virb": "#06afd8",
              "Virgin Media": "#cc0000",
              "Wooga": "#5b009c",
              "WordPress (blue)": "#21759b",
              "WordPress (orange)": "#d54e21",
              "WordPress (grey)": "#464646",
              "Wunderlist": "#2b88d9",
              "XBOX": "#9bc848",
              "XING": "#126567",
              "Yahoo!": "#720e9e",
              "Yandex": "#ffcc00",
              "Yelp": "#c41200",
              "YouTube": "#c4302b",
              "Zalongo": "#5498dc",
              "Zendesk": "#78a300",
              "Zerply": "#9dcc7a",
              "Zootool": "#5e8b1d"
            },
            _brandNames: function() {
              var brands = [];
              for (var b2 in this._brandColors) {
                brands.push(b2);
              }
              return brands;
            },
            dataImage: function(size2, text) {
              var canvas;
              if (typeof document !== "undefined") {
                canvas = document.createElement("canvas");
              } else {
                var Canvas = module3.require("canvas");
                canvas = new Canvas();
              }
              var ctx = canvas && canvas.getContext && canvas.getContext("2d");
              if (!canvas || !ctx)
                return "";
              if (!size2)
                size2 = this.pick(this._adSize);
              text = text !== void 0 ? text : size2;
              size2 = size2.split("x");
              var width = parseInt(size2[0], 10), height = parseInt(size2[1], 10), background = this._brandColors[this.pick(this._brandNames())], foreground = "#FFF", text_height = 14, font = "sans-serif";
              canvas.width = width;
              canvas.height = height;
              ctx.textAlign = "center";
              ctx.textBaseline = "middle";
              ctx.fillStyle = background;
              ctx.fillRect(0, 0, width, height);
              ctx.fillStyle = foreground;
              ctx.font = "bold " + text_height + "px " + font;
              ctx.fillText(text, width / 2, height / 2, width);
              return canvas.toDataURL("image/png");
            }
          };
        }).call(exports2, __webpack_require__2(9)(module2));
      },
      function(module2, exports2) {
        module2.exports = function(module3) {
          if (!module3.webpackPolyfill) {
            module3.deprecate = function() {
            };
            module3.paths = [];
            module3.children = [];
            module3.webpackPolyfill = 1;
          }
          return module3;
        };
      },
      function(module2, exports2, __webpack_require__2) {
        var Convert = __webpack_require__2(11);
        var DICT = __webpack_require__2(12);
        module2.exports = {
          color: function(name) {
            if (name || DICT[name])
              return DICT[name].nicer;
            return this.hex();
          },
          hex: function() {
            var hsv = this._goldenRatioColor();
            var rgb = Convert.hsv2rgb(hsv);
            var hex = Convert.rgb2hex(rgb[0], rgb[1], rgb[2]);
            return hex;
          },
          rgb: function() {
            var hsv = this._goldenRatioColor();
            var rgb = Convert.hsv2rgb(hsv);
            return "rgb(" + parseInt(rgb[0], 10) + ", " + parseInt(rgb[1], 10) + ", " + parseInt(rgb[2], 10) + ")";
          },
          rgba: function() {
            var hsv = this._goldenRatioColor();
            var rgb = Convert.hsv2rgb(hsv);
            return "rgba(" + parseInt(rgb[0], 10) + ", " + parseInt(rgb[1], 10) + ", " + parseInt(rgb[2], 10) + ", " + Math.random().toFixed(2) + ")";
          },
          hsl: function() {
            var hsv = this._goldenRatioColor();
            var hsl = Convert.hsv2hsl(hsv);
            return "hsl(" + parseInt(hsl[0], 10) + ", " + parseInt(hsl[1], 10) + ", " + parseInt(hsl[2], 10) + ")";
          },
          _goldenRatioColor: function(saturation, value) {
            this._goldenRatio = 0.618033988749895;
            this._hue = this._hue || Math.random();
            this._hue += this._goldenRatio;
            this._hue %= 1;
            if (typeof saturation !== "number")
              saturation = 0.5;
            if (typeof value !== "number")
              value = 0.95;
            return [
              this._hue * 360,
              saturation * 100,
              value * 100
            ];
          }
        };
      },
      function(module2, exports2) {
        module2.exports = {
          rgb2hsl: function rgb2hsl(rgb) {
            var r2 = rgb[0] / 255, g2 = rgb[1] / 255, b2 = rgb[2] / 255, min = Math.min(r2, g2, b2), max = Math.max(r2, g2, b2), delta = max - min, h2, s2, l2;
            if (max == min)
              h2 = 0;
            else if (r2 == max)
              h2 = (g2 - b2) / delta;
            else if (g2 == max)
              h2 = 2 + (b2 - r2) / delta;
            else if (b2 == max)
              h2 = 4 + (r2 - g2) / delta;
            h2 = Math.min(h2 * 60, 360);
            if (h2 < 0)
              h2 += 360;
            l2 = (min + max) / 2;
            if (max == min)
              s2 = 0;
            else if (l2 <= 0.5)
              s2 = delta / (max + min);
            else
              s2 = delta / (2 - max - min);
            return [h2, s2 * 100, l2 * 100];
          },
          rgb2hsv: function rgb2hsv(rgb) {
            var r2 = rgb[0], g2 = rgb[1], b2 = rgb[2], min = Math.min(r2, g2, b2), max = Math.max(r2, g2, b2), delta = max - min, h2, s2, v2;
            if (max === 0)
              s2 = 0;
            else
              s2 = delta / max * 1e3 / 10;
            if (max == min)
              h2 = 0;
            else if (r2 == max)
              h2 = (g2 - b2) / delta;
            else if (g2 == max)
              h2 = 2 + (b2 - r2) / delta;
            else if (b2 == max)
              h2 = 4 + (r2 - g2) / delta;
            h2 = Math.min(h2 * 60, 360);
            if (h2 < 0)
              h2 += 360;
            v2 = max / 255 * 1e3 / 10;
            return [h2, s2, v2];
          },
          hsl2rgb: function hsl2rgb(hsl) {
            var h2 = hsl[0] / 360, s2 = hsl[1] / 100, l2 = hsl[2] / 100, t1, t2, t3, rgb, val;
            if (s2 === 0) {
              val = l2 * 255;
              return [val, val, val];
            }
            if (l2 < 0.5)
              t2 = l2 * (1 + s2);
            else
              t2 = l2 + s2 - l2 * s2;
            t1 = 2 * l2 - t2;
            rgb = [0, 0, 0];
            for (var i2 = 0; i2 < 3; i2++) {
              t3 = h2 + 1 / 3 * -(i2 - 1);
              if (t3 < 0)
                t3++;
              if (t3 > 1)
                t3--;
              if (6 * t3 < 1)
                val = t1 + (t2 - t1) * 6 * t3;
              else if (2 * t3 < 1)
                val = t2;
              else if (3 * t3 < 2)
                val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
              else
                val = t1;
              rgb[i2] = val * 255;
            }
            return rgb;
          },
          hsl2hsv: function hsl2hsv(hsl) {
            var h2 = hsl[0], s2 = hsl[1] / 100, l2 = hsl[2] / 100, sv, v2;
            l2 *= 2;
            s2 *= l2 <= 1 ? l2 : 2 - l2;
            v2 = (l2 + s2) / 2;
            sv = 2 * s2 / (l2 + s2);
            return [h2, sv * 100, v2 * 100];
          },
          hsv2rgb: function hsv2rgb(hsv) {
            var h2 = hsv[0] / 60;
            var s2 = hsv[1] / 100;
            var v2 = hsv[2] / 100;
            var hi = Math.floor(h2) % 6;
            var f2 = h2 - Math.floor(h2);
            var p2 = 255 * v2 * (1 - s2);
            var q2 = 255 * v2 * (1 - s2 * f2);
            var t2 = 255 * v2 * (1 - s2 * (1 - f2));
            v2 = 255 * v2;
            switch (hi) {
              case 0:
                return [v2, t2, p2];
              case 1:
                return [q2, v2, p2];
              case 2:
                return [p2, v2, t2];
              case 3:
                return [p2, q2, v2];
              case 4:
                return [t2, p2, v2];
              case 5:
                return [v2, p2, q2];
            }
          },
          hsv2hsl: function hsv2hsl(hsv) {
            var h2 = hsv[0], s2 = hsv[1] / 100, v2 = hsv[2] / 100, sl, l2;
            l2 = (2 - s2) * v2;
            sl = s2 * v2;
            sl /= l2 <= 1 ? l2 : 2 - l2;
            l2 /= 2;
            return [h2, sl * 100, l2 * 100];
          },
          rgb2hex: function(a2, b2, c2) {
            return "#" + ((256 + a2 << 8 | b2) << 8 | c2).toString(16).slice(1);
          },
          hex2rgb: function(a2) {
            a2 = "0x" + a2.slice(1).replace(a2.length > 4 ? a2 : /./g, "$&$&") | 0;
            return [a2 >> 16, a2 >> 8 & 255, a2 & 255];
          }
        };
      },
      function(module2, exports2) {
        module2.exports = {
          navy: {
            value: "#000080",
            nicer: "#001F3F"
          },
          blue: {
            value: "#0000ff",
            nicer: "#0074D9"
          },
          aqua: {
            value: "#00ffff",
            nicer: "#7FDBFF"
          },
          teal: {
            value: "#008080",
            nicer: "#39CCCC"
          },
          olive: {
            value: "#008000",
            nicer: "#3D9970"
          },
          green: {
            value: "#008000",
            nicer: "#2ECC40"
          },
          lime: {
            value: "#00ff00",
            nicer: "#01FF70"
          },
          yellow: {
            value: "#ffff00",
            nicer: "#FFDC00"
          },
          orange: {
            value: "#ffa500",
            nicer: "#FF851B"
          },
          red: {
            value: "#ff0000",
            nicer: "#FF4136"
          },
          maroon: {
            value: "#800000",
            nicer: "#85144B"
          },
          fuchsia: {
            value: "#ff00ff",
            nicer: "#F012BE"
          },
          purple: {
            value: "#800080",
            nicer: "#B10DC9"
          },
          silver: {
            value: "#c0c0c0",
            nicer: "#DDDDDD"
          },
          gray: {
            value: "#808080",
            nicer: "#AAAAAA"
          },
          black: {
            value: "#000000",
            nicer: "#111111"
          },
          white: {
            value: "#FFFFFF",
            nicer: "#FFFFFF"
          }
        };
      },
      function(module2, exports2, __webpack_require__2) {
        var Basic = __webpack_require__2(6);
        var Helper = __webpack_require__2(14);
        function range(defaultMin, defaultMax, min, max) {
          return min === void 0 ? Basic.natural(defaultMin, defaultMax) : max === void 0 ? min : Basic.natural(parseInt(min, 10), parseInt(max, 10));
        }
        module2.exports = {
          paragraph: function(min, max) {
            var len = range(3, 7, min, max);
            var result = [];
            for (var i2 = 0; i2 < len; i2++) {
              result.push(this.sentence());
            }
            return result.join(" ");
          },
          cparagraph: function(min, max) {
            var len = range(3, 7, min, max);
            var result = [];
            for (var i2 = 0; i2 < len; i2++) {
              result.push(this.csentence());
            }
            return result.join("");
          },
          sentence: function(min, max) {
            var len = range(12, 18, min, max);
            var result = [];
            for (var i2 = 0; i2 < len; i2++) {
              result.push(this.word());
            }
            return Helper.capitalize(result.join(" ")) + ".";
          },
          csentence: function(min, max) {
            var len = range(12, 18, min, max);
            var result = [];
            for (var i2 = 0; i2 < len; i2++) {
              result.push(this.cword());
            }
            return result.join("") + "\u3002";
          },
          word: function(min, max) {
            var len = range(3, 10, min, max);
            var result = "";
            for (var i2 = 0; i2 < len; i2++) {
              result += Basic.character("lower");
            }
            return result;
          },
          cword: function(pool, min, max) {
            var DICT_KANZI = "\u7684\u4E00\u662F\u5728\u4E0D\u4E86\u6709\u548C\u4EBA\u8FD9\u4E2D\u5927\u4E3A\u4E0A\u4E2A\u56FD\u6211\u4EE5\u8981\u4ED6\u65F6\u6765\u7528\u4EEC\u751F\u5230\u4F5C\u5730\u4E8E\u51FA\u5C31\u5206\u5BF9\u6210\u4F1A\u53EF\u4E3B\u53D1\u5E74\u52A8\u540C\u5DE5\u4E5F\u80FD\u4E0B\u8FC7\u5B50\u8BF4\u4EA7\u79CD\u9762\u800C\u65B9\u540E\u591A\u5B9A\u884C\u5B66\u6CD5\u6240\u6C11\u5F97\u7ECF\u5341\u4E09\u4E4B\u8FDB\u7740\u7B49\u90E8\u5EA6\u5BB6\u7535\u529B\u91CC\u5982\u6C34\u5316\u9AD8\u81EA\u4E8C\u7406\u8D77\u5C0F\u7269\u73B0\u5B9E\u52A0\u91CF\u90FD\u4E24\u4F53\u5236\u673A\u5F53\u4F7F\u70B9\u4ECE\u4E1A\u672C\u53BB\u628A\u6027\u597D\u5E94\u5F00\u5B83\u5408\u8FD8\u56E0\u7531\u5176\u4E9B\u7136\u524D\u5916\u5929\u653F\u56DB\u65E5\u90A3\u793E\u4E49\u4E8B\u5E73\u5F62\u76F8\u5168\u8868\u95F4\u6837\u4E0E\u5173\u5404\u91CD\u65B0\u7EBF\u5185\u6570\u6B63\u5FC3\u53CD\u4F60\u660E\u770B\u539F\u53C8\u4E48\u5229\u6BD4\u6216\u4F46\u8D28\u6C14\u7B2C\u5411\u9053\u547D\u6B64\u53D8\u6761\u53EA\u6CA1\u7ED3\u89E3\u95EE\u610F\u5EFA\u6708\u516C\u65E0\u7CFB\u519B\u5F88\u60C5\u8005\u6700\u7ACB\u4EE3\u60F3\u5DF2\u901A\u5E76\u63D0\u76F4\u9898\u515A\u7A0B\u5C55\u4E94\u679C\u6599\u8C61\u5458\u9769\u4F4D\u5165\u5E38\u6587\u603B\u6B21\u54C1\u5F0F\u6D3B\u8BBE\u53CA\u7BA1\u7279\u4EF6\u957F\u6C42\u8001\u5934\u57FA\u8D44\u8FB9\u6D41\u8DEF\u7EA7\u5C11\u56FE\u5C71\u7EDF\u63A5\u77E5\u8F83\u5C06\u7EC4\u89C1\u8BA1\u522B\u5979\u624B\u89D2\u671F\u6839\u8BBA\u8FD0\u519C\u6307\u51E0\u4E5D\u533A\u5F3A\u653E\u51B3\u897F\u88AB\u5E72\u505A\u5FC5\u6218\u5148\u56DE\u5219\u4EFB\u53D6\u636E\u5904\u961F\u5357\u7ED9\u8272\u5149\u95E8\u5373\u4FDD\u6CBB\u5317\u9020\u767E\u89C4\u70ED\u9886\u4E03\u6D77\u53E3\u4E1C\u5BFC\u5668\u538B\u5FD7\u4E16\u91D1\u589E\u4E89\u6D4E\u9636\u6CB9\u601D\u672F\u6781\u4EA4\u53D7\u8054\u4EC0\u8BA4\u516D\u5171\u6743\u6536\u8BC1\u6539\u6E05\u5DF1\u7F8E\u518D\u91C7\u8F6C\u66F4\u5355\u98CE\u5207\u6253\u767D\u6559\u901F\u82B1\u5E26\u5B89\u573A\u8EAB\u8F66\u4F8B\u771F\u52A1\u5177\u4E07\u6BCF\u76EE\u81F3\u8FBE\u8D70\u79EF\u793A\u8BAE\u58F0\u62A5\u6597\u5B8C\u7C7B\u516B\u79BB\u534E\u540D\u786E\u624D\u79D1\u5F20\u4FE1\u9A6C\u8282\u8BDD\u7C73\u6574\u7A7A\u5143\u51B5\u4ECA\u96C6\u6E29\u4F20\u571F\u8BB8\u6B65\u7FA4\u5E7F\u77F3\u8BB0\u9700\u6BB5\u7814\u754C\u62C9\u6797\u5F8B\u53EB\u4E14\u7A76\u89C2\u8D8A\u7EC7\u88C5\u5F71\u7B97\u4F4E\u6301\u97F3\u4F17\u4E66\u5E03\u590D\u5BB9\u513F\u987B\u9645\u5546\u975E\u9A8C\u8FDE\u65AD\u6DF1\u96BE\u8FD1\u77FF\u5343\u5468\u59D4\u7D20\u6280\u5907\u534A\u529E\u9752\u7701\u5217\u4E60\u54CD\u7EA6\u652F\u822C\u53F2\u611F\u52B3\u4FBF\u56E2\u5F80\u9178\u5386\u5E02\u514B\u4F55\u9664\u6D88\u6784\u5E9C\u79F0\u592A\u51C6\u7CBE\u503C\u53F7\u7387\u65CF\u7EF4\u5212\u9009\u6807\u5199\u5B58\u5019\u6BDB\u4EB2\u5FEB\u6548\u65AF\u9662\u67E5\u6C5F\u578B\u773C\u738B\u6309\u683C\u517B\u6613\u7F6E\u6D3E\u5C42\u7247\u59CB\u5374\u4E13\u72B6\u80B2\u5382\u4EAC\u8BC6\u9002\u5C5E\u5706\u5305\u706B\u4F4F\u8C03\u6EE1\u53BF\u5C40\u7167\u53C2\u7EA2\u7EC6\u5F15\u542C\u8BE5\u94C1\u4EF7\u4E25\u9F99\u98DE";
            var len;
            switch (arguments.length) {
              case 0:
                pool = DICT_KANZI;
                len = 1;
                break;
              case 1:
                if (typeof arguments[0] === "string") {
                  len = 1;
                } else {
                  len = pool;
                  pool = DICT_KANZI;
                }
                break;
              case 2:
                if (typeof arguments[0] === "string") {
                  len = min;
                } else {
                  len = this.natural(pool, min);
                  pool = DICT_KANZI;
                }
                break;
              case 3:
                len = this.natural(min, max);
                break;
            }
            var result = "";
            for (var i2 = 0; i2 < len; i2++) {
              result += pool.charAt(this.natural(0, pool.length - 1));
            }
            return result;
          },
          title: function(min, max) {
            var len = range(3, 7, min, max);
            var result = [];
            for (var i2 = 0; i2 < len; i2++) {
              result.push(this.capitalize(this.word()));
            }
            return result.join(" ");
          },
          ctitle: function(min, max) {
            var len = range(3, 7, min, max);
            var result = [];
            for (var i2 = 0; i2 < len; i2++) {
              result.push(this.cword());
            }
            return result.join("");
          }
        };
      },
      function(module2, exports2, __webpack_require__2) {
        var Util2 = __webpack_require__2(3);
        module2.exports = {
          capitalize: function(word) {
            return (word + "").charAt(0).toUpperCase() + (word + "").substr(1);
          },
          upper: function(str) {
            return (str + "").toUpperCase();
          },
          lower: function(str) {
            return (str + "").toLowerCase();
          },
          pick: function pick(arr, min, max) {
            if (!Util2.isArray(arr)) {
              arr = [].slice.call(arguments);
              min = 1;
              max = 1;
            } else {
              if (min === void 0)
                min = 1;
              if (max === void 0)
                max = min;
            }
            if (min === 1 && max === 1)
              return arr[this.natural(0, arr.length - 1)];
            return this.shuffle(arr, min, max);
          },
          shuffle: function shuffle(arr, min, max) {
            arr = arr || [];
            var old = arr.slice(0), result = [], index2 = 0, length = old.length;
            for (var i2 = 0; i2 < length; i2++) {
              index2 = this.natural(0, old.length - 1);
              result.push(old[index2]);
              old.splice(index2, 1);
            }
            switch (arguments.length) {
              case 0:
              case 1:
                return result;
              case 2:
                max = min;
              case 3:
                min = parseInt(min, 10);
                max = parseInt(max, 10);
                return result.slice(0, this.natural(min, max));
            }
          },
          order: function order(array) {
            order.cache = order.cache || {};
            if (arguments.length > 1)
              array = [].slice.call(arguments, 0);
            var options2 = order.options;
            var templatePath = options2.context.templatePath.join(".");
            var cache = order.cache[templatePath] = order.cache[templatePath] || {
              index: 0,
              array
            };
            return cache.array[cache.index++ % cache.array.length];
          }
        };
      },
      function(module2, exports2) {
        module2.exports = {
          first: function() {
            var names = [
              "James",
              "John",
              "Robert",
              "Michael",
              "William",
              "David",
              "Richard",
              "Charles",
              "Joseph",
              "Thomas",
              "Christopher",
              "Daniel",
              "Paul",
              "Mark",
              "Donald",
              "George",
              "Kenneth",
              "Steven",
              "Edward",
              "Brian",
              "Ronald",
              "Anthony",
              "Kevin",
              "Jason",
              "Matthew",
              "Gary",
              "Timothy",
              "Jose",
              "Larry",
              "Jeffrey",
              "Frank",
              "Scott",
              "Eric"
            ].concat([
              "Mary",
              "Patricia",
              "Linda",
              "Barbara",
              "Elizabeth",
              "Jennifer",
              "Maria",
              "Susan",
              "Margaret",
              "Dorothy",
              "Lisa",
              "Nancy",
              "Karen",
              "Betty",
              "Helen",
              "Sandra",
              "Donna",
              "Carol",
              "Ruth",
              "Sharon",
              "Michelle",
              "Laura",
              "Sarah",
              "Kimberly",
              "Deborah",
              "Jessica",
              "Shirley",
              "Cynthia",
              "Angela",
              "Melissa",
              "Brenda",
              "Amy",
              "Anna"
            ]);
            return this.pick(names);
          },
          last: function() {
            var names = [
              "Smith",
              "Johnson",
              "Williams",
              "Brown",
              "Jones",
              "Miller",
              "Davis",
              "Garcia",
              "Rodriguez",
              "Wilson",
              "Martinez",
              "Anderson",
              "Taylor",
              "Thomas",
              "Hernandez",
              "Moore",
              "Martin",
              "Jackson",
              "Thompson",
              "White",
              "Lopez",
              "Lee",
              "Gonzalez",
              "Harris",
              "Clark",
              "Lewis",
              "Robinson",
              "Walker",
              "Perez",
              "Hall",
              "Young",
              "Allen"
            ];
            return this.pick(names);
          },
          name: function(middle) {
            return this.first() + " " + (middle ? this.first() + " " : "") + this.last();
          },
          cfirst: function() {
            var names = "\u738B \u674E \u5F20 \u5218 \u9648 \u6768 \u8D75 \u9EC4 \u5468 \u5434 \u5F90 \u5B59 \u80E1 \u6731 \u9AD8 \u6797 \u4F55 \u90ED \u9A6C \u7F57 \u6881 \u5B8B \u90D1 \u8C22 \u97E9 \u5510 \u51AF \u4E8E \u8463 \u8427 \u7A0B \u66F9 \u8881 \u9093 \u8BB8 \u5085 \u6C88 \u66FE \u5F6D \u5415 \u82CF \u5362 \u848B \u8521 \u8D3E \u4E01 \u9B4F \u859B \u53F6 \u960E \u4F59 \u6F58 \u675C \u6234 \u590F \u953A \u6C6A \u7530 \u4EFB \u59DC \u8303 \u65B9 \u77F3 \u59DA \u8C2D \u5ED6 \u90B9 \u718A \u91D1 \u9646 \u90DD \u5B54 \u767D \u5D14 \u5EB7 \u6BDB \u90B1 \u79E6 \u6C5F \u53F2 \u987E \u4FAF \u90B5 \u5B5F \u9F99 \u4E07 \u6BB5 \u96F7 \u94B1 \u6C64 \u5C39 \u9ECE \u6613 \u5E38 \u6B66 \u4E54 \u8D3A \u8D56 \u9F9A \u6587".split(" ");
            return this.pick(names);
          },
          clast: function() {
            var names = "\u4F1F \u82B3 \u5A1C \u79C0\u82F1 \u654F \u9759 \u4E3D \u5F3A \u78CA \u519B \u6D0B \u52C7 \u8273 \u6770 \u5A1F \u6D9B \u660E \u8D85 \u79C0\u5170 \u971E \u5E73 \u521A \u6842\u82F1".split(" ");
            return this.pick(names);
          },
          cname: function() {
            return this.cfirst() + this.clast();
          }
        };
      },
      function(module2, exports2) {
        module2.exports = {
          url: function(protocol, host) {
            return (protocol || this.protocol()) + "://" + (host || this.domain()) + "/" + this.word();
          },
          protocol: function() {
            return this.pick(
              "http ftp gopher mailto mid cid news nntp prospero telnet rlogin tn3270 wais".split(" ")
            );
          },
          domain: function(tld) {
            return this.word() + "." + (tld || this.tld());
          },
          tld: function() {
            return this.pick(
              "com net org edu gov int mil cn com.cn net.cn gov.cn org.cn \u4E2D\u56FD \u4E2D\u56FD\u4E92\u8054.\u516C\u53F8 \u4E2D\u56FD\u4E92\u8054.\u7F51\u7EDC tel biz cc tv info name hk mobi asia cd travel pro museum coop aero ad ae af ag ai al am an ao aq ar as at au aw az ba bb bd be bf bg bh bi bj bm bn bo br bs bt bv bw by bz ca cc cf cg ch ci ck cl cm cn co cq cr cu cv cx cy cz de dj dk dm do dz ec ee eg eh es et ev fi fj fk fm fo fr ga gb gd ge gf gh gi gl gm gn gp gr gt gu gw gy hk hm hn hr ht hu id ie il in io iq ir is it jm jo jp ke kg kh ki km kn kp kr kw ky kz la lb lc li lk lr ls lt lu lv ly ma mc md mg mh ml mm mn mo mp mq mr ms mt mv mw mx my mz na nc ne nf ng ni nl no np nr nt nu nz om qa pa pe pf pg ph pk pl pm pn pr pt pw py re ro ru rw sa sb sc sd se sg sh si sj sk sl sm sn so sr st su sy sz tc td tf tg th tj tk tm tn to tp tr tt tv tw tz ua ug uk us uy va vc ve vg vn vu wf ws ye yu za zm zr zw".split(" ")
            );
          },
          email: function(domain) {
            return this.character("lower") + "." + this.word() + "@" + (domain || this.word() + "." + this.tld());
          },
          ip: function() {
            return this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255) + "." + this.natural(0, 255);
          }
        };
      },
      function(module2, exports2, __webpack_require__2) {
        var DICT = __webpack_require__2(18);
        var REGION = ["\u4E1C\u5317", "\u534E\u5317", "\u534E\u4E1C", "\u534E\u4E2D", "\u534E\u5357", "\u897F\u5357", "\u897F\u5317"];
        module2.exports = {
          region: function() {
            return this.pick(REGION);
          },
          province: function() {
            return this.pick(DICT).name;
          },
          city: function(prefix) {
            var province = this.pick(DICT);
            var city = this.pick(province.children);
            return prefix ? [province.name, city.name].join(" ") : city.name;
          },
          county: function(prefix) {
            var province = this.pick(DICT);
            var city = this.pick(province.children);
            var county = this.pick(city.children) || {
              name: "-"
            };
            return prefix ? [province.name, city.name, county.name].join(" ") : county.name;
          },
          zip: function(len) {
            var zip = "";
            for (var i2 = 0; i2 < (len || 6); i2++)
              zip += this.natural(0, 9);
            return zip;
          }
        };
      },
      function(module2, exports2) {
        var DICT = {
          "110000": "\u5317\u4EAC",
          "110100": "\u5317\u4EAC\u5E02",
          "110101": "\u4E1C\u57CE\u533A",
          "110102": "\u897F\u57CE\u533A",
          "110105": "\u671D\u9633\u533A",
          "110106": "\u4E30\u53F0\u533A",
          "110107": "\u77F3\u666F\u5C71\u533A",
          "110108": "\u6D77\u6DC0\u533A",
          "110109": "\u95E8\u5934\u6C9F\u533A",
          "110111": "\u623F\u5C71\u533A",
          "110112": "\u901A\u5DDE\u533A",
          "110113": "\u987A\u4E49\u533A",
          "110114": "\u660C\u5E73\u533A",
          "110115": "\u5927\u5174\u533A",
          "110116": "\u6000\u67D4\u533A",
          "110117": "\u5E73\u8C37\u533A",
          "110228": "\u5BC6\u4E91\u53BF",
          "110229": "\u5EF6\u5E86\u53BF",
          "110230": "\u5176\u5B83\u533A",
          "120000": "\u5929\u6D25",
          "120100": "\u5929\u6D25\u5E02",
          "120101": "\u548C\u5E73\u533A",
          "120102": "\u6CB3\u4E1C\u533A",
          "120103": "\u6CB3\u897F\u533A",
          "120104": "\u5357\u5F00\u533A",
          "120105": "\u6CB3\u5317\u533A",
          "120106": "\u7EA2\u6865\u533A",
          "120110": "\u4E1C\u4E3D\u533A",
          "120111": "\u897F\u9752\u533A",
          "120112": "\u6D25\u5357\u533A",
          "120113": "\u5317\u8FB0\u533A",
          "120114": "\u6B66\u6E05\u533A",
          "120115": "\u5B9D\u577B\u533A",
          "120116": "\u6EE8\u6D77\u65B0\u533A",
          "120221": "\u5B81\u6CB3\u53BF",
          "120223": "\u9759\u6D77\u53BF",
          "120225": "\u84DF\u53BF",
          "120226": "\u5176\u5B83\u533A",
          "130000": "\u6CB3\u5317\u7701",
          "130100": "\u77F3\u5BB6\u5E84\u5E02",
          "130102": "\u957F\u5B89\u533A",
          "130103": "\u6865\u4E1C\u533A",
          "130104": "\u6865\u897F\u533A",
          "130105": "\u65B0\u534E\u533A",
          "130107": "\u4E95\u9649\u77FF\u533A",
          "130108": "\u88D5\u534E\u533A",
          "130121": "\u4E95\u9649\u53BF",
          "130123": "\u6B63\u5B9A\u53BF",
          "130124": "\u683E\u57CE\u53BF",
          "130125": "\u884C\u5510\u53BF",
          "130126": "\u7075\u5BFF\u53BF",
          "130127": "\u9AD8\u9091\u53BF",
          "130128": "\u6DF1\u6CFD\u53BF",
          "130129": "\u8D5E\u7687\u53BF",
          "130130": "\u65E0\u6781\u53BF",
          "130131": "\u5E73\u5C71\u53BF",
          "130132": "\u5143\u6C0F\u53BF",
          "130133": "\u8D75\u53BF",
          "130181": "\u8F9B\u96C6\u5E02",
          "130182": "\u85C1\u57CE\u5E02",
          "130183": "\u664B\u5DDE\u5E02",
          "130184": "\u65B0\u4E50\u5E02",
          "130185": "\u9E7F\u6CC9\u5E02",
          "130186": "\u5176\u5B83\u533A",
          "130200": "\u5510\u5C71\u5E02",
          "130202": "\u8DEF\u5357\u533A",
          "130203": "\u8DEF\u5317\u533A",
          "130204": "\u53E4\u51B6\u533A",
          "130205": "\u5F00\u5E73\u533A",
          "130207": "\u4E30\u5357\u533A",
          "130208": "\u4E30\u6DA6\u533A",
          "130223": "\u6EE6\u53BF",
          "130224": "\u6EE6\u5357\u53BF",
          "130225": "\u4E50\u4EAD\u53BF",
          "130227": "\u8FC1\u897F\u53BF",
          "130229": "\u7389\u7530\u53BF",
          "130230": "\u66F9\u5983\u7538\u533A",
          "130281": "\u9075\u5316\u5E02",
          "130283": "\u8FC1\u5B89\u5E02",
          "130284": "\u5176\u5B83\u533A",
          "130300": "\u79E6\u7687\u5C9B\u5E02",
          "130302": "\u6D77\u6E2F\u533A",
          "130303": "\u5C71\u6D77\u5173\u533A",
          "130304": "\u5317\u6234\u6CB3\u533A",
          "130321": "\u9752\u9F99\u6EE1\u65CF\u81EA\u6CBB\u53BF",
          "130322": "\u660C\u9ECE\u53BF",
          "130323": "\u629A\u5B81\u53BF",
          "130324": "\u5362\u9F99\u53BF",
          "130398": "\u5176\u5B83\u533A",
          "130400": "\u90AF\u90F8\u5E02",
          "130402": "\u90AF\u5C71\u533A",
          "130403": "\u4E1B\u53F0\u533A",
          "130404": "\u590D\u5174\u533A",
          "130406": "\u5CF0\u5CF0\u77FF\u533A",
          "130421": "\u90AF\u90F8\u53BF",
          "130423": "\u4E34\u6F33\u53BF",
          "130424": "\u6210\u5B89\u53BF",
          "130425": "\u5927\u540D\u53BF",
          "130426": "\u6D89\u53BF",
          "130427": "\u78C1\u53BF",
          "130428": "\u80A5\u4E61\u53BF",
          "130429": "\u6C38\u5E74\u53BF",
          "130430": "\u90B1\u53BF",
          "130431": "\u9E21\u6CFD\u53BF",
          "130432": "\u5E7F\u5E73\u53BF",
          "130433": "\u9986\u9676\u53BF",
          "130434": "\u9B4F\u53BF",
          "130435": "\u66F2\u5468\u53BF",
          "130481": "\u6B66\u5B89\u5E02",
          "130482": "\u5176\u5B83\u533A",
          "130500": "\u90A2\u53F0\u5E02",
          "130502": "\u6865\u4E1C\u533A",
          "130503": "\u6865\u897F\u533A",
          "130521": "\u90A2\u53F0\u53BF",
          "130522": "\u4E34\u57CE\u53BF",
          "130523": "\u5185\u4E18\u53BF",
          "130524": "\u67CF\u4E61\u53BF",
          "130525": "\u9686\u5C27\u53BF",
          "130526": "\u4EFB\u53BF",
          "130527": "\u5357\u548C\u53BF",
          "130528": "\u5B81\u664B\u53BF",
          "130529": "\u5DE8\u9E7F\u53BF",
          "130530": "\u65B0\u6CB3\u53BF",
          "130531": "\u5E7F\u5B97\u53BF",
          "130532": "\u5E73\u4E61\u53BF",
          "130533": "\u5A01\u53BF",
          "130534": "\u6E05\u6CB3\u53BF",
          "130535": "\u4E34\u897F\u53BF",
          "130581": "\u5357\u5BAB\u5E02",
          "130582": "\u6C99\u6CB3\u5E02",
          "130583": "\u5176\u5B83\u533A",
          "130600": "\u4FDD\u5B9A\u5E02",
          "130602": "\u65B0\u5E02\u533A",
          "130603": "\u5317\u5E02\u533A",
          "130604": "\u5357\u5E02\u533A",
          "130621": "\u6EE1\u57CE\u53BF",
          "130622": "\u6E05\u82D1\u53BF",
          "130623": "\u6D9E\u6C34\u53BF",
          "130624": "\u961C\u5E73\u53BF",
          "130625": "\u5F90\u6C34\u53BF",
          "130626": "\u5B9A\u5174\u53BF",
          "130627": "\u5510\u53BF",
          "130628": "\u9AD8\u9633\u53BF",
          "130629": "\u5BB9\u57CE\u53BF",
          "130630": "\u6D9E\u6E90\u53BF",
          "130631": "\u671B\u90FD\u53BF",
          "130632": "\u5B89\u65B0\u53BF",
          "130633": "\u6613\u53BF",
          "130634": "\u66F2\u9633\u53BF",
          "130635": "\u8821\u53BF",
          "130636": "\u987A\u5E73\u53BF",
          "130637": "\u535A\u91CE\u53BF",
          "130638": "\u96C4\u53BF",
          "130681": "\u6DBF\u5DDE\u5E02",
          "130682": "\u5B9A\u5DDE\u5E02",
          "130683": "\u5B89\u56FD\u5E02",
          "130684": "\u9AD8\u7891\u5E97\u5E02",
          "130699": "\u5176\u5B83\u533A",
          "130700": "\u5F20\u5BB6\u53E3\u5E02",
          "130702": "\u6865\u4E1C\u533A",
          "130703": "\u6865\u897F\u533A",
          "130705": "\u5BA3\u5316\u533A",
          "130706": "\u4E0B\u82B1\u56ED\u533A",
          "130721": "\u5BA3\u5316\u53BF",
          "130722": "\u5F20\u5317\u53BF",
          "130723": "\u5EB7\u4FDD\u53BF",
          "130724": "\u6CBD\u6E90\u53BF",
          "130725": "\u5C1A\u4E49\u53BF",
          "130726": "\u851A\u53BF",
          "130727": "\u9633\u539F\u53BF",
          "130728": "\u6000\u5B89\u53BF",
          "130729": "\u4E07\u5168\u53BF",
          "130730": "\u6000\u6765\u53BF",
          "130731": "\u6DBF\u9E7F\u53BF",
          "130732": "\u8D64\u57CE\u53BF",
          "130733": "\u5D07\u793C\u53BF",
          "130734": "\u5176\u5B83\u533A",
          "130800": "\u627F\u5FB7\u5E02",
          "130802": "\u53CC\u6865\u533A",
          "130803": "\u53CC\u6EE6\u533A",
          "130804": "\u9E70\u624B\u8425\u5B50\u77FF\u533A",
          "130821": "\u627F\u5FB7\u53BF",
          "130822": "\u5174\u9686\u53BF",
          "130823": "\u5E73\u6CC9\u53BF",
          "130824": "\u6EE6\u5E73\u53BF",
          "130825": "\u9686\u5316\u53BF",
          "130826": "\u4E30\u5B81\u6EE1\u65CF\u81EA\u6CBB\u53BF",
          "130827": "\u5BBD\u57CE\u6EE1\u65CF\u81EA\u6CBB\u53BF",
          "130828": "\u56F4\u573A\u6EE1\u65CF\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
          "130829": "\u5176\u5B83\u533A",
          "130900": "\u6CA7\u5DDE\u5E02",
          "130902": "\u65B0\u534E\u533A",
          "130903": "\u8FD0\u6CB3\u533A",
          "130921": "\u6CA7\u53BF",
          "130922": "\u9752\u53BF",
          "130923": "\u4E1C\u5149\u53BF",
          "130924": "\u6D77\u5174\u53BF",
          "130925": "\u76D0\u5C71\u53BF",
          "130926": "\u8083\u5B81\u53BF",
          "130927": "\u5357\u76AE\u53BF",
          "130928": "\u5434\u6865\u53BF",
          "130929": "\u732E\u53BF",
          "130930": "\u5B5F\u6751\u56DE\u65CF\u81EA\u6CBB\u53BF",
          "130981": "\u6CCA\u5934\u5E02",
          "130982": "\u4EFB\u4E18\u5E02",
          "130983": "\u9EC4\u9A85\u5E02",
          "130984": "\u6CB3\u95F4\u5E02",
          "130985": "\u5176\u5B83\u533A",
          "131000": "\u5ECA\u574A\u5E02",
          "131002": "\u5B89\u6B21\u533A",
          "131003": "\u5E7F\u9633\u533A",
          "131022": "\u56FA\u5B89\u53BF",
          "131023": "\u6C38\u6E05\u53BF",
          "131024": "\u9999\u6CB3\u53BF",
          "131025": "\u5927\u57CE\u53BF",
          "131026": "\u6587\u5B89\u53BF",
          "131028": "\u5927\u5382\u56DE\u65CF\u81EA\u6CBB\u53BF",
          "131081": "\u9738\u5DDE\u5E02",
          "131082": "\u4E09\u6CB3\u5E02",
          "131083": "\u5176\u5B83\u533A",
          "131100": "\u8861\u6C34\u5E02",
          "131102": "\u6843\u57CE\u533A",
          "131121": "\u67A3\u5F3A\u53BF",
          "131122": "\u6B66\u9091\u53BF",
          "131123": "\u6B66\u5F3A\u53BF",
          "131124": "\u9976\u9633\u53BF",
          "131125": "\u5B89\u5E73\u53BF",
          "131126": "\u6545\u57CE\u53BF",
          "131127": "\u666F\u53BF",
          "131128": "\u961C\u57CE\u53BF",
          "131181": "\u5180\u5DDE\u5E02",
          "131182": "\u6DF1\u5DDE\u5E02",
          "131183": "\u5176\u5B83\u533A",
          "140000": "\u5C71\u897F\u7701",
          "140100": "\u592A\u539F\u5E02",
          "140105": "\u5C0F\u5E97\u533A",
          "140106": "\u8FCE\u6CFD\u533A",
          "140107": "\u674F\u82B1\u5CAD\u533A",
          "140108": "\u5C16\u8349\u576A\u533A",
          "140109": "\u4E07\u67CF\u6797\u533A",
          "140110": "\u664B\u6E90\u533A",
          "140121": "\u6E05\u5F90\u53BF",
          "140122": "\u9633\u66F2\u53BF",
          "140123": "\u5A04\u70E6\u53BF",
          "140181": "\u53E4\u4EA4\u5E02",
          "140182": "\u5176\u5B83\u533A",
          "140200": "\u5927\u540C\u5E02",
          "140202": "\u57CE\u533A",
          "140203": "\u77FF\u533A",
          "140211": "\u5357\u90CA\u533A",
          "140212": "\u65B0\u8363\u533A",
          "140221": "\u9633\u9AD8\u53BF",
          "140222": "\u5929\u9547\u53BF",
          "140223": "\u5E7F\u7075\u53BF",
          "140224": "\u7075\u4E18\u53BF",
          "140225": "\u6D51\u6E90\u53BF",
          "140226": "\u5DE6\u4E91\u53BF",
          "140227": "\u5927\u540C\u53BF",
          "140228": "\u5176\u5B83\u533A",
          "140300": "\u9633\u6CC9\u5E02",
          "140302": "\u57CE\u533A",
          "140303": "\u77FF\u533A",
          "140311": "\u90CA\u533A",
          "140321": "\u5E73\u5B9A\u53BF",
          "140322": "\u76C2\u53BF",
          "140323": "\u5176\u5B83\u533A",
          "140400": "\u957F\u6CBB\u5E02",
          "140421": "\u957F\u6CBB\u53BF",
          "140423": "\u8944\u57A3\u53BF",
          "140424": "\u5C6F\u7559\u53BF",
          "140425": "\u5E73\u987A\u53BF",
          "140426": "\u9ECE\u57CE\u53BF",
          "140427": "\u58F6\u5173\u53BF",
          "140428": "\u957F\u5B50\u53BF",
          "140429": "\u6B66\u4E61\u53BF",
          "140430": "\u6C81\u53BF",
          "140431": "\u6C81\u6E90\u53BF",
          "140481": "\u6F5E\u57CE\u5E02",
          "140482": "\u57CE\u533A",
          "140483": "\u90CA\u533A",
          "140485": "\u5176\u5B83\u533A",
          "140500": "\u664B\u57CE\u5E02",
          "140502": "\u57CE\u533A",
          "140521": "\u6C81\u6C34\u53BF",
          "140522": "\u9633\u57CE\u53BF",
          "140524": "\u9675\u5DDD\u53BF",
          "140525": "\u6CFD\u5DDE\u53BF",
          "140581": "\u9AD8\u5E73\u5E02",
          "140582": "\u5176\u5B83\u533A",
          "140600": "\u6714\u5DDE\u5E02",
          "140602": "\u6714\u57CE\u533A",
          "140603": "\u5E73\u9C81\u533A",
          "140621": "\u5C71\u9634\u53BF",
          "140622": "\u5E94\u53BF",
          "140623": "\u53F3\u7389\u53BF",
          "140624": "\u6000\u4EC1\u53BF",
          "140625": "\u5176\u5B83\u533A",
          "140700": "\u664B\u4E2D\u5E02",
          "140702": "\u6986\u6B21\u533A",
          "140721": "\u6986\u793E\u53BF",
          "140722": "\u5DE6\u6743\u53BF",
          "140723": "\u548C\u987A\u53BF",
          "140724": "\u6614\u9633\u53BF",
          "140725": "\u5BFF\u9633\u53BF",
          "140726": "\u592A\u8C37\u53BF",
          "140727": "\u7941\u53BF",
          "140728": "\u5E73\u9065\u53BF",
          "140729": "\u7075\u77F3\u53BF",
          "140781": "\u4ECB\u4F11\u5E02",
          "140782": "\u5176\u5B83\u533A",
          "140800": "\u8FD0\u57CE\u5E02",
          "140802": "\u76D0\u6E56\u533A",
          "140821": "\u4E34\u7317\u53BF",
          "140822": "\u4E07\u8363\u53BF",
          "140823": "\u95FB\u559C\u53BF",
          "140824": "\u7A37\u5C71\u53BF",
          "140825": "\u65B0\u7EDB\u53BF",
          "140826": "\u7EDB\u53BF",
          "140827": "\u57A3\u66F2\u53BF",
          "140828": "\u590F\u53BF",
          "140829": "\u5E73\u9646\u53BF",
          "140830": "\u82AE\u57CE\u53BF",
          "140881": "\u6C38\u6D4E\u5E02",
          "140882": "\u6CB3\u6D25\u5E02",
          "140883": "\u5176\u5B83\u533A",
          "140900": "\u5FFB\u5DDE\u5E02",
          "140902": "\u5FFB\u5E9C\u533A",
          "140921": "\u5B9A\u8944\u53BF",
          "140922": "\u4E94\u53F0\u53BF",
          "140923": "\u4EE3\u53BF",
          "140924": "\u7E41\u5CD9\u53BF",
          "140925": "\u5B81\u6B66\u53BF",
          "140926": "\u9759\u4E50\u53BF",
          "140927": "\u795E\u6C60\u53BF",
          "140928": "\u4E94\u5BE8\u53BF",
          "140929": "\u5CA2\u5C9A\u53BF",
          "140930": "\u6CB3\u66F2\u53BF",
          "140931": "\u4FDD\u5FB7\u53BF",
          "140932": "\u504F\u5173\u53BF",
          "140981": "\u539F\u5E73\u5E02",
          "140982": "\u5176\u5B83\u533A",
          "141000": "\u4E34\u6C7E\u5E02",
          "141002": "\u5C27\u90FD\u533A",
          "141021": "\u66F2\u6C83\u53BF",
          "141022": "\u7FFC\u57CE\u53BF",
          "141023": "\u8944\u6C7E\u53BF",
          "141024": "\u6D2A\u6D1E\u53BF",
          "141025": "\u53E4\u53BF",
          "141026": "\u5B89\u6CFD\u53BF",
          "141027": "\u6D6E\u5C71\u53BF",
          "141028": "\u5409\u53BF",
          "141029": "\u4E61\u5B81\u53BF",
          "141030": "\u5927\u5B81\u53BF",
          "141031": "\u96B0\u53BF",
          "141032": "\u6C38\u548C\u53BF",
          "141033": "\u84B2\u53BF",
          "141034": "\u6C7E\u897F\u53BF",
          "141081": "\u4FAF\u9A6C\u5E02",
          "141082": "\u970D\u5DDE\u5E02",
          "141083": "\u5176\u5B83\u533A",
          "141100": "\u5415\u6881\u5E02",
          "141102": "\u79BB\u77F3\u533A",
          "141121": "\u6587\u6C34\u53BF",
          "141122": "\u4EA4\u57CE\u53BF",
          "141123": "\u5174\u53BF",
          "141124": "\u4E34\u53BF",
          "141125": "\u67F3\u6797\u53BF",
          "141126": "\u77F3\u697C\u53BF",
          "141127": "\u5C9A\u53BF",
          "141128": "\u65B9\u5C71\u53BF",
          "141129": "\u4E2D\u9633\u53BF",
          "141130": "\u4EA4\u53E3\u53BF",
          "141181": "\u5B5D\u4E49\u5E02",
          "141182": "\u6C7E\u9633\u5E02",
          "141183": "\u5176\u5B83\u533A",
          "150000": "\u5185\u8499\u53E4\u81EA\u6CBB\u533A",
          "150100": "\u547C\u548C\u6D69\u7279\u5E02",
          "150102": "\u65B0\u57CE\u533A",
          "150103": "\u56DE\u6C11\u533A",
          "150104": "\u7389\u6CC9\u533A",
          "150105": "\u8D5B\u7F55\u533A",
          "150121": "\u571F\u9ED8\u7279\u5DE6\u65D7",
          "150122": "\u6258\u514B\u6258\u53BF",
          "150123": "\u548C\u6797\u683C\u5C14\u53BF",
          "150124": "\u6E05\u6C34\u6CB3\u53BF",
          "150125": "\u6B66\u5DDD\u53BF",
          "150126": "\u5176\u5B83\u533A",
          "150200": "\u5305\u5934\u5E02",
          "150202": "\u4E1C\u6CB3\u533A",
          "150203": "\u6606\u90FD\u4ED1\u533A",
          "150204": "\u9752\u5C71\u533A",
          "150205": "\u77F3\u62D0\u533A",
          "150206": "\u767D\u4E91\u9102\u535A\u77FF\u533A",
          "150207": "\u4E5D\u539F\u533A",
          "150221": "\u571F\u9ED8\u7279\u53F3\u65D7",
          "150222": "\u56FA\u9633\u53BF",
          "150223": "\u8FBE\u5C14\u7F55\u8302\u660E\u5B89\u8054\u5408\u65D7",
          "150224": "\u5176\u5B83\u533A",
          "150300": "\u4E4C\u6D77\u5E02",
          "150302": "\u6D77\u52C3\u6E7E\u533A",
          "150303": "\u6D77\u5357\u533A",
          "150304": "\u4E4C\u8FBE\u533A",
          "150305": "\u5176\u5B83\u533A",
          "150400": "\u8D64\u5CF0\u5E02",
          "150402": "\u7EA2\u5C71\u533A",
          "150403": "\u5143\u5B9D\u5C71\u533A",
          "150404": "\u677E\u5C71\u533A",
          "150421": "\u963F\u9C81\u79D1\u5C14\u6C81\u65D7",
          "150422": "\u5DF4\u6797\u5DE6\u65D7",
          "150423": "\u5DF4\u6797\u53F3\u65D7",
          "150424": "\u6797\u897F\u53BF",
          "150425": "\u514B\u4EC0\u514B\u817E\u65D7",
          "150426": "\u7FC1\u725B\u7279\u65D7",
          "150428": "\u5580\u5587\u6C81\u65D7",
          "150429": "\u5B81\u57CE\u53BF",
          "150430": "\u6556\u6C49\u65D7",
          "150431": "\u5176\u5B83\u533A",
          "150500": "\u901A\u8FBD\u5E02",
          "150502": "\u79D1\u5C14\u6C81\u533A",
          "150521": "\u79D1\u5C14\u6C81\u5DE6\u7FFC\u4E2D\u65D7",
          "150522": "\u79D1\u5C14\u6C81\u5DE6\u7FFC\u540E\u65D7",
          "150523": "\u5F00\u9C81\u53BF",
          "150524": "\u5E93\u4F26\u65D7",
          "150525": "\u5948\u66FC\u65D7",
          "150526": "\u624E\u9C81\u7279\u65D7",
          "150581": "\u970D\u6797\u90ED\u52D2\u5E02",
          "150582": "\u5176\u5B83\u533A",
          "150600": "\u9102\u5C14\u591A\u65AF\u5E02",
          "150602": "\u4E1C\u80DC\u533A",
          "150621": "\u8FBE\u62C9\u7279\u65D7",
          "150622": "\u51C6\u683C\u5C14\u65D7",
          "150623": "\u9102\u6258\u514B\u524D\u65D7",
          "150624": "\u9102\u6258\u514B\u65D7",
          "150625": "\u676D\u9526\u65D7",
          "150626": "\u4E4C\u5BA1\u65D7",
          "150627": "\u4F0A\u91D1\u970D\u6D1B\u65D7",
          "150628": "\u5176\u5B83\u533A",
          "150700": "\u547C\u4F26\u8D1D\u5C14\u5E02",
          "150702": "\u6D77\u62C9\u5C14\u533A",
          "150703": "\u624E\u8D49\u8BFA\u5C14\u533A",
          "150721": "\u963F\u8363\u65D7",
          "150722": "\u83AB\u529B\u8FBE\u74E6\u8FBE\u65A1\u5C14\u65CF\u81EA\u6CBB\u65D7",
          "150723": "\u9102\u4F26\u6625\u81EA\u6CBB\u65D7",
          "150724": "\u9102\u6E29\u514B\u65CF\u81EA\u6CBB\u65D7",
          "150725": "\u9648\u5DF4\u5C14\u864E\u65D7",
          "150726": "\u65B0\u5DF4\u5C14\u864E\u5DE6\u65D7",
          "150727": "\u65B0\u5DF4\u5C14\u864E\u53F3\u65D7",
          "150781": "\u6EE1\u6D32\u91CC\u5E02",
          "150782": "\u7259\u514B\u77F3\u5E02",
          "150783": "\u624E\u5170\u5C6F\u5E02",
          "150784": "\u989D\u5C14\u53E4\u7EB3\u5E02",
          "150785": "\u6839\u6CB3\u5E02",
          "150786": "\u5176\u5B83\u533A",
          "150800": "\u5DF4\u5F66\u6DD6\u5C14\u5E02",
          "150802": "\u4E34\u6CB3\u533A",
          "150821": "\u4E94\u539F\u53BF",
          "150822": "\u78F4\u53E3\u53BF",
          "150823": "\u4E4C\u62C9\u7279\u524D\u65D7",
          "150824": "\u4E4C\u62C9\u7279\u4E2D\u65D7",
          "150825": "\u4E4C\u62C9\u7279\u540E\u65D7",
          "150826": "\u676D\u9526\u540E\u65D7",
          "150827": "\u5176\u5B83\u533A",
          "150900": "\u4E4C\u5170\u5BDF\u5E03\u5E02",
          "150902": "\u96C6\u5B81\u533A",
          "150921": "\u5353\u8D44\u53BF",
          "150922": "\u5316\u5FB7\u53BF",
          "150923": "\u5546\u90FD\u53BF",
          "150924": "\u5174\u548C\u53BF",
          "150925": "\u51C9\u57CE\u53BF",
          "150926": "\u5BDF\u54C8\u5C14\u53F3\u7FFC\u524D\u65D7",
          "150927": "\u5BDF\u54C8\u5C14\u53F3\u7FFC\u4E2D\u65D7",
          "150928": "\u5BDF\u54C8\u5C14\u53F3\u7FFC\u540E\u65D7",
          "150929": "\u56DB\u5B50\u738B\u65D7",
          "150981": "\u4E30\u9547\u5E02",
          "150982": "\u5176\u5B83\u533A",
          "152200": "\u5174\u5B89\u76DF",
          "152201": "\u4E4C\u5170\u6D69\u7279\u5E02",
          "152202": "\u963F\u5C14\u5C71\u5E02",
          "152221": "\u79D1\u5C14\u6C81\u53F3\u7FFC\u524D\u65D7",
          "152222": "\u79D1\u5C14\u6C81\u53F3\u7FFC\u4E2D\u65D7",
          "152223": "\u624E\u8D49\u7279\u65D7",
          "152224": "\u7A81\u6CC9\u53BF",
          "152225": "\u5176\u5B83\u533A",
          "152500": "\u9521\u6797\u90ED\u52D2\u76DF",
          "152501": "\u4E8C\u8FDE\u6D69\u7279\u5E02",
          "152502": "\u9521\u6797\u6D69\u7279\u5E02",
          "152522": "\u963F\u5DF4\u560E\u65D7",
          "152523": "\u82CF\u5C3C\u7279\u5DE6\u65D7",
          "152524": "\u82CF\u5C3C\u7279\u53F3\u65D7",
          "152525": "\u4E1C\u4E4C\u73E0\u7A46\u6C81\u65D7",
          "152526": "\u897F\u4E4C\u73E0\u7A46\u6C81\u65D7",
          "152527": "\u592A\u4EC6\u5BFA\u65D7",
          "152528": "\u9576\u9EC4\u65D7",
          "152529": "\u6B63\u9576\u767D\u65D7",
          "152530": "\u6B63\u84DD\u65D7",
          "152531": "\u591A\u4F26\u53BF",
          "152532": "\u5176\u5B83\u533A",
          "152900": "\u963F\u62C9\u5584\u76DF",
          "152921": "\u963F\u62C9\u5584\u5DE6\u65D7",
          "152922": "\u963F\u62C9\u5584\u53F3\u65D7",
          "152923": "\u989D\u6D4E\u7EB3\u65D7",
          "152924": "\u5176\u5B83\u533A",
          "210000": "\u8FBD\u5B81\u7701",
          "210100": "\u6C88\u9633\u5E02",
          "210102": "\u548C\u5E73\u533A",
          "210103": "\u6C88\u6CB3\u533A",
          "210104": "\u5927\u4E1C\u533A",
          "210105": "\u7687\u59D1\u533A",
          "210106": "\u94C1\u897F\u533A",
          "210111": "\u82CF\u5BB6\u5C6F\u533A",
          "210112": "\u4E1C\u9675\u533A",
          "210113": "\u65B0\u57CE\u5B50\u533A",
          "210114": "\u4E8E\u6D2A\u533A",
          "210122": "\u8FBD\u4E2D\u53BF",
          "210123": "\u5EB7\u5E73\u53BF",
          "210124": "\u6CD5\u5E93\u53BF",
          "210181": "\u65B0\u6C11\u5E02",
          "210184": "\u6C88\u5317\u65B0\u533A",
          "210185": "\u5176\u5B83\u533A",
          "210200": "\u5927\u8FDE\u5E02",
          "210202": "\u4E2D\u5C71\u533A",
          "210203": "\u897F\u5C97\u533A",
          "210204": "\u6C99\u6CB3\u53E3\u533A",
          "210211": "\u7518\u4E95\u5B50\u533A",
          "210212": "\u65C5\u987A\u53E3\u533A",
          "210213": "\u91D1\u5DDE\u533A",
          "210224": "\u957F\u6D77\u53BF",
          "210281": "\u74E6\u623F\u5E97\u5E02",
          "210282": "\u666E\u5170\u5E97\u5E02",
          "210283": "\u5E84\u6CB3\u5E02",
          "210298": "\u5176\u5B83\u533A",
          "210300": "\u978D\u5C71\u5E02",
          "210302": "\u94C1\u4E1C\u533A",
          "210303": "\u94C1\u897F\u533A",
          "210304": "\u7ACB\u5C71\u533A",
          "210311": "\u5343\u5C71\u533A",
          "210321": "\u53F0\u5B89\u53BF",
          "210323": "\u5CAB\u5CA9\u6EE1\u65CF\u81EA\u6CBB\u53BF",
          "210381": "\u6D77\u57CE\u5E02",
          "210382": "\u5176\u5B83\u533A",
          "210400": "\u629A\u987A\u5E02",
          "210402": "\u65B0\u629A\u533A",
          "210403": "\u4E1C\u6D32\u533A",
          "210404": "\u671B\u82B1\u533A",
          "210411": "\u987A\u57CE\u533A",
          "210421": "\u629A\u987A\u53BF",
          "210422": "\u65B0\u5BBE\u6EE1\u65CF\u81EA\u6CBB\u53BF",
          "210423": "\u6E05\u539F\u6EE1\u65CF\u81EA\u6CBB\u53BF",
          "210424": "\u5176\u5B83\u533A",
          "210500": "\u672C\u6EAA\u5E02",
          "210502": "\u5E73\u5C71\u533A",
          "210503": "\u6EAA\u6E56\u533A",
          "210504": "\u660E\u5C71\u533A",
          "210505": "\u5357\u82AC\u533A",
          "210521": "\u672C\u6EAA\u6EE1\u65CF\u81EA\u6CBB\u53BF",
          "210522": "\u6853\u4EC1\u6EE1\u65CF\u81EA\u6CBB\u53BF",
          "210523": "\u5176\u5B83\u533A",
          "210600": "\u4E39\u4E1C\u5E02",
          "210602": "\u5143\u5B9D\u533A",
          "210603": "\u632F\u5174\u533A",
          "210604": "\u632F\u5B89\u533A",
          "210624": "\u5BBD\u7538\u6EE1\u65CF\u81EA\u6CBB\u53BF",
          "210681": "\u4E1C\u6E2F\u5E02",
          "210682": "\u51E4\u57CE\u5E02",
          "210683": "\u5176\u5B83\u533A",
          "210700": "\u9526\u5DDE\u5E02",
          "210702": "\u53E4\u5854\u533A",
          "210703": "\u51CC\u6CB3\u533A",
          "210711": "\u592A\u548C\u533A",
          "210726": "\u9ED1\u5C71\u53BF",
          "210727": "\u4E49\u53BF",
          "210781": "\u51CC\u6D77\u5E02",
          "210782": "\u5317\u9547\u5E02",
          "210783": "\u5176\u5B83\u533A",
          "210800": "\u8425\u53E3\u5E02",
          "210802": "\u7AD9\u524D\u533A",
          "210803": "\u897F\u5E02\u533A",
          "210804": "\u9C85\u9C7C\u5708\u533A",
          "210811": "\u8001\u8FB9\u533A",
          "210881": "\u76D6\u5DDE\u5E02",
          "210882": "\u5927\u77F3\u6865\u5E02",
          "210883": "\u5176\u5B83\u533A",
          "210900": "\u961C\u65B0\u5E02",
          "210902": "\u6D77\u5DDE\u533A",
          "210903": "\u65B0\u90B1\u533A",
          "210904": "\u592A\u5E73\u533A",
          "210905": "\u6E05\u6CB3\u95E8\u533A",
          "210911": "\u7EC6\u6CB3\u533A",
          "210921": "\u961C\u65B0\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
          "210922": "\u5F70\u6B66\u53BF",
          "210923": "\u5176\u5B83\u533A",
          "211000": "\u8FBD\u9633\u5E02",
          "211002": "\u767D\u5854\u533A",
          "211003": "\u6587\u5723\u533A",
          "211004": "\u5B8F\u4F1F\u533A",
          "211005": "\u5F13\u957F\u5CAD\u533A",
          "211011": "\u592A\u5B50\u6CB3\u533A",
          "211021": "\u8FBD\u9633\u53BF",
          "211081": "\u706F\u5854\u5E02",
          "211082": "\u5176\u5B83\u533A",
          "211100": "\u76D8\u9526\u5E02",
          "211102": "\u53CC\u53F0\u5B50\u533A",
          "211103": "\u5174\u9686\u53F0\u533A",
          "211121": "\u5927\u6D3C\u53BF",
          "211122": "\u76D8\u5C71\u53BF",
          "211123": "\u5176\u5B83\u533A",
          "211200": "\u94C1\u5CAD\u5E02",
          "211202": "\u94F6\u5DDE\u533A",
          "211204": "\u6E05\u6CB3\u533A",
          "211221": "\u94C1\u5CAD\u53BF",
          "211223": "\u897F\u4E30\u53BF",
          "211224": "\u660C\u56FE\u53BF",
          "211281": "\u8C03\u5175\u5C71\u5E02",
          "211282": "\u5F00\u539F\u5E02",
          "211283": "\u5176\u5B83\u533A",
          "211300": "\u671D\u9633\u5E02",
          "211302": "\u53CC\u5854\u533A",
          "211303": "\u9F99\u57CE\u533A",
          "211321": "\u671D\u9633\u53BF",
          "211322": "\u5EFA\u5E73\u53BF",
          "211324": "\u5580\u5587\u6C81\u5DE6\u7FFC\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
          "211381": "\u5317\u7968\u5E02",
          "211382": "\u51CC\u6E90\u5E02",
          "211383": "\u5176\u5B83\u533A",
          "211400": "\u846B\u82A6\u5C9B\u5E02",
          "211402": "\u8FDE\u5C71\u533A",
          "211403": "\u9F99\u6E2F\u533A",
          "211404": "\u5357\u7968\u533A",
          "211421": "\u7EE5\u4E2D\u53BF",
          "211422": "\u5EFA\u660C\u53BF",
          "211481": "\u5174\u57CE\u5E02",
          "211482": "\u5176\u5B83\u533A",
          "220000": "\u5409\u6797\u7701",
          "220100": "\u957F\u6625\u5E02",
          "220102": "\u5357\u5173\u533A",
          "220103": "\u5BBD\u57CE\u533A",
          "220104": "\u671D\u9633\u533A",
          "220105": "\u4E8C\u9053\u533A",
          "220106": "\u7EFF\u56ED\u533A",
          "220112": "\u53CC\u9633\u533A",
          "220122": "\u519C\u5B89\u53BF",
          "220181": "\u4E5D\u53F0\u5E02",
          "220182": "\u6986\u6811\u5E02",
          "220183": "\u5FB7\u60E0\u5E02",
          "220188": "\u5176\u5B83\u533A",
          "220200": "\u5409\u6797\u5E02",
          "220202": "\u660C\u9091\u533A",
          "220203": "\u9F99\u6F6D\u533A",
          "220204": "\u8239\u8425\u533A",
          "220211": "\u4E30\u6EE1\u533A",
          "220221": "\u6C38\u5409\u53BF",
          "220281": "\u86DF\u6CB3\u5E02",
          "220282": "\u6866\u7538\u5E02",
          "220283": "\u8212\u5170\u5E02",
          "220284": "\u78D0\u77F3\u5E02",
          "220285": "\u5176\u5B83\u533A",
          "220300": "\u56DB\u5E73\u5E02",
          "220302": "\u94C1\u897F\u533A",
          "220303": "\u94C1\u4E1C\u533A",
          "220322": "\u68A8\u6811\u53BF",
          "220323": "\u4F0A\u901A\u6EE1\u65CF\u81EA\u6CBB\u53BF",
          "220381": "\u516C\u4E3B\u5CAD\u5E02",
          "220382": "\u53CC\u8FBD\u5E02",
          "220383": "\u5176\u5B83\u533A",
          "220400": "\u8FBD\u6E90\u5E02",
          "220402": "\u9F99\u5C71\u533A",
          "220403": "\u897F\u5B89\u533A",
          "220421": "\u4E1C\u4E30\u53BF",
          "220422": "\u4E1C\u8FBD\u53BF",
          "220423": "\u5176\u5B83\u533A",
          "220500": "\u901A\u5316\u5E02",
          "220502": "\u4E1C\u660C\u533A",
          "220503": "\u4E8C\u9053\u6C5F\u533A",
          "220521": "\u901A\u5316\u53BF",
          "220523": "\u8F89\u5357\u53BF",
          "220524": "\u67F3\u6CB3\u53BF",
          "220581": "\u6885\u6CB3\u53E3\u5E02",
          "220582": "\u96C6\u5B89\u5E02",
          "220583": "\u5176\u5B83\u533A",
          "220600": "\u767D\u5C71\u5E02",
          "220602": "\u6D51\u6C5F\u533A",
          "220621": "\u629A\u677E\u53BF",
          "220622": "\u9756\u5B87\u53BF",
          "220623": "\u957F\u767D\u671D\u9C9C\u65CF\u81EA\u6CBB\u53BF",
          "220625": "\u6C5F\u6E90\u533A",
          "220681": "\u4E34\u6C5F\u5E02",
          "220682": "\u5176\u5B83\u533A",
          "220700": "\u677E\u539F\u5E02",
          "220702": "\u5B81\u6C5F\u533A",
          "220721": "\u524D\u90ED\u5C14\u7F57\u65AF\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
          "220722": "\u957F\u5CAD\u53BF",
          "220723": "\u4E7E\u5B89\u53BF",
          "220724": "\u6276\u4F59\u5E02",
          "220725": "\u5176\u5B83\u533A",
          "220800": "\u767D\u57CE\u5E02",
          "220802": "\u6D2E\u5317\u533A",
          "220821": "\u9547\u8D49\u53BF",
          "220822": "\u901A\u6986\u53BF",
          "220881": "\u6D2E\u5357\u5E02",
          "220882": "\u5927\u5B89\u5E02",
          "220883": "\u5176\u5B83\u533A",
          "222400": "\u5EF6\u8FB9\u671D\u9C9C\u65CF\u81EA\u6CBB\u5DDE",
          "222401": "\u5EF6\u5409\u5E02",
          "222402": "\u56FE\u4EEC\u5E02",
          "222403": "\u6566\u5316\u5E02",
          "222404": "\u73F2\u6625\u5E02",
          "222405": "\u9F99\u4E95\u5E02",
          "222406": "\u548C\u9F99\u5E02",
          "222424": "\u6C6A\u6E05\u53BF",
          "222426": "\u5B89\u56FE\u53BF",
          "222427": "\u5176\u5B83\u533A",
          "230000": "\u9ED1\u9F99\u6C5F\u7701",
          "230100": "\u54C8\u5C14\u6EE8\u5E02",
          "230102": "\u9053\u91CC\u533A",
          "230103": "\u5357\u5C97\u533A",
          "230104": "\u9053\u5916\u533A",
          "230106": "\u9999\u574A\u533A",
          "230108": "\u5E73\u623F\u533A",
          "230109": "\u677E\u5317\u533A",
          "230111": "\u547C\u5170\u533A",
          "230123": "\u4F9D\u5170\u53BF",
          "230124": "\u65B9\u6B63\u53BF",
          "230125": "\u5BBE\u53BF",
          "230126": "\u5DF4\u5F66\u53BF",
          "230127": "\u6728\u5170\u53BF",
          "230128": "\u901A\u6CB3\u53BF",
          "230129": "\u5EF6\u5BFF\u53BF",
          "230181": "\u963F\u57CE\u533A",
          "230182": "\u53CC\u57CE\u5E02",
          "230183": "\u5C1A\u5FD7\u5E02",
          "230184": "\u4E94\u5E38\u5E02",
          "230186": "\u5176\u5B83\u533A",
          "230200": "\u9F50\u9F50\u54C8\u5C14\u5E02",
          "230202": "\u9F99\u6C99\u533A",
          "230203": "\u5EFA\u534E\u533A",
          "230204": "\u94C1\u950B\u533A",
          "230205": "\u6602\u6602\u6EAA\u533A",
          "230206": "\u5BCC\u62C9\u5C14\u57FA\u533A",
          "230207": "\u78BE\u5B50\u5C71\u533A",
          "230208": "\u6885\u91CC\u65AF\u8FBE\u65A1\u5C14\u65CF\u533A",
          "230221": "\u9F99\u6C5F\u53BF",
          "230223": "\u4F9D\u5B89\u53BF",
          "230224": "\u6CF0\u6765\u53BF",
          "230225": "\u7518\u5357\u53BF",
          "230227": "\u5BCC\u88D5\u53BF",
          "230229": "\u514B\u5C71\u53BF",
          "230230": "\u514B\u4E1C\u53BF",
          "230231": "\u62DC\u6CC9\u53BF",
          "230281": "\u8BB7\u6CB3\u5E02",
          "230282": "\u5176\u5B83\u533A",
          "230300": "\u9E21\u897F\u5E02",
          "230302": "\u9E21\u51A0\u533A",
          "230303": "\u6052\u5C71\u533A",
          "230304": "\u6EF4\u9053\u533A",
          "230305": "\u68A8\u6811\u533A",
          "230306": "\u57CE\u5B50\u6CB3\u533A",
          "230307": "\u9EBB\u5C71\u533A",
          "230321": "\u9E21\u4E1C\u53BF",
          "230381": "\u864E\u6797\u5E02",
          "230382": "\u5BC6\u5C71\u5E02",
          "230383": "\u5176\u5B83\u533A",
          "230400": "\u9E64\u5C97\u5E02",
          "230402": "\u5411\u9633\u533A",
          "230403": "\u5DE5\u519C\u533A",
          "230404": "\u5357\u5C71\u533A",
          "230405": "\u5174\u5B89\u533A",
          "230406": "\u4E1C\u5C71\u533A",
          "230407": "\u5174\u5C71\u533A",
          "230421": "\u841D\u5317\u53BF",
          "230422": "\u7EE5\u6EE8\u53BF",
          "230423": "\u5176\u5B83\u533A",
          "230500": "\u53CC\u9E2D\u5C71\u5E02",
          "230502": "\u5C16\u5C71\u533A",
          "230503": "\u5CAD\u4E1C\u533A",
          "230505": "\u56DB\u65B9\u53F0\u533A",
          "230506": "\u5B9D\u5C71\u533A",
          "230521": "\u96C6\u8D24\u53BF",
          "230522": "\u53CB\u8C0A\u53BF",
          "230523": "\u5B9D\u6E05\u53BF",
          "230524": "\u9976\u6CB3\u53BF",
          "230525": "\u5176\u5B83\u533A",
          "230600": "\u5927\u5E86\u5E02",
          "230602": "\u8428\u5C14\u56FE\u533A",
          "230603": "\u9F99\u51E4\u533A",
          "230604": "\u8BA9\u80E1\u8DEF\u533A",
          "230605": "\u7EA2\u5C97\u533A",
          "230606": "\u5927\u540C\u533A",
          "230621": "\u8087\u5DDE\u53BF",
          "230622": "\u8087\u6E90\u53BF",
          "230623": "\u6797\u7538\u53BF",
          "230624": "\u675C\u5C14\u4F2F\u7279\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
          "230625": "\u5176\u5B83\u533A",
          "230700": "\u4F0A\u6625\u5E02",
          "230702": "\u4F0A\u6625\u533A",
          "230703": "\u5357\u5C94\u533A",
          "230704": "\u53CB\u597D\u533A",
          "230705": "\u897F\u6797\u533A",
          "230706": "\u7FE0\u5CE6\u533A",
          "230707": "\u65B0\u9752\u533A",
          "230708": "\u7F8E\u6EAA\u533A",
          "230709": "\u91D1\u5C71\u5C6F\u533A",
          "230710": "\u4E94\u8425\u533A",
          "230711": "\u4E4C\u9A6C\u6CB3\u533A",
          "230712": "\u6C64\u65FA\u6CB3\u533A",
          "230713": "\u5E26\u5CAD\u533A",
          "230714": "\u4E4C\u4F0A\u5CAD\u533A",
          "230715": "\u7EA2\u661F\u533A",
          "230716": "\u4E0A\u7518\u5CAD\u533A",
          "230722": "\u5609\u836B\u53BF",
          "230781": "\u94C1\u529B\u5E02",
          "230782": "\u5176\u5B83\u533A",
          "230800": "\u4F73\u6728\u65AF\u5E02",
          "230803": "\u5411\u9633\u533A",
          "230804": "\u524D\u8FDB\u533A",
          "230805": "\u4E1C\u98CE\u533A",
          "230811": "\u90CA\u533A",
          "230822": "\u6866\u5357\u53BF",
          "230826": "\u6866\u5DDD\u53BF",
          "230828": "\u6C64\u539F\u53BF",
          "230833": "\u629A\u8FDC\u53BF",
          "230881": "\u540C\u6C5F\u5E02",
          "230882": "\u5BCC\u9526\u5E02",
          "230883": "\u5176\u5B83\u533A",
          "230900": "\u4E03\u53F0\u6CB3\u5E02",
          "230902": "\u65B0\u5174\u533A",
          "230903": "\u6843\u5C71\u533A",
          "230904": "\u8304\u5B50\u6CB3\u533A",
          "230921": "\u52C3\u5229\u53BF",
          "230922": "\u5176\u5B83\u533A",
          "231000": "\u7261\u4E39\u6C5F\u5E02",
          "231002": "\u4E1C\u5B89\u533A",
          "231003": "\u9633\u660E\u533A",
          "231004": "\u7231\u6C11\u533A",
          "231005": "\u897F\u5B89\u533A",
          "231024": "\u4E1C\u5B81\u53BF",
          "231025": "\u6797\u53E3\u53BF",
          "231081": "\u7EE5\u82AC\u6CB3\u5E02",
          "231083": "\u6D77\u6797\u5E02",
          "231084": "\u5B81\u5B89\u5E02",
          "231085": "\u7A46\u68F1\u5E02",
          "231086": "\u5176\u5B83\u533A",
          "231100": "\u9ED1\u6CB3\u5E02",
          "231102": "\u7231\u8F89\u533A",
          "231121": "\u5AE9\u6C5F\u53BF",
          "231123": "\u900A\u514B\u53BF",
          "231124": "\u5B59\u5434\u53BF",
          "231181": "\u5317\u5B89\u5E02",
          "231182": "\u4E94\u5927\u8FDE\u6C60\u5E02",
          "231183": "\u5176\u5B83\u533A",
          "231200": "\u7EE5\u5316\u5E02",
          "231202": "\u5317\u6797\u533A",
          "231221": "\u671B\u594E\u53BF",
          "231222": "\u5170\u897F\u53BF",
          "231223": "\u9752\u5188\u53BF",
          "231224": "\u5E86\u5B89\u53BF",
          "231225": "\u660E\u6C34\u53BF",
          "231226": "\u7EE5\u68F1\u53BF",
          "231281": "\u5B89\u8FBE\u5E02",
          "231282": "\u8087\u4E1C\u5E02",
          "231283": "\u6D77\u4F26\u5E02",
          "231284": "\u5176\u5B83\u533A",
          "232700": "\u5927\u5174\u5B89\u5CAD\u5730\u533A",
          "232702": "\u677E\u5CAD\u533A",
          "232703": "\u65B0\u6797\u533A",
          "232704": "\u547C\u4E2D\u533A",
          "232721": "\u547C\u739B\u53BF",
          "232722": "\u5854\u6CB3\u53BF",
          "232723": "\u6F20\u6CB3\u53BF",
          "232724": "\u52A0\u683C\u8FBE\u5947\u533A",
          "232725": "\u5176\u5B83\u533A",
          "310000": "\u4E0A\u6D77",
          "310100": "\u4E0A\u6D77\u5E02",
          "310101": "\u9EC4\u6D66\u533A",
          "310104": "\u5F90\u6C47\u533A",
          "310105": "\u957F\u5B81\u533A",
          "310106": "\u9759\u5B89\u533A",
          "310107": "\u666E\u9640\u533A",
          "310108": "\u95F8\u5317\u533A",
          "310109": "\u8679\u53E3\u533A",
          "310110": "\u6768\u6D66\u533A",
          "310112": "\u95F5\u884C\u533A",
          "310113": "\u5B9D\u5C71\u533A",
          "310114": "\u5609\u5B9A\u533A",
          "310115": "\u6D66\u4E1C\u65B0\u533A",
          "310116": "\u91D1\u5C71\u533A",
          "310117": "\u677E\u6C5F\u533A",
          "310118": "\u9752\u6D66\u533A",
          "310120": "\u5949\u8D24\u533A",
          "310230": "\u5D07\u660E\u53BF",
          "310231": "\u5176\u5B83\u533A",
          "320000": "\u6C5F\u82CF\u7701",
          "320100": "\u5357\u4EAC\u5E02",
          "320102": "\u7384\u6B66\u533A",
          "320104": "\u79E6\u6DEE\u533A",
          "320105": "\u5EFA\u90BA\u533A",
          "320106": "\u9F13\u697C\u533A",
          "320111": "\u6D66\u53E3\u533A",
          "320113": "\u6816\u971E\u533A",
          "320114": "\u96E8\u82B1\u53F0\u533A",
          "320115": "\u6C5F\u5B81\u533A",
          "320116": "\u516D\u5408\u533A",
          "320124": "\u6EA7\u6C34\u533A",
          "320125": "\u9AD8\u6DF3\u533A",
          "320126": "\u5176\u5B83\u533A",
          "320200": "\u65E0\u9521\u5E02",
          "320202": "\u5D07\u5B89\u533A",
          "320203": "\u5357\u957F\u533A",
          "320204": "\u5317\u5858\u533A",
          "320205": "\u9521\u5C71\u533A",
          "320206": "\u60E0\u5C71\u533A",
          "320211": "\u6EE8\u6E56\u533A",
          "320281": "\u6C5F\u9634\u5E02",
          "320282": "\u5B9C\u5174\u5E02",
          "320297": "\u5176\u5B83\u533A",
          "320300": "\u5F90\u5DDE\u5E02",
          "320302": "\u9F13\u697C\u533A",
          "320303": "\u4E91\u9F99\u533A",
          "320305": "\u8D3E\u6C6A\u533A",
          "320311": "\u6CC9\u5C71\u533A",
          "320321": "\u4E30\u53BF",
          "320322": "\u6C9B\u53BF",
          "320323": "\u94DC\u5C71\u533A",
          "320324": "\u7762\u5B81\u53BF",
          "320381": "\u65B0\u6C82\u5E02",
          "320382": "\u90B3\u5DDE\u5E02",
          "320383": "\u5176\u5B83\u533A",
          "320400": "\u5E38\u5DDE\u5E02",
          "320402": "\u5929\u5B81\u533A",
          "320404": "\u949F\u697C\u533A",
          "320405": "\u621A\u5885\u5830\u533A",
          "320411": "\u65B0\u5317\u533A",
          "320412": "\u6B66\u8FDB\u533A",
          "320481": "\u6EA7\u9633\u5E02",
          "320482": "\u91D1\u575B\u5E02",
          "320483": "\u5176\u5B83\u533A",
          "320500": "\u82CF\u5DDE\u5E02",
          "320505": "\u864E\u4E18\u533A",
          "320506": "\u5434\u4E2D\u533A",
          "320507": "\u76F8\u57CE\u533A",
          "320508": "\u59D1\u82CF\u533A",
          "320581": "\u5E38\u719F\u5E02",
          "320582": "\u5F20\u5BB6\u6E2F\u5E02",
          "320583": "\u6606\u5C71\u5E02",
          "320584": "\u5434\u6C5F\u533A",
          "320585": "\u592A\u4ED3\u5E02",
          "320596": "\u5176\u5B83\u533A",
          "320600": "\u5357\u901A\u5E02",
          "320602": "\u5D07\u5DDD\u533A",
          "320611": "\u6E2F\u95F8\u533A",
          "320612": "\u901A\u5DDE\u533A",
          "320621": "\u6D77\u5B89\u53BF",
          "320623": "\u5982\u4E1C\u53BF",
          "320681": "\u542F\u4E1C\u5E02",
          "320682": "\u5982\u768B\u5E02",
          "320684": "\u6D77\u95E8\u5E02",
          "320694": "\u5176\u5B83\u533A",
          "320700": "\u8FDE\u4E91\u6E2F\u5E02",
          "320703": "\u8FDE\u4E91\u533A",
          "320705": "\u65B0\u6D66\u533A",
          "320706": "\u6D77\u5DDE\u533A",
          "320721": "\u8D63\u6986\u53BF",
          "320722": "\u4E1C\u6D77\u53BF",
          "320723": "\u704C\u4E91\u53BF",
          "320724": "\u704C\u5357\u53BF",
          "320725": "\u5176\u5B83\u533A",
          "320800": "\u6DEE\u5B89\u5E02",
          "320802": "\u6E05\u6CB3\u533A",
          "320803": "\u6DEE\u5B89\u533A",
          "320804": "\u6DEE\u9634\u533A",
          "320811": "\u6E05\u6D66\u533A",
          "320826": "\u6D9F\u6C34\u53BF",
          "320829": "\u6D2A\u6CFD\u53BF",
          "320830": "\u76F1\u7719\u53BF",
          "320831": "\u91D1\u6E56\u53BF",
          "320832": "\u5176\u5B83\u533A",
          "320900": "\u76D0\u57CE\u5E02",
          "320902": "\u4EAD\u6E56\u533A",
          "320903": "\u76D0\u90FD\u533A",
          "320921": "\u54CD\u6C34\u53BF",
          "320922": "\u6EE8\u6D77\u53BF",
          "320923": "\u961C\u5B81\u53BF",
          "320924": "\u5C04\u9633\u53BF",
          "320925": "\u5EFA\u6E56\u53BF",
          "320981": "\u4E1C\u53F0\u5E02",
          "320982": "\u5927\u4E30\u5E02",
          "320983": "\u5176\u5B83\u533A",
          "321000": "\u626C\u5DDE\u5E02",
          "321002": "\u5E7F\u9675\u533A",
          "321003": "\u9097\u6C5F\u533A",
          "321023": "\u5B9D\u5E94\u53BF",
          "321081": "\u4EEA\u5F81\u5E02",
          "321084": "\u9AD8\u90AE\u5E02",
          "321088": "\u6C5F\u90FD\u533A",
          "321093": "\u5176\u5B83\u533A",
          "321100": "\u9547\u6C5F\u5E02",
          "321102": "\u4EAC\u53E3\u533A",
          "321111": "\u6DA6\u5DDE\u533A",
          "321112": "\u4E39\u5F92\u533A",
          "321181": "\u4E39\u9633\u5E02",
          "321182": "\u626C\u4E2D\u5E02",
          "321183": "\u53E5\u5BB9\u5E02",
          "321184": "\u5176\u5B83\u533A",
          "321200": "\u6CF0\u5DDE\u5E02",
          "321202": "\u6D77\u9675\u533A",
          "321203": "\u9AD8\u6E2F\u533A",
          "321281": "\u5174\u5316\u5E02",
          "321282": "\u9756\u6C5F\u5E02",
          "321283": "\u6CF0\u5174\u5E02",
          "321284": "\u59DC\u5830\u533A",
          "321285": "\u5176\u5B83\u533A",
          "321300": "\u5BBF\u8FC1\u5E02",
          "321302": "\u5BBF\u57CE\u533A",
          "321311": "\u5BBF\u8C6B\u533A",
          "321322": "\u6CAD\u9633\u53BF",
          "321323": "\u6CD7\u9633\u53BF",
          "321324": "\u6CD7\u6D2A\u53BF",
          "321325": "\u5176\u5B83\u533A",
          "330000": "\u6D59\u6C5F\u7701",
          "330100": "\u676D\u5DDE\u5E02",
          "330102": "\u4E0A\u57CE\u533A",
          "330103": "\u4E0B\u57CE\u533A",
          "330104": "\u6C5F\u5E72\u533A",
          "330105": "\u62F1\u5885\u533A",
          "330106": "\u897F\u6E56\u533A",
          "330108": "\u6EE8\u6C5F\u533A",
          "330109": "\u8427\u5C71\u533A",
          "330110": "\u4F59\u676D\u533A",
          "330122": "\u6850\u5E90\u53BF",
          "330127": "\u6DF3\u5B89\u53BF",
          "330182": "\u5EFA\u5FB7\u5E02",
          "330183": "\u5BCC\u9633\u5E02",
          "330185": "\u4E34\u5B89\u5E02",
          "330186": "\u5176\u5B83\u533A",
          "330200": "\u5B81\u6CE2\u5E02",
          "330203": "\u6D77\u66D9\u533A",
          "330204": "\u6C5F\u4E1C\u533A",
          "330205": "\u6C5F\u5317\u533A",
          "330206": "\u5317\u4ED1\u533A",
          "330211": "\u9547\u6D77\u533A",
          "330212": "\u911E\u5DDE\u533A",
          "330225": "\u8C61\u5C71\u53BF",
          "330226": "\u5B81\u6D77\u53BF",
          "330281": "\u4F59\u59DA\u5E02",
          "330282": "\u6148\u6EAA\u5E02",
          "330283": "\u5949\u5316\u5E02",
          "330284": "\u5176\u5B83\u533A",
          "330300": "\u6E29\u5DDE\u5E02",
          "330302": "\u9E7F\u57CE\u533A",
          "330303": "\u9F99\u6E7E\u533A",
          "330304": "\u74EF\u6D77\u533A",
          "330322": "\u6D1E\u5934\u53BF",
          "330324": "\u6C38\u5609\u53BF",
          "330326": "\u5E73\u9633\u53BF",
          "330327": "\u82CD\u5357\u53BF",
          "330328": "\u6587\u6210\u53BF",
          "330329": "\u6CF0\u987A\u53BF",
          "330381": "\u745E\u5B89\u5E02",
          "330382": "\u4E50\u6E05\u5E02",
          "330383": "\u5176\u5B83\u533A",
          "330400": "\u5609\u5174\u5E02",
          "330402": "\u5357\u6E56\u533A",
          "330411": "\u79C0\u6D32\u533A",
          "330421": "\u5609\u5584\u53BF",
          "330424": "\u6D77\u76D0\u53BF",
          "330481": "\u6D77\u5B81\u5E02",
          "330482": "\u5E73\u6E56\u5E02",
          "330483": "\u6850\u4E61\u5E02",
          "330484": "\u5176\u5B83\u533A",
          "330500": "\u6E56\u5DDE\u5E02",
          "330502": "\u5434\u5174\u533A",
          "330503": "\u5357\u6D54\u533A",
          "330521": "\u5FB7\u6E05\u53BF",
          "330522": "\u957F\u5174\u53BF",
          "330523": "\u5B89\u5409\u53BF",
          "330524": "\u5176\u5B83\u533A",
          "330600": "\u7ECD\u5174\u5E02",
          "330602": "\u8D8A\u57CE\u533A",
          "330621": "\u7ECD\u5174\u53BF",
          "330624": "\u65B0\u660C\u53BF",
          "330681": "\u8BF8\u66A8\u5E02",
          "330682": "\u4E0A\u865E\u5E02",
          "330683": "\u5D4A\u5DDE\u5E02",
          "330684": "\u5176\u5B83\u533A",
          "330700": "\u91D1\u534E\u5E02",
          "330702": "\u5A7A\u57CE\u533A",
          "330703": "\u91D1\u4E1C\u533A",
          "330723": "\u6B66\u4E49\u53BF",
          "330726": "\u6D66\u6C5F\u53BF",
          "330727": "\u78D0\u5B89\u53BF",
          "330781": "\u5170\u6EAA\u5E02",
          "330782": "\u4E49\u4E4C\u5E02",
          "330783": "\u4E1C\u9633\u5E02",
          "330784": "\u6C38\u5EB7\u5E02",
          "330785": "\u5176\u5B83\u533A",
          "330800": "\u8862\u5DDE\u5E02",
          "330802": "\u67EF\u57CE\u533A",
          "330803": "\u8862\u6C5F\u533A",
          "330822": "\u5E38\u5C71\u53BF",
          "330824": "\u5F00\u5316\u53BF",
          "330825": "\u9F99\u6E38\u53BF",
          "330881": "\u6C5F\u5C71\u5E02",
          "330882": "\u5176\u5B83\u533A",
          "330900": "\u821F\u5C71\u5E02",
          "330902": "\u5B9A\u6D77\u533A",
          "330903": "\u666E\u9640\u533A",
          "330921": "\u5CB1\u5C71\u53BF",
          "330922": "\u5D4A\u6CD7\u53BF",
          "330923": "\u5176\u5B83\u533A",
          "331000": "\u53F0\u5DDE\u5E02",
          "331002": "\u6912\u6C5F\u533A",
          "331003": "\u9EC4\u5CA9\u533A",
          "331004": "\u8DEF\u6865\u533A",
          "331021": "\u7389\u73AF\u53BF",
          "331022": "\u4E09\u95E8\u53BF",
          "331023": "\u5929\u53F0\u53BF",
          "331024": "\u4ED9\u5C45\u53BF",
          "331081": "\u6E29\u5CAD\u5E02",
          "331082": "\u4E34\u6D77\u5E02",
          "331083": "\u5176\u5B83\u533A",
          "331100": "\u4E3D\u6C34\u5E02",
          "331102": "\u83B2\u90FD\u533A",
          "331121": "\u9752\u7530\u53BF",
          "331122": "\u7F19\u4E91\u53BF",
          "331123": "\u9042\u660C\u53BF",
          "331124": "\u677E\u9633\u53BF",
          "331125": "\u4E91\u548C\u53BF",
          "331126": "\u5E86\u5143\u53BF",
          "331127": "\u666F\u5B81\u7572\u65CF\u81EA\u6CBB\u53BF",
          "331181": "\u9F99\u6CC9\u5E02",
          "331182": "\u5176\u5B83\u533A",
          "340000": "\u5B89\u5FBD\u7701",
          "340100": "\u5408\u80A5\u5E02",
          "340102": "\u7476\u6D77\u533A",
          "340103": "\u5E90\u9633\u533A",
          "340104": "\u8700\u5C71\u533A",
          "340111": "\u5305\u6CB3\u533A",
          "340121": "\u957F\u4E30\u53BF",
          "340122": "\u80A5\u4E1C\u53BF",
          "340123": "\u80A5\u897F\u53BF",
          "340192": "\u5176\u5B83\u533A",
          "340200": "\u829C\u6E56\u5E02",
          "340202": "\u955C\u6E56\u533A",
          "340203": "\u5F0B\u6C5F\u533A",
          "340207": "\u9E20\u6C5F\u533A",
          "340208": "\u4E09\u5C71\u533A",
          "340221": "\u829C\u6E56\u53BF",
          "340222": "\u7E41\u660C\u53BF",
          "340223": "\u5357\u9675\u53BF",
          "340224": "\u5176\u5B83\u533A",
          "340300": "\u868C\u57E0\u5E02",
          "340302": "\u9F99\u5B50\u6E56\u533A",
          "340303": "\u868C\u5C71\u533A",
          "340304": "\u79B9\u4F1A\u533A",
          "340311": "\u6DEE\u4E0A\u533A",
          "340321": "\u6000\u8FDC\u53BF",
          "340322": "\u4E94\u6CB3\u53BF",
          "340323": "\u56FA\u9547\u53BF",
          "340324": "\u5176\u5B83\u533A",
          "340400": "\u6DEE\u5357\u5E02",
          "340402": "\u5927\u901A\u533A",
          "340403": "\u7530\u5BB6\u5EB5\u533A",
          "340404": "\u8C22\u5BB6\u96C6\u533A",
          "340405": "\u516B\u516C\u5C71\u533A",
          "340406": "\u6F58\u96C6\u533A",
          "340421": "\u51E4\u53F0\u53BF",
          "340422": "\u5176\u5B83\u533A",
          "340500": "\u9A6C\u978D\u5C71\u5E02",
          "340503": "\u82B1\u5C71\u533A",
          "340504": "\u96E8\u5C71\u533A",
          "340506": "\u535A\u671B\u533A",
          "340521": "\u5F53\u6D82\u53BF",
          "340522": "\u5176\u5B83\u533A",
          "340600": "\u6DEE\u5317\u5E02",
          "340602": "\u675C\u96C6\u533A",
          "340603": "\u76F8\u5C71\u533A",
          "340604": "\u70C8\u5C71\u533A",
          "340621": "\u6FC9\u6EAA\u53BF",
          "340622": "\u5176\u5B83\u533A",
          "340700": "\u94DC\u9675\u5E02",
          "340702": "\u94DC\u5B98\u5C71\u533A",
          "340703": "\u72EE\u5B50\u5C71\u533A",
          "340711": "\u90CA\u533A",
          "340721": "\u94DC\u9675\u53BF",
          "340722": "\u5176\u5B83\u533A",
          "340800": "\u5B89\u5E86\u5E02",
          "340802": "\u8FCE\u6C5F\u533A",
          "340803": "\u5927\u89C2\u533A",
          "340811": "\u5B9C\u79C0\u533A",
          "340822": "\u6000\u5B81\u53BF",
          "340823": "\u679E\u9633\u53BF",
          "340824": "\u6F5C\u5C71\u53BF",
          "340825": "\u592A\u6E56\u53BF",
          "340826": "\u5BBF\u677E\u53BF",
          "340827": "\u671B\u6C5F\u53BF",
          "340828": "\u5CB3\u897F\u53BF",
          "340881": "\u6850\u57CE\u5E02",
          "340882": "\u5176\u5B83\u533A",
          "341000": "\u9EC4\u5C71\u5E02",
          "341002": "\u5C6F\u6EAA\u533A",
          "341003": "\u9EC4\u5C71\u533A",
          "341004": "\u5FBD\u5DDE\u533A",
          "341021": "\u6B59\u53BF",
          "341022": "\u4F11\u5B81\u53BF",
          "341023": "\u9EDF\u53BF",
          "341024": "\u7941\u95E8\u53BF",
          "341025": "\u5176\u5B83\u533A",
          "341100": "\u6EC1\u5DDE\u5E02",
          "341102": "\u7405\u740A\u533A",
          "341103": "\u5357\u8C2F\u533A",
          "341122": "\u6765\u5B89\u53BF",
          "341124": "\u5168\u6912\u53BF",
          "341125": "\u5B9A\u8FDC\u53BF",
          "341126": "\u51E4\u9633\u53BF",
          "341181": "\u5929\u957F\u5E02",
          "341182": "\u660E\u5149\u5E02",
          "341183": "\u5176\u5B83\u533A",
          "341200": "\u961C\u9633\u5E02",
          "341202": "\u988D\u5DDE\u533A",
          "341203": "\u988D\u4E1C\u533A",
          "341204": "\u988D\u6CC9\u533A",
          "341221": "\u4E34\u6CC9\u53BF",
          "341222": "\u592A\u548C\u53BF",
          "341225": "\u961C\u5357\u53BF",
          "341226": "\u988D\u4E0A\u53BF",
          "341282": "\u754C\u9996\u5E02",
          "341283": "\u5176\u5B83\u533A",
          "341300": "\u5BBF\u5DDE\u5E02",
          "341302": "\u57C7\u6865\u533A",
          "341321": "\u7800\u5C71\u53BF",
          "341322": "\u8427\u53BF",
          "341323": "\u7075\u74A7\u53BF",
          "341324": "\u6CD7\u53BF",
          "341325": "\u5176\u5B83\u533A",
          "341400": "\u5DE2\u6E56\u5E02",
          "341421": "\u5E90\u6C5F\u53BF",
          "341422": "\u65E0\u4E3A\u53BF",
          "341423": "\u542B\u5C71\u53BF",
          "341424": "\u548C\u53BF",
          "341500": "\u516D\u5B89\u5E02",
          "341502": "\u91D1\u5B89\u533A",
          "341503": "\u88D5\u5B89\u533A",
          "341521": "\u5BFF\u53BF",
          "341522": "\u970D\u90B1\u53BF",
          "341523": "\u8212\u57CE\u53BF",
          "341524": "\u91D1\u5BE8\u53BF",
          "341525": "\u970D\u5C71\u53BF",
          "341526": "\u5176\u5B83\u533A",
          "341600": "\u4EB3\u5DDE\u5E02",
          "341602": "\u8C2F\u57CE\u533A",
          "341621": "\u6DA1\u9633\u53BF",
          "341622": "\u8499\u57CE\u53BF",
          "341623": "\u5229\u8F9B\u53BF",
          "341624": "\u5176\u5B83\u533A",
          "341700": "\u6C60\u5DDE\u5E02",
          "341702": "\u8D35\u6C60\u533A",
          "341721": "\u4E1C\u81F3\u53BF",
          "341722": "\u77F3\u53F0\u53BF",
          "341723": "\u9752\u9633\u53BF",
          "341724": "\u5176\u5B83\u533A",
          "341800": "\u5BA3\u57CE\u5E02",
          "341802": "\u5BA3\u5DDE\u533A",
          "341821": "\u90CE\u6EAA\u53BF",
          "341822": "\u5E7F\u5FB7\u53BF",
          "341823": "\u6CFE\u53BF",
          "341824": "\u7EE9\u6EAA\u53BF",
          "341825": "\u65CC\u5FB7\u53BF",
          "341881": "\u5B81\u56FD\u5E02",
          "341882": "\u5176\u5B83\u533A",
          "350000": "\u798F\u5EFA\u7701",
          "350100": "\u798F\u5DDE\u5E02",
          "350102": "\u9F13\u697C\u533A",
          "350103": "\u53F0\u6C5F\u533A",
          "350104": "\u4ED3\u5C71\u533A",
          "350105": "\u9A6C\u5C3E\u533A",
          "350111": "\u664B\u5B89\u533A",
          "350121": "\u95FD\u4FAF\u53BF",
          "350122": "\u8FDE\u6C5F\u53BF",
          "350123": "\u7F57\u6E90\u53BF",
          "350124": "\u95FD\u6E05\u53BF",
          "350125": "\u6C38\u6CF0\u53BF",
          "350128": "\u5E73\u6F6D\u53BF",
          "350181": "\u798F\u6E05\u5E02",
          "350182": "\u957F\u4E50\u5E02",
          "350183": "\u5176\u5B83\u533A",
          "350200": "\u53A6\u95E8\u5E02",
          "350203": "\u601D\u660E\u533A",
          "350205": "\u6D77\u6CA7\u533A",
          "350206": "\u6E56\u91CC\u533A",
          "350211": "\u96C6\u7F8E\u533A",
          "350212": "\u540C\u5B89\u533A",
          "350213": "\u7FD4\u5B89\u533A",
          "350214": "\u5176\u5B83\u533A",
          "350300": "\u8386\u7530\u5E02",
          "350302": "\u57CE\u53A2\u533A",
          "350303": "\u6DB5\u6C5F\u533A",
          "350304": "\u8354\u57CE\u533A",
          "350305": "\u79C0\u5C7F\u533A",
          "350322": "\u4ED9\u6E38\u53BF",
          "350323": "\u5176\u5B83\u533A",
          "350400": "\u4E09\u660E\u5E02",
          "350402": "\u6885\u5217\u533A",
          "350403": "\u4E09\u5143\u533A",
          "350421": "\u660E\u6EAA\u53BF",
          "350423": "\u6E05\u6D41\u53BF",
          "350424": "\u5B81\u5316\u53BF",
          "350425": "\u5927\u7530\u53BF",
          "350426": "\u5C24\u6EAA\u53BF",
          "350427": "\u6C99\u53BF",
          "350428": "\u5C06\u4E50\u53BF",
          "350429": "\u6CF0\u5B81\u53BF",
          "350430": "\u5EFA\u5B81\u53BF",
          "350481": "\u6C38\u5B89\u5E02",
          "350482": "\u5176\u5B83\u533A",
          "350500": "\u6CC9\u5DDE\u5E02",
          "350502": "\u9CA4\u57CE\u533A",
          "350503": "\u4E30\u6CFD\u533A",
          "350504": "\u6D1B\u6C5F\u533A",
          "350505": "\u6CC9\u6E2F\u533A",
          "350521": "\u60E0\u5B89\u53BF",
          "350524": "\u5B89\u6EAA\u53BF",
          "350525": "\u6C38\u6625\u53BF",
          "350526": "\u5FB7\u5316\u53BF",
          "350527": "\u91D1\u95E8\u53BF",
          "350581": "\u77F3\u72EE\u5E02",
          "350582": "\u664B\u6C5F\u5E02",
          "350583": "\u5357\u5B89\u5E02",
          "350584": "\u5176\u5B83\u533A",
          "350600": "\u6F33\u5DDE\u5E02",
          "350602": "\u8297\u57CE\u533A",
          "350603": "\u9F99\u6587\u533A",
          "350622": "\u4E91\u9704\u53BF",
          "350623": "\u6F33\u6D66\u53BF",
          "350624": "\u8BCF\u5B89\u53BF",
          "350625": "\u957F\u6CF0\u53BF",
          "350626": "\u4E1C\u5C71\u53BF",
          "350627": "\u5357\u9756\u53BF",
          "350628": "\u5E73\u548C\u53BF",
          "350629": "\u534E\u5B89\u53BF",
          "350681": "\u9F99\u6D77\u5E02",
          "350682": "\u5176\u5B83\u533A",
          "350700": "\u5357\u5E73\u5E02",
          "350702": "\u5EF6\u5E73\u533A",
          "350721": "\u987A\u660C\u53BF",
          "350722": "\u6D66\u57CE\u53BF",
          "350723": "\u5149\u6CFD\u53BF",
          "350724": "\u677E\u6EAA\u53BF",
          "350725": "\u653F\u548C\u53BF",
          "350781": "\u90B5\u6B66\u5E02",
          "350782": "\u6B66\u5937\u5C71\u5E02",
          "350783": "\u5EFA\u74EF\u5E02",
          "350784": "\u5EFA\u9633\u5E02",
          "350785": "\u5176\u5B83\u533A",
          "350800": "\u9F99\u5CA9\u5E02",
          "350802": "\u65B0\u7F57\u533A",
          "350821": "\u957F\u6C40\u53BF",
          "350822": "\u6C38\u5B9A\u53BF",
          "350823": "\u4E0A\u676D\u53BF",
          "350824": "\u6B66\u5E73\u53BF",
          "350825": "\u8FDE\u57CE\u53BF",
          "350881": "\u6F33\u5E73\u5E02",
          "350882": "\u5176\u5B83\u533A",
          "350900": "\u5B81\u5FB7\u5E02",
          "350902": "\u8549\u57CE\u533A",
          "350921": "\u971E\u6D66\u53BF",
          "350922": "\u53E4\u7530\u53BF",
          "350923": "\u5C4F\u5357\u53BF",
          "350924": "\u5BFF\u5B81\u53BF",
          "350925": "\u5468\u5B81\u53BF",
          "350926": "\u67D8\u8363\u53BF",
          "350981": "\u798F\u5B89\u5E02",
          "350982": "\u798F\u9F0E\u5E02",
          "350983": "\u5176\u5B83\u533A",
          "360000": "\u6C5F\u897F\u7701",
          "360100": "\u5357\u660C\u5E02",
          "360102": "\u4E1C\u6E56\u533A",
          "360103": "\u897F\u6E56\u533A",
          "360104": "\u9752\u4E91\u8C31\u533A",
          "360105": "\u6E7E\u91CC\u533A",
          "360111": "\u9752\u5C71\u6E56\u533A",
          "360121": "\u5357\u660C\u53BF",
          "360122": "\u65B0\u5EFA\u53BF",
          "360123": "\u5B89\u4E49\u53BF",
          "360124": "\u8FDB\u8D24\u53BF",
          "360128": "\u5176\u5B83\u533A",
          "360200": "\u666F\u5FB7\u9547\u5E02",
          "360202": "\u660C\u6C5F\u533A",
          "360203": "\u73E0\u5C71\u533A",
          "360222": "\u6D6E\u6881\u53BF",
          "360281": "\u4E50\u5E73\u5E02",
          "360282": "\u5176\u5B83\u533A",
          "360300": "\u840D\u4E61\u5E02",
          "360302": "\u5B89\u6E90\u533A",
          "360313": "\u6E58\u4E1C\u533A",
          "360321": "\u83B2\u82B1\u53BF",
          "360322": "\u4E0A\u6817\u53BF",
          "360323": "\u82A6\u6EAA\u53BF",
          "360324": "\u5176\u5B83\u533A",
          "360400": "\u4E5D\u6C5F\u5E02",
          "360402": "\u5E90\u5C71\u533A",
          "360403": "\u6D54\u9633\u533A",
          "360421": "\u4E5D\u6C5F\u53BF",
          "360423": "\u6B66\u5B81\u53BF",
          "360424": "\u4FEE\u6C34\u53BF",
          "360425": "\u6C38\u4FEE\u53BF",
          "360426": "\u5FB7\u5B89\u53BF",
          "360427": "\u661F\u5B50\u53BF",
          "360428": "\u90FD\u660C\u53BF",
          "360429": "\u6E56\u53E3\u53BF",
          "360430": "\u5F6D\u6CFD\u53BF",
          "360481": "\u745E\u660C\u5E02",
          "360482": "\u5176\u5B83\u533A",
          "360483": "\u5171\u9752\u57CE\u5E02",
          "360500": "\u65B0\u4F59\u5E02",
          "360502": "\u6E1D\u6C34\u533A",
          "360521": "\u5206\u5B9C\u53BF",
          "360522": "\u5176\u5B83\u533A",
          "360600": "\u9E70\u6F6D\u5E02",
          "360602": "\u6708\u6E56\u533A",
          "360622": "\u4F59\u6C5F\u53BF",
          "360681": "\u8D35\u6EAA\u5E02",
          "360682": "\u5176\u5B83\u533A",
          "360700": "\u8D63\u5DDE\u5E02",
          "360702": "\u7AE0\u8D21\u533A",
          "360721": "\u8D63\u53BF",
          "360722": "\u4FE1\u4E30\u53BF",
          "360723": "\u5927\u4F59\u53BF",
          "360724": "\u4E0A\u72B9\u53BF",
          "360725": "\u5D07\u4E49\u53BF",
          "360726": "\u5B89\u8FDC\u53BF",
          "360727": "\u9F99\u5357\u53BF",
          "360728": "\u5B9A\u5357\u53BF",
          "360729": "\u5168\u5357\u53BF",
          "360730": "\u5B81\u90FD\u53BF",
          "360731": "\u4E8E\u90FD\u53BF",
          "360732": "\u5174\u56FD\u53BF",
          "360733": "\u4F1A\u660C\u53BF",
          "360734": "\u5BFB\u4E4C\u53BF",
          "360735": "\u77F3\u57CE\u53BF",
          "360781": "\u745E\u91D1\u5E02",
          "360782": "\u5357\u5EB7\u5E02",
          "360783": "\u5176\u5B83\u533A",
          "360800": "\u5409\u5B89\u5E02",
          "360802": "\u5409\u5DDE\u533A",
          "360803": "\u9752\u539F\u533A",
          "360821": "\u5409\u5B89\u53BF",
          "360822": "\u5409\u6C34\u53BF",
          "360823": "\u5CE1\u6C5F\u53BF",
          "360824": "\u65B0\u5E72\u53BF",
          "360825": "\u6C38\u4E30\u53BF",
          "360826": "\u6CF0\u548C\u53BF",
          "360827": "\u9042\u5DDD\u53BF",
          "360828": "\u4E07\u5B89\u53BF",
          "360829": "\u5B89\u798F\u53BF",
          "360830": "\u6C38\u65B0\u53BF",
          "360881": "\u4E95\u5188\u5C71\u5E02",
          "360882": "\u5176\u5B83\u533A",
          "360900": "\u5B9C\u6625\u5E02",
          "360902": "\u8881\u5DDE\u533A",
          "360921": "\u5949\u65B0\u53BF",
          "360922": "\u4E07\u8F7D\u53BF",
          "360923": "\u4E0A\u9AD8\u53BF",
          "360924": "\u5B9C\u4E30\u53BF",
          "360925": "\u9756\u5B89\u53BF",
          "360926": "\u94DC\u9F13\u53BF",
          "360981": "\u4E30\u57CE\u5E02",
          "360982": "\u6A1F\u6811\u5E02",
          "360983": "\u9AD8\u5B89\u5E02",
          "360984": "\u5176\u5B83\u533A",
          "361000": "\u629A\u5DDE\u5E02",
          "361002": "\u4E34\u5DDD\u533A",
          "361021": "\u5357\u57CE\u53BF",
          "361022": "\u9ECE\u5DDD\u53BF",
          "361023": "\u5357\u4E30\u53BF",
          "361024": "\u5D07\u4EC1\u53BF",
          "361025": "\u4E50\u5B89\u53BF",
          "361026": "\u5B9C\u9EC4\u53BF",
          "361027": "\u91D1\u6EAA\u53BF",
          "361028": "\u8D44\u6EAA\u53BF",
          "361029": "\u4E1C\u4E61\u53BF",
          "361030": "\u5E7F\u660C\u53BF",
          "361031": "\u5176\u5B83\u533A",
          "361100": "\u4E0A\u9976\u5E02",
          "361102": "\u4FE1\u5DDE\u533A",
          "361121": "\u4E0A\u9976\u53BF",
          "361122": "\u5E7F\u4E30\u53BF",
          "361123": "\u7389\u5C71\u53BF",
          "361124": "\u94C5\u5C71\u53BF",
          "361125": "\u6A2A\u5CF0\u53BF",
          "361126": "\u5F0B\u9633\u53BF",
          "361127": "\u4F59\u5E72\u53BF",
          "361128": "\u9131\u9633\u53BF",
          "361129": "\u4E07\u5E74\u53BF",
          "361130": "\u5A7A\u6E90\u53BF",
          "361181": "\u5FB7\u5174\u5E02",
          "361182": "\u5176\u5B83\u533A",
          "370000": "\u5C71\u4E1C\u7701",
          "370100": "\u6D4E\u5357\u5E02",
          "370102": "\u5386\u4E0B\u533A",
          "370103": "\u5E02\u4E2D\u533A",
          "370104": "\u69D0\u836B\u533A",
          "370105": "\u5929\u6865\u533A",
          "370112": "\u5386\u57CE\u533A",
          "370113": "\u957F\u6E05\u533A",
          "370124": "\u5E73\u9634\u53BF",
          "370125": "\u6D4E\u9633\u53BF",
          "370126": "\u5546\u6CB3\u53BF",
          "370181": "\u7AE0\u4E18\u5E02",
          "370182": "\u5176\u5B83\u533A",
          "370200": "\u9752\u5C9B\u5E02",
          "370202": "\u5E02\u5357\u533A",
          "370203": "\u5E02\u5317\u533A",
          "370211": "\u9EC4\u5C9B\u533A",
          "370212": "\u5D02\u5C71\u533A",
          "370213": "\u674E\u6CA7\u533A",
          "370214": "\u57CE\u9633\u533A",
          "370281": "\u80F6\u5DDE\u5E02",
          "370282": "\u5373\u58A8\u5E02",
          "370283": "\u5E73\u5EA6\u5E02",
          "370285": "\u83B1\u897F\u5E02",
          "370286": "\u5176\u5B83\u533A",
          "370300": "\u6DC4\u535A\u5E02",
          "370302": "\u6DC4\u5DDD\u533A",
          "370303": "\u5F20\u5E97\u533A",
          "370304": "\u535A\u5C71\u533A",
          "370305": "\u4E34\u6DC4\u533A",
          "370306": "\u5468\u6751\u533A",
          "370321": "\u6853\u53F0\u53BF",
          "370322": "\u9AD8\u9752\u53BF",
          "370323": "\u6C82\u6E90\u53BF",
          "370324": "\u5176\u5B83\u533A",
          "370400": "\u67A3\u5E84\u5E02",
          "370402": "\u5E02\u4E2D\u533A",
          "370403": "\u859B\u57CE\u533A",
          "370404": "\u5CC4\u57CE\u533A",
          "370405": "\u53F0\u513F\u5E84\u533A",
          "370406": "\u5C71\u4EAD\u533A",
          "370481": "\u6ED5\u5DDE\u5E02",
          "370482": "\u5176\u5B83\u533A",
          "370500": "\u4E1C\u8425\u5E02",
          "370502": "\u4E1C\u8425\u533A",
          "370503": "\u6CB3\u53E3\u533A",
          "370521": "\u57A6\u5229\u53BF",
          "370522": "\u5229\u6D25\u53BF",
          "370523": "\u5E7F\u9976\u53BF",
          "370591": "\u5176\u5B83\u533A",
          "370600": "\u70DF\u53F0\u5E02",
          "370602": "\u829D\u7F58\u533A",
          "370611": "\u798F\u5C71\u533A",
          "370612": "\u725F\u5E73\u533A",
          "370613": "\u83B1\u5C71\u533A",
          "370634": "\u957F\u5C9B\u53BF",
          "370681": "\u9F99\u53E3\u5E02",
          "370682": "\u83B1\u9633\u5E02",
          "370683": "\u83B1\u5DDE\u5E02",
          "370684": "\u84EC\u83B1\u5E02",
          "370685": "\u62DB\u8FDC\u5E02",
          "370686": "\u6816\u971E\u5E02",
          "370687": "\u6D77\u9633\u5E02",
          "370688": "\u5176\u5B83\u533A",
          "370700": "\u6F4D\u574A\u5E02",
          "370702": "\u6F4D\u57CE\u533A",
          "370703": "\u5BD2\u4EAD\u533A",
          "370704": "\u574A\u5B50\u533A",
          "370705": "\u594E\u6587\u533A",
          "370724": "\u4E34\u6710\u53BF",
          "370725": "\u660C\u4E50\u53BF",
          "370781": "\u9752\u5DDE\u5E02",
          "370782": "\u8BF8\u57CE\u5E02",
          "370783": "\u5BFF\u5149\u5E02",
          "370784": "\u5B89\u4E18\u5E02",
          "370785": "\u9AD8\u5BC6\u5E02",
          "370786": "\u660C\u9091\u5E02",
          "370787": "\u5176\u5B83\u533A",
          "370800": "\u6D4E\u5B81\u5E02",
          "370802": "\u5E02\u4E2D\u533A",
          "370811": "\u4EFB\u57CE\u533A",
          "370826": "\u5FAE\u5C71\u53BF",
          "370827": "\u9C7C\u53F0\u53BF",
          "370828": "\u91D1\u4E61\u53BF",
          "370829": "\u5609\u7965\u53BF",
          "370830": "\u6C76\u4E0A\u53BF",
          "370831": "\u6CD7\u6C34\u53BF",
          "370832": "\u6881\u5C71\u53BF",
          "370881": "\u66F2\u961C\u5E02",
          "370882": "\u5156\u5DDE\u5E02",
          "370883": "\u90B9\u57CE\u5E02",
          "370884": "\u5176\u5B83\u533A",
          "370900": "\u6CF0\u5B89\u5E02",
          "370902": "\u6CF0\u5C71\u533A",
          "370903": "\u5CB1\u5CB3\u533A",
          "370921": "\u5B81\u9633\u53BF",
          "370923": "\u4E1C\u5E73\u53BF",
          "370982": "\u65B0\u6CF0\u5E02",
          "370983": "\u80A5\u57CE\u5E02",
          "370984": "\u5176\u5B83\u533A",
          "371000": "\u5A01\u6D77\u5E02",
          "371002": "\u73AF\u7FE0\u533A",
          "371081": "\u6587\u767B\u5E02",
          "371082": "\u8363\u6210\u5E02",
          "371083": "\u4E73\u5C71\u5E02",
          "371084": "\u5176\u5B83\u533A",
          "371100": "\u65E5\u7167\u5E02",
          "371102": "\u4E1C\u6E2F\u533A",
          "371103": "\u5C9A\u5C71\u533A",
          "371121": "\u4E94\u83B2\u53BF",
          "371122": "\u8392\u53BF",
          "371123": "\u5176\u5B83\u533A",
          "371200": "\u83B1\u829C\u5E02",
          "371202": "\u83B1\u57CE\u533A",
          "371203": "\u94A2\u57CE\u533A",
          "371204": "\u5176\u5B83\u533A",
          "371300": "\u4E34\u6C82\u5E02",
          "371302": "\u5170\u5C71\u533A",
          "371311": "\u7F57\u5E84\u533A",
          "371312": "\u6CB3\u4E1C\u533A",
          "371321": "\u6C82\u5357\u53BF",
          "371322": "\u90EF\u57CE\u53BF",
          "371323": "\u6C82\u6C34\u53BF",
          "371324": "\u82CD\u5C71\u53BF",
          "371325": "\u8D39\u53BF",
          "371326": "\u5E73\u9091\u53BF",
          "371327": "\u8392\u5357\u53BF",
          "371328": "\u8499\u9634\u53BF",
          "371329": "\u4E34\u6CAD\u53BF",
          "371330": "\u5176\u5B83\u533A",
          "371400": "\u5FB7\u5DDE\u5E02",
          "371402": "\u5FB7\u57CE\u533A",
          "371421": "\u9675\u53BF",
          "371422": "\u5B81\u6D25\u53BF",
          "371423": "\u5E86\u4E91\u53BF",
          "371424": "\u4E34\u9091\u53BF",
          "371425": "\u9F50\u6CB3\u53BF",
          "371426": "\u5E73\u539F\u53BF",
          "371427": "\u590F\u6D25\u53BF",
          "371428": "\u6B66\u57CE\u53BF",
          "371481": "\u4E50\u9675\u5E02",
          "371482": "\u79B9\u57CE\u5E02",
          "371483": "\u5176\u5B83\u533A",
          "371500": "\u804A\u57CE\u5E02",
          "371502": "\u4E1C\u660C\u5E9C\u533A",
          "371521": "\u9633\u8C37\u53BF",
          "371522": "\u8398\u53BF",
          "371523": "\u830C\u5E73\u53BF",
          "371524": "\u4E1C\u963F\u53BF",
          "371525": "\u51A0\u53BF",
          "371526": "\u9AD8\u5510\u53BF",
          "371581": "\u4E34\u6E05\u5E02",
          "371582": "\u5176\u5B83\u533A",
          "371600": "\u6EE8\u5DDE\u5E02",
          "371602": "\u6EE8\u57CE\u533A",
          "371621": "\u60E0\u6C11\u53BF",
          "371622": "\u9633\u4FE1\u53BF",
          "371623": "\u65E0\u68E3\u53BF",
          "371624": "\u6CBE\u5316\u53BF",
          "371625": "\u535A\u5174\u53BF",
          "371626": "\u90B9\u5E73\u53BF",
          "371627": "\u5176\u5B83\u533A",
          "371700": "\u83CF\u6CFD\u5E02",
          "371702": "\u7261\u4E39\u533A",
          "371721": "\u66F9\u53BF",
          "371722": "\u5355\u53BF",
          "371723": "\u6210\u6B66\u53BF",
          "371724": "\u5DE8\u91CE\u53BF",
          "371725": "\u90D3\u57CE\u53BF",
          "371726": "\u9104\u57CE\u53BF",
          "371727": "\u5B9A\u9676\u53BF",
          "371728": "\u4E1C\u660E\u53BF",
          "371729": "\u5176\u5B83\u533A",
          "410000": "\u6CB3\u5357\u7701",
          "410100": "\u90D1\u5DDE\u5E02",
          "410102": "\u4E2D\u539F\u533A",
          "410103": "\u4E8C\u4E03\u533A",
          "410104": "\u7BA1\u57CE\u56DE\u65CF\u533A",
          "410105": "\u91D1\u6C34\u533A",
          "410106": "\u4E0A\u8857\u533A",
          "410108": "\u60E0\u6D4E\u533A",
          "410122": "\u4E2D\u725F\u53BF",
          "410181": "\u5DE9\u4E49\u5E02",
          "410182": "\u8365\u9633\u5E02",
          "410183": "\u65B0\u5BC6\u5E02",
          "410184": "\u65B0\u90D1\u5E02",
          "410185": "\u767B\u5C01\u5E02",
          "410188": "\u5176\u5B83\u533A",
          "410200": "\u5F00\u5C01\u5E02",
          "410202": "\u9F99\u4EAD\u533A",
          "410203": "\u987A\u6CB3\u56DE\u65CF\u533A",
          "410204": "\u9F13\u697C\u533A",
          "410205": "\u79B9\u738B\u53F0\u533A",
          "410211": "\u91D1\u660E\u533A",
          "410221": "\u675E\u53BF",
          "410222": "\u901A\u8BB8\u53BF",
          "410223": "\u5C09\u6C0F\u53BF",
          "410224": "\u5F00\u5C01\u53BF",
          "410225": "\u5170\u8003\u53BF",
          "410226": "\u5176\u5B83\u533A",
          "410300": "\u6D1B\u9633\u5E02",
          "410302": "\u8001\u57CE\u533A",
          "410303": "\u897F\u5DE5\u533A",
          "410304": "\u700D\u6CB3\u56DE\u65CF\u533A",
          "410305": "\u6DA7\u897F\u533A",
          "410306": "\u5409\u5229\u533A",
          "410307": "\u6D1B\u9F99\u533A",
          "410322": "\u5B5F\u6D25\u53BF",
          "410323": "\u65B0\u5B89\u53BF",
          "410324": "\u683E\u5DDD\u53BF",
          "410325": "\u5D69\u53BF",
          "410326": "\u6C5D\u9633\u53BF",
          "410327": "\u5B9C\u9633\u53BF",
          "410328": "\u6D1B\u5B81\u53BF",
          "410329": "\u4F0A\u5DDD\u53BF",
          "410381": "\u5043\u5E08\u5E02",
          "410400": "\u5E73\u9876\u5C71\u5E02",
          "410402": "\u65B0\u534E\u533A",
          "410403": "\u536B\u4E1C\u533A",
          "410404": "\u77F3\u9F99\u533A",
          "410411": "\u6E5B\u6CB3\u533A",
          "410421": "\u5B9D\u4E30\u53BF",
          "410422": "\u53F6\u53BF",
          "410423": "\u9C81\u5C71\u53BF",
          "410425": "\u90CF\u53BF",
          "410481": "\u821E\u94A2\u5E02",
          "410482": "\u6C5D\u5DDE\u5E02",
          "410483": "\u5176\u5B83\u533A",
          "410500": "\u5B89\u9633\u5E02",
          "410502": "\u6587\u5CF0\u533A",
          "410503": "\u5317\u5173\u533A",
          "410505": "\u6BB7\u90FD\u533A",
          "410506": "\u9F99\u5B89\u533A",
          "410522": "\u5B89\u9633\u53BF",
          "410523": "\u6C64\u9634\u53BF",
          "410526": "\u6ED1\u53BF",
          "410527": "\u5185\u9EC4\u53BF",
          "410581": "\u6797\u5DDE\u5E02",
          "410582": "\u5176\u5B83\u533A",
          "410600": "\u9E64\u58C1\u5E02",
          "410602": "\u9E64\u5C71\u533A",
          "410603": "\u5C71\u57CE\u533A",
          "410611": "\u6DC7\u6EE8\u533A",
          "410621": "\u6D5A\u53BF",
          "410622": "\u6DC7\u53BF",
          "410623": "\u5176\u5B83\u533A",
          "410700": "\u65B0\u4E61\u5E02",
          "410702": "\u7EA2\u65D7\u533A",
          "410703": "\u536B\u6EE8\u533A",
          "410704": "\u51E4\u6CC9\u533A",
          "410711": "\u7267\u91CE\u533A",
          "410721": "\u65B0\u4E61\u53BF",
          "410724": "\u83B7\u5609\u53BF",
          "410725": "\u539F\u9633\u53BF",
          "410726": "\u5EF6\u6D25\u53BF",
          "410727": "\u5C01\u4E18\u53BF",
          "410728": "\u957F\u57A3\u53BF",
          "410781": "\u536B\u8F89\u5E02",
          "410782": "\u8F89\u53BF\u5E02",
          "410783": "\u5176\u5B83\u533A",
          "410800": "\u7126\u4F5C\u5E02",
          "410802": "\u89E3\u653E\u533A",
          "410803": "\u4E2D\u7AD9\u533A",
          "410804": "\u9A6C\u6751\u533A",
          "410811": "\u5C71\u9633\u533A",
          "410821": "\u4FEE\u6B66\u53BF",
          "410822": "\u535A\u7231\u53BF",
          "410823": "\u6B66\u965F\u53BF",
          "410825": "\u6E29\u53BF",
          "410881": "\u6D4E\u6E90\u5E02",
          "410882": "\u6C81\u9633\u5E02",
          "410883": "\u5B5F\u5DDE\u5E02",
          "410884": "\u5176\u5B83\u533A",
          "410900": "\u6FEE\u9633\u5E02",
          "410902": "\u534E\u9F99\u533A",
          "410922": "\u6E05\u4E30\u53BF",
          "410923": "\u5357\u4E50\u53BF",
          "410926": "\u8303\u53BF",
          "410927": "\u53F0\u524D\u53BF",
          "410928": "\u6FEE\u9633\u53BF",
          "410929": "\u5176\u5B83\u533A",
          "411000": "\u8BB8\u660C\u5E02",
          "411002": "\u9B4F\u90FD\u533A",
          "411023": "\u8BB8\u660C\u53BF",
          "411024": "\u9122\u9675\u53BF",
          "411025": "\u8944\u57CE\u53BF",
          "411081": "\u79B9\u5DDE\u5E02",
          "411082": "\u957F\u845B\u5E02",
          "411083": "\u5176\u5B83\u533A",
          "411100": "\u6F2F\u6CB3\u5E02",
          "411102": "\u6E90\u6C47\u533A",
          "411103": "\u90FE\u57CE\u533A",
          "411104": "\u53EC\u9675\u533A",
          "411121": "\u821E\u9633\u53BF",
          "411122": "\u4E34\u988D\u53BF",
          "411123": "\u5176\u5B83\u533A",
          "411200": "\u4E09\u95E8\u5CE1\u5E02",
          "411202": "\u6E56\u6EE8\u533A",
          "411221": "\u6E11\u6C60\u53BF",
          "411222": "\u9655\u53BF",
          "411224": "\u5362\u6C0F\u53BF",
          "411281": "\u4E49\u9A6C\u5E02",
          "411282": "\u7075\u5B9D\u5E02",
          "411283": "\u5176\u5B83\u533A",
          "411300": "\u5357\u9633\u5E02",
          "411302": "\u5B9B\u57CE\u533A",
          "411303": "\u5367\u9F99\u533A",
          "411321": "\u5357\u53EC\u53BF",
          "411322": "\u65B9\u57CE\u53BF",
          "411323": "\u897F\u5CE1\u53BF",
          "411324": "\u9547\u5E73\u53BF",
          "411325": "\u5185\u4E61\u53BF",
          "411326": "\u6DC5\u5DDD\u53BF",
          "411327": "\u793E\u65D7\u53BF",
          "411328": "\u5510\u6CB3\u53BF",
          "411329": "\u65B0\u91CE\u53BF",
          "411330": "\u6850\u67CF\u53BF",
          "411381": "\u9093\u5DDE\u5E02",
          "411382": "\u5176\u5B83\u533A",
          "411400": "\u5546\u4E18\u5E02",
          "411402": "\u6881\u56ED\u533A",
          "411403": "\u7762\u9633\u533A",
          "411421": "\u6C11\u6743\u53BF",
          "411422": "\u7762\u53BF",
          "411423": "\u5B81\u9675\u53BF",
          "411424": "\u67D8\u57CE\u53BF",
          "411425": "\u865E\u57CE\u53BF",
          "411426": "\u590F\u9091\u53BF",
          "411481": "\u6C38\u57CE\u5E02",
          "411482": "\u5176\u5B83\u533A",
          "411500": "\u4FE1\u9633\u5E02",
          "411502": "\u6D49\u6CB3\u533A",
          "411503": "\u5E73\u6865\u533A",
          "411521": "\u7F57\u5C71\u53BF",
          "411522": "\u5149\u5C71\u53BF",
          "411523": "\u65B0\u53BF",
          "411524": "\u5546\u57CE\u53BF",
          "411525": "\u56FA\u59CB\u53BF",
          "411526": "\u6F62\u5DDD\u53BF",
          "411527": "\u6DEE\u6EE8\u53BF",
          "411528": "\u606F\u53BF",
          "411529": "\u5176\u5B83\u533A",
          "411600": "\u5468\u53E3\u5E02",
          "411602": "\u5DDD\u6C47\u533A",
          "411621": "\u6276\u6C9F\u53BF",
          "411622": "\u897F\u534E\u53BF",
          "411623": "\u5546\u6C34\u53BF",
          "411624": "\u6C88\u4E18\u53BF",
          "411625": "\u90F8\u57CE\u53BF",
          "411626": "\u6DEE\u9633\u53BF",
          "411627": "\u592A\u5EB7\u53BF",
          "411628": "\u9E7F\u9091\u53BF",
          "411681": "\u9879\u57CE\u5E02",
          "411682": "\u5176\u5B83\u533A",
          "411700": "\u9A7B\u9A6C\u5E97\u5E02",
          "411702": "\u9A7F\u57CE\u533A",
          "411721": "\u897F\u5E73\u53BF",
          "411722": "\u4E0A\u8521\u53BF",
          "411723": "\u5E73\u8206\u53BF",
          "411724": "\u6B63\u9633\u53BF",
          "411725": "\u786E\u5C71\u53BF",
          "411726": "\u6CCC\u9633\u53BF",
          "411727": "\u6C5D\u5357\u53BF",
          "411728": "\u9042\u5E73\u53BF",
          "411729": "\u65B0\u8521\u53BF",
          "411730": "\u5176\u5B83\u533A",
          "420000": "\u6E56\u5317\u7701",
          "420100": "\u6B66\u6C49\u5E02",
          "420102": "\u6C5F\u5CB8\u533A",
          "420103": "\u6C5F\u6C49\u533A",
          "420104": "\u785A\u53E3\u533A",
          "420105": "\u6C49\u9633\u533A",
          "420106": "\u6B66\u660C\u533A",
          "420107": "\u9752\u5C71\u533A",
          "420111": "\u6D2A\u5C71\u533A",
          "420112": "\u4E1C\u897F\u6E56\u533A",
          "420113": "\u6C49\u5357\u533A",
          "420114": "\u8521\u7538\u533A",
          "420115": "\u6C5F\u590F\u533A",
          "420116": "\u9EC4\u9642\u533A",
          "420117": "\u65B0\u6D32\u533A",
          "420118": "\u5176\u5B83\u533A",
          "420200": "\u9EC4\u77F3\u5E02",
          "420202": "\u9EC4\u77F3\u6E2F\u533A",
          "420203": "\u897F\u585E\u5C71\u533A",
          "420204": "\u4E0B\u9646\u533A",
          "420205": "\u94C1\u5C71\u533A",
          "420222": "\u9633\u65B0\u53BF",
          "420281": "\u5927\u51B6\u5E02",
          "420282": "\u5176\u5B83\u533A",
          "420300": "\u5341\u5830\u5E02",
          "420302": "\u8305\u7BAD\u533A",
          "420303": "\u5F20\u6E7E\u533A",
          "420321": "\u90E7\u53BF",
          "420322": "\u90E7\u897F\u53BF",
          "420323": "\u7AF9\u5C71\u53BF",
          "420324": "\u7AF9\u6EAA\u53BF",
          "420325": "\u623F\u53BF",
          "420381": "\u4E39\u6C5F\u53E3\u5E02",
          "420383": "\u5176\u5B83\u533A",
          "420500": "\u5B9C\u660C\u5E02",
          "420502": "\u897F\u9675\u533A",
          "420503": "\u4F0D\u5BB6\u5C97\u533A",
          "420504": "\u70B9\u519B\u533A",
          "420505": "\u7307\u4EAD\u533A",
          "420506": "\u5937\u9675\u533A",
          "420525": "\u8FDC\u5B89\u53BF",
          "420526": "\u5174\u5C71\u53BF",
          "420527": "\u79ED\u5F52\u53BF",
          "420528": "\u957F\u9633\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF",
          "420529": "\u4E94\u5CF0\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF",
          "420581": "\u5B9C\u90FD\u5E02",
          "420582": "\u5F53\u9633\u5E02",
          "420583": "\u679D\u6C5F\u5E02",
          "420584": "\u5176\u5B83\u533A",
          "420600": "\u8944\u9633\u5E02",
          "420602": "\u8944\u57CE\u533A",
          "420606": "\u6A0A\u57CE\u533A",
          "420607": "\u8944\u5DDE\u533A",
          "420624": "\u5357\u6F33\u53BF",
          "420625": "\u8C37\u57CE\u53BF",
          "420626": "\u4FDD\u5EB7\u53BF",
          "420682": "\u8001\u6CB3\u53E3\u5E02",
          "420683": "\u67A3\u9633\u5E02",
          "420684": "\u5B9C\u57CE\u5E02",
          "420685": "\u5176\u5B83\u533A",
          "420700": "\u9102\u5DDE\u5E02",
          "420702": "\u6881\u5B50\u6E56\u533A",
          "420703": "\u534E\u5BB9\u533A",
          "420704": "\u9102\u57CE\u533A",
          "420705": "\u5176\u5B83\u533A",
          "420800": "\u8346\u95E8\u5E02",
          "420802": "\u4E1C\u5B9D\u533A",
          "420804": "\u6387\u5200\u533A",
          "420821": "\u4EAC\u5C71\u53BF",
          "420822": "\u6C99\u6D0B\u53BF",
          "420881": "\u949F\u7965\u5E02",
          "420882": "\u5176\u5B83\u533A",
          "420900": "\u5B5D\u611F\u5E02",
          "420902": "\u5B5D\u5357\u533A",
          "420921": "\u5B5D\u660C\u53BF",
          "420922": "\u5927\u609F\u53BF",
          "420923": "\u4E91\u68A6\u53BF",
          "420981": "\u5E94\u57CE\u5E02",
          "420982": "\u5B89\u9646\u5E02",
          "420984": "\u6C49\u5DDD\u5E02",
          "420985": "\u5176\u5B83\u533A",
          "421000": "\u8346\u5DDE\u5E02",
          "421002": "\u6C99\u5E02\u533A",
          "421003": "\u8346\u5DDE\u533A",
          "421022": "\u516C\u5B89\u53BF",
          "421023": "\u76D1\u5229\u53BF",
          "421024": "\u6C5F\u9675\u53BF",
          "421081": "\u77F3\u9996\u5E02",
          "421083": "\u6D2A\u6E56\u5E02",
          "421087": "\u677E\u6ECB\u5E02",
          "421088": "\u5176\u5B83\u533A",
          "421100": "\u9EC4\u5188\u5E02",
          "421102": "\u9EC4\u5DDE\u533A",
          "421121": "\u56E2\u98CE\u53BF",
          "421122": "\u7EA2\u5B89\u53BF",
          "421123": "\u7F57\u7530\u53BF",
          "421124": "\u82F1\u5C71\u53BF",
          "421125": "\u6D60\u6C34\u53BF",
          "421126": "\u8572\u6625\u53BF",
          "421127": "\u9EC4\u6885\u53BF",
          "421181": "\u9EBB\u57CE\u5E02",
          "421182": "\u6B66\u7A74\u5E02",
          "421183": "\u5176\u5B83\u533A",
          "421200": "\u54B8\u5B81\u5E02",
          "421202": "\u54B8\u5B89\u533A",
          "421221": "\u5609\u9C7C\u53BF",
          "421222": "\u901A\u57CE\u53BF",
          "421223": "\u5D07\u9633\u53BF",
          "421224": "\u901A\u5C71\u53BF",
          "421281": "\u8D64\u58C1\u5E02",
          "421283": "\u5176\u5B83\u533A",
          "421300": "\u968F\u5DDE\u5E02",
          "421302": "\u66FE\u90FD\u533A",
          "421321": "\u968F\u53BF",
          "421381": "\u5E7F\u6C34\u5E02",
          "421382": "\u5176\u5B83\u533A",
          "422800": "\u6069\u65BD\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE",
          "422801": "\u6069\u65BD\u5E02",
          "422802": "\u5229\u5DDD\u5E02",
          "422822": "\u5EFA\u59CB\u53BF",
          "422823": "\u5DF4\u4E1C\u53BF",
          "422825": "\u5BA3\u6069\u53BF",
          "422826": "\u54B8\u4E30\u53BF",
          "422827": "\u6765\u51E4\u53BF",
          "422828": "\u9E64\u5CF0\u53BF",
          "422829": "\u5176\u5B83\u533A",
          "429004": "\u4ED9\u6843\u5E02",
          "429005": "\u6F5C\u6C5F\u5E02",
          "429006": "\u5929\u95E8\u5E02",
          "429021": "\u795E\u519C\u67B6\u6797\u533A",
          "430000": "\u6E56\u5357\u7701",
          "430100": "\u957F\u6C99\u5E02",
          "430102": "\u8299\u84C9\u533A",
          "430103": "\u5929\u5FC3\u533A",
          "430104": "\u5CB3\u9E93\u533A",
          "430105": "\u5F00\u798F\u533A",
          "430111": "\u96E8\u82B1\u533A",
          "430121": "\u957F\u6C99\u53BF",
          "430122": "\u671B\u57CE\u533A",
          "430124": "\u5B81\u4E61\u53BF",
          "430181": "\u6D4F\u9633\u5E02",
          "430182": "\u5176\u5B83\u533A",
          "430200": "\u682A\u6D32\u5E02",
          "430202": "\u8377\u5858\u533A",
          "430203": "\u82A6\u6DDE\u533A",
          "430204": "\u77F3\u5CF0\u533A",
          "430211": "\u5929\u5143\u533A",
          "430221": "\u682A\u6D32\u53BF",
          "430223": "\u6538\u53BF",
          "430224": "\u8336\u9675\u53BF",
          "430225": "\u708E\u9675\u53BF",
          "430281": "\u91B4\u9675\u5E02",
          "430282": "\u5176\u5B83\u533A",
          "430300": "\u6E58\u6F6D\u5E02",
          "430302": "\u96E8\u6E56\u533A",
          "430304": "\u5CB3\u5858\u533A",
          "430321": "\u6E58\u6F6D\u53BF",
          "430381": "\u6E58\u4E61\u5E02",
          "430382": "\u97F6\u5C71\u5E02",
          "430383": "\u5176\u5B83\u533A",
          "430400": "\u8861\u9633\u5E02",
          "430405": "\u73E0\u6656\u533A",
          "430406": "\u96C1\u5CF0\u533A",
          "430407": "\u77F3\u9F13\u533A",
          "430408": "\u84B8\u6E58\u533A",
          "430412": "\u5357\u5CB3\u533A",
          "430421": "\u8861\u9633\u53BF",
          "430422": "\u8861\u5357\u53BF",
          "430423": "\u8861\u5C71\u53BF",
          "430424": "\u8861\u4E1C\u53BF",
          "430426": "\u7941\u4E1C\u53BF",
          "430481": "\u8012\u9633\u5E02",
          "430482": "\u5E38\u5B81\u5E02",
          "430483": "\u5176\u5B83\u533A",
          "430500": "\u90B5\u9633\u5E02",
          "430502": "\u53CC\u6E05\u533A",
          "430503": "\u5927\u7965\u533A",
          "430511": "\u5317\u5854\u533A",
          "430521": "\u90B5\u4E1C\u53BF",
          "430522": "\u65B0\u90B5\u53BF",
          "430523": "\u90B5\u9633\u53BF",
          "430524": "\u9686\u56DE\u53BF",
          "430525": "\u6D1E\u53E3\u53BF",
          "430527": "\u7EE5\u5B81\u53BF",
          "430528": "\u65B0\u5B81\u53BF",
          "430529": "\u57CE\u6B65\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "430581": "\u6B66\u5188\u5E02",
          "430582": "\u5176\u5B83\u533A",
          "430600": "\u5CB3\u9633\u5E02",
          "430602": "\u5CB3\u9633\u697C\u533A",
          "430603": "\u4E91\u6EAA\u533A",
          "430611": "\u541B\u5C71\u533A",
          "430621": "\u5CB3\u9633\u53BF",
          "430623": "\u534E\u5BB9\u53BF",
          "430624": "\u6E58\u9634\u53BF",
          "430626": "\u5E73\u6C5F\u53BF",
          "430681": "\u6C68\u7F57\u5E02",
          "430682": "\u4E34\u6E58\u5E02",
          "430683": "\u5176\u5B83\u533A",
          "430700": "\u5E38\u5FB7\u5E02",
          "430702": "\u6B66\u9675\u533A",
          "430703": "\u9F0E\u57CE\u533A",
          "430721": "\u5B89\u4E61\u53BF",
          "430722": "\u6C49\u5BFF\u53BF",
          "430723": "\u6FA7\u53BF",
          "430724": "\u4E34\u6FA7\u53BF",
          "430725": "\u6843\u6E90\u53BF",
          "430726": "\u77F3\u95E8\u53BF",
          "430781": "\u6D25\u5E02\u5E02",
          "430782": "\u5176\u5B83\u533A",
          "430800": "\u5F20\u5BB6\u754C\u5E02",
          "430802": "\u6C38\u5B9A\u533A",
          "430811": "\u6B66\u9675\u6E90\u533A",
          "430821": "\u6148\u5229\u53BF",
          "430822": "\u6851\u690D\u53BF",
          "430823": "\u5176\u5B83\u533A",
          "430900": "\u76CA\u9633\u5E02",
          "430902": "\u8D44\u9633\u533A",
          "430903": "\u8D6B\u5C71\u533A",
          "430921": "\u5357\u53BF",
          "430922": "\u6843\u6C5F\u53BF",
          "430923": "\u5B89\u5316\u53BF",
          "430981": "\u6C85\u6C5F\u5E02",
          "430982": "\u5176\u5B83\u533A",
          "431000": "\u90F4\u5DDE\u5E02",
          "431002": "\u5317\u6E56\u533A",
          "431003": "\u82CF\u4ED9\u533A",
          "431021": "\u6842\u9633\u53BF",
          "431022": "\u5B9C\u7AE0\u53BF",
          "431023": "\u6C38\u5174\u53BF",
          "431024": "\u5609\u79BE\u53BF",
          "431025": "\u4E34\u6B66\u53BF",
          "431026": "\u6C5D\u57CE\u53BF",
          "431027": "\u6842\u4E1C\u53BF",
          "431028": "\u5B89\u4EC1\u53BF",
          "431081": "\u8D44\u5174\u5E02",
          "431082": "\u5176\u5B83\u533A",
          "431100": "\u6C38\u5DDE\u5E02",
          "431102": "\u96F6\u9675\u533A",
          "431103": "\u51B7\u6C34\u6EE9\u533A",
          "431121": "\u7941\u9633\u53BF",
          "431122": "\u4E1C\u5B89\u53BF",
          "431123": "\u53CC\u724C\u53BF",
          "431124": "\u9053\u53BF",
          "431125": "\u6C5F\u6C38\u53BF",
          "431126": "\u5B81\u8FDC\u53BF",
          "431127": "\u84DD\u5C71\u53BF",
          "431128": "\u65B0\u7530\u53BF",
          "431129": "\u6C5F\u534E\u7476\u65CF\u81EA\u6CBB\u53BF",
          "431130": "\u5176\u5B83\u533A",
          "431200": "\u6000\u5316\u5E02",
          "431202": "\u9E64\u57CE\u533A",
          "431221": "\u4E2D\u65B9\u53BF",
          "431222": "\u6C85\u9675\u53BF",
          "431223": "\u8FB0\u6EAA\u53BF",
          "431224": "\u6E86\u6D66\u53BF",
          "431225": "\u4F1A\u540C\u53BF",
          "431226": "\u9EBB\u9633\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "431227": "\u65B0\u6643\u4F97\u65CF\u81EA\u6CBB\u53BF",
          "431228": "\u82B7\u6C5F\u4F97\u65CF\u81EA\u6CBB\u53BF",
          "431229": "\u9756\u5DDE\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u53BF",
          "431230": "\u901A\u9053\u4F97\u65CF\u81EA\u6CBB\u53BF",
          "431281": "\u6D2A\u6C5F\u5E02",
          "431282": "\u5176\u5B83\u533A",
          "431300": "\u5A04\u5E95\u5E02",
          "431302": "\u5A04\u661F\u533A",
          "431321": "\u53CC\u5CF0\u53BF",
          "431322": "\u65B0\u5316\u53BF",
          "431381": "\u51B7\u6C34\u6C5F\u5E02",
          "431382": "\u6D9F\u6E90\u5E02",
          "431383": "\u5176\u5B83\u533A",
          "433100": "\u6E58\u897F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE",
          "433101": "\u5409\u9996\u5E02",
          "433122": "\u6CF8\u6EAA\u53BF",
          "433123": "\u51E4\u51F0\u53BF",
          "433124": "\u82B1\u57A3\u53BF",
          "433125": "\u4FDD\u9756\u53BF",
          "433126": "\u53E4\u4E08\u53BF",
          "433127": "\u6C38\u987A\u53BF",
          "433130": "\u9F99\u5C71\u53BF",
          "433131": "\u5176\u5B83\u533A",
          "440000": "\u5E7F\u4E1C\u7701",
          "440100": "\u5E7F\u5DDE\u5E02",
          "440103": "\u8354\u6E7E\u533A",
          "440104": "\u8D8A\u79C0\u533A",
          "440105": "\u6D77\u73E0\u533A",
          "440106": "\u5929\u6CB3\u533A",
          "440111": "\u767D\u4E91\u533A",
          "440112": "\u9EC4\u57D4\u533A",
          "440113": "\u756A\u79BA\u533A",
          "440114": "\u82B1\u90FD\u533A",
          "440115": "\u5357\u6C99\u533A",
          "440116": "\u841D\u5C97\u533A",
          "440183": "\u589E\u57CE\u5E02",
          "440184": "\u4ECE\u5316\u5E02",
          "440189": "\u5176\u5B83\u533A",
          "440200": "\u97F6\u5173\u5E02",
          "440203": "\u6B66\u6C5F\u533A",
          "440204": "\u6D48\u6C5F\u533A",
          "440205": "\u66F2\u6C5F\u533A",
          "440222": "\u59CB\u5174\u53BF",
          "440224": "\u4EC1\u5316\u53BF",
          "440229": "\u7FC1\u6E90\u53BF",
          "440232": "\u4E73\u6E90\u7476\u65CF\u81EA\u6CBB\u53BF",
          "440233": "\u65B0\u4E30\u53BF",
          "440281": "\u4E50\u660C\u5E02",
          "440282": "\u5357\u96C4\u5E02",
          "440283": "\u5176\u5B83\u533A",
          "440300": "\u6DF1\u5733\u5E02",
          "440303": "\u7F57\u6E56\u533A",
          "440304": "\u798F\u7530\u533A",
          "440305": "\u5357\u5C71\u533A",
          "440306": "\u5B9D\u5B89\u533A",
          "440307": "\u9F99\u5C97\u533A",
          "440308": "\u76D0\u7530\u533A",
          "440309": "\u5176\u5B83\u533A",
          "440320": "\u5149\u660E\u65B0\u533A",
          "440321": "\u576A\u5C71\u65B0\u533A",
          "440322": "\u5927\u9E4F\u65B0\u533A",
          "440323": "\u9F99\u534E\u65B0\u533A",
          "440400": "\u73E0\u6D77\u5E02",
          "440402": "\u9999\u6D32\u533A",
          "440403": "\u6597\u95E8\u533A",
          "440404": "\u91D1\u6E7E\u533A",
          "440488": "\u5176\u5B83\u533A",
          "440500": "\u6C55\u5934\u5E02",
          "440507": "\u9F99\u6E56\u533A",
          "440511": "\u91D1\u5E73\u533A",
          "440512": "\u6FE0\u6C5F\u533A",
          "440513": "\u6F6E\u9633\u533A",
          "440514": "\u6F6E\u5357\u533A",
          "440515": "\u6F84\u6D77\u533A",
          "440523": "\u5357\u6FB3\u53BF",
          "440524": "\u5176\u5B83\u533A",
          "440600": "\u4F5B\u5C71\u5E02",
          "440604": "\u7985\u57CE\u533A",
          "440605": "\u5357\u6D77\u533A",
          "440606": "\u987A\u5FB7\u533A",
          "440607": "\u4E09\u6C34\u533A",
          "440608": "\u9AD8\u660E\u533A",
          "440609": "\u5176\u5B83\u533A",
          "440700": "\u6C5F\u95E8\u5E02",
          "440703": "\u84EC\u6C5F\u533A",
          "440704": "\u6C5F\u6D77\u533A",
          "440705": "\u65B0\u4F1A\u533A",
          "440781": "\u53F0\u5C71\u5E02",
          "440783": "\u5F00\u5E73\u5E02",
          "440784": "\u9E64\u5C71\u5E02",
          "440785": "\u6069\u5E73\u5E02",
          "440786": "\u5176\u5B83\u533A",
          "440800": "\u6E5B\u6C5F\u5E02",
          "440802": "\u8D64\u574E\u533A",
          "440803": "\u971E\u5C71\u533A",
          "440804": "\u5761\u5934\u533A",
          "440811": "\u9EBB\u7AE0\u533A",
          "440823": "\u9042\u6EAA\u53BF",
          "440825": "\u5F90\u95FB\u53BF",
          "440881": "\u5EC9\u6C5F\u5E02",
          "440882": "\u96F7\u5DDE\u5E02",
          "440883": "\u5434\u5DDD\u5E02",
          "440884": "\u5176\u5B83\u533A",
          "440900": "\u8302\u540D\u5E02",
          "440902": "\u8302\u5357\u533A",
          "440903": "\u8302\u6E2F\u533A",
          "440923": "\u7535\u767D\u53BF",
          "440981": "\u9AD8\u5DDE\u5E02",
          "440982": "\u5316\u5DDE\u5E02",
          "440983": "\u4FE1\u5B9C\u5E02",
          "440984": "\u5176\u5B83\u533A",
          "441200": "\u8087\u5E86\u5E02",
          "441202": "\u7AEF\u5DDE\u533A",
          "441203": "\u9F0E\u6E56\u533A",
          "441223": "\u5E7F\u5B81\u53BF",
          "441224": "\u6000\u96C6\u53BF",
          "441225": "\u5C01\u5F00\u53BF",
          "441226": "\u5FB7\u5E86\u53BF",
          "441283": "\u9AD8\u8981\u5E02",
          "441284": "\u56DB\u4F1A\u5E02",
          "441285": "\u5176\u5B83\u533A",
          "441300": "\u60E0\u5DDE\u5E02",
          "441302": "\u60E0\u57CE\u533A",
          "441303": "\u60E0\u9633\u533A",
          "441322": "\u535A\u7F57\u53BF",
          "441323": "\u60E0\u4E1C\u53BF",
          "441324": "\u9F99\u95E8\u53BF",
          "441325": "\u5176\u5B83\u533A",
          "441400": "\u6885\u5DDE\u5E02",
          "441402": "\u6885\u6C5F\u533A",
          "441421": "\u6885\u53BF",
          "441422": "\u5927\u57D4\u53BF",
          "441423": "\u4E30\u987A\u53BF",
          "441424": "\u4E94\u534E\u53BF",
          "441426": "\u5E73\u8FDC\u53BF",
          "441427": "\u8549\u5CAD\u53BF",
          "441481": "\u5174\u5B81\u5E02",
          "441482": "\u5176\u5B83\u533A",
          "441500": "\u6C55\u5C3E\u5E02",
          "441502": "\u57CE\u533A",
          "441521": "\u6D77\u4E30\u53BF",
          "441523": "\u9646\u6CB3\u53BF",
          "441581": "\u9646\u4E30\u5E02",
          "441582": "\u5176\u5B83\u533A",
          "441600": "\u6CB3\u6E90\u5E02",
          "441602": "\u6E90\u57CE\u533A",
          "441621": "\u7D2B\u91D1\u53BF",
          "441622": "\u9F99\u5DDD\u53BF",
          "441623": "\u8FDE\u5E73\u53BF",
          "441624": "\u548C\u5E73\u53BF",
          "441625": "\u4E1C\u6E90\u53BF",
          "441626": "\u5176\u5B83\u533A",
          "441700": "\u9633\u6C5F\u5E02",
          "441702": "\u6C5F\u57CE\u533A",
          "441721": "\u9633\u897F\u53BF",
          "441723": "\u9633\u4E1C\u53BF",
          "441781": "\u9633\u6625\u5E02",
          "441782": "\u5176\u5B83\u533A",
          "441800": "\u6E05\u8FDC\u5E02",
          "441802": "\u6E05\u57CE\u533A",
          "441821": "\u4F5B\u5188\u53BF",
          "441823": "\u9633\u5C71\u53BF",
          "441825": "\u8FDE\u5C71\u58EE\u65CF\u7476\u65CF\u81EA\u6CBB\u53BF",
          "441826": "\u8FDE\u5357\u7476\u65CF\u81EA\u6CBB\u53BF",
          "441827": "\u6E05\u65B0\u533A",
          "441881": "\u82F1\u5FB7\u5E02",
          "441882": "\u8FDE\u5DDE\u5E02",
          "441883": "\u5176\u5B83\u533A",
          "441900": "\u4E1C\u839E\u5E02",
          "442000": "\u4E2D\u5C71\u5E02",
          "442101": "\u4E1C\u6C99\u7FA4\u5C9B",
          "445100": "\u6F6E\u5DDE\u5E02",
          "445102": "\u6E58\u6865\u533A",
          "445121": "\u6F6E\u5B89\u533A",
          "445122": "\u9976\u5E73\u53BF",
          "445186": "\u5176\u5B83\u533A",
          "445200": "\u63ED\u9633\u5E02",
          "445202": "\u6995\u57CE\u533A",
          "445221": "\u63ED\u4E1C\u533A",
          "445222": "\u63ED\u897F\u53BF",
          "445224": "\u60E0\u6765\u53BF",
          "445281": "\u666E\u5B81\u5E02",
          "445285": "\u5176\u5B83\u533A",
          "445300": "\u4E91\u6D6E\u5E02",
          "445302": "\u4E91\u57CE\u533A",
          "445321": "\u65B0\u5174\u53BF",
          "445322": "\u90C1\u5357\u53BF",
          "445323": "\u4E91\u5B89\u53BF",
          "445381": "\u7F57\u5B9A\u5E02",
          "445382": "\u5176\u5B83\u533A",
          "450000": "\u5E7F\u897F\u58EE\u65CF\u81EA\u6CBB\u533A",
          "450100": "\u5357\u5B81\u5E02",
          "450102": "\u5174\u5B81\u533A",
          "450103": "\u9752\u79C0\u533A",
          "450105": "\u6C5F\u5357\u533A",
          "450107": "\u897F\u4E61\u5858\u533A",
          "450108": "\u826F\u5E86\u533A",
          "450109": "\u9095\u5B81\u533A",
          "450122": "\u6B66\u9E23\u53BF",
          "450123": "\u9686\u5B89\u53BF",
          "450124": "\u9A6C\u5C71\u53BF",
          "450125": "\u4E0A\u6797\u53BF",
          "450126": "\u5BBE\u9633\u53BF",
          "450127": "\u6A2A\u53BF",
          "450128": "\u5176\u5B83\u533A",
          "450200": "\u67F3\u5DDE\u5E02",
          "450202": "\u57CE\u4E2D\u533A",
          "450203": "\u9C7C\u5CF0\u533A",
          "450204": "\u67F3\u5357\u533A",
          "450205": "\u67F3\u5317\u533A",
          "450221": "\u67F3\u6C5F\u53BF",
          "450222": "\u67F3\u57CE\u53BF",
          "450223": "\u9E7F\u5BE8\u53BF",
          "450224": "\u878D\u5B89\u53BF",
          "450225": "\u878D\u6C34\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "450226": "\u4E09\u6C5F\u4F97\u65CF\u81EA\u6CBB\u53BF",
          "450227": "\u5176\u5B83\u533A",
          "450300": "\u6842\u6797\u5E02",
          "450302": "\u79C0\u5CF0\u533A",
          "450303": "\u53E0\u5F69\u533A",
          "450304": "\u8C61\u5C71\u533A",
          "450305": "\u4E03\u661F\u533A",
          "450311": "\u96C1\u5C71\u533A",
          "450321": "\u9633\u6714\u53BF",
          "450322": "\u4E34\u6842\u533A",
          "450323": "\u7075\u5DDD\u53BF",
          "450324": "\u5168\u5DDE\u53BF",
          "450325": "\u5174\u5B89\u53BF",
          "450326": "\u6C38\u798F\u53BF",
          "450327": "\u704C\u9633\u53BF",
          "450328": "\u9F99\u80DC\u5404\u65CF\u81EA\u6CBB\u53BF",
          "450329": "\u8D44\u6E90\u53BF",
          "450330": "\u5E73\u4E50\u53BF",
          "450331": "\u8354\u6D66\u53BF",
          "450332": "\u606D\u57CE\u7476\u65CF\u81EA\u6CBB\u53BF",
          "450333": "\u5176\u5B83\u533A",
          "450400": "\u68A7\u5DDE\u5E02",
          "450403": "\u4E07\u79C0\u533A",
          "450405": "\u957F\u6D32\u533A",
          "450406": "\u9F99\u5729\u533A",
          "450421": "\u82CD\u68A7\u53BF",
          "450422": "\u85E4\u53BF",
          "450423": "\u8499\u5C71\u53BF",
          "450481": "\u5C91\u6EAA\u5E02",
          "450482": "\u5176\u5B83\u533A",
          "450500": "\u5317\u6D77\u5E02",
          "450502": "\u6D77\u57CE\u533A",
          "450503": "\u94F6\u6D77\u533A",
          "450512": "\u94C1\u5C71\u6E2F\u533A",
          "450521": "\u5408\u6D66\u53BF",
          "450522": "\u5176\u5B83\u533A",
          "450600": "\u9632\u57CE\u6E2F\u5E02",
          "450602": "\u6E2F\u53E3\u533A",
          "450603": "\u9632\u57CE\u533A",
          "450621": "\u4E0A\u601D\u53BF",
          "450681": "\u4E1C\u5174\u5E02",
          "450682": "\u5176\u5B83\u533A",
          "450700": "\u94A6\u5DDE\u5E02",
          "450702": "\u94A6\u5357\u533A",
          "450703": "\u94A6\u5317\u533A",
          "450721": "\u7075\u5C71\u53BF",
          "450722": "\u6D66\u5317\u53BF",
          "450723": "\u5176\u5B83\u533A",
          "450800": "\u8D35\u6E2F\u5E02",
          "450802": "\u6E2F\u5317\u533A",
          "450803": "\u6E2F\u5357\u533A",
          "450804": "\u8983\u5858\u533A",
          "450821": "\u5E73\u5357\u53BF",
          "450881": "\u6842\u5E73\u5E02",
          "450882": "\u5176\u5B83\u533A",
          "450900": "\u7389\u6797\u5E02",
          "450902": "\u7389\u5DDE\u533A",
          "450903": "\u798F\u7EF5\u533A",
          "450921": "\u5BB9\u53BF",
          "450922": "\u9646\u5DDD\u53BF",
          "450923": "\u535A\u767D\u53BF",
          "450924": "\u5174\u4E1A\u53BF",
          "450981": "\u5317\u6D41\u5E02",
          "450982": "\u5176\u5B83\u533A",
          "451000": "\u767E\u8272\u5E02",
          "451002": "\u53F3\u6C5F\u533A",
          "451021": "\u7530\u9633\u53BF",
          "451022": "\u7530\u4E1C\u53BF",
          "451023": "\u5E73\u679C\u53BF",
          "451024": "\u5FB7\u4FDD\u53BF",
          "451025": "\u9756\u897F\u53BF",
          "451026": "\u90A3\u5761\u53BF",
          "451027": "\u51CC\u4E91\u53BF",
          "451028": "\u4E50\u4E1A\u53BF",
          "451029": "\u7530\u6797\u53BF",
          "451030": "\u897F\u6797\u53BF",
          "451031": "\u9686\u6797\u5404\u65CF\u81EA\u6CBB\u53BF",
          "451032": "\u5176\u5B83\u533A",
          "451100": "\u8D3A\u5DDE\u5E02",
          "451102": "\u516B\u6B65\u533A",
          "451119": "\u5E73\u6842\u7BA1\u7406\u533A",
          "451121": "\u662D\u5E73\u53BF",
          "451122": "\u949F\u5C71\u53BF",
          "451123": "\u5BCC\u5DDD\u7476\u65CF\u81EA\u6CBB\u53BF",
          "451124": "\u5176\u5B83\u533A",
          "451200": "\u6CB3\u6C60\u5E02",
          "451202": "\u91D1\u57CE\u6C5F\u533A",
          "451221": "\u5357\u4E39\u53BF",
          "451222": "\u5929\u5CE8\u53BF",
          "451223": "\u51E4\u5C71\u53BF",
          "451224": "\u4E1C\u5170\u53BF",
          "451225": "\u7F57\u57CE\u4EEB\u4F6C\u65CF\u81EA\u6CBB\u53BF",
          "451226": "\u73AF\u6C5F\u6BDB\u5357\u65CF\u81EA\u6CBB\u53BF",
          "451227": "\u5DF4\u9A6C\u7476\u65CF\u81EA\u6CBB\u53BF",
          "451228": "\u90FD\u5B89\u7476\u65CF\u81EA\u6CBB\u53BF",
          "451229": "\u5927\u5316\u7476\u65CF\u81EA\u6CBB\u53BF",
          "451281": "\u5B9C\u5DDE\u5E02",
          "451282": "\u5176\u5B83\u533A",
          "451300": "\u6765\u5BBE\u5E02",
          "451302": "\u5174\u5BBE\u533A",
          "451321": "\u5FFB\u57CE\u53BF",
          "451322": "\u8C61\u5DDE\u53BF",
          "451323": "\u6B66\u5BA3\u53BF",
          "451324": "\u91D1\u79C0\u7476\u65CF\u81EA\u6CBB\u53BF",
          "451381": "\u5408\u5C71\u5E02",
          "451382": "\u5176\u5B83\u533A",
          "451400": "\u5D07\u5DE6\u5E02",
          "451402": "\u6C5F\u5DDE\u533A",
          "451421": "\u6276\u7EE5\u53BF",
          "451422": "\u5B81\u660E\u53BF",
          "451423": "\u9F99\u5DDE\u53BF",
          "451424": "\u5927\u65B0\u53BF",
          "451425": "\u5929\u7B49\u53BF",
          "451481": "\u51ED\u7965\u5E02",
          "451482": "\u5176\u5B83\u533A",
          "460000": "\u6D77\u5357\u7701",
          "460100": "\u6D77\u53E3\u5E02",
          "460105": "\u79C0\u82F1\u533A",
          "460106": "\u9F99\u534E\u533A",
          "460107": "\u743C\u5C71\u533A",
          "460108": "\u7F8E\u5170\u533A",
          "460109": "\u5176\u5B83\u533A",
          "460200": "\u4E09\u4E9A\u5E02",
          "460300": "\u4E09\u6C99\u5E02",
          "460321": "\u897F\u6C99\u7FA4\u5C9B",
          "460322": "\u5357\u6C99\u7FA4\u5C9B",
          "460323": "\u4E2D\u6C99\u7FA4\u5C9B\u7684\u5C9B\u7901\u53CA\u5176\u6D77\u57DF",
          "469001": "\u4E94\u6307\u5C71\u5E02",
          "469002": "\u743C\u6D77\u5E02",
          "469003": "\u510B\u5DDE\u5E02",
          "469005": "\u6587\u660C\u5E02",
          "469006": "\u4E07\u5B81\u5E02",
          "469007": "\u4E1C\u65B9\u5E02",
          "469025": "\u5B9A\u5B89\u53BF",
          "469026": "\u5C6F\u660C\u53BF",
          "469027": "\u6F84\u8FC8\u53BF",
          "469028": "\u4E34\u9AD8\u53BF",
          "469030": "\u767D\u6C99\u9ECE\u65CF\u81EA\u6CBB\u53BF",
          "469031": "\u660C\u6C5F\u9ECE\u65CF\u81EA\u6CBB\u53BF",
          "469033": "\u4E50\u4E1C\u9ECE\u65CF\u81EA\u6CBB\u53BF",
          "469034": "\u9675\u6C34\u9ECE\u65CF\u81EA\u6CBB\u53BF",
          "469035": "\u4FDD\u4EAD\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "469036": "\u743C\u4E2D\u9ECE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "471005": "\u5176\u5B83\u533A",
          "500000": "\u91CD\u5E86",
          "500100": "\u91CD\u5E86\u5E02",
          "500101": "\u4E07\u5DDE\u533A",
          "500102": "\u6DAA\u9675\u533A",
          "500103": "\u6E1D\u4E2D\u533A",
          "500104": "\u5927\u6E21\u53E3\u533A",
          "500105": "\u6C5F\u5317\u533A",
          "500106": "\u6C99\u576A\u575D\u533A",
          "500107": "\u4E5D\u9F99\u5761\u533A",
          "500108": "\u5357\u5CB8\u533A",
          "500109": "\u5317\u789A\u533A",
          "500110": "\u4E07\u76DB\u533A",
          "500111": "\u53CC\u6865\u533A",
          "500112": "\u6E1D\u5317\u533A",
          "500113": "\u5DF4\u5357\u533A",
          "500114": "\u9ED4\u6C5F\u533A",
          "500115": "\u957F\u5BFF\u533A",
          "500222": "\u7DA6\u6C5F\u533A",
          "500223": "\u6F7C\u5357\u53BF",
          "500224": "\u94DC\u6881\u53BF",
          "500225": "\u5927\u8DB3\u533A",
          "500226": "\u8363\u660C\u53BF",
          "500227": "\u74A7\u5C71\u53BF",
          "500228": "\u6881\u5E73\u53BF",
          "500229": "\u57CE\u53E3\u53BF",
          "500230": "\u4E30\u90FD\u53BF",
          "500231": "\u57AB\u6C5F\u53BF",
          "500232": "\u6B66\u9686\u53BF",
          "500233": "\u5FE0\u53BF",
          "500234": "\u5F00\u53BF",
          "500235": "\u4E91\u9633\u53BF",
          "500236": "\u5949\u8282\u53BF",
          "500237": "\u5DEB\u5C71\u53BF",
          "500238": "\u5DEB\u6EAA\u53BF",
          "500240": "\u77F3\u67F1\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF",
          "500241": "\u79C0\u5C71\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "500242": "\u9149\u9633\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "500243": "\u5F6D\u6C34\u82D7\u65CF\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF",
          "500381": "\u6C5F\u6D25\u533A",
          "500382": "\u5408\u5DDD\u533A",
          "500383": "\u6C38\u5DDD\u533A",
          "500384": "\u5357\u5DDD\u533A",
          "500385": "\u5176\u5B83\u533A",
          "510000": "\u56DB\u5DDD\u7701",
          "510100": "\u6210\u90FD\u5E02",
          "510104": "\u9526\u6C5F\u533A",
          "510105": "\u9752\u7F8A\u533A",
          "510106": "\u91D1\u725B\u533A",
          "510107": "\u6B66\u4FAF\u533A",
          "510108": "\u6210\u534E\u533A",
          "510112": "\u9F99\u6CC9\u9A7F\u533A",
          "510113": "\u9752\u767D\u6C5F\u533A",
          "510114": "\u65B0\u90FD\u533A",
          "510115": "\u6E29\u6C5F\u533A",
          "510121": "\u91D1\u5802\u53BF",
          "510122": "\u53CC\u6D41\u53BF",
          "510124": "\u90EB\u53BF",
          "510129": "\u5927\u9091\u53BF",
          "510131": "\u84B2\u6C5F\u53BF",
          "510132": "\u65B0\u6D25\u53BF",
          "510181": "\u90FD\u6C5F\u5830\u5E02",
          "510182": "\u5F6D\u5DDE\u5E02",
          "510183": "\u909B\u5D03\u5E02",
          "510184": "\u5D07\u5DDE\u5E02",
          "510185": "\u5176\u5B83\u533A",
          "510300": "\u81EA\u8D21\u5E02",
          "510302": "\u81EA\u6D41\u4E95\u533A",
          "510303": "\u8D21\u4E95\u533A",
          "510304": "\u5927\u5B89\u533A",
          "510311": "\u6CBF\u6EE9\u533A",
          "510321": "\u8363\u53BF",
          "510322": "\u5BCC\u987A\u53BF",
          "510323": "\u5176\u5B83\u533A",
          "510400": "\u6500\u679D\u82B1\u5E02",
          "510402": "\u4E1C\u533A",
          "510403": "\u897F\u533A",
          "510411": "\u4EC1\u548C\u533A",
          "510421": "\u7C73\u6613\u53BF",
          "510422": "\u76D0\u8FB9\u53BF",
          "510423": "\u5176\u5B83\u533A",
          "510500": "\u6CF8\u5DDE\u5E02",
          "510502": "\u6C5F\u9633\u533A",
          "510503": "\u7EB3\u6EAA\u533A",
          "510504": "\u9F99\u9A6C\u6F6D\u533A",
          "510521": "\u6CF8\u53BF",
          "510522": "\u5408\u6C5F\u53BF",
          "510524": "\u53D9\u6C38\u53BF",
          "510525": "\u53E4\u853A\u53BF",
          "510526": "\u5176\u5B83\u533A",
          "510600": "\u5FB7\u9633\u5E02",
          "510603": "\u65CC\u9633\u533A",
          "510623": "\u4E2D\u6C5F\u53BF",
          "510626": "\u7F57\u6C5F\u53BF",
          "510681": "\u5E7F\u6C49\u5E02",
          "510682": "\u4EC0\u90A1\u5E02",
          "510683": "\u7EF5\u7AF9\u5E02",
          "510684": "\u5176\u5B83\u533A",
          "510700": "\u7EF5\u9633\u5E02",
          "510703": "\u6DAA\u57CE\u533A",
          "510704": "\u6E38\u4ED9\u533A",
          "510722": "\u4E09\u53F0\u53BF",
          "510723": "\u76D0\u4EAD\u53BF",
          "510724": "\u5B89\u53BF",
          "510725": "\u6893\u6F7C\u53BF",
          "510726": "\u5317\u5DDD\u7F8C\u65CF\u81EA\u6CBB\u53BF",
          "510727": "\u5E73\u6B66\u53BF",
          "510781": "\u6C5F\u6CB9\u5E02",
          "510782": "\u5176\u5B83\u533A",
          "510800": "\u5E7F\u5143\u5E02",
          "510802": "\u5229\u5DDE\u533A",
          "510811": "\u662D\u5316\u533A",
          "510812": "\u671D\u5929\u533A",
          "510821": "\u65FA\u82CD\u53BF",
          "510822": "\u9752\u5DDD\u53BF",
          "510823": "\u5251\u9601\u53BF",
          "510824": "\u82CD\u6EAA\u53BF",
          "510825": "\u5176\u5B83\u533A",
          "510900": "\u9042\u5B81\u5E02",
          "510903": "\u8239\u5C71\u533A",
          "510904": "\u5B89\u5C45\u533A",
          "510921": "\u84EC\u6EAA\u53BF",
          "510922": "\u5C04\u6D2A\u53BF",
          "510923": "\u5927\u82F1\u53BF",
          "510924": "\u5176\u5B83\u533A",
          "511000": "\u5185\u6C5F\u5E02",
          "511002": "\u5E02\u4E2D\u533A",
          "511011": "\u4E1C\u5174\u533A",
          "511024": "\u5A01\u8FDC\u53BF",
          "511025": "\u8D44\u4E2D\u53BF",
          "511028": "\u9686\u660C\u53BF",
          "511029": "\u5176\u5B83\u533A",
          "511100": "\u4E50\u5C71\u5E02",
          "511102": "\u5E02\u4E2D\u533A",
          "511111": "\u6C99\u6E7E\u533A",
          "511112": "\u4E94\u901A\u6865\u533A",
          "511113": "\u91D1\u53E3\u6CB3\u533A",
          "511123": "\u728D\u4E3A\u53BF",
          "511124": "\u4E95\u7814\u53BF",
          "511126": "\u5939\u6C5F\u53BF",
          "511129": "\u6C90\u5DDD\u53BF",
          "511132": "\u5CE8\u8FB9\u5F5D\u65CF\u81EA\u6CBB\u53BF",
          "511133": "\u9A6C\u8FB9\u5F5D\u65CF\u81EA\u6CBB\u53BF",
          "511181": "\u5CE8\u7709\u5C71\u5E02",
          "511182": "\u5176\u5B83\u533A",
          "511300": "\u5357\u5145\u5E02",
          "511302": "\u987A\u5E86\u533A",
          "511303": "\u9AD8\u576A\u533A",
          "511304": "\u5609\u9675\u533A",
          "511321": "\u5357\u90E8\u53BF",
          "511322": "\u8425\u5C71\u53BF",
          "511323": "\u84EC\u5B89\u53BF",
          "511324": "\u4EEA\u9647\u53BF",
          "511325": "\u897F\u5145\u53BF",
          "511381": "\u9606\u4E2D\u5E02",
          "511382": "\u5176\u5B83\u533A",
          "511400": "\u7709\u5C71\u5E02",
          "511402": "\u4E1C\u5761\u533A",
          "511421": "\u4EC1\u5BFF\u53BF",
          "511422": "\u5F6D\u5C71\u53BF",
          "511423": "\u6D2A\u96C5\u53BF",
          "511424": "\u4E39\u68F1\u53BF",
          "511425": "\u9752\u795E\u53BF",
          "511426": "\u5176\u5B83\u533A",
          "511500": "\u5B9C\u5BBE\u5E02",
          "511502": "\u7FE0\u5C4F\u533A",
          "511521": "\u5B9C\u5BBE\u53BF",
          "511522": "\u5357\u6EAA\u533A",
          "511523": "\u6C5F\u5B89\u53BF",
          "511524": "\u957F\u5B81\u53BF",
          "511525": "\u9AD8\u53BF",
          "511526": "\u73D9\u53BF",
          "511527": "\u7B60\u8FDE\u53BF",
          "511528": "\u5174\u6587\u53BF",
          "511529": "\u5C4F\u5C71\u53BF",
          "511530": "\u5176\u5B83\u533A",
          "511600": "\u5E7F\u5B89\u5E02",
          "511602": "\u5E7F\u5B89\u533A",
          "511603": "\u524D\u950B\u533A",
          "511621": "\u5CB3\u6C60\u53BF",
          "511622": "\u6B66\u80DC\u53BF",
          "511623": "\u90BB\u6C34\u53BF",
          "511681": "\u534E\u84E5\u5E02",
          "511683": "\u5176\u5B83\u533A",
          "511700": "\u8FBE\u5DDE\u5E02",
          "511702": "\u901A\u5DDD\u533A",
          "511721": "\u8FBE\u5DDD\u533A",
          "511722": "\u5BA3\u6C49\u53BF",
          "511723": "\u5F00\u6C5F\u53BF",
          "511724": "\u5927\u7AF9\u53BF",
          "511725": "\u6E20\u53BF",
          "511781": "\u4E07\u6E90\u5E02",
          "511782": "\u5176\u5B83\u533A",
          "511800": "\u96C5\u5B89\u5E02",
          "511802": "\u96E8\u57CE\u533A",
          "511821": "\u540D\u5C71\u533A",
          "511822": "\u8365\u7ECF\u53BF",
          "511823": "\u6C49\u6E90\u53BF",
          "511824": "\u77F3\u68C9\u53BF",
          "511825": "\u5929\u5168\u53BF",
          "511826": "\u82A6\u5C71\u53BF",
          "511827": "\u5B9D\u5174\u53BF",
          "511828": "\u5176\u5B83\u533A",
          "511900": "\u5DF4\u4E2D\u5E02",
          "511902": "\u5DF4\u5DDE\u533A",
          "511903": "\u6069\u9633\u533A",
          "511921": "\u901A\u6C5F\u53BF",
          "511922": "\u5357\u6C5F\u53BF",
          "511923": "\u5E73\u660C\u53BF",
          "511924": "\u5176\u5B83\u533A",
          "512000": "\u8D44\u9633\u5E02",
          "512002": "\u96C1\u6C5F\u533A",
          "512021": "\u5B89\u5CB3\u53BF",
          "512022": "\u4E50\u81F3\u53BF",
          "512081": "\u7B80\u9633\u5E02",
          "512082": "\u5176\u5B83\u533A",
          "513200": "\u963F\u575D\u85CF\u65CF\u7F8C\u65CF\u81EA\u6CBB\u5DDE",
          "513221": "\u6C76\u5DDD\u53BF",
          "513222": "\u7406\u53BF",
          "513223": "\u8302\u53BF",
          "513224": "\u677E\u6F58\u53BF",
          "513225": "\u4E5D\u5BE8\u6C9F\u53BF",
          "513226": "\u91D1\u5DDD\u53BF",
          "513227": "\u5C0F\u91D1\u53BF",
          "513228": "\u9ED1\u6C34\u53BF",
          "513229": "\u9A6C\u5C14\u5EB7\u53BF",
          "513230": "\u58E4\u5858\u53BF",
          "513231": "\u963F\u575D\u53BF",
          "513232": "\u82E5\u5C14\u76D6\u53BF",
          "513233": "\u7EA2\u539F\u53BF",
          "513234": "\u5176\u5B83\u533A",
          "513300": "\u7518\u5B5C\u85CF\u65CF\u81EA\u6CBB\u5DDE",
          "513321": "\u5EB7\u5B9A\u53BF",
          "513322": "\u6CF8\u5B9A\u53BF",
          "513323": "\u4E39\u5DF4\u53BF",
          "513324": "\u4E5D\u9F99\u53BF",
          "513325": "\u96C5\u6C5F\u53BF",
          "513326": "\u9053\u5B5A\u53BF",
          "513327": "\u7089\u970D\u53BF",
          "513328": "\u7518\u5B5C\u53BF",
          "513329": "\u65B0\u9F99\u53BF",
          "513330": "\u5FB7\u683C\u53BF",
          "513331": "\u767D\u7389\u53BF",
          "513332": "\u77F3\u6E20\u53BF",
          "513333": "\u8272\u8FBE\u53BF",
          "513334": "\u7406\u5858\u53BF",
          "513335": "\u5DF4\u5858\u53BF",
          "513336": "\u4E61\u57CE\u53BF",
          "513337": "\u7A3B\u57CE\u53BF",
          "513338": "\u5F97\u8363\u53BF",
          "513339": "\u5176\u5B83\u533A",
          "513400": "\u51C9\u5C71\u5F5D\u65CF\u81EA\u6CBB\u5DDE",
          "513401": "\u897F\u660C\u5E02",
          "513422": "\u6728\u91CC\u85CF\u65CF\u81EA\u6CBB\u53BF",
          "513423": "\u76D0\u6E90\u53BF",
          "513424": "\u5FB7\u660C\u53BF",
          "513425": "\u4F1A\u7406\u53BF",
          "513426": "\u4F1A\u4E1C\u53BF",
          "513427": "\u5B81\u5357\u53BF",
          "513428": "\u666E\u683C\u53BF",
          "513429": "\u5E03\u62D6\u53BF",
          "513430": "\u91D1\u9633\u53BF",
          "513431": "\u662D\u89C9\u53BF",
          "513432": "\u559C\u5FB7\u53BF",
          "513433": "\u5195\u5B81\u53BF",
          "513434": "\u8D8A\u897F\u53BF",
          "513435": "\u7518\u6D1B\u53BF",
          "513436": "\u7F8E\u59D1\u53BF",
          "513437": "\u96F7\u6CE2\u53BF",
          "513438": "\u5176\u5B83\u533A",
          "520000": "\u8D35\u5DDE\u7701",
          "520100": "\u8D35\u9633\u5E02",
          "520102": "\u5357\u660E\u533A",
          "520103": "\u4E91\u5CA9\u533A",
          "520111": "\u82B1\u6EAA\u533A",
          "520112": "\u4E4C\u5F53\u533A",
          "520113": "\u767D\u4E91\u533A",
          "520121": "\u5F00\u9633\u53BF",
          "520122": "\u606F\u70FD\u53BF",
          "520123": "\u4FEE\u6587\u53BF",
          "520151": "\u89C2\u5C71\u6E56\u533A",
          "520181": "\u6E05\u9547\u5E02",
          "520182": "\u5176\u5B83\u533A",
          "520200": "\u516D\u76D8\u6C34\u5E02",
          "520201": "\u949F\u5C71\u533A",
          "520203": "\u516D\u679D\u7279\u533A",
          "520221": "\u6C34\u57CE\u53BF",
          "520222": "\u76D8\u53BF",
          "520223": "\u5176\u5B83\u533A",
          "520300": "\u9075\u4E49\u5E02",
          "520302": "\u7EA2\u82B1\u5C97\u533A",
          "520303": "\u6C47\u5DDD\u533A",
          "520321": "\u9075\u4E49\u53BF",
          "520322": "\u6850\u6893\u53BF",
          "520323": "\u7EE5\u9633\u53BF",
          "520324": "\u6B63\u5B89\u53BF",
          "520325": "\u9053\u771F\u4EE1\u4F6C\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "520326": "\u52A1\u5DDD\u4EE1\u4F6C\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "520327": "\u51E4\u5188\u53BF",
          "520328": "\u6E44\u6F6D\u53BF",
          "520329": "\u4F59\u5E86\u53BF",
          "520330": "\u4E60\u6C34\u53BF",
          "520381": "\u8D64\u6C34\u5E02",
          "520382": "\u4EC1\u6000\u5E02",
          "520383": "\u5176\u5B83\u533A",
          "520400": "\u5B89\u987A\u5E02",
          "520402": "\u897F\u79C0\u533A",
          "520421": "\u5E73\u575D\u53BF",
          "520422": "\u666E\u5B9A\u53BF",
          "520423": "\u9547\u5B81\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "520424": "\u5173\u5CAD\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "520425": "\u7D2B\u4E91\u82D7\u65CF\u5E03\u4F9D\u65CF\u81EA\u6CBB\u53BF",
          "520426": "\u5176\u5B83\u533A",
          "522200": "\u94DC\u4EC1\u5E02",
          "522201": "\u78A7\u6C5F\u533A",
          "522222": "\u6C5F\u53E3\u53BF",
          "522223": "\u7389\u5C4F\u4F97\u65CF\u81EA\u6CBB\u53BF",
          "522224": "\u77F3\u9621\u53BF",
          "522225": "\u601D\u5357\u53BF",
          "522226": "\u5370\u6C5F\u571F\u5BB6\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "522227": "\u5FB7\u6C5F\u53BF",
          "522228": "\u6CBF\u6CB3\u571F\u5BB6\u65CF\u81EA\u6CBB\u53BF",
          "522229": "\u677E\u6843\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "522230": "\u4E07\u5C71\u533A",
          "522231": "\u5176\u5B83\u533A",
          "522300": "\u9ED4\u897F\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE",
          "522301": "\u5174\u4E49\u5E02",
          "522322": "\u5174\u4EC1\u53BF",
          "522323": "\u666E\u5B89\u53BF",
          "522324": "\u6674\u9686\u53BF",
          "522325": "\u8D1E\u4E30\u53BF",
          "522326": "\u671B\u8C1F\u53BF",
          "522327": "\u518C\u4EA8\u53BF",
          "522328": "\u5B89\u9F99\u53BF",
          "522329": "\u5176\u5B83\u533A",
          "522400": "\u6BD5\u8282\u5E02",
          "522401": "\u4E03\u661F\u5173\u533A",
          "522422": "\u5927\u65B9\u53BF",
          "522423": "\u9ED4\u897F\u53BF",
          "522424": "\u91D1\u6C99\u53BF",
          "522425": "\u7EC7\u91D1\u53BF",
          "522426": "\u7EB3\u96CD\u53BF",
          "522427": "\u5A01\u5B81\u5F5D\u65CF\u56DE\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "522428": "\u8D6B\u7AE0\u53BF",
          "522429": "\u5176\u5B83\u533A",
          "522600": "\u9ED4\u4E1C\u5357\u82D7\u65CF\u4F97\u65CF\u81EA\u6CBB\u5DDE",
          "522601": "\u51EF\u91CC\u5E02",
          "522622": "\u9EC4\u5E73\u53BF",
          "522623": "\u65BD\u79C9\u53BF",
          "522624": "\u4E09\u7A57\u53BF",
          "522625": "\u9547\u8FDC\u53BF",
          "522626": "\u5C91\u5DE9\u53BF",
          "522627": "\u5929\u67F1\u53BF",
          "522628": "\u9526\u5C4F\u53BF",
          "522629": "\u5251\u6CB3\u53BF",
          "522630": "\u53F0\u6C5F\u53BF",
          "522631": "\u9ECE\u5E73\u53BF",
          "522632": "\u6995\u6C5F\u53BF",
          "522633": "\u4ECE\u6C5F\u53BF",
          "522634": "\u96F7\u5C71\u53BF",
          "522635": "\u9EBB\u6C5F\u53BF",
          "522636": "\u4E39\u5BE8\u53BF",
          "522637": "\u5176\u5B83\u533A",
          "522700": "\u9ED4\u5357\u5E03\u4F9D\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE",
          "522701": "\u90FD\u5300\u5E02",
          "522702": "\u798F\u6CC9\u5E02",
          "522722": "\u8354\u6CE2\u53BF",
          "522723": "\u8D35\u5B9A\u53BF",
          "522725": "\u74EE\u5B89\u53BF",
          "522726": "\u72EC\u5C71\u53BF",
          "522727": "\u5E73\u5858\u53BF",
          "522728": "\u7F57\u7538\u53BF",
          "522729": "\u957F\u987A\u53BF",
          "522730": "\u9F99\u91CC\u53BF",
          "522731": "\u60E0\u6C34\u53BF",
          "522732": "\u4E09\u90FD\u6C34\u65CF\u81EA\u6CBB\u53BF",
          "522733": "\u5176\u5B83\u533A",
          "530000": "\u4E91\u5357\u7701",
          "530100": "\u6606\u660E\u5E02",
          "530102": "\u4E94\u534E\u533A",
          "530103": "\u76D8\u9F99\u533A",
          "530111": "\u5B98\u6E21\u533A",
          "530112": "\u897F\u5C71\u533A",
          "530113": "\u4E1C\u5DDD\u533A",
          "530121": "\u5448\u8D21\u533A",
          "530122": "\u664B\u5B81\u53BF",
          "530124": "\u5BCC\u6C11\u53BF",
          "530125": "\u5B9C\u826F\u53BF",
          "530126": "\u77F3\u6797\u5F5D\u65CF\u81EA\u6CBB\u53BF",
          "530127": "\u5D69\u660E\u53BF",
          "530128": "\u7984\u529D\u5F5D\u65CF\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "530129": "\u5BFB\u7538\u56DE\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF",
          "530181": "\u5B89\u5B81\u5E02",
          "530182": "\u5176\u5B83\u533A",
          "530300": "\u66F2\u9756\u5E02",
          "530302": "\u9E92\u9E9F\u533A",
          "530321": "\u9A6C\u9F99\u53BF",
          "530322": "\u9646\u826F\u53BF",
          "530323": "\u5E08\u5B97\u53BF",
          "530324": "\u7F57\u5E73\u53BF",
          "530325": "\u5BCC\u6E90\u53BF",
          "530326": "\u4F1A\u6CFD\u53BF",
          "530328": "\u6CBE\u76CA\u53BF",
          "530381": "\u5BA3\u5A01\u5E02",
          "530382": "\u5176\u5B83\u533A",
          "530400": "\u7389\u6EAA\u5E02",
          "530402": "\u7EA2\u5854\u533A",
          "530421": "\u6C5F\u5DDD\u53BF",
          "530422": "\u6F84\u6C5F\u53BF",
          "530423": "\u901A\u6D77\u53BF",
          "530424": "\u534E\u5B81\u53BF",
          "530425": "\u6613\u95E8\u53BF",
          "530426": "\u5CE8\u5C71\u5F5D\u65CF\u81EA\u6CBB\u53BF",
          "530427": "\u65B0\u5E73\u5F5D\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF",
          "530428": "\u5143\u6C5F\u54C8\u5C3C\u65CF\u5F5D\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF",
          "530429": "\u5176\u5B83\u533A",
          "530500": "\u4FDD\u5C71\u5E02",
          "530502": "\u9686\u9633\u533A",
          "530521": "\u65BD\u7538\u53BF",
          "530522": "\u817E\u51B2\u53BF",
          "530523": "\u9F99\u9675\u53BF",
          "530524": "\u660C\u5B81\u53BF",
          "530525": "\u5176\u5B83\u533A",
          "530600": "\u662D\u901A\u5E02",
          "530602": "\u662D\u9633\u533A",
          "530621": "\u9C81\u7538\u53BF",
          "530622": "\u5DE7\u5BB6\u53BF",
          "530623": "\u76D0\u6D25\u53BF",
          "530624": "\u5927\u5173\u53BF",
          "530625": "\u6C38\u5584\u53BF",
          "530626": "\u7EE5\u6C5F\u53BF",
          "530627": "\u9547\u96C4\u53BF",
          "530628": "\u5F5D\u826F\u53BF",
          "530629": "\u5A01\u4FE1\u53BF",
          "530630": "\u6C34\u5BCC\u53BF",
          "530631": "\u5176\u5B83\u533A",
          "530700": "\u4E3D\u6C5F\u5E02",
          "530702": "\u53E4\u57CE\u533A",
          "530721": "\u7389\u9F99\u7EB3\u897F\u65CF\u81EA\u6CBB\u53BF",
          "530722": "\u6C38\u80DC\u53BF",
          "530723": "\u534E\u576A\u53BF",
          "530724": "\u5B81\u8497\u5F5D\u65CF\u81EA\u6CBB\u53BF",
          "530725": "\u5176\u5B83\u533A",
          "530800": "\u666E\u6D31\u5E02",
          "530802": "\u601D\u8305\u533A",
          "530821": "\u5B81\u6D31\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF",
          "530822": "\u58A8\u6C5F\u54C8\u5C3C\u65CF\u81EA\u6CBB\u53BF",
          "530823": "\u666F\u4E1C\u5F5D\u65CF\u81EA\u6CBB\u53BF",
          "530824": "\u666F\u8C37\u50A3\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF",
          "530825": "\u9547\u6C85\u5F5D\u65CF\u54C8\u5C3C\u65CF\u62C9\u795C\u65CF\u81EA\u6CBB\u53BF",
          "530826": "\u6C5F\u57CE\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u53BF",
          "530827": "\u5B5F\u8FDE\u50A3\u65CF\u62C9\u795C\u65CF\u4F64\u65CF\u81EA\u6CBB\u53BF",
          "530828": "\u6F9C\u6CA7\u62C9\u795C\u65CF\u81EA\u6CBB\u53BF",
          "530829": "\u897F\u76DF\u4F64\u65CF\u81EA\u6CBB\u53BF",
          "530830": "\u5176\u5B83\u533A",
          "530900": "\u4E34\u6CA7\u5E02",
          "530902": "\u4E34\u7FD4\u533A",
          "530921": "\u51E4\u5E86\u53BF",
          "530922": "\u4E91\u53BF",
          "530923": "\u6C38\u5FB7\u53BF",
          "530924": "\u9547\u5EB7\u53BF",
          "530925": "\u53CC\u6C5F\u62C9\u795C\u65CF\u4F64\u65CF\u5E03\u6717\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF",
          "530926": "\u803F\u9A6C\u50A3\u65CF\u4F64\u65CF\u81EA\u6CBB\u53BF",
          "530927": "\u6CA7\u6E90\u4F64\u65CF\u81EA\u6CBB\u53BF",
          "530928": "\u5176\u5B83\u533A",
          "532300": "\u695A\u96C4\u5F5D\u65CF\u81EA\u6CBB\u5DDE",
          "532301": "\u695A\u96C4\u5E02",
          "532322": "\u53CC\u67CF\u53BF",
          "532323": "\u725F\u5B9A\u53BF",
          "532324": "\u5357\u534E\u53BF",
          "532325": "\u59DA\u5B89\u53BF",
          "532326": "\u5927\u59DA\u53BF",
          "532327": "\u6C38\u4EC1\u53BF",
          "532328": "\u5143\u8C0B\u53BF",
          "532329": "\u6B66\u5B9A\u53BF",
          "532331": "\u7984\u4E30\u53BF",
          "532332": "\u5176\u5B83\u533A",
          "532500": "\u7EA2\u6CB3\u54C8\u5C3C\u65CF\u5F5D\u65CF\u81EA\u6CBB\u5DDE",
          "532501": "\u4E2A\u65E7\u5E02",
          "532502": "\u5F00\u8FDC\u5E02",
          "532522": "\u8499\u81EA\u5E02",
          "532523": "\u5C4F\u8FB9\u82D7\u65CF\u81EA\u6CBB\u53BF",
          "532524": "\u5EFA\u6C34\u53BF",
          "532525": "\u77F3\u5C4F\u53BF",
          "532526": "\u5F25\u52D2\u5E02",
          "532527": "\u6CF8\u897F\u53BF",
          "532528": "\u5143\u9633\u53BF",
          "532529": "\u7EA2\u6CB3\u53BF",
          "532530": "\u91D1\u5E73\u82D7\u65CF\u7476\u65CF\u50A3\u65CF\u81EA\u6CBB\u53BF",
          "532531": "\u7EFF\u6625\u53BF",
          "532532": "\u6CB3\u53E3\u7476\u65CF\u81EA\u6CBB\u53BF",
          "532533": "\u5176\u5B83\u533A",
          "532600": "\u6587\u5C71\u58EE\u65CF\u82D7\u65CF\u81EA\u6CBB\u5DDE",
          "532621": "\u6587\u5C71\u5E02",
          "532622": "\u781A\u5C71\u53BF",
          "532623": "\u897F\u7574\u53BF",
          "532624": "\u9EBB\u6817\u5761\u53BF",
          "532625": "\u9A6C\u5173\u53BF",
          "532626": "\u4E18\u5317\u53BF",
          "532627": "\u5E7F\u5357\u53BF",
          "532628": "\u5BCC\u5B81\u53BF",
          "532629": "\u5176\u5B83\u533A",
          "532800": "\u897F\u53CC\u7248\u7EB3\u50A3\u65CF\u81EA\u6CBB\u5DDE",
          "532801": "\u666F\u6D2A\u5E02",
          "532822": "\u52D0\u6D77\u53BF",
          "532823": "\u52D0\u814A\u53BF",
          "532824": "\u5176\u5B83\u533A",
          "532900": "\u5927\u7406\u767D\u65CF\u81EA\u6CBB\u5DDE",
          "532901": "\u5927\u7406\u5E02",
          "532922": "\u6F3E\u6FDE\u5F5D\u65CF\u81EA\u6CBB\u53BF",
          "532923": "\u7965\u4E91\u53BF",
          "532924": "\u5BBE\u5DDD\u53BF",
          "532925": "\u5F25\u6E21\u53BF",
          "532926": "\u5357\u6DA7\u5F5D\u65CF\u81EA\u6CBB\u53BF",
          "532927": "\u5DCD\u5C71\u5F5D\u65CF\u56DE\u65CF\u81EA\u6CBB\u53BF",
          "532928": "\u6C38\u5E73\u53BF",
          "532929": "\u4E91\u9F99\u53BF",
          "532930": "\u6D31\u6E90\u53BF",
          "532931": "\u5251\u5DDD\u53BF",
          "532932": "\u9E64\u5E86\u53BF",
          "532933": "\u5176\u5B83\u533A",
          "533100": "\u5FB7\u5B8F\u50A3\u65CF\u666F\u9887\u65CF\u81EA\u6CBB\u5DDE",
          "533102": "\u745E\u4E3D\u5E02",
          "533103": "\u8292\u5E02",
          "533122": "\u6881\u6CB3\u53BF",
          "533123": "\u76C8\u6C5F\u53BF",
          "533124": "\u9647\u5DDD\u53BF",
          "533125": "\u5176\u5B83\u533A",
          "533300": "\u6012\u6C5F\u5088\u50F3\u65CF\u81EA\u6CBB\u5DDE",
          "533321": "\u6CF8\u6C34\u53BF",
          "533323": "\u798F\u8D21\u53BF",
          "533324": "\u8D21\u5C71\u72EC\u9F99\u65CF\u6012\u65CF\u81EA\u6CBB\u53BF",
          "533325": "\u5170\u576A\u767D\u65CF\u666E\u7C73\u65CF\u81EA\u6CBB\u53BF",
          "533326": "\u5176\u5B83\u533A",
          "533400": "\u8FEA\u5E86\u85CF\u65CF\u81EA\u6CBB\u5DDE",
          "533421": "\u9999\u683C\u91CC\u62C9\u53BF",
          "533422": "\u5FB7\u94A6\u53BF",
          "533423": "\u7EF4\u897F\u5088\u50F3\u65CF\u81EA\u6CBB\u53BF",
          "533424": "\u5176\u5B83\u533A",
          "540000": "\u897F\u85CF\u81EA\u6CBB\u533A",
          "540100": "\u62C9\u8428\u5E02",
          "540102": "\u57CE\u5173\u533A",
          "540121": "\u6797\u5468\u53BF",
          "540122": "\u5F53\u96C4\u53BF",
          "540123": "\u5C3C\u6728\u53BF",
          "540124": "\u66F2\u6C34\u53BF",
          "540125": "\u5806\u9F99\u5FB7\u5E86\u53BF",
          "540126": "\u8FBE\u5B5C\u53BF",
          "540127": "\u58A8\u7AF9\u5DE5\u5361\u53BF",
          "540128": "\u5176\u5B83\u533A",
          "542100": "\u660C\u90FD\u5730\u533A",
          "542121": "\u660C\u90FD\u53BF",
          "542122": "\u6C5F\u8FBE\u53BF",
          "542123": "\u8D21\u89C9\u53BF",
          "542124": "\u7C7B\u4E4C\u9F50\u53BF",
          "542125": "\u4E01\u9752\u53BF",
          "542126": "\u5BDF\u96C5\u53BF",
          "542127": "\u516B\u5BBF\u53BF",
          "542128": "\u5DE6\u8D21\u53BF",
          "542129": "\u8292\u5EB7\u53BF",
          "542132": "\u6D1B\u9686\u53BF",
          "542133": "\u8FB9\u575D\u53BF",
          "542134": "\u5176\u5B83\u533A",
          "542200": "\u5C71\u5357\u5730\u533A",
          "542221": "\u4E43\u4E1C\u53BF",
          "542222": "\u624E\u56CA\u53BF",
          "542223": "\u8D21\u560E\u53BF",
          "542224": "\u6851\u65E5\u53BF",
          "542225": "\u743C\u7ED3\u53BF",
          "542226": "\u66F2\u677E\u53BF",
          "542227": "\u63AA\u7F8E\u53BF",
          "542228": "\u6D1B\u624E\u53BF",
          "542229": "\u52A0\u67E5\u53BF",
          "542231": "\u9686\u5B50\u53BF",
          "542232": "\u9519\u90A3\u53BF",
          "542233": "\u6D6A\u5361\u5B50\u53BF",
          "542234": "\u5176\u5B83\u533A",
          "542300": "\u65E5\u5580\u5219\u5730\u533A",
          "542301": "\u65E5\u5580\u5219\u5E02",
          "542322": "\u5357\u6728\u6797\u53BF",
          "542323": "\u6C5F\u5B5C\u53BF",
          "542324": "\u5B9A\u65E5\u53BF",
          "542325": "\u8428\u8FE6\u53BF",
          "542326": "\u62C9\u5B5C\u53BF",
          "542327": "\u6602\u4EC1\u53BF",
          "542328": "\u8C22\u901A\u95E8\u53BF",
          "542329": "\u767D\u6717\u53BF",
          "542330": "\u4EC1\u5E03\u53BF",
          "542331": "\u5EB7\u9A6C\u53BF",
          "542332": "\u5B9A\u7ED3\u53BF",
          "542333": "\u4EF2\u5DF4\u53BF",
          "542334": "\u4E9A\u4E1C\u53BF",
          "542335": "\u5409\u9686\u53BF",
          "542336": "\u8042\u62C9\u6728\u53BF",
          "542337": "\u8428\u560E\u53BF",
          "542338": "\u5C97\u5DF4\u53BF",
          "542339": "\u5176\u5B83\u533A",
          "542400": "\u90A3\u66F2\u5730\u533A",
          "542421": "\u90A3\u66F2\u53BF",
          "542422": "\u5609\u9ECE\u53BF",
          "542423": "\u6BD4\u5982\u53BF",
          "542424": "\u8042\u8363\u53BF",
          "542425": "\u5B89\u591A\u53BF",
          "542426": "\u7533\u624E\u53BF",
          "542427": "\u7D22\u53BF",
          "542428": "\u73ED\u6208\u53BF",
          "542429": "\u5DF4\u9752\u53BF",
          "542430": "\u5C3C\u739B\u53BF",
          "542431": "\u5176\u5B83\u533A",
          "542432": "\u53CC\u6E56\u53BF",
          "542500": "\u963F\u91CC\u5730\u533A",
          "542521": "\u666E\u5170\u53BF",
          "542522": "\u672D\u8FBE\u53BF",
          "542523": "\u5676\u5C14\u53BF",
          "542524": "\u65E5\u571F\u53BF",
          "542525": "\u9769\u5409\u53BF",
          "542526": "\u6539\u5219\u53BF",
          "542527": "\u63AA\u52E4\u53BF",
          "542528": "\u5176\u5B83\u533A",
          "542600": "\u6797\u829D\u5730\u533A",
          "542621": "\u6797\u829D\u53BF",
          "542622": "\u5DE5\u5E03\u6C5F\u8FBE\u53BF",
          "542623": "\u7C73\u6797\u53BF",
          "542624": "\u58A8\u8131\u53BF",
          "542625": "\u6CE2\u5BC6\u53BF",
          "542626": "\u5BDF\u9685\u53BF",
          "542627": "\u6717\u53BF",
          "542628": "\u5176\u5B83\u533A",
          "610000": "\u9655\u897F\u7701",
          "610100": "\u897F\u5B89\u5E02",
          "610102": "\u65B0\u57CE\u533A",
          "610103": "\u7891\u6797\u533A",
          "610104": "\u83B2\u6E56\u533A",
          "610111": "\u705E\u6865\u533A",
          "610112": "\u672A\u592E\u533A",
          "610113": "\u96C1\u5854\u533A",
          "610114": "\u960E\u826F\u533A",
          "610115": "\u4E34\u6F7C\u533A",
          "610116": "\u957F\u5B89\u533A",
          "610122": "\u84DD\u7530\u53BF",
          "610124": "\u5468\u81F3\u53BF",
          "610125": "\u6237\u53BF",
          "610126": "\u9AD8\u9675\u53BF",
          "610127": "\u5176\u5B83\u533A",
          "610200": "\u94DC\u5DDD\u5E02",
          "610202": "\u738B\u76CA\u533A",
          "610203": "\u5370\u53F0\u533A",
          "610204": "\u8000\u5DDE\u533A",
          "610222": "\u5B9C\u541B\u53BF",
          "610223": "\u5176\u5B83\u533A",
          "610300": "\u5B9D\u9E21\u5E02",
          "610302": "\u6E2D\u6EE8\u533A",
          "610303": "\u91D1\u53F0\u533A",
          "610304": "\u9648\u4ED3\u533A",
          "610322": "\u51E4\u7FD4\u53BF",
          "610323": "\u5C90\u5C71\u53BF",
          "610324": "\u6276\u98CE\u53BF",
          "610326": "\u7709\u53BF",
          "610327": "\u9647\u53BF",
          "610328": "\u5343\u9633\u53BF",
          "610329": "\u9E9F\u6E38\u53BF",
          "610330": "\u51E4\u53BF",
          "610331": "\u592A\u767D\u53BF",
          "610332": "\u5176\u5B83\u533A",
          "610400": "\u54B8\u9633\u5E02",
          "610402": "\u79E6\u90FD\u533A",
          "610403": "\u6768\u9675\u533A",
          "610404": "\u6E2D\u57CE\u533A",
          "610422": "\u4E09\u539F\u53BF",
          "610423": "\u6CFE\u9633\u53BF",
          "610424": "\u4E7E\u53BF",
          "610425": "\u793C\u6CC9\u53BF",
          "610426": "\u6C38\u5BFF\u53BF",
          "610427": "\u5F6C\u53BF",
          "610428": "\u957F\u6B66\u53BF",
          "610429": "\u65EC\u9091\u53BF",
          "610430": "\u6DF3\u5316\u53BF",
          "610431": "\u6B66\u529F\u53BF",
          "610481": "\u5174\u5E73\u5E02",
          "610482": "\u5176\u5B83\u533A",
          "610500": "\u6E2D\u5357\u5E02",
          "610502": "\u4E34\u6E2D\u533A",
          "610521": "\u534E\u53BF",
          "610522": "\u6F7C\u5173\u53BF",
          "610523": "\u5927\u8354\u53BF",
          "610524": "\u5408\u9633\u53BF",
          "610525": "\u6F84\u57CE\u53BF",
          "610526": "\u84B2\u57CE\u53BF",
          "610527": "\u767D\u6C34\u53BF",
          "610528": "\u5BCC\u5E73\u53BF",
          "610581": "\u97E9\u57CE\u5E02",
          "610582": "\u534E\u9634\u5E02",
          "610583": "\u5176\u5B83\u533A",
          "610600": "\u5EF6\u5B89\u5E02",
          "610602": "\u5B9D\u5854\u533A",
          "610621": "\u5EF6\u957F\u53BF",
          "610622": "\u5EF6\u5DDD\u53BF",
          "610623": "\u5B50\u957F\u53BF",
          "610624": "\u5B89\u585E\u53BF",
          "610625": "\u5FD7\u4E39\u53BF",
          "610626": "\u5434\u8D77\u53BF",
          "610627": "\u7518\u6CC9\u53BF",
          "610628": "\u5BCC\u53BF",
          "610629": "\u6D1B\u5DDD\u53BF",
          "610630": "\u5B9C\u5DDD\u53BF",
          "610631": "\u9EC4\u9F99\u53BF",
          "610632": "\u9EC4\u9675\u53BF",
          "610633": "\u5176\u5B83\u533A",
          "610700": "\u6C49\u4E2D\u5E02",
          "610702": "\u6C49\u53F0\u533A",
          "610721": "\u5357\u90D1\u53BF",
          "610722": "\u57CE\u56FA\u53BF",
          "610723": "\u6D0B\u53BF",
          "610724": "\u897F\u4E61\u53BF",
          "610725": "\u52C9\u53BF",
          "610726": "\u5B81\u5F3A\u53BF",
          "610727": "\u7565\u9633\u53BF",
          "610728": "\u9547\u5DF4\u53BF",
          "610729": "\u7559\u575D\u53BF",
          "610730": "\u4F5B\u576A\u53BF",
          "610731": "\u5176\u5B83\u533A",
          "610800": "\u6986\u6797\u5E02",
          "610802": "\u6986\u9633\u533A",
          "610821": "\u795E\u6728\u53BF",
          "610822": "\u5E9C\u8C37\u53BF",
          "610823": "\u6A2A\u5C71\u53BF",
          "610824": "\u9756\u8FB9\u53BF",
          "610825": "\u5B9A\u8FB9\u53BF",
          "610826": "\u7EE5\u5FB7\u53BF",
          "610827": "\u7C73\u8102\u53BF",
          "610828": "\u4F73\u53BF",
          "610829": "\u5434\u5821\u53BF",
          "610830": "\u6E05\u6DA7\u53BF",
          "610831": "\u5B50\u6D32\u53BF",
          "610832": "\u5176\u5B83\u533A",
          "610900": "\u5B89\u5EB7\u5E02",
          "610902": "\u6C49\u6EE8\u533A",
          "610921": "\u6C49\u9634\u53BF",
          "610922": "\u77F3\u6CC9\u53BF",
          "610923": "\u5B81\u9655\u53BF",
          "610924": "\u7D2B\u9633\u53BF",
          "610925": "\u5C9A\u768B\u53BF",
          "610926": "\u5E73\u5229\u53BF",
          "610927": "\u9547\u576A\u53BF",
          "610928": "\u65EC\u9633\u53BF",
          "610929": "\u767D\u6CB3\u53BF",
          "610930": "\u5176\u5B83\u533A",
          "611000": "\u5546\u6D1B\u5E02",
          "611002": "\u5546\u5DDE\u533A",
          "611021": "\u6D1B\u5357\u53BF",
          "611022": "\u4E39\u51E4\u53BF",
          "611023": "\u5546\u5357\u53BF",
          "611024": "\u5C71\u9633\u53BF",
          "611025": "\u9547\u5B89\u53BF",
          "611026": "\u67DE\u6C34\u53BF",
          "611027": "\u5176\u5B83\u533A",
          "620000": "\u7518\u8083\u7701",
          "620100": "\u5170\u5DDE\u5E02",
          "620102": "\u57CE\u5173\u533A",
          "620103": "\u4E03\u91CC\u6CB3\u533A",
          "620104": "\u897F\u56FA\u533A",
          "620105": "\u5B89\u5B81\u533A",
          "620111": "\u7EA2\u53E4\u533A",
          "620121": "\u6C38\u767B\u53BF",
          "620122": "\u768B\u5170\u53BF",
          "620123": "\u6986\u4E2D\u53BF",
          "620124": "\u5176\u5B83\u533A",
          "620200": "\u5609\u5CEA\u5173\u5E02",
          "620300": "\u91D1\u660C\u5E02",
          "620302": "\u91D1\u5DDD\u533A",
          "620321": "\u6C38\u660C\u53BF",
          "620322": "\u5176\u5B83\u533A",
          "620400": "\u767D\u94F6\u5E02",
          "620402": "\u767D\u94F6\u533A",
          "620403": "\u5E73\u5DDD\u533A",
          "620421": "\u9756\u8FDC\u53BF",
          "620422": "\u4F1A\u5B81\u53BF",
          "620423": "\u666F\u6CF0\u53BF",
          "620424": "\u5176\u5B83\u533A",
          "620500": "\u5929\u6C34\u5E02",
          "620502": "\u79E6\u5DDE\u533A",
          "620503": "\u9EA6\u79EF\u533A",
          "620521": "\u6E05\u6C34\u53BF",
          "620522": "\u79E6\u5B89\u53BF",
          "620523": "\u7518\u8C37\u53BF",
          "620524": "\u6B66\u5C71\u53BF",
          "620525": "\u5F20\u5BB6\u5DDD\u56DE\u65CF\u81EA\u6CBB\u53BF",
          "620526": "\u5176\u5B83\u533A",
          "620600": "\u6B66\u5A01\u5E02",
          "620602": "\u51C9\u5DDE\u533A",
          "620621": "\u6C11\u52E4\u53BF",
          "620622": "\u53E4\u6D6A\u53BF",
          "620623": "\u5929\u795D\u85CF\u65CF\u81EA\u6CBB\u53BF",
          "620624": "\u5176\u5B83\u533A",
          "620700": "\u5F20\u6396\u5E02",
          "620702": "\u7518\u5DDE\u533A",
          "620721": "\u8083\u5357\u88D5\u56FA\u65CF\u81EA\u6CBB\u53BF",
          "620722": "\u6C11\u4E50\u53BF",
          "620723": "\u4E34\u6CFD\u53BF",
          "620724": "\u9AD8\u53F0\u53BF",
          "620725": "\u5C71\u4E39\u53BF",
          "620726": "\u5176\u5B83\u533A",
          "620800": "\u5E73\u51C9\u5E02",
          "620802": "\u5D06\u5CD2\u533A",
          "620821": "\u6CFE\u5DDD\u53BF",
          "620822": "\u7075\u53F0\u53BF",
          "620823": "\u5D07\u4FE1\u53BF",
          "620824": "\u534E\u4EAD\u53BF",
          "620825": "\u5E84\u6D6A\u53BF",
          "620826": "\u9759\u5B81\u53BF",
          "620827": "\u5176\u5B83\u533A",
          "620900": "\u9152\u6CC9\u5E02",
          "620902": "\u8083\u5DDE\u533A",
          "620921": "\u91D1\u5854\u53BF",
          "620922": "\u74DC\u5DDE\u53BF",
          "620923": "\u8083\u5317\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
          "620924": "\u963F\u514B\u585E\u54C8\u8428\u514B\u65CF\u81EA\u6CBB\u53BF",
          "620981": "\u7389\u95E8\u5E02",
          "620982": "\u6566\u714C\u5E02",
          "620983": "\u5176\u5B83\u533A",
          "621000": "\u5E86\u9633\u5E02",
          "621002": "\u897F\u5CF0\u533A",
          "621021": "\u5E86\u57CE\u53BF",
          "621022": "\u73AF\u53BF",
          "621023": "\u534E\u6C60\u53BF",
          "621024": "\u5408\u6C34\u53BF",
          "621025": "\u6B63\u5B81\u53BF",
          "621026": "\u5B81\u53BF",
          "621027": "\u9547\u539F\u53BF",
          "621028": "\u5176\u5B83\u533A",
          "621100": "\u5B9A\u897F\u5E02",
          "621102": "\u5B89\u5B9A\u533A",
          "621121": "\u901A\u6E2D\u53BF",
          "621122": "\u9647\u897F\u53BF",
          "621123": "\u6E2D\u6E90\u53BF",
          "621124": "\u4E34\u6D2E\u53BF",
          "621125": "\u6F33\u53BF",
          "621126": "\u5CB7\u53BF",
          "621127": "\u5176\u5B83\u533A",
          "621200": "\u9647\u5357\u5E02",
          "621202": "\u6B66\u90FD\u533A",
          "621221": "\u6210\u53BF",
          "621222": "\u6587\u53BF",
          "621223": "\u5B95\u660C\u53BF",
          "621224": "\u5EB7\u53BF",
          "621225": "\u897F\u548C\u53BF",
          "621226": "\u793C\u53BF",
          "621227": "\u5FBD\u53BF",
          "621228": "\u4E24\u5F53\u53BF",
          "621229": "\u5176\u5B83\u533A",
          "622900": "\u4E34\u590F\u56DE\u65CF\u81EA\u6CBB\u5DDE",
          "622901": "\u4E34\u590F\u5E02",
          "622921": "\u4E34\u590F\u53BF",
          "622922": "\u5EB7\u4E50\u53BF",
          "622923": "\u6C38\u9756\u53BF",
          "622924": "\u5E7F\u6CB3\u53BF",
          "622925": "\u548C\u653F\u53BF",
          "622926": "\u4E1C\u4E61\u65CF\u81EA\u6CBB\u53BF",
          "622927": "\u79EF\u77F3\u5C71\u4FDD\u5B89\u65CF\u4E1C\u4E61\u65CF\u6492\u62C9\u65CF\u81EA\u6CBB\u53BF",
          "622928": "\u5176\u5B83\u533A",
          "623000": "\u7518\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE",
          "623001": "\u5408\u4F5C\u5E02",
          "623021": "\u4E34\u6F6D\u53BF",
          "623022": "\u5353\u5C3C\u53BF",
          "623023": "\u821F\u66F2\u53BF",
          "623024": "\u8FED\u90E8\u53BF",
          "623025": "\u739B\u66F2\u53BF",
          "623026": "\u788C\u66F2\u53BF",
          "623027": "\u590F\u6CB3\u53BF",
          "623028": "\u5176\u5B83\u533A",
          "630000": "\u9752\u6D77\u7701",
          "630100": "\u897F\u5B81\u5E02",
          "630102": "\u57CE\u4E1C\u533A",
          "630103": "\u57CE\u4E2D\u533A",
          "630104": "\u57CE\u897F\u533A",
          "630105": "\u57CE\u5317\u533A",
          "630121": "\u5927\u901A\u56DE\u65CF\u571F\u65CF\u81EA\u6CBB\u53BF",
          "630122": "\u6E5F\u4E2D\u53BF",
          "630123": "\u6E5F\u6E90\u53BF",
          "630124": "\u5176\u5B83\u533A",
          "632100": "\u6D77\u4E1C\u5E02",
          "632121": "\u5E73\u5B89\u53BF",
          "632122": "\u6C11\u548C\u56DE\u65CF\u571F\u65CF\u81EA\u6CBB\u53BF",
          "632123": "\u4E50\u90FD\u533A",
          "632126": "\u4E92\u52A9\u571F\u65CF\u81EA\u6CBB\u53BF",
          "632127": "\u5316\u9686\u56DE\u65CF\u81EA\u6CBB\u53BF",
          "632128": "\u5FAA\u5316\u6492\u62C9\u65CF\u81EA\u6CBB\u53BF",
          "632129": "\u5176\u5B83\u533A",
          "632200": "\u6D77\u5317\u85CF\u65CF\u81EA\u6CBB\u5DDE",
          "632221": "\u95E8\u6E90\u56DE\u65CF\u81EA\u6CBB\u53BF",
          "632222": "\u7941\u8FDE\u53BF",
          "632223": "\u6D77\u664F\u53BF",
          "632224": "\u521A\u5BDF\u53BF",
          "632225": "\u5176\u5B83\u533A",
          "632300": "\u9EC4\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE",
          "632321": "\u540C\u4EC1\u53BF",
          "632322": "\u5C16\u624E\u53BF",
          "632323": "\u6CFD\u5E93\u53BF",
          "632324": "\u6CB3\u5357\u8499\u53E4\u65CF\u81EA\u6CBB\u53BF",
          "632325": "\u5176\u5B83\u533A",
          "632500": "\u6D77\u5357\u85CF\u65CF\u81EA\u6CBB\u5DDE",
          "632521": "\u5171\u548C\u53BF",
          "632522": "\u540C\u5FB7\u53BF",
          "632523": "\u8D35\u5FB7\u53BF",
          "632524": "\u5174\u6D77\u53BF",
          "632525": "\u8D35\u5357\u53BF",
          "632526": "\u5176\u5B83\u533A",
          "632600": "\u679C\u6D1B\u85CF\u65CF\u81EA\u6CBB\u5DDE",
          "632621": "\u739B\u6C81\u53BF",
          "632622": "\u73ED\u739B\u53BF",
          "632623": "\u7518\u5FB7\u53BF",
          "632624": "\u8FBE\u65E5\u53BF",
          "632625": "\u4E45\u6CBB\u53BF",
          "632626": "\u739B\u591A\u53BF",
          "632627": "\u5176\u5B83\u533A",
          "632700": "\u7389\u6811\u85CF\u65CF\u81EA\u6CBB\u5DDE",
          "632721": "\u7389\u6811\u5E02",
          "632722": "\u6742\u591A\u53BF",
          "632723": "\u79F0\u591A\u53BF",
          "632724": "\u6CBB\u591A\u53BF",
          "632725": "\u56CA\u8C26\u53BF",
          "632726": "\u66F2\u9EBB\u83B1\u53BF",
          "632727": "\u5176\u5B83\u533A",
          "632800": "\u6D77\u897F\u8499\u53E4\u65CF\u85CF\u65CF\u81EA\u6CBB\u5DDE",
          "632801": "\u683C\u5C14\u6728\u5E02",
          "632802": "\u5FB7\u4EE4\u54C8\u5E02",
          "632821": "\u4E4C\u5170\u53BF",
          "632822": "\u90FD\u5170\u53BF",
          "632823": "\u5929\u5CFB\u53BF",
          "632824": "\u5176\u5B83\u533A",
          "640000": "\u5B81\u590F\u56DE\u65CF\u81EA\u6CBB\u533A",
          "640100": "\u94F6\u5DDD\u5E02",
          "640104": "\u5174\u5E86\u533A",
          "640105": "\u897F\u590F\u533A",
          "640106": "\u91D1\u51E4\u533A",
          "640121": "\u6C38\u5B81\u53BF",
          "640122": "\u8D3A\u5170\u53BF",
          "640181": "\u7075\u6B66\u5E02",
          "640182": "\u5176\u5B83\u533A",
          "640200": "\u77F3\u5634\u5C71\u5E02",
          "640202": "\u5927\u6B66\u53E3\u533A",
          "640205": "\u60E0\u519C\u533A",
          "640221": "\u5E73\u7F57\u53BF",
          "640222": "\u5176\u5B83\u533A",
          "640300": "\u5434\u5FE0\u5E02",
          "640302": "\u5229\u901A\u533A",
          "640303": "\u7EA2\u5BFA\u5821\u533A",
          "640323": "\u76D0\u6C60\u53BF",
          "640324": "\u540C\u5FC3\u53BF",
          "640381": "\u9752\u94DC\u5CE1\u5E02",
          "640382": "\u5176\u5B83\u533A",
          "640400": "\u56FA\u539F\u5E02",
          "640402": "\u539F\u5DDE\u533A",
          "640422": "\u897F\u5409\u53BF",
          "640423": "\u9686\u5FB7\u53BF",
          "640424": "\u6CFE\u6E90\u53BF",
          "640425": "\u5F6D\u9633\u53BF",
          "640426": "\u5176\u5B83\u533A",
          "640500": "\u4E2D\u536B\u5E02",
          "640502": "\u6C99\u5761\u5934\u533A",
          "640521": "\u4E2D\u5B81\u53BF",
          "640522": "\u6D77\u539F\u53BF",
          "640523": "\u5176\u5B83\u533A",
          "650000": "\u65B0\u7586\u7EF4\u543E\u5C14\u81EA\u6CBB\u533A",
          "650100": "\u4E4C\u9C81\u6728\u9F50\u5E02",
          "650102": "\u5929\u5C71\u533A",
          "650103": "\u6C99\u4F9D\u5DF4\u514B\u533A",
          "650104": "\u65B0\u5E02\u533A",
          "650105": "\u6C34\u78E8\u6C9F\u533A",
          "650106": "\u5934\u5C6F\u6CB3\u533A",
          "650107": "\u8FBE\u5742\u57CE\u533A",
          "650109": "\u7C73\u4E1C\u533A",
          "650121": "\u4E4C\u9C81\u6728\u9F50\u53BF",
          "650122": "\u5176\u5B83\u533A",
          "650200": "\u514B\u62C9\u739B\u4F9D\u5E02",
          "650202": "\u72EC\u5C71\u5B50\u533A",
          "650203": "\u514B\u62C9\u739B\u4F9D\u533A",
          "650204": "\u767D\u78B1\u6EE9\u533A",
          "650205": "\u4E4C\u5C14\u79BE\u533A",
          "650206": "\u5176\u5B83\u533A",
          "652100": "\u5410\u9C81\u756A\u5730\u533A",
          "652101": "\u5410\u9C81\u756A\u5E02",
          "652122": "\u912F\u5584\u53BF",
          "652123": "\u6258\u514B\u900A\u53BF",
          "652124": "\u5176\u5B83\u533A",
          "652200": "\u54C8\u5BC6\u5730\u533A",
          "652201": "\u54C8\u5BC6\u5E02",
          "652222": "\u5DF4\u91CC\u5764\u54C8\u8428\u514B\u81EA\u6CBB\u53BF",
          "652223": "\u4F0A\u543E\u53BF",
          "652224": "\u5176\u5B83\u533A",
          "652300": "\u660C\u5409\u56DE\u65CF\u81EA\u6CBB\u5DDE",
          "652301": "\u660C\u5409\u5E02",
          "652302": "\u961C\u5EB7\u5E02",
          "652323": "\u547C\u56FE\u58C1\u53BF",
          "652324": "\u739B\u7EB3\u65AF\u53BF",
          "652325": "\u5947\u53F0\u53BF",
          "652327": "\u5409\u6728\u8428\u5C14\u53BF",
          "652328": "\u6728\u5792\u54C8\u8428\u514B\u81EA\u6CBB\u53BF",
          "652329": "\u5176\u5B83\u533A",
          "652700": "\u535A\u5C14\u5854\u62C9\u8499\u53E4\u81EA\u6CBB\u5DDE",
          "652701": "\u535A\u4E50\u5E02",
          "652702": "\u963F\u62C9\u5C71\u53E3\u5E02",
          "652722": "\u7CBE\u6CB3\u53BF",
          "652723": "\u6E29\u6CC9\u53BF",
          "652724": "\u5176\u5B83\u533A",
          "652800": "\u5DF4\u97F3\u90ED\u695E\u8499\u53E4\u81EA\u6CBB\u5DDE",
          "652801": "\u5E93\u5C14\u52D2\u5E02",
          "652822": "\u8F6E\u53F0\u53BF",
          "652823": "\u5C09\u7281\u53BF",
          "652824": "\u82E5\u7F8C\u53BF",
          "652825": "\u4E14\u672B\u53BF",
          "652826": "\u7109\u8006\u56DE\u65CF\u81EA\u6CBB\u53BF",
          "652827": "\u548C\u9759\u53BF",
          "652828": "\u548C\u7855\u53BF",
          "652829": "\u535A\u6E56\u53BF",
          "652830": "\u5176\u5B83\u533A",
          "652900": "\u963F\u514B\u82CF\u5730\u533A",
          "652901": "\u963F\u514B\u82CF\u5E02",
          "652922": "\u6E29\u5BBF\u53BF",
          "652923": "\u5E93\u8F66\u53BF",
          "652924": "\u6C99\u96C5\u53BF",
          "652925": "\u65B0\u548C\u53BF",
          "652926": "\u62DC\u57CE\u53BF",
          "652927": "\u4E4C\u4EC0\u53BF",
          "652928": "\u963F\u74E6\u63D0\u53BF",
          "652929": "\u67EF\u576A\u53BF",
          "652930": "\u5176\u5B83\u533A",
          "653000": "\u514B\u5B5C\u52D2\u82CF\u67EF\u5C14\u514B\u5B5C\u81EA\u6CBB\u5DDE",
          "653001": "\u963F\u56FE\u4EC0\u5E02",
          "653022": "\u963F\u514B\u9676\u53BF",
          "653023": "\u963F\u5408\u5947\u53BF",
          "653024": "\u4E4C\u6070\u53BF",
          "653025": "\u5176\u5B83\u533A",
          "653100": "\u5580\u4EC0\u5730\u533A",
          "653101": "\u5580\u4EC0\u5E02",
          "653121": "\u758F\u9644\u53BF",
          "653122": "\u758F\u52D2\u53BF",
          "653123": "\u82F1\u5409\u6C99\u53BF",
          "653124": "\u6CFD\u666E\u53BF",
          "653125": "\u838E\u8F66\u53BF",
          "653126": "\u53F6\u57CE\u53BF",
          "653127": "\u9EA6\u76D6\u63D0\u53BF",
          "653128": "\u5CB3\u666E\u6E56\u53BF",
          "653129": "\u4F3D\u5E08\u53BF",
          "653130": "\u5DF4\u695A\u53BF",
          "653131": "\u5854\u4EC0\u5E93\u5C14\u5E72\u5854\u5409\u514B\u81EA\u6CBB\u53BF",
          "653132": "\u5176\u5B83\u533A",
          "653200": "\u548C\u7530\u5730\u533A",
          "653201": "\u548C\u7530\u5E02",
          "653221": "\u548C\u7530\u53BF",
          "653222": "\u58A8\u7389\u53BF",
          "653223": "\u76AE\u5C71\u53BF",
          "653224": "\u6D1B\u6D66\u53BF",
          "653225": "\u7B56\u52D2\u53BF",
          "653226": "\u4E8E\u7530\u53BF",
          "653227": "\u6C11\u4E30\u53BF",
          "653228": "\u5176\u5B83\u533A",
          "654000": "\u4F0A\u7281\u54C8\u8428\u514B\u81EA\u6CBB\u5DDE",
          "654002": "\u4F0A\u5B81\u5E02",
          "654003": "\u594E\u5C6F\u5E02",
          "654021": "\u4F0A\u5B81\u53BF",
          "654022": "\u5BDF\u5E03\u67E5\u5C14\u9521\u4F2F\u81EA\u6CBB\u53BF",
          "654023": "\u970D\u57CE\u53BF",
          "654024": "\u5DE9\u7559\u53BF",
          "654025": "\u65B0\u6E90\u53BF",
          "654026": "\u662D\u82CF\u53BF",
          "654027": "\u7279\u514B\u65AF\u53BF",
          "654028": "\u5C3C\u52D2\u514B\u53BF",
          "654029": "\u5176\u5B83\u533A",
          "654200": "\u5854\u57CE\u5730\u533A",
          "654201": "\u5854\u57CE\u5E02",
          "654202": "\u4E4C\u82CF\u5E02",
          "654221": "\u989D\u654F\u53BF",
          "654223": "\u6C99\u6E7E\u53BF",
          "654224": "\u6258\u91CC\u53BF",
          "654225": "\u88D5\u6C11\u53BF",
          "654226": "\u548C\u5E03\u514B\u8D5B\u5C14\u8499\u53E4\u81EA\u6CBB\u53BF",
          "654227": "\u5176\u5B83\u533A",
          "654300": "\u963F\u52D2\u6CF0\u5730\u533A",
          "654301": "\u963F\u52D2\u6CF0\u5E02",
          "654321": "\u5E03\u5C14\u6D25\u53BF",
          "654322": "\u5BCC\u8574\u53BF",
          "654323": "\u798F\u6D77\u53BF",
          "654324": "\u54C8\u5DF4\u6CB3\u53BF",
          "654325": "\u9752\u6CB3\u53BF",
          "654326": "\u5409\u6728\u4E43\u53BF",
          "654327": "\u5176\u5B83\u533A",
          "659001": "\u77F3\u6CB3\u5B50\u5E02",
          "659002": "\u963F\u62C9\u5C14\u5E02",
          "659003": "\u56FE\u6728\u8212\u514B\u5E02",
          "659004": "\u4E94\u5BB6\u6E20\u5E02",
          "710000": "\u53F0\u6E7E",
          "710100": "\u53F0\u5317\u5E02",
          "710101": "\u4E2D\u6B63\u533A",
          "710102": "\u5927\u540C\u533A",
          "710103": "\u4E2D\u5C71\u533A",
          "710104": "\u677E\u5C71\u533A",
          "710105": "\u5927\u5B89\u533A",
          "710106": "\u4E07\u534E\u533A",
          "710107": "\u4FE1\u4E49\u533A",
          "710108": "\u58EB\u6797\u533A",
          "710109": "\u5317\u6295\u533A",
          "710110": "\u5185\u6E56\u533A",
          "710111": "\u5357\u6E2F\u533A",
          "710112": "\u6587\u5C71\u533A",
          "710113": "\u5176\u5B83\u533A",
          "710200": "\u9AD8\u96C4\u5E02",
          "710201": "\u65B0\u5174\u533A",
          "710202": "\u524D\u91D1\u533A",
          "710203": "\u82A9\u96C5\u533A",
          "710204": "\u76D0\u57D5\u533A",
          "710205": "\u9F13\u5C71\u533A",
          "710206": "\u65D7\u6D25\u533A",
          "710207": "\u524D\u9547\u533A",
          "710208": "\u4E09\u6C11\u533A",
          "710209": "\u5DE6\u8425\u533A",
          "710210": "\u6960\u6893\u533A",
          "710211": "\u5C0F\u6E2F\u533A",
          "710212": "\u5176\u5B83\u533A",
          "710241": "\u82D3\u96C5\u533A",
          "710242": "\u4EC1\u6B66\u533A",
          "710243": "\u5927\u793E\u533A",
          "710244": "\u5188\u5C71\u533A",
          "710245": "\u8DEF\u7AF9\u533A",
          "710246": "\u963F\u83B2\u533A",
          "710247": "\u7530\u5BEE\u533A",
          "710248": "\u71D5\u5DE2\u533A",
          "710249": "\u6865\u5934\u533A",
          "710250": "\u6893\u5B98\u533A",
          "710251": "\u5F25\u9640\u533A",
          "710252": "\u6C38\u5B89\u533A",
          "710253": "\u6E56\u5185\u533A",
          "710254": "\u51E4\u5C71\u533A",
          "710255": "\u5927\u5BEE\u533A",
          "710256": "\u6797\u56ED\u533A",
          "710257": "\u9E1F\u677E\u533A",
          "710258": "\u5927\u6811\u533A",
          "710259": "\u65D7\u5C71\u533A",
          "710260": "\u7F8E\u6D53\u533A",
          "710261": "\u516D\u9F9F\u533A",
          "710262": "\u5185\u95E8\u533A",
          "710263": "\u6749\u6797\u533A",
          "710264": "\u7532\u4ED9\u533A",
          "710265": "\u6843\u6E90\u533A",
          "710266": "\u90A3\u739B\u590F\u533A",
          "710267": "\u8302\u6797\u533A",
          "710268": "\u8304\u8423\u533A",
          "710300": "\u53F0\u5357\u5E02",
          "710301": "\u4E2D\u897F\u533A",
          "710302": "\u4E1C\u533A",
          "710303": "\u5357\u533A",
          "710304": "\u5317\u533A",
          "710305": "\u5B89\u5E73\u533A",
          "710306": "\u5B89\u5357\u533A",
          "710307": "\u5176\u5B83\u533A",
          "710339": "\u6C38\u5EB7\u533A",
          "710340": "\u5F52\u4EC1\u533A",
          "710341": "\u65B0\u5316\u533A",
          "710342": "\u5DE6\u9547\u533A",
          "710343": "\u7389\u4E95\u533A",
          "710344": "\u6960\u897F\u533A",
          "710345": "\u5357\u5316\u533A",
          "710346": "\u4EC1\u5FB7\u533A",
          "710347": "\u5173\u5E99\u533A",
          "710348": "\u9F99\u5D0E\u533A",
          "710349": "\u5B98\u7530\u533A",
          "710350": "\u9EBB\u8C46\u533A",
          "710351": "\u4F73\u91CC\u533A",
          "710352": "\u897F\u6E2F\u533A",
          "710353": "\u4E03\u80A1\u533A",
          "710354": "\u5C06\u519B\u533A",
          "710355": "\u5B66\u7532\u533A",
          "710356": "\u5317\u95E8\u533A",
          "710357": "\u65B0\u8425\u533A",
          "710358": "\u540E\u58C1\u533A",
          "710359": "\u767D\u6CB3\u533A",
          "710360": "\u4E1C\u5C71\u533A",
          "710361": "\u516D\u7532\u533A",
          "710362": "\u4E0B\u8425\u533A",
          "710363": "\u67F3\u8425\u533A",
          "710364": "\u76D0\u6C34\u533A",
          "710365": "\u5584\u5316\u533A",
          "710366": "\u5927\u5185\u533A",
          "710367": "\u5C71\u4E0A\u533A",
          "710368": "\u65B0\u5E02\u533A",
          "710369": "\u5B89\u5B9A\u533A",
          "710400": "\u53F0\u4E2D\u5E02",
          "710401": "\u4E2D\u533A",
          "710402": "\u4E1C\u533A",
          "710403": "\u5357\u533A",
          "710404": "\u897F\u533A",
          "710405": "\u5317\u533A",
          "710406": "\u5317\u5C6F\u533A",
          "710407": "\u897F\u5C6F\u533A",
          "710408": "\u5357\u5C6F\u533A",
          "710409": "\u5176\u5B83\u533A",
          "710431": "\u592A\u5E73\u533A",
          "710432": "\u5927\u91CC\u533A",
          "710433": "\u96FE\u5CF0\u533A",
          "710434": "\u4E4C\u65E5\u533A",
          "710435": "\u4E30\u539F\u533A",
          "710436": "\u540E\u91CC\u533A",
          "710437": "\u77F3\u5188\u533A",
          "710438": "\u4E1C\u52BF\u533A",
          "710439": "\u548C\u5E73\u533A",
          "710440": "\u65B0\u793E\u533A",
          "710441": "\u6F6D\u5B50\u533A",
          "710442": "\u5927\u96C5\u533A",
          "710443": "\u795E\u5188\u533A",
          "710444": "\u5927\u809A\u533A",
          "710445": "\u6C99\u9E7F\u533A",
          "710446": "\u9F99\u4E95\u533A",
          "710447": "\u68A7\u6816\u533A",
          "710448": "\u6E05\u6C34\u533A",
          "710449": "\u5927\u7532\u533A",
          "710450": "\u5916\u57D4\u533A",
          "710451": "\u5927\u5B89\u533A",
          "710500": "\u91D1\u95E8\u53BF",
          "710507": "\u91D1\u6C99\u9547",
          "710508": "\u91D1\u6E56\u9547",
          "710509": "\u91D1\u5B81\u4E61",
          "710510": "\u91D1\u57CE\u9547",
          "710511": "\u70C8\u5C7F\u4E61",
          "710512": "\u4E4C\u5775\u4E61",
          "710600": "\u5357\u6295\u53BF",
          "710614": "\u5357\u6295\u5E02",
          "710615": "\u4E2D\u5BEE\u4E61",
          "710616": "\u8349\u5C6F\u9547",
          "710617": "\u56FD\u59D3\u4E61",
          "710618": "\u57D4\u91CC\u9547",
          "710619": "\u4EC1\u7231\u4E61",
          "710620": "\u540D\u95F4\u4E61",
          "710621": "\u96C6\u96C6\u9547",
          "710622": "\u6C34\u91CC\u4E61",
          "710623": "\u9C7C\u6C60\u4E61",
          "710624": "\u4FE1\u4E49\u4E61",
          "710625": "\u7AF9\u5C71\u9547",
          "710626": "\u9E7F\u8C37\u4E61",
          "710700": "\u57FA\u9686\u5E02",
          "710701": "\u4EC1\u7231\u533A",
          "710702": "\u4FE1\u4E49\u533A",
          "710703": "\u4E2D\u6B63\u533A",
          "710704": "\u4E2D\u5C71\u533A",
          "710705": "\u5B89\u4E50\u533A",
          "710706": "\u6696\u6696\u533A",
          "710707": "\u4E03\u5835\u533A",
          "710708": "\u5176\u5B83\u533A",
          "710800": "\u65B0\u7AF9\u5E02",
          "710801": "\u4E1C\u533A",
          "710802": "\u5317\u533A",
          "710803": "\u9999\u5C71\u533A",
          "710804": "\u5176\u5B83\u533A",
          "710900": "\u5609\u4E49\u5E02",
          "710901": "\u4E1C\u533A",
          "710902": "\u897F\u533A",
          "710903": "\u5176\u5B83\u533A",
          "711100": "\u65B0\u5317\u5E02",
          "711130": "\u4E07\u91CC\u533A",
          "711131": "\u91D1\u5C71\u533A",
          "711132": "\u677F\u6865\u533A",
          "711133": "\u6C50\u6B62\u533A",
          "711134": "\u6DF1\u5751\u533A",
          "711135": "\u77F3\u7887\u533A",
          "711136": "\u745E\u82B3\u533A",
          "711137": "\u5E73\u6EAA\u533A",
          "711138": "\u53CC\u6EAA\u533A",
          "711139": "\u8D21\u5BEE\u533A",
          "711140": "\u65B0\u5E97\u533A",
          "711141": "\u576A\u6797\u533A",
          "711142": "\u4E4C\u6765\u533A",
          "711143": "\u6C38\u548C\u533A",
          "711144": "\u4E2D\u548C\u533A",
          "711145": "\u571F\u57CE\u533A",
          "711146": "\u4E09\u5CE1\u533A",
          "711147": "\u6811\u6797\u533A",
          "711148": "\u83BA\u6B4C\u533A",
          "711149": "\u4E09\u91CD\u533A",
          "711150": "\u65B0\u5E84\u533A",
          "711151": "\u6CF0\u5C71\u533A",
          "711152": "\u6797\u53E3\u533A",
          "711153": "\u82A6\u6D32\u533A",
          "711154": "\u4E94\u80A1\u533A",
          "711155": "\u516B\u91CC\u533A",
          "711156": "\u6DE1\u6C34\u533A",
          "711157": "\u4E09\u829D\u533A",
          "711158": "\u77F3\u95E8\u533A",
          "711200": "\u5B9C\u5170\u53BF",
          "711214": "\u5B9C\u5170\u5E02",
          "711215": "\u5934\u57CE\u9547",
          "711216": "\u7901\u6EAA\u4E61",
          "711217": "\u58EE\u56F4\u4E61",
          "711218": "\u5458\u5C71\u4E61",
          "711219": "\u7F57\u4E1C\u9547",
          "711220": "\u4E09\u661F\u4E61",
          "711221": "\u5927\u540C\u4E61",
          "711222": "\u4E94\u7ED3\u4E61",
          "711223": "\u51AC\u5C71\u4E61",
          "711224": "\u82CF\u6FB3\u9547",
          "711225": "\u5357\u6FB3\u4E61",
          "711226": "\u9493\u9C7C\u53F0",
          "711300": "\u65B0\u7AF9\u53BF",
          "711314": "\u7AF9\u5317\u5E02",
          "711315": "\u6E56\u53E3\u4E61",
          "711316": "\u65B0\u4E30\u4E61",
          "711317": "\u65B0\u57D4\u9547",
          "711318": "\u5173\u897F\u9547",
          "711319": "\u828E\u6797\u4E61",
          "711320": "\u5B9D\u5C71\u4E61",
          "711321": "\u7AF9\u4E1C\u9547",
          "711322": "\u4E94\u5CF0\u4E61",
          "711323": "\u6A2A\u5C71\u4E61",
          "711324": "\u5C16\u77F3\u4E61",
          "711325": "\u5317\u57D4\u4E61",
          "711326": "\u5CE8\u7709\u4E61",
          "711400": "\u6843\u56ED\u53BF",
          "711414": "\u4E2D\u575C\u5E02",
          "711415": "\u5E73\u9547\u5E02",
          "711416": "\u9F99\u6F6D\u4E61",
          "711417": "\u6768\u6885\u5E02",
          "711418": "\u65B0\u5C4B\u4E61",
          "711419": "\u89C2\u97F3\u4E61",
          "711420": "\u6843\u56ED\u5E02",
          "711421": "\u9F9F\u5C71\u4E61",
          "711422": "\u516B\u5FB7\u5E02",
          "711423": "\u5927\u6EAA\u9547",
          "711424": "\u590D\u5174\u4E61",
          "711425": "\u5927\u56ED\u4E61",
          "711426": "\u82A6\u7AF9\u4E61",
          "711500": "\u82D7\u6817\u53BF",
          "711519": "\u7AF9\u5357\u9547",
          "711520": "\u5934\u4EFD\u9547",
          "711521": "\u4E09\u6E7E\u4E61",
          "711522": "\u5357\u5E84\u4E61",
          "711523": "\u72EE\u6F6D\u4E61",
          "711524": "\u540E\u9F99\u9547",
          "711525": "\u901A\u9704\u9547",
          "711526": "\u82D1\u91CC\u9547",
          "711527": "\u82D7\u6817\u5E02",
          "711528": "\u9020\u6865\u4E61",
          "711529": "\u5934\u5C4B\u4E61",
          "711530": "\u516C\u9986\u4E61",
          "711531": "\u5927\u6E56\u4E61",
          "711532": "\u6CF0\u5B89\u4E61",
          "711533": "\u94DC\u9523\u4E61",
          "711534": "\u4E09\u4E49\u4E61",
          "711535": "\u897F\u6E56\u4E61",
          "711536": "\u5353\u5170\u9547",
          "711700": "\u5F70\u5316\u53BF",
          "711727": "\u5F70\u5316\u5E02",
          "711728": "\u82AC\u56ED\u4E61",
          "711729": "\u82B1\u575B\u4E61",
          "711730": "\u79C0\u6C34\u4E61",
          "711731": "\u9E7F\u6E2F\u9547",
          "711732": "\u798F\u5174\u4E61",
          "711733": "\u7EBF\u897F\u4E61",
          "711734": "\u548C\u7F8E\u9547",
          "711735": "\u4F38\u6E2F\u4E61",
          "711736": "\u5458\u6797\u9547",
          "711737": "\u793E\u5934\u4E61",
          "711738": "\u6C38\u9756\u4E61",
          "711739": "\u57D4\u5FC3\u4E61",
          "711740": "\u6EAA\u6E56\u9547",
          "711741": "\u5927\u6751\u4E61",
          "711742": "\u57D4\u76D0\u4E61",
          "711743": "\u7530\u4E2D\u9547",
          "711744": "\u5317\u6597\u9547",
          "711745": "\u7530\u5C3E\u4E61",
          "711746": "\u57E4\u5934\u4E61",
          "711747": "\u6EAA\u5DDE\u4E61",
          "711748": "\u7AF9\u5858\u4E61",
          "711749": "\u4E8C\u6797\u9547",
          "711750": "\u5927\u57CE\u4E61",
          "711751": "\u82B3\u82D1\u4E61",
          "711752": "\u4E8C\u6C34\u4E61",
          "711900": "\u5609\u4E49\u53BF",
          "711919": "\u756A\u8DEF\u4E61",
          "711920": "\u6885\u5C71\u4E61",
          "711921": "\u7AF9\u5D0E\u4E61",
          "711922": "\u963F\u91CC\u5C71\u4E61",
          "711923": "\u4E2D\u57D4\u4E61",
          "711924": "\u5927\u57D4\u4E61",
          "711925": "\u6C34\u4E0A\u4E61",
          "711926": "\u9E7F\u8349\u4E61",
          "711927": "\u592A\u4FDD\u5E02",
          "711928": "\u6734\u5B50\u5E02",
          "711929": "\u4E1C\u77F3\u4E61",
          "711930": "\u516D\u811A\u4E61",
          "711931": "\u65B0\u6E2F\u4E61",
          "711932": "\u6C11\u96C4\u4E61",
          "711933": "\u5927\u6797\u9547",
          "711934": "\u6EAA\u53E3\u4E61",
          "711935": "\u4E49\u7AF9\u4E61",
          "711936": "\u5E03\u888B\u9547",
          "712100": "\u4E91\u6797\u53BF",
          "712121": "\u6597\u5357\u9547",
          "712122": "\u5927\u57E4\u4E61",
          "712123": "\u864E\u5C3E\u9547",
          "712124": "\u571F\u5E93\u9547",
          "712125": "\u8912\u5FE0\u4E61",
          "712126": "\u4E1C\u52BF\u4E61",
          "712127": "\u53F0\u897F\u4E61",
          "712128": "\u4ED1\u80CC\u4E61",
          "712129": "\u9EA6\u5BEE\u4E61",
          "712130": "\u6597\u516D\u5E02",
          "712131": "\u6797\u5185\u4E61",
          "712132": "\u53E4\u5751\u4E61",
          "712133": "\u83BF\u6850\u4E61",
          "712134": "\u897F\u87BA\u9547",
          "712135": "\u4E8C\u4ED1\u4E61",
          "712136": "\u5317\u6E2F\u9547",
          "712137": "\u6C34\u6797\u4E61",
          "712138": "\u53E3\u6E56\u4E61",
          "712139": "\u56DB\u6E56\u4E61",
          "712140": "\u5143\u957F\u4E61",
          "712400": "\u5C4F\u4E1C\u53BF",
          "712434": "\u5C4F\u4E1C\u5E02",
          "712435": "\u4E09\u5730\u95E8\u4E61",
          "712436": "\u96FE\u53F0\u4E61",
          "712437": "\u739B\u5BB6\u4E61",
          "712438": "\u4E5D\u5982\u4E61",
          "712439": "\u91CC\u6E2F\u4E61",
          "712440": "\u9AD8\u6811\u4E61",
          "712441": "\u76D0\u57D4\u4E61",
          "712442": "\u957F\u6CBB\u4E61",
          "712443": "\u9E9F\u6D1B\u4E61",
          "712444": "\u7AF9\u7530\u4E61",
          "712445": "\u5185\u57D4\u4E61",
          "712446": "\u4E07\u4E39\u4E61",
          "712447": "\u6F6E\u5DDE\u9547",
          "712448": "\u6CF0\u6B66\u4E61",
          "712449": "\u6765\u4E49\u4E61",
          "712450": "\u4E07\u5CE6\u4E61",
          "712451": "\u5D01\u9876\u4E61",
          "712452": "\u65B0\u57E4\u4E61",
          "712453": "\u5357\u5DDE\u4E61",
          "712454": "\u6797\u8FB9\u4E61",
          "712455": "\u4E1C\u6E2F\u9547",
          "712456": "\u7409\u7403\u4E61",
          "712457": "\u4F73\u51AC\u4E61",
          "712458": "\u65B0\u56ED\u4E61",
          "712459": "\u678B\u5BEE\u4E61",
          "712460": "\u678B\u5C71\u4E61",
          "712461": "\u6625\u65E5\u4E61",
          "712462": "\u72EE\u5B50\u4E61",
          "712463": "\u8F66\u57CE\u4E61",
          "712464": "\u7261\u4E39\u4E61",
          "712465": "\u6052\u6625\u9547",
          "712466": "\u6EE1\u5DDE\u4E61",
          "712500": "\u53F0\u4E1C\u53BF",
          "712517": "\u53F0\u4E1C\u5E02",
          "712518": "\u7EFF\u5C9B\u4E61",
          "712519": "\u5170\u5C7F\u4E61",
          "712520": "\u5EF6\u5E73\u4E61",
          "712521": "\u5351\u5357\u4E61",
          "712522": "\u9E7F\u91CE\u4E61",
          "712523": "\u5173\u5C71\u9547",
          "712524": "\u6D77\u7AEF\u4E61",
          "712525": "\u6C60\u4E0A\u4E61",
          "712526": "\u4E1C\u6CB3\u4E61",
          "712527": "\u6210\u529F\u9547",
          "712528": "\u957F\u6EE8\u4E61",
          "712529": "\u91D1\u5CF0\u4E61",
          "712530": "\u5927\u6B66\u4E61",
          "712531": "\u8FBE\u4EC1\u4E61",
          "712532": "\u592A\u9EBB\u91CC\u4E61",
          "712600": "\u82B1\u83B2\u53BF",
          "712615": "\u82B1\u83B2\u5E02",
          "712616": "\u65B0\u57CE\u4E61",
          "712617": "\u592A\u9C81\u9601",
          "712618": "\u79C0\u6797\u4E61",
          "712619": "\u5409\u5B89\u4E61",
          "712620": "\u5BFF\u4E30\u4E61",
          "712621": "\u51E4\u6797\u9547",
          "712622": "\u5149\u590D\u4E61",
          "712623": "\u4E30\u6EE8\u4E61",
          "712624": "\u745E\u7A57\u4E61",
          "712625": "\u4E07\u8363\u4E61",
          "712626": "\u7389\u91CC\u9547",
          "712627": "\u5353\u6EAA\u4E61",
          "712628": "\u5BCC\u91CC\u4E61",
          "712700": "\u6F8E\u6E56\u53BF",
          "712707": "\u9A6C\u516C\u5E02",
          "712708": "\u897F\u5C7F\u4E61",
          "712709": "\u671B\u5B89\u4E61",
          "712710": "\u4E03\u7F8E\u4E61",
          "712711": "\u767D\u6C99\u4E61",
          "712712": "\u6E56\u897F\u4E61",
          "712800": "\u8FDE\u6C5F\u53BF",
          "712805": "\u5357\u7AFF\u4E61",
          "712806": "\u5317\u7AFF\u4E61",
          "712807": "\u8392\u5149\u4E61",
          "712808": "\u4E1C\u5F15\u4E61",
          "810000": "\u9999\u6E2F\u7279\u522B\u884C\u653F\u533A",
          "810100": "\u9999\u6E2F\u5C9B",
          "810101": "\u4E2D\u897F\u533A",
          "810102": "\u6E7E\u4ED4",
          "810103": "\u4E1C\u533A",
          "810104": "\u5357\u533A",
          "810200": "\u4E5D\u9F99",
          "810201": "\u4E5D\u9F99\u57CE\u533A",
          "810202": "\u6CB9\u5C16\u65FA\u533A",
          "810203": "\u6DF1\u6C34\u57D7\u533A",
          "810204": "\u9EC4\u5927\u4ED9\u533A",
          "810205": "\u89C2\u5858\u533A",
          "810300": "\u65B0\u754C",
          "810301": "\u5317\u533A",
          "810302": "\u5927\u57D4\u533A",
          "810303": "\u6C99\u7530\u533A",
          "810304": "\u897F\u8D21\u533A",
          "810305": "\u5143\u6717\u533A",
          "810306": "\u5C6F\u95E8\u533A",
          "810307": "\u8343\u6E7E\u533A",
          "810308": "\u8475\u9752\u533A",
          "810309": "\u79BB\u5C9B\u533A",
          "820000": "\u6FB3\u95E8\u7279\u522B\u884C\u653F\u533A",
          "820100": "\u6FB3\u95E8\u534A\u5C9B",
          "820200": "\u79BB\u5C9B",
          "990000": "\u6D77\u5916",
          "990100": "\u6D77\u5916"
        };
        function tree(list) {
          var mapped = {};
          for (var i2 = 0, item; i2 < list.length; i2++) {
            item = list[i2];
            if (!item || !item.id)
              continue;
            mapped[item.id] = item;
          }
          var result = [];
          for (var ii = 0; ii < list.length; ii++) {
            item = list[ii];
            if (!item)
              continue;
            if (item.pid == void 0 && item.parentId == void 0) {
              result.push(item);
              continue;
            }
            var parent = mapped[item.pid] || mapped[item.parentId];
            if (!parent)
              continue;
            if (!parent.children)
              parent.children = [];
            parent.children.push(item);
          }
          return result;
        }
        var DICT_FIXED = function() {
          var fixed = [];
          for (var id in DICT) {
            var pid = id.slice(2, 6) === "0000" ? void 0 : id.slice(4, 6) == "00" ? id.slice(0, 2) + "0000" : id.slice(0, 4) + "00";
            fixed.push({
              id,
              pid,
              name: DICT[id]
            });
          }
          return tree(fixed);
        }();
        module2.exports = DICT_FIXED;
      },
      function(module2, exports2, __webpack_require__2) {
        var DICT = __webpack_require__2(18);
        module2.exports = {
          d4: function() {
            return this.natural(1, 4);
          },
          d6: function() {
            return this.natural(1, 6);
          },
          d8: function() {
            return this.natural(1, 8);
          },
          d12: function() {
            return this.natural(1, 12);
          },
          d20: function() {
            return this.natural(1, 20);
          },
          d100: function() {
            return this.natural(1, 100);
          },
          guid: function() {
            var pool = "abcdefABCDEF1234567890", guid = this.string(pool, 8) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 4) + "-" + this.string(pool, 12);
            return guid;
          },
          uuid: function() {
            return this.guid();
          },
          id: function() {
            var id, sum = 0, rank = [
              "7",
              "9",
              "10",
              "5",
              "8",
              "4",
              "2",
              "1",
              "6",
              "3",
              "7",
              "9",
              "10",
              "5",
              "8",
              "4",
              "2"
            ], last = [
              "1",
              "0",
              "X",
              "9",
              "8",
              "7",
              "6",
              "5",
              "4",
              "3",
              "2"
            ];
            id = this.pick(DICT).id + this.date("yyyyMMdd") + this.string("number", 3);
            for (var i2 = 0; i2 < id.length; i2++) {
              sum += id[i2] * rank[i2];
            }
            id += last[sum % 11];
            return id;
          },
          increment: function() {
            var key2 = 0;
            return function(step) {
              return key2 += +step || 1;
            };
          }(),
          inc: function(step) {
            return this.increment(step);
          }
        };
      },
      function(module2, exports2, __webpack_require__2) {
        var Parser2 = __webpack_require__2(21);
        var Handler2 = __webpack_require__2(22);
        module2.exports = {
          Parser: Parser2,
          Handler: Handler2
        };
      },
      function(module2, exports2) {
        function Token(n2) {
          this.type = n2, this.offset = Token.offset(), this.text = Token.text();
        }
        function Alternate(n2, l2) {
          Token.call(this, "alternate"), this.left = n2, this.right = l2;
        }
        function Match(n2) {
          Token.call(this, "match"), this.body = n2.filter(Boolean);
        }
        function Group(n2, l2) {
          Token.call(this, n2), this.body = l2;
        }
        function CaptureGroup(n2) {
          Group.call(this, "capture-group"), this.index = cgs[this.offset] || (cgs[this.offset] = index2++), this.body = n2;
        }
        function Quantified(n2, l2) {
          Token.call(this, "quantified"), this.body = n2, this.quantifier = l2;
        }
        function Quantifier(n2, l2) {
          Token.call(this, "quantifier"), this.min = n2, this.max = l2, this.greedy = true;
        }
        function CharSet(n2, l2) {
          Token.call(this, "charset"), this.invert = n2, this.body = l2;
        }
        function CharacterRange(n2, l2) {
          Token.call(this, "range"), this.start = n2, this.end = l2;
        }
        function Literal(n2) {
          Token.call(this, "literal"), this.body = n2, this.escaped = this.body != this.text;
        }
        function Unicode(n2) {
          Token.call(this, "unicode"), this.code = n2.toUpperCase();
        }
        function Hex(n2) {
          Token.call(this, "hex"), this.code = n2.toUpperCase();
        }
        function Octal(n2) {
          Token.call(this, "octal"), this.code = n2.toUpperCase();
        }
        function BackReference(n2) {
          Token.call(this, "back-reference"), this.code = n2.toUpperCase();
        }
        function ControlCharacter(n2) {
          Token.call(this, "control-character"), this.code = n2.toUpperCase();
        }
        var parser = function() {
          function n2(n3, l3) {
            function u3() {
              this.constructor = n3;
            }
            u3.prototype = l3.prototype, n3.prototype = new u3();
          }
          function l2(n3, l3, u3, t2, r2) {
            function e2(n4, l4) {
              function u4(n5) {
                function l5(n6) {
                  return n6.charCodeAt(0).toString(16).toUpperCase();
                }
                return n5.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function(n6) {
                  return "\\x0" + l5(n6);
                }).replace(/[\x10-\x1F\x80-\xFF]/g, function(n6) {
                  return "\\x" + l5(n6);
                }).replace(/[\u0180-\u0FFF]/g, function(n6) {
                  return "\\u0" + l5(n6);
                }).replace(/[\u1080-\uFFFF]/g, function(n6) {
                  return "\\u" + l5(n6);
                });
              }
              var t3, r3;
              switch (n4.length) {
                case 0:
                  t3 = "end of input";
                  break;
                case 1:
                  t3 = n4[0];
                  break;
                default:
                  t3 = n4.slice(0, -1).join(", ") + " or " + n4[n4.length - 1];
              }
              return r3 = l4 ? '"' + u4(l4) + '"' : "end of input", "Expected " + t3 + " but " + r3 + " found.";
            }
            this.expected = n3, this.found = l3, this.offset = u3, this.line = t2, this.column = r2, this.name = "SyntaxError", this.message = e2(n3, l3);
          }
          function u2(n3) {
            function u3() {
              return n3.substring(Lt2, qt2);
            }
            function t2() {
              return Lt2;
            }
            function r2(l3) {
              function u4(l4, u5, t3) {
                var r3, e3;
                for (r3 = u5; t3 > r3; r3++)
                  e3 = n3.charAt(r3), "\n" === e3 ? (l4.seenCR || l4.line++, l4.column = 1, l4.seenCR = false) : "\r" === e3 || "\u2028" === e3 || "\u2029" === e3 ? (l4.line++, l4.column = 1, l4.seenCR = true) : (l4.column++, l4.seenCR = false);
              }
              return Mt2 !== l3 && (Mt2 > l3 && (Mt2 = 0, Dt2 = {
                line: 1,
                column: 1,
                seenCR: false
              }), u4(Dt2, Mt2, l3), Mt2 = l3), Dt2;
            }
            function e2(n4) {
              Ht2 > qt2 || (qt2 > Ht2 && (Ht2 = qt2, Ot2 = []), Ot2.push(n4));
            }
            function o2(n4) {
              var l3 = 0;
              for (n4.sort(); l3 < n4.length; )
                n4[l3 - 1] === n4[l3] ? n4.splice(l3, 1) : l3++;
            }
            function c2() {
              var l3, u4, t3, r3, o3;
              return l3 = qt2, u4 = i2(), null !== u4 ? (t3 = qt2, 124 === n3.charCodeAt(qt2) ? (r3 = fl, qt2++) : (r3 = null, 0 === Wt2 && e2(sl)), null !== r3 ? (o3 = c2(), null !== o3 ? (r3 = [r3, o3], t3 = r3) : (qt2 = t3, t3 = il)) : (qt2 = t3, t3 = il), null === t3 && (t3 = al), null !== t3 ? (Lt2 = l3, u4 = hl(u4, t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il), l3;
            }
            function i2() {
              var n4, l3, u4, t3, r3;
              if (n4 = qt2, l3 = f2(), null === l3 && (l3 = al), null !== l3)
                if (u4 = qt2, Wt2++, t3 = d2(), Wt2--, null === t3 ? u4 = al : (qt2 = u4, u4 = il), null !== u4) {
                  for (t3 = [], r3 = h2(), null === r3 && (r3 = a2()); null !== r3; )
                    t3.push(r3), r3 = h2(), null === r3 && (r3 = a2());
                  null !== t3 ? (r3 = s2(), null === r3 && (r3 = al), null !== r3 ? (Lt2 = n4, l3 = dl(l3, t3, r3), null === l3 ? (qt2 = n4, n4 = l3) : n4 = l3) : (qt2 = n4, n4 = il)) : (qt2 = n4, n4 = il);
                } else
                  qt2 = n4, n4 = il;
              else
                qt2 = n4, n4 = il;
              return n4;
            }
            function a2() {
              var n4;
              return n4 = x2(), null === n4 && (n4 = Q2(), null === n4 && (n4 = B2())), n4;
            }
            function f2() {
              var l3, u4;
              return l3 = qt2, 94 === n3.charCodeAt(qt2) ? (u4 = pl, qt2++) : (u4 = null, 0 === Wt2 && e2(vl)), null !== u4 && (Lt2 = l3, u4 = wl()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function s2() {
              var l3, u4;
              return l3 = qt2, 36 === n3.charCodeAt(qt2) ? (u4 = Al, qt2++) : (u4 = null, 0 === Wt2 && e2(Cl)), null !== u4 && (Lt2 = l3, u4 = gl()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function h2() {
              var n4, l3, u4;
              return n4 = qt2, l3 = a2(), null !== l3 ? (u4 = d2(), null !== u4 ? (Lt2 = n4, l3 = bl(l3, u4), null === l3 ? (qt2 = n4, n4 = l3) : n4 = l3) : (qt2 = n4, n4 = il)) : (qt2 = n4, n4 = il), n4;
            }
            function d2() {
              var n4, l3, u4;
              return Wt2++, n4 = qt2, l3 = p2(), null !== l3 ? (u4 = k2(), null === u4 && (u4 = al), null !== u4 ? (Lt2 = n4, l3 = Tl(l3, u4), null === l3 ? (qt2 = n4, n4 = l3) : n4 = l3) : (qt2 = n4, n4 = il)) : (qt2 = n4, n4 = il), Wt2--, null === n4 && (l3 = null, 0 === Wt2 && e2(kl)), n4;
            }
            function p2() {
              var n4;
              return n4 = v2(), null === n4 && (n4 = w2(), null === n4 && (n4 = A2(), null === n4 && (n4 = C2(), null === n4 && (n4 = g2(), null === n4 && (n4 = b2()))))), n4;
            }
            function v2() {
              var l3, u4, t3, r3, o3, c3;
              return l3 = qt2, 123 === n3.charCodeAt(qt2) ? (u4 = xl, qt2++) : (u4 = null, 0 === Wt2 && e2(yl)), null !== u4 ? (t3 = T2(), null !== t3 ? (44 === n3.charCodeAt(qt2) ? (r3 = ml, qt2++) : (r3 = null, 0 === Wt2 && e2(Rl)), null !== r3 ? (o3 = T2(), null !== o3 ? (125 === n3.charCodeAt(qt2) ? (c3 = Fl, qt2++) : (c3 = null, 0 === Wt2 && e2(Ql)), null !== c3 ? (Lt2 = l3, u4 = Sl(t3, o3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il), l3;
            }
            function w2() {
              var l3, u4, t3, r3;
              return l3 = qt2, 123 === n3.charCodeAt(qt2) ? (u4 = xl, qt2++) : (u4 = null, 0 === Wt2 && e2(yl)), null !== u4 ? (t3 = T2(), null !== t3 ? (n3.substr(qt2, 2) === Ul ? (r3 = Ul, qt2 += 2) : (r3 = null, 0 === Wt2 && e2(El)), null !== r3 ? (Lt2 = l3, u4 = Gl(t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il), l3;
            }
            function A2() {
              var l3, u4, t3, r3;
              return l3 = qt2, 123 === n3.charCodeAt(qt2) ? (u4 = xl, qt2++) : (u4 = null, 0 === Wt2 && e2(yl)), null !== u4 ? (t3 = T2(), null !== t3 ? (125 === n3.charCodeAt(qt2) ? (r3 = Fl, qt2++) : (r3 = null, 0 === Wt2 && e2(Ql)), null !== r3 ? (Lt2 = l3, u4 = Bl(t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il), l3;
            }
            function C2() {
              var l3, u4;
              return l3 = qt2, 43 === n3.charCodeAt(qt2) ? (u4 = jl, qt2++) : (u4 = null, 0 === Wt2 && e2($l)), null !== u4 && (Lt2 = l3, u4 = ql()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function g2() {
              var l3, u4;
              return l3 = qt2, 42 === n3.charCodeAt(qt2) ? (u4 = Ll, qt2++) : (u4 = null, 0 === Wt2 && e2(Ml)), null !== u4 && (Lt2 = l3, u4 = Dl()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function b2() {
              var l3, u4;
              return l3 = qt2, 63 === n3.charCodeAt(qt2) ? (u4 = Hl, qt2++) : (u4 = null, 0 === Wt2 && e2(Ol)), null !== u4 && (Lt2 = l3, u4 = Wl()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function k2() {
              var l3;
              return 63 === n3.charCodeAt(qt2) ? (l3 = Hl, qt2++) : (l3 = null, 0 === Wt2 && e2(Ol)), l3;
            }
            function T2() {
              var l3, u4, t3;
              if (l3 = qt2, u4 = [], zl.test(n3.charAt(qt2)) ? (t3 = n3.charAt(qt2), qt2++) : (t3 = null, 0 === Wt2 && e2(Il)), null !== t3)
                for (; null !== t3; )
                  u4.push(t3), zl.test(n3.charAt(qt2)) ? (t3 = n3.charAt(qt2), qt2++) : (t3 = null, 0 === Wt2 && e2(Il));
              else
                u4 = il;
              return null !== u4 && (Lt2 = l3, u4 = Jl(u4)), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function x2() {
              var l3, u4, t3, r3;
              return l3 = qt2, 40 === n3.charCodeAt(qt2) ? (u4 = Kl, qt2++) : (u4 = null, 0 === Wt2 && e2(Nl)), null !== u4 ? (t3 = R2(), null === t3 && (t3 = F2(), null === t3 && (t3 = m2(), null === t3 && (t3 = y()))), null !== t3 ? (41 === n3.charCodeAt(qt2) ? (r3 = Pl, qt2++) : (r3 = null, 0 === Wt2 && e2(Vl)), null !== r3 ? (Lt2 = l3, u4 = Xl(t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il), l3;
            }
            function y() {
              var n4, l3;
              return n4 = qt2, l3 = c2(), null !== l3 && (Lt2 = n4, l3 = Yl(l3)), null === l3 ? (qt2 = n4, n4 = l3) : n4 = l3, n4;
            }
            function m2() {
              var l3, u4, t3;
              return l3 = qt2, n3.substr(qt2, 2) === Zl ? (u4 = Zl, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(_l)), null !== u4 ? (t3 = c2(), null !== t3 ? (Lt2 = l3, u4 = nu(t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il), l3;
            }
            function R2() {
              var l3, u4, t3;
              return l3 = qt2, n3.substr(qt2, 2) === lu ? (u4 = lu, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(uu)), null !== u4 ? (t3 = c2(), null !== t3 ? (Lt2 = l3, u4 = tu(t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il), l3;
            }
            function F2() {
              var l3, u4, t3;
              return l3 = qt2, n3.substr(qt2, 2) === ru ? (u4 = ru, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(eu)), null !== u4 ? (t3 = c2(), null !== t3 ? (Lt2 = l3, u4 = ou(t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il), l3;
            }
            function Q2() {
              var l3, u4, t3, r3, o3;
              if (Wt2++, l3 = qt2, 91 === n3.charCodeAt(qt2) ? (u4 = iu, qt2++) : (u4 = null, 0 === Wt2 && e2(au)), null !== u4)
                if (94 === n3.charCodeAt(qt2) ? (t3 = pl, qt2++) : (t3 = null, 0 === Wt2 && e2(vl)), null === t3 && (t3 = al), null !== t3) {
                  for (r3 = [], o3 = S2(), null === o3 && (o3 = U2()); null !== o3; )
                    r3.push(o3), o3 = S2(), null === o3 && (o3 = U2());
                  null !== r3 ? (93 === n3.charCodeAt(qt2) ? (o3 = fu, qt2++) : (o3 = null, 0 === Wt2 && e2(su)), null !== o3 ? (Lt2 = l3, u4 = hu(t3, r3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il);
                } else
                  qt2 = l3, l3 = il;
              else
                qt2 = l3, l3 = il;
              return Wt2--, null === l3 && (u4 = null, 0 === Wt2 && e2(cu)), l3;
            }
            function S2() {
              var l3, u4, t3, r3;
              return Wt2++, l3 = qt2, u4 = U2(), null !== u4 ? (45 === n3.charCodeAt(qt2) ? (t3 = pu, qt2++) : (t3 = null, 0 === Wt2 && e2(vu)), null !== t3 ? (r3 = U2(), null !== r3 ? (Lt2 = l3, u4 = wu(u4, r3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il), Wt2--, null === l3 && (u4 = null, 0 === Wt2 && e2(du)), l3;
            }
            function U2() {
              var n4;
              return Wt2++, n4 = G2(), null === n4 && (n4 = E2()), Wt2--, null === n4 && (0 === Wt2 && e2(Au)), n4;
            }
            function E2() {
              var l3, u4;
              return l3 = qt2, Cu.test(n3.charAt(qt2)) ? (u4 = n3.charAt(qt2), qt2++) : (u4 = null, 0 === Wt2 && e2(gu)), null !== u4 && (Lt2 = l3, u4 = bu(u4)), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function G2() {
              var n4;
              return n4 = L2(), null === n4 && (n4 = Y2(), null === n4 && (n4 = H2(), null === n4 && (n4 = O2(), null === n4 && (n4 = W2(), null === n4 && (n4 = z2(), null === n4 && (n4 = I2(), null === n4 && (n4 = J2(), null === n4 && (n4 = K2(), null === n4 && (n4 = N2(), null === n4 && (n4 = P2(), null === n4 && (n4 = V2(), null === n4 && (n4 = X2(), null === n4 && (n4 = _2(), null === n4 && (n4 = nl(), null === n4 && (n4 = ll(), null === n4 && (n4 = ul(), null === n4 && (n4 = tl()))))))))))))))))), n4;
            }
            function B2() {
              var n4;
              return n4 = j2(), null === n4 && (n4 = q2(), null === n4 && (n4 = $2())), n4;
            }
            function j2() {
              var l3, u4;
              return l3 = qt2, 46 === n3.charCodeAt(qt2) ? (u4 = ku, qt2++) : (u4 = null, 0 === Wt2 && e2(Tu)), null !== u4 && (Lt2 = l3, u4 = xu()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function $2() {
              var l3, u4;
              return Wt2++, l3 = qt2, mu.test(n3.charAt(qt2)) ? (u4 = n3.charAt(qt2), qt2++) : (u4 = null, 0 === Wt2 && e2(Ru)), null !== u4 && (Lt2 = l3, u4 = bu(u4)), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, Wt2--, null === l3 && (u4 = null, 0 === Wt2 && e2(yu)), l3;
            }
            function q2() {
              var n4;
              return n4 = M2(), null === n4 && (n4 = D2(), null === n4 && (n4 = Y2(), null === n4 && (n4 = H2(), null === n4 && (n4 = O2(), null === n4 && (n4 = W2(), null === n4 && (n4 = z2(), null === n4 && (n4 = I2(), null === n4 && (n4 = J2(), null === n4 && (n4 = K2(), null === n4 && (n4 = N2(), null === n4 && (n4 = P2(), null === n4 && (n4 = V2(), null === n4 && (n4 = X2(), null === n4 && (n4 = Z2(), null === n4 && (n4 = _2(), null === n4 && (n4 = nl(), null === n4 && (n4 = ll(), null === n4 && (n4 = ul(), null === n4 && (n4 = tl()))))))))))))))))))), n4;
            }
            function L2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === Fu ? (u4 = Fu, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(Qu)), null !== u4 && (Lt2 = l3, u4 = Su()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function M2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === Fu ? (u4 = Fu, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(Qu)), null !== u4 && (Lt2 = l3, u4 = Uu()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function D2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === Eu ? (u4 = Eu, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(Gu)), null !== u4 && (Lt2 = l3, u4 = Bu()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function H2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === ju ? (u4 = ju, qt2 += 2) : (u4 = null, 0 === Wt2 && e2($u)), null !== u4 && (Lt2 = l3, u4 = qu()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function O2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === Lu ? (u4 = Lu, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(Mu)), null !== u4 && (Lt2 = l3, u4 = Du()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function W2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === Hu ? (u4 = Hu, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(Ou)), null !== u4 && (Lt2 = l3, u4 = Wu()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function z2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === zu ? (u4 = zu, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(Iu)), null !== u4 && (Lt2 = l3, u4 = Ju()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function I2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === Ku ? (u4 = Ku, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(Nu)), null !== u4 && (Lt2 = l3, u4 = Pu()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function J2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === Vu ? (u4 = Vu, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(Xu)), null !== u4 && (Lt2 = l3, u4 = Yu()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function K2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === Zu ? (u4 = Zu, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(_u)), null !== u4 && (Lt2 = l3, u4 = nt2()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function N2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === lt2 ? (u4 = lt2, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(ut2)), null !== u4 && (Lt2 = l3, u4 = tt2()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function P2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === rt2 ? (u4 = rt2, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(et2)), null !== u4 && (Lt2 = l3, u4 = ot2()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function V2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === ct2 ? (u4 = ct2, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(it2)), null !== u4 && (Lt2 = l3, u4 = at2()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function X2() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === ft2 ? (u4 = ft2, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(st2)), null !== u4 && (Lt2 = l3, u4 = ht2()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function Y2() {
              var l3, u4, t3;
              return l3 = qt2, n3.substr(qt2, 2) === dt2 ? (u4 = dt2, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(pt2)), null !== u4 ? (n3.length > qt2 ? (t3 = n3.charAt(qt2), qt2++) : (t3 = null, 0 === Wt2 && e2(vt2)), null !== t3 ? (Lt2 = l3, u4 = wt2(t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il), l3;
            }
            function Z2() {
              var l3, u4, t3;
              return l3 = qt2, 92 === n3.charCodeAt(qt2) ? (u4 = At2, qt2++) : (u4 = null, 0 === Wt2 && e2(Ct2)), null !== u4 ? (gt2.test(n3.charAt(qt2)) ? (t3 = n3.charAt(qt2), qt2++) : (t3 = null, 0 === Wt2 && e2(bt2)), null !== t3 ? (Lt2 = l3, u4 = kt2(t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il), l3;
            }
            function _2() {
              var l3, u4, t3, r3;
              if (l3 = qt2, n3.substr(qt2, 2) === Tt2 ? (u4 = Tt2, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(xt2)), null !== u4) {
                if (t3 = [], yt2.test(n3.charAt(qt2)) ? (r3 = n3.charAt(qt2), qt2++) : (r3 = null, 0 === Wt2 && e2(mt2)), null !== r3)
                  for (; null !== r3; )
                    t3.push(r3), yt2.test(n3.charAt(qt2)) ? (r3 = n3.charAt(qt2), qt2++) : (r3 = null, 0 === Wt2 && e2(mt2));
                else
                  t3 = il;
                null !== t3 ? (Lt2 = l3, u4 = Rt2(t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il);
              } else
                qt2 = l3, l3 = il;
              return l3;
            }
            function nl() {
              var l3, u4, t3, r3;
              if (l3 = qt2, n3.substr(qt2, 2) === Ft2 ? (u4 = Ft2, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(Qt2)), null !== u4) {
                if (t3 = [], St2.test(n3.charAt(qt2)) ? (r3 = n3.charAt(qt2), qt2++) : (r3 = null, 0 === Wt2 && e2(Ut2)), null !== r3)
                  for (; null !== r3; )
                    t3.push(r3), St2.test(n3.charAt(qt2)) ? (r3 = n3.charAt(qt2), qt2++) : (r3 = null, 0 === Wt2 && e2(Ut2));
                else
                  t3 = il;
                null !== t3 ? (Lt2 = l3, u4 = Et2(t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il);
              } else
                qt2 = l3, l3 = il;
              return l3;
            }
            function ll() {
              var l3, u4, t3, r3;
              if (l3 = qt2, n3.substr(qt2, 2) === Gt2 ? (u4 = Gt2, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(Bt2)), null !== u4) {
                if (t3 = [], St2.test(n3.charAt(qt2)) ? (r3 = n3.charAt(qt2), qt2++) : (r3 = null, 0 === Wt2 && e2(Ut2)), null !== r3)
                  for (; null !== r3; )
                    t3.push(r3), St2.test(n3.charAt(qt2)) ? (r3 = n3.charAt(qt2), qt2++) : (r3 = null, 0 === Wt2 && e2(Ut2));
                else
                  t3 = il;
                null !== t3 ? (Lt2 = l3, u4 = jt2(t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il);
              } else
                qt2 = l3, l3 = il;
              return l3;
            }
            function ul() {
              var l3, u4;
              return l3 = qt2, n3.substr(qt2, 2) === Tt2 ? (u4 = Tt2, qt2 += 2) : (u4 = null, 0 === Wt2 && e2(xt2)), null !== u4 && (Lt2 = l3, u4 = $t2()), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4, l3;
            }
            function tl() {
              var l3, u4, t3;
              return l3 = qt2, 92 === n3.charCodeAt(qt2) ? (u4 = At2, qt2++) : (u4 = null, 0 === Wt2 && e2(Ct2)), null !== u4 ? (n3.length > qt2 ? (t3 = n3.charAt(qt2), qt2++) : (t3 = null, 0 === Wt2 && e2(vt2)), null !== t3 ? (Lt2 = l3, u4 = bu(t3), null === u4 ? (qt2 = l3, l3 = u4) : l3 = u4) : (qt2 = l3, l3 = il)) : (qt2 = l3, l3 = il), l3;
            }
            var rl, el = arguments.length > 1 ? arguments[1] : {}, ol = {
              regexp: c2
            }, cl = c2, il = null, al = "", fl = "|", sl = '"|"', hl = function(n4, l3) {
              return l3 ? new Alternate(n4, l3[1]) : n4;
            }, dl = function(n4, l3, u4) {
              return new Match([n4].concat(l3).concat([u4]));
            }, pl = "^", vl = '"^"', wl = function() {
              return new Token("start");
            }, Al = "$", Cl = '"$"', gl = function() {
              return new Token("end");
            }, bl = function(n4, l3) {
              return new Quantified(n4, l3);
            }, kl = "Quantifier", Tl = function(n4, l3) {
              return l3 && (n4.greedy = false), n4;
            }, xl = "{", yl = '"{"', ml = ",", Rl = '","', Fl = "}", Ql = '"}"', Sl = function(n4, l3) {
              return new Quantifier(n4, l3);
            }, Ul = ",}", El = '",}"', Gl = function(n4) {
              return new Quantifier(n4, 1 / 0);
            }, Bl = function(n4) {
              return new Quantifier(n4, n4);
            }, jl = "+", $l = '"+"', ql = function() {
              return new Quantifier(1, 1 / 0);
            }, Ll = "*", Ml = '"*"', Dl = function() {
              return new Quantifier(0, 1 / 0);
            }, Hl = "?", Ol = '"?"', Wl = function() {
              return new Quantifier(0, 1);
            }, zl = /^[0-9]/, Il = "[0-9]", Jl = function(n4) {
              return +n4.join("");
            }, Kl = "(", Nl = '"("', Pl = ")", Vl = '")"', Xl = function(n4) {
              return n4;
            }, Yl = function(n4) {
              return new CaptureGroup(n4);
            }, Zl = "?:", _l = '"?:"', nu = function(n4) {
              return new Group("non-capture-group", n4);
            }, lu = "?=", uu = '"?="', tu = function(n4) {
              return new Group("positive-lookahead", n4);
            }, ru = "?!", eu = '"?!"', ou = function(n4) {
              return new Group("negative-lookahead", n4);
            }, cu = "CharacterSet", iu = "[", au = '"["', fu = "]", su = '"]"', hu = function(n4, l3) {
              return new CharSet(!!n4, l3);
            }, du = "CharacterRange", pu = "-", vu = '"-"', wu = function(n4, l3) {
              return new CharacterRange(n4, l3);
            }, Au = "Character", Cu = /^[^\\\]]/, gu = "[^\\\\\\]]", bu = function(n4) {
              return new Literal(n4);
            }, ku = ".", Tu = '"."', xu = function() {
              return new Token("any-character");
            }, yu = "Literal", mu = /^[^|\\\/.[()?+*$\^]/, Ru = "[^|\\\\\\/.[()?+*$\\^]", Fu = "\\b", Qu = '"\\\\b"', Su = function() {
              return new Token("backspace");
            }, Uu = function() {
              return new Token("word-boundary");
            }, Eu = "\\B", Gu = '"\\\\B"', Bu = function() {
              return new Token("non-word-boundary");
            }, ju = "\\d", $u = '"\\\\d"', qu = function() {
              return new Token("digit");
            }, Lu = "\\D", Mu = '"\\\\D"', Du = function() {
              return new Token("non-digit");
            }, Hu = "\\f", Ou = '"\\\\f"', Wu = function() {
              return new Token("form-feed");
            }, zu = "\\n", Iu = '"\\\\n"', Ju = function() {
              return new Token("line-feed");
            }, Ku = "\\r", Nu = '"\\\\r"', Pu = function() {
              return new Token("carriage-return");
            }, Vu = "\\s", Xu = '"\\\\s"', Yu = function() {
              return new Token("white-space");
            }, Zu = "\\S", _u = '"\\\\S"', nt2 = function() {
              return new Token("non-white-space");
            }, lt2 = "\\t", ut2 = '"\\\\t"', tt2 = function() {
              return new Token("tab");
            }, rt2 = "\\v", et2 = '"\\\\v"', ot2 = function() {
              return new Token("vertical-tab");
            }, ct2 = "\\w", it2 = '"\\\\w"', at2 = function() {
              return new Token("word");
            }, ft2 = "\\W", st2 = '"\\\\W"', ht2 = function() {
              return new Token("non-word");
            }, dt2 = "\\c", pt2 = '"\\\\c"', vt2 = "any character", wt2 = function(n4) {
              return new ControlCharacter(n4);
            }, At2 = "\\", Ct2 = '"\\\\"', gt2 = /^[1-9]/, bt2 = "[1-9]", kt2 = function(n4) {
              return new BackReference(n4);
            }, Tt2 = "\\0", xt2 = '"\\\\0"', yt2 = /^[0-7]/, mt2 = "[0-7]", Rt2 = function(n4) {
              return new Octal(n4.join(""));
            }, Ft2 = "\\x", Qt2 = '"\\\\x"', St2 = /^[0-9a-fA-F]/, Ut2 = "[0-9a-fA-F]", Et2 = function(n4) {
              return new Hex(n4.join(""));
            }, Gt2 = "\\u", Bt2 = '"\\\\u"', jt2 = function(n4) {
              return new Unicode(n4.join(""));
            }, $t2 = function() {
              return new Token("null-character");
            }, qt2 = 0, Lt2 = 0, Mt2 = 0, Dt2 = {
              line: 1,
              column: 1,
              seenCR: false
            }, Ht2 = 0, Ot2 = [], Wt2 = 0;
            if ("startRule" in el) {
              if (!(el.startRule in ol))
                throw new Error(`Can't start parsing from rule "` + el.startRule + '".');
              cl = ol[el.startRule];
            }
            if (Token.offset = t2, Token.text = u3, rl = cl(), null !== rl && qt2 === n3.length)
              return rl;
            throw o2(Ot2), Lt2 = Math.max(qt2, Ht2), new l2(Ot2, Lt2 < n3.length ? n3.charAt(Lt2) : null, Lt2, r2(Lt2).line, r2(Lt2).column);
          }
          return n2(l2, Error), {
            SyntaxError: l2,
            parse: u2
          };
        }(), index2 = 1, cgs = {};
        module2.exports = parser;
      },
      function(module2, exports2, __webpack_require__2) {
        var Util2 = __webpack_require__2(3);
        var Random2 = __webpack_require__2(5);
        var Handler2 = {
          extend: Util2.extend
        };
        var LOWER = ascii(97, 122);
        var UPPER = ascii(65, 90);
        var NUMBER = ascii(48, 57);
        var OTHER = ascii(32, 47) + ascii(58, 64) + ascii(91, 96) + ascii(123, 126);
        var PRINTABLE = ascii(32, 126);
        var SPACE = " \f\n\r	\v\xA0\u2028\u2029";
        var CHARACTER_CLASSES = {
          "\\w": LOWER + UPPER + NUMBER + "_",
          "\\W": OTHER.replace("_", ""),
          "\\s": SPACE,
          "\\S": function() {
            var result = PRINTABLE;
            for (var i2 = 0; i2 < SPACE.length; i2++) {
              result = result.replace(SPACE[i2], "");
            }
            return result;
          }(),
          "\\d": NUMBER,
          "\\D": LOWER + UPPER + OTHER
        };
        function ascii(from, to) {
          var result = "";
          for (var i2 = from; i2 <= to; i2++) {
            result += String.fromCharCode(i2);
          }
          return result;
        }
        Handler2.gen = function(node, result, cache) {
          cache = cache || {
            guid: 1
          };
          return Handler2[node.type] ? Handler2[node.type](node, result, cache) : Handler2.token(node, result, cache);
        };
        Handler2.extend({
          token: function(node, result, cache) {
            switch (node.type) {
              case "start":
              case "end":
                return "";
              case "any-character":
                return Random2.character();
              case "backspace":
                return "";
              case "word-boundary":
                return "";
              case "non-word-boundary":
                break;
              case "digit":
                return Random2.pick(
                  NUMBER.split("")
                );
              case "non-digit":
                return Random2.pick(
                  (LOWER + UPPER + OTHER).split("")
                );
              case "form-feed":
                break;
              case "line-feed":
                return node.body || node.text;
              case "carriage-return":
                break;
              case "white-space":
                return Random2.pick(
                  SPACE.split("")
                );
              case "non-white-space":
                return Random2.pick(
                  (LOWER + UPPER + NUMBER).split("")
                );
              case "tab":
                break;
              case "vertical-tab":
                break;
              case "word":
                return Random2.pick(
                  (LOWER + UPPER + NUMBER).split("")
                );
              case "non-word":
                return Random2.pick(
                  OTHER.replace("_", "").split("")
                );
            }
            return node.body || node.text;
          },
          alternate: function(node, result, cache) {
            return this.gen(
              Random2.boolean() ? node.left : node.right,
              result,
              cache
            );
          },
          match: function(node, result, cache) {
            result = "";
            for (var i2 = 0; i2 < node.body.length; i2++) {
              result += this.gen(node.body[i2], result, cache);
            }
            return result;
          },
          "capture-group": function(node, result, cache) {
            result = this.gen(node.body, result, cache);
            cache[cache.guid++] = result;
            return result;
          },
          "non-capture-group": function(node, result, cache) {
            return this.gen(node.body, result, cache);
          },
          "positive-lookahead": function(node, result, cache) {
            return this.gen(node.body, result, cache);
          },
          "negative-lookahead": function(node, result, cache) {
            return "";
          },
          quantified: function(node, result, cache) {
            result = "";
            var count = this.quantifier(node.quantifier);
            for (var i2 = 0; i2 < count; i2++) {
              result += this.gen(node.body, result, cache);
            }
            return result;
          },
          quantifier: function(node, result, cache) {
            var min = Math.max(node.min, 0);
            var max = isFinite(node.max) ? node.max : min + Random2.integer(3, 7);
            return Random2.integer(min, max);
          },
          charset: function(node, result, cache) {
            if (node.invert)
              return this["invert-charset"](node, result, cache);
            var literal = Random2.pick(node.body);
            return this.gen(literal, result, cache);
          },
          "invert-charset": function(node, result, cache) {
            var pool = PRINTABLE;
            for (var i2 = 0, item; i2 < node.body.length; i2++) {
              item = node.body[i2];
              switch (item.type) {
                case "literal":
                  pool = pool.replace(item.body, "");
                  break;
                case "range":
                  var min = this.gen(item.start, result, cache).charCodeAt();
                  var max = this.gen(item.end, result, cache).charCodeAt();
                  for (var ii = min; ii <= max; ii++) {
                    pool = pool.replace(String.fromCharCode(ii), "");
                  }
                default:
                  var characters = CHARACTER_CLASSES[item.text];
                  if (characters) {
                    for (var iii = 0; iii <= characters.length; iii++) {
                      pool = pool.replace(characters[iii], "");
                    }
                  }
              }
            }
            return Random2.pick(pool.split(""));
          },
          range: function(node, result, cache) {
            var min = this.gen(node.start, result, cache).charCodeAt();
            var max = this.gen(node.end, result, cache).charCodeAt();
            return String.fromCharCode(
              Random2.integer(min, max)
            );
          },
          literal: function(node, result, cache) {
            return node.escaped ? node.body : node.text;
          },
          unicode: function(node, result, cache) {
            return String.fromCharCode(
              parseInt(node.code, 16)
            );
          },
          hex: function(node, result, cache) {
            return String.fromCharCode(
              parseInt(node.code, 16)
            );
          },
          octal: function(node, result, cache) {
            return String.fromCharCode(
              parseInt(node.code, 8)
            );
          },
          "back-reference": function(node, result, cache) {
            return cache[node.code] || "";
          },
          CONTROL_CHARACTER_MAP: function() {
            var CONTROL_CHARACTER = "@ A B C D E F G H I J K L M N O P Q R S T U V W X Y Z [ \\ ] ^ _".split(" ");
            var CONTROL_CHARACTER_UNICODE = "\0       \x07 \b 	 \n \v \f \r              \x1B    ".split(" ");
            var map = {};
            for (var i2 = 0; i2 < CONTROL_CHARACTER.length; i2++) {
              map[CONTROL_CHARACTER[i2]] = CONTROL_CHARACTER_UNICODE[i2];
            }
            return map;
          }(),
          "control-character": function(node, result, cache) {
            return this.CONTROL_CHARACTER_MAP[node.code];
          }
        });
        module2.exports = Handler2;
      },
      function(module2, exports2, __webpack_require__2) {
        module2.exports = __webpack_require__2(24);
      },
      function(module2, exports2, __webpack_require__2) {
        var Constant2 = __webpack_require__2(2);
        var Util2 = __webpack_require__2(3);
        var Parser2 = __webpack_require__2(4);
        function toJSONSchema(template, name, path) {
          path = path || [];
          var result = {
            name: typeof name === "string" ? name.replace(Constant2.RE_KEY, "$1") : name,
            template,
            type: Util2.type(template),
            rule: Parser2.parse(name)
          };
          result.path = path.slice(0);
          result.path.push(name === void 0 ? "ROOT" : result.name);
          switch (result.type) {
            case "array":
              result.items = [];
              Util2.each(template, function(value, index2) {
                result.items.push(
                  toJSONSchema(value, index2, result.path)
                );
              });
              break;
            case "object":
              result.properties = [];
              Util2.each(template, function(value, name2) {
                result.properties.push(
                  toJSONSchema(value, name2, result.path)
                );
              });
              break;
          }
          return result;
        }
        module2.exports = toJSONSchema;
      },
      function(module2, exports2, __webpack_require__2) {
        module2.exports = __webpack_require__2(26);
      },
      function(module2, exports2, __webpack_require__2) {
        var Constant2 = __webpack_require__2(2);
        var Util2 = __webpack_require__2(3);
        var toJSONSchema = __webpack_require__2(23);
        function valid(template, data) {
          var schema = toJSONSchema(template);
          var result = Diff.diff(schema, data);
          for (var i2 = 0; i2 < result.length; i2++) {
          }
          return result;
        }
        var Diff = {
          diff: function diff2(schema, data, name) {
            var result = [];
            if (this.name(schema, data, name, result) && this.type(schema, data, name, result)) {
              this.value(schema, data, name, result);
              this.properties(schema, data, name, result);
              this.items(schema, data, name, result);
            }
            return result;
          },
          name: function(schema, data, name, result) {
            var length = result.length;
            Assert.equal("name", schema.path, name + "", schema.name + "", result);
            return result.length === length;
          },
          type: function(schema, data, name, result) {
            var length = result.length;
            switch (schema.type) {
              case "string":
                if (schema.template.match(Constant2.RE_PLACEHOLDER))
                  return true;
                break;
              case "array":
                if (schema.rule.parameters) {
                  if (schema.rule.min !== void 0 && schema.rule.max === void 0) {
                    if (schema.rule.count === 1)
                      return true;
                  }
                  if (schema.rule.parameters[2])
                    return true;
                }
                break;
              case "function":
                return true;
            }
            Assert.equal("type", schema.path, Util2.type(data), schema.type, result);
            return result.length === length;
          },
          value: function(schema, data, name, result) {
            var length = result.length;
            var rule = schema.rule;
            var templateType = schema.type;
            if (templateType === "object" || templateType === "array" || templateType === "function")
              return true;
            if (!rule.parameters) {
              switch (templateType) {
                case "regexp":
                  Assert.match("value", schema.path, data, schema.template, result);
                  return result.length === length;
                case "string":
                  if (schema.template.match(Constant2.RE_PLACEHOLDER))
                    return result.length === length;
                  break;
              }
              Assert.equal("value", schema.path, data, schema.template, result);
              return result.length === length;
            }
            var actualRepeatCount;
            switch (templateType) {
              case "number":
                var parts2 = (data + "").split(".");
                parts2[0] = +parts2[0];
                if (rule.min !== void 0 && rule.max !== void 0) {
                  Assert.greaterThanOrEqualTo("value", schema.path, parts2[0], Math.min(rule.min, rule.max), result);
                  Assert.lessThanOrEqualTo("value", schema.path, parts2[0], Math.max(rule.min, rule.max), result);
                }
                if (rule.min !== void 0 && rule.max === void 0) {
                  Assert.equal("value", schema.path, parts2[0], rule.min, result, "[value] " + name);
                }
                if (rule.decimal) {
                  if (rule.dmin !== void 0 && rule.dmax !== void 0) {
                    Assert.greaterThanOrEqualTo("value", schema.path, parts2[1].length, rule.dmin, result);
                    Assert.lessThanOrEqualTo("value", schema.path, parts2[1].length, rule.dmax, result);
                  }
                  if (rule.dmin !== void 0 && rule.dmax === void 0) {
                    Assert.equal("value", schema.path, parts2[1].length, rule.dmin, result);
                  }
                }
                break;
              case "boolean":
                break;
              case "string":
                actualRepeatCount = data.match(new RegExp(schema.template, "g"));
                actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;
                if (rule.min !== void 0 && rule.max !== void 0) {
                  Assert.greaterThanOrEqualTo("repeat count", schema.path, actualRepeatCount, rule.min, result);
                  Assert.lessThanOrEqualTo("repeat count", schema.path, actualRepeatCount, rule.max, result);
                }
                if (rule.min !== void 0 && rule.max === void 0) {
                  Assert.equal("repeat count", schema.path, actualRepeatCount, rule.min, result);
                }
                break;
              case "regexp":
                actualRepeatCount = data.match(new RegExp(schema.template.source.replace(/^\^|\$$/g, ""), "g"));
                actualRepeatCount = actualRepeatCount ? actualRepeatCount.length : 0;
                if (rule.min !== void 0 && rule.max !== void 0) {
                  Assert.greaterThanOrEqualTo("repeat count", schema.path, actualRepeatCount, rule.min, result);
                  Assert.lessThanOrEqualTo("repeat count", schema.path, actualRepeatCount, rule.max, result);
                }
                if (rule.min !== void 0 && rule.max === void 0) {
                  Assert.equal("repeat count", schema.path, actualRepeatCount, rule.min, result);
                }
                break;
            }
            return result.length === length;
          },
          properties: function(schema, data, name, result) {
            var length = result.length;
            var rule = schema.rule;
            var keys = Util2.keys(data);
            if (!schema.properties)
              return;
            if (!schema.rule.parameters) {
              Assert.equal("properties length", schema.path, keys.length, schema.properties.length, result);
            } else {
              if (rule.min !== void 0 && rule.max !== void 0) {
                Assert.greaterThanOrEqualTo("properties length", schema.path, keys.length, Math.min(rule.min, rule.max), result);
                Assert.lessThanOrEqualTo("properties length", schema.path, keys.length, Math.max(rule.min, rule.max), result);
              }
              if (rule.min !== void 0 && rule.max === void 0) {
                if (rule.count !== 1)
                  Assert.equal("properties length", schema.path, keys.length, rule.min, result);
              }
            }
            if (result.length !== length)
              return false;
            for (var i2 = 0; i2 < keys.length; i2++) {
              result.push.apply(
                result,
                this.diff(
                  function() {
                    var property;
                    Util2.each(schema.properties, function(item) {
                      if (item.name === keys[i2])
                        property = item;
                    });
                    return property || schema.properties[i2];
                  }(),
                  data[keys[i2]],
                  keys[i2]
                )
              );
            }
            return result.length === length;
          },
          items: function(schema, data, name, result) {
            var length = result.length;
            if (!schema.items)
              return;
            var rule = schema.rule;
            if (!schema.rule.parameters) {
              Assert.equal("items length", schema.path, data.length, schema.items.length, result);
            } else {
              if (rule.min !== void 0 && rule.max !== void 0) {
                Assert.greaterThanOrEqualTo(
                  "items",
                  schema.path,
                  data.length,
                  Math.min(rule.min, rule.max) * schema.items.length,
                  result,
                  "[{utype}] array is too short: {path} must have at least {expected} elements but instance has {actual} elements"
                );
                Assert.lessThanOrEqualTo(
                  "items",
                  schema.path,
                  data.length,
                  Math.max(rule.min, rule.max) * schema.items.length,
                  result,
                  "[{utype}] array is too long: {path} must have at most {expected} elements but instance has {actual} elements"
                );
              }
              if (rule.min !== void 0 && rule.max === void 0) {
                if (rule.count === 1)
                  return result.length === length;
                else
                  Assert.equal("items length", schema.path, data.length, rule.min * schema.items.length, result);
              }
              if (rule.parameters[2])
                return result.length === length;
            }
            if (result.length !== length)
              return false;
            for (var i2 = 0; i2 < data.length; i2++) {
              result.push.apply(
                result,
                this.diff(
                  schema.items[i2 % schema.items.length],
                  data[i2],
                  i2 % schema.items.length
                )
              );
            }
            return result.length === length;
          }
        };
        var Assert = {
          message: function(item) {
            return (item.message || "[{utype}] Expect {path}'{ltype} {action} {expected}, but is {actual}").replace("{utype}", item.type.toUpperCase()).replace("{ltype}", item.type.toLowerCase()).replace("{path}", Util2.isArray(item.path) && item.path.join(".") || item.path).replace("{action}", item.action).replace("{expected}", item.expected).replace("{actual}", item.actual);
          },
          equal: function(type, path, actual, expected, result, message) {
            if (actual === expected)
              return true;
            switch (type) {
              case "type":
                if (expected === "regexp" && actual === "string")
                  return true;
                break;
            }
            var item = {
              path,
              type,
              actual,
              expected,
              action: "is equal to",
              message
            };
            item.message = Assert.message(item);
            result.push(item);
            return false;
          },
          match: function(type, path, actual, expected, result, message) {
            if (expected.test(actual))
              return true;
            var item = {
              path,
              type,
              actual,
              expected,
              action: "matches",
              message
            };
            item.message = Assert.message(item);
            result.push(item);
            return false;
          },
          notEqual: function(type, path, actual, expected, result, message) {
            if (actual !== expected)
              return true;
            var item = {
              path,
              type,
              actual,
              expected,
              action: "is not equal to",
              message
            };
            item.message = Assert.message(item);
            result.push(item);
            return false;
          },
          greaterThan: function(type, path, actual, expected, result, message) {
            if (actual > expected)
              return true;
            var item = {
              path,
              type,
              actual,
              expected,
              action: "is greater than",
              message
            };
            item.message = Assert.message(item);
            result.push(item);
            return false;
          },
          lessThan: function(type, path, actual, expected, result, message) {
            if (actual < expected)
              return true;
            var item = {
              path,
              type,
              actual,
              expected,
              action: "is less to",
              message
            };
            item.message = Assert.message(item);
            result.push(item);
            return false;
          },
          greaterThanOrEqualTo: function(type, path, actual, expected, result, message) {
            if (actual >= expected)
              return true;
            var item = {
              path,
              type,
              actual,
              expected,
              action: "is greater than or equal to",
              message
            };
            item.message = Assert.message(item);
            result.push(item);
            return false;
          },
          lessThanOrEqualTo: function(type, path, actual, expected, result, message) {
            if (actual <= expected)
              return true;
            var item = {
              path,
              type,
              actual,
              expected,
              action: "is less than or equal to",
              message
            };
            item.message = Assert.message(item);
            result.push(item);
            return false;
          }
        };
        valid.Diff = Diff;
        valid.Assert = Assert;
        module2.exports = valid;
      },
      function(module2, exports2, __webpack_require__2) {
        module2.exports = __webpack_require__2(28);
      },
      function(module2, exports2, __webpack_require__2) {
        var Util2 = __webpack_require__2(3);
        window._XMLHttpRequest = window.XMLHttpRequest;
        window._ActiveXObject = window.ActiveXObject;
        try {
          new window.Event("custom");
        } catch (exception) {
          window.Event = function(type, bubbles2, cancelable, detail) {
            var event = document.createEvent("CustomEvent");
            event.initCustomEvent(type, bubbles2, cancelable, detail);
            return event;
          };
        }
        var XHR_STATES = {
          UNSENT: 0,
          OPENED: 1,
          HEADERS_RECEIVED: 2,
          LOADING: 3,
          DONE: 4
        };
        var XHR_EVENTS = "readystatechange loadstart progress abort error load timeout loadend".split(" ");
        var XHR_REQUEST_PROPERTIES = "timeout withCredentials".split(" ");
        var XHR_RESPONSE_PROPERTIES = "readyState responseURL status statusText responseType response responseText responseXML".split(" ");
        var HTTP_STATUS_CODES = {
          100: "Continue",
          101: "Switching Protocols",
          200: "OK",
          201: "Created",
          202: "Accepted",
          203: "Non-Authoritative Information",
          204: "No Content",
          205: "Reset Content",
          206: "Partial Content",
          300: "Multiple Choice",
          301: "Moved Permanently",
          302: "Found",
          303: "See Other",
          304: "Not Modified",
          305: "Use Proxy",
          307: "Temporary Redirect",
          400: "Bad Request",
          401: "Unauthorized",
          402: "Payment Required",
          403: "Forbidden",
          404: "Not Found",
          405: "Method Not Allowed",
          406: "Not Acceptable",
          407: "Proxy Authentication Required",
          408: "Request Timeout",
          409: "Conflict",
          410: "Gone",
          411: "Length Required",
          412: "Precondition Failed",
          413: "Request Entity Too Large",
          414: "Request-URI Too Long",
          415: "Unsupported Media Type",
          416: "Requested Range Not Satisfiable",
          417: "Expectation Failed",
          422: "Unprocessable Entity",
          500: "Internal Server Error",
          501: "Not Implemented",
          502: "Bad Gateway",
          503: "Service Unavailable",
          504: "Gateway Timeout",
          505: "HTTP Version Not Supported"
        };
        function MockXMLHttpRequest() {
          this.custom = {
            events: {},
            requestHeaders: {},
            responseHeaders: {}
          };
        }
        MockXMLHttpRequest._settings = {
          timeout: "10-100"
        };
        MockXMLHttpRequest.setup = function(settings) {
          Util2.extend(MockXMLHttpRequest._settings, settings);
          return MockXMLHttpRequest._settings;
        };
        Util2.extend(MockXMLHttpRequest, XHR_STATES);
        Util2.extend(MockXMLHttpRequest.prototype, XHR_STATES);
        MockXMLHttpRequest.prototype.mock = true;
        MockXMLHttpRequest.prototype.match = false;
        Util2.extend(MockXMLHttpRequest.prototype, {
          open: function(method, url, async, username, password) {
            var that = this;
            Util2.extend(this.custom, {
              method,
              url,
              async: typeof async === "boolean" ? async : true,
              username,
              password,
              options: {
                url,
                type: method
              }
            });
            this.custom.timeout = function(timeout) {
              if (typeof timeout === "number")
                return timeout;
              if (typeof timeout === "string" && !~timeout.indexOf("-"))
                return parseInt(timeout, 10);
              if (typeof timeout === "string" && ~timeout.indexOf("-")) {
                var tmp = timeout.split("-");
                var min = parseInt(tmp[0], 10);
                var max = parseInt(tmp[1], 10);
                return Math.round(Math.random() * (max - min)) + min;
              }
            }(MockXMLHttpRequest._settings.timeout);
            var item = find(this.custom.options);
            function handle2(event) {
              for (var i3 = 0; i3 < XHR_RESPONSE_PROPERTIES.length; i3++) {
                try {
                  that[XHR_RESPONSE_PROPERTIES[i3]] = xhr[XHR_RESPONSE_PROPERTIES[i3]];
                } catch (e2) {
                }
              }
              that.dispatchEvent(new Event(event.type));
            }
            if (!item) {
              var xhr = createNativeXMLHttpRequest();
              this.custom.xhr = xhr;
              for (var i2 = 0; i2 < XHR_EVENTS.length; i2++) {
                xhr.addEventListener(XHR_EVENTS[i2], handle2);
              }
              if (username)
                xhr.open(method, url, async, username, password);
              else
                xhr.open(method, url, async);
              for (var j2 = 0; j2 < XHR_REQUEST_PROPERTIES.length; j2++) {
                try {
                  xhr[XHR_REQUEST_PROPERTIES[j2]] = that[XHR_REQUEST_PROPERTIES[j2]];
                } catch (e2) {
                }
              }
              return;
            }
            this.match = true;
            this.custom.template = item;
            this.readyState = MockXMLHttpRequest.OPENED;
            this.dispatchEvent(new Event("readystatechange"));
          },
          setRequestHeader: function(name, value) {
            if (!this.match) {
              this.custom.xhr.setRequestHeader(name, value);
              return;
            }
            var requestHeaders = this.custom.requestHeaders;
            if (requestHeaders[name])
              requestHeaders[name] += "," + value;
            else
              requestHeaders[name] = value;
          },
          timeout: 0,
          withCredentials: false,
          upload: {},
          send: function send(data) {
            var that = this;
            this.custom.options.body = data;
            if (!this.match) {
              this.custom.xhr.send(data);
              return;
            }
            this.setRequestHeader("X-Requested-With", "MockXMLHttpRequest");
            this.dispatchEvent(new Event("loadstart"));
            if (this.custom.async)
              setTimeout(done, this.custom.timeout);
            else
              done();
            function done() {
              that.readyState = MockXMLHttpRequest.HEADERS_RECEIVED;
              that.dispatchEvent(new Event("readystatechange"));
              that.readyState = MockXMLHttpRequest.LOADING;
              that.dispatchEvent(new Event("readystatechange"));
              that.status = 200;
              that.statusText = HTTP_STATUS_CODES[200];
              that.response = that.responseText = JSON.stringify(
                convert(that.custom.template, that.custom.options),
                null,
                4
              );
              that.readyState = MockXMLHttpRequest.DONE;
              that.dispatchEvent(new Event("readystatechange"));
              that.dispatchEvent(new Event("load"));
              that.dispatchEvent(new Event("loadend"));
            }
          },
          abort: function abort() {
            if (!this.match) {
              this.custom.xhr.abort();
              return;
            }
            this.readyState = MockXMLHttpRequest.UNSENT;
            this.dispatchEvent(new Event("abort", false, false, this));
            this.dispatchEvent(new Event("error", false, false, this));
          }
        });
        Util2.extend(MockXMLHttpRequest.prototype, {
          responseURL: "",
          status: MockXMLHttpRequest.UNSENT,
          statusText: "",
          getResponseHeader: function(name) {
            if (!this.match) {
              return this.custom.xhr.getResponseHeader(name);
            }
            return this.custom.responseHeaders[name.toLowerCase()];
          },
          getAllResponseHeaders: function() {
            if (!this.match) {
              return this.custom.xhr.getAllResponseHeaders();
            }
            var responseHeaders = this.custom.responseHeaders;
            var headers = "";
            for (var h2 in responseHeaders) {
              if (!responseHeaders.hasOwnProperty(h2))
                continue;
              headers += h2 + ": " + responseHeaders[h2] + "\r\n";
            }
            return headers;
          },
          overrideMimeType: function() {
          },
          responseType: "",
          response: null,
          responseText: "",
          responseXML: null
        });
        Util2.extend(MockXMLHttpRequest.prototype, {
          addEventListener: function addEventListener(type, handle2) {
            var events = this.custom.events;
            if (!events[type])
              events[type] = [];
            events[type].push(handle2);
          },
          removeEventListener: function removeEventListener(type, handle2) {
            var handles = this.custom.events[type] || [];
            for (var i2 = 0; i2 < handles.length; i2++) {
              if (handles[i2] === handle2) {
                handles.splice(i2--, 1);
              }
            }
          },
          dispatchEvent: function dispatchEvent(event) {
            var handles = this.custom.events[event.type] || [];
            for (var i2 = 0; i2 < handles.length; i2++) {
              handles[i2].call(this, event);
            }
            var ontype = "on" + event.type;
            if (this[ontype])
              this[ontype](event);
          }
        });
        function createNativeXMLHttpRequest() {
          var isLocal = function() {
            var rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/;
            var rurl = /^([\w.+-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/;
            var ajaxLocation = location.href;
            var ajaxLocParts = rurl.exec(ajaxLocation.toLowerCase()) || [];
            return rlocalProtocol.test(ajaxLocParts[1]);
          }();
          return window.ActiveXObject ? !isLocal && createStandardXHR() || createActiveXHR() : createStandardXHR();
          function createStandardXHR() {
            try {
              return new window._XMLHttpRequest();
            } catch (e2) {
            }
          }
          function createActiveXHR() {
            try {
              return new window._ActiveXObject("Microsoft.XMLHTTP");
            } catch (e2) {
            }
          }
        }
        function find(options2) {
          for (var sUrlType in MockXMLHttpRequest.Mock._mocked) {
            var item = MockXMLHttpRequest.Mock._mocked[sUrlType];
            if ((!item.rurl || match(item.rurl, options2.url)) && (!item.rtype || match(item.rtype, options2.type.toLowerCase()))) {
              return item;
            }
          }
          function match(expected, actual) {
            if (Util2.type(expected) === "string") {
              return expected === actual;
            }
            if (Util2.type(expected) === "regexp") {
              return expected.test(actual);
            }
          }
        }
        function convert(item, options2) {
          return Util2.isFunction(item.template) ? item.template(options2) : MockXMLHttpRequest.Mock.mock(item.template);
        }
        module2.exports = MockXMLHttpRequest;
      }
    ]);
  });
})(mock);
var Mock = mock.exports;
const easycom = {
  autoscan: true,
  custom: {
    "^uni-(.*)": "@dcloudio/uni-ui/lib/uni-$1/uni-$1.vue"
  }
};
const pages = [
  {
    path: "pages/home/home",
    style: {
      navigationBarTitleText: "Wrecking Ball",
      navigationBarBackgroundColor: "#6467F0",
      navigationBarTextStyle: "white"
    }
  },
  {
    path: "pages/index/index",
    style: {
      navigationBarTitleText: "uni-app"
    }
  },
  {
    path: "pages/createAction/createAction",
    style: {
      navigationBarTitleText: "Wrecking Ball",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black"
    }
  },
  {
    path: "pages/user/user",
    style: {
      navigationBarTitleText: "Wrecking Ball",
      navigationBarBackgroundColor: "#fff",
      navigationBarTextStyle: "black"
    }
  }
];
const subPackages = [
  {
    root: "subpages",
    pages: [
      {
        path: "detailed/detailed",
        style: {
          navigationBarBackgroundColor: "#fff",
          navigationBarTitleText: "\u6BD4\u8D5B\u8BE6\u60C5"
        }
      }
    ]
  }
];
const globalStyle = {
  navigationBarTextStyle: "black",
  navigationBarTitleText: "uni-app",
  navigationBarBackgroundColor: "#F8F8F8",
  backgroundColor: "#F8F8F8"
};
const tabBar = {
  color: "#6467F0",
  backgroundColor: "#fff",
  list: [
    {
      pagePath: "pages/home/home",
      iconPath: "/static/home.png",
      text: "\u9996\u9875"
    },
    {
      pagePath: "pages/createAction/createAction",
      iconPath: "/static/createAction.png",
      text: "\u521B\u5EFA\u6D3B\u52A8"
    },
    {
      pagePath: "pages/user/user",
      iconPath: "/static/user.png",
      text: "\u4E2A\u4EBA\u4E2D\u5FC3"
    }
  ]
};
var t = {
  easycom,
  pages,
  subPackages,
  globalStyle,
  tabBar
};
function n(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function s(e2, t2, n2) {
  return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
    return function() {
      throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }(null == t3 && n2.path);
  } }, n2.exports), n2.exports;
}
var o = s(function(e2, t2) {
  var n2;
  e2.exports = (n2 = n2 || function(e3, t3) {
    var n3 = Object.create || function() {
      function e4() {
      }
      return function(t4) {
        var n4;
        return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
      };
    }(), s2 = {}, o2 = s2.lib = {}, r2 = o2.Base = { extend: function(e4) {
      var t4 = n3(this);
      return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
        t4.$super.init.apply(this, arguments);
      }), t4.init.prototype = t4, t4.$super = this, t4;
    }, create: function() {
      var e4 = this.extend();
      return e4.init.apply(e4, arguments), e4;
    }, init: function() {
    }, mixIn: function(e4) {
      for (var t4 in e4)
        e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
      e4.hasOwnProperty("toString") && (this.toString = e4.toString);
    }, clone: function() {
      return this.init.prototype.extend(this);
    } }, i2 = o2.WordArray = r2.extend({ init: function(e4, n4) {
      e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
    }, toString: function(e4) {
      return (e4 || c2).stringify(this);
    }, concat: function(e4) {
      var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, o3 = e4.sigBytes;
      if (this.clamp(), s3 % 4)
        for (var r3 = 0; r3 < o3; r3++) {
          var i3 = n4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
          t4[s3 + r3 >>> 2] |= i3 << 24 - (s3 + r3) % 4 * 8;
        }
      else
        for (r3 = 0; r3 < o3; r3 += 4)
          t4[s3 + r3 >>> 2] = n4[r3 >>> 2];
      return this.sigBytes += o3, this;
    }, clamp: function() {
      var t4 = this.words, n4 = this.sigBytes;
      t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
    }, clone: function() {
      var e4 = r2.clone.call(this);
      return e4.words = this.words.slice(0), e4;
    }, random: function(t4) {
      for (var n4, s3 = [], o3 = function(t5) {
        t5 = t5;
        var n5 = 987654321, s4 = 4294967295;
        return function() {
          var o4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
          return o4 /= 4294967296, (o4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
        };
      }, r3 = 0; r3 < t4; r3 += 4) {
        var a3 = o3(4294967296 * (n4 || e3.random()));
        n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
      }
      return new i2.init(s3, t4);
    } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], o3 = 0; o3 < n4; o3++) {
        var r3 = t4[o3 >>> 2] >>> 24 - o3 % 4 * 8 & 255;
        s3.push((r3 >>> 4).toString(16)), s3.push((15 & r3).toString(16));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
        n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
      return new i2.init(n4, t4 / 2);
    } }, u2 = a2.Latin1 = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], o3 = 0; o3 < n4; o3++) {
        var r3 = t4[o3 >>> 2] >>> 24 - o3 % 4 * 8 & 255;
        s3.push(String.fromCharCode(r3));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
        n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
      return new i2.init(n4, t4);
    } }, l2 = a2.Utf8 = { stringify: function(e4) {
      try {
        return decodeURIComponent(escape(u2.stringify(e4)));
      } catch (e5) {
        throw new Error("Malformed UTF-8 data");
      }
    }, parse: function(e4) {
      return u2.parse(unescape(encodeURIComponent(e4)));
    } }, h2 = o2.BufferedBlockAlgorithm = r2.extend({ reset: function() {
      this._data = new i2.init(), this._nDataBytes = 0;
    }, _append: function(e4) {
      "string" == typeof e4 && (e4 = l2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
    }, _process: function(t4) {
      var n4 = this._data, s3 = n4.words, o3 = n4.sigBytes, r3 = this.blockSize, a3 = o3 / (4 * r3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * r3, u3 = e3.min(4 * c3, o3);
      if (c3) {
        for (var l3 = 0; l3 < c3; l3 += r3)
          this._doProcessBlock(s3, l3);
        var h3 = s3.splice(0, c3);
        n4.sigBytes -= u3;
      }
      return new i2.init(h3, u3);
    }, clone: function() {
      var e4 = r2.clone.call(this);
      return e4._data = this._data.clone(), e4;
    }, _minBufferSize: 0 });
    o2.Hasher = h2.extend({ cfg: r2.extend(), init: function(e4) {
      this.cfg = this.cfg.extend(e4), this.reset();
    }, reset: function() {
      h2.reset.call(this), this._doReset();
    }, update: function(e4) {
      return this._append(e4), this._process(), this;
    }, finalize: function(e4) {
      return e4 && this._append(e4), this._doFinalize();
    }, blockSize: 16, _createHelper: function(e4) {
      return function(t4, n4) {
        return new e4.init(n4).finalize(t4);
      };
    }, _createHmacHelper: function(e4) {
      return function(t4, n4) {
        return new d2.HMAC.init(e4, n4).finalize(t4);
      };
    } });
    var d2 = s2.algo = {};
    return s2;
  }(Math), n2);
}), r = (s(function(e2, t2) {
  var n2;
  e2.exports = (n2 = o, function(e3) {
    var t3 = n2, s2 = t3.lib, o2 = s2.WordArray, r2 = s2.Hasher, i2 = t3.algo, a2 = [];
    !function() {
      for (var t4 = 0; t4 < 64; t4++)
        a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
    }();
    var c2 = i2.MD5 = r2.extend({ _doReset: function() {
      this._hash = new o2.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = 0; n3 < 16; n3++) {
        var s3 = t4 + n3, o3 = e4[s3];
        e4[s3] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8);
      }
      var r3 = this._hash.words, i3 = e4[t4 + 0], c3 = e4[t4 + 1], f2 = e4[t4 + 2], g2 = e4[t4 + 3], p2 = e4[t4 + 4], m2 = e4[t4 + 5], y = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], k2 = e4[t4 + 9], T2 = e4[t4 + 10], S2 = e4[t4 + 11], v2 = e4[t4 + 12], A2 = e4[t4 + 13], P2 = e4[t4 + 14], I2 = e4[t4 + 15], b2 = r3[0], O2 = r3[1], C2 = r3[2], E2 = r3[3];
      b2 = u2(b2, O2, C2, E2, i3, 7, a2[0]), E2 = u2(E2, b2, O2, C2, c3, 12, a2[1]), C2 = u2(C2, E2, b2, O2, f2, 17, a2[2]), O2 = u2(O2, C2, E2, b2, g2, 22, a2[3]), b2 = u2(b2, O2, C2, E2, p2, 7, a2[4]), E2 = u2(E2, b2, O2, C2, m2, 12, a2[5]), C2 = u2(C2, E2, b2, O2, y, 17, a2[6]), O2 = u2(O2, C2, E2, b2, _2, 22, a2[7]), b2 = u2(b2, O2, C2, E2, w2, 7, a2[8]), E2 = u2(E2, b2, O2, C2, k2, 12, a2[9]), C2 = u2(C2, E2, b2, O2, T2, 17, a2[10]), O2 = u2(O2, C2, E2, b2, S2, 22, a2[11]), b2 = u2(b2, O2, C2, E2, v2, 7, a2[12]), E2 = u2(E2, b2, O2, C2, A2, 12, a2[13]), C2 = u2(C2, E2, b2, O2, P2, 17, a2[14]), b2 = l2(b2, O2 = u2(O2, C2, E2, b2, I2, 22, a2[15]), C2, E2, c3, 5, a2[16]), E2 = l2(E2, b2, O2, C2, y, 9, a2[17]), C2 = l2(C2, E2, b2, O2, S2, 14, a2[18]), O2 = l2(O2, C2, E2, b2, i3, 20, a2[19]), b2 = l2(b2, O2, C2, E2, m2, 5, a2[20]), E2 = l2(E2, b2, O2, C2, T2, 9, a2[21]), C2 = l2(C2, E2, b2, O2, I2, 14, a2[22]), O2 = l2(O2, C2, E2, b2, p2, 20, a2[23]), b2 = l2(b2, O2, C2, E2, k2, 5, a2[24]), E2 = l2(E2, b2, O2, C2, P2, 9, a2[25]), C2 = l2(C2, E2, b2, O2, g2, 14, a2[26]), O2 = l2(O2, C2, E2, b2, w2, 20, a2[27]), b2 = l2(b2, O2, C2, E2, A2, 5, a2[28]), E2 = l2(E2, b2, O2, C2, f2, 9, a2[29]), C2 = l2(C2, E2, b2, O2, _2, 14, a2[30]), b2 = h2(b2, O2 = l2(O2, C2, E2, b2, v2, 20, a2[31]), C2, E2, m2, 4, a2[32]), E2 = h2(E2, b2, O2, C2, w2, 11, a2[33]), C2 = h2(C2, E2, b2, O2, S2, 16, a2[34]), O2 = h2(O2, C2, E2, b2, P2, 23, a2[35]), b2 = h2(b2, O2, C2, E2, c3, 4, a2[36]), E2 = h2(E2, b2, O2, C2, p2, 11, a2[37]), C2 = h2(C2, E2, b2, O2, _2, 16, a2[38]), O2 = h2(O2, C2, E2, b2, T2, 23, a2[39]), b2 = h2(b2, O2, C2, E2, A2, 4, a2[40]), E2 = h2(E2, b2, O2, C2, i3, 11, a2[41]), C2 = h2(C2, E2, b2, O2, g2, 16, a2[42]), O2 = h2(O2, C2, E2, b2, y, 23, a2[43]), b2 = h2(b2, O2, C2, E2, k2, 4, a2[44]), E2 = h2(E2, b2, O2, C2, v2, 11, a2[45]), C2 = h2(C2, E2, b2, O2, I2, 16, a2[46]), b2 = d2(b2, O2 = h2(O2, C2, E2, b2, f2, 23, a2[47]), C2, E2, i3, 6, a2[48]), E2 = d2(E2, b2, O2, C2, _2, 10, a2[49]), C2 = d2(C2, E2, b2, O2, P2, 15, a2[50]), O2 = d2(O2, C2, E2, b2, m2, 21, a2[51]), b2 = d2(b2, O2, C2, E2, v2, 6, a2[52]), E2 = d2(E2, b2, O2, C2, g2, 10, a2[53]), C2 = d2(C2, E2, b2, O2, T2, 15, a2[54]), O2 = d2(O2, C2, E2, b2, c3, 21, a2[55]), b2 = d2(b2, O2, C2, E2, w2, 6, a2[56]), E2 = d2(E2, b2, O2, C2, I2, 10, a2[57]), C2 = d2(C2, E2, b2, O2, y, 15, a2[58]), O2 = d2(O2, C2, E2, b2, A2, 21, a2[59]), b2 = d2(b2, O2, C2, E2, p2, 6, a2[60]), E2 = d2(E2, b2, O2, C2, S2, 10, a2[61]), C2 = d2(C2, E2, b2, O2, f2, 15, a2[62]), O2 = d2(O2, C2, E2, b2, k2, 21, a2[63]), r3[0] = r3[0] + b2 | 0, r3[1] = r3[1] + O2 | 0, r3[2] = r3[2] + C2 | 0, r3[3] = r3[3] + E2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, o3 = 8 * t4.sigBytes;
      n3[o3 >>> 5] |= 128 << 24 - o3 % 32;
      var r3 = e3.floor(s3 / 4294967296), i3 = s3;
      n3[15 + (o3 + 64 >>> 9 << 4)] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8), n3[14 + (o3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
      for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
        var l3 = c3[u3];
        c3[u3] = 16711935 & (l3 << 8 | l3 >>> 24) | 4278255360 & (l3 << 24 | l3 >>> 8);
      }
      return a3;
    }, clone: function() {
      var e4 = r2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    function u2(e4, t4, n3, s3, o3, r3, i3) {
      var a3 = e4 + (t4 & n3 | ~t4 & s3) + o3 + i3;
      return (a3 << r3 | a3 >>> 32 - r3) + t4;
    }
    function l2(e4, t4, n3, s3, o3, r3, i3) {
      var a3 = e4 + (t4 & s3 | n3 & ~s3) + o3 + i3;
      return (a3 << r3 | a3 >>> 32 - r3) + t4;
    }
    function h2(e4, t4, n3, s3, o3, r3, i3) {
      var a3 = e4 + (t4 ^ n3 ^ s3) + o3 + i3;
      return (a3 << r3 | a3 >>> 32 - r3) + t4;
    }
    function d2(e4, t4, n3, s3, o3, r3, i3) {
      var a3 = e4 + (n3 ^ (t4 | ~s3)) + o3 + i3;
      return (a3 << r3 | a3 >>> 32 - r3) + t4;
    }
    t3.MD5 = r2._createHelper(c2), t3.HmacMD5 = r2._createHmacHelper(c2);
  }(Math), n2.MD5);
}), s(function(e2, t2) {
  var n2, s2, r2;
  e2.exports = (s2 = (n2 = o).lib.Base, r2 = n2.enc.Utf8, void (n2.algo.HMAC = s2.extend({ init: function(e3, t3) {
    e3 = this._hasher = new e3.init(), "string" == typeof t3 && (t3 = r2.parse(t3));
    var n3 = e3.blockSize, s3 = 4 * n3;
    t3.sigBytes > s3 && (t3 = e3.finalize(t3)), t3.clamp();
    for (var o2 = this._oKey = t3.clone(), i2 = this._iKey = t3.clone(), a2 = o2.words, c2 = i2.words, u2 = 0; u2 < n3; u2++)
      a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
    o2.sigBytes = i2.sigBytes = s3, this.reset();
  }, reset: function() {
    var e3 = this._hasher;
    e3.reset(), e3.update(this._iKey);
  }, update: function(e3) {
    return this._hasher.update(e3), this;
  }, finalize: function(e3) {
    var t3 = this._hasher, n3 = t3.finalize(e3);
    return t3.reset(), t3.finalize(this._oKey.clone().concat(n3));
  } })));
}), s(function(e2, t2) {
  e2.exports = o.HmacMD5;
}));
const i = "FUNCTION", a = "OBJECT", c = "CLIENT_DB";
function u(e2) {
  return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
}
function l(e2) {
  return "object" === u(e2);
}
function h(e2) {
  return e2 && "string" == typeof e2 ? JSON.parse(e2) : e2;
}
const d = true, f = "mp-weixin";
let g;
switch (f) {
  case "h5":
    g = "web";
    break;
  case "app-plus":
    g = "app";
    break;
  default:
    g = f;
}
const p = h({}.UNICLOUD_DEBUG), m = h("[]");
let _ = "";
try {
  _ = "";
} catch (e2) {
}
let w = {};
function k(e2, t2 = {}) {
  var n2, s2;
  return n2 = w, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (w[e2] = t2), w[e2];
}
"app" === g && (w = index._globalUniCloudObj ? index._globalUniCloudObj : index._globalUniCloudObj = {});
const T = ["invoke", "success", "fail", "complete"], S = k("_globalUniCloudInterceptor");
function v(e2, t2) {
  S[e2] || (S[e2] = {}), l(t2) && Object.keys(t2).forEach((n2) => {
    T.indexOf(n2) > -1 && function(e3, t3, n3) {
      let s2 = S[e3][t3];
      s2 || (s2 = S[e3][t3] = []), -1 === s2.indexOf(n3) && "function" == typeof n3 && s2.push(n3);
    }(e2, n2, t2[n2]);
  });
}
function A(e2, t2) {
  S[e2] || (S[e2] = {}), l(t2) ? Object.keys(t2).forEach((n2) => {
    T.indexOf(n2) > -1 && function(e3, t3, n3) {
      const s2 = S[e3][t3];
      if (!s2)
        return;
      const o2 = s2.indexOf(n3);
      o2 > -1 && s2.splice(o2, 1);
    }(e2, n2, t2[n2]);
  }) : delete S[e2];
}
function P(e2, t2) {
  return e2 && 0 !== e2.length ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
}
function I(e2, t2) {
  return S[e2] && S[e2][t2] || [];
}
const b = k("_globalUniCloudListener"), O = "response", C = "needLogin", E = "refreshToken", R = "clientdb", U = "cloudfunction", x = "cloudobject";
function L(e2) {
  return b[e2] || (b[e2] = []), b[e2];
}
function D(e2, t2) {
  const n2 = L(e2);
  n2.includes(t2) || n2.push(t2);
}
function N(e2, t2) {
  const n2 = L(e2), s2 = n2.indexOf(t2);
  -1 !== s2 && n2.splice(s2, 1);
}
function q(e2, t2) {
  const n2 = L(e2);
  for (let e3 = 0; e3 < n2.length; e3++) {
    (0, n2[e3])(t2);
  }
}
function F(e2, t2) {
  return t2 ? function(n2) {
    let s2 = false;
    if ("callFunction" === t2) {
      const e3 = n2 && n2.type || i;
      s2 = e3 !== i;
    }
    const o2 = "callFunction" === t2 && !s2;
    let r2;
    r2 = this.isReady ? Promise.resolve() : this.initUniCloud, n2 = n2 || {};
    const a2 = r2.then(() => s2 ? Promise.resolve() : P(I(t2, "invoke"), n2)).then(() => e2.call(this, n2)).then((e3) => s2 ? Promise.resolve(e3) : P(I(t2, "success"), e3).then(() => P(I(t2, "complete"), e3)).then(() => (o2 && q(O, { type: U, content: e3 }), Promise.resolve(e3))), (e3) => s2 ? Promise.reject(e3) : P(I(t2, "fail"), e3).then(() => P(I(t2, "complete"), e3)).then(() => (q(O, { type: U, content: e3 }), Promise.reject(e3))));
    if (!(n2.success || n2.fail || n2.complete))
      return a2;
    a2.then((e3) => {
      n2.success && n2.success(e3), n2.complete && n2.complete(e3), o2 && q(O, { type: U, content: e3 });
    }, (e3) => {
      n2.fail && n2.fail(e3), n2.complete && n2.complete(e3), o2 && q(O, { type: U, content: e3 });
    });
  } : function(t3) {
    if (!((t3 = t3 || {}).success || t3.fail || t3.complete))
      return e2.call(this, t3);
    e2.call(this, t3).then((e3) => {
      t3.success && t3.success(e3), t3.complete && t3.complete(e3);
    }, (e3) => {
      t3.fail && t3.fail(e3), t3.complete && t3.complete(e3);
    });
  };
}
class M extends Error {
  constructor(e2) {
    super(e2.message), this.errMsg = e2.message || "", this.errCode = this.code = e2.code || "SYSTEM_ERROR", this.requestId = e2.requestId;
  }
}
function $() {
  let e2, t2;
  try {
    if (index.getLaunchOptionsSync) {
      if (index.getLaunchOptionsSync.toString().indexOf("not yet implemented") > -1)
        return;
      const { scene: n2, channel: s2 } = index.getLaunchOptionsSync();
      e2 = s2, t2 = n2;
    }
  } catch (e3) {
  }
  return { channel: e2, scene: t2 };
}
let j;
function K() {
  const e2 = index.getLocale && index.getLocale() || "en";
  if (j)
    return { ...j, locale: e2, LOCALE: e2 };
  const t2 = index.getSystemInfoSync(), { deviceId: n2, osName: s2, uniPlatform: o2, appId: r2 } = t2, i2 = ["pixelRatio", "brand", "model", "system", "language", "version", "platform", "host", "SDKVersion", "swanNativeVersion", "app", "AppPlatform", "fontSizeSetting"];
  for (let e3 = 0; e3 < i2.length; e3++) {
    delete t2[i2[e3]];
  }
  return j = { PLATFORM: o2, OS: s2, APPID: r2, DEVICEID: n2, ...$(), ...t2 }, { ...j, locale: e2, LOCALE: e2 };
}
var B = { sign: function(e2, t2) {
  let n2 = "";
  return Object.keys(e2).sort().forEach(function(t3) {
    e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
  }), n2 = n2.slice(1), r(n2, t2).toString();
}, wrappedRequest: function(e2, t2) {
  return new Promise((n2, s2) => {
    t2(Object.assign(e2, { complete(e3) {
      e3 || (e3 = {}), "web" === g && e3.errMsg && 0 === e3.errMsg.indexOf("request:fail") && console.warn("\u53D1\u5E03H5\uFF0C\u9700\u8981\u5728uniCloud\u540E\u53F0\u64CD\u4F5C\uFF0C\u7ED1\u5B9A\u5B89\u5168\u57DF\u540D\uFF0C\u5426\u5219\u4F1A\u56E0\u4E3A\u8DE8\u57DF\u95EE\u9898\u800C\u65E0\u6CD5\u8BBF\u95EE\u3002\u6559\u7A0B\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.io/uniCloud/quickstart?id=useinh5");
      const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
      if (!e3.statusCode || e3.statusCode >= 400)
        return s2(new M({ code: "SYS_ERR", message: e3.errMsg || "request:fail", requestId: t3 }));
      const o2 = e3.data;
      if (o2.error)
        return s2(new M({ code: o2.error.code, message: o2.error.message, requestId: t3 }));
      o2.result = o2.data, o2.requestId = t3, delete o2.data, n2(o2);
    } }));
  });
} };
var H = { request: (e2) => index.request(e2), uploadFile: (e2) => index.uploadFile(e2), setStorageSync: (e2, t2) => index.setStorageSync(e2, t2), getStorageSync: (e2) => index.getStorageSync(e2), removeStorageSync: (e2) => index.removeStorageSync(e2), clearStorageSync: () => index.clearStorageSync() }, W = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };
const { t: z } = initVueI18n({ "zh-Hans": { "uniCloud.init.paramRequired": "\u7F3A\u5C11\u53C2\u6570\uFF1A{param}", "uniCloud.uploadFile.fileError": "filePath\u5E94\u4E3AFile\u5BF9\u8C61" }, "zh-Hant": { "uniCloud.init.paramRequired": "\u7F3A\u5C11\u53C2\u6570\uFF1A{param}", "uniCloud.uploadFile.fileError": "filePath\u5E94\u4E3AFile\u5BF9\u8C61" }, en: W, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: W }, "zh-Hans");
var V = class {
  constructor(e2) {
    ["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(z("uniCloud.init.paramRequired", { param: t2 }));
    }), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = H, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;
  }
  get hasAccessToken() {
    return !!this.accessToken;
  }
  setAccessToken(e2) {
    this.accessToken = e2;
  }
  requestWrapped(e2) {
    return B.wrappedRequest(e2, this.adapter.request);
  }
  requestAuth(e2) {
    return this.requestWrapped(e2);
  }
  request(e2, t2) {
    return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
      !t3 || "GATEWAY_INVALID_TOKEN" !== t3.code && "InvalidParameter.InvalidToken" !== t3.code ? n2(t3) : e3();
    }).then(() => this.getAccessToken()).then(() => {
      const t4 = this.rebuildRequest(e2);
      return this.request(t4, true);
    })) : this.getAccessToken().then(() => {
      const t3 = this.rebuildRequest(e2);
      return this.request(t3, true);
    }));
  }
  rebuildRequest(e2) {
    const t2 = Object.assign({}, e2);
    return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = B.sign(t2.data, this.config.clientSecret), t2;
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    return "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = B.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
  }
  getAccessToken() {
    if ("pending" === this._getAccessTokenPromiseStatus)
      return this._getAccessTokenPromise;
    this._getAccessTokenPromiseStatus = "pending";
    return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e2) => new Promise((t2, n2) => {
      e2.result && e2.result.accessToken ? (this.setAccessToken(e2.result.accessToken), this._getAccessTokenPromiseStatus = "fulfilled", t2(this.accessToken)) : (this._getAccessTokenPromiseStatus = "rejected", n2(new M({ code: "AUTH_FAILED", message: "\u83B7\u53D6accessToken\u5931\u8D25" })));
    }), (e2) => (this._getAccessTokenPromiseStatus = "rejected", Promise.reject(e2))), this._getAccessTokenPromise;
  }
  authorize() {
    this.getAccessToken();
  }
  callFunction(e2) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
    return this.request(this.setupRequest(t2));
  }
  getOSSUploadOptionsFromPath(e2) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: o2, onUploadProgress: r2 }) {
    return new Promise((i2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: o2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
        e3 && e3.statusCode < 400 ? i2(e3) : a2(new M({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      }, fail(e3) {
        a2(new M({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      } });
      "function" == typeof r2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
        r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  reportOSSUpload(e2) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2, config: o2 }) {
    if ("string" !== u(t2))
      throw new M({ code: "INVALID_PARAM", message: "cloudPath\u5FC5\u987B\u4E3A\u5B57\u7B26\u4E32\u7C7B\u578B" });
    if (!(t2 = t2.trim()))
      throw new M({ code: "CLOUDPATH_REQUIRED", message: "cloudPath\u4E0D\u53EF\u4E3A\u7A7A" });
    if (/:\/\//.test(t2))
      throw new M({ code: "INVALID_PARAM", message: "cloudPath\u4E0D\u5408\u6CD5" });
    const r2 = o2 && o2.envType || this.config.envType;
    let i2, a2;
    return this.getOSSUploadOptionsFromPath({ env: r2, filename: t2 }).then((t3) => {
      const o3 = t3.result;
      i2 = o3.id, a2 = "https://" + o3.cdnDomain + "/" + o3.ossPath;
      const r3 = { url: "https://" + o3.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: o3.accessKeyId, Signature: o3.signature, host: o3.host, id: i2, key: o3.ossPath, policy: o3.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e2, fileType: n2 };
      return this.uploadFileToOSS(Object.assign({}, r3, { onUploadProgress: s2 }));
    }).then(() => this.reportOSSUpload({ id: i2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e2, fileID: a2 }) : s3(new M({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
    }));
  }
  deleteFile({ fileList: e2 }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e2[0] }) };
    return this.request(this.setupRequest(t2));
  }
  getTempFileURL({ fileList: e2 } = {}) {
    return new Promise((t2, n2) => {
      Array.isArray(e2) && 0 !== e2.length || n2(new M({ code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
    });
  }
};
var J = { init(e2) {
  const t2 = new V(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
const Y = "undefined" != typeof location && "http:" === location.protocol ? "http:" : "https:";
var X;
!function(e2) {
  e2.local = "local", e2.none = "none", e2.session = "session";
}(X || (X = {}));
var G = function() {
};
const Q = () => {
  let e2;
  if (!Promise) {
    e2 = () => {
    }, e2.promise = {};
    const t3 = () => {
      throw new M({ message: 'Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.' });
    };
    return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
  }
  const t2 = new Promise((t3, n2) => {
    e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
  });
  return e2.promise = t2, e2;
};
function Z(e2) {
  return void 0 === e2;
}
function ee(e2) {
  return "[object Null]" === Object.prototype.toString.call(e2);
}
var te;
function ne(e2) {
  const t2 = (n2 = e2, "[object Array]" === Object.prototype.toString.call(n2) ? e2 : [e2]);
  var n2;
  for (const e3 of t2) {
    const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
    if (t3())
      return { adapter: n3(), runtime: s2 };
  }
}
!function(e2) {
  e2.WEB = "web", e2.WX_MP = "wx_mp";
}(te || (te = {}));
const se = { adapter: null, runtime: void 0 }, oe = ["anonymousUuidKey"];
class re extends G {
  constructor() {
    super(), se.adapter.root.tcbObject || (se.adapter.root.tcbObject = {});
  }
  setItem(e2, t2) {
    se.adapter.root.tcbObject[e2] = t2;
  }
  getItem(e2) {
    return se.adapter.root.tcbObject[e2];
  }
  removeItem(e2) {
    delete se.adapter.root.tcbObject[e2];
  }
  clear() {
    delete se.adapter.root.tcbObject;
  }
}
function ie(e2, t2) {
  switch (e2) {
    case "local":
      return t2.localStorage || new re();
    case "none":
      return new re();
    default:
      return t2.sessionStorage || new re();
  }
}
class ae {
  constructor(e2) {
    if (!this._storage) {
      this._persistence = se.adapter.primaryStorage || e2.persistence, this._storage = ie(this._persistence, se.adapter);
      const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, o2 = `anonymous_uuid_${e2.env}`, r2 = `login_type_${e2.env}`, i2 = `user_info_${e2.env}`;
      this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: o2, loginTypeKey: r2, userInfoKey: i2 };
    }
  }
  updatePersistence(e2) {
    if (e2 === this._persistence)
      return;
    const t2 = "local" === this._persistence;
    this._persistence = e2;
    const n2 = ie(e2, se.adapter);
    for (const e3 in this.keys) {
      const s2 = this.keys[e3];
      if (t2 && oe.includes(e3))
        continue;
      const o2 = this._storage.getItem(s2);
      Z(o2) || ee(o2) || (n2.setItem(s2, o2), this._storage.removeItem(s2));
    }
    this._storage = n2;
  }
  setStore(e2, t2, n2) {
    if (!this._storage)
      return;
    const s2 = { version: n2 || "localCachev1", content: t2 }, o2 = JSON.stringify(s2);
    try {
      this._storage.setItem(e2, o2);
    } catch (e3) {
      throw e3;
    }
  }
  getStore(e2, t2) {
    try {
      if (!this._storage)
        return;
    } catch (e3) {
      return "";
    }
    t2 = t2 || "localCachev1";
    const n2 = this._storage.getItem(e2);
    if (!n2)
      return "";
    if (n2.indexOf(t2) >= 0) {
      return JSON.parse(n2).content;
    }
    return "";
  }
  removeStore(e2) {
    this._storage.removeItem(e2);
  }
}
const ce = {}, ue = {};
function le(e2) {
  return ce[e2];
}
class he {
  constructor(e2, t2) {
    this.data = t2 || null, this.name = e2;
  }
}
class de extends he {
  constructor(e2, t2) {
    super("error", { error: e2, data: t2 }), this.error = e2;
  }
}
const fe = new class {
  constructor() {
    this._listeners = {};
  }
  on(e2, t2) {
    return function(e3, t3, n2) {
      n2[e3] = n2[e3] || [], n2[e3].push(t3);
    }(e2, t2, this._listeners), this;
  }
  off(e2, t2) {
    return function(e3, t3, n2) {
      if (n2 && n2[e3]) {
        const s2 = n2[e3].indexOf(t3);
        -1 !== s2 && n2[e3].splice(s2, 1);
      }
    }(e2, t2, this._listeners), this;
  }
  fire(e2, t2) {
    if (e2 instanceof de)
      return console.error(e2.error), this;
    const n2 = "string" == typeof e2 ? new he(e2, t2 || {}) : e2;
    const s2 = n2.name;
    if (this._listens(s2)) {
      n2.target = this;
      const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
      for (const t3 of e3)
        t3.call(this, n2);
    }
    return this;
  }
  _listens(e2) {
    return this._listeners[e2] && this._listeners[e2].length > 0;
  }
}();
function ge(e2, t2) {
  fe.on(e2, t2);
}
function pe(e2, t2 = {}) {
  fe.fire(e2, t2);
}
function me(e2, t2) {
  fe.off(e2, t2);
}
const ye = "loginStateChanged", _e = "loginStateExpire", we = "loginTypeChanged", ke = "anonymousConverted", Te = "refreshAccessToken";
var Se;
!function(e2) {
  e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
}(Se || (Se = {}));
const ve = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], Ae = { "X-SDK-Version": "1.3.5" };
function Pe(e2, t2, n2) {
  const s2 = e2[t2];
  e2[t2] = function(t3) {
    const o2 = {}, r2 = {};
    n2.forEach((n3) => {
      const { data: s3, headers: i3 } = n3.call(e2, t3);
      Object.assign(o2, s3), Object.assign(r2, i3);
    });
    const i2 = t3.data;
    return i2 && (() => {
      var e3;
      if (e3 = i2, "[object FormData]" !== Object.prototype.toString.call(e3))
        t3.data = { ...i2, ...o2 };
      else
        for (const e4 in o2)
          i2.append(e4, o2[e4]);
    })(), t3.headers = { ...t3.headers || {}, ...r2 }, s2.call(e2, t3);
  };
}
function Ie() {
  const e2 = Math.random().toString(16).slice(2);
  return { data: { seqId: e2 }, headers: { ...Ae, "x-seqid": e2 } };
}
class be {
  constructor(e2 = {}) {
    var t2;
    this.config = e2, this._reqClass = new se.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `\u8BF7\u6C42\u5728${this.config.timeout / 1e3}s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD`, restrictedMethods: ["post"] }), this._cache = le(this.config.env), this._localCache = (t2 = this.config.env, ue[t2]), Pe(this._reqClass, "post", [Ie]), Pe(this._reqClass, "upload", [Ie]), Pe(this._reqClass, "download", [Ie]);
  }
  async post(e2) {
    return await this._reqClass.post(e2);
  }
  async upload(e2) {
    return await this._reqClass.upload(e2);
  }
  async download(e2) {
    return await this._reqClass.download(e2);
  }
  async refreshAccessToken() {
    let e2, t2;
    this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
    try {
      e2 = await this._refreshAccessTokenPromise;
    } catch (e3) {
      t2 = e3;
    }
    if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
      throw t2;
    return e2;
  }
  async _refreshAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: o2 } = this._cache.keys;
    this._cache.removeStore(e2), this._cache.removeStore(t2);
    let r2 = this._cache.getStore(n2);
    if (!r2)
      throw new M({ message: "\u672A\u767B\u5F55CloudBase" });
    const i2 = { refresh_token: r2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", i2);
    if (a2.data.code) {
      const { code: e3 } = a2.data;
      if ("SIGN_PARAM_INVALID" === e3 || "REFRESH_TOKEN_EXPIRED" === e3 || "INVALID_REFRESH_TOKEN" === e3) {
        if (this._cache.getStore(s2) === Se.ANONYMOUS && "INVALID_REFRESH_TOKEN" === e3) {
          const e4 = this._cache.getStore(o2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
          return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
        }
        pe(_e), this._cache.removeStore(n2);
      }
      throw new M({ code: a2.data.code, message: `\u5237\u65B0access token\u5931\u8D25\uFF1A${a2.data.code}` });
    }
    if (a2.data.access_token)
      return pe(Te), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
    a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
  }
  async getAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
    if (!this._cache.getStore(n2))
      throw new M({ message: "refresh token\u4E0D\u5B58\u5728\uFF0C\u767B\u5F55\u72B6\u6001\u5F02\u5E38" });
    let s2 = this._cache.getStore(e2), o2 = this._cache.getStore(t2), r2 = true;
    return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, o2) && (r2 = false), (!s2 || !o2 || o2 < Date.now()) && r2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: o2 };
  }
  async request(e2, t2, n2) {
    const s2 = `x-tcb-trace_${this.config.env}`;
    let o2 = "application/x-www-form-urlencoded";
    const r2 = { action: e2, env: this.config.env, dataVersion: "2019-08-16", ...t2 };
    if (-1 === ve.indexOf(e2)) {
      const { refreshTokenKey: e3 } = this._cache.keys;
      this._cache.getStore(e3) && (r2.access_token = (await this.getAccessToken()).accessToken);
    }
    let i2;
    if ("storage.uploadFile" === e2) {
      i2 = new FormData();
      for (let e3 in i2)
        i2.hasOwnProperty(e3) && void 0 !== i2[e3] && i2.append(e3, r2[e3]);
      o2 = "multipart/form-data";
    } else {
      o2 = "application/json", i2 = {};
      for (let e3 in r2)
        void 0 !== r2[e3] && (i2[e3] = r2[e3]);
    }
    let a2 = { headers: { "content-type": o2 } };
    n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
    const c2 = this._localCache.getStore(s2);
    c2 && (a2.headers["X-TCB-Trace"] = c2);
    const { parse: u2, inQuery: l2, search: h2 } = t2;
    let d2 = { env: this.config.env };
    u2 && (d2.parse = true), l2 && (d2 = { ...l2, ...d2 });
    let f2 = function(e3, t3, n3 = {}) {
      const s3 = /\?/.test(t3);
      let o3 = "";
      for (let e4 in n3)
        "" === o3 ? !s3 && (t3 += "?") : o3 += "&", o3 += `${e4}=${encodeURIComponent(n3[e4])}`;
      return /^http(s)?\:\/\//.test(t3 += o3) ? t3 : `${e3}${t3}`;
    }(Y, "//tcb-api.tencentcloudapi.com/web", d2);
    h2 && (f2 += h2);
    const g2 = await this.post({ url: f2, data: i2, ...a2 }), p2 = g2.header && g2.header["x-tcb-trace"];
    if (p2 && this._localCache.setStore(s2, p2), 200 !== Number(g2.status) && 200 !== Number(g2.statusCode) || !g2.data)
      throw new M({ code: "NETWORK_ERROR", message: "network request error" });
    return g2;
  }
  async send(e2, t2 = {}) {
    const n2 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
    if ("ACCESS_TOKEN_EXPIRED" === n2.data.code && -1 === ve.indexOf(e2)) {
      await this.refreshAccessToken();
      const n3 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
      if (n3.data.code)
        throw new M({ code: n3.data.code, message: n3.data.message });
      return n3.data;
    }
    if (n2.data.code)
      throw new M({ code: n2.data.code, message: n2.data.message });
    return n2.data;
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
}
const Oe = {};
function Ce(e2) {
  return Oe[e2];
}
class Ee {
  constructor(e2) {
    this.config = e2, this._cache = le(e2.env), this._request = Ce(e2.env);
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
  setAccessToken(e2, t2) {
    const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
    this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
  }
  async refreshUserInfo() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2);
  }
}
class Re {
  constructor(e2) {
    if (!e2)
      throw new M({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._envId = e2, this._cache = le(this._envId), this._request = Ce(this._envId), this.setUserInfo();
  }
  linkWithTicket(e2) {
    if ("string" != typeof e2)
      throw new M({ code: "PARAM_ERROR", message: "ticket must be string" });
    return this._request.send("auth.linkWithTicket", { ticket: e2 });
  }
  linkWithRedirect(e2) {
    e2.signInWithRedirect();
  }
  updatePassword(e2, t2) {
    return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
  }
  updateEmail(e2) {
    return this._request.send("auth.updateEmail", { newEmail: e2 });
  }
  updateUsername(e2) {
    if ("string" != typeof e2)
      throw new M({ code: "PARAM_ERROR", message: "username must be a string" });
    return this._request.send("auth.updateUsername", { username: e2 });
  }
  async getLinkedUidList() {
    const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
    let t2 = false;
    const { users: n2 } = e2;
    return n2.forEach((e3) => {
      e3.wxOpenId && e3.wxPublicId && (t2 = true);
    }), { users: n2, hasPrimaryUid: t2 };
  }
  setPrimaryUid(e2) {
    return this._request.send("auth.setPrimaryUid", { uid: e2 });
  }
  unlink(e2) {
    return this._request.send("auth.unlink", { platform: e2 });
  }
  async update(e2) {
    const { nickName: t2, gender: n2, avatarUrl: s2, province: o2, country: r2, city: i2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: o2, country: r2, city: i2 });
    this.setLocalUserInfo(a2);
  }
  async refresh() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setUserInfo() {
    const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
    ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
      this[e3] = t2[e3];
    }), this.location = { country: t2.country, province: t2.province, city: t2.city };
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2), this.setUserInfo();
  }
}
class Ue {
  constructor(e2) {
    if (!e2)
      throw new M({ code: "PARAM_ERROR", message: "envId is not defined" });
    this._cache = le(e2);
    const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, o2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), i2 = this._cache.getStore(s2);
    this.credential = { refreshToken: o2, accessToken: r2, accessTokenExpire: i2 }, this.user = new Re(e2);
  }
  get isAnonymousAuth() {
    return this.loginType === Se.ANONYMOUS;
  }
  get isCustomAuth() {
    return this.loginType === Se.CUSTOM;
  }
  get isWeixinAuth() {
    return this.loginType === Se.WECHAT || this.loginType === Se.WECHAT_OPEN || this.loginType === Se.WECHAT_PUBLIC;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
}
class xe extends Ee {
  async signIn() {
    this._cache.updatePersistence("local");
    const { anonymousUuidKey: e2, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2) || void 0, s2 = this._cache.getStore(t2) || void 0, o2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
    if (o2.uuid && o2.refresh_token) {
      this._setAnonymousUUID(o2.uuid), this.setRefreshToken(o2.refresh_token), await this._request.refreshAccessToken(), pe(ye), pe(we, { env: this.config.env, loginType: Se.ANONYMOUS, persistence: "local" });
      const e3 = new Ue(this.config.env);
      return await e3.user.refresh(), e3;
    }
    throw new M({ message: "\u533F\u540D\u767B\u5F55\u5931\u8D25" });
  }
  async linkAndRetrieveDataWithTicket(e2) {
    const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), o2 = this._cache.getStore(n2), r2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: o2, ticket: e2 });
    if (r2.refresh_token)
      return this._clearAnonymousUUID(), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), pe(ke, { env: this.config.env }), pe(we, { loginType: Se.CUSTOM, persistence: "local" }), { credential: { refreshToken: r2.refresh_token } };
    throw new M({ message: "\u533F\u540D\u8F6C\u5316\u5931\u8D25" });
  }
  _setAnonymousUUID(e2) {
    const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, Se.ANONYMOUS);
  }
  _clearAnonymousUUID() {
    this._cache.removeStore(this._cache.keys.anonymousUuidKey);
  }
}
class Le extends Ee {
  async signIn(e2) {
    if ("string" != typeof e2)
      throw new M({ param: "PARAM_ERROR", message: "ticket must be a string" });
    const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
    if (n2.refresh_token)
      return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), pe(ye), pe(we, { env: this.config.env, loginType: Se.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new Ue(this.config.env);
    throw new M({ message: "\u81EA\u5B9A\u4E49\u767B\u5F55\u5931\u8D25" });
  }
}
class De extends Ee {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new M({ code: "PARAM_ERROR", message: "email must be a string" });
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: o2, access_token: r2, access_token_expire: i2 } = s2;
    if (o2)
      return this.setRefreshToken(o2), r2 && i2 ? this.setAccessToken(r2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), pe(ye), pe(we, { env: this.config.env, loginType: Se.EMAIL, persistence: this.config.persistence }), new Ue(this.config.env);
    throw s2.code ? new M({ code: s2.code, message: `\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: ${s2.message}` }) : new M({ message: "\u90AE\u7BB1\u767B\u5F55\u5931\u8D25" });
  }
  async activate(e2) {
    return this._request.send("auth.activateEndUserMail", { token: e2 });
  }
  async resetPasswordWithToken(e2, t2) {
    return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
  }
}
class Ne extends Ee {
  async signIn(e2, t2) {
    if ("string" != typeof e2)
      throw new M({ code: "PARAM_ERROR", message: "username must be a string" });
    "string" != typeof t2 && (t2 = "", console.warn("password is empty"));
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: Se.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: o2, access_token_expire: r2, access_token: i2 } = s2;
    if (o2)
      return this.setRefreshToken(o2), i2 && r2 ? this.setAccessToken(i2, r2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), pe(ye), pe(we, { env: this.config.env, loginType: Se.USERNAME, persistence: this.config.persistence }), new Ue(this.config.env);
    throw s2.code ? new M({ code: s2.code, message: `\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: ${s2.message}` }) : new M({ message: "\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25" });
  }
}
class qe {
  constructor(e2) {
    this.config = e2, this._cache = le(e2.env), this._request = Ce(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), ge(we, this._onLoginTypeChanged);
  }
  get currentUser() {
    const e2 = this.hasLoginState();
    return e2 && e2.user || null;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
  anonymousAuthProvider() {
    return new xe(this.config);
  }
  customAuthProvider() {
    return new Le(this.config);
  }
  emailAuthProvider() {
    return new De(this.config);
  }
  usernameAuthProvider() {
    return new Ne(this.config);
  }
  async signInAnonymously() {
    return new xe(this.config).signIn();
  }
  async signInWithEmailAndPassword(e2, t2) {
    return new De(this.config).signIn(e2, t2);
  }
  signInWithUsernameAndPassword(e2, t2) {
    return new Ne(this.config).signIn(e2, t2);
  }
  async linkAndRetrieveDataWithTicket(e2) {
    this._anonymousAuthProvider || (this._anonymousAuthProvider = new xe(this.config)), ge(ke, this._onAnonymousConverted);
    return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
  }
  async signOut() {
    if (this.loginType === Se.ANONYMOUS)
      throw new M({ message: "\u533F\u540D\u7528\u6237\u4E0D\u652F\u6301\u767B\u51FA\u64CD\u4F5C" });
    const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
    if (!s2)
      return;
    const o2 = await this._request.send("auth.logout", { refresh_token: s2 });
    return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), pe(ye), pe(we, { env: this.config.env, loginType: Se.NULL, persistence: this.config.persistence }), o2;
  }
  async signUpWithEmailAndPassword(e2, t2) {
    return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
  }
  async sendPasswordResetEmail(e2) {
    return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
  }
  onLoginStateChanged(e2) {
    ge(ye, () => {
      const t3 = this.hasLoginState();
      e2.call(this, t3);
    });
    const t2 = this.hasLoginState();
    e2.call(this, t2);
  }
  onLoginStateExpired(e2) {
    ge(_e, e2.bind(this));
  }
  onAccessTokenRefreshed(e2) {
    ge(Te, e2.bind(this));
  }
  onAnonymousConverted(e2) {
    ge(ke, e2.bind(this));
  }
  onLoginTypeChanged(e2) {
    ge(we, () => {
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    });
  }
  async getAccessToken() {
    return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
  }
  hasLoginState() {
    const { refreshTokenKey: e2 } = this._cache.keys;
    return this._cache.getStore(e2) ? new Ue(this.config.env) : null;
  }
  async isUsernameRegistered(e2) {
    if ("string" != typeof e2)
      throw new M({ code: "PARAM_ERROR", message: "username must be a string" });
    const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
    return t2 && t2.isRegistered;
  }
  getLoginState() {
    return Promise.resolve(this.hasLoginState());
  }
  async signInWithTicket(e2) {
    return new Le(this.config).signIn(e2);
  }
  shouldRefreshAccessToken(e2) {
    this._request._shouldRefreshAccessTokenHook = e2.bind(this);
  }
  getUserInfo() {
    return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : { ...e2.data, requestId: e2.seqId });
  }
  getAuthHeader() {
    const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
    return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
  }
  _onAnonymousConverted(e2) {
    const { env: t2 } = e2.data;
    t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
  }
  _onLoginTypeChanged(e2) {
    const { loginType: t2, persistence: n2, env: s2 } = e2.data;
    s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
  }
}
const Fe = function(e2, t2) {
  t2 = t2 || Q();
  const n2 = Ce(this.config.env), { cloudPath: s2, filePath: o2, onUploadProgress: r2, fileType: i2 = "image" } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    const { data: { url: a2, authorization: c2, token: u2, fileId: l2, cosFileId: h2 }, requestId: d2 } = e3, f2 = { key: s2, signature: c2, "x-cos-meta-fileid": h2, success_action_status: "201", "x-cos-security-token": u2 };
    n2.upload({ url: a2, data: f2, file: o2, name: s2, fileType: i2, onUploadProgress: r2 }).then((e4) => {
      201 === e4.statusCode ? t2(null, { fileID: l2, requestId: d2 }) : t2(new M({ code: "STORAGE_REQUEST_FAIL", message: `STORAGE_REQUEST_FAIL: ${e4.data}` }));
    }).catch((e4) => {
      t2(e4);
    });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, Me = function(e2, t2) {
  t2 = t2 || Q();
  const n2 = Ce(this.config.env), { cloudPath: s2 } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    t2(null, e3);
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, $e = function({ fileList: e2 }, t2) {
  if (t2 = t2 || Q(), !e2 || !Array.isArray(e2))
    return { code: "INVALID_PARAM", message: "fileList\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u6570\u7EC4" };
  for (let t3 of e2)
    if (!t3 || "string" != typeof t3)
      return { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" };
  const n2 = { fileid_list: e2 };
  return Ce(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, je = function({ fileList: e2 }, t2) {
  t2 = t2 || Q(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u6570\u7EC4" });
  let n2 = [];
  for (let s3 of e2)
    "object" == typeof s3 ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u5305\u542BfileID\u548CmaxAge\u7684\u5BF9\u8C61" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : "string" == typeof s3 ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u5B57\u7B26\u4E32" });
  const s2 = { file_list: n2 };
  return Ce(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, Ke = async function({ fileID: e2 }, t2) {
  const n2 = (await je.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
  if ("SUCCESS" !== n2.code)
    return t2 ? t2(n2) : new Promise((e3) => {
      e3(n2);
    });
  const s2 = Ce(this.config.env);
  let o2 = n2.download_url;
  if (o2 = encodeURI(o2), !t2)
    return s2.download({ url: o2 });
  t2(await s2.download({ url: o2 }));
}, Be = function({ name: e2, data: t2, query: n2, parse: s2, search: o2 }, r2) {
  const i2 = r2 || Q();
  let a2;
  try {
    a2 = t2 ? JSON.stringify(t2) : "";
  } catch (e3) {
    return Promise.reject(e3);
  }
  if (!e2)
    return Promise.reject(new M({ code: "PARAM_ERROR", message: "\u51FD\u6570\u540D\u4E0D\u80FD\u4E3A\u7A7A" }));
  const c2 = { inQuery: n2, parse: s2, search: o2, function_name: e2, request_data: a2 };
  return Ce(this.config.env).send("functions.invokeFunction", c2).then((e3) => {
    if (e3.code)
      i2(null, e3);
    else {
      let t3 = e3.data.response_data;
      if (s2)
        i2(null, { result: t3, requestId: e3.requestId });
      else
        try {
          t3 = JSON.parse(e3.data.response_data), i2(null, { result: t3, requestId: e3.requestId });
        } catch (e4) {
          i2(new M({ message: "response data must be json" }));
        }
    }
    return i2.promise;
  }).catch((e3) => {
    i2(e3);
  }), i2.promise;
}, He = { timeout: 15e3, persistence: "session" }, We = {};
class ze {
  constructor(e2) {
    this.config = e2 || this.config, this.authObj = void 0;
  }
  init(e2) {
    switch (se.adapter || (this.requestClient = new se.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `\u8BF7\u6C42\u5728${(e2.timeout || 5e3) / 1e3}s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD` })), this.config = { ...He, ...e2 }, true) {
      case this.config.timeout > 6e5:
        console.warn("timeout\u5927\u4E8E\u53EF\u914D\u7F6E\u4E0A\u9650[10\u5206\u949F]\uFF0C\u5DF2\u91CD\u7F6E\u4E3A\u4E0A\u9650\u6570\u503C"), this.config.timeout = 6e5;
        break;
      case this.config.timeout < 100:
        console.warn("timeout\u5C0F\u4E8E\u53EF\u914D\u7F6E\u4E0B\u9650[100ms]\uFF0C\u5DF2\u91CD\u7F6E\u4E3A\u4E0B\u9650\u6570\u503C"), this.config.timeout = 100;
    }
    return new ze(this.config);
  }
  auth({ persistence: e2 } = {}) {
    if (this.authObj)
      return this.authObj;
    const t2 = e2 || se.adapter.primaryStorage || He.persistence;
    var n2;
    return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
      const { env: t3 } = e3;
      ce[t3] = new ae(e3), ue[t3] = new ae({ ...e3, persistence: "local" });
    }(this.config), n2 = this.config, Oe[n2.env] = new be(n2), this.authObj = new qe(this.config), this.authObj;
  }
  on(e2, t2) {
    return ge.apply(this, [e2, t2]);
  }
  off(e2, t2) {
    return me.apply(this, [e2, t2]);
  }
  callFunction(e2, t2) {
    return Be.apply(this, [e2, t2]);
  }
  deleteFile(e2, t2) {
    return $e.apply(this, [e2, t2]);
  }
  getTempFileURL(e2, t2) {
    return je.apply(this, [e2, t2]);
  }
  downloadFile(e2, t2) {
    return Ke.apply(this, [e2, t2]);
  }
  uploadFile(e2, t2) {
    return Fe.apply(this, [e2, t2]);
  }
  getUploadMetadata(e2, t2) {
    return Me.apply(this, [e2, t2]);
  }
  registerExtension(e2) {
    We[e2.name] = e2;
  }
  async invokeExtension(e2, t2) {
    const n2 = We[e2];
    if (!n2)
      throw new M({ message: `\u6269\u5C55${e2} \u5FC5\u987B\u5148\u6CE8\u518C` });
    return await n2.invoke(t2, this);
  }
  useAdapters(e2) {
    const { adapter: t2, runtime: n2 } = ne(e2) || {};
    t2 && (se.adapter = t2), n2 && (se.runtime = n2);
  }
}
var Ve = new ze();
function Je(e2, t2, n2) {
  void 0 === n2 && (n2 = {});
  var s2 = /\?/.test(t2), o2 = "";
  for (var r2 in n2)
    "" === o2 ? !s2 && (t2 += "?") : o2 += "&", o2 += r2 + "=" + encodeURIComponent(n2[r2]);
  return /^http(s)?:\/\//.test(t2 += o2) ? t2 : "" + e2 + t2;
}
class Ye {
  post(e2) {
    const { url: t2, data: n2, headers: s2 } = e2;
    return new Promise((e3, o2) => {
      H.request({ url: Je("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
        e3(t3);
      }, fail(e4) {
        o2(e4);
      } });
    });
  }
  upload(e2) {
    return new Promise((t2, n2) => {
      const { url: s2, file: o2, data: r2, headers: i2, fileType: a2 } = e2, c2 = H.uploadFile({ url: Je("https:", s2), name: "file", formData: Object.assign({}, r2), filePath: o2, fileType: a2, header: i2, success(e3) {
        const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
        200 === e3.statusCode && r2.success_action_status && (n3.statusCode = parseInt(r2.success_action_status, 10)), t2(n3);
      }, fail(e3) {
        "mp-alipay" === g && console.warn("\u652F\u4ED8\u5B9D\u5C0F\u7A0B\u5E8F\u5F00\u53D1\u5DE5\u5177\u4E0A\u4F20\u817E\u8BAF\u4E91\u65F6\u65E0\u6CD5\u51C6\u786E\u5224\u65AD\u662F\u5426\u4E0A\u4F20\u6210\u529F\uFF0C\u8BF7\u4F7F\u7528\u771F\u673A\u6D4B\u8BD5"), n2(new Error(e3.errMsg || "uploadFile:fail"));
      } });
      "function" == typeof e2.onUploadProgress && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((t3) => {
        e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
      });
    });
  }
}
const Xe = { setItem(e2, t2) {
  H.setStorageSync(e2, t2);
}, getItem: (e2) => H.getStorageSync(e2), removeItem(e2) {
  H.removeStorageSync(e2);
}, clear() {
  H.clearStorageSync();
} };
var Ge = { genAdapter: function() {
  return { root: {}, reqClass: Ye, localStorage: Xe, primaryStorage: "local" };
}, isMatch: function() {
  return true;
}, runtime: "uni_app" };
Ve.useAdapters(Ge);
const Qe = Ve, Ze = Qe.init;
Qe.init = function(e2) {
  e2.env = e2.spaceId;
  const t2 = Ze.call(this, e2);
  t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
  const n2 = t2.auth;
  return t2.auth = function(e3) {
    const t3 = n2.call(this, e3);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
      t3[e4] = F(t3[e4]).bind(t3);
    }), t3;
  }, t2.customAuth = t2.auth, t2;
};
var et = Qe;
function tt(e2) {
  return e2 && tt(e2.__v_raw) || e2;
}
function nt() {
  return { token: H.getStorageSync("uni_id_token") || H.getStorageSync("uniIdToken"), tokenExpired: H.getStorageSync("uni_id_token_expired") };
}
function st({ token: e2, tokenExpired: t2 } = {}) {
  e2 && H.setStorageSync("uni_id_token", e2), t2 && H.setStorageSync("uni_id_token_expired", t2);
}
function ot() {
  if ("web" !== g)
    return;
  index.getStorageSync("__LAST_DCLOUD_APPID") !== _ && (index.setStorageSync("__LAST_DCLOUD_APPID", _), console.warn("\u68C0\u6D4B\u5230\u5F53\u524D\u9879\u76EE\u4E0E\u4E0A\u6B21\u8FD0\u884C\u5230\u6B64\u7AEF\u53E3\u7684\u9879\u76EE\u4E0D\u4E00\u81F4\uFF0C\u81EA\u52A8\u6E05\u7406uni-id\u4FDD\u5B58\u7684token\u4FE1\u606F\uFF08\u4EC5\u5F00\u53D1\u8C03\u8BD5\u65F6\u751F\u6548\uFF09"), H.removeStorageSync("uni_id_token"), H.removeStorageSync("uniIdToken"), H.removeStorageSync("uni_id_token_expired"));
}
var rt = class extends V {
  getAccessToken() {
    return new Promise((e2, t2) => {
      const n2 = "Anonymous_Access_token";
      this.setAccessToken(n2), e2(n2);
    });
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    "auth" !== t2 && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = B.sign(n2, this.config.clientSecret);
    const o2 = K();
    s2["x-client-info"] = encodeURIComponent(JSON.stringify(o2));
    const { token: r2 } = nt();
    return s2["x-client-token"] = r2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: o2, onUploadProgress: r2 }) {
    return new Promise((i2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: o2, success(e3) {
        e3 && e3.statusCode < 400 ? i2(e3) : a2(new M({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      }, fail(e3) {
        a2(new M({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      } });
      "function" == typeof r2 && c2 && "function" == typeof c2.onProgressUpdate && c2.onProgressUpdate((e3) => {
        r2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
    if (!t2)
      throw new M({ code: "CLOUDPATH_REQUIRED", message: "cloudPath\u4E0D\u53EF\u4E3A\u7A7A" });
    let o2;
    return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
      const { url: r2, formData: i2, name: a2 } = t3.result;
      o2 = t3.result.fileUrl;
      const c2 = { url: r2, formData: i2, name: a2, filePath: e2, fileType: n2 };
      return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
    }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e2, fileID: o2 }) : s3(new M({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
    }));
  }
  deleteFile({ fileList: e2 }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
    return this.request(this.setupRequest(t2));
  }
  getTempFileURL({ fileList: e2 } = {}) {
    const t2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2 }) };
    return this.request(this.setupRequest(t2));
  }
};
var it = { init(e2) {
  const t2 = new rt(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
function at({ data: e2 }) {
  let t2;
  t2 = K();
  const n2 = JSON.parse(JSON.stringify(e2 || {}));
  if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
    const { token: e3 } = nt();
    e3 && (n2.uniIdToken = e3);
  }
  return n2;
}
function ct({ name: e2, data: t2 }) {
  const { localAddress: n2, localPort: s2 } = this, o2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider], r2 = this.config.spaceId, i2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e2}`;
  return new Promise((t3, n3) => {
    H.request({ method: "POST", url: i2, data: { name: e2, platform: g, provider: o2, spaceId: r2 }, timeout: 3e3, success(e3) {
      t3(e3);
    }, fail() {
      t3({ data: { code: "NETWORK_ERROR", message: "\u8FDE\u63A5\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5BA2\u6237\u7AEF\u662F\u5426\u548C\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570\u3002" } });
    } });
  }).then(({ data: e3 } = {}) => {
    const { code: t3, message: n3 } = e3 || {};
    return { code: 0 === t3 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
  }).then(({ code: n3, message: s3 }) => {
    if (0 !== n3) {
      switch (n3) {
        case "MODULE_ENCRYPTED":
          console.error(`\u6B64\u4E91\u51FD\u6570\uFF08${e2}\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570`);
          break;
        case "FUNCTION_ENCRYPTED":
          console.error(`\u6B64\u4E91\u51FD\u6570\uFF08${e2}\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570`);
          break;
        case "ACTION_ENCRYPTED":
          console.error(s3 || "\u9700\u8981\u8BBF\u95EE\u52A0\u5BC6\u7684uni-clientDB-action\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u73AF\u5883");
          break;
        case "NETWORK_ERROR": {
          const e3 = "\u8FDE\u63A5\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5BA2\u6237\u7AEF\u662F\u5426\u548C\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B";
          throw console.error(e3), new Error(e3);
        }
        case "SWITCH_TO_CLOUD":
          break;
        default: {
          const e3 = `\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A${s3}\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5`;
          throw console.error(e3), new Error(e3);
        }
      }
      return this._originCallFunction({ name: e2, data: t2 });
    }
    return new Promise((e3, n4) => {
      const s4 = at.call(this, { data: t2 });
      H.request({ method: "POST", url: a2, data: { provider: o2, platform: g, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new M({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e3({ result: s5 }), fail(e4) {
        n4(new M({ code: e4.code || e4.errCode || "SYS_ERR", message: e4.message || e4.errMsg || "request:fail" }));
      } });
    });
  });
}
const ut = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "\uFF0C\u4E91\u51FD\u6570[{functionName}]\u5728\u4E91\u7AEF\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u6B64\u4E91\u51FD\u6570\u540D\u79F0\u662F\u5426\u6B63\u786E\u4EE5\u53CA\u8BE5\u4E91\u51FD\u6570\u662F\u5426\u5DF2\u4E0A\u4F20\u5230\u670D\u52A1\u7A7A\u95F4", mode: "append" }];
var lt = /[\\^$.*+?()[\]{}|]/g, ht = RegExp(lt.source);
function dt(e2, t2, n2) {
  return e2.replace(new RegExp((s2 = t2) && ht.test(s2) ? s2.replace(lt, "\\$&") : s2, "g"), n2);
  var s2;
}
function ft({ functionName: e2, result: t2, logPvd: n2 }) {
  if (this.config.debugLog && t2 && t2.requestId) {
    const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
    console.log(`[${n2}-request]${s2}[/${n2}-request]`);
  }
}
function gt(e2) {
  const t2 = e2.callFunction, n2 = function(n3) {
    const s2 = n3.name;
    n3.data = at.call(e2, { data: n3.data });
    const o2 = { aliyun: "aliyun", tencent: "tcb", tcb: "tcb" }[this.config.provider];
    return t2.call(this, n3).then((e3) => (e3.errCode = 0, ft.call(this, { functionName: s2, result: e3, logPvd: o2 }), Promise.resolve(e3)), (e3) => (ft.call(this, { functionName: s2, result: e3, logPvd: o2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
      for (let s3 = 0; s3 < n4.length; s3++) {
        const { rule: o3, content: r2, mode: i2 } = n4[s3], a2 = e4.match(o3);
        if (!a2)
          continue;
        let c2 = r2;
        for (let e5 = 1; e5 < a2.length; e5++)
          c2 = dt(c2, `{$${e5}}`, a2[e5]);
        for (const e5 in t3)
          c2 = dt(c2, `{${e5}}`, t3[e5]);
        return "replace" === i2 ? c2 : e4 + c2;
      }
      return e4;
    }({ message: `[${n3.name}]: ${e3.message}`, formatter: ut, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
  };
  e2.callFunction = function(t3) {
    let s2;
    return e2.debugInfo && !e2.debugInfo.forceRemote && m ? (e2._originCallFunction || (e2._originCallFunction = n2), s2 = ct.call(this, t3)) : s2 = n2.call(this, t3), Object.defineProperty(s2, "result", { get: () => (console.warn("\u5F53\u524D\u8FD4\u56DE\u7ED3\u679C\u4E3APromise\u7C7B\u578B\uFF0C\u4E0D\u53EF\u76F4\u63A5\u8BBF\u95EE\u5176result\u5C5E\u6027\uFF0C\u8BE6\u60C5\u8BF7\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), s2;
  };
}
const pt = Symbol("CLIENT_DB_INTERNAL");
function mt(e2, t2) {
  return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = pt, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
    if ("_uniClient" === n2)
      return null;
    if (n2 in e3 || "string" != typeof n2) {
      const t3 = e3[n2];
      return "function" == typeof t3 ? t3.bind(e3) : t3;
    }
    return t2.get(e3, n2, s2);
  } });
}
function yt(e2) {
  return { on: (t2, n2) => {
    e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
  }, off: (t2, n2) => {
    e2[t2] = e2[t2] || [];
    const s2 = e2[t2].indexOf(n2);
    -1 !== s2 && e2[t2].splice(s2, 1);
  } };
}
const _t = ["db.Geo", "db.command", "command.aggregate"];
function wt(e2, t2) {
  return _t.indexOf(`${e2}.${t2}`) > -1;
}
function kt(e2) {
  switch (u(e2 = tt(e2))) {
    case "array":
      return e2.map((e3) => kt(e3));
    case "object":
      return e2._internalType === pt || Object.keys(e2).forEach((t2) => {
        e2[t2] = kt(e2[t2]);
      }), e2;
    case "regexp":
      return { $regexp: { source: e2.source, flags: e2.flags } };
    case "date":
      return { $date: e2.toISOString() };
    default:
      return e2;
  }
}
function Tt(e2) {
  return e2 && e2.content && e2.content.$method;
}
class St {
  constructor(e2, t2, n2) {
    this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
  }
  toJSON() {
    let e2 = this;
    const t2 = [e2.content];
    for (; e2.prevStage; )
      e2 = e2.prevStage, t2.push(e2.content);
    return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: kt(e3.$param) })) };
  }
  getAction() {
    const e2 = this.toJSON().$db.find((e3) => "action" === e3.$method);
    return e2 && e2.$param && e2.$param[0];
  }
  getCommand() {
    return { $db: this.toJSON().$db.filter((e2) => "action" !== e2.$method) };
  }
  get isAggregate() {
    let e2 = this;
    for (; e2; ) {
      const t2 = Tt(e2), n2 = Tt(e2.prevStage);
      if ("aggregate" === t2 && "collection" === n2 || "pipeline" === t2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isCommand() {
    let e2 = this;
    for (; e2; ) {
      if ("command" === Tt(e2))
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get isAggregateCommand() {
    let e2 = this;
    for (; e2; ) {
      const t2 = Tt(e2), n2 = Tt(e2.prevStage);
      if ("aggregate" === t2 && "command" === n2)
        return true;
      e2 = e2.prevStage;
    }
    return false;
  }
  get count() {
    if (!this.isAggregate)
      return function() {
        return this._send("count", Array.from(arguments));
      };
    const e2 = this;
    return function() {
      return vt({ $method: "count", $param: kt(Array.from(arguments)) }, e2, this._database);
    };
  }
  get remove() {
    if (!this.isCommand)
      return function() {
        return this._send("remove", Array.from(arguments));
      };
    const e2 = this;
    return function() {
      return vt({ $method: "remove", $param: kt(Array.from(arguments)) }, e2, this._database);
    };
  }
  get() {
    return this._send("get", Array.from(arguments));
  }
  add() {
    return this._send("add", Array.from(arguments));
  }
  update() {
    return this._send("update", Array.from(arguments));
  }
  end() {
    return this._send("end", Array.from(arguments));
  }
  get set() {
    if (!this.isCommand)
      return function() {
        throw new Error("JQL\u7981\u6B62\u4F7F\u7528set\u65B9\u6CD5");
      };
    const e2 = this;
    return function() {
      return vt({ $method: "set", $param: kt(Array.from(arguments)) }, e2, this._database);
    };
  }
  _send(e2, t2) {
    const n2 = this.getAction(), s2 = this.getCommand();
    if (s2.$db.push({ $method: e2, $param: kt(t2) }), d) {
      const e3 = s2.$db.find((e4) => "collection" === e4.$method), t3 = e3 && e3.$param;
      t3 && 1 === t3.length && "string" == typeof e3.$param[0] && e3.$param[0].indexOf(",") > -1 && console.warn("\u68C0\u6D4B\u5230\u4F7F\u7528JQL\u8BED\u6CD5\u8054\u8868\u67E5\u8BE2\u65F6\uFF0C\u672A\u4F7F\u7528getTemp\u5148\u8FC7\u6EE4\u4E3B\u8868\u6570\u636E\uFF0C\u5728\u4E3B\u8868\u6570\u636E\u91CF\u5927\u7684\u60C5\u51B5\u4E0B\u53EF\u80FD\u4F1A\u67E5\u8BE2\u7F13\u6162\u3002\n- \u5982\u4F55\u4F18\u5316\u8BF7\u53C2\u8003\u6B64\u6587\u6863\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- \u5982\u679C\u4E3B\u8868\u6570\u636E\u91CF\u5F88\u5C0F\u8BF7\u5FFD\u7565\u6B64\u4FE1\u606F\uFF0C\u9879\u76EE\u53D1\u884C\u65F6\u4E0D\u4F1A\u51FA\u73B0\u6B64\u63D0\u793A\u3002");
    }
    return this._database._callCloudFunction({ action: n2, command: s2 });
  }
}
function vt(e2, t2, n2) {
  return mt(new St(e2, t2, n2), { get(e3, t3) {
    let s2 = "db";
    return e3 && e3.content && (s2 = e3.content.$method), wt(s2, t3) ? vt({ $method: t3 }, e3, n2) : function() {
      return vt({ $method: t3, $param: kt(Array.from(arguments)) }, e3, n2);
    };
  } });
}
function At({ path: e2, method: t2 }) {
  return class {
    constructor() {
      this.param = Array.from(arguments);
    }
    toJSON() {
      return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
    }
  };
}
class Pt extends class {
  constructor({ uniClient: e2 = {} } = {}) {
    this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2.isDefault && (this._dbCallBacks = k("_globalUniCloudDatabaseCallback")), this.auth = yt(this._authCallBacks), Object.assign(this, yt(this._dbCallBacks)), this.env = mt({}, { get: (e3, t2) => ({ $env: t2 }) }), this.Geo = mt({}, { get: (e3, t2) => At({ path: ["Geo"], method: t2 }) }), this.serverDate = At({ path: [], method: "serverDate" }), this.RegExp = At({ path: [], method: "RegExp" });
  }
  getCloudEnv(e2) {
    if ("string" != typeof e2 || !e2.trim())
      throw new Error("getCloudEnv\u53C2\u6570\u9519\u8BEF");
    return { $env: e2.replace("$cloudEnv_", "") };
  }
  _callback(e2, t2) {
    const n2 = this._dbCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  _callbackAuth(e2, t2) {
    const n2 = this._authCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  multiSend() {
    const e2 = Array.from(arguments), t2 = e2.map((e3) => {
      const t3 = e3.getAction(), n2 = e3.getCommand();
      if ("getTemp" !== n2.$db[n2.$db.length - 1].$method)
        throw new Error("multiSend\u53EA\u652F\u6301\u5B50\u547D\u4EE4\u5185\u4F7F\u7528getTemp");
      return { action: t3, command: n2 };
    });
    return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
  }
} {
  _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
    function o2(e3, t3) {
      if (n2 && s2)
        for (let n3 = 0; n3 < s2.length; n3++) {
          const o3 = s2[n3];
          o3.udb && "function" == typeof o3.udb.setResult && (t3 ? o3.udb.setResult(t3) : o3.udb.setResult(e3.result.dataList[n3]));
        }
    }
    const r2 = this;
    function i2(e3) {
      return r2._callback("error", [e3]), P(I("database", "fail"), e3).then(() => P(I("database", "complete"), e3)).then(() => (o2(null, e3), q(O, { type: R, content: e3 }), Promise.reject(e3)));
    }
    const a2 = P(I("database", "invoke")), u2 = this._uniClient;
    return a2.then(() => u2.callFunction({ name: "DCloud-clientDB", type: c, data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
      const { code: t3, message: n3, token: s3, tokenExpired: r3, systemInfo: a3 = [] } = e3.result;
      if (a3)
        for (let e4 = 0; e4 < a3.length; e4++) {
          const { level: t4, message: n4, detail: s4 } = a3[e4], o3 = console["app" === g && "warn" === t4 ? "error" : t4] || console.log;
          let r4 = "[System Info]" + n4;
          s4 && (r4 = `${r4}
\u8BE6\u7EC6\u4FE1\u606F\uFF1A${s4}`), o3(r4);
        }
      if (t3) {
        return i2(new M({ code: t3, message: n3, requestId: e3.requestId }));
      }
      e3.result.errCode = e3.result.code, e3.result.errMsg = e3.result.message, s3 && r3 && (st({ token: s3, tokenExpired: r3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: r3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: r3 }]), q(E, { token: s3, tokenExpired: r3 }));
      const c2 = [{ prop: "affectedDocs", tips: "affectedDocs\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528inserted/deleted/updated/data.length\u66FF\u4EE3" }, { prop: "code", tips: "code\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528errCode\u66FF\u4EE3" }, { prop: "message", tips: "message\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528errMsg\u66FF\u4EE3" }];
      for (let t4 = 0; t4 < c2.length; t4++) {
        const { prop: n4, tips: s4 } = c2[t4];
        if (n4 in e3.result) {
          const t5 = e3.result[n4];
          Object.defineProperty(e3.result, n4, { get: () => (console.warn(s4), t5) });
        }
      }
      return function(e4) {
        return P(I("database", "success"), e4).then(() => P(I("database", "complete"), e4)).then(() => (o2(e4, null), q(O, { type: R, content: e4 }), Promise.resolve(e4)));
      }(e3);
    }, (e3) => {
      /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB\u672A\u521D\u59CB\u5316\uFF0C\u8BF7\u5728web\u63A7\u5236\u53F0\u4FDD\u5B58\u4E00\u6B21schema\u4EE5\u5F00\u542FclientDB");
      return i2(new M({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId }));
    });
  }
}
function It(e2) {
  e2.database = function(t2) {
    if (t2 && Object.keys(t2).length > 0)
      return e2.init(t2).database();
    if (this._database)
      return this._database;
    const n2 = function(e3, t3 = {}) {
      return mt(new e3(t3), { get: (e4, t4) => wt("db", t4) ? vt({ $method: t4 }, null, e4) : function() {
        return vt({ $method: t4, $param: kt(Array.from(arguments)) }, null, e4);
      } });
    }(Pt, { uniClient: e2 });
    return this._database = n2, n2;
  };
}
const bt = "token\u65E0\u6548\uFF0C\u8DF3\u8F6C\u767B\u5F55\u9875\u9762", Ot = "token\u8FC7\u671F\uFF0C\u8DF3\u8F6C\u767B\u5F55\u9875\u9762", Ct = { TOKEN_INVALID_TOKEN_EXPIRED: Ot, TOKEN_INVALID_INVALID_CLIENTID: bt, TOKEN_INVALID: bt, TOKEN_INVALID_WRONG_TOKEN: bt, TOKEN_INVALID_ANONYMOUS_USER: bt }, Et = { "uni-id-token-expired": Ot, "uni-id-check-token-failed": bt, "uni-id-token-not-exist": bt, "uni-id-check-device-feature-failed": bt };
function Rt(e2, t2) {
  let n2 = "";
  return n2 = e2 ? `${e2}/${t2}` : t2, n2.replace(/^\//, "");
}
function Ut(e2 = [], t2 = "") {
  const n2 = [], s2 = [];
  return e2.forEach((e3) => {
    true === e3.needLogin ? n2.push(Rt(t2, e3.path)) : false === e3.needLogin && s2.push(Rt(t2, e3.path));
  }), { needLoginPage: n2, notNeedLoginPage: s2 };
}
function xt(e2 = "", t2 = {}) {
  if (!e2)
    return false;
  if (!(t2 && t2.list && t2.list.length))
    return false;
  const n2 = t2.list, s2 = e2.split("?")[0].replace(/^\//, "");
  return n2.some((e3) => e3.pagePath === s2);
}
const Lt = !!t.uniIdRouter;
const { loginPage: Dt, routerNeedLogin: Nt, resToLogin: qt, needLoginPage: Ft, notNeedLoginPage: Mt, loginPageInTabBar: $t } = function({ pages: e2 = [], subPackages: n2 = [], uniIdRouter: s2 = {}, tabBar: o2 = {} } = t) {
  const { loginPage: r2, needLogin: i2 = [], resToLogin: a2 = true } = s2, { needLoginPage: c2, notNeedLoginPage: u2 } = Ut(e2), { needLoginPage: l2, notNeedLoginPage: h2 } = function(e3 = []) {
    const t2 = [], n3 = [];
    return e3.forEach((e4) => {
      const { root: s3, pages: o3 = [] } = e4, { needLoginPage: r3, notNeedLoginPage: i3 } = Ut(o3, s3);
      t2.push(...r3), n3.push(...i3);
    }), { needLoginPage: t2, notNeedLoginPage: n3 };
  }(n2);
  return { loginPage: r2, routerNeedLogin: i2, resToLogin: a2, needLoginPage: [...c2, ...l2], notNeedLoginPage: [...u2, ...h2], loginPageInTabBar: xt(r2, o2) };
}();
function jt(e2) {
  const t2 = function(e3) {
    const t3 = getCurrentPages(), n2 = t3[t3.length - 1].route, s2 = e3.charAt(0), o2 = e3.split("?")[0];
    if ("/" === s2)
      return o2;
    const r2 = o2.replace(/^\//, "").split("/"), i2 = n2.split("/");
    i2.pop();
    for (let e4 = 0; e4 < r2.length; e4++) {
      const t4 = r2[e4];
      ".." === t4 ? i2.pop() : "." !== t4 && i2.push(t4);
    }
    return "" === i2[0] && i2.shift(), i2.join("/");
  }(e2).replace(/^\//, "");
  return !(Mt.indexOf(t2) > -1) && (Ft.indexOf(t2) > -1 || Nt.some((t3) => function(e3, t4) {
    return new RegExp(t4).test(e3);
  }(e2, t3)));
}
function Kt(e2, t2) {
  return "/" !== e2.charAt(0) && (e2 = "/" + e2), t2 ? e2.indexOf("?") > -1 ? e2 + `&uniIdRedirectUrl=${encodeURIComponent(t2)}` : e2 + `?uniIdRedirectUrl=${encodeURIComponent(t2)}` : e2;
}
function Bt() {
  const e2 = ["navigateTo", "redirectTo", "reLaunch", "switchTab"];
  for (let t2 = 0; t2 < e2.length; t2++) {
    const n2 = e2[t2];
    index.addInterceptor(n2, { invoke(e3) {
      const { token: t3, tokenExpired: s2 } = nt();
      let o2;
      if (t3) {
        if (s2 < Date.now()) {
          const e4 = "uni-id-token-expired";
          o2 = { errCode: e4, errMsg: Et[e4] };
        }
      } else {
        const e4 = "uni-id-check-token-failed";
        o2 = { errCode: e4, errMsg: Et[e4] };
      }
      if (jt(e3.url) && o2) {
        o2.uniIdRedirectUrl = e3.url;
        if (L(C).length > 0)
          return setTimeout(() => {
            q(C, o2);
          }, 0), e3.url = "", false;
        if (!Dt)
          return e3;
        const t4 = Kt(Dt, o2.uniIdRedirectUrl);
        if ($t) {
          if ("navigateTo" === n2 || "redirectTo" === n2)
            return setTimeout(() => {
              index.switchTab({ url: t4 });
            }), false;
        } else if ("switchTab" === n2)
          return setTimeout(() => {
            index.navigateTo({ url: t4 });
          }), false;
        e3.url = t4;
      }
      return e3;
    } });
  }
}
function Ht() {
  this.onResponse((e2) => {
    const { type: t2, content: n2 } = e2;
    let s2 = false;
    switch (t2) {
      case "cloudobject":
        s2 = function(e3) {
          const { errCode: t3 } = e3;
          return t3 in Et;
        }(n2);
        break;
      case "clientdb":
        s2 = function(e3) {
          const { errCode: t3 } = e3;
          return t3 in Ct;
        }(n2);
    }
    s2 && function(e3 = {}) {
      const t3 = L(C), n3 = getCurrentPages(), s3 = n3[n3.length - 1], o2 = s3 && s3.$page && s3.$page.fullPath;
      if (t3.length > 0)
        return q(C, Object.assign({ uniIdRedirectUrl: o2 }, e3));
      Dt && index.navigateTo({ url: Kt(Dt, o2) });
    }(n2);
  });
}
function Wt(e2) {
  e2.onNeedLogin = function(e3) {
    D(C, e3);
  }, e2.offNeedLogin = function(e3) {
    N(C, e3);
  }, Lt && (k("uni-cloud-status").needLoginInit || (k("uni-cloud-status").needLoginInit = true, function t2() {
    const n2 = getCurrentPages();
    n2 && n2[0] ? Bt.call(e2) : setTimeout(() => {
      t2();
    }, 30);
  }(), qt && Ht.call(e2)));
}
function zt(e2) {
  !function(e3) {
    e3.onResponse = function(e4) {
      D(O, e4);
    }, e3.offResponse = function(e4) {
      N(O, e4);
    };
  }(e2), Wt(e2), function(e3) {
    e3.onRefreshToken = function(e4) {
      D(E, e4);
    }, e3.offRefreshToken = function(e4) {
      N(E, e4);
    };
  }(e2);
}
let Vt;
const Jt = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", Yt = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function Xt() {
  const e2 = nt().token || "", t2 = e2.split(".");
  if (!e2 || 3 !== t2.length)
    return { uid: null, role: [], permission: [], tokenExpired: 0 };
  let n2;
  try {
    n2 = JSON.parse((s2 = t2[1], decodeURIComponent(Vt(s2).split("").map(function(e3) {
      return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
    }).join(""))));
  } catch (e3) {
    throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + e3.message);
  }
  var s2;
  return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
}
Vt = "function" != typeof atob ? function(e2) {
  if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !Yt.test(e2))
    throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t2;
  e2 += "==".slice(2 - (3 & e2.length));
  for (var n2, s2, o2 = "", r2 = 0; r2 < e2.length; )
    t2 = Jt.indexOf(e2.charAt(r2++)) << 18 | Jt.indexOf(e2.charAt(r2++)) << 12 | (n2 = Jt.indexOf(e2.charAt(r2++))) << 6 | (s2 = Jt.indexOf(e2.charAt(r2++))), o2 += 64 === n2 ? String.fromCharCode(t2 >> 16 & 255) : 64 === s2 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
  return o2;
} : atob;
var Gt = s(function(e2, t2) {
  Object.defineProperty(t2, "__esModule", { value: true });
  const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
  function o2(e3, t3) {
    return e3.tempFiles.forEach((e4, n3) => {
      e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
    }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
  }
  function r2(e3, t3, { onChooseFile: s3, onUploadProgress: o3 }) {
    return t3.then((e4) => {
      if (s3) {
        const t4 = s3(e4);
        if (void 0 !== t4)
          return Promise.resolve(t4).then((t5) => void 0 === t5 ? e4 : t5);
      }
      return e4;
    }).then((t4) => false === t4 ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, o4) {
      (t5 = Object.assign({}, t5)).errMsg = n2;
      const r3 = t5.tempFiles, i2 = r3.length;
      let a2 = 0;
      return new Promise((n3) => {
        for (; a2 < s4; )
          c2();
        function c2() {
          const s5 = a2++;
          if (s5 >= i2)
            return void (!r3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
          const u2 = r3[s5];
          e4.uploadFile({ filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, onUploadProgress(e5) {
            e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, o4 && o4(e5);
          } }).then((e5) => {
            u2.url = e5.fileID, s5 < i2 && c2();
          }).catch((e5) => {
            u2.errMsg = e5.errMsg || e5.message, s5 < i2 && c2();
          });
        }
      });
    }(e3, t4, 5, o3));
  }
  t2.initChooseAndUploadFile = function(e3) {
    return function(t3 = { type: "all" }) {
      return "image" === t3.type ? r2(e3, function(e4) {
        const { count: t4, sizeType: n3, sourceType: r3 = ["album", "camera"], extension: i2 } = e4;
        return new Promise((e5, a2) => {
          index.chooseImage({ count: t4, sizeType: n3, sourceType: r3, extension: i2, success(t5) {
            e5(o2(t5, "image"));
          }, fail(e6) {
            a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
          } });
        });
      }(t3), t3) : "video" === t3.type ? r2(e3, function(e4) {
        const { camera: t4, compressed: n3, maxDuration: r3, sourceType: i2 = ["album", "camera"], extension: a2 } = e4;
        return new Promise((e5, c2) => {
          index.chooseVideo({ camera: t4, compressed: n3, maxDuration: r3, sourceType: i2, extension: a2, success(t5) {
            const { tempFilePath: n4, duration: s3, size: r4, height: i3, width: a3 } = t5;
            e5(o2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: r4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: i3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
          }, fail(e6) {
            c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
          } });
        });
      }(t3), t3) : r2(e3, function(e4) {
        const { count: t4, extension: n3 } = e4;
        return new Promise((e5, r3) => {
          let i2 = index.chooseFile;
          if ("undefined" != typeof wx && "function" == typeof wx.chooseMessageFile && (i2 = wx.chooseMessageFile), "function" != typeof i2)
            return r3({ errMsg: s2 + " \u8BF7\u6307\u5B9A type \u7C7B\u578B\uFF0C\u8BE5\u5E73\u53F0\u4EC5\u652F\u6301\u9009\u62E9 image \u6216 video\u3002" });
          i2({ type: "all", count: t4, extension: n3, success(t5) {
            e5(o2(t5));
          }, fail(e6) {
            r3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
          } });
        });
      }(t3), t3);
    };
  };
}), Qt = n(Gt);
const Zt = "manual";
function en(e2) {
  return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} }), created() {
    this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
      var e3 = [];
      return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
        e3.push(this[t2]);
      }), e3;
    }, (e3, t2) => {
      if (this.loadtime === Zt)
        return;
      let n2 = false;
      const s2 = [];
      for (let o2 = 2; o2 < e3.length; o2++)
        e3[o2] !== t2[o2] && (s2.push(e3[o2]), n2 = true);
      e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
    });
  }, methods: { onMixinDatacomPropsChange(e3, t2) {
  }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
    this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((n3) => {
      this.mixinDatacomLoading = false;
      const { data: s2, count: o2 } = n3.result;
      this.getcount && (this.mixinDatacomPage.count = o2), this.mixinDatacomHasMore = s2.length < this.pageSize;
      const r2 = e3 ? s2.length ? s2[0] : void 0 : s2;
      this.mixinDatacomResData = r2, t2 && t2(r2);
    }).catch((e4) => {
      this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, n2 && n2(e4);
    }));
  }, mixinDatacomGet(t2 = {}) {
    let n2 = e2.database(this.spaceInfo);
    const s2 = t2.action || this.action;
    s2 && (n2 = n2.action(s2));
    const o2 = t2.collection || this.collection;
    n2 = Array.isArray(o2) ? n2.collection(...o2) : n2.collection(o2);
    const r2 = t2.where || this.where;
    r2 && Object.keys(r2).length && (n2 = n2.where(r2));
    const i2 = t2.field || this.field;
    i2 && (n2 = n2.field(i2));
    const a2 = t2.foreignKey || this.foreignKey;
    a2 && (n2 = n2.foreignKey(a2));
    const c2 = t2.groupby || this.groupby;
    c2 && (n2 = n2.groupBy(c2));
    const u2 = t2.groupField || this.groupField;
    u2 && (n2 = n2.groupField(u2));
    true === (void 0 !== t2.distinct ? t2.distinct : this.distinct) && (n2 = n2.distinct());
    const l2 = t2.orderby || this.orderby;
    l2 && (n2 = n2.orderBy(l2));
    const h2 = void 0 !== t2.pageCurrent ? t2.pageCurrent : this.mixinDatacomPage.current, d2 = void 0 !== t2.pageSize ? t2.pageSize : this.mixinDatacomPage.size, f2 = void 0 !== t2.getcount ? t2.getcount : this.getcount, g2 = void 0 !== t2.gettree ? t2.gettree : this.gettree, p2 = void 0 !== t2.gettreepath ? t2.gettreepath : this.gettreepath, m2 = { getCount: f2 }, y = { limitLevel: void 0 !== t2.limitlevel ? t2.limitlevel : this.limitlevel, startWith: void 0 !== t2.startwith ? t2.startwith : this.startwith };
    return g2 && (m2.getTree = y), p2 && (m2.getTreePath = y), n2 = n2.skip(d2 * (h2 - 1)).limit(d2).get(m2), n2;
  } } };
}
function tn(e2) {
  return function(t2, n2 = {}) {
    n2 = function(e3, t3 = {}) {
      return e3.customUI = t3.customUI || e3.customUI, Object.assign(e3.loadingOptions, t3.loadingOptions), Object.assign(e3.errorOptions, t3.errorOptions), e3;
    }({ customUI: false, loadingOptions: { title: "\u52A0\u8F7D\u4E2D...", mask: true }, errorOptions: { type: "modal", retry: false } }, n2);
    const { customUI: s2, loadingOptions: o2, errorOptions: r2 } = n2, i2 = !s2;
    return new Proxy({}, { get: (n3, s3) => async function n4(...c2) {
      let u2;
      i2 && index.showLoading({ title: o2.title, mask: o2.mask });
      try {
        u2 = await e2.callFunction({ name: t2, type: a, data: { method: s3, params: c2 } });
      } catch (e3) {
        u2 = { result: e3 };
      }
      const { errCode: l2, errMsg: h2, newToken: d2 } = u2.result || {};
      if (i2 && index.hideLoading(), d2 && d2.token && d2.tokenExpired && (st(d2), q(E, { ...d2 })), l2) {
        if (i2)
          if ("toast" === r2.type)
            index.showToast({ title: h2, icon: "none" });
          else {
            if ("modal" !== r2.type)
              throw new Error(`Invalid errorOptions.type: ${r2.type}`);
            {
              const { confirm: e4 } = await async function({ title: e5, content: t3, showCancel: n5, cancelText: s4, confirmText: o3 } = {}) {
                return new Promise((r3, i3) => {
                  index.showModal({ title: e5, content: t3, showCancel: n5, cancelText: s4, confirmText: o3, success(e6) {
                    r3(e6);
                  }, fail() {
                    r3({ confirm: false, cancel: true });
                  } });
                });
              }({ title: "\u63D0\u793A", content: h2, showCancel: r2.retry, cancelText: "\u53D6\u6D88", confirmText: r2.retry ? "\u91CD\u8BD5" : "\u786E\u5B9A" });
              if (r2.retry && e4)
                return n4(...c2);
            }
          }
        const e3 = new M({ code: l2, message: h2, requestId: u2.requestId });
        throw e3.detail = u2.result, q(O, { type: x, content: e3 }), e3;
      }
      return q(O, { type: x, content: u2.result }), u2.result;
    } });
  };
}
async function nn(e2, t2) {
  const n2 = `http://${e2}:${t2}/system/ping`;
  try {
    const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
      H.request({ ...s2, success(t4) {
        e4(t4);
      }, fail(e5) {
        t3(e5);
      } });
    }));
    return !(!e3.data || 0 !== e3.data.code);
  } catch (e3) {
    return false;
  }
  var s2;
}
function sn(e2) {
  if (e2.initUniCloudStatus && "rejected" !== e2.initUniCloudStatus)
    return;
  let t2 = Promise.resolve();
  var n2;
  n2 = 1, t2 = new Promise((e3, t3) => {
    setTimeout(() => {
      e3();
    }, n2);
  }), e2.isReady = false, e2.isDefault = false;
  const s2 = e2.auth();
  e2.initUniCloudStatus = "pending", e2.initUniCloud = t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously()).then(() => {
    if ("app" === g && "ios" === index.getSystemInfoSync().osName) {
      const { osName: e3, osVersion: t3 } = index.getSystemInfoSync();
      "ios" === e3 && function(e4) {
        if (!e4 || "string" != typeof e4)
          return 0;
        const t4 = e4.match(/^(\d+)./);
        return t4 && t4[1] ? parseInt(t4[1]) : 0;
      }(t3) >= 14 && console.warn("iOS 14\u53CA\u4EE5\u4E0A\u7248\u672C\u8FDE\u63A5uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u9700\u8981\u5141\u8BB8\u5BA2\u6237\u7AEF\u67E5\u627E\u5E76\u8FDE\u63A5\u5230\u672C\u5730\u7F51\u7EDC\u4E0A\u7684\u8BBE\u5907\uFF08\u4EC5\u5F00\u53D1\u6A21\u5F0F\u751F\u6548\uFF0C\u53D1\u884C\u6A21\u5F0F\u4F1A\u8FDE\u63A5uniCloud\u4E91\u7AEF\u670D\u52A1\uFF09");
    }
    if (e2.debugInfo) {
      const { address: t3, servePort: n3 } = e2.debugInfo;
      return async function(e3, t4) {
        let n4;
        for (let s3 = 0; s3 < e3.length; s3++) {
          const o2 = e3[s3];
          if (await nn(o2, t4)) {
            n4 = o2;
            break;
          }
        }
        return { address: n4, port: t4 };
      }(t3, n3);
    }
  }).then(({ address: t3, port: n3 } = {}) => {
    const s3 = console["app" === g ? "error" : "warn"];
    if (t3)
      e2.localAddress = t3, e2.localPort = n3;
    else if (e2.debugInfo) {
      let t4 = "";
      "remote" === e2.debugInfo.initialLaunchType ? (e2.debugInfo.forceRemote = true, t4 = "\u5F53\u524D\u5BA2\u6237\u7AEF\u548CHBuilderX\u4E0D\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\uFF08\u6216\u5176\u4ED6\u7F51\u7EDC\u539F\u56E0\u65E0\u6CD5\u8FDE\u63A5HBuilderX\uFF09\uFF0CuniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u4E0D\u5BF9\u5F53\u524D\u5BA2\u6237\u7AEF\u751F\u6548\u3002\n- \u5982\u679C\u4E0D\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u76F4\u63A5\u5FFD\u7565\u6B64\u4FE1\u606F\u3002\n- \u5982\u9700\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u5C06\u5BA2\u6237\u7AEF\u4E0E\u4E3B\u673A\u8FDE\u63A5\u5230\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u5E76\u91CD\u65B0\u8FD0\u884C\u5230\u5BA2\u6237\u7AEF\u3002\n- \u5982\u679C\u5728HBuilderX\u5F00\u542F\u7684\u72B6\u6001\u4E0B\u5207\u6362\u8FC7\u7F51\u7EDC\u73AF\u5883\uFF0C\u8BF7\u91CD\u542FHBuilderX\u540E\u518D\u8BD5\n- \u68C0\u67E5\u7CFB\u7EDF\u9632\u706B\u5899\u662F\u5426\u62E6\u622A\u4E86HBuilderX\u81EA\u5E26\u7684nodejs") : t4 = "\u65E0\u6CD5\u8FDE\u63A5uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u5F53\u524D\u5BA2\u6237\u7AEF\u662F\u5426\u4E0E\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u3002\n- \u5982\u9700\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u5C06\u5BA2\u6237\u7AEF\u4E0E\u4E3B\u673A\u8FDE\u63A5\u5230\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u5E76\u91CD\u65B0\u8FD0\u884C\u5230\u5BA2\u6237\u7AEF\u3002\n- \u5982\u679C\u5728HBuilderX\u5F00\u542F\u7684\u72B6\u6001\u4E0B\u5207\u6362\u8FC7\u7F51\u7EDC\u73AF\u5883\uFF0C\u8BF7\u91CD\u542FHBuilderX\u540E\u518D\u8BD5\n- \u68C0\u67E5\u7CFB\u7EDF\u9632\u706B\u5899\u662F\u5426\u62E6\u622A\u4E86HBuilderX\u81EA\u5E26\u7684nodejs", "web" === g && (t4 += "\n- \u90E8\u5206\u6D4F\u89C8\u5668\u5F00\u542F\u8282\u6D41\u6A21\u5F0F\u4E4B\u540E\u8BBF\u95EE\u672C\u5730\u5730\u5740\u53D7\u9650\uFF0C\u8BF7\u68C0\u67E5\u662F\u5426\u542F\u7528\u4E86\u8282\u6D41\u6A21\u5F0F"), 0 === g.indexOf("mp-") && (t4 += "\n- \u5C0F\u7A0B\u5E8F\u4E2D\u5982\u4F55\u4F7F\u7528uniCloud\uFF0C\u8BF7\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/publish.html#useinmp"), s3(t4);
    }
  }).then(() => {
    ot(), e2.isReady = true, e2.initUniCloudStatus = "fulfilled";
  }).catch((t3) => {
    console.error(t3), e2.initUniCloudStatus = "rejected";
  });
}
let on = new class {
  init(e2) {
    let t2 = {};
    const n2 = "web" === g && navigator.userAgent.indexOf("HBuilderX") > 0 || "app" === g;
    switch (e2.provider) {
      case "tcb":
      case "tencent":
        t2 = et.init(Object.assign(e2, { debugLog: n2 }));
        break;
      case "aliyun":
        t2 = J.init(Object.assign(e2, { debugLog: n2 }));
        break;
      case "private":
        t2 = it.init(Object.assign(e2, { debugLog: n2 }));
        break;
      default:
        throw new Error("\u672A\u63D0\u4F9B\u6B63\u786E\u7684provider\u53C2\u6570");
    }
    const s2 = p;
    s2 && !s2.code && (t2.debugInfo = s2), sn(t2), t2.reInit = function() {
      sn(this);
    }, gt(t2), function(e3) {
      const t3 = e3.uploadFile;
      e3.uploadFile = function(e4) {
        return t3.call(this, e4);
      };
    }(t2), It(t2), function(e3) {
      e3.getCurrentUserInfo = Xt, e3.chooseAndUploadFile = Qt.initChooseAndUploadFile(e3), Object.assign(e3, { get mixinDatacom() {
        return en(e3);
      } }), e3.importObject = tn(e3);
    }(t2);
    return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
      if (!t2[e3])
        return;
      const n3 = t2[e3];
      t2[e3] = function() {
        return t2.reInit(), n3.apply(t2, Array.from(arguments));
      }, t2[e3] = F(t2[e3], e3).bind(t2);
    }), t2.init = this.init, t2;
  }
}();
(() => {
  {
    const e2 = m;
    let t2 = {};
    if (1 === e2.length)
      t2 = e2[0], on = on.init(t2), on.isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e2 && e2.length > 0 ? "\u5E94\u7528\u6709\u591A\u4E2A\u670D\u52A1\u7A7A\u95F4\uFF0C\u8BF7\u901A\u8FC7uniCloud.init\u65B9\u6CD5\u6307\u5B9A\u8981\u4F7F\u7528\u7684\u670D\u52A1\u7A7A\u95F4" : "\u5E94\u7528\u672A\u5173\u8054\u670D\u52A1\u7A7A\u95F4\uFF0C\u8BF7\u5728uniCloud\u76EE\u5F55\u53F3\u952E\u5173\u8054\u670D\u52A1\u7A7A\u95F4", t3.forEach((e3) => {
        on[e3] = function() {
          return console.error(n2), Promise.reject(new M({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    Object.assign(on, { get mixinDatacom() {
      return en(on);
    } }), zt(on), on.addInterceptor = v, on.removeInterceptor = A, "web" === g && (window.uniCloud = on);
  }
})();
var rn = on;
var pattern = {
  email: /^\S+?@\S+?\.\S+?$/,
  idcard: /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
  url: new RegExp(
    "^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$",
    "i"
  )
};
const FORMAT_MAPPING = {
  "int": "integer",
  "bool": "boolean",
  "double": "number",
  "long": "number",
  "password": "string"
};
function formatMessage(args, resources = "") {
  var defaultMessage = ["label"];
  defaultMessage.forEach((item) => {
    if (args[item] === void 0) {
      args[item] = "";
    }
  });
  let str = resources;
  for (let key2 in args) {
    let reg = new RegExp("{" + key2 + "}");
    str = str.replace(reg, args[key2]);
  }
  return str;
}
function isEmptyValue(value, type) {
  if (value === void 0 || value === null) {
    return true;
  }
  if (typeof value === "string" && !value) {
    return true;
  }
  if (Array.isArray(value) && !value.length) {
    return true;
  }
  if (type === "object" && !Object.keys(value).length) {
    return true;
  }
  return false;
}
const types = {
  integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  string(value) {
    return typeof value === "string";
  },
  number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === "number";
  },
  "boolean": function(value) {
    return typeof value === "boolean";
  },
  "float": function(value) {
    return types.number(value) && !types.integer(value);
  },
  array(value) {
    return Array.isArray(value);
  },
  object(value) {
    return typeof value === "object" && !types.array(value);
  },
  date(value) {
    return value instanceof Date;
  },
  timestamp(value) {
    if (!this.integer(value) || Math.abs(value).toString().length > 16) {
      return false;
    }
    return true;
  },
  file(value) {
    return typeof value.url === "string";
  },
  email(value) {
    return typeof value === "string" && !!value.match(pattern.email) && value.length < 255;
  },
  url(value) {
    return typeof value === "string" && !!value.match(pattern.url);
  },
  pattern(reg, value) {
    try {
      return new RegExp(reg).test(value);
    } catch (e2) {
      return false;
    }
  },
  method(value) {
    return typeof value === "function";
  },
  idcard(value) {
    return typeof value === "string" && !!value.match(pattern.idcard);
  },
  "url-https"(value) {
    return this.url(value) && value.startsWith("https://");
  },
  "url-scheme"(value) {
    return value.startsWith("://");
  },
  "url-web"(value) {
    return false;
  }
};
class RuleValidator {
  constructor(message) {
    this._message = message;
  }
  async validateRule(fieldKey, fieldValue, value, data, allData) {
    var result = null;
    let rules = fieldValue.rules;
    let hasRequired = rules.findIndex((item) => {
      return item.required;
    });
    if (hasRequired < 0) {
      if (value === null || value === void 0) {
        return result;
      }
      if (typeof value === "string" && !value.length) {
        return result;
      }
    }
    var message = this._message;
    if (rules === void 0) {
      return message["default"];
    }
    for (var i2 = 0; i2 < rules.length; i2++) {
      let rule = rules[i2];
      let vt2 = this._getValidateType(rule);
      Object.assign(rule, {
        label: fieldValue.label || `["${fieldKey}"]`
      });
      if (RuleValidatorHelper[vt2]) {
        result = RuleValidatorHelper[vt2](rule, value, message);
        if (result != null) {
          break;
        }
      }
      if (rule.validateExpr) {
        let now = Date.now();
        let resultExpr = rule.validateExpr(value, allData, now);
        if (resultExpr === false) {
          result = this._getMessage(rule, rule.errorMessage || this._message["default"]);
          break;
        }
      }
      if (rule.validateFunction) {
        result = await this.validateFunction(rule, value, data, allData, vt2);
        if (result !== null) {
          break;
        }
      }
    }
    if (result !== null) {
      result = message.TAG + result;
    }
    return result;
  }
  async validateFunction(rule, value, data, allData, vt2) {
    let result = null;
    try {
      let callbackMessage = null;
      const res = await rule.validateFunction(rule, value, allData || data, (message) => {
        callbackMessage = message;
      });
      if (callbackMessage || typeof res === "string" && res || res === false) {
        result = this._getMessage(rule, callbackMessage || res, vt2);
      }
    } catch (e2) {
      result = this._getMessage(rule, e2.message, vt2);
    }
    return result;
  }
  _getMessage(rule, message, vt2) {
    return formatMessage(rule, message || rule.errorMessage || this._message[vt2] || message["default"]);
  }
  _getValidateType(rule) {
    var result = "";
    if (rule.required) {
      result = "required";
    } else if (rule.format) {
      result = "format";
    } else if (rule.arrayType) {
      result = "arrayTypeFormat";
    } else if (rule.range) {
      result = "range";
    } else if (rule.maximum !== void 0 || rule.minimum !== void 0) {
      result = "rangeNumber";
    } else if (rule.maxLength !== void 0 || rule.minLength !== void 0) {
      result = "rangeLength";
    } else if (rule.pattern) {
      result = "pattern";
    } else if (rule.validateFunction) {
      result = "validateFunction";
    }
    return result;
  }
}
const RuleValidatorHelper = {
  required(rule, value, message) {
    if (rule.required && isEmptyValue(value, rule.format || typeof value)) {
      return formatMessage(rule, rule.errorMessage || message.required);
    }
    return null;
  },
  range(rule, value, message) {
    const {
      range,
      errorMessage
    } = rule;
    let list = new Array(range.length);
    for (let i2 = 0; i2 < range.length; i2++) {
      const item = range[i2];
      if (types.object(item) && item.value !== void 0) {
        list[i2] = item.value;
      } else {
        list[i2] = item;
      }
    }
    let result = false;
    if (Array.isArray(value)) {
      result = new Set(value.concat(list)).size === list.length;
    } else {
      if (list.indexOf(value) > -1) {
        result = true;
      }
    }
    if (!result) {
      return formatMessage(rule, errorMessage || message["enum"]);
    }
    return null;
  },
  rangeNumber(rule, value, message) {
    if (!types.number(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }
    let {
      minimum,
      maximum,
      exclusiveMinimum,
      exclusiveMaximum
    } = rule;
    let min = exclusiveMinimum ? value <= minimum : value < minimum;
    let max = exclusiveMaximum ? value >= maximum : value > maximum;
    if (minimum !== void 0 && min) {
      return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMinimum ? "exclusiveMinimum" : "minimum"]);
    } else if (maximum !== void 0 && max) {
      return formatMessage(rule, rule.errorMessage || message["number"][exclusiveMaximum ? "exclusiveMaximum" : "maximum"]);
    } else if (minimum !== void 0 && maximum !== void 0 && (min || max)) {
      return formatMessage(rule, rule.errorMessage || message["number"].range);
    }
    return null;
  },
  rangeLength(rule, value, message) {
    if (!types.string(value) && !types.array(value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }
    let min = rule.minLength;
    let max = rule.maxLength;
    let val = value.length;
    if (min !== void 0 && val < min) {
      return formatMessage(rule, rule.errorMessage || message["length"].minLength);
    } else if (max !== void 0 && val > max) {
      return formatMessage(rule, rule.errorMessage || message["length"].maxLength);
    } else if (min !== void 0 && max !== void 0 && (val < min || val > max)) {
      return formatMessage(rule, rule.errorMessage || message["length"].range);
    }
    return null;
  },
  pattern(rule, value, message) {
    if (!types["pattern"](rule.pattern, value)) {
      return formatMessage(rule, rule.errorMessage || message.pattern.mismatch);
    }
    return null;
  },
  format(rule, value, message) {
    var customTypes = Object.keys(types);
    var format = FORMAT_MAPPING[rule.format] ? FORMAT_MAPPING[rule.format] : rule.format || rule.arrayType;
    if (customTypes.indexOf(format) > -1) {
      if (!types[format](value)) {
        return formatMessage(rule, rule.errorMessage || message.typeError);
      }
    }
    return null;
  },
  arrayTypeFormat(rule, value, message) {
    if (!Array.isArray(value)) {
      return formatMessage(rule, rule.errorMessage || message.typeError);
    }
    for (let i2 = 0; i2 < value.length; i2++) {
      const element = value[i2];
      let formatResult = this.format(rule, element, message);
      if (formatResult !== null) {
        return formatResult;
      }
    }
    return null;
  }
};
class SchemaValidator extends RuleValidator {
  constructor(schema, options2) {
    super(SchemaValidator.message);
    this._schema = schema;
    this._options = options2 || null;
  }
  updateSchema(schema) {
    this._schema = schema;
  }
  async validate(data, allData) {
    let result = this._checkFieldInSchema(data);
    if (!result) {
      result = await this.invokeValidate(data, false, allData);
    }
    return result.length ? result[0] : null;
  }
  async validateAll(data, allData) {
    let result = this._checkFieldInSchema(data);
    if (!result) {
      result = await this.invokeValidate(data, true, allData);
    }
    return result;
  }
  async validateUpdate(data, allData) {
    let result = this._checkFieldInSchema(data);
    if (!result) {
      result = await this.invokeValidateUpdate(data, false, allData);
    }
    return result.length ? result[0] : null;
  }
  async invokeValidate(data, all, allData) {
    let result = [];
    let schema = this._schema;
    for (let key2 in schema) {
      let value = schema[key2];
      let errorMessage = await this.validateRule(key2, value, data[key2], data, allData);
      if (errorMessage != null) {
        result.push({
          key: key2,
          errorMessage
        });
        if (!all)
          break;
      }
    }
    return result;
  }
  async invokeValidateUpdate(data, all, allData) {
    let result = [];
    for (let key2 in data) {
      let errorMessage = await this.validateRule(key2, this._schema[key2], data[key2], data, allData);
      if (errorMessage != null) {
        result.push({
          key: key2,
          errorMessage
        });
        if (!all)
          break;
      }
    }
    return result;
  }
  _checkFieldInSchema(data) {
    var keys = Object.keys(data);
    var keys2 = Object.keys(this._schema);
    if (new Set(keys.concat(keys2)).size === keys2.length) {
      return "";
    }
    var noExistFields = keys.filter((key2) => {
      return keys2.indexOf(key2) < 0;
    });
    var errorMessage = formatMessage({
      field: JSON.stringify(noExistFields)
    }, SchemaValidator.message.TAG + SchemaValidator.message["defaultInvalid"]);
    return [{
      key: "invalid",
      errorMessage
    }];
  }
}
function Message() {
  return {
    TAG: "",
    default: "\u9A8C\u8BC1\u9519\u8BEF",
    defaultInvalid: "\u63D0\u4EA4\u7684\u5B57\u6BB5{field}\u5728\u6570\u636E\u5E93\u4E2D\u5E76\u4E0D\u5B58\u5728",
    validateFunction: "\u9A8C\u8BC1\u65E0\u6548",
    required: "{label}\u5FC5\u586B",
    "enum": "{label}\u8D85\u51FA\u8303\u56F4",
    timestamp: "{label}\u683C\u5F0F\u65E0\u6548",
    whitespace: "{label}\u4E0D\u80FD\u4E3A\u7A7A",
    typeError: "{label}\u7C7B\u578B\u65E0\u6548",
    date: {
      format: "{label}\u65E5\u671F{value}\u683C\u5F0F\u65E0\u6548",
      parse: "{label}\u65E5\u671F\u65E0\u6CD5\u89E3\u6790,{value}\u65E0\u6548",
      invalid: "{label}\u65E5\u671F{value}\u65E0\u6548"
    },
    length: {
      minLength: "{label}\u957F\u5EA6\u4E0D\u80FD\u5C11\u4E8E{minLength}",
      maxLength: "{label}\u957F\u5EA6\u4E0D\u80FD\u8D85\u8FC7{maxLength}",
      range: "{label}\u5FC5\u987B\u4ECB\u4E8E{minLength}\u548C{maxLength}\u4E4B\u95F4"
    },
    number: {
      minimum: "{label}\u4E0D\u80FD\u5C0F\u4E8E{minimum}",
      maximum: "{label}\u4E0D\u80FD\u5927\u4E8E{maximum}",
      exclusiveMinimum: "{label}\u4E0D\u80FD\u5C0F\u4E8E\u7B49\u4E8E{minimum}",
      exclusiveMaximum: "{label}\u4E0D\u80FD\u5927\u4E8E\u7B49\u4E8E{maximum}",
      range: "{label}\u5FC5\u987B\u4ECB\u4E8E{minimum}and{maximum}\u4E4B\u95F4"
    },
    pattern: {
      mismatch: "{label}\u683C\u5F0F\u4E0D\u5339\u914D"
    }
  };
}
SchemaValidator.message = new Message();
const deepCopy = (val) => {
  return JSON.parse(JSON.stringify(val));
};
const typeFilter = (format) => {
  return format === "int" || format === "double" || format === "number" || format === "timestamp";
};
const getValue = (key2, value, rules) => {
  const isRuleNumType = rules.find((val) => val.format && typeFilter(val.format));
  const isRuleBoolType = rules.find((val) => val.format && val.format === "boolean" || val.format === "bool");
  if (!!isRuleNumType) {
    if (!value && value !== 0) {
      value = null;
    } else {
      value = isNumber(Number(value)) ? Number(value) : value;
    }
  }
  if (!!isRuleBoolType) {
    value = isBoolean(value) ? value : false;
  }
  return value;
};
const setDataValue = (field, formdata, value) => {
  formdata[field] = value;
  return value || "";
};
const getDataValue = (field, data) => {
  return objGet(data, field);
};
const realName = (name, data = {}) => {
  const base_name = _basePath(name);
  if (typeof base_name === "object" && Array.isArray(base_name) && base_name.length > 1) {
    const realname = base_name.reduce((a2, b2) => a2 += `#${b2}`, "_formdata_");
    return realname;
  }
  return base_name[0] || name;
};
const isRealName = (name) => {
  const reg = /^_formdata_#*/;
  return reg.test(name);
};
const rawData = (object = {}, name) => {
  let newData = JSON.parse(JSON.stringify(object));
  let formData = {};
  for (let i2 in newData) {
    let path = name2arr(i2);
    objSet(formData, path, newData[i2]);
  }
  return formData;
};
const name2arr = (name) => {
  let field = name.replace("_formdata_#", "");
  field = field.split("#").map((v2) => isNumber(v2) ? Number(v2) : v2);
  return field;
};
const objSet = (object, path, value) => {
  if (typeof object !== "object")
    return object;
  _basePath(path).reduce((o2, k2, i2, _2) => {
    if (i2 === _2.length - 1) {
      o2[k2] = value;
      return null;
    } else if (k2 in o2) {
      return o2[k2];
    } else {
      o2[k2] = /^[0-9]{1,}$/.test(_2[i2 + 1]) ? [] : {};
      return o2[k2];
    }
  }, object);
  return object;
};
function _basePath(path) {
  if (Array.isArray(path))
    return path;
  return path.replace(/\[/g, ".").replace(/\]/g, "").split(".");
}
const objGet = (object, path, defaultVal = "undefined") => {
  let newPath = _basePath(path);
  let val = newPath.reduce((o2, k2) => {
    return (o2 || {})[k2];
  }, object);
  return !val || val !== void 0 ? val : defaultVal;
};
const isNumber = (num) => {
  return !isNaN(Number(num));
};
const isBoolean = (bool) => {
  return typeof bool === "boolean";
};
const isRequiredField = (rules) => {
  let isNoField = false;
  for (let i2 = 0; i2 < rules.length; i2++) {
    const ruleData = rules[i2];
    if (ruleData.required) {
      isNoField = true;
      break;
    }
  }
  return isNoField;
};
const isEqual = (a2, b2) => {
  if (a2 === b2) {
    return a2 !== 0 || 1 / a2 === 1 / b2;
  }
  if (a2 == null || b2 == null) {
    return a2 === b2;
  }
  var classNameA = toString.call(a2), classNameB = toString.call(b2);
  if (classNameA !== classNameB) {
    return false;
  }
  switch (classNameA) {
    case "[object RegExp]":
    case "[object String]":
      return "" + a2 === "" + b2;
    case "[object Number]":
      if (+a2 !== +a2) {
        return +b2 !== +b2;
      }
      return +a2 === 0 ? 1 / +a2 === 1 / b2 : +a2 === +b2;
    case "[object Date]":
    case "[object Boolean]":
      return +a2 === +b2;
  }
  if (classNameA == "[object Object]") {
    var propsA = Object.getOwnPropertyNames(a2), propsB = Object.getOwnPropertyNames(b2);
    if (propsA.length != propsB.length) {
      return false;
    }
    for (var i2 = 0; i2 < propsA.length; i2++) {
      var propName = propsA[i2];
      if (a2[propName] !== b2[propName]) {
        return false;
      }
    }
    return true;
  }
  if (classNameA == "[object Array]") {
    if (a2.toString() == b2.toString()) {
      return true;
    }
    return false;
  }
};
var icons = {
  "id": "2852637",
  "name": "uniui\u56FE\u6807\u5E93",
  "font_family": "uniicons",
  "css_prefix_text": "uniui-",
  "description": "",
  "glyphs": [
    {
      "icon_id": "25027049",
      "name": "yanse",
      "font_class": "color",
      "unicode": "e6cf",
      "unicode_decimal": 59087
    },
    {
      "icon_id": "25027048",
      "name": "wallet",
      "font_class": "wallet",
      "unicode": "e6b1",
      "unicode_decimal": 59057
    },
    {
      "icon_id": "25015720",
      "name": "settings-filled",
      "font_class": "settings-filled",
      "unicode": "e6ce",
      "unicode_decimal": 59086
    },
    {
      "icon_id": "25015434",
      "name": "shimingrenzheng-filled",
      "font_class": "auth-filled",
      "unicode": "e6cc",
      "unicode_decimal": 59084
    },
    {
      "icon_id": "24934246",
      "name": "shop-filled",
      "font_class": "shop-filled",
      "unicode": "e6cd",
      "unicode_decimal": 59085
    },
    {
      "icon_id": "24934159",
      "name": "staff-filled-01",
      "font_class": "staff-filled",
      "unicode": "e6cb",
      "unicode_decimal": 59083
    },
    {
      "icon_id": "24932461",
      "name": "VIP-filled",
      "font_class": "vip-filled",
      "unicode": "e6c6",
      "unicode_decimal": 59078
    },
    {
      "icon_id": "24932462",
      "name": "plus_circle_fill",
      "font_class": "plus-filled",
      "unicode": "e6c7",
      "unicode_decimal": 59079
    },
    {
      "icon_id": "24932463",
      "name": "folder_add-filled",
      "font_class": "folder-add-filled",
      "unicode": "e6c8",
      "unicode_decimal": 59080
    },
    {
      "icon_id": "24932464",
      "name": "yanse-filled",
      "font_class": "color-filled",
      "unicode": "e6c9",
      "unicode_decimal": 59081
    },
    {
      "icon_id": "24932465",
      "name": "tune-filled",
      "font_class": "tune-filled",
      "unicode": "e6ca",
      "unicode_decimal": 59082
    },
    {
      "icon_id": "24932455",
      "name": "a-rilidaka-filled",
      "font_class": "calendar-filled",
      "unicode": "e6c0",
      "unicode_decimal": 59072
    },
    {
      "icon_id": "24932456",
      "name": "notification-filled",
      "font_class": "notification-filled",
      "unicode": "e6c1",
      "unicode_decimal": 59073
    },
    {
      "icon_id": "24932457",
      "name": "wallet-filled",
      "font_class": "wallet-filled",
      "unicode": "e6c2",
      "unicode_decimal": 59074
    },
    {
      "icon_id": "24932458",
      "name": "paihangbang-filled",
      "font_class": "medal-filled",
      "unicode": "e6c3",
      "unicode_decimal": 59075
    },
    {
      "icon_id": "24932459",
      "name": "gift-filled",
      "font_class": "gift-filled",
      "unicode": "e6c4",
      "unicode_decimal": 59076
    },
    {
      "icon_id": "24932460",
      "name": "fire-filled",
      "font_class": "fire-filled",
      "unicode": "e6c5",
      "unicode_decimal": 59077
    },
    {
      "icon_id": "24928001",
      "name": "refreshempty",
      "font_class": "refreshempty",
      "unicode": "e6bf",
      "unicode_decimal": 59071
    },
    {
      "icon_id": "24926853",
      "name": "location-ellipse",
      "font_class": "location-filled",
      "unicode": "e6af",
      "unicode_decimal": 59055
    },
    {
      "icon_id": "24926735",
      "name": "person-filled",
      "font_class": "person-filled",
      "unicode": "e69d",
      "unicode_decimal": 59037
    },
    {
      "icon_id": "24926703",
      "name": "personadd-filled",
      "font_class": "personadd-filled",
      "unicode": "e698",
      "unicode_decimal": 59032
    },
    {
      "icon_id": "24923351",
      "name": "back",
      "font_class": "back",
      "unicode": "e6b9",
      "unicode_decimal": 59065
    },
    {
      "icon_id": "24923352",
      "name": "forward",
      "font_class": "forward",
      "unicode": "e6ba",
      "unicode_decimal": 59066
    },
    {
      "icon_id": "24923353",
      "name": "arrowthinright",
      "font_class": "arrow-right",
      "unicode": "e6bb",
      "unicode_decimal": 59067
    },
    {
      "icon_id": "24923353",
      "name": "arrowthinright",
      "font_class": "arrowthinright",
      "unicode": "e6bb",
      "unicode_decimal": 59067
    },
    {
      "icon_id": "24923354",
      "name": "arrowthinleft",
      "font_class": "arrow-left",
      "unicode": "e6bc",
      "unicode_decimal": 59068
    },
    {
      "icon_id": "24923354",
      "name": "arrowthinleft",
      "font_class": "arrowthinleft",
      "unicode": "e6bc",
      "unicode_decimal": 59068
    },
    {
      "icon_id": "24923355",
      "name": "arrowthinup",
      "font_class": "arrow-up",
      "unicode": "e6bd",
      "unicode_decimal": 59069
    },
    {
      "icon_id": "24923355",
      "name": "arrowthinup",
      "font_class": "arrowthinup",
      "unicode": "e6bd",
      "unicode_decimal": 59069
    },
    {
      "icon_id": "24923356",
      "name": "arrowthindown",
      "font_class": "arrow-down",
      "unicode": "e6be",
      "unicode_decimal": 59070
    },
    {
      "icon_id": "24923356",
      "name": "arrowthindown",
      "font_class": "arrowthindown",
      "unicode": "e6be",
      "unicode_decimal": 59070
    },
    {
      "icon_id": "24923349",
      "name": "arrowdown",
      "font_class": "bottom",
      "unicode": "e6b8",
      "unicode_decimal": 59064
    },
    {
      "icon_id": "24923349",
      "name": "arrowdown",
      "font_class": "arrowdown",
      "unicode": "e6b8",
      "unicode_decimal": 59064
    },
    {
      "icon_id": "24923346",
      "name": "arrowright",
      "font_class": "right",
      "unicode": "e6b5",
      "unicode_decimal": 59061
    },
    {
      "icon_id": "24923346",
      "name": "arrowright",
      "font_class": "arrowright",
      "unicode": "e6b5",
      "unicode_decimal": 59061
    },
    {
      "icon_id": "24923347",
      "name": "arrowup",
      "font_class": "top",
      "unicode": "e6b6",
      "unicode_decimal": 59062
    },
    {
      "icon_id": "24923347",
      "name": "arrowup",
      "font_class": "arrowup",
      "unicode": "e6b6",
      "unicode_decimal": 59062
    },
    {
      "icon_id": "24923348",
      "name": "arrowleft",
      "font_class": "left",
      "unicode": "e6b7",
      "unicode_decimal": 59063
    },
    {
      "icon_id": "24923348",
      "name": "arrowleft",
      "font_class": "arrowleft",
      "unicode": "e6b7",
      "unicode_decimal": 59063
    },
    {
      "icon_id": "24923334",
      "name": "eye",
      "font_class": "eye",
      "unicode": "e651",
      "unicode_decimal": 58961
    },
    {
      "icon_id": "24923335",
      "name": "eye-filled",
      "font_class": "eye-filled",
      "unicode": "e66a",
      "unicode_decimal": 58986
    },
    {
      "icon_id": "24923336",
      "name": "eye-slash",
      "font_class": "eye-slash",
      "unicode": "e6b3",
      "unicode_decimal": 59059
    },
    {
      "icon_id": "24923337",
      "name": "eye-slash-filled",
      "font_class": "eye-slash-filled",
      "unicode": "e6b4",
      "unicode_decimal": 59060
    },
    {
      "icon_id": "24923305",
      "name": "info-filled",
      "font_class": "info-filled",
      "unicode": "e649",
      "unicode_decimal": 58953
    },
    {
      "icon_id": "24923299",
      "name": "reload-01",
      "font_class": "reload",
      "unicode": "e6b2",
      "unicode_decimal": 59058
    },
    {
      "icon_id": "24923195",
      "name": "mic_slash_fill",
      "font_class": "micoff-filled",
      "unicode": "e6b0",
      "unicode_decimal": 59056
    },
    {
      "icon_id": "24923165",
      "name": "map-pin-ellipse",
      "font_class": "map-pin-ellipse",
      "unicode": "e6ac",
      "unicode_decimal": 59052
    },
    {
      "icon_id": "24923166",
      "name": "map-pin",
      "font_class": "map-pin",
      "unicode": "e6ad",
      "unicode_decimal": 59053
    },
    {
      "icon_id": "24923167",
      "name": "location",
      "font_class": "location",
      "unicode": "e6ae",
      "unicode_decimal": 59054
    },
    {
      "icon_id": "24923064",
      "name": "starhalf",
      "font_class": "starhalf",
      "unicode": "e683",
      "unicode_decimal": 59011
    },
    {
      "icon_id": "24923065",
      "name": "star",
      "font_class": "star",
      "unicode": "e688",
      "unicode_decimal": 59016
    },
    {
      "icon_id": "24923066",
      "name": "star-filled",
      "font_class": "star-filled",
      "unicode": "e68f",
      "unicode_decimal": 59023
    },
    {
      "icon_id": "24899646",
      "name": "a-rilidaka",
      "font_class": "calendar",
      "unicode": "e6a0",
      "unicode_decimal": 59040
    },
    {
      "icon_id": "24899647",
      "name": "fire",
      "font_class": "fire",
      "unicode": "e6a1",
      "unicode_decimal": 59041
    },
    {
      "icon_id": "24899648",
      "name": "paihangbang",
      "font_class": "medal",
      "unicode": "e6a2",
      "unicode_decimal": 59042
    },
    {
      "icon_id": "24899649",
      "name": "font",
      "font_class": "font",
      "unicode": "e6a3",
      "unicode_decimal": 59043
    },
    {
      "icon_id": "24899650",
      "name": "gift",
      "font_class": "gift",
      "unicode": "e6a4",
      "unicode_decimal": 59044
    },
    {
      "icon_id": "24899651",
      "name": "link",
      "font_class": "link",
      "unicode": "e6a5",
      "unicode_decimal": 59045
    },
    {
      "icon_id": "24899652",
      "name": "notification",
      "font_class": "notification",
      "unicode": "e6a6",
      "unicode_decimal": 59046
    },
    {
      "icon_id": "24899653",
      "name": "staff",
      "font_class": "staff",
      "unicode": "e6a7",
      "unicode_decimal": 59047
    },
    {
      "icon_id": "24899654",
      "name": "VIP",
      "font_class": "vip",
      "unicode": "e6a8",
      "unicode_decimal": 59048
    },
    {
      "icon_id": "24899655",
      "name": "folder_add",
      "font_class": "folder-add",
      "unicode": "e6a9",
      "unicode_decimal": 59049
    },
    {
      "icon_id": "24899656",
      "name": "tune",
      "font_class": "tune",
      "unicode": "e6aa",
      "unicode_decimal": 59050
    },
    {
      "icon_id": "24899657",
      "name": "shimingrenzheng",
      "font_class": "auth",
      "unicode": "e6ab",
      "unicode_decimal": 59051
    },
    {
      "icon_id": "24899565",
      "name": "person",
      "font_class": "person",
      "unicode": "e699",
      "unicode_decimal": 59033
    },
    {
      "icon_id": "24899566",
      "name": "email-filled",
      "font_class": "email-filled",
      "unicode": "e69a",
      "unicode_decimal": 59034
    },
    {
      "icon_id": "24899567",
      "name": "phone-filled",
      "font_class": "phone-filled",
      "unicode": "e69b",
      "unicode_decimal": 59035
    },
    {
      "icon_id": "24899568",
      "name": "phone",
      "font_class": "phone",
      "unicode": "e69c",
      "unicode_decimal": 59036
    },
    {
      "icon_id": "24899570",
      "name": "email",
      "font_class": "email",
      "unicode": "e69e",
      "unicode_decimal": 59038
    },
    {
      "icon_id": "24899571",
      "name": "personadd",
      "font_class": "personadd",
      "unicode": "e69f",
      "unicode_decimal": 59039
    },
    {
      "icon_id": "24899558",
      "name": "chatboxes-filled",
      "font_class": "chatboxes-filled",
      "unicode": "e692",
      "unicode_decimal": 59026
    },
    {
      "icon_id": "24899559",
      "name": "contact",
      "font_class": "contact",
      "unicode": "e693",
      "unicode_decimal": 59027
    },
    {
      "icon_id": "24899560",
      "name": "chatbubble-filled",
      "font_class": "chatbubble-filled",
      "unicode": "e694",
      "unicode_decimal": 59028
    },
    {
      "icon_id": "24899561",
      "name": "contact-filled",
      "font_class": "contact-filled",
      "unicode": "e695",
      "unicode_decimal": 59029
    },
    {
      "icon_id": "24899562",
      "name": "chatboxes",
      "font_class": "chatboxes",
      "unicode": "e696",
      "unicode_decimal": 59030
    },
    {
      "icon_id": "24899563",
      "name": "chatbubble",
      "font_class": "chatbubble",
      "unicode": "e697",
      "unicode_decimal": 59031
    },
    {
      "icon_id": "24881290",
      "name": "upload-filled",
      "font_class": "upload-filled",
      "unicode": "e68e",
      "unicode_decimal": 59022
    },
    {
      "icon_id": "24881292",
      "name": "upload",
      "font_class": "upload",
      "unicode": "e690",
      "unicode_decimal": 59024
    },
    {
      "icon_id": "24881293",
      "name": "weixin",
      "font_class": "weixin",
      "unicode": "e691",
      "unicode_decimal": 59025
    },
    {
      "icon_id": "24881274",
      "name": "compose",
      "font_class": "compose",
      "unicode": "e67f",
      "unicode_decimal": 59007
    },
    {
      "icon_id": "24881275",
      "name": "qq",
      "font_class": "qq",
      "unicode": "e680",
      "unicode_decimal": 59008
    },
    {
      "icon_id": "24881276",
      "name": "download-filled",
      "font_class": "download-filled",
      "unicode": "e681",
      "unicode_decimal": 59009
    },
    {
      "icon_id": "24881277",
      "name": "pengyouquan",
      "font_class": "pyq",
      "unicode": "e682",
      "unicode_decimal": 59010
    },
    {
      "icon_id": "24881279",
      "name": "sound",
      "font_class": "sound",
      "unicode": "e684",
      "unicode_decimal": 59012
    },
    {
      "icon_id": "24881280",
      "name": "trash-filled",
      "font_class": "trash-filled",
      "unicode": "e685",
      "unicode_decimal": 59013
    },
    {
      "icon_id": "24881281",
      "name": "sound-filled",
      "font_class": "sound-filled",
      "unicode": "e686",
      "unicode_decimal": 59014
    },
    {
      "icon_id": "24881282",
      "name": "trash",
      "font_class": "trash",
      "unicode": "e687",
      "unicode_decimal": 59015
    },
    {
      "icon_id": "24881284",
      "name": "videocam-filled",
      "font_class": "videocam-filled",
      "unicode": "e689",
      "unicode_decimal": 59017
    },
    {
      "icon_id": "24881285",
      "name": "spinner-cycle",
      "font_class": "spinner-cycle",
      "unicode": "e68a",
      "unicode_decimal": 59018
    },
    {
      "icon_id": "24881286",
      "name": "weibo",
      "font_class": "weibo",
      "unicode": "e68b",
      "unicode_decimal": 59019
    },
    {
      "icon_id": "24881288",
      "name": "videocam",
      "font_class": "videocam",
      "unicode": "e68c",
      "unicode_decimal": 59020
    },
    {
      "icon_id": "24881289",
      "name": "download",
      "font_class": "download",
      "unicode": "e68d",
      "unicode_decimal": 59021
    },
    {
      "icon_id": "24879601",
      "name": "help",
      "font_class": "help",
      "unicode": "e679",
      "unicode_decimal": 59001
    },
    {
      "icon_id": "24879602",
      "name": "navigate-filled",
      "font_class": "navigate-filled",
      "unicode": "e67a",
      "unicode_decimal": 59002
    },
    {
      "icon_id": "24879603",
      "name": "plusempty",
      "font_class": "plusempty",
      "unicode": "e67b",
      "unicode_decimal": 59003
    },
    {
      "icon_id": "24879604",
      "name": "smallcircle",
      "font_class": "smallcircle",
      "unicode": "e67c",
      "unicode_decimal": 59004
    },
    {
      "icon_id": "24879605",
      "name": "minus-filled",
      "font_class": "minus-filled",
      "unicode": "e67d",
      "unicode_decimal": 59005
    },
    {
      "icon_id": "24879606",
      "name": "micoff",
      "font_class": "micoff",
      "unicode": "e67e",
      "unicode_decimal": 59006
    },
    {
      "icon_id": "24879588",
      "name": "closeempty",
      "font_class": "closeempty",
      "unicode": "e66c",
      "unicode_decimal": 58988
    },
    {
      "icon_id": "24879589",
      "name": "clear",
      "font_class": "clear",
      "unicode": "e66d",
      "unicode_decimal": 58989
    },
    {
      "icon_id": "24879590",
      "name": "navigate",
      "font_class": "navigate",
      "unicode": "e66e",
      "unicode_decimal": 58990
    },
    {
      "icon_id": "24879591",
      "name": "minus",
      "font_class": "minus",
      "unicode": "e66f",
      "unicode_decimal": 58991
    },
    {
      "icon_id": "24879592",
      "name": "image",
      "font_class": "image",
      "unicode": "e670",
      "unicode_decimal": 58992
    },
    {
      "icon_id": "24879593",
      "name": "mic",
      "font_class": "mic",
      "unicode": "e671",
      "unicode_decimal": 58993
    },
    {
      "icon_id": "24879594",
      "name": "paperplane",
      "font_class": "paperplane",
      "unicode": "e672",
      "unicode_decimal": 58994
    },
    {
      "icon_id": "24879595",
      "name": "close",
      "font_class": "close",
      "unicode": "e673",
      "unicode_decimal": 58995
    },
    {
      "icon_id": "24879596",
      "name": "help-filled",
      "font_class": "help-filled",
      "unicode": "e674",
      "unicode_decimal": 58996
    },
    {
      "icon_id": "24879597",
      "name": "plus-filled",
      "font_class": "paperplane-filled",
      "unicode": "e675",
      "unicode_decimal": 58997
    },
    {
      "icon_id": "24879598",
      "name": "plus",
      "font_class": "plus",
      "unicode": "e676",
      "unicode_decimal": 58998
    },
    {
      "icon_id": "24879599",
      "name": "mic-filled",
      "font_class": "mic-filled",
      "unicode": "e677",
      "unicode_decimal": 58999
    },
    {
      "icon_id": "24879600",
      "name": "image-filled",
      "font_class": "image-filled",
      "unicode": "e678",
      "unicode_decimal": 59e3
    },
    {
      "icon_id": "24855900",
      "name": "locked-filled",
      "font_class": "locked-filled",
      "unicode": "e668",
      "unicode_decimal": 58984
    },
    {
      "icon_id": "24855901",
      "name": "info",
      "font_class": "info",
      "unicode": "e669",
      "unicode_decimal": 58985
    },
    {
      "icon_id": "24855903",
      "name": "locked",
      "font_class": "locked",
      "unicode": "e66b",
      "unicode_decimal": 58987
    },
    {
      "icon_id": "24855884",
      "name": "camera-filled",
      "font_class": "camera-filled",
      "unicode": "e658",
      "unicode_decimal": 58968
    },
    {
      "icon_id": "24855885",
      "name": "chat-filled",
      "font_class": "chat-filled",
      "unicode": "e659",
      "unicode_decimal": 58969
    },
    {
      "icon_id": "24855886",
      "name": "camera",
      "font_class": "camera",
      "unicode": "e65a",
      "unicode_decimal": 58970
    },
    {
      "icon_id": "24855887",
      "name": "circle",
      "font_class": "circle",
      "unicode": "e65b",
      "unicode_decimal": 58971
    },
    {
      "icon_id": "24855888",
      "name": "checkmarkempty",
      "font_class": "checkmarkempty",
      "unicode": "e65c",
      "unicode_decimal": 58972
    },
    {
      "icon_id": "24855889",
      "name": "chat",
      "font_class": "chat",
      "unicode": "e65d",
      "unicode_decimal": 58973
    },
    {
      "icon_id": "24855890",
      "name": "circle-filled",
      "font_class": "circle-filled",
      "unicode": "e65e",
      "unicode_decimal": 58974
    },
    {
      "icon_id": "24855891",
      "name": "flag",
      "font_class": "flag",
      "unicode": "e65f",
      "unicode_decimal": 58975
    },
    {
      "icon_id": "24855892",
      "name": "flag-filled",
      "font_class": "flag-filled",
      "unicode": "e660",
      "unicode_decimal": 58976
    },
    {
      "icon_id": "24855893",
      "name": "gear-filled",
      "font_class": "gear-filled",
      "unicode": "e661",
      "unicode_decimal": 58977
    },
    {
      "icon_id": "24855894",
      "name": "home",
      "font_class": "home",
      "unicode": "e662",
      "unicode_decimal": 58978
    },
    {
      "icon_id": "24855895",
      "name": "home-filled",
      "font_class": "home-filled",
      "unicode": "e663",
      "unicode_decimal": 58979
    },
    {
      "icon_id": "24855896",
      "name": "gear",
      "font_class": "gear",
      "unicode": "e664",
      "unicode_decimal": 58980
    },
    {
      "icon_id": "24855897",
      "name": "smallcircle-filled",
      "font_class": "smallcircle-filled",
      "unicode": "e665",
      "unicode_decimal": 58981
    },
    {
      "icon_id": "24855898",
      "name": "map-filled",
      "font_class": "map-filled",
      "unicode": "e666",
      "unicode_decimal": 58982
    },
    {
      "icon_id": "24855899",
      "name": "map",
      "font_class": "map",
      "unicode": "e667",
      "unicode_decimal": 58983
    },
    {
      "icon_id": "24855825",
      "name": "refresh-filled",
      "font_class": "refresh-filled",
      "unicode": "e656",
      "unicode_decimal": 58966
    },
    {
      "icon_id": "24855826",
      "name": "refresh",
      "font_class": "refresh",
      "unicode": "e657",
      "unicode_decimal": 58967
    },
    {
      "icon_id": "24855808",
      "name": "cloud-upload",
      "font_class": "cloud-upload",
      "unicode": "e645",
      "unicode_decimal": 58949
    },
    {
      "icon_id": "24855809",
      "name": "cloud-download-filled",
      "font_class": "cloud-download-filled",
      "unicode": "e646",
      "unicode_decimal": 58950
    },
    {
      "icon_id": "24855810",
      "name": "cloud-download",
      "font_class": "cloud-download",
      "unicode": "e647",
      "unicode_decimal": 58951
    },
    {
      "icon_id": "24855811",
      "name": "cloud-upload-filled",
      "font_class": "cloud-upload-filled",
      "unicode": "e648",
      "unicode_decimal": 58952
    },
    {
      "icon_id": "24855813",
      "name": "redo",
      "font_class": "redo",
      "unicode": "e64a",
      "unicode_decimal": 58954
    },
    {
      "icon_id": "24855814",
      "name": "images-filled",
      "font_class": "images-filled",
      "unicode": "e64b",
      "unicode_decimal": 58955
    },
    {
      "icon_id": "24855815",
      "name": "undo-filled",
      "font_class": "undo-filled",
      "unicode": "e64c",
      "unicode_decimal": 58956
    },
    {
      "icon_id": "24855816",
      "name": "more",
      "font_class": "more",
      "unicode": "e64d",
      "unicode_decimal": 58957
    },
    {
      "icon_id": "24855817",
      "name": "more-filled",
      "font_class": "more-filled",
      "unicode": "e64e",
      "unicode_decimal": 58958
    },
    {
      "icon_id": "24855818",
      "name": "undo",
      "font_class": "undo",
      "unicode": "e64f",
      "unicode_decimal": 58959
    },
    {
      "icon_id": "24855819",
      "name": "images",
      "font_class": "images",
      "unicode": "e650",
      "unicode_decimal": 58960
    },
    {
      "icon_id": "24855821",
      "name": "paperclip",
      "font_class": "paperclip",
      "unicode": "e652",
      "unicode_decimal": 58962
    },
    {
      "icon_id": "24855822",
      "name": "settings",
      "font_class": "settings",
      "unicode": "e653",
      "unicode_decimal": 58963
    },
    {
      "icon_id": "24855823",
      "name": "search",
      "font_class": "search",
      "unicode": "e654",
      "unicode_decimal": 58964
    },
    {
      "icon_id": "24855824",
      "name": "redo-filled",
      "font_class": "redo-filled",
      "unicode": "e655",
      "unicode_decimal": 58965
    },
    {
      "icon_id": "24841702",
      "name": "list",
      "font_class": "list",
      "unicode": "e644",
      "unicode_decimal": 58948
    },
    {
      "icon_id": "24841489",
      "name": "mail-open-filled",
      "font_class": "mail-open-filled",
      "unicode": "e63a",
      "unicode_decimal": 58938
    },
    {
      "icon_id": "24841491",
      "name": "hand-thumbsdown-filled",
      "font_class": "hand-down-filled",
      "unicode": "e63c",
      "unicode_decimal": 58940
    },
    {
      "icon_id": "24841492",
      "name": "hand-thumbsdown",
      "font_class": "hand-down",
      "unicode": "e63d",
      "unicode_decimal": 58941
    },
    {
      "icon_id": "24841493",
      "name": "hand-thumbsup-filled",
      "font_class": "hand-up-filled",
      "unicode": "e63e",
      "unicode_decimal": 58942
    },
    {
      "icon_id": "24841494",
      "name": "hand-thumbsup",
      "font_class": "hand-up",
      "unicode": "e63f",
      "unicode_decimal": 58943
    },
    {
      "icon_id": "24841496",
      "name": "heart-filled",
      "font_class": "heart-filled",
      "unicode": "e641",
      "unicode_decimal": 58945
    },
    {
      "icon_id": "24841498",
      "name": "mail-open",
      "font_class": "mail-open",
      "unicode": "e643",
      "unicode_decimal": 58947
    },
    {
      "icon_id": "24841488",
      "name": "heart",
      "font_class": "heart",
      "unicode": "e639",
      "unicode_decimal": 58937
    },
    {
      "icon_id": "24839963",
      "name": "loop",
      "font_class": "loop",
      "unicode": "e633",
      "unicode_decimal": 58931
    },
    {
      "icon_id": "24839866",
      "name": "pulldown",
      "font_class": "pulldown",
      "unicode": "e632",
      "unicode_decimal": 58930
    },
    {
      "icon_id": "24813798",
      "name": "scan",
      "font_class": "scan",
      "unicode": "e62a",
      "unicode_decimal": 58922
    },
    {
      "icon_id": "24813786",
      "name": "bars",
      "font_class": "bars",
      "unicode": "e627",
      "unicode_decimal": 58919
    },
    {
      "icon_id": "24813788",
      "name": "cart-filled",
      "font_class": "cart-filled",
      "unicode": "e629",
      "unicode_decimal": 58921
    },
    {
      "icon_id": "24813790",
      "name": "checkbox",
      "font_class": "checkbox",
      "unicode": "e62b",
      "unicode_decimal": 58923
    },
    {
      "icon_id": "24813791",
      "name": "checkbox-filled",
      "font_class": "checkbox-filled",
      "unicode": "e62c",
      "unicode_decimal": 58924
    },
    {
      "icon_id": "24813794",
      "name": "shop",
      "font_class": "shop",
      "unicode": "e62f",
      "unicode_decimal": 58927
    },
    {
      "icon_id": "24813795",
      "name": "headphones",
      "font_class": "headphones",
      "unicode": "e630",
      "unicode_decimal": 58928
    },
    {
      "icon_id": "24813796",
      "name": "cart",
      "font_class": "cart",
      "unicode": "e631",
      "unicode_decimal": 58929
    }
  ]
};
exports.Mock = Mock;
exports.SchemaValidator = SchemaValidator;
exports._export_sfc = _export_sfc;
exports.createSSRApp = createSSRApp;
exports.deepCopy = deepCopy;
exports.defineComponent = defineComponent;
exports.e = e;
exports.f = f$1;
exports.getDataValue = getDataValue;
exports.getValue = getValue;
exports.icons = icons;
exports.index = index;
exports.isEqual = isEqual;
exports.isRealName = isRealName;
exports.isRequiredField = isRequiredField;
exports.n = n$1;
exports.o = o$1;
exports.onHide = onHide;
exports.onLaunch = onLaunch;
exports.onLoad = onLoad;
exports.onShow = onShow;
exports.p = p$1;
exports.rawData = rawData;
exports.realName = realName;
exports.ref = ref;
exports.resolveComponent = resolveComponent;
exports.rn = rn;
exports.s = s$1;
exports.setDataValue = setDataValue;
exports.t = t$1;
exports.toRefs = toRefs;
exports.unref = unref;
