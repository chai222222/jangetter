import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const LOHACO_CONSTANTS = {
  searchConfig: {
    prefix: 'Lohaco',
    top: 'https://lohaco.jp/',
    searchPageSelectors: {
      productsLink: 'div.prodImgBlc > a',
      nextLink: 'p.nextBtn > a',
      searchText: '#jsi-txtKeywd',
      searchButton: 'div.searchBtn',
    },
    productPageSelectors: {
      jan: 'table.prodSpecTable > tbody',
      category: 'div.blcCategoryNav div.blcCatNav',
      title: 'title',
    },
    productPageImageSelectors: {
      picture: '#elmMainPhoto img',
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidthSpace,
        REPLACERS.toOneSpace,
        REPLACERS.toHarfWidthAlnum, {
          pattern: /.*LOHACO *\- */g,
          value: '',
        },
      ],
      jan: [
        REPLACERS.toOneLine, {
          pattern: /.*JANコード\s*/,
          value: '',
        }, {
          pattern: /\s+.*$/g,
          value: '',
        }
      ],
      category: [
        REPLACERS.toOneSpace,
      ],
    },
  },
};

export default class TajimaSearch extends JanSearchBase {

  /**
   * 検索可能画面になるまで遷移する。
   */
  async init() {
    const popupedModal = await this.existsAll('div.campaignModal > p.close');
    if (popupedModal) {
      this.page.click('div.campaignModal > p.close')
      await this.waitLoaded();
    }
  }

  getSrcConfig() {
    return LOHACO_CONSTANTS.searchConfig;
  }
}
