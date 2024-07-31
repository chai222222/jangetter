"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const KOKUBU_CONSTANTS = {
  searchConfig: {
    name: '問屋国分ネット卸',
    prefix: 'Kokubu',
    top: 'http://netton.kokubu.jp/shop/default.aspx',
    searchPageSelectors: {
      productsLink: 'span.image_with_link a',
      scrollToBottom: true,
      searchText: '#keyword',
      searchButton: 'input[name="image"]'
    },
    productPageSelectors: {
      jan: '#spec_item_code',
      // category: 'div.navitopicpath_',
      title: 'title'
    },
    productPageImageSelectors: {
      picture: '#image_l_'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toHarfWidthAlnum, _Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim, {
        pattern: /.*問屋 *国分ネット卸 */g,
        value: ''
      }, {
        pattern: / *: .*/g,
        // 不要部分を削除
        value: ''
      }],
      jan: [{
        pattern: /\D/g,
        value: ''
      }],
      category: [_Replacer.REPLACERS.toOneSpace, {
        pattern: /問屋 *国分ネット卸：トップ *> */g,
        value: ''
      }]
    }
  }
};

class KokubuSearch extends _JanSearchBase.default {
  getSrcConfig() {
    return KOKUBU_CONSTANTS.searchConfig;
  }

}

exports.default = KokubuSearch;
//# sourceMappingURL=KokubuSearch.js.map