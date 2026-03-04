const scraper = require('./electron_app/scraper.cjs');
const { app } = require('electron');
const fs = require('fs');
app.on('ready', async () => {
    try {
        scraper.dataCache.clear();
        const data = await scraper.runBrowserTask('https://lolesports.com/schedule?leagues=lec,lck,lpl,lcs', async (win) => {
            await scraper.waitForSelector(win, 'body');
            await new Promise(r => setTimeout(r, 6000));
            return await win.webContents.executeJavaScript(`
            (() => {
                const results = [];
                let els = Array.from(document.querySelectorAll('*'));
                let indicators = els.filter(el => {
                    let t = el.innerText ? el.innerText.trim() : "";
                    return t === "Bo1" || t === "Bo3" || t === "Bo5" || t === "LIVE";
                });
                indicators.forEach(ind => {
                    let container = ind;
                    let limit = 8;
                    while(container && limit > 0) {
                        if (container.innerText.length > 30 && container.innerText.length < 600) {
                            if (container.innerText.match(/\\d{1,2}:\\d{2}/) || container.querySelectorAll('img').length >= 1) break;
                        }
                        container = container.parentElement;
                        limit--;
                    }
                    if (!container) { results.push({reason: "no container", html: ind.outerHTML}); return; }

                    const text = container.innerText || "";
                    if (text.match(/\\bFINAL\\b/i) && !text.match(/\\bFINALS\\b/i)) { results.push({reason: "FINAL", text}); return; }
                    if (text.toUpperCase().includes('VOD')) { results.push({reason: "VOD", text}); return; }
                    if (text.match(/(^|\\n)\\s*[0-5]\\s*-\\s*[0-5]\\s*($|\\n)/)) { results.push({reason: "SCORE", text}); return; }
                    if (!text.toUpperCase().includes('LIVE') && !text.match(/\\d{1,2}:\\d{2}/)) { results.push({reason: "NO_TIME", text}); return; }

                    const lines = text.split('\\n').map(l => l.trim()).filter(l => l.length >= 2 && l.length < 30);
                    const textTeams = lines.filter(l => 
                        !l.match(/LEC|LCK|LPL|LCS|Bo\\d|Today|Tomorrow|Match|Score|LIVE|\\d{1,2}:\\d{2}/i) &&
                        !l.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/i) &&
                        !l.includes(' - ') &&
                        l.toUpperCase() !== 'TBD' &&
                        !l.toUpperCase().includes('CLICK') &&
                        !l.toUpperCase().includes('REVEAL') &&
                        !l.toUpperCase().includes('REGIONS') &&
                        !l.toUpperCase().includes('SPLIT') &&
                        !l.toUpperCase().includes('PLAYOFFS') &&
                        !l.toUpperCase().includes('FINALS') &&
                        !l.toUpperCase().includes('ROUND') &&
                        !l.toUpperCase().includes('SEASON') &&
                        !l.toUpperCase().includes('INTERNATIONAL') &&
                        l.toUpperCase() !== 'UPCOMING'
                    );

                    const imgs = Array.from(container.querySelectorAll('img'));
                    if (imgs.length >= 2) {
                        results.push({reason: "KEPT", text, t1: imgs[0].src, t2: imgs[1].src});
                    } else {
                        results.push({reason: "NOT_ENOUGH_IMG", text});
                    }
                });
                return results;
            })();
        `);
        });
        fs.writeFileSync('test_scraper_debug.json', JSON.stringify(data, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        app.quit();
    }
});
