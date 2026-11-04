const { chromium } = require("C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright");

async function checkFullScroll() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  console.log("Start scrollY:", await page.evaluate(() => window.scrollY));

  // Scroll 1: down to features
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(600);
  console.log("After scroll 1:", await page.evaluate(() => window.scrollY));

  // Scroll 2: down to editorial cards
  await page.mouse.wheel(0, 1200);
  await page.waitForTimeout(600);
  console.log("After scroll 2:", await page.evaluate(() => window.scrollY));

  // Scroll 3: down to pricing
  await page.mouse.wheel(0, 1500);
  await page.waitForTimeout(600);
  console.log("After scroll 3:", await page.evaluate(() => window.scrollY));

  // Scroll 4: down to FAQ and footer
  await page.mouse.wheel(0, 2000);
  await page.waitForTimeout(600);
  const finalY = await page.evaluate(() => window.scrollY);
  console.log("After scroll 4 (final):", finalY);

  if (finalY > 2000) {
    console.log("SUCCESS: Page scrolls freely throughout the entire page!");
  } else {
    console.error("FAILURE: Page failed to scroll past threshold.");
    process.exit(1);
  }

  await browser.close();
}

checkFullScroll().catch(console.error);
