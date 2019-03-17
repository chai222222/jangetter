import _ from 'lodash';
import { stringify } from 'querystring';

/** 共通リプレーサ定義 */
export const REPLACERS = {
  toHarfWidth: {
    pattern: /[！-～]/g,
    value: (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    },
  },
  toHarfWidthAlnum: {
    pattern: /[Ａ-Ｚａ-ｚ０-９]/g,
    value: (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    },
  },
  toHarfWidthSpace: {
    pattern: /　+/g,
    value: ' ',
  },
  trim: [ { pattern: /^\s+/, value: '' },
          { pattern: /\s+$/, value: '' } ],
  toOneSpace: {
    pattern: /\s\s+/g,
    value: ' ',
  },
  toOneLine: {
    pattern: /\r?\n/g,
    value: ' ',
  }
}

export default class Replacer {
  constructor(replaceDef, rcDef) {
    this.repDefs = {};
    if (typeof replaceDef === 'object') this._addReplaceDefs(replaceDef);
    if (typeof rcDef === 'object') this._addReplaceDefs(rcDef);
  }

  _patternValueMapper(key, val) {
    // 配列の場合には配列の中身全てを置き換える
    if (Array.isArray(val)) return val.map(v => this._patternValueMapper(key, v));
    if (typeof val !== 'object') throw new Error(`Must be array or object ${key}`);
    const { pattern, value } = val;
    if (pattern === undefined || value === undefined) throw new Error(`Not defined pattern or value in ${key}`);
    return {
      pattern: Array.isArray(pattern) ? new RegExp(...pattern) : pattern,
      value,
    };
  }

  _addReplaceDefs(repObj) {
    _.toPairs(repObj).forEach(([key, value]) => {
      const values = Array.isArray(value) ? value : [value];
      const arr = this.repDefs[key] || (this.repDefs[key] = []);
      arr.push(this._patternValueMapper(key, values));
    })
  }

  _replaceValue(value, def) {
    if (Array.isArray(def)) return def.reduce((acc, elm) => this._replaceValue(acc, elm), value);
    return value.replace(def.pattern, def.value);
  }

  /**
   * 値を定義にそって置き換えを行います。
   */
  replceValues(obj) {
    return _.fromPairs(_.toPairs(this.repDefs).filter(([key]) => key in obj).map(([key, defArr]) => [
      key, this._replaceValue(obj[key], defArr)
    ]));

    // Object.keys(replaceDef).filter(key => key in nobj)
    //   .forEach(key => nobj[key] = replaceDef[key].reduce((acc, def) => {
    //     const rcDef = _.get(this.rc, `replacer.${key}`, []);
    //     (Array.isArray(def) ? [...def, ...rcDef] : [def, ...rcDef]).forEach(nestDef => {
    //       const pat = Array.isArray(nestDef.pattern)
    //         ? new RegExp(...nestDef.pattern)
    //         : nestDef.pattern;
    //       acc = acc.replace(pat, nestDef.value);
    //     });
    //     return acc;
    //   }, nobj[key]));
    // return nobj;
  }
}
