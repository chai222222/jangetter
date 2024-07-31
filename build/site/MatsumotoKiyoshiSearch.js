"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pIteration = require("p-iteration");

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MATSUMOTOKIYOSHI_CONSTANTS = {
  searchConfig: {
    name: 'もぐナビ',
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

class MatsumotoKiyoshiSearch extends _JanSearchBase.default {
  getSrcConfig() {
    return MATSUMOTOKIYOSHI_CONSTANTS.searchConfig;
  }

}

exports.default = MatsumotoKiyoshiSearch;
//# sourceMappingURL=MatsumotoKiyoshiSearch.js.map