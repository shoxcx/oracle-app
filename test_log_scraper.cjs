const { BrowserWindow, app } = require('electron');

app.whenReady().then(async () => {
    const win = new BrowserWindow({ show: false, width: 1000, height: 800 });
    await win.loadURL('https://www.leagueofgraphs.com/summoner/euw/Ireliass-0777');
    await new Promise(r => setTimeout(r, 2000));

    const lpData = await win.webContents.executeJavaScript(`
        (() => {
            const rows = Array.from(document.querySelectorAll('.recentGamesTable tbody tr')).slice(0, 10);
            return rows.map((row) => {
                const lpSpan = Array.from(row.querySelectorAll('span, div')).find(el => el.innerText && el.innerText.includes('LP'));
                let lpChange = null;
                if(lpSpan) {
                    const clean = t => t ? t.innerText.trim() : "";
                    const m = clean(lpSpan).match(/([+-]?\\d+)\\s*LP/i);
                    if(m) lpChange = m[0];
                }
                const html = row.innerHTML;
                return { lpChange, htmlPreview: html.substring(0, 200) };
            });
        })()
    `);

    console.log(JSON.stringify(lpData, null, 2));
    app.quit();
});
