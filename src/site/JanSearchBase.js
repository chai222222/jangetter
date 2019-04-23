import _ from 'lodash';
import fs from 'fs';
import { forEachSeries, map, mapSeries, every, reduce } from 'p-iteration';
import cheerioClient from 'cheerio-httpcli';
import Mustache from 'mustache';

import WriterCreator from '../util/WriterCreator';
import imageDownload from '../util/ImageDownload';
import Replacer from '../util/Replacer';
import Constants from '../constants';

export default class JanSearchBase {

  constructor(args) {
    Object.assign(this, args);
    // this.outputDir = outputDir;
    // this.page = page;
    // this.errors = errors;
    // this.rc = rc;
    this.timeout = Constants.timeout;
    this.replacer = new Replacer(this.getSrcConfig().replacer, _.get(this, 'rc.replacer'));
    this.imageInfo = {};
  }

  /**
   * セレクタが全て存在するかチェックします。
   * @param {*} selectors
   */
  async existsAll(...selectors) {
    return selectors.length > 0 && every(selectors, async (selector) => (await this.page.$(selector)) !== null);
  }

  /**
   * セレクタの要素を複数取得します。スラッシュ始まりの場合、XPath形式とみなします。
   * @param {string} selector
   * @return {Array<Promise>} 選択した要素
   */
  async xselectLink(selector) {
    return selector.startsWith('/')
      ? await this.page.$x(selector)
      : await this.page.$$(selector);
  }

  async xselectClick(selector) {
    if (selector) {
      console.log(`*** xselectClick ${selector} ***`);
      const link = await this.xselectLink(selector);
      if (link.length > 0) {
        console.log(`*** xselectClick ${selector} click`);
        await link[0].click();
        await this.waitLoaded();
      }
    }
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

  async init() {
  }

  /**
   * 検索設定定義を返す。
   * @return {Object} 検索設定定義
   * @property {String} prefix 出力プリフィックス
   * @property {String} top アクセス先頭ページ
   * @property {String} searchPageSelectors.searchText 検索文字列セレクタ
   * @property {String} searchPageSelectors.searchButton 検索ボタンセレクタ
   * @property {String} searchPageSelectors.nextLink 次へリンクセレクタ。XmlPathも設定可能
   * @property {String} searchPageSelectors.productsLink 商品ページリンクセレクタ
   * @property {String|Object} productPageSelectors.{カラム} データ取得セレクタ。
   *           オブジェクトの場合には、selにセレクタ、methodに取得メソッドを指定する。
   * @property {Array<Object>} replacer.{カラム} データ変換定義。patternに正規表現、valueに置き換え後の文字列。
   */
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
    const name = `${this.outputDir}/${config.prefix}_${word.replace(/ +/g, '_')}`;
    const outputFile = `${name}.csv`;
    if (this.options.image && !fs.existsSync(name)) {
      console.log(`mkdir ${name}`);
      fs.mkdirSync(name);
    }
    this.writer = WriterCreator.createCsvWriter(outputFile)
    await this.page.type(config.searchPageSelectors.searchText, word);
    await this.page.click(config.searchPageSelectors.searchButton);
    await this.waitLoaded();
    await this.xselectClick(config.searchPageSelectors.cushion);
    await this.eachItemFromSearchResult(name);
    this.writer.close();
    console.log(`Output done. [${outputFile}]`);
    if (!_.isEmpty(this.imageInfo)) {
      this.imageInfo.title = word;
      fs.writeFileSync(`${name}/data.json`, JSON.stringify(this.imageInfo, null, 2));
      const tmpl = `${__dirname}/../../tmpl/template.html`;
      const tmplBody = fs.readFileSync(tmpl, {encoding: "utf-8"});
      const res = Mustache.render(tmplBody, this.imageInfo);
      fs.writeFileSync(`${name}/index.html`, res, 'utf-8');
    }
  }

  /**
   * 検索結果画面の商品分のリンク先を取得し、すべてのjan情報をかえします。
   */
  async eachItemFromSearchResult(dir) {
    console.log('*** eachItemFromSearchResult ***');
    const hasDupLinks = await this.getAllJanUrls();
    const links = Array.from(new Set(hasDupLinks));
    console.log('** LINKS', links);
    let skipCheerio = false;
    const result = await mapSeries(links, async (link, idx) => {
      try {
        console.log(`PRODUCTS[${idx+1}/${links.length}]`);
        let jan;
        if (this.options['enable-cheerio-httpcli'] && !skipCheerio) {
          jan = await this.getJanByCheerioHttpcli(link);
          skipCheerio = jan === undefined;
        }
        if (!jan) jan = await this.getJan(link);
        if (jan) {
          if (jan.jan !== undefined && /\D/.test(`${jan.jan}`)) {
            this.addErr('JANが数字のみになっていません', link);
            return;
          }
        } else {
          return;
        }
        const replacedJan = this.replacer.replaceValues(jan);
        console.log(JSON.stringify(jan), JSON.stringify(replacedJan));
        await this.getImage(replacedJan, dir);
       this.writer.write(replacedJan);
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
    let nexts;
    while ((nexts = await this.xselectLink(nextSel)).length > 0) { // →ボタンがある
      console.log(`PAGE ${++page}`);
      await nexts[0].click();
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
      const result =  await reduce(Object.keys(this.getSrcConfig().productPageSelectors), async (acc, key) => {
        acc[key] = await this.getPageText(key);
        return acc;
      }, {});
      return result;
    } catch (e) {
      console.log(e);
      this.addErr('JANがページから取得できませんでした', url);
      return undefined;
    }
  }

  async getImage(jan, dir) {
    if (!dir || !this.options.image) return;
    const rows = this.imageInfo.rows || (this.imageInfo.rows = []);
    const imgs = this.getSrcConfig().productPageImageSelectors;
    if (!imgs) throw new Error('Not defined productPageImageSelectors!');
    const row = {...jan};
    await forEachSeries(_.toPairs(imgs), async ([key, selector]) => {
      const imageSrc = await this.page.evaluate((selector) => {
        return document.querySelector(selector).src;
      }, selector);
      if (imageSrc) {
        row[key] = await imageDownload(jan.title, imageSrc, `${dir}/${jan.jan}_${key}`);
      } else {
        console.log(`Couldn't get image src ${url}.`);
      }
    });
    rows.push(row);
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
      this.addErr('JANがページから取得できませんでした', url);
      return undefined;
    });
  }


  async getPageText(key) {
    const sel = this.getSrcConfig().productPageSelectors[key];
    const getter = (typeof sel === 'object') ? sel : { sel, method: item => item.textContent };
    let text = '';
    try {
      return text = await this.page.$eval(getter.sel, getter.method);
    } finally {
      if (this.options['debug-pagetext']) {
        console.log(`getPageText[${key}][${sel}][${text}]`);
      }
    }
  }
}

/** 共通リプレーサ定義 */
export const REPLACERS = {
  toHarfWidth: {
    pattern: /[！-～]/g,
    value: (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    },
  },
  toHarfWidthAlnum: {
    pattern: /[Ａ-Ｚａ-ｚ０-９]/g,
    value: (s) => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    },
  },
  toHarfWidthSpace: {
    pattern: /　+/g,
    value: ' ',
  },
  trim: [ { pattern: /^\s+/, value: '' },
          { pattern: /\s+$/, value: '' } ],
  toOneSpace: {
    pattern: /\s\s+/g,
    value: ' ',
  },
  toOneLine: {
    pattern: /\r?\n/g,
    value: ' ',
  }
}
