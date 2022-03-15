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

var MOGUNAVI_CONSTANTS = {
  searchConfig: {
    prefix: 'Mogunavi',
    top: 'https://mognavi.jp/',
    searchPageSelectors: {
      cushion: '#searchResList p.more a',
      nextLink: '//div[@id="main"]/div[1]/p[@class="nam"]/a[contains(text(), "次の20")]',
      productsLink: '#searchResList li h3 > a',
      searchText: '#headerSearch input[name="keyword"]',
      searchButton: '#food_search_button'
    },
    productPageSelectors: {
      jan: '#pInfo > p + table tbody',
      // category: '#pInfo td.category a',
      title: 'h2.item span.fn span.food-name'
    },
    productPageImageSelectors: {
      picture: '#foodPhoto'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthAlnum, _Replacer.REPLACERS.toHarfWidthSpace],
      jan: [{
        pattern: /\r?\n/g,
        value: ''
      }, {
        pattern: /.*JANコード\s*/,
        value: ''
      }, {
        pattern: /\s+.*$/g,
        value: ''
      }],
      category: [{
        pattern: /\s+/g,
        value: ' '
      }]
    }
  }
};

var MogunaviSearch = function (_JanSearchBase) {
  _inherits(MogunaviSearch, _JanSearchBase);

  function MogunaviSearch() {
    _classCallCheck(this, MogunaviSearch);

    return _possibleConstructorReturn(this, (MogunaviSearch.__proto__ || Object.getPrototypeOf(MogunaviSearch)).apply(this, arguments));
  }

  _createClass(MogunaviSearch, [{
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return MOGUNAVI_CONSTANTS.searchConfig;
    }
  }]);

  return MogunaviSearch;
}(_JanSearchBase3.default);

exports.default = MogunaviSearch;
//# sourceMappingURL=MogunaviSearch.js.map