const { app, BrowserWindow } = require('electron');
const fs = require('fs');

app.whenReady().then(async () => {
    let win = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: false, contextIsolation: true } });
    await win.loadURL('https://lolesports.com/en-GB/schedule?leagues=lec,lck,lpl,lcs,msi');
    await new Promise(r => setTimeout(r, 6000));

    // Attempt clicking 'Accept' button for cookies if present
    await win.webContents.executeJavaScript(`
        const btn = Array.from(document.querySelectorAll('button')).find(b => b.innerText.includes('Accepter') || b.innerText.includes('Accept'));
        if(btn) btn.click();
    `);
    await new Promise(r => setTimeout(r, 2000));

    const data = await win.webContents.executeJavaScript(`
        (() => {
            const results = [];
            const indicators = Array.from(document.querySelectorAll('*')).filter(el => {
                const t = el.innerText ? el.innerText.trim() : "";
                return t === 'Bo1' || t === 'Bo3' || t === 'Bo5' || t === 'LIVE';
            });
            
            indicators.forEach(ind => {
                let container = ind;
                let limit = 8;
                while(container && limit > 0) {
                    if (container.querySelectorAll('img').length >= 2) break;
                    container = container.parentElement;
                    limit--;
                }
                if (!container || container.querySelectorAll('img').length < 2) return;
                
                const imgs = Array.from(container.querySelectorAll('img')).filter(img => !img.src.includes('score'));
                
                const getTeamFromImg = (img) => {
                    if (img.alt && img.alt.length > 1 && img.alt.length < 20 && !img.alt.toLowerCase().includes('logo') && !img.alt.toLowerCase().includes('lolesports')) {
                        return img.alt.toUpperCase();
                    }
                    try {
                        let url = decodeURIComponent(img.src);
                        let name = url.split('/').pop().split('.')[0];
                        name = name.replace(/_logo|-logo|logo/i, '').replace(/_/g, ' ').toUpperCase();
                        name = name.replace(/^\\d+\\s*(PX-|-|\\s+)|^\\d+\\s+/i, '').trim(); 
                        name = name.replace(/^\\d+PX-/i, '');
                        if (name.includes("LIGHTMODE") || name.includes("DARKMODE") || name.includes("LOLESPORTS")) return "TBD";
                        return name;
                    } catch(e) {
                        return "TBD";
                    }
                };
                
                if (imgs.length >= 2) {
                   let t1 = getTeamFromImg(imgs[0]);
                   let t2 = getTeamFromImg(imgs[1]);
                   results.push({t1, t2, src1: imgs[0].src, src2: imgs[1].src});
                }
            });
            return results;
        })();
    `);

    fs.writeFileSync('output_schedule.json', JSON.stringify(data, null, 2));
    app.quit();
});
