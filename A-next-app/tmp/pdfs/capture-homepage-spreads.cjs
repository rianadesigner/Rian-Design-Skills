const { chromium } = require('playwright');
const path = require('path');

const outputDir = path.resolve(__dirname, 'homepage-spreads');

(async () => {
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  });

  try {
    const page = await browser.newPage({
      viewport: { width: 1400, height: 1000 },
      deviceScaleFactor: 2,
    });

    await page.goto('http://localhost:3000/', { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(
        Array.from(document.images)
          .filter((image) => !image.complete)
          .map((image) => new Promise((resolve) => {
            image.addEventListener('load', resolve, { once: true });
            image.addEventListener('error', resolve, { once: true });
          })),
      );
    });
    await page.waitForTimeout(900);

    const found = await page.evaluate(() => {
      const desktopRoot = Array.from(document.querySelectorAll('div')).find((element) => {
        if (!(element instanceof HTMLElement)) return false;
        return element.classList.contains('sm:flex')
          && element.classList.contains('items-center')
          && element.classList.contains('justify-center')
          && getComputedStyle(element).display === 'flex';
      });

      if (!desktopRoot || !(desktopRoot.firstElementChild instanceof HTMLElement)) return false;
      desktopRoot.firstElementChild.dataset.pdfSpread = 'true';
      return true;
    });

    if (!found) throw new Error('Unable to locate the visible desktop book spread.');

    const spread = page.locator('[data-pdf-spread="true"]');
    await spread.screenshot({ path: path.join(outputDir, 'spread-1-2.png') });

    const box = await spread.boundingBox();
    if (!box) throw new Error('Unable to resolve the book spread bounds.');

    await page.mouse.click(box.x + box.width * 0.76, box.y + box.height * 0.48);
    await page.waitForTimeout(1500);
    await spread.screenshot({ path: path.join(outputDir, 'spread-3-4.png') });
  } finally {
    await browser.close();
  }
})();
