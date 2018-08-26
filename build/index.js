'use strict';

require('babel-polyfill');

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _argv = require('argv');

var _argv2 = _interopRequireDefault(_argv);

var _puppeteer = require('puppeteer');

var _puppeteer2 = _interopRequireDefault(_puppeteer);

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

var _json2csv = require('json2csv');

var _aeon = require('./site/aeon');

var _aeon2 = _interopRequireDefault(_aeon);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // eslint-disable-line import/no-extraneous-dependencies


process.on('unhandledRejection', console.dir);

_argv2.default.option({
  name: 'output',
  short: 'o',
  type: 'path',
  description: 'output csv file path.'
});
var args = _argv2.default.run();

if (args.targets.length < 1) {
  _argv2.default.help();
  process.exit(0);
}

var outputCsv = args.options.output || 'jan.csv';

(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(words) {
    var browser, page, aeon, result, fields, json2csvParser, csv, sjCsv;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return _puppeteer2.default.launch({
              ignoreHTTPSErrors: true,
              headless: true,
              args: ['--enable-features=NetworkService', '--enable-logging', '--no-sandbox', '--v=1']
            });

          case 2:
            browser = _context.sent;
            _context.prev = 3;
            _context.next = 6;
            return browser.newPage();

          case 6:
            page = _context.sent;
            _context.next = 9;
            return page.on('framenavigated', function (frm) {
              console.log("### URL ", frm.url());
            });

          case 9:
            _context.next = 11;
            return page.setViewport({ width: 1600, height: 1200 });

          case 11:

            // AEONから検索
            aeon = new _aeon2.default(page);
            _context.next = 14;
            return aeon.janSearch.apply(aeon, _toConsumableArray(words)).catch(function (e) {
              console.log(e.stack);
            });

          case 14:
            result = _context.sent;


            // 結果をCSV(ShiftJIS)にして保存
            fields = ['jan', 'title', 'category'];
            json2csvParser = new _json2csv.Parser({ fields: fields });
            csv = json2csvParser.parse(result);
            sjCsv = _iconvLite2.default.encode(csv, "Shift_JIS");


            _fs2.default.writeFile(outputCsv, sjCsv, function (err) {
              if (err) {
                throw err;
              }
            });
            console.log('Output done. [' + outputCsv + ']');
            _context.next = 26;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context['catch'](3);

            console.log(_context.t0.stack);

          case 26:
            _context.prev = 26;

            console.log('finally');
            browser.close();
            return _context.finish(26);

          case 30:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[3, 23, 26, 30]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})()(args.targets);
//# sourceMappingURL=index.js.map