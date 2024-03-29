"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.REPLACERS = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _querystring = require("querystring");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/** 共通リプレーサ定義 */
const REPLACERS = {
  toHarfWidth: {
    pattern: /[！-～]/g,
    value: s => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }
  },
  toHarfWidthAlnum: {
    pattern: /[Ａ-Ｚａ-ｚ０-９]/g,
    value: s => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }
  },
  toHarfWidthSpace: {
    pattern: /　+/g,
    value: ' '
  },
  trim: [{
    pattern: /^\s+/,
    value: ''
  }, {
    pattern: /\s+$/,
    value: ''
  }],
  toOneSpace: {
    pattern: /\s\s+/g,
    value: ' '
  },
  toNoSpace: {
    pattern: /\s/g,
    value: ''
  },
  toOneLine: {
    pattern: /\r?\n/g,
    value: ' '
  }
};
exports.REPLACERS = REPLACERS;

class Replacer {
  constructor(replaceDef, rcDef) {
    this.repDefs = {};
    if (typeof replaceDef === 'object') this._addReplaceDefs(replaceDef);
    if (typeof rcDef === 'object') this._addReplaceDefs(rcDef);
  }

  _patternValueMapper(key, val) {
    // 配列の場合には配列の中身全てを置き換える
    if (Array.isArray(val)) return val.map(v => this._patternValueMapper(key, v));
    if (typeof val !== 'object') throw new Error(`Must be array or object ${key}`);
    const {
      pattern,
      value
    } = val;
    if (pattern === undefined || value === undefined) throw new Error(`Not defined pattern or value in ${key}`);
    return {
      pattern: Array.isArray(pattern) ? new RegExp(...pattern) : pattern,
      value
    };
  }

  _addReplaceDefs(repObj) {
    _lodash.default.toPairs(repObj).forEach(([key, value]) => {
      const values = Array.isArray(value) ? value : [value];
      const arr = this.repDefs[key] || (this.repDefs[key] = []);
      arr.push(this._patternValueMapper(key, values));
    });
  }

  _replaceValue(value, def) {
    if (Array.isArray(def)) return def.reduce((acc, elm) => this._replaceValue(acc, elm), value);
    return value.replace(def.pattern, def.value);
  }
  /**
   * 値を定義にそって置き換えを行います。
   */


  replaceValues(obj) {
    return _lodash.default.fromPairs(_lodash.default.toPairs(obj).map(([key, value]) => [key, key in this.repDefs ? this._replaceValue(value, this.repDefs[key]) : value]));
  }

}

exports.default = Replacer;
//# sourceMappingURL=Replacer.js.map