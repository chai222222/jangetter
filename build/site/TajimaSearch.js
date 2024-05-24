"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TAJIMA_CONSTANTS = {
  searchConfig: {
    prefix: 'Tajima',
    top: 'http://www.tajimaya-cc.net/',
    lastSupportedDate: '2022/05/24: 18:00:00',
    searchPageSelectors: {
      productsLink: 'ul.prod_list a',
      nextLink: 'a.next',
      searchText: '#search3',
      searchButton: '#product_search2 > button'
    },
    productPageSelectors: {
      jan: '//dt[contains(text(), "JANコード")]/../dd',
      // category: 'li.onmark > p > a',
      title: 'h1.tit_txt'
    },
    productPageImageSelectors: {
      picture: 'div.img_main_wrap img'
    }
  }
};

class TajimaSearch extends _JanSearchBase.default {
  getSrcConfig() {
    return TAJIMA_CONSTANTS.searchConfig;
  }

}

exports.default = TajimaSearch;
//# sourceMappingURL=TajimaSearch.js.map