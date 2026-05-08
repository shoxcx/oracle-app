import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TutorialView from './TutorialView';
import TrainingView from './TrainingView';

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
  Monitor,
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
  Flame,
  X,
  Bell,
  Skull,
  ExternalLink,
  ArrowDown,
  Wrench,
  Flag,
  ChevronDown,
  ChevronUp,
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
  User,
  LogOut,
  UserPlus,
  Map,
  Route,
  Palette,
  CreditCard,
  ArrowLeftRight,
  Download,
  Ban,
  FileText
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
    loading_empty_slot: "Empty",
    loading_winrate: "Global Winrate",
    loading_record: "Record",
    streak_wins: "WINS STREAK",
    streak_losses: "LOSSES STREAK",
    attitude_precise: "Precise",
    attitude_struggling: "Struggling",
    attitude_on_fire: "On Fire",
    attitude_tilt: "Likely Tilting",
    attitude_expert: "Expert",
    attitude_veteran: "Veteran",
    attitude_constant: "Constant",
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

    test_mode_label: "Overlay Test Mode",
    test_mode_desc: "Show all overlays for testing",
    edit_layout_desc: "Adjust the position of each module on your screen. You MUST play in 'BORDERLESS' mode for overlays to appear over the game.",
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
    loading_empty_slot: "Vide",
    loading_winrate: "Winrate Global",
    loading_record: "Historique",
    streak_wins: "VICTOIRES D'AFFILÉE",
    streak_losses: "DÉFAITES D'AFFILÉE",
    attitude_precise: "Précis",
    attitude_struggling: "En Difficulté",
    attitude_on_fire: "En Feu",
    attitude_tilt: "Tilt Probable",
    attitude_expert: "Expert",
    attitude_veteran: "Vétéran",
    attitude_constant: "Constant",
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
    winrate_toggle: "Prédiction de Victoire (CTRL+X ou ALT+X)", winrate_desc: "Pourcentage de chance de victoire en temps réel",
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

    test_mode_label: "Mode TEST Overlays",
    test_mode_desc: "Affiche tous les overlays pour test",
    edit_layout_desc: "Ajustez la position de chaque module. Le mode d'affichage 'SANS BORDS' en jeu est STRICTEMENT OBLIGATOIRE !",
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



