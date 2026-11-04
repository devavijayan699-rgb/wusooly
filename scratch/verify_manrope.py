from PIL import Image, ImageFont, ImageDraw
import numpy as np

# Load Manrope
font = ImageFont.truetype("scratch/Manrope.ttf", size=136)
font.set_variation_by_name("ExtraBold")

# Create image
img = Image.new("RGBA", (1000, 250), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)
# Draw text
draw.text((0, 30), "usooly", fill=(0, 255, 0, 180), font=font)

# Load logo crop
logo = Image.open("scratch/logo_usooly_crop.png").convert("RGBA")
# Red tint for logo
logo_arr = np.array(logo)
r_chan = logo_arr[:, :, 0]
alpha = logo_arr[:, :, 3]

# Let's save a combined comparison image
logo_rgb = Image.new("RGBA", logo.size, (255, 0, 0, 0))
# Let's create side-by-side comparison
composite = Image.new("RGB", (750, 320), (10, 20, 15))
# draw logo top
composite.paste(logo.convert("RGB"), (20, 20))
# draw rendered text below
render_sub = img.crop(img.getbbox())
composite.paste(render_sub.resize((logo.width, int(render_sub.height * (logo.width / render_sub.width)))).convert("RGB"), (20, 180))

composite.save("scratch/manrope_exact_comparison.png")
print("Saved comparison")

