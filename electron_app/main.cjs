const { app, BrowserWindow, ipcMain, globalShortcut, screen } = require('electron');
const path = require('path');
const fs = require('fs');

// Allow self-signed certs for LCU
app.commandLine.appendSwitch('ignore-certificate-errors');
// Add local relative imports
const lcu = require('./lcu.cjs');
const liveApi = require('./live_api.cjs');
const scraper = require('./scraper.cjs');
const riotApi = require('./riot_api.cjs');

let mainWindow;
let liveWindow;
let draftWindow;
let toastWindow;
let voiceWindow; // New Voice Assistant Window

function createMainWindow() {
    mainWindow = new BrowserWindow({
        width: 1600,
        height: 1000,
        minWidth: 1000,
        minHeight: 700,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false,
            webviewTag: true
        },
        title: 'Oracle',
        backgroundColor: '#1C1C21',
        show: false,
        frame: false,
        autoHideMenuBar: true,
        resizable: false
    });

    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
    const url = isDev ? 'http://localhost:5173' : `file://${path.join(__dirname, '../dist/index.html')}`;

    mainWindow.loadURL(url);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });
}

function createToastWindow() {
    if (toastWindow) return;

    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;

    toastWindow = new BrowserWindow({
        width: 350,
        height: 600, // Slightly taller for more toasts
        x: width - 360,
        y: height - 610,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
        title: 'Oracle Social',
        backgroundColor: '#00000000',
        show: false,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false,
        focusable: false,
        hasShadow: false,
        type: 'toolbar' // Helps desktop placement
    });

    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
    const url = isDev
        ? 'http://localhost:5173?mode=toast'
        : `file://${path.join(__dirname, '../dist/index.html')}?mode=toast`;

    toastWindow.loadURL(url);
    toastWindow.setIgnoreMouseEvents(true, { forward: true });

    // Debug logging
    console.log(`[Main] Toast window loading: ${url}`);
    toastWindow.webContents.on('did-fail-load', (e, errorCode, errorDescription) => {
        console.error(`[Main] Toast window failed to load: ${errorDescription} (${errorCode})`);
    });

    toastWindow.on('closed', () => {
        console.log("[Main] Toast window closed");
        toastWindow = null;
        toastWindowReady = false;
    });

    // Uncomment to debug the toast window directly
    // toastWindow.webContents.openDevTools({ mode: 'detach' });
}

function createLiveWindow() {
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.bounds;
    liveWindow = new BrowserWindow({
        width: width,
        height: height,
        x: 0,
        y: 0,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
        title: 'Oracle Live Game',
        backgroundColor: '#00FFFFFF',
        show: false,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false
    });

    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
    const url = isDev
        ? 'http://localhost:5173?mode=live'
        : `file://${path.join(__dirname, '../dist/index.html')}?mode=live`;

    liveWindow.loadURL(url);
}

function createDraftWindow() {
    draftWindow = new BrowserWindow({
        width: 1400,
        height: 900,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
        title: 'Oracle Draft Sim',
        backgroundColor: '#00FFFFFF',
        show: false,
        frame: false,
        transparent: true,
        autoHideMenuBar: true,
        resizable: false
    });

    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
    const url = isDev
        ? 'http://localhost:5173?mode=draft'
        : `file://${path.join(__dirname, '../dist/index.html')}?mode=draft`;

    draftWindow.loadURL(url);
}

function createVoiceWindow() {
    if (voiceWindow) return;

    voiceWindow = new BrowserWindow({
        width: 400,
        height: 250,
        x: 20,
        y: 20,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
        title: 'Oracle Voice',
        backgroundColor: '#00000000',
        show: true, // Should be visible but small/transparent initially
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false,
        focusable: false,
        type: 'toolbar'
    });

    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
    const url = isDev
        ? 'http://localhost:5173?mode=voice'
        : `file://${path.join(__dirname, '../dist/index.html')}?mode=voice`;

    voiceWindow.loadURL(url);
    voiceWindow.setIgnoreMouseEvents(true, { forward: true });
}

let toastWindowReady = false;
let pendingToasts = [];

ipcMain.on('social:toast-ready', () => {
    console.log("[Main] Toast window marked as READY");
    toastWindowReady = true;
    if (toastWindow && !toastWindow.isDestroyed()) {
        pendingToasts.forEach(data => {
            toastWindow.showInactive();
            toastWindow.setFocusable(false);
            toastWindow.setAlwaysOnTop(true, 'screen-saver');
            toastWindow.webContents.send('social:new-toast', data);
        });
        pendingToasts = [];
    }
});

