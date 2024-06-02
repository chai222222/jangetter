"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AeonSearch = _interopRequireDefault(require("./AeonSearch"));

var _IyecSearch = _interopRequireDefault(require("./IyecSearch"));

var _TajimaSearch = _interopRequireDefault(require("./TajimaSearch"));

var _LohacoSearch = _interopRequireDefault(require("./LohacoSearch"));

var _CoopSearch = _interopRequireDefault(require("./CoopSearch"));

var _KokubuSearch = _interopRequireDefault(require("./KokubuSearch"));

var _MogunaviSearch = _interopRequireDefault(require("./MogunaviSearch"));

var _KenkocomSearch = _interopRequireDefault(require("./KenkocomSearch"));

var _CreateSdSearch = _interopRequireDefault(require("./CreateSdSearch"));

var _MorinagaSearch = _interopRequireDefault(require("./MorinagaSearch"));

var _SunyoSearch = _interopRequireDefault(require("./SunyoSearch"));

var _HouseSearch = _interopRequireDefault(require("./HouseSearch"));

var _GyoumuSuperSearch = _interopRequireDefault(require("./GyoumuSuperSearch"));

var _NissuiSearch = _interopRequireDefault(require("./NissuiSearch"));

var _MyojpSearch = _interopRequireDefault(require("./MyojpSearch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  iyec: (...args) => new _IyecSearch.default(...args),
  aeon: (...args) => new _AeonSearch.default(...args),
  tajima: (...args) => new _TajimaSearch.default(...args),
  lohaco: (...args) => new _LohacoSearch.default(...args),
  coop: (...args) => new _CoopSearch.default(...args),
  kokubu: (...args) => new _KokubuSearch.default(...args),
  mogunavi: (...args) => new _MogunaviSearch.default(...args),
  kenkocom: (...args) => new _KenkocomSearch.default(...args),
  createsd: (...args) => new _CreateSdSearch.default(...args),
  morinaga: (...args) => new _MorinagaSearch.default(...args),
  sunyo: (...args) => new _SunyoSearch.default(...args),
  house: (...args) => new _HouseSearch.default(...args),
  gyoumusuper: (...args) => new _GyoumuSuperSearch.default(...args),
  nissui: (...args) => new _NissuiSearch.default(...args),
  myojo: (...args) => new _MyojpSearch.default(...args)
};
exports.default = _default;
//# sourceMappingURL=index.js.map