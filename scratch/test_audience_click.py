import subprocess
import time
import json
import urllib.request
import asyncio
import websockets

port = 9405
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
    "--window-size=1440,1200",
    "http://localhost:3000/solutions"
])

time.sleep(3)

async def main():
    with urllib.request.urlopen(f"http://127.0.0.1:{port}/json") as resp:
        tabs = json.loads(resp.read().decode())
    
    page_tab = next(t for t in tabs if t.get("type") == "page")
    ws_url = page_tab["webSocketDebuggerUrl"]

    async with websockets.connect(ws_url, max_size=20 * 1024 * 1024) as ws:
        await ws.send(json.dumps({"id": 1, "method": "Page.enable"}))
        await ws.send(json.dumps({"id": 2, "method": "Emulation.setDeviceMetricsOverride", "params": {
            "width": 1440,
            "height": 1080,
            "deviceScaleFactor": 1,
            "mobile": False
        }}))
        await ws.send(json.dumps({"id": 3, "method": "Page.navigate", "params": {"url": "http://localhost:3000/solutions"}}))
        await asyncio.sleep(2.5)

        # Find all buttons that contain 'Café'
        inspect_btn = """
        (() => {
            const btns = Array.from(document.querySelectorAll('button, a'));
            const matches = btns.filter(b => b.textContent.includes('Café') || b.textContent.includes('Restaurants'));
            return matches.map(b => ({
                tag: b.tagName,
                text: b.innerText,
                classes: b.className,
                ariaSelected: b.getAttribute('aria-selected')
            }));
        })()
        """
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {"expression": inspect_btn, "returnByValue": True}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 4:
                print("Matches:", json.dumps(data.get("result", {}).get("result", {}).get("value"), indent=2))
                break

        # Click the exact audience segment button
        click_seg = """
        (() => {
            const b = document.querySelectorAll('button[class*="audienceSegment"]')[1];
            if (b) {
                b.click();
                return 'Clicked audienceSegment[1]: ' + b.innerText;
            }
            return 'Segment not found';
        })()
        """
        await ws.send(json.dumps({"id": 5, "method": "Runtime.evaluate", "params": {"expression": click_seg, "returnByValue": True}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 5:
                print("Click segment result:", data.get("result", {}).get("result", {}).get("value"))
                break

        await asyncio.sleep(1.5)

        # Check if #cafe-features is present
        check_cafe = """
        (() => {
            const sec = document.querySelector('#cafe-features');
            if (!sec) return 'Still not found';
            const imgs = Array.from(sec.querySelectorAll('img')).map(i => ({ src: i.src, naturalW: i.naturalWidth }));
            return { found: true, imgs: imgs };
        })()
        """
        await ws.send(json.dumps({"id": 6, "method": "Runtime.evaluate", "params": {"expression": check_cafe, "returnByValue": True}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 6:
                print("Cafe features check:", json.dumps(data.get("result", {}).get("result", {}).get("value"), indent=2))
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()

