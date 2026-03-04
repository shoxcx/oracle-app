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
  Flag,
  ChevronDown,
  Minus,
  Square,
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

import logo from './assets/logo.png';
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
    winrate_toggle: "Win% Overlay (ALT+O)", winrate_desc: "Estimated win percentage",
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
    winrate_toggle: "Prédiction de Victoire (ALT+O)", winrate_desc: "Pourcentage de chance de victoire en temps réel",
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
    ipcRenderer.invoke('app:register-shortcut');
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

  return (
    <div className="relative w-full h-full overflow-hidden bg-transparent">
      {content}
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
          <img src={oracleLogo} className="w-48 h-48 grayscale" alt="" />
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
          <div className="w-32 h-32 mb-8 relative filter drop-shadow-[0_0_30px_rgba(6,182,212,0.6)] animate-pulse">
            <img src={oracleLogo} className="w-full h-full object-contain" alt="Oracle Logo" />
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
            <div className="w-20 h-20 shrink-0 relative filter drop-shadow-[0_0_15px_rgba(6,182,212,0.6)]">
              <img src={oracleLogo} className="w-full h-full object-contain" alt="Oracle Logo" />
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
              <NavItem active={activeTab === 'training'} onClick={() => { }} icon={<Target size={18} />} label="Training" disabled={true} />
            </div>

            {/* INSIGHTS */}
            <div className="space-y-1">
              <div className="px-4 text-[10px] font-medium text-white/20 uppercase tracking-[0.2em] mb-3">ORACLE INSIGHTS</div>
              <NavItem active={activeTab === 'esports'} onClick={() => setActiveTab('esports')} icon={<Globe size={18} />} label="Esports" />
              <NavItem active={activeTab === 'tutorial'} onClick={() => { }} icon={<HelpCircle size={18} />} label="Tutoriel" disabled={true} />
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
                <button
                  onClick={() => window.location.reload()}
                  className="flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:text-gray-100 transition-all active:rotate-180 duration-500 p-1"
                >
                  <RefreshCw size={18} />
                </button>
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

          <div className="flex-1 overflow-hidden p-0 scroll-smooth relative flex flex-col">
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
                />}
                {activeTab === 'tierlist' && <BuildView panelClass={panelClass} t={t} initialChamp={targetChamp} ddragonVersion={ddragonVersion} championList={championList} />}

                {/* V2 New Views */}
                {/* Removed Notifications tab as it is now a dropdown */}

                {activeTab === 'matchups' && <MatchupsView panelClass={panelClass} t={t} championList={championList} ddragonVersion={ddragonVersion} onOpenUrl={setBrowserUrl} />}
                {activeTab === 'replays' && <ReplaysView panelClass={panelClass} t={t} currentUser={currentUser} />}
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
                  <div className="flex flex-col items-center justify-center h-full text-gray-500">
                    <Brain size={48} className="mb-4 opacity-20" />
                    <h2 className="text-xl font-bold">{t(activeTab) || (activeTab === 'tutorial' ? "Tutoriel" : "Training")}</h2>
                    <p className="text-sm opacity-60">{t('coming_soon')}</p>
                  </div>
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
                />
                }
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
        <div className="flex items-baseline gap-1 mb-1 w-full">
          <span className="text-gray-900 dark:text-gray-100 font-bold text-lg truncate leading-none" title={currentUser.gameName || currentUser.displayName}>
            {currentUser.gameName || currentUser.displayName}
          </span>
          <span className="text-gray-500 text-sm font-medium truncate uppercase">
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