ipcMain.handle('social:trigger-toast', (event, data) => {
    console.log("[Main] social:trigger-toast called with:", data);

    if (!toastWindow || toastWindow.isDestroyed()) {
        console.log("[Main] Creating toast window...");
        createToastWindow();
    }

    if (!toastWindowReady) {
        console.log("[Main] Queuing toast...");
        pendingToasts.push(data);
    } else {
        toastWindow.showInactive();
        toastWindow.setFocusable(false);
        toastWindow.setAlwaysOnTop(true, 'screen-saver');
        toastWindow.webContents.send('social:new-toast', data);
    }
});

ipcMain.handle('window:minimize', () => {
    const win = BrowserWindow.getFocusedWindow();
    if (win) win.minimize();
});

ipcMain.handle('window:close', () => {
    app.quit();
});

ipcMain.handle('window:show', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.show();
});

ipcMain.handle('window:hide', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.hide();
});

// lazy handlers moved to the bottom of the file

ipcMain.handle('window:set-ignore-mouse-events', (event, ignore, options) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.setIgnoreMouseEvents(ignore, options || { forward: true });
});


ipcMain.handle('lcu:get-summoner-by-puuid', async (_, puuid) => lcu.getSummonerByPuuid(puuid));

ipcMain.handle('lcu:search-summoner', async (_, name, region, skipLcu, puuid) => {
    console.log(`[IPC] search-summoner: name=${name}, region=${region}, skip=${skipLcu}, puuid=${puuid}`);
    if (!skipLcu) {
        if (puuid) {
            let user = await lcu.getSummonerByPuuid(puuid);
            if (user && user.puuid) return user;
        }
        let user = await lcu.getSummonerByName(name);
        if (user && user.puuid) {
            console.log(`[IPC] Found via LCU: ${user.displayName}`);
            return user;
        }
    }

    // RIOT API PRIORITY if key exists
    if (riotApi.apiKey && name.includes('#')) {
        const [gameName, tagLine] = name.split('#');
        const account = await riotApi.getAccountByRiotId(gameName, tagLine, region);
        if (account && account.puuid) {
            const summoner = await riotApi.getSummonerByPuuid(account.puuid, region);
            if (summoner) {
                return {
                    ...summoner,
                    summonerId: summoner.id,
                    gameName: account.gameName,
                    tagLine: account.tagLine,
                    displayName: `${account.gameName}#${account.tagLine}`,
                    region: region
                };
            }
        }
    }

    console.log(`[IPC] Falling back to Scraper for ${name} [${region}]`);
    return scraper.searchSummoner(name, region);
});

let manualUser = null;

ipcMain.handle('manual-login', async (_, { name, tag, region }) => {
    console.log(`[IPC] manual-login: ${name}#${tag} [${region}]`);
    try {
        const query = `${name}#${tag}`;
        const user = await scraper.searchSummoner(query, region);
        if (user) {
            manualUser = { ...user, isManual: true, region };
            console.log("[IPC] Manual login successful:", manualUser.displayName);
            return manualUser;
        }
    } catch (e) {
        console.error("Manual login failed", e);
    }
    return null;
});

ipcMain.handle('lcu:connect', async () => {
    if (manualUser) return true;
    return lcu.connect();
});

ipcMain.handle('lcu:get-current-summoner', async () => {
    if (manualUser) return manualUser;
    return lcu.getCurrentSummoner();
});

ipcMain.handle('scraper:get-meta', async (_, role) => scraper.getChampionMeta(role));
ipcMain.handle('scraper:get-global-ladder', async (_, region) => scraper.getGlobalLadder(region));
ipcMain.handle('scraper:get-champion-build', async (_, name, role) => scraper.getChampionBuild(name, role));
ipcMain.handle('scraper:get-patch-notes', async () => scraper.getPatchNotes());
ipcMain.handle('scraper:get-esports-schedule', async () => scraper.getEsportsSchedule());
ipcMain.handle('scraper:get-esports-news', async () => scraper.getEsportsNews());
ipcMain.handle('scraper:get-top-live-streams', async () => scraper.getTopLiveStreams());
ipcMain.handle('scraper:get-matchup', async (_, champ1, champ2, role) => scraper.getChampionBuild(champ1, champ2, role));
ipcMain.handle('scraper:get-rank-history', async (_, puuid, region) => scraper.getRankHistory(puuid, region));

