'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _JanSearchBase2 = require('./JanSearchBase');

var _JanSearchBase3 = _interopRequireDefault(_JanSearchBase2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KENKOCOM_CONSTANTS = {
  searchConfig: {
    prefix: 'Kenkocom',
    top: 'https://www.kenko.com/',
    searchPageSelectors: {
      searchText: '#searchText',
      searchButton: '#searchForm input[type="submit"]',
      nextLink: 'li.next',
      productsLink: 'li[itemtype="http://data-vocabulary.org/Product"] > a'
    },
    productPageSelectors: {
      jan: '#janCode',
      category: 'ul.breadcrumbTypeA01',
      title: 'h2.itemTitle'
    },
    replacer: {
      title: [_JanSearchBase2.REPLACERS.toHarfWidth],
      category: [_JanSearchBase2.REPLACERS.toHarfWidth, _JanSearchBase2.REPLACERS.toOneSpace, _JanSearchBase2.REPLACERS.trim]
    }
  }
};

var KenkocomSearch = function (_JanSearchBase) {
  _inherits(KenkocomSearch, _JanSearchBase);

  function KenkocomSearch() {
    _classCallCheck(this, KenkocomSearch);

    return _possibleConstructorReturn(this, (KenkocomSearch.__proto__ || Object.getPrototypeOf(KenkocomSearch)).apply(this, arguments));
  }

  _createClass(KenkocomSearch, [{
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return KENKOCOM_CONSTANTS.searchConfig;
    }
  }]);

  return KenkocomSearch;
}(_JanSearchBase3.default);

exports.default = KenkocomSearch;
//# sourceMappingURL=KenkocomSearch.js.map