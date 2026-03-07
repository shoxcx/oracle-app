const { app, BrowserWindow } = require('electron');
const path = require('path');

app.on('ready', async () => {
    const win = new BrowserWindow({
        show: true, width: 1200, height: 800,
        webPreferences: { offscreen: false, contextIsolation: false, nodeIntegration: true }
    });

    await win.loadURL('https://www.leagueofgraphs.com/champions/builds/evelynn/jungle');

    const result = await win.webContents.executeJavaScript(`
        (() => {
            const getItemsFromSection = (titleMatch) => {
                const boxes = Array.from(document.querySelectorAll('.box'));
                for(let b of boxes) {
                    const titleText = (b.querySelector('.box-title') || b).innerText.trim();
                    if(titleText.includes(titleMatch)) {
                        // Items are usually in images. Let's get img src or alt or item IDs.
                        // LeagueOfGraphs items use tooltip like "item-3111"
                        const itemLinks = Array.from(b.querySelectorAll('.requireTooltip'));
                        return itemLinks.map(el => {
                            const tooltip = el.getAttribute('tooltip');
                            if(tooltip && tooltip.includes('item-')) {
                                return tooltip.split('item-')[1]; // returns ID
                            }
                            return null;
                        }).filter(Boolean);
                    }
                }
                return [];
            };

            const allGroups = Array.from(document.querySelectorAll('.box'));
            const res = {};
            for(let b of allGroups) {
                const titleEl = b.querySelector('.box-title') || b.querySelector('div[style*="font-weight: bold;"]');
                if(!titleEl) continue;
                const innerT = titleEl.innerText.trim();
                
                if(innerT === "Starting Build" || innerT === "Core Build" || innerT === "Boots" || innerT === "Final Item Options") {
                     const itemLinks = Array.from(b.querySelectorAll('.requireTooltip'));
                     res[innerT] = itemLinks.map(el => {
                         const img = el.querySelector('img');
                         return img ? img.getAttribute('src') : null;
                     }).filter(Boolean);
                }
            }

            // Sometimes they don't have .box-title but are inside a bigger box... 
            // Wait, looking at the image, it's one big box with multiple sections.
            // Let's get ALL texts and see the structure matching "Starting Build"
            
            const extractByHeaders = () => {
                const results = {};
                const sectionNames = ["Starting Build", "Core Build", "Boots", "Final Item Options"];
                const headers = Array.from(document.querySelectorAll('div, span, th')).filter(el => sectionNames.includes(el.innerText.trim()) && !el.children.length);
                
                headers.forEach(h => {
                    const name = h.innerText.trim();
                    // Items are usually the next siblings or in the parent's next element
                    // Let's just find the closest container that encapsulates this header and its items
                    // Actually, let's just grab the images immediately following this header up to the next text
                    let curr = h.parentElement;
                    while(curr && curr.querySelectorAll('img').length === 0) {
                        curr = curr.nextElementSibling || curr.parentElement;
                    }
                    if(curr) {
                        const imgs = Array.from(curr.querySelectorAll('img[src*="/img/items/"]'));
                        // Extract ID from src like "//lolg-cdn.porofessor.gg/img/items/14.23/64/3042.png"
                        results[name] = imgs.map(img => {
                            const src = img.getAttribute('src');
                            const match = src.match(/items\\/([\\d\\.]+)\\/\\d+\\/(\\d+)\\.png/);
                            if(match) return match[2];
                            
                            const match2 = src.match(/\\/(\\d+)\\.png$/);
                            if(match2) return match2[1];
                            return src;
                        });
                    }
                });
                return results;
            }

            return extractByHeaders();
        })();
    `);

    console.log("EXTRACTED ITEMS:", JSON.stringify(result, null, 2));
    app.quit();
});
