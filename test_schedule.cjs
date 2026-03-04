const { app } = require('electron');
const scraper = require('./electron_app/scraper.cjs');

app.on('ready', async () => {
    scraper.dataCache.clear();
    const result = await scraper.getEsportsSchedule();
    const fs = require('fs');
    fs.writeFileSync('output_schedule.json', JSON.stringify(result, null, 2));
    app.quit();
});
