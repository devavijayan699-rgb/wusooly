const { chromium } = require('C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();

  // 1. Desktop - Shops & Supermarkets on Solutions page
  const page = await browser.newPage({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2
  });
  await page.goto('http://localhost:3000/solutions#retail', { waitUntil: 'networkidle' });
  const retailGrid = page.locator('#features');
  await retailGrid.waitFor();
  await retailGrid.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await retailGrid.screenshot({
    path: 'C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/redesigned_shops_desktop.png'
  });

  // 2. Desktop - Cafes & Restaurants on Solutions page
  await page.goto('http://localhost:3000/solutions#cafe', { waitUntil: 'networkidle' });
  const cafeTab = page.locator('button:has-text("Cafés & Restaurants")');
  await cafeTab.click();
  await page.waitForTimeout(600);
  const cafeGrid = page.locator('#features-cafe');
  await cafeGrid.waitFor();
  await cafeGrid.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await cafeGrid.screenshot({
    path: 'C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/redesigned_cafes_desktop.png'
  });

  // 3. Mobile - Shops
  const pageMobile = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2
  });
  await pageMobile.goto('http://localhost:3000/solutions#retail', { waitUntil: 'networkidle' });
  const retailMobile = pageMobile.locator('#features');
  await retailMobile.scrollIntoViewIfNeeded();
  await pageMobile.waitForTimeout(600);
  await retailMobile.screenshot({
    path: 'C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/redesigned_shops_mobile.png'
  });

  await browser.close();
  console.log('All verification captures complete!');
})();

