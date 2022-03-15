import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

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
      // category: 'div.navitopicpath_',
      title: 'title',
    },
    productPageImageSelectors: {
      picture: '#image_l_',
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidthSpace,
        REPLACERS.toHarfWidthAlnum,
        REPLACERS.toOneSpace,
        REPLACERS.trim, {
          pattern: /.*問屋 *国分ネット卸 */g,
          value: '',
        }, {
          pattern: / *: .*/g, // 不要部分を削除
          value: '',
        },
      ],
      jan: [{
        pattern: /\D/g,
        value: '',
      }],
      category: [
        REPLACERS.toOneSpace, {
          pattern: /問屋 *国分ネット卸：トップ *> */g,
          value: '',
        },
      ],
    },
  },
};

export default class KokubuSearch extends JanSearchBase {

  getSrcConfig() {
    return KOKUBU_CONSTANTS.searchConfig;
  }
}
