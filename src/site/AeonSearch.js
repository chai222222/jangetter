import { map, mapSeries } from 'p-iteration';
import JanSearchBase from './JanSearchBase';

const AEON_CONSTANTS = {
  zip1: '214',
  zip2: '0038',
  searchConfig: {
    top: 'https://www.aeonnetshop.com/',
    searchPageSelectors: {
      productsLink: 'ul.pc2015-item-list-selectable li > a:first-child',
      nextLink: 'div.pc2015-item-list-header a[rel=next]',
      searchText: '#keyword',
      searchButton: 'input[name=search]',
    },
    productPageSelectors: {
      jan: 'div.pc2015-item-other',
      category: 'div.pc2015-main-block-body',
      title: 'title',
    },
    replacer: {
      title: [{
        pattern: /おうちでイオン イオンネットスーパー|: イオン本牧店/g,
        value: '',
      }],
      jan: [{
        pattern: /\D/g,
        value: '',
      }],
      category: [{
        pattern: /\t/g,
        value: '',
      }, {
        pattern: /^\n+/,
        value: '',
      }, {
        pattern: /\n+$/,
        value: '',
      }, {
        pattern: /\n/g,
        value: ';',
      }],
    },
  },
};

export default class AeonSearch extends JanSearchBase {

  /**
   * 検索可能画面になるまで遷移する。
   */
  async init() {
    const needInputShop = await this.existsAll('#zip1', '#zip2', '#shop_search_1');
    if (needInputShop) {
      await this.page.type('#zip1', AEON_CONSTANTS.zip1);
      await this.page.type('#zip2', AEON_CONSTANTS.zip2) ;
      this.page.click('#shop_search_1')
      await this.page.waitFor(1000);
      this.page.click('div.pc2015-main div.pc2015-select-menu-result a');
      // await this.page.waitFor(10000);
      await this.waitLoaded();
    }
    // const banner = await this.existsAll('#pc2015-popup-ad-banner a.pc2015-close');
    // if (banner) {
    //   await this.page.click('#pc2015-popup-ad-banner a.pc2015-close');
    // }
  }

  getSrcConfig() {
    return AEON_CONSTANTS.searchConfig;
  }
}
