'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _JanSearchBase2 = require('./JanSearchBase');

var _JanSearchBase3 = _interopRequireDefault(_JanSearchBase2);

var _Replacer = require('../util/Replacer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var COOP_CONSTANTS = {
  searchConfig: {
    prefix: 'Coop',
    top: 'https://mdinfo.jccu.coop/bb/',
    searchPageSelectors: {
      productsLink: '#bubble_tooltip + table td:nth-child(2) a[href*="/bb/"]',
      nextLink: 'a.next:first-child',
      searchText: '#shohin',
      searchButton: '#shohin + input'
    },
    productPageSelectors: {
      jan: '#basicInfo tbody > tr:nth-child(2) td img',
      category: '#basicInfo tbody > tr:first-child td',
      title: 'title'
    },
    productPageImageSelectors: {
      picture: '#basicInfo .itemPhoto img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthAlnum, {
        pattern: / < .*/g,
        value: ''
      }, {
        pattern: /^/g,
        value: 'コープ '
      }],
      jan: [{
        pattern: /^.*shohindetail\//,
        value: ''
      }, {
        pattern: /\/psspu.*$/,
        value: ''
      }, {
        pattern: /\D/g,
        value: ''
      }],
      category: [_Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim]
    }
  }
};

var CoopSearch = function (_JanSearchBase) {
  _inherits(CoopSearch, _JanSearchBase);

  function CoopSearch() {
    _classCallCheck(this, CoopSearch);

    return _possibleConstructorReturn(this, (CoopSearch.__proto__ || Object.getPrototypeOf(CoopSearch)).apply(this, arguments));
  }

  _createClass(CoopSearch, [{
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return COOP_CONSTANTS.searchConfig;
    }
  }, {
    key: 'getPageText',
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(key) {
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (!(key === 'jan')) {
                  _context.next = 7;
                  break;
                }

                console.log(this.getSrcConfig().productPageSelectors[key]);
                _context.next = 4;
                return this.page.$eval(this.getSrcConfig().productPageSelectors[key], function (item) {
                  return item.baseURI;
                });

              case 4:
                return _context.abrupt('return', _context.sent);

              case 7:
                return _context.abrupt('return', _get(CoopSearch.prototype.__proto__ || Object.getPrototypeOf(CoopSearch.prototype), 'getPageText', this).call(this, key));

              case 8:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getPageText(_x) {
        return _ref.apply(this, arguments);
      }

      return getPageText;
    }()
  }]);

  return CoopSearch;
}(_JanSearchBase3.default);

exports.default = CoopSearch;
//# sourceMappingURL=CoopSearch.js.map