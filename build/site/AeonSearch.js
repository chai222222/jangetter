'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _pIteration = require('p-iteration');

var _JanSearchBase2 = require('./JanSearchBase');

var _JanSearchBase3 = _interopRequireDefault(_JanSearchBase2);

var _Replacer = require('../util/Replacer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var AEON_CONSTANTS = {
  zip1: '214',
  zip2: '0038',
  searchConfig: {
    prefix: 'Aeon',
    top: 'https://www.aeonnetshop.com/',
    searchPageSelectors: {
      productsLink: 'div.search.results ol li > a',
      nextLink: '//div[@class="column main"]/div[last()]//a[@tabindex=0]/span[contains(text(), "次")]',
      searchText: '#search',
      searchButton: '#cx-search-button'
    },
    productPageSelectors: {
      jan: 'p.jan-code',
      category: '#recently_category ul',
      title: 'div.product-info-main H2.section-title-text'
    },
    productPageImageSelectors: {
      picture: 'img.fotorama__img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.trim, _Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toHarfWidthSpace],
      jan: [{
        pattern: /\D/g,
        value: ''
      }],
      category: [_Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim]
    }
  }
};

var AeonSearch = function (_JanSearchBase) {
  _inherits(AeonSearch, _JanSearchBase);

  function AeonSearch() {
    _classCallCheck(this, AeonSearch);

    return _possibleConstructorReturn(this, (AeonSearch.__proto__ || Object.getPrototypeOf(AeonSearch)).apply(this, arguments));
  }

  _createClass(AeonSearch, [{
    key: 'init',


    /**
     * 検索可能画面になるまで遷移する。
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var needInputShop, fairDialogClose;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.existsAll('#zip1', '#zip2', '#shop_search_1');

              case 2:
                needInputShop = _context.sent;

                if (!needInputShop) {
                  _context.next = 14;
                  break;
                }

                _context.next = 6;
                return this.page.type('#zip1', AEON_CONSTANTS.zip1);

              case 6:
                _context.next = 8;
                return this.page.type('#zip2', AEON_CONSTANTS.zip2);

              case 8:
                this.page.click('#shop_search_1');
                _context.next = 11;
                return this.page.waitFor(1000);

              case 11:
                this.page.click('#shop_search_result_list_area .result-list-area a');
                // await this.page.waitFor(10000);
                _context.next = 14;
                return this.waitLoaded();

              case 14:
                _context.next = 16;
                return this.existsAll('a.pc2015-close');

              case 16:
                fairDialogClose = _context.sent;

                if (!fairDialogClose) {
                  _context.next = 21;
                  break;
                }

                this.page.click('a.pc2015-close');
                _context.next = 21;
                return this.waitLoaded();

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function init() {
        return _ref.apply(this, arguments);
      }

      return init;
    }()
  }, {
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return AEON_CONSTANTS.searchConfig;
    }
  }]);

  return AeonSearch;
}(_JanSearchBase3.default);

exports.default = AeonSearch;
//# sourceMappingURL=AeonSearch.js.map