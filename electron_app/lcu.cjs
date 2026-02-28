const { authenticate, DEPRECATED_request: request } = require('league-connect');

class LCUConnector {
    constructor() {
        this.credentials = null;
    }

    async connect() {
        if (this.credentials) return true;
        if (this.connecting) return this.connecting;

        this.connecting = (async () => {
            try {
                this.credentials = await authenticate({
                    awaitConnection: true,
                    pollInterval: 5000
                });
                console.log('[LCU] Connected to League Client');
                this.connecting = null;
                return true;
            } catch (e) {
                console.error('[LCU] Connection failed', e);
                this.connecting = null;
                return false;
            }
        })();

        return this.connecting;
    }

    async _request(method, url, body = null) {
        if (!this.credentials) {
            const connected = await this.connect();
            if (!connected) return null;
        }
        try {
            const res = await request({ method, url, body }, this.credentials);
            if (res.status === 204) return null;

            const text = await res.text();
            try {
                return text ? JSON.parse(text) : null;
            } catch (ignore) {
                return null;
            }
        } catch (e) {
            if (e.response && e.response.status === 404) return null;
            if (e.code === 'ECONNREFUSED') {
                console.error(`[LCU] Connection refused on ${method} ${url}. Client may be closed. Resetting credentials.`);
                this.credentials = null;
                return null;
            }
            console.error(`[LCU] Request failed: ${method} ${url}`, e.message || e);
            return null;
        }
    }

    async getCurrentSummoner() { return this._request('GET', '/lol-summoner/v1/current-summoner'); }
    async getSummonerByName(name) {
        // Optimization: Check friends list first for "potes"
        try {
            const friends = await this.getFriends();
            if (friends && Array.isArray(friends)) {
                // Friends have logic like gameName, gameTag, name...
                const cleanName = name.replace(/\s+/g, '').toLowerCase();
                const target = friends.find(f => {
                    const fName = (f.gameName || f.name || "").replace(/\s+/g, '').toLowerCase();
                    const fTag = (f.gameTag || "").toLowerCase();
                    const fFull = `${fName}#${fTag}`;

                    // Match "Name" or "Name#Tag"
                    if (cleanName.includes('#')) return fFull === cleanName;
                    return fName === cleanName;
                });

                if (target) {
                    // Friend object might not have all summoner fields (like puuid it has, but maybe not accountId?)
                    // Usually has puuid, summonerId. 
                    // Let's ensure we return consistent structure.
                    return {
                        ...target,
                        displayName: `${target.gameName}#${target.gameTag}`,
                        profileIconId: target.icon, // friends list uses 'icon'
                        summonerLevel: 0 // Friends list often doesn't show level if offline
                    };
                    // Better to fetch full profile using PUUID if found
                    // return this._request('GET', `/lol-summoner/v1/summoners/puuid/${target.puuid}`);
                }
            }
        } catch (e) {
            // Ignore friends list error
        }

        if (name && name.includes('#')) {
            const [gameName, tagLine] = name.split('#');
            console.log(`[LCU] Searching by Tag: ${gameName}#${tagLine}`);

            // Try Standard "v1" Name + Tagline
            // Note: The endpoint is often "/lol-summoner/v1/summoners" with query params in newer clients
            // or "/lol-summoner/v1/summoners/by-name-and-tagline" (deprecated/moved)
            // Let's try the modern standard query first:

            // ATTEMPT 1: POST to lookup (often required for new Riot ID)
            // Some versions require this specific endpoint for lookup
            try {
                // This payload works on many client versions for cross-check
                const res = await this._request('POST', '/lol-summoner/v2/summoners/names', [{ gameName, tagLine }]);
                if (res && res.length > 0 && res[0].puuid) {
                    console.log(`[LCU] Found (v2 POST): ${res[0].gameName}`);
                    return res[0];
                }
            } catch (e) { }

            // ATTEMPT 2: GET by-alias (often maps to GameName #Tag)
            try {
                // This endpoint sometimes handles the format "Name#Tag" directly
                const res = await this._request('GET', `/lol-summoner/v1/summoners/by-name/${encodeURIComponent(name)}`);
                if (res && res.puuid) return res;
            } catch (e) { }

            console.log(`[LCU] Tag search failed for ${name}`);
        }
        console.log(`[LCU] Falling back to by-name for: ${name}`);
        // 1. Try by-name (Old/Standard)
        const byName = await this._request('GET', `/lol-summoner/v1/summoners/by-name/${encodeURIComponent(name)}`);
        if (byName) return byName;

        // 2. If blocked/failed, try guessing tag based on current region context? 
        // We don't easily know current region here without asking API.
        // Let's try to fetch current summoner to get region? No, too slow.
        // Let's just return null and let scraper handle it, OR try common tags.
        // Actually, for Riot ID, "Name" without tag is ambiguous. 
        // We will return null here to allow fallback to scraper, BUT we should try appending the likely tag if possible.
        return null;
    }

