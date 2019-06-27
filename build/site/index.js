'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _AeonSearch = require('./AeonSearch');

var _AeonSearch2 = _interopRequireDefault(_AeonSearch);

var _IyecSearch = require('./IyecSearch');

var _IyecSearch2 = _interopRequireDefault(_IyecSearch);

var _TajimaSearch = require('./TajimaSearch');

var _TajimaSearch2 = _interopRequireDefault(_TajimaSearch);

var _LohacoSearch = require('./LohacoSearch');

var _LohacoSearch2 = _interopRequireDefault(_LohacoSearch);

var _CoopSearch = require('./CoopSearch');

var _CoopSearch2 = _interopRequireDefault(_CoopSearch);

var _KokubuSearch = require('./KokubuSearch');

var _KokubuSearch2 = _interopRequireDefault(_KokubuSearch);

var _MogunaviSearch = require('./MogunaviSearch');

var _MogunaviSearch2 = _interopRequireDefault(_MogunaviSearch);

var _KenkocomSearch = require('./KenkocomSearch');

var _KenkocomSearch2 = _interopRequireDefault(_KenkocomSearch);

var _CreateSdSearch = require('./CreateSdSearch');

var _CreateSdSearch2 = _interopRequireDefault(_CreateSdSearch);

var _MorinagaSearch = require('./MorinagaSearch');

var _MorinagaSearch2 = _interopRequireDefault(_MorinagaSearch);

var _SunyoSearch = require('./SunyoSearch');

var _SunyoSearch2 = _interopRequireDefault(_SunyoSearch);

var _HouseSearch = require('./HouseSearch');

var _HouseSearch2 = _interopRequireDefault(_HouseSearch);

var _GyoumuSuperSearch = require('./GyoumuSuperSearch');

var _GyoumuSuperSearch2 = _interopRequireDefault(_GyoumuSuperSearch);

var _NissuiSearch = require('./NissuiSearch');

var _NissuiSearch2 = _interopRequireDefault(_NissuiSearch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  iyec: function iyec() {
    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return new (Function.prototype.bind.apply(_IyecSearch2.default, [null].concat(args)))();
  },
  aeon: function aeon() {
    for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
      args[_key2] = arguments[_key2];
    }

    return new (Function.prototype.bind.apply(_AeonSearch2.default, [null].concat(args)))();
  },
  tajima: function tajima() {
    for (var _len3 = arguments.length, args = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
      args[_key3] = arguments[_key3];
    }

    return new (Function.prototype.bind.apply(_TajimaSearch2.default, [null].concat(args)))();
  },
  lohaco: function lohaco() {
    for (var _len4 = arguments.length, args = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
      args[_key4] = arguments[_key4];
    }

    return new (Function.prototype.bind.apply(_LohacoSearch2.default, [null].concat(args)))();
  },
  coop: function coop() {
    for (var _len5 = arguments.length, args = Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
      args[_key5] = arguments[_key5];
    }

    return new (Function.prototype.bind.apply(_CoopSearch2.default, [null].concat(args)))();
  },
  kokubu: function kokubu() {
    for (var _len6 = arguments.length, args = Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
      args[_key6] = arguments[_key6];
    }

    return new (Function.prototype.bind.apply(_KokubuSearch2.default, [null].concat(args)))();
  },
  mogunavi: function mogunavi() {
    for (var _len7 = arguments.length, args = Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
      args[_key7] = arguments[_key7];
    }

    return new (Function.prototype.bind.apply(_MogunaviSearch2.default, [null].concat(args)))();
  },
  kenkocom: function kenkocom() {
    for (var _len8 = arguments.length, args = Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
      args[_key8] = arguments[_key8];
    }

    return new (Function.prototype.bind.apply(_KenkocomSearch2.default, [null].concat(args)))();
  },
  createsd: function createsd() {
    for (var _len9 = arguments.length, args = Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
      args[_key9] = arguments[_key9];
    }

    return new (Function.prototype.bind.apply(_CreateSdSearch2.default, [null].concat(args)))();
  },
  morinaga: function morinaga() {
    for (var _len10 = arguments.length, args = Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
      args[_key10] = arguments[_key10];
    }

    return new (Function.prototype.bind.apply(_MorinagaSearch2.default, [null].concat(args)))();
  },
  sunyo: function sunyo() {
    for (var _len11 = arguments.length, args = Array(_len11), _key11 = 0; _key11 < _len11; _key11++) {
      args[_key11] = arguments[_key11];
    }

    return new (Function.prototype.bind.apply(_SunyoSearch2.default, [null].concat(args)))();
  },
  house: function house() {
    for (var _len12 = arguments.length, args = Array(_len12), _key12 = 0; _key12 < _len12; _key12++) {
      args[_key12] = arguments[_key12];
    }

    return new (Function.prototype.bind.apply(_HouseSearch2.default, [null].concat(args)))();
  },
  gyoumusuper: function gyoumusuper() {
    for (var _len13 = arguments.length, args = Array(_len13), _key13 = 0; _key13 < _len13; _key13++) {
      args[_key13] = arguments[_key13];
    }

    return new (Function.prototype.bind.apply(_GyoumuSuperSearch2.default, [null].concat(args)))();
  },
  nissui: function nissui() {
    for (var _len14 = arguments.length, args = Array(_len14), _key14 = 0; _key14 < _len14; _key14++) {
      args[_key14] = arguments[_key14];
    }

    return new (Function.prototype.bind.apply(_NissuiSearch2.default, [null].concat(args)))();
  }
};
//# sourceMappingURL=index.js.map