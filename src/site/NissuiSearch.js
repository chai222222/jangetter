import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const NISSUI_CONSTANTS = {
  searchConfig: {
    prefix: 'Nissui',
    top: 'http://www.nissui.co.jp/product/index.html',
    searchPageSelectors: {
      productsLink: 'div.productSnippet > a',
      nextLink: 'div.resultTitle li.pageNext a',
      searchText: 'input#keyword',
      searchButton: 'form[name=frm] input.submit',
    },
    productPageSelectors: {
      jan: '//th[contains(text(), "JANコード")]/../td',
      category: 'ul#pathBody',
      title: 'div.twoLineInner',
    },
    productPageImageSelectors: {
      picture: 'div.productPic > img[alt*=商品写真]',
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidthAlnum,
      ],
      jan: [
        REPLACERS.toNoSpace,
      ],
      category: [
        REPLACERS.toOneLine,
        REPLACERS.toHarfWidthSpace,
        REPLACERS.toOneSpace,
        REPLACERS.trim,
        REPLACERS.toHarfWidth, {
        pattern: /.* 商品紹介\s*>?\s*/g,
        value: '',
      }],
    },
  },
};

export default class NissuiSearch extends JanSearchBase {

  getSrcConfig() {
    return NISSUI_CONSTANTS.searchConfig;
  }
}
