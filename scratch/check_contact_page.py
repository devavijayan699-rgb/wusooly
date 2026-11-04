import subprocess
import time
import json
import urllib.request
import base64
import asyncio
import websockets

port = 9370
user_data_dir = rf"C:\Users\devav\AppData\Local\Temp\edge_test_{port}"
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
    
    # Pick the page tab
    page_tab = next(t for t in tabs if t.get("type") == "page")
    ws_url = page_tab["webSocketDebuggerUrl"]
    print("Connecting to:", page_tab.get("url"))

    async with websockets.connect(ws_url, max_size=20 * 1024 * 1024) as ws:
        await ws.send(json.dumps({"id": 1, "method": "Page.enable"}))
        await ws.send(json.dumps({"id": 2, "method": "DOM.enable"}))
        await ws.send(json.dumps({"id": 3, "method": "Page.navigate", "params": {"url": "http://localhost:3000/contact"}}))
        await asyncio.sleep(3)

        # Check document title and HTML
        js = "({ title: document.title, url: window.location.href, a_count: document.querySelectorAll('a').length, text: document.body.innerText.slice(0, 300) })"
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {"expression": js, "returnByValue": True}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 4:
                print("Page state:", data.get("result", {}).get("value"))
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()
