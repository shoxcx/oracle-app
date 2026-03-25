import https from 'https';
https.get('https://lolesports.com/en-US/gpr/2026/current', res => {
  let d = ''; res.on('data', c => d+=c); res.on('end', () => {
    try {
        const m = d.match(/ApolloSSRDataTransport.*?\.push\(\{(.*?)\}/);
        if(m) {
            let jsonString = "{" + m[1] + "}";
            let obj = JSON.parse(jsonString).rehydrate || JSON.parse(jsonString);
            let rankings = [];
            for (let k in obj) {
                if(obj[k].__typename === 'PowerRanking') {
                    let teamRef = obj[k].team.__ref;
                    let teamObj = obj[teamRef];
                    let leagueRef = teamObj.homeLeague.__ref;
                    let leagueObj = obj[leagueRef];
                    rankings.push({
                        rank: obj[k].rank,
                        name: teamObj.code,
                        fullName: teamObj.name,
                        league: leagueObj.name,
                        wins: 0,
                        losses: 0,
                        points: obj[k].gprScore + " pts"
                    });
                }
            }
            rankings.sort((a,b)=>a.rank - b.rank);
            console.log(rankings.slice(0, 5));
            process.exit(0);
        } else {
            console.log("no match");
        }
    } catch(e) { console.error(e) }
  });
});



