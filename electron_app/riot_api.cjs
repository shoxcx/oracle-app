const axios = require('axios');

class RiotAPI {
    constructor() {
        this.apiKey = '';
    }

    setKey(key) {
        this.apiKey = key;
    }

    // Mapping of region names to Riot Platform IDs
    getPlatformId(region) {
        const mapping = {
            'br': 'br1',
            'eune': 'eun1',
            'euw': 'euw1',
            'jp': 'jp1',
            'kr': 'kr',
            'lan': 'la1',
            'las': 'la2',
            'na': 'na1',
            'oce': 'oc1',
            'tr': 'tr1',
            'ru': 'ru',
            'ph': 'ph2',
            'sg': 'sg2',
            'th': 'th2',
            'tw': 'tw2',
            'vn': 'vn2'
        };
        return mapping[region.toLowerCase()] || 'euw1';
    }

    // Mapping of region names to Riot Routing Values (Americas, Asia, Europe, Sea)
    getRoutingValue(region) {
        const regionLower = region.toLowerCase();
        if (['na', 'br', 'lan', 'las'].includes(regionLower)) return 'americas';
        if (['kr', 'jp'].includes(regionLower)) return 'asia';
        if (['euw', 'eune', 'tr', 'ru'].includes(regionLower)) return 'europe';
        if (['oce', 'ph', 'sg', 'th', 'tw', 'vn'].includes(regionLower)) return 'sea';
        return 'europe';
    }

    async request(platform, endpoint) {
        if (!this.apiKey) return null;
        const host = platform.includes('.') ? platform : `${platform}.api.riotgames.com`;
        const url = `https://${host}${endpoint}`;
        try {
            const res = await axios.get(url, {
                headers: { 'X-Riot-Token': this.apiKey }
            });
            return res.data;
        } catch (e) {
            console.error(`[RiotAPI] Request failed: ${url}`, e.message);
            return null;
        }
    }

    async getAccountByRiotId(gameName, tagLine, region = 'euw') {
        const routing = this.getRoutingValue(region);
        return this.request(routing, `/riot/account/v1/accounts/by-riot-id/${encodeURIComponent(gameName)}/${encodeURIComponent(tagLine)}`);
    }

    async getSummonerByPuuid(puuid, region = 'euw') {
        const platform = this.getPlatformId(region);
        return this.request(platform, `/lol/summoner/v4/summoners/by-puuid/${puuid}`);
    }

    async getLeagueEntries(summonerId, region = 'euw') {
        const platform = this.getPlatformId(region);
        return this.request(platform, `/lol/league/v4/entries/by-summoner/${summonerId}`);
    }

    async getMatchHistory(puuid, region = 'euw', count = 20) {
        const routing = this.getRoutingValue(region);
        return this.request(routing, `/lol/match/v5/matches/by-puuid/${puuid}/ids?start=0&count=${count}`);
    }

    async getMatchDetails(matchId, region = 'euw') {
        const routing = this.getRoutingValue(region);
        return this.request(routing, `/lol/match/v5/matches/${matchId}`);
    }
}

module.exports = new RiotAPI();
