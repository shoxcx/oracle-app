import re
content = open('test_gol.html', encoding='utf-8').read()
rows = re.findall(r'<tr.*?>.*?</tr>', content, re.DOTALL)
for r in rows:
    if 'Gen.G' in r:
        tds = re.findall(r'<td.*?>(.*?)</td>', r, re.DOTALL)
        print([re.sub(r'<[^>]+>', '', t).strip() for t in tds])
