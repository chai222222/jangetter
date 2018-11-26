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

var _TajimaSearch = require('./site/TajimaSearch');

var _TajimaSearch2 = _interopRequireDefault(_TajimaSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; } // eslint-disable-line import/no-extraneous-dependencies


process.on('unhandledRejection', console.dir);

_argv2.default.option([{
  name: 'output',
  short: 'o',
  type: 'path',
  description: 'output csv directory path.'
}, {
  name: 'error',
  short: 'e',
  type: 'path',
  description: 'output error file path.'
}, {
  name: 'tajima',
  short: 'T',
  type: 'boolean',
  description: 'search from tajima'
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

var outputDir = args.options.output || '.';
var errorTxt = args.options.error || 'error.txt';
var searchers = [];

(function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(words) {
    var browser, page, errors, _searchers;

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
            errors = [];
            _searchers = [];


            if (args.options.itoyokado) _searchers.push(new _IyecSearch2.default(outputDir, page, errors));
            if (args.options.aeon) _searchers.push(new _AeonSearch2.default(outputDir, page, errors));
            if (args.options.tajima) _searchers.push(new _TajimaSearch2.default(outputDir, page, errors));
            if (_searchers.length === 0) _searchers.push(new _IyecSearch2.default(outputDir, page, errors));

            _context2.next = 19;
            return (0, _pIteration.forEachSeries)(_searchers, function () {
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

            if (errors.length) {
              console.log('\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002' + errorTxt + ' \u3078\u51FA\u529B\u3057\u307E\u3059\u3002');
              _fs2.default.writeFile(errorTxt, errors.join('\n'), function (err) {
                if (err) {
                  throw err;
                }
              });
            }
            _context2.next = 25;
            break;

          case 22:
            _context2.prev = 22;
            _context2.t0 = _context2['catch'](3);

            console.log(_context2.t0.stack);

          case 25:
            _context2.prev = 25;

            console.log('finally');
            browser.close();
            return _context2.finish(25);

          case 29:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 22, 25, 29]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})()(args.targets);
//# sourceMappingURL=index.js.map