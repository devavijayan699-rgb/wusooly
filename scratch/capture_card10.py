import subprocess
import time
import json
import urllib.request
import base64
import os
import asyncio
import websockets

port = 9352
user_data_dir = rf"C:\Users\devav\AppData\Local\Temp\edge_aerial_wait_{port}"
edge_path = r"C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe"

proc = subprocess.Popen([
    edge_path,
    "--headless=new",
    f"--remote-debugging-port={port}",
    f"--user-data-dir={user_data_dir}",
    "--window-size=1280,1000",
    "http://localhost:3000"
])

time.sleep(3)

artifacts_dir = r"C:\Users\devav\.gemini\antigravity\brain\489971f1-b386-42a4-ba37-696514c1a4a2"

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
        await ws.send(json.dumps({"id": 1, "method": "Page.navigate", "params": {"url": "http://localhost:3000"}}))
        await asyncio.sleep(2)

        # Force reveal
        inject_style = """
        const style = document.createElement('style');
        style.innerHTML = `
            [class*="reveal"] { opacity: 1 !important; transform: none !important; }
        `;
        document.head.appendChild(style);
        """
        await ws.send(json.dumps({"id": 2, "method": "Runtime.evaluate", "params": {"expression": inject_style}}))
        await asyncio.sleep(0.5)

        # Scroll to Card 10 (widePhotoShort)
        scroll_code = "document.querySelector('[class*=\"widePhotoShort\"]')?.scrollIntoView({behavior: 'instant', block: 'center'});"
        await ws.send(json.dumps({"id": 3, "method": "Runtime.evaluate", "params": {"expression": scroll_code}}))
        
        # Wait for all images to complete loading
        wait_imgs = """
        new Promise(resolve => {
            const imgs = Array.from(document.images);
            let pending = imgs.filter(img => !img.complete);
            if (pending.length === 0) return resolve();
            let count = pending.length;
            pending.forEach(img => {
                img.addEventListener('load', () => { count--; if (count === 0) resolve(); });
                img.addEventListener('error', () => { count--; if (count === 0) resolve(); });
            });
            setTimeout(resolve, 3500);
        })
        """
        await ws.send(json.dumps({"id": 4, "method": "Runtime.evaluate", "params": {"expression": wait_imgs, "awaitPromise": True}}))
        await asyncio.sleep(1)

        # Capture Card 10
        await ws.send(json.dumps({"id": 5, "method": "Page.captureScreenshot", "params": {"format": "png"}}))
        while True:
            resp = await ws.recv()
            data = json.loads(resp)
            if data.get("id") == 5:
                with open(os.path.join(artifacts_dir, "card_10_store_aerial.png"), "wb") as f:
                    f.write(base64.b64decode(data["result"]["data"]))
                print("Captured card_10_store_aerial.png with loaded image")
                break

try:
    asyncio.run(main())
finally:
    proc.terminate()

