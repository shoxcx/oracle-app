const { app, BrowserWindow } = require('electron');

app.whenReady().then(async () => {
  const win = new BrowserWindow({ 
    show: false,
    webPreferences: { nodeIntegration: false, contextIsolation: true }
  });
  
  win.webContents.userAgent = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36";
  
  await win.loadURL('https://www.leagueofgraphs.com/summoner/euw/ghost+in+bush-0777');
  
  setTimeout(async () => {
    const html = await win.webContents.executeJavaScript('document.body.innerHTML');
    require('fs').writeFileSync('league_dump.html', html);
    app.quit();
  }, 5000);
});
