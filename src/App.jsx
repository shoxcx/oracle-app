import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';

const CHAMP_ID_TO_NAME = {
  1: "Annie", 2: "Olaf", 3: "Galio", 4: "TwistedFate", 5: "XinZhao", 6: "Urgot", 7: "LeBlanc", 8: "Vladimir", 9: "Fiddlesticks", 10: "Kayle",
  11: "MasterYi", 12: "Alistar", 13: "Ryze", 14: "Sion", 15: "Sivir", 16: "Soraka", 17: "Teemo", 18: "Tristana", 19: "Warwick", 20: "Nunu",
  21: "MissFortune", 22: "Ashe", 23: "Tryndamere", 24: "Jax", 25: "Morgana", 26: "Zilean", 27: "Singed", 28: "Evelynn", 29: "Twitch", 30: "Karthus",
  31: "ChoGath", 32: "Amumu", 33: "Rammus", 34: "Anivia", 35: "Shaco", 36: "DrMundo", 37: "Sona", 38: "Kassadin", 39: "Irelia", 40: "Janna",
  41: "Gangplank", 42: "Corki", 43: "Karma", 44: "Taric", 45: "Veigar", 48: "Trundle", 50: "Swain", 51: "Caitlyn", 53: "Blitzcrank", 54: "Malphite",
  55: "Katarina", 56: "Nocturne", 57: "Maokai", 58: "Renekton", 59: "JarvanIV", 60: "Elise", 61: "Orianna", 62: "Wukong", 63: "Brand", 64: "LeeSin",
  67: "Vayne", 68: "Rumble", 69: "Cassiopeia", 72: "Skarner", 74: "Heimerdinger", 75: "Nasus", 76: "Nidalee", 77: "Udyr", 78: "Poppy", 79: "Gragas",
  80: "Pantheon", 81: "Ezreal", 82: "Mordekaiser", 83: "Yorick", 84: "Akali", 85: "Kennen", 86: "Garen", 89: "Leona", 90: "Malzahar", 91: "Talon",
  92: "Riven", 96: "KogMaw", 98: "Shen", 99: "Lux", 101: "Xerath", 102: "Shyvana", 103: "Ahri", 104: "Graves", 105: "Fizz", 106: "Volibear",
  107: "Rengar", 110: "Varus", 111: "Nautilus", 112: "Viktor", 113: "Sejuani", 114: "Fiora", 115: "Ziggs", 117: "Lulu", 119: "Draven", 120: "Hecarim",
  121: "Khazix", 122: "Darius", 126: "Jayce", 127: "Lissandra", 131: "Diana", 133: "Quinn", 134: "Syndra", 136: "AurelionSol", 141: "Kayn", 142: "Zoe",
  143: "Zyra", 145: "Kaisa", 147: "Seraphine", 150: "Gnar", 154: "Zac", 157: "Yasuo", 161: "Velkoz", 163: "Taliyah", 164: "Camille", 166: "Akshan",
  200: "Belveth", 201: "Braum", 202: "Jhin", 203: "Kindred", 221: "Zeri", 222: "Jinx", 223: "TahmKench", 234: "Viego", 235: "Senna", 236: "Lucian",
  238: "Zed", 240: "Kled", 245: "Ekko", 246: "Qiyana", 254: "Vi", 266: "Aatrox", 267: "Nami", 268: "Azir", 350: "Yuumi", 360: "Samira",
  412: "Thresh", 420: "Illaoi", 421: "RekSai", 427: "Ivern", 429: "Kalista", 432: "Bard", 497: "Rakan", 498: "Xayah", 516: "Ornn", 517: "Sylas",
  518: "Neeko", 523: "Aphelios", 526: "Rell", 555: "Pyke", 711: "Vex", 777: "Yone", 875: "Sett", 876: "Lillia", 887: "Gwen", 888: "Renata",
  895: "Nilah", 897: "Ksante", 902: "Milio", 950: "Naafiri", 910: "Hwei", 233: "Briar", 901: "Smolder", 893: "Aurora", 799: "Ambessa", 800: "Mel"
};

import {
  LayoutDashboard,
  Sword,
  Users,
  Brain,
  Settings,
  Moon,
  Sun,
  Search,
  Activity,
  RefreshCw,
  Gamepad2,
  MessageSquare,
  Send,
  UserCircle2,
  Circle,
  Trophy,
  MonitorPlay,
  Globe,
  Power,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Music,
  Scissors,
  Swords,
  Swords as SwordsIcon,
  LayoutGrid,
  Layers,
  ArrowRight,
  ArrowLeft,
  Ghost,
  Target,
  Clock,
  ScanEye,
  Maximize2,
  Sparkles,
  X,
  Bell,
  ExternalLink,
  ArrowDown,
  Wrench,
  Flag,
  ChevronDown,
  Minus,
  Square,
  Check,
  ChevronLeft,
  ChevronRight,
  Eye,
  Crosshair,
  List,
  HelpCircle,
  Zap,
  Shield,
  Key,
  AlertTriangle,
  Asterisk,
  Youtube,
  Video,
  Quote,
  CheckCircle2,
  XCircle,
  Lightbulb,
  Newspaper,
  History,
  Star,
  ShieldAlert,
  XOctagon,
  CheckSquare,
  MoreVertical,
  LogOut,
  UserPlus,
  Map,
  Route,
  Palette
} from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const HeaderTimer = ({ gameTime }) => {
  const [time, setTime] = useState(gameTime || 0);
  useEffect(() => { setTime(gameTime || 0); }, [gameTime]);
  useEffect(() => {
    const i = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(i);
  }, []);
  const m = Math.floor(time / 60);
  const s = Math.floor(time % 60);
  return <span className="text-gray-500 font-mono ml-2 opacity-80">- {m}:{s.toString().padStart(2, '0')}</span>;
};
import oracleLogo from './assets/oracle_logo.png';
import { MatchDetailsModal } from './MatchDetailsModal';
import { LiveGameRow } from './LiveGameRow';
import { ClientDisconnectedView } from './ClientDisconnectedView';
import { InGameHelper } from './components/InGameHelper';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

function getItemIconFromName(name) {
  if (!name) return null;
  if (!isNaN(name)) return name.toString();
  const items = {
    "Blade of the Ruined King": "3153",
    "Thornmail": "3075",
    "Plated Steelcaps": "3047",
    "Sunfire Aegis": "3068",
    "Frozen Heart": "3110",
    "Randuin's Omen": "3143",
    "Trinity Force": "3078",
    "Black Cleaver": "3071",
    "Death's Dance": "6333",
    "Sterak's Gage": "3053",
    "Guardian Angel": "3026",
    "Eclipse": "6692",
    "Sunderer Sky": "6610",
    "Titanic Hydra": "3074",
    "Ravenous Hydra": "3070",
    "Stridebreaker": "6631",
    "Goredrinker": "6630",
    "Jak'Sho": "6665",
    "Heartsteel": "6667",
    "Rod of Ages": "3027",
    "Liandry's Torment": "3151",
    "Luden's Companion": "3285",
    "Malignance": "6655",
    "Archangel's Staff": "3003",
    "Zhonya's Hourglass": "3157",
    "Rabadon's Deathcap": "3089",
    "Void Staff": "3135",
    "Shadowflame": "4645",
    "Stormsurge": "6657",
    "Bork": "3153",
    "Nashor's Tooth": "3115",
    "Rylai's Crystal Scepter": "3116",
    "Cosmic Drive": "4629",
    "Banshee's Veil": "3102",
    "Morellonomicon": "3165",
    "Guinsoo's Rageblade": "3124",
    "Kraken Slayer": "6672",
    "Statikk Shiv": "3087",
    "Terminus": "3302",
    "Wit's End": "3091",
    "Infinity Edge": "3031",
    "Rapid Firecannon": "3094",
    "Phantom Dancer": "3046",
    "Lord Dominik's Regards": "3036",
    "Mortal Reminder": "3033",
    "Bloodthirster": "3072",
    "The Collector": "6676",
    "Navori Flickerblade": "3156",
    "Hurricane": "3085",
  };
  return items[name] || "3153";
}

// Polyfill for ipcRenderer if using nodeIntegration: true
if (!window.ipcRenderer) {
  if (typeof window.require === 'function') {
    try {
      const { ipcRenderer } = window.require('electron');
      window.ipcRenderer = ipcRenderer;
    } catch (e) {
      console.error("Electron require failed", e);
    }
  } else {
    console.warn("window.require is not a function. IPC will not work.");
  }
}


// --- Localization Dictionary ---
const translations = {
  en: {
    // Categories
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    // Items
    dashboard: "Dashboard", tierlist: "Builds & Tips", leaderboards: "Leaderboards",
    overlays: "Overlays", collections: "Collections",
    esports: "Esports", datastudio: "Data Studio", matchups: "Matchups",
    settings: "Settings", profile: "Profile", watch: "Watch Live",
    // Window
    minimize: "Minimize", close: "Close",
    // Stats
    kda: "KDA", dpmScore: "Oracle Score", kp: "KP", csm: "CSM", vision: "Vision Score", gpm: "GPM",
    // Status
    connected: "Online", disconnected: "Offline",
    // UI
    searchPlaceholder: "Search summoner...", visualStyle: "Visual Style", colorTheme: "Color Theme",
    language: "Language", startup: "Launch on Startup", glass: "Glass", opaque: "Opaque",
    themeToggle: "Toggle Light/Dark", chooseStyle: "Visual Appearance",
    chooseLang: "Select Language", startupDesc: "Auto-launch behavior",
    auto_accept: "Auto Accept", auto_accept_desc: "Automatically accept matches when they are found.",
    auto_import: "Auto Import Runes", auto_import_desc: "Automatically import the best runes for your champion.",
    flash_position: "Flash Position", flash_left: "Left (D)", flash_right: "Right (F)",
    reset_layout: "Reset to Default",
    loading_screen: "Loading Screen Overlay", loading_desc: "Show player stats while loading",
    winrate_toggle: "Win% Overlay (CTRL+X)", winrate_desc: "Estimated win percentage",
    jungle_pathing: "Jungle Pathing", jungle_pathing_desc: "Best clear routes and timers",
    ward_timer: "Ward Reminder", ward_timer_desc: "Alert when to swap/place wards",
    metaTierList: "Meta Tier List", proReplays: "Pro Replays", waitingMatch: "Waiting for Match",
    clientDisconnected: "Client Disconnected", liveMatch: "LIVE MATCH",
    rank: "Rank", champion: "Champion", role: "Role", winrate: "Winrate", ban: "Ban Rate", tier: "Tier",
    explore_oracle: "Explore ORACLE App", season: "Season 15", owned_skins: "Owned Skins",
    survivability: "Survivability", tf_deaths: "Teamfights deaths", performance: "Performance per champion",
    all: "ALL", mvp: "MVP", score: "score", deaths: "Deaths", ka: "Kills + Assists",
    replay: "REPLAY", victory: "Victory", defeat: "Defeat", theme_dark: "Dark", theme_light: "Light",
    build_starting: "Starting Items", build_core: "Core Build", build_fourth: "4th Item",
    build_fifth: "5th Item", build_sixth: "6th Item",
    visual_glass: "Glass", visual_opaque: "Opaque", records: "Records", lens: "Lens", behavioral: "Behavioral",
    pings: "Pings", solo_duo: "Solo/Duo", flex: "Flex", aram: "ARAM", coming_soon: "Coming soon...",
    estimated_solo: "ESTIMATED (SOLO, 20 GAMES)", estimated_flex: "ESTIMATED (FLEX, 20 GAMES)",
    appearance: "Appearance", chooseStyleDesc: "Choose between Liquid Glass or Solid",
    themeToggleDesc: "Change the application color appearance",
    theme_classic: "Classic", theme_purple: "Purple", theme_storm: "Storm", theme_radiant: "Radiant",
    langSelectDesc: "Select your preferred language",
    gold_sound_label: "Gold Alert (1200g)",
    gold_sound_desc: "Plays a sound when you reach 1200 gold",
    test_mode_label: "Overlay Test Mode",
    test_mode_desc: "Show all overlays for testing",
    edit_layout_desc: "Adjust the position of each module on your screen.",
    layout_editor_title: "Oracle Layout Editor",
    layout_editor_desc: "Drag modules to reposition them",
    game_space: "Game Space",
    cancel: "Cancel",
    confirm_reset: "Reset overlay positions?",
    reset_default: "Reset to default positions",
    skill_advice: "Advice: Upgrade",
    gold_alert: "Gold Alert",
    gold_deficit_massive: "Massive deficit:",
    gold_advantage_massive: "Massive advantage:",
    compare_and_win: "Compare stats and get pro strategic advice",
    gameplay_conseils: "Mastery Tactics",
    recommended_build: "Essential Build",
    matchup_video: "Matchup Replay",
    high_elo_pov: "High Elo POV",
    matchup_no_data: "No specific matchup data available. Play focusing on your champion fundamentals.",
    winrate_label: "Win Rate",
    vs_comparison: "Vs Comparison",
    danger_level: "Risk Level",
    ward_advice: "Oracle suggests a ward now.",
    blue_team: "Blue Team",
    red_team: "Red Team",
    jungle_insight: "Jungle Insight",
    logic_pathing: "Logic Pathing",
    next_camp: "Next:",
    connectLcu: "Connecting to League Client...", vs1w: "vs 1w ago",
    // Game Modes & Status
    queue_custom: "Custom", queue_draft: "Draft Pick", queue_solo: "Ranked Solo", queue_flex: "Ranked Flex",
    queue_blind: "Blind Pick", queue_aram: "ARAM", queue_arena: "Arena", queue_urf: "URF", queue_coop: "Co-op vs AI",
    queue_normal: "Normal", queue_unknown: "Unknown", ingame: "In Game", playing: "Playing", spectate_btn: "Spectate",
    // New Additions - ALL VIEWS
    waiting_for_match: "Waiting for Match...", enter_game_live: "Please enter a game to see live stats.", toggle_hint: "[CTRL+X] TO TOGGLE",
    team_blue: "Order (Blue)", team_red: "Chaos (Red)", you: "YOU", hot_streak: "HOT STREAK",
    matchup_analysis: "Matchup Analysis", strategic_insight: "Strategic Insight", counter_items: "Recommended Counter Items",
    esports_center: "Esports Center", switch_source: "Switch Source", upcoming_matches: "Upcoming Matches", latest_news: "Latest News",
    collections_title: "Collections", rankings_title: "Rankings", overlay_settings: "Overlay Settings",
    ingame_modules: "In-Game Modules", launch_custom: "Launch a Custom Game to configure overlay positions.", start_editor: "Start Overlay Editor",
    select_champion: "Select Champion", search_champion: "Search...",
    rank_header: "Rank", lp_header: "LP", winrate_header: "Winrate", games_header: "Games", summoner_header: "Summoner",
    no_games_found: "No games found", search_summoner_profile: "Search for summoner profile", search_result: "Search",
    most_kills: "Most Kills", dmg_dealt: "dmg dealt", vision_score: "Vision Score", cs_min: "CS / min", season_best: "SEASON BEST",
    aggression: "Aggression", farming: "Farming", vision_radar: "Vision", survival: "Survival", objective: "Objective",
    playstyle: "Playstyle", focus: "Focus", aggressive_carry: "Aggressive Carry", die_less: "Die Less",
    skill_levelup: "Skill Level-up Guide", jungle_timers: "Jungle Timers", objective_voting: "Objective Voting", gold_diff: "Gold Differential",
    skill_desc: "Shows skill order on HUD", jungle_desc: "Mini-map overlay for camps", voting_desc: "Team vote tracker", gold_desc: "Estimated gold info",
    last_20_games: "Last 20 Games", summoner_not_found: "Summoner Not Found",
    strategic_desc_mock: "Irelia has a significant advantage at level 2. Look for early trades. Avoid fighting Darius when his E is up. Build Blade of the Ruined King first.",
    search_hint: "Search Name#Tag",
    region: "Region",
    online: "Online", offline: "Offline",
    // Build View
    build_runes_season: "Build, Runes Season", patch: "Patch", recommended_plus: "P+ Recommended",
    summoner_spells: "Summoner Spells", skill_order: "Skill Order",
    max_1st: "Max 1st", max_2nd: "Max 2nd", max_3rd: "Max 3rd",
    boots_options: "Boots Options", starters: "Starters", core_build_path: "Core Build Path",
    matchups_analysis: "Matchups Analysis", strong_against: "Strong Against", weak_against: "Weak Against",
    rune_path: "Rune Path", launch: "Launch", winrate_trend: "Winrate Trend (30 Days)",
    // Matchup View
    matchup_analysis_title: "Matchup Analysis",
    lane_kill_rate: "Lane Kill Rate", gold_15: "Gold @ 15 min", early_wr: "Early Winrate", late_wr: "Late Game WR", first_tower: "First Tower",
    analysis_direct: "Direct Analysis", duel_vs: "Duel vs", guide_matchup: "Matchup Guide", rival: "RIVAL",
    searching: "Searching...", sync_data: "Syncing...", coach_verdict: "Coach Verdict", view_tips: "View Tips", back_btn: "Back", matchup_tips_title: "Matchup Tips",
    title_to_do: "OFFENSIVE STRATEGY", title_to_avoid: "KEY THREATS",
    risk_low: "LOW", risk_medium: "MEDIUM", risk_critical: "CRITICAL",
    risk_desc_low: "You have the statistical edge. Look for aggressive trades.",
    risk_desc_medium: "Skill-based matchup. Focus on mechanics.",
    risk_desc_critical: "High pressure matchup. Avoid trades when their spells are up.",
    // Esports View

    profile_not_found: "Profile Not Found", summoner_not_found_desc: "Player not found or does not exist in this region.",
    recent_matches: "Recent Matches", no_match_found: "No match found...", phase_label: "Phase",
    no_partners: "No recent players found", games_played: "Games played", top_champions: "Top Champions", recent_players: "Recent Players",
    loading_replays: "Loading replays...", and_ai_coaching: "& AI Coaching", replays_desc: "Watch your games and receive personalized AI coaching.",
    games_found: "Games found", watchable: "Watchable", ai_analyzer_title: "Oracle AI Analyzer",
    ai_analyzer_desc: "Select a game on the left to generate a full coaching report and identify your mistakes.",
    analyzing_caps: "ANALYZING...", close_duel: "Close Duel", analyze_duel: "Analyze Duel", opponent: "Opponent",
    sync_data_opp: "Syncing opponent data...", key_tips: "Key Tips", analysis_timeline: "Analysis Timeline", events: "EVENTS",
    tactical_analysis: "Tactical analysis...", watch_replay: "Watch Replay",
    stat_obj_focus: "Objective Focus", stat_mechanics: "Mechanics", stat_kda_perf: "KDA Perf", stat_farming: "Farming",
    matchup_desc_example: "has a significant advantage at level 2. Look for early trades.",
    // Enhanced English Tips
    tip_deaths_1: "You are dying too often. Analyze your replays to spot over-extensions. Each death gives gold, XP, and a numbers advantage to the enemy team.",
    tip_deaths_2: "Critical mortality rate. Force yourself to play further back when you lack vision of the enemy jungler. Survival must be your #1 priority.",
    tip_deaths_3: "You are bleeding resources. Take fewer unnecessary risks, especially right before a major neutral objective spawns.",
    tip_csm_1: "Farming deficit (CS/min). Your farm is your most reliable income. Don't ARAM mid forever; go catch waves on the side lanes.",
    tip_csm_2: "Very low CS count. Make a habit of taking jungle camps or minion waves between rotations. Items depend on leaving no gold on the map.",
    tip_csm_3: "Economic bleed via minions. You're losing too many minions under tower or during roams. Work on your laning phase last-hitting.",
    tip_vision_1: "Your vision score is alarming. Buy 1 or 2 Control Wards on every base trip and place them to protect your flanks.",
    tip_vision_2: "Total map blindness. Stop face-checking without vision and help your team push up by placing wards in the enemy jungle.",
    tip_vision_3: "Extremely poor vision. Remember to swap your trinket (Sweeper/Farsight) depending on your role and use it faithfully.",
    tip_obj_1: "Zero pressure on turrets and epic monsters. Kills alone don't win the game. Help take Herald/Dragon after winning a teamfight.",
    tip_obj_2: "No participation in destroying objectives. You need to push the wave to choke out the map, not just chase kills.",
    tip_obj_3: "Negligible objective impact. If you have lane control, use it to get tower plating or invade the enemy jungle.",
    tip_win_1: "Solid victory. Try to close out games even faster next time by forcing the Baron Nashor confidently.",
    tip_win_2: "Excellent lead management. You capitalized on enemy mistakes brilliantly.",
    tip_win_3: "Great execution. Keep pushing your macro advantage after the laning phase to suffocate your opponents.",
    tip_loss_1: "Tough loss. Take a 5-minute break to reset, hydrate, and review the pivotal moments where the game flipped.",
    tip_loss_2: "Lack of team cohesion. In defeats, systematically look for what YOU could have done better, and ignore your teammates' mistakes.",
    tip_loss_3: "Poor mid/late game coordination. Identify your draft's weaknesses and play more cautiously next game.",
    // AI Tips - Generic Fallbacks for Dynamic Text
    tip_deaths_title: "Excessive Deaths", tip_deaths_desc: "High mortality rate detected. You are giving too many resources to the enemy.",
    tip_survival_title: "Perfect Survival", tip_survival_desc: "No deaths conceded. Your defensive positioning was flawless.",
    tip_csm_title: "Farming Deficit", tip_csm_desc: "Your CS/min is critical. Prioritize waves before fighting.",
    tip_multikill_title: "Multi-Kill", tip_multikill_desc: "Great teamfight management!",
    tip_vision_elite_title: "Elite Vision", tip_vision_elite_desc: "Vision score above average. Great map control.",
    tip_vision_poor_title: "Map Blindness", tip_vision_poor_desc: "Very low vision score. Buy Control Wards.",
    tip_firstblood_title: "First Blood", tip_firstblood_desc: "Excellent Early Lead.",
    tip_objective_title: "Objective Focus", tip_objective_desc: "High pressure on Towers/Dragons.",
    tip_cc_title: "Crowd Control Master", tip_cc_desc: "Excellent use of CC.",
    tip_gold_title: "Economic Lead", tip_gold_desc: "Massive gold generation.",
    tip_tank_title: "Absolute Resilience", tip_tank_desc: "Huge damage mitigation.",
    tip_jungle_title: "Jungle Pace", tip_jungle_desc: "Camp clearing is too slow.",
    tip_default_title: "Gold Optimization", tip_default_desc: "Focus on minion waves.",
    // Behavioral
    behavioral_analysis: "Behavioral Analysis",
    beh_consistency: "Consistency", beh_consistency_sub: "Performance Stability",
    beh_tilt: "Tilt Resilience", beh_tilt_sub: "Win rate after loss",
    beh_farming: "Farming", beh_farming_sub: "CS Per Minute",
    beh_activity: "Team Activity", beh_activity_sub: "Kill Participation",
    beh_survival: "Survival", beh_survival_sub: "Death Avoidance",
    beh_aggression: "Aggression", beh_aggression_sub: "Impact / Min",
    // Lens
    playstyle_berserker: "Berserker", playstyle_kda_player: "KDA Player", playstyle_supportive: "Supportive Soul",
    playstyle_resource_hoard: "Resource Hoarder", playstyle_obj_melter: "Objective Melter", playstyle_map_architect: "Map Architect",
    playstyle_facechecker: "Facechecker", playstyle_complete_carry: "Complete Carry", playstyle_aggressive: "Aggressive Carry",
    playstyle_passive: "Passive Player", playstyle_tactical: "Tactical Specialist",
    focus_farm: "Fix Farming", focus_vision: "Buy Wards", focus_positioning: "Positioning", focus_group: "Group Up",
    focus_towers: "Hit Towers", focus_survival: "Survival First", focus_expand: "Expand Lead",
    focus_macro: "Improve Macro", focus_teamfights: "Teamfight Presence", focus_consistency: "Be Consistent", focus_pressure: "Apply Pressure", focus_roaming: "More Roaming",
    // Coach Verdicts
    verdict_pivot: "Oracle : Strategic Pivot. You were the indisputable engine of your team. Your massive kill participation defined the entire tempo of this match. By being everywhere and turning local skirmishes into global advantages, you single-handedly drove this victory.",
    verdict_soul: "Oracle : Soul Reaper. Total economic domination. You didn't just win your lane; you systematically bankrupted your direct opponent. By aggressively denying minions and XP, you turned this match into a 5v4.",
    verdict_fatal: "Oracle : Fatal Efficiency. Surgical precision. You maximized the value of every single gold coin spent. Your damage output relative to your economy was completely off the charts. You proved that you don't need a full inventory to be entirely lethal.",
    verdict_pillar: "Oracle : Victory Pillar. The Bedrock. You were the reliable foundation your team desperately needed. While you may not have topped the damage charts, your constant presence during key rotational moments and solid macro play silently secured the win.",
    verdict_vuln: "Oracle : Liability. You spent considerably more time staring at a grey screen than impacting the Rift. Your uncalculated risks and positioning errors spoon-fed the enemy free gold and tempo. You must learn to stop forcing aggressive plays when playing from behind.",
    verdict_eco: "Oracle : Economic Asphyxia. You fell drastically behind on the most fundamental aspect of the game: farming. Fighting while suffering a severe item disadvantage is a guaranteed losing strategy. You need to prioritize catching side waves before contesting neutral territory.",
    verdict_leader: "Oracle : Lone Wolf. You performed well individually, but completely failed to translate your personal lead into tangible team advantages. A high KDA ratio does not destroy the enemy Nexus. You needed to use your inherent strength to cover your struggling allies.",
    verdict_defeat: "Oracle : Macro Collapse. Mechanically decent, but you entirely forfeited the map. You allowed the enemy to comfortably dictate rotations and objective control without trading anywhere else. Review your mid-game decision making urgently.",
    verdict_intro: "Oracle :",
    // New Verdicts
    verdict_perfect_kda: "Oracle : Immortal Performance. Flawless execution. You never once gave the enemy the satisfaction of a shutdown. Your impeccable backline positioning combined with calculated aggression allowed you to deal devastating damage without ever being caught out.",
    verdict_penta: "Oracle : Apex Predator. A Pentakill is never purely luck; it is a manifestation of total dominance. You read the chaotic teamfight perfectly and executed every single target with lethal precision. You undeniably carried.",
    verdict_visionary: "Oracle : All-Seeing Eye. Your vision control was absolutely suffocating. By relentlessly tracking the enemy jungler and illuminating the darkest corners of the map, you effectively removed their capacity to proactively make plays.",
    verdict_carry_hard: "Oracle : 1v9 Machine. You actively participated in over 75% of your team's total kills. If you had not been present, this game would have concluded at the 15-minute mark. Deliveries don't get much heavier than this backpack performance.",
    verdict_stomp: "Oracle : Total Destruction. You concluded the game with a mountain of excess gold. This wasn't a competitive match, it was a clinic. You commanded the snowball so aggressively that the enemy team never had a whisper of a chance.",
    verdict_efficient: "Oracle : Economic Miracle. You inflicted highly disproportionate damage despite functioning on a limited budget. You didn't rely on raw item stats to outplay your opponents; you utilized pure, unadulterated mechanical skill.",
    verdict_feeder: "Oracle : Sustained Hemorrhage. Accumulating double-digit deaths actively sabotages your entire team's effort. You became nothing more than a walking gold bag for the enemy carry. You must learn the discipline of playing 'weakside' and conceding farm.",
    verdict_blind: "Oracle : Playing in the Dark. Your vision score was statistically non-existent. You repeatedly facechecked dangerous brush and paid the price because you refused to invest in Control Wards. Stop treating map awareness as an optional luxury.",
    verdict_afk_farm: "Oracle : PvE Specialist. Your farming metrics are high, but your concrete impact was zero. While you were busy optimizing your jungle routing, your team was losing the actual game. League of Legends is PvP; you need to join the fights.",
    verdict_solid_effort: "Oracle : Tragic Hero. A tough pill to swallow. You did virtually everything correctly—winning your lane and maintaining pristine stats—but you couldn't carry the dead weight of your teammates. Don't tilt; consistency like this guarantees climbing in the long run.",
    verdict_rich_loser: "Oracle : Shopkeeper's Best Friend. You achieved a full build but still suffered defeat. Gold is utterly useless if you get caught out of position right before the Elder Dragon spawns. Late game, proper positioning is infinitely more valuable than your items.",
    verdict_unlucky_carry: "Oracle : Team Gap. You assumed the mantle of leadership and dealt the most damage, but the sheer skill disparity between the remaining team members was too vast to overcome. Keep your mental fortitude intact; you played this match extremely well.",
    // Analysis Points
    pos_kda_1: "Incredible KDA ratio - you dominated teamfights completely.",
    pos_kda_2: "Excellent survivability combined with high kill participation.",
    pos_kda_3: "You severely punished the enemy without giving up shutdown gold.",
    pos_multikill_1: "Devastating multikills. You were a nightmare to face in grouped combat.",
    pos_multikill_2: "Clutch multikills that likely swung the game in your favor.",
    pos_multikill_3: "Serial killer. Your mechanical execution in teamfights was flawless.",
    pos_kp_1: "Omnipresent map awareness. Massive kill participation.",
    pos_kp_2: "You were the catalyst for almost every team play.",
    pos_kp_3: "High kill participation means high impact. You roamed effectively.",
    pos_farm_1: "Relentless farming resulting in an insurmountable gold lead.",
    pos_farm_2: "Imperial last-hitting. Your CS numbers single-handedly won you trades.",
    pos_farm_3: "Perfect wave management yielded a massive CS advantage.",
    pos_gold_1: "You financially ruined your direct opponent.",
    pos_gold_2: "Massive gold difference generated purely through lane dominance.",
    pos_gold_3: "Economic supremacy. You put your opponent in the dirt.",
    pos_obj_1: "Incredible objective focus. You prioritize winning the game over chasing.",
    pos_obj_2: "High damage to structures. You understand how to close out games.",
    pos_obj_3: "Objective Melter. You translated your strength into map control.",
    pos_vision_1: "Supreme map illumination. You denied the enemy any element of surprise.",
    pos_vision_2: "Excellent vision control that effectively un-fogged the map.",
    pos_vision_3: "Your warding completely suffocated the enemy jungler's routing.",
    pos_carry_1: "Absolute carry performance. You dealt a vast majority of the team's damage.",
    pos_carry_2: "You were the primary engine of your team's DPS.",
    pos_carry_3: "Heavy lifting. You backpacked the team fight damage perfectly.",

    neg_deaths_1: "Excessive deaths fed massive amounts of gold to the enemy carries.",
    neg_deaths_2: "You spent too much time dead. Playing safe is sometimes the best play.",
    neg_deaths_3: "Reckless positioning lead to too many free deaths.",
    neg_kp_1: "You played too isolated. Low kill participation lost you tempo.",
    neg_kp_2: "AFK side-laning while your team bled out in group combat.",
    neg_kp_3: "Ghost-like presence. You barely participated in the game's outcome.",
    neg_farm_1: "Extremely poor last-hitting. You fought too much and farmed too little.",
    neg_farm_2: "You abandoned minion waves resulting in a massive item deficit.",
    neg_farm_3: "CS/min is the most fundamental mechanic. Yours was severely lacking here.",
    neg_gold_1: "Your opponent completely crushed you economically in lane.",
    neg_gold_2: "You were effectively removed from the game due to your gold deficit.",
    neg_gold_3: "Massive gold gap. You were forced to play defensively the entire match.",
    neg_obj_1: "Zero pressure on turrets or epic monsters. You played for KDA.",
    neg_obj_2: "Objectives win games. You completely ignored them.",
    neg_obj_3: "Terrible objective conversion. Kills mean nothing if you don't hit towers.",
    neg_vision_1: "You played in absolute darkness. Refusal to buy wards costs games.",
    neg_vision_2: "No vision control whatsoever. You invited enemy ganks freely.",
    neg_vision_3: "Map blindness. Start making Control Wards a core item purchase.",
    neg_support_vision: "Insufficient vision for a Support",
    neg_jungle_impact: "Ghost Jungler: little impact on lanes",
    neg_damage: "Lack of offensive impact in trades",
    neg_default: "No major mistakes detected",
    pos_default: "Played solid until the end",
    analysis_pos: "Positive Points",
    analysis_neg: "Negative Points",
    matchup_stomp_1: "You completely neutralized {{champ}}. Your overwhelming gold/kill lead made them irrelevant.",
    matchup_stomp_2: "Absolute lane kingdom against {{champ}}. You dominated every extended trade and starved them.",
    matchup_stomp_3: "A masterclass in punishing {{champ}}. You capitalized on their cooldowns perfectly and snowballed.",
    matchup_lost_lane_won_game_1: "{{champ}} pushed you to the brink in lane, but your superior macro won the war.",
    matchup_lost_lane_won_game_2: "You conceded early pressure to {{champ}} but displayed great resilience by recovering in teamfights.",
    matchup_lost_lane_won_game_3: "Rough laning phase against {{champ}}. Next time, respect their early power spikes more.",
    matchup_won_lane_lost_game_1: "You thoroughly beat {{champ}}, but the lead was tragically wasted. Focus on spreading your advantage.",
    matchup_won_lane_lost_game_2: "Frustrating match. You secured lane priority over {{champ}} but couldn't prevent the collapse elsewhere.",
    matchup_won_lane_lost_game_3: "You held a mechanical upper hand over {{champ}}. Don't let team differences ruin your confidence.",
    matchup_feeding_1: "{{champ}} severely outperformed you. You failed to respect their damage thresholds entirely.",
    matchup_feeding_2: "Nightmare scenario. {{champ}} capitalized on your repeated positional errors. Practice playing safe.",
    matchup_feeding_3: "You fed a monstrous lead to {{champ}}. Learn to concede CS when you are heavily out-traded.",
    matchup_passive_1: "A mutual farming handshake with {{champ}}. Next time, test their limits earlier to establish dominance.",
    matchup_passive_2: "Extremely low-conflict lane against {{champ}}. You played scaling roulette instead of actively winning.",
    matchup_passive_3: "Passive standoff against {{champ}}. You missed critical windows to punish their mispositioning.",
    matchup_neutral_1: "A beautifully balanced duel against {{champ}}. Rotations and jungle interference dictated this outcome.",
    matchup_neutral_2: "Skill-expressive stalemate with {{champ}}. Both outplayed each other in equal measure.",
    matchup_neutral_3: "Dead-heat matchup against {{champ}}. Small macro decisions ended up being the ultimate tiebreaker.",
    matchup_vision_gap_1: "Vision warning. {{champ}} had much better map control than you.",
    matchup_vision_gap_2: "You lost the vision war against {{champ}}. Buy sweepers earlier.",
    matchup_vision_gap_3: "{{champ}} out-warded you heavily, setting up constant traps.",
    matchup_default_1: "Close duel against {{champ}}. Analyze their spell timings next game.",
    matchup_default_2: "Slightly tense matchup versus {{champ}}. Work on your spacing.",
    matchup_default_3: "Even trade patterns against {{champ}}. Focus on minion manipulation.",
    profile_not_found_title: "Profile Not Found",
    profile_not_found_desc: "The player is not found or does not exist in this region.",
    others: "Others",
    waiting_for_league: "Waiting for League Client",
    launch_game_desc: "Please launch your League of Legends client to access Oracle tools.",
    preferred_roles: "Preferred Roles",
    // Missing Keys
    tab_general: "General", tab_details: "Details", tab_runes: "Runes",
    partial_data: "Partial Data",
    partial_data_desc: "Detailed stats for all 10 players and timeline are not available for this external match.",
    blue_side: "Blue Side", red_side: "Red Side",
    fetching_details: "Fetching detailed data...",
    no_details_found: "Details not available for this match.",
    analyzing_match: "ANALYZING MATCH...",
    laning_phase: "Laning Phase (15m)",
    cs_diff: "CS DIFF", gold_diff_title: "GOLD DIFF", xp_diff: "XP DIFF",
    vision_control_title: "Vision Control",
    wards_placed_title: "PLACED", wards_destroyed: "DESTROYED", control_wards: "CONTROL",
    perf_min: "Performance / Min",
    cs_min_short: "CS/M", dmg_min_short: "DMG/M", gold_min_short: "GOLD/M",
    build_order_title: "BUILD ORDER",
    no_shop_events: "No shop events detected.",
    filtered_data: "Filtered data",
    timeline_unavailable: "Timeline unavailable",
    skill_order_title: "SKILL ORDER",
    spell_casted: "SPELL CASTED",
    times: "times",
    pings_title: "PINGS",
    unranked: "UNRANKED",
    th: "th", cs: "CS", m: "m", s: "s",
    meta_current: "Current Meta",
    unknown: "Unknown",
    loading_info: "Loading information",
    last_game: "Last Game",
    view_analysis: "View Analysis",
    patch_news: "Patch News",
    view_all: "View All",
    no_summary: "No summary available.",
    recently: "Recently",
    loading_news: "Loading news...",
    latest_games: "Latest Games",
    goldDiff15: "GOLD @ 15",
    kaDiff15: "KA DIFF @ 15",
    rankings_wip: "Rankings & Leaderboards are being updated.",
    maintenance: "FEATURE DISABLED FOR MAINTENANCE",
    iron: "Iron", bronze: "Bronze", silver: "Silver", gold: "Gold", platinum: "Platinum", emerald: "Emerald", diamond: "Diamond", master: "Master", grandmaster: "Grandmaster", challenger: "Challenger",
    inventory_subtitle: "Visualize your cosmetic inventory",
    sort_by: "Sort",
    name_az: "Name (A-Z)",
    name_za: "Name (Z-A)",
    sync_inventory: "Synchronizing inventory...",
    search_generic: "Search...",
    refresh: "Refresh",
    parties: "Games",
    loading_data: "Loading data...",
    searching_for: "Searching for",
    active_player: "Active Player",
    friend: "Friend", oracle_estimate: "ORACLE ESTIMATE", friend_connected: "FRIEND CONNECTED", friend_connected_msg: "Just connected to Launcher", friend_disconnected: "FRIEND DISCONNECTED", friend_disconnected_msg: "Left League of Legends", game_started: "GAME STARTED", game_started_msg: "Just started a game",
    welcome: "Welcome to Oracle",
    welcome_back: "Welcome back to Oracle",
    stats_unavailable: "Stats Unavailable (External Region)",
  },
  fr: {
    dashboard: "Tableau de bord", tierlist: "Builds & Tips", leaderboards: "Classements",
    overlays: "Overlays", collections: "Collections",
    esports: "Esports", datastudio: "Data Studio", matchups: "Matchups",
    settings: "Paramètres", profile: "Profil", watch: "Regarder",
    connected: "En ligne", disconnected: "Hors ligne",
    searchPlaceholder: "Rechercher invocateur...", visualStyle: "Style Visuel", colorTheme: "Thème Couleur",
    language: "Langue", startup: "Lancer au démarrage", glass: "Glass", opaque: "Opaque",
    themeToggle: "Basculer Clair/Sombre", chooseStyle: "Apparence Visuelle",
    chooseLang: "Sélectionner la langue", startupDesc: "Comportement au démarrage",
    auto_accept: "Acceptation Auto", auto_accept_desc: "Accepter automatiquement les parties dès qu'elles sont trouvées.",
    auto_import: "Import Auto Runes", auto_import_desc: "Importer automatiquement les meilleures runes pour votre champion.",
    flash_position: "Position du Flash", flash_left: "Gauche (D)", flash_right: "Droite (F)",
    overlay_settings: "Paramètres d'Overlay", ingame_modules: "Modules en jeu",
    edit_layout: "Modifier la Disposition", save_layout: "Sauvegarder & Quitter",
    reset_layout: "Réinitialiser",
    loading_screen: "Overlay Chargement", loading_desc: "Stats des joueurs pendant le chargement",
    winrate_toggle: "Prédiction de Victoire (CTRL+X)", winrate_desc: "Pourcentage de chance de victoire en temps réel",
    jungle_pathing: "Chemin Jungle", jungle_pathing_desc: "Meilleures routes et timers",
    ward_timer: "Rappel de Balise", ward_timer_desc: "Alerte quand changer/poser une balise",
    metaTierList: "Meta Tier List", proReplays: "Replays Pro", waitingMatch: "En attente du match",
    clientDisconnected: "Client Déconnecté", liveMatch: "LIVE",
    rank: "Rang", champion: "Champion", role: "Rôle", winrate: "Taux Victoire", ban: "Taux Ban", tier: "Tier",
    kda: "KDA", dpmScore: "ORACLE SCORE", kp: "KP", csm: "CSM", vision: "Score Vision", gpm: "GPM",
    appearance: "Apparence", chooseStyleDesc: "Choisissez entre Liquid Glass ou Solide",
    themeToggleDesc: "Changer l'apparence des couleurs de l'application",
    theme_classic: "Classique", theme_purple: "Pourpre", theme_storm: "Tempête", theme_radiant: "Radiant",
    langSelectDesc: "Sélectionnez votre langue préférée",
    gold_sound_label: "Alerte Or (1200g)",
    gold_sound_desc: "Joue un son quand vous atteignez 1200 gold",
    test_mode_label: "Mode TEST Overlays",
    test_mode_desc: "Affiche tous les overlays pour test",
    edit_layout_desc: "Ajustez la position de chaque module sur votre écran.",
    layout_editor_title: "Éditeur d'Overlay Oracle",
    layout_editor_desc: "Glissez les modules pour les repositionner",
    game_space: "Espace de Jeu",
    cancel: "Annuler",
    confirm_reset: "Réinitialiser les positions des overlays ?",
    reset_default: "Réinitialiser les positions par défaut",
    skill_advice: "Conseil : Améliorer",
    gold_alert: "Alerte Gold",
    gold_deficit_massive: "Déficit massif :",
    gold_advantage_massive: "Avantage massif :",
    compare_and_win: "Analysez le matchup et dominez votre lane",
    gameplay_conseils: "Conseils de Matchup",
    summoner_spells: "Sorts Recommandés",
    recommended_build: "Build Essentiel",
    build_starting: "Départ", build_core: "Build Core", build_fourth: "4ème Item",
    build_fifth: "5ème Item", build_sixth: "6ème Item",
    matchup_video: "Replay du Match",
    high_elo_pov: "POV Haut Elo",
    matchup_no_data: "Pas de données spécifiques. Jouez sur vos fondamentaux.",
    winrate_label: "Taux de Victoire",
    vs_comparison: "Comparaison Directe",
    danger_level: "Niveau de Risque",
    risk_low: "FAIBLE",
    risk_medium: "MOYEN",
    risk_critical: "CRITIQUE",
    risk_desc_low: "Vous avez l'avantage statistique. Cherchez les échanges agressifs.",
    risk_desc_medium: "Matchup basé sur le talent (Skill). Concentrez-vous sur les mécaniques.",
    risk_desc_critical: "Matchup haute pression. Évitez les échanges quand ses sorts sont dispos.",
    ward_advice: "Oracle suggère une balise maintenant.",
    blue_team: "Équipe Bleue",
    red_team: "Équipe Rouge",
    jungle_insight: "Insight Jungle",
    logic_pathing: "Parcours Logique",
    next_camp: "Prochain :",
    connectLcu: "Connexion au Client League...", vs1w: "vs il y a 1 sem",
    // Game Modes & Status
    queue_custom: "Personnalisé", queue_draft: "Draft", queue_solo: "Classé Solo", queue_flex: "Classé Flex",
    queue_blind: "Aveugle", queue_aram: "ARAM", queue_arena: "Arena", queue_urf: "URF", queue_coop: "Co-op vs IA",
    queue_normal: "Normal", queue_unknown: "Inconnu", ingame: "Partie en cours", playing: "Joue", spectate_btn: "Spectateur",
    explore_oracle: "Explorez l'app ORACLE", season: "Saison 15", owned_skins: "Skins possédés",
    survivability: "Survivabilité", tf_deaths: "Morts en Teamfight", performance: "Performance par champion",
    all: "TOUS", mvp: "MVP", score: "score", deaths: "Morts", ka: "Kills + Assists",
    early: "DÉBUT", mid: "MILIEU", late: "FIN", live_pro: "PRO EN DIRECT", spectate: "Regarder",
    replay: "REPLAY", victory: "Victoire", defeat: "Défaite", theme_dark: "Sombre", theme_light: "Clair",
    visual_glass: "Glass", visual_opaque: "Opaque", records: "Records", lens: "Lens", behavioral: "Comportemental",
    pings: "Pings", solo_duo: "Solo/Duo", flex: "Flex", aram: "ARAM", coming_soon: "Bientôt disponible...",
    estimated_solo: "ESTIMÉ (SOLO, 20 GAMES)", estimated_flex: "ESTIMÉ (FLEX, 20 GAMES)",
    // New Additions
    waiting_for_match: "En attente du match...", enter_game_live: "Veuillez entrer en jeu pour voir les stats.", toggle_hint: "[CTRL+X] POUR BASCULER",
    team_blue: "Ordre (Bleu)", team_red: "Chaos (Rouge)", you: "VOUS", hot_streak: "SÉRIE",
    matchup_analysis: "Analyse Matchup", strategic_insight: "Insight Stratégique", counter_items: "Objets Contre Recommandés",
    behavioral_analysis: "Analyse Comportementale",
    esports_center: "Centre Esports", switch_source: "Changer Source", upcoming_matches: "Matchs à venir", latest_news: "Dernières Actus",
    collections_title: "Collections", rankings_title: "Classements",
    launch_custom: "Lancez une partie perso pour configurer.", start_editor: "Lancer Éditeur Overlay",
    select_champion: "Choisir Champion", search_champion: "Chercher...",
    rank_header: "Rang", lp_header: "LP", winrate_header: "Taux Victoire", games_header: "Parties", summoner_header: "Invocateur",
    no_games_found: "Aucune partie trouvée", search_summoner_profile: "Chercher profil invocateur", search_result: "Rechercher",
    most_kills: "plus de Kills", dmg_dealt: "Dégâts infligés", vision_score: "Score Vision", cs_min: "CS / min", season_best: "MEILLEURE SAISON",
    aggression: "Agression", farming: "Farm", vision_radar: "Vision", survival: "Survie", objective: "Objectif",
    playstyle: "Style de jeu", focus: "Focus", aggressive_carry: "Carry Agressif", die_less: "Mourir Moins",
    playstyle_berserker: "Berserker", playstyle_kda_player: "Joueur KDA", playstyle_supportive: "Âme Support",
    playstyle_resource_hoard: "Accapareur Ressources", playstyle_obj_melter: "Destructeur d'Objectifs", playstyle_map_architect: "Architecte (Map)",
    playstyle_facechecker: "Facechecker", playstyle_complete_carry: "Carry Ultime", playstyle_aggressive: "Carry Agressif",
    playstyle_passive: "Joueur Passif", playstyle_tactical: "Spécialiste Tactique",
    focus_farm: "Combler le Farm", focus_vision: "Poser Balises", focus_positioning: "Positionnement", focus_group: "Se Regrouper",
    focus_towers: "Détruire Tours", focus_survival: "Survivre Plus", focus_expand: "Accroître l'Avance",
    focus_macro: "Améliorer Macro", focus_teamfights: "Présence Teamfights", focus_consistency: "Être Constant", focus_pressure: "Mettre la Pression", focus_roaming: "Plus de Décalages",
    skill_levelup: "Guide Sorts", jungle_timers: "Timers Jungle", objective_voting: "Vote Objectifs", gold_diff: "Diff. Or",
    last_20_games: "20 Dernières Parties", summoner_not_found: "Invocateur Introuvable",
    strategic_desc_mock: "Irelia a un avantage significatif au niveau 2. Cherchez des échanges tôt. Évitez Darius quand son E est dispo. Construisez Blade of the Ruined King en premier.",
    search_hint: "Rechercher Nom#Tag",
    region: "Région",
    online: "En ligne", offline: "Hors ligne",
    preferred_roles: "Rôles Préférés",
    // Build View
    build_runes_season: "Build, Runes Saison", patch: "Patch", recommended_plus: "P+ Recommandé",
    skill_order: "Ordre des Compétences",
    max_1st: "Max 1er", max_2nd: "Max 2ème", max_3rd: "Max 3ème",
    boots_options: "Options Bottes", starters: "Objets de Départ", core_build_path: "Build Principal",
    matchups_analysis: "Analyse Matchups", strong_against: "Fort Contre", weak_against: "Faible Contre",
    rune_path: "Pages de Runes", launch: "Lancer", winrate_trend: "Tendance Winrate (30 Jours)",
    // Matchup View
    matchup_analysis_title: "Analyse Matchup",
    lane_kill_rate: "Taux Kill Lane", gold_15: "Or @ 15 min", early_wr: "Winrate Début", late_wr: "Winrate Fin", first_tower: "Première Tour",
    analysis_direct: "Analyse Directe", duel_vs: "Duel contre", guide_matchup: "Guide Matchup", rival: "RIVAL",
    searching: "RECHERCHE...", sync_data: "Synchronisation...", coach_verdict: "Verdict Coach", view_tips: "Voir Conseils", back_btn: "Retour", matchup_tips_title: "Astuces Matchup",
    to_do: "À FAIRE", to_avoid: "À ÉVITER",
    friend: "Ami", oracle_estimate: "ESTIMATION ORACLE", friend_connected: "AMI CONNECTÉ", friend_connected_msg: "Vient de se connecter au Launcher", friend_disconnected: "AMI DÉCONNECTÉ", friend_disconnected_msg: "A quitté League of Legends", game_started: "PARTIE LANCÉE", game_started_msg: "Vient de lancer une partie",
    title_to_do: "STRATÉGIE OFFENSIVE", title_to_avoid: "VIGILANCE CRITIQUE",

    // Profile & Replays
    profile_not_found: "Profil Introuvable", summoner_not_found_desc: "Le joueur est introuvable ou n'existe pas dans cette région.",
    recent_matches: "Matchs Récents", no_match_found: "Aucun match trouvé...", phase_label: "Phase",
    no_partners: "Aucun joueur récent", games_played: "Parties jouées", top_champions: "Top Champions", recent_players: "Joueurs Récents",
    loading_replays: "Chargement des replays...", and_ai_coaching: "& Coaching IA", replays_desc: "Visionnez vos parties et recevez des conseils personnalisés par l'IA.",
    games_found: "Parties trouvées", watchable: "Visionnables", ai_analyzer_title: "Analyseur IA Oracle",
    ai_analyzer_desc: "Sélectionnez une partie sur la gauche pour générer un rapport complet de coaching et identifier vos erreurs.",
    analyzing_caps: "ANALYSE...", close_duel: "Fermer Duel", analyze_duel: "Analyse Duel", opponent: "Adversaire",
    sync_data_opp: "Synchronisation...", key_tips: "Conseils Clés", analysis_timeline: "Chronologie", events: "ÉVÉNEMENTS",
    tactical_analysis: "Analyse tactique...", watch_replay: "Visionner Replay",
    stat_obj_focus: "Focus Objectif", stat_mechanics: "Mécaniques", stat_kda_perf: "Perf KDA", stat_farming: "Farming",
    matchup_desc_example: "a un avantage significatif au niveau 2. Cherchez les échanges rapides.",
    // Enhanced French Tips
    tip_deaths_1: "Vous mourez trop souvent. Analysez vos replays pour repérer vos sur-extensions. Chaque mort offre de l'or, de l'XP et un avantage numérique global à l'ennemi.",
    tip_deaths_2: "Mortalité critique. Forcez-vous à jouer plus en retrait quand vous n'avez pas la vision sur le jungler adverse. La survie doit être votre priorité N°1.",
    tip_deaths_3: "Vous donnez beaucoup trop de ressources. Prenez moins de risques inutiles, surtout avant l'apparition d'un objectif neutre majeur.",
    tip_csm_1: "Retard de farm critique (CS/min). Votre farm est votre source de revenu la plus fiable. Évitez de rester au mid indéfiniment, allez récupérer les vagues sur les side lanes.",
    tip_csm_2: "CSing très faible. Prenez l'habitude de tuer la jungle ou les sbires entre deux rotations. Vos objets dépendent de votre capacité à ne rien laisser au sol.",
    tip_csm_3: "Déficit économique via les sbires. Vous perdez trop de sbires sous la tour ou lors de vos décalages. Améliorez votre last-hitting en phase de lane.",
    tip_vision_1: "Votre score de vision est inquiétant. Achetez 1 à 2 Balises de Contrôle à chaque retour à la base et placez-les pour protéger vos flancs.",
    tip_vision_2: "Cécité totale sur la carte. Ne face-checkez pas sans vision et aidez votre équipe en plaçant des wards profondes dans la jungle adverse.",
    tip_vision_3: "Vision beaucoup trop faible. N'oubliez pas de changer votre relique (Brouilleur/Altération) selon votre rôle mid-game et utilisez-la au maximum.",
    tip_obj_1: "Manque total de pression sur les tourelles et monstres épiques. Les kills isolés ne font pas gagner la partie. Aidez à prendre le Héraut/Dragon après un combat.",
    tip_obj_2: "Aucune participation à la destruction des objectifs. Vous devez faire avancer la ligne de front pour asphyxier la carte, pas seulement chercher l'élimination.",
    tip_obj_3: "Impact nul sur l'environnement. Si vous avez le contrôle de votre lane, servez-vous en pour prendre les plaques de barricade ou envahir la jungle.",
    tip_win_1: "Victoire solide. Essayez de clôturer les parties encore plus vite la prochaine fois en forçant le Baron Nashor avec votre avantage.",
    tip_win_2: "Excellente gestion de l'avantage. Vous avez su capitaliser sur les erreurs adverses avec brio. Continuez ainsi.",
    tip_win_3: "Très bonne exécution. Continuez à appuyer votre macro après la phase de lane pour totalement étouffer l'adversaire.",
    tip_loss_1: "Défaite difficile. Prenez 5 minutes de pause pour décompresser, hydratez-vous, et revoyez les moments où la partie a basculé.",
    tip_loss_2: "Manque de cohésion globale. Dans vos défaites, cherchez systématiquement ce que VOUS auriez pu faire de mieux, ignorez les fautes de vos alliés.",
    tip_loss_3: "Mauvaise coordination en mid/late game. Identifiez les faiblesses de votre composition et jouez de manière plus prudente la prochaine fois.",

    // Generic fallbacks
    tip_deaths_title: "Morts Excessives", tip_deaths_desc: "Taux de mortalité trop élevé. Vous donnez trop de ressources.",
    tip_survival_title: "Survie Parfaite", tip_survival_desc: "Aucune mort. Positionnement irréprochable.",
    tip_csm_title: "Retard de Farm", tip_csm_desc: "CS/min critique. Priorisez les sbires.",
    tip_multikill_title: "Multi-Kill", tip_multikill_desc: "Excellente gestion des fights.",
    tip_vision_elite_title: "Vision Élite", tip_vision_elite_desc: "Vision au-dessus de la moyenne. Bon contrôle.",
    tip_vision_poor_title: "Cécité Carte", tip_vision_poor_desc: "Score vision faible. Achetez des Pinks.",
    tip_firstblood_title: "Premier Sang", tip_firstblood_desc: "Excellent avantage early.",
    tip_objective_title: "Focus Objectif", tip_objective_desc: "Grosse pression Tours/Dragons.",
    tip_cc_title: "Maître du CC", tip_cc_desc: "Excellente utilisation des contrôles.",
    tip_gold_title: "Capitalisation Éco", tip_gold_desc: "Quantité d'or massive générée.",
    tip_tank_title: "Résilience Absolue", tip_tank_desc: "Énormes dégâts mitigés.",
    tip_jungle_title: "Rythme Jungle", tip_jungle_desc: "Clearing trop lent.",
    tip_default_title: "Optimisation Or", tip_default_desc: "Concentrez-vous sur le farm.",
    // Behavioral
    beh_consistency: "Constance", beh_consistency_sub: "Stabilité Performance",
    beh_tilt: "Résit. Tilt", beh_tilt_sub: "Winrate après défaite",
    beh_farming: "Farming", beh_farming_sub: "CS Par Minute",
    beh_activity: "Activité Équipe", beh_activity_sub: "Participation Kills",
    beh_survival: "Survie", beh_survival_sub: "Évitement Morts",
    beh_aggression: "Aggression", beh_aggression_sub: "Impact / Min",
    // Verdicts
    // Verdicts
    verdict_pivot: "Oracle : Pivot Stratégique. Vous étiez le véritable moteur de votre équipe. Votre participation aux kills a défini le tempo global du match. En étant littéralement partout, vous avez su transformer chaque escarmouche locale en un avantage décisif sur la carte.",
    verdict_soul: "Oracle : Moissonneur d'Âmes. Domination économique totale. Vous n'avez pas seulement gagné votre duel; vous avez ruiné la partie de votre adversaire direct. En le privant de sbires et d'XP de façon aussi agressive, le match s'est transformé en 5 contre 4.",
    verdict_fatal: "Oracle : Efficacité Fatale. Précision Chirurgicale. Vous avez maximisé la valeur de chaque pièce d'or dépensée. Vos dégâts par rapport à votre économie sont époustouflants, prouvant qu'il n'y a pas besoin d'être totalement 'full build' pour être mortel.",
    verdict_pillar: "Oracle : Pilier de Victoire. Le Roc inébranlable. Vous étiez la fondation fiable dont votre équipe manquait cruellement. Sans forcément dominer les statistiques, votre présence constante aux moments clés et votre macro irréprochable ont sécurisé cette victoire.",
    verdict_vuln: "Oracle : Cible Ambulante. Vous avez navigué à contre-courant, passant plus de temps mort qu'à impacter la carte. Vos prises de risques non-calculées ont offert de l'or gratuit à l'ennemi. Arrêtez de forcer des actions désespérées quand vous êtes en retard.",
    verdict_eco: "Oracle : Asphyxie Économique. Famine de Ressources. Vous avez dramatiquement échoué sur les bases : le farming. Se battre tout en subissant un retard d'équipement est une stratégie perdante. Priorisez impérativement la récolte des sbires avant de contester la rivière.",
    verdict_leader: "Oracle : Loup Solitaire. Vous avez brillé individuellement, mais n'avez absolument pas su traduire votre avantage pour soulever l'équipe. Un bon KDA ne détruit pas le Nexus de lui-même. Vous deviez utiliser votre suprématie pour débloquer vos alliés en difficulté.",
    verdict_defeat: "Oracle : Effondrement Macro. Mécaniquement décent, mais vous avez totalement abandonné la carte. Vous avez laissé l'ennemi dicter les rotations et le contrôle des objectifs sans jamais punir ailleurs. Revoyez de toute urgence vos prises de décisions en mid-game.",
    verdict_intro: "Oracle :",
    // New Verdicts
    verdict_perfect_kda: "Oracle : Immortel. Performance Parfaite. Vous n'avez jamais concédé la moindre prime. Un positionnement impeccable couplé à une agression savamment calculée vous a permis d'infliger d'énormes dégâts sans jamais vous faire véritablement attraper.",
    verdict_penta: "Oracle : Prédateur Apex. Un Pentakill n'est jamais le simple fruit du hasard, c'est une démonstration de domination totale. Vous avez lu le combat parfaitement et exécuté chaque cible l'une après l'autre. Vous étiez LE carry incontestable.",
    verdict_visionary: "Oracle : Œil Omniscient. Votre contrôle de la vision était tout simplement étouffant. En traquant sans relâche le jungler ennemi et en éclairant l'entièreté de la carte, vous leur avez retiré toute capacité à jouer autour des objectifs majeurs.",
    verdict_carry_hard: "Oracle : Machine 1v9. Vous avez participé à plus de 75% des éliminations de votre équipe. Soyons clairs : sans vous, cette partie se terminait en 15 minutes top chrono. Une formidable performance format 'sac à dos'.",
    verdict_stomp: "Oracle : Destruction Totale. Une avance en or monumentale. Ce n'était même plus un match, c'était une démonstration de force. L'ennemi n'a jamais eu le moindre fragment de chance de revenir.",
    verdict_efficient: "Oracle : Miracle Économique. Des dégâts infligés véritablement insensés compte tenu du peu d'or à votre disposition. Vous n'aviez pas besoin d'items absurdes pour dominer, uniquement d'une aisance mécanique pure.",
    verdict_feeder: "Oracle : Hémorragie Continue. Atteindre un nombre de mort à deux chiffres saborde l'ensemble des efforts de votre équipe. Vous êtes devenu un sac d'or sur pattes pour le carry adverse. Vous DEVEZ apprendre à jouer 'weakside' et lâcher votre tour s'il le faut.",
    verdict_blind: "Oracle : L'Aveuglement Volontaire. Votre score de vision approche le Zéro absolu. Vous avez péri à maintes reprises en inspectant des buissons car vous refusez d'investir dans les Balises de Contrôle. La vision est l'outil le plus indispensable du jeu.",
    verdict_afk_farm: "Oracle : Maladie du 'PvE Player'. Vos statistiques de farming explosent, mais leur utilité y est nulle (Participation médiocre). Pendant que vous étiez sur les corbins, votre équipe s'est fait décimer au Dragon. L'or doit servir à gagner des combats, rejoignez-les !",
    verdict_solid_effort: "Oracle : Héros Tragique. Difficile à avaler. Vous avez absolument tout fait correctement (Lane remportée, statistiques irréprochables), mais le poids de votre équipe était bien trop lourd. N'en faites pas une fixation, la persévérance finit par payer.",
    verdict_rich_loser: "Oracle : Syndrôme de la Vitrine. Vous aviez 6 équipements mais vous avez tout de même subi la défaite. L'or accumulé est inutile si vous vous faites surprendre bêtement avant les combats qui décident du match. Le positionnement prime sur les objets.",
    verdict_unlucky_carry: "Oracle : Team Gap. Vous avez endossé le rôle de meneur et assumé la pression (Plus gros DPS, haut KP), mais l'écart de niveau entre les deux équipes était tout bonnement impossible à combler. Gardez une mentalité de fer, vous avez excellé.",
    // Points d'analyse
    pos_kda_1: "Ratio KDA exceptionnel. Vous avez survolé les combats d'équipe.",
    pos_kda_2: "Excellente survie combinée à une forte participation aux kills.",
    pos_kda_3: "Vous avez sévèrement puni l'ennemi sans jamais donner votre prime.",
    pos_multikill_1: "Multikills dévastateurs. Vous étiez un cauchemar en combat regroupé.",
    pos_multikill_2: "Des exécutions multiples qui ont totalement fait basculer la partie.",
    pos_multikill_3: "Tueur en série. Votre mécanique en teamfight était impeccable.",
    pos_kp_1: "Omniprésence absolue. Une participation aux éliminations colossale.",
    pos_kp_2: "Vous étiez le catalyseur de quasiment toutes les actions de l'équipe.",
    pos_kp_3: "Un KP élevé signifie un très fort impact. Bons décalages stratégiques.",
    pos_farm_1: "Farming impérial générant une avance en or insurmontable.",
    pos_farm_2: "Derniers coups parfaits. Votre nombre de sbires a gagné les affrontements.",
    pos_farm_3: "Gestion de vague parfaite ayant rapporté un avantage de creeps massif.",
    pos_gold_1: "Vous avez littéralement ruiné votre adversaire direct économiquement.",
    pos_gold_2: "Différence d'or écrasante générée par votre seule domination en lane.",
    pos_gold_3: "Suprématie économique. Vous avez mis votre vis-à-vis hors-jeu.",
    pos_obj_1: "Focus objectif redoutable. Vous privilégiez la carte aux poursuites.",
    pos_obj_2: "De très lourds dégâts sur les structures. Vous savez finir une partie.",
    pos_obj_3: "Destructeur d'objectifs. Vous avez converti votre force en contrôle total.",
    pos_vision_1: "Illumination suprême de la carte. Vous avez nié tout effet de surprise.",
    pos_vision_2: "Excellent score de vision qui a sécurisé les rotations alliées.",
    pos_vision_3: "Votre balisage a totalement étouffé le parcours du jungler adverse.",
    pos_carry_1: "Performance incontestable de carry. Vous avez pulvérisé le compteur de dégâts.",
    pos_carry_2: "Vous étiez le moteur principal des dégâts en teamfight.",
    pos_carry_3: "Effort colossal. Vous avez littéralement porté les combats sur vos épaules.",

    neg_deaths_1: "Vos morts répétées ont injecté des sommes d'or folles aux carrys adverses.",
    neg_deaths_2: "Trop de temps passé mort. Jouer safe est souvent la meilleure action possible.",
    neg_deaths_3: "Un positionnement trop téméraire menant à trop de morts gratuites.",
    neg_kp_1: "Jeu trop isolé. Marge de participation aux kills beaucoup trop faible.",
    neg_kp_2: "AFK push en side-lane pendant que votre équipe se faisait massacrer au Dragon.",
    neg_kp_3: "Présence fantomatique. Vous n'avez quasiment pas participé à l'issue finale.",
    neg_farm_1: "Last-hitting très pauvre. Vous avez trop cherché la bagarre au lieu de farmer.",
    neg_farm_2: "Vous avez abandonné vos vagues de sbires, subissant un déficit d'objets total.",
    neg_farm_3: "Le CS/min est la mécanique numéro 1. Le vôtre faisait cruellement défaut.",
    neg_gold_1: "Votre vis-à-vis vous a totalement écrasé et asphyxié économiquement.",
    neg_gold_2: "Vous avez été retiré de la partie à cause de votre gouffre économique.",
    neg_gold_3: "Écart d'or massif causé par l'adversaire. Vous avez subi toute la game.",
    neg_obj_1: "Pression nulle sur les tours ou monstres épiques. Vous avez joué pour le KDA.",
    neg_obj_2: "Les objectifs gagnent les parties. Et vous les avez complètement ignorés.",
    neg_obj_3: "Conversion tactique catastrophique. Faire des kills sans taper de tour ne sert à rien.",
    neg_vision_1: "Vous avez navigué dans l'obscurité totale. Refuser la vision coûte des parties.",
    neg_vision_2: "Aucun contrôle de la carte. Vous avez invité le jungler adverse à camper.",
    neg_vision_3: "Cécité cartographique. Achetez des Pinks Wards à chaque retour à la base.",
    neg_support_vision: "Vision insuffisante pour un Support",
    neg_jungle_impact: "Jungler fantôme : peu d'impact sur les lanes",
    neg_damage: "Manque d'impact offensif dans les échanges",
    neg_default: "Aucune erreur majeure détectée",
    pos_default: "Tu as joué de manière solide jusqu'au bout",
    analysis_pos: "Points Positifs",
    analysis_neg: "Points Négatifs",

    matchup_stomp_1: "Vous avez totalement neutralisé {{champ}}. L'écart d'or et de kills l'a rendu inutile.",
    matchup_stomp_2: "Domination absolue en lane contre {{champ}}. Vous avez remporté tous les échanges prolongés.",
    matchup_stomp_3: "Une masterclass sur comment punir {{champ}}. Vous avez exploité ses rechargements de sorts à merveille.",
    matchup_lost_lane_won_game_1: "{{champ}} vous a mené la vie dure, mais votre macro supérieure a remporté la guerre.",
    matchup_lost_lane_won_game_2: "Vous avez concédé la pression face à {{champ}}, mais fait preuve d'une grande résilience en teamfight.",
    matchup_lost_lane_won_game_3: "Phase de lane difficile contre {{champ}}. La prochaine fois, respectez davantage ses pics de puissance.",
    matchup_won_lane_lost_game_1: "Vous avez battu {{champ}}, mais l'avantage a été gaspillé. Essayez de mieux étendre votre pression.",
    matchup_won_lane_lost_game_2: "Match frustrant. Vous aviez la priorité absolue sur {{champ}} mais n'avez pas pu stopper l'hémorragie alliée.",
    matchup_won_lane_lost_game_3: "Supériorité mécanique indéniable face à {{champ}}. Ne laissez pas vos coéquipiers détruire votre mental.",
    matchup_feeding_1: "{{champ}} vous a sévèrement surclassé. Vous n'avez pas respecté ses seuils de dégâts critiques.",
    matchup_feeding_2: "Scénario catastrophe. {{champ}} a capitalisé sur vos mauvaises postures à répétition. Jouez en retrait.",
    matchup_feeding_3: "Vous avez nourri {{champ}} lourdement. Apprenez à lâcher l'or quand vous perdez massivement des HP.",
    matchup_passive_1: "Un accord tacite de non-agression avec {{champ}}. Testez ses limites plus tôt la prochaine fois.",
    matchup_passive_2: "Lane extrêmement lente contre {{champ}}. Vous avez joué le scaling plutôt que de tenter de dominer.",
    matchup_passive_3: "Face-à-face inoffensif face à {{champ}}. Vous avez manqué des fenêtres critiques pour le punir.",
    matchup_neutral_1: "Un duel magnifiquement équilibré contre {{champ}}. Les décalages seuls ont décidé du résultat.",
    matchup_neutral_2: "Impasse technique face à {{champ}}. Vous vous êtes mutuellement neutralisés en phase de lane.",
    matchup_neutral_3: "Égalité quasi-parfaite face à {{champ}}. Les très légères décisions macro ont fait la différence.",
    matchup_vision_gap_1: "Alerte vision. {{champ}} a beaucoup mieux contrôlé la carte.",
    matchup_vision_gap_2: "Vous avez perdu la guerre de la visibilité contre {{champ}}.",
    matchup_vision_gap_3: "{{champ}} a abusé de votre manque de vision. Achetez le Brouilleur plus tôt.",
    matchup_default_1: "Duel serré contre {{champ}}. Analyse bien ses timings la prochaine fois.",
    matchup_default_2: "Combat tendu contre {{champ}}. Travaillez mieux la gestion de la distance.",
    matchup_default_3: "Échanges standards face à {{champ}}. Concentrez-vous sur la manipulation des sbires.",
    profile_not_found_title: "Profil Introuvable",
    profile_not_found_desc: "Le joueur est introuvable ou n'existe pas dans cette région.",
    others: "Autres",
    waiting_for_league: "En attente de League of Legends",
    launch_game_desc: "Lancez votre client pour accéder aux outils Oracle.",
    // Missing Keys
    tab_general: "Général", tab_details: "Détails", tab_runes: "Runes",
    partial_data: "Données Partielles",
    partial_data_desc: "Les statistiques détaillées des 10 joueurs et la timeline ne sont pas disponibles pour ce match externe.",
    blue_side: "Côté Bleu", red_side: "Côté Rouge",
    fetching_details: "Récupération des données détaillées...",
    no_details_found: "Détails non disponibles pour ce match.",
    analyzing_match: "ANALYSE DU MATCH...",
    laning_phase: "Phase de Laning (15m)",
    cs_diff: "DIFF CS", gold_diff_title: "DIFF OR", xp_diff: "DIFF XP",
    vision_control_title: "Contrôle Vision",
    wards_placed_title: "POSÉES", wards_destroyed: "DÉTRUITES", control_wards: "CONTROLE",
    perf_min: "Performance / Min",
    cs_min_short: "CS/M", dmg_min_short: "DMG/M", gold_min_short: "OR/M",
    build_order_title: "ORDRE DES OBJETS",
    no_shop_events: "Aucun événement de boutique détecté.",
    filtered_data: "Données filtrées",
    timeline_unavailable: "Chronologie indisponible",
    skill_order_title: "ORDRE DES SORTS",
    spell_casted: "SORTS LANCÉS",
    times: "fois",
    pings_title: "PINGS",
    unranked: "NON CLASSÉ",
    th: "e", cs: "CS", m: "m", s: "s",
    meta_current: "Méta Actuelle",
    unknown: "Inconnu",
    loading_info: "Chargement des infos",
    last_game: "Dernière Partie",
    view_analysis: "Voir l'analyse",
    patch_news: "Actus des Patchs",
    view_all: "Voir tout",
    no_summary: "Aucun résumé disponible.",
    recently: "Récemment",
    loading_news: "Chargement des actus...",
    latest_games: "Dernières Parties",
    goldDiff15: "OR @ 15",
    kaDiff15: "DIFF KA @ 15",
    rankings_wip: "Classements & Leaderboards en cours de mise à jour.",
    maintenance: "FONCTIONNALITÉ DÉSACTIVÉE POUR MAINTENANCE",
    iron: "Fer", bronze: "Bronze", silver: "Argent", gold: "Or", platinum: "Platine", emerald: "Émeraude", diamond: "Diamant", master: "Maître", grandmaster: "Grand Maître", challenger: "Challenger",
    inventory_subtitle: "Visualisez votre inventaire cosmétique",
    sort_by: "Trier",
    name_az: "Nom (A-Z)",
    name_za: "Nom (Z-A)",
    sync_inventory: "Synchronisation de l'inventaire...",
    search_generic: "Chercher...",
    refresh: "Rafraîchir",
    perfect: "Parfait",
    no_champ_stats: "Aucune statistique de champion récente",
    parties: "parties",
    loading_data: "Chargement des données...",
    searching_for: "Recherche de",
    active_player: "Joueur Actif",
    welcome: "Bienvenue sur Oracle",
    welcome_back: "Bon retour sur Oracle",
    stats_unavailable: "Stats indisponibles (Région externe)",
  },
  es: {
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    dashboard: "Resumen", tierlist: "Builds & Tips", leaderboards: "Clasificacià³n",
    replays: "Replays", overlays: "Overlays", watch: "Ver", collections: "Colecciones",
    esports: "Esports", datastudio: "Data Studio", matchups: "Matchups",
    settings: "Ajustes", profile: "Perfil",
    connected: "Conectado", disconnected: "Desconectado",
    searchPlaceholder: "Buscar invocador...", visualStyle: "Estilo Visual", colorTheme: "Tema de Color",
    language: "Idioma", startup: "Inicio", glass: "Cristal", opaque: "Opaco",
    themeToggle: "Claro/Oscuro", chooseStyle: "Apariencia",
    chooseLang: "Idioma", startupDesc: "Auto-inicio",
    metaTierList: "Meta Tier List", proReplays: "Replays Pro", waitingMatch: "Esperando",
    clientDisconnected: "Desconectado", liveMatch: "PARTIDA EN VIVO",
    rank: "Rango", champion: "Campeà³n", role: "Rol", winrate: "Winrate", ban: "Ban Rate", tier: "Tier",
    explore_oracle: "Explorar App ORACLE", season: "Temporada 15", owned_skins: "Skins en propiedad",
    survivability: "Supervivencia", tf_deaths: "Muertes en Teamfight", performance: "Rendimiento por campeà³n",
    all: "TODOS", mvp: "MVP", score: "puntuacià³n", deaths: "Muertes", ka: "Asesinatos + Asistencias",
    early: "TEMPRANO", mid: "MEDIO", late: "TARDàO", live_pro: "EN VIVO PRO", spectate: "Espectar",
    replay: "REPLAY", victory: "Victoria", defeat: "Derrota", theme_dark: "Oscuro", theme_light: "Claro",
    visual_glass: "Cristal", visual_opaque: "Opaco", records: "Récords", lens: "Lente", behavioral: "Comportamiento",
    pings: "Pings", solo_duo: "Solo/Duo", flex: "Flex", aram: "ARAM", coming_soon: "Prà³ximamente...",
    appearance: "Apariencia", chooseStyleDesc: "Elige entre Cristal Là­quido o Sà³lido",
    themeToggleDesc: "Alternar entre modo Claro y Oscuro",
    langSelectDesc: "Selecciona tu idioma preferido",
    connectLcu: "Conectando al Cliente de League...", vs1w: "hace 1 sem",
    kda: "KDA", dpmScore: "Puntuacià³n Oracle", kp: "KP", csm: "CSM", vision: "Puntuacià³n de Visià³n", gpm: "GPM",
    // Game Modes & Status
    queue_custom: "Personalizada", queue_draft: "Draft", queue_solo: "Ranked Solo", queue_flex: "Ranked Flex",
    queue_blind: "A Ciegas", queue_aram: "ARAM", queue_arena: "Arena", queue_urf: "URF", queue_coop: "Co-op vs IA",
    queue_unknown: "Desconocido", ingame: "En Partida", playing: "Jugando", spectate_btn: "Espectar",
    // New Additions
    waiting_for_match: "Esperando partida...", enter_game_live: "Por favor, entra a partida para ver stats.", toggle_hint: "[CTRL+X] PARA ALTERNAR",
    team_blue: "Orden (Azul)", team_red: "Caos (Rojo)", you: "TÃƒÅ¡", hot_streak: "RACHA",
    matchup_analysis: "Anà¡lisis de Matchup", strategic_insight: "Insight Estratégico", counter_items: "Objetos Contra Recomendados",
    esports_center: "Centro Esports", switch_source: "Cambiar Fuente", upcoming_matches: "Partidos Prà³ximos", latest_news: "ÃƒÅ¡ltimas Noticias",
    collections_title: "Colecciones", rankings_title: "Clasificaciones", overlay_settings: "Ajustes Overlay",
    ingame_modules: "Mà³dulos en Juego", launch_custom: "Lanza una personalizada para configurar.", start_editor: "Iniciar Editor Overlay",
    select_champion: "Seleccionar Campeà³n", search_champion: "Buscar...",
    rank_header: "Rango", lp_header: "LP", winrate_header: "Winrate", games_header: "Partidas", summoner_header: "Invocador",
    no_games_found: "No se encontraron partidas", search_summoner_profile: "Buscar perfil de invocador", search_result: "Buscar",
    most_kills: "Mà¡s Kills", dmg_dealt: "daà±o infligido", vision_score: "Puntuacià³n Visià³n", cs_min: "CS / min", season_best: "MEJOR TEMPORADA",
    aggression: "Agresividad", farming: "Farm", vision_radar: "Visià³n", survival: "Supervivencia", objective: "Objetivo",
    playstyle: "Estilo", focus: "Foco", aggressive_carry: "Carry Agresivo", die_less: "Morir Menos",
    skill_levelup: "Orden Habilidades", jungle_timers: "Timers Jungla", objective_voting: "Votacià³n Objetivos", gold_diff: "Diferencia de Oro",
    skill_desc: "Muestra orden de habilidades en HUD", jungle_desc: "Overlay minimapa para campos", voting_desc: "Seguimiento de votos de equipo", gold_desc: "Estimacià³n diff oro",
    last_20_games: "ÃƒÅ¡ltimas 20 Partidas", summoner_not_found: "Invocador No Encontrado",
    strategic_desc_mock: "Irelia tiene ventaja significativa al nivel 2. Busca intercambios pronto. Evita a Darius cuando tiene la E. Construye Hoja del Rey Arruinado primero.",
    search_hint: "Search Name#Tag (Region Locked)",
    region: "Region",
    online: "Online", offline: "Offline",
    edit_layout: "Éditer Layout", save_layout: "Sauvegarder",
    gold_sound_label: "Alerte Or (1200g)",
    gold_sound_desc: "Joue un son quand vous atteignez 1200 gold",
    test_mode_label: "Mode TEST Overlays",
    test_mode_desc: "Affiche tous les overlays pour test",
    edit_layout_desc: "Ajustez la position de chaque module sur votre écran.",
    layout_editor_title: "Oracle Layout Editor",
    layout_editor_desc: "Glissez les modules pour les repositionner",
    game_space: "Espace de Jeu",
    cancel: "Annuler",
    confirm_reset: "Réinitialiser les positions des overlays ?",
    reset_default: "Réinitialiser les positions par défaut",
    ward_timer_desc: "Rappel pour placer vos balises de vision",
    // Build View
    build_runes_season: "Build, Runas Temporada", patch: "Parche", recommended_plus: "P+ Recomendado",
    summoner_spells: "Hechizos de Invocador", skill_order: "Orden de Habilidades",
    max_1st: "Max 1Ã‚Âº", max_2nd: "Max 2Ã‚Âº", max_3rd: "Max 3Ã‚Âº",
    boots_options: "Opciones de Botas", starters: "Objetos Iniciales", core_build_path: "Ruta de Build Principal",
    matchups_analysis: "Anà¡lisis de Matchups", strong_against: "Fuerte Contra", weak_against: "Débil Contra",
    rune_path: "Ruta de Runas", launch: "Lanzar", winrate_trend: "Tendencia Winrate (30 Dà­as)",
    // Matchup View
    matchup_analysis_title: "Anà¡lisis de Matchup",
    lane_kill_rate: "Tasa Kill Là­nea", gold_15: "Oro @ 15 min", early_wr: "Winrate Temprano", late_wr: "Winrate Tardà­o", first_tower: "Primera Torre",
    analysis_direct: "Anà¡lisis Directo", duel_vs: "Duelo vs", guide_matchup: "Guà­a de Matchup", rival: "RIVAL",
    searching: "Buscando...", sync_data: "Sinc...", coach_verdict: "Veredicto Técnico", view_tips: "Ver Consejos", back_btn: "Volver", matchup_tips_title: "Consejos Matchup",
    // Esports View
    // esports_center: "Centro Esports", switch_source: "Cambiar Fuente", upcoming_matches: "Prà³ximos Partidos", latest_news: "ÃƒÅ¡ltimas Noticias", // Removed duplicate
    // esports_center: "Centro Esports", switch_source: "Cambiar Fuente", upcoming_matches: "Prà³ximos Partidos", latest_news: "ÃƒÅ¡ltimas Noticias",

    // Profile & Replays
    profile_not_found: "Perfil No Encontrado", summoner_not_found_desc: "Jugador no encontrado o no existe en esta regià³n.",
    recent_matches: "Partidas Recientes", no_match_found: "No se encontraron partidas...", phase_label: "Fase",
    no_partners: "Sin jugadores recientes", games_played: "Partidas jugadas", top_champions: "Mejores Campeones", recent_players: "Jugadores Recientes",
    loading_replays: "Cargando replays...", and_ai_coaching: "& Coaching IA", replays_desc: "Mira tus partidas y recibe consejos personalizados.",
    games_found: "Partidas encontradas", watchable: "Visualizables", ai_analyzer_title: "Analizador IA Oracle",
    ai_analyzer_desc: "Selecciona una partida para generar un reporte completo.",
    analyzing_caps: "ANALIZANDO...", close_duel: "Cerrar Duelo", analyze_duel: "Analizar Duelo", opponent: "Oponente",
    sync_data_opp: "Sincronizando...", key_tips: "Consejos Clave", analysis_timeline: "Cronologà­a", events: "EVENTOS",
    tactical_analysis: "Anà¡lisis tà¡ctico...", watch_replay: "Ver Replay",
    stat_obj_focus: "Foco Objetivos", stat_mechanics: "Mecà¡nicas", stat_kda_perf: "Rend. KDA", stat_farming: "Farming",
    matchup_desc_example: "tiene ventaja significativa a nivel 2. Busca intercambios.",
    // Tips
    tip_deaths_title: "Muertes Excesivas", tip_deaths_desc: "Tasa de mortalidad alta.",
    tip_survival_title: "Supervivencia Perfecta", tip_survival_desc: "Ninguna muerte concedida.",
    tip_csm_title: "Déficit de Farm", tip_csm_desc: "CS/min crà­tico. Prioriza sàºbditos.",
    tip_multikill_title: "Multi-Kill", tip_multikill_desc: "Gran gestià³n de peleas.",
    tip_vision_elite_title: "Visià³n Élite", tip_vision_elite_desc: "Control de mapa superior.",
    tip_vision_poor_title: "Ceguera de Mapa", tip_vision_poor_desc: "Puntuacià³n de visià³n baja.",
    tip_firstblood_title: "Primera Sangre", tip_firstblood_desc: "Gran ventaja temprana.",
    tip_objective_title: "Foco Objetivos", tip_objective_desc: "Presià³n en Torres/Dragones.",
    tip_cc_title: "Maestro del CC", tip_cc_desc: "Excelente uso de control.",
    tip_gold_title: "Capitalizacià³n Eco", tip_gold_desc: "Generacià³n masiva de oro.",
    tip_tank_title: "Resiliencia Absoluta", tip_tank_desc: "Gran mitigacià³n de daà±o.",
    tip_jungle_title: "Ritmo de Jungla", tip_jungle_desc: "Limpieza muy lenta.",
    tip_default_title: "Optimizacià³n Oro", tip_default_desc: "Concéntrate en farmear.",
    // Verdicts
    verdict_pivot: "Oracle : Pivote Estratégico. Fuiste el motor de tu equipo. Tu participacià³n definià³ el ritmo del partido. Estuviste en todas partes, convirtiendo escaramuzas en ventajas globales.",
    verdict_soul: "Oracle : Segador de Almas. Dominio Econà³mico. No solo ganaste tu là­nea; llevaste a la bancarrota a tu oponente. Al negar recursos, hiciste que el enemigo fuera irrelevante.",
    verdict_fatal: "Oracle : Eficiencia Fatal. Precisià³n Quiràºrgica. Maximizaste cada moneda de oro gastada. Tu daà±o en comparacià³n con tu economà­a fue excepcional. No necesitas build completa para ser letal.",
    verdict_pillar: "Oracle : Pilar de Victoria. La Roca. Fuiste la base confiable que tu equipo necesitaba. Tu presencia en momentos clave y tu juego macro sà³lido aseguraron la victoria.",
    verdict_vuln: "Oracle : Carga. Pasaste mà¡s tiempo muerto que impactando el mapa. Tus errores de posicionamiento regalaron oro y ritmo. Deja de forzar jugadas cuando vas por detrà¡s.",
    verdict_eco: "Oracle : Asfixia Econà³mica. Hambre de Recursos. Fallaste en lo bà¡sico: el farm. Pelear con desventaja de objetos es una estrategia perdedora. Prioriza las oleadas de sàºbditos.",
    verdict_leader: "Oracle : Lobo Solitario. Jugaste bien individualmente, pero no tradujiste tu ventaja al equipo. El KDA no destruye el Nexo. Necesitabas usar tu fuerza para cubrir a tus aliados.",
    verdict_defeat: "Oracle : Colapso Macro. Mecà¡nicamente decente, pero perdiste el mapa. Dejaste que el enemigo dictara las rotaciones. Revisa tu toma de decisiones en el juego medio.",
    verdict_intro: "Oracle :",
    profile_not_found_title: "Perfil No Encontrado",
    profile_not_found_desc: "El jugador no se encuentra o no existe en esta regià³n.",
    others: "Otros",
  },
  pt: {
    overview: "Visà£o Geral", champions: "Campeàµes", prohub: "Hub Pro", draft: "Draft", live: "Ao Vivo",
    profile: "Perfil", settings: "Configuraçàµes", connected: "Conectado", disconnected: "Desconectado",
    searchPlaceholder: "Buscar invocador...", visualStyle: "Estilo Visual", colorTheme: "Tema de Cor",
    language: "Idioma", startup: "Iniciar com Windows", glass: "Vidro", opaque: "Opaco",
    themeToggle: "Alternar Claro/Escuro", chooseStyle: "Escolha entre Vidro ou Sà³lido",
    chooseLang: "Selecione seu idioma", startupDesc: "Iniciar Oracle com o Windows",
    metaTierList: "Meta Tier List", proReplays: "Replays Pro", waitingMatch: "Aguardando partida",
    clientDisconnected: "Cliente Desconectado", liveMatch: "PARTIDA AO VIVO",
    rank: "Rank", champion: "Campeà£o", role: "Rota", winrate: "Vità³rias", ban: "Banimentos", tier: "Tier",
    kda: "KDA", dpmScore: "Oracle Score", kp: "KP", csm: "CSM", vision: "Pontuaçà£o de Visà£o", gpm: "GPM",
    match_history: "Histà³rico de Partidas", records: "Registros", coming_soon: "Em breve...",
    behavioral: "Comportamental", lens: "Oracle Lens", performance: "Desempenho por campeà£o", pings: "Pings Totais",
    all: "Todos",
    explore_oracle: "Explorar App ORACLE", season: "Temporada 15", owned_skins: "Skins obtidos",
    survivability: "Sobrevivência", tf_deaths: "Mortes em Teamfight",
    mvp: "MVP", score: "pontuaçà£o", deaths: "Mortes", ka: "Abates + Assistências",
    early: "CEDO", mid: "MEIO", late: "FIM", live_pro: "AO VIVO PRO", spectate: "Assistir",
    replay: "REPLAY", victory: "Vità³ria", defeat: "Derrota", theme_dark: "Escuro", theme_light: "Claro",
    visual_glass: "Vidro", visual_opaque: "Opaco",
    solo_duo: "Solo/Duo", flex: "Flex", aram: "ARAM",
    appearance: "Aparência", chooseStyleDesc: "Escolha entre Vidro ou Sà³lido",
    themeToggleDesc: "Alternar entre modo Claro e Escuro",
    langSelectDesc: "Selecione seu idioma preferido",
    connectLcu: "Conectando ao Cliente...", vs1w: "vs 1 sem atrà¡s",
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    dashboard: "Visà£o Geral", tierlist: "Builds & Tips", leaderboards: "Rankings",
    replays: "Replays", overlays: "Overlays", collections: "Coleçàµes",
    esports: "Esports", datastudio: "Data Studio", matchups: "Matchups",
    watch: "Assistir",
    // Game Modes & Status
    queue_custom: "Personalizada", queue_draft: "Draft", queue_solo: "Ranked Solo", queue_flex: "Ranked Flex",
    queue_blind: "Às Cegas", queue_aram: "ARAM", queue_arena: "Arena", queue_urf: "URF", queue_coop: "Co-op vs IA",
    queue_unknown: "Desconhecido", ingame: "Em Jogo", playing: "Jogando", spectate_btn: "Assistir",
    // New Additions
    waiting_for_match: "Aguardando partida...", enter_game_live: "Por favor, entre em uma partida para ver estatà­sticas.", toggle_hint: "[CTRL+X] PARA ALTERNAR",
    team_blue: "Ordem (Azul)", team_red: "Caos (Vermelho)", you: "VOCÃƒÅ ", hot_streak: "SÉRIE",
    matchup_analysis: "Anà¡lise de Matchup", strategic_insight: "Insight Estratégico", counter_items: "Itens Counter Recomendados",
    esports_center: "Centro de Esports", switch_source: "Trocar Fonte", upcoming_matches: "Prà³ximas Partidas", latest_news: "ÃƒÅ¡ltimas Notà­cias",
    collections_title: "Coleçàµes", rankings_title: "Rankings", overlay_settings: "Configuraçàµes de Overlay",
    ingame_modules: "Mà³dulos no Jogo", launch_custom: "Inicie uma personalizada para configurar.", start_editor: "Iniciar Editor de Overlay",
    select_champion: "Selecionar Campeà£o", search_champion: "Buscar...",
    rank_header: "Rank", lp_header: "PdL", winrate_header: "Vità³rias", games_header: "Partidas", summoner_header: "Invocador",
    no_games_found: "Nenhuma partida encontrada", search_summoner_profile: "Buscar perfil de invocador", search_result: "Buscar",
    most_kills: "Mais Abates", dmg_dealt: "Dano Causado", vision_score: "Placar de Visà£o", cs_min: "CS / min", season_best: "MELHOR TEMPORADA",
    aggression: "Agressividade", farming: "Farm", vision_radar: "Visà£o", survival: "Sobrevivência", objective: "Objetivo",
    playstyle: "Estilo de Jogo", focus: "Foco", aggressive_carry: "Carry Agressivo", die_less: "Morrer Menos",
    skill_levelup: "Ordem de Habilidades", jungle_timers: "Timers da Jungle", objective_voting: "Votaçà£o de Objetivos", gold_diff: "Diferença de Ouro",
    skill_desc: "Mostra ordem das habilidades no HUD", jungle_desc: "Overlay do minimapa para campos", voting_desc: "Rastreamento de votos da equipe", gold_desc: "Estimativa de diferença de ouro",
    last_20_games: "ÃƒÅ¡ltimas 20 Partidas", summoner_not_found: "Invocador Nà£o Encontrado",
    strategic_desc_mock: "Irelia tem uma vantagem significativa no nà­vel 2. Procure trocas cedo. Evite Darius quando o E dele estiver disponà­vel. Faça Espada do Rei Destruà­do primeiro.",
    search_hint: "Buscar Nome#Tag (Regià£o Bloqueada)",
    region: "Regià£o",
    online: "Online", offline: "Offline",
    // Build View
    build_runes_season: "Build, Runas Temporada", patch: "Patch", recommended_plus: "P+ Recomendado",
    summoner_spells: "Feitiços de Invocador", skill_order: "Ordem de Habilidades",
    max_1st: "Max 1Ã‚Âº", max_2nd: "Max 2Ã‚Âº", max_3rd: "Max 3Ã‚Âº",
    boots_options: "Opçàµes de Botas", starters: "Itens Iniciais", core_build_path: "Caminho de Build Principal",
    matchups_analysis: "Anà¡lise de Matchups", strong_against: "Forte Contra", weak_against: "Fraco Contra",
    rune_path: "Caminho de Runas", launch: "Lanç.", winrate_trend: "Tendência Winrate (30 Dias)",
    // Matchup View
    matchup_analysis_title: "Anà¡lise de Matchup",
    lane_kill_rate: "Taxa de Abate na Rota", gold_15: "Ouro @ 15 min", early_wr: "Winrate Inicial", late_wr: "Winrate Final", first_tower: "Primeira Torre",
    analysis_direct: "Anà¡lise Direta", duel_vs: "Duelo contra", guide_matchup: "Guia de Matchup", rival: "RIVAL",
    searching: "Buscando...", sync_data: "Sincronizando...", coach_verdict: "Veredito Técnico", view_tips: "Ver Dicas", back_btn: "Voltar", matchup_tips_title: "Dicas de Matchup",
    // Profile & Replays
    profile_not_found: "Perfil Nà£o Encontrado", summoner_not_found_desc: "Jogador nà£o encontrado ou nà£o existe nesta regià£o.",
    recent_matches: "Partidas Recentes", no_match_found: "Nenhuma partida encontrada...", phase_label: "Fase",
    no_partners: "Sem jogadores recentes", games_played: "Jogos", top_champions: "Melhores Campeàµes", recent_players: "Jogadores Recentes",
    loading_replays: "Carregando replays...", and_ai_coaching: "& Coaching IA", replays_desc: "Assista seus jogos e receba dicas personalizadas.",
    games_found: "Jogos encontrados", watchable: "Assistà­veis", ai_analyzer_title: "Analisador IA Oracle",
    ai_analyzer_desc: "Selecione um jogo para gerar um relatà³rio completo.",
    analyzing_caps: "ANALISANDO...", close_duel: "Fechar Duelo", analyze_duel: "Analisar Duelo", opponent: "Oponente",
    sync_data_opp: "Sincronizando...", key_tips: "Dicas Chave", analysis_timeline: "Linha do Tempo", events: "EVENTOS",
    tactical_analysis: "Anà¡lise tà¡tica...", watch_replay: "Ver Replay",
    stat_obj_focus: "Foco Objetivos", stat_mechanics: "Mecânicas", stat_kda_perf: "Perf. KDA", stat_farming: "Farming",
    matchup_desc_example: "tem vantagem significativa no nà­vel 2. Busque trocas cedo.",
    // Tips
    tip_deaths_title: "Mortes Excessivas", tip_deaths_desc: "Taxa de mortalidade alta.",
    tip_survival_title: "Sobrevivência Perfeita", tip_survival_desc: "Nenhuma morte. Posicionamento perfeito.",
    tip_csm_title: "Déficit de Farm", tip_csm_desc: "CS/min crà­tico. Priorize minions.",
    tip_multikill_title: "Multi-Kill", tip_multikill_desc: "Êœtima gestà£o de luta.",
    tip_vision_elite_title: "Visà£o Elite", tip_vision_elite_desc: "Controle de mapa superior.",
    tip_vision_poor_title: "Cegueira de Mapa", tip_vision_poor_desc: "Baixa pontuaçà£o de visà£o.",
    tip_firstblood_title: "First Blood", tip_firstblood_desc: "Grande vantagem inicial.",
    tip_objective_title: "Foco Objetivos", tip_objective_desc: "Pressà£o em Torres/Dragàµes.",
    tip_cc_title: "Mestre do CC", tip_cc_desc: "Uso excelente de controle.",
    tip_gold_title: "Capitalizaçà£o Eco", tip_gold_desc: "Geraçà£o massiva de ouro.",
    tip_tank_title: "Resiliência Absoluta", tip_tank_desc: "Grande mitigaçà£o de dano.",
    tip_jungle_title: "Ritmo de Jungle", tip_jungle_desc: "Limpeza muito lenta.",
    tip_default_title: "Otimizaçà£o Ouro", tip_default_desc: "Foque em farmar.",
    // Verdicts
    verdict_pivot: "Oracle : Pivô Estratégico. Você foi o motor do seu time. Sua participaçà£o definiu o ritmo da partida. Você estava em todos os lugares, transformando escaramuças em vantagens globais.",
    verdict_soul: "Oracle : Ceifador de Almas. Domà­nio Econômico. Você nà£o apenas venceu sua rota; levou seu oponente à  falência. Ao negar recursos, você tornou o inimigo irrelevante.",
    verdict_fatal: "Oracle : Eficiência Fatal. Precisà£o Ciràºrgica. Você maximizou cada moeda de ouro gasta. Seu dano comparado à  sua economia foi excepcional. Nà£o precisa de build completa para ser letal.",
    verdict_pillar: "Oracle : Pilar da Vità³ria. A Rocha. Você foi a base confià¡vel que seu time precisava. Sua presença em momentos cruciais e macro jogo sà³lido garantiram a vità³ria.",
    verdict_vuln: "Oracle : Fardo. Você passou mais tempo morto do que impactando o mapa. Seus erros de posicionamento deram ouro e ritmo de graça. Pare de forçar jogadas quando estiver atrà¡s.",
    verdict_eco: "Oracle : Asfixia Econômica. Fome de Recursos. Você falhou no bà¡sico: farm. Lutar com desvantagem de itens é uma estratégia perdedora. Priorize as ondas de minions.",
    verdict_leader: "Oracle : Lobo Solità¡rio. Jogou bem individualmente, mas nà£o traduziu sua vantagem para o time. KDA nà£o destrà³i o Nexus. Use sua força para cobrir seus aliados.",
    verdict_defeat: "Oracle : Colapso Macro. Mecanicamente decente, mas perdeu o mapa. Você deixou o inimigo ditar as rotaçàµes. Revise suas decisàµes no meio do jogo.",
    verdict_intro: "Oracle :",
    profile_not_found_title: "Perfil Nà£o Encontrado",
    profile_not_found_desc: "O jogador nà£o foi encontrado ou nà£o existe nesta regià£o.",
    others: "Outros",
  },
  de: {
    overview: "ÃƒÅ“bersicht", champions: "Champions", prohub: "Pro Hub", draft: "Draft", live: "Live",
    profile: "Profil", settings: "Einstellungen", connected: "Verbunden", disconnected: "Getrennt",
    searchPlaceholder: "Beschwà¶rer suchen...", visualStyle: "Visueller Stil", colorTheme: "Farbthema",
    language: "Sprache", startup: "Beim Start à¶ffnen", glass: "Glas", opaque: "Undurchsichtig",
    themeToggle: "Hell/Dunkel umschalten", chooseStyle: "Visuelles Erscheinungsbild",
    chooseLang: "Wà¤hlen Sie Ihre Sprache", startupDesc: "Automatisches Startverhalten",
    metaTierList: "Meta Tier List", proReplays: "Pro Replays", waitingMatch: "Warte auf Match",
    clientDisconnected: "Client Getrennt", liveMatch: "LIVE MATCH",
    rank: "Rang", champion: "Champion", role: "Rolle", winrate: "Siegesrate", ban: "Bannrate", tier: "Tier",
    kda: "KDA", dpmScore: "Oracle Score", kp: "KP", csm: "CSM", vision: "Sichtwertung", gpm: "GPM",
    match_history: "Spielverlauf", records: "Aufzeichnungen", coming_soon: "Demnà¤chst verfà¼gbar...",
    behavioral: "Verhalten", lens: "Oracle Lens", performance: "Leistung nach Champion", pings: "Gesamt-Pings",
    all: "Alle",
    explore_oracle: "Erkunden Sie ORACLE", season: "Saison 15", owned_skins: "Besitzte Skins",
    survivability: "ÃƒÅ“berlebensfà¤higkeit", tf_deaths: "Teamfight-Tode",
    mvp: "MVP", score: "Punktzahl", deaths: "Tode", ka: "Kills + Assists",
    early: "FRÃƒÅ“H", mid: "MITTE", late: "SPÊžT", live_pro: "LIVE PRO", spectate: "Zuschauen",
    replay: "WIEDERHOLUNG", victory: "Sieg", defeat: "Niederlage", theme_dark: "Dunkel", theme_light: "Hell",
    visual_glass: "Glas", visual_opaque: "Undurchsichtig", solo_duo: "Solo/Duo", flex: "Flex", aram: "ARAM",
    appearance: "Aussehen", chooseStyleDesc: "Wà¤hlen Sie zwischen Glas oder Solid",
    themeToggleDesc: "Zwischen Hell- und Dunkelmodus wechseln",
    langSelectDesc: "Wà¤hlen Sie Ihre Sprache",
    connectLcu: "Verbinde mit League Client...", vs1w: "vs vor 1 Woche",
    search_hint: "Suche Name#Tag", region: "Region",
    online: "Online", offline: "Offline",
    build_runes_season: "Build, Runen Saison", patch: "Patch", recommended_plus: "P+ Empfohlen",
    summoner_spells: "Beschwà¶rerzauber", skill_order: "Fà¤higkeiten-Reihenfolge",
    max_1st: "Max 1.", max_2nd: "Max 2.", max_3rd: "Max 3.",
    boots_options: "Stiefel-Optionen", starters: "Startgegenstà¤nde", core_build_path: "Immer bauen",
    matchups_analysis: "Matchup-Analyse", strong_against: "Stark gegen", weak_against: "Schwach gegen",
    rune_path: "Runenpfad", launch: "Start", winrate_trend: "Siegesrate Trend",
    matchup_analysis_title: "Matchup-Analyse",
    lane_kill_rate: "Lane Kill-Rate", gold_15: "Gold @ 15 Min", early_wr: "Siegquote (Frà¼h)", late_wr: "Siegquote (Spà¤t)", first_tower: "Erster Turm",
    select_champion: "Champion wà¤hlen", search_champion: "Suche...", strategic_insight: "Strategische Einsicht", counter_items: "Counter Items",
    esports_center: "Esports Center", switch_source: "Quelle wechseln", upcoming_matches: "Kommende Matches", latest_news: "Aktuelle Nachrichten",
    matchups: "Matchups"
  },
  ru: {
    overview: "Obzor", champions: "Chempiony", prohub: "Pro Hub", draft: "Draft", live: "Igra",
    profile: "Profil", settings: "Nastroyki", connected: "Podklyucheno", disconnected: "Otkl.",
    searchPlaceholder: "Poisk prizyvatelya...", visualStyle: "Stil", colorTheme: "Tema",
    language: "Yazyk", startup: "Avtozapusk", glass: "Steklo", opaque: "Neprozrachnyy",
    themeToggle: "Svetlaya/Temnaya", chooseStyle: "Vyberi stil",
    chooseLang: "Vyberi yazyk", startupDesc: "Zapusk pri starte Windows",
    metaTierList: "Meta Tir List", proReplays: "Pro Replays", waitingMatch: "Ozhidanie matcha",
    clientDisconnected: "Klient ne v seti", liveMatch: "LIVE MATCH",
    rank: "Rang", champion: "Chempion", role: "Rol", winrate: "Winrate", ban: "Ban Rate", tier: "Tier",
    kda: "KDA", dpmScore: "Oracle Score", kp: "KP", csm: "CSM", vision: "Ochki obzora", gpm: "GPM",
    match_history: "Istoriya matchey", records: "Zapisi", coming_soon: "Skoro...",
    behavioral: "Povedencheskiy", lens: "Oracle Linza", performance: "Proizvoditelnost po chempionu", pings: "Obshchie pingi",
    all: "Vse",
    explore_oracle: "Obzor Oracle App", season: "Sezon 15", owned_skins: "Kup. Skiny",
    survivability: "Vyzhivayemost", tf_deaths: "Smerti v TF",
    mvp: "MVP", score: "schet", deaths: "Smerti", ka: "Ubiystva + Pomosch",
    early: "RANN.", mid: "SRED.", late: "POZD.", live_pro: "LIVE PRO", spectate: "Smotret",
    replay: "POVTOR", victory: "Pobeda", defeat: "Porazhenie", theme_dark: "Temnaya", theme_light: "Svetlaya",
    visual_glass: "Steklo", visual_opaque: "Neprozr.",
    solo_duo: "Solo/Duo", flex: "Gibkaya", aram: "ARAM",
    appearance: "Vneshniy vid", chooseStyleDesc: "Vyberite steklo ili neprozrachnyy",
    themeToggleDesc: "Perekl. Svetlaya/Temnaya tema",
    langSelectDesc: "Vyberite vash yazyk",
    connectLcu: "Podklyuch. k klientu...", vs1w: "vs 1 ned. nazad",
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    dashboard: "Obzor", tierlist: "Builds & Tips", leaderboards: "Reytingi",
    replays: "Povtory", overlays: "Overlei", collections: "Kollektsii",
    esports: "Esports", datastudio: "Data Studio", matchups: "Matchups",
    watch: "Smotret"
  },
  ja: {
    overview: "Ã¦Â¦â€šèÂ¦Â", champions: "Ã£Æ’ÂÃ£Æ’Â£Ã£Æ’Â³Ã£Æ’â€Ã£â€šÂªÃ£Æ’Â³", prohub: "Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’ÂÃ£Æ’â€“", draft: "Ã£Æ’â€°Ã£Æ’Â©Ã£Æ’â€¢Ã£Æ’Ë†", live: "Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â€“",
    profile: "Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’â€¢Ã£â€šÂ£Ã£Æ’Â¼Ã£Æ’Â«", settings: "èÂ¨Â­Ã¥Â®Å¡", connected: "Ã¦Å½Â¥çÂ¶Å¡Ã¦Â¸Ë†Ã£ÂÂ¿", disconnected: "Ã¦Å“ÂªÃ¦Å½Â¥çÂ¶Å¡",
    searchPlaceholder: "Ã£â€šÂµÃ£Æ’Â¢Ã£Æ’Å Ã£Æ’Â¼Ã¦Â¤Å“çÂ´Â¢...", visualStyle: "Ã£Æ’â€œÃ£â€šÂ¸Ã£Æ’Â¥Ã£â€šÂ¢Ã£Æ’Â«", colorTheme: "Ã£Æ’â€ Ã£Æ’Â¼Ã£Æ’Å¾",
    language: "èÂ¨â‚¬èÂªÅ¾", startup: "Ã£â€šÂ¹Ã£â€šÂ¿Ã£Æ’Â¼Ã£Æ’Ë†Ã£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”", glass: "Ã£â€šÂ¬Ã£Æ’Â©Ã£â€šÂ¹", opaque: "Ã¤Â¸Âéâ‚¬ÂÃ¦ËœÅ½",
    themeToggle: "Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Ë†/Ã£Æ’â‚¬Ã£Æ’Â¼Ã£â€šÂ¯Ã¥Ë†â€¡Ã¦â€ºÂ¿", chooseStyle: "Ã£â€šÂ¹Ã£â€šÂ¿Ã£â€šÂ¤Ã£Æ’Â«Ã£â€šâ€™éÂÂ¸Ã¦Å Å¾",
    chooseLang: "èÂ¨â‚¬èÂªÅ¾Ã£â€šâ€™éÂÂ¸Ã¦Å Å¾", startupDesc: "WindowsèÂµÂ·Ã¥â€¹â€¢Ã¦â„¢â€šÃ£ÂÂ«Ã¥Â®Å¸èÂ¡Å’",
    metaTierList: "Ã£Æ’Â¡Ã£â€šÂ¿Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¢Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†", proReplays: "Ã£Æ’â€”Ã£Æ’Â­Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤", waitingMatch: "Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’ÂÃ¥Â¾â€¦Ã¦Â©Å¸Ã¤Â¸Â­",
    clientDisconnected: "Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†Ã¦Å“ÂªÃ¦Å½Â¥çÂ¶Å¡", liveMatch: "Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â€“Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’Â",
    rank: "Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ¯", champion: "Ã£Æ’ÂÃ£Æ’Â£Ã£Æ’Â³Ã£Æ’â€Ã£â€šÂªÃ£Æ’Â³", role: "Ã£Æ’Â­Ã£Æ’Â¼Ã£Æ’Â«", winrate: "Ã¥â€¹ÂçÅ½â€¡", ban: "Ã£Æ’ÂÃ£Æ’Â³çÅ½â€¡", tier: "Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¢",
    kda: "KDA", dpmScore: "OracleÃ£â€šÂ¹Ã£â€šÂ³Ã£â€šÂ¢", kp: "KP", csm: "CSM", vision: "èÂ¦â€“çâ€¢Å’Ã£â€šÂ¹Ã£â€šÂ³Ã£â€šÂ¢", gpm: "GPM",
    match_history: "èÂ©Â¦Ã¥ÂË†Ã¥Â±Â¥Ã¦Â­Â´", records: "èÂ¨ËœéÅ’Â²", coming_soon: "èÂ¿â€˜Ã¦â€”Â¥Ã¥â€¦Â¬éâ€“â€¹...",
    behavioral: "èÂ¡Å’Ã¥â€¹â€¢", lens: "OracleÃ£Æ’Â¬Ã£Æ’Â³Ã£â€šÂº", performance: "Ã£Æ’ÂÃ£Æ’Â£Ã£Æ’Â³Ã£Æ’â€Ã£â€šÂªÃ£Æ’Â³Ã¥Ë†Â¥Ã£Æ’â€˜Ã£Æ’â€¢Ã£â€šÂ©Ã£Æ’Â¼Ã£Æ’Å¾Ã£Æ’Â³Ã£â€šÂ¹", pings: "Ã¥ÂË†èÂ¨Ë†Ã£Æ’â€Ã£Æ’Â³Ã£â€šÂ°",
    all: "Ã£Ââ„¢Ã£ÂÂ¹Ã£ÂÂ¦",
    explore_oracle: "OracleÃ£â€šÂ¢Ã£Æ’â€”Ã£Æ’ÂªÃ£â€šâ€™Ã¦Å½Â¢çÂ´Â¢", season: "Ã£â€šÂ·Ã£Æ’Â¼Ã£â€šÂºÃ£Æ’Â³15", owned_skins: "Ã¦â€°â‚¬Ã¦Å’ÂÃ£â€šÂ¹Ã£â€šÂ­Ã£Æ’Â³",
    survivability: "çâ€Å¸Ã¥Â­ËœçÅ½â€¡", tf_deaths: "éâ€ºâ€ Ã¥â€ºÂ£Ã¦Ë†Â¦Ã£Æ’â€¡Ã£â€šÂ¹",
    mvp: "MVP", score: "Ã£â€šÂ¹Ã£â€šÂ³Ã£â€šÂ¢", deaths: "Ã£Æ’â€¡Ã£â€šÂ¹", ka: "Ã£â€šÂ­Ã£Æ’Â« + Ã£â€šÂ¢Ã£â€šÂ·Ã£â€šÂ¹Ã£Æ’Ë†",
    early: "Ã¥ÂºÂçâ€ºÂ¤", mid: "Ã¤Â¸Â­çâ€ºÂ¤", late: "çÂµâ€šçâ€ºÂ¤", live_pro: "Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’â€“Ã£Æ’â€”Ã£Æ’Â­", spectate: "èÂ¦Â³Ã¦Ë†Â¦",
    replay: "Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤", victory: "Ã¥â€¹ÂÃ¥Ë†Â©", defeat: "Ã¦â€¢â€”Ã¥Å’â€”", theme_dark: "Ã£Æ’â‚¬Ã£Æ’Â¼Ã£â€šÂ¯", theme_light: "Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Ë†",
    visual_glass: "Ã£â€šÂ¬Ã£Æ’Â©Ã£â€šÂ¹", visual_opaque: "Ã¤Â¸Âéâ‚¬ÂÃ¦ËœÅ½",
    appearance: "Ã¥Â¤â€“èÂ¦Â³", chooseStyleDesc: "Ã£â€šÂ¬Ã£Æ’Â©Ã£â€šÂ¹Ã£Ââ€¹Ã¤Â¸Âéâ‚¬ÂÃ¦ËœÅ½Ã£Ââ€¹Ã£â€šâ€™éÂÂ¸Ã¦Å Å¾",
    themeToggleDesc: "Ã£Æ’Â©Ã£â€šÂ¤Ã£Æ’Ë†/Ã£Æ’â‚¬Ã£Æ’Â¼Ã£â€šÂ¯Ã£Æ’Â¢Ã£Æ’Â¼Ã£Æ’â€°Ã¥Ë†â€¡Ã¦â€ºÂ¿",
    langSelectDesc: "èÂ¨â‚¬èÂªÅ¾Ã£â€šâ€™éÂÂ¸Ã¦Å Å¾Ã£Ââ€”Ã£ÂÂ¦Ã£ÂÂÃ£ÂÂ Ã£Ââ€¢Ã£Ââ€ž",
    connectLcu: "Ã£â€šÂ¯Ã£Æ’Â©Ã£â€šÂ¤Ã£â€šÂ¢Ã£Æ’Â³Ã£Æ’Ë†Ã£ÂÂ«Ã¦Å½Â¥çÂ¶Å¡Ã¤Â¸Â­...", vs1w: "1éâ‚¬Â±éâ€“â€œÃ¥â€°Â",
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    dashboard: "Ã¦Â¦â€šèÂ¦Â", tierlist: "Ã£Æ’â€ Ã£â€šÂ£Ã£â€šÂ¢Ã£Æ’ÂªÃ£â€šÂ¹Ã£Æ’Ë†", leaderboards: "Ã£Æ’Â©Ã£Æ’Â³Ã£â€šÂ­Ã£Æ’Â³Ã£â€šÂ°",
    replays: "Ã£Æ’ÂªÃ£Æ’â€”Ã£Æ’Â¬Ã£â€šÂ¤", overlays: "Ã£â€šÂªÃ£Æ’Â¼Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’Â¬Ã£â€šÂ¤", collections: "Ã£â€šÂ³Ã£Æ’Â¬Ã£â€šÂ¯Ã£â€šÂ·Ã£Æ’Â§Ã£Æ’Â³",
    esports: "eÃ£â€šÂ¹Ã£Æ’ÂÃ£Æ’Â¼Ã£Æ’â€ž", datastudio: "Ã£Æ’â€¡Ã£Æ’Â¼Ã£â€šÂ¿Ã£â€šÂ¹Ã£â€šÂ¿Ã£â€šÂ¸Ã£â€šÂª", matchups: "Ã£Æ’Å¾Ã£Æ’Æ’Ã£Æ’ÂÃ£â€šÂ¢Ã£Æ’Æ’Ã£Æ’â€”",
    watch: "èÂ¦Â³Ã¦Ë†Â¦"
  },
  ko: {
    overview: "ÃªÂ°Å“Ã¬Å¡â€", champions: "Ã¬Â±â€Ã­â€Â¼Ã¬â€“Â¸", prohub: "Ã­â€â€žëÂ¡Å“ Ã­â€”Ë†ëÂ¸Å’", draft: "ëâ€œÅ“ëÅ¾ËœÃ­â€â€žÃ­Å Â¸", live: "ëÂÂ¼Ã¬ÂÂ´ëÂ¸Å’",
    profile: "Ã­â€â€žëÂ¡Å“Ã­â€¢â€ž", settings: "Ã¬â€žÂ¤Ã¬Â â€¢", connected: "Ã¬â€”Â°ÃªÂ²Â°ëÂÂ¨", disconnected: "Ã¬â€”Â°ÃªÂ²Â° ëÂÅ ÃªÂ¹â‚¬",
    searchPlaceholder: "Ã¬â€ Å’Ã­â„¢ËœÃ¬â€šÂ¬ ÃªÂ²â‚¬Ã¬Æ’â€°...", visualStyle: "ëÂ¹â€žÃ¬Â£Â¼Ã¬â€“Â¼ Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼", colorTheme: "Ã­â€¦Å’ëÂ§Ë†",
    language: "Ã¬â€“Â¸Ã¬â€“Â´", startup: "Ã¬â€¹Å“Ã¬Å¾â€˜ Ã­â€â€žëÂ¡Å“ÃªÂ·Â¸ëÅ¾Â¨", glass: "ÃªÂ¸â‚¬ëÅ¾ËœÃ¬Å Â¤", opaque: "ëÂ¶Ë†Ã­Ë†Â¬ëÂªâ€¦",
    themeToggle: "ëÂÂ¼Ã¬ÂÂ´Ã­Å Â¸/ëâ€¹Â¤Ã­ÂÂ¬ Ã¬Â â€žÃ­â„¢Ëœ", chooseStyle: "Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼ Ã¬â€žÂ Ã­Æ’Â",
    chooseLang: "Ã¬â€“Â¸Ã¬â€“Â´ Ã¬â€žÂ Ã­Æ’Â", startupDesc: "Windows Ã¬â€¹Å“Ã¬Å¾â€˜ Ã¬â€¹Å“ Ã¬Å¾ÂëÂâ„¢ Ã¬â€¹Â¤Ã­â€“â€°",
    metaTierList: "ëÂ©â€Ã­Æ’â‚¬ Ã­â€¹Â°Ã¬â€“Â´ ëÂ¦Â¬Ã¬Å Â¤Ã­Å Â¸", proReplays: "Ã­â€â€žëÂ¡Å“ ëÂ¦Â¬Ã­â€Å’ëÂ Ë†Ã¬ÂÂ´", waitingMatch: "ëÂ§Â¤Ã¬Â¹Ëœ ëÅ’â‚¬ÃªÂ¸Â° Ã¬Â¤â€˜",
    clientDisconnected: "Ã­ÂÂ´ëÂÂ¼Ã¬ÂÂ´Ã¬â€“Â¸Ã­Å Â¸ Ã¬â€”Â°ÃªÂ²Â° ëÂÅ ÃªÂ¹â‚¬", liveMatch: "ëÂÂ¼Ã¬ÂÂ´ëÂ¸Å’ ëÂ§Â¤Ã¬Â¹Ëœ",
    rank: "Ã¬Ë†Å“Ã¬Å“â€ž", champion: "Ã¬Â±â€Ã­â€Â¼Ã¬â€“Â¸", role: "Ã¬â€”Â­Ã­â€¢Â ", winrate: "Ã¬Å Â¹ëÂ¥Â ", ban: "ëÂ°Â´Ã¬Å“Â¨", tier: "Ã­â€¹Â°Ã¬â€“Â´",
    kda: "KDA", dpmScore: "Oracle Ã¬Â ÂÃ¬Ë†Ëœ", kp: "KP", csm: "CSM", vision: "Ã¬â€¹Å“Ã¬â€¢Â¼ Ã¬Â ÂÃ¬Ë†Ëœ", gpm: "GPM",
    match_history: "ÃªÂ²Â½ÃªÂ¸Â° ÃªÂ¸Â°ëÂ¡Â", records: "ÃªÂ¸Â°ëÂ¡Â", coming_soon: "Ã¬Â¶Å“Ã¬â€¹Å“ Ã¬ËœË†Ã¬Â â€¢...",
    behavioral: "Ã­â€“â€°ëÂâ„¢", lens: "Oracle ëÂ Å’Ã¬Â¦Ë†", performance: "Ã¬Â±â€Ã­â€Â¼Ã¬â€“Â¸ëÂ³â€ž Ã¬â€žÂ±ëÅ Â¥", pings: "Ã¬Â´Â Ã­â€¢â€˜",
    all: "ëÂªÂ¨ëâ€˜Â",
    explore_oracle: "Oracle Ã¬â€¢Â± Ã­Æ’ÂÃ¬Æ’â€°", season: "Ã¬â€¹Å“Ã¬Â¦Å’ 15", owned_skins: "ëÂ³Â´Ã¬Å“Â  Ã¬Å Â¤Ã­â€šÂ¨",
    survivability: "Ã¬Æ’ÂÃ¬Â¡Â´ëÂ Â¥", tf_deaths: "Ã­â€¢Å“Ã­Æ’â‚¬ ëÂÂ°Ã¬Å Â¤",
    mvp: "MVP", score: "Ã¬Â ÂÃ¬Ë†Ëœ", deaths: "ëÂÂ°Ã¬Å Â¤", ka: "Ã­â€šÂ¬ + Ã¬â€“Â´Ã¬â€¹Å“Ã¬Å Â¤Ã­Å Â¸",
    early: "Ã¬Â´Ë†ëÂ°Ëœ", mid: "Ã¬Â¤â€˜ëÂ°Ëœ", late: "Ã­â€ºâ€žëÂ°Ëœ", live_pro: "ëÂÂ¼Ã¬ÂÂ´ëÂ¸Å’ Ã­â€â€žëÂ¡Å“", spectate: "ÃªÂ´â‚¬Ã¬Â â€ž",
    replay: "ëÂ¦Â¬Ã­â€Å’ëÂ Ë†Ã¬ÂÂ´", victory: "Ã¬Å Â¹ëÂ¦Â¬", defeat: "Ã­Å’Â¨ëÂ°Â°", theme_dark: "ëâ€¹Â¤Ã­ÂÂ¬", theme_light: "ëÂÂ¼Ã¬ÂÂ´Ã­Å Â¸",
    visual_glass: "ÃªÂ¸â‚¬ëÅ¾ËœÃ¬Å Â¤", visual_opaque: "ëÂ¶Ë†Ã­Ë†Â¬ëÂªâ€¦",
    appearance: "Ã¬â„¢Â¸ÃªÂ´â‚¬", chooseStyleDesc: "ÃªÂ¸â‚¬ëÅ¾ËœÃ¬Å Â¤ ëËœÂëÅ â€ Ã¬â€ â€ëÂ¦Â¬ëâ€œÅ“ Ã¬Å Â¤Ã­Æ’â‚¬Ã¬ÂÂ¼ Ã¬â€žÂ Ã­Æ’Â",
    themeToggleDesc: "ëÂÂ¼Ã¬ÂÂ´Ã­Å Â¸/ëâ€¹Â¤Ã­ÂÂ¬ ëÂªÂ¨ëâ€œÅ“ Ã¬Â â€žÃ­â„¢Ëœ",
    langSelectDesc: "Ã¬â€“Â¸Ã¬â€“Â´ëÂ¥Â¼ Ã¬â€žÂ Ã­Æ’ÂÃ­â€¢ËœÃ¬â€žÂ¸Ã¬Å¡â€",
    connectLcu: "ëÂ¦Â¬ÃªÂ·Â¸ Ã­ÂÂ´ëÂÂ¼Ã¬ÂÂ´Ã¬â€“Â¸Ã­Å Â¸ Ã¬â€”Â°ÃªÂ²Â° Ã¬Â¤â€˜...", vs1w: "1Ã¬Â£Â¼ Ã¬Â â€ž",
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    dashboard: "ÃªÂ°Å“Ã¬Å¡â€", tierlist: "Ã­â€¹Â°Ã¬â€“Â´ëÂ¦Â¬Ã¬Å Â¤Ã­Å Â¸", leaderboards: "ëÅ¾Â­Ã­â€šÂ¹",
    replays: "ëÂ¦Â¬Ã­â€Å’ëÂ Ë†Ã¬ÂÂ´", overlays: "Ã¬ËœÂ¤ëÂ²â€žëÂ Ë†Ã¬ÂÂ´", collections: "Ã¬Â»Â¬ëÂ â€°Ã¬â€¦Ëœ",
    esports: "eÃ¬Å Â¤Ã­ÂÂ¬Ã¬Â¸Â ", datastudio: "ëÂÂ°Ã¬ÂÂ´Ã­â€žÂ° Ã¬Å Â¤Ã­Å Å“ëâ€â€Ã¬ËœÂ¤", matchups: "ëÂ§Â¤Ã¬Â¹ËœÃ¬â€”â€¦",
    watch: "ÃªÂ´â‚¬Ã¬Â â€ž"
  },
  zh: {
    overview: "Ã¦Â¦â€šèÂ§Ë†", champions: "èâ€¹Â±éâ€ºâ€ž", prohub: "èÂÅ’Ã¤Â¸Å¡Ã¤Â¸Â­Ã¥Â¿Æ’", draft: "BPçÅ½Â¯èÅ â€š", live: "Ã¥Â®Å¾Ã¦â€”Â¶Ã¥Â¯Â¹Ã¥Â±â‚¬",
    profile: "Ã¤Â¸ÂªÃ¤ÂºÂºèÂµâ€žÃ¦â€“â„¢", settings: "èÂ®Â¾çÂ½Â®", connected: "Ã¥Â·Â²èÂ¿Å¾Ã¦Å½Â¥", disconnected: "Ã¦Å“ÂªèÂ¿Å¾Ã¦Å½Â¥",
    searchPlaceholder: "Ã¦ÂÅ“çÂ´Â¢Ã¥ÂÂ¬Ã¥â€Â¤Ã¥Â¸Ë†...", visualStyle: "èÂ§â€ èÂ§â€°éÂ£Å½Ã¦Â Â¼", colorTheme: "éÂ¢Å“èâ€°Â²Ã¤Â¸Â»éÂ¢Ëœ",
    language: "èÂ¯Â­èÂ¨â‚¬", startup: "Ã¥Â¼â‚¬Ã¦Å“Âºèâ€¡ÂªÃ¥ÂÂ¯", glass: "çÅ½Â»çâ€™Æ’", opaque: "Ã¤Â¸Âéâ‚¬ÂÃ¦ËœÅ½",
    themeToggle: "Ã¥Ë†â€¡Ã¦ÂÂ¢ Ã¤ÂºÂ®èâ€°Â²/Ã¦Å¡â€”èâ€°Â²", chooseStyle: "éâ‚¬â€°Ã¦â€¹Â©çÅ½Â»çâ€™Æ’Ã¦Ë†â€“Ã¤Â¸Âéâ‚¬ÂÃ¦ËœÅ½éÂ£Å½Ã¦Â Â¼",
    chooseLang: "éâ‚¬â€°Ã¦â€¹Â©Ã¤Â½Â çÅ¡â€žèÂ¯Â­èÂ¨â‚¬", startupDesc: "WindowsÃ¥ÂÂ¯Ã¥Å Â¨Ã¦â€”Â¶èâ€¡ÂªÃ¥Å Â¨èÂ¿ÂèÂ¡Å’",
    metaTierList: "çâ€°Ë†Ã¦Å“Â¬Ã¦Â¢Â¯éËœÅ¸", proReplays: "èÂÅ’Ã¤Â¸Å¡Ã¥â€ºÅ¾Ã¦â€Â¾", waitingMatch: "çÂ­â€°Ã¥Â¾â€¦Ã¥Â¯Â¹Ã¥Â±â‚¬",
    clientDisconnected: "Ã¥Â®Â¢Ã¦Ë†Â·çÂ«Â¯Ã¦Å“ÂªèÂ¿Å¾Ã¦Å½Â¥", liveMatch: "Ã¥Â®Å¾Ã¦â€”Â¶Ã¥Â¯Â¹Ã¥Â±â‚¬",
    rank: "Ã¦Å½â€™Ã¥ÂÂ", champion: "èâ€¹Â±éâ€ºâ€ž", role: "Ã¤Â½ÂçÂ½Â®", winrate: "èÆ’Å“çÅ½â€¡", ban: "çÂ¦Âçâ€Â¨çÅ½â€¡", tier: "Ã¦Â¢Â¯éËœÅ¸",
    kda: "KDA", dpmScore: "OracleèÂ¯â€žÃ¥Ë†â€ ", kp: "Ã¥Ââ€šÃ¥â€ºÂ¢çÅ½â€¡", csm: "Ã¥Ë†â€ Ã¥Ââ€¡èÂ¡Â¥Ã¥Ë†â‚¬", vision: "èÂ§â€ éâ€¡Å½Ã¥Â¾â€”Ã¥Ë†â€ ", gpm: "Ã¥Ë†â€ Ã¥Ââ€¡çÂ»ÂÃ¦ÂµÅ½",
    match_history: "Ã¥Â¯Â¹Ã¥Â±â‚¬Ã¥Å½â€ Ã¥ÂÂ²", records: "èÂ®Â°Ã¥Â½â€¢", coming_soon: "Ã¥ÂÂ³Ã¥Â°â€ Ã¦Å½Â¨Ã¥â€¡Âº...",
    behavioral: "èÂ¡Å’Ã¤Â¸Âº", lens: "Oracleéâ‚¬Âéâ€¢Å“", performance: "èâ€¹Â±éâ€ºâ€žèÂ¡Â¨çÅ½Â°", pings: "Ã¦â‚¬Â»Ã¤Â¿Â¡Ã¥ÂÂ·",
    all: "Ã¥â€¦Â¨éÆ’Â¨",
    explore_oracle: "Ã¦Å½Â¢çÂ´Â¢OracleÃ¥Âºâ€çâ€Â¨", season: "èÂµâ€ºÃ¥Â­Â£ 15", owned_skins: "Ã¥Â·Â²Ã¦â€¹Â¥Ã¦Å“â€°çÅ¡â€žçÅ¡Â®èâ€šÂ¤",
    survivability: "çâ€Å¸Ã¥Â­ËœèÆ’Â½Ã¥Å â€º", tf_deaths: "Ã¥â€ºÂ¢Ã¦Ë†ËœÃ¦Â­Â»Ã¤ÂºÂ¡",
    mvp: "MVP", score: "èÂ¯â€žÃ¥Ë†â€ ", deaths: "Ã¦Â­Â»Ã¤ÂºÂ¡", ka: "Ã¥â€¡Â»Ã¦Ââ‚¬ + Ã¥Å Â©Ã¦â€Â»",
    early: "Ã¥â€°ÂÃ¦Å“Å¸", mid: "Ã¤Â¸Â­Ã¦Å“Å¸", late: "Ã¥ÂÅ½Ã¦Å“Å¸", live_pro: "èÂÅ’Ã¤Â¸Å¡çâ€ºÂ´Ã¦â€™Â­", spectate: "èÂ§â€šÃ¦Ë†Ëœ",
    replay: "Ã¥â€ºÅ¾Ã¦â€Â¾", victory: "èÆ’Å“Ã¥Ë†Â©", defeat: "Ã¥Â¤Â±èÂ´Â¥", theme_dark: "Ã¦Â·Â±èâ€°Â²", theme_light: "Ã¦Âµâ€¦èâ€°Â²",
    visual_glass: "çÅ½Â»çâ€™Æ’", visual_opaque: "Ã¤Â¸Âéâ‚¬ÂÃ¦ËœÅ½",
    appearance: "Ã¥Â¤â€“èÂ§â€š", chooseStyleDesc: "éâ‚¬â€°Ã¦â€¹Â©çÅ½Â»çâ€™Æ’Ã¦Ë†â€“Ã¤Â¸Âéâ‚¬ÂÃ¦ËœÅ½éÂ£Å½Ã¦Â Â¼",
    themeToggleDesc: "Ã¥Ë†â€¡Ã¦ÂÂ¢Ã¤ÂºÂ®èâ€°Â²/Ã¦Å¡â€”èâ€°Â²Ã¦Â¨Â¡Ã¥Â¼Â",
    langSelectDesc: "éâ‚¬â€°Ã¦â€¹Â©Ã¤Â½Â çÅ¡â€žéÂ¦â€“éâ‚¬â€°èÂ¯Â­èÂ¨â‚¬",
    connectLcu: "èÂ¿Å¾Ã¦Å½Â¥èâ€¹Â±éâ€ºâ€žèÂâ€çâ€ºÅ¸Ã¥Â®Â¢Ã¦Ë†Â·çÂ«Â¯...", vs1w: "1Ã¥â€˜Â¨Ã¥â€°Â",
    cat_core: "ORACLE CORE", cat_app: "ORACLE APP", cat_insights: "ORACLE INSIGHTS",
    dashboard: "Ã¦Â¦â€šèÂ§Ë†", tierlist: "Ã¦Â¢Â¯éËœÅ¸ & Ã¥â€¡ÂºèÂ£â€¦", leaderboards: "Ã¦Å½â€™èÂ¡Å’Ã¦Â¦Å“",
    replays: "Ã¥â€ºÅ¾Ã¦â€Â¾", overlays: "èÂ¦â€ çâ€ºâ€“Ã¥Â±â€š", collections: "Ã¦â€Â¶èâ€”Â",
    esports: "çâ€ÂµçÂ«Å¾", datastudio: "Ã¦â€¢Â°Ã¦ÂÂ®Ã¥Â·Â¥Ã¤Â½Å“Ã¥Â®Â¤", matchups: "Ã¥Â¯Â¹Ã¤Â½Â",
    watch: "èÂ§â€šçÅ“â€¹"
  }
};

const ipcRenderer = window.require
  ? window.require('electron').ipcRenderer
  : {
    invoke: () => Promise.resolve(null),
    on: () => { },
    send: () => { },
    removeListener: () => { }
  };



// Params Parser for Secondary Windows
const getQueryParams = () => {
  const params = new URLSearchParams(window.location.search);
  return {
    view: params.get('view'),
    mode: params.get('mode'),
    summoner: params.get('summoner')
  };
};


function DynamicCursorStyle() {
  const [accentColor, setAccentColor] = useState('59, 130, 246'); // Default blue RGB

  useEffect(() => {
    let lastColor = '';
    const interval = setInterval(() => {
      const cVal = getComputedStyle(document.documentElement).getPropertyValue('--color-accent-primary').trim();
      if (cVal && cVal !== lastColor) {
        lastColor = cVal;
        setAccentColor(cVal);
      }
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const svg = `
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="0" dy="2" stdDeviation="2" flood-color="rgba(0,0,0,0.3)" />
          <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="rgb(${accentColor})" flood-opacity="0.7" />
        </filter>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="rgba(255,255,255,1)" />
          <stop offset="100%" stop-color="rgba(230,240,255,0.9)" />
        </linearGradient>
      </defs>
      <path d="M7 7 L21 12.5 L14.5 14.5 L12.5 21 L7 7Z" fill="url(#grad)" stroke="url(#grad)" stroke-width="2.5" stroke-linejoin="round" stroke-linecap="round" filter="url(#glow)" />
    </svg>
  `.replace(/\s+/g, ' ').trim();

  const cursorUrl = `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;

  return (
    <style dangerouslySetInnerHTML={{
      __html: `
      * {
        cursor: url("${cursorUrl}") 8 8, auto !important;
      }
      a, button, [role="button"], input, select, textarea, .cursor-pointer {
        cursor: url("${cursorUrl}") 8 8, pointer !important;
      }
    `}} />
  );
}

function App() {
  const [appMode, setAppMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      return params.get('mode') || 'window';
    }
    return 'window';
  });
  const [windowParams, setWindowParams] = useState(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      return { view: p.get('view'), summoner: p.get('summoner') };
    }
    return {};
  });

  // Global Settings State (Managed here for consistency)
  const [theme, setTheme] = useState(localStorage.getItem('oracle_theme') || 'classic');
  const [visualMode, setVisualMode] = useState(localStorage.getItem('oracle_visual_mode') || 'glass');
  const [language, setLanguage] = useState(localStorage.getItem('oracle_language') || 'en');
  const [ddragonVersion, setDdragonVersion] = useState("14.2.1");

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = await res.json();
        if (versions && versions[0]) setDdragonVersion(versions[0]);
      } catch (e) { console.error("DDragon version fetch failed", e); }
    };
    fetchVersion();
  }, []);

  // Translation Helper
  const t = (key) => {
    return translations[language]?.[key] || translations['en'][key] || key;
  };

  const [overlaySettings, setOverlaySettings] = useState(() => {
    const defaults = {
      skillLevelUp: true,
      jungleTimers: true,
      goldDiff: true,
      loadingScreen: true,
      winRateToggle: true,
      junglePathing: true,
      wardTimer: true,
      objectiveTimer: true,
      testMode: false,
      positions: {
        winrate: { x: 40, y: 5 },
        jungle: { x: 2, y: 40 },
        skills: { x: 40, y: 85 },
        gold: { x: 75, y: 10 },
        notifications: { x: 80, y: 70 }
      },
      goldSound: true,
      riotApiKey: ''
    };

    const saved = localStorage.getItem('oracle_overlay_settings');
    if (!saved) return defaults;

    try {
      const parsed = JSON.parse(saved);
      const mergedPos = { ...defaults.positions };
      if (parsed.positions) {
        Object.keys(parsed.positions).forEach(key => {
          if (parsed.positions[key] && typeof parsed.positions[key] === 'object') {
            mergedPos[key] = { ...defaults.positions[key], ...parsed.positions[key] };
          }
        });
      }

      if (parsed.winProbabilityShortcut && ['CommandOrControl+X', 'CommandOrControl+C', 'CommandOrControl+V', 'CTRL+X', 'CTRL+C', 'CTRL+V'].includes(parsed.winProbabilityShortcut)) {
        parsed.winProbabilityShortcut = 'CommandOrControl+Shift+O';
      }

      return {
        ...defaults,
        ...parsed,
        positions: mergedPos
      };
    } catch (e) {
      return defaults;
    }
  });

  const triggerSocialToast = useCallback((data) => {
    if (window.ipcRenderer) {
      window.ipcRenderer.invoke('social:trigger-toast', data);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('oracle_overlay_settings', JSON.stringify(overlaySettings));
    
    let currentShortcut = overlaySettings.winProbabilityShortcut || 'CommandOrControl+Shift+O';
    // If the user's legacy saved settings has a locked shortcut, override it here
    if (['CommandOrControl+X', 'CommandOrControl+C', 'CommandOrControl+V', 'CTRL+X', 'CTRL+C', 'CTRL+V'].includes(currentShortcut)) {
        currentShortcut = 'CommandOrControl+Shift+O';
    }
    
    ipcRenderer.invoke('app:register-shortcut', currentShortcut);
    ipcRenderer.send('settings:updated', overlaySettings);
  }, [overlaySettings]);




  // Persistence Effects
  useEffect(() => {
    localStorage.setItem('oracle_theme', theme);
    // Remove all possible theme classes
    document.documentElement.classList.remove('theme-pourpre', 'theme-tempete', 'theme-radiant');

    // Always keep dark mode as base for these themes
    document.documentElement.classList.add('dark');

    // Add specific theme class if not classic
    if (theme === 'purple') document.documentElement.classList.add('theme-pourpre');
    else if (theme === 'storm') document.documentElement.classList.add('theme-tempete');
    else if (theme === 'radiant') document.documentElement.classList.add('theme-radiant');
  }, [theme]);

  useEffect(() => { localStorage.setItem('oracle_visual_mode', visualMode); }, [visualMode]);
  useEffect(() => { localStorage.setItem('oracle_language', language); }, [language]);

  // Listener for storage changes (to sync across windows if needed in future, 
  // though checking localStorage on mount is usually enough for new windows)
  useEffect(() => {
    const handleStorage = () => {
      setTheme(localStorage.getItem('oracle_theme') || 'dark');
      setVisualMode(localStorage.getItem('oracle_visual_mode') || 'glass');
      setLanguage(localStorage.getItem('oracle_language') || 'en');
    }
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);


  let content;
  if (appMode === 'window' && windowParams.view === 'profile') {
    content = <ProfileWindow summonerName={windowParams.summoner} theme={theme} visualMode={visualMode} t={t} />;
  } else if (appMode === 'live') {
    content = <LiveOverlay visualMode={visualMode} theme={theme} t={t} overlaySettings={overlaySettings} />;
  } else if (appMode === 'loading') {
    content = <LoadingOverlay visualMode={visualMode} theme={theme} t={t} overlaySettings={overlaySettings} />;
  } else if (appMode === 'toast') {
    content = <SocialToastOverlay ddragonVersion={ddragonVersion} />;
  } else if (appMode === 'music') {
    content = <MusicOverlay />;
  } else if (appMode === 'skills' || appMode === 'ingame') {
    content = <InGameHelper ddragonVersion={ddragonVersion} />;
  } else {
    content = (
      <MainApp
        theme={theme} setTheme={setTheme}
        visualMode={visualMode} setVisualMode={setVisualMode}
        language={language} setLanguage={setLanguage}
        t={t}
        appMode={appMode}
        overlaySettings={overlaySettings}
        setOverlaySettings={setOverlaySettings}
        triggerSocialToast={triggerSocialToast}
        ddragonVersion={ddragonVersion}
      />
    );
  }

  const [showQuitModal, setShowQuitModal] = useState(false);
  const [rememberCloseChoice, setRememberCloseChoice] = useState(false);

  useEffect(() => {
    if (window.ipcRenderer) {
      const handler = () => setShowQuitModal(true);
      window.ipcRenderer.on('show-quit-modal', handler);
      return () => {
         try { window.ipcRenderer.removeListener('show-quit-modal', handler); } catch(e){}
      };
    }
  }, []);

  const handleQuitChoice = async (choice) => {
    if (rememberCloseChoice && window.ipcRenderer) {
       let currSettings = await window.ipcRenderer.invoke('app:get-settings') || {};
       currSettings.closeBehavior = choice;
       await window.ipcRenderer.invoke('app:set-settings', currSettings);
    }
    
    setShowQuitModal(false);
    
    if (window.ipcRenderer) {
      if (choice === 'minimize') {
        window.ipcRenderer.invoke('app:minimize');
      } else if (choice === 'close') {
        window.ipcRenderer.invoke('app:quit');
      }
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent">
      {content}
      
      {/* Quit Modal */}
      {showQuitModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center animate-in fade-in duration-300 backdrop-blur-md bg-black/40">
          <div className="glass-panel max-w-md w-full p-6 mx-4 animate-in zoom-in-95 duration-300 shadow-2xl border border-white/10 dark:border-white/5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <LogOut size={20} className="text-accent-primary" />
              Quitter Oracle
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
              Voulez-vous fermer complètement l'application ou la réduire dans la zone de notification ?
            </p>
            
            <div className="flex flex-col gap-3">
              <button 
                onClick={() => handleQuitChoice('close')}
                className="w-full relative group overflow-hidden bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-between border border-red-500/20"
              >
                <span>Fermer complètement</span>
                <X size={18} className="translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </button>

              <button 
                onClick={() => handleQuitChoice('minimize')}
                className="w-full relative group overflow-hidden bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-gray-900 dark:text-white font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-between border border-gray-200 dark:border-white/10"
              >
                <span>Réduire dans la zone de notification</span>
                <Minus size={18} className="translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </button>

              <button 
                onClick={() => setShowQuitModal(false)}
                className="w-full py-2 px-4 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Annuler
              </button>
            </div>

            <label className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-200 dark:border-white/5 cursor-pointer group">
              <div className="relative flex items-center justify-center">
                <input 
                  type="checkbox" 
                  className="peer sr-only"
                  checked={rememberCloseChoice}
                  onChange={(e) => setRememberCloseChoice(e.target.checked)}
                />
                <div className="w-5 h-5 rounded border-2 border-gray-400 dark:border-gray-500 peer-checked:bg-accent-primary peer-checked:border-accent-primary transition-all"></div>
                <Check size={14} className="absolute text-white scale-0 peer-checked:scale-100 transition-transform" />
              </div>
              <span className="text-xs text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                Se souvenir de mon choix (modifiable dans les paramètres)
              </span>
            </label>
          </div>
        </div>
      )}

      {(appMode === 'music' || appMode === 'toast' || appMode === 'live' || appMode === 'skills' || appMode === 'ingame') && (
        <style>{`
  html, body, #root {
    background - color: transparent!important;
    background: transparent!important;
  }
  `}</style>
      )}
    </div>
  );
}

function SkillsOverlay({ ddragonVersion }) {
  const [skillOrder, setSkillOrder] = useState(null);
  const [champName, setChampName] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [overlaySettings, setOverlaySettings] = useState({ skillLevelUp: true });
  const timeoutRef = useRef(null);
  const lastPointsRef = useRef(-1);

  useEffect(() => {
    document.body.style.backgroundColor = 'transparent';
    document.documentElement.style.backgroundColor = 'transparent';
    if (!window.ipcRenderer) return;

    // Load initial settings and subscribe to syncs
    window.ipcRenderer.invoke('app:get-settings').then(s => setOverlaySettings(s?.overlaySettings || { skillLevelUp: true }));
    const handleSync = (_, s) => setOverlaySettings(s?.overlaySettings || { skillLevelUp: true });
    window.ipcRenderer.on('settings:sync', handleSync);

    window.ipcRenderer.on('skills:update', async (_, champ) => {
      setChampName(champ);
      try {
        const build = await window.ipcRenderer.invoke('scraper:get-champion-build', champ, 'mid');
        if (build && build.skillOrder) {
          setSkillOrder(build.skillOrder);
        }
      } catch (e) {
        console.error(e);
      }
    });

    // Poll live data to detect level up
    const interval = setInterval(async () => {
      try {
        const data = await window.ipcRenderer.invoke('live:get-all-data');
        if (data && data.activePlayer && data.allPlayers) {
          const active = data.activePlayer;
          const current = data.allPlayers.find(p => p.summonerName === active.summonerName);
          const level = current?.level || active.level || 1;

          if (active.abilities) {
            const totalPointsSpent = Object.values(active.abilities).reduce((sum, a) => sum + (a.abilityLevel || 0), 0);
            const pointsAvailable = level - totalPointsSpent;

            // Trigger visibility ON level up
            if (pointsAvailable > 0 && totalPointsSpent !== lastPointsRef.current) {
              lastPointsRef.current = totalPointsSpent;
              setIsVisible(true);

              if (timeoutRef.current) clearTimeout(timeoutRef.current);
              timeoutRef.current = setTimeout(() => setIsVisible(false), 5000); // Automatically hide after 5s
            }
          }
        }
      } catch (e) { }
    }, 1000);

    return () => {
      clearInterval(interval);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      window.ipcRenderer.removeListener('settings:sync', handleSync);
    };
  }, []);

  if (!skillOrder || (!isVisible && !overlaySettings.testMode) || !overlaySettings.skillLevelUp) return null;

  const skillsMapping = {
    'Q': { color: 'from-blue-600 to-blue-400', label: 'A', id: 'Q' },
    'W': { color: 'from-green-600 to-green-400', label: 'Z', id: 'W' },
    'E': { color: 'from-yellow-600 to-yellow-400', label: 'E', id: 'E' },
    'R': { color: 'from-purple-600 to-purple-400', label: 'R', id: 'R' }
  };

  const getMapping = (s) => skillsMapping[s] || skillsMapping['Q'];
  const maxOrder = skillOrder.filter(s => s !== "R");
  const uniqueMaxOrder = [...new Set(maxOrder)].slice(0, 3);
  const levelByLevel = skillOrder.slice(0, 15);

  return (
    <div className="w-full h-full p-2 select-none" style={{ WebkitAppRegion: 'drag' }}>
      <div className="bg-black/70 hover:bg-black/80 dark:bg-[#080a14]/90 dark:hover:bg-[#080a14]/95 backdrop-blur-[24px] rounded-2xl border border-white/20 p-3 h-full overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] flex flex-col justify-between" style={{ transform: 'translateZ(0)' }}>

        {/* Title and Champion */}
        <div className="flex items-center justify-between mb-2">
          <div className="text-white/60 font-medium text-xs uppercase tracking-wider flex items-center gap-1">
            <Star className="w-3 h-3 text-accent-primary" /> Max Order
            <div className="text-white/30 lowercase ml-1">{champName}</div>
          </div>
        </div>

        {/* Max Order Visual */}
        <div className="flex items-center gap-1.5 mb-2">
          {uniqueMaxOrder.map((s, idx) => {
            const keyObj = getMapping(s);
            return (
              <React.Fragment key={idx}>
                <div className={`w-6 h-6 rounded flex items-center justify-center font-bold text-xs bg-gradient-to-br ${keyObj.color} text-white shadow-lg border border-white/20`}>
                  {keyObj.label}
                </div>
                {idx < uniqueMaxOrder.length - 1 && (
                  <div className="text-white/30"><ChevronRight size={12} /></div>
                )}
              </React.Fragment>
            )
          })}
        </div>

        {/* Level by level detailed view up to 15 */}
        <div className="flex items-center gap-0.5 justify-start">
          {levelByLevel.map((s, idx) => {
            const keyObj = getMapping(s);
            return (
              <div key={idx} className="flex flex-col items-center">
                <div className="text-[8px] text-white/40 leading-none mb-0.5">{idx + 1}</div>
                <div className="w-4 h-4 rounded-sm flex items-center justify-center font-bold text-[9px] bg-white/10 text-white border border-white/5">
                  {keyObj.label}
                </div>
              </div>
            )
          })}
        </div>

      </div>
    </div>
  )
}

function MusicOverlay() {
  const [track, setTrack] = useState(null);
  const [progressMs, setProgressMs] = useState(0);
  const trackRef = useRef(track);
  trackRef.current = track;
  const isSeeking = useRef(false);

  useEffect(() => {
    document.body.style.backgroundColor = 'transparent';
    document.documentElement.style.backgroundColor = 'transparent';
    if (!window.ipcRenderer) return;

    const fetchTrack = async () => {
      try {
        const t = await window.ipcRenderer.invoke('media:get-track');
        setTrack(prev => {
          if (!isSeeking.current) {
            if (!prev || prev.title !== t?.title || prev.artist !== t?.artist) {
              setProgressMs(t?.positionMs || 0);
            } else if (t && Math.abs((t.positionMs || 0) - progressMs) > 3000) {
              setProgressMs(t.positionMs || 0);
            }
          }
          return t;
        });
      } catch (e) { }
    };

    fetchTrack();
    const iv = setInterval(fetchTrack, 2000);
    return () => clearInterval(iv);
  }, []);

  useEffect(() => {
    let lastTime = Date.now();
    const iv = setInterval(() => {
      const now = Date.now();
      const delta = now - lastTime;
      lastTime = now;
      const currentTrack = trackRef.current;
      if (currentTrack?.isPlaying && currentTrack?.durationMs) {
        setProgressMs(p => Math.min(p + delta, currentTrack.durationMs));
      }
    }, 1000);
    return () => clearInterval(iv);
  }, []);

  const handleAction = async (action) => {
    if (window.ipcRenderer) await window.ipcRenderer.invoke('media:run-action', action);
    if (action === 'playpause' && track) {
      setTrack(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    }
  };

  const handleSeek = async (e) => {
    if (!track || !track.durationMs) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const targetMs = Math.round(percent * track.durationMs);

    isSeeking.current = true;
    setProgressMs(targetMs);

    if (window.ipcRenderer) {
      await window.ipcRenderer.invoke('media:seek', targetMs);
    }

    // Prevent snapback for 3.5s while API catches up
    setTimeout(() => {
      isSeeking.current = false;
    }, 3500);
  };

  // Hide overlay if no track or if it's the "En pause" dummy state with no actual music
  if (!track || (track.title === 'En pause' && track.artist === 'Spotify' && !track.durationMs)) return null;

  const formatTime = (ms) => {
    if (!ms) return '0:00';
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')} `;
  };

  const handleCoverClick = () => {
    if (track) {
      const query = encodeURIComponent(`${track.artist} ${track.title} `);
      // Use spotify:search: URI scheme to open desktop app
      window.location.href = `spotify: search:${query} `;
    }
  };

  return (
    <div className="w-full h-full p-2 select-none" style={{ WebkitAppRegion: 'drag' }} onContextMenu={(e) => e.preventDefault()}>
      <div
        className="bg-black/50 hover:bg-black/60 dark:bg-[#080a14]/80 dark:hover:bg-[#080a14]/90 backdrop-blur-[24px] rounded-3xl border border-white/20 p-3 flex flex-col justify-between relative h-full transition-all duration-500 overflow-hidden shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"
        style={{ transform: 'translateZ(0)' }}
      >

        {/* Semi-transparent logo background */}
        <div className="absolute -right-8 -bottom-8 opacity-10 pointer-events-none rotate-12 mix-blend-screen scale-150">
          <img src={track.cover} className="w-48 h-48 grayscale" alt="" />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/10 via-transparent to-accent-primary/5 pointer-events-none"></div>

        {/* Top: Cover + Info */}
        <div className="flex gap-4 items-center px-1">
          {/* Cover Art - Non Clickable */}
          <div
            className="group relative overflow-hidden rounded-md shadow-lg shrink-0 pointer-events-none"
            style={{ WebkitAppRegion: 'no-drag' }}
          >
            {track.cover ? (
              <img
                src={track.cover}
                alt="Cover"
                className={`w-[52px] h-[52px] rounded-md object-cover border border-white/10 ${track.isPlaying ? 'shadow-green-500/20' : ''}`}
              />
            ) : (
              <div className={`w-[52px] h-[52px] rounded-md bg-accent-primary/10 flex items-center justify-center border border-accent-primary/30 ${track.isPlaying ? 'shadow-accent-primary/20' : ''}`}>
                <Music size={24} className="text-accent-primary" />
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 pr-1 flex flex-col justify-center">
            <div className="text-white text-[15px] font-bold truncate leading-tight drop-shadow-md">{track.title}</div>
            <div className="text-gray-400 text-[12px] font-medium truncate mt-0.5">{track.artist}</div>
          </div>
        </div>

        {/* Bottom: Controls & Progress Bar */}
        <div className="flex flex-col gap-2 mt-2 w-full px-1">
          {/* Center Controls */}
          <div style={{ WebkitAppRegion: 'no-drag' }} className="flex justify-center items-center gap-6">
            <button onClick={() => handleAction('prev')} className="text-white/60 hover:text-white transition-colors cursor-pointer outline-none">
              <SkipBack size={18} fill="currentColor" />
            </button>
            <button onClick={() => handleAction('playpause')} className="w-9 h-9 rounded-full bg-white hover:scale-105 text-black flex items-center justify-center transition-transform cursor-pointer outline-none shadow-md" style={{ paddingLeft: track.isPlaying ? '0' : '2px' }}>
              {track.isPlaying ? <Pause size={16} fill="currentColor" /> : <Play size={16} fill="currentColor" />}
            </button>
            <button onClick={() => handleAction('next')} className="text-white/60 hover:text-white transition-colors cursor-pointer outline-none">
              <SkipForward size={18} fill="currentColor" />
            </button>
          </div>

          {/* Progress Bar & Timestamps */}
          <div className="flex items-center gap-2 w-full">
            <span className="text-[10px] text-white/50 font-medium tabular-nums min-w-[32px] text-left">
              {track.durationMs ? formatTime(progressMs) : '0:00'}
            </span>
            <div
              className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden shrink-0 relative"
              style={{ WebkitAppRegion: 'no-drag' }}
            >
              {track.durationMs && (
                <div
                  className="h-full bg-white transition-all duration-300 ease-linear rounded-full"
                  style={{ width: `${Math.min(100, (progressMs / track.durationMs) * 100)}% ` }}
                />
              )}
            </div>
            <span className="text-[10px] text-white/50 font-medium tabular-nums min-w-[32px] text-right">
              {track.durationMs ? formatTime(track.durationMs) : '0:00'}
            </span>
          </div>
        </div>

      </div>
    </div >
  );
}

function SocialToastOverlay({ ddragonVersion }) {
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    console.log("[SocialToastOverlay] Window URL:", window.location.href);
    console.log("[SocialToastOverlay] Component mounted in mode 'toast'");

    // Force body background to transparent to override general themes
    document.body.style.backgroundColor = 'transparent';

    if (!window.ipcRenderer) {
      console.error("[SocialToastOverlay] window.ipcRenderer not found! Notifications will not display.");
      return;
    }

    const handler = (event, data) => {
      console.log("[SocialToastOverlay] New Toast Data:", data);
      const id = Date.now() + Math.random();
      setToasts(prev => [...(prev || []), { id, ...data }]);

      setTimeout(() => {
        setToasts(prev => (prev || []).filter(t => t.id !== id));
      }, 5000);
    };

    window.ipcRenderer.on('social:new-toast', handler);
    window.ipcRenderer.send('social:toast-ready');

    return () => {
      if (window.ipcRenderer) window.ipcRenderer.removeListener('social:new-toast', handler);
    };
  }, []);

  useEffect(() => {
    if ((!toasts || toasts.length === 0) && window.ipcRenderer) {
      window.ipcRenderer.send('social:toast-empty');
    }
  }, [toasts]);

  if (!toasts || toasts.length === 0) return null;

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      padding: '24px',
      gap: '12px',
      pointerEvents: 'none'
    }}>
      <div className="flex flex-col gap-3 items-end">
        {toasts.map(toast => {
          const borderColor = toast.type === 'disconnect' ? "bg-red-500 shadow-red-500/50" :
            toast.type === 'game' ? "bg-blue-500 shadow-blue-500/50" :
              "bg-accent-primary shadow-accent-primary/50";

          const statusColor = toast.type === 'disconnect' ? "bg-gray-500 shadow-gray-500/50" : "bg-green-500 shadow-green-500/50";

          return (
            <div
              key={toast.id}
              className="w-[320px] bg-black/50 backdrop-blur-[24px] border border-white/10 rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-right-8 fade-in duration-500 relative overflow-hidden pointer-events-auto shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)]"
            >
              {/* Vertical Accent Line */}
              <div className={`absolute left - 0 top - 0 bottom - 0 w - 1.5 ${borderColor} `} />

              <div className="relative shrink-0">
                <img
                  src={toast.icon || `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || '14.2.1'}/img/profileicon/29.png`}
                  className="w-14 h-14 rounded-xl border border-white/10 shadow-lg object-cover bg-gray-900"
                  alt="Avatar"
                  onError={(e) => { e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/29.jpg" }}
                />
                <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black shadow-lg ${statusColor}`} />
              </div >

              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] mb-1">
                  {toast.title || "SYSTEM NOTIFICATION"}
                </div>
                <div className="text-[15px] font-black text-white truncate leading-tight mb-0.5">{toast.name}</div>
                <div className="text-xs text-gray-400 font-medium truncate italic">{toast.status}</div>
              </div>

              {/* Progress Bar Animation */}
              <div className="absolute bottom-0 left-0 h-1 bg-white/5 w-full">
                <div
                  className="h-full bg-accent-primary opacity-50 shadow-[0_0_10px_rgba(var(--accent-primary-rgb),0.5)]"
                  style={{ width: '100%', animation: 'toastProgress 5s linear forwards' }}
                />
              </div>
            </div >
          );
        })}
      </div >
      <style>{`
        @keyframes toastProgress { 0% { width: 100%; } 100% { width: 0%; } }
      `}</style>
    </div >
  );
}

// --- Main Application View ---
function MainApp({ theme, setTheme, visualMode, setVisualMode, language, setLanguage, t, appMode, overlaySettings, setOverlaySettings, triggerSocialToast, ddragonVersion }) {
  const [targetSummoner, setTargetSummoner] = useState(null); // Mock search state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showNotifPanel, setShowNotifPanel] = useState(false);

  const [isConnected, setIsConnected] = useState(false);
  const { patchNotes, championList, prefetchedData } = useCommonData();
  const [currentUser, setCurrentUser] = useState(() => {
    try { const s = localStorage.getItem('oracle_last_user'); return s ? JSON.parse(s) : null; } catch (e) { return null; }
  });
  const [userRank, setUserRank] = useState(() => {
    try { const s = localStorage.getItem('oracle_last_rank'); return s ? JSON.parse(s) : null; } catch (e) { return null; }
  });
  const [currentUserHistory, setCurrentUserHistory] = useState(() => {
    try { const s = localStorage.getItem('oracle_last_history'); return s ? JSON.parse(s) : []; } catch (e) { return []; }
  });
  const [friends, setFriends] = useState([]);
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(() => localStorage.getItem('oracle_seen_notifs') !== 'true');
  const [browserUrl, setBrowserUrl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRegion, setSearchRegion] = useState('EUW');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [targetChamp, setTargetChamp] = useState('Olaf');
  const [gamePhase, setGamePhase] = useState('None');
  const [autoAccept, setAutoAccept] = useState(() => {
    return localStorage.getItem('oracle_auto_accept') === 'true';
  });
  const [autoImportRunes, setAutoImportRunes] = useState(() => {
    return localStorage.getItem('oracle_auto_import_runes') === 'true';
  });
  const [flashPosition, setFlashPosition] = useState(() => {
    return localStorage.getItem('oracle_flash_position') || 'F';
  });
  const [socialOverlayEnabled, setSocialOverlayEnabled] = useState(() => {
    const val = localStorage.getItem('oracle_social_overlay');
    return val !== 'false'; // Defaults to true
  });
  const [musicOverlayEnabled, setMusicOverlayEnabled] = useState(() => {
    const val = localStorage.getItem('oracle_music_overlay');
    return val === 'true'; // Defaults to false
  });
  const [isPremium, setIsPremium] = useState(false);

  useEffect(() => {
    if (!isPremium) {
      if (musicOverlayEnabled) setMusicOverlayEnabled(false);
      if (autoAccept) setAutoAccept(false);
      if (theme !== 'classic') setTheme('classic');
    }
  }, [isPremium]);


  const regions = ['EUW', 'NA', 'KR', 'EUNE', 'BR', 'TR', 'LAS', 'LAN', 'OCE', 'RU', 'JP', 'PH', 'SG', 'TH', 'TW', 'VN'];

  // Use dynamic list if available, otherwise fallback
  const allChamps = championList.length > 0 ? championList : [];

  // Filter and Sort Champions (Most probable first, then alphabetical)
  const champSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return allChamps
      .filter(c => (c.name || c).toLowerCase().includes(lowerQuery)) // Handle object or string fallback
      .sort((a, b) => {
        const lowA = (a.name || a).toLowerCase();
        const lowB = (b.name || b).toLowerCase();
        const startsA = lowA.startsWith(lowerQuery);
        const startsB = lowB.startsWith(lowerQuery);
        if (startsA && !startsB) return -1;
        if (!startsA && startsB) return 1;
        return lowA.localeCompare(lowB);
      })
      .slice(0, 3);
  }, [searchQuery, allChamps]);

  const friendSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return friends
      .filter(f => {
        const name = (f.gameName || f.summonerName || f.name || "").toLowerCase();
        return name.includes(lowerQuery);
      })
      .sort((a, b) => {
        const nameA = (a.gameName || a.summonerName || a.name || "").toLowerCase();
        const nameB = (b.gameName || b.summonerName || b.name || "").toLowerCase();

        // Exact match is king
        const exactA = nameA === lowerQuery;
        const exactB = nameB === lowerQuery;
        if (exactA && !exactB) return -1;
        if (!exactA && exactB) return 1;

        // Starts with is second best
        const startsA = nameA.startsWith(lowerQuery);
        const startsB = nameB.startsWith(lowerQuery);
        if (startsA && !startsB) return -1;
        if (!startsA && startsB) return 1;

        // Otherwise alphabetical
        return nameA.localeCompare(nameB);
      })
      .slice(0, 5);
  }, [searchQuery, friends]);

  const [recentSearches, setRecentSearches] = useState(() => {
    try {
      const saved = localStorage.getItem('oracle_recent_searches');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('oracle_recent_searches', JSON.stringify(recentSearches));
  }, [recentSearches]);

  useEffect(() => {
    localStorage.setItem('oracle_auto_accept', autoAccept);
  }, [autoAccept]);

  useEffect(() => {
    localStorage.setItem('oracle_auto_import_runes', autoImportRunes);
  }, [autoImportRunes]);

  useEffect(() => {
    localStorage.setItem('oracle_social_overlay', socialOverlayEnabled);
    if (window.ipcRenderer) {
      window.ipcRenderer.invoke('app:get-settings').then(s => {
        window.ipcRenderer.invoke('app:set-settings', { ...s, socialOverlayEnabled });
      });
    }
  }, [socialOverlayEnabled]);

  useEffect(() => {
    localStorage.setItem('oracle_music_overlay', musicOverlayEnabled);
    if (window.ipcRenderer) {
      window.ipcRenderer.invoke('window:toggle-music', musicOverlayEnabled);
    }
  }, [musicOverlayEnabled]);

  useEffect(() => {
    localStorage.setItem('oracle_flash_position', flashPosition);
  }, [flashPosition]);

  const recentSuggestions = useMemo(() => {
    if (!searchQuery) return [];
    const lowerQuery = searchQuery.toLowerCase();
    return recentSearches
      .filter(s => s.name.toLowerCase().includes(lowerQuery))
      .sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        const exactA = nameA === lowerQuery;
        const exactB = nameB === lowerQuery;
        if (exactA && !exactB) return -1;
        if (!exactA && exactB) return 1;
        return nameA.localeCompare(nameB);
      })
      .slice(0, 3);
  }, [searchQuery, recentSearches]);

  const hasSuggestions = champSuggestions.length > 0 || friendSuggestions.length > 0 || recentSuggestions.length > 0;

  const [champSelectData, setChampSelectData] = useState(null);

  // Window Minimize Animation State
  const [isMinimizing, setIsMinimizing] = useState(false);

  // Splash Screen State
  const [showSplash, setShowSplash] = useState(true);
  const [splashMessage, setSplashMessage] = useState(t('welcome'));

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('oracle_has_visited');
    if (hasVisited) {
      setSplashMessage(t('welcome_back'));
    } else {
      setSplashMessage(t('welcome'));
      sessionStorage.setItem('oracle_has_visited', 'true');
    }

    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 10); // Ultra-fast

    return () => clearTimeout(timer);
  }, []);

  // --- Navigation History ---
  const [navHistory, setNavHistory] = useState([]);
  const [navIndex, setNavIndex] = useState(-1);
  const [blockHistoryPush, setBlockHistoryPush] = useState(false);

  useEffect(() => {
    if (blockHistoryPush) {
      setBlockHistoryPush(false);
      return;
    }
    const state = { tab: activeTab, sum: targetSummoner, ch: targetChamp };
    const last = navHistory[navIndex];
    const isSame = last && last.tab === state.tab &&
      JSON.stringify(last.sum) === JSON.stringify(state.sum) &&
      last.ch === state.ch;

    if (!isSame) {
      const nextHist = navHistory.slice(0, navIndex + 1);
      nextHist.push(state);
      setNavHistory(nextHist);
      setNavIndex(nextHist.length - 1);
    }
  }, [activeTab, targetSummoner, targetChamp]);

  const goBack = () => {
    if (navIndex > 0) {
      setBlockHistoryPush(true);
      const prev = navHistory[navIndex - 1];
      setActiveTab(prev.tab);
      setTargetSummoner(prev.sum);
      setTargetChamp(prev.ch);
      setNavIndex(navIndex - 1);
    }
  };

  const goForward = () => {
    if (navIndex < navHistory.length - 1) {
      setBlockHistoryPush(true);
      const next = navHistory[navIndex + 1];
      setActiveTab(next.tab);
      setTargetSummoner(next.sum);
      setTargetChamp(next.ch);
      setNavIndex(navIndex + 1);
    }
  };

  useEffect(() => {
    // Listen for minimize request from WindowControls component if we emit event, 
    // but easier to pass handleMinimize down. 
    // Actually we need to intercept the minimize call.
    window.addEventListener('request-minimize', handleMinimizeRequest);
    return () => window.removeEventListener('request-minimize', handleMinimizeRequest);
  }, []);

  const handleMinimizeRequest = () => {
    setIsMinimizing(true);
    setTimeout(() => {
      ipcRenderer.invoke('window:minimize');
      // Reset state after a delay or when window regains focus? 
      // Usually reset immediately after call, but electron might pause renderer.
      setTimeout(() => setIsMinimizing(false), 500);
    }, 300);
  };

  const panelClass = visualMode === 'glass' ? 'glass-panel' : 'opaque-panel';

  const currentUserRef = useRef(currentUser);
  useEffect(() => { currentUserRef.current = currentUser; }, [currentUser]);

  const prevFriendsRef = useRef([]);
  const prevUnreadCountRef = useRef(-1);
  const syncRef = useRef(null);

  useEffect(() => {
    if (activeTab === 'notifications') {
      setHasUnreadNotifs(false);
      localStorage.setItem('oracle_seen_notifs', 'true');
    }
  }, [activeTab]);
  useEffect(() => {
    const syncState = async () => {
      try {
        const connected = await ipcRenderer.invoke('lcu:connect');
        setIsConnected(connected);

        if (connected) {
          const user = await ipcRenderer.invoke('lcu:get-current-summoner');

          if (user && user.puuid) {
            // Use functional update to avoid dependency on currentUser
            setCurrentUser(prev => {
              if (prev?.puuid !== user.puuid) {
                console.log("[Oracle] New User Detected:", user.displayName);
                return user;
              }
              return prev;
            });

            // Check rank separately to avoid complex nesting
            if (user.puuid) {
              const [stats, history] = await Promise.all([
                ipcRenderer.invoke('lcu:get-ranked-stats', user.puuid),
                ipcRenderer.invoke('lcu:get-match-history', user.puuid, 0, 150)
              ]);

              if (stats) {
                setUserRank(prev => JSON.stringify(prev) !== JSON.stringify(stats) ? stats : prev);
                localStorage.setItem('oracle_last_rank', JSON.stringify(stats));
              }

              if (history && (history.games || Array.isArray(history))) {
                const gamesList = history.games?.games || history.games || (Array.isArray(history) ? history : []);
                const newGames = gamesList.slice(0, 150);
                setCurrentUserHistory(prev => {
                  if (JSON.stringify(prev) !== JSON.stringify(newGames)) {
                    localStorage.setItem('oracle_last_history', JSON.stringify(newGames));
                    return newGames;
                  }
                  return prev;
                });
              }

              localStorage.setItem('oracle_last_user', JSON.stringify(user));
            }
          } else if (currentUserRef.current) {
            setCurrentUser(null);
            setUserRank(null);
          }

          const phase = await ipcRenderer.invoke('lcu:get-gameflow-phase');
          if (phase) setGamePhase(prev => {
            if (prev !== phase && (phase === 'GameStart' || phase === 'InProgress')) {
              // Potential trigger for overlay window show/hide
            }
            return phase;
          });

          if (phase === 'ReadyCheck' && autoAccept) {
            await ipcRenderer.invoke('lcu:accept-match');
          }

          if (phase === 'ChampSelect') {
            const session = await ipcRenderer.invoke('lcu:get-champ-select-session');
            setChampSelectData(session);
          }

          const friendsList = await ipcRenderer.invoke('lcu:get-friends');
          const convList = await ipcRenderer.invoke('lcu:get-conversations');

          if (Array.isArray(friendsList)) {
            if (prevFriendsRef.current.length > 0) {
              friendsList.forEach(curr => {
                const prev = prevFriendsRef.current.find(p => p.puuid === curr.puuid);
                if (prev) {
                  const pStatus = prev.availability || 'offline';
                  const cStatus = curr.availability || 'offline';
                  const pMsg = prev.statusMessage || '';
                  const cMsg = curr.statusMessage || '';

                  // 1. Connection
                  if (pStatus === 'offline' && cStatus !== 'offline') {
                    triggerSocialToast({
                      name: curr.name || curr.gameName || t('friend'),
                      title: t('friend_connected'),
                      status: t('friend_connected_msg'),
                      type: 'connect',
                      icon: `https://ddragon.leagueoflegends.com/cdn/14.2.1/img/profileicon/${curr.icon || 29}.png`
                    });
                  }

                  // 2. Disconnection
                  else if (pStatus !== 'offline' && cStatus === 'offline') {
                    triggerSocialToast({
                      name: curr.name || curr.gameName || t('friend'),
                      title: t('friend_disconnected'),
                      status: t('friend_disconnected_msg'),
                      type: 'disconnect',
                      icon: `https://ddragon.leagueoflegends.com/cdn/14.2.1/img/profileicon/${curr.icon || 29}.png`
                    });
                  }

                  // 3. Launching Game
                  else if (pMsg !== cMsg && (cMsg.toLowerCase().includes('in game') || cMsg.toLowerCase().includes('en partie'))) {
                    triggerSocialToast({
                      name: curr.name || curr.gameName || t('friend'),
                      title: t('game_started'),
                      status: cMsg || t('game_started_msg'),
                      type: 'game',
                      icon: `https://ddragon.leagueoflegends.com/cdn/14.2.1/img/profileicon/${curr.icon || 29}.png`
                    });
                  }
                }
              });
            }
            prevFriendsRef.current = friendsList;
            setFriends(friendsList);
          }



        } else if (isConnected) {
          setIsConnected(false);
          setCurrentUser(null);
          setUserRank(null);
          setGamePhase('None');
          setFriends([]);
        }
      } catch (e) {
        console.error("Sync Error", e);
      }
    };

    syncState();
    const interval = setInterval(syncState, 1500); // 1.5 seconds for snappier LCU detection
    return () => clearInterval(interval);
  }, []); // sync effect

  useEffect(() => {
    // Show Loading/Live window automatically if enabled
    // Show Loading/Live window automatically if enabled OR if Test Mode is on
    if ((gamePhase === 'GameStart' || gamePhase === 'InProgress') && overlaySettings.loadingScreen) {
      ipcRenderer.invoke('app:show-live');
    } else if (overlaySettings.testMode) {
      ipcRenderer.invoke('app:show-live');
    } else if (gamePhase === 'None') {
      ipcRenderer.invoke('app:hide-live');
    }
  }, [gamePhase, overlaySettings.loadingScreen, overlaySettings.testMode]); // Moved out of nested effect

  // ... (keeping other handlers)

  return (
    <div
      className={cn("flex h-screen w-full overflow-hidden relative font-sans selection:bg-accent-primary/30 text-gray-900 dark:text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 transition-all duration-300", isMinimizing ? "scale-95 opacity-0" : "scale-100 opacity-100")}
      onMouseMove={(e) => {
        document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
        document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
      }}
    >
      {/* Interactive Global Glass Cursor overriding Native Pointer */}
      <DynamicCursorStyle />

      {/* Background Layer - PREMIUM THEMED AURORA WITH INTERACTION */}
      <div className="absolute inset-0 z-0 bg-white dark:bg-[#060810] transition-colors duration-700 overflow-hidden">
        {/* Deep dark base (Hidden in light mode, solid gradient in dark mode) */}
        <div className="absolute inset-0 bg-transparent dark:bg-gradient-to-br dark:from-[#05060f] dark:via-[#090b14] dark:to-[#040508] opacity-100 transition-colors duration-700 pointer-events-none"></div>

        {/* Ambient Aurora Orbs */}
        <div className="absolute inset-0 opacity-[0.2] dark:opacity-[0.4] pointer-events-none mix-blend-multiply dark:mix-blend-screen overflow-hidden transition-opacity duration-700">
          {/* Primary Accent mass (Uses accent-primary color) */}
          <div className="absolute top-[10%] left-[20%] w-[80vw] h-[60vh] bg-accent-primary rounded-full blur-[140px] animate-[pulse_15s_ease-in-out_infinite] transform translate-y-[-10%] translate-x-[-10%]"></div>
          {/* Secondary Soft Accent (Lighter variant of primary or complimentary) */}
          <div className="absolute bottom-[20%] right-[10%] w-[70vw] h-[50vh] bg-indigo-400 dark:bg-sky-500 rounded-full blur-[160px] animate-[pulse_18s_ease-in-out_infinite_reverse] transform translate-y-[10%] translate-x-[10%] opacity-80"></div>
          {/* Tertiary deeply contrasting accent (REMOVED: The harsh fuchsia purple rotating bulb per user request) */}
        </div>


        {/* Soft Theme Overlay for light mode readability */}
        <div className="absolute inset-0 bg-white/40 dark:bg-transparent backdrop-blur-[10px] dark:backdrop-blur-none transition-colors duration-700 pointer-events-none"></div>

        {/* Glass Overlay for depth in dark mode */}
        <div className="absolute inset-0 bg-transparent dark:bg-black/10 backdrop-blur-[50px] transition-all duration-1000 pointer-events-none"></div>

        {visualMode === 'glass' && (
          <div className="absolute inset-0 bg-white/10 dark:bg-white/5 backdrop-blur-[2px] transition-all duration-1000 pointer-events-none"></div>
        )}
      </div>

      {/* SPLASH SCREEN OVERLAY */}
      <div className={cn(
        "absolute inset-0 z-[100] flex flex-col items-center justify-center transition-opacity duration-700 pointer-events-none",
        showSplash ? "opacity-100" : "opacity-0"
      )}>
        {/* Splash Background - Matches App Theme */}
        <div className="absolute inset-0 bg-black dark:bg-[rgb(var(--bg-main))]">
          <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-transparent to-black/60 opacity-100"></div>
          <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent-primary/10 rounded-full blur-3xl animate-pulse"></div>
        </div>

        <div className={cn("relative z-10 flex flex-col items-center justify-center transition-all duration-700 transform", showSplash ? "scale-100 translate-y-0" : "scale-95 -translate-y-10")}>
          <div className={cn("w-32 h-32 mb-8 relative filter animate-pulse transition-all duration-700", isPremium ? "drop-shadow-[0_0_30px_rgba(234,179,8,0.4)]" : "drop-shadow-[0_0_30px_rgba(6,182,212,0.6)]")}>
            <img src={oracleLogo} className="w-full h-full object-contain transition-all duration-700" style={isPremium ? { filter: 'sepia(1) saturate(2) hue-rotate(-20deg) brightness(1.3) drop-shadow(0 0 10px rgba(234,179,8,0.5))' } : {}} alt="Oracle Logo" />
          </div>
          <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 tracking-tighter mb-2">
            {splashMessage}
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-transparent via-accent-primary to-transparent rounded-full opacity-50"></div>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="w-20 lg:w-[300px] h-full z-10 p-4 flex flex-col gap-4 no-drag">
        <div className={cn("h-full flex flex-col p-4 relative overflow-hidden", panelClass)}>
          {/* Logo Area */}
          <div className="flex items-center gap-0 px-2 mb-8 app-drag-region shrink-0">
            <div className={cn("w-20 h-20 shrink-0 relative filter transition-all duration-700", isPremium ? "drop-shadow-[0_0_15px_rgba(234,179,8,0.4)]" : "drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]")}>
              <img src={oracleLogo} className="w-full h-full object-contain transition-all duration-700" style={isPremium ? { filter: 'sepia(1) saturate(2) hue-rotate(-20deg) brightness(1.3) drop-shadow(0 0 10px rgba(234,179,8,0.5))' } : {}} alt="Oracle Logo" />
            </div>
            <div className="hidden lg:block">
              <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400 block">
                ORACLE
              </span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-6 overflow-y-auto noscroll pr-2">

            {/* CORE */}
            <div className="space-y-1">
              <div className="px-4 text-[10px] font-medium text-white/20 uppercase tracking-[0.2em] mb-3">ORACLE CORE</div>
              <NavItem active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')} icon={<LayoutDashboard size={18} />} label="Dashboard" />
              <NavItem active={activeTab === 'tierlist'} onClick={() => { }} icon={<Trophy size={18} />} label="Tierlist & Builds" disabled={true} />
              <NavItem active={activeTab === 'leaderboards'} onClick={() => { }} icon={<Trophy size={18} />} label="Leaderboards" disabled={true} />
              <NavItem active={activeTab === 'matchups'} onClick={() => setActiveTab('matchups')} icon={<Gamepad2 size={18} />} label="Matchups" />
            </div>

            {/* APP */}
            <div className="space-y-1">
              <div className="px-4 text-[10px] font-medium text-white/20 uppercase tracking-[0.2em] mb-3">ORACLE APP</div>
              <NavItem active={activeTab === 'replays'} onClick={() => setActiveTab('replays')} icon={<MonitorPlay size={18} />} label="Analyse" />
              <NavItem active={activeTab === 'collections'} onClick={() => setActiveTab('collections')} icon={<Brain size={18} />} label="Collections" />
              <NavItem active={activeTab === 'training'} onClick={() => setActiveTab('training')} icon={<Target size={18} />} label="Training" />
            </div>

            {/* INSIGHTS */}
            <div className="space-y-1">
              <div className="px-4 text-[10px] font-medium text-white/20 uppercase tracking-[0.2em] mb-3">ORACLE INSIGHTS</div>
              <NavItem active={activeTab === 'esports'} onClick={() => setActiveTab('esports')} icon={<Globe size={18} />} label="Esports" />
              <NavItem active={activeTab === 'tutorial'} onClick={() => setActiveTab('tutorial')} icon={<HelpCircle size={18} />} label="Tutoriel" />
            </div>

          </nav>

          {/* Bottom Profile Widget */}
          <div className="mt-auto pt-4 flex flex-col gap-2">
            {/* Removed Messagerie button per user request */}
            <SidebarProfile
              currentUser={currentUser}
              rankedStats={userRank}
              history={currentUserHistory}
              isConnected={isConnected}
              appMode={appMode}
              t={t}
              onClick={() => {
                setTargetSummoner(null);
                setActiveTab('profile');
              }}
            />
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 h-full z-10 p-4 pl-0 no-drag">
        <div className={cn("h-full w-full overflow-hidden flex flex-col relative", panelClass)}>
          {/* Custom App Drag Region & Window Controls */}


          {/* Header - acts as drag region but inputs are no-drag */}
          <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200/20 dark:border-gray-200 dark:border-white/10 shrink-0 z-20 relative app-drag-region">
            <div className="flex items-center gap-2 no-drag">
              <div className="flex items-center gap-1.5 mr-4">
                <button
                  onClick={goBack}
                  disabled={navIndex <= 0}
                  className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 disabled:opacity-10 transition-all active:scale-90 p-1"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  onClick={goForward}
                  disabled={navIndex >= navHistory.length - 1}
                  className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 disabled:opacity-10 transition-all active:scale-90 p-1"
                >
                  <ChevronRight size={20} />
                </button>
                <div className="w-px h-4 bg-white/10 mx-1"></div>
                <div className="flex items-center">
                  <button
                    onClick={() => window.location.reload()}
                    className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 transition-all active:rotate-180 duration-500 p-1 mr-4"
                  >
                    <RefreshCw size={18} />
                  </button>
                  <button
                    onClick={() => setIsPremium(!isPremium)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg border font-black text-[9px] uppercase tracking-widest transition-all cursor-pointer z-50 shadow-sm",
                      isPremium
                        ? "bg-[#18181b] text-yellow-400 border-yellow-500/20 shadow-[0_0_10px_rgba(234,179,8,0.2)]"
                        : "bg-white/5 text-gray-500 border-white/5 hover:border-white/20"
                    )}
                    title="Activer/Désactiver l'abonnement Oracle Gold (Test)"
                  >
                    {isPremium ? "Gold: ON" : "Gold: OFF"}
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="flex items-center gap-4 text-gray-900 dark:text-gray-100/50 bg-white dark:bg-white/5 px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 focus-within:border-accent-primary/50 transition-all no-drag backdrop-blur-md">
                  <Search size={16} />
                  <CustomSelect
                    value={searchRegion}
                    onChange={setSearchRegion}
                    options={regions.map(r => ({ value: r, label: r }))}
                    className="w-20"
                    buttonClassName="bg-transparent text-[10px] font-black tracking-widest text-gray-400 uppercase border-none hover:text-gray-900 dark:hover:text-gray-100 transition-colors p-0 justify-start gap-1"
                  />
                  <div className="w-px h-4 bg-white/10 mx-2"></div>
                  <input
                    type="text"
                    placeholder={t('search_hint')}
                    className="bg-transparent outline-none text-gray-900 dark:text-gray-900 dark:text-gray-100 placeholder:text-gray-500 w-64 text-sm"
                    value={searchQuery}
                    onChange={e => { setSearchQuery(e.target.value); setShowSuggestions(true); }}
                    onKeyDown={e => {
                      if (e.key === 'Enter' && searchQuery.trim()) {
                        const exactChamp = allChamps.find(c => (c.name || c).toLowerCase() === searchQuery.trim().toLowerCase());

                        if (exactChamp) {
                          setTargetChamp(exactChamp.id || exactChamp);
                          setActiveTab('tierlist');
                        } else {
                          // Otherwise assume it's a summoner search
                          const name = searchQuery.trim();

                          // Determine if we should enforce external search (skip LCU)
                          // We check if the selected searchRegion matches the current user's region/platform.
                          // Ideally we map platformId (EUW1) to region (EUW).

                          // Helper to get my region code
                          const myRegion = currentUser?.platformId ? currentUser.platformId.replace(/[0-9]/g, '').toUpperCase() : 'EUW';
                          // Simple heuristic: EUW1 -> EUW, NA1 -> NA. KR -> KR.

                          const skipLcu = searchRegion !== myRegion;

                          setRecentSearches(prev => {
                            const filtered = prev.filter(s => s.name.toLowerCase() !== name.toLowerCase());
                            return [{ name, region: searchRegion, timestamp: Date.now() }, ...filtered].slice(0, 50);
                          });

                          // Pass skipLcu flag in the target object so ProfileView can use it
                          setTargetSummoner({ name, region: searchRegion, skipLcu });
                          setActiveTab('profile');
                        }
                        setShowSuggestions(false);
                        setSearchQuery('');
                      }
                    }}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                    onFocus={() => setShowSuggestions(true)}
                  />
                </div>
                {/* Suggestions Dropdown */}
                {showSuggestions && searchQuery && hasSuggestions && (
                  <div className="absolute top-full left-0 w-full mt-2 bg-[#1C1C21] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl overflow-hidden z-50 no-drag max-h-64 overflow-y-auto custom-scrollbar">

                    {/* Champion Suggestions */}
                    {/* Champion Suggestions */}
                    {champSuggestions.map(s => {
                      const cName = s.name || s;
                      const cId = s.id || s;
                      return (
                        <div key={`champ-${cId}`} onClick={() => {
                          setTargetChamp(cId); // Passing ID string
                          setActiveTab('tierlist');
                          setSearchQuery('');
                          setShowSuggestions(false);
                        }} className="px-4 py-3 flex items-center gap-3 hover:bg-white/10 cursor-pointer transition-colors group">
                          <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${cId}.png`} className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10 group-hover:border-accent-primary" />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{cName}</span>
                            <span className="text-[9px] text-gray-500 uppercase tracking-widest group-hover:text-accent-primary">Champion</span>
                          </div>
                        </div>
                      );
                    })}



                    {/* Recent Search Suggestions */}
                    {recentSuggestions.map(s => (
                      <div key={`recent-${s.name}`} onClick={() => {
                        setTargetSummoner({ name: s.name, region: s.region });
                        setActiveTab('profile');
                        setSearchQuery('');
                        setShowSuggestions(false);
                      }} className="px-4 py-3 flex items-center gap-3 hover:bg-white/10 cursor-pointer transition-colors group">
                        <div className="w-8 h-8 rounded-lg bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center group-hover:border-blue-400">
                          <History size={16} className="text-gray-500 group-hover:text-blue-400" />
                        </div>
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase">{s.name}</span>
                          <span className="text-[9px] text-gray-500 uppercase tracking-widest flex items-center gap-1 group-hover:text-blue-400">
                            Profil Récents <span className="opacity-50">•</span> {s.region}
                          </span>
                        </div>
                      </div>
                    ))}

                    {/* Friend Suggestions */}
                    {friendSuggestions.map(f => {
                      const name = f.gameName || f.summonerName || f.name;
                      const tag = f.tagLine || f.gameTag;
                      const searchName = tag ? `${name}#${tag}` : name;
                      return (
                        <div key={`friend-${f.puuid || f.summonerId}`} onClick={() => {
                          setTargetSummoner({ name: searchName, region: null });
                          setActiveTab('profile');
                          setSearchQuery('');
                          setShowSuggestions(false);
                        }} className="px-4 py-3 flex items-center gap-3 hover:bg-white/10 cursor-pointer transition-colors group">
                          <img src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/profileicon/${f.icon || 29}.png`} className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 group-hover:border-green-400" />
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 dark:text-gray-100 flex items-center gap-1">
                              {name}
                              {tag && <span className="text-gray-500 font-normal opacity-70">#{tag}</span>}
                            </span>
                            <span className="text-[9px] text-green-400/70 font-bold uppercase tracking-widest group-hover:text-green-400">Friend</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Window Controls & Settings */}
            <div className="flex items-center gap-2 no-drag">
              <button
                onClick={() => setShowNotifPanel(!showNotifPanel)}
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300 relative",
                  showNotifPanel
                    ? "bg-accent-primary text-black shadow-[0_0_15px_rgb(var(--accent-primary)/0.3)]"
                    : "text-gray-600 dark:text-gray-400 hover:bg-white/10 hover:text-gray-900 dark:text-gray-100"
                )}
                title={t('notifications') || "Notifications"}
              >
                <Bell size={18} />
                {hasUnreadNotifs && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 border-2 border-[#1C1C21]"></span>
                  </span>
                )}
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                  activeTab === 'settings'
                    ? "bg-accent-primary text-black shadow-[0_0_15px_rgb(var(--accent-primary)/0.3)]"
                    : "text-gray-600 dark:text-gray-400 hover:bg-white/10 hover:text-gray-900 dark:text-gray-100"
                )}
                title={t('settings')}
              >
                <Settings size={18} className={cn(activeTab === 'settings' && "animate-[spin_3s_linear_infinite]")} />
              </button>
              <div className="w-px h-4 bg-gray-200/20 dark:bg-white/10 mx-1"></div>
              <WindowControls />
            </div>
          </div>

          <div id="profile-scroll-container" className="flex-1 overflow-y-auto custom-scrollbar p-0 scroll-smooth relative flex flex-col">
            {(!isConnected && !['esports', 'watch', 'settings'].includes(activeTab)) ? (
              <ClientDisconnectedView t={t} />
            ) : (
              <div key={activeTab} className="h-full w-full p-8 animate-page-enter">
                {activeTab === 'dashboard' && <DashboardView
                  targetSummoner={targetSummoner}
                  currentUser={currentUser}
                  panelClass={panelClass}
                  t={t}
                  ddragonVersion={ddragonVersion}
                  patchNotes={patchNotes}
                  setActiveTab={setActiveTab}
                  setTargetChamp={setTargetChamp}
                  onOpenUrl={setBrowserUrl}
                  prefetchedData={prefetchedData}
                  userRank={userRank}
                  userHistory={currentUserHistory}
                  isPremium={isPremium}
                  onSearch={(sum) => {
                    const isObj = typeof sum === 'object' && sum !== null;
                    const finalObj = isObj ? { ...sum, region: sum.region || searchRegion } : { name: sum, region: searchRegion, skipLcu: false, puuid: null };
                    setTargetSummoner(finalObj);
                    setActiveTab('profile');
                  }}
                />}
                {activeTab === 'profile' && <ProfileView
                  targetSummoner={targetSummoner}
                  currentUser={currentUser}
                  panelClass={panelClass}
                  t={t}
                  onSearch={(sum) => {
                    const isObj = typeof sum === 'object' && sum !== null;
                    setTargetSummoner(isObj ? { ...sum, region: sum.region || searchRegion } : { name: sum, region: searchRegion });
                  }}
                  onChampClick={(c) => { setTargetChamp(c); setActiveTab('tierlist'); }}
                  onBack={() => setActiveTab('dashboard')}
                  overlaySettings={overlaySettings}
                  ddragonVersion={ddragonVersion}
                  isPremium={isPremium}
                  onSubscribe={() => setActiveTab('subscription')}
                />}
                {activeTab === 'tierlist' && <BuildView panelClass={panelClass} t={t} initialChamp={targetChamp} ddragonVersion={ddragonVersion} championList={championList} />}

                {/* V2 New Views */}
                {/* Removed Notifications tab as it is now a dropdown */}

                {activeTab === 'matchups' && <MatchupsView panelClass={panelClass} t={t} championList={championList} ddragonVersion={ddragonVersion} onOpenUrl={setBrowserUrl} />}
                {activeTab === 'replays' && (!isPremium ? (
                  <SubscriptionView t={t} panelClass={panelClass} isPremium={isPremium} setIsPremium={setIsPremium} setActiveTab={setActiveTab} />
                ) : <ReplaysView panelClass={panelClass} t={t} currentUser={currentUser} />)}
                {activeTab === 'esports' && <EsportsView panelClass={panelClass} t={t} prefetchedData={prefetchedData} onShowNews={setSelectedArticle} />}
                {activeTab === 'collections' && <CollectionsView panelClass={panelClass} t={t} ddragonVersion={ddragonVersion} currentUser={currentUser} championList={championList} />}
                {activeTab === 'leaderboards' && <RankingsView
                  panelClass={panelClass}
                  t={t}
                  setTargetSummoner={(sum) => {
                    const isObj = typeof sum === 'object' && sum !== null;
                    setTargetSummoner(isObj ? { ...sum, region: sum.region || searchRegion } : { name: sum, region: searchRegion });
                  }}
                  setActiveTab={setActiveTab}
                  ddragonVersion={ddragonVersion}
                />}
                {activeTab === 'watch' && <EsportsView panelClass={panelClass} t={t} prefetchedData={prefetchedData} />}

                {/* Dev / Game State Views */}
                {activeTab === 'draft' && <DraftSimView panelClass={panelClass} t={t} />}
                {activeTab === 'live' && <LiveGameLoadingView panelClass={panelClass} t={t} />}

                {/* Fallback */}
                {['tutorial', 'training'].includes(activeTab) && (
                  !isPremium ? (
                    <SubscriptionView t={t} panelClass={panelClass} isPremium={isPremium} setIsPremium={setIsPremium} setActiveTab={setActiveTab} />
                  ) : (
                    <div className="relative h-full flex flex-col items-center justify-center text-gray-500 rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 shadow-inner">
                      <Wrench size={56} className="mb-6 opacity-30 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]" />
                      <h2 className="text-3xl font-black text-white italic tracking-tighter mb-4 drop-shadow-md">En Maintenance</h2>
                      <p className="text-gray-400 max-w-sm text-center font-medium leading-relaxed">
                        Cette section <b>Oracle Gold</b> est actuellement en cours de mise à jour pour vous offrir les meilleurs outils interactifs.
                      </p>
                    </div>
                  )
                )}

                {activeTab === 'settings' && <SettingsView
                  theme={theme} setTheme={setTheme}
                  visualMode={visualMode} setVisualMode={setVisualMode}
                  language={language} setLanguage={setLanguage}
                  t={t}
                  autoAccept={autoAccept}
                  setAutoAccept={setAutoAccept}
                  autoImportRunes={autoImportRunes}
                  setAutoImportRunes={setAutoImportRunes}
                  flashPosition={flashPosition}
                  setFlashPosition={setFlashPosition}
                  socialOverlayEnabled={socialOverlayEnabled}
                  setSocialOverlayEnabled={setSocialOverlayEnabled}
                  musicOverlayEnabled={musicOverlayEnabled}
                  setMusicOverlayEnabled={setMusicOverlayEnabled}
                  overlaySettings={overlaySettings}
                  setOverlaySettings={setOverlaySettings}
                  panelClass={panelClass}
                  triggerSocialToast={triggerSocialToast}
                  setActiveTab={setActiveTab}
                  isPremium={isPremium}
                  setIsPremium={setIsPremium}
                />}

                {activeTab === 'subscription' && <SubscriptionView
                  t={t}
                  panelClass={panelClass}
                  isPremium={isPremium}
                  setIsPremium={setIsPremium}
                  setActiveTab={setActiveTab}
                />}
              </div>
            )}
          </div>

          {/* Notification Dropdown Overlay */}
          {showNotifPanel && (
            <div className="absolute top-16 right-6 w-[450px] max-h-[calc(100vh-100px)] z-[110] animate-in fade-in zoom-in-95 duration-200 origin-top-right flex flex-col">
              <div className="bg-[#131317]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden min-h-0">
                <NotificationsView
                  panelClass="p-6"
                  setActiveTab={(tab) => { setActiveTab(tab); setShowNotifPanel(false); }}
                  patchNotes={patchNotes}
                  prefetchedData={prefetchedData}
                  onShowNews={(article) => { setSelectedArticle(article); setShowNotifPanel(false); }}
                  onClose={() => setShowNotifPanel(false)}
                />
              </div>
            </div>
          )}

          {/* Mini News Window (Top Right Overlay) */}
          {selectedArticle && (
            <div className="absolute top-16 right-6 w-[420px] max-h-[80vh] bg-[#1a1a20] border border-[#2b2b36] rounded-3xl z-[120] shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col overflow-hidden animate-in slide-in-from-top-4 duration-300">
              <div className="relative h-48 shrink-0">
                <img src={selectedArticle.image || "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg"} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a20] to-transparent"></div>
                <button
                  onClick={() => setSelectedArticle(null)}
                  className="absolute top-4 right-4 p-2 bg-black/40 hover:bg-black/60 text-white rounded-full backdrop-blur-md transition-all"
                >
                  <X size={16} />
                </button>
              </div>
              <div className="p-6 flex flex-col gap-4 overflow-y-auto custom-scrollbar">
                <div>
                  <div className="text-[10px] font-black text-accent-primary uppercase tracking-[0.2em] mb-1">{selectedArticle.date || "ACTUALITÉ"}</div>
                  <h3 className="text-xl font-bold text-white leading-tight">{selectedArticle.title}</h3>
                </div>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {selectedArticle.summary || selectedArticle.description || "Aucun résumé disponible pour cet article."}
                </p>
                <button
                  onClick={() => window.ipcRenderer.invoke('app:open-url', selectedArticle.url)}
                  className="mt-4 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all group"
                >
                  Lire l'article complet
                  <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {browserUrl && (
            <BrowserOverlay url={browserUrl} onClose={() => setBrowserUrl(null)} />
          )}
        </div>
      </main >
    </div>
  );
}

// --- Standalone Profile Window ---
function ProfileWindow({ summonerName, theme, visualMode, t }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Use visualMode to determine panel class
  const panelClass = visualMode === 'glass' ? 'glass-panel' : 'opaque-panel';

  useEffect(() => {
    const fetchData = async () => {
      try {
        await ipcRenderer.invoke('lcu:connect');
        const data = await ipcRenderer.invoke('lcu:search-summoner', summonerName);
        setUser(data);
        // This constructor is for the Scraper class, not ProfileWindow.
        // It should be in a separate scraper.js file.
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [summonerName]);

  return (
    <div className="h-screen w-full bg-[#f5f5f7] dark:bg-[#000000] text-gray-900 dark:text-gray-900 dark:text-gray-100 font-sans overflow-hidden relative app-drag-region">
      <div className="absolute inset-0 z-0 bg-white dark:bg-[rgb(var(--bg-main))] transition-colors duration-700">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-white to-gray-50 dark:from-black/40 dark:via-transparent dark:to-black/40 opacity-100"></div>
        {visualMode === 'glass' && (
          <>
            <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-accent-primary/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-accent-primary/10 rounded-full blur-3xl"></div>
          </>
        )}
      </div>

      <div className="relative z-10 w-full h-full p-8 overflow-auto no-drag">
        {loading && <div className="flex justify-center mt-20"><RefreshCw className="animate-spin" /></div>}
        {!loading && !user && <div className="text-center mt-20 text-red-500">Summoner Not Found</div>}
        {user && (
          <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-5">
            <div className={cn("p-8 flex items-center gap-8", panelClass)}>
              <img src={`https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/${user.profileIconId}.png`} className="w-32 h-32 rounded-3xl shadow-2xl" />
              <div>
                <h1 className="text-4xl font-bold">{user.displayName}</h1>
                <div className="text-gray-500">Lvl {user.summonerLevel}</div>
              </div>
            </div>
            {/* Advanced Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className={cn("p-6 h-40 flex items-center justify-center text-gray-500 flex-col gap-2", panelClass)}>
                <h3 className="font-bold text-gray-900 dark:text-gray-900 dark:text-gray-100">{t('rank')} {t('rank')}</h3>
                <div className="text-sm">{t('coming_soon')}</div>
              </div>
              <div className={cn("p-6 h-40 flex items-center justify-center text-gray-500 flex-col gap-2", panelClass)}>
                <h3 className="font-bold text-gray-900 dark:text-gray-900 dark:text-gray-100">{t('match_history')}</h3>
                <div className="text-sm">{t('coming_soon')}</div>
              </div>
              <div className={cn("p-6 h-40 flex items-center justify-center text-gray-500 flex-col gap-2", panelClass)}>
                <h3 className="font-bold text-gray-900 dark:text-gray-900 dark:text-gray-100">Mastery</h3>
                <div className="text-sm">{t('coming_soon')}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- IPC for Window Controls ---
// calling window.close() closes the renderer, but for Electron frame:false we need ipc
const handleMinimize = () => ipcRenderer.invoke('window:minimize');
const handleClose = () => ipcRenderer.invoke('window:close');

// --- Scrolling Text Helper ---
function ScrollingText({ text, className, containerClassName }) {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const [shouldScroll, setShouldScroll] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);

  useEffect(() => {
    const checkOverflow = () => {
      if (containerRef.current && textRef.current) {
        const cWidth = containerRef.current.clientWidth;
        const tWidth = textRef.current.scrollWidth;
        if (tWidth > cWidth + 2) {
          setShouldScroll(true);
          setScrollAmount(tWidth - cWidth + 10); // +10px padding at the end
        } else {
          setShouldScroll(false);
          setScrollAmount(0);
        }
      }
    };
    const timer = setTimeout(checkOverflow, 100);
    window.addEventListener('resize', checkOverflow);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [text]);

  const duration = Math.max(3, scrollAmount / 15);

  return (
    <div ref={containerRef} className={cn("overflow-hidden relative group/scroller", containerClassName)} title={text}>
      <div
        ref={textRef}
        className={cn("whitespace-nowrap transition-transform", className)}
        style={shouldScroll ? {
          '--scroll-amount': `-${scrollAmount}px`,
          animation: `scrollName ${duration}s linear infinite alternate`
        } : {}}
      >
        {text}
      </div>
      {shouldScroll && (
        <style>
          {`
            @keyframes scrollName {
              0%, 15% { transform: translateX(0); }
              85%, 100% { transform: translateX(var(--scroll-amount)); }
            }
            .group\\/scroller:hover > div {
              animation-play-state: paused;
            }
          `}
        </style>
      )}
    </div>
  );
}

// --- Updated Sidebar Profile ---
function SidebarProfile({ currentUser, rankedStats, history, isConnected, appMode, t, onClick }) {
  if (!currentUser) {
    return (
      <div className="flex items-center gap-3 px-2 py-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5">
        <div className="w-10 h-10 rounded-lg bg-gray-600/50 animate-pulse"></div>
        <div>
          <div className="h-3 w-20 bg-gray-600/50 rounded animate-pulse mb-1"></div>
          <div className="text-[10px] text-gray-500">{t('disconnected')}</div>
        </div>
      </div>
    )
  }

  // Quick helper for queue stats
  const getQueueData = (type) => {
    const q = rankedStats?.queueMap?.[type];
    if (!q) return { tier: 'UNRANKED', division: '' };
    return { tier: q.tier, division: q.division };
  };

  const solo = getQueueData('RANKED_SOLO_5x5');
  const flex = getQueueData('RANKED_FLEX_SR');

  // Helper for Rank Icon - Using CommunityDragon Mini Crests
  const getRankIcon = (tier) => {
    const t = (tier || 'unranked').toLowerCase();
    // Fallback for unranked or specific tiers
    const tierMap = {
      'emerald': 'emerald',
      'platinum': 'platinum',
      'diamond': 'diamond',
      'master': 'master',
      'grandmaster': 'grandmaster',
      'challenger': 'challenger',
      'iron': 'iron',
      'bronze': 'bronze',
      'silver': 'silver',
      'gold': 'gold'
    };
    const key = tierMap[t] || 'unranked';
    return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${key}.png`;
  };

  return (
    <div onClick={onClick} className="relative group cursor-pointer hover:bg-white dark:bg-white/5 rounded-2xl p-3 transition-colors flex items-center gap-4 select-none">
      {/* Avatar Container with Badges */}
      <div className="relative shrink-0 mt-1 mb-1">
        {/* Server Badge (Top Right) */}
        <div className="absolute -top-1.5 -right-1.5 bg-[#5c7ce5] text-gray-900 dark:text-gray-100 text-[9px] font-bold px-1.5 py-0.5 rounded-md z-20 shadow-sm border border-[#5c7ce5] shadow-blue-500/20 uppercase">
          {currentUser.region || "EUW"}
        </div>

        {/* Main Icon */}
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/profileicon/${currentUser.profileIconId}.png`}
          className="w-14 h-14 rounded-2xl border-2 border-[#1e1e24] shadow-lg"
          alt="Profile"
        />

        {/* Level Badge (Bottom Center) */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#1e1e1e] text-gray-900 dark:text-gray-100 text-[9px] font-bold px-2 py-0.5 rounded-md border border-[#2d2d35] z-20 whitespace-nowrap min-w-[24px] text-center">
          {currentUser.summonerLevel}
        </div>
      </div>

      {/* Info Container */}
      <div className="flex-1 min-w-0 flex flex-col justify-center">
        {/* Name & Tag */}
        <div className="flex items-end gap-1 mb-1 w-full overflow-hidden">
          <ScrollingText
            text={currentUser.gameName || currentUser.displayName}
            className="text-gray-900 dark:text-gray-100 font-bold text-lg leading-none"
            containerClassName="flex-initial overflow-hidden shrink min-w-[30px]"
          />
          <span className="text-gray-500 text-sm font-medium truncate uppercase shrink-0 leading-none pb-[1px]">
            #{currentUser.tagLine || currentUser.region || "EUW"}
          </span>
        </div>

        {/* Ranks Display */}
        <div className="flex flex-col gap-0.5">
          {/* Solo Queue */}
          <div className="flex items-center gap-2">
            <img src={getRankIcon(solo.tier)} className="w-4 h-4 object-contain" alt={solo.tier} />
            <span className="text-gray-300 font-bold text-xs uppercase tracking-wide truncate">
              {solo.tier === 'UNRANKED' ? 'Unranked' : `${solo.tier} ${solo.division}`}
            </span>
          </div>
          {/* Online Status (Replacing Flex) */}
          <div className="flex items-center gap-1.5 opacity-80 mt-1">
            <div className={cn("w-2 h-2 rounded-full shadow-[0_0_5px_rgba(255,255,255,0.2)]", isConnected ? "bg-green-500 shadow-green-500/50" : "bg-gray-500")}></div>
            <span className={cn("font-bold text-[10px] uppercase tracking-wide", isConnected ? "text-green-400" : "text-gray-500")}>
              {isConnected ? "Online" : "Offline"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

function NavItem({ icon, label, active, onClick, disabled }) {
  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={cn(
        "w-full flex items-center gap-4 px-4 py-2.5 rounded-2xl transition-all duration-500 group relative overflow-hidden",
        disabled ? "opacity-50 cursor-not-allowed" : "",
        active
          ? "text-gray-900 dark:text-gray-100"
          : "text-gray-900 dark:text-gray-100/40 hover:bg-white dark:hover:bg-white/5 hover:text-gray-900 dark:text-gray-100"
      )}
    >
      {active && !disabled && (
        <>
          <div className="absolute inset-0 bg-accent-primary/20 border border-accent-primary/30 rounded-2xl -z-10 backdrop-blur-md"></div>
          <div className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-accent-primary rounded-full blur-[2px]"></div>
        </>
      )}
      <span className={cn("relative z-10 transition-all duration-500", (active && !disabled) ? "scale-110 text-accent-primary" : (disabled ? "text-gray-500" : "group-hover:scale-110 group-hover:text-gray-900 dark:text-gray-100/80"))}>
        {icon}
      </span>
      {disabled ? (
        <>
          <span className={cn(
            "hidden lg:block relative z-10 tracking-tight whitespace-nowrap transition-all duration-500 group-hover:-translate-y-4 group-hover:opacity-0"
          )}>
            {label}
          </span>
          <span className={cn(
            "hidden lg:block absolute left-12 right-0 z-10 tracking-tight whitespace-nowrap transition-all duration-500 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 text-red-500 dark:text-red-400 font-bold"
          )}>
            Coming soon...
          </span>
        </>
      ) : (
        <span className={cn(
          "hidden lg:block relative z-10 tracking-tight whitespace-nowrap transition-all duration-500",
          active ? "translate-x-1 font-black text-gray-900 dark:text-gray-100" : "group-hover:translate-x-0.5 font-medium text-gray-900 dark:text-gray-100/50"
        )}>
          {label}
        </span>
      )}
      {/* Liquid Glint Effect */}
      {active && (
        <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 animate-[shimmer_2s_infinite]"></div>
      )}
    </button>
  );
}

function WindowControls() {
  const requestMinimize = () => {
    // Dispatch event for animation
    try {
      window.dispatchEvent(new Event('request-minimize'));
    } catch (e) { console.error("Minimize event failed", e); }
  };

  const handleClose = () => {
    ipcRenderer.invoke('window:close');
  };

  return (
    <div className="flex items-center gap-2 no-drag">
      <button onClick={requestMinimize} className="w-8 h-8 rounded-lg hover:bg-white/10 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 transition-colors no-drag">
        <div className="w-3 h-0.5 bg-current rounded-full"></div>
      </button>
      <button onClick={handleClose} className="w-8 h-8 rounded-lg hover:bg-red-500/20 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-red-500 transition-colors no-drag">
        <div className="relative w-3 h-3">
          <div className="absolute inset-0 rotate-45 bg-current w-full h-0.5 top-1.5"></div>
          <div className="absolute inset-0 -rotate-45 bg-current w-full h-0.5 top-1.5"></div>
        </div>
      </button>
    </div>
  )
}

const ROLES = ['top', 'jungle', 'mid', 'adc', 'support'];

const ROLE_PLACEHOLDERS = {
  top: [
    { name: 'Darius', tier: 'S+', wr: '52.3%', pr: '12.5%' }, { name: 'Sett', tier: 'S', wr: '51.5%', pr: '10.2%' }, { name: 'Aatrox', tier: 'S', wr: '50.9%', pr: '15.1%' }, { name: 'Mordekaiser', tier: 'A', wr: '51.2%', pr: '8.4%' }, { name: 'Garen', tier: 'A', wr: '50.5%', pr: '9.0%' }
  ],
  jungle: [
    { name: 'LeeSin', tier: 'S+', wr: '50.8%', pr: '22.1%' }, { name: 'Viego', tier: 'S', wr: '50.1%', pr: '14.5%' }, { name: 'Graves', tier: 'S', wr: '51.5%', pr: '11.8%' }, { name: 'Kayn', tier: 'A', wr: '50.3%', pr: '9.5%' }, { name: 'Amumu', tier: 'A', wr: '51.8%', pr: '7.2%' }
  ],
  mid: [
    { name: 'Sylas', tier: 'S+', wr: '51.9%', pr: '12.8%' }, { name: 'Ahri', tier: 'S', wr: '50.8%', pr: '15.2%' }, { name: 'Zed', tier: 'S', wr: '50.4%', pr: '11.0%' }, { name: 'Akali', tier: 'A', wr: '49.8%', pr: '9.1%' }, { name: 'Lux', tier: 'A', wr: '51.2%', pr: '14.5%' }
  ],
  adc: [
    { name: 'Jinx', tier: 'S+', wr: '52.1%', pr: '18.5%' }, { name: 'Kaisa', tier: 'S', wr: '50.5%', pr: '25.2%' }, { name: 'Jhin', tier: 'S', wr: '51.0%', pr: '20.1%' }, { name: 'Caitlyn', tier: 'A', wr: '50.2%', pr: '22.8%' }, { name: 'Ezreal', tier: 'A', wr: '49.5%', pr: '28.1%' }
  ],
  support: [
    { name: 'Thresh', tier: 'S+', wr: '51.3%', pr: '15.4%' }, { name: 'Nautilus', tier: 'S', wr: '50.6%', pr: '14.2%' }, { name: 'Leona', tier: 'S', wr: '51.1%', pr: '12.8%' }, { name: 'Lulu', tier: 'A', wr: '50.2%', pr: '11.5%' }, { name: 'Lux', tier: 'A', wr: '50.5%', pr: '16.8%' }
  ]
};

const normalizeChampName = (name) => {
  if (!name) return "Yasuo";
  // Remove spaces, dots, and apostrophes
  let clean = name.replace(/['\s.&]/g, '');

  // Force first letter uppercase, others as is for DDragon
  if (clean.length > 1) {
    clean = clean.charAt(0).toUpperCase() + clean.slice(1);
  }

  const mapping = {
    'KhaZix': 'Khazix', 'KaiSa': 'Kaisa', 'BelVeth': 'Belveth', 'ChoGath': 'Chogath',
    'VelKoz': 'Velkoz', 'RekSai': 'RekSai', 'KSante': 'KSante', 'Wukong': 'MonkeyKing',
    'NunuWillump': 'Nunu', 'Nunu': 'Nunu', 'NunuandWillump': 'Nunu', 'RenataGlasc': 'Renata', 'LeBlanc': 'Leblanc',
    'DrMundo': 'DrMundo', 'Mundo': 'DrMundo', 'MasterYi': 'MasterYi', 'TahmKench': 'TahmKench',
    'JarvanIV': 'JarvanIV', 'FiddleSticks': 'Fiddlesticks', 'MonkeyKing': 'MonkeyKing',
    'KogMaw': 'KogMaw', 'XinZhao': 'XinZhao', 'LeeSin': 'LeeSin', 'Seraphine': 'Seraphine'
  };

  return mapping[clean] || clean;
};

const getQueueName = (game, t) => {
  if (!game) return "Unknown";
  const qId = parseInt(game.queueId);
  if (game.gameType === 'CUSTOM_GAME' || qId === 0 || qId === -1) return t ? t('queue_custom') : "Custom";
  const map = {
    400: 'queue_draft', 420: 'queue_solo', 430: 'queue_blind', 440: 'queue_flex',
    450: 'queue_aram', 490: 'queue_draft', 1700: 'queue_arena', 1900: 'queue_urf', 900: 'queue_urf', 1020: 'queue_custom'
  };
  const key = map[qId];
  if (key && t) return t(key);
  if (qId >= 830 && qId <= 850) return t ? t('queue_coop') : "Co-op vs AI";

  // Fallback names if t is missing or key not found
  const names = {
    400: 'Draft Pick', 420: 'Ranked Solo', 430: 'Blind Pick', 440: 'Ranked Flex',
    450: 'ARAM', 1700: 'Arena', 1900: 'URF'
  };
  return names[qId] || "Normal";
};

// --- New Screen 1: Dashboard View ---

function DashboardView({ t, panelClass, currentUser, targetSummoner, ddragonVersion, patchNotes, setActiveTab, setTargetChamp, onOpenUrl, onSearch, prefetchedData, userRank, userHistory, isPremium }) {
  const version = ddragonVersion || "16.1.1";
  /* DashboardView: Always show currentUser, ignoring search results */
  const displayUser = currentUser;
  const [rankedStats, setRankedStats] = useState(userRank);
  const [matchHistory, setMatchHistory] = useState(userHistory || []);
  const [selectedGame, setSelectedGame] = useState(null);
  const [allRolesMeta, setAllRolesMeta] = useState(() => {
    if (prefetchedData?.topMeta) {
      return { top: { data: prefetchedData.topMeta, timestamp: prefetchedData.timestamp } };
    }
    return {};
  });
  const [currentRoleIdx, setCurrentRoleIdx] = useState(0);
  const [metaProgress, setMetaProgress] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [loading, setLoading] = useState(!userRank && !userHistory?.length);
  const [lpGains, setLpGains] = useState([]);

  useEffect(() => {
    if (displayUser?.gameName) {
      const nameQuery = displayUser.gameName + "#" + displayUser.tagLine;
      const rKey = displayUser.region || 'euw';

      window.ipcRenderer.invoke('scraper:get-recent-lp', nameQuery, rKey)
        .then(res => {
          if (res && res.length > 0) {
            setLpGains(res);
          }
        }).catch(err => console.log("LP gains fetch failed", err));
    } else {
      setLpGains([]);
    }
  }, [displayUser]);

  useEffect(() => {
    let active = true;
    if (userRank) setRankedStats(userRank);
    if (userHistory) {
      setMatchHistory(userHistory);

      const fetchFull = async () => {
        const updates = [];
        for (let i = 0; i < userHistory.length; i++) {
          if (!active) break;
          const g = userHistory[i];
          if (g.participants?.length < 5) {
            try {
              const full = await window.ipcRenderer.invoke('lcu:get-game', g.gameId);
              if (full && full.participants?.length > 1) {
                updates.push({ index: i, game: full });
              }
            } catch (e) { }
          }
        }
        if (active && updates.length > 0) {
          setMatchHistory(prev => {
            const newHist = [...prev];
            updates.forEach(u => { newHist[u.index] = u.game; });
            return newHist;
          });
        }
      };

      setTimeout(fetchFull, 100);
    }
    if (userRank || userHistory?.length) setLoading(false);
    return () => { active = false; };
  }, [userRank, userHistory]);

  // Lazy Fetch Meta Data based on Carousel
  // Pre-load all roles sequentially, prioritizing current role
  useEffect(() => {
    let active = true;
    const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes

    const fetchAllSequentially = async () => {
      // 1. Prioritize current role
      const activeRole = ROLES[currentRoleIdx];
      const currentData = allRolesMeta[activeRole];
      const isStale = !currentData || (Date.now() - (currentData.timestamp || 0) > REFRESH_INTERVAL);

      if (isStale) {
        try {
          const data = await window.ipcRenderer.invoke('scraper:get-meta', activeRole);
          if (active) {
            const validData = (data && data.length > 0) ? data : (ROLE_PLACEHOLDERS[activeRole] || []);
            setAllRolesMeta(prev => ({
              ...prev,
              [activeRole]: { data: validData, timestamp: Date.now() }
            }));
          }
        } catch (e) {
          console.error(`Priority Meta fetch failed for ${activeRole}`, e);
          if (active) setAllRolesMeta(prev => ({ ...prev, [activeRole]: { data: ROLE_PLACEHOLDERS[activeRole] || [], timestamp: Date.now() } }));
        }
      }

      // 2. Fetch the rest in parallel
      const otherRoles = ROLES.filter(r => r !== activeRole);
      Promise.all(otherRoles.map(async (role) => {
        if (!active) return;
        const rData = allRolesMeta[role];
        const rStale = !rData || (Date.now() - (rData.timestamp || 0) > REFRESH_INTERVAL);

        if (rStale) {
          try {
            const data = await window.ipcRenderer.invoke('scraper:get-meta', role);
            if (active) {
              const validData = (data && data.length > 0) ? data : (ROLE_PLACEHOLDERS[role] || []);
              setAllRolesMeta(prev => ({
                ...prev,
                [role]: { data: validData, timestamp: Date.now() }
              }));
            }
          } catch (e) {
            console.error(`Background Meta fetch failed for ${role}`, e);
          }
        }
      }));
    };
    fetchAllSequentially();
    return () => { active = false; };
  }, [currentRoleIdx]);

  // Carousel Logic
  useEffect(() => {
    const duration = 5000;
    const intervalTime = 50;
    const step = (intervalTime / duration) * 100;

    const interval = setInterval(() => {
      setMetaProgress((prev) => {
        if (prev >= 100) {
          setAnimating(true);
          setTimeout(() => {
            setCurrentRoleIdx((p) => (p + 1) % ROLES.length);
            setAnimating(false);
          }, 400);
          return 0;
        }
        return prev + step;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  // Real data calculations
  const dashboardStats = useMemo(() => {
    const base = {
      kda: "0.0", wr: "0%", csm: "0.0", kp: "0", vision: "0", gpm: "0", oracle: "0", dpm: "0", objTaken: "0",
      wins: 0, count: 0, losses: 0, goldDiff: "0", kaDiff: "0",
      history: { kda: [], oracle: [], kp: [], csm: [], vision: [], gpm: [], gold: [], ka: [], dpm: [], objTaken: [] },
      trends: {
        kda: { text: "0.0", down: false },
        oracle: { text: "0.0", down: false },
        kp: { text: "0", down: false },
        csm: { text: "0.0", down: false },
        vision: { text: "0.0", down: false },
        gpm: { text: "0", down: false },
        dpm: { text: "0", down: false },
        objTaken: { text: "0", down: false }
      }
    };

    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const recentGames = matchHistory.filter(g => {
      const creation = g.gameCreation > 1e11 ? g.gameCreation : g.gameCreation * 1000;
      return creation >= sevenDaysAgo;
    });

    if (!recentGames.length || !displayUser) return base;

    let kTotal = 0, dTotal = 0, aTotal = 0, csSum = 0, wins = 0, visionTotal = 0, gpmSum = 0, dpmTotal = 0, objTakenSum = 0, kpSum = 0;
    let count = 0, validDiffCount = 0;
    let totalGoldDiffSum = 0, totalKaDiffSum = 0;
    let totalDurationMin = 0;

    const hist = { kda: [], oracle: [], kp: [], csm: [], vision: [], gpm: [], gold: [], ka: [], dpm: [], objTaken: [] };

    [...recentGames].reverse().forEach((g, i) => {
      const participants = g.participants || g.info?.participants || [];
      const participantIdentities = g.participantIdentities || [];

      const identity = participantIdentities.find(ident =>
        ident.player.puuid === displayUser.puuid ||
        ident.player.summonerName === displayUser.gameName ||
        ident.player.displayName === displayUser.displayName
      ) || participants.find(p => p.puuid === displayUser.puuid);

      if (!identity && !participants.some(p => p.puuid === displayUser.puuid)) return;

      const p = participants.find(part =>
        (identity?.participantId !== undefined && part.participantId === identity.participantId) ||
        (part.puuid && part.puuid === displayUser.puuid)
      );
      if (!p) return;

      const stats = p.stats || p;

      // Stat normalization helper
      const getNormalized = (partOrStats) => {
        const s = partOrStats?.stats || partOrStats || {};
        const teamIdVal = Number(partOrStats?.teamId || s?.teamId || 0);
        return {
          kills: s?.kills || 0,
          deaths: s?.deaths || 0,
          assists: s?.assists || 0,
          damage: s?.totalDamageDealtToChampions || s?.totalDamageDealtToChamps || 0,
          minions: (s?.totalMinionsKilled || 0) + (s?.neutralMinionsKilled || 0),
          gold: s?.goldEarned || s?.totalGold || 0,
          vision: s?.visionScore || 0,
          teamId: teamIdVal,
          damageDealtToObjectives: s?.damageDealtToObjectives || 0,
          turretKills: s?.turretKills || 0,
          inhibitorKills: s?.inhibitorKills || 0,
          win: s?.win === true || s?.win === 'Win' || partOrStats?.win === true || partOrStats?.win === 'Win'
        };
      };

      const myStats = getNormalized(p);
      count++;

      const gameDurationMin = Math.max(1, (g.gameDuration > 10000 ? g.gameDuration / 1000 : g.gameDuration) / 60);
      totalDurationMin += gameDurationMin;

      kTotal += myStats.kills; dTotal += myStats.deaths; aTotal += myStats.assists;
      csSum += myStats.minions;
      visionTotal += myStats.vision;

      const gameGpm = myStats.gold / gameDurationMin;
      gpmSum += gameGpm;
      if (myStats.win) wins++;

      const gameKda = parseFloat(((myStats.kills + myStats.assists) / Math.max(1, myStats.deaths)).toFixed(1));
      hist.kda.push(gameKda);
      hist.csm.push(parseFloat((myStats.minions / gameDurationMin).toFixed(1)));
      hist.vision.push(myStats.vision);
      hist.gpm.push(Math.round(gameGpm));

      const gameDpm = Math.round(myStats.damage / gameDurationMin);
      dpmTotal += myStats.damage;
      hist.dpm.push(gameDpm);

      // --- KP and Objectives Logic ---
      const chFields = stats.challenges || p.challenges || {};
      let gameKp = 0;
      let gameObjTaken = 0;
      const teamParticipants = participants.filter(tp => getNormalized(tp).teamId === myStats.teamId && myStats.teamId !== 0);

      // Challenges provide exact %
      if (typeof chFields.killParticipation === 'number') {
        gameKp = Math.round(chFields.killParticipation * 100);
      } else if (teamParticipants.length > 1) {
        const teamKillsSum = teamParticipants.reduce((acc, tp) => acc + (getNormalized(tp).kills), 0);
        gameKp = teamKillsSum > 0 ? Math.min(100, Math.round(((myStats.kills + myStats.assists) / teamKillsSum) * 100)) : 0;
        // Avoid fake 100% if we only have user data
        if (gameKp === 100 && teamParticipants.length < 5) gameKp = 42;
      } else {
        // Dynamic fallback to avoid flat graph when team data is missing
        const totalKA = myStats.kills + myStats.assists;
        gameKp = Math.min(100, 20 + totalKA * 3);
      }

      // Objective taken % based on Damage to Objectives
      const myDmgToObj = myStats.damageDealtToObjectives || 0;
      const teamDmgToObj = teamParticipants.reduce((acc, tp) => acc + (getNormalized(tp).damageDealtToObjectives || 0), 0);

      if (teamParticipants.length > 1 && teamDmgToObj > 0) {
        gameObjTaken = Math.min(100, Math.round((myDmgToObj / teamDmgToObj) * 100));
      } else {
        // Dynamic fallback based on raw damage when team data is missing
        gameObjTaken = myStats.win ? Math.min(100, 20 + Math.round((myStats.damage / 3000))) : Math.min(100, 5 + Math.round((myStats.damage / 4000)));
      }

      hist.kp.push(gameKp);
      hist.objTaken.push(gameObjTaken);
      kpSum += gameKp;
      objTakenSum += gameObjTaken;

      // Opponent logic
      const myLane = (p.timeline?.lane || p.lane || "").toUpperCase();
      const opponent = participants.find(op => Number(op.teamId) !== myStats.teamId && (op.timeline?.lane || op.lane || "").toUpperCase() === myLane);
      if (opponent) {
        validDiffCount++;
        const osNormal = getNormalized(opponent);
        const gDiffValue = Math.round((myStats.gold - osNormal.gold) * 0.45);
        totalGoldDiffSum += gDiffValue;
        hist.gold.push(gDiffValue);
        const kaDiffValue = (myStats.kills + myStats.assists) - (osNormal.kills + osNormal.assists);
        totalKaDiffSum += kaDiffValue;
        hist.ka.push(kaDiffValue);
      } else {
        hist.gold.push(0); hist.ka.push(0);
      }

      hist.oracle.push(Math.round((myStats.win ? 30 : 0) + (gameKda * 5) + (myStats.vision / 2)));
    });

    if (count === 0) return base;

    // Averages across the history
    const avgWinRateValue = wins / count;
    const avgKillsVal = kTotal / count;
    const oracleScoreValue = ((avgWinRateValue * 60) + (avgKillsVal * 4)).toFixed(1);

    // Dynamic Trend Helper: compares latest game vs period average
    const getTrend = (arr, fixed = 1) => {
      if (arr.length < 2) return { text: "+0.0", down: false };
      const avg = arr.slice(0, arr.length - 1).reduce((a, b) => a + b, 0) / (arr.length - 1); // Average of all but the last game
      const latest = arr[arr.length - 1];
      const diff = latest - avg;
      const sign = diff >= 0 ? "+" : "";
      return { text: sign + diff.toFixed(fixed), down: diff < 0 };
    };

    const kpTrend = getTrend(hist.kp, 0);
    const objTrend = getTrend(hist.objTaken, 0);
    const kdaTrend = getTrend(hist.kda, 1);
    const oracleTrend = getTrend(hist.oracle, 1);
    const csmTrend = getTrend(hist.csm, 1);
    const visTrend = getTrend(hist.vision, 1);
    const gpmTrend = getTrend(hist.gpm, 0);
    const dpmTrend = getTrend(hist.dpm, 0);

    return {
      kda: ((kTotal + aTotal) / Math.max(1, dTotal)).toFixed(1),
      wr: Math.round(avgWinRateValue * 100) + "%",
      csm: (csSum / totalDurationMin).toFixed(1),
      kp: Math.round(kpSum / count) + "",
      vision: (visionTotal / count).toFixed(1),
      gpm: (gpmSum / count).toFixed(0),
      dpm: Math.round(dpmTotal / totalDurationMin),
      objTaken: Math.round(objTakenSum / count) + "",
      oracle: oracleScoreValue,
      wins, count,
      losses: count - wins,
      history: hist,
      trends: { kda: kdaTrend, oracle: oracleTrend, kp: kpTrend, csm: csmTrend, vision: visTrend, gpm: gpmTrend, dpm: dpmTrend, objTaken: objTrend },
      goldDiff: validDiffCount > 0 ? (totalGoldDiffSum / validDiffCount).toFixed(0) : "0",
      kaDiff: validDiffCount > 0 ? (totalKaDiffSum / validDiffCount).toFixed(1) : "0"
    };
  }, [matchHistory, displayUser]);

  const p = useMemo(() => {
    if (!matchHistory[0] || !displayUser) return {};
    const ident = matchHistory[0].participantIdentities?.find(i => i.player.puuid === displayUser.puuid);
    return matchHistory[0].participants.find(part => part.participantId === ident?.participantId) || {};
  }, [matchHistory, displayUser]);
  const lastChampId = p.championId || 157;

  return (
    <div className="grid grid-cols-12 gap-4 animate-in fade-in slide-in-from-bottom-6 duration-700 max-w-[1600px] mx-auto h-full">

      {/* --- LEFT COLUMN: CONTENT (8/12) --- */}
      <div className="col-span-12 xl:col-span-9 flex flex-col gap-4 h-full">

        {/* HEADER AREA + STATS INTEGRATED */}
        <div className={cn("p-6 rounded-[24px] relative overflow-hidden flex flex-col gap-4 shrink-0", panelClass)}>
          <div className="absolute inset-0 z-0">
            <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Evelynn_0.jpg`} className="w-full h-full object-cover opacity-20 blur-sm brightness-50" />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-black/80"></div>
          </div>

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div className="relative">
                <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${displayUser?.profileIconId || 29}.png`} className="w-24 h-24 rounded-3xl border-2 border-gray-200 dark:border-white/10 shadow-2xl" />
                <div className="absolute -bottom-3 -right-3 bg-white border border-gray-200 dark:border-white/10 dark:bg-[#1e1e24] text-gray-900 dark:text-gray-100 text-[10px] font-black px-2 py-1 rounded-lg border border-gray-200 dark:border-white/5">
                  {displayUser?.summonerLevel || 1}
                </div>
                <div className="absolute -top-3 -left-3 bg-blue-600 text-gray-900 dark:text-gray-100 text-[9px] font-black px-2 py-0.5 rounded-md border border-gray-200 dark:border-white/10 shadow-lg uppercase tracking-widest">
                  {displayUser?.region || "EUW"}
                </div>
              </div>
              <div>
                <h1 className="text-5xl font-black text-gray-900 dark:text-gray-100 tracking-tighter mb-1">{displayUser?.gameName || displayUser?.displayName || "Summoner"}</h1>
                <div className="text-xl font-bold text-gray-900 dark:text-gray-100/30 tracking-tight">#{displayUser?.tagLine || "1234"}</div>
              </div>
            </div>

            {/* Header Right Content Removed */}
          </div>

          {/* STATS BAR (Integrated) */}
          <div className="relative z-10 grid grid-cols-4 gap-3">
            <DashboardStatCard
              label={t('kda')}
              value={dashboardStats.kda}
              trend={dashboardStats.trends.kda.text}
              trendDown={dashboardStats.trends.kda.down}
              color={dashboardStats.trends.kda.down ? "#ff4e50" : "#4ade80"}
              data={dashboardStats.history.kda}
            />
            <DashboardStatCard
              label={t('dpmScore').toUpperCase()}
              value={dashboardStats.oracle}
              trend={dashboardStats.trends.oracle.text}
              trendDown={dashboardStats.trends.oracle.down}
              color={dashboardStats.trends.oracle.down ? "#ff4e50" : "#4ade80"}
              data={dashboardStats.history.oracle}
            />
            <DashboardStatCard
              label={t('kp')}
              value={dashboardStats.kp}
              trend={dashboardStats.trends.kp.text}
              trendDown={dashboardStats.trends.kp.down}
              color={dashboardStats.trends.kp.down ? "#ff4e50" : "#4ade80"}
              data={dashboardStats.history.kp}
            />
            <DashboardStatCard
              label={t('csm')}
              value={dashboardStats.csm}
              trend={dashboardStats.trends.csm.text}
              trendDown={dashboardStats.trends.csm.down}
              color={dashboardStats.trends.csm.down ? "#ff4e50" : "#4ade80"}
              data={dashboardStats.history.csm}
            />

            <DashboardStatCard
              label={t('vision')}
              value={dashboardStats.vision}
              trend={dashboardStats.trends.vision.text}
              trendDown={dashboardStats.trends.vision.down}
              color={dashboardStats.trends.vision.down ? "#ff4e50" : "#4ade80"}
              data={dashboardStats.history.vision}
            />
            <DashboardStatCard
              label={t('gpm')}
              value={dashboardStats.gpm}
              trend={dashboardStats.trends.gpm.text}
              trendDown={dashboardStats.trends.gpm.down}
              color={dashboardStats.trends.gpm.down ? "#ff4e50" : "#4ade80"}
              data={dashboardStats.history.gpm}
            />
            <DashboardStatCard
              label={t('dmg_min_short')}
              value={dashboardStats.dpm || 0}
              trend={dashboardStats.trends.dpm.text}
              trendDown={dashboardStats.trends.dpm.down}
              color={dashboardStats.trends.dpm.down ? "#ff4e50" : "#4ade80"}
              data={dashboardStats.history.dpm}
            />
            <DashboardStatCard
              label={t('objective')}
              value={dashboardStats.objTaken || "0"}
              trend={dashboardStats.trends?.objTaken?.text || "0"}
              trendDown={dashboardStats.trends?.objTaken?.down || false}
              color={dashboardStats.trends?.objTaken?.down ? "#ff4e50" : "#4ade80"}
              data={dashboardStats.history?.objTaken || []}
            />
          </div>
        </div>

        {/* MIDDLE CONTENT ROW */}
        <div className="grid grid-cols-12 gap-4 flex-1 min-h-0">
          {/* Champion Meta Widget */}
          <div className={cn("col-span-8 p-5 rounded-[24px] group transition-all duration-500 relative overflow-hidden", panelClass)}>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 uppercase tracking-tighter flex items-center gap-3">
                  <Swords size={18} className="text-blue-500 animate-pulse" />
                  {t ? t('metaTierList') : t('meta_current')} • <span className="text-blue-400 capitalize">{ROLES[currentRoleIdx] || "Top"}</span>
                </h3>
              </div>
              <button
                onClick={() => setCurrentRoleIdx(prev => (prev + 1) % ROLES.length)}
                className="p-2 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 transition-colors text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-white"
              >
                <ChevronRight size={20} />
              </button>
            </div>

            <div className={cn("grid grid-cols-5 gap-4 transition-all duration-500 min-h-[140px]", animating ? "opacity-0 translate-y-2 scale-95" : "opacity-100 translate-y-0 scale-100")}>
              {(allRolesMeta[ROLES[currentRoleIdx]]?.data && allRolesMeta[ROLES[currentRoleIdx]].data.length > 0) ? (
                allRolesMeta[ROLES[currentRoleIdx]].data.map((c, i) => (
                  <div
                    key={`${c.name}-${i}`}
                    onClick={() => {
                      if (c.name) {
                        setTargetChamp(c.name);
                        setActiveTab('tierlist');
                      }
                    }}
                    className="flex flex-col items-center justify-between p-4 rounded-[20px] bg-white dark:bg-white/5 dark:bg-white/[0.02] backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-lg hover:border-accent-primary/50 hover:shadow-accent-primary/20 hover:-translate-y-1 transition-all cursor-pointer group/champ h-[140px]"
                  >
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${normalizeChampName(c.name)}.png`}
                      className="w-14 h-14 rounded-2xl shadow-md group-hover/champ:scale-105 transition-transform"
                      onError={(e) => { e.target.src = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/Yasuo.png`; }}
                    />
                    <div className="flex flex-col items-center gap-1 w-full overflow-hidden">
                      <div className="text-[10px] font-black text-gray-900 dark:text-gray-100 group-hover/champ:text-blue-400 transition-colors truncate w-full text-center">
                        {c.name || t('unknown')}
                      </div>
                      <div className="text-[9px] font-bold text-blue-400 uppercase tracking-wide">
                        {c.tier} TIER
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-12 flex flex-col items-center justify-center h-[140px] text-gray-900 dark:text-gray-100/20">
                  <Activity className="w-8 h-8 mb-2 opacity-50 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-widest">{t('loading_info')}</span>
                </div>
              )}
            </div>

            {/* PROGRESS BAR REMOVED */}
          </div>

          {/* Replay Module */}
          <div className={cn("col-span-4 p-5 rounded-[24px] flex flex-col items-center justify-end gap-3 group relative overflow-hidden", panelClass)}>
            <img
              src={`https://cdn.communitydragon.org/latest/champion/${lastChampId}/splash-art`}
              className="absolute inset-0 w-full h-full object-cover opacity-10 group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

            <div className="relative z-10 flex flex-col items-center text-center mt-auto">
              <div className="text-gray-900 dark:text-gray-100 font-black uppercase text-sm mb-1 tracking-tight">{t('last_game')}</div>
              <div className="text-gray-900 dark:text-gray-100/30 text-[10px] font-bold uppercase tracking-widest mb-4 italic">
                {getQueueName(matchHistory[0], t)} • {matchHistory[0]?.gameDuration ? Math.floor(matchHistory[0].gameDuration / 60) + ":" + (matchHistory[0].gameDuration % 60).toString().padStart(2, '0') : "00:00"} • {matchHistory[0] ? (() => { try { return new Date(matchHistory[0].gameCreation).toLocaleDateString(); } catch { return "-"; } })() : "-"}
              </div>
              <div className="text-lg font-black text-gray-900 dark:text-gray-100">
                {p.stats?.kills || 0} <span className="text-gray-900 dark:text-gray-100/20">/</span> <span className="text-red-500">{p.stats?.deaths || 0}</span> <span className="text-gray-900 dark:text-gray-100/20">/</span> {p.stats?.assists || 0}
              </div>
              <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">
                {(((p.stats?.kills || 0) + (p.stats?.assists || 0)) / Math.max(1, p.stats?.deaths || 1)).toFixed(2)} KDA
              </div>
            </div>
            <button
              onClick={() => setActiveTab('replays')}
              className="relative z-10 w-full mt-2 py-2 bg-white/10 rounded-xl text-[10px] font-black text-gray-900 dark:text-gray-100 uppercase tracking-widest border border-gray-200 dark:border-white/5 hover:bg-white/20 hover:scale-105 transition-all cursor-pointer"
            >
              {t('view_analysis')}
            </button>
          </div>
        </div>

        {/* NEW ROW: Patch News Feed */}
        <div className={cn("p-5 rounded-[24px] flex flex-col gap-4 relative overflow-hidden shrink-0 min-h-[160px]", panelClass)}>
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-gray-900 dark:text-gray-100 uppercase tracking-tighter flex items-center gap-3">
              <Newspaper size={18} className="text-purple-500" />
              {t('patch_news')}
            </h3>
            <button
              onClick={() => onOpenUrl("https://www.leagueoflegends.com/fr-fr/news/game-updates/")}
              className="text-[10px] font-bold text-gray-900 dark:text-gray-100/40 hover:text-gray-900 dark:text-gray-100 uppercase tracking-widest transition-colors flex items-center gap-1"
            >
              {t('view_all')} <ExternalLink size={10} />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {Array.isArray(patchNotes) && patchNotes.slice(0, 2).map((p, i) => {
              if (!p || !p.url) return null;
              return (
                <div key={p.url} onClick={() => onOpenUrl?.(p.url)} className="p-3 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 hover:bg-white/10 transition-colors cursor-pointer group flex items-center gap-4">
                  <div className={cn("w-16 h-12 rounded-lg bg-black/5 dark:bg-black/40 overflow-hidden flex items-center justify-center border border-gray-200 dark:border-white/10 font-black text-[10px] shrink-0", i === 0 ? "text-purple-400 border-purple-400/20 shadow-lg shadow-purple-500/10" : "text-gray-600 dark:text-gray-400")}>
                    {p.image ? (
                      <img src={p.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" alt="News" />
                    ) : (
                      p.patch || "NR"
                    )}
                  </div>
                  <div className="flex flex-col flex-1 min-w-0">
                    <div className={cn("text-sm font-bold transition-colors truncate", i === 0 ? "text-gray-900 dark:text-gray-100 group-hover:text-purple-400" : "text-gray-300 group-hover:text-gray-900 dark:text-gray-100")}>{p.title || "Patch Notes"}</div>
                    <div className="text-[10px] text-gray-600 dark:text-gray-400 line-clamp-1">{p.summary || t('no_summary')}</div>
                    <div className="text-[9px] text-gray-500 mt-1 font-mono uppercase tracking-widest">{p.date || t('recently')}</div>
                  </div>
                </div>
              )
            })}
            {(!patchNotes || patchNotes.length === 0) && (
              <div className="col-span-2 py-4 text-center text-gray-900 dark:text-gray-100/10 text-xs font-bold uppercase tracking-widest border border-dashed border-gray-200 dark:border-white/5 rounded-xl">
                {t('loading_news')}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* --- RIGHT COLUMN: SIDEBAR (3/12) --- */}
      <div className="col-span-12 xl:col-span-3 h-full flex flex-col gap-4">

        {/* RANK CARD (Modern Style from Profile) */}
        <ModernRankCard
          rankedStats={rankedStats}
          history={matchHistory}
          puuid={displayUser?.puuid}
          panelClass={cn(panelClass, "min-h-[140px]")}
          t={t}
<<<<<<< HEAD
          isPremium={isPremium && (!currentUser || displayUser?.puuid === currentUser?.puuid)}
=======
          isPremium={isPremium}
>>>>>>> c3886816852b3562e04905206a3a072f9223f682
          onSubscribe={() => setActiveTab('subscription')}
        />


        {/* MATCH HISTORY SIDEBAR */}
        <div className={cn("rounded-[24px] overflow-hidden flex flex-col min-h-0", panelClass)}>
          <div className="p-4 border-b border-gray-200 dark:border-white/5 shrink-0">
            <div className="text-[10px] font-black text-gray-900 dark:text-gray-100/40 uppercase tracking-[0.2em]">{t('latest_games')}</div>
          </div>
          <div className="h-[575px] overflow-y-auto custom-scrollbar bg-black/5 dark:bg-black/20 p-2 space-y-2">
            {matchHistory.slice(0, 20).map((g, i) => (
              <HistoryRowV2
                key={i}
                game={g}
                puuid={displayUser?.puuid}
                lpGains={lpGains}
                onClick={() => setSelectedGame(g)}
                t={t}
                ddragonVersion={ddragonVersion}
              />
            ))}
          </div>
          <div className="p-3 flex justify-center border-t border-gray-200 dark:border-white/5 shrink-0 hover:bg-white dark:bg-white/5 cursor-pointer transition-colors">
            <ChevronDown size={14} className="text-gray-900 dark:text-gray-100/20 group-hover:text-gray-900 dark:text-gray-100/50" />
          </div>

          {/* Match Details Modal */}
          <MatchDetailsModal
            game={selectedGame}
            isOpen={!!selectedGame}
            onClose={() => setSelectedGame(null)}
            selfPuuid={displayUser?.puuid}
            userRank={rankedStats}
            onSearch={(name) => {
              setSelectedGame(null);
              onSearch?.(name);
            }}
            t={t}
          />
        </div>

      </div>

    </div>
  );
}

// COMPONENT: Dashboard Stat Card with Interactive Sparkline
function DashboardStatCard({ label, value, trend, trendDown, color, data = [] }) {
  const [hoverIndex, setHoverIndex] = useState(null);

  // Dynamic scaling: find the real range of data
  const dataMax = data.length ? Math.max(...data) : 1;
  const dataMin = data.length ? Math.min(...data) : 0;
  const rawRange = dataMax - dataMin;

  // Natural scaling: Don't zoom in so much that a 1% change looks like a mountain
  // We ensure the Y-axis covers at least 20% of the average value for stability
  const minV = Math.max(0, rawRange < (dataMax * 0.1) ? dataMin - (dataMax * 0.1) : dataMin);
  const maxV = rawRange < (dataMax * 0.1) ? dataMax + (dataMax * 0.1) : dataMax;
  const range = Math.max(1, maxV - minV);

  const points = data.map((v, i) => ({
    x: (i / Math.max(1, data.length - 1)) * 100,
    y: range === 0 ? 20 : 35 - ((v - minV) / range) * 25,
    value: v
  }));

  const pathData = points.length > 1
    ? points.reduce((acc, p, i, a) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = a[i - 1];
      const cp1x = prev.x + (p.x - prev.x) * 0.5;
      const cp2x = prev.x + (p.x - prev.x) * 0.5;
      return `${acc} C ${cp1x} ${prev.y}, ${cp2x} ${p.y}, ${p.x} ${p.y}`;
    }, "")
    : "";

  return (
    <div className="bg-white dark:bg-black/20 backdrop-blur-xl rounded-[24px] p-5 border border-gray-200 dark:border-white/10 flex flex-col justify-between h-[115px] group hover:border-accent-primary/30 transition-all relative overflow-hidden shadow-2xl">
      {/* Background Glow */}
      <div
        className="absolute -right-4 -bottom-4 w-16 h-16 blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
        style={{ backgroundColor: color }}
      />

      <div className="flex justify-between items-start relative z-10">
        <div className="text-[10px] font-black text-gray-900 dark:text-gray-100/30 uppercase tracking-[0.15em]">{label}</div>
        {hoverIndex !== null && (
          <div className="text-[10px] font-black px-2 py-0.5 rounded bg-white/10 text-gray-900 dark:text-gray-100 animate-in fade-in zoom-in duration-200">
            {points[hoverIndex].value}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between relative z-10">
        <div className="min-w-0">
          <div className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tighter mb-1 select-none flex items-baseline gap-1">
            <span>{value}</span>
            {(label.toUpperCase().includes('KP') || label.toUpperCase().includes('OBJ')) && !value.toString().includes('%') && <span className="text-sm font-bold opacity-30 select-none">%</span>}
          </div>
          <div className={cn("text-[10px] font-black flex items-center gap-1.5 uppercase tracking-wider transition-transform group-hover:translate-x-1", trendDown ? "text-red-400" : "text-emerald-400")}>
            <div className={cn("w-1.5 h-1.5 rounded-full", trendDown ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-emerald-500 shadow-[0_0_8px_rgba(52,211,153,0.5)]")} />
            {trend} <span className="text-gray-900 dark:text-gray-100/20 font-bold lowercase opacity-40">vs 1w</span>
          </div>
        </div>

        <div className="w-16 h-8 mb-1 relative shrink-0">
          <svg
            viewBox="0 0 100 40"
            className="w-full h-full overflow-visible"
            onMouseLeave={() => setHoverIndex(null)}
          >
            {/* Hover Trigger Areas */}
            {points.map((p, i) => (
              <rect
                key={i}
                x={p.x - 5} y="0" width="10" height="40"
                fill="transparent"
                onMouseEnter={() => setHoverIndex(i)}
                className="cursor-pointer"
              />
            ))}

            {/* Hover Indicator Line */}
            {hoverIndex !== null && (
              <line
                x1={points[hoverIndex].x} y1="0"
                x2={points[hoverIndex].x} y2="40"
                stroke={color} strokeWidth="1" strokeDasharray="2 2"
                className="opacity-40 animate-in fade-in duration-200"
              />
            )}

            <path
              d={pathData}
              fill="none"
              stroke={color}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-500"
              style={{ strokeDasharray: 200, strokeDashoffset: 0 }}
            />

            {/* Hover Point */}
            {hoverIndex !== null && (
              <g className="animate-in fade-in duration-200">
                <circle
                  cx={points[hoverIndex].x}
                  cy={points[hoverIndex].y}
                  r="4"
                  fill={color}
                  className="shadow-lg"
                />
                <circle
                  cx={points[hoverIndex].x}
                  cy={points[hoverIndex].y}
                  r="8"
                  fill="none"
                  stroke={color}
                  strokeWidth="1.5"
                  strokeOpacity="0.2"
                  className="animate-ping"
                />
              </g>
            )}
          </svg>
        </div>
      </div>
    </div>
  );
}

// COMPONENT: Sidebar Match History Item
function HistorySidebarCard({ game, t }) {
  const p = game.participants[0];
  const isWin = p.stats.win;
  const kda = ((p.stats.kills + p.stats.assists) / Math.max(1, p.stats.deaths)).toFixed(1);
  const time = (() => { try { return new Date(game.gameCreation).toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' }); } catch { return "--:--"; } })();
  const queueName = getQueueName(game, t);

  return (
    <div className="p-4 border-b border-gray-200 dark:border-white/5 hover:bg-white dark:bg-white/5 transition-all group flex items-center gap-4">
      <div className="flex flex-col gap-0.5 min-w-[50px]">
        <div className="text-[10px] font-black text-gray-900 dark:text-gray-100 tabular-nums">{time}</div>
        <div className="text-[8px] font-black text-gray-900 dark:text-gray-100/20 uppercase tracking-widest leading-none truncate max-w-[50px]">{queueName}</div>
      </div>
      <div className="relative">
        <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${p.championId}.png`} className="w-8 h-8 rounded-lg shadow-lg" />
        <div className={cn("absolute -top-1 -right-1 w-2 h-2 rounded-full border border-[#1e1e24]", isWin ? "bg-blue-500" : "bg-red-500")} />
      </div>
      <div className="flex-1">
        <div className="text-xs font-black text-gray-900 dark:text-gray-100 tabular-nums">
          {p.stats.kills} <span className="text-gray-900 dark:text-gray-100/20">/</span> <span className="text-red-500">{p.stats.deaths}</span> <span className="text-gray-900 dark:text-gray-100/20">/</span> {p.stats.assists}
        </div>
        <div className="text-[9px] font-black text-gray-900 dark:text-gray-100/20 uppercase tracking-widest">{kda} KDA</div>
      </div>
      <div className="flex flex-col items-center gap-1 opacity-20 group-hover:opacity-100 transition-opacity">
        <div className="text-[8px] font-black text-orange-400 tabular-nums">91st</div>
        <div className="w-4 h-4 rounded-full border-2 border-orange-500/50 flex items-center justify-center">
          <div className="w-1.5 h-1.5 bg-orange-500 rounded-full" />
        </div>
      </div>
    </div>
  );
}

// COMPONENT: Side Champion Performance
function ChampSideCard({ name, win, loss, kda }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/champion/${normalizeChampName(name)}.png`} className="w-10 h-10 rounded-2xl shadow-xl border border-gray-200 dark:border-white/10" />
      <div className="text-center">
        <div className="text-[10px] font-black text-gray-900 dark:text-gray-100 uppercase tracking-widest mb-0.5">{name}</div>
        <div className="text-[9px] font-black text-gray-900 dark:text-gray-100/40 uppercase mb-1">{win} - <span className="text-red-500">{loss}</span></div>
        <div className="text-[9px] font-black text-blue-400 tabular-nums">{kda}</div>
      </div>
    </div>
  );
}

const PING_ICONS = {
  danger: "https://raw.communitydragon.org/latest/game/assets/ux/minimap/minimap_ping_icon__danger.png",
  assist: "https://raw.communitydragon.org/latest/game/assets/ux/minimap/minimap_ping_icon__assist.png",
  missing: "https://raw.communitydragon.org/latest/game/assets/ux/minimap/minimap_ping_icon__missing.png",
  omw: "https://raw.communitydragon.org/latest/game/assets/ux/minimap/minimap_ping_icon__onmyway.png",
  enemy_missing: "https://raw.communitydragon.org/latest/game/assets/ux/minimap/minimap_ping_icon__enemymissing.png",
  vision: "https://raw.communitydragon.org/latest/game/assets/ux/minimap/minimap_ping_icon__vision.png"
};

const PremiumOverlay = ({ title, text, onAction }) => (
  <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-[60] flex flex-col items-center justify-center rounded-inherit border border-yellow-500/20 m-[1px] rounded-2xl">
    <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mb-4 border border-yellow-500/20">
      <Star size={32} className="text-yellow-400 fill-current drop-shadow-[0_0_10px_rgba(234,179,8,0.8)]" />
    </div>
    <h3 className="text-2xl text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 font-black italic tracking-tighter mb-2 drop-shadow-lg text-center px-4">
      {title || "Oracle Gold Requis"}
    </h3>
    <p className="text-gray-400 text-xs text-center px-8 mb-6 max-w-sm font-medium leading-relaxed">
      {text || "Pour débloquer cette fonctionnalité avancée et prendre l'avantage, abonnez-vous à Oracle Gold."}
    </p>
    <button
      onClick={onAction}
      className="px-6 py-2 bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-black uppercase tracking-widest text-[10px] rounded-xl hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(234,179,8,0.4)] pointer-events-auto"
    >
      Découvrir
    </button>
  </div>
);

function ProfileView({ t, panelClass, currentUser, targetSummoner, onSearch, onChampClick, onBack, overlaySettings, ddragonVersion, isPremium, onSubscribe }) {
  const [displayUser, setDisplayUser] = useState(null);
  const [rankedStats, setRankedStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [fullHistory, setFullHistory] = useState([]);
  const [teammates, setTeammates] = useState([]);
  const [topChamps, setTopChamps] = useState([]);
  const [roleStats, setRoleStats] = useState({ TOP: 0, JUNGLE: 0, MIDDLE: 0, BOTTOM: 0, SUPPORT: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [lastChampId, setLastChampId] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  // New State for Filters and Live Game & Debug
  const [filter, setFilter] = useState('All');
  const [activeGame, setActiveGame] = useState(null);
  const [error, setError] = useState(null);
  const [debugPhase, setDebugPhase] = useState("");
  const [championMap, setChampionMap] = useState({});
  const [presenceStatus, setPresenceStatus] = useState('offline');
  const [lpGains, setLpGains] = useState([]);
  // Mock Behavioral Data Init
  const [behavioral, setBehavioral] = useState({ consistency: 'A', tilt: 'Resilient', objective: 'Controller', synergy: 'High', vision: 'Top 10%', aggression: 'Medium' });

  useEffect(() => {
    const defaults = { consistency: '-', tilt: '-', objective: '-', synergy: '-', vision: '-', aggression: '-' };
    if (!history || history.length === 0 || !displayUser) {
      setBehavioral(defaults);
      return;
    }

    // Calculate Behavioral Stats
    let totalTips = 0; // Tilt calc
    let streak = 0;

    // Aggregation vars
    let totalVision = 0;
    let totalAssists = 0;
    let totalKills = 0;
    let totalObjDmg = 0;
    let totalGold = [];
    let gameCount = 0;

    history.forEach((game, idx) => {
      const identity = game.participantIdentities.find(i => i.player.puuid === displayUser?.puuid || i.player.summonerName === displayUser?.gameName);
      if (!identity) return;
      const part = game.participants.find(p => p.participantId === identity.participantId);
      if (!part) return;

      const stats = part.stats;
      gameCount++;
      totalVision += stats.visionScore || 0;
      totalAssists += stats.assists || 0;
      totalKills += stats.kills || 0;
      totalObjDmg += stats.damageDealtToObjectives || 0;
      totalGold.push(stats.goldEarned);

      // Tilt calc: Check loss streak or win after loss
      if (!stats.win) streak++;
      else streak = 0;
    });

    if (gameCount === 0) {
      setBehavioral(defaults);
      return;
    }

    // Derivations
    const avgVision = totalVision / gameCount;
    const avgAssists = totalAssists / gameCount;
    const avgObj = totalObjDmg / gameCount;

    // Consistency: Gold Variance
    const avgGold = totalGold.reduce((a, b) => a + b, 0) / gameCount;
    const variance = totalGold.reduce((a, b) => a + Math.pow(b - avgGold, 2), 0) / gameCount;
    const stdDev = Math.sqrt(variance);
    // Lower CV (Coef of Variation) = Better Consistency
    const cv = stdDev / avgGold;
    let consistency = "B";
    if (cv < 0.15) consistency = "S+";
    else if (cv < 0.2) consistency = "A";
    else if (cv < 0.25) consistency = "B";
    else consistency = "C";

    // Tilt
    // Simple mock logic: if recent games have high loss streak -> Prone to Tilt
    const tilt = streak > 2 ? "Prone to Tilt" : "Resilient";

    // Objective
    let objective = "Passive";
    if (avgObj > 5000) objective = "Controller";
    else if (avgObj > 2000) objective = "Participant";

    // Synergy
    let synergy = "Low";
    if (avgAssists > 10) synergy = "Excellent";
    else if (avgAssists > 5) synergy = "Good";

    // Vision
    let vision = "Top 50%";
    if (avgVision > 30) vision = "Top 1%";
    else if (avgVision > 20) vision = "Top 10%";
    else if (avgVision > 10) vision = "Top 30%";

    // Aggression
    let aggression = "Balanced";
    const avgKills = totalKills / gameCount;
    if (avgKills > 8) aggression = "Hyper Aggro";
    else if (avgKills > 4) aggression = "Opportunist";
    else aggression = "Safe";

    setBehavioral({
      consistency,
      tilt,
      objective,
      synergy,
      vision,
      aggression
    });

  }, [history, displayUser]);

  useEffect(() => {
    fetch('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-summary.json')
      .then(res => res.json())
      .then(data => {
        const map = {};
        data.forEach(c => map[c.id] = c.name);
        setChampionMap(map);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let intervalId;
    let isFetching = false;
    let cachedUser = null;

    async function fetchData(isInitial = false) {
      if (isFetching) return;
      isFetching = true;

      try {
        if (isInitial) setLoading(true); // Only show spinner on first load/search change
        setError(null); // Clear previous errors
        let user = null;
        if (targetSummoner) {
          if (cachedUser) {
            user = cachedUser;
          } else {
            console.log("[ProfileView] Searching for targetSummoner:", targetSummoner);
            const { name, region, skipLcu, puuid } = (typeof targetSummoner === 'string')
              ? { name: targetSummoner, region: null, skipLcu: false, puuid: null }
              : targetSummoner;

            const currentRegion = currentUser?.region || 'EUW';

            let parsedRegion = region;
            if (!parsedRegion && puuid && puuid.startsWith('ext~')) {
              const parts = puuid.split('~');
              if (parts.length >= 3) {
                parsedRegion = parts[2];
              }
            }
            const finalRegion = parsedRegion || currentRegion;
            const skipLcuFinal = skipLcu || (puuid && puuid.startsWith('ext~')) || (finalRegion !== currentRegion);

            console.log(`[ProfileView] Search Params - Name: ${name}, Region: ${finalRegion}, skipLcu: ${skipLcuFinal}`);

            // Force timeout after 45s to prevent infinite loading
            const searchPromise = window.ipcRenderer.invoke('lcu:search-summoner', name, finalRegion, skipLcuFinal, puuid);
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error("Search timed out")), 45000));

            try {
              user = await Promise.race([searchPromise, timeoutPromise]);
              cachedUser = user;
              console.log("[ProfileView] Search successful. Result for", name, ":", user ? user.displayName : "NULL");
            } catch (err) {
              console.error("[ProfileView] Search failed or timed out for", name, err);
              user = null;
            }
          }
        } else {
          user = currentUser;
          console.log("[ProfileView] Using current profile:", user ? user.displayName : "NULL");
        }

        if (user && (user.puuid || user.accountId)) { // Robust check
          setDisplayUser(user);
        } else {
          console.warn("User not found or invalid", user);
          setDisplayUser(null);
          setLoading(false);
          return; // Stop here if user not found
        }

        // Safety Break: If puuid is missing (e.g. Scraper returned null/error object that wasn't caught), stop.
        if (!user.puuid) {
          console.error("User object missing PUUID", user);
          setError(t('summoner_not_found'));
          setDisplayUser(null); // Ensure we fall to error screen
          setLoading(false);
          return;
        }

        // Fetch phase first to set activeGame ASAP
        const phase = await window.ipcRenderer.invoke('lcu:get-gameflow-phase');
        setDebugPhase(phase || "Unknown");

        // Live Game Check
        let foundActiveGame = null;

        // Fetch Friends to check status if not me
        const isMe = currentUser && user.puuid === currentUser.puuid;

        // 1. Check local session (Classic check)
        // This covers "Me" and "Anyone in my game"
        if (phase === 'InProgress') {
          const session = await window.ipcRenderer.invoke('lcu:get-gameflow-session');
          if (session && session.gameData) {
            const allPlayers = [...(session.gameData.teamOne || []), ...(session.gameData.teamTwo || [])];
            const isTargetInGame = allPlayers.some(p => p.puuid === user.puuid);

            if (isTargetInGame) {
              const liveData = isMe ? await window.ipcRenderer.invoke('live:get-all-data').catch(() => null) : null;
              foundActiveGame = { session, liveData, phase };
            }
          }
        }

        // 2. If NOT found locally, and NOT me, checks Friends Presence
        if (!foundActiveGame && !isMe) {
          try {
            const friends = await window.ipcRenderer.invoke('lcu:get-friends');
            if (friends && Array.isArray(friends)) {
              const friend = friends.find(f => f.puuid === user.puuid);

              if (friend) {
                // Friend Found! Check status
                // availability: 'chat' | 'dnd' | 'away' | 'mobile' | 'offline'
                // lol: { gameStatus: 'inGame' | 'outOfGame', gameQueueType, timeStamp, ... }

                // We can optionally force "Offline" UI if availability is offline, handled by render logic later
                // But if gameStatus is inGame, we override Offline visual with "Partie en cours"

                const lol = friend.lol || {};

                if (lol.gameStatus === 'inGame') {
                  // Champion Resolution Logic
                  let champName = t('unknown');
                  let isTFT = (lol.gameQueueType || "").includes("TFT");

                  if (!isTFT) {
                    // Try skinname first if valid string (sometimes empty)
                    // skinname usually holds the champ name like "Ahri"
                    if (lol.skinname && lol.skinname.length > 2) {
                      champName = lol.skinname;
                    } else if (lol.championId && championMap[lol.championId]) {
                      // Fallback to ID map
                      champName = championMap[lol.championId];
                    }
                  } else {
                    champName = t('unknown'); // TFT specific request
                  }

                  // Queue Resolution
                  const queueType = lol.gameQueueType || "";
                  let qID = 0;
                  if (queueType === 'RANKED_SOLO_5x5') qID = 420;
                  else if (queueType === 'RANKED_FLEX_SR') qID = 440;
                  else if (queueType === 'ARAM_UNRANKED_5x5') qID = 450;
                  else if (queueType === 'NORMAL' || queueType === 'NORMAL_5x5_BLIND') qID = 430;
                  else if (queueType === 'NORMAL_5x5_DRAFT') qID = 400;
                  else if (queueType === 'PRACTICETOOL') qID = -1; // Custom

                  // Construct Mock Session
                  foundActiveGame = {
                    phase: 'InProgress',
                    liveData: {
                      gameData: {
                        gameTime: (Date.now() - (lol.timeStamp || Date.now())) / 1000
                      },
                      activePlayer: {
                        championName: champName // Fixes visual display directly
                      }
                    },
                    session: {
                      gameData: {
                        gameType: qID === -1 ? 'CUSTOM_GAME' : 'CLASSIC',
                        queue: { id: qID },
                        isCustomGame: qID === -1
                      }
                    },
                    isFriendPresence: true,
                    friendData: {
                      ...friend,
                      gameId: lol.gameId,
                      platformId: friend.platformId || 'EUW1' // Fallback for EUW users
                    }
                  };
                }
              }

              // Set presence status
              if (foundActiveGame) {
                setPresenceStatus('ingame');
              } else if (friend.availability === 'chat' || friend.availability === 'away' || friend.availability === 'dnd') {
                setPresenceStatus('online');
              } else {
                setPresenceStatus('offline');
              }
            }
          } catch (e) {
            console.warn("Failed to check friends status", e);
          }
        }

        setActiveGame(foundActiveGame);

        if (user && user.puuid) {
          const region = user.region || currentUser?.region || 'EUW';
          const hasRiotKey = !!(overlaySettings?.riotApiKey);

          const [stats, matches, mastery] = await Promise.all([
            hasRiotKey
              ? window.ipcRenderer.invoke('riot:get-league-entries', { summonerId: user.summonerId, region })
              : window.ipcRenderer.invoke('lcu:get-ranked-stats', user.puuid),

            hasRiotKey
              ? window.ipcRenderer.invoke('riot:get-match-history', { puuid: user.puuid, region, count: 50 })
              : window.ipcRenderer.invoke('lcu:get-match-history', user.puuid, 0, 150),

            window.ipcRenderer.invoke('lcu:get-champion-mastery', user.puuid)
          ]);

          // Normalize League Stats if from Riot API
          let normalizedStats = stats;
          if (hasRiotKey && Array.isArray(stats)) {
            const solo = stats.find(s => s.queueType === 'RANKED_SOLO_5x5');
            const flex = stats.find(s => s.queueType === 'RANKED_FLEX_SR');
            normalizedStats = {
              queueMap: {
                RANKED_SOLO_5x5: solo ? { tier: solo.tier, division: solo.rank, leaguePoints: solo.leaguePoints, wins: solo.wins, losses: solo.losses } : { tier: 'UNRANKED', division: '' },
                RANKED_FLEX_SR: flex ? { tier: flex.tier, division: flex.rank, leaguePoints: flex.leaguePoints, wins: flex.wins, losses: flex.losses } : { tier: 'UNRANKED', division: '' }
              }
            };
          }

          setRankedStats(normalizedStats);

          if (!matches) {
            console.warn("Matches returned null");
          }

          if (matches) {
            const gamesList = matches.games?.games || matches.games || (Array.isArray(matches) ? matches : []);

            if (gamesList.length > 0) {
              const recentGames = gamesList; // Use all 50

              const gamesForTeammates = recentGames.slice(0, 5);

              setHistory(recentGames.slice(0, 20)); // Show 20 in history list
              setFullHistory(recentGames); // All 50 for the rank estimators / graphs

              // Set Last Champ ID
              const lastGame = recentGames[0];
              const identity = lastGame.participantIdentities.find(i => i.player.puuid === user.puuid);
              if (identity) {
                const part = lastGame.participants.find(p => p.participantId === identity.participantId);
                if (part) setLastChampId(part.championId);
              }

              // --- CALC TOP CHAMPS FROM ALL RECENT GAMES (Summary) ---
              // This runs immediately without waiting for full game details
              try {
                const champStats = {};
                const roleCounts = { TOP: 0, JUNGLE: 0, MIDDLE: 0, BOTTOM: 0, SUPPORT: 0, total: 0 };

                recentGames.forEach(g => {
                  // Find self in summary
                  const iden = g.participantIdentities.find(i => i.player.puuid === user.puuid);
                  if (!iden) return;

                  const part = g.participants.find(p => p.participantId === iden.participantId);
                  if (!part) return;

                  // Champ Stats
                  const cid = part.championId;
                  const cName = championMap[cid] || "Unknown";

                  if (!champStats[cName]) {
                    champStats[cName] = { name: cName, count: 0, wins: 0, k: 0, d: 0, a: 0 };
                  }

                  const s = champStats[cName];
                  s.count++;
                  if (part.stats && part.stats.win) s.wins++;
                  if (part.stats) {
                    s.k += part.stats.kills || 0;
                    s.d += part.stats.deaths || 0;
                    s.a += part.stats.assists || 0;
                  }

                  // Role Stats
                  // Timeline role/lane are often unreliable in summary, but it's what we have.
                  // Sometimes it's in `timeline` object, sometimes `part.lane`/`part.role` directly in older APIs.
                  // LCU summary typically has `timeline: { lane, role }`.
                  const lane = (part.timeline?.lane || part.lane || "").toUpperCase();
                  const role = (part.timeline?.role || part.role || "").toUpperCase();

                  if (lane === 'JUNGLE' || lane === 'JGL') roleCounts.JUNGLE++;
                  else if (lane === 'TOP') roleCounts.TOP++;
                  else if (lane === 'MIDDLE' || lane === 'MID') roleCounts.MIDDLE++;
                  else if (lane === 'BOTTOM' || lane === 'BOT') {
                    // Check role for support vs carry
                    if (role === 'DUO_SUPPORT' || role === 'SUPPORT') roleCounts.SUPPORT++;
                    else roleCounts.BOTTOM++;
                  }
                  roleCounts.total++;
                });

                const sortedChamps = Object.values(champStats).sort((a, b) => b.count - a.count).slice(0, 6);
                setTopChamps(sortedChamps);
                setRoleStats(roleCounts);
              } catch (e) {
                console.error("Top Champ Calc Error", e);
              }

              // Fetch LP Gains
              const regionForLp = user.region || currentUser?.region || 'EUW';
              const nameForLp = user.gameName ? `${user.gameName}#${user.tagLine}` : (user.displayName || user.summonerName);
              window.ipcRenderer.invoke('scraper:get-recent-lp', nameForLp, regionForLp)
                .then(data => { if (data?.length) setLpGains(data); })
                .catch(err => console.log('LP error', err));

              // Fetch full games parallel for TEAMMATES
              Promise.all(gamesForTeammates.map(g => window.ipcRenderer.invoke('lcu:get-game', g.gameId)))
                .then(fullGames => {
                  const validGames = fullGames.filter(g => g && g.participants && g.participants.length > 1);
                  const partnerCounts = {};

                  validGames.forEach(g => {
                    try {

                      const identities = g.participantIdentities || [];
                      const participants = g.participants || [];

                      if (!user || !participants.length) return;

                      const clean = s => (s || "").toLowerCase().replace(/\s/g, '').split('#')[0];
                      const userName = clean(user.gameName || user.displayName || user.summonerName);
                      const userPuuid = user.puuid;
                      const userSummonerId = user.summonerId;

                      let myPart = null;

                      // Strategy 1: PUUID (Best)
                      if (userPuuid) {
                        const id = identities.find(i => i.player && i.player.puuid == userPuuid);
                        if (id) {
                          myPart = participants.find(p => p.participantId == id.participantId);
                        } else {
                          myPart = participants.find(p => p.puuid == userPuuid);
                        }
                      }

                      // Strategy 2: Summoner ID
                      if (!myPart && userSummonerId) {
                        const id = identities.find(i => i.player && i.player.summonerId == userSummonerId);
                        if (id) {
                          myPart = participants.find(p => p.participantId == id.participantId);
                        }
                      }

                      // Strategy 3: Name
                      if (!myPart && userName) {
                        const id = identities.find(i => i.player && clean(i.player.gameName || i.player.summonerName) === userName);
                        if (id) {
                          myPart = participants.find(p => p.participantId == id.participantId);
                        } else {
                          myPart = participants.find(p => {
                            const pName = clean(p.gameName || p.summonerName || p.riotIdGameName);
                            return pName === userName;
                          });
                        }
                      }

                      if (!myPart) return;

                      const myTeamId = myPart.teamId;

                      // Determine win via Team (more robust than stats.win)
                      const team = g.teams ? g.teams.find(t => t.teamId == myTeamId) : null;
                      const won = team ? (team.win === 'Win' || team.win === true || team.win === "true") : (myPart.stats && myPart.stats.win);

                      // Scan for teammates
                      // Scan for teammates
                      participants.forEach(p => {
                        if (p.teamId != myTeamId) return;
                        if (p.participantId == myPart.participantId) return; // Skip self

                        // Try to get Name + Tag
                        let name = p.gameName || p.riotIdGameName || p.summonerName;
                        let tag = p.riotIdTagLine || "";
                        let icon = p.profileIconId || 29;

                        const id = identities.find(i => i.participantId == p.participantId);
                        if (id && id.player) {
                          name = id.player.gameName || id.player.summonerName || name;
                          tag = id.player.tagLine || tag;
                          icon = id.player.profileIcon || icon;
                        }

                        let puuid = p.puuid || (id && id.player && id.player.puuid);

                        if (!name) return;

                        // Ensure tag exists if possible (default to region if needed, but let's try empty first)
                        // Actually, for search we WANT the tag.

                        const displayName = name.trim();
                        const searchName = tag ? `${displayName}#${tag}` : displayName;

                        // Extra safety: Skip if name matches user
                        if (userName && clean(displayName) === userName) return;

                        // Key by searchName to handle duplicates of same name different tag
                        const key = searchName;

                        if (!partnerCounts[key]) {
                          partnerCounts[key] = {
                            name: displayName,      // Visual Name
                            searchName: searchName, // Actual ID for API
                            puuid: puuid,
                            count: 0,
                            wins: 0,
                            icon: icon,
                            lastSeen: g.gameCreation || 0
                          };
                        }

                        partnerCounts[key].count++;
                        if (won) {
                          partnerCounts[key].wins++;
                        }
                      });
                    } catch (e) {
                      console.error("Error processing game for teammates", e);
                    }
                  });

                  const calculatedTeammates = Object.values(partnerCounts).sort((a, b) => b.lastSeen - a.lastSeen).slice(0, 6);

                  if (calculatedTeammates.length > 0) {
                    setTeammates(calculatedTeammates);
                  } else {
                    setTeammates([{
                      name: `No recent players found`,
                      count: 0,
                      wins: 0,
                      icon: 29,
                      isInfo: true
                    }]);
                  }
                }).catch(err => console.error("Teammates error", err));
            } else {
              setHistory([]);
              setTeammates([{
                name: `No recent players found`,
                count: 0,
                wins: 0,
                icon: 29,
                isInfo: true
              }]);
            }
          }
        }

      } catch (e) {
        console.error("Profile Fetch Error", e);
        setError(e.message);
      } finally {
        isFetching = false;
        if (isInitial) setLoading(false);
      }
    }

    // Reset Critical States on prop change to avoid stale data
    setHistory([]);
    setFullHistory([]);
    setActiveGame(null);
    setTeammates([]);

    fetchData(true); // Initial run IS initial
    intervalId = setInterval(() => fetchData(false), 5000); // Interval runs are NOT initial
    return () => clearInterval(intervalId);
  }, [currentUser, targetSummoner, championMap]);

  const solo = rankedStats?.queueMap?.RANKED_SOLO_5x5 || { tier: 'UNRANKED', division: '' };
  const tierIcon = (solo.tier && solo.tier !== 'UNRANKED')
    ? `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${solo.tier.toLowerCase()}.png`
    : `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-unranked.png`;

  // Cache-bust banner to ensure update
  const bannerSrc = lastChampId ? `https://cdn.communitydragon.org/latest/champion/${lastChampId}/splash-art/centered?ts=${Date.now()}` : "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Darius_0.jpg";

  // Filter Logic
  const filteredHistory = history.filter(game => {
    if (filter === 'All') return true;
    if (filter === 'Solo') return game.queueId === 420;
    if (filter === 'Flex') return game.queueId === 440;
    if (filter === 'Draft') return game.queueId === 400;
    if (filter === 'Others') return ![420, 440, 400].includes(game.queueId);
    return true;
  });

  const records = React.useMemo(() => {
    if (!history || history.length === 0) return { kills: 0, damage: 0, vision: 0, csm: 0 };
    let mk = 0, md = 0, mv = 0, mc = 0;
    history.forEach(g => {
      const id = g.participantIdentities?.find(i => i.player.puuid === displayUser?.puuid)?.participantId;
      const p = g.participants?.find(part => part.participantId === id);
      if (p && p.stats) {
        if (p.stats.kills > mk) mk = p.stats.kills;
        if (p.stats.totalDamageDealtToChampions > md) md = p.stats.totalDamageDealtToChampions;
        if (p.stats.visionScore > mv) mv = p.stats.visionScore;
        const durationMin = Math.max(1, g.gameDuration) / 60;
        const csm = (p.stats.totalMinionsKilled + p.stats.neutralMinionsKilled) / durationMin;
        if (csm > mc) mc = csm;
      }
    });
    return {
      kills: mk,
      damage: md > 1000 ? (md / 1000).toFixed(1) + 'k' : md,
      vision: mv,
      csm: mc.toFixed(1)
    };
  }, [history, displayUser]);

  const lensData = React.useMemo(() => {
    if (!history || history.length === 0) return { aggression: 50, survival: 50, vision: 50, farming: 50, objective: 50, playstyle: "Unknown", focus: "Play More" };

    let totalKills = 0, totalDeaths = 0, totalAssists = 0;
    let totalVision = 0, totalCS = 0, totalTime = 0;
    let totalObjDmg = 0;
    let gameCount = history.length;

    history.forEach(g => {
      const id = g.participantIdentities?.find(i => i.player.puuid === displayUser?.puuid)?.participantId;
      const p = g.participants?.find(part => part.participantId === id);
      if (p && p.stats) {
        totalKills += (p.stats.kills || 0);
        totalDeaths += (p.stats.deaths || 0);
        totalAssists += (p.stats.assists || 0);
        totalVision += (p.stats.visionScore || 0);
        totalCS += ((p.stats.totalMinionsKilled || 0) + (p.stats.neutralMinionsKilled || 0));
        totalTime += g.gameDuration;
        totalObjDmg += (p.stats.damageDealtToObjectives || 0);
      }
    });

    const avgKDA = (totalKills + totalAssists) / Math.max(1, totalDeaths);
    const avgVision = totalVision / gameCount;
    const avgCSM = totalCS / (Math.max(1, totalTime) / 60);
    const avgDeaths = totalDeaths / gameCount;
    const avgObjDmg = totalObjDmg / gameCount;

    let playstyle = "Tactical Specialist";
    if (avgKDA > 4.5 && avgCSM > 7) playstyle = "Complete Carry";
    else if (avgKDA > 4) playstyle = "Aggressive Carry";
    else if (avgKDA > 3.5 && avgDeaths > 6) playstyle = "Berserker";
    else if (avgCSM > 8) playstyle = "Resource Hoarder";
    else if (avgCSM > 7) playstyle = "Consistent Farmer";
    else if (avgVision > 25) playstyle = "Map Architect";
    else if (avgObjDmg > 8000) playstyle = "Objective Melter";
    else if (avgKDA > 3 && avgDeaths < 4) playstyle = "KDA Player";
    else if (avgDeaths < 5 && avgKDA < 2.5) playstyle = "Supportive Soul";
    else if (avgDeaths > 8) playstyle = "Facechecker";
    else if (avgKDA < 2) playstyle = "Passive Player";

    const possibleFocuses = [];
    if (avgDeaths > 7.5) possibleFocuses.push("Die Less");
    if (avgDeaths > 6 && avgKDA < 2.5) possibleFocuses.push("Survival First");
    if (avgVision < 10) possibleFocuses.push("Buy Wards");
    if (avgVision < 18 && (avgDeaths > 5 || avgKDA < 3)) possibleFocuses.push("Vision Control");
    if (avgCSM < 5) possibleFocuses.push("Fix Farming");
    if (avgObjDmg < 4000) possibleFocuses.push("Objective Push");
    if (avgObjDmg < 2500) possibleFocuses.push("Hit Towers");
    if (avgKDA > 3.5 && avgObjDmg < 5000) possibleFocuses.push("Group Up");
    if (avgKDA > 4 && avgVision < 15) possibleFocuses.push("More Roaming");
    if (avgDeaths > 6 && avgKDA > 3) possibleFocuses.push("Positioning");
    if (avgCSM > 8 && avgKDA < 2) possibleFocuses.push("Teamfight Presence");

    let focus = "Consistent Growth";
    if (possibleFocuses.length > 0) {
      focus = possibleFocuses[Math.floor(((totalKills * 3) + totalDeaths) % possibleFocuses.length)];
    } else {
      const goodFocuses = ["Expand Lead", "Consistent Growth", "Apply Pressure", "Improve Macro", "Be Consistent"];
      focus = goodFocuses[Math.floor(totalTime % goodFocuses.length)];
    }

    return {
      aggression: Math.min(100, (avgKDA / 6) * 100),
      survival: Math.max(0, 100 - (avgDeaths / 10) * 100),
      vision: Math.min(100, (avgVision / 25) * 100),
      farming: Math.min(100, (avgCSM / 8.5) * 100),
      objective: Math.min(100, (avgObjDmg / 12000) * 100),
      playstyle,
      focus
    };
  }, [history, displayUser]);

  const behavioralData = React.useMemo(() => {
    if (!history || history.length === 0) return { consistency: "C", tilt: "Unknown", farming: "0", activity: "0%", survival: "0", aggression: "0" };

    // 1. Consistency: Variance in C.S./Min (Real Stat)
    const csmList = history.map(g => {
      const id = g.participantIdentities?.find(i => i.player.puuid === displayUser?.puuid)?.participantId;
      const p = g.participants?.find(part => part.participantId === id);
      const min = g.gameDuration / 60;
      return (p?.stats?.totalMinionsKilled || 0) / (min || 20);
    });
    const avgCSM = csmList.reduce((a, b) => a + b, 0) / (csmList.length || 1);
    const variance = csmList.reduce((a, b) => a + Math.pow(b - avgCSM, 2), 0) / (csmList.length || 1);
    const stdDev = Math.sqrt(variance);
    // Lower CV is better. 1.0 CSM deviation is huge if avg is 7.
    let consistency = "C";
    if (stdDev < 0.5) consistency = "S+";
    else if (stdDev < 1.0) consistency = "A";
    else if (stdDev < 1.5) consistency = "B";

    // 2. Tilt Resilience: Win rate after a loss
    let lossEvents = 0;
    let redeemed = 0;
    // Iterate oldest to newest to track streaks properly, but history is likely New->Old.
    // If New->Old: history[i] is newer than history[i+1].
    // If history[i+1] (older) was a loss, did history[i] (newer) win?
    for (let i = 0; i < history.length - 1; i++) {
      const olderGame = history[i + 1];
      const olderId = olderGame.participantIdentities?.find(id => id.player.puuid === displayUser?.puuid)?.participantId;
      const olderWin = olderGame.participants?.find(p => p.participantId === olderId)?.stats.win;

      if (!olderWin) {
        lossEvents++;
        const newerGame = history[i];
        const newerId = newerGame.participantIdentities?.find(id => id.player.puuid === displayUser?.puuid)?.participantId;
        const newerWin = newerGame.participants?.find(p => p.participantId === newerId)?.stats.win;
        if (newerWin) redeemed++;
      }
    }
    const tilt = lossEvents === 0 ? "Untested" : (redeemed / lossEvents) >= 0.5 ? "Resilient" : "Prone";

    // 3. Farming: Average CS/M
    const farmingScore = avgCSM.toFixed(1);

    // 4. Activity: Kill Participation (KP)
    let kpSum = 0;
    let kpCount = 0;

    history.forEach(g => {
      const id = g.participantIdentities?.find(i => i.player.puuid === displayUser?.puuid)?.participantId;
      const p = g.participants?.find(part => part.participantId === id);
      if (!p) return;

      const stats = p.stats || p;
      const chFields = stats.challenges || p.challenges || {};
      let gameKp = 0;

      const myTeamId = Number(p.teamId || stats.teamId || 0);
      const teamParticipants = g.participants.filter(tp => Number(tp.teamId || (tp.stats && tp.stats.teamId) || 0) === myTeamId && myTeamId !== 0);

      const getKills = (pt) => (pt.stats || pt).kills || 0;
      const myKills = getKills(p);
      const myAssists = (stats.assists || 0);

      if (typeof p.kp !== 'undefined') {
        let parsedKp = typeof p.kp === 'string' ? parseFloat(p.kp.replace('%', '')) : p.kp;
        if (parsedKp <= 1) parsedKp *= 100;
        gameKp = Math.round(parsedKp);
      } else if (typeof chFields.killParticipation === 'number') {
        gameKp = Math.round(chFields.killParticipation * 100);
      } else if (teamParticipants.length > 1) {
        const teamKillsSum = teamParticipants.reduce((acc, tp) => acc + getKills(tp), 0);
        gameKp = teamKillsSum > 0 ? Math.min(100, Math.round(((myKills + myAssists) / teamKillsSum) * 100)) : 0;
        if (gameKp === 100 && teamParticipants.length < 5 && teamKillsSum === (myKills + myAssists)) gameKp = 42;
      } else {
        const totalKA = myKills + myAssists;
        gameKp = Math.min(100, 20 + totalKA * 3);
      }

      kpSum += gameKp;
      kpCount++;
    });

    const finalActivityStr = kpCount > 0 ? Math.min(100, Math.round(kpSum / kpCount)) + "%" : "0%";

    // 5. Survival: Avg Deaths
    const deathsList = history.map(g => {
      const id = g.participantIdentities?.find(i => i.player.puuid === displayUser?.puuid)?.participantId;
      const p = g.participants?.find(part => part.participantId === id);
      return p?.stats.deaths || 0;
    });
    const avgDeaths = deathsList.reduce((a, b) => a + b, 0) / (deathsList.length || 1);

    let survival = "Feeder";
    if (avgDeaths < 3) survival = "Immortal";
    else if (avgDeaths < 5) survival = "Safe";
    else if (avgDeaths < 7) survival = "Balanced";
    else if (avgDeaths < 9) survival = "Risky";

    // 6. Aggression: (K+A)/Min
    const aggroList = history.map(g => {
      const id = g.participantIdentities?.find(i => i.player.puuid === displayUser?.puuid)?.participantId;
      const p = g.participants?.find(part => part.participantId === id);
      const min = g.gameDuration / 60;
      return ((p?.stats.kills || 0) + (p?.stats.assists || 0)) / (min || 20);
    });
    const avgAggro = aggroList.reduce((a, b) => a + b, 0) / (aggroList.length || 1);
    let aggression = "Passive";
    if (avgAggro > 1.0) aggression = "Hyper";
    else if (avgAggro > 0.7) aggression = "High";
    else if (avgAggro > 0.4) aggression = "Medium";

    return {
      consistency: consistency,
      tilt: tilt,
      farming: farmingScore,
      activity: finalActivityStr,
      survival: survival,
      aggression: aggression
    };
  }, [history, displayUser]);

  if (loading) {
    return (
      <div className={cn("h-full flex flex-col items-center justify-center relative animate-in fade-in duration-500", panelClass)}>
        {/* Ambient Background Glow */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-accent-primary/20 rounded-full blur-3xl animate-pulse"></div>
        </div>

        {/* Central Content - No Frame */}
        <div className="relative z-10 flex flex-col items-center p-12">
          <div className="relative mb-8">
            {/* Just the Logo, no container box, no rings */}
            <div className={cn("w-32 h-32 relative filter transition-all duration-700", isPremium ? "drop-shadow-[0_0_30px_rgba(234,179,8,0.4)]" : "drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]")}>
              <img src={oracleLogo} className="w-full h-full object-contain animate-pulse transition-all duration-700" style={isPremium ? { filter: 'sepia(1) saturate(2) hue-rotate(-20deg) brightness(1.3) drop-shadow(0 0 10px rgba(234,179,8,0.5))' } : {}} />
            </div>
          </div>

          <div className="text-center space-y-3">
            <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-gray-400 tracking-tight">
              {t('searching')}
            </h2>
            <div className="flex items-center gap-2 justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-bounce [animation-delay:-0.3s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-bounce [animation-delay:-0.15s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-bounce"></span>
            </div>
            <p className="text-blue-200/60 text-xs font-mono tracking-[0.2em] uppercase mt-2">
              {t('loading_data')}
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!loading && !displayUser) {
    return (
      <div className={cn("h-full flex flex-col items-center justify-center relative animate-in fade-in duration-500", panelClass)}>
        {/* Background Ambient Error Glow */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-red-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Glass Card */}
        <div className="relative z-10 flex flex-col items-center p-10 rounded-3xl border border-gray-200 dark:border-white/10 bg-black/5 dark:bg-black/40 backdrop-blur-md shadow-2xl max-w-sm w-full mx-6">
          <div className="relative w-20 h-20 flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-red-500/20 blur-2xl rounded-full animate-pulse-slow"></div>
            <Ghost className="text-red-400 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)] relative z-10" size={48} strokeWidth={1.5} />
          </div>

          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-3 tracking-tight">{t('profile_not_found_title')}</h2>
          {error && (
            <div className="mb-4 text-xs font-mono text-center text-red-300 bg-red-500/10 border border-red-500/20 p-2 rounded w-full overflow-hidden text-ellipsis break-all">
              DEBUG: {error}
            </div>
          )}
          <p className="text-gray-600 dark:text-gray-400 text-center text-sm mb-8 leading-relaxed font-medium">
            {t('profile_not_found_desc')}
          </p>

          <button
            onClick={() => onBack ? onBack() : (onSearch && onSearch(""))}
            className="w-full py-3.5 bg-gradient-to-r from-white/10 to-transparent hover:from-white/15 border border-gray-200 dark:border-white/5 hover:border-gray-200 dark:border-white/20 rounded-xl font-bold text-gray-900 dark:text-gray-100 transition-all flex items-center justify-center gap-2 group active:scale-95 shadow-lg"
          >
            <ChevronLeft size={16} className="text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:text-gray-100 group-hover:-translate-x-1 transition-all" />
            {t('back_btn')}
          </button>
        </div>
      </div>
    );
  }

  // Determines if the avatar should have the Golden aesthetic (only if it's the current user)
  const isDisplayUserPremium = isPremium && (!targetSummoner || displayUser?.puuid === currentUser?.puuid);

  return (
    <div id="profile-scroll-container" className={cn("h-full flex flex-col gap-2 animate-in fade-in", panelClass, "p-0! overflow-y-auto custom-scrollbar bg-white dark:bg-slate-50 dark:bg-[#0a0a0c] transition-colors duration-300")}>
      {/* Header */}
      <div className="relative h-[280px] w-full shrink-0 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img src={bannerSrc} className="w-full h-full object-cover object-top opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent dark:from-[#0a0a0c] dark:via-[#0a0a0c]/80 dark:to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-[#0a0a0c] dark:via-transparent dark:to-transparent"></div>
        </div>

        {/* User Info Overlay */}
        <div className="relative h-full flex items-center px-8 z-10">
          <div className="flex items-start gap-6">
            <div className="relative group">
<<<<<<< HEAD
              <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${displayUser?.profileIconId || 29}.jpg`} className={cn("w-28 h-28 rounded-[2rem] border-4 shadow-2xl relative z-10 transition-all", isDisplayUserPremium ? "border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]" : "border-[#1e1e24]")} />
              <div className="absolute -top-3 -left-3 bg-[#5c7ce5] text-white font-bold px-2 py-0.5 rounded-lg text-xs shadow-lg z-20 uppercase">{displayUser?.region || "EUW"}</div>
              {isDisplayUserPremium && (
=======
              <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${displayUser?.profileIconId || 29}.jpg`} className={cn("w-28 h-28 rounded-[2rem] border-4 shadow-2xl relative z-10 transition-all", isPremium ? "border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]" : "border-[#1e1e24]")} />
              <div className="absolute -top-3 -left-3 bg-[#5c7ce5] text-white font-bold px-2 py-0.5 rounded-lg text-xs shadow-lg z-20 uppercase">{displayUser?.region || "EUW"}</div>
              {isPremium && (
>>>>>>> c3886816852b3562e04905206a3a072f9223f682
                <div className="absolute -top-3 -right-3 z-20 animate-in zoom-in duration-300">
                  <div className="bg-gradient-to-br from-yellow-300 to-yellow-600 text-[#13141a] p-1.5 rounded-full shadow-[0_0_15px_rgba(234,179,8,0.5)] border-2 border-[#13141a]">
                    <Star size={18} className="fill-current" />
                  </div>
                </div>
              )}
              {displayUser?.summonerLevel > 0 && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 dark:border-white/10 dark:bg-[#1e1e24] text-gray-900 dark:text-gray-100 font-bold px-3 py-1 rounded-lg text-sm border border-[#2d2d35] z-20">{displayUser.summonerLevel}</div>
              )}
            </div>
            <div className="mt-2 text-left">
<<<<<<< HEAD
              <div className="relative group mb-0 leading-tight">
                <h1 className={cn("text-3xl font-semibold tracking-tight italic inline-block", isDisplayUserPremium ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 drop-shadow-sm" : "text-gray-900 dark:text-gray-100")}>{displayUser?.gameName || displayUser?.displayName || "Summoner"}</h1>
              </div>
=======
              <h1 className={cn("text-3xl font-semibold tracking-tight mb-0 leading-tight italic", isPremium ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 drop-shadow-sm" : "text-gray-900 dark:text-gray-100")}>{displayUser?.gameName || displayUser?.displayName || "Summoner"}</h1>
>>>>>>> c3886816852b3562e04905206a3a072f9223f682
              <div className="text-lg text-gray-600 dark:text-gray-400 font-normal uppercase flex items-center gap-3">
                <span>#{displayUser?.tagLine || displayUser?.region || "EUW"}</span>
              </div>
              {/* Partial Profile Warning */}
              {displayUser?.isPartial && (
                <div className="mt-2 text-xs text-yellow-500 bg-yellow-500/10 px-2 py-1 rounded border border-yellow-500/20 inline-block">
                  {t('stats_unavailable')}
                </div>
              )}
              {/* Online Status Badge */}
              {/* Online Status Badge */}
              <div className="flex items-center gap-2 mt-3">
                {activeGame && activeGame.phase === 'InProgress' ? (
                  <>
                    <div className="relative">
                      <div className="w-2.5 h-2.5 rounded-full bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.6)] z-10 relative"></div>
                      <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping opacity-75"></div>
                    </div>
                    <span className="text-xs font-semibold text-orange-400 tracking-wide uppercase">
                      {t('ingame')} ({(() => {
                        const getQKey = (g) => {
                          if (!g) return 'queue_unknown';
                          if (g.gameType === 'CUSTOM_GAME' || g.gameType === 'PRACTICETOOL' || !g.queue || !g.queue.id || g.queue.id === 0 || g.queue.id === -1) return 'queue_custom';
                          const q = parseInt(g.queue.id);
                          const map = {
                            400: 'queue_draft', 420: 'queue_solo', 430: 'queue_blind', 440: 'queue_flex',
                            450: 'queue_aram', 490: 'queue_draft', 1700: 'queue_arena', 1900: 'queue_urf', 900: 'queue_urf', 1020: 'queue_custom'
                          };
                          if (map[q]) return map[q];
                          if (q >= 830 && q <= 850) return 'queue_coop';
                          return 'queue_unknown';
                        };

                        let qKey = 'queue_unknown';
                        if (activeGame.isFriendPresence) {
                          const qId = activeGame.session.gameData.queue.id;
                          const map = {
                            400: 'queue_draft', 420: 'queue_solo', 430: 'queue_blind', 440: 'queue_flex',
                            450: 'queue_aram', 1700: 'queue_arena', 1900: 'queue_urf'
                          };
                          qKey = map[qId] || 'queue_custom';
                        } else {
                          qKey = getQKey(activeGame.session?.gameData);
                        }
                        return t(qKey);
                      })()}) - {t('playing')} <span className="text-orange-400">
                        {activeGame.liveData?.activePlayer?.championName || (() => {
                          if (activeGame.isFriendPresence) {
                            return activeGame.friendData?.lol?.skinname || t('champion');
                          }
                          const s = activeGame.session?.gameData;
                          if (!s) return t('champion');
                          const players = [...(s.teamOne || []), ...(s.teamTwo || [])];
                          const me = players.find(p => p.puuid === displayUser?.puuid);
                          return me ? (championMap[me.championId] || t('champion')) : t('champion');
                        })()}
                      </span>
                      {activeGame.isFriendPresence ? (
                        <span className="ml-2 text-gray-500 font-normal">
                          {Math.floor(activeGame.liveData.gameData.gameTime / 60)}m {Math.floor(activeGame.liveData.gameData.gameTime % 60)}s
                        </span>
                      ) : (
                        <HeaderTimer gameTime={activeGame.liveData?.gameData?.gameTime} />
                      )}
                    </span>
                  </>
                ) : (
                  /* Show Online badge if it is Me OR Friend is online */
                  (currentUser && displayUser && currentUser.puuid === displayUser.puuid) || presenceStatus === 'online' ? (
                    <>
                      <div className="relative">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)] z-10 relative"></div>
                        <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-green-500 animate-ping opacity-75"></div>
                      </div>
                      <span className="text-xs font-semibold text-gray-600 dark:text-gray-400 tracking-wide uppercase">{t('connected')}</span>
                    </>
                  ) : (
                    <>
                      <div className="w-2.5 h-2.5 rounded-full bg-gray-600 z-10 relative"></div>
                      <span className="text-xs font-semibold text-gray-500 tracking-wide uppercase">{t('disconnected')}</span>
                    </>
                  )
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs (Top Right of Header Area or Bottom Right) */}

      </div>

      {/* 2. Main Content Grid */}
      <div className="grid grid-cols-12 gap-6 px-8 pb-0 items-stretch">

        {/* Left Column: Match History */}
        <div className="col-span-5 flex flex-col gap-6 min-h-0">

          {/* Filters */}
          <div className="flex gap-2 pb-2 overflow-x-auto no-scrollbar">
            {
              ['All', 'Solo', 'Flex', 'Draft', 'Others'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={cn("px-4 py-1.5 rounded-lg text-[10px] font-semibold transition-all whitespace-nowrap uppercase tracking-tighter", filter === f ? "bg-white text-black" : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 hover:bg-white/10")}
                >
                  {f === 'All' ? t('all') : f === 'Solo' ? t('solo_duo') : f === 'Flex' ? t('flex') : f === 'Draft' ? t('draft') : f === 'Others' ? t('others') : t('all')}
                </button>
              ))
            }
          </div>
          <div className="flex-1 flex flex-col h-full min-h-0">
            {/* Match History Container - Rounded Frame with internal scrolling */}
            <div className="bg-white dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 p-4 flex flex-col gap-3 h-[625px] overflow-hidden shadow-2xl">
              <div className="shrink-0 flex items-center justify-between">
                <h3 className="text-gray-600 dark:text-gray-400 text-xs font-bold uppercase flex items-center gap-2">
                  <Clock size={12} /> {t('recent_matches')}
                </h3>
                <div className="text-[10px] text-gray-600 font-mono">{t('last_20_games')}</div>
              </div>

              <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar flex flex-col gap-3">
                {/* Active Live Game Card */}
                {activeGame && (activeGame.session || activeGame.phase === 'InProgress') && (
                  <LiveGameRow
                    activeGame={activeGame}
                    puuid={activeGame.friendData ? activeGame.friendData.puuid : displayUser?.puuid}
                    summonerId={activeGame.friendData ? activeGame.friendData.summonerId : displayUser?.summonerId}
                    gameId={activeGame.friendData?.gameId}
                    platformId={activeGame.friendData?.platformId}
                    t={t}
                  />
                )}

                {filteredHistory.length === 0 && !activeGame ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-gray-500 bg-white dark:bg-white/5 rounded-2xl border border-gray-200 dark:border-white/5 min-h-[300px]">
                    <Activity className="w-24 h-24 opacity-20 mb-4" strokeWidth={1} />
                    <div className="font-bold">{t('no_match_found')}</div>
                  </div>
                ) : (
                  filteredHistory.map((game, i) => (
                    <HistoryRowV2
                      key={i}
                      game={game}
                      puuid={displayUser?.puuid}
                      lpGains={lpGains}
                      onClick={() => setSelectedGame(game)}
                      t={t}
                      ddragonVersion={ddragonVersion}
                    />
                  ))
                )}
                <MatchDetailsModal
                  game={selectedGame}
                  isOpen={!!selectedGame}
                  onClose={() => setSelectedGame(null)}
                  selfPuuid={displayUser?.puuid}
                  userRank={rankedStats}
                  onSearch={(name) => {
                    setSelectedGame(null);
                    onSearch && onSearch(name);
                  }}
                  t={t}
                />
              </div>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden w-full flex flex-col shadow-2xl" style={{ minHeight: "480px" }}>
            {!isPremium && <PremiumOverlay onAction={onSubscribe} title="Analyse Comportementale" text="Débloquez l'analyse psychologique avancée de votre profil de joueur avec Oracle Gold." />}
            <div className={cn("w-full h-full flex flex-col", !isPremium && "blur-lg pointer-events-none opacity-60 scale-[1.02]")}>
              <BehavioralCard data={behavioralData} t={t} />
            </div>
          </div>
        </div>

        {/* Middle Column: Stats Cards */}
        <div className="col-span-4 flex flex-col gap-6" >
          {/* Rank Section (Modern Style) */}
          <div className="flex flex-col" >
            <ModernRankCard
              rankedStats={rankedStats}
              history={fullHistory.length > 0 ? fullHistory : history}
              puuid={displayUser?.puuid}
              panelClass={panelClass}
              t={t}
              isPremium={isPremium}
              onSubscribe={onSubscribe}
            />
          </div>

          {/* Lens Card (Radar Chart) - Moved here as requested */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            {!isPremium && <PremiumOverlay onAction={onSubscribe} title="Oracle Lens" text="L'analyse en araignée de vos KPI est réservée aux membres Oracle Gold." />}
            <div className={!isPremium ? "blur-xl pointer-events-none opacity-50 scale-105" : ""}>
              <LensCard data={lensData} t={t} rankedStats={rankedStats} />
            </div>
          </div>

          {/* Records Card (Modern Style) */}
          <div className="bg-white dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 p-6 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[300px] hover:border-yellow-500/20 transition-all duration-500" >
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-yellow-500/10 transition-all duration-700"></div>

            {/* Header & Tag */}
            <div className="relative z-10 flex justify-between items-center mb-6" >
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
                  <Trophy size={14} className="text-yellow-400" />
                </div>
                <h3 className="text-gray-900 dark:text-gray-100 font-bold text-xs uppercase tracking-[0.1em]">{t('records')}</h3>
              </div>
              <div className="bg-yellow-500/10 text-yellow-500 text-[9px] font-black px-2 py-0.5 rounded-full border border-yellow-500/20 uppercase tracking-tight flex items-center gap-1">
                <Star size={8} fill="currentColor" /> {t('season_best')}
              </div>
            </div>

            {/* Grid */}
            <div className="relative z-10 grid grid-cols-2 gap-4" >
              <RecordMiniItem
                icon={Sword}
                val={records.kills}
                label={t('most_kills')}
                iconBg="bg-red-500/10"
                color="text-red-400"
                t={t}
              />
              <RecordMiniItem
                icon={Zap}
                val={records.damage}
                label={t('dmg_dealt')}
                iconBg="bg-purple-500/10"
                color="text-purple-400"
                t={t}
              />
              <RecordMiniItem
                icon={Eye}
                val={records.vision}
                label={t('vision_score')}
                iconBg="bg-emerald-500/10"
                color="text-emerald-400"
                t={t}
              />
              <RecordMiniItem
                icon={Crosshair}
                val={records.csm}
                label={t('cs_min')}
                iconBg="bg-orange-500/10"
                color="text-orange-400"
                t={t}
              />
            </div>

            {/* Trophy Watermark */}
            <div className="absolute top-4 right-4 opacity-[0.03] group-hover:opacity-[0.07] transition-opacity duration-1000 transform scale-[2] pointer-events-none" >
              <Trophy size={120} className="text-gray-900 dark:text-gray-100" />
            </div>
          </div>




        </div>

        {/* Right Column: Pings & Teammates */}
        <div className="col-span-3 flex flex-col gap-6" >
          {/* Teammates Card */}
          <div className="flex-1 bg-white dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 p-6 min-h-0 overflow-hidden flex flex-col shadow-2xl" >
            <h3 className="text-gray-600 dark:text-gray-400 text-xs font-bold uppercase flex items-center gap-2 mb-4">
              <Users size={12} /> {t('recent_players')}
            </h3>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {teammates.length > 0 ? teammates.map((p, i) => (
                <div
                  key={i}
                  onClick={() => onSearch && onSearch({ name: p.searchName, puuid: p.puuid, region: displayUser?.region || currentUser?.region || 'EUW', skipLcu: false })}
                  className="flex items-center justify-between group hover:bg-white dark:bg-white/5 p-2 rounded-xl transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <img src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/profileicon/${p.icon || 29}.png`} className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10" />
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate max-w-[80px]" title={p.name}>{p.name}</span>
                      <span className="text-[9px] text-gray-500">{p.count} {t('games_played')}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={cn("text-xs font-bold", p.count > 0 && (p.wins / p.count) >= 0.5 ? "text-green-400" : "text-red-400")}>
                      {p.count > 0 ? Math.round((p.wins / p.count) * 100) : 0}% WR
                    </div>
                  </div>
                </div>
              )) : <div className="text-gray-500 text-xs text-center mt-4 italic">{t('no_partners')}</div>}
            </div>
          </div>

          {/* Top Champions Card */}
          <div className="bg-white dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 p-6 flex flex-col shadow-2xl overflow-hidden flex-1" >
            <h3 className="text-gray-600 dark:text-gray-400 text-xs font-bold uppercase flex items-center gap-2 mb-4">
              <Trophy size={12} /> {t('top_champions')}
            </h3>
            <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
              {topChamps.length > 0 ? topChamps.map((c, i) => {
                const wr = Math.round((c.wins / c.count) * 100);
                const kda = c.d === 0 ? t("perfect") : ((c.k + c.a) / c.d).toFixed(2);
                return (
                  <div
                    key={i}
                    onClick={() => onChampClick && onChampClick(c.name)}
                    className="flex items-center justify-between group hover:bg-white dark:bg-white/5 p-2 rounded-xl transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/champion/${normalizeChampName(c.name)}.png`}
                        className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10"
                        onError={(e) => e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png"}
                      />
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-gray-900 dark:text-gray-100 truncate max-w-[80px]" title={c.name}>{c.name}</span>
                        <span className="text-[9px] text-gray-500">{c.count} {t('games_played')}</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end">
                      <div className={cn("text-xs font-bold", wr >= 50 ? "text-green-400" : "text-red-400")}>
                        {wr}% WR
                      </div>
                      <span className="text-[9px] text-gray-600 dark:text-gray-400 font-mono">{kda} KDA</span>
                    </div>
                  </div>
                )
              }) : <div className="text-gray-500 text-xs text-center mt-4 italic">No recent champion stats</div>}
            </div>
          </div>



          {/* New Preferred Roles Card */}
          <div className="bg-white dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 p-6 shadow-2xl" >
            <h3 className="text-gray-600 dark:text-gray-400 text-xs font-bold uppercase flex items-center gap-2 mb-6">
              <Swords size={12} /> {t('preferred_roles')}
            </h3>
            <div className="flex justify-between items-center text-center">
              {['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'SUPPORT'].map((r, i) => {
                const count = roleStats[r] || 0;
                const total = Math.max(1, roleStats.total);
                const pct = Math.round((count / total) * 100);

                // Map to icon names
                const iconMap = {
                  'TOP': 'position-top',
                  'JUNGLE': 'position-jungle',
                  'MIDDLE': 'position-middle',
                  'BOTTOM': 'position-bottom',
                  'SUPPORT': 'position-utility'
                };
                const iconUrl = `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/${iconMap[r]}.svg`;

                return (
                  <div key={r} className="flex flex-col items-center gap-1 group">
                    <img src={iconUrl} className={cn("w-6 h-6 transition-all opacity-40 group-hover:opacity-100", pct > 0 ? "opacity-90" : "opacity-30 grayscale")} />
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{pct}%</div>
                    <div className="text-[9px] text-gray-500 font-medium">{count} {t('parties')}</div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>

      {/* Spacer for bottom scrolling */}
      <div className="h-20 shrink-0"></div>

    </div>
  )
}

function LensCard({ data, t, rankedStats }) {
  const points = [
    { label: t("aggression"), value: data.aggression, angle: -90 },
    { label: t("objective"), value: data.objective, angle: -18 },
    { label: t("farming"), value: data.farming, angle: 54 },
    { label: t("vision_radar"), value: data.vision, angle: 126 },
    { label: t("survival"), value: data.survival, angle: 198 },
  ];

  const size = 260;
  const center = size / 2;
  const radius = size * 0.35;

  const getPoint = (val, angle, rScale = 1) => {
    const r = (val / 100) * radius * rScale;
    const a = (angle * Math.PI) / 180;
    return {
      x: center + r * Math.cos(a),
      y: center + r * Math.sin(a)
    };
  };

  const polyPoints = points.map(p => {
    const pt = getPoint(p.value, p.angle);
    return `${pt.x},${pt.y}`;
  }).join(" ");

  const circles = [0.2, 0.4, 0.6, 0.8, 1].map(f => radius * f);

  // Helper to map English raw string to translation key
  const getPlaystyleKey = (str) => {
    if (!str) return "playstyle_passive";
    // Mappings based on scraping logic
    const map = {
      "Aggressive Carry": "playstyle_aggressive",
      "Consistent Farmer": "playstyle_resource_hoard",
      "Tactical Specialist": "playstyle_tactical",
      "Berserker": "playstyle_berserker",
      "KDA Player": "playstyle_kda_player",
      "Supportive Soul": "playstyle_supportive",
      "Objective Melter": "playstyle_obj_melter",
      "Map Architect": "playstyle_map_architect",
      "Facechecker": "playstyle_facechecker",
      "Complete Carry": "playstyle_complete_carry",
      "Passive Player": "playstyle_passive",
      "Unknown": "playstyle_passive" // Fallback
    };
    return map[str] || "playstyle_passive";
  };

  const getFocusKey = (str) => {
    if (!str) return "focus_farm";
    const map = {
      "Die Less": "focus_survival",
      "Vision Control": "focus_vision",
      "Objective Push": "focus_towers",
      "Consistent Growth": "focus_expand",
      "Fix Farming": "focus_farm",
      "Buy Wards": "focus_vision",
      "Positioning": "focus_positioning",
      "Group Up": "focus_group",
      "Hit Towers": "focus_towers",
      "Survival First": "focus_survival",
      "Expand Lead": "focus_expand",
      "Improve Macro": "focus_macro",
      "Teamfight Presence": "focus_teamfights",
      "Be Consistent": "focus_consistency",
      "Apply Pressure": "focus_pressure",
      "More Roaming": "focus_roaming",
      "Play More": "focus_farm" // Fallback
    };
    return map[str] || "focus_farm";
  };

  return (
    <div className="bg-white dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 p-6 relative overflow-hidden flex flex-col items-center group shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[420px] transition-all duration-500 hover:border-accent-primary/20">
      {/* Decorative background glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent-primary/10 rounded-full blur-[80px] pointer-events-none"></div>

      <div className="w-full flex justify-between items-center mb-6 z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative p-1.5 flex items-center justify-center">
            <div className="absolute inset-0 bg-blue-400/30 blur-lg rounded-full animate-pulse-slow"></div>
            <ScanEye size={14} className="text-blue-400 relative z-10" />
          </div>
          <h3 className="text-gray-900 dark:text-gray-100 font-bold text-xs uppercase tracking-[0.1em]">Lens</h3>
        </div>
        <span className="text-[10px] text-gray-500 font-medium bg-white dark:bg-white/5 px-2 py-0.5 rounded-full border border-gray-200 dark:border-white/5">{t('last_20_games')}</span>
      </div>

      <div className="relative flex items-center justify-center mb-6" style={{ width: size, height: size }}>
        {/* Transparent background behind radar chart */}

        <svg width={size} height={size} className="overflow-visible z-10 filter drop-shadow-[0_0_15px_rgb(var(--accent-primary)/0.15)]">
          {/* Grid circles */}
          {circles.map((r, i) => (
            <circle key={i} cx={center} cy={center} r={r} fill="none" stroke="currentColor" strokeWidth="1" className="text-blue-400/20" strokeDasharray={i % 2 === 0 ? "0" : "2 2"} />
          ))}
          {/* Axis lines */}
          {points.map((p, i) => {
            const pt = getPoint(100, p.angle);
            return <line key={i} x1={center} y1={center} x2={pt.x} y2={pt.y} stroke="currentColor" strokeWidth="1" className="text-blue-400/10" />;
          })}
          {/* Data Polygon */}
          <polygon points={polyPoints} fill="rgba(59, 130, 246, 0.1)" stroke="#3b82f6" strokeWidth="2.5" strokeLinejoin="round" className="animate-pulse-slow" />
          {/* Nodes */}
          {points.map((p, i) => {
            const pt = getPoint(p.value, p.angle);
            return (
              <g key={i} className="transition-all duration-500">
                <circle cx={pt.x} cy={pt.y} r="5" className="fill-blue-400/20" />
                <circle cx={pt.x} cy={pt.y} r="2.5" className="fill-blue-400" />
              </g>
            );
          })}
        </svg>

        {/* Labels positioned around the chart */}
        {points.map((p, i) => {
          const r = radius * 1.35;
          const a = (p.angle * Math.PI) / 180;
          const x = center + r * Math.cos(a);
          const y = center + r * Math.sin(a);

          return (
            <div key={i} className="absolute text-[9px] font-black text-gray-600 dark:text-gray-400 bg-white border border-gray-200 dark:border-white/10 dark:bg-[#1e1e24] px-2.5 py-1 rounded-md border border-gray-200 dark:border-white/5 shadow-2xl uppercase tracking-tighter" style={{
              left: x,
              top: y,
              transform: 'translate(-50%, -50%)'
            }}>
              {p.label}
            </div>
          )
        })}
      </div>

      {(() => {
        const avgScore = (data.aggression + data.objective + data.farming + data.vision + data.survival) / 5;

        let highestTier = "IRON";
        let highestDivision = "IV";

        if (avgScore >= 90) { highestTier = "CHALLENGER"; highestDivision = "I"; }
        else if (avgScore >= 85) { highestTier = "GRANDMASTER"; highestDivision = "I"; }
        else if (avgScore >= 80) { highestTier = "MASTER"; highestDivision = "I"; }
        else if (avgScore >= 75) { highestTier = "DIAMOND"; }
        else if (avgScore >= 68) { highestTier = "EMERALD"; }
        else if (avgScore >= 60) { highestTier = "PLATINUM"; }
        else if (avgScore >= 52) { highestTier = "GOLD"; }
        else if (avgScore >= 45) { highestTier = "SILVER"; }
        else if (avgScore >= 35) { highestTier = "BRONZE"; }
        else { highestTier = "IRON"; }

        // Dynamic division (I to IV) based on the score variance
        if (["DIAMOND", "EMERALD", "PLATINUM", "GOLD", "SILVER", "BRONZE", "IRON"].includes(highestTier)) {
          const divIndex = 3 - (Math.floor(avgScore) % 4);
          const divs = ["I", "II", "III", "IV"];
          highestDivision = divs[divIndex];
        }

        return (
          <div className="flex flex-col items-center justify-center mb-4 z-10 gap-1 mt-1">
            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em]">{t('oracle_estimate')}</span>
            <div className="flex items-center justify-center gap-2 bg-black/5 dark:bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-lg border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-colors">
              <img
                src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${highestTier.toLowerCase()}.png`}
                className="w-5 h-5 drop-shadow-md object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400 font-black text-sm uppercase tracking-widest leading-none mt-0.5">
                {highestTier} {highestDivision}
              </span>
            </div>
          </div>
        );
      })()}

      <div className="w-full grid grid-cols-2 gap-3 mt-auto z-10">
        <div className="bg-white dark:bg-[#1e1e24]/60 backdrop-blur-md rounded-2xl p-4 border border-gray-200 dark:border-white/5 flex flex-col items-start gap-1 hover:bg-white border border-gray-200 dark:border-white/10 dark:bg-[#1e1e24] transition-all group/box overflow-hidden relative">
          <div className="absolute top-0 left-0 w-8 h-full bg-blue-500/10 blur-xl"></div>
          <span className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em]">{t('playstyle')}</span>
          <span className="text-sm font-black text-blue-400 leading-tight uppercase tracking-tight">{t(getPlaystyleKey(data.playstyle))}</span>
        </div>
        <div className="bg-white dark:bg-[#1e1e24]/60 backdrop-blur-md rounded-2xl p-4 border border-gray-200 dark:border-white/5 flex flex-col items-start gap-1 hover:bg-white border border-gray-200 dark:border-white/10 dark:bg-[#1e1e24] transition-all group/box overflow-hidden relative">
          <div className="absolute top-0 left-0 w-8 h-full bg-yellow-500/10 blur-xl"></div>
          <span className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em]">{t('focus')}</span>
          <span className="text-sm font-black text-yellow-500 leading-tight uppercase tracking-tight">{t(getFocusKey(data.focus))}</span>
        </div>
      </div>
    </div>
  );
}

function BehavioralCard({ data, t }) {
  const items = [
    {
      label: t('beh_consistency'),
      sub: t('beh_consistency_sub'),
      val: data.consistency,
      icon: Activity,
      color: data.consistency === "S+" ? "text-yellow-400" : data.consistency === "A" ? "text-green-400" : "text-blue-300",
      bg: "bg-blue-500/10"
    },
    {
      label: t('beh_tilt'),
      sub: t('beh_tilt_sub'),
      val: data.tilt,
      icon: Shield,
      color: data.tilt === "Resilient" ? "text-green-400" : "text-red-400",
      bg: "bg-green-500/10"
    },
    {
      label: t('beh_farming'),
      sub: t('beh_farming_sub'),
      val: data.farming,
      icon: Crosshair,
      color: parseFloat(data.farming) > 8 ? "text-yellow-400" : parseFloat(data.farming) > 6 ? "text-blue-300" : "text-gray-600 dark:text-gray-400",
      bg: "bg-yellow-500/10"
    },
    {
      label: t('beh_activity'),
      sub: t('beh_activity_sub'),
      val: data.activity,
      icon: Users,
      color: parseInt(data.activity) > 55 ? "text-purple-400" : "text-gray-600 dark:text-gray-400",
      bg: "bg-purple-500/10"
    },
    {
      label: t('beh_survival'),
      sub: t('beh_survival_sub'),
      val: data.survival,
      icon: Ghost,
      color: data.survival === "Immortal" ? "text-yellow-400" : data.survival === "Safe" ? "text-green-400" : "text-red-400",
      bg: "bg-teal-500/10"
    },
    {
      label: t('beh_aggression'),
      sub: t('beh_aggression_sub'),
      val: data.aggression,
      icon: Sword,
      color: data.aggression === "Hyper" ? "text-orange-500" : data.aggression === "High" ? "text-orange-300" : "text-gray-600 dark:text-gray-400",
      bg: "bg-red-500/10"
    }
  ];

  return (
    <div className="bg-white dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 p-6 relative overflow-hidden flex flex-col gap-6 group hover:border-purple-500/20 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex-1">
      <div className="flex items-center justify-between w-full z-10">
        <div className="flex items-center gap-2.5">
          <div className="relative p-1.5 flex items-center justify-center">
            <div className="absolute inset-0 bg-purple-400/30 blur-lg rounded-full animate-pulse-slow"></div>
            <Brain size={14} className="text-purple-400 relative z-10" />
          </div>
          <h3 className="text-gray-900 dark:text-gray-100 font-bold text-xs uppercase tracking-[0.1em]">{t('behavioral_analysis') || "Behavioral Analysis"}</h3>
        </div>
        <span className="text-[10px] text-gray-500 font-medium bg-white dark:bg-white/5 px-2 py-0.5 rounded-full border border-gray-200 dark:border-white/5">{t('last_20_games')}</span>
      </div>

      <div className="grid grid-cols-2 gap-3 z-10 flex-1 h-full">
        {items.map((item, idx) => (
          <div key={idx} className="relative flex flex-col justify-between p-3 bg-white dark:bg-[#1e1e24]/40 backdrop-blur-md rounded-2xl border border-gray-200 dark:border-white/10 transition-all duration-300 group/item overflow-hidden h-full">
            <div className="flex items-start justify-between mb-2">
              <div className="relative p-1.5 flex items-center justify-center">
                <div className={cn("absolute inset-0 blur-md rounded-full opacity-40 animate-pulse-slow", item.bg.replace('/10', '/40'))}></div>
                <item.icon size={12} className={cn("relative z-10", item.color)} />
              </div>
              <div className={cn("text-xl font-black uppercase tracking-tighter", item.color)}>
                {item.val}
              </div>
            </div>

            <div className="flex flex-col">
              <span className="text-sm text-gray-300 font-black uppercase tracking-wide group-hover/item:text-gray-900 dark:text-gray-100 transition-colors">{item.label}</span>
              <span className="text-[11px] text-gray-500 font-bold truncate">{item.sub}</span>
            </div>

            {/* Hover Glow */}
            <div className={cn("absolute -bottom-4 -right-4 w-12 h-12 rounded-full blur-xl opacity-0 group-hover/item:opacity-40 transition-opacity", item.bg.replace('/10', '/30'))}></div>
          </div>
        ))}
      </div>

      {/* Background decoration */}
      <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-600/10 rounded-full blur-[80px] pointer-events-none animate-pulse-slow"></div>
    </div>
  );
}

function RecordMiniItem({ icon: Icon, val, label, iconBg, color }) {
  return (
    <div className="bg-white dark:bg-[#1e1e24]/40 backdrop-blur-sm rounded-2xl p-4 flex flex-col justify-between border border-gray-200 dark:border-white/5 hover:border-gray-200 dark:border-white/20 transition-all hover:-translate-y-1.5 group relative overflow-hidden">
      <div className="absolute -top-2 -right-2 w-10 h-10 bg-white dark:bg-white/5 rounded-full blur-xl pointer-events-none group-hover:bg-white/10 transition-colors"></div>

      <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-500", iconBg)}>
        <Icon size={18} className={color} />
      </div>
      <div className="mt-6">
        <div className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tighter drop-shadow-md">{val}</div>
        <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.1em] mt-1 opacity-70 group-hover:opacity-100 transition-opacity">{label}</div>
      </div>
    </div>
  );
}

function StatBox({ label, value, trend, trendUp, graph, t }) {
  return (
    <div className="bg-black/5 dark:bg-black/20 backdrop-blur-md rounded-xl p-3 border border-gray-200 dark:border-white/5 flex flex-col justify-between h-20 relative overflow-hidden group hover:border-gray-200 dark:border-white/10 hover:bg-black/5 dark:bg-black/30 transition-colors">
      <div className="relative z-10 flex flex-col justify-between h-full">
        <div className="text-[10px] text-gray-600 dark:text-gray-400 font-bold uppercase">{label}</div>
        <div className="text-xl font-bold text-gray-900 dark:text-gray-100 shadow-black drop-shadow-md">{value}</div>
        <div className={cn("text-[9px] font-bold flex items-center gap-1", trendUp ? "text-green-400" : "text-red-400")}>
          {trendUp ? "+" : "-"} {trend}
          <span className="text-gray-500 font-normal opacity-70">{t('vs1w')}</span>
        </div>
      </div>
      <div className="absolute top-4 right-0 w-20 h-12 opacity-30">
        <svg viewBox="0 0 100 50" className={cn("fill-transparent stroke-[3px]", trendUp ? "stroke-gray-400" : "stroke-red-400")}>
          <path d={graph === 'high' ? "M0 30 Q25 10 50 20 T100 5" : graph === 'mid' ? "M0 25 Q25 35 50 15 T100 25" : "M0 10 Q25 40 50 30 T100 40"} />
        </svg>
      </div>
    </div>
  )
}

function RankGraphModal({ isOpen, onClose, t, type, data, history, puuid, queueId, isPremium, onSubscribe }) {
  const [filter, setFilter] = useState('20_games');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrapedHistory, setScrapedHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const getRankIcon = (tier) => {
    const t = (tier || 'unranked').toLowerCase();
    const tierMap = {
      'emerald': 'emerald', 'platinum': 'platinum', 'diamond': 'diamond',
      'master': 'master', 'grandmaster': 'grandmaster', 'challenger': 'challenger',
      'iron': 'iron', 'bronze': 'bronze', 'silver': 'silver', 'gold': 'gold'
    };
    const key = tierMap[t] || 'unranked';
    return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${key}.png`;
  };

  const TIER_NAMES = {
    'IRON': 'Iron', 'BRONZE': 'Bronze', 'SILVER': 'Silver', 'GOLD': 'Gold',
    'PLATINUM': 'Platinum', 'EMERALD': 'Emerald', 'DIAMOND': 'Diamond',
    'MASTER': 'Master', 'GRANDMASTER': 'Grandmaster', 'CHALLENGER': 'Challenger'
  };

  useEffect(() => {
    if (isOpen && puuid) {
      setLoadingHistory(true);
      window.ipcRenderer.invoke('scraper:get-rank-history', puuid).then(res => {
        if (res && Array.isArray(res)) setScrapedHistory(res);
        setLoadingHistory(false);
      }).catch(() => setLoadingHistory(false));
    }

    const mainContent = document.getElementById('profile-scroll-container');
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (mainContent) mainContent.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // default
      if (mainContent) mainContent.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      const container = document.getElementById('profile-scroll-container');
      if (container) container.style.overflow = 'auto';
    };
  }, [isOpen, puuid]);

  const getAbsLp = useCallback((tier, div, lp) => {
    const TIERS = ['UNRANKED', 'IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'];
    const DIVISIONS = ['IV', 'III', 'II', 'I'];
    const tIdx = Math.max(0, TIERS.indexOf(tier));
    if (tIdx >= 8) return 2800 + lp;
    const dIdx = Math.max(0, DIVISIONS.indexOf(div));
    return (Math.max(0, tIdx - 1) * 400) + (dIdx * 100) + lp;
  }, []);

  const getRankFromAbs = useCallback((abs) => {
    const TIERS = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'];
    const DIVISIONS = ['IV', 'III', 'II', 'I'];
    if (abs >= 2800) return { tier: 'MASTER', div: '', lp: abs - 2800 };
    const tIdx = Math.max(0, Math.floor(abs / 400));
    const dIdx = Math.max(0, Math.floor((abs % 400) / 100));
    const lp = Math.floor(abs % 100);
    return { tier: TIERS[tIdx] || 'IRON', div: DIVISIONS[dIdx] || 'IV', lp };
  }, []);

  // Filter history to current queue based on selected time limit
  const relevantGames = useMemo(() => {
    if (!history || !Array.isArray(history)) return [];

    let filtered = history.filter(g => g.queueId === queueId);

    if (filter === '20_games') {
      return filtered.slice(0, 20);
    } else if (filter === '30_days') {
      // Limit to roughly games from the last 30 days based on gameCreation timeline if available
      // Return up to 150 games for a true "30 days / max recent" overview
      return filtered.slice(0, 150);
    }

    return filtered;
  }, [history, queueId, filter]);

  const mockDataPoints = useMemo(() => {
    if (!data) return [];

    const currentAbsLp = getAbsLp(data.tier, data.division, data.leaguePoints || 50);
    const points = [];

    // Calculate a favorite/most-recent champ ID for fallbacks
    const favChampId = (() => {
      const firstGameWithChamp = relevantGames.find(g => g.participants?.some(p => p.championId));
      if (!firstGameWithChamp) return 29; // Twitch fallback
      const iden = firstGameWithChamp.participantIdentities?.find(i => i.player.puuid === puuid);
      const part = firstGameWithChamp.participants?.find(p => p.participantId === iden?.participantId);
      return part?.championId || 29;
    })();

    // Build points EXACTLY from relevantGames history! No fake games.
    const matchCount = relevantGames.length;
    let runningLp = currentAbsLp;

    for (let i = 0; i < matchCount; i++) {
      const g = relevantGames[i];
      const identity = g.participantIdentities?.find(id => id.player.puuid === puuid);
      const part = g.participants?.find(p => p.participantId === identity?.participantId);
      const isWin = part?.stats?.win;

      // Realistic flat 20 LP avg Diff since we don't have Riot API key
      const diffWin = 20;
      const diffLoss = 20;

      let diff = 0;
      let validWin = undefined;

      if (typeof isWin === 'boolean') {
        diff = isWin ? diffWin : -diffLoss;
        validWin = isWin;
      }

      const cId = part?.championId || favChampId;

      points.unshift({
        lp: runningLp,
        label: i === 0 ? 'Actuel' : '',
        real: true,
        win: validWin,
        diff,
        champId: cId,
        champName: part?.championName || CHAMP_ID_TO_NAME[cId] || "Champion",
        date: g.gameCreation || (Date.now() - i * 3600000)
      });

      runningLp -= diff;
    }

    if (matchCount > 0) {
      const first = points[0];
      points.unshift({
        lp: runningLp,
        label: '',
        real: true,
        date: first.date - 3600000,
        champId: first.champId,
        champName: first.champName,
        diff: 0
      });
    } else {
      // Create a flat line if no games played in this queue
      points.push({
        lp: currentAbsLp,
        label: '',
        real: true,
        date: Date.now() - 3600000,
        champId: favChampId,
        champName: CHAMP_ID_TO_NAME[favChampId] || "Champion",
        diff: 0
      });
      points.push({
        lp: currentAbsLp,
        label: 'Actuel',
        real: true,
        date: Date.now(),
        champId: favChampId,
        champName: CHAMP_ID_TO_NAME[favChampId] || "Champion",
        diff: 0
      });
    }

    // IF WE HAVE REAL SCRAPED HISTORY, WE PREFER IT FOR 30 DAYS AND ALL TIME
    if ((filter === 'all_time' || filter === '30_days') && scrapedHistory.length > 3) {
      let filteredScraped = scrapedHistory;
      if (filter === '30_days') {
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        filteredScraped = scrapedHistory.filter(p => p.timestamp >= thirtyDaysAgo);
      }

      const realPoints = filteredScraped.map((p, idx) => {
        // Rank string to Tier/Div/LP
        let abs = p.lp;
        if (p.rankStr && !p.lp) {
          // Rough estimate if LP is 0 but rank is say GOLD III
          const parts = p.rankStr.split(' ');
          abs = getAbsLp(parts[0].toUpperCase(), parts[1] || 'IV', 0);
        }
        return {
          lp: abs,
          label: '',
          real: true,
          date: p.timestamp,
          rankName: p.rankStr,
          id: p.timestamp + idx
        };
      }).sort((a, b) => a.date - b.date);

      // Add Current
      if (realPoints.length > 0 && realPoints[realPoints.length - 1].lp !== currentAbsLp) {
        realPoints.push({ lp: currentAbsLp, label: 'Actuel', real: true, date: Date.now() });
      }

      return realPoints.map((p, idx) => {
        const prev = realPoints[idx - 1];
        const diff = prev ? p.lp - prev.lp : 0;
        const cId = p.champId || favChampId;
        return {
          ...p,
          id: idx,
          diff: diff || (p.label === 'Actuel' ? 0 : 18), // fallback diff if 0
          champId: cId,
          champName: p.champName || CHAMP_ID_TO_NAME[cId] || "Champion",
          date: p.date || p.timestamp
        };
      });
    }

    // Removed random fallback data generator: If there's no data, it just shows the actual real played matches (or just the single "Actuel" mock data point).

    return points.map((p, idx) => ({ ...p, id: idx, label: p.label || '' }));

  }, [relevantGames, data, filter, getAbsLp, puuid]);

  const mockPoints = useMemo(() => mockDataPoints.map(p => p.lp), [mockDataPoints]);

  const minAbs = Math.max(0, Math.min(...mockPoints) - +((Math.max(...mockPoints) - Math.min(...mockPoints)) < 150 ? 80 : 40));
  const maxAbs = Math.max(...mockPoints, minAbs + 150) + +((Math.max(...mockPoints) - Math.min(...mockPoints)) < 150 ? 50 : 20);
  const range = (maxAbs - minAbs) || 1;

  const yAxisTicks = useMemo(() => {
    if (mockPoints.length === 0) return [];
    const ticks = [];
    // More granular ticks (every 50 LP) if the range is small, otherwise 100
    const step = range < 300 ? 50 : 100;
    for (let lp = Math.floor(minAbs / step) * step; lp <= maxAbs; lp += step) {
      if (lp >= minAbs && lp <= maxAbs) {
        ticks.push(lp);
      }
    }
    if (ticks.length < 2) {
      ticks.push(minAbs + (range / 2));
    }
    return ticks;
  }, [minAbs, maxAbs, range, mockPoints.length]);

  if (!isOpen || !data) return null;

  const width = 640;
  const height = 320;

  const pointsOnSvg = mockPoints.map((p, i) => {
    const x = mockPoints.length > 1 ? (i / (mockPoints.length - 1)) * width : width / 2;
    const y = height - ((p - minAbs) / range) * height;
    return { x, y, val: p, idx: i };
  });

  const generatePath = (pts) => {
    if (pts.length === 0) return "";
    let d = `M ${pts[0].x} ${pts[0].y} `;
    for (let i = 1; i < pts.length; i++) {
      // Super smooth cubic bezier curve interpolation
      const cx = (pts[i - 1].x + pts[i].x) / 2;
      d += `C ${cx} ${pts[i - 1].y}, ${cx} ${pts[i].y}, ${pts[i].x} ${pts[i].y} `;
    }
    return d;
  }
  const pathData = generatePath(pointsOnSvg);

  const totalWins = data.wins || 0;
  const totalLosses = data.losses || 0;

  let filterWins = 0, filterLosses = 0;
  mockDataPoints.forEach(p => {
    if (p.win === true) filterWins++;
    if (p.win === false) filterLosses++;
  });

  const lpDiff = Math.round(mockPoints[mockPoints.length - 1] - mockPoints[0]) || 0;

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * width;
    const nearest = pointsOnSvg.reduce((prev, curr) =>
      Math.abs(curr.x - x) < Math.abs(prev.x - x) ? curr : prev
    );
    if (nearest) setHoveredIndex(nearest.idx);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const rankColor = data.tier?.toLowerCase() === 'gold' ? '#facc15' :
    data.tier?.toLowerCase() === 'platinum' ? '#22d3ee' :
      data.tier?.toLowerCase() === 'emerald' ? '#4ade80' :
        data.tier?.toLowerCase() === 'diamond' ? '#60a5fa' :
          data.tier?.toLowerCase() === 'master' ? '#c084fc' :
            data.tier?.toLowerCase() === 'grandmaster' ? '#f43f5e' :
              data.tier?.toLowerCase() === 'challenger' ? '#fbbf24' : '#a855f7';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={(e) => { e.stopPropagation(); onClose(); }} />
      <div className="relative bg-[#1e1e24] border border-white/10 rounded-3xl w-full max-w-4xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5 relative z-10 backdrop-blur-xl">
          <div>
            <h2 className="text-2xl font-black bg-clip-text text-transparent uppercase tracking-tighter" style={{ backgroundImage: `linear-gradient(to right, #fff, ${rankColor})` }}>
              Progression - {type}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-bold text-gray-300 uppercase">{data.tier} {data.division}</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: rankColor }} />
              <span className="text-sm text-gray-400 font-mono font-medium">{Math.floor(data.leaguePoints)} LP</span>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-3 text-gray-400 hover:text-white bg-white/5 rounded-xl hover:bg-white/10 border border-white/5 transition z-10 cursor-pointer shadow-lg hover:rotate-90 duration-300">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4 flex gap-3 relative z-10 bg-white/[0.02] border-b border-white/5">
          {[
            { id: '20_games', label: '20 Dernières Games' },
            { id: '30_days', label: '30 Derniers Jours' }
          ].map(f => (
            <button
              key={f.id}
              onClick={(e) => { e.stopPropagation(); setFilter(f.id); setHoveredIndex(null); }}
              className={cn(
                "px-5 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer z-10 border",
                filter === f.id ? "bg-white/10 text-white border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.05)]" : "bg-black/20 text-gray-500 hover:text-gray-300 border-transparent hover:bg-white/5"
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="p-8 pt-6 relative z-10 flex gap-6">

          <div className="flex-1 relative">
            <div className="flex justify-between items-end mb-6 pl-[110px]">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Total période</span>
                  <div className="flex gap-2 text-base font-black items-center">
                    <span className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">{filterWins}W</span>
                    <span className="text-gray-600">-</span>
                    <span className="text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]">{filterLosses}L</span>
                    <span className={cn("ml-2 px-2 py-0.5 rounded-md font-bold text-[11px] flex items-center w-fit backdrop-blur-sm border", lpDiff >= 0 ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20")}>
                      {lpDiff > 0 ? '+' : ''}{lpDiff} LP
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative w-full h-[350px] group mt-2 flex bg-black/20 rounded-2xl border border-white/5 p-4 pl-0 overflow-hidden"
            >
              {!isPremium && <PremiumOverlay onAction={onSubscribe} title="Évolution des LP" text="Suivez avec précision vos gains et pertes de LP grâce à l'historique premium." />}

              <div className={cn("flex w-full h-full", !isPremium && "blur-xl pointer-events-none opacity-40 scale-[1.03]")}>
                {/* Left Y-Axis Labeling */}
                <div className="w-[140px] border-r border-white/10 relative shrink-0 z-0">
                  {yAxisTicks.map(tickLp => {
                    const rank = getRankFromAbs(tickLp);
                    const y = ((maxAbs - tickLp) / range) * 100;
                    const color = rank.tier?.toLowerCase() === 'gold' ? '#facc15' : rank.tier?.toLowerCase() === 'platinum' ? '#22d3ee' : rank.tier?.toLowerCase() === 'emerald' ? '#4ade80' : rank.tier?.toLowerCase() === 'diamond' ? '#60a5fa' : rank.tier?.toLowerCase() === 'master' ? '#c084fc' : rank.tier?.toLowerCase() === 'grandmaster' ? '#f43f5e' : rank.tier?.toLowerCase() === 'challenger' ? '#fbbf24' : '#a855f7';
                    return (
                      <div key={tickLp} className="absolute left-0 flex items-center transform translate-y-[-50%] w-[1000px] pointer-events-none" style={{ top: `${y}%` }}>
                        <div className="w-[140px] text-right shrink-0 pr-4 flex justify-end items-center gap-2 opacity-100">
                          <img src={getRankIcon(rank.tier)} className="w-5 h-5 object-contain" alt="" />
                          <span style={{ color }} className="font-black text-[10px] uppercase tracking-tighter opacity-80 whitespace-nowrap">
                            {TIER_NAMES[rank.tier] || rank.tier} {rank.div}
                          </span>
                        </div>
                        <div className="flex-1 border-t border-dashed border-white/10" />
                      </div>
                    );
                  })}
                </div>

                {/* Chart SVG */}
                <div
                  className="flex-1 relative overflow-visible cursor-crosshair"
                  onMouseMove={handleMouseMove}
                  onMouseLeave={handleMouseLeave}
                >
                  <svg viewBox={`0 0 ${width} ${height}`} className="absolute inset-0 w-full h-full overflow-visible" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="gradientLP" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor={rankColor} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={rankColor} stopOpacity="0" />
                      </linearGradient>
                      <pattern id="graph-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                        <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
                      </pattern>
                    </defs>

                    {/* Tech Grid Background */}
                    <rect width="100%" height="100%" fill="url(#graph-grid)" />

                    {/* Current LP Reference Baseline */}
                    {pointsOnSvg.length > 0 && (
                      <line
                        x1="0"
                        y1={pointsOnSvg[pointsOnSvg.length - 1].y}
                        x2={width}
                        y2={pointsOnSvg[pointsOnSvg.length - 1].y}
                        stroke={rankColor}
                        strokeOpacity="0.3"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />
                    )}

                    {/* Clean Smooth Fill Area */}
                    <path d={`${pathData} L ${width} ${height} L 0 ${height} Z`} fill="url(#gradientLP)" className="transition-all duration-700 ease-out" />

                    {/* Glowing Smooth Curve */}
                    <path d={pathData} fill="none" stroke={rankColor} className="transition-all duration-700 ease-out" strokeWidth="3" style={{ filter: `drop-shadow(0 4px 6px ${rankColor}40)` }} />

                    {/* Crosshair Vertical Line */}
                    {hoveredIndex !== null && pointsOnSvg[hoveredIndex] && (
                      <line
                        x1={pointsOnSvg[hoveredIndex].x}
                        y1="0"
                        x2={pointsOnSvg[hoveredIndex].x}
                        y2={height}
                        stroke="#ffffff"
                        strokeOpacity="0.1"
                        strokeWidth="1"
                        strokeDasharray="4,4"
                        className="transition-all duration-300 pointer-events-none"
                      />
                    )}

                    {/* Highlight only the hovered area dot */}
                    {hoveredIndex !== null && pointsOnSvg[hoveredIndex] && (
                      <circle
                        cx={pointsOnSvg[hoveredIndex].x}
                        cy={pointsOnSvg[hoveredIndex].y}
                        r="5"
                        fill="#fff"
                        stroke={rankColor}
                        strokeWidth="3"
                        className="transition-all duration-300 pointer-events-none"
                        style={{ filter: `drop-shadow(0 0 8px ${rankColor})` }}
                      />
                    )}

                    {/* Last point always visible if nothing is hovered to show "current" */}
                    {hoveredIndex === null && pointsOnSvg.length > 0 && (
                      <circle
                        cx={pointsOnSvg[pointsOnSvg.length - 1].x}
                        cy={pointsOnSvg[pointsOnSvg.length - 1].y}
                        r="4"
                        fill="#fff"
                        stroke={rankColor}
                        strokeWidth="2"
                        style={{ filter: `drop-shadow(0 0 5px ${rankColor})` }}
                      />
                    )}
                  </svg>

                  {hoveredIndex !== null && pointsOnSvg[hoveredIndex] && (
                    <div
                      className="absolute pointer-events-none transition-all duration-100 ease-out z-20"
                      style={{
                        left: `${(pointsOnSvg[hoveredIndex].x / width) * 100}%`,
                        top: 0,
                        bottom: 0,
                        transform: 'translateX(-50%)'
                      }}
                    >
                      <div className="w-px h-full bg-white/20 relative">
                        <div
                          className="absolute left-1/2 -translate-x-1/2 bg-[#2a2a32] border border-white/20 text-white px-3 py-2 rounded-xl shadow-xl flex flex-col items-center gap-1"
                          style={{ top: `${(pointsOnSvg[hoveredIndex].y / height) * 100}%`, transform: 'translate(-50%, -120%)', minWidth: '80px' }}
                        >
                          {mockDataPoints[hoveredIndex].date && (
                            <div className="text-[9px] text-gray-400 font-bold mb-1.5 pt-0.5 uppercase tracking-wider">
                              {new Date(mockDataPoints[hoveredIndex].date).toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })}
                            </div>
                          )}
                          {/* True rank at this dot */}
                          <div className="text-[12px] font-black flex flex-col items-center leading-none mt-0.5 whitespace-nowrap" style={{ color: rankColor }}>
                            <span className="uppercase tracking-wide">
                              <span className="text-white">{getRankFromAbs(pointsOnSvg[hoveredIndex].val).tier.charAt(0)}{getRankFromAbs(pointsOnSvg[hoveredIndex].val).div === 'IV' ? '4' : getRankFromAbs(pointsOnSvg[hoveredIndex].val).div === 'III' ? '3' : getRankFromAbs(pointsOnSvg[hoveredIndex].val).div === 'II' ? '2' : '1'}</span> <span className="text-gray-300 ml-0.5">{getRankFromAbs(pointsOnSvg[hoveredIndex].val).lp} LP</span>
                            </span>
                          </div>
                          {mockDataPoints[hoveredIndex].diff ? (
                            <>
                              <div className="w-full h-px bg-white/10 my-0.5"></div>
                              <div className="w-full text-center mt-1">
                                <span className={cn("text-[10px] font-black leading-none", mockDataPoints[hoveredIndex].diff >= 0 ? 'text-blue-400' : 'text-red-400')}>{mockDataPoints[hoveredIndex].diff > 0 ? '+' : ''}{mockDataPoints[hoveredIndex].diff} LP</span>
                              </div>
                            </>
                          ) : mockDataPoints[hoveredIndex].label === 'Actuel' ? (
                            <div className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-gray-400 font-bold uppercase mt-1 w-full text-center">Actuel</div>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModernRankCard({ rankedStats, history, puuid, panelClass, t, isPremium, onSubscribe }) {
  // 'solo', 'flex', 'estimated_solo', 'estimated_flex'
  const [viewMode, setViewMode] = useState('solo');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Helper to extract true last 20 games stats
  const getRecentStats = (queueId) => {
    if (!history || !Array.isArray(history) || !puuid) return null;
    let filteredGames = history;
    if (queueId) {
      filteredGames = history.filter(g => g.queueId === queueId);
    }
    const games = filteredGames.slice(0, 20);
    if (games.length === 0) return null;
    let w = 0; let l = 0;

    let kills = 0, deaths = 0, assists = 0, cs = 0, duration = 0;
    let visionScore = 0;
    let totalTeamKills = 0;

    games.forEach(g => {
      const identity = g.participantIdentities?.find(i => i.player.puuid === puuid);
      if (identity) {
        const part = g.participants?.find(p => p.participantId === identity.participantId);
        if (part && part.stats) {
          if (part.stats.win) w++; else l++;
          kills += part.stats.kills || 0;
          deaths += part.stats.deaths || 0;
          assists += part.stats.assists || 0;
          cs += (part.stats.totalMinionsKilled || 0) + (part.stats.neutralMinionsKilled || 0);
          visionScore += part.stats.visionScore || 0;
          duration += g.gameDuration || 0;

          const myTeamId = part.teamId;
          if (g.participants) {
            totalTeamKills += g.participants.filter(p => p.teamId === myTeamId).reduce((acc, p) => acc + (p.stats?.kills || 0), 0);
          }
        }
      }
    });

    const kda = (kills + assists) / Math.max(1, deaths);
    const csPerMin = cs / Math.max(1, duration / 60);
    const visionPerMin = visionScore / Math.max(1, duration / 60);
    const kp = totalTeamKills > 0 ? (kills + assists) / totalTeamKills : 0;

    return { wins: w, losses: l, total: games.length, kda, csPerMin, visionPerMin, kp };
  };

  // Generate an estimated rank based on overall stats history
  const getEstimatedData = (base, queueId) => {
    if (!base || base.tier === 'UNRANKED') return null;

    const tiers = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'];
    const divisions = ['IV', 'III', 'II', 'I'];

    let tierIdx = tiers.indexOf(base.tier);
    if (tierIdx === -1) tierIdx = 2;
    let divIdx = divisions.indexOf(base.division);
    if (divIdx === -1) divIdx = 0;

    const recentStats = getRecentStats(queueId);
    let bump = 0;

    if (recentStats) {
      const winRate = recentStats.wins / Math.max(1, recentStats.total);

      let performanceScore = winRate;

      if (recentStats.kda >= 3.5) performanceScore += 0.2;
      else if (recentStats.kda >= 2.5) performanceScore += 0.1;
      else if (recentStats.kda < 1.5) performanceScore -= 0.15;

      if (recentStats.csPerMin >= 7) performanceScore += 0.15;
      else if (recentStats.csPerMin >= 5.5) performanceScore += 0.05;
      else if (recentStats.csPerMin < 4) performanceScore -= 0.15;

      if (recentStats.kp >= 0.5) performanceScore += 0.1;
      else if (recentStats.kp < 0.3) performanceScore -= 0.1;

      if (recentStats.visionPerMin >= 1.2) performanceScore += 0.05;
      else if (recentStats.visionPerMin < 0.4) performanceScore -= 0.05;

      if (performanceScore >= 0.8) bump = 4;        // Whole division higher
      else if (performanceScore >= 0.65) bump = 2;  // Two sub-divisions higher
      else if (performanceScore >= 0.55) bump = 1;  // One sub-division higher
      else if (performanceScore >= 0.45) bump = 0;  // Maintaining rank
      else if (performanceScore >= 0.35) bump = -1; // One sub-division lower
      else bump = -2;                               // Two sub-divisions lower
    }

    let newDivIdx = divIdx + bump;
    let newTierIdx = tierIdx;

    while (newDivIdx > 3 && newTierIdx < tiers.length - 1) {
      newDivIdx -= 4;
      newTierIdx++;
    }
    while (newDivIdx < 0 && newTierIdx > 0) {
      newDivIdx += 4;
      newTierIdx--;
    }
    if (newDivIdx < 0) newDivIdx = 0;

    return {
      tier: tiers[newTierIdx] || base.tier,
      division: newTierIdx >= 7 ? '' : divisions[newDivIdx],
      leaguePoints: Math.min(100, (base.leaguePoints || 50) + (bump * 15)),
      wins: recentStats ? recentStats.wins : Math.floor(Math.random() * 5 + 8),
      losses: recentStats ? recentStats.losses : Math.floor(Math.random() * 5 + 4),
      isEstimated: true,
      estimatedStats: recentStats
    };
  };

  const estimatedSolo = useMemo(() => getEstimatedData(rankedStats?.queueMap?.RANKED_SOLO_5x5, 420), [rankedStats, history, puuid]);
  const estimatedFlex = useMemo(() => getEstimatedData(rankedStats?.queueMap?.RANKED_FLEX_SR, 440), [rankedStats, history, puuid]);

  // Stable random rank - MOVED UP TO AVOID HOOKS RULE ERROR
  const globalRank = useMemo(() => Math.floor(Math.random() * 2000000 + 1000000).toLocaleString(), []);

  const handleNextMode = (e) => {
    e.stopPropagation();
    if (viewMode === 'solo') setViewMode('flex');
    else if (viewMode === 'flex') setViewMode('estimated_solo');
    else if (viewMode === 'estimated_solo') setViewMode('estimated_flex');
    else setViewMode('solo');
  };

  let data, type;
  if (viewMode === 'solo') {
    data = rankedStats?.queueMap?.RANKED_SOLO_5x5;
    type = t('solo_duo') || "SOLO/DUO";
  } else if (viewMode === 'flex') {
    data = rankedStats?.queueMap?.RANKED_FLEX_SR;
    type = t('flex') || "FLEX";
  } else if (viewMode === 'estimated_solo') {
    data = estimatedSolo || rankedStats?.queueMap?.RANKED_SOLO_5x5;
    type = t('estimated_solo');
  } else {
    data = estimatedFlex || rankedStats?.queueMap?.RANKED_FLEX_SR;
    type = t('estimated_flex');
  }

  if (!data || !data.tier || data.tier === 'UNRANKED') {
    return (
      <div className={cn("p-6 rounded-3xl relative overflow-hidden group border border-gray-200 dark:border-white/5 bg-black/5 dark:bg-black/40 min-h-[160px]", panelClass)}>
        <div className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-2 opacity-60 flex justify-between items-center z-10 relative">
          <span>{type}</span>
          <button onClick={handleNextMode} className="p-1 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition backdrop-blur-md text-gray-600 dark:text-gray-300 z-20 relative cursor-pointer">
            <ChevronRight size={14} />
          </button>
        </div>
        <div className="text-xl font-bold text-gray-900 dark:text-gray-100/20 italic tracking-tighter relative z-10">{t('unranked')}</div>
      </div>
    );
  }

  const winRate = Math.round((data.wins / (data.wins + data.losses || 1)) * 100);
  // Real History Stats for accurate winrate (since LCU often hides losses for other players)
  let trueWins = data.wins;
  let trueLosses = data.losses;
  let accurateWinRate = Math.round((data.wins / (data.wins + data.losses || 1)) * 100);

  if (data.losses === 0 && history && history.length > 0) {
    const relevantH = history.filter(g => viewMode === 'flex' ? g.queueId === 440 : g.queueId === 420);
    if (relevantH.length > 0) {
      let w = 0, l = 0;
      relevantH.forEach(g => {
        const iden = g.participantIdentities?.find(i => i.player.puuid === puuid);
        const part = g.participants?.find(p => p.participantId === iden?.participantId);
        if (part?.stats?.win) w++; else l++;
      });
      trueWins = w;
      trueLosses = l;
      accurateWinRate = Math.round((w / (w + l || 1)) * 100);
    }
  }

  const tierDisplay = t(data.tier.toLowerCase()) || data.tier;

  return (
    <>
      <div onClick={() => !data.isEstimated && setIsModalOpen(true)} className={cn("p-6 rounded-3xl relative overflow-hidden group border border-gray-200 dark:border-white/10 bg-white dark:bg-black/20 backdrop-blur-xl hover:bg-black/5 dark:bg-black/40 transition-all duration-500 pointer-events-auto min-h-[165px] flex flex-col justify-center", data.isEstimated ? "cursor-default" : "cursor-pointer", panelClass)}>
        {/* Dynamic Glow */}
        <div className={cn(
          "absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-1000 bg-gradient-to-br",
          data.tier.toLowerCase() === 'gold' ? "from-yellow-400" :
            data.tier.toLowerCase() === 'platinum' ? "from-cyan-400" :
              data.tier.toLowerCase() === 'diamond' ? "from-blue-400" :
                data.tier.toLowerCase() === 'emerald' ? "from-green-400" : "from-gray-400"
        )}></div>

        {/* Dynamic border on estimated */}
        {data.isEstimated && (
          <div className="absolute inset-0 border-2 border-purple-500/30 rounded-3xl animate-pulse pointer-events-none z-20"></div>
        )}

        <div className="relative z-10 pointer-events-none mt-1">
          <div className="flex justify-between items-center mb-1.5 pointer-events-auto">
            <div className={cn("text-[10px] uppercase font-bold tracking-[0.2em]", data.isEstimated ? "text-purple-400 opacity-100" : "text-gray-500 opacity-60")}>
              {type}
            </div>
            {/* THIS IS THE ARROW */}
            <button
              onClick={handleNextMode}
              className="p-1.5 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 transition backdrop-blur-md text-gray-900 dark:text-gray-300 z-20 relative cursor-pointer hover:scale-110 active:scale-95"
            >
              <ChevronRight size={14} className="opacity-80" />
            </button>
          </div>

          <div className="flex flex-col gap-0.5 mb-2 pointer-events-none relative z-10">
            <h3 className={cn("text-3xl font-bold tracking-tight uppercase italic pr-2 text-transparent bg-clip-text", data.isEstimated ? "bg-gradient-to-br from-purple-300 via-purple-100 to-indigo-400 drop-shadow-lg" : "bg-gradient-to-br from-white via-white/90 to-gray-500")}>
              {tierDisplay} {data.division}
            </h3>
            {!data.isEstimated && (
              <span className="text-[10px] text-gray-600 dark:text-gray-400 font-mono font-bold opacity-80 mt-0.5" style={{ letterSpacing: '-0.02em' }}>#{globalRank}{t('th') || 'th'}</span>
            )}
          </div>

          <div className="flex items-baseline gap-3 mt-2 pointer-events-none relative z-10">
            {!data.isEstimated && (
              <>
                <div className="text-[22px] font-black text-gray-900 dark:text-gray-100/90 tracking-tighter leading-none">
                  {Math.floor(data.leaguePoints)} <span className="text-[10px] text-gray-500 font-black uppercase ml-0.5 opacity-60 tracking-[0.1em]">LP</span>
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold leading-none mb-0.5 bg-black/5 dark:bg-black/30 px-2 py-1 rounded-md border border-gray-200 dark:border-white/5">
                  <span className="text-gray-600 dark:text-gray-300">{trueWins}W <span className="text-gray-500 font-normal mx-0.5">-</span> {trueLosses}L</span>
                  <span className={cn(accurateWinRate >= 50 ? "text-blue-400" : "text-red-400")}>
                    ({accurateWinRate}%)
                  </span>
                </div>
              </>
            )}
            {data.isEstimated && data.estimatedStats && (
              <div className="flex gap-4 items-center bg-black/10 dark:bg-black/30 px-3 py-2 rounded-xl border border-gray-200 dark:border-white/5 shadow-inner mt-1">
                <div className="flex flex-col"><span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">KDA</span><span className="text-gray-800 dark:text-gray-200 font-black text-xs leading-none">{data.estimatedStats.kda.toFixed(2)}</span></div>
                <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />
                <div className="flex flex-col"><span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">CS/min</span><span className="text-gray-800 dark:text-gray-200 font-black text-xs leading-none">{data.estimatedStats.csPerMin.toFixed(1)}</span></div>
                <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />
                <div className="flex flex-col"><span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">Vision</span><span className="text-gray-800 dark:text-gray-200 font-black text-xs leading-none">{data.estimatedStats.visionPerMin.toFixed(1)}</span></div>
                <div className="w-px h-6 bg-gray-200 dark:bg-white/10" />
                <div className="flex flex-col"><span className="text-[8px] text-gray-500 font-bold uppercase tracking-widest mb-0.5">KP</span><span className="text-gray-800 dark:text-gray-200 font-black text-xs leading-none">{Math.round(data.estimatedStats.kp * 100)}%</span></div>
              </div>
            )}
          </div>
        </div>

        {/* Emblem Watermark - Positioned more aesthetically according to design request */}
        <div
          className="absolute top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-40 transition-all duration-[600ms] ease-out pointer-events-none filter blur-[1px] group-hover:blur-0 flex justify-center items-center"
          style={{ width: "220px", height: "220px", right: "-40px", marginTop: "15px" }}/* <- AJUSTEZ LA POSITION ICI. Utilisez marginTop (ex: "-20px" pour monter, "20px" pour descendre) */
        >
          <img
            src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-${data.tier.toLowerCase()}.png`}
            className="w-full h-full object-contain drop-shadow-2xl transition-transform duration-[600ms]"
            style={{ transform: "scale(5.0)" }} /* <- AJUSTEZ LA TAILLE DE L'IMAGE ICI */
            onError={(e) => { e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-emblem/emblem-unranked.png" }}
          />
        </div>
      </div>

      <RankGraphModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} t={t} type={type} data={data} history={history} puuid={puuid} queueId={viewMode.includes('flex') ? 440 : 420} isPremium={isPremium} onSubscribe={onSubscribe} />
    </>
  );
}


function HistoryRowV2({ game, puuid, lpGains, onClick, t, ddragonVersion }) {
  const identity = game.participantIdentities?.find(i => i.player.puuid === puuid);
  if (!identity) return null;
  const part = game.participants?.find(p => p.participantId === identity.participantId);
  if (!part || !part.stats) return null;

  const isWin = part.stats.win;
  const champId = part.championId;
  const champName = part.championName || getChampName(champId);
  const champIcon = (champId && champId > 0)
    ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champId}.png`
    : `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || "15.1.1"}/img/champion/${normalizeChampName(champName)}.png`;

  const kdaRatio = ((part.stats.kills + part.stats.assists) / Math.max(1, part.stats.deaths)).toFixed(2);

  const queueName = getQueueName(game, t);

  const getRoleIcon = () => {
    let teamPos = (part.teamPosition || part.individualPosition || part.position || "").toUpperCase();
    let lane = (part.timeline?.lane || part.lane || "").toUpperCase();
    let role = (part.timeline?.role || part.role || "").toUpperCase();
    const base = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/";

    if (game.queueId && [450, 1700, 1708, 1709, 1710, 1300].includes(parseInt(game.queueId))) return null;

    if (teamPos === 'TOP') return `${base}position-top.svg`;
    if (teamPos === 'JUNGLE') return `${base}position-jungle.svg`;
    if (teamPos === 'MIDDLE' || teamPos === 'MID') return `${base}position-middle.svg`;
    if (teamPos === 'BOTTOM' || teamPos === 'BOT') return `${base}position-bottom.svg`;
    if (teamPos === 'UTILITY' || teamPos === 'SUPPORT') return `${base}position-utility.svg`;

    if (role === 'DUO_SUPPORT' || role === 'SUPPORT') return `${base}position-utility.svg`;
    if (role === 'DUO_CARRY' || role === 'CARRY') return `${base}position-bottom.svg`;
    if (lane === 'JUNGLE') return `${base}position-jungle.svg`;
    if (lane === 'TOP') return `${base}position-top.svg`;
    if (lane === 'MIDDLE' || lane === 'MID') return `${base}position-middle.svg`;
    if (lane === 'BOTTOM' || lane === 'BOT') return `${base}position-bottom.svg`;
    if (role === 'SOLO') {
      if (lane === 'TOP') return `${base}position-top.svg`;
      if (lane === 'MIDDLE') return `${base}position-middle.svg`;
    }
    return null;
  }
  const roleIcon = getRoleIcon();

  return (
    <div onClick={onClick} className={cn(
      "relative flex items-center gap-3 p-2 rounded-2xl transition-all border-l-4 overflow-hidden min-h-[4.5rem] group cursor-pointer hover:scale-[1.01]",
      isWin
        ? "bg-gradient-to-r from-[#28344e] to-[#1e232e] border-blue-500 hover:shadow-[0_0_15px_rgb(var(--accent-primary)/0.15)]"
        : "bg-gradient-to-r from-[#4e2828] to-[#2e1e1e] border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
    )}>
      {/* Champion & Role - Matches Screenshot */}
      <div className="relative shrink-0 ml-1">
        <img src={champIcon} className={cn("w-10 h-10 rounded-lg border shadow-sm z-10 relative object-cover", isWin ? "border-blue-400/50" : "border-red-400/50")} />
        {roleIcon && (
          <div className="absolute -bottom-1.5 -left-1.5 bg-black border border-gray-200 dark:border-white/40 rounded-full w-5 h-5 flex items-center justify-center z-20 p-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            <img src={roleIcon} className="w-full h-full brightness-0 invert" />
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5 ml-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={cn("font-bold italic text-sm", isWin ? "text-blue-300" : "text-red-300")}>{isWin ? t('victory') : t('defeat')}</span>
          <span className="text-[7px] font-bold text-gray-600 dark:text-gray-400 uppercase bg-black/5 dark:bg-black/30 px-1 py-0.5 rounded border border-gray-200 dark:border-white/5 tracking-tighter">{queueName}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-baseline gap-1.5 text-xs text-gray-900 dark:text-gray-100">
            <span className="font-bold">{part.stats.kills}</span>
            <span className="text-gray-500">/</span>
            <span className="font-bold text-red-400">{part.stats.deaths}</span>
            <span className="text-gray-500">/</span>
            <span className="font-bold">{part.stats.assists}</span>
            <span className="text-[10px] text-gray-600 dark:text-gray-400 ml-1 opacity-70 font-mono">{kdaRatio} KDA</span>
          </div>
          {/* LP info - Display real LP values from LCU or LeagueOfGraphs (which only gives LP for ranked) */}
          {(() => {
            let lpToDisplay = null;
            if (game.lpDelta != null) {
              lpToDisplay = `${isWin ? '+' : '-'}${Math.abs(game.lpDelta)} LP`;
            } else if (game.lpChange) {
              lpToDisplay = game.lpChange;
            } else if (lpGains && lpGains.length > 0) {
              // Create KDA string for matching against lpGains using stats
              if (part && part.stats) {
                const kdaString = `${part.stats.kills} / ${part.stats.deaths} / ${part.stats.assists}`;
                const matched = lpGains.find(lp => lp.kda === kdaString);
                if (matched && matched.lpStr) {
                  lpToDisplay = matched.lpStr;
                }
              }
            }
            if (!lpToDisplay) return null;

            return (
              <div className={cn("text-[10px] font-black px-1.5 py-0.5 rounded border shadow-sm",
                lpToDisplay.includes('+') ? "text-blue-400 border-blue-400/20 bg-blue-500/10" : "text-red-400 border-red-400/20 bg-red-500/10")}>
                {lpToDisplay}
              </div>
            );
          })()}
        </div>
      </div>

      {/* Side Stats */}
      <div className="flex flex-col items-end justify-center text-right gap-0.5 mr-1">
        <div className="flex flex-col items-end">
          <div className="text-xs font-bold text-gray-300">{part.stats.totalMinionsKilled + part.stats.neutralMinionsKilled} {t('cs')}</div>
          <div className="text-[9px] text-gray-500 font-mono">
            {((part.stats.totalMinionsKilled + part.stats.neutralMinionsKilled) / (Math.max(1, game.gameDuration) / 60)).toFixed(1)} {t('cs_min')}
          </div>
        </div>
        <div className="text-[10px] text-gray-500 font-mono">{Math.floor(game.gameDuration / 60)}{t('m')} {game.gameDuration % 60}{t('s')}</div>
        <div className="text-[9px] text-gray-600 font-medium">
          {(() => {
            try {
              return new Date(game.gameCreation).toLocaleDateString(undefined, { month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' });
            } catch (e) {
              return "-";
            }
          })()}
        </div>
      </div>
    </div>
  )
}

function PingStat({ iconUrl, value, avg, color }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className={cn("w-8 h-8 mb-1 flex items-center justify-center", color)}>
        <img src={iconUrl} className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]" />
      </div>
      <div className="font-bold text-gray-900 dark:text-gray-100">{value}</div>
      <div className="text-[10px] text-gray-500 font-mono">{avg}</div>
    </div>
  )
}

function ChampMiniStats({ name, win, loss, kda }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/champion/${normalizeChampName(name)}.png`} className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/20" />
      <div className="text-[10px] text-gray-600 dark:text-gray-400">{name}</div>
      <div className="text-[10px] font-bold text-gray-900 dark:text-gray-100">{kda} KDA</div>
      <div className="text-[9px] text-gray-500">{win} - <span className="text-red-400">{loss}</span></div>
    </div>
  )
}

// --- New Premium Settings Components ---
function SettingsSection({ title, children, icon: Icon }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 border-b border-white/5 pb-4">
        <div className="p-2.5 rounded-xl bg-gradient-to-br from-accent-primary/20 to-transparent text-accent-primary border border-accent-primary/20">
          <Icon size={20} />
        </div>
        <h3 className="text-lg font-black text-white uppercase tracking-[0.15em] italic">{title}</h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {children}
      </div>
    </div>
  );
}

function SettingCard({ icon: Icon, title, desc, action, color = "blue" }) {
  const colorMap = {
    blue: { from: "from-blue-500/10", to: "to-blue-500/5", border: "border-blue-500/20", glow: "shadow-blue-500/20", text: "text-blue-400" },
    purple: { from: "from-purple-500/10", to: "to-purple-500/5", border: "border-purple-500/20", glow: "shadow-purple-500/20", text: "text-purple-400" },
    green: { from: "from-green-500/10", to: "to-green-500/5", border: "border-green-500/20", glow: "shadow-green-500/20", text: "text-green-400" },
    orange: { from: "from-orange-500/10", to: "to-orange-500/5", border: "border-orange-500/20", glow: "shadow-orange-500/20", text: "text-orange-400" },
    red: { from: "from-red-500/10", to: "to-red-500/5", border: "border-red-500/20", glow: "shadow-red-500/20", text: "text-red-400" },
    yellow: { from: "from-yellow-500/10", to: "to-yellow-500/5", border: "border-yellow-500/20", glow: "shadow-yellow-500/20", text: "text-yellow-400" },
    indigo: { from: "from-indigo-500/10", to: "to-indigo-500/5", border: "border-indigo-500/20", glow: "shadow-indigo-500/20", text: "text-indigo-400" }
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className={cn(
      "group relative p-6 rounded-[32px] bg-gradient-to-br transition-all duration-500 border shadow-xl flex flex-col",
      theme.from, theme.to, theme.border, "hover:scale-[1.02] hover:shadow-2xl", theme.glow
    )}>
      {/* Decorative background element now isolated with overflow-hidden */}
      <div className="absolute inset-0 rounded-[32px] overflow-hidden pointer-events-none">
        <div className="absolute -right-6 -bottom-6 p-4 opacity-[0.03] group-hover:opacity-[0.08] group-hover:rotate-12 transition-all duration-700 transform scale-150">
          <Icon size={120} />
        </div>
      </div>

      <div className="flex items-start gap-5 relative z-10 mb-4">
        <div className={cn("p-4 rounded-2xl bg-black/40 border transition-transform duration-500 group-hover:-translate-y-1", theme.border)}>
          <Icon size={24} className={theme.text} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-black text-white text-base uppercase tracking-[0.1em] mb-1.5">{title}</div>
          <p className="text-xs text-gray-400 font-medium leading-relaxed">{desc}</p>
        </div>
      </div>

      <div className="flex items-center justify-end relative z-50 mt-auto pt-4">
        <div className="w-full h-px bg-gradient-to-r from-transparent via-white/5 to-transparent absolute top-0 left-0 pointer-events-none" />
        {action}
      </div>
    </div>
  );
}

function SettingsToggle({ active, onToggle }) {
  return (
    <div
      onClick={onToggle}
      className={cn(
        "w-11 h-6 rounded-full relative cursor-pointer transition-all duration-500 ease-in-out p-1 border border-gray-200 dark:border-white/5",
        active ? "bg-accent-primary shadow-[0_0_15px_rgb(var(--accent-primary)/0.3)]" : "bg-black/5 dark:bg-black/40"
      )}
    >
      <div className={cn(
        "w-4 h-4 rounded-full shadow-lg transform transition-transform duration-500",
        active ? "translate-x-5 bg-black" : "translate-x-0 bg-white/20"
      )} />
    </div>
  );
}

function CustomSelect({ value, onChange, options, className = "", buttonClassName = "" }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(o => o.value === value) || options[0] || { label: '' };

  return (
    <div className={`relative ${className}`} ref={ref}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn("w-full flex items-center justify-between text-[10px] font-black tracking-widest uppercase outline-none transition-all cursor-pointer", buttonClassName || "bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-accent-primary/50 text-gray-900 dark:text-gray-100 rounded-xl px-3 py-2")}
      >
        <span className="truncate">{selectedOption.label}</span>
        <ChevronDown size={14} className={`shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-180 text-accent-primary' : 'text-gray-500'}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full mt-2 left-0 w-full min-w-max bg-gray-100 dark:bg-[#1c1c1f] backdrop-blur-xl border border-gray-300 dark:border-white/20 rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.8)] z-[9999] overflow-hidden py-1">
          <div className="max-h-60 overflow-y-auto custom-scrollbar">
            {options.map((opt) => (
              <button
                key={opt.value}
                onClick={() => { onChange(opt.value); setIsOpen(false); }}
                className={cn(
                  "w-full text-left px-4 py-2.5 text-[10px] font-black tracking-widest uppercase transition-colors",
                  value === opt.value ? "text-accent-primary bg-black/10 dark:bg-white/10" : "text-gray-800 dark:text-gray-300 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
                )}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> c3886816852b3562e04905206a3a072f9223f682
function SettingsView({ theme, setTheme, visualMode, setVisualMode, language, setLanguage, t, autoAccept, setAutoAccept, autoImportRunes, setAutoImportRunes, flashPosition, setFlashPosition, socialOverlayEnabled, setSocialOverlayEnabled, musicOverlayEnabled, setMusicOverlayEnabled, overlaySettings, setOverlaySettings, panelClass, triggerSocialToast, setActiveTab, isPremium, setIsPremium }) {
  const [isEditingLayout, setIsEditingLayout] = useState(false);
  const languages = [
    { code: 'en', label: 'English (US)' },
    { code: 'fr', label: 'Français' }
  ];

  const [launchOnStartup, setLaunchOnStartup] = useState(false);
  const [closeBehavior, setCloseBehavior] = useState('ask');

  useEffect(() => {
    ipcRenderer.invoke('app:get-auto-launch').then(setLaunchOnStartup);
    ipcRenderer.invoke('app:get-settings').then(s => setCloseBehavior(s?.closeBehavior || 'ask'));
  }, []);

  const updateCloseBehavior = async (val) => {
    setCloseBehavior(val);
    const s = await ipcRenderer.invoke('app:get-settings') || {};
    s.closeBehavior = val;
    await ipcRenderer.invoke('app:set-settings', s);
  };

  return (
    <div className="h-full overflow-y-auto custom-scrollbar no-drag p-8 animate-in fade-in slide-in-from-bottom-4">
      <div className="max-w-5xl mx-auto space-y-12 pb-24">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-accent-primary/10 rounded-2xl text-accent-primary shadow-[0_0_20px_rgba(var(--accent-primary-rgb),0.15)] relative overflow-hidden group/header">
              <div className="absolute inset-0 bg-accent-primary/20 translate-y-full group-hover/header:translate-y-0 transition-transform duration-500" />
              <Settings size={32} className="relative z-10" />
            </div>
            <div>
              <h1 className="text-5xl font-black text-white tracking-tighter italic uppercase leading-none">Settings</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-gray-500 font-bold tracking-widest uppercase">Configuration Oracle</span>
              </div>
            </div>
          </div>
        </div>

        {/* Section: Expérience App */}
        <SettingsSection title="Expérience App" icon={LayoutGrid}>
          <SettingCard
            icon={Sun} color="purple"
            title={t('visualStyle')} desc={t('chooseStyleDesc')}
            action={
              <div className="flex gap-1 p-1 bg-black/5 dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/5">
                {['glass', 'opaque'].map(mode => (
                  <button
                    key={mode}
                    onClick={() => setVisualMode(mode)}
                    className={cn("px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all", visualMode === mode ? "bg-accent-primary text-black" : "text-gray-500 hover:text-gray-900 dark:text-gray-100")}
                  >
                    {t(mode)}
                  </button>
                ))}
              </div>
            }
          />
          <SettingCard
            icon={Palette} color="blue"
            title={t('colorTheme')} desc={t('themeToggleDesc')}
            action={
              !isPremium ? (
                <button onClick={() => setActiveTab('subscription')} className="px-5 py-2 bg-yellow-500/5 hover:bg-yellow-500/10 border-2 border-yellow-500/30 text-yellow-500 font-bold text-xs uppercase rounded-xl transition-all hover:scale-[1.02] flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.1)] mb-1">
                  <Star size={14} fill="currentColor" className="drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                  S'abonner
                </button>
              ) : (
                <div className="flex gap-1.5 p-1 bg-black/5 dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/5">
                  {[
                    { id: 'classic', label: t('theme_classic') },
                    { id: 'purple', label: t('theme_purple') },
                    { id: 'storm', label: t('theme_storm') },
                    { id: 'radiant', label: t('theme_radiant') }
                  ].map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => setTheme(opt.id)}
                      className={cn(
                        "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all",
                        theme === opt.id ? "bg-accent-primary text-black" : "text-gray-500 hover:text-gray-900 dark:text-gray-100"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )
            }
          />
          <SettingCard
            icon={Globe} color="green"
            title={t('language')} desc={t('langSelectDesc')}
            action={
              <CustomSelect
                value={language}
                onChange={setLanguage}
                options={languages.map(l => ({ value: l.code, label: l.label }))}
                className="w-40"
              />
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
          <SettingCard
            icon={XCircle} color="red"
            title="Fermeture" desc="Action exécutée en fermant la fenêtre"
            action={
              <div className="flex gap-1 p-1 bg-black/5 dark:bg-black/40 rounded-xl border border-gray-200 dark:border-white/5">
                {[
                  { id: 'ask', label: 'Demander' },
                  { id: 'minimize', label: 'Réduire' },
                  { id: 'close', label: 'Quitter' }
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => updateCloseBehavior(opt.id)}
                    className={cn(
                      "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all",
                      closeBehavior === opt.id ? "bg-accent-primary text-black" : "text-gray-500 hover:text-gray-900 dark:text-gray-100"
                    )}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            }
          />
        </SettingsSection>



        {/* Section: Automatisation In-Game */}
        <SettingsSection title="Automatisation & In-Game" icon={Sword}>
          <SettingCard
            icon={Sword} color="orange"
            title={t('auto_accept')} desc={t('auto_accept_desc')}
            action={
              !isPremium ? (
                <button onClick={() => setActiveTab('subscription')} className="px-5 py-2 bg-yellow-500/5 hover:bg-yellow-500/10 border-2 border-yellow-500/30 text-yellow-500 font-bold text-xs uppercase rounded-xl transition-all hover:scale-[1.02] flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                  <Star size={14} fill="currentColor" className="drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                  S'abonner
                </button>
              ) : (
                <div>
                  <SettingsToggle active={autoAccept} onToggle={() => setAutoAccept(!autoAccept)} />
                </div>
              )
            }
          />
        </SettingsSection>

        {/* Section: Modules Tactiques */}
        <SettingsSection title="Modules Tactiques" icon={Layers}>
          <SettingCard
            icon={Brain} color="blue"
            title={t('skill_levelup')} desc={t('skill_desc')}
            action={<SettingsToggle active={overlaySettings.skillLevelUp} onToggle={() => setOverlaySettings(p => ({ ...p, skillLevelUp: !p.skillLevelUp }))} />}
          />
          <SettingCard
            icon={Eye} color="green"
            title={t('ward_timer') || "Ward Reminder"} desc={t('ward_timer_desc') || "Alert when to swap/place wards"}
            action={<SettingsToggle active={overlaySettings.wardTimer} onToggle={() => setOverlaySettings(p => ({ ...p, wardTimer: !p.wardTimer }))} />}
          />
          <SettingCard
            icon={Target} color="red"
            title={"Objective Timers"} desc={"Reminders for Drake, Herald and Baron"}
            action={<SettingsToggle active={overlaySettings.objectiveTimer ?? true} onToggle={() => setOverlaySettings(p => ({ ...p, objectiveTimer: !(p.objectiveTimer ?? true) }))} />}
          />
          <SettingCard
            icon={Map} color="purple"
            title={"In-Game Stats"} desc={"Affiche une comparaison de vos statistiques en direct (GPM, CSM, etc.) en bas à droite de l'écran."}
            action={<SettingsToggle active={overlaySettings.inGameStats !== false} onToggle={() => setOverlaySettings(p => ({ ...p, inGameStats: p.inGameStats === false ? true : false }))} />}
          />
          <SettingCard
            icon={Sparkles} color="amber"
            title={"Item Build Recommandation"} desc={"Affiche en continu le prochain item à acheter en bas à droite de l'écran."}
            action={<SettingsToggle active={overlaySettings.itemBuild !== false} onToggle={() => setOverlaySettings(p => ({ ...p, itemBuild: p.itemBuild === false ? true : false }))} />}
          />
          <SettingCard
            icon={Activity} color="indigo"
            title={"Prédiction de Victoire"} desc={"Active l'overlay prédictif (Winrate) et définit son raccourci."}
            action={
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={overlaySettings.winProbabilityShortcut?.replace('CommandOrControl', 'CTRL') || 'CTRL+SHIFT+O'}
                  onClick={(e) => {
                    const keys = [];
                    const handleKeyDown = (ke) => {
                      ke.preventDefault();
                      if (ke.key !== 'Control' && ke.key !== 'Alt' && ke.key !== 'Shift') {
                        let finalKey = ke.key.toUpperCase();
                        if (ke.ctrlKey) finalKey = `CommandOrControl+${finalKey}`;
                        else if (ke.altKey) finalKey = `Alt+${finalKey}`;
                        else if (ke.shiftKey) finalKey = `Shift+${finalKey}`;
                        setOverlaySettings(p => ({ ...p, winProbabilityShortcut: finalKey }));
                        if (window.ipcRenderer) window.ipcRenderer.invoke('app:update-winrate-shortcut', finalKey);
                        document.removeEventListener('keydown', handleKeyDown);
                      }
                    };
                    e.target.value = "Appuyez...";
                    document.addEventListener('keydown', handleKeyDown);
                  }}
                  className="w-20 text-[10px] bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-100 rounded-xl px-2 py-1.5 font-bold text-center cursor-pointer outline-none hover:border-indigo-400/50 transition-colors"
                />
                <SettingsToggle active={overlaySettings.winProbability !== false} onToggle={() => setOverlaySettings(p => ({ ...p, winProbability: p.winProbability === false ? true : false }))} />
              </div>
            }
          />
        </SettingsSection>

        {/* Section: Notifications & Social */}
        <SettingsSection title="Notifications & Social" icon={Bell}>
          <SettingCard
            icon={Users} color="indigo"
            title="Overlay Social" desc="Affiche une notification visuelle en bas à droite de l'écran quand vos amis se connectent ou lancent une partie."
            action={<SettingsToggle active={socialOverlayEnabled} onToggle={() => setSocialOverlayEnabled(!socialOverlayEnabled)} />}
          />
          <SettingCard
            icon={Music} color="green"
            title="Overlay Musique" desc="Affiche un mini-lecteur transparent en haut à droite pour contrôler votre musique."
            action={
              !isPremium ? (
                <button onClick={() => setActiveTab('subscription')} className="px-5 py-2 bg-yellow-500/5 hover:bg-yellow-500/10 border-2 border-yellow-500/30 text-yellow-500 font-bold text-xs uppercase rounded-xl transition-all hover:scale-[1.02] flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
                  <Star size={14} fill="currentColor" className="drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" />
                  S'abonner
                </button>
              ) : (
                <div>
                  <SettingsToggle active={musicOverlayEnabled} onToggle={() => setMusicOverlayEnabled(!musicOverlayEnabled)} />
                </div>
              )
            }
          />
        </SettingsSection>

        {/* --- Gold Subscription Section --- */}
        <SettingsSection title="Abonnement Gold" icon={Star}>
          <div
            className="group relative cursor-pointer overflow-hidden rounded-2xl border border-yellow-500/30 p-[1px] shadow-[0_4px_30px_rgba(234,179,8,0.15)] transition-all hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] hover:border-yellow-400/60"
            onClick={() => setActiveTab('subscription')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-300 to-yellow-600 opacity-10 transition-all duration-500 group-hover:opacity-30"></div>
            {/* Shimmer Effect */}
            <div className="absolute top-0 -inset-full h-full w-1/2 z-0 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-[shimmer_1.5s_infinite]"></div>

            <div className="relative flex items-center justify-between rounded-2xl bg-[#13141a]/95 p-6 backdrop-blur-xl overflow-hidden z-10 transition-colors duration-500 group-hover:bg-[#13141a]/80">
              <div className="flex items-center gap-4 relative z-10">
                <div>
                  <h3 className="text-xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600">Oracle Gold</h3>
                  <p className="mt-1 text-sm font-medium text-gray-400 transition-colors group-hover:text-yellow-100/70">Gérer mon moyen de paiement, abonnement...</p>
                </div>
              </div>
              <button onClick={(e) => { e.stopPropagation(); window.ipcRenderer.invoke('app:open-url', 'https://shoxcx.github.io/oracle-web/'); }} className="flex items-center gap-2 rounded-xl bg-yellow-500/10 px-5 py-2.5 font-bold uppercase tracking-widest text-yellow-400 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-black border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.15)] z-10 cursor-pointer">
                {isPremium ? "Gérer" : "Découvrir"} <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </SettingsSection>

      </div >

      {isEditingLayout && (
        <OverlayLayoutEditor
          t={t}
          overlaySettings={overlaySettings}
          setOverlaySettings={setOverlaySettings}
          onClose={() => setIsEditingLayout(false)}
        />
      )
      }
    </div >
  );
}

function SubscriptionView({ t, panelClass, isPremium, setIsPremium, setActiveTab }) {
  // Simulate cancellation state (in a real app, this comes from backend)
  const [isCanceled, setIsCanceled] = useState(false);
  const expirationDate = "31/12/2026"; // mock

  if (!isPremium) {
    const premiumFeatures = [
      { icon: Music, color: "text-yellow-400", bg: "bg-yellow-400/10", title: "Music Overlay", desc: "Contrôlez Spotify directement depuis votre partie sans altérer. Précision tactique et ambiance audio réunies." },
      { icon: Brain, color: "text-blue-400", bg: "bg-blue-400/10", title: "Analyse IA", desc: "Notre algorithme analyse vos actions et trajectoires pour vous délivrer un coaching professionnel automatisé." },
      { icon: Eye, color: "text-emerald-400", bg: "bg-emerald-400/10", title: "In-Game Overlays", desc: "Des outils tactiques exclusifs en jeu (Ward timer, stats) pour garder une longueur d'avance sur vos ennemis." },
      { icon: Target, color: "text-purple-400", bg: "bg-purple-400/10", title: "Training Avancé", desc: "Des entraînements ciblés et personnalisés construits sur les données de notre algorithme." },
      { icon: Palette, color: "text-pink-400", bg: "bg-pink-400/10", title: "Thèmes Custom", desc: "Personnalisez votre interface en débloquant les styles premiums (Radiant, Storm ou Purple)." },
      { icon: Zap, color: "text-orange-400", bg: "bg-orange-400/10", title: "Auto-Accept", desc: "Laissez Oracle gérer vos files d'attentes automatiquement." }
    ];

    return (
      <div className={cn("h-full w-full flex flex-col items-center justify-center animate-in fade-in pb-12 overflow-hidden", panelClass)}>
        <style>
          {`
            @keyframes marquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-50%); }
            }
            .animate-scrolling {
              animation: marquee 30s linear infinite;
            }
            .animate-scrolling:hover {
              animation-play-state: paused;
            }
          `}
        </style>
        <div className="max-w-5xl w-full text-center px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-yellow-500/10 border border-yellow-500/30 mb-8 shadow-[0_0_40px_rgba(234,179,8,0.2)] hover:scale-110 transition-transform duration-300">
            <Star size={44} className="text-yellow-400 fill-current drop-shadow-[0_0_15px_rgba(234,179,8,0.7)]" />
          </div>
          <h1 className="text-5xl font-black tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 mb-6 drop-shadow-lg">
            Deviens Oracle Gold
          </h1>
          <p className="text-lg text-gray-400 font-medium mb-12 max-w-xl mx-auto leading-relaxed">
            Passez au niveau supérieur. Accédez à l'ensemble des fonctionnalités premium dont l'analyse IA, l'overlay In-Game avancé et des statistiques illimitées.
          </p>

          <div
            className="w-[120%] -ml-[10%] overflow-hidden mb-12 py-10"
            style={{
              maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
              WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
            }}
          >
            <div className="flex w-max animate-scrolling gap-4 px-4 cursor-pointer hover:[animation-play-state:paused]">
              {/* Duplicate array for infinite scroll illusion */}
              {[...premiumFeatures, ...premiumFeatures].map((feat, idx) => (
                <div key={idx} className="bg-white/5 dark:bg-[#13141a]/80 backdrop-blur-sm border border-white/10 dark:border-white/5 rounded-2xl p-6 shadow-xl relative overflow-hidden w-72 shrink-0 text-left transition-all duration-300 hover:scale-[1.03] hover:border-white/20 hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)]">
                  <div className={cn("absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-60", feat.bg)}></div>
                  <feat.icon className={cn("mb-4 relative z-10", feat.color)} size={28} />
                  <h3 className="text-white font-bold mb-2 tracking-tight relative z-10">{feat.title}</h3>
                  <p className="text-gray-400 text-xs leading-relaxed opacity-90 relative z-10">{feat.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <button
            className="px-12 py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-black uppercase tracking-widest text-lg shadow-[0_0_30px_rgba(234,179,8,0.4)] hover:shadow-[0_0_50px_rgba(234,179,8,0.6)] hover:scale-105 transition-all duration-300"
            onClick={() => setIsPremium(true)}
          >
            S'abonner (4.99€/mois)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("h-full flex flex-col animate-in fade-in", panelClass)}>
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 flex items-center gap-3 tracking-tighter italic">
            <img src={oracleLogo} className="w-8 h-8 object-contain opacity-90" style={{ filter: 'sepia(1) saturate(2) hue-rotate(-20deg) brightness(1.3) drop-shadow(0 0 8px rgba(234,179,8,0.8))' }} alt="Oracle Gold" />
            Oracle Gold
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">Gestion de l'abonnement en cours.</p>
        </div>
        <button
          onClick={() => setActiveTab('settings')}
          className="px-4 py-2 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:bg-white/5 transition font-bold text-sm flex items-center gap-2"
        >
          <ArrowLeft size={16} /> Retour
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        {/* Status Card */}
        <div className="glass-panel p-8 border-y border-yellow-500/20 relative overflow-hidden group">
          <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none group-hover:bg-yellow-500/20 transition-all duration-700"></div>

          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className={cn("w-2.5 h-2.5 rounded-full shadow-[0_0_8px_currentColor]", isCanceled ? "bg-orange-500 text-orange-500" : "bg-green-500 text-green-500")}></span>
                <span className="text-xs font-black uppercase tracking-widest text-gray-400">Statut</span>
              </div>
              <h3 className="text-2xl font-bold text-white mb-6">
                {isCanceled ? "Annulation programmée" : "Actif"}
              </h3>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <CreditCard className="text-gray-300" size={24} />
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-gray-400 text-sm">Date de facturation</span>
              <span className="text-white font-bold font-mono">{expirationDate}</span>
            </div>
            <div className="flex justify-between items-center py-3 border-b border-white/5">
              <span className="text-gray-400 text-sm">Moyen de paiement</span>
              <span className="text-white font-bold flex items-center gap-2">
                •••• 4242 <CreditCard size={14} />
              </span>
            </div>

            {isCanceled && (
              <div className="mt-4 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl text-orange-400 text-sm font-medium">
                Vous conserverez vos avantages Oracle Gold jusqu'au <strong className="text-orange-300">{expirationDate}</strong>. Aucun autre prélèvement ne sera effectué.
              </div>
            )}
          </div>
        </div>

        {/* Actions Card */}
        <div className="glass-panel p-8 border-t border-white/10 flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Actions</h3>
            <p className="text-gray-500 text-sm">Mettez à jour vos informations ou gérez le renouvellement de l'abonnement.</p>

            <div className="space-y-3 mt-6">
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-white font-bold text-left">
                <div className="flex items-center gap-3">
                  <CreditCard size={18} className="text-gray-400" /> Modifier le paiement
                </div>
                <ArrowRight size={16} className="text-gray-500" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-white font-bold text-left">
                <div className="flex items-center gap-3">
                  <FileText size={18} className="text-gray-400" /> Historique de facturation
                </div>
                <ArrowRight size={16} className="text-gray-500" />
              </button>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-white/5">
            {!isCanceled ? (
              <button
                className="w-full py-3 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 font-bold hover:bg-red-500/10 transition"
                onClick={() => setIsCanceled(true)}
              >
                Annuler l'abonnement
              </button>
            ) : (
              <button
                className="w-full py-3 rounded-xl border border-green-500/20 bg-green-500/10 text-green-400 font-bold hover:bg-green-500/20 shadow-[0_0_15px_rgba(74,222,128,0.1)] transition"
                onClick={() => setIsCanceled(false)}
              >
                Réactiver Oracle Gold
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function OverlayLayoutEditor({ t, overlaySettings, setOverlaySettings, onClose }) {
  const defaults = {
    winrate: { x: 40, y: 5 },
    jungle: { x: 2, y: 40 },
    skills: { x: 40, y: 85 },
    gold: { x: 75, y: 10 },
    notifications: { x: 80, y: 70 }
  };

  const [positions, setPositions] = useState({
    ...defaults,
    ...Object.fromEntries(Object.entries(overlaySettings.positions || {}).filter(([_, v]) => v != null))
  });

  const save = () => {
    setOverlaySettings(prev => ({ ...prev, positions }));
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[200] bg-black/5 dark:bg-black/90 backdrop-blur-xl flex flex-col p-8 animate-in fade-in">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 italic tracking-tighter uppercase">Oracle <span className="text-accent-primary">Layout Editor</span></h2>
          <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-1">{t('layout_editor_desc')}</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={onClose} className="px-6 py-3 border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 font-black uppercase tracking-widest rounded-xl hover:bg-white dark:bg-white/5 transition-all">{t('cancel')}</button>
          <button onClick={save} className="px-10 py-3 bg-accent-primary text-black font-black uppercase tracking-widest rounded-xl hover:scale-105 transition-all shadow-xl shadow-accent-primary/20">{t('save_layout')}</button>
        </div>
      </div>

      <div className="flex-1 relative bg-black/5 dark:bg-black/40 border-2 border-dashed border-gray-200 dark:border-white/10 rounded-[40px] overflow-hidden group">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none uppercase font-black text-8xl text-gray-900 dark:text-gray-100 select-none">{t('game_space')}</div>

        <DraggableBox label="Jungle Insight" x={positions?.jungle?.x ?? 2} y={positions?.jungle?.y ?? 40} color="orange" onMove={(pos) => setPositions(p => ({ ...p, jungle: pos }))} />
        <DraggableBox label="Notifications" x={positions?.notifications?.x ?? 80} y={positions?.notifications?.y ?? 70} color="purple" onMove={(pos) => setPositions(p => ({ ...p, notifications: pos }))} />
      </div>
    </div>
  );
}

function DraggableBox({ label, x, y, color, onMove }) {
  const boxRef = useRef(null);

  const colors = {
    blue: "border-blue-500/50 bg-blue-500/10 text-blue-400",
    orange: "border-orange-500/50 bg-orange-500/10 text-orange-400",
    purple: "border-purple-500/50 bg-purple-500/10 text-purple-400",
    yellow: "border-yellow-500/50 bg-yellow-500/10 text-yellow-500",
  };

  const handleMouseDown = (e) => {
    const box = boxRef.current;
    if (!box) return;

    const parent = box.parentElement;
    const parentRect = parent.getBoundingClientRect();

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = x;
    const initialY = y;

    let rafId = null;

    const onMouseMove = (moveEvent) => {
      if (rafId) cancelAnimationFrame(rafId);

      rafId = requestAnimationFrame(() => {
        const deltaX = ((moveEvent.clientX - startX) / parentRect.width) * 100;
        const deltaY = ((moveEvent.clientY - startY) / parentRect.height) * 100;

        onMove({
          x: Math.max(0, Math.min(98, initialX + deltaX)),
          y: Math.max(0, Math.min(98, initialY + deltaY))
        });
      });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      if (rafId) cancelAnimationFrame(rafId);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  return (
    <div
      ref={boxRef}
      style={{ left: `${x}%`, top: `${y}%` }}
      className={cn("absolute p-4 border-2 rounded-2xl cursor-move shadow-2xl backdrop-blur-md min-w-[150px] transition-all active:scale-95 group select-none", colors[color])}
      onMouseDown={handleMouseDown}
    >
      <div className="flex items-center gap-2 mb-1">
        <Activity size={14} />
        <span className="text-[10px] font-black uppercase tracking-tighter">{label}</span>
      </div>
      <div className="h-2 bg-current opacity-20 rounded-full w-full"></div>
    </div>
  );
}



// --- New Screen 1: Build / Tierlist View ---
const CLASS_BUILDS = {
  Mage: {
    runes: {
      primary: "Sorcery", tree1: "7202", keystone: "8229", // Arcane Comet
      secondary: "Domination", tree2: "8100",
      ids: ["8229", "8224", "8210", "8237", "8139", "8106"] // Comet, Manaflow, Transcendence, Scorch, ToB, UltHunter
    },
    spells: ["SummonerFlash", "SummonerTeleport"],
    skillOrder: ["Q", "E", "W"],
    startItems: ["1056", "2003", "3340"],
    boots: ["3020"],
    coreBuild: ["6653", "4645", "3089", "3157", "3135", "3152"],
  },
  Assassin: {
    runes: {
      primary: "Domination", tree1: "8100", keystone: "8112",
      secondary: "Precision", tree2: "8000",
      ids: ["8112", "8143", "8138", "8105", "8009", "8014"]
    },
    spells: ["SummonerFlash", "SummonerDot"],
    skillOrder: ["Q", "W", "E"],
    startItems: ["1055", "2003", "3340"],
    boots: ["3158"],
    coreBuild: ["3142", "3134", "6696", "3036", "6609", "3179"],
  },
  Marksman: {
    runes: {
      primary: "Precision", tree1: "8000", keystone: "8005",
      secondary: "Inspiration", tree2: "8300",
      ids: ["8005", "8009", "9104", "8014", "8304", "8347"]
    },
    spells: ["SummonerFlash", "SummonerHeal"],
    skillOrder: ["Q", "W", "E"],
    startItems: ["1055", "2003", "3340"],
    boots: ["3006"],
    coreBuild: ["6672", "3031", "3046", "3036", "3026", "3072"],
  },
  Tank: {
    runes: {
      primary: "Resolve", tree1: "8400", keystone: "8437",
      secondary: "Inspiration", tree2: "8300",
      ids: ["8437", "8446", "8429", "8451", "8304", "8347"]
    },
    spells: ["SummonerFlash", "SummonerTeleport"],
    skillOrder: ["Q", "W", "E"],
    startItems: ["1054", "2003", "3340"],
    boots: ["3047"],
    coreBuild: ["6662", "3068", "3075", "2502", "8001", "3193"],
  },
  Fighter: {
    runes: {
      primary: "Precision", tree1: "8000", keystone: "8010",
      secondary: "Resolve", tree2: "8400",
      ids: ["8010", "9111", "9104", "8299", "8444", "8453"]
    },
    spells: ["SummonerFlash", "SummonerTeleport"],
    skillOrder: ["Q", "E", "W"],
    startItems: ["1055", "2003", "3340"],
    boots: ["3047"],
    coreBuild: ["6630", "3071", "3053", "6333", "3153", "3026"],
  },
  Support: {
    runes: {
      primary: "Sorcery", tree1: "7202", keystone: "8214",
      secondary: "Inspiration", tree2: "8300",
      ids: ["8214", "8224", "8210", "8237", "8304", "8347"]
    },
    spells: ["SummonerFlash", "SummonerExhaust"],
    skillOrder: ["E", "Q", "W"],
    startItems: ["3850", "2003", "3340"],
    boots: ["3158"],
    coreBuild: ["2065", "6617", "3107", "3504", "3119", "3222"],
  }
};

// Map Rune IDs to icon paths (simplified for key runes)
const RUNE_ICON_MAP = {
  // Styles
  "8100": "perk-images/Styles/7200_Domination.png",
  "8300": "perk-images/Styles/7203_Whimsy.png",
  "8000": "perk-images/Styles/7201_Precision.png",
  "8400": "perk-images/Styles/7204_Resolve.png",
  "7202": "perk-images/Styles/7202_Sorcery.png",

  // Keystones / Runes (Common ones mapped)
  "8112": "perk-images/Styles/Domination/Electrocute/Electrocute.png",
  "8229": "perk-images/Styles/Sorcery/ArcaneComet/ArcaneComet.png",
  "8005": "perk-images/Styles/Precision/PressTheAttack/PressTheAttack.png",
  "8437": "perk-images/Styles/Resolve/GraspOfTheUndying/GraspOfTheUndying.png",
  "8010": "perk-images/Styles/Precision/Conqueror/Conqueror.png",
  "8214": "perk-images/Styles/Sorcery/SummonAery/SummonAery.png",
  "9923": "perk-images/Styles/Domination/HailOfBlades/HailOfBlades.png",
  "8008": "perk-images/Styles/Precision/LethalTempo/LethalTempoTemp.png",
  "8021": "perk-images/Styles/Precision/FleetFootwork/FleetFootwork.png",
  "8439": "perk-images/Styles/Resolve/VeteranAftershock/VeteranAftershock.png",
  "8360": "perk-images/Styles/Inspiration/UnsealedSpellbook/UnsealedSpellbook.png",
  "8351": "perk-images/Styles/Inspiration/GlacialAugment/GlacialAugment.png",
  "8369": "perk-images/Styles/Inspiration/FirstStrike/FirstStrike.png",
  "8230": "perk-images/Styles/Sorcery/PhaseRush/PhaseRush.png",
  "8128": "perk-images/Styles/Domination/DarkHarvest/DarkHarvest.png",

  // Minor Runes (Generic fallback logic in component or direct map if critical)
  // We will trust the API for minor runes often, but mapped keystones are critical.
};

function getRuneUrl(id) {
  // Try to find in our map, otherwise assume standard DDragon path if possible, or fallback to generic
  if (RUNE_ICON_MAP[id]) return `https://ddragon.leagueoflegends.com/cdn/img/${RUNE_ICON_MAP[id]}`;
  // Heuristic for others if needed, typically standard API response has full path.
  // For this mock, we rely on the map for Keystone + Trees.
  // Minor runes we might leave as generic circles if not mapped, or map a few more common ones?
  // Let's assume we map the ones we used in CLASS_BUILDS for perfect accuracy.

  // Mapping minor runes used in CLASS_BUILDS + Common ones
  const minorMap = {
    "8224": "perk-images/Styles/Sorcery/NullifyingOrb/Axiom_Arcanist.png",
    "8210": "perk-images/Styles/Sorcery/Transcendence/Transcendence.png",
    "8237": "perk-images/Styles/Sorcery/Scorch/Scorch.png",
    "8139": "perk-images/Styles/Domination/TasteOfBlood/GreenTerror_TasteOfBlood.png",
    "8106": "perk-images/Styles/Domination/UltimateHunter/UltimateHunter.png",
    "8143": "perk-images/Styles/Domination/SuddenImpact/SuddenImpact.png",
    "8138": "perk-images/Styles/Domination/EyeballCollection/EyeballCollection.png",
    "8105": "perk-images/Styles/Domination/RelentlessHunter/RelentlessHunter.png",
    "8009": "perk-images/Styles/Precision/PresenceOfMind/PresenceOfMind.png",
    "8014": "perk-images/Styles/Precision/CoupDeGrace/CoupDeGrace.png",
    "9104": "perk-images/Styles/Precision/LegendAlacrity/LegendAlacrity.png",
    "8304": "perk-images/Styles/Inspiration/MagicalFootwear/MagicalFootwear.png",
    "8347": "perk-images/Styles/Inspiration/CosmicInsight/CosmicInsight.png",
    "8345": "perk-images/Styles/Inspiration/BiscuitDelivery/BiscuitDelivery.png",
    "8313": "perk-images/Styles/Inspiration/PerfectTiming/PerfectTiming.png",
    "8321": "perk-images/Styles/Inspiration/FuturesMarket/FuturesMarket.png",
    "8446": "perk-images/Styles/Resolve/Demolish/Demolish.png",
    "8429": "perk-images/Styles/Resolve/Conditioning/Conditioning.png",
    "8451": "perk-images/Styles/Resolve/Overgrowth/Overgrowth.png",
    "9111": "perk-images/Styles/Precision/Triumph.png",
    "8299": "perk-images/Styles/Sorcery/LastStand/LastStand.png",
    "8444": "perk-images/Styles/Resolve/SecondWind/SecondWind.png",
    "8453": "perk-images/Styles/Resolve/Revitalize/Revitalize.png",
    "8234": "perk-images/Styles/Sorcery/Celerity/CelerityTemp.png",
    "8233": "perk-images/Styles/Sorcery/AbsoluteFocus/AbsoluteFocus.png",
    "8226": "perk-images/Styles/Sorcery/ManaflowBand/ManaflowBand.png",
    "8275": "perk-images/Styles/Sorcery/NimbusCloak/NimbusCloak.png",
    "8473": "perk-images/Styles/Resolve/BonePlating/BonePlating.png"
  };

  if (minorMap[id]) return `https://ddragon.leagueoflegends.com/cdn/img/${minorMap[id]}`;

  return `https://ddragon.leagueoflegends.com/cdn/img/perk-images/Styles/7200_Domination.png`; // Fallback
}
function getRuneIcon(nameOrId) {
  if (!nameOrId) return "";
  const cleanVal = nameOrId.toString().replace(/The Keystone\s+/i, '').replace(/The Rune\s+/i, '').trim();
  if (!isNaN(cleanVal)) return getRuneUrl(cleanVal);

  const map = {
    "Press the Attack": "8005", "Lethal Tempo": "8008", "Fleet Footwork": "8021", "Conqueror": "8010",
    "Electrocute": "8112", "Predator": "8124", "Dark Harvest": "8128", "Hail of Blades": "9923",
    "Summon Aery": "8214", "Arcane Comet": "8229", "Phase Rush": "8230",
    "Grasp of the Undying": "8437", "Aftershock": "8439", "Guardian": "8465",
    "Glacial Augment": "8351", "Unsealed Spellbook": "8360", "First Strike": "8369",
    "Triumph": "9111", "Presence of Mind": "8009", "Overheal": "8003",
    "Legend: Alacrity": "9104", "Legend: Tenacity": "9105", "Legend: Bloodline": "9103",
    "Coup de Grace": "8014", "Cut Down": "8017", "Last Stand": "8299",
    "Sudden Impact": "8143", "Taste of Blood": "8139", "Cheap Shot": "8139",
    "Eyeball Collection": "8138", "Ghost Poro": "8120", "Zombie Ward": "8136",
    "Treasure Hunter": "8135", "Ingenious Hunter": "8134", "Relentless Hunter": "8105", "Ultimate Hunter": "8106",
    "Nullifying Orb": "8224", "Manaflow Band": "8226", "Nimbus Cloak": "8275",
    "Transcendence": "8210", "Celerity": "8234", "Absolute Focus": "8233",
    "Scorch": "8237", "Waterwalking": "8236", "Gathering Storm": "8232",
    "Demolish": "8446", "Font of Life": "8463", "Shield Bash": "8401",
    "Conditioning": "8429", "Second Wind": "8444", "Bone Plating": "8473",
    "Overgrowth": "8451", "Revitalize": "8453", "Unflinching": "8242"
  };

  const entry = Object.entries(map).find(([k]) => k.toLowerCase() === cleanVal.toLowerCase());
  return getRuneUrl(entry ? entry[1] : "8005");
}


function BuildView({ t, panelClass, initialChamp, ddragonVersion, championList }) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("mid");
  const [showResults, setShowResults] = useState(false);
  const [champData, setChampData] = useState(null);
  const [error, setError] = useState(false);

  // Normalize champion name for URL/File paths
  const normalizeChamp = (name) => {
    if (!name) return "";
    const clean = name.replace(/['\s.&#]/g, '').toLowerCase();
    const mapping = {
      'wukong': 'monkeyking',
      'renataglasc': 'renata',
      'belveth': 'belveth',
      'ksante': 'ksante',
      'smolder': 'smolder'
    };
    return mapping[clean] || clean;
  };

  const fetchChampData = useCallback(async (champId) => {
    try {
      // DDragon is case sensitive for IDs (e.g. MonkeyKing, JarvanIV)
      const variations = [
        champId.charAt(0).toUpperCase() + champId.slice(1).toLowerCase(),
        champId.charAt(0).toUpperCase() + champId.slice(1),
        champId === 'monkeyking' ? 'MonkeyKing' : null,
        champId === 'jarvaniv' ? 'JarvanIV' : null,
        champId === 'leesin' ? 'LeeSin' : null,
        champId === 'masteryi' ? 'MasterYi' : null,
        champId === 'missfortune' ? 'MissFortune' : null,
        champId === 'tahmkench' ? 'TahmKench' : null,
        champId === 'twistedfate' ? 'TwistedFate' : null,
        champId === 'xinzhao' ? 'XinZhao' : null,
        champId === 'dr-mundo' ? 'DrMundo' : null
      ].filter(Boolean);

      for (const v of variations) {
        try {
          const res = await fetch(`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/data/en_US/champion/${v}.json`);
          if (res.ok) {
            const json = await res.json();
            setChampData(json.data[v]);
            return;
          }
        } catch (e) { }
      }
    } catch (e) { console.error("DDragon exhaustive error", e); }
  }, [ddragonVersion]);

  const fetchBuild = useCallback(async (champName, pRole) => {
    if (!champName) return;
    setLoading(true);
    setError(false);
    setShowResults(false);
    try {
      const normalized = normalizeChamp(champName);
      await fetchChampData(normalized);
      const res = await window.ipcRenderer.invoke('scraper:get-champion-build', normalized, pRole);
      if (!res || !res.items) throw new Error("Invalid scraper data");
      setData(res);
      setSearch(champName);
    } catch (e) {
      console.error("Build fetch failed", e);
      setError(true);
      setData({ stats: { winRate: "0%", tier: "N/A" }, items: { core: [], situational: [], starting: [], boots: [] }, skillOrder: [], runes: { active: [] }, spells: [] });
    } finally {
      setLoading(false);
    }
  }, [fetchChampData]);

  useEffect(() => {
    if (initialChamp && !data && !loading && !error) {
      fetchBuild(initialChamp, role);
    }
  }, [initialChamp, fetchBuild, role, data, loading, error]);

  const getDynamicTip = () => {
    if (!data || !search) return "Awaiting neural link...";
    const name = search.toUpperCase();
    const roleName = role.toUpperCase();
    const wr = parseInt(data.stats?.winRate || "50");
    if (wr > 52) return `TACTICAL ALERT: ${name} is currently dominant in the ${roleName} segment. High win-rate detected (${data.stats.winRate}). Focus on extreme aggressive synchronization and priority targets.`;
    if (wr < 48) return `WARNING: ${name} performing below optimal metrics in ${roleName} role. Precision execution required. Prioritize safe scaling, neural objective control, and defensive protocols.`;
    return `${name} ${roleName} simulation stable. Maintain standard combat protocols. Current patch alignment: OPTIMAL. Coordinate with unit allies for maximum operational efficiency.`;
  };

  const getSpellIcon = (s) => {
    if (!champData) return null;
    const spell = champData.spells?.find(p => p.id.endsWith(s) || p.name.includes(s) || p.id === s);
    return spell?.image?.full ? `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${spell.image.full}` : null;
  };

  const getSummonerIcon = (id) => `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/spell/${id === "4" ? "SummonerFlash" : id === "12" ? "SummonerTeleport" : id === "11" ? "SummonerSmite" : id === "14" ? "SummonerDot" : id === "6" ? "SummonerHaste" : id === "7" ? "SummonerHeal" : id === "21" ? "SummonerBarrier" : id === "3" ? "SummonerExhaust" : "SummonerFlash"}.png`;

  return (
    <div className={`h-full flex flex-col gap-3 p-4 ${panelClass} bg-[#0A0A0C] border border-white/5 overflow-hidden`}>
      {/* Header (Dense) */}
      <div className="flex items-center justify-between gap-4 pb-3 border-b border-white/10 shrink-0 z-[100] relative">
        <div className="flex flex-col">
          <span className="text-[9px] font-black text-accent-primary uppercase tracking-[0.4em] flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-accent-primary animate-pulse shadow-[0_0_8px_cyan]"></div> Tactical Neural Link
          </span>
          <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-none">
            {search ? `${search} // ${role} protocol` : "LINK_STDBY"}
          </h2>
        </div>

        <div className="flex items-center gap-4">
          {/* Role Selector */}
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/5 shadow-inner">
            {['top', 'jungle', 'mid', 'adc', 'support'].map((r) => (
              <button
                key={r}
                onClick={() => { setRole(r); if (search) fetchBuild(search, r); }}
                className={cn(
                  "px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all",
                  role === r ? "bg-accent-primary text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]" : "text-white/20 hover:text-white/60 hover:bg-white/5"
                )}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="relative group/search">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20" />
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowResults(true); }}
              onFocus={() => setShowResults(true)}
              placeholder="AGENT IDENT..."
              className="w-48 bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-3 text-[11px] font-black text-white focus:border-accent-primary/50 outline-none transition-all"
            />
            {showResults && search.length > 2 && (
              <div className="absolute top-full mt-2 left-0 w-full bg-[#121214] border border-white/10 rounded-xl shadow-2xl z-50 overflow-hidden backdrop-blur-3xl max-h-60 overflow-y-auto">
                {championList.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
                  <button
                    key={c.id}
                    onClick={() => { fetchBuild(c.name, role); setShowResults(false); setSearch(c.name); }}
                    className="w-full px-4 py-3 flex items-center gap-3 hover:bg-white/5 text-left group/item"
                  >
                    <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${c.image.full}`} className="w-8 h-8 rounded-lg border border-white/10" />
                    <span className="text-[10px] font-black text-white uppercase italic">{c.name}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0">
        {loading ? (
          <div className="h-full flex flex-col items-center justify-center gap-4">
            <RefreshCw className="w-12 h-12 animate-spin text-accent-primary/30" />
            <span className="text-[10px] font-black uppercase tracking-[0.6em] animate-pulse text-white/20">Syncing Intelligence...</span>
          </div>
        ) : data ? (
          <div className="h-full grid grid-cols-12 gap-3 animate-in fade-in duration-700">
            {/* Column 1: Items & Spells (Wide 3) */}
            <div className="col-span-3 flex flex-col gap-3">
              <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex flex-col gap-6 flex-1">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <span className="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] italic">Tactical Matrix</span>
                  <div className="flex gap-1.5">
                    {(data.spells && data.spells.length > 0 ? data.spells : ["4", "11"]).map((id, idx) => (
                      <div key={idx} className="w-7 h-7 rounded-lg border border-white/10 overflow-hidden shadow-lg relative group/spell">
                        <img src={getSummonerIcon(id)} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-accent-primary/20 opacity-0 group-hover/spell:opacity-100 transition-opacity"></div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] font-black text-accent-primary/40 uppercase tracking-tighter">Initial Execution Seq.</span>
                    <div className="flex gap-2">
                      {(data.items?.starting || ["1055", "2003"]).map((id, idx) => (
                        <div key={idx} className="w-11 h-11 bg-black/40 border border-white/10 rounded-xl overflow-hidden hover:border-white/40 transition-all group/it">
                          <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${id}.png`} className="w-full h-full p-1.5 group-hover/it:scale-110 transition-transform" />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] font-black text-accent-primary/40 uppercase tracking-tighter">Kinetic Module</span>
                    <div className="w-11 h-11 bg-black/40 border-2 border-accent-primary/20 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(6,182,212,0.1)] group/boot">
                      {data.items?.boots?.[0] ? (
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${data.items.boots[0]}.png`} className="w-full h-full group-hover/boot:scale-110 transition-transform" />
                      ) : <div className="w-full h-full bg-white/5" />}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 flex-1">
                    <span className="text-[8px] font-black text-accent-primary/40 uppercase tracking-tighter">Neural Evolution Core</span>
                    <div className="flex flex-col gap-3">
                      {(data.items?.core && data.items.core.length > 0 ? data.items.core : ["3078", "3053", "3026"]).map((id, idx) => (
                        <div key={idx} className="flex items-center gap-3 group/core">
                          <div className="w-14 h-14 shrink-0 bg-black border-2 border-white/10 rounded-2xl relative overflow-hidden group-hover/core:border-accent-primary/40 transition-all">
                            <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/item/${id}.png`} className="w-full h-full" />
                            <div className="absolute top-0 right-0 w-4 h-4 bg-accent-primary text-black text-[8px] font-black flex items-center justify-center rounded-bl-lg">{idx + 1}</div>
                          </div>
                          <div className="h-[1px] flex-1 bg-white/5"></div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 2: Feed & Insight (6 Cols) */}
            <div className="col-span-12 xl:col-span-6 flex flex-col gap-3">
              <div className="relative aspect-video bg-black rounded-[2.3rem] overflow-hidden border border-white/10 group/video flex-1">
                <iframe
                  key={search + role}
                  className="w-full h-full opacity-0 animate-in fade-in fill-mode-forwards duration-1000"
                  src={`https://www.youtube.com/embed?listType=search&list=League+of+Legends+${normalizeChamp(search)}+${role}+Pro+Gameplay+S15`}
                  frameBorder="0" allowFullScreen
                />
                <div className="absolute top-0 right-0 p-3 bg-black/60 rounded-bl-2xl border-l border-b border-white/5 flex items-center gap-2 pointer-events-none">
                  <Youtube size={14} className="text-red-500" />
                  <span className="text-[9px] font-black text-white/50 uppercase tracking-widest italic">Simulation Feed</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 h-[180px] shrink-0">
                <div className="bg-white/[0.02] border border-white/5 p-4 rounded-2xl flex flex-col overflow-hidden">
                  <h4 className="text-[8px] font-black text-white/20 uppercase tracking-[0.3em] mb-4 italic">Neural Optimization</h4>
                  <div className="flex flex-col gap-2.5">
                    {(data.skillOrder || ["Q", "W", "E"]).slice(0, 3).map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-black/40 p-2 rounded-xl border border-white/5 hover:border-white/20 transition-all group/skill">
                        <div className="w-9 h-9 shrink-0 rounded-lg overflow-hidden border border-white/10 flex items-center justify-center bg-accent-primary/10 text-accent-primary font-black text-lg italic group-hover/skill:border-accent-primary/40 transition-all">
                          {getSpellIcon(skill) ? <img src={getSpellIcon(skill)} className="w-full h-full object-cover" /> : skill}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[11px] font-black text-white italic leading-none">{skill}-PROTOCOL</span>
                          <span className="text-[8px] font-bold text-white/30 uppercase tracking-widest mt-1">Priority Seq. {idx + 1}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-accent-primary/[0.03] border border-accent-primary/10 p-5 rounded-2xl flex flex-col gap-3 relative overflow-hidden group/tip">
                  <div className="absolute inset-0 bg-accent-primary/[0.01] opacity-0 group-hover/tip:opacity-100 transition-opacity"></div>
                  <div className="flex items-center gap-2 relative z-10">
                    <Brain size={16} className="text-accent-primary" />
                    <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest italic">Oracle Simulation</span>
                  </div>
                  <p className="text-[12px] font-bold text-gray-400 italic leading-[1.6] select-none relative z-10 line-clamp-5">"{getDynamicTip()}"</p>
                </div>
              </div>
            </div>

            {/* Column 3: Runes (3 Cols) */}
            <div className="col-span-3 flex flex-col gap-3">
              <div className="bg-white/[0.02] border border-white/5 p-5 rounded-[2rem] flex-1 flex flex-col gap-8">
                <div className="flex items-center justify-between border-b border-white/10 pb-4">
                  <div className="flex flex-col">
                    <span className="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">Augment Tree</span>
                    <span className="text-base font-black text-accent-primary italic uppercase tracking-tighter mt-1">{data.runes?.primary || "Precision"}</span>
                  </div>
                  <Zap size={16} className="text-accent-primary animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                </div>

                <div className="flex flex-col items-center gap-6 py-2">
                  <div className="relative group/keystone">
                    <div className="absolute inset-0 bg-accent-primary/20 rounded-full blur-2xl animate-pulse"></div>
                    <div className="w-24 h-24 rounded-full border-2 border-accent-primary/40 bg-black flex items-center justify-center relative z-10 shadow-[0_0_30px_rgba(6,182,212,0.2)] group-hover/keystone:scale-105 group-hover/keystone:border-accent-primary transition-all duration-500">
                      <img src={getRuneIcon(data.runes?.active?.[0] || "8010")} className="w-16 h-16 object-contain filter drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
                      <div className="absolute -bottom-2 bg-accent-primary text-black text-[9px] font-black px-3 py-1 rounded-lg uppercase italic shadow-2xl">CORE_AUG</div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 w-full">
                    {(data.runes?.active || []).slice(1, 4).map((r, idx) => (
                      <div key={idx} className="flex items-center gap-4 bg-black/40 p-2.5 rounded-xl border border-white/5 hover:border-accent-primary/20 transition-all group/r">
                        <div className="w-7 h-7 shrink-0 opacity-40 group-hover/r:opacity-100 transition-opacity">
                          <img src={getRuneIcon(r)} className="w-full h-full object-contain" />
                        </div>
                        <span className="text-[10px] font-bold text-white/30 group-hover/r:text-white transition-colors">{r}</span>
                      </div>
                    ))}
                  </div>

                  <div className="w-full h-[1px] bg-white/5 my-2"></div>

                  <div className="flex gap-4 justify-center w-full">
                    {(data.runes?.active || []).slice(4, 6).map((r, idx) => (
                      <div key={idx} className="w-12 h-12 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center p-2.5 group/sub cursor-help" title={r}>
                        <img src={getRuneIcon(r)} className="w-full h-full object-contain opacity-30 group-hover/sub:opacity-100 transition-all" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State (Ultra Dense) */
          <div className="h-full flex flex-col items-center justify-center text-center p-12 gap-8 opacity-40 animate-in fade-in duration-1000">
            <div className="w-56 h-56 bg-black/40 rounded-[3rem] border border-white/5 flex items-center justify-center relative overflow-hidden group">
              <Gamepad2 size={100} strokeWidth={0.5} className="text-white/10 group-hover:text-accent-primary/40 transition-all duration-1000" />
              <div className="absolute inset-0 border border-accent-primary/5 rounded-full rotate-45 scale-125 animate-[spin_40s_linear_infinite]"></div>
            </div>
            <div className="flex flex-col gap-2">
              <h2 className="text-4xl font-black text-white italic uppercase tracking-tighter opacity-20">NEURAL_STDBY</h2>
              <p className="text-[10px] font-black text-gray-600 uppercase tracking-[0.8em] italic">Awaiting Module Auth</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


function MatchupCardV2({ champ, type }) {
  return (
    <div className="relative group cursor-pointer">
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champ.name}_0.jpg`} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

      <div className="absolute bottom-2 inset-x-0 text-center">
        <div className={`text-sm font-black drop-shadow-md ${type === 'good' ? 'text-indigo-400' : 'text-red-400'}`}>{champ.wr}%</div>
        <div className="text-[9px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-tight">{champ.name}</div>
      </div>
    </div>
  )
}

function ItemIcon({ id, size = "w-12 h-12" }) {
  if (!id) return null;
  return (
    <div className={`${size} bg-[#0f1115] rounded-lg border border-[#302e36] flex items-center justify-center relative overflow-hidden group hover:border-gray-400 transition-colors cursor-pointer`}>
      <img src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/item/${id}.png`} className="w-full h-full object-cover" />
    </div>
  )
}

// Helper: RuneIcon wrapper for consistent sizing if needed, or keeping previous logic
function RuneIcon({ id, sub }) {
  const url = getRuneUrl(id);
  const size = sub ? "w-8 h-8" : "w-10 h-10";
  return (
    <div className={`${size} rounded-full bg-black/5 dark:bg-black/40 border border-gray-200 dark:border-white/10 flex items-center justify-center p-1 relative group hover:border-purple-400/50 transition-colors`}>
      <img src={url} className="w-full h-full object-contain opacity-80 group-hover:opacity-100" />
    </div>
  );
}

function TierRow({ rank, name, role, winrate, ban, tier }) {
  return (
    <tr className="hover:bg-black/5 dark:bg-black/5 dark:hover:bg-white dark:bg-white/5 transition-colors cursor-pointer group">
      <td className="p-4 font-mono text-gray-600 dark:text-gray-400">{rank}</td>
      <td className="p-4 font-bold text-gray-900 dark:text-gray-900 dark:text-gray-100 flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-gray-500"></div>
        {name}
      </td>
      <td className="p-4 text-gray-500">{role}</td>
      <td className="p-4 text-green-500 font-bold">{winrate}</td>
      <td className="p-4 text-gray-500">{ban}</td>
      <td className="p-4">
        <span className={cn("px-2 py-1 rounded text-xs font-bold", tier.includes('S') ? "bg-accent-primary text-gray-900 dark:text-gray-100" : "bg-gray-500/20 text-gray-500")}>
          {tier}
        </span>
      </td>
    </tr>
  )
}

// Initial Static Fallback (Will be hydrated by dynamic fetch)


const getChampName = (id) => CHAMP_ID_TO_NAME[id] || "Unknown";

// --- Custom Hook for Dynamic Data ---
// --- Custom Hook for Dynamic Data ---
function useCommonData() {
  const [ddragonVersion, setVersion] = useState(() => localStorage.getItem('oracle_dd_version') || "15.1.1");
  const [patchNotes, setPatchNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('oracle_patch_notes');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });
  const [championList, setChampionList] = useState(() => {
    try {
      const saved = localStorage.getItem('oracle_champ_list_v2');
      return saved ? JSON.parse(saved) : [];
    } catch (e) { return []; }
  });

  const [prefetchedData, setPrefetchedData] = useState(() => {
    try {
      const saved = localStorage.getItem('oracle_prefetched_data');
      return saved ? JSON.parse(saved) : {};
    } catch (e) { return {}; }
  });

  useEffect(() => {
    async function init() {
      // 1. Fetch DDragon Version & Champs
      const fetchDDragon = async () => {
        try {
          const vRes = await fetch("https://ddragon.leagueoflegends.com/api/versions.json");
          const versions = await vRes.json();
          const latest = versions[0];

          if (latest !== ddragonVersion) {
            setVersion(latest);
            localStorage.setItem('oracle_dd_version', latest);
          }

          if (latest) {
            const cRes = await fetch(`https://ddragon.leagueoflegends.com/cdn/${latest}/data/en_US/champion.json`);
            const cJson = await cRes.json();
            const data = cJson.data;
            if (data) {
              const list = Object.values(data).sort((a, b) => a.name.localeCompare(b.name));
              setChampionList(list);
              localStorage.setItem('oracle_champ_list_v2', JSON.stringify(list));
            }
          }
        } catch (e) {
          console.error("DDragon fetch failed", e);
        }
      };

      // 2. Fetch Background Data (Independent)
      const fetchBackgroundData = async () => {
        if (!window.ipcRenderer) return;
        try {
          const [notes, schedule, news, topLives, topMeta] = await Promise.all([
            window.ipcRenderer.invoke('scraper:get-patch-notes'),
            window.ipcRenderer.invoke('scraper:get-esports-schedule'),
            window.ipcRenderer.invoke('scraper:get-esports-news'),
            window.ipcRenderer.invoke('scraper:get-top-live-streams'),
            window.ipcRenderer.invoke('scraper:get-meta', 'top') // Priority meta
          ]);

          const newData = {
            patchNotes: notes,
            esportsSchedule: schedule,
            esportsNews: news,
            topLives: topLives,
            topMeta: topMeta,
            timestamp: Date.now()
          };

          if (notes) setPatchNotes(notes);
          setPrefetchedData(newData);
          localStorage.setItem('oracle_prefetched_data', JSON.stringify(newData));
          localStorage.setItem('oracle_patch_notes', JSON.stringify(notes || []));
        } catch (e) { console.error("Background data fetch failed", e); }
      };

      fetchDDragon();
      fetchBackgroundData();

      // Auto-refresh background data every 5 minutes
      const bgInterval = setInterval(fetchBackgroundData, 300000);
      return () => clearInterval(bgInterval);
    }

    init();
  }, []);

  return { ddragonVersion, patchNotes, championList, prefetchedData };
}



const getQueueLabel = (queueId, t) => {
  if (queueId === 420) return t ? t('solo_duo') : "Solo/Duo";
  if (queueId === 440) return t ? t('flex') : "Flex";
  if (queueId === 450) return t ? t('aram') : "ARAM";
  if (queueId === 400 || queueId === 430) return t ? t('queue_normal') : "Normal";
  if (queueId === 1700) return "Arena";
  return t ? t('queue_unknown') : "Mode Inconnu";
};

const getRoleLabel = (p) => {
  if (!p) return 'Lane';
  const lane = (p.teamPosition || p.individualPosition || p.position || p.timeline?.lane || "").toUpperCase();
  const role = (p.timeline?.role || p.role || "").toUpperCase();

  if (lane === 'JUNGLE') return 'Jungler';
  if (lane === 'TOP') return 'Top';
  if (lane === 'MID' || lane === 'MIDDLE') return 'Mid';
  if (lane === 'BOTTOM' || lane === 'BOT') {
    if (role === 'DUO_SUPPORT' || role === 'SUPPORT') return 'Support';
    return 'ADC';
  }
  if (lane === 'UTILITY' || lane === 'SUPPORT') return 'Support';
  return 'Lane';
};

const getRoleIcon = (p) => {
  if (!p) return null;
  const lane = (p.teamPosition || p.individualPosition || p.position || p.timeline?.lane || "").toLowerCase();
  if (!lane || lane === 'none' || lane === 'unknown') return null;
  const map = {
    'top': 'top',
    'jungle': 'jungle',
    'mid': 'mid',
    'middle': 'mid',
    'bottom': 'bot',
    'bot': 'bot',
    'utility': 'support',
    'support': 'support'
  };
  const key = map[lane] || map[(p.timeline?.role || "").toLowerCase().replace("duo_", "")];
  if (!key) return null;
  return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-${key}.png`;
};

function ReplaysView({ t, panelClass, currentUser }) {
  const [replays, setReplays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coachingGame, setCoachingGame] = useState(null);
  const [isCoachingLoading, setIsCoachingLoading] = useState(false);
  const [lpGains, setLpGains] = useState([]);
  const fullGameCache = useRef({});

  useEffect(() => {
    async function fetchReplays() {
      if (!currentUser) return;
      try {
        const history = await window.ipcRenderer.invoke('lcu:get-match-history', currentUser.puuid, 0, 10);
        if (history && history.games && history.games.games) {
          // Filter only: 400 (Draft), 420 (Solo), 440 (Flex)
          const validQueues = [400, 420, 440];
          const filteredGames = history.games.games.filter(g => validQueues.includes(g.queueId));

          // Enrich with replay metadata
          const gamesWithMeta = await Promise.all(filteredGames.map(async (g) => {
            try {
              const meta = await window.ipcRenderer.invoke('lcu:get-replay-metadata', g.gameId);
              return { ...g, replayMeta: meta };
            } catch {
              return g;
            }
          }));
          setReplays(gamesWithMeta);

          // Background pre-fetch full games to eliminate click latency
          gamesWithMeta.forEach(async (g) => {
            try {
              if (!fullGameCache.current[g.gameId]) {
                const fullGame = await window.ipcRenderer.invoke('lcu:get-game', g.gameId);
                if (fullGame && fullGame.participants) {
                  const identity = fullGame.participantIdentities?.find(ident => ident?.player?.puuid === currentUser?.puuid);
                  const p = fullGame.participants.find(part => part.participantId === identity?.participantId) || fullGame.participants[0];
                  fullGameCache.current[g.gameId] = {
                    ...fullGame,
                    _userPart: p,
                    _champName: getChampName(p.championId),
                    _mode: getQueueLabel(fullGame.queueId, t)
                  };
                }
              }
            } catch (e) { }
          });
        }
      } catch (e) {
        console.error("Replay fetch error", e);
      } finally {
        setLoading(false);
      }
    }
    fetchReplays();

    // Fetch LP gains in parallel
    if (currentUser) {
      const name = currentUser.gameName ? `${currentUser.gameName}#${currentUser.tagLine}` : (currentUser.displayName || currentUser.summonerName);
      window.ipcRenderer.invoke('scraper:get-recent-lp', name, 'EUW')
        .then(lpData => setLpGains(lpData))
        .catch(err => console.error("Failed to fetch LP gains:", err));
    }
  }, [currentUser]);



  // Helper: Fetch extensive game details (Match History List often returns partial data)
  const loadFullGame = async (summaryGame) => {
    try {
      // Use cache for instant loading if available
      if (fullGameCache.current[summaryGame.gameId]) {
        setCoachingGame(fullGameCache.current[summaryGame.gameId]);
        return;
      }

      setIsCoachingLoading(true);
      console.log("Fetching full details for game:", summaryGame.gameId);
      const fullGame = await window.ipcRenderer.invoke('lcu:get-game', summaryGame.gameId);

      if (!fullGame || !fullGame.participants) {
        console.warn("Full game fetch failed, using summary fallback.");
        return;
      }

      // Re-identify user in the full data
      const identity = fullGame.participantIdentities?.find(ident => ident?.player?.puuid === currentUser?.puuid);
      const p = fullGame.participants.find(part => part.participantId === identity?.participantId) || fullGame.participants[0];

      const mode = getQueueLabel(fullGame.queueId, t);
      const champName = getChampName(p.championId);

      const computedGame = { ...fullGame, _userPart: p, _champName: champName, _mode: mode };
      fullGameCache.current[summaryGame.gameId] = computedGame;
      setCoachingGame(computedGame);
    } catch (e) {
      console.error("Failed to load full game:", e);
    } finally {
      setIsCoachingLoading(false);
    }
  };

  // Enhanced Watch Handler (Download + Watch)
  const [downloadingId, setDownloadingId] = useState(null);

  const handleWatch = async (gameId, platformId, currentState) => {
    if (downloadingId) return; // Busy

    console.log(`[Replay] Requesting ${gameId} (${platformId}), current state: ${currentState}`);

    try {
      if (currentState === 'WATCH') {
        // Already downloaded, just watch
        await window.ipcRenderer.invoke('lcu:watch-replay', gameId);
      } else {
        // Need to download first
        setDownloadingId(gameId);

        // Trigger Download with Platform ID
        await window.ipcRenderer.invoke('lcu:download-replay', { gameId, platformId });

        // Poll for completion
        let attempts = 0;
        const maxAttempts = 30; // 60 seconds max

        const pollInterval = setInterval(async () => {
          attempts++;
          try {
            const meta = await window.ipcRenderer.invoke('lcu:get-replay-metadata', gameId);
            console.log(`[Replay] Polling ${gameId}: ${meta?.state}`);

            if (meta?.state === 'WATCH') {
              clearInterval(pollInterval);
              setDownloadingId(null);
              // Launch Watch
              await window.ipcRenderer.invoke('lcu:watch-replay', gameId);
            } else if (attempts >= maxAttempts) {
              clearInterval(pollInterval);
              setDownloadingId(null);
              console.error("Replay download timed out");
            }
          } catch (err) {
            console.error("Replay polling error", err);
            clearInterval(pollInterval);
            setDownloadingId(null);
          }
        }, 2000);
      }
    } catch (e) {
      console.error("Watch/Download error", e);
      setDownloadingId(null);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4">
        <RefreshCw size={48} className="text-accent-primary animate-spin opacity-20" />
        <span className="text-gray-500 font-bold uppercase tracking-widest text-xs">{t('loading_replays')}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 pb-12 h-full flex flex-col">
      <div className="flex items-center justify-between mb-2">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 flex items-center gap-3 tracking-tighter">
            <MonitorPlay className="text-accent-primary" /> Analyse
          </h2>
          <p className="text-gray-500 text-sm font-medium mt-1">{t('replays_desc')}</p>
        </div>
        <div className="flex gap-4">
          <div className="px-4 py-2 bg-white dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/5 flex flex-col items-end">
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest">{t('games_found')}</span>
            <span className="text-xl font-black text-gray-900 dark:text-gray-100">{replays.length}</span>
          </div>
          <div className="px-4 py-2 bg-accent-primary/10 rounded-xl border border-accent-primary/20 flex flex-col items-end">
            <span className="text-[10px] font-black text-accent-primary uppercase tracking-widest">{t('watchable')}</span>
            <span className="text-xl font-black text-accent-primary">{replays.filter(r => r.replayMeta?.state === 'WATCH').length}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 min-h-0 grid grid-cols-12 gap-8">
        {/* Replay List - Added padding to prevent cropping on scale */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-4 overflow-y-auto px-2 py-2 custom-scrollbar">
          {replays.length > 0 ? replays.map((r, i) => {
            // Find self in participants
            const identity = r.participantIdentities?.find(ident => ident?.player?.puuid === currentUser?.puuid);
            const p = r.participants?.find(part => part?.participantId === identity?.participantId) || r.participants?.[0];
            const state = r.replayMeta?.state; // 'WATCH' or 'downloading' etc
            const isWatchable = state === 'WATCH';
            const isDownloading = downloadingId === r.gameId; // simplified local state tracking
            const mode = p ? getQueueLabel(r.queueId, t) : t('queue_unknown');
            const champName = p ? p.championName || getChampName(p.championId) : t('unknown');

            // Find LP Gain
            let kdaString = '';
            let lpInfo = null;
            if (p?.stats) {
              kdaString = `${p.stats.kills} / ${p.stats.deaths} / ${p.stats.assists}`;
              lpInfo = lpGains.find(lp => lp.kda === kdaString);
            }

            return (
              <div
                key={r.gameId}
                onClick={() => loadFullGame(r)}
                className={cn(
                  "glass-panel p-4 flex items-center justify-between group cursor-pointer border transition-all hover:scale-[1.02] hover:shadow-xl",
                  coachingGame?.gameId === r.gameId ? "border-accent-primary bg-accent-primary/10 shadow-[0_0_15px_rgba(59,130,246,0.1)]" : "border-gray-200 dark:border-white/5 hover:border-gray-200 dark:border-white/20"
                )}
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${p.championId}.png`}
                      className={cn("w-12 h-12 rounded-xl border-2 shadow-lg", p.stats.win ? "border-green-500/50" : "border-red-500/50")}
                      onError={(e) => { e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png" }}
                    />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                      {p.stats.kills}/{p.stats.deaths}/{p.stats.assists}
                      <span className={cn("text-[9px] px-1.5 py-0.5 rounded-md font-black italic", p.stats.win ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>
                        {p.stats.win ? "VICTOIRE" : "DÉFAITE"}
                      </span>
                      {lpInfo && lpInfo.lpStr && (
                        <span className={cn(
                          "text-[10px] px-2 py-0.5 rounded-md font-black uppercase tracking-widest",
                          lpInfo.lpStr.includes('+') ? "text-green-400 bg-green-500/10 border border-green-500/20" : "text-red-400 bg-red-500/10 border border-red-500/20"
                        )}>
                          {lpInfo.lpStr}
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-gray-500 font-mono uppercase mt-0.5">
                      {champName} • {mode}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    className={cn(
                      "p-2 rounded-lg transition-all border",
                      coachingGame?.gameId === r.gameId ? "bg-accent-primary/20 text-accent-primary border-accent-primary/30" : "bg-white dark:bg-white/5 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:bg-white/10"
                    )}
                  >
                    <Brain size={16} />
                  </button>
                </div>
              </div>
            );
          }) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-600 opacity-20">
              <MonitorPlay size={64} strokeWidth={1} />
              <span className="mt-4 font-bold uppercase tracking-widest text-xs">{t('no_match_found')}</span>
            </div>
          )}
        </div>

        {/* AI Coaching Panel */}
        <div className="col-span-12 lg:col-span-8 h-full min-h-0">
          {isCoachingLoading ? (
            <div className="h-full glass-panel flex flex-col items-center justify-center p-12 text-center">
              <RefreshCw size={48} className="text-accent-primary animate-spin opacity-20 mb-4" />
              <h3 className="text-lg font-bold text-gray-400 italic">Analyse en cours...</h3>
            </div>
          ) : coachingGame ? (
            <AICoachingPanel game={coachingGame} t={t} onWatch={handleWatch} />
          ) : (
            <div className="h-full glass-panel flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-accent-primary/5 flex items-center justify-center mb-6 relative">
                <Brain size={48} className="text-accent-primary animate-pulse" />
                <div className="absolute inset-0 bg-accent-primary/20 rounded-full blur-2xl"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 italic">Sélectionnez une partie</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                Cliquez sur une partie dans la liste à gauche pour lancer l'analyse IA de vos performances.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function AICoachingPanel({ game, t, onWatch }) {
  const p = game._userPart || game.participants?.[0];
  if (!p || !p.stats) return null;
  const stats = p.stats;
  const isWatchable = game.replayMeta?.state === 'WATCH';
  const mode = game._mode || getQueueLabel(game.queueId, t);
  const champName = game._champName || p.championName || getChampName(p.championId);
<<<<<<< HEAD
  const roleName = getRoleLabel(p);
  const roleIcon = getRoleIcon(p);
=======
  const roleName = getRoleLabel(p.timeline?.lane, p.timeline?.role);
  const roleIcon = getRoleIcon(p.timeline?.lane);
>>>>>>> c3886816852b3562e04905206a3a072f9223f682

  const opponent = useMemo(() => {
    if (!game?.participants || !p) return null;

    // 1. Candidate List: Anyone who isn't me
    // We try to filter by teamId first, but if that fails, we take ANYONE else.
    let enemies = game.participants.filter(pt => pt.teamId != p.teamId && pt.participantId !== p.participantId);

    // Fallback: If teamId filter returned nothing (e.g. Arena, odd custom games, or data error),
    // get literally everyone else. 
    if (!enemies || enemies.length === 0) {
      enemies = game.participants.filter(pt => pt.participantId !== p.participantId);
    }

    // Absolute Last Resort: If filtering by participantId failed (maybe undefined IDs?), compare by reference equality
    if (!enemies || enemies.length === 0) {
      enemies = game.participants.filter(pt => pt !== p);
    }

    if (enemies.length === 0) {
      // If we are here, it's a 1-player game (Practice Tool?)
      return null;
    }

    // Helper: Does unit have Smite?
    const hasSmite = (unit) => {
      if (!unit) return false;
      return [11, 41].includes(unit.spell1Id) || [11, 41].includes(unit.spell2Id);
    };

    // Helper: Calculate match score
    const getScore = (enemy) => {
      let score = 0;
      if (!enemy) return -1;

      const pLane = p.timeline?.lane || "NONE";
      const eLane = enemy.timeline?.lane || "NONE";
      const pRole = p.timeline?.role || "NONE";
      const eRole = enemy.timeline?.role || "NONE";

      // Rule A: Jungle Smite Match (Critical)
      if (hasSmite(p) && hasSmite(enemy)) score += 1000;

      // Rule B: Precise Lane & Role Match
      if (pLane === eLane && pLane !== "NONE") score += 50;
      if (pRole === eRole && pRole !== "NONE") score += 30;

      // Rule C: Mirror Match
      if (p.championId === enemy.championId) score += 10;

      // Rule D: Positional/Index Match
      // Often in API: Team 1 is 0-4, Team 2 is 5-9. Opponents are i and i+5.
      if (p.participantId && enemy.participantId) {
        if (Math.abs(p.participantId - enemy.participantId) === 5) score += 20;
      }

      return score;
    };

    // Sort enemies by score descending
    // We use a safe sort that defaults to 0 if ranking fails
    const rankedEnemies = enemies.map(e => ({ unit: e, score: getScore(e) })).sort((a, b) => b.score - a.score);

    // Return the winner
    return rankedEnemies[0].unit;
  }, [game, p]);

  const oppChampName = opponent ? opponent.championName || getChampName(opponent.championId) : null;

  // Normalize stats helper to handle inconsistent API data (stats vs root properties)
  const getNormStats = (pt) => {
    if (!pt) return { kills: 0, deaths: 0, assists: 0, gold: 0, cs: 0 };
    const s = pt.stats || pt;
    return {
      kills: s.kills || 0,
      deaths: s.deaths || 0,
      assists: s.assists || 0,
      gold: s.goldEarned || s.gold || 0,
      cs: (s.totalMinionsKilled || s.minionsKilled || 0) + (s.neutralMinionsKilled || 0)
    };
  };

  const pStats = getNormStats(p);
  const oppStats = getNormStats(opponent);

  const [analyzing, setAnalyzing] = useState(false);
  const [showTips, setShowTips] = useState(false);
  const [showMatchup, setShowMatchup] = useState(false);
  const [insightIndex, setInsightIndex] = useState(0);

  useEffect(() => {
    // Significantly reduce the artificial UI loading "latency" effect (from 800ms to 200ms)
    // so it feels much more responsive (since cache is almost instant).
    setAnalyzing(true);
    setShowTips(false);
    setShowMatchup(false);
    setInsightIndex(0);
    const timer = setTimeout(() => setAnalyzing(false), 200);
    return () => clearTimeout(timer);
  }, [game.gameId]);

  // Mocking more detailed coaching logic based on stats
  // State for internal browser
  const [showGuide, setShowGuide] = useState(false);

  // --- CHRONOLOGIE (Analyses Positives/Négatives & Dynamiques) ---
  const timelineAnalysis = useMemo(() => {
    const positives = [];
    const negatives = [];

    // DATA PREP
    const teamKills = game.participants.filter(pt => pt.teamId === p.teamId).reduce((sum, pt) => sum + (pt.stats?.kills || 0), 0);
    const kp = (stats.kills + stats.assists) / Math.max(1, teamKills);
    const durationMin = game.gameDuration / 60;
    const csm = (stats.totalMinionsKilled + stats.neutralMinionsKilled) / durationMin;
    const goldDiff = opponent ? stats.goldEarned - (opponent.stats?.goldEarned || 0) : 0;

    const getAnalysis = (baseKey, arrayPos, optionsCount = 3) => {
      // Deterministic choice based on array length + gameId
      const hash = (Number(game.gameId) || Date.now()) + arrayPos;
      const idx = (hash % optionsCount) + 1;
      return t(`${baseKey}_${idx}`);
    };

    // 1. COMBAT & KDA
    const kda = (stats.kills + stats.assists) / Math.max(1, stats.deaths);
    if (kda > 4) positives.push(getAnalysis('pos_kda', positives.length));
    else if (kda < 1.5) negatives.push(getAnalysis('neg_deaths', negatives.length));

    if (stats.largestMultiKill >= 2) positives.push(getAnalysis('pos_multikill', positives.length));

    if (kp < 0.3 && durationMin > 15) negatives.push(`${getAnalysis('neg_kp', negatives.length)} (${Math.round(kp * 100)}%)`);
    else if (kp > 0.65) positives.push(`${getAnalysis('pos_kp', positives.length)} (${Math.round(kp * 100)}%)`);

    // 2. FARMING & ECO
    if (csm > 7.5) positives.push(getAnalysis('pos_farm', positives.length));
    else if (csm < 5 && ['TOP', 'MIDDLE', 'BOTTOM'].includes(p.timeline?.lane)) negatives.push(getAnalysis('neg_farm', negatives.length));

    if (goldDiff < -2000) negatives.push(getAnalysis('neg_gold', negatives.length));
    else if (goldDiff > 2000) positives.push(getAnalysis('pos_gold', positives.length));

    // 3. OBJECTIVES & MACRO
    if (stats.damageDealtToObjectives > 10000) positives.push(getAnalysis('pos_obj', positives.length));
    else if (stats.damageDealtToObjectives < 1500 && durationMin > 20 && p.timeline?.role !== 'SUPPORT') negatives.push(getAnalysis('neg_obj', negatives.length));

    // 4. VISION
    if (stats.visionScore > 1.2 * durationMin) positives.push(getAnalysis('pos_vision', positives.length));
    else if (stats.visionScore < 0.4 * durationMin) negatives.push(getAnalysis('neg_vision', negatives.length));

    // Role Specific Negatives
    if (roleName === 'Support' && stats.visionScore < 1.5 * durationMin) negatives.push(t('neg_support_vision'));
    if (p.timeline?.lane === 'JUNGLE' && kp < 0.4) negatives.push(t('neg_jungle_impact'));

    // 5. DAMAGE
    const teamDamage = game.participants.filter(pt => pt.teamId === p.teamId).reduce((sum, pt) => sum + (pt.stats?.totalDamageDealtToChampions || 0), 0);
    const dmgShare = stats.totalDamageDealtToChampions / Math.max(1, teamDamage);
    if (dmgShare > 0.3) positives.push(`${getAnalysis('pos_carry', positives.length)} (${Math.round(dmgShare * 100)}%)`);
    else if (dmgShare < 0.1 && ['TOP', 'MIDDLE', 'BOTTOM'].includes(p.timeline?.lane)) negatives.push(t('neg_damage'));

    // Default fillers if empty
    if (positives.length === 0) positives.push(t('pos_default'));
    if (negatives.length === 0) negatives.push(t('neg_default'));

    return { positives, negatives };
  }, [stats, game, opponent, t, roleName]);

  // --- 2. VERDICT COACH (Localized + Nuanced Selection) ---
  const verdictText = useMemo(() => {
    const candidates = [];
    const teamDamage = game.participants.filter(pt => pt.teamId === p.teamId).reduce((sum, pt) => sum + (pt.stats?.totalDamageDealtToChampions || 0), 0);
    const dmgShare = stats.totalDamageDealtToChampions / Math.max(1, teamDamage);
    const durationMin = game.gameDuration / 60;
    const csm = (stats.totalMinionsKilled + stats.neutralMinionsKilled) / durationMin;
    const goldDiff = opponent ? stats.goldEarned - (opponent.stats?.goldEarned || 0) : 0;

    if (stats.win) {
      if (stats.largestMultiKill === 5) candidates.push('verdict_penta');
      if (stats.deaths === 0 && (stats.kills + stats.assists) > 5) candidates.push('verdict_perfect_kda');
      if (dmgShare > 0.4) candidates.push('verdict_carry_hard');
      if (goldDiff > 3000) candidates.push('verdict_soul');
      if (stats.visionScore > 2 * durationMin) candidates.push('verdict_visionary');
      if (dmgShare > 0.25 && csm < 6) candidates.push('verdict_efficient');
      if (stats.goldEarned > 15000) candidates.push('verdict_stomp');

      // Fallbacks for Win
      if (candidates.length === 0) {
        if (stats.deaths > 8) candidates.push('verdict_pillar'); // "Victory foundation" but here maybe "Hard fought"
        else candidates.push('verdict_pivot', 'verdict_fatal', 'verdict_pillar');
      }
    } else {
      if (stats.deaths > 9) candidates.push('verdict_feeder', 'verdict_vuln');
      if (stats.visionScore < 0.3 * durationMin) candidates.push('verdict_blind');
      if (csm > 8 && (stats.kills + stats.assists) < 5) candidates.push('verdict_afk_farm');
      if (dmgShare > 0.35 || (stats.kills + stats.assists) > 15) candidates.push('verdict_unlucky_carry', 'verdict_solid_effort');
      if (stats.goldEarned > 16000 && !stats.win) candidates.push('verdict_rich_loser');

      // Fallbacks for Loss
      if (candidates.length === 0) {
        candidates.push('verdict_defeat', 'verdict_eco', 'verdict_leader');
      }
    }

    // Pick a candidate based on gameId to be deterministic but varied per game
    const seed = game.gameId % candidates.length;
    const key = candidates[seed];
    return t(key);
  }, [stats, game, opponent, t]);

  // --- 3. CONSEILS CLÉS (Localized & Dynamic) ---
  const advicePoints = useMemo(() => {
    const points = [];
    const durationMin = game.gameDuration / 60;
    const csm = (stats.totalMinionsKilled + stats.neutralMinionsKilled) / Math.max(1, durationMin);

    const getTip = (baseKey, optionsCount = 3) => {
      // Deterministic pseudo-random choice based on game and number of points pushed
      const hash = (Number(game.gameId) || Date.now()) + points.length;
      const idx = (hash % optionsCount) + 1;
      return t(`${baseKey}_${idx}`);
    };

    if (stats.deaths > 6) points.push(getTip('tip_deaths'));
    if (csm < 6.5) points.push(getTip('tip_csm'));
    if (stats.visionScore < 0.8 * durationMin) points.push(getTip('tip_vision'));
    if (stats.damageDealtToObjectives < 2500 && p.timeline?.role !== 'SUPPORT') points.push(getTip('tip_obj'));

    // Generics if still short
    if (points.length < 2) {
      if (stats.win) points.push(getTip('tip_win'));
      else points.push(getTip('tip_loss'));
    }

    // Safety fallback
    return points.filter(p => !!p && !p.startsWith('tip_'));
  }, [stats, game, p, t]);

  const gameScore = useMemo(() => {
    let s = 70;
    const kdaNum = (stats.kills + stats.assists) / Math.max(1, stats.deaths);
    s += (kdaNum * 5);
    if (stats.win) s += 10;
    if (stats.deaths > 10) s -= 15;
    if (s > 100) s = 100;
    if (s < 0) s = 0;

    if (s > 95) return 'S+';
    if (s > 88) return 'S';
    if (s > 82) return 'A+';
    if (s > 75) return 'A';
    if (s > 65) return 'B';
    if (s > 50) return 'C';
    return 'D';
  }, [stats]);

  // --- MATCHUP TIP GENERATOR (Localized & Dynamic) ---
  const matchupTip = useMemo(() => {
    if (!opponent || !p) return t('searching');

    const goldDiff = pStats.gold - oppStats.gold;
    const csDiff = pStats.cs - oppStats.cs;
    const killDiff = pStats.kills - oppStats.kills;
    const deathCount = pStats.deaths;

    let baseKey = 'matchup_default';

    if (goldDiff > 3000 && killDiff > 3) baseKey = 'matchup_stomp';
    else if (stats.win && (goldDiff < -1000 || csDiff < -20)) baseKey = 'matchup_lost_lane_won_game';
    else if (!stats.win && goldDiff > 1000) baseKey = 'matchup_won_lane_lost_game';
    else if (deathCount > 7 && killDiff < -3) baseKey = 'matchup_feeding';
    else if (Math.abs(goldDiff) < 1000 && Math.abs(killDiff) < 2) {
      if (pStats.cs > 8 * (game.gameDuration / 60)) baseKey = 'matchup_passive';
      else baseKey = 'matchup_neutral';
    } else if (stats.visionScore < oppStats.visionScore / 2) baseKey = 'matchup_vision_gap';

    // Provide a dynamic deterministic variant
    const hash = Number(game.gameId) || Date.now();
    const idx = (hash % 3) + 1;
    const key = `${baseKey}_${idx}`;

    return t(key).replace('{{champ}}', oppChampName || t('opponent'));
  }, [pStats, oppStats, stats, oppChampName, game, t]);

  return (
    <div className="h-full glass-panel p-0 flex flex-col overflow-hidden animate-in zoom-in-95 duration-500 bg-slate-50 dark:bg-[#0a0a0c]/80 border-gray-200 dark:border-white/10 relative">
      {analyzing && (
        <div className="absolute inset-0 z-50 bg-black/5 dark:bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-4">
          <div className="relative">
            <Brain size={48} className="text-accent-primary animate-bounce" />
            <div className="absolute inset-0 bg-accent-primary/20 rounded-full blur-xl animate-pulse"></div>
          </div>
          <span className="text-gray-900 dark:text-gray-100 font-black italic tracking-widest text-xs">{t('analyzing_caps')}</span>
        </div>
      )}

      {/* Header Banner - Reduced to save vertical space */}
      <div className="h-36 relative shrink-0">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champName}_0.jpg`}
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/40 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0c] via-transparent to-transparent"></div>

        <div className="absolute bottom-5 left-6 flex items-end gap-4">
          <div className="relative shadow-2xl">
            <img
              src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${p.championId}.png`}
              className="w-16 h-16 rounded-2xl border-2 border-gray-200 dark:border-white/20"
            />
            {roleIcon && (
              <div className="absolute -top-2 -right-2 bg-slate-50 dark:bg-[#0a0a0c] p-1 rounded-lg border border-gray-200 dark:border-white/10 shadow-lg hidden">
                <img src={roleIcon} className="w-4 h-4" />
              </div>
            )}
          </div>

          <div className="flex flex-col mb-1">
            <div className="flex items-center gap-3">
              <h3 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight uppercase italic">{champName}</h3>
              <span className={cn("px-2 py-0.5 rounded-md text-[9px] font-black italic uppercase tracking-widest border", stats.win ? "bg-green-500/10 text-green-400 border-green-500/30" : "bg-red-500/10 text-red-400 border-red-500/30")}>
                {stats.win ? "VICTORY" : "DEFEAT"}
              </span>
            </div>
            <div className="text-gray-600 dark:text-gray-400 text-xs font-bold flex items-center gap-2 mt-1">
              <span className="text-accent-primary uppercase tracking-wider">{mode}</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span className="font-mono opacity-60">{(() => { try { return new Date(game.gameCreation).toLocaleDateString(); } catch { return ""; } })()}</span>
            </div>
          </div>
        </div>

        {/* Grade & Action Container - Redesigned to fix overlap and match request */}
        <div className="absolute top-4 right-5 flex flex-col items-end gap-2 z-20">
          <div className="bg-[#15171e]/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gray-200 dark:border-white/5 flex flex-col items-center min-w-[90px] shadow-2xl transition-all hover:border-blue-500/30">
            <div className="text-3xl font-black italic text-gray-900 dark:text-gray-100 drop-shadow-md leading-none mb-1">{gameScore}</div>
            <div className="text-[8px] text-[#3b82f6] font-black uppercase tracking-[0.15em]">Oracle Grade</div>
          </div>

          <button
            onClick={() => setShowMatchup(!showMatchup)}
            className={cn(
              "flex items-center gap-2 px-3 py-1.5 rounded-lg border text-[8px] font-black uppercase tracking-wider transition-all duration-300",
              showMatchup
                ? "bg-accent-primary text-black border-accent-primary"
                : "bg-white dark:bg-white/5 text-accent-primary border-accent-primary/20 hover:bg-accent-primary/10"
            )}
          >
            <SwordsIcon size={12} />
            {showMatchup ? t('close_duel') : t('analyze_duel')}
          </button>
        </div>
      </div>

      <div className="flex-1 min-h-0 p-5 flex flex-col gap-4 overflow-hidden justify-between relative">
        {/* GUIDE BROWSER OVERLAY */}
        {showGuide && (
          <div className="absolute inset-0 z-40 bg-slate-50 dark:bg-[#0a0a0c] flex flex-col animate-in slide-in-from-bottom duration-300">
            <div className="h-10 border-b border-gray-200 dark:border-white/10 flex items-center justify-between px-4 bg-white dark:bg-white/5 shrink-0">
              <span className="text-[10px] font-bold text-gray-600 dark:text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <Globe size={12} /> YouTube Guide Browser
              </span>
              <button
                onClick={() => setShowGuide(false)}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            <webview
              src={`https://www.youtube.com/results?search_query=${champName}+vs+${oppChampName || 'Enemy'}+League+of+Legends+guide+s15`}
              className="flex-1 w-full bg-white"
            ></webview>
          </div>
        )}

        {showMatchup ? (
          /* EXCLUSIVE MATCHUP VIEW - SPACIOUS & FILLED */
          <div className="flex-1 flex flex-col gap-6 animate-in slide-in-from-right-8 duration-500 justify-evenly">
            <div className="bg-white/[0.02] rounded-[32px] border border-gray-200 dark:border-white/5 p-8 relative overflow-hidden group flex-1 flex flex-col justify-evenly">
              {/* Background FX */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/5 via-transparent to-red-500/5 opacity-50"></div>

              {opponent ? (
                <>
                  <div className="flex items-center justify-between relative z-10 w-full mb-4">
                    <div className="flex flex-col gap-1">
                      <h4 className="text-sm font-black text-gray-900 dark:text-gray-100 uppercase flex items-center gap-3 italic tracking-wide">
                        <Activity size={18} className="text-accent-primary" /> {t('matchups')}
                      </h4>
                      <p className="text-[10px] text-gray-500 font-bold ml-7">{t('matchups')} VS {oppChampName || t('opponent')}</p>
                    </div>
                    <button
                      onClick={() => setShowGuide(true)}
                      className="px-5 py-2 min-w-[100px] bg-white dark:bg-white/5 font-black text-gray-900 dark:text-gray-100 text-[9px] uppercase rounded-xl border border-gray-200 dark:border-white/10 hover:bg-white/10 hover:scale-105 transition-all text-center"
                    >
                      {t('guide_matchup')}
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-6 items-center relative z-10 w-full flex-1">
                    {/* Left */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative group/avatar shrink-0">
                        <div className="absolute inset-0 bg-accent-primary blur-xl opacity-20 group-hover/avatar:opacity-40 transition-opacity"></div>
                        <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${p.championId}.png`} className="w-16 h-16 rounded-2xl border-2 border-accent-primary shadow-2xl relative z-10 object-cover" />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-accent-primary text-black text-[8px] font-black px-2 py-0.5 rounded-full border-2 border-[#0a0a0c] z-20 whitespace-nowrap">{t('you')}</div>
                      </div>
                      <div className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">{pStats.kills}/{pStats.deaths}/{pStats.assists}</div>
                    </div>

                    {/* Middle */}
                    <div className="flex flex-col gap-5 w-full">
                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[9px] font-black uppercase text-gray-600 dark:text-gray-400 px-1">
                          <span>{pStats.gold.toLocaleString()}</span>
                          <span className="text-accent-primary">OR</span>
                          <span>{oppStats.gold.toLocaleString()}</span>
                        </div>
                        <div className="h-2.5 bg-black/5 dark:bg-black/40 rounded-full overflow-hidden flex border border-gray-200 dark:border-white/5">
                          <div className="h-full bg-accent-primary shadow-[0_0_10px_#3b82f6]" style={{ width: `${(pStats.gold / Math.max(1, pStats.gold + oppStats.gold)) * 100}%` }}></div>
                          <div className="h-full bg-red-500 shadow-[0_0_10px_#ef4444]" style={{ width: `${(oppStats.gold / Math.max(1, pStats.gold + oppStats.gold)) * 100}%` }}></div>
                        </div>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between text-[9px] font-black uppercase text-gray-600 dark:text-gray-400 px-1">
                          <span>{pStats.cs}</span>
                          <span className="text-blue-400">CS</span>
                          <span>{oppStats.cs}</span>
                        </div>
                        <div className="h-2.5 bg-black/5 dark:bg-black/40 rounded-full overflow-hidden flex border border-gray-200 dark:border-white/5">
                          <div className="h-full bg-accent-primary shadow-accent-primary/50" style={{ width: `${(pStats.cs / Math.max(1, pStats.cs + oppStats.cs)) * 100}%` }}></div>
                          <div className="h-full bg-orange-500 shadow-[0_0_10px_#f97316]" style={{ width: `${(oppStats.cs / Math.max(1, pStats.cs + oppStats.cs)) * 100}%` }}></div>
                        </div>
                      </div>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative group/avatar shrink-0">
                        <div className="absolute inset-0 bg-red-500 blur-xl opacity-20 group-hover/avatar:opacity-40 transition-opacity"></div>
                        <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${opponent.championId}.png`} className="w-16 h-16 rounded-2xl border-2 border-red-500/50 shadow-2xl relative z-10 object-cover" />
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-gray-900 dark:text-gray-100 text-[8px] font-black px-2 py-0.5 rounded-full border-2 border-[#0a0a0c] z-20 whitespace-nowrap">{t('rival') || "RIVAL"}</div>
                      </div>
                      <div className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tight">{oppStats.kills}/{oppStats.deaths}/{oppStats.assists}</div>
                    </div>
                  </div>

                  {/* Matchup Tip Bubble */}
                  <div className="relative mt-4 mx-4 p-4 bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-2xl border border-gray-200 dark:border-white/10 shadow-lg flex items-start gap-4">
                    <div className="bg-accent-primary/20 p-2 rounded-lg text-accent-primary shrink-0">
                      <Lightbulb size={20} />
                    </div>
                    <div>
                      <h5 className="text-xs font-black text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-1">{t('view_tips')}</h5>
                      <p className="text-xs text-gray-300 font-bold leading-relaxed">
                        {matchupTip}
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center opacity-40 gap-4">
                  <SwordsIcon size={64} className="text-gray-500 animate-pulse" />
                  <div className="text-center">
                    <span className="text-lg font-black uppercase italic tracking-widest text-gray-300">{t('searching')}</span>
                    <p className="text-xs text-gray-500 font-medium mt-2">
                      {t('sync_data_opp')} <br />
                      {/* DEBUG INFO */}
                      <span className="text-[10px] font-mono text-red-500">
                        Debug: Total={game?.participants?.length} Me={p?.participantId}
                      </span>
                    </p>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white/[0.02] border border-gray-200 dark:border-white/5 p-6 rounded-[24px]">
              <div className="flex items-center gap-3 text-[10px] font-black text-accent-primary uppercase mb-4 tracking-widest px-2">
                <Sparkles size={14} /> {t('key_tips')}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {advicePoints.slice(0, 2).map((tip, i) => (
                  <div key={i} className="bg-black/5 dark:bg-black/30 p-4 rounded-2xl border border-gray-200 dark:border-white/5 text-[10px] text-gray-300 font-bold leading-relaxed flex items-start gap-3">
                    <span className="text-accent-primary text-base leading-none mt-0.5">•</span>
                    {tip}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* MAIN COACHING VIEW - TIMELINE & VERDICT */
          <div className="flex-1 overflow-y-auto px-1 pr-3 custom-scrollbar flex flex-col gap-6">

            {/* 1. La Chronologie */}
            <section className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-black text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                <Activity size={16} className="text-accent-primary" /> {t('analysis_timeline')}
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-500/5 border border-green-500/10 rounded-xl p-4">
                  <div className="text-green-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><CheckCircle2 size={12} /> {t('analysis_pos')}</div>
                  <ul className="space-y-2">
                    {timelineAnalysis.positives.map((point, i) => (
                      <li key={i} className="text-gray-300 text-[11px] font-medium flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-green-500 shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-red-500/5 border border-red-500/10 rounded-xl p-4">
                  <div className="text-red-400 text-xs font-bold uppercase mb-2 flex items-center gap-2"><XCircle size={12} /> {t('analysis_neg')}</div>
                  <ul className="space-y-2">
                    {timelineAnalysis.negatives.map((point, i) => (
                      <li key={i} className="text-gray-300 text-[11px] font-medium flex items-start gap-2">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-red-500 shrink-0"></span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* 2. Verdict Coach */}
            <section className="space-y-3">
              <h4 className="flex items-center gap-2 text-sm font-black text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                <Brain size={16} className="text-accent-primary" /> {t('coach_verdict')}
              </h4>
              <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl p-5 relative overflow-hidden group hover:bg-white/[0.07] transition-colors">
                <div className="absolute top-0 right-0 p-4 opacity-5">
                  <Quote size={64} />
                </div>
                <p className="text-gray-200 text-sm leading-relaxed italic relative z-10 font-bold">
                  "{verdictText}"
                </p>
              </div>
            </section>

            {/* 3. Conseils Clés */}
            <section className="space-y-3 pb-2">
              <h4 className="flex items-center gap-2 text-sm font-black text-gray-900 dark:text-gray-100 uppercase tracking-wider">
                <Target size={16} className="text-accent-primary" /> {t('key_tips')}
              </h4>
              <div className="space-y-3">
                {advicePoints.map((advice, i) => (
                  <div key={i} className="flex gap-4 p-4 rounded-xl bg-[#15171e] border border-gray-200 dark:border-white/5 hover:border-accent-primary/30 transition-colors group">
                    <div className="w-6 h-6 rounded-lg bg-accent-primary/10 flex items-center justify-center text-accent-primary font-bold shrink-0 group-hover:bg-accent-primary group-hover:text-black transition-colors text-xs">
                      {i + 1}
                    </div>
                    <div>
                      <p className="text-gray-300 text-xs font-bold leading-relaxed">{advice}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}
      </div>

      {isWatchable && !showMatchup && (
        <button
          onClick={() => onWatch(game.gameId)}
          className="px-8 py-4 bg-accent-primary text-black font-black uppercase tracking-widest rounded-2xl shadow-[0_0_20px_rgba(59,130,246,0.5)] hover:bg-white hover:shadow-white/20 transition-all flex items-center gap-3 shrink-0 group mx-8 mb-8"
        >
          <Play size={20} fill="currentColor" />
          {t('watch_replay')}
        </button>
      )}
    </div>
  );
}

function CoachingStat({ label, val, color }) {
  return (
    <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 p-4 rounded-2xl text-center">
      <div className={cn("text-xl font-black", color)}>{val}</div>
      <div className="text-[9px] text-gray-500 font-bold uppercase tracking-widest">{label}</div>
    </div>
  );
}

// --- New Screen 3: Draft / Champ Select View ---
function DraftSimView({ t, panelClass }) {
  // Mock Selected Champ
  const selectedChamp = "Irelia";

  return (
    <div className="h-full flex flex-col gap-6 animate-in slide-in-from-bottom-5 pb-6">
      {/* Top Bar: Team Comps & Win Prob */}
      <div className="h-40 glass-panel p-6 flex flex-col justify-between shrink-0 relative overflow-hidden">
        <div className="flex justify-between items-center z-10 w-full mb-4">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="text-accent-primary" /> Draft Analysis
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-blue-400 font-bold text-xl">55%</span>
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden flex">
              <div className="w-[55%] h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></div>
              <div className="w-[45%] h-full bg-red-500"></div>
            </div>
            <span className="text-red-400 font-bold text-xl">45%</span>
          </div>
        </div>

        <div className="flex justify-between items-end z-10 w-full">
          {/* Ally Team */}
          <div className="flex gap-2">
            <DraftChampCard champ="ChoGath" tier="C" role="Top" />
            <DraftChampCard champ="Diana" tier="S" role="Jungle" />
            <DraftChampCard champ="Malzahar" tier="B" role="Mid" />
            <DraftChampCard champ="Irelia" tier="S" role="ADC" active />
            <DraftChampCard champ="Sona" tier="C" role="Sup" />
          </div>

          {/* Power Spikes */}
          <div className="flex flex-col gap-1 w-48">
            <PowerSpike label="EARLY GAME" val={30} color="bg-blue-500" />
            <PowerSpike label="MID GAME" val={80} color="bg-blue-400" />
            <PowerSpike label="LATE GAME" val={60} color="bg-purple-500" />
          </div>

          {/* Enemy Placeholders */}
          <div className="flex gap-2 opacity-50 grayscale">
            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-16 h-24 bg-white dark:bg-white/5 rounded-lg border border-gray-200 dark:border-white/5"></div>)}
          </div>
        </div>
      </div>

      {/* Main Content: Build & Config */}
      <div className="flex-1 min-h-0 grid grid-cols-12 gap-6">
        {/* Left: Build Selector */}
        <div className="col-span-3 glass-panel p-0 overflow-hidden flex flex-col">
          <div className="p-4 border-b border-gray-200 dark:border-white/5 font-bold uppercase text-xs text-gray-500">Suggested Builds</div>
          <div className="flex-1 overflow-y-auto">
            <BuildOption name="On-hit Shred" wr={52} pick={12} active />
            <BuildOption name="Bruiser Sustain" wr={50} pick={5} />
            <BuildOption name="Lethality Burst" wr={48} pick={2} />
          </div>
          <div className="p-4 border-t border-gray-200 dark:border-white/5">
            <div className="flex items-center gap-4">
              <img src="https://ddragon.leagueoflegends.com/cdn/14.1.1/img/profileicon/588.png" className="w-10 h-10 rounded-full" />
              <div>
                <div className="font-bold text-sm">LIDER</div>
                <div className="text-[10px] text-gray-600 dark:text-gray-400">25 days ago</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Config Grid */}
        <div className="col-span-9 glass-panel p-8 grid grid-cols-2 gap-12">
          <div className="space-y-6">
            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase mb-3">Summoners <span className="ml-2 bg-blue-500/20 text-blue-400 px-1.5 rounded text-[9px]">Imported</span></h3>
              <div className="flex gap-4">
                <img src="https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/SummonerFlash.png" className="w-12 h-12 rounded border border-gray-200 dark:border-white/20" />
                <img src="https://ddragon.leagueoflegends.com/cdn/14.1.1/img/spell/SummonerExhaust.png" className="w-12 h-12 rounded border border-gray-200 dark:border-white/20" />
                <button className="text-xs text-gray-600 dark:text-gray-400 flex items-center gap-1 hover:text-gray-900 dark:text-gray-100"><RefreshCw size={12} /> Swap Flash</button>
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase mb-3">Items Order</h3>
              <div className="flex items-center gap-2 flex-wrap">
                <ItemIcon id="1055" /> <ItemIcon id="2003" />
                <ArrowRight size={14} className="text-gray-600" />
                <ItemIcon id="3047" />
                <ArrowRight size={14} className="text-gray-600" />
                <ItemIcon id="3153" /> <ItemIcon id="3078" /> <ItemIcon id="6333" />
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase mb-3">Ability Order</h3>
              <div className="flex gap-2">
                <AbilityBox keyName="Q" active />
                <ArrowRight size={14} className="text-gray-600 self-center" />
                <AbilityBox keyName="W" />
                <ArrowRight size={14} className="text-gray-600 self-center" />
                <AbilityBox keyName="E" />
              </div>
            </div>
            <div>
              <h3 className="text-gray-500 text-xs font-bold uppercase mb-3">Runes <span className="ml-2 bg-blue-500/20 text-blue-400 px-1.5 rounded text-[9px]">Imported</span></h3>
              <div className="flex gap-8">
                <div className="flex flex-col gap-2 items-center">
                  <RuneIcon id="8000" main /> {/* Precision */}
                  <RuneIcon id="8010" /> {/* Conqueror */}
                  <RuneIcon id="9111" />
                  <RuneIcon id="9104" />
                  <RuneIcon id="8014" />
                </div>
                <div className="flex flex-col gap-2 items-center pt-8">
                  <RuneIcon id="8300" sub /> {/* Inspiration */}
                  <RuneIcon id="8345" />
                  <RuneIcon id="8347" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function DraftChampCard({ champ, tier, role, active }) {
  return (
    <div className={cn("relative w-20 h-28 rounded-xl overflow-hidden border transition-all", active ? "border-accent-primary scale-110 z-10 shadow-[0_0_15px_rgba(200,162,200,0.4)]" : "border-gray-200 dark:border-white/10 opacity-80")}>
      <img src={`https://cdn.communitydragon.org/latest/champion/${normalizeChampName(champ)}/portrait`} className="absolute inset-0 w-full h-full object-cover object-top" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent"></div>
      <div className="absolute bottom-2 left-0 w-full text-center">
        <div className="text-[10px] font-bold text-gray-300 uppercase">{role}</div>
        <div className={cn("text-xl font-bold leading-none", tier === 'S' ? "text-purple-400" : tier === 'A' ? "text-blue-400" : "text-orange-400")}>{tier}</div>
        <div className="text-[8px] text-gray-500 uppercase">TIER</div>
      </div>
    </div>
  )
}

function PowerSpike({ label, val, color }) {
  return (
    <div className="flex justify-between items-center text-[9px]">
      <span className="font-bold text-gray-500 w-16">{label}</span>
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <div key={i} className={cn("w-3 h-1.5 rounded-full", (i + 1) * 20 <= val ? color : "bg-white/10")}></div>
        ))}
      </div>
    </div>
  )
}

function BuildOption({ name, wr, pick, active }) {
  return (
    <div className={cn("p-4 border-l-2 cursor-pointer hover:bg-white dark:bg-white/5 transition-colors", active ? "border-accent-primary bg-white dark:bg-white/5" : "border-transparent")}>
      <div className="font-bold text-sm text-gray-900 dark:text-gray-100">{name}</div>
      <div className="flex gap-3 text-xs mt-1">
        <span className="text-green-400">{wr}% WR</span>
        <span className="text-gray-500">{pick} games</span>
      </div>
    </div>
  )
}

function AbilityBox({ keyName, active }) {
  return (
    <div className={cn("w-10 h-10 rounded border flex items-center justify-center font-bold text-xl", active ? "bg-accent-primary text-black border-accent-primary" : "bg-black/5 dark:bg-black/40 border-gray-200 dark:border-white/20 text-gray-600 dark:text-gray-400")}>
      {keyName}
    </div>
  )
}



// --- New Screen 2: Live Game Loading View ---
function LiveGameLoadingView({ t, panelClass }) {
  const [gameData, setGameData] = useState(null);
  const [livePlayers, setLivePlayers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Poll Live Data
  useEffect(() => {
    let interval;
    async function fetchLive() {
      try {
        const data = await window.ipcRenderer.invoke('live:get-all-data');
        if (data && data.allPlayers && data.allPlayers.length > 0) {
          // If we have new data, checking if it's a new game or just update
          // For simplicity, we trigger LCU fetch if player list length differs or is empty
          if (!gameData || gameData.allPlayers.length !== data.allPlayers.length) {
            setGameData(data);
            enrichPlayerData(data.allPlayers);
          } else {
            // Just update game time etc, but keep enriched players
            setGameData(data);
          }
          setLoading(false);
        } else {
          setLoading(true);
        }
      } catch (e) {
        console.error("Live fetch error", e);
      }
    }

    async function enrichPlayerData(players) {
      const enriched = await Promise.all(players.map(async (p) => {
        let rank = "UNRANKED";
        let wr = 50;
        let mastery = 0;

        try {
          // 1. Get PUUID from Name (LCU)
          // Note: This relies on LCU being connected.
          const summoner = await window.ipcRenderer.invoke('lcu:search-summoner', p.summonerName);
          if (summoner && summoner.puuid) {
            // 2. Get Ranked Stats
            const ranked = await window.ipcRenderer.invoke('lcu:get-ranked-stats', summoner.puuid);
            if (ranked && ranked.queueMap && ranked.queueMap.RANKED_SOLO_5x5) {
              const solo = ranked.queueMap.RANKED_SOLO_5x5;
              rank = `${solo.tier} ${solo.division}`;
              const wins = solo.wins || 0;
              const losses = solo.losses || 0;
              if (wins + losses > 0) {
                wr = Math.round((wins / (wins + losses)) * 100);
              }
            }
          }
        } catch (e) {
          console.warn("Failed to fetch rank for", p.summonerName);
        }

        return {
          name: p.summonerName,
          team: p.team, // 'ORDER' or 'CHAOS'
          champ: p.championName.replace(/[^a-zA-Z]/g, ''),
          rank: rank,
          wr: wr,
          mastery: mastery,
          role: p.position || "LANER",
          spells: p.summonerSpells ? [p.summonerSpells.summonerSpellOne.displayName, p.summonerSpells.summonerSpellTwo.displayName] : [],
          runes: p.runes ? p.runes.keystone.id : null,
          items: p.items || []
        };
      }));
      setLivePlayers(enriched);
    }

    fetchLive();
    interval = setInterval(fetchLive, 5000); // Poll slower to avoid LCU spam
    return () => clearInterval(interval);
  }, []);

  if (loading || !gameData) {
    return (
      <div className="h-full flex flex-col items-center justify-center animate-pulse">
        <Sword size={48} className="text-gray-600 mb-4" />
        <h2 className="text-2xl font-bold text-gray-600 dark:text-gray-400">{t('waiting_for_match')}</h2>
        <p className="text-gray-600">{t('enter_game_live')}</p>
      </div>
    );
  }

  const teamBlue = livePlayers.filter(p => p.team === 'ORDER');
  const teamRed = livePlayers.filter(p => p.team === 'CHAOS');
  const gameTime = (gameData.gameData.gameTime / 60).toFixed(0) + ":" + Math.floor(gameData.gameData.gameTime % 60).toString().padStart(2, '0');

  return (
    <div className="h-full flex flex-col gap-8 animate-in zoom-in-95 duration-500 pb-12">
      {/* Toggle Hint */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/5 dark:bg-black/80 px-4 py-1 rounded-b-xl border border-gray-200 dark:border-white/10 text-[10px] text-gray-600 dark:text-gray-400 font-mono z-50">
        {t('toggle_hint')}
      </div>

      <div className="flex justify-between items-end px-4">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
            <Sword className="text-accent-primary" />
            {t('liveMatch') || "Live Match"}
          </h2>
          <p className="text-gray-500 text-sm">{gameData.gameData.mapName} • {gameData.gameData.gameMode}</p>
        </div>
        <div className="flex items-center gap-4 text-sm font-mono text-gray-600 dark:text-gray-400">
          <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div> {gameTime}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-12 h-full min-h-0">
        {/* Blue Team */}
        <div className="flex flex-col gap-3">
          <h3 className="text-blue-400 font-bold uppercase tracking-widest text-xs border-b border-blue-500/20 pb-2 mb-2">{t('team_blue')}</h3>
          {teamBlue.map((p, i) => (
            <LivePlayerCard key={i} player={p} side="blue" isMe={p.name === gameData.activePlayer.summonerName} t={t} />
          ))}
        </div>

        {/* Red Team */}
        <div className="flex flex-col gap-3">
          <h3 className="text-red-400 font-bold uppercase tracking-widest text-xs text-right border-b border-red-500/20 pb-2 mb-2">{t('team_red')}</h3>
          {teamRed.map((p, i) => (
            <LivePlayerCard key={i} player={p} side="red" isMe={p.name === gameData.activePlayer.summonerName} t={t} />
          ))}
        </div>
      </div>
    </div>
  );
}

function LivePlayerCard({ player, side, isMe, t }) {
  const isBlue = side === 'blue';
  return (
    <div className={cn(
      "relative h-24 rounded-2xl border overflow-hidden transition-all group hover:scale-[1.02]",
      isMe ? "border-accent-primary shadow-[0_0_20px_rgba(200,162,200,0.2)]" : "border-gray-200 dark:border-white/5",
      isBlue ? "bg-gradient-to-r from-blue-900/20 to-black/40" : "bg-gradient-to-l from-red-900/20 to-black/40"
    )}>
      {/* Background Splash */}
      <div className={cn("absolute inset-0 opacity-40 z-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110", isBlue ? "origin-left" : "origin-right")} style={{ backgroundImage: `url('https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${player.champ}_0.jpg')` }}></div>
      <div className={cn("absolute inset-0 z-0", isBlue ? "bg-gradient-to-r from-transparent via-black/60 to-black" : "bg-gradient-to-l from-transparent via-black/60 to-black")}></div>

      <div className={cn("relative z-10 h-full flex items-center px-4 gap-4", isBlue ? "flex-row" : "flex-row-reverse text-right")}>
        {/* Champ Icon & Spells */}
        <div className="flex flex-col items-center gap-1 shrink-0">
          <div className="relative">
            <img src={`https://ddragon.leagueoflegends.com/cdn/16.1.1/img/champion/${normalizeChampName(player.champ)}.png`} className="w-10 h-10 rounded-lg border border-gray-200 dark:border-white/20" />
            <div className="absolute -bottom-1 -right-1 bg-black text-[9px] px-1 rounded border border-gray-200 dark:border-white/10 text-gray-900 dark:text-gray-100 font-bold text-center w-5">
              {player.mastery > 100000 ? "M7" : "M5"}
            </div>
          </div>
          <div className="flex gap-1 mt-1">
            {player.spells.map(s => (
              <img
                key={s}
                src={`https://cdn.communitydragon.org/latest/summoner-spell/${s.toLowerCase().replace(' ', '')}/icon`}
                className="w-4 h-4 rounded border border-gray-200 dark:border-white/10"
                onError={(e) => { e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png" }}
              />
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 flex flex-col justify-center">
          <div className="font-bold text-lg text-gray-900 dark:text-gray-100 leading-tight flex items-center gap-2">
            {isMe && <span className="text-xs bg-accent-primary text-black px-1 rounded font-bold">{t('you')}</span>}
            {player.name}
          </div>
          <div className={cn("text-xs font-mono", isBlue ? "text-blue-300" : "text-red-300")}>
            {player.rank} • {player.wr}% WR
          </div>
        </div>

        {/* Tags/Badges */}
        <div className="flex flex-col gap-1 items-end opacity-80">
          {player.runes && (
            <div className="w-6 h-6 rounded-full bg-black/5 dark:bg-black/40 border border-gray-200 dark:border-white/10 p-1">
              <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/perk-icons/${player.runes}.png`} className="w-full h-full object-contain" />
            </div>
          )}
          {player.wr > 55 && <div className="px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded text-[9px] border border-orange-500/20 font-bold">Ã°Å¸â€Â¥ {t('hot_streak')}</div>}
        </div>
      </div>
    </div>
  )
}

function TeammateCard({ role, name, winrate, champion, highlight }) {
  return (
    <div className={cn("flex items-center justify-between p-3 rounded-xl border transition-all", highlight ? "bg-accent-primary/20 border-accent-primary" : "bg-white dark:bg-white/5 border-transparent")}>
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded bg-gray-700 flex items-center justify-center text-xs font-bold">{role[0]}</div>
        <div>
          <div className="font-bold text-sm">{name}</div>
          <div className="text-xs text-gray-600 dark:text-gray-400">{champion}</div>
        </div>
      </div>
      <div className={cn("text-sm font-bold", winrate > 50 ? "text-green-500" : "text-red-500")}>
        {winrate}% WR
      </div>
    </div>
  )
}

function BanCard({ name }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-12 h-12 rounded-full bg-red-900/50 border-2 border-red-500 flex items-center justify-center text-xs">
        âÂÅ’
      </div>
      <span className="text-xs font-medium">{name}</span>
    </div>
  )
}

function StatCard({ title, value, trend, trendUp }) {
  return (
    <div className="p-6 rounded-2xl bg-white/40 dark:bg-white dark:bg-white/5 border border-gray-200 dark:border-white/20 backdrop-blur-sm shadow-sm hover:shadow-md transition-all">
      <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">{title}</div>
      <div className="text-3xl font-bold text-gray-900 dark:text-gray-900 dark:text-gray-100 mb-2">{value}</div>
      <div className={cn("text-xs font-bold flex items-center gap-1", trendUp ? "text-green-500" : "text-red-500")}>
        {trend}
        <span className="text-gray-600 dark:text-gray-400 font-normal">vs avg</span>
      </div>
    </div>
  )
}

// --- New V2 Components Definitions ---

const ParticleBackground = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(20)].map((_, i) => (
      <div
        key={i}
        className="particle"
        style={{
          width: Math.random() * 4 + 2 + 'px',
          height: Math.random() * 4 + 2 + 'px',
          left: Math.random() * 100 + '%',
          top: Math.random() * 100 + '%',
          animationDuration: Math.random() * 10 + 10 + 's',
          animationDelay: Math.random() * 5 + 's',
          opacity: Math.random() * 0.5
        }}
      />
    ))}
  </div>
);

const CAMP_MAP = {
  1: { name: "Bleu", icon: "https://u.gg/assets/lol/jungle_camps/1.png" },
  2: { name: "Gromp", icon: "https://u.gg/assets/lol/jungle_camps/2.png" },
  3: { name: "Loups", icon: "https://u.gg/assets/lol/jungle_camps/3.png" },
  4: { name: "Rapaces", icon: "https://u.gg/assets/lol/jungle_camps/4.png" },
  5: { name: "Rouge", icon: "https://u.gg/assets/lol/jungle_camps/5.png" },
  6: { name: "Krugs", icon: "https://u.gg/assets/lol/jungle_camps/6.png" },
  7: { name: "Carapateur", icon: "https://u.gg/assets/lol/jungle_camps/7.png" }
};

function MatchupsView({ t, championList, ddragonVersion, onOpenUrl }) {
  const [champ1, setChamp1] = useState(null);
  const [champ2, setChamp2] = useState(null);
  const [role, setRole] = useState('TOP');
  const [selectingStr, setSelectingStr] = useState(null); // 'champ1' or 'champ2'
  const [analysis, setAnalysis] = useState(null);
  const [buildStage, setBuildStage] = useState(1); // 1 = Core
  const [loading, setLoading] = useState(false);
  const [showJunglePath, setShowJunglePath] = useState(false);

  const fetchAnalysis = useCallback(async (c1, c2, r) => {
    setLoading(true);
    setBuildStage(1);
    try {
      const data = await window.ipcRenderer.invoke('scraper:get-matchup', c1, c2, r);
      setAnalysis(data);
    } catch (err) {
      console.error("Matchup fetch error:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (champ1 && champ2) fetchAnalysis(champ1, champ2, role);
  }, [champ1, champ2, role, fetchAnalysis]);

  const rawWr = (analysis?.winRate && typeof analysis.winRate === 'string') ? parseFloat(analysis.winRate.replace('%', '')) : 50;
  const wr1 = isNaN(rawWr) ? 50 : rawWr;
  const wr2 = 100 - wr1;

  // Local Full Build Fallback for UI consistency
  const displayBuild = useMemo(() => {
    if (analysis?.fullBuild) return analysis.fullBuild;
    if (analysis?.counterItems && analysis.counterItems.length >= 3) {
      return {
        starting: { items: role === 'JUNGLE' ? [1103, 2003] : [1055, 2003], winRate: "52.4%" },
        core: { items: analysis.counterItems.slice(0, 3), winRate: analysis.winRate || "50%" },
        fourth: analysis.counterItems[3] ? [{ id: analysis.counterItems[3], winRate: "54.1%" }] : [],
        fifth: analysis.counterItems[4] ? [{ id: analysis.counterItems[4], winRate: "55.8%" }] : [],
        sixth: analysis.counterItems[5] ? [{ id: analysis.counterItems[5], winRate: "58.2%" }] : []
      };
    }
    return null;
  }, [analysis, role]);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 pb-10 h-full flex flex-col relative overflow-hidden">
      <ParticleBackground />
      {loading && (
        <div className="absolute inset-0 z-50 bg-black/40 backdrop-blur-3xl flex flex-col items-center justify-center text-accent-primary animate-in fade-in zoom-in-95 duration-700 transition-all">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-900/10 to-transparent animate-pulse pointer-events-none"></div>
          <div className="relative w-32 h-32 flex items-center justify-center mb-8 scale-110">
            <div className="absolute inset-0 border-[4px] border-blue-500/10 rounded-full animate-[spin_4s_linear_infinite] drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]"></div>
            <div className="absolute inset-2 border-[4px] border-dashed border-blue-400/40 rounded-full animate-[spin_3s_linear_infinite_reverse]"></div>
            <Swords size={48} className="animate-pulse text-blue-300 drop-shadow-[0_0_25px_rgba(59,130,246,0.8)]" />
          </div>
          <h3 className="text-4xl font-black tracking-[0.2em] uppercase italic text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-blue-200 to-blue-400 drop-shadow-2xl animate-pulse">
            Analyse du Matchup
          </h3>
          <p className="text-xs text-blue-300/70 font-bold tracking-[0.4em] mt-4 animate-[pulse_2s_ease-in-out_infinite]">
            TRAITEMENT DES MILLIONS DE PARTIES...
          </p>
        </div>
      )}
      {/* Champion Select Modal */}
      {selectingStr && (
        <ChampionSelector
          t={t}
          onSelect={(c) => {
            if (selectingStr === 'champ1') setChamp1(c);
            else setChamp2(c);
            setSelectingStr(null);
          }}
          onClose={() => setSelectingStr(null)}
          championList={championList}
        />
      )}

      {/* Modern Header */}
      <div className="flex items-center justify-between shrink-0 bg-white dark:bg-black/60 p-5 rounded-[2rem] border border-gray-200 dark:border-white/10 backdrop-blur-2xl shadow-2xl relative z-10">
        <div className="flex items-center gap-5">
          <div className="w-14 h-14 bg-accent-primary/10 rounded-2xl flex items-center justify-center border border-accent-primary/20 shadow-inner">
            <Swords className="text-accent-primary" size={32} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-gray-900 dark:text-gray-100 tracking-tighter uppercase italic">
              {t('matchup_analysis_title')}
              {analysis?.patch && (
                <span className="ml-3 text-[10px] font-black px-2 py-1 bg-white/5 border border-white/10 rounded-lg text-gray-400 align-middle">
                  PATCH {analysis.patch}
                </span>
              )}
            </h2>
            <p className="text-gray-500 font-medium text-sm">{t('compare_and_win')}</p>
          </div>
        </div>

        <div className="flex gap-8 items-center">
          {/* Pro Role Selector */}
          <div className="flex bg-black/40 p-1.5 rounded-2xl border border-white/5 shadow-inner">
            {['TOP', 'JUNGLE', 'MID', 'ADC', 'SUPPORT'].map(r => (
              <button
                key={r}
                onClick={() => { setRole(r); setAnalysis(null); }}
                className={cn(
                  "px-4 py-2 rounded-xl text-[11px] font-black transition-all uppercase tracking-widest",
                  role === r ? "bg-accent-primary text-black shadow-[0_0_20px_rgba(59,130,246,0.5)]" : "text-gray-500 hover:text-gray-300"
                )}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex gap-5 items-center">
            <button onClick={() => setSelectingStr('champ1')} className="flex items-center gap-4 pl-2 pr-6 py-2 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 group hover:border-accent-primary/50 shadow-xl">
              {champ1 ? (
                <>
                  <img src={`https://cdn.communitydragon.org/latest/champion/${normalizeChampName(champ1)}/square`} className="w-10 h-10 rounded-xl border border-white/20 group-hover:border-accent-primary shadow-lg object-cover" />
                  <span className="font-black text-gray-100 uppercase tracking-tighter text-lg">{champ1}</span>
                </>
              ) : (
                <div className="flex items-center gap-3 text-gray-400 group-hover:text-white">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs">?</div>
                  <span className="font-black text-xs uppercase tracking-widest">{t('select_champion')}</span>
                </div>
              )}
            </button>

            <div className="w-10 h-10 flex items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary font-black italic text-sm border border-accent-primary/30 shadow-[0_0_15px_rgba(59,130,246,0.2)]">VS</div>

            <button onClick={() => setSelectingStr('champ2')} className="flex items-center gap-4 pr-2 pl-6 py-2 bg-white/5 hover:bg-white/10 rounded-2xl transition-all border border-white/10 group hover:border-red-500/50 shadow-xl">
              {champ2 ? (
                <>
                  <span className="font-black text-gray-100 uppercase tracking-tighter text-lg text-right">{champ2}</span>
                  <img src={`https://cdn.communitydragon.org/latest/champion/${normalizeChampName(champ2)}/square`} className="w-10 h-10 rounded-xl border border-white/20 group-hover:border-red-500 shadow-lg object-cover" />
                </>
              ) : (
                <div className="flex items-center gap-3 text-gray-400 group-hover:text-white">
                  <span className="font-black text-xs uppercase tracking-widest">{t('select_champion')}</span>
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center font-black text-xs">?</div>
                </div>
              )}
            </button>
          </div>
        </div>
      </div>

      {!champ1 || !champ2 ? (
        <div className="flex-1 flex flex-col items-center justify-center text-center space-y-8 relative z-10">
          {/* Hero Graphic */}
          <div className="relative group cursor-pointer" onClick={() => setSelectingStr('champ1')}>
            <div className="absolute inset-0 bg-blue-600 blur-[80px] opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            <div className="absolute inset-0 bg-red-600 blur-[80px] opacity-10 translate-x-10 group-hover:translate-x-12 transition-all duration-700"></div>

            <div className="relative w-40 h-40 bg-gradient-to-br from-gray-900 to-black rounded-[3rem] border border-white/10 flex items-center justify-center shadow-2xl group-hover:scale-105 transition-transform duration-500 overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/v1/hextech-images/chest.png')] bg-cover opacity-20"></div>
              <Swords size={60} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)] z-10" strokeWidth={1.5} />

              {/* Orbital Rings */}
              <div className="absolute inset-2 border border-white/5 rounded-[2.5rem] animate-[spin_10s_linear_infinite]"></div>
              <div className="absolute inset-6 border border-white/5 rounded-[2rem] animate-[spin_8s_linear_infinite_reverse]"></div>
            </div>

            {/* Floating Badge */}
            <div className="absolute -bottom-4 -right-4 bg-accent-primary text-black px-4 py-1.5 rounded-xl font-black text-xs uppercase tracking-widest shadow-xl rotate-3 group-hover:rotate-6 transition-transform">
              Start Now
            </div>
          </div>

          <div className="space-y-3 z-10 max-w-lg">
            <h3 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 uppercase tracking-tighter italic">
              CHOISIS TON CHAMPION
            </h3>
            <p className="text-gray-400 font-medium text-lg leading-relaxed">
              Sélectionnez votre champion pour accéder aux builds, contres, et stratégies.
            </p>
          </div>
        </div>
      ) : (
        <div className="flex-1 grid grid-cols-12 gap-6 min-h-0 overflow-hidden relative z-10">
          {/* Left Hero Card */}
          <div className="col-span-3 flex flex-col gap-5 h-full overflow-y-auto custom-scrollbar pr-1">
            <div className="relative shrink-0 h-[380px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group neo-glow">
              <img src={`https://cdn.communitydragon.org/latest/champion/${normalizeChampName(champ1)}/splash-art/centered`} className="w-full h-full object-cover object-center opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              <div className="absolute bottom-8 inset-x-8">
                <div className="flex flex-col">
                  <span className="text-accent-primary font-black text-6xl tracking-tighter mb-1 drop-shadow-2xl">{wr1.toFixed(1)}%</span>
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">{champ1}</h3>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 bg-green-500/5 border-green-500/20 mb-4 scale-in-center">
              <h4 className="flex items-center gap-2 text-green-400 font-black text-[10px] uppercase tracking-widest mb-4">
                <CheckSquare size={14} /> {t('title_to_do')}
              </h4>
              <ul className="space-y-3">
                {(analysis?.pros || []).map((p, i) => (
                  <li key={i} className="flex gap-3 text-xs font-semibold text-gray-300 leading-relaxed group">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(34,197,94,0.6)] group-hover:scale-125 transition-transform" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Center Tactical Intel */}
          <div className="col-span-6 flex flex-col gap-6 overflow-y-auto custom-scrollbar pr-4">
            {/* Strategy Card */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-accent-primary to-purple-600 rounded-[2rem] opacity-20 blur group-hover:opacity-40 transition-all duration-500"></div>
              <div className="relative bg-[#0a0a0c] border border-white/10 rounded-[2rem] p-8 shadow-2xl">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-accent-primary/20 rounded-2xl flex items-center justify-center text-accent-primary shadow-inner">
                    <Brain size={24} />
                  </div>
                  <div>
                    <h4 className="text-xl font-black text-white uppercase tracking-tighter italic leading-none">{t('gameplay_conseils')}</h4>
                    <div className="h-1 w-12 bg-accent-primary mt-1 rounded-full"></div>
                  </div>
                </div>

                {loading ? (
                  <div className="space-y-4 animate-pulse">
                    <div className="h-4 bg-white/5 rounded-lg w-full"></div>
                    <div className="h-4 bg-white/5 rounded-lg w-11/12"></div>
                    <div className="h-4 bg-white/5 rounded-lg w-10/12"></div>
                  </div>
                ) : (
                  <p className="text-gray-300 font-medium leading-[1.8] text-lg italic whitespace-pre-wrap">
                    " {analysis?.tactics || t('matchup_no_data')} "
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-col gap-6">
              {/* Video Intelligence */}
              <div className="glass-panel p-0 overflow-hidden relative group cursor-pointer h-48" onClick={() => onOpenUrl?.(analysis?.videoUrl || `https://www.youtube.com/results?search_query=${champ1}+vs+${champ2}+high+elo`)}>
                <div className="absolute inset-0 z-10 bg-black/60 group-hover:bg-black/40 transition-all flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-accent-primary/80 flex items-center justify-center shadow-[0_0_20px_rgb(var(--accent-primary)/0.5)] group-hover:scale-110 transition-transform">
                    <Play size={20} className="text-black ml-1" fill="currentColor" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white shadow-xl">{t('high_elo_pov')}</span>
                </div>
                <img src={`https://cdn.communitydragon.org/latest/champion/${normalizeChampName(champ2)}/splash-art/centered`} className="w-full h-full object-cover object-center" />
              </div>
            </div>

            {/* Strategic Risk Matrix */}
            {/* Strategic Risk Matrix & Winrate - Redesigned */}
            <div className="glass-panel p-6 bg-gradient-to-br from-indigo-500/5 to-transparent border-indigo-500/20 neo-glow flex flex-col justify-center relative">
              {/* Background Decor */}
              <div className="absolute top-0 right-0 p-32 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none"></div>

              <div className="flex items-center justify-between mb-6 relative z-10 w-full">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-500/20 rounded-xl flex items-center justify-center text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                    <Zap size={20} fill="currentColor" />
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-white uppercase tracking-tighter italic leading-none">STYLE DE MATCHUP</h4>
                    <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Analyse Dynamique</span>
                  </div>
                </div>
                <div className="px-4 py-1.5 rounded-xl text-xs font-black tracking-widest shadow-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 flex items-center gap-2">
                  {analysis?.matchupType === "GUERRE DE TEMPO" && <Clock size={14} />}
                  {analysis?.matchupType === "HIGH RISK" && <AlertTriangle size={14} />}
                  {analysis?.matchupType || "ANALYSE..."}
                </div>
              </div>

              <div className="relative w-full z-10">
                {/* Modern Versus Bar */}
                <div className="relative h-14 w-full bg-[#0c0c0e] rounded-2xl overflow-hidden shadow-2xl border border-white/5 flex items-center p-1 gap-1">

                  {/* Left (Blue) Bar */}
                  <div
                    style={{ width: `${wr1}%` }}
                    className="h-full rounded-xl bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500 relative group overflow-hidden transition-all duration-1000 ease-out flex items-center justify-start pl-3"
                  >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>

                    {/* Floating Text Inside Bar */}
                    {wr1 > 15 && (
                      <span className="relative z-10 text-xl font-black text-white italic tracking-tighter drop-shadow-md whitespace-nowrap">{wr1.toFixed(1)}%</span>
                    )}
                  </div>

                  {/* Center VS Marker */}
                  <div className="z-20 w-8 h-full bg-black rounded-lg flex items-center justify-center border border-white/10 shrink-0 shadow-xl relative">
                    <span className="text-[10px] font-black text-gray-500 italic">VS</span>
                    {/* Dynamic Indicator Line */}
                    <div className={cn("absolute -top-1 -bottom-1 w-[2px] rounded-full transition-all duration-500", wr1 > 50 ? "bg-blue-500 left-[-4px] shadow-[0_0_10px_rgb(var(--accent-primary)/0.8)]" : "bg-red-500 right-[-4px] shadow-[0_0_10px_rgba(239,68,68,0.8)]")}></div>
                  </div>

                  {/* Right (Red) Bar */}
                  <div
                    style={{ width: `${wr2}%` }}
                    className="h-full rounded-xl bg-gradient-to-l from-red-700 via-red-600 to-red-500 relative group overflow-hidden transition-all duration-1000 ease-out flex items-center justify-end pr-3"
                  >
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20 mix-blend-overlay"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent"></div>

                    {/* Floating Text Inside Bar */}
                    {wr2 > 15 && (
                      <span className="relative z-10 text-xl font-black text-white italic tracking-tighter drop-shadow-md whitespace-nowrap">{wr2.toFixed(1)}%</span>
                    )}
                  </div>
                </div>

                {/* Sub-labels */}
                <div className="flex justify-between mt-3 px-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-accent-primary shadow-accent-primary/60"></span>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{champ1} Winrate</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{champ2} Winrate</span>
                    <span className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.6)]"></span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Hero Card */}
          <div className="col-span-3 flex flex-col gap-5 h-full overflow-y-auto custom-scrollbar pr-1" >
            <div className="relative shrink-0 h-[380px] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl group neo-glow-red">
              <img src={`https://cdn.communitydragon.org/latest/champion/${normalizeChampName(champ2)}/splash-art/centered`} className="w-full h-full object-cover object-center opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>

              <div className="absolute bottom-8 inset-x-8 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-red-500 font-black text-6xl tracking-tighter mb-1 drop-shadow-2xl">{wr2.toFixed(1)}%</span>
                  <h3 className="text-4xl font-black text-white uppercase tracking-tighter leading-none mb-2">{champ2}</h3>
                </div>
              </div>
            </div>

            <div className="glass-panel p-6 bg-red-500/5 border-red-500/20 mb-4 scale-in-center">
              <h4 className="flex items-center justify-end gap-2 text-red-400 font-black text-[10px] uppercase tracking-widest mb-4">
                {t('title_to_avoid')} <XOctagon size={14} />
              </h4>
              <ul className="space-y-3">
                {(analysis?.cons || []).map((c, i) => (
                  <li key={i} className="flex flex-row-reverse text-right gap-3 text-xs font-semibold text-gray-300 leading-relaxed group">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(239,68,68,0.6)] group-hover:scale-125 transition-transform" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )
      }
    </div>
  );
}

function MatchupStatRow({ label, val1, val2, color, textMode }) {
  const total = typeof val1 === 'number' ? val1 + val2 : 100;
  const p1 = typeof val1 === 'number' ? (val1 / (total || 1)) * 100 : 50;
  const p2 = 100 - p1;

  return (
    <div>
      <div className="flex justify-between text-xs font-bold text-gray-600 dark:text-gray-400 mb-1">
        <span>{typeof val1 === 'number' ? val1.toFixed(1) + '%' : val1}</span>
        <span className="uppercase text-[10px] tracking-wider">{label}</span>
        <span>{typeof val2 === 'number' ? val2 + '%' : val2}</span>
      </div>
      {!textMode && (
        <div className="flex h-1.5 bg-white dark:bg-white/5 rounded-full overflow-hidden">
          <div style={{ width: `${p1}%` }} className={cn("h-full transition-all duration-1000", color === 'green' ? 'bg-green-500' : color === 'blue' ? 'bg-blue-500' : color === 'red' ? 'bg-red-500' : color === 'accent' ? 'bg-accent-primary' : 'bg-yellow-500')}></div>
          <div style={{ width: `${p2}%` }} className="h-full bg-white/10"></div>
        </div>
      )}
      {textMode && (
        <div className="flex h-1.5 bg-gray-700 rounded-full overflow-hidden relative">
          <div className="absolute inset-y-0 left-1/2 w-0.5 bg-gray-500"></div>
          <div className="w-1/2 h-full bg-yellow-500/50"></div>
          <div className="w-1/2 h-full bg-gray-600/50"></div>
        </div>
      )}
    </div>
  )
}

function ChampionSelector({ onSelect, onClose, championList, t }) {
  const [search, setSearch] = useState('');

  // Handle both string arrays and object arrays (DDragon format)
  const champs = useMemo(() => {
    const list = championList?.length > 0 ? championList : ["Aatrox", "Ahri", "Akali", "Yasuo", "Yone", "Zed"];
    return list.map(c => {
      if (typeof c === 'string') return { id: c, name: c };
      return { id: c.id, name: c.name };
    });
  }, [championList]);

  const filtered = champs.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  // Get latest version from parent if possible, defaulting to recent
  const version = "15.1.1";

  return (
    <div className="absolute inset-0 z-[100] bg-black/60 dark:bg-black/80 backdrop-blur-2xl p-8 flex flex-col animate-in fade-in duration-300">
      <div className="max-w-6xl mx-auto w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-8 shrink-0">
          <div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tighter italic shadow-xl">
              {t ? t('select_champion') : 'Select Champion'}
            </h2>
            <p className="text-gray-400 font-medium text-sm mt-1">Choose your champion to analyze matchups</p>
          </div>
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-white/5 hover:bg-white/20 flex items-center justify-center text-white transition-all hover:rotate-90 group border border-white/5"
          >
            <X size={24} className="group-hover:scale-110" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-8 shrink-0 group">
          <div className="absolute inset-0 bg-accent-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity rounded-2xl"></div>
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-accent-primary transition-colors" size={20} />
          <input
            autoFocus
            type="text"
            placeholder={t ? t('search_champion') : 'Search...'}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full bg-[#1a1a1d] border border-white/10 rounded-2xl py-4 pl-14 text-lg text-white font-bold outline-none focus:border-accent-primary/50 placeholder:text-gray-600 shadow-2xl transition-all relative z-10"
          />
        </div>

        {/* Grid */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {filtered.length > 0 ? (
            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4 content-start pb-10">
              {filtered.map(c => (
                <div
                  key={c.id}
                  onClick={() => onSelect(c.name)}
                  className="cursor-pointer group flex flex-col items-center gap-3 relative p-2 rounded-xl hover:bg-white/5 transition-all"
                >
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden border border-white/10 group-hover:border-accent-primary group-hover:shadow-[0_0_15px_rgb(var(--accent-primary)/0.4)] transition-all duration-300">
                    <img
                      src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${c.id}.png`}
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                      onError={(e) => { e.target.src = `https://ddragon.leagueoflegends.com/cdn/img/champion/tiles/${c.id}_0.jpg` }}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-white/10 transition-colors"></div>
                  </div>
                  <span className="text-[11px] font-bold text-gray-500 group-hover:text-white uppercase tracking-wider truncate w-full text-center transition-colors">
                    {c.name}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-64 opacity-30">
              <Ghost size={48} className="mb-4" />
              <p className="font-bold uppercase tracking-widest">No Champions Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EsportsView({ t, prefetchedData }) {
  const [activeChannel, setActiveChannel] = useState('riotgames');
  const [browserUrl, setBrowserUrl] = useState(null);
  const [upcomingMatches, setUpcomingMatches] = useState(prefetchedData?.esportsSchedule || []);
  const [news, setNews] = useState(prefetchedData?.esportsNews || []);
  const [rankings, setRankings] = useState([]);
  const [loadingSchedule, setLoadingSchedule] = useState(!prefetchedData?.esportsSchedule);
  const [loadingNews, setLoadingNews] = useState(!prefetchedData?.esportsNews);
  const [loadingRankings, setLoadingRankings] = useState(true);

  useEffect(() => {
    const fetchEsportsData = async (force = false) => {
      // If we don't have prefetched data or it's old (e.g. > 5 min), fetch fresh
      const isStale = force || !prefetchedData?.timestamp || (Date.now() - prefetchedData.timestamp > 300000);

      try {
        if (!prefetchedData?.esportsSchedule || isStale) {
          const [schedule, newsData, topLives, rankingsData] = await Promise.all([
            window.ipcRenderer.invoke('scraper:get-esports-schedule'),
            window.ipcRenderer.invoke('scraper:get-esports-news'),
            window.ipcRenderer.invoke('scraper:get-top-live-streams'),
            window.ipcRenderer.invoke('scraper:get-esports-rankings')
          ]);

          if (Array.isArray(schedule)) setUpcomingMatches(schedule);
          if (newsData && newsData.length > 0) setNews(newsData);

          if (Array.isArray(rankingsData)) {
            let flatRanks = [];
            rankingsData.forEach(r => {
                if (r.rankings && Array.isArray(r.rankings)) {
                    r.rankings.forEach(team => {
                        flatRanks.push({
                            rank: team.rank,
                            name: team.team,
                            league: r.league,
                            wins: parseInt(team.score?.split('-')[0] || 0),
                            losses: parseInt(team.score?.split('-')[1] || 0),
                            points: team.winrate
                        });
                    });
                } else if (r.name) {
                    flatRanks.push(r);
                }
            });
            setRankings(flatRanks);
          }

          // Auto-detect live channel
          let bestLive = null;
          if (schedule && schedule.length > 0) {
            const liveMatch = schedule.find(m => m.time && m.time.toLowerCase().includes('live'));
            if (liveMatch && liveMatch.league) {
              const leagueLower = liveMatch.league.toLowerCase();
              if (['lec', 'lck', 'lpl', 'lcs'].includes(leagueLower)) bestLive = leagueLower;
              else if (leagueLower.includes('otp')) bestLive = 'otplol_';
            }
          }

          if (!bestLive && topLives && topLives.length > 0) {
            const isRiotLive = topLives.find(s => s.id === 'riotgames');
            bestLive = isRiotLive ? 'riotgames' : topLives[0].id;
          }

          if (bestLive) setActiveChannel(bestLive);
        } else {
          // We have valid prefetched data, but maybe still want to detect bestLive
          const schedule = prefetchedData.esportsSchedule;
          const topLives = prefetchedData.topLives;
          let bestLive = null;
          const liveMatch = schedule?.find(m => m.time && m.time.toLowerCase().includes('live'));
          if (liveMatch && liveMatch.league) {
            const leagueLower = liveMatch.league.toLowerCase();
            if (['lec', 'lck', 'lpl', 'lcs'].includes(leagueLower)) bestLive = leagueLower;
            else if (leagueLower.includes('otp')) bestLive = 'otplol_';
          }
          if (!bestLive && topLives && topLives.length > 0) {
            const isRiotLive = topLives.find(s => s.id === 'riotgames');
            bestLive = isRiotLive ? 'riotgames' : topLives[0].id;
          }
          if (bestLive) setActiveChannel(bestLive);
        }

        // Since prefetchedData probably didn't include rankings initially, fetch it independently if it's empty
        if (rankings.length === 0) {
          const r = await window.ipcRenderer.invoke('scraper:get-esports-rankings');
          if (Array.isArray(r)) {
            let flatRanks = [];
            r.forEach(rv => {
                if (rv.rankings && Array.isArray(rv.rankings)) {
                    rv.rankings.forEach(team => {
                        flatRanks.push({
                            rank: team.rank,
                            name: team.team,
                            league: rv.league,
                            wins: parseInt(team.score?.split('-')[0] || 0),
                            losses: parseInt(team.score?.split('-')[1] || 0),
                            points: team.winrate
                        });
                    });
                } else if (rv.name) {
                    flatRanks.push(rv);
                }
            });
            setRankings(flatRanks);
          }
        }
      } catch (err) {
        console.error("Failed to fetch esports data:", err);
      } finally {
        setLoadingSchedule(false);
        setLoadingNews(false);
        setLoadingRankings(false);
      }
    };

    // Initial fetch
    fetchEsportsData(false);

    // Periodic fetch every 5 minutes while on tab
    const interval = setInterval(() => {
      fetchEsportsData(true);
    }, 300000);

    return () => clearInterval(interval);
  }, [t, prefetchedData]);

  const channels = [
    { id: 'riotgames', label: 'Riot Games', viewers: '185k', tag: 'OFFICIAL' },
    { id: 'otplol_', label: 'OTP LoL', viewers: '45k', tag: 'FR' },
    { id: 'lck', label: 'LCK Global', viewers: '32k', tag: 'KR' },
    { id: 'lec', label: 'LEC', viewers: '40k', tag: 'EU' },
    { id: 'lpl', label: 'LPL English', viewers: '20k', tag: 'CN' },
    { id: 'caedrel', label: 'Caedrel', viewers: '28k', tag: 'CO-STREAM' },
    { id: 'doublelift', label: 'Doublelift', viewers: '15k', tag: 'NA' },
    { id: 'cblol', label: 'CBLOL', viewers: '110k', tag: 'BR' },
  ];

  // Specific Logos Map
  const logoMap = {
    'gen': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e3/Gen.Glogo_square.png',
    'gen-g': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e3/Gen.Glogo_square.png',
    't1': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/a2/T1logo_square.png',
    'g2': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/77/G2_Esportslogo_square.png',
    'g2-esports': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/77/G2_Esportslogo_square.png',
    'c9': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/88/Cloud9logo_square.png',
    'cloud9': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/88/Cloud9logo_square.png',
    'fnatic': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/84/Fnaticlogo_square.png',
    'fnc': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/84/Fnaticlogo_square.png',
    'blg': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/91/Bilibili_Gaminglogo_square.png',
    'hle': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/a6/Hanwha_Life_Esportslogo_square.png',
    'al': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/25/Anyone%27s_Legendlogo_square.png',
    'drx': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d3/DRXlogo_square.png',
    'kt': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f8/KT_Rolsterlogo_square.png',
    'kt-rolster': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f8/KT_Rolsterlogo_square.png',
    'jdg': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/00/JD_Gaminglogo_square.png',
    'tes': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/46/Top_Esportslogo_square.png',
    'cfo': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/bb/CTBC_Flying_Oysterlogo_square.png',
    'wbg': 'data:image/png;base64,UklGRqhbAwBXRUJQVlA4WAoAAAAQAAAAhxMAhxMAQUxQSBCDAAABhyAQIBzwP2whIpLOkCzZduM2wnt4GRu9/wUbAkGCPX5F9H8C7P9WVK/gXgEwjkvQNHJJugsgTTI1QBoFxBKkQVUA7xmkG5iZlEHah8c9JinBLlSlLWZSph2OurTijjwx6QVim/sK2CaV0Ob7yAdIZmbSDk+PgWRm9sAOP0IqQDIz8gUdfoYh1QtoZtblxV25lLDP++IBz4klSJiw5ptQlxI+WYKa76BhWTIz2+JbWrf5ceRTtPh5oBkLTDjNXqISTz5FQLg3+Iiw8oKPiI7Ivm4gAXBPfAZZMwGR+RDhZ606JW3xUVIDm0+BtMRhkC4D6TJY4AXA3x1eBn9W8UcVvzdxG3evScN8idIob+Ao79Ec76E0xbsoaYIX10jpPN9DSWdFxCZSOilOIIBDIj/iyHi+QpSnxfpvxt7/MliSBAAJAknKwExTTOn/b5VKZ2b3HBETsNr/TOcskQDANBtl6fcfKEZfBzKziIgxxnprRdCTusJMozrXQgjh27IQwXa+di6ElNL2fjkWtR56KB5rSomItjL2qU85p5TS/fKV6E18qTW3Vmt9Ku8REYk81lq9963VlI7jVD/4ZaE+tdZydq4g4tFaa4AfpRhjQnAu37dziOicCyGEFYZfLvdEFHqYiCj+BUw06pVz9t7DTAl9jOJnQa338zreqPdh9AlRMdcMVkWLTR+iSjHcj2DOPXPsrY3W2n2PEQCstTCSmVm2LeoB1H1kxyxGjUEf8qhdRt/X2cfzBO5LMY8rfGQ9MrP3HhBNfNzHmp4ZP26DeeQ5koef5033IwDwd/uaiAh6+1/LzGMo2bYbtpFQ1T3qUe9/oQkJgsAefK2jiJgA35IkWZIk2RZFZv//94abCTM/VNXc1npKCCiKiAmQIElu2EYDELtg7v8vB6hzRKQjt20DyXacdLCn/f/HFRET4LBt20Daf/qvnfMzIpJhACRh/P/hTUS5AoqIcNi2bSBl/5Xfskf4NJfrRcQE+LYoSZIkSZIA4AJp/P8HW9qDmu/uqgzMkkciYgIk1rYbtg2AD3r/gZN0hP8E0UVETADEtm0ESbn7+9vvv9mfSRy7DEVE0JJtW27b7PceQHH+g5UAvNt8mHErAfcgXURMACVHkhxJkhGPiJz/v3aW8+3zamRtREyAb0eSLEmybUuiMxvj/3+2OtxUVGXcfkAZDlhETADDtm3D/H/8pABC54iYAIZt24aBHdvp/j99iBERIbFtJEmSIjKzomrOf2fnd2G0uAYiInxLkmRJkmRbrGZx+f+PLXdTlQvX/dI3p1YvKIuICXDQNpIkhT/gu56uflB0bUSkxTaSBEmSzD0is2pPf41fgO16eMRGxARIkCRHkST9/8HDXVo46JIydJAHETEBDtu2DSTvP3ETO8kM/vcBEREUI0myrDDzn0X+OysEdy40hYiNiPAt23bd1rZtlXoBSKn//5f20d1lEkB9UBvtYotkD9bCUERMAAS3bQNJduy09/+Pz2BPA0RECP/zn//85z//+c9//vOf//if//znP//5z3/+85///Mf//Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/8z3/+85///Oc///nPf/7jf/7zn//85z//+c9//vMf//Of//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85//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L/FDJTuOQ///vTGu+hTJsixD//+jq6rqU6P/iP7/V62qqk+JLGtb9P+/elVV+KFwHFmG/v9PxThJngHtsnDo//92Y1ThW95xZC36/4uJE6Pe4Y6sXdD/X16cGPV+dmTtgv7/guPECN+7Wo6sRf9/CxNV2NypjmwhQ/9/V6tEVXJXOlqOFv3/na4SVckNaKHlaNH/v74ywurNJuNoydD/L5IIqzK3lYxjoUX/v1MirEq9gRwLCy36//WMjBIlN4qDjIND/79qokRG5n6wsMDBof9f20iVsJLVLXCQ0aL/YzBSpUTqtg5aOMjQ/wklUqVEwutpIWOBFv0fXyUjJVIyjwUWWGBB/4ebSIlkJPXyOyCDFhb0f/pYMpKwpF5ZLZABB7To/4IYSeZTP+HrZflLBrRAi/4vkvmUfMKfkgtg+Zv7m+wv9xf9X7r+qr/Cv8LfhvuH7G+Wv7u/0f9VNb+Ffwf+Xf0vWv5r91/J/in7B/3f/F+//v/T/rf0P//5z3/+6/+3//nPf/7zX//zn//857/+f/uf//znP//1P//5z3/+8//tf/7zn//81//85z//+c//t//5z3/+81//85///Oc//9/+5z//+c9//c9//vOf//x/+5///Oc///U///nPf/7z/+1//vOf//zX/2//85///Of/2//85z//+a//3/7nP//5z3/9z3/+85//+v/tf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nPf/7zn//85z//+c9//vOf//znP//5z3/+85///Oc///nvWwFWUDggctgCANC5GJ0BKogTiBM+GQyFQiEEEjcEBABhLS3fj/H9M//Lf8Y/AD9B/4V92C3fAH6AfwD8xKI5v2teOfoD8AP0A/gHIN+Af/jXH/4dzD04M1xahYD/zPyz+1f4L+s/3v/b/XdATkH9W/yv8+/uf+a/wX0TcF8wnS/7B+Jv67/jf7x9336z+mfjZ/YPubnT/wf3b9lP6N8Kfhn4R/L/5h/nv65/Zv+n/rPu5/Wv5L+qH8n/LP8Q/pb/Sf4j4Af4T/BP5T/Lv9R/Wf61/yf9l+Vv9v/lf9v7sP6d/yv9v+yXwB/nH8O/rf9u/qv+e/oX/t/zn5cf0z+Q/7v9OP4d/wvsT/b/7h/wf95/a/kA/o38X/sP6pf7X+Z//P/W/jD/Sv2e/4//s/f/8C/8v/3//v7gP8V/oX+h/VT85/9t+JX9I/uP91/aD99v9t+iv8u/u3/J/wX+9/63+c////U/QX+S/x3+3/1r+4/6v9//+h+AH9Q/3n9c/13///lf2r/wD/o/9P3GP4B/OP85+1f/B/f//v/qv4H/av5Z/eP8X/SP7l/e/q58L/HP5n/dP8N/X/7F/3/9H8s/hf0n9P/E/+p/6//LfH1a1/Yn+3/n/MV9Pvq39T/yH+b/u3/q/2nwr/bf5/+3X9g9B/xT+B/vP9r/bD/I/IL+EfxT+o/1//Hf4D+2/93/VfL37H/oPyt8GLKf8b/t/8h+zn7//QF6v/MP7j/e/8f/m/73+3Hs7f4P5Z+435f/kP9H+b3+R+wD+af1L/L/4j9sf8N///9r9Zf77wFPsX/A/9P/A/JL7AP5N/Yf9V/kv9L/q/7z///+Z+Gv7T/nP79/nv+1/g////7vhT+R/3H/V/4r/P/9b/F////z/oH/Fv5h/i/7X/kv+N/f////1/us+/j6A/tr9/X0Qfqt/tPzq/f///gZ8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjc33avgHkPgHkPgfgfgfgfgfgfgfgHj6HFlfa/V4e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNzfcgN1/f7RVuNLl8D8D8DtlDF5P9Iv4H+Lf6BQDgZSqWs+0jeq8RDx7mlOHvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bm+7S8d2PtecUBH+jx48ePHjx48eQqa8PHZa6Fjr+rFkX3gCP9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAb7kAXzgSgEf6PHjx48ePHjx48ePHgLXn3/LgohIf2osi+8AR/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNwIH1cPXAlAI/0ePHjx48ePHjx48ePHjx4BW/eO1QJ9LkpQR5P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjcV3q4eqqUAj/R48ePHjx48ePHjx48ePHjx4BW/eO1QJ7JZn5n1V9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG4rvVw9VUoBH+jx48ePHjx48ePHjx48ePHjx48ArfOOZxfS3hkOHuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuK7tTVUoBH+jx48ePHjx48ePHjx48ePHjx48ePQPoBQaLS1zAgHvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4BABH+jx48ePHjx48ePHjx48ePHjx48ePHjx4BW+CNmcYfzP2dPo8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNxXdqefHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNwtgcwnhHNOJn5n1V9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgCFZimUBH+jx48ePHjx48ePHjx48ePHjx48ePHjx48bjPIYruGqZ6YfY3mBAPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bn8nhk/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx5Cmt87118vw9xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePAJhV9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHj0D6AUHLVvUxp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN0toWqvp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48eAVvgjWPLlDmBAPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjdWZpQCP9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5W+d67zxhAPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgGLH7ztmaUAj/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxutdwjZnGH/D3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgE7b6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48hSJY7vXeeMIB7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4BO2+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHgFb53rgxm+pw95P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48AZd4d1sg95P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxutdxd7fxmxTh7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuZvfNrzqpGLp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjyFLLvE5C+YEA95P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuApj/I2zjQz/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjcEsd3ruyDlrHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN1fhDJ5zT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuCWO713njCAe8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4Ay+NoWxAsyaiq+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePAK3+vo04Nj/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgDLtXYHMQyec09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48biOuZa5amzu5r6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48Ba7hMnE6sNamoqvp7jUxh1I3FSKkVIp2QXcAMguoEiz/R48ePHjx48ePHjx48ePHjx48ePG613d672JJV9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG6vxx56OJWPHneRvK1Afc0MXlPtPtT+mtH7+r6mwF/X9wF/cBf3AX9wHv+XBRCdTxzt8Fb19lPfipC1V9Pcae8n+jx48ePHjx48ePHjwFru713njCAe8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48BX97/qkoE8GSPRN3M/gHkIqcBlQ85p7jT3k/0BX9v2XBRCdTxyP5+aGVec09xp7yf6PHjx48ePHjx48blb/X0acGx/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgK/r8cczjF4xMfo0WHMxkLVX09xp7yf6PHjx48ePHjx43K3+vo04Nj/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjdX51dt+b5PeyYNamoqvp7jT3k/0ePHjx48ePG4JY7vXdkHLWPHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN1f3v+rCWk9LFB2Wtamoqvp7jT3k/0ePHjx48eNwSybM0oBH+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN1fj1kkDki1EnV+LDdC1V9Pcae8n+jx48ePHjx43GXeJySlOHvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxur8cc1uAmSdX4sN0LVX09xp7yf6PHjx48ePHoGGnUdna8Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN1fj070HlI6UgZVfT3GnvJ/o8ePHjx4BndbmT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48brXcJk4nVhrU1FV9Pcae8n+jx48ePG613d67zxhAPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwFfuiAscOgYg1oYRvcae8n+jx48ePHjx43BLJszSgEf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePAV+O9d55Phaq+nuNPeT/R48ePHjxuMu8TkL4e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjc33aXj3j3kPG2E+r+r+q+1+r+rfwKEYrxyPL6TPzPqr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAr8cczjF4LMmoqvp7jT3k/0ePHjxuopRtMkbya+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43N92lzNzMXDyGVDzmnuNPQteHj3jtUCfS8z/f2VX09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuMuxbZd8/3PgMbyf6PHjx48ePHjx48ArgWZpQCP9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48AODll13m7eyhpuJdbKr6e4095P9HjcrfOOnO1ixObr3CHuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwFfgTJxOrDWpqKr6e4095P9Hjx48AZd4nLqZTh7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgG+7S5l2O0OGVX09xp7yf6PHjx4CimjNz9fg1AtPcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN1fgTJxVG561NRVfT3GnvJ/o8ePG6ilwD9LtSW0oBH+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgBwcgB2JOiQD3k/0ePHjx48ePHjx43Wu7jeMxwg4e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN1fj1kjQPgG5gQD3k/0ePHjx48ePG4JZNOHvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwA4OWXXedK8NaN8+PHjx48ePHjx48ePHjx48egfQCg0acGx/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG4y7xOSTpIc5o/0ePHjx48ePHjx5Cll3h139xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5vu0N4RrOrkSc+PHjx48ePHjx48ePHjx48ePHgAlju9d54wgHvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43G2uqgKPmBAPeT/R48ePHjx48ArfO9d3kAgHvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48A33aK7zdvXuz6gEf6PHjx48ePHjx48ePHjx48eACWRr6NDRzX0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePADg5ABuvbV5gNAVlNpRmebL5Mvn6vqbwPwPwPwDx2TI63e3s9Cbr2zdf4NAJOa+jx48ePHjx48ePHjxuMu7vJLbM0oBH+jx48ePHjx43C7GR7xJw95P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5vu0V3nKQJuUWsePHjx48ePHjx48ePHjx48ePHjwAF5Aq7ZmlAI/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjc33aK7zlHZQ03SLP9Hjx48eAVwPf8uCiEh+7iyL7wBH+jx48ePHjx48eNwFJkOwG0LVX09xp7yf6PHjx4CiomYyNszkx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAHByyxQWJkYFtj8r6e4095P9Hjx48ePHjx48ePHjx48eABPD8ovnVOHvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePAFd6uKu1R5zT3GnvJ/o8eAFsDmE4/Po3si5bh7jT3k/0ePHjx48eAr8CZOJ1iVyf6PHjx48ePHjx4AXYyPeJOHvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgBwcsvsz48ePHjx48ePHjx48ePHjx48ePHjx48eAZGI5qt2d3NfR48ePHjx48ePHjx48ePHjx48ePHjx48ePAN92gbscMqvp7jT3k/0ePHkKa3wRrxmJGZ/JrooBH+jx48ePHjx4Cvx3rvPPQqvp7jT3k/0ePHjc0PBH2vX06eO1jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5vu0V3nKPUE1jx48ePHjx48ePHjx48ePHjx48ePHjx4AuvhEJh7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ATrD4ygI/0ePHjx48ePHjx4BW+cbHlyhIsx74Aj/R48ePHjx48A5vrCyBA85p7jT3k/0ePHjcOSM2QunD3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNzfdorvOliqjzmnuNPeT/R48ePHjx48ePHjx48ePHjx48BRSy7xStkelAI/0ePHjx48ePHjx48ePHjx48ePHjx48bgQPq4eqqUAj/R48ePHjx48ePHjcrfO9dfL8Pcae8n+jx48ePG4y7x6wKY7b6e4095P9Hjx48bmfz6NOE1EU48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgG+7RXedK79DgEf6PHjx48ePHjx48ePHjx48ePHjx48ePHjwAEUfSTh7yf6PHjx48ePHjx48ePHjx48ePHjx48eAb7tFbkJ6e4095P9Hjx48ePHjx5CkSx3eu88YQD3k/0ePHjx48ABSZDyn6OLyf6PHjx48ePHgCCjLAOw9xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4AcHLMABH+jx48ePHjx48ePHjx48ePHjx48ePHjx48eNzO6VKdgkz5QD3k/0ePHjx48ePHjx48ePHjx48ePHjxuJv0IoBH+jx48ePHjx48ePHjx4BW+CNY8uUOHuNPeT/R48ePG6vx3rvPGEA95P9Hjx48ePHgLXmzNKAR/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgG+7QL7Pjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4AwsLlMBTWPHjx48ePHjx48ePHjx48ePHjx48ePHgEdU095P9Hjx48ePHjx48ePHj0Dh5R2epOx9QgZVfT3GnvJ/oAb4+sWZpQCP9Hjx48ePHjcZd4pTFBlV9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAb7tFd50rv3kPOae4095P9Hjx48ePHjx48ePHjx48ePHjx48ePG5XApw95P9Hjx48ePHjx48ePHjx48ePHjx48eNxt08Mn+jx48ePHjx48ePHjx48ePABLHd67zxhAPeT/R48ePHgDLvDuAk+PHjx48ePHjx48ArgU4e8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43Dg5ZgAI/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN1FSzNKAR/o8ePHjx48ePHjx48ePHjx48ePHjwFZmlAI/0ePHjx48ePHjx48ePHjcR1zRApufPllAPeT/R48eN1fhDJ5zT3GnvJ/o8ePAUUo2mSN5NfR48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNzfdorvOUg4ZVfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48eAMu8UrZHpQCP9Hjx48ePHjx48ePHjx48ePHjx48eArM0oBH+jx48ePHjx48ePHjx48eALqxp/V0o0aq+nuNPeT/R4CNZW9dVMzSgEf6PHjx48ePAAdmNSKcPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuHByhzhlV9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48AQVFbIPeT/R48ePHjx48ePHjx48ePHjx48ePHgE7b6e4095P9Hjx48ePHjx48ePHjcXVjT+rpRo1V9Pcae8n+jwBG/BoOrsFAR/o8ePHjx48eAoqU4e8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5vu0C+z48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43VmaUAj/R48ePHjx48ePHjx48ePHjx48ePHgE7b6e4095P9Hjx48ePHjx48ePHjwBdWNP6ulGjVX09xp7yf6Nz6D1Pw8Fjyf6PHjx48ePHj0Dh5hRajz6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgBwcgFIs/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43BrMykMPcae8n+jx48ePHjx48ePHjx48ePHjx48bjLvDs36iq+nuNPeT/R48ePHjx48ePHjwASx3eu88YQD3k/0ePHjwBVIXKhFb6PHjx48ePHjx4AjlU6w9xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgG+7RXedLDzutY8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4CffD3GnvJ/o8ePHjx48ePHjx48ePHjx48ePG6Bx5Lko4J+jx48ePHjx48ePHjx48ePHjx43DfH1inD3k/0ePHjxufQep+nbfT3GnvJ/o8ePG6ipTh7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwA4OQBABH+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjdRUpw95P9Hjx48ePHjx48ePHjx48ePHjx48eNwELO2dus/0ePHjx48ePHjx48ePHjx48ePIUhPD8ojNTh7yf6PHjx43EbTJHHRpQCP9Hjx48ePIUsvCdB/0DzmnuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48eNxXerh7eGVX09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePMCnD3k/0ePHjx48ePHjx48ePHjx48ePHjx43Wu5DJ5zT3GnvJ/o8ePHjx48ePHjx48bqKUbTJG8mvo8ePHjx43J78LVX09xp7yf6PHjcnbfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHgG+7QKCu3DSOGVX09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePH8ycPeT/R48ePHjx48ePHjx48ePHjx48ePHjwBl3ickkQyec09xp7yf6PHjx48ePHjx48ePG4JZNmaUAj/R48eN1fp2309xp7yf6PHjxuVwKcPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuHByAThlV9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4/mTh7yf6PHjx48ePHjx48ePHjx48ePHjx48eNxl2LbLvn+57zoWqvp7jT3k/0ePHjx48ePHjx48eABPD8ojNTh7yf6PHjx4Ay7w7N+oqvp7jT3k/0eAoqWZpQCP9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48eNxXerh6qpQCP9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjdPvh7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx43V+O9dfYhu61NRSmnikiWpej71qaiq+nuNPeT/R48ePG6in313SKLzmnuNPeT+9A48l52309xp7yf6PHjxujWcaPNa2lAI/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjwDfdoF9nx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwE++HuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjxur8cczjF59r9X9V9p9oxu70QjyXqNgL+v73/YNPAojhS/nTm7rU1FV9Pcae8n+jx48AYSP+e4e4095P9HjxuTtvp7jT3k/0ePHjcnbfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48A33aQAR/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjc333yIB7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwFfjjz0cSrdvgsvswtFwmJ7yf6PHjx48ePG53e6VJ2x/74Aj/R48ePG4y7w7N+oqvp7jT3k/0eAD0hNvh7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePAFd7UJYFQTWPHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eATtvp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG613d67zyfC1V9Pcae8n+jx48AYUb+T04e8n+jx48boHHkvO2+nuNPeT/R48eAn3zAgHvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48eAK71cPbwyq+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgE7b6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4Cv3RAWOHQsyaiq+nuNPeT/R4CilG0yRvJr6PHjx48eArM0oBH+jx48ePHjc99d0ii85p7jT3k/0ePHjx48ePHjx48ePHjx48ePHjc33aBuxwyq+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjcnbfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgLXd3rvPPuq+nuNPeT/R48bk7b6e4095P9G4y7w7N+oqvp7jT3k/0eATtvp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjwDfdpABH+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwAazlfZUVX09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjdX4713njStpQCP9Hjx48eAVwKcPeT/R48eNxRlqDi8n+jx48ePHjwAf4n+wBH+jx48ePHjx48ePHjx48ePHjx48ePHjxuHByAIAI/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAltZmlAI/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePAV+O9d556FV9Pcae8n+jyFKNpkjeTX0ePHjx43V/WZpQCP9Hjx48ePAK4FOHvJ/o8ePHjx48ePHjx48ePHjx48ePHjx4ArvVw9DoPOae4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjc7tjh7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN1ruQyec09xp7yf6PG5O2+nuNPeT/RuTCr6e4095P9HjxuoqU4e8n+jx48ePHjx48ePHjx48ePHjx48ePG4rvVw9vDKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjcMVCSUePHjx48ePHjx48ePHjx48eAb7tOZpFs4o1mPnfgfgfgfgfgHkPgKIRFmvo8ePHjx48ePHjx48ePAGXeJySlmaUAj/R48ePHgA9ITb4e4095P9HjwBG0yRx0aUAj/R48ePHjdRUpw95P9Hjx48ePHjx48ePHjx48ePHjx48eAK71cPbwyq+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48AnbfT3GnvJ/o8ePHjx48eNzfdpzLu1uvbN17gwn1f1fs22Ovo8eAtefgfgfgTVma9bfae74e4095P9Hjx48ePHjxuApHS6Yf99rHjx48ePHjdRUszSgEf6PHjwBRlif8ePHjx48ePHjdRUszSgEf6PHjx48ePHjx48ePHjx48ePHjxub7tA3Y4ZVfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNwnsUqbuc09xp7yf6PHjx48bm+7Q3ewjde3FvwFyVlQ85p7jT3k/0ePIUsv9cHrY8ck8lSRvgFfHjx48ePHjx48ePAV+O9F+F095P9Hjx48eNxl3h139xp7yf6PG4oyxB+jx48ePHjx48blZzX0ePHjx48ePHjx48ePHjx48ePHjx43N92gTYkJNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43NSN04e8n+jx48ePHjxub7tXjT+kNT3ZbI3un0/0ePHjx48ePHjx48eALqxmHjsY2G69wh7jT3k/0ePHjx48AbeBYTl6f6PHjx48eNydt9Pcae8n+gIHHkwszSgEf6PHjx48eAaK20TmnuNPeT/R48ePHjx48ePHjx48ePHgG+7QNHp/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgBgqm42w85p7jT3k/0A33aG72ErvN9AzNNNUec09xp7yf6PHjx48ePHjx4CimjDvXYYR+HuNPeT/R48ePHgLXg7b6e4095P9HjcxpqjIvD3GnvJ/o8eATtvp7jT3k/0ePHgKFqr6e4095P9Hjx48ePHjx48ePHjx48A33aQAR/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjcnbfT3GnvJ/o8A33aXMpXjgC90+n+jx48ePHjx48ePHjx48ePHjwFFLLvE5C5Fm1VlAPeT/R48ePG4jaZI46NKAR/o8ePHgGX8cPcae8n+jx4BO2+nuNPeT/R48eAoWqvp7jT3k/0ePHjx48ePHjx48ePHjc33aQAR/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjg6BHrW/jx48ePHjwDfdobwCjOsBAiXL9Pcae8n+jx48ePHjx48ePHjx48ePAF139zGz0rGfD3GnvJ/o8ePHgFBhY8ePHjx48eAn3w9xp7yf6PHgE7b6e4095P9Hjx4Chaq+nuNPeT/R48ePHjx48ePHjx48eAb7tThlV9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNz0sqcPeT/R43N92huuyOzt6iq+nuNPeT/R48ePHjx48ePHjx48ePG5ncGnUdna8Pcae8n+jx48bmLH7zh2309xp7yf6PAT75gQD3k/0ePG6szSgEf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNzfdqcMqvp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4Aru3mEf6PHjcODkAM6uQA/Rqe8n+jx48ePHjx48ePHjx48ePHjx48ePHkKWXeJyF8Pcae8n+jx48bk7b6e4095P9HjdWZpQCP9Hjx4BO2+nuNPeT/R48eBmUAj/R48ePHjx48ePHjx48ePHjxub7tThlV9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG6szSgEfcODll13nSv9rPjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHoHDyjs7Xh7jT3k/0ePHgCNoJ9FfT3GnvJ/o8A99d0ii85p7jT3k+6NZWomtPcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48A33anDKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePAJ2309rDg5ZedYCAnDKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48boO7oy3pqYbGnvJ/o8ePAVmaUAj/R48ePG6szSgEf6PHjwFZmlAI/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4Bvu1OGVX09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNzK1aer9Dgz4Yt92hu9hK7zfOyhpucMqvp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48BELOFb9UoF0CBlV9Pcae8ZrM0oBH+jx48eN1ZmlAI/0ePHgKzNKAR/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjc33anDKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHj0D6B+r29RVfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48eAMKN/J6cPeT/R48eNydt9Pcae8n+jxurM0oBH+jx48BWZpQCP9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48A33anDKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bqKWXeHXf3GnvJ/o8bqzNKAR/o8ePHjcJ7FKm7nNPcae8n96szSgEf6PHjx48ePHjx48ePHjx48ePHjx48ePHjxub7tUiz/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuBHdIWpw95P9Hjx4BO2+nuNPeT/R43VmaUAj/R48eARLH+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5vu0gAj/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuopcA/S7UltKAR/o8boTqXVamoqvp7jT3k+6szSgEf6PHjwFZmlAI/0ePHjx48TKJtY8ePHjx48ePHjx48ePHjx4Bvu0gAj/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43J2309xp7yfcoMLHjx48ePHjwE++HuNPeT/R48AnbfT3GnvJ/o8ePAThlV9Pcae8n+jx48ePHjx48bm+7SACP9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwCuBTh7yf6PHgEAEf6PHjx48eNzu2OYEA95P9HjxuTtvp7jT3k/0ePHgHGbaJzT3GnvJ/o8ePHjx48ePHgG+7QNHp/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN1FKNpkjeTX0ePHjwCdt9Pcae8n+jxuhOqG/UVX09xp7xmszSgEf6PHjx48eArM0oBH+jx48ePHjx48ePHjwDfdoGj0/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjdWZpQCP9HgG+7VTh7yf6PHjx48AnbfT3GnvJ/oBvuQroHp7jT3k/0ePHgKFqr6e4095P9Hjx48ePHjx4AiMiCmUBH+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48AzE5HUDKr6e4i5gQD3k/0ePHjxuZid2T7zmnuNPeT7k7b6e4095P9Hjx43OcsNcT3k/0ePHjx48ePHjx48biu9XD28Mqvp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjcoMLHjx48bmOmk+JzAgHvJ/o8ePG53QVOHvJ/o8ePG5QYWPHjx48ePHjx4CszSgEf6PHjx48ePHjx48eAK72k/e5wyq+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePAWicPcae8n+gCNoJ9FfT3GnvJ/o3DFKJD3GnvJ/o8eAY04tMi4095P9Hjx48eAn3w9xp7yf6PHjx48ePHjx43AgfVw9vDKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bp98Pcae8n+gDA7W1k09xp7yf6PAJ2309xp7yf6NxR2/sae8n+jx48ePAMscPcae8n+jx48ePHjx48eAb7tFn/i3uNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43T74e4095P9AG8F3Zv1FV9Pcae8ZlonsUqbuc09xp7yf3m+5CBMgHvJ/o8ePHjx4CIHs0PD3GnvJ/o8ePHjx48ePG5vu1QtVfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4CffD3GnvJ/oB8c8f6UgZVfT3GnugYp81OHvJ/o8ePG5QYWPHjx48ePHjx4BO2+nuNPeT/R48ePHjx43N92gaPT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxun3w9xp7yf6NwFI6XTD/vtY8ePHjwEtMIEwj/9Hjx48ePG4NZywDKAj/R48ePHjx43VmaUAj/R48ePHjx48ePG4E2KIgR5zT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43QnQM5yax48ePG6vx3rvPmLT3GnvJ90tK71cTKiq+nuNPeT7k7b6e4095P9Hjx43BrOV9lRVfT3GnvJ/o8ePHjwBXe0n73OGVX09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN1ZmlAI/0ePG613d67zxpW0oBH96Wld6uJlRVfT3GnvJ9zfcgmFX09xp7yf6PHjdPvh7jT3k/0ePHjx48ePG4ED6uHt4ZVfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48BWZpQCP9Hjx4Cvx3rr7EO2+nuM04btgPK7jwTaBlV9Pcae8n3KDCx48ePHjx48ePAN981pw95P9Hjx48ePHjx43N92lBhY8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5O2+nuNPeT/R4Ay7V2BzasSQIhAN3UCE+Wz7JSfnJ9rPjx48ePHjx48bkAEf6PHjx48ePHjcnbfT3GnvJ/o8ePHjx4Bvu0gVgnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4ANZyvsqKr6e4095P9AV/cB8D8D8DwGVDzmnuNPeT/R43SOMogZVfT3GnvJ/o8AnbfT3GnvJ/o8ePHjx4AGj0/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5qK+HuNPeT/R48ePHjx48ePHjx48ePHjx4CszSgEf6PHjx48eAaeKFqr6e4095P9Hjx48biu9pP3ucMqvp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePAOzfD3GnvJ/o8ePHjx48ePHjx48ePHjx48BWZpQCP9Hjx48ePACWea04e8n+jx48ePHjx43Fd0rs+PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bivMAOtGlAI/0ePHjx48ePHjx48ePHjx48ePAVmaUAj/R48ePHjwCdt9Pcae8n+jx48ePAN92kSx/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgCCorZB7yf6PHjx48ePHjx48ePHjx48ePHjcnbfT3GnvJ/o8ePABrOV9lRVfT3GnvJ/o8ePAA0en+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bmWM+PHjx48ePHjx48ePHjx48ePHjx48ePAD9qNORL0/0ePHjx48eAoqU4e8n+jx48ePHjx4ArvVw9wWqvp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjcMVCSUePHjx48ePHjx48ePHjx48ePHjx48bk9+Fqr6e4095P9HgCu9ETjnNPcae8n+jx48eAb7tE8xn0/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwCdt9Pcae8n+jx48ePHjx48ePHjx48ePHgK/Ttvp7jT3k/0eNzTwQVSUHtKAR/o8ePHjx43N92kAEf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4BsvkeyidXEI6xzjg8NwlObjDSflklu8mczU3Sfln9X/PMEVZOaVswwSj5vDU7d1tEoM7jHf0t4oriEdIask8hFtFAI/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN0tnDKr6e4095P9Hjx48ePHjx48ePHjx48eAMu8LGuFqr6e4095P9ACWbVTh7yf6PHjx48ePG4hWYplAR/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwAsEkD2Z8aeGrQxpWa+o1EeAC0ZBENb76TgG3C/oEl8ehdkKRZ/o8ePHjx5CprvzDZrWRSc/fezLQLY6KFfXhl4BMtk/jGMcYU8TwR0pC7t9H3rvKiq+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48eNxXcqRdAyq+nuNPeT/R48ePHjx48ePHjx48ePG6vx3rvPPQqvp7jT3k+47M+PHjx48ePHjx48biu6VyqlAI/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAwXWJQtpkxnJiwvA8a6y9MgD9QnZDmdE99ihwyq+nuNPeT/R48ePHjx48eAtd4y18UKrJ5E3QGzPXbF8gnxP2VXEz3WwrKAe8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48eNxX7hxp7yf6PHjx48ePHjx48ePHjx48ePHjx4C13IZPOae4095NQqK71cTKiq+nuNPeT/R48A33aRLH+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuFgLCllvS65CrwU6u5yB1k1CRzIF9zr6PHjx48ePHjx48ePHjx48ePHjx4A6spkx0idEUNOkF2luOnhyojcvbN6e8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48bmAnDKr6e4095P9Hjx48ePHjx48ePHjx48ePG4y7V2Bzaofe9VmT/R48eAOw57UBP/0ePHjx48ePHjxuK+S6yTkpQCP9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4DBdRcy8QNuaiortcJWu2XZ8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx6BwJxnY65Jzs2iZzkvfNbvZQD3k/0ePHjx48ePHjx48ePHjx48ePHjx48AV3oicc5p7jT3k/0ePHjx48ePHjx48ePHjx48ePG6vx3rr7EO2+nuNPQGKcQ4ZVfT3GnvJ/o8ePAFd2pqqUAj/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ALBiudP8xk5/jhzhQQagRGxax48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx5ClkISISI3gWxS5+hjDfHxvcae8n+jx48ePHjx48ePHjx48ePHjx48biCorZB7yf6PHjx48ePHjx48ePHjx48ePHjx48ePAGXeJySTPqUH0srKp2nzFOGrvOdWVDzmnuNPeT/R48eAb7tIlj/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48b7JjT/viy/7IGIR+vCl/jo/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuGrujV8jnYxntJnj2Ss4U1jx48ePHjx48ePHjx48ePHjx48ePHgJbOGVX09xp7yf6PHjx48ePHjx48ePHjx48ePHjxur+9/2C+5OY59qN97ex+0VnYzQLgMqHnNPcae8n+jx48eAJ1h8ZQEf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAwZn/99GB/THA2P7LZBbTFAPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG4jDNvSf+sW/9coMtkVQprHjx48ePHjx48ePHjx48ePHjx48bqKW3kHzvuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxub7tVOHvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjcMYPu8i/9VaBsf1gfnDKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43Ee+HtiKxsjbGUZFrd7KAe8n+jx48ePHjx48ePHjx48ePHgBdjIu5Th7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgEdU095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjxuFX2h08LBj//2ok4ZVfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4C131QZVrIQ3xhgSXDGnvJ/o8ePHjx48ePHjx48ePHjxuZ3Bp2QSoJc4e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNxXe0ur+uGVX09xp7yf6PHjx48ePHjx48ePHjx48ePHjwGDM9TyGf1IAE58/vqKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuKNVVkVwPv0SHiNaI/0ePHjx48ePHjx48ePHjx48ePQOHvlc1foceMuarK05p7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNzfdpMKvp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjc1eyOSHqE+sf/+2aQGfHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwBHwxe8NTZQi6B7+FNY8ePHjx48ePHjx48ePHjx48eNyt+8dqgT2SkpaUysqvp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4AnWHxlAR/o8ePHjx48ePHjx48ePHjx48ePHjx48bhV9ohvfDr+bH9DwNPcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48biGvqz7i/nWIeG6soB7yf6PHjx48ePHjx48ePHjx48ArfvHaoE8ehKRtsf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4Bvu1DXOdAR/o8ePHjx48ePHjx48ePHjx48ePHjx43Cr7RIv/29HXuicNPcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG4dpj3p7wEhoWY7IiAI/0ePHjx48ePHjx48ePHjx48ePAK3zjmcYfvd8Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePAGSKHsA95P9Hjx48ePHjx48ePHjx48ePHjx48eAFX2iRf/7voR1/JUKq+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwBRSb5A783LzFFRvcae8n+jx48ePHjx48ePHjx48ePAUUsv9cGr9Dgz5gQD3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwBXdK7Pjx48ePHjx48ePHjx48ePHjx48ePHjx43NgYuNs1XN8Tn6hL3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAOZ9jlbVRJnFNY8ePHjx48ePHjx48ePHjx48ePHjcrfO9dfL8wIB7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwCOqae8n+jx48ePHjx48ePHjx48ePHjx48A1eyQ3v63aPpfg7+iq+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bhsgObdBnJD9KE799xp7yf6PHjx48ePHjx48ePHjx48eNyt87118vzAgHvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48biu7U9amoqvp7jT3k/0ePHjx48ePHjx48ePHgMG1/u8WPY5ip7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4AjM/4l1+q5Z1DZQD3k/0ePHjx48ePHjx48ePHjx48eAMv9cGr9Dnoh4e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePAIAI/0ePHjx48ePHjx48ePHjx48ePHjxuFXZAXHf3cQgUWsePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNwtfFwgqTUFEKoD0ePHjx48ePHjx48ePHjx48ePHjx43UU1vneu9iSVfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePAFeCPBzhlV9Pcae8n+jx48ePHjx48ePHjx48AwBIbrISMOvY4bX0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG460+eZzZgB7WY3uNPeT/R48ePHjx48ePHjx48ePHjxuVvgjZnGRgOYEA95P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48bkAEf6PHjx48ePHjx48ePHjx48ePHjxuGZ5/ghEF5Dyf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4AZqeYFsTy4B6UAj/R48ePHjx48ePHjx48ePHjx48eAMv9cGr9EC+3sf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48eNxXdqefHjx48ePHjx48ePHjx48ePHjx48eAYAtYpMnUMkeq+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgBiQ0YHtH6vhZnTvcae8n+jx48ePHjx48ePHjx48ePHjwA1eCInhHOWV5Th7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjxuQAR/o8ePHjx48ePHjx48ePHjx48eNwzOu2BLc4PSq+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx6BhglMix98lYu2UA95P9Hjx48ePHjx48ePHjx48ePHjdRSy7xOQvmBAPeT/R48ePHjx48ePHjx48ePHjx48ePHjx43Fd0rs+PHjx48ePHjx48ePHjx48ePHjx43AW3bKWs6PjtY8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG4EjAbN5QCUOvT9rHjx48ePHjx48ePHjx48ePHjx48ePAGX/TAxyTyqKQe8n+jx48ePHjx48ePHjx48ePHjx48ePHjx4AyeCuxV9Hjx48ePHjx48ePHjx48ePHjxuavZBEWVhA8D48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuAmu2khayw0oBH+jx48ePHjx48ePHjx48ePHjx48Arf6+jTg2P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx4Aru1PPjx48ePHjx48ePHjx48ePHjx48bhUwAqBOQamnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48A1xBaP42OyVrMet5oet5oeub/Sz3jmTzx/NgaDa2gi9lzox48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwAH7CJVtgtZYaUAj/R48ePHjx48ePHjx48ePHjx48eAI7k10fz9KNGqvp7jT3k/0ePHjx48ePHjx48ePHjx48ePAEKzFMoCP9Hjx48ePHjx48ePHjx48ePADY4zWjc8EPp/o8ePHjx48ePHjx48ePHjx48ePHjx4DG4GqHOzW/MyoHgLJ+SdEcTMZJjnwHM+PHjx4CSndXHRTCxcRX+2OCB7uW9h5hWj2bRMs5xDdI4owD3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4ACbVYjo6RRxnjx48ePHjx48ePHjx48ePHjx48ePHjcXXf3MbPS9fb2P9Hjx48ePHjx48ePHjx48ePHjx48ePHjc34EvU4e8n+jx48ePHjx48ePHjx48ePAAZONW0DOa2UA95P9Hjx48ePHjx48ePHjx48ePHjwGNymfdzbulEU21EJL5HLgEf6PHjx48ePAO6Q6MHOglDz/cY0MljcHUEVjnFNY8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43AT4p2pqJWKF8aiq+nuNPeT/R48ePHjx48ePHjx48eNyt/r6NODY/0ePHjx48ePHjx48ePHjx48ePHjx48eAKkMqcpp7jT3k/0ePHjx48ePHjx48eAwtYdcLeflrHjx48ePHjx48ePHjx48ePHjx48eNzAN45tTP/yZIf7GuKAe8n+jx48ePHjx48BGCYkRpplEk6u48Vz09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48eABaZWm3IZpNRVfT3GnvJ/o8ePHjx48ePHjx48ePG5W/19GnBsf6PHjx48ePHjx48ePHjx48ePHjx48eNyYVfT3GnvJ/o8ePHjx48ePHjx4BgAS8OftCzPjx48ePHjx48ePHjx48ePHjx48ePG5sNQpn/+Wx62mQtY8ePHjx48ePHjx48ePHgHyk6e545wIyQVrgCP9Hjx48ePHjx48ePHjx48ePHjx48ePHjx4Avb9eOIcCe8n+jx48ePHjx48ePHjx48ePHjx48bgMWujVeQLoEDKr6e4095P9Hjx48ePHjx48ePHjx43Fd2p61NRVfT3GnvJ/o8ePHjx48ePG5gAS8OftDxVfT3GnvJ/o8ePHjx48ePHjx48eNzAOV//lwd8aZcTFrHjx48ePHjx48ePHjx48ePG6v48Jn76/kew/+VLbWPHjx48ePHjx48ePHjx48ePHjx48ePHjx4AZUwTLdG0i9kKax48ePHjx48ePHjx48ePHjx48ePHjwBhRwGFunD3k/0ePHjx48ePHjx48ePHjx48ePHgCdYfGUBH+jx48ePHjx48ePHjx48eAYAEvDn7R0gI/0ePHjx48ePHjx48ePHjx48eNzAOVpt1fS7ZXh5zT3GnvJ/o8ePHjx48ePHjx48bpUvbSYewCrGT/R48ePHjx48ePHjx48ePHjx48ePHjx48bh/UinqHSIlHvJ/o8ePHjx48ePHjx48ePHjx48ePHoHDyjtDlOHuNPeT/R48ePHjx48ePHjx48ePHjxub7tFbkJ6e4095P9Hjx48ePHjx48eNzAAl4c/aHiq+nuNPeT/R48ePHjx48ePHjx43MA5Wm95umM7M0Aj/R48ePHjx48ePHjx48ePHjx48bq/jhzLUTcQCEV9Hjx48ePHjx48ePHjx48ePHjx48ePHjx43D6OLPSlceZIGVX09xp7yf6PHjx48ePHjx48ePHjwDIxHNVuzu5r6PHjx48ePHjx48ePHjx48ePHjx4BQYWPHjx48ePHjx48ePHjx48eAwEvDn9p+85p7jT3k/0ePHjx48ePHjx48ePAOG8yBdP2NxJp7jT3k/0ePHjx48ePHjx48ePHjx48bnmTE+iTERiLxEPR/o8ePHjx48ePHjx48ePHjx48ePHjx48eNxW0aeo5FNPeT/R48ePHjx48ePHjx48ePHjx48eABGqLqszSgEf6PHjx48ePHjx48ePHjx48ePAIAI/0ePHjx48ePHjx48ePHjxuMbFPideThlV9Pcae8n+jx48ePHjx48ePHgGwMZo6/+6jGDaBlV9Pcae8n+jx48ePHjx48ePHjx48ePG6VF9fl4amOKHeT/R48ePHjx48ePHjx48ePHjx48ePHjx4AYbxGU0xu9wvJ/o8ePHjx48ePHjx48ePHjx48ePHjcZd4uf+XD3GnvJ/o8ePHjx48ePHjx48ePHjwDfdo2z2iq+nuNPeT/R48ePHjx48eNwIiKS2kIR8xQD3k/0ePHjx48ePHjx48ePHjwDzu0C4AGBqiYmnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx43OmpKYq2WriGuNPeT/R48ePHjx48ePHjx48ePHjx48ePG4jSrgMjXUoB7yf6PHjx48ePHjx48ePHjx48ePHgHd74c7mOoZP0ePHjx48ePHjx48ePHjx48ePHgFBhY8ePHjx48ePHjx48ePHjxuLZ7854QVhBH+jx48ePHjx48ePHjx48ePHgGwMZ0trq3kVjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG510VvWZTUJ9koZVfT3GnvJ/o8ePHjx48ePHjx48ePHjx43GaBzpIFvJ/o8ePHjx48ePHjx48ePHjx48ePHjwBhYWz0SnD3k/0ePHjx48ePHjx48ePHjx48AgAj/R48ePHjx48ePHjx48eNwzAvhN3fp0BH+jx48ePHjx48ePHjx48ePAOTwujf43r6iq+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePG6JjePCoBWKf6PHjx48ePHjx48ePHjx48ePHjx48ePG4jfVIoP609xp7yf6PHjx48ePHjx48ePHjx48eN1FPvrupwCqKr6e4095P9Hjx48ePHjx48ePG426eGT/R48ePHjx48ePHjx48eAYAFQCH6r9RVfT3GnvJ/o8ePHjx48ePHjwD5Jp0SjKrJFrHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjdKA45WUvMRC8ZtY8ePHjx48ePHjx48ePHjx48ePHjx48eANY0uTj/R48ePHjx48ePHjx48ePHjx48ePHjwA5d5bKpw95P9Hjx48ePHjx48ePHjx48eAK7pXa1NRVfT3GnvJ/o8ePHjx48bgTG4ExhkzgnvJ/o8ePHjx48ePHjx48ePG5gIbMgZaNdH+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4CUBgTBBc+kaG70/0ePHjx48ePHjx48ePHjx48ePHjx43FuVPKHw0/0ePHjx48ePHjx48ePHjx48ePHjx43PA2FLM0oBH+jx48ePHjx48ePHjx48eNz2/Rcae8n+jx48ePHjx48ePHgC25fCbpQCDzmnuNPeT/R48ePHjx48ePHgGAMVao27eU95P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjdEpYiB/4MYPHjx48ePHjx48ePHjx48ePHjx48ePHjcayWsXTSae4095P9Hjx48ePHjx48ePHjx48ePG4y7xSZSfo8ePHjx48ePHjx48ePHjx48bqFqr6e4095P9Hjx48ePHjxuFVWdP8gV41FV9Pcae8n+jx48ePHjx48bmwmURYTlm4prHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bomNFt2ash7yf6PHjx48ePHjx48ePHjx48ePHjx43EmsIICdEDKr6e4095P9Hjx48ePHjx48ePHjx43K4FOHvJ/o8ePHjx48ePHjx48ePHjdXQPT3GnvJ/o8ePHjx48ePG4nj+bL09Pcae8n+jx48ePHjx48ePHgGAj/RtR6vp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4B6wuNnwqK6jGnvJ/o8ePHjx48ePHjx48ePHjx48ePG407Cs05P9Hjx48ePHjx48ePHjx48ePHjx48eAop99d1OAVRVfT3GnvJ/o8ePHjx48ePHjdCdS6nx48ePHjx48ePHjx48ePG4tsB0K8d++oqvp7jT3k/0ePHjx48ePHjcwEWE5cvHuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48A+iUAP/0Wra8n+jx48ePHjx48ePHjx48ePHjx48ePAFUFzQ2+jx48ePHjx48ePHjx48ePHjx48ePHjcnbfT3GnvJ/o8ePHjx48ePHjx43KDCx48ePHjx48ePHjx48eNzAF4aJ4lxeT/R48ePHjx48ePHjx48eAwxVqjrwJ2lAI/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwD3ysW4wjWyq+nuNPeT/R48ePHjx48ePHjx48ePG4jMIUj5p7fi8n+jx48ePHjx48ePHjx48ePHjx48bg1mZs5Ye4095P9Hjx48ePHjx48ePHjwCACP9Hjx48ePHjx48ePHjwBjYvYjrZT3GnvJ/o8ePHjx48ePHjx43RdQ2ujX9Y8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePAQo6rzkmYGVX09xp7yf6PHjx48ePHjx48ePHjx4Awxc85X09xp7yf6PHjx48ePHjx48ePHjx48bmX8cPcae8n+jx48ePHjx48ePHjx4A26eGT/R48ePHjx48ePHjx43CewTagBVfT3GnvJ/o8ePHjx48ePHjdDmDPKZPjVjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bnt77N5OQRPeT/R48ePHjx48ePHjx48ePHjx48eAJD0CqF+Ce8n+jx48ePHjx48ePHjx48ePHjx48BRUszSgEf6PHjx48ePHjx48ePHjwEECwCP9Hjx48ePHjx48ePHgDG8DJjuC8n+jx48ePHjx48ePHjx48bnC8GJXojr9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eActB4Ccur6PHjx48ePHjx48ePHjx48ePHjx48eAKOAgysoB7yf6PHjx48ePHjx48ePHjx48ePG5Esf6PHjx48ePHjx48ePHjx48BJJAkrnPjx48ePHjx48ePHjx48biFAI6TlRt7jT3k/0ePHjx48ePHjx48AwEhDsNaq+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAdwReGTbT3GnvJ/o8ePHjx48ePHjx48ePHjx4B8bpP8d5igEf6PHjx48ePHjx48ePHjx48ePHjxurM0oBH+jx48ePHjx48ePHjx43FN71Nec09xp7yf6PHjx48ePG4xsgEdbKe4095P9Hjx48ePHjx48ePARdQ2xWkG8POae4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43RdhsII119Pcae8n+jx48ePHjx48ePHjx48ePG4j2DdOp7jT3k/0ePHjx48ePHjx48ePHjx48eN1ZmlAI/0ePHjx48ePHjx48ePG6szSgEf6PHjx48ePHjx48AwB0yWsj9Hjx48ePHjx48ePHjx48eAeWo4ttClAMqvp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgHzOH7mJpSBlV9Pcae8n+jx48ePHjx48ePHjx43E1eYVZLKAe8n+jx48ePHjx48ePHjx48ePHjx4BjTU8ZTh7yf6PHjx48ePHjx48ePHjc7MfYjKe4095P9Hjx48ePHjxuLbmBrN5Yec09xp7yf6PHjx48ePHjwDASDCZ2ynjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjc4l2H7WPHjx48ePHjx48ePHjx48ePHjx48eAHsPxk95P9Hjx48ePHjx48ePHjx48ePHjx43T74e4095P9Hjx48ePHjx48ePHgKFqr6e4095P9Hjx48ePHgC5iB3XGnvJ/o8ePHjx48ePHjx48BDmAabNNrHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG599joITv8f6PHjx48ePHjx48ePHjx48ePHjx43FvzJGcn+jx48ePHjx48ePHjx48ePHjx48ePAT74e4095P9Hjx48ePHjx48ePHgKFqr6e4095P9Hjx48ePG4toTDqxvP0Oae4095P9Hjx48ePHjx48bmrV462sz/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4BvxArk1K+nuNPeT/R48ePHjx48ePHjx48ePG4ps1ATHjx4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JuCQMqvp7jTRYzbmOmtfR48ePHjx48ePHjx43VOHvJ/o8ePHjx48ePHjx48ePHjxuig1Cxk95P9Hjx48ePHjx48ePHjx48ePG5gC6OOYJ1p7yf6PHjx48ePHjx48ePHjx48ePHgHd78Pcae8n+jx48ePHjx48ePHjx48eNyJY/0ePHjx48ePHjx43EzTJq5+jx48ePHjx48ePHjx48bokizAKd6f6PHjx4COSFkv2PHjx48ePHjx48ePHjwD31EQxjT3k/0ePHjx48ePHjx48ePHjxukHSzKk85p7jT3k/0ePHjx48ePHjx48ePAFtzAco9Pcae8n+jx48ePHjx48ePHjx48ePAYgAj/R48ePHjx48ePHjx48ePHjx48AjqmnvJ/o8ePHjx48eNwrvUP1gPT3GnvJ/o8ePHjx48ePG55xpQD3k/0ePAQB4MDa+jx48ePHjx48ePHjc08QD8NQI/0ePHjx48ePHjx48ePHjx48A4P8P3rj0gZVfT3GnvJ/o8ePHjx48ePHjxuwjoymwlrDzmnuNPeT/R48ePHjx48ePHjx48eAn3nx48ePHjx48ePHjx48ePHjx48ePG6IMPNmlIGVX09xp7yf6PHjwBLor7tr6PHjx48ePHjx48ePHjdFwraz3k/0ePHgHiRWzrlbJ7yf6PHjx48ePHjx48A96dMPOae4095P9Hjx48ePHjx48ePG6Gi7HXoGVX09xp7yf6PHjx48ePHjx48eNxbYDof/Pjx48ePHjx48ePHjx48ePHjx48ePHjcV8JHU2FNY8ePHjx48ePHjx48ePHjx48ePAJ2309xp7yf6PHjx48bio9Hmk4ZT/R48ePHjx48ePHjx48boaESbh5zT3GnuhyUor6PHjx48ePHjx48ePG59S1+EzUVX09xp7yf6PHjx48ePHjx48eAkGMUK0q4vJ/o8ePHjx48ePHjx48ePHjxuYAuj0gYe8n+jx48ePHjx48ePHjx48ePHjx43O73z48ePHjx48ePHjx48ePHjx48ePHjxuR1TT3k/0ePHjx48ePG4w3NPNQXk/0ePHjx48ePHjx48eAe1RXqcPeT/R48A+CACdtvdvnNPcae8n+jx48ePHjwEUwFV09xp7yf6PHjx48ePHjx48ePHgHlhT4khyri8n+jx48ePHjx48ePHjx48ePG4tuTWgFdfR48ePHjx48ePHjx48ePHjx48ePG7CHcJSrRlAPeT/R48ePHjx48ePHjx48ePHjxutd3eirLzmnuNPeT/R48ePG4uOQJ6ae4095P9Hjx48ePHjx4CFLFANeEIt7jT3k/0A7NCae8n+jx48ePHjx48eAeT0gi80f6PHjx48ePHjx48ePHjx48ePAQwLpJ+4095P9Hjx48ePHjx48ePHjx48AKtTJuaI9RVfT3GnvJ/o8ePHjx48ePHjx48ePAFYaDjkB48ePHjx48ePHjx48ePHjx48ePHjxuMvDN7pbxeT/R48ePHjx48eAF/EuonNdKAR/o8ePHjx48ePHjx4CJO6kMPOae4094zIl+bu9xp7yf6PHjx48ePHjdDmTrkZ7jT3k/0ePHjx48ePHjx48ePG5q1eOKWp7jT3k/0ePHjx48ePHjx48ePHjcB+oUR7N6f6PHjx48ePHjx48ePHjx48ePHjxua+YVjNqY809xp7yf6PHjx48ePHjx48ePHjx48bn0Hqfp2309xp7yf6PHjx48bjLldKyZ/o8ePHjx48ePHjx48eN0HMsGvv6PHjx48BDyx/k0Aj/R48ePHjx48ePG5wvIVcyJRTWPHjx48ePHjx48ePHjx48ePARcM7P8+xp7yf6PHjx48ePHjx48ePHjx48AW2A6HcQedrHjx48ePHjx48ePHjx48ePHjx48eNyACP9Hjx48ePHjx48ePHjx48ePHjx48eNxG5EwblJOT/R48ePHjx48ePADzlktMCAe8n+jx48ePHjx48ePAN5ftTP/3GnvJ/oCIC1GtKs2x48ePHjx48ePHjxuYCQk6wsF9Pcae8n+jx48ePHjx48ePHjxuatXjilqe4095P9Hjx48ePHjx48ePHjx4BsEBUx2jJp7yf6PHjx48ePHjx48ePHjx48ePHgGWM+PHjx48ePHjx48ePHjx48ePHjx48ePHgIU9rbCszSgEf6PHjx48ePHlUylvNMGPwMqvp7jT3k/0ePHjx48bo4EB87SgEf6PG6ShMcHQyq+nuNPeT/R48eN0XUNrpDOae4095P9Hjx48ePHjx48ePHjxui7PUgup2lAI/0ePHjx48ePHjx48ePHjx4AESSyjyuLyf6PHjx48ePHjx48ePHjx48ePHjc08GYwf93Hjx48ePHjx48ePHjx48ePHjx48ePHjx4AjaZI46NKAR/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o8ePHjx9So/oMudgWmiYixHFlAPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bha9WLmP/pri8PRJX09xp7yf6PHjx48ePHjx48ePHjx48ePHjxuYAk73rNnx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAr8d8F88RXSkDKr6e4095P9Hjx48ePG4i70G0VWRUNuhuEwf7iBlV9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxuFhVcgbRytMf/24iaDa+jx48ePHjx48ePHjx48ePHjx48ePHjx48AwAxTiHDKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwBl3ickkzjLqqM31P9Hjx48ePHjx48ePHjx6ByebjfKUOcQemkdVCPmL7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePAYLXv2fXvvP3f9oDEsKe8n+jx48ePHjx48ePHjx48ePHjx48ePHjx43DFydKV3m9kzmnuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePAV+MewBhp7wWbBAyq+nuNPeT/R48ePHjx5ClwEw5kWU8sKKDVJ6MCKbk/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5qhQ0kIQjbPMaz/34omg2vo8ePHjx48ePHjx48ePHjx48ePHjx48ePHjc1gDD7+RJwyq+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgK/HfiCWYriBjYjY8ePHjx48ePHjx48ePHjx4Aw+YRhO3SeTrftchJhpR6Hb5QD3k/0ePHjx48ePHjx48ePHjx48ePHjx48eNzADGO8nAyvLBSfA6+I/T3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48A08AN2EnDKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgDbwwDclbt7r9l6Varen+jx48ePHjx48ePHjx48eAtd4xpF0oVdncwtopLqOBCFo6sQ39jT3k/0ePHjx48ePHjx48ePHjx48ePHjcLCkcjA+GB77/q+779IxVJVjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43YKun1suhEVFh7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePAV+KxNeplU2xECghaq+nuNPeT/R48ePHjx48ePHjda78DWtjosXvKTdpQUOnQi5PKHIIke6iJsePHjx48ePHjx48ePHjx48ePHgGAF0uRDg6PhV5pbyqC95D8DYcswx7WPHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwGDGNZNz3ogQdHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG6vzq7QEJjufPEBOJQxx9Hjx48ePHjx48ePHjx48ePHjx6Bx/WzrzGTgp5Qkz5IatBPzoSZFCqy881Y+E1Buqvp7jT3k/0ePHjx48A08CuISEMk9AcUdeYGpNguax77yWPZaeRVyIy42kiz/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePADFOGrvOkTqKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN1fin71oe9bz+haq+nuNPeT/R48ePHjx48ePHjx48eN1rvyIh9isU4kgX9wZbkAJ6wuGyUMc2Zp/DcQ9zeaiHLeGp2/Z1+8mQs+riEdIasiOsiOsiOsiP+Ajq77IjrIjVcQjpDKuIR8bf16gTlB+k/LJPCvFJD+L/r0dUc9iCwzfSOQpKOPkRiGbUwCP9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAGKcNXedInUVX09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG6vx3xnb6vUFL2aFqFqr6e4095P9Hjx48ePHjx48ePHjx48ePHjyIolZXDvnOi4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwDADFOGrvtb+hVfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjdX445nGLxTbFCzNeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48A08De1gcrvtb+hVfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43V+dXaAhMd3MjEMjHxAyq+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5gCBSPs8RhrD8Xk/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN1f2u7vXn3X7C0Rp2TT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjc2OJJ3vWbPjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4Cvx3wXzxFT/LoZtkVk1FV9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5qKyrpfnK1NaILKh5zT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48BX8ssYwDrMgegvYWiLGtTUVX09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwE+y2SlZHjFV9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAr9Fu+vP+bY+IGVX09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN0+yV6xpXec6usHnNPcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgK/td3p3oPKRUnhfHoRlTWPHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bqKTe9ZbscPjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgK/td3fBfPEVWVP/rWpqKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5gB3/QcLyDxiq+nuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwFf3v+qK8Fw6ocFyW5HVdC1V9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eN0+yry/nscrXkO9NlV9Pcae8n+jx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43V/X8sZ0BSIysvX1Z/QtVfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48BLW+9k+0Y2sNnV1g85p7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bq/teBc7/SDazMqyD3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAaeGwGKvL+exytrUy8Yqvp7jT3k/0ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjxur+143OIsv6I3fknD0a1NRVfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG5p4n2SvVgvIRUyoec09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHgK/td3fGdvq9QUv9fUpN4noZV5zT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx4CWz7JSfnJ9p9rIWVDzmnuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjwFf3Ae/6oE+s7Ex8dl70IJ961NRVfT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjxulrZBSD1HQURYKQGcdhPSbKr6e4095P9Hjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bq/uA9/y4KITpgTvKUYVn+2Qz7CWErU1FV9Pcae8n+jx48ePHjx48ePHjx48ePANmLewGIPUb7Uh8fHbE7cMuAzpT09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48bq/r+4D3/VAn1o6m8Dv578VIqSQD0ePHjx48ePHjx48ePHjx4Ckcexxb72X6o1lzBHYVoBqfqPi+Bv7OlPT3GnvJ/o8ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx43V/cBwHAfAC4ePqx/f6QGcf1f1f1Rg4otQqRUkiWyNnYsJYSwlhLCWuqIcELWvqBFSKecsLP6r7X6o1lzBIvNWfwHA651fA8BwGdKenuNPeT/R48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePG6v6/r+4DgL+4DgOA4DgOA4DgOA4C/r+4DgOA6wec09xp7yf6PHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48ePHjx48eAAA/vy8SAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA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',
'tsw': 'data:image/png;base64,UklGRuhjAABXRUJQVlA4TNtjAAAvX8fXEfentm0jh7f/0NelD72AoMj/0QQERf6PpqaRFChQvTVBFP6FIIAlkLTBAvtjACjkdzAMAo2KAhTwYCTqh1WD2Pw9MbO7Of9IkNtGkiSp6b/XXVWdc+1+I2ICuv787WdiM+k+B81DZciCwjODZ8M4U0HWLS27U9CgltDI8tasSi+FIavGNXsdLq5/bJU//v9nuez/73FmyUxGEiOSEKlExJKiKNHQUEtRVNRSa1oURamqqlqKhtqllmpJQ2MrUlFaTVMvS1F7aaTWaBAhQiLJJDGJ2Y7HHyKZOWfmeeacPM+rEf2fAKBA/P1HEZH4sO1/pzTW85sZHEBgkQAWFl17gnUV2xpsSzzR9N42vRdbXHUTjavpxVgT4rFFY/RK783eaxL1MmYd29GxoBAENTBO+8XTD5794efz/V3zR0T/JwD/87///vvvv///+d9///333////O+///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++/+f//3333///f/P//7777////n/P//777///v/n///877///vv//wpqPL196wU3ah7ZsXfvITExH0yZMnV+bGxs7PHDFacmV7jv8OHDp2JjZ0yZ8m7MiDd79+oQ2a5Jo7Cgur46ldyQMqBph97vTJ57KnX3pq+XXc+8m/Ow0GgCnrJlpQX3b99Ytm5z8oET86eOGtgtIsyPkeXRBLbqOmTivKNJGxZn5haVs+C0rcaC+5mLN+w6+NdH7/RoE+Qpa+MZENruzXGzjy38btntp+Cyn2au2nYgdnz/tqG1NXIxHr4N2vYf/1fK5uX3yoEky2+uSjo2fdirYX4eMi1M3ZZ9xs7//fvFdwotQLTWojsrd5z4OLqNXjZFFdRx8PSDX1/NLWaBpNnSu2k7jk2KDveULfGoE95nwpmfVt2xAOGz9+N+nj+8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ubkzNShDrdrHVmT9uhnKUSvn2aDCzH5qlKUeXQ7PWv8IRnnqbiYAAFtCBMpUt7gJAPBgjgZlqgNvAIB5TyDKVXtvB4CsAR4oV63aAvB0hhfKVjMfA/t1R5Sxnvoka4waZaw7GLaEopz1q/GvMShn7TnKD+WtGfzP//7777///v/nf//9999////zv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vvvv//++++///7777///vv/n//9999///3/z//++++///7/X4AA',
    'fly': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e5/FlyQuestlogo_square.png',
    'flyquest': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e5/FlyQuestlogo_square.png',
    'bfx': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/5/5b/BNK_FEARXlogo_square.png',
    'dk': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/1b/Dplus_Kialogo_square.png',
    'dplus-kia': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/1b/Dplus_Kialogo_square.png',
    'kc': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/2d/Karmine_Corplogo_square.png',
    'karmine-corp': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/2d/Karmine_Corplogo_square.png',
    'ig': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/e/e4/Invictus_Gaminglogo_square.png',
    'mkoi': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/bd/Movistar_KOIlogo_square.png',
    'dcg': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/4c/Deep_Cross_Gaminglogo_square.png',
    'gam': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/8/8a/GAM_Esportslogo_square.png',
    'nip': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/4f/Ninjas_in_Pyjamas_2017logo_square.png',
    'tlaw': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f4/Team_Liquidlogo_square.png',
    'team-liquid': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f4/Team_Liquidlogo_square.png',
    'lng': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d5/LNG_Esportslogo_square.png',
    'mvk': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/1/1f/MVK_Esportslogo_square.png',
  };

  const getTeamLogo = (slug, rawName) => {
    if (logoMap[slug]) return logoMap[slug];
    const n = rawName ? rawName.substring(0,2).toUpperCase() : slug.substring(0,2).toUpperCase();
    return `https://ui-avatars.com/api/?name=${n}&background=141726&color=fff&size=64&bold=true&font-size=0.4`;
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in relative">
      {/* Browser Overlay */}
      {browserUrl && (
        <BrowserOverlay url={browserUrl} onClose={() => setBrowserUrl(null)} />
      )}

      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
        <Trophy className="text-accent-primary" /> {t('esports_center')}
      </h2>
      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0 overflow-hidden">
        <div className="col-span-8 flex flex-col gap-6 h-full overflow-y-auto custom-scrollbar pr-2 pb-6">
          {/* Twitch Embed */}
          <div className="min-h-[500px] flex-1 bg-black rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden relative shadow-2xl group shrink-0">
            <iframe
              src={`https://player.twitch.tv/?channel=${activeChannel}&parent=localhost`}
              className="w-full h-full"
              allowFullScreen
            ></iframe>

            {/* Overlay Controls */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button className="px-3 py-1 bg-black/5 dark:bg-black/80 hover:bg-black text-gray-900 dark:text-gray-100 text-xs font-bold rounded border border-gray-200 dark:border-white/10 backdrop-blur-md flex items-center gap-2" onClick={() => setActiveChannel('riotgames')}>
                <RefreshCw size={12} /> {t('switch_source')}
              </button>
            </div>

            <div className="absolute top-4 left-4 flex gap-2">
              <div className="px-3 py-1 bg-red-600 text-gray-900 dark:text-gray-100 text-xs font-bold rounded animate-pulse flex items-center gap-2">
                <span className="w-2 h-2 bg-white rounded-full"></span> LIVE
              </div>
              <div className="px-3 py-1 bg-black/5 dark:bg-black/60 text-gray-900 dark:text-gray-100 text-xs font-bold rounded border border-gray-200 dark:border-white/10 uppercase">{activeChannel}</div>
            </div>
          </div>

          {/* Channel Selector */}
          <div className="h-24 shrink-0 glass-panel flex flex-col overflow-hidden relative group">
            <div className="flex-1 flex items-center gap-4 px-4 overflow-x-auto custom-scrollbar no-drag">
              {channels.map(c => (
                <button
                  key={c.id}
                  onClick={() => setActiveChannel(c.id)}
                  className={cn(
                    "h-[70%] min-w-[160px] rounded-xl flex flex-col justify-center px-4 border transition-all relative overflow-hidden shrink-0",
                    activeChannel === c.id ? "bg-white/10 border-accent-primary shadow-[0_0_15px_rgba(var(--accent-primary-rgb),0.3)]" : "bg-white dark:bg-white/5 border-transparent hover:bg-white/10"
                  )}
                >
                  <div className="font-bold text-gray-900 dark:text-gray-100 text-sm relative z-10">{c.label}</div>
                  <div className="text-xs text-gray-600 dark:text-gray-400 relative z-10 flex items-center gap-1"><Users size={10} /> {c.viewers}</div>
                  {activeChannel === c.id && <div className="absolute inset-0 bg-accent-primary/10"></div>}
                </button>
              ))}
            </div>
          </div>

          {/* Rankings */}
          <div className="glass-panel p-6 flex flex-col shrink-0">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-xl flex items-center gap-2">
                <Trophy size={20} className="text-accent-primary" /> Global Power Rankings
              </h3>
              <button onClick={() => setBrowserUrl('https://lolesports.com/fr-FR/gpr/2026/current')} className="text-xs font-bold text-gray-500 hover:text-accent-primary uppercase tracking-widest transition-colors">
                View All
              </button>
            </div>

            <div className="overflow-x-auto">
              {loadingRankings ? (
                <div className="flex flex-col items-center justify-center p-10 opacity-50">
                  <RefreshCw size={32} className="animate-spin text-accent-primary mb-4" />
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Loading Rankings...</span>
                </div>
              ) : rankings && rankings.length > 0 ? (
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead>
                    <tr className="border-b border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest">
                      <th className="py-3 px-4 w-16 text-center">Rank</th>
                      <th className="py-3 px-4">Team</th>
                      <th className="py-3 px-4 text-center">League</th>
                      <th className="py-3 px-4 text-center">W - L</th>
                      <th className="py-3 px-4 text-right">Points</th>
                    </tr>
                  </thead>
                  <tbody>
                    {rankings.map((team, idx) => (
                      <tr key={idx} className="border-b border-gray-200 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                        <td className="py-3 px-4 text-center font-black text-gray-900 dark:text-gray-100 text-lg">{team.rank}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img src={team.logo || getTeamLogo(team.name.toLowerCase().replace(/\\s+/g, '-'), team.name)} alt={team.name} className="w-8 h-8 object-contain drop-shadow-md rounded-lg" onError={(e) => { e.target.onerror = null; e.target.src = getTeamLogo('none', team.name); }} />
                            <div className="flex flex-col">
                              <span className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-accent-primary transition-colors">{team.name}</span>
                              {team.fullName && team.fullName !== team.name && <span className="text-[10px] text-gray-500 truncate max-w-[120px]">{team.fullName}</span>}
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {team.league ? <span className="text-[10px] font-bold px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-gray-600 dark:text-gray-300">{team.league}</span> : '-'}
                        </td>
                        <td className="py-3 px-4 text-center font-mono text-sm">
                          {team.wins !== undefined && team.losses !== undefined ? (
                            <>
                              <span className="text-green-600 dark:text-green-400 font-bold">{team.wins}</span>
                              <span className="mx-1 text-gray-400">-</span>
                              <span className="text-red-500 dark:text-red-400 font-bold">{team.losses}</span>
                            </>
                          ) : '-'}
                        </td>
                        <td className="py-3 px-4 text-right font-mono text-gray-600 dark:text-gray-400 font-medium">{team.points}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <div className="flex flex-col items-center justify-center p-10 opacity-30">
                  <Trophy size={48} className="mb-4 text-gray-500" />
                  <span className="text-sm font-bold uppercase tracking-widest text-gray-500">En attente des données Riot</span>
                  <span className="text-xs text-gray-500 mt-2">Le classement mondial n'est pas encore disponible</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar News & Schedule */}

        <div className="col-span-4 flex flex-col gap-4 h-full overflow-hidden">

          {/* Schedule */}
          <div className="glass-panel p-6 flex flex-col gap-4 max-h-[50%]">
            <div className="flex justify-between items-center bg-black/5 dark:bg-black/20 p-3 rounded-lg border border-gray-200 dark:border-white/5">
              <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg">{t('upcoming_matches')}</h3>
              <Globe size={16} className="text-gray-500" />
            </div>

            <div className="overflow-y-auto space-y-3 pr-2 custom-scrollbar flex-1 min-h-0">
              {loadingSchedule ? (
                <div className="flex flex-col items-center justify-center h-40 gap-3 opacity-50">
                  <RefreshCw size={24} className="animate-spin text-accent-primary" />
                  <span className="text-xs font-bold uppercase tracking-widest">{t('sync_data')}</span>
                </div>
              ) : upcomingMatches.length > 0 ? (
                upcomingMatches.map((m, idx) => (
                  <MatchScheduleItem
                    key={idx}
                    team1={m.team1 || 'TBD'} logo1={m.logo1 || getTeamLogo((m.team1 || 'TBD').toLowerCase().replace(/\s+/g, '-'), m.team1 || 'TBD')}
                    team2={m.team2 || 'TBD'} logo2={m.logo2 || getTeamLogo((m.team2 || 'TBD').toLowerCase().replace(/\s+/g, '-'), m.team2 || 'TBD')}
                    time={m.time} date={m.date} league={m.league}
                    highlight={idx === 0}
                    url={m.url}
                    onOpenUrl={setBrowserUrl}
                  />
                ))
              ) : (
                <div className="text-center py-10 opacity-40">
                  <Globe size={32} className="mx-auto mb-2" />
                  <p className="text-xs font-bold">{t('no_match_found')}</p>
                </div>
              )}
            </div>
          </div>

          {/* News */}
          <div className="flex-1 glass-panel p-6 flex flex-col min-h-0">
            <h3 className="font-bold text-gray-900 dark:text-gray-100 text-lg mb-4 flex items-center gap-2">
              <Activity size={18} className="text-accent-primary" /> {t('latest_news')}
            </h3>
            <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1">
              {loadingNews ? (
                <div className="flex flex-col items-center justify-center h-40 gap-3 opacity-30">
                  <RefreshCw size={20} className="animate-spin text-accent-primary" />
                </div>
              ) : news.length > 0 ? (
                news.map((item, idx) => (
                  <NewsItem
                    key={idx}
                    img={item.image || "https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Azir_0.jpg"}
                    title={item.title}
                    desc={item.summary}
                    time={item.date}
                    url={item.url}
                    onOpenUrl={setBrowserUrl}
                  />
                ))
              ) : (
                <div className="text-center py-10 opacity-40">
                  <p className="text-xs font-bold">{t('coming_soon')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BrowserOverlay({ url, onClose }) {
  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-black/5 dark:bg-black/95 backdrop-blur-2xl animate-in fade-in zoom-in-95 duration-200">
      {/* Header */}
      <div className="h-14 flex items-center justify-between px-6 border-b border-gray-200 dark:border-white/10 bg-white dark:bg-white/5">
        <div className="flex items-center gap-4">
          <Globe size={18} className="text-accent-primary" />
          <div className="text-sm font-mono text-gray-600 dark:text-gray-400 max-w-lg truncate select-text">{url}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => {
            const el = document.querySelector('webview');
            if (el) el.reload();
          }} className="p-2 hover:bg-white/10 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 transition-colors">
            <RefreshCw size={16} />
          </button>
          <button onClick={() => {
            const el = document.querySelector('webview');
            if (el && el.canGoBack()) el.goBack();
          }} className="p-2 hover:bg-white/10 rounded-lg text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 transition-colors">
            <ArrowRight className="rotate-180" size={16} />
          </button>
          <div className="h-6 w-px bg-white/10 mx-2"></div>
          <button onClick={onClose} className="p-2 hover:bg-red-500/20 hover:text-red-400 rounded-lg text-gray-600 dark:text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Webview */}
      <div className="flex-1 relative bg-white">
        <webview
          src={url}
          className="w-full h-full"
          allowpopups="true"
        ></webview>
      </div>
    </div>
  )
}

function MatchScheduleItem({ team1, team2, logo1, logo2, time, date, league, highlight, url, onOpenUrl }) {
  return (
    <div onClick={() => onOpenUrl(url)} className={cn("group flex flex-col p-3 rounded-xl border transition-all hover:bg-white dark:bg-white/5 relative overflow-hidden gap-2 cursor-pointer", highlight ? "bg-accent-primary/10 border-accent-primary/30" : "bg-black/5 dark:bg-black/20 border-gray-200 dark:border-white/5")}>
      {highlight && <div className="absolute left-0 top-0 bottom-0 w-1 bg-accent-primary"></div>}

      {/* Time & League Header */}
      <div className="flex justify-between items-center text-[10px] uppercase font-black text-white/30 border-b border-gray-200 dark:border-white/5 pb-2 mb-1 group-hover:text-accent-primary transition-colors">
        <div className="flex items-center gap-2">
          <span className="bg-white/5 px-1.5 py-0.5 rounded text-white/60">{league}</span>
          <ExternalLink size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <span className="font-mono">
          {date !== "Upcoming" && date !== "TBD" ? date : ""}
          {date !== "Upcoming" && date !== "TBD" && time && time !== "TBD" ? ` • ` : ""}
          {time !== "TBD" && time ? time : ""}
        </span>
      </div>

      {/* Matchup Layout */}
      <div className="grid grid-cols-7 items-center gap-1">
        {/* Team 1 */}
        <div className="col-span-3 flex items-center justify-start gap-2 overflow-hidden">
          <img src={logo1} className="w-7 h-7 object-contain shrink-0 drop-shadow-lg rounded-md" onError={(e) => { e.target.onerror = null; const v = team1 ? team1.substring(0,2).toUpperCase() : 'VS'; e.target.src = `https://ui-avatars.com/api/?name=${v}&background=141726&color=fff&size=64&bold=true&font-size=0.4`; }} />
          <span className="font-bold text-[13px] text-gray-900 dark:text-gray-100 truncate">{team1}</span>
        </div>

        {/* VS */}
        <div className="col-span-1 text-center text-[10px] font-black text-white/20 bg-black/5 dark:bg-black/20 rounded-lg py-1 border border-white/5">VS</div>

        {/* Team 2 */}
        <div className="col-span-3 flex items-center justify-end gap-2 overflow-hidden text-right">
          <span className="font-bold text-[13px] text-gray-900 dark:text-gray-100 truncate">{team2}</span>
          <img src={logo2} className="w-7 h-7 object-contain shrink-0 drop-shadow-lg rounded-md" onError={(e) => { e.target.onerror = null; const v = team2 ? team2.substring(0,2).toUpperCase() : 'VS'; e.target.src = `https://ui-avatars.com/api/?name=${v}&background=141726&color=fff&size=64&bold=true&font-size=0.4`; }} />
        </div>
      </div>
    </div>
  )
}

function NewsItem({ img, title, desc, time, url, onOpenUrl }) {
  return (
    <div onClick={() => onOpenUrl(url)} className="flex gap-4 p-3 hover:bg-white dark:bg-white/5 rounded-xl cursor-pointer transition-all group border border-transparent hover:border-gray-200 dark:border-white/5 relative">
      <div className="relative shrink-0 overflow-hidden rounded-lg w-20 h-14">
        <img src={img} className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors"></div>
      </div>
      <div className="flex flex-col justify-center min-w-0 gap-0.5 relative z-10 w-full">
        {time && <span className="text-[9px] font-bold text-accent-primary uppercase tracking-wider">{time}</span>}
        <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-tight group-hover:text-accent-primary transition-colors line-clamp-1 pr-6">{title}</h4>
        <p className="text-[10px] text-gray-500 line-clamp-1">{desc}</p>
      </div>
      <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
        <ExternalLink size={12} className="text-gray-400 group-hover:text-accent-primary" />
      </div>
    </div>
  );
}

function CollectionsView({ t, panelClass, ddragonVersion, currentUser, championList }) {
  const [activeSubTab, setActiveSubTab] = useState('skins');
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('date_new');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [skins, setSkins] = useState([]);
  const [wards, setWards] = useState([]);
  const [icons, setIcons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skinMetadata, setSkinMetadata] = useState({});
  const [wardMetadata, setWardMetadata] = useState({});

  // 1. Fetch Metadata (Skins & Wards) from CommunityDragon
  useEffect(() => {
    // Skins
    fetch("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/skins.json")
      .then(res => res.json())
      .then(data => setSkinMetadata(data))
      .catch(err => console.error("Failed to fetch skin metadata", err));

    // Wards
    fetch("https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/ward-skins.json")
      .then(res => res.json())
      .then(data => {
        // Data is array, convert to map for easier lookup? Or it's an object?
        // Usually array [ {id, name, wardImagePath...} ]
        if (Array.isArray(data)) {
          const map = {};
          data.forEach(w => map[w.id] = w);
          setWardMetadata(map);
        }
      })
      .catch(err => console.error("Failed to fetch ward metadata", err));
  }, []);

  const fetchCollections = useCallback(async () => {
    console.log("[Collections] Fetching for user:", currentUser);
    if (!currentUser?.summonerId) {
      console.warn("[Collections] No summonerId found in currentUser");
      return;
    }
    setLoading(true);
    try {
      const results = await Promise.allSettled([
        ipcRenderer.invoke('lcu:get-owned-skins', currentUser.summonerId),
        ipcRenderer.invoke('lcu:get-owned-wards', currentUser.summonerId)
        // Icons removed
      ]);

      const rawSkins = results[0].status === 'fulfilled' ? results[0].value : null;
      const rawWards = results[1].status === 'fulfilled' ? results[1].value : null;

      if (results[0].status === 'rejected') console.error("Skins fetch failed", results[0].reason);
      if (results[1].status === 'rejected') console.error("Wards fetch failed", results[1].reason);

      // Process Skins
      if (rawSkins && Array.isArray(rawSkins)) { // Ensure it is array
        const RARITY_COSTS = {
          'common': 750,
          'rare': 975,
          'epic': 1350,
          'legendary': 1820,
          'mythic': 1900,
          'ultimate': 3250
        };

        const processedSkins = rawSkins
          .filter(s => s.ownership && s.ownership.owned && !s.isBase)
          .map(s => {
            const championId = Math.floor(s.id / 1000);
            const skinIndex = s.id % 1000;
            const champ = (championList || []).find(c => parseInt(c.key) === championId);
            const champKey = champ ? champ.id : null; // "MonkeyKing"
            const champName = champ ? champ.name : "Unknown";

            // Metadata Lookup
            const meta = skinMetadata[String(s.id)] || skinMetadata[s.id] || {};
            let rarity = meta.rarity ? meta.rarity.replace('k', '').toLowerCase() : 'common';
            if (rarity === 'norarity') rarity = 'common';

            // Cost calculation
            let costVal = 0;
            if (typeof meta.cost === 'number') costVal = meta.cost;
            else if (meta.cost && meta.cost !== 'null') costVal = parseInt(meta.cost) || 0;

            if (costVal === 0 && RARITY_COSTS[rarity] !== undefined) {
              costVal = RARITY_COSTS[rarity];
            }

            // Images
            // Default Fallback: DDragon (can be outdated for reworks)
            let splashUrl = champKey
              ? `https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${champKey}_${skinIndex}.jpg`
              : `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-splashes/${championId}/${s.id}.jpg`;

            let fullUrl = champKey
              ? `https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${champKey}_${skinIndex}.jpg`
              : splashUrl;

            // Priority: Community Dragon Metadata (Correct for Reworks)
            if (meta.loadScreenPath) {
              splashUrl = meta.loadScreenPath.toLowerCase().replace(
                '/lol-game-data/assets',
                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default'
              );
            }
            if (meta.splashPath) {
              fullUrl = meta.splashPath.toLowerCase().replace(
                '/lol-game-data/assets',
                'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default'
              );
            }

            return {
              id: s.id,
              name: s.name,
              championId,
              champion: champName,
              rarity: rarity,
              cost: costVal,
              splash: splashUrl,
              full: fullUrl
            };
          });

        setSkins(processedSkins);
      } else {
        // Fallback or empty?
        if (rawSkins) console.warn("Raw skins data is not an array:", rawSkins);
      }

      // Process Wards
      if (rawWards && Array.isArray(rawWards)) {
        const ownedWards = rawWards.filter(w => w.ownership && w.ownership.owned);
        setWards(ownedWards.map(w => {
          const wardId = w.wardId || w.itemId || w.id;

          let imageUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/wardskinimages/wardskin_${wardId}.png`;

          // Try to use metadata path
          const meta = wardMetadata[wardId] || wardMetadata[String(wardId)];
          if (meta && meta.wardImagePath) {
            // Replace prefix keeping case of the rest of the path
            imageUrl = meta.wardImagePath.replace(
              /^\/lol-game-data\/assets/i,
              'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default'
            );
          }

          return {
            id: wardId,
            name: w.name,
            type: 'ward',
            image: imageUrl
          };
        }));
      }


    } catch (err) {
      console.error("Failed to fetch collections", err);
    } finally {
      setLoading(false);
    }
  }, [currentUser, championList, skinMetadata, sortBy]);

  useEffect(() => {
    // Retry fetch if metadata loads late, but also fetch immediately
    fetchCollections();
  }, [fetchCollections, activeSubTab]); // activeSubTab might trigger re-fetch but actually we fetch all at once. Maybe removed activeSubTab dependency or kept it if we want rigorous sync.

  const filteredItems = useMemo(() => {
    let items = [];
    if (activeSubTab === 'skins') items = [...skins];
    else if (activeSubTab === 'wards') {
      // Re-calculate ward images here to ensure metadata is applied even if it loaded late
      items = wards.map(w => {
        const wardId = w.wardId || w.itemId || w.id;
        let imageUrl = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/wardskinimages/wardhero_${wardId}.png`;

        const meta = wardMetadata[wardId] || wardMetadata[String(wardId)];
        if (meta && meta.wardImagePath) {
          imageUrl = meta.wardImagePath.toLowerCase().replace(
            '/lol-game-data/assets',
            'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default'
          );
        }
        return { ...w, image: imageUrl };
      });
    }
    else if (activeSubTab === 'icons') items = [...icons];

    if (search) {
      items = items.filter(i =>
        i.name.toLowerCase().includes(search.toLowerCase()) ||
        (i.champion && i.champion.toLowerCase().includes(search.toLowerCase()))
      );
    }

    if (sortBy === 'alpha_az') {
      items.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === 'alpha_za') {
      items.sort((a, b) => b.name.localeCompare(a.name));
    }

    return items;
  }, [activeSubTab, search, sortBy, skins, wards, icons, wardMetadata]);

  // Calculate Total RP Value
  const totalSkinValue = useMemo(() => {
    return skins.reduce((acc, s) => acc + (s.cost || 0), 0);
  }, [skins]);

  const totalSkinsCount = useMemo(() => {
    if (!skinMetadata) return 1870; // Fallback to a realistic number
    return Object.values(skinMetadata).filter(s =>
      !s.isBase &&
      s.name &&
      !s.name.includes('Chroma') &&
      !s.name.includes('Prestige Point')
    ).length;
  }, [skinMetadata]);

  const rarityColors = {
    ultimate: "from-orange-500 to-yellow-500",
    mythic: "from-purple-600 to-pink-600",
    legendary: "from-red-500 to-purple-500",
    epic: "from-blue-500 to-cyan-500",
    rare: "from-green-500 to-emerald-500",
    common: "from-gray-500 to-slate-500"
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-1">
        <h2 className="text-4xl font-black text-gray-900 dark:text-gray-100 flex items-center gap-3 tracking-tighter uppercase">
          <LayoutGrid className="text-blue-500" size={32} /> {t('collections_title')}
        </h2>
        <div className="flex items-center gap-4 ml-11">
          <p className="text-gray-900 dark:text-gray-100/30 text-xs font-bold uppercase tracking-widest">{t('inventory_subtitle')}</p>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center bg-white dark:bg-white/5 p-1 rounded-2xl border border-gray-200 dark:border-white/10 backdrop-blur-xl shrink-0">
          <button onClick={() => setActiveSubTab('skins')} className={cn("px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeSubTab === 'skins' ? "bg-blue-600 text-gray-900 dark:text-gray-100 shadow-lg shadow-blue-500/20" : "text-gray-900 dark:text-gray-100/40 hover:text-gray-900 dark:text-gray-100")}>{t('skins')} ({skins.length})</button>
          <button onClick={() => setActiveSubTab('wards')} className={cn("px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", activeSubTab === 'wards' ? "bg-blue-600 text-gray-900 dark:text-gray-100 shadow-lg shadow-blue-500/20" : "text-gray-900 dark:text-gray-100/40 hover:text-gray-900 dark:text-gray-100")}>{t('wards')} ({wards.length})</button>
        </div>

        {/* STATS CENTER */}
        <div className="flex-1 flex items-center justify-center gap-12">
          {activeSubTab === 'skins' && (
            <>
              <div className="flex flex-col items-center">
                <div className="flex items-center gap-2">
                  <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/icon-rp-72.png" className="w-6 h-6 drop-shadow-md" />
                  <span className="text-4xl font-black text-gray-900 dark:text-gray-100 tracking-tighter drop-shadow-xl">{totalSkinValue.toLocaleString()}</span>
                </div>
                <span className="text-[10px] text-gray-900 dark:text-gray-100/30 font-bold uppercase tracking-widest">Valeur des Skins</span>
              </div>

              <div className="w-px h-10 bg-white/10"></div>

              <div className="flex flex-col items-center">
                <div className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tighter drop-shadow-xl">
                  <span className="text-blue-400">{skins.length}</span>
                  <span className="text-gray-900 dark:text-gray-100/20 mx-1">/</span>
                  <span className="text-gray-900 dark:text-gray-100/50 text-2xl">{totalSkinsCount}</span>
                </div>
                <span className="text-[10px] text-gray-900 dark:text-gray-100/30 font-bold uppercase tracking-widest">Skins Unlocked</span>
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => { setSkins([]); setWards([]); fetchCollections(); }}
            className="w-8 h-8 flex items-center justify-center rounded-xl bg-white dark:bg-white/5 hover:bg-white/10 text-gray-900 dark:text-gray-100/40 hover:text-gray-900 dark:text-gray-100 transition-all border border-gray-200 dark:border-white/10"
            title={t('refresh')}
          >
            <RefreshCw size={14} className={cn(loading && "animate-spin")} />
          </button>

          <div className="relative group">
            <Search size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-900 dark:text-gray-100/20 group-focus-within:text-blue-500 transition-colors" />
            <input
              type="text"
              placeholder={t('search_generic')}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs font-bold text-gray-900 dark:text-gray-100 outline-none focus:border-blue-500/50 focus:bg-white/10 transition-all w-64 placeholder:text-gray-900 dark:text-gray-100/10"
            />
          </div>
          <div className="relative group bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl flex items-center px-4 py-2.5 hover:bg-white/10 transition-all min-w-[200px]">
            <span className="text-[10px] pr-2 font-black uppercase tracking-widest text-gray-900 dark:text-gray-100/40">{t('sort_by')}</span>
            <CustomSelect
              value={sortBy}
              onChange={setSortBy}
              options={[
                { value: 'alpha_az', label: 'A-Z' },
                { value: 'alpha_za', label: 'Z-A' }
              ]}
              className="flex-1 right-0 text-right justify-end"
              buttonClassName="w-full text-right justify-end gap-1 border-none hover:text-gray-900 p-0 !text-gray-900 dark:!text-gray-100"
            />
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar no-drag">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <RefreshCw className="w-12 h-12 text-blue-500 animate-spin mb-4" />
            <div className="text-sm font-black uppercase tracking-[0.3em] text-gray-900 dark:text-gray-100/40">{t('sync_inventory')}</div>
          </div>
        ) : (
          <div className="p-2">
            {activeSubTab === 'wards' ? (
              // --- WARDS VIEW (Simple Grid) ---
              <div className="flex flex-wrap gap-4">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedAsset(item)}
                    className={cn(
                      "group relative overflow-hidden transition-all cursor-pointer shadow-2xl duration-500 bg-white border border-gray-200 dark:border-white/10 dark:bg-[#0A0A0E] border box-border",
                      "w-32 h-32 rounded-lg border-[#785A28] hover:border-[#F0E6D2] hover:scale-105"
                    )}
                    title={item.name}
                  >
                    <img
                      src={item.image}
                      className="w-full h-full object-contain p-4 transition-transform duration-1000 group-hover:scale-110"
                      onError={(e) => {
                        // Fallback mechanism:
                        // 1. Primary: item.image (Meta path OR wardhero path)
                        // 2. Secondary: wardhero path manual (in case item.image was wrong)
                        // 3. Final: Generic icon
                        if (!e.target.dataset.triedFallback) {
                          e.target.dataset.triedFallback = "true";
                          e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/content/src/leagueclient/wardskinimages/wardhero_${item.id}.png`;
                        } else {
                          e.target.src = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png';
                        }
                      }}
                    />
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-[#C8AA6E] to-transparent opacity-50"></div>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-gradient-to-tr from-white/10 via-white/5 to-white/20 pointer-events-none" />
                  </div>
                ))}
              </div>
            ) : (
              // --- SKINS VIEW (Standard Grid) ---
              // Restored to simple grid without double nesting
              <div className="grid grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredItems.map(item => (
                  <div
                    key={item.id}
                    onClick={() => setSelectedAsset(item)}
                    className={cn(
                      "group relative overflow-hidden transition-all cursor-pointer shadow-lg hover:shadow-2xl duration-500",
                      "w-48 h-[280px] rounded-2xl border border-gray-200 dark:border-white/10 hover:border-gray-200 dark:border-white/30 bg-white border border-gray-200 dark:border-white/10 dark:bg-[#0A0A0E]"
                    )}
                  >
                    {/* Splash Image */}
                    <div className="absolute inset-0 z-0">
                      <img
                        src={item.splash}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                        onError={(e) => { e.target.src = 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png'; }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                    </div>

                    {/* Content */}
                    <div className="absolute inset-x-0 bottom-0 p-4 z-10 flex flex-col gap-1">
                      <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100 leading-tight drop-shadow-md line-clamp-2 uppercase tracking-tight group-hover:text-blue-200 transition-colors">{item.name}</h3>

                      <div className="flex items-center justify-between mt-2">
                        <div className={cn("text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded backdrop-blur-md border border-gray-200 dark:border-white/10 bg-black/5 dark:bg-black/40",
                          item.rarity === 'ultimate' ? 'text-orange-400 border-orange-500/30' :
                            item.rarity === 'mythic' ? 'text-purple-400 border-purple-500/30' :
                              item.rarity === 'legendary' ? 'text-red-400 border-red-500/30' :
                                item.rarity === 'epic' ? 'text-cyan-400 border-cyan-500/30' : 'text-gray-600 dark:text-gray-400'
                        )}>
                          {item.rarity}
                        </div>

                        {item.cost > 0 && (
                          <div className="flex items-center gap-1 bg-black/5 dark:bg-black/60 px-2 py-0.5 rounded-full border border-gray-200 dark:border-white/10 backdrop-blur-md">
                            <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/icon-rp-72.png" className="w-3 h-3" />
                            <span className="text-[10px] font-bold text-gray-200">{item.cost}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {
          !loading && filteredItems.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-gray-900 dark:text-gray-100/20 gap-4">
              <Activity size={48} className="opacity-10 animate-pulse" />
              <div className="text-sm font-black uppercase tracking-[0.3em] text-center">
                Aucune collection trouvée <br />
                <span className="text-[10px] opacity-50 normal-case tracking-normal">Vérifiez que le client League est ouvert et connecté.</span>
              </div>
              <button
                onClick={() => { setLoading(true); setSkins([]); setWards([]); fetchCollections(); }}
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-gray-900 dark:text-gray-100 rounded-lg text-xs font-bold uppercase tracking-widest transition-all"
              >
                Réessayer
              </button>
            </div>
          )
        }
      </div>

      {/* ASSET PREVIEW MODAL */}
      {
        selectedAsset && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-12 animate-in fade-in duration-300">
            <div
              className="absolute inset-0 bg-black/5 dark:bg-black/90 backdrop-blur-3xl"
              onClick={() => setSelectedAsset(null)}
            />
            <div className={cn(
              "relative w-full rounded-[40px] overflow-hidden border border-gray-200 dark:border-white/10 shadow-[0_0_100px_rgba(30,58,138,0.5)] group",
              selectedAsset.type === 'ward' ? "max-w-xl aspect-square bg-black/5 dark:bg-black/50" : "max-w-6xl aspect-video"
            )}>
              <img
                src={selectedAsset.full || selectedAsset.image}
                className={cn(
                  "w-full h-full animate-in zoom-in-95 duration-700",
                  selectedAsset.type === 'ward' ? "object-contain p-12" : "object-contain"
                )}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

              <div className="absolute bottom-0 inset-x-0 p-12 flex items-end justify-between pointer-events-none">
                <div>
                  <h3 className="text-5xl font-black text-gray-900 dark:text-gray-100 tracking-tighter mb-2 drop-shadow-2xl">{selectedAsset.name}</h3>
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-900 dark:text-gray-100/60 uppercase tracking-widest">{selectedAsset.champion || t('unknown')}</span>
                    {selectedAsset.cost > 0 && (
                      <div className="flex items-center gap-2 bg-black/5 dark:bg-black/60 px-3 py-1 rounded-full border border-gray-200 dark:border-white/10 backdrop-blur-md">
                        <img src="https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/icon-rp-72.png" className="w-4 h-4" />
                        <span className="text-sm font-bold text-gray-900 dark:text-gray-100">{selectedAsset.cost}</span>
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedAsset(null)}
                  className="pointer-events-auto bg-white/10 hover:bg-white text-gray-900 dark:text-gray-100 hover:text-black w-14 h-14 rounded-full flex items-center justify-center transition-all active:scale-95 border border-gray-200 dark:border-white/20 backdrop-blur-md"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
}

function RankingsView({ panelClass, t, setTargetSummoner, setActiveTab, ddragonVersion }) {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-12 animate-in fade-in zoom-in duration-500">
      <div className="w-24 h-24 bg-white dark:bg-white/5 rounded-full flex items-center justify-center mb-6 border border-gray-200 dark:border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)]">
        <Trophy size={48} className="text-gray-500 animate-pulse" />
      </div>
      <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 uppercase italic tracking-tighter mb-2 opacity-80">WIP</h2>
      <p className="text-gray-500 font-bold uppercase tracking-widest text-xs max-w-md leading-relaxed opacity-60">{t('rankings_wip')}</p>
      <div className="mt-8 px-4 py-2 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/5 text-[10px] font-mono text-gray-600">
        {t('maintenance')}
      </div>
    </div>
  )
}


function OverlayToggleItem({ icon, label, desc, active, onToggle, color }) {
  const colors = {
    blue: "bg-blue-500/10 text-blue-500",
    orange: "bg-orange-500/10 text-orange-500",
    yellow: "bg-yellow-500/10 text-yellow-500",
    purple: "bg-purple-500/10 text-purple-500",
    green: "bg-green-500/10 text-green-500",
    red: "bg-red-500/10 text-red-500",
    indigo: "bg-indigo-500/10 text-indigo-500",
  };

  return (
    <div className="flex items-center justify-between group">
      <div className="flex items-center gap-4">
        <div className={cn("p-3 rounded-2xl transition-all duration-300", colors[color] || "bg-gray-500/10")}>
          {icon}
        </div>
        <div>
          <div className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-accent-primary transition-colors">{label}</div>
          <div className="text-[10px] text-gray-500 font-medium leading-tight max-w-[150px]">{desc}</div>
        </div>
      </div>
      <div
        onClick={onToggle}
        className={cn("w-11 h-6 rounded-full relative cursor-pointer transition-all duration-300", active ? "bg-accent-primary shadow-[0_0_10px_rgba(6,182,212,0.4)]" : "bg-gray-200 dark:bg-gray-800")}
      >
        <div className={cn("absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-300", active ? "right-1" : "left-1")}></div>
      </div>
    </div>
  )
}

function LiveOverlay({ t, visualMode, theme, overlaySettings: initialSettings }) {
  const [overlaySettings, setOverlaySettings] = useState(initialSettings);
  const [showWinrate, setShowWinrate] = useState(false);
  const [gameData, setGameData] = useState(null);
  const [notifications, setNotifications] = useState([]);
  const [skillOrder, setSkillOrder] = useState(null);
  const triggeredIds = useRef(new Set());
  const lastGoldRef = useRef(0);
  const lastChampRef = useRef(null);
  const settingsRef = useRef(overlaySettings);

  // Keep settings in sync with main window
  useEffect(() => {
    const handleSync = (_, newSettings) => {
      setOverlaySettings(newSettings);
      settingsRef.current = newSettings;
    };
    ipcRenderer.on('settings:sync', handleSync);
    return () => ipcRenderer.removeListener('settings:sync', handleSync);
  }, []);

  useEffect(() => {
    settingsRef.current = overlaySettings;
    if (overlaySettings.testMode) {
      triggeredIds.current.clear();
    }
  }, [overlaySettings]);

  // Fetch skill order when champion is detected
  useEffect(() => {
    const active = gameData?.activePlayer;
    const players = gameData?.allPlayers || [];
    const current = players.find(p => p.summonerName === active?.summonerName);
    const champ = current?.championName;

    if (champ && champ !== lastChampRef.current) {
      lastChampRef.current = champ;
      const role = current?.position === 'UTILITY' ? 'support' : current?.position;
      ipcRenderer.invoke('scraper:get-champion-build', champ, role).then(res => {
        if (res?.skillOrder) setSkillOrder(res.skillOrder);
      }).catch(e => console.error("Build fetch failed", e));
    }
  }, [gameData]);

  const defaults = {
    winrate: { x: 40, y: 5 },
    jungle: { x: 2, y: 40 },
    skills: { x: 40, y: 85 },
    gold: { x: 75, y: 10 },
    notifications: { x: 80, y: 70 }
  };

  const pos = {
    ...defaults,
    ...Object.fromEntries(Object.entries(overlaySettings?.positions || {}).filter(([_, v]) => v != null))
  };

  const isTest = overlaySettings?.testMode;

  useEffect(() => {
    const handleToggle = () => setShowWinrate(p => !p);
    ipcRenderer.on('shortcut:toggle-winrate', handleToggle);
    return () => ipcRenderer.removeListener('shortcut:toggle-winrate', handleToggle);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await ipcRenderer.invoke('live:get-all-data');
        if (data) {
          const currentSettings = settingsRef.current;

          // Reset notifications if it's a new game session
          if (data.gameData?.gameId && data.gameData.gameId !== gameData?.gameData?.gameId) {
            triggeredIds.current.clear();
            setNotifications([]);
            lastGoldRef.current = 0;
            setSkillOrder(null);
          }

          if (currentSettings.goldSound && data.activePlayer?.currentGold !== undefined) {
            const currentGold = data.activePlayer.currentGold;
            if (currentGold >= 1200 && lastGoldRef.current < 1200) {
              try {
                const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2019/2019-preview.mp3');
                audio.volume = 0.2;
                audio.play().catch(e => console.error("Audio play failed:", e));
              } catch (e) {
                console.error("Audio init failed", e);
              }
            }
            lastGoldRef.current = currentGold;
          }

          if (isTest) console.log("Live Data:", data);
          setGameData(data);
        }
      } catch (e) { }
    };
    const interval = setInterval(fetchData, 2000);
    return () => clearInterval(interval);
  }, [gameData?.gameData?.gameId]); // Refresh effect if gameId changes to avoid weird state

  // Update Notifications based on game data
  useEffect(() => {
    if (!gameData && !isTest) return;

    const triggerNotif = (notif) => {
      // If we already have this notification ID, check if the data changed (e.g. better skill recommendation)
      const existing = notifications.find(n => n.id === notif.id);
      if (existing) {
        if (notif.key && existing.key !== notif.key) {
          // Update it
          setNotifications(prev => prev.map(n => n.id === notif.id ? notif : n));
        }
        return;
      }

      if (triggeredIds.current.has(notif.id)) return;
      triggeredIds.current.add(notif.id);

      setNotifications(prev => [...prev, notif]);
      setTimeout(() => {
        setNotifications(prev => prev.filter(n => n.id !== notif.id));
      }, 5000);
    };

    if (isTest) {
      triggerNotif({ id: 'skill-test', type: 'info', icon: <Brain size={14} />, title: 'Skill Suggestion', desc: 'Upgrade Q next for maximum burst.' });
      triggerNotif({ id: 'gold-test', type: 'warning', icon: <SwordsIcon size={14} />, title: 'Gold Deficit', desc: 'Enemy mid is +1200g ahead.' });
      triggerNotif({ id: 'ward-test', type: 'success', icon: <ScanEye size={14} />, title: 'Ward Reminder', desc: 'Place a ward in river.' });
    } else if (gameData) {
      const active = gameData.activePlayer;
      const players = gameData.allPlayers || [];
      const current = players.find(p => p.summonerName === active?.summonerName);

      // 1. Skill Level Up Check
      if (overlaySettings.skillLevelUp && active?.abilities) {
        const totalPointsSpent = Object.values(active.abilities).reduce((sum, a) => sum + (a.abilityLevel || 0), 0);
        const level = current?.level || active.level || 1; // Retrieve the target level from allPlayers
        const pointsAvailable = level - totalPointsSpent;

        if (pointsAvailable > 0) {
          // Logic for "Optimal" skill
          let bestKey = 'Q';
          const currentPointNumber = totalPointsSpent + 1;

          // Use skillOrder if available, or heuristic
          if (skillOrder && skillOrder[currentPointNumber - 1]) {
            bestKey = skillOrder[currentPointNumber - 1];
          } else {
            // Heuristic
            if ([6, 11, 16].includes(level)) bestKey = 'R';
            else {
              const { Q, W, E } = active.abilities;
              const levels = { Q: Q.abilityLevel || 0, W: W.abilityLevel || 0, E: E.abilityLevel || 0 };
              bestKey = Object.keys(levels).reduce((a, b) => levels[a] >= levels[b] ? a : b);
            }
          }

          const ability = active.abilities[bestKey];
          const spellId = ability?.id;
          const spellName = ability?.displayName || bestKey;
          const iconUrl = spellId ? `https://ddragon.leagueoflegends.com/cdn/13.24.1/img/spell/${spellId}.png` : null;

          triggerNotif({
            id: `skill-point-${currentPointNumber}`, // Stable ID based strictly on point spent to avoid dupes across levels
            type: 'info',
            key: bestKey, // Keep track of which key was suggested
            icon: iconUrl ? (
              <div className="relative w-10 h-10 overflow-hidden rounded-lg border border-gray-200 dark:border-white/20">
                <img src={iconUrl} className="w-full h-full object-cover scale-110" />
                <div className="absolute bottom-0 right-0 bg-black/5 dark:bg-black/80 text-[8px] font-black px-1 rounded-tl-md border-t border-l border-gray-200 dark:border-white/20 text-blue-400">
                  {bestKey}
                </div>
              </div>
            ) : <Brain size={14} />,
            title: `${t('level')} ${level} • ${skillOrder ? 'LIVE DATA' : 'AI SUGGEST'}`,
            desc: `${t('skill_advice')} ${spellName}`
          });
        }
      }

      // 2. Gold Difference Check
      if (overlaySettings.goldDiff && current) {
        const enemy = players.find(p => p.team !== current.team && p.position === current.position);
        if (enemy) {
          const calculateNetWorth = (player) => (player.items || []).reduce((sum, item) => sum + (item.price || 0), 0);
          const myNetWorth = calculateNetWorth(current);
          const enemyNetWorth = calculateNetWorth(enemy);
          const diff = myNetWorth - enemyNetWorth;

          if (diff < -1500) {
            triggerNotif({ id: 'gold-deficit-high', type: 'warning', icon: <SwordsIcon size={14} />, title: t('gold_alert'), desc: `${t('gold_deficit_massive')} ${Math.abs(diff)}g.` });
          } else if (diff > 1500) {
            triggerNotif({ id: 'gold-advantage-high', type: 'success', icon: <SwordsIcon size={14} />, title: t('gold_alert'), desc: `${t('gold_advantage_massive')} +${diff}g !` });
          }
        }
      }

      // 3. Ward Reminder
      if (overlaySettings.wardTimer && gameData.gameData.gameTime > 180) {
        const trinket = current?.items?.find(i => i.slot === 6);
        if (trinket && trinket.canUse) {
          triggerNotif({ id: 'ward-initial', type: 'info', icon: <ScanEye size={14} />, title: t('vision'), desc: t('ward_advice') });
        }
      }
    }
  }, [gameData, isTest, overlaySettings, skillOrder]);

  const activePlayer = gameData?.activePlayer;
  const playerList = gameData?.allPlayers || [];
  const currentPlayer = playerList.find(p => p.summonerName === activePlayer?.summonerName);
  const isJungle = currentPlayer?.position === 'JUNGLE' || isTest;

  /* Add visibility debugging if needed */
  if (isTest && !gameData) {
    /* Ensure we still render in test mode even without LCU data */
  }

  return (
    <div
      className="fixed inset-0 pointer-events-none select-none z-[9999]"
      style={{ display: 'block' }} /* Ensure it's not hidden by some weird CSS state */
    >
      {/* Win% Widget (ALT+O) - REMOVED AS PER USER REQUEST */}


      {/* Jungle Clear Helper / Pathing */}
      {(isJungle && (overlaySettings.junglePathing || overlaySettings.jungleTimers)) && (
        <div
          style={{ left: `${pos?.jungle?.x ?? 2}%`, top: `${pos?.jungle?.y ?? 40}%` }}
          className="absolute bg-black/5 dark:bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-gray-200 dark:border-white/5 animate-in slide-in-from-left-4"
        >
          <div className="text-[9px] font-black text-accent-primary uppercase mb-2">{t('jungle_insight')}</div>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gray-200 dark:bg-gray-800 border border-gray-200 dark:border-white/10 flex items-center justify-center">
              <Activity size={20} className="text-accent-primary" />
            </div>
            <div>
              <div className="text-sm font-bold text-gray-900 dark:text-gray-100">{t('logic_pathing')}</div>
              <div className="text-xs text-green-400 font-mono">
                {isTest ? 'Gromp: 0:12' : `${t('next_camp')} ${gameData?.gameData?.gameTime < 90 ? 'Blue/Red' : 'Scuttle'}`}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notification Style for other info */}
      <div
        style={{ left: `${pos?.notifications?.x ?? 80}%`, top: `${pos?.notifications?.y ?? 70}%` }}
        className="absolute flex flex-col gap-2 w-[280px] pointer-events-auto"
        onMouseEnter={() => ipcRenderer.invoke('window:set-ignore-mouse-events', false)}
        onMouseLeave={() => ipcRenderer.invoke('window:set-ignore-mouse-events', true)}
      >
        {notifications.map(n => (
          <div
            key={n.id}
            onClick={() => setNotifications(prev => prev.filter(item => item.id !== n.id))}
            className="bg-black/5 dark:bg-black/80 backdrop-blur-xl border border-gray-200 dark:border-white/10 p-3 rounded-2xl flex items-start gap-3 animate-in slide-in-from-right-4 hover:bg-white dark:bg-white/5 cursor-pointer transition-all active:scale-95 group shadow-2xl"
          >
            <div className={cn("p-2 rounded-xl",
              n.type === 'info' ? "bg-blue-500/10 text-blue-400" :
                n.type === 'warning' ? "bg-orange-500/10 text-orange-400" :
                  "bg-green-500/10 text-green-400"
            )}>
              {n.icon}
            </div>
            <div className="flex-1">
              <div className="text-[10px] font-black text-gray-900 dark:text-gray-100/50 uppercase tracking-widest flex items-center justify-between">
                {n.title}
                <X size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="text-xs font-bold text-gray-900 dark:text-gray-100 mb-2">{n.desc}</div>
              {/* Progress Bar */}
              <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                <div
                  className={cn("h-full opacity-50 animate-progress-notif",
                    n.type === 'info' ? "bg-blue-400" :
                      n.type === 'warning' ? "bg-orange-400" :
                        "bg-green-400"
                  )}
                  style={{ animation: 'progressNotif 5s linear forwards' }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes progressNotif {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  )
}

function LoadingOverlay({ t, visualMode, theme }) {
  // Loading Screen Stats
  return (
    <div className="fixed inset-0 bg-black/5 dark:bg-black/95 z-[9999] p-12 flex flex-col items-center justify-center gap-12 animate-in fade-in">
      <div className="text-center">
        <h1 className="text-5xl font-black text-gray-900 dark:text-gray-100 tracking-widest italic mb-2">ORACLE <span className="text-accent-primary">VISION</span></h1>
        <div className="text-gray-500 font-bold uppercase tracking-[0.2em] text-sm">Chargement de la Faille...</div>
      </div>

      <div className="w-full max-w-7xl grid grid-cols-2 gap-24">
        <div className="space-y-4">
          <div className="h-px bg-gradient-to-r from-blue-500 to-transparent opacity-50"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 bg-blue-500/5 p-3 rounded-xl border border-blue-500/10">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded border border-gray-200 dark:border-white/10"></div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 dark:text-gray-100">Joueur Bleu {i + 1}</div>
                <div className="text-[10px] text-blue-400 font-bold uppercase tracking-widest">Platine II • 58% WR</div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="h-px bg-gradient-to-l from-red-500 to-transparent opacity-50 text-right"></div>
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex items-center gap-4 bg-red-500/5 p-3 rounded-xl border border-red-500/10 flex-row-reverse text-right">
              <div className="w-12 h-12 bg-gray-200 dark:bg-gray-800 rounded border border-gray-200 dark:border-white/10"></div>
              <div className="flex-1">
                <div className="font-bold text-gray-900 dark:text-gray-100">Joueur Rouge {i + 1}</div>
                <div className="text-[10px] text-red-400 font-bold uppercase tracking-widest">Emeraude IV • 42% WR</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-gray-600 dark:text-gray-400 font-medium text-sm animate-pulse italic">Appuyez sur [CTRL+X] en jeu pour activer l'analyse prédictive</div>
    </div>
  )
}



function NotificationsView({ panelClass, setActiveTab, patchNotes, prefetchedData, onShowNews, onClose }) {
  const latestPatch = patchNotes?.[0];
  const newsList = prefetchedData?.esportsNews || [];

  return (
    <div className={cn("flex flex-col min-h-0 animate-page-enter relative", panelClass)}>
      {onClose && (
        <button onClick={onClose} className="absolute top-2 right-2 p-2 text-gray-400 hover:text-white transition-colors lg:hidden">
          <X size={18} />
        </button>
      )}

      <h2 className="text-xl font-black mb-6 flex items-center gap-3 text-white">
        <Bell className="text-accent-primary" size={20} />
        Notifications
      </h2>

      <div className="flex-1 flex flex-col gap-3 overflow-y-auto custom-scrollbar pr-2 pb-4">


        {latestPatch && (
          <div className="p-3 bg-[#1a1a20] border border-white/5 rounded-2xl flex items-center gap-4 shadow-sm group hover:bg-white/5 transition cursor-pointer shrink-0" onClick={() => onShowNews(latestPatch)}>
            <div className="w-10 h-10 bg-accent-primary/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-accent-primary/20 transition-colors">
              <Activity size={16} className="text-accent-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-white flex items-center gap-2 truncate">
                Patch {latestPatch.version || latestPatch.title.match(/\d+\.\d+/)?.[0] || ""}
                <span className="bg-accent-primary/20 text-accent-primary text-[8px] px-1.5 py-0.5 rounded font-black">MAJ</span>
              </div>
              <div className="text-[11px] text-gray-400 truncate mt-0.5">{latestPatch.summary || "Découvrez les derniers changements."}</div>
            </div>
            {latestPatch.image && (
              <div className="shrink-0 w-16 h-10 rounded-lg overflow-hidden border border-white/5">
                <img src={latestPatch.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            )}
          </div>
        )}

        {newsList.length > 0 ? newsList.map((news, idx) => (
          <div key={idx} className="p-3 bg-[#1a1a20] border border-white/5 rounded-2xl flex items-center gap-4 shadow-sm group hover:bg-white/5 transition cursor-pointer shrink-0" onClick={() => onShowNews(news)}>
            <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-yellow-500/20 transition-colors">
              <Trophy size={16} className="text-yellow-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-white truncate">{news.title}</div>
              <div className="text-[11px] text-gray-400 truncate mt-0.5">{news.summary || news.description || "Actualité tournois officiels."}</div>
            </div>
            {news.image && (
              <div className="shrink-0 w-16 h-10 rounded-lg overflow-hidden border border-white/5">
                <img src={news.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            )}
          </div>
        )) : (
          <div className="p-8 text-center text-gray-500 italic text-xs">Aucune actualité récente.</div>
        )}
      </div>

      <div className="pt-4 mt-auto border-t border-white/5">
        <button onClick={() => setActiveTab('esports')} className="w-full py-2.5 text-xs text-gray-400 hover:text-white font-bold transition-colors">
          Voir tout l'actualité
        </button>
      </div>
    </div>
  )
}

export default App;

