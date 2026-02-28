const { BrowserWindow, app } = require('electron');
app.whenReady().then(() => {
    const win = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    // load data html
    win.loadURL(`data:text/html,<html><body><script>
        const fs = require('fs');
        fs.writeFileSync('test_output.txt', 'mediaDevices is: ' + typeof navigator.mediaDevices);
        window.close();
    </script></body></html>`);
});
app.on('window-all-closed', () => app.quit());
