const scraper = require('./electron_app/scraper.cjs');
const { app } = require('electron');

app.on('ready', async () => {
    try {
        const url = 'https://u.gg/lol/champions/ahri/build/mid';
        const data = await scraper.runBrowserTask(url, async (win) => {
            await scraper.waitForSelector(win, 'body');
            return await win.webContents.executeJavaScript(`
                (()=>{
                    let str = document.documentElement.innerHTML;
                    let start = str.indexOf('__SSR_DATA__ = {');
                    if (start === -1) start = str.indexOf('window.__SSR_DATA__ = {');
                    if (start === -1) return "NO MATCH";
                    
                    start = str.indexOf('{', start);
                    
                    let braceCount = 0;
                    let end = -1;
                    let inString = false;
                    let escape = false;

                    for(let i=start; i<str.length; i++) {
                        let c = str[i];
                        if (escape) {
                            escape = false;
                            continue;
                        }
                        if (c === '\\\\') {
                            escape = true;
                            continue;
                        }
                        if (c === '"') {
                            inString = !inString;
                            continue;
                        }

                        if (!inString) {
                            if (c === '{') braceCount++;
                            else if (c === '}') {
                                braceCount--;
                                if (braceCount === 0) {
                                    end = i + 1;
                                    break;
                                }
                            }
                        }
                    }

                    if (end === -1) return "NO END FOUND";
                    let jsonStr = str.substring(start, end);

                    try {
                        const ssr = JSON.parse(jsonStr);
                        const key = Object.keys(ssr).find(k => k.includes('overview') && k.includes('world') && k.includes('recommended'));
                        if (!key || !ssr[key]?.data) return "NO DATA in key";
                        const buildObj = ssr[key].data;
                        const build = Object.values(buildObj)[0];
                        return {
                            skill_path: build.rec_skill_path?.slots,
                            skills: build.rec_skills?.slots
                        };
                    } catch(e) {
                        return "PARSE ERROR: " + e;
                    }
                })()
            `);
        });
        console.log("ACTUAL DATA:", data ? JSON.stringify(data) : 'null');
    } catch (e) { console.error(e) }
    finally { app.quit() }
});
