import subprocess
import time
import json
import urllib.request
import base64
import os
import asyncio
import websockets
from PIL import Image

port = 9356
user_data_dir = rf"C:\Users\devav\AppData\Local\Temp\edge_dd_verify_{port}"
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
    target_ws = None
    for tab in tabs:
        if "localhost:3000" in tab.get("url", ""):
            target_ws = tab.get("webSocketDebuggerUrl")
            break
    if not target_ws and tabs:
        target_ws = tabs[0].get("webSocketDebuggerUrl")

    async with websockets.connect(target_ws, max_size=20 * 1024 * 1024) as ws:
        await ws.send(json.dumps({"id": 1, "method": "Page.navigate", "params": {"url": "http://localhost:3000/contact"}}))
        # Wait for page to finish loading
        await asyncio.sleep(2.5)

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
            # Move mouse to trigger hover
            await ws.send(json.dumps({
                "id": 3,
                "method": "Input.dispatchMouseEvent",
                "params": {"type": "mouseMoved", "x": pos["x"], "y": pos["y"]}
            }))
            await asyncio.sleep(1)

            # Check if dropdown opened
            check_dd = "!!document.querySelector('[class*=\"dropdownMenu\"]')"
            await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {"expression": check_dd, "returnByValue": True}}))
            while True:
                resp = await ws.recv()
                data = json.loads(resp)
                if data.get("id") == 4:
                    print("Dropdown opened:", data.get("result", {}).get("value"))
                    break

            # Capture screenshot
            await ws.send(json.dumps({"id": 5, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
            while True:
                resp = await ws.recv()
                data = json.loads(resp)
                if data.get("id") == 5:
                    with open("scratch/test_dropdown_hover.png", "wb") as f:
                        f.write(base64.b64decode(data["result"]["data"]))
                    print("Saved scratch/test_dropdown_hover.png")
                    break

try:
    asyncio.run(main())
finally:
    proc.terminate()
