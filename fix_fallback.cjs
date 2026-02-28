const fs = require('fs');
const path = 'c:/Users/User/.gemini/antigravity/scratch/lol-tracker/electron_app/scraper.cjs';
let content = fs.readFileSync(path, 'utf8');

// 1. Remove the bad tank fallback and improve detection
content = content.replace(
    'return { winRate, counterItems: counterItems.length ? counterItems : [3047, 3153, 3075, 6610, 3110, 3143], junglePath };',
    'return { winRate, counterItems: counterItems.length ? counterItems : [], junglePath };'
);

fs.writeFileSync(path, content);
console.log("Successfully removed the misleading tank item fallback.");
