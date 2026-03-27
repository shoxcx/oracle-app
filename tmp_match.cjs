const { app, BrowserWindow } = require('electron');
app.whenReady().then(async () => {
    const win = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: false, contextIsolation: true } });
    await win.loadURL('https://www.leagueofgraphs.com/match/euw/7800465571');
    const html = await win.webContents.executeJavaScript(`
        document.body.innerHTML
    `);
    require('fs').writeFileSync('tmp_match.html', html, 'utf8');
    app.quit();
});
