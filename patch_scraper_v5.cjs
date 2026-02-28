const fs = require('fs');
const path = 'c:/Users/User/.gemini/antigravity/scratch/lol-tracker/electron_app/scraper.cjs';
let content = fs.readFileSync(path, 'utf8');

// 1. Refine Itemizer to avoid opponent items
const newExtractionLogic = `
                                let winRate = "50%";
                                const overview = findKey(pageProps, 'overview');
                                if(overview && (overview.win_rate || overview.winRate)) {
                                    const rawWR = overview.win_rate || overview.winRate;
                                    winRate = (rawWR > 1 ? rawWR : rawWR * 100).toFixed(1) + "%";
                                }

                                let counterItems = [];
                                // Ultra-Aggressive Season 2026 Itemizer - CHAMPION SPECIFIC
                                const searchKeys = ['item_builds', 'itemBuilds', 'standard_items', 'recommendedItems', 'core_items'];
                                
                                // Priority 1: Match with championId if available
                                const championId = pageProps?.championId || pageProps?.champion_id;
                                
                                for (const key of searchKeys) {
                                    // Try to find the key specifically in the overview first
                                    const overviewData = overview ? findKey(overview, key) : null;
                                    const data = overviewData || findKey(pageProps, key);
                                    
                                    if (Array.isArray(data) && data.length > 0) {
                                        const raw = data[0]?.items || data[0]?.core_items || data;
                                        if (Array.isArray(raw)) {
                                            const filtered = raw.map(i => typeof i === 'object' ? (i.id || i.itemId) : i).filter(id => id > 1000).slice(0, 6);
                                            if (filtered.length >= 3) {
                                                counterItems = filtered;
                                                break;
                                            }
                                        }
                                    }
                                }

                                if (counterItems.length < 3) {
                                    // Precision Regex: only look for items in the first 20% of the JSON (usually target champ data)
                                    const allJSON = JSON.stringify(pageProps);
                                    const partJSON = allJSON.slice(0, Math.floor(allJSON.length * 0.3));
                                    counterItems = [...new Set(partJSON.match(/\\b[36]\\d{3}\\b/g) || [])].map(Number).filter(id => id > 2000 && id < 8000).slice(0, 6);
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
const endMarker = 'return { winRate, counterItems: counterItems.length';
const startIndex = content.indexOf(startMarker);
const endIndex = content.indexOf(endMarker);

if (startIndex !== -1 && endIndex !== -1) {
    content = content.substring(0, startIndex) + newExtractionLogic + content.substring(endIndex);
}

fs.writeFileSync(path, content);
console.log("Successfully refined scraper itemization to be champion-specific.");
