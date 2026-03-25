const https = require('https');
const zlib = require('zlib');

const url = 'https://op.gg/fr/lol/champions/aatrox/build/top';

https.get(url, {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        'Accept-Encoding': 'gzip, deflate, br'
    }
}, (res) => {
    const stream = res.headers['content-encoding'] === 'gzip' ? res.pipe(zlib.createGunzip()) : res;
    let html = '';
    stream.on('data', chunk => html += chunk);
    stream.on('end', () => {
        let hasRunes = false;
        let nextDataStr = '';
        const match = html.match(/<script id="__NEXT_DATA__" type="application\/json">(.*?)<\/script>/s);
        if (match) {
            console.log("Found __NEXT_DATA__");
            try {
                const js = JSON.parse(match[1]);
                const next = js?.props?.pageProps?.data?.runes?.[0];
                if (next) {
                    console.log("Runes found in __NEXT_DATA__");
                } else {
                    console.log("Runes NOT found in __NEXT_DATA__");
                }
                
                // Let's check for items
                const core_items = js?.props?.pageProps?.data?.core_items;
                const starting_items = js?.props?.pageProps?.data?.starter_items;
                const boots = js?.props?.pageProps?.data?.boots;
                console.log("Core items check: ", !!core_items);
                if (core_items) {
                    console.log(JSON.stringify(core_items[0]));
                }
            } catch(e) { console.error(e) }
        } else {
            console.log("No __NEXT_DATA__");
        }
        
        const itemMatches = html.match(/src="[^"]*item[^"]*"/g) || [];
        console.log("Images with 'item':", itemMatches.length);
    });
});
