import subprocess
import time
import json
import urllib.request
import base64
import asyncio
import websockets
from PIL import Image

port = 9417
user_data_dir = rf"C:\Users\devav\AppData\Local\Temp\edge_test_{port}"
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

proc = subprocess.Popen([
    edge_path,
    "--headless=new",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-fre",
    f"--remote-debugging-port={port}",
    f"--user-data-dir={user_data_dir}",
    "--window-size=1440,1200",
    "http://localhost:3000/solutions"
])

time.sleep(3)

async def main():
    with urllib.request.urlopen(f"http://127.0.0.1:{port}/json") as resp:
        tabs = json.loads(resp.read().decode())
    
    page_tab = next(t for t in tabs if t.get("type") == "page")
    ws_url = page_tab["webSocketDebuggerUrl"]

    async with websockets.connect(ws_url, max_size=20 * 1024 * 1024) as ws:
        await ws.send(json.dumps({"id": 1, "method": "Page.enable"}))
        await ws.send(json.dumps({"id": 2, "method": "Emulation.setDeviceMetricsOverride", "params": {
            "width": 1440,
            "height": 1200,
            "deviceScaleFactor": 1,
            "mobile": False
        }}))
        await ws.send(json.dumps({"id": 3, "method": "Page.navigate", "params": {"url": "http://localhost:3000/solutions"}}))
        await asyncio.sleep(2.5)

        # Make reveal elements visible
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {
            "expression": "document.querySelectorAll('[class*=\"reveal\"]').forEach(r => r.classList.add('visible', 'EditorialFeaturesSection-module__w38Fpa__visible'));",
            "returnByValue": True
        }}))
        await asyncio.sleep(0.5)

        # 1. Scroll stock card into center
        scroll_stock = """
        (() => {
            const titles = Array.from(document.querySelectorAll('h3'));
            const stockH3 = titles.find(h => h.textContent.includes('STOCK THAT UPDATES'));
            const card = stockH3 ? stockH3.closest('[class*="card"]') : null;
            if (card) {
                card.scrollIntoView({ behavior: 'instant', block: 'center' });
                const r = card.getBoundingClientRect();
                return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
            }
            return null;
        })()
        """
        await ws.send(json.dumps({"id": 5, "method": "Runtime.evaluate", "params": {"expression": scroll_stock, "returnByValue": True}}))
        rect_stock = None
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 5:
                rect_stock = data.get("result", {}).get("result", {}).get("value")
                break
        await asyncio.sleep(0.5)

        # Capture stock screenshot
        await ws.send(json.dumps({"id": 6, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 6:
                img_bytes = base64.b64decode(data["result"]["data"])
                with open("scratch/screen_stock.png", "wb") as f:
                    f.write(img_bytes)
                if rect_stock:
                    im = Image.open("scratch/screen_stock.png")
                    c = im.crop((int(rect_stock["left"]), int(rect_stock["top"]), int(rect_stock["right"]), int(rect_stock["bottom"])))
                    c.save(r"C:\Users\devav\.gemini\antigravity\brain\489971f1-b386-42a4-ba37-696514c1a4a2\retail_new_stock_updates.png")
                    print("Saved retail_new_stock_updates.png successfully!")
                break

        # 2. Scroll reports card into center
        scroll_reports = """
        (() => {
            const titles = Array.from(document.querySelectorAll('h3'));
            const reportsH3 = titles.find(h => h.textContent.includes('PERFORMANCE REPORTS'));
            const card = reportsH3 ? reportsH3.closest('[class*="card"]') : null;
            if (card) {
                card.scrollIntoView({ behavior: 'instant', block: 'center' });
                const r = card.getBoundingClientRect();
                return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
            }
            return null;
        })()
        """
        await ws.send(json.dumps({"id": 7, "method": "Runtime.evaluate", "params": {"expression": scroll_reports, "returnByValue": True}}))
        rect_reports = None
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 7:
                rect_reports = data.get("result", {}).get("result", {}).get("value")
                break
        await asyncio.sleep(0.5)

        # Capture reports screenshot
        await ws.send(json.dumps({"id": 8, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 8:
                img_bytes = base64.b64decode(data["result"]["data"])
                with open("scratch/screen_reports.png", "wb") as f:
                    f.write(img_bytes)
                if rect_reports:
                    im = Image.open("scratch/screen_reports.png")
                    c = im.crop((int(rect_reports["left"]), int(rect_reports["top"]), int(rect_reports["right"]), int(rect_reports["bottom"])))
                    c.save(r"C:\Users\devav\.gemini\antigravity\brain\489971f1-b386-42a4-ba37-696514c1a4a2\retail_new_performance_reports.png")
                    print("Saved retail_new_performance_reports.png successfully!")
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()
