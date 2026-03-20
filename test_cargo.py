import urllib.request
import json
import urllib.parse

# We use Cargo Query to get recent match results or standings
url = 'https://lol.fandom.com/api.php?action=cargoquery&tables=TournamentResults,Tournaments&join_on=TournamentResults.OverviewPage=Tournaments.OverviewPage&fields=TournamentResults.Team,TournamentResults.Place,Tournaments.League,Tournaments.Name&where=Tournaments.DateStart%3E%3D%222026-01-01%22%20AND%20Tournaments.League%20IN%20(%22LEC%22,%22LCK%22,%22LCS%22,%22LPL%22)&limit=50&format=json'

req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})

try:
    with urllib.request.urlopen(req) as response:
        data = json.loads(response.read().decode())
        print(json.dumps(data, indent=2))
except Exception as e:
    print(e)
