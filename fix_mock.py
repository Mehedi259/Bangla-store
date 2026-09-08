import re

mock_data_path = "/Users/mehedihasanmridul/website/Bangla-store/src/data/mockData.ts"

with open(mock_data_path, "r") as f:
    content = f.read()

def replacer(match):
    pid = match.group(1)
    pname = match.group(2)
    if pid.startswith('p') and pid[1:].isdigit() and int(pid[1:]) >= 54:
        safe_name = re.sub(r'[^a-zA-Z0-9]', '_', pname)
        new_image = f"/images/{safe_name}.jpg"
        return match.group(0).replace("'/images/placeholder.jpg'", f"'{new_image}'")
    return match.group(0)

pattern = re.compile(r"(id:\s*'([^']+)',\s*name:\s*'([^']+)',.*?image:\s*)'([^']+)'")
new_content = pattern.sub(lambda m: m.group(0).replace("'/images/placeholder.jpg'", f"'/images/{re.sub(r'[^a-zA-Z0-9]', '_', m.group(3))}.jpg'") if m.group(2).startswith('p') and m.group(2)[1:].isdigit() and int(m.group(2)[1:]) >= 54 else m.group(0), content)

with open(mock_data_path, "w") as f:
    f.write(new_content)
