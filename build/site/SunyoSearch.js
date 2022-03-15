'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _JanSearchBase2 = require('./JanSearchBase');

var _JanSearchBase3 = _interopRequireDefault(_JanSearchBase2);

var _Replacer = require('../util/Replacer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SUNYO_CONSTANTS = {
  searchConfig: {
    prefix: 'Sunyo',
    top: 'http://www.sunyo-do.co.jp/cgi-bin/ksearch/ksearch.cgi',
    searchPageSelectors: {
      productsLink: 'dl.search dt a',
      nextLink: 'dl.search + p > b + a',
      searchText: 'form.find input[name="q"]',
      searchButton: 'form.find input[type="submit"]'
    },
    productPageSelectors: {
      jan: '//th[contains(text(), "JANｺｰﾄﾞ")]/../td',
      // category: 'p.breadcrumb',
      title: '//th[contains(text(), "品名")]/../td'
    },
    productPageImageSelectors: {
      picture: 'p.canimg > a'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthAlnum],
      category: [_Replacer.REPLACERS.toOneLine, _Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim, _Replacer.REPLACERS.toHarfWidth, {
        pattern: /.*SUNYO製品>/g,
        value: ''
      }]
    }
  }
};

var SunyoSearch = function (_JanSearchBase) {
  _inherits(SunyoSearch, _JanSearchBase);

  function SunyoSearch() {
    _classCallCheck(this, SunyoSearch);

    return _possibleConstructorReturn(this, (SunyoSearch.__proto__ || Object.getPrototypeOf(SunyoSearch)).apply(this, arguments));
  }

  _createClass(SunyoSearch, [{
    key: 'filterJanUrl',
    value: function filterJanUrl(links) {
      return links.filter(function (url) {
        return url.indexOf('products/data') > 0;
      });
    }
  }, {
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return SUNYO_CONSTANTS.searchConfig;
    }
  }]);

  return SunyoSearch;
}(_JanSearchBase3.default);

exports.default = SunyoSearch;
//# sourceMappingURL=SunyoSearch.js.map