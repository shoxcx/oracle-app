const { app, BrowserWindow } = require('electron');
const fs = require('fs');

app.whenReady().then(async () => {
    let win = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: false, contextIsolation: true } });
    await win.loadURL('https://www.leagueofgraphs.com/summoner/euw/Ireliass-0777');
    await new Promise(r => setTimeout(r, 6000));

    const html = await win.webContents.executeJavaScript(`
        const table = document.querySelector('table.recentGamesTable');
        table ? table.innerHTML : "NO TABLE";
    `);

    fs.writeFileSync('output_test2.html', html);
    app.quit();
});
