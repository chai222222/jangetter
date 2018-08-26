import { map, mapSeries } from 'p-iteration';

const AEON_CONSTANTS = {
  timeout: 30000,
  top: 'https://www.aeonnetshop.com/',
  zip1: '214',
  zip2: '0038',
  replacer: {
    title: [{
      pattern: /おうちでイオン イオンネットスーパー|: イオン本牧店/g,
      value: '',
    }],
    jan: [{
      pattern: /\D/g,
      value: '',
    }],
    category: [{
      pattern: /\t/g,
      value: '',
    }, {
      pattern: /^\n+/,
      value: '',
    }, {
      pattern: /\n+$/,
      value: '',
    }, {
      pattern: /\n/g,
      value: ';',
    }],
  },
};

export default class AeonSearch {

  constructor(page) {
    this.page = page;
  }

  /**
   * セレクタが全て存在するかチェックします。
   * @param {*} selectors
   */
  async existsAll(...selectors) {
    return selectors.every(async (selector) => (await this.page.$(selector)) !== null);
  }

  /**
   * ページロードを待ちます。
   */
  async waitLoaded() {
    console.log('*** waitLoaded ***');
    return await this.page.waitForNavigation({ timeout: AEON_CONSTANTS.timeout, waitUntil: 'domcontentloaded'});
  }

  /**
   * 検索可能画面になるまで遷移する。
   */
  async init() {
    const needInputShop = await this.existsAll('#zip1', '#zip2', '#shop_search_1');
    if (needInputShop) {
      await this.page.type('#zip1', AEON_CONSTANTS.zip1);
      await this.page.type('#zip2', AEON_CONSTANTS.zip2) ;
      this.page.click('#shop_search_1')
      await this.page.waitFor(1000);
      this.page.click('div.pc2015-main div.pc2015-select-menu-result a');
      // await this.page.waitFor(10000);
      await this.waitLoaded();
    }
    // const banner = await this.existsAll('#pc2015-popup-ad-banner a.pc2015-close');
    // if (banner) {
    //   await this.page.click('#pc2015-popup-ad-banner a.pc2015-close');
    // }
  }

  /**
   * 引数で渡された検索ワードを検索して jan 情報を返します。
   */
  async janSearch(...keywords) {
    console.log('*** janSearch ***');
    await this.page.goto(AEON_CONSTANTS.top, {waitUntil: 'networkidle2'});
    await this.init(); // 検索できる画面までの画面処理をする。
    return await Array.prototype.concat.apply([], await map(keywords, async keyword => await this.searchWord(keyword)));
  }

  /**
   * １キーワードの検索処理を行って、すべてのjan情報を返します。
   * @param {*} word
   */
  async searchWord(word) {
    console.log('*** searchWord ***');
    await this.page.type('#keyword', word);
    await this.page.click('input[name=search]');
    await this.waitLoaded();
    return await this.eachItemFromSearchResult();
  }

  /**
   * 検索結果画面の商品分のリンク先を取得し、すべてのjan情報をかえします。　
   */
  async eachItemFromSearchResult() {
    console.log('*** eachItemFromSearchResult ***');
    const links = await this.page.$$eval('ul.pc2015-item-list-selectable li > a:first-child', list => list.map(item => item.href));
    console.log(links);
    return await mapSeries(links, async link => {
      await this.page.goto(link, {waitUntil: 'networkidle2'});
      return await this.getJan();
    });
  }

  /**
   * 商品ページからjan情報をかえします。
   */
  async getJan() {
    console.log('*** getJan ***');
    return this.replceValues(AEON_CONSTANTS.replacer, {
      jan: await this.page.$eval('div.pc2015-item-other', item => item.textContent),
      category: await this.page.$eval('div.pc2015-main-block-body', item => item.textContent),
      title: await this.page.$eval('title', item => item.textContent),
    });
  }

  /**
   * jan, title, categoryの値を定義にそって置き換えを行います。
   */
  replceValues(replaceDef, obj) {
    const nobj = { ...obj };
    Object.keys(replaceDef).filter(key => key in nobj)
      .forEach(key => nobj[key] = replaceDef[key].reduce((acc, def) => {
        acc = acc.replace(def.pattern, def.value);
        return acc;
      }, nobj[key]));
    return nobj;
  }
}
