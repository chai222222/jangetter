"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SUNYO_CONSTANTS = {
  searchConfig: {
    name: 'SUNYO',
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

class SunyoSearch extends _JanSearchBase.default {
  filterJanUrl(links) {
    return links.filter(url => url.indexOf('products/data') > 0);
  }

  getSrcConfig() {
    return SUNYO_CONSTANTS.searchConfig;
  }

}

exports.default = SunyoSearch;
//# sourceMappingURL=SunyoSearch.js.map