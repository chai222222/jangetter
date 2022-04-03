"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = async (name, src, outputFileName) => {
  try {
    const res = await _axios.default.get(src, {
      responseType: 'arraybuffer'
    });
    const ext = src.substr(src.lastIndexOf('.'));
    const query = ext.lastIndexOf('?');
    const outName = `${outputFileName}${query < 0 ? ext : ext.substr(0, query)}`;

    _fs.default.writeFileSync(outName, new Buffer.from(res.data), 'binary');

    const lastSlash = outName.lastIndexOf('/');
    return lastSlash >= 0 ? outName.substr(lastSlash + 1) : lastSlash;
  } catch (error) {
    console.log(`[Image] image [${name}] Couldn't get. ${error}`);
    return;
  }
};

exports.default = _default;
//# sourceMappingURL=ImageDownload.js.map