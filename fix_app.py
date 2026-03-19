import re

file_path = "src/App.jsx"
with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Premium Check Reversal
content = re.sub(
    r"const isPremium = isPremiumState \|\| isPremiumProfile;",
    r"const isPremium = true; // Override to allow all features",
    content
)

# 2. matchCurrentPlayer logic for LiveMatchView
old_player_find = r"const myPlayer = teamOne\.find\(p => p\.summonerName === currentUser\?\.summonerName \|\| p\.summonerId === localSummonerId \|\| p\.cellId === session\?\.localPlayerCellId\) \|\| teamOne\[0\];"
new_player_find = """  const matchCurrentPlayer = (p) => {
      if (phase === 'ChampSelect') {
         if (p.cellId !== undefined && session?.localPlayerCellId !== undefined && p.cellId === session.localPlayerCellId) return true;
      }
      if (session?.liveData?.activePlayer?.summonerName) {
         if (p.summonerName === session.liveData.activePlayer.summonerName || p.summonerInternalName === session.liveData.activePlayer.summonerName) return true;
      }
      if (p.summonerId > 0 && p.summonerId === localSummonerId) return true;
      return false;
  };
  const myPlayer = teamOne.find(matchCurrentPlayer) || teamOne[0];"""
content = re.sub(old_player_find, new_player_find, content)

# 3. Handle Empty Bans (only show if not empty)
old_t1_bans = """            <div className="flex items-center gap-1.5 px-1 justify-start mb-0.5">
               {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center opacity-80">
                     {t1Bans[i] ? <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${t1Bans[i].championId}.png`} className="w-full h-full grayscale brightness-75 object-cover" onError={(e) => e.target.style.display='none'} /> : <div className="w-full h-full bg-[#12121a]"></div>}
                  </div>
               ))}
            </div>"""
new_t1_bans = """            {t1Bans && t1Bans.length > 0 && (
            <div className="flex items-center gap-1.5 px-1 justify-start mb-0.5">
               {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center opacity-80">
                     {t1Bans[i] ? <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${t1Bans[i].championId}.png`} className="w-full h-full grayscale brightness-75 object-cover" onError={(e) => e.target.style.display='none'} /> : null}
                  </div>
               ))}
            </div>
            )}"""
content = content.replace(old_t1_bans, new_t1_bans)

old_t2_bans = """            <div className="flex items-center gap-1.5 px-1 justify-end mb-0.5">
               {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center opacity-80">
                     {t2Bans[i] ? <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${t2Bans[i].championId}.png`} className="w-full h-full grayscale brightness-75 object-cover" onError={(e) => e.target.style.display='none'} /> : <div className="w-full h-full bg-[#12121a]"></div>}
                  </div>
               ))}
            </div>"""
new_t2_bans = """            {t2Bans && t2Bans.length > 0 && (
            <div className="flex items-center gap-1.5 px-1 justify-end mb-0.5">
               {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-6 h-6 rounded bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center opacity-80">
                     {t2Bans[i] ? <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${t2Bans[i].championId}.png`} className="w-full h-full grayscale brightness-75 object-cover" onError={(e) => e.target.style.display='none'} /> : null}
                  </div>
               ))}
            </div>
            )}"""
content = content.replace(old_t2_bans, new_t2_bans)

# 4. Remove empty spell placeholders
old_t1_spells = """                      <div className="flex flex-col gap-0.5 justify-center opacity-80 pl-2">
                        {p.spell1Id > 0 ? <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells/${p.spell1Id}.png`} className="w-4 h-4 rounded object-cover" /> : <div className="w-4 h-4 bg-black/50 rounded" />}
                        {p.spell2Id > 0 ? <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells/${p.spell2Id}.png`} className="w-4 h-4 rounded object-cover" /> : <div className="w-4 h-4 bg-black/50 rounded" />}
                      </div>"""
new_t1_spells = """                      {(p.spell1Id > 0 || p.spell2Id > 0) && (
                      <div className="flex flex-col gap-0.5 justify-center opacity-80 pl-2">
                        {p.spell1Id > 0 && <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells/${p.spell1Id}.png`} className="w-4 h-4 rounded object-cover" />}
                        {p.spell2Id > 0 && <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells/${p.spell2Id}.png`} className="w-4 h-4 rounded object-cover" />}
                      </div>
                      )}"""
content = content.replace(old_t1_spells, new_t1_spells)

old_t2_spells = """                      <div className="flex flex-col gap-0.5 justify-center opacity-80 pr-2">
                        {p.spell1Id > 0 ? <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells/${p.spell1Id}.png`} className="w-4 h-4 rounded object-cover" /> : <div className="w-4 h-4 bg-black/50 rounded" />}
                        {p.spell2Id > 0 ? <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells/${p.spell2Id}.png`} className="w-4 h-4 rounded object-cover" /> : <div className="w-4 h-4 bg-black/50 rounded" />}
                      </div>"""
new_t2_spells = """                      {(p.spell1Id > 0 || p.spell2Id > 0) && (
                      <div className="flex flex-col gap-0.5 justify-center opacity-80 pr-2">
                        {p.spell1Id > 0 && <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells/${p.spell1Id}.png`} className="w-4 h-4 rounded object-cover" />}
                        {p.spell2Id > 0 && <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells/${p.spell2Id}.png`} className="w-4 h-4 rounded object-cover" />}
                      </div>
                      )}"""
content = content.replace(old_t2_spells, new_t2_spells)

# 5. Add Orange Box Matchup Tip
old_mid = """            </div>
         </div>

         {/* Team 2 (RED) */}"""

new_mid = """            </div>
            {/* Matchup Tip Box (Orange Area) */}
            <div className="w-full mt-auto mb-2 p-4 rounded-2xl bg-gradient-to-br from-orange-500/10 to-red-500/5 border border-orange-500/20 shadow-inner flex flex-col gap-2 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-16 h-16 bg-orange-400/10 rounded-full blur-2xl"></div>
               <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase text-orange-400 tracking-widest z-10">Analyse de Matchup</span>
               </div>
               <p className="text-[11px] font-medium text-orange-100/70 leading-relaxed z-10 italic">
                  {earlySpike.val1 > earlySpike.val2 ? "Votre composition est dominante en début de partie. Jouez agressivement pour prendre l'avantage." : "Soyez prudent en phase de ligne, privilégiez le farm et atteignez votre pic de puissance en fin de partie."}
               </p>
            </div>
         </div>

         {/* Team 2 (RED) */}"""
content = content.replace(old_mid, new_mid)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Python script executed successfully.")
