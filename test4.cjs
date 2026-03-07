const fs = require('fs');
const { app, BrowserWindow } = require('electron');
app.whenReady().then(async () => {
   const win = new BrowserWindow({ show: false, webPreferences: { contextIsolation: true, nodeIntegration: false }});
   await win.loadURL('https://lolesports.com/en-GB/schedule?leagues=lec,lck,lpl,lcs');
   await new Promise(r => setTimeout(r, 6000));
   const res = await win.webContents.executeJavaScript(`
     (() => {
        const clean = t => t ? t.innerText.trim() : '';
        const results = [];
        let indicators = Array.from(document.querySelectorAll('*')).filter(el => {
            const t = el.innerText ? el.innerText.trim() : '';
            return t === 'Bo1' || t === 'Bo3' || t === 'Bo5' || t === 'LIVE';
        });
        
        indicators.forEach(ind => {
           let container = ind;
           let limit = 8;
           let found = false;
           while(container && limit > 0) {
               if (container.innerText.length > 20 && container.innerText.length < 400) {
                   if (container.innerText.match(/\\d{1,2}:\\d{2}/) || container.innerText.includes('LIVE')) {
                       found = true;
                       break;
                   }
               }
               container = container.parentElement;
               limit--;
           }
           if (!found) {
               container = ind;
               for(let i=0; i<4; i++) {
                   if(container.parentElement) container = container.parentElement;
               }
           }
           if (!container) return;
           
           let text = container.innerText || "null";
           let date = "Upcoming";
           let sibling = container.previousElementSibling;
           let dateLimit = 15;
           while(sibling && dateLimit > 0) {
              if (sibling.innerText && (sibling.innerText.match(/2[0-9]\\s+Jan|Today|Tomorrow|Saturday|Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Yesterday/i) || sibling.tagName.startsWith('H'))) {
                   date = sibling.innerText.split('\\n')[0].trim();
                   break;
              }
              sibling = sibling.previousElementSibling;
              dateLimit--;
           }
           
           results.push({
               indText: ind.innerText,
               containerTextPreview: text.substring(0, 100).replace(/\\n/g, ' '),
               dateFound: date,
               timeMatch: text.match(/(?:\\d{1,2}:\\d{2})/) ? text.match(/(?:\\d{1,2}:\\d{2})/)[0] : 'no time',
           });
        });
        return results;
     })()
   `);
   fs.writeFileSync('sched_debug.json', JSON.stringify(res, null, 2));
   app.quit();
});
