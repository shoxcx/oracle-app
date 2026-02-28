const { BrowserWindow, app } = require('electron');

app.whenReady().then(() => {
    const win = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
            webviewTag: true
        }
    });

    win.loadURL('http://localhost:5174');
    win.webContents.on('did-finish-load', () => {
        win.webContents.executeJavaScript(`
            const fs = require('fs');
            try {
                fs.writeFileSync('test_output_localhost.txt', JSON.stringify({
                    hasMediaDevices: !!navigator.mediaDevices,
                    mics: navigator.mediaDevices ? (await navigator.mediaDevices.enumerateDevices()).length : 0
                }));
            } catch (e) {
                fs.writeFileSync('test_output_localhost.txt', e.toString());
            }
        `).then(() => app.quit());
    });
});
app.on('window-all-closed', () => app.quit());
