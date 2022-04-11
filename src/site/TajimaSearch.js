import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const TAJIMA_CONSTANTS = {
  searchConfig: {
    prefix: 'Tajima',
    top: 'http://www.tajimaya-cc.net/',
    lastSupportedDate: '2022/03/16: 00:00:00',
    searchPageSelectors: {
      productsLink: 'ul.prod_list a',
      nextLink: 'a.next',
      searchText: '#search3',
      searchButton: '#product_search2 > button',
    },
    productPageSelectors: {
      jan: '//dt[contains(text(), "JANコード")]/../dd',
      // category: 'li.onmark > p > a',
      title: 'h3.tit_txt',
    },
    productPageImageSelectors: {
      picture: 'div.img_main_wrap img',
    },
  },
};

export default class TajimaSearch extends JanSearchBase {

  getSrcConfig() {
    return TAJIMA_CONSTANTS.searchConfig;
  }
}
