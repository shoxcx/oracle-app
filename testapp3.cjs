const { app, BrowserWindow } = require('electron');

app.whenReady().then(async () => {
   const win = new BrowserWindow({ show: false, webPreferences: { contextIsolation: true, nodeIntegration: false }});
   await win.loadURL('https://lolesports.com/en-GB/gpr/2026/current');
   await new Promise(r => setTimeout(r, 6000));
   
   const html = await win.webContents.executeJavaScript('document.body.innerHTML');
   require('fs').writeFileSync('dom.html', html);
   console.log('DOM length:', html.length);
   app.quit();
});
