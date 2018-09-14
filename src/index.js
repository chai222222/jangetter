import 'babel-polyfill';  // eslint-disable-line import/no-extraneous-dependencies
import fs from 'fs';
import argv from 'argv';
import puppeteer from 'puppeteer';
import iconv from 'iconv-lite';
import { map } from 'p-iteration';

import { Parser as Json2csvParser } from 'json2csv';
import AeonSearch from './site/AeonSearch';
import IyecSearch from './site/IyecSearch';

process.on('unhandledRejection', console.dir);

argv.option([ {
  name: 'output',
  short: 'o',
  type: 'path',
  description: 'output csv file path.',
}, {
  name: 'error',
  short: 'e',
  type: 'path',
  description: 'output error file path.',
}, {
  name: 'itoyokado',
  short: 'I',
  type: 'boolean',
  description: 'search from ito yoka do',
}, {
  name: 'aeon',
  short: 'A',
  type: 'boolean',
  description: 'search from aeon(default)',
} ]);
const args = argv.run();

if (args.targets.length < 1) {
  argv.help();
  process.exit(0);
}

const outputCsv = args.options.output || 'jan.csv';
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
    await page.setViewport({ width: 1600, height: 1200 });

    const errors = [];
    const searchers = [];

    if (args.options.itoyokado) searchers.push(new IyecSearch(page, errors));
    if (args.options.aeon)      searchers.push(new AeonSearch(page, errors));
    if (searchers.length === 0) searchers.push(new AeonSearch(page, errors));

    const result = Array.prototype.concat.apply([],
      await map(searchers, async s => await s.search(...words)));

    // 結果をCSV(ShiftJIS)にして保存
    const fields = ['jan', 'title', 'category'];
    const json2csvParser = new Json2csvParser({fields});
    const csv = json2csvParser.parse(result);
    const sjCsv = iconv.encode(csv, "Shift_JIS");

    fs.writeFile(outputCsv, sjCsv, (err) => {
      if (err) {
          throw err;
      }
    });
    console.log(`Output done. [${outputCsv}]`);
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
