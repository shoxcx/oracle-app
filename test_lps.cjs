const { app, BrowserWindow } = require('electron');
const fs = require('fs');

app.whenReady().then(async () => {
    let win = new BrowserWindow({ show: false, webPreferences: { nodeIntegration: false, contextIsolation: true } });
    await win.loadURL('https://www.leagueofgraphs.com/summoner/euw/Ireliass-0777');
    await new Promise(r => setTimeout(r, 6000));

    const lpData = await win.webContents.executeJavaScript(`
        (() => {
            const results = [];
            const rows = document.querySelectorAll('tr');
            rows.forEach(row => {
                const killsEl = row.querySelector('.kda .kills');
                const deathsEl = row.querySelector('.kda .deaths');
                const assistsEl = row.querySelector('.kda .assists');
                let kda = null;
                if (killsEl && deathsEl && assistsEl) {
                    kda = \`\${killsEl.innerText.trim()} / \${deathsEl.innerText.trim()} / \${assistsEl.innerText.trim()}\`;
                }

                const lpEl = row.querySelector('.lpChange');
                let lpStr = null;
                if (lpEl && lpEl.innerText.includes('LP')) {
                    // It can have nested divs, so innerText handles it, but let's take just the first match
                    const match = lpEl.innerText.match(/(-?\\+?\\d+\\s+LP)/);
                    if (match) lpStr = match[1];
                }

                if (kda && lpStr) {
                    results.push({ kda, lpStr });
                }
            });
            return results;
        })()
    `);

    fs.writeFileSync('output_test_lp.json', JSON.stringify(lpData, null, 2));
    app.quit();
});
