import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Target, Zap, Waves, ArrowLeft, Settings, Key, Pause, Play, RefreshCw, LogOut } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) { return twMerge(clsx(inputs)); }

export default function TrainingView({ panelClass, t }) {
  const [mode, setMode] = useState(null); // 'smite', 'kite', 'dodge', null
  const [difficulty, setDifficulty] = useState('normal'); // 'easy', 'normal', 'hardcore'
  const [smiteDmg, setSmiteDmg] = useState(1000); // Lifted Smite state
  const [showSettings, setShowSettings] = useState(false);
  
  // Custom Keyboard Config
  const [keys, setKeys] = useState(() => {
    const saved = localStorage.getItem('oracle_training_keys');
    const defaults = { smite: 'f', flash: 'd', attack: 'a', skillshot: 'q' };
    try { return saved ? { ...defaults, ...JSON.parse(saved) } : defaults; } 
    catch(e) { return defaults; }
  });

  const [listeningKey, setListeningKey] = useState(null);

  // Fullscreen Pause Logic
  const [isPaused, setIsPaused] = useState(false);
  const [gameKey, setGameKey] = useState(0);

  useEffect(() => {
    if (!mode) { setIsPaused(false); return; }
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsPaused(prev => !prev);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [mode]);

  const updateKey = (id, val) => {
    const newKeys = { ...keys, [id]: val.toLowerCase() };
    setKeys(newKeys);
    localStorage.setItem('oracle_training_keys', JSON.stringify(newKeys));
  };

  useEffect(() => {
    if (!listeningKey) return;
    const handleKey = (e) => {
      e.preventDefault(); e.stopPropagation();
      let val = e.key;
      if (val === ' ') val = 'Space';
      updateKey(listeningKey, val);
      setListeningKey(null);
    };
    const handleMouse = (e) => {
      e.preventDefault(); e.stopPropagation();
      if (e.button === 0 || e.button === 2) return; 
      updateKey(listeningKey, `mouse ${e.button}`);
      setListeningKey(null);
    };
    
    window.addEventListener('keydown', handleKey);
    window.addEventListener('mousedown', handleMouse);
    return () => {
      window.removeEventListener('keydown', handleKey);
      window.removeEventListener('mousedown', handleMouse);
    };
  }, [listeningKey, keys]);

  const handleStartMode = (m) => {
    if (window.ipcRenderer) {
      window.ipcRenderer.invoke('window:set-fullscreen', true).catch(err => console.log('Fullscreen rejected:', err));
    } else {
      document.documentElement.requestFullscreen().catch(err => console.log('Fullscreen rejected:', err));
    }
    setMode(m);
  };

  const diffColors = {
     easy: 'text-emerald-400 border-emerald-500/50 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.3)]',
     normal: 'text-sky-400 border-sky-500/50 bg-sky-500/10 shadow-[0_0_15px_rgba(0,191,255,0.3)]',
     hardcore: 'text-red-500 border-red-500/50 bg-red-500/10 shadow-[0_0_15px_rgba(239,68,68,0.3)]'
  };

  const fullscreenContent = mode ? (
    <div className="fixed inset-0 z-[999999] bg-[#060608] select-none overflow-hidden animate-in fade-in duration-300 flex flex-col">
      {/* PAUSE MODAL IN FULLSCREEN MODE */}
      {isPaused && (
         <div className="absolute inset-0 z-[50000] bg-black/90 backdrop-blur-lg flex flex-col items-center justify-center">
             <h2 className="text-7xl font-black text-white italic mb-12 flex items-center gap-6">
                <Pause size={64} className="text-gray-400 animate-pulse" />
                PAUSE
             </h2>
             <div className="flex flex-col gap-4 w-[400px]">
                <button onClick={() => setIsPaused(false)} className="px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-xl font-black text-xl transition-all shadow-xl flex items-center gap-3 justify-center">
                   <Play size={24} /> REPRENDRE
                </button>
                <button onClick={() => { setGameKey(k=>k+1); setIsPaused(false); }} className="px-8 py-4 bg-[#1a1c23] hover:bg-[#252830] text-white border border-white/10 rounded-xl font-bold text-lg transition-all flex items-center gap-3 justify-center">
                   <RefreshCw size={20} /> RECOMMENCER
                </button>
                <button onClick={() => setShowSettings(true)} className="px-8 py-4 bg-[#1a1c23] hover:bg-[#252830] text-white border border-white/10 rounded-xl font-bold text-lg transition-all flex items-center gap-3 justify-center">
                   <Settings size={20} /> PARAMÈTRES ET BINDINGS
                </button>
                <button onClick={() => { 
                   setIsPaused(false); setMode(null); 
                   if (window.ipcRenderer) {
                      window.ipcRenderer.invoke('window:set-fullscreen', false).catch(e=>console.log(e));
                   } else if (document.fullscreenElement) {
                      document.exitFullscreen().catch(e=>console.log(e)); 
                   }
                }} className="px-8 py-4 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-500 rounded-xl font-bold text-lg transition-all mt-8 flex items-center gap-3 justify-center">
                   <LogOut size={20} /> QUITTER L'ENTRAÎNEMENT
                </button>
             </div>
             <p className="text-gray-500 font-bold tracking-widest uppercase mt-20">Appuyez sur Échap pour reprendre</p>
         </div>
      )}

      {/* SETTINGS MODAL */}
      {showSettings && (
        <div className="absolute inset-0 z-[100000] bg-black/80 backdrop-blur-sm flex items-center justify-center overflow-hidden">
          <div className="bg-[#0f0f13] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl">
             <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
               <Settings className="text-gray-400" size={32} />
               <h2 className="text-3xl font-black text-white italic">Paramètres</h2>
             </div>
             <div className="mb-6">
               <h3 className="text-gray-400 font-bold mb-3 uppercase text-sm tracking-widest">Général - Difficulté</h3>
               <div className="flex gap-2">
                 {['easy', 'normal', 'hardcore'].map(d => (
                    <button key={d} onClick={() => setDifficulty(d)} className={cn("flex-1 py-3 rounded-xl font-bold capitalize transition-all border", difficulty === d ? diffColors[d] : "bg-black/50 text-gray-500 hover:text-white border-white/10")}>
                       {d}
                    </button>
                 ))}
               </div>
             </div>
             <div className="mb-6">
               <h3 className="text-gray-400 font-bold mb-3 uppercase text-sm tracking-widest">Dégâts du Châtiment (Smite)</h3>
               <div className="flex gap-2">
                 {[600, 1000, 1400].map(val => (
                    <button key={val} onClick={() => setSmiteDmg(val)} className={cn("flex-1 py-3 rounded-xl font-black transition-all border", smiteDmg === val ? "bg-orange-600 text-white border-orange-400 shadow-[0_0_15px_orange]" : "bg-black/50 text-gray-500 border-white/10 hover:text-white")}>
                       {val}
                    </button>
                 ))}
               </div>
             </div>
             <div className="mb-4">
                 <h3 className="text-gray-400 font-bold mb-3 uppercase text-sm tracking-widest">Raccourcis</h3>
                 {['smite', 'flash', 'attack'].map(k => (
                    <div key={k} className="flex justify-between items-center bg-white/5 p-3 rounded-xl mb-3 border border-white/5 shadow-inner">
                      <span className="text-gray-300 font-bold capitalize text-lg">{k}</span>
                      <button onClick={() => setListeningKey(k)} className={cn("flex items-center justify-center px-6 h-12 text-center font-black text-lg rounded-lg border transition-all uppercase min-w-[120px]", listeningKey === k ? "bg-orange-500 text-white border-orange-400 animate-pulse outline-none" : "bg-black/50 text-white border-white/10 hover:border-white/30")}>
                        {listeningKey === k ? "..." : keys[k]}
                      </button>
                    </div>
                 ))}
             </div>
             <p className="text-gray-500 text-xs italic mt-2 text-center block">Appuyez sur une touche de votre clavier ou bouton souris.</p>
             <button onClick={() => setShowSettings(false)} className="w-full py-4 mt-8 bg-sky-600 hover:bg-sky-500 border border-sky-400 shadow-[0_0_20px_rgba(0,191,255,0.3)] text-white rounded-xl font-black text-xl transition-colors">
               SAUVEGARDER ET FERMER
             </button>
          </div>
        </div>
      )}

      <div className="absolute top-6 left-6 z-[60000] flex gap-4">
        <button onClick={() => setMode(null)} className="flex items-center gap-2 px-5 py-2.5 bg-black/80 backdrop-blur-md hover:bg-black border border-white/10 rounded-full text-white font-bold transition-all shadow-xl">
           <ArrowLeft size={18} /> Quitter
        </button>
        <button onClick={() => setIsPaused(p=>!p)} className="flex items-center gap-2 px-5 py-2.5 bg-black/80 backdrop-blur-md hover:bg-black border border-white/10 rounded-full text-white font-bold transition-all shadow-xl">
           <Pause size={18} /> Pause (Échap)
        </button>
      </div>

      <div className="flex-1 flex relative w-full h-full">
         {mode === 'smite' && <SmiteGame key={gameKey} isPaused={isPaused} keysConfig={keys} difficulty={difficulty} smiteDmg={smiteDmg} />}
         {mode === 'kite' && <KiteGame key={gameKey} isPaused={isPaused} keysConfig={keys} difficulty={difficulty} />}
         {mode === 'dodge' && <DodgeGame key={gameKey} isPaused={isPaused} keysConfig={keys} difficulty={difficulty} />}
         {mode === 'aim' && <AimGame key={gameKey} isPaused={isPaused} keysConfig={keys} difficulty={difficulty} />}
         {mode === 'farm' && <FarmGame key={gameKey} isPaused={isPaused} keysConfig={keys} difficulty={difficulty} />}
      </div>
    </div>
  ) : null;

  return (
    <div className={cn(panelClass, "absolute inset-0 flex flex-col p-6 lg:p-10 select-none overflow-hidden")}>
      {/* IN-WINDOW SETTINGS WHEN NOT IN GAME */}
      {!mode && showSettings && (
        <div className="absolute inset-0 z-[100000] bg-black/80 backdrop-blur-sm flex items-center justify-center overflow-hidden">
          <div className="bg-[#0f0f13] border border-white/10 rounded-3xl p-8 max-w-lg w-full animate-in zoom-in-95 shadow-2xl">
             <div className="flex items-center gap-3 mb-8 border-b border-white/10 pb-4">
               <Settings className="text-gray-400" size={32} />
               <h2 className="text-3xl font-black text-white italic">Paramètres</h2>
             </div>
             <div className="mb-6">
               <h3 className="text-gray-400 font-bold mb-3 uppercase text-sm tracking-widest">Général - Difficulté</h3>
               <div className="flex gap-2">
                 {['easy', 'normal', 'hardcore'].map(d => (
                    <button key={d} onClick={() => setDifficulty(d)} className={cn("flex-1 py-3 rounded-xl font-bold capitalize transition-all border", difficulty === d ? diffColors[d] : "bg-black/50 text-gray-500 hover:text-white border-white/10")}>
                       {d}
                    </button>
                 ))}
               </div>
             </div>
             <div className="mb-6">
               <h3 className="text-gray-400 font-bold mb-3 uppercase text-sm tracking-widest">Dégâts du Châtiment (Smite)</h3>
               <div className="flex gap-2">
                 {[600, 1000, 1400].map(val => (
                    <button key={val} onClick={() => setSmiteDmg(val)} className={cn("flex-1 py-3 rounded-xl font-black transition-all border", smiteDmg === val ? "bg-orange-600 text-white border-orange-400 shadow-[0_0_15px_orange]" : "bg-black/50 text-gray-500 border-white/10 hover:text-white")}>
                       {val}
                    </button>
                 ))}
               </div>
             </div>
             <div className="mb-4">
                 <h3 className="text-gray-400 font-bold mb-3 uppercase text-sm tracking-widest">Raccourcis</h3>
                 {['smite', 'flash', 'attack'].map(k => (
                    <div key={k} className="flex justify-between items-center bg-white/5 p-3 rounded-xl mb-3 border border-white/5 shadow-inner">
                      <span className="text-gray-300 font-bold capitalize text-lg">{k}</span>
                      <button onClick={() => setListeningKey(k)} className={cn("flex items-center justify-center px-6 h-12 text-center font-black text-lg rounded-lg border transition-all uppercase min-w-[120px]", listeningKey === k ? "bg-orange-500 text-white border-orange-400 animate-pulse outline-none" : "bg-black/50 text-white border-white/10 hover:border-white/30")}>
                        {listeningKey === k ? "..." : keys[k]}
                      </button>
                    </div>
                 ))}
             </div>
             <button onClick={() => setShowSettings(false)} className="w-full py-4 mt-8 bg-sky-600 hover:bg-sky-500 border border-sky-400 text-white rounded-xl font-black text-xl transition-colors">
               SAUVEGARDER ET FERMER
             </button>
          </div>
        </div>
      )}

      {/* DASHBOARD */}
      {!mode && (
        <div className="flex-1 overflow-y-auto custom-scrollbar w-full -m-6 p-6 lg:-m-10 lg:p-10">
           <div className="flex flex-col items-center justify-center min-h-full gap-8 animate-in fade-in zoom-in-95 relative pb-10">
             <button onClick={() => setShowSettings(true)} className="absolute top-0 right-0 p-4 bg-white/5 hover:bg-white/10 rounded-2xl border border-white/10 text-gray-400 hover:text-white transition-colors group z-50">
                <Key size={28} className="group-hover:text-orange-400" />
             </button>
             
             <div className="relative pt-12 inline-block">
                 <h2 className="text-5xl font-black italic text-white drop-shadow-[0_5px_15px_rgba(0,0,0,1)]">ORACLE <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500 pr-2">TRAINING</span></h2>
                 <span className="absolute top-8 -right-12 bg-gradient-to-r from-rose-500 to-red-600 text-white text-[11px] px-3 py-1 rounded-full font-black uppercase tracking-widest shadow-[0_2px_15px_rgba(244,63,94,0.8)] transform rotate-[15deg] animate-pulse">Beta</span>
             </div>
             <p className="text-gray-400 max-w-2xl text-center mb-4 text-lg font-medium">Entraînez vos mécaniques en conditions de jeu réelles. Engine 3D Isométrique Ultra-Fluide (144Hz). Déplacez-vous avec le <b>Clic Droit</b>.</p>
           
           <div className="flex items-center gap-4 bg-black/30 p-2 rounded-2xl border border-white/10 shadow-inner mb-4">
              {['easy', 'normal', 'hardcore'].map(d => (
                 <button key={d} onClick={() => setDifficulty(d)} className={cn("px-6 py-2 rounded-xl font-bold capitalize transition-all", difficulty === d ? diffColors[d] : "text-gray-500 hover:text-white")}>
                    {d}
                 </button>
              ))}
           </div>

           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
              <button onClick={() => handleStartMode('smite')} className="px-4 py-8 rounded-3xl bg-[#0f0f13] border border-white/10 hover:border-orange-500/50 transition-all group flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/LeeSin_0.jpg')] bg-cover bg-center opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                 <div className="relative z-10 p-4 bg-orange-500/20 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(255,165,0,0.3)]"><Zap size={48} className="text-orange-400 drop-shadow-[0_0_15px_rgba(255,165,0,1)]" /></div>
                 <h3 className="relative z-10 text-2xl font-black text-white italic tracking-tighter mb-2 drop-shadow-[0_2px_4px_black]">Châtiment</h3>
                 <p className="relative z-10 text-gray-300 text-sm font-bold bg-black/60 p-3 rounded-xl border border-white/5 drop-shadow-md">Vol d'Objectif: Sécurisez le Monstre ({keys.smite.toUpperCase()}) exactement à {smiteDmg} PV.</p>
              </button>

              <button onClick={() => handleStartMode('kite')} className="px-4 py-8 rounded-3xl bg-[#0f0f13] border border-white/10 hover:border-sky-500/50 transition-all group flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ashe_0.jpg')] bg-cover bg-center opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                 <div className="relative z-10 p-4 bg-sky-500/20 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(0,191,255,0.3)]"><Target size={48} className="text-sky-400 drop-shadow-[0_0_15px_rgba(0,191,255,1)]" /></div>
                 <h3 className="relative z-10 text-2xl font-black text-white italic tracking-tighter mb-2 drop-shadow-[0_2px_4px_black]">Hit & Run</h3>
                 <p className="relative z-10 text-gray-300 text-sm font-bold bg-black/60 p-3 rounded-xl border border-white/5 drop-shadow-md">Kiting de Poursuite: Échappez au colosse et mitraillez-le ({keys.attack.toUpperCase()}).</p>
              </button>

              <button onClick={() => handleStartMode('dodge')} className="px-4 py-8 rounded-3xl bg-[#0f0f13] border border-white/10 hover:border-emerald-500/50 transition-all group flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Yasuo_0.jpg')] bg-cover bg-center opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                 <div className="relative z-10 p-4 bg-emerald-500/20 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(16,185,129,0.3)]"><Waves size={48} className="text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,1)]" /></div>
                 <h3 className="relative z-10 text-2xl font-black text-white italic tracking-tighter mb-2 drop-shadow-[0_2px_4px_black]">Esquive</h3>
                 <p className="relative z-10 text-gray-300 text-sm font-bold bg-black/60 p-3 rounded-xl border border-white/5 drop-shadow-md">Dodge Training: Survivez aux balles magiques ! Flash : ({keys.flash.toUpperCase()}).</p>
              </button>

              <button onClick={() => handleStartMode('aim')} className="px-4 py-8 rounded-3xl bg-[#0f0f13] border border-white/10 hover:border-purple-500/50 transition-all group flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Morgana_0.jpg')] bg-cover bg-center opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                 <div className="relative z-10 p-4 bg-purple-500/20 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(147,51,234,0.3)]"><Target size={48} className="text-purple-400 drop-shadow-[0_0_15px_rgba(147,51,234,1)]" /></div>
                 <h3 className="relative z-10 text-2xl font-black text-white italic tracking-tighter mb-2 drop-shadow-[0_2px_4px_black]">Skillshot Aim</h3>
                 <p className="relative z-10 text-gray-300 text-sm font-bold bg-black/60 p-3 rounded-xl border border-white/5 drop-shadow-md">Cage de Morgana : Anticipez et touchez. Tire : ({keys.skillshot.toUpperCase()}).</p>
              </button>

              <button onClick={() => handleStartMode('farm')} className="px-4 py-8 rounded-3xl bg-[#0f0f13] border border-white/10 hover:border-yellow-500/50 transition-all group flex flex-col items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] relative overflow-hidden">
                 <div className="absolute inset-0 bg-[url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Caitlyn_0.jpg')] bg-cover bg-center opacity-0 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                 <div className="relative z-10 p-4 bg-yellow-500/20 rounded-full mb-6 group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.3)]"><Zap size={48} className="text-yellow-400 drop-shadow-[0_0_15px_rgba(234,179,8,1)]" /></div>
                 <h3 className="relative z-10 text-2xl font-black text-white italic tracking-tighter mb-2 drop-shadow-[0_2px_4px_black]">Last Hitting</h3>
                 <p className="relative z-10 text-gray-300 text-sm font-bold bg-black/60 p-3 rounded-xl border border-white/5 drop-shadow-md">Farm Parfait : Frappez les sbires low HP. Auto : ({keys.attack.toUpperCase()}).</p>
              </button>
           </div>
           </div>
        </div>
      )}

      {mode && createPortal(fullscreenContent, document.body)}
    </div>
  );
}

