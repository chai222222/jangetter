'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _json2csv = require('json2csv');

var _iconvLite = require('iconv-lite');

var _iconvLite2 = _interopRequireDefault(_iconvLite);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// const json2csvParser = new Json2csvParser({fields});
// const csv = json2csvParser.parse(result);

var CsvWriter = function () {
  function CsvWriter(path) {
    _classCallCheck(this, CsvWriter);

    this.result = [];

    this.path = path;
  }

  _createClass(CsvWriter, [{
    key: 'write',
    value: function write(data) {
      this.result.push(data);
    }
  }, {
    key: 'close',
    value: function close() {
      var json2csvParser = new _json2csv.Parser({ fields: CsvWriter.FIELDS });
      var csv = json2csvParser.parse(this.result);
      var sjCsv = _iconvLite2.default.encode(csv, "Shift_JIS");
      _fs2.default.writeFile(this.path, sjCsv, function (err) {
        if (err) {
          throw err;
        }
      });
    }
  }]);

  return CsvWriter;
}();

CsvWriter.FIELDS = ['jan', 'title', 'category'];

var WriterCreator = function () {
  function WriterCreator() {
    _classCallCheck(this, WriterCreator);
  }

  _createClass(WriterCreator, null, [{
    key: 'createCsvWriter',
    value: function createCsvWriter(path) {
      return new CsvWriter(path);
    }
  }]);

  return WriterCreator;
}();

exports.default = WriterCreator;
//# sourceMappingURL=WriterCreator.js.map