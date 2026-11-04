const { chromium } = require('C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:3000/#features', { waitUntil: 'networkidle' });
  
  // scroll down gradually to trigger all intersection observers
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 100));
    }
  });
  await new Promise(r => setTimeout(r, 1000));

  const el = await page.$('section[aria-label="Wusooly retail POS features"]');
  if (el) {
    await el.screenshot({ path: 'scratch/current_live_editorial_section.png' });
    console.log('Saved scratch/current_live_editorial_section.png');
  }

  // Also capture full page of solutions
  await page.goto('http://localhost:3000/solutions', { waitUntil: 'networkidle' });
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 400) {
      window.scrollTo(0, y);
      await new Promise(r => setTimeout(r, 100));
    }
  });
  await new Promise(r => setTimeout(r, 1000));
  await page.screenshot({ path: 'scratch/current_solutions_page.png', fullPage: true });
  console.log('Saved scratch/current_solutions_page.png');

  await browser.close();
})();
