const { app, BrowserWindow, ipcMain, globalShortcut, screen, shell, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
const fs = require('fs');

process.on('uncaughtException', (err) => {
    if (err.code === 'EPIPE') {
        // Ignore broken pipe errors which can crash the app when console.log/warn writes to a closed stdout
        return;
    }
    console.error('Uncaught Exception:', err);
});

// Ignore stdout and stderr EPIPE errors
if (process.stdout && process.stdout.on) {
    process.stdout.on('error', (err) => {
        if (err.code !== 'EPIPE') console.error('stdout error:', err);
    });
}
if (process.stderr && process.stderr.on) {
    process.stderr.on('error', (err) => {
        if (err.code !== 'EPIPE') console.error('stderr error:', err);
    });
}

// Set AppUserModelId to ensure correct taskbar icon in Windows (even in dev)
app.setAppUserModelId("com.oracle.app");

// Allow self-signed certs for LCU
app.commandLine.appendSwitch('ignore-certificate-errors');
// Add local relative imports
const lcu = require('./lcu.cjs');
const liveApi = require('./live_api.cjs');
const scraper = require('./scraper.cjs');
const riotApi = require('./riot_api.cjs');

let tray = null;
let isAppQuitting = false;

let mainWindow;
let liveWindow;
let draftWindow;
let toastWindow;
let voiceWindow; // New Voice Assistant Window
let musicWindow; // Music Overlay
let ingameWindow; // InGame Helper Overlay
const media = require('./media.cjs');

async function fadeOutAndHide(win) {
    if (!win || win.isDestroyed()) return;
    for (let i = 1; i >= 0; i -= 0.1) {
        if (win.isDestroyed()) return;
        win.setOpacity(Math.max(0, i));
        await new Promise(r => setTimeout(r, 15));
    }
    if (!win.isDestroyed()) {
        win.hide();
        win.setOpacity(1);
    }
}

async function fadeOutAndMinimize(win) {
    if (!win || win.isDestroyed()) return;
    for (let i = 1; i >= 0; i -= 0.1) {
        if (win.isDestroyed()) return;
        win.setOpacity(Math.max(0, i));
        await new Promise(r => setTimeout(r, 15));
    }
    if (!win.isDestroyed()) {
        win.minimize();
        setTimeout(() => { if (!win.isDestroyed()) win.setOpacity(1); }, 500);
    }
}

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
        icon: path.join(__dirname, '../public/oracle-logo.png'),
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

    mainWindow.on('close', (event) => {
        if (!isAppQuitting) {
            event.preventDefault();
            
            let settings = {};
            let SETTINGS_PATH = '';
            try {
                const path = require('path');
                const fs = require('fs');
                SETTINGS_PATH = path.join(app.getPath('userData'), 'settings.json');
                if (fs.existsSync(SETTINGS_PATH)) settings = JSON.parse(fs.readFileSync(SETTINGS_PATH, 'utf-8'));
            } catch(e) {}

            const behavior = settings.closeBehavior || 'ask';

            if (behavior === 'close') {
                isAppQuitting = true;
                app.quit();
            } else if (behavior === 'minimize') {
                fadeOutAndHide(mainWindow);
            } else {
                mainWindow.webContents.send('show-quit-modal');
            }
        }
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
        y: 40,
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

ipcMain.handle('window:hide-toast', () => {
    if (toastWindow && !toastWindow.isDestroyed()) {
        fadeOutAndHide(toastWindow);
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
    if (win) fadeOutAndMinimize(win);
});

ipcMain.handle('window:close', () => {
    if (mainWindow && !mainWindow.isDestroyed()) {
        mainWindow.close();
    }
});

ipcMain.handle('window:show', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) win.show();
});

ipcMain.handle('window:hide', (event) => {
    const win = BrowserWindow.fromWebContents(event.sender);
    if (win) fadeOutAndHide(win);
});

function createMusicWindow() {
    if (musicWindow) return;
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.workAreaSize;
    musicWindow = new BrowserWindow({
        width: 360,
        height: 170,
        x: 20,
        y: height - 190, // Bottom left corner
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
        title: 'Oracle Music',
        backgroundColor: '#00000000',
        show: false,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false,
        focusable: false,
        hasShadow: false,
        type: 'toolbar'
    });

    musicWindow.setIgnoreMouseEvents(false); // Music overlay needs clicks

    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
    const url = isDev
        ? 'http://localhost:5173?mode=music'
        : `file://${path.join(__dirname, '../dist/index.html')}?mode=music`;

    musicWindow.loadURL(url);
    musicWindow.setAlwaysOnTop(true, 'screen-saver');

    musicWindow.on('closed', () => {
        musicWindow = null;
    });
}

ipcMain.handle('window:toggle-music', (e, enable) => {
    if (enable) {
        if (!musicWindow) createMusicWindow();
        musicWindow.showInactive();
    } else {
        if (musicWindow) {
            fadeOutAndHide(musicWindow).then(() => {
                if (musicWindow && !musicWindow.isDestroyed()) musicWindow.close();
            });
        }
    }
});

function createInGameWindow() {
    if (ingameWindow) return;
    const primaryDisplay = screen.getPrimaryDisplay();
    const { width, height } = primaryDisplay.bounds;
    ingameWindow = new BrowserWindow({
        width: width,
        height: height,
        x: 0,
        y: 0,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            webSecurity: false
        },
        title: 'Oracle InGame',
        backgroundColor: '#00000000',
        show: false,
        frame: false,
        transparent: true,
        alwaysOnTop: true,
        skipTaskbar: true,
        resizable: false,
        focusable: false,
        hasShadow: false,
        type: 'toolbar'
    });

    ingameWindow.setIgnoreMouseEvents(true);

    const isDev = process.env.NODE_ENV === 'development' || !app.isPackaged;
    const url = isDev ? 'http://localhost:5173?mode=ingame' : `file://${path.join(__dirname, '../dist/index.html')}?mode=ingame`;

    ingameWindow.loadURL(url);
    ingameWindow.setAlwaysOnTop(true, 'screen-saver');

    ingameWindow.on('closed', () => {
        ingameWindow = null;
    });
}

ipcMain.handle('window:toggle-ingame', (e, enable, data) => {
    if (enable) {
        if (!ingameWindow) createInGameWindow();
        ingameWindow.showInactive();
        if (data) ingameWindow.webContents.send('ingame:update', data);
    } else if (ingameWindow && !ingameWindow.isDestroyed()) {
        fadeOutAndHide(ingameWindow);
    }
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
ipcMain.handle('scraper:get-esports-rankings', async () => scraper.getEsportsRankings());
ipcMain.handle('scraper:get-top-live-streams', async () => scraper.getTopLiveStreams());
ipcMain.handle('scraper:get-matchup', async (_, champ1, champ2, role) => scraper.getMatchupAnalysis(champ1, champ2, role));
ipcMain.handle('scraper:get-rank-history', async (_, puuid, region) => scraper.getRankHistory(puuid, region));
ipcMain.handle('scraper:get-lp-history', async (_, name, region) => scraper.getRankedLPHistory(name, region));
ipcMain.handle('scraper:get-recent-lp', async (_, name, region) => scraper.getRecentLPGains(name, region));

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

ipcMain.handle('app:quit', () => {
    isAppQuitting = true;
    app.quit();
});
ipcMain.handle('app:minimize', () => {
    if (mainWindow) fadeOutAndHide(mainWindow);
});

ipcMain.handle('app:open-url', (_, url) => {
    if (url) {
        shell.openExternal(url);
    }
});

ipcMain.handle('app:register-shortcut', (_, winrateShortcut = 'CommandOrControl+X') => {
    console.log(`[IPC] app:register-shortcut called with: ${winrateShortcut}`);
    try {
        globalShortcut.unregisterAll();
        globalShortcut.register('CommandOrControl+H', () => {
            if (liveWindow) {
                if (liveWindow.isVisible()) liveWindow.hide();
                else { liveWindow.show(); liveWindow.setIgnoreMouseEvents(true, { forward: true }); }
            }
        });

        const action = () => {
            console.log(`Shortcut pressed!`);
            if (!ingameWindow || ingameWindow.isDestroyed()) {
                createInGameWindow();
                ingameWindow.webContents.once('did-finish-load', () => {
                    if (!ingameWindow.isVisible()) ingameWindow.showInactive();
                    ingameWindow.webContents.send('shortcut:force-winrate');
                });
            } else {
                if (!ingameWindow.isVisible()) {
                    ingameWindow.showInactive();
                }
                ingameWindow.webContents.send('shortcut:force-winrate');
            }
        };

        globalShortcut.register(winrateShortcut, action);
        // Force a secondary fallback since Control+X is often eaten by Windows or League
        if (winrateShortcut === 'CommandOrControl+X') {
            globalShortcut.register('Alt+X', action);
            globalShortcut.register('CommandOrControl+Shift+X', action);
        }
        return true;
    } catch (e) {
        console.error("Shortcut registration failed", e);
        return false;
    }
});

ipcMain.handle('app:update-winrate-shortcut', (_, keys) => {
    try {
        globalShortcut.unregisterAll();
        globalShortcut.register('CommandOrControl+H', () => {
            if (liveWindow) {
                if (liveWindow.isVisible()) liveWindow.hide();
                else { liveWindow.show(); liveWindow.setIgnoreMouseEvents(true, { forward: true }); }
            }
        });

        const action = () => {
            console.log(`Shortcut pressed!`);
            if (!ingameWindow || ingameWindow.isDestroyed()) {
                createInGameWindow();
                ingameWindow.webContents.once('did-finish-load', () => {
                    if (!ingameWindow.isVisible()) ingameWindow.showInactive();
                    ingameWindow.webContents.send('shortcut:force-winrate');
                });
            } else {
                if (!ingameWindow.isVisible()) {
                    ingameWindow.showInactive();
                }
                ingameWindow.webContents.send('shortcut:force-winrate');
            }
        };

        globalShortcut.register(keys, action);
        if (keys === 'CommandOrControl+X') {
            globalShortcut.register('Alt+X', action);
            globalShortcut.register('CommandOrControl+Shift+X', action);
        }
        return true;
    } catch (e) {
        console.error("Shortcut update failed", e);
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
let lastLockedSpells = { spell1Id: 0, spell2Id: 0 };
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
            if (typeof updateDiscordActivity === 'function') {
                updateDiscordActivity(phase);
            }
            if (phase === 'ChampSelect') await updateChampMap();

            if (phase === 'InProgress') {
                if (!ingameWindow) createInGameWindow();
                ingameWindow.showInactive();

                if (lastLockedChampId) {
                    const champName = champMap[lastLockedChampId];
                    if (champName) {
                        ingameWindow.webContents.send('ingame:update', { champName, spells: lastLockedSpells });
                    }
                } else {
                    ingameWindow.webContents.send('ingame:update', null);
                }
            } else if (!['ChampSelect', 'GameStart', 'InProgress', 'Reconnect', 'WaitingForStats'].includes(phase)) {
                if (ingameWindow && !ingameWindow.isDestroyed() && ingameWindow.isVisible()) {
                    fadeOutAndHide(ingameWindow);
                }
            }

            if (!['ChampSelect', 'GameStart', 'InProgress', 'Reconnect', 'WaitingForStats'].includes(phase)) {
                lastLockedChampId = 0; // Reset
                lastLockedSpells = { spell1Id: 0, spell2Id: 0 };
            }
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
                lastLockedSpells = { spell1Id: me.spell1Id, spell2Id: me.spell2Id };

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

let prevFriendsMap = {};
async function monitorSocialLoop() {
    try {
        const settings = getSettings();
        if (settings.socialOverlayEnabled === false) return;

        const friends = await lcu.getFriends();
        if (!friends || !Array.isArray(friends)) return;

        let anyChanges = false;

        friends.forEach(f => {
            const pid = f.puuid || f.id;
            const prev = prevFriendsMap[pid];
            if (!prev) {
                prevFriendsMap[pid] = {
                    availability: f.availability,
                    gameStatus: f.lol?.gameStatus || ''
                };
            } else {
                let changed = false;
                let toastType = 'general';
                let toastTitle = 'AMI EN LIGNE';
                let toastStatus = '';

                // Connect/Disconnect detection
                if (prev.availability !== f.availability) {
                    if (prev.availability === 'offline' && f.availability !== 'offline') {
                        toastTitle = 'AMI CONNECTÉ';
                        toastType = 'connect';
                        toastStatus = 'Vient de se connecter';
                        changed = true;
                    } else if (prev.availability !== 'offline' && f.availability === 'offline') {
                        toastTitle = 'AMI DÉCONNECTÉ';
                        toastType = 'disconnect';
                        toastStatus = 'Vient de se déconnecter';
                        changed = true;
                    }
                    // For 'away' or 'dnd', we only trigger if not actively jumping into a game state
                    // Because launching a game also forces 'dnd', which we handle in gameStatus checks instead.
                    else if (f.availability === 'away') {
                        toastTitle = 'MODIFICATION STATUT';
                        toastType = 'away';
                        toastStatus = 'Est maintenant absent';
                        changed = true;
                    }
                }

                // In-Game state detection has higher priority
                const currGameStatus = f.lol?.gameStatus || '';
                if (prev.gameStatus !== currGameStatus && currGameStatus !== '') {
                    if (currGameStatus === 'inGame') {
                        toastTitle = 'EN PARTIE';
                        toastType = 'game';
                        toastStatus = 'Vient de lancer une partie';
                        changed = true;
                    } else if (currGameStatus === 'hosting') {
                        toastTitle = 'DANS UN SALON';
                        toastType = 'game';
                        toastStatus = 'Vient de créer un salon';
                        changed = true;
                    } else if (currGameStatus === 'championSelect') {
                        toastTitle = 'SÉLECTION CHAMPIONS';
                        toastType = 'game';
                        toastStatus = 'Dans la sélection des champions';
                        changed = true;
                    } else if (currGameStatus === 'inQueue' || currGameStatus === 'matchmaking') {
                        toastTitle = 'EN RECHERCHE';
                        toastType = 'game';
                        toastStatus = 'En file d\'attente';
                        changed = true;
                    }
                }

                if (changed && toastStatus) {
                    const iconId = f.icon || 1;
                    const iconUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${iconId}.jpg`;
                    const data = {
                        name: f.gameName || f.name,
                        title: toastTitle,
                        status: toastStatus,
                        icon: iconUrl,
                        type: toastType
                    };

                    if (!toastWindow || toastWindow.isDestroyed()) {
                        createToastWindow();
                    }
                    if (!toastWindowReady) {
                        pendingToasts.push(data);
                    } else {
                        toastWindow.showInactive();
                        toastWindow.setFocusable(false);
                        toastWindow.setAlwaysOnTop(true, 'screen-saver');
                        toastWindow.webContents.send('social:new-toast', data);
                    }
                }

                prevFriendsMap[pid] = {
                    availability: f.availability,
                    gameStatus: currGameStatus
                };
            }
        });

    } catch (e) {
        if (e.message && !e.message.includes('404')) console.error("[Monitor] Social Loop Error", e.message);
    }
}

setInterval(monitorSocialLoop, 3000);

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
    createInGameWindow();

    // Create System Tray
    const iconPath = path.join(__dirname, '../src/assets/oracle_logo.png');
    const icon = nativeImage.createFromPath(iconPath).resize({ width: 16, height: 16 });
    tray = new Tray(icon);
    const contextMenu = Menu.buildFromTemplate([
        { label: 'Ouvrir Oracle', click: () => { if (mainWindow) { mainWindow.show(); mainWindow.focus(); } } },
        { type: 'separator' },
        { label: 'Quitter Oracle', click: () => { isAppQuitting = true; app.quit(); } }
    ]);
    tray.setToolTip('Oracle LoL Tracker');
    tray.setContextMenu(contextMenu);
    tray.on('click', () => {
        if (mainWindow) {
            mainWindow.isVisible() ? fadeOutAndHide(mainWindow) : (mainWindow.show() || mainWindow.focus());
        }
    });

    // createVoiceWindow(); // Auto-start the voice listener window

    // Start shortcut registered from App.jsx via app:register-shortcut

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

ipcMain.handle('media:get-track', async () => {
    return await media.getSpotifyTrack();
});

ipcMain.handle('media:run-action', async (e, action) => {
    return await media.runPs(action);
});

ipcMain.handle('media:seek', async (e, targetMs) => {
    const path = require('path');
    const { exec } = require('child_process');
    const scriptPath = path.join(__dirname, 'media_seek.py');
    return new Promise((resolve) => {
        exec(`python "${scriptPath}" ${targetMs}`, (err, stdout) => {
            resolve(!err);
        });
    });
});

// --- Discord Rich Presence ---
const DiscordRPC = require('discord-rpc');
// Vous devez remplacer ce clientId par celui de votre application créée sur le Discord Developer Portal 
// (nommée "Oracle : LOL TRACKER") pour que ça affiche le bon titre complet en haut.
const clientId = '1477019062658924756';
DiscordRPC.register(clientId);
const rpc = new DiscordRPC.Client({ transport: 'ipc' });
const startTimestamp = new Date();

function updateDiscordActivity(phase) {
    if (!rpc) return;
    let detailsTxt = 'Dans les menus';
    if (phase === 'ChampSelect') detailsTxt = 'Sélection des champions';
    else if (phase === 'InProgress' || phase === 'GameStart' || phase === 'InGame' || phase === 'Reconnect') detailsTxt = 'En partie';
    else if (phase === 'Matchmaking') detailsTxt = "En file d'attente";
    else if (phase === 'Lobby') detailsTxt = 'Dans un salon';
    else if (phase === 'EndOfGame') detailsTxt = 'Stats de fin de partie';

    try {
        rpc.setActivity({
            details: detailsTxt,
            state: 'V1.0.0',
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
}

rpc.on('ready', () => {
    console.log('[Discord RPC] Connected and ready');
    updateDiscordActivity(lastPhase || 'None');
});

// Tentative de connexion (Silencieux si Discord n'est pas ouvert ou ID invalide)
rpc.login({ clientId }).catch(err => console.log('[Discord RPC] Could not connect:', err.message));

app.on('will-quit', () => { globalShortcut.unregisterAll(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
