const fs = require('fs');
const path = 'c:/Users/User/.gemini/antigravity/scratch/lol-tracker/electron_app/scraper.cjs';
let content = fs.readFileSync(path, 'utf8');

const newExtractionLogic = `
                                let winRate = "50%";
                                const overview = findKey(pageProps, 'overview');
                                if(overview && (overview.win_rate || overview.winRate)) {
                                    const rawWR = overview.win_rate || overview.winRate;
                                    winRate = (rawWR > 1 ? rawWR : rawWR * 100).toFixed(1) + "%";
                                }

                                let counterItems = [];
                                const builds = findKey(pageProps, 'item_builds') || findKey(pageProps, 'itemBuilds') || findKey(pageProps, 'standard_items');
                                if (Array.isArray(builds)) {
                                    const raw = builds[0]?.items || builds[0]?.core_items || builds;
                                    counterItems = raw.map(i => typeof i === 'object' ? (i.id || i.itemId) : i).filter(id => id > 1000).slice(0, 6);
                                }

                                if (counterItems.length < 3) {
                                    const allJSON = JSON.stringify(pageProps);
                                    counterItems = [...new Set(allJSON.match(/\\b[36]\\d{3}\\b/g) || [])].map(Number).filter(id => id > 2000 && id < 8000).slice(0, 6);
                                }
                                
                                let junglePath = null;
                                if (role.toLowerCase() === 'jungle') {
                                    const pData = findKey(pageProps, 'jungle_path') || findKey(pageProps, 'path');
                                    if (Array.isArray(pData)) junglePath = pData.slice(0, 6);
                                    else {
                                        const farmers = ["Bel'Veth", "Karthus", "Lillia", "Master Yi", "Shyvana", "Diana"];
                                        junglePath = farmers.includes(champ1) ? [5, 6, 4, 3, 2, 1] : [5, 4, 1];
                                    }
                                }
`;

const startMarker = 'let winRate = "50%";';
const endMarker = 'return { winRate, counterItems';

const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    const newContent = content.substring(0, startIndex) + newExtractionLogic + content.substring(endIndex);
    fs.writeFileSync(path, newContent);
    console.log("Successfully updated build extraction logic.");
} else {
    console.error("Markers not found:", { startIndex, endIndex });
}
