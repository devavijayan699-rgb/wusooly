import re

with open('app/components/EditorialFeaturesSection.js', encoding='utf-8') as f:
    f1 = f.read()
print('Retail images:', re.findall(r'src="([^"]+)"', f1))

with open('app/components/CafeRestaurantFeaturesSection.js', encoding='utf-8') as f:
    f2 = f.read()
print('Cafe images:', re.findall(r'src="([^"]+)"', f2))

