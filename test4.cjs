const { BrowserWindow, app } = require('electron');
const path = require('path');
const fs = require('fs');

app.whenReady().then(() => {
    fs.writeFileSync('test_index.html', `<html><body><script>
        const fs = require('fs');
        navigator.mediaDevices.enumerateDevices().then(devices => {
            fs.writeFileSync('test_output3.txt', JSON.stringify(devices));
            window.close();
        });
    </script></body></html>`);

    const win = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false
        }
    });
    // load file html
    win.loadURL('file://' + path.join(__dirname, 'test_index.html'));
});
app.on('window-all-closed', () => app.quit());
