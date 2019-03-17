'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _axios = require('axios');

var _axios2 = _interopRequireDefault(_axios);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

exports.default = function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(name, src, outputFileName) {
    var res, ext, outName, lastSlash;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return _axios2.default.get(src, { responseType: 'arraybuffer' });

          case 3:
            res = _context.sent;
            ext = src.substr(src.lastIndexOf('.'));
            outName = '' + outputFileName + ext;

            _fs2.default.writeFileSync(outName, new Buffer.from(res.data), 'binary');
            lastSlash = outName.lastIndexOf('/');
            return _context.abrupt('return', lastSlash >= 0 ? outName.substr(lastSlash + 1) : lastSlash);

          case 11:
            _context.prev = 11;
            _context.t0 = _context['catch'](0);

            console.log('[Image] image [' + name + '] Couldn\'t get. ' + _context.t0);
            return _context.abrupt('return');

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 11]]);
  }));

  return function (_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();
//# sourceMappingURL=ImageDownload.js.map