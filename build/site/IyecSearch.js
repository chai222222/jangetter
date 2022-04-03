"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const IYEC_CONSTANTS = {
  searchConfig: {
    prefix: 'Iyec',
    top: 'https://iyec.omni7.jp',
    searchPageSelectors: {
      productsLink: 'div.mod-spetialBrand p.productImg > a',
      nextLink: 'p.paginationNavBtn > a.next',
      searchText: '#keyword',
      searchButton: 'form[name=search] button[type=submit]'
    },
    productPageSelectors: {
      jan: 'div.mod-table2col_22 tbody > tr:first-child td',
      // category: 'ol.breadcrumb',
      title: 'title'
    },
    productPageImageSelectors: {
      picture: 'li[data-large-image] img.slidersImg.u-img[src*="main_l"]' // 2つマッチする

    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthAlnum, {
        pattern: /.*ネット通販./g,
        value: ''
      }, {
        pattern: / +通販 *$/g,
        value: ''
      }, {
        pattern: /　+/g,
        value: ' '
      }],
      jan: [{
        pattern: /\D/g,
        value: ''
      }],
      category: [{
        pattern: /\s+/g,
        value: ' '
      }]
    }
  }
};

class IyecSearch extends _JanSearchBase.default {
  getSrcConfig() {
    return IYEC_CONSTANTS.searchConfig;
  }

}

exports.default = IyecSearch;
//# sourceMappingURL=IyecSearch.js.map