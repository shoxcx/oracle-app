const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
axios.get('https://www.leagueofgraphs.com/summoner/euw/Ireliass-0777', {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
    }
}).then(res => {
    const $ = cheerio.load(res.data);
    const rows = $('.recentGamesTable tbody tr').slice(0, 10);
    rows.each((i, row) => {
        const txt = $(row).text().replace(/\s+/g, ' ');
        const lpChange = $(row).find('span').filter((i, el) => $(el).text().includes('LP')).first().text();
        console.log(i, lpChange.trim(), txt.substring(0, 100));
    });
}).catch(console.error);
