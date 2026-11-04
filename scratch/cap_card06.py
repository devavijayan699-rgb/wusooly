import subprocess
import time
import json
import urllib.request
import base64
import asyncio
import websockets
from PIL import Image

port = 9505
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
    "http://localhost:3000/#retail"
])

time.sleep(3)

async def cap():
    with urllib.request.urlopen(f'http://127.0.0.1:{port}/json') as resp:
        tabs = json.loads(resp.read().decode())
    page = next(t for t in tabs if t.get('type') == 'page')
    async with websockets.connect(page['webSocketDebuggerUrl'], max_size=20*1024*1024) as ws:
        await ws.send(json.dumps({"id": 1, "method": "Page.enable"}))
        await ws.send(json.dumps({"id": 2, "method": "Emulation.setDeviceMetricsOverride", "params": {
            "width": 1440,
            "height": 2400,
            "deviceScaleFactor": 1,
            "mobile": False
        }}))
        await ws.send(json.dumps({"id": 3, "method": "Page.navigate", "params": {"url": "http://localhost:3000/#retail"}}))
        await asyncio.sleep(2.5)

        # Force reveal
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {
            "expression": "document.querySelectorAll('[class*=\"reveal\"]').forEach(r => r.classList.add('visible'));",
            "returnByValue": True
        }}))
        await asyncio.sleep(0.5)

        scroll_code = """
        (() => {
            const img = document.querySelector('img[src*="retail-inventory-synced"]');
            if (img) {
                const card = img.closest('div[class*="widePhotoCard"]') || img;
                card.scrollIntoView({ behavior: 'instant', block: 'center' });
                const r = card.getBoundingClientRect();
                return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
            }
            return null;
        })()
        """
        await ws.send(json.dumps({'id': 5, 'method': 'Runtime.evaluate', 'params': {'expression': scroll_code, 'returnByValue': True}}))
        rect = None
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get('id') == 5:
                rect = data.get('result', {}).get('result', {}).get('value')
                print('Rect:', rect)
                break
        await asyncio.sleep(1.0)
        await ws.send(json.dumps({'id': 6, 'method': 'Page.captureScreenshot', 'params': {'format': 'png'}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get('id') == 6:
                img_bytes = base64.b64decode(data['result']['data'])
                with open('scratch/screen_card06_fixed.png', 'wb') as f:
                    f.write(img_bytes)
                im = Image.open('scratch/screen_card06_fixed.png')
                c = im.crop((max(0, int(rect['left'])), max(0, int(rect['top'])-10), min(im.width, int(rect['right'])), min(im.height, int(rect['bottom'])+10)))
                c.save(r'C:\Users\devav\.gemini\antigravity\brain\489971f1-b386-42a4-ba37-696514c1a4a2\card06_inventory_synced.png')
                print('Saved card06_inventory_synced.png successfully!')
                break

asyncio.run(cap())
proc.terminate()
