import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const MYOJO_CONSTANTS = {
  searchConfig: {
    name: '明星食品',
    prefix: 'Myojo',
    top: 'https://www.myojofoods.co.jp/search/',
    lastSupportedDate: '2024/07/31: 13:00:00',
    searchPageSelectors: {
      productsLink: 'div.ns-c-items__item > a',
      onlyCurrentPage: true,
      nextLink: 'section.ns-p-search__results__products a.ns-c-a_button__more',
      searchText: 'header.ns-p-search__header input[name="q"]',
      searchButton: 'button[type="submit"]',
    },
    productPageSelectors: {
      jan: '//dt[contains(text(), "JANコード")]/../dd',
      title: {
        selector: [
          'h1.ns-headline_01',
          '//dt[contains(text(), "内容量")]/../dd',
        ],
        separator: ' ',
      },
      allergy: {
        selector: 'ul.ns-c-list_allergens--item li.active a',
      },
    },
    productPageImages: {
      suffix: '.jpeg',
    },
    productPageImageSelectors: {
      picture: 'section.ns-p-item__main img',
    },
    replacer: {
      title: [
        { pattern: /(\w+) *\( *\w+ *\) *$/, value: '$1' },
        REPLACERS.toOneSpace,
        REPLACERS.trim,
      ],
    },
  },
};

export default class MyojoSearch extends JanSearchBase {

  getSrcConfig() {
    return MYOJO_CONSTANTS.searchConfig;
  }
}
