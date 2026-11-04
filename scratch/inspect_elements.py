import subprocess
import time
import json
import urllib.request
import asyncio
import websockets

port = 9382
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
    "--window-size=1440,1000",
    "http://localhost:3000/contact"
])

time.sleep(3)

async def main():
    with urllib.request.urlopen(f"http://127.0.0.1:{port}/json") as resp:
        tabs = json.loads(resp.read().decode())
    
    page_tab = next(t for t in tabs if t.get("type") == "page")
    ws_url = page_tab["webSocketDebuggerUrl"]

    async with websockets.connect(ws_url, max_size=20 * 1024 * 1024) as ws:
        await ws.send(json.dumps({"id": 1, "method": "Page.enable"}))
        await ws.send(json.dumps({"id": 2, "method": "Page.navigate", "params": {"url": "http://localhost:3000/contact"}}))
        await asyncio.sleep(2.5)

        inspect_js = """
        (() => {
            const btns = Array.from(document.querySelectorAll('a[href*="solution"], [class*="navItem"], [class*="dropdownTrigger"]'));
            return btns.map(b => ({
                tag: b.tagName,
                text: b.innerText,
                classes: b.className,
                rect: b.getBoundingClientRect(),
                visible: b.offsetParent !== null
            }));
        })()
        """
        await ws.send(json.dumps({"id": 3, "method": "Runtime.evaluate", "params": {"expression": inspect_js, "returnByValue": True}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 3:
                print("Found elements:", json.dumps(data.get("result", {}).get("result", {}).get("value"), indent=2))
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()
