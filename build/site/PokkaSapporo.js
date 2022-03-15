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

var POKKASAPPORO_CONSTANTS = {
  searchConfig: {
    prefix: 'PokkaSapporo',
    top: 'https://www.pokkasapporo-fb.jp/products/',
    searchPageSelectors: {
      searchText: 'input.c-form__search',
      searchButton: 'input.c-button',
      productsLink: 'p.mf_url > a',
      nextLink: 'li.mf_nextpage > a'
    },
    productPageSelectors: {
      jan: 'td.v_jan_code',
      title: 'h1'
    },
    productPageImageSelectors: {
      picture: 'div.products-mainImg img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidth, _Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.trim],
      jan: [],
      category: [_Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toHarfWidth, _Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim]
    }
  }
};

var MorinagaSearch = function (_JanSearchBase) {
  _inherits(MorinagaSearch, _JanSearchBase);

  function MorinagaSearch() {
    _classCallCheck(this, MorinagaSearch);

    return _possibleConstructorReturn(this, (MorinagaSearch.__proto__ || Object.getPrototypeOf(MorinagaSearch)).apply(this, arguments));
  }

  _createClass(MorinagaSearch, [{
    key: 'filterJanUrl',
    value: function filterJanUrl(links) {
      return links.filter(function (url) {
        return url.indexOf('detail') > 0;
      });
    }
  }, {
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return POKKASAPPORO_CONSTANTS.searchConfig;
    }
  }]);

  return MorinagaSearch;
}(_JanSearchBase3.default);

exports.default = MorinagaSearch;
//# sourceMappingURL=PokkaSapporo.js.map