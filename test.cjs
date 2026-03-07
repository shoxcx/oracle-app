const { app } = require('electron');
const scraper = require('./electron_app/scraper.cjs');

app.whenReady().then(async () => {
    try {
        console.log("Fetching schedule...");
        const schedule = await scraper.getEsportsSchedule();
        console.log("Schedule length:", schedule.length);
        if (schedule.length > 0) console.log("First schedule item:", schedule[0]);

        console.log("Fetching rankings...");
        const ranks = await scraper.getEsportsRankings();
        console.log("Ranks length:", ranks.length);
        if (ranks.length > 0) console.log("First rank item:", ranks[0]);
        
        console.log("Done.");
    } catch(e) {
        console.error("ERROR:", e);
    }
    app.quit();
});
