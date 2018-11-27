'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _JanSearchBase2 = require('./JanSearchBase');

var _JanSearchBase3 = _interopRequireDefault(_JanSearchBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LOHACO_CONSTANTS = {
  searchConfig: {
    prefix: 'Lohaco',
    top: 'https://lohaco.jp/',
    searchPageSelectors: {
      productsLink: 'div.prodImgBlc > a',
      nextLink: 'p.nextBtn > a',
      searchText: '#jsi-txtKeywd',
      searchButton: 'div.searchBtn'
    },
    productPageSelectors: {
      jan: 'table.prodSpecTable > tbody',
      category: 'div.blcCategoryNav div.blcCatNav',
      title: 'title'
    },
    replacer: {
      title: [{
        pattern: /.*LOHACO *\- */g,
        value: ''
      }, {
        pattern: /　+/g,
        value: ' '
      }, {
        pattern: /[Ａ-Ｚａ-ｚ０-９]/g,
        value: function value(s) {
          return String.fromCharCode(s.charCodeAt(0) - 65248);
        }
      }],
      jan: [{
        pattern: /\r?\n/g,
        value: ''
      }, {
        pattern: /.*JANコード */,
        value: ''
      }, {
        pattern: / +.*$/g,
        value: ''
      }],
      category: [{
        pattern: /\s+/g,
        value: ' '
      }]
    }
  }
};

var TajimaSearch = function (_JanSearchBase) {
  _inherits(TajimaSearch, _JanSearchBase);

  function TajimaSearch() {
    _classCallCheck(this, TajimaSearch);

    return _possibleConstructorReturn(this, (TajimaSearch.__proto__ || Object.getPrototypeOf(TajimaSearch)).apply(this, arguments));
  }

  _createClass(TajimaSearch, [{
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return LOHACO_CONSTANTS.searchConfig;
    }
  }]);

  return TajimaSearch;
}(_JanSearchBase3.default);

exports.default = TajimaSearch;
//# sourceMappingURL=LohacoSearch.js.map