const { chromium } = require('C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');
const path = require('path');

(async () => {
  const browser = await chromium.launch();
  const artifactDir = 'C:\\Users\\devav\\.gemini\\antigravity\\brain\\489971f1-b386-42a4-ba37-696514c1a4a2';

  // 1. Desktop /pricing (1440x900, 2x retina)
  const desktopPage = await browser.newPage({
    viewport: { width: 1440, height: 1050 },
    deviceScaleFactor: 2
  });
  await desktopPage.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
  await desktopPage.waitForTimeout(600);

  // Capture pricingWrap section
  const section = await desktopPage.$('[class*="pricingWrap"]');
  if (section) {
    await section.scrollIntoViewIfNeeded();
    await desktopPage.waitForTimeout(200);
    await section.screenshot({ path: path.join(artifactDir, 'pricing_section_focused_desktop.png') });
    console.log('Saved pricing_section_focused_desktop.png');
  }

  // Full page view
  await desktopPage.screenshot({ path: path.join(artifactDir, 'pricing_page_focused_desktop.png'), fullPage: false });
  console.log('Saved pricing_page_focused_desktop.png');

  // 2. Mobile /pricing (390x844, 2x retina)
  const mobilePage = await browser.newPage({
    viewport: { width: 390, height: 844 },
    deviceScaleFactor: 2,
    isMobile: true
  });
  await mobilePage.goto('http://localhost:3000/pricing', { waitUntil: 'networkidle' });
  await mobilePage.waitForTimeout(600);

  const mobileSection = await mobilePage.$('[class*="pricingWrap"]');
  if (mobileSection) {
    await mobileSection.scrollIntoViewIfNeeded();
    await mobilePage.waitForTimeout(200);
    await mobileSection.screenshot({ path: path.join(artifactDir, 'pricing_section_focused_mobile.png') });
    console.log('Saved pricing_section_focused_mobile.png');
  }

  await browser.close();
  console.log('Done capturing focused pricing screenshots!');
})();
