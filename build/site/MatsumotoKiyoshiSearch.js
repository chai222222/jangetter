'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pIteration = require('p-iteration');

var _JanSearchBase2 = require('./JanSearchBase');

var _JanSearchBase3 = _interopRequireDefault(_JanSearchBase2);

var _Replacer = require('../util/Replacer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MATSUMOTOKIYOSHI_CONSTANTS = {
  searchConfig: {
    prefix: 'MatsumotoKiyoshi',
    top: 'https://www.matsukiyo.co.jp/store/online/',
    searchPageSelectors: {
      productsLink: 'div.resultList ul > li > p.img > a',
      nextLink: '#searchMore',
      searchText: '#frmTopPageHeaderSearchTxt',
      searchButton: '#frmTopPageHeaderSearchBtn'
    },
    productPageSelectors: {
      jan: 'p.cpde',
      // category: 'div.breadcrumb ul',
      title: 'div.goodsBox > h3'
    },
    productPageImageSelectors: {
      picture: 'div.goodsDetail ul.bxslider > li > a'
    },
    replacer: {
      title: [_Replacer.REPLACERS.trim, _Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toHarfWidthAlnum],
      jan: [_Replacer.REPLACERS.toOneLine, {
        pattern: /.*JAN\D+(\d+).*/g,
        value: '$1'
      }],
      category: [_Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim]
    }
  }
};

var MatsumotoKiyoshiSearch = function (_JanSearchBase) {
  _inherits(MatsumotoKiyoshiSearch, _JanSearchBase);

  function MatsumotoKiyoshiSearch() {
    _classCallCheck(this, MatsumotoKiyoshiSearch);

    return _possibleConstructorReturn(this, (MatsumotoKiyoshiSearch.__proto__ || Object.getPrototypeOf(MatsumotoKiyoshiSearch)).apply(this, arguments));
  }

  _createClass(MatsumotoKiyoshiSearch, [{
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return MATSUMOTOKIYOSHI_CONSTANTS.searchConfig;
    }
  }]);

  return MatsumotoKiyoshiSearch;
}(_JanSearchBase3.default);

exports.default = MatsumotoKiyoshiSearch;
//# sourceMappingURL=MatsumotoKiyoshiSearch.js.map