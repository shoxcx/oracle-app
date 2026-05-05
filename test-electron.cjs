const { app, BrowserWindow } = require('electron');
const fs = require('fs');

app.whenReady().then(async () => {
  const win = new BrowserWindow({ show: false });
  await win.loadURL('https://www.leagueofgraphs.com/summoner/euw/ghost+in+bush-0777');
  setTimeout(async () => {
    const html = await win.webContents.executeJavaScript(`
      (() => {
        const rows = document.querySelectorAll('.recentGamesTable tbody tr');
        let res = "";
        rows.forEach(r => res += r.innerText.replace(/\\n/g, ' | ') + "\\n");
        return res;
      })()
    `);
    fs.writeFileSync('log_dump.txt', html);
    app.quit();
  }, 3000);
});
