import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const SUNYO_CONSTANTS = {
  searchConfig: {
    prefix: 'Sunyo',
    top: 'http://www.sunyo-do.co.jp/cgi-bin/ksearch/ksearch.cgi',
    searchPageSelectors: {
      productsLink: 'dl.search dt a',
      nextLink: 'dl.search + p > b + a',
      searchText: 'form.find input[name="q"]',
      searchButton: 'form.find input[type="submit"]',
    },
    productPageSelectors: {
      jan: '//th[contains(text(), "JANｺｰﾄﾞ")]/../td',
      // category: 'p.breadcrumb',
      title: '//th[contains(text(), "品名")]/../td',
    },
    productPageImageSelectors: {
      picture: 'p.canimg > a',
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
        pattern: /.*SUNYO製品>/g,
        value: '',
      }],
    },
  },
};

export default class SunyoSearch extends JanSearchBase {

  filterJanUrl(links) {
    return links.filter(url => url.indexOf('products/data') > 0);
  }

  getSrcConfig() {
    return SUNYO_CONSTANTS.searchConfig;
  }
}
