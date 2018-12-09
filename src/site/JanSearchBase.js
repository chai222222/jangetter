import stream from 'stream';
import { forEachSeries, map, mapSeries, every, reduce } from 'p-iteration';
import cheerioClient from 'cheerio-httpcli';

import WriterCreator from '../util/WriterCreator';
import Constants from '../constants';

export default class JanSearchBase {

  constructor(args) {
    Object.assign(this, args);
    // this.outputDir = outputDir;
    // this.page = page;
    // this.errors = errors;
    this.timeout = Constants.timeout;
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

  setNewReader() {
  }

  /**
   * 引数で渡された検索ワードを検索して jan 情報を返します。
   */
  async search(...keywords) {
    console.log('*** janSearch ***');
    await this.page.goto(this.getSrcConfig().top, {waitUntil: 'networkidle2'});
    await this.init(); // 検索できる画面までの画面処理をする。
    await forEachSeries(keywords, async keyword => await this.searchWord(keyword));
  }

  /**
   * １キーワードの検索処理を行って、すべてのjan情報を返します。
   * @param {*} word
   */
  async searchWord(word) {
    console.log(`*** search[${word}] ***`);
    const config = this.getSrcConfig();
    const outputFile = `${this.outputDir}/${config.prefix}_${word.replace(/ +/g, '_')}.csv`;
    this.writer = WriterCreator.createCsvWriter(outputFile)
    await this.page.type(config.searchPageSelectors.searchText, word);
    await this.page.click(config.searchPageSelectors.searchButton);
    await this.waitLoaded();
    await this.eachItemFromSearchResult();
    this.writer.close();
    console.log(`Output done. [${outputFile}]`);
  }

  /**
   * 検索結果画面の商品分のリンク先を取得し、すべてのjan情報をかえします。　
   */
  async eachItemFromSearchResult() {
    console.log('*** eachItemFromSearchResult ***');
    const links = await this.getAllJanUrls();
    console.log(links);
    let skipCheerio = false;
    const result = await mapSeries(links, async link => {
      try {
        let jan;
        if (this.options['enable-cheerio-httpcli'] && !skipCheerio) {
          jan = await this.getJanByCheerioHttpcli(link);
          skipCheerio = jan === undefined;
        }
        if (!jan) jan = await this.getJan(link);
        if (!jan) {
          this.addErr('商品ページへ移動できませんでした', link);
          return;
        }
       this.writer.write(this.replceValues(this.getSrcConfig().replacer, jan));
      } catch (e) {
        this.addErr('商品ページへ移動できませんでした', link, e);
        return;
      }
    });
  }

  /**
   * 検索結果ページの商品URLをすべて取得します。次ページがある場合にはすべてのページを取得します。
   */
  async getAllJanUrls() {
    console.log('*** getAllJanUrls ***');
    const config = this.getSrcConfig();
    if (config.searchPageSelectors.scrollToBottom) {
      return this.getAllJanUrlsScrollToBottom();
    } else if (config.searchPageSelectors.nextLink) {
      return this.getAllJanUrlsPageTransition();
    }
    this.addErr('JANリンク取得方法が定義されていません。');
    return [];
  }

  async getAllJanUrlsPageTransition() {
    console.log('*** getAllJanUrlsPageTransition ***');
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

  async getAllJanUrlsScrollToBottom() {
    console.log('*** getAllJanUrlsScrollToBottom ***');
    await this.scrollToBottom(this.page, Constants.viewport.height);
    const productsSel = this.getSrcConfig().searchPageSelectors.productsLink;
    return await this.page.$$eval(productsSel, list => list.map(item => item.href));
  }

  async scrollToBottom(page, viewportHeight) {
    const getScrollHeight = () => {
      return Promise.resolve(document.documentElement.scrollHeight) }

    let scrollHeight = await page.evaluate(getScrollHeight)
    let currentPosition = 0
    let scrollNumber = 0

    while (currentPosition < scrollHeight) {
      scrollNumber += 1
      const nextPosition = scrollNumber * viewportHeight
      await page.evaluate(function (scrollTo) {
        return Promise.resolve(window.scrollTo(0, scrollTo))
      }, nextPosition)
      await page.waitForNavigation({waitUntil: 'networkidle2', timeout: 5000})
                .catch(e => console.log('timeout exceed. proceed to next operation'));

      currentPosition = nextPosition;
      console.log(`scrollNumber: ${scrollNumber}`)
      console.log(`currentPosition: ${currentPosition}`)

      // 2
      scrollHeight = await page.evaluate(getScrollHeight)
      console.log(`ScrollHeight ${scrollHeight}`)
    }
  }


  /**
   * 商品ページからjan情報をかえします。
   */
  async getJan(url) {
    console.log('*** getJan ***');
    await this.page.goto(url, {waitUntil: 'networkidle2'});
    try {
      return await reduce(Object.keys(this.getSrcConfig().productPageSelectors), async (acc, key) => {
        acc[key] = await this.getPageText(key);
        return acc;
      }, {});
    } catch (e) {
      this.addErr('JANがページから取得できませんでした', url);
      return undefined;
    }
  }

  async getJanByCheerioHttpcli(url) {
    console.log('*** getJanByCheerioHttpcli ***');
    return await cheerioClient.fetch(url).then(({err, $, res, body}) => {
      return Object.keys(this.getSrcConfig().productPageSelectors).reduce((acc, key) => {
        const txt = $(this.getSrcConfig().productPageSelectors[key]).text();
        if (!acc  || !txt) {
          console.log('getJanByCheerioHttpcli failed');
          return undefined;
        }
        acc[key] = txt.replace(/[\s　]+/, ' ').replace(/[\r\n]/g, '');
        return acc;
      }, {});
    }).catch(e => {
      return undefined;
    });
  }


  async getPageText(key) {
    console.log(this.getSrcConfig().productPageSelectors[key]);
    return await this.page.$eval(this.getSrcConfig().productPageSelectors[key], item => item.textContent);
  }
}
