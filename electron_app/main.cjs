const { app, BrowserWindow, ipcMain, globalShortcut, screen } = require('electron');
const { autoUpdater } = require("electron-updater");
const path = require('path');
const fs = require('fs');

// Allow self-signed certs for LCU
app.commandLine.appendSwitch('ignore-certificate-errors');

// Add local relative imports
const lcu = require('./lcu.cjs');
const liveApi = require('./live_api.cjs');
const scraper = require('./scraper.cjs');

let mainWindow;
let liveWindow;
let draftWindow;

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

ipcMain.handle('lcu:connect', async () => lcu.connect());
ipcMain.handle('lcu:get-current-summoner', async () => lcu.getCurrentSummoner());
ipcMain.handle('lcu:get-summoner-by-puuid', async (_, puuid) => lcu.getSummonerByPuuid(puuid));

ipcMain.handle('lcu:search-summoner', async (_, name, region, skipLcu, puuid) => {
    if (!skipLcu) {
        if (puuid) {
            let user = await lcu.getSummonerByPuuid(puuid);
            if (user && user.puuid) return user;
        }
        let user = await lcu.getSummonerByName(name);
        if (user && user.puuid) return user;
    }
    return scraper.searchSummoner(name, region);
});

ipcMain.handle('scraper:get-meta', async (_, role) => scraper.getChampionMeta(role));
ipcMain.handle('scraper:get-global-ladder', async () => scraper.getGlobalLadder());
ipcMain.handle('scraper:get-patch-notes', async () => scraper.getPatchNotes());
ipcMain.handle('scraper:get-champion-build', async (_, name, role) => scraper.getChampionBuild(name, role));

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

const SETTINGS_PATH = path.join(app.getPath('userData'), 'settings.json');

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
    createMainWindow();

    // --- AUTO UPDATER ---
    autoUpdater.checkForUpdatesAndNotify();

    autoUpdater.on('update-available', () => {
        console.log('[Updater] Update available.');
    });

    autoUpdater.on('update-downloaded', () => {
        console.log('[Updater] Update downloaded; will install now.');
        autoUpdater.quitAndInstall();
    });

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

app.on('will-quit', () => { globalShortcut.unregisterAll(); });
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
