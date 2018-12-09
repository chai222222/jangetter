import JanSearchBase from './JanSearchBase';

const KOKUBU_CONSTANTS = {
  searchConfig: {
    prefix: 'Kokubu',
    top: 'http://netton.kokubu.jp/shop/default.aspx',
    searchPageSelectors: {
      productsLink: 'span.image_with_link a',
      scrollToBottom: true,
      searchText: '#keyword',
      searchButton: 'input[name="image"]',
    },
    productPageSelectors: {
      jan: '#spec_item_code',
      category: 'div.navitopicpath_',
      title: 'title',
    },
    replacer: {
      title: [{
        pattern: /.*問屋 *国分ネット卸 */g,
        value: '',
      }, {
        pattern: /[ 　]+/g, // 全角空白半角空白を１つの空白に
        value: ' ',
      }, {
        pattern: / *: .*/g, // 不要部分を削除
        value: '',
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
        pattern: /問屋 *国分ネット卸：トップ *> */g,
        value: '',
      }, {
        pattern: /\s+/g,
        value: ' ',
      }],
    },
  },
};

export default class KokubuSearch extends JanSearchBase {

  getSrcConfig() {
    return KOKUBU_CONSTANTS.searchConfig;
  }
}
