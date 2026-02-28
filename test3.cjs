const { BrowserWindow, app } = require('electron');
const path = require('path');
const fs = require('fs');

app.whenReady().then(() => {
    fs.writeFileSync('test_index.html', `<html><body><script>
        const fs = require('fs');
        fs.writeFileSync('test_output2.txt', 'mediaDevices is: ' + typeof navigator.mediaDevices);
        window.close();
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
