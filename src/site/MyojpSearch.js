import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const MYOJO_CONSTANTS = {
  searchConfig: {
    prefix: 'Myojo',
    top: 'https://www.myojofoods.co.jp/search/',
    lastSupportedDate: '2022/06/02: 19:00:00',
    searchPageSelectors: {
      productsLink: 'div.ns-c-items__item > a',
      onlyCurrentPage: true,
      nextLink: 'section.ns-p-search__results__products a.ns-c-a_button__more',
      searchText: 'header.ns-p-search__header input[name="q"]',
      searchButton: 'button[type="submit"]',
    },
    productPageSelectors: {
      jan: '//dt[contains(text(), "JANコード")]/../dd',
      title: 'h1.ns-headline_01',
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
