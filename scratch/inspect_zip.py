import zipfile
import os

zip_path = r'c:\Users\devav\Downloads\wusooly-editorial-features.zip'
out_dir = r'scratch\new_zip_extracted'
os.makedirs(out_dir, exist_ok=True)

with zipfile.ZipFile(zip_path, 'r') as z:
    names = z.namelist()
    print(f'Total files in zip: {len(names)}')
    for n in names[:100]:
        print(' -', n)
    if len(names) > 100:
        print(f' ... and {len(names) - 100} more')
    z.extractall(out_dir)
print('Extracted successfully!')

