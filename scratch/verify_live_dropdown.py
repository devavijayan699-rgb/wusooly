import subprocess
import time
import json
import urllib.request
import base64
import asyncio
import websockets
from PIL import Image
import io

port = 9380
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
    "--window-size=1280,1000",
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

        # Get position of Solutions button
        get_pos = """
        (() => {
            const btn = document.querySelector('a[href="/solutions"]');
            if (!btn) return null;
            const r = btn.getBoundingClientRect();
            return { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) };
        })()
        """
        await ws.send(json.dumps({"id": 3, "method": "Runtime.evaluate", "params": {"expression": get_pos, "returnByValue": True}}))
        pos = None
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 3:
                pos = data.get("result", {}).get("result", {}).get("value")
                break
        print("Solutions button pos:", pos)

        # Hover over Solutions button
        await ws.send(json.dumps({
            "id": 4,
            "method": "Input.dispatchMouseEvent",
            "params": {"type": "mouseMoved", "x": pos["x"], "y": pos["y"]}
        }))
        await asyncio.sleep(1)

        # Check dropdown bounding rect
        get_dd = """
        (() => {
            const dd = document.querySelector('[class*="dropdownMenu"]');
            if (!dd) return null;
            const r = dd.getBoundingClientRect();
            return { x: Math.round(r.left), y: Math.round(r.top), width: Math.round(r.width), height: Math.round(r.height) };
        })()
        """
        await ws.send(json.dumps({"id": 5, "method": "Runtime.evaluate", "params": {"expression": get_dd, "returnByValue": True}}))
        dd_rect = None
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 5:
                dd_rect = data.get("result", {}).get("result", {}).get("value")
                break
        print("Dropdown rect:", dd_rect)

        # Capture screenshot
        await ws.send(json.dumps({"id": 6, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 6:
                img_data = base64.b64decode(data["result"]["data"])
                with open("scratch/live_contact_dropdown.png", "wb") as f:
                    f.write(img_data)
                
                # Crop navbar & dropdown area
                im = Image.open(io.BytesIO(img_data))
                if dd_rect:
                    # Navbar is roughly y: 15 to 80, x: 200 to 1080
                    nav_crop = im.crop((dd_rect["x"] - 50, dd_rect["y"] - 50, dd_rect["x"] + dd_rect["width"] + 50, dd_rect["y"] + dd_rect["height"] + 20))
                    nav_crop.save("scratch/live_nav_dropdown_crop.png")
                    
                    # Crop right fillet
                    # dd_rect["x"] + dd_rect["width"] is the right edge of dropdown
                    rx = dd_rect["x"] + dd_rect["width"]
                    ry = dd_rect["y"]
                    right_fillet = im.crop((rx - 30, ry - 15, rx + 40, ry + 35))
                    right_fillet.save("scratch/live_right_fillet.png")

                    # Crop left fillet
                    lx = dd_rect["x"]
                    left_fillet = im.crop((lx - 40, ry - 15, lx + 30, ry + 35))
                    left_fillet.save("scratch/live_left_fillet.png")
                    print("Saved fillet crops successfully!")
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()
