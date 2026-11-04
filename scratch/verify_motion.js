const { chromium } = require("C:/Users/devav/AppData/Local/npm-cache/_npx/e41f203b7505f1fb/node_modules/playwright");

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
  });
  const page = await context.newPage();

  const consoleErrors = [];
  page.on("console", (msg) => {
    if (msg.type() === "error") {
      consoleErrors.push(msg.text());
    }
  });
  page.on("pageerror", (err) => {
    consoleErrors.push(err.message);
  });

  console.log("Navigating to http://localhost:3000...");
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });

  // Wait for preloader and hero animation (≈2.2s)
  await page.waitForTimeout(2500);

  await page.screenshot({
    path: "C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/motion_hero_desktop.png",
  });
  console.log("Captured hero screenshot");

  // Scroll down to Pricing
  const pricingSection = page.locator("#pricing");
  if (await pricingSection.count() > 0) {
    await pricingSection.scrollIntoViewIfNeeded();
    await page.waitForTimeout(1400);
    await page.screenshot({
      path: "C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/motion_pricing_desktop.png",
    });
    console.log("Captured pricing screenshot");
  }

  // Navigate to /about
  console.log("Navigating to /about...");
  await page.goto("http://localhost:3000/about", { waitUntil: "networkidle" });
  await page.waitForTimeout(1500);
  await page.screenshot({
    path: "C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/motion_about_desktop.png",
  });
  console.log("Captured about screenshot");

  console.log("Console errors encountered:", consoleErrors.length);
  if (consoleErrors.length > 0) {
    console.log("Errors:", consoleErrors);
  }

  await browser.close();
  console.log("Verification finished successfully!");
}

run().catch((err) => {
  console.error("Test failed:", err);
  process.exit(1);
});

