"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.REPLACERS = void 0;

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _pIteration = require("p-iteration");

var _cheerioHttpcli = _interopRequireDefault(require("cheerio-httpcli"));

var _mustache = _interopRequireDefault(require("mustache"));

var _WriterCreator = _interopRequireDefault(require("../util/WriterCreator"));

var _ImageDownload = _interopRequireDefault(require("../util/ImageDownload"));

var _Replacer = _interopRequireDefault(require("../util/Replacer"));

var _constants = _interopRequireDefault(require("../constants"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const DEFAULT_PRODUCT_TEXTS_CHECK_DEF = {
  jan: {
    regexp: '^\\d+$',
    option: '',
    error: 'JANが数字のみになっていません'
  }
};

class JanSearchBase {
  constructor(args) {
    Object.assign(this, args); // this.outputDir = outputDir;
    // this.page = page;
    // this.errors = errors;
    // this.rc = rc;

    this.srcConfig = this.getSrcConfig();
    this.timeout = _constants.default.timeout;
    this.replacer = new _Replacer.default(this.srcConfig.replacer, _lodash.default.get(this, 'rc.replacer'));
    this.imageInfo = {};
  }
  /**
   * セレクタが全て存在するかチェックします。
   * @param {*} selectors
   */


  async existsAll(...selectors) {
    return selectors.length > 0 && (0, _pIteration.every)(selectors, async selector => (await this.page.$(selector)) !== null);
  }
  /**
   * セレクタの要素を複数取得します。スラッシュ始まりの場合、XPath形式とみなします。
   * @param {string} selector
   * @return {Array<Promise>} 選択した要素
   */


  async xselectLink(selector) {
    return selector.startsWith('/') ? await this.page.$x(selector) : await this.page.$$(selector);
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
      await this.page.waitForNavigation({
        timeout: this.timeout,
        waitUntil: 'domcontentloaded'
      });
    } catch (e) {// ignore.
    }
  }

  addErr(...errs) {
    this.errors.push(errs.join(','));
  }

  async init() {}
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


  getSrcConfig() {}

  setNewReader() {}
  /**
   * 引数で渡された検索ワードを検索して jan 情報を返します。
   */


  async search(...keywords) {
    const config = this.srcConfig;
    console.log(`*** janSearch[${config.prefix}] ***`);
    await this.page.goto(config.top, {
      waitUntil: 'networkidle2'
    });
    await this.init(); // 検索できる画面までの画面処理をする。
    // await this.page.screenshot( { path: './top.png' });

    await (0, _pIteration.forEachSeries)(keywords, async keyword => await this.searchWord(keyword));
  }
  /**
   * １キーワードの検索処理を行って、すべてのjan情報を返します。
   * @param {*} word
   */


  async searchWord(word) {
    console.log(`*** search[${word}] ***`);
    const config = this.srcConfig;
    await this.page.waitForSelector(config.searchPageSelectors.searchText);
    const name = `${this.outputDir}/${config.prefix}_${word.replace(/ +/g, '_')}`;
    const outputFile = `${name}.csv`;

    if (this.options.image && !_fs.default.existsSync(name)) {
      console.log(`mkdir ${name}`);

      _fs.default.mkdirSync(name);
    }

    this.writer = _WriterCreator.default.createCsvWriter(outputFile);
    await this.page.type(config.searchPageSelectors.searchText, word);
    await this.page.click(config.searchPageSelectors.searchButton);
    await this.waitLoaded();
    await this.xselectClick(config.searchPageSelectors.cushion); // 検索結果がすぐに出ない画面の場合、リンクをクリックする

    await this.eachItemFromSearchResult(name);
    this.writer.close();
    console.log(`Output done. [${outputFile}]`);

    if (!_lodash.default.isEmpty(this.imageInfo)) {
      this.imageInfo.title = word;

      _fs.default.writeFileSync(`${name}/data.json`, JSON.stringify(this.imageInfo, null, 2));

      const tmpl = `${__dirname}/../../tmpl/template.html`;

      const tmplBody = _fs.default.readFileSync(tmpl, {
        encoding: "utf-8"
      });

      const res = _mustache.default.render(tmplBody, this.imageInfo);

      _fs.default.writeFileSync(`${name}/index.html`, res, 'utf-8');
    }
  }
  /**
   * 検索結果画面の商品分のリンク先を取得し、すべてのjan情報をかえします。
   */


  async eachItemFromSearchResult(dir) {
    console.log('*** eachItemFromSearchResult ***');
    const hasDupLinks = await this.getAllJanUrls();
    const links = Array.from(new Set(this.filterJanUrl(hasDupLinks)));
    console.log('** LINKS', links);
    let skipCheerio = false;
    const result = await (0, _pIteration.mapSeries)(links, async (link, idx) => {
      try {
        console.log(`PRODUCTS[${idx + 1}/${links.length}]`);
        let jan;

        if (this.options['enable-cheerio-httpcli'] && !skipCheerio) {
          jan = await this.getProductTextsByCheerioHttpcli(link);
          skipCheerio = jan === undefined;
        }

        if (!jan) jan = await this.getProductTexts(link);
        if (!jan) return;
        const replacedJan = this.replacer.replaceValues(jan);
        const nullables = Object.assign({}, this.srcConfig.nullables || {});
        const checkers = Object.assign({}, DEFAULT_PRODUCT_TEXTS_CHECK_DEF, this.srcConfig.checkers || {}); // 必須項目のチェック

        const allOk = Object.keys(this.srcConfig.productPageSelectors).filter(key => !_lodash.default.isString(nullables[key])).every(key => {
          const chk = checkers[key];

          if (chk) {
            const reg = new RegExp(chk.regexp, chk.option);

            if (!reg.test(replacedJan[key])) {
              this.addErr(chk.error, link);
              return false;
            }
          } else if (!_lodash.default.isString(replacedJan[key]) || replacedJan[key].length === 0) {
            this.addErr(`キー[${key}] の値が取得できず空文字列になっています。`, link);
            return false;
          }

          return true;
        });
        if (!allOk) return;
        await this.getImage(replacedJan, dir);
        this.writer.write(replacedJan);
      } catch (e) {
        this.addErr('商品ページへ移動できませんでした', link, e);
      }
    });
  }
  /**
   * 検索結果ページの商品URLをすべて取得します。次ページがある場合にはすべてのページを取得します。
   */


  async getAllJanUrls() {
    console.log('*** getAllJanUrls ***');
    const config = this.srcConfig;

    if (config.searchPageSelectors.scrollToBottom) {
      return this.getAllJanUrlsScrollToBottom();
    } else if (config.searchPageSelectors.nextLink) {
      return this.getAllJanUrlsPageTransition();
    } else if (config.searchPageSelectors.onlyCurrentPage) {
      return this.getAllJanUrlsOnlyCurrentPage();
    }

    this.addErr('JANリンク取得方法が定義されていません。');
    return [];
  }
  /**
   * 商品ページをカレントページないからのみ取得します。
   * @return {String[]} URL文字列の配列
   */


  async getAllJanUrlsOnlyCurrentPage() {
    console.log('*** getAllJanUrlsOnlyCurrentPage ***');
    let page = 1;
    const productsSel = this.srcConfig.searchPageSelectors.productsLink;
    return await this.page.$$eval(productsSel, list => list.map(item => item.href));
  }
  /**
   * 商品ページを次ページボタンの遷移で取得します。
   * @return {String[]} URL文字列の配列
   */


  async getAllJanUrlsPageTransition() {
    console.log('*** getAllJanUrlsPageTransition ***');
    let page = 1;
    const productsSel = this.srcConfig.searchPageSelectors.productsLink;
    const nextSel = this.srcConfig.searchPageSelectors.nextLink;
    const links = await this.page.$$eval(productsSel, list => list.map(item => item.href));
    let nexts;

    while ((nexts = await this.xselectLink(nextSel)).length > 0) {
      // →ボタンがある
      console.log(`PAGE ${++page}`);
      await nexts[0].click();
      await this.waitLoaded();
      links.push(...(await this.page.$$eval(productsSel, list => list.map(item => item.href))));
    }

    return links;
  }
  /**
   * 商品ページをカレントページを下に移動してAjaxで画面を更新し最後までスクロールして取得します。
   * @return {String[]} URL文字列の配列
   */


  async getAllJanUrlsScrollToBottom() {
    console.log('*** getAllJanUrlsScrollToBottom ***');
    await this.scrollToBottom(this.page, _constants.default.viewport.height);
    const productsSel = this.srcConfig.searchPageSelectors.productsLink;
    return await this.page.$$eval(productsSel, list => list.map(item => item.href));
  }

  async scrollToBottom(page, viewportHeight) {
    const getScrollHeight = () => {
      return Promise.resolve(document.documentElement.scrollHeight);
    };

    let scrollHeight = await page.evaluate(getScrollHeight);
    let currentPosition = 0;
    let scrollNumber = 0;

    while (currentPosition < scrollHeight) {
      scrollNumber += 1;
      const nextPosition = scrollNumber * viewportHeight;
      await page.evaluate(function (scrollTo) {
        return Promise.resolve(window.scrollTo(0, scrollTo));
      }, nextPosition);
      await page.waitForNavigation({
        waitUntil: 'networkidle2',
        timeout: 5000
      }).catch(e => console.log('timeout exceed. proceed to next operation'));
      currentPosition = nextPosition;
      console.log(`scrollNumber: ${scrollNumber}`);
      console.log(`currentPosition: ${currentPosition}`); // 2

      scrollHeight = await page.evaluate(getScrollHeight);
      console.log(`ScrollHeight ${scrollHeight}`);
    }
  }
  /**
   * 商品ページからproductPageSelectorsに定義された情報を取得します。
   */


  async getProductTexts(url) {
    console.log('*** getProductTexts ***');
    await this.page.goto(url, {
      waitUntil: 'networkidle2'
    });

    try {
      const result = await (0, _pIteration.reduce)(Object.keys(this.srcConfig.productPageSelectors), async (acc, key) => {
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
    const imgs = this.srcConfig.productPageImageSelectors;
    if (!imgs) throw new Error('Not defined productPageImageSelectors!');

    const row = _objectSpread({}, jan);

    await (0, _pIteration.forEachSeries)(_lodash.default.toPairs(imgs), async ([key, selector]) => {
      const imageSrc = await this.page.evaluate(selector => {
        const node = document.querySelector(selector); // img.src or a tag

        return node.src || node.href;
      }, selector);

      if (imageSrc) {
        row[key] = await (0, _ImageDownload.default)(jan.title, imageSrc, `${dir}/${jan.jan}_${key}`);
      } else {
        console.log(`Couldn't get image src ${imageSrc}.`);
      }
    });
    rows.push(row);
  }

  async getProductTextsByCheerioHttpcli(url) {
    console.log('*** getProductTextsByCheerioHttpcli ***');
    return await _cheerioHttpcli.default.fetch(url).then(({
      err,
      $,
      res,
      body
    }) => {
      return Object.keys(this.srcConfig.productPageSelectors).reduce((acc, key) => {
        const txt = $(this.srcConfig.productPageSelectors[key]).text();

        if (!acc || !txt) {
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
  /**
   * プロダクトページから productPageSelectors に定義されているテキストを取得します。
   * 定義がテキストの場合には、単純セレクタで単純文字列の取得を行います。
   * 定義がオブジェクトの場合には、path がセレクタで、複数ヒット・配列定義が可能。
   * また、attr がある場合にはnodeの属性から値を取得します。
   * @param {String} key データ取得キー
   * @return {String} 取得できたテキスト
   */


  async getPageText(key) {
    const sel = this.srcConfig.productPageSelectors[key];
    let text = '';

    try {
      if (_lodash.default.isString(sel)) {
        const targets = await this.xselectLink(sel);

        if (targets.length > 0) {
          text = await (await targets[0].getProperty('textContent')).jsonValue();
        }

        return text;
      }

      if (_lodash.default.isObject(sel)) {
        const paths = _lodash.default.isArray(sel.selector) ? sel.selector : [sel.selector];
        const texts = await (0, _pIteration.reduce)(paths, async (arr, path) => {
          const targets = await this.xselectLink(path);
          return [...arr, ...(await (0, _pIteration.mapSeries)(targets, async target => await (sel.attr ? await this.page.evaluate((node, attr) => node.getAttribute(attr), target, sel.attr) : await target.getProperty('textContent').jsonValue())))];
          return arr;
        }, []);
        return texts.filter(v => !!v).join(sel.separator || '・');
      }

      this.addErr('productPageSelectorsの定義が不正です', key);
      return undefined;
    } finally {
      if (this.options['debug-pagetext']) {
        console.log(`getPageText[${key}][${sel}][${text}]`);
      }
    }
  }

  filterJanUrl(links) {
    return links;
  }

}
/** 共通リプレーサ定義 */


exports.default = JanSearchBase;
const REPLACERS = {
  toHarfWidth: {
    pattern: /[！-～]/g,
    value: s => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }
  },
  toHarfWidthAlnum: {
    pattern: /[Ａ-Ｚａ-ｚ０-９]/g,
    value: s => {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }
  },
  toHarfWidthSpace: {
    pattern: /　+/g,
    value: ' '
  },
  trim: [{
    pattern: /^\s+/,
    value: ''
  }, {
    pattern: /\s+$/,
    value: ''
  }],
  toOneSpace: {
    pattern: /\s\s+/g,
    value: ' '
  },
  toOneLine: {
    pattern: /\r?\n/g,
    value: ' '
  }
};
exports.REPLACERS = REPLACERS;
//# sourceMappingURL=JanSearchBase.js.map