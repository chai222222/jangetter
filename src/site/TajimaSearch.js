import JanSearchBase from './JanSearchBase';

const TAJIMA_CONSTANTS = {
  searchConfig: {
    prefix: 'Tajima',
    top: 'http://www.tajimaya-cc.net/',
    searchPageSelectors: {
      productsLink: 'div.boxProduct > a',
      nextLink: '#page_navi_top div.navi > a:last-child',
      searchText: 'p.searchftxt input',
      searchButton: '#search_form p.btn input',
    },
    productPageSelectors: {
      jan: '#product_code_default',
      category: 'li.onmark > p > a',
      title: 'title',
    },
    replacer: {
      title: [{
        pattern: /.*株式会社タジマヤ *\/ */g,
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
        pattern: /\D/g,
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

  getSrcConfig() {
    return TAJIMA_CONSTANTS.searchConfig;
  }
}
