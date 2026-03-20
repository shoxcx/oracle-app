const fs = require('fs');
const code = fs.readFileSync('electron_app/scraper.cjs', 'utf-8');
const scraper = require('./electron_app/scraper.cjs');
// Can't run full scraper here, but I can check what happens in regex
console.log(code.includes('esports_rankings_v16_dynamic'));
