const path = require('path');
const { app } = require('electron');
const Scraper = require('./electron_app/scraper.cjs');

app.whenReady().then(async () => {
   const s = new Scraper();
   const rankings = await s.getEsportsRankings();
   require('fs').writeFileSync('rankings_debug.json', JSON.stringify(rankings, null, 2));
   console.log('Done!');
   app.quit();
});
