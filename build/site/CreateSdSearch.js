'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _JanSearchBase2 = require('./JanSearchBase');

var _JanSearchBase3 = _interopRequireDefault(_JanSearchBase2);

var _Replacer = require('../util/Replacer');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CREATESD_CONSTANTS = {
  searchConfig: {
    prefix: 'CreateSD',
    top: 'http://netshop.create-sd.co.jp/shop/default.aspx',
    searchPageSelectors: {
      searchText: '#keyword',
      searchButton: '#keyword + input',
      productsLink: 'div.StyleD_Frame_ > div >div.img_ > a',
      nextLink: 'li.navipage_next_ a'
    },
    productPageSelectors: {
      jan: 'div.goodsdetail_.top_ + div + div > p.txt_',
      category: '#bread-crumb-list',
      title: 'div.common_h2_blue_ h2 span'
    },
    productPageImageSelectors: {
      picture: '#gallery img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidth, _Replacer.REPLACERS.toHarfWidthSpace],
      jan: [],
      category: [_Replacer.REPLACERS.toOneLine, _Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toHarfWidth, _Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim, {
        pattern: /^\s*ホーム\s*/,
        value: ''
      }]
    }
  }
};

var CreateSdSearch = function (_JanSearchBase) {
  _inherits(CreateSdSearch, _JanSearchBase);

  function CreateSdSearch() {
    _classCallCheck(this, CreateSdSearch);

    return _possibleConstructorReturn(this, (CreateSdSearch.__proto__ || Object.getPrototypeOf(CreateSdSearch)).apply(this, arguments));
  }

  _createClass(CreateSdSearch, [{
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return CREATESD_CONSTANTS.searchConfig;
    }
  }]);

  return CreateSdSearch;
}(_JanSearchBase3.default);

exports.default = CreateSdSearch;
//# sourceMappingURL=CreateSdSearch.js.map