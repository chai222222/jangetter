import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const IYEC_CONSTANTS = {
  searchConfig: {
    prefix: 'Iyec',
    top: 'https://iyec.omni7.jp',
    searchPageSelectors: {
      productsLink: 'div.mod-spetialBrand p.productImg > a',
      nextLink: 'p.paginationNavBtn > a.next',
      searchText: '#keyword',
      searchButton: 'form[name=search] button[type=submit]',
    },
    productPageSelectors: {
      jan: 'div.mod-table2col_22 tbody > tr:first-child td',
      category: 'ol.breadcrumb',
      title: 'title',
    },
    productPageImageSelectors: {
      picture: 'li[data-large-image] img.slidersImg.u-img[src*="main_l"]', // 2つマッチする
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidthAlnum, {
          pattern: /.*ネット通販./g,
          value: '',
        }, {
          pattern: / +通販 *$/g,
          value: '',
        }, {
          pattern: /　+/g,
          value: ' ',
        },
      ],
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

export default class IyecSearch extends JanSearchBase {

  getSrcConfig() {
    return IYEC_CONSTANTS.searchConfig;
  }
}
