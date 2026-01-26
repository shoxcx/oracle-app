import React, { useState, useEffect } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';


function cn(...inputs) {
    return twMerge(clsx(inputs));
}

export function LiveGameRow({ activeGame, panelClass, puuid, summonerId, gameId, platformId, t = (s) => s }) {
    if (!activeGame) return null;

    const session = activeGame.session;
    const liveData = activeGame.liveData;

    // Internal timer state
    const initialTime = liveData?.gameData?.gameTime || 0;
    const [currentTime, setCurrentTime] = useState(initialTime);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(prev => prev + 1);
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // Sync if drift is large
        if (Math.abs((liveData?.gameData?.gameTime || 0) - currentTime) > 5) {
            setCurrentTime(liveData?.gameData?.gameTime || 0);
        }
    }, [liveData]);

    const minutes = Math.floor(currentTime / 60);
    const seconds = Math.floor(currentTime % 60);

    // Helper for Queue Name
    const getQueueName = (id, type) => {
        const qId = Number(id);
        // Robust Custom/Practice check
        if (type === 'CUSTOM_GAME' || type === 'PRACTICETOOL' || isNaN(qId) || qId === 0 || qId === -1) return "queue_custom";

        const map = {
            400: "queue_draft", 420: "queue_solo", 430: "queue_blind", 440: "queue_flex",
            450: "queue_aram", 490: "queue_draft", 1700: "queue_arena", 1900: "queue_urf",
            900: "queue_urf", 1020: "queue_custom"
        };
        if (map[qId]) return map[qId];
        if (qId >= 830 && qId <= 850) return "queue_coop";

        // --- FIX: User requested "Inconnu" if not found, instead of Custom ---
        return "queue_unknown";
    };

    const queueId = session?.gameData?.queue?.id;
    const gameType = session?.gameData?.gameType;
    const queueNameKey = getQueueName(queueId, gameType);
    const queueName = t(queueNameKey);

    // Champion & Role
    let champId = null;
    let champName = liveData?.activePlayer?.championName;
    let roleIcon = "";

    if (session?.gameData) {
        const allPlayers = [...(session.gameData.teamOne || []), ...(session.gameData.teamTwo || [])];
        const self = allPlayers.find(p => p.puuid === puuid || p.summonerId === puuid);
        if (self) {
            champId = self.championId;
            const roleBase = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/";
            const pos = (self.selectedPosition || "").toUpperCase();

            if (pos === 'UTILITY' || pos === 'SUPPORT') roleIcon = `${roleBase}position-utility.svg`;
            else if (pos === 'BOTTOM' || pos === 'BOT') roleIcon = `${roleBase}position-bottom.svg`;
            else if (pos === 'JUNGLE') roleIcon = `${roleBase}position-jungle.svg`;
            else if (pos === 'TOP') roleIcon = `${roleBase}position-top.svg`;
            else if (pos === 'MIDDLE' || pos === 'MID') roleIcon = `${roleBase}position-middle.svg`;
            else roleIcon = "FILL";
        }
    }

    // --- FIX: Image Handling ---
    // If Inconnu or missing, fail gracefully to default.
    const isUnknown = champName === "Inconnu" || (!champId && !champName);
    const normalizeName = (n) => {
        let c = n.replace(/['\s.&]/g, '');
        if (c === 'NunuWillump') return 'Nunu';
        return c;
    };

    const champIcon = (champId && champId !== 0)
        ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champId}.png`
        : (champName && champName !== "Inconnu"
            ? `https://ddragon.leagueoflegends.com/cdn/14.1.1/img/champion/${normalizeName(champName)}.png`
            : `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png`);



    return (
        <div className="relative flex items-center gap-4 p-4 rounded-xl transition-all border border-yellow-500/30 bg-[#2b2a1a] group cursor-default overflow-hidden min-h-[5.5rem] animate-pulse-border">
            {/* Background Tint */}
            <div className="absolute inset-0 opacity-10 pointer-events-none bg-gradient-to-r from-yellow-500 to-transparent"></div>

            {/* Champion Icon + Role */}
            <div className="relative shrink-0">
                <img
                    src={champIcon}
                    className="w-14 h-14 rounded-lg border-2 border-yellow-500 shadow-sm z-10 relative object-cover"
                    onError={(e) => {
                        e.target.onerror = null;
                        // Fallback to Poro or Generic
                        e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png";
                    }}
                />
                {roleIcon && roleIcon !== "FILL" && (
                    <div className="absolute -bottom-3 -left-3 z-20 w-9 h-9 bg-black rounded-full border border-white/40 flex items-center justify-center shadow-md p-2">
                        <img src={roleIcon} className="w-full h-full opacity-90" />
                    </div>
                )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0 z-10 flex flex-col justify-center ml-2 gap-1">
                <div className="flex items-center gap-3">
                    <span className="font-bold text-base text-white flex items-center gap-2">
                        LIVE
                        <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse shadow-[0_0_8px_rgba(248,113,113,0.8)]"></span>
                    </span>
                    <span className="text-[10px] text-gray-400 uppercase font-bold tracking-wider px-2 py-0.5 bg-black/30 rounded border border-white/5">
                        {queueName}
                    </span>
                </div>
            </div>

            {/* Timer */}
            <div className="text-right z-10 flex flex-col items-end justify-center h-full gap-2">
                <div className="text-xl font-bold text-gray-200 font-mono tracking-widest">
                    {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                </div>
            </div>
        </div>
    );
}
