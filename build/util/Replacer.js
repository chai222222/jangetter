'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REPLACERS = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _querystring = require('querystring');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/** 共通リプレーサ定義 */
var REPLACERS = exports.REPLACERS = {
  toHarfWidth: {
    pattern: /[！-～]/g,
    value: function value(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }
  },
  toHarfWidthAlnum: {
    pattern: /[Ａ-Ｚａ-ｚ０-９]/g,
    value: function value(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }
  },
  toHarfWidthSpace: {
    pattern: /　+/g,
    value: ' '
  },
  trim: [{ pattern: /^\s+/, value: '' }, { pattern: /\s+$/, value: '' }],
  toOneSpace: {
    pattern: /\s\s+/g,
    value: ' '
  },
  toOneLine: {
    pattern: /\r?\n/g,
    value: ' '
  }
};

var Replacer = function () {
  function Replacer(replaceDef, rcDef) {
    _classCallCheck(this, Replacer);

    this.repDefs = {};
    if ((typeof replaceDef === 'undefined' ? 'undefined' : _typeof(replaceDef)) === 'object') this._addReplaceDefs(replaceDef);
    if ((typeof rcDef === 'undefined' ? 'undefined' : _typeof(rcDef)) === 'object') this._addReplaceDefs(rcDef);
  }

  _createClass(Replacer, [{
    key: '_patternValueMapper',
    value: function _patternValueMapper(key, val) {
      var _this = this;

      // 配列の場合には配列の中身全てを置き換える
      if (Array.isArray(val)) return val.map(function (v) {
        return _this._patternValueMapper(key, v);
      });
      if ((typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object') throw new Error('Must be array or object ' + key);
      var pattern = val.pattern,
          value = val.value;

      if (pattern === undefined || value === undefined) throw new Error('Not defined pattern or value in ' + key);
      return {
        pattern: Array.isArray(pattern) ? new (Function.prototype.bind.apply(RegExp, [null].concat(_toConsumableArray(pattern))))() : pattern,
        value: value
      };
    }
  }, {
    key: '_addReplaceDefs',
    value: function _addReplaceDefs(repObj) {
      var _this2 = this;

      _lodash2.default.toPairs(repObj).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
            key = _ref2[0],
            value = _ref2[1];

        var values = Array.isArray(value) ? value : [value];
        var arr = _this2.repDefs[key] || (_this2.repDefs[key] = []);
        arr.push(_this2._patternValueMapper(key, values));
      });
    }
  }, {
    key: '_replaceValue',
    value: function _replaceValue(value, def) {
      var _this3 = this;

      if (Array.isArray(def)) return def.reduce(function (acc, elm) {
        return _this3._replaceValue(acc, elm);
      }, value);
      return value.replace(def.pattern, def.value);
    }

    /**
     * 値を定義にそって置き換えを行います。
     */

  }, {
    key: 'replaceValues',
    value: function replaceValues(obj) {
      var _this4 = this;

      return _lodash2.default.fromPairs(_lodash2.default.toPairs(obj).map(function (_ref3) {
        var _ref4 = _slicedToArray(_ref3, 2),
            key = _ref4[0],
            value = _ref4[1];

        return [key, key in _this4.repDefs ? _this4._replaceValue(value, _this4.repDefs[key]) : value];
      }));
    }
  }]);

  return Replacer;
}();

exports.default = Replacer;
//# sourceMappingURL=Replacer.js.map