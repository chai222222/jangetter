"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _JanSearchBase = _interopRequireDefault(require("./JanSearchBase"));

var _Replacer = require("../util/Replacer");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TAJIMA_CONSTANTS = {
  searchConfig: {
    name: '但馬屋',
    prefix: 'Tajima',
    top: 'http://www.tajimaya-cc.net/',
    lastSupportedDate: '2024/07/31: 13:00:00',
    searchPageSelectors: {
      productsLink: 'ul.prod_list a',
      nextLink: 'a.next',
      searchText: '#search3',
      searchButton: '#product_search2 > button'
    },
    productPageSelectors: {
      jan: '//dt[contains(text(), "JANコード")]/../dd',
      // category: 'li.onmark > p > a',
      title: {
        selector: ['h1.tit_txt', '//th[contains(text(), "内容量")]/../td'],
        separator: ' '
      },
      allergy: {
        selector: '//th[contains(text(), "原材料")]/../td'
      }
    },
    nullables: {
      allergy: 'null ok'
    },
    productPageImageSelectors: {
      picture: 'div.img_main_wrap img'
    },
    productPageSkipSelectors: ['//th[contains(text(), "カテゴリー")]/../td/a[contains(text(), "冷凍食品")]'],
    replacer: {
      title: [_Replacer.REPLACERS.trim, {
        pattern: /[0-9０-９]+([.．][0-9０-９]+)?[Ａ-Ｚａ-ｚA-Za-z]+$/,
        value: _Replacer.REPLACER_FUNCTIONS.toHarfWidthAlnumDotFunc
      }, // 連結した内容量が数値～英数字～である場合に全角を半角にする
      {
        pattern: /^エース /,
        value: 'エースコック '
      }, {
        pattern: /^おやつC /,
        value: 'おやつカンパニー '
      }, _Replacer.REPLACERS.toOneSpace, {
        pattern: /( [0-9]+[A-Za-z]+)\1/,
        value: '$1'
      } // 空白数字英字が最後に同じ文字列が重複(2つ)になった場合、１つにする
      ],
      allergy: [{
        pattern: /^(?!.*一部に.*を含む).*$/,
        value: ''
      }, // 一部にが含まれない場合すべて削除する
      {
        pattern: /^.*一部に(.*)を含む.*$/,
        value: '$1'
      } // ～一部にxxxxを含むの xxxx を抽出
      ]
    }
  }
};

class TajimaSearch extends _JanSearchBase.default {
  getSrcConfig() {
    return TAJIMA_CONSTANTS.searchConfig;
  }

}

exports.default = TajimaSearch;
//# sourceMappingURL=TajimaSearch.js.map