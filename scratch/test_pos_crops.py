from PIL import Image

im = Image.open('public/assets/editorial-pos-hero.webp')
w, h = im.size # 1024, 640

# Machine center is x=618, y=390

# Option 1: Exact symmetrical crop centered at x=618 (width 812, height 640)
c1 = im.crop((212, 0, 1024, 640))
c1.save('scratch/opt1_crop_812x640.webp', 'WEBP', quality=95)

# Option 2: 16:10 aspect ratio centered at x=618 (crop top slightly or scale)
# If width=812, height=508:
# Y range: y0=115, y1=623
c2 = im.crop((212, 115, 1024, 623))
c2 = c2.resize((1024, 640), Image.Resampling.LANCZOS)
c2.save('scratch/opt2_16x10_centered.webp', 'WEBP', quality=95)

# Option 3: Shift left by 8% (x=80..1024 with 80px padded on right or cropped)
# Let's crop x=120..1024, y=40..600 -> resize to 1024x640
c3 = im.crop((140, 30, 1024, 610))
c3 = c3.resize((1024, 640), Image.Resampling.LANCZOS)
c3.save('scratch/opt3_balanced.webp', 'WEBP', quality=95)

# Option 4: A gentle shift so the machine feels centered without losing top lighting
# Original x center is 618. Shift center to 540 (move image 78px left)
# Crop x=156..1024, y=0..640 (width 868, height 640)
c4 = im.crop((156, 0, 1024, 640))
c4.save('scratch/opt4_gentle_868x640.webp', 'WEBP', quality=95)

print('Options generated successfully')

