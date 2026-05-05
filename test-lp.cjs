const axios = require('axios');
const cheerio = require('cheerio');
axios.get('https://www.leagueofgraphs.com/summoner/euw/ghost+in+bush-0777', {headers:{'User-Agent':'Mozilla/5.0'}})
.then(res => {
  const $ = cheerio.load(res.data);
  const rows = [];
  $('.recentGamesTable tbody tr').each((i, el) => {
    rows.push({
      mode: $(el).find('.gameMode').first().text().trim(),
      lpText: $(el).find('.lpChange').text().trim(),
      k: $(el).find('.kills').text().trim(),
      d: $(el).find('.deaths').text().trim(),
      a: $(el).find('.assists').text().trim(),
    });
  });
  console.log(rows.slice(0, 5));
}).catch(console.error);
