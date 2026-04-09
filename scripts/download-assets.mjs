import fs from 'fs/promises';
import { createWriteStream } from 'fs';
import path from 'path';
import https from 'https';

const urlToFilename = (url) => {
  const parsed = new URL(url);
  return path.basename(parsed.pathname);
};

const downloadImage = (url, filepath) => {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        res.pipe(createWriteStream(filepath))
           .on('error', reject)
           .once('close', () => resolve(filepath));
      } else {
        res.resume();
        reject(new Error(`Request Failed With a Status Code: ${res.statusCode}`));
      }
    }).on('error', reject);
  });
};

(async () => {
  const dataPath = path.resolve('docs', 'research', 'apple.com', 'assets.json');
  const outDirImages = path.resolve('public', 'images');
  
  await fs.mkdir(outDirImages, { recursive: true });

  const rawData = await fs.readFile(dataPath, 'utf-8');
  const { images } = JSON.parse(rawData);

  console.log(`Found ${images.length} images to download.`);

  for (let img of images) {
    if (!img.src.startsWith('http')) continue;
    const filename = urlToFilename(img.src);
    const filepath = path.join(outDirImages, filename);
    try {
      await downloadImage(img.src, filepath);
      console.log(`Downloaded: ${filename}`);
    } catch (e) {
      console.error(`Failed to download ${img.src}: ${e.message}`);
    }
  }

  console.log('Asset download complete!');
})();
