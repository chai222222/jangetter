import JanSearchBase, { REPLACERS } from './JanSearchBase';

const CREATESD_CONSTANTS = {
  searchConfig: {
    prefix: 'CreateSD',
    top: 'http://netshop.create-sd.co.jp/shop/default.aspx',
    searchPageSelectors: {
      searchText: '#keyword',
      searchButton: '#keyword + input',
      productsLink: 'div.StyleD_Frame_ > div >div.img_ > a',
      nextLink: 'li.navipage_next_ a',
    },
    productPageSelectors: {
      jan: 'div.goodsdetail_.top_ + div + div > p.txt_',
      category: '#bread-crumb-list',
      title: 'div.common_h2_blue_ h2 span',
    },
    replacer: {
      title: [
        REPLACERS.toHarfWidth,
        REPLACERS.toHarfWidthSpace,
      ],
      jan: [],
      category: [
        REPLACERS.toOneLine,
        REPLACERS.toHarfWidthSpace,
        REPLACERS.toHarfWidth,
        REPLACERS.toOneSpace,
        REPLACERS.trim, {
          pattern: /^\s*ホーム\s*/,
          value: '',
        },
      ],
    },
  },
};

export default class CreateSdSearch extends JanSearchBase {

  getSrcConfig() {
    return CREATESD_CONSTANTS.searchConfig;
  }
}
