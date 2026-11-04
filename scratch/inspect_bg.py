import urllib.request
import json
import asyncio
import websockets

async def check_bg():
    with urllib.request.urlopen('http://127.0.0.1:9430/json') as r:
        tabs = json.loads(r.read().decode())
    page = next(t for t in tabs if t.get('type') == 'page')
    async with websockets.connect(page['webSocketDebuggerUrl']) as ws:
        await ws.send(json.dumps({'id': 1, 'method': 'Runtime.evaluate', 'params': {
            'expression': """(() => {
                const sec = document.querySelector('section[id="download"]');
                const parent = sec ? sec.parentElement : null;
                const body = document.body;
                return {
                    secBg: sec ? window.getComputedStyle(sec).backgroundColor : null,
                    parentBg: parent ? window.getComputedStyle(parent).backgroundColor : null,
                    bodyBg: window.getComputedStyle(body).backgroundColor,
                    parentTag: parent ? parent.className : null
                };
            })()""",
            'returnByValue': True
        }}))
        msg = await ws.recv()
        print(msg)

asyncio.run(check_bg())

