'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.REPLACERS = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _pIteration = require('p-iteration');

var _cheerioHttpcli = require('cheerio-httpcli');

var _cheerioHttpcli2 = _interopRequireDefault(_cheerioHttpcli);

var _mustache = require('mustache');

var _mustache2 = _interopRequireDefault(_mustache);

var _WriterCreator = require('../util/WriterCreator');

var _WriterCreator2 = _interopRequireDefault(_WriterCreator);

var _ImageDownload = require('../util/ImageDownload');

var _ImageDownload2 = _interopRequireDefault(_ImageDownload);

var _Replacer = require('../util/Replacer');

var _Replacer2 = _interopRequireDefault(_Replacer);

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
    // this.rc = rc;
    this.timeout = _constants2.default.timeout;
    this.replacer = new _Replacer2.default(this.getSrcConfig().replacer, _lodash2.default.get(this, 'rc.replacer'));
    this.imageInfo = {};
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

    /**
     * 検索設定定義を返す。
     * @return {Object} 検索設定定義
     * @property {String} prefix 出力プリフィックス
     * @property {String} top アクセス先頭ページ
     * @property {String} searchPageSelectors.searchText 検索文字列セレクタ
     * @property {String} searchPageSelectors.searchButton 検索ボタンセレクタ
     * @property {String} searchPageSelectors.nextLink 次へリンクセレクタ。XmlPathも設定可能
     * @property {String} searchPageSelectors.productsLink 商品ページリンクセレクタ
     * @property {String|Object} productPageSelectors.{カラム} データ取得セレクタ。
     *           オブジェクトの場合には、selにセレクタ、methodに取得メソッドを指定する。
     * @property {Array<Object>} replacer.{カラム} データ変換定義。patternに正規表現、valueに置き換え後の文字列。
     */

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
        var config, name, outputFile, tmpl, tmplBody, res;
        return regeneratorRuntime.wrap(function _callee9$(_context9) {
          while (1) {
            switch (_context9.prev = _context9.next) {
              case 0:
                console.log('*** search[' + word + '] ***');
                config = this.getSrcConfig();
                name = this.outputDir + '/' + config.prefix + '_' + word.replace(/ +/g, '_');
                outputFile = name + '.csv';

                if (this.options.image && !_fs2.default.existsSync(name)) {
                  console.log('mkdir ' + name);
                  _fs2.default.mkdirSync(name);
                }
                this.writer = _WriterCreator2.default.createCsvWriter(outputFile);
                _context9.next = 8;
                return this.page.type(config.searchPageSelectors.searchText, word);

              case 8:
                _context9.next = 10;
                return this.page.click(config.searchPageSelectors.searchButton);

              case 10:
                _context9.next = 12;
                return this.waitLoaded();

              case 12:
                _context9.next = 14;
                return this.xselectClick(config.searchPageSelectors.cushion);

              case 14:
                _context9.next = 16;
                return this.eachItemFromSearchResult(name);

              case 16:
                this.writer.close();
                console.log('Output done. [' + outputFile + ']');
                if (!_lodash2.default.isEmpty(this.imageInfo)) {
                  this.imageInfo.title = word;
                  _fs2.default.writeFileSync(name + '/data.json', JSON.stringify(this.imageInfo, null, 2));
                  tmpl = __dirname + '/../../tmpl/template.html';
                  tmplBody = _fs2.default.readFileSync(tmpl, { encoding: "utf-8" });
                  res = _mustache2.default.render(tmplBody, this.imageInfo);

                  _fs2.default.writeFileSync(name + '/index.html', res, 'utf-8');
                }

              case 19:
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
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11(dir) {
        var _this3 = this;

        var hasDupLinks, links, skipCheerio, result;
        return regeneratorRuntime.wrap(function _callee11$(_context11) {
          while (1) {
            switch (_context11.prev = _context11.next) {
              case 0:
                console.log('*** eachItemFromSearchResult ***');
                _context11.next = 3;
                return this.getAllJanUrls();

              case 3:
                hasDupLinks = _context11.sent;
                links = Array.from(new Set(hasDupLinks));

                console.log('** LINKS', links);
                skipCheerio = false;
                _context11.next = 9;
                return (0, _pIteration.mapSeries)(links, function () {
                  var _ref11 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10(link, idx) {
                    var jan, replacedJan;
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
                              _context10.next = 14;
                              break;
                            }

                            return _context10.abrupt('return');

                          case 14:
                            replacedJan = _this3.replacer.replceValues(jan);
                            _context10.next = 17;
                            return _this3.getImage(replacedJan, dir);

                          case 17:
                            _this3.writer.write(replacedJan);
                            _context10.next = 24;
                            break;

                          case 20:
                            _context10.prev = 20;
                            _context10.t0 = _context10['catch'](0);

                            _this3.addErr('商品ページへ移動できませんでした', link, _context10.t0);
                            return _context10.abrupt('return');

                          case 24:
                          case 'end':
                            return _context10.stop();
                        }
                      }
                    }, _callee10, _this3, [[0, 20]]);
                  }));

                  return function (_x7, _x8) {
                    return _ref11.apply(this, arguments);
                  };
                }());

              case 9:
                result = _context11.sent;

              case 10:
              case 'end':
                return _context11.stop();
            }
          }
        }, _callee11, this);
      }));

      function eachItemFromSearchResult(_x6) {
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

      function scrollToBottom(_x9, _x10) {
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

        var result;
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

                  return function (_x12, _x13) {
                    return _ref17.apply(this, arguments);
                  };
                }(), {});

              case 6:
                result = _context17.sent;
                return _context17.abrupt('return', result);

              case 10:
                _context17.prev = 10;
                _context17.t0 = _context17['catch'](3);

                console.log(_context17.t0);
                this.addErr('JANがページから取得できませんでした', url);
                return _context17.abrupt('return', undefined);

              case 15:
              case 'end':
                return _context17.stop();
            }
          }
        }, _callee17, this, [[3, 10]]);
      }));

      function getJan(_x11) {
        return _ref16.apply(this, arguments);
      }

      return getJan;
    }()
  }, {
    key: 'getImage',
    value: function () {
      var _ref18 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee19(jan, dir) {
        var _this5 = this;

        var rows, imgs, row;
        return regeneratorRuntime.wrap(function _callee19$(_context19) {
          while (1) {
            switch (_context19.prev = _context19.next) {
              case 0:
                if (!(!dir || !this.options.image)) {
                  _context19.next = 2;
                  break;
                }

                return _context19.abrupt('return');

              case 2:
                rows = this.imageInfo.rows || (this.imageInfo.rows = []);
                imgs = this.getSrcConfig().productPageImageSelectors;

                if (imgs) {
                  _context19.next = 6;
                  break;
                }

                throw new Error('Not defined productPageImageSelectors!');

              case 6:
                row = _extends({}, jan);
                _context19.next = 9;
                return (0, _pIteration.forEachSeries)(_lodash2.default.toPairs(imgs), function () {
                  var _ref19 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee18(_ref20) {
                    var _ref21 = _slicedToArray(_ref20, 2),
                        key = _ref21[0],
                        selector = _ref21[1];

                    var imageSrc;
                    return regeneratorRuntime.wrap(function _callee18$(_context18) {
                      while (1) {
                        switch (_context18.prev = _context18.next) {
                          case 0:
                            _context18.next = 2;
                            return _this5.page.evaluate(function (selector) {
                              return document.querySelector(selector).src;
                            }, selector);

                          case 2:
                            imageSrc = _context18.sent;

                            if (!imageSrc) {
                              _context18.next = 9;
                              break;
                            }

                            _context18.next = 6;
                            return (0, _ImageDownload2.default)(jan.title, imageSrc, dir + '/' + jan.jan + '_' + key);

                          case 6:
                            row[key] = _context18.sent;
                            _context18.next = 10;
                            break;

                          case 9:
                            console.log('Couldn\'t get image src ' + url + '.');

                          case 10:
                          case 'end':
                            return _context18.stop();
                        }
                      }
                    }, _callee18, _this5);
                  }));

                  return function (_x16) {
                    return _ref19.apply(this, arguments);
                  };
                }());

              case 9:
                rows.push(row);

              case 10:
              case 'end':
                return _context19.stop();
            }
          }
        }, _callee19, this);
      }));

      function getImage(_x14, _x15) {
        return _ref18.apply(this, arguments);
      }

      return getImage;
    }()
  }, {
    key: 'getJanByCheerioHttpcli',
    value: function () {
      var _ref22 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee20(url) {
        var _this6 = this;

        return regeneratorRuntime.wrap(function _callee20$(_context20) {
          while (1) {
            switch (_context20.prev = _context20.next) {
              case 0:
                console.log('*** getJanByCheerioHttpcli ***');
                _context20.next = 3;
                return _cheerioHttpcli2.default.fetch(url).then(function (_ref23) {
                  var err = _ref23.err,
                      $ = _ref23.$,
                      res = _ref23.res,
                      body = _ref23.body;

                  return Object.keys(_this6.getSrcConfig().productPageSelectors).reduce(function (acc, key) {
                    var txt = $(_this6.getSrcConfig().productPageSelectors[key]).text();
                    if (!acc || !txt) {
                      console.log('getJanByCheerioHttpcli failed');
                      return undefined;
                    }
                    acc[key] = txt.replace(/[\s　]+/, ' ').replace(/[\r\n]/g, '');
                    return acc;
                  }, {});
                }).catch(function (e) {
                  _this6.addErr('JANがページから取得できませんでした', url);
                  return undefined;
                });

              case 3:
                return _context20.abrupt('return', _context20.sent);

              case 4:
              case 'end':
                return _context20.stop();
            }
          }
        }, _callee20, this);
      }));

      function getJanByCheerioHttpcli(_x17) {
        return _ref22.apply(this, arguments);
      }

      return getJanByCheerioHttpcli;
    }()
  }, {
    key: 'getPageText',
    value: function () {
      var _ref24 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee21(key) {
        var sel, getter, text;
        return regeneratorRuntime.wrap(function _callee21$(_context21) {
          while (1) {
            switch (_context21.prev = _context21.next) {
              case 0:
                sel = this.getSrcConfig().productPageSelectors[key];
                getter = (typeof sel === 'undefined' ? 'undefined' : _typeof(sel)) === 'object' ? sel : { sel: sel, method: function method(item) {
                    return item.textContent;
                  } };
                text = '';
                _context21.prev = 3;
                _context21.next = 6;
                return this.page.$eval(getter.sel, getter.method);

              case 6:
                return _context21.abrupt('return', text = _context21.sent);

              case 7:
                _context21.prev = 7;

                if (this.options['debug-pagetext']) {
                  console.log('getPageText[' + key + '][' + sel + '][' + text + ']');
                }
                return _context21.finish(7);

              case 10:
              case 'end':
                return _context21.stop();
            }
          }
        }, _callee21, this, [[3,, 7, 10]]);
      }));

      function getPageText(_x18) {
        return _ref24.apply(this, arguments);
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
  },
  trim: [{ pattern: /^\s+/, value: '' }, { pattern: /\s+$/, value: '' }],
  toOneSpace: {
    pattern: /\s\s+/g,
    value: ' '
  },
  toOneLine: {
    pattern: /\r?\n/g,
    value: ' '
  }
};
//# sourceMappingURL=JanSearchBase.js.map