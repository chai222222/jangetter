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

var HOUSE_CONSTANTS = {
  searchConfig: {
    prefix: 'House',
    top: 'https://housefoods.jp/products/index.html',
    searchPageSelectors: {
      productsLink: 'p.mf_url a',
      nextLink: 'li.mf_nextpage a',
      searchText: '#MF_form_phrase_pro',
      searchButton: 'dl.searchArea dd button'
    },
    productPageSelectors: {
      jan: '//th/span[contains(text(), "JAN")]/../../td/span',
      category: 'p.breadcrumbs',
      title: 'h1.ttlType1'
    },
    productPageImageSelectors: {
      picture: 'figure#detail_package img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthAlnum],
      category: [_Replacer.REPLACERS.toOneLine, _Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim, _Replacer.REPLACERS.toHarfWidth, {
        pattern: /.* 商品カタログ\s*>\s*/g,
        value: ''
      }]
    }
  }
};

var HouseSearch = function (_JanSearchBase) {
  _inherits(HouseSearch, _JanSearchBase);

  function HouseSearch() {
    _classCallCheck(this, HouseSearch);

    return _possibleConstructorReturn(this, (HouseSearch.__proto__ || Object.getPrototypeOf(HouseSearch)).apply(this, arguments));
  }

  _createClass(HouseSearch, [{
    key: 'filterJanUrl',
    value: function filterJanUrl(links) {
      return links.filter(function (url) {
        return url.indexOf('products/catalog/cd') > 0;
      });
    }
  }, {
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return HOUSE_CONSTANTS.searchConfig;
    }
  }]);

  return HouseSearch;
}(_JanSearchBase3.default);

exports.default = HouseSearch;
//# sourceMappingURL=HouseSearch.js.map