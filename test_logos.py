import re
html = open('test_gol.html', encoding='utf-8').read()
for tm in ['Kwangdong', 'BDS', 'Fnatic', 'Liquid']:
    m = re.search(r'<tr[^>]*>.*?<img[^>]*src=[\'"]([^\'"]*)[\'"][^>]*>.*?'+tm+'.*?</tr>', html, re.DOTALL|re.IGNORECASE)
    if m:
        print(f"{tm}: https://gol.gg{m.group(1).lstrip('.')}")
