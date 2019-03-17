'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _JanSearchBase2 = require('./JanSearchBase');

var _JanSearchBase3 = _interopRequireDefault(_JanSearchBase2);

var _Replacer = require('../util/Replacer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LOHACO_CONSTANTS = {
  searchConfig: {
    prefix: 'Lohaco',
    top: 'https://lohaco.jp/',
    searchPageSelectors: {
      productsLink: 'div.prodImgBlc > a',
      nextLink: 'p.nextBtn > a',
      searchText: '#jsi-txtKeywd',
      searchButton: 'div.searchBtn'
    },
    productPageSelectors: {
      jan: 'table.prodSpecTable > tbody',
      category: 'div.blcCategoryNav div.blcCatNav',
      title: 'title'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.toHarfWidthAlnum, {
        pattern: /.*LOHACO *\- */g,
        value: ''
      }],
      jan: [_Replacer.REPLACERS.toOneLine, {
        pattern: /.*JANコード\s*/,
        value: ''
      }, {
        pattern: /\s+.*$/g,
        value: ''
      }],
      category: [_Replacer.REPLACERS.toOneSpace]
    }
  }
};

var TajimaSearch = function (_JanSearchBase) {
  _inherits(TajimaSearch, _JanSearchBase);

  function TajimaSearch() {
    _classCallCheck(this, TajimaSearch);

    return _possibleConstructorReturn(this, (TajimaSearch.__proto__ || Object.getPrototypeOf(TajimaSearch)).apply(this, arguments));
  }

  _createClass(TajimaSearch, [{
    key: 'init',


    /**
     * 検索可能画面になるまで遷移する。
     */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var popupedModal;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return this.existsAll('div.campaignModal > p.close');

              case 2:
                popupedModal = _context.sent;

                if (!popupedModal) {
                  _context.next = 7;
                  break;
                }

                this.page.click('div.campaignModal > p.close');
                _context.next = 7;
                return this.waitLoaded();

              case 7:
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
      return LOHACO_CONSTANTS.searchConfig;
    }
  }]);

  return TajimaSearch;
}(_JanSearchBase3.default);

exports.default = TajimaSearch;
//# sourceMappingURL=LohacoSearch.js.map