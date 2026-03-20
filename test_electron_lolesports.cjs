const { app, BrowserWindow } = require('electron');

app.whenReady().then(async () => {
    const win = new BrowserWindow({ show: true, webPreferences: { offscreen: false } });
    await win.loadURL('https://lolesports.com/en-GB/standings');
    await new Promise(r => setTimeout(r, 6000));
    
    const result = await win.webContents.executeJavaScript(`
        (() => {
            // Find any Next.js __NEXT_DATA__ block or state
            const script = document.getElementById('__NEXT_DATA__');
            if(script) return script.textContent;
            return document.body.innerHTML.substring(0, 1000);
        })();
    `);
    
    require('fs').writeFileSync('test_lolesports.json', JSON.stringify(result, null, 2));
    console.log("Dumped JSON");
    app.quit();
});
