const { BrowserWindow, app } = require('electron');
const path = require('path');
const fs = require('fs');

async function interceptUGG() {
    await app.whenReady();
    const win = new BrowserWindow({ show: false });
    
    win.webContents.session.webRequest.onCompleted({ urls: ['*://stats2.u.gg/main/graphql'] }, (details) => {
        // Unfortunately electron doesn't let us read the body easily here without debugger.
        // So we'll try to find it in the DOM after load.
    });

    const url = 'https://u.gg/lol/profile/euw1/ghost%20in%20bush-0777/overview';
    console.log("Loading", url);
    await win.loadURL(url);
    
    await new Promise(r => setTimeout(r, 8000));

    // Search for the graph in the DOM
    const data = await win.webContents.executeJavaScript(`
        (() => {
            // U.GG uses Highcharts or similar. The data is often in a script or a hidden div.
            // Let's look for SVG paths and try to guess the points.
            const svg = document.querySelector('.rank-graph svg');
            if (svg) {
                const circles = Array.from(svg.querySelectorAll('circle'));
                return circles.map(c => ({
                    cx: c.getAttribute('cx'),
                    cy: c.getAttribute('cy'),
                    // If we hover, maybe we get text?
                }));
            }
            return "SVG not found";
        })()
    `);
    
    console.log("SVG Circles:", JSON.stringify(data));
    app.quit();
}

interceptUGG();
