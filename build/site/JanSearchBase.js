'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REPLACERS = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _stream = require('stream');

var _stream2 = _interopRequireDefault(_stream);

var _pIteration = require('p-iteration');

var _cheerioHttpcli = require('cheerio-httpcli');

var _cheerioHttpcli2 = _interopRequireDefault(_cheerioHttpcli);

var _WriterCreator = require('../util/WriterCreator');

var _WriterCreator2 = _interopRequireDefault(_WriterCreator);

var _constants = require('../constants');

var _constants2 = _interopRequireDefault(_constants);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JanSearchBase = function () {
  function JanSearchBase(args) {
    _classCallCheck(this, JanSearchBase);

    Object.assign(this, args);
    // this.outputDir = outputDir;
    // this.page = page;
    // this.errors = errors;
    this.timeout = _constants2.default.timeout;
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
     * セレクタの要素を複数取得します。スラッシュ始まりの場合、XPath形式とみなします。
     * @param {string} selector
     * @return {Array<Promise>} 選択した要素
     */

  }, {
    key: 'xselectLink',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(selector) {
        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                if (!selector.startsWith('/')) {
                  _context3.next = 6;
                  break;
                }

                _context3.next = 3;
                return this.page.$x(selector);

              case 3:
                _context3.t0 = _context3.sent;
                _context3.next = 9;
                break;

              case 6:
                _context3.next = 8;
                return this.page.$$(selector);

              case 8:
                _context3.t0 = _context3.sent;

              case 9:
                return _context3.abrupt('return', _context3.t0);

              case 10:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function xselectLink(_x2) {
        return _ref3.apply(this, arguments);
      }

      return xselectLink;
    }()
  }, {
    key: 'xselectClick',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(selector) {
        var link;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                if (!selector) {
                  _context4.next = 11;
                  break;
                }

                console.log('*** xselectClick ' + selector + ' ***');
                _context4.next = 4;
                return this.xselectLink(selector);

              case 4:
                link = _context4.sent;

                if (!(link.length > 0)) {
                  _context4.next = 11;
                  break;
                }

                console.log('*** xselectClick ' + selector + ' click');
                _context4.next = 9;
                return link[0].click();

              case 9:
                _context4.next = 11;
                return this.waitLoaded();

              case 11:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function xselectClick(_x3) {
        return _ref4.apply(this, arguments);
      }

      return xselectClick;
    }()

    /**
     * ページロードを待ちます。
     */

  }, {
    key: 'waitLoaded',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {
        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                console.log('*** waitLoaded ***');
                _context5.prev = 1;
                _context5.next = 4;
                return this.page.waitForNavigation({ timeout: this.timeout, waitUntil: 'domcontentloaded' });

              case 4:
                _context5.next = 8;
                break;

              case 6:
                _context5.prev = 6;
                _context5.t0 = _context5['catch'](1);

              case 8:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[1, 6]]);
      }));

      function waitLoaded() {
        return _ref5.apply(this, arguments);
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
      var _ref6 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function init() {
        return _ref6.apply(this, arguments);
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
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {
        var _this2 = this;

        for (var _len3 = arguments.length, keywords = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
          keywords[_key3] = arguments[_key3];
        }

        return regeneratorRuntime.wrap(function _callee8$(_context8) {
          while (1) {
            switch (_context8.prev = _context8.next) {
              case 0:
                console.log('*** janSearch ***');
                _context8.next = 3;
                return this.page.goto(this.getSrcConfig().top, { waitUntil: 'networkidle2' });

              case 3:
                _context8.next = 5;
                return this.init();

              case 5:
                _context8.next = 7;
                return (0, _pIteration.forEachSeries)(keywords, function () {
                  var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(keyword) {
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                      while (1) {
                        switch (_context7.prev = _context7.next) {
                          case 0:
                            _context7.next = 2;
                            return _this2.searchWord(keyword);

                          case 2:
                            return _context7.abrupt('return', _context7.sent);

                          case 3:
                          case 'end':
                            return _context7.stop();
                        }
                      }
                    }, _callee7, _this2);
                  }));

                  return function (_x4) {
                    return _ref8.apply(this, arguments);
                  };
                }());

              case 7:
              case 'end':
                return _context8.stop();
            }
          }
        }, _callee8, this);
      }));

      function search() {
        return _ref7.apply(this, arguments);
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
      var _ref9 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9(word) {
        var config, outputFile;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                console.log('*** search[' + word + '] ***');
                config = this.getSrcConfig();
                outputFile = this.outputDir + '/' + config.prefix + '_' + word.replace(/ +/g, '_') + '.csv';

                this.writer = _WriterCreator2.default.createCsvWriter(outputFile);
                _context9.next = 6;
                return this.page.type(config.searchPageSelectors.searchText, word);

              case 6:
                _context9.next = 8;
                return this.page.click(config.searchPageSelectors.searchButton);

              case 8:
                _context9.next = 10;
                return this.waitLoaded();

              case 10:
                _context9.next = 12;
                return this.xselectClick(config.searchPageSelectors.cushion);

              case 12:
                _context9.next = 14;
                return this.eachItemFromSearchResult();

              case 14:
                this.writer.close();
                console.log('Output done. [' + outputFile + ']');

              case 16:
              case 'end':
                return _context9.stop();
            }
          }
        }, _callee9, this);
      }));

      function searchWord(_x5) {
        return _ref9.apply(this, arguments);
      }

      return searchWord;
    }()

    /**
     * 検索結果画面の商品分のリンク先を取得し、すべてのjan情報をかえします。　
     */

  }, {
    key: 'eachItemFromSearchResult',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {
        var _this3 = this;

        var links, skipCheerio, result;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                console.log('*** eachItemFromSearchResult ***');
                _context11.next = 3;
                return this.getAllJanUrls();

              case 3:
                links = _context11.sent;

                console.log('** LINKS', links);
                skipCheerio = false;
                _context11.next = 8;
                return (0, _pIteration.mapSeries)(links, function () {
                  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(link, idx) {
                    var jan;
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                      while (1) {
                        switch (_context10.prev = _context10.next) {
                          case 0:
                            _context10.prev = 0;

                            console.log('PRODUCTS[' + (idx + 1) + '/' + links.length + ']');
                            jan = void 0;

                            if (!(_this3.options['enable-cheerio-httpcli'] && !skipCheerio)) {
                              _context10.next = 8;
                              break;
                            }

                            _context10.next = 6;
                            return _this3.getJanByCheerioHttpcli(link);

                          case 6:
                            jan = _context10.sent;

                            skipCheerio = jan === undefined;

                          case 8:
                            if (jan) {
                              _context10.next = 12;
                              break;
                            }

                            _context10.next = 11;
                            return _this3.getJan(link);

                          case 11:
                            jan = _context10.sent;

                          case 12:
                            if (jan) {
                              _context10.next = 15;
                              break;
                            }

                            _this3.addErr('商品ページへ移動できませんでした', link);
                            return _context10.abrupt('return');

                          case 15:
                            _this3.writer.write(_this3.replceValues(_this3.getSrcConfig().replacer, jan));
                            _context10.next = 22;
                            break;

                          case 18:
                            _context10.prev = 18;
                            _context10.t0 = _context10['catch'](0);

                            _this3.addErr('商品ページへ移動できませんでした', link, _context10.t0);
                            return _context10.abrupt('return');

                          case 22:
                          case 'end':
                            return _context10.stop();
                        }
                      }
                    }, _callee10, _this3, [[0, 18]]);
                  }));

                  return function (_x6, _x7) {
                    return _ref11.apply(this, arguments);
                  };
                }());

              case 8:
                result = _context11.sent;

              case 9:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function eachItemFromSearchResult() {
        return _ref10.apply(this, arguments);
      }

      return eachItemFromSearchResult;
    }()

    /**
     * 検索結果ページの商品URLをすべて取得します。次ページがある場合にはすべてのページを取得します。
     */

  }, {
    key: 'getAllJanUrls',
    value: function () {
      var _ref12 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {
        var config;
        return regeneratorRuntime.wrap(function _callee12$(_context12) {
          while (1) {
            switch (_context12.prev = _context12.next) {
              case 0:
                console.log('*** getAllJanUrls ***');
                config = this.getSrcConfig();

                if (!config.searchPageSelectors.scrollToBottom) {
                  _context12.next = 6;
                  break;
                }

                return _context12.abrupt('return', this.getAllJanUrlsScrollToBottom());

              case 6:
                if (!config.searchPageSelectors.nextLink) {
                  _context12.next = 8;
                  break;
                }

                return _context12.abrupt('return', this.getAllJanUrlsPageTransition());

              case 8:
                this.addErr('JANリンク取得方法が定義されていません。');
                return _context12.abrupt('return', []);

              case 10:
              case 'end':
                return _context12.stop();
            }
          }
        }, _callee12, this);
      }));

      function getAllJanUrls() {
        return _ref12.apply(this, arguments);
      }

      return getAllJanUrls;
    }()
  }, {
    key: 'getAllJanUrlsPageTransition',
    value: function () {
      var _ref13 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {
        var page, productsSel, nextSel, links, nexts;
        return regeneratorRuntime.wrap(function _callee13$(_context13) {
          while (1) {
            switch (_context13.prev = _context13.next) {
              case 0:
                console.log('*** getAllJanUrlsPageTransition ***');
                page = 1;
                productsSel = this.getSrcConfig().searchPageSelectors.productsLink;
                nextSel = this.getSrcConfig().searchPageSelectors.nextLink;
                _context13.next = 6;
                return this.page.$$eval(productsSel, function (list) {
                  return list.map(function (item) {
                    return item.href;
                  });
                });

              case 6:
                links = _context13.sent;
                nexts = void 0;

              case 8:
                _context13.next = 10;
                return this.xselectLink(nextSel);

              case 10:
                _context13.t0 = (nexts = _context13.sent).length;

                if (!(_context13.t0 > 0)) {
                  _context13.next = 27;
                  break;
                }

                // →ボタンがある
                console.log('PAGE ' + ++page);
                _context13.next = 15;
                return nexts[0].click();

              case 15:
                _context13.next = 17;
                return this.waitLoaded();

              case 17:
                _context13.t1 = links.push;
                _context13.t2 = links;
                _context13.t3 = _toConsumableArray;
                _context13.next = 22;
                return this.page.$$eval(productsSel, function (list) {
                  return list.map(function (item) {
                    return item.href;
                  });
                });

              case 22:
                _context13.t4 = _context13.sent;
                _context13.t5 = (0, _context13.t3)(_context13.t4);

                _context13.t1.apply.call(_context13.t1, _context13.t2, _context13.t5);

                _context13.next = 8;
                break;

              case 27:
                return _context13.abrupt('return', links);

              case 28:
              case 'end':
                return _context13.stop();
            }
          }
        }, _callee13, this);
      }));

      function getAllJanUrlsPageTransition() {
        return _ref13.apply(this, arguments);
      }

      return getAllJanUrlsPageTransition;
    }()
  }, {
    key: 'getAllJanUrlsScrollToBottom',
    value: function () {
      var _ref14 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {
        var productsSel;
        return regeneratorRuntime.wrap(function _callee14$(_context14) {
          while (1) {
            switch (_context14.prev = _context14.next) {
              case 0:
                console.log('*** getAllJanUrlsScrollToBottom ***');
                _context14.next = 3;
                return this.scrollToBottom(this.page, _constants2.default.viewport.height);

              case 3:
                productsSel = this.getSrcConfig().searchPageSelectors.productsLink;
                _context14.next = 6;
                return this.page.$$eval(productsSel, function (list) {
                  return list.map(function (item) {
                    return item.href;
                  });
                });

              case 6:
                return _context14.abrupt('return', _context14.sent);

              case 7:
              case 'end':
                return _context14.stop();
            }
          }
        }, _callee14, this);
      }));

      function getAllJanUrlsScrollToBottom() {
        return _ref14.apply(this, arguments);
      }

      return getAllJanUrlsScrollToBottom;
    }()
  }, {
    key: 'scrollToBottom',
    value: function () {
      var _ref15 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15(page, viewportHeight) {
        var getScrollHeight, scrollHeight, currentPosition, scrollNumber, nextPosition;
        return regeneratorRuntime.wrap(function _callee15$(_context15) {
          while (1) {
            switch (_context15.prev = _context15.next) {
              case 0:
                getScrollHeight = function getScrollHeight() {
                  return Promise.resolve(document.documentElement.scrollHeight);
                };

                _context15.next = 3;
                return page.evaluate(getScrollHeight);

              case 3:
                scrollHeight = _context15.sent;
                currentPosition = 0;
                scrollNumber = 0;

              case 6:
                if (!(currentPosition < scrollHeight)) {
                  _context15.next = 22;
                  break;
                }

                scrollNumber += 1;
                nextPosition = scrollNumber * viewportHeight;
                _context15.next = 11;
                return page.evaluate(function (scrollTo) {
                  return Promise.resolve(window.scrollTo(0, scrollTo));
                }, nextPosition);

              case 11:
                _context15.next = 13;
                return page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 5000 }).catch(function (e) {
                  return console.log('timeout exceed. proceed to next operation');
                });

              case 13:

                currentPosition = nextPosition;
                console.log('scrollNumber: ' + scrollNumber);
                console.log('currentPosition: ' + currentPosition);

                // 2
                _context15.next = 18;
                return page.evaluate(getScrollHeight);

              case 18:
                scrollHeight = _context15.sent;

                console.log('ScrollHeight ' + scrollHeight);
                _context15.next = 6;
                break;

              case 22:
              case 'end':
                return _context15.stop();
            }
          }
        }, _callee15, this);
      }));

      function scrollToBottom(_x8, _x9) {
        return _ref15.apply(this, arguments);
      }

      return scrollToBottom;
    }()

    /**
     * 商品ページからjan情報をかえします。
     */

  }, {
    key: 'getJan',
    value: function () {
      var _ref16 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee17(url) {
        var _this4 = this;

        return regeneratorRuntime.wrap(function _callee17$(_context17) {
          while (1) {
            switch (_context17.prev = _context17.next) {
              case 0:
                console.log('*** getJan ***');
                _context17.next = 3;
                return this.page.goto(url, { waitUntil: 'networkidle2' });

              case 3:
                _context17.prev = 3;
                _context17.next = 6;
                return (0, _pIteration.reduce)(Object.keys(this.getSrcConfig().productPageSelectors), function () {
                  var _ref17 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16(acc, key) {
                    return regeneratorRuntime.wrap(function _callee16$(_context16) {
                      while (1) {
                        switch (_context16.prev = _context16.next) {
                          case 0:
                            _context16.next = 2;
                            return _this4.getPageText(key);

                          case 2:
                            acc[key] = _context16.sent;
                            return _context16.abrupt('return', acc);

                          case 4:
                          case 'end':
                            return _context16.stop();
                        }
                      }
                    }, _callee16, _this4);
                  }));

                  return function (_x11, _x12) {
                    return _ref17.apply(this, arguments);
                  };
                }(), {});

              case 6:
                return _context17.abrupt('return', _context17.sent);

              case 9:
                _context17.prev = 9;
                _context17.t0 = _context17['catch'](3);

                this.addErr('JANがページから取得できませんでした', url);
                return _context17.abrupt('return', undefined);

              case 13:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this, [[3, 9]]);
      }));

      function getJan(_x10) {
        return _ref16.apply(this, arguments);
      }

      return getJan;
    }()
  }, {
    key: 'getJanByCheerioHttpcli',
    value: function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(url) {
        var _this5 = this;

        return regeneratorRuntime.wrap(function _callee18$(_context18) {
          while (1) {
            switch (_context18.prev = _context18.next) {
              case 0:
                console.log('*** getJanByCheerioHttpcli ***');
                _context18.next = 3;
                return _cheerioHttpcli2.default.fetch(url).then(function (_ref19) {
                  var err = _ref19.err,
                      $ = _ref19.$,
                      res = _ref19.res,
                      body = _ref19.body;

                  return Object.keys(_this5.getSrcConfig().productPageSelectors).reduce(function (acc, key) {
                    var txt = $(_this5.getSrcConfig().productPageSelectors[key]).text();
                    if (!acc || !txt) {
                      console.log('getJanByCheerioHttpcli failed');
                      return undefined;
                    }
                    acc[key] = txt.replace(/[\s　]+/, ' ').replace(/[\r\n]/g, '');
                    return acc;
                  }, {});
                }).catch(function (e) {
                  return undefined;
                });

              case 3:
                return _context18.abrupt('return', _context18.sent);

              case 4:
              case 'end':
                return _context18.stop();
            }
          }
        }, _callee18, this);
      }));

      function getJanByCheerioHttpcli(_x13) {
        return _ref18.apply(this, arguments);
      }

      return getJanByCheerioHttpcli;
    }()
  }, {
    key: 'getPageText',
    value: function () {
      var _ref20 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(key) {
        var sel, text;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                sel = this.getSrcConfig().productPageSelectors[key];
                text = '';
                _context19.prev = 2;
                _context19.next = 5;
                return this.page.$eval(sel, function (item) {
                  return item.textContent;
                });

              case 5:
                return _context19.abrupt('return', text = _context19.sent);

              case 6:
                _context19.prev = 6;

                if (this.options['debug-pagetext']) {
                  console.log('getPageText[' + key + '][' + sel + '][' + text + ']');
                }
                return _context19.finish(6);

              case 9:
              case 'end':
                return _context19.stop();
            }
          }
        }, _callee19, this, [[2,, 6, 9]]);
      }));

      function getPageText(_x14) {
        return _ref20.apply(this, arguments);
      }

      return getPageText;
    }()
  }]);

  return JanSearchBase;
}();

/** 共通リプレーサ定義 */


exports.default = JanSearchBase;
var REPLACERS = exports.REPLACERS = {
  toHarfWidth: {
    pattern: /[！-～]/g,
    value: function value(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }
  },
  toHarfWidthAlnum: {
    pattern: /[Ａ-Ｚａ-ｚ０-９]/g,
    value: function value(s) {
      return String.fromCharCode(s.charCodeAt(0) - 0xFEE0);
    }
  },
  toHarfWidthSpace: {
    pattern: /　+/g,
    value: ' '
  }
};
//# sourceMappingURL=JanSearchBase.js.map