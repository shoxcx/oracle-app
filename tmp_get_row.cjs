const { app, BrowserWindow } = require('electron');
app.whenReady().then(async () => {
    const win = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: false, contextIsolation: true } });
    await win.loadURL('https://www.leagueofgraphs.com/summoner/euw/Seagull-zuzu');
    const html = await win.webContents.executeJavaScript(`
        const rows = Array.from(document.querySelectorAll('.recentGamesTable tbody tr'));
        const valid = rows.filter(r => r.querySelector('.kills') && r.querySelector('.deaths'));
        valid.length > 0 ? valid[0].outerHTML : 'no table';
    `);
    require('fs').writeFileSync('tmp_row.html', html, 'utf8');
    app.quit();
});
