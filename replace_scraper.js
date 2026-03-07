const fs = require('fs');

let f = fs.readFileSync('electron_app/scraper.cjs', 'utf8');
const startTag = 'const clean = t => t ? t.innerText.trim() : "";';
const endTag = 'return results.slice(0, 50);';

const startIndex = f.indexOf(startTag);
const endIndex = f.indexOf(endTag, startIndex);

if (startIndex === -1 || endIndex === -1) {
    console.log("Could not find start/end tags");
    process.exit(1);
}

const replacement = `const results = [];
                        const text = document.body ? document.body.innerText || "" : "";
                        const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
                        
                        const matchRegex = /\\b(Bo1|Bo3|Bo5|Bo7)\\b/;
                        const leagueRegex = /(LCK|LEC|LCS|LPL|MSI|Worlds).*?(Playoffs|Groups|Split|Final|Stand)/i;
                        const dateRegex = /(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday|Today|Tomorrow|Yesterday|\\d{1,2}\\s+[A-Za-z]{3})/i;
                        
                        const seenMatches = new Set();
                        let currentDate = "Upcoming";
                        
                        for (let i = 0; i < lines.length; i++) {
                            const l = lines[i];
                            
                            // Handling Windows CP1252 weird characters by filtering generic format
                            if (dateRegex.test(l) && !l.includes('ÔÇó') && l.length < 30) {
                                currentDate = l.replace(/Load More|Earlier Today/ig, '').trim();
                                if (!currentDate) currentDate = "Today";
                            }
                            
                            if (matchRegex.test(l)) {
                                let t1 = "TBD", t2 = "TBD";
                                let leaguePart = l;
                                let idx = i;
                                
                                let lookback = 1;
                                let possibleTeams = [];
                                while (lookback <= 4 && (idx - lookback) >= 0) {
                                    const prevLine = lines[idx - lookback];
                                    if (!prevLine || dateRegex.test(prevLine)) break;
                                    
                                    if (leagueRegex.test(prevLine)) {
                                        leaguePart = prevLine;
                                    } else if (prevLine !== 'CLICK TO REVEAL' && prevLine !== 'DNS' && prevLine !== 'Load More') {
                                        possibleTeams.push(prevLine);
                                    }
                                    lookback++;
                                }
                                
                                if (possibleTeams.length >= 2) {
                                    t1 = possibleTeams[1];
                                    t2 = possibleTeams[0];
                                }
                                
                                let time = "TBD";
                                
                                if (t1 === "TBD" || t2 === "TBD") continue;
                                if (t1 === t2) continue;
                                if (t1.includes("Load More") || t2.includes("Load More")) continue;
                                
                                let isPastMatch = false;
                                if (currentDate.match(/Yesterday/i) || currentDate === "Earlier Today") isPastMatch = true;
                                
                                if (isPastMatch) continue;
                                
                                const matchKey = (t1 + t2).toLowerCase();
                                if (seenMatches.has(matchKey)) continue;
                                seenMatches.add(matchKey);

                                let parsedLeague = "LOL";
                                const mLeague = leaguePart.match(/LEC|LCK|LPL|LCS|LCP|VCS|PCS|LLA|CBLOL|Worlds|MSI|Stand/i);
                                if (mLeague) parsedLeague = mLeague[0].toUpperCase();
                                if (parsedLeague === "STAND") parsedLeague = "INTL";

                                results.push({
                                    team1: t1.toUpperCase(), 
                                    team2: t2.toUpperCase(),
                                    time: time === "TBD" ? null : time,
                                    date: currentDate,
                                    league: parsedLeague,
                                    url: "https://lolesports.com/schedule",
                                    logo1: null, 
                                    logo2: null
                                });
                            }
                        }

                        return results.slice(0, 50);`;

const newF = f.substring(0, startIndex) + replacement + f.substring(endIndex + endTag.length);
fs.writeFileSync('electron_app/scraper.cjs', newF);
console.log("Successfully replaced");
