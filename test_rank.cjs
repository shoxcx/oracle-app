const { app, BrowserWindow } = require('electron');

app.whenReady().then(async () => {
    let win = new BrowserWindow({show: false, webPreferences: { contextIsolation: true }});
    await win.loadURL('https://lolesports.com');
    await new Promise(r => setTimeout(r, 6000));
    try {
        const data = await win.webContents.executeJavaScript(`
            (function() {
                try {
                    if (window.__NEXT_DATA__) {
                        return Object.keys(window.__NEXT_DATA__);
                    }
                    const s = document.getElementById('__NEXT_DATA__');
                    if (s) return s.innerText.substring(0, 100);
                    return "No NEXT DATA found";
                } catch(e) {
                    return e.message;
                }
            })();
        `);
        console.log("NEXT DATA:", typeof data === 'object' ? data : data);
    } catch(e) {}
    app.quit();
});
