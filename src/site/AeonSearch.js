import { map, mapSeries } from 'p-iteration';
import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const AEON_CONSTANTS = {
  zip1: '214',
  zip2: '0038',
  searchConfig: {
    prefix: 'Aeon',
    top: 'https://www.aeonnetshop.com/',
    searchPageSelectors: {
      productsLink: 'div.search.results ol li > a',
      nextLink: '//div[@class="column main"]/div[last()]//a[@tabindex=0]/span[contains(text(), "次")]',
      searchText: '#search',
      searchButton: '#cx-search-button',
    },
    productPageSelectors: {
      jan: 'p.jan-code',
      category: '#recently_category ul',
      title: 'div.product-info-main H2.section-title-text',
    },
    productPageImageSelectors: {
      picture: 'img.fotorama__img',
    },
    replacer: {
      title: [
        REPLACERS.trim,
        REPLACERS.toHarfWidthSpace,
        REPLACERS.toHarfWidthSpace,
      ],
      jan: [{
        pattern: /\D/g,
        value: '',
      }],
      category: [
        REPLACERS.toOneSpace,
        REPLACERS.trim,
      ],
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
      this.page.click('#shop_search_result_list_area .result-list-area a');
      // await this.page.waitFor(10000);
      await this.waitLoaded();
    }
    const fairDialogClose = await this.existsAll('a.pc2015-close');
    if (fairDialogClose) {
      this.page.click('a.pc2015-close');
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
