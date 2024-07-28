"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const KENKOCOM_CONSTANTS = {
  searchConfig: {
    name: 'ケンコーコム',
    prefix: 'Kenkocom',
    top: 'https://www.kenko.com/',
    searchPageSelectors: {
      searchText: '#searchText',
      searchButton: '#searchForm input[type="submit"]',
      nextLink: 'li.next',
      productsLink: 'li[itemtype="http://data-vocabulary.org/Product"] > a'
    },
    productPageSelectors: {
      jan: '#janCode',
      // category: 'ul.breadcrumbTypeA01',
      title: 'h2.itemTitle'
    },
    productPageImageSelectors: {
      picture: '#view img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidth],
      category: [_Replacer.REPLACERS.toHarfWidth, _Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim]
    }
  }
};

class KenkocomSearch extends _JanSearchBase.default {
  getSrcConfig() {
    return KENKOCOM_CONSTANTS.searchConfig;
  }

}

exports.default = KenkocomSearch;
//# sourceMappingURL=KenkocomSearch.js.map