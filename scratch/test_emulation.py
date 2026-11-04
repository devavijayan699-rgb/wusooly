import subprocess
import time
import json
import urllib.request
import base64
import asyncio
import websockets
from PIL import Image
import io

port = 9388
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
        await ws.send(json.dumps({"id": 2, "method": "Emulation.setDeviceMetricsOverride", "params": {
            "width": 1440,
            "height": 900,
            "deviceScaleFactor": 1,
            "mobile": False
        }}))
        await ws.send(json.dumps({"id": 3, "method": "Page.navigate", "params": {"url": "http://localhost:3000/contact"}}))
        await asyncio.sleep(2.5)

        # Get exact coordinates of Solutions link
        get_pos = """
        (() => {
            const btn = document.querySelector('a[href="/solutions"]');
            if (!btn) return null;
            const r = btn.getBoundingClientRect();
            return {
                left: r.left,
                top: r.top,
                width: r.width,
                height: r.height,
                centerX: Math.round(r.left + r.width / 2),
                centerY: Math.round(r.top + r.height / 2)
            };
        })()
        """
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {"expression": get_pos, "returnByValue": True}}))
        pos = None
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 4:
                pos = data.get("result", {}).get("result", {}).get("value")
                break
        print("Solutions button pos:", pos)

        # Hover over Solutions button
        await ws.send(json.dumps({
            "id": 5,
            "method": "Input.dispatchMouseEvent",
            "params": {"type": "mouseMoved", "x": pos["centerX"], "y": pos["centerY"]}
        }))
        await asyncio.sleep(1)

        # Get dropdown position
        get_dd = """
        (() => {
            const dd = document.querySelector('[class*="dropdownMenu"]');
            if (!dd) return null;
            const r = dd.getBoundingClientRect();
            return {
                left: Math.round(r.left),
                top: Math.round(r.top),
                width: Math.round(r.width),
                height: Math.round(r.height),
                right: Math.round(r.right),
                bottom: Math.round(r.bottom)
            };
        })()
        """
        await ws.send(json.dumps({"id": 6, "method": "Runtime.evaluate", "params": {"expression": get_dd, "returnByValue": True}}))
        dd_pos = None
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 6:
                dd_pos = data.get("result", {}).get("result", {}).get("value")
                break
        print("Dropdown rect:", dd_pos)

        # Screenshot
        await ws.send(json.dumps({"id": 7, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 7:
                img_data = base64.b64decode(data["result"]["data"])
                with open("scratch/screen_full.png", "wb") as f:
                    f.write(img_data)
                
                im = Image.open(io.BytesIO(img_data))
                if dd_pos:
                    # Crop navbar + dropdown
                    c = im.crop((dd_pos["left"] - 40, dd_pos["top"] - 60, dd_pos["right"] + 40, dd_pos["bottom"] + 20))
                    c.save("scratch/screen_navbar_dropdown.png")

                    # Crop right fillet: around right edge and top edge of dropdown
                    rx = dd_pos["right"]
                    ry = dd_pos["top"]
                    rf = im.crop((rx - 25, ry - 15, rx + 35, ry + 30))
                    rf.save("scratch/screen_right_fillet.png")

                    # Crop left fillet: around left edge and top edge of dropdown
                    lx = dd_pos["left"]
                    lf = im.crop((lx - 35, ry - 15, lx + 25, ry + 30))
                    lf.save("scratch/screen_left_fillet.png")
                    print("Crops saved successfully!")
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()
