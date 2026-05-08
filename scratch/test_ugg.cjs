const { BrowserWindow, app } = require('electron');
const path = require('path');
const fs = require('fs');

async function testUGG() {
    await app.whenReady();
    const win = new BrowserWindow({ show: false });
    const url = 'https://u.gg/lol/profile/euw1/ghost%20in%20bush-0777/overview';
    console.log("Loading", url);
    await win.loadURL(url);
    
    // Wait for initial load
    await new Promise(r => setTimeout(r, 5000));
    
    // Attempt to click the toggle if not already expanded
    await win.webContents.executeJavaScript(`
        (() => {
            const btns = Array.from(document.querySelectorAll('button, div[role="button"]'));
            // Search for button that might toggle the graph
            const toggle = btns.find(b => b.innerText.includes('Last 100 games') || b.querySelector('svg[class*="chevron"]'));
            if (toggle) {
                toggle.click();
                console.log("Clicked toggle");
            }
        })()
    `);
    
    // Wait for potential async fetch
    await new Promise(r => setTimeout(r, 3000));
    
    const apolloState = await win.webContents.executeJavaScript(`JSON.stringify(window.__APOLLO_STATE__)`);
    if (apolloState) {
        fs.writeFileSync('./scratch/ugg_apollo_final.json', apolloState);
        console.log("Saved Apollo state to ./scratch/ugg_apollo_final.json");
    } else {
        console.log("Apollo state not found");
    }
    
    app.quit();
}

testUGG();
