import { chromium } from 'playwright-chromium';
import path from 'path';

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await context.newPage();

    console.log('Capturing local screenshot...');
    await page.goto('http://localhost:3000');
    await page.waitForTimeout(2000); // Allow for hydration
    await page.screenshot({ path: 'docs/design-references/apple.com/local-desktop.png', fullPage: true });

    console.log('Capturing original screenshot...');
    await page.goto('https://www.apple.com');
    await page.waitForTimeout(2000);
    await page.screenshot({ path: 'docs/design-references/apple.com/original-desktop.png', fullPage: true });

    await browser.close();
    console.log('Screenshots captured to docs/design-references/apple.com/');
})();
