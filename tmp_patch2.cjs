const fs = require('fs');
let c = fs.readFileSync('electron_app/scraper.cjs', 'utf8');

// Replace the URL match and matchUrl returning part
const search = `                            const matchBtn = row.querySelector('a.seeMatchButton') || row.querySelector('a[href*="/match/"]');
                            let matchUrl = "";
                            let realGameId = 2000000 + idx;
                            if (matchBtn && matchBtn.href) {
                                matchUrl = matchBtn.href;
                                const m = matchBtn.href.match(/match\\/[^\\/]+\\/(\\d+)/);
                                if (m) realGameId = parseInt(m[1]);
                            }
                            const gameId = realGameId;`;

// But since the actual string in scraper.cjs might have /match\\/[^\\/]+\\/(\\d+)/ or /match/[^/]+/(d+)/
// Let's just string match it safely.
c = c.replace(/                            const matchBtn = row\.querySelector\('a\.seeMatchButton'\) \|\| row\.querySelector\('a\[href\*=\"\/match\/\"\]'\);\r?\n                            let matchUrl = \"\";\r?\n                            let realGameId = 2000000 \+ idx;\r?\n                            if \(matchBtn && matchBtn\.href\) \{\r?\n                                matchUrl = matchBtn\.href;\r?\n                                const m = matchBtn\.href\.match\(.*\);\r?\n                                if \(m\) realGameId = parseInt\(m\[1\]\);\r?\n                            \}\r?\n                            const gameId = realGameId;/m, 
`                            const matchBtn = row.querySelector('a.seeMatchButton') || row.querySelector('a[href*="/match/"]');
                            let matchUrl = "";
                            let realGameId = 2000000 + idx;
                            if (matchBtn && matchBtn.href) {
                                matchUrl = matchBtn.href;
                                try {
                                    const splitMatch = matchUrl.split('match/')[1].split('/');
                                    if (splitMatch[1]) {
                                        const parsedId = parseInt(splitMatch[1].split('#')[0]);
                                        if (!isNaN(parsedId)) realGameId = parsedId;
                                    }
                                } catch(e) {}
                            }
                            const gameId = realGameId;`);

const searchReturn1 = `                            return {
                                gameId,
                                lpChange,`;

const searchReturn2 = `                            return {
                                matchUrl,
                                gameId,
                                lpChange,`;

if (!c.includes(searchReturn2)) {
    c = c.replace(searchReturn1, searchReturn2);
}

fs.writeFileSync('electron_app/scraper.cjs', c);
