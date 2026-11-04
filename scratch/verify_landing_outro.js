const { chromium } = require('C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();

  // Desktop viewport
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 60));
    }
  });
  await new Promise(r => setTimeout(r, 600));

  const outroEl = await page.$('section[aria-label="Get Started"]');
  if (outroEl) {
    await outroEl.screenshot({ path: 'scratch/landing_outro_card_desktop.png' });
    console.log('Saved scratch/landing_outro_card_desktop.png');
  }

  // Mobile viewport
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  await mobilePage.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 60));
    }
  });
  await new Promise(r => setTimeout(r, 600));

  const mobileOutroEl = await mobilePage.$('section[aria-label="Get Started"]');
  if (mobileOutroEl) {
    await mobileOutroEl.screenshot({ path: 'scratch/landing_outro_card_mobile.png' });
    console.log('Saved scratch/landing_outro_card_mobile.png');
  }

  await browser.close();
  console.log('Screenshots completed successfully!');
})();

