import { map, mapSeries } from 'p-iteration';
import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const MATSUMOTOKIYOSHI_CONSTANTS = {
  searchConfig: {
    prefix: 'MatsumotoKiyoshi',
    top: 'https://www.matsukiyo.co.jp/store/online/',
    searchPageSelectors: {
      productsLink: 'div.resultList ul > li > p.img > a',
      nextLink: '#searchMore',
      searchText: '#frmTopPageHeaderSearchTxt',
      searchButton: '#frmTopPageHeaderSearchBtn',
    },
    productPageSelectors: {
      jan: 'p.cpde',
      // category: 'div.breadcrumb ul',
      title: 'div.goodsBox > h3',
    },
    productPageImageSelectors: {
      picture: 'div.goodsDetail ul.bxslider > li > a',
    },
    replacer: {
      title: [
        REPLACERS.trim,
        REPLACERS.toHarfWidthSpace,
        REPLACERS.toHarfWidthAlnum,
      ],
      jan: [
        REPLACERS.toOneLine,
        {
          pattern: /.*JAN\D+(\d+).*/g,
          value: '$1',
        }
      ],
      category: [
        REPLACERS.toOneSpace,
        REPLACERS.trim,
      ],
    },
  },
};

export default class MatsumotoKiyoshiSearch extends JanSearchBase {

  getSrcConfig() {
    return MATSUMOTOKIYOSHI_CONSTANTS.searchConfig;
  }
}
