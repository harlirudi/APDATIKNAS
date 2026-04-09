import { chromium } from 'playwright-chromium';
import fs from 'fs/promises';
import path from 'path';

(async () => {
  console.log('Launching browser...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 }
  });
  const page = await context.newPage();

  console.log('Navigating to apple.com...');
  await page.goto('https://www.apple.com', { waitUntil: 'networkidle', timeout: 60000 });

  console.log('Scrolling to lazy load assets...');
  let previousHeight = 0;
  while (true) {
    const currentHeight = await page.evaluate('document.body.scrollHeight');
    await page.evaluate(`window.scrollTo(0, ${currentHeight})`);
    await page.waitForTimeout(1000);
    const newHeight = await page.evaluate('document.body.scrollHeight');
    if (newHeight === previousHeight) break;
    previousHeight = newHeight;
  }
  
  await page.evaluate(`window.scrollTo(0, 0)`);
  await page.waitForTimeout(2000);

  console.log('Extracting global assets and fonts...');
  const globalData = await page.evaluate(() => {
    return {
      images: [...document.querySelectorAll('img')].map(img => ({
        src: img.src || img.currentSrc,
        alt: img.alt,
        width: img.naturalWidth,
        height: img.naturalHeight,
        className: img.className
      })).filter(img => img.src),
      videos: [...document.querySelectorAll('video')].map(v => ({
        src: v.src || v.querySelector('source')?.src,
        className: v.className
      })).filter(v => v.src),
      fonts: [...new Set([...document.querySelectorAll('*'), document.body].slice(0, 200).map(el => getComputedStyle(el).fontFamily))],
      colors: {
        bodyBg: getComputedStyle(document.body).backgroundColor,
        bodyColor: getComputedStyle(document.body).color
      }
    };
  });

  const outDir = path.resolve('docs', 'research', 'apple.com');
  await fs.mkdir(outDir, { recursive: true });
  await fs.writeFile(path.join(outDir, 'assets.json'), JSON.stringify(globalData, null, 2));

  console.log('Written global assets to docs/research/apple.com/assets.json');
  await browser.close();
  console.log('Reconnaissance Phase 1 global sweep complete.');
})();
