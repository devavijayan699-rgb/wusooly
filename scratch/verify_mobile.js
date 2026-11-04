const { chromium } = require('C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 390, height: 844 } }); // iPhone 14 / standard mobile

  await page.goto('http://localhost:3000/#features', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 60));
    }
  });
  await new Promise(r => setTimeout(r, 500));

  const retailEl = await page.$('section[id="features"]');
  if (retailEl) {
    await retailEl.screenshot({ path: 'scratch/new_retail_features_mobile.png' });
    console.log('Saved scratch/new_retail_features_mobile.png');
  }

  // Switch to cafe
  const cafeBtn = await page.locator('button[role="tab"]:has-text("Cafés & Restaurants")').first();
  if (cafeBtn) {
    await cafeBtn.click();
    await new Promise(r => setTimeout(r, 600));
    const cafeEl = await page.$('section[id="cafe-features"]');
    if (cafeEl) {
      await cafeEl.screenshot({ path: 'scratch/new_cafe_features_mobile.png' });
      console.log('Saved scratch/new_cafe_features_mobile.png');
    }
  }

  await browser.close();
  console.log('Mobile screenshots completed!');
})();

