const { chromium } = require('C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  // 1. Home page retail features
  console.log('Loading home page...');
  await page.goto('http://localhost:3000/#features', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 80));
    }
  });
  await new Promise(r => setTimeout(r, 600));

  const retailEl = await page.$('section[id="features"]');
  if (retailEl) {
    await retailEl.screenshot({ path: 'scratch/new_retail_features_desktop.png' });
    console.log('Saved scratch/new_retail_features_desktop.png');
  }

  // 2. Home page cafe features
  console.log('Switching to cafe on home page...');
  const cafeBtn = await page.locator('button[role="tab"]:has-text("Cafés & Restaurants")').first();
  if (cafeBtn) {
    await cafeBtn.click();
    await new Promise(r => setTimeout(r, 800));
    const cafeEl = await page.$('section[id="cafe-features"]');
    if (cafeEl) {
      await cafeEl.screenshot({ path: 'scratch/new_cafe_features_desktop.png' });
      console.log('Saved scratch/new_cafe_features_desktop.png');
    }
  }

  // 3. Solutions page
  console.log('Loading solutions page...');
  await page.goto('http://localhost:3000/solutions', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 80));
    }
  });
  await new Promise(r => setTimeout(r, 600));
  await page.screenshot({ path: 'scratch/new_solutions_page_desktop.png', fullPage: true });
  console.log('Saved scratch/new_solutions_page_desktop.png');

  await browser.close();
  console.log('All verification screenshots completed successfully!');
})();

