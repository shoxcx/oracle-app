const { BrowserWindow, app } = require('electron');
const http = require('http');

app.whenReady().then(() => {
    const server = http.createServer((req, res) => {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(`<html><body><script>
            const fs = require('fs');
            navigator.mediaDevices.enumerateDevices().then(devices => {
                fs.writeFileSync('test_output_http.txt', JSON.stringify(devices));
                window.close();
            }).catch(e => {
                fs.writeFileSync('test_output_http.txt', e.toString());
                window.close();
            });
        </script></body></html>`);
    }).listen(5178, '127.0.0.1', () => {
        const win = new BrowserWindow({
            show: false,
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false,
                webSecurity: false
            }
        });
        win.loadURL('http://127.0.0.1:5178');
    });
});
app.on('window-all-closed', () => process.exit(0));
