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

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _site = require('./site');

var _site2 = _interopRequireDefault(_site);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // eslint-disable-line import/no-extraneous-dependencies


process.on('unhandledRejection', console.dir);

function getSiteOpts() {
  var names = Object.keys(_site2.default).sort();
  var flag = new Set();
  var n2up = names.reduce(function (acc, name) {
    var c = name.charAt(0);
    if (flag.has(c)) {
      c = [].concat(_toConsumableArray(name), _toConsumableArray('0123456789')).find(function (c, idx) {
        return idx > 0 && names.every(function (name) {
          return name.charAt(0) !== c;
        });
      });
      if (!c) throw new Error('オプション設定できません');
    }
    flag.add(c);
    acc[name] = c.toLocaleUpperCase();
    return acc;
  }, {});
  return names.map(function (name) {
    return {
      name: name,
      short: n2up[name],
      type: 'boolean',
      description: 'search from ' + name
    };
  });
}

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
  name: 'debug-window',
  type: 'boolean',
  description: 'enable window'
}, {
  name: 'debug-url',
  type: 'boolean',
  description: 'enable log url'
}, {
  name: 'debug-pagetext',
  type: 'boolean',
  description: 'enable log url'
}, {
  name: 'enable-cheerio-httpcli',
  type: 'boolean',
  description: 'enable cheerio-httpcli.'
}].concat(_toConsumableArray(getSiteOpts())));
var args = _argv2.default.run();

if (args.targets.length < 1 || !Object.keys(_site2.default).some(function (name) {
  return args.options[name];
})) {
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
              headless: !args.options['debug-window'],
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
              if (args.options['debug-url']) {
                console.log("### URL ", frm.url());
              }
            });

          case 9:
            _context2.next = 11;
            return page.setViewport(_constants2.default.viewport);

          case 11:
            errors = [];
            _searchers = Object.keys(_site2.default).filter(function (name) {
              return args.options[name];
            }).map(function (name) {
              return _site2.default[name]({ outputDir: outputDir, page: page, errors: errors, options: args.options });
            });
            _context2.next = 15;
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

          case 15:

            if (errors.length) {
              console.log('\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u3002' + errorTxt + ' \u3078\u51FA\u529B\u3057\u307E\u3059\u3002');
              _fs2.default.writeFile(errorTxt, errors.join('\n'), function (err) {
                if (err) {
                  throw err;
                }
              });
            }
            _context2.next = 21;
            break;

          case 18:
            _context2.prev = 18;
            _context2.t0 = _context2['catch'](3);

            console.log(_context2.t0.stack);

          case 21:
            _context2.prev = 21;

            console.log('finally');
            browser.close();
            return _context2.finish(21);

          case 25:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[3, 18, 21, 25]]);
  }));

  return function (_x) {
    return _ref.apply(this, arguments);
  };
})()(args.targets);
//# sourceMappingURL=index.js.map