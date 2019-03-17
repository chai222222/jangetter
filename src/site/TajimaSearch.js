import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

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
    productPageImageSelectors: {
      picture: 'img.picture',
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidthSpace,
        REPLACERS.toHarfWidthAlnum, {
          pattern: /.*株式会社タジマヤ *\/ */g,
          value: '',
        },
      ],
      jan: [{
        pattern: /\D/g,
        value: '',
      }],
      category: [
        REPLACERS.toOneLine
      ],
    },
  },
};

export default class TajimaSearch extends JanSearchBase {

  getSrcConfig() {
    return TAJIMA_CONSTANTS.searchConfig;
  }
}
