"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const COOP_CONSTANTS = {
  searchConfig: {
    prefix: 'Coop',
    top: 'https://mdinfo.jccu.coop/bb/',
    lastSupportedDate: '2022/05/24: 20:00:00',
    searchPageSelectors: {
      productsLink: '#bubble_tooltip + table td:nth-child(2) a[href*="/bb/"]',
      nextLink: 'td.detail span.next a',
      searchText: '#shohin',
      searchButton: '#shohin + input'
    },
    productPageSelectors: {
      jan: '#basicInfo tbody > tr:nth-child(2) td img',
      // category: '#basicInfo tbody > tr:first-child td',
      title: 'title'
    },
    productPageImageSelectors: {
      picture: '#basicInfo .itemPhoto img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthAlnum, {
        pattern: / < .*/g,
        value: ''
      }, {
        pattern: /^/g,
        value: 'コープ '
      }],
      jan: [{
        pattern: /^.*shohindetail\/(\d+)\/?.*/,
        value: '$1'
      }],
      category: [_Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim]
    }
  }
};

class CoopSearch extends _JanSearchBase.default {
  getSrcConfig() {
    return COOP_CONSTANTS.searchConfig;
  }

  async getPageText(key) {
    if (key === 'jan') {
      console.log(this.getSrcConfig().productPageSelectors[key]);
      return await this.page.$eval(this.getSrcConfig().productPageSelectors[key], item => item.baseURI);
    } else {
      return super.getPageText(key);
    }
  }

}

exports.default = CoopSearch;
//# sourceMappingURL=CoopSearch.js.map