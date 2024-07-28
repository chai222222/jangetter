"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _pIteration = require("p-iteration");

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AEON_CONSTANTS = {
  zip1: '214',
  zip2: '0038',
  searchConfig: {
    name: 'イオン',
    prefix: 'Aeon',
    top: 'https://shop.aeon.com/netsuper/',
    lastSupportedDate: '2024/05/21: 17:00:00',
    searchPageSelectors: {
      productsLink: 'div.search.results ol li > a',
      nextLink: '//div[contains(concat(" ", normalize-space(@class), " "), " main ")]/div[last()]//a[@tabindex=0]/span[contains(text(), "次")]',
      searchText: '#search',
      searchButton: '#cx-search-button'
    },
    productPageSelectors: {
      jan: 'p.jan-code',
      // category: '#recently_category ul',
      title: 'div.product-info-main H2.section-title-text'
    },
    productPageImageSelectors: {
      picture: 'img.fotorama__img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.trim, _Replacer.REPLACERS.toHarfWidthSpace],
      jan: [{
        pattern: /\D/g,
        value: ''
      }],
      category: [_Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim]
    }
  }
};

class AeonSearch extends _JanSearchBase.default {
  /**
   * 検索可能画面になるまで遷移する。
   */
  async init() {
    const needInputShop = await this.existsAll('#zip1', '#zip2', '#shop_search_1');

    if (needInputShop) {
      await this.page.type('#zip1', AEON_CONSTANTS.zip1);
      await this.page.type('#zip2', AEON_CONSTANTS.zip2);
      await this.page.click('#shop_search_1');
      await this.page.waitFor(1000);
      await this.page.click('#shop_search_result_list_area .result-list-area a'); // await this.page.waitFor(10000);

      await this.waitLoaded();
    }

    const fairDialogClose = await this.existsAll('a.pc2015-close');

    if (fairDialogClose) {
      await this.page.click('a.pc2015-close');
      await this.waitLoaded();
    } // const banner = await this.existsAll('#pc2015-popup-ad-banner a.pc2015-close');
    // if (banner) {
    //   await this.page.click('#pc2015-popup-ad-banner a.pc2015-close');
    // }

  }

  getSrcConfig() {
    return AEON_CONSTANTS.searchConfig;
  }

}

exports.default = AeonSearch;
//# sourceMappingURL=AeonSearch.js.map