import _ from 'lodash';

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
  toNoSpace: {
    pattern: /\s/g,
    value: '',
  },
  toOneLine: {
    pattern: /\r?\n/g,
    value: ' ',
  }
}

export default class Replacer {
  /**
   * 定義されているREPLACERS一覧を出力します。
   */
  static showReplacers() {
    console.log('**** REPLACERS ****');
    Object.keys(REPLACERS).forEach(key => console.log(key, Replacer.toSpecialString(REPLACERS[key], false)));
  }

  /**
   * 指定された正規表現を REPLACERS に変更します。
   * @param {Object|Array} re 正規表現定義
   * @return {String} キー文字列。定義されていない場合にはundefinedを返します。
   */
  static toReplacersKey(re) {
    return _(REPLACERS).toPairs().filter(([, v]) => v === re).map(([k]) => k).head();
  }

  /**
   * 指定された文字列から定義済みREPLACERSに変換します。
   * @param {String} reStr REPLACERキー文字列
   * @return {Object|Array} 正規表現定義。定義されていない場合にはundefinedを返します。
   */
  static toReplacersValue(reStr) {
    return REPLACERS[reStr];
  }

  /**
   * Type文字列定義を用いた記述へ変換します。
   * @param {Object|Array|RegExp|String|Number} data 変換定義の値部
   * @param {Boolean} changeReplacersName 正規表現を REPLACERS 定義の名前に変換する場合には真を設定します。
   * @return {Object|Array|RegExp|String|Number} 変換されたデータ
   */
  static toSpecialString(data, changeReplacersName = true) {
    if (changeReplacersName) {
      const repKey = Replacer.toReplacersKey(data);
      if (repKey) return `Type(REPLACERS)${repKey}`;
    }
    if (_.isFunction(data)) return `Type(Function)${data.toString()}`;
    if (data instanceof RegExp) return `Type(RegExp)${data.toString()}`;
    if (_.isArray(data)) return data.map(datam => Replacer.toSpecialString(datam, changeReplacersName));
    if (_.isString(data) || _.isNumber(data)) return data;
    if (!_.isObject(data)) throw new Error(`Must be array, object, String, Number, Function. data is ${typeof data}`);
    return _.fromPairs(_.toPairs(data).map(([k, v]) => [k, Replacer.toSpecialString(v, changeReplacersName)]));
  }

  /**
   * Type文字列定義を用いた記述から変換します。
   */
  static fromSpecialString(data, changeReplacersName = true) {
    const repKey = Replacer.toReplacersKey(data);
    if (repKey) return data; // 既存定義と同じインスタンスの場合そのものを返す
    if (_.isString(data)) {
      const res = /^Type\((\w+)\)(.*)$/.exec(data);
      // "Type(型)値"
      if (res) {
        // eslint-disable-next-line no-eval
        if (res[1] === 'Function') return eval(res[2]);
        if (res[1] === 'RegExp') return new RegExp(res[2].substring(1, res[2].lastIndexOf(res[2].charAt(0)), res[2].lastIndexOf(res[2].charAt(0)) + 1));
        if (res[1] === 'REPLACERS' && changeReplacersName && REPLACERS[res[2]]) return REPLACERS[res[2]];
        throw new Error(`Invalid data ${data}`);
      }
    }
    if (_.isArray(data)) return data.map(datam => Replacer.fromSpecialString(datam, changeReplacersName));
    if (_.isString(data) || _.isNumber(data) || _.isFunction(data) || data instanceof RegExp) return data;
    if (!_.isObject(data)) throw new Error(`Must be array, object, String, Number, Function. data is ${typeof data}`);
    return _.fromPairs(_.toPairs(data).map(([k, v]) => [k, Replacer.fromSpecialString(v, changeReplacersName)]));
  }

  constructor(replaceDef, rcDef) {
    this.repDefs = {};
    if (typeof replaceDef === 'object') this._addReplaceDefs(replaceDef);
    if (typeof rcDef === 'object') this._addReplaceDefs(rcDef);
  }

  /**
   * 置き換え定義のパターンを正規表現へ変換します。
   *
   * @param {String} key 置き換えキー値
   * @param {Object|Array<Object>} val 置き換え定義
   * @param {String|Array<String>} val.pattern 置き換えパターン。配列の場合、RegExpコンストラクタの引数で、文字列の場合、単純置き換え文字列。
   * @param {String} val.value 置き換後の文字列
   * @return {Object|Array<Object>} patternを正規表現に変換した後のオブジェクト、もしくはオブジェクトの配列を返す。
   */
  _patternValueMapper(key, val) {
    // 定義済み値の場合には、定義済みインスタンスを返す
    const repKey = Replacer.toReplacersKey(val);
    if (repKey) return val;
    // 配列の場合には配列の中身全てを置き換える
    if (_.isArray(val)) return val.map(v => this._patternValueMapper(key, v));
    if (!_.isObject(val)) throw new Error(`Must be array or object ${key} ${val}`);
    const { pattern, value } = val;
    if (pattern === undefined || value === undefined) throw new Error(`Not defined pattern or value in ${key}`);
    return {
      pattern: Array.isArray(pattern) ? new RegExp(...pattern) : pattern,
      value,
    };
  }

  _addReplaceDefs(repObj) {
    _.toPairs(Replacer.fromSpecialString(repObj)).forEach(([key, value]) => {
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
  replaceValues(obj) {
    return _.fromPairs(_.toPairs(obj).map(([key, value]) => (
      [ key, key in this.repDefs ? this._replaceValue(value, this.repDefs[key]) : value ]
    )));
  }
}
