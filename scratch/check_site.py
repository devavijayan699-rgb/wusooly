import urllib.request
import re

css_files = [
    'https://wusooly.com/_next/static/chunks/610575abbf0c9bd8.css',
    'https://wusooly.com/_next/static/chunks/c9fbe53b08bf3699.css',
    'https://wusooly.com/_next/static/chunks/6ac2366955973337.css',
    'https://wusooly.com/_next/static/chunks/9f1e17530f34d0fe.css'
]

for url in css_files:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req, timeout=8) as res:
            content = res.read().decode('utf-8', errors='ignore')
            fonts = re.findall(r'font-family:[^;]+', content)
            font_faces = re.findall(r'@font-face\s*\{[^}]+\}', content)
            print(url)
            for f in set(fonts):
                print(' ', f)
            for ff in font_faces:
                print('  FF:', ff)
    except Exception as e:
        print('err:', e)

