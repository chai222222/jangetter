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

var _pIteration = require('p-iteration');

var _json2csv = require('json2csv');

var _AeonSearch = require('./site/AeonSearch');

var _AeonSearch2 = _interopRequireDefault(_AeonSearch);

var _IyecSearch = require('./site/IyecSearch');

var _IyecSearch2 = _interopRequireDefault(_IyecSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // eslint-disable-line import/no-extraneous-dependencies


process.on('unhandledRejection', console.dir);

_argv2.default.option([{
  name: 'output',
  short: 'o',
  type: 'path',
  description: 'output csv file path.'
}, {
  name: 'itoyokado',
  short: 'I',
  type: 'boolean',
  description: 'search from ito yoka do'
}, {
  name: 'aeon',
  short: 'A',
  type: 'boolean',
  description: 'search from aeon(default)'
}]);
var args = _argv2.default.run();

if (args.targets.length < 1) {
  _argv2.default.help();
  process.exit(0);
}

var outputCsv = args.options.output || 'jan.csv';
var searchers = [];

(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(words) {
    var browser, page, _searchers, result, fields, json2csvParser, csv, sjCsv;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return _puppeteer2.default.launch({
              ignoreHTTPSErrors: true,
              headless: true,
              args: ['--enable-features=NetworkService', '--enable-logging', '--no-sandbox', '--v=1']
            });

          case 2:
            browser = _context2.sent;
            _context2.prev = 3;
            _context2.next = 6;
            return browser.newPage();

          case 6:
            page = _context2.sent;
            _context2.next = 9;
            return page.on('framenavigated', function (frm) {
              console.log("### URL ", frm.url());
            });

          case 9:
            _context2.next = 11;
            return page.setViewport({ width: 1600, height: 1200 });

          case 11:
            _searchers = [];


            if (args.options.itoyokado) _searchers.push(new _IyecSearch2.default(page));
            if (args.options.aeon) _searchers.push(new _AeonSearch2.default(page));
            if (_searchers.length === 0) _searchers.push(new _AeonSearch2.default(page));

            _context2.t0 = Array.prototype.concat;
            _context2.t1 = [];
            _context2.next = 19;
            return (0, _pIteration.map)(_searchers, function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(s) {
                return regeneratorRuntime.wrap(function _callee$(_context) {
                  while (1) {
                    switch (_context.prev = _context.next) {
                      case 0:
                        _context.next = 2;
                        return s.search.apply(s, _toConsumableArray(words));

                      case 2:
                        return _context.abrupt('return', _context.sent);

                      case 3:
                      case 'end':
                        return _context.stop();
                    }
                  }
                }, _callee, undefined);
              }));

              return function (_x2) {
                return _ref2.apply(this, arguments);
              };
            }());

          case 19:
            _context2.t2 = _context2.sent;
            result = _context2.t0.apply.call(_context2.t0, _context2.t1, _context2.t2);


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
            _context2.next = 32;
            break;

          case 29:
            _context2.prev = 29;
            _context2.t3 = _context2['catch'](3);

            console.log(_context2.t3.stack);

          case 32:
            _context2.prev = 32;

            console.log('finally');
            browser.close();
            return _context2.finish(32);

          case 36:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 29, 32, 36]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})()(args.targets);
//# sourceMappingURL=index.js.map