// ----------------------------------------------------
// 3D CSS UNTEXTURED ENTITIES
// ----------------------------------------------------

const Model3DPlaceholder = ({ colorClass, sizeClass = "w-16 h-36" }) => (
  <div className={cn("relative rounded-full border border-black/50 shadow-[inset_-15px_0_30px_rgba(0,0,0,0.6),inset_10px_0_20px_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.9)] overflow-hidden", sizeClass, colorClass)}>
     <div className="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/20 shadow-[inset_-2px_-2px_10px_rgba(0,0,0,0.5)]" />
     <div className="absolute top-7 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-black rounded-full opacity-60" />
     <div className="absolute top-[35%] left-1/2 -translate-x-1/2 w-[60%] h-1 bg-black/20" />
     <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[80%] h-1 bg-black/20" />
     <div className="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-black/80 to-transparent" />
  </div>
);

const Model3DObjective = () => (
   <div className="relative w-48 h-56 rounded-t-lg border-2 border-black/80 shadow-[inset_-20px_0_40px_rgba(0,0,0,0.8),inset_20px_0_30px_rgba(255,255,255,0.2),0_40px_80px_rgba(0,0,0,0.9)] overflow-hidden bg-slate-800 flex flex-col items-center justify-start pt-6">
      <div className="w-16 h-4 bg-red-500 rounded-full shadow-[0_0_20px_red] animate-pulse mb-8" />
      <div className="w-8 h-8 bg-red-500/50 rotate-45 mb-4" />
      <div className="w-6 h-6 bg-red-500/30 rotate-45" />
      <div className="absolute bottom-0 left-0 w-full h-10 bg-gradient-to-t from-black/90 to-transparent" />
   </div>
);


