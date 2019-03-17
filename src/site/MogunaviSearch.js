import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const MOGUNAVI_CONSTANTS = {
  searchConfig: {
    prefix: 'Mogunavi',
    top: 'https://mognavi.jp/',
    searchPageSelectors: {
      cushion: '#searchResList p.more a',
      nextLink: '//div[@id="main"]/div[1]/p[@class="nam"]/a[contains(text(), "次の20")]',
      productsLink: '#searchResList li h3 > a',
      searchText: '#headerSearch input[name="keyword"]',
      searchButton: '#food_search_button',
    },
    productPageSelectors: {
      jan: '#pInfo > p + table tbody',
      category: '#pInfo td.category a',
      title: 'h2.item span.fn span.food-name',
    },
    productPageImageSelectors: {
      picture: '#foodPhoto',
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidthAlnum,
        REPLACERS.toHarfWidthSpace,
      ],
      jan: [{
        pattern: /\r?\n/g,
        value: '',
      }, {
        pattern: /.*JANコード\s*/,
        value: '',
      }, {
        pattern: /\s+.*$/g,
        value: '',
      }],
      category: [{
        pattern: /\s+/g,
        value: ' ',
      }],
    },
  },
};

export default class MogunaviSearch extends JanSearchBase {

  getSrcConfig() {
    return MOGUNAVI_CONSTANTS.searchConfig;
  }

}
