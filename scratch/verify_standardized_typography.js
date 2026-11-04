const { chromium } = require('C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();

  // Desktop (1440x900, 2x retina)
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  await page.goto('http://localhost:3000/#features', { waitUntil: 'networkidle' });

  // Scroll down to features
  await page.evaluate(async () => {
    for (let y = 0; y < 2400; y += 300) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 50));
    }
  });
  await new Promise(r => setTimeout(r, 600));

  // Capture Section Header + Hero card
  const heroCard = await page.locator('.w-hero-card').first();
  if (heroCard) {
    await heroCard.scrollIntoViewIfNeeded();
    await new Promise(r => setTimeout(r, 300));
    await heroCard.screenshot({ path: 'scratch/standardized_hero_card_desktop.png' });
    console.log('Saved scratch/standardized_hero_card_desktop.png');
  }

  // Capture Row 2: Text Card + Wallets
  const row2 = await page.locator('.w-row:has(.w-text-card)').first();
  if (row2) {
    await row2.scrollIntoViewIfNeeded();
    await new Promise(r => setTimeout(r, 300));
    await row2.screenshot({ path: 'scratch/standardized_row2_desktop.png' });
    console.log('Saved scratch/standardized_row2_desktop.png');
  }

  // Capture Stat Card row
  const statRow = await page.locator('.w-row:has(.w-stat-card)').first();
  if (statRow) {
    await statRow.scrollIntoViewIfNeeded();
    await new Promise(r => setTimeout(r, 300));
    await statRow.screenshot({ path: 'scratch/standardized_stat_row_desktop.png' });
    console.log('Saved scratch/standardized_stat_row_desktop.png');
  }

  // Capture Feature strip
  const stripCard = await page.locator('.w-strip-card').first();
  if (stripCard) {
    await stripCard.scrollIntoViewIfNeeded();
    await new Promise(r => setTimeout(r, 300));
    await stripCard.screenshot({ path: 'scratch/standardized_strip_card_desktop.png' });
    console.log('Saved scratch/standardized_strip_card_desktop.png');
  }

  await browser.close();
  console.log('All typography verification screenshots captured successfully!');
})();

