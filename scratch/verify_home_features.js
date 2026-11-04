const { chromium } = require('C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  await page.goto('http://localhost:3000/#features', { waitUntil: 'networkidle' });
  const section = page.locator('section[aria-label="Wusooly retail POS features"]');
  await section.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await section.screenshot({
    path: 'C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/home_features_desktop.png'
  });
  await browser.close();
  console.log('Home features captured successfully!');
})();

