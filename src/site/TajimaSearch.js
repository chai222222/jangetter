import JanSearchBase from './JanSearchBase';
import { REPLACERS, REPLACER_FUNCTIONS } from '../util/Replacer';

const TAJIMA_CONSTANTS = {
  searchConfig: {
    name: '但馬屋',
    prefix: 'Tajima',
    top: 'http://www.tajimaya-cc.net/',
    lastSupportedDate: '2022/05/24: 18:00:00',
    searchPageSelectors: {
      productsLink: 'ul.prod_list a',
      nextLink: 'a.next',
      searchText: '#search3',
      searchButton: '#product_search2 > button',
    },
    productPageSelectors: {
      jan: '//dt[contains(text(), "JANコード")]/../dd',
      // category: 'li.onmark > p > a',
      title: {
        selector: [
          'h1.tit_txt',
          '//th[contains(text(), "内容量")]/../td',
        ],
        separator: ' ',
      },
      allergy: {
        selector: '//th[contains(text(), "原材料")]/../td',
      },
    },
    nullables: {
      allergy: 'null ok',
    },
    productPageImageSelectors: {
      picture: 'div.img_main_wrap img',
    },
    replacer: {
      title: [
        { pattern: /[０-９]+\w+$/, value: REPLACER_FUNCTIONS.toHarfWidthDigitOnly }, // 連結した内容量が全角数値＋半角単位である場合に半角にする
        { pattern: /^エース /, value: 'エースコック '},
        { pattern: /^おやつC /, value: 'おやつカンパニー '},
        REPLACERS.toOneSpace,
        REPLACERS.trim,
      ],
      allergy: [
        { pattern: /^(?!.*一部に.*を含む).*$/, value: '' }, // 一部にが含まれない場合すべて削除する
        { pattern: /^.*一部に(.*)を含む.*$/, value: '$1' }, // ～一部にxxxxを含むの xxxx を抽出
      ],
    },
  },
};

export default class TajimaSearch extends JanSearchBase {

  getSrcConfig() {
    return TAJIMA_CONSTANTS.searchConfig;
  }
}
