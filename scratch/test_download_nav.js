const { chromium } = require("C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright");

async function testDownloadNav() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  console.log("Initial scrollY:", await page.evaluate(() => window.scrollY));

  // Find Download link in navbar
  const downloadLink = page.locator('nav a:has-text("Download")');
  console.log("Download link count:", await downloadLink.count());

  await downloadLink.click();
  await page.waitForTimeout(1500);

  const afterClickY = await page.evaluate(() => window.scrollY);
  console.log("After clicking Download scrollY:", afterClickY);

  const downloadEl = await page.evaluate(() => {
    const el = document.getElementById("download");
    if (!el) return null;
    const rect = el.getBoundingClientRect();
    return { top: rect.top, absoluteTop: window.scrollY + rect.top };
  });
  console.log("Download element position:", downloadEl);

  await browser.close();
}

testDownloadNav().catch(console.error);

