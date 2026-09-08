import re

mock_data_path = "/Users/mehedihasanmridul/website/Bangla-store/src/data/mockData.ts"

with open(mock_data_path, "r") as f:
    content = f.read()

# Replace image: '/images/Dolly's...' with image: "/images/Dolly's..."
def quote_fixer(match):
    # Match: image: '...'
    val = match.group(1)
    # If there's an unescaped single quote inside the value, it's a problem
    # Actually, the string in the file currently looks like: image: '/images/Dolly's Recipe Ruchi Pickle- Boroi.jpeg'
    # The regex r"image:\s*'([^']+)'" won't match the whole thing because of the quote in Dolly's!
    # Instead, let's just find lines that have `image: '` and replace the outer quotes with `"`
    pass

new_lines = []
for line in content.split('\n'):
    if "image: '/images/Dolly's" in line:
        line = line.replace("image: '/images/Dolly's", 'image: "/images/Dolly\'s')
        # Also need to replace the ending quote.
        # But wait, the ending quote is just before `, category:`
        # E.g. `image: "/images/Dolly's Recipe Ruchi Pickle- Boroi.jpeg', category:`
        line = line.replace(".jpeg', category:", '.jpeg", category:')
    new_lines.append(line)

with open(mock_data_path, "w") as f:
    f.write('\n'.join(new_lines))
