import React, { useState } from 'react';
import { Power, RefreshCw, MonitorPlay, User, Globe, ArrowRight, Loader2, Info, ChevronLeft } from 'lucide-react';
import oracleLogo from './assets/oracle_logo.png';

export function ClientDisconnectedView({ t }) {
    const [isLoginMode, setLoginMode] = useState(false);
    const [inputs, setInputs] = useState({ name: '', tag: '', region: 'EUW' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            if (!filterInputs()) {
                setLoading(false);
                return;
            }

            const user = await window.ipcRenderer.invoke('manual-login', inputs);
            if (user) {
                // Success! The main App loop should pick this up automatically via lcu:get-current-summoner override
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

    const filterInputs = () => {
        if (!inputs.name || !inputs.tag) {
            setError("Veuillez entrer un Pseudo et un Tag.");
            return false;
        }
        return true;
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
            <div className="h-full w-full relative overflow-hidden bg-[#f5f5f7] dark:bg-[#09090b] transition-colors duration-300 flex items-center justify-center">
                {/* Background Ambience */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]"></div>
                    <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[100px]"></div>
                </div>

                <div className="w-full max-w-md bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl p-8 shadow-2xl relative z-10 animate-in fade-in zoom-in-95 duration-300">
                    <button
                        onClick={() => setLoginMode(false)}
                        className="absolute top-6 left-6 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/10 text-gray-500 transition-colors"
                    >
                        <ChevronLeft size={20} />
                    </button>

                    <div className="text-center mb-8 mt-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-500/20">
                            <User className="text-white" size={32} />
                        </div>
                        <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100">Connexion Riot ID</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Accédez à votre profil sans lancer le client</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div className="flex gap-2">
                            <div className="flex-1 space-y-1">
                                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider ml-1">Game Name</label>
                                <input
                                    type="text"
                                    placeholder="Hide on bush"
                                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all placeholder:font-normal"
                                    value={inputs.name}
                                    onChange={e => setInputs({ ...inputs, name: e.target.value })}
                                />
                            </div>
                            <div className="w-24 space-y-1">
                                <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider ml-1">Tag</label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">#</span>
                                    <input
                                        type="text"
                                        placeholder="EUW"
                                        className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-7 pr-3 py-3 text-sm font-bold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all placeholder:font-normal"
                                        value={inputs.tag}
                                        onChange={e => setInputs({ ...inputs, tag: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider ml-1">Mot De Passe <span className='text-xs text-gray-600 normal-case'>(Optionnel pour statistiques)</span></label>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all placeholder:font-normal"
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-[10px] font-bold uppercase text-gray-400 tracking-wider ml-1">Région</label>
                            <div className="relative">
                                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                                <select
                                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm font-bold text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-accent-primary/50 transition-all appearance-none cursor-pointer"
                                    value={inputs.region}
                                    onChange={e => setInputs({ ...inputs, region: e.target.value })}
                                >
                                    {regions.map(r => <option key={r.id} value={r.id}>{r.label} ({r.id})</option>)}
                                </select>
                                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l-4 border-transparent border-t-4 border-t-gray-400 border-r-4"></div>
                            </div>
                        </div>

                        {error && (
                            <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-bold flex items-center gap-2">
                                <Info size={14} /> {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-accent-primary hover:bg-accent-primary/90 text-black font-black py-4 rounded-xl transition-all active:scale-95 flex items-center justify-center gap-2 mt-4 disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {loading ? <Loader2 size={18} className="animate-spin" /> : <>CONNEXION <ArrowRight size={18} /></>}
                        </button>
                    </form>
                </div >
            </div >
        );
    }

    return (
        <div className="h-full w-full relative overflow-hidden bg-[#f5f5f7] dark:bg-[#000000] transition-colors duration-300">
            {/* Background Ambience */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[100px] animate-pulse"></div>
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-500/10 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Main Content Scroll Wrapper */}
            <div className="h-full w-full overflow-y-auto">
                <div className="min-h-full flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-500">

                    {/* Logo Container with Glow */}
                    <div className="relative mb-8 group shrink-0">
                        <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full group-hover:bg-blue-500/30 transition-all duration-500"></div>
                        <img
                            src={oracleLogo}
                            alt="Oracle Logo"
                            className="w-32 h-32 relative drop-shadow-2xl transition-transform duration-500 hover:scale-110 object-contain"
                        />
                    </div>

                    {/* Main Title */}
                    <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-br from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 mb-4 tracking-tight text-center">
                        {t('waiting_for_league') || "En attente de League of Legends"}
                    </h1>

                    {/* Subtitle / Instruction */}
                    <p className="text-lg text-gray-500 dark:text-gray-400 font-medium mb-12 max-w-md text-center">
                        {t('launch_game_desc') || "Veuillez lancer votre client League of Legends pour accéder aux fonctionnalités."}
                    </p>

                    {/* Actions */}
                    <div className="flex flex-col items-center gap-4">
                        {/* Status Indicator */}
                        <div className="flex items-center gap-3 px-6 py-3 bg-white/50 dark:bg-white/5 backdrop-blur-md rounded-full border border-gray-200 dark:border-white/10 shadow-sm shrink-0">
                            <div className="relative flex h-3 w-3">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                            </div>
                            <span className="text-sm font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-widest">
                                {t('disconnected') || "NON DÉTECTÉ"}
                            </span>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
}
