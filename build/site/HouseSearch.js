"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const HOUSE_CONSTANTS = {
  searchConfig: {
    name: 'ハウス',
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
      // category: 'p.breadcrumbs',
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

class HouseSearch extends _JanSearchBase.default {
  filterJanUrl(links) {
    return links.filter(url => url.indexOf('products/catalog/cd') > 0);
  }

  getSrcConfig() {
    return HOUSE_CONSTANTS.searchConfig;
  }

}

exports.default = HouseSearch;
//# sourceMappingURL=HouseSearch.js.map