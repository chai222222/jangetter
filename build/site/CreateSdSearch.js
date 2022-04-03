"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const CREATESD_CONSTANTS = {
  searchConfig: {
    prefix: 'CreateSD',
    top: 'http://netshop.create-sd.co.jp/shop/default.aspx',
    searchPageSelectors: {
      searchText: '#keyword',
      searchButton: '#keyword + input',
      productsLink: 'div.StyleD_Frame_ > div >div.img_ > a',
      nextLink: 'li.navipage_next_ a'
    },
    productPageSelectors: {
      jan: 'div.goodsdetail_.top_ + div + div > p.txt_',
      // category: '#bread-crumb-list',
      title: 'div.common_h2_blue_ h2 span'
    },
    productPageImageSelectors: {
      picture: '#gallery img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidth, _Replacer.REPLACERS.toHarfWidthSpace],
      jan: [],
      category: [_Replacer.REPLACERS.toOneLine, _Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toHarfWidth, _Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim, {
        pattern: /^\s*ホーム\s*/,
        value: ''
      }]
    }
  }
};

class CreateSdSearch extends _JanSearchBase.default {
  getSrcConfig() {
    return CREATESD_CONSTANTS.searchConfig;
  }

}

exports.default = CreateSdSearch;
//# sourceMappingURL=CreateSdSearch.js.map