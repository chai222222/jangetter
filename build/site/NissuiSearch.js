"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NISSUI_CONSTANTS = {
  searchConfig: {
    name: 'NISSUI',
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
      // category: 'ul#pathBody',
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

class NissuiSearch extends _JanSearchBase.default {
  getSrcConfig() {
    return NISSUI_CONSTANTS.searchConfig;
  }

}

exports.default = NissuiSearch;
//# sourceMappingURL=NissuiSearch.js.map