import axios from 'axios';
import fs from 'fs';

type Params = {
  url: string;
  fileName: string;
  savePath: string;
};

export async function downloadImgFromUrl({ url, fileName, savePath }: Params): Promise<string> {
  const responseStream = await axios.get(url, { responseType: 'stream' });
  const fileStream = fs.createWriteStream(`${savePath}/${fileName}`);
  responseStream.data.pipe(fileStream);

  return new Promise((resolve, reject) => {
    fileStream.on('finish', () => {
      resolve(`${savePath}/${fileName}`);
    });

    fileStream.on('error', (err) => {
      reject(err);
    });
  });
}
