const { app, BrowserWindow, session } = require('electron');
app.whenReady().then(() => {
    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        callback(true);
    });
    const win = new BrowserWindow({
        show: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    win.loadURL('data:text/html,<html><body><script>navigator.mediaDevices.enumerateDevices().then(d => { const fs = require("fs"); fs.writeFileSync("devs.json", JSON.stringify(d)); window.close(); }).catch(e => { const fs = require("fs"); fs.writeFileSync("devs.json", e.toString()); window.close(); });</script></body></html>');
});
app.on('window-all-closed', () => app.quit());
