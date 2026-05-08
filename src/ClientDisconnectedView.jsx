import React, { useState, useEffect } from 'react';
import { Power, RefreshCw, MonitorPlay, User, Globe, ArrowRight, Loader2, Info, ChevronLeft, Search, Zap, Shield, BarChart3, Radio } from 'lucide-react';
import oracleLogo from './assets/oracle_logo.png';

export function ClientDisconnectedView({ t }) {
    const [isLoginMode, setLoginMode] = useState(false);
    const [inputs, setInputs] = useState({ name: '', tag: '', region: 'EUW' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!inputs.name || !inputs.tag) {
                setError("Veuillez entrer un Pseudo et un Tag.");
                setLoading(false);
                return;
            }

            const user = await window.ipcRenderer.invoke('manual-login', inputs);
            if (user) {
                console.log("Logged in:", user);
            } else {
                setError("Compte introuvable ou erreur de connexion.");
            }
        } catch (err) {
            console.error(err);
            setError("Erreur interne.");
        } finally {
            setLoading(false);
        }
    };

    const regions = [
        { id: 'EUW', label: 'Europe West' },
        { id: 'NA', label: 'North America' },
        { id: 'KR', label: 'Korea' },
        { id: 'EUNE', label: 'Europe Nordic & East' },
        { id: 'BR', label: 'Brazil' },
        { id: 'TR', label: 'Turkey' },
        { id: 'RU', label: 'Russia' },
        { id: 'LAN', label: 'Latin America North' },
        { id: 'LAS', label: 'Latin America South' },
        { id: 'OCE', label: 'Oceania' },
        { id: 'JP', label: 'Japan' },
        { id: 'PH', label: 'Philippines' },
        { id: 'SG', label: 'Singapore' },
        { id: 'TH', label: 'Thailand' },
        { id: 'TW', label: 'Taiwan' },
        { id: 'VN', label: 'Vietnam' },
    ];

    if (isLoginMode) {
        return (
            <div className="h-full w-full relative overflow-hidden bg-[#0a0a0c] flex items-center justify-center font-sans">
                {/* Cinematic Background */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-purple-500/10 opacity-30"></div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_70%)]"></div>
                </div>

                <div className="w-full max-w-md glass-panel p-10 relative z-10 animate-in fade-in zoom-in-95 duration-500 border-white/10 shadow-[0_40px_80px_-15px_rgba(0,0,0,0.8)]">
                    <button
                        onClick={() => setLoginMode(false)}
                        className="absolute top-8 left-8 p-2 rounded-xl hover:bg-white/10 text-gray-400 transition-all hover:text-white"
                    >
                        <ChevronLeft size={24} />
                    </button>

                    <div className="text-center mb-10 mt-2">
                        <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl mx-auto mb-6 flex items-center justify-center shadow-[0_15px_30px_-5px_rgba(37,99,235,0.4)] transform hover:scale-110 transition-transform">
                            <User className="text-white" size={40} />
                        </div>
                        <h2 className="text-3xl font-black text-white italic tracking-tight uppercase">Accès Manuel</h2>
                        <p className="text-gray-400 mt-2 text-sm">Consultez votre profil sans lancer le client League.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="flex gap-4">
                            <div className="flex-1 space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Riot ID</label>
                                <input
                                    type="text"
                                    placeholder="Nom"
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                                    value={inputs.name}
                                    onChange={e => setInputs({ ...inputs, name: e.target.value })}
                                />
                            </div>
                            <div className="w-28 space-y-2">
                                <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Tag</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold">#</span>
                                    <input
                                        type="text"
                                        placeholder="EUW"
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl pl-8 pr-4 py-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all placeholder:text-gray-600"
                                        value={inputs.tag}
                                        onChange={e => setInputs({ ...inputs, tag: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest ml-1">Région</label>
                            <div className="relative">
                                <Globe className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                                <select
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-5 py-4 text-sm font-bold text-white focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all appearance-none cursor-pointer hover:bg-white/10"
                                    value={inputs.region}
                                    onChange={e => setInputs({ ...inputs, region: e.target.value })}
                                >
                                    {regions.map(r => <option key={r.id} value={r.id} className="bg-[#1a1a1f]">{r.label}</option>)}
                                </select>
                                <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] border-t-gray-500"></div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-bold flex items-center gap-3 animate-in slide-in-from-top-2">
                                <Info size={16} /> {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black py-5 rounded-2xl transition-all active:scale-95 flex items-center justify-center gap-3 shadow-[0_15px_30px_-5px_rgba(37,99,235,0.3)] disabled:opacity-50 tracking-wide uppercase italic"
                        >
                            {loading ? <Loader2 size={22} className="animate-spin" /> : <>Se Connecter <ArrowRight size={22} /></>}
                        </button>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full relative overflow-hidden bg-[#070709] transition-colors duration-500 flex flex-col font-sans">
            {/* STUNNING ANIMATED BACKGROUND */}
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-purple-600/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                
                {/* Oracle Grid Overlay */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '60px 60px' }}></div>
            </div>

            <div className="flex-1 flex flex-col items-center justify-center p-8 z-10">


                {/* Main Headline */}
                <div className="text-center max-w-2xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-200">
                    <h1 className="text-6xl md:text-8xl font-black italic mb-4 flex flex-col items-center select-none uppercase overflow-visible py-4">
                        <span className="text-white drop-shadow-[0_10px_30px_rgba(255,255,255,0.15)] leading-tight px-6 inline-block">
                            ORACLE <span className="text-blue-500">LOL</span>
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400 drop-shadow-[0_10px_30px_rgba(59,130,246,0.2)] leading-tight mt-2 px-8 inline-block">
                            TRACKER
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 font-medium mb-10 max-w-lg mx-auto leading-relaxed uppercase tracking-wider">
                        {t('launch_game_desc') || "Lancez votre client League of Legends pour synchroniser vos données en temps réel."}
                    </p>
                </div>

                {/* Real-time Status */}
                <div className="flex flex-col items-center gap-10 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-500">
                    <div className="flex items-center gap-4 px-8 py-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl">
                        <div className="relative flex h-4 w-4">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-4 w-4 bg-red-600"></span>
                        </div>
                        <span className="text-base font-black text-gray-300 uppercase tracking-[0.2em] italic">
                            {t('disconnected') || "Client non détecté"}
                        </span>
                    </div>

                    {/* Features Showcase */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl mt-4">
                        {[
                            { icon: <Zap className="text-blue-400" />, title: "Live Game", desc: "Suivi en temps réel" },
                            { icon: <Shield className="text-purple-400" />, title: "AI Coaching", desc: "Analyse post-game" },
                            { icon: <BarChart3 className="text-emerald-400" />, title: "Rank Tracker", desc: "Gains de LP précis" }
                        ].map((f, i) => (
                            <div key={i} className="glass-panel p-6 flex flex-col items-center text-center gap-3 border-white/5 hover:bg-white/10 transition-colors cursor-default group">
                                <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center group-hover:scale-110 transition-transform">
                                    {f.icon}
                                </div>
                                <h3 className="font-black italic text-white uppercase text-xs tracking-widest">{f.title}</h3>
                                <p className="text-[10px] text-gray-500 font-bold uppercase">{f.desc}</p>
                            </div>
                        ))}
                    </div>

                        <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest animate-pulse mt-8">
                            En attente de connexion...
                        </p>
                </div>
            </div>


        </div>
    );
}
