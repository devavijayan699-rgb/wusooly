import subprocess
import time
import json
import urllib.request
import base64
import asyncio
import websockets
from PIL import Image

port = 9418
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
    "http://localhost:3000/solutions#cafe"
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
            "height": 1200,
            "deviceScaleFactor": 1,
            "mobile": False
        }}))
        await ws.send(json.dumps({"id": 3, "method": "Page.navigate", "params": {"url": "http://localhost:3000/solutions#cafe"}}))
        await asyncio.sleep(2.5)

        # Make reveal elements visible
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {
            "expression": "document.querySelectorAll('[class*=\"reveal\"]').forEach(r => r.classList.add('visible', 'CafeRestaurantFeaturesSection-module__w38Fpa__visible'));",
            "returnByValue": True
        }}))
        await asyncio.sleep(0.5)

        cards_to_capture = [
            ("TABLE MANAGEMENT", "cafe_verified_table_management.png"),
            ("CUSTOMER RECORDS", "cafe_verified_customer_wallets.png"),
            ("KNOW YOUR NUMBERS", "cafe_verified_reports_dashboard.png"),
        ]

        msg_id = 10
        for title_text, out_name in cards_to_capture:
            msg_id += 1
            scroll_code = f"""
            (() => {{
                const titles = Array.from(document.querySelectorAll('h3'));
                const h3 = titles.find(h => h.textContent.includes('{title_text}'));
                const card = h3 ? h3.closest('[class*="card"]') : null;
                if (card) {{
                    card.scrollIntoView({{ behavior: 'instant', block: 'center' }});
                    const r = card.getBoundingClientRect();
                    return {{ left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height }};
                }}
                return null;
            }})()
            """
            await ws.send(json.dumps({"id": msg_id, "method": "Runtime.evaluate", "params": {"expression": scroll_code, "returnByValue": True}}))
            rect = None
            while True:
                msg = await ws.recv()
                data = json.loads(msg)
                if data.get("id") == msg_id:
                    rect = data.get("result", {}).get("result", {}).get("value")
                    break
            
            await asyncio.sleep(0.5)
            msg_id += 1
            await ws.send(json.dumps({"id": msg_id, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
            while True:
                msg = await ws.recv()
                data = json.loads(msg)
                if data.get("id") == msg_id:
                    img_bytes = base64.b64decode(data["result"]["data"])
                    tmp_file = f"scratch/tmp_{out_name}"
                    with open(tmp_file, "wb") as f:
                        f.write(img_bytes)
                    if rect:
                        im = Image.open(tmp_file)
                        c = im.crop((int(rect["left"]), int(rect["top"]), int(rect["right"]), int(rect["bottom"])))
                        dest = rf"C:\Users\devav\.gemini\antigravity\brain\489971f1-b386-42a4-ba37-696514c1a4a2\{out_name}"
                        c.save(dest)
                        print(f"Saved {out_name} successfully!")
                    break

try:
    asyncio.run(main())
finally:
    proc.terminate()

