const { app } = require('electron');
const Scraper = require('./electron_app/scraper.cjs');

app.whenReady().then(async () => {
    const scraper = new Scraper();
    console.log("Fetching LOG Items for Aatrox/Top...");
    const items = await scraper.getLeagueOfGraphsItems('aatrox', 'top');
    console.log("LOG Items:");
    console.log(items);
    app.quit();
});
