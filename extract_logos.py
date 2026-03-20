import re
html = open('test_gol.html', encoding='utf-8').read()
rows = re.findall(r'<tr[^>]*>(.*?)</tr>', html, re.DOTALL)
for row in rows:
    name_m = re.search(r'<td[^>]*>(.*?)</td>', row, re.DOTALL)
    if not name_m: continue
    name = re.sub(r'<[^>]+>', '', name_m.group(1)).strip()
    if name in ['Fnatic', 'Team BDS', 'Kwangdong Freecs', 'PSG Talon', 'Team Liquid']:
        img_m = re.search(r'<img[^>]+src=[\'"]([^\'"]+)[\'"]', row, re.IGNORECASE)
        if img_m:
            path = img_m.group(1)
            # Remove leading doc dots if any: ../../storage -> /storage
            path = re.sub(r'^\.*', '', path)
            print(f"{name}: https://gol.gg{path}")
