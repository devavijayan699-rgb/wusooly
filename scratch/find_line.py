import subprocess
import time
import json
import urllib.request
import base64
import os
import asyncio
import websockets

port = 9354
user_data_dir = rf"C:\Users\devav\AppData\Local\Temp\edge_find_line_{port}"
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
        await asyncio.sleep(2)

        # Force dropdown open by adding elements or triggering state
        force_open_js = """
        (() => {
            // Find navbar and dropdownContainer
            const dc = document.querySelector('[class*="dropdownContainer"]');
            if (!dc) return "No dropdownContainer";
            // Dispatch mouseenter on dc
            dc.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }));
            return "Dispatched";
        })()
        """
        await ws.send(json.dumps({"id": 2, "method": "Runtime.evaluate", "params": {"expression": force_open_js, "returnByValue": True}}))
        await asyncio.sleep(1)

        # Check what elements exist at the coordinate
        inspect_point_js = """
        (() => {
            const dd = document.querySelector('[class*="dropdownMenu"]');
            if (!dd) return "Dropdown not open";
            const r = dd.getBoundingClientRect();
            // Point at top right of dropdown where the scoop is
            const x = r.right + 10;
            const y = r.top - 2;
            const elements = document.elementsFromPoint(x, y).map(el => ({
                tag: el.tagName,
                class: el.className,
                rect: el.getBoundingClientRect()
            }));
            const nav = document.querySelector('[class*="navbar"]');
            const navR = nav ? nav.getBoundingClientRect() : null;
            return {
                dropdownRect: r,
                navbarRect: navR,
                pointElements: elements
            };
        })()
        """
        await ws.send(json.dumps({"id": 3, "method": "Runtime.evaluate", "params": {"expression": inspect_point_js, "returnByValue": True}}))
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 3:
                print("Inspection:", json.dumps(data.get("result", {}).get("value"), indent=2))
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()
