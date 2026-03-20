import urllib.request
import json
teams = ['Kwangdong_Freecs', 'Team_BDS', 'Fnatic', 'PSG_Talon']
for t in teams:
    r = urllib.request.Request(f'https://lol.fandom.com/api.php?action=query&prop=imageinfo&iiprop=url&titles=File:{t}logo_square.png&format=json', headers={'User-Agent':'Mozilla/5.0'})
    try:
        pages = json.loads(urllib.request.urlopen(r).read().decode())['query']['pages']
        page = list(pages.values())[0]
        if 'imageinfo' in page:
            print(f"'{t.lower()[:3]}': '{page['imageinfo'][0]['url']}',")
        else:
            print(f"Failed {t}: No imageinfo")
    except Exception as e:
        print(f"Failed {t}: {e}")
