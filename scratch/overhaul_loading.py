import os

file_path = r'src\App.jsx'
with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# I'll replace the entire LoadingOverlay component with a modern version
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
        
        let livePlayers = [];
        try { livePlayers = await window.ipcRenderer.invoke('live:get-player-list') || []; } catch(e){}

        if (gameSession && gameSession.gameData) {
          const mergeTeam = (lcuTeam, teamString) => {
             const finalTeam = [...lcuTeam];
             const lTeam = livePlayers.filter(p => p.team === teamString);
             for (const lp of lTeam) {
                 const exists = finalTeam.find(p => p.summonerName === lp.summonerName || (_champMap[p.championId] && _champMap[p.championId].name.toLowerCase() === (lp.championName||'').toLowerCase()));
                 if (!exists) {
                     finalTeam.push({ puuid: null, summonerName: lp.summonerName, championId: 0, championName: lp.championName });
                 }
                 if (exists && (!exists.summonerName || exists.summonerName.trim() === '')) {
                     exists.summonerName = lp.summonerName;
                 }
             }
             while (finalTeam.length < 5) {
                 finalTeam.push({ puuid: null, summonerName: "INCONNU", championId: 0, championName: "?" });
             }
             return finalTeam.slice(0, 5);
          };

          const enrichTeam = async (teamList, teamKey) => {
            const results = [...teamList];
            
            await Promise.all(results.map(async (p, i) => {
                let rankName = "NA";
                let globalWr = 0; let globalGames = 0; let globalWins = 0, globalLosses = 0; 
                let champMasteryRank = 0;
                let streak = 0;
                let streakType = 'win';
                let attitudes = [];

                const champInfo = _champMap[p.championId] || { name: p.championName || "?", alias: "" };
                const champName = champInfo.name;
                const champAlias = champInfo.alias;
                
                let name = p.summonerName || p.name;
                if (!name || name.toLowerCase() === "inconnu" || name.trim() === "") name = "INCONNU";

                let currentPuuid = p.puuid;
                const playerIdent = currentPuuid || name;

                if (enrichedSet.current.has(playerIdent) && name !== "INCONNU") {
                   return;
                }

                try {
                    if (!currentPuuid && name !== "INCONNU") {
                        const sumData = await window.ipcRenderer.invoke('lcu:search-summoner', name, 'EUW', false, null, true);
                        if (sumData && sumData.puuid) currentPuuid = sumData.puuid;
                    }

                    if (currentPuuid && !currentPuuid.startsWith('ext~')) {
                        // Rank
                        const ranked = await window.ipcRenderer.invoke('lcu:get-ranked-stats', currentPuuid);
                        if (ranked && ranked.queueMap && ranked.queueMap.RANKED_SOLO_5x5) {
                            const solo = ranked.queueMap.RANKED_SOLO_5x5;
                            globalWins = solo.wins || 0; globalLosses = solo.losses || 0;
                            rankName = `${solo.tier} ${solo.division}`;
                            globalGames = globalWins + globalLosses;
                            if (globalGames > 0) globalWr = Math.round((globalWins / globalGames) * 100);
                        }
                        
                        // Mastery
                        const masteries = await window.ipcRenderer.invoke('lcu:get-champion-mastery', currentPuuid);
                        if (masteries && Array.isArray(masteries)) {
                            const m = masteries.find(x => x.championId === p.championId);
                            if (m) champMasteryRank = m.championLevel || 0;
                        }

                        // Streak
                        const history = await window.ipcRenderer.invoke('lcu:get-match-history', currentPuuid, 0, 10);
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
                    else if (globalWr > 53) attitudes.push("Pr\u00e9cis");
                    else if (globalWr < 46 && globalGames > 20) attitudes.push("En Difficult\u00e9");

                    if (streak >= 3 && streakType === 'win') attitudes.push("En Feu");
                    if (streak >= 2 && streakType === 'loss') attitudes.push("Tilt Probable");
                    if (champMasteryRank >= 6) attitudes.push("Expert " + champName);
                    if (globalGames > 300) attitudes.push("V\u00e9t\u00e9ran");
                    if (attitudes.length === 0) attitudes.push("Constant");

                    results[i] = { 
                      ...p, name, puuid: currentPuuid, champId: p.championId, champName, champAlias,
                      rank: rankName, globalWr, globalGames, globalWins, globalLosses, 
                      mastery: champMasteryRank, streak, streakType, attitudes, statsPopulated: true 
                    };
                    
                    if (name !== "INCONNU") enrichedSet.current.add(playerIdent);
                } catch(e){}
            }));

            setPlayers(prev => ({ ...prev, [teamKey]: results }));
          };

          const teamOne = mergeTeam(gameSession.gameData.teamOne || [], "ORDER");
          const teamTwo = mergeTeam(gameSession.gameData.teamTwo || [], "CHAOS");
          
          enrichTeam(teamOne, 'order');
          enrichTeam(teamTwo, 'chaos');
        }
      } catch(e) { console.error("Loading overlay error", e); }
    }
    
    loadData();
    interval = setInterval(loadData, 10000); // Slower interval to avoid struggle
    return () => clearInterval(interval);
  }, []);

  const openProfile = (name) => {
    if (window.ipcRenderer && name !== "INCONNU") {
      window.ipcRenderer.send('app:navigate-to-profile', name);
    }
  };

  const PlayerCard = ({ p, team }) => {
    const isBlue = team === 'order';
    const accentColor = isBlue ? "blue" : "red";
    const splashUrl = `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${p.champAlias || 'Aatrox'}_0.jpg`;
    
    return (
      <div 
        onClick={() => openProfile(p.name)}
        className={cn(
          "relative w-full aspect-[2/3] rounded-2xl overflow-hidden border-2 transition-all duration-500 cursor-pointer group shadow-2xl",
          isBlue ? "border-blue-500/30 hover:border-blue-400" : "border-red-500/30 hover:border-red-400",
          "hover:scale-[1.02] hover:-translate-y-1"
        )}
      >
        {/* Background Splash */}
        <img src={splashUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        
        {/* Streak Badge */}
        {p.streak > 1 && (
          <div className={cn(
            "absolute top-3 left-3 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg z-20 animate-pulse",
            p.streakType === 'win' ? "bg-green-500 text-black" : "bg-red-500 text-white"
          )}>
            {p.streak} {p.streakType === 'win' ? 'WINS' : 'LOSS'} STREAK
          </div>
        )}

        {/* Content */}
        <div className="absolute inset-0 flex flex-col justify-end p-4 z-10">
          {/* Rank & Name */}
          <div className="mb-2">
            <div className="flex items-center gap-2 mb-1">
               <img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${(p.rank?.split(' ')[0] || 'unranked').toLowerCase()}.png`} className="w-6 h-6 object-contain" />
               <span className="text-[10px] font-black uppercase text-white/80 tracking-widest leading-none">{p.rank || "UNRANKED"}</span>
            </div>
            <h3 className="text-xl font-black text-white uppercase tracking-tighter leading-none truncate group-hover:text-yellow-400 transition-colors">{p.name}</h3>
            <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">{p.champName}</p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {p.attitudes?.map((tag, idx) => (
              <span key={idx} className="px-2 py-0.5 rounded-md bg-white/10 backdrop-blur-md border border-white/10 text-[8px] font-black uppercase tracking-widest text-white/80">
                {tag}
              </span>
            ))}
          </div>

          {/* Stats Bar */}
          <div className="flex items-center justify-between border-t border-white/10 pt-2 mt-auto">
            <div className="flex flex-col">
              <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Global Winrate</span>
              <span className={cn("text-sm font-black", p.globalWr >= 55 ? "text-green-400" : p.globalWr < 48 ? "text-red-400" : "text-blue-400")}>
                {p.globalWr || 0}%
              </span>
            </div>
            <div className="text-right">
              <span className="text-[8px] font-black text-white/30 uppercase tracking-widest">Record</span>
              <span className="text-[10px] font-bold text-white/60 block">{p.globalWins}V - {p.globalLosses}D</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-[#0a0a0c] font-inter overflow-hidden">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-600/5 blur-[120px] rounded-full -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-1/2 h-full bg-red-600/5 blur-[120px] rounded-full translate-x-1/2" />
      
      <div className="relative h-full flex flex-col p-8 lg:p-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-12 shrink-0">
          <div className="flex items-center gap-4">
            <img src={oracleLogo} className="w-12 h-12 object-contain" style={{ filter: 'drop-shadow(0 0 10px rgba(234,179,8,0.5))' }} />
            <div>
              <h1 className="text-3xl font-black italic tracking-tighter text-white uppercase leading-none">Oracle Analysis</h1>
              <p className="text-xs font-bold text-white/30 uppercase tracking-[0.3em] mt-1">Battle Simulation & Player Intelligence</p>
            </div>
          </div>
          <div className="flex items-center gap-8">
             <div className="text-right">
                <span className="text-[10px] font-black text-white/20 uppercase tracking-widest block mb-1">Queue Type</span>
                <span className="text-sm font-black text-white uppercase italic tracking-wider">Ranked Solo/Duo</span>
             </div>
          </div>
        </div>

        {/* Players Grid */}
        {players.order.length > 0 ? (
          <div className="flex-1 flex flex-col gap-12 overflow-y-auto custom-scrollbar pr-4">
            {/* Blue Team */}
            <div className="grid grid-cols-5 gap-6">
              {players.order.map((p, i) => <PlayerCard key={i} p={p} team="order" />)}
            </div>

            {/* VS Separator */}
            <div className="flex items-center gap-8 py-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
              <div className="text-4xl font-black italic text-white/10 tracking-tighter uppercase select-none">VERSUS</div>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            </div>

            {/* Red Team */}
            <div className="grid grid-cols-5 gap-6 mb-8">
              {players.chaos.map((p, i) => <PlayerCard key={i} p={p} team="chaos" />)}
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(234,179,8,0.3)]"></div>
            <div className="text-white font-black uppercase tracking-[0.3em] text-sm animate-pulse">Initialisation des Syt\u00e8mes d'Analyse...</div>
          </div>
        )}
      </div>
    </div>
  );
}"""

# Replace the component in App.jsx
# LoadingOverlay usually starts around 13205
start_marker = "function LoadingOverlay({ t, visualMode, theme }) {"
# Find the end of the component (search for next function or end of file)
next_func = "function NotificationsView"

start_idx = content.find(start_marker)
end_idx = content.find(next_func)

if start_idx != -1 and end_idx != -1:
    content = content[:start_idx] + new_loading_overlay + "\n\n\n" + content[end_idx:]

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Loading Screen Overhauled")
