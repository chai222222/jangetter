import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const KENKOCOM_CONSTANTS = {
  searchConfig: {
    prefix: 'Kenkocom',
    top: 'https://www.kenko.com/',
    searchPageSelectors: {
      searchText: '#searchText',
      searchButton: '#searchForm input[type="submit"]',
      nextLink: 'li.next',
      productsLink: 'li[itemtype="http://data-vocabulary.org/Product"] > a',
    },
    productPageSelectors: {
      jan: '#janCode',
      category: 'ul.breadcrumbTypeA01',
      title: 'h2.itemTitle',
    },
    productPageImageSelectors: {
      picture: '#view img',
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidth,
      ],
      category: [
        REPLACERS.toHarfWidth,
        REPLACERS.toOneSpace,
        REPLACERS.trim,
      ],
    },
  },
};

export default class KenkocomSearch extends JanSearchBase {

  getSrcConfig() {
    return KENKOCOM_CONSTANTS.searchConfig;
  }
}
