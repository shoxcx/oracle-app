import urllib.request
import json
url = 'https://esports-api.lolesports.com/persisted/gw/getPowerRankings?hl=en-US'
req = urllib.request.Request(url, headers={'x-api-key': '0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z'})
try:
    with urllib.request.urlopen(req) as response:
        print(response.read().decode())
except Exception as e:
    print(e)
