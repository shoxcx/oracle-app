
const https = require('https');

https.get('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/ward-skins.json', (resp) => {
    let data = '';

    // A chunk of data has been received.
    resp.on('data', (chunk) => {
        data += chunk;
    });

    // The whole response has been received.
    resp.on('end', () => {
        try {
            const json = JSON.parse(data);
            console.log("Total Wards in Metadata:", json.length);
            console.log("First 3 entries:");
            console.log(JSON.stringify(json.slice(0, 3), null, 2));

            // Check entry for ID 64 (common ward)
            const w64 = json.find(w => w.id == 64);
            console.log("Ward 64:", w64);

        } catch (e) {
            console.error(e);
        }
    });

}).on("error", (err) => {
    console.log("Error: " + err.message);
});
