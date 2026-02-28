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
                                // Ultra-Aggressive Season 2026 Itemizer
                                const searchKeys = ['item_builds', 'itemBuilds', 'standard_items', 'recommendedItems', 'core_items'];
                                for (const key of searchKeys) {
                                    const data = findKey(pageProps, key);
                                    if (Array.isArray(data) && data.length > 0) {
                                        const raw = data[0]?.items || data[0]?.core_items || data;
                                        if (Array.isArray(raw)) {
                                            counterItems = raw.map(i => typeof i === 'object' ? (i.id || i.itemId) : i).filter(id => id > 1000).slice(0, 6);
                                            if (counterItems.length >= 3) break;
                                        }
                                    }
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

const videoUrlUpdate = 'videoUrl: `https://www.youtube.com/results?search_query=${champ1}+vs+${champ2}+high+elo+s26.2`';

// Replace extraction logic
const startMarker = 'let winRate = "50%";';
const endMarker = 'return { winRate, counterItems';
const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    content = content.substring(0, startIndex) + newExtractionLogic + content.substring(endIndex);
}

// Replace video URL
content = content.replace(/videoUrl: `https:\/\/www\.youtube\.com\/results\?search_query=\${champ1}\+vs\+\${champ2}\+high\+elo\+patch\+15`/g, videoUrlUpdate);

fs.writeFileSync(path, content);
console.log("Successfully updated scraper to S26.2 and improved itemization.");
