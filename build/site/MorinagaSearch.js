'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _JanSearchBase2 = require('./JanSearchBase');

var _JanSearchBase3 = _interopRequireDefault(_JanSearchBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var MORINAGA_CONSTANTS = {
  searchConfig: {
    prefix: 'Morinaga',
    top: 'https://www.morinaga.co.jp/products/',
    searchPageSelectors: {
      searchText: '#SS_searchQuery3',
      searchButton: '#SS_searchQuery3 + input',
      productsLink: 'div.SS_item > div.SS_image > a',
      nextLink: 'span.SS_nextPage > a'
    },
    productPageSelectors: {
      jan: 'div.products-detailBox__inner dl.products-detailBox__list dd:last-child',
      category: 'div.products-detailContents div.headingType02 p.headingType02__txt',
      title: 'div.products-mainBox h2.headingType01__txt'
    },
    replacer: {
      title: [_JanSearchBase2.REPLACERS.toHarfWidth, _JanSearchBase2.REPLACERS.toHarfWidthSpace],
      jan: [],
      category: [_JanSearchBase2.REPLACERS.toHarfWidthSpace, _JanSearchBase2.REPLACERS.toHarfWidth, _JanSearchBase2.REPLACERS.toOneSpace, _JanSearchBase2.REPLACERS.trim]
    }
  }
};

var MorinagaSearch = function (_JanSearchBase) {
  _inherits(MorinagaSearch, _JanSearchBase);

  function MorinagaSearch() {
    _classCallCheck(this, MorinagaSearch);

    return _possibleConstructorReturn(this, (MorinagaSearch.__proto__ || Object.getPrototypeOf(MorinagaSearch)).apply(this, arguments));
  }

  _createClass(MorinagaSearch, [{
    key: 'getAllJanUrls',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
        var links;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return _get(MorinagaSearch.prototype.__proto__ || Object.getPrototypeOf(MorinagaSearch.prototype), 'getAllJanUrls', this).call(this);

              case 2:
                links = _context.sent;
                return _context.abrupt('return', links.filter(function (url) {
                  return url.indexOf('detail') > 0;
                }));

              case 4:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getAllJanUrls() {
        return _ref.apply(this, arguments);
      }

      return getAllJanUrls;
    }()
  }, {
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return MORINAGA_CONSTANTS.searchConfig;
    }
  }]);

  return MorinagaSearch;
}(_JanSearchBase3.default);

exports.default = MorinagaSearch;
//# sourceMappingURL=MorinagaSearch.js.map