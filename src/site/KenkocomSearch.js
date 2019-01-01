import JanSearchBase, { REPLACERS } from './JanSearchBase';

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
    replacer: {
      title: [
        REPLACERS.toHarfWidth,
      ],
      category: [
        REPLACERS.toHarfWidth,
        {
          pattern: /\s+/g,
          value: ' ',
        }, {
          pattern: /\s+$/g,
          value: '',
        }
      ],
    },
  },
};

export default class KenkocomSearch extends JanSearchBase {

  getSrcConfig() {
    return KENKOCOM_CONSTANTS.searchConfig;
  }
}
