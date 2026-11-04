import subprocess
import time
import json
import urllib.request
import base64
import os
import asyncio
import websockets
from PIL import Image

port = 9358
user_data_dir = rf"C:\Users\devav\AppData\Local\Temp\edge_exact_tab_{port}"
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
    print("Target page URL:", target_tab.get("url"))

    async with websockets.connect(target_ws, max_size=20 * 1024 * 1024) as ws:
        await ws.send(json.dumps({"id": 1, "method": "Page.navigate", "params": {"url": "http://localhost:3000/contact"}}))
        await asyncio.sleep(2)

        # Find Solutions link coordinates
        get_pos = """
        (() => {
            const links = Array.from(document.querySelectorAll('a'));
            const btn = links.find(el => el.textContent.includes('Solutions'));
            if (!btn) return null;
            const r = btn.getBoundingClientRect();
            return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
        })()
        """
        await ws.send(json.dumps({"id": 2, "method": "Runtime.evaluate", "params": {"expression": get_pos, "returnByValue": True}}))
        pos = None
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 2:
                pos = data.get("result", {}).get("value")
                break
        print("Solutions button pos:", pos)

        if pos:
            # Hover mouse
            await ws.send(json.dumps({
                "id": 3,
                "method": "Input.dispatchMouseEvent",
                "params": {"type": "mouseMoved", "x": pos["x"], "y": pos["y"]}
            }))
            await asyncio.sleep(0.8)

            # Take full screenshot
            await ws.send(json.dumps({"id": 4, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
            while True:
                resp = await ws.recv()
                data = json.loads(resp)
                if data.get("id") == 4:
                    img_bytes = base64.b64decode(data["result"]["data"])
                    with open("scratch/navbar_dropdown_fixed.png", "wb") as f:
                        f.write(img_bytes)
                    print("Saved scratch/navbar_dropdown_fixed.png")
                    break

try:
    asyncio.run(main())
finally:
    proc.terminate()
