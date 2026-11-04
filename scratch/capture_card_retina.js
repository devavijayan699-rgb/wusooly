const { chromium } = require('C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  
  // Desktop at 2x Retina scale factor
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  await page.goto('http://localhost:3000/solutions', { waitUntil: 'networkidle' });
  const heading = page.locator('text=PERFORMANCE REPORTS THAT REVEAL WHAT MATTERS MOST.');
  await heading.waitFor();
  const card = heading.locator('xpath=ancestor::div[contains(@class, "widePhotoCard")]');
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await card.screenshot({
    path: 'C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/supermarket_card_retina2x.png'
  });

  await browser.close();
  console.log('Capture 2x complete!');
})();

