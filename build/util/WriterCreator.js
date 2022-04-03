"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _fs = _interopRequireWildcard(require("fs"));

var _json2csv = require("json2csv");

var _iconvLite = _interopRequireDefault(require("iconv-lite"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// const json2csvParser = new Json2csvParser({fields});
// const csv = json2csvParser.parse(result);
class CsvWriter {
  constructor(path) {
    _defineProperty(this, "result", []);

    this.path = path;
  }

  write(data) {
    this.result.push(data);
  }

  close() {
    const json2csvParser = new _json2csv.Parser({
      fields: CsvWriter.FIELDS
    });
    const csv = json2csvParser.parse(this.result);

    const sjCsv = _iconvLite.default.encode(csv, "Shift_JIS");

    _fs.default.writeFile(this.path, sjCsv, err => {
      if (err) {
        throw err;
      }
    });
  }

}

_defineProperty(CsvWriter, "FIELDS", ['jan', 'title', 'category']);

class WriterCreator {
  static createCsvWriter(path) {
    return new CsvWriter(path);
  }

}

exports.default = WriterCreator;
//# sourceMappingURL=WriterCreator.js.map