ipcMain.handle('lcu:get-ranked-stats', async (_, puuid) => {
    if (puuid && puuid.startsWith('ext~')) return scraper.getRankedStats(puuid);
    return lcu.getRankedStats(puuid);
});

ipcMain.handle('lcu:get-challenger-league', async (_, queue) => lcu.getChallengerLeague(queue));
ipcMain.handle('lcu:accept-match', async () => lcu.acceptMatch());

ipcMain.handle('lcu:get-match-history', async (_, puuid, beg, end) => {
    if (puuid && puuid.startsWith('ext~')) return scraper.getMatchHistory(puuid);
    return lcu.getMatchHistory(puuid, beg, end);
});

ipcMain.handle('lcu:get-champion-mastery', async (_, puuid) => {
    if (puuid && puuid.startsWith('ext~')) return [];
    return lcu.getChampionMastery(puuid);
});

ipcMain.handle('lcu:get-game', async (_, gameId) => lcu.getGame(gameId));
ipcMain.handle('lcu:get-timeline', async (_, gameId) => lcu.getTimeline(gameId));
ipcMain.handle('lcu:get-gameflow-phase', async () => lcu.getGameFlowPhase());
ipcMain.handle('lcu:get-champ-select-session', async () => lcu.getChampSelectSession());
ipcMain.handle('lcu:get-gameflow-session', async () => lcu.getGameFlowSession());
ipcMain.handle('lcu:get-friends', async () => lcu.getFriends());
ipcMain.handle('lcu:get-conversations', async () => lcu.getConversations());
ipcMain.handle('lcu:get-conversation-messages', async (_, id) => lcu.getConversationMessages(id));
ipcMain.handle('lcu:send-message', async (_, { id, body }) => lcu.sendMessage(id, body));
ipcMain.handle('lcu:mark-messages-as-read', async (_, id) => lcu.markMessagesAsRead(id));
ipcMain.handle('lcu:spectate', async (_, puuid) => lcu.spectate(puuid));
ipcMain.handle('lcu:get-replay-metadata', async (_, gameId) => lcu.getReplayMetadata(gameId));
ipcMain.handle('lcu:watch-replay', async (_, gameId) => lcu.watchReplay(gameId));
ipcMain.handle('lcu:download-replay', async (_, { gameId, platformId }) => lcu.downloadReplay(gameId, platformId));

ipcMain.handle('lcu:get-owned-skins', async (_, summonerId) => lcu.getOwnedSkins(summonerId));
ipcMain.handle('lcu:get-owned-wards', async (_, summonerId) => lcu.getOwnedWards(summonerId));
ipcMain.handle('lcu:get-owned-icons', async (_, summonerId) => lcu.getOwnedIcons(summonerId));

ipcMain.handle('live:get-all-data', async () => liveApi.getAllGameData());
ipcMain.handle('live:get-active-player', async () => liveApi.getActivePlayer());
ipcMain.handle('live:get-player-list', async () => liveApi.getPlayerList());

ipcMain.handle('riot:get-match-history', async (_, { puuid, region, count }) => riotApi.getMatchHistory(puuid, region, count));
ipcMain.handle('riot:get-match-details', async (_, { matchId, region }) => riotApi.getMatchDetails(matchId, region));
ipcMain.handle('riot:get-league-entries', async (_, { summonerId, region }) => riotApi.getLeagueEntries(summonerId, region));

// lazy handler moved to the bottom of the file

ipcMain.handle('app:get-auto-launch', () => app.getLoginItemSettings().openAtLogin);
ipcMain.handle('app:set-auto-launch', (_, open) => {
    app.setLoginItemSettings({ openAtLogin: open, path: app.getPath('exe') });
    return app.getLoginItemSettings().openAtLogin;
});

ipcMain.handle('app:register-shortcut', () => {
    try {
        globalShortcut.unregisterAll();
        globalShortcut.register('Control+H', () => {
            if (liveWindow) {
                if (liveWindow.isVisible()) liveWindow.hide();
                else { liveWindow.show(); liveWindow.setIgnoreMouseEvents(true, { forward: true }); }
            }
        });
        globalShortcut.register('Alt+O', () => { if (liveWindow) liveWindow.webContents.send('shortcut:toggle-winrate'); });
        globalShortcut.register('Control+X', () => { if (liveWindow) liveWindow.isVisible() ? liveWindow.hide() : liveWindow.show(); });
        return true;
    } catch (e) {
        console.error("Shortcut registration failed", e);
        return false;
    }
});

