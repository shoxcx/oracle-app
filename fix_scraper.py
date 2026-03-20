import re

with open('electron_app/scraper.cjs', 'r', encoding='utf-8') as f:
    content = f.read()

new_scraper = """async getEsportsRankings() {
        const cacheKey = 'esports_rankings_v15_dynamic';
        const cached = this.getCachedData(cacheKey, 3600000); // 1 hour
        if (cached) return cached;
        const url = 'https://gol.gg/teams/list/season-S16/split-Winter/tournament-ALL/';
        console.log(`[Scraper] Fetching esports rankings from ${url}`);

        const result = await this.runBrowserTask(url, async (win) => {
            try {
                // Wait for the JS table to inject
                await new Promise(r => setTimeout(r, 2000));
                
                const data = await win.webContents.executeJavaScript(`
                    (() => {
                        try {
                            const rows = Array.from(document.querySelectorAll('table tbody tr'));
                            return rows.map(tr => {
                                const tds = tr.querySelectorAll('td');
                                if (tds.length < 5) return null;
                                
                                const name = tds[0].innerText.trim();
                                const league = tds[2].innerText.trim();
                                const gamesStr = tds[3].innerText.trim();
                                const games = parseInt(gamesStr) || 0;
                                const winrateStr = tds[4].innerText.trim().replace('%', '');
                                const winrate = parseFloat(winrateStr) || 0;
                                
                                if (games < 2) return null;
                                
                                const wins = Math.round(games * (winrate / 100));
                                const losses = games - wins;
                                
                                let bonus = 0;
                                if (league === 'LCK' || league === 'LPL') bonus = 300;
                                else if (league === 'LEC' || league === 'LCS' || league === 'LCP') bonus = 150;
                                
                                const pointsNum = Math.round((winrate * 14) + (wins * 6) + bonus);
                                
                                return {
                                    name,
                                    fullName: name,
                                    league,
                                    wins,
                                    losses,
                                    pointsNum
                                };
                            }).filter(t => t !== null && t.pointsNum > 0)
                              .sort((a,b) => b.pointsNum - a.pointsNum)
                              .slice(0, 30)
                              .map((t, i) => ({
                                rank: i + 1,
                                name: t.name,
                                fullName: t.fullName,
                                league: t.league,
                                wins: t.wins,
                                losses: t.losses,
                                points: t.pointsNum + ' pts'
                              }));
                        } catch(err) {
                            return [];
                        }
                    })();
                `);
                return data;
            } catch (e) {
                console.error("[Scraper] Esports rankings failed:", e.message);
                return [];
            }
        });

        if (result && result.length > 0) this.setCachedData(cacheKey, result);
        return result || [];
    }"""

content = re.sub(r'async getEsportsRankings\(\) \{.*?return result \|\| \[\];\s*\}', new_scraper, content, flags=re.DOTALL)

with open('electron_app/scraper.cjs', 'w', encoding='utf-8') as f:
    f.write(content)
print("Scraper ranking script injected!")
