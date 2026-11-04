import subprocess
import time
import json
import urllib.request
import base64
import os
import asyncio
import websockets

port = 9353
user_data_dir = rf"C:\Users\devav\AppData\Local\Temp\edge_dd_inspect_{port}"
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

        # Trigger hover on solutions to open dropdown
        hover_js = """
        (() => {
            const btn = document.querySelector('a[href="/solutions"]');
            if (btn) {
                const parent = btn.closest('[class*="dropdownContainer"]');
                const mouseover = new MouseEvent('mouseenter', { bubbles: true });
                parent.dispatchEvent(mouseover);
                return true;
            }
            return false;
        })()
        """
        await ws.send(json.dumps({"id": 2, "method": "Runtime.evaluate", "params": {"expression": hover_js, "returnByValue": True}}))
        await asyncio.sleep(1)

        # Inspect the dropdown elements and styles
        inspect_js = """
        (() => {
            const dd = document.querySelector('[class*="dropdownMenu"]');
            if (!dd) return { error: "Dropdown not open" };
            const cs = window.getComputedStyle(dd);
            const before = window.getComputedStyle(dd, '::before');
            const after = window.getComputedStyle(dd, '::after');
            const r = dd.getBoundingClientRect();
            return {
                dropdown: {
                    rect: { top: r.top, left: r.left, width: r.width, height: r.height },
                    background: cs.background,
                    border: cs.border,
                    boxShadow: cs.boxShadow,
                    top: cs.top,
                    left: cs.left
                },
                before: {
                    content: before.content,
                    top: before.top,
                    left: before.left,
                    width: before.width,
                    height: before.height,
                    background: before.background,
                    border: before.border
                },
                after: {
                    content: after.content,
                    top: after.top,
                    right: after.right,
                    width: after.width,
                    height: after.height,
                    background: after.background,
                    border: after.border
                }
            };
        })()
        """
        await ws.send(json.dumps({"id": 3, "method": "Runtime.evaluate", "params": {"expression": inspect_js, "returnByValue": True}}))
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 3:
                print("Inspection result:")
                print(json.dumps(data.get("result", {}).get("value"), indent=2))
                break

        # Capture a precise crop of the dropdown top right and top left
        await ws.send(json.dumps({"id": 4, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 4:
                with open("scratch/live_dropdown.png", "wb") as f:
                    f.write(base64.b64decode(data["result"]["data"]))
                print("Saved scratch/live_dropdown.png")
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()
