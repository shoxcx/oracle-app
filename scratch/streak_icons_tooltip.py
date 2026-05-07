import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Update LoadingOverlay:
# 1. Simplified streak area: Icon + Number only.
# 2. Added Oracle-themed tooltip on hover.
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
          const roleOrder = { 'TOP': 0, 'JUNGLE': 1, 'MIDDLE': 2, 'BOTTOM': 3, 'UTILITY': 4 };

          const enrichTeam = async (lcuTeam, teamKey) => {
            const sortedLcuTeam = [...lcuTeam].sort((a, b) => {
                const rA = roleOrder[a.selectedPosition?.toUpperCase()] ?? 99;
                const rB = roleOrder[b.selectedPosition?.toUpperCase()] ?? 99;
                return rA - rB;
            });

            const results = [];
            for (let i = 0; i < 5; i++) {
                const p = sortedLcuTeam[i];
                if (!p) {
                    results.push({ type: 'empty', name: t('loading_empty_slot') });
                    continue;
                }

                let name = p.summonerName || p.name || p.displayName || "";
                let puuid = p.puuid;
                let championId = p.championId || 0;
                let isBot = p.bot || (p.summonerId === 0 && championId > 0);
                
                if (!isBot && (!name || name === "INCONNU" || name.trim() === "") && puuid) {
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
                    statsPopulated: false,
                    streak: 0,
                    streakType: 'win'
                });
            }

            await Promise.all(results.map(async (p, i) => {
                if (p.type !== 'player' || p.name === "INCONNU") return;
                const ident = p.puuid || p.name;
                if (enrichedSet.current.has(ident)) return;
                try {
                    let rankName = "NA"; let globalWr = 0; let globalGames = 0; let globalWins = 0, globalLosses = 0; 
                    let streak = 0; let streakType = 'win';

                    if (p.puuid) {
                        const ranked = await window.ipcRenderer.invoke('lcu:get-ranked-stats', p.puuid);
                        if (ranked && ranked.queueMap && ranked.queueMap.RANKED_SOLO_5x5) {
                            const solo = ranked.queueMap.RANKED_SOLO_5x5;
                            globalWins = solo.wins || 0; globalLosses = solo.losses || 0;
                            rankName = solo.tier !== 'NONE' ? `${solo.tier} ${solo.division}` : "NA";
                            globalGames = globalWins + globalLosses;
                            if (globalGames > 0) globalWr = Math.round((globalWins / globalGames) * 100);
                        }
                        const history = await window.ipcRenderer.invoke('lcu:get-match-history', p.puuid, 0, 10);
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

                    results[i] = { ...p, rank: rankName, globalWr, globalGames, globalWins, globalLosses, streak, streakType, statsPopulated: true };
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

  const closeWindow = () => { window.ipcRenderer.invoke('window:hide'); };

  const PlayerCard = ({ p, team }) => {
    const isBlue = team === 'order';
    const splashUrl = p.champAlias ? `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${p.champAlias}_0.jpg` : `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/Aatrox_0.jpg`;
    if (p.type === 'empty') {
      return (
        <div className="relative w-full aspect-[3/5] rounded-[2.5rem] overflow-hidden border-2 border-white/5 bg-white/5 backdrop-blur-3xl flex flex-col items-center justify-center text-white/20">
          <UserCircle2 size={40} className="mb-3 opacity-10" />
          <span className="text-[11px] font-black uppercase tracking-[0.2em]">{t('loading_empty_slot')}</span>
        </div>
      );
    }
    return (
      <div className={cn("relative w-full aspect-[3/5] rounded-[2.5rem] overflow-hidden border-2 transition-all duration-500 shadow-2xl group", isBlue ? "border-blue-500/30 bg-blue-500/10 hover:border-blue-400" : "border-red-500/30 bg-red-500/10 hover:border-red-400", "hover:scale-[1.02]")}>
        {p.champAlias && <img src={splashUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-transparent h-1/2" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        {p.streak > 1 && (
          <div className={cn("absolute top-5 left-5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg z-20", p.streakType === 'win' ? "bg-green-500 text-black" : "bg-red-500 text-white")}>
            {p.streak} {p.streakType === 'win' ? t('streak_wins') : t('streak_losses')}
          </div>
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-5 lg:p-6 z-10">
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1.5">
               <img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${(p.rank?.split(' ')[0] || 'unranked').toLowerCase()}.png`} className="w-6 h-6 object-contain" />
               <span className="text-[10px] font-black uppercase text-white tracking-widest leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{p.rank || "UNRANKED"}</span>
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none truncate drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-yellow-400 transition-colors">{p.name}</h3>
            <p className="text-[10px] font-bold text-white/60 uppercase tracking-[0.2em] mt-1.5 drop-shadow-md">{p.champName}</p>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-4 mt-auto bg-black/60 -mx-6 -mb-6 px-6 pb-6 backdrop-blur-2xl">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-white/40 uppercase tracking-[0.15em] mb-1">{t('loading_winrate')}</span>
              <span className={cn("text-sm font-black", p.globalWr >= 55 ? "text-green-400" : p.globalWr < 48 ? "text-red-400" : "text-blue-400")}>
                {p.globalWr || 0}%
              </span>
            </div>
            <div className="text-right group/streak relative">
              <div className={cn("flex items-center gap-2 font-black italic text-lg", p.streakType === 'win' ? "text-green-400" : "text-red-400")}>
                 {p.streakType === 'win' ? <Flame size={18} fill="currentColor" /> : <Skull size={18} fill="currentColor" />}
                 <span className="tabular-nums">{p.streak || 0}</span>
              </div>
              
              {/* CUSTOM TOOLTIP */}
              <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover/streak:opacity-100 transition-opacity pointer-events-none z-[100] translate-y-1 group-hover/streak:translate-y-0 duration-200">
                <div className="bg-[#1a1a23] border border-white/10 rounded-xl px-3 py-2 shadow-2xl whitespace-nowrap">
                   <div className="flex items-center gap-2">
                      <div className={cn("w-2 h-2 rounded-full animate-pulse", p.streakType === 'win' ? "bg-green-500" : "bg-red-500")} />
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">
                         {p.streak} {p.streakType === 'win' ? t('streak_wins') : t('streak_losses')}
                      </span>
                   </div>
                </div>
                <div className="w-2 h-2 bg-[#1a1a23] border-r border-b border-white/10 rotate-45 mx-auto -mt-1 mr-3" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-3xl font-inter overflow-hidden border-[1px] border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] select-none">
      <div className="absolute top-0 left-0 w-full h-full opacity-40">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-600/20 blur-[180px] rounded-full -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-red-600/20 blur-[180px] rounded-full translate-x-1/2" />
      </div>
      
      <div className="relative h-full flex flex-col p-8 lg:p-10 overflow-hidden rounded-[3rem]">
        <div className="flex items-center justify-between mb-8 shrink-0 h-20 bg-white/5 -mt-8 -mx-8 px-8 pt-4 border-b border-white/5" style={{ WebkitAppRegion: 'drag' }}>
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 relative" style={{ WebkitAppRegion: 'no-drag' }}>
               <div className="absolute inset-0 bg-yellow-500/30 blur-2xl animate-pulse" />
               <img src={oracleLogo} className="w-full h-full object-contain relative z-10" />
            </div>
            <div>
              <h1 className="text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Oracle Analysis</h1>
              <p className="text-[10px] font-bold text-white/30 uppercase tracking-[0.5em] mt-1.5">Intelligence Tactical Interface</p>
            </div>
          </div>
          
          <div className="flex items-center gap-6" style={{ WebkitAppRegion: 'no-drag' }}>
            <button 
              onClick={closeWindow}
              className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-red-500/20 hover:border-red-500/40 transition-all shadow-lg cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-6 justify-center max-w-7xl mx-auto w-full scale-95 origin-center">
          <div className="grid grid-cols-5 gap-4">
            {players.order.length > 0 ? players.order.map((p, i) => <PlayerCard key={i} p={p} team="order" />) : Array(5).fill(0).map((_, i) => <PlayerCard key={i} p={{type:'empty'}} team="order" />)}
          </div>
          <div className="flex items-center gap-12 py-1">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="text-2xl font-black italic text-white/10 tracking-[0.8em] uppercase select-none">VERSUS</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="grid grid-cols-5 gap-4">
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

print("Loading Screen Streak Icons & Tooltip Applied")
