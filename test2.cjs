const { app, BrowserWindow } = require('electron');

app.whenReady().then(async () => {
    let win = new BrowserWindow({show: true, webPreferences: { contextIsolation: true }});
    await win.loadURL('https://lolesports.com/en-GB/schedule?leagues=lec,lck,lpl,lcs');
    await new Promise(r => setTimeout(r, 6000));
    try {
        const data = await win.webContents.executeJavaScript(`
            (function() {
                try {
                    const matchBlocks = Array.from(document.querySelectorAll('.EventMatch, .match-row, a[href*="/live/"], a[href*="/vods/"], .single-match, .match-block, a[class*="EventMatch"]'));
                    if (matchBlocks.length === 0) return { error: "No match blocks found with selectors." };

                    const results = [];
                    for (const block of matchBlocks) {
                        const text = block.innerText || "";
                        if (!text) continue;

                        const teamEls = block.querySelectorAll('.team-name, .name, [class*="team"]');
                        const timeEl = block.querySelectorAll('.time, .match-time, [class*="time"], [class*="Hour"]');
                        const statusEl = block.querySelectorAll('.status, .match-status, [class*="status"]');
                        const leagueEl = block.querySelectorAll('.league-name, .league, [class*="league"]');
                        const imgEls = block.querySelectorAll('img');

                        let t1 = teamEls[0] ? teamEls[0].innerText.trim() : "TBD";
                        let t2 = teamEls[1] ? teamEls[1].innerText.trim() : "TBD";

                        // fallback if team els are not explicitly class tagged
                        if (t1 === "TBD" || t2 === "TBD") {
                            const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length > 0);
                            if (lines.length >= 3) {
                                // heuristically finding teams inside block text
                            }
                        }

                        results.push({
                            textSnapshot: text.replace(/\\n/g, ' | '),
                            hasImages: imgEls.length,
                            t1, t2
                        });
                    }

                    return results.slice(0, 5);
                } catch(e) {
                    return [{error: e.message}];
                }
            })();
        `);
        console.log("MATCH BLOCKS:");
        console.log(data);
    } catch(e) {
        console.error(e);
    }
    app.quit();
});
