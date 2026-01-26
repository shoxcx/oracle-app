const fs = require('fs');
const path = "c:/Users/User/.gemini/antigravity/scratch/lol-tracker/src/App.jsx";
let content = fs.readFileSync(path, 'utf8');

// Reliable rewrite of SettingsView
const funcHeader = "function SettingsView";
const footerMarker = "function OverlayLayoutEditor";

const headerIndex = content.indexOf(funcHeader);
const footerIndex = content.indexOf(footerMarker);

if (headerIndex !== -1 && footerIndex !== -1) {
    const newFunctionCode = `function SettingsView({ theme, setTheme, visualMode, setVisualMode, language, setLanguage, t, autoAccept, setAutoAccept, autoImportRunes, setAutoImportRunes, flashPosition, setFlashPosition, overlaySettings, setOverlaySettings, panelClass }) {
  const [isEditingLayout, setIsEditingLayout] = useState(false);
  const [launchOnStartup, setLaunchOnStartup] = useState(false);

  useEffect(() => {
    ipcRenderer.invoke('app:get-auto-launch').then(setLaunchOnStartup);
  }, []);

  const languages = [
    { code: 'en', label: 'English (US)' }, { code: 'fr', label: 'Français' }, { code: 'es', label: 'Español' },
    { code: 'pt', label: 'Português' }, { code: 'de', label: 'Deutsch' }, { code: 'ru', label: 'Русский' },
    { code: 'ja', label: '日本語' }, { code: 'ko', label: '한국어' }, { code: 'zh', label: '中文' }
  ];

  return (
    <div className="h-full overflow-y-auto custom-scrollbar no-drag p-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="max-w-5xl mx-auto space-y-12 pb-24">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-accent-primary/10 rounded-2xl text-accent-primary shadow-[0_0_20px_rgba(59,130,246,0.15)]">
              <Settings size={32} />
            </div>
            <div>
              <h2 className="text-4xl font-black text-white tracking-tight italic uppercase">{t('settings')}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Configuration Oracle</span>
                <span className="w-1 h-1 bg-gray-700 rounded-full" />
                <span className="text-[10px] text-accent-primary font-black uppercase">v2.1.0</span>
              </div>
            </div>
          </div>
          <button 
             onClick={() => setIsEditingLayout(true)}
             className="px-6 py-2.5 bg-accent-primary text-black font-black uppercase text-[10px] tracking-[0.15em] rounded-xl hover:bg-white active:scale-95 transition-all shadow-xl shadow-accent-primary/10"
           >
             {t('start_editor')}
           </button>
        </div>

        {/* Section: Experience App */}
        <SettingsSection title="Expérience App" icon={LayoutGrid}>
          <SettingCard 
            icon={Sun} color="purple"
            title={t('visualStyle')} desc={t('chooseStyleDesc')}
            action={
              <div className="flex gap-1 p-1 bg-black/40 rounded-xl border border-white/5">
                {['glass', 'opaque'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setVisualMode(mode)}
                    className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all", visualMode === mode ? "bg-accent-primary text-black" : "text-gray-500 hover:text-white")}
                  >
                    {t(mode)}
                  </button>
                ))}
              </div>
            }
          />
          <SettingCard 
            icon={Moon} color="blue"
            title={t('colorTheme')} desc={t('themeToggleDesc')}
            action={
              <button
                onClick={() => setTheme(curr => curr === 'dark' ? 'light' : 'dark')}
                className="px-5 py-2 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 text-[10px] font-black uppercase text-white transition-all"
              >
                {theme === 'dark' ? t('theme_dark') : t('theme_light')}
              </button>
            }
          />
          <SettingCard 
            icon={Globe} color="green"
            title={t('language')} desc={t('langSelectDesc')}
            action={
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="bg-[#0a0a0c] border border-white/10 rounded-xl px-3 py-2 text-[10px] font-black uppercase outline-none focus:border-accent-primary text-white cursor-pointer"
              >
                {languages.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-[#0a0a0c]">{lang.label}</option>
                ))}
              </select>
            }
          />
          <SettingCard 
            icon={Power} color="red"
            title={t('startup')} desc={t('startupDesc')}
            action={
              <SettingsToggle 
                active={launchOnStartup} 
                onToggle={async () => {
                  const newState = !launchOnStartup;
                  const actualState = await ipcRenderer.invoke('app:set-auto-launch', newState);
                  setLaunchOnStartup(actualState);
                }}
              />
            }
          />
        </SettingsSection>

        {/* Section: Automatisation In-Game */}
        <SettingsSection title="Overlays & Automatisation" icon={Sword}>
          <SettingCard 
            icon={Sword} color="orange"
            title={t('auto_accept')} desc={t('auto_accept_desc')}
            action={<SettingsToggle active={autoAccept} onToggle={() => setAutoAccept(!autoAccept)} />}
          />
          <SettingCard 
            icon={Sparkles} color="blue"
            title={t('auto_import')} desc={t('auto_import_desc')}
            action={<SettingsToggle active={autoImportRunes} onToggle={() => setAutoImportRunes(!autoImportRunes)} />}
          />
          <SettingCard 
            icon={Zap} color="yellow"
            title={t('flash_position')} desc={t('flash_position')}
            action={
              <div className="flex gap-1 p-1 bg-black/40 rounded-xl border border-white/5">
                {['D', 'F'].map(pos => (
                  <button
                    key={pos}
                    onClick={() => setFlashPosition(pos)}
                    className={cn("w-10 h-8 rounded-lg text-[10px] font-black uppercase transition-all", flashPosition === pos ? "bg-accent-primary text-black" : "text-gray-500 hover:text-white")}
                  >
                    {pos}
                  </button>
                ))}
              </div>
            }
          />
          <SettingCard 
            icon={Activity} color="green"
            title={t('winrate_toggle')} desc={t('winrate_desc')}
            action={<SettingsToggle active={overlaySettings.winRateToggle} onToggle={() => setOverlaySettings(p => ({ ...p, winRateToggle: !p.winRateToggle }))} />}
          />
        </SettingsSection>

        {/* Section: Overlays Spécifiques */}
        <SettingsSection title="Modules Tactiques" icon={Layers}>
          <SettingCard 
            icon={Brain} color="blue"
            title={t('skill_levelup')} desc={t('skill_desc')}
            action={<SettingsToggle active={overlaySettings.skillLevelUp} onToggle={() => setOverlaySettings(p => ({ ...p, skillLevelUp: !p.skillLevelUp }))} />}
          />
          <SettingCard 
            icon={Clock} color="orange"
            title={t('jungle_timers')} desc={t('jungle_desc')}
            action={<SettingsToggle active={overlaySettings.jungleTimers} onToggle={() => setOverlaySettings(p => ({ ...p, jungleTimers: !p.jungleTimers }))} />}
          />
          <SettingCard 
            icon={Swords} color="yellow"
            title={t('gold_diff')} desc={t('gold_desc')}
            action={<SettingsToggle active={overlaySettings.goldDiff} onToggle={() => setOverlaySettings(p => ({ ...p, goldDiff: !p.goldDiff }))} />}
          />
          <SettingCard 
            icon={Search} color="blue"
            title={t('ward_timer')} desc={t('ward_timer_desc')}
            action={<SettingsToggle active={overlaySettings.wardTimer} onToggle={() => setOverlaySettings(p => ({ ...p, wardTimer: !p.wardTimer }))} />}
          />
          <SettingCard 
            icon={Target} color="red"
            title={t('jungle_pathing')} desc={t('jungle_pathing_desc')}
            action={<SettingsToggle active={overlaySettings.junglePathing} onToggle={() => setOverlaySettings(p => ({ ...p, junglePathing: !p.junglePathing }))} />}
          />
          <SettingCard 
            icon={Bell} color="orange"
            title={t('gold_sound_label')} desc={t('gold_sound_desc')}
            action={<SettingsToggle active={overlaySettings.goldSound} onToggle={() => setOverlaySettings(p => ({ ...p, goldSound: !p.goldSound }))} />}
          />
          <SettingCard 
            icon={Sparkles} color="indigo"
            title={t('test_mode_label')} desc={t('test_mode_desc')}
            action={<SettingsToggle active={overlaySettings.testMode} onToggle={() => setOverlaySettings(p => ({ ...p, testMode: !p.testMode }))} />}
          />
        </SettingsSection>
      </div>

      <div className="max-w-5xl mx-auto pt-8 border-t border-white/5 flex justify-end">
        <button
          onClick={() => {
            if (window.confirm(t('confirm_reset'))) {
              setOverlaySettings(p => ({
                ...p,
                positions: {
                  winrate: { x: 40, y: 5 },
                  jungle: { x: 2, y: 40 },
                  skills: { x: 40, y: 85 },
                  gold: { x: 75, y: 10 },
                  notifications: { x: 80, y: 70 }
                }
              }));
            }
          }}
          className="text-[10px] font-black text-gray-500 uppercase tracking-widest hover:text-red-400 transition-colors"
        >
          {t('reset_default')}
        </button>
      </div>

      {isEditingLayout && (
        <OverlayLayoutEditor
          t={t}
          overlaySettings={overlaySettings}
          setOverlaySettings={setOverlaySettings}
          onClose={() => setIsEditingLayout(false)}
        />
      )}
    </div>
  );
}

`;
    content = content.substring(0, headerIndex) + newFunctionCode + content.substring(footerIndex);
    fs.writeFileSync(path, content, 'utf8');
    console.log("SUCCESS: SettingsView cleaned up.");
} else {
    console.log("ERROR: Could not find markers.", { headerIndex, footerIndex });
}