// ----------------------------------------------------
// VOL D'OBJECTIF (SMITE)
// ----------------------------------------------------
function SmiteGame({ keysConfig, difficulty, isPaused, smiteDmg }) {
  const DRAKE_MAX = 8000;
  
  const [gameState, setGameState] = useState({ status: 'playing', feedback: '' });

  const playerRef = useRef(null); 
  const hpTextRef = useRef(null);
  const hpBarFillRef = useRef(null);

  const pState = useRef({ x: 600, y: 750, targetX: 600, targetY: 750, speed: 3.5, flashCd: 0 }); // Nerfed Player Speed to realistic LoL values
  const dState = useRef({ hp: DRAKE_MAX });
  const gStatus = useRef('playing'); // Auto-start
  const frameRef = useRef(null);
  const pausedRef = useRef(isPaused);

  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);

  useEffect(() => {
    const burstChance = difficulty === 'easy' ? 0.02 : difficulty === 'normal' ? 0.05 : 0.08;
    const burstMax = difficulty === 'easy' ? 500 : difficulty === 'normal' ? 800 : 1500;

    const tick = () => {
      frameRef.current = requestAnimationFrame(tick);
      if (pausedRef.current) return;

      const dx = pState.current.targetX - pState.current.x;
      const dy = pState.current.targetY - pState.current.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist > pState.current.speed) {
        pState.current.x += (dx/dist) * pState.current.speed;
        pState.current.y += (dy/dist) * pState.current.speed;
      } else if (dist > 0) {
        pState.current.x = pState.current.targetX; pState.current.y = pState.current.targetY;
      }
      
      if (playerRef.current) {
        playerRef.current.style.left = `${pState.current.x}px`;
        playerRef.current.style.top = `${pState.current.y}px`;
      }

      if (pState.current.x !== pState.current.targetX || pState.current.y !== pState.current.targetY) {
         const dx = pState.current.targetX - pState.current.x;
         const dy = pState.current.targetY - pState.current.y;
         const dist = Math.sqrt(dx*dx + dy*dy);
         if (dist < pState.current.speed) {
            pState.current.x = pState.current.targetX; pState.current.y = pState.current.targetY;
         } else {
            pState.current.x += (dx/dist) * pState.current.speed;
            pState.current.y += (dy/dist) * pState.current.speed;
         }
         if (playerRef.current) {
            playerRef.current.style.left = `${pState.current.x}px`;
            playerRef.current.style.top = `${pState.current.y}px`;
         }
      }

      if (gStatus.current === 'playing') {
        if (Math.random() < burstChance) { 
          const dmg = Math.floor(Math.random() * burstMax) + 100;
          dState.current.hp = Math.max(0, dState.current.hp - dmg);
        }

        // Si le dragon tombe SOUS la ligne jaune de son propre Smite ou qu'il meurt
        if (dState.current.hp <= smiteDmg) {
           // Grace period : laisse le temps humain de réagir (10-35 frames selon diff)
           dState.current.lateFrames = (dState.current.lateFrames || 0) + 1;
           const maxLate = difficulty === 'hardcore' ? 8 : difficulty === 'normal' ? 15 : 25; 
           
           if (dState.current.lateFrames > maxLate || dState.current.hp === 0) {
              gStatus.current = 'late';
              setGameState({ status: 'late', feedback: "Trop lent ! L'ennemi a volé l'objectif." });
           }
        }
      }

      if (hpTextRef.current) hpTextRef.current.textContent = `${Math.ceil(dState.current.hp)} / ${DRAKE_MAX}`;
      if (hpBarFillRef.current) {
         hpBarFillRef.current.style.width = `${(dState.current.hp/DRAKE_MAX)*100}%`;
         if (dState.current.hp > 0 && dState.current.hp <= smiteDmg) {
            hpBarFillRef.current.className = "absolute left-0 top-0 bottom-0 bg-green-500";
         } else {
            hpBarFillRef.current.className = "absolute left-0 top-0 bottom-0 bg-red-500";
         }
      }

      if (pState.current.flashCd > 0) pState.current.flashCd--;
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [difficulty, smiteDmg]);

  const handleContext = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (gStatus.current !== 'playing' || pausedRef.current) return;
    
    const x = e.nativeEvent.offsetX; const y = e.nativeEvent.offsetY;
    pState.current.targetX = x; pState.current.targetY = y;
    
    const ping = document.createElement("div");
    ping.className = "absolute w-12 h-12 border-4 border-green-500/80 rounded-full animate-ping pointer-events-none";
    ping.style.left = `${x - 24}px`; ping.style.top = `${y - 24}px`;
    ping.style.transform = "rotateX(-55deg) scaleY(0.5)";
    e.target.appendChild(ping);
    setTimeout(() => ping.remove(), 400);
  };

  const useSpell = useCallback((spellName) => {
    if (gStatus.current !== 'playing' || pausedRef.current) return;
    
    if (spellName === 'smite') {
      const currentHp = dState.current.hp;
      const dist = Math.sqrt(Math.pow(pState.current.x - 600, 2) + Math.pow(pState.current.y - 450, 2));
      if (dist > 300) {
        setGameState({ status: 'playing', feedback: "Trop loin pour Smiter !" });
        setTimeout(() => { if (gStatus.current === 'playing') setGameState({ status: 'playing', feedback: "" }) }, 1000);
        return;
      }
      if (currentHp <= smiteDmg) {
        gStatus.current = 'won'; dState.current.hp = 0;
        setGameState({ status: 'won', feedback: "OBJECTIF SÉCURISÉ !" });
      } else {
        gStatus.current = 'early'; dState.current.hp -= smiteDmg;
        setGameState({ status: 'early', feedback: `Smite trop tôt ! Vous l'avez offert.` });
      }
    } else if (spellName === 'flash') {
      if (pState.current.flashCd > 0) return;
      const dx = pState.current.targetX - pState.current.x;
      const dy = pState.current.targetY - pState.current.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > 0) {
        const jump = Math.min(400, dist + 100);
        pState.current.x += (dx/dist) * jump; pState.current.y += (dy/dist) * jump;
        pState.current.targetX = pState.current.x; pState.current.targetY = pState.current.y;
        pState.current.flashCd = 60 * 5; 
      }
    }
  }, [smiteDmg]);

  useEffect(() => {
    const hk = (e) => {
      let val = e.key.toLowerCase(); if (val === ' ') val = 'space';
      if (val === keysConfig.smite) { useSpell('smite'); return; }
      if (val === keysConfig.flash) { useSpell('flash'); return; }
    };
    const hm = (e) => {
      if (e.button === 0 || e.button === 2) return;
      let val = `mouse ${e.button}`;
      if (val === keysConfig.smite) { useSpell('smite'); return; }
      if (val === keysConfig.flash) { useSpell('flash'); return; }
    };
    window.addEventListener('keydown', hk); window.addEventListener('mousedown', hm);
    return () => { window.removeEventListener('keydown', hk); window.removeEventListener('mousedown', hm); };
  }, [keysConfig, useSpell]);

  return (
    <div className="flex-1 flex items-center justify-center bg-[#050508] relative overflow-hidden pointer-events-none w-full h-full">
      <div 
         id="arena-floor"
         className="absolute w-[1200px] h-[900px] bg-[#12161a] rounded-[40px] border-8 border-orange-900/40 shadow-[inset_0_0_200px_rgba(0,0,0,0.9)] pointer-events-auto cursor-[url(https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/cursor/cursor-crosshair.png),_crosshair]"
         style={{ transform: 'perspective(1500px) rotateX(55deg) scale(1.1)', transformStyle: 'preserve-3d' }}
         onContextMenu={e=>e.preventDefault()}
      >
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.05)_2px,transparent_2px)] bg-[size:50px_50px] pointer-events-none" />
        <div className="absolute left-[600px] top-[450px] w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange-900/60 bg-orange-900/10 pointer-events-none" />

        {/* SINGLE EVENT INTERCEPTOR. No duplicate bubbling */}
        <div className="absolute inset-0 z-50 pointer-events-auto" onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }} onPointerDown={(e) => { if (e.button===0 || e.button===2) handleContext(e); }} />

        {/* OBJECTIVE */}
        <div className="absolute flex flex-col items-center justify-center pointer-events-none" style={{ left: 600, top: 450, transform: 'translate(-50%, -50%) rotateX(-55deg)', transformOrigin: 'bottom center' }}>
           <div className="absolute -top-14 w-64 h-6 bg-black border-2 border-white/40 mb-4 rounded-xl overflow-hidden relative shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center justify-center pointer-events-none">
             <div ref={hpBarFillRef} className="absolute left-0 top-0 bottom-0 bg-red-500" style={{ width: `100%` }} />
             <div className="absolute top-0 bottom-0 w-1 bg-yellow-400 z-10 shadow-[0_0_10px_yellow]" style={{ left: `${(smiteDmg/DRAKE_MAX)*100}%` }} /> 
             <span ref={hpTextRef} className="relative z-20 text-xs font-black text-white drop-shadow-[0_0_3px_black]">8000 / 8000</span>
           </div>
           <Model3DObjective />
        </div>

        {/* PLAYER */}
        <div ref={playerRef} className="absolute flex items-center justify-center pointer-events-none will-change-transform" style={{ left: 600, top: 750, transform: 'translate(-50%, -50%) rotateX(-55deg)', transformOrigin: 'bottom center' }}>
           <div className="absolute bottom-0 w-[600px] h-[600px] rounded-full border-4 border-blue-500/30 bg-blue-500/[0.03]" style={{ transform: 'translateY(50%) rotateX(55deg)' }} />
           <Model3DPlaceholder colorClass="bg-gray-400" />
        </div>
      </div>

      <div className="absolute top-10 flex flex-col items-center pointer-events-none z-50">
         <div className="bg-black/80 px-10 py-5 rounded-full border border-white/10 shadow-2xl backdrop-blur-md text-center">
            <h2 className={cn("text-3xl font-black italic", gameState.status === 'won' ? "text-green-500" : (gameState.status === 'playing' ? "text-white" : "text-red-500 drop-shadow-[0_0_10px_red]"))}>
               {gameState.feedback || `À vous de jouer, smitez à ${smiteDmg} !`}
            </h2>
            <p className="text-gray-400 italic text-sm mt-2">Dégâts configurés dans les paramètres</p>
         </div>
         {gameState.status !== 'playing' && (
           <button onClick={() => {
              dState.current.hp = DRAKE_MAX; pState.current.flashCd = 0; gStatus.current = 'playing';
              setGameState({ status: 'playing', feedback: '' });
           }} className="mt-8 px-12 py-4 bg-orange-600 border border-orange-400 text-white rounded-full font-black text-2xl shadow-[0_0_30px_rgba(255,100,0,0.6)] pointer-events-auto hover:scale-110 active:scale-95 transition-all">
             RECOMMENCER
           </button>
         )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// KITING (KITE) - Ultra Fluid Mode
// ----------------------------------------------------
function KiteGame({ keysConfig, difficulty, isPaused }) {
  const [gameState, setGameState] = useState({ status: 'playing', hp: 12, feedback: '' });

  const playerRef = useRef(null);
  const dummyRef = useRef(null);
  const bulletsCtrRef = useRef(null);

  const pState = useRef({ x: 1000, y: 800, targetX: 1000, targetY: 800, speed: 3.5, cd: 0, windup: 0 }); // Speed 3.5, added windup
  const dState = useRef({ x: 2000, y: 800, hp: 12, speed: 1.5, cd: 0 }); 
  const projRef = useRef([]); 
  const gStatus = useRef('playing'); // Auto-start
  const frameRef = useRef(null);
  const pausedRef = useRef(isPaused);

  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);

  useEffect(() => {
    dState.current.speed = difficulty === 'easy' ? 2.5 : difficulty === 'normal' ? 3.5 : 4.5;

    const tick = () => {
      frameRef.current = requestAnimationFrame(tick);
      if (pausedRef.current) return;

      // Remove the windup completely so you can run and attack natively
      const dx = pState.current.targetX - pState.current.x;
      const dy = pState.current.targetY - pState.current.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > pState.current.speed) {
        pState.current.x += (dx/dist) * pState.current.speed;
        pState.current.y += (dy/dist) * pState.current.speed;
      } else if (dist > 0) {
        pState.current.x = pState.current.targetX;
        pState.current.y = pState.current.targetY;
      }

      if (pState.current.cd > 0) pState.current.cd--; 

      if (playerRef.current) {
        playerRef.current.style.left = `${pState.current.x}px`;
        playerRef.current.style.top = `${pState.current.y}px`;
      }

      if (gStatus.current === 'playing') {
        if (dState.current.cd <= 0) {
           const edx = pState.current.x - dState.current.x;
           const edy = pState.current.y - dState.current.y;
           const edist = Math.sqrt(edx*edx + edy*edy);

           if (edist < 80) { 
             gStatus.current = 'lost';
             setGameState({ status: 'lost', hp: dState.current.hp, feedback: "Mort ! Le monstre vous a écrasé." });
           } else {
             dState.current.x += (edx/edist) * dState.current.speed;
             dState.current.y += (edy/edist) * dState.current.speed;
           }
        } else {
           dState.current.cd--; 
        }
        if (dummyRef.current) {
          dummyRef.current.style.left = `${dState.current.x}px`;
          dummyRef.current.style.top = `${dState.current.y}px`;
        }

        let hpChanged = false;
        for (let i = projRef.current.length - 1; i >= 0; i--) {
           let b = projRef.current[i];
           const bx = dState.current.x - b.x; const by = dState.current.y - b.y;
           const bdist = Math.sqrt(bx*bx + by*by);
           if (bdist < 60) {
              dState.current.hp -= 1;
              dState.current.cd = Math.random() < 0.2 ? 5 : 0; 
              if (b.el) b.el.remove();
              projRef.current.splice(i, 1);
              hpChanged = true;
              
              if (dState.current.hp <= 0) {
                 gStatus.current = 'won'; dState.current.hp = 0;
                 setGameState({ status: 'won', hp: 0, feedback: "Kiting Parfait ("+difficulty+")" });
              }
           } else {
              b.x += (bx/bdist) * 20; b.y += (by/bdist) * 20;
              if (b.el) { b.el.style.left = `${b.x - 12}px`; b.el.style.top = `${b.y - 12}px`; }
           }
        }
        if (hpChanged) setGameState(s => ({ ...s, hp: dState.current.hp }));
      }
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [difficulty]);

  const handleContext = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (gStatus.current !== 'playing' || pausedRef.current) return;
    const x = e.nativeEvent.offsetX; const y = e.nativeEvent.offsetY;
    
    const edx = x - dState.current.x; const edy = y - dState.current.y;
    if (Math.sqrt(edx*edx + edy*edy) < 100) { useSpell('attack'); return; }

    pState.current.targetX = x;
    pState.current.targetY = y;

    const ping = document.createElement("div");
    ping.className = "absolute w-12 h-12 border-4 border-green-500/80 rounded-full animate-ping pointer-events-none";
    ping.style.left = `${x - 24}px`; ping.style.top = `${y - 24}px`;
    ping.style.transform = "rotateX(-55deg) scaleY(0.5)";
    e.target.appendChild(ping);
    setTimeout(() => ping.remove(), 400);
  };

  const useSpell = useCallback((spellName) => {
    if (gStatus.current !== 'playing' || pState.current.cd > 0 || pausedRef.current) return;
    if (spellName === 'attack') {
      const dx = dState.current.x - pState.current.x;
      const dy = dState.current.y - pState.current.y;
      if (Math.sqrt(dx*dx + dy*dy) > 400) return; // Attack range
      // Do not overwrite movement Target anymore!
      pState.current.cd = difficulty === 'hardcore' ? 25 : 15; 
      pState.current.windup = 5; // Mimics real LoL Cast time
      
      const div = document.createElement("div");
      div.className = "absolute w-6 h-6 rounded-full bg-white shadow-[0_0_30px_white]";
      div.style.left = `${pState.current.x - 12}px`; div.style.top = `${pState.current.y - 12}px`;
      div.style.transform = "rotateX(-55deg)";
      if (bulletsCtrRef.current) bulletsCtrRef.current.appendChild(div);

      projRef.current.push({ id: Math.random(), x: pState.current.x, y: pState.current.y, el: div });
    }
  }, [difficulty]);

  useEffect(() => {
    const hk = (e) => {
      let val = e.key.toLowerCase(); if (val === ' ') val = 'space';
      if (val === keysConfig.attack) useSpell('attack');
    };
    const hm = (e) => {
      if (e.button === 0 || e.button === 2) return;
      if (`mouse ${e.button}` === keysConfig.attack) useSpell('attack');
    };
    window.addEventListener('keydown', hk); window.addEventListener('mousedown', hm);
    return () => { window.removeEventListener('keydown', hk); window.removeEventListener('mousedown', hm); };
  }, [keysConfig, useSpell]);

  return (
    <div className="flex-1 flex items-center justify-center bg-[#000] relative overflow-hidden pointer-events-none w-full h-full">
      <div 
         id="arena-floor"
         className="absolute w-[3400px] h-[1800px] bg-[#0c1410] border-8 border-sky-900/50 shadow-[inset_0_0_300px_rgba(0,0,0,1)] pointer-events-auto cursor-[url(https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/cursor/cursor-crosshair.png),_crosshair] will-change-transform"
         style={{ transform: 'perspective(1500px) rotateX(55deg) scale(0.65)', transformStyle: 'preserve-3d' }}
         onContextMenu={e=>e.preventDefault()}
      >
        <div className="absolute inset-0 opacity-20 bg-[linear-gradient(rgba(0,150,255,0.1)_2px,transparent_2px),linear-gradient(90deg,rgba(0,150,255,0.1)_2px,transparent_2px)] bg-[size:100px_100px] pointer-events-none" />

        <div className="absolute inset-0 z-50 pointer-events-auto" onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}  onPointerDown={(e) => { if (e.button===0 || e.button===2) handleContext(e); }} />

        {/* Dummy */}
        <div ref={dummyRef} className="absolute flex flex-col items-center justify-center pointer-events-none will-change-transform" style={{ left: 2000, top: 800, transform: 'translate(-50%, -50%) rotateX(-55deg)', transformOrigin: 'bottom center' }}>
           <div className="absolute -top-12 bg-black/80 px-4 py-1 border border-white/20 text-white font-black rounded-lg">{gameState.hp} PV</div>
           <Model3DPlaceholder colorClass="bg-red-500" sizeClass="w-20 h-40" />
        </div>

        {/* Bullets Container */}
        <div ref={bulletsCtrRef} className="absolute inset-0 pointer-events-none" />

        {/* Player */}
        <div ref={playerRef} className="absolute flex items-center justify-center pointer-events-none will-change-transform" style={{ left: 1000, top: 800, transform: 'translate(-50%, -50%) rotateX(-55deg)', transformOrigin: 'bottom center' }}>
             <div className="absolute bottom-0 w-[800px] h-[800px] rounded-full border-4 border-sky-400/20 bg-sky-500/[0.03]" style={{ transform: 'translateY(50%) rotateX(55deg)' }} />
             <Model3DPlaceholder colorClass="bg-gray-400" />
        </div>
      </div>

      <div className="absolute top-10 flex flex-col items-center pointer-events-none z-50">
         <div className="bg-black/80 px-10 py-5 rounded-full border border-white/10 shadow-2xl backdrop-blur-md">
            <h2 className={cn("text-3xl font-black italic", gameState.status === 'won' ? "text-green-500" : (gameState.status === 'playing' ? "text-white" : "text-red-500 drop-shadow-[0_0_10px_red]"))}>
               {gameState.status === 'lost' ? gameState.feedback : (gameState.status === 'won' ? "Kiting Parfait !" : `Pv Ennemi: ${gameState.hp}`)}
            </h2>
         </div>
         {gameState.status !== 'playing' && (
           <button onClick={() => {
              dState.current.x = 2400; dState.current.y = 800; dState.current.hp = 12;
              pState.current.x = 1000; pState.current.y = 800; pState.current.targetX = 1000; pState.current.targetY = 800;
              if (bulletsCtrRef.current) bulletsCtrRef.current.innerHTML = "";
              projRef.current = []; gStatus.current = 'playing';
              setGameState({ status: 'playing', hp: 12, feedback: '' });
           }} className="mt-8 px-12 py-4 bg-sky-600 border border-sky-400 text-white rounded-full font-black text-2xl shadow-[0_0_30px_rgba(0,191,255,0.6)] pointer-events-auto hover:scale-110 active:scale-95 transition-all">
             RECOMMENCER
           </button>
         )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// DODGE MINIGAME (Skillshots) - Ultra Fluid Mode
// ----------------------------------------------------
function DodgeGame({ keysConfig, difficulty, isPaused }) {
  const [gameState, setGameState] = useState({ status: 'playing', time: 0, feedback: '' });

  const playerRef = useRef(null);
  const shotsCtrRef = useRef(null);
  const pState = useRef({ x: 600, y: 450, targetX: 600, targetY: 450, speed: 3.5, flashCd: 0 }); // speed 3.5 realistic
  const shotsRef = useRef([]); 
  
  const gStatus = useRef('playing'); 
  const timerRef = useRef({ frames: 0 });
  const frameRef = useRef(null);
  const pausedRef = useRef(isPaused);

  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);

  useEffect(() => {
    let speedMin = difficulty === 'easy' ? 2 : difficulty === 'normal' ? 3.5 : 5;
    let speedMax = difficulty === 'easy' ? 4 : difficulty === 'normal' ? 6 : 8.5;
    let spawnRate = difficulty === 'easy' ? 120 : difficulty === 'normal' ? 80 : 45; 

    const tick = () => {
      frameRef.current = requestAnimationFrame(tick);
      if (pausedRef.current) return;

      const dx = pState.current.targetX - pState.current.x;
      const dy = pState.current.targetY - pState.current.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > pState.current.speed) {
        pState.current.x += (dx/dist) * pState.current.speed;
        pState.current.y += (dy/dist) * pState.current.speed;
      } else if (dist > 0) {
        pState.current.x = pState.current.targetX;
        pState.current.y = pState.current.targetY;
      }
      
      if (playerRef.current) {
        playerRef.current.style.left = `${pState.current.x}px`;
        playerRef.current.style.top = `${pState.current.y}px`;
      }

      if (gStatus.current === 'playing') {
        timerRef.current.frames++;
        
        if (timerRef.current.frames % spawnRate === 0) {
           const side = Math.floor(Math.random() * 4);
           let sx, sy, tx, ty;
           const px = pState.current.x; const py = pState.current.y;
           
           if (side === 0) { sx = Math.random()*1200; sy = -100; tx = px; ty = py; } 
           else if (side === 1) { sx = 1300; sy = Math.random()*900; tx = px; ty = py; } 
           else if (side === 2) { sx = Math.random()*1200; sy = 1000; tx = px; ty = py; } 
           else { sx = -100; sy = Math.random()*900; tx = px; ty = py; } 

           const angle = Math.atan2(ty - sy, tx - sx);
           const finalAngle = angle + (Math.random() - 0.5) * 0.9;
           const s_speed = speedMin + Math.random()*(speedMax-speedMin);

           const div = document.createElement("div");
           div.className = "absolute w-16 h-16 rounded-full bg-emerald-400 shadow-[0_0_50px_rgba(16,185,129,1)] flex items-center justify-center overflow-hidden";
           div.innerHTML = `<div class="w-6 h-6 bg-white rounded-full opacity-60"></div>`;
           div.style.left = `${sx - 32}px`; div.style.top = `${sy - 32}px`;
           div.style.transform = "rotateX(-55deg)";
           if (shotsCtrRef.current) shotsCtrRef.current.appendChild(div);

           shotsRef.current.push({ 
              id: Math.random(), x: sx, y: sy, dx: Math.cos(finalAngle), dy: Math.sin(finalAngle), speed: s_speed, el: div 
           });
        }

        for (let i = shotsRef.current.length - 1; i >= 0; i--) {
           let s = shotsRef.current[i];
           s.x += s.dx * s.speed; s.y += s.dy * s.speed;

           const cdx = s.x - pState.current.x; const cdy = s.y - pState.current.y;
           if (Math.sqrt(cdx*cdx + cdy*cdy) < 35) {
              gStatus.current = 'lost';
              setGameState({ status: 'lost', time: Math.floor(timerRef.current.frames/60), feedback: "Touché ! Vous êtes mort." });
           }

           if (s.x < -200 || s.x > 1400 || s.y < -200 || s.y > 1100) {
              if (s.el) s.el.remove();
              shotsRef.current.splice(i, 1);
           } else {
              if (s.el) { s.el.style.left = `${s.x - 32}px`; s.el.style.top = `${s.y - 32}px`; }
           }
        }
        
        if (timerRef.current.frames % 60 === 0) setGameState(st => ({ ...st, time: timerRef.current.frames / 60 }));
      }
      if (pState.current.flashCd > 0) pState.current.flashCd--;
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [difficulty]);

  const handleContext = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (gStatus.current !== 'playing' || pausedRef.current) return;
    const x = e.nativeEvent.offsetX; const y = e.nativeEvent.offsetY;
    
    pState.current.targetX = x; pState.current.targetY = y;
    
    const ping = document.createElement("div");
    ping.className = "absolute w-12 h-12 border-4 border-green-500/80 rounded-full animate-ping pointer-events-none";
    ping.style.left = `${x - 24}px`; ping.style.top = `${y - 24}px`;
    ping.style.transform = "rotateX(-55deg) scaleY(0.5)";
    e.target.appendChild(ping);
    setTimeout(() => ping.remove(), 400);
  };

  const useSpell = useCallback((spellName) => {
    if (gStatus.current !== 'playing' || pausedRef.current) return;
    if (spellName === 'flash') {
      if (pState.current.flashCd > 0) return;
      const dx = pState.current.targetX - pState.current.x;
      const dy = pState.current.targetY - pState.current.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist > 0) {
        const jump = Math.min(400, dist + 100);
        pState.current.x += (dx/dist) * jump; pState.current.y += (dy/dist) * jump;
        pState.current.targetX = pState.current.x; pState.current.targetY = pState.current.y;
        pState.current.flashCd = 60 * 5; 
      }
    }
  }, []);

  useEffect(() => {
    const hk = (e) => {
      let val = e.key.toLowerCase(); if (val === ' ') val = 'space';
      if (val === keysConfig.flash) { useSpell('flash'); return; }
    };
    const hm = (e) => {
      if (e.button === 0 || e.button === 2) return;
      let val = `mouse ${e.button}`;
      if (val === keysConfig.flash) { useSpell('flash'); return; }
    };
    window.addEventListener('keydown', hk); window.addEventListener('mousedown', hm);
    return () => { window.removeEventListener('keydown', hk); window.removeEventListener('mousedown', hm); };
  }, [keysConfig, useSpell]);

  return (
    <div className="flex-1 flex items-center justify-center bg-black relative overflow-hidden pointer-events-none w-full h-full">
      <div 
         id="arena-floor"
         className="absolute w-[1200px] h-[900px] bg-[#0c1410] border-8 border-emerald-900/50 shadow-[inset_0_0_200px_rgba(0,0,0,1)] pointer-events-auto cursor-[url(https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/cursor/cursor-crosshair.png),_crosshair] will-change-transform"
         style={{ transform: 'perspective(1500px) rotateX(55deg) scale(1.1)', transformStyle: 'preserve-3d' }}
         onContextMenu={e=>e.preventDefault()}
      >
        <div className="absolute inset-0 bg-[#0f1f15] opacity-20 pointer-events-none" />

        <div className="absolute inset-0 z-50 pointer-events-auto" onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }} onPointerDown={(e) => { if (e.button===0 || e.button===2) handleContext(e); }} />

        <div ref={shotsCtrRef} className="absolute inset-0 pointer-events-none" />

        {/* PLAYER */}
        <div ref={playerRef} className="absolute flex items-center justify-center pointer-events-none will-change-transform" style={{ left: 600, top: 450, transform: 'translate(-50%, -50%) rotateX(-55deg)', transformOrigin: 'bottom center' }}>
           <Model3DPlaceholder colorClass="bg-gray-400" />
        </div>

      </div>

      <div className="absolute top-10 flex flex-col items-center pointer-events-none z-50">
         <div className="bg-black/80 px-10 py-5 rounded-full border border-white/10 shadow-2xl backdrop-blur-md">
            <h2 className={cn("text-3xl font-black italic", gameState.status === 'lost' ? "text-red-500 drop-shadow-[0_0_10px_red]" : "text-emerald-400")}>
               {gameState.status === 'lost' ? gameState.feedback : `SURVIE (${difficulty}): ${gameState.time}s`}
            </h2>
         </div>
         {gameState.status !== 'playing' && (
           <button onClick={() => {
              pState.current.x = 600; pState.current.y = 450; pState.current.targetX = 600; pState.current.targetY = 450;
              pState.current.flashCd = 0;
              if (shotsCtrRef.current) shotsCtrRef.current.innerHTML = "";
              shotsRef.current = []; timerRef.current.frames = 0; gStatus.current = 'playing';
              setGameState({ status: 'playing', time: 0, feedback: '' });
           }} className="mt-8 px-12 py-4 bg-emerald-600 border border-emerald-400 text-white rounded-full font-black text-2xl shadow-[0_0_30px_rgba(16,185,129,0.6)] pointer-events-auto hover:scale-110 active:scale-95 transition-all">
             RECOMMENCER
           </button>
         )}
      </div>
    </div>
  );
}

