const http = require('https');

const urls = [
    'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f4/Team_Liquidlogo_square.png',
    'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/w/w3/Team_BDSlogo_square.png',
    'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/4e/Kwangdong_Freecslogo_square.png',
    'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/84/Fnaticlogo_square.png',
    'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/42/Fnaticlogo_square.png'
];

urls.forEach(url => {
    http.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        console.log(url.split('/').pop() + ": " + res.statusCode);
    }).on('error', (e) => {
        console.error(e);
    });
});
