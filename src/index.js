import fs from 'fs';
import argv from 'argv';
import puppeteer from 'puppeteer';
import iconv from 'iconv-lite';

import { Parser as Json2csvParser } from 'json2csv';
import AeonSearch from './site/aeon'

process.on('unhandledRejection', console.dir);

argv.option({
    name: 'output',
    short: 'o',
    type: 'path',
    description: 'output csv file path.',
});
const args = argv.run();

if (args.targets.length < 1) {
  argv.help();
  process.exit(0);
}

const outputCsv = args.options.output || 'jan.csv';

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

    // AEONから検索
    const aeon = new AeonSearch(page);
    const result = await aeon.janSearch(...words).catch(e => {
      console.log(e.stack);
    });

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
  } catch (e) {
    console.log(e.stack);
  } finally {
    console.log('finally');
    browser.close();
  }
})(args.targets);