// ----------------------------------------------------
// AIM TRAINING (Morgana Q)
// ----------------------------------------------------
function AimGame({ keysConfig, difficulty, isPaused }) {
  const [gameState, setGameState] = useState({ status: 'playing', score: 0, feedback: '' });

  const envRef = useRef(null);
  const elementsCtrRef = useRef(null);
  
  // Game state
  const mouseState = useRef({ x: 600, y: 450 });
  const pState = useRef({ x: 600, y: 450, targetX: 600, targetY: 450, speed: 3.5, cd: 0 });
  const playerRef = useRef(null);
  const entitiesRef = useRef({ enemies: [], projectiles: [] });
  
  const gStatus = useRef('playing'); 
  const timerRef = useRef({ frames: 0 });
  const frameRef = useRef(null);
  const pausedRef = useRef(isPaused);

  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);

  useEffect(() => {
    let speedMin = difficulty === 'easy' ? 2 : difficulty === 'normal' ? 3.5 : 5;
    let speedMax = difficulty === 'easy' ? 3.5 : difficulty === 'normal' ? 5 : 7;
    let spawnRate = difficulty === 'easy' ? 100 : difficulty === 'normal' ? 70 : 50; 

    function createEnemy(x, y, vx, vy, speed) {
      const el = document.createElement("div");
      el.className = "absolute flex items-center justify-center will-change-transform";
      el.style.left = `${x}px`; el.style.top = `${y}px`;
      el.style.transform = "translate(-50%, -50%) rotateX(-55deg)";
      el.innerHTML = `
        <div class="relative w-16 h-36 rounded-full border border-black/50 overflow-hidden bg-red-500 shadow-[inset_-15px_0_30px_rgba(0,0,0,0.6),inset_10px_0_20px_rgba(255,255,255,0.4),0_20px_40px_rgba(0,0,0,0.9)]">
          <div class="absolute top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white/20 shadow-[inset_-2px_-2px_10px_rgba(0,0,0,0.5)]"></div>
          <div class="absolute bottom-0 left-0 w-full h-4 bg-gradient-to-t from-black/80 to-transparent"></div>
        </div>
      `;
      if (elementsCtrRef.current) elementsCtrRef.current.appendChild(el);
      return { id: Math.random(), x, y, vx, vy, speed, el, active: true };
    }

    const tick = () => {
      frameRef.current = requestAnimationFrame(tick);
      if (pausedRef.current) return;

      if (pState.current.x !== pState.current.targetX || pState.current.y !== pState.current.targetY) {
         const dx = pState.current.targetX - pState.current.x;
         const dy = pState.current.targetY - pState.current.y;
         const dist = Math.sqrt(dx*dx + dy*dy);
         if (dist < pState.current.speed) {
            pState.current.x = pState.current.targetX; pState.current.y = pState.current.targetY;
         } else {
            pState.current.x += (dx/dist) * pState.current.speed;
            pState.current.y += (dy/dist) * pState.current.speed;
         }
         if (playerRef.current) {
            playerRef.current.style.left = `${pState.current.x}px`;
            playerRef.current.style.top = `${pState.current.y}px`;
         }
      }

      if (gStatus.current === 'playing') {
        timerRef.current.frames++;
        
        // Spawn Enemies
        if (timerRef.current.frames % spawnRate === 0) {
           const side = Math.floor(Math.random() * 4);
           let sx, sy, tx, ty;
           // Player is at 600, 450. Enemies cross
           if (side === 0) { sx = Math.random()*1200; sy = -100; tx = Math.random()*1200; ty = 1000; } 
           else if (side === 1) { sx = 1300; sy = Math.random()*900; tx = -100; ty = Math.random()*900; } 
           else if (side === 2) { sx = Math.random()*1200; sy = 1000; tx = Math.random()*1200; ty = -100; } 
           else { sx = -100; sy = Math.random()*900; tx = 1300; ty = Math.random()*900; } 

           const angle = Math.atan2(ty - sy, tx - sx);
           const en = createEnemy(sx, sy, Math.cos(angle), Math.sin(angle), speedMin + Math.random()*(speedMax-speedMin));
           entitiesRef.current.enemies.push(en);
        }

        // Projectiles
        for (let i = entitiesRef.current.projectiles.length - 1; i >= 0; i--) {
           let p = entitiesRef.current.projectiles[i];
           p.x += p.vx * p.speed; p.y += p.vy * p.speed;

           let hit = false;
           for (let j = entitiesRef.current.enemies.length - 1; j >= 0; j--) {
               let e = entitiesRef.current.enemies[j];
               if (!e.active) continue;
               const dx = p.x - e.x; const dy = p.y - e.y;
               if (Math.sqrt(dx*dx + dy*dy) < 45) { // Hitbox
                  hit = true;
                  e.active = false;
                  if (e.el) e.el.remove();
                  entitiesRef.current.enemies.splice(j, 1);
                  setGameState(s => ({ ...s, score: s.score + 1 }));
                  
                  const hitFx = document.createElement("div");
                  hitFx.className = "absolute w-24 h-24 border-4 border-purple-400 rounded-full animate-ping";
                  hitFx.style.left = `${e.x - 48}px`; hitFx.style.top = `${e.y - 48}px`;
                  hitFx.style.transform = "rotateX(-55deg) scaleY(0.5)";
                  if (elementsCtrRef.current) elementsCtrRef.current.appendChild(hitFx);
                  setTimeout(() => hitFx.remove(), 400);
                  break;
               }
           }

           if (hit || p.x < -200 || p.x > 1400 || p.y < -200 || p.y > 1100) {
              if (p.el) p.el.remove();
              entitiesRef.current.projectiles.splice(i, 1);
           } else {
              if (p.el) { p.el.style.left = `${p.x}px`; p.el.style.top = `${p.y}px`; }
           }
        }

        // Update Enemies
        for (let i = entitiesRef.current.enemies.length - 1; i >= 0; i--) {
           let e = entitiesRef.current.enemies[i];
           e.x += e.vx * e.speed; e.y += e.vy * e.speed;
           
           if (e.x < -200 || e.x > 1400 || e.y < -200 || e.y > 1100) {
              if (e.el) e.el.remove();
              entitiesRef.current.enemies.splice(i, 1);
           } else {
              if (e.el) { e.el.style.left = `${e.x}px`; e.el.style.top = `${e.y}px`; }
           }
        }
      }

      if (pState.current.cd > 0) pState.current.cd--;
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [difficulty]);

  const handlePointerMove = (e) => {
    mouseState.current.x = e.nativeEvent.offsetX;
    mouseState.current.y = e.nativeEvent.offsetY;
  };

  const useSpell = useCallback((spellName) => {
    if (gStatus.current !== 'playing' || pState.current.cd > 0 || pausedRef.current) return;
    if (spellName === 'skillshot') {
      pState.current.cd = difficulty === 'hardcore' ? 30 : 20; 
      
      const px = pState.current.x; const py = pState.current.y;
      const angle = Math.atan2(mouseState.current.y - py, mouseState.current.x - px);

      const el = document.createElement("div");
      el.className = "absolute flex items-center justify-center will-change-transform opacity-80";
      el.style.left = `${px}px`; el.style.top = `${py}px`;
      el.style.transform = `translate(-50%, -50%) rotateX(-55deg) rotate(${angle}rad)`;
      el.innerHTML = `
        <div class="relative w-16 h-16 rounded-full bg-purple-600 shadow-[0_0_40px_rgba(147,51,234,1)] animate-pulse border-[6px] border-purple-300">
          <div class="absolute -right-4 top-1/2 -translate-y-1/2 w-8 h-12 bg-purple-400 blur-sm mix-blend-screen rounded-full animate-bounce"></div>
        </div>
      `;
      if (elementsCtrRef.current) elementsCtrRef.current.appendChild(el);

      entitiesRef.current.projectiles.push({
         x: px, y: py, vx: Math.cos(angle), vy: Math.sin(angle), speed: 18, el
      });
    }
  }, [difficulty]);

  const handleContext = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (gStatus.current !== 'playing' || pausedRef.current) return;
    const x = e.nativeEvent.offsetX; const y = e.nativeEvent.offsetY;
    
    pState.current.targetX = x; pState.current.targetY = y;

    const ping = document.createElement("div");
    ping.className = "absolute w-12 h-12 border-4 border-purple-500/80 rounded-full animate-ping pointer-events-none";
    ping.style.left = `${x - 24}px`; ping.style.top = `${y - 24}px`;
    ping.style.transform = "rotateX(-55deg) scaleY(0.5)";
    e.target.appendChild(ping);
    setTimeout(() => ping.remove(), 400);
  };

  useEffect(() => {
    const hk = (e) => {
      let val = e.key.toLowerCase(); if (val === ' ') val = 'space';
      if (val === keysConfig.skillshot) useSpell('skillshot');
    };
    const hm = (e) => {
      if (e.button === 0 || e.button === 2) return;
      if (`mouse ${e.button}` === keysConfig.skillshot) useSpell('skillshot');
    };
    window.addEventListener('keydown', hk); window.addEventListener('mousedown', hm);
    return () => { window.removeEventListener('keydown', hk); window.removeEventListener('mousedown', hm); };
  }, [keysConfig, useSpell]);

  return (
    <div className="flex-1 flex items-center justify-center bg-black relative overflow-hidden pointer-events-none w-full h-full">
      <div 
         id="arena-floor"
         className="absolute w-[1200px] h-[900px] bg-[#0c0c14] border-8 border-purple-900/50 shadow-[inset_0_0_300px_rgba(0,0,0,1)] pointer-events-auto cursor-[url(https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/cursor/cursor-crosshair.png),_crosshair] will-change-transform"
         style={{ transform: 'perspective(1500px) rotateX(55deg) scale(1.1)', transformStyle: 'preserve-3d' }}
         onContextMenu={e=>e.preventDefault()}
      >
        <div className="absolute inset-0 bg-[#160f24] opacity-30 pointer-events-none" />
        <div className="absolute inset-0 z-50 pointer-events-auto" onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }}  onPointerMove={handlePointerMove} onPointerDown={(e) => { if (e.button===0) { e.preventDefault(); useSpell('skillshot'); } else if (e.button===2) handleContext(e); }} />
        
        <div ref={elementsCtrRef} className="absolute inset-0 pointer-events-none" />

        {/* PLAYER */}
        <div ref={playerRef} className="absolute flex items-center justify-center pointer-events-none will-change-transform" style={{ left: 600, top: 450, transform: 'translate(-50%, -50%) rotateX(-55deg)', transformOrigin: 'bottom center' }}>
           <div className="absolute bottom-0 w-[500px] h-[500px] rounded-full border border-purple-500/10 bg-purple-500/[0.01]" style={{ transform: 'translateY(50%) rotateX(55deg)' }} />
           <div className="absolute bottom-0 w-[120px] h-[120px] rounded-full border border-purple-500/50 bg-purple-500/10 shadow-[0_0_20px_rgba(147,51,234,0.3)] animate-pulse" style={{ transform: 'translateY(50%) rotateX(55deg)' }} />
           <div className="w-16 h-28 bg-purple-400 rounded-full border border-black/50 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.5),0_10px_30px_rgba(0,0,0,0.8)] relative overflow-hidden">
               <div className="absolute top-2 w-10 h-10 rounded-full bg-white/20 left-1/2 -translate-x-1/2"></div>
           </div>
        </div>
      </div>

      <div className="absolute top-10 flex flex-col items-center pointer-events-none z-50">
         <div className="bg-black/80 px-10 py-5 rounded-full border border-white/10 shadow-2xl backdrop-blur-md">
            <h2 className="text-3xl font-black italic text-purple-400 drop-shadow-[0_2px_4px_black]">
               TOUCHÉ : {gameState.score}
            </h2>
            <p className="text-gray-400 text-sm mt-1">Anticipez les trajectoires et lancez [ <span className="font-bold text-white uppercase">{keysConfig.skillshot}</span> ou Clic Gauche ]</p>
         </div>
      </div>
    </div>
  );
}

