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

var TAJIMA_CONSTANTS = {
  searchConfig: {
    prefix: 'Tajima',
    top: 'http://www.tajimaya-cc.net/',
    lastSupportedDate: '2022/03/16: 00:00:00',
    searchPageSelectors: {
      productsLink: 'ul.prod_list a',
      nextLink: '#contents > div > div > main > div.prod_list_case > div > a.nextpostslink',
      searchText: '#search3',
      searchButton: '#product_search2 > button'
    },
    productPageSelectors: {
      jan: '//dt[contains(text(), "JANコード")]/../dd',
      // category: 'li.onmark > p > a',
      title: 'h3.tit_txt'
    },
    productPageImageSelectors: {
      picture: 'div.img_main_wrap img'
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
      return TAJIMA_CONSTANTS.searchConfig;
    }
  }]);

  return TajimaSearch;
}(_JanSearchBase3.default);

exports.default = TajimaSearch;
//# sourceMappingURL=TajimaSearch.js.map