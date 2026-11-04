import subprocess
import time
import json
import urllib.request
import base64
import os
import asyncio
import websockets
from PIL import Image

port = 9360
user_data_dir = rf"C:\Users\devav\AppData\Local\Temp\edge_verify_{port}"
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

proc = subprocess.Popen([
    edge_path,
    "--headless=new",
    f"--remote-debugging-port={port}",
    f"--user-data-dir={user_data_dir}",
    "--window-size=1280,1000",
    "http://localhost:3000/contact"
])

time.sleep(3)

async def main():
    with urllib.request.urlopen(f"http://127.0.0.1:{port}/json") as resp:
        tabs = json.loads(resp.read().decode())
    target_tab = next(t for t in tabs if t.get("type") == "page")
    target_ws = target_tab.get("webSocketDebuggerUrl")

    async with websockets.connect(target_ws, max_size=20 * 1024 * 1024) as ws:
        await ws.send(json.dumps({"id": 1, "method": "Page.navigate", "params": {"url": "http://localhost:3000/contact"}}))
        await asyncio.sleep(3)

        # Trigger dropdown open by dispatching mouseenter on dropdownContainer or finding trigger
        open_script = """
        (() => {
            const dc = document.querySelector('[class*="dropdownContainer"]');
            if (dc) {
                dc.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true, cancelable: true }));
                return "Dispatched mouseenter on dropdownContainer";
            }
            return "No dropdownContainer found";
        })()
        """
        await ws.send(json.dumps({"id": 2, "method": "Runtime.evaluate", "params": {"expression": open_script, "returnByValue": True}}))
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 2:
                print("Open result:", data.get("result", {}).get("value"))
                break

        await asyncio.sleep(0.5)

        # Check if dropdownMenu is in DOM
        check_script = """
        (() => {
            const dm = document.querySelector('[class*="dropdownMenu"]');
            if (!dm) return null;
            const r = dm.getBoundingClientRect();
            return { x: r.x, y: r.y, width: r.width, height: r.height };
        })()
        """
        await ws.send(json.dumps({"id": 3, "method": "Runtime.evaluate", "params": {"expression": check_script, "returnByValue": True}}))
        rect = None
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 3:
                rect = data.get("result", {}).get("value")
                print("Dropdown rect:", rect)
                break

        # Capture screenshot
        await ws.send(json.dumps({"id": 4, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 4:
                img_bytes = base64.b64decode(data["result"]["data"])
                with open("scratch/verified_dropdown.png", "wb") as f:
                    f.write(img_bytes)
                print("Saved scratch/verified_dropdown.png")
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()
