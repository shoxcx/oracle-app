const https = require('https');

class LiveGameConnector {
    constructor() {
        this.baseUrl = 'https://127.0.0.1:2999/liveclientdata';
    }

    async request(endpoint) {
        return new Promise((resolve) => {
            const options = { rejectUnauthorized: false };
            const req = https.get(`${this.baseUrl}${endpoint}`, options, (res) => {
                let data = '';
                res.on('data', chunk => data += chunk);
                res.on('end', () => {
                    try {
                        resolve(res.statusCode === 200 ? JSON.parse(data) : null);
                    } catch (e) { resolve(null); }
                });
            });
            req.on('error', () => resolve(null));
        });
    }

    async getAllGameData() { return this.request('/allgamedata'); }
    async getActivePlayer() { return this.request('/activeplayer'); }
    async getPlayerList() { return this.request('/playerlist'); }
}

module.exports = new LiveGameConnector();
