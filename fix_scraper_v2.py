import re

with open('electron_app/scraper.cjs', 'r', encoding='utf-8') as f:
    content = f.read()

new_scraper = """async getEsportsRankings() {
        const cacheKey = 'esports_rankings_v16_dynamic';
        const cached = this.getCachedData(cacheKey, 3600000); // 1 hour
        if (cached) return cached;
        const url = 'https://gol.gg/teams/list/season-S16/split-Winter/tournament-ALL/';
        console.log(`[Scraper] Fetching esports rankings from ${url}`);

        const result = await this.runBrowserTask(url, async (win) => {
            try {
                await new Promise(r => setTimeout(r, 2000));
                
                const data = await win.webContents.executeJavaScript(`
                    (() => {
                        try {
                            const ACRO_MAP = {
                                "Gen.G eSports": "GEN",
                                "T1": "T1",
                                "Bilibili Gaming": "BLG",
                                "Hanwha Life eSports": "HLE",
                                "Dplus KIA": "DK",
                                "Top Esports": "TES",
                                "G2 Esports": "G2",
                                "Weibo Gaming": "WBG",
                                "KT Rolster": "KT",
                                "LNG Esports": "LNG",
                                "Team Liquid": "TL",
                                "Team BDS": "BDS",
                                "Ninjas in Pyjamas": "NIP",
                                "Shenzhen NINJAS IN PYJAMAS": "NIP",
                                "Kwangdong Freecs": "KDF",
                                "Fnatic": "FNC",
                                "Cloud9": "C9",
                                "FlyQuest": "FLY",
                                "JD Gaming": "JDG",
                                "Team Heretics": "TH",
                                "MAD Lions KOI": "MKOI",
                                "Movistar KOI": "MKOI",
                                "Anyone's Legend": "AL",
                                "LGD Gaming": "LGD",
                                "OMG": "OMG",
                                "Rogue": "RGE",
                                "GiantX": "GX",
                                "GIANTX": "GX",
                                "Karmine Corp": "KC",
                                "Team Vitality": "VIT",
                                "PSG Talon": "PSG",
                                "GAM Esports": "GAM",
                                "LOUD": "LLL",
                                "FearX": "FOX",
                                "DRX": "DRX",
                                "OK BRO": "BRO",
                                "Nongshim RedForce": "NS",
                                "Team WE": "WE",
                                "Anyone\\'s Legend": "AL",
                                "FunPlus Phoenix": "FPX",
                                "Edward Gaming": "EDG",
                                "Rare Atom": "RA",
                                "Royal Never Give Up": "RNG",
                                "ThunderTalk Gaming": "TT",
                                "Ultra Prime": "UP",
                                "Invictus Gaming": "IG",
                                "SK Gaming": "SK",
                                "100 Thieves": "100",
                                "Shopify Rebellion": "SR",
                                "Dignitas": "DIG",
                                "Immortals": "IMT",
                                "NRG": "NRG",
                                "Chiefs Esports Club": "CHF",
                                "Fukuoka SoftBank HAWKS gaming": "SHG",
                                "CTBC Flying Oyster": "CFO",
                                "Frank Esports": "FAK"
                            };

                            const rows = Array.from(document.querySelectorAll('table tbody tr'));
                            return rows.map(tr => {
                                const tds = tr.querySelectorAll('td');
                                if (tds.length < 5) return null;
                                
                                const fullName = tds[0].innerText.trim();
                                const league = tds[2].innerText.trim();
                                const games = parseInt(tds[3].innerText.trim()) || 0;
                                const winrate = parseFloat(tds[4].innerText.trim().replace('%', '')) || 0;
                                
                                if (games < 2) return null;
                                
                                // Only allow major leagues to match Riot's Global Power Rankings scope
                                if (!['LCK', 'LPL', 'LCS', 'LEC', 'LCP'].includes(league)) return null;
                                
                                const wins = Math.round(games * (winrate / 100));
                                const losses = games - wins;
                                
                                let bonus = 0;
                                if (league === 'LCK' || league === 'LPL') {
                                    bonus = 500;
                                } else if (league === 'LEC' || league === 'LCS' || league === 'LCP') {
                                    bonus = 250;
                                }
                                
                                // Winrate is heavily rewarded, plus wins volume, plus strict regional bonus
                                const pointsNum = Math.round((winrate * 12) + (wins * 8) + bonus);
                                
                                // IMPORTANT: Use mapped acronym for icon matching! Fallback to full name if unknown.
                                const name = ACRO_MAP[fullName] || fullName;
                                
                                return {
                                    name,
                                    fullName,
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
print("Scraper ranking script injected with ACRO_MAP!")
