const { chromium } = require('C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', err => console.log('PAGE ERROR:', err.message));

  const filePath = 'file:///' + path.resolve('EditorialFeaturesStandalone.html').replace(/\\/g, '/');
  console.log('Navigating to', filePath);
  await page.goto(filePath, { waitUntil: 'networkidle' });
  await new Promise(r => setTimeout(r, 1500));

  await page.screenshot({ path: 'scratch/standalone_html_preview.png', fullPage: true });
  console.log('Saved scratch/standalone_html_preview.png');

  // Click on Cafe button
  const cafeBtn = await page.locator('.w-segment-btn').nth(1);
  if (cafeBtn) {
    await cafeBtn.click();
    await new Promise(r => setTimeout(r, 600));
    await page.screenshot({ path: 'scratch/standalone_html_cafe_preview.png', fullPage: true });
    console.log('Saved scratch/standalone_html_cafe_preview.png');
  }

  // Click on Get a Demo button
  const demoBtn = await page.locator('.w-lime-pill-btn').first();
  if (demoBtn) {
    await demoBtn.click();
    await new Promise(r => setTimeout(r, 400));
    await page.screenshot({ path: 'scratch/standalone_html_modal_preview.png' });
    console.log('Saved scratch/standalone_html_modal_preview.png');
  }

  await browser.close();
})();

