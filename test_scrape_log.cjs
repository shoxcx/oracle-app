const { app } = require('electron');
const scraper = require('./electron_app/scraper.cjs');

app.whenReady().then(async () => {
    try {
        const puuid = "ext~Swordgrey45%233008~EUW";
        const history = await scraper.getMatchHistory(puuid);
        const games = history.games ? history.games.games : [];
        if (games.length > 0) {
            games.forEach((g, i) => {
                const me = g.participants.find(p => p.puuid === puuid) || g.participants[0];
                console.log(`Match ${i}: LP=${g.lpChange} GameCreation=${g.gameCreation} Queue=${g.queueId}`);
            });
        }
    } catch (e) {
        console.error("ERROR:", e);
    } finally {
        app.quit();
    }
});
