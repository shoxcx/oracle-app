const axios = require('axios');
const fs = require('fs');

async function test(url, name) {
    try {
        const res = await axios.get(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
        fs.writeFileSync(name, res.data);
        console.log(name, "OK - 200");
    } catch (e) {
        console.log(name, "FAIL -", e.response?.status);
    }
}

async function run() {
    await test('https://www.leagueofgraphs.com/fr/champions/stats/akali/vs-fizz/mid', 'test1.html');
    await test('https://www.leagueofgraphs.com/fr/champions/builds/akali/vs-fizz', 'test2.html');
    await test('https://www.leagueofgraphs.com/fr/champions/builds/akali/mid/vs-fizz', 'test3.html');
}
run();
