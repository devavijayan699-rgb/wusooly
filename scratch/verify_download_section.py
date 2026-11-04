import subprocess
import time
import json
import urllib.request
import base64
import os
import asyncio
import websockets
from PIL import Image

port = 9450
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
    "--window-size=1440,2400",
    "http://localhost:3000/#download"
])

time.sleep(3)

artifacts_dir = r"C:\Users\devav\.gemini\antigravity\brain\489971f1-b386-42a4-ba37-696514c1a4a2"

async def capture_download(width, height, is_mobile, out_name):
    with urllib.request.urlopen(f"http://127.0.0.1:{port}/json") as resp:
        tabs = json.loads(resp.read().decode())
    
    page_tab = next(t for t in tabs if t.get("type") == "page")
    ws_url = page_tab["webSocketDebuggerUrl"]

    async with websockets.connect(ws_url, max_size=20 * 1024 * 1024) as ws:
        await ws.send(json.dumps({"id": 1, "method": "Page.enable"}))
        await ws.send(json.dumps({"id": 2, "method": "Emulation.setDeviceMetricsOverride", "params": {
            "width": width,
            "height": height,
            "deviceScaleFactor": 1,
            "mobile": is_mobile
        }}))
        await ws.send(json.dumps({"id": 3, "method": "Page.navigate", "params": {"url": "http://localhost:3000/#download"}}))
        await asyncio.sleep(2.5)

        # Make reveal elements visible
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {
            "expression": "document.querySelectorAll('[class*=\"reveal\"]').forEach(r => r.classList.add('visible', 'DownloadSection-module__w38Fpa__visible', 'DownloadSection-module__Kz8KGa__visible'));",
            "returnByValue": True
        }}))
        await asyncio.sleep(0.5)

        # Scroll download section into center
        scroll_code = """
        (() => {
            const sec = document.querySelector('section[id="download"]');
            if (sec) {
                sec.scrollIntoView({ behavior: 'instant', block: 'center' });
                const r = sec.getBoundingClientRect();
                return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
            }
            return null;
        })()
        """
        await ws.send(json.dumps({"id": 5, "method": "Runtime.evaluate", "params": {"expression": scroll_code, "returnByValue": True}}))
        rect = None
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 5:
                rect = data.get("result", {}).get("result", {}).get("value")
                print(f"[{out_name}] Found section rect:", rect)
                break
        
        await asyncio.sleep(0.5)
        await ws.send(json.dumps({"id": 6, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 6:
                img_bytes = base64.b64decode(data["result"]["data"])
                raw_path = f"scratch/screen_{out_name}"
                with open(raw_path, "wb") as f:
                    f.write(img_bytes)
                if rect:
                    im = Image.open(raw_path)
                    # Add 20px padding around rect
                    x0 = max(0, int(rect["left"]))
                    y0 = max(0, int(rect["top"]) - 10)
                    x1 = min(im.width, int(rect["right"]))
                    y1 = min(im.height, int(rect["bottom"]) + 10)
                    print(f"[{out_name}] Cropping: {x0}, {y0}, {x1}, {y1}")
                    if x1 > x0 and y1 > y0:
                        c = im.crop((x0, y0, x1, y1))
                        dest = os.path.join(artifacts_dir, out_name)
                        c.save(dest)
                        print(f"[{out_name}] Saved to {dest} successfully!")
                break

async def main():
    await capture_download(1440, 2200, False, "download_section_desktop.png")
    await capture_download(390, 2200, True, "download_section_mobile.png")

asyncio.run(main())
proc.terminate()
