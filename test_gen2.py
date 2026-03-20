import urllib.request
import re

url = 'https://gol.gg/teams/list/season-S16/split-Winter/tournament-ALL/'
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    rows = re.findall(r'<tr.*?>.*?</tr>', html, re.DOTALL)
    for r in rows:
        if 'Gen.G' in r:
            tds = re.findall(r'<td.*?>(.*?)</td>', r, re.DOTALL)
            print([re.sub(r'<[^>]+>', '', t).strip() for t in tds])
except Exception as e:
    print(e)
