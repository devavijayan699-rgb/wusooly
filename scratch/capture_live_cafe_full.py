import subprocess
import time
import json
import urllib.request
import base64
import asyncio
import websockets
from PIL import Image
import io

port = 9398
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
    "--window-size=1440,2500",
    "http://localhost:3000/solutions#cafe"
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
            "height": 2500,
            "deviceScaleFactor": 1,
            "mobile": False
        }}))
        await ws.send(json.dumps({"id": 3, "method": "Page.navigate", "params": {"url": "http://localhost:3000/solutions#cafe"}}))
        await asyncio.sleep(2)

        # Force toggle to Cafes
        click_script = """
        (() => {
            const btns = Array.from(document.querySelectorAll('button'));
            const b = btns.find(btn => btn.textContent.includes('Cafés'));
            if (b) b.click();
            return !!b;
        })()
        """
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {"expression": click_script, "returnByValue": True}}))
        await asyncio.sleep(1.5)

        # Scroll progressively to trigger all lazy-loaded images and reveals
        scroll_script = """
        (async () => {
            const sec = document.querySelector('#cafe-features');
            if (sec) {
                const reveals = sec.querySelectorAll('[class*="reveal"]');
                reveals.forEach(r => r.classList.add('visible', 'CafeRestaurantFeaturesSection-module__mRskkq__visible'));
            }
            window.scrollTo(0, 1000);
            await new Promise(r => setTimeout(r, 600));
            window.scrollTo(0, 2000);
            await new Promise(r => setTimeout(r, 600));
            window.scrollTo(0, 500);
            await new Promise(r => setTimeout(r, 600));
            return 'Scrolled';
        })()
        """
        await ws.send(json.dumps({"id": 5, "method": "Runtime.evaluate", "params": {"expression": scroll_script, "awaitPromise": True, "returnByValue": True}}))
        await asyncio.sleep(1)

        # Capture full page screenshot
        await ws.send(json.dumps({"id": 6, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 6:
                with open("scratch/live_full_solutions_cafe.png", "wb") as f:
                    f.write(base64.b64decode(data["result"]["data"]))
                print("Saved scratch/live_full_solutions_cafe.png")
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()

