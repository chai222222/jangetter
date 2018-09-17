'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _pIteration = require('p-iteration');

var _WriterCreator = require('../util/WriterCreator');

var _WriterCreator2 = _interopRequireDefault(_WriterCreator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JanSearchBase = function () {
  function JanSearchBase(outputDir, page, errors) {
    _classCallCheck(this, JanSearchBase);

    this.outputDir = outputDir;
    this.page = page;
    this.errors = errors;
    this.timeout = 30000;
  }

  /**
   * セレクタが全て存在するかチェックします。
   * @param {*} selectors
   */


  _createClass(JanSearchBase, [{
    key: 'existsAll',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
        var _this = this;

        for (var _len = arguments.length, selectors = Array(_len), _key = 0; _key < _len; _key++) {
          selectors[_key] = arguments[_key];
        }

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                return _context2.abrupt('return', selectors.length > 0 && (0, _pIteration.every)(selectors, function () {
                  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(selector) {
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                      while (1) {
                        switch (_context.prev = _context.next) {
                          case 0:
                            _context.next = 2;
                            return _this.page.$(selector);

                          case 2:
                            _context.t0 = _context.sent;
                            return _context.abrupt('return', _context.t0 !== null);

                          case 4:
                          case 'end':
                            return _context.stop();
                        }
                      }
                    }, _callee, _this);
                  }));

                  return function (_x) {
                    return _ref2.apply(this, arguments);
                  };
                }()));

              case 1:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function existsAll() {
        return _ref.apply(this, arguments);
      }

      return existsAll;
    }()

    /**
     * ページロードを待ちます。
     */

  }, {
    key: 'waitLoaded',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                console.log('*** waitLoaded ***');
                _context3.prev = 1;
                _context3.next = 4;
                return this.page.waitForNavigation({ timeout: this.timeout, waitUntil: 'domcontentloaded' });

              case 4:
                _context3.next = 8;
                break;

              case 6:
                _context3.prev = 6;
                _context3.t0 = _context3['catch'](1);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[1, 6]]);
      }));

      function waitLoaded() {
        return _ref3.apply(this, arguments);
      }

      return waitLoaded;
    }()
  }, {
    key: 'addErr',
    value: function addErr() {
      for (var _len2 = arguments.length, errs = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        errs[_key2] = arguments[_key2];
      }

      this.errors.push(errs.join(','));
    }

    /**
     * jan, title, categoryの値を定義にそって置き換えを行います。
     */

  }, {
    key: 'replceValues',
    value: function replceValues(replaceDef, obj) {
      var nobj = _extends({}, obj);
      Object.keys(replaceDef).filter(function (key) {
        return key in nobj;
      }).forEach(function (key) {
        return nobj[key] = replaceDef[key].reduce(function (acc, def) {
          acc = acc.replace(def.pattern, def.value);
          return acc;
        }, nobj[key]);
      });
      return nobj;
    }
  }, {
    key: 'init',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function init() {
        return _ref4.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'getSrcConfig',
    value: function getSrcConfig() {}
  }, {
    key: 'setNewReader',
    value: function setNewReader() {}

    /**
     * 引数で渡された検索ワードを検索して jan 情報を返します。
     */

  }, {
    key: 'search',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this2 = this;

        for (var _len3 = arguments.length, keywords = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          keywords[_key3] = arguments[_key3];
        }

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.log('*** janSearch ***');
                _context6.next = 3;
                return this.page.goto(this.getSrcConfig().top, { waitUntil: 'networkidle2' });

              case 3:
                _context6.next = 5;
                return this.init();

              case 5:
                _context6.next = 7;
                return (0, _pIteration.forEachSeries)(keywords, function () {
                  var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(keyword) {
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                      while (1) {
                        switch (_context5.prev = _context5.next) {
                          case 0:
                            _context5.next = 2;
                            return _this2.searchWord(keyword);

                          case 2:
                            return _context5.abrupt('return', _context5.sent);

                          case 3:
                          case 'end':
                            return _context5.stop();
                        }
                      }
                    }, _callee5, _this2);
                  }));

                  return function (_x2) {
                    return _ref6.apply(this, arguments);
                  };
                }());

              case 7:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function search() {
        return _ref5.apply(this, arguments);
      }

      return search;
    }()

    /**
     * １キーワードの検索処理を行って、すべてのjan情報を返します。
     * @param {*} word
     */

  }, {
    key: 'searchWord',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(word) {
        var config, outputFile;
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                console.log('*** search[' + word + '] ***');
                config = this.getSrcConfig();
                outputFile = this.outputDir + '/' + config.prefix + '_' + word.replace(/ +/g, '_') + '.csv';

                this.writer = _WriterCreator2.default.createCsvWriter(outputFile);
                _context7.next = 6;
                return this.page.type(config.searchPageSelectors.searchText, word);

              case 6:
                _context7.next = 8;
                return this.page.click(config.searchPageSelectors.searchButton);

              case 8:
                _context7.next = 10;
                return this.waitLoaded();

              case 10:
                _context7.next = 12;
                return this.eachItemFromSearchResult();

              case 12:
                this.writer.close();
                console.log('Output done. [' + outputFile + ']');

              case 14:
              case 'end':
                return _context7.stop();
            }
          }
        }, _callee7, this);
      }));

      function searchWord(_x3) {
        return _ref7.apply(this, arguments);
      }

      return searchWord;
    }()

    /**
     * 検索結果画面の商品分のリンク先を取得し、すべてのjan情報をかえします。　
     */

  }, {
    key: 'eachItemFromSearchResult',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {
        var _this3 = this;

        var links, result;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                console.log('*** eachItemFromSearchResult ***');
                _context9.next = 3;
                return this.getAllJanUrls();

              case 3:
                links = _context9.sent;

                console.log(links);
                _context9.next = 7;
                return (0, _pIteration.mapSeries)(links, function () {
                  var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8(link) {
                    var jan;
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            _context8.prev = 0;
                            _context8.next = 3;
                            return _this3.page.goto(link, { waitUntil: 'networkidle2' });

                          case 3:
                            _context8.next = 5;
                            return _this3.getJan();

                          case 5:
                            jan = _context8.sent;

                            _this3.writer.write(jan);
                            _context8.next = 13;
                            break;

                          case 9:
                            _context8.prev = 9;
                            _context8.t0 = _context8['catch'](0);

                            _this3.addErr('商品ページへ移動できませんでした', link, _context8.t0);
                            return _context8.abrupt('return', null);

                          case 13:
                          case 'end':
                            return _context8.stop();
                        }
                      }
                    }, _callee8, _this3, [[0, 9]]);
                  }));

                  return function (_x4) {
                    return _ref9.apply(this, arguments);
                  };
                }());

              case 7:
                result = _context9.sent;

              case 8:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function eachItemFromSearchResult() {
        return _ref8.apply(this, arguments);
      }

      return eachItemFromSearchResult;
    }()

    /**
     * 検索結果ページの商品URLをすべて取得します。次ページがある場合にはすべてのページを取得します。
     */

  }, {
    key: 'getAllJanUrls',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {
        var page, productsSel, nextSel, links;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                console.log('*** getAllJanUrls ***');
                page = 1;
                productsSel = this.getSrcConfig().searchPageSelectors.productsLink;
                nextSel = this.getSrcConfig().searchPageSelectors.nextLink;
                _context10.next = 6;
                return this.page.$$eval(productsSel, function (list) {
                  return list.map(function (item) {
                    return item.href;
                  });
                });

              case 6:
                links = _context10.sent;

              case 7:
                _context10.next = 9;
                return this.existsAll(nextSel);

              case 9:
                if (!_context10.sent) {
                  _context10.next = 25;
                  break;
                }

                // →ボタンがある
                console.log('page ' + ++page);
                _context10.next = 13;
                return this.page.click(nextSel);

              case 13:
                _context10.next = 15;
                return this.waitLoaded();

              case 15:
                _context10.t0 = links.push;
                _context10.t1 = links;
                _context10.t2 = _toConsumableArray;
                _context10.next = 20;
                return this.page.$$eval(productsSel, function (list) {
                  return list.map(function (item) {
                    return item.href;
                  });
                });

              case 20:
                _context10.t3 = _context10.sent;
                _context10.t4 = (0, _context10.t2)(_context10.t3);

                _context10.t0.apply.call(_context10.t0, _context10.t1, _context10.t4);

                _context10.next = 7;
                break;

              case 25:
                return _context10.abrupt('return', links);

              case 26:
              case 'end':
                return _context10.stop();
            }
          }
        }, _callee10, this);
      }));

      function getAllJanUrls() {
        return _ref10.apply(this, arguments);
      }

      return getAllJanUrls;
    }()

    /**
     * 商品ページからjan情報をかえします。
     */

  }, {
    key: 'getJan',
    value: function () {
      var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var url;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                console.log('*** getJan ***');
                _context11.prev = 1;
                _context11.t0 = this;
                _context11.t1 = this.getSrcConfig().replacer;
                _context11.next = 6;
                return this.getPageJan();

              case 6:
                _context11.t2 = _context11.sent;
                _context11.next = 9;
                return this.getPageCategory();

              case 9:
                _context11.t3 = _context11.sent;
                _context11.next = 12;
                return this.getPageTitle();

              case 12:
                _context11.t4 = _context11.sent;
                _context11.t5 = {
                  jan: _context11.t2,
                  category: _context11.t3,
                  title: _context11.t4
                };
                return _context11.abrupt('return', _context11.t0.replceValues.call(_context11.t0, _context11.t1, _context11.t5));

              case 17:
                _context11.prev = 17;
                _context11.t6 = _context11['catch'](1);
                _context11.next = 21;
                return this.page.url();

              case 21:
                url = _context11.sent;

                this.addErr('JANがページから取得できませんでした', url);
                return _context11.abrupt('return', { jan: '', category: '', title: '' });

              case 24:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this, [[1, 17]]);
      }));

      function getJan() {
        return _ref11.apply(this, arguments);
      }

      return getJan;
    }()
  }, {
    key: 'getPageJan',
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                _context12.next = 2;
                return this.page.$eval(this.getSrcConfig().productPageSelectors.jan, function (item) {
                  return item.textContent;
                });

              case 2:
                return _context12.abrupt('return', _context12.sent);

              case 3:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getPageJan() {
        return _ref12.apply(this, arguments);
      }

      return getPageJan;
    }()
  }, {
    key: 'getPageCategory',
    value: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                _context13.next = 2;
                return this.page.$eval(this.getSrcConfig().productPageSelectors.category, function (item) {
                  return item.textContent;
                });

              case 2:
                return _context13.abrupt('return', _context13.sent);

              case 3:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getPageCategory() {
        return _ref13.apply(this, arguments);
      }

      return getPageCategory;
    }()
  }, {
    key: 'getPageTitle',
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                _context14.next = 2;
                return this.page.$eval(this.getSrcConfig().productPageSelectors.title, function (item) {
                  return item.textContent;
                });

              case 2:
                return _context14.abrupt('return', _context14.sent);

              case 3:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function getPageTitle() {
        return _ref14.apply(this, arguments);
      }

      return getPageTitle;
    }()
  }]);

  return JanSearchBase;
}();

exports.default = JanSearchBase;
//# sourceMappingURL=JanSearchBase.js.map