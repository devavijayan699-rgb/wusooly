const { chromium } = require("C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright");

async function testFromAbout() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  console.log("Navigating to http://localhost:3000/about...");
  await page.goto("http://localhost:3000/about", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  const downloadLink = page.locator('nav a:has-text("Download")');
  console.log("Download link on /about count:", await downloadLink.count());

  await downloadLink.click();
  await page.waitForTimeout(2000);

  console.log("Current URL:", page.url());
  const finalY = await page.evaluate(() => window.scrollY);
  console.log("Final scrollY on landing:", finalY);

  if (finalY > 4000) {
    console.log("SUCCESS: Navigated from /about and smoothly scrolled directly to Download section!");
  } else {
    console.error("FAILURE: Did not scroll to Download section.");
    process.exit(1);
  }

  await browser.close();
}

testFromAbout().catch(console.error);

