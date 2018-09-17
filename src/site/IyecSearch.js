import JanSearchBase from './JanSearchBase';

const IYEC_CONSTANTS = {
  searchConfig: {
    prefix: 'Iyec',
    top: 'https://iyec.omni7.jp',
    searchPageSelectors: {
      productsLink: 'div.mod-spetialBrand p.productImg > a',
      nextLink: 'p.paginationNavBtn > a',
      searchText: '#keyword',
      searchButton: 'form[name=search] button[type=submit]',
    },
    productPageSelectors: {
      jan: 'div.mod-table2col_22 tbody > tr:first-child td',
      category: 'ol.breadcrumb',
      title: 'title',
    },
    replacer: {
      title: [{
        pattern: /.*ネット通販./g,
        value: '',
      }, {
        pattern: / +通販 *$/g,
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

export default class IyecSearch extends JanSearchBase {

  getSrcConfig() {
    return IYEC_CONSTANTS.searchConfig;
  }
}
