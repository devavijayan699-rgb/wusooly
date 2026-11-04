import subprocess
import time
import json
import urllib.request
import base64
import os
import asyncio
import websockets

port = 9445
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

async def capture_url(url, out_name):
    with urllib.request.urlopen(f"http://127.0.0.1:{port}/json") as resp:
        tabs = json.loads(resp.read().decode())
    page_tab = next(t for t in tabs if t.get("type") == "page")
    ws_url = page_tab["webSocketDebuggerUrl"]

    async with websockets.connect(ws_url, max_size=20 * 1024 * 1024) as ws:
        await ws.send(json.dumps({"id": 1, "method": "Page.enable"}))
        await ws.send(json.dumps({"id": 2, "method": "Emulation.setDeviceMetricsOverride", "params": {
            "width": 1440,
            "height": 2200,
            "deviceScaleFactor": 1,
            "mobile": False
        }}))
        await ws.send(json.dumps({"id": 3, "method": "Page.navigate", "params": {"url": url}}))
        await asyncio.sleep(2.5)

        # Force reveal
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {
            "expression": "document.querySelectorAll('[class*=\"reveal\"]').forEach(r => r.classList.add('visible', 'DownloadSection-module__w38Fpa__visible'));",
            "returnByValue": True
        }}))
        await asyncio.sleep(0.5)

        scroll_code = """
        (() => {
            const sec = document.querySelector('section[id="download"]');
            if (sec) {
                sec.scrollIntoView({ behavior: 'instant', block: 'center' });
            }
        })()
        """
        await ws.send(json.dumps({"id": 5, "method": "Runtime.evaluate", "params": {"expression": scroll_code}}))
        await asyncio.sleep(0.5)

        await ws.send(json.dumps({"id": 6, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 6:
                img_bytes = base64.b64decode(data["result"]["data"])
                with open(f"scratch/{out_name}.png", "wb") as f:
                    f.write(img_bytes)
                print(f"Captured scratch/{out_name}.png")
                break

async def main():
    await capture_url("http://localhost:3000/#download", "context_home")
    await capture_url("http://localhost:3000/solutions#download", "context_solutions")

asyncio.run(main())
proc.terminate()

