import subprocess
import time
import json
import urllib.request
import base64
import os
import asyncio
import websockets
from PIL import Image

port = 9346
user_data_dir = rf"C:\Users\devav\AppData\Local\Temp\edge_manrope_faq_{port}"
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

proc = subprocess.Popen([
    edge_path,
    "--headless=new",
    f"--remote-debugging-port={port}",
    f"--user-data-dir={user_data_dir}",
    "--window-size=1280,1000",
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
        # Navigate to #faq
        await ws.send(json.dumps({"id": 1, "method": "Page.navigate", "params": {"url": "http://localhost:3000#faq"}}))
        await asyncio.sleep(2)
        # Scroll to FAQ element
        scroll_code = "document.getElementById('faq')?.scrollIntoView({behavior: 'instant', block: 'center'});"
        await ws.send(json.dumps({"id": 2, "method": "Runtime.evaluate", "params": {"expression": scroll_code}}))
        await asyncio.sleep(1)
        # Screenshot
        ss_msg = {"id": 3, "method": "Page.captureScreenshot", "params": {"format": "png"}}
        await ws.send(json.dumps(ss_msg))
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 3:
                img_bytes = base64.b64decode(data["result"]["data"])
                out_path = os.path.join(artifacts_dir, "manrope_faq_section.png")
                with open(out_path, "wb") as f:
                    f.write(img_bytes)
                print("Captured manrope_faq_section.png")
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()

