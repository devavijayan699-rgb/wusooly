import subprocess
import time
import json
import urllib.request
import base64
import os
import asyncio
import websockets
from PIL import Image

port = 9345
user_data_dir = rf"C:\Users\devav\AppData\Local\Temp\edge_manrope_{port}"
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

proc = subprocess.Popen([
    edge_path,
    "--headless=new",
    f"--remote-debugging-port={port}",
    f"--user-data-dir={user_data_dir}",
    "--window-size=1280,1100",
    "http://localhost:3000"
])

time.sleep(3)

artifacts_dir = r"C:\Users\devav\.gemini\antigravity\brain\489971f1-b386-42a4-ba37-696514c1a4a2"

async def capture(ws, url, out_name):
    # Navigate
    nav_msg = {"id": 1, "method": "Page.navigate", "params": {"url": url}}
    await ws.send(json.dumps(nav_msg))
    await asyncio.sleep(2)
    # Screenshot
    ss_msg = {"id": 2, "method": "Page.captureScreenshot", "params": {"format": "png"}}
    await ws.send(json.dumps(ss_msg))
    while True:
        resp = await ws.recv()
        data = json.loads(resp)
        if data.get("id") == 2:
            img_bytes = base64.b64decode(data["result"]["data"])
            out_path = os.path.join(artifacts_dir, out_name)
            with open(out_path, "wb") as f:
                f.write(img_bytes)
            print(f"Captured {out_name}")
            break

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
        await capture(ws, "http://localhost:3000", "manrope_home_hero.png")
        await capture(ws, "http://localhost:3000/contact", "manrope_contact_page.png")
        await capture(ws, "http://localhost:3000/solutions", "manrope_solutions_page.png")

try:
    asyncio.run(main())
finally:
    proc.terminate()

