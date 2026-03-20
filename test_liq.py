import urllib.request
import re

url = 'https://liquipedia.net/leagueoflegends/LCK/2026/Winter'
req = urllib.request.Request(url, headers={'User-Agent': 'OracleTracker/1.0'})
try:
    html = urllib.request.urlopen(req).read().decode('utf-8')
    rows = re.findall(r'<tr class="toggle-area".*?>.*?</tr>', html, re.DOTALL)
    for r in rows:
        team_m = re.search(r'data-highlightingclass="([^"]+)"', r)
        score_m = re.search(r'<b>(\d+)</b> - <b>(\d+)</b>', r)
        if team_m and score_m:
            print(f"Team: {team_m.group(1)}, Score: {score_m.group(1)}-{score_m.group(2)}")
except Exception as e:
    print(e)
