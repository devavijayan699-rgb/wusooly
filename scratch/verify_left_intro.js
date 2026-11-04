const { chromium } = require('C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();

  // Desktop
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/#features', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < 1400; y += 300) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 60));
    }
  });
  await new Promise(r => setTimeout(r, 600));

  const headerEl = await page.$('.w-header-block');
  if (headerEl) {
    await headerEl.screenshot({ path: 'scratch/landing_intro_header_desktop.png' });
    console.log('Saved scratch/landing_intro_header_desktop.png');
  }

  // Mobile
  const mobilePage = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await mobilePage.goto('http://localhost:3000/#features', { waitUntil: 'networkidle' });
  await mobilePage.evaluate(async () => {
    for (let y = 0; y < 1400; y += 300) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 60));
    }
  });
  await new Promise(r => setTimeout(r, 600));

  const mobileHeaderEl = await mobilePage.$('.w-header-block');
  if (mobileHeaderEl) {
    await mobileHeaderEl.screenshot({ path: 'scratch/landing_intro_header_mobile.png' });
    console.log('Saved scratch/landing_intro_header_mobile.png');
  }

  await browser.close();
  console.log('Screenshots completed successfully!');
})();

