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
  name: 'enable-cheerio-httpcli',
  type: 'boolean',
  description: 'disable cheerio-httpcli.',
}, ...Object.keys(Site).map(name => ({
  name,
  short: name.charAt(0).toLocaleUpperCase(), /// 先頭一文字目はかぶらない前提
  type: 'boolean',
  description: `search from ${name}`,
})), ]);
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
    headless: true,
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
      console.log("### URL ", frm.url());
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