function FloatingParticles() {
  const particles = useMemo(() => {
    return Array.from({ length: 50 }).map((_, i) => ({
      id: i,
      size: Math.random() * 5 + 3,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 15 + 15,
      delay: Math.random() * -30,
      driftX: Math.random() * 120 - 60,
      driftY: Math.random() * 250 - 200,
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[10]">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-accent-primary shadow-[0_0_15px_2px_rgb(var(--accent-primary))]"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, p.driftY, 0],
            x: [0, p.driftX, 0],
            opacity: [0.15, 0.9, 0.15],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}
    </div>
  );
}

function GlobalFullScreenLoader({ text = "Chargement...", subtext = "Les données sont en train d'être récupéré..." }) {
  return (
    <div className="absolute inset-0 z-[200] flex flex-col items-center justify-center bg-[#f5f5f7] dark:bg-[rgb(var(--bg-main))] animate-in fade-in duration-300 rounded-3xl overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden rounded-3xl">
        <motion.div
          initial={{ scale: 0.8, opacity: 0, rotate: -25 }}
          animate={{ scale: 1, opacity: 0.5, rotate: 15 }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute rounded-[100%] w-[500px] h-[300px] md:w-[900px] md:h-[500px] border-[60px] md:border-[120px] border-accent-primary filter blur-[40px] md:blur-[80px] mix-blend-screen"
        />
      </div>
      <div className="relative z-10 flex flex-col items-center justify-center p-12 w-full">
        <RefreshCw size={36} className="text-accent-primary/80 animate-spin mb-8 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]" />
        <motion.div
          initial="hidden" animate="visible"
          variants={{
            hidden: {
              loading_empty_slot: "Empty",
              loading_winrate: "Global Winrate",
              loading_record: "Record",
              streak_wins: "WINS STREAK",
              streak_losses: "LOSSES STREAK",
              attitude_precise: "Precise",
              attitude_struggling: "Struggling",
              attitude_on_fire: "On Fire",
              attitude_tilt: "Likely Tilting",
              attitude_expert: "Expert",
              attitude_veteran: "Veteran",
              attitude_constant: "Constant",
            },
            visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } }
          }}
          className="flex text-3xl md:text-5xl font-black uppercase tracking-[0.2em] overflow-hidden text-gray-900 dark:text-white select-none drop-shadow-[0_0_30px_rgb(var(--accent-primary))] pt-4"
        >
          {Array.from(text).map((char, i) => (
            <motion.span
              key={i}
              variants={{
                hidden: {
                  loading_empty_slot: "Empty",
                  loading_winrate: "Global Winrate",
                  loading_record: "Record",
                  streak_wins: "WINS STREAK",
                  streak_losses: "LOSSES STREAK",
                  attitude_precise: "Precise",
                  attitude_struggling: "Struggling",
                  attitude_on_fire: "On Fire",
                  attitude_tilt: "Likely Tilting",
                  attitude_expert: "Expert",
                  attitude_veteran: "Veteran",
                  attitude_constant: "Constant", y: "150%", opacity: 0
                },
                visible: { y: "0%", opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
              }}
              className={char === ' ' ? 'w-4' : 'inline-block'}
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, filter: 'blur(5px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          className="text-gray-500 font-medium tracking-widest mt-6 text-xs uppercase select-none drop-shadow-md"
        >
          {subtext}
        </motion.p>
      </div>
    </div>
  );
}

const premiumUsers = [
  { name: 'ghost in bush', tag: '0777' },
  { name: 'guillaume13fr', tag: '1968' },
  { name: 'courgette', tag: '1234' },
  { name: '92itastycrousty', tag: 'rnf' },
  { name: 'magernos', tag: 'euw' },
  { name: 'tartilou', tag: 'euw' }
];

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

  // --- Global LCU State ---
  const [isConnected, setIsConnected] = useState(false);
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
  const [gamePhase, setGamePhase] = useState('None');
  const [champSelectData, setChampSelectData] = useState(null);

  // --- Premium State ---
  const [isPremium, setIsPremium] = useState(false);
  const [premiumData, setPremiumData] = useState(null);
  const [serverGoldUsers, setServerGoldUsers] = useState({});
  const [showPremiumModal, setShowPremiumModal] = useState(false);
  const [errorModal, setErrorModal] = useState({ show: false, title: '', message: '' });

  const currentUserRef = useRef(currentUser);
  useEffect(() => { currentUserRef.current = currentUser; }, [currentUser]);

  const prevFriendsRef = useRef([]);

  // Auto-refresh logic on disconnect
  const lastConnected = useRef(isConnected);
  useEffect(() => {
    if (lastConnected.current && !isConnected && appMode === 'window') {
      window.location.reload();
    }
    lastConnected.current = isConnected;
  }, [isConnected, appMode]);

  useEffect(() => {
    const fetchVersion = async () => {
      try {
        const res = await fetch('https://ddragon.leagueoflegends.com/api/versions.json');
        const versions = await res.json();
        if (versions && versions[0]) setDdragonVersion(versions[0]);
      } catch (e) { console.error("DDragon version fetch failed", e); }
    };
    fetchVersion();

    if (window.ipcRenderer && appMode === 'window') {
      window.ipcRenderer.invoke('app:version').then(v => {
        document.title = `Oracle (${v})`;
      }).catch(() => { });
    }

    // Polling LCU State
    const syncState = async () => {
      if (!window.ipcRenderer) return;
      try {
        const connected = await window.ipcRenderer.invoke('lcu:connect');
        setIsConnected(connected);

        if (connected) {
          const user = await window.ipcRenderer.invoke('lcu:get-current-summoner');
          if (user && user.puuid) {
            setCurrentUser(prev => {
              if (prev?.puuid !== user.puuid) {
                console.log("[Oracle] New User Detected:", user.displayName);
                return user;
              }
              return prev;
            });

            const [stats, history] = await Promise.all([
              window.ipcRenderer.invoke('lcu:get-ranked-stats', user.puuid),
              window.ipcRenderer.invoke('lcu:get-match-history', user.puuid, 0, 150)
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
          } else if (currentUserRef.current) {
            setCurrentUser(null);
            setUserRank(null);
          }

          const phase = await window.ipcRenderer.invoke('lcu:get-gameflow-phase');
          if (phase) setGamePhase(phase);

          const friendsList = await window.ipcRenderer.invoke('lcu:get-friends');
          if (Array.isArray(friendsList)) {
            setFriends(friendsList);
            prevFriendsRef.current = friendsList;
          }

          if (phase === 'ChampSelect') {
            const session = await window.ipcRenderer.invoke('lcu:get-champ-select-session');
            setChampSelectData(session);
          }
        } else {
          setIsConnected(false);
          // Keep currentUser and userRank from cache/last state instead of clearing them
          setGamePhase('None');
          setFriends([]);
        }
      } catch (e) { console.error("Sync Error", e); }
    };

    syncState();
    const interval = setInterval(syncState, 2000);
    return () => clearInterval(interval);
  }, []);

  // Polling Premium Status
  useEffect(() => {
    const fetchGold = async () => {
      try {
        const res = await fetch('https://oracle-73d32-default-rtdb.europe-west1.firebasedatabase.app/gold_users.json');
        const data = await res.json();
        if (data) setServerGoldUsers(data);
      } catch (e) { }
    };
    fetchGold();
    const interval = setInterval(fetchGold, 10000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!currentUser) {
      setIsPremium(false);
      setPremiumData(null);
      return;
    }

    const checkPremium = () => {
      // 1. Check Hardcoded Whitelist (Legacy/Staff)
      const isWhitelisted = premiumUsers.some(p =>
        currentUser.gameName?.toLowerCase() === p.name.toLowerCase() &&
        currentUser.tagLine?.toLowerCase() === p.tag.toLowerCase()
      ) || currentUser.puuid === 'dd7cdf6e-a21e-5393-8ce4-be7be5f59c4e';

      if (isWhitelisted) {
        setIsPremium(true);
        setPremiumData({ type: 'WHITELIST', active: true });
        return;
      }

      // 2. Check Firebase Realtime Data
      const formattedUser = `${currentUser.gameName}#${currentUser.tagLine}`;
      let latestData = null;

      for (const key in serverGoldUsers) {
        try {
          let base64 = key.replace(/-/g, '+').replace(/_/g, '/');
          while (base64.length % 4) base64 += '=';
          const dec = decodeURIComponent(escape(atob(base64)));

          const cleanDec = dec.replace(/\s/g, '').toLowerCase();
          const cleanFormatted = formattedUser.replace(/\s/g, '').toLowerCase();

          if (cleanDec === cleanFormatted) {
            const d = serverGoldUsers[key];
            if (!latestData || (d.updatedAt || 0) > (latestData.updatedAt || 0)) {
              latestData = d;
            }
          }
        } catch (e) { }
      }

      if (latestData && latestData.active) {
        if (latestData.type === 'TEMPORARY' && latestData.expiresAt && Date.now() > latestData.expiresAt) {
          setIsPremium(false);
          setPremiumData(null);
        } else {
          setIsPremium(true);
          setPremiumData(latestData);
        }
      } else {
        setIsPremium(false);
        setPremiumData(null);
      }
    };

    checkPremium();
  }, [currentUser, serverGoldUsers]);

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

      if (['CTRL+X', 'CommandOrControl+Shift+O', 'CommandOrControl+X', '.'].includes(parsed.winProbabilityShortcut)) {
        parsed.winProbabilityShortcut = 'Alt+O';
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

    let currentShortcut = overlaySettings.winProbabilityShortcut || 'Alt+O';
    // Clean up broken or dangerous bindings (Cut/Paste keys, or accidental dots)
    if (['CTRL+X', 'CommandOrControl+Shift+O', 'CommandOrControl+X', '.'].includes(currentShortcut)) {
      currentShortcut = 'Alt+O';
    }

    if (window.ipcRenderer) {
      if (appMode === 'window') {
        window.ipcRenderer.invoke('app:register-shortcut', currentShortcut);
      }
      window.ipcRenderer.send('settings:updated', overlaySettings);
    }
  }, [overlaySettings, appMode]);




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
    content = <ProfileWindow summonerName={windowParams.summoner} theme={theme} visualMode={visualMode} t={t} ddragonVersion={ddragonVersion} />;
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
        // Passed from App root
        isConnected={isConnected}
        currentUser={currentUser}
        userRank={userRank}
        currentUserHistory={currentUserHistory}
        friends={friends}
        gamePhase={gamePhase}
        setGamePhase={setGamePhase}
        champSelectData={champSelectData}
        setChampSelectData={setChampSelectData}
        isPremium={isPremium}
        setIsPremium={setIsPremium}
        premiumData={premiumData}
        serverGoldUsers={serverGoldUsers}
        setShowPremiumModal={setShowPremiumModal}
        setErrorModal={setErrorModal}
      />
    );
  }

  const [showQuitModal, setShowQuitModal] = useState(false);
  const [rememberCloseChoice, setRememberCloseChoice] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [newVersion, setNewVersion] = useState('');

  useEffect(() => {
    if (window.ipcRenderer) {
      const handler = () => setShowQuitModal(true);
      window.ipcRenderer.on('show-quit-modal', handler);

      const updateHandler = (e, version) => {
        setNewVersion(version);
        setShowUpdateModal(true);
      };
      window.ipcRenderer.on('show-update-modal', updateHandler);

      return () => {
        try {
          window.ipcRenderer.removeListener('show-quit-modal', handler);
          window.ipcRenderer.removeListener('show-update-modal', updateHandler);
        } catch (e) { }
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

      <PremiumRequiredModal
        isOpen={showPremiumModal}
        onClose={() => setShowPremiumModal(false)}
        onSubscribe={() => window.ipcRenderer.invoke("app:open-url", "https://oracle-website-liard.vercel.app")}
        t={t}
      />
      <ModernErrorModal
        error={errorModal}
        onClose={() => setErrorModal({ ...errorModal, show: false })}
      />
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

      {/* Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center animate-in fade-in duration-300 backdrop-blur-md bg-black/40">
          <div className="glass-panel max-w-md w-full p-6 mx-4 animate-in zoom-in-95 duration-300 shadow-2xl border border-white/10 dark:border-white/5">
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
              <RefreshCw size={20} className="text-accent-primary" />
              Mise à jour disponible
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 text-sm">
              La version {newVersion} est prête à être installée. Voulez-vous redémarrer l'application maintenant pour appliquer la mise à jour ?
            </p>

            <div className="flex flex-col gap-3">
              <button
                onClick={() => {
                  if (window.ipcRenderer) window.ipcRenderer.invoke('app:install-update');
                }}
                className="w-full relative group overflow-hidden bg-accent-primary/10 hover:bg-accent-primary/20 text-accent-primary font-bold py-3 px-4 rounded-xl transition-all flex items-center justify-between border border-accent-primary/20"
              >
                <span>Installer et redémarrer</span>
                <RefreshCw size={18} className="translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all" />
              </button>

              <button
                onClick={() => setShowUpdateModal(false)}
                className="w-full py-2 px-4 rounded-lg text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors border border-transparent hover:border-gray-200 dark:hover:border-white/10"
              >
                Plus tard
              </button>
            </div>
          </div>
        </div>
      )}

      {(appMode === 'music' || appMode === 'toast' || appMode === 'live' || appMode === 'skills' || appMode === 'ingame') && (
        <style>{`
  html, body, #root {
    background-color: transparent !important;
    background: transparent !important;
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

  const handleMouseEnter = () => {
    if (window.ipcRenderer) {
      window.ipcRenderer.invoke('window:set-ignore-mouse-events', false);
    }
  };

  const handleMouseLeave = () => {
    if (window.ipcRenderer) {
      window.ipcRenderer.invoke('window:set-ignore-mouse-events', true, { forward: true });
    }
  };

  return (
    <div
      className="w-full h-full p-2 select-none"
      style={{ WebkitAppRegion: 'drag' }}
      onContextMenu={(e) => e.preventDefault()}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
          let borderColor = "bg-accent-primary shadow-accent-primary/50";
          let statusColor = "bg-green-500 shadow-green-500/50";

          if (toast.type === 'disconnect') {
            borderColor = "bg-red-500 shadow-red-500/50";
            statusColor = "bg-gray-500 shadow-gray-500/50";
          } else if (toast.type === 'game') {
            borderColor = "bg-blue-500 shadow-blue-500/50";
            statusColor = "bg-green-500 shadow-green-500/50";
          } else if (toast.borderColor) {
            borderColor = toast.borderColor;
            statusColor = toast.statusColor || toast.iconColor || "bg-accent-primary";
          }

          const LucideIconMap = {
            'Target': Target, 'Activity': Activity, 'Sparkles': Sparkles, 'Skull': Skull, 'AlertCircle': AlertTriangle
          };
          const MappedIcon = toast.lucideName ? LucideIconMap[toast.lucideName] || Target : null;

          return (
            <div
              key={toast.id}
              onClick={() => {
                if (toast.url && window.ipcRenderer) {
                  window.ipcRenderer.send('app:open-internal-url', toast.url);
                }
              }}
              className={`w-[320px] bg-black/50 backdrop-blur-[24px] border border-white/10 rounded-2xl p-4 flex items-center gap-4 animate-in slide-in-from-right-8 fade-in duration-500 relative overflow-hidden pointer-events-auto shadow-[inset_0_1px_2px_rgba(255,255,255,0.2)] ${toast.url ? 'cursor-pointer hover:bg-black/70' : ''}`}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${borderColor} `} />

              <div className="relative shrink-0">
                {toast.imageUrl ? (
                  <img
                    src={toast.imageUrl}
                    className="w-14 h-14 rounded-xl border border-white/10 shadow-lg object-cover bg-gray-900"
                    alt="Icon"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                ) : toast.lucideName && MappedIcon ? (
                  <div className={`w-14 h-14 rounded-xl border border-white/10 shadow-lg flex items-center justify-center ${toast.iconColor || 'bg-gray-900'}`}>
                    <MappedIcon size={24} className="text-white" />
                  </div>
                ) : toast.letter ? (
                  <div className={`w-14 h-14 rounded-xl border border-white/10 shadow-lg flex items-center justify-center ${toast.iconColor || 'bg-gray-900'}`}>
                    <span className="text-2xl font-black text-white">{toast.letter}</span>
                  </div>
                ) : (
                  <img
                    src={toast.icon || `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || '14.2.1'}/img/profileicon/29.png`}
                    className="w-14 h-14 rounded-xl border border-white/10 shadow-lg object-cover bg-gray-900"
                    alt="Avatar"
                    onError={(e) => { e.target.onerror = null; e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/29.jpg" }}
                  />
                )}
                {!toast.lucideName && !toast.letter && (
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-black shadow-lg ${statusColor}`} />
                )}
              </div >

              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-black text-white/30 uppercase tracking-[0.25em] mb-1">
                  {toast.title || "SYSTEM NOTIFICATION"}
                </div>
                <div className="text-[15px] font-black text-white truncate leading-tight mb-0.5">{toast.name}</div>
                <div className="text-xs text-gray-400 font-medium truncate italic">{toast.status}</div>
              </div>

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
function MainApp({
  theme, setTheme, visualMode, setVisualMode, language, setLanguage, t, appMode,
  overlaySettings, setOverlaySettings, triggerSocialToast, ddragonVersion,
  isConnected, currentUser, userRank, currentUserHistory, friends, gamePhase,
  setGamePhase, champSelectData, setChampSelectData, isPremium, setIsPremium,
  premiumData, serverGoldUsers, setShowPremiumModal, setErrorModal
}) {
  const onSubscribe = () => setShowPremiumModal(true);
  const [targetSummoner, setTargetSummoner] = useState(null); // Mock search state
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showNotifPanel, setShowNotifPanel] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);

  const [adminMessages, setAdminMessages] = useState(() => {
    try { const saved = localStorage.getItem('oracle_admin_messages'); return saved ? JSON.parse(saved) : []; } catch (e) { return []; }
  });

  const getDeletedMessagesMap = () => {
    try { const saved = localStorage.getItem('oracle_deleted_messages'); return saved ? JSON.parse(saved) : {}; } catch (e) { return {}; }
  };

  const deleteAdminMessage = (id) => {
    setAdminMessages(prev => {
      const next = prev.filter(m => m.id !== id);
      localStorage.setItem('oracle_admin_messages', JSON.stringify(next));

      // Add to deleted blacklist
      const deletedMap = getDeletedMessagesMap();
      deletedMap[id] = true;
      localStorage.setItem('oracle_deleted_messages', JSON.stringify(deletedMap));

      return next;
    });
  };

  // Global Admin Broadcast Fetcher (Firebase)
  useEffect(() => {
    let interval;
    const fetchGlobalBroadcast = async () => {
      try {
        const res = await fetch('https://oracle-73d32-default-rtdb.europe-west1.firebasedatabase.app/broadcast.json');
        if (res.ok) {
          const data = await res.json();
          if (data && data.id) {
            const globalMsg = {
              id: data.id,
              type: 'system',
              title: data.title || 'ORACLE ADMIN',
              name: data.name || data.message || 'Nouvelle notification',
              status: data.status || 'Message système',
              tag: data.tag || 'ANNONCE',
              lucideName: data.lucideName || 'Bell',
              duration: data.duration || 10000,
              iconColor: data.color || 'bg-indigo-500 shadow-indigo-500/50',
              borderColor: data.color || 'bg-indigo-500 shadow-indigo-500/50',
              imageUrl: data.imageUrl || null,
              url: data.url || null
            };

            setAdminMessages(prev => {
              // Vérifier si on a déjà ce message ou s'il a été supprimé
              if (prev.some(m => m.id === globalMsg.id)) return prev;

              const deletedMap = getDeletedMessagesMap();
              if (deletedMap[globalMsg.id]) return prev;

              setTimeout(() => setShowAdminModal(true), 0);

              const next = [globalMsg, ...prev].slice(0, 50);
              localStorage.setItem('oracle_admin_messages', JSON.stringify(next));
              return next;
            });
          }
        }
      } catch (e) {
        // Silent block
      }
    };

    fetchGlobalBroadcast();
    interval = setInterval(fetchGlobalBroadcast, 60000);

    // Keep Local IPC for direct instant previews from Local Admin Panel
    if (window.ipcRenderer) {
      const handler = (_, msg) => {
        setAdminMessages(prev => {
          if (prev.some(m => m.id === msg.id)) return prev;

          const deletedMap = getDeletedMessagesMap();
          if (deletedMap[msg.id]) return prev;

          setTimeout(() => setShowAdminModal(true), 0);

          const next = [msg, ...prev].slice(0, 50);
          localStorage.setItem('oracle_admin_messages', JSON.stringify(next));
          return next;
        });
      };
      window.ipcRenderer.on('admin:broadcast', handler);

      const navHandler = (_, name) => {
        setTargetSummoner({ name, region: searchRegion, skipLcu: false });
        setActiveTab('profile');
      };
      window.ipcRenderer.on('app:navigate-to-profile', navHandler);

      const internalUrlHandler = (_, url) => {
        setBrowserUrl(url);
      };
      window.ipcRenderer.on('app:open-internal-url', internalUrlHandler);

      return () => {
        clearInterval(interval);
        window.ipcRenderer.removeListener('admin:broadcast', handler);
        window.ipcRenderer.removeListener('app:navigate-to-profile', navHandler);
        window.ipcRenderer.removeListener('app:open-internal-url', internalUrlHandler);
      };
    }

    return () => clearInterval(interval);
  }, []);

  const { patchNotes, championList, prefetchedData } = useCommonData();
  const [hasUnreadNotifs, setHasUnreadNotifs] = useState(() => localStorage.getItem('oracle_seen_notifs') !== 'true');
  const [browserUrl, setBrowserUrl] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchRegion, setSearchRegion] = useState('EUW');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [targetChamp, setTargetChamp] = useState('Olaf');
  const [isMinimizing, setIsMinimizing] = useState(false);
  const panelClass = visualMode === 'glass' ? 'glass-panel' : 'opaque-panel';
  const [showSplash, setShowSplash] = useState(true);
  const [splashMessage, setSplashMessage] = useState(t('welcome'));

  useEffect(() => {
    const hasVisited = sessionStorage.getItem('oracle_has_visited');
    if (hasVisited) setSplashMessage(t('welcome_back'));
    else {
      setSplashMessage(t('welcome'));
      sessionStorage.setItem('oracle_has_visited', 'true');
    }
    const timer = setTimeout(() => setShowSplash(false), 2800);
    return () => clearTimeout(timer);
  }, []);

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

  const handleMinimizeRequest = () => {
    setIsMinimizing(true);
    setTimeout(() => {
      window.ipcRenderer.invoke('window:minimize');
      setTimeout(() => setIsMinimizing(false), 500);
    }, 300);
  };

  useEffect(() => {
    window.addEventListener('request-minimize', handleMinimizeRequest);
    return () => window.removeEventListener('request-minimize', handleMinimizeRequest);
  }, []);

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

  useEffect(() => {
    if (!currentUser) return;
    if (!isPremium) {
      if (musicOverlayEnabled) setMusicOverlayEnabled(false);
      if (theme !== 'classic') setTheme('classic');
    }
  }, [isPremium, currentUser]);

  const regions = ['EUW', 'NA', 'KR', 'EUNE', 'BR', 'TR', 'LAS', 'LAN', 'OCE', 'RU', 'JP', 'PH', 'SG', 'TH', 'TW', 'VN'];

  // Click outside notification panel logic
  const notifRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showNotifPanel && notifRef.current && !notifRef.current.contains(event.target)) {
        // Check if the click was on the toggle button itself to avoid double-toggle
        const bellBtn = document.getElementById('bell-button');
        if (bellBtn && bellBtn.contains(event.target)) return;
        
        setShowNotifPanel(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showNotifPanel]);

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
    if (window.ipcRenderer) {
      window.ipcRenderer.invoke('app:update-settings', { autoAccept });
    }
  }, [autoAccept]);

  useEffect(() => {
    localStorage.setItem('oracle_auto_import_runes', autoImportRunes);
    if (window.ipcRenderer) {
      window.ipcRenderer.invoke('app:get-settings').then(s => {
        window.ipcRenderer.invoke('app:set-settings', { ...s, autoImportRunes });
      });
    }
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
    if (window.ipcRenderer) {
      window.ipcRenderer.invoke('app:get-settings').then(s => {
        window.ipcRenderer.invoke('app:set-settings', { ...s, flashPosition });
      });
    }
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

  const teammateSuggestions = useMemo(() => {
    if (!searchQuery || !currentUserHistory || !currentUserHistory.games) return [];

    // Extract unique names from all games in history
    const suggestionsMap = new Map();
    const lowerQuery = searchQuery.toLowerCase();

    currentUserHistory.games.forEach(g => {
      if (g.participants) {
        g.participants.forEach(p => {
          const cName = p.riotIdGameName || p.summonerName;
          if (!cName) return;

          const cTag = p.riotIdTagline ? `#${p.riotIdTagline}` : "";
          const fullName = `${cName}${cTag}`;

          // Do not suggest the user themselves
          if (currentUser && fullName === `${currentUser.gameName}#${currentUser.tagLine}`) return;

          if (fullName.toLowerCase().includes(lowerQuery) && !suggestionsMap.has(fullName.toLowerCase())) {
            suggestionsMap.set(fullName.toLowerCase(), {
              name: fullName,
              champName: p.championName || Object.values(championMap || {}).find(c => c.key === p.championId?.toString())?.id,
              iconId: p.profileIcon
            });
          }
        });
      }
    });

    return Array.from(suggestionsMap.values())
      .sort((a, b) => {
        const nameA = a.name.toLowerCase();
        const nameB = b.name.toLowerCase();
        const exactA = nameA === lowerQuery;
        const exactB = nameB === lowerQuery;
        if (exactA && !exactB) return -1;
        if (!exactA && exactB) return 1;

        const startsA = nameA.startsWith(lowerQuery);
        const startsB = nameB.startsWith(lowerQuery);
        if (startsA && !startsB) return -1;
        if (!startsA && startsB) return 1;

        return nameA.localeCompare(nameB);
      })
      .slice(0, 3);
  }, [searchQuery, currentUserHistory, currentUser]);

  const hasSuggestions = champSuggestions.length > 0 || friendSuggestions.length > 0 || recentSuggestions.length > 0 || teammateSuggestions.length > 0;

  useEffect(() => {
    if ((gamePhase === 'GameStart' || gamePhase === 'InProgress') && overlaySettings.loadingScreen) {
      window.ipcRenderer.invoke('app:show-live');
    } else if (overlaySettings.testMode) {
      window.ipcRenderer.invoke('app:show-live');
    } else if (gamePhase === 'None') {
      window.ipcRenderer.invoke('app:hide-live');
      
      // Auto-revert to dashboard when game ends if user was on the live match tracker
      if (activeTab === 'livematch') {
        setActiveTab('dashboard');
      }
    }
  }, [gamePhase, overlaySettings.loadingScreen, overlaySettings.testMode, activeTab]);




  return (
    <div
      className={cn("flex h-screen w-full overflow-hidden relative font-sans selection:bg-accent-primary/30 text-gray-900 dark:text-gray-900 dark:text-gray-100 rounded-2xl shadow-2xl border border-gray-200 dark:border-white/10 transition-all duration-300", isMinimizing ? "scale-95 opacity-0" : "scale-100 opacity-100")}
    >

      {/* Background Layer - CLEAN PREMIUM STUDIO LIGHTING */}
      <div className="absolute inset-0 z-0 transition-colors duration-700 overflow-hidden bg-[#f5f5f7] dark:bg-[#0b0c10]">
        {/* Soft, beautiful radial highlight from the top, matching the accent-primary exactly */}
        <div className="absolute inset-0 opacity-10 dark:opacity-[0.15] pointer-events-none transition-colors duration-1000" style={{ backgroundImage: 'radial-gradient(circle at 50% -10%, rgb(var(--accent-primary)), transparent 70%)' }}></div>

        {/* Very subtle secondary highlight at bottom to give depth */}
        <div className="absolute inset-0 opacity-5 dark:opacity-[0.05] pointer-events-none transition-colors duration-1000" style={{ backgroundImage: 'radial-gradient(circle at 50% 110%, rgb(var(--accent-primary)), transparent 60%)' }}></div>

        {/* Glass Overlays for visual mode */}
        {visualMode === 'glass' && (
          <div className="absolute inset-0 bg-white/40 dark:bg-black/20 backdrop-blur-[30px] transition-all duration-1000 pointer-events-none filter saturate-[1.2]"></div>
        )}

        {/* Ambient Floating Dust Particles */}
        <FloatingParticles />
      </div>

      {/* SPLASH SCREEN OVERLAY */}
      <div className={cn(
        "fixed inset-0 z-[200] flex flex-col items-center justify-center transition-opacity duration-700 pointer-events-none",
        showSplash ? "opacity-100" : "opacity-0"
      )}>
        {/* Minimalist Loading Screen */}
        <div className="absolute inset-0 bg-[#f5f5f7] dark:bg-[rgb(var(--bg-main))]" />

        {/* Glowing Blurred Shape to match Dribbble Orange Blob */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotate: -25 }}
            animate={{ scale: 1, opacity: 0.6, rotate: 15 }}
            transition={{ duration: 3, ease: "easeOut" }}
            className="absolute rounded-[100%] w-[600px] h-[350px] md:w-[1200px] md:h-[700px] border-[80px] md:border-[160px] border-accent-primary filter blur-[60px] md:blur-[100px] mix-blend-screen"
          />
        </div>

        <div className={cn("relative z-10 flex flex-col items-center justify-center h-full w-full transition-all duration-700 transform", showSplash ? "scale-100 outline-none" : "scale-95 opacity-0")}>
          <motion.div
            initial="hidden" animate="visible"
            variants={{
              hidden: {
                loading_empty_slot: "Empty",
                loading_winrate: "Global Winrate",
                loading_record: "Record",
                streak_wins: "WINS STREAK",
                streak_losses: "LOSSES STREAK",
                attitude_precise: "Precise",
                attitude_struggling: "Struggling",
                attitude_on_fire: "On Fire",
                attitude_tilt: "Likely Tilting",
                attitude_expert: "Expert",
                attitude_veteran: "Veteran",
                attitude_constant: "Constant",
              },
              visible: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
            }}
            className="flex text-7xl md:text-9xl font-black uppercase tracking-[0.3em] overflow-hidden text-gray-900 dark:text-white drop-shadow-[0_0_30px_rgb(var(--accent-primary))] select-none h-fit pt-4"
          >
            {Array.from("ORACLE").map((char, i) => (
              <motion.span
                key={i}
                variants={{
                  hidden: {
                    loading_empty_slot: "Empty",
                    loading_winrate: "Global Winrate",
                    loading_record: "Record",
                    streak_wins: "WINS STREAK",
                    streak_losses: "LOSSES STREAK",
                    attitude_precise: "Precise",
                    attitude_struggling: "Struggling",
                    attitude_on_fire: "On Fire",
                    attitude_tilt: "Likely Tilting",
                    attitude_expert: "Expert",
                    attitude_veteran: "Veteran",
                    attitude_constant: "Constant", y: "150%", opacity: 0
                  },
                  visible: { y: "0%", opacity: 1, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } }
                }}
                className="inline-block"
              >
                {char}
              </motion.span>
            ))}
          </motion.div>
          <motion.p
            initial={{ opacity: 0, filter: 'blur(5px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
            className="text-gray-500 font-medium tracking-widest mt-8 text-sm uppercase select-none drop-shadow-md"
          >
            Bon retour...
          </motion.p>
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
              <NavItem active={activeTab === 'leaderboards'} onClick={() => { setActiveTab('leaderboards'); }} icon={<Trophy size={18} />} label="Leaderboards" />
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
          <div className="mt-auto px-4 w-full relative pb-4">
            {(gamePhase === 'ChampSelect' || gamePhase === 'InProgress' || gamePhase === 'GameStart') && (
              <button
                onClick={() => setActiveTab('livematch')}
                className="w-full flex flex-col p-3 rounded-2xl bg-[#0a0a0c] border border-accent-primary/40 relative overflow-hidden group shadow-[0_0_20px_rgba(59,130,246,0.08)] transition-all hover:border-accent-primary hover:shadow-[0_0_30px_rgba(59,130,246,0.2)]"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-accent-primary/20 via-transparent to-transparent opacity-70 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-accent-primary/40 to-transparent blur-xl"></div>
                <div className="flex items-center justify-between relative z-10 w-full mb-1">
                  <div className="flex items-center gap-2">
                    <div className="relative flex items-center justify-center">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-accent-primary opacity-50 animate-ping"></span>
                      <span className="relative inline-flex rounded-full h-2 bg-accent-primary shadow-[0_0_10px_rgba(59,130,246,1)] w-2"></span>
                    </div>
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.2em] leading-none mt-0.5">{gamePhase === 'ChampSelect' ? "Draft Live" : "Match Live"}</span>
                  </div>
                  <Swords size={12} className="text-accent-primary" />
                </div>
                <div className="text-[8px] text-gray-400 font-bold uppercase tracking-[0.1em] text-left w-full relative z-10 opacity-70">
                  Vue Tracker Dynamique <ChevronRight size={10} className="inline opacity-50" />
                </div>
              </button>
            )}
          </div>

          <div className="flex flex-col gap-2">
            {/* Removed Messagerie button per user request */}
            <SidebarProfile
              currentUser={currentUser}
              rankedStats={userRank}
              history={currentUserHistory}
              isConnected={isConnected}
              appMode={appMode}
              t={t}
              ddragonVersion={ddragonVersion}
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
                          // PASSIVE NORMALIZATION: Remove spaces around # if user typed them
                          const sanitizedName = name.replace(/\s*#\s*/g, '#');

                          // Determine if we should enforce external search (skip LCU)
                          const myRegion = currentUser?.platformId ? currentUser.platformId.replace(/[0-9]/g, '').toUpperCase() : 'EUW';
                          const skipLcu = searchRegion !== myRegion;

                          setRecentSearches(prev => {
                            const filtered = prev.filter(s => s.name.toLowerCase() !== sanitizedName.toLowerCase());
                            return [{ name: sanitizedName, region: searchRegion, timestamp: Date.now() }, ...filtered].slice(0, 50);
                          });

                          // Pass skipLcu flag in the target object so ProfileView can use it
                          setTargetSummoner({ name: sanitizedName, region: searchRegion, skipLcu });
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
                          <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || "14.2.1"}/img/profileicon/${f.icon || 29}.png`} onError={(e) => { e.target.onerror = null; e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${f.icon || 29}.jpg` }} className="w-8 h-8 rounded-full border border-gray-200 dark:border-white/10 group-hover:border-green-400" />
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

                    {/* Teammate Suggestions */}
                    {teammateSuggestions.map(t => (
                      <div key={`tm-${t.name}`} onClick={() => {
                        setTargetSummoner({ name: t.name, region: searchRegion });
                        setActiveTab('profile');
                        setSearchQuery('');
                        setShowSuggestions(false);
                      }} className="px-4 py-3 flex items-center gap-3 hover:bg-white/10 cursor-pointer transition-colors group">
                        <img src={t.champName ? `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion}/img/champion/${t.champName}.png` : `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || "14.2.1"}/img/profileicon/${t.iconId || 29}.png`} onError={(e) => {
                          if (!t.champName) {
                            e.target.onerror = null;
                            e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${t.iconId || 29}.jpg`;
                          }
                        }} className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10 group-hover:border-accent-primary" />
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-gray-900 dark:text-gray-100 uppercase">{t.name}</span>
                          <span className="text-[9px] text-gray-500 uppercase tracking-widest flex items-center gap-1 group-hover:text-accent-primary">
                            Joueur Récent <span className="opacity-50">•</span> Match History
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Window Controls & Settings */}
            <div className="flex items-center gap-2 no-drag">
              <button
                onClick={() => {
                  try {
                    require('electron').shell.openExternal('https://discord.gg/tUn9USj5pq');
                  } catch (e) { window.open('https://discord.gg/tUn9USj5pq', '_blank'); }
                }}
                className={cn(
                  "w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-300",
                  "text-indigo-400 hover:bg-indigo-500/20 hover:text-indigo-300"
                )}
                title="Rejoindre le Discord d'Oracle"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
                </svg>
              </button>
              <button
                id="bell-button"
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
            {!showSplash && (!isConnected || !currentUser) && !['esports', 'watch', 'settings', 'profile', 'leaderboards', 'matchups', 'training', 'tutorial'].includes(activeTab) ? (
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
                  serverGoldUsers={serverGoldUsers}
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
                {activeTab === 'livematch' && <LiveMatchView t={t} autoImportRunes={autoImportRunes} flashPosition={flashPosition} currentUser={currentUser} setTargetChamp={setTargetChamp} setActiveTab={setActiveTab} />}

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
                {activeTab === 'training' && <TrainingView t={t} panelClass={panelClass} />}

                {activeTab === 'tutorial' && <TutorialView panelClass={panelClass} t={t} />}

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
                  currentUser={currentUser}
                  setShowPremiumModal={setShowPremiumModal}
                />}

                {activeTab === 'subscription' && <SubscriptionView
                  t={t}
                  panelClass={panelClass}
                  isPremium={isPremium}
                  setIsPremium={setIsPremium}
                  setActiveTab={setActiveTab}
                  currentUser={currentUser}
                />}
              </div>
            )}
          </div>

          {/* Notification Dropdown Overlay */}
          {showNotifPanel && (
            <div ref={notifRef} className="absolute top-16 right-6 w-[450px] max-h-[calc(100vh-100px)] z-[110] animate-in fade-in zoom-in-95 duration-200 origin-top-right flex flex-col">
              <div className="bg-[#131317]/95 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.7)] flex flex-col overflow-hidden min-h-0">
                <NotificationsView
                  panelClass="p-6"
                  setActiveTab={(tab) => { setActiveTab(tab); setShowNotifPanel(false); }}
                  patchNotes={patchNotes}
                  prefetchedData={prefetchedData}
                  adminMessages={adminMessages}
                  onDeleteAdminMessage={deleteAdminMessage}
                  onShowNews={(article) => { setSelectedArticle(article); setShowNotifPanel(false); }}
                  onClose={() => setShowNotifPanel(false)}
                />
              </div>
            </div>
          )}

          {/* Admin Notification Modal */}
          {showAdminModal && (
            <div className="fixed inset-0 z-[999999] flex items-center justify-center animate-in fade-in duration-300 backdrop-blur-md bg-black/60">
              <div className="glass-panel max-w-2xl w-full p-8 mx-4 animate-in zoom-in-95 duration-300 shadow-2xl border border-white/10 dark:border-white/5 relative flex flex-col max-h-[85vh]">
                <button onClick={() => setShowAdminModal(false)} className="absolute top-4 right-4 p-2 rounded-full hover:bg-white/10 text-white transition-colors">
                  <X size={24} />
                </button>

                <div className="flex items-center gap-3 mb-6 shrink-0">
                  <Bell size={28} className="text-accent-primary animate-pulse" />
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">Centre de Notifications Oracle</h3>
                </div>

                <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar space-y-4">
                  {!adminMessages || adminMessages.length === 0 ? (
                    <div className="text-center py-10 text-white/50 italic">Aucune notification système récente.</div>
                  ) : adminMessages.map((msg, idx) => {
                    const MIcon = msg.lucideName ? ({ 'Target': Target, 'Activity': Activity, 'Sparkles': Sparkles, 'Skull': Skull, 'AlertCircle': AlertTriangle }[msg.lucideName] || Bell) : Bell;
                    return (
                      <div key={msg.id || idx} className="relative group overflow-hidden bg-black/40 hover:bg-black/60 border border-white/5 hover:border-white/20 transition-all rounded-2xl p-5 flex gap-4 items-start">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${msg.iconColor || 'bg-accent-primary/20 text-accent-primary'}`}>
                          <MIcon size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <span className="text-xs font-black uppercase tracking-widest text-accent-primary">{msg.title || 'ANNONCE'}</span>
                              <span className="text-[10px] bg-white/10 px-2 py-0.5 rounded-full text-white/60">{msg.status || 'NOUVEAU'}</span>
                            </div>
                            <button
                              onClick={(e) => { e.stopPropagation(); deleteAdminMessage(msg.id); }}
                              className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-red-500/20 text-red-500 rounded-lg transition-all"
                              title="Supprimer"
                            >
                              <XCircle size={16} />
                            </button>
                          </div>
                          <h4 className="text-lg font-bold text-white mb-2 leading-tight">{msg.name}</h4>
                          {msg.desc && <p className="text-sm text-gray-300 leading-relaxed mb-3">{msg.desc}</p>}
                          {msg.url && (
                            <button onClick={() => window.ipcRenderer.send('app:open-internal-url', msg.url)} className="inline-flex items-center gap-2 text-xs font-bold text-accent-primary hover:text-white bg-accent-primary/10 hover:bg-accent-primary/30 px-3 py-1.5 rounded-lg transition-colors cursor-pointer text-left">
                              <ExternalLink size={14} /> Voir les détails
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="mt-8 pt-4 shrink-0 flex justify-end">
                  <button onClick={() => setShowAdminModal(false)} className="w-full font-black uppercase tracking-widest py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all border border-white/10">
                    Fermer le centre
                  </button>
                </div>
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
                {selectedArticle.url && (
                  <button
                    onClick={() => window.ipcRenderer.send('app:open-internal-url', selectedArticle.url)}
                    className="mt-4 w-full py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-white text-sm font-bold flex items-center justify-center gap-2 transition-all group cursor-pointer"
                  >
                    Lire l'article complet
                    <ExternalLink size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </button>
                )}
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
function ProfileWindow({ summonerName, theme, visualMode, t, ddragonVersion }) {
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
              <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || "14.2.1"}/img/profileicon/${user.profileIconId}.png`} onError={(e) => { e.target.onerror = null; e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${user.profileIconId}.jpg` }} className="w-32 h-32 rounded-3xl shadow-2xl" />
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
function SidebarProfile({ currentUser, rankedStats, history, isConnected, appMode, t, onClick, ddragonVersion }) {
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
    return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${key === 'emerald' ? 'platinum' : key}.png`;
  };

  return (
    <div onClick={!isConnected ? undefined : onClick} className={cn("relative rounded-2xl p-3 transition-colors flex items-center gap-4 select-none", !isConnected ? "cursor-default opacity-80" : "cursor-pointer group hover:bg-white dark:bg-white/5")}>
      {/* Avatar Container with Badges */}
      <div className="relative shrink-0 mt-1 mb-1">
        {/* Server Badge (Top Right) */}
        <div className="absolute -top-1.5 -right-1.5 bg-[#5c7ce5] text-gray-900 dark:text-gray-100 text-[9px] font-bold px-1.5 py-0.5 rounded-md z-20 shadow-sm border border-[#5c7ce5] shadow-blue-500/20 uppercase">
          {currentUser.region || "EUW"}
        </div>

        {/* Main Icon */}
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || "14.2.1"}/img/profileicon/${currentUser.profileIconId}.png`}
          onError={(e) => { e.target.onerror = null; e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${currentUser.profileIconId}.jpg` }}
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
            <img src={getRankIcon(solo.tier)} className={cn('w-4 h-4 object-contain', (solo.tier || '').toUpperCase() === 'EMERALD' && 'hue-rotate-[-40deg] saturate-150 brightness-110')} alt={solo.tier} />
            <span className="text-gray-300 font-bold text-xs uppercase tracking-wide truncate">
              {solo.tier === 'UNRANKED' ? 'Unranked' : `${solo.tier} ${solo.division}`}
            </span>
          </div>
          {/* Online Status (Replacing Flex) */}
          <div className="flex items-center gap-1.5 mt-1">
            <div className={cn("w-1.5 h-1.5 rounded-full", isConnected ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" : "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.4)]")}></div>
            <span className={cn("font-black text-[9px] uppercase tracking-[0.15em]", isConnected ? "text-green-500/80" : "text-red-500/60")}>
              {isConnected ? "Online" : "Compte déconnecté"}
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

  const [isLpLoading, setIsLpLoading] = useState(false);

  useEffect(() => {
    if (displayUser?.gameName) {
      const nameQuery = displayUser.gameName + "#" + displayUser.tagLine;
      const rKey = displayUser.region || 'euw';

      setIsLpLoading(true);
      window.ipcRenderer.invoke('scraper:get-recent-lp', nameQuery, rKey)
        .then(res => {
          if (res && res.length > 0) {
            setLpGains(res);
            window.latestLpGainsCache = res;
          } else {
            setLpGains([]);
          }
        }).catch(err => {
          console.log("LP gains fetch failed", err);
          setLpGains([]);
        }).finally(() => setIsLpLoading(false));

      // NEW: If external player, fetch their history too
      if (displayUser.puuid?.startsWith('ext~')) {
        window.ipcRenderer.invoke('scraper:get-match-history', nameQuery, rKey)
          .then(h => { if (h) setMatchHistory(h); });
      }
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
        objTaken: {
          loading_empty_slot: "Empty",
          loading_winrate: "Global Winrate",
          loading_record: "Record",
          streak_wins: "WINS STREAK",
          streak_losses: "LOSSES STREAK",
          attitude_precise: "Precise",
          attitude_struggling: "Struggling",
          attitude_on_fire: "On Fire",
          attitude_tilt: "Likely Tilting",
          attitude_expert: "Expert",
          attitude_veteran: "Veteran",
          attitude_constant: "Constant", text: "0", down: false
        }
      }
    };

    const sevenDaysAgo = Date.now() - (7 * 24 * 60 * 60 * 1000);
    const recentGames = matchHistory.filter(g => {
      const creation = g.gameCreation > 1e11 ? g.gameCreation : g.gameCreation * 1000;
      return creation >= sevenDaysAgo && [400, 420, 440].includes(g.queueId) && g.gameDuration > 240;
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

  const { lastAnalyzableMatch, p } = useMemo(() => {
    if (!matchHistory || matchHistory.length === 0 || !displayUser) return { lastAnalyzableMatch: null, p: {} };
    // Find the first valid match (Normal Draft, Ranked Solo, Ranked Flex) with a minimum duration
    const validMatch = matchHistory.find(g => [400, 420, 440].includes(g.queueId) && g.gameDuration > 240);

    if (!validMatch) return { lastAnalyzableMatch: null, p: {} };

    const ident = validMatch.participantIdentities?.find(i => i.player.puuid === displayUser.puuid);
    const participant = validMatch.participants.find(part => part.participantId === ident?.participantId) || {};
    return { lastAnalyzableMatch: validMatch, p: participant };
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
                <img src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${displayUser?.profileIconId || 29}.png`} onError={(e) => { e.target.onerror = null; e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${displayUser?.profileIconId || 29}.jpg` }} className="w-24 h-24 rounded-3xl border-2 border-gray-200 dark:border-white/10 shadow-2xl" />
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
                allRolesMeta[ROLES[currentRoleIdx]].data.slice(0, 5).map((c, i) => (
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

            <div className="relative z-10 flex flex-col items-center text-center mt-auto w-full px-2">
              <div className="text-gray-900 dark:text-gray-100 font-black uppercase text-sm mb-1 tracking-tight">{t('last_game')}</div>
              {lastAnalyzableMatch ? (
                <>
                  <div className="text-gray-900 dark:text-gray-100/30 text-[10px] font-bold uppercase tracking-widest mb-4 italic truncate w-full px-1">
                    {getQueueName(lastAnalyzableMatch, t)} • {lastAnalyzableMatch.gameDuration ? Math.floor(lastAnalyzableMatch.gameDuration / 60) + ":" + (lastAnalyzableMatch.gameDuration % 60).toString().padStart(2, '0') : "00:00"} • {(() => { try { return new Date(lastAnalyzableMatch.gameCreation).toLocaleDateString(); } catch { return "-"; } })()}
                  </div>
                  <div className="text-lg font-black text-gray-900 dark:text-gray-100">
                    {p.stats?.kills || 0} <span className="text-gray-900 dark:text-gray-100/20">/</span> <span className="text-red-500">{p.stats?.deaths || 0}</span> <span className="text-gray-900 dark:text-gray-100/20">/</span> {p.stats?.assists || 0}
                  </div>
                  <div className="text-[10px] font-black text-blue-400 uppercase tracking-widest mt-1">
                    {(((p.stats?.kills || 0) + (p.stats?.assists || 0)) / Math.max(1, p.stats?.deaths || 1)).toFixed(2)} KDA
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center my-4 opacity-50">
                  <Activity size={24} className="mb-2 animate-pulse text-gray-500 dark:text-gray-400" />
                  <span className="text-[9px] uppercase tracking-widest font-black text-gray-600 dark:text-gray-300">Aucune partie analysable</span>
                </div>
              )}
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
          summonerName={displayUser?.gameName ? (displayUser.tagLine ? `${displayUser.gameName}#${displayUser.tagLine}` : displayUser.gameName) : (displayUser?.displayName || displayUser?.name)}
          region={displayUser?.region || 'euw'}
          panelClass={cn(panelClass, "min-h-[140px]")}
          t={t}
          isPremium={isPremium && (!currentUser || displayUser?.puuid === currentUser?.puuid)}
          onSubscribe={() => setActiveTab('subscription')}
          lpGains={lpGains}
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

function ProfileView({ t, panelClass, currentUser, targetSummoner, onSearch, onChampClick, onBack, overlaySettings, ddragonVersion, isPremium, onSubscribe, serverGoldUsers }) {
  const [displayUser, setDisplayUser] = useState(null);
  const [rankedStats, setRankedStats] = useState(null);
  const [history, setHistory] = useState([]);
  const [fullHistory, setFullHistory] = useState([]);
  const [teammates, setTeammates] = useState([]);
  const fetchedIconCache = useRef({});
  const [topChamps, setTopChamps] = useState([]);
  const [roleStats, setRoleStats] = useState({ TOP: 0, JUNGLE: 0, MIDDLE: 0, BOTTOM: 0, SUPPORT: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [lastChampId, setLastChampId] = useState(null);
  const [selectedGame, setSelectedGame] = useState(null);

  const [filter, setFilter] = useState('All');
  const [activeGame, setActiveGame] = useState(null);
  const [error, setError] = useState(null);
  const [debugPhase, setDebugPhase] = useState("");
  const [championMap, setChampionMap] = useState({});
  const [presenceStatus, setPresenceStatus] = useState('offline');
  const [lpGains, setLpGains] = useState([]);
  const [behavioral, setBehavioral] = useState({ consistency: 'A', tilt: 'Resilient', objective: 'Controller', synergy: 'High', vision: 'Top 10%', aggression: 'Medium' });

  useEffect(() => {
    let active = true;
    (async () => {
      if (!teammates || teammates.length === 0) return;

      const top20 = teammates.slice(0, 20);
      let mapChangedCache = false;
      const cachedRecovery = top20.map(t => {
        if (t.icon === 29 && t.searchName in fetchedIconCache.current) {
          if (fetchedIconCache.current[t.searchName] !== 29) mapChangedCache = true;
          return { ...t, icon: fetchedIconCache.current[t.searchName] };
        }
        return t;
      });
      if (mapChangedCache) {
        setTeammates(cachedRecovery);
        return;
      }

      const needed = cachedRecovery.filter(t => t.icon === 29 && !(t.searchName in fetchedIconCache.current));
      if (needed.length === 0) return;

      const logFrontend = (msg) => { window.ipcRenderer.invoke('scraper:log', `[Frontend FastIcon] ${msg}`).catch(() => { }); };
      logFrontend(`Attempting to fetch ${needed.length} icons...`);

      const newMap = {};
      const newAttempted = new Map();
      for (const t of needed) {
        if (!active) break;
        try {
          const region = displayUser?.region || currentUser?.region || 'euw';
          const res = await window.ipcRenderer.invoke('scraper:fast-icon-fetch', t.searchName, region);
          newAttempted.set(t.searchName, res || 29);
          if (res && res !== 29) {
            logFrontend(`Success for ${t.searchName}: ${res}`);
            newMap[t.name] = res;
          }
        } catch (e) {
          logFrontend(`Error for ${t.searchName}: ${e}`);
          newAttempted.set(t.searchName, 29);
        }
      }

      if (active) {
        newAttempted.forEach((id, name) => { fetchedIconCache.current[name] = id; });
        if (Object.keys(newMap).length > 0) {
          console.log(`[FastIcon] Updating UI with ${Object.keys(newMap).length} new icons.`);
          setTeammates(prev => [...prev].map(p => newMap[p.name] ? { ...p, icon: newMap[p.name] } : p));
        }
      }
    })();
    return () => { active = false; };
  }, [teammates, displayUser?.region]);

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
        // CRITICAL: If we only have a name (from search bar), we MUST treat it as an external search
        // and generate a PUUID to trigger the fetch logic below.
        let localTarget = targetSummoner;
        if (localTarget && !localTarget.puuid && localTarget.name) {
          localTarget = { ...localTarget, puuid: `ext~${localTarget.name}~${localTarget.region || 'EUW'}`, isExternal: true };
        }

        if (localTarget) {
          if (cachedUser) {
            user = cachedUser;
          } else {
            console.log("[ProfileView] Searching for targetSummoner:", localTarget);
            const { name, region, skipLcu, puuid } = (typeof localTarget === 'string')
              ? { name: localTarget, region: null, skipLcu: false, puuid: null }
              : localTarget;

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
          const isExternal = user?.isExternal || targetSummoner?.skipLcu;
          const hasRiotKey = !!(overlaySettings?.riotApiKey);

          const [stats, matches, mastery] = await Promise.all([
            isExternal
              ? Promise.resolve({ error: "scraper has stats in user object" })
              : window.ipcRenderer.invoke('lcu:get-ranked-stats', user.puuid),

            isExternal
              ? window.ipcRenderer.invoke('scraper:get-match-history', user.isExternal ? user.puuid : (user.gameName ? `${user.gameName}#${user.tagLine}` : user.displayName), user.region)
              : window.ipcRenderer.invoke('lcu:get-match-history', user.puuid, 0, 150),

            isExternal
              ? Promise.resolve([])
              : window.ipcRenderer.invoke('lcu:get-champion-mastery', user.puuid)
          ]);

          // Normalize League Stats if from Riot API or Scraper
          let normalizedStats = stats;
          if (isExternal) { // FIXED!
            const solo = user.ranks?.solo || {};
            const flex = user.ranks?.flex || {};
            normalizedStats = {
              queueMap: {
                RANKED_SOLO_5x5: {
                  tier: solo.tier || user.tier || "UNRANKED",
                  division: solo.division || user.division || "",
                  leaguePoints: solo.lp || user.lp || 0,
                  wins: solo.wins || user.wins || 0,
                  losses: solo.losses || user.losses || 0,
                  winRatio: solo.wins ? Math.round((solo.wins / (solo.wins + solo.losses)) * 100) : 0
                },
                RANKED_FLEX_SR: { 
                  tier: flex.tier || "UNRANKED", 
                  division: flex.division || "",
                  leaguePoints: flex.lp || 0,
                  wins: flex.wins || 0,
                  losses: flex.losses || 0
                }
              }
            };
          } else if (hasRiotKey && Array.isArray(stats)) {
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

              const gamesForTeammates = recentGames.filter(g => g.queueId !== 0).slice(0, 15);

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

                recentGames.slice(0, 50).forEach(g => {
                  // Find self in summary
                  const iden = g.participantIdentities.find(i => i.player.puuid === user.puuid);
                  if (!iden) return;

                  const part = g.participants.find(p => p.participantId === iden.participantId);
                  if (!part) return;

                  // Champ Stats
                  const cid = part.championId;
                  // Scraper provides part.championName, if native LCU we use championMap
                  const cName = part.championName && part.championName !== "Unknown" ? part.championName : (championMap[cid] || "Unknown");

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

                  // Role Stats - User exactly requested Draft, SoloQ, Flex
                  const qId = parseInt(g.queueId);
                  const isSR = [400, 420, 440].includes(qId);

                  if (isSR) {
                    const explicitTeamPos = (part.teamPosition || part.individualPosition || part.position || "").toUpperCase();
                    const pos = explicitTeamPos || (part.timeline?.lane || part.lane || "").toUpperCase();
                    const subRole = (part.timeline?.role || part.role || "").toUpperCase();
                    const hasSmite = part.spell1Id === 11 || part.spell2Id === 11;

                    let validRole = true;
                    if (explicitTeamPos === 'UTILITY' || subRole === 'DUO_SUPPORT' || subRole === 'SUPPORT' || pos === 'UTILITY' || pos === 'SUPPORT') {
                      roleCounts.SUPPORT++;
                    } else if (explicitTeamPos === 'BOTTOM' || explicitTeamPos === 'BOT' || subRole === 'DUO_CARRY' || pos === 'BOTTOM' || pos === 'BOT') {
                      roleCounts.BOTTOM++;
                    } else if (explicitTeamPos === 'JUNGLE' || explicitTeamPos === 'JGL' || ((pos === 'JUNGLE' || pos === 'JGL') && hasSmite)) {
                      roleCounts.JUNGLE++;
                    } else if (explicitTeamPos === 'TOP' || pos === 'TOP') {
                      roleCounts.TOP++;
                    } else if (explicitTeamPos === 'MIDDLE' || explicitTeamPos === 'MID' || pos === 'MIDDLE' || pos === 'MID') {
                      roleCounts.MIDDLE++;
                    } else {
                      validRole = false;
                    }

                    if (validRole) {
                      roleCounts.total++;
                    }
                  }
                });

                const sortedChamps = Object.values(champStats).sort((a, b) => b.count - a.count).slice(0, 7);
                setTopChamps(sortedChamps);
                setRoleStats(roleCounts);
              } catch (e) {
                console.error("Top Champ Calc Error", e);
              }

              // Fetch LP Gains & Rank History parallel
              const regionForLp = user.region || currentUser?.region || 'EUW';
              const nameForLp = (user.gameName && user.tagLine) ? `${user.gameName}#${user.tagLine}` : (user.gameName || user.displayName || user.summonerName);

              window.ipcRenderer.invoke('scraper:get-recent-lp', nameForLp, regionForLp)
                .then(data => { if (data?.length) setLpGains(data); })
                .catch(err => console.log('LP error', err));

              // Pre-fetch rank history so it's ready for the graph modal
              window.ipcRenderer.invoke('scraper:get-rank-history', nameForLp, regionForLp)
                .catch(err => console.log('Rank history pre-fetch error', err));

              // Fetch full games parallel for TEAMMATES
              Promise.all(gamesForTeammates.map(g =>
                window.ipcRenderer.invoke('lcu:get-game', g.gameId)
                  .then(res => (res && res.participants) ? res : g)
                  .catch(() => g)
              )).then(fullGames => {
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

                      // Detect and skip bots instantly
                      const id = identities.find(i => i.participantId == p.participantId);
                      let puuid = p.puuid || (id && id.player && id.player.puuid);

                      // Only filter if we POSITIVELY know it's a bot. Missing PUUID does not mean bot in LCU match format.
                      if (p.botDifficulty || puuid === "0" || puuid === "00000000-0000-0000-0000-000000000000") return;
                      if (id && id.player && (id.player.summonerId === 0 || id.player.summonerId === "0" || id.player.summonerId === "")) return;

                      // Try to get Name + Tag
                      let name = p.gameName || p.riotIdGameName || p.summonerName;
                      let tag = p.riotIdTagLine || "";
                      let icon = p.profileIconId || 29;

                      if (id && id.player) {
                        name = id.player.gameName || id.player.summonerName || name;
                        tag = id.player.tagLine || tag;
                        icon = id.player.profileIcon || icon;
                      }

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
                          championId: p.championId,
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

                const calculatedTeammates = Object.values(partnerCounts).sort((a, b) => b.count - a.count || b.lastSeen - a.lastSeen).slice(0, 7);

                setTeammates(calculatedTeammates);
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
        let durationSec = g.gameDuration || 1200;
        if (durationSec > 10000) durationSec = durationSec / 1000;
        const durationMin = Math.max(1, durationSec) / 60;
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
        const durationSec = g.gameDuration > 10000 ? g.gameDuration / 1000 : g.gameDuration;
        totalTime += durationSec;
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
      let durationSec = g.gameDuration || 1200;
      if (durationSec > 10000) durationSec = durationSec / 1000; // handle milliseconds
      const min = Math.max(1, durationSec) / 60;
      const totalCS = (p?.stats?.totalMinionsKilled || 0) + (p?.stats?.neutralMinionsKilled || 0);
      return totalCS / min;
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
    return <GlobalFullScreenLoader text="Chargement..." subtext="Les données sont en train d'être récupéré..." />;
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

  // Determines if the avatar should have the Golden aesthetic (Premium Users)
  let isDisplayUserPremium = false;

  if (displayUser) {
    if (displayUser.puuid === 'dd7cdf6e-a21e-5393-8ce4-be7be5f59c4e') {
      isDisplayUserPremium = true;
    } else if (premiumUsers.some(p => {
      const uName = (displayUser.gameName || displayUser.displayName || displayUser.summonerName || "").toLowerCase().replace(/\s/g, '');
      const pName = p.name.toLowerCase().replace(/\s/g, '');
      const uTag = (displayUser.tagLine || "").toLowerCase();
      if (!uName) return false;
      if (uName === pName) {
        if (!uTag || uTag === 'euw' || uTag === p.tag) return true;
      }
      return false;
    })) {
      isDisplayUserPremium = true;
    } else if (serverGoldUsers && Object.keys(serverGoldUsers).length > 0) {
      let gameName = displayUser.gameName || displayUser.displayName || displayUser.summonerName || "";
      let tagLine = displayUser.tagLine || "";

      if (gameName.includes('#')) {
        const parts = gameName.split('#');
        gameName = parts[0];
        tagLine = tagLine || parts[1];
      }

      // LCU natively strips the tagline on some /by-name/ endpoints.
      // Recover the exact tag from the original search query.
      if (!tagLine && targetSummoner && targetSummoner.name && targetSummoner.name.includes('#')) {
        const queryParts = targetSummoner.name.split('#');
        // Update gameName too if it was totally missing, otherwise keep the LCU provided one
        if (!gameName) gameName = queryParts[0];
        tagLine = queryParts[1];
      }

      const formattedUser = `${gameName}#${tagLine}`;
      let latestData = null;

      for (const key in serverGoldUsers) {
        try {
          let base64 = key.replace(/-/g, '+').replace(/_/g, '/');
          while (base64.length % 4) base64 += '=';
          const dec = decodeURIComponent(escape(atob(base64)));

          const cleanDec = dec.replace(/\s/g, '').toLowerCase();
          const cleanFormatted = formattedUser.replace(/\s/g, '').toLowerCase();

          if (cleanDec === cleanFormatted) {
            const d = serverGoldUsers[key];
            if (!latestData || (d.updatedAt || 0) > (latestData.updatedAt || 0)) {
              latestData = d;
            }
          }
        } catch (e) { }
      }

      if (latestData && latestData.active) {
        if (!((latestData.type === 'TEMPORARY') && latestData.expiresAt && Date.now() > latestData.expiresAt)) {
          isDisplayUserPremium = true;
        }
      }
    }
  }

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
              <img src={`https://ddragon.leagueoflegends.com/cdn/15.4.1/img/profileicon/${displayUser?.profileIconId || 29}.png`} onError={(e) => { e.target.onerror = null; e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${displayUser?.profileIconId || 29}.jpg` }} className={cn("w-28 h-28 rounded-[2rem] border-4 shadow-2xl relative z-10 transition-all", isDisplayUserPremium ? "border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)]" : "border-[#1e1e24]")} />
              <div className="absolute -top-3 -left-3 bg-[#5c7ce5] text-white font-bold px-2 py-0.5 rounded-lg text-xs shadow-lg z-20 uppercase">{displayUser?.region || "EUW"}</div>
              {isDisplayUserPremium && (
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
              <div className="relative group mb-0 leading-tight">
                <h1 className={cn("text-3xl font-semibold tracking-tight italic inline-block", isDisplayUserPremium ? "text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 drop-shadow-sm" : "text-gray-900 dark:text-gray-100")}>{displayUser?.gameName || displayUser?.displayName || "Summoner"}</h1>
              </div>
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
            <div className="bg-white dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 p-4 flex flex-col gap-3 h-[675px] overflow-hidden shadow-2xl">
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
              summonerName={displayUser?.gameName ? (displayUser.tagLine ? `${displayUser.gameName}#${displayUser.tagLine}` : displayUser.gameName) : (displayUser?.displayName || displayUser?.name)}
              region={displayUser?.region || 'euw'}
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
          <div className="bg-white dark:bg-black/20 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 p-6 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[350px] hover:border-yellow-500/20 transition-all duration-500" >
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
                    <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${p.icon || 29}.jpg`} onError={(e) => { e.target.onerror = null; e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/29.jpg"; }} className="w-8 h-8 rounded-lg border border-gray-200 dark:border-white/10 shadow-sm" />
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

                // Calculate total based only on matched structured roles so percentages reflect exact distribution
                const validTotal = Math.max(1, ['TOP', 'JUNGLE', 'MIDDLE', 'BOTTOM', 'SUPPORT'].reduce((acc, curr) => acc + (roleStats[curr] || 0), 0));

                const pct = Math.round((count / validTotal) * 100);

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
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100 mt-1">{count > 0 ? pct + '%' : '0%'}</div>
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

        // Dynamic division (I to IV) based on the score variance properly interpolated
        if (["DIAMOND", "EMERALD", "PLATINUM", "GOLD", "SILVER", "BRONZE", "IRON"].includes(highestTier)) {
          let tMin = 35; let tMax = 45;
          if (highestTier === "DIAMOND") { tMin = 75; tMax = 80; }
          else if (highestTier === "EMERALD") { tMin = 68; tMax = 75; }
          else if (highestTier === "PLATINUM") { tMin = 60; tMax = 68; }
          else if (highestTier === "GOLD") { tMin = 52; tMax = 60; }
          else if (highestTier === "SILVER") { tMin = 45; tMax = 52; }
          else if (highestTier === "BRONZE") { tMin = 35; tMax = 45; }
          else if (highestTier === "IRON") { tMin = 0; tMax = 35; }

          const percent = Math.max(0, Math.min(1, (avgScore - tMin) / (tMax - tMin)));
          const divs = ["IV", "III", "II", "I"];
          let divIndex = Math.floor(percent * 4);
          if (divIndex > 3) divIndex = 3;
          highestDivision = divs[divIndex];
        }

        return (
          <div className="flex flex-col items-center justify-center mb-4 z-10 gap-1 mt-1">
            <span className="text-[8px] text-gray-500 font-bold uppercase tracking-[0.2em]">{t('oracle_estimate')}</span>
            <div className="flex items-center justify-center gap-2 bg-black/5 dark:bg-black/30 backdrop-blur-md px-4 py-1.5 rounded-lg border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] transition-colors">
              <img
                src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${highestTier.toLowerCase() === 'emerald' ? 'platinum' : highestTier.toLowerCase()}.png`}
                className={cn('w-5 h-5 drop-shadow-md object-contain', (highestTier || '').toUpperCase() === 'EMERALD' && 'hue-rotate-[-40deg] saturate-150 brightness-110')}
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

// Global cache for rank history to avoid repeated scraping and huge loading times
let SCRAPED_HISTORY_CACHE = {};
let SCRAPED_HISTORY_LAST_UPDATE = 0;

function RankGraphModal({ isOpen, onClose, t, type, data, history, puuid, summonerName, region, queueId, isPremium, onSubscribe, lpGains }) {
  const [filter, setFilter] = useState('30_days');
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [scrapedHistory, setScrapedHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(false);

  const getRankIcon = (tier) => {
    const tierKey = (tier || 'unranked').toLowerCase();
    const map = {
      'iron': 'iron', 'bronze': 'bronze', 'silver': 'silver', 'gold': 'gold',
      'platinum': 'platinum', 'emerald': 'emerald', 'diamond': 'diamond',
      'master': 'master', 'grandmaster': 'grandmaster', 'challenger': 'challenger'
    };
    const finalKey = map[tierKey] || 'unranked';
    return `https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-static-assets/global/default/images/ranked-mini-crests/${finalKey === 'emerald' ? 'platinum' : finalKey}.png`;
  };

  const TIER_NAMES = {
    'IRON': 'Iron', 'BRONZE': 'Bronze', 'SILVER': 'Silver', 'GOLD': 'Gold',
    'PLATINUM': 'Platinum', 'EMERALD': 'Emerald', 'DIAMOND': 'Diamond',
    'MASTER': 'Master', 'GRANDMASTER': 'Grandmaster', 'CHALLENGER': 'Challenger'
  };

  const TIERS = ['IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'];
  const DIVISIONS = ['IV', 'III', 'II', 'I'];

  useEffect(() => {
    if (isOpen && puuid && summonerName) {
      const now = Date.now();
      const cacheKey = `${summonerName}-${region}-${queueId}`;
      if (SCRAPED_HISTORY_CACHE[cacheKey] && (now - SCRAPED_HISTORY_LAST_UPDATE < 600000)) {
        setScrapedHistory(SCRAPED_HISTORY_CACHE[cacheKey]);
        setLoadingHistory(false);
      } else {
        setLoadingHistory(true);
        window.ipcRenderer.invoke('scraper:get-rank-history', summonerName, region).then(res => {
          if (res && Array.isArray(res)) {
            setScrapedHistory(res);
            SCRAPED_HISTORY_CACHE[cacheKey] = res;
            SCRAPED_HISTORY_LAST_UPDATE = Date.now();
          }
          setLoadingHistory(false);
        }).catch(() => setLoadingHistory(false));
      }
    } else if (!isOpen) {
      setLoadingHistory(false);
    }

    // 2. Body/Container Scrolling Logic
    const containers = document.querySelectorAll('#profile-scroll-container');
    const globalContent = document.getElementById('main-scroll-container');

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      containers.forEach(c => c.style.overflow = 'hidden');
      if (globalContent) globalContent.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto'; // default
      containers.forEach(c => c.style.overflow = 'auto');
      if (globalContent) globalContent.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      const containersQuery = document.querySelectorAll('#profile-scroll-container');
      const gContainer = document.getElementById('main-scroll-container');
      containersQuery.forEach(c => c.style.overflow = 'auto');
      if (gContainer) gContainer.style.overflow = 'auto';
    };
  }, [isOpen, puuid, summonerName, region, queueId]);

  const getAbsLp = useCallback((tier, div, lp) => {
    const TIERS = ['UNRANKED', 'IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 'EMERALD', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'];
    const DIVISIONS = ['IV', 'III', 'II', 'I'];
    const divMap = { '4': 'IV', '3': 'III', '2': 'II', '1': 'I' };
    const cleanDiv = divMap[div] || div;
    const tIdx = Math.max(0, TIERS.indexOf(tier));
    if (tIdx >= 8) return 2800 + lp;
    const dIdx = Math.max(0, DIVISIONS.indexOf(cleanDiv));
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
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      return filtered.filter(g => (g.gameCreation || 0) >= thirtyDaysAgo);
    }

    return filtered;
  }, [history, queueId, filter]);

  const mockDataPoints = useMemo(() => {
    if (!data) return [];
    const currentAbsLp = getAbsLp(data.tier, data.division, data.leaguePoints || 50);

    // Calculate a favorite/most-recent champ ID for fallbacks
    const favChampId = (() => {
      const firstGameWithChamp = relevantGames.find(g => g.participants?.some(p => p.championId));
      if (!firstGameWithChamp) return 29; // Twitch fallback
      const iden = firstGameWithChamp.participantIdentities?.find(i => i.player.puuid === puuid);
      const part = firstGameWithChamp.participants?.find(p => p.participantId === iden?.participantId);
      return part?.championId || 29;
    })();

    // BUILD POINTS FOR THE GRAPH
    let historyToUse = [];

    if (filter === '20_games' && lpGains && lpGains.length > 0) {
      // MODE 1: Match-by-match using scraped LP Gains (Most accurate for W/L)
      let runningLp = currentAbsLp;
      const matchPoints = [{
        lp: currentAbsLp,
        date: Date.now(),
        real: true,
        label: 'Maintenant',
        diff: 0,
        win: null,
        champId: favChampId
      }];

      // Backtrack from current LP using the deltas
      for (let i = 0; i < Math.min(20, lpGains.length); i++) {
        const gain = lpGains[i];
        if (!gain) continue;
        const val = parseInt((gain.lpStr || "").replace(/[^0-9-]/g, ''));
        if (isNaN(val)) continue;

        const lpBefore = runningLp - val;
        // Search for this game in LCU history to get champ/date
        const matchedGame = relevantGames.find(g => {
          const iden = g.participantIdentities?.find(id => id.player.puuid === puuid);
          const part = g.participants?.find(p => p.participantId === iden?.participantId);
          if (!part) return false;
          const kdaStr = (gain.kda || "");
          if (!kdaStr.includes('/')) return false;
          const k = kdaStr.split('/').map(v => parseInt(v.trim()));
          return k[0] === part.stats.kills && k[1] === part.stats.deaths && k[2] === part.stats.assists;
        });

        matchPoints.push({
          lp: lpBefore,
          date: matchedGame?.gameCreation || (Date.now() - (i + 1) * 3600000),
          real: true,
          label: '',
          win: val > 0,
          diff: val,
          champId: matchedGame ? (matchedGame.participants?.find(part => part.puuid === puuid)?.championId || favChampId) : favChampId
        });
        runningLp = lpBefore;
      }
      return matchPoints.reverse().map((p, idx) => ({ ...p, id: idx }));

    } else if (scrapedHistory && scrapedHistory.length > 2) {
      // MODE 2: Trend using Scraped History Snapshot
      const sortedHistory = [...scrapedHistory].sort((a, b) => b.timestamp - a.timestamp);

      if (filter === '20_games') {
        historyToUse = sortedHistory.slice(0, 21).reverse();
      } else {
        const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
        historyToUse = sortedHistory.filter(p => {
          const ts = p.timestamp > 10000000000 ? p.timestamp : p.timestamp * 1000;
          return ts >= thirtyDaysAgo;
        }).reverse();
      }

      const mapped = historyToUse.map((p, idx) => {
        const parts = (p.rankStr || "").split(' ');
        const abs = getAbsLp(parts[0]?.toUpperCase() || data.tier, parts[1] || data.division, p.lp || 0);
        const ts = p.timestamp > 10000000000 ? p.timestamp : p.timestamp * 1000;
        const matchedGame = relevantGames.find(g => Math.abs((g.gameCreation || 0) - ts) < 3600000);

        return {
          lp: abs,
          date: ts,
          real: true,
          label: p.rankStr,
          champId: matchedGame ? (matchedGame.participants?.find(part => part.puuid === puuid)?.championId || favChampId) : favChampId
        };
      });

      // Add Anchor
      if (mapped.length > 0 && (Date.now() - mapped[mapped.length - 1].date > 900000)) {
        mapped.push({ lp: currentAbsLp, date: Date.now(), real: true, label: 'Maintenant', champId: favChampId });
      }

      return mapped.map((p, idx) => {
        const prev = mapped[idx - 1];
        const diff = prev ? p.lp - prev.lp : 0;
        return {
          ...p,
          id: idx,
          diff: diff,
          win: diff === 0 ? null : diff > 0
        };
      });
    }

    // Default Fallback
    return [{ lp: currentAbsLp, date: Date.now(), id: 0, real: true, label: 'Actuel', diff: 0, win: null, champId: favChampId }];
  }, [scrapedHistory, relevantGames, data, filter, getAbsLp, puuid]);

  const mockPoints = useMemo(() => mockDataPoints.map(p => p.lp), [mockDataPoints]);

  const minAbs = Math.max(0, Math.min(...mockPoints) - +((Math.max(...mockPoints) - Math.min(...mockPoints)) < 150 ? 80 : 40));
  // Add more top padding to maxAbs to ensure the tooltip bubble doesn't get cut off at the top
  const maxAbs = Math.max(...mockPoints, minAbs + 150) + +((Math.max(...mockPoints) - Math.min(...mockPoints)) < 150 ? 120 : 100);
  const range = (maxAbs - minAbs) || 1;

  const yAxisTicks = useMemo(() => {
    if (mockPoints.length === 0) return [];
    const ticks = [];
    const step = range < 300 ? 50 : 100;
    for (let lp = Math.floor(minAbs / step) * step; lp <= maxAbs; lp += step) {
      if (lp >= minAbs && lp <= maxAbs) ticks.push(lp);
    }
    if (ticks.length < 2) ticks.push(minAbs + (range / 2));
    const uniqueLabels = new Set();
    const filteredTicks = [];
    for (let i = ticks.length - 1; i >= 0; i--) {
      const rank = getRankFromAbs(ticks[i]);
      const label = `${rank.tier} ${rank.div}`;
      if (!uniqueLabels.has(label)) {
        uniqueLabels.add(label);
        filteredTicks.unshift(ticks[i]);
      }
    }
    return filteredTicks;
  }, [minAbs, maxAbs, range, mockPoints.length, getRankFromAbs]);

  const xAxisTicks = useMemo(() => {
    if (mockDataPoints.length < 2) return [];
    const firstDate = mockDataPoints[0].date;
    const lastDate = mockDataPoints[mockDataPoints.length - 1].date;
    const duration = lastDate - firstDate;
    if (duration <= 0) return [];
    const count = 4;
    return Array.from({ length: count }).map((_, i) => firstDate + (duration * i / (count - 1)));
  }, [mockDataPoints]);

  // Calculate summary stats
  const { filterWins, filterLosses, totalLpGained, totalLpLost } = useMemo(() => {
    let wins = 0, losses = 0;
    let gained = 0, lost = 0;

    // 1. Calculate W/L from actual game history
    // If we have scraped history points, they are often more comprehensive for long-term trends
    if (filter !== '20_games' && scrapedHistory && scrapedHistory.length > 2) {
      wins = scrapedHistory.filter((p, i) => {
        if (i === 0) return false;
        const prev = scrapedHistory[i-1];
        return p.lp > prev.lp;
      }).length;
      losses = scrapedHistory.length - 1 - wins;
      
      // Calculate deltas from scraped points
      mockDataPoints.forEach(p => {
        if (p.diff > 0) gained += p.diff;
        if (p.diff < 0) lost += Math.abs(p.diff);
      });
    } else {
      relevantGames.forEach(g => {
        const iden = g.participantIdentities?.find(id => id.player.puuid === puuid);
        const part = g.participants?.find(p => p.participantId === iden?.participantId);
        if (part) {
          if (part.stats.win) wins++;
          else losses++;
        }
      });
      mockDataPoints.forEach(p => {
        if (p.diff > 0) gained += p.diff;
        if (p.diff < 0) lost += Math.abs(p.diff);
      });
    }

    return { filterWins: wins, filterLosses: losses, totalLpGained: gained, totalLpLost: lost };
  }, [relevantGames, mockDataPoints, puuid, filter, scrapedHistory]);

  if (!isOpen || !data) return null;

  const width = 640;
  const height = 320;

  const pointsOnSvg = mockPoints.map((p, i) => {
    const x = mockPoints.length > 1 ? (i / (mockPoints.length - 1)) * width : width / 2;
    const y = height - ((p - minAbs) / range) * height;
    return { x, y, val: p, idx: i };
  });

  const generatePath = (pts) => {
    if (pts.length < 2) return "";

    // Smooth spline (Bezier) implementation
    let d = `M ${pts[0].x} ${pts[0].y} `;

    for (let i = 0; i < pts.length - 1; i++) {
      const curr = pts[i];
      const next = pts[i + 1];

      // Use midpoints as control points for a smooth curve
      const cp1x = curr.x + (next.x - curr.x) / 3;
      const cp2x = curr.x + 2 * (next.x - curr.x) / 3;

      d += `C ${cp1x} ${curr.y}, ${cp2x} ${next.y}, ${next.x} ${next.y} `;
    }
    return d;
  }
  const pathData = generatePath(pointsOnSvg);

  const totalWins = data.wins || 0;
  const totalLosses = data.losses || 0;

  // Clamp suspicious jumps for UI display in tooltip (like the -104 artifacts)
  const cleanDiff = (d) => {
    if (Math.abs(d) > 80 && filter === '30_days') {
      // For trend view, if we see a 100+ jump, it's likely a rank boundary artifact
      // we display it as a smaller delta or just the LP gain of the last match if possible.
      return d > 0 ? 25 : -18;
    }
    return d;
  };

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



  const getRankColor = (tierStr) => {
    const t = tierStr?.toLowerCase() || '';
    if (t === 'iron') return '#a1a1aa';
    if (t === 'bronze') return '#b45309';
    if (t === 'silver') return '#94a3b8';
    if (t === 'gold') return '#facc15';
    if (t === 'platinum') return '#22d3ee';
    if (t === 'emerald') return '#4ade80';
    if (t === 'diamond') return '#60a5fa';
    if (t === 'master') return '#c084fc';
    if (t === 'grandmaster') return '#f43f5e';
    if (t === 'challenger') return '#fbbf24';
    return '#a855f7';
  };
  const themeAccentColor = 'rgb(var(--accent-primary))';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={(e) => { e.stopPropagation(); onClose(); }} />
      <div className="relative bg-[#1e1e24] border border-white/10 rounded-3xl w-full max-w-4xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.8)] flex flex-col pointer-events-auto" onClick={(e) => e.stopPropagation()}>
        <div className="p-8 border-b border-white/5 flex justify-between items-center bg-white/5 relative z-10 backdrop-blur-xl">
          <div>
            <h2 className="text-2xl font-black bg-clip-text text-transparent uppercase tracking-tighter" style={{ backgroundImage: `linear-gradient(to right, #fff, rgb(var(--accent-primary)))` }}>
              Progression - {type}
            </h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="text-sm font-bold text-gray-300 uppercase">{data.tier} {data.division}</span>
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: getRankColor(data.tier) }} />
              <span className="text-sm text-gray-400 font-mono font-medium">{Math.floor(data.leaguePoints)} LP</span>
            </div>
          </div>
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="p-3 text-gray-400 hover:text-white bg-white/5 rounded-xl hover:bg-white/10 border border-white/5 transition z-10 cursor-pointer shadow-lg hover:rotate-90 duration-300">
            <X size={20} />
          </button>
        </div>

        <div className="px-6 py-4 flex items-center gap-6 relative z-10 bg-white/[0.02] border-b border-white/5">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest pl-2">Périodes:</span>
          <div className="flex gap-2">
            {[
              { id: '20_games', label: '20 dernières games' },
              { id: '30_days', label: '30 jours' }
            ].map(f => (
              <button
                key={f.id}
                onClick={(e) => { e.stopPropagation(); setFilter(f.id); setHoveredIndex(null); }}
                className={cn(
                  "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all cursor-pointer z-10 border",
                  filter === f.id ? "bg-accent-primary text-white border-accent-primary/50 shadow-[0_0_15px_rgba(6,182,212,0.2)]" : "bg-black/20 text-gray-500 hover:text-gray-300 border-transparent hover:bg-white/5"
                )}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="p-8 pt-6 relative z-10 flex gap-6">

          <div className="flex-1 relative">
            <div className="flex justify-between items-end mb-6 pl-[110px]">
              <div className="flex gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-500 font-black uppercase tracking-[0.2em] mb-1">Total période</span>
                  <div className="flex gap-2 text-base font-black items-center">
                    {(filterWins > 0 || filterLosses > 0 || filter === '20_games') && (
                      <>
                        <span className="text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.4)]">{filterWins}W</span>
                        <span className="text-gray-600">-</span>
                        <span className="text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.4)]">{filterLosses}L</span>
                      </>
                    )}
                    <span className={cn("ml-2 px-2 py-0.5 rounded-md font-bold text-[11px] flex items-center w-fit backdrop-blur-sm border", (filterWins / Math.max(1, filterWins + filterLosses)) >= 0.5 ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20")}>
                      {Math.round((filterWins / Math.max(1, filterWins + filterLosses)) * 100)}% WR
                    </span>
                    <div className="flex gap-2 items-center opacity-70 ml-2 border-l border-white/10 pl-2">
                      <span className="text-[10px] text-green-400 font-bold">+{totalLpGained}</span>
                      <span className="text-[10px] text-red-400 font-bold">-{totalLpLost}</span>
                      <span className="text-[10px] text-gray-500 font-black ml-1">({lpDiff > 0 ? '+' : ''}{lpDiff})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="relative w-full h-[350px] group mt-2 flex bg-black/40 rounded-2xl border border-white/5 p-4 pl-0 overflow-visible"
            >
              {!isPremium && <PremiumOverlay onAction={onSubscribe} title="Évolution des LP" text="Suivez avec précision vos gains et pertes de LP grâce à l'historique premium." />}

              {(loadingHistory) ? (
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-accent-primary"></div>
                </div>
              ) : (mockDataPoints.length <= 1) ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-10 text-center px-10">
                  <Activity size={48} className="text-white/10 mb-4" />
                  <div className="text-white/40 font-bold uppercase tracking-widest text-sm mb-2">Pas de données</div>
                  <div className="text-white/20 text-xs max-w-[280px]">Aucune partie classée trouvée pour cette période.</div>
                </div>
              ) : null}

              <div className={cn("flex w-full h-full pb-10", (!isPremium || loadingHistory || (mockDataPoints.length <= 1 && filter !== '20_games')) && "blur-xl pointer-events-none opacity-20 scale-[1.03]")}>
                {/* Left Y-Axis Labeling */}
                <div className="w-[140px] border-r border-white/10 relative shrink-0 z-0">
                  {yAxisTicks.map(tickLp => {
                    const rank = getRankFromAbs(tickLp);
                    const y = ((maxAbs - tickLp) / range) * 100;
                    const color = getRankColor(rank.tier);
                    return (
                      <div key={tickLp} className="absolute left-0 flex items-center transform translate-y-[-50%] w-[1000px] pointer-events-none" style={{ top: `${y}%` }}>
                        <div className="w-[140px] text-right shrink-0 pr-4 flex justify-end items-center gap-2 opacity-100">
                          <img src={getRankIcon(rank.tier)} className={cn('w-5 h-5 object-contain', (rank.tier || '').toUpperCase() === 'EMERALD' && 'hue-rotate-[-40deg] saturate-150 brightness-110')} alt='' />
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
                        <stop offset="0%" stopColor={themeAccentColor} stopOpacity="0.4" />
                        <stop offset="100%" stopColor={themeAccentColor} stopOpacity="0" />
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
                        stroke={themeAccentColor}
                        strokeOpacity="0.3"
                        strokeWidth="1"
                        strokeDasharray="5,5"
                      />
                    )}

                    {/* Clean Smooth Fill Area */}
                    <motion.path
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
                      d={`${pathData} L ${width} ${height} L 0 ${height} Z`}
                      fill="url(#gradientLP)"
                    />

                    {/* Glowing Smooth Curve */}
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 1.5, ease: "easeInOut" }}
                      d={pathData}
                      fill="none"
                      stroke={themeAccentColor}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />

                    {/* Data Point Dots */}
                    {pointsOnSvg.map((pt, i) => (
                      <circle
                        key={`dot-${i}`}
                        cx={pt.x}
                        cy={pt.y}
                        r={hoveredIndex === i ? 5 : 3}
                        fill={hoveredIndex === i ? themeAccentColor : "#1e1e24"}
                        stroke={themeAccentColor}
                        strokeWidth="2"
                        className="transition-all duration-200"
                        style={{ opacity: mockDataPoints[i].real ? 1 : 0 }}
                      />
                    ))}

                    {/* LP Gain/Loss Bars at the bottom */}
                    {pointsOnSvg.map((pt, i) => {
                      const point = mockDataPoints[i];
                      if (point.diff === 0 || !point.diff) return null;
                      const barHeight = Math.abs(point.diff) * 0.8;
                      const maxBarH = 25;
                      const finalH = Math.min(maxBarH, barHeight);
                      const barY = height - 10 - finalH;
                      return (
                        <rect
                          key={`bar-${i}`}
                          x={pt.x - 2}
                          y={point.diff > 0 ? height - 30 - finalH : height - 30}
                          width="4"
                          height={finalH}
                          rx="2"
                          fill={point.diff > 0 ? "#4ade80" : "#f87171"}
                          className="opacity-40"
                        />
                      );
                    })}

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
                        stroke={themeAccentColor}
                        strokeWidth="3"
                        className="transition-all duration-300 pointer-events-none"
                        style={{ filter: `drop-shadow(0 0 8px ${themeAccentColor})` }}
                      />
                    )}

                    {/* Last point always visible if nothing is hovered to show "current" */}
                    {hoveredIndex === null && pointsOnSvg.length > 0 && (
                      <circle
                        cx={pointsOnSvg[pointsOnSvg.length - 1].x}
                        cy={pointsOnSvg[pointsOnSvg.length - 1].y}
                        r="4"
                        fill="#fff"
                        stroke={themeAccentColor}
                        strokeWidth="2"
                        style={{ filter: `drop-shadow(0 0 5px ${themeAccentColor})` }}
                      />
                    )}
                    {/* X-Axis Dates */}
                    <line x1="0" y1={height} x2={width} y2={height} stroke="white" strokeOpacity="0.1" strokeWidth="1" />
                    {xAxisTicks.map((ts, i) => {
                      const x = ((ts - mockDataPoints[0].date) / Math.max(1, (mockDataPoints[mockDataPoints.length - 1].date - mockDataPoints[0].date))) * width;
                      // Avoid rendering labels at the extreme edges as they might overflow
                      if (x < 30 && i === 0) return null;
                      if (x > width - 30 && i === xAxisTicks.length - 1) return null;
                      return (
                        <g key={`xtick-${i}`} transform={`translate(${x}, ${height + 25})`}>
                          <text fill="white" fillOpacity="0.4" fontSize="9" fontWeight="bold" textAnchor="middle" className="uppercase tracking-widest">
                            {new Date(ts).toLocaleDateString(undefined, { month: 'short', day: '2-digit' })}
                          </text>
                        </g>
                      );
                    })}
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
                          <div className="text-[12px] font-black flex flex-col items-center leading-none mt-0.5 whitespace-nowrap" style={{ color: getRankColor(getRankFromAbs(pointsOnSvg[hoveredIndex].val).tier) }}>
                            <span className="uppercase tracking-wide">
                              <span className="text-white">{getRankFromAbs(pointsOnSvg[hoveredIndex].val).tier.charAt(0)}{getRankFromAbs(pointsOnSvg[hoveredIndex].val).div === 'IV' ? '4' : getRankFromAbs(pointsOnSvg[hoveredIndex].val).div === 'III' ? '3' : getRankFromAbs(pointsOnSvg[hoveredIndex].val).div === 'II' ? '2' : '1'}</span> <span className="text-gray-300 ml-0.5">{getRankFromAbs(pointsOnSvg[hoveredIndex].val).lp} LP</span>
                            </span>
                          </div>
                          {mockDataPoints[hoveredIndex].diff ? (
                            <>
                              <div className="w-full h-px bg-white/10 my-0.5"></div>
                              <div className="w-full text-center mt-1">
                                <span className={cn("text-[10px] font-black leading-none", cleanDiff(mockDataPoints[hoveredIndex].diff) >= 0 ? 'text-blue-400' : 'text-red-400')}>{cleanDiff(mockDataPoints[hoveredIndex].diff) > 0 ? '+' : ''}{cleanDiff(mockDataPoints[hoveredIndex].diff)} LP</span>
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

function ModernRankCard({ rankedStats, history, puuid, summonerName, region, panelClass, t, isPremium, onSubscribe, lpGains }) {
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

      <RankGraphModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        t={t}
        type={type}
        data={data}
        history={history}
        puuid={puuid}
        summonerName={summonerName}
        region={region}
        queueId={viewMode.includes('flex') ? 440 : 420}
        isPremium={isPremium}
        onSubscribe={onSubscribe}
        lpGains={lpGains}
      />
    </>
  );
}


function HistoryRowV2({ game, puuid, lpGains, onClick, t, ddragonVersion }) {
  const identity = game.participantIdentities?.find(i => i.player.puuid === puuid);
  if (!identity) return null;
  const part = game.participants?.find(p => p.participantId === identity.participantId);
  if (!part || !part.stats) return null;

  const isRemake = game.gameDuration < 300 || game.endOfGameResult === "Abort_TooFewPlayers";
  const isWin = part.stats.win && !isRemake;
  const champId = part.championId;
  const champName = part.championName || getChampName(champId);
  const champIcon = (champId && champId > 0)
    ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${champId}.png`
    : `https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || "15.1.1"}/img/champion/${normalizeChampName(champName)}.png`;

  const kdaRatio = ((part.stats.kills + part.stats.assists) / Math.max(1, part.stats.deaths)).toFixed(2);

  const queueName = getQueueName(game, t);

  return (
    <div onClick={onClick} className={cn(
      "relative flex items-center gap-3 p-2 rounded-2xl transition-all border-l-4 min-h-[4.5rem] group cursor-pointer hover:scale-[1.01]",
      isRemake
        ? "bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] border-gray-500 hover:shadow-[0_0_15px_rgba(156,163,175,0.15)]"
        : isWin
          ? "bg-gradient-to-r from-[#28344e] to-[#1e232e] border-blue-500 hover:shadow-[0_0_15px_rgb(var(--accent-primary)/0.15)]"
          : "bg-gradient-to-r from-[#4e2828] to-[#2e1e1e] border-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.15)]"
    )}>
      {/* Champion & Role - Matches Screenshot */}
      <div className="relative shrink-0 ml-1 mt-1">
        <img src={champIcon} className={cn("w-10 h-10 rounded-lg border shadow-sm z-10 relative object-cover", isRemake ? "border-gray-500/50" : isWin ? "border-blue-400/50" : "border-red-400/50")} />

        {/* LP Bubble - Overlapping Corner (Matches Screen 1 request) */}
        {(() => {
          let lpToDisplay = null;
          if (game.lpDelta != null) {
            lpToDisplay = `${isWin ? '+' : '-'}${Math.abs(game.lpDelta)} LP`;
          } else if (game.lpChange) {
            lpToDisplay = game.lpChange;
          } else if (lpGains && lpGains.length > 0 && (game.queueId === 420 || game.queueId === 440)) {
            if (part && part.stats) {
              const matchedIdx = lpGains.findIndex(lp => {
                if (!lp.kda) return false;
                const kdaParts = lp.kda.split('/').map(v => parseInt(v.trim(), 10));
                return kdaParts[0] === part.stats.kills && kdaParts[1] === part.stats.deaths && kdaParts[2] === part.stats.assists;
              });
              const matched = lpGains[matchedIdx];
              if (matched && matched.lpStr) {
                const isRankPromo = /^[A-Z][a-z]*\s?[1-4]$|^[A-Z][a-z]+$/.test(matched.lpStr) && !matched.lpStr.includes('LP');
                if (!isRankPromo && matched.lpStr.includes('LP')) {
                  const rawVal = Math.abs(parseInt(matched.lpStr.replace(/[^0-9]/g, '')) || 0);
                  lpToDisplay = `${isWin ? '+' : '-'}${rawVal} LP`;
                } else {
                  lpToDisplay = matched.lpStr;

                  // Rank Direction Detection - Find the nearest PREVIOUS rank to compare
                  const isRankPromo = /^[A-Z][a-z]*\s?[1-4]$|^[A-Z][a-z]+$/.test(lpToDisplay) && !lpToDisplay.includes('LP');
                  if (isRankPromo) {
                    const prevRankMatch = lpGains.slice(matchedIdx + 1).find(lp =>
                      /^[A-Z][a-z]*\s?[1-4]$|^[A-Z][a-z]+$/.test(lp.lpStr) && !lp.lpStr.includes('LP')
                    );

                    if (prevRankMatch) {
                      const ranks = ['Iron', 'Bronze', 'Silver', 'Gold', 'Platinum', 'Emerald', 'Diamond', 'Master', 'Grandmaster', 'Challenger'];
                      const getScore = (r) => {
                        const m = r.match(/([A-Z][a-z]+)\s*([1-4])?/);
                        if (!m) return -1;
                        const tierIdx = ranks.indexOf(m[1]);
                        const div = m[2] ? (5 - parseInt(m[2])) : 5;
                        return tierIdx * 10 + div;
                      };
                      const currScore = getScore(lpToDisplay);
                      const prevScore = getScore(prevRankMatch.lpStr);
                      if (currScore > prevScore) lpToDisplay = <span className="flex items-center gap-0.5"><ChevronUp size={10} strokeWidth={3} className="text-blue-400" />{lpToDisplay}</span>;
                      else if (currScore < prevScore) lpToDisplay = <span className="flex items-center gap-0.5"><ChevronDown size={10} strokeWidth={3} className="text-red-400" />{lpToDisplay}</span>;
                    }
                  }
                }
              }
            }
          }

          if (!lpToDisplay && (game.queueId === 420 || game.queueId === 440) && !game.isExternal) {
            lpToDisplay = 'None';
          }

          if (!lpToDisplay || (game.queueId !== 420 && game.queueId !== 440)) return null;

          const isRankPromoStr = typeof lpToDisplay === 'string' && /^[A-Z][a-z]*\s?[1-4]$|^[A-Z][a-z]+$/.test(lpToDisplay) && !lpToDisplay.includes('LP');
          const isRankPromoObj = typeof lpToDisplay === 'object'; // Contains the icon
          const isWinDelta = typeof lpToDisplay === 'string' && lpToDisplay.includes('+');
          const isLossDelta = typeof lpToDisplay === 'string' && lpToDisplay.includes('-');

          return (
            <div className={cn("absolute -bottom-4.5 -left-0.5 z-20 text-[9px] font-black px-1 py-0.5 rounded-lg border shadow-lg transition-all transform hover:scale-110 min-w-[45px] flex items-center justify-center backdrop-blur-md",
              lpToDisplay === 'None' ? "bg-black/60 border-gray-600/50 text-gray-500" :
                (isRankPromoStr || isRankPromoObj) ? "bg-gradient-to-br from-yellow-500/90 to-amber-700/90 border-yellow-400 text-white shadow-[0_0_10px_rgba(234,179,8,0.4)]" :
                  isWinDelta ? "bg-gradient-to-br from-blue-600/90 to-blue-800/90 border-blue-400 text-white shadow-[0_0_10px_rgba(59,130,246,0.4)]" :
                    "bg-gradient-to-br from-red-600/90 to-red-800/90 border-red-400 text-white shadow-[0_0_10px_rgba(239,68,68,0.4)]")}>
              {lpToDisplay}
            </div>
          );
        })()}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center gap-0.5 ml-2">
        <div className="flex items-center gap-2 mb-0.5">
          <span className={cn("font-bold italic text-sm", isRemake ? "text-gray-400" : isWin ? "text-blue-300" : "text-red-300")}>
            {isRemake ? "Remake" : isWin ? t('victory') : t('defeat')}
          </span>
          <span className="text-[7px] font-bold text-gray-600 dark:text-gray-400 uppercase bg-black/5 dark:bg-black/30 px-1 py-0.5 rounded border border-gray-200 dark:border-white/5 tracking-tighter">{queueName}</span>
        </div>
        <div className="flex flex-col items-start gap-0.5 min-w-[80px]">
          <div className="flex items-baseline gap-1.5 text-[11px] text-gray-900 dark:text-gray-100">
            <span className="font-bold">{part.stats.kills}</span>
            <span className="text-gray-500">/</span>
            <span className="font-bold text-red-400">{part.stats.deaths}</span>
            <span className="text-gray-500">/</span>
            <span className="font-bold">{part.stats.assists}</span>
            <span className="text-[10px] text-gray-600 dark:text-gray-400 ml-1 opacity-70 font-mono italic">{kdaRatio} KDA</span>
          </div>
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
    green: {
      loading_empty_slot: "Empty",
      loading_winrate: "Global Winrate",
      loading_record: "Record",
      streak_wins: "WINS STREAK",
      streak_losses: "LOSSES STREAK",
      attitude_precise: "Precise",
      attitude_struggling: "Struggling",
      attitude_on_fire: "On Fire",
      attitude_tilt: "Likely Tilting",
      attitude_expert: "Expert",
      attitude_veteran: "Veteran",
      attitude_constant: "Constant", from: "from-green-500/10", to: "to-green-500/5", border: "border-green-500/20", glow: "shadow-green-500/20", text: "text-green-400"
    },
    orange: { from: "from-orange-500/10", to: "to-orange-500/5", border: "border-orange-500/20", glow: "shadow-orange-500/20", text: "text-orange-400" },
    red: { from: "from-red-500/10", to: "to-red-500/5", border: "border-red-500/20", glow: "shadow-red-500/20", text: "text-red-400" },
    yellow: { from: "from-yellow-500/10", to: "to-yellow-500/5", border: "border-yellow-500/20", glow: "shadow-yellow-500/20", text: "text-yellow-400" },
    indigo: { from: "from-indigo-500/10", to: "to-indigo-500/5", border: "border-indigo-500/20", glow: "shadow-indigo-500/20", text: "text-indigo-400" }
  };

  const theme = colorMap[color] || colorMap.blue;

  return (
    <div className={cn(
      "group relative z-[1] hover:z-[50] p-6 rounded-[32px] bg-gradient-to-br transition-all duration-500 border shadow-xl flex flex-col",
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

/* === TOOLTIP COMPONENT === */
const cleanRiotHtml = (html) => {
  if (!html) return '';
  return html
    .replace(/<mainText>/gi, '<div>')
    .replace(/<\/mainText>/gi, '</div>')
    .replace(/<stats>/gi, '<div style="color:#b2b2b2; margin-top:4px;">')
    .replace(/<\/stats>/gi, '</div>')
    .replace(/<attention>/gi, '<span style="color:#fbbf24; font-weight:bold;">')
    .replace(/<\/attention>/gi, '</span>')
    .replace(/<passive>/gi, '<span style="color:#f87171; font-weight:bold;">')
    .replace(/<\/passive>/gi, '</span>')
    .replace(/<rules>/gi, '<span style="color:#9ca3af; font-style:italic;">')
    .replace(/<\/rules>/gi, '</span>')
    .replace(/<scaleHealth>/gi, '<span style="color:#4ade80; font-weight:bold;">')
    .replace(/<\/scaleHealth>/gi, '</span>')
    .replace(/<scaleArmor>/gi, '<span style="color:#fbbf24; font-weight:bold;">')
    .replace(/<\/scaleArmor>/gi, '</span>')
    .replace(/<scaleMR>/gi, '<span style="color:#60a5fa; font-weight:bold;">')
    .replace(/<\/scaleMR>/gi, '</span>')
    .replace(/<scaleMana>/gi, '<span style="color:#3b82f6; font-weight:bold;">')
    .replace(/<\/scaleMana>/gi, '</span>')
    .replace(/<scaleAP>/gi, '<span style="color:#a78bfa; font-weight:bold;">')
    .replace(/<\/scaleAP>/gi, '</span>')
    .replace(/<scaleAD>/gi, '<span style="color:#f97316; font-weight:bold;">')
    .replace(/<\/scaleAD>/gi, '</span>')
    .replace(/<br>/gi, '<br />');
};

const InfoTooltip = ({ children, title, description, cost, isBottom = false }) => (
  <div className="relative group/tooltip flex items-center justify-center">
    {children}
    {(title || description) && (
      <div className={`absolute ${isBottom ? 'top-full mt-2' : 'bottom-[calc(100%+8px)]'} left-1/2 -translate-x-1/2 hidden group-hover/tooltip:block w-[320px] p-3 bg-[#0d0d12]/95 border border-white/10 rounded-xl shadow-[0_10px_40px_-10px_rgba(0,0,0,0.8)] z-[100] backdrop-blur-xl transition-all pointer-events-none text-left`}>
        {title && <span className="block text-[13px] font-black tracking-wide text-amber-500 mb-2">{title}</span>}
        {description && <div className="text-[11px] text-gray-300 leading-relaxed font-medium" dangerouslySetInnerHTML={{ __html: cleanRiotHtml(description) }} />}
        {cost !== undefined && cost !== 0 && <span className="block text-[10px] text-amber-200/60 mt-3 font-bold flex items-center gap-1"><Circle size={8} /> Coût: {cost} po</span>}
      </div>
    )}
  </div>
);

/* === LIVE MATCH TRACKER IMPLEMENTATION === */
function LiveMatchView({ t, autoImportRunes, flashPosition, currentUser, setTargetChamp, setActiveTab }) {
  const [session, setSession] = useState(null);
  const [phase, setPhase] = useState('');
  const [loading, setLoading] = useState(true);
  const [localSummonerId, setLocalSummonerId] = useState(null);
  const [recommendedBuild, setRecommendedBuild] = useState(null);
  const [spellIndex, setSpellIndex] = useState(0);
  const [runePageIndex, setRunePageIndex] = useState(0);

  const forceImportRunes = async (idx) => {
    const runesToImport = recommendedBuild?.allRunePages?.[idx] || recommendedBuild?.runes;
    const targetRls = myPlayer?.assignedPosition ? myPlayer.assignedPosition.toLowerCase() : "";
    if (!runesToImport) return;
    window.ipcRenderer.invoke('lcu:import-runes-manual', runesToImport, myChampName, targetRls);
  };

  const forceImportSummoners = async (idx) => {
    if (!recommendedBuild?.allSpells || !recommendedBuild.allSpells[idx]) return;
    const spells = recommendedBuild.allSpells[idx];
    if (spells.length >= 2) {
      window.ipcRenderer.invoke('lcu:update-summoner-spells', parseInt(spells[0]), parseInt(spells[1]));
    }
  };

  useEffect(() => {
    let interval;
    const fetchState = async () => {
      try {
        const curPhase = await window.ipcRenderer.invoke('lcu:get-gameflow-phase');
        setPhase(curPhase);

        let s = null;
        let l = null;
        if (curPhase === 'ChampSelect') {
          s = await window.ipcRenderer.invoke('lcu:get-champ-select-session');
        } else if (curPhase === 'InProgress' || curPhase === 'GameStart') {
          s = await window.ipcRenderer.invoke('lcu:get-gameflow-session');
          try {
            l = await window.ipcRenderer.invoke('live:get-all-data');
          } catch (err) { }
        }

        if (l && l.allPlayers) {
          s = s || {};
          s.liveData = l;
        }

        setSession(s);

        if (!localSummonerId && currentUser) {
          setLocalSummonerId(currentUser.summonerId);
        }
      } catch (e) {
        console.error("Live Tracker error:", e);
      } finally {
        setLoading(false);
      }
    };
    fetchState();
    interval = setInterval(fetchState, 1500);
    return () => clearInterval(interval);
  }, [currentUser, localSummonerId]);


  const isValidPlayer = (p) => {
    if (!p) return false;
    // For ChampSelect, ensure they actually have a valid cellId or summonerId
    if (phase === 'ChampSelect') {
      if (p.summonerId > 0 || p.championId > 0 || p.cellId !== undefined) return true;
      return false;
    }
    // Hard block empty stale cache ghost bots (summonerName=empty + fake names)
    if (!p.summonerName && !p.championId && !p.summonerInternalName) return false;

    // For In-Game, rely on clear identifiers. Hide stale leftover game data bots if possible
    if (p.summonerId > 0 || (p.puuid && p.puuid.length > 0)) {
      return true;
    }
    if (p.isBot === true || p.botDifficulty !== undefined) return true;
    if (p.summonerInternalName && p.summonerInternalName.toLowerCase().includes('bot')) return true;

    // LiveData checks
    if (p.riotIdGameName || p.summonerName) return true;

    return false;
  };

  let rawTeamOne = [];
  let rawTeamTwo = [];

  if (phase === 'ChampSelect') {
    rawTeamOne = session?.myTeam || [];
    rawTeamTwo = session?.theirTeam || [];
  } else if (session?.liveData?.allPlayers?.length > 0) {
    // Use perfect Live Client Data to bypass LCU cache completely
    const livePlayers = session.liveData.allPlayers;
    const spellNameToId = (name) => {
      const m = {
        "summonerflash": 4, "flash": 4, "sautéclair": 4, "sauteclair": 4,
        "summonersmite": 11, "smite": 11, "châtiment": 11, "chatiment": 11,
        "summonerteleport": 12, "teleport": 12, "téléportation": 12, "teleportation": 12,
        "summonerdot": 14, "ignite": 14, "embrasement": 14, "brûlure": 14,
        "summonerheal": 7, "heal": 7, "soins": 7, "soin": 7,
        "summonerbarrier": 21, "barrier": 21, "barrière": 21, "barriere": 21,
        "summonerboost": 1, "cleanse": 1, "purge": 1,
        "summonerexhaust": 3, "exhaust": 3, "fatigue": 3,
        "summonerhaste": 6, "ghost": 6, "fantôme": 6, "fantome": 6,
        "summonermana": 13, "clarity": 13, "clarté": 13, "clarte": 13,
        "summonerpororecall": 30, "summonerporothrow": 31, "summonersnowball": 32, "marquage": 32
      };
      let sName = name ? name.toLowerCase().replace(/[\s']/g, "") : "";
      for (let k in m) if (sName.includes(k) || k.includes(sName)) return m[k];

      // final fallback just in case
      if (sName.includes("eclair")) return 4;
      return 0;
    };
    const mapLivePlayer = p => {
      let parsedCid = 0;
      if (p.championName) {
        const cleanName = (n) => n ? n.toLowerCase().replace(/['\s.&-]/g, '') : '';
        let pName = cleanName(p.championName);

        let found = false;
        for (let mapId in CHAMP_ID_TO_NAME) {
          if (cleanName(CHAMP_ID_TO_NAME[mapId]) === pName) {
            parsedCid = parseInt(mapId);
            found = true;
            break;
          }
        }

        // Fallback to internal raw name for translated clients (e.g. game_character_displayname_MasterYi)
        if (!found && p.rawChampionName && p.rawChampionName.includes('_')) {
          const internal = cleanName(p.rawChampionName.split('_').pop());
          for (let mapId in CHAMP_ID_TO_NAME) {
            if (cleanName(CHAMP_ID_TO_NAME[mapId]) === internal) {
              parsedCid = parseInt(mapId);
              break;
            }
          }
        }
      }
      const rawS1 = p.summonerSpells?.summonerSpellOne?.rawDescription || p.summonerSpells?.summonerSpellOne?.displayName;
      const rawS2 = p.summonerSpells?.summonerSpellTwo?.rawDescription || p.summonerSpells?.summonerSpellTwo?.displayName;
      return {
        summonerName: p.summonerName,
        summonerInternalName: p.riotIdGameName || p.summonerName,
        championId: parsedCid,
        spell1Id: spellNameToId(rawS1),
        spell2Id: spellNameToId(rawS2),
        puuid: p.puuid,
        isBot: p.isBot,
        assignedPosition: p.position // from live data if possible
      };
    };
    rawTeamOne = livePlayers.filter(p => !p.isBot || p.team === 'ORDER').filter(p => p.team === 'ORDER').map(mapLivePlayer);
    rawTeamTwo = livePlayers.filter(p => !p.isBot || p.team === 'CHAOS').filter(p => p.team === 'CHAOS').map(mapLivePlayer);
  } else {
    rawTeamOne = session?.gameData?.teamOne || [];
    rawTeamTwo = session?.gameData?.teamTwo || [];
  }

  let teamOneUnsorted = rawTeamOne.filter(isValidPlayer);
  let teamTwoUnsorted = rawTeamTwo.filter(isValidPlayer);

  const matchCurrentPlayer = (p) => {
    if (phase === 'ChampSelect') {
      if (p.cellId !== undefined && session?.localPlayerCellId !== undefined && p.cellId === session.localPlayerCellId) return true;
    }
    if (session?.liveData?.activePlayer?.summonerName) {
      if (p.summonerName === session.liveData.activePlayer.summonerName || p.summonerInternalName === session.liveData.activePlayer.summonerName) return true;
    }
    if (p.summonerId > 0 && p.summonerId === localSummonerId) return true;
    return false;
  };

  let myTeamRaw = teamOneUnsorted;
  let enemyTeamRaw = teamTwoUnsorted;

  if (teamTwoUnsorted.some(matchCurrentPlayer)) {
    myTeamRaw = teamTwoUnsorted;
    enemyTeamRaw = teamOneUnsorted;
  }

  let teamOne = [...myTeamRaw];
  let myPlayerIndex = teamOne.findIndex(matchCurrentPlayer);
  if (myPlayerIndex > 0) {
    const me = teamOne.splice(myPlayerIndex, 1)[0];
    teamOne.unshift(me);
  }
  let teamTwo = enemyTeamRaw;

  const myPlayer = teamOne.find(matchCurrentPlayer) || teamOne[0];
  const isLocked = myPlayer ? (phase === 'ChampSelect' ? session?.actions?.some(tier => tier.some(action => action.actorCellId === myPlayer.cellId && action.completed)) : phase !== 'ChampSelect') : false;
  const myChampName = myPlayer && myPlayer.championId > 0 ? getChampName(myPlayer.championId) : null;

  const getTeamStats = (players) => {
    let powerEarly = 50, powerMid = 50, powerLate = 50;
    let synergyHash = 0;

    players.forEach((p, idx) => {
      if (!p) return;
      const cId = p.championId > 0 ? p.championId : 0;
      if (cId > 0) {
        synergyHash += cId * (idx + 1);
        powerEarly += (cId % 10) - 5;
        powerMid += (cId % 15) - 7;
        powerLate += (cId % 12) - 6;
      }
    });

    let winrate = 45 + (synergyHash % 11);
    if (winrate > 60) winrate = 60;
    if (winrate < 40) winrate = 40;

    return {
      winrate: winrate,
      early: Math.min(100, Math.max(0, powerEarly)),
      mid: Math.min(100, Math.max(0, powerMid)),
      late: Math.min(100, Math.max(0, powerLate))
    };
  };

  const t1StatsRaw = getTeamStats(teamOne);
  const t2StatsRaw = getTeamStats(teamTwo);

  // Normalize winrates so they exactly sum to 100%
  const totalWinrate = t1StatsRaw.winrate + t2StatsRaw.winrate;
  const finalT1Winrate = ((t1StatsRaw.winrate / totalWinrate) * 100).toFixed(1);
  const finalT2Winrate = (100 - parseFloat(finalT1Winrate)).toFixed(1);

  // Normalize power spikes so early/mid/late sum correctly visually
  const getNormalizedSpikes = (t1, t2) => {
    const sum = t1 + t2;
    if (sum === 0) return { val1: 50, val2: 50 };
    return { val1: Math.round((t1 / sum) * 100), val2: Math.round((t2 / sum) * 100) };
  };

  const earlySpike = getNormalizedSpikes(t1StatsRaw.early, t2StatsRaw.early);
  const midSpike = getNormalizedSpikes(t1StatsRaw.mid, t2StatsRaw.mid);
  const lateSpike = getNormalizedSpikes(t1StatsRaw.late, t2StatsRaw.late);

  const assignedRole = myPlayer?.assignedPosition ? myPlayer.assignedPosition.toLowerCase() : null;
  const roleMapping = { 'utility': 'support', 'bottom': 'adc', 'middle': 'mid', 'jungle': 'jungle', 'top': 'top' };
  const targetRole = assignedRole ? (roleMapping[assignedRole] || assignedRole) : "";

  const [runesReforged, setRunesReforged] = useState([]);
  const [itemsData, setItemsData] = useState({});
  const [summonersData, setSummonersData] = useState({});
  const [champSpells, setChampSpells] = useState({});
  const [ddVersion, setDdVersion] = useState('15.5.1');

  useEffect(() => {
    // 1. Get Latest DDragon Version
    fetch("https://ddragon.leagueoflegends.com/api/versions.json")
      .then(r => r.json())
      .then(versions => {
        const latest = versions[0];
        setDdVersion(latest);

        // 2. Fetch Runes, Items, Summoners with latest version in French
        Promise.all([
          fetch(`https://ddragon.leagueoflegends.com/cdn/${latest}/data/fr_FR/runesReforged.json`).then(r => r.json()),
          fetch(`https://ddragon.leagueoflegends.com/cdn/${latest}/data/fr_FR/item.json`).then(r => r.json()),
          fetch(`https://ddragon.leagueoflegends.com/cdn/${latest}/data/fr_FR/summoner.json`).then(r => r.json())
        ]).then(([runes, items, summs]) => {
          setRunesReforged(runes);
          setItemsData(items.data || {});
          setSummonersData(summs.data || {});
        }).catch(e => {
          console.error("DDragon Fetch Error:", e);
          // Fallback fetch if versions fails
          Promise.all([
            fetch("https://ddragon.leagueoflegends.com/cdn/15.5.1/data/fr_FR/runesReforged.json").then(r => r.json()),
            fetch("https://ddragon.leagueoflegends.com/cdn/15.5.1/data/fr_FR/item.json").then(r => r.json()),
            fetch("https://ddragon.leagueoflegends.com/cdn/15.5.1/data/fr_FR/summoner.json").then(r => r.json())
          ]).then(([r, i, s]) => {
            setRunesReforged(r);
            setItemsData(i.data || {});
            setSummonersData(s.data || {});
          }).catch(() => { });
        });
      })
      .catch(e => console.error(e));
  }, []);

  const [champSpellsData, setChampSpellsData] = useState({});

  useEffect(() => {
    if (myChampName) {
      fetch(`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/data/fr_FR/champion/${myChampName}.json`)
        .then(r => r.json())
        .then(d => {
          if (!d.data[myChampName]) return;
          const spells = d.data[myChampName].spells;
          setChampSpells({
            'Q': spells[0].id,
            'W': spells[1].id,
            'E': spells[2].id,
            'R': spells[3].id
          });
          setChampSpellsData({
            'Q': spells[0],
            'W': spells[1],
            'E': spells[2],
            'R': spells[3]
          });
        }).catch(e => console.error(e));
    }
  }, [myChampName, ddVersion]);

  // Fetch Recommended Build dynamically instead of mock
  useEffect(() => {
    if (myChampName && isLocked) {
      window.ipcRenderer.invoke('scraper:get-champion-build', myChampName, targetRole).then(build => {
        if (build) setRecommendedBuild(build);
      }).catch(e => console.error("Build fetch error", e));
    } else if (!isLocked) {
      setRecommendedBuild(null);
    }
  }, [myChampName, isLocked, targetRole]);

  const getChampSelectBans = (bansArray) => {
    if (!bansArray) return [];
    return bansArray.filter(id => id && id > 0).map(id => ({ championId: id }));
  };

  const t1Bans = phase === 'ChampSelect'
    ? getChampSelectBans(session?.bans?.myTeamBans)
    : (session?.gameData?.bannedChampions?.filter(b => b.teamId === 100) || []);

  const t2Bans = phase === 'ChampSelect'
    ? getChampSelectBans(session?.bans?.theirTeamBans)
    : (session?.gameData?.bannedChampions?.filter(b => b.teamId === 200) || []);

  if (loading) return <GlobalFullScreenLoader text="Tracker Live" subtext="Connexion en temps réel..." />;

  if (!session || (phase !== 'ChampSelect' && phase !== 'InProgress' && phase !== 'GameStart')) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-12 text-center animate-in fade-in duration-500">
        <div className="w-32 h-32 rounded-full border-2 border-dashed border-gray-500/30 flex items-center justify-center mb-6 opacity-50 relative">
          <div className="absolute inset-0 border-2 border-gray-500/10 rounded-full blur-sm"></div>
          <Activity size={48} className="text-gray-500/50" />
        </div>
        <h2 className="text-2xl font-black uppercase tracking-widest text-gray-500">Aucune partie active</h2>
        <p className="text-sm font-bold text-gray-500/60 mt-2 max-w-sm">Lancez une recherche de match pour voir l'analyse en direct s'activer ici.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-4 animate-in fade-in slide-in-from-bottom-6 duration-700 px-2 pb-6 pt-0 overflow-y-auto custom-scrollbar no-drag">
      {/* Removed TRACKER EN DIRECT header base on user request */}

      {/* Top Section: Split Layout (Allies | Temps Forts | Ennemis) */}
      <div className="flex gap-6 shrink-0 mt-4 rounded-3xl" style={{ height: "380px" }}>

        {/* Team 1 (BLUE) */}
        <div className="flex-1 w-[33%] flex flex-col gap-2 relative">
          {t1Bans && t1Bans.length > 0 && (
            <div className="flex items-center gap-1.5 px-1 justify-start mb-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-6 h-6 rounded bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center opacity-80">
                  {t1Bans[i] ? <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${t1Bans[i].championId}.png`} className="w-full h-full grayscale brightness-75 object-cover" onError={(e) => e.target.style.display = 'none'} /> : null}
                </div>
              ))}
            </div>
          )}
          <div className="h-8 bg-gradient-to-r from-blue-600/30 via-blue-900/10 to-transparent border-t-2 border-l-2 border-blue-500 rounded-tl-xl flex items-center px-4 relative overflow-hidden shrink-0 mt-2">
            <span className="text-xs font-black text-blue-400 uppercase tracking-widest z-10 drop-shadow-md">Alliés</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Winrate</span>
              <span className="text-sm font-black text-blue-100">{finalT1Winrate}%</span>
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-evenly bg-transparent p-0 gap-2">
            {Array.from({ length: 5 }).map((_, idx) => {
              const p = teamOne[idx];
              if (!p) {
                return (
                  <div key={idx} className="h-full flex items-center justify-center gap-3 px-3 rounded-xl border border-white/5 bg-black/20 opacity-30 relative overflow-hidden transition-all border-dashed">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em]">Vide</span>
                  </div>
                );
              }
              const cid = p.championId > 0 ? p.championId : 0;
              const isMe = p.summonerId === localSummonerId || p.cellId === session?.localPlayerCellId;
              return (
                <div key={idx} className={cn("h-full flex items-center gap-3 px-3 rounded-xl border relative overflow-hidden transition-all shadow-md group border-blue-500/10 hover:border-blue-400/30", isMe ? "bg-blue-600/15 shadow-[0_0_20px_rgba(59,130,246,0.15)] ring-1 ring-blue-500/50" : "bg-[#0d0d12]/90")}>
                  {isMe && <div className="absolute top-0 left-0 w-1 rounded-full h-full bg-blue-400"></div>}
                  <img src={cid > 0 ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${cid}.png` : 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png'} className="w-10 h-10 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.8)] object-cover bg-black" />
                  <div className="flex flex-col flex-1 truncate justify-center">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-0.5">{phase === 'ChampSelect' ? "Joueur" : (p.summonerName || "Joueur")}</span>
                    <span className="text-xs font-black text-gray-100 italic truncate group-hover:text-white transition-colors leading-none">{cid > 0 ? getChampName(cid) : "Sélection..."}</span>
                  </div>
                  {(p.spell1Id > 0 || p.spell2Id > 0) && (
                    <div className="flex flex-col gap-0.5 justify-center opacity-80 pl-2">
                      {p.spell1Id > 0 && <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells/${p.spell1Id}.png`} className="w-4 h-4 rounded object-cover" />}
                      {p.spell2Id > 0 && <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells/${p.spell2Id}.png`} className="w-4 h-4 rounded object-cover" />}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Middle Section: Advantages */}
        <div className="flex flex-col justify-start w-[25%] pt-9 gap-3 text-center">

          {/* LIQUID GLASS POWER SPIKES */}
          <div className="bg-white/[0.03] backdrop-blur-[40px] border border-white/10 rounded-[28px] p-4 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6),inset_0_1px_2px_rgba(255,255,255,0.05)] flex flex-col relative overflow-hidden min-h-[190px] shrink-0">
            <div className="absolute top-0 right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-[40px] pointer-events-none" />
            <div className="absolute bottom-0 left-10 w-24 h-24 bg-red-500/10 rounded-full blur-[40px] pointer-events-none" />

            <div className="flex items-center justify-center gap-2 mb-6 shrink-0 relative z-10">
              <Target size={14} className="text-blue-400 opacity-90 drop-shadow-md" />
              <h3 className="text-[11px] font-black uppercase text-gray-100 tracking-[0.25em]">Temps Forts</h3>
            </div>

            <div className="flex-1 flex flex-col justify-center gap-4 relative z-10 px-1">
              {[
                { title: "EARLY GAME", t1: earlySpike.val1, t2: earlySpike.val2 },
                { title: "MID GAME", t1: midSpike.val1, t2: midSpike.val2 },
                { title: "LATE GAME", t1: lateSpike.val1, t2: lateSpike.val2 }
              ].map((sp) => {
                const blueWin = sp.t1 > sp.t2;
                const total = sp.t1 + sp.t2;
                const ratio = Math.max(10, Math.min(90, Math.round((sp.t1 / total) * 100)));
                return (
                  <div key={sp.title} className="flex flex-col w-full relative gap-1.5">
                    <div className="flex justify-between items-end text-[10px] uppercase font-black tracking-widest px-1">
                      <span className={`${blueWin ? 'text-blue-400 drop-shadow-[0_0_8px_rgba(96,165,250,0.6)]' : 'text-blue-400/40 text-[9px]'}`}>{sp.t1}%</span>
                      <span className="text-gray-400 tracking-[0.2em]">{sp.title}</span>
                      <span className={`${!blueWin ? 'text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.6)]' : 'text-red-400/40 text-[9px]'}`}>{sp.t2}%</span>
                    </div>
                    <div className="h-2.5 w-full bg-black/40 rounded-full overflow-hidden flex relative border border-white/5 shadow-inner">
                      <div className="absolute top-0 bottom-0 left-0 bg-gradient-to-r from-blue-700 to-blue-400 rounded-r-full transition-all duration-1000 ease-out z-10" style={{ width: `${ratio}%` }}>
                        <div className="absolute top-0 right-0 w-8 h-full bg-white/30 blur-[2px] skew-x-[-20deg] mix-blend-overlay" />
                      </div>
                      <div className="absolute top-0 bottom-0 right-0 bg-gradient-to-l from-red-700 to-red-500 rounded-l-full transition-all duration-1000 ease-out z-0" style={{ width: `${100 - ratio}%` }} />
                      <div className="absolute top-0 bottom-0 left-1/2 w-[2px] -ml-[1px] bg-white/20 z-20 shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DYNAMIC MATCHUP ANALYSIS */}
          <div className="w-full mt-auto mb-2 px-4 py-3 rounded-[20px] bg-white/[0.02] backdrop-blur-xl border border-orange-500/20 shadow-[0_15px_30px_-10px_rgba(0,0,0,0.5)] flex flex-col gap-1.5 relative overflow-hidden shrink-0">
            <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/10 rounded-full blur-[30px] pointer-events-none"></div>
            <div className="flex items-center justify-center gap-2 mb-1">
              <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse drop-shadow-[0_0_8px_rgba(249,115,22,1)]"></div>
              <span className="text-[10px] font-black uppercase text-orange-400 tracking-[0.2em] z-10">Analyse de Matchup</span>
            </div>
            <p className="text-[11px] font-medium text-orange-100/80 leading-relaxed z-10 italic">
              {(() => {
                const e1 = earlySpike.val1; const e2 = earlySpike.val2;
                const l1 = lateSpike.val1; const l2 = lateSpike.val2;
                if (e1 > e2 && l1 > l2) return "Votre composition est supérieure à tous les stades. Étouffez l'adversaire et accélérez le rythme sans pitié.";
                if (e1 > e2) return "Vous dominez l'Early Game. Sécurisez vite les objectifs et créez de l'écart avant que les ennemis ne scale.";
                if (l1 > l2) return "L'équipe ennemie est dangereuse au début. Absorbez la pression et farmez : vous êtes plus forts en Teamfight Late-Game.";
                return "Le matchup est complexe et l'équipe ennemie scale bien. Jouez la vision et sanctionnez les moindres erreurs adverses.";
              })()}
            </p>
          </div>
        </div>

        {/* Team 2 (RED) */}
        <div className="flex-1 w-[33%] flex flex-col gap-2 relative">
          {t2Bans && t2Bans.length > 0 && (
            <div className="flex items-center gap-1.5 px-1 justify-end mb-0.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-6 h-6 rounded bg-black/40 border border-white/5 overflow-hidden flex items-center justify-center opacity-80">
                  {t2Bans[i] ? <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${t2Bans[i].championId}.png`} className="w-full h-full grayscale brightness-75 object-cover" onError={(e) => e.target.style.display = 'none'} /> : null}
                </div>
              ))}
            </div>
          )}
          <div className="h-8 bg-gradient-to-l from-red-600/30 via-red-900/10 to-transparent border-t-2 border-r-2 border-red-500 rounded-tr-xl flex items-center px-4 relative overflow-hidden justify-end mt-2 shrink-0">
            <div className="mr-auto flex items-center gap-2">
              <span className="text-sm font-black text-red-200">{finalT2Winrate}%</span>
              <span className="text-[9px] text-gray-500 uppercase tracking-widest font-black">Winrate</span>
            </div>
            <span className="text-xs font-black text-red-400 uppercase tracking-widest z-10 drop-shadow-md">Ennemis</span>
          </div>
          <div className="flex-1 flex flex-col justify-evenly bg-transparent p-0 gap-2">
            {Array.from({ length: 5 }).map((_, idx) => {
              const p = teamTwo[idx];
              if (!p) {
                return (
                  <div key={idx} className="h-full flex items-center justify-center gap-3 px-3 rounded-xl border border-white/5 bg-black/20 opacity-30 relative overflow-hidden transition-all border-dashed flex-row-reverse text-right">
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em]">Vide</span>
                  </div>
                );
              }
              const cid = p.championId > 0 ? p.championId : 0;
              return (
                <div key={idx} className={cn("h-full flex items-center gap-3 px-3 rounded-xl border relative overflow-hidden transition-all shadow-md group border-red-500/10 hover:border-red-400/30 bg-[#0d0d12]/90 flex-row-reverse text-right")}>
                  <img src={cid > 0 ? `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/${cid}.png` : 'https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/champion-icons/-1.png'} className="w-10 h-10 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.8)] object-cover bg-black" />
                  <div className="flex flex-col flex-1 truncate justify-center">
                    <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest mb-0.5">{phase === 'ChampSelect' ? "Joueur" : (p.summonerName || "Joueur")}</span>
                    <span className="text-xs font-black text-gray-100 italic truncate group-hover:text-white transition-colors leading-none">{cid > 0 ? getChampName(cid) : "Inconnu"}</span>
                  </div>
                  {(p.spell1Id > 0 || p.spell2Id > 0) && (
                    <div className="flex flex-col gap-0.5 justify-center opacity-80 pr-2">
                      {p.spell1Id > 0 && <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells/${p.spell1Id}.png`} className="w-4 h-4 rounded object-cover" />}
                      {p.spell2Id > 0 && <img src={`https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/summoner-spells/${p.spell2Id}.png`} className="w-4 h-4 rounded object-cover" />}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section: Wide Details Panel Optimized Layout */}
      {isLocked && myChampName && (
        <div className="mb-4 w-full glass-panel border border-white/5 rounded-[24px] flex relative bg-[#0d0d12]/90 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">

          {/* LEFT COLUMN: SUMMONERS, SPELLS, ITEMS */}
          <div className="flex flex-col w-[65%] p-6 pr-8 border-r border-white/5 gap-8">

            {/* ROW 1: Summoners & Spells */}
            <div className="flex items-start gap-12">
              {/* Summoners */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/90">Summoners</span>
                  {recommendedBuild?.allSpells && recommendedBuild.allSpells.length > 0 && (
                    <div className="flex items-center bg-black/40 border border-white/10 rounded px-1 ml-1">
                      <button onClick={() => {
                        const next = spellIndex > 0 ? spellIndex - 1 : recommendedBuild.allSpells.length - 1;
                        setSpellIndex(next);
                        forceImportSummoners(next);
                      }} className="text-gray-500 hover:text-white p-0.5"><ChevronLeft size={10} /></button>
                      <span className="text-[10px] font-bold text-gray-300 px-1">{spellIndex + 1}/{recommendedBuild.allSpells.length}</span>
                      <button onClick={() => {
                        const next = (spellIndex + 1) % recommendedBuild.allSpells.length;
                        setSpellIndex(next);
                        forceImportSummoners(next);
                      }} className="text-gray-500 hover:text-white p-0.5"><ChevronRight size={10} /></button>
                    </div>
                  )}
                </div>
                <div className="flex gap-3">
                  {(() => {
                    const SUMMONER_ID_TO_NAME = {
                      1: 'SummonerBoost', 3: 'SummonerExhaust', 4: 'SummonerFlash',
                      6: 'SummonerHaste', 7: 'SummonerHeal', 11: 'SummonerSmite',
                      12: 'SummonerTeleport', 13: 'SummonerMana', 14: 'SummonerDot',
                      21: 'SummonerBarrier', 30: 'SummonerPoroRecall',
                      31: 'SummonerPoroThrow', 32: 'SummonerSnowball'
                    };
                    let s1Id = myPlayer?.spell1Id;
                    let s2Id = myPlayer?.spell2Id;

                    // Use visually selected spells if available
                    if (recommendedBuild?.allSpells?.[spellIndex]) {
                      s1Id = parseInt(recommendedBuild.allSpells[spellIndex][0]);
                      s2Id = parseInt(recommendedBuild.allSpells[spellIndex][1]);
                      // Apply flash position formatting locally
                      if (flashPosition === 'D' && s2Id === 4) { s2Id = s1Id; s1Id = 4; }
                      else if (flashPosition === 'F' && s1Id === 4) { s1Id = s2Id; s2Id = 4; }
                    }

                    return (
                      <>
                        <InfoTooltip
                          title={summonersData[SUMMONER_ID_TO_NAME[s1Id]]?.name}
                          description={summonersData[SUMMONER_ID_TO_NAME[s1Id]]?.description}
                        >
                          {s1Id ? <img src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/spell/${SUMMONER_ID_TO_NAME[s1Id] || 'SummonerFlash'}.png`} className="w-12 h-12 rounded-lg border border-white/10 shadow-lg object-cover" /> : <div className="w-12 h-12 rounded-lg bg-white/5" />}
                        </InfoTooltip>

                        <InfoTooltip
                          title={summonersData[SUMMONER_ID_TO_NAME[s2Id]]?.name}
                          description={summonersData[SUMMONER_ID_TO_NAME[s2Id]]?.description}
                        >
                          {s2Id ? <img src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/spell/${SUMMONER_ID_TO_NAME[s2Id] || 'SummonerDot'}.png`} className="w-12 h-12 rounded-lg border border-white/10 shadow-lg object-cover" /> : <div className="w-12 h-12 rounded-lg bg-white/5" />}
                        </InfoTooltip>
                      </>
                    )
                  })()}
                </div>
              </div>

              {/* Spells Skill Order */}
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/90">Spells</span>
                  <span className="text-[8px] text-gray-500 font-bold border border-white/10 px-1.5 py-0.5 rounded bg-black/40">SKILL ORDER</span>
                </div>
                <div className="flex items-center gap-2.5 bg-white/[0.02] p-2 rounded-xl border border-white/5 shadow-inner">
                  {recommendedBuild?.skillOrder && recommendedBuild.skillOrder.length >= 3 ? recommendedBuild.skillOrder.slice(0, 3).map((s, i) => (
                    <React.Fragment key={i}>
                      <InfoTooltip title={champSpellsData[typeof s === 'object' ? s.key : s]?.name} description={champSpellsData[typeof s === 'object' ? s.key : s]?.description}>
                        <div className="relative w-10 h-10 rounded-lg overflow-hidden shadow-md bg-black/50 flex flex-col items-center justify-center border border-white/5 cursor-pointer">
                          {champSpells[typeof s === 'object' ? s.key : s] ? (
                            <img src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/spell/${champSpells[typeof s === 'object' ? s.key : s]}.png`}
                              className="absolute inset-0 w-full h-full object-cover opacity-80 pointer-events-none" />
                          ) : (
                            <span className="text-blue-400 font-black relative z-10 text-xs">{typeof s === 'object' ? s.key : s}</span>
                          )}
                          <div className="absolute inset-x-0 bottom-0 bg-black/70 backdrop-blur-sm text-[9px] font-black text-center text-blue-200 uppercase pt-0.5 pointer-events-none">
                            {typeof s === 'object' ? s.key : s}
                          </div>
                        </div>
                      </InfoTooltip>
                      {i < 2 && <ChevronRight size={14} className="text-white/20" />}
                    </React.Fragment>
                  )) : (
                    <span className="text-xs text-white/30 italic px-4">Données indisponibles</span>
                  )}
                </div>
              </div>
            </div>

            {/* ROW 2: Items Workflow (Horizontal Flow) */}
            <div className="flex flex-col gap-4 mt-2">
              <span className="text-[11px] font-black uppercase tracking-widest text-white/90">Build & Itémisation</span>

              <div className="flex items-center flex-wrap gap-y-6 gap-x-6 bg-white/[0.01] p-4 rounded-2xl border border-white/5">
                {/* Départ */}
                <div className="flex flex-col gap-2 shrink-0">
                  <span className="text-[9px] text-gray-400 font-black tracking-widest uppercase">Départ</span>
                  <div className="flex gap-2">
                    {(recommendedBuild?.items?.starting || [1055, 2003]).slice(0, 2).map((item, i) => (
                      <InfoTooltip key={i} title={itemsData[item]?.name} description={itemsData[item]?.description} cost={itemsData[item]?.gold?.total}>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${item}.png`} className="w-10 h-10 rounded-md border border-green-500/20 shadow-md transition-transform" />
                      </InfoTooltip>
                    ))}
                  </div>
                </div>

                <ChevronRight size={16} className="text-white/10 shrink-0 mt-6" />

                {/* Boots */}
                <div className="flex flex-col gap-2 shrink-0">
                  <span className="text-[9px] text-gray-400 font-black tracking-widest uppercase">Boots</span>
                  <div className="flex gap-2">
                    {(recommendedBuild?.items?.boots?.slice(0, 1) || [1001]).map((id, i) => (
                      <InfoTooltip key={i} title={itemsData[id]?.name} description={itemsData[id]?.description} cost={itemsData[id]?.gold?.total}>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${id}.png`} className="w-10 h-10 rounded-md border border-cyan-500/30 shadow-md transition-transform" />
                      </InfoTooltip>
                    ))}
                  </div>
                </div>

                <ChevronRight size={16} className="text-white/10 shrink-0 mt-6" />

                {/* Core Items */}
                <div className="flex flex-col gap-2 shrink-0">
                  <span className="text-[9px] text-gray-400 font-black tracking-widest uppercase">Core Items</span>
                  <div className="flex gap-2 items-center">
                    {recommendedBuild?.items?.core ? recommendedBuild.items.core.slice(0, 3).map((item, i) => (
                      <React.Fragment key={i}>
                        <InfoTooltip title={itemsData[item]?.name} description={itemsData[item]?.description} cost={itemsData[item]?.gold?.total}>
                          <img src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${item}.png`} className="w-12 h-12 rounded-xl border border-yellow-500/30 shadow-[0_0_15px_rgba(234,179,8,0.1)] hover:scale-[1.15] hover:z-10 transition-transform cursor-pointer relative" />
                        </InfoTooltip>
                      </React.Fragment>
                    )) : <div className="w-28 h-12 animate-pulse bg-white/5 rounded-lg"></div>}
                  </div>
                </div>

                <ChevronRight size={16} className="text-white/10 shrink-0 mt-6" />

                {/* Situational */}
                <div className="flex flex-col gap-2 shrink-0">
                  <span className="text-[9px] text-gray-400 font-black tracking-widest uppercase">Situational</span>
                  <div className="flex gap-2">
                    {(recommendedBuild?.items?.situational?.slice(0, 3) || []).map((id, i) => (
                      <InfoTooltip key={i} title={itemsData[id]?.name} description={itemsData[id]?.description} cost={itemsData[id]?.gold?.total}>
                        <img src={`https://ddragon.leagueoflegends.com/cdn/${ddVersion}/img/item/${id}.png`} className="w-10 h-10 rounded-md border border-white/10 cursor-pointer shadow-md opacity-80 hover:opacity-100 hover:scale-105 transition-all" />
                      </InfoTooltip>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: RUNES (Exclusive) */}
          <div className="flex flex-col w-[35%] py-6 px-4 bg-gradient-to-br from-transparent to-blue-900/5 items-center justify-center">

            <div className="w-full max-w-[280px] flex flex-col items-center">
              <div className="flex items-center justify-between w-full mb-4">
                <span className="text-xs font-black uppercase tracking-widest text-white/90 drop-shadow-md">Runes Reforged</span>
                {recommendedBuild && (
                  <div className="flex items-center gap-1.5 ml-2">
                    {recommendedBuild.allRunePages && recommendedBuild.allRunePages.length > 0 ? (
                      <div className="flex items-center bg-black/40 border border-white/10 rounded px-1 min-w-[30px] justify-center ml-1">
                        <button onClick={() => {
                          const next = runePageIndex > 0 ? runePageIndex - 1 : recommendedBuild.allRunePages.length - 1;
                          setRunePageIndex(next);
                          forceImportRunes(next);
                        }} className="text-gray-500 hover:text-white p-0.5"><ChevronLeft size={10} /></button>
                        <span className="text-[10px] font-bold text-gray-300 px-1">{runePageIndex + 1} / {recommendedBuild.allRunePages.length}</span>
                        <button onClick={() => {
                          const next = (runePageIndex + 1) % recommendedBuild.allRunePages.length;
                          setRunePageIndex(next);
                          forceImportRunes(next);
                        }} className="text-gray-500 hover:text-white p-0.5"><ChevronRight size={10} /></button>
                      </div>
                    ) : null}
                  </div>
                )}
              </div>

              <div className="flex gap-10 items-start justify-center w-full relative">
                {recommendedBuild?.runes?.active && runesReforged.length > 0 ? (() => {
                  const currentRunes = recommendedBuild.allRunePages ? recommendedBuild.allRunePages[runePageIndex] : recommendedBuild.runes;
                  if (!currentRunes) return <div className="opacity-50 text-xs italic">Manque de données...</div>;

                  const primaryId = parseInt(currentRunes.primary);
                  const secondaryId = parseInt(currentRunes.secondary);
                  const activeIds = currentRunes.active.map(id => parseInt(id));
                  const primaryTree = runesReforged.find(r => r.id === primaryId);
                  const secondaryTree = runesReforged.find(r => r.id === secondaryId);

                  // Shards Layout
                  const shardsLayout = [[5008, 5005, 5007], [5008, 5010, 5001], [5011, 5013, 5001]];

                  const renderRow = (perks, isKeystone, isPrimary) => (
                    <div className="flex gap-3 justify-center w-full mb-1.5" key={perks[0]?.id || Math.random()}>
                      {(() => {
                        const rowHasActive = perks.some(px => activeIds.includes(px.id));
                        return perks.map((p, idx) => {
                          const isActive = activeIds.includes(p.id) || (isPrimary && !rowHasActive && ((isKeystone && idx === 0) || (!isKeystone && idx === 1)));
                          return (
                            <InfoTooltip key={p.id} title={p.name} description={p.longDesc || p.shortDesc}>
                              <div className={cn("relative rounded-full flex items-center justify-center transition-all cursor-pointer", isKeystone ? "w-10 h-10" : "w-7 h-7", isActive ? (isKeystone ? "border-2 border-yellow-500/80 shadow-[0_0_15px_rgba(234,179,8,0.3)] bg-black/40" : "border border-blue-400/80 shadow-[0_0_8px_rgba(96,165,250,0.2)] bg-black/40") : "border border-transparent opacity-30 grayscale filter scale-90 hover:opacity-100 hover:grayscale-0")}>
                                <img src={`https://ddragon.leagueoflegends.com/cdn/img/${p.icon}`} className={cn("rounded-full object-cover pointer-events-none", isKeystone ? "w-8 h-8" : "w-5 h-5")} />
                              </div>
                            </InfoTooltip>
                          );
                        });
                      })()}
                    </div>
                  );

                  return (
                    <>
                      {/* Primary Tree */}
                      {primaryTree && (
                        <div className="flex flex-col items-center">
                          <InfoTooltip title={primaryTree.name}>
                            <img src={`https://ddragon.leagueoflegends.com/cdn/img/${primaryTree.icon}`} className="w-7 h-7 mb-3 filter drop-shadow-[0_0_8px_rgba(255,255,255,0.4)] cursor-pointer" />
                          </InfoTooltip>
                          {primaryTree.slots.map((slot, idx) => renderRow(slot.runes, idx === 0, true))}
                        </div>
                      )}

                      {/* Secondary Tree & Shards*/}
                      <div className="flex flex-col items-center mt-1">
                        {secondaryTree && (
                          <>
                            <InfoTooltip title={secondaryTree.name}>
                              <img src={`https://ddragon.leagueoflegends.com/cdn/img/${secondaryTree.icon}`} className="w-5 h-5 mb-3 filter drop-shadow-[0_0_4px_rgba(255,255,255,0.3)] opacity-90 cursor-pointer" />
                            </InfoTooltip>
                            {secondaryTree.slots.slice(1).map((slot) => renderRow(slot.runes, false, false))}
                          </>
                        )}
                        {/* Shards */}
                        <div className="mt-3 flex flex-col gap-1.5 border-t border-white/5 pt-3 w-full">
                          {shardsLayout.map((row, rIdx) => {
                            const expectedShardId = activeIds[6 + rIdx] || -1;
                            return (
                              <div className="flex gap-3 justify-center w-full" key={`shard-row-${rIdx}`}>
                                {row.map((id, idx) => {
                                  const isActive = id === expectedShardId || (idx === 0 && !row.includes(expectedShardId));
                                  return (
                                    <div key={`shard-${rIdx}-${idx}`} className={cn("w-5 h-5 rounded-full flex items-center justify-center border border-white/10 bg-black/50 transition-all", isActive ? "opacity-100 ring-1 ring-yellow-500/60 shadow-[0_0_8px_rgba(234,179,8,0.2)] scale-110" : "opacity-30 grayscale filter scale-90")}>
                                      <img src={`https://ddragon.leagueoflegends.com/cdn/img/perk-images/StatMods/StatMods${id === 5008 ? 'AdaptiveForceIcon' : id === 5005 ? 'AttackSpeedIcon' : id === 5007 ? 'CDRScalingIcon' : id === 5010 ? 'MovementSpeedIcon' : id === 5013 ? 'TenacityIcon' : id === 5001 ? 'HealthScalingIcon' : id === 5011 ? 'HealthPlusIcon' : id === 5002 ? 'ArmorIcon' : id === 5003 ? 'MagicResIcon' : 'HealthPlusIcon'}.png`} className="w-3.5 h-3.5 object-cover" onError={(e) => e.target.style.display = 'none'} />
                                    </div>
                                  )
                                })}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  );
                })() : (
                  <div className="flex gap-4 opacity-50">
                    <div className="w-24 h-40 animate-pulse rounded-lg bg-white/5 border border-white/10"></div>
                    <div className="w-24 h-40 animate-pulse rounded-lg bg-white/5 border border-white/10"></div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function SettingsView({ theme, setTheme, visualMode, setVisualMode, language, setLanguage, t, autoAccept, setAutoAccept, autoImportRunes, setAutoImportRunes, flashPosition, setFlashPosition, socialOverlayEnabled, setSocialOverlayEnabled, musicOverlayEnabled, setMusicOverlayEnabled, overlaySettings, setOverlaySettings, panelClass, triggerSocialToast, setActiveTab, isPremium, setIsPremium, currentUser, setShowPremiumModal }) {
  const [isEditingLayout, setIsEditingLayout] = useState(false);
  const languages = [
    { code: 'en', label: 'English (US)' },
    { code: 'fr', label: 'Français' }
  ];

  const [launchOnStartup, setLaunchOnStartup] = useState(false);
  const [closeBehavior, setCloseBehavior] = useState('ask');

  const [loadingScreenEnabled, setLoadingScreenEnabled] = useState(true);

  useEffect(() => {
    ipcRenderer.invoke('app:get-auto-launch').then(setLaunchOnStartup);
    ipcRenderer.invoke('app:get-settings').then(s => {
      setCloseBehavior(s?.closeBehavior || 'ask');
      if (s?.loadingScreenEnabled !== undefined) setLoadingScreenEnabled(s.loadingScreenEnabled);
    });
  }, []);

  const updateCloseBehavior = async (val) => {
    setCloseBehavior(val);
    const s = await ipcRenderer.invoke('app:get-settings') || {};
    s.closeBehavior = val;
    await ipcRenderer.invoke('app:set-settings', s);
  };

  const updateLoadingScreenToggle = async (val) => {
    setLoadingScreenEnabled(val);
    const s = await ipcRenderer.invoke('app:get-settings') || {};
    s.loadingScreenEnabled = val;
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
                <button onClick={() => window.ipcRenderer.invoke("app:open-url", "https://oracle-website-liard.vercel.app")} className="px-5 py-2 bg-yellow-500/5 hover:bg-yellow-500/10 border-2 border-yellow-500/30 text-yellow-500 font-bold text-xs uppercase rounded-xl transition-all hover:scale-[1.02] flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.1)] mb-1">
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
              <div>
                <SettingsToggle active={autoAccept} onToggle={() => {
                  setAutoAccept(!autoAccept);
                  localStorage.setItem('oracle_auto_accept', !autoAccept ? 'true' : 'false');
                }} />
              </div>
            }
          />
          <SettingCard
            icon={Zap} color="yellow"
            title="Auto-Import Runes & Builds" desc="Importe automatiquement les meilleures runes de votre champion lors de la phase de sélection."
            action={
              <SettingsToggle active={autoImportRunes} onToggle={() => setAutoImportRunes(!autoImportRunes)} />
            }
          />
          <SettingCard
            icon={Flame} color="orange"
            title="Position du Flash" desc="Force automatiquement le Flash sur la touche sélectionnée lors de l'import."
            action={
              <div className="flex gap-2">
                <button onClick={() => setFlashPosition(null)} className={cn("px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all shadow-sm", flashPosition === null || flashPosition === undefined ? "bg-accent-primary text-black border-transparent" : "text-gray-500 bg-white/5 border border-white/10 hover:border-white/30")}>OFF</button>
                <button onClick={() => setFlashPosition('D')} className={cn("px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all shadow-sm", flashPosition === 'D' ? "bg-yellow-500 text-black border-transparent shadow-[0_0_10px_rgba(234,179,8,0.3)]" : "text-gray-500 bg-white/5 border border-white/10 hover:border-yellow-500/50")}>Touche D</button>
                <button onClick={() => setFlashPosition('F')} className={cn("px-3 py-1.5 rounded-lg text-[10px] font-black uppercase transition-all shadow-sm", flashPosition === 'F' ? "bg-yellow-500 text-black border-transparent shadow-[0_0_10px_rgba(234,179,8,0.3)]" : "text-gray-500 bg-white/5 border border-white/10 hover:border-yellow-500/50")}>Touche F</button>
              </div>
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
            title={"Prédiction de Victoire"} desc={"Active l'overlay prédictif (Winrate). Raccourci pour l'afficher : CTRL+X"}
            action={
              <div className="flex items-center gap-2">
                <SettingsToggle active={overlaySettings.winProbability !== false} onToggle={() => setOverlaySettings(p => ({ ...p, winProbability: p.winProbability === false ? true : false }))} />
              </div>
            }
          />
          <SettingCard
            icon={Monitor} color="blue"
            title={"Écran de Chargement Visuel"} desc={"Affiche les rangs et winrates au lancement de la partie (Alt+B pour masquer)"}
            action={<SettingsToggle active={loadingScreenEnabled} onToggle={() => updateLoadingScreenToggle(!loadingScreenEnabled)} />}
          />
        </SettingsSection>

        {/* Section: Notifications & Social */}
        <SettingsSection title="Notifications & Social" icon={Bell}>
          <SettingCard
            icon={Users} color="indigo"
            title="Overlay Social" desc="Affiche une notification visuelle en haut à droite de l'écran quand vos amis se connectent ou lancent une partie."
            action={<SettingsToggle active={socialOverlayEnabled} onToggle={() => setSocialOverlayEnabled(!socialOverlayEnabled)} />}
          />
          <SettingCard
            icon={Music} color="green"
            title="Overlay Musique" desc="Affiche un mini-lecteur transparent en haut à droite pour contrôler votre musique."
            action={
              !isPremium ? (
                <button onClick={() => window.ipcRenderer.invoke("app:open-url", "https://oracle-website-liard.vercel.app")} className="px-5 py-2 bg-yellow-500/5 hover:bg-yellow-500/10 border-2 border-yellow-500/30 text-yellow-500 font-bold text-xs uppercase rounded-xl transition-all hover:scale-[1.02] flex items-center gap-2 shadow-[0_0_15px_rgba(234,179,8,0.1)]">
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
            onClick={() => window.ipcRenderer.invoke("app:open-url", "https://oracle-website-liard.vercel.app")}
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
              <button
                onClick={async (e) => {
                  e.stopPropagation();
                  if (!isPremium) {
                    window.ipcRenderer.invoke("app:open-url", "https://oracle-website-liard.vercel.app");
                    return;
                  }
                  try {
                    const userPseudo = currentUser ? `${currentUser.gameName}#${currentUser.tagLine}` : (localStorage.getItem('oracle_user_pseudo') || 'Unknown');
                    const response = await fetch('https://v0-oracle-sigma.vercel.app/api/create-portal', {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ pseudo: userPseudo })
                    });
                    const data = await response.json();
                    if (data.url) {
                      window.ipcRenderer.invoke('app:open-url', data.url);
                    } else {
                      setErrorModal({ show: true, title: "Aucun Abonnement", message: "Aucun abonnement Oracle Gold n'a été trouvé pour ce compte." });
                    }
                  } catch (err) {
                    setErrorModal({ show: true, title: "Erreur de Connexion", message: "Impossible de contacter le serveur." });
                  }
                }}
                className="flex items-center gap-2 rounded-xl bg-yellow-500/10 px-5 py-2.5 font-bold uppercase tracking-widest text-yellow-400 transition-all duration-300 group-hover:bg-yellow-400 group-hover:text-black border border-yellow-500/20 shadow-[0_0_15px_rgba(234,179,8,0.15)] z-10 cursor-pointer"
              >
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

function SubscriptionView({ t, panelClass, isPremium, setIsPremium, setActiveTab, currentUser, premiumData, setErrorModal }) {

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [canceling, setCanceling] = useState(false);
  const [isCanceled, setIsCanceled] = useState(!!premiumData?.cancelAtPeriodEnd);
  const expirationDate = premiumData?.expiresAt ? new Date(premiumData.expiresAt).toLocaleDateString() : "Indéfinie";

  const handleCancel = async (mode) => {
    setCanceling(true);
    try {
      const userPseudo = currentUser ? `${currentUser.gameName}#${currentUser.tagLine}` : (localStorage.getItem('oracle_user_pseudo') || 'Unknown');
      const res = await fetch('https://v0-oracle-sigma.vercel.app/api/cancel-subscription', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo: userPseudo, mode })
      });
      const data = await res.json();
      if (data.success) {
        if (mode === 'RENEWAL') setIsCanceled(true);
        else {
          setIsCanceled(true);
          setIsPremium(false);
        }
        setShowCancelModal(false);
      } else {
        setErrorModal({ show: true, title: "Erreur", message: data.error });
      }
    } catch (err) {
      setErrorModal({ show: true, title: "Erreur", message: "Erreur de connexion." });
    }
    setCanceling(false);
  };

  const openPortal = async () => {
    try {
      const userPseudo = currentUser ? `${currentUser.gameName}#${currentUser.tagLine}` : (localStorage.getItem('oracle_user_pseudo') || 'Unknown');
      const response = await fetch('https://v0-oracle-sigma.vercel.app/api/create-portal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pseudo: userPseudo })
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`Erreur serveur (${response.status}): ${errText.substring(0, 100)}`);
      }

      const data = await response.json();
      if (data.url) window.ipcRenderer.invoke('app:open-url', data.url);
    } catch (err) {
      setErrorModal({ show: true, title: "Erreur", message: "Erreur portail." });
    }
  };

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
            onClick={() => window.ipcRenderer.invoke("app:open-url", "https://oracle-website-liard.vercel.app")}
          >
            S'abonner (2.99€/mois)
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


        </div>
      </div>

      {/* CANCEL MODAL REMOVED */}

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
              <button
                onClick={async () => {
                  const userPseudo = currentUser ? `${currentUser.gameName}#${currentUser.tagLine}` : (localStorage.getItem('oracle_user_pseudo') || 'Unknown');
                  const response = await fetch('https://v0-oracle-sigma.vercel.app/api/create-portal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pseudo: userPseudo })
                  });
                  const data = await response.json();
                  if (data.url) window.ipcRenderer.invoke('app:open-url', data.url);
                }}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-white font-bold text-left"
              >
                <div className="flex items-center gap-3">
                  <CreditCard size={18} className="text-gray-400" /> Modifier le paiement
                </div>
                <ArrowRight size={16} className="text-gray-500" />
              </button>
              <button
                onClick={async () => {
                  const userPseudo = currentUser ? `${currentUser.gameName}#${currentUser.tagLine}` : (localStorage.getItem('oracle_user_pseudo') || 'Unknown');
                  const response = await fetch('https://v0-oracle-sigma.vercel.app/api/create-portal', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ pseudo: userPseudo })
                  });
                  const data = await response.json();
                  if (data.url) window.ipcRenderer.invoke('app:open-url', data.url);
                }}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition text-white font-bold text-left"
              >
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
                onClick={() => setShowCancelModal(true)}
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
          <GlobalFullScreenLoader text="TIERLIST & BUILDS" subtext="SYNCING INTELLIGENCE..." />
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
        const history = await window.ipcRenderer.invoke('lcu:get-match-history', currentUser.puuid, 0, 40);
        if (history && history.games && history.games.games) {
          // Filter only: 400 (Draft), 420 (Solo), 440 (Flex) AND > 4 mins duration to exclude Remakes
          const validQueues = [400, 420, 440];
          const filteredGames = history.games.games
            .filter(g => validQueues.includes(g.queueId) && g.gameDuration > 240)
            .sort((a, b) => b.gameCreation - a.gameCreation)
            .slice(0, 15);

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
      const name = (currentUser.gameName && currentUser.tagLine) ? `${currentUser.gameName}#${currentUser.tagLine}` : (currentUser.gameName || currentUser.displayName || currentUser.summonerName);
      const lpRegion = currentUser.region || 'EUW';
      window.ipcRenderer.invoke('scraper:get-recent-lp', name, lpRegion)
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
    return <GlobalFullScreenLoader text="Analyse..." subtext="Traitement de l'historique et des données..." />;
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
  const roleName = getRoleLabel(p);
  const roleIcon = getRoleIcon(p);

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
    const isSupport = p.teamPosition === 'UTILITY' || p.timeline?.role === 'SUPPORT';
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
    if (csm > 7.5 && !isSupport) positives.push(getAnalysis('pos_farm', positives.length));
    else if (csm < 5 && ['TOP', 'MIDDLE', 'BOTTOM'].includes(p.timeline?.lane) && !isSupport) negatives.push(getAnalysis('neg_farm', negatives.length));

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
    else if (dmgShare < 0.1 && ['TOP', 'MIDDLE', 'BOTTOM'].includes(p.timeline?.lane) && !isSupport) negatives.push(t('neg_damage'));

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

      const isSupportVerdict = p.teamPosition === 'UTILITY' || p.timeline?.role === 'SUPPORT';
      if (csm > 8 && (stats.kills + stats.assists) < 5 && !isSupportVerdict) candidates.push('verdict_afk_farm');
      if ((dmgShare > 0.35 || (stats.kills + stats.assists) > 15) && !isSupportVerdict) candidates.push('verdict_unlucky_carry', 'verdict_solid_effort');
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

    // Supports shouldn't be roasted for not farming minion waves
    const isSupport = p.teamPosition === 'UTILITY' || p.timeline?.role === 'SUPPORT';
    if (csm < 6.5 && !isSupport) points.push(getTip('tip_csm'));

    if (stats.visionScore < 0.8 * durationMin) points.push(getTip('tip_vision'));
    if (stats.damageDealtToObjectives < 2500 && !isSupport) points.push(getTip('tip_obj'));

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

    const translation = t(key);
    if (!translation || typeof translation !== 'string') return key;
    return translation.replace('{{champ}}', oppChampName || t('opponent'));
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
                      <p className="text-[10px] text-gray-500 font-bold ml-7 uppercase tracking-wider">{t('matchups')} VS {oppChampName || t('opponent')} <span className="opacity-50">({opponent?.identity?.player?.summonerName || opponent?.identity?.player?.gameName || opponent?.summonerName || "Inconnu"})</span></p>
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
                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-red-600 text-gray-900 dark:text-gray-100 text-[8px] font-black px-2 py-0.5 rounded-full border-2 border-[#0a0a0c] z-20 whitespace-nowrap">{opponent?.identity?.player?.summonerName || opponent?.identity?.player?.gameName || opponent?.summonerName || "RIVAL"}</div>
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
              <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || "14.2.1"}/img/profileicon/588.png`} onError={(e) => { e.target.onerror = null; e.target.src = "https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/588.jpg" }} className="w-10 h-10 rounded-full" />
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
          // Fast-fail: skipScraper=true to prevent 10 parallel 30-sec scrapers hanging the app
          const region = localStorage.getItem('oracle_region') || 'EUW';
          const summoner = await window.ipcRenderer.invoke('lcu:search-summoner', p.summonerName, region, false, null, true);
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
          champ: (p.championName || "").replace(/[^a-zA-Z]/g, ''),
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
                src={`https://cdn.communitydragon.org/latest/summoner-spell/${(s || "").toLowerCase().replace(' ', '')}/icon`}
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
        <GlobalFullScreenLoader text="Analyse..." subtext="Traitement de millions de parties..." />
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
    'tl': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f4/Team_Liquidlogo_square.png',
    'bds': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/9e/Team_BDSlogo_square.png',
    'kdf': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/7/79/Kwangdong_Freecslogo_square.png',
    'fnatic': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/fc/Fnaticlogo_square.png',
    'fnc': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/fc/Fnaticlogo_square.png',
    'psg': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/48/PSG_Talonlogo_square.png',
    'blg': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/9/91/Bilibili_Gaminglogo_square.png',
    'hle': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/a/a6/Hanwha_Life_Esportslogo_square.png',
    'al': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/2/25/Anyone%27s_Legendlogo_square.png',
    'drx': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/d3/DRXlogo_square.png',
    'kt': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f8/KT_Rolsterlogo_square.png',
    'kt-rolster': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/f/f8/KT_Rolsterlogo_square.png',
    'jdg': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/0/00/JD_Gaminglogo_square.png',
    'tes': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/4/46/Top_Esportslogo_square.png',
    'cfo': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/b/bb/CTBC_Flying_Oysterlogo_square.png',
    'wbg': 'https://static.wikia.nocookie.net/lolesports_gamepedia_en/images/d/df/Weibo_Gaminglogo_square.png',
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
    const n = rawName ? rawName.substring(0, 2).toUpperCase() : slug.substring(0, 2).toUpperCase();
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
            <webview
              src={`https://player.twitch.tv/?channel=${activeChannel}&parent=localhost`}
              className="w-full h-full"
              allowpopups="true"
            ></webview>

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
                (() => {
                  const hasWL = rankings.some(t => t.wins > 0 || t.losses > 0);
                  const hasPoints = rankings.some(t => t.points && t.points !== '-');
                  return (
                    <table className="w-full text-left border-collapse min-w-[600px]">
                      <thead>
                        <tr className="border-b border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-xs uppercase tracking-widest">
                          <th className="py-3 px-4 w-16 text-center">Rank</th>
                          <th className="py-3 px-4">Team</th>
                          <th className="py-3 px-4 text-center">League</th>
                          {hasWL && <th className="py-3 px-4 text-center">W - L</th>}
                          {hasPoints && <th className="py-3 px-4 text-right">Points</th>}
                        </tr>
                      </thead>
                      <tbody>
                        {rankings.map((team, idx) => (
                          <tr key={idx} className="border-b border-gray-200 dark:border-white/5 hover:bg-black/5 dark:hover:bg-white/5 transition-colors group">
                            <td className="py-3 px-4 text-center font-black text-gray-900 dark:text-gray-100 text-lg">{team.rank}</td>
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <img src={team.logo || getTeamLogo(team.name.toLowerCase().replace(/\s+/g, '-'), team.name)} alt={team.name} className="w-8 h-8 object-contain drop-shadow-md rounded-lg" onError={(e) => { e.target.onerror = null; e.target.src = getTeamLogo('none', team.name); }} />
                                <div className="flex flex-col">
                                  <span className="font-bold text-gray-900 dark:text-gray-100 group-hover:text-accent-primary transition-colors">{team.name}</span>
                                  {team.fullName && team.fullName !== team.name && <span className="text-[10px] text-gray-500 truncate max-w-[120px]">{team.fullName}</span>}
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-center">
                              {team.league ? <span className="text-[10px] font-bold px-2 py-1 bg-black/5 dark:bg-white/5 rounded text-gray-600 dark:text-gray-300">{team.league}</span> : '-'}
                            </td>
                            {hasWL && (
                              <td className="py-3 px-4 text-center font-mono text-sm">
                                {team.wins !== undefined && team.losses !== undefined ? (
                                  <>
                                    <span className="text-green-600 dark:text-green-400 font-bold">{team.wins}</span>
                                    <span className="mx-1 text-gray-400">-</span>
                                    <span className="text-red-500 dark:text-red-400 font-bold">{team.losses}</span>
                                  </>
                                ) : '-'}
                              </td>
                            )}
                            {hasPoints && (
                              <td className="py-3 px-4 text-right font-mono text-gray-600 dark:text-gray-400 font-medium">{team.points}</td>
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  );
                })()
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
          <img src={logo1} className="w-7 h-7 object-contain shrink-0 drop-shadow-lg rounded-md" onError={(e) => { e.target.onerror = null; const v = team1 ? team1.substring(0, 2).toUpperCase() : 'VS'; e.target.src = `https://ui-avatars.com/api/?name=${v}&background=141726&color=fff&size=64&bold=true&font-size=0.4`; }} />
          <span className="font-bold text-[13px] text-gray-900 dark:text-gray-100 truncate">{team1}</span>
        </div>

        {/* VS */}
        <div className="col-span-1 text-center text-[10px] font-black text-white/20 bg-black/5 dark:bg-black/20 rounded-lg py-1 border border-white/5">VS</div>

        {/* Team 2 */}
        <div className="col-span-3 flex items-center justify-end gap-2 overflow-hidden text-right">
          <span className="font-bold text-[13px] text-gray-900 dark:text-gray-100 truncate">{team2}</span>
          <img src={logo2} className="w-7 h-7 object-contain shrink-0 drop-shadow-lg rounded-md" onError={(e) => { e.target.onerror = null; const v = team2 ? team2.substring(0, 2).toUpperCase() : 'VS'; e.target.src = `https://ui-avatars.com/api/?name=${v}&background=141726&color=fff&size=64&bold=true&font-size=0.4`; }} />
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

function RankingsView({ panelClass, setTargetSummoner, setActiveTab, ddragonVersion }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [region, setRegion] = useState('EUW');

  const regions = ['EUW', 'KR', 'NA', 'EUNE', 'BR', 'TR']; // etc.

  useEffect(() => {
    let active = true;
    const fetchLadder = async () => {
      setLoading(true);
      setData(null);
      try {
        const res = await window.ipcRenderer?.invoke('scraper:get-global-ladder', region);
        if (active) setData(res || []);
      } catch (e) {
        if (active) setData([]);
      }
      if (active) setLoading(false);
    };
    fetchLadder();
    return () => { active = false; };
  }, [region]);

  return (
    <div className={cn("flex flex-col min-h-0 animate-page-enter h-full px-8 pt-6", panelClass)}>
      {/* Header */}
      <div className="flex items-end justify-between mb-6 pb-6 border-b border-gray-200 dark:border-white/5 flex-wrap gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 dark:text-gray-100 tracking-tight flex items-center gap-3">
            <Trophy className="text-accent-primary" size={28} />
            Leaderboards
          </h2>
          <p className="text-sm text-gray-500 font-medium mt-1">Meilleurs joueurs mondiaux par serveur</p>
        </div>

        {/* Region Selector */}
        <div className="flex flex-wrap bg-gray-100 dark:bg-[#1C1C21] rounded-xl p-1 shadow-inner border border-gray-200 dark:border-white/5">
          {regions.map(r => (
            <button
              key={r}
              onClick={() => setRegion(r)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-black transition-all duration-300",
                region === r
                  ? "bg-white dark:bg-white/10 text-accent-primary shadow-[0_4px_12px_rgba(0,0,0,0.1)]"
                  : "text-gray-500 hover:text-gray-900 dark:hover:text-gray-200"
              )}
            >
              {r}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 pb-4">
        {loading ? (
          <GlobalFullScreenLoader text="CLASSEMENTS" subtext="CHARGEMENT DU LADDER..." />
        ) : !data || data.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-12 opacity-50">
            <Trophy size={48} className="mb-4 text-gray-600" />
            <div className="text-lg font-bold text-gray-400">Aucune donnée trouvée</div>
            <div className="text-xs text-gray-500 mt-2">Vérifiez votre connexion ou essayez une autre région.</div>
          </div>
        ) : (
          <div className="flex flex-col gap-2 relative">
            {/* Table Header */}
            <div className="sticky top-0 bg-[#F9FAFB] dark:bg-[#0c0c0e] z-20 flex items-center px-6 py-3 text-[11px] font-black uppercase tracking-widest text-gray-500 rounded-lg mb-2 shadow-sm border border-gray-100 dark:border-white/5">
              <div className="w-16 text-center">Rang</div>
              <div className="flex-1">Invocateur</div>
              <div className="w-32 text-center">Tiers & LP</div>
              <div className="w-48 text-right pr-2">Winrate</div>
            </div>

            {/* Rows */}
            {data.map((player, idx) => {
              const totalGames = Math.max(1, player.wins + player.losses);
              const wr = Math.round((player.wins / totalGames) * 100);
              const isTop3 = idx < 3;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setTargetSummoner({ name: player.summonerName, region: region.toLowerCase() });
                    setActiveTab('profile');
                  }}
                  className={cn(
                    "flex items-center px-6 py-4 rounded-2xl transition-all cursor-pointer group relative overflow-hidden mb-2 border",
                    isTop3 ? "bg-white dark:bg-white/[0.04] border-accent-primary/20 hover:border-accent-primary/50 shadow-[0_4px_20px_rgba(6,182,212,0.1)] hover:shadow-[0_4px_20px_rgba(6,182,212,0.2)] hover:scale-[1.01]"
                      : "bg-white/50 dark:bg-black/20 border-gray-100 dark:border-white/5 hover:bg-white dark:hover:bg-white/10 hover:border-gray-200 dark:hover:border-white/10"
                  )}
                >
                  {/* Subtle Glow for Top 3 */}
                  {isTop3 && <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 via-transparent to-transparent opacity-50 pointer-events-none" />}

                  {/* Rank */}
                  <div className={cn(
                    "w-12 text-center font-black text-2xl relative z-10 transition-transform group-hover:scale-110 pr-2",
                    idx === 0 ? "text-yellow-500 drop-shadow-[0_0_12px_rgba(234,179,8,0.5)]"
                      : idx === 1 ? "text-gray-400 drop-shadow-[0_0_8px_rgba(156,163,175,0.5)]"
                        : idx === 2 ? "text-amber-700 dark:text-amber-600 drop-shadow-[0_0_8px_rgba(180,83,9,0.5)]"
                          : "text-gray-400 dark:text-gray-600"
                  )}>
                    {idx + 1}
                  </div>

                  {/* Summoner */}
                  <div className="flex-1 flex items-center gap-4 relative z-10 min-w-0 pr-4">
                    <div className="w-12 h-12 rounded-xl overflow-hidden bg-gray-200 dark:bg-black/50 shrink-0 border border-white/10 relative group-hover:scale-105 transition-transform shadow-md">
                      <img src={`https://ddragon.leagueoflegends.com/cdn/${ddragonVersion || "14.2.1"}/img/profileicon/${player.iconId || 29}.png`} onError={(e) => { e.target.onerror = null; e.target.src = `https://raw.communitydragon.org/latest/plugins/rcp-be-lol-game-data/global/default/v1/profile-icons/${player.iconId || 29}.jpg` }} className="w-full h-full object-cover" />
                      {idx === 0 && <div className="absolute inset-0 ring-2 ring-yellow-500 inset-ring rounded-xl" />}
                    </div>
                    <div className="min-w-0 flex flex-col justify-center">
                      <div className={cn(
                        "font-black text-[15px] truncate transition-colors",
                        isTop3 ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-200 group-hover:text-accent-primary"
                      )}>
                        {player.summonerName}
                      </div>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-gray-200 dark:bg-white/10 text-gray-500 dark:text-gray-300">
                          {region}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* LP */}
                  <div className="w-32 flex flex-col items-center justify-center relative z-10 font-mono">
                    <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-0.5">Challenger</div>
                    <div className="text-[17px] font-black tracking-tight text-accent-primary drop-shadow-[0_0_8px_rgba(6,182,212,0.3)]">
                      {player.leaguePoints.toLocaleString()} <span className="text-[10px] uppercase text-gray-400">LP</span>
                    </div>
                  </div>

                  {/* Winrate */}
                  <div className="w-32 flex flex-col items-end justify-center relative z-10 font-mono pl-4">
                    <div className="flex items-center gap-2 mb-1.5 w-full justify-between">
                      <span className="text-[10px] font-bold text-gray-400 whitespace-nowrap">{player.wins}V - {player.losses}D</span>
                      <span className={cn(
                        "text-[13px] font-black text-right",
                        wr >= 60 ? "text-cyan-500" : wr >= 53 ? "text-emerald-500" : "text-gray-900 dark:text-white"
                      )}>{wr}%</span>
                    </div>
                    {/* Winrate Bar */}
                    <div className="w-full h-[4px] bg-rose-500/20 rounded-full overflow-hidden flex shadow-inner">
                      <div className="h-full bg-cyan-500 relative" style={{ width: `${wr}%` }} />
                      <div className="h-full bg-rose-500 flex-1" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
      if (false && overlaySettings.skillLevelUp && active?.abilities) {
        // Temporarily disabled due to user request to remove this overlay popup
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
      {/* Win% Widget (ALT+O) - RESTORED ORIGINAL DESIGN */}
      {overlaySettings.winProbability !== false && (
        <div
          style={{ left: `${pos?.winrate?.x ?? 5}px`, top: `${pos?.winrate?.y ?? 5}%` }}
          className="absolute bg-[#16171b] rounded-xl flex items-center p-3 pr-10 overflow-hidden shadow-[0_15px_60px_-10px_rgba(0,0,0,0.8)] border border-white/5 pointer-events-auto group touch-none"
        >
          {/* Left Purple Border */}
          <div className="absolute top-0 bottom-0 left-0 w-[5px] bg-[#a855f7]"></div>
          {/* Bottom Purple Progress */}
          <div className="absolute bottom-0 left-0 h-[3px] bg-[#a855f7]" style={{ width: '65.2%' }}></div>

          {/* Cyan Icon Box */}
          <div className="w-[3.25rem] h-[3.25rem] rounded-xl bg-[#06b6d4] flex items-center justify-center shrink-0 ml-1.5 mr-4 shadow-inner">
            <Activity size={28} className="text-white drop-shadow-md" strokeWidth={2} />
          </div>

          <div className="flex flex-col z-10">
            <div className="text-[10px] font-black tracking-[0.2em] text-[#6b7280] uppercase mb-0.5">ORACLE PREDICTION</div>
            <div className="text-white font-extrabold text-[15px] tracking-tight">Probabilité : 65.2%</div>
            <div className="text-[11px] text-[#9ca3af] italic mt-0.5 tracking-tight truncate max-w-[200px]">Votre équipe mène la danse ! Mainte...</div>
          </div>
        </div>
      )}      {/* Jungle Clear Helper / Pathing */}
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
  const [players, setPlayers] = useState({ order: [], chaos: [] });
  const [champMap, setChampMap] = useState({});
  const enrichedSet = useRef(new Set());
  const [session, setSession] = useState(null);

  useEffect(() => {
    const oldBg = document.body.style.backgroundColor;
    document.body.style.backgroundColor = 'transparent';
    return () => { document.body.style.backgroundColor = oldBg; };
  }, []);

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
                } catch (e) { }
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

                // NEW: Fetch LP Gains for other players
                let recentLp = null;
                try {
                  const lpData = await window.ipcRenderer.invoke('scraper:get-recent-lp', p.name, p.region || 'EUW');
                  if (lpData && lpData.length > 0) {
                    recentLp = lpData[0].lpStr;
                  }
                } catch (e) { }

                results[i] = { ...p, rank: rankName, globalWr, globalGames, globalWins, globalLosses, streak, streakType, statsPopulated: true, recentLp };
                enrichedSet.current.add(ident);
              } catch (e) { }
            }));
            setPlayers(prev => ({ ...prev, [teamKey]: results }));
          };
          enrichTeam(gameSession.gameData.teamOne || [], 'order');
          enrichTeam(gameSession.gameData.teamTwo || [], 'chaos');
        }
      } catch (e) { console.error("Loading overlay error", e); }
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
        <div className="relative w-full aspect-[3.5/4.8] rounded-[2rem] overflow-hidden border-2 border-white/5 bg-white/5 backdrop-blur-3xl flex flex-col items-center justify-center text-white/20">
          <UserCircle2 size={32} className="mb-3 opacity-10" />
          <span className="text-[10px] font-black uppercase tracking-[0.2em]">{t('loading_empty_slot')}</span>
        </div>
      );
    }
    return (
      <div className={cn("relative w-full aspect-[3.5/4.8] rounded-[2rem] overflow-hidden border-2 transition-all duration-500 shadow-2xl group", isBlue ? "border-blue-500/30 bg-blue-500/10 hover:border-blue-400" : "border-red-500/30 bg-red-500/10 hover:border-red-400", "hover:scale-[1.02]")}>
        {p.champAlias && <img src={splashUrl} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/10 to-transparent h-1/2" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

        {p.streak > 1 && (
          <div className={cn("absolute top-4 left-4 px-2 py-1 rounded-lg flex items-center gap-1.5 text-xs font-black shadow-2xl z-20 backdrop-blur-xl border border-white/10", p.streakType === 'win' ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>
            {p.streakType === 'win' ? <Flame size={14} fill="currentColor" /> : <Skull size={14} fill="currentColor" />}
            <span className="tabular-nums">{p.streak}</span>
          </div>
        )}
        <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-5 z-10">
          <div className="mb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <img src={`https://raw.communitydragon.org/latest/plugins/rcp-fe-lol-shared-components/global/default/${(p.rank?.split(' ')[0] || 'unranked').toLowerCase()}.png`} className="w-6 h-6 object-contain" />
              <div className="flex flex-col">
                <span className="text-[10px] font-black uppercase text-white tracking-widest leading-none drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">{p.rank || "UNRANKED"}</span>
                {p.recentLp && (
                  <span className={cn("text-[8px] font-bold mt-0.5 px-1 py-0.25 rounded bg-white/10 w-fit", p.recentLp.includes('+') ? "text-green-400" : p.recentLp.includes('-') ? "text-red-400" : "text-purple-400")}>
                    {p.recentLp}
                  </span>
                )}
              </div>
            </div>
            <h3 className="text-lg font-black text-white uppercase tracking-tighter leading-none truncate drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] group-hover:text-yellow-400 transition-colors">{p.name}</h3>
            <p className="text-[9px] font-bold text-white/60 uppercase tracking-[0.2em] mt-1.5 drop-shadow-md">{p.champName}</p>
          </div>

          <div className="flex items-center justify-between border-t border-white/10 pt-3 mt-auto bg-black/40 -mx-6 -mb-6 px-6 pb-6 backdrop-blur-2xl">
            <div className="flex flex-col">
              <span className="text-[7px] font-black text-white/40 uppercase tracking-[0.15em] mb-1">{t('loading_winrate')}</span>
              <span className={cn("text-xs font-black", p.globalWr >= 55 ? "text-green-400" : p.globalWr < 48 ? "text-red-400" : "text-blue-400")}>
                {p.globalWr || 0}%
              </span>
            </div>
            <div className="text-right group/streak relative">
              <div className={cn("flex items-center gap-1.5 font-black italic text-base", p.streakType === 'win' ? "text-green-400" : "text-red-400")}>
                {p.streakType === 'win' ? <Flame size={16} fill="currentColor" /> : <Skull size={16} fill="currentColor" />}
                <span className="tabular-nums">{p.streak || 0}</span>
              </div>
              <div className="absolute bottom-full right-0 mb-3 opacity-0 group-hover/streak:opacity-100 transition-all pointer-events-none z-[100] translate-y-2 group-hover/streak:translate-y-0 duration-300">
                <div className="bg-[#1a1a23]/95 border border-white/10 rounded-2xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5)] backdrop-blur-xl min-w-[200px]">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={cn("p-2 rounded-xl", p.streakType === 'win' ? "bg-green-500/20 text-green-400" : "bg-red-500/20 text-red-400")}>
                      {p.streakType === 'win' ? <Flame size={18} /> : <Skull size={18} />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">{t('streak_label') || "SÉRIE ACTUELLE"}</span>
                      <span className="text-sm font-black text-white">{p.streak} {p.streakType === 'win' ? t('streak_wins') : t('streak_losses')}</span>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/60 leading-relaxed italic border-t border-white/5 pt-2">
                    {p.streakType === 'win'
                      ? "Ce joueur est sur une série de victoires impressionnante !"
                      : "Ce joueur traverse une période difficile avec plusieurs défaites consécutives."}
                  </p>
                </div>
                <div className="w-3 h-3 bg-[#1a1a23] border-r border-b border-white/10 rotate-45 mx-auto -mt-1.5 mr-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-3xl font-inter overflow-hidden border-[1px] border-white/10 rounded-[3rem] shadow-[0_0_100px_rgba(0,0,0,0.8)] select-none pointer-events-auto flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full opacity-40">
        <div className="absolute top-0 left-0 w-1/2 h-full bg-blue-600/20 blur-[180px] rounded-full -translate-x-1/2" />
        <div className="absolute bottom-0 right-0 w-1/2 h-full bg-red-600/20 blur-[180px] rounded-full translate-x-1/2" />
      </div>

      <div className="relative w-full h-full flex flex-col p-6 overflow-hidden rounded-[3rem]">
        <div className="flex items-center justify-between mb-4 shrink-0 h-14" style={{ WebkitAppRegion: 'drag' }}>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 relative" style={{ WebkitAppRegion: 'no-drag' }}>
              <div className="absolute inset-0 bg-yellow-500/30 blur-2xl animate-pulse" />
              <img src={oracleLogo} className="w-full h-full object-contain relative z-10" />
            </div>
            <div>
              <h1 className="text-xl font-black italic tracking-tighter text-white uppercase leading-none">Oracle Analysis</h1>
              <p className="text-[9px] font-bold text-white/30 uppercase tracking-[0.4em] mt-1">Intelligence Tactical Interface</p>
            </div>
          </div>

          <div className="flex items-center gap-6" style={{ WebkitAppRegion: 'no-drag' }}>
            <button
              onClick={closeWindow}
              className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/40 hover:text-white hover:bg-red-500/20 hover:border-red-500/40 transition-all shadow-lg cursor-pointer"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-3 justify-center max-w-7xl mx-auto w-full origin-center min-h-0">
          <div className="grid grid-cols-5 gap-3">
            {players.order.length > 0 ? players.order.map((p, i) => <PlayerCard key={i} p={p} team="order" />) : Array(5).fill(0).map((_, i) => <PlayerCard key={i} p={{ type: 'empty' }} team="order" />)}
          </div>
          <div className="flex items-center gap-8 py-0">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="text-sm font-black italic text-white/10 tracking-[0.6em] uppercase select-none">VERSUS</div>
            <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          </div>
          <div className="grid grid-cols-5 gap-3">
            {players.chaos.length > 0 ? players.chaos.map((p, i) => <PlayerCard key={i} p={p} team="chaos" />) : Array(5).fill(0).map((_, i) => <PlayerCard key={i} p={{ type: 'empty' }} team="chaos" />)}
          </div>
        </div>
      </div>
    </div>
  );
}


function NotificationsView({ panelClass, setActiveTab, patchNotes, prefetchedData, adminMessages = [], onDeleteAdminMessage, onShowNews, onClose }) {
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

        {adminMessages.map((msg, idx) => {
          const MappedIcon = Sparkles; // Default
          const safeDate = msg.id && !isNaN(new Date(msg.id).getTime()) ? new Date(msg.id).toLocaleString() : "Date Inconnue";
          return (
            <div
              key={`admin-${msg.id || idx}`}
              className="p-3 bg-indigo-500/10 backdrop-blur-md border border-indigo-500/20 hover:bg-indigo-500/20 cursor-pointer transition-all rounded-2xl flex items-center gap-4 shadow-sm shrink-0 group relative w-full overflow-hidden"
            >
              <div
                className="flex items-center gap-4 flex-1 min-w-0"
                onClick={() => onShowNews({
                  title: msg.title || "ORACLE SYSTEM",
                  summary: msg.name || msg.message || "",
                  description: msg.name || msg.message || "",
                  image: msg.imageUrl || null,
                  date: safeDate,
                  tag: msg.tag || "ANNONCE",
                  url: msg.url || null
                })}
              >
                <div className="w-10 h-10 bg-indigo-500/20 group-hover:bg-indigo-500/40 transition-colors rounded-full flex items-center justify-center shrink-0">
                  <MappedIcon size={16} className="text-indigo-400" />
                </div>
                <div className="flex-1 min-w-0 flex flex-col justify-center">
                  <div className="font-bold text-sm text-indigo-300 flex items-center gap-2 w-full pr-1">
                    <span className="truncate flex-1 min-w-0">{msg.title || "ORACLE SYSTEM"}</span>
                    {(msg.tag || "ANNONCE") && (
                      <span className="bg-indigo-500/30 text-indigo-400 text-[8px] px-1.5 py-0.5 rounded-full border border-indigo-400/20 font-black shrink-0 uppercase tracking-tighter">
                        {msg.tag || "ANNONCE"}
                      </span>
                    )}
                  </div>
                  <div className="text-[12px] text-white/90 truncate mt-0.5 leading-snug pr-4">{msg.name || msg.message}</div>
                  <div className="text-[10px] text-indigo-400/50 mt-1 uppercase font-bold tracking-widest">{safeDate}</div>
                </div>
                {msg.imageUrl && (
                  <div className="shrink-0 w-16 h-10 rounded-lg overflow-hidden border border-indigo-500/20 ml-2">
                    <img src={msg.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                )}
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); if (onDeleteAdminMessage) onDeleteAdminMessage(msg.id); }}
                className="absolute right-2 top-2 p-1.5 bg-black/40 hover:bg-red-500/80 rounded flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all z-10 text-white"
                title="Supprimer cette notification"
              >
                <X size={12} />
              </button>
            </div>
          )
        })}

        {latestPatch && (
          <div className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-4 shadow-sm group hover:bg-white/10 transition-all cursor-pointer shrink-0" onClick={() => onShowNews(latestPatch)}>
            <div className="w-10 h-10 bg-accent-primary/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-accent-primary/20 transition-colors">
              <Activity size={16} className="text-accent-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-white flex items-center gap-2 truncate">
                Patch {latestPatch.version || (typeof latestPatch.title === 'string' ? latestPatch.title.match(/\d+\.\d+/)?.[0] : "") || ""}
                <span className="bg-accent-primary/20 text-accent-primary text-[8px] px-1.5 py-0.5 rounded-full border border-accent-primary/20 font-black">MAJ</span>
              </div>
              <div className="text-[11px] text-gray-400 truncate mt-0.5">{latestPatch.summary || "Découvrez les derniers changements."}</div>
            </div>
            {latestPatch.image && (
              <div className="shrink-0 w-16 h-10 rounded-lg overflow-hidden border border-white/10">
                <img src={latestPatch.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
            )}
          </div>
        )}

        {newsList.length > 0 ? newsList.map((news, idx) => (
          <div key={idx} className="p-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl flex items-center gap-4 shadow-sm group hover:bg-white/10 transition-all cursor-pointer shrink-0" onClick={() => onShowNews(news)}>
            <div className="w-10 h-10 bg-yellow-500/10 rounded-full flex items-center justify-center shrink-0 group-hover:bg-yellow-500/20 transition-colors">
              <Trophy size={16} className="text-yellow-500" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-bold text-sm text-white truncate">{news.title}</div>
              <div className="text-[11px] text-gray-400 truncate mt-0.5">{news.summary || news.description || "Actualité tournois officiels."}</div>
            </div>
            {news.image && (
              <div className="shrink-0 w-16 h-10 rounded-lg overflow-hidden border border-white/10">
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

function PremiumRequiredModal({ isOpen, onClose, onSubscribe, t }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[500] flex items-center justify-center bg-black/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className="w-[480px] bg-[#0c0d12]/90 backdrop-blur-2xl border border-yellow-500/20 rounded-[3rem] p-10 shadow-[0_0_100px_rgba(234,179,8,0.15)] relative overflow-hidden flex flex-col items-center text-center">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-yellow-500/5 rounded-full blur-[100px]"></div>
        <div className="w-20 h-20 rounded-2xl bg-yellow-500/10 flex items-center justify-center text-yellow-500 mb-6 border border-yellow-500/20 shadow-inner">
          <Zap size={40} fill="currentColor" />
        </div>
        <h2 className="text-3xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 to-yellow-600 uppercase tracking-tighter mb-4">
          Accès Premium Requis
        </h2>
        <p className="text-gray-400 font-medium mb-8 leading-relaxed text-sm px-4">
          Cette fonctionnalité est exclusivement réservée aux membres Oracle Gold. Rejoignez l'élite et débloquez tout le potentiel de l'application.
        </p>
        <div className="flex flex-col w-full gap-3">
          <button
            onClick={() => { onSubscribe(); onClose(); }}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-yellow-600 to-yellow-400 text-black font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-[0_10px_20px_rgba(234,179,8,0.2)]"
          >
            S'abonner maintenant
          </button>
          <button
            onClick={onClose}
            className="w-full py-4 rounded-xl border border-white/5 text-gray-500 font-bold hover:text-white transition-colors text-sm"
          >
            Peut-être plus tard
          </button>
        </div>
      </div>
    </div>
  );
}

function ModernErrorModal({ error, onClose }) {
  if (!error || !error.show) return null;
  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center bg-black/80 backdrop-blur-lg animate-in fade-in zoom-in-95 duration-200">
      <div className="w-[400px] bg-[#1a1b23] border border-red-500/30 rounded-3xl p-8 shadow-[0_20px_50px_rgba(239,68,68,0.2)] flex flex-col items-center text-center">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-500 mb-6 border border-red-500/20">
          <ShieldAlert size={32} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{error.title || "Une erreur est survenue"}</h3>
        <p className="text-gray-400 text-sm mb-8 leading-relaxed">{error.message}</p>
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 font-bold hover:bg-red-500/20 transition-all"
        >
          Compris
        </button>
      </div>
    </div>
  );
}

export default App;

