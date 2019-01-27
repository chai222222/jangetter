import 'babel-polyfill';  // eslint-disable-line import/no-extraneous-dependencies
import fs from 'fs';
import argv from 'argv';
import puppeteer from 'puppeteer';
import iconv from 'iconv-lite';
import { forEachSeries } from 'p-iteration';
import { Parser as Json2csvParser } from 'json2csv';

import Constants from './constants';
import Site from './site';

process.on('unhandledRejection', console.dir);

/**
 * サイト名からオプションデータを作成する。
 * 名前の一文字目を大文字にしたものがオプションになるが、すでにある場合は、二文字目以降で使われない文字を使う。
 * @return {Array<Object>} オプションデータ
 */
function getSiteOpts() {
  const names = Object.keys(Site).sort();
  const flag = new Set();
  const n2up = names.reduce((acc, name) => {
    let c = name.charAt(0);
    if (flag.has(c)) {
      c = [ ...name, ...'0123456789'].find((c, idx) => idx > 0
        && names.every(name => name.charAt(0) !== c)
        && !flag.has(c));
      if (!c) throw new Error('オプション設定できません');
    }
    flag.add(c);
    acc[name] = c.toLocaleUpperCase();
    return acc;
  }, {})
  return names.map(name => ({
    name,
    short: n2up[name],
    type: 'boolean',
    description: `search from ${name}`,
  }));
}

argv.option([ {
  name: 'output',
  short: 'o',
  type: 'path',
  description: 'output csv directory path.',
}, {
  name: 'error',
  short: 'e',
  type: 'path',
  description: 'output error file path.',
}, {
  name: 'debug-window',
  type: 'boolean',
  description: 'enable window',
}, {
  name: 'debug-url',
  type: 'boolean',
  description: 'enable log url',
}, {
  name: 'debug-pagetext',
  type: 'boolean',
  description: 'enable log url',
}, {
  name: 'enable-cheerio-httpcli',
  type: 'boolean',
  description: 'enable cheerio-httpcli.',
}, ...getSiteOpts() ]);
const args = argv.run();

if (args.targets.length < 1 || !Object.keys(Site).some(name => args.options[name])) {
  argv.help();
  process.exit(0);
}

const outputDir = args.options.output || '.';
const errorTxt = args.options.error || 'error.txt';
const searchers = [];

(async (words) => {
  const browser = await puppeteer.launch({
    ignoreHTTPSErrors: true,
    headless: !args.options['debug-window'],
    args: [
      '--enable-features=NetworkService',
      '--enable-logging',
      '--no-sandbox',
      '--v=1',
      // `--proxy-server=${config.proxyUrl}`,
    ],
  });
  try {
    const page = await browser.newPage();
    await page.on('framenavigated', frm => {
      if (args.options['debug-url']) {
        console.log("### URL ", frm.url());
      }
    });
    await page.setViewport(Constants.viewport);

    const errors = [];
    const searchers = Object.keys(Site)
      .filter(name => args.options[name])
      .map(name => Site[name]({outputDir, page, errors, options: args.options}));

    await forEachSeries(searchers, async s => await s.search(...words));

    if (errors.length) {
      console.log(`エラーが発生しました。${errorTxt} へ出力します。`);
      fs.writeFile(errorTxt, errors.join('\n'), (err) => {
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
