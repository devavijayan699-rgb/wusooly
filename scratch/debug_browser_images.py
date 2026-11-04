import subprocess
import time
import json
import urllib.request
import base64
import asyncio
import websockets
from PIL import Image

port = 9395
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
        await ws.send(json.dumps({"id": 3, "method": "Page.navigate", "params": {"url": "http://localhost:3000/solutions"}}))
        await asyncio.sleep(2.5)

        # Switch to Cafes & Restaurants
        click_script = """
        (() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const b = btns.find(btn => btn.textContent.includes('Cafés'));
            if (b) { b.click(); return 'Clicked Cafés'; }
            return 'Button not found';
        })()
        """
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {"expression": click_script, "returnByValue": True}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 4:
                print("Click result:", data.get("result", {}).get("result", {}).get("value"))
                break

        await asyncio.sleep(2)

        # Check all images in CafeRestaurantFeaturesSection
        check_images = """
        (() => {
            const sec = document.querySelector('#cafe-features');
            if (!sec) return 'Section not found';
            const imgs = Array.from(sec.querySelectorAll('img'));
            return imgs.map(img => ({
                src: img.src,
                currentSrc: img.currentSrc,
                alt: img.alt,
                naturalWidth: img.naturalWidth,
                naturalHeight: img.naturalHeight,
                complete: img.complete
            }));
        })()
        """
        await ws.send(json.dumps({"id": 5, "method": "Runtime.evaluate", "params": {"expression": check_images, "returnByValue": True}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 5:
                print("Rendered images on page:")
                print(json.dumps(data.get("result", {}).get("result", {}).get("value"), indent=2))
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()

