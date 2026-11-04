import subprocess
import time
import json
import urllib.request
import base64
import asyncio
import websockets
from PIL import Image
import io

port = 9390
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
            "height": 1080,
            "deviceScaleFactor": 1,
            "mobile": False
        }}))
        await ws.send(json.dumps({"id": 3, "method": "Page.navigate", "params": {"url": "http://localhost:3000/solutions#cafe"}}))
        await asyncio.sleep(2.5)

        # Click on Cafes & Restaurants tab if not active
        click_tab = """
        (() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const cafeBtn = btns.find(b => b.textContent.includes('Cafés') || b.textContent.includes('Restaurants'));
            if (cafeBtn) {
                cafeBtn.click();
                return 'Clicked cafe button';
            }
            return 'Cafe button not found';
        })()
        """
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {"expression": click_tab, "returnByValue": True}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 4:
                print("Tab switch:", data.get("result", {}).get("result", {}).get("value"))
                break

        await asyncio.sleep(1.5)

        # Scroll to features section and reveal all elements
        reveal_all = """
        (() => {
            const sec = document.querySelector('#cafe-features');
            if (sec) {
                sec.scrollIntoView();
                const reveals = sec.querySelectorAll('[class*="reveal"]');
                reveals.forEach(r => r.classList.add('visible', 'CafeRestaurantFeaturesSection-module__mRskkq__visible'));
                return { found: true, cards: reveals.length };
            }
            return { found: false };
        })()
        """
        await ws.send(json.dumps({"id": 5, "method": "Runtime.evaluate", "params": {"expression": reveal_all, "returnByValue": True}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 5:
                print("Section reveal:", data.get("result", {}).get("result", {}).get("value"))
                break

        await asyncio.sleep(1.5)

        # Capture composition 1 (Row 1 to 3)
        await ws.send(json.dumps({"id": 6, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 6:
                with open("scratch/cafe_comp1.png", "wb") as f:
                    f.write(base64.b64decode(data["result"]["data"]))
                print("Saved scratch/cafe_comp1.png")
                break

        # Scroll down to composition 2 (Row 4 to 7)
        scroll_down = """
        (() => {
            window.scrollBy(0, 800);
            return window.scrollY;
        })()
        """
        await ws.send(json.dumps({"id": 7, "method": "Runtime.evaluate", "params": {"expression": scroll_down, "returnByValue": True}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 7:
                break
        await asyncio.sleep(1)

        await ws.send(json.dumps({"id": 8, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 8:
                with open("scratch/cafe_comp2.png", "wb") as f:
                    f.write(base64.b64decode(data["result"]["data"]))
                print("Saved scratch/cafe_comp2.png")
                break

        # Scroll further down to Row 7
        scroll_more = """
        (() => {
            window.scrollBy(0, 800);
            return window.scrollY;
        })()
        """
        await ws.send(json.dumps({"id": 9, "method": "Runtime.evaluate", "params": {"expression": scroll_more, "returnByValue": True}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 9:
                break
        await asyncio.sleep(1)

        await ws.send(json.dumps({"id": 10, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 10:
                with open("scratch/cafe_comp3.png", "wb") as f:
                    f.write(base64.b64decode(data["result"]["data"]))
                print("Saved scratch/cafe_comp3.png")
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()

