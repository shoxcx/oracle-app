const fs = require('fs');
app = require('electron').app;
app.whenReady().then(async () => {
   const win = new require('electron').BrowserWindow({ show: false, webPreferences: { contextIsolation: true, nodeIntegration: false }});
   await win.loadURL('https://lolesports.com/en-GB/schedule?leagues=lec,lck,lpl,lcs');
   await new Promise(r => setTimeout(r, 6000));
   const html = await win.webContents.executeJavaScript(`
     (() => {
        const els = Array.from(document.querySelectorAll('*'));
        const indicators = els.filter(el => {
            const t = el.innerText ? el.innerText.trim() : '';
            return t === 'Bo1' || t === 'Bo3' || t === 'Bo5' || t === 'LIVE';
        });

        if (!indicators.length) return 'No indicators';
        
        const container = indicators[0].parentElement.parentElement;
        let p = container;
        let out = '';
        while(p && p !== document.body) {
           out += p.tagName + ' -> ';
           p = p.parentElement;
        }
        
        // Also get first 5 date elements text
        const dates = Array.from(document.querySelectorAll('[data-weekday], [class*="Date"]')).map(d => d.innerText).slice(0,5);
        
        return { path: out, dates };
     })()
   `);
   fs.writeFileSync('sched_test_debug.json', JSON.stringify(html, null, 2));
   app.quit();
});
