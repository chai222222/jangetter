"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LOHACO_CONSTANTS = {
  searchConfig: {
    prefix: 'Lohaco',
    top: 'https://lohaco.jp/',
    searchPageSelectors: {
      productsLink: 'div.prodImgBlc > a',
      nextLink: 'p.nextBtn > a',
      searchText: '#jsi-txtKeywd',
      searchButton: 'div.searchBtn'
    },
    productPageSelectors: {
      jan: 'table.prodSpecTable > tbody',
      // category: 'div.blcCategoryNav div.blcCatNav',
      title: 'title'
    },
    productPageImageSelectors: {
      picture: '#elmMainPhoto img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.toHarfWidthAlnum, {
        pattern: /.*LOHACO *\- */g,
        value: ''
      }],
      jan: [_Replacer.REPLACERS.toOneLine, {
        pattern: /.*JANコード\s*/,
        value: ''
      }, {
        pattern: /\s+.*$/g,
        value: ''
      }],
      category: [_Replacer.REPLACERS.toOneSpace]
    }
  }
};

class LohacoSearch extends _JanSearchBase.default {
  /**
   * 検索可能画面になるまで遷移する。
   */
  async init() {
    const popupedModal = await this.existsAll('div.campaignModal > p.close');

    if (popupedModal) {
      this.page.click('div.campaignModal > p.close');
      await this.waitLoaded();
    }
  }

  getSrcConfig() {
    return LOHACO_CONSTANTS.searchConfig;
  }

}

exports.default = LohacoSearch;
//# sourceMappingURL=LohacoSearch.js.map