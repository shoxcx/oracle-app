const { app } = require('electron');

app.whenReady().then(async () => {
   const scraper = require('./electron_app/scraper.cjs');
   const rankings = await scraper.getEsportsRankings();
   require('fs').writeFileSync('r_debug.json', JSON.stringify(rankings, null, 2));
   app.quit();
});
