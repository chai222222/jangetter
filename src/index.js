import 'babel-polyfill';  // eslint-disable-line import/no-extraneous-dependencies
import fs from 'fs';
import argv from 'argv';
import puppeteer from 'puppeteer';
import iconv from 'iconv-lite';
import { forEachSeries } from 'p-iteration';

import { Parser as Json2csvParser } from 'json2csv';
import AeonSearch from './site/AeonSearch';
import IyecSearch from './site/IyecSearch';
import TajimaSearch from './site/TajimaSearch';
import LohacoSearch from './site/LohacoSearch';
import CoopSearch from './site/CoopSearch';
import KokubuSearch from './site/KokubuSearch';
import Constants from './constants';

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
  name: 'kokubu',
  short: 'K',
  type: 'boolean',
  description: 'search from Kokubu',
}, {
  name: 'coop',
  short: 'C',
  type: 'boolean',
  description: 'search from Coop',
}, {
  name: 'lohaco',
  short: 'L',
  type: 'boolean',
  description: 'search from LOHACO',
}, {
  name: 'tajima',
  short: 'T',
  type: 'boolean',
  description: 'search from Tajima',
}, {
  name: 'itoyokado',
  short: 'I',
  type: 'boolean',
  description: 'search from Ito_yoka_do',
}, {
  name: 'aeon',
  short: 'A',
  type: 'boolean',
  description: 'search from Aeon(default)',
} ]);
const args = argv.run();

if (args.targets.length < 1) {
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
    const searchers = [];

    if (args.options.itoyokado) searchers.push(new IyecSearch(outputDir, page, errors));
    if (args.options.aeon)      searchers.push(new AeonSearch(outputDir, page, errors));
    if (args.options.tajima)    searchers.push(new TajimaSearch(outputDir, page, errors));
    if (args.options.lohaco)    searchers.push(new LohacoSearch(outputDir, page, errors));
    if (args.options.coop)      searchers.push(new CoopSearch(outputDir, page, errors));
    if (args.options.kokubu)    searchers.push(new KokubuSearch(outputDir, page, errors));
    if (searchers.length === 0) searchers.push(new AeonSearch(outputDir, page, errors));

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
