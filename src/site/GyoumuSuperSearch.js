import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const GYOUMUSUPER_CONSTANTS = {
  searchConfig: {
    prefix: 'GyoumuSuper',
    top: 'https://www.gyomusuper.jp/item/search.php',
    searchPageSelectors: {
      productsLink: 'div.list_img a',
      onlyCurrentPage: true,
      searchText: 'input.ipt_txt',
      searchButton: 'input.ipt_submit',
    },
    productPageSelectors: {
      jan: '//dt[contains(text(), "JAN")]/../dd',
      title: 'div.detail_info_box h3',
      //categoryがとれないのでなし
    },
    productPageImageSelectors: {
      picture: 'div.detail_img_box img',
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidthAlnum,
      ],
    },
  },
};

export default class GyoumuSuperSearch extends JanSearchBase {

  filterJanUrl(links) {
    return links.filter(url => url.indexOf('item/detail') > 0);
  }

  getSrcConfig() {
    return GYOUMUSUPER_CONSTANTS.searchConfig;
  }
}
