import subprocess
import time
import json
import urllib.request
import base64
import os
import asyncio
import websockets

port = 9350
user_data_dir = rf"C:\Users\devav\AppData\Local\Temp\edge_features_ok_{port}"
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

proc = subprocess.Popen([
    edge_path,
    "--headless=new",
    f"--remote-debugging-port={port}",
    f"--user-data-dir={user_data_dir}",
    "--window-size=1280,1200",
    "http://localhost:3000"
])

time.sleep(3)

artifacts_dir = r"C:\Users\devav\.gemini\antigravity\brain\489971f1-b386-42a4-ba37-696514c1a4a2"

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
        await ws.send(json.dumps({"id": 1, "method": "Page.navigate", "params": {"url": "http://localhost:3000"}}))
        await asyncio.sleep(2)

        # Force reveal all
        inject_style = """
        const style = document.createElement('style');
        style.innerHTML = `
            [class*="reveal"] { opacity: 1 !important; transform: none !important; }
        `;
        document.head.appendChild(style);
        """
        await ws.send(json.dumps({"id": 2, "method": "Runtime.evaluate", "params": {"expression": inject_style}}))
        await asyncio.sleep(0.5)

        # Scroll to section[aria-label*="retail POS features"]
        scroll_code = """
        (() => {
            const el = document.querySelector('section[aria-label*="retail POS features"]');
            if (el) {
                el.scrollIntoView({behavior: 'instant', block: 'start'});
                return true;
            }
            return false;
        })()
        """
        await ws.send(json.dumps({"id": 3, "method": "Runtime.evaluate", "params": {"expression": scroll_code, "returnByValue": True}}))
        await asyncio.sleep(1)

        # Capture View 1: Headline + Hero Card + Row 2
        await ws.send(json.dumps({"id": 4, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 4:
                with open(os.path.join(artifacts_dir, "new_features_view1.png"), "wb") as f:
                    f.write(base64.b64decode(data["result"]["data"]))
                print("Captured new_features_view1.png")
                break

        # Scroll down 800px to Row 2 & Row 3 (Tap card, Brand story, Store panoramic)
        await ws.send(json.dumps({"id": 5, "method": "Runtime.evaluate", "params": {"expression": "window.scrollBy(0, 750);"}}))
        await asyncio.sleep(1)

        # Capture View 2
        await ws.send(json.dumps({"id": 6, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 6:
                with open(os.path.join(artifacts_dir, "new_features_view2.png"), "wb") as f:
                    f.write(base64.b64decode(data["result"]["data"]))
                print("Captured new_features_view2.png")
                break

        # Scroll down another 750px to Row 4 (Wide inventory photo)
        await ws.send(json.dumps({"id": 7, "method": "Runtime.evaluate", "params": {"expression": "window.scrollBy(0, 750);"}}))
        await asyncio.sleep(1)

        # Capture View 3
        await ws.send(json.dumps({"id": 8, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 8:
                with open(os.path.join(artifacts_dir, "new_features_view3.png"), "wb") as f:
                    f.write(base64.b64decode(data["result"]["data"]))
                print("Captured new_features_view3.png")
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()

