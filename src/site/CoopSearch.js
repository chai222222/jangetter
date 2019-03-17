import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const COOP_CONSTANTS = {
  searchConfig: {
    prefix: 'Coop',
    top: 'https://mdinfo.jccu.coop/bb/',
    searchPageSelectors: {
      productsLink: '#bubble_tooltip + table td:nth-child(2) a[href*="/bb/"]',
      nextLink: 'a.next:first-child',
      searchText: '#shohin',
      searchButton: '#shohin + input',
    },
    productPageSelectors: {
      jan: '#basicInfo tbody > tr:nth-child(2) td img',
      category: '#basicInfo tbody > tr:first-child td',
      title: 'title',
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidthAlnum, {
          pattern: / < .*/g,
          value: '',
        }, {
          pattern: /^/g,
          value: 'コープ ',
        }
      ],
      jan: [{
        pattern: /^.*shohindetail\//,
        value: '',
      }, {
        pattern: /\/psspu.*$/,
        value: '',
      }, {
        pattern: /\D/g,
        value: '',
      }],
      category: [
        REPLACERS.toOneSpace,
        REPLACERS.trim,
      ],
    },
  },
};

export default class CoopSearch extends JanSearchBase {

  getSrcConfig() {
    return COOP_CONSTANTS.searchConfig;
  }

  async getPageText(key) {
    if (key === 'jan') {
      console.log(this.getSrcConfig().productPageSelectors[key]);
      return await this.page.$eval(this.getSrcConfig().productPageSelectors[key], item => item.baseURI);
    } else {
      return super.getPageText(key);
    }
  }
}
