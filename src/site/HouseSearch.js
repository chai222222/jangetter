import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const HOUSE_CONSTANTS = {
  searchConfig: {
    name: 'ハウス',
    prefix: 'House',
    top: 'https://housefoods.jp/products/index.html',
    searchPageSelectors: {
      productsLink: 'p.mf_url a',
      nextLink: 'li.mf_nextpage a',
      searchText: '#MF_form_phrase_pro',
      searchButton: 'dl.searchArea dd button',
    },
    productPageSelectors: {
      jan: '//th/span[contains(text(), "JAN")]/../../td/span',
      // category: 'p.breadcrumbs',
      title: 'h1.ttlType1',
    },
    productPageImageSelectors: {
      picture: 'figure#detail_package img',
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidthAlnum,
      ],
      category: [
        REPLACERS.toOneLine,
        REPLACERS.toHarfWidthSpace,
        REPLACERS.toOneSpace,
        REPLACERS.trim,
        REPLACERS.toHarfWidth, {
        pattern: /.* 商品カタログ\s*>\s*/g,
        value: '',
      }],
    },
  },
};

export default class HouseSearch extends JanSearchBase {

  filterJanUrl(links) {
    return links.filter(url => url.indexOf('products/catalog/cd') > 0);
  }

  getSrcConfig() {
    return HOUSE_CONSTANTS.searchConfig;
  }
}
