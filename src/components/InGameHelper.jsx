import React, { useState, useEffect, useRef } from 'react';
import { Target, Eye, AlertCircle, Sparkles, Map, Skull } from 'lucide-react';

export function InGameHelper({ ddragonVersion }) {
    const [toasts, setToasts] = useState([]);
    const [champName, setChampName] = useState("");

    const [overlaySettings, setOverlaySettings] = useState({ skillLevelUp: true, wardTimer: true, objectiveTimer: true, testMode: false });

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
        objDrake: false,
        objVoidgrubs: false,
        objHerald: false,
        objBaron: false,
        isInitializingChamp: false,
        settings: { skillLevelUp: true, wardTimer: true, objectiveTimer: true, testMode: false }
    });

    const pushToast = (toast) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, ...toast }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, toast.duration || 8000); // 8 seconds default
    };

    useEffect(() => {
        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        if (!window.ipcRenderer) return;

        window.ipcRenderer.invoke('app:get-settings').then(s => {
            const parsed = s?.overlaySettings || { skillLevelUp: true, wardTimer: true, objectiveTimer: true, testMode: false };
            setOverlaySettings(parsed);
            stateRefs.current.settings = parsed;
        });

        const handleSync = (_, s) => {
            const parsed = s?.overlaySettings || { skillLevelUp: true, wardTimer: true, objectiveTimer: true, testMode: false };
            setOverlaySettings(parsed);
            stateRefs.current.settings = parsed;
        };
        window.ipcRenderer.on('settings:sync', handleSync);

        const handleUpdate = async (_, data) => {
            let champ = "";
            if (typeof data === 'string') {
                champ = data;
                setChampName(data);
            } else if (data) {
                champ = data.champName || data.championName || "";
                setChampName(champ);
                if (data.spells) {
                    const isJng = data.spells.spell1Id === 11 || data.spells.spell2Id === 11;
                    stateRefs.current.isJungle = isJng;
                }
            }

            if (champ && ddragonVersion) {
                try {
                    // Normalize id (e.g. Wukong -> MonkeyKing)
                    let ddId = champ.replace(/[^a-zA-Z0-9]/g, '');
                    if (champ.toLowerCase() === 'wukong') ddId = 'MonkeyKing';
                    if (champ.toLowerCase() === 'renata glasc') ddId = 'Renata';

                    const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion/${ddId}.json`);
                    const json = await res.json();
                    if (json.data && json.data[ddId]) {
                        const spells = json.data[ddId].spells;
                        stateRefs.current.spellIcons = {
                            'Q': `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${spells[0].image.full}`,
                            'W': `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${spells[1].image.full}`,
                            'E': `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${spells[2].image.full}`,
                            'R': `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${spells[3].image.full}`,
                        };
                    }
                } catch (e) { console.error("Error fetching spells for", champ, e); }
            }

            try {
                const build = await window.ipcRenderer.invoke('scraper:get-champion-build', champ, 'mid');
                if (build && build.skillOrder) {
                    stateRefs.current.skillOrder = build.skillOrder;
                }
            } catch (e) {
                console.error(e);
            }
        };

        window.ipcRenderer.on('ingame:update', handleUpdate);
        window.ipcRenderer.on('skills:update', handleUpdate);

        // Initial Test Mode Trigger
        const testInterval = setInterval(() => {
            if (stateRefs.current.settings?.testMode && !stateRefs.current.testModeFired) {
                stateRefs.current.testModeFired = true;
                pushToast({
                    type: 'test',
                    title: 'ORACLE SYSTEM',
                    name: 'Interface InGame Active',
                    status: 'Vos notifications apparaîtront ici.',
                    iconColor: 'bg-indigo-500',
                    borderColor: 'bg-indigo-500 shadow-indigo-500/50',
                    icon: Sparkles
                });
            }
        }, 3000);

        // Live API loop
        const interval = setInterval(async () => {
            try {
                const data = await window.ipcRenderer.invoke('live:get-all-data');
                if (!data) return;

                const gameTime = data.gameData?.gameTime || 0; // en secondes
                const refs = stateRefs.current;

                // --- 0. INITIALISATION (If bypassed Champ Select) ---
                if (data.activePlayer && !champName && !refs.isInitializingChamp) {
                    refs.isInitializingChamp = true;
                    // activePlayer.summonerSpells could contain smite (11)
                    let isJungle = false;
                    const allP = data.allPlayers || [];
                    const me = allP.find(p => p.summonerName === data.activePlayer.summonerName);

                    if (me && me.summonerSpells) {
                        const s1 = (me.summonerSpells.summonerSpellOne?.displayName || '').toLowerCase();
                        const s2 = (me.summonerSpells.summonerSpellTwo?.displayName || '').toLowerCase();
                        if (s1.includes('smite') || s2.includes('smite') || s1.includes('châtiment') || s2.includes('châtiment')) {
                            isJungle = true;
                        }
                    }

                    let resolvedChampName = me ? me.championName : undefined;
                    // Provide fallback if data is totally empty
                    if (!resolvedChampName && data.activePlayer.abilities) {
                        resolvedChampName = Object.keys(data.activePlayer.abilities)[0];
                    }

                    handleUpdate(null, {
                        champName: resolvedChampName || 'Unknown',
                        spells: { spell1Id: isJungle ? 11 : 0, spell2Id: 0 }
                    });
                }

                // --- 1. OBJECTIFS (Timings : 30s avant spawn) ---
                if (refs.settings.objectiveTimer !== false) {
                    // Buffs Jungle (Spawn à 1:30 -> Notif à 1:15 = 75s)
                    if (gameTime >= 75 && gameTime < 85 && !refs.objCamp1) {
                        refs.objCamp1 = true;
                        if (refs.isJungle) {
                            pushToast({
                                type: 'objective',
                                title: 'JUNGLE (15s)',
                                name: 'Apparition des Buffs',
                                status: 'Les premiers buffs de la jungle vont apparaître.',
                                iconColor: 'bg-green-600',
                                borderColor: 'bg-green-600 shadow-green-600/50',
                                icon: Target,
                                duration: 10000
                            });
                        }
                    }

                    // Carapateur (Spawn à 3:30 -> Notif à 3:15 = 195s)
                    if (gameTime >= 195 && gameTime < 205 && !refs.objCamp2) {
                        refs.objCamp2 = true;
                        if (refs.isJungle) {
                            pushToast({
                                type: 'objective',
                                title: 'JUNGLE (15s)',
                                name: 'Apparition des Carapateurs',
                                status: 'Contrôlez la rivière pour récupérer la vision.',
                                iconColor: 'bg-teal-500',
                                borderColor: 'bg-teal-500 shadow-teal-500/50',
                                icon: Target,
                                duration: 10000
                            });
                        }
                    }
                    // Drake (Spawn à 5:00 -> Notif à 4:30 = 270s)
                    if (gameTime >= 270 && !refs.objDrake) {
                        refs.objDrake = true;
                        pushToast({
                            type: 'objective',
                            title: 'OBJECTIF (30s)',
                            name: 'Dragon',
                            status: 'Préparez la vision autour de la fosse.',
                            iconColor: 'bg-red-500',
                            borderColor: 'bg-red-500 shadow-red-500/50',
                            imageUrl: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/dragon-100.png',
                            duration: 12000
                        });
                    }

                    // Larves du néant (Spawn à 6:00 en S14 Split 2 / S15 -> Notif à 5:30 = 330s)
                    if (gameTime >= 330 && !refs.objVoidgrubs) {
                        refs.objVoidgrubs = true;
                        pushToast({
                            type: 'objective',
                            title: 'OBJECTIF (30s)',
                            name: 'Larves du Néant',
                            status: 'Important pour push les tours rapidement.',
                            iconColor: 'bg-purple-700',
                            borderColor: 'bg-purple-700 shadow-purple-700/50',
                            icon: Skull, // Fallback symbol for void monsters
                            duration: 12000
                        });
                    }

                    // Héraut de la faille (Spawn à 14:00 -> Notif à 13:30 = 810s)
                    // Il n'y a pas d'icone héraut 100x100 propre, on fallback sur une icone
                    if (gameTime >= 810 && gameTime < 820 && !refs.objHerald) {
                        refs.objHerald = true;
                        pushToast({
                            type: 'objective',
                            title: 'OBJECTIF (30s)',
                            name: 'Le Héraut de la Faille arrive',
                            status: 'Idéal pour détruire la première tour.',
                            borderColor: 'bg-purple-500 shadow-purple-500/50',
                            imageUrl: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/tower-100.png',
                            duration: 12000
                        });
                    }

                    // Baron Nashor (Spawn à 20:00 -> Notif à 19:30 = 1170s)
                    if (gameTime >= 1170 && gameTime < 1180 && !refs.objBaron) {
                        refs.objBaron = true;
                        pushToast({
                            type: 'objective',
                            title: 'OBJECTIF MAJEUR (30s)',
                            name: 'Baron Nashor',
                            status: 'Objectif de victoire, contrôlez la rivière.',
                            iconColor: 'bg-fuchsia-600',
                            borderColor: 'bg-fuchsia-600 shadow-fuchsia-600/50',
                            imageUrl: 'https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/baron-100.png',
                            duration: 12000
                        });
                    }
                }

                // --- 2. JOUEUR (Skills & Wards) ---
                if (data.activePlayer && data.allPlayers) {
                    const active = data.activePlayer;
                    const current = data.allPlayers.find(p => p.summonerName === active.summonerName);
                    const level = current?.level || active.level || 1;

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
                                name: `Améliorez le sort ${letter}`,
                                status: lvl === 1 ? 'Sort à débloquer en premier' : `Vous avez atteint le niveau ${lvl}.`,
                                iconColor: color,
                                borderColor: color,
                                letter: letter,
                                imageUrl: imageUrl,
                                duration: 8000
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
                        pushToast({
                            type: 'ward',
                            title: 'VISION MAP',
                            name: 'Changement de Trinket',
                            status: refs.isJungle ? 'Prenez le Brouilleur Oracle pour gank.' : 'Achetez des Wards de Contrôle au prochain back.',
                            iconColor: 'bg-emerald-500',
                            borderColor: 'bg-emerald-500 shadow-emerald-500/50',
                            icon: Eye,
                            duration: 10000
                        });
                    }
                }
            } catch (e) {
                // Ignore API errors gracefully
            }
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(testInterval);
            window.ipcRenderer.removeListener('settings:sync', handleSync);
            window.ipcRenderer.removeListener('ingame:update', handleUpdate);
            window.ipcRenderer.removeListener('skills:update', handleUpdate);
        };
    }, []);

    if (!toasts || toasts.length === 0) return null;

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center', // Centered vertically in the available window,
            alignItems: 'flex-start',
            padding: '24px',
            gap: '12px',
            pointerEvents: 'none'
        }}>
            <div className="flex flex-col gap-3 w-full h-full justify-center">
                {toasts.map(toast => {
                    const Icon = toast.icon || AlertCircle;

                    return (
                        <div
                            key={toast.id}
                            className={`w-[320px] bg-black/80 backdrop-blur-[24px] border border-white/10 rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-right-8 fade-in duration-500 relative overflow-hidden pointer-events-none shadow-2xl`}
                        >
                            {/* Accent Line (Left edge highlight) */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${toast.borderColor || 'bg-accent-primary'}`} />

                            {/* Avatar / Icon Container */}
                            <div className={`relative shrink-0 w-12 h-12 rounded-xl flex items-center justify-center shadow-lg border border-white/20 ${toast.imageUrl ? 'bg-transparent overflow-hidden' : toast.iconColor}`}>
                                {toast.imageUrl ? (
                                    <img src={toast.imageUrl} alt="" className="w-full h-full object-cover scale-110" onError={(e) => { e.target.style.display = 'none'; }} />
                                ) : toast.letter ? (
                                    <span className="text-white font-black text-xl drop-shadow-md">{toast.letter}</span>
                                ) : (
                                    <Icon className="w-6 h-6 text-white drop-shadow-md" />
                                )}
                            </div>

                            {/* Text Content */}
                            <div className="flex-1 min-w-0 pr-2">
                                <div className="text-[10px] font-black text-white/50 uppercase tracking-[0.2em] mb-1">
                                    {toast.title || "SYSTEM"}
                                </div>
                                <div className="text-[14px] font-black text-white truncate leading-tight mb-0.5">
                                    {toast.name}
                                </div>
                                <div className="text-[11px] text-gray-300 font-medium leading-snug">
                                    {toast.status}
                                </div>
                            </div>

                            {/* Progress / Lifetime Bar */}
                            <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                                <div
                                    className={`h-full opacity-50 shadow-[0_0_10px_rgba(255,255,255,0.5)] bg-current ${toast.iconColor ? toast.iconColor.replace('bg-', 'text-') : 'text-white'}`}
                                    style={{ width: '100%', animation: `toastProgress ${toast.duration || 8000}ms linear forwards` }}
                                />
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