const SETTINGS_PATH = path.join(path.join(app.getPath('userData'), 'settings.json'));

const getSettings = () => {
    try {
        if (fs.existsSync(SETTINGS_PATH)) return JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf-8'));
    } catch (e) { console.error(e); }
    return {};
};

ipcMain.handle('app:get-settings', () => getSettings());

ipcMain.handle('app:set-settings', (_, settings) => {
    try {
        fs.writeFileSync(SETTINGS_PATH, JSON.stringify(settings, null, 2));
        if (settings.riotApiKey) riotApi.setKey(settings.riotApiKey);
        return true;
    } catch (e) { console.error(e); return false; }
});

ipcMain.on('settings:updated', (_, settings) => {
    BrowserWindow.getAllWindows().forEach(win => {
        if (win.webContents.id !== _.sender.id && !win.isDestroyed()) { win.webContents.send('settings:sync', settings); }
    });
});

// --- CHAMP SELECT AUTOMATION ---
let lastPhase = null;
let lastLockedChampId = 0;
let champMap = {};

async function updateChampMap() {
    try {
        const summoner = await lcu.getCurrentSummoner();
        if (!summoner) return;
        const champs = await lcu._request('GET', `/lol-champions/v1/inventories/${summoner.summonerId}/champions-minimal`);
        if (champs && Array.isArray(champs)) {
            champs.forEach(c => champMap[c.id] = c.name);
        }
    } catch (e) { console.error("[Monitor] Failed to update champ map", e); }
}

async function getPerkMapping() {
    const perks = await lcu._request('GET', '/lol-perks/v1/perks');
    const styles = await lcu._request('GET', '/lol-perks/v1/styles');
    return { perks, styles };
}

async function monitorGameLoop() {
    try {
        const phase = await lcu.getGameFlowPhase();
        if (!phase) return;

        if (phase !== lastPhase) {
            console.log(`[Monitor] Phase changed: ${lastPhase} -> ${phase}`);
            lastPhase = phase;
            if (mainWindow && !mainWindow.isDestroyed()) {
                mainWindow.webContents.send('lcu:phase-changed', phase);
            }
            if (phase === 'ChampSelect') await updateChampMap();
            else lastLockedChampId = 0; // Reset
        }

        if (phase === 'ChampSelect') {
            const session = await lcu.getChampSelectSession();
            if (!session) return;

            const me = session.myTeam.find(p => p.cellId === session.localPlayerCellId);
            if (!me) {
                if (session.localPlayerCellId === undefined) console.log("[Monitor] localPlayerCellId is undefined");
                return;
            }

            // AUTO ACCEPT
            if (session.timer.phase === 'PLANNING' && !me.championId) {
                // Potential auto-accept logic if not in session? 
                // The acceptMatch is usually handled by frontend but we can reinforce it.
            }

            if (me.championId > 0 && me.championId !== lastLockedChampId) {
                console.log(`[Monitor] Champion Change Detected: ${me.championId} (${champMap[me.championId] || 'Unknown'})`);
                lastLockedChampId = me.championId;

                const settings = getSettings();
                console.log(`[Monitor] Current Settings: Flash=${settings.flashPosition}, AutoRunes=${settings.autoImportRunes}`);

                const champName = champMap[me.championId];
                if (!champName) {
                    console.log("[Monitor] Champion name not found in map, skipping automation.");
                    return;
                }

                // 1. FLASH POSITIONING
                if (settings.flashPosition) {
                    const FLASH_ID = 4;
                    try {
                        if (settings.flashPosition === 'D' && me.spell1Id !== FLASH_ID) {
                            console.log("[Monitor] Moving Flash to D...");
                            await lcu.setSummonerSpells(FLASH_ID, me.spell2Id === FLASH_ID ? 21 : me.spell2Id);
                        } else if (settings.flashPosition === 'F' && me.spell2Id !== FLASH_ID) {
                            console.log("[Monitor] Moving Flash to F...");
                            await lcu.setSummonerSpells(me.spell1Id === FLASH_ID ? 21 : me.spell1Id, FLASH_ID);
                        }
                    } catch (err) { console.error("[Monitor] Flash Swap Failed:", err.message); }
                }

                // 2. AUTO RUNES
                if (settings.autoImportRunes) {
                    console.log(`[Monitor] Importing runes for ${champName}...`);
                    try {
                        const build = await scraper.getChampionBuild(champName, 'mid');
                        if (build && build.runes) {
                            const { perks, styles } = await getPerkMapping();

                            const findStyleId = (name) => styles.find(s => s.name.toLowerCase() === name.toLowerCase())?.id;
                            const findPerkId = (name) => perks.find(p => p.name.toLowerCase().replace(/[^a-z]/g, '') === name.toLowerCase().replace(/[^a-z]/g, ''))?.id;

                            const primaryStyleId = findStyleId(build.runes.path);
                            const selectedPerkIds = build.runes.active.map(name => findPerkId(name)).filter(id => id);

                            if (primaryStyleId && selectedPerkIds.length >= 4) {
                                const pages = await lcu.getRunePages();
                                const oraclePage = pages.find(p => p.name.startsWith('Oracle'));

                                const pageData = {
                                    name: `Oracle (${champName})`,
                                    primaryStyleId: primaryStyleId,
                                    subStyleId: styles.find(s => s.id !== primaryStyleId)?.id || styles[0].id,
                                    selectedPerkIds: selectedPerkIds.slice(0, 9),
                                    current: true
                                };

                                if (oraclePage) {
                                    console.log(`[Monitor] Updating existing Oracle page (${oraclePage.id})...`);
                                    await lcu.putRunePage(oraclePage.id, pageData);
                                } else {
                                    console.log("[Monitor] Creating new Oracle page...");
                                    await lcu.postRunePage(pageData);
                                }
                                console.log(`[Monitor] Runes successfully imported for ${champName}`);
                            } else {
                                console.log("[Monitor] Could not find sufficient perk IDs for import.");
                            }
                        }
                    } catch (err) { console.error("[Monitor] Rune Import Failed:", err.message); }
                }
            }
        }
    } catch (e) {
        if (e.message && !e.message.includes('404')) console.error("[Monitor] Loop Error:", e.message);
    }
}

