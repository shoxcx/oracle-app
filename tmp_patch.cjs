const fs = require('fs');
let c = fs.readFileSync('electron_app/scraper.cjs', 'utf8');

const injection = `
    async getExternalMatchDetails(matchUrl) {
        if (!matchUrl || !matchUrl.includes('leagueofgraphs.com/match')) return null;
        console.log(\`[Scraper] Fetching Match Details from: \${matchUrl}\`);
        
        return this.runBrowserTask(matchUrl, async (win) => {
            const hasTable = await this.waitForSelector(win, '.matchTable', 10000);
            if (hasTable !== 'READY') return null;

            return await win.webContents.executeJavaScript(\`
                (async () => {
                    try {
                        const clean = t => t ? t.innerText.trim() : "";
                        const getNumber = t => parseFloat(clean(t).replace(/,/g, '')) || 0;
                        const extractId = str => { const m = (str||"").match(/\\\\d+/); return m ? parseInt(m[0]) : 0; };
                        
                        const parsedPlayers = [];
                        let pIndex = 1;
                        
                        document.querySelectorAll('.matchTable tbody tr').forEach(row => {
                            const nameLink = row.querySelector('.name a') || row.querySelector('.name');
                            if (!nameLink) return;
                            
                            const teamBlock = row.closest('.matchTable');
                            const teamId = (teamBlock && teamBlock.classList.contains('team200') || row.querySelector('.victoryDefeatText.defeat')) ? 200 : 100;

                            const pName = clean(nameLink);
                            let puuid = "ext~" + encodeURIComponent(pName);
                            
                            const classNames = row.className || "";
                            let position = "UTILITY";
                            if(classNames.includes('role-1')) position = "TOP";
                            if(classNames.includes('role-2')) position = "JUNGLE";
                            if(classNames.includes('role-3')) position = "MIDDLE";
                            if(classNames.includes('role-4')) position = "BOTTOM";

                            const champImg = row.querySelector('.championCell img');
                            const championName = champImg ? (champImg.getAttribute('title') || champImg.alt) : "Unknown";
                            let championId = 0;
                            if (champImg && champImg.className) {
                                const m = champImg.className.match(/champion-(\\\\d+)/);
                                if (m) championId = parseInt(m[1]);
                            }

                            const kdaEl = row.querySelector('.kda');
                            const kills = kdaEl ? getNumber(kdaEl.querySelector('.kills')) : 0;
                            const deaths = kdaEl ? getNumber(kdaEl.querySelector('.deaths')) : 0;
                            const assists = kdaEl ? getNumber(kdaEl.querySelector('.assists')) : 0;
                            
                            let spell1Id = 0, spell2Id = 0, perk0 = 0, perkSubStyle = 0;
                            const spells = Array.from(row.querySelectorAll('.championCell .spells img, .perks img, .perk img'));
                            spells.forEach(img => {
                                const cls = img.className || "";
                                if (cls.includes('spell-')) {
                                    if(!spell1Id) spell1Id = extractId(cls.split('spell-')[1]);
                                    else if(!spell2Id) spell2Id = extractId(cls.split('spell-')[1]);
                                }
                                if (cls.includes('perk-')) {
                                    if(!perk0) perk0 = extractId(cls.split('perk-')[1]);
                                    else if(!perkSubStyle) perkSubStyle = extractId(cls.split('perk-')[1]);
                                }
                            });
                            
                            const items = Array.from(row.querySelectorAll('.itemsColumn img')).map(img => {
                                const m = (img.className || "").match(/item-(\\\\d+)/);
                                return m ? parseInt(m[1]) : 0;
                            }).filter(x => x > 0);
                            for(let i=0; i<7; i++) { if(!items[i]) items[i] = 0; }
                            
                            const csDiv = Array.from(row.querySelectorAll('.kdaCell .cs')).find(el => clean(el).includes('CS')) || row.querySelector('div[tooltip*="Minions:"]');
                            let totalMinionsKilled = 0, neutralMinionsKilled = 0;
                            if (csDiv) {
                                const csText = clean(csDiv);
                                const csMatch = csText.match(/(\\\\d+)/);
                                if (csMatch) totalMinionsKilled = parseInt(csMatch[1]);
                            }

                            parsedPlayers.push({
                                participantId: pIndex++,
                                teamId: teamId,
                                championId: championId,
                                championName: championName,
                                puuid: puuid,
                                summonerName: pName,
                                teamPosition: position,
                                timeline: { lane: position, role: "" },
                                spell1Id,
                                spell2Id,
                                stats: {
                                    win: teamId === 100 ? !hasTable.includes('defeat') : hasTable.includes('defeat'),
                                    kills, deaths, assists, totalMinionsKilled, neutralMinionsKilled,
                                    perk0, perkSubStyle,
                                    item0: items[0], item1: items[1], item2: items[2], item3: items[3], item4: items[4], item5: items[5], item6: items[6]
                                }
                            });
                        });
                        return { participants: parsedPlayers, participantIdentities: parsedPlayers.map(p => ({ participantId: p.participantId, player: { summonerName: p.summonerName, puuid: p.puuid } })) };
                    } catch(e) { return null; }
                })();
            \`);
        });
    }

    async getRankHistory`;

c = c.replace(/    \}\r?\n    async getRankHistory/, '    }\n' + injection);
fs.writeFileSync('electron_app/scraper.cjs', c);
