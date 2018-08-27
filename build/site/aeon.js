'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pIteration = require('p-iteration');

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AEON_CONSTANTS = {
  timeout: 30000,
  top: 'https://www.aeonnetshop.com/',
  zip1: '214',
  zip2: '0038',
  replacer: {
    title: [{
      pattern: /おうちでイオン イオンネットスーパー|: イオン本牧店/g,
      value: ''
    }],
    jan: [{
      pattern: /\D/g,
      value: ''
    }],
    category: [{
      pattern: /\t/g,
      value: ''
    }, {
      pattern: /^\n+/,
      value: ''
    }, {
      pattern: /\n+$/,
      value: ''
    }, {
      pattern: /\n/g,
      value: ';'
    }]
  }
};

var AeonSearch = function () {
  function AeonSearch(page) {
    _classCallCheck(this, AeonSearch);

    this.page = page;
  }

  /**
   * セレクタが全て存在するかチェックします。
   * @param {*} selectors
   */


  _createClass(AeonSearch, [{
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
                return this.page.waitForNavigation({ timeout: AEON_CONSTANTS.timeout, waitUntil: 'domcontentloaded' });

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

    /**
     * 検索可能画面になるまで遷移する。
     */

  }, {
    key: 'init',
    value: function () {
      var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
        var needInputShop;
        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return this.existsAll('#zip1', '#zip2', '#shop_search_1');

              case 2:
                needInputShop = _context4.sent;

                if (!needInputShop) {
                  _context4.next = 14;
                  break;
                }

                _context4.next = 6;
                return this.page.type('#zip1', AEON_CONSTANTS.zip1);

              case 6:
                _context4.next = 8;
                return this.page.type('#zip2', AEON_CONSTANTS.zip2);

              case 8:
                this.page.click('#shop_search_1');
                _context4.next = 11;
                return this.page.waitFor(1000);

              case 11:
                this.page.click('div.pc2015-main div.pc2015-select-menu-result a');
                // await this.page.waitFor(10000);
                _context4.next = 14;
                return this.waitLoaded();

              case 14:
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

    /**
     * 引数で渡された検索ワードを検索して jan 情報を返します。
     */

  }, {
    key: 'janSearch',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {
        var _this2 = this;

        for (var _len2 = arguments.length, keywords = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          keywords[_key2] = arguments[_key2];
        }

        return regeneratorRuntime.wrap(function _callee6$(_context6) {
          while (1) {
            switch (_context6.prev = _context6.next) {
              case 0:
                console.log('*** janSearch ***');
                _context6.next = 3;
                return this.page.goto(AEON_CONSTANTS.top, { waitUntil: 'networkidle2' });

              case 3:
                _context6.next = 5;
                return this.init();

              case 5:
                _context6.t0 = Array.prototype.concat;
                _context6.t1 = [];
                _context6.next = 9;
                return (0, _pIteration.map)(keywords, function () {
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

              case 9:
                _context6.t2 = _context6.sent;
                _context6.next = 12;
                return _context6.t0.apply.call(_context6.t0, _context6.t1, _context6.t2);

              case 12:
                return _context6.abrupt('return', _context6.sent);

              case 13:
              case 'end':
                return _context6.stop();
            }
          }
        }, _callee6, this);
      }));

      function janSearch() {
        return _ref5.apply(this, arguments);
      }

      return janSearch;
    }()

    /**
     * １キーワードの検索処理を行って、すべてのjan情報を返します。
     * @param {*} word
     */

  }, {
    key: 'searchWord',
    value: function () {
      var _ref7 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7(word) {
        return regeneratorRuntime.wrap(function _callee7$(_context7) {
          while (1) {
            switch (_context7.prev = _context7.next) {
              case 0:
                console.log('*** searchWord ***');
                _context7.next = 3;
                return this.page.type('#keyword', word);

              case 3:
                _context7.next = 5;
                return this.page.click('input[name=search]');

              case 5:
                _context7.next = 7;
                return this.waitLoaded();

              case 7:
                _context7.next = 9;
                return this.eachItemFromSearchResult();

              case 9:
                return _context7.abrupt('return', _context7.sent);

              case 10:
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

        var links;
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
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                      while (1) {
                        switch (_context8.prev = _context8.next) {
                          case 0:
                            _context8.next = 2;
                            return _this3.page.goto(link, { waitUntil: 'networkidle2' });

                          case 2:
                            _context8.next = 4;
                            return _this3.getJan();

                          case 4:
                            return _context8.abrupt('return', _context8.sent);

                          case 5:
                          case 'end':
                            return _context8.stop();
                        }
                      }
                    }, _callee8, _this3);
                  }));

                  return function (_x4) {
                    return _ref9.apply(this, arguments);
                  };
                }());

              case 7:
                return _context9.abrupt('return', _context9.sent);

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
        var page, productsCss, nextCss, links;
        return regeneratorRuntime.wrap(function _callee10$(_context10) {
          while (1) {
            switch (_context10.prev = _context10.next) {
              case 0:
                console.log('*** getAllJanUrls ***');
                page = 1;
                productsCss = 'ul.pc2015-item-list-selectable li > a:first-child';
                nextCss = 'div.pc2015-item-list-header a[rel=next]';
                _context10.next = 6;
                return this.page.$$eval(productsCss, function (list) {
                  return list.map(function (item) {
                    return item.href;
                  });
                });

              case 6:
                links = _context10.sent;

              case 7:
                _context10.next = 9;
                return this.existsAll(nextCss);

              case 9:
                if (!_context10.sent) {
                  _context10.next = 25;
                  break;
                }

                // →ボタンがある
                console.log('page ' + ++page);
                _context10.next = 13;
                return this.page.click(nextCss);

              case 13:
                _context10.next = 15;
                return this.waitLoaded();

              case 15:
                _context10.t0 = links.push;
                _context10.t1 = links;
                _context10.t2 = _toConsumableArray;
                _context10.next = 20;
                return this.page.$$eval(productsCss, function (list) {
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
                _context11.t1 = AEON_CONSTANTS.replacer;
                _context11.next = 6;
                return this.page.$eval('div.pc2015-item-other', function (item) {
                  return item.textContent;
                });

              case 6:
                _context11.t2 = _context11.sent;
                _context11.next = 9;
                return this.page.$eval('div.pc2015-main-block-body', function (item) {
                  return item.textContent;
                });

              case 9:
                _context11.t3 = _context11.sent;
                _context11.next = 12;
                return this.page.$eval('title', function (item) {
                  return item.textContent;
                });

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

                console.log('couldn\'t get [' + url + ']');
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
  }]);

  return AeonSearch;
}();

exports.default = AeonSearch;
//# sourceMappingURL=aeon.js.map