// Start loop
setInterval(monitorGameLoop, 3000);

app.whenReady().then(() => {
    const { session } = require('electron');

    session.defaultSession.setPermissionRequestHandler((webContents, permission, callback) => {
        callback(true); // Auto-approve all permissions, especially 'media' for microphone
    });
    session.defaultSession.setPermissionCheckHandler((webContents, permission) => {
        return true;
    });

    const settings = getSettings();
    if (settings.riotApiKey) riotApi.setKey(settings.riotApiKey);

    createMainWindow();
    createToastWindow();
    createVoiceWindow(); // Auto-start the voice listener window

    globalShortcut.register('CommandOrControl+X', () => {
        if (!liveWindow) createLiveWindow();
        else {
            if (liveWindow.isVisible()) liveWindow.hide();
            else { liveWindow.show(); liveWindow.focus(); }
        }
    });

    app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createMainWindow(); });
});

ipcMain.handle('app:show-live', () => {
    if (!liveWindow) createLiveWindow();
    else {
        liveWindow.show();
        liveWindow.setIgnoreMouseEvents(true, { forward: true });
    }
});

ipcMain.handle('app:hide-live', () => {
    if (liveWindow && !liveWindow.isDestroyed()) liveWindow.hide();
});

ipcMain.handle('app:open-draft', () => {
    if (!draftWindow) createDraftWindow();
    else draftWindow.show();
});

// --- Discord Rich Presence ---
const DiscordRPC = require('discord-rpc');
// Vous devez remplacer ce clientId par celui de votre application créée sur le Discord Developer Portal 
// (nommée "Oracle : LOL TRACKER") pour que ça affiche le bon titre complet en haut.
const clientId = '1477019062658924756';
DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

rpc.on('ready', () => {
    console.log('[Discord RPC] Connected and ready');
    try {
        rpc.setActivity({
            details: 'V1.0.0',
            startTimestamp,
            largeImageKey: 'oracle_logo', // L'asset devra s'appeler 'oracle_logo' sur Discord
            largeImageText: 'Oracle',
            instance: false,
            buttons: [
                { label: 'Voir le site Web', url: 'https://oracle.tekao.fr' }
            ]
        });
    } catch (err) {
        console.error('[Discord RPC] Error setting activity:', err);
    }
});

// Tentative de connexion (Silencieux si Discord n'est pas ouvert ou ID invalide)
rpc.login({ clientId }).catch(err => console.log('[Discord RPC] Could not connect:', err.message));

app.on('will-quit', () => { globalShortcut.unregisterAll(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
