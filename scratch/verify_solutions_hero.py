import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        
        # Desktop
        page = await browser.new_page(viewport={"width": 1440, "height": 900})
        await page.goto("http://localhost:3000/solutions", wait_until="networkidle")
        await page.screenshot(
            path=r"C:\Users\devav\.gemini\antigravity\brain\489971f1-b386-42a4-ba37-696514c1a4a2\solutions_hero_nocards_desktop.png",
            clip={"x": 0, "y": 0, "width": 1440, "height": 550}
        )
        
        # Mobile
        page_mobile = await browser.new_page(viewport={"width": 390, "height": 844})
        await page_mobile.goto("http://localhost:3000/solutions", wait_until="networkidle")
        await page_mobile.screenshot(
            path=r"C:\Users\devav\.gemini\antigravity\brain\489971f1-b386-42a4-ba37-696514c1a4a2\solutions_hero_nocards_mobile.png",
            clip={"x": 0, "y": 0, "width": 390, "height": 520}
        )
        
        await browser.close()
        print("Screenshots captured successfully.")

if __name__ == "__main__":
    asyncio.run(main())
