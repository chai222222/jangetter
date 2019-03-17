import axios from 'axios';
import fs from 'fs';

export default async (name, src, outputFileName) => {
  try {
    const res = await axios.get(src, { responseType: 'arraybuffer' })
    const ext = src.substr(src.lastIndexOf('.'));
    const outName = `${outputFileName}${ext}`;
    fs.writeFileSync(outName, new Buffer.from(res.data), 'binary');
    const lastSlash = outName.lastIndexOf('/');
    return lastSlash >= 0 ? outName.substr(lastSlash + 1) : lastSlash;
  } catch (error) {
    console.log(`[Image] image [${name}] Couldn't get. ${error}`);
    return;
  }
}
