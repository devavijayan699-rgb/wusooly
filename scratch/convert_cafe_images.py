import os
from PIL import Image

sources = {
    "cafe-pos-hero.webp": r"C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/.user_uploaded/media_1793542676826_c48a681c.jpg",
    "cafe-payment.webp": r"C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/.user_uploaded/media_1793542711873_e2a9a8d8.jpg",
    "cafe-kitchen-display.webp": r"C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/.user_uploaded/media_1793542728480_5f0a4dea.jpg",
    "cafe-table-management.webp": r"C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/.user_uploaded/media_1793542764309_34b8c4d3.jpg",
    "cafe-customer-wallets.webp": r"C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/.user_uploaded/media_1793542800358_44415e94.jpg",
    "cafe-reports-dashboard.webp": r"C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/.user_uploaded/media_1793542852096_31f3ee58.png",
}

target_dir = r"c:\Users\devav\Downloads\whoosly\public\assets"

print("Starting conversion to WebP...")
for filename, src in sources.items():
    orig_size = os.path.getsize(src)
    im = Image.open(src)
    if im.mode in ("RGBA", "P"):
        im = im.convert("RGB")
    
    out_path = os.path.join(target_dir, filename)
    im.save(out_path, format="WEBP", quality=92, method=6)
    new_size = os.path.getsize(out_path)
    savings = (1 - (new_size / orig_size)) * 100
    print(f"[OK] {filename}: {im.size[0]}x{im.size[1]} | {orig_size/1024:.1f} KB -> {new_size/1024:.1f} KB ({savings:.1f}% reduction)")

