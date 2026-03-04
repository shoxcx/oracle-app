const scraper = require('./electron_app/scraper.cjs');
const { app } = require('electron');
app.on('ready', async () => {
    try {
        const data = await scraper.runBrowserTask('https://lolesports.com/schedule?leagues=lec,lck,lpl,lcs', async (win) => {
            await scraper.waitForSelector(win, 'body');
            await new Promise(r => setTimeout(r, 6000));
            return await win.webContents.executeJavaScript(`
        (() => {
          let els = Array.from(document.querySelectorAll('*'));
          let indicators = els.filter(el => {
            let t = el.innerText ? el.innerText.trim() : "";
            return t === "Bo1" || t === "Bo3" || t === "Bo5" || t === "LIVE" || t === "VOD";
          });
          const res = indicators.map(ind => {
            let container = ind;
            let limit = 8;
            while(container && limit > 0) {
                if (container.innerText.length > 30 && container.innerText.length < 600) {
                    if (container.innerText.match(/\\d{1,2}:\\d{2}/) || container.querySelectorAll('img').length >= 1) {
                        break;
                    }
                }
                container = container.parentElement;
                limit--;
            }
            if(!container) return null;
            return {
                text: container.innerText.replace(/\\n/g, '|'),
                hasTime: !!container.innerText.match(/\\d{1,2}:\\d{2}/)
            };
          }).filter(x => x);
          return res;
        })()
      `);
        });
        console.log("Upcoming matches only: ");
        console.log(JSON.stringify(data.filter(x => x.hasTime), null, 2));

        console.log("Matches without time (likely finished with hidden spoilers): ");
        console.log(JSON.stringify(data.filter(x => !x.hasTime), null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        app.quit();
    }
});
