async function test() {
    try {
        const fetch = require('node-fetch');
        const res = await fetch('https://lol-web-api.op.gg/api/v1.0/internal/bypass/search/global?q=Ajeje%20Brazorf%237395', {
            headers: { 'User-Agent': 'Mozilla/5.0' }
        });
        const text = await res.text();
        console.log("OP.GG Search Status:", res.status);
        if (res.status === 200) {
            const data = JSON.parse(text);
            console.log("Data:", data.data[0]);
        }
    } catch(e) { console.error(e); }
}
test();
