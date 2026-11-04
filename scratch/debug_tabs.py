import subprocess
import time
import json
import urllib.request
import base64
import os
import asyncio
import websockets

port = 9357
user_data_dir = rf"C:\Users\devav\AppData\Local\Temp\edge_debug_{port}"
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

proc = subprocess.Popen([
    edge_path,
    "--headless=new",
    f"--remote-debugging-port={port}",
    f"--user-data-dir={user_data_dir}",
    "--window-size=1280,1000",
    "http://localhost:3000/contact"
])

time.sleep(4)

async def main():
    with urllib.request.urlopen(f"http://127.0.0.1:{port}/json") as resp:
        tabs = json.loads(resp.read().decode())
    print("Tabs found:", len(tabs))
    target_ws = tabs[0].get("webSocketDebuggerUrl")

    async with websockets.connect(target_ws, max_size=20 * 1024 * 1024) as ws:
        await ws.send(json.dumps({"id": 1, "method": "Page.enable"}))
        await ws.send(json.dumps({"id": 2, "method": "Page.navigate", "params": {"url": "http://localhost:3000/contact"}}))
        await asyncio.sleep(3)

        # Check all text in page
        check_text = "Array.from(document.querySelectorAll('a, button, span')).map(e => e.textContent.trim()).filter(Boolean).slice(0, 20)"
        await ws.send(json.dumps({"id": 3, "method": "Runtime.evaluate", "params": {"expression": check_text, "returnByValue": True}}))
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 3:
                print("Text elements:", data.get("result", {}).get("value"))
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()