// ----------------------------------------------------
// LAST HITTING (Farm)
// ----------------------------------------------------
function FarmGame({ keysConfig, difficulty, isPaused }) {
  const [gameState, setGameState] = useState({ score: 0, missed: 0 });

  const elementsCtrRef = useRef(null);
  const playerRef = useRef(null);
  
  const mouseState = useRef({ x: 600, y: 750 });
  const pState = useRef({ x: 600, y: 750, targetX: 600, targetY: 750, speed: 3.8, cd: 0 });
  const minionsRef = useRef([]);
  const projectilesRef = useRef([]);
  
  const gStatus = useRef('playing'); 
  const timerRef = useRef({ frames: 0 });
  const frameRef = useRef(null);
  const pausedRef = useRef(isPaused);

  useEffect(() => { pausedRef.current = isPaused; }, [isPaused]);

  useEffect(() => {
    const ad = difficulty === 'hardcore' ? 30 : difficulty === 'normal' ? 60 : 100;
    let minionSpawnRate = difficulty === 'hardcore' ? 40 : difficulty === 'normal' ? 60 : 80;

    const tick = () => {
      frameRef.current = requestAnimationFrame(tick);
      if (pausedRef.current) return;

      if (gStatus.current === 'playing') {
        timerRef.current.frames++;
        
        // Spawn Minions 1 by 1
        if (timerRef.current.frames % minionSpawnRate === 0 && minionsRef.current.length < 12) {
           const pos = { x: 200 + Math.random() * 800, y: 150 + Math.random() * 400 };
           const hp = 300 + Math.random() * 100;
           const el = document.createElement("div");
           el.className = "absolute flex flex-col items-center justify-center will-change-transform";
           el.style.left = `${pos.x}px`; el.style.top = `${pos.y}px`;
           el.style.transform = "translate(-50%, -50%) rotateX(-55deg) scale(0)";
           el.style.transition = "transform 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
           el.innerHTML = `
             <div class="absolute -top-12 w-20 h-2 bg-black/80 border border-white/10 rounded-full overflow-hidden">
                <div class="hp-fill absolute left-0 top-0 bottom-0 bg-red-500 shadow-[0_0_10px_red]" style="width: 100%"></div>
             </div>
             <div class="relative w-12 h-20 rounded-full border border-black/50 overflow-hidden bg-red-800 shadow-inner">
               <div class="absolute top-2 w-8 h-8 rounded-full bg-red-900 border border-black/20 left-1/2 -translate-x-1/2"></div>
             </div>
           `;
           if (elementsCtrRef.current) elementsCtrRef.current.appendChild(el);
           setTimeout(() => { if (el) el.style.transform = "translate(-50%, -50%) rotateX(-55deg) scale(1)"; }, 100);
           minionsRef.current.push({ id: Math.random(), x: pos.x, y: pos.y, hp, maxHp: hp, el, active: true });
        }

        // Match player movement
        if (pState.current.x !== pState.current.targetX || pState.current.y !== pState.current.targetY) {
           const dx = pState.current.targetX - pState.current.x;
           const dy = pState.current.targetY - pState.current.y;
           const dist = Math.sqrt(dx*dx + dy*dy);
           if (dist < pState.current.speed) {
              pState.current.x = pState.current.targetX; pState.current.y = pState.current.targetY;
           } else {
              pState.current.x += (dx/dist) * pState.current.speed;
              pState.current.y += (dy/dist) * pState.current.speed;
           }
           if (playerRef.current) {
              playerRef.current.style.left = `${pState.current.x}px`;
              playerRef.current.style.top = `${pState.current.y}px`;
           }
        }
        
        // Passive Minion Damage
        if (timerRef.current.frames % (difficulty === 'hardcore' ? 6 : Math.random() < 0.5 ? 9 : 12) === 0) {
           minionsRef.current.forEach(m => {
              if (m.active && Math.random() > 0.4) {
                 m.hp -= (Math.random() * 20 + 5); 
                 if (m.hp <= 0) {
                    m.active = false;
                    if (m.el) {
                       m.el.style.opacity = '0.2';
                       m.el.style.transform = "translate(-50%, -50%) rotateX(-55deg) scale(0.8)";
                    }
                    setTimeout(() => { if (m.el) m.el.remove(); }, 1000);
                    setGameState(s => ({ ...s, missed: s.missed + 1 }));
                 } else if (m.el) {
                    const fill = m.el.querySelector('.hp-fill');
                    if (fill) fill.style.width = `${Math.max(0, (m.hp/m.maxHp)*100)}%`;
                    
                    const char = m.el.querySelector('.bg-red-800');
                    if (char) {
                        char.style.filter = "brightness(1.5)";
                        setTimeout(() => char.style.filter = "none", 100);
                    }
                 }
              }
           });
        }

        minionsRef.current = minionsRef.current.filter(m => m.active || (m.hp > 0)); 

        for (let i = projectilesRef.current.length - 1; i >= 0; i--) {
           let p = projectilesRef.current[i];
           if (!p.target || !p.target.active) { 
              if (p.el) p.el.remove();
              projectilesRef.current.splice(i, 1);
              continue;
           }

           const dx = p.target.x - p.x; const dy = p.target.y - p.y;
           const dist = Math.sqrt(dx*dx + dy*dy);

           if (dist < 30) {
              const dmg = ad + Math.random()*10;
              p.target.hp -= dmg;

              if (p.target.hp <= 0) {
                 p.target.active = false;
                 if (p.target.el) p.target.el.remove();
                 
                 const gold = document.createElement("div");
                 gold.className = "absolute text-yellow-400 font-black text-3xl drop-shadow-[0_2px_4px_rgba(0,0,0,1)] flex items-center gap-1 z-50";
                 gold.style.left = `${p.target.x - 20}px`; gold.style.top = `${p.target.y - 70}px`;
                 gold.style.transform = "rotateX(-55deg)";
                 gold.style.transition = "transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275), top 0.6s ease-out, opacity 0.6s ease";
                 gold.innerHTML = `+ 21 <div class="w-4 h-4 rounded-full bg-yellow-400 shadow-[0_0_10px_yellow]"></div>`;
                 if (elementsCtrRef.current) elementsCtrRef.current.appendChild(gold);
                 
                 setTimeout(() => { gold.style.top = `${p.target.y - 120}px`; gold.style.opacity = '0'; }, 50);
                 setTimeout(() => gold.remove(), 800);

                 setGameState(s => ({ ...s, score: s.score + 1 }));
              } else {
                  if (p.target.el) {
                    const fill = p.target.el.querySelector('.hp-fill');
                    if (fill) fill.style.width = `${Math.max(0, (p.target.hp/p.target.maxHp)*100)}%`;
                  }
              }
              if (p.el) p.el.remove();
              projectilesRef.current.splice(i, 1);
           } else {
              p.x += (dx/dist) * p.speed; p.y += (dy/dist) * p.speed;
              if (p.el) { p.el.style.left = `${p.x}px`; p.el.style.top = `${p.y}px`; }
           }
        }
      }

      if (pState.current.cd > 0) pState.current.cd--;
    };
    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [difficulty]);

  const handlePointerMove = (e) => {
    mouseState.current.x = e.nativeEvent.offsetX;
    mouseState.current.y = e.nativeEvent.offsetY;
  };

  const useSpell = useCallback((spellName) => {
    if (gStatus.current !== 'playing' || pState.current.cd > 0 || pausedRef.current) return;
    if (spellName === 'attack') {
      
      let closest = null; let minDist = Infinity;
      minionsRef.current.forEach(m => {
         if (!m.active) return;
         const dx = m.x - mouseState.current.x; const dy = m.y - mouseState.current.y;
         const d = Math.sqrt(dx*dx + dy*dy);
         if (d < minDist && d < 120) { minDist = d; closest = m; } 
      });

      if (closest) {
         pState.current.cd = 40; 
         const px = pState.current.x; const py = pState.current.y;
         
         const el = document.createElement("div");
         el.className = "absolute w-6 h-6 rounded-full bg-yellow-400 shadow-[0_0_20px_yellow] will-change-transform";
         el.style.left = `${px}px`; el.style.top = `${py}px`;
         el.style.transform = `translate(-50%, -50%) rotateX(-55deg)`;
         if (elementsCtrRef.current) elementsCtrRef.current.appendChild(el);

         projectilesRef.current.push({ x: px, y: py, target: closest, speed: 25, el });
      }
    }
  }, []);
  
  const handleContext = (e) => {
    e.preventDefault(); e.stopPropagation();
    if (gStatus.current !== 'playing' || pausedRef.current) return;
    const x = e.nativeEvent.offsetX; const y = e.nativeEvent.offsetY;

    let hitMinion = null;
    minionsRef.current.forEach(m => {
       if (!m.active) return;
       const dx = m.x - x; const dy = m.y - y;
       if (Math.sqrt(dx*dx + dy*dy) < 60) hitMinion = m;
    });

    if (hitMinion) {
       useSpell('attack');
       return;
    }

    pState.current.targetX = x;
    pState.current.targetY = y;
    
    const ping = document.createElement("div");
    ping.className = "absolute w-12 h-12 border-4 border-green-500/80 rounded-full animate-ping pointer-events-none";
    ping.style.left = `${x - 24}px`; ping.style.top = `${y - 24}px`;
    ping.style.transform = "rotateX(-55deg) scaleY(0.5)";
    e.target.appendChild(ping);
    setTimeout(() => ping.remove(), 400);
  };

  useEffect(() => {
    const hk = (e) => {
      let val = e.key.toLowerCase(); if (val === ' ') val = 'space';
      if (val === keysConfig.attack) useSpell('attack');
    };
    window.addEventListener('keydown', hk); 
    return () => window.removeEventListener('keydown', hk); 
  }, [keysConfig, useSpell]);

  return (
    <div className="flex-1 flex items-center justify-center bg-black relative overflow-hidden pointer-events-none w-full h-full">
      <div 
         id="arena-floor"
         className="absolute w-[1200px] h-[900px] bg-[#1a1612] border-8 border-yellow-900/50 shadow-[inset_0_0_300px_rgba(0,0,0,1)] pointer-events-auto cursor-[url(https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/cursor/cursor-crosshair.png),_crosshair] will-change-transform"
         style={{ transform: 'perspective(1500px) rotateX(55deg) scale(1.1)', transformStyle: 'preserve-3d' }}
         onContextMenu={e=>e.preventDefault()}
      >
        <div className="absolute inset-0 z-50 pointer-events-auto" onContextMenu={(e) => { e.preventDefault(); e.stopPropagation(); }} onPointerMove={handlePointerMove} onPointerDown={(e) => { if (e.button===2 || e.button===0) handleContext(e); }} />
        
        <div ref={elementsCtrRef} className="absolute inset-0 pointer-events-none" />

        <div ref={playerRef} className="absolute flex items-center justify-center pointer-events-none will-change-transform" style={{ left: 600, top: 750, transform: 'translate(-50%, -50%) rotateX(-55deg)', transformOrigin: 'bottom center' }}>
           <div className="absolute bottom-0 w-[500px] h-[500px] rounded-full border border-yellow-500/20 bg-yellow-500/[0.02]" style={{ transform: 'translateY(50%) rotateX(55deg)' }} />
           <div className="w-16 h-28 bg-yellow-600 rounded-full border-2 border-black/50 shadow-2xl relative overflow-hidden">
               <div className="absolute top-2 w-10 h-10 rounded-full bg-white/20 left-1/2 -translate-x-1/2"></div>
           </div>
        </div>
      </div>

      <div className="absolute top-10 flex flex-col items-center pointer-events-none z-50">
         <div className="bg-black/80 px-10 py-5 rounded-full border border-white/20 shadow-2xl backdrop-blur-md flex gap-8 items-center">
            <div className="text-center">
               <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">CS Farm</h2>
               <p className="text-4xl font-black text-yellow-400 drop-shadow-[0_2px_4px_black]">{gameState.score}</p>
            </div>
            <div className="w-px h-12 bg-white/20"></div>
            <div className="text-center">
               <h2 className="text-sm font-bold text-gray-400 uppercase tracking-widest">Ratés</h2>
               <p className="text-4xl font-black text-red-500 drop-shadow-[0_2px_4px_black]">{gameState.missed}</p>
            </div>
         </div>
         <p className="text-gray-400 text-sm mt-4 font-bold bg-black/60 px-4 py-2 rounded-xl backdrop-blur-md">Déplacez-vous avec Clic Droit. Survolez un sbire mid-life puis attaquez [ <span className="text-white uppercase">{keysConfig.attack}</span> ]</p>
      </div>
    </div>
  );
}
