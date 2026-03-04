const { app } = require('electron');
const path = require('path');
const Scraper = require('./electron_app/scraper.cjs');

app.whenReady().then(async () => {
    try {
        const scraper = new Scraper();
        console.log("Testing Draguarys#OMEN [EUW]");
        const puuid = "ext~Draguarys%23OMEN~EUW";
        const history = await scraper.getMatchHistory(puuid);
        console.log("HISTORY:", JSON.stringify(history, null, 2));
    } catch (e) {
        console.error(e);
    } finally {
        app.quit();
    }
});
