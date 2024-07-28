"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GYOUMUSUPER_CONSTANTS = {
  searchConfig: {
    name: '業務スーパー',
    prefix: 'GyoumuSuper',
    top: 'https://www.gyomusuper.jp/item/search.php',
    searchPageSelectors: {
      productsLink: 'div.list_img a',
      onlyCurrentPage: true,
      searchText: 'input.ipt_txt',
      searchButton: 'input.ipt_submit'
    },
    productPageSelectors: {
      jan: '//dt[contains(text(), "JAN")]/../dd',
      title: 'div.detail_info_box h3' // categoryがとれないのでなし

    },
    productPageImageSelectors: {
      picture: 'div.detail_img_box img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthAlnum]
    }
  }
};

class GyoumuSuperSearch extends _JanSearchBase.default {
  filterJanUrl(links) {
    return links.filter(url => url.indexOf('item/detail') > 0);
  }

  getSrcConfig() {
    return GYOUMUSUPER_CONSTANTS.searchConfig;
  }

}

exports.default = GyoumuSuperSearch;
//# sourceMappingURL=GyoumuSuperSearch.js.map