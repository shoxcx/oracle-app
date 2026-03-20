const { app, BrowserWindow } = require('electron');

app.whenReady().then(async () => {
    const win = new BrowserWindow({ show: false, webPreferences: { offscreen: true } });
    const result = await win.webContents.executeJavaScript(`
        fetch('https://lol.fandom.com/api.php?action=cargoquery&tables=ScoreboardGames,Tournaments&join_on=ScoreboardGames.OverviewPage=Tournaments.OverviewPage&fields=ScoreboardGames.Team1,ScoreboardGames.Team2,ScoreboardGames.Winner,Tournaments.League,Tournaments.Name&where=(Tournaments.League=%22LPL%22%20OR%20Tournaments.League=%22LCK%22%20OR%20Tournaments.League=%22LEC%22%20OR%20Tournaments.League=%22LCS%22%20OR%20Tournaments.League=%22LCP%22)%20AND%20Tournaments.DateStart%3E=%222025-01-01%22&limit=500&format=json', {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        }).then(res => res.json())
    `);
    
    require('fs').writeFileSync('test_cargo.json', JSON.stringify(result, null, 2));
    console.log("Dumped JSON");
    app.quit();
});
