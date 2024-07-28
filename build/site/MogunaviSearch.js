"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const MOGUNAVI_CONSTANTS = {
  searchConfig: {
    name: 'もぐナビ',
    prefix: 'Mogunavi',
    top: 'https://mognavi.jp/',
    searchPageSelectors: {
      cushion: '#searchResList p.more a',
      nextLink: '//div[@id="main"]/div[1]/p[@class="nam"]/a[contains(text(), "次の20")]',
      productsLink: '#searchResList li h3 > a',
      searchText: '#headerSearch input[name="keyword"]',
      searchButton: '#food_search_button'
    },
    productPageSelectors: {
      jan: '#pInfo > p + table tbody',
      // category: '#pInfo td.category a',
      title: 'h2.item span.fn span.food-name'
    },
    productPageImageSelectors: {
      picture: '#foodPhoto'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthAlnum, _Replacer.REPLACERS.toHarfWidthSpace],
      jan: [{
        pattern: /\r?\n/g,
        value: ''
      }, {
        pattern: /.*JANコード\s*/,
        value: ''
      }, {
        pattern: /\s+.*$/g,
        value: ''
      }],
      category: [{
        pattern: /\s+/g,
        value: ' '
      }]
    }
  }
};

class MogunaviSearch extends _JanSearchBase.default {
  getSrcConfig() {
    return MOGUNAVI_CONSTANTS.searchConfig;
  }

}

exports.default = MogunaviSearch;
//# sourceMappingURL=MogunaviSearch.js.map