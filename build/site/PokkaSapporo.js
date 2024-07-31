"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const POKKASAPPORO_CONSTANTS = {
  searchConfig: {
    name: 'ポッカ',
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

class MorinagaSearch extends _JanSearchBase.default {
  filterJanUrl(links) {
    return links.filter(url => url.indexOf('detail') > 0);
  }

  getSrcConfig() {
    return POKKASAPPORO_CONSTANTS.searchConfig;
  }

}

exports.default = MorinagaSearch;
//# sourceMappingURL=PokkaSapporo.js.map