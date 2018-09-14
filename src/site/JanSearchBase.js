import { map, mapSeries, every } from 'p-iteration';

export default class JanSearchBase {

  constructor(page, errors) {
    this.page = page;
    this.errors = errors;
    this.timeout = 30000;
  }

  /**
   * セレクタが全て存在するかチェックします。
   * @param {*} selectors
   */
  async existsAll(...selectors) {
    return selectors.length > 0 && every(selectors, async (selector) => (await this.page.$(selector)) !== null);
  }

  /**
   * ページロードを待ちます。
   */
  async waitLoaded() {
    console.log('*** waitLoaded ***');
    try {
      await this.page.waitForNavigation({ timeout: this.timeout, waitUntil: 'domcontentloaded'});
    } catch (e) {
      // ignore.
    }
  }

  addErr(...errs) {
    this.errors.push(errs.join(','));
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

  async init() {
  }

  getSrcConfig() {
  }

  /**
   * 引数で渡された検索ワードを検索して jan 情報を返します。
   */
  async search(...keywords) {
    console.log('*** janSearch ***');
    await this.page.goto(this.getSrcConfig().top, {waitUntil: 'networkidle2'});
    await this.init(); // 検索できる画面までの画面処理をする。
    return Array.prototype.concat.apply([], await map(keywords, async keyword => await this.searchWord(keyword)));
  }

  /**
   * １キーワードの検索処理を行って、すべてのjan情報を返します。
   * @param {*} word
   */
  async searchWord(word) {
    console.log('*** searchWord ***');
    await this.page.type(this.getSrcConfig().searchPageSelectors.searchText, word);
    await this.page.click(this.getSrcConfig().searchPageSelectors.searchButton);
    await this.waitLoaded();
    return await this.eachItemFromSearchResult();
  }

  /**
   * 検索結果画面の商品分のリンク先を取得し、すべてのjan情報をかえします。　
   */
  async eachItemFromSearchResult() {
    console.log('*** eachItemFromSearchResult ***');
    const links = await this.getAllJanUrls();
    console.log(links);
    const result = await mapSeries(links, async link => {
      try {
        await this.page.goto(link, {waitUntil: 'networkidle2'});
        return await this.getJan();
      } catch (e) {
        this.addErr('商品ページへ移動できませんでした', link, e);
        return null;
      }
    });
    return result.filter(r => r !== null);
  }

  /**
   * 検索結果ページの商品URLをすべて取得します。次ページがある場合にはすべてのページを取得します。
   */
  async getAllJanUrls() {
    console.log('*** getAllJanUrls ***');
    let page = 1;
    const productsSel = this.getSrcConfig().searchPageSelectors.productsLink;
    const nextSel = this.getSrcConfig().searchPageSelectors.nextLink;
    const links = await this.page.$$eval(productsSel, list => list.map(item => item.href));
    while (await this.existsAll(nextSel)) { // →ボタンがある
      console.log(`page ${++page}`);
      await this.page.click(nextSel);
      await this.waitLoaded();
      links.push(... await this.page.$$eval(productsSel, list => list.map(item => item.href)));
    }
    return links;
  }

  /**
   * 商品ページからjan情報をかえします。
   */
  async getJan() {
    console.log('*** getJan ***');
    try {
      return this.replceValues(this.getSrcConfig().replacer, {
        jan: await this.getPageJan(),
        category: await this.getPageCategory(),
        title: await this.getPageTitle(),
      });
    } catch (e) {
      const url = await this.page.url();
      this.addErr('JANがページから取得できませんでした', url);
      return { jan: '', category: '', title: '' };
    }
  }

  async getPageJan() {
    return await this.page.$eval(this.getSrcConfig().productPageSelectors.jan, item => item.textContent);
  }
  async getPageCategory() {
    return await this.page.$eval(this.getSrcConfig().productPageSelectors.category, item => item.textContent);
  }
  async getPageTitle() {
    return await this.page.$eval(this.getSrcConfig().productPageSelectors.title, item => item.textContent);
  }
}