    async getSummonerByPuuid(puuid) { return this._request('GET', `/lol-summoner/v1/summoners/puuid/${puuid}`); }
    async getRankedStats(puuid) { return this._request('GET', `/lol-ranked/v1/ranked-stats/${puuid}`); }
    async getChallengerLeague(queue = 'RANKED_SOLO_5x5') { return this._request('GET', `/lol-ranked/v1/challenger-league/${queue}`); }
    async acceptMatch() { return this._request('POST', '/lol-matchmaking/v1/ready-check/accept'); }
    async getMatchHistory(puuid, beg = 0, end = 20) { return this._request('GET', `/lol-match-history/v1/products/lol/${puuid}/matches?begIndex=${beg}&endIndex=${end}`); }
    async getChampionMastery(puuid) { return this._request('GET', `/lol-collections/v1/inventories/${puuid}/champion-mastery`); }
    async getGame(gameId) { return this._request('GET', `/lol-match-history/v1/games/${gameId}`); }
    async getTimeline(gameId) { return this._request('GET', `/lol-match-history/v1/games/${gameId}/timeline`); }
    async getGameFlowPhase() { return this._request('GET', '/lol-gameflow/v1/gameflow-phase'); }
    async getChampSelectSession() { return this._request('GET', '/lol-champ-select/v1/session'); }
    async getGameFlowSession() { return this._request('GET', '/lol-gameflow/v1/session'); }
    async getFriends() { return this._request('GET', '/lol-chat/v1/friends'); }
    async getConversations() { return this._request('GET', '/lol-chat/v1/conversations'); }
    async getConversationMessages(id) { return this._request('GET', `/lol-chat/v1/conversations/${id}/messages`); }
    async sendMessage(id, body) { return this._request('POST', `/lol-chat/v1/conversations/${id}/messages`, { body: body, type: 'chat' }); }
    async markMessagesAsRead(id) { return this._request('POST', `/lol-chat/v1/conversations/${id}/messages/mark-as-read`); }
    async spectate(puuid) { return this._request('POST', `/lol-spectator/v1/spectate/launch-spectator-by-puuid/${puuid}`); }
    async getReplayMetadata(gameId) { return this._request('GET', `/lol-replays/v1/metadata/${gameId}`); }
    async watchReplay(gameId) { return this._request('POST', `/lol-replays/v1/rofls/${gameId}/watch`); }
    async downloadReplay(gameId, platformId) { return this._request('POST', `/lol-replays/v1/rofls/${gameId}/download/data`, { componentId: 'replays', platformId }); }

    // Spells & Runes
    async setSummonerSpells(spell1Id, spell2Id) {
        return this._request('PATCH', '/lol-champ-select/v1/session/my-selection', { spell1Id, spell2Id });
    }

    async getRunePages() {
        return this._request('GET', '/lol-perks/v1/pages');
    }

    async deleteRunePage(id) {
        return this._request('DELETE', `/lol-perks/v1/pages/${id}`);
    }

    async postRunePage(data) {
        return this._request('POST', '/lol-perks/v1/pages', data);
    }

    async putRunePage(id, data) {
        return this._request('PUT', `/lol-perks/v1/pages/${id}`, data);
    }

    async getCurrentRunePage() {
        return this._request('GET', '/lol-perks/v1/current-page');
    }

    async setCurrentRunePage(id) {
        return this._request('PUT', '/lol-perks/v1/current-page', id);
    }

    // Collections
    async getOwnedSkins(summonerId) {
        try {
            console.log(`[LCU] Fetching skins (full) for summonerId: ${summonerId} (Type: ${typeof summonerId})`);
            const res = await this._request('GET', `/lol-champions/v1/inventories/${summonerId}/skins`);

            if (!res) throw new Error("Response is null");

            // VALIDATION: Must be an array
            if (!Array.isArray(res)) {
                console.warn(`[LCU] Full skins response is NOT an array. Type: ${typeof res}. Preview: ${JSON.stringify(res).substring(0, 100)}`);
                throw new Error("Response is not an array");
            }

            if (res.length === 0) console.warn("[LCU] Full skins response is empty array.");

            console.log(`[LCU] Skins (full) success. Count: ${res.length}`);
            return res;
        } catch (e) {
            console.warn(`[LCU] Full skins fetch failed (${e.message}), falling back to minimal.`);
            console.log(`[LCU] Fetching skins (minimal) for summonerId: ${summonerId}`);
            try {
                const res = await this._request('GET', `/lol-champions/v1/inventories/${summonerId}/skins-minimal`);
                console.log(`[LCU] Skins (minimal) response type: ${Array.isArray(res) ? 'Array' : typeof res}, Length: ${Array.isArray(res) ? res.length : 'N/A'}`);
                return res;
            } catch (innerErr) {
                console.error("[LCU] Minimal skins fetch also failed", innerErr);
                return [];
            }
        }
    }
    async getOwnedWards(summonerId) {
        console.log(`[LCU] Fetching wards for summonerId: ${summonerId}`);
        const res = await this._request('GET', `/lol-collections/v1/inventories/${summonerId}/ward-skins`);
        console.log(`[LCU] Wards response length: ${Array.isArray(res) ? res.length : 'N/A'}`);
        return res;
    }
    async getOwnedIcons(summonerId) {
        console.log(`[LCU] Fetching icons for summonerId: ${summonerId}`);
        const res = await this._request('GET', `/lol-collections/v1/inventories/${summonerId}/summoner-icons`);
        console.log(`[LCU] Icons response length: ${Array.isArray(res) ? res.length : 'N/A'}`);
        return res;
    }
}

module.exports = new LCUConnector();
