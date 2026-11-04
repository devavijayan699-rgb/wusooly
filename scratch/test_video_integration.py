import subprocess
import time
import json
import urllib.request
import base64
import asyncio
import websockets
from PIL import Image

port = 9426
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
    "http://localhost:3000/solutions#retail"
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
        await ws.send(json.dumps({"id": 3, "method": "Page.navigate", "params": {"url": "http://localhost:3000/solutions#retail"}}))
        await asyncio.sleep(2.5)

        # Make reveal elements visible
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {
            "expression": "document.querySelectorAll('[class*=\"reveal\"]').forEach(r => r.classList.add('visible', 'EditorialFeaturesSection-module__w38Fpa__visible'));",
            "returnByValue": True
        }}))
        await asyncio.sleep(0.5)

        # Inject video element into Card 03 (Hardware built for retail speed)
        inject_video = """
        (() => {
            const h4 = Array.from(document.querySelectorAll('h4')).find(h => h.textContent.includes('HARDWARE BUILT FOR RETAIL SPEED'));
            const card = h4 ? h4.closest('[class*="photoCard"]') || h4.closest('[class*="card"]') : null;
            if (!card) return null;

            // Replace img with video
            const img = card.querySelector('img');
            if (img) img.style.display = 'none';

            let vid = card.querySelector('video');
            if (!vid) {
                vid = document.createElement('video');
                vid.autoplay = true;
                vid.loop = true;
                vid.muted = true;
                vid.playsInline = true;
                vid.preload = 'auto';
                vid.poster = '/assets/pos-video-poster.webp';
                vid.style.cssText = `
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    object-position: center;
                    z-index: 0;
                    background: #f0f0ee;
                `;
                const srcWebm = document.createElement('source');
                srcWebm.src = '/assets/pos.webm';
                srcWebm.type = 'video/webm';
                const srcMp4 = document.createElement('source');
                srcMp4.src = '/assets/pos-optimized.mp4';
                srcMp4.type = 'video/mp4';
                vid.appendChild(srcWebm);
                vid.appendChild(srcMp4);
                card.insertBefore(vid, card.firstChild);
                vid.play().catch(e => console.log('Autoplay error:', e));
            }

            card.scrollIntoView({ behavior: 'instant', block: 'center' });
            const r = card.getBoundingClientRect();
            return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
        })()
        """
        await ws.send(json.dumps({"id": 5, "method": "Runtime.evaluate", "params": {"expression": inject_video, "returnByValue": True}}))
        rect = None
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 5:
                rect = data.get("result", {}).get("result", {}).get("value")
                break
        
        # Wait 1.5 seconds for video to play a bit
        await asyncio.sleep(1.5)

        # Capture screenshot
        await ws.send(json.dumps({"id": 6, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            msg = await ws.recv()
            data = json.loads(msg)
            if data.get("id") == 6:
                img_bytes = base64.b64decode(data["result"]["data"])
                with open("scratch/screen_video_hardware.png", "wb") as f:
                    f.write(img_bytes)
                if rect:
                    im = Image.open("scratch/screen_video_hardware.png")
                    c = im.crop((int(rect["left"]), int(rect["top"]), int(rect["right"]), int(rect["bottom"])))
                    dest = rf"C:\Users\devav\.gemini\antigravity\brain\489971f1-b386-42a4-ba37-696514c1a4a2\preview_video_hardware_card.png"
                    c.save(dest)
                    print("Saved preview_video_hardware_card.png successfully!")
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()

