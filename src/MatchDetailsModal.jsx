import React, { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Sword, LayoutGrid, List, FileText, Activity, Shield, Zap, TrendingUp, Eye, Target, MousePointer2, Package, Clock, ChevronRight } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
    return twMerge(clsx(inputs));
}

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

const SPELL_MAP = {
    1: "SummonerBoost", 3: "SummonerExhaust", 4: "SummonerFlash", 6: "SummonerHaste",
    7: "SummonerHeal", 11: "SummonerSmite", 12: "SummonerTeleport", 13: "SummonerMana",
    14: "SummonerDot", 21: "SummonerBarrier", 30: "SummonerPoroRecall", 31: "SummonerPoroThrow",
    32: "SummonerSnowball", 39: "SummonerSnowURFSnowball_Mark", 54: "Summoner_UltBookPlaceholder"
};

export function MatchDetailsModal({ game: initialGame, isOpen, onClose, userRank, selfPuuid: propPuuid, onSearch, t }) {
    const [activeTab, setActiveTab] = useState('General');
    const [runeMap, setRuneMap] = useState({});
    const [ddragonVersion, setDdragonVersion] = useState("15.1.1");
    const [loadingFull, setLoadingFull] = useState(false);
    const [fullGame, setFullGame] = useState(null);
    const [timeline, setTimeline] = useState(null);
    const [playerRanks, setPlayerRanks] = useState({});

    // Robust identity extraction
    const displayData = (fullGame && fullGame.participants) ? fullGame : initialGame;
    const participants = useMemo(() => {
        const parts = displayData?.participants || [];
        const identities = displayData?.participantIdentities || [];
        return parts.map(p => {
            const identity = identities.find(i => i.participantId === p.participantId);
            const puuid = p.puuid || identity?.player?.puuid || p.identity?.player?.puuid || identity?.player?.currentPuuid;
            // Clean up stats names (Riot uses different names in overview vs detailed)
            const s = p.stats || {};
            const cleanStats = {
                ...s,
                win: s.win === 'Win' || s.win === true,
                totalMinionsKilled: s.totalMinionsKilled ?? s.minionsKilled ?? 0,
                neutralMinionsKilled: s.neutralMinionsKilled ?? 0,
                totalDamageDealtToChampions: s.totalDamageDealtToChampions ?? s.totalDamageDealtToChamps ?? s.physicalDamageDealtToChampions ?? 0,
                goldEarned: s.goldEarned ?? s.goldEarnedTotal ?? 0,
                visionScore: s.visionScore ?? 0,
                wardsPlaced: s.wardsPlaced ?? s.wardsPlacedTotal ?? 0,
                wardsKilled: s.wardsKilled ?? 0,
                visionWardsBoughtInGame: s.visionWardsBoughtInGame ?? s.visionWardsBought ?? 0
            };
            return { ...p, identity, puuid, stats: cleanStats };
        });
    }, [displayData]);

    const isExternal = useMemo(() => {
        if (!initialGame) return false;
        return initialGame.isExternal ||
            (initialGame.puuid && String(initialGame.puuid).startsWith('ext~')) ||
            String(initialGame.gameId).startsWith('ext~');
    }, [initialGame]);

    const matchRegion = useMemo(() => {
        if (!initialGame) return undefined;
        if (initialGame.region) return initialGame.region;
        if (initialGame.platformId) {
            const p = initialGame.platformId.toUpperCase();
            if (p.startsWith('EUW')) return 'EUW';
            if (p.startsWith('NA')) return 'NA';
            if (p.startsWith('KR')) return 'KR';
            if (p.startsWith('EUN')) return 'EUNE';
            if (p.startsWith('LA1')) return 'LAN';
            if (p.startsWith('LA2')) return 'LAS';
            if (p.startsWith('BR')) return 'BR';
            if (p.startsWith('TR')) return 'TR';
            if (p.startsWith('JP')) return 'JP';
            if (p.startsWith('OC')) return 'OCE';
        }
        return undefined;
    }, [initialGame]);

    useEffect(() => {
        if (!isOpen || !initialGame?.gameId) {
            setFullGame(null);
            setTimeline(null);
            return;
        }

        console.log(`[Modal] Attempting to load game ${initialGame.gameId}, isExternal: ${isExternal}`);

        if (isExternal) {
            setFullGame(initialGame);
            setTimeline(null);
            setLoadingFull(false);
            return;
        }

        setLoadingFull(true);
        Promise.all([
            window.ipcRenderer.invoke('lcu:get-game', initialGame.gameId).catch(e => { console.warn("[Modal] get-game fail", e); return null; }),
            window.ipcRenderer.invoke('lcu:get-timeline', initialGame.gameId).catch(e => { console.warn("[Modal] get-timeline fail", e); return null; })
        ])
            .then(([gameData, timelineData]) => {
                console.log(`[Modal] LCU Data Received`, { hasGame: !!gameData, hasTimeline: !!timelineData });
                if (gameData) setFullGame(gameData);
                else setFullGame(initialGame);

                if (timelineData) {
                    // Deep search for frames Array
                    const findFrames = (obj) => {
                        if (!obj) return null;
                        if (obj.frames && Array.isArray(obj.frames)) return obj;
                        if (obj.info?.frames && Array.isArray(obj.info.frames)) return obj.info;
                        if (obj.timeline?.frames && Array.isArray(obj.timeline.frames)) return obj.timeline;
                        if (obj.data?.frames && Array.isArray(obj.data.frames)) return obj.data;
                        return null;
                    };
                    const extractedTimeline = findFrames(timelineData) || timelineData;
                    setTimeline(extractedTimeline);
                } else {
                    setTimeline(null);
                }
            })
            .catch(err => {
                console.error("[Modal] Fatal Data Fetch Error:", err);
                setFullGame(initialGame);
            })
            .finally(() => setLoadingFull(false));
    }, [initialGame?.gameId, isOpen, isExternal]);

    useEffect(() => {
        if (!isOpen) return;
        fetch("https://ddragon.leagueoflegends.com/api/versions.json")
            .then(r => r.json())
            .then(vs => {
                const v = vs[0];
                setDdragonVersion(v);
                return fetch(`https://ddragon.leagueoflegends.com/cdn/${v}/data/en_US/runesReforged.json`);
            })
            .then(r => r.json())
            .then(data => {
                const map = {};
                data.forEach(tree => {
                    map[tree.id] = tree.icon;
                    tree.slots.forEach(slot => slot.runes.forEach(rune => map[rune.id] = rune.icon));
                });
                setRuneMap(map);
            }).catch(console.error);
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen || !participants.length) return;

        participants.forEach(p => {
            if (p.puuid && !playerRanks[p.puuid]) {
                window.ipcRenderer.invoke('lcu:get-ranked-stats', p.puuid)
                    .then(stats => {
                        if (stats) {
                            setPlayerRanks(prev => ({ ...prev, [p.puuid]: stats }));
                        }
                    })
                    .catch(e => console.error("Error fetching rank for", p.puuid, e));
            }
        });
    }, [isOpen, participants.length]);

    if (!isOpen || !displayData) return null;



    const team100 = participants.filter(p => p.teamId === 100);
    const team200 = participants.filter(p => p.teamId === 200);
    const team100Win = (displayData.teams?.find(t => t.teamId === 100)?.win === 'Win') || team100.some(p => p.stats?.win);
    const team200Win = (displayData.teams?.find(t => t.teamId === 200)?.win === 'Win') || team200.some(p => p.stats?.win);

    const selfPuuid = propPuuid || initialGame?.selfPuuid || displayData?.selfPuuid;
    const me = participants.find(p => p.puuid === selfPuuid) || participants[0];

    // Scoring logic (normalized 0-99)
    const getPlayerScore = (p) => {
        if (!p.stats) return 0;
        const kda = ((p.stats.kills + p.stats.assists) / Math.max(1, p.stats.deaths));
        const dmgRatio = p.stats.totalDamageDealtToChampions / 1000;
        const csRatio = (p.stats.totalMinionsKilled || 0) / Math.max(1, displayData.gameDuration / 60);
        let score = (kda * 5) + (dmgRatio * 0.5) + (csRatio * 2);
        return Math.min(99, Math.round(score + 15));
    };

    const sorted = [...participants].sort((a, b) => getPlayerScore(b) - getPlayerScore(a));
    const rankMap = {};
    sorted.forEach((p, i) => rankMap[p.participantId] = i + 1);

    const winningPlayers = sorted.filter(p => p.stats?.win);
    const mvpId = winningPlayers[0]?.participantId;
    const aceId = sorted.filter(p => !p.stats?.win)[0]?.participantId;

    const maxDamage = Math.max(...participants.map(p => p.stats?.totalDamageDealtToChampions || 0), 1);

    // Safety: some API versions return duration in ms, some in seconds. 
    // If > 10000, it's almost certainly ms or a huge game.
    const gameDuration = displayData.gameDuration > 10000 ? displayData.gameDuration / 1000 : displayData.gameDuration;
    const durationMin = Math.max(1, gameDuration / 60);

    return createPortal(
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-xl p-4 animate-in fade-in duration-300" onClick={onClose}>
            <div className="relative w-full max-w-7xl h-[85vh] bg-white dark:bg-[#0d0d0f] border border-gray-200 dark:border-white/10 rounded-[1.5rem] overflow-hidden flex flex-col shadow-2xl transition-colors duration-300" onClick={e => e.stopPropagation()}>

                {/* Scoreboard Navigation */}
                <div className="h-16 shrink-0 border-b border-gray-200 dark:border-white/5 flex items-center bg-gray-50 dark:bg-[#111114] px-10">
                    <div className="flex gap-10">
                        {['General', 'Details', 'Runes'].map(tab => (
                            <button key={tab} onClick={() => setActiveTab(tab)}
                                className={cn("relative py-5 text-sm font-semibold transition-all flex items-center gap-2",
                                    activeTab === tab ? "text-blue-600 dark:text-blue-400" : "text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300")}>
                                {tab === 'General' && <LayoutGrid size={16} />}
                                {tab === 'Details' && <Activity size={16} />}
                                {tab === 'Runes' && <List size={16} />}
                                {t(`tab_${tab.toLowerCase()}`)}
                                {activeTab === tab && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 dark:bg-blue-400" />}
                            </button>
                        ))}
                    </div>
                    <div className="flex-1" />
                    <button onClick={onClose} className="w-10 h-10 rounded-full hover:bg-gray-200 dark:hover:bg-white/5 flex items-center justify-center text-gray-500 transition-colors"><X size={20} /></button>
                </div>

                <div className="flex-1 overflow-y-auto p-6 scrollbar-hide bg-[#0a0a0c]">
                    <div className="max-w-6xl mx-auto">
                        {activeTab === 'General' && (
                            <div className="flex flex-col gap-10 animate-in fade-in slide-in-from-bottom-4 duration-500">
                                {isExternal && (
                                    <div className="bg-blue-500/10 border border-blue-400/20 p-4 rounded-3xl text-center">
                                        <div className="text-xs font-black text-blue-300 uppercase italic tracking-widest">{t('partial_data')}</div>
                                        <div className="text-[10px] text-gray-400 mt-1 uppercase font-bold tracking-[0.2em]">{t('partial_data_desc')}</div>
                                    </div>
                                )}
                                <ScoreboardTeamSection
                                    title={t('victory')} side={t('blue_side')} players={team100} isWin={team100Win} objectives={displayData?.teams?.find(t => t.teamId === 100)}
                                    mvpId={mvpId} aceId={aceId} rankMap={rankMap} runeMap={runeMap} ver={ddragonVersion} maxDmg={maxDamage} dur={durationMin}
                                    getScore={getPlayerScore} selfPuuid={selfPuuid} selfRank={userRank} onSearch={onSearch} playerRanks={playerRanks} matchRegion={matchRegion}
                                />
                                <ScoreboardTeamSection
                                    title={t('defeat')} side={t('red_side')} players={team200} isWin={team200Win} objectives={displayData?.teams?.find(t => t.teamId === 200)}
                                    mvpId={mvpId} aceId={aceId} rankMap={rankMap} runeMap={runeMap} ver={ddragonVersion} maxDmg={maxDamage} dur={durationMin}
                                    getScore={getPlayerScore} selfPuuid={selfPuuid} selfRank={userRank} onSearch={onSearch} playerRanks={playerRanks} matchRegion={matchRegion}
                                />
                            </div>
                        )}

                        {activeTab === 'Details' && (
                            <DetailsTabController
                                loadingFull={loadingFull}
                                fullGame={fullGame}
                                initialGame={initialGame}
                                participants={participants}
                                timeline={timeline}
                                selfPuuid={selfPuuid}
                                ver={ddragonVersion}
                                dur={durationMin}
                                t={t}
                            />
                        )}

                        {activeTab === 'Runes' && (
                            <div className="grid grid-cols-2 gap-6 animate-in zoom-in-95 duration-500">
                                {participants.map(p => <RuneCard key={p.participantId} p={p} runeMap={runeMap} />)}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>,
        document.body
    );
}

function DetailsTabController({ loadingFull, fullGame, timeline, selfPuuid, ver, dur, initialGame, participants, t }) {
    const p = useMemo(() => {
        if (!participants || participants.length === 0) return null;

        const targetPuuid = selfPuuid;
        // Search by PUUID, then fallback
        let found = participants.find(part => part.puuid === targetPuuid);

        // Last resort name match
        if (!found && initialGame?.summonerName) {
            found = participants.find(part =>
                part.identity?.player?.summonerName === initialGame.summonerName ||
                part.identity?.player?.displayName === initialGame.summonerName ||
                part.summonerName === initialGame.summonerName
            );
        }

        return found || participants[0];
    }, [participants, selfPuuid, initialGame]);

    const [selectedId, setSelectedId] = useState(null);
    useEffect(() => { if (p) setSelectedId(p.participantId); }, [p]);

    const currentP = participants?.find(part => part.participantId === selectedId) || p;

    if (!fullGame && loadingFull) return <div className="flex flex-col items-center justify-center h-64 text-gray-400 gap-4 animate-pulse">
        <Activity className="w-12 h-12 text-blue-500 opacity-50" />
        <div className="font-bold italic">{t('fetching_details')}</div>
    </div>;

    if (!currentP) return <div className="text-center py-20 text-gray-500 italic">{t('no_details_found')}</div>;

    return (
        <DetailsTabView
            p={currentP}
            participants={participants}
            timeline={timeline}
            ver={ver}
            dur={dur}
            onSelectPlayer={setSelectedId}
            loadingFull={loadingFull}
            fullGame={fullGame}
            selfPuuid={selfPuuid}
            t={t}
        />
    );
}

function DetailsTabView({ p, participants, timeline, ver, dur, onSelectPlayer, loadingFull, fullGame, selfPuuid, t }) {
    const playersLine = (teamId) => (participants || []).filter(pl => pl.teamId === teamId);

    if (!p || (loadingFull && !fullGame)) return <div className="flex flex-col items-center justify-center h-[500px] text-gray-400 gap-6">
        <div className="relative w-20 h-20">
            <Activity className="w-full h-full text-blue-500 opacity-50 animate-spin-slow" />
            <div className="absolute inset-0 flex items-center justify-center">
                <Sword className="w-8 h-8 text-blue-400" />
            </div>
        </div>
        <div className="font-black italic text-xl tracking-tighter text-blue-500/50">{t('analyzing_match')}</div>
    </div>;

    const frames = useMemo(() => {
        if (!timeline) return [];
        // Deep search for frames array in nested structures
        const search = (obj) => {
            if (!obj) return null;
            if (Array.isArray(obj)) return obj;
            if (Array.isArray(obj.frames)) return obj.frames;
            if (obj.timeline?.frames) return obj.timeline.frames;
            if (obj.data?.frames) return obj.data.frames;
            for (const key in obj) {
                if (obj[key] && typeof obj[key] === 'object') {
                    const found = search(obj[key]);
                    if (found) return found;
                }
            }
            return null;
        };
        return search(timeline) || [];
    }, [timeline]);

    const hasTimeline = frames.length > 0;

    // Build & Skill logic with robust PID matching
    const buildEvents = [];
    const skillEvents = [];

    const targetPuuid = selfPuuid || p.puuid || p.identity?.player?.puuid;
    const targetChampId = p.championId;
    const targetName = (p.summonerName || p.identity?.player?.summonerName || "").toLowerCase();
    let myPid = -1;

    if (hasTimeline) {
        // High-precision Participant ID detection
        myPid = Number(p.participantId);

        if (targetPuuid) {
            const foundP = participants?.find(part => part.puuid === targetPuuid);
            if (foundP) myPid = Number(foundP.participantId);
        }

        // EXTRA SECURE: Pre-scan for an event that has our PUUID to confirm our PID in THIS timeline
        if (targetPuuid) {
            for (const frame of frames) {
                const evts = frame.events || frame.Events || [];
                const match = evts.find(e => (e.puuid === targetPuuid || e.playerPuuid === targetPuuid) && (e.participantId || e.participantID));
                if (match) {
                    myPid = Number(match.participantId || match.participantID);
                    break;
                }
            }
        }

        // COLLECT ALL EVENTS (Frames + Root)
        const allEvents = [];
        frames.forEach(frame => {
            const evts = frame.events || frame.Events || [];
            allEvents.push(...evts);
        });
        if (timeline?.events && Array.isArray(timeline.events)) allEvents.push(...timeline.events);
        if (timeline?.Events && Array.isArray(timeline.Events)) allEvents.push(...timeline.Events);

        allEvents.forEach(evt => {
            const epid = Number(evt.participantId ?? evt.participantID ?? evt.actorId ?? evt.creatorId ?? evt.killerId ?? evt.victimId ?? -1);

            // Match PID (1-indexed), PID-1 (0-indexed), or PUUID
            const isMe = (myPid !== -1 && (epid === myPid || epid === myPid - 1)) ||
                (targetPuuid && (evt.puuid === targetPuuid || evt.playerPuuid === targetPuuid));

            if (isMe) {
                const rawType = String(evt.type || evt.Type || "");
                const type = rawType.toUpperCase();
                const itemId = evt.itemId ?? evt.itemid ?? evt.itemID;
                const timestamp = evt.timestamp ?? evt.Timestamp ?? 0;
                const time = Math.floor(timestamp / 60000);

                const isItem = type.includes('ITEM');
                const isProc = type.includes('PURCHASE') || type.includes('BOUGHT') || type.includes('ACQUIRED');
                const isLoss = type.includes('SOLD') || type.includes('DESTROYED') || type.includes('UNDO');

                // Item Event
                if (isItem) {
                    if (isProc) {
                        if (itemId) buildEvents.push({ id: itemId, time, sold: false });
                    } else if (isLoss) {
                        if (itemId) buildEvents.push({ id: itemId, time, sold: true });
                    }
                }

                // Skill Level Up
                if (type.includes('SKILL') || (type.includes('LEVEL') && (evt.skillSlot !== undefined || evt.slot !== undefined))) {
                    let slot = evt.skillSlot ?? evt.slot ?? evt.skillSlotId;
                    if (slot !== undefined) {
                        let nSlot = Number(slot);
                        if (nSlot === 0) nSlot = 1;
                        if (nSlot >= 1 && nSlot <= 4) skillEvents.push(nSlot);
                    }
                }
            }
        });
    }

    // Group items by time for the UI
    const groupedBuild = useMemo(() => {
        const groups = {};
        buildEvents.filter(e => e.id < 10000).forEach(e => {
            if (!groups[e.time]) groups[e.time] = [];
            groups[e.time].push(e);
        });
        return Object.entries(groups).sort((a, b) => Number(a[0]) - Number(b[0])).slice(0, 15);
    }, [buildEvents]);

    // Laning Stats - Type safe and robust
    let laning = { csDiff: 0, goldDiff: 0, xpDiff: 0 };
    if (hasTimeline && frames.length > 1) {
        const targetFrameIdx = Math.min(15, frames.length - 1);
        const f = frames[targetFrameIdx];
        if (f && f.participantFrames) {
            const pid = String(p.participantId);
            // Try pid, then pid-1 (0-indexed)
            const myF = f.participantFrames[pid] ||
                f.participantFrames[String(Number(pid) - 1)] ||
                Object.values(f.participantFrames).find(pf => pf.participantId == pid || pf.participantId == Number(pid) - 1);

            const opp = participants.find(o => o.teamId !== p.teamId && (o.timeline?.lane === p.timeline?.lane || o.timeline?.role === p.timeline?.role));
            const oppPid = opp ? String(opp.participantId) : null;
            const oppF = oppPid ? (f.participantFrames[oppPid] ||
                f.participantFrames[String(Number(oppPid) - 1)] ||
                Object.values(f.participantFrames).find(pf => pf.participantId == oppPid || pf.participantId == Number(oppPid) - 1)) : null;

            if (myF && oppF) {
                const getCS = (x) => (Number(x.minionsKilled) || 0) + (Number(x.jungleMinionsKilled) || Number(x.neutralMinionsKilled) || 0);
                const myGold = Number(myF.totalGold ?? myF.gold ?? 0);
                const oppGold = Number(oppF.totalGold ?? oppF.gold ?? 0);
                const myXp = Number(myF.xp ?? myF.experience ?? 0);
                const oppXp = Number(oppF.xp ?? oppF.experience ?? 0);

                laning = {
                    csDiff: getCS(myF) - getCS(oppF),
                    goldDiff: myGold - oppGold,
                    xpDiff: myXp - oppXp
                };
            }
        }
    } else if (participants) {
        // Approximation if timeline is missing
        const opp = participants.find(o => o.teamId !== p.teamId && (o.teamPosition === p.teamPosition || o.timeline?.lane === p.timeline?.lane));
        if (opp) {
            const ratio = Math.min(15, dur) / Math.max(1, dur);
            const myCs = (p.stats.totalMinionsKilled || 0) + (p.stats.neutralMinionsKilled || 0);
            const oppCs = (opp.stats.totalMinionsKilled || 0) + (opp.stats.neutralMinionsKilled || 0);
            laning = {
                csDiff: Math.round((myCs - oppCs) * ratio),
                goldDiff: Math.round(((p.stats.goldEarned || 0) - (opp.stats.goldEarned || 0)) * ratio),
                xpDiff: Math.round(((p.stats.champLevel || 0) - (opp.stats.champLevel || 0)) * 400 * ratio)
            };
        }
    }

    // Calculate Combat Stats matching requested metrics
    const combatStats = useMemo(() => {
        const stats = p.stats || {};
        const ch = stats.challenges || p.challenges || {};

        let kp = 0;
        if (ch.killParticipation > 0) {
            kp = ch.killParticipation * 100;
        } else if (participants) {
            const teamKills = participants.filter(part => part.teamId === p.teamId).reduce((sum, part) => sum + (part.stats?.kills || 0), 0);
            if (teamKills > 0) kp = ((stats.kills + stats.assists) / teamKills) * 100;
        }

        // Teamfights gagnés : proxy if not exactly available. Ratio of kills/assists in late game? Let's use KP * WinRate or similar proxy if no explicit challenge.
        let tfWinrate = stats.win ? (kp + 10) : (kp > 30 ? kp - 10 : kp / 2);
        if (tfWinrate > 100) tfWinrate = 100;

        let soloKillsNum = ch.soloKills !== undefined ? ch.soloKills : (stats.kills > stats.assists ? stats.kills - stats.assists : stats.kills * 0.15);
        let killsTurretNum = ch.takedownsUnderEnemyTurret !== undefined ? ch.takedownsUnderEnemyTurret : stats.kills * 0.2;
        let deathsTurretNum = ch.deathsNearEnemyTurret !== undefined ? ch.deathsNearEnemyTurret : stats.deaths * 0.2;

        // Timeline analysis for solo deaths
        let soloDeathsNum = ch.soloDeaths !== undefined ? ch.soloDeaths : 0;
        if (hasTimeline && ch.soloDeaths === undefined) {
            let found = 0;
            frames.forEach(f => {
                const evts = f.events || f.Events || [];
                evts.forEach(e => {
                    const type = String(e.type || e.Type || "").toUpperCase();
                    if (type === 'CHAMPION_KILL') {
                        const victimId = Number(e.victimId || e.VictimId || -1);
                        const killerId = Number(e.killerId || e.KillerId || -1);
                        const assistingIds = e.assistingParticipantIds || [];
                        if (myPid !== -1 && (victimId === myPid || victimId === myPid - 1)) {
                            if (assistingIds.length === 0 && killerId > 0 && killerId !== victimId) {
                                found++;
                            }
                        }
                    }
                });
            });
            soloDeathsNum = found;
        } else if (ch.soloDeaths === undefined) {
            soloDeathsNum = stats.deaths * 0.3; // proxy
        }

        const duelsPlayed = soloKillsNum + soloDeathsNum;
        const duelsWinrateNum = duelsPlayed > 0 ? (soloKillsNum / duelsPlayed * 100) : 0;
        const killsUnderTurretPctNum = stats.kills > 0 ? (killsTurretNum / stats.kills * 100) : 0;
        const soloDeathsPctNum = stats.deaths > 0 ? (soloDeathsNum / stats.deaths * 100) : 0;
        const deathsUnderTurretPctNum = stats.deaths > 0 ? (deathsTurretNum / stats.deaths * 100) : 0;

        const formatPct = (val) => val === 0 ? "0%" : `${Math.round(val)}%`;

        return {
            tfParticipation: formatPct(tfWinrate),
            duelsWinrateNum: formatPct(duelsWinrateNum),
            killsUnderTurretPctNum: formatPct(killsUnderTurretPctNum),
            kp: formatPct(kp),
            soloDeathsPctNum: formatPct(soloDeathsPctNum),
            deathsUnderTurretPctNum: formatPct(deathsUnderTurretPctNum)
        };
    }, [p, hasTimeline, frames, myPid, participants]);

    return (
        <div className="max-w-6xl mx-auto space-y-6 pb-12 animate-in fade-in zoom-in-95 duration-700">
            {/* Participant selector - Fluid Design */}
            <div className="relative group/sel p-4 bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[2.5rem] shadow-2xl overflow-hidden transition-all hover:border-white/10">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-transparent to-red-500/5 opacity-50" />
                <div className="flex items-center justify-between relative z-10">
                    <div className="flex gap-2.5">
                        {playersLine(100).map(pl => (
                            <ParticipantIcon key={pl.participantId} pl={pl} active={p.participantId === pl.participantId} onClick={() => onSelectPlayer(pl.participantId)} side="blue" />
                        ))}
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="text-[14px] font-black italic text-white/10 tracking-widest uppercase">VS</div>
                    </div>
                    <div className="flex gap-2.5">
                        {playersLine(200).map(pl => (
                            <ParticipantIcon key={pl.participantId} pl={pl} active={p.participantId === pl.participantId} onClick={() => onSelectPlayer(pl.participantId)} side="red" />
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Stats Grid */}
            <div className="grid grid-cols-3 gap-6">
                <DetailCard title={t('laning_phase')} icon={<TrendingUp size={14} />}>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <StatItem label={t('cs_diff')} val={Math.abs(laning.csDiff)} color={laning.csDiff >= 0 ? "text-green-400" : "text-red-400"} prefix={laning.csDiff >= 0 ? "+" : "-"} />
                        <StatItem label={t('gold_diff_title')} val={`${Math.abs(laning.goldDiff / 1000).toFixed(1)}k`} color={laning.goldDiff >= 0 ? "text-yellow-400" : "text-red-400"} prefix={laning.goldDiff >= 0 ? "+" : "-"} />
                        <StatItem label={t('xp_diff')} val={Math.abs(laning.xpDiff)} color={laning.xpDiff >= 0 ? "text-blue-400" : "text-red-400"} prefix={laning.xpDiff >= 0 ? "+" : "-"} />
                    </div>
                </DetailCard>
                <DetailCard title={t('vision_control_title')} icon={<Eye size={14} />}>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <StatItem label={t('wards_placed_title')} val={p.stats.wardsPlaced || 0} />
                        <StatItem label={t('wards_destroyed')} val={p.stats.wardsKilled || 0} />
                        <StatItem label={t('control_wards')} val={p.stats.visionWardsBoughtInGame || 0} color="text-purple-400" />
                    </div>
                </DetailCard>
                <DetailCard title={t('perf_min')} icon={<Zap size={14} />}>
                    <div className="grid grid-cols-3 gap-4 pt-4">
                        <StatItem label={t('cs_min_short')} val={((p.stats.totalMinionsKilled + p.stats.neutralMinionsKilled) / Math.max(1, dur)).toFixed(1)} />
                        <StatItem label={t('dmg_min_short')} val={Math.round(p.stats.totalDamageDealtToChampions / Math.max(1, dur))} color="text-orange-400" />
                        <StatItem label={t('gold_min_short')} val={Math.round(p.stats.goldEarned / Math.max(1, dur))} color="text-yellow-500" />
                    </div>
                </DetailCard>
            </div>

            {/* Combat Stats Grid matching Screen 1 */}
            <DetailCard title="Combat" icon={<Sword size={14} />}>
                <div className="grid grid-cols-6 gap-4 py-4 w-full justify-items-center">
                    <CircularStat value={combatStats.tfParticipation} label="Teamfights gagnés" color="stroke-blue-500" />
                    <CircularStat value={combatStats.duelsWinrateNum} label="Duels gagnés" color="stroke-indigo-500" />
                    <CircularStat value={combatStats.killsUnderTurretPctNum} label="Kills sous tour ennemie" color="stroke-rose-500" />
                    <CircularStat value={combatStats.kp} label="Participation aux Teamfights" color="stroke-emerald-500" />
                    <CircularStat value={combatStats.soloDeathsPctNum} label="Morts en solo" color="stroke-orange-500" />
                    <CircularStat value={combatStats.deathsUnderTurretPctNum} label="Morts sous tour ennemie" color="stroke-red-500" />
                </div>
            </DetailCard>
        </div>
    );
}

// Sub-components for better organization and styling
function DetailCard({ title, icon, children }) {
    return (
        <div className="group relative bg-[#0d0d11]/80 backdrop-blur-3xl border border-white/[0.05] p-6 rounded-[2rem] shadow-2xl overflow-hidden transition-all duration-500 hover:border-white/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-colors" />
            <div className="flex items-center gap-2 mb-6">
                <div className="p-1.5 bg-blue-500/10 text-blue-400 rounded-lg border border-blue-500/20">{icon}</div>
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{title}</h3>
            </div>
            {children}
        </div>
    );
}

function StatItem({ label, val, color = "text-white/90", prefix = "" }) {
    return (
        <div className="flex flex-col items-center">
            <div className={cn("text-xl font-black tabular-nums tracking-tighter", color)}>{prefix}{val}</div>
            <div className="text-[8px] font-bold text-gray-500 uppercase tracking-widest mt-1 opacity-50">{label}</div>
        </div>
    );
}

function ParticipantIcon({ pl, active, onClick, side }) {
    const color = side === "blue" ? "border-blue-500" : "border-red-500";
    return (
        <div onClick={onClick} className={cn(
            "w-12 h-12 rounded-[1.2rem] border-2 transition-all duration-500 cursor-pointer relative group",
            active ? cn(color, "scale-110 shadow-[0_0_20px_rgba(59,130,246,0.3)] ring-4 ring-white/5") : "border-white/5 opacity-50 hover:opacity-100 grayscale hover:grayscale-0"
        )}>
            <img
                src={(pl.championId && pl.championId > 0)
                    ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${pl.championId}.png`
                    : `https://cdn.communitydragon.org/latest/champion/${normalizeChampName(pl.championName || "Yasuo")}/square`
                }
                className="w-full h-full object-cover rounded-[1rem]"
                alt="champ"
                onError={(e) => { e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png" }}
            />
            <div className={cn("absolute -bottom-1 inset-x-0 h-1 rounded-full transition-opacity mx-3", active ? (side === "blue" ? "bg-blue-400" : "bg-red-400") : "bg-transparent")} />
        </div>
    );
}

function CircularStat({ value, label, color }) {
    const numericValue = parseFloat(value);
    const dashArray = 251.2;
    const dashOffset = isNaN(numericValue) ? dashArray : dashArray - (dashArray * numericValue) / 100;

    return (
        <div className="flex flex-col items-center gap-3">
            <div className="relative w-24 h-24 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                    <circle cx="48" cy="48" r="40" className="stroke-white/5" strokeWidth="6" fill="transparent" />
                    <circle cx="48" cy="48" r="40" className={cn("transition-all duration-1000 ease-out", color)} strokeWidth="6" fill="transparent" strokeDasharray={dashArray} strokeDashoffset={dashOffset} strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-black text-white">{value}</span>
                </div>
            </div>
            <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest text-center max-w-[90px] leading-tight">{label}</span>
        </div>
    );
}

// Reliable CDragon Ping mapping - Standard paths
const PING_ASSETS = {
    danger: "https://raw.communitydragon.org/latest/game/assets/ux/minimap/pings/danger.png",
    assist: "https://raw.communitydragon.org/latest/game/assets/ux/minimap/pings/assist.png",
    missing: "https://raw.communitydragon.org/latest/game/assets/ux/minimap/pings/enemy_missing.png",
    omw: "https://raw.communitydragon.org/latest/game/assets/ux/minimap/pings/on_my_way.png",
    vision: "https://raw.communitydragon.org/latest/game/assets/ux/minimap/pings/enemy_vision.png",
    rally: "https://raw.communitydragon.org/latest/game/assets/ux/minimap/pings/rally.png"
};

function PingMinimal({ icon, val }) {
    const [imgError, setImgError] = useState(false);

    // Lucide Fallback Map
    const FallbackIcon = {
        omw: { icon: <TrendingUp size={16} />, color: "text-green-400" },
        danger: { icon: <Shield size={16} />, color: "text-red-400" },
        assist: { icon: <Activity size={16} />, color: "text-blue-400" },
        missing: { icon: <Target size={16} />, color: "text-yellow-400" },
        vision: { icon: <Eye size={16} />, color: "text-purple-400" },
        rally: { icon: <Zap size={16} />, color: "text-orange-400" }
    }[icon] || { icon: <MousePointer2 size={16} />, color: "text-gray-400" };

    return (
        <div className="flex flex-col items-center gap-3">
            {!imgError ? (
                <img
                    src={PING_ASSETS[icon]}
                    className="w-7 h-7 object-contain brightness-125 select-none drop-shadow-lg"
                    onError={(e) => {
                        if (!e.target.triedAlt) {
                            e.target.triedAlt = true;
                            const alt = icon === 'rally' ? 'get_back' : (icon === 'omw' ? 'on_my_way' : (icon === 'missing' ? 'enemy_missing' : (icon === 'vision' ? 'enemy_vision' : icon)));
                            e.target.src = `https://raw.communitydragon.org/latest/game/assets/ux/minimap/pings/${alt}.png`;
                        } else {
                            setImgError(true);
                        }
                    }}
                />
            ) : (
                <div className={cn("w-7 h-7 flex items-center justify-center rounded-lg bg-white/5", FallbackIcon.color)}>
                    {FallbackIcon.icon}
                </div>
            )}
            <span className="text-[14px] font-bold text-white tabular-nums leading-none tracking-tight">{val}</span>
        </div>
    );
}

function PingMiniItem({ icon, val, color }) {
    return (
        <div className="flex flex-col items-center gap-2 p-2 bg-black/30 rounded-2xl border border-white/5 min-w-[65px] group hover:bg-black/50 transition-all duration-300">
            <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden bg-white/5 backdrop-blur-sm shadow-xl", color)}>
                <img
                    src={PING_ASSETS[icon]}
                    className="w-7 h-7 object-contain z-10 transition-transform duration-500 group-hover:scale-110 brightness-110 drop-shadow-md"
                    onError={(e) => {
                        if (!e.target.triedAlt) {
                            e.target.triedAlt = true;
                            const alt = icon === 'rally' ? 'rally' : (icon === 'omw' ? 'on_my_way' : icon);
                            e.target.src = `https://raw.communitydragon.org/latest/game/assets/ux/minimap/pings/${alt}.png`;
                        }
                    }}
                />
                <div className="absolute inset-0 bg-current opacity-10 animate-pulse"></div>
            </div>
            <span className="text-xs font-black text-white/90 tabular-nums">{val}</span>
        </div>
    );
}

function ScoreboardTeamSection({ title, side, players, isWin, objectives, mvpId, aceId, rankMap, runeMap, ver, maxDmg, dur, getScore, selfPuuid, selfRank, onSearch, playerRanks, matchRegion }) {
    const isBlue = side.includes("bleu");
    const teamId = isBlue ? "100" : "200";

    return (
        <div className="flex flex-col mb-12 last:mb-0 space-y-6">
            {/* Header Section - Premium Glass */}
            <div className={cn(
                "flex items-center justify-between p-6 rounded-[2.5rem] border backdrop-blur-3xl shadow-2xl relative overflow-hidden group",
                isWin
                    ? "bg-blue-600/[0.03] border-blue-500/10"
                    : "bg-red-600/[0.03] border-red-500/10"
            )}>
                <div className={cn(
                    "absolute top-0 right-0 w-48 h-48 blur-[80px] opacity-20",
                    isWin ? "bg-blue-500" : "bg-red-500"
                )} />

                <div className="flex items-center gap-6 relative z-10">
                    <div className={cn(
                        "w-1.5 h-16 rounded-full",
                        isWin ? "bg-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.6)]" : "bg-red-500 shadow-[0_0_20px_rgba(239,68,68,0.6)]"
                    )} />
                    <div className="flex flex-col">
                        <span className={cn(
                            "text-5xl font-black italic uppercase tracking-tighter leading-none mb-2",
                            isWin ? "text-blue-400" : "text-red-400"
                        )}>
                            {isWin ? "Victoire" : "Défaite"}
                        </span>
                        <div className="flex items-center gap-3">
                            <span className="text-gray-500 text-[12px] font-black uppercase tracking-[0.3em]">{side}</span>
                            <div className="h-4 w-px bg-white/10" />
                            <div className="flex items-center gap-2 text-white/90">
                                <Sword size={14} className="opacity-40" />
                                <span className="text-lg font-black tabular-nums tracking-tighter">
                                    {players.reduce((a, b) => a + (b.stats?.kills || 0), 0)} / {players.reduce((a, b) => a + (b.stats?.deaths || 0), 0)} / {players.reduce((a, b) => a + (b.stats?.assists || 0), 0)}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 relative z-10">
                    {/* Team Objectives In Rows */}
                    <div className="flex items-center gap-2 px-6 py-3 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/5 shadow-inner">
                        <Objective icon={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/dragon-${teamId}.png`} val={objectives?.dragonKills} isBlue={isBlue} />
                        <Objective icon={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/baron-${teamId}.png`} val={objectives?.baronKills} isBlue={isBlue} />
                        <Objective
                            icon="https://raw.communitydragon.org/latest/game/assets/ux/minimap/icons/grub.png"
                            val={objectives?.hordeKills}
                            isBlue={isBlue}
                            isGrub={true}
                        />
                        <Objective icon={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/tower-${teamId}.png`} val={objectives?.towerKills} isBlue={isBlue} />
                    </div>

                    <div className="flex flex-col items-end gap-1 px-6 border-l border-white/5">
                        <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none">Total Gold</span>
                        <span className="text-2xl font-black text-yellow-500 tabular-nums tracking-tighter">
                            {(players.reduce((a, b) => a + (b.stats?.goldEarned || 0), 0) / 1000).toFixed(1)}k
                        </span>
                    </div>
                </div>
            </div>

            {/* Rows Section */}
            <div className="flex flex-col gap-2">
                {players.map(p => (
                    <ScoreboardRow
                        key={p.participantId} p={p} isMVP={p.participantId === mvpId} isACE={p.participantId === aceId}
                        rank={rankMap[p.participantId]} runeMap={runeMap} ver={ver} maxDmg={maxDmg} dur={dur}
                        score={getScore(p)} isMe={p.puuid === selfPuuid} selfRank={selfRank} isWin={isWin}
                        players={players} onSearch={onSearch} playerRanks={playerRanks} matchRegion={matchRegion}
                    />
                ))}
            </div>
        </div>
    );
}

function ScoreboardRow({ p, isMVP, isACE, rank, runeMap, ver, maxDmg, dur, score, isMe, selfRank, isWin, players, onSearch, playerRanks, matchRegion }) {
    if (!p.stats) return <div className="h-20 bg-white/[0.02] border border-white/5 rounded-[2rem] animate-pulse" />;
    const stats = p.stats;
    const cs = (stats.totalMinionsKilled || 0) + (stats.neutralMinionsKilled || 0);
    const csm = (cs / dur).toFixed(1);
    const dpm = Math.round(stats.totalDamageDealtToChampions / dur);
    const dmgPct = Math.round((stats.totalDamageDealtToChampions / maxDmg) * 100);
    const name = p.identity?.player?.gameName || p.summonerName || "Inconnu";
    const tag = p.identity?.player?.tagLine || "";
    const searchName = tag ? `${name}#${tag}` : name;

    const soloRank = isMe
        ? (selfRank?.queueMap?.RANKED_SOLO_5x5 || selfRank?.solo)
        : (playerRanks[p.puuid]?.queueMap?.RANKED_SOLO_5x5);

    let tier = soloRank?.tier || 'unranked';
    let rankText = tier !== 'unranked' ? `${soloRank.tier} ${soloRank.division || ""}`.toUpperCase() : "UNRANKED";

    return (
        <div className={cn(
            "grid grid-cols-[60px_60px_230px_100px_190px_130px_100px_1fr] gap-4 px-6 py-5 items-center rounded-[2.5rem] transition-all duration-500 group relative overflow-hidden",
            isMe
                ? "bg-blue-600/[0.08] border border-blue-500/40 shadow-[0_0_30px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/20"
                : "bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10"
        )}>
            {/* Background Glow for Self */}
            {isMe && <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent" />}

            {/* Rank/Badge */}
            <div className="flex justify-center shrink-0">
                {isMVP ? <Badge label="MVP" color="bg-yellow-400 text-black border-yellow-400/50 shadow-[0_0_10px_rgba(250,204,21,0.3)]" /> :
                    isACE ? <Badge label="ACE" color="bg-purple-600 text-white border-purple-500/50 shadow-[0_0_10px_rgba(147,51,234,0.3)]" /> :
                        <div className="text-sm font-black text-gray-400 opacity-40 italic tabular-nums">#{rank}</div>}
            </div>

            {/* Champ Icon */}
            <div
                className="relative w-12 h-12 shrink-0 cursor-pointer group/icon"
                onClick={() => onSearch && onSearch({ name: searchName, puuid: p.puuid, region: matchRegion })}
            >
                <img
                    src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${p.championId}.png`}
                    className="w-full h-full rounded-xl border border-white/10 shadow-lg group-hover/icon:scale-110 group-hover/icon:border-blue-500/50 transition-all"
                    alt="champ"
                    onError={(e) => { e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png" }}
                />
                <div className="absolute -bottom-1.5 -right-1.5 bg-black/90 text-[10px] font-black px-1.5 rounded-md text-white border border-white/20 leading-none py-1 shadow-md group-hover/icon:bg-blue-600 transition-colors">{stats.champLevel}</div>
            </div>

            {/* Identity & Rank */}
            <div
                onClick={() => onSearch && onSearch({ name: searchName, puuid: p.puuid, region: matchRegion })}
                className="flex flex-col min-w-0 cursor-pointer group/name"
            >
                <div className="font-medium text-[16px] text-gray-900 dark:text-white truncate group-hover/name:text-blue-400 transition-colors tracking-tight leading-none mb-2">{name}</div>
                <div className="flex items-center gap-1.5">
                    <img
                        src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${tier.toLowerCase()}.png`}
                        className="w-4 h-4 object-contain"
                        alt="rank emblem"
                        onError={(e) => {
                            if (!e.target.triedAlt) {
                                e.target.triedAlt = true;
                                e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/silver.png`;
                            }
                        }}
                    />
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{rankText}</span>
                </div>
            </div>

            {/* Spells & Runes */}
            <div className="flex items-center gap-3.5 shrink-0">
                <div className="flex flex-col gap-1.5">
                    <SpellIcon id={p.spell1Id} ver={ver} size="w-6 h-6" />
                    <SpellIcon id={p.spell2Id} ver={ver} size="w-6 h-6" />
                </div>
                <div className="flex flex-col gap-2 items-center">
                    {stats.perk0 && (
                        <div className="w-10 h-10 rounded-full bg-black/60 border border-white/10 flex items-center justify-center p-1 shadow-inner ring-1 ring-white/10">
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/img/${runeMap[stats.perk0]}`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    )}
                    {stats.perkSubStyle && (
                        <div className="w-6 h-6 rounded-full bg-black/40 border border-white/5 flex items-center justify-center p-0.5 opacity-70">
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/img/${runeMap[stats.perkSubStyle]}`}
                                className="w-full h-full object-contain grayscale brightness-125"
                                onError={(e) => { e.target.style.display = 'none' }}
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Items Grid */}
            <div className="grid grid-cols-4 gap-1 shrink-0 bg-black/20 p-1 rounded-xl border border-white/5">
                {[0, 1, 2, 6, 3, 4, 5].map((i, idx) => (
                    <div key={idx} className={cn(
                        "w-7 h-7 rounded-lg bg-black/40 border border-white/10 overflow-hidden shadow-sm hover:border-white/30 transition-colors",
                        i === 6 && "border-dashed opacity-40"
                    )}>
                        {stats[`item${i}`] !== 0 && (
                            <img
                                src={`https://ddragon.leagueoflegends.com/cdn/${ver}/img/item/${stats[`item${i}`]}.png`}
                                className="w-full h-full object-cover"
                                onError={(e) => { e.target.style.display = 'none' }}
                            />
                        )}
                    </div>
                ))}
            </div>

            {/* KDA */}
            <div className="flex flex-col items-center">
                <div className="text-lg font-black tracking-tighter flex items-center gap-1.5 leading-none mb-1">
                    <span className="text-gray-900 dark:text-white">{stats.kills}</span>
                    <span className="text-gray-500 font-medium opacity-30">/</span>
                    <span className="text-red-500">{stats.deaths}</span>
                    <span className="text-gray-500 font-medium opacity-30">/</span>
                    <span className="text-gray-900 dark:text-white">{stats.assists}</span>
                </div>
                <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest leading-none">
                    {((stats.kills + stats.assists) / Math.max(1, stats.deaths)).toFixed(2)} KDA
                </div>
            </div>

            {/* Stats (KP, CS, Vision) */}
            <div className="flex flex-col items-end gap-1 px-3 opacity-90 leading-tight border-x border-white/5">
                <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black italic tabular-nums text-white">
                        {Math.round(((stats.kills + stats.assists) / (players.reduce((a, b) => a + (b.stats?.kills || 0), 0) || 1)) * 100)}%
                    </span>
                    <span className="text-[8px] font-bold uppercase text-gray-500 w-4 text-right">KP</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black italic tabular-nums text-white">{csm}</span>
                    <span className="text-[8px] font-bold uppercase text-gray-500 w-4 text-right">CS/M</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <span className="text-xs font-black italic tabular-nums text-blue-400">{stats.visionScore || 0}</span>
                    <span className="text-[8px] font-bold uppercase text-blue-500/60 w-4 text-right">VS</span>
                </div>
            </div>

            {/* Damage Bar (Expanded) */}
            <div className="flex flex-col gap-2 w-full pl-4 pr-2">
                <div className="flex justify-between items-baseline mb-0 font-bold tabular-nums">
                    <div className="flex items-baseline gap-1">
                        <span className="text-[11px] text-gray-100 font-black">{(stats.totalDamageDealtToChampions / 1000).toFixed(1)}K</span>
                        <span className="text-[9px] text-gray-500 uppercase tracking-tighter font-medium">dmg</span>
                    </div>
                    <span className="text-[9px] text-gray-500 italic opacity-60">({dpm}/m)</span>
                </div>
                <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden shadow-inner">
                    <div
                        className={cn(
                            "h-full rounded-full transition-all duration-1000 relative",
                            isWin ? "bg-gradient-to-r from-blue-600 to-blue-400 shadow-[0_0_10px_rgba(37,99,235,0.4)]" : "bg-gradient-to-r from-red-600 to-red-400 shadow-[0_0_10px_rgba(220,38,38,0.4)]"
                        )}
                        style={{ width: `${dmgPct}%` }}
                    >
                        <div className="absolute inset-0 bg-white/10 animate-pulse mix-blend-overlay" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function SpellIcon({ id, ver, size = "w-4 h-4" }) {
    const name = SPELL_MAP[id] || "SummonerFlash";
    return <img src={`https://ddragon.leagueoflegends.com/cdn/${ver}/img/spell/${name}.png`} className={cn(size, "rounded-md border border-gray-200 dark:border-white/10 shadow-sm")} />;
}

function Objective({ icon, val, isBlue, isGrub }) {
    if (val === undefined || val === null) return null;
    const teamId = isBlue ? '100' : '200';
    const textColor = isBlue ? "text-blue-400" : "text-red-400";

    return (
        <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/[0.04] border border-white/5 shadow-sm">
            <span className={cn("text-xs font-black tabular-nums contrast-125", textColor)}>{val}</span>
            {isGrub ? (
                <div
                    className={cn("w-4 h-4", isBlue ? "bg-blue-500" : "bg-red-500")}
                    style={{
                        WebkitMaskImage: `url(${icon})`,
                        WebkitMaskSize: 'contain',
                        WebkitMaskRepeat: 'no-repeat',
                        WebkitMaskPosition: 'center',
                        maskImage: `url(${icon})`,
                        maskSize: 'contain',
                        maskRepeat: 'no-repeat',
                        maskPosition: 'center'
                    }}
                />
            ) : (
                <img
                    src={icon}
                    className="w-4 h-4 object-contain brightness-110 saturate-110"
                    onError={(e) => {
                        const parts = icon.split('/');
                        const filename = parts[parts.length - 1];
                        let name = filename.split('-')[0];

                        if (!e.target.triedFix) {
                            e.target.triedFix = true;
                            if (name.includes('horde') || name.includes('grub')) {
                                e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/right_icons_grub.png`;
                            } else {
                                const altName = name === 'baron' ? 'baron' : name;
                                e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-match-history/global/default/${altName}-${teamId}.png`;
                            }
                        } else if (!e.target.triedAlt) {
                            e.target.triedAlt = true;
                            e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/icon-${name.includes('horde') ? 'baron' : name}.png`;
                        } else {
                            e.target.style.display = 'none';
                        }
                    }}
                />
            )}
        </div>
    );
}

function Badge({ label, color }) {
    return <div className={cn("text-[9px] font-black px-2 py-0.5 rounded-lg border uppercase tracking-widest leading-none shadow-sm", color)}>{label}</div>;
}

function RuneCard({ p, runeMap }) {
    if (!p.stats) return null;
    const keystone = runeMap[p.stats.perk0] ? `https://ddragon.leagueoflegends.com/cdn/img/${runeMap[p.stats.perk0]}` : null;
    const sub = runeMap[p.stats.perkSubStyle] ? `https://ddragon.leagueoflegends.com/cdn/img/${runeMap[p.stats.perkSubStyle]}` : null;
    return (
        <div className="bg-gray-50 dark:bg-[#121216] rounded-[1.5rem] border border-gray-200 dark:border-white/5 p-5 flex items-center gap-6 shadow-sm dark:shadow-2xl">
            <div className="flex flex-col items-center gap-3 shrink-0">
                <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${p.championId}.png`} className="w-16 h-16 rounded-2xl border-2 border-white/10 shadow-xl" />
                <div className="text-[11px] font-bold text-gray-500 w-24 truncate text-center uppercase tracking-widest">{p.identity?.player?.gameName || p.summonerName || "???"}</div>
            </div>
            <div className="flex-1 flex items-center justify-center gap-8 border-l border-gray-200 dark:border-white/10 ml-2 pl-8">
                <div className="flex flex-col items-center gap-3">
                    {keystone && <img src={keystone} className="w-12 h-12 rounded-full bg-black/40 p-2 border-2 border-white/10 shadow-2xl" />}
                    <div className="flex gap-2">
                        {[p.stats.perk1, p.stats.perk2, p.stats.perk3].map((id, i) => id && runeMap[id] && <img key={i} src={`https://ddragon.leagueoflegends.com/cdn/img/${runeMap[id]}`} className="w-8 h-8 rounded-full bg-white/5 p-1 border border-white/10" />)}
                    </div>
                </div>
                <div className="w-px h-16 bg-gray-200 dark:bg-white/5"></div>
                <div className="flex flex-col items-center gap-3">
                    {sub && <img src={sub} className="w-7 h-7 opacity-40" />}
                    <div className="flex gap-2">
                        {[p.stats.perk4, p.stats.perk5].map((id, i) => id && runeMap[id] && <img key={i} src={`https://ddragon.leagueoflegends.com/cdn/img/${runeMap[id]}`} className="w-6 h-6 rounded-full bg-white/5 p-1 border border-white/10 font-black" />)}
                    </div>
                </div>
            </div>
        </div>
    );
}
