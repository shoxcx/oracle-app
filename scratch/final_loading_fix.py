import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I'll replace the LoadingOverlay component with a more robust version
new_loading_overlay = """function LoadingOverlay({ t, visualMode, theme }) {
  const [players, setPlayers] = useState({ order: [], chaos: [] });
  const [champMap, setChampMap] = useState({});
  const enrichedSet = useRef(new Set());
  const [session, setSession] = useState(null);

  useEffect(() => {
    let interval;
    async function loadData() {
      try {
        let _champMap = champMap;
        if (Object.keys(_champMap).length === 0) {
          const sum = await window.ipcRenderer.invoke('lcu:get-current-summoner');
          if (sum) {
            const champs = await window.ipcRenderer.invoke('lcu:get-champions', sum.summonerId);
            if (champs) {
              const newMap = {};
              champs.forEach(c => newMap[c.id] = { name: c.name, alias: c.alias });
              _champMap = newMap;
              setChampMap(newMap);
            }
          }
        }

        const gameSession = await window.ipcRenderer.invoke('lcu:get-gameflow-session');
        setSession(gameSession);
        
        if (gameSession && gameSession.gameData) {
          const enrichTeam = async (lcuTeam, teamKey) => {
            const results = [];
            
            // First pass: normalize player data
            for (let i = 0; i < 5; i++) {
                const p = lcuTeam[i];
                if (!p) {
                    results.push({ type: 'empty', name: t('loading_empty_slot', 'Vide') });
                    continue;
                }

                let name = p.summonerName || p.name || "";
                let puuid = p.puuid;
                let championId = p.championId || 0;
                let isBot = p.bot || (p.summonerId === 0 && championId > 0);
                
                // If name is missing, try LCU
                if (!isBot && (!name || name === "INCONNU") && puuid) {
                    try {
                        const sum = await window.ipcRenderer.invoke('lcu:get-summoner-by-puuid', puuid);
                        if (sum) name = sum.displayName || sum.gameName || sum.name;
                    } catch(e){}
                }

                const champInfo = _champMap[championId] || { name: "?", alias: "Aatrox" };
                
                results.push({ 
                    ...p, 
                    type: isBot ? 'bot' : 'player',
                    name: isBot ? `BOT ${champInfo.name}` : (name || "INCONNU"),
                    puuid,
                    champId: championId,
                    champName: champInfo.name,
                    champAlias: champInfo.alias,
                    statsPopulated: false
                });
            }

            // Second pass: enrichment in parallel
            await Promise.all(results.map(async (p, i) => {
                if (p.type !== 'player' || p.name === "INCONNU") return;
                
                const ident = p.puuid || p.name;
                if (enrichedSet.current.has(ident)) return;

                try {
                    let rankName = "NA";
                    let globalWr = 0; let globalGames = 0; let globalWins = 0, globalLosses = 0; 
                    let champMasteryRank = 0;
                    let streak = 0;
                    let streakType = 'win';
                    let attitudes = [];

                    // Rank & Stats
                    if (p.puuid) {
                        const ranked = await window.ipcRenderer.invoke('lcu:get-ranked-stats', p.puuid);
                        if (ranked && ranked.queueMap && ranked.queueMap.RANKED_SOLO_5x5) {
                            const solo = ranked.queueMap.RANKED_SOLO_5x5;
                            globalWins = solo.wins || 0; globalLosses = solo.losses || 0;
                            rankName = solo.tier !== 'NONE' ? `${solo.tier} ${solo.division}` : "NA";
                            globalGames = globalWins + globalLosses;
                            if (globalGames > 0) globalWr = Math.round((globalWins / globalGames) * 100);
                        }
                        
                        // Mastery
                        const masteries = await window.ipcRenderer.invoke('lcu:get-champion-mastery', p.puuid);
                        if (masteries && Array.isArray(masteries)) {
                            const m = masteries.find(x => x.championId === p.champId);
                            if (m) champMasteryRank = m.championLevel || 0;
                        }

                        // Streak
                        const history = await window.ipcRenderer.invoke('lcu:get-match-history', p.puuid, 0, 5);
                        if (history && history.games && history.games.games) {
                            const games = history.games.games;
                            if (games.length > 0) {
                                const firstWin = games[0].stats.win;
                                streakType = firstWin ? 'win' : 'loss';
                                streak = 1;
                                for (let j = 1; j < games.length; j++) {
                                    if (games[j].stats.win === firstWin) streak++;
                                    else break;
                                }
                            }
                        }
                    }

                    // Attitude Logic
                    if (globalWr > 58) attitudes.push("Oracle Chosen");
                    else if (globalWr > 53) attitudes.push(t('attitude_precise', 'Pr\u00e9cis'));
                    else if (globalWr < 46 && globalGames > 10) attitudes.push(t('attitude_struggling', 'En Difficult\u00e9'));

                    if (streak >= 3 && streakType === 'win') attitudes.push(t('attitude_on_fire', 'En Feu'));
                    if (streak >= 2 && streakType === 'loss') attitudes.push(t('attitude_tilt', 'Tilt Probable'));
                    if (champMasteryRank >= 6) attitudes.push(t('attitude_expert', 'Expert') + " " + p.champName);
                    if (globalGames > 300) attitudes.push(t('attitude_veteran', 'V\u00e9t\u00e9ran'));
                    if (attitudes.length === 0) attitudes.push(t('attitude_constant', 'Constant'));

                    results[i] = { 
                      ...p, 
                      rank: rankName, globalWr, globalGames, globalWins, globalLosses, 
                      mastery: champMasteryRank, streak, streakType, attitudes, statsPopulated: true 
                    };
                    
                    enrichedSet.current.add(ident);
                } catch(e){}
            }));

            setPlayers(prev => ({ ...prev, [teamKey]: results }));
          };

          enrichTeam(gameSession.gameData.teamOne || [], 'order');
          enrichTeam(gameSession.gameData.teamTwo || [], 'chaos');
        }
      } catch(e) { console.error("Loading overlay error", e); }
    }
    
    loadData();
    interval = setInterval(loadData, 8000);
    return () => clearInterval(interval);
  }, [t, champMap]);

  const PlayerCard = ({ p, team }) => {
    const isBlue = team === 'order';
    const splashUrl = p.champAlias ? `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${p.champAlias}_0.jpg` : `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg`;
    
    if (p.type === 'empty') {
      return (
        <div className="relative w-full aspect-[3/4.2] rounded-[2rem] overflow-hidden border-2 border-white/5 bg-white/5 backdrop-blur-md flex flex-col items-center justify-center text-white/20">
          <User size={32} className="mb-2 opacity-10" />
          <span className="text-[10px] font-black uppercase tracking-widest">{t('loading_empty_slot', 'Vide')}</span>
        </div>
      );
    }

    return (
      <div 
        className={cn(
          "relative w-full aspect-[3/4.2] rounded-[2rem] overflow-hidden border-2 transition-all duration-500 shadow-2xl group",
          isBlue ? "border-blue-500/20 bg-blue-500/5 hover:border-blue-400" : "border-red-500/20 bg-red-500/5 hover:border-red-400",
          "hover:scale-[1.02]"
        )}
      >
        {/* Background Splash */}
        {p.champAlias && (
          <img src={splashUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        
        {/* Streak Badge */}
        {p.streak > 1 && (
          <div className={cn(
            "absolute top-4 left-4 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg z-20",
            p.streakType === 'win' ? "bg-green-500 text-black shadow-green-500/40" : "bg-red-500 text-white shadow-red-500/40"
          )}>
            {p.streak} {p.streakType === 'win' ? t('streak_wins', 'WINS') : t('streak_losses', 'LOSSES')}
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-5 z-10">
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-1">
               <img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${(p.rank?.split(' ')[0] || 'unranked').toLowerCase()}.png`} className="w-5 h-5 object-contain" />
               <span className="text-[9px] font-black uppercase text-white/60 tracking-widest">{p.rank || "UNRANKED"}</span>
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none truncate">{p.name}</h3>
            <p className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1">{p.champName}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-4 h-5 overflow-hidden">
            {p.attitudes?.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-lg bg-white/10 backdrop-blur-xl border border-white/10 text-[7px] font-black uppercase tracking-widest text-white/90 whitespace-nowrap">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats Section */}
          <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-auto bg-black/20 -mx-4 -mb-4 px-4 pb-4">
            <div className="flex flex-col">
              <span className="text-[7px] font-black text-white/20 uppercase tracking-widest mb-0.5">{t('loading_winrate', 'Winrate')}</span>
              <span className={cn("text-xs font-black", p.globalWr >= 55 ? "text-green-400" : p.globalWr < 48 ? "text-red-400" : "text-blue-400")}>
                {p.globalWr || 0}%
              </span>
            </div>
            <div className="text-right">
              <span className="text-[7px] font-black text-white/20 uppercase tracking-widest mb-0.5">{t('loading_record', 'Record')}</span>
              <span className="text-[9px] font-bold text-white/50 block">{p.globalWins}V - {p.globalLosses}D</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-[#060608] font-inter overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute top-0 left-0 w-full h-full opacity-30">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-600/10 blur-[150px] rounded-full -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-red-600/10 blur-[150px] rounded-full translate-x-1/2" />
      </div>
      
      <div className="relative h-full flex flex-col p-6 lg:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8 shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 relative">
               <div className="absolute inset-0 bg-yellow-500/20 blur-xl animate-pulse" />
               <img src={oracleLogo} className="w-full h-full object-contain relative z-10" />
            </div>
            <div>
              <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Oracle Analysis</h1>
              <p className="text-[10px] font-bold text-white/20 uppercase tracking-[0.4em] mt-1">Intelligence Tactical Interface</p>
            </div>
          </div>
          <div className="text-right">
             <span className="text-[9px] font-black text-white/10 uppercase tracking-[0.2em] block mb-1">Session Protocol</span>
             <span className="text-xs font-black text-yellow-500 uppercase italic tracking-widest bg-yellow-500/5 border border-yellow-500/20 px-3 py-1 rounded-full">Active Simulation</span>
          </div>
        </div>

        {/* Main Grid */}
        <div className="flex-1 flex flex-col gap-8 justify-center max-w-7xl mx-auto w-full">
          {/* Blue Team */}
          <div className="grid grid-cols-5 gap-4 lg:gap-6">
            {players.order.length > 0 ? players.order.map((p, i) => <PlayerCard key={i} p={p} team="order" />) : Array(5).fill(0).map((_, i) => <PlayerCard key={i} p={{type:'empty'}} team="order" />)}
          </div>

          {/* VS Divider */}
          <div className="flex items-center gap-12 py-2">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            <div className="text-2xl font-black italic text-white/10 tracking-[0.5em] uppercase select-none">VERSUS</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />
          </div>

          {/* Red Team */}
          <div className="grid grid-cols-5 gap-4 lg:gap-6">
            {players.chaos.length > 0 ? players.chaos.map((p, i) => <PlayerCard key={i} p={p} team="chaos" />) : Array(5).fill(0).map((_, i) => <PlayerCard key={i} p={{type:'empty'}} team="chaos" />)}
          </div>
        </div>
      </div>
    </div>
  );
}"""

# Replace the component in App.jsx
start_marker = "function LoadingOverlay({ t, visualMode, theme }) {"
next_func = "function NotificationsView"

start_idx = content.find(start_marker)
end_idx = content.find(next_func)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_loading_overlay + "\n\n\n" + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Loading Screen Final Fix Applied")
