import JanSearchBase from './JanSearchBase';

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
    replacer: {
      title: [{
        pattern: /.*LOHACO *\- */g,
        value: '',
      }, {
        pattern: /　+/g,
        value: ' ',
      }, {
        pattern: /[Ａ-Ｚａ-ｚ０-９]/g,
        value: (s) => {
          return String.fromCharCode(s.charCodeAt(0) - 65248);
        },
      }],
      jan: [{
        pattern: /\r?\n/g,
        value: '',
      }, {
        pattern: /.*JANコード */,
        value: '',
      }, {
        pattern: / +.*$/g,
        value: '',
      }],
      category: [{
        pattern: /\s+/g,
        value: ' ',
      }],
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
