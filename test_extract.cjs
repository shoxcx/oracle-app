const { app, BrowserWindow } = require('electron');
const fs = require('fs');
app.whenReady().then(async () => {
    const win = new BrowserWindow({show: false});
    await win.loadURL('https://www.leagueofgraphs.com/summoner/euw/Can10-0511');
    try {
        const data = await win.webContents.executeJavaScript(`
            (() => {
                let rows = Array.from(document.querySelectorAll('.recentGamesTable tbody tr'));
                let row = rows.filter(r => r.querySelector('.kills'))[0];
                const columns = Array.from(row.querySelectorAll('.summonersTdLight .summoners > div.summonerColumn'));
                let res = [];
                columns[0].querySelectorAll('.img-align-block-right, .img-align-block, .selected, :scope > a').forEach(el => {
                    res.push(el.outerHTML);
                });
                return res;
            })()
        `);
        fs.writeFileSync('output_img.txt', JSON.stringify(data, null, 2));
    } catch(e) {}
    app.quit();
});
