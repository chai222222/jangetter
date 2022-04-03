"use strict";

var _fs = _interopRequireDefault(require("fs"));

var _argv = _interopRequireDefault(require("argv"));

var _puppeteer = _interopRequireDefault(require("puppeteer"));

var _iconvLite = _interopRequireDefault(require("iconv-lite"));

var _pIteration = require("p-iteration");

var _json2csv = require("json2csv");

var _constants = _interopRequireDefault(require("./constants"));

var _site = _interopRequireDefault(require("./site"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

process.on('unhandledRejection', console.dir);
/**
 * サイト名からオプションデータを作成する。
 * 名前の一文字目を大文字にしたものがオプションになるが、すでにある場合は、二文字目以降で使われない文字を使う。
 * @return {Array<Object>} オプションデータ
 */

function getSiteOpts(knownFlags) {
  const names = Object.keys(_site.default).sort();
  const flag = new Set(knownFlags);
  const n2up = names.reduce((acc, name) => {
    let c = name.charAt(0);

    if (flag.has(c)) {
      c = [...name, ...'0123456789'].find((c, idx) => idx > 0 && names.every(name => name.charAt(0) !== c) && !flag.has(c));
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
  description: '【実験】cheerio-httpcliを有効にして実行します'
}];

_argv.default.option([...fixedArgs, ...getSiteOpts(fixedArgs.filter(o => o.short && /^[A-Z]$/.test(o.short)).map(o => o.short))]);

const args = _argv.default.run();

if (args.targets.length < 1 || !Object.keys(_site.default).some(name => args.options[name])) {
  _argv.default.help();

  process.exit(0);
}

const outputDir = args.options.output || '.';
const errorTxt = args.options.error || 'error.txt';
const searchers = [];

(async words => {
  const browser = await _puppeteer.default.launch({
    ignoreHTTPSErrors: true,
    headless: !args.options['debug-window'],
    args: ['--enable-features=NetworkService', '--enable-logging', '--no-sandbox', '--v=1' // `--proxy-server=${config.proxyUrl}`,
    ]
  });

  try {
    const page = await browser.newPage();
    await page.on('framenavigated', frm => {
      if (args.options['debug-url']) {
        console.log("### URL ", frm.url());
      }
    });
    await page.setUserAgent(_constants.default.userAgent);
    await page.setViewport(_constants.default.viewport); // rcファイル読み込み

    const rcPath = _constants.default.rcfile;
    let rc = undefined;

    if (_fs.default.existsSync(rcPath)) {
      console.log('load rc file.');
      rc = JSON.parse(_fs.default.readFileSync(rcPath, 'utf8'));
    }

    const errors = [];
    const searchers = Object.keys(_site.default).filter(name => args.options[name]).map(name => _site.default[name]({
      outputDir,
      page,
      errors,
      rc,
      options: args.options
    }));
    await (0, _pIteration.forEachSeries)(searchers, async s => await s.search(...words));

    if (errors.length) {
      console.log(`エラーが発生しました。${errorTxt} へ出力します。`);

      _fs.default.writeFile(errorTxt, errors.join('\n'), err => {
        if (err) {
          throw err;
        }
      });
    }
  } catch (e) {
    console.log(e.stack);
  } finally {
    console.log('finally');
    browser.close();
  }
})(args.targets);
//# sourceMappingURL=index.js.map