import JanSearchBase from './JanSearchBase';
import { REPLACERS } from '../util/Replacer';

const IYEC_CONSTANTS = {
  zip: '2140038',
  searchConfig: {
    prefix: 'Iyec',
    top: 'https://www.iy-net.jp/',
    lastSupportedDate: '2022/06/02: 17:00:00(暫定 --debug-window 必須)',
    searchPageSelectors: {
      productsLink: 'div.Presenter__ProductImgGroup-sc-ip6p2i-1 > a',
      productsPageWaiter: [ 'div.SearchProduct__PageTitleWrapper-sc-1yd8y9g-2' ],
      productsPageCounter: 'div.PageInfo__Wrapper-sc-1kvc99-0 p:nth-child(2)',
      nextLink: '//button[contains(text(), "次のページへ")]',
      searchText: 'input[name="searchWord"]',
      searchButton: 'header button',
    },
    productPageSelectors: {
      jan: 'url',
      // category: 'ol.breadcrumb',
      title: 'p.ProductNameArea__ProductNameText-sc-11k1ztn-2',
    },
    productPageImages: {
      downloader: 'puppeteer',
    },
    productPageImageSelectors: {
      picture: 'div.Items__MainContent-sc-1fzjknj-0 img', // 複数マッチする
    },
    replacer: {
      jan: [{
        pattern: /^.*\/(\d+)\/$/,
        value: '$1',
      }],
      category: [{
        pattern: /\s+/g,
        value: ' ',
      }],
    },
  },
};

export default class IyecSearch extends JanSearchBase {
  static SEL_ZIP = 'input[name="postalNumber"]';
  static SEL_ZIP_SRC = 'button[data-testid="post-number-search-button"]';

  /**
   * 検索可能画面になるまで遷移する。
   */
  async init() {
    const config = IYEC_CONSTANTS.searchConfig;
    let count = 10;
    while (count-- > 0) {
      // await this.page.screenshot({ path: `./fullpage_${count}.png`, fullPage: true });
      // LOGOUT画面確認
      const loginButton = await this.existsAll('button.link-btn');
      if (loginButton) {
        console.log('LOGOUT → TOP画面');
        await this.page.click('header.st-header a');
        await this.waitLoaded();
        continue;
      }
      const toTop = '//button[contains(text(), "トップページへ戻る")]';
      if (toTop && toTop > 0) {
        console.log('SYSERR → TOP画面');
        await this.xselectLink(toTop[0])
        await this.waitLoaded();
        continue;
      }
      const needInputShop = await this.existsAll(IyecSearch.SEL_ZIP, IyecSearch.SEL_ZIP_SRC);
      if (needInputShop) {
        console.log('ZIP入力');
        await this.page.type(IyecSearch.SEL_ZIP, IYEC_CONSTANTS.zip);
        await this.page.waitFor(1000);
        await this.page.click(IyecSearch.SEL_ZIP_SRC)
        await this.page.waitFor(5000);
        await this.waitLoaded();
        continue;
      }
      const searchWord = await this.existsAll(config.searchPageSelectors.searchText);
      if (!searchWord) {
        console.log('検索準備', count);
        if (count) {
          await this.page.waitFor(5000);
          continue;
        } else {
          throw new Error('検索準備ができませんでした');
        }
      } else {
        count = 0;
      }
    }
    // await this.page.screenshot({ path: './fullpage_inited.png', fullPage: true });
  }

  getSrcConfig() {
    return IYEC_CONSTANTS.searchConfig;
  }
}
