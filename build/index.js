"use strict";

var _lodash = _interopRequireDefault(require("lodash"));

var _fs = _interopRequireDefault(require("fs"));

var _argv = _interopRequireDefault(require("argv"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _pIteration = require("p-iteration");

var _constants = _interopRequireDefault(require("./constants"));

var _site = _interopRequireDefault(require("./site"));

var _Replacer = _interopRequireWildcard(require("./util/Replacer"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on('unhandledRejection', console.dir);
/**
 * サイト名からオプションデータを作成する。
 * 名前の一文字目を大文字にしたものがオプションになるが、すでにある場合は、二文字目以降で使われない文字を使う。
 * @param {Array<String>} knownFlags 使用済みのショートオプション
 * @return {Array<Object>} オプションデータ
 */

function getSiteOpts(knownFlags) {
  const names = Object.keys(_site.default).sort();
  const flag = new Set(knownFlags);
  const n2up = names.reduce((acc, name) => {
    let c = name.charAt(0);

    if (flag.has(c)) {
      c = [...name, ...'0123456789'].find((cc, idx) => idx > 0 && names.every(nm => nm.charAt(0) !== cc) && !flag.has(cc));
      if (!c) throw new Error('オプション設定できません');
    }

    flag.add(c);
    acc[name] = c.toLocaleUpperCase();
    return acc;
  }, {});
  const arg = {};

  const mkDescription = (name, config) => {
    const {
      top,
      lastSupportedDate
    } = config;
    const lastDateStr = lastSupportedDate ? ` 最終対応日時[${lastSupportedDate}]` : ''; // return `検索元[${name}](${top})${lastDateStr}`;

    return [`検索元[${name}](${top})`, lastDateStr];
  };

  return names.map(name => ({
    name,
    short: n2up[name],
    type: 'boolean',
    description: mkDescription(name, _site.default[name](arg).getSrcConfig())
  }));
}
/**
 * .jangetterrcファイルを読み込みます。
 * 存在しない場合には何も行いません。
 * @return {Object} rcファイルのJSON
 */


function loadRc() {
  // rcファイル読み込み
  const rcPath = _constants.default.rcfile;

  if (_fs.default.existsSync(rcPath)) {
    console.log('load rc file.');
    return JSON.parse(_fs.default.readFileSync(rcPath, 'utf8'));
  }

  return {};
}

const fixedArgs = [{
  name: 'output',
  short: 'o',
  type: 'path',
  description: 'CSVファイル出力先パス'
}, {
  name: 'image',
  short: 'g',
  type: 'boolean',
  description: 'フォルダを作成いし画像をダウンロードします'
}, {
  name: 'error',
  short: 'e',
  type: 'path',
  description: 'エラー出力先パス'
}, {
  name: 'debug-window',
  type: 'boolean',
  description: 'デバッグウィンドウ表示を有効にします'
}, {
  name: 'debug-url',
  type: 'boolean',
  description: 'デバッグURL出力を有効にします'
}, {
  name: 'debug-pagetext',
  type: 'boolean',
  description: 'デバッグpage textを有効にします'
}, {
  name: 'enable-cheerio-httpcli',
  type: 'boolean',
  description: '【実験】cheerio-httpcliを有効にして実行します(非推奨：puppeteerでの取得と完全互換がないため)'
}, {
  name: 'info',
  type: 'boolean',
  description: '情報表示'
}];

_argv.default.option([...fixedArgs, ...getSiteOpts(fixedArgs.filter(o => o.short && /^[A-Z]$/.test(o.short)).map(o => o.short))]); // argv#run にて、optionsオブジェクトにオプション、targetsにパラメータが設定される


const args = _argv.default.run();

const outputDir = args.options.output || '.';
const errorTxt = args.options.error || 'error.txt';
const rc = loadRc();
const errors = [];
/**
 * サイト検索用クラスの作成を行います。
 * @param {Function} filterFunc Siteオブジェクトのキーをフィルタする関数です。
 * @param {*} page puppeteerのページオブジェクト（実行しない場合には不要）。
 * @returns {Array<Site>} 対象のSite配列
 */

function createSeachers(filterFunc, page) {
  return Object.keys(_site.default).filter(filterFunc).map(site => _site.default[site]({
    siteKey: site,
    outputDir,
    page,
    errors,
    rc,
    options: args.options
  }));
}

if (args.options.info) {
  let searchers = createSeachers(site => args.options[site], null);

  if (!searchers.length) {
    // 対象オプションがない場合は全体の name, siteOpt, top を出力(mdでの日本語桁揃えがうまくいかないためcsv)
    searchers = createSeachers(() => true, null);
    const cols = 'name,siteOpt,top';

    const toLine = searcher => [searcher.srcConfig.name, searcher.siteKey, searcher.srcConfig.top].join(',');

    console.log(cols);
    searchers.forEach(searcher => console.log(toLine(searcher)));

    _Replacer.default.showReplacers();
  } else {
    const outSite = (site, info) => {
      console.log(`**** ${site.siteKey} ****`);
      console.log(JSON.stringify(_Replacer.default.toSpecialString(info), '', 2));
    }; // 対象オプションがある場合、対象設定を出力


    searchers.forEach(site => outSite(site, site.srcConfig));
    searchers.forEach(site => outSite(site, site.replacer.repDefs));
  }

  process.exit(0);
}

if (args.targets.length < 1 || !Object.keys(_site.default).some(nm => args.options[nm])) {
  _argv.default.help();

  process.exit(0);
}

(async words => {
  const browser = await _puppeteer.default.launch({
    ignoreHTTPSErrors: true,
    headless: !args.options['debug-window'],
    args: ['--enable-features=NetworkService', '--enable-logging', '--no-sandbox', '--v=1' // `--proxy-server=${config.proxyUrl}`,
    ]
  });

  try {
    const context = await browser.createIncognitoBrowserContext();
    const page = await context.newPage();
    await page.on('framenavigated', frm => {
      if (args.options['debug-url']) {
        console.log("### URL ", frm.url());
      }
    });
    await page.setUserAgent(_constants.default.userAgent);
    await page.setViewport(_constants.default.viewport);
    const searchers = createSeachers(site => args.options[site], page);
    await (0, _pIteration.forEachSeries)(searchers, async s => await s.search(...words));

    if (errors.length) {
      console.log(`エラーが発生しました。${errorTxt} へ出力します。`);

      _fs.default.writeFile(errorTxt, `${errors.join('\n')}\n`, err => {
        if (err) {
          throw err;
        }
      });
    }
  } catch (e) {
    console.log(e.stack);
  } finally {
    browser.close();
  }
})(args.targets);
//# sourceMappingURL=index.js.map