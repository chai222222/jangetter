import JanSearchBase, { REPLACERS } from './JanSearchBase';

const MORINAGA_CONSTANTS = {
  searchConfig: {
    prefix: 'Morinaga',
    top: 'https://www.morinaga.co.jp/products/',
    searchPageSelectors: {
      searchText: '#SS_searchQuery3',
      searchButton: '#SS_searchQuery3 + input',
      productsLink: 'div.SS_item > div.SS_image > a',
      nextLink: 'span.SS_nextPage > a',
    },
    productPageSelectors: {
      jan: 'div.products-detailBox__inner dl.products-detailBox__list dd:last-child',
      category: 'div.products-detailContents div.headingType02 p.headingType02__txt',
      title: 'div.products-mainBox h2.headingType01__txt',
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidth,
        REPLACERS.toHarfWidthSpace,
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

  async getAllJanUrls() {
    const links = await super.getAllJanUrls();
    return links.filter(url => url.indexOf('detail') > 0);
  }

  getSrcConfig() {
    return MORINAGA_CONSTANTS.searchConfig;
  }
}
