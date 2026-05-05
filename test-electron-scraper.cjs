const { app } = require('electron');
const scraper = require('./electron_app/scraper.cjs');

app.whenReady().then(async () => {
  try {
    const res = await scraper.getRecentLPGains('ghost in bush', 'EUW');
    console.log("RESULT:", res);
  } catch(e) {
    console.error("ERROR:", e);
  }
  app.quit();
});
