"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MORINAGA_CONSTANTS = {
  searchConfig: {
    name: '森永',
    prefix: 'Morinaga',
    top: 'https://www.morinaga.co.jp/products/',
    searchPageSelectors: {
      searchText: '#SS_searchQuery3',
      searchButton: '#SS_searchQuery3 + input',
      productsLink: 'div.SS_item > div.SS_image > a',
      nextLink: 'span.SS_nextPage > a'
    },
    productPageSelectors: {
      jan: 'div.products-detailBox__inner dl.products-detailBox__list dd:last-child',
      // category: 'div.products-detailContents div.headingType02 p.headingType02__txt',
      title: 'div.products-mainBox h2.headingType01__txt'
    },
    productPageImageSelectors: {
      picture: 'div.products-mainImg img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidth, _Replacer.REPLACERS.toHarfWidthSpace],
      jan: [],
      category: [_Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toHarfWidth, _Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim]
    }
  }
};

class MorinagaSearch extends _JanSearchBase.default {
  filterJanUrl(links) {
    return links.filter(url => url.indexOf('detail') > 0);
  }

  getSrcConfig() {
    return MORINAGA_CONSTANTS.searchConfig;
  }

}

exports.default = MorinagaSearch;
//# sourceMappingURL=MorinagaSearch.js.map