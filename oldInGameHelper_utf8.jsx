import React, { useState, useEffect, useRef } from 'react';
import { Target, Eye, AlertCircle, Sparkles, Map, Skull, Activity, ScanEye, Swords as SwordsIcon } from 'lucide-react';
import MainLogo from '../assets/oracle_logo.png';

const DraggableWidget = ({ id, defaultPosition, children, className }) => {
    const [pos, setPos] = useState(() => {
        try {
            const saved = localStorage.getItem(`oracle_widget_pos_${id}`);
            if (saved) return JSON.parse(saved);
        } catch(e) {}
        return defaultPosition;
    });

    const isDragging = useRef(false);
    const startPos = useRef({ x: 0, y: 0 });

    const handlePointerDown = (e) => {
        isDragging.current = true;
        startPos.current = { x: e.clientX - pos.x, y: e.clientY - pos.y };
        e.currentTarget.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e) => {
        if (!isDragging.current) return;
        setPos({ x: e.clientX - startPos.current.x, y: e.clientY - startPos.current.y });
    };

    const handlePointerUp = (e) => {
        if (!isDragging.current) return;
        isDragging.current = false;
        e.currentTarget.releasePointerCapture(e.pointerId);
        localStorage.setItem(`oracle_widget_pos_${id}`, JSON.stringify(pos));
        if (window.ipcRenderer) window.ipcRenderer.invoke('window:set-ignore-mouse-events', true, { forward: true });
    };

    const handleMouseEnter = () => {
        if (!isDragging.current && window.ipcRenderer) {
            window.ipcRenderer.invoke('window:set-ignore-mouse-events', false);
        }
    };

    const handleMouseLeave = () => {
        if (!isDragging.current && window.ipcRenderer) {
            window.ipcRenderer.invoke('window:set-ignore-mouse-events', true, { forward: true });
        }
    };

    return (
        <div
            className={className}
            style={{ position: 'absolute', left: pos.x, top: pos.y, pointerEvents: 'auto', zIndex: 9999, cursor: isDragging.current ? 'grabbing' : 'grab' }}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </div>
    );
};

