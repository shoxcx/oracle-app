import React from 'react';
import { Power, RefreshCw, MonitorPlay } from 'lucide-react';
import oracleLogo from './assets/oracle_logo.png';

export function ClientDisconnectedView({ t }) {
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
    );
}
