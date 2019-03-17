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

var KOKUBU_CONSTANTS = {
  searchConfig: {
    prefix: 'Kokubu',
    top: 'http://netton.kokubu.jp/shop/default.aspx',
    searchPageSelectors: {
      productsLink: 'span.image_with_link a',
      scrollToBottom: true,
      searchText: '#keyword',
      searchButton: 'input[name="image"]'
    },
    productPageSelectors: {
      jan: '#spec_item_code',
      category: 'div.navitopicpath_',
      title: 'title'
    },
    productPageImageSelectors: {
      picture: 'image_l_'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthSpace, _Replacer.REPLACERS.toHarfWidthAlnum, _Replacer.REPLACERS.toOneSpace, _Replacer.REPLACERS.trim, {
        pattern: /.*問屋 *国分ネット卸 */g,
        value: ''
      }, {
        pattern: / *: .*/g, // 不要部分を削除
        value: ''
      }],
      jan: [{
        pattern: /\D/g,
        value: ''
      }],
      category: [_Replacer.REPLACERS.toOneSpace, {
        pattern: /問屋 *国分ネット卸：トップ *> */g,
        value: ''
      }]
    }
  }
};

var KokubuSearch = function (_JanSearchBase) {
  _inherits(KokubuSearch, _JanSearchBase);

  function KokubuSearch() {
    _classCallCheck(this, KokubuSearch);

    return _possibleConstructorReturn(this, (KokubuSearch.__proto__ || Object.getPrototypeOf(KokubuSearch)).apply(this, arguments));
  }

  _createClass(KokubuSearch, [{
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return KOKUBU_CONSTANTS.searchConfig;
    }
  }]);

  return KokubuSearch;
}(_JanSearchBase3.default);

exports.default = KokubuSearch;
//# sourceMappingURL=KokubuSearch.js.map