export function InGameHelper({ ddragonVersion }) {
    const [toasts, setToasts] = useState([]);
    const [champName, setChampName] = useState("");
    const [buildData, setBuildData] = useState(null);

    const [overlaySettings, setOverlaySettings] = useState({ skillLevelUp: true, wardTimer: true, objectiveTimer: true, inGameStats: true, testMode: false });
    const [liveData, setLiveData] = useState(null);

    // Using refs for properties that are accessed within the setInterval closure
    const stateRefs = useRef({
        isJungle: false,
        skillOrder: null,
        spellIcons: null,
        knownLevel: 0,
        wardNotified: false,
        testModeFired: false,
        objCamp1: false, // Jungle Buffs
        objCamp2: false, // Scuttle Crab
        notifiedSpawns: { drake: -1, baron: -1 },
        objVoidgrubs: false,
        isInitializingChamp: false,
        itemState: { notifiedStarting: false, toastScheduledFor: 0 },
        lastItemsStr: '',
        settings: { skillLevelUp: true, wardTimer: true, objectiveTimer: true, testMode: false },
        ddVersion: ddragonVersion || "14.2.1",
        champ: "",
        hasFetchedBuildForRole: false,
        acquiredItems: new Set(),
        liveData: null,
        lastWinrateTime: 0,
        winrateSpamTriggered: false,
        processedEventsCount: 0
    });

    useEffect(() => {
        if (ddragonVersion) stateRefs.current.ddVersion = ddragonVersion;
    }, [ddragonVersion]);

    const pushToast = (toast) => {
        if (window.ipcRenderer) {
            let sIcon = null;
            if (toast.icon && toast.icon.render) {
                // Approximate lucide component name from the type string
                if (toast.type === 'objective') sIcon = 'Target';
                else if (toast.type === 'winrate') sIcon = 'Activity';
                else if (toast.type === 'test') sIcon = 'Sparkles';
                else if (toast.type === 'warning') sIcon = 'AlertCircle';
                else sIcon = 'Skull';
            }
            window.ipcRenderer.invoke('social:trigger-toast', {
                type: toast.type || 'system',
                title: toast.title,
                name: toast.name,
                status: toast.status,
                lucideName: sIcon,
                letter: toast.letter,
                imageUrl: toast.imageUrl,
                iconColor: toast.iconColor,
                borderColor: toast.borderColor
            });
        }
    };

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        if (!window.ipcRenderer) return;

        // Load correct settings directly from shared localStorage if possible
        try {
            const saved = localStorage.getItem('oracle_overlay_settings');
            if (saved) {
                const parsed = JSON.parse(saved);
                setOverlaySettings(parsed);
                stateRefs.current.settings = parsed;
            }
        } catch (e) {
            console.error("Failed to parse settings", e);
        }

        const handleSync = (_, s) => {
            // "s" is the overlaySettings object sent by App.jsx
            const parsed = s || { skillLevelUp: true, wardTimer: true, objectiveTimer: true, testMode: false };
            setOverlaySettings(parsed);
            stateRefs.current.settings = parsed;
        };
        window.ipcRenderer.on('settings:sync', handleSync);

        const handleUpdate = async (_, data) => {
            let champ = "";
            if (typeof data === 'string') {
                champ = data;
                setChampName(data);
                stateRefs.current.champ = data;
            } else if (data) {
                champ = data.champName || data.championName || "";
                setChampName(champ);
                stateRefs.current.champ = champ;
                if (data.spells) {
                    const isJng = data.spells.spell1Id === 11 || data.spells.spell2Id === 11;
                    stateRefs.current.isJungle = isJng;
                }
            }

            if (champ) {
                try {
                    let v = stateRefs.current.ddVersion;
                    if (!v || v.startsWith("14.")) {
                        try {
                            const vp = await fetch('https://ddragon.leagueoflegends.com/api/versions.json').then(r=>r.json());
                            v = vp[0];
                            stateRefs.current.ddVersion = v;
                        } catch(e) {}
                    }

                    // Normalize id (e.g. Wukong -> MonkeyKing, LeBlanc -> Leblanc)
                    const normalizeChampName = (name) => {
                        if (!name) return "Yasuo";
                        let clean = name.replace(/['\s.&]/g, '');
                        if (clean.length > 1) {
                            clean = clean.charAt(0).toUpperCase() + clean.slice(1);
                        }
                        const mapping = {
                            'KhaZix': 'Khazix', 'KaiSa': 'Kaisa', 'BelVeth': 'Belveth', 'ChoGath': 'Chogath',
                            'VelKoz': 'Velkoz', 'RekSai': 'RekSai', 'KSante': 'KSante', 'Wukong': 'MonkeyKing',
                            'NunuWillump': 'Nunu', 'Nunu': 'Nunu', 'NunuandWillump': 'Nunu', 'RenataGlasc': 'Renata', 'LeBlanc': 'Leblanc',
                            'DrMundo': 'DrMundo', 'Mundo': 'DrMundo', 'MasterYi': 'MasterYi', 'TahmKench': 'TahmKench',
                            'JarvanIV': 'JarvanIV', 'FiddleSticks': 'Fiddlesticks', 'MonkeyKing': 'MonkeyKing',
                            'KogMaw': 'KogMaw', 'XinZhao': 'XinZhao', 'LeeSin': 'LeeSin', 'Seraphine': 'Seraphine'
                        };
                        return mapping[clean] || clean;
                    };
                    
                    let ddId = normalizeChampName(champ);

                    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${v}/data/en_US/champion/${ddId}.json`);
                    const json = await res.json();
                    if (json.data && json.data[ddId]) {
                        const spells = json.data[ddId].spells;
                        stateRefs.current.spellIcons = {
                            'Q': `https://ddragon.leagueoflegends.com/cdn/${v}/img/spell/${spells[0].image.full}`,
                            'W': `https://ddragon.leagueoflegends.com/cdn/${v}/img/spell/${spells[1].image.full}`,
                            'E': `https://ddragon.leagueoflegends.com/cdn/${v}/img/spell/${spells[2].image.full}`,
                            'R': `https://ddragon.leagueoflegends.com/cdn/${v}/img/spell/${spells[3].image.full}`,
                        };
                    }
                } catch (e) { console.error("Error fetching spells for", champ, e); }
            }

            try {
                const requestedRole = stateRefs.current.isJungle ? 'jungle' : '';
                const build = await window.ipcRenderer.invoke('scraper:get-champion-build', champ, requestedRole);
                if (build) {
                    setBuildData(build);
                    if (build.skillOrder) {
                        let order = build.skillOrder;
                        // If U.GG gives a 3-item priority list (e.g., ["Q", "W", "E"]), expand it into an 18-level standard progression
                        if (order.length === 3 && typeof order[0] === 'string') {
                            const [first, second, third] = order;
                            order = [
                                first, second, third,
                                first, first, "R", first, second,
                                first, second, "R", second, second,
                                third, third, "R", third, third
                            ];
                        }
                        while (order.length < 18) order.push('P'); // pad remainder to avoid undefined index
                        stateRefs.current.skillOrder = order;
                    }
                }

                // Fallback for Practice Tool etc if scraper fails
                if (!stateRefs.current.skillOrder) {
                    stateRefs.current.skillOrder = ["Q", "W", "E", "Q", "Q", "R", "Q", "E", "Q", "E", "R", "E", "E", "W", "W", "R", "W", "W"];
                }
            } catch (e) {
                console.error(e);
                if (!stateRefs.current.skillOrder) {
                    stateRefs.current.skillOrder = ["Q", "W", "E", "Q", "Q", "R", "Q", "E", "Q", "E", "R", "E", "E", "W", "W", "R", "W", "W"];
                }
            }
        };

        window.ipcRenderer.on('ingame:update', handleUpdate);
        window.ipcRenderer.on('skills:update', handleUpdate);

        const calculateWinProbability = (data) => {
            if (!data || !data.allPlayers || !data.activePlayer) return 50;
            const activeName = (data.activePlayer.summonerName || data.activePlayer.riotIdGameName || data.activePlayer.rawPlayerName || "").split('#')[0].toLowerCase();
            let me = data.allPlayers.find(p => (p.summonerName || "").toLowerCase().includes(activeName) || (p.riotIdGameName || "").toLowerCase().includes(activeName));
            if (!me && data.allPlayers.length > 0) me = data.allPlayers[0];
            if (!me) return 50;

            const myTeam = me.team;
            let myTeamScore = 0;
            let enemyTeamScore = 0;

            data.allPlayers.forEach(p => {
                const kills = p.scores?.kills || 0;
                const cs = p.scores?.creepScore || 0;
                const assists = p.scores?.assists || 0;
                const score = (kills * 2) + Math.floor(cs / 10) + assists;
                if (p.team === myTeam) myTeamScore += score;
                else enemyTeamScore += score;
            });

            if (data.events && data.events.Events) {
                data.events.Events.forEach(e => {
                    const killer = data.allPlayers.find(p => p.summonerName === e.KillerName || p.riotIdGameName === e.KillerName);
                    if (killer) {
                        const pts = e.EventName === 'DragonKill' ? 10 : e.EventName === 'BaronKill' ? 25 : e.EventName === 'TurretKilled' ? 15 : e.EventName === 'InhibKilled' ? 20 : 0;
                        if (killer.team === myTeam) myTeamScore += pts;
                        else enemyTeamScore += pts;
                    }
                });
            }

            if (myTeamScore === 0 && enemyTeamScore === 0) return 50;
            let probability = 50 + ((myTeamScore - enemyTeamScore) / Math.max(10, myTeamScore + enemyTeamScore)) * 40;
            return Math.min(Math.max(probability, 10), 90).toFixed(1);
        };

        const triggerWinrateOverlay = (isForced = false) => {
            const now = Date.now();
            if (now - stateRefs.current.lastWinrateTime < 20000) {
                if (isForced && !stateRefs.current.winrateSpamTriggered) {
                    stateRefs.current.winrateSpamTriggered = true;
                    pushToast({
                        type: 'warning',
                        title: 'SYSTEM PROTECT',
                        name: 'Cooldown Actif',
                        status: 'Vous ne pouvez afficher la probabilit├® de victoire que toutes les 20 secondes.',
                        iconColor: 'bg-rose-500',
                        icon: AlertCircle,
                        duration: 5000
                    });
                    setTimeout(() => { stateRefs.current.winrateSpamTriggered = false; }, 20000);
                }
                return;
            }

            const prob = calculateWinProbability(stateRefs.current.liveData);
            stateRefs.current.lastWinrateTime = now;

            const isWinning = prob >= 50;
            pushToast({
                type: 'winrate',
                title: 'ORACLE PREDICTION',
                name: `Probabilit├® : ${prob}%`,
                status: isWinning ? 'Votre ├®quipe m├¿ne la danse ! Maintenez la pression.' : 'Avantage ennemi. Concentrez-vous sur les objectifs.',
                iconColor: isWinning ? 'bg-cyan-500' : 'bg-rose-500',
                icon: Activity,
                duration: 12000,
                prob: prob
            });
        };

        const handleShortcut = () => {
            if (stateRefs.current.settings?.winProbability !== false) {
                triggerWinrateOverlay(true);
            }
        };
        // Nuke any ghost listeners from hot reloads without a previous cleanup
        window.ipcRenderer.removeAllListeners('shortcut:force-winrate');
        window.ipcRenderer.on('shortcut:force-winrate', handleShortcut);

        // Initial Test Mode Trigger
        const testInterval = setInterval(() => {
            if (stateRefs.current.settings?.testMode && !stateRefs.current.testModeFired) {
                stateRefs.current.testModeFired = true;
                pushToast({
                    type: 'test',
                    title: 'ORACLE SYSTEM',
                    name: 'Interface InGame Active',
                    status: 'Vos notifications appara├«tront ici.',
                    iconColor: 'bg-indigo-500',
                    borderColor: 'bg-indigo-500 shadow-indigo-500/50',
                    icon: Sparkles
                });
            }
        }, 3000);

        // Live API loop
        const interval = setInterval(async () => {
            if (stateRefs.current.isFetching) return;
            stateRefs.current.isFetching = true;
            try {
                const data = await window.ipcRenderer.invoke('live:get-all-data');
                if (!data) return;

                setLiveData(data);
                stateRefs.current.liveData = data;

                const gameTime = data.gameData?.gameTime || 0; // en secondes
                const refs = stateRefs.current;

                // --- 0. INITIALISATION CONTINUE (Update isJungle live) ---
                if (data.activePlayer) {
                    let isJungleLive = false;
                    const allP = data.allPlayers || [];
                    const rawActiveName = data.activePlayer.summonerName || data.activePlayer.riotIdGameName || data.activePlayer.rawPlayerName || "";
                    const activeName = rawActiveName.split('#')[0].toLowerCase();

                    let me = activeName ? allP.find(p => (p.summonerName || "").toLowerCase().includes(activeName) || (p.riotIdGameName || "").toLowerCase().includes(activeName) || (p.rawPlayerName || "").toLowerCase().includes(activeName)) : null;
                    if (!me && allP.length > 0) me = allP[0];

                    if (me && me.summonerSpells) {
                        const s1 = (me.summonerSpells.summonerSpellOne?.displayName || '').toLowerCase();
                        const s2 = (me.summonerSpells.summonerSpellTwo?.displayName || '').toLowerCase();
                        if (s1.includes('smite') || s2.includes('smite') || s1.includes('ch├ótiment') || s2.includes('ch├ótiment')) {
                            isJungleLive = true;
                        }
                    }

                    if (isJungleLive) refs.isJungle = true;

                    if (!champName && !refs.isInitializingChamp) {
                        let resolvedChampName = me ? me.championName : undefined;
                        if (!resolvedChampName && data.activePlayer.abilities) {
                            resolvedChampName = Object.keys(data.activePlayer.abilities)[0];
                        }

                        if (resolvedChampName) {
                            refs.isInitializingChamp = true;
                            handleUpdate(null, {
                                champName: resolvedChampName,
                                spells: { spell1Id: isJungleLive ? 11 : 0, spell2Id: 0 }
                            });
                        }
                    }

                    // Dynamic Build Fetching when Position is known
                    if (me && me.position && me.position !== 'UNKNOWN' && me.position !== '' && !refs.hasFetchedBuildForRole && refs.champ) {
                        refs.hasFetchedBuildForRole = true;
                        let posStr = me.position.toLowerCase();
                        if (posStr === 'middle') posStr = 'mid';
                        if (posStr === 'bottom') posStr = 'adc';
                        if (posStr === 'utility') posStr = 'support';

                        window.ipcRenderer.invoke('scraper:get-champion-build', refs.champ, posStr).then(build => {
                            if (build) {
                                setBuildData(build);
                                if (build.skillOrder && !refs.skillOrder) {
                                    let order = build.skillOrder;
                                    if (order.length === 3 && typeof order[0] === 'string') {
                                        const [first, second, third] = order;
                                        order = [first, second, third, first, first, "R", first, second, first, second, "R", second, second, third, third, "R", third, third];
                                    }
                                    while (order.length < 18) order.push('P');
                                    refs.skillOrder = order;
                                }
                            }
                        }).catch(e => console.error("Error fetching build for role:", e));
                    }
                }

                // --- 1. OBJECTIFS (Timings : 30s avant spawn) ---
                // We use jungleTimers or objectiveTimer depending on settings structure
                const showObjectives = refs.settings.objectiveTimer !== false && refs.settings.jungleTimers !== false;
                if (showObjectives) {
                    // Buffs Jungle (Spawn ├á 0:55 -> Notif ├á 0:40 = 40s)
                    if (gameTime >= 40 && gameTime < 120 && !refs.objCamp1) {
                        refs.objCamp1 = true;
                        if (refs.isJungle) {
                            pushToast({
                                type: 'objective',
                                title: 'JUNGLE (15s)',
                                name: 'Apparition des Buffs',
                                status: 'Les premiers buffs de la jungle vont appara├«tre.',
                                iconColor: 'bg-green-600',
                                borderColor: 'bg-green-600 shadow-green-600/50',
                                icon: Target,
                                duration: 10000
                            });
                        }
                    }

                    // Carapateur (Spawn ├á 2:55 -> Notif ├á 2:40 = 160s)
                    if (gameTime >= 160 && gameTime < 300 && !refs.objCamp2) {
                        refs.objCamp2 = true;
                        if (refs.isJungle) {
                            pushToast({
                                type: 'objective',
                                title: 'JUNGLE (15s)',
                                name: 'Apparition des Carapateurs',
                                status: 'Contr├┤lez la rivi├¿re pour r├®cup├®rer la vision.',
                                iconColor: 'bg-teal-500',
                                borderColor: 'bg-teal-500 shadow-teal-500/50',
                                icon: Target,
                                duration: 10000
                            });
                        }
                    }
                    // --- DRAGONS ET BARONS DYNAMIQUES (Respawns inclus) ---
                    let drakeSpawnTime = 300; // 5:00 par d├®faut
                    let baronSpawnTime = 1200; // 20:00 par d├®faut
                    let heraldSpawnTime = 840; // 14:00 par d├®faut
                    let grubsSpawnTime = 300; // 5:00 par d├®faut pour les larves

                    if (data.events && data.events.Events) {
                        const dragons = data.events.Events.filter(e => e.EventName === 'DragonKill');
                        if (dragons.length > 0) drakeSpawnTime = dragons[dragons.length - 1].EventTime + 300; // 5 min respawn

                        const barons = data.events.Events.filter(e => e.EventName === 'BaronKill');
                        if (barons.length > 0) baronSpawnTime = barons[barons.length - 1].EventTime + 180; // 3 min respawn

                        const hordes = data.events.Events.filter(e => e.EventName === 'HordeKill');
                        if (hordes.length > 0 && hordes[hordes.length - 1].EventTime < 525) grubsSpawnTime = hordes[hordes.length - 1].EventTime + 240; // 4 min respawn (avant h├®raut)
                    }

                    // Notifs (30s avant)
                    if (!refs.notifiedSpawns) refs.notifiedSpawns = {};

                    // Drake
                    if (gameTime >= drakeSpawnTime - 30 && gameTime < drakeSpawnTime + 90 && refs.notifiedSpawns.drake !== drakeSpawnTime) {
                        refs.notifiedSpawns.drake = drakeSpawnTime;
                        pushToast({
                            type: 'objective', title: 'OBJECTIF (30s)', name: 'Dragon', status: 'Le prochain Dragon appara├«t bient├┤t.', iconColor: 'bg-red-500', borderColor: 'bg-red-500 shadow-red-500/50', imageUrl: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/dragon-100.png', duration: 12000
                        });
                    }

                    // Baron
                    if (gameTime >= baronSpawnTime - 30 && gameTime < baronSpawnTime + 90 && refs.notifiedSpawns.baron !== baronSpawnTime) {
                        refs.notifiedSpawns.baron = baronSpawnTime;
                        pushToast({
                            type: 'objective', title: 'OBJECTIF MAJEUR (30s)', name: 'Baron Nashor', status: 'Le Baron appara├«t bient├┤t.', iconColor: 'bg-fuchsia-600', borderColor: 'bg-fuchsia-600 shadow-fuchsia-600/50', imageUrl: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/baron-100.png', duration: 12000
                        });
                    }

                    // Larves
                    if (gameTime >= grubsSpawnTime - 30 && gameTime < grubsSpawnTime + 90 && refs.notifiedSpawns.grubs !== grubsSpawnTime && gameTime < 820) {
                        refs.notifiedSpawns.grubs = grubsSpawnTime;
                        pushToast({
                            type: 'objective', title: 'OBJECTIF (30s)', name: 'Larves du N├®ant', status: 'Important pour push les tours rapidement.', iconColor: 'bg-purple-700', borderColor: 'bg-purple-700 shadow-purple-700/50', icon: Skull, duration: 12000
                        });
                    }

                    // H├®raut
                    if (gameTime >= heraldSpawnTime - 30 && gameTime < heraldSpawnTime + 90 && refs.notifiedSpawns.herald !== heraldSpawnTime) {
                        refs.notifiedSpawns.herald = heraldSpawnTime;
                        pushToast({
                            type: 'objective', title: 'OBJECTIF (30s)', name: 'H├®raut de la Faille', status: 'Le H├®raut appara├«t dans 30s.', iconColor: 'bg-indigo-600', borderColor: 'bg-indigo-600 shadow-indigo-600/50', icon: Target, duration: 12000
                        });
                    }
                }

                // --- 2. JOUEUR (Skills & Wards) ---
                if (data.activePlayer && data.allPlayers) {
                    const active = data.activePlayer;
                    const rawActiveName = active.summonerName || active.riotIdGameName || active.rawPlayerName || "";
                    const activeName = rawActiveName.split('#')[0].toLowerCase();

                    let current = activeName ? data.allPlayers.find(p => (p.summonerName || "").toLowerCase().includes(activeName) || (p.riotIdGameName || "").toLowerCase().includes(activeName) || (p.rawPlayerName || "").toLowerCase().includes(activeName)) : null;
                    if (!current && data.allPlayers.length > 0) current = data.allPlayers[0];

                    const level = current?.level || Math.max(refs.knownLevel, 1);

                    // A) SKILLS UPGRADE
                    if (refs.settings.skillLevelUp !== false) {
                        // We extract skill letter from order or fallback safely to 'P'
                        const getSkillProps = (lvl) => {
                            let skillLetter = 'P';
                            if (refs.skillOrder && refs.skillOrder.length >= lvl) {
                                skillLetter = refs.skillOrder[lvl - 1];
                            }

                            // If we exceeded 18 for some bug? Provide 'P'
                            if (!skillLetter) skillLetter = 'P';

                            const skillColors = {
                                'Q': 'bg-blue-500 shadow-blue-500/50',
                                'W': 'bg-green-500 shadow-green-500/50',
                                'E': 'bg-yellow-500 shadow-yellow-500/50',
                                'R': 'bg-purple-500 shadow-purple-500/50',
                                'P': 'bg-gray-500 shadow-gray-500/50'
                            };

                            let imageUrl = null;
                            if (refs.spellIcons && refs.spellIcons[skillLetter]) {
                                imageUrl = refs.spellIcons[skillLetter];
                            }

                            return {
                                letter: skillLetter,
                                color: skillColors[skillLetter] || 'bg-blue-400',
                                imageUrl
                            };
                        };

                        const showNotification = (lvl) => {
                            const { letter, color, imageUrl } = getSkillProps(lvl);

                            pushToast({
                                type: 'skill',
                                title: lvl === 1 ? 'STARTING SKILL' : 'LEVEL UP',
                                name: `Am├®liorez le sort ${letter}`,
                                status: lvl === 1 ? 'Sort ├á d├®bloquer en premier' : `Vous avez atteint le niveau ${lvl}.`,
                                iconColor: color,
                                borderColor: color,
                                letter: letter,
                                imageUrl: imageUrl,
                                duration: 5000
                            });
                        };

                        if (refs.knownLevel === 0 && level >= 1 && refs.skillOrder) {
                            refs.knownLevel = level;
                            // Show immediately on first track, especially useful if joining mid-game or fast level up
                            showNotification(level);
                        } else if (refs.knownLevel === 0 && level >= 1 && !refs.skillOrder) {
                            // If we don't have skill order yet, allow it to remain 0 so it pops when we fetch it
                        } else if (refs.knownLevel > 0 && level > refs.knownLevel && refs.skillOrder) {
                            refs.knownLevel = level;
                            showNotification(level);
                        }
                    }

                    // B) WARDING REMINDER (Niveau 6 => Souvent le moment du premier gros back)
                    if (refs.settings.wardTimer !== false && level === 6 && !refs.wardNotified) {
                        refs.wardNotified = true;

                        const wardId = refs.isJungle ? '3364' : '2055'; // Oracle Lens or Control Ward

                        pushToast({
                            type: 'ward',
                            title: 'VISION MAP',
                            name: 'Changement de Trinket',
                            status: refs.isJungle ? 'Prenez le Brouilleur Oracle pour gank.' : 'Achetez des Wards de Contr├┤le au prochain back.',
                            iconColor: 'bg-emerald-500',
                            borderColor: 'bg-emerald-500 shadow-emerald-500/50',
                            imageUrl: `https://ddragon.leagueoflegends.com/cdn/${refs.ddVersion}/img/item/${wardId}.png`,
                            duration: 10000
                        });
                    }

                    // C) OBJECTIVE WINRATE TRIGGER
                    if (data.events && data.events.Events && refs.settings.winProbability !== false) {
                        const evtCount = data.events.Events.length;
                        if (refs.processedEventsCount > 0 && evtCount > refs.processedEventsCount) {
                            const newEvents = data.events.Events.slice(refs.processedEventsCount);
                            const hasObjective = newEvents.some(e => ['DragonKill', 'BaronKill', 'TurretKilled', 'InhibKilled'].includes(e.EventName));
                            if (hasObjective) {
                                // Trigger WinProbability naturally behind other notifications
                                triggerWinrateOverlay(false);
                            }
                        }
                        refs.processedEventsCount = evtCount;
                    }

                    // D) ITEM RECOMMENDATIONS REMOVED FROM TOASTS - NOW PERSISTENT
                }
            } catch (e) {
                // Ignore API errors gracefully
            } finally {
                stateRefs.current.isFetching = false;
            }
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(testInterval);
            window.ipcRenderer.removeListener('settings:sync', handleSync);
            window.ipcRenderer.removeListener('ingame:update', handleUpdate);
            window.ipcRenderer.removeListener('skills:update', handleUpdate);
            window.ipcRenderer.removeListener('shortcut:force-winrate', handleShortcut);
        };
    }, []);

    const computeStats = () => {
        if (!liveData || !liveData.gameData || liveData.gameData.gameTime < 5) {
            return null;
        }
        if (!liveData.activePlayer || !liveData.allPlayers) return null;

        const activeName = (liveData.activePlayer.summonerName || liveData.activePlayer.riotIdGameName || liveData.activePlayer.rawPlayerName || "").split('#')[0].toLowerCase();

        let me = liveData.allPlayers.find(p => (p.summonerName || "").toLowerCase().includes(activeName) || (p.riotIdGameName || "").toLowerCase().includes(activeName) || (p.rawPlayerName || "").toLowerCase().includes(activeName));

        // Fallback for practice tool if name logic fails totally
        if (!me && liveData.allPlayers.length > 0) me = liveData.allPlayers[0];

        if (!me || !me.scores) {
            return null;
        }

        const myTeam = me.team;
        let opp = null;
        if (me.position && me.position !== 'UNKNOWN' && me.position !== '') {
            opp = liveData.allPlayers.find(p => p.team !== myTeam && p.position === me.position);
        }
        if (!opp) {
            opp = liveData.allPlayers.filter(p => p.team !== myTeam).sort((a, b) => (b.scores?.creepScore || 0) - (a.scores?.creepScore || 0))[0];
        }

        const gameTimeMin = Math.max(1, liveData.gameData.gameTime / 60);

        // Calculate user stats
        const myCSM = (me.scores.creepScore / gameTimeMin).toFixed(1);
        const myTeamKills = liveData.allPlayers.filter(p => p.team === myTeam).reduce((sum, p) => sum + (p.scores?.kills || 0), 0);
        const myKP = myTeamKills === 0 ? 0 : Math.round(((me.scores.kills + me.scores.assists) / myTeamKills) * 100);
        const myVision = ((me.scores.wardScore || 0) / gameTimeMin).toFixed(1);
        const myGPM = Math.round((me.scores.creepScore * 20 + me.scores.kills * 300 + me.scores.assists * 150) / gameTimeMin);

        // Calculate opp stats
        let refCSM = '7.0';
        let refKP = 50;
        let refVision = '1.5';
        let refGPM = 400;
        let refLvl = me.level;

        if (opp && opp.scores) {
            const oppTeamKills = liveData.allPlayers.filter(p => p.team === opp.team).reduce((sum, p) => sum + (p.scores?.kills || 0), 0);
            refCSM = (opp.scores.creepScore / gameTimeMin).toFixed(1);
            refKP = oppTeamKills === 0 ? 0 : Math.round(((opp.scores.kills + opp.scores.assists) / oppTeamKills) * 100);
            refVision = ((opp.scores.wardScore || 0) / gameTimeMin).toFixed(1);
            refGPM = Math.round((opp.scores.creepScore * 20 + opp.scores.kills * 300 + opp.scores.assists * 150) / gameTimeMin);
            refLvl = opp.level;
        }

        return {
            me: { gpm: myGPM, csm: myCSM, kp: `${myKP}%`, vision: myVision, lvl: me.level },
            ref: { gpm: refGPM, csm: refCSM, kp: `${refKP}%`, vision: refVision, lvl: refLvl }
        };
    };

    const computeNextItem = () => {
        if (stateRefs.current.settings.itemBuild === false || !buildData || !buildData.items || !liveData || !liveData.activePlayer || !liveData.allPlayers) return null;

        const activeName = (liveData.activePlayer.summonerName || liveData.activePlayer.riotIdGameName || liveData.activePlayer.rawPlayerName || "").split('#')[0].toLowerCase();
        let me = liveData.allPlayers.find(p => (p.summonerName || "").toLowerCase().includes(activeName) || (p.riotIdGameName || "").toLowerCase().includes(activeName) || (p.rawPlayerName || "").toLowerCase().includes(activeName));

        if (!me && liveData.allPlayers.length > 0) me = liveData.allPlayers[0];
        if (!me) return null;

        const playerItems = me.items || [];
        const validItems = playerItems.filter(i => i.itemID !== 0);

        if (!stateRefs.current.acquiredItems) stateRefs.current.acquiredItems = new Set();
        const acquired = stateRefs.current.acquiredItems;
        validItems.forEach(pi => acquired.add(String(pi.itemID)));

        const coreItems = buildData.items.core || [];
        const bootsRec = buildData.items.boots?.[0];
        const starting = buildData.items.starting || [];
        const situational = buildData.items.situational || [];

        const gameTime = liveData.gameData?.gameTime || 0; // en secondes
        const bootIds = ["1001", "3006", "3047", "3111", "3158", "3020", "3117", "3009", "3119", "2422", "4401"];
        const upgradedBootsIds = ["3006", "3047", "3111", "3158", "3020", "3117", "3009", "3119", "4401"];

        const hasUpgradedBoots = Array.from(acquired).some(id => upgradedBootsIds.includes(String(id)));

        // Remove boots from the normal item progression so buying boots doesn't skip a core item
        const mainItems = [...coreItems, ...situational].filter(id => id && !bootIds.includes(String(id)));

        let highestMainAcquiredIndex = -1;
        for (let i = 0; i < mainItems.length; i++) {
            if (acquired.has(String(mainItems[i]))) {
                highestMainAcquiredIndex = Math.max(highestMainAcquiredIndex, i);
            }
        }

        let nextMainItem = null;
        for (const id of mainItems) {
            if (!acquired.has(String(id))) {
                nextMainItem = id;
                break;
            }
        }

        const hasNoMainItems = highestMainAcquiredIndex === -1;

        // 1. Starting Items (Only early game, if no main item is finished)
        // Check if player has ANY standard starting item (Doran's, Jungle Pet, Support Item, Dark Seal, Cull, Tear)
        const starterItemIds = ["1054", "1055", "1056", "1082", "1083", "3070", "3865", "1101", "1102", "1103", "1190", "1540", "2003"];
        const hasAStarter = Array.from(acquired).some(id => starterItemIds.includes(String(id)));

        // Propose starting items if it's early, no core items built, and no starter item detected yet
        if (gameTime < 420 && hasNoMainItems && !hasAStarter) {
            let robustStarting = starting;
            if (!robustStarting || robustStarting.length === 0) {
                // Determine generic lane starter fallback if missing
                if (stateRefs.current.isJungle) robustStarting = ["1102"]; // Mosstomper
                else if (me.position === 'UTILITY' || me.position === 'support') robustStarting = ["3865"]; // World atlas
                else robustStarting = ["1055"]; // DBlade by default
            }
            for (const id of robustStarting) {
                if (!acquired.has(String(id))) return id;
            }
        }

        // 2. First Core Item Priority
        // Players usually build their first core item before finishing boots
        if (hasNoMainItems && nextMainItem) {
            return nextMainItem;
        }

        // 3. Upgraded Boots Priority
        // After starting items/1st core, recommend boots if not fully upgraded yet
        if (!hasUpgradedBoots) {
            const bootToSuggest = bootsRec || "1001"; // Fallback to basic boots if none scraped
            if (!acquired.has(String(bootToSuggest))) return bootToSuggest;
        }

        // 4. Remaining Main Items
        if (nextMainItem) {
            return nextMainItem;
        }

        return null; // Full build or no suggestion available
    };

    const showBuild = buildData && buildData.items && stateRefs.current.settings.itemBuild !== false;
    const stats = computeStats();

    if ((!toasts || toasts.length === 0) && stats === null && !showBuild) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none'
        }}>
            <DraggableWidget id="build_hud" defaultPosition={{ x: 24, y: 24 }} className="flex flex-col gap-4 items-start cursor-move opacity-90 hover:opacity-100 transition-opacity">
                {showBuild && (
                    <div className="w-[360px] bg-white/[0.02] backdrop-blur-[40px] border border-white/[0.08] rounded-[32px] p-6 flex flex-col gap-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6),inset_0_1px_1px_rgba(255,255,255,0.05)] relative overflow-hidden animate-in slide-in-from-left-8 fade-in duration-500">
                        {/* Light Reflections */}
                        <div className="absolute top-0 left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                        {/* Premium Glow */}
                        <div className="absolute -top-20 -left-20 w-48 h-48 rounded-full blur-[50px] opacity-20 bg-amber-500 pointer-events-none" />

                        <div className="flex flex-col gap-3 relative z-10">
                            <div className="text-[11px] font-black text-amber-50/70 uppercase tracking-[0.3em] flex items-center gap-2 drop-shadow-md">
                                <Sparkles className="w-3 h-3 text-amber-400" />
                                Build ({champName})
                            </div>

                            {buildData.items.starting && buildData.items.core && (
                                <div className="flex flex-col gap-2.5 bg-black/20 p-3 rounded-[20px] shadow-inner ring-1 ring-white/5">
                                    <div className="flex flex-wrap gap-2 items-center">
                                        {buildData.items.starting.map((id, idx) => (
                                            <div key={'start-' + id + '-' + idx} className="w-9 h-9 rounded-xl border border-white/20 overflow-hidden shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/${stateRefs.current.ddVersion}/img/item/${id}.png`} className="w-[115%] h-[115%] object-cover -translate-x-[7.5%] -translate-y-[7.5%]" onError={(e) => { e.target.style.display = 'none'; }} />
                                            </div>
                                        ))}
                                        {buildData.items.core.length > 0 && <span className="text-white/30 text-[10px] font-black mx-1 drop-shadow-md">Ôû║</span>}
                                        {buildData.items.core.map((id, idx) => (
                                            <div key={'core-' + id + '-' + idx} className="w-9 h-9 rounded-xl border border-amber-500/60 overflow-hidden shadow-[0_0_12px_rgba(245,158,11,0.4)] relative">
                                                <div className="absolute inset-0 ring-1 ring-inset ring-white/20 rounded-xl" />
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/${stateRefs.current.ddVersion}/img/item/${id}.png`} className="w-[115%] h-[115%] object-cover -translate-x-[7.5%] -translate-y-[7.5%]" onError={(e) => { e.target.style.display = 'none'; }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {buildData.items.situational && buildData.items.situational.length > 0 && (
                                <div className="flex flex-col gap-1.5 mt-1 px-1">
                                    <div className="text-[9px] font-bold text-white/40 uppercase tracking-widest drop-shadow-sm">Situations / Late Game</div>
                                    <div className="flex flex-wrap gap-2 opacity-90">
                                        {buildData.items.situational.slice(0, 5).map((id, idx) => (
                                            <div key={'sit-' + id + '-' + idx} className="w-7 h-7 rounded-[10px] border border-white/10 overflow-hidden shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/${stateRefs.current.ddVersion}/img/item/${id}.png`} className="w-[115%] h-[115%] object-cover -translate-x-[7.5%] -translate-y-[7.5%]" onError={(e) => { e.target.style.display = 'none'; }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {(() => {
                                const nextRecId = computeNextItem();
                                if (!nextRecId) return null;
                                return (
                                    <div className="flex flex-col gap-1.5 mt-2 px-1">
                                        <div className="text-[10px] font-black text-amber-400 uppercase tracking-widest drop-shadow-sm flex items-center gap-1.5">
                                            <Sparkles className="w-3 h-3" />
                                            Prochain Achat Recommand├®
                                        </div>
                                        <div className="flex items-center gap-3 bg-gradient-to-r from-amber-500/20 to-transparent p-2 rounded-xl ring-1 ring-amber-500/30">
                                            <div className="w-11 h-11 rounded-xl border-2 border-amber-400 overflow-hidden shadow-[0_0_15px_rgba(245,158,11,0.6)] relative animate-pulse">
                                                <div className="absolute inset-0 ring-1 ring-inset ring-white/30 rounded-xl" />
                                                <img src={`https://ddragon.leagueoflegends.com/cdn/${stateRefs.current.ddVersion}/img/item/${nextRecId}.png`} className="w-[115%] h-[115%] object-cover -translate-x-[7.5%] -translate-y-[7.5%]" onError={(e) => { e.target.style.display = 'none'; }} />
                                            </div>
                                            <span className="text-white/90 text-[11px] font-bold drop-shadow-md">Concentrez vos golds sur cet objet</span>
                                        </div>
                                    </div>
                                );
                            })()}
                        </div>
                    </div>
                )}

                {toasts && toasts.some(t => t.type !== 'skill' && t.type !== 'ward') && (
                    <div className="flex flex-col gap-4 items-start pb-4">
                        {toasts.filter(toast => toast.type !== 'skill' && toast.type !== 'ward').map(toast => {
                            const Icon = toast.icon || AlertCircle;

                            if (toast.type === 'winrate') {
                                const isWinning = toast.prob >= 50;
                                return (
                                    <div
                                        key={toast.id}
                                        className={`w-[380px] bg-white/[0.02] backdrop-blur-[64px] border border-white/[0.08] rounded-[36px] p-7 flex flex-col gap-6 relative overflow-hidden shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.1)] transition-all duration-500 ease-out ${toast.isLeaving ? 'opacity-0 -translate-x-8 scale-95' : 'animate-in slide-in-from-left-8 fade-in'}`}
                                    >
                                        {/* Intense Light Reflections for Liquid Glass */}
                                        <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
                                        <div className="absolute bottom-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent" />

                                        {/* Premium Glow Without Orange */}
                                        <div className={`absolute -top-24 -right-24 w-56 h-56 rounded-full blur-[60px] opacity-30 ${isWinning ? 'bg-cyan-400' : 'bg-rose-500'} pointer-events-none`} />
                                        <div className={`absolute -bottom-24 -left-24 w-56 h-56 rounded-full blur-[60px] opacity-20 ${isWinning ? 'bg-blue-600' : 'bg-rose-600'} pointer-events-none`} />

                                        {/* Big semi-transparent top-left watermark logo instead of Graph */}
                                        <img src={MainLogo} alt="Background Logo" className="absolute -top-6 -left-6 w-52 h-52 object-contain opacity-25 drop-shadow-2xl pointer-events-none" />

                                        <div className="flex items-center relative z-10 pl-6">
                                            <div className="flex-1 min-w-0">
                                                <div className="text-[11px] font-black text-white/50 uppercase tracking-[0.3em] mb-1.5 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                    {toast.title}
                                                </div>
                                                <div className="flex items-baseline gap-2 mb-1">
                                                    <div className="text-[17px] font-black text-white truncate leading-tight drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                                                        Chance de Victoire
                                                    </div>
                                                </div>
                                                <div className="text-[13px] text-white/70 font-medium leading-snug drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                                                    {toast.status}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="w-full relative z-10 flex flex-col gap-2">
                                            <div className="flex justify-between items-end px-1">
                                                <div className="flex flex-col">
                                                    <span className={`text-[11px] font-black uppercase tracking-[0.2em] mb-1.5 opacity-80 ${isWinning ? 'text-cyan-300' : 'text-white'}`}>Alli├®s</span>
                                                    <span className={`text-[20px] font-black leading-none drop-shadow-[0_0_12px_rgba(34,211,238,0.6)] ${isWinning ? 'text-cyan-400' : 'text-white/90'}`}>{toast.prob}%</span>
                                                </div>
                                                <div className="flex flex-col items-end">
                                                    <span className={`text-[11px] font-black uppercase tracking-[0.2em] mb-1.5 opacity-80 ${!isWinning ? 'text-rose-300' : 'text-white'}`}>Ennemis</span>
                                                    <span className={`text-[20px] font-black leading-none drop-shadow-[0_0_12px_rgba(244,63,94,0.6)] ${!isWinning ? 'text-rose-400' : 'text-white/90'}`}>{(100 - parseFloat(toast.prob)).toFixed(1)}%</span>
                                                </div>
                                            </div>
                                            <div className="w-full h-5 bg-black/50 rounded-full overflow-hidden shadow-[inset_0_2px_6px_rgba(0,0,0,0.6),0_1px_1px_rgba(255,255,255,0.1)] ring-1 ring-white/10 relative backdrop-blur-xl">
                                                {/* Beautiful fluid gradient bar */}
                                                <div
                                                    className={`h-full rounded-full transition-all duration-[1500ms] ease-out relative shadow-[inset_0_2px_4px_rgba(255,255,255,0.4)] ${isWinning ? 'bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400' : 'bg-gradient-to-r from-orange-700 via-orange-500 to-rose-400'}`}
                                                    style={{ width: `${toast.prob}%` }}
                                                >
                                                    {/* Liquid shimmer inside the bar */}
                                                    <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-white/60 to-transparent mix-blend-overlay rounded-r-full" />
                                                </div>
                                                {/* Midline marker */}
                                                <div className="absolute top-0 bottom-0 left-1/2 w-[2px] bg-white/40 -translate-x-1/2 shadow-[0_0_8px_rgba(255,255,255,0.9)] z-10" />
                                            </div>
                                        </div>

                                        {/* Subtle progress lifetime line below the main container */}
                                        <div className="absolute bottom-0 left-0 h-[3px] bg-white/10 w-full">
                                            <div
                                                className={`h-full shadow-[0_0_12px_rgba(255,255,255,0.8)] ${isWinning ? 'bg-cyan-400' : 'bg-rose-400'}`}
                                                style={{ width: '100%', animation: `toastProgress ${toast.duration || 8000}ms linear forwards` }}
                                            />
                                        </div>
                                    </div>
                                );
                            }

                            // Standard Premium Toast
                            return (
                                <div
                                    key={toast.id}
                                    className={`w-[320px] bg-white/[0.03] backdrop-blur-[30px] border border-white/10 rounded-[24px] p-4 flex items-center gap-4 relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 ease-out ${toast.isLeaving ? 'opacity-0 -translate-x-8 scale-95' : 'animate-in slide-in-from-left-8 fade-in'}`}
                                >
                                    {/* Accent Glow instead of line */}
                                    <div className={`absolute -left-10 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full blur-[30px] opacity-30 ${toast.iconColor ? toast.iconColor : 'bg-white'}`} />

                                    {/* Avatar / Icon Container */}
                                    <div className={`relative shrink-0 w-12 h-12 rounded-[18px] flex items-center justify-center shadow-inner ring-1 ring-white/10 overflow-hidden ${toast.imageUrl ? 'bg-transparent' : toast.iconColor}`}>
                                        {toast.imageUrl ? (
                                            <img src={toast.imageUrl} alt="" className="w-[115%] h-[115%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" onError={(e) => { e.target.style.display = 'none'; }} />
                                        ) : toast.letter ? (
                                            <span className="text-white font-black text-xl drop-shadow-md">{toast.letter}</span>
                                        ) : (
                                            <Icon className="w-6 h-6 text-white drop-shadow-md" />
                                        )}
                                    </div>

                                    {/* Text Content */}
                                    <div className="flex-1 min-w-0 pr-2 z-10">
                                        <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.25em] mb-1">
                                            {toast.title || "SYSTEM"}
                                        </div>
                                        <div className="text-[14px] font-bold text-white/95 truncate leading-tight mb-0.5 drop-shadow-sm">
                                            {toast.name}
                                        </div>
                                        <div className="text-[11px] text-white/60 font-medium leading-snug">
                                            {toast.status}
                                        </div>
                                    </div>

                                    {/* Progress / Lifetime Bar (subtle) */}
                                    <div className="absolute bottom-0 left-0 h-[3px] bg-transparent w-full">
                                        <div
                                            className={`h-full opacity-40 rounded-full ${toast.iconColor ? toast.iconColor.replace('bg-', 'text-') : 'text-white'}`}
                                            style={{ width: '100%', animation: `toastProgress ${toast.duration || 8000}ms linear forwards`, backgroundColor: 'currentColor' }}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </DraggableWidget>
            
                 {/* Liquid Glass Dynamic Stats and Recommended Item Container */}
            {toasts && toasts.some(t => t.type === 'skill' || t.type === 'ward') && (
                <DraggableWidget id="notifs_hud_v7" defaultPosition={{ x: window.innerWidth - 670 > 0 ? window.innerWidth - 670 : 800, y: window.innerHeight - 480 > 0 ? window.innerHeight - 480 : 300 }} className="flex flex-col gap-3 items-end mb-2 cursor-move opacity-90 hover:opacity-100 transition-opacity">
                    {toasts.filter(toast => toast.type === 'skill' || toast.type === 'ward').map(toast => {
                        const Icon = toast.icon || AlertCircle;
                        return (
                            <div
                                key={toast.id}
                                className={`w-[320px] bg-white/[0.03] backdrop-blur-[30px] border border-white/10 rounded-[24px] p-4 flex items-center gap-4 relative overflow-hidden shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] flex-row-reverse transition-all duration-500 ease-out ${toast.isLeaving ? 'opacity-0 translate-x-8 scale-95' : 'animate-in slide-in-from-right-8 fade-in'}`}
                            >
                                {/* Accent Glow */}
                                <div className={`absolute -right-10 top-1/2 -translate-y-1/2 w-20 h-20 rounded-full blur-[30px] opacity-30 pointer-events-none ${toast.iconColor ? toast.iconColor : 'bg-white'}`} />

                                {/* Avatar / Icon Container */}
                                <div className={`relative shrink-0 w-12 h-12 rounded-[18px] flex items-center justify-center shadow-inner ring-1 ring-white/10 overflow-hidden pointer-events-none ${toast.imageUrl ? 'bg-transparent' : toast.iconColor}`}>
                                    {toast.imageUrl ? (
                                        <img src={toast.imageUrl} alt="" className="w-[115%] h-[115%] object-cover absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none" onError={(e) => { e.target.style.display = 'none'; }} />
                                    ) : toast.letter ? (
                                        <span className="text-white font-black text-xl drop-shadow-md pointer-events-none">{toast.letter}</span>
                                    ) : (
                                        <Icon className="w-6 h-6 text-white drop-shadow-md pointer-events-none" />
                                    )}
                                </div>

                                {/* Text Content */}
                                <div className="flex-1 min-w-0 pl-2 z-10 text-right pointer-events-none">
                                    <div className="text-[9px] font-black text-white/40 uppercase tracking-[0.25em] mb-1 pointer-events-none">
                                        {toast.title || "SYSTEM"}
                                    </div>
                                    <div className="text-[14px] font-bold text-white/95 truncate leading-tight mb-0.5 drop-shadow-sm pointer-events-none">
                                        {toast.name}
                                    </div>
                                    <div className="text-[11px] text-white/60 font-medium leading-snug break-words whitespace-normal text-right pointer-events-none">
                                        {toast.status}
                                    </div>
                                </div>

                                {/* Progress / Lifetime Bar */}
                                <div className="absolute bottom-0 right-0 h-[3px] bg-transparent w-full pointer-events-none">
                                    <div
                                        className={`h-full opacity-40 rounded-full pointer-events-none ${toast.iconColor ? toast.iconColor.replace('bg-', 'text-') : 'text-white'}`}
                                        style={{ width: '100%', animation: `toastProgress ${toast.duration || 8000}ms linear forwards`, backgroundColor: 'currentColor', float: 'right' }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </DraggableWidget>
            )}

            {stats && (
                <DraggableWidget id="stats_hud_v8" defaultPosition={{ x: window.innerWidth - 570 > 0 ? window.innerWidth - 570 : 800, y: window.innerHeight - 350 > 0 ? window.innerHeight - 350 : 500 }} className="flex flex-col items-end gap-5 cursor-move opacity-90 hover:opacity-100 transition-opacity">
                    <div className="bg-white/[0.02] backdrop-blur-[64px] border border-white/[0.08] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.7),inset_0_1px_1px_rgba(255,255,255,0.1)] rounded-[32px] p-6 flex flex-col gap-4 select-none relative overflow-hidden w-[220px]">
                        {/* Light Reflections */}
                        <div className="absolute top-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />
                        <div className="absolute bottom-0 left-[20%] right-[20%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" />
                        <div className="absolute -top-20 -right-20 w-48 h-48 bg-indigo-500/20 rounded-full blur-[50px] pointer-events-none" />

                        {[
                            { label: 'GPM', me: stats.me.gpm, ref: stats.ref.gpm, isHigherBetter: true },
                            { label: 'CSM', me: stats.me.csm, ref: stats.ref.csm, isHigherBetter: true },
                            { label: 'KP', me: stats.me.kp, ref: stats.ref.kp, isHigherBetter: true },
                            { label: 'VISION', me: stats.me.vision, ref: stats.ref.vision, isHigherBetter: true }
                        ].map(stat => {
                            const meVal = parseFloat(stat.me);
                            const refVal = parseFloat(stat.ref);
                            const isWinning = stat.isHigherBetter ? meVal >= refVal : meVal <= refVal;
                            return (
                                <div key={stat.label} className="flex justify-between items-center w-full relative z-10 px-1 pointer-events-none">
                                    <span className="font-black text-white/50 text-[13px] tracking-widest uppercase pointer-events-none">{stat.label}</span>
                                    <div className="text-[16px] tabular-nums text-right ml-4 font-black pointer-events-none">
                                        <span className={isWinning ? 'text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] pointer-events-none' : 'text-rose-400 drop-shadow-[0_0_8px_rgba(244,63,94,0.4)] pointer-events-none'}>{stat.me}</span>
                                    </div>
                                </div>
                            )
                        })}

                        {/* Liquid Separator */}
                        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-1 pointer-events-none" />

                        {/* LVL */}
                        <div className="flex justify-between items-center w-full relative z-10 px-1 pointer-events-none">
                            <div className="absolute -left-6 top-1/2 -translate-y-1/2 w-[5px] h-6 bg-indigo-500 rounded-r-full shadow-[0_0_12px_rgba(99,102,241,0.9)] pointer-events-none" />
                            <span className="font-black text-indigo-300 text-[13px] tracking-widest leading-none drop-shadow-md pointer-events-none">LVL</span>
                            <div className="text-[18px] tabular-nums text-right ml-4 font-black leading-none pointer-events-none">
                                <span className={stats.me.lvl >= stats.ref.lvl ? 'text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.6)] pointer-events-none' : 'text-rose-400 drop-shadow-[0_0_10px_rgba(244,63,94,0.6)] pointer-events-none'}>{stats.me.lvl}</span>
                            </div>
                        </div>
                    </div>
                </DraggableWidget>
            )}
        </div>
    );
}
