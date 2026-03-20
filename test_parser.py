from html.parser import HTMLParser

class GOLParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.in_tr = False
        self.in_td = False
        self.current_row = []
        self.rows = []
    
    def handle_starttag(self, tag, attrs):
        if tag == 'tr':
            self.in_tr = True
            self.current_row = []
        elif tag == 'td' and self.in_tr:
            self.in_td = True

    def handle_data(self, data):
        if self.in_td:
            self.current_row.append(data.strip())

    def handle_endtag(self, tag):
        if tag == 'td':
            self.in_td = False
        elif tag == 'tr':
            self.in_tr = False
            if self.current_row:
                self.rows.append([x for x in self.current_row if x])

p = GOLParser()
with open('test_gol.html', encoding='utf-8') as f:
    p.feed(f.read())

for r in p.rows[1:10]:
    print(r)