function DashboardView({ t, panelClass, currentUser, targetSummoner, ddragonVersion, patchNotes, setActiveTab, setTargetChamp, onOpenUrl, onSearch, prefetchedData, userRank, userHistory }) {
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
          puuid={currentUser?.puuid}
          panelClass={cn(panelClass, "min-h-[140px]")}
          t={t}
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

function ProfileView({ t, panelClass, currentUser, targetSummoner, onSearch, onChampClick, onBack, overlaySettings, ddragonVersion }) {
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
            <div className="w-32 h-32 relative filter drop-shadow-[0_0_30px_rgba(6,182,212,0.8)]">
              <img src={oracleLogo} className="w-full h-full object-contain animate-pulse" />
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

  return (
    <div className={cn("h-full flex flex-col gap-2 animate-in fade-in", panelClass, "p-0! overflow-y-auto custom-scrollbar bg-white dark:bg-slate-50 dark:bg-[#0a0a0c] transition-colors duration-300")}>
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
              <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${displayUser?.profileIconId || 29}.jpg`} className="w-28 h-28 rounded-[2rem] border-4 border-[#1e1e24] shadow-2xl relative z-10" />
              <div className="absolute -top-3 -left-3 bg-[#5c7ce5] text-gray-900 dark:text-gray-100 font-bold px-2 py-0.5 rounded-lg text-xs shadow-lg z-20 uppercase">{displayUser?.region || "EUW"}</div>
              {displayUser?.summonerLevel > 0 && (
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-white border border-gray-200 dark:border-white/10 dark:bg-[#1e1e24] text-gray-900 dark:text-gray-100 font-bold px-3 py-1 rounded-lg text-sm border border-[#2d2d35] z-20">{displayUser.summonerLevel}</div>
              )}
            </div>
            <div className="mt-2">
              <h1 className="text-3xl font-semibold text-gray-900 dark:text-gray-100 tracking-tight mb-0 leading-tight italic">{displayUser?.gameName || displayUser?.displayName || "Summoner"}</h1>
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
            <div className="bg-white dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 p-4 flex flex-col gap-3 h-[520px] overflow-hidden shadow-2xl">
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

          <BehavioralCard data={behavioralData} t={t} />
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
            />
          </div>

          {/* Lens Card (Radar Chart) - Moved here as requested */}
          <LensCard data={lensData} t={t} rankedStats={rankedStats} />

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

function RankGraphModal({ isOpen, onClose, t, type, data, history, puuid, queueId }) {
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
              className="relative w-full h-[350px] group mt-2 flex bg-black/20 rounded-2xl border border-white/5 p-4 pl-0 overflow-visible"
            >
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
  )
}

function ModernRankCard({ rankedStats, history, puuid, panelClass, t }) {
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

      <RankGraphModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} t={t} type={type} data={data} history={history} puuid={puuid} queueId={viewMode.includes('flex') ? 440 : 420} />
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
  const champName = part.championName || "unknown";
  const champIcon = (champId && champId > 0)
    ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champId}.png`
    : `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || "15.1.1"}/img/champion/${normalizeChampName(champName)}.png`;

  const kdaRatio = ((part.stats.kills + part.stats.assists) / Math.max(1, part.stats.deaths)).toFixed(2);

  const queueName = getQueueName(game, t);

  const getRoleIcon = () => {
    let lane = (part.timeline?.lane || part.lane || "").toUpperCase();
    let role = (part.timeline?.role || part.role || "").toUpperCase();
    const base = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/svg/";

    if (game.queueId === 450 || game.queueId === 1700) return null;

    if (role === 'DUO_SUPPORT' || role === 'SUPPORT') return `${base}position-utility.svg`;
    if (role === 'DUO_CARRY' || role === 'CARRY') return `${base}position-bottom.svg`;
    if (lane === 'JUNGLE') return `${base}position-jungle.svg`;
    if (lane === 'TOP') return `${base}position-top.svg`;
    if (lane === 'MIDDLE' || lane === 'MID') return `${base}position-middle.svg`;
    if (lane === 'BOTTOM' || lane === 'BOT') return `${base}position-bottom.svg`;
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
          <div className="absolute -bottom-1.5 -left-1.5 bg-black border border-gray-200 dark:border-white/40 rounded-full w-4 h-4 flex items-center justify-center z-20 p-0.5 shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
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

function SettingsView({ theme, setTheme, visualMode, setVisualMode, language, setLanguage, t, autoAccept, setAutoAccept, autoImportRunes, setAutoImportRunes, flashPosition, setFlashPosition, socialOverlayEnabled, setSocialOverlayEnabled, musicOverlayEnabled, setMusicOverlayEnabled, overlaySettings, setOverlaySettings, panelClass, triggerSocialToast }) {
  const [isEditingLayout, setIsEditingLayout] = useState(false);
  const languages = [
    { code: 'en', label: 'English (US)' },
    { code: 'fr', label: 'Français' }
  ];

  const [launchOnStartup, setLaunchOnStartup] = useState(false);

  useEffect(() => {
    ipcRenderer.invoke('app:get-auto-launch').then(setLaunchOnStartup);
  }, []);

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
        </SettingsSection>



        {/* Section: Automatisation In-Game */}
        <SettingsSection title="Automatisation & In-Game" icon={Sword}>
          <SettingCard
            icon={Sword} color="orange"
            title={t('auto_accept')} desc={t('auto_accept_desc')}
            action={<SettingsToggle active={autoAccept} onToggle={() => setAutoAccept(!autoAccept)} />}
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
            action={<SettingsToggle active={musicOverlayEnabled} onToggle={() => setMusicOverlayEnabled(!musicOverlayEnabled)} />}
          />
        </SettingsSection>


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

const getRoleLabel = (lane, role) => {
  if (lane === 'JUNGLE') return 'Jungler';
  if (lane === 'TOP') return 'Top';
  if (lane === 'MID' || lane === 'MIDDLE') return 'Mid';
  if (lane === 'BOTTOM' || lane === 'BOT') {
    if (role === 'DUO_SUPPORT') return 'Support';
    return 'ADC';
  }
  if (lane === 'UTILITY') return 'Support';
  return 'Lane';
};

const getRoleIcon = (lane) => {
  const l = (lane || "").toLowerCase();
  if (!l || l === 'none' || l === 'unknown') return null;
  const map = {
    'top': 'top',
    'jungle': 'jungle',
    'mid': 'mid',
    'middle': 'mid',
    'bottom': 'bot',
    'bot': 'bot',
    'utility': 'support'
  };
  const key = map[l];
  if (!key) return null;
  return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/position-selector/positions/icon-position-${key}.png`;
};

function ReplaysView({ t, panelClass, currentUser }) {
  const [replays, setReplays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [coachingGame, setCoachingGame] = useState(null);
  const [lpGains, setLpGains] = useState([]);

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

      setCoachingGame({ ...fullGame, _userPart: p, _champName: champName, _mode: mode });
    } catch (e) {
      console.error("Failed to load full game:", e);
    }
  };

  useEffect(() => {
    if (!coachingGame && replays.length > 0) {
      // Auto-load the first game (FULL details)
      loadFullGame(replays[0]);
    }
  }, [replays, coachingGame, currentUser]);

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
            const champName = p ? getChampName(p.championId) : t('unknown');

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
                  <div className="relative group/tooltip">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (isWatchable) handleWatch(r.gameId, r.platformId, state);
                      }}
                      disabled={!isWatchable}
                      className={cn(
                        "p-2 rounded-lg transition-all",
                        isWatchable
                          ? "bg-accent-primary text-black hover:bg-white shadow-[0_0_10px_rgba(59,130,246,0.3)]"
                          : "bg-white dark:bg-white/5 text-gray-600 border border-gray-200 dark:border-white/5 cursor-not-allowed opacity-50"
                      )}
                      title={isWatchable ? t('watch_replay') : undefined}
                    >
                      {isWatchable ? <Play size={16} fill="currentColor" /> : <ArrowDown size={16} />}
                    </button>
                    {!isWatchable && (
                      <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-slate-50 dark:bg-[#0a0a0c]/90 border border-gray-200 dark:border-white/10 rounded-lg text-[10px] font-black uppercase tracking-widest text-gray-300 backdrop-blur-md shadow-2xl opacity-0 scale-90 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 flex items-center gap-2">
                        <Clock size={10} className="text-accent-primary" />
                        <span>A venir...</span>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-50 dark:bg-[#0a0a0c]/90 border-r border-b border-gray-200 dark:border-white/10 rotate-45"></div>
                      </div>
                    )}
                  </div>
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
          {coachingGame ? (
            <AICoachingPanel game={coachingGame} t={t} onWatch={handleWatch} />
          ) : (
            <div className="h-full glass-panel flex flex-col items-center justify-center p-12 text-center">
              <div className="w-24 h-24 rounded-full bg-accent-primary/5 flex items-center justify-center mb-6 relative">
                <Brain size={48} className="text-accent-primary animate-pulse" />
                <div className="absolute inset-0 bg-accent-primary/20 rounded-full blur-2xl"></div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 italic">{t('ai_analyzer_title')}</h3>
              <p className="text-gray-500 text-sm max-w-sm">
                {t('ai_analyzer_desc')}
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
  const champName = game._champName || getChampName(p.championId);
  const roleName = getRoleLabel(p.timeline?.lane, p.timeline?.role);
  const roleIcon = getRoleIcon(p.timeline?.lane);

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

  const oppChampName = opponent ? getChampName(opponent.championId) : null;

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
    setAnalyzing(true);
    setShowTips(false);
    setShowMatchup(false);
    setInsightIndex(0);
    const timer = setTimeout(() => setAnalyzing(false), 800);
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
      <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${normalizeChampName(champ)}_0.jpg`} className="absolute inset-0 w-full h-full object-cover object-top" />
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
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${normalizeChampName(champ1)}.png`} className="w-10 h-10 rounded-xl border border-white/20 group-hover:border-accent-primary shadow-lg" />
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
                  <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${normalizeChampName(champ2)}.png`} className="w-10 h-10 rounded-xl border border-white/20 group-hover:border-red-500 shadow-lg" />
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
              <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${normalizeChampName(champ1)}_0.jpg`} className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
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

            <div className="grid grid-cols-2 gap-6">
              {/* Build Essentials */}
              <div className="glass-panel p-6 bg-white/5 neo-glow relative overflow-hidden group/build">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="flex items-center gap-3 text-gray-400 font-black text-xs uppercase tracking-[0.2em]">
                    <Sword size={16} className="text-accent-primary" /> {t('recommended_build')}
                  </h4>
                  {displayBuild && (
                    <div className="flex gap-1.5 p-1 bg-white/5 rounded-xl border border-white/10">
                      <button onClick={() => setBuildStage(s => Math.max(0, s - 1))} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-accent-primary transition-all disabled:opacity-20" disabled={buildStage === 0}>
                        <ChevronLeft size={14} />
                      </button>
                      <button onClick={() => setBuildStage(s => Math.min(4, s + 1))} className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-white/10 text-gray-400 hover:text-accent-primary transition-all disabled:opacity-20" disabled={buildStage === 4}>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center min-h-[110px] justify-center">
                  {!displayBuild ? (
                    <div className="flex gap-4 justify-center">
                      {(analysis?.counterItems || []).slice(0, 4).map((id, i) => (
                        <div key={i} className="group relative hover:-translate-y-2 transition-all duration-300">
                          <div className="absolute inset-0 bg-accent-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
                          <img
                            src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || '15.1.1'}/img/item/${id}.png`}
                            className="w-14 h-14 rounded-2xl border border-white/10 relative z-10 shadow-2xl"
                            onError={(e) => { e.target.src = `https://ddragon.leagueoflegends.com/cdn/15.1.1/img/item/${id}.png` }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full transform transition-all duration-500 animate-in fade-in slide-in-from-right-4" key={buildStage}>
                      <div className="flex flex-col items-center">
                        <div className="flex items-center gap-3 mb-4">
                          <span className="text-[10px] font-black text-accent-primary uppercase tracking-[0.2em] px-2.5 py-1 bg-accent-primary/10 border border-accent-primary/20 rounded-lg">
                            {buildStage === 0 ? t('build_starting') : buildStage === 1 ? t('build_core') : buildStage === 2 ? t('build_fourth') : buildStage === 3 ? t('build_fifth') : t('build_sixth')}
                          </span>
                          <div className="h-1 w-1 bg-gray-600 rounded-full"></div>
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-1.5">
                            <Activity size={10} className="text-green-500" />
                            {(() => {
                              if (buildStage === 0) return displayBuild.starting.winRate;
                              if (buildStage === 1) return displayBuild.core.winRate;
                              const keys = ['fourth', 'fifth', 'sixth'];
                              return displayBuild[keys[buildStage - 2]]?.[0]?.winRate || "54.2%";
                            })()}
                          </span>
                        </div>

                        <div className="flex gap-4 justify-center items-center">
                          {(() => {
                            let items = [];
                            if (buildStage === 0) items = displayBuild.starting.items;
                            else if (buildStage === 1) items = displayBuild.core.items;
                            else {
                              const keys = ['fourth', 'fifth', 'sixth'];
                              const opts = displayBuild[keys[buildStage - 2]] || [];
                              items = opts.map(o => o.id);
                            }

                            return (items || []).map((id, i) => (
                              <div key={i} className="group relative hover:-translate-y-2 transition-all duration-300">
                                <div className="absolute inset-0 bg-accent-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-all"></div>
                                <img
                                  src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || '15.1.1'}/img/item/${id}.png`}
                                  className="w-16 h-16 rounded-2xl border border-white/10 relative z-10 shadow-2xl group-hover:border-accent-primary/50"
                                  onError={(e) => { e.target.src = `https://ddragon.leagueoflegends.com/cdn/15.1.1/img/item/${id}.png` }}
                                />
                                {buildStage >= 2 && displayBuild[['fourth', 'fifth', 'sixth'][buildStage - 2]]?.[i]?.winRate && (
                                  <div className="absolute -bottom-2 inset-x-0 z-20 flex justify-center">
                                    <span className="px-1.5 py-0.5 bg-black/90 border border-white/10 rounded-md text-[8px] font-black text-accent-primary shadow-xl">
                                      {displayBuild[['fourth', 'fifth', 'sixth'][buildStage - 2]]?.[i]?.winRate}
                                    </span>
                                  </div>
                                )}
                              </div>
                            ));
                          })()}
                        </div>

                        {/* --- Stats Récentes: Runes & Spells --- */}
                        {(analysis?.runes || (analysis?.spells && analysis.spells.length > 0)) && (
                          <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-center gap-10 w-full">
                            {analysis.spells && (
                              <div className="flex flex-col items-center">
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3 opacity-70 italic">Sorts d'invocateur</span>
                                <div className="flex gap-2.5">
                                  {analysis.spells.map((s, idx) => (
                                    <img key={idx} src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/v1/summoner-spells/${s.id}.png`} className="w-9 h-9 rounded-xl border border-white/10 shadow-lg" />
                                  ))}
                                </div>
                              </div>
                            )}
                            {analysis.runes && (
                              <div className="flex flex-col items-center">
                                <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-3 opacity-70 italic">Runes Clés</span>
                                <div className="flex items-center gap-4">
                                  <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/v1/perk-images/styles/${analysis.runes.primary}.png`} className="w-5 h-5 opacity-40 grayscale" />
                                  <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/v1/perk-images/perks/${analysis.runes.all?.[0] || '8005'}/${analysis.runes.all?.[0] || '8005'}.png`} className="w-11 h-11 filter drop-shadow-[0_0_10px_rgba(59,130,246,0.3)]" />
                                  <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/v1/perk-images/styles/${analysis.runes.sub}.png`} className="w-5 h-5 opacity-40 grayscale" />
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Full-Scale Jungle Expedition Modal - SOLID FIX */}
                {showJunglePath && analysis?.junglePath && (
                  <div className="absolute inset-0 z-[100] bg-[#0c0c0e] rounded-[1.5rem] p-6 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300 border border-white/10 shadow-2xl">
                    <div className="w-full flex items-center justify-between mb-6">
                      <h5 className="text-[12px] font-black text-accent-primary uppercase tracking-[0.3em] flex items-center gap-3">
                        <Route size={18} /> Expedition Jungle
                      </h5>
                      <button onClick={() => setShowJunglePath(false)} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-500 hover:text-white transition-all hover:bg-white/10 hover:rotate-90">
                        <X size={20} />
                      </button>
                    </div>
                    <div className="flex items-center gap-4 overflow-x-auto no-scrollbar py-4 w-full justify-center">
                      {analysis.junglePath.map((campId, idx) => (
                        <React.Fragment key={idx}>
                          <div className="flex flex-col items-center shrink-0">
                            <div className="w-14 h-14 rounded-2xl border border-white/10 bg-white/5 flex items-center justify-center p-2 hover:border-accent-primary/40 transition-all group relative font-black">
                              <img
                                src={CAMP_MAP[campId]?.icon || CAMP_MAP[1].icon}
                                className="w-full h-full object-contain filter drop-shadow-[0_0_8px_rgb(var(--accent-primary)/0.3)]"
                                title={CAMP_MAP[campId]?.name}
                                onError={(e) => { e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/assets/v1/jungle-icons/${campId}.png` }}
                              />
                            </div>
                            <div className="mt-3 flex flex-col items-center gap-1">
                              <span className="text-[11px] font-black text-white px-1.5 rounded-md">{idx + 1}</span>
                              <span className="text-[7px] font-black text-gray-500 uppercase tracking-tighter">{CAMP_MAP[campId]?.name}</span>
                            </div>
                          </div>
                          {idx < analysis.junglePath.length - 1 && (
                            <ChevronRight size={18} className="text-gray-800 shrink-0" />
                          )}
                        </React.Fragment>
                      ))}
                    </div>

                    <div className="mt-8 w-full px-5 py-3 bg-white/5 border border-white/10 rounded-2xl">
                      <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest text-center">
                        Optimisé pour {champ1} • Saison {ddragonVersion?.split('.').slice(0, 1).join('.') || '15'}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Intelligence */}
              <div className="glass-panel p-0 overflow-hidden relative group cursor-pointer" onClick={() => onOpenUrl?.(analysis?.videoUrl || `https://www.youtube.com/results?search_query=${champ1}+vs+${champ2}+high+elo`)}>
                <div className="absolute inset-0 z-10 bg-black/60 group-hover:bg-black/40 transition-all flex flex-col items-center justify-center gap-2">
                  <div className="w-12 h-12 rounded-full bg-accent-primary/80 flex items-center justify-center shadow-[0_0_20px_rgb(var(--accent-primary)/0.5)] group-hover:scale-110 transition-transform">
                    <Play size={20} className="text-black ml-1" fill="currentColor" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white shadow-xl">{t('high_elo_pov')}</span>
                </div>
                <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/splash/${normalizeChampName(champ2)}_0.jpg`} className="w-full h-full object-cover" />
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
              <img src={`https://ddragon.leagueoflegends.com/cdn/img/champion/loading/${normalizeChampName(champ2)}_0.jpg`} className="w-full h-full object-cover object-top opacity-70 group-hover:opacity-100 transition-all duration-1000 group-hover:scale-110" />
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
  const [loadingSchedule, setLoadingSchedule] = useState(!prefetchedData?.esportsSchedule);
  const [loadingNews, setLoadingNews] = useState(!prefetchedData?.esportsNews);

  useEffect(() => {
    const fetchEsportsData = async (force = false) => {
      // If we don't have prefetched data or it's old (e.g. > 5 min), fetch fresh
      const isStale = force || !prefetchedData?.timestamp || (Date.now() - prefetchedData.timestamp > 300000);

      try {
        if (!prefetchedData?.esportsSchedule || isStale) {
          const [schedule, newsData, topLives] = await Promise.all([
            window.ipcRenderer.invoke('scraper:get-esports-schedule'),
            window.ipcRenderer.invoke('scraper:get-esports-news'),
            window.ipcRenderer.invoke('scraper:get-top-live-streams')
          ]);

          if (Array.isArray(schedule)) setUpcomingMatches(schedule);
          if (newsData && newsData.length > 0) setNews(newsData);

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
          const liveMatch = schedule.find(m => m.time && m.time.toLowerCase().includes('live'));
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
      } catch (err) {
        console.error("Failed to fetch esports data:", err);
      } finally {
        setLoadingSchedule(false);
        setLoadingNews(false);
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
  // Using wsrv.nl to proxy Fandom images and avoid CORS/Redirect issues
  const logoMap = {
    'gen-g': 'https://wsrv.nl/?url=lol.fandom.com/wiki/Special:FilePath/Gen.Glogo_std.png&w=128&output=png',
    'drx': 'https://wsrv.nl/?url=lol.fandom.com/wiki/Special:FilePath/DRXlogo_std.png&w=128&output=png',
    't1': 'https://wsrv.nl/?url=lol.fandom.com/wiki/Special:FilePath/T1logo_std.png&w=128&output=png',
    'hanwha-life-esports': 'https://wsrv.nl/?url=lol.fandom.com/wiki/Special:FilePath/Hanwha_Life_Esportslogo_std.png&w=128&output=png',
    'dplus-kia': 'https://wsrv.nl/?url=lol.fandom.com/wiki/Special:FilePath/Dplus_KIAlogo_std.png&w=128&output=png',
    'kt-rolster': 'https://wsrv.nl/?url=lol.fandom.com/wiki/Special:FilePath/KT_Rolsterlogo_std.png&w=128&output=png',
    'g2-esports': 'https://wsrv.nl/?url=lol.fandom.com/wiki/Special:FilePath/G2_Esportslogo_std.png&w=128&output=png',
    'fnatic': 'https://wsrv.nl/?url=lol.fandom.com/wiki/Special:FilePath/Fnaticlogo_std.png&w=128&output=png',
    'team-liquid': 'https://wsrv.nl/?url=lol.fandom.com/wiki/Special:FilePath/Team_Liquidlogo_std.png&w=128&output=png',
    'cloud9': 'https://wsrv.nl/?url=lol.fandom.com/wiki/Special:FilePath/Cloud9logo_std.png&w=128&output=png'
  };

  const getTeamLogo = (slug) => logoMap[slug] || `https://ui-avatars.com/api/?name=${slug}&background=random&color=fff&size=64`;

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in relative">
      {/* Browser Overlay */}
      {browserUrl && (
        <BrowserOverlay url={browserUrl} onClose={() => setBrowserUrl(null)} />
      )}

      <h2 className="text-3xl font-bold text-gray-900 dark:text-gray-100 flex items-center gap-3">
        <Trophy className="text-accent-primary" /> {t('esports_center')}
      </h2>
      <div className="grid grid-cols-12 gap-6 flex-1 min-h-0">
        <div className="col-span-8 flex flex-col gap-6 h-full">
          {/* Twitch Embed */}
          <div className="flex-1 bg-black rounded-2xl border border-gray-200 dark:border-white/10 overflow-hidden relative shadow-2xl group">
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
          <div className="h-24 glass-panel flex flex-col overflow-hidden relative group">
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
                    team1={m.team1} logo1={m.logo1 || getTeamLogo(m.team1.toLowerCase().replace(/\s+/g, '-'))}
                    team2={m.team2} logo2={m.logo2 || getTeamLogo(m.team2.toLowerCase().replace(/\s+/g, '-'))}
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
  const displayDate = date === "Upcoming" ? "Next Match" : date;

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
          {displayDate}
          {time && ` • ${time}`}
        </span>
      </div>

      {/* Matchup Layout */}
      <div className="grid grid-cols-7 items-center gap-1">
        {/* Team 1 */}
        <div className="col-span-3 flex items-center justify-start gap-2 overflow-hidden">
          <img src={logo1} className="w-7 h-7 object-contain shrink-0 drop-shadow-lg" onError={(e) => e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/teams/logos/team_logo_default.png"} />
          <span className="font-bold text-[13px] text-gray-900 dark:text-gray-100 truncate">{team1}</span>
        </div>

        {/* VS */}
        <div className="col-span-1 text-center text-[10px] font-black text-white/20 bg-black/5 dark:bg-black/20 rounded-lg py-1 border border-white/5">VS</div>

        {/* Team 2 */}
        <div className="col-span-3 flex items-center justify-end gap-2 overflow-hidden text-right">
          <span className="font-bold text-[13px] text-gray-900 dark:text-gray-100 truncate">{team2}</span>
          <img src={logo2} className="w-7 h-7 object-contain shrink-0 drop-shadow-lg" onError={(e) => e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-clash/global/default/assets/images/teams/logos/team_logo_default.png"} />
        </div>
      </div>
    </div>
  )
}

function NewsItem({ img, title, desc, url, onOpenUrl }) {
  return (
    <div onClick={() => onOpenUrl(url)} className="flex gap-4 p-3 hover:bg-white dark:bg-white/5 rounded-xl cursor-pointer transition-all group border border-transparent hover:border-gray-200 dark:border-white/5">
      <div className="relative shrink-0 overflow-hidden rounded-lg w-20 h-14">
        <img src={img} className="w-full h-full object-cover rounded-lg group-hover:scale-110 transition-transform duration-500" />
        <div className="absolute inset-0 bg-black/5 dark:bg-black/20 group-hover:bg-transparent transition-colors"></div>
      </div>
      <div className="flex flex-col justify-center min-w-0">
        <h4 className="font-bold text-gray-900 dark:text-gray-100 text-sm leading-tight group-hover:text-accent-primary transition-colors line-clamp-1">{title}</h4>
        <p className="text-[10px] text-gray-500 mt-1 line-clamp-1">{desc}</p>
      </div>
      <div className="self-center ml-auto opacity-0 group-hover:opacity-100 transition-opacity -translate-x-2 group-hover:translate-x-0">
        <ExternalLink size={12} className="text-gray-500 group-hover:text-accent-primary" />
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

      <div className="mt-12 text-gray-600 dark:text-gray-400 font-medium text-sm animate-pulse italic">Appuyez sur [ALT+O] en jeu pour activer l'analyse prédictive</div>
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

