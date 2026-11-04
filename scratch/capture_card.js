const { chromium } = require('C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  
  // Desktop
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/solutions', { waitUntil: 'networkidle' });
  const heading = page.locator('text=PERFORMANCE REPORTS THAT REVEAL WHAT MATTERS MOST.');
  await heading.waitFor();
  const card = heading.locator('xpath=ancestor::div[contains(@class, "widePhotoCard")]');
  await card.scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await card.screenshot({
    path: 'C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/performance_reports_card_desktop.png'
  });

  // Mobile
  const pageMobile = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await pageMobile.goto('http://localhost:3000/solutions', { waitUntil: 'networkidle' });
  const headingMobile = pageMobile.locator('text=PERFORMANCE REPORTS THAT REVEAL WHAT MATTERS MOST.');
  await headingMobile.waitFor();
  const cardMobile = headingMobile.locator('xpath=ancestor::div[contains(@class, "widePhotoCard")]');
  await cardMobile.scrollIntoViewIfNeeded();
  await pageMobile.waitForTimeout(600);
  await cardMobile.screenshot({
    path: 'C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/performance_reports_card_mobile.png'
  });

  await browser.close();
  console.log('Capture complete!');
})();
