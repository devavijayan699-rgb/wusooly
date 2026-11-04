from PIL import Image

src1 = r'C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/.user_uploaded/media_1793615098213_f56b6370.jpg'
src2 = r'C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/.user_uploaded/media_1793615106574_afe075b1.jpg'
src3 = r'C:/Users/devav/.gemini/antigravity/brain/489971f1-b386-42a4-ba37-696514c1a4a2/.user_uploaded/media_1793615112410_f6e76650.jpg'

# 1. Inventory Synced image
im1 = Image.open(src1).convert('RGB')
dst1 = 'public/assets/retail-inventory-synced.webp'
im1.save(dst1, 'WEBP', quality=92, method=6)
print(f'Saved {dst1} ({im1.size})')

# 2. Barcode box scan image
im2 = Image.open(src2).convert('RGB')
dst2 = 'public/assets/retail-barcode-box.webp'
im2.save(dst2, 'WEBP', quality=92, method=6)
print(f'Saved {dst2} ({im2.size})')

# 3. Reports sales overview image
im3 = Image.open(src3).convert('RGB')
dst3 = 'public/assets/retail-reports-sales.webp'
im3.save(dst3, 'WEBP', quality=92, method=6)
print(f'Saved {dst3} ({im3.size})')

