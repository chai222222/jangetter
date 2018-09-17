import fs, { read } from 'fs';
import { Parser as Json2csvParser } from 'json2csv';
import iconv from 'iconv-lite';

// const json2csvParser = new Json2csvParser({fields});
// const csv = json2csvParser.parse(result);

class CsvWriter {

  static FIELDS = ['jan', 'title', 'category'];

  result = [];

  constructor(path) {
    this.path = path;
  }

  write(data) {
    this.result.push(data);
  }

  close() {
    const json2csvParser = new Json2csvParser({fields: CsvWriter.FIELDS});
    const csv = json2csvParser.parse(this.result);
    const sjCsv = iconv.encode(csv, "Shift_JIS");
    fs.writeFile(this.path, sjCsv, (err) => {
      if (err) {
        throw err;
      }
    });
  }
}

export default class WriterCreator {

  static createCsvWriter(path) {
    return new CsvWriter(path);
  }
}
