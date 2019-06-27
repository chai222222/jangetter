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

var NISSUI_CONSTANTS = {
  searchConfig: {
    prefix: 'Nissui',
    top: 'http://www.nissui.co.jp/product/index.html',
    searchPageSelectors: {
      productsLink: 'div.productSnippet > a',
      nextLink: 'div.resultTitle li.pageNext a',
      searchText: 'input#keyword',
      searchButton: 'form[name=frm] input.submit'
    },
    productPageSelectors: {
      jan: '//th[contains(text(), "JANコード")]/../td',
      category: 'ul#pathBody',
      title: 'div.twoLineInner'
    },
    productPageImageSelectors: {
      picture: 'div.productPic > img[alt*=商品写真]'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthAlnum],
      jan: [_Replacer.REPLACERS.toNoSpace],
      category: [_Replacer.REPLACERS.toOneLine, _Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim, _Replacer.REPLACERS.toHarfWidth, {
        pattern: /.* 商品紹介\s*>?\s*/g,
        value: ''
      }]
    }
  }
};

var NissuiSearch = function (_JanSearchBase) {
  _inherits(NissuiSearch, _JanSearchBase);

  function NissuiSearch() {
    _classCallCheck(this, NissuiSearch);

    return _possibleConstructorReturn(this, (NissuiSearch.__proto__ || Object.getPrototypeOf(NissuiSearch)).apply(this, arguments));
  }

  _createClass(NissuiSearch, [{
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return NISSUI_CONSTANTS.searchConfig;
    }
  }]);

  return NissuiSearch;
}(_JanSearchBase3.default);

exports.default = NissuiSearch;
//# sourceMappingURL=NissuiSearch.js.map