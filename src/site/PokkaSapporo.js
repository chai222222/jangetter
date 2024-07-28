import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const POKKASAPPORO_CONSTANTS = {
  searchConfig: {
    name: 'ポッカ',
    prefix: 'PokkaSapporo',
    top: 'https://www.pokkasapporo-fb.jp/products/',
    searchPageSelectors: {
      searchText: 'input.c-form__search',
      searchButton: 'input.c-button',
      productsLink: 'p.mf_url > a',
      nextLink: 'li.mf_nextpage > a',
    },
    productPageSelectors: {
      jan: 'td.v_jan_code',
      title: 'h1',
    },
    productPageImageSelectors: {
      picture: 'div.products-mainImg img',
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidth,
        REPLACERS.toHarfWidthSpace,
        REPLACERS.trim,
      ],
      jan: [],
      category: [
        REPLACERS.toHarfWidthSpace,
        REPLACERS.toHarfWidth,
        REPLACERS.toOneSpace,
        REPLACERS.trim,
      ],
    },
  },
};

export default class MorinagaSearch extends JanSearchBase {

  filterJanUrl(links) {
    return links.filter(url => url.indexOf('detail') > 0);
  }

  getSrcConfig() {
    return POKKASAPPORO_CONSTANTS.searchConfig;
  }
}
