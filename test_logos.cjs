const http = require('https');

const urls = [
    'https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1631819669150_fnc-2021-worlds.png',
    'https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1641215160860_TeamBDSBDS_Dark_Logo.png',
    'https://am-a.akamaihd.net/image?resize=200:&f=http%3A%2F%2Fstatic.lolesports.com%2Fteams%2F1641285648833_KwangdongFreecsKDF_Dark_Logo.png',
    'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f4/Team_Liquidlogo_square.png'
];

urls.forEach(url => {
    http.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } }, (res) => {
        console.log(res.statusCode);
    }).on('error', (e) => {
        console.error(e);
    });
});
