const { BrowserWindow, app } = require('electron');
const path = require('path');
const fs = require('fs');

app.whenReady().then(() => {
    fs.writeFileSync('test_index2.html', `<html><body><script>
        const fs = require('fs');
        fs.writeFileSync('test_output_websecurity.txt', 'mediaDevices is: ' + typeof navigator.mediaDevices);
        window.close();
    </script></body></html>`);

    const win = new BrowserWindow({
        show: false,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        }
    });
    // load file html
    win.loadURL('file://' + path.join(__dirname, 'test_index2.html'));
});
app.on('window-all-closed', () => app.quit());
