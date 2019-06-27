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

var GYOUMUSUPER_CONSTANTS = {
  searchConfig: {
    prefix: 'GyoumuSuper',
    top: 'https://www.gyomusuper.jp/item/search.php',
    searchPageSelectors: {
      productsLink: 'div.list_img a',
      onlyCurrentPage: true,
      searchText: 'input.ipt_txt',
      searchButton: 'input.ipt_submit'
    },
    productPageSelectors: {
      jan: '//dt[contains(text(), "JAN")]/../dd',
      title: 'div.detail_info_box h3'
      //categoryがとれないのでなし
    },
    productPageImageSelectors: {
      picture: 'div.detail_img_box img'
    },
    replacer: {
      title: [_Replacer.REPLACERS.toHarfWidthAlnum]
    }
  }
};

var GyoumuSuperSearch = function (_JanSearchBase) {
  _inherits(GyoumuSuperSearch, _JanSearchBase);

  function GyoumuSuperSearch() {
    _classCallCheck(this, GyoumuSuperSearch);

    return _possibleConstructorReturn(this, (GyoumuSuperSearch.__proto__ || Object.getPrototypeOf(GyoumuSuperSearch)).apply(this, arguments));
  }

  _createClass(GyoumuSuperSearch, [{
    key: 'filterJanUrl',
    value: function filterJanUrl(links) {
      return links.filter(function (url) {
        return url.indexOf('item/detail') > 0;
      });
    }
  }, {
    key: 'getSrcConfig',
    value: function getSrcConfig() {
      return GYOUMUSUPER_CONSTANTS.searchConfig;
    }
  }]);

  return GyoumuSuperSearch;
}(_JanSearchBase3.default);

exports.default = GyoumuSuperSearch;
//# sourceMappingURL=GyoumuSuperSearch